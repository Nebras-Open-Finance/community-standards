import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_5$1 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "creating",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/add-server/1.png", import.meta.url).href, alt: "Step 1", title: "Click into your organisation" },
      { src: new URL("/images/raidiam/add-server/2.png", import.meta.url).href, alt: "Step 2", title: "Click into Servers" },
      { src: new URL("/images/raidiam/add-server/3.png", import.meta.url).href, alt: "Step 3", title: "Click + New Server" }
    ];
    const images2 = [
      { src: new URL("/images/raidiam/add-server/4.png", import.meta.url).href, alt: "Step 1", title: "Enter Customer Friendly Server Name" },
      { src: new URL("/images/raidiam/add-server/5.png", import.meta.url).href, alt: "Step 2", title: "Enter Issuer it will be formatted - https://auth1.{LFICODE}.apihub.openfinance.ae" },
      { src: new URL("/images/raidiam/add-server/6.png", import.meta.url).href, alt: "Step 3", title: "Enter the Description" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdBullets = __unplugin_components_5$1;
      const _component_ImageViewer = ImageViewer;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-4592df7e><section class="ed-doc__hero" data-v-4592df7e><div class="ed-doc__inner" data-v-4592df7e><div class="ed-doc__eyebrow" data-v-4592df7e><span class="ed-doc__eyebrow-dash" data-v-4592df7e></span> LFI · Trust Framework · Servers </div><h1 class="ed-doc__title" data-v-4592df7e> Creating a Server <span class="ed-doc__read" data-v-4592df7e>3 min read</span></h1><p class="ed-doc__lede" data-v-4592df7e> This walkthrough covers publishing your API Hub as a server in the Trust Framework. You MUST complete this before registering API resources or being discoverable by TPPs. </p>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "info",
        title: "Prerequisites"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-4592df7e${_scopeId}>Before creating a server:</p><ul data-v-4592df7e${_scopeId}><li data-v-4592df7e${_scopeId}>Your organisation MUST be onboarded to the Trust Framework with the necessary admin permissions. See <a href="/tech/lfi-api-hub/trust-framework/onboarding" data-v-4592df7e${_scopeId}>Onboarding</a> if you have not yet completed this step.</li><li data-v-4592df7e${_scopeId}>Your API Hub MUST be provisioned and you MUST have received your <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-4592df7e${_scopeId}>environment-specific configuration</a>, including your well-known discovery document URI.</li></ul>`);
          } else {
            return [
              createVNode("p", null, "Before creating a server:"),
              createVNode("ul", null, [
                createVNode("li", null, [
                  createTextVNode("Your organisation MUST be onboarded to the Trust Framework with the necessary admin permissions. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/onboarding" }, "Onboarding"),
                  createTextVNode(" if you have not yet completed this step.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Your API Hub MUST be provisioned and you MUST have received your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                  createTextVNode(", including your well-known discovery document URI.")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "walkthrough",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Walkthrough",
        title: "From + New Server to a published Authorisation Server",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__steps" data-v-4592df7e${_scopeId}><li data-v-4592df7e${_scopeId}><h3 data-v-4592df7e${_scopeId}>Obtain Your Issuer</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before creating the server entry, retrieve the <code data-v-4592df7e${_scopeId2}>issuer</code> value from your API Hub&#39;s well-known discovery document. The discovery document URI is provided as part of your <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" data-v-4592df7e${_scopeId2}>environment-specific onboarding configuration</a>. `);
                } else {
                  return [
                    createTextVNode(" Before creating the server entry, retrieve the "),
                    createVNode("code", null, "issuer"),
                    createTextVNode(" value from your API Hub's well-known discovery document. The discovery document URI is provided as part of your "),
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
                  _push3(` Open the discovery document URI in a browser or HTTP client and locate the <code data-v-4592df7e${_scopeId2}>issuer</code> field. You will need this value in Step 3. `);
                } else {
                  return [
                    createTextVNode(" Open the discovery document URI in a browser or HTTP client and locate the "),
                    createVNode("code", null, "issuer"),
                    createTextVNode(" field. You will need this value in Step 3. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-4592df7e${_scopeId}><h3 data-v-4592df7e${_scopeId}>Navigate to your Organisation</h3><ol class="ed-doc__substeps" data-v-4592df7e${_scopeId}><li data-v-4592df7e${_scopeId}>Sign in to the Trust Framework directory.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Environment Mapping"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4592df7e${_scopeId2}>Ensure you are creating the server in the correct Trust Framework environment:</p><ul data-v-4592df7e${_scopeId2}><li data-v-4592df7e${_scopeId2}><strong data-v-4592df7e${_scopeId2}>Pre-production</strong> API Hub → <strong data-v-4592df7e${_scopeId2}>Sandbox</strong> Trust Framework (<code data-v-4592df7e${_scopeId2}>web.sandbox.directory.openfinance.ae</code>)</li><li data-v-4592df7e${_scopeId2}><strong data-v-4592df7e${_scopeId2}>Production</strong> API Hub → <strong data-v-4592df7e${_scopeId2}>Production</strong> Trust Framework (<code data-v-4592df7e${_scopeId2}>web.directory.openfinance.ae</code>)</li></ul>`);
                } else {
                  return [
                    createVNode("p", null, "Ensure you are creating the server in the correct Trust Framework environment:"),
                    createVNode("ul", null, [
                      createVNode("li", null, [
                        createVNode("strong", null, "Pre-production"),
                        createTextVNode(" API Hub → "),
                        createVNode("strong", null, "Sandbox"),
                        createTextVNode(" Trust Framework ("),
                        createVNode("code", null, "web.sandbox.directory.openfinance.ae"),
                        createTextVNode(")")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Production"),
                        createTextVNode(" API Hub → "),
                        createVNode("strong", null, "Production"),
                        createTextVNode(" Trust Framework ("),
                        createVNode("code", null, "web.directory.openfinance.ae"),
                        createTextVNode(")")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__substeps" start="2" data-v-4592df7e${_scopeId}><li data-v-4592df7e${_scopeId}>Navigate to your <strong data-v-4592df7e${_scopeId}>Organisation</strong>.</li><li data-v-4592df7e${_scopeId}>Open the <strong data-v-4592df7e${_scopeId}>Auth Servers</strong> section.</li><li data-v-4592df7e${_scopeId}>Click <strong data-v-4592df7e${_scopeId}>+ New Server</strong>.</li></ol>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images1 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images1 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-4592df7e${_scopeId}><h3 data-v-4592df7e${_scopeId}>Provide the Server Details</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Fill in the required fields. These values are published in the directory and are visible to TPPs. `);
                } else {
                  return [
                    createTextVNode(" Fill in the required fields. These values are published in the directory and are visible to TPPs. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-4592df7e${_scopeId2}><thead data-v-4592df7e${_scopeId2}><tr data-v-4592df7e${_scopeId2}><th data-v-4592df7e${_scopeId2}>Field</th><th data-v-4592df7e${_scopeId2}>Guidance</th></tr></thead><tbody data-v-4592df7e${_scopeId2}><tr data-v-4592df7e${_scopeId2}><td data-v-4592df7e${_scopeId2}><strong data-v-4592df7e${_scopeId2}>Customer Friendly Server Name</strong></td><td data-v-4592df7e${_scopeId2}>A public-facing name that reflects the brand this API Hub supports (e.g. <code data-v-4592df7e${_scopeId2}>Acme Bank Retail</code> or <code data-v-4592df7e${_scopeId2}>Acme Bank Business</code>). If your institution operates multiple API Hubs for different brands, each MUST have a distinct name.</td></tr><tr data-v-4592df7e${_scopeId2}><td data-v-4592df7e${_scopeId2}><strong data-v-4592df7e${_scopeId2}>Issuer</strong></td><td data-v-4592df7e${_scopeId2}>The <code data-v-4592df7e${_scopeId2}>issuer</code> value from your API Hub&#39;s well-known discovery document, obtained in Step 1.</td></tr><tr data-v-4592df7e${_scopeId2}><td data-v-4592df7e${_scopeId2}><strong data-v-4592df7e${_scopeId2}>Description</strong></td><td data-v-4592df7e${_scopeId2}>A short description of the Open Finance service (e.g. <code data-v-4592df7e${_scopeId2}>Open Finance APIs for Demo Bank&#39;s retail customers</code>).</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Guidance")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Customer Friendly Server Name")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("A public-facing name that reflects the brand this API Hub supports (e.g. "),
                            createVNode("code", null, "Acme Bank Retail"),
                            createTextVNode(" or "),
                            createVNode("code", null, "Acme Bank Business"),
                            createTextVNode("). If your institution operates multiple API Hubs for different brands, each MUST have a distinct name.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Issuer")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "issuer"),
                            createTextVNode(" value from your API Hub's well-known discovery document, obtained in Step 1.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Description")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("A short description of the Open Finance service (e.g. "),
                            createVNode("code", null, "Open Finance APIs for Demo Bank's retail customers"),
                            createTextVNode(").")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images2 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images2 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-4592df7e${_scopeId}><h3 data-v-4592df7e${_scopeId}>Set the Account Type</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Indicate the account type(s) supported by this server:`);
                } else {
                  return [
                    createTextVNode("Indicate the account type(s) supported by this server:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-4592df7e${_scopeId2}><strong data-v-4592df7e${_scopeId2}>Retail</strong> — personal and individual customer accounts</li><li data-v-4592df7e${_scopeId2}><strong data-v-4592df7e${_scopeId2}>SME</strong> — small and medium enterprise accounts</li><li data-v-4592df7e${_scopeId2}><strong data-v-4592df7e${_scopeId2}>Corporate</strong> — corporate and institutional accounts</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Retail"),
                      createTextVNode(" — personal and individual customer accounts")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "SME"),
                      createTextVNode(" — small and medium enterprise accounts")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Corporate"),
                      createTextVNode(" — corporate and institutional accounts")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This allows TPPs to identify which server to use when requesting access to a specific category of accounts. `);
                } else {
                  return [
                    createTextVNode(" This allows TPPs to identify which server to use when requesting access to a specific category of accounts. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/raidiam/add-server/7.png",
              alt: "Account types selection"
            }, null, _parent2, _scopeId));
            _push2(`</li><li data-v-4592df7e${_scopeId}><h3 data-v-4592df7e${_scopeId}>Upload the Logo</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Upload a logo for this server entry. The logo MUST match the brand that this API Hub supports. `);
                } else {
                  return [
                    createTextVNode(" Upload a logo for this server entry. The logo MUST match the brand that this API Hub supports. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If your institution has multiple API Hubs (e.g. one for retail and one for business), each server MUST use the logo corresponding to its specific brand. This logo is displayed to TPPs and end users during consent and authorisation journeys. `);
                } else {
                  return [
                    createTextVNode(" If your institution has multiple API Hubs (e.g. one for retail and one for business), each server MUST use the logo corresponding to its specific brand. This logo is displayed to TPPs and end users during consent and authorisation journeys. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/raidiam/add-server/8.png",
              alt: "Logo upload"
            }, null, _parent2, _scopeId));
            _push2(`</li><li data-v-4592df7e${_scopeId}><h3 data-v-4592df7e${_scopeId}>Save the Server</h3><ol class="ed-doc__substeps" data-v-4592df7e${_scopeId}><li data-v-4592df7e${_scopeId}>Skip <strong data-v-4592df7e${_scopeId}>Additional Details</strong> and <strong data-v-4592df7e${_scopeId}>Server Validity</strong> sections.</li><li data-v-4592df7e${_scopeId}>Click <strong data-v-4592df7e${_scopeId}>Save</strong> to register the server.</li><li data-v-4592df7e${_scopeId}>Your Server now appears in the Server section of your Organisation.</li></ol>`);
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/raidiam/add-server/9.png",
              alt: "Server saved"
            }, null, _parent2, _scopeId));
            _push2(`</li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Finding your Authorisation Server ID"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-4592df7e${_scopeId2}> After creation, your Authorisation Server ID is visible on the server detail page. It is also discoverable to TPPs via the <a href="/tech/tpp-standards/trust-framework/api-discovery" data-v-4592df7e${_scopeId2}>API Discovery</a> process. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" After creation, your Authorisation Server ID is visible on the server detail page. It is also discoverable to TPPs via the "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery"),
                      createTextVNode(" process. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createVNode("h3", null, "Obtain Your Issuer"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Before creating the server entry, retrieve the "),
                      createVNode("code", null, "issuer"),
                      createTextVNode(" value from your API Hub's well-known discovery document. The discovery document URI is provided as part of your "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/" }, "environment-specific onboarding configuration"),
                      createTextVNode(". ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Open the discovery document URI in a browser or HTTP client and locate the "),
                      createVNode("code", null, "issuer"),
                      createTextVNode(" field. You will need this value in Step 3. ")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Navigate to your Organisation"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, "Sign in to the Trust Framework directory.")
                  ]),
                  createVNode(_component_EdNote, {
                    type: "warning",
                    title: "Environment Mapping"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, "Ensure you are creating the server in the correct Trust Framework environment:"),
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "Pre-production"),
                          createTextVNode(" API Hub → "),
                          createVNode("strong", null, "Sandbox"),
                          createTextVNode(" Trust Framework ("),
                          createVNode("code", null, "web.sandbox.directory.openfinance.ae"),
                          createTextVNode(")")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Production"),
                          createTextVNode(" API Hub → "),
                          createVNode("strong", null, "Production"),
                          createTextVNode(" Trust Framework ("),
                          createVNode("code", null, "web.directory.openfinance.ae"),
                          createTextVNode(")")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("ol", {
                    class: "ed-doc__substeps",
                    start: "2"
                  }, [
                    createVNode("li", null, [
                      createTextVNode("Navigate to your "),
                      createVNode("strong", null, "Organisation"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Open the "),
                      createVNode("strong", null, "Auth Servers"),
                      createTextVNode(" section.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "+ New Server"),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images1 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Provide the Server Details"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Fill in the required fields. These values are published in the directory and are visible to TPPs. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdRefTable, null, {
                    default: withCtx(() => [
                      createVNode("table", null, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", null, "Field"),
                            createVNode("th", null, "Guidance")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          createVNode("tr", null, [
                            createVNode("td", null, [
                              createVNode("strong", null, "Customer Friendly Server Name")
                            ]),
                            createVNode("td", null, [
                              createTextVNode("A public-facing name that reflects the brand this API Hub supports (e.g. "),
                              createVNode("code", null, "Acme Bank Retail"),
                              createTextVNode(" or "),
                              createVNode("code", null, "Acme Bank Business"),
                              createTextVNode("). If your institution operates multiple API Hubs for different brands, each MUST have a distinct name.")
                            ])
                          ]),
                          createVNode("tr", null, [
                            createVNode("td", null, [
                              createVNode("strong", null, "Issuer")
                            ]),
                            createVNode("td", null, [
                              createTextVNode("The "),
                              createVNode("code", null, "issuer"),
                              createTextVNode(" value from your API Hub's well-known discovery document, obtained in Step 1.")
                            ])
                          ]),
                          createVNode("tr", null, [
                            createVNode("td", null, [
                              createVNode("strong", null, "Description")
                            ]),
                            createVNode("td", null, [
                              createTextVNode("A short description of the Open Finance service (e.g. "),
                              createVNode("code", null, "Open Finance APIs for Demo Bank's retail customers"),
                              createTextVNode(").")
                            ])
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images2 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Set the Account Type"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode("Indicate the account type(s) supported by this server:")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdBullets, null, {
                    default: withCtx(() => [
                      createVNode("li", null, [
                        createVNode("strong", null, "Retail"),
                        createTextVNode(" — personal and individual customer accounts")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "SME"),
                        createTextVNode(" — small and medium enterprise accounts")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Corporate"),
                        createTextVNode(" — corporate and institutional accounts")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" This allows TPPs to identify which server to use when requesting access to a specific category of accounts. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ImageViewer, {
                    src: "/images/raidiam/add-server/7.png",
                    alt: "Account types selection"
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Upload the Logo"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Upload a logo for this server entry. The logo MUST match the brand that this API Hub supports. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" If your institution has multiple API Hubs (e.g. one for retail and one for business), each server MUST use the logo corresponding to its specific brand. This logo is displayed to TPPs and end users during consent and authorisation journeys. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ImageViewer, {
                    src: "/images/raidiam/add-server/8.png",
                    alt: "Logo upload"
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Save the Server"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Skip "),
                      createVNode("strong", null, "Additional Details"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "Server Validity"),
                      createTextVNode(" sections.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "Save"),
                      createTextVNode(" to register the server.")
                    ]),
                    createVNode("li", null, "Your Server now appears in the Server section of your Organisation.")
                  ]),
                  createVNode(_component_ImageViewer, {
                    src: "/images/raidiam/add-server/9.png",
                    alt: "Server saved"
                  })
                ])
              ]),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Finding your Authorisation Server ID"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" After creation, your Authorisation Server ID is visible on the server detail page. It is also discoverable to TPPs via the "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery"),
                    createTextVNode(" process. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="ed-doc__contents" data-v-4592df7e><div class="ed-doc__inner" data-v-4592df7e><div class="ed-doc__contents-head" data-v-4592df7e><div class="ed-doc__contents-eyebrow" data-v-4592df7e><span class="ed-doc__eyebrow-dash" data-v-4592df7e></span> Next Steps </div><h2 class="ed-doc__contents-title" data-v-4592df7e>Add API resources to your server</h2><p class="ed-doc__contents-sub" data-v-4592df7e>With your server published, describe the APIs your institution exposes by registering API resources.</p></div><div class="ed-doc__contents-grid" data-v-4592df7e><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/" style="${ssrRenderStyle({ "--card-color": "var(--at-teal)" })}" data-v-4592df7e><span class="ed-link-card__top" data-v-4592df7e></span><div class="ed-link-card__meta" data-v-4592df7e><span class="ed-link-card__cat" data-v-4592df7e>Sub-section</span></div><h3 class="ed-link-card__title" data-v-4592df7e>API Resources — Overview</h3><p class="ed-link-card__desc" data-v-4592df7e>What API resources are, how they relate to API families, and how they tie into your server entry.</p><div class="ed-link-card__foot" data-v-4592df7e><span class="ed-link-card__cta" data-v-4592df7e>Open</span><span class="ed-link-card__arrow" data-v-4592df7e>→</span></div></a><a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/creating" style="${ssrRenderStyle({ "--card-color": "var(--at-gold, #b08800)" })}" data-v-4592df7e><span class="ed-link-card__top" data-v-4592df7e></span><div class="ed-link-card__meta" data-v-4592df7e><span class="ed-link-card__cat" data-v-4592df7e>Walkthrough</span></div><h3 class="ed-link-card__title" data-v-4592df7e>Creating an API Resource</h3><p class="ed-link-card__desc" data-v-4592df7e>Step-by-step walkthrough of registering an API family on your server.</p><div class="ed-link-card__foot" data-v-4592df7e><span class="ed-link-card__cta" data-v-4592df7e>Open</span><span class="ed-link-card__arrow" data-v-4592df7e>→</span></div></a></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/servers/creating.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const creating = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4592df7e"]]);
export {
  creating as default
};
