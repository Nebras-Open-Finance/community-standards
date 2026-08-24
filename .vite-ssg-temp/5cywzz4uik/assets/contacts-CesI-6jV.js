import { _ as __unplugin_components_5 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contacts",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/add-contact/1.png", import.meta.url).href, alt: "Step 1", title: "Contacts Section" },
      { src: new URL("/images/raidiam/add-contact/2.png", import.meta.url).href, alt: "Step 2", title: "Add Contact" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-ddf232ea><section class="ed-doc__hero" data-v-ddf232ea><div class="ed-doc__inner" data-v-ddf232ea><div class="ed-doc__eyebrow" data-v-ddf232ea><span class="ed-doc__eyebrow-dash" data-v-ddf232ea></span> LFI · Trust Framework · Contacts </div><h1 class="ed-doc__title" data-v-ddf232ea> Contacts <span class="ed-doc__read" data-v-ddf232ea>2 min read</span></h1><p class="ed-doc__lede" data-v-ddf232ea> Organisation Contacts allow Organisations to register specific personnel contact information within the Trust Framework, ensuring that participants from other Organisations can easily reach the appropriate departments when needed. </p>`);
      _push(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-ddf232ea${_scopeId}>The contact details registered here are visible to other participants outside your organisation.</p>`);
          } else {
            return [
              createVNode("p", null, "The contact details registered here are visible to other participants outside your organisation.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "contact-types",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Contact Types",
        title: "Each contact must be assigned one of these categories",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-ddf232ea${_scopeId2}><thead data-v-ddf232ea${_scopeId2}><tr data-v-ddf232ea${_scopeId2}><th data-v-ddf232ea${_scopeId2}>Type</th><th data-v-ddf232ea${_scopeId2}>Purpose</th></tr></thead><tbody data-v-ddf232ea${_scopeId2}><tr data-v-ddf232ea${_scopeId2}><td data-v-ddf232ea${_scopeId2}><strong data-v-ddf232ea${_scopeId2}>Security</strong></td><td data-v-ddf232ea${_scopeId2}>Security incidents, vulnerability disclosures, and certificate issues</td></tr><tr data-v-ddf232ea${_scopeId2}><td data-v-ddf232ea${_scopeId2}><strong data-v-ddf232ea${_scopeId2}>Billing</strong></td><td data-v-ddf232ea${_scopeId2}>Commercial and billing enquiries</td></tr><tr data-v-ddf232ea${_scopeId2}><td data-v-ddf232ea${_scopeId2}><strong data-v-ddf232ea${_scopeId2}>Incident</strong></td><td data-v-ddf232ea${_scopeId2}>Operational incidents and service disruptions</td></tr><tr data-v-ddf232ea${_scopeId2}><td data-v-ddf232ea${_scopeId2}><strong data-v-ddf232ea${_scopeId2}>Technical</strong></td><td data-v-ddf232ea${_scopeId2}>Technical integration and API support</td></tr><tr data-v-ddf232ea${_scopeId2}><td data-v-ddf232ea${_scopeId2}><strong data-v-ddf232ea${_scopeId2}>Business</strong></td><td data-v-ddf232ea${_scopeId2}>General business and partnership enquiries</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Purpose")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Security")
                          ]),
                          createVNode("td", null, "Security incidents, vulnerability disclosures, and certificate issues")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Billing")
                          ]),
                          createVNode("td", null, "Commercial and billing enquiries")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Incident")
                          ]),
                          createVNode("td", null, "Operational incidents and service disruptions")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Technical")
                          ]),
                          createVNode("td", null, "Technical integration and API support")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Business")
                          ]),
                          createVNode("td", null, "General business and partnership enquiries")
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
                  _push3(` Each contact requires an <strong data-v-ddf232ea${_scopeId2}>email address</strong> and a <strong data-v-ddf232ea${_scopeId2}>phone number</strong>. `);
                } else {
                  return [
                    createTextVNode(" Each contact requires an "),
                    createVNode("strong", null, "email address"),
                    createTextVNode(" and a "),
                    createVNode("strong", null, "phone number"),
                    createTextVNode(". ")
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
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Purpose")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Security")
                        ]),
                        createVNode("td", null, "Security incidents, vulnerability disclosures, and certificate issues")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Billing")
                        ]),
                        createVNode("td", null, "Commercial and billing enquiries")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Incident")
                        ]),
                        createVNode("td", null, "Operational incidents and service disruptions")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Technical")
                        ]),
                        createVNode("td", null, "Technical integration and API support")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Business")
                        ]),
                        createVNode("td", null, "General business and partnership enquiries")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each contact requires an "),
                  createVNode("strong", null, "email address"),
                  createTextVNode(" and a "),
                  createVNode("strong", null, "phone number"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "adding",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Adding an Organisation Contact",
        title: "Step-by-step in the Trust Framework portal",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__substeps" data-v-ddf232ea${_scopeId}><li data-v-ddf232ea${_scopeId}>Log in to the Trust Framework and navigate to your organisation.</li><li data-v-ddf232ea${_scopeId}>Navigate to the <strong data-v-ddf232ea${_scopeId}>Contacts</strong> section of your organisation.</li><li data-v-ddf232ea${_scopeId}>Click <strong data-v-ddf232ea${_scopeId}>+ New Contact</strong>.</li><li data-v-ddf232ea${_scopeId}>Select the Contact Type and enter the email address and phone number of the contact.</li><li data-v-ddf232ea${_scopeId}>Save the contact.</li></ol>`);
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
          } else {
            return [
              createVNode("ol", { class: "ed-doc__substeps" }, [
                createVNode("li", null, "Log in to the Trust Framework and navigate to your organisation."),
                createVNode("li", null, [
                  createTextVNode("Navigate to the "),
                  createVNode("strong", null, "Contacts"),
                  createTextVNode(" section of your organisation.")
                ]),
                createVNode("li", null, [
                  createTextVNode("Click "),
                  createVNode("strong", null, "+ New Contact"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, "Select the Contact Type and enter the email address and phone number of the contact."),
                createVNode("li", null, "Save the contact.")
              ]),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images1 })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/contacts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contacts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ddf232ea"]]);
export {
  contacts as default
};
