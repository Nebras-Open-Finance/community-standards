import { _ as __unplugin_components_0 } from "./FcMultiPaymentPortal-C2XKg14O.js";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { a as variableOnDemandArea } from "./multi-payments-BLEkBzPp.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./types-BEa3NRi5.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const explainerPath = "/tech/lfi-api-hub/production/testing-certification/functional/variable-on-demand";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submission",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcMultiPaymentPortal = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e7bee58c><section class="ed-doc__hero" data-v-e7bee58c><div class="ed-doc__inner" data-v-e7bee58c><div class="ed-doc__eyebrow" data-v-e7bee58c><span class="ed-doc__eyebrow-dash" data-v-e7bee58c></span> Functional Certification · Variable On-Demand </div><h1 class="ed-doc__title" data-v-e7bee58c>Build your submission</h1><p class="ed-doc__lede" data-v-e7bee58c> Complete each step, attach your evidence, and download a ZIP to attach to your <strong data-v-e7bee58c>${ssrInterpolate(unref(variableOnDemandArea).certType)}</strong> Service Desk ticket. New here? Read <a${ssrRenderAttr("href", explainerPath)} data-v-e7bee58c>what Functional Certification involves</a> first. </p></div></section><div class="ed-doc__body" data-v-e7bee58c><div class="ed-doc__inner" data-v-e7bee58c>`);
      _push(ssrRenderComponent(_component_FcMultiPaymentPortal, { area: unref(variableOnDemandArea) }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/variable-on-demand/submission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submission = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e7bee58c"]]);
export {
  submission as default
};
