import { _ as __unplugin_components_0 } from "./OnboardingOrganisationForm-BiSV6dw-.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./FormInput-BzoE1TtY.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_OnboardingOrganisationForm = __unplugin_components_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-eef3089c><section class="ed-doc__hero" data-v-eef3089c><div class="ed-doc__inner" data-v-eef3089c><a class="ed-doc__back" href="/tech/tpp-standards/trust-framework/onboarding" data-v-eef3089c><span class="ed-doc__back-arrow" aria-hidden="true" data-v-eef3089c>←</span> Onboarding </a><div class="ed-doc__eyebrow" data-v-eef3089c><span class="ed-doc__eyebrow-dash" data-v-eef3089c></span> TPP · Trust Framework · Onboarding </div><h1 class="ed-doc__title" data-v-eef3089c> Organisation Details Form <span class="ed-doc__read" data-v-eef3089c>2 min read</span></h1><p class="ed-doc__lede" data-v-eef3089c> Complete this form and attach it to your <a href="/tech/tpp-standards/trust-framework/onboarding#requesting-sandbox-onboarding" data-v-eef3089c>sandbox onboarding request email</a>. </p></div></section><section class="ed-doc__form-band" data-v-eef3089c><div class="ed-doc__inner" data-v-eef3089c>`);
  _push(ssrRenderComponent(_component_OnboardingOrganisationForm, null, null, _parent));
  _push(`</div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/onboarding-form-organisation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const onboardingFormOrganisation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-eef3089c"]]);
export {
  onboardingFormOrganisation as default
};
