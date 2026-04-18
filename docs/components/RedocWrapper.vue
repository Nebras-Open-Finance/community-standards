<template>
<div class="api-page">

  <div class="redoc-toolbar">
    <a :href="githubHref" class="redoc-toolbar-link" target="_blank" rel="noopener">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"
        class="redoc-toolbar-icon" />
      View on GitHub
    </a>
    <a :href="spec" :download="downloadName" class="redoc-toolbar-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download .yaml
    </a>
  </div>

  <div :id="containerId" class="redoc-wrapper-container" :style="{ height: height, width: '100%' }"></div>
</div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { CURRENT_VERSION } from '../.vitepress/version'

const SPECS_REPO = 'https://github.com/Nebras-Open-Finance/api-specs/tree/main/dist'

const props = defineProps({
  spec: {
    type: String,
    required: true
  },
  filterPath: {
    type: String,
    default: null
  },
  filterMethod: {
    type: String,
    default: null // e.g., "GET", "POST"
  },
  displayPath: {
    type: String,
    default: null // override the path key shown in the UI
  },
  overrideServers: {
    type: Array,
    default: () => [
      { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` },
      { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` },
      { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` },
    ]
  },
  hideSecurity: {
    type: Boolean,
    default: false
  },
  containerId: {
    type: String,
    default: 'redoc-container'
  },
  height: {
    type: String,
    default: '90vh'
  },
  filterSchema: {
    type: String,
    default: null // e.g., "AEBankServiceInitiation.AEDomesticPaymentPIIProperties"
  },
  patchSchemas: {
    type: Object,
    default: null // e.g., { AEWebhookEventTypes: { '$ref': '#/components/schemas/AEWebhookConsentedEventProperties' } }
  }
})


onMounted(() => {
  const redocScript = document.createElement('script')
  redocScript.src = 'https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js'
  redocScript.async = true

  redocScript.onload = async () => {
    // Load YAML parser
    const yamlScript = document.createElement('script')
    yamlScript.src = 'https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js'
    yamlScript.async = true

    yamlScript.onload = async () => {
      // 1️⃣ Fetch YAML
      const res = await fetch(props.spec)
      const yamlText = await res.text()

      // 2️⃣ Convert YAML → JS object
      const fullSpec = window.jsyaml.load(yamlText)

      let finalSpec = fullSpec

      // 3️⃣ Schema-only mode: build a synthetic path exposing just the named schema
      if (props.filterSchema) {
        const displayKey = props.displayPath || `/${props.filterSchema}`

        // If displayKey matches a real path, inherit its responses/parameters/security
        const realPathObj = fullSpec.paths?.[displayKey]
        const realOp = realPathObj?.post || realPathObj?.put || realPathObj?.patch

        const syntheticOp = {
          summary: realOp?.summary || displayKey,
          description: realOp?.description,
          parameters: realOp?.parameters,
          security: realOp?.security,
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { '$ref': `#/components/schemas/${props.filterSchema}` }
              }
            }
          },
          responses: realOp?.responses || { '200': { description: 'OK' } }
        }

        finalSpec = {
          openapi: fullSpec.openapi,
          info: fullSpec.info,
          servers: props.overrideServers ?? fullSpec.servers,
          components: fullSpec.components,
          paths: {
            [displayKey]: { post: syntheticOp }
          }
        }
      } else {
        let pathObj;

        // Filter path if prop is provided
        if (props.filterPath && fullSpec.paths?.[props.filterPath]) {
          pathObj = fullSpec.paths[props.filterPath];
        }

        if (props.filterMethod) {
          const method = props.filterMethod.toLowerCase();
          if (pathObj[method]) {
            pathObj = { [method]: pathObj[method] };
          } else {
            pathObj = {};
          }
        }

        // Strip security if requested
        if (props.hideSecurity && pathObj) {
          pathObj = Object.fromEntries(
            Object.entries(pathObj).map(([method, op]) => {
              const { security, ...rest } = op
              return [method, rest]
            })
          )
        }

        const displayKey = props.displayPath || props.filterPath

        finalSpec = {
          openapi: fullSpec.openapi,
          info: fullSpec.info,
          servers: props.overrideServers ?? fullSpec.servers,
          components: props.hideSecurity
            ? { ...fullSpec.components, securitySchemes: undefined }
            : fullSpec.components,
          paths: pathObj
            ? { [displayKey]: pathObj }
            : fullSpec.paths
        };
      }

      // 4️⃣ Apply schema patches
      if (props.patchSchemas && finalSpec.components?.schemas) {
        for (const [name, override] of Object.entries(props.patchSchemas)) {
          if (finalSpec.components.schemas[name] !== undefined) {
            finalSpec.components.schemas[name] = override
          }
        }
      }

      // 5️⃣ Initialize Redoc
      window.Redoc.init(
        finalSpec,
        {
          hideDownloadButton: true,
          hideLoading: true,
          theme: {
            colors: { primary: { main: '#00695c' } }
          },
          requiredPropsFirst: true,
          pathInMiddlePanel: true,
          showNextButton: false,
          expandResponses: "200,201",
          schemaExpansionLevel: "all",

          untrustedSpec: true,
          hideRightPanel: true,
        },
        document.getElementById(props.containerId)
      )
    }

    document.head.appendChild(yamlScript)
  }

  document.head.appendChild(redocScript)
})



const downloadName = computed(() => {
  const parts = props.spec.split('/').filter(Boolean)
  return parts[parts.length - 1] || 'openapi.yaml'
})

const githubHref = computed(() => {
  // Expected spec path: /openapi/{version}/{category}/{file}.yaml
  const parts = props.spec.split('/').filter(Boolean)
  const category = parts[2]
  if (parts[0] === 'openapi' && category) {
    return `${SPECS_REPO}/${category}`
  }
  return SPECS_REPO
})

</script>

<style>
.redoc-wrapper-container {
  width: 100%;
  font-family: var(--vp-font-family-base) !important;
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
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.redoc-toolbar a.redoc-toolbar-link:hover {
  color: var(--vp-c-text-1);
  text-decoration: underline;
}

.redoc-toolbar-icon {
  width: 18px;
  height: 18px;
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
  background: var(--vp-c-brand-1);
  border: none;
  border-radius: 6px;
  margin-left: auto;
  cursor: pointer;
  transition: background 0.2s;
}

.redoc-toolbar a.redoc-toolbar-btn:hover {
  color: #fff;
  background: var(--vp-c-brand-2);
  text-decoration: none;
}

.api-page {
  right: 0;
  min-width: calc(100vw - (224px + (50vw - 448px)));
}

.sc-jXbUNg {
  display: none !important;
}

.sc-iGgWBj {
  display: none !important;
}

.sc-dExYaf {
  display: none !important;
}

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

.back-btn:hover {
  transform: translateY(-1px);
  box-shadow:
    0 0 0 1px rgba(0, 179, 164, 0.6),
    0 8px 28px rgba(0, 179, 164, 0.4);
}

#redoc-container .api-info h1 {
  display: none;
}

@media (min-width: 1201px) {
  .redocly-header {
    left: 260px;
    width: calc(60% - 156px);
  }
}


@media (min-width: 801px) and (max-width: 1200px) {
  .redocly-header {
    left: 260px;
    width: calc(100% - 260px);
  }
}

@media (max-width: 800px) {
  .redocly-header {
    width: 100%;
  }
}

.nav-links {
  padding-left: 20px;
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  cursor: pointer;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  text-decoration: none;
  color: #005fb8;
  min-width: 200px;
}

.nav-link:hover {
  text-decoration: underline;
}

.icon {
  width: 18px;
  height: 18px;
}

.back-link .icon {
  font-size: 18px;
}

</style>