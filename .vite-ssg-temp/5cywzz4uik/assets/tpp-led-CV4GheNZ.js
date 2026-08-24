import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as _sfc_main$1 } from "./APIFlowsInsuranceQuotationTPPLed-CZVWUcOK.js";
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
const acceptResponse = `{
  "data": {
    "PolicyIssuanceAllowed": {
      "CustomerVerification": true,
      "Payment": true,
      "PolicyDocuments": true
    }
  }
}
`;
const applicationApprovedPatch = `{
  "QuoteStatus": "ApplicationApproved",
  "BrokerInstructions": [
    {
      "ActionRequired": "Customer must complete premium payment at the LFI-hosted payment page.",
      "Url": "https://pay.examplelfi.ae/checkout/sess-c93e1f4a"
    }
  ]
}
`;
const policyIssuedWithDocsPatch = `{
  "QuoteStatus": "PolicyIssued",
  "Documents": [
    {
      "Type": "Policy Booklet",
      "FileName": "policy-booklet.pdf",
      "ContentType": "application/pdf",
      "Content": "JVBERi0xLjQKJeLjz9MKMyAwI...",
      "HashType": "SHA256",
      "Hash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
    },
    {
      "Type": "Terms & Conditions",
      "FileName": "terms.pdf",
      "ContentType": "application/pdf",
      "Content": "JVBERi0xLjQKJeLjz9MKMyAwI...",
      "HashType": "SHA256",
      "Hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ]
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tpp-led",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsInsuranceQuotationTPPLed = _sfc_main$1;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-ea9615d1><section class="ed-doc__hero" data-v-ea9615d1><div class="ed-doc__inner" data-v-ea9615d1><div class="ed-doc__eyebrow" data-v-ea9615d1><span class="ed-doc__eyebrow-dash" data-v-ea9615d1></span> LFI · Insurance · Quotation · TPP-Led </div><h1 class="ed-doc__title" data-v-ea9615d1> TPP-Led Flow <span class="ed-doc__read" data-v-ea9615d1>7 min read</span></h1><p class="ed-doc__lede" data-v-ea9615d1> The TPP collects KYC in its own UI and surfaces an LFI-hosted payment URL to the customer. Your LFI is responsible for underwriting, premium pricing, payment hosting, and policy document generation — but customer interaction outside the payment page lives entirely with the TPP. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "flow",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "End-to-end sequence",
        title: "TPP-Led flow",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Insurance Quotation — TPP-Led Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsInsuranceQuotationTPPLed, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsInsuranceQuotationTPPLed)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Insurance Quotation — TPP-Led Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsInsuranceQuotationTPPLed)
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
                  _push3(` Create Quote behaves identically to LFI-Led mode — mint a <code data-v-ea9615d1${_scopeId2}>QuoteId</code>, run underwriting, return <code data-v-ea9615d1${_scopeId2}>201</code> with the quote details (or <code data-v-ea9615d1${_scopeId2}>204</code> to decline). The mode forks on PATCH Accept, not on Create. `);
                } else {
                  return [
                    createTextVNode(" Create Quote behaves identically to LFI-Led mode — mint a "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(", run underwriting, return "),
                    createVNode("code", null, "201"),
                    createTextVNode(" with the quote details (or "),
                    createVNode("code", null, "204"),
                    createTextVNode(" to decline). The mode forks on PATCH Accept, not on Create. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Create Quote behaves identically to LFI-Led mode — mint a "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(", run underwriting, return "),
                  createVNode("code", null, "201"),
                  createTextVNode(" with the quote details (or "),
                  createVNode("code", null, "204"),
                  createTextVNode(" to decline). The mode forks on PATCH Accept, not on Create. ")
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
        title: "Accept the quote — return PolicyIssuanceAllowed",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Respond <code data-v-ea9615d1${_scopeId2}>200</code> with <code data-v-ea9615d1${_scopeId2}>data.PolicyIssuanceAllowed</code> declaring which steps the TPP may perform. All three booleans are required. `);
                } else {
                  return [
                    createTextVNode(" Respond "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with "),
                    createVNode("code", null, "data.PolicyIssuanceAllowed"),
                    createTextVNode(" declaring which steps the TPP may perform. All three booleans are required. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: acceptResponse,
              lang: "json",
              filename: "200 OK response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Immediately after responding, PATCH the quote-log with <code data-v-ea9615d1${_scopeId2}>QuoteStatus: ApplicationPending</code> so the TPP knows the application has been registered. The TPP will then collect KYC in its own UI. `);
                } else {
                  return [
                    createTextVNode(" Immediately after responding, PATCH the quote-log with "),
                    createVNode("code", null, "QuoteStatus: ApplicationPending"),
                    createTextVNode(" so the TPP knows the application has been registered. The TPP will then collect KYC in its own UI. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Respond "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with "),
                  createVNode("code", null, "data.PolicyIssuanceAllowed"),
                  createTextVNode(" declaring which steps the TPP may perform. All three booleans are required. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: acceptResponse,
                lang: "json",
                filename: "200 OK response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Immediately after responding, PATCH the quote-log with "),
                  createVNode("code", null, "QuoteStatus: ApplicationPending"),
                  createTextVNode(" so the TPP knows the application has been registered. The TPP will then collect KYC in its own UI. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "submit-kyc",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "PATCH /{type}-insurance-quotes/{QuoteId} (second call)",
        title: "Receive the TPP's KYC submission",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The TPP submits the collected KYC by PATCHing the same quote endpoint again. The body conforms to the sector\\&#39;s accept-quote request schema (<code data-v-ea9615d1${_scopeId2}>AEInsurance.AE{Type}InsuranceQuoteAcceptQuoteRequestProperties</code>). Validate it as you would a direct application: Emirates ID checks, sanctions screening, any sector-specific underwriting confirmations. `);
                } else {
                  return [
                    createTextVNode(" The TPP submits the collected KYC by PATCHing the same quote endpoint again. The body conforms to the sector\\'s accept-quote request schema ("),
                    createVNode("code", null, "AEInsurance.AE{Type}InsuranceQuoteAcceptQuoteRequestProperties"),
                    createTextVNode("). Validate it as you would a direct application: Emirates ID checks, sanctions screening, any sector-specific underwriting confirmations. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If KYC fails, respond <code data-v-ea9615d1${_scopeId2}>400</code> with a descriptive <code data-v-ea9615d1${_scopeId2}>errorMessage</code>; the TPP will surface the error to the customer and let them retry. If KYC passes, respond <code data-v-ea9615d1${_scopeId2}>200</code> (no body) and proceed to issue the payment URL. `);
                } else {
                  return [
                    createTextVNode(" If KYC fails, respond "),
                    createVNode("code", null, "400"),
                    createTextVNode(" with a descriptive "),
                    createVNode("code", null, "errorMessage"),
                    createTextVNode("; the TPP will surface the error to the customer and let them retry. If KYC passes, respond "),
                    createVNode("code", null, "200"),
                    createTextVNode(" (no body) and proceed to issue the payment URL. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The TPP submits the collected KYC by PATCHing the same quote endpoint again. The body conforms to the sector\\'s accept-quote request schema ("),
                  createVNode("code", null, "AEInsurance.AE{Type}InsuranceQuoteAcceptQuoteRequestProperties"),
                  createTextVNode("). Validate it as you would a direct application: Emirates ID checks, sanctions screening, any sector-specific underwriting confirmations. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If KYC fails, respond "),
                  createVNode("code", null, "400"),
                  createTextVNode(" with a descriptive "),
                  createVNode("code", null, "errorMessage"),
                  createTextVNode("; the TPP will surface the error to the customer and let them retry. If KYC passes, respond "),
                  createVNode("code", null, "200"),
                  createTextVNode(" (no body) and proceed to issue the payment URL. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "emit-application-approved",
        num: "05",
        color: "var(--at-gold, #b08800)",
        eyebrow: "PATCH /insurance-quote-log/{logId}",
        title: "Emit ApplicationApproved + BrokerInstructions.Url",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Generate a single-use payment URL on your LFI-hosted payment surface and emit a Pending Completion event: `);
                } else {
                  return [
                    createTextVNode(" Generate a single-use payment URL on your LFI-hosted payment surface and emit a Pending Completion event: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: applicationApprovedPatch,
              lang: "json",
              filename: "PATCH /insurance-quote-log/{logId}"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The TPP will redirect the customer to this URL. Customer payment is collected on your LFI’s page — the TPP never sees the card details. After payment success, your LFI redirects the customer back to the URL the TPP supplied (typically as part of its webhook subscription or out-of-band registration). `);
                } else {
                  return [
                    createTextVNode(" The TPP will redirect the customer to this URL. Customer payment is collected on your LFI’s page — the TPP never sees the card details. After payment success, your LFI redirects the customer back to the URL the TPP supplied (typically as part of its webhook subscription or out-of-band registration). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Single-use, time-bound"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-ea9615d1${_scopeId2}> Invalidate the URL after first redemption or after a session window of 15–30 minutes. The TPP MUST NOT cache or replay it. If the customer abandons and returns later, you can emit a fresh <code data-v-ea9615d1${_scopeId2}>PaymentRequired</code> event with a new URL. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Invalidate the URL after first redemption or after a session window of 15–30 minutes. The TPP MUST NOT cache or replay it. If the customer abandons and returns later, you can emit a fresh "),
                      createVNode("code", null, "PaymentRequired"),
                      createTextVNode(" event with a new URL. ")
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
                  createTextVNode(" Generate a single-use payment URL on your LFI-hosted payment surface and emit a Pending Completion event: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: applicationApprovedPatch,
                lang: "json",
                filename: "PATCH /insurance-quote-log/{logId}"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The TPP will redirect the customer to this URL. Customer payment is collected on your LFI’s page — the TPP never sees the card details. After payment success, your LFI redirects the customer back to the URL the TPP supplied (typically as part of its webhook subscription or out-of-band registration). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Single-use, time-bound"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Invalidate the URL after first redemption or after a session window of 15–30 minutes. The TPP MUST NOT cache or replay it. If the customer abandons and returns later, you can emit a fresh "),
                    createVNode("code", null, "PaymentRequired"),
                    createTextVNode(" event with a new URL. ")
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
        id: "create-policy",
        num: "06",
        color: "var(--at-violet, #6d28d9)",
        eyebrow: "POST /{type}-insurance-policies",
        title: "Issue the policy from the KYC + payment-confirmed quote",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once payment is confirmed, the TPP calls POST to create the policy. The body carries the originating <code data-v-ea9615d1${_scopeId2}>QuoteId</code> plus any additional data your LFI requires (most KYC was already submitted via the second PATCH). Issue the policy and respond <code data-v-ea9615d1${_scopeId2}>201</code>. `);
                } else {
                  return [
                    createTextVNode(" Once payment is confirmed, the TPP calls POST to create the policy. The body carries the originating "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(" plus any additional data your LFI requires (most KYC was already submitted via the second PATCH). Issue the policy and respond "),
                    createVNode("code", null, "201"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If the TPP retries with the same <code data-v-ea9615d1${_scopeId2}>QuoteId</code>, return the same policy reference — policy creation MUST be idempotent. `);
                } else {
                  return [
                    createTextVNode(" If the TPP retries with the same "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(", return the same policy reference — policy creation MUST be idempotent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once payment is confirmed, the TPP calls POST to create the policy. The body carries the originating "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(" plus any additional data your LFI requires (most KYC was already submitted via the second PATCH). Issue the policy and respond "),
                  createVNode("code", null, "201"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If the TPP retries with the same "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(", return the same policy reference — policy creation MUST be idempotent. ")
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
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "PATCH /insurance-quote-log/{logId}",
        title: "Emit PolicyIssued + Documents",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In TPP-Led mode the TPP is the document delivery channel — your LFI MUST NOT email or post documents to the customer directly. Attach every customer-facing document (Policy Booklet, Terms &amp; Conditions, IPID, etc.) as base64-encoded <code data-v-ea9615d1${_scopeId2}>Documents</code> entries with SHA-256 hashes for integrity verification. `);
                } else {
                  return [
                    createTextVNode(" In TPP-Led mode the TPP is the document delivery channel — your LFI MUST NOT email or post documents to the customer directly. Attach every customer-facing document (Policy Booklet, Terms & Conditions, IPID, etc.) as base64-encoded "),
                    createVNode("code", null, "Documents"),
                    createTextVNode(" entries with SHA-256 hashes for integrity verification. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: policyIssuedWithDocsPatch,
              lang: "json",
              filename: "PATCH /insurance-quote-log/{logId}"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Documents MUST be PDFs (<code data-v-ea9615d1${_scopeId2}>application/pdf</code>) or images (<code data-v-ea9615d1${_scopeId2}>image/jpeg</code>, <code data-v-ea9615d1${_scopeId2}>image/png</code>). The TPP verifies each <code data-v-ea9615d1${_scopeId2}>Hash</code> against the decoded <code data-v-ea9615d1${_scopeId2}>Content</code> before surfacing to the customer. `);
                } else {
                  return [
                    createTextVNode(" Documents MUST be PDFs ("),
                    createVNode("code", null, "application/pdf"),
                    createTextVNode(") or images ("),
                    createVNode("code", null, "image/jpeg"),
                    createTextVNode(", "),
                    createVNode("code", null, "image/png"),
                    createTextVNode("). The TPP verifies each "),
                    createVNode("code", null, "Hash"),
                    createTextVNode(" against the decoded "),
                    createVNode("code", null, "Content"),
                    createTextVNode(" before surfacing to the customer. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" In TPP-Led mode the TPP is the document delivery channel — your LFI MUST NOT email or post documents to the customer directly. Attach every customer-facing document (Policy Booklet, Terms & Conditions, IPID, etc.) as base64-encoded "),
                  createVNode("code", null, "Documents"),
                  createTextVNode(" entries with SHA-256 hashes for integrity verification. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: policyIssuedWithDocsPatch,
                lang: "json",
                filename: "PATCH /insurance-quote-log/{logId}"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Documents MUST be PDFs ("),
                  createVNode("code", null, "application/pdf"),
                  createTextVNode(") or images ("),
                  createVNode("code", null, "image/jpeg"),
                  createTextVNode(", "),
                  createVNode("code", null, "image/png"),
                  createTextVNode("). The TPP verifies each "),
                  createVNode("code", null, "Hash"),
                  createTextVNode(" against the decoded "),
                  createVNode("code", null, "Content"),
                  createTextVNode(" before surfacing to the customer. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "emit-completed",
        num: "08",
        color: "var(--at-navy)",
        eyebrow: "PATCH /insurance-quote-log/{logId}",
        title: "Emit Completed and close the lifecycle",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Same as LFI-Led: emit a final Completed Status event with the finalised premium breakdown, policy term, and (where applicable) the <code data-v-ea9615d1${_scopeId2}>Commission</code> due to the TPP. The Hub rejects any subsequent PATCH for this <code data-v-ea9615d1${_scopeId2}>logId</code>. `);
                } else {
                  return [
                    createTextVNode(" Same as LFI-Led: emit a final Completed Status event with the finalised premium breakdown, policy term, and (where applicable) the "),
                    createVNode("code", null, "Commission"),
                    createTextVNode(" due to the TPP. The Hub rejects any subsequent PATCH for this "),
                    createVNode("code", null, "logId"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-ea9615d1${_scopeId2}>Commission.PaymentMethod</code> controls how the LFI pays the TPP: <code data-v-ea9615d1${_scopeId2}>DirectToTPP</code> for direct bilateral settlement, or <code data-v-ea9615d1${_scopeId2}>ThroughAPIHub</code> for Hub-routed payment. `);
                } else {
                  return [
                    createVNode("code", null, "Commission.PaymentMethod"),
                    createTextVNode(" controls how the LFI pays the TPP: "),
                    createVNode("code", null, "DirectToTPP"),
                    createTextVNode(" for direct bilateral settlement, or "),
                    createVNode("code", null, "ThroughAPIHub"),
                    createTextVNode(" for Hub-routed payment. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Same as LFI-Led: emit a final Completed Status event with the finalised premium breakdown, policy term, and (where applicable) the "),
                  createVNode("code", null, "Commission"),
                  createTextVNode(" due to the TPP. The Hub rejects any subsequent PATCH for this "),
                  createVNode("code", null, "logId"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Commission.PaymentMethod"),
                  createTextVNode(" controls how the LFI pays the TPP: "),
                  createVNode("code", null, "DirectToTPP"),
                  createTextVNode(" for direct bilateral settlement, or "),
                  createVNode("code", null, "ThroughAPIHub"),
                  createTextVNode(" for Hub-routed payment. ")
                ]),
                _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/api-guide/tpp-led.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tppLed = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea9615d1"]]);
export {
  tppLed as default
};
