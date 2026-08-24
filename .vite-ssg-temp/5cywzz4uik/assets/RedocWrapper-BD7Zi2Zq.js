import { defineComponent, onMounted, watch, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { C as CURRENT_VERSION } from "../main.mjs";
import { o as onThemeChange } from "./useChartTheme-DtmiKid7.js";
const SPECS_REPO = "https://github.com/Nebras-Open-Finance/api-specs/tree/main/dist";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RedocWrapper",
  __ssrInlineRender: true,
  props: {
    spec: {},
    specText: {},
    filterPath: {},
    filterMethod: {},
    displayPath: {},
    overrideServers: { default: () => [
      { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` },
      { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` },
      { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/account-information/${CURRENT_VERSION}` }
    ] },
    hideSecurity: { type: Boolean, default: false },
    containerId: { default: "redoc-container" },
    height: { default: "90vh" },
    filterSchema: {},
    patchSchemas: {}
  },
  setup(__props) {
    const props = __props;
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });
    }
    let renderToken = 0;
    async function renderRedoc() {
      var _a, _b, _c;
      const w = window;
      const token = ++renderToken;
      if (!w.Redoc) {
        await loadScript("https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js");
      }
      if (!w.jsyaml) {
        await loadScript("https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js");
      }
      if (!w.Redoc || !w.jsyaml) return;
      if (token !== renderToken) return;
      const yamlText = props.specText ?? (props.spec ? await (await fetch(props.spec)).text() : "");
      if (!yamlText) return;
      if (token !== renderToken) return;
      const fullSpec = w.jsyaml.load(yamlText);
      let finalSpec = fullSpec;
      if (props.filterSchema) {
        const displayKey = props.displayPath || `/${props.filterSchema}`;
        const realPathObj = (_a = fullSpec.paths) == null ? void 0 : _a[displayKey];
        const realOp = (realPathObj == null ? void 0 : realPathObj["post"]) || (realPathObj == null ? void 0 : realPathObj["put"]) || (realPathObj == null ? void 0 : realPathObj["patch"]);
        const syntheticOp = {
          summary: (realOp == null ? void 0 : realOp["summary"]) ?? displayKey,
          description: realOp == null ? void 0 : realOp["description"],
          parameters: realOp == null ? void 0 : realOp["parameters"],
          security: realOp == null ? void 0 : realOp["security"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: `#/components/schemas/${props.filterSchema}` }
              }
            }
          },
          responses: (realOp == null ? void 0 : realOp["responses"]) ?? { "200": { description: "OK" } }
        };
        finalSpec = {
          openapi: fullSpec.openapi,
          info: fullSpec.info,
          servers: props.overrideServers ?? fullSpec.servers,
          components: fullSpec.components,
          paths: {
            [displayKey]: { post: syntheticOp }
          }
        };
      } else {
        let pathObj;
        if (props.filterPath && ((_b = fullSpec.paths) == null ? void 0 : _b[props.filterPath])) {
          pathObj = fullSpec.paths[props.filterPath];
        }
        if (props.filterMethod && pathObj) {
          const method = props.filterMethod.toLowerCase();
          const op = pathObj[method];
          pathObj = op !== void 0 ? { [method]: op } : {};
        }
        if (props.hideSecurity && pathObj) {
          pathObj = Object.fromEntries(
            Object.entries(pathObj).map(([method, op]) => {
              if (op && typeof op === "object") {
                const { security: _security, ...rest } = op;
                return [method, rest];
              }
              return [method, op];
            })
          );
        }
        const displayKey = props.displayPath || props.filterPath;
        finalSpec = {
          openapi: fullSpec.openapi,
          info: fullSpec.info,
          servers: props.overrideServers ?? fullSpec.servers,
          components: props.hideSecurity && fullSpec.components ? { ...fullSpec.components, securitySchemes: void 0 } : fullSpec.components,
          paths: pathObj && displayKey ? { [displayKey]: pathObj } : fullSpec.paths
        };
      }
      if (props.patchSchemas && ((_c = finalSpec.components) == null ? void 0 : _c.schemas)) {
        for (const [name, override] of Object.entries(props.patchSchemas)) {
          if (finalSpec.components.schemas[name] !== void 0) {
            finalSpec.components.schemas[name] = override;
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
          expandResponses: "200,201",
          schemaExpansionLevel: "all",
          untrustedSpec: true,
          hideRightPanel: true
        },
        document.getElementById(props.containerId)
      );
    }
    function buildRedocTheme() {
      const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
      if (!isDark) {
        return { colors: { primary: { main: "#00695c" } } };
      }
      return {
        colors: {
          primary: { main: "#4FE3CA" },
          text: { primary: "#E8EEF6", secondary: "rgba(232,238,246,0.78)" },
          border: { dark: "rgba(255,255,255,0.18)", light: "rgba(255,255,255,0.08)" },
          // Redoc uses these greys for schema row stripes, property table
          // headers, and type-pill backgrounds. Default is near-white, which
          // is what produced the white-on-white on the dark page.
          gray: { 50: "#161F33", 100: "#1A2440" },
          http: {
            get: "#5C9CFF",
            post: "#4FE3CA",
            put: "#E6A640",
            patch: "#A8C0E8",
            delete: "#F87171"
          },
          responses: {
            success: { color: "#4FE3CA", backgroundColor: "rgba(79,227,202,0.10)" },
            error: { color: "#F87171", backgroundColor: "rgba(248,113,113,0.10)" },
            info: { color: "#5C9CFF", backgroundColor: "rgba(92,156,255,0.10)" },
            redirect: { color: "#E6A640", backgroundColor: "rgba(230,166,64,0.10)" }
          }
        },
        typography: {
          links: { color: "#5C9CFF", visited: "#5C9CFF", hover: "#A8C0E8" },
          code: { backgroundColor: "rgba(255,255,255,0.06)", color: "#E8EEF6" }
        },
        schema: {
          nestedBackground: "#0F1626",
          linesColor: "rgba(255,255,255,0.14)",
          typeNameColor: "#A8C0E8",
          typeTitleColor: "#E8EEF6"
        },
        codeBlock: {
          backgroundColor: "#0B1226"
        },
        rightPanel: {
          backgroundColor: "#0F1626",
          textColor: "#E8EEF6"
        }
      };
    }
    onMounted(() => {
      void renderRedoc();
    });
    onThemeChange(() => {
      void renderRedoc();
    });
    watch(
      [
        () => props.spec,
        () => props.specText,
        () => props.filterPath,
        () => props.filterMethod,
        () => props.displayPath,
        () => props.filterSchema,
        () => props.hideSecurity,
        () => props.containerId
      ],
      () => {
        void renderRedoc();
      }
    );
    const showDownloads = computed(() => /^\/openapi\/v/.test(props.spec || ""));
    const xlsxHref = computed(() => (props.spec || "").replace(/\.ya?ml$/i, ".xlsx"));
    const githubHref = computed(() => {
      const parts = (props.spec || "").split("/").filter(Boolean);
      const category = parts[2];
      if (parts[0] === "openapi" && category) {
        return `${SPECS_REPO}/${category}`;
      }
      return SPECS_REPO;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "api-page" }, _attrs))}><div class="redoc-toolbar">`);
      if (unref(showDownloads)) {
        _push(`<a${ssrRenderAttr("href", unref(githubHref))} class="redoc-toolbar-link" target="_blank" rel="noopener"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" class="redoc-toolbar-icon"> View on GitHub </a>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDownloads)) {
        _push(`<div class="redoc-toolbar-downloads"><a${ssrRenderAttr("href", __props.spec)} download class="redoc-toolbar-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download .yaml </a>`);
        {
          _push(`<a${ssrRenderAttr("href", unref(xlsxHref))} download class="redoc-toolbar-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download .xlsx </a>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div${ssrRenderAttr("id", __props.containerId)} class="redoc-wrapper-container" style="${ssrRenderStyle({ minHeight: __props.height, width: "100%" })}"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/RedocWrapper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
