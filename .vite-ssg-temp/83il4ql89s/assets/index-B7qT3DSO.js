import { _ as __unplugin_components_0 } from "./FcCertLanding-BQIuvtW-.js";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const BASE = "/tech/lfi-api-hub/production/testing-certification/functional";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const cards = [
      {
        category: "Data Sharing",
        title: "Bank Data Sharing",
        desc: "Prove your Ozone Connect Data Sharing endpoints return correct, complete data — endpoint by endpoint — and that the same data flows through the API Hub to a TPP.",
        url: `${BASE}/bank-data-sharing`,
        tags: ["Accounts", "Balances", "Transactions", "Parties"]
      },
      {
        category: "Service Initiation",
        title: "Domestic Payments",
        desc: "Certify each domestic payment type your LFI supports. Every type is its own submission and its own Service Desk ticket — start with Single Instant Payment.",
        url: `${BASE}/single-instant-payment`,
        subItems: [
          { label: "Single Instant Payment", hint: "one-off instant payment across your supported rails", url: `${BASE}/single-instant-payment` },
          { label: "Variable On-Demand", hint: "variable amounts, single &amp; multiple &amp; open beneficiaries", url: `${BASE}/variable-on-demand` },
          { label: "Fixed On-Demand", hint: "fixed amount, on-demand execution", url: `${BASE}/fixed-on-demand` },
          { label: "Variable Periodic Schedule", hint: "variable amounts on a recurring schedule", url: `${BASE}/variable-periodic-schedule` },
          { label: "Fixed Periodic Schedule", hint: "fixed amount on a recurring schedule", url: `${BASE}/fixed-periodic-schedule` },
          { label: "Variable Defined Schedule", hint: "variable amounts on defined dates", url: `${BASE}/variable-defined-schedule` },
          { label: "Fixed Defined Schedule", hint: "fixed amounts on defined dates", url: `${BASE}/fixed-defined-schedule` },
          { label: "Delegated SCA", hint: "IsDelegatedAuthentication — TPP-managed payment controls", url: `${BASE}/delegated-sca` }
        ]
      },
      {
        category: "Confirmation of Payee",
        title: "Confirmation of Payee",
        desc: "Prove your Ozone Connect <code>cop-query</code> returns the right account-holder name for each match outcome, per segment, and that the API Hub surfaces the correct verdict to a TPP.",
        url: `${BASE}/confirmation-of-payee`,
        tags: ["Yes", "Partial", "No", "Not found"]
      },
      {
        category: "Insurance",
        title: "Insurance Data Sharing",
        desc: "Prove your Ozone Connect Insurance Data Sharing endpoints return correct, complete policy data — sector by sector — and that the same data flows through the API Hub to a TPP.",
        url: `${BASE}/insurance-data-sharing`,
        tags: ["Motor", "Health", "Travel", "Home"]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcCertLanding = __unplugin_components_0;
      _push(ssrRenderComponent(_component_FcCertLanding, mergeProps({
        audience: "LFI",
        title: "Functional Certification",
        lede: "Functional Certification proves your Ozone Connect implementation behaves correctly end to end — that each endpoint returns correct data, each payment reaches the right terminal status, and the same results flow through the API Hub to a TPP. Choose the area you are submitting evidence for below; each area's page explains what the evidence is and how to produce it, then its portal builds your submission ZIP for you.",
        cards
      }, _attrs), null, _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
