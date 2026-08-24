import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_2, a as __unplugin_components_3$1 } from "./ConsentManagementConnections-jOyqayZw.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vue-router";
import "./useSharedState-qc0PNim7.js";
import "./DirhamAmount-BJSUbugi.js";
import "./permissionDescriptions-WkI-8pYN.js";
import "./formatDate-CaaKrjgT.js";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "user-experience",
  __ssrInlineRender: true,
  setup(__props) {
    const examples = [
      {
        num: 1,
        title: "Dashboard with Consents in use, Consent Details and Payment History",
        src: "/images/user-experience/consent-management-interface/lfi/3.png"
      },
      {
        num: 2,
        title: "Dashboard with History of Consents, Consent Details and Payment History",
        src: "/images/user-experience/consent-management-interface/lfi/5.png"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_ConsentManagementConnections = __unplugin_components_2;
      const _component_ConsentConnectionsEditor = __unplugin_components_3$1;
      const _component_ImageViewer = ImageViewer;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-774f3a4c><section class="ed-doc__hero" data-v-774f3a4c><div class="ed-doc__inner" data-v-774f3a4c><div class="ed-doc__eyebrow" data-v-774f3a4c><span class="ed-doc__eyebrow-dash" data-v-774f3a4c></span> LFI · CMI · Bank Service Initiation · UX </div><h1 class="ed-doc__title" data-v-774f3a4c> Bank Service Initiation — User Experience <span class="ed-doc__read" data-v-774f3a4c>2 min read</span></h1><p class="ed-doc__lede" data-v-774f3a4c> The LFI Consent Management Interface for Bank Service Initiation (payment) consents. Customers see the single payments and Flexi Pay (multi-payment) permissions they have granted to third party providers, the payer and payee details, and can cancel an active permission at any time. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-774f3a4c> While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of <strong data-v-774f3a4c>AlTareq</strong> — including logos, naming, and action buttons — must be preserved. Your Consent Management Interface must be submitted as part of <strong data-v-774f3a4c>CX certification</strong> prior to production, and any material changes to a production CMI must be re-submitted for review and approval. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "live-ui-preview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Live UI Preview",
        title: "LFI Connections — Payments view",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The component below shows the LFI Connections page filtered to payment consents. Tap any consent card to open its details and manage it. `);
                } else {
                  return [
                    createTextVNode(" The component below shows the LFI Connections page filtered to payment consents. Tap any consent card to open its details and manage it. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="ed-doc__previews" data-v-774f3a4c${_scopeId2}><figure class="ed-doc__preview" data-v-774f3a4c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ConsentManagementConnections, {
                    mode: "payments",
                    perspective: "lfi"
                  }, null, _parent3, _scopeId2));
                  _push3(`</figure></div>`);
                } else {
                  return [
                    createVNode("div", { class: "ed-doc__previews" }, [
                      createVNode("figure", { class: "ed-doc__preview" }, [
                        createVNode(_component_ConsentManagementConnections, {
                          mode: "payments",
                          perspective: "lfi"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-774f3a4c${_scopeId}>Configure simulated consents and watch the preview respond</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use the editor below to add, remove, and adjust the simulated consents. Every change is reflected immediately in the preview above. `);
                } else {
                  return [
                    createTextVNode(" Use the editor below to add, remove, and adjust the simulated consents. Every change is reflected immediately in the preview above. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ConsentConnectionsEditor, { mode: "payments" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The component below shows the LFI Connections page filtered to payment consents. Tap any consent card to open its details and manage it. ")
                ]),
                _: 1
              }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "ed-doc__previews" }, [
                    createVNode("figure", { class: "ed-doc__preview" }, [
                      createVNode(_component_ConsentManagementConnections, {
                        mode: "payments",
                        perspective: "lfi"
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Configure simulated consents and watch the preview respond"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Use the editor below to add, remove, and adjust the simulated consents. Every change is reflected immediately in the preview above. ")
                ]),
                _: 1
              }),
              createVNode(_component_ConsentConnectionsEditor, { mode: "payments" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-screenshots",
        num: "02",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Examples",
        title: "Example screens",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__examples" data-v-774f3a4c${_scopeId}><!--[-->`);
            ssrRenderList(examples, (ex) => {
              _push2(`<figure class="ed-doc__example" data-v-774f3a4c${_scopeId}><figcaption class="ed-doc__example-caption" data-v-774f3a4c${_scopeId}><span class="ed-doc__example-num" data-v-774f3a4c${_scopeId}>Example ${ssrInterpolate(ex.num)}</span><span class="ed-doc__example-title" data-v-774f3a4c${_scopeId}>${ssrInterpolate(ex.title)}</span></figcaption>`);
              _push2(ssrRenderComponent(_component_ImageViewer, {
                src: ex.src,
                alt: ex.title
              }, null, _parent2, _scopeId));
              _push2(`</figure>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-doc__examples" }, [
                (openBlock(), createBlock(Fragment, null, renderList(examples, (ex) => {
                  return createVNode("figure", {
                    key: ex.num,
                    class: "ed-doc__example"
                  }, [
                    createVNode("figcaption", { class: "ed-doc__example-caption" }, [
                      createVNode("span", { class: "ed-doc__example-num" }, "Example " + toDisplayString(ex.num), 1),
                      createVNode("span", { class: "ed-doc__example-title" }, toDisplayString(ex.title), 1)
                    ]),
                    createVNode(_component_ImageViewer, {
                      src: ex.src,
                      alt: ex.title
                    }, null, 8, ["src", "alt"])
                  ]);
                }), 64))
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/user-experience.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userExperience = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-774f3a4c"]]);
export {
  userExperience as default
};
