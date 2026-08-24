import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
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
const ackResponse = `HTTP/1.1 202 Accepted
x-fapi-interaction-id: <echo the received value>`;
const examplePendingPayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713196200,
  "exp": 1713199800,
  "message": {
    "Meta": {
      "EventDateTime": "2026-04-18T10:32:00Z",
      "EventResource": "/motor-insurance-quotes/8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e",
      "EventType": "Resource.Updated",
      "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e"
    },
    "Data": {
      "QuoteStatus": "ApplicationApproved",
      "BrokerInstructions": [
        {
          "ActionRequired": "Customer must complete premium payment at the LFI-hosted page.",
          "Url": "https://pay.examplelfi.ae/checkout/sess-c93e1f4a"
        }
      ]
    }
  }
}
`;
const exampleCompletedPayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713200000,
  "exp": 1713203600,
  "message": {
    "Meta": {
      "EventDateTime": "2026-04-18T11:00:00Z",
      "EventResource": "/motor-insurance-quotes/8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e",
      "EventType": "Resource.Updated",
      "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e"
    },
    "Data": {
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
  }
}
`;
const exampleTerminalPayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713204000,
  "exp": 1713207600,
  "message": {
    "Meta": {
      "EventDateTime": "2026-04-18T12:00:00Z",
      "EventResource": "/motor-insurance-quotes/8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e",
      "EventType": "Resource.Updated",
      "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e"
    },
    "Data": {
      "QuoteStatus": "CustomerCancelled",
      "Reason": "Customer declined payment at the LFI checkout."
    }
  }
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-16bdb088><section class="ed-doc__hero" data-v-16bdb088><div class="ed-doc__inner" data-v-16bdb088><div class="ed-doc__eyebrow" data-v-16bdb088><span class="ed-doc__eyebrow-dash" data-v-16bdb088></span> Webhooks · Insurance Quote Status </div><h1 class="ed-doc__title" data-v-16bdb088> Insurance Quote Status Event — API Guide <span class="ed-doc__read" data-v-16bdb088>3 min read</span></h1><p class="ed-doc__lede" data-v-16bdb088> When you accept an insurance quote with a <code data-v-16bdb088>Subscription.Webhook</code> attached, the API Hub delivers an <strong data-v-16bdb088>Insurance Quote Status Event</strong> to your registered URL each time the LFI emits a quote-log update. Events flow through the full lifecycle from <code data-v-16bdb088>ApplicationPending</code> to a terminal state. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before events can be delivered",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before receiving an Insurance Quote Status Event, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before receiving an Insurance Quote Status Event, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-16bdb088${_scopeId2}><strong data-v-16bdb088${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-16bdb088${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-16bdb088${_scopeId2}>ISP</strong> role as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-16bdb088${_scopeId2}>Roles</a>. </li><li data-v-16bdb088${_scopeId2}><strong data-v-16bdb088${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-16bdb088${_scopeId2}>Encryption Certificate</a></strong> — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. </li><li data-v-16bdb088${_scopeId2}><strong data-v-16bdb088${_scopeId2}>Accepted quote with a <code data-v-16bdb088${_scopeId2}>Subscription.Webhook</code></strong> — the webhook is registered per-quote on PATCH Accept (see <a href="/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/" data-v-16bdb088${_scopeId2}>Insurance Quotation API Guide</a>). </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                      createVNode("strong", null, "ISP"),
                      createTextVNode(" role as defined in "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Encryption Certificate")
                      ]),
                      createTextVNode(" — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Accepted quote with a "),
                        createVNode("code", null, "Subscription.Webhook")
                      ]),
                      createTextVNode(" — the webhook is registered per-quote on PATCH Accept (see "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/" }, "Insurance Quotation API Guide"),
                      createTextVNode("). ")
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
                  createTextVNode("Before receiving an Insurance Quote Status Event, ensure the following requirements are met:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registered "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                    ]),
                    createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                    createVNode("strong", null, "ISP"),
                    createTextVNode(" role as defined in "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Encryption Certificate")
                    ]),
                    createTextVNode(" — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Accepted quote with a "),
                      createVNode("code", null, "Subscription.Webhook")
                    ]),
                    createTextVNode(" — the webhook is registered per-quote on PATCH Accept (see "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/" }, "Insurance Quotation API Guide"),
                    createTextVNode("). ")
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
        id: "how-it-works",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "How It Works",
        title: "Push delivery on every quote-log status change",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Insurance Quotation does not use a per-customer consent. The webhook subscription is attached to the <strong data-v-16bdb088${_scopeId2}>quote</strong> itself when you PATCH Accept. From that point, every time the LFI emits a status to <code data-v-16bdb088${_scopeId2}>PATCH /insurance-quote-log/{logId}</code>, the Hub delivers an Insurance Quote Status Event to your registered <code data-v-16bdb088${_scopeId2}>Webhook.Url</code> as a JWE-encrypted POST. `);
                } else {
                  return [
                    createTextVNode(" Insurance Quotation does not use a per-customer consent. The webhook subscription is attached to the "),
                    createVNode("strong", null, "quote"),
                    createTextVNode(" itself when you PATCH Accept. From that point, every time the LFI emits a status to "),
                    createVNode("code", null, "PATCH /insurance-quote-log/{logId}"),
                    createTextVNode(", the Hub delivers an Insurance Quote Status Event to your registered "),
                    createVNode("code", null, "Webhook.Url"),
                    createTextVNode(" as a JWE-encrypted POST. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The JWE is encrypted using your public <strong data-v-16bdb088${_scopeId2}>Encryption Certificate</strong>. You must respond with <code data-v-16bdb088${_scopeId2}>202 Accepted</code> immediately and decrypt the event payload asynchronously. `);
                } else {
                  return [
                    createTextVNode(" The JWE is encrypted using your public "),
                    createVNode("strong", null, "Encryption Certificate"),
                    createTextVNode(". You must respond with "),
                    createVNode("code", null, "202 Accepted"),
                    createTextVNode(" immediately and decrypt the event payload asynchronously. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Insurance Quotation does not use a per-customer consent. The webhook subscription is attached to the "),
                  createVNode("strong", null, "quote"),
                  createTextVNode(" itself when you PATCH Accept. From that point, every time the LFI emits a status to "),
                  createVNode("code", null, "PATCH /insurance-quote-log/{logId}"),
                  createTextVNode(", the Hub delivers an Insurance Quote Status Event to your registered "),
                  createVNode("code", null, "Webhook.Url"),
                  createTextVNode(" as a JWE-encrypted POST. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The JWE is encrypted using your public "),
                  createVNode("strong", null, "Encryption Certificate"),
                  createTextVNode(". You must respond with "),
                  createVNode("code", null, "202 Accepted"),
                  createTextVNode(" immediately and decrypt the event payload asynchronously. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 1",
        title: "Subscribe on PATCH Accept Quote",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Attach a <code data-v-16bdb088${_scopeId2}>Subscription.Webhook</code> object to the PATCH Accept Quote body. The subscription covers the entire lifecycle of the quote — you do not need to re-subscribe for each status. Update or pause delivery mid-flow by PATCHing again with only a <code data-v-16bdb088${_scopeId2}>Subscription</code> object (omit <code data-v-16bdb088${_scopeId2}>Data</code>). `);
                } else {
                  return [
                    createTextVNode(" Attach a "),
                    createVNode("code", null, "Subscription.Webhook"),
                    createTextVNode(" object to the PATCH Accept Quote body. The subscription covers the entire lifecycle of the quote — you do not need to re-subscribe for each status. Update or pause delivery mid-flow by PATCHing again with only a "),
                    createVNode("code", null, "Subscription"),
                    createTextVNode(" object (omit "),
                    createVNode("code", null, "Data"),
                    createTextVNode("). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: subscriptionExample,
              lang: "json",
              filename: "PATCH /motor-insurance-quotes/{QuoteId} body (decoded)"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Attach a "),
                  createVNode("code", null, "Subscription.Webhook"),
                  createTextVNode(" object to the PATCH Accept Quote body. The subscription covers the entire lifecycle of the quote — you do not need to re-subscribe for each status. Update or pause delivery mid-flow by PATCHing again with only a "),
                  createVNode("code", null, "Subscription"),
                  createTextVNode(" object (omit "),
                  createVNode("code", null, "Data"),
                  createTextVNode("). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: subscriptionExample,
                lang: "json",
                filename: "PATCH /motor-insurance-quotes/{QuoteId} body (decoded)"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 2",
        title: "Receive and acknowledge the event",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Hub POSTs the event to your <code data-v-16bdb088${_scopeId2}>Webhook.Url</code> with <code data-v-16bdb088${_scopeId2}>Content-Type: application/jwe</code>. Respond <code data-v-16bdb088${_scopeId2}>202 Accepted</code> with an empty body immediately — process the payload asynchronously. `);
                } else {
                  return [
                    createTextVNode(" The Hub POSTs the event to your "),
                    createVNode("code", null, "Webhook.Url"),
                    createTextVNode(" with "),
                    createVNode("code", null, "Content-Type: application/jwe"),
                    createTextVNode(". Respond "),
                    createVNode("code", null, "202 Accepted"),
                    createTextVNode(" with an empty body immediately — process the payload asynchronously. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ackResponse,
              lang: "http",
              filename: "HTTP response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-16bdb088${_scopeId2}> Failure to respond with <code data-v-16bdb088${_scopeId2}>202</code> promptly may cause the Hub to retry delivery. Treat events as idempotent — the same event may arrive more than once. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Failure to respond with "),
                      createVNode("code", null, "202"),
                      createTextVNode(" promptly may cause the Hub to retry delivery. Treat events as idempotent — the same event may arrive more than once. ")
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
                  createTextVNode(" The Hub POSTs the event to your "),
                  createVNode("code", null, "Webhook.Url"),
                  createTextVNode(" with "),
                  createVNode("code", null, "Content-Type: application/jwe"),
                  createTextVNode(". Respond "),
                  createVNode("code", null, "202 Accepted"),
                  createTextVNode(" with an empty body immediately — process the payload asynchronously. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ackResponse,
                lang: "http",
                filename: "HTTP response"
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Failure to respond with "),
                    createVNode("code", null, "202"),
                    createTextVNode(" promptly may cause the Hub to retry delivery. Treat events as idempotent — the same event may arrive more than once. ")
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
        id: "step-3",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 3",
        title: "Decrypt the JWE and verify the inner JWS",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The event is a JWE compact serialisation encrypted with your registered <strong data-v-16bdb088${_scopeId2}>Encryption Certificate</strong>. The JWE header contains a <code data-v-16bdb088${_scopeId2}>kid</code> that identifies which of your keys to use — decode the header first to select the correct private key, then decrypt. `);
                } else {
                  return [
                    createTextVNode(" The event is a JWE compact serialisation encrypted with your registered "),
                    createVNode("strong", null, "Encryption Certificate"),
                    createTextVNode(". The JWE header contains a "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" that identifies which of your keys to use — decode the header first to select the correct private key, then decrypt. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/receiving-events" data-v-16bdb088${_scopeId2}>Receiving Event Notifications</a> for the full FAPI-aligned guidance: key selection by <code data-v-16bdb088${_scopeId2}>kid</code>, JWS signature verification, and required security checks. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
                    createTextVNode(" for the full FAPI-aligned guidance: key selection by "),
                    createVNode("code", null, "kid"),
                    createTextVNode(", JWS signature verification, and required security checks. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The event is a JWE compact serialisation encrypted with your registered "),
                  createVNode("strong", null, "Encryption Certificate"),
                  createTextVNode(". The JWE header contains a "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" that identifies which of your keys to use — decode the header first to select the correct private key, then decrypt. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
                  createTextVNode(" for the full FAPI-aligned guidance: key selection by "),
                  createVNode("code", null, "kid"),
                  createTextVNode(", JWS signature verification, and required security checks. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "payload-meta",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Event Payload — Meta",
        title: "Envelope metadata",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-16bdb088${_scopeId2}><thead data-v-16bdb088${_scopeId2}><tr data-v-16bdb088${_scopeId2}><th data-v-16bdb088${_scopeId2}>Field</th><th data-v-16bdb088${_scopeId2}>Type</th><th data-v-16bdb088${_scopeId2}>Description</th></tr></thead><tbody data-v-16bdb088${_scopeId2}><tr data-v-16bdb088${_scopeId2}><td data-v-16bdb088${_scopeId2}><code data-v-16bdb088${_scopeId2}>EventDateTime</code></td><td data-v-16bdb088${_scopeId2}>string (date-time)</td><td data-v-16bdb088${_scopeId2}>When the event was generated.</td></tr><tr data-v-16bdb088${_scopeId2}><td data-v-16bdb088${_scopeId2}><code data-v-16bdb088${_scopeId2}>EventResource</code></td><td data-v-16bdb088${_scopeId2}>string</td><td data-v-16bdb088${_scopeId2}>The resource URI that triggered the event — e.g. <code data-v-16bdb088${_scopeId2}>/motor-insurance-quotes/{QuoteId}</code>.</td></tr><tr data-v-16bdb088${_scopeId2}><td data-v-16bdb088${_scopeId2}><code data-v-16bdb088${_scopeId2}>EventType</code></td><td data-v-16bdb088${_scopeId2}>string</td><td data-v-16bdb088${_scopeId2}>One of: <code data-v-16bdb088${_scopeId2}>Resource.Created</code>, <code data-v-16bdb088${_scopeId2}>Resource.Updated</code>, <code data-v-16bdb088${_scopeId2}>Resource.Deleted</code>.</td></tr><tr data-v-16bdb088${_scopeId2}><td data-v-16bdb088${_scopeId2}><code data-v-16bdb088${_scopeId2}>QuoteId</code></td><td data-v-16bdb088${_scopeId2}>string (UUID)</td><td data-v-16bdb088${_scopeId2}>The identifier of the quote the status change applies to.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "EventDateTime")
                          ]),
                          createVNode("td", null, "string (date-time)"),
                          createVNode("td", null, "When the event was generated.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "EventResource")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("The resource URI that triggered the event — e.g. "),
                            createVNode("code", null, "/motor-insurance-quotes/{QuoteId}"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "EventType")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, [
                            createTextVNode("One of: "),
                            createVNode("code", null, "Resource.Created"),
                            createTextVNode(", "),
                            createVNode("code", null, "Resource.Updated"),
                            createTextVNode(", "),
                            createVNode("code", null, "Resource.Deleted"),
                            createTextVNode(".")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "QuoteId")
                          ]),
                          createVNode("td", null, "string (UUID)"),
                          createVNode("td", null, "The identifier of the quote the status change applies to.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "EventDateTime")
                        ]),
                        createVNode("td", null, "string (date-time)"),
                        createVNode("td", null, "When the event was generated.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "EventResource")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("The resource URI that triggered the event — e.g. "),
                          createVNode("code", null, "/motor-insurance-quotes/{QuoteId}"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "EventType")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, [
                          createTextVNode("One of: "),
                          createVNode("code", null, "Resource.Created"),
                          createTextVNode(", "),
                          createVNode("code", null, "Resource.Updated"),
                          createTextVNode(", "),
                          createVNode("code", null, "Resource.Deleted"),
                          createTextVNode(".")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "QuoteId")
                        ]),
                        createVNode("td", null, "string (UUID)"),
                        createVNode("td", null, "The identifier of the quote the status change applies to.")
                      ])
                    ])
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
        id: "payload-data",
        num: "07",
        color: "var(--at-violet, #6d28d9)",
        eyebrow: "Event Payload — Data",
        title: "One of three event shapes per QuoteStatus",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-16bdb088${_scopeId2}>Data</code> object conforms to one of three schemas drawn from <code data-v-16bdb088${_scopeId2}>AEInsurance.AEInsuranceEvent</code>: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "Data"),
                    createTextVNode(" object conforms to one of three schemas drawn from "),
                    createVNode("code", null, "AEInsurance.AEInsuranceEvent"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-16bdb088${_scopeId2}><strong data-v-16bdb088${_scopeId2}>Pending Completion Status</strong> — <code data-v-16bdb088${_scopeId2}>QuoteStatus</code> is one of <code data-v-16bdb088${_scopeId2}>ApplicationPending</code>, <code data-v-16bdb088${_scopeId2}>ApplicationApproved</code>, <code data-v-16bdb088${_scopeId2}>PaymentRequired</code>, <code data-v-16bdb088${_scopeId2}>PolicyIssued</code>. May include <code data-v-16bdb088${_scopeId2}>BrokerInstructions[]</code> (typically a payment URL) and <code data-v-16bdb088${_scopeId2}>Documents[]</code> (on <code data-v-16bdb088${_scopeId2}>PolicyIssued</code> in TPP-Led mode). </li><li data-v-16bdb088${_scopeId2}><strong data-v-16bdb088${_scopeId2}>Completed Status</strong> — <code data-v-16bdb088${_scopeId2}>QuoteStatus: Completed</code>. Carries the finalised <code data-v-16bdb088${_scopeId2}>Premium</code>, <code data-v-16bdb088${_scopeId2}>PolicyTerm</code>, <code data-v-16bdb088${_scopeId2}>CustomerPaidInFull</code>, <code data-v-16bdb088${_scopeId2}>PolicyCountrySubDivision</code>, and (where applicable) the <code data-v-16bdb088${_scopeId2}>Commission</code> due to the TPP. </li><li data-v-16bdb088${_scopeId2}><strong data-v-16bdb088${_scopeId2}>Terminal Status</strong> — <code data-v-16bdb088${_scopeId2}>QuoteStatus</code> is one of <code data-v-16bdb088${_scopeId2}>Expired</code>, <code data-v-16bdb088${_scopeId2}>Rejected</code>, <code data-v-16bdb088${_scopeId2}>CustomerCancelled</code>, <code data-v-16bdb088${_scopeId2}>LFICancelled</code>. May include a <code data-v-16bdb088${_scopeId2}>Reason</code> string. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Pending Completion Status"),
                      createTextVNode(" — "),
                      createVNode("code", null, "QuoteStatus"),
                      createTextVNode(" is one of "),
                      createVNode("code", null, "ApplicationPending"),
                      createTextVNode(", "),
                      createVNode("code", null, "ApplicationApproved"),
                      createTextVNode(", "),
                      createVNode("code", null, "PaymentRequired"),
                      createTextVNode(", "),
                      createVNode("code", null, "PolicyIssued"),
                      createTextVNode(". May include "),
                      createVNode("code", null, "BrokerInstructions[]"),
                      createTextVNode(" (typically a payment URL) and "),
                      createVNode("code", null, "Documents[]"),
                      createTextVNode(" (on "),
                      createVNode("code", null, "PolicyIssued"),
                      createTextVNode(" in TPP-Led mode). ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Completed Status"),
                      createTextVNode(" — "),
                      createVNode("code", null, "QuoteStatus: Completed"),
                      createTextVNode(". Carries the finalised "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(", "),
                      createVNode("code", null, "PolicyTerm"),
                      createTextVNode(", "),
                      createVNode("code", null, "CustomerPaidInFull"),
                      createTextVNode(", "),
                      createVNode("code", null, "PolicyCountrySubDivision"),
                      createTextVNode(", and (where applicable) the "),
                      createVNode("code", null, "Commission"),
                      createTextVNode(" due to the TPP. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Terminal Status"),
                      createTextVNode(" — "),
                      createVNode("code", null, "QuoteStatus"),
                      createTextVNode(" is one of "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(", "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(", "),
                      createVNode("code", null, "CustomerCancelled"),
                      createTextVNode(", "),
                      createVNode("code", null, "LFICancelled"),
                      createTextVNode(". May include a "),
                      createVNode("code", null, "Reason"),
                      createTextVNode(" string. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The full schema is documented in <a href="/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/#event-schema" data-v-16bdb088${_scopeId2}>Insurance Quotation API Guide — Event Schema</a> and surfaced as an OpenAPI viewer in <a href="./open-api" data-v-16bdb088${_scopeId2}>Insurance Quote Status Change Event</a>. `);
                } else {
                  return [
                    createTextVNode(" The full schema is documented in "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/#event-schema" }, "Insurance Quotation API Guide — Event Schema"),
                    createTextVNode(" and surfaced as an OpenAPI viewer in "),
                    createVNode("a", { href: "./open-api" }, "Insurance Quote Status Change Event"),
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
                  createTextVNode(" The "),
                  createVNode("code", null, "Data"),
                  createTextVNode(" object conforms to one of three schemas drawn from "),
                  createVNode("code", null, "AEInsurance.AEInsuranceEvent"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Pending Completion Status"),
                    createTextVNode(" — "),
                    createVNode("code", null, "QuoteStatus"),
                    createTextVNode(" is one of "),
                    createVNode("code", null, "ApplicationPending"),
                    createTextVNode(", "),
                    createVNode("code", null, "ApplicationApproved"),
                    createTextVNode(", "),
                    createVNode("code", null, "PaymentRequired"),
                    createTextVNode(", "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(". May include "),
                    createVNode("code", null, "BrokerInstructions[]"),
                    createTextVNode(" (typically a payment URL) and "),
                    createVNode("code", null, "Documents[]"),
                    createTextVNode(" (on "),
                    createVNode("code", null, "PolicyIssued"),
                    createTextVNode(" in TPP-Led mode). ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Completed Status"),
                    createTextVNode(" — "),
                    createVNode("code", null, "QuoteStatus: Completed"),
                    createTextVNode(". Carries the finalised "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(", "),
                    createVNode("code", null, "PolicyTerm"),
                    createTextVNode(", "),
                    createVNode("code", null, "CustomerPaidInFull"),
                    createTextVNode(", "),
                    createVNode("code", null, "PolicyCountrySubDivision"),
                    createTextVNode(", and (where applicable) the "),
                    createVNode("code", null, "Commission"),
                    createTextVNode(" due to the TPP. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Terminal Status"),
                    createTextVNode(" — "),
                    createVNode("code", null, "QuoteStatus"),
                    createTextVNode(" is one of "),
                    createVNode("code", null, "Expired"),
                    createTextVNode(", "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(", "),
                    createVNode("code", null, "CustomerCancelled"),
                    createTextVNode(", "),
                    createVNode("code", null, "LFICancelled"),
                    createTextVNode(". May include a "),
                    createVNode("code", null, "Reason"),
                    createTextVNode(" string. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The full schema is documented in "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/#event-schema" }, "Insurance Quotation API Guide — Event Schema"),
                  createTextVNode(" and surfaced as an OpenAPI viewer in "),
                  createVNode("a", { href: "./open-api" }, "Insurance Quote Status Change Event"),
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
        id: "example-pending",
        num: "08",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Example",
        title: "Decrypted Pending Completion event (ApplicationApproved)",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: examplePendingPayload,
              lang: "json",
              filename: "Decrypted JWS payload"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: examplePendingPayload,
                lang: "json",
                filename: "Decrypted JWS payload"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-completed",
        num: "09",
        color: "var(--at-teal)",
        eyebrow: "Example",
        title: "Decrypted Completed Status event",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleCompletedPayload,
              lang: "json",
              filename: "Decrypted JWS payload"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: exampleCompletedPayload,
                lang: "json",
                filename: "Decrypted JWS payload"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-terminal",
        num: "10",
        color: "var(--at-gold)",
        eyebrow: "Example",
        title: "Decrypted Terminal Status event",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleTerminalPayload,
              lang: "json",
              filename: "Decrypted JWS payload"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: exampleTerminalPayload,
                lang: "json",
                filename: "Decrypted JWS payload"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/webhooks/insurance-status/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-16bdb088"]]);
export {
  apiGuide as default
};
