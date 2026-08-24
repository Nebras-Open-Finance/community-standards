import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const subscriptionExample = `{
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
const subscriptionDisableExample = `{
  "Subscription": {
    "Webhook": {
      "IsActive": false
    }
  }
}
`;
const pendingCompletionExample = `{
  "QuoteStatus": "ApplicationApproved",
  "BrokerInstructions": [
    {
      "ActionRequired": "Customer must complete premium payment at the LFI-hosted page.",
      "Url": "https://pay.examplelfi.ae/checkout/sess-c93e1f4a"
    }
  ]
}
`;
const policyIssuedExample = `{
  "QuoteStatus": "PolicyIssued",
  "Documents": [
    {
      "Type": "Policy Booklet",
      "FileName": "policy-booklet.pdf",
      "ContentType": "application/pdf",
      "Content": "JVBERi0xLjQKJeLjz9MKMyAwI...",
      "HashType": "SHA256",
      "Hash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
    }
  ]
}
`;
const completedExample = `{
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
  "PolicyCountrySubDivision": "Dubai",
  "Commission": {
    "CommissionAmount": { "Currency": "AED", "Amount": "47.00" },
    "PaymentMethod": "ThroughAPIHub"
  }
}
`;
const terminalExample = `{
  "QuoteStatus": "CustomerCancelled",
  "Reason": "Customer declined payment at the LFI checkout."
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-365f80fe><section class="ed-doc__hero" data-v-365f80fe><div class="ed-doc__inner" data-v-365f80fe><div class="ed-doc__eyebrow" data-v-365f80fe><span class="ed-doc__eyebrow-dash" data-v-365f80fe></span> TPP · Insurance · Quotation </div><h1 class="ed-doc__title" data-v-365f80fe> Insurance Quotation — API Guide <span class="ed-doc__read" data-v-365f80fe>8 min read</span></h1><p class="ed-doc__lede" data-v-365f80fe> End-to-end walkthrough of the Insurance Quotation flow from the TPP perspective. The flow runs on the Client Credentials Grant — no per-customer consent journey. After accepting a quote, you can subscribe to webhook events to receive status updates without polling. This page covers the subscription mechanism and the full event schema; the per-mode pages walk through the specific call sequences. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "modes",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Two flow variants",
        title: "Pick the mode you're implementing",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__cards" data-v-365f80fe${_scopeId}><a class="ed-doc__card" href="/tech/tpp-standards/v2.1/insurance/quotation/api-guide/lfi-led" data-v-365f80fe${_scopeId}><span class="ed-doc__card-cat" data-v-365f80fe${_scopeId}>LFI-Led</span><h3 class="ed-doc__card-title" data-v-365f80fe${_scopeId}>The LFI hosts the customer through completion</h3><p class="ed-doc__card-desc" data-v-365f80fe${_scopeId}> Single-PATCH accept flow. Your app collects quote inputs, the LFI hosts everything from acceptance through to issuance. You observe progress via webhook events or polling. </p><span class="ed-doc__card-arrow" data-v-365f80fe${_scopeId}>Open →</span></a><a class="ed-doc__card" href="/tech/tpp-standards/v2.1/insurance/quotation/api-guide/tpp-led" data-v-365f80fe${_scopeId}><span class="ed-doc__card-cat" data-v-365f80fe${_scopeId}>TPP-Led</span><h3 class="ed-doc__card-title" data-v-365f80fe${_scopeId}>You collect KYC; the LFI hosts only payment</h3><p class="ed-doc__card-desc" data-v-365f80fe${_scopeId}> Two-PATCH flow. You submit KYC, the LFI returns a payment URL via webhook event, you redirect the customer to pay, then deliver documents in your app. </p><span class="ed-doc__card-arrow" data-v-365f80fe${_scopeId}>Open →</span></a></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-doc__cards" }, [
                createVNode("a", {
                  class: "ed-doc__card",
                  href: "/tech/tpp-standards/v2.1/insurance/quotation/api-guide/lfi-led"
                }, [
                  createVNode("span", { class: "ed-doc__card-cat" }, "LFI-Led"),
                  createVNode("h3", { class: "ed-doc__card-title" }, "The LFI hosts the customer through completion"),
                  createVNode("p", { class: "ed-doc__card-desc" }, " Single-PATCH accept flow. Your app collects quote inputs, the LFI hosts everything from acceptance through to issuance. You observe progress via webhook events or polling. "),
                  createVNode("span", { class: "ed-doc__card-arrow" }, "Open →")
                ]),
                createVNode("a", {
                  class: "ed-doc__card",
                  href: "/tech/tpp-standards/v2.1/insurance/quotation/api-guide/tpp-led"
                }, [
                  createVNode("span", { class: "ed-doc__card-cat" }, "TPP-Led"),
                  createVNode("h3", { class: "ed-doc__card-title" }, "You collect KYC; the LFI hosts only payment"),
                  createVNode("p", { class: "ed-doc__card-desc" }, " Two-PATCH flow. You submit KYC, the LFI returns a payment URL via webhook event, you redirect the customer to pay, then deliver documents in your app. "),
                  createVNode("span", { class: "ed-doc__card-arrow" }, "Open →")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "subscription",
        num: "02",
        color: "var(--at-gold, #b08800)",
        eyebrow: "Webhook subscription",
        title: "Subscribe to events on PATCH Accept Quote",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When you PATCH a quote to accept it, you can attach a <code data-v-365f80fe${_scopeId2}>Subscription.Webhook</code> object to register for event notifications. The Hub will POST status events to your registered URL whenever the LFI emits a quote-log update. Subscribing once on accept covers the entire lifecycle — you do not need to re-subscribe for each status. The webhook delivery surface is documented in <a href="/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide" data-v-365f80fe${_scopeId2}>Insurance Quote Status Event — API Guide</a>, with the OpenAPI schema at <a href="/tech/tpp-standards/v2.1/webhooks/insurance-status/open-api" data-v-365f80fe${_scopeId2}>Insurance Quote Status Change Event</a>. `);
                } else {
                  return [
                    createTextVNode(" When you PATCH a quote to accept it, you can attach a "),
                    createVNode("code", null, "Subscription.Webhook"),
                    createTextVNode(" object to register for event notifications. The Hub will POST status events to your registered URL whenever the LFI emits a quote-log update. Subscribing once on accept covers the entire lifecycle — you do not need to re-subscribe for each status. The webhook delivery surface is documented in "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide" }, "Insurance Quote Status Event — API Guide"),
                    createTextVNode(", with the OpenAPI schema at "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/insurance-status/open-api" }, "Insurance Quote Status Change Event"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: subscriptionExample,
              lang: "json",
              filename: "PATCH /motor-insurance-quotes/{QuoteId}"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-365f80fe${_scopeId}>Subscription object</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-365f80fe${_scopeId2}><thead data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><th data-v-365f80fe${_scopeId2}>Field</th><th data-v-365f80fe${_scopeId2}>Type</th><th data-v-365f80fe${_scopeId2}>Required</th><th data-v-365f80fe${_scopeId2}>Description</th></tr></thead><tbody data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Webhook.Url</code></td><td data-v-365f80fe${_scopeId2}>string (HTTPS URL)</td><td data-v-365f80fe${_scopeId2}>On first registration</td><td data-v-365f80fe${_scopeId2}>Your HTTPS endpoint that will receive event POSTs. Must match <code data-v-365f80fe${_scopeId2}>^https://.+</code>.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Webhook.IsActive</code></td><td data-v-365f80fe${_scopeId2}>boolean</td><td data-v-365f80fe${_scopeId2}>Always</td><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>true</code> enables delivery; <code data-v-365f80fe${_scopeId2}>false</code> pauses without removing the URL.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Webhook.Url")
                          ]),
                          createVNode("td", null, "string (HTTPS URL)"),
                          createVNode("td", null, "On first registration"),
                          createVNode("td", null, [
                            createTextVNode("Your HTTPS endpoint that will receive event POSTs. Must match "),
                            createVNode("code", null, "^https://.+"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Webhook.IsActive")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Always"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" enables delivery; "),
                            createVNode("code", null, "false"),
                            createTextVNode(" pauses without removing the URL.")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-365f80fe${_scopeId}>Updating the subscription mid-lifecycle</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You can PATCH the quote again at any time with only a <code data-v-365f80fe${_scopeId2}>Subscription</code> object to update or pause webhook delivery. Omit the <code data-v-365f80fe${_scopeId2}>Data</code> field; the LFI will not treat this as a re-acceptance. `);
                } else {
                  return [
                    createTextVNode(" You can PATCH the quote again at any time with only a "),
                    createVNode("code", null, "Subscription"),
                    createTextVNode(" object to update or pause webhook delivery. Omit the "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" field; the LFI will not treat this as a re-acceptance. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: subscriptionDisableExample,
              lang: "json",
              filename: "PATCH (subscription-only)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Polling fallback"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-365f80fe${_scopeId2}> If you do not register a webhook, poll <code data-v-365f80fe${_scopeId2}>GET /{type}-insurance-quotes/{QuoteId}</code> to retrieve the current status. Do not exceed one request per minute under normal load — the Hub may rate-limit aggressive polling. Webhooks are strongly preferred. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If you do not register a webhook, poll "),
                      createVNode("code", null, "GET /{type}-insurance-quotes/{QuoteId}"),
                      createTextVNode(" to retrieve the current status. Do not exceed one request per minute under normal load — the Hub may rate-limit aggressive polling. Webhooks are strongly preferred. ")
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
                  createTextVNode(" When you PATCH a quote to accept it, you can attach a "),
                  createVNode("code", null, "Subscription.Webhook"),
                  createTextVNode(" object to register for event notifications. The Hub will POST status events to your registered URL whenever the LFI emits a quote-log update. Subscribing once on accept covers the entire lifecycle — you do not need to re-subscribe for each status. The webhook delivery surface is documented in "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide" }, "Insurance Quote Status Event — API Guide"),
                  createTextVNode(", with the OpenAPI schema at "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/insurance-status/open-api" }, "Insurance Quote Status Change Event"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: subscriptionExample,
                lang: "json",
                filename: "PATCH /motor-insurance-quotes/{QuoteId}"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Subscription object"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Webhook.Url")
                        ]),
                        createVNode("td", null, "string (HTTPS URL)"),
                        createVNode("td", null, "On first registration"),
                        createVNode("td", null, [
                          createTextVNode("Your HTTPS endpoint that will receive event POSTs. Must match "),
                          createVNode("code", null, "^https://.+"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Webhook.IsActive")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Always"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" enables delivery; "),
                          createVNode("code", null, "false"),
                          createTextVNode(" pauses without removing the URL.")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Updating the subscription mid-lifecycle"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" You can PATCH the quote again at any time with only a "),
                  createVNode("code", null, "Subscription"),
                  createTextVNode(" object to update or pause webhook delivery. Omit the "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" field; the LFI will not treat this as a re-acceptance. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: subscriptionDisableExample,
                lang: "json",
                filename: "PATCH (subscription-only)"
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Polling fallback"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If you do not register a webhook, poll "),
                    createVNode("code", null, "GET /{type}-insurance-quotes/{QuoteId}"),
                    createTextVNode(" to retrieve the current status. Do not exceed one request per minute under normal load — the Hub may rate-limit aggressive polling. Webhooks are strongly preferred. ")
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
        id: "event-schema",
        num: "03",
        color: "var(--at-violet, #6d28d9)",
        eyebrow: "Insurance Quote Event Schema",
        title: "The three event shapes you must handle",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every event delivered to your webhook conforms to one of three schemas, drawn from the API Hub Consent Manager spec. The <code data-v-365f80fe${_scopeId2}>QuoteStatus</code> field identifies which schema applies. `);
                } else {
                  return [
                    createTextVNode(" Every event delivered to your webhook conforms to one of three schemas, drawn from the API Hub Consent Manager spec. The "),
                    createVNode("code", null, "QuoteStatus"),
                    createTextVNode(" field identifies which schema applies. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-365f80fe${_scopeId}>1. Pending Completion Status</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sent when the quote is making progress but not yet final. <code data-v-365f80fe${_scopeId2}>QuoteStatus</code> is one of: <code data-v-365f80fe${_scopeId2}>ApplicationPending</code>, <code data-v-365f80fe${_scopeId2}>ApplicationApproved</code>, <code data-v-365f80fe${_scopeId2}>PaymentRequired</code>, <code data-v-365f80fe${_scopeId2}>PolicyIssued</code>. `);
                } else {
                  return [
                    createTextVNode(" Sent when the quote is making progress but not yet final. "),
                    createVNode("code", null, "QuoteStatus"),
                    createTextVNode(" is one of: "),
                    createVNode("code", null, "ApplicationPending"),
                    createTextVNode(", "),
                    createVNode("code", null, "ApplicationApproved"),
                    createTextVNode(", "),
                    createVNode("code", null, "PaymentRequired"),
                    createTextVNode(", "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-365f80fe${_scopeId2}><thead data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><th data-v-365f80fe${_scopeId2}>Field</th><th data-v-365f80fe${_scopeId2}>Required</th><th data-v-365f80fe${_scopeId2}>Notes</th></tr></thead><tbody data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>QuoteStatus</code></td><td data-v-365f80fe${_scopeId2}>Always</td><td data-v-365f80fe${_scopeId2}>One of the pending-completion enum values above.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>BrokerInstructions[]</code></td><td data-v-365f80fe${_scopeId2}>When LFI requires TPP action</td><td data-v-365f80fe${_scopeId2}>Each entry: <code data-v-365f80fe${_scopeId2}>ActionRequired</code> (text), <code data-v-365f80fe${_scopeId2}>Reason</code> (text), <code data-v-365f80fe${_scopeId2}>Url</code> (e.g. payment URL).</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Documents[]</code></td><td data-v-365f80fe${_scopeId2}>On <code data-v-365f80fe${_scopeId2}>PolicyIssued</code> in TPP-Led mode</td><td data-v-365f80fe${_scopeId2}>Base64-encoded policy documents with SHA-256 hashes. See &quot;Documents&quot; below.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "QuoteStatus")
                          ]),
                          createVNode("td", null, "Always"),
                          createVNode("td", null, "One of the pending-completion enum values above.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BrokerInstructions[]")
                          ]),
                          createVNode("td", null, "When LFI requires TPP action"),
                          createVNode("td", null, [
                            createTextVNode("Each entry: "),
                            createVNode("code", null, "ActionRequired"),
                            createTextVNode(" (text), "),
                            createVNode("code", null, "Reason"),
                            createTextVNode(" (text), "),
                            createVNode("code", null, "Url"),
                            createTextVNode(" (e.g. payment URL).")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Documents[]")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("On "),
                            createVNode("code", null, "PolicyIssued"),
                            createTextVNode(" in TPP-Led mode")
                          ]),
                          createVNode("td", null, 'Base64-encoded policy documents with SHA-256 hashes. See "Documents" below.')
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: pendingCompletionExample,
              lang: "json",
              filename: "Pending Completion event (ApplicationApproved)"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-365f80fe${_scopeId}>2. Completed Status</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Final event for a successful flow. <code data-v-365f80fe${_scopeId2}>QuoteStatus: Completed</code>. Carries the finalised premium, policy term, and commission information. No further events follow. `);
                } else {
                  return [
                    createTextVNode(" Final event for a successful flow. "),
                    createVNode("code", null, "QuoteStatus: Completed"),
                    createTextVNode(". Carries the finalised premium, policy term, and commission information. No further events follow. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-365f80fe${_scopeId2}><thead data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><th data-v-365f80fe${_scopeId2}>Field</th><th data-v-365f80fe${_scopeId2}>Required</th><th data-v-365f80fe${_scopeId2}>Notes</th></tr></thead><tbody data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>QuoteStatus</code></td><td data-v-365f80fe${_scopeId2}>Always</td><td data-v-365f80fe${_scopeId2}>Always <code data-v-365f80fe${_scopeId2}>&quot;Completed&quot;</code>.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>PolicyTerm</code></td><td data-v-365f80fe${_scopeId2}>Always</td><td data-v-365f80fe${_scopeId2}>ISO 8601 duration, e.g. <code data-v-365f80fe${_scopeId2}>P1Y</code>, <code data-v-365f80fe${_scopeId2}>P2Y3M</code>.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Premium</code></td><td data-v-365f80fe${_scopeId2}>Always</td><td data-v-365f80fe${_scopeId2}>Object with <code data-v-365f80fe${_scopeId2}>OneYearPremiumExcludingVAT</code>, <code data-v-365f80fe${_scopeId2}>VATAmount</code>, <code data-v-365f80fe${_scopeId2}>TotalOneYearPremium</code>, and (optionally) <code data-v-365f80fe${_scopeId2}>TotalPolicyPremium</code>.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>CustomerPaidInFull</code></td><td data-v-365f80fe${_scopeId2}>Always</td><td data-v-365f80fe${_scopeId2}>Boolean indicating full payment was received.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>PolicyCountrySubDivision</code></td><td data-v-365f80fe${_scopeId2}>Always</td><td data-v-365f80fe${_scopeId2}>UAE Emirate where the policy was issued.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>PolicyStartDate</code> / <code data-v-365f80fe${_scopeId2}>PolicyEndDate</code></td><td data-v-365f80fe${_scopeId2}>Recommended</td><td data-v-365f80fe${_scopeId2}>ISO 8601 date.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>CustomerSalary</code></td><td data-v-365f80fe${_scopeId2}>Required for Health</td><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Under4K</code> or <code data-v-365f80fe${_scopeId2}>Over4K</code> (AED/month).</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Commission</code></td><td data-v-365f80fe${_scopeId2}>When TPP commission applies</td><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>CommissionAmount</code> + <code data-v-365f80fe${_scopeId2}>PaymentMethod</code> (<code data-v-365f80fe${_scopeId2}>DirectToTPP</code> or <code data-v-365f80fe${_scopeId2}>ThroughAPIHub</code>).</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Documents[]</code></td><td data-v-365f80fe${_scopeId2}>Optional</td><td data-v-365f80fe${_scopeId2}>Final policy documents if not already delivered on <code data-v-365f80fe${_scopeId2}>PolicyIssued</code>.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "QuoteStatus")
                          ]),
                          createVNode("td", null, "Always"),
                          createVNode("td", null, [
                            createTextVNode("Always "),
                            createVNode("code", null, '"Completed"'),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PolicyTerm")
                          ]),
                          createVNode("td", null, "Always"),
                          createVNode("td", null, [
                            createTextVNode("ISO 8601 duration, e.g. "),
                            createVNode("code", null, "P1Y"),
                            createTextVNode(", "),
                            createVNode("code", null, "P2Y3M"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Premium")
                          ]),
                          createVNode("td", null, "Always"),
                          createVNode("td", null, [
                            createTextVNode("Object with "),
                            createVNode("code", null, "OneYearPremiumExcludingVAT"),
                            createTextVNode(", "),
                            createVNode("code", null, "VATAmount"),
                            createTextVNode(", "),
                            createVNode("code", null, "TotalOneYearPremium"),
                            createTextVNode(", and (optionally) "),
                            createVNode("code", null, "TotalPolicyPremium"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CustomerPaidInFull")
                          ]),
                          createVNode("td", null, "Always"),
                          createVNode("td", null, "Boolean indicating full payment was received.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PolicyCountrySubDivision")
                          ]),
                          createVNode("td", null, "Always"),
                          createVNode("td", null, "UAE Emirate where the policy was issued.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PolicyStartDate"),
                            createTextVNode(" / "),
                            createVNode("code", null, "PolicyEndDate")
                          ]),
                          createVNode("td", null, "Recommended"),
                          createVNode("td", null, "ISO 8601 date.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CustomerSalary")
                          ]),
                          createVNode("td", null, "Required for Health"),
                          createVNode("td", null, [
                            createVNode("code", null, "Under4K"),
                            createTextVNode(" or "),
                            createVNode("code", null, "Over4K"),
                            createTextVNode(" (AED/month).")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Commission")
                          ]),
                          createVNode("td", null, "When TPP commission applies"),
                          createVNode("td", null, [
                            createVNode("code", null, "CommissionAmount"),
                            createTextVNode(" + "),
                            createVNode("code", null, "PaymentMethod"),
                            createTextVNode(" ("),
                            createVNode("code", null, "DirectToTPP"),
                            createTextVNode(" or "),
                            createVNode("code", null, "ThroughAPIHub"),
                            createTextVNode(").")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Documents[]")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createTextVNode("Final policy documents if not already delivered on "),
                            createVNode("code", null, "PolicyIssued"),
                            createTextVNode(".")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: completedExample,
              lang: "json",
              filename: "Completed Status event"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-365f80fe${_scopeId}>3. Terminal Status</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Negative terminal events. <code data-v-365f80fe${_scopeId2}>QuoteStatus</code> is one of: <code data-v-365f80fe${_scopeId2}>Expired</code>, <code data-v-365f80fe${_scopeId2}>Rejected</code>, <code data-v-365f80fe${_scopeId2}>CustomerCancelled</code>, <code data-v-365f80fe${_scopeId2}>LFICancelled</code>. No further events follow. `);
                } else {
                  return [
                    createTextVNode(" Negative terminal events. "),
                    createVNode("code", null, "QuoteStatus"),
                    createTextVNode(" is one of: "),
                    createVNode("code", null, "Expired"),
                    createTextVNode(", "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(", "),
                    createVNode("code", null, "CustomerCancelled"),
                    createTextVNode(", "),
                    createVNode("code", null, "LFICancelled"),
                    createTextVNode(". No further events follow. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-365f80fe${_scopeId2}><thead data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><th data-v-365f80fe${_scopeId2}>Field</th><th data-v-365f80fe${_scopeId2}>Required</th><th data-v-365f80fe${_scopeId2}>Notes</th></tr></thead><tbody data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>QuoteStatus</code></td><td data-v-365f80fe${_scopeId2}>Always</td><td data-v-365f80fe${_scopeId2}>One of the four terminal enum values.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Reason</code></td><td data-v-365f80fe${_scopeId2}>Optional</td><td data-v-365f80fe${_scopeId2}>Free-text (1–1000 chars) explaining the termination — surface to the customer where helpful.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "QuoteStatus")
                          ]),
                          createVNode("td", null, "Always"),
                          createVNode("td", null, "One of the four terminal enum values.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Reason")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, "Free-text (1–1000 chars) explaining the termination — surface to the customer where helpful.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: terminalExample,
              lang: "json",
              filename: "Terminal Status event"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-365f80fe${_scopeId}>PolicyIssued with documents (TPP-Led)</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: policyIssuedExample,
              lang: "json",
              filename: "PolicyIssued event with Documents[]"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every event delivered to your webhook conforms to one of three schemas, drawn from the API Hub Consent Manager spec. The "),
                  createVNode("code", null, "QuoteStatus"),
                  createTextVNode(" field identifies which schema applies. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "1. Pending Completion Status"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Sent when the quote is making progress but not yet final. "),
                  createVNode("code", null, "QuoteStatus"),
                  createTextVNode(" is one of: "),
                  createVNode("code", null, "ApplicationPending"),
                  createTextVNode(", "),
                  createVNode("code", null, "ApplicationApproved"),
                  createTextVNode(", "),
                  createVNode("code", null, "PaymentRequired"),
                  createTextVNode(", "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "QuoteStatus")
                        ]),
                        createVNode("td", null, "Always"),
                        createVNode("td", null, "One of the pending-completion enum values above.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BrokerInstructions[]")
                        ]),
                        createVNode("td", null, "When LFI requires TPP action"),
                        createVNode("td", null, [
                          createTextVNode("Each entry: "),
                          createVNode("code", null, "ActionRequired"),
                          createTextVNode(" (text), "),
                          createVNode("code", null, "Reason"),
                          createTextVNode(" (text), "),
                          createVNode("code", null, "Url"),
                          createTextVNode(" (e.g. payment URL).")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Documents[]")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("On "),
                          createVNode("code", null, "PolicyIssued"),
                          createTextVNode(" in TPP-Led mode")
                        ]),
                        createVNode("td", null, 'Base64-encoded policy documents with SHA-256 hashes. See "Documents" below.')
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: pendingCompletionExample,
                lang: "json",
                filename: "Pending Completion event (ApplicationApproved)"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "2. Completed Status"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Final event for a successful flow. "),
                  createVNode("code", null, "QuoteStatus: Completed"),
                  createTextVNode(". Carries the finalised premium, policy term, and commission information. No further events follow. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "QuoteStatus")
                        ]),
                        createVNode("td", null, "Always"),
                        createVNode("td", null, [
                          createTextVNode("Always "),
                          createVNode("code", null, '"Completed"'),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PolicyTerm")
                        ]),
                        createVNode("td", null, "Always"),
                        createVNode("td", null, [
                          createTextVNode("ISO 8601 duration, e.g. "),
                          createVNode("code", null, "P1Y"),
                          createTextVNode(", "),
                          createVNode("code", null, "P2Y3M"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Premium")
                        ]),
                        createVNode("td", null, "Always"),
                        createVNode("td", null, [
                          createTextVNode("Object with "),
                          createVNode("code", null, "OneYearPremiumExcludingVAT"),
                          createTextVNode(", "),
                          createVNode("code", null, "VATAmount"),
                          createTextVNode(", "),
                          createVNode("code", null, "TotalOneYearPremium"),
                          createTextVNode(", and (optionally) "),
                          createVNode("code", null, "TotalPolicyPremium"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CustomerPaidInFull")
                        ]),
                        createVNode("td", null, "Always"),
                        createVNode("td", null, "Boolean indicating full payment was received.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PolicyCountrySubDivision")
                        ]),
                        createVNode("td", null, "Always"),
                        createVNode("td", null, "UAE Emirate where the policy was issued.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PolicyStartDate"),
                          createTextVNode(" / "),
                          createVNode("code", null, "PolicyEndDate")
                        ]),
                        createVNode("td", null, "Recommended"),
                        createVNode("td", null, "ISO 8601 date.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CustomerSalary")
                        ]),
                        createVNode("td", null, "Required for Health"),
                        createVNode("td", null, [
                          createVNode("code", null, "Under4K"),
                          createTextVNode(" or "),
                          createVNode("code", null, "Over4K"),
                          createTextVNode(" (AED/month).")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Commission")
                        ]),
                        createVNode("td", null, "When TPP commission applies"),
                        createVNode("td", null, [
                          createVNode("code", null, "CommissionAmount"),
                          createTextVNode(" + "),
                          createVNode("code", null, "PaymentMethod"),
                          createTextVNode(" ("),
                          createVNode("code", null, "DirectToTPP"),
                          createTextVNode(" or "),
                          createVNode("code", null, "ThroughAPIHub"),
                          createTextVNode(").")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Documents[]")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createTextVNode("Final policy documents if not already delivered on "),
                          createVNode("code", null, "PolicyIssued"),
                          createTextVNode(".")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: completedExample,
                lang: "json",
                filename: "Completed Status event"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "3. Terminal Status"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Negative terminal events. "),
                  createVNode("code", null, "QuoteStatus"),
                  createTextVNode(" is one of: "),
                  createVNode("code", null, "Expired"),
                  createTextVNode(", "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(", "),
                  createVNode("code", null, "CustomerCancelled"),
                  createTextVNode(", "),
                  createVNode("code", null, "LFICancelled"),
                  createTextVNode(". No further events follow. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "QuoteStatus")
                        ]),
                        createVNode("td", null, "Always"),
                        createVNode("td", null, "One of the four terminal enum values.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Reason")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, "Free-text (1–1000 chars) explaining the termination — surface to the customer where helpful.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: terminalExample,
                lang: "json",
                filename: "Terminal Status event"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "PolicyIssued with documents (TPP-Led)"),
              createVNode(_component_EdCode, {
                code: policyIssuedExample,
                lang: "json",
                filename: "PolicyIssued event with Documents[]"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "documents",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Document handling",
        title: "Verifying and surfacing policy documents",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` In TPP-Led mode, the <code data-v-365f80fe${_scopeId2}>PolicyIssued</code> event carries every customer-facing document the LFI would normally deliver itself. Your TPP becomes the document delivery channel — the LFI will not email or post the documents. `);
                } else {
                  return [
                    createTextVNode(" In TPP-Led mode, the "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" event carries every customer-facing document the LFI would normally deliver itself. Your TPP becomes the document delivery channel — the LFI will not email or post the documents. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-365f80fe${_scopeId}>Document object</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-365f80fe${_scopeId2}><thead data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><th data-v-365f80fe${_scopeId2}>Field</th><th data-v-365f80fe${_scopeId2}>Notes</th></tr></thead><tbody data-v-365f80fe${_scopeId2}><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Type</code></td><td data-v-365f80fe${_scopeId2}>Document category (e.g. &quot;Policy Booklet&quot;, &quot;Terms &amp; Conditions&quot;, &quot;IPID&quot;). Free-text.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>FileName</code></td><td data-v-365f80fe${_scopeId2}>Original file name with extension. No path components.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>ContentType</code></td><td data-v-365f80fe${_scopeId2}>One of <code data-v-365f80fe${_scopeId2}>application/pdf</code>, <code data-v-365f80fe${_scopeId2}>image/jpeg</code>, <code data-v-365f80fe${_scopeId2}>image/png</code>.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Content</code></td><td data-v-365f80fe${_scopeId2}>Base64-encoded file bytes.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>HashType</code></td><td data-v-365f80fe${_scopeId2}>Always <code data-v-365f80fe${_scopeId2}>SHA256</code>.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>Hash</code></td><td data-v-365f80fe${_scopeId2}>SHA-256 of the raw file bytes (decoded <code data-v-365f80fe${_scopeId2}>Content</code>). Required for integrity verification.</td></tr><tr data-v-365f80fe${_scopeId2}><td data-v-365f80fe${_scopeId2}><code data-v-365f80fe${_scopeId2}>AdditionalInformation</code></td><td data-v-365f80fe${_scopeId2}>Optional free text (max 1000 chars).</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Type")
                          ]),
                          createVNode("td", null, 'Document category (e.g. "Policy Booklet", "Terms & Conditions", "IPID"). Free-text.')
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "FileName")
                          ]),
                          createVNode("td", null, "Original file name with extension. No path components.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ContentType")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("One of "),
                            createVNode("code", null, "application/pdf"),
                            createTextVNode(", "),
                            createVNode("code", null, "image/jpeg"),
                            createTextVNode(", "),
                            createVNode("code", null, "image/png"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Content")
                          ]),
                          createVNode("td", null, "Base64-encoded file bytes.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "HashType")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Always "),
                            createVNode("code", null, "SHA256"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Hash")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("SHA-256 of the raw file bytes (decoded "),
                            createVNode("code", null, "Content"),
                            createTextVNode("). Required for integrity verification.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AdditionalInformation")
                          ]),
                          createVNode("td", null, "Optional free text (max 1000 chars).")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-365f80fe${_scopeId}>Verification</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before surfacing a document to the customer, decode <code data-v-365f80fe${_scopeId2}>Content</code>, compute its SHA-256, and compare against <code data-v-365f80fe${_scopeId2}>Hash</code>. Mismatches indicate corruption or tampering — do not deliver. Log the <code data-v-365f80fe${_scopeId2}>x-fapi-interaction-id</code> from the event delivery and raise a support ticket including that ID and the <code data-v-365f80fe${_scopeId2}>QuoteId</code>. `);
                } else {
                  return [
                    createTextVNode(" Before surfacing a document to the customer, decode "),
                    createVNode("code", null, "Content"),
                    createTextVNode(", compute its SHA-256, and compare against "),
                    createVNode("code", null, "Hash"),
                    createTextVNode(". Mismatches indicate corruption or tampering — do not deliver. Log the "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" from the event delivery and raise a support ticket including that ID and the "),
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
                  createTextVNode(" In TPP-Led mode, the "),
                  createVNode("code", null, "PolicyIssued"),
                  createTextVNode(" event carries every customer-facing document the LFI would normally deliver itself. Your TPP becomes the document delivery channel — the LFI will not email or post the documents. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Document object"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Type")
                        ]),
                        createVNode("td", null, 'Document category (e.g. "Policy Booklet", "Terms & Conditions", "IPID"). Free-text.')
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "FileName")
                        ]),
                        createVNode("td", null, "Original file name with extension. No path components.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ContentType")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("One of "),
                          createVNode("code", null, "application/pdf"),
                          createTextVNode(", "),
                          createVNode("code", null, "image/jpeg"),
                          createTextVNode(", "),
                          createVNode("code", null, "image/png"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Content")
                        ]),
                        createVNode("td", null, "Base64-encoded file bytes.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "HashType")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Always "),
                          createVNode("code", null, "SHA256"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Hash")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("SHA-256 of the raw file bytes (decoded "),
                          createVNode("code", null, "Content"),
                          createTextVNode("). Required for integrity verification.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AdditionalInformation")
                        ]),
                        createVNode("td", null, "Optional free text (max 1000 chars).")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Verification"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Before surfacing a document to the customer, decode "),
                  createVNode("code", null, "Content"),
                  createTextVNode(", compute its SHA-256, and compare against "),
                  createVNode("code", null, "Hash"),
                  createTextVNode(". Mismatches indicate corruption or tampering — do not deliver. Log the "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" from the event delivery and raise a support ticket including that ID and the "),
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
        id: "webhook-verification",
        num: "05",
        color: "var(--at-teal)",
        eyebrow: "Webhook security",
        title: "Verify event signatures before acting",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Events delivered to your webhook are signed by the Hub. You MUST verify the signature on every event before applying it. See <a href="/tech/tpp-standards/security/fapi/receiving-events" data-v-365f80fe${_scopeId2}>Receiving Event Notifications</a> for the signature scheme. `);
                } else {
                  return [
                    createTextVNode(" Events delivered to your webhook are signed by the Hub. You MUST verify the signature on every event before applying it. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
                    createTextVNode(" for the signature scheme. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Hub may redeliver an event after a transient delivery failure. Treat events as idempotent — apply the latest <code data-v-365f80fe${_scopeId2}>QuoteStatus</code> for the <code data-v-365f80fe${_scopeId2}>QuoteId</code>, do not count events. Tracking by <code data-v-365f80fe${_scopeId2}>QuoteId</code> + <code data-v-365f80fe${_scopeId2}>QuoteStatus</code> + event timestamp is sufficient to dedupe. `);
                } else {
                  return [
                    createTextVNode(" The Hub may redeliver an event after a transient delivery failure. Treat events as idempotent — apply the latest "),
                    createVNode("code", null, "QuoteStatus"),
                    createTextVNode(" for the "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(", do not count events. Tracking by "),
                    createVNode("code", null, "QuoteId"),
                    createTextVNode(" + "),
                    createVNode("code", null, "QuoteStatus"),
                    createTextVNode(" + event timestamp is sufficient to dedupe. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Events delivered to your webhook are signed by the Hub. You MUST verify the signature on every event before applying it. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
                  createTextVNode(" for the signature scheme. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Hub may redeliver an event after a transient delivery failure. Treat events as idempotent — apply the latest "),
                  createVNode("code", null, "QuoteStatus"),
                  createTextVNode(" for the "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(", do not count events. Tracking by "),
                  createVNode("code", null, "QuoteId"),
                  createTextVNode(" + "),
                  createVNode("code", null, "QuoteStatus"),
                  createTextVNode(" + event timestamp is sufficient to dedupe. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "quote-types",
        num: "06",
        color: "var(--at-violet, #6d28d9)",
        eyebrow: "Per-quote-type rules",
        title: "New, Renewal, and Switch differences",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The semantic differences between <code data-v-365f80fe${_scopeId2}>New</code>, <code data-v-365f80fe${_scopeId2}>Renewal</code>, and <code data-v-365f80fe${_scopeId2}>Switch</code> — and the per-type field requirements — are documented in the shared <a href="/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types" data-v-365f80fe${_scopeId2}>Quote Types</a> explainer. Read it before issuing Renewal or Switch quotes; both require referencing a prior policy retrieved through Insurance Data Sharing under a customer consent. `);
                } else {
                  return [
                    createTextVNode(" The semantic differences between "),
                    createVNode("code", null, "New"),
                    createTextVNode(", "),
                    createVNode("code", null, "Renewal"),
                    createTextVNode(", and "),
                    createVNode("code", null, "Switch"),
                    createTextVNode(" — and the per-type field requirements — are documented in the shared "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types" }, "Quote Types"),
                    createTextVNode(" explainer. Read it before issuing Renewal or Switch quotes; both require referencing a prior policy retrieved through Insurance Data Sharing under a customer consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The semantic differences between "),
                  createVNode("code", null, "New"),
                  createTextVNode(", "),
                  createVNode("code", null, "Renewal"),
                  createTextVNode(", and "),
                  createVNode("code", null, "Switch"),
                  createTextVNode(" — and the per-type field requirements — are documented in the shared "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types" }, "Quote Types"),
                  createTextVNode(" explainer. Read it before issuing Renewal or Switch quotes; both require referencing a prior policy retrieved through Insurance Data Sharing under a customer consent. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/insurance/quotation/api-guide/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-365f80fe"]]);
export {
  index as default
};
