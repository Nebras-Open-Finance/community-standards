import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
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
const tokenRequest = `POST /token HTTP/1.1
Host: as1.[LFICODE].apihub.openfinance.ae
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&scope=insurance
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJQUzI1NiIsImtpZCI6...
`;
const createQuoteBody = `{
  "Data": {
    "QuoteReference": "tpp-ref-2026-04-001",
    "QuoteType": "New",
    "Policy": {
      "StartDate": "2026-06-01",
      "Term": "P1Y"
    },
    "Vehicle": {
      "RegistrationNumber": "A 12345",
      "Emirate": "Dubai",
      "Make": "Toyota",
      "Model": "Camry",
      "YearOfManufacture": 2022
    },
    "PolicyHolder": {
      "EmiratesId": "784-1990-XXXXXXX-X",
      "DateOfBirth": "1990-05-12"
    }
  }
}
`;
const createQuoteResponse = `{
  "data": [
    {
      "QuoteStatus": "Available",
      "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e",
      "QuoteReference": "tpp-ref-2026-04-001",
      "CreationDateTime": "2026-04-18T10:14:23Z",
      "ExpirationDateTime": "2026-05-18T10:14:23Z",
      "PlanName": "Comprehensive Plus",
      "PolicyIssuanceAllowed": {
        "CustomerVerification": false,
        "Payment": false,
        "PolicyDocuments": false
      },
      "Premium": {
        "TotalOneYearPremium": { "Currency": "AED", "Amount": "997.50" }
      }
    }
  ]
}
`;
const acceptBody = `{
  "Data": {
    "PolicyStartDate": "2026-06-01"
  },
  "Subscription": {
    "Webhook": {
      "Url": "https://tpp.example.ae/webhooks/insurance-quote-events",
      "IsActive": true
    }
  }
}
`;
const policyIssuedEvent = `{
  "QuoteStatus": "PolicyIssued",
  "InsurancePolicyId": "pol-2026-000457"
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
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-cdd0e4b3><section class="ed-doc__hero" data-v-cdd0e4b3><div class="ed-doc__inner" data-v-cdd0e4b3><div class="ed-doc__eyebrow" data-v-cdd0e4b3><span class="ed-doc__eyebrow-dash" data-v-cdd0e4b3></span> TPP · Insurance · Quotation · LFI-Led </div><h1 class="ed-doc__title" data-v-cdd0e4b3> LFI-Led Flow <span class="ed-doc__read" data-v-cdd0e4b3>6 min read</span></h1><p class="ed-doc__lede" data-v-cdd0e4b3> You collect quote inputs in your app and hand the customer to the LFI on accept. The LFI hosts customer verification, payment, and document delivery. Your role after acceptance is to observe status events — either via webhook subscription or polling — and surface progress to the customer. </p></div></section>`);
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
        id: "token",
        num: "02",
        color: "var(--at-gold, #b08800)",
        eyebrow: "Step 1 — Client credentials",
        title: "Obtain an access token",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Authenticate with the Client Credentials Grant using a signed client assertion. Request the <code data-v-cdd0e4b3${_scopeId2}>insurance</code> scope. `);
                } else {
                  return [
                    createTextVNode(" Authenticate with the Client Credentials Grant using a signed client assertion. Request the "),
                    createVNode("code", null, "insurance"),
                    createTextVNode(" scope. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: tokenRequest,
              lang: "http",
              filename: "POST /token"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The returned <code data-v-cdd0e4b3${_scopeId2}>access_token</code> is valid for all Insurance Quotation calls until expiry. There is no per-customer token in this flow. `);
                } else {
                  return [
                    createTextVNode(" The returned "),
                    createVNode("code", null, "access_token"),
                    createTextVNode(" is valid for all Insurance Quotation calls until expiry. There is no per-customer token in this flow. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Authenticate with the Client Credentials Grant using a signed client assertion. Request the "),
                  createVNode("code", null, "insurance"),
                  createTextVNode(" scope. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: tokenRequest,
                lang: "http",
                filename: "POST /token"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The returned "),
                  createVNode("code", null, "access_token"),
                  createTextVNode(" is valid for all Insurance Quotation calls until expiry. There is no per-customer token in this flow. ")
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
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 2 — POST /{type}-insurance-quotes",
        title: "Request a quote",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Send the quote request as an <code data-v-cdd0e4b3${_scopeId2}>application/jwt</code> signed Request JWT. The body carries a <code data-v-cdd0e4b3${_scopeId2}>QuoteReference</code> you generate (for your own tracking), a <code data-v-cdd0e4b3${_scopeId2}>QuoteType</code> of <code data-v-cdd0e4b3${_scopeId2}>New</code>, <code data-v-cdd0e4b3${_scopeId2}>Renewal</code>, or <code data-v-cdd0e4b3${_scopeId2}>Switch</code>, and sector-specific risk and policy holder data. `);
                } else {
                  return [
                    createTextVNode(" Send the quote request as an "),
                    createVNode("code", null, "application/jwt"),
                    createTextVNode(" signed Request JWT. The body carries a "),
                    createVNode("code", null, "QuoteReference"),
                    createTextVNode(" you generate (for your own tracking), a "),
                    createVNode("code", null, "QuoteType"),
                    createTextVNode(" of "),
                    createVNode("code", null, "New"),
                    createTextVNode(", "),
                    createVNode("code", null, "Renewal"),
                    createTextVNode(", or "),
                    createVNode("code", null, "Switch"),
                    createTextVNode(", and sector-specific risk and policy holder data. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: createQuoteBody,
              lang: "json",
              filename: "POST /motor-insurance-quotes (decoded JWT body)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI returns <code data-v-cdd0e4b3${_scopeId2}>201</code> with one or more quotes, or <code data-v-cdd0e4b3${_scopeId2}>204</code> if it declines to quote. Each entry includes a <code data-v-cdd0e4b3${_scopeId2}>QuoteId</code> (LFI-minted) you use for subsequent calls. `);
                } else {
                  return [
                    createTextVNode(" The LFI returns "),
                    createVNode("code", null, "201"),
                    createTextVNode(" with one or more quotes, or "),
                    createVNode("code", null, "204"),
                    createTextVNode(" if it declines to quote. Each entry includes a "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(" (LFI-minted) you use for subsequent calls. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: createQuoteResponse,
              lang: "json",
              filename: "201 response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "QuoteId vs QuoteReference"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-cdd0e4b3${_scopeId2}><code data-v-cdd0e4b3${_scopeId2}>QuoteId</code> is the LFI’s identifier — required for every subsequent call. <code data-v-cdd0e4b3${_scopeId2}>QuoteReference</code> is your own tracking identifier, echoed back by the LFI so you can correlate quotes to your internal session. Persist both. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("code", null, "QuoteId"),
                      createTextVNode(" is the LFI’s identifier — required for every subsequent call. "),
                      createVNode("code", null, "QuoteReference"),
                      createTextVNode(" is your own tracking identifier, echoed back by the LFI so you can correlate quotes to your internal session. Persist both. ")
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
                  createTextVNode(" Send the quote request as an "),
                  createVNode("code", null, "application/jwt"),
                  createTextVNode(" signed Request JWT. The body carries a "),
                  createVNode("code", null, "QuoteReference"),
                  createTextVNode(" you generate (for your own tracking), a "),
                  createVNode("code", null, "QuoteType"),
                  createTextVNode(" of "),
                  createVNode("code", null, "New"),
                  createTextVNode(", "),
                  createVNode("code", null, "Renewal"),
                  createTextVNode(", or "),
                  createVNode("code", null, "Switch"),
                  createTextVNode(", and sector-specific risk and policy holder data. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: createQuoteBody,
                lang: "json",
                filename: "POST /motor-insurance-quotes (decoded JWT body)"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI returns "),
                  createVNode("code", null, "201"),
                  createTextVNode(" with one or more quotes, or "),
                  createVNode("code", null, "204"),
                  createTextVNode(" if it declines to quote. Each entry includes a "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(" (LFI-minted) you use for subsequent calls. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: createQuoteResponse,
                lang: "json",
                filename: "201 response"
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "QuoteId vs QuoteReference"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(" is the LFI’s identifier — required for every subsequent call. "),
                    createVNode("code", null, "QuoteReference"),
                    createTextVNode(" is your own tracking identifier, echoed back by the LFI so you can correlate quotes to your internal session. Persist both. ")
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
        id: "accept",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 3 — PATCH Accept Quote",
        title: "Accept and subscribe to events",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Customer picks a quote in your UI. PATCH the chosen <code data-v-cdd0e4b3${_scopeId2}>QuoteId</code> with the accept data and a <code data-v-cdd0e4b3${_scopeId2}>Subscription.Webhook</code> object if you want event notifications. Send as a signed <code data-v-cdd0e4b3${_scopeId2}>application/jwt</code>. `);
                } else {
                  return [
                    createTextVNode(" Customer picks a quote in your UI. PATCH the chosen "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(" with the accept data and a "),
                    createVNode("code", null, "Subscription.Webhook"),
                    createTextVNode(" object if you want event notifications. Send as a signed "),
                    createVNode("code", null, "application/jwt"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: acceptBody,
              lang: "json",
              filename: "PATCH /motor-insurance-quotes/{QuoteId} (decoded)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In LFI-Led mode the LFI responds <code data-v-cdd0e4b3${_scopeId2}>204 No Content</code>. The customer is now in the LFI’s hosted journey. Your app should surface a &quot;your application is being processed&quot; state and wait for the first event. `);
                } else {
                  return [
                    createTextVNode(" In LFI-Led mode the LFI responds "),
                    createVNode("code", null, "204 No Content"),
                    createTextVNode('. The customer is now in the LFI’s hosted journey. Your app should surface a "your application is being processed" state and wait for the first event. ')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Customer picks a quote in your UI. PATCH the chosen "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(" with the accept data and a "),
                  createVNode("code", null, "Subscription.Webhook"),
                  createTextVNode(" object if you want event notifications. Send as a signed "),
                  createVNode("code", null, "application/jwt"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: acceptBody,
                lang: "json",
                filename: "PATCH /motor-insurance-quotes/{QuoteId} (decoded)"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" In LFI-Led mode the LFI responds "),
                  createVNode("code", null, "204 No Content"),
                  createTextVNode('. The customer is now in the LFI’s hosted journey. Your app should surface a "your application is being processed" state and wait for the first event. ')
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "handoff",
        num: "05",
        color: "var(--at-violet, #6d28d9)",
        eyebrow: "Step 4 — Customer handoff",
        title: "Redirect the customer to the LFI",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The mechanism for handing the customer off depends on the LFI — typically a hosted application URL returned at quote creation time or out-of-band. From this point until the <code data-v-cdd0e4b3${_scopeId2}>PolicyIssued</code> event, the customer interacts with the LFI’s screens, not yours. `);
                } else {
                  return [
                    createTextVNode(" The mechanism for handing the customer off depends on the LFI — typically a hosted application URL returned at quote creation time or out-of-band. From this point until the "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" event, the customer interacts with the LFI’s screens, not yours. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Your app receives <code data-v-cdd0e4b3${_scopeId2}>ApplicationPending</code> (and any interim status updates the LFI emits) through the webhook. Surface them in the customer’s timeline so they can re-enter your app and see where their application has reached. `);
                } else {
                  return [
                    createTextVNode(" Your app receives "),
                    createVNode("code", null, "ApplicationPending"),
                    createTextVNode(" (and any interim status updates the LFI emits) through the webhook. Surface them in the customer’s timeline so they can re-enter your app and see where their application has reached. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The mechanism for handing the customer off depends on the LFI — typically a hosted application URL returned at quote creation time or out-of-band. From this point until the "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" event, the customer interacts with the LFI’s screens, not yours. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Your app receives "),
                  createVNode("code", null, "ApplicationPending"),
                  createTextVNode(" (and any interim status updates the LFI emits) through the webhook. Surface them in the customer’s timeline so they can re-enter your app and see where their application has reached. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "receive-events",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Step 5 — Receive lifecycle events",
        title: "Handle the status sequence",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Events arrive at your webhook in this typical order: `);
                } else {
                  return [
                    createTextVNode(" Events arrive at your webhook in this typical order: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cdd0e4b3${_scopeId2}><code data-v-cdd0e4b3${_scopeId2}>ApplicationPending</code> — LFI has registered the application.</li><li data-v-cdd0e4b3${_scopeId2}>(optional intermediate events with <code data-v-cdd0e4b3${_scopeId2}>BrokerInstructions</code>) — LFI surfacing status the customer needs to see.</li><li data-v-cdd0e4b3${_scopeId2}><code data-v-cdd0e4b3${_scopeId2}>PolicyIssued</code> — carries the <code data-v-cdd0e4b3${_scopeId2}>InsurancePolicyId</code>.</li><li data-v-cdd0e4b3${_scopeId2}><code data-v-cdd0e4b3${_scopeId2}>Completed</code> — finalised premium, term, and commission. Terminal event.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("code", null, "ApplicationPending"),
                      createTextVNode(" — LFI has registered the application.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("(optional intermediate events with "),
                      createVNode("code", null, "BrokerInstructions"),
                      createTextVNode(") — LFI surfacing status the customer needs to see.")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "PolicyIssued"),
                      createTextVNode(" — carries the "),
                      createVNode("code", null, "InsurancePolicyId"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("code", null, "Completed"),
                      createTextVNode(" — finalised premium, term, and commission. Terminal event.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Verify each event’s signature and dedupe by <code data-v-cdd0e4b3${_scopeId2}>QuoteId</code>. The <code data-v-cdd0e4b3${_scopeId2}>PolicyIssued</code> event in LFI-Led mode carries only <code data-v-cdd0e4b3${_scopeId2}>InsurancePolicyId</code> — the LFI has delivered the policy documents directly to the customer through its hosted journey. `);
                } else {
                  return [
                    createTextVNode(" Verify each event’s signature and dedupe by "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(". The "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" event in LFI-Led mode carries only "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" — the LFI has delivered the policy documents directly to the customer through its hosted journey. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: policyIssuedEvent,
              lang: "json",
              filename: "PolicyIssued event (LFI-Led)"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Events arrive at your webhook in this typical order: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("code", null, "ApplicationPending"),
                    createTextVNode(" — LFI has registered the application.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("(optional intermediate events with "),
                    createVNode("code", null, "BrokerInstructions"),
                    createTextVNode(") — LFI surfacing status the customer needs to see.")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" — carries the "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("code", null, "Completed"),
                    createTextVNode(" — finalised premium, term, and commission. Terminal event.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Verify each event’s signature and dedupe by "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(". The "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" event in LFI-Led mode carries only "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" — the LFI has delivered the policy documents directly to the customer through its hosted journey. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: policyIssuedEvent,
                lang: "json",
                filename: "PolicyIssued event (LFI-Led)"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "create-policy",
        num: "07",
        color: "var(--at-gold, #b08800)",
        eyebrow: "Step 6 — POST /{type}-insurance-policies",
        title: "Issue the policy",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After the customer has progressed through the LFI’s hosted KYC and payment, your app calls POST to formally create the policy resource. In LFI-Led mode the body is minimal — just the <code data-v-cdd0e4b3${_scopeId2}>QuoteId</code>. The LFI runs its issuance and responds <code data-v-cdd0e4b3${_scopeId2}>201 Created</code>. `);
                } else {
                  return [
                    createTextVNode(" After the customer has progressed through the LFI’s hosted KYC and payment, your app calls POST to formally create the policy resource. In LFI-Led mode the body is minimal — just the "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(". The LFI runs its issuance and responds "),
                    createVNode("code", null, "201 Created"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The final <code data-v-cdd0e4b3${_scopeId2}>InsurancePolicyId</code> arrives via the <code data-v-cdd0e4b3${_scopeId2}>PolicyIssued</code> webhook event, not in this response body. Retries are safe: the LFI is required to return the same policy reference for the same <code data-v-cdd0e4b3${_scopeId2}>QuoteId</code>. `);
                } else {
                  return [
                    createTextVNode(" The final "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" arrives via the "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" webhook event, not in this response body. Retries are safe: the LFI is required to return the same policy reference for the same "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After the customer has progressed through the LFI’s hosted KYC and payment, your app calls POST to formally create the policy resource. In LFI-Led mode the body is minimal — just the "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(". The LFI runs its issuance and responds "),
                  createVNode("code", null, "201 Created"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The final "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" arrives via the "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" webhook event, not in this response body. Retries are safe: the LFI is required to return the same policy reference for the same "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "completion",
        num: "08",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 7 — Completed",
        title: "Surface the final policy to the customer",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` On the <code data-v-cdd0e4b3${_scopeId2}>Completed</code> event, finalise the customer-facing timeline: policy is live, documents are with the customer (delivered by the LFI), and any commission owed is being processed via <code data-v-cdd0e4b3${_scopeId2}>Commission.PaymentMethod</code>. `);
                } else {
                  return [
                    createTextVNode(" On the "),
                    createVNode("code", null, "Completed"),
                    createTextVNode(" event, finalise the customer-facing timeline: policy is live, documents are with the customer (delivered by the LFI), and any commission owed is being processed via "),
                    createVNode("code", null, "Commission.PaymentMethod"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Manage subscription lifecycle in your own systems — you can let the subscription lapse (it’s tied to the <code data-v-cdd0e4b3${_scopeId2}>QuoteId</code>) or PATCH with <code data-v-cdd0e4b3${_scopeId2}>IsActive: false</code> if you explicitly want to stop delivery (for example, before deprovisioning a webhook URL). `);
                } else {
                  return [
                    createTextVNode(" Manage subscription lifecycle in your own systems — you can let the subscription lapse (it’s tied to the "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(") or PATCH with "),
                    createVNode("code", null, "IsActive: false"),
                    createTextVNode(" if you explicitly want to stop delivery (for example, before deprovisioning a webhook URL). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" On the "),
                  createVNode("code", null, "Completed"),
                  createTextVNode(" event, finalise the customer-facing timeline: policy is live, documents are with the customer (delivered by the LFI), and any commission owed is being processed via "),
                  createVNode("code", null, "Commission.PaymentMethod"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Manage subscription lifecycle in your own systems — you can let the subscription lapse (it’s tied to the "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(") or PATCH with "),
                  createVNode("code", null, "IsActive: false"),
                  createTextVNode(" if you explicitly want to stop delivery (for example, before deprovisioning a webhook URL). ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/quotation/api-guide/lfi-led.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lfiLed = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cdd0e4b3"]]);
export {
  lfiLed as default
};
