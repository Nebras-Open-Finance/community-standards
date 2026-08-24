import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-7a448341><section class="ed-doc__hero" data-v-7a448341><div class="ed-doc__inner" data-v-7a448341><div class="ed-doc__eyebrow" data-v-7a448341><span class="ed-doc__eyebrow-dash" data-v-7a448341></span> Trust Framework · Certificates </div><h1 class="ed-doc__title" data-v-7a448341> Client Transport Certificate <span class="ed-doc__read" data-v-7a448341>2 min read</span></h1><p class="ed-doc__lede" data-v-7a448341>The <strong data-v-7a448341>Transport Certificate</strong> is used for <strong data-v-7a448341>mutual TLS (mTLS)</strong> to authenticate your application when making API requests to LFIs.</p><div class="ed-spec-strip" data-v-7a448341><div class="ed-spec-strip__row" data-v-7a448341><div class="ed-spec-strip__label" data-v-7a448341>Purpose</div><div class="ed-spec-strip__value" data-v-7a448341>Secure transport and client authentication</div></div><div class="ed-spec-strip__row" data-v-7a448341><div class="ed-spec-strip__label" data-v-7a448341>Usage</div><div class="ed-spec-strip__value" data-v-7a448341>mTLS handshake for all API calls</div></div><div class="ed-spec-strip__row" data-v-7a448341><div class="ed-spec-strip__label" data-v-7a448341>Presented to</div><div class="ed-spec-strip__value" data-v-7a448341>API providers during every connection</div></div><div class="ed-spec-strip__row" data-v-7a448341><div class="ed-spec-strip__label" data-v-7a448341>Required</div><div class="ed-spec-strip__value" data-v-7a448341>Yes</div></div></div><p class="ed-doc-prose ed-doc-prose--first" data-v-7a448341>All API calls you make as a TPP must present this certificate. Without it, LFI endpoints will reject the connection before any request is processed.</p></div></section><section class="ed-doc__band ed-doc__band--surface" data-v-7a448341><div class="ed-doc__inner" data-v-7a448341><h2 class="ed-doc__h2" data-v-7a448341>Generating Your Transport Certificate</h2><p class="ed-doc-prose" data-v-7a448341>Follow the <a href="../certificates/" data-v-7a448341>Keys &amp; Certificates</a> guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate.</p><p class="ed-doc-prose" data-v-7a448341>When selecting the certificate type during generation, choose <strong data-v-7a448341>Transport</strong>.</p><div class="ed-doc-callout ed-doc-callout--tip" data-v-7a448341><div class="ed-doc-callout__title" data-v-7a448341>Using the kid</div><div class="ed-doc-callout__body" data-v-7a448341>Once issued, note the <strong data-v-7a448341>Key ID (<code data-v-7a448341>kid</code>)</strong> from the certificate detail page — you will need it when configuring your mTLS client. See <a href="../certificates/#finding-your-key-id-kid" data-v-7a448341>Finding Your Key ID</a>.</div></div></div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/certificates/client-transport.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const clientTransport = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7a448341"]]);
export {
  clientTransport as default
};
