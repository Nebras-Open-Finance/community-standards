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
  __name: "creating-c3-application",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/add-application/click-org.png", import.meta.url).href, alt: "Step 1", title: "Click into your organisation" },
      { src: new URL("/images/raidiam/add-application/click-app.png", import.meta.url).href, alt: "Step 2", title: "Click into applications" },
      { src: new URL("/images/raidiam/add-application/new-app.png", import.meta.url).href, alt: "Step 3", title: "Click + New Application" }
    ];
    const images2 = [
      { src: new URL("/images/raidiam/add-application/lfi-role.png", import.meta.url).href, alt: "Step 4", title: "Select the LFI role", tagline: "Assign the LFI role only. Roles available are inherited from the organisation." }
    ];
    const images3 = [
      { src: new URL("/images/raidiam/add-application/client.png", import.meta.url).href, alt: "Step 5", title: "Provide the details of the client", tagline: "Client Name, Client Logo & Software Version & Federation Entity Management Type" }
    ];
    const images4 = [
      { src: new URL("/images/raidiam/add-application/auth.png", import.meta.url).href, alt: "Step 6", title: "Provide a redirect URI", tagline: "A value is required but will not be used — any valid HTTPS URI is acceptable." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdProse = __unplugin_components_4;
      const _component_ImageViewer = ImageViewer;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c49cb7c0><section class="ed-doc__hero" data-v-c49cb7c0><div class="ed-doc__inner" data-v-c49cb7c0><div class="ed-doc__eyebrow" data-v-c49cb7c0><span class="ed-doc__eyebrow-dash" data-v-c49cb7c0></span> LFI · Trust Framework · Applications </div><h1 class="ed-doc__title" data-v-c49cb7c0> Creating the C3-hh-cm-client Application <span class="ed-doc__read" data-v-c49cb7c0>2 min read</span></h1><p class="ed-doc__lede" data-v-c49cb7c0> The C3-hh-cm-client is the LFI-side application used to make requests to the API Hub. This walkthrough covers creating that application in the Trust Framework Directory. </p></div></section>`);
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
            _push2(`<ol class="ed-doc__steps" data-v-c49cb7c0${_scopeId}><li data-v-c49cb7c0${_scopeId}><h3 data-v-c49cb7c0${_scopeId}>Navigate to &#39;+ New Application&#39;</h3><ol class="ed-doc__substeps" data-v-c49cb7c0${_scopeId}><li data-v-c49cb7c0${_scopeId}>Navigate to your organisation.</li><li data-v-c49cb7c0${_scopeId}>Open the <strong data-v-c49cb7c0${_scopeId}>Applications</strong> section.</li><li data-v-c49cb7c0${_scopeId}>Click <strong data-v-c49cb7c0${_scopeId}>+ New Application</strong>.</li></ol>`);
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
            _push2(`</li><li data-v-c49cb7c0${_scopeId}><h3 data-v-c49cb7c0${_scopeId}>Select the application roles</h3>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "LFI role only"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c49cb7c0${_scopeId2}>Assign the <strong data-v-c49cb7c0${_scopeId2}>LFI role only</strong> to this client. It must not be assigned any TPP roles.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Assign the "),
                      createVNode("strong", null, "LFI role only"),
                      createTextVNode(" to this client. It must not be assigned any TPP roles.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__substeps" data-v-c49cb7c0${_scopeId}><li data-v-c49cb7c0${_scopeId}>Select the <strong data-v-c49cb7c0${_scopeId}>LFI role</strong>. This client is used solely to make requests to the API Hub on behalf of your LFI and must not be assigned TPP roles.</li></ol>`);
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
            _push2(`</li><li data-v-c49cb7c0${_scopeId}><h3 data-v-c49cb7c0${_scopeId}>Provide the Client Details</h3><ol class="ed-doc__substeps" data-v-c49cb7c0${_scopeId}><li data-v-c49cb7c0${_scopeId}><strong data-v-c49cb7c0${_scopeId}>Client Name</strong> — enter a clear name that identifies this client as your C3-hh-cm-client (e.g. <code data-v-c49cb7c0${_scopeId}>C3-hh-cm-client</code>).</li><li data-v-c49cb7c0${_scopeId}><strong data-v-c49cb7c0${_scopeId}>Software Version</strong> — enter a version for your software (e.g. <code data-v-c49cb7c0${_scopeId}>1.0.0</code>).</li><li data-v-c49cb7c0${_scopeId}><strong data-v-c49cb7c0${_scopeId}>Logo</strong> — a logo is required by the form. Because this client is never used in a user-facing redirect flow, the logo will not be displayed to end users; any valid image will suffice.</li><li data-v-c49cb7c0${_scopeId}><strong data-v-c49cb7c0${_scopeId}>Federation</strong> — we recommend setting <strong data-v-c49cb7c0${_scopeId}>Federation</strong> to <strong data-v-c49cb7c0${_scopeId}>Enabled</strong> and <strong data-v-c49cb7c0${_scopeId}>Federation Entity Management Type</strong> to <strong data-v-c49cb7c0${_scopeId}>Managed</strong>. This allows the Trust Framework to automatically publish and maintain your application&#39;s federation metadata, so the API Hub can discover and validate your client without manual configuration.</li></ol>`);
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
            _push2(`</li><li data-v-c49cb7c0${_scopeId}><h3 data-v-c49cb7c0${_scopeId}>Provide the Redirect URI</h3><ol class="ed-doc__substeps" data-v-c49cb7c0${_scopeId}><li data-v-c49cb7c0${_scopeId}>A redirect URI is required by the form. Because this client is never used in an authorisation flow with an end user, it will not be called; any valid HTTPS URI will suffice (e.g. <code data-v-c49cb7c0${_scopeId}>https://localhost/callback</code>).</li></ol>`);
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
            _push2(`</li><li data-v-c49cb7c0${_scopeId}><h3 data-v-c49cb7c0${_scopeId}>Finish creating the application</h3><ol class="ed-doc__substeps" data-v-c49cb7c0${_scopeId}><li data-v-c49cb7c0${_scopeId}>Click through to <strong data-v-c49cb7c0${_scopeId}>Create</strong> and register the application.</li></ol></li></ol>`);
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
                  createVNode(_component_EdNote, {
                    type: "danger",
                    title: "LFI role only"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", null, [
                        createTextVNode("Assign the "),
                        createVNode("strong", null, "LFI role only"),
                        createTextVNode(" to this client. It must not be assigned any TPP roles.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("ol", { class: "ed-doc__substeps" }, [
                    createVNode("li", null, [
                      createTextVNode("Select the "),
                      createVNode("strong", null, "LFI role"),
                      createTextVNode(". This client is used solely to make requests to the API Hub on behalf of your LFI and must not be assigned TPP roles.")
                    ])
                  ]),
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
                      createTextVNode(" — enter a clear name that identifies this client as your C3-hh-cm-client (e.g. "),
                      createVNode("code", null, "C3-hh-cm-client"),
                      createTextVNode(").")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Software Version"),
                      createTextVNode(" — enter a version for your software (e.g. "),
                      createVNode("code", null, "1.0.0"),
                      createTextVNode(").")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Logo"),
                      createTextVNode(" — a logo is required by the form. Because this client is never used in a user-facing redirect flow, the logo will not be displayed to end users; any valid image will suffice.")
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
                      createTextVNode(". This allows the Trust Framework to automatically publish and maintain your application's federation metadata, so the API Hub can discover and validate your client without manual configuration.")
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
                      createTextVNode("A redirect URI is required by the form. Because this client is never used in an authorisation flow with an end user, it will not be called; any valid HTTPS URI will suffice (e.g. "),
                      createVNode("code", null, "https://localhost/callback"),
                      createTextVNode(").")
                    ])
                  ]),
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(_component_Carousel, { images: images4 })
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
                  _push3(` Once your application is created, the Trust Framework assigns it a <strong data-v-c49cb7c0${_scopeId2}>Client ID</strong> — a UUID that permanently identifies this application. You will use this value as <code data-v-c49cb7c0${_scopeId2}>client_id</code>, <code data-v-c49cb7c0${_scopeId2}>iss</code>, and <code data-v-c49cb7c0${_scopeId2}>sub</code> in every JWT — keep a note of it. `);
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
                    createTextVNode(" in every JWT — keep a note of it. ")
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
                  _push3(`<p data-v-c49cb7c0${_scopeId2}> Your Client ID is always visible on the application detail page in the Trust Framework Directory. If you need to retrieve it again, navigate to your Organisation → Applications → select the application. </p>`);
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
                  createTextVNode(" in every JWT — keep a note of it. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/creating-c3-application.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const creatingC3Application = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c49cb7c0"]]);
export {
  creatingC3Application as default
};
