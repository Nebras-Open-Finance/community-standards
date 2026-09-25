import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-3f4445fa><section class="ed-doc__hero" data-v-3f4445fa><div class="ed-doc__inner" data-v-3f4445fa><div class="ed-doc__eyebrow" data-v-3f4445fa><span class="ed-doc__eyebrow-dash" data-v-3f4445fa></span> Trust Framework · Certificates </div><h1 class="ed-doc__title" data-v-3f4445fa> Client Signing Certificate <span class="ed-doc__read" data-v-3f4445fa>2 min read</span></h1><p class="ed-doc__lede" data-v-3f4445fa>The <strong data-v-3f4445fa>Signing Certificate</strong> is used to <strong data-v-3f4445fa>digitally sign JWTs</strong> that your application sends — including Client Assertions, PAR Request JWTs, and any other signed payloads.</p><div class="ed-spec-strip" data-v-3f4445fa><div class="ed-spec-strip__row" data-v-3f4445fa><div class="ed-spec-strip__label" data-v-3f4445fa>Purpose</div><div class="ed-spec-strip__value" data-v-3f4445fa>Proving integrity and authenticity of signed payloads</div></div><div class="ed-spec-strip__row" data-v-3f4445fa><div class="ed-spec-strip__label" data-v-3f4445fa>Usage</div><div class="ed-spec-strip__value" data-v-3f4445fa>Signing the contents of JWTs</div></div><div class="ed-spec-strip__row" data-v-3f4445fa><div class="ed-spec-strip__label" data-v-3f4445fa>Required</div><div class="ed-spec-strip__value" data-v-3f4445fa>Yes</div></div></div><p class="ed-doc-prose ed-doc-prose--first" data-v-3f4445fa>Every signed JWT must include a <code data-v-3f4445fa>kid</code> header referencing this certificate&#39;s Key ID, so that the receiving party can look up your public key in the Trust Framework and verify the signature.</p></div></section><section class="ed-doc__band ed-doc__band--surface" data-v-3f4445fa><div class="ed-doc__inner" data-v-3f4445fa><h2 class="ed-doc__h2" data-v-3f4445fa>Generating Your Signing Certificate</h2><p class="ed-doc-prose" data-v-3f4445fa>Follow the <a href="../certificates" data-v-3f4445fa>Keys &amp; Certificates</a> guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate.</p><p class="ed-doc-prose" data-v-3f4445fa>When selecting the certificate type during generation, choose <strong data-v-3f4445fa>Signing</strong>.</p></div></section><section class="ed-doc__band ed-doc__band--cream" data-v-3f4445fa><div class="ed-doc__inner" data-v-3f4445fa><h2 class="ed-doc__h2" data-v-3f4445fa>Using the Signing Key</h2><p class="ed-doc-prose" data-v-3f4445fa>The <strong data-v-3f4445fa>Key ID (<code data-v-3f4445fa>kid</code>)</strong> of your signing certificate must be included in the JWT header for every signed request. See <a href="../certificates#finding-your-key-id-kid" data-v-3f4445fa>Finding Your Key ID</a> and <a href="../../security/fapi/message-signing" data-v-3f4445fa>Message Signing</a> for full details on how this value is used.</p></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/certificates/client-signing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const clientSigning = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3f4445fa"]]);
export {
  clientSigning as default
};
