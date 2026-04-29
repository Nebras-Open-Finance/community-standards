<script setup lang="ts">
import { CURRENT_VERSION } from '@/data/versions'

const SPECS_REPO = 'https://github.com/Nebras-Open-Finance/api-specs/tree/main/dist'

const xlsxButtonEnabled = true

interface OverrideServer {
  url: string
  description?: string
}

interface RedocWrapperProps {
  spec: string
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

async function renderRedoc(): Promise<void> {
  const w = window as Win

  if (!w.Redoc) {
    await loadScript('https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js')
  }
  if (!w.jsyaml) {
    await loadScript('https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js')
  }

  if (!w.Redoc || !w.jsyaml) return

  const res = await fetch(props.spec)
  const yamlText = await res.text()
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
      theme: { colors: { primary: { main: '#00695c' } } },
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

onMounted(() => {
  void renderRedoc()
})

// Downloads are only offered for versioned specs served out of /openapi/v*/...
// Unversioned assets (e.g. /openapi/trust-framework.yaml) aren't exported as
// .xlsx by the generator and shouldn't surface a .yaml download either.
const showDownloads = computed<boolean>(() => /^\/openapi\/v/.test(props.spec || ''))
const xlsxHref = computed<string>(() => props.spec.replace(/\.ya?ml$/i, '.xlsx'))

const githubHref = computed<string>(() => {
  const parts = props.spec.split('/').filter(Boolean)
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
</style>
