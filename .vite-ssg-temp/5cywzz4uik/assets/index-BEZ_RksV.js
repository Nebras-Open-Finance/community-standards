import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { s as singleInstantPaymentArea } from "./single-instant-payment-DviEf-zD.js";
import { C as CURRENT_VERSION, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const railLabels = singleInstantPaymentArea.rails.map((r) => r.label).join(", ");
    const sampleBaseUrl = singleInstantPaymentArea.tppBaseUrlTemplate.replace("{LFICODE}", "LFICODE").replace("{VERSION}", CURRENT_VERSION);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-a686ea89><section class="ed-doc__hero" data-v-a686ea89><div class="ed-doc__inner" data-v-a686ea89><div class="ed-doc__eyebrow" data-v-a686ea89><span class="ed-doc__eyebrow-dash" data-v-a686ea89></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-a686ea89> Functional Certification — Single Instant Payment <span class="ed-doc__read" data-v-a686ea89>4 min read</span></h1><p class="ed-doc__lede" data-v-a686ea89> Functional Certification proves that your Ozone Connect Single Instant Payment implementation executes a payment correctly end to end: it selects the right rail, reaches the correct terminal status for that rail, propagates status to the Consent Manager Payment Log, decrypts and validates the Creditor, consumes the Risk object, and honours the account, balance, and refund reads a payment consent can carry. This page explains what the evidence is and how to produce it; the portal then builds your submission for you. </p><div class="ed-doc__cta" data-v-a686ea89><a class="ed-doc__cta-btn" href="/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/submission" data-v-a686ea89> Start your submission <span class="ed-doc__cta-arrow" data-v-a686ea89>↗</span></a></div></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What it is",
        title: "Evidence that a single instant payment executes correctly",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Single Instant Payment is the first of the seven UAE Open Finance payment types, and each type is certified separately. Your Ozone Connect <code data-v-a686ea89${_scopeId2}>POST /payments</code> returns <code data-v-a686ea89${_scopeId2}>201</code> with status <code data-v-a686ea89${_scopeId2}>Pending</code>; your LFI then executes the payment on a rail and PATCHes the terminal status to the <a${ssrRenderAttr("href", unref(singleInstantPaymentArea).paymentStatusDocHref)} data-v-a686ea89${_scopeId2}>Consent Manager Payment Log</a>. Because your LFI is the only party that sees the raw rail outcome, Functional Certification proves that each supported rail reaches the correct terminal status, that timing and rejection are handled, and that the encryption-model steps — decrypting the Creditor and consuming the Risk object — are performed. All evidence must come from your own <strong data-v-a686ea89${_scopeId2}>pre-production environment</strong>. `);
                } else {
                  return [
                    createTextVNode(" Single Instant Payment is the first of the seven UAE Open Finance payment types, and each type is certified separately. Your Ozone Connect "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" returns "),
                    createVNode("code", null, "201"),
                    createTextVNode(" with status "),
                    createVNode("code", null, "Pending"),
                    createTextVNode("; your LFI then executes the payment on a rail and PATCHes the terminal status to the "),
                    createVNode("a", {
                      href: unref(singleInstantPaymentArea).paymentStatusDocHref
                    }, "Consent Manager Payment Log", 8, ["href"]),
                    createTextVNode(". Because your LFI is the only party that sees the raw rail outcome, Functional Certification proves that each supported rail reaches the correct terminal status, that timing and rejection are handled, and that the encryption-model steps — decrypting the Creditor and consuming the Risk object — are performed. All evidence must come from your own "),
                    createVNode("strong", null, "pre-production environment"),
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
                  createTextVNode(" Single Instant Payment is the first of the seven UAE Open Finance payment types, and each type is certified separately. Your Ozone Connect "),
                  createVNode("code", null, "POST /payments"),
                  createTextVNode(" returns "),
                  createVNode("code", null, "201"),
                  createTextVNode(" with status "),
                  createVNode("code", null, "Pending"),
                  createTextVNode("; your LFI then executes the payment on a rail and PATCHes the terminal status to the "),
                  createVNode("a", {
                    href: unref(singleInstantPaymentArea).paymentStatusDocHref
                  }, "Consent Manager Payment Log", 8, ["href"]),
                  createTextVNode(". Because your LFI is the only party that sees the raw rail outcome, Functional Certification proves that each supported rail reaches the correct terminal status, that timing and rejection are handled, and that the encryption-model steps — decrypting the Creditor and consuming the Risk object — are performed. All evidence must come from your own "),
                  createVNode("strong", null, "pre-production environment"),
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
        id: "gather",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "What you need",
        title: "Gather this before you start",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You choose the version and segments (Retail / SME / Corporate), declare the rails you support (${ssrInterpolate(unref(railLabels))}), and state your payment limit. Then have the following ready: `);
                } else {
                  return [
                    createTextVNode(" You choose the version and segments (Retail / SME / Corporate), declare the rails you support (" + toDisplayString(unref(railLabels)) + "), and state your payment limit. Then have the following ready: ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-a686ea89${_scopeId2}><strong data-v-a686ea89${_scopeId2}>Testing Tool output</strong> — one HTML report the Testing Tool produces for your Ozone Connect <code data-v-a686ea89${_scopeId2}>POST /payments</code> endpoint, plus a Postman screenshot of a successful <code data-v-a686ea89${_scopeId2}>POST /payments</code> returning <code data-v-a686ea89${_scopeId2}>201 Pending</code>. </li><li data-v-a686ea89${_scopeId2}><strong data-v-a686ea89${_scopeId2}>Terminal status per rail</strong> — for each rail you declare, a Postman screenshot evidencing the terminal status it reaches (AANI → <code data-v-a686ea89${_scopeId2}>AcceptedWithoutPosting</code>; Intra-bank and UAEFTS → <code data-v-a686ea89${_scopeId2}>AcceptedCreditSettlementCompleted</code>). </li><li data-v-a686ea89${_scopeId2}><strong data-v-a686ea89${_scopeId2}>AANI timing, reference &amp; a rejection</strong> — the <code data-v-a686ea89${_scopeId2}>POST /payments</code>, rail-submission, and terminal-PATCH timestamps (with screenshots); the <code data-v-a686ea89${_scopeId2}>CreditorReference</code> received on <code data-v-a686ea89${_scopeId2}>POST /payments</code> and a screenshot showing it carried into the AANI (pacs.008) submission to the receiving bank; and one example of an AANI rejection mapped to <code data-v-a686ea89${_scopeId2}>Rejected</code> with an <code data-v-a686ea89${_scopeId2}>AANI.&lt;code&gt;</code> reason. </li><li data-v-a686ea89${_scopeId2}><strong data-v-a686ea89${_scopeId2}>Creditor &amp; Risk</strong> — screenshots evidencing decryption of the payment PII, validation of the Creditor account, and that the Risk object is used in your screening. </li><li data-v-a686ea89${_scopeId2}><strong data-v-a686ea89${_scopeId2}>Account, balance &amp; refund reads</strong> — Postman screenshots of <code data-v-a686ea89${_scopeId2}>GET /accounts</code> and <code data-v-a686ea89${_scopeId2}>GET /accounts/{AccountId}/balances</code> before a payment, and <code data-v-a686ea89${_scopeId2}>GET /payment-consents/{ConsentId}/refund</code> after one, on the same payment consent (<code data-v-a686ea89${_scopeId2}>${ssrInterpolate(unref(sampleBaseUrl))}</code>), each with a screenshot of the authorisation page the customer authorised that consent on. </li><li data-v-a686ea89${_scopeId2}><strong data-v-a686ea89${_scopeId2}>Authorisation-screen scenarios</strong> — screenshots of your authorisation page, each with its pre-production ConsentId: the debtor account when the TPP specified it in the consent, and each Confirmation of Payee <code data-v-a686ea89${_scopeId2}>NameMatchIndicator</code> — <code data-v-a686ea89${_scopeId2}>ConfirmationOfPayee.Yes</code>, <code data-v-a686ea89${_scopeId2}>ConfirmationOfPayee.Partial</code>, and <code data-v-a686ea89${_scopeId2}>ConfirmationOfPayee.No</code> — surfaced to the customer. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Testing Tool output"),
                      createTextVNode(" — one HTML report the Testing Tool produces for your Ozone Connect "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" endpoint, plus a Postman screenshot of a successful "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" returning "),
                      createVNode("code", null, "201 Pending"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Terminal status per rail"),
                      createTextVNode(" — for each rail you declare, a Postman screenshot evidencing the terminal status it reaches (AANI → "),
                      createVNode("code", null, "AcceptedWithoutPosting"),
                      createTextVNode("; Intra-bank and UAEFTS → "),
                      createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                      createTextVNode("). ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "AANI timing, reference & a rejection"),
                      createTextVNode(" — the "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(", rail-submission, and terminal-PATCH timestamps (with screenshots); the "),
                      createVNode("code", null, "CreditorReference"),
                      createTextVNode(" received on "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" and a screenshot showing it carried into the AANI (pacs.008) submission to the receiving bank; and one example of an AANI rejection mapped to "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(" with an "),
                      createVNode("code", null, "AANI.<code>"),
                      createTextVNode(" reason. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Creditor & Risk"),
                      createTextVNode(" — screenshots evidencing decryption of the payment PII, validation of the Creditor account, and that the Risk object is used in your screening. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Account, balance & refund reads"),
                      createTextVNode(" — Postman screenshots of "),
                      createVNode("code", null, "GET /accounts"),
                      createTextVNode(" and "),
                      createVNode("code", null, "GET /accounts/{AccountId}/balances"),
                      createTextVNode(" before a payment, and "),
                      createVNode("code", null, "GET /payment-consents/{ConsentId}/refund"),
                      createTextVNode(" after one, on the same payment consent ("),
                      createVNode("code", null, toDisplayString(unref(sampleBaseUrl)), 1),
                      createTextVNode("), each with a screenshot of the authorisation page the customer authorised that consent on. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Authorisation-screen scenarios"),
                      createTextVNode(" — screenshots of your authorisation page, each with its pre-production ConsentId: the debtor account when the TPP specified it in the consent, and each Confirmation of Payee "),
                      createVNode("code", null, "NameMatchIndicator"),
                      createTextVNode(" — "),
                      createVNode("code", null, "ConfirmationOfPayee.Yes"),
                      createTextVNode(", "),
                      createVNode("code", null, "ConfirmationOfPayee.Partial"),
                      createTextVNode(", and "),
                      createVNode("code", null, "ConfirmationOfPayee.No"),
                      createTextVNode(" — surfaced to the customer. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "note",
              title: "Identity comes from SSO"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-a686ea89${_scopeId2}> Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" You choose the version and segments (Retail / SME / Corporate), declare the rails you support (" + toDisplayString(unref(railLabels)) + "), and state your payment limit. Then have the following ready: ", 1)
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Testing Tool output"),
                    createTextVNode(" — one HTML report the Testing Tool produces for your Ozone Connect "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" endpoint, plus a Postman screenshot of a successful "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" returning "),
                    createVNode("code", null, "201 Pending"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Terminal status per rail"),
                    createTextVNode(" — for each rail you declare, a Postman screenshot evidencing the terminal status it reaches (AANI → "),
                    createVNode("code", null, "AcceptedWithoutPosting"),
                    createTextVNode("; Intra-bank and UAEFTS → "),
                    createVNode("code", null, "AcceptedCreditSettlementCompleted"),
                    createTextVNode("). ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "AANI timing, reference & a rejection"),
                    createTextVNode(" — the "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(", rail-submission, and terminal-PATCH timestamps (with screenshots); the "),
                    createVNode("code", null, "CreditorReference"),
                    createTextVNode(" received on "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" and a screenshot showing it carried into the AANI (pacs.008) submission to the receiving bank; and one example of an AANI rejection mapped to "),
                    createVNode("code", null, "Rejected"),
                    createTextVNode(" with an "),
                    createVNode("code", null, "AANI.<code>"),
                    createTextVNode(" reason. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Creditor & Risk"),
                    createTextVNode(" — screenshots evidencing decryption of the payment PII, validation of the Creditor account, and that the Risk object is used in your screening. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Account, balance & refund reads"),
                    createTextVNode(" — Postman screenshots of "),
                    createVNode("code", null, "GET /accounts"),
                    createTextVNode(" and "),
                    createVNode("code", null, "GET /accounts/{AccountId}/balances"),
                    createTextVNode(" before a payment, and "),
                    createVNode("code", null, "GET /payment-consents/{ConsentId}/refund"),
                    createTextVNode(" after one, on the same payment consent ("),
                    createVNode("code", null, toDisplayString(unref(sampleBaseUrl)), 1),
                    createTextVNode("), each with a screenshot of the authorisation page the customer authorised that consent on. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Authorisation-screen scenarios"),
                    createTextVNode(" — screenshots of your authorisation page, each with its pre-production ConsentId: the debtor account when the TPP specified it in the consent, and each Confirmation of Payee "),
                    createVNode("code", null, "NameMatchIndicator"),
                    createTextVNode(" — "),
                    createVNode("code", null, "ConfirmationOfPayee.Yes"),
                    createTextVNode(", "),
                    createVNode("code", null, "ConfirmationOfPayee.Partial"),
                    createTextVNode(", and "),
                    createVNode("code", null, "ConfirmationOfPayee.No"),
                    createTextVNode(" — surfaced to the customer. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "note",
                title: "Identity comes from SSO"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "generate",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "What you get",
        title: "One ZIP to attach to your ticket",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document, your Testing Tool report, and every screenshot, organised per evidence group. Attach that ZIP to a <a href="/support-service-desk" data-v-a686ea89${_scopeId2}>Service Desk</a> certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document, your Testing Tool report, and every screenshot, organised per evidence group. Attach that ZIP to a "),
                    createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                    createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-a686ea89${_scopeId}><a class="ed-doc__cta-btn" href="/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/submission" data-v-a686ea89${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-a686ea89${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document, your Testing Tool report, and every screenshot, organised per evidence group. Attach that ZIP to a "),
                  createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                  createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__cta" }, [
                createVNode("a", {
                  class: "ed-doc__cta-btn",
                  href: "/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/submission"
                }, [
                  createTextVNode(" Start your submission "),
                  createVNode("span", { class: "ed-doc__cta-arrow" }, "↗")
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a686ea89"]]);
export {
  index as default
};
