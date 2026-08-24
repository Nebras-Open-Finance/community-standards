import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b0254174><section class="ed-doc__hero" data-v-b0254174><div class="ed-doc__inner" data-v-b0254174><div class="ed-doc__eyebrow" data-v-b0254174><span class="ed-doc__eyebrow-dash" data-v-b0254174></span> Production · Testing &amp; Certification · Optional </div><h1 class="ed-doc__title" data-v-b0254174> Access Encrypted Resource Data <span class="ed-doc__read" data-v-b0254174>3 min read</span></h1><p class="ed-doc__lede" data-v-b0254174> A TPP MUST hold this optional certification before requesting the <code data-v-b0254174>ReadProductFinanceRates</code> permission on a live LFI. The certification proves the TPP has completed the required CX certification for this permission, and that it can handle both cleartext and encrypted <code data-v-b0254174>FinanceRates</code> — decrypting JWE payloads locally on the user&#39;s device with the unencrypted rates never reaching the TPP&#39;s servers. <em data-v-b0254174>Content to follow.</em></p></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const accessEncryptedResourceData = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b0254174"]]);
export {
  accessEncryptedResourceData as default
};
