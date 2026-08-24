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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b0d62120><section class="ed-doc__hero" data-v-b0d62120><div class="ed-doc__inner" data-v-b0d62120><div class="ed-doc__eyebrow" data-v-b0d62120><span class="ed-doc__eyebrow-dash" data-v-b0d62120></span> Service Initiation · PII · Schema </div><h1 class="ed-doc__title" data-v-b0d62120> PII Schema — POST /payments </h1><p class="ed-doc__lede" data-v-b0d62120> The schema below shows the full structure of the <code data-v-b0d62120>PersonalIdentifiableInformation</code> field as it must be constructed for the <strong data-v-b0d62120>payment creation</strong> step (<span class="endpoint" data-v-b0d62120><span class="http-method http-method--post" data-v-b0d62120>POST</span><code data-v-b0d62120>/payments</code></span>). Note that <code data-v-b0d62120>DebtorAccount</code> is absent at this stage — the debtor account is fixed by the consent authorisation flow. The creditor fields sit directly on <code data-v-b0d62120>Initiation</code> rather than inside an array. </p></div></section><section class="ed-doc__schema" data-v-b0d62120><div class="ed-doc__inner" data-v-b0d62120>`);
  _push(ssrRenderComponent(_component_RedocWrapper, {
    spec: "/openapi/v2.1/standards/uae-bank-initiation-openapi.yaml",
    filterSchema: "AEBankServiceInitiation.AEDomesticPaymentPIIProperties",
    displayPath: "/payment.PersonalIdentifiableInformation"
  }, null, _parent));
  _push(`</div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const piiPayments = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b0d62120"]]);
export {
  piiPayments as default
};
