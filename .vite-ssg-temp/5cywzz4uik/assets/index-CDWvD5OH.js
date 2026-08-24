import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { d as domesticPaymentsTppArea } from "./domestic-payments-tpp-CFrB98WF.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const typeCount = domesticPaymentsTppArea.types.length;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-53b900f4><section class="ed-doc__hero" data-v-53b900f4><div class="ed-doc__inner" data-v-53b900f4><div class="ed-doc__eyebrow" data-v-53b900f4><span class="ed-doc__eyebrow-dash" data-v-53b900f4></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-53b900f4> Functional Certification — Domestic Payments <span class="ed-doc__read" data-v-53b900f4>4 min read</span></h1><p class="ed-doc__lede" data-v-53b900f4> Functional Certification proves that your TPP initiates domestic payments through the API Hub correctly. You tick the payment types you offer, and for each one provide the two objects your TPP is responsible for constructing — the <strong data-v-53b900f4>Consent</strong> (<code data-v-53b900f4>authorization_details</code>) you send at PAR and the <strong data-v-53b900f4>Risk</strong> (<code data-v-53b900f4>AERisk</code>) object you send for fraud scoring. You then evidence each type by <strong data-v-53b900f4>making a payment against it on the sandbox Model Bank</strong> and attaching the Postman screenshot. This page explains the evidence; the portal then builds your submission for you. </p><div class="ed-doc__cta" data-v-53b900f4><a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/domestic-payments/submission" data-v-53b900f4> Start your submission <span class="ed-doc__cta-arrow" data-v-53b900f4>↗</span></a></div></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What it is",
        title: "Evidence that your payment initiation is correct",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Unlike the LFI side — which certifies one payment type per ticket — the TPP side is a single Domestic Payments submission covering every type you offer. All ${ssrInterpolate(unref(typeCount))} UAE Open Finance domestic payment types are available: Single Instant Payment, the six Multi-Payment variants, and Delegated SCA. You are the party that constructs the consent and the risk signals, so certification is about those two objects and a payment made against them — all evidenced from the <a${ssrRenderAttr("href", unref(domesticPaymentsTppArea).sandboxEvidenceHref)} data-v-53b900f4${_scopeId2}>AlTareq Model Bank</a> sandbox using the <a${ssrRenderAttr("href", unref(domesticPaymentsTppArea).postmanGuideHref)} data-v-53b900f4${_scopeId2}>Postman collection</a>. `);
                } else {
                  return [
                    createTextVNode(" Unlike the LFI side — which certifies one payment type per ticket — the TPP side is a single Domestic Payments submission covering every type you offer. All " + toDisplayString(unref(typeCount)) + " UAE Open Finance domestic payment types are available: Single Instant Payment, the six Multi-Payment variants, and Delegated SCA. You are the party that constructs the consent and the risk signals, so certification is about those two objects and a payment made against them — all evidenced from the ", 1),
                    createVNode("a", {
                      href: unref(domesticPaymentsTppArea).sandboxEvidenceHref
                    }, "AlTareq Model Bank", 8, ["href"]),
                    createTextVNode(" sandbox using the "),
                    createVNode("a", {
                      href: unref(domesticPaymentsTppArea).postmanGuideHref
                    }, "Postman collection", 8, ["href"]),
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
                  createTextVNode(" Unlike the LFI side — which certifies one payment type per ticket — the TPP side is a single Domestic Payments submission covering every type you offer. All " + toDisplayString(unref(typeCount)) + " UAE Open Finance domestic payment types are available: Single Instant Payment, the six Multi-Payment variants, and Delegated SCA. You are the party that constructs the consent and the risk signals, so certification is about those two objects and a payment made against them — all evidenced from the ", 1),
                  createVNode("a", {
                    href: unref(domesticPaymentsTppArea).sandboxEvidenceHref
                  }, "AlTareq Model Bank", 8, ["href"]),
                  createTextVNode(" sandbox using the "),
                  createVNode("a", {
                    href: unref(domesticPaymentsTppArea).postmanGuideHref
                  }, "Postman collection", 8, ["href"]),
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
        eyebrow: "What you provide",
        title: "For each payment type you offer",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-53b900f4${_scopeId2}><strong data-v-53b900f4${_scopeId2}>Consent object</strong> — the <code data-v-53b900f4${_scopeId2}>authorization_details</code> (RAR) entry you send at <code data-v-53b900f4${_scopeId2}>/par</code>, edited in a schema-validated JSON editor. Each type is pre-seeded with a valid consent shape you adapt to your proposition. </li><li data-v-53b900f4${_scopeId2}><strong data-v-53b900f4${_scopeId2}>Risk object</strong> — the <code data-v-53b900f4${_scopeId2}>AERisk</code> object you send for fraud scoring, also edited against the schema. </li><li data-v-53b900f4${_scopeId2}><strong data-v-53b900f4${_scopeId2}>A payment against that consent</strong> — a Postman screenshot of a <code data-v-53b900f4${_scopeId2}>POST /payments</code> made against a consent of that type on the Model Bank. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Consent object"),
                      createTextVNode(" — the "),
                      createVNode("code", null, "authorization_details"),
                      createTextVNode(" (RAR) entry you send at "),
                      createVNode("code", null, "/par"),
                      createTextVNode(", edited in a schema-validated JSON editor. Each type is pre-seeded with a valid consent shape you adapt to your proposition. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Risk object"),
                      createTextVNode(" — the "),
                      createVNode("code", null, "AERisk"),
                      createTextVNode(" object you send for fraud scoring, also edited against the schema. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "A payment against that consent"),
                      createTextVNode(" — a Postman screenshot of a "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" made against a consent of that type on the Model Bank. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "note",
              title: "Delegated SCA"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-53b900f4${_scopeId2}> If you certify <strong data-v-53b900f4${_scopeId2}>Delegated SCA</strong> (<code data-v-53b900f4${_scopeId2}>IsDelegatedAuthentication: true</code>), you perform the customer authentication yourself before each payment. You additionally upload a screenshot of that authentication and describe how it populates the <code data-v-53b900f4${_scopeId2}>Authentication</code> section of the Risk object — <code data-v-53b900f4${_scopeId2}>Risk.DebtorIndicators.Authentication</code> (the factors used, the <code data-v-53b900f4${_scopeId2}>ChallengeOutcome</code>, and the <code data-v-53b900f4${_scopeId2}>AuthenticationFlow</code>). </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If you certify "),
                      createVNode("strong", null, "Delegated SCA"),
                      createTextVNode(" ("),
                      createVNode("code", null, "IsDelegatedAuthentication: true"),
                      createTextVNode("), you perform the customer authentication yourself before each payment. You additionally upload a screenshot of that authentication and describe how it populates the "),
                      createVNode("code", null, "Authentication"),
                      createTextVNode(" section of the Risk object — "),
                      createVNode("code", null, "Risk.DebtorIndicators.Authentication"),
                      createTextVNode(" (the factors used, the "),
                      createVNode("code", null, "ChallengeOutcome"),
                      createTextVNode(", and the "),
                      createVNode("code", null, "AuthenticationFlow"),
                      createTextVNode("). ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "note",
              title: "Accounts & Balances, and Refunds"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-53b900f4${_scopeId2}> A payment consent can also carry account and balance reads and a refund-account read. If your proposition uses them, tick the matching capability and evidence a balance read <strong data-v-53b900f4${_scopeId2}>before</strong> the payment and a refund read <strong data-v-53b900f4${_scopeId2}>after</strong> it, each with a Postman screenshot. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A payment consent can also carry account and balance reads and a refund-account read. If your proposition uses them, tick the matching capability and evidence a balance read "),
                      createVNode("strong", null, "before"),
                      createTextVNode(" the payment and a refund read "),
                      createVNode("strong", null, "after"),
                      createTextVNode(" it, each with a Postman screenshot. ")
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
                  _push3(`<p data-v-53b900f4${_scopeId2}> Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your TPP. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your TPP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Consent object"),
                    createTextVNode(" — the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" (RAR) entry you send at "),
                    createVNode("code", null, "/par"),
                    createTextVNode(", edited in a schema-validated JSON editor. Each type is pre-seeded with a valid consent shape you adapt to your proposition. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Risk object"),
                    createTextVNode(" — the "),
                    createVNode("code", null, "AERisk"),
                    createTextVNode(" object you send for fraud scoring, also edited against the schema. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "A payment against that consent"),
                    createTextVNode(" — a Postman screenshot of a "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" made against a consent of that type on the Model Bank. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "note",
                title: "Delegated SCA"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If you certify "),
                    createVNode("strong", null, "Delegated SCA"),
                    createTextVNode(" ("),
                    createVNode("code", null, "IsDelegatedAuthentication: true"),
                    createTextVNode("), you perform the customer authentication yourself before each payment. You additionally upload a screenshot of that authentication and describe how it populates the "),
                    createVNode("code", null, "Authentication"),
                    createTextVNode(" section of the Risk object — "),
                    createVNode("code", null, "Risk.DebtorIndicators.Authentication"),
                    createTextVNode(" (the factors used, the "),
                    createVNode("code", null, "ChallengeOutcome"),
                    createTextVNode(", and the "),
                    createVNode("code", null, "AuthenticationFlow"),
                    createTextVNode("). ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "note",
                title: "Accounts & Balances, and Refunds"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A payment consent can also carry account and balance reads and a refund-account read. If your proposition uses them, tick the matching capability and evidence a balance read "),
                    createVNode("strong", null, "before"),
                    createTextVNode(" the payment and a refund read "),
                    createVNode("strong", null, "after"),
                    createTextVNode(" it, each with a Postman screenshot. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "note",
                title: "Identity comes from SSO"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your TPP. ")
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
                  _push3(` When you have selected your types and attached your evidence, the portal generates a single ZIP containing a summary document, the Consent and Risk JSON for each type, and every screenshot. Attach that ZIP to a <a href="/support-service-desk" data-v-53b900f4${_scopeId2}>Service Desk</a><strong data-v-53b900f4${_scopeId2}>${ssrInterpolate(unref(domesticPaymentsTppArea).certType)}</strong> ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have selected your types and attached your evidence, the portal generates a single ZIP containing a summary document, the Consent and Risk JSON for each type, and every screenshot. Attach that ZIP to a "),
                    createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                    createVNode("strong", null, toDisplayString(unref(domesticPaymentsTppArea).certType), 1),
                    createTextVNode(" ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-53b900f4${_scopeId}><a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/domestic-payments/submission" data-v-53b900f4${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-53b900f4${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have selected your types and attached your evidence, the portal generates a single ZIP containing a summary document, the Consent and Risk JSON for each type, and every screenshot. Attach that ZIP to a "),
                  createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                  createVNode("strong", null, toDisplayString(unref(domesticPaymentsTppArea).certType), 1),
                  createTextVNode(" ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__cta" }, [
                createVNode("a", {
                  class: "ed-doc__cta-btn",
                  href: "/tech/tpp-standards/production/testing-certification/functional/domestic-payments/submission"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/functional/domestic-payments/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53b900f4"]]);
export {
  index as default
};
