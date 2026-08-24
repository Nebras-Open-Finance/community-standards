import { _ as __unplugin_components_0 } from "./FcCopPortal-CXD6ko1Z.js";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { c as confirmationOfPayeeTppArea } from "./confirmation-of-payee-tpp-CRM2JZr8.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./types-BEa3NRi5.js";
import "./EdNote-BQLptLjy.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const explainerPath = "/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submission",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcCopPortal = __unplugin_components_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-fda1767c><section class="ed-doc__hero" data-v-fda1767c><div class="ed-doc__inner" data-v-fda1767c><div class="ed-doc__eyebrow" data-v-fda1767c><span class="ed-doc__eyebrow-dash" data-v-fda1767c></span> Functional Certification · Confirmation of Payee </div><h1 class="ed-doc__title" data-v-fda1767c>Build your submission</h1><p class="ed-doc__lede" data-v-fda1767c> Complete each step, attach your evidence, and download a ZIP to attach to your <strong data-v-fda1767c>${ssrInterpolate(unref(confirmationOfPayeeTppArea).certType)}</strong> Service Desk ticket. New here? Read <a${ssrRenderAttr("href", explainerPath)} data-v-fda1767c>what Functional Certification involves</a> first. </p></div></section><div class="ed-doc__body" data-v-fda1767c><div class="ed-doc__inner" data-v-fda1767c>`);
      _push(ssrRenderComponent(_component_FcCopPortal, { area: unref(confirmationOfPayeeTppArea) }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee/submission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submission = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fda1767c"]]);
export {
  submission as default
};
