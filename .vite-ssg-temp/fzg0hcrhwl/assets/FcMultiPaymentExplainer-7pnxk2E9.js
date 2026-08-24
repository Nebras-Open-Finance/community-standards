import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FcMultiPaymentExplainer",
  __ssrInlineRender: true,
  props: {
    area: {}
  },
  setup(__props) {
    const props = __props;
    const submissionPath = `/tech/lfi-api-hub/production/testing-certification/functional/${props.area.key}/submission`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b5a2c108><section class="ed-doc__hero" data-v-b5a2c108><div class="ed-doc__inner" data-v-b5a2c108><div class="ed-doc__eyebrow" data-v-b5a2c108><span class="ed-doc__eyebrow-dash" data-v-b5a2c108></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-b5a2c108> Functional Certification — ${ssrInterpolate(__props.area.label)} <span class="ed-doc__read" data-v-b5a2c108>3 min read</span></h1><p class="ed-doc__lede" data-v-b5a2c108>${ssrInterpolate(__props.area.label)} is one of the six Multi-Payment types, certified after Single Instant Payment. Its certification is about the <strong data-v-b5a2c108>consent</strong>: you prove your LFI ingests, displays on its authorization screen, and will enforce the <code data-v-b5a2c108>ControlParameters</code> — both with every optional control set and with only the required minimum. This page explains the evidence; the portal then builds your submission. </p><div class="ed-doc__cta" data-v-b5a2c108><a class="ed-doc__cta-btn"${ssrRenderAttr("href", submissionPath)} data-v-b5a2c108> Start your submission <span class="ed-doc__cta-arrow" data-v-b5a2c108>↗</span></a></div></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What it is",
        title: "Evidence that your consent handling is correct",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A ${ssrInterpolate(__props.area.label)} consent (<code data-v-b5a2c108${_scopeId2}>Type: ${ssrInterpolate(__props.area.paymentType)}</code>) is a long-lived multi-payment consent whose <code data-v-b5a2c108${_scopeId2}>ControlParameters.ConsentSchedule.MultiPayment</code> carries the payment schedule and its limits. Your LFI does not decide these — the TPP sets them and the customer authorizes them — but you MUST store them, show them on your authorization screen, and enforce them on every payment. Certification proves this for two consents: one with every optional control parameter populated, and one with only the required minimum. See the <a${ssrRenderAttr("href", __props.area.docHref)} data-v-b5a2c108${_scopeId2}>${ssrInterpolate(__props.area.label)} API guide</a> for the full model. `);
                } else {
                  return [
                    createTextVNode(" A " + toDisplayString(__props.area.label) + " consent (", 1),
                    createVNode("code", null, "Type: " + toDisplayString(__props.area.paymentType), 1),
                    createTextVNode(") is a long-lived multi-payment consent whose "),
                    createVNode("code", null, "ControlParameters.ConsentSchedule.MultiPayment"),
                    createTextVNode(" carries the payment schedule and its limits. Your LFI does not decide these — the TPP sets them and the customer authorizes them — but you MUST store them, show them on your authorization screen, and enforce them on every payment. Certification proves this for two consents: one with every optional control parameter populated, and one with only the required minimum. See the "),
                    createVNode("a", {
                      href: __props.area.docHref
                    }, toDisplayString(__props.area.label) + " API guide", 9, ["href"]),
                    createTextVNode(" for the full model. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A " + toDisplayString(__props.area.label) + " consent (", 1),
                  createVNode("code", null, "Type: " + toDisplayString(__props.area.paymentType), 1),
                  createTextVNode(") is a long-lived multi-payment consent whose "),
                  createVNode("code", null, "ControlParameters.ConsentSchedule.MultiPayment"),
                  createTextVNode(" carries the payment schedule and its limits. Your LFI does not decide these — the TPP sets them and the customer authorizes them — but you MUST store them, show them on your authorization screen, and enforce them on every payment. Certification proves this for two consents: one with every optional control parameter populated, and one with only the required minimum. See the "),
                  createVNode("a", {
                    href: __props.area.docHref
                  }, toDisplayString(__props.area.label) + " API guide", 9, ["href"]),
                  createTextVNode(" for the full model. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "controls",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Control parameters",
        title: "Required and optional controls",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For ${ssrInterpolate(__props.area.label)} the ControlParameters break down as: `);
                } else {
                  return [
                    createTextVNode(" For " + toDisplayString(__props.area.label) + " the ControlParameters break down as: ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b5a2c108${_scopeId2}><strong data-v-b5a2c108${_scopeId2}>Required (always present):</strong> ${ssrInterpolate(__props.area.requiredControls.join(", "))}.</li><li data-v-b5a2c108${_scopeId2}><strong data-v-b5a2c108${_scopeId2}>Optional (set in one consent, omitted in the other):</strong> ${ssrInterpolate(__props.area.optionalControls.join(", "))}.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Required (always present):"),
                      createTextVNode(" " + toDisplayString(__props.area.requiredControls.join(", ")) + ".", 1)
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Optional (set in one consent, omitted in the other):"),
                      createTextVNode(" " + toDisplayString(__props.area.optionalControls.join(", ")) + ".", 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` You will provide, for each of the two consents, the pre-production <code data-v-b5a2c108${_scopeId2}>ConsentId</code>, the consent details (the <code data-v-b5a2c108${_scopeId2}>ControlParameters</code> / authorization_details), and a screenshot of the authorization screen the customer saw for that consent. `);
                } else {
                  return [
                    createTextVNode(" You will provide, for each of the two consents, the pre-production "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(", the consent details (the "),
                    createVNode("code", null, "ControlParameters"),
                    createTextVNode(" / authorization_details), and a screenshot of the authorization screen the customer saw for that consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "note",
              title: "Single Instant Payment first"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b5a2c108${_scopeId2}>${ssrInterpolate(__props.area.label)} builds on Single Instant Payment. You will be asked for the JIRA ticket of your completed Single Instant Payment certification, so have it to hand. </p>`);
                } else {
                  return [
                    createVNode("p", null, toDisplayString(__props.area.label) + " builds on Single Instant Payment. You will be asked for the JIRA ticket of your completed Single Instant Payment certification, so have it to hand. ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if ((_a = __props.area.beneficiaryModels) == null ? void 0 : _a.length) {
              _push2(ssrRenderComponent(_component_EdNote, {
                type: "note",
                title: "Beneficiary models"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p data-v-b5a2c108${_scopeId2}>${ssrInterpolate(__props.area.label)} also accepts more than a single beneficiary. Alongside the control-parameter scenarios, you will evidence one consent for each beneficiary model — <strong data-v-b5a2c108${_scopeId2}>Multiple Beneficiaries</strong> (2–10 fixed creditors) and <strong data-v-b5a2c108${_scopeId2}>Open Beneficiaries</strong> (no creditor fixed at consent; the creditor is supplied at <code data-v-b5a2c108${_scopeId2}>POST /payments</code>). The portal shows a reference PII for each, and you must advertise support for each model in the Trust Framework. </p>`);
                  } else {
                    return [
                      createVNode("p", null, [
                        createTextVNode(toDisplayString(__props.area.label) + " also accepts more than a single beneficiary. Alongside the control-parameter scenarios, you will evidence one consent for each beneficiary model — ", 1),
                        createVNode("strong", null, "Multiple Beneficiaries"),
                        createTextVNode(" (2–10 fixed creditors) and "),
                        createVNode("strong", null, "Open Beneficiaries"),
                        createTextVNode(" (no creditor fixed at consent; the creditor is supplied at "),
                        createVNode("code", null, "POST /payments"),
                        createTextVNode("). The portal shows a reference PII for each, and you must advertise support for each model in the Trust Framework. ")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For " + toDisplayString(__props.area.label) + " the ControlParameters break down as: ", 1)
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Required (always present):"),
                    createTextVNode(" " + toDisplayString(__props.area.requiredControls.join(", ")) + ".", 1)
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Optional (set in one consent, omitted in the other):"),
                    createTextVNode(" " + toDisplayString(__props.area.optionalControls.join(", ")) + ".", 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" You will provide, for each of the two consents, the pre-production "),
                  createVNode("code", null, "ConsentId"),
                  createTextVNode(", the consent details (the "),
                  createVNode("code", null, "ControlParameters"),
                  createTextVNode(" / authorization_details), and a screenshot of the authorization screen the customer saw for that consent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "note",
                title: "Single Instant Payment first"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, toDisplayString(__props.area.label) + " builds on Single Instant Payment. You will be asked for the JIRA ticket of your completed Single Instant Payment certification, so have it to hand. ", 1)
                ]),
                _: 1
              }),
              ((_b = __props.area.beneficiaryModels) == null ? void 0 : _b.length) ? (openBlock(), createBlock(_component_EdNote, {
                key: 0,
                type: "note",
                title: "Beneficiary models"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(toDisplayString(__props.area.label) + " also accepts more than a single beneficiary. Alongside the control-parameter scenarios, you will evidence one consent for each beneficiary model — ", 1),
                    createVNode("strong", null, "Multiple Beneficiaries"),
                    createTextVNode(" (2–10 fixed creditors) and "),
                    createVNode("strong", null, "Open Beneficiaries"),
                    createTextVNode(" (no creditor fixed at consent; the creditor is supplied at "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode("). The portal shows a reference PII for each, and you must advertise support for each model in the Trust Framework. ")
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
                  _push3(` When you have filled in the form and attached your authorization-screen screenshots, the portal generates a single ZIP containing a summary document and every screenshot. Attach it to a <a href="/support-service-desk" data-v-b5a2c108${_scopeId2}>Service Desk</a> certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have filled in the form and attached your authorization-screen screenshots, the portal generates a single ZIP containing a summary document and every screenshot. Attach it to a "),
                    createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                    createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-b5a2c108${_scopeId}><a class="ed-doc__cta-btn"${ssrRenderAttr("href", submissionPath)} data-v-b5a2c108${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-b5a2c108${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have filled in the form and attached your authorization-screen screenshots, the portal generates a single ZIP containing a summary document and every screenshot. Attach it to a "),
                  createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                  createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__cta" }, [
                createVNode("a", {
                  class: "ed-doc__cta-btn",
                  href: submissionPath
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcMultiPaymentExplainer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b5a2c108"]]);
export {
  __unplugin_components_0 as _
};
