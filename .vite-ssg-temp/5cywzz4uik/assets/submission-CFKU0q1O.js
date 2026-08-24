import { _ as __unplugin_components_0 } from "./FcPortal-ByCF9jvW.js";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { a as bankDataSharingArea } from "./bank-data-sharing-BzvFCI2T.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./EdNote-BQLptLjy.js";
import "./types-BEa3NRi5.js";
import "./FcConsentOpEvidence-CYqMLIqZ.js";
import "./FcEndpointSelector-Bb7O11rk.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const explainerPath = "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submission",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcPortal = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-1a1fb53e><section class="ed-doc__hero" data-v-1a1fb53e><div class="ed-doc__inner" data-v-1a1fb53e><div class="ed-doc__eyebrow" data-v-1a1fb53e><span class="ed-doc__eyebrow-dash" data-v-1a1fb53e></span> Functional Certification · Bank Data Sharing </div><h1 class="ed-doc__title" data-v-1a1fb53e>Build your submission</h1><p class="ed-doc__lede" data-v-1a1fb53e> Complete each step, attach your evidence, and download a ZIP to attach to your <strong data-v-1a1fb53e>${ssrInterpolate(unref(bankDataSharingArea).certType)}</strong> Service Desk ticket. New here? Read <a${ssrRenderAttr("href", explainerPath)} data-v-1a1fb53e>what Functional Certification involves</a> first. </p></div></section><div class="ed-doc__body" data-v-1a1fb53e><div class="ed-doc__inner" data-v-1a1fb53e>`);
      _push(ssrRenderComponent(_component_FcPortal, { area: unref(bankDataSharingArea) }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/submission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submission = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a1fb53e"]]);
export {
  submission as default
};
