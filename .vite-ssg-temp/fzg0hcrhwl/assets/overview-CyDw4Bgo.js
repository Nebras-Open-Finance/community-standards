import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-183d1401><section class="ed-doc__hero" data-v-183d1401><div class="ed-doc__inner" data-v-183d1401><div class="ed-doc__eyebrow" data-v-183d1401><span class="ed-doc__eyebrow-dash" data-v-183d1401></span> Production · Testing &amp; Certification · Optional </div><h1 class="ed-doc__title" data-v-183d1401> Optional Certifications Overview <span class="ed-doc__read" data-v-183d1401>2 min read</span></h1><p class="ed-doc__lede" data-v-183d1401> Optional certifications gate access to specific permissions that carry additional handling requirements beyond the core Bank Data Sharing standards. A TPP requests an optional certification only when its proposition needs the corresponding permission. <em data-v-183d1401>Content to follow.</em></p></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/optional/overview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-183d1401"]]);
export {
  overview as default
};
