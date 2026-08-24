import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-ed2fdb1c><section class="ed-doc__hero" data-v-ed2fdb1c><div class="ed-doc__inner" data-v-ed2fdb1c><div class="ed-doc__eyebrow" data-v-ed2fdb1c><span class="ed-doc__eyebrow-dash" data-v-ed2fdb1c></span> Trust Framework · Certificates </div><h1 class="ed-doc__title" data-v-ed2fdb1c> Client Encryption Certificate <span class="ed-doc__read" data-v-ed2fdb1c>2 min read</span></h1><p class="ed-doc__lede" data-v-ed2fdb1c>The <strong data-v-ed2fdb1c>Encryption Certificate</strong> is used to <strong data-v-ed2fdb1c>encrypt data</strong> sent to your application — such as event notifications — ensuring only your application can read it.</p><div class="ed-spec-strip" data-v-ed2fdb1c><div class="ed-spec-strip__row" data-v-ed2fdb1c><div class="ed-spec-strip__label" data-v-ed2fdb1c>Purpose</div><div class="ed-spec-strip__value" data-v-ed2fdb1c>Ensuring only your application can read sensitive data</div></div><div class="ed-spec-strip__row" data-v-ed2fdb1c><div class="ed-spec-strip__label" data-v-ed2fdb1c>Usage</div><div class="ed-spec-strip__value" data-v-ed2fdb1c>Decrypting encrypted responses and event payloads</div></div><div class="ed-spec-strip__row" data-v-ed2fdb1c><div class="ed-spec-strip__label" data-v-ed2fdb1c>Required</div><div class="ed-spec-strip__value" data-v-ed2fdb1c>Optional — required if your application subscribes to receive encrypted events</div></div></div><p class="ed-doc-prose ed-doc-prose--first" data-v-ed2fdb1c>When an LFI or the platform sends an encrypted payload, it encrypts it using the public key from this certificate. Your application uses the corresponding private key to decrypt it.</p></div></section><section class="ed-doc__band ed-doc__band--surface" data-v-ed2fdb1c><div class="ed-doc__inner" data-v-ed2fdb1c><h2 class="ed-doc__h2" data-v-ed2fdb1c>Generating Your Encryption Certificate</h2><p class="ed-doc-prose" data-v-ed2fdb1c>Follow the <a href="../certificates" data-v-ed2fdb1c>Keys &amp; Certificates</a> guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate.</p><p class="ed-doc-prose" data-v-ed2fdb1c>When selecting the certificate type during generation, choose <strong data-v-ed2fdb1c>Encryption</strong>.</p><div class="ed-doc-callout ed-doc-callout--tip" data-v-ed2fdb1c><div class="ed-doc-callout__body" data-v-ed2fdb1c>Keep your encryption private key stored securely. If it is lost, you will be unable to decrypt any events received during the period the certificate was active. See <a href="/policy/secure-management" data-v-ed2fdb1c>Secure Management of Keys and Credentials</a> for guidance.</div></div></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/certificates/client-encryption.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const clientEncryption = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ed2fdb1c"]]);
export {
  clientEncryption as default
};
