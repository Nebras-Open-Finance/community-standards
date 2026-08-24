import { _ as __unplugin_components_0 } from "./CertificationTicketBanner-DF3U_2rx.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_CertificationTicketBanner = __unplugin_components_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-97200ddf><section class="ed-doc__hero" data-v-97200ddf><div class="ed-doc__inner" data-v-97200ddf><div class="ed-doc__eyebrow" data-v-97200ddf><span class="ed-doc__eyebrow-dash" data-v-97200ddf></span> Testing &amp; Certification · CX Evidence </div><h1 class="ed-doc__title" data-v-97200ddf> User Experience Evidence <span class="ed-doc__read" data-v-97200ddf>2 min read</span></h1><p class="ed-doc__lede" data-v-97200ddf> Evidence that your consent and authorisation flows meet Nebras user experience requirements. Detailed CX evidence requirements will be published here ahead of the next certification window. </p></div></section><section class="ed-doc__content" data-v-97200ddf><div class="ed-doc__inner" data-v-97200ddf>`);
  _push(ssrRenderComponent(_component_CertificationTicketBanner, { "cert-type": "TPP CX Certification Evidence" }, null, _parent));
  _push(`</div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/user-experience.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userExperience = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-97200ddf"]]);
export {
  userExperience as default
};
