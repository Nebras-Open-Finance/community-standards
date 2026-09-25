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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-3d333333><section class="ed-doc__hero" data-v-3d333333><div class="ed-doc__inner" data-v-3d333333><div class="ed-doc__eyebrow" data-v-3d333333><span class="ed-doc__eyebrow-dash" data-v-3d333333></span> Service Initiation · PII · Schema </div><h1 class="ed-doc__title" data-v-3d333333> PII Schema — POST /par </h1><p class="ed-doc__lede" data-v-3d333333> The schema below shows the full structure of the <code data-v-3d333333>PersonalIdentifiableInformation</code> field as it must be constructed for the <strong data-v-3d333333>consent staging</strong> step (<span class="endpoint" data-v-3d333333><span class="http-method http-method--post" data-v-3d333333>POST</span><code data-v-3d333333>/par</code></span>). The encrypted form (<code data-v-3d333333>AEJWEPaymentPII</code>) is what must be sent — the object variants document the payload to sign and encrypt. </p></div></section><section class="ed-doc__schema" data-v-3d333333><div class="ed-doc__inner" data-v-3d333333>`);
  _push(ssrRenderComponent(_component_RedocWrapper, {
    spec: "/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml",
    filterSchema: "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII",
    displayPath: "/consent.PersonalIdentifiableInformation"
  }, null, _parent));
  _push(`</div></section></div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const piiPar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3d333333"]]);
export {
  piiPar as default
};
