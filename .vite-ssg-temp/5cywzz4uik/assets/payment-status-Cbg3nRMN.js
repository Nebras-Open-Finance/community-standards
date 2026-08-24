import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as _sfc_main$1 } from "./TPPPaymentStatus-Bcy8bQP8.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_APIFlowViewer = __unplugin_components_8;
  const _component_TPPPaymentStatus = _sfc_main$1;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-4687a78d><section class="ed-doc__hero" data-v-4687a78d><div class="ed-doc__inner" data-v-4687a78d><div class="ed-doc__eyebrow" data-v-4687a78d><span class="ed-doc__eyebrow-dash" data-v-4687a78d></span> Service Initiation · Domestic Payments · Status </div><h1 class="ed-doc__title" data-v-4687a78d> Payment Status <span class="ed-doc__read" data-v-4687a78d>5 min read</span></h1><p class="ed-doc__lede" data-v-4687a78d> Every domestic payment initiated through the API Hub is executed by the LFI in one of three modes: <strong data-v-4687a78d>intra-bank</strong> (both debtor and creditor accounts are held at the same LFI, so no rail is used), <strong data-v-4687a78d>AANI</strong> (the UAE&#39;s instant payment rail, used as the primary interbank rail), or <strong data-v-4687a78d>UAEFTS</strong> (the UAE Funds Transfer System, used as the fallback interbank rail). Your TPP does not select the execution mode — the LFI owns that decision. </p><p class="ed-doc__lede" data-v-4687a78d> Your TPP receives status updates for every payment through two complementary mechanisms: <strong data-v-4687a78d>event notifications</strong> (the Hub pushes a webhook to your registered endpoint each time status changes) and <strong data-v-4687a78d>polling</strong> (<span class="endpoint" data-v-4687a78d><span class="http-method http-method--get" data-v-4687a78d>GET</span><code data-v-4687a78d>/payments/{paymentId}</code></span> on the API Hub). This page covers how to receive status, what each status means, and which statuses you can expect for each execution mode. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "how-received",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Receiving Status",
    title: "How your TPP receives payment status",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Payment status retrieval" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_TPPPaymentStatus, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_TPPPaymentStatus)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-4687a78d${_scopeId}>Event notifications (recommended)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` When your consent is created with <code data-v-4687a78d${_scopeId2}>subscription.Webhook.IsActive: true</code> and a registered <code data-v-4687a78d${_scopeId2}>Webhook.Url</code>, the API Hub pushes a Payment Status Event to your endpoint each time the LFI PATCHes a new status to the Hub. Events are delivered as JWE-encrypted POST requests signed with your registered Encryption Certificate. Your TPP MUST respond with <code data-v-4687a78d${_scopeId2}>202 Accepted</code> immediately and decrypt the payload asynchronously. `);
            } else {
              return [
                createTextVNode(" When your consent is created with "),
                createVNode("code", null, "subscription.Webhook.IsActive: true"),
                createTextVNode(" and a registered "),
                createVNode("code", null, "Webhook.Url"),
                createTextVNode(", the API Hub pushes a Payment Status Event to your endpoint each time the LFI PATCHes a new status to the Hub. Events are delivered as JWE-encrypted POST requests signed with your registered Encryption Certificate. Your TPP MUST respond with "),
                createVNode("code", null, "202 Accepted"),
                createTextVNode(" immediately and decrypt the payload asynchronously. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Event notifications are the recommended mechanism — they provide the lowest latency and remove the need for your TPP to poll. See the <a href="/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" data-v-4687a78d${_scopeId2}>Payment Status Event API Guide</a> for the full event shape, encryption requirements, and retry semantics. `);
            } else {
              return [
                createTextVNode(" Event notifications are the recommended mechanism — they provide the lowest latency and remove the need for your TPP to poll. See the "),
                createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" }, "Payment Status Event API Guide"),
                createTextVNode(" for the full event shape, encryption requirements, and retry semantics. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-4687a78d${_scopeId}>Polling (fallback)</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Your TPP MAY instead call <a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint" data-v-4687a78d${_scopeId2}><span class="http-method http-method--get" data-v-4687a78d${_scopeId2}>GET</span><code data-v-4687a78d${_scopeId2}>/payments/{paymentId}</code></a> on the API Hub to retrieve the current status on demand. Polling is appropriate when: `);
            } else {
              return [
                createTextVNode(" Your TPP MAY instead call "),
                createVNode("a", {
                  href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/payments/{paymentId}")
                ]),
                createTextVNode(" on the API Hub to retrieve the current status on demand. Polling is appropriate when: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-4687a78d${_scopeId2}>Your TPP has not registered a webhook endpoint for this consent.</li><li data-v-4687a78d${_scopeId2}>You need to reconcile a missed or late event.</li><li data-v-4687a78d${_scopeId2}>You want to confirm the authoritative status before acting on an event payload.</li>`);
            } else {
              return [
                createVNode("li", null, "Your TPP has not registered a webhook endpoint for this consent."),
                createVNode("li", null, "You need to reconcile a missed or late event."),
                createVNode("li", null, "You want to confirm the authoritative status before acting on an event payload.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` When polling, start shortly after <span class="endpoint" data-v-4687a78d${_scopeId2}><span class="http-method http-method--post" data-v-4687a78d${_scopeId2}>POST</span><code data-v-4687a78d${_scopeId2}>/payments</code></span> to catch immediate pre-rail rejections, back off as time passes, and stop polling once the payment reaches a terminal status (<code data-v-4687a78d${_scopeId2}>AcceptedWithoutPosting</code>, <code data-v-4687a78d${_scopeId2}>AcceptedCreditSettlementCompleted</code>, or <code data-v-4687a78d${_scopeId2}>Rejected</code>). `);
            } else {
              return [
                createTextVNode(" When polling, start shortly after "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/payments")
                ]),
                createTextVNode(" to catch immediate pre-rail rejections, back off as time passes, and stop polling once the payment reaches a terminal status ("),
                createVNode("code", null, "AcceptedWithoutPosting"),
                createTextVNode(", "),
                createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                createTextVNode(", or "),
                createVNode("code", null, "Rejected"),
                createTextVNode("). ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_APIFlowViewer, { title: "Payment status retrieval" }, {
            default: withCtx(() => [
              createVNode(_component_TPPPaymentStatus)
            ]),
            _: 1
          }),
          createVNode("h3", null, "Event notifications (recommended)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" When your consent is created with "),
              createVNode("code", null, "subscription.Webhook.IsActive: true"),
              createTextVNode(" and a registered "),
              createVNode("code", null, "Webhook.Url"),
              createTextVNode(", the API Hub pushes a Payment Status Event to your endpoint each time the LFI PATCHes a new status to the Hub. Events are delivered as JWE-encrypted POST requests signed with your registered Encryption Certificate. Your TPP MUST respond with "),
              createVNode("code", null, "202 Accepted"),
              createTextVNode(" immediately and decrypt the payload asynchronously. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Event notifications are the recommended mechanism — they provide the lowest latency and remove the need for your TPP to poll. See the "),
              createVNode("a", { href: "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide" }, "Payment Status Event API Guide"),
              createTextVNode(" for the full event shape, encryption requirements, and retry semantics. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Polling (fallback)"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Your TPP MAY instead call "),
              createVNode("a", {
                href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId",
                class: "endpoint"
              }, [
                createVNode("span", { class: "http-method http-method--get" }, "GET"),
                createVNode("code", null, "/payments/{paymentId}")
              ]),
              createTextVNode(" on the API Hub to retrieve the current status on demand. Polling is appropriate when: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Your TPP has not registered a webhook endpoint for this consent."),
              createVNode("li", null, "You need to reconcile a missed or late event."),
              createVNode("li", null, "You want to confirm the authoritative status before acting on an event payload.")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" When polling, start shortly after "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/payments")
              ]),
              createTextVNode(" to catch immediate pre-rail rejections, back off as time passes, and stop polling once the payment reaches a terminal status ("),
              createVNode("code", null, "AcceptedWithoutPosting"),
              createTextVNode(", "),
              createVNode("code", null, "AcceptedCreditSettlementCompleted"),
              createTextVNode(", or "),
              createVNode("code", null, "Rejected"),
              createTextVNode("). ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "statuses",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Status Enum",
    title: "Open Finance payment statuses",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The Open Finance payment status enum aligns with ISO 20022 <code data-v-4687a78d${_scopeId2}>ExternalPaymentTransactionStatus1Code</code>. Five values are relevant for domestic payments: `);
            } else {
              return [
                createTextVNode(" The Open Finance payment status enum aligns with ISO 20022 "),
                createVNode("code", null, "ExternalPaymentTransactionStatus1Code"),
                createTextVNode(". Five values are relevant for domestic payments: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-4687a78d${_scopeId2}><thead data-v-4687a78d${_scopeId2}><tr data-v-4687a78d${_scopeId2}><th data-v-4687a78d${_scopeId2}>Open Finance status</th><th data-v-4687a78d${_scopeId2}>ISO 20022</th><th data-v-4687a78d${_scopeId2}>Meaning</th><th data-v-4687a78d${_scopeId2}>Terminal?</th></tr></thead><tbody data-v-4687a78d${_scopeId2}><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>Pending</code></td><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>PDNG</code></td><td data-v-4687a78d${_scopeId2}> Payment accepted for processing; rail submission or internal execution outstanding. This is the initial status returned in the <span class="endpoint" data-v-4687a78d${_scopeId2}><span class="http-method http-method--post" data-v-4687a78d${_scopeId2}>POST</span><code data-v-4687a78d${_scopeId2}>/payments</code></span> response </td><td data-v-4687a78d${_scopeId2}>No</td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AcceptedSettlementCompleted</code></td><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>ACSC</code></td><td data-v-4687a78d${_scopeId2}> Settlement of the debtor account has been completed. Indicates progression but does not guarantee the creditor side is complete </td><td data-v-4687a78d${_scopeId2}>No</td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AcceptedWithoutPosting</code></td><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>ACWP</code></td><td data-v-4687a78d${_scopeId2}> The receiving bank has accepted the payment; the originating LFI cannot confirm that the credit has posted to the creditor account </td><td data-v-4687a78d${_scopeId2}>Yes (on AANI)</td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AcceptedCreditSettlementCompleted</code></td><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>ACCC</code></td><td data-v-4687a78d${_scopeId2}>The creditor account has been credited with the funds of the payment</td><td data-v-4687a78d${_scopeId2}>Yes (on UAEFTS and intra-bank)</td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>Rejected</code></td><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>RJCT</code></td><td data-v-4687a78d${_scopeId2}> The payment was rejected, either pre-rail by the LFI or post-rail by AANI or UAEFTS </td><td data-v-4687a78d${_scopeId2}>Yes</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Open Finance status"),
                      createVNode("th", null, "ISO 20022"),
                      createVNode("th", null, "Meaning"),
                      createVNode("th", null, "Terminal?")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "Pending")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "PDNG")
                      ]),
                      createVNode("td", null, [
                        createTextVNode(" Payment accepted for processing; rail submission or internal execution outstanding. This is the initial status returned in the "),
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/payments")
                        ]),
                        createTextVNode(" response ")
                      ]),
                      createVNode("td", null, "No")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AcceptedSettlementCompleted")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "ACSC")
                      ]),
                      createVNode("td", null, " Settlement of the debtor account has been completed. Indicates progression but does not guarantee the creditor side is complete "),
                      createVNode("td", null, "No")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AcceptedWithoutPosting")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "ACWP")
                      ]),
                      createVNode("td", null, " The receiving bank has accepted the payment; the originating LFI cannot confirm that the credit has posted to the creditor account "),
                      createVNode("td", null, "Yes (on AANI)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AcceptedCreditSettlementCompleted")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "ACCC")
                      ]),
                      createVNode("td", null, "The creditor account has been credited with the funds of the payment"),
                      createVNode("td", null, "Yes (on UAEFTS and intra-bank)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "Rejected")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "RJCT")
                      ]),
                      createVNode("td", null, " The payment was rejected, either pre-rail by the LFI or post-rail by AANI or UAEFTS "),
                      createVNode("td", null, "Yes")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Received status"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-4687a78d${_scopeId2}> The Open Finance enum also includes <code data-v-4687a78d${_scopeId2}>Received</code> (ISO 20022 <code data-v-4687a78d${_scopeId2}>RCVD</code>), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions. Bulk and batch payments are not yet documented in v2.1 — for the domestic single and multi-payments covered by this page, you can ignore <code data-v-4687a78d${_scopeId2}>Received</code>. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The Open Finance enum also includes "),
                  createVNode("code", null, "Received"),
                  createTextVNode(" (ISO 20022 "),
                  createVNode("code", null, "RCVD"),
                  createTextVNode("), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions. Bulk and batch payments are not yet documented in v2.1 — for the domestic single and multi-payments covered by this page, you can ignore "),
                  createVNode("code", null, "Received"),
                  createTextVNode(". ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Once a payment reaches a terminal status (<code data-v-4687a78d${_scopeId2}>AcceptedWithoutPosting</code>, <code data-v-4687a78d${_scopeId2}>AcceptedCreditSettlementCompleted</code>, or <code data-v-4687a78d${_scopeId2}>Rejected</code>), its status will not change again. `);
            } else {
              return [
                createTextVNode(" Once a payment reaches a terminal status ("),
                createVNode("code", null, "AcceptedWithoutPosting"),
                createTextVNode(", "),
                createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                createTextVNode(", or "),
                createVNode("code", null, "Rejected"),
                createTextVNode("), its status will not change again. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The Open Finance payment status enum aligns with ISO 20022 "),
              createVNode("code", null, "ExternalPaymentTransactionStatus1Code"),
              createTextVNode(". Five values are relevant for domestic payments: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Open Finance status"),
                    createVNode("th", null, "ISO 20022"),
                    createVNode("th", null, "Meaning"),
                    createVNode("th", null, "Terminal?")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Pending")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "PDNG")
                    ]),
                    createVNode("td", null, [
                      createTextVNode(" Payment accepted for processing; rail submission or internal execution outstanding. This is the initial status returned in the "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" response ")
                    ]),
                    createVNode("td", null, "No")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AcceptedSettlementCompleted")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "ACSC")
                    ]),
                    createVNode("td", null, " Settlement of the debtor account has been completed. Indicates progression but does not guarantee the creditor side is complete "),
                    createVNode("td", null, "No")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AcceptedWithoutPosting")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "ACWP")
                    ]),
                    createVNode("td", null, " The receiving bank has accepted the payment; the originating LFI cannot confirm that the credit has posted to the creditor account "),
                    createVNode("td", null, "Yes (on AANI)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AcceptedCreditSettlementCompleted")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "ACCC")
                    ]),
                    createVNode("td", null, "The creditor account has been credited with the funds of the payment"),
                    createVNode("td", null, "Yes (on UAEFTS and intra-bank)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Rejected")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "RJCT")
                    ]),
                    createVNode("td", null, " The payment was rejected, either pre-rail by the LFI or post-rail by AANI or UAEFTS "),
                    createVNode("td", null, "Yes")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Received status"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The Open Finance enum also includes "),
                createVNode("code", null, "Received"),
                createTextVNode(" (ISO 20022 "),
                createVNode("code", null, "RCVD"),
                createTextVNode("), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions. Bulk and batch payments are not yet documented in v2.1 — for the domestic single and multi-payments covered by this page, you can ignore "),
                createVNode("code", null, "Received"),
                createTextVNode(". ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Once a payment reaches a terminal status ("),
              createVNode("code", null, "AcceptedWithoutPosting"),
              createTextVNode(", "),
              createVNode("code", null, "AcceptedCreditSettlementCompleted"),
              createTextVNode(", or "),
              createVNode("code", null, "Rejected"),
              createTextVNode("), its status will not change again. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "rail-selection",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Execution Modes",
    title: "Rail selection and the statuses you can expect",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The LFI selects the execution mode on receipt of each <span class="endpoint" data-v-4687a78d${_scopeId2}><span class="http-method http-method--post" data-v-4687a78d${_scopeId2}>POST</span><code data-v-4687a78d${_scopeId2}>/payments</code></span>. The rule is: `);
            } else {
              return [
                createTextVNode(" The LFI selects the execution mode on receipt of each "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/payments")
                ]),
                createTextVNode(". The rule is: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>Intra-bank</strong> — if both the debtor and creditor accounts are held at the same LFI, the payment is executed internally without a rail. </li><li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>AANI</strong> — otherwise, the LFI submits the payment to AANI whenever the receiving bank and account are reachable on AANI. </li><li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>UAEFTS</strong> — if AANI is unavailable or cannot reach the receiving bank, the LFI falls back to UAEFTS. The fall-back is automatic; your TPP and the customer are not involved. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Intra-bank"),
                  createTextVNode(" — if both the debtor and creditor accounts are held at the same LFI, the payment is executed internally without a rail. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "AANI"),
                  createTextVNode(" — otherwise, the LFI submits the payment to AANI whenever the receiving bank and account are reachable on AANI. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "UAEFTS"),
                  createTextVNode(" — if AANI is unavailable or cannot reach the receiving bank, the LFI falls back to UAEFTS. The fall-back is automatic; your TPP and the customer are not involved. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If neither rail can reach the receiving bank, the LFI rejects the payment pre-rail before ever submitting it. The status set your TPP should expect depends on which mode the LFI chose: `);
            } else {
              return [
                createTextVNode(" If neither rail can reach the receiving bank, the LFI rejects the payment pre-rail before ever submitting it. The status set your TPP should expect depends on which mode the LFI chose: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-4687a78d${_scopeId}>Intra-bank</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Both accounts are at the same LFI, so the LFI has full visibility of both legs and can confirm the creditor has been credited. `);
            } else {
              return [
                createTextVNode(" Both accounts are at the same LFI, so the LFI has full visibility of both legs and can confirm the creditor has been credited. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>Success path:</strong> <code data-v-4687a78d${_scopeId2}>Pending</code> → <code data-v-4687a78d${_scopeId2}>AcceptedCreditSettlementCompleted</code></li><li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>Rejection path:</strong> <code data-v-4687a78d${_scopeId2}>Pending</code> → <code data-v-4687a78d${_scopeId2}>Rejected</code> (with <code data-v-4687a78d${_scopeId2}>LFI.&lt;reasonCode&gt;</code>) </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Success path:"),
                  createTextVNode(),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" → "),
                  createVNode("code", null, "AcceptedCreditSettlementCompleted")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Rejection path:"),
                  createTextVNode(),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" → "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(" (with "),
                  createVNode("code", null, "LFI.<reasonCode>"),
                  createTextVNode(") ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-4687a78d${_scopeId}>AANI</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` AANI is the UAE&#39;s instant payment rail. It settles within seconds and returns either a positive Account Verification Response (the receiving bank has accepted) or a rejection. AANI does not expose a credit-posting signal to the originating LFI, so the terminal successful status is <code data-v-4687a78d${_scopeId2}>AcceptedWithoutPosting</code> rather than <code data-v-4687a78d${_scopeId2}>AcceptedCreditSettlementCompleted</code>. `);
            } else {
              return [
                createTextVNode(" AANI is the UAE's instant payment rail. It settles within seconds and returns either a positive Account Verification Response (the receiving bank has accepted) or a rejection. AANI does not expose a credit-posting signal to the originating LFI, so the terminal successful status is "),
                createVNode("code", null, "AcceptedWithoutPosting"),
                createTextVNode(" rather than "),
                createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>Success path:</strong> <code data-v-4687a78d${_scopeId2}>Pending</code> → <code data-v-4687a78d${_scopeId2}>AcceptedWithoutPosting</code></li><li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>Rejection path:</strong> <code data-v-4687a78d${_scopeId2}>Pending</code> → <code data-v-4687a78d${_scopeId2}>Rejected</code> (with <code data-v-4687a78d${_scopeId2}>AANI.&lt;reasonCode&gt;</code>) </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Success path:"),
                  createTextVNode(),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" → "),
                  createVNode("code", null, "AcceptedWithoutPosting")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Rejection path:"),
                  createTextVNode(),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" → "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(" (with "),
                  createVNode("code", null, "AANI.<reasonCode>"),
                  createTextVNode(") ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-4687a78d${_scopeId}>UAEFTS</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` UAEFTS is the UAE Funds Transfer System, operated by the Central Bank. It carries payments over ISO 20022 <code data-v-4687a78d${_scopeId2}>pacs.008</code> messaging and settles through the Central Bank as a centralised interbank clearing. Because settlement is centralised, the CB900 Debit Confirmation implicitly confirms the creditor side, so the terminal successful status is <code data-v-4687a78d${_scopeId2}>AcceptedCreditSettlementCompleted</code>. `);
            } else {
              return [
                createTextVNode(" UAEFTS is the UAE Funds Transfer System, operated by the Central Bank. It carries payments over ISO 20022 "),
                createVNode("code", null, "pacs.008"),
                createTextVNode(" messaging and settles through the Central Bank as a centralised interbank clearing. Because settlement is centralised, the CB900 Debit Confirmation implicitly confirms the creditor side, so the terminal successful status is "),
                createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                createTextVNode(". ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>Success path:</strong> <code data-v-4687a78d${_scopeId2}>Pending</code> → (optionally <code data-v-4687a78d${_scopeId2}>AcceptedSettlementCompleted</code>) → <code data-v-4687a78d${_scopeId2}>AcceptedCreditSettlementCompleted</code></li><li data-v-4687a78d${_scopeId2}><strong data-v-4687a78d${_scopeId2}>Rejection path:</strong> <code data-v-4687a78d${_scopeId2}>Pending</code> → <code data-v-4687a78d${_scopeId2}>Rejected</code> (with <code data-v-4687a78d${_scopeId2}>FTS.&lt;reasonCode&gt;</code>) </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Success path:"),
                  createTextVNode(),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" → (optionally "),
                  createVNode("code", null, "AcceptedSettlementCompleted"),
                  createTextVNode(") → "),
                  createVNode("code", null, "AcceptedCreditSettlementCompleted")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Rejection path:"),
                  createTextVNode(),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" → "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(" (with "),
                  createVNode("code", null, "FTS.<reasonCode>"),
                  createTextVNode(") ")
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
              createTextVNode(" The LFI selects the execution mode on receipt of each "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/payments")
              ]),
              createTextVNode(". The rule is: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Intra-bank"),
                createTextVNode(" — if both the debtor and creditor accounts are held at the same LFI, the payment is executed internally without a rail. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "AANI"),
                createTextVNode(" — otherwise, the LFI submits the payment to AANI whenever the receiving bank and account are reachable on AANI. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "UAEFTS"),
                createTextVNode(" — if AANI is unavailable or cannot reach the receiving bank, the LFI falls back to UAEFTS. The fall-back is automatic; your TPP and the customer are not involved. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If neither rail can reach the receiving bank, the LFI rejects the payment pre-rail before ever submitting it. The status set your TPP should expect depends on which mode the LFI chose: ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Intra-bank"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Both accounts are at the same LFI, so the LFI has full visibility of both legs and can confirm the creditor has been credited. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Success path:"),
                createTextVNode(),
                createVNode("code", null, "Pending"),
                createTextVNode(" → "),
                createVNode("code", null, "AcceptedCreditSettlementCompleted")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Rejection path:"),
                createTextVNode(),
                createVNode("code", null, "Pending"),
                createTextVNode(" → "),
                createVNode("code", null, "Rejected"),
                createTextVNode(" (with "),
                createVNode("code", null, "LFI.<reasonCode>"),
                createTextVNode(") ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "AANI"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" AANI is the UAE's instant payment rail. It settles within seconds and returns either a positive Account Verification Response (the receiving bank has accepted) or a rejection. AANI does not expose a credit-posting signal to the originating LFI, so the terminal successful status is "),
              createVNode("code", null, "AcceptedWithoutPosting"),
              createTextVNode(" rather than "),
              createVNode("code", null, "AcceptedCreditSettlementCompleted"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Success path:"),
                createTextVNode(),
                createVNode("code", null, "Pending"),
                createTextVNode(" → "),
                createVNode("code", null, "AcceptedWithoutPosting")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Rejection path:"),
                createTextVNode(),
                createVNode("code", null, "Pending"),
                createTextVNode(" → "),
                createVNode("code", null, "Rejected"),
                createTextVNode(" (with "),
                createVNode("code", null, "AANI.<reasonCode>"),
                createTextVNode(") ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "UAEFTS"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" UAEFTS is the UAE Funds Transfer System, operated by the Central Bank. It carries payments over ISO 20022 "),
              createVNode("code", null, "pacs.008"),
              createTextVNode(" messaging and settles through the Central Bank as a centralised interbank clearing. Because settlement is centralised, the CB900 Debit Confirmation implicitly confirms the creditor side, so the terminal successful status is "),
              createVNode("code", null, "AcceptedCreditSettlementCompleted"),
              createTextVNode(". ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Success path:"),
                createTextVNode(),
                createVNode("code", null, "Pending"),
                createTextVNode(" → (optionally "),
                createVNode("code", null, "AcceptedSettlementCompleted"),
                createTextVNode(") → "),
                createVNode("code", null, "AcceptedCreditSettlementCompleted")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Rejection path:"),
                createTextVNode(),
                createVNode("code", null, "Pending"),
                createTextVNode(" → "),
                createVNode("code", null, "Rejected"),
                createTextVNode(" (with "),
                createVNode("code", null, "FTS.<reasonCode>"),
                createTextVNode(") ")
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
    id: "reject-codes",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Rejections",
    title: "Rejection reason codes",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` When a payment is rejected, the <code data-v-4687a78d${_scopeId2}>RejectReasonCode[]</code> array on the payment resource carries a namespaced <code data-v-4687a78d${_scopeId2}>Code</code>. The first segment identifies where the rejection originated: `);
            } else {
              return [
                createTextVNode(" When a payment is rejected, the "),
                createVNode("code", null, "RejectReasonCode[]"),
                createTextVNode(" array on the payment resource carries a namespaced "),
                createVNode("code", null, "Code"),
                createTextVNode(". The first segment identifies where the rejection originated: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-4687a78d${_scopeId2}><thead data-v-4687a78d${_scopeId2}><tr data-v-4687a78d${_scopeId2}><th data-v-4687a78d${_scopeId2}>Prefix</th><th data-v-4687a78d${_scopeId2}>Source</th><th data-v-4687a78d${_scopeId2}>Example</th></tr></thead><tbody data-v-4687a78d${_scopeId2}><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>LFI.</code></td><td data-v-4687a78d${_scopeId2}> The LFI rejected the payment pre-rail (fraud, sanctions, account state, insufficient funds) or rejected an intra-bank payment that never reached a rail </td><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>LFI.InsufficientFunds</code></td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AANI.</code></td><td data-v-4687a78d${_scopeId2}>AANI rejected the payment on-rail</td><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AANI.AC06</code></td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>FTS.</code></td><td data-v-4687a78d${_scopeId2}>UAEFTS rejected the payment on-rail</td><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>FTS.AC06</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Prefix"),
                      createVNode("th", null, "Source"),
                      createVNode("th", null, "Example")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "LFI.")
                      ]),
                      createVNode("td", null, " The LFI rejected the payment pre-rail (fraud, sanctions, account state, insufficient funds) or rejected an intra-bank payment that never reached a rail "),
                      createVNode("td", null, [
                        createVNode("code", null, "LFI.InsufficientFunds")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AANI.")
                      ]),
                      createVNode("td", null, "AANI rejected the payment on-rail"),
                      createVNode("td", null, [
                        createVNode("code", null, "AANI.AC06")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "FTS.")
                      ]),
                      createVNode("td", null, "UAEFTS rejected the payment on-rail"),
                      createVNode("td", null, [
                        createVNode("code", null, "FTS.AC06")
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The API Hub relays <code data-v-4687a78d${_scopeId2}>RejectReasonCode.Code</code> to your TPP verbatim — it does not remap rail codes into a different namespace. Your TPP SHOULD surface an actionable message to the customer where the underlying reason is recoverable (for example, insufficient funds), and SHOULD log the full code and message for diagnostic purposes. `);
            } else {
              return [
                createTextVNode(" The API Hub relays "),
                createVNode("code", null, "RejectReasonCode.Code"),
                createTextVNode(" to your TPP verbatim — it does not remap rail codes into a different namespace. Your TPP SHOULD surface an actionable message to the customer where the underlying reason is recoverable (for example, insufficient funds), and SHOULD log the full code and message for diagnostic purposes. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-4687a78d${_scopeId}>Illustrative AANI Reject Reason Codes</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The authoritative list of AANI reason codes is published in the AANI Core Service Interface Specification. The codes you will see most often are: `);
            } else {
              return [
                createTextVNode(" The authoritative list of AANI reason codes is published in the AANI Core Service Interface Specification. The codes you will see most often are: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-4687a78d${_scopeId2}><thead data-v-4687a78d${_scopeId2}><tr data-v-4687a78d${_scopeId2}><th data-v-4687a78d${_scopeId2}>AANI code</th><th data-v-4687a78d${_scopeId2}>Meaning</th></tr></thead><tbody data-v-4687a78d${_scopeId2}><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AC06</code></td><td data-v-4687a78d${_scopeId2}>Blocked Account</td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AC07</code></td><td data-v-4687a78d${_scopeId2}>Closed Creditor Account Number</td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AM04</code></td><td data-v-4687a78d${_scopeId2}>Insufficient Funds</td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>AM14</code></td><td data-v-4687a78d${_scopeId2}>Amount Exceeds Agreed Limit</td></tr><tr data-v-4687a78d${_scopeId2}><td data-v-4687a78d${_scopeId2}><code data-v-4687a78d${_scopeId2}>UCRD</code></td><td data-v-4687a78d${_scopeId2}>Unknown Creditor</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "AANI code"),
                      createVNode("th", null, "Meaning")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AC06")
                      ]),
                      createVNode("td", null, "Blocked Account")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AC07")
                      ]),
                      createVNode("td", null, "Closed Creditor Account Number")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AM04")
                      ]),
                      createVNode("td", null, "Insufficient Funds")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "AM14")
                      ]),
                      createVNode("td", null, "Amount Exceeds Agreed Limit")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "UCRD")
                      ]),
                      createVNode("td", null, "Unknown Creditor")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Where Open Finance defines a Prescriptive Error Code for the underlying condition (for example, <code data-v-4687a78d${_scopeId2}>Consent.TransientAccountAccessFailure</code>), the LFI MAY substitute the prescriptive code in place of the raw rail code. Your TPP SHOULD be prepared to handle either form. `);
            } else {
              return [
                createTextVNode(" Where Open Finance defines a Prescriptive Error Code for the underlying condition (for example, "),
                createVNode("code", null, "Consent.TransientAccountAccessFailure"),
                createTextVNode("), the LFI MAY substitute the prescriptive code in place of the raw rail code. Your TPP SHOULD be prepared to handle either form. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" When a payment is rejected, the "),
              createVNode("code", null, "RejectReasonCode[]"),
              createTextVNode(" array on the payment resource carries a namespaced "),
              createVNode("code", null, "Code"),
              createTextVNode(". The first segment identifies where the rejection originated: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Prefix"),
                    createVNode("th", null, "Source"),
                    createVNode("th", null, "Example")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "LFI.")
                    ]),
                    createVNode("td", null, " The LFI rejected the payment pre-rail (fraud, sanctions, account state, insufficient funds) or rejected an intra-bank payment that never reached a rail "),
                    createVNode("td", null, [
                      createVNode("code", null, "LFI.InsufficientFunds")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AANI.")
                    ]),
                    createVNode("td", null, "AANI rejected the payment on-rail"),
                    createVNode("td", null, [
                      createVNode("code", null, "AANI.AC06")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "FTS.")
                    ]),
                    createVNode("td", null, "UAEFTS rejected the payment on-rail"),
                    createVNode("td", null, [
                      createVNode("code", null, "FTS.AC06")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The API Hub relays "),
              createVNode("code", null, "RejectReasonCode.Code"),
              createTextVNode(" to your TPP verbatim — it does not remap rail codes into a different namespace. Your TPP SHOULD surface an actionable message to the customer where the underlying reason is recoverable (for example, insufficient funds), and SHOULD log the full code and message for diagnostic purposes. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Illustrative AANI Reject Reason Codes"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The authoritative list of AANI reason codes is published in the AANI Core Service Interface Specification. The codes you will see most often are: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "AANI code"),
                    createVNode("th", null, "Meaning")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AC06")
                    ]),
                    createVNode("td", null, "Blocked Account")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AC07")
                    ]),
                    createVNode("td", null, "Closed Creditor Account Number")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AM04")
                    ]),
                    createVNode("td", null, "Insufficient Funds")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AM14")
                    ]),
                    createVNode("td", null, "Amount Exceeds Agreed Limit")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "UCRD")
                    ]),
                    createVNode("td", null, "Unknown Creditor")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Where Open Finance defines a Prescriptive Error Code for the underlying condition (for example, "),
              createVNode("code", null, "Consent.TransientAccountAccessFailure"),
              createTextVNode("), the LFI MAY substitute the prescriptive code in place of the raw rail code. Your TPP SHOULD be prepared to handle either form. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/overview/payment-status.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const paymentStatus = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4687a78d"]]);
export {
  paymentStatus as default
};
