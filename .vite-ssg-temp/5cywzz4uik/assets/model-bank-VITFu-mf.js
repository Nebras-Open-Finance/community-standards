import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { u as useModelBankCredentials } from "./useModelBankCredentials-1SpmpfIl.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vue-router";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "model-bank",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentVersion, allCredentials } = useModelBankCredentials();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_ImageViewer = ImageViewer;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e2e30358><section class="ed-doc__hero" data-v-e2e30358><div class="ed-doc__inner" data-v-e2e30358><div class="ed-doc__eyebrow" data-v-e2e30358><span class="ed-doc__eyebrow-dash" data-v-e2e30358></span> TPP · Sandbox · Model Bank </div><h1 class="ed-doc__title" data-v-e2e30358> Sandbox — Model Bank <span class="ed-doc__read" data-v-e2e30358>2 min read</span></h1><p class="ed-doc__lede" data-v-e2e30358> To support onboarding and early development, a Model Bank has been deployed within the sandbox environment. This simulated Licensed Financial Institution mirrors the structure and behavior of a real LFI, providing TPPs with a safe, compliant space to test their end-to-end integration flows. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-e2e30358> The Model Bank is registered in the Trust Framework and exposes Authorization Servers, discovery endpoints, and Open Finance APIs — just like any production LFI. TPPs can use it to: </p><ul class="ed-doc__bullets" data-v-e2e30358><li data-v-e2e30358>Explore API discovery via the <code data-v-e2e30358>.well-known</code> endpoint</li><li data-v-e2e30358>Test registration with real (sandbox) software statements</li><li data-v-e2e30358>Validate certificate-based authentication and mutual TLS setups</li><li data-v-e2e30358>Simulate consent flows, account access, and payment initiation</li></ul></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "discovery",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Model Bank Discovery",
        title: "The .well-known endpoint and what it exposes",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The <code data-v-e2e30358${_scopeId2}>.well-known</code> endpoint for the Model Bank is:`);
                } else {
                  return [
                    createTextVNode("The "),
                    createVNode("code", null, ".well-known"),
                    createTextVNode(" endpoint for the Model Bank is:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration",
              lang: "plaintext",
              filename: ".well-known URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The <code data-v-e2e30358${_scopeId2}>.well-known</code> endpoint exposes the following critical information values:`);
                } else {
                  return [
                    createTextVNode("The "),
                    createVNode("code", null, ".well-known"),
                    createTextVNode(" endpoint exposes the following critical information values:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e2e30358${_scopeId2}><thead data-v-e2e30358${_scopeId2}><tr data-v-e2e30358${_scopeId2}><th data-v-e2e30358${_scopeId2}>Field</th><th data-v-e2e30358${_scopeId2}>Value</th></tr></thead><tbody data-v-e2e30358${_scopeId2}><tr data-v-e2e30358${_scopeId2}><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>issuer</code></td><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>https://auth1.altareq1.sandbox.apihub.openfinance.ae</code></td></tr><tr data-v-e2e30358${_scopeId2}><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>authorization_endpoint</code></td><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth</code></td></tr><tr data-v-e2e30358${_scopeId2}><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>par_endpoint</code></td><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>https://as1.altareq1.sandbox.apihub.openfinance.ae/par</code></td></tr><tr data-v-e2e30358${_scopeId2}><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>token_endpoint</code></td><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>https://as1.altareq1.sandbox.apihub.openfinance.ae/token</code></td></tr><tr data-v-e2e30358${_scopeId2}><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>registration_endpoint</code></td><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration</code></td></tr><tr data-v-e2e30358${_scopeId2}><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>jwks_uri</code></td><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks</code></td></tr><tr data-v-e2e30358${_scopeId2}><td data-v-e2e30358${_scopeId2}>Resource Server (<code data-v-e2e30358${_scopeId2}>rs</code>)</td><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>https://rs1.altareq1.sandbox.apihub.openfinance.ae</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Value")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "issuer")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://auth1.altareq1.sandbox.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "authorization_endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "par_endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://as1.altareq1.sandbox.apihub.openfinance.ae/par")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "token_endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://as1.altareq1.sandbox.apihub.openfinance.ae/token")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "registration_endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jwks_uri")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createTextVNode("Resource Server ("),
                            createVNode("code", null, "rs"),
                            createTextVNode(")")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://rs1.altareq1.sandbox.apihub.openfinance.ae")
                          ])
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The "),
                  createVNode("code", null, ".well-known"),
                  createTextVNode(" endpoint for the Model Bank is:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration",
                lang: "plaintext",
                filename: ".well-known URL"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The "),
                  createVNode("code", null, ".well-known"),
                  createTextVNode(" endpoint exposes the following critical information values:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Value")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "issuer")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://auth1.altareq1.sandbox.apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "authorization_endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "par_endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://as1.altareq1.sandbox.apihub.openfinance.ae/par")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "token_endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://as1.altareq1.sandbox.apihub.openfinance.ae/token")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "registration_endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jwks_uri")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createTextVNode("Resource Server ("),
                          createVNode("code", null, "rs"),
                          createTextVNode(")")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://rs1.altareq1.sandbox.apihub.openfinance.ae")
                        ])
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
        id: "credentials",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Model Bank Credentials",
        title: "Test credentials and accounts per Banking API version",
        lede: "Credentials are version-specific. The current version is highlighted; older versions remain available for testing legacy integrations.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(allCredentials), (c, i) => {
              _push2(`<div class="${ssrRenderClass([{ "is-divided": i > 0 }, "ed-doc__version"])}" data-v-e2e30358${_scopeId}><h3 class="ed-doc__version-heading" data-v-e2e30358${_scopeId}> Banking API ${ssrInterpolate(c.version)} `);
              if (c.version === unref(currentVersion)) {
                _push2(`<span class="ed-doc__version-badge" data-v-e2e30358${_scopeId}>Current</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</h3><h4 class="ed-doc__version-sub" data-v-e2e30358${_scopeId}>Login</h4><table class="ed-doc__creds" data-v-e2e30358${_scopeId}><thead data-v-e2e30358${_scopeId}><tr data-v-e2e30358${_scopeId}><th data-v-e2e30358${_scopeId}>Username</th><th data-v-e2e30358${_scopeId}>Password</th></tr></thead><tbody data-v-e2e30358${_scopeId}><tr data-v-e2e30358${_scopeId}><td data-v-e2e30358${_scopeId}><code data-v-e2e30358${_scopeId}>${ssrInterpolate(c.username)}</code></td><td data-v-e2e30358${_scopeId}><code data-v-e2e30358${_scopeId}>${ssrInterpolate(c.password)}</code></td></tr></tbody></table>`);
              if (c.version === unref(currentVersion)) {
                _push2(ssrRenderComponent(_component_ImageViewer, {
                  src: "/images/postman/first-flow-sip/7.png",
                  alt: "Model Bank Auth"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<h4 class="ed-doc__version-sub" data-v-e2e30358${_scopeId}>Accounts</h4>`);
              _push2(ssrRenderComponent(_component_EdRefTable, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<table data-v-e2e30358${_scopeId2}><thead data-v-e2e30358${_scopeId2}><tr data-v-e2e30358${_scopeId2}><th data-v-e2e30358${_scopeId2}>AccountId</th><th data-v-e2e30358${_scopeId2}>SchemeName</th><th data-v-e2e30358${_scopeId2}>Identification</th><th data-v-e2e30358${_scopeId2}>AccountType</th><th data-v-e2e30358${_scopeId2}>Name</th></tr></thead><tbody data-v-e2e30358${_scopeId2}><!--[-->`);
                    ssrRenderList(c.accounts, (a) => {
                      _push3(`<tr data-v-e2e30358${_scopeId2}><td data-v-e2e30358${_scopeId2}><code data-v-e2e30358${_scopeId2}>${ssrInterpolate(a.accountId)}</code></td><td data-v-e2e30358${_scopeId2}>${ssrInterpolate(a.schemeName)}</td><td data-v-e2e30358${_scopeId2}>${ssrInterpolate(a.identification)}</td><td data-v-e2e30358${_scopeId2}>${ssrInterpolate(a.accountType)}</td><td data-v-e2e30358${_scopeId2}>${ssrInterpolate(a.name)}</td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table>`);
                  } else {
                    return [
                      createVNode("table", null, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", null, "AccountId"),
                            createVNode("th", null, "SchemeName"),
                            createVNode("th", null, "Identification"),
                            createVNode("th", null, "AccountType"),
                            createVNode("th", null, "Name")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(c.accounts, (a) => {
                            return openBlock(), createBlock("tr", {
                              key: a.accountId
                            }, [
                              createVNode("td", null, [
                                createVNode("code", null, toDisplayString(a.accountId), 1)
                              ]),
                              createVNode("td", null, toDisplayString(a.schemeName), 1),
                              createVNode("td", null, toDisplayString(a.identification), 1),
                              createVNode("td", null, toDisplayString(a.accountType), 1),
                              createVNode("td", null, toDisplayString(a.name), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(allCredentials), (c, i) => {
                return openBlock(), createBlock("div", {
                  key: c.version,
                  class: ["ed-doc__version", { "is-divided": i > 0 }]
                }, [
                  createVNode("h3", { class: "ed-doc__version-heading" }, [
                    createTextVNode(" Banking API " + toDisplayString(c.version) + " ", 1),
                    c.version === unref(currentVersion) ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "ed-doc__version-badge"
                    }, "Current")) : createCommentVNode("", true)
                  ]),
                  createVNode("h4", { class: "ed-doc__version-sub" }, "Login"),
                  createVNode("table", { class: "ed-doc__creds" }, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Username"),
                        createVNode("th", null, "Password")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, toDisplayString(c.username), 1)
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, toDisplayString(c.password), 1)
                        ])
                      ])
                    ])
                  ]),
                  c.version === unref(currentVersion) ? (openBlock(), createBlock(_component_ImageViewer, {
                    key: 0,
                    src: "/images/postman/first-flow-sip/7.png",
                    alt: "Model Bank Auth"
                  })) : createCommentVNode("", true),
                  createVNode("h4", { class: "ed-doc__version-sub" }, "Accounts"),
                  createVNode(_component_EdRefTable, null, {
                    default: withCtx(() => [
                      createVNode("table", null, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", null, "AccountId"),
                            createVNode("th", null, "SchemeName"),
                            createVNode("th", null, "Identification"),
                            createVNode("th", null, "AccountType"),
                            createVNode("th", null, "Name")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(c.accounts, (a) => {
                            return openBlock(), createBlock("tr", {
                              key: a.accountId
                            }, [
                              createVNode("td", null, [
                                createVNode("code", null, toDisplayString(a.accountId), 1)
                              ]),
                              createVNode("td", null, toDisplayString(a.schemeName), 1),
                              createVNode("td", null, toDisplayString(a.identification), 1),
                              createVNode("td", null, toDisplayString(a.accountType), 1),
                              createVNode("td", null, toDisplayString(a.name), 1)
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ], 2);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/sandbox/model-bank.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const modelBank = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2e30358"]]);
export {
  modelBank as default
};
