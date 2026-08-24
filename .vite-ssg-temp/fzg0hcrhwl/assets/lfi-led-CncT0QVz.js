import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as _sfc_main$1 } from "./APIFlowsInsuranceQuotationLFILed-DK9ujZTU.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const policiesPostBody = `{
  "data": {
    "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e"
  }
}
`;
const policyIssuedPatch = `{
  "QuoteStatus": "PolicyIssued",
  "InsurancePolicyId": "pol-2026-000457"
}
`;
const completedPatch = `{
  "QuoteStatus": "Completed",
  "PolicyStartDate": "2026-06-01",
  "PolicyEndDate": "2027-05-31",
  "PolicyTerm": "P1Y",
  "Premium": {
    "OneYearPremiumExcludingVAT": { "Currency": "AED", "Amount": "950.00" },
    "VATAmount": { "Currency": "AED", "Amount": "47.50" },
    "TotalOneYearPremium": { "Currency": "AED", "Amount": "997.50" }
  },
  "CustomerPaidInFull": true,
  "PolicyCountrySubDivision": "Dubai"
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "lfi-led",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsInsuranceQuotationLFILed = _sfc_main$1;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e7c385a7><section class="ed-doc__hero" data-v-e7c385a7><div class="ed-doc__inner" data-v-e7c385a7><div class="ed-doc__eyebrow" data-v-e7c385a7><span class="ed-doc__eyebrow-dash" data-v-e7c385a7></span> LFI · Insurance · Quotation · LFI-Led </div><h1 class="ed-doc__title" data-v-e7c385a7> LFI-Led Flow <span class="ed-doc__read" data-v-e7c385a7>5 min read</span></h1><p class="ed-doc__lede" data-v-e7c385a7> The TPP creates a quote and hands the customer to your LFI on accept. Your LFI hosts customer verification, payment, and document delivery; the TPP’s only role after acceptance is to observe lifecycle events through the quote-log. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "flow",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "End-to-end sequence",
        title: "LFI-Led flow",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Insurance Quotation — LFI-Led Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsInsuranceQuotationLFILed, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsInsuranceQuotationLFILed)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Insurance Quotation — LFI-Led Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsInsuranceQuotationLFILed)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "create-quote",
        num: "02",
        color: "var(--at-gold, #b08800)",
        eyebrow: "POST /{type}-insurance-quotes",
        title: "Underwrite and return one or more quotes",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Hub validates the TPP’s access token, signed request, and schema, then proxies to your endpoint with the sector slug in the path. Receive the quote request, run your underwriting, and respond with <code data-v-e7c385a7${_scopeId2}>201</code> + <code data-v-e7c385a7${_scopeId2}>data: [...]</code> for one or more quotes, or <code data-v-e7c385a7${_scopeId2}>204</code> to decline. `);
                } else {
                  return [
                    createTextVNode(" The Hub validates the TPP’s access token, signed request, and schema, then proxies to your endpoint with the sector slug in the path. Receive the quote request, run your underwriting, and respond with "),
                    createVNode("code", null, "201"),
                    createTextVNode(" + "),
                    createVNode("code", null, "data: [...]"),
                    createTextVNode(" for one or more quotes, or "),
                    createVNode("code", null, "204"),
                    createTextVNode(" to decline. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e7c385a7${_scopeId}>QuoteId minting</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Mint a unique <code data-v-e7c385a7${_scopeId2}>QuoteId</code> per quote — UUIDv4 is recommended. Persist it for at least the policy retention period of the sector. The <code data-v-e7c385a7${_scopeId2}>QuoteId</code> threads the rest of the lifecycle: TPP retrievals, the accept PATCH, policy creation, and every status event you emit to the quote-log. `);
                } else {
                  return [
                    createTextVNode(" Mint a unique "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(" per quote — UUIDv4 is recommended. Persist it for at least the policy retention period of the sector. The "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(" threads the rest of the lifecycle: TPP retrievals, the accept PATCH, policy creation, and every status event you emit to the quote-log. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Hub validates the TPP’s access token, signed request, and schema, then proxies to your endpoint with the sector slug in the path. Receive the quote request, run your underwriting, and respond with "),
                  createVNode("code", null, "201"),
                  createTextVNode(" + "),
                  createVNode("code", null, "data: [...]"),
                  createTextVNode(" for one or more quotes, or "),
                  createVNode("code", null, "204"),
                  createTextVNode(" to decline. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "QuoteId minting"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Mint a unique "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(" per quote — UUIDv4 is recommended. Persist it for at least the policy retention period of the sector. The "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(" threads the rest of the lifecycle: TPP retrievals, the accept PATCH, policy creation, and every status event you emit to the quote-log. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "accept",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "PATCH /{type}-insurance-quotes/{QuoteId}",
        title: "Accept the quote — return 204",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For LFI-Led mode, respond <code data-v-e7c385a7${_scopeId2}>204 No Content</code>. You are signalling: the TPP has done its part; the LFI will drive everything from here. Then immediately PATCH the quote-log with <code data-v-e7c385a7${_scopeId2}>ApplicationPending</code> so the TPP (subscribed or polling) sees the application has been registered. `);
                } else {
                  return [
                    createTextVNode(" For LFI-Led mode, respond "),
                    createVNode("code", null, "204 No Content"),
                    createTextVNode(". You are signalling: the TPP has done its part; the LFI will drive everything from here. Then immediately PATCH the quote-log with "),
                    createVNode("code", null, "ApplicationPending"),
                    createTextVNode(" so the TPP (subscribed or polling) sees the application has been registered. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Subscription is for the Hub, not for you"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e7c385a7${_scopeId2}> The <code data-v-e7c385a7${_scopeId2}>Subscription.Webhook</code> object on the PATCH body is consumed by the Hub for its own event delivery to the TPP. Your LFI MUST NOT act on it — just emit quote-log status updates as normal, and the Hub fans them out. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("code", null, "Subscription.Webhook"),
                      createTextVNode(" object on the PATCH body is consumed by the Hub for its own event delivery to the TPP. Your LFI MUST NOT act on it — just emit quote-log status updates as normal, and the Hub fans them out. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For LFI-Led mode, respond "),
                  createVNode("code", null, "204 No Content"),
                  createTextVNode(". You are signalling: the TPP has done its part; the LFI will drive everything from here. Then immediately PATCH the quote-log with "),
                  createVNode("code", null, "ApplicationPending"),
                  createTextVNode(" so the TPP (subscribed or polling) sees the application has been registered. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Subscription is for the Hub, not for you"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The "),
                    createVNode("code", null, "Subscription.Webhook"),
                    createTextVNode(" object on the PATCH body is consumed by the Hub for its own event delivery to the TPP. Your LFI MUST NOT act on it — just emit quote-log status updates as normal, and the Hub fans them out. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "hosted-flow",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "LFI-hosted screens",
        title: "Your LFI hosts the customer through to issuance",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After PATCH Accept, your LFI presents the customer with the quote summary, KYC capture, and payment screens. These are entirely under your control — the Hub is not in the loop. See the <a href="../user-journeys" data-v-e7c385a7${_scopeId2}>User Journeys</a> page for the screens you typically host. `);
                } else {
                  return [
                    createTextVNode(" After PATCH Accept, your LFI presents the customer with the quote summary, KYC capture, and payment screens. These are entirely under your control — the Hub is not in the loop. See the "),
                    createVNode("a", { href: "../user-journeys" }, "User Journeys"),
                    createTextVNode(" page for the screens you typically host. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The TPP’s view of progress comes from the quote-log events you emit at each transition. You can emit additional intermediate events with <code data-v-e7c385a7${_scopeId2}>BrokerInstructions[].Reason</code> explaining customer-facing status the TPP should surface (e.g. &quot;Document upload required&quot;, &quot;Awaiting payment confirmation&quot;). `);
                } else {
                  return [
                    createTextVNode(" The TPP’s view of progress comes from the quote-log events you emit at each transition. You can emit additional intermediate events with "),
                    createVNode("code", null, "BrokerInstructions[].Reason"),
                    createTextVNode(' explaining customer-facing status the TPP should surface (e.g. "Document upload required", "Awaiting payment confirmation"). ')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After PATCH Accept, your LFI presents the customer with the quote summary, KYC capture, and payment screens. These are entirely under your control — the Hub is not in the loop. See the "),
                  createVNode("a", { href: "../user-journeys" }, "User Journeys"),
                  createTextVNode(" page for the screens you typically host. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The TPP’s view of progress comes from the quote-log events you emit at each transition. You can emit additional intermediate events with "),
                  createVNode("code", null, "BrokerInstructions[].Reason"),
                  createTextVNode(' explaining customer-facing status the TPP should surface (e.g. "Document upload required", "Awaiting payment confirmation"). ')
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "create-policy",
        num: "05",
        color: "var(--at-teal)",
        eyebrow: "POST /{type}-insurance-policies",
        title: "Issue the policy",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once your hosted flow completes (KYC passed, payment confirmed), the TPP calls POST to create the policy. In LFI-Led mode the body is minimal — just the originating <code data-v-e7c385a7${_scopeId2}>QuoteId</code>: `);
                } else {
                  return [
                    createTextVNode(" Once your hosted flow completes (KYC passed, payment confirmed), the TPP calls POST to create the policy. In LFI-Led mode the body is minimal — just the originating "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: policiesPostBody,
              lang: "json",
              filename: "POST /motor-insurance-policies"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Run your standard policy issuance. Return <code data-v-e7c385a7${_scopeId2}>201 Created</code>. The <code data-v-e7c385a7${_scopeId2}>InsurancePolicyId</code> is delivered to the TPP via the <code data-v-e7c385a7${_scopeId2}>PolicyIssued</code> event, not in this response body — this keeps the API symmetric with TPP-Led mode. `);
                } else {
                  return [
                    createTextVNode(" Run your standard policy issuance. Return "),
                    createVNode("code", null, "201 Created"),
                    createTextVNode(". The "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" is delivered to the TPP via the "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" event, not in this response body — this keeps the API symmetric with TPP-Led mode. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once your hosted flow completes (KYC passed, payment confirmed), the TPP calls POST to create the policy. In LFI-Led mode the body is minimal — just the originating "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: policiesPostBody,
                lang: "json",
                filename: "POST /motor-insurance-policies"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Run your standard policy issuance. Return "),
                  createVNode("code", null, "201 Created"),
                  createTextVNode(". The "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" is delivered to the TPP via the "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" event, not in this response body — this keeps the API symmetric with TPP-Led mode. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "emit-policy-issued",
        num: "06",
        color: "var(--at-gold, #b08800)",
        eyebrow: "PATCH /insurance-quote-log/{logId}",
        title: "Emit PolicyIssued + InsurancePolicyId",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Emit a Pending Completion event carrying the issued policy reference. In LFI-Led mode the documents stay with your LFI (you have already delivered them to the customer via your hosted screens), so only the <code data-v-e7c385a7${_scopeId2}>InsurancePolicyId</code> is needed. `);
                } else {
                  return [
                    createTextVNode(" Emit a Pending Completion event carrying the issued policy reference. In LFI-Led mode the documents stay with your LFI (you have already delivered them to the customer via your hosted screens), so only the "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" is needed. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: policyIssuedPatch,
              lang: "json",
              filename: "PATCH /insurance-quote-log/{logId}"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Emit a Pending Completion event carrying the issued policy reference. In LFI-Led mode the documents stay with your LFI (you have already delivered them to the customer via your hosted screens), so only the "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" is needed. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: policyIssuedPatch,
                lang: "json",
                filename: "PATCH /insurance-quote-log/{logId}"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "emit-completed",
        num: "07",
        color: "var(--at-violet, #6d28d9)",
        eyebrow: "PATCH /insurance-quote-log/{logId}",
        title: "Emit Completed and close the lifecycle",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After any post-issuance work has settled (commission booked, customer onboarding emails sent), emit a final Completed Status event with the finalised premium breakdown and policy term. This is the terminal event — the Hub will reject any subsequent PATCH for this <code data-v-e7c385a7${_scopeId2}>logId</code>. `);
                } else {
                  return [
                    createTextVNode(" After any post-issuance work has settled (commission booked, customer onboarding emails sent), emit a final Completed Status event with the finalised premium breakdown and policy term. This is the terminal event — the Hub will reject any subsequent PATCH for this "),
                    createVNode("code", null, "logId"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: completedPatch,
              lang: "json",
              filename: "PATCH /insurance-quote-log/{logId}"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After any post-issuance work has settled (commission booked, customer onboarding emails sent), emit a final Completed Status event with the finalised premium breakdown and policy term. This is the terminal event — the Hub will reject any subsequent PATCH for this "),
                  createVNode("code", null, "logId"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: completedPatch,
                lang: "json",
                filename: "PATCH /insurance-quote-log/{logId}"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/lfi-led.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lfiLed = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e7c385a7"]]);
export {
  lfiLed as default
};
