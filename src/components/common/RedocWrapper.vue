<script setup lang="ts">
import { CURRENT_VERSION } from '@/data/versions'
import { onThemeChange } from '@/composables/useChartTheme'

const SPECS_REPO = 'https://github.com/Nebras-Open-Finance/api-specs/tree/main/dist'

const xlsxButtonEnabled = true

interface OverrideServer {
  url: string
  description?: string
}

interface RedocWrapperProps {
  // Either fetch a spec from a URL (`spec`) or render an in-memory document
  // (`specText`, raw YAML/JSON text). `specText` takes precedence and skips the
  // fetch — used for proposal draft schemas co-located in src/ and imported `?raw`.
  spec?: string
  specText?: string
  filterPath?: string
  filterMethod?: string
  displayPath?: string
  overrideServers?: OverrideServer[]
  hideSecurity?: boolean
  containerId?: string
  height?: string
  filterSchema?: string
  patchSchemas?: Record<string, unknown>
}

const props = withDefaults(defineProps<RedocWrapperProps>(), {
  // The default-server fallback can't reference module-level bindings here —
  // `defineProps` is hoisted out of the setup scope at compile time. Build
  // the array inline so the literal expression travels with the macro.
  overrideServers: () => [
    { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` },
    { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` },
    { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` },
  ],
  hideSecurity: false,
  containerId: 'redoc-container',
  height: '90vh',
})

// Minimal shape of the OpenAPI documents we care about. The real spec is
// far richer — we treat it as `unknown`-ish via narrow indexed types so the
// transforms below stay strict without dragging in `openapi-types`.
interface OpenApiDoc {
  openapi?: string | undefined
  info?: unknown
  servers?: OverrideServer[] | undefined
  components?:
    | (
      & { securitySchemes?: unknown; schemas?: Record<string, unknown> }
      & Record<string, unknown>
    )
    | undefined
  paths?: Record<string, Record<string, unknown> | undefined> | undefined
}

interface RedocGlobal {
  init: (
    spec: OpenApiDoc,
    options: Record<string, unknown>,
    container: HTMLElement | null,
  ) => void
}

interface JsYamlGlobal {
  load: (text: string) => unknown
}

interface Win extends Window {
  Redoc?: RedocGlobal
  jsyaml?: JsYamlGlobal
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

// Bumped on every render request. Each `await` below rechecks it so a render
// that started earlier can't init over the top of a newer one — the version
// dropdown can swap props while a spec fetch is still in flight.
let renderToken = 0

async function renderRedoc(): Promise<void> {
  const w = window as Win
  const token = ++renderToken

  if (!w.Redoc) {
    await loadScript('https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js')
  }
  if (!w.jsyaml) {
    await loadScript('https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js')
  }

  if (!w.Redoc || !w.jsyaml) return
  if (token !== renderToken) return

  const yamlText = props.specText ?? (props.spec ? await (await fetch(props.spec)).text() : '')
  if (!yamlText) return
  if (token !== renderToken) return
  const fullSpec = w.jsyaml.load(yamlText) as OpenApiDoc

  let finalSpec: OpenApiDoc = fullSpec

  if (props.filterSchema) {
    // Schema-only mode — synthesise a single POST path exposing the named
    // schema. Inherit responses/parameters from a real path when the
    // displayKey collides with one.
    const displayKey = props.displayPath || `/${props.filterSchema}`
    const realPathObj = fullSpec.paths?.[displayKey] as Record<string, unknown> | undefined
    const realOp = (realPathObj?.['post'] || realPathObj?.['put'] || realPathObj?.['patch']) as
      | Record<string, unknown>
      | undefined

    const syntheticOp: Record<string, unknown> = {
      summary: (realOp?.['summary'] as string | undefined) ?? displayKey,
      description: realOp?.['description'],
      parameters: realOp?.['parameters'],
      security: realOp?.['security'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: `#/components/schemas/${props.filterSchema}` },
          },
        },
      },
      responses: realOp?.['responses'] ?? { '200': { description: 'OK' } },
    }

    finalSpec = {
      openapi: fullSpec.openapi,
      info: fullSpec.info,
      servers: props.overrideServers ?? fullSpec.servers,
      components: fullSpec.components,
      paths: {
        [displayKey]: { post: syntheticOp },
      },
    }
  } else {
    let pathObj: Record<string, unknown> | undefined

    if (props.filterPath && fullSpec.paths?.[props.filterPath]) {
      pathObj = fullSpec.paths[props.filterPath] as Record<string, unknown>
    }

    if (props.filterMethod && pathObj) {
      const method = props.filterMethod.toLowerCase()
      const op = pathObj[method]
      pathObj = op !== undefined ? { [method]: op } : {}
    }

    if (props.hideSecurity && pathObj) {
      pathObj = Object.fromEntries(
        Object.entries(pathObj).map(([method, op]) => {
          if (op && typeof op === 'object') {
            const { security: _security, ...rest } = op as Record<string, unknown>
            return [method, rest]
          }
          return [method, op]
        }),
      )
    }

    const displayKey = props.displayPath || props.filterPath

    finalSpec = {
      openapi: fullSpec.openapi,
      info: fullSpec.info,
      servers: props.overrideServers ?? fullSpec.servers,
      components: props.hideSecurity && fullSpec.components
        ? { ...fullSpec.components, securitySchemes: undefined }
        : fullSpec.components,
      paths: pathObj && displayKey
        ? { [displayKey]: pathObj as Record<string, unknown> }
        : fullSpec.paths,
    }
  }

  if (props.patchSchemas && finalSpec.components?.schemas) {
    for (const [name, override] of Object.entries(props.patchSchemas)) {
      if (finalSpec.components.schemas[name] !== undefined) {
        finalSpec.components.schemas[name] = override
      }
    }
  }

  w.Redoc.init(
    finalSpec,
    {
      hideDownloadButton: true,
      hideLoading: true,
      theme: buildRedocTheme(),
      requiredPropsFirst: true,
      pathInMiddlePanel: true,
      showNextButton: false,
      expandResponses: '200,201',
      schemaExpansionLevel: 'all',
      untrustedSpec: true,
      hideRightPanel: true,
    },
    document.getElementById(props.containerId),
  )
}

// Redoc bakes its theme into styled-components on init. To respond to the
// dark-mode toggle we read the active theme at init time and re-init when
// `html.dark` flips.
function buildRedocTheme(): Record<string, unknown> {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  if (!isDark) {
    return { colors: { primary: { main: '#00695c' } } }
  }
  // Dark theme — primary brand kept, text + surfaces lifted to match the
  // page palette, code blocks tinted to read on dark.
  return {
    colors: {
      primary:   { main: '#4FE3CA' },
      text:      { primary: '#E8EEF6', secondary: 'rgba(232,238,246,0.78)' },
      border:    { dark: 'rgba(255,255,255,0.18)', light: 'rgba(255,255,255,0.08)' },
      // Redoc uses these greys for schema row stripes, property table
      // headers, and type-pill backgrounds. Default is near-white, which
      // is what produced the white-on-white on the dark page.
      gray: { 50: '#161F33', 100: '#1A2440' },
      http: {
        get:    '#5C9CFF',
        post:   '#4FE3CA',
        put:    '#E6A640',
        patch:  '#A8C0E8',
        delete: '#F87171',
      },
      responses: {
        success: { color: '#4FE3CA', backgroundColor: 'rgba(79,227,202,0.10)' },
        error:   { color: '#F87171', backgroundColor: 'rgba(248,113,113,0.10)' },
        info:    { color: '#5C9CFF', backgroundColor: 'rgba(92,156,255,0.10)' },
        redirect:{ color: '#E6A640', backgroundColor: 'rgba(230,166,64,0.10)' },
      },
    },
    typography: {
      links:     { color: '#5C9CFF', visited: '#5C9CFF', hover: '#A8C0E8' },
      code:      { backgroundColor: 'rgba(255,255,255,0.06)', color: '#E8EEF6' },
    },
    schema: {
      nestedBackground: '#0F1626',
      linesColor: 'rgba(255,255,255,0.14)',
      typeNameColor: '#A8C0E8',
      typeTitleColor: '#E8EEF6',
    },
    codeBlock: {
      backgroundColor: '#0B1226',
    },
    rightPanel: {
      backgroundColor: '#0F1626',
      textColor: '#E8EEF6',
    },
  }
}

onMounted(() => {
  void renderRedoc()
})

// Re-init Redoc when the theme toggles so it picks up the new palette.
onThemeChange(() => { void renderRedoc() })

// Re-init when the spec being shown changes without the component remounting.
// The version dropdown pushes a route that resolves to the same route record
// (e.g. /tech/api-specs/:slug), so Vue reuses this instance and only the props
// change — without this the reader keeps seeing the previous version's spec
// until a full page reload.
//
// Deliberately scoped to the scalar props that select the document and
// operation. `overrideServers` and `patchSchemas` are excluded: several call
// sites pass them as inline literals, which are fresh references on every
// parent render and would retrigger a full re-init for no visible change.
watch(
  [
    () => props.spec,
    () => props.specText,
    () => props.filterPath,
    () => props.filterMethod,
    () => props.displayPath,
    () => props.filterSchema,
    () => props.hideSecurity,
    () => props.containerId,
  ],
  () => { void renderRedoc() },
)

// Downloads are only offered for versioned specs served out of /openapi/v*/...
// Unversioned assets (e.g. /openapi/trust-framework.yaml) aren't exported as
// .xlsx by the generator and shouldn't surface a .yaml download either.
const showDownloads = computed<boolean>(() => /^\/openapi\/v/.test(props.spec || ''))
const xlsxHref = computed<string>(() => (props.spec || '').replace(/\.ya?ml$/i, '.xlsx'))

const githubHref = computed<string>(() => {
  const parts = (props.spec || '').split('/').filter(Boolean)
  const category = parts[2]
  if (parts[0] === 'openapi' && category) {
    return `${SPECS_REPO}/${category}`
  }
  return SPECS_REPO
})
</script>

<template>
  <div class="api-page">
    <div class="redoc-toolbar">
      <a v-if="showDownloads" :href="githubHref" class="redoc-toolbar-link" target="_blank" rel="noopener">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"
          class="redoc-toolbar-icon" />
        View on GitHub
      </a>
      <div v-if="showDownloads" class="redoc-toolbar-downloads">
        <a :href="spec" download class="redoc-toolbar-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download .yaml
        </a>
        <a v-if="xlsxButtonEnabled" :href="xlsxHref" download class="redoc-toolbar-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download .xlsx
        </a>
      </div>
    </div>

    <div :id="containerId" class="redoc-wrapper-container" :style="{ minHeight: height, width: '100%' }" />
  </div>
</template>

<style>
.redoc-wrapper-container {
  width: 100%;
  font-family: var(--at-sans, sans-serif) !important;
  overflow: visible;
}

.redoc-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 18px;
  margin-top: 24px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.redoc-toolbar a.redoc-toolbar-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: var(--at-navy-deep);
}

.redoc-toolbar a.redoc-toolbar-link:hover {
  color: var(--at-navy-deep);
  text-decoration: underline;
}

.redoc-toolbar-icon {
  width: 26px;
  height: 26px;
}

html.dark .redoc-toolbar-icon {
  filter: invert(1);
}

.redoc-toolbar-downloads {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.redoc-toolbar a.redoc-toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  color: #fff;
  background: var(--at-teal-deep, #00695c);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.redoc-toolbar a.redoc-toolbar-btn:hover {
  color: #fff;
  background: var(--at-teal, #00897b);
  text-decoration: none;
}

.api-page {
  right: 0;
}

.sc-jXbUNg,
.sc-iGgWBj,
.sc-dExYaf,
.eVrqat {
  display: none !important;
}

.cEAxIC {
  width: 100% !important;
  padding: 0px !important;
}

.dQiXRu {
  width: 100% !important;
}

.redocly-header {
  display: block;
  margin-bottom: 16px;
  padding: 12px 18px;
  font-weight: 600;
  text-align: center;
  position: absolute;
  z-index: 999;
  border: none;
}

.menu-content {
  display: none !important;
}

#redoc-container .api-info h1 {
  display: none;
}

/* Redoc's middle panel ships with a hard white background baked into its
   styled-components — the theme API only reaches a subset of tokens (text,
   right panel, schema nesting). In dark mode that leaves the description
   blocks, markdown content and parameter tables as white surfaces under
   our light text. Force the container and any inner card/table/markdown
   surface to inherit the dark page background so text reads. */
html.dark .redoc-wrapper-container {
  background: var(--at-bg-paper);
  color: var(--at-navy-deep);
}

html.dark .redoc-wrapper-container .api-content,
html.dark .redoc-wrapper-container .api-info {
  background: transparent !important;
  color: var(--at-navy-deep);
}

html.dark .redoc-wrapper-container .redoc-markdown,
html.dark .redoc-wrapper-container .redoc-markdown p,
html.dark .redoc-wrapper-container .redoc-markdown li,
html.dark .redoc-wrapper-container .redoc-markdown blockquote,
html.dark .redoc-wrapper-container .redoc-markdown div {
  background: transparent !important;
  color: var(--at-navy-deep);
}

html.dark .redoc-wrapper-container .redoc-markdown table,
html.dark .redoc-wrapper-container .redoc-markdown thead,
html.dark .redoc-wrapper-container .redoc-markdown tbody,
html.dark .redoc-wrapper-container .redoc-markdown tr,
html.dark .redoc-wrapper-container .redoc-markdown th,
html.dark .redoc-wrapper-container .redoc-markdown td {
  background: transparent !important;
  color: var(--at-navy-deep);
  border-color: rgba(255, 255, 255, 0.14) !important;
}

html.dark .redoc-wrapper-container .redoc-markdown th {
  background: rgba(255, 255, 255, 0.04) !important;
}

/* Redoc's standalone bundle minifies styled-component class names down to
   hashes (`sc-ikkxIA`, `daqcVd`, etc.) that change every build, so we
   can't target the displayNames. The reliable structural hook is the
   nested-schema wrapper: it always sits directly inside a `<td colspan="2">`.

   Redoc alternates nested-schema backgrounds by depth — depth 1 gets the
   themed `schema.nestedBackground`, depth 2 hard-codes white, depth 3
   themed again, and so on. The theme API can't reach the white. Forcing
   every nested-schema wrapper (and any further-nested wrapper inside it)
   onto the dark page surface gives a single consistent dark background
   at all depths. */
html.dark .redoc-wrapper-container td[colspan="2"] > div,
html.dark .redoc-wrapper-container td[colspan="2"] > div > div {
  background: var(--at-bg-paper) !important;
}

/* All property-row cells are <td kind="field" ...> — `kind` is a stable
   attribute Redoc emits regardless of class minification. Plus blanket
   table-cell transparency as a safety net for anything we missed. */
html.dark .redoc-wrapper-container td[kind="field"],
html.dark .redoc-wrapper-container table,
html.dark .redoc-wrapper-container td,
html.dark .redoc-wrapper-container th,
html.dark .redoc-wrapper-container tr {
  background-color: transparent !important;
  color: var(--at-navy-deep);
}

/* Inline `<code>` inside markdown descriptions — pale grey chip on white
   in the default theme; lift to a translucent white for contrast on dark. */
html.dark .redoc-wrapper-container .redoc-markdown code {
  background: rgba(255, 255, 255, 0.08) !important;
  color: var(--at-navy-deep) !important;
}
</style>
