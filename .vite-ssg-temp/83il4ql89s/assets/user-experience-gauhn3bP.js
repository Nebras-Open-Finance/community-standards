import { _ as __unplugin_components_5 } from "./EdNote-61YjJPRT.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-DD63-Oxz.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-BRdU9xqH.js";
import { _ as __unplugin_components_0 } from "./EdBackStrip-CrlwbtLm.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "user-experience",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Registration — User Experience · BioPay" });
    const meta = [
      { label: "Status", value: "Draft — content to come" },
      { label: "Version", value: "0.1" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdNote = __unplugin_components_5;
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/biopay/",
        text: "BioPay overview"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "BioPay · Registration · Draft",
        "eyebrow-color": "var(--at-gold)",
        title: "User Experience",
        meta,
        lede: "The customer-facing registration journey in the LFI’s own channel: identity verification against ICP, instrument selection, and what the customer is told about how biometric payments will work."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "coming",
        color: "var(--at-gold)",
        eyebrow: "Placeholder",
        title: "Content coming later"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Not yet written"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p${_scopeId2}> This page will set out the registration journey as the customer experiences it — screens, wording, consent language, instrument selection, and the confirmation they receive. It is deliberately empty for now. </p><p${_scopeId2}> The technical side of the same journey is on the `);
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/biopay/registration/api-guide" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Registration API Guide`);
                      } else {
                        return [
                          createTextVNode("Registration API Guide")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`. </p>`);
                } else {
                  return [
                    createVNode("p", null, " This page will set out the registration journey as the customer experiences it — screens, wording, consent language, instrument selection, and the confirmation they receive. It is deliberately empty for now. "),
                    createVNode("p", null, [
                      createTextVNode(" The technical side of the same journey is on the "),
                      createVNode(_component_RouterLink, { to: "/biopay/registration/api-guide" }, {
                        default: withCtx(() => [
                          createTextVNode("Registration API Guide")
                        ]),
                        _: 1
                      }),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdNote, {
                type: "info",
                title: "Not yet written"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " This page will set out the registration journey as the customer experiences it — screens, wording, consent language, instrument selection, and the confirmation they receive. It is deliberately empty for now. "),
                  createVNode("p", null, [
                    createTextVNode(" The technical side of the same journey is on the "),
                    createVNode(_component_RouterLink, { to: "/biopay/registration/api-guide" }, {
                      default: withCtx(() => [
                        createTextVNode("Registration API Guide")
                      ]),
                      _: 1
                    }),
                    createTextVNode(". ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/biopay/registration/user-experience.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
