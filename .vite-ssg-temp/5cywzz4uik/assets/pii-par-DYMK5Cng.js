import { _ as _sfc_main$1 } from "./RedocWrapper-BD7Zi2Zq.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_RedocWrapper = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-6e2479ad><section class="ed-doc__hero" data-v-6e2479ad><div class="ed-doc__inner" data-v-6e2479ad><div class="ed-doc__eyebrow" data-v-6e2479ad><span class="ed-doc__eyebrow-dash" data-v-6e2479ad></span> LFI · Service Initiation · PII · Schema </div><h1 class="ed-doc__title" data-v-6e2479ad> PII Schema — Consent (Consent Manager) </h1><p class="ed-doc__lede" data-v-6e2479ad> The schema below shows the full structure of the decrypted <code data-v-6e2479ad>PersonalIdentifiableInformation</code> payload as received during <strong data-v-6e2479ad>consent authorisation</strong> via the Consent Manager. This is the PII the LFI MUST decrypt and validate before authorising a payment consent. </p><p class="ed-doc__lede" data-v-6e2479ad> At this stage, the PII includes the <code data-v-6e2479ad>Initiation.Creditor</code> array (1–10 entries, or omitted for open beneficiary) and optionally <code data-v-6e2479ad>Initiation.DebtorAccount</code>. See the <a href="../" data-v-6e2479ad>Overview</a> for decryption steps. </p></div></section><section class="ed-doc__schema" data-v-6e2479ad><div class="ed-doc__inner" data-v-6e2479ad>`);
  _push(ssrRenderComponent(_component_RedocWrapper, {
    spec: "/openapi/v2.2-rc1/api-hub/uae-api-hub-consent-manager-openapi.yaml",
    filterSchema: "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII",
    displayPath: "/consent.PersonalIdentifiableInformation"
  }, null, _parent));
  _push(`</div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const piiPar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6e2479ad"]]);
export {
  piiPar as default
};
