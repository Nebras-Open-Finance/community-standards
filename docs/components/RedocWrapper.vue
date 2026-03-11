<template>
<div class="api-page">

  <!-- <div class="redocly-header">
    <h1 style="font-size: 2rem; margin-top: 2rem;">{{ props.title }}</h1>

    <div class="nav-links">

      <a :href="backHref" class="nav-link back-link">
        <svg style=" transform: rotate(180deg);" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
        Back to the Standards
      </a>

      <a :href="gitHref" class="nav-link git-link" style="margin-left: auto;" target="_blank" rel="noopener">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub"
          class="icon" />
        Go to Git Repository
      </a>
    </div>


  </div> -->
  <div id="redoc-container" style="height: 90vh; width: 100%;"></div>
</div>
</template>

<script setup>
import { onMounted } from 'vue'

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
    default: null // e.g., [{ url: 'https://...' }]
  },
  hideSecurity: {
    type: Boolean,
    default: false
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

      let pathObj;

      // 3️⃣ Filter path if prop is provided
      if (props.filterPath && fullSpec.paths?.[props.filterPath]) {
        pathObj = fullSpec.paths[props.filterPath];
      }

        if (props.filterMethod) {
    const method = props.filterMethod.toLowerCase(); // OpenAPI uses lowercase keys
    if (pathObj[method]) {
      pathObj = { [method]: pathObj[method] };
    } else {
      pathObj = {}; // no match
    }
  }


      // 4️⃣ Strip security if requested
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
        paths: {
          [displayKey]: pathObj
        }
      };

      // 4️⃣ Initialize Redoc
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
        document.getElementById('redoc-container')
      )
    }

    document.head.appendChild(yamlScript)
  }

  document.head.appendChild(redocScript)
})



const getBackHref = () => {
  const url = new URL(window.location.href)
  const segments = url.pathname.split('/').filter(Boolean)

  segments.pop() // remove last path segment
  url.pathname = '/' + segments.join('/')

  return url.pathname // relative path is best for SPAs
}

const backHref = getBackHref()

</script>

<style>
#redoc-container {
  height: 90vh;
  width: 100%;
  font-family: var(--vp-font-family-base) !important;
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