import { _ as __unplugin_components_0 } from "./OnboardingAdminForm-SwsUXM-Z.js";
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
  const _component_OnboardingAdminForm = __unplugin_components_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-cb2946b9><section class="ed-doc__hero" data-v-cb2946b9><div class="ed-doc__inner" data-v-cb2946b9><a class="ed-doc__back" href="/tech/tpp-standards/trust-framework/onboarding" data-v-cb2946b9><span class="ed-doc__back-arrow" aria-hidden="true" data-v-cb2946b9>←</span> Onboarding </a><div class="ed-doc__eyebrow" data-v-cb2946b9><span class="ed-doc__eyebrow-dash" data-v-cb2946b9></span> TPP · Trust Framework · Onboarding </div><h1 class="ed-doc__title" data-v-cb2946b9> Primary Organisation Admin Details Form <span class="ed-doc__read" data-v-cb2946b9>2 min read</span></h1><p class="ed-doc__lede" data-v-cb2946b9> Complete this form and attach it to your <a href="/tech/tpp-standards/trust-framework/onboarding#requesting-sandbox-onboarding" data-v-cb2946b9>sandbox onboarding request email</a>. </p></div></section><section class="ed-doc__form-band" data-v-cb2946b9><div class="ed-doc__inner" data-v-cb2946b9>`);
  _push(ssrRenderComponent(_component_OnboardingAdminForm, null, null, _parent));
  _push(`</div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/onboarding-form-admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const onboardingFormAdmin = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cb2946b9"]]);
export {
  onboardingFormAdmin as default
};
