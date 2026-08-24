import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const wellKnownUrl = `https://auth1.[LFICode].apihub.openfinance.ae/.well-known/openid-configuration`;
const exampleResponse = `{
  "issuer": "https://auth1.[LFICode].apihub.openfinance.ae",
  ...
  "token_endpoint": "https://as1.[LFICode].apihub.openfinance.ae/token",
  "authorization_endpoint": "https://app.lfi.com/open-finance",
  "registration_endpoint": "https://rs1.[LFICode].apihub.openfinance.ae/tpp-registration",
  "jwks_uri": "https://keystore.directory.openfinance.ae/64e5061d-123f-43c8-9f17-1df9a4600705/application.jwks"
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "well-known",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c7dea013><section class="ed-doc__hero" data-v-c7dea013><div class="ed-doc__inner" data-v-c7dea013><div class="ed-doc__eyebrow" data-v-c7dea013><span class="ed-doc__eyebrow-dash" data-v-c7dea013></span> TPP · Trust Framework · LFI Discovery </div><h1 class="ed-doc__title" data-v-c7dea013> Authorisation Server Discovery <span class="ed-doc__read" data-v-c7dea013>2 min read</span></h1><p class="ed-doc__lede" data-v-c7dea013> The <code data-v-c7dea013>.well-known/openid-configuration</code> endpoint provides a standardized way for Third Party Providers (TPPs) to retrieve OAuth 2.0 and OpenID Connect configuration for a Licensed Financial Institution (LFI). This allows TPPs to discover authorization, token, and other endpoints programmatically, without hardcoding URLs. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "discovery-url",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Discovery URL",
        title: "The .well-known endpoint format for UAE Open Finance",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For UAE Open Finance, the discovery URL format is:`);
                } else {
                  return [
                    createTextVNode("For UAE Open Finance, the discovery URL format is:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: wellKnownUrl,
              lang: "bash",
              filename: ".well-known URL"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For UAE Open Finance, the discovery URL format is:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: wellKnownUrl,
                lang: "bash",
                filename: ".well-known URL"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "properties",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Properties",
        title: "Key fields returned by the discovery endpoint",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c7dea013${_scopeId2}><thead data-v-c7dea013${_scopeId2}><tr data-v-c7dea013${_scopeId2}><th data-v-c7dea013${_scopeId2}>Property</th><th data-v-c7dea013${_scopeId2}>Description</th></tr></thead><tbody data-v-c7dea013${_scopeId2}><tr data-v-c7dea013${_scopeId2}><td data-v-c7dea013${_scopeId2}><code data-v-c7dea013${_scopeId2}>issuer</code></td><td data-v-c7dea013${_scopeId2}>Identifier for the Authorization Server, used in JWT validation.</td></tr><tr data-v-c7dea013${_scopeId2}><td data-v-c7dea013${_scopeId2}><code data-v-c7dea013${_scopeId2}>authorization_endpoint</code></td><td data-v-c7dea013${_scopeId2}>URL where end-users are redirected to in order to authenticate and authorize access.</td></tr><tr data-v-c7dea013${_scopeId2}><td data-v-c7dea013${_scopeId2}><code data-v-c7dea013${_scopeId2}>token_endpoint</code></td><td data-v-c7dea013${_scopeId2}>Endpoint to exchange authorization codes or other grants for access tokens.</td></tr><tr data-v-c7dea013${_scopeId2}><td data-v-c7dea013${_scopeId2}><code data-v-c7dea013${_scopeId2}>registration_endpoint</code></td><td data-v-c7dea013${_scopeId2}>Endpoint for Dynamic Client Registration (DCR) using software statements.</td></tr><tr data-v-c7dea013${_scopeId2}><td data-v-c7dea013${_scopeId2}><code data-v-c7dea013${_scopeId2}>jwks_uri</code></td><td data-v-c7dea013${_scopeId2}>URL exposing the server&#39;s public keys for validating JWT signatures.</td></tr><tr data-v-c7dea013${_scopeId2}><td data-v-c7dea013${_scopeId2}><code data-v-c7dea013${_scopeId2}>pushed_authorization_request_endpoint</code></td><td data-v-c7dea013${_scopeId2}>Endpoint for submitting signed authorization requests (PAR flow).</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Property"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "issuer")
                          ]),
                          createVNode("td", null, "Identifier for the Authorization Server, used in JWT validation.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "authorization_endpoint")
                          ]),
                          createVNode("td", null, "URL where end-users are redirected to in order to authenticate and authorize access.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "token_endpoint")
                          ]),
                          createVNode("td", null, "Endpoint to exchange authorization codes or other grants for access tokens.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "registration_endpoint")
                          ]),
                          createVNode("td", null, "Endpoint for Dynamic Client Registration (DCR) using software statements.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jwks_uri")
                          ]),
                          createVNode("td", null, "URL exposing the server's public keys for validating JWT signatures.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "pushed_authorization_request_endpoint")
                          ]),
                          createVNode("td", null, "Endpoint for submitting signed authorization requests (PAR flow).")
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
                        createVNode("th", null, "Property"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "issuer")
                        ]),
                        createVNode("td", null, "Identifier for the Authorization Server, used in JWT validation.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "authorization_endpoint")
                        ]),
                        createVNode("td", null, "URL where end-users are redirected to in order to authenticate and authorize access.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "token_endpoint")
                        ]),
                        createVNode("td", null, "Endpoint to exchange authorization codes or other grants for access tokens.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "registration_endpoint")
                        ]),
                        createVNode("td", null, "Endpoint for Dynamic Client Registration (DCR) using software statements.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jwks_uri")
                        ]),
                        createVNode("td", null, "URL exposing the server's public keys for validating JWT signatures.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "pushed_authorization_request_endpoint")
                        ]),
                        createVNode("td", null, "Endpoint for submitting signed authorization requests (PAR flow).")
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
        id: "example",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Example response",
        title: "A typical .well-known JSON document",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleResponse,
              lang: "json",
              filename: "GET /.well-known/openid-configuration"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: exampleResponse,
                lang: "json",
                filename: "GET /.well-known/openid-configuration"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "caching",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Caching",
        title: "Discovery responses are cached",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The information returned from <span class="endpoint" data-v-c7dea013${_scopeId2}><span class="http-method http-method--get" data-v-c7dea013${_scopeId2}>GET</span><code data-v-c7dea013${_scopeId2}>/.well-known/openid-configuration</code></span> changes infrequently and is cached accordingly. `);
                } else {
                  return [
                    createTextVNode(" The information returned from "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/.well-known/openid-configuration")
                    ]),
                    createTextVNode(" changes infrequently and is cached accordingly. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c7dea013${_scopeId2}><strong data-v-c7dea013${_scopeId2}>Cache-Control header:</strong> <code data-v-c7dea013${_scopeId2}>max-age=900</code></li><li data-v-c7dea013${_scopeId2}><strong data-v-c7dea013${_scopeId2}>Cache duration:</strong> 15 minutes</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cache-Control header:"),
                      createTextVNode(),
                      createVNode("code", null, "max-age=900")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Cache duration:"),
                      createTextVNode(" 15 minutes")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The information returned from "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/.well-known/openid-configuration")
                  ]),
                  createTextVNode(" changes infrequently and is cached accordingly. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cache-Control header:"),
                    createTextVNode(),
                    createVNode("code", null, "max-age=900")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Cache duration:"),
                    createTextVNode(" 15 minutes")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/well-known.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wellKnown = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7dea013"]]);
export {
  wellKnown as default
};
