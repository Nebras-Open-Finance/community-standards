import { _ as __unplugin_components_0 } from "./FcTppPortal-BES2CnYZ.js";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { b as bankDataSharingTppArea } from "./bank-data-sharing-tpp-CPzNmsup.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./types-BEa3NRi5.js";
import "./FcConsentOpEvidence-CYqMLIqZ.js";
import "./EditableJson-BkohSb0c.js";
import "yaml";
import "./useSharedState-qc0PNim7.js";
import "./FcEndpointSelector-Bb7O11rk.js";
import "./bank-data-sharing-BzvFCI2T.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const explainerPath = "/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submission",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcTppPortal = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-08770c71><section class="ed-doc__hero" data-v-08770c71><div class="ed-doc__inner" data-v-08770c71><div class="ed-doc__eyebrow" data-v-08770c71><span class="ed-doc__eyebrow-dash" data-v-08770c71></span> Functional Certification · Bank Data Sharing </div><h1 class="ed-doc__title" data-v-08770c71>Build your submission</h1><p class="ed-doc__lede" data-v-08770c71> Complete each step, attach your evidence, and download a ZIP to attach to your <strong data-v-08770c71>${ssrInterpolate(unref(bankDataSharingTppArea).certType)}</strong> Service Desk ticket. New here? Read <a${ssrRenderAttr("href", explainerPath)} data-v-08770c71>what Functional Certification involves</a> first. </p></div></section><div class="ed-doc__body" data-v-08770c71><div class="ed-doc__inner" data-v-08770c71>`);
      _push(ssrRenderComponent(_component_FcTppPortal, { area: unref(bankDataSharingTppArea) }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing/submission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submission = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08770c71"]]);
export {
  submission as default
};
