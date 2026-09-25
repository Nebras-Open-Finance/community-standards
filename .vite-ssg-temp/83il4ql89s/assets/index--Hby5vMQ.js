import { _ as __unplugin_components_0 } from "./FcCertLanding-BQIuvtW-.js";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const BASE = "/tech/tpp-standards/production/testing-certification";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const cards = [
      {
        category: "Data Sharing",
        title: "Bank Data Sharing",
        desc: "Prove your TPP consumes the Bank Data Sharing endpoints through the API Hub correctly — the right consent, the endpoints you use, and a Postman screenshot per endpoint from the sandbox Model Bank.",
        url: `${BASE}/functional/bank-data-sharing`,
        tags: ["Accounts", "Balances", "Transactions"]
      },
      {
        category: "Service Initiation",
        title: "Domestic Payments",
        desc: "Evidence your TPP initiates domestic payments through the API Hub — the Consent and Risk objects you construct for each payment type, and a payment made against each. Covers all eight types including Delegated SCA.",
        url: `${BASE}/functional/domestic-payments`,
        tags: ["Payments", "Consent", "Risk", "Refunds"]
      },
      {
        category: "Confirmation of Payee",
        title: "Confirmation of Payee",
        desc: "Prove your TPP performs pre-payment payee verification through the API Hub and handles each name-match verdict the Hub returns.",
        url: `${BASE}/functional/confirmation-of-payee`,
        tags: ["Yes", "Partial", "No"]
      },
      {
        category: "Insurance",
        title: "Insurance Data Sharing",
        desc: "Evidence your TPP consumes the Insurance Data Sharing endpoints through the API Hub across the insurance policy types you support.",
        url: `${BASE}/functional/insurance-data-sharing`,
        tags: ["Policies", "Motor", "Health", "Travel"]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcCertLanding = __unplugin_components_0;
      _push(ssrRenderComponent(_component_FcCertLanding, mergeProps({
        audience: "TPP",
        title: "Functional Certification",
        lede: "Functional Certification proves your TPP consumes Open Finance APIs through the API Hub correctly — the right consent, the endpoints you call, and evidence retrieved from the sandbox: the AlTareq Model Bank for banking, the AlTareq Model Insurer for insurance. Choose the area you are submitting evidence for below; each area's page explains what the evidence is and how to produce it, then its portal builds your submission for you.",
        cards
      }, _attrs), null, _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/functional/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
