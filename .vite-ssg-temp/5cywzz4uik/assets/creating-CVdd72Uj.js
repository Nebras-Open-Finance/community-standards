import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
      { src: new URL("/images/raidiam/add-api/1.png", import.meta.url).href, alt: "Step 1", title: "Click into your organisation" },
      { src: new URL("/images/raidiam/add-api/2.png", import.meta.url).href, alt: "Step 2", title: "Click into Servers" },
      { src: new URL("/images/raidiam/add-api/3.png", import.meta.url).href, alt: "Step 3", title: "Click into the Server we are adding the APIs to" },
      { src: new URL("/images/raidiam/add-api/4.png", import.meta.url).href, alt: "Step 4", title: "Click API Resources" },
      { src: new URL("/images/raidiam/add-api/5.png", import.meta.url).href, alt: "Step 5", title: "Click + New API Resource" }
    ];
    const images2 = [
      { src: new URL("/images/raidiam/add-api/6.png", import.meta.url).href, alt: "Step 1", title: "Select API Family" },
      { src: new URL("/images/raidiam/add-api/7.png", import.meta.url).href, alt: "Step 2", title: "Set API Version" },
      { src: new URL("/images/raidiam/add-api/8.png", import.meta.url).href, alt: "Step 3", title: "Click Save — the resource appears in Active API Resources" }
    ];
    const images3 = [
      { src: new URL("/images/raidiam/add-api/10.png", import.meta.url).href, alt: "Step 1", title: "Click the actions menu and select Add API Discovery Endpoints" },
      { src: new URL("/images/raidiam/add-api/11.png", import.meta.url).href, alt: "Step 2", title: "Enter the API Base URL and click Generate Endpoints" },
      { src: new URL("/images/raidiam/add-api/12.png", import.meta.url).href, alt: "Step 3", title: "API Base URL format — https://rs1.{LFICODE}.apihub.openfinance.ae" },
      { src: new URL("/images/raidiam/add-api/14.png", import.meta.url).href, alt: "Step 4", title: "Tick all supported endpoints | the example shown is v2.1 account-information with all endpoints ticked" },
      { src: new URL("/images/raidiam/add-api/13.png", import.meta.url).href, alt: "Step 5", title: "Confirm all endpoints are correct and click Save" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-6c5dec34><section class="ed-doc__hero" data-v-6c5dec34><div class="ed-doc__inner" data-v-6c5dec34><div class="ed-doc__eyebrow" data-v-6c5dec34><span class="ed-doc__eyebrow-dash" data-v-6c5dec34></span> LFI · Trust Framework · Servers · API Resources </div><h1 class="ed-doc__title" data-v-6c5dec34> Creating an API Resource <span class="ed-doc__read" data-v-6c5dec34>3 min read</span></h1><p class="ed-doc__lede" data-v-6c5dec34> This walkthrough covers registering an API resource under your server. You must have a <a href="/tech/lfi-api-hub/trust-framework/servers/creating" data-v-6c5dec34>server already created</a> before following these steps. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "walkthrough",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Walkthrough",
        title: "Register an API family on your server",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__steps" data-v-6c5dec34${_scopeId}><li data-v-6c5dec34${_scopeId}><h3 data-v-6c5dec34${_scopeId}>Navigate to your Authorisation Server</h3><ol class="ed-doc__substeps" data-v-6c5dec34${_scopeId}><li data-v-6c5dec34${_scopeId}>Sign in to the Trust Framework directory.</li><li data-v-6c5dec34${_scopeId}>Navigate to your <strong data-v-6c5dec34${_scopeId}>Organisation</strong>.</li><li data-v-6c5dec34${_scopeId}>Click into the Server we are adding the APIs to.</li><li data-v-6c5dec34${_scopeId}>Open the <strong data-v-6c5dec34${_scopeId}>API Resources</strong> section.</li><li data-v-6c5dec34${_scopeId}>Click <strong data-v-6c5dec34${_scopeId}>+ New API Resource</strong>.</li></ol>`);
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
            _push2(`</li><li data-v-6c5dec34${_scopeId}><h3 data-v-6c5dec34${_scopeId}>Create the API Resource</h3><ol class="ed-doc__substeps" data-v-6c5dec34${_scopeId}><li data-v-6c5dec34${_scopeId}> From the <strong data-v-6c5dec34${_scopeId}>API Family</strong> dropdown, select the family that corresponds to the API you are registering. The following API families are available: <ul data-v-6c5dec34${_scopeId}><li data-v-6c5dec34${_scopeId}><strong data-v-6c5dec34${_scopeId}>Account Information</strong> (<code data-v-6c5dec34${_scopeId}>account-information</code>) — banking data sharing</li><li data-v-6c5dec34${_scopeId}><strong data-v-6c5dec34${_scopeId}>Payment Initiation</strong> (<code data-v-6c5dec34${_scopeId}>payment</code>) — domestic single and multi-payments</li><li data-v-6c5dec34${_scopeId}><strong data-v-6c5dec34${_scopeId}>Confirmation of Payee</strong> (<code data-v-6c5dec34${_scopeId}>confirmation</code>) — payee name verification</li><li data-v-6c5dec34${_scopeId}><strong data-v-6c5dec34${_scopeId}>ATM</strong> (<code data-v-6c5dec34${_scopeId}>atm</code>) — ATM location data</li><li data-v-6c5dec34${_scopeId}><strong data-v-6c5dec34${_scopeId}>Products &amp; Leads</strong> (<code data-v-6c5dec34${_scopeId}>product</code>) — product catalogue and lead generation</li></ul> For full details on what each family contains, including the endpoints and their mappings, see the <a href="/tech/lfi-api-hub/trust-framework/servers/api/" data-v-6c5dec34${_scopeId}>API Resources Overview</a>. </li><li data-v-6c5dec34${_scopeId}>Set the <strong data-v-6c5dec34${_scopeId}>API Version</strong> (e.g. <code data-v-6c5dec34${_scopeId}>2.1</code>).</li><li data-v-6c5dec34${_scopeId}>Click <strong data-v-6c5dec34${_scopeId}>Save</strong>. The resource now appears in your <strong data-v-6c5dec34${_scopeId}>Active API Resources</strong> list.</li></ol>`);
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
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If your institution offers multiple API families (e.g. both data sharing and payment initiation), repeat Steps 1–2 for each family. Each family MUST be registered as a separate API resource. `);
                } else {
                  return [
                    createTextVNode(" If your institution offers multiple API families (e.g. both data sharing and payment initiation), repeat Steps 1–2 for each family. Each family MUST be registered as a separate API resource. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-6c5dec34${_scopeId}><h3 data-v-6c5dec34${_scopeId}>Add API Discovery Endpoints</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once your API resource is saved, you MUST add the discovery endpoints so that TPPs can discover and call your APIs. `);
                } else {
                  return [
                    createTextVNode(" Once your API resource is saved, you MUST add the discovery endpoints so that TPPs can discover and call your APIs. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__substeps" data-v-6c5dec34${_scopeId}><li data-v-6c5dec34${_scopeId}>Click the actions menu on the API resource and select <strong data-v-6c5dec34${_scopeId}>+ Add API Discovery Endpoints</strong>.</li><li data-v-6c5dec34${_scopeId}> Enter the <strong data-v-6c5dec34${_scopeId}>API Base URL</strong>. The format is always your API Hub resource server: `);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-6c5dec34${_scopeId2}><thead data-v-6c5dec34${_scopeId2}><tr data-v-6c5dec34${_scopeId2}><th data-v-6c5dec34${_scopeId2}>Environment</th><th data-v-6c5dec34${_scopeId2}>Base URL</th></tr></thead><tbody data-v-6c5dec34${_scopeId2}><tr data-v-6c5dec34${_scopeId2}><td data-v-6c5dec34${_scopeId2}>Pre-production</td><td data-v-6c5dec34${_scopeId2}><code data-v-6c5dec34${_scopeId2}>https://rs1.{lfiCode}.preprod.apihub.openfinance.ae</code></td></tr><tr data-v-6c5dec34${_scopeId2}><td data-v-6c5dec34${_scopeId2}>Production</td><td data-v-6c5dec34${_scopeId2}><code data-v-6c5dec34${_scopeId2}>https://rs1.{lfiCode}.apihub.openfinance.ae</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Environment"),
                          createVNode("th", null, "Base URL")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Pre-production"),
                          createVNode("td", null, [
                            createVNode("code", null, "https://rs1.{lfiCode}.preprod.apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Production"),
                          createVNode("td", null, [
                            createVNode("code", null, "https://rs1.{lfiCode}.apihub.openfinance.ae")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` Replace <code data-v-6c5dec34${_scopeId}>{lfiCode}</code> with your institution&#39;s LFI code. </li><li data-v-6c5dec34${_scopeId}>Click <strong data-v-6c5dec34${_scopeId}>Generate Endpoints</strong>. The system will populate the list of available endpoints for this API family.</li><li data-v-6c5dec34${_scopeId}>Tick all the endpoints you support. Check all endpoints are correct, then click <strong data-v-6c5dec34${_scopeId}>Save</strong>.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "API Hub Default Endpoints"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-6c5dec34${_scopeId2}> Some endpoints are served directly by the API Hub and do not call your Ozone Connect server — for example, <code data-v-6c5dec34${_scopeId2}>/account-information/v2.1/account-access-consents</code>. These endpoints MUST always remain ticked. See the <a href="/tech/lfi-api-hub/trust-framework/servers/api/" data-v-6c5dec34${_scopeId2}>API Resources Overview</a> for which endpoints are marked as <strong data-v-6c5dec34${_scopeId2}>API Hub default</strong>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Some endpoints are served directly by the API Hub and do not call your Ozone Connect server — for example, "),
                      createVNode("code", null, "/account-information/v2.1/account-access-consents"),
                      createTextVNode(". These endpoints MUST always remain ticked. See the "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/api/" }, "API Resources Overview"),
                      createTextVNode(" for which endpoints are marked as "),
                      createVNode("strong", null, "API Hub default"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images3 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images3 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The endpoints are now published to your server entry in the Trust Framework. TPPs can discover them via the <a href="/tech/tpp-standards/trust-framework/api-discovery" data-v-6c5dec34${_scopeId2}>API Discovery</a> process. `);
                } else {
                  return [
                    createTextVNode(" The endpoints are now published to your server entry in the Trust Framework. TPPs can discover them via the "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery"),
                    createTextVNode(" process. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ol>`);
          } else {
            return [
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createVNode("h3", null, "Navigate to your Authorisation Server"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, "Sign in to the Trust Framework directory."),
                    createVNode("li", null, [
                      createTextVNode("Navigate to your "),
                      createVNode("strong", null, "Organisation"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, "Click into the Server we are adding the APIs to."),
                    createVNode("li", null, [
                      createTextVNode("Open the "),
                      createVNode("strong", null, "API Resources"),
                      createTextVNode(" section.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "+ New API Resource"),
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
                  createVNode("h3", null, "Create the API Resource"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode(" From the "),
                      createVNode("strong", null, "API Family"),
                      createTextVNode(" dropdown, select the family that corresponds to the API you are registering. The following API families are available: "),
                      createVNode("ul", null, [
                        createVNode("li", null, [
                          createVNode("strong", null, "Account Information"),
                          createTextVNode(" ("),
                          createVNode("code", null, "account-information"),
                          createTextVNode(") — banking data sharing")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Payment Initiation"),
                          createTextVNode(" ("),
                          createVNode("code", null, "payment"),
                          createTextVNode(") — domestic single and multi-payments")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Confirmation of Payee"),
                          createTextVNode(" ("),
                          createVNode("code", null, "confirmation"),
                          createTextVNode(") — payee name verification")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "ATM"),
                          createTextVNode(" ("),
                          createVNode("code", null, "atm"),
                          createTextVNode(") — ATM location data")
                        ]),
                        createVNode("li", null, [
                          createVNode("strong", null, "Products & Leads"),
                          createTextVNode(" ("),
                          createVNode("code", null, "product"),
                          createTextVNode(") — product catalogue and lead generation")
                        ])
                      ]),
                      createTextVNode(" For full details on what each family contains, including the endpoints and their mappings, see the "),
                      createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/api/" }, "API Resources Overview"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Set the "),
                      createVNode("strong", null, "API Version"),
                      createTextVNode(" (e.g. "),
                      createVNode("code", null, "2.1"),
                      createTextVNode(").")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "Save"),
                      createTextVNode(". The resource now appears in your "),
                      createVNode("strong", null, "Active API Resources"),
                      createTextVNode(" list.")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images2 })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" If your institution offers multiple API families (e.g. both data sharing and payment initiation), repeat Steps 1–2 for each family. Each family MUST be registered as a separate API resource. ")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Add API Discovery Endpoints"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" Once your API resource is saved, you MUST add the discovery endpoints so that TPPs can discover and call your APIs. ")
                    ]),
                    _: 1
                  }),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Click the actions menu on the API resource and select "),
                      createVNode("strong", null, "+ Add API Discovery Endpoints"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Enter the "),
                      createVNode("strong", null, "API Base URL"),
                      createTextVNode(". The format is always your API Hub resource server: "),
                      createVNode(_component_EdRefTable, null, {
                        default: withCtx(() => [
                          createVNode("table", null, [
                            createVNode("thead", null, [
                              createVNode("tr", null, [
                                createVNode("th", null, "Environment"),
                                createVNode("th", null, "Base URL")
                              ])
                            ]),
                            createVNode("tbody", null, [
                              createVNode("tr", null, [
                                createVNode("td", null, "Pre-production"),
                                createVNode("td", null, [
                                  createVNode("code", null, "https://rs1.{lfiCode}.preprod.apihub.openfinance.ae")
                                ])
                              ]),
                              createVNode("tr", null, [
                                createVNode("td", null, "Production"),
                                createVNode("td", null, [
                                  createVNode("code", null, "https://rs1.{lfiCode}.apihub.openfinance.ae")
                                ])
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createTextVNode(" Replace "),
                      createVNode("code", null, "{lfiCode}"),
                      createTextVNode(" with your institution's LFI code. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "Generate Endpoints"),
                      createTextVNode(". The system will populate the list of available endpoints for this API family.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Tick all the endpoints you support. Check all endpoints are correct, then click "),
                      createVNode("strong", null, "Save"),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode(_component_EdNote, {
                    type: "info",
                    title: "API Hub Default Endpoints"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode(" Some endpoints are served directly by the API Hub and do not call your Ozone Connect server — for example, "),
                        createVNode("code", null, "/account-information/v2.1/account-access-consents"),
                        createTextVNode(". These endpoints MUST always remain ticked. See the "),
                        createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/servers/api/" }, "API Resources Overview"),
                        createTextVNode(" for which endpoints are marked as "),
                        createVNode("strong", null, "API Hub default"),
                        createTextVNode(". ")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images3 })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" The endpoints are now published to your server entry in the Trust Framework. TPPs can discover them via the "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery"),
                      createTextVNode(" process. ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "verifying",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Verifying Registration",
        title: "Confirm the entry via the Trust Framework API",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You can verify that your API resource is correctly registered by calling the Trust Framework API: `);
                } else {
                  return [
                    createTextVNode(" You can verify that your API resource is correctly registered by calling the Trust Framework API: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<a href="/tech/lfi-api-hub/trust-framework/api/api-resources" class="endpoint" data-v-6c5dec34${_scopeId2}><span class="http-method http-method--get" data-v-6c5dec34${_scopeId2}>GET</span><code data-v-6c5dec34${_scopeId2}>/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources</code></a>`);
                } else {
                  return [
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/trust-framework/api/api-resources",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This returns the list of API resources associated with your authorisation server, as they would appear to a TPP querying the directory. `);
                } else {
                  return [
                    createTextVNode(" This returns the list of API resources associated with your authorisation server, as they would appear to a TPP querying the directory. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" You can verify that your API resource is correctly registered by calling the Trust Framework API: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/trust-framework/api/api-resources",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This returns the list of API resources associated with your authorisation server, as they would appear to a TPP querying the directory. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/servers/api/creating.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const creating = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c5dec34"]]);
export {
  creating as default
};
