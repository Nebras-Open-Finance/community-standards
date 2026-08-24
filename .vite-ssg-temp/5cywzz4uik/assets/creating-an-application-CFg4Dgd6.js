import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
  __name: "creating-an-application",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/add-application/click-org.png", import.meta.url).href, alt: "Step 1", title: "Click into your organisation" },
      { src: new URL("/images/raidiam/add-application/click-app.png", import.meta.url).href, alt: "Step 2", title: "Click into applications" },
      { src: new URL("/images/raidiam/add-application/new-app.png", import.meta.url).href, alt: "Step 3", title: "Click + New Application" }
    ];
    const images2 = [
      { src: new URL("/images/raidiam/add-application/role.png", import.meta.url).href, alt: "Step 4", title: "Select the roles of the Application", tagline: "Note roles that can be selected for an Application are inherited from the organisation." }
    ];
    const images3 = [
      { src: new URL("/images/raidiam/add-application/client.png", import.meta.url).href, alt: "Step 5", title: "Provide the details of the client", tagline: "Client Name, Client Logo & Software Version & Federation Entity Management Type" }
    ];
    const images4 = [
      { src: new URL("/images/raidiam/add-application/auth.png", import.meta.url).href, alt: "Step 6", title: "Provide user authentication details", tagline: 'More information on <a href="/tech/tpp-standards/trust-framework/redirect-uri/">Redirect URIs</a>' }
    ];
    const images5 = [
      { src: new URL("/images/raidiam/add-application/webhook.png", import.meta.url).href, alt: "Step 7", title: "Optional add an API Webhook URI", tagline: "Note the Client ID, as it will be required for all requests made by this client." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdProse = __unplugin_components_4;
      const _component_ImageViewer = ImageViewer;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-ac90483c><section class="ed-doc__hero" data-v-ac90483c><div class="ed-doc__inner" data-v-ac90483c><div class="ed-doc__eyebrow" data-v-ac90483c><span class="ed-doc__eyebrow-dash" data-v-ac90483c></span> TPP · Trust Framework · Applications </div><h1 class="ed-doc__title" data-v-ac90483c> Creating an Application <span class="ed-doc__read" data-v-ac90483c>3 min read</span></h1><p class="ed-doc__lede" data-v-ac90483c> Step-by-step walkthrough for creating a new Application in the Trust Framework Directory. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "walkthrough",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Walkthrough",
        title: "From + New Application to a registered Client ID",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__steps" data-v-ac90483c${_scopeId}><li data-v-ac90483c${_scopeId}><h3 data-v-ac90483c${_scopeId}>Navigate to &#39;+ New Application&#39;</h3><ol class="ed-doc__substeps" data-v-ac90483c${_scopeId}><li data-v-ac90483c${_scopeId}>Navigate to your organisation.</li><li data-v-ac90483c${_scopeId}>Open the <strong data-v-ac90483c${_scopeId}>Applications</strong> section.</li><li data-v-ac90483c${_scopeId}>Click <strong data-v-ac90483c${_scopeId}>+ New Application</strong>.</li></ol>`);
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
            _push2(`</li><li data-v-ac90483c${_scopeId}><h3 data-v-ac90483c${_scopeId}>Select the application roles</h3><ol class="ed-doc__substeps" data-v-ac90483c${_scopeId}><li data-v-ac90483c${_scopeId}>Select the roles for your application. Roles define what the application is permitted to do. You can assign multiple roles, but only roles that are already assigned to your organisation are available for selection.</li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Choose roles carefully — they can't be changed later"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ac90483c${_scopeId2}> The roles you select here determine what this application is permitted to do. Once the application has been <strong data-v-ac90483c${_scopeId2}>registered with an LFI</strong>, editing its roles in the Trust Framework has no effect. If the roles later need to change, you must disable the existing application, create a new one with the correct roles, and register it again. Make sure the selected roles (<code data-v-ac90483c${_scopeId2}>BSIP</code>, <code data-v-ac90483c${_scopeId2}>BDSP</code>, <code data-v-ac90483c${_scopeId2}>ISP</code>) match the app&#39;s intended functionality before continuing. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The roles you select here determine what this application is permitted to do. Once the application has been "),
                      createVNode("strong", null, "registered with an LFI"),
                      createTextVNode(", editing its roles in the Trust Framework has no effect. If the roles later need to change, you must disable the existing application, create a new one with the correct roles, and register it again. Make sure the selected roles ("),
                      createVNode("code", null, "BSIP"),
                      createTextVNode(", "),
                      createVNode("code", null, "BDSP"),
                      createTextVNode(", "),
                      createVNode("code", null, "ISP"),
                      createTextVNode(") match the app's intended functionality before continuing. ")
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
            _push2(`</li><li data-v-ac90483c${_scopeId}><h3 data-v-ac90483c${_scopeId}>Provide the Client Details</h3><ol class="ed-doc__substeps" data-v-ac90483c${_scopeId}><li data-v-ac90483c${_scopeId}><strong data-v-ac90483c${_scopeId}>Client Name</strong> — enter a clear, human-readable name that identifies this application (e.g. <code data-v-ac90483c${_scopeId}>My TPP – Production</code>). This name may be visible to users during consent flows.</li><li data-v-ac90483c${_scopeId}><strong data-v-ac90483c${_scopeId}>Software Version</strong> — enter the version of your software (e.g. <code data-v-ac90483c${_scopeId}>1.0.0</code>). Use a consistent versioning scheme so you can distinguish between releases in the directory.</li><li data-v-ac90483c${_scopeId}><strong data-v-ac90483c${_scopeId}>Logo</strong> — upload a clear, recognisable logo. This image is shown to users on the redirect screen when returning from an LFI, so it should accurately represent the application to a User.</li><li data-v-ac90483c${_scopeId}><strong data-v-ac90483c${_scopeId}>Federation</strong> — we recommend setting <strong data-v-ac90483c${_scopeId}>Federation</strong> to <strong data-v-ac90483c${_scopeId}>Enabled</strong> and <strong data-v-ac90483c${_scopeId}>Federation Entity Management Type</strong> to <strong data-v-ac90483c${_scopeId}>Managed</strong>. This allows the Trust Framework to automatically publish and maintain your application&#39;s federation metadata, so LFIs can discover and validate your client without manual configuration.</li></ol>`);
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
            _push2(`</li><li data-v-ac90483c${_scopeId}><h3 data-v-ac90483c${_scopeId}>Provide the Redirect URI</h3><ol class="ed-doc__substeps" data-v-ac90483c${_scopeId}><li data-v-ac90483c${_scopeId}> Enter the <strong data-v-ac90483c${_scopeId}>Redirect URI</strong> — the HTTPS endpoint(s) in your application that the LFI will redirect the user back to after authentication or authorisation. The <code data-v-ac90483c${_scopeId}>redirect_uri</code> sent in the <a href="/tech/tpp-standards/security/fapi/request-jwt#payload-claims" data-v-ac90483c${_scopeId}>PAR request</a> must exactly match one of the values registered here. </li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, { type: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ac90483c${_scopeId2}> You can register multiple redirect URIs if your application requires them (e.g. separate URIs for different environments). See <a href="/tech/tpp-standards/trust-framework/redirect-uri" data-v-ac90483c${_scopeId2}>Redirect URIs</a> for full guidance. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" You can register multiple redirect URIs if your application requires them (e.g. separate URIs for different environments). See "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/redirect-uri" }, "Redirect URIs"),
                      createTextVNode(" for full guidance. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images4 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images4 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-ac90483c${_scopeId}><h3 data-v-ac90483c${_scopeId}>Add Webhook URIs (optional)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If your application will receive event notifications via webhooks (e.g. consent or payment status updates), enter one or more <strong data-v-ac90483c${_scopeId2}>API Webhook URIs</strong>. These work in the same way as redirect URIs — multiple values are allowed, and the <code data-v-ac90483c${_scopeId2}>subscription.Webhook.Url</code> in each consent must exactly match one of the values registered here. If you are not using webhooks, leave this field blank. See <a href="/tech/tpp-standards/v2.1/webhooks/" data-v-ac90483c${_scopeId2}>Webhooks</a> for full guidance. `);
                } else {
                  return [
                    createTextVNode(" If your application will receive event notifications via webhooks (e.g. consent or payment status updates), enter one or more "),
                    createVNode("strong", null, "API Webhook URIs"),
                    createTextVNode(". These work in the same way as redirect URIs — multiple values are allowed, and the "),
                    createVNode("code", null, "subscription.Webhook.Url"),
                    createTextVNode(" in each consent must exactly match one of the values registered here. If you are not using webhooks, leave this field blank. See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/" }, "Webhooks"),
                    createTextVNode(" for full guidance. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images5 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images5 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-ac90483c${_scopeId}><h3 data-v-ac90483c${_scopeId}>Finish creating the application</h3><ol class="ed-doc__substeps" data-v-ac90483c${_scopeId}><li data-v-ac90483c${_scopeId}>Click through to <strong data-v-ac90483c${_scopeId}>Create</strong> and register the application.</li></ol></li></ol>`);
          } else {
            return [
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createVNode("h3", null, "Navigate to '+ New Application'"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, "Navigate to your organisation."),
                    createVNode("li", null, [
                      createTextVNode("Open the "),
                      createVNode("strong", null, "Applications"),
                      createTextVNode(" section.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Click "),
                      createVNode("strong", null, "+ New Application"),
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
                  createVNode("h3", null, "Select the application roles"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, "Select the roles for your application. Roles define what the application is permitted to do. You can assign multiple roles, but only roles that are already assigned to your organisation are available for selection.")
                  ]),
                  createVNode(_component_EdNote, {
                    type: "warning",
                    title: "Choose roles carefully — they can't be changed later"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode(" The roles you select here determine what this application is permitted to do. Once the application has been "),
                        createVNode("strong", null, "registered with an LFI"),
                        createTextVNode(", editing its roles in the Trust Framework has no effect. If the roles later need to change, you must disable the existing application, create a new one with the correct roles, and register it again. Make sure the selected roles ("),
                        createVNode("code", null, "BSIP"),
                        createTextVNode(", "),
                        createVNode("code", null, "BDSP"),
                        createTextVNode(", "),
                        createVNode("code", null, "ISP"),
                        createTextVNode(") match the app's intended functionality before continuing. ")
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
                  createVNode("h3", null, "Provide the Client Details"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createVNode("strong", null, "Client Name"),
                      createTextVNode(" — enter a clear, human-readable name that identifies this application (e.g. "),
                      createVNode("code", null, "My TPP – Production"),
                      createTextVNode("). This name may be visible to users during consent flows.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Software Version"),
                      createTextVNode(" — enter the version of your software (e.g. "),
                      createVNode("code", null, "1.0.0"),
                      createTextVNode("). Use a consistent versioning scheme so you can distinguish between releases in the directory.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Logo"),
                      createTextVNode(" — upload a clear, recognisable logo. This image is shown to users on the redirect screen when returning from an LFI, so it should accurately represent the application to a User.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Federation"),
                      createTextVNode(" — we recommend setting "),
                      createVNode("strong", null, "Federation"),
                      createTextVNode(" to "),
                      createVNode("strong", null, "Enabled"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "Federation Entity Management Type"),
                      createTextVNode(" to "),
                      createVNode("strong", null, "Managed"),
                      createTextVNode(". This allows the Trust Framework to automatically publish and maintain your application's federation metadata, so LFIs can discover and validate your client without manual configuration.")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images3 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Provide the Redirect URI"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode(" Enter the "),
                      createVNode("strong", null, "Redirect URI"),
                      createTextVNode(" — the HTTPS endpoint(s) in your application that the LFI will redirect the user back to after authentication or authorisation. The "),
                      createVNode("code", null, "redirect_uri"),
                      createTextVNode(" sent in the "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt#payload-claims" }, "PAR request"),
                      createTextVNode(" must exactly match one of the values registered here. ")
                    ])
                  ]),
                  createVNode(_component_EdNote, { type: "info" }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode(" You can register multiple redirect URIs if your application requires them (e.g. separate URIs for different environments). See "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/redirect-uri" }, "Redirect URIs"),
                        createTextVNode(" for full guidance. ")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images4 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Add Webhook URIs (optional)"),
                  createVNode(_component_EdProse, null, {
                    default: withCtx(() => [
                      createTextVNode(" If your application will receive event notifications via webhooks (e.g. consent or payment status updates), enter one or more "),
                      createVNode("strong", null, "API Webhook URIs"),
                      createTextVNode(". These work in the same way as redirect URIs — multiple values are allowed, and the "),
                      createVNode("code", null, "subscription.Webhook.Url"),
                      createTextVNode(" in each consent must exactly match one of the values registered here. If you are not using webhooks, leave this field blank. See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/" }, "Webhooks"),
                      createTextVNode(" for full guidance. ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images5 })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", null, [
                  createVNode("h3", null, "Finish creating the application"),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Click through to "),
                      createVNode("strong", null, "Create"),
                      createTextVNode(" and register the application.")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "your-client-id",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Your Client ID",
        title: "The UUID assigned when the application is created",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once your application is created, the Trust Framework assigns it a <strong data-v-ac90483c${_scopeId2}>Client ID</strong> — a UUID that permanently identifies this application. You will use this value as <code data-v-ac90483c${_scopeId2}>client_id</code>, <code data-v-ac90483c${_scopeId2}>iss</code>, and <code data-v-ac90483c${_scopeId2}>sub</code> in every JWT you sign, including Client Assertions and Request JWTs. Keep a note of it. `);
                } else {
                  return [
                    createTextVNode(" Once your application is created, the Trust Framework assigns it a "),
                    createVNode("strong", null, "Client ID"),
                    createTextVNode(" — a UUID that permanently identifies this application. You will use this value as "),
                    createVNode("code", null, "client_id"),
                    createTextVNode(", "),
                    createVNode("code", null, "iss"),
                    createTextVNode(", and "),
                    createVNode("code", null, "sub"),
                    createTextVNode(" in every JWT you sign, including Client Assertions and Request JWTs. Keep a note of it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ImageViewer, {
              src: "/images/raidiam/client_id_spotlight.png",
              alt: "Client ID location in the Trust Framework application detail page"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Where to find it later"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ac90483c${_scopeId2}> Your Client ID is always visible on the application detail page in the Trust Framework Directory. If you need to retrieve it again, navigate to your Organisation → Applications → select the application. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Your Client ID is always visible on the application detail page in the Trust Framework Directory. If you need to retrieve it again, navigate to your Organisation → Applications → select the application. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once your application is created, the Trust Framework assigns it a "),
                  createVNode("strong", null, "Client ID"),
                  createTextVNode(" — a UUID that permanently identifies this application. You will use this value as "),
                  createVNode("code", null, "client_id"),
                  createTextVNode(", "),
                  createVNode("code", null, "iss"),
                  createTextVNode(", and "),
                  createVNode("code", null, "sub"),
                  createTextVNode(" in every JWT you sign, including Client Assertions and Request JWTs. Keep a note of it. ")
                ]),
                _: 1
              }),
              createVNode(_component_ImageViewer, {
                src: "/images/raidiam/client_id_spotlight.png",
                alt: "Client ID location in the Trust Framework application detail page"
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Where to find it later"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Your Client ID is always visible on the application detail page in the Trust Framework Directory. If you need to retrieve it again, navigate to your Organisation → Applications → select the application. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/creating-an-application.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const creatingAnApplication = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ac90483c"]]);
export {
  creatingAnApplication as default
};
