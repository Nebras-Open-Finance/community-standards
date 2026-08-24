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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "model-insurer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-1c2a6004><section class="ed-doc__hero" data-v-1c2a6004><div class="ed-doc__inner" data-v-1c2a6004><div class="ed-doc__eyebrow" data-v-1c2a6004><span class="ed-doc__eyebrow-dash" data-v-1c2a6004></span> TPP · Sandbox · Model Insurer </div><h1 class="ed-doc__title" data-v-1c2a6004> Sandbox — Model Insurer <span class="ed-doc__read" data-v-1c2a6004>2 min read</span></h1><p class="ed-doc__lede" data-v-1c2a6004> To support onboarding and early development, a Model Insurer has been deployed within the sandbox environment. This simulated Licensed Financial Institution mirrors the structure and behavior of a real insurer, providing TPPs with a safe, compliant space to test their end-to-end Insurance Data Sharing integration flows. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-1c2a6004> Like the <a href="/tech/tpp-standards/sandbox/model-bank" data-v-1c2a6004>Model Bank</a>, the Model Insurer is registered in the Trust Framework and exposes Authorization Servers, discovery endpoints, and Open Finance APIs — just like any production LFI. TPPs use it to gather <a href="/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing" data-v-1c2a6004>Insurance Data Sharing Functional Certification</a> evidence. It lets you: </p><ul class="ed-doc__bullets" data-v-1c2a6004><li data-v-1c2a6004>Explore API discovery via the <code data-v-1c2a6004>.well-known</code> endpoint</li><li data-v-1c2a6004>Test registration with real (sandbox) software statements</li><li data-v-1c2a6004>Validate certificate-based authentication and mutual TLS setups</li><li data-v-1c2a6004>Simulate consent flows and retrieve insurance policy data across sectors</li></ul></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "discovery",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Model Insurer Discovery",
        title: "The .well-known endpoint and what it exposes",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The <code data-v-1c2a6004${_scopeId2}>.well-known</code> endpoint for the Model Insurer is:`);
                } else {
                  return [
                    createTextVNode("The "),
                    createVNode("code", null, ".well-known"),
                    createTextVNode(" endpoint for the Model Insurer is:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: "https://auth1.altareq2.sandbox.apihub.openfinance.ae/.well-known/openid-configuration",
              lang: "plaintext",
              filename: ".well-known URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The <code data-v-1c2a6004${_scopeId2}>.well-known</code> endpoint exposes the following critical information values:`);
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
                  _push3(`<table data-v-1c2a6004${_scopeId2}><thead data-v-1c2a6004${_scopeId2}><tr data-v-1c2a6004${_scopeId2}><th data-v-1c2a6004${_scopeId2}>Field</th><th data-v-1c2a6004${_scopeId2}>Value</th></tr></thead><tbody data-v-1c2a6004${_scopeId2}><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>issuer</code></td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>https://auth1.altareq2.sandbox.apihub.openfinance.ae</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>authorization_endpoint</code></td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>https://auth1.altareq2.sandbox.apihub.openfinance.ae/auth</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>par_endpoint</code></td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>https://as1.altareq2.sandbox.apihub.openfinance.ae/par</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>token_endpoint</code></td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>https://as1.altareq2.sandbox.apihub.openfinance.ae/token</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>registration_endpoint</code></td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>https://rs1.altareq2.sandbox.apihub.openfinance.ae/tpp-registration</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>jwks_uri</code></td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}>Resource Server (<code data-v-1c2a6004${_scopeId2}>rs</code>)</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>https://rs1.altareq2.sandbox.apihub.openfinance.ae</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "https://auth1.altareq2.sandbox.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "authorization_endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://auth1.altareq2.sandbox.apihub.openfinance.ae/auth")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "par_endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://as1.altareq2.sandbox.apihub.openfinance.ae/par")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "token_endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://as1.altareq2.sandbox.apihub.openfinance.ae/token")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "registration_endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://rs1.altareq2.sandbox.apihub.openfinance.ae/tpp-registration")
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
                            createVNode("code", null, "https://rs1.altareq2.sandbox.apihub.openfinance.ae")
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
                  createTextVNode(" endpoint for the Model Insurer is:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: "https://auth1.altareq2.sandbox.apihub.openfinance.ae/.well-known/openid-configuration",
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
                          createVNode("code", null, "https://auth1.altareq2.sandbox.apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "authorization_endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://auth1.altareq2.sandbox.apihub.openfinance.ae/auth")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "par_endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://as1.altareq2.sandbox.apihub.openfinance.ae/par")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "token_endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://as1.altareq2.sandbox.apihub.openfinance.ae/token")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "registration_endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://rs1.altareq2.sandbox.apihub.openfinance.ae/tpp-registration")
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
                          createVNode("code", null, "https://rs1.altareq2.sandbox.apihub.openfinance.ae")
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
        eyebrow: "Model Insurer Credentials",
        title: "Test credentials and policies",
        lede: "Use these to authenticate at the Model Insurer and retrieve policy data across the insurance sectors.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 class="ed-doc__version-sub" data-v-1c2a6004${_scopeId}>Login</h4><table class="ed-doc__creds" data-v-1c2a6004${_scopeId}><thead data-v-1c2a6004${_scopeId}><tr data-v-1c2a6004${_scopeId}><th data-v-1c2a6004${_scopeId}>Username</th><th data-v-1c2a6004${_scopeId}>Password</th></tr></thead><tbody data-v-1c2a6004${_scopeId}><tr data-v-1c2a6004${_scopeId}><td data-v-1c2a6004${_scopeId}><code data-v-1c2a6004${_scopeId}>mits</code></td><td data-v-1c2a6004${_scopeId}><code data-v-1c2a6004${_scopeId}>mits</code></td></tr></tbody></table><h4 class="ed-doc__version-sub" data-v-1c2a6004${_scopeId}>Policies</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Two policies are available per sector, across the six insurance sectors the Model Insurer underwrites. `);
                } else {
                  return [
                    createTextVNode(" Two policies are available per sector, across the six insurance sectors the Model Insurer underwrites. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-1c2a6004${_scopeId2}><thead data-v-1c2a6004${_scopeId2}><tr data-v-1c2a6004${_scopeId2}><th data-v-1c2a6004${_scopeId2}>InsurancePolicyId</th><th data-v-1c2a6004${_scopeId2}>Type</th><th data-v-1c2a6004${_scopeId2}>PolicyNumber</th></tr></thead><tbody data-v-1c2a6004${_scopeId2}><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>10000000-0000-0000-0000-000000000001</code></td><td data-v-1c2a6004${_scopeId2}>employment</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P1000000000000001</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>10000000-0000-0000-0000-000000000002</code></td><td data-v-1c2a6004${_scopeId2}>employment</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P0000000000000002</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>20000000-0000-0000-0000-000000000001</code></td><td data-v-1c2a6004${_scopeId2}>health</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P2000000000000001</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>20000000-0000-0000-0000-000000000002</code></td><td data-v-1c2a6004${_scopeId2}>health</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P2000000000000002</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>30000000-0000-0000-0000-000000000001</code></td><td data-v-1c2a6004${_scopeId2}>home</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P3000000000000001</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>30000000-0000-0000-0000-000000000002</code></td><td data-v-1c2a6004${_scopeId2}>home</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P3000000000000002</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>40000000-0000-0000-0000-000000000001</code></td><td data-v-1c2a6004${_scopeId2}>life</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P4000000000000001</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>40000000-0000-0000-0000-000000000002</code></td><td data-v-1c2a6004${_scopeId2}>life</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P4000000000000002</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>50000000-0000-0000-0000-000000000001</code></td><td data-v-1c2a6004${_scopeId2}>motor</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P5000000000000001</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>50000000-0000-0000-0000-000000000002</code></td><td data-v-1c2a6004${_scopeId2}>motor</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P5000000000000002</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>60000000-0000-0000-0000-000000000001</code></td><td data-v-1c2a6004${_scopeId2}>renters</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P6000000000000001</code></td></tr><tr data-v-1c2a6004${_scopeId2}><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>60000000-0000-0000-0000-000000000002</code></td><td data-v-1c2a6004${_scopeId2}>renters</td><td data-v-1c2a6004${_scopeId2}><code data-v-1c2a6004${_scopeId2}>P6000000000000002</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "InsurancePolicyId"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "PolicyNumber")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "10000000-0000-0000-0000-000000000001")
                          ]),
                          createVNode("td", null, "employment"),
                          createVNode("td", null, [
                            createVNode("code", null, "P1000000000000001")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "10000000-0000-0000-0000-000000000002")
                          ]),
                          createVNode("td", null, "employment"),
                          createVNode("td", null, [
                            createVNode("code", null, "P0000000000000002")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "20000000-0000-0000-0000-000000000001")
                          ]),
                          createVNode("td", null, "health"),
                          createVNode("td", null, [
                            createVNode("code", null, "P2000000000000001")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "20000000-0000-0000-0000-000000000002")
                          ]),
                          createVNode("td", null, "health"),
                          createVNode("td", null, [
                            createVNode("code", null, "P2000000000000002")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "30000000-0000-0000-0000-000000000001")
                          ]),
                          createVNode("td", null, "home"),
                          createVNode("td", null, [
                            createVNode("code", null, "P3000000000000001")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "30000000-0000-0000-0000-000000000002")
                          ]),
                          createVNode("td", null, "home"),
                          createVNode("td", null, [
                            createVNode("code", null, "P3000000000000002")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "40000000-0000-0000-0000-000000000001")
                          ]),
                          createVNode("td", null, "life"),
                          createVNode("td", null, [
                            createVNode("code", null, "P4000000000000001")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "40000000-0000-0000-0000-000000000002")
                          ]),
                          createVNode("td", null, "life"),
                          createVNode("td", null, [
                            createVNode("code", null, "P4000000000000002")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "50000000-0000-0000-0000-000000000001")
                          ]),
                          createVNode("td", null, "motor"),
                          createVNode("td", null, [
                            createVNode("code", null, "P5000000000000001")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "50000000-0000-0000-0000-000000000002")
                          ]),
                          createVNode("td", null, "motor"),
                          createVNode("td", null, [
                            createVNode("code", null, "P5000000000000002")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "60000000-0000-0000-0000-000000000001")
                          ]),
                          createVNode("td", null, "renters"),
                          createVNode("td", null, [
                            createVNode("code", null, "P6000000000000001")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "60000000-0000-0000-0000-000000000002")
                          ]),
                          createVNode("td", null, "renters"),
                          createVNode("td", null, [
                            createVNode("code", null, "P6000000000000002")
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
                      createVNode("code", null, "mits")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "mits")
                    ])
                  ])
                ])
              ]),
              createVNode("h4", { class: "ed-doc__version-sub" }, "Policies"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Two policies are available per sector, across the six insurance sectors the Model Insurer underwrites. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "InsurancePolicyId"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "PolicyNumber")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "10000000-0000-0000-0000-000000000001")
                        ]),
                        createVNode("td", null, "employment"),
                        createVNode("td", null, [
                          createVNode("code", null, "P1000000000000001")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "10000000-0000-0000-0000-000000000002")
                        ]),
                        createVNode("td", null, "employment"),
                        createVNode("td", null, [
                          createVNode("code", null, "P0000000000000002")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "20000000-0000-0000-0000-000000000001")
                        ]),
                        createVNode("td", null, "health"),
                        createVNode("td", null, [
                          createVNode("code", null, "P2000000000000001")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "20000000-0000-0000-0000-000000000002")
                        ]),
                        createVNode("td", null, "health"),
                        createVNode("td", null, [
                          createVNode("code", null, "P2000000000000002")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "30000000-0000-0000-0000-000000000001")
                        ]),
                        createVNode("td", null, "home"),
                        createVNode("td", null, [
                          createVNode("code", null, "P3000000000000001")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "30000000-0000-0000-0000-000000000002")
                        ]),
                        createVNode("td", null, "home"),
                        createVNode("td", null, [
                          createVNode("code", null, "P3000000000000002")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "40000000-0000-0000-0000-000000000001")
                        ]),
                        createVNode("td", null, "life"),
                        createVNode("td", null, [
                          createVNode("code", null, "P4000000000000001")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "40000000-0000-0000-0000-000000000002")
                        ]),
                        createVNode("td", null, "life"),
                        createVNode("td", null, [
                          createVNode("code", null, "P4000000000000002")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "50000000-0000-0000-0000-000000000001")
                        ]),
                        createVNode("td", null, "motor"),
                        createVNode("td", null, [
                          createVNode("code", null, "P5000000000000001")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "50000000-0000-0000-0000-000000000002")
                        ]),
                        createVNode("td", null, "motor"),
                        createVNode("td", null, [
                          createVNode("code", null, "P5000000000000002")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "60000000-0000-0000-0000-000000000001")
                        ]),
                        createVNode("td", null, "renters"),
                        createVNode("td", null, [
                          createVNode("code", null, "P6000000000000001")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "60000000-0000-0000-0000-000000000002")
                        ]),
                        createVNode("td", null, "renters"),
                        createVNode("td", null, [
                          createVNode("code", null, "P6000000000000002")
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
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/sandbox/model-insurer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const modelInsurer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c2a6004"]]);
export {
  modelInsurer as default
};
