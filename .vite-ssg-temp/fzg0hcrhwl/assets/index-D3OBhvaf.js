import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdProse = __unplugin_components_4;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-a4c230ca><section class="ed-doc__hero" data-v-a4c230ca><div class="ed-doc__inner" data-v-a4c230ca><div class="ed-doc__eyebrow" data-v-a4c230ca><span class="ed-doc__eyebrow-dash" data-v-a4c230ca></span> LFI · Ozone Connect · Health Check </div><h1 class="ed-doc__title" data-v-a4c230ca> Health Check <span class="ed-doc__read" data-v-a4c230ca>2 min read</span></h1><p class="ed-doc__lede" data-v-a4c230ca> The <strong data-v-a4c230ca>Health Check API</strong> is a small family of Ozone Connect endpoints implemented by your LFI. The API Hub calls these endpoints to verify end-to-end connectivity, mutual TLS, and client-certificate propagation between the Hub and your Ozone Connect surface. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-a4c230ca> These endpoints MUST be implemented and reachable before your integration can proceed to testing — they are the first endpoints Ozone will call during <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#connectivity-validation" data-v-a4c230ca>onboarding connectivity validation</a>, and they are used again whenever you rotate certificates or change network routing. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "endpoints",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Endpoints",
    title: "The three Health Check endpoints",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-a4c230ca${_scopeId2}><thead data-v-a4c230ca${_scopeId2}><tr data-v-a4c230ca${_scopeId2}><th data-v-a4c230ca${_scopeId2}>Endpoint</th><th data-v-a4c230ca${_scopeId2}>Purpose</th></tr></thead><tbody data-v-a4c230ca${_scopeId2}><tr data-v-a4c230ca${_scopeId2}><td data-v-a4c230ca${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello" class="endpoint" data-v-a4c230ca${_scopeId2}><span class="http-method http-method--get" data-v-a4c230ca${_scopeId2}>GET</span><code data-v-a4c230ca${_scopeId2}>/hello</code></a></td><td data-v-a4c230ca${_scopeId2}>Basic connectivity check with no mTLS. Confirms network routing and that your Ozone Connect server is reachable from the Hub.</td></tr><tr data-v-a4c230ca${_scopeId2}><td data-v-a4c230ca${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello-mtls" class="endpoint" data-v-a4c230ca${_scopeId2}><span class="http-method http-method--get" data-v-a4c230ca${_scopeId2}>GET</span><code data-v-a4c230ca${_scopeId2}>/hello-mtls</code></a></td><td data-v-a4c230ca${_scopeId2}>Same as <code data-v-a4c230ca${_scopeId2}>/hello</code> but requires a valid client certificate. Confirms that mutual TLS is correctly terminated at your edge.</td></tr><tr data-v-a4c230ca${_scopeId2}><td data-v-a4c230ca${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/echo-cert" class="endpoint" data-v-a4c230ca${_scopeId2}><span class="http-method http-method--get" data-v-a4c230ca${_scopeId2}>GET</span><code data-v-a4c230ca${_scopeId2}>/echo-cert</code></a></td><td data-v-a4c230ca${_scopeId2}>Returns the client certificate details your server received. Used to debug certificate propagation through reverse proxies and load balancers — useful when mTLS appears to succeed at the edge but the cert is stripped before reaching your application.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Purpose")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/hello")
                        ])
                      ]),
                      createVNode("td", null, "Basic connectivity check with no mTLS. Confirms network routing and that your Ozone Connect server is reachable from the Hub.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello-mtls",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/hello-mtls")
                        ])
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Same as "),
                        createVNode("code", null, "/hello"),
                        createTextVNode(" but requires a valid client certificate. Confirms that mutual TLS is correctly terminated at your edge.")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/echo-cert",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/echo-cert")
                        ])
                      ]),
                      createVNode("td", null, "Returns the client certificate details your server received. Used to debug certificate propagation through reverse proxies and load balancers — useful when mTLS appears to succeed at the edge but the cert is stripped before reaching your application.")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Purpose")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/hello")
                      ])
                    ]),
                    createVNode("td", null, "Basic connectivity check with no mTLS. Confirms network routing and that your Ozone Connect server is reachable from the Hub.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello-mtls",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/hello-mtls")
                      ])
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Same as "),
                      createVNode("code", null, "/hello"),
                      createTextVNode(" but requires a valid client certificate. Confirms that mutual TLS is correctly terminated at your edge.")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/echo-cert",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/echo-cert")
                      ])
                    ]),
                    createVNode("td", null, "Returns the client certificate details your server received. Used to debug certificate propagation through reverse proxies and load balancers — useful when mTLS appears to succeed at the edge but the cert is stripped before reaching your application.")
                  ])
                ])
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "when-called",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "When the Hub calls these endpoints",
    title: "Onboarding, rotations, and ongoing monitoring",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-a4c230ca${_scopeId2}><strong data-v-a4c230ca${_scopeId2}>During onboarding.</strong> Before your integration can proceed to testing, Ozone runs end-to-end connectivity validation in both directions. On the LFI side, this means calling <code data-v-a4c230ca${_scopeId2}>/hello</code>, <code data-v-a4c230ca${_scopeId2}>/hello-mtls</code>, and <code data-v-a4c230ca${_scopeId2}>/echo-cert</code> on your Ozone Connect server. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#connectivity-validation" data-v-a4c230ca${_scopeId2}>Environment Specific — end-to-end validation</a>. </li><li data-v-a4c230ca${_scopeId2}><strong data-v-a4c230ca${_scopeId2}>After certificate rotation.</strong> Whenever transport certificates are rotated or network routing changes, the same endpoints are used to re-verify connectivity. </li><li data-v-a4c230ca${_scopeId2}><strong data-v-a4c230ca${_scopeId2}>For ongoing health monitoring.</strong> The Hub may periodically call <code data-v-a4c230ca${_scopeId2}>/hello</code> and <code data-v-a4c230ca${_scopeId2}>/hello-mtls</code> to confirm the LFI surface remains reachable. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "During onboarding."),
                  createTextVNode(" Before your integration can proceed to testing, Ozone runs end-to-end connectivity validation in both directions. On the LFI side, this means calling "),
                  createVNode("code", null, "/hello"),
                  createTextVNode(", "),
                  createVNode("code", null, "/hello-mtls"),
                  createTextVNode(", and "),
                  createVNode("code", null, "/echo-cert"),
                  createTextVNode(" on your Ozone Connect server. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#connectivity-validation" }, "Environment Specific — end-to-end validation"),
                  createTextVNode(". ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "After certificate rotation."),
                  createTextVNode(" Whenever transport certificates are rotated or network routing changes, the same endpoints are used to re-verify connectivity. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "For ongoing health monitoring."),
                  createTextVNode(" The Hub may periodically call "),
                  createVNode("code", null, "/hello"),
                  createTextVNode(" and "),
                  createVNode("code", null, "/hello-mtls"),
                  createTextVNode(" to confirm the LFI surface remains reachable. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "During onboarding."),
                createTextVNode(" Before your integration can proceed to testing, Ozone runs end-to-end connectivity validation in both directions. On the LFI side, this means calling "),
                createVNode("code", null, "/hello"),
                createTextVNode(", "),
                createVNode("code", null, "/hello-mtls"),
                createTextVNode(", and "),
                createVNode("code", null, "/echo-cert"),
                createTextVNode(" on your Ozone Connect server. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#connectivity-validation" }, "Environment Specific — end-to-end validation"),
                createTextVNode(". ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "After certificate rotation."),
                createTextVNode(" Whenever transport certificates are rotated or network routing changes, the same endpoints are used to re-verify connectivity. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "For ongoing health monitoring."),
                createTextVNode(" The Hub may periodically call "),
                createVNode("code", null, "/hello"),
                createTextVNode(" and "),
                createVNode("code", null, "/hello-mtls"),
                createTextVNode(" to confirm the LFI surface remains reachable. ")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "base-path",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Base path",
    title: "Where these endpoints sit on your Ozone Connect server",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` These endpoints sit on your Ozone Connect server alongside the Banking and Consent Events APIs. If you configure a path override for the Health Check family during onboarding, the Hub calls <code data-v-a4c230ca${_scopeId2}>OzoneConnectURL/&lt;path&gt;/&lt;endpoint&gt;</code> — see <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#optional-api-family-base-paths" data-v-a4c230ca${_scopeId2}>Environment Specific — optional API family base paths</a>. `);
            } else {
              return [
                createTextVNode(" These endpoints sit on your Ozone Connect server alongside the Banking and Consent Events APIs. If you configure a path override for the Health Check family during onboarding, the Hub calls "),
                createVNode("code", null, "OzoneConnectURL/<path>/<endpoint>"),
                createTextVNode(" — see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#optional-api-family-base-paths" }, "Environment Specific — optional API family base paths"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" These endpoints sit on your Ozone Connect server alongside the Banking and Consent Events APIs. If you configure a path override for the Health Check family during onboarding, the Hub calls "),
              createVNode("code", null, "OzoneConnectURL/<path>/<endpoint>"),
              createTextVNode(" — see "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#optional-api-family-base-paths" }, "Environment Specific — optional API family base paths"),
              createTextVNode(". ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/health-check/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a4c230ca"]]);
export {
  index as default
};
