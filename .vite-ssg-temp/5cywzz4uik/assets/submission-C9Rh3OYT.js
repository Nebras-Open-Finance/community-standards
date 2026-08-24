import { _ as __unplugin_components_0 } from "./FcPortal-ByCF9jvW.js";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { a as insuranceDataSharingArea } from "./insurance-data-sharing-BL4Oizff.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./EdNote-BQLptLjy.js";
import "./types-BEa3NRi5.js";
import "./FcConsentOpEvidence-CYqMLIqZ.js";
import "./FcEndpointSelector-Bb7O11rk.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const explainerPath = "/tech/lfi-api-hub/production/testing-certification/functional/insurance-data-sharing";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submission",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcPortal = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-d1e5c5e9><section class="ed-doc__hero" data-v-d1e5c5e9><div class="ed-doc__inner" data-v-d1e5c5e9><div class="ed-doc__eyebrow" data-v-d1e5c5e9><span class="ed-doc__eyebrow-dash" data-v-d1e5c5e9></span> Functional Certification · Insurance Data Sharing </div><h1 class="ed-doc__title" data-v-d1e5c5e9>Build your submission</h1><p class="ed-doc__lede" data-v-d1e5c5e9> Complete each step, attach your evidence, and download a ZIP to attach to your <strong data-v-d1e5c5e9>${ssrInterpolate(unref(insuranceDataSharingArea).certType)}</strong> Service Desk ticket. New here? Read <a${ssrRenderAttr("href", explainerPath)} data-v-d1e5c5e9>what Functional Certification involves</a> first. </p></div></section><div class="ed-doc__body" data-v-d1e5c5e9><div class="ed-doc__inner" data-v-d1e5c5e9>`);
      _push(ssrRenderComponent(_component_FcPortal, { area: unref(insuranceDataSharingArea) }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/insurance-data-sharing/submission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submission = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1e5c5e9"]]);
export {
  submission as default
};
