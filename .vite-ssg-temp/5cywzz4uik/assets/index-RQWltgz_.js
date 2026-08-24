import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const discoveryUrlTemplate = `Pre-production: https://auth1.{lfiCode}.preprod.apihub.openfinance.ae/.well-known/openid-configuration
Production:     https://auth1.{lfiCode}.apihub.openfinance.ae/.well-known/openid-configuration`;
const exampleForwardedUrl = "https://openapi.example.com/retail/data/accounts";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-ede7c174><section class="ed-doc__hero" data-v-ede7c174><div class="ed-doc__inner" data-v-ede7c174><div class="ed-doc__eyebrow" data-v-ede7c174><span class="ed-doc__eyebrow-dash" data-v-ede7c174></span> LFI · API Hub · Onboarding · Environment-Specific </div><h1 class="ed-doc__title" data-v-ede7c174> Environment Specific Configuration <span class="ed-doc__read" data-v-ede7c174>9 min read</span></h1><p class="ed-doc__lede" data-v-ede7c174> Each API Hub instance requires environment-specific configuration that is exchanged between the LFI and Ozone during onboarding. This configuration MUST be completed <strong data-v-ede7c174>separately for each environment</strong>: </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-ede7c174><strong data-v-ede7c174>Pre-production</strong> — certificates from the <strong data-v-ede7c174>Sandbox</strong> Trust Framework. <strong data-v-ede7c174>Production</strong> — certificates from the <strong data-v-ede7c174>Production</strong> Trust Framework. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-ede7c174> The configuration is submitted via a <strong data-v-ede7c174>Service Desk ticket</strong>. This page describes all the information that is exchanged. </p>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "warning",
        title: "One form per environment"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-ede7c174${_scopeId}> You MUST complete this process twice — once for pre-production and once for production. All certificates referenced in the pre-production form MUST be created in the Sandbox Trust Framework. All certificates referenced in the production form MUST be created in the Production Trust Framework. </p>`);
          } else {
            return [
              createVNode("p", null, " You MUST complete this process twice — once for pre-production and once for production. All certificates referenced in the pre-production form MUST be created in the Sandbox Trust Framework. All certificates referenced in the production form MUST be created in the Production Trust Framework. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="ed-doc__lede ed-doc__lede--tight" data-v-ede7c174> For a full understanding of how each certificate fits into the API Hub network architecture, see <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/" data-v-ede7c174>API Hub Connectivity &amp; Certificates</a>. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "lfi-information",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "LFI information",
        title: "Legal name and organisation ID",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>LFI Legal Name</strong></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>Your legal name as it appears on the Trust Framework organisation page (Sandbox for pre-production, Production for production).</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>LFI Organisation ID</strong></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>Your organisation ID from the Trust Framework organisation page.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "LFI Legal Name")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "Your legal name as it appears on the Trust Framework organisation page (Sandbox for pre-production, Production for production).")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "LFI Organisation ID")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "Your organisation ID from the Trust Framework organisation page.")
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
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "LFI Legal Name")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "Your legal name as it appears on the Trust Framework organisation page (Sandbox for pre-production, Production for production).")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "LFI Organisation ID")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "Your organisation ID from the Trust Framework organisation page.")
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
        id: "domains-urls",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Domain names & URLs",
        title: "Allocated domains, discovery, and LFI-provided URLs",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-ede7c174${_scopeId}>Domain names allocated by Ozone</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ozone allocates domain names for each API Hub instance based on the LFI Code provided during <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" data-v-ede7c174${_scopeId2}>prerequisites onboarding</a>. `);
                } else {
                  return [
                    createTextVNode(" Ozone allocates domain names for each API Hub instance based on the LFI Code provided during "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" }, "prerequisites onboarding"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th data-v-ede7c174${_scopeId2}>Convention (Pre-production)</th><th data-v-ede7c174${_scopeId2}>Convention (Production)</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>TPP-facing domain</strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>as1.{lfiCode}.preprod.apihub.openfinance.ae</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>as1.{lfiCode}.apihub.openfinance.ae</code></td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>TPP-facing resource server</strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>rs1.{lfiCode}.preprod.apihub.openfinance.ae</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>rs1.{lfiCode}.apihub.openfinance.ae</code></td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Headless Heimdall</strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>hh.{lfiCode}.preprod.apihub.openfinance.ae</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>hh.{lfiCode}.apihub.openfinance.ae</code></td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Consent Manager</strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>cm.{lfiCode}.preprod.apihub.openfinance.ae</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>cm.{lfiCode}.apihub.openfinance.ae</code></td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Admin Portal</strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>admin.{lfiCode}.preprod.apihub.openfinance.ae</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>admin.{lfiCode}.apihub.openfinance.ae</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Convention (Pre-production)"),
                          createVNode("th", null, "Convention (Production)")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "TPP-facing domain")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "as1.{lfiCode}.preprod.apihub.openfinance.ae")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "as1.{lfiCode}.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "TPP-facing resource server")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "rs1.{lfiCode}.preprod.apihub.openfinance.ae")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "rs1.{lfiCode}.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Headless Heimdall")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "hh.{lfiCode}.preprod.apihub.openfinance.ae")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "hh.{lfiCode}.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Consent Manager")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "cm.{lfiCode}.preprod.apihub.openfinance.ae")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "cm.{lfiCode}.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Admin Portal")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "admin.{lfiCode}.preprod.apihub.openfinance.ae")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "admin.{lfiCode}.apihub.openfinance.ae")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>LFI-specific discovery document</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Your API Hub&#39;s well-known discovery document will be available at:`);
                } else {
                  return [
                    createTextVNode("Your API Hub's well-known discovery document will be available at:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              lang: "text",
              code: discoveryUrlTemplate
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This document exposes your <code data-v-ede7c174${_scopeId2}>authorization_endpoint</code>, <code data-v-ede7c174${_scopeId2}>token_endpoint</code>, <code data-v-ede7c174${_scopeId2}>jwks_uri</code>, and supported parameters. TPPs use it to discover where to redirect their users. `);
                } else {
                  return [
                    createTextVNode(" This document exposes your "),
                    createVNode("code", null, "authorization_endpoint"),
                    createTextVNode(", "),
                    createVNode("code", null, "token_endpoint"),
                    createTextVNode(", "),
                    createVNode("code", null, "jwks_uri"),
                    createTextVNode(", and supported parameters. TPPs use it to discover where to redirect their users. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>URLs provided by the LFI</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Ozone Connect Base URL</strong></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The base URL on which your Ozone Connect endpoints are hosted. See <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" data-v-ede7c174${_scopeId2}>Ozone Connect Base URL</a> for details.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Authorisation URL</strong></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The OIDC authorisation URL for your institution. See <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-ede7c174${_scopeId2}>Authorization Endpoint</a> for details.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Ozone Connect Base URL")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, [
                            createTextVNode("The base URL on which your Ozone Connect endpoints are hosted. See "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, "Ozone Connect Base URL"),
                            createTextVNode(" for details.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Authorisation URL")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, [
                            createTextVNode("The OIDC authorisation URL for your institution. See "),
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                            createTextVNode(" for details.")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="values-provided-by-ozone" data-v-ede7c174${_scopeId}>Values provided by Ozone</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Admin Portal URL</strong></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>The URL to your Admin Portal for this environment.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>IP Address</strong></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>The IP address(es) for API Hub outbound traffic. You MUST allowlist these IPs at your network/firewall level to permit traffic from the API Hub to your Ozone Connect endpoints.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Admin Portal URL")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "The URL to your Admin Portal for this environment.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "IP Address")
                          ]),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "The IP address(es) for API Hub outbound traffic. You MUST allowlist these IPs at your network/firewall level to permit traffic from the API Hub to your Ozone Connect endpoints.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>Optional API family base paths</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The onboarding form includes optional base path fields for each API family. If provided, the path is inserted between your <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" data-v-ede7c174${_scopeId2}>Ozone Connect Base URL</a> and the API endpoint — allowing the LFI to route different API families to different path prefixes on the same server. `);
                } else {
                  return [
                    createTextVNode(" The onboarding form includes optional base path fields for each API family. If provided, the path is inserted between your "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, "Ozone Connect Base URL"),
                    createTextVNode(" and the API endpoint — allowing the LFI to route different API families to different path prefixes on the same server. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>API Family</th><th data-v-ede7c174${_scopeId2}>Example Endpoints</th><th data-v-ede7c174${_scopeId2}>Path Effect</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/" data-v-ede7c174${_scopeId2}>Data Sharing</a></strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>/accounts</code>, <code data-v-ede7c174${_scopeId2}>/balances</code>, <code data-v-ede7c174${_scopeId2}>/transactions</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>OzoneConnectURL/&lt;path&gt;/accounts</code></td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/" data-v-ede7c174${_scopeId2}>Service Initiation</a></strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>/domestic-payments</code>, <code data-v-ede7c174${_scopeId2}>/multi-payments</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>OzoneConnectURL/&lt;path&gt;/domestic-payments</code></td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/banking/products-and-leads/" data-v-ede7c174${_scopeId2}>Products</a></strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>/products</code>, <code data-v-ede7c174${_scopeId2}>/leads</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>OzoneConnectURL/&lt;path&gt;/products</code></td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Consent Events &amp; Notifications</strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>/event-notifications</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>OzoneConnectURL/&lt;path&gt;/event-notifications</code></td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/health-check/" data-v-ede7c174${_scopeId2}>Health Check</a></strong></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>/hello</code>, <code data-v-ede7c174${_scopeId2}>/hello-mtls</code>, <code data-v-ede7c174${_scopeId2}>/echo-cert</code></td><td data-v-ede7c174${_scopeId2}><code data-v-ede7c174${_scopeId2}>OzoneConnectURL/&lt;path&gt;/echo-cert</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "API Family"),
                          createVNode("th", null, "Example Endpoints"),
                          createVNode("th", null, "Path Effect")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Data Sharing")
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "/accounts"),
                            createTextVNode(", "),
                            createVNode("code", null, "/balances"),
                            createTextVNode(", "),
                            createVNode("code", null, "/transactions")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "OzoneConnectURL/<path>/accounts")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/" }, "Service Initiation")
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "/domestic-payments"),
                            createTextVNode(", "),
                            createVNode("code", null, "/multi-payments")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "OzoneConnectURL/<path>/domestic-payments")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/" }, "Products")
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "/products"),
                            createTextVNode(", "),
                            createVNode("code", null, "/leads")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "OzoneConnectURL/<path>/products")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Consent Events & Notifications")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "/event-notifications")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "OzoneConnectURL/<path>/event-notifications")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, [
                              createVNode("a", { href: "/tech/lfi-api-hub/v2.1/health-check/" }, "Health Check")
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "/hello"),
                            createTextVNode(", "),
                            createVNode("code", null, "/hello-mtls"),
                            createTextVNode(", "),
                            createVNode("code", null, "/echo-cert")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "OzoneConnectURL/<path>/echo-cert")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` All fields are optional. For any API families without a path specified — either because the field was left blank or because the family does not appear in the form — the API Hub sends requests directly to <code data-v-ede7c174${_scopeId2}>OzoneConnectURL/&lt;endpoint&gt;</code>. `);
                } else {
                  return [
                    createTextVNode(" All fields are optional. For any API families without a path specified — either because the field was left blank or because the family does not appear in the form — the API Hub sends requests directly to "),
                    createVNode("code", null, "OzoneConnectURL/<endpoint>"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Example"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ede7c174${_scopeId2}> If the LFI sets the Data Sharing base path to <code data-v-ede7c174${_scopeId2}>/retail/data</code> and their Ozone Connect Base URL is <code data-v-ede7c174${_scopeId2}>https://openapi.example.com</code>, a TPP request for accounts will be forwarded to: </p>`);
                  _push3(ssrRenderComponent(_component_EdCode, {
                    lang: "text",
                    code: exampleForwardedUrl
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If the LFI sets the Data Sharing base path to "),
                      createVNode("code", null, "/retail/data"),
                      createTextVNode(" and their Ozone Connect Base URL is "),
                      createVNode("code", null, "https://openapi.example.com"),
                      createTextVNode(", a TPP request for accounts will be forwarded to: ")
                    ]),
                    createVNode(_component_EdCode, {
                      lang: "text",
                      code: exampleForwardedUrl
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Domain names allocated by Ozone"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Ozone allocates domain names for each API Hub instance based on the LFI Code provided during "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites" }, "prerequisites onboarding"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Convention (Pre-production)"),
                        createVNode("th", null, "Convention (Production)")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "TPP-facing domain")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "as1.{lfiCode}.preprod.apihub.openfinance.ae")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "as1.{lfiCode}.apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "TPP-facing resource server")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "rs1.{lfiCode}.preprod.apihub.openfinance.ae")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "rs1.{lfiCode}.apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Headless Heimdall")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "hh.{lfiCode}.preprod.apihub.openfinance.ae")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "hh.{lfiCode}.apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Consent Manager")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "cm.{lfiCode}.preprod.apihub.openfinance.ae")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "cm.{lfiCode}.apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Admin Portal")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "admin.{lfiCode}.preprod.apihub.openfinance.ae")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "admin.{lfiCode}.apihub.openfinance.ae")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "LFI-specific discovery document"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Your API Hub's well-known discovery document will be available at:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                lang: "text",
                code: discoveryUrlTemplate
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This document exposes your "),
                  createVNode("code", null, "authorization_endpoint"),
                  createTextVNode(", "),
                  createVNode("code", null, "token_endpoint"),
                  createTextVNode(", "),
                  createVNode("code", null, "jwks_uri"),
                  createTextVNode(", and supported parameters. TPPs use it to discover where to redirect their users. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "URLs provided by the LFI"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Ozone Connect Base URL")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, [
                          createTextVNode("The base URL on which your Ozone Connect endpoints are hosted. See "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, "Ozone Connect Base URL"),
                          createTextVNode(" for details.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Authorisation URL")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, [
                          createTextVNode("The OIDC authorisation URL for your institution. See "),
                          createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                          createTextVNode(" for details.")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { id: "values-provided-by-ozone" }, "Values provided by Ozone"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Admin Portal URL")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "The URL to your Admin Portal for this environment.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "IP Address")
                        ]),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "The IP address(es) for API Hub outbound traffic. You MUST allowlist these IPs at your network/firewall level to permit traffic from the API Hub to your Ozone Connect endpoints.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Optional API family base paths"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The onboarding form includes optional base path fields for each API family. If provided, the path is inserted between your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url" }, "Ozone Connect Base URL"),
                  createTextVNode(" and the API endpoint — allowing the LFI to route different API families to different path prefixes on the same server. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "API Family"),
                        createVNode("th", null, "Example Endpoints"),
                        createVNode("th", null, "Path Effect")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/data-sharing/" }, "Data Sharing")
                          ])
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "/accounts"),
                          createTextVNode(", "),
                          createVNode("code", null, "/balances"),
                          createTextVNode(", "),
                          createVNode("code", null, "/transactions")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "OzoneConnectURL/<path>/accounts")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/" }, "Service Initiation")
                          ])
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "/domestic-payments"),
                          createTextVNode(", "),
                          createVNode("code", null, "/multi-payments")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "OzoneConnectURL/<path>/domestic-payments")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/products-and-leads/" }, "Products")
                          ])
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "/products"),
                          createTextVNode(", "),
                          createVNode("code", null, "/leads")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "OzoneConnectURL/<path>/products")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Consent Events & Notifications")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "/event-notifications")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "OzoneConnectURL/<path>/event-notifications")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, [
                            createVNode("a", { href: "/tech/lfi-api-hub/v2.1/health-check/" }, "Health Check")
                          ])
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "/hello"),
                          createTextVNode(", "),
                          createVNode("code", null, "/hello-mtls"),
                          createTextVNode(", "),
                          createVNode("code", null, "/echo-cert")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "OzoneConnectURL/<path>/echo-cert")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" All fields are optional. For any API families without a path specified — either because the field was left blank or because the family does not appear in the form — the API Hub sends requests directly to "),
                  createVNode("code", null, "OzoneConnectURL/<endpoint>"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Example"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If the LFI sets the Data Sharing base path to "),
                    createVNode("code", null, "/retail/data"),
                    createTextVNode(" and their Ozone Connect Base URL is "),
                    createVNode("code", null, "https://openapi.example.com"),
                    createTextVNode(", a TPP request for accounts will be forwarded to: ")
                  ]),
                  createVNode(_component_EdCode, {
                    lang: "text",
                    code: exampleForwardedUrl
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "ozone-held-certs",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Ozone-held transport & signing certificates",
        title: "Ozone holds the private key",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` These are certificates where <strong data-v-ede7c174${_scopeId2}>Ozone holds the private key</strong>. Ozone generates the private key and CSR. The LFI&#39;s role depends on where the certificate is stored: `);
                } else {
                  return [
                    createTextVNode(" These are certificates where "),
                    createVNode("strong", null, "Ozone holds the private key"),
                    createTextVNode(". Ozone generates the private key and CSR. The LFI's role depends on where the certificate is stored: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>S1, S3, Sig2</strong> — stored in the LFI&#39;s Trust Framework organisation. Ozone provides the CSR; the LFI uploads it to their organisation to generate the certificate, then returns the JWKS URL and KID.</li><li data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>C4, Sig3</strong> — stored in Ozone&#39;s Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "S1, S3, Sig2"),
                      createTextVNode(" — stored in the LFI's Trust Framework organisation. Ozone provides the CSR; the LFI uploads it to their organisation to generate the certificate, then returns the JWKS URL and KID.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "C4, Sig3"),
                      createTextVNode(" — stored in Ozone's Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>S1 — Transport Server Certificate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Deployed onto the API Hub servers to identify the LFI&#39;s API Hub instance to TPPs.`);
                } else {
                  return [
                    createTextVNode("Deployed onto the API Hub servers to identify the LFI's API Hub instance to TPPs.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>CSR</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Ozone provides the CSR for the LFI to upload to their Trust Framework organisation.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The organisation transport JWKS URL from the Trust Framework after generating the certificate.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The Key ID assigned to this certificate by the Trust Framework.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "CSR"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Ozone provides the CSR for the LFI to upload to their Trust Framework organisation.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The organisation transport JWKS URL from the Trust Framework after generating the certificate.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The Key ID assigned to this certificate by the Trust Framework.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> Navigate to your organisation in the Trust Framework → Organisation Certificates → + New Certificate → select <strong data-v-ede7c174${_scopeId2}>Server Transport</strong> → upload the CSR provided by Ozone → record the KID and JWKS URL. See <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" data-v-ede7c174${_scopeId2}>Certificate Walkthroughs</a> for a step-by-step example. `);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" Navigate to your organisation in the Trust Framework → Organisation Certificates → + New Certificate → select "),
                    createVNode("strong", null, "Server Transport"),
                    createTextVNode(" → upload the CSR provided by Ozone → record the KID and JWKS URL. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" }, "Certificate Walkthroughs"),
                    createTextVNode(" for a step-by-step example. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>S3 — Transport Server Certificate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Used by the Consent Manager and Headless Heimdall Auth Server to identify themselves to the LFI.`);
                } else {
                  return [
                    createTextVNode("Used by the Consent Manager and Headless Heimdall Auth Server to identify themselves to the LFI.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>CSR</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Ozone provides the CSR for the LFI to upload.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The organisation transport JWKS URL from the Trust Framework.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The Key ID assigned to this certificate.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "CSR"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Ozone provides the CSR for the LFI to upload.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The organisation transport JWKS URL from the Trust Framework.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The Key ID assigned to this certificate.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> Same process as S1 — upload the CSR under Organisation Certificates → <strong data-v-ede7c174${_scopeId2}>Server Transport</strong>. `);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" Same process as S1 — upload the CSR under Organisation Certificates → "),
                    createVNode("strong", null, "Server Transport"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 id="c4-transport-client-certificate" data-v-ede7c174${_scopeId}>C4 — Transport Client Certificate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Used by the API Hub to identify itself to the LFI when calling Ozone Connect endpoints.`);
                } else {
                  return [
                    createTextVNode("Used by the API Hub to identify itself to the LFI when calling Ozone Connect endpoints.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Ozone provides the JWKS URL from their Trust Framework organisation.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Ozone provides the KID.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Ozone provides the JWKS URL from their Trust Framework organisation.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Ozone provides the KID.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> None — this certificate is in Ozone&#39;s organisation. Record the JWKS URL and KID provided by Ozone for your mTLS validation configuration. See <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server#3b-pin-to-the-api-hubs-c4-client" data-v-ede7c174${_scopeId2}>Configuring Inbound mTLS</a> for guidance on pinning your Ozone Connect server to the API Hub&#39;s C4 client certificate. `);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" None — this certificate is in Ozone's organisation. Record the JWKS URL and KID provided by Ozone for your mTLS validation configuration. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server#3b-pin-to-the-api-hubs-c4-client" }, "Configuring Inbound mTLS"),
                    createTextVNode(" for guidance on pinning your Ozone Connect server to the API Hub's C4 client certificate. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>Sig2 — Signing Certificate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Used by the API Hub to sign responses sent to the TPP, including signed messages from the resource server and the signature on the <code data-v-ede7c174${_scopeId2}>id_token</code>. TPPs verify using the public key in the JWKS. `);
                } else {
                  return [
                    createTextVNode(" Used by the API Hub to sign responses sent to the TPP, including signed messages from the resource server and the signature on the "),
                    createVNode("code", null, "id_token"),
                    createTextVNode(". TPPs verify using the public key in the JWKS. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>CSR</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Ozone provides the CSR for the LFI to upload.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The organisation application JWKS URL from the Trust Framework.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The Key ID assigned to this certificate.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "CSR"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Ozone provides the CSR for the LFI to upload.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The organisation application JWKS URL from the Trust Framework.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The Key ID assigned to this certificate.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> Navigate to Organisation Certificates → + New Certificate → select <strong data-v-ede7c174${_scopeId2}>Server Signing</strong> → upload the CSR → record the KID and JWKS URL. `);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" Navigate to Organisation Certificates → + New Certificate → select "),
                    createVNode("strong", null, "Server Signing"),
                    createTextVNode(" → upload the CSR → record the KID and JWKS URL. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>Sig3 — Signing Certificate (JWT Auth only)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Used by the API Hub to sign JWT Auth headers on:`);
                } else {
                  return [
                    createTextVNode("Used by the API Hub to sign JWT Auth headers on:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ede7c174${_scopeId2}>Ozone Connect requests</li><li data-v-ede7c174${_scopeId2}>Headless Heimdall responses</li><li data-v-ede7c174${_scopeId2}>Consent Manager responses</li>`);
                } else {
                  return [
                    createVNode("li", null, "Ozone Connect requests"),
                    createVNode("li", null, "Headless Heimdall responses"),
                    createVNode("li", null, "Consent Manager responses")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ede7c174${_scopeId2}> Sig3 is only required when <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" data-v-ede7c174${_scopeId2}>JWT Auth</a> is selected as the application layer authentication method. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Sig3 is only required when "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                      createTextVNode(" is selected as the application layer authentication method. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Ozone provides the JWKS URL from their Trust Framework organisation.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Ozone provides the KID.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Ozone provides the JWKS URL from their Trust Framework organisation.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Ozone provides the KID.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> None — this certificate is in Ozone&#39;s organisation.`);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" None — this certificate is in Ozone's organisation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" These are certificates where "),
                  createVNode("strong", null, "Ozone holds the private key"),
                  createTextVNode(". Ozone generates the private key and CSR. The LFI's role depends on where the certificate is stored: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "S1, S3, Sig2"),
                    createTextVNode(" — stored in the LFI's Trust Framework organisation. Ozone provides the CSR; the LFI uploads it to their organisation to generate the certificate, then returns the JWKS URL and KID.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "C4, Sig3"),
                    createTextVNode(" — stored in Ozone's Trust Framework organisation. Ozone provides the JWKS URL and KID to the LFI. No action is required from the LFI.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "S1 — Transport Server Certificate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Deployed onto the API Hub servers to identify the LFI's API Hub instance to TPPs.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "CSR"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Ozone provides the CSR for the LFI to upload to their Trust Framework organisation.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The organisation transport JWKS URL from the Trust Framework after generating the certificate.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The Key ID assigned to this certificate by the Trust Framework.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" Navigate to your organisation in the Trust Framework → Organisation Certificates → + New Certificate → select "),
                  createVNode("strong", null, "Server Transport"),
                  createTextVNode(" → upload the CSR provided by Ozone → record the KID and JWKS URL. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" }, "Certificate Walkthroughs"),
                  createTextVNode(" for a step-by-step example. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "S3 — Transport Server Certificate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Used by the Consent Manager and Headless Heimdall Auth Server to identify themselves to the LFI.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "CSR"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Ozone provides the CSR for the LFI to upload.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The organisation transport JWKS URL from the Trust Framework.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The Key ID assigned to this certificate.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" Same process as S1 — upload the CSR under Organisation Certificates → "),
                  createVNode("strong", null, "Server Transport"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { id: "c4-transport-client-certificate" }, "C4 — Transport Client Certificate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Used by the API Hub to identify itself to the LFI when calling Ozone Connect endpoints.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Ozone provides the JWKS URL from their Trust Framework organisation.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Ozone provides the KID.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" None — this certificate is in Ozone's organisation. Record the JWKS URL and KID provided by Ozone for your mTLS validation configuration. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server#3b-pin-to-the-api-hubs-c4-client" }, "Configuring Inbound mTLS"),
                  createTextVNode(" for guidance on pinning your Ozone Connect server to the API Hub's C4 client certificate. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Sig2 — Signing Certificate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Used by the API Hub to sign responses sent to the TPP, including signed messages from the resource server and the signature on the "),
                  createVNode("code", null, "id_token"),
                  createTextVNode(". TPPs verify using the public key in the JWKS. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "CSR"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Ozone provides the CSR for the LFI to upload.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The organisation application JWKS URL from the Trust Framework.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The Key ID assigned to this certificate.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" Navigate to Organisation Certificates → + New Certificate → select "),
                  createVNode("strong", null, "Server Signing"),
                  createTextVNode(" → upload the CSR → record the KID and JWKS URL. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Sig3 — Signing Certificate (JWT Auth only)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Used by the API Hub to sign JWT Auth headers on:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Ozone Connect requests"),
                  createVNode("li", null, "Headless Heimdall responses"),
                  createVNode("li", null, "Consent Manager responses")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "info" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Sig3 is only required when "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                    createTextVNode(" is selected as the application layer authentication method. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Ozone provides the JWKS URL from their Trust Framework organisation.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Ozone provides the KID.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" None — this certificate is in Ozone's organisation.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "lfi-held-certs",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "LFI-held transport & signing certificates",
        title: "LFI holds the private key",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` These are certificates where the <strong data-v-ede7c174${_scopeId2}>LFI holds the private key</strong>. The LFI generates the private key and CSR, creates the certificate in the Trust Framework, and provides the JWKS URL and KID to Ozone. `);
                } else {
                  return [
                    createTextVNode(" These are certificates where the "),
                    createVNode("strong", null, "LFI holds the private key"),
                    createTextVNode(". The LFI generates the private key and CSR, creates the certificate in the Trust Framework, and provides the JWKS URL and KID to Ozone. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>C3 — Transport Client Certificate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Used by the API Hub to recognise the LFI when the LFI calls the Consent Manager and Headless Heimdall Auth Server. `);
                } else {
                  return [
                    createTextVNode(" Used by the API Hub to recognise the LFI when the LFI calls the Consent Manager and Headless Heimdall Auth Server. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Application required"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ede7c174${_scopeId2}> Before creating the C3 certificate, you MUST create the <code data-v-ede7c174${_scopeId2}>C3-hh-cm-client</code> application in the Trust Framework. See <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application" data-v-ede7c174${_scopeId2}>Creating the C3-hh-cm-client Application</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Before creating the C3 certificate, you MUST create the "),
                      createVNode("code", null, "C3-hh-cm-client"),
                      createTextVNode(" application in the Trust Framework. See "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "Creating the C3-hh-cm-client Application"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>Application ID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The Client ID of the <code data-v-ede7c174${_scopeId2}>C3-hh-cm-client</code> application.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The application transport JWKS URL from the Trust Framework.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The Key ID assigned to this certificate.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Application ID"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, [
                            createTextVNode("The Client ID of the "),
                            createVNode("code", null, "C3-hh-cm-client"),
                            createTextVNode(" application.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The application transport JWKS URL from the Trust Framework.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The Key ID assigned to this certificate.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> Create the <code data-v-ede7c174${_scopeId2}>C3-hh-cm-client</code> application (if not already created) → generate a private key and CSR → navigate to the application&#39;s App Certificates → + New Certificate → select <strong data-v-ede7c174${_scopeId2}>Client Transport</strong> → upload the CSR → record the Application ID, KID, and JWKS URL. See <a href="/tech/lfi-api-hub/trust-framework/certificates/" data-v-ede7c174${_scopeId2}>Keys &amp; Certificates</a> for detailed steps. `);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" Create the "),
                    createVNode("code", null, "C3-hh-cm-client"),
                    createTextVNode(" application (if not already created) → generate a private key and CSR → navigate to the application's App Certificates → + New Certificate → select "),
                    createVNode("strong", null, "Client Transport"),
                    createTextVNode(" → upload the CSR → record the Application ID, KID, and JWKS URL. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                    createTextVNode(" for detailed steps. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>S4 — Transport Server Certificate</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Used by the LFI to identify its Ozone Connect server to the API Hub.`);
                } else {
                  return [
                    createTextVNode("Used by the LFI to identify its Ozone Connect server to the API Hub.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The organisation transport JWKS URL from the Trust Framework.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The Key ID assigned to this certificate.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The organisation transport JWKS URL from the Trust Framework.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The Key ID assigned to this certificate.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> Generate a private key and CSR → navigate to Organisation Certificates → + New Certificate → select <strong data-v-ede7c174${_scopeId2}>Server Transport</strong> → upload the CSR → record the KID and JWKS URL. See <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" data-v-ede7c174${_scopeId2}>Certificate Walkthroughs</a> for a step-by-step example. `);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" Generate a private key and CSR → navigate to Organisation Certificates → + New Certificate → select "),
                    createVNode("strong", null, "Server Transport"),
                    createTextVNode(" → upload the CSR → record the KID and JWKS URL. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" }, "Certificate Walkthroughs"),
                    createTextVNode(" for a step-by-step example. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-ede7c174${_scopeId}>Sig4 — Signing Certificate (JWT Auth only)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Used by the LFI to sign JWT Auth headers on:`);
                } else {
                  return [
                    createTextVNode("Used by the LFI to sign JWT Auth headers on:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ede7c174${_scopeId2}>Ozone Connect responses</li><li data-v-ede7c174${_scopeId2}>Headless Heimdall requests</li><li data-v-ede7c174${_scopeId2}>Consent Manager requests</li>`);
                } else {
                  return [
                    createVNode("li", null, "Ozone Connect responses"),
                    createVNode("li", null, "Headless Heimdall requests"),
                    createVNode("li", null, "Consent Manager requests")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ede7c174${_scopeId2}> Sig4 is only required when <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" data-v-ede7c174${_scopeId2}>JWT Auth</a> is selected as the application layer authentication method. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Sig4 is only required when "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                      createTextVNode(" is selected as the application layer authentication method. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The application signing JWKS URL from the Trust Framework.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The Key ID assigned to this certificate.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The application signing JWKS URL from the Trust Framework.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The Key ID assigned to this certificate.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> Generate a private key and CSR → navigate to the <code data-v-ede7c174${_scopeId2}>C3-hh-cm-client</code> application&#39;s App Certificates → + New Certificate → select <strong data-v-ede7c174${_scopeId2}>Client Signing</strong> → upload the CSR → record the KID and JWKS URL. `);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" Generate a private key and CSR → navigate to the "),
                    createVNode("code", null, "C3-hh-cm-client"),
                    createTextVNode(" application's App Certificates → + New Certificate → select "),
                    createVNode("strong", null, "Client Signing"),
                    createTextVNode(" → upload the CSR → record the KID and JWKS URL. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Sig4 placement"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ede7c174${_scopeId2}> Sig4 MAY be created either within the <code data-v-ede7c174${_scopeId2}>C3-hh-cm-client</code> application or at the organisation level — this is at the LFI&#39;s discretion. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Sig4 MAY be created either within the "),
                      createVNode("code", null, "C3-hh-cm-client"),
                      createTextVNode(" application or at the organisation level — this is at the LFI's discretion. ")
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
                  createTextVNode(" These are certificates where the "),
                  createVNode("strong", null, "LFI holds the private key"),
                  createTextVNode(". The LFI generates the private key and CSR, creates the certificate in the Trust Framework, and provides the JWKS URL and KID to Ozone. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "C3 — Transport Client Certificate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Used by the API Hub to recognise the LFI when the LFI calls the Consent Manager and Headless Heimdall Auth Server. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Application required"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Before creating the C3 certificate, you MUST create the "),
                    createVNode("code", null, "C3-hh-cm-client"),
                    createTextVNode(" application in the Trust Framework. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/creating-c3-application" }, "Creating the C3-hh-cm-client Application"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Application ID"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, [
                          createTextVNode("The Client ID of the "),
                          createVNode("code", null, "C3-hh-cm-client"),
                          createTextVNode(" application.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The application transport JWKS URL from the Trust Framework.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The Key ID assigned to this certificate.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" Create the "),
                  createVNode("code", null, "C3-hh-cm-client"),
                  createTextVNode(" application (if not already created) → generate a private key and CSR → navigate to the application's App Certificates → + New Certificate → select "),
                  createVNode("strong", null, "Client Transport"),
                  createTextVNode(" → upload the CSR → record the Application ID, KID, and JWKS URL. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/certificates/" }, "Keys & Certificates"),
                  createTextVNode(" for detailed steps. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "S4 — Transport Server Certificate"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Used by the LFI to identify its Ozone Connect server to the API Hub.")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The organisation transport JWKS URL from the Trust Framework.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The Key ID assigned to this certificate.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" Generate a private key and CSR → navigate to Organisation Certificates → + New Certificate → select "),
                  createVNode("strong", null, "Server Transport"),
                  createTextVNode(" → upload the CSR → record the KID and JWKS URL. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs" }, "Certificate Walkthroughs"),
                  createTextVNode(" for a step-by-step example. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Sig4 — Signing Certificate (JWT Auth only)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Used by the LFI to sign JWT Auth headers on:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Ozone Connect responses"),
                  createVNode("li", null, "Headless Heimdall requests"),
                  createVNode("li", null, "Consent Manager requests")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "info" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Sig4 is only required when "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth" }, "JWT Auth"),
                    createTextVNode(" is selected as the application layer authentication method. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The application signing JWKS URL from the Trust Framework.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The Key ID assigned to this certificate.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" Generate a private key and CSR → navigate to the "),
                  createVNode("code", null, "C3-hh-cm-client"),
                  createTextVNode(" application's App Certificates → + New Certificate → select "),
                  createVNode("strong", null, "Client Signing"),
                  createTextVNode(" → upload the CSR → record the KID and JWKS URL. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Sig4 placement"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Sig4 MAY be created either within the "),
                    createVNode("code", null, "C3-hh-cm-client"),
                    createTextVNode(" application or at the organisation level — this is at the LFI's discretion. ")
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
        id: "lfi-held-encryption",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "LFI-held encryption certificate",
        title: "Enc1 — encrypts PII sent to the API Hub",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-ede7c174${_scopeId}>Enc1 — Encryption Key</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Used by the TPP to encrypt Personally Identifiable Information (PII) sent to the API Hub. The PII payloads are encrypted using the LFI&#39;s public key from the JWKS. Only the LFI can decrypt using its private key. `);
                } else {
                  return [
                    createTextVNode(" Used by the TPP to encrypt Personally Identifiable Information (PII) sent to the API Hub. The PII payloads are encrypted using the LFI's public key from the JWKS. Only the LFI can decrypt using its private key. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Field</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Provided By</th><th data-v-ede7c174${_scopeId2}>Description</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>JWKS URL</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The organisation application JWKS URL from the Trust Framework.</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}>KID</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>The Key ID assigned to this certificate.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "JWKS URL"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The organisation application JWKS URL from the Trust Framework.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "KID"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "The Key ID assigned to this certificate.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-ede7c174${_scopeId2}>LFI action:</strong> Generate a private key and CSR → navigate to Organisation Certificates → + New Certificate → select <strong data-v-ede7c174${_scopeId2}>Server Encryption</strong> → upload the CSR → record the KID and JWKS URL. `);
                } else {
                  return [
                    createVNode("strong", null, "LFI action:"),
                    createTextVNode(" Generate a private key and CSR → navigate to Organisation Certificates → + New Certificate → select "),
                    createVNode("strong", null, "Server Encryption"),
                    createTextVNode(" → upload the CSR → record the KID and JWKS URL. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Recommended certificate type"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ede7c174${_scopeId2}> When creating the Enc1 certificate, select the <strong data-v-ede7c174${_scopeId2}>Server ENCKEY</strong> certificate type. This type does not expire, avoiding the need for periodic rotation of your encryption key. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" When creating the Enc1 certificate, select the "),
                      createVNode("strong", null, "Server ENCKEY"),
                      createTextVNode(" certificate type. This type does not expire, avoiding the need for periodic rotation of your encryption key. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Enc1 — Encryption Key"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Used by the TPP to encrypt Personally Identifiable Information (PII) sent to the API Hub. The PII payloads are encrypted using the LFI's public key from the JWKS. Only the LFI can decrypt using its private key. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", { style: { "text-align": "center" } }, "Provided By"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "JWKS URL"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The organisation application JWKS URL from the Trust Framework.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "KID"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "The Key ID assigned to this certificate.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "LFI action:"),
                  createTextVNode(" Generate a private key and CSR → navigate to Organisation Certificates → + New Certificate → select "),
                  createVNode("strong", null, "Server Encryption"),
                  createTextVNode(" → upload the CSR → record the KID and JWKS URL. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Recommended certificate type"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" When creating the Enc1 certificate, select the "),
                    createVNode("strong", null, "Server ENCKEY"),
                    createTextVNode(" certificate type. This type does not expire, avoiding the need for periodic rotation of your encryption key. ")
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
        id: "certificate-summary",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Certificate summary",
        title: "At-a-glance overview",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For a complete overview of all certificates and how they fit into the API Hub network architecture, see <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/" data-v-ede7c174${_scopeId2}>API Hub Connectivity &amp; Certificates</a>. `);
                } else {
                  return [
                    createTextVNode(" For a complete overview of all certificates and how they fit into the API Hub network architecture, see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "API Hub Connectivity & Certificates"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ede7c174${_scopeId2}><thead data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><th data-v-ede7c174${_scopeId2}>Certificate</th><th data-v-ede7c174${_scopeId2}>Type</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Private Key</th><th data-v-ede7c174${_scopeId2}>LFI Action</th><th data-v-ede7c174${_scopeId2}>TF Location</th></tr></thead><tbody data-v-ede7c174${_scopeId2}><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>S1</strong></td><td data-v-ede7c174${_scopeId2}>Server Transport</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Upload CSR, return JWKS + KID</td><td data-v-ede7c174${_scopeId2}>Organisation</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>S3</strong></td><td data-v-ede7c174${_scopeId2}>Server Transport</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Upload CSR, return JWKS + KID</td><td data-v-ede7c174${_scopeId2}>Organisation</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>C4</strong></td><td data-v-ede7c174${_scopeId2}>Client Transport</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>None — receive JWKS + KID</td><td data-v-ede7c174${_scopeId2}>Ozone&#39;s organisation</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Sig2</strong></td><td data-v-ede7c174${_scopeId2}>Server Signing</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>Upload CSR, return JWKS + KID</td><td data-v-ede7c174${_scopeId2}>Organisation</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Sig3</strong></td><td data-v-ede7c174${_scopeId2}>Signing (JWT Auth)</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>Ozone</td><td data-v-ede7c174${_scopeId2}>None — receive JWKS + KID</td><td data-v-ede7c174${_scopeId2}>Ozone&#39;s organisation</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>C3</strong></td><td data-v-ede7c174${_scopeId2}>Client Transport</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>Generate, create in <code data-v-ede7c174${_scopeId2}>C3-hh-cm-client</code> app</td><td data-v-ede7c174${_scopeId2}>Application</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>S4</strong></td><td data-v-ede7c174${_scopeId2}>Server Transport</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>Generate, create in organisation</td><td data-v-ede7c174${_scopeId2}>Organisation</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Sig4</strong></td><td data-v-ede7c174${_scopeId2}>Signing (JWT Auth)</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>Generate, create in app or organisation</td><td data-v-ede7c174${_scopeId2}>Application or Organisation</td></tr><tr data-v-ede7c174${_scopeId2}><td data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>Enc1</strong></td><td data-v-ede7c174${_scopeId2}>Server Encryption</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-ede7c174${_scopeId2}>LFI</td><td data-v-ede7c174${_scopeId2}>Generate, create in organisation</td><td data-v-ede7c174${_scopeId2}>Organisation</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Certificate"),
                          createVNode("th", null, "Type"),
                          createVNode("th", { style: { "text-align": "center" } }, "Private Key"),
                          createVNode("th", null, "LFI Action"),
                          createVNode("th", null, "TF Location")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "S1")
                          ]),
                          createVNode("td", null, "Server Transport"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Upload CSR, return JWKS + KID"),
                          createVNode("td", null, "Organisation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "S3")
                          ]),
                          createVNode("td", null, "Server Transport"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Upload CSR, return JWKS + KID"),
                          createVNode("td", null, "Organisation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "C4")
                          ]),
                          createVNode("td", null, "Client Transport"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "None — receive JWKS + KID"),
                          createVNode("td", null, "Ozone's organisation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Sig2")
                          ]),
                          createVNode("td", null, "Server Signing"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "Upload CSR, return JWKS + KID"),
                          createVNode("td", null, "Organisation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Sig3")
                          ]),
                          createVNode("td", null, "Signing (JWT Auth)"),
                          createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                          createVNode("td", null, "None — receive JWKS + KID"),
                          createVNode("td", null, "Ozone's organisation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "C3")
                          ]),
                          createVNode("td", null, "Client Transport"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, [
                            createTextVNode("Generate, create in "),
                            createVNode("code", null, "C3-hh-cm-client"),
                            createTextVNode(" app")
                          ]),
                          createVNode("td", null, "Application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "S4")
                          ]),
                          createVNode("td", null, "Server Transport"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "Generate, create in organisation"),
                          createVNode("td", null, "Organisation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Sig4")
                          ]),
                          createVNode("td", null, "Signing (JWT Auth)"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "Generate, create in app or organisation"),
                          createVNode("td", null, "Application or Organisation")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Enc1")
                          ]),
                          createVNode("td", null, "Server Encryption"),
                          createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                          createVNode("td", null, "Generate, create in organisation"),
                          createVNode("td", null, "Organisation")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Certificate reuse across brands"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ede7c174${_scopeId2}> If your institution operates multiple API Hub instances (e.g. for retail and business brands), LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires its own environment-specific onboarding form, but can reference the same certificates. </p>`);
                } else {
                  return [
                    createVNode("p", null, " If your institution operates multiple API Hub instances (e.g. for retail and business brands), LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires its own environment-specific onboarding form, but can reference the same certificates. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For a complete overview of all certificates and how they fit into the API Hub network architecture, see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/connectivity/" }, "API Hub Connectivity & Certificates"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Certificate"),
                        createVNode("th", null, "Type"),
                        createVNode("th", { style: { "text-align": "center" } }, "Private Key"),
                        createVNode("th", null, "LFI Action"),
                        createVNode("th", null, "TF Location")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "S1")
                        ]),
                        createVNode("td", null, "Server Transport"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Upload CSR, return JWKS + KID"),
                        createVNode("td", null, "Organisation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "S3")
                        ]),
                        createVNode("td", null, "Server Transport"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Upload CSR, return JWKS + KID"),
                        createVNode("td", null, "Organisation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "C4")
                        ]),
                        createVNode("td", null, "Client Transport"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "None — receive JWKS + KID"),
                        createVNode("td", null, "Ozone's organisation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Sig2")
                        ]),
                        createVNode("td", null, "Server Signing"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "Upload CSR, return JWKS + KID"),
                        createVNode("td", null, "Organisation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Sig3")
                        ]),
                        createVNode("td", null, "Signing (JWT Auth)"),
                        createVNode("td", { style: { "text-align": "center" } }, "Ozone"),
                        createVNode("td", null, "None — receive JWKS + KID"),
                        createVNode("td", null, "Ozone's organisation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "C3")
                        ]),
                        createVNode("td", null, "Client Transport"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, [
                          createTextVNode("Generate, create in "),
                          createVNode("code", null, "C3-hh-cm-client"),
                          createTextVNode(" app")
                        ]),
                        createVNode("td", null, "Application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "S4")
                        ]),
                        createVNode("td", null, "Server Transport"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "Generate, create in organisation"),
                        createVNode("td", null, "Organisation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Sig4")
                        ]),
                        createVNode("td", null, "Signing (JWT Auth)"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "Generate, create in app or organisation"),
                        createVNode("td", null, "Application or Organisation")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Enc1")
                        ]),
                        createVNode("td", null, "Server Encryption"),
                        createVNode("td", { style: { "text-align": "center" } }, "LFI"),
                        createVNode("td", null, "Generate, create in organisation"),
                        createVNode("td", null, "Organisation")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Certificate reuse across brands"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " If your institution operates multiple API Hub instances (e.g. for retail and business brands), LFI-held certificates (C3, S4, Sig4, Enc1) MAY be reused across brands. Each brand still requires its own environment-specific onboarding form, but can reference the same certificates. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "connectivity-validation",
        num: "07",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Connectivity validation",
        title: "End-to-end validation in both directions",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once all certificates have been created and the required details have been added to the Service Desk ticket, Ozone will perform <strong data-v-ede7c174${_scopeId2}>end-to-end connectivity validation</strong> in both directions: `);
                } else {
                  return [
                    createTextVNode(" Once all certificates have been created and the required details have been added to the Service Desk ticket, Ozone will perform "),
                    createVNode("strong", null, "end-to-end connectivity validation"),
                    createTextVNode(" in both directions: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>API Hub to LFI</strong> — The API Hub will make requests to your Ozone Connect endpoints (e.g. the <a href="/tech/lfi-api-hub/v2.1/health-check/" data-v-ede7c174${_scopeId2}>health check endpoints</a><code data-v-ede7c174${_scopeId2}>/hello</code>, <code data-v-ede7c174${_scopeId2}>/hello-mtls</code>, <code data-v-ede7c174${_scopeId2}>/echo-cert</code>) to verify that transport certificates, network routing, and application layer authentication are correctly configured. </li><li data-v-ede7c174${_scopeId2}><strong data-v-ede7c174${_scopeId2}>LFI to API Hub</strong> — Your integration will make requests to the API Hub&#39;s Consent Manager and Headless Heimdall Auth Server endpoints to verify that mTLS and application layer authentication are correctly configured in the reverse direction. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "API Hub to LFI"),
                      createTextVNode(" — The API Hub will make requests to your Ozone Connect endpoints (e.g. the "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/health-check/" }, "health check endpoints"),
                      createVNode("code", null, "/hello"),
                      createTextVNode(", "),
                      createVNode("code", null, "/hello-mtls"),
                      createTextVNode(", "),
                      createVNode("code", null, "/echo-cert"),
                      createTextVNode(") to verify that transport certificates, network routing, and application layer authentication are correctly configured. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "LFI to API Hub"),
                      createTextVNode(" — Your integration will make requests to the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints to verify that mTLS and application layer authentication are correctly configured in the reverse direction. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Ticket closure"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ede7c174${_scopeId2}> The environment-specific onboarding ticket will only be closed once connectivity has been successfully established in <strong data-v-ede7c174${_scopeId2}>both directions</strong>. If validation fails, the Service Desk ticket will remain open and the support team will work with you to resolve any issues. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The environment-specific onboarding ticket will only be closed once connectivity has been successfully established in "),
                      createVNode("strong", null, "both directions"),
                      createTextVNode(". If validation fails, the Service Desk ticket will remain open and the support team will work with you to resolve any issues. ")
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
                  createTextVNode(" Once all certificates have been created and the required details have been added to the Service Desk ticket, Ozone will perform "),
                  createVNode("strong", null, "end-to-end connectivity validation"),
                  createTextVNode(" in both directions: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "API Hub to LFI"),
                    createTextVNode(" — The API Hub will make requests to your Ozone Connect endpoints (e.g. the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/health-check/" }, "health check endpoints"),
                    createVNode("code", null, "/hello"),
                    createTextVNode(", "),
                    createVNode("code", null, "/hello-mtls"),
                    createTextVNode(", "),
                    createVNode("code", null, "/echo-cert"),
                    createTextVNode(") to verify that transport certificates, network routing, and application layer authentication are correctly configured. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "LFI to API Hub"),
                    createTextVNode(" — Your integration will make requests to the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints to verify that mTLS and application layer authentication are correctly configured in the reverse direction. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Ticket closure"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The environment-specific onboarding ticket will only be closed once connectivity has been successfully established in "),
                    createVNode("strong", null, "both directions"),
                    createTextVNode(". If validation fails, the Service Desk ticket will remain open and the support team will work with you to resolve any issues. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ede7c174"]]);
export {
  index as default
};
