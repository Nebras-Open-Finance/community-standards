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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-11df06e5><section class="ed-doc__hero" data-v-11df06e5><div class="ed-doc__inner" data-v-11df06e5><div class="ed-doc__eyebrow" data-v-11df06e5><span class="ed-doc__eyebrow-dash" data-v-11df06e5></span> LFI · Service Initiation · PII · Schema </div><h1 class="ed-doc__title" data-v-11df06e5> PII Schema — Payments (Ozone Connect) </h1><p class="ed-doc__lede" data-v-11df06e5> The schema below shows the full structure of the decrypted <code data-v-11df06e5>PersonalIdentifiableInformation</code> payload as received with a <strong data-v-11df06e5>payment instruction</strong> via Ozone Connect. This is the PII the LFI MUST decrypt and validate before processing a payment. </p><p class="ed-doc__lede" data-v-11df06e5> At this stage, <code data-v-11df06e5>DebtorAccount</code> is absent — the debtor account was fixed during consent authorisation. The creditor fields sit directly on <code data-v-11df06e5>Initiation</code> as a single creditor (not inside an array). See the <a href="../" data-v-11df06e5>Overview</a> for decryption steps. </p></div></section><section class="ed-doc__schema" data-v-11df06e5><div class="ed-doc__inner" data-v-11df06e5>`);
  _push(ssrRenderComponent(_component_RedocWrapper, {
    spec: "/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml",
    filterSchema: "AEBankServiceInitiation.AEDomesticPaymentPIIProperties",
    displayPath: "/payment.PersonalIdentifiableInformation"
  }, null, _parent));
  _push(`</div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const piiPayments = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-11df06e5"]]);
export {
  piiPayments as default
};
