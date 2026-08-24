import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as _sfc_main$1 } from "./APIFlowPaymentStatusEvent-Cse54X0O.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const subscriptionExample = `{
  "subscription": {
    "Webhook": {
      "IsActive": true,
      "Url": "https://tpp.example.com/webhooks/receiver"
    }
  }
}`;
const ackResponse = `HTTP/1.1 202 Accepted
x-fapi-interaction-id: <echo the received value>`;
const examplePayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713196200,
  "exp": 1713199800,
  "message": {
    "Meta": {
      "EventDateTime": "2025-04-15T12:30:00Z",
      "EventResource": "/payment/7130812d-4d81-4c68-8187-6358cfbce521",
      "EventType": "Resource.Updated",
      "ConsentId": "2079bdce-c8e2-42a8-92b5-2732d9695971"
    },
    "Data": {
      "PaymentId": "7130812d-4d81-4c68-8187-6358cfbce521",
      "ConsentId": "2079bdce-c8e2-42a8-92b5-2732d9695971",
      "Status": "AcceptedWithoutPosting",
      "StatusUpdateDateTime": "2025-04-15T12:30:00Z",
      "CreationDateTime": "2025-04-15T12:00:00Z",
      "Instruction": {
        "InstructedAmount": {
          "Amount": "500.00",
          "Currency": "AED"
        }
      },
      "PaymentPurposeCode": "ACM",
      "OpenFinanceBilling": {
        "Type": "PushP2P"
      }
    }
  }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowPaymentStatusEvent = _sfc_main$1;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-0da246ba><section class="ed-doc__hero" data-v-0da246ba><div class="ed-doc__inner" data-v-0da246ba><div class="ed-doc__eyebrow" data-v-0da246ba><span class="ed-doc__eyebrow-dash" data-v-0da246ba></span> Webhooks · Payment Status </div><h1 class="ed-doc__title" data-v-0da246ba> Payment Status Event — API Guide <span class="ed-doc__read" data-v-0da246ba>2 min read</span></h1><p class="ed-doc__lede" data-v-0da246ba> When a payment consent is created with <code data-v-0da246ba>subscription.Webhook.IsActive: true</code>, the API Hub monitors that consent for payment status changes. Each time the LFI processes the payment and updates its status — by PATCHing the API Hub — the Hub delivers a <strong data-v-0da246ba>Payment Status Event</strong> to your registered <code data-v-0da246ba>Webhook.Url</code> as a JWE-encrypted POST. </p></div></section>`);
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
                  _push3(`Before receiving a Payment Status Event, ensure the following requirements are met:`);
                } else {
                  return [
                    createTextVNode("Before receiving a Payment Status Event, ensure the following requirements are met:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-0da246ba${_scopeId2}><strong data-v-0da246ba${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-0da246ba${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-0da246ba${_scopeId2}>BDSP role</strong> as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-0da246ba${_scopeId2}>Roles</a>. </li><li data-v-0da246ba${_scopeId2}><strong data-v-0da246ba${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-0da246ba${_scopeId2}>Encryption Certificate</a></strong> — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                      createVNode("strong", null, "BDSP role"),
                      createTextVNode(" as defined in "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Encryption Certificate")
                      ]),
                      createTextVNode(" — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. ")
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
                  createTextVNode("Before receiving a Payment Status Event, ensure the following requirements are met:")
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
                    createVNode("strong", null, "BDSP role"),
                    createTextVNode(" as defined in "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Encryption Certificate")
                    ]),
                    createTextVNode(" — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. ")
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
        title: "Push delivery on every payment status update",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When a payment consent is created with <code data-v-0da246ba${_scopeId2}>subscription.Webhook.IsActive: true</code>, the API Hub monitors that consent for payment status changes. Each time the LFI processes the payment and updates its status — by PATCHing the API Hub — the Hub delivers a Payment Status Event to your registered <code data-v-0da246ba${_scopeId2}>Webhook.Url</code> as a JWE-encrypted POST request. `);
                } else {
                  return [
                    createTextVNode(" When a payment consent is created with "),
                    createVNode("code", null, "subscription.Webhook.IsActive: true"),
                    createTextVNode(", the API Hub monitors that consent for payment status changes. Each time the LFI processes the payment and updates its status — by PATCHing the API Hub — the Hub delivers a Payment Status Event to your registered "),
                    createVNode("code", null, "Webhook.Url"),
                    createTextVNode(" as a JWE-encrypted POST request. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The JWE is encrypted using your public <strong data-v-0da246ba${_scopeId2}>Encryption Certificate</strong> registered in the Trust Framework. You must respond with <code data-v-0da246ba${_scopeId2}>202 Accepted</code> immediately and decrypt the event payload asynchronously. `);
                } else {
                  return [
                    createTextVNode(" The JWE is encrypted using your public "),
                    createVNode("strong", null, "Encryption Certificate"),
                    createTextVNode(" registered in the Trust Framework. You must respond with "),
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
                  createTextVNode(" When a payment consent is created with "),
                  createVNode("code", null, "subscription.Webhook.IsActive: true"),
                  createTextVNode(", the API Hub monitors that consent for payment status changes. Each time the LFI processes the payment and updates its status — by PATCHing the API Hub — the Hub delivers a Payment Status Event to your registered "),
                  createVNode("code", null, "Webhook.Url"),
                  createTextVNode(" as a JWE-encrypted POST request. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The JWE is encrypted using your public "),
                  createVNode("strong", null, "Encryption Certificate"),
                  createTextVNode(" registered in the Trust Framework. You must respond with "),
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
        id: "sequence-flow",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end payment status update example",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Payment Status Event Flow | Example: Status -> AcceptedWithoutPosting" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowPaymentStatusEvent, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowPaymentStatusEvent)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Payment Status Event Flow | Example: Status -> AcceptedWithoutPosting" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowPaymentStatusEvent)
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
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Step 1",
        title: "Enable the subscription on your payment consent",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Set <code data-v-0da246ba${_scopeId2}>subscription.Webhook.IsActive</code> to <code data-v-0da246ba${_scopeId2}>true</code> and provide your webhook URL when creating the payment consent PII. The URL must be registered and accessible from the API Hub. `);
                } else {
                  return [
                    createTextVNode(" Set "),
                    createVNode("code", null, "subscription.Webhook.IsActive"),
                    createTextVNode(" to "),
                    createVNode("code", null, "true"),
                    createTextVNode(" and provide your webhook URL when creating the payment consent PII. The URL must be registered and accessible from the API Hub. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: subscriptionExample,
              lang: "json",
              filename: "Consent PII subscription block"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0da246ba${_scopeId2}> The <code data-v-0da246ba${_scopeId2}>Webhook.Url</code> must be the URL of your registered webhook endpoint — the API Hub will POST events directly to this address. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("code", null, "Webhook.Url"),
                      createTextVNode(" must be the URL of your registered webhook endpoint — the API Hub will POST events directly to this address. ")
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
                  createTextVNode(" Set "),
                  createVNode("code", null, "subscription.Webhook.IsActive"),
                  createTextVNode(" to "),
                  createVNode("code", null, "true"),
                  createTextVNode(" and provide your webhook URL when creating the payment consent PII. The URL must be registered and accessible from the API Hub. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: subscriptionExample,
                lang: "json",
                filename: "Consent PII subscription block"
              }),
              createVNode(_component_EdNote, { type: "tip" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The "),
                    createVNode("code", null, "Webhook.Url"),
                    createTextVNode(" must be the URL of your registered webhook endpoint — the API Hub will POST events directly to this address. ")
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
        id: "step-2",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Step 2",
        title: "Receive the event",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Hub delivers the event as an HTTP POST to your <code data-v-0da246ba${_scopeId2}>Webhook.Url</code>. The request body is a JWE compact serialisation string and the <code data-v-0da246ba${_scopeId2}>Content-Type</code> is <code data-v-0da246ba${_scopeId2}>application/jwe</code>. `);
                } else {
                  return [
                    createTextVNode(" The Hub delivers the event as an HTTP POST to your "),
                    createVNode("code", null, "Webhook.Url"),
                    createTextVNode(". The request body is a JWE compact serialisation string and the "),
                    createVNode("code", null, "Content-Type"),
                    createTextVNode(" is "),
                    createVNode("code", null, "application/jwe"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-0da246ba${_scopeId}>Request headers you will receive</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-0da246ba${_scopeId2}><thead data-v-0da246ba${_scopeId2}><tr data-v-0da246ba${_scopeId2}><th data-v-0da246ba${_scopeId2}>Header</th><th data-v-0da246ba${_scopeId2}>Description</th></tr></thead><tbody data-v-0da246ba${_scopeId2}><tr data-v-0da246ba${_scopeId2}><td data-v-0da246ba${_scopeId2}><code data-v-0da246ba${_scopeId2}>Content-Type</code></td><td data-v-0da246ba${_scopeId2}><code data-v-0da246ba${_scopeId2}>application/jwe</code></td></tr><tr data-v-0da246ba${_scopeId2}><td data-v-0da246ba${_scopeId2}><code data-v-0da246ba${_scopeId2}>x-fapi-interaction-id</code></td><td data-v-0da246ba${_scopeId2}>RFC4122 UUID used as a correlation ID for this event delivery</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Header"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Content-Type")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "application/jwe")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "x-fapi-interaction-id")
                          ]),
                          createVNode("td", null, "RFC4122 UUID used as a correlation ID for this event delivery")
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Hub delivers the event as an HTTP POST to your "),
                  createVNode("code", null, "Webhook.Url"),
                  createTextVNode(". The request body is a JWE compact serialisation string and the "),
                  createVNode("code", null, "Content-Type"),
                  createTextVNode(" is "),
                  createVNode("code", null, "application/jwe"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Request headers you will receive"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Header"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Content-Type")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "application/jwe")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "x-fapi-interaction-id")
                        ]),
                        createVNode("td", null, "RFC4122 UUID used as a correlation ID for this event delivery")
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
        id: "step-3",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Step 3",
        title: "Respond with 202 Accepted before processing",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You must respond with <code data-v-0da246ba${_scopeId2}>202 Accepted</code> and an <strong data-v-0da246ba${_scopeId2}>empty body</strong> before performing any processing. The Hub expects an immediate acknowledgement — do not wait for decryption or business logic before responding. `);
                } else {
                  return [
                    createTextVNode(" You must respond with "),
                    createVNode("code", null, "202 Accepted"),
                    createTextVNode(" and an "),
                    createVNode("strong", null, "empty body"),
                    createTextVNode(" before performing any processing. The Hub expects an immediate acknowledgement — do not wait for decryption or business logic before responding. ")
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
                  _push3(`<p data-v-0da246ba${_scopeId2}> Failure to respond with <code data-v-0da246ba${_scopeId2}>202</code> promptly may cause the Hub to retry delivery. Process the event payload asynchronously after acknowledging receipt. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Failure to respond with "),
                      createVNode("code", null, "202"),
                      createTextVNode(" promptly may cause the Hub to retry delivery. Process the event payload asynchronously after acknowledging receipt. ")
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
                  createTextVNode(" You must respond with "),
                  createVNode("code", null, "202 Accepted"),
                  createTextVNode(" and an "),
                  createVNode("strong", null, "empty body"),
                  createTextVNode(" before performing any processing. The Hub expects an immediate acknowledgement — do not wait for decryption or business logic before responding. ")
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
                    createTextVNode(" promptly may cause the Hub to retry delivery. Process the event payload asynchronously after acknowledging receipt. ")
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
        id: "step-4",
        num: "07",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 4",
        title: "Decrypt the JWE and verify the inner JWS",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The event is a JWE compact serialisation encrypted with your public <strong data-v-0da246ba${_scopeId2}>Encryption Certificate</strong>. The JWE header contains a <code data-v-0da246ba${_scopeId2}>kid</code> that identifies which of your registered encryption keys was used — decode the header first to select the correct private key, then decrypt. `);
                } else {
                  return [
                    createTextVNode(" The event is a JWE compact serialisation encrypted with your public "),
                    createVNode("strong", null, "Encryption Certificate"),
                    createTextVNode(". The JWE header contains a "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" that identifies which of your registered encryption keys was used — decode the header first to select the correct private key, then decrypt. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/receiving-events" data-v-0da246ba${_scopeId2}>Receiving Event Notifications</a> for the full FAPI-aligned guidance, including key selection by <code data-v-0da246ba${_scopeId2}>kid</code>, JWS signature verification, and required security checks. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
                    createTextVNode(" for the full FAPI-aligned guidance, including key selection by "),
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
                  createTextVNode(" The event is a JWE compact serialisation encrypted with your public "),
                  createVNode("strong", null, "Encryption Certificate"),
                  createTextVNode(". The JWE header contains a "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" that identifies which of your registered encryption keys was used — decode the header first to select the correct private key, then decrypt. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
                  createTextVNode(" for the full FAPI-aligned guidance, including key selection by "),
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
        num: "08",
        color: "var(--at-navy)",
        eyebrow: "Event Payload — Meta",
        title: "Envelope metadata about the event itself",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The decrypted and decoded event payload contains the following structure under the <code data-v-0da246ba${_scopeId2}>message</code> claim. `);
                } else {
                  return [
                    createTextVNode(" The decrypted and decoded event payload contains the following structure under the "),
                    createVNode("code", null, "message"),
                    createTextVNode(" claim. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-0da246ba${_scopeId2}><thead data-v-0da246ba${_scopeId2}><tr data-v-0da246ba${_scopeId2}><th data-v-0da246ba${_scopeId2}>Field</th><th data-v-0da246ba${_scopeId2}>Type</th><th data-v-0da246ba${_scopeId2}>Description</th></tr></thead><tbody data-v-0da246ba${_scopeId2}><tr data-v-0da246ba${_scopeId2}><td data-v-0da246ba${_scopeId2}><code data-v-0da246ba${_scopeId2}>EventDateTime</code></td><td data-v-0da246ba${_scopeId2}>string (date-time)</td><td data-v-0da246ba${_scopeId2}>When the event was generated</td></tr><tr data-v-0da246ba${_scopeId2}><td data-v-0da246ba${_scopeId2}><code data-v-0da246ba${_scopeId2}>EventResource</code></td><td data-v-0da246ba${_scopeId2}>string</td><td data-v-0da246ba${_scopeId2}>The resource URI that triggered the event</td></tr><tr data-v-0da246ba${_scopeId2}><td data-v-0da246ba${_scopeId2}><code data-v-0da246ba${_scopeId2}>EventType</code></td><td data-v-0da246ba${_scopeId2}>string</td><td data-v-0da246ba${_scopeId2}>One of: <code data-v-0da246ba${_scopeId2}>Resource.Created</code>, <code data-v-0da246ba${_scopeId2}>Resource.Updated</code>, <code data-v-0da246ba${_scopeId2}>Resource.Deleted</code></td></tr><tr data-v-0da246ba${_scopeId2}><td data-v-0da246ba${_scopeId2}><code data-v-0da246ba${_scopeId2}>ConsentId</code></td><td data-v-0da246ba${_scopeId2}>string</td><td data-v-0da246ba${_scopeId2}>The consent identifier associated with the event</td></tr></tbody></table>`);
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
                          createVNode("td", null, "When the event was generated")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "EventResource")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The resource URI that triggered the event")
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
                            createVNode("code", null, "Resource.Deleted")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConsentId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The consent identifier associated with the event")
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The decrypted and decoded event payload contains the following structure under the "),
                  createVNode("code", null, "message"),
                  createTextVNode(" claim. ")
                ]),
                _: 1
              }),
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
                        createVNode("td", null, "When the event was generated")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "EventResource")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The resource URI that triggered the event")
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
                          createVNode("code", null, "Resource.Deleted")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConsentId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The consent identifier associated with the event")
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
        num: "09",
        color: "var(--at-teal-deep)",
        eyebrow: "Event Payload — Data",
        title: "A replica of the payment at the time of the change",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A replica of the payment resource at the time of the status change, with <code data-v-0da246ba${_scopeId2}>Status</code> and <code data-v-0da246ba${_scopeId2}>StatusUpdateDateTime</code> updated to reflect the new state. Where the payment was rejected, <code data-v-0da246ba${_scopeId2}>RejectReasonCode</code> will be populated. Where the payment has been processed by the underlying rails, <code data-v-0da246ba${_scopeId2}>PaymentTransactionId</code> will be present. `);
                } else {
                  return [
                    createTextVNode(" A replica of the payment resource at the time of the status change, with "),
                    createVNode("code", null, "Status"),
                    createTextVNode(" and "),
                    createVNode("code", null, "StatusUpdateDateTime"),
                    createTextVNode(" updated to reflect the new state. Where the payment was rejected, "),
                    createVNode("code", null, "RejectReasonCode"),
                    createTextVNode(" will be populated. Where the payment has been processed by the underlying rails, "),
                    createVNode("code", null, "PaymentTransactionId"),
                    createTextVNode(" will be present. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A replica of the payment resource at the time of the status change, with "),
                  createVNode("code", null, "Status"),
                  createTextVNode(" and "),
                  createVNode("code", null, "StatusUpdateDateTime"),
                  createTextVNode(" updated to reflect the new state. Where the payment was rejected, "),
                  createVNode("code", null, "RejectReasonCode"),
                  createTextVNode(" will be populated. Where the payment has been processed by the underlying rails, "),
                  createVNode("code", null, "PaymentTransactionId"),
                  createTextVNode(" will be present. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-payload",
        num: "10",
        color: "var(--at-gold)",
        eyebrow: "Example",
        title: "Decrypted event payload",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: examplePayload,
              lang: "json",
              filename: "Decrypted JWS payload"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: examplePayload,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0da246ba"]]);
export {
  apiGuide as default
};
