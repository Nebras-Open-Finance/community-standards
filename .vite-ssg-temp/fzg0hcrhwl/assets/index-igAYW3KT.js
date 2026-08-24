import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const tree = `Organisation
└── Server (API Hub)
    ├── API Resource  (Banking Data Sharing)
    ├── API Resource  (Payment Initiation)
    └── API Resource  (Confirmation of Payee)`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-541d07b2><section class="ed-doc__hero" data-v-541d07b2><div class="ed-doc__inner" data-v-541d07b2><div class="ed-doc__eyebrow" data-v-541d07b2><span class="ed-doc__eyebrow-dash" data-v-541d07b2></span> LFI · Trust Framework · Servers </div><h1 class="ed-doc__title" data-v-541d07b2> Servers <span class="ed-doc__read" data-v-541d07b2>3 min read</span></h1><p class="ed-doc__lede" data-v-541d07b2> A <strong data-v-541d07b2>Server</strong> in the Trust Framework represents your LFI&#39;s <strong data-v-541d07b2>API Hub</strong> — the centralised platform that acts as the OIDC Authorisation Server, Resource Server, and Open Finance Gateway for your institution. Each API Hub instance is provisioned by the platform and is the entry point through which TPPs discover and interact with your Open Finance APIs. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-541d07b2> As an LFI you MUST publish your API Hub as a server to the Trust Framework and associate your <a href="/tech/lfi-api-hub/trust-framework/servers/api/" data-v-541d07b2>API Resources</a> with it so that TPPs can discover the endpoints you expose via <a href="/tech/tpp-standards/trust-framework/open-api/participants" class="endpoint" data-v-541d07b2><span class="http-method http-method--get" data-v-541d07b2>GET</span><code data-v-541d07b2>/participants</code></a>. </p>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "warning",
        title: "Environment Mapping"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-541d07b2${_scopeId}> You MUST publish your <strong data-v-541d07b2${_scopeId}>pre-production</strong> API Hub to the <strong data-v-541d07b2${_scopeId}>Sandbox Trust Framework</strong> and your <strong data-v-541d07b2${_scopeId}>production</strong> API Hub to the <strong data-v-541d07b2${_scopeId}>Production Trust Framework</strong>. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" You MUST publish your "),
                createVNode("strong", null, "pre-production"),
                createTextVNode(" API Hub to the "),
                createVNode("strong", null, "Sandbox Trust Framework"),
                createTextVNode(" and your "),
                createVNode("strong", null, "production"),
                createTextVNode(" API Hub to the "),
                createVNode("strong", null, "Production Trust Framework"),
                createTextVNode(". ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what-does-server-represent",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What Does a Server Represent?",
        title: "The directory record TPPs use to find and call your API Hub",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Within the Trust Framework, a server entry is a directory record that represents your API Hub. It tells TPPs: `);
                } else {
                  return [
                    createTextVNode(" Within the Trust Framework, a server entry is a directory record that represents your API Hub. It tells TPPs: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Where to send users</strong> for authentication and consent (the API Hub&#39;s authorisation endpoint)</li><li data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Where to obtain tokens</strong> (the API Hub&#39;s token endpoint)</li><li data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>What APIs you expose</strong> and at which base URLs (via your registered <a href="/tech/lfi-api-hub/trust-framework/servers/api/" data-v-541d07b2${_scopeId2}>API Resources</a>)</li><li data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>How to validate identity</strong> (via the API Hub&#39;s JWKS URI and OIDC discovery document)</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Where to send users"),
                      createTextVNode(" for authentication and consent (the API Hub's authorisation endpoint)")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Where to obtain tokens"),
                      createTextVNode(" (the API Hub's token endpoint)")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "What APIs you expose"),
                      createTextVNode(" and at which base URLs (via your registered "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/api/" }, "API Resources"),
                      createTextVNode(")")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "How to validate identity"),
                      createTextVNode(" (via the API Hub's JWKS URI and OIDC discovery document)")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When a TPP initiates an authorisation code flow, it queries the Trust Framework directory to locate the correct server (API Hub) for the institution it wants to interact with. `);
                } else {
                  return [
                    createTextVNode(" When a TPP initiates an authorisation code flow, it queries the Trust Framework directory to locate the correct server (API Hub) for the institution it wants to interact with. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Within the Trust Framework, a server entry is a directory record that represents your API Hub. It tells TPPs: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Where to send users"),
                    createTextVNode(" for authentication and consent (the API Hub's authorisation endpoint)")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Where to obtain tokens"),
                    createTextVNode(" (the API Hub's token endpoint)")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "What APIs you expose"),
                    createTextVNode(" and at which base URLs (via your registered "),
                    createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/api/" }, "API Resources"),
                    createTextVNode(")")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "How to validate identity"),
                    createTextVNode(" (via the API Hub's JWKS URI and OIDC discovery document)")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When a TPP initiates an authorisation code flow, it queries the Trust Framework directory to locate the correct server (API Hub) for the institution it wants to interact with. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "discovery-uri",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "API Hub Discovery URI",
        title: "How the well-known URI is obtained",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When your API Hub is provisioned, the platform provides you with a <strong data-v-541d07b2${_scopeId2}>well-known discovery document URI</strong>. This URI is unique to your institution and environment. It exposes your API Hub&#39;s <code data-v-541d07b2${_scopeId2}>authorization_endpoint</code>, <code data-v-541d07b2${_scopeId2}>token_endpoint</code>, <code data-v-541d07b2${_scopeId2}>jwks_uri</code>, <code data-v-541d07b2${_scopeId2}>issuer</code>, and supported parameters. `);
                } else {
                  return [
                    createTextVNode(" When your API Hub is provisioned, the platform provides you with a "),
                    createVNode("strong", null, "well-known discovery document URI"),
                    createTextVNode(". This URI is unique to your institution and environment. It exposes your API Hub's "),
                    createVNode("code", null, "authorization_endpoint"),
                    createTextVNode(", "),
                    createVNode("code", null, "token_endpoint"),
                    createTextVNode(", "),
                    createVNode("code", null, "jwks_uri"),
                    createTextVNode(", "),
                    createVNode("code", null, "issuer"),
                    createTextVNode(", and supported parameters. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You will receive this URI as part of your <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-541d07b2${_scopeId2}>environment-specific onboarding configuration</a>. `);
                } else {
                  return [
                    createTextVNode(" You will receive this URI as part of your "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "environment-specific onboarding configuration"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-541d07b2${_scopeId2}>issuer</code> value from the discovery document is a required field when creating your server entry in the Trust Framework. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "issuer"),
                    createTextVNode(" value from the discovery document is a required field when creating your server entry in the Trust Framework. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When your API Hub is provisioned, the platform provides you with a "),
                  createVNode("strong", null, "well-known discovery document URI"),
                  createTextVNode(". This URI is unique to your institution and environment. It exposes your API Hub's "),
                  createVNode("code", null, "authorization_endpoint"),
                  createTextVNode(", "),
                  createVNode("code", null, "token_endpoint"),
                  createTextVNode(", "),
                  createVNode("code", null, "jwks_uri"),
                  createTextVNode(", "),
                  createVNode("code", null, "issuer"),
                  createTextVNode(", and supported parameters. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" You will receive this URI as part of your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "environment-specific onboarding configuration"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "issuer"),
                  createTextVNode(" value from the discovery document is a required field when creating your server entry in the Trust Framework. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "required-information",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Required Information",
        title: "Fields you must supply when creating a server",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`To create a server in the Trust Framework, you MUST provide:`);
                } else {
                  return [
                    createTextVNode("To create a server in the Trust Framework, you MUST provide:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-541d07b2${_scopeId2}><thead data-v-541d07b2${_scopeId2}><tr data-v-541d07b2${_scopeId2}><th data-v-541d07b2${_scopeId2}>Field</th><th data-v-541d07b2${_scopeId2}>Description</th></tr></thead><tbody data-v-541d07b2${_scopeId2}><tr data-v-541d07b2${_scopeId2}><td data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Customer Friendly Server Name</strong></td><td data-v-541d07b2${_scopeId2}>A public-facing name for your institution&#39;s Open Finance service, displayed in TPP-facing portals and consent screens. This MUST reflect the brand that the API Hub supports (see <a href="#logo-and-branding" data-v-541d07b2${_scopeId2}>Logo</a> below).</td></tr><tr data-v-541d07b2${_scopeId2}><td data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Issuer</strong></td><td data-v-541d07b2${_scopeId2}>The <code data-v-541d07b2${_scopeId2}>issuer</code> value from your API Hub&#39;s well-known discovery document.</td></tr><tr data-v-541d07b2${_scopeId2}><td data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Description</strong></td><td data-v-541d07b2${_scopeId2}>A short description of your institution&#39;s Open Finance offering.</td></tr><tr data-v-541d07b2${_scopeId2}><td data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Logo</strong></td><td data-v-541d07b2${_scopeId2}>Your institution&#39;s logo for this API Hub instance (see <a href="#logo-and-branding" data-v-541d07b2${_scopeId2}>Logo and Branding</a> below).</td></tr><tr data-v-541d07b2${_scopeId2}><td data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Account Type</strong></td><td data-v-541d07b2${_scopeId2}>The account type(s) supported by this server: <strong data-v-541d07b2${_scopeId2}>Retail</strong>, <strong data-v-541d07b2${_scopeId2}>SME</strong>, or <strong data-v-541d07b2${_scopeId2}>Corporate</strong> (see <a href="#account-types" data-v-541d07b2${_scopeId2}>Account Types</a> below).</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Customer Friendly Server Name")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("A public-facing name for your institution's Open Finance service, displayed in TPP-facing portals and consent screens. This MUST reflect the brand that the API Hub supports (see "),
                            createVNode("a", { href: "#logo-and-branding" }, "Logo"),
                            createTextVNode(" below).")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Issuer")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "issuer"),
                            createTextVNode(" value from your API Hub's well-known discovery document.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Description")
                          ]),
                          createVNode("td", null, "A short description of your institution's Open Finance offering.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Logo")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Your institution's logo for this API Hub instance (see "),
                            createVNode("a", { href: "#logo-and-branding" }, "Logo and Branding"),
                            createTextVNode(" below).")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Account Type")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The account type(s) supported by this server: "),
                            createVNode("strong", null, "Retail"),
                            createTextVNode(", "),
                            createVNode("strong", null, "SME"),
                            createTextVNode(", or "),
                            createVNode("strong", null, "Corporate"),
                            createTextVNode(" (see "),
                            createVNode("a", { href: "#account-types" }, "Account Types"),
                            createTextVNode(" below).")
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
                  createTextVNode("To create a server in the Trust Framework, you MUST provide:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Customer Friendly Server Name")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("A public-facing name for your institution's Open Finance service, displayed in TPP-facing portals and consent screens. This MUST reflect the brand that the API Hub supports (see "),
                          createVNode("a", { href: "#logo-and-branding" }, "Logo"),
                          createTextVNode(" below).")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Issuer")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, "issuer"),
                          createTextVNode(" value from your API Hub's well-known discovery document.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Description")
                        ]),
                        createVNode("td", null, "A short description of your institution's Open Finance offering.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Logo")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Your institution's logo for this API Hub instance (see "),
                          createVNode("a", { href: "#logo-and-branding" }, "Logo and Branding"),
                          createTextVNode(" below).")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Account Type")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The account type(s) supported by this server: "),
                          createVNode("strong", null, "Retail"),
                          createTextVNode(", "),
                          createVNode("strong", null, "SME"),
                          createTextVNode(", or "),
                          createVNode("strong", null, "Corporate"),
                          createTextVNode(" (see "),
                          createVNode("a", { href: "#account-types" }, "Account Types"),
                          createTextVNode(" below).")
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
        id: "logo-and-branding",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Logo and Branding",
        title: "Match the brand that the API Hub supports",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The logo you provide MUST match the brand that the API Hub supports. If your institution operates multiple API Hubs — for example, one for retail banking and one for business banking — each server entry MUST use the logo corresponding to that specific brand. `);
                } else {
                  return [
                    createTextVNode(" The logo you provide MUST match the brand that the API Hub supports. If your institution operates multiple API Hubs — for example, one for retail banking and one for business banking — each server entry MUST use the logo corresponding to that specific brand. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This ensures that TPPs and end users see the correct branding during consent and authorisation journeys. `);
                } else {
                  return [
                    createTextVNode(" This ensures that TPPs and end users see the correct branding during consent and authorisation journeys. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The logo you provide MUST match the brand that the API Hub supports. If your institution operates multiple API Hubs — for example, one for retail banking and one for business banking — each server entry MUST use the logo corresponding to that specific brand. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This ensures that TPPs and end users see the correct branding during consent and authorisation journeys. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "account-types",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Account Types",
        title: "Retail, SME, or Corporate",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each server MUST indicate the account type(s) it supports. This allows TPPs to identify which server to use when requesting access to a specific category of accounts. `);
                } else {
                  return [
                    createTextVNode(" Each server MUST indicate the account type(s) it supports. This allows TPPs to identify which server to use when requesting access to a specific category of accounts. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-541d07b2${_scopeId2}><thead data-v-541d07b2${_scopeId2}><tr data-v-541d07b2${_scopeId2}><th data-v-541d07b2${_scopeId2}>Account Type</th><th data-v-541d07b2${_scopeId2}>Description</th></tr></thead><tbody data-v-541d07b2${_scopeId2}><tr data-v-541d07b2${_scopeId2}><td data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Retail</strong></td><td data-v-541d07b2${_scopeId2}>Personal and individual customer accounts.</td></tr><tr data-v-541d07b2${_scopeId2}><td data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>SME</strong></td><td data-v-541d07b2${_scopeId2}>Small and medium enterprise accounts.</td></tr><tr data-v-541d07b2${_scopeId2}><td data-v-541d07b2${_scopeId2}><strong data-v-541d07b2${_scopeId2}>Corporate</strong></td><td data-v-541d07b2${_scopeId2}>Corporate and institutional accounts.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Account Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Retail")
                          ]),
                          createVNode("td", null, "Personal and individual customer accounts.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "SME")
                          ]),
                          createVNode("td", null, "Small and medium enterprise accounts.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Corporate")
                          ]),
                          createVNode("td", null, "Corporate and institutional accounts.")
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
                  _push3(` An institution MAY register multiple servers if it operates separate API Hubs for different account types or brands. `);
                } else {
                  return [
                    createTextVNode(" An institution MAY register multiple servers if it operates separate API Hubs for different account types or brands. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each server MUST indicate the account type(s) it supports. This allows TPPs to identify which server to use when requesting access to a specific category of accounts. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Account Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Retail")
                        ]),
                        createVNode("td", null, "Personal and individual customer accounts.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "SME")
                        ]),
                        createVNode("td", null, "Small and medium enterprise accounts.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Corporate")
                        ]),
                        createVNode("td", null, "Corporate and institutional accounts.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" An institution MAY register multiple servers if it operates separate API Hubs for different account types or brands. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "relationship-to-api-resources",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Relationship to API Resources",
        title: "A server is the parent of one or more API resources",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A server acts as the parent for one or more <strong data-v-541d07b2${_scopeId2}>API Resources</strong>. Each API resource entry associates a specific API family (e.g. banking data sharing, payment initiation) with the scopes your implementation supports. `);
                } else {
                  return [
                    createTextVNode(" A server acts as the parent for one or more "),
                    createVNode("strong", null, "API Resources"),
                    createTextVNode(". Each API resource entry associates a specific API family (e.g. banking data sharing, payment initiation) with the scopes your implementation supports. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: tree,
              lang: "plaintext",
              filename: "Hierarchy"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` TPPs retrieving your directory entry will see both the server endpoints and the list of API resources, giving them everything they need to dynamically register and call your APIs. `);
                } else {
                  return [
                    createTextVNode(" TPPs retrieving your directory entry will see both the server endpoints and the list of API resources, giving them everything they need to dynamically register and call your APIs. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A server acts as the parent for one or more "),
                  createVNode("strong", null, "API Resources"),
                  createTextVNode(". Each API resource entry associates a specific API family (e.g. banking data sharing, payment initiation) with the scopes your implementation supports. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: tree,
                lang: "plaintext",
                filename: "Hierarchy"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" TPPs retrieving your directory entry will see both the server endpoints and the list of API resources, giving them everything they need to dynamically register and call your APIs. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="ed-doc__contents" data-v-541d07b2><div class="ed-doc__inner" data-v-541d07b2><div class="ed-doc__contents-head" data-v-541d07b2><div class="ed-doc__contents-eyebrow" data-v-541d07b2><span class="ed-doc__eyebrow-dash" data-v-541d07b2></span> Next Steps </div><h2 class="ed-doc__contents-title" data-v-541d07b2>Continue setting up your server</h2></div><div class="ed-doc__contents-grid" data-v-541d07b2><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/creating" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-541d07b2><span class="ed-link-card__top" data-v-541d07b2></span><div class="ed-link-card__meta" data-v-541d07b2><span class="ed-link-card__cat" data-v-541d07b2>Walkthrough</span></div><h3 class="ed-link-card__title" data-v-541d07b2>Creating a Server</h3><p class="ed-link-card__desc" data-v-541d07b2>Step-by-step walkthrough of registering your API Hub as a server in the Trust Framework Directory.</p><div class="ed-link-card__foot" data-v-541d07b2><span class="ed-link-card__cta" data-v-541d07b2>Open</span><span class="ed-link-card__arrow" data-v-541d07b2>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-541d07b2><span class="ed-link-card__top" data-v-541d07b2></span><div class="ed-link-card__meta" data-v-541d07b2><span class="ed-link-card__cat" data-v-541d07b2>Sub-section</span></div><h3 class="ed-link-card__title" data-v-541d07b2>API Resources</h3><p class="ed-link-card__desc" data-v-541d07b2>What API resources are, how they relate to API families, and how to configure them on your server.</p><div class="ed-link-card__foot" data-v-541d07b2><span class="ed-link-card__cta" data-v-541d07b2>Open</span><span class="ed-link-card__arrow" data-v-541d07b2>→</span></div></a></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/servers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-541d07b2"]]);
export {
  index as default
};
