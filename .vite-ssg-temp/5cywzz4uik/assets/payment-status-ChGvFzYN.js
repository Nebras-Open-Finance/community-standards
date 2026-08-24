import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./AaniStatusMapping-xBbHNGjk.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
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
const patchBodyExample = `{
  "data": {
    "paymentId": "pmt-20260418-00023",
    "consentId": "cns-20260418-00011",
    "paymentTransactionId": "AANI-TX-7F4D0C1E",
    "status": "AcceptedWithoutPosting",
    "statusUpdateDateTime": "2026-04-18T10:14:22.845Z"
  }
}
`;
const patchRejectedExample = `{
  "data": {
    "paymentId": "pmt-20260418-00023",
    "consentId": "cns-20260418-00011",
    "status": "Rejected",
    "statusUpdateDateTime": "2026-04-18T10:14:22.845Z",
    "rejectReasonCode": [
      {
        "code": "AANI.AM04",
        "message": "Insufficient funds at the receiving bank"
      }
    ]
  }
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payment-status",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_AaniStatusMapping = _sfc_main$1;
      const _component_FtsStatusMapping = _sfc_main$2;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b317223e><section class="ed-doc__hero" data-v-b317223e><div class="ed-doc__inner" data-v-b317223e><div class="ed-doc__eyebrow" data-v-b317223e><span class="ed-doc__eyebrow-dash" data-v-b317223e></span> LFI · Banking · Service Initiation · Domestic Payments </div><h1 class="ed-doc__title" data-v-b317223e> Payment Status <span class="ed-doc__read" data-v-b317223e>7 min read</span></h1><p class="ed-doc__lede" data-v-b317223e> Every domestic payment initiated through the API Hub is executed in one of three modes: <strong data-v-b317223e>intra-bank</strong> (both debtor and creditor accounts are held at your LFI, so no rail is used), or one of the two domestic payment rails — <strong data-v-b317223e>AANI</strong> (the UAE&#39;s instant payment rail) and <strong data-v-b317223e>UAEFTS</strong> (the UAE Funds Transfer System). Your LFI is the only party that sees the raw execution outcome, so your LFI MUST map that outcome to an Open Finance payment status and propagate it to the Hub via the Consent Manager Payment Log. </p><p class="ed-doc__lede" data-v-b317223e> This page covers both concerns: how your LFI selects an execution mode, and how outcomes from each mode map to Open Finance statuses. For the consent lifecycle, see the <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/" data-v-b317223e>Consent Manager</a> section. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "open-finance-payment-statuses",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Payment Statuses",
        title: "Open Finance payment statuses",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Open Finance payment status enum is defined in the <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" data-v-b317223e${_scopeId2}>Ozone Connect Bank Service Initiation OpenAPI</a> and aligns with ISO 20022 <code data-v-b317223e${_scopeId2}>ExternalPaymentTransactionStatus1Code</code>. Six values are in scope: `);
                } else {
                  return [
                    createTextVNode(" The Open Finance payment status enum is defined in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" }, "Ozone Connect Bank Service Initiation OpenAPI"),
                    createTextVNode(" and aligns with ISO 20022 "),
                    createVNode("code", null, "ExternalPaymentTransactionStatus1Code"),
                    createTextVNode(". Six values are in scope: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b317223e${_scopeId2}><thead data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><th data-v-b317223e${_scopeId2}>Open Finance status</th><th data-v-b317223e${_scopeId2}>ISO 20022</th><th data-v-b317223e${_scopeId2}>Meaning</th></tr></thead><tbody data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>Pending</code></td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>PDNG</code></td><td data-v-b317223e${_scopeId2}>Payment accepted for processing; further checks or rail submission outstanding</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AcceptedSettlementCompleted</code></td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>ACSC</code></td><td data-v-b317223e${_scopeId2}>Settlement of the debtor account has been completed — a payment-processing state</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AcceptedWithoutPosting</code></td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>ACWP</code></td><td data-v-b317223e${_scopeId2}>The receiving bank has accepted the payment but your LFI cannot confirm the creditor account has been credited — a settlement state</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code></td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>ACCC</code></td><td data-v-b317223e${_scopeId2}>The creditor account has been credited with the funds of the payment</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>Rejected</code></td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>RJCT</code></td><td data-v-b317223e${_scopeId2}>The payment was rejected, either pre-rail by your LFI or post-rail by AANI / UAEFTS</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Open Finance status"),
                          createVNode("th", null, "ISO 20022"),
                          createVNode("th", null, "Meaning")
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
                          createVNode("td", null, "Payment accepted for processing; further checks or rail submission outstanding")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AcceptedSettlementCompleted")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "ACSC")
                          ]),
                          createVNode("td", null, "Settlement of the debtor account has been completed — a payment-processing state")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AcceptedWithoutPosting")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "ACWP")
                          ]),
                          createVNode("td", null, "The receiving bank has accepted the payment but your LFI cannot confirm the creditor account has been credited — a settlement state")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AcceptedCreditSettlementCompleted")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "ACCC")
                          ]),
                          createVNode("td", null, "The creditor account has been credited with the funds of the payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Rejected")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "RJCT")
                          ]),
                          createVNode("td", null, "The payment was rejected, either pre-rail by your LFI or post-rail by AANI / UAEFTS")
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
                  _push3(`<code data-v-b317223e${_scopeId2}>Pending</code> is the initial status your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" class="endpoint" data-v-b317223e${_scopeId2}><span class="http-method http-method--post" data-v-b317223e${_scopeId2}>POST</span><code data-v-b317223e${_scopeId2}>/payments</code></a> response returns — your LFI does <strong data-v-b317223e${_scopeId2}>not</strong> PATCH a payment to <code data-v-b317223e${_scopeId2}>Pending</code>. PATCH is only used to transition away from <code data-v-b317223e${_scopeId2}>Pending</code> to a terminal status. The statuses your LFI PATCHes for a domestic payment are therefore <code data-v-b317223e${_scopeId2}>AcceptedWithoutPosting</code>, <code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code>, and <code data-v-b317223e${_scopeId2}>Rejected</code>. <code data-v-b317223e${_scopeId2}>AcceptedSettlementCompleted</code> is available in the enum but is rarely written in isolation on AANI or UAEFTS, where debtor settlement and the receiving-side outcome resolve in a single rail response. `);
                } else {
                  return [
                    createVNode("code", null, "Pending"),
                    createTextVNode(" is the initial status your Ozone Connect "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" response returns — your LFI does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" PATCH a payment to "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(". PATCH is only used to transition away from "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" to a terminal status. The statuses your LFI PATCHes for a domestic payment are therefore "),
                    createVNode("code", null, "AcceptedWithoutPosting"),
                    createTextVNode(", "),
                    createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                    createTextVNode(", and "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(". "),
                    createVNode("code", null, "AcceptedSettlementCompleted"),
                    createTextVNode(" is available in the enum but is rarely written in isolation on AANI or UAEFTS, where debtor settlement and the receiving-side outcome resolve in a single rail response. ")
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
                  _push3(`<p data-v-b317223e${_scopeId2}> The Open Finance enum also includes a sixth value, <code data-v-b317223e${_scopeId2}>Received</code> (ISO 20022 <code data-v-b317223e${_scopeId2}>RCVD</code>), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions before processing individual payments. Bulk and batch payments are not yet documented in v2.2 — for the domestic single and multi-payments covered by this page, you can ignore <code data-v-b317223e${_scopeId2}>Received</code>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The Open Finance enum also includes a sixth value, "),
                      createVNode("code", null, "Received"),
                      createTextVNode(" (ISO 20022 "),
                      createVNode("code", null, "RCVD"),
                      createTextVNode("), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions before processing individual payments. Bulk and batch payments are not yet documented in v2.2 — for the domestic single and multi-payments covered by this page, you can ignore "),
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
                  _push3(` Once a payment reaches a terminal status (<code data-v-b317223e${_scopeId2}>AcceptedWithoutPosting</code>, <code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code>, or <code data-v-b317223e${_scopeId2}>Rejected</code>), your LFI MUST NOT transition it to a different value. `);
                } else {
                  return [
                    createTextVNode(" Once a payment reaches a terminal status ("),
                    createVNode("code", null, "AcceptedWithoutPosting"),
                    createTextVNode(", "),
                    createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                    createTextVNode(", or "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode("), your LFI MUST NOT transition it to a different value. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Open Finance payment status enum is defined in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" }, "Ozone Connect Bank Service Initiation OpenAPI"),
                  createTextVNode(" and aligns with ISO 20022 "),
                  createVNode("code", null, "ExternalPaymentTransactionStatus1Code"),
                  createTextVNode(". Six values are in scope: ")
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
                        createVNode("th", null, "Meaning")
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
                        createVNode("td", null, "Payment accepted for processing; further checks or rail submission outstanding")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AcceptedSettlementCompleted")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "ACSC")
                        ]),
                        createVNode("td", null, "Settlement of the debtor account has been completed — a payment-processing state")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AcceptedWithoutPosting")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "ACWP")
                        ]),
                        createVNode("td", null, "The receiving bank has accepted the payment but your LFI cannot confirm the creditor account has been credited — a settlement state")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AcceptedCreditSettlementCompleted")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "ACCC")
                        ]),
                        createVNode("td", null, "The creditor account has been credited with the funds of the payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Rejected")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "RJCT")
                        ]),
                        createVNode("td", null, "The payment was rejected, either pre-rail by your LFI or post-rail by AANI / UAEFTS")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Pending"),
                  createTextVNode(" is the initial status your Ozone Connect "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" response returns — your LFI does "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" PATCH a payment to "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(". PATCH is only used to transition away from "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" to a terminal status. The statuses your LFI PATCHes for a domestic payment are therefore "),
                  createVNode("code", null, "AcceptedWithoutPosting"),
                  createTextVNode(", "),
                  createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                  createTextVNode(", and "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(". "),
                  createVNode("code", null, "AcceptedSettlementCompleted"),
                  createTextVNode(" is available in the enum but is rarely written in isolation on AANI or UAEFTS, where debtor settlement and the receiving-side outcome resolve in a single rail response. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Received status"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The Open Finance enum also includes a sixth value, "),
                    createVNode("code", null, "Received"),
                    createTextVNode(" (ISO 20022 "),
                    createVNode("code", null, "RCVD"),
                    createTextVNode("), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions before processing individual payments. Bulk and batch payments are not yet documented in v2.2 — for the domestic single and multi-payments covered by this page, you can ignore "),
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
                  createTextVNode("), your LFI MUST NOT transition it to a different value. ")
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
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Rail Selection",
        title: "Rail selection",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Your LFI is responsible for choosing the execution mode for every domestic payment. The API Hub does not select a rail on your behalf, and the TPP and customer are not involved in the decision. Apply the following logic on receipt of <span class="endpoint" data-v-b317223e${_scopeId2}><span class="http-method http-method--post" data-v-b317223e${_scopeId2}>POST</span><code data-v-b317223e${_scopeId2}>/payments</code></span>: `);
                } else {
                  return [
                    createTextVNode(" Your LFI is responsible for choosing the execution mode for every domestic payment. The API Hub does not select a rail on your behalf, and the TPP and customer are not involved in the decision. Apply the following logic on receipt of "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b317223e${_scopeId2}><strong data-v-b317223e${_scopeId2}>Intra-bank</strong> — if both the debtor and creditor accounts are held at your LFI, execute the payment internally. No rail is used, and your LFI has end-to-end visibility of both legs.</li><li data-v-b317223e${_scopeId2}><strong data-v-b317223e${_scopeId2}>AANI</strong> — otherwise, submit the payment to AANI as the primary rail whenever the receiving bank and receiving account are reachable on AANI.</li><li data-v-b317223e${_scopeId2}><strong data-v-b317223e${_scopeId2}>UAEFTS</strong> — if AANI is unavailable or the receiving bank cannot receive via AANI, fall back to UAEFTS. The fall-back is automatic and MUST NOT require TPP or customer intervention.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Intra-bank"),
                      createTextVNode(" — if both the debtor and creditor accounts are held at your LFI, execute the payment internally. No rail is used, and your LFI has end-to-end visibility of both legs.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "AANI"),
                      createTextVNode(" — otherwise, submit the payment to AANI as the primary rail whenever the receiving bank and receiving account are reachable on AANI.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "UAEFTS"),
                      createTextVNode(" — if AANI is unavailable or the receiving bank cannot receive via AANI, fall back to UAEFTS. The fall-back is automatic and MUST NOT require TPP or customer intervention.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Your LFI MUST only reject a payment pre-rail for reachability reasons once both rails have been ruled out — that is, when the receiving bank is reachable on neither AANI nor UAEFTS. Set <code data-v-b317223e${_scopeId2}>RejectReasonCode.Code = LFI.&lt;reasonCode&gt;</code> (for example, <code data-v-b317223e${_scopeId2}>LFI.CreditorBankNotReachable</code>). `);
                } else {
                  return [
                    createTextVNode(" Your LFI MUST only reject a payment pre-rail for reachability reasons once both rails have been ruled out — that is, when the receiving bank is reachable on neither AANI nor UAEFTS. Set "),
                    createVNode("code", null, "RejectReasonCode.Code = LFI.<reasonCode>"),
                    createTextVNode(" (for example, "),
                    createVNode("code", null, "LFI.CreditorBankNotReachable"),
                    createTextVNode("). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Your LFI is responsible for choosing the execution mode for every domestic payment. The API Hub does not select a rail on your behalf, and the TPP and customer are not involved in the decision. Apply the following logic on receipt of "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Intra-bank"),
                    createTextVNode(" — if both the debtor and creditor accounts are held at your LFI, execute the payment internally. No rail is used, and your LFI has end-to-end visibility of both legs.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "AANI"),
                    createTextVNode(" — otherwise, submit the payment to AANI as the primary rail whenever the receiving bank and receiving account are reachable on AANI.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "UAEFTS"),
                    createTextVNode(" — if AANI is unavailable or the receiving bank cannot receive via AANI, fall back to UAEFTS. The fall-back is automatic and MUST NOT require TPP or customer intervention.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Your LFI MUST only reject a payment pre-rail for reachability reasons once both rails have been ruled out — that is, when the receiving bank is reachable on neither AANI nor UAEFTS. Set "),
                  createVNode("code", null, "RejectReasonCode.Code = LFI.<reasonCode>"),
                  createTextVNode(" (for example, "),
                  createVNode("code", null, "LFI.CreditorBankNotReachable"),
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
        id: "intra-bank-payments",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Intra-bank",
        title: "Intra-bank payments",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the debtor account and creditor account are both held at your LFI, there is no interbank rail involved — the payment is executed by an internal debit-and-credit within your core banking system. Your LFI has full visibility of both legs, so the payment can reach the most specific Open Finance terminal status: <code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code>. `);
                } else {
                  return [
                    createTextVNode(" When the debtor account and creditor account are both held at your LFI, there is no interbank rail involved — the payment is executed by an internal debit-and-credit within your core banking system. Your LFI has full visibility of both legs, so the payment can reach the most specific Open Finance terminal status: "),
                    createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The events that trigger a PATCH are:`);
                } else {
                  return [
                    createTextVNode("The events that trigger a PATCH are:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b317223e${_scopeId2}><thead data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><th data-v-b317223e${_scopeId2}>Intra-bank outcome</th><th data-v-b317223e${_scopeId2}>New Open Finance status</th><th data-v-b317223e${_scopeId2}>Notes</th></tr></thead><tbody data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}>Debtor debit and creditor credit both posted</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code></td><td data-v-b317223e${_scopeId2}>Terminal for intra-bank — your LFI knows the funds have definitely landed in the creditor account</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}>Internal rejection (screening, insufficient funds, account state, etc.)</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>Rejected</code></td><td data-v-b317223e${_scopeId2}>Set <code data-v-b317223e${_scopeId2}>RejectReasonCode.Code</code> to <code data-v-b317223e${_scopeId2}>LFI.&lt;reasonCode&gt;</code> — there is no rail namespace to fall back to</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Intra-bank outcome"),
                          createVNode("th", null, "New Open Finance status"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Debtor debit and creditor credit both posted"),
                          createVNode("td", null, [
                            createVNode("code", null, "AcceptedCreditSettlementCompleted")
                          ]),
                          createVNode("td", null, "Terminal for intra-bank — your LFI knows the funds have definitely landed in the creditor account")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Internal rejection (screening, insufficient funds, account state, etc.)"),
                          createVNode("td", null, [
                            createVNode("code", null, "Rejected")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Set "),
                            createVNode("code", null, "RejectReasonCode.Code"),
                            createTextVNode(" to "),
                            createVNode("code", null, "LFI.<reasonCode>"),
                            createTextVNode(" — there is no rail namespace to fall back to")
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
                  _push3(` Intra-bank payments have no <code data-v-b317223e${_scopeId2}>paymentTransactionId</code> assigned by a rail. If your internal core assigns an end-to-end reference, you MAY include it as <code data-v-b317223e${_scopeId2}>paymentTransactionId</code>; otherwise omit the field. `);
                } else {
                  return [
                    createTextVNode(" Intra-bank payments have no "),
                    createVNode("code", null, "paymentTransactionId"),
                    createTextVNode(" assigned by a rail. If your internal core assigns an end-to-end reference, you MAY include it as "),
                    createVNode("code", null, "paymentTransactionId"),
                    createTextVNode("; otherwise omit the field. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the debtor account and creditor account are both held at your LFI, there is no interbank rail involved — the payment is executed by an internal debit-and-credit within your core banking system. Your LFI has full visibility of both legs, so the payment can reach the most specific Open Finance terminal status: "),
                  createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The events that trigger a PATCH are:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Intra-bank outcome"),
                        createVNode("th", null, "New Open Finance status"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Debtor debit and creditor credit both posted"),
                        createVNode("td", null, [
                          createVNode("code", null, "AcceptedCreditSettlementCompleted")
                        ]),
                        createVNode("td", null, "Terminal for intra-bank — your LFI knows the funds have definitely landed in the creditor account")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Internal rejection (screening, insufficient funds, account state, etc.)"),
                        createVNode("td", null, [
                          createVNode("code", null, "Rejected")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Set "),
                          createVNode("code", null, "RejectReasonCode.Code"),
                          createTextVNode(" to "),
                          createVNode("code", null, "LFI.<reasonCode>"),
                          createTextVNode(" — there is no rail namespace to fall back to")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Intra-bank payments have no "),
                  createVNode("code", null, "paymentTransactionId"),
                  createTextVNode(" assigned by a rail. If your internal core assigns an end-to-end reference, you MAY include it as "),
                  createVNode("code", null, "paymentTransactionId"),
                  createTextVNode("; otherwise omit the field. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "aani-status-mapping",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "AANI",
        title: "AANI status mapping",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "AANI status mapping" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AaniStatusMapping, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AaniStatusMapping)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` AANI is the UAE&#39;s instant payment rail. An AANI payment either clears to terminal success within seconds and returns a positive <strong data-v-b317223e${_scopeId2}>Account Verification Response</strong> (an ISO 20022 <code data-v-b317223e${_scopeId2}>pacs.002</code> message with an accepted status), or is rejected by the receiving bank with an AANI Reject Reason Code drawn from the AANI Core Service Interface Specification. `);
                } else {
                  return [
                    createTextVNode(" AANI is the UAE's instant payment rail. An AANI payment either clears to terminal success within seconds and returns a positive "),
                    createVNode("strong", null, "Account Verification Response"),
                    createTextVNode(" (an ISO 20022 "),
                    createVNode("code", null, "pacs.002"),
                    createTextVNode(" message with an accepted status), or is rejected by the receiving bank with an AANI Reject Reason Code drawn from the AANI Core Service Interface Specification. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` While the payment is in flight to AANI and awaiting a response, the status remains <code data-v-b317223e${_scopeId2}>Pending</code> — your LFI does not need to PATCH anything until the AANI response arrives. The events that trigger a PATCH are: `);
                } else {
                  return [
                    createTextVNode(" While the payment is in flight to AANI and awaiting a response, the status remains "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" — your LFI does not need to PATCH anything until the AANI response arrives. The events that trigger a PATCH are: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b317223e${_scopeId2}><thead data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><th data-v-b317223e${_scopeId2}>AANI response</th><th data-v-b317223e${_scopeId2}>New Open Finance status</th><th data-v-b317223e${_scopeId2}>Notes</th></tr></thead><tbody data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}>Positive Account Verification Response (<code data-v-b317223e${_scopeId2}>pacs.002</code> accepted)</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AcceptedWithoutPosting</code></td><td data-v-b317223e${_scopeId2}>Terminal for AANI</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>pacs.002</code> rejection</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>Rejected</code></td><td data-v-b317223e${_scopeId2}>Set <code data-v-b317223e${_scopeId2}>RejectReasonCode.Code</code> to <code data-v-b317223e${_scopeId2}>AANI.&lt;reasonCode&gt;</code> (for example <code data-v-b317223e${_scopeId2}>AANI.AM04</code>)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "AANI response"),
                          createVNode("th", null, "New Open Finance status"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createTextVNode("Positive Account Verification Response ("),
                            createVNode("code", null, "pacs.002"),
                            createTextVNode(" accepted)")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "AcceptedWithoutPosting")
                          ]),
                          createVNode("td", null, "Terminal for AANI")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "pacs.002"),
                            createTextVNode(" rejection")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "Rejected")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Set "),
                            createVNode("code", null, "RejectReasonCode.Code"),
                            createTextVNode(" to "),
                            createVNode("code", null, "AANI.<reasonCode>"),
                            createTextVNode(" (for example "),
                            createVNode("code", null, "AANI.AM04"),
                            createTextVNode(")")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AcceptedWithoutPosting</code> is the terminal status for successful AANI payments. Your LFI MUST NOT infer <code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code> from an AANI Account Verification Response — AANI does not confirm credit posting at the receiving bank to the originating LFI. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("code", null, "AcceptedWithoutPosting"),
                      createTextVNode(" is the terminal status for successful AANI payments. Your LFI MUST NOT infer "),
                      createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                      createTextVNode(" from an AANI Account Verification Response — AANI does not confirm credit posting at the receiving bank to the originating LFI. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once AANI assigns an end-to-end transaction identifier, include it as <code data-v-b317223e${_scopeId2}>paymentTransactionId</code> on the next <span class="endpoint" data-v-b317223e${_scopeId2}><span class="http-method http-method--patch" data-v-b317223e${_scopeId2}>PATCH</span><code data-v-b317223e${_scopeId2}>/payment-log/{paymentId}</code></span>. Once set, <code data-v-b317223e${_scopeId2}>paymentTransactionId</code> MUST NOT change. `);
                } else {
                  return [
                    createTextVNode(" Once AANI assigns an end-to-end transaction identifier, include it as "),
                    createVNode("code", null, "paymentTransactionId"),
                    createTextVNode(" on the next "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                      createVNode("code", null, "/payment-log/{paymentId}")
                    ]),
                    createTextVNode(". Once set, "),
                    createVNode("code", null, "paymentTransactionId"),
                    createTextVNode(" MUST NOT change. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b317223e${_scopeId}>Illustrative AANI Reject Reason Codes</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The full list of 40 codes is maintained in the AANI Core Service Interface Specification. The codes you will see most often are: `);
                } else {
                  return [
                    createTextVNode(" The full list of 40 codes is maintained in the AANI Core Service Interface Specification. The codes you will see most often are: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b317223e${_scopeId2}><thead data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><th data-v-b317223e${_scopeId2}>AANI code</th><th data-v-b317223e${_scopeId2}>Meaning</th></tr></thead><tbody data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AC06</code></td><td data-v-b317223e${_scopeId2}>Blocked Account</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AC07</code></td><td data-v-b317223e${_scopeId2}>Closed Creditor Account Number</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AM04</code></td><td data-v-b317223e${_scopeId2}>Insufficient Funds</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AM14</code></td><td data-v-b317223e${_scopeId2}>Amount Exceeds Agreed Limit</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>UCRD</code></td><td data-v-b317223e${_scopeId2}>Unknown Creditor</td></tr></tbody></table>`);
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
                  _push3(` Your LFI MUST relay the code in the <code data-v-b317223e${_scopeId2}>AANI.</code> namespace — <code data-v-b317223e${_scopeId2}>AANI.AM04</code> — without transposing it to a different namespace. Where Open Finance defines a Prescriptive Error Code for the underlying condition (e.g. <code data-v-b317223e${_scopeId2}>Consent.TransientAccountAccessFailure</code>), prefer the prescriptive code. `);
                } else {
                  return [
                    createTextVNode(" Your LFI MUST relay the code in the "),
                    createVNode("code", null, "AANI."),
                    createTextVNode(" namespace — "),
                    createVNode("code", null, "AANI.AM04"),
                    createTextVNode(" — without transposing it to a different namespace. Where Open Finance defines a Prescriptive Error Code for the underlying condition (e.g. "),
                    createVNode("code", null, "Consent.TransientAccountAccessFailure"),
                    createTextVNode("), prefer the prescriptive code. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "AANI status mapping" }, {
                default: withCtx(() => [
                  createVNode(_component_AaniStatusMapping)
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" AANI is the UAE's instant payment rail. An AANI payment either clears to terminal success within seconds and returns a positive "),
                  createVNode("strong", null, "Account Verification Response"),
                  createTextVNode(" (an ISO 20022 "),
                  createVNode("code", null, "pacs.002"),
                  createTextVNode(" message with an accepted status), or is rejected by the receiving bank with an AANI Reject Reason Code drawn from the AANI Core Service Interface Specification. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" While the payment is in flight to AANI and awaiting a response, the status remains "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" — your LFI does not need to PATCH anything until the AANI response arrives. The events that trigger a PATCH are: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "AANI response"),
                        createVNode("th", null, "New Open Finance status"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createTextVNode("Positive Account Verification Response ("),
                          createVNode("code", null, "pacs.002"),
                          createTextVNode(" accepted)")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "AcceptedWithoutPosting")
                        ]),
                        createVNode("td", null, "Terminal for AANI")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "pacs.002"),
                          createTextVNode(" rejection")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "Rejected")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Set "),
                          createVNode("code", null, "RejectReasonCode.Code"),
                          createTextVNode(" to "),
                          createVNode("code", null, "AANI.<reasonCode>"),
                          createTextVNode(" (for example "),
                          createVNode("code", null, "AANI.AM04"),
                          createTextVNode(")")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("code", null, "AcceptedWithoutPosting"),
                    createTextVNode(" is the terminal status for successful AANI payments. Your LFI MUST NOT infer "),
                    createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                    createTextVNode(" from an AANI Account Verification Response — AANI does not confirm credit posting at the receiving bank to the originating LFI. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once AANI assigns an end-to-end transaction identifier, include it as "),
                  createVNode("code", null, "paymentTransactionId"),
                  createTextVNode(" on the next "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                    createVNode("code", null, "/payment-log/{paymentId}")
                  ]),
                  createTextVNode(". Once set, "),
                  createVNode("code", null, "paymentTransactionId"),
                  createTextVNode(" MUST NOT change. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Illustrative AANI Reject Reason Codes"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The full list of 40 codes is maintained in the AANI Core Service Interface Specification. The codes you will see most often are: ")
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
                  createTextVNode(" Your LFI MUST relay the code in the "),
                  createVNode("code", null, "AANI."),
                  createTextVNode(" namespace — "),
                  createVNode("code", null, "AANI.AM04"),
                  createTextVNode(" — without transposing it to a different namespace. Where Open Finance defines a Prescriptive Error Code for the underlying condition (e.g. "),
                  createVNode("code", null, "Consent.TransientAccountAccessFailure"),
                  createTextVNode("), prefer the prescriptive code. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "uaefts-status-mapping",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "UAEFTS",
        title: "UAEFTS status mapping",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "UAEFTS status mapping" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FtsStatusMapping, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FtsStatusMapping)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` UAEFTS is the UAE Funds Transfer System, the Central Bank of the UAE&#39;s domestic interbank funds transfer rail. UAEFTS carries payment messages using the ISO 20022 <code data-v-b317223e${_scopeId2}>pacs.008</code> schema and returns the following acknowledgements: `);
                } else {
                  return [
                    createTextVNode(" UAEFTS is the UAE Funds Transfer System, the Central Bank of the UAE's domestic interbank funds transfer rail. UAEFTS carries payment messages using the ISO 20022 "),
                    createVNode("code", null, "pacs.008"),
                    createTextVNode(" schema and returns the following acknowledgements: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b317223e${_scopeId2}><strong data-v-b317223e${_scopeId2}>ACK</strong> — UAEFTS has accepted the message after technical validation</li><li data-v-b317223e${_scopeId2}><strong data-v-b317223e${_scopeId2}>NAK</strong> — UAEFTS has rejected the message with an FTS reason code</li><li data-v-b317223e${_scopeId2}><strong data-v-b317223e${_scopeId2}>CB900</strong> — Debit Confirmation: settlement through the Central Bank has completed, the debtor account has been debited, and the corresponding credit to the receiving bank has been settled</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "ACK"),
                      createTextVNode(" — UAEFTS has accepted the message after technical validation")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "NAK"),
                      createTextVNode(" — UAEFTS has rejected the message with an FTS reason code")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "CB900"),
                      createTextVNode(" — Debit Confirmation: settlement through the Central Bank has completed, the debtor account has been debited, and the corresponding credit to the receiving bank has been settled")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Because UAEFTS settles through the Central Bank as a centralised interbank clearing, a CB900 implicitly confirms that the creditor side of the payment has been settled as well. The terminal successful status for a UAEFTS payment is therefore <code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code>. `);
                } else {
                  return [
                    createTextVNode(" Because UAEFTS settles through the Central Bank as a centralised interbank clearing, a CB900 implicitly confirms that the creditor side of the payment has been settled as well. The terminal successful status for a UAEFTS payment is therefore "),
                    createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ACK on its own is technical acceptance within the <code data-v-b317223e${_scopeId2}>Pending</code> state — it does <strong data-v-b317223e${_scopeId2}>not</strong> trigger a PATCH, and the payment remains <code data-v-b317223e${_scopeId2}>Pending</code> until CB900 or NAK arrives. The events that trigger a PATCH are: `);
                } else {
                  return [
                    createTextVNode(" ACK on its own is technical acceptance within the "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" state — it does "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" trigger a PATCH, and the payment remains "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" until CB900 or NAK arrives. The events that trigger a PATCH are: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b317223e${_scopeId2}><thead data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><th data-v-b317223e${_scopeId2}>UAEFTS response</th><th data-v-b317223e${_scopeId2}>New Open Finance status</th><th data-v-b317223e${_scopeId2}>Notes</th></tr></thead><tbody data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}>CB900 Debit Confirmation</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code></td><td data-v-b317223e${_scopeId2}>Terminal for UAEFTS</td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}>NAK received</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>Rejected</code></td><td data-v-b317223e${_scopeId2}>Set <code data-v-b317223e${_scopeId2}>RejectReasonCode.Code</code> to <code data-v-b317223e${_scopeId2}>FTS.&lt;reasonCode&gt;</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "UAEFTS response"),
                          createVNode("th", null, "New Open Finance status"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "CB900 Debit Confirmation"),
                          createVNode("td", null, [
                            createVNode("code", null, "AcceptedCreditSettlementCompleted")
                          ]),
                          createVNode("td", null, "Terminal for UAEFTS")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "NAK received"),
                          createVNode("td", null, [
                            createVNode("code", null, "Rejected")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Set "),
                            createVNode("code", null, "RejectReasonCode.Code"),
                            createTextVNode(" to "),
                            createVNode("code", null, "FTS.<reasonCode>")
                          ])
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
              createVNode(_component_APIFlowViewer, { title: "UAEFTS status mapping" }, {
                default: withCtx(() => [
                  createVNode(_component_FtsStatusMapping)
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" UAEFTS is the UAE Funds Transfer System, the Central Bank of the UAE's domestic interbank funds transfer rail. UAEFTS carries payment messages using the ISO 20022 "),
                  createVNode("code", null, "pacs.008"),
                  createTextVNode(" schema and returns the following acknowledgements: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "ACK"),
                    createTextVNode(" — UAEFTS has accepted the message after technical validation")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "NAK"),
                    createTextVNode(" — UAEFTS has rejected the message with an FTS reason code")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "CB900"),
                    createTextVNode(" — Debit Confirmation: settlement through the Central Bank has completed, the debtor account has been debited, and the corresponding credit to the receiving bank has been settled")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Because UAEFTS settles through the Central Bank as a centralised interbank clearing, a CB900 implicitly confirms that the creditor side of the payment has been settled as well. The terminal successful status for a UAEFTS payment is therefore "),
                  createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" ACK on its own is technical acceptance within the "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" state — it does "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" trigger a PATCH, and the payment remains "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" until CB900 or NAK arrives. The events that trigger a PATCH are: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "UAEFTS response"),
                        createVNode("th", null, "New Open Finance status"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "CB900 Debit Confirmation"),
                        createVNode("td", null, [
                          createVNode("code", null, "AcceptedCreditSettlementCompleted")
                        ]),
                        createVNode("td", null, "Terminal for UAEFTS")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "NAK received"),
                        createVNode("td", null, [
                          createVNode("code", null, "Rejected")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Set "),
                          createVNode("code", null, "RejectReasonCode.Code"),
                          createTextVNode(" to "),
                          createVNode("code", null, "FTS.<reasonCode>")
                        ])
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
        id: "rejection-code-prefixes",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Reject Codes",
        title: "Rejection code prefixes",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every <code data-v-b317223e${_scopeId2}>Rejected</code> status carries a <code data-v-b317223e${_scopeId2}>RejectReasonCode[]</code> array. The first segment of each <code data-v-b317223e${_scopeId2}>Code</code> is a namespace that identifies <strong data-v-b317223e${_scopeId2}>where</strong> the rejection originated: `);
                } else {
                  return [
                    createTextVNode(" Every "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(" status carries a "),
                    createVNode("code", null, "RejectReasonCode[]"),
                    createTextVNode(" array. The first segment of each "),
                    createVNode("code", null, "Code"),
                    createTextVNode(" is a namespace that identifies "),
                    createVNode("strong", null, "where"),
                    createTextVNode(" the rejection originated: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b317223e${_scopeId2}><thead data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><th data-v-b317223e${_scopeId2}>Rejected by</th><th data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>RejectReasonCode.Code</code> prefix</th><th data-v-b317223e${_scopeId2}>Example</th></tr></thead><tbody data-v-b317223e${_scopeId2}><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}>LFI — pre-rail screening (fraud, sanctions, account state, insufficient funds) or an intra-bank payment that never reaches a rail</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>LFI.</code></td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>LFI.InsufficientFunds</code></td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}>AANI</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AANI.</code></td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>AANI.AC06</code></td></tr><tr data-v-b317223e${_scopeId2}><td data-v-b317223e${_scopeId2}>UAEFTS</td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>FTS.</code></td><td data-v-b317223e${_scopeId2}><code data-v-b317223e${_scopeId2}>FTS.AC06</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Rejected by"),
                          createVNode("th", null, [
                            createVNode("code", null, "RejectReasonCode.Code"),
                            createTextVNode(" prefix")
                          ]),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "LFI — pre-rail screening (fraud, sanctions, account state, insufficient funds) or an intra-bank payment that never reaches a rail"),
                          createVNode("td", null, [
                            createVNode("code", null, "LFI.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "LFI.InsufficientFunds")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "AANI"),
                          createVNode("td", null, [
                            createVNode("code", null, "AANI.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "AANI.AC06")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "UAEFTS"),
                          createVNode("td", null, [
                            createVNode("code", null, "FTS.")
                          ]),
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
            _push2(ssrRenderComponent(_component_EdNote, { type: "danger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b317223e${_scopeId2}> Your LFI MUST NOT transpose a rail-originated reason code into the <code data-v-b317223e${_scopeId2}>LFI.</code> namespace, and MUST NOT transpose an LFI-originated rejection into an <code data-v-b317223e${_scopeId2}>AANI.</code> or <code data-v-b317223e${_scopeId2}>FTS.</code> namespace. The prefix is critical for TPP diagnostics and downstream reconciliation. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Your LFI MUST NOT transpose a rail-originated reason code into the "),
                      createVNode("code", null, "LFI."),
                      createTextVNode(" namespace, and MUST NOT transpose an LFI-originated rejection into an "),
                      createVNode("code", null, "AANI."),
                      createTextVNode(" or "),
                      createVNode("code", null, "FTS."),
                      createTextVNode(" namespace. The prefix is critical for TPP diagnostics and downstream reconciliation. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-b317223e${_scopeId2}>LFI.</code> namespace is correct in two cases: when your LFI has rejected an interbank payment <strong data-v-b317223e${_scopeId2}>before</strong> it reaches AANI or UAEFTS, and when an intra-bank payment is rejected internally (since no rail is ever involved). Once a payment has been submitted to AANI or UAEFTS, any subsequent rejection MUST carry the <code data-v-b317223e${_scopeId2}>AANI.</code> or <code data-v-b317223e${_scopeId2}>FTS.</code> prefix respectively, even if your LFI observed the failure first. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "LFI."),
                    createTextVNode(" namespace is correct in two cases: when your LFI has rejected an interbank payment "),
                    createVNode("strong", null, "before"),
                    createTextVNode(" it reaches AANI or UAEFTS, and when an intra-bank payment is rejected internally (since no rail is ever involved). Once a payment has been submitted to AANI or UAEFTS, any subsequent rejection MUST carry the "),
                    createVNode("code", null, "AANI."),
                    createTextVNode(" or "),
                    createVNode("code", null, "FTS."),
                    createTextVNode(" prefix respectively, even if your LFI observed the failure first. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Where a Prescriptive Error Code is defined (e.g. <code data-v-b317223e${_scopeId2}>Consent.TransientAccountAccessFailure</code>), prefer the prescriptive code over a raw rail code. The OpenAPI <code data-v-b317223e${_scopeId2}>RejectReasonCode.Code</code> pattern <code data-v-b317223e${_scopeId2}>^[A-Za-z]+\\.[A-Za-z0-9]+$</code> allows either. `);
                } else {
                  return [
                    createTextVNode(" Where a Prescriptive Error Code is defined (e.g. "),
                    createVNode("code", null, "Consent.TransientAccountAccessFailure"),
                    createTextVNode("), prefer the prescriptive code over a raw rail code. The OpenAPI "),
                    createVNode("code", null, "RejectReasonCode.Code"),
                    createTextVNode(" pattern "),
                    createVNode("code", null, "^[A-Za-z]+\\.[A-Za-z0-9]+$"),
                    createTextVNode(" allows either. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(" status carries a "),
                  createVNode("code", null, "RejectReasonCode[]"),
                  createTextVNode(" array. The first segment of each "),
                  createVNode("code", null, "Code"),
                  createTextVNode(" is a namespace that identifies "),
                  createVNode("strong", null, "where"),
                  createTextVNode(" the rejection originated: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Rejected by"),
                        createVNode("th", null, [
                          createVNode("code", null, "RejectReasonCode.Code"),
                          createTextVNode(" prefix")
                        ]),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "LFI — pre-rail screening (fraud, sanctions, account state, insufficient funds) or an intra-bank payment that never reaches a rail"),
                        createVNode("td", null, [
                          createVNode("code", null, "LFI.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "LFI.InsufficientFunds")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "AANI"),
                        createVNode("td", null, [
                          createVNode("code", null, "AANI.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "AANI.AC06")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "UAEFTS"),
                        createVNode("td", null, [
                          createVNode("code", null, "FTS.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "FTS.AC06")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "danger" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Your LFI MUST NOT transpose a rail-originated reason code into the "),
                    createVNode("code", null, "LFI."),
                    createTextVNode(" namespace, and MUST NOT transpose an LFI-originated rejection into an "),
                    createVNode("code", null, "AANI."),
                    createTextVNode(" or "),
                    createVNode("code", null, "FTS."),
                    createTextVNode(" namespace. The prefix is critical for TPP diagnostics and downstream reconciliation. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "LFI."),
                  createTextVNode(" namespace is correct in two cases: when your LFI has rejected an interbank payment "),
                  createVNode("strong", null, "before"),
                  createTextVNode(" it reaches AANI or UAEFTS, and when an intra-bank payment is rejected internally (since no rail is ever involved). Once a payment has been submitted to AANI or UAEFTS, any subsequent rejection MUST carry the "),
                  createVNode("code", null, "AANI."),
                  createTextVNode(" or "),
                  createVNode("code", null, "FTS."),
                  createTextVNode(" prefix respectively, even if your LFI observed the failure first. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Where a Prescriptive Error Code is defined (e.g. "),
                  createVNode("code", null, "Consent.TransientAccountAccessFailure"),
                  createTextVNode("), prefer the prescriptive code over a raw rail code. The OpenAPI "),
                  createVNode("code", null, "RejectReasonCode.Code"),
                  createTextVNode(" pattern "),
                  createVNode("code", null, "^[A-Za-z]+\\.[A-Za-z0-9]+$"),
                  createTextVNode(" allows either. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "propagating-status-to-the-hub",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "Propagation",
        title: "Propagating status to the Hub",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The initial <code data-v-b317223e${_scopeId2}>Pending</code> status is set by the 201 response your Ozone Connect <span class="endpoint" data-v-b317223e${_scopeId2}><span class="http-method http-method--post" data-v-b317223e${_scopeId2}>POST</span><code data-v-b317223e${_scopeId2}>/payments</code></span> endpoint returns — no PATCH is required at that point. `);
                } else {
                  return [
                    createTextVNode(" The initial "),
                    createVNode("code", null, "Pending"),
                    createTextVNode(" status is set by the 201 response your Ozone Connect "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" endpoint returns — no PATCH is required at that point. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b317223e${_scopeId}>What your LFI MUST PATCH</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Your LFI MUST PATCH the <strong data-v-b317223e${_scopeId2}>terminal</strong> Open Finance status for the payment — <code data-v-b317223e${_scopeId2}>AcceptedWithoutPosting</code>, <code data-v-b317223e${_scopeId2}>AcceptedCreditSettlementCompleted</code>, or <code data-v-b317223e${_scopeId2}>Rejected</code> as appropriate for the execution mode. This is the only mandatory PATCH in the lifecycle. `);
                } else {
                  return [
                    createTextVNode(" Your LFI MUST PATCH the "),
                    createVNode("strong", null, "terminal"),
                    createTextVNode(" Open Finance status for the payment — "),
                    createVNode("code", null, "AcceptedWithoutPosting"),
                    createTextVNode(", "),
                    createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                    createTextVNode(", or "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(" as appropriate for the execution mode. This is the only mandatory PATCH in the lifecycle. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b317223e${_scopeId}>What your LFI MAY PATCH</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If your LFI observes an intermediate execution event that cleanly maps to an Open Finance status other than the terminal one — for example, debtor-account settlement (<code data-v-b317223e${_scopeId2}>AcceptedSettlementCompleted</code>) on a rail or internal path that exposes it — your LFI MAY PATCH that intermediate status. It is not a requirement, and the Hub will relay whichever statuses it receives to the TPP. `);
                } else {
                  return [
                    createTextVNode(" If your LFI observes an intermediate execution event that cleanly maps to an Open Finance status other than the terminal one — for example, debtor-account settlement ("),
                    createVNode("code", null, "AcceptedSettlementCompleted"),
                    createTextVNode(") on a rail or internal path that exposes it — your LFI MAY PATCH that intermediate status. It is not a requirement, and the Hub will relay whichever statuses it receives to the TPP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tables in the AANI, UAEFTS, and intra-bank sections above list the events you SHOULD PATCH. Additional intermediate PATCHes are permitted provided every status you PATCH is a valid Open Finance status value and the ordering respects the lifecycle (you cannot PATCH back from a terminal status). `);
                } else {
                  return [
                    createTextVNode(" Tables in the AANI, UAEFTS, and intra-bank sections above list the events you SHOULD PATCH. Additional intermediate PATCHes are permitted provided every status you PATCH is a valid Open Finance status value and the ordering respects the lifecycle (you cannot PATCH back from a terminal status). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b317223e${_scopeId}>How to PATCH</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`On each PATCH-triggering event, your LFI MUST immediately:`);
                } else {
                  return [
                    createTextVNode("On each PATCH-triggering event, your LFI MUST immediately:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b317223e${_scopeId2}>Map the outcome to the new Open Finance status.</li><li data-v-b317223e${_scopeId2}> Call <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" class="endpoint" data-v-b317223e${_scopeId2}><span class="http-method http-method--patch" data-v-b317223e${_scopeId2}>PATCH</span><code data-v-b317223e${_scopeId2}>/payment-log/{paymentId}</code></a> on the API Hub Consent Manager with the new <code data-v-b317223e${_scopeId2}>status</code>, a current <code data-v-b317223e${_scopeId2}>statusUpdateDateTime</code>, <code data-v-b317223e${_scopeId2}>paymentTransactionId</code> (once assigned by the rail, if applicable), and any <code data-v-b317223e${_scopeId2}>rejectReasonCode</code>. </li><li data-v-b317223e${_scopeId2}> Update the response your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments" class="endpoint" data-v-b317223e${_scopeId2}><span class="http-method http-method--get" data-v-b317223e${_scopeId2}>GET</span><code data-v-b317223e${_scopeId2}>/payments/{paymentId}</code></a> endpoint returns so that push and pull views of the payment are consistent. </li>`);
                } else {
                  return [
                    createVNode("li", null, "Map the outcome to the new Open Finance status."),
                    createVNode("li", null, [
                      createTextVNode(" Call "),
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                        createVNode("code", null, "/payment-log/{paymentId}")
                      ]),
                      createTextVNode(" on the API Hub Consent Manager with the new "),
                      createVNode("code", null, "status"),
                      createTextVNode(", a current "),
                      createVNode("code", null, "statusUpdateDateTime"),
                      createTextVNode(", "),
                      createVNode("code", null, "paymentTransactionId"),
                      createTextVNode(" (once assigned by the rail, if applicable), and any "),
                      createVNode("code", null, "rejectReasonCode"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Update the response your Ozone Connect "),
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/payments/{paymentId}")
                      ]),
                      createTextVNode(" endpoint returns so that push and pull views of the payment are consistent. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Your LFI MUST NOT batch status updates or defer them waiting for TPP polling. The Hub relays the new status to the TPP via webhook events as soon as it receives the PATCH. `);
                } else {
                  return [
                    createTextVNode(" Your LFI MUST NOT batch status updates or defer them waiting for TPP polling. The Hub relays the new status to the TPP via webhook events as soon as it receives the PATCH. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b317223e${_scopeId}>Example PATCH body</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchBodyExample,
              lang: "json",
              filename: "PATCH /payment-log/{paymentId}"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-b317223e${_scopeId}>Example rejected PATCH body</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: patchRejectedExample,
              lang: "json",
              filename: "rejected PATCH body"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The initial "),
                  createVNode("code", null, "Pending"),
                  createTextVNode(" status is set by the 201 response your Ozone Connect "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" endpoint returns — no PATCH is required at that point. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "What your LFI MUST PATCH"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Your LFI MUST PATCH the "),
                  createVNode("strong", null, "terminal"),
                  createTextVNode(" Open Finance status for the payment — "),
                  createVNode("code", null, "AcceptedWithoutPosting"),
                  createTextVNode(", "),
                  createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                  createTextVNode(", or "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(" as appropriate for the execution mode. This is the only mandatory PATCH in the lifecycle. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "What your LFI MAY PATCH"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If your LFI observes an intermediate execution event that cleanly maps to an Open Finance status other than the terminal one — for example, debtor-account settlement ("),
                  createVNode("code", null, "AcceptedSettlementCompleted"),
                  createTextVNode(") on a rail or internal path that exposes it — your LFI MAY PATCH that intermediate status. It is not a requirement, and the Hub will relay whichever statuses it receives to the TPP. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Tables in the AANI, UAEFTS, and intra-bank sections above list the events you SHOULD PATCH. Additional intermediate PATCHes are permitted provided every status you PATCH is a valid Open Finance status value and the ordering respects the lifecycle (you cannot PATCH back from a terminal status). ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "How to PATCH"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("On each PATCH-triggering event, your LFI MUST immediately:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Map the outcome to the new Open Finance status."),
                  createVNode("li", null, [
                    createTextVNode(" Call "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                      createVNode("code", null, "/payment-log/{paymentId}")
                    ]),
                    createTextVNode(" on the API Hub Consent Manager with the new "),
                    createVNode("code", null, "status"),
                    createTextVNode(", a current "),
                    createVNode("code", null, "statusUpdateDateTime"),
                    createTextVNode(", "),
                    createVNode("code", null, "paymentTransactionId"),
                    createTextVNode(" (once assigned by the rail, if applicable), and any "),
                    createVNode("code", null, "rejectReasonCode"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" Update the response your Ozone Connect "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/payments/{paymentId}")
                    ]),
                    createTextVNode(" endpoint returns so that push and pull views of the payment are consistent. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Your LFI MUST NOT batch status updates or defer them waiting for TPP polling. The Hub relays the new status to the TPP via webhook events as soon as it receives the PATCH. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example PATCH body"),
              createVNode(_component_EdCode, {
                code: patchBodyExample,
                lang: "json",
                filename: "PATCH /payment-log/{paymentId}"
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example rejected PATCH body"),
              createVNode(_component_EdCode, {
                code: patchRejectedExample,
                lang: "json",
                filename: "rejected PATCH body"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const paymentStatus = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b317223e"]]);
export {
  paymentStatus as default
};
