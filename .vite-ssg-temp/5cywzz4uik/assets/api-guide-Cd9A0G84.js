import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-f14af68b><section class="ed-doc__hero" data-v-f14af68b><div class="ed-doc__inner" data-v-f14af68b><div class="ed-doc__eyebrow" data-v-f14af68b><span class="ed-doc__eyebrow-dash" data-v-f14af68b></span> LFI · Banking · Products &amp; Leads </div><h1 class="ed-doc__title" data-v-f14af68b> Products &amp; Leads — API Guide <span class="ed-doc__read" data-v-f14af68b>2 min read</span></h1></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "coming-soon",
    num: "01",
    color: "var(--at-gold)",
    eyebrow: "Coming soon",
    title: "Practical guide in preparation",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Coming soon"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-f14af68b${_scopeId2}>This page will provide a practical guide to implementing the Products &amp; Leads API.</p>`);
            } else {
              return [
                createVNode("p", null, "This page will provide a practical guide to implementing the Products & Leads API.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdNote, {
            type: "info",
            title: "Coming soon"
          }, {
            default: withCtx(() => [
              createVNode("p", null, "This page will provide a practical guide to implementing the Products & Leads API.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f14af68b"]]);
export {
  apiGuide as default
};
