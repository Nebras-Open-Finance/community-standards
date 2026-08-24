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
const acceptResponseTPPLed = `{
  "data": {
    "PolicyIssuanceAllowed": {
      "CustomerVerification": true,
      "Payment": true,
      "PolicyDocuments": true
    }
  }
}
`;
const submitKycBody = `{
  "Data": {
    "PolicyStartDate": "2026-06-01",
    "PolicyHolder": {
      "EmiratesId": "784-1990-XXXXXXX-X",
      "EmiratesIdExpiryDate": "2030-01-15",
      "FullName": { "en": "Aisha Al Marri" },
      "DateOfBirth": "1990-05-12",
      "Address": {
        "AddressLine": ["Villa 12, Street 5"],
        "PostCode": "12345",
        "TownName": "Dubai",
        "CountrySubDivision": "Dubai",
        "Country": "AE"
      }
    },
    "AdditionalDeclarations": {
      "NoClaimsLastFiveYears": true
    }
  }
}
`;
const applicationApprovedEvent = `{
  "QuoteStatus": "ApplicationApproved",
  "BrokerInstructions": [
    {
      "ActionRequired": "Customer must complete premium payment at the LFI-hosted payment page.",
      "Url": "https://pay.examplelfi.ae/checkout/sess-c93e1f4a"
    }
  ]
}
`;
const policyIssuedWithDocsEvent = `{
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
const verifyHashNode = `import { createHash } from 'node:crypto'

async function verifyDocument(doc: {
  Content: string
  Hash: string
  HashType: string
}): Promise<boolean> {
  if (doc.HashType !== 'SHA256') {
    throw new Error('Unsupported HashType: ' + doc.HashType)
  }
  const bytes = Buffer.from(doc.Content, 'base64')
  const computed = createHash('sha256').update(bytes).digest('hex')
  return computed === doc.Hash
}
`;
const verifyHashPython = `import base64, hashlib

def verify_document(doc: dict) -> bool:
    if doc["HashType"] != "SHA256":
        raise ValueError(f"Unsupported HashType: {doc['HashType']}")
    raw = base64.b64decode(doc["Content"])
    return hashlib.sha256(raw).hexdigest() == doc["Hash"]
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-da834f0a><section class="ed-doc__hero" data-v-da834f0a><div class="ed-doc__inner" data-v-da834f0a><div class="ed-doc__eyebrow" data-v-da834f0a><span class="ed-doc__eyebrow-dash" data-v-da834f0a></span> TPP · Insurance · Quotation · TPP-Led </div><h1 class="ed-doc__title" data-v-da834f0a> TPP-Led Flow <span class="ed-doc__read" data-v-da834f0a>8 min read</span></h1><p class="ed-doc__lede" data-v-da834f0a> You collect quote inputs, KYC, and surface the LFI’s hosted payment URL to the customer inside your own app. Document delivery also lives with you. The LFI handles underwriting, payment hosting, and policy issuance; your TPP is the customer-facing surface for everything else. </p></div></section>`);
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
        id: "quote",
        num: "02",
        color: "var(--at-gold, #b08800)",
        eyebrow: "Steps 1–2 — Token & Quote",
        title: "Same as LFI-Led for quote creation",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Obtain a Client Credentials token (<code data-v-da834f0a${_scopeId2}>insurance</code> scope) and POST the quote request exactly as in <a href="./lfi-led" data-v-da834f0a${_scopeId2}>LFI-Led</a>. The mode is not declared on Create Quote — it’s determined by the LFI’s response to PATCH Accept. `);
                } else {
                  return [
                    createTextVNode(" Obtain a Client Credentials token ("),
                    createVNode("code", null, "insurance"),
                    createTextVNode(" scope) and POST the quote request exactly as in "),
                    createVNode("a", { href: "./lfi-led" }, "LFI-Led"),
                    createTextVNode(". The mode is not declared on Create Quote — it’s determined by the LFI’s response to PATCH Accept. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Obtain a Client Credentials token ("),
                  createVNode("code", null, "insurance"),
                  createTextVNode(" scope) and POST the quote request exactly as in "),
                  createVNode("a", { href: "./lfi-led" }, "LFI-Led"),
                  createTextVNode(". The mode is not declared on Create Quote — it’s determined by the LFI’s response to PATCH Accept. ")
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
        eyebrow: "Step 3 — PATCH Accept Quote",
        title: "Accept and discover PolicyIssuanceAllowed",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Customer picks a quote; PATCH it with the accept data and your <code data-v-da834f0a${_scopeId2}>Subscription.Webhook</code>. The LFI’s response signals whether the flow is TPP-Led: a <code data-v-da834f0a${_scopeId2}>200</code> response with <code data-v-da834f0a${_scopeId2}>data.PolicyIssuanceAllowed</code> means you are responsible for the steps listed as <code data-v-da834f0a${_scopeId2}>true</code>. `);
                } else {
                  return [
                    createTextVNode(" Customer picks a quote; PATCH it with the accept data and your "),
                    createVNode("code", null, "Subscription.Webhook"),
                    createTextVNode(". The LFI’s response signals whether the flow is TPP-Led: a "),
                    createVNode("code", null, "200"),
                    createTextVNode(" response with "),
                    createVNode("code", null, "data.PolicyIssuanceAllowed"),
                    createTextVNode(" means you are responsible for the steps listed as "),
                    createVNode("code", null, "true"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: acceptResponseTPPLed,
              lang: "json",
              filename: "200 response (TPP-Led)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` All three flags <code data-v-da834f0a${_scopeId2}>true</code> is the full TPP-Led mode. You MUST honour the declaration — do not perform a step set to <code data-v-da834f0a${_scopeId2}>false</code> even if you can technically do so. `);
                } else {
                  return [
                    createTextVNode(" All three flags "),
                    createVNode("code", null, "true"),
                    createTextVNode(" is the full TPP-Led mode. You MUST honour the declaration — do not perform a step set to "),
                    createVNode("code", null, "false"),
                    createTextVNode(" even if you can technically do so. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Customer picks a quote; PATCH it with the accept data and your "),
                  createVNode("code", null, "Subscription.Webhook"),
                  createTextVNode(". The LFI’s response signals whether the flow is TPP-Led: a "),
                  createVNode("code", null, "200"),
                  createTextVNode(" response with "),
                  createVNode("code", null, "data.PolicyIssuanceAllowed"),
                  createTextVNode(" means you are responsible for the steps listed as "),
                  createVNode("code", null, "true"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: acceptResponseTPPLed,
                lang: "json",
                filename: "200 response (TPP-Led)"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" All three flags "),
                  createVNode("code", null, "true"),
                  createTextVNode(" is the full TPP-Led mode. You MUST honour the declaration — do not perform a step set to "),
                  createVNode("code", null, "false"),
                  createTextVNode(" even if you can technically do so. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "kyc",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 4 — PATCH Submit KYC",
        title: "Collect KYC and submit to the LFI",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After <code data-v-da834f0a${_scopeId2}>ApplicationPending</code> arrives, collect the customer’s KYC in your app (see <a href="../user-journeys#tpp-led-kyc" data-v-da834f0a${_scopeId2}>User Journeys — KYC capture</a> for the screens to present). Submit by PATCHing the same quote endpoint a second time with the gathered data. `);
                } else {
                  return [
                    createTextVNode(" After "),
                    createVNode("code", null, "ApplicationPending"),
                    createTextVNode(" arrives, collect the customer’s KYC in your app (see "),
                    createVNode("a", { href: "../user-journeys#tpp-led-kyc" }, "User Journeys — KYC capture"),
                    createTextVNode(" for the screens to present). Submit by PATCHing the same quote endpoint a second time with the gathered data. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: submitKycBody,
              lang: "json",
              filename: "PATCH /motor-insurance-quotes/{QuoteId} (Submit KYC, decoded)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The body conforms to the sector’s accept-quote schema. Required fields vary by sector — consult the <a href="../open-api/patch-motor-insurance-quotes-QuoteId" data-v-da834f0a${_scopeId2}>OpenAPI spec</a>. If KYC fails, you receive <code data-v-da834f0a${_scopeId2}>400</code> with a descriptive message; surface it to the customer and allow retry. `);
                } else {
                  return [
                    createTextVNode(" The body conforms to the sector’s accept-quote schema. Required fields vary by sector — consult the "),
                    createVNode("a", { href: "../open-api/patch-motor-insurance-quotes-QuoteId" }, "OpenAPI spec"),
                    createTextVNode(". If KYC fails, you receive "),
                    createVNode("code", null, "400"),
                    createTextVNode(" with a descriptive message; surface it to the customer and allow retry. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After "),
                  createVNode("code", null, "ApplicationPending"),
                  createTextVNode(" arrives, collect the customer’s KYC in your app (see "),
                  createVNode("a", { href: "../user-journeys#tpp-led-kyc" }, "User Journeys — KYC capture"),
                  createTextVNode(" for the screens to present). Submit by PATCHing the same quote endpoint a second time with the gathered data. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: submitKycBody,
                lang: "json",
                filename: "PATCH /motor-insurance-quotes/{QuoteId} (Submit KYC, decoded)"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The body conforms to the sector’s accept-quote schema. Required fields vary by sector — consult the "),
                  createVNode("a", { href: "../open-api/patch-motor-insurance-quotes-QuoteId" }, "OpenAPI spec"),
                  createTextVNode(". If KYC fails, you receive "),
                  createVNode("code", null, "400"),
                  createTextVNode(" with a descriptive message; surface it to the customer and allow retry. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "payment-redirect",
        num: "05",
        color: "var(--at-violet, #6d28d9)",
        eyebrow: "Step 5 — ApplicationApproved event",
        title: "Redirect the customer to the LFI-hosted payment URL",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI processes KYC asynchronously and, on success, emits <code data-v-da834f0a${_scopeId2}>ApplicationApproved</code> with a <code data-v-da834f0a${_scopeId2}>BrokerInstructions[].Url</code> pointing at its hosted payment page. `);
                } else {
                  return [
                    createTextVNode(" The LFI processes KYC asynchronously and, on success, emits "),
                    createVNode("code", null, "ApplicationApproved"),
                    createTextVNode(" with a "),
                    createVNode("code", null, "BrokerInstructions[].Url"),
                    createTextVNode(" pointing at its hosted payment page. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: applicationApprovedEvent,
              lang: "json",
              filename: "ApplicationApproved event"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Redirect the customer to <code data-v-da834f0a${_scopeId2}>BrokerInstructions[0].Url</code>. They pay on the LFI’s page; the LFI redirects them back to a return URL you nominated when configuring your webhook or out-of-band with the LFI. `);
                } else {
                  return [
                    createTextVNode(" Redirect the customer to "),
                    createVNode("code", null, "BrokerInstructions[0].Url"),
                    createTextVNode(". They pay on the LFI’s page; the LFI redirects them back to a return URL you nominated when configuring your webhook or out-of-band with the LFI. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Single-use URL"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-da834f0a${_scopeId2}> Do not cache, log, or replay the URL. If the customer abandons and returns, request a fresh URL by asking the LFI to re-emit (typically via your support process or by re-triggering the flow). The LFI will emit a new <code data-v-da834f0a${_scopeId2}>PaymentRequired</code> event. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Do not cache, log, or replay the URL. If the customer abandons and returns, request a fresh URL by asking the LFI to re-emit (typically via your support process or by re-triggering the flow). The LFI will emit a new "),
                      createVNode("code", null, "PaymentRequired"),
                      createTextVNode(" event. ")
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
                  createTextVNode(" The LFI processes KYC asynchronously and, on success, emits "),
                  createVNode("code", null, "ApplicationApproved"),
                  createTextVNode(" with a "),
                  createVNode("code", null, "BrokerInstructions[].Url"),
                  createTextVNode(" pointing at its hosted payment page. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: applicationApprovedEvent,
                lang: "json",
                filename: "ApplicationApproved event"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Redirect the customer to "),
                  createVNode("code", null, "BrokerInstructions[0].Url"),
                  createTextVNode(". They pay on the LFI’s page; the LFI redirects them back to a return URL you nominated when configuring your webhook or out-of-band with the LFI. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Single-use URL"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Do not cache, log, or replay the URL. If the customer abandons and returns, request a fresh URL by asking the LFI to re-emit (typically via your support process or by re-triggering the flow). The LFI will emit a new "),
                    createVNode("code", null, "PaymentRequired"),
                    createTextVNode(" event. ")
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
        color: "var(--at-teal)",
        eyebrow: "Step 6 — POST Create Policy",
        title: "Issue the policy",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After payment confirmation (which you can correlate with the customer’s return from the LFI’s payment page or by waiting for the LFI’s next status event), call POST <code data-v-da834f0a${_scopeId2}>/{type}-insurance-policies</code> with the <code data-v-da834f0a${_scopeId2}>QuoteId</code>. The body is similar to the KYC submission but represents the formal policy creation request. `);
                } else {
                  return [
                    createTextVNode(" After payment confirmation (which you can correlate with the customer’s return from the LFI’s payment page or by waiting for the LFI’s next status event), call POST "),
                    createVNode("code", null, "/{type}-insurance-policies"),
                    createTextVNode(" with the "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(". The body is similar to the KYC submission but represents the formal policy creation request. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The LFI runs its issuance and responds <code data-v-da834f0a${_scopeId2}>201</code>. The <code data-v-da834f0a${_scopeId2}>InsurancePolicyId</code> and policy documents arrive in the subsequent <code data-v-da834f0a${_scopeId2}>PolicyIssued</code> event — not in this response body. `);
                } else {
                  return [
                    createTextVNode(" The LFI runs its issuance and responds "),
                    createVNode("code", null, "201"),
                    createTextVNode(". The "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" and policy documents arrive in the subsequent "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" event — not in this response body. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After payment confirmation (which you can correlate with the customer’s return from the LFI’s payment page or by waiting for the LFI’s next status event), call POST "),
                  createVNode("code", null, "/{type}-insurance-policies"),
                  createTextVNode(" with the "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(". The body is similar to the KYC submission but represents the formal policy creation request. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The LFI runs its issuance and responds "),
                  createVNode("code", null, "201"),
                  createTextVNode(". The "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" and policy documents arrive in the subsequent "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" event — not in this response body. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "documents",
        num: "07",
        color: "var(--at-gold, #b08800)",
        eyebrow: "Step 7 — PolicyIssued event",
        title: "Verify and surface documents to the customer",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In TPP-Led mode the <code data-v-da834f0a${_scopeId2}>PolicyIssued</code> event carries every customer-facing document the LFI would normally deliver itself. Verify each <code data-v-da834f0a${_scopeId2}>Hash</code> against the decoded <code data-v-da834f0a${_scopeId2}>Content</code> before presenting to the customer. `);
                } else {
                  return [
                    createTextVNode(" In TPP-Led mode the "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" event carries every customer-facing document the LFI would normally deliver itself. Verify each "),
                    createVNode("code", null, "Hash"),
                    createTextVNode(" against the decoded "),
                    createVNode("code", null, "Content"),
                    createTextVNode(" before presenting to the customer. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: policyIssuedWithDocsEvent,
              lang: "json",
              filename: "PolicyIssued event with Documents"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-da834f0a${_scopeId}>Hash verification</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: verifyHashNode,
              lang: "ts",
              filename: "Node — SHA-256 verification"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: verifyHashPython,
              lang: "python",
              filename: "Python — SHA-256 verification"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "Do not deliver mismatches"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-da834f0a${_scopeId2}> If a document’s computed hash does not match the supplied <code data-v-da834f0a${_scopeId2}>Hash</code>, treat the document as corrupt or tampered. Do not surface it to the customer. Log the <code data-v-da834f0a${_scopeId2}>x-fapi-interaction-id</code> from the event delivery, raise a support ticket including that ID and the <code data-v-da834f0a${_scopeId2}>QuoteId</code>, and request the LFI re-emit the event. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If a document’s computed hash does not match the supplied "),
                      createVNode("code", null, "Hash"),
                      createTextVNode(", treat the document as corrupt or tampered. Do not surface it to the customer. Log the "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(" from the event delivery, raise a support ticket including that ID and the "),
                      createVNode("code", null, "QuoteId"),
                      createTextVNode(", and request the LFI re-emit the event. ")
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
                  createTextVNode(" In TPP-Led mode the "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" event carries every customer-facing document the LFI would normally deliver itself. Verify each "),
                  createVNode("code", null, "Hash"),
                  createTextVNode(" against the decoded "),
                  createVNode("code", null, "Content"),
                  createTextVNode(" before presenting to the customer. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: policyIssuedWithDocsEvent,
                lang: "json",
                filename: "PolicyIssued event with Documents"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Hash verification"),
              createVNode(_component_EdCode, {
                code: verifyHashNode,
                lang: "ts",
                filename: "Node — SHA-256 verification"
              }),
              createVNode(_component_EdCode, {
                code: verifyHashPython,
                lang: "python",
                filename: "Python — SHA-256 verification"
              }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "Do not deliver mismatches"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If a document’s computed hash does not match the supplied "),
                    createVNode("code", null, "Hash"),
                    createTextVNode(", treat the document as corrupt or tampered. Do not surface it to the customer. Log the "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" from the event delivery, raise a support ticket including that ID and the "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(", and request the LFI re-emit the event. ")
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
        id: "completion",
        num: "08",
        color: "var(--at-navy)",
        eyebrow: "Step 8 — Completed event",
        title: "Surface final policy state and reconcile commission",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` On <code data-v-da834f0a${_scopeId2}>Completed</code>, finalise the policy in your records, surface it as live to the customer, and reconcile any commission against the event’s <code data-v-da834f0a${_scopeId2}>Commission</code> block. <code data-v-da834f0a${_scopeId2}>PaymentMethod: ThroughAPIHub</code> means the Hub will route payment to you; the commission and timing are governed by the <a href="/pricing/" data-v-da834f0a${_scopeId2}>AlTareq Commercial and Pricing Model</a>. `);
                } else {
                  return [
                    createTextVNode(" On "),
                    createVNode("code", null, "Completed"),
                    createTextVNode(", finalise the policy in your records, surface it as live to the customer, and reconcile any commission against the event’s "),
                    createVNode("code", null, "Commission"),
                    createTextVNode(" block. "),
                    createVNode("code", null, "PaymentMethod: ThroughAPIHub"),
                    createTextVNode(" means the Hub will route payment to you; the commission and timing are governed by the "),
                    createVNode("a", { href: "/pricing/" }, "AlTareq Commercial and Pricing Model"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` No further events follow. You can let the subscription lapse, or explicitly PATCH the quote with <code data-v-da834f0a${_scopeId2}>IsActive: false</code> if you prefer to clean up — though no further events would be sent regardless. `);
                } else {
                  return [
                    createTextVNode(" No further events follow. You can let the subscription lapse, or explicitly PATCH the quote with "),
                    createVNode("code", null, "IsActive: false"),
                    createTextVNode(" if you prefer to clean up — though no further events would be sent regardless. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" On "),
                  createVNode("code", null, "Completed"),
                  createTextVNode(", finalise the policy in your records, surface it as live to the customer, and reconcile any commission against the event’s "),
                  createVNode("code", null, "Commission"),
                  createTextVNode(" block. "),
                  createVNode("code", null, "PaymentMethod: ThroughAPIHub"),
                  createTextVNode(" means the Hub will route payment to you; the commission and timing are governed by the "),
                  createVNode("a", { href: "/pricing/" }, "AlTareq Commercial and Pricing Model"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" No further events follow. You can let the subscription lapse, or explicitly PATCH the quote with "),
                  createVNode("code", null, "IsActive: false"),
                  createTextVNode(" if you prefer to clean up — though no further events would be sent regardless. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/tpp-led.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tppLed = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da834f0a"]]);
export {
  tppLed as default
};
