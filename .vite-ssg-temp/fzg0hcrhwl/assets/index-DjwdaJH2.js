import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import { d as delegatedScaArea } from "./delegated-sca-DeJVXqpQ.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FcDelegatedScaExplainer",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-0f666a77><section class="ed-doc__hero" data-v-0f666a77><div class="ed-doc__inner" data-v-0f666a77><div class="ed-doc__eyebrow" data-v-0f666a77><span class="ed-doc__eyebrow-dash" data-v-0f666a77></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-0f666a77> Functional Certification — ${ssrInterpolate(__props.area.label)} <span class="ed-doc__read" data-v-0f666a77>3 min read</span></h1><p class="ed-doc__lede" data-v-0f666a77>${ssrInterpolate(__props.area.label)} is the <strong data-v-0f666a77>delegated-authentication</strong> overlay on a payment consent, certified after Single Instant Payment. The consent carries <code data-v-0f666a77>IsDelegatedAuthentication: true</code> with an empty <code data-v-0f666a77>ConsentSchedule</code> — the <strong data-v-0f666a77>TPP</strong> defines and manages the payment controls — so there is nothing to evidence about <code data-v-0f666a77>ControlParameters</code>. Instead you evidence the payment limit you enforce, your Creditor / Risk handling, and one authorised consent for each beneficiary model. This page explains the evidence; the portal then builds your submission. </p><div class="ed-doc__cta" data-v-0f666a77><a class="ed-doc__cta-btn"${ssrRenderAttr("href", submissionPath)} data-v-0f666a77> Start your submission <span class="ed-doc__cta-arrow" data-v-0f666a77>↗</span></a></div></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What it is",
        title: "Evidence for delegated authentication",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Under Delegated SCA the customer authorises a consent that hands control of the payments to the TPP: <code data-v-0f666a77${_scopeId2}>IsDelegatedAuthentication</code> is <code data-v-0f666a77${_scopeId2}>true</code> and the <code data-v-0f666a77${_scopeId2}>ConsentSchedule</code> is empty. Because the TPP sets and manages the controls, your LFI has no <code data-v-0f666a77${_scopeId2}>ControlParameters</code> to store, display, or enforce — so unlike the six Multi-Payment types there are no control-parameter scenarios. See the <a${ssrRenderAttr("href", __props.area.docHref)} data-v-0f666a77${_scopeId2}>${ssrInterpolate(__props.area.label)} API guide</a> for the delegated-authentication model. `);
                } else {
                  return [
                    createTextVNode(" Under Delegated SCA the customer authorises a consent that hands control of the payments to the TPP: "),
                    createVNode("code", null, "IsDelegatedAuthentication"),
                    createTextVNode(" is "),
                    createVNode("code", null, "true"),
                    createTextVNode(" and the "),
                    createVNode("code", null, "ConsentSchedule"),
                    createTextVNode(" is empty. Because the TPP sets and manages the controls, your LFI has no "),
                    createVNode("code", null, "ControlParameters"),
                    createTextVNode(" to store, display, or enforce — so unlike the six Multi-Payment types there are no control-parameter scenarios. See the "),
                    createVNode("a", {
                      href: __props.area.docHref
                    }, toDisplayString(__props.area.label) + " API guide", 9, ["href"]),
                    createTextVNode(" for the delegated-authentication model. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Under Delegated SCA the customer authorises a consent that hands control of the payments to the TPP: "),
                  createVNode("code", null, "IsDelegatedAuthentication"),
                  createTextVNode(" is "),
                  createVNode("code", null, "true"),
                  createTextVNode(" and the "),
                  createVNode("code", null, "ConsentSchedule"),
                  createTextVNode(" is empty. Because the TPP sets and manages the controls, your LFI has no "),
                  createVNode("code", null, "ControlParameters"),
                  createTextVNode(" to store, display, or enforce — so unlike the six Multi-Payment types there are no control-parameter scenarios. See the "),
                  createVNode("a", {
                    href: __props.area.docHref
                  }, toDisplayString(__props.area.label) + " API guide", 9, ["href"]),
                  createTextVNode(" for the delegated-authentication model. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "evidence",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "What you evidence",
        title: "Payment limit, Creditor & Risk, and beneficiary models",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.area.label)} certification collects three things: `);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.area.label) + " certification collects three things: ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-0f666a77${_scopeId2}><strong data-v-0f666a77${_scopeId2}>Payment limit</strong> — the maximum AED a single Delegated SCA payment can take on your LFI. The TPP manages the consent controls, but your own institutional limit still applies. </li><li data-v-0f666a77${_scopeId2}><strong data-v-0f666a77${_scopeId2}>Creditor validation &amp; Risk handling</strong> — the Creditor arrives inside the encrypted <code data-v-0f666a77${_scopeId2}>PersonalIdentifiableInformation</code>, so you evidence decrypting it and validating the creditor, and that the cleartext <code data-v-0f666a77${_scopeId2}>Risk</code> object (AERisk) is used in your screening. This is the same evidence as Single Instant Payment, re-captured because it may differ slightly under delegation. </li><li data-v-0f666a77${_scopeId2}><strong data-v-0f666a77${_scopeId2}>Beneficiary models</strong> — one authorised pre-production consent for each of <strong data-v-0f666a77${_scopeId2}>Single</strong> (one creditor), <strong data-v-0f666a77${_scopeId2}>Multiple</strong> (2–10 fixed creditors) and <strong data-v-0f666a77${_scopeId2}>Open</strong> (no creditor fixed at consent; supplied at <code data-v-0f666a77${_scopeId2}>POST /payments</code>), each with the <code data-v-0f666a77${_scopeId2}>ConsentId</code> and the authorization screen the customer saw. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Payment limit"),
                      createTextVNode(" — the maximum AED a single Delegated SCA payment can take on your LFI. The TPP manages the consent controls, but your own institutional limit still applies. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Creditor validation & Risk handling"),
                      createTextVNode(" — the Creditor arrives inside the encrypted "),
                      createVNode("code", null, "PersonalIdentifiableInformation"),
                      createTextVNode(", so you evidence decrypting it and validating the creditor, and that the cleartext "),
                      createVNode("code", null, "Risk"),
                      createTextVNode(" object (AERisk) is used in your screening. This is the same evidence as Single Instant Payment, re-captured because it may differ slightly under delegation. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Beneficiary models"),
                      createTextVNode(" — one authorised pre-production consent for each of "),
                      createVNode("strong", null, "Single"),
                      createTextVNode(" (one creditor), "),
                      createVNode("strong", null, "Multiple"),
                      createTextVNode(" (2–10 fixed creditors) and "),
                      createVNode("strong", null, "Open"),
                      createTextVNode(" (no creditor fixed at consent; supplied at "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode("), each with the "),
                      createVNode("code", null, "ConsentId"),
                      createTextVNode(" and the authorization screen the customer saw. ")
                    ])
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
                  _push3(`<p data-v-0f666a77${_scopeId2}>${ssrInterpolate(__props.area.label)} builds on Single Instant Payment. You will be asked for the JIRA ticket of your completed Single Instant Payment certification, so have it to hand. </p>`);
                } else {
                  return [
                    createVNode("p", null, toDisplayString(__props.area.label) + " builds on Single Instant Payment. You will be asked for the JIRA ticket of your completed Single Instant Payment certification, so have it to hand. ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "note",
              title: "Advertise your beneficiary models"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-0f666a77${_scopeId2}> To accept the Multiple and Open beneficiary models you must advertise support for each on your Trust Framework authorisation-server entry. The portal shows a reference decrypted PII for each model. See the <a${ssrRenderAttr("href", __props.area.creditorDocHref)} data-v-0f666a77${_scopeId2}>Creditor PII page</a> for the model definitions. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" To accept the Multiple and Open beneficiary models you must advertise support for each on your Trust Framework authorisation-server entry. The portal shows a reference decrypted PII for each model. See the "),
                      createVNode("a", {
                        href: __props.area.creditorDocHref
                      }, "Creditor PII page", 8, ["href"]),
                      createTextVNode(" for the model definitions. ")
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
                  createTextVNode(toDisplayString(__props.area.label) + " certification collects three things: ", 1)
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Payment limit"),
                    createTextVNode(" — the maximum AED a single Delegated SCA payment can take on your LFI. The TPP manages the consent controls, but your own institutional limit still applies. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Creditor validation & Risk handling"),
                    createTextVNode(" — the Creditor arrives inside the encrypted "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(", so you evidence decrypting it and validating the creditor, and that the cleartext "),
                    createVNode("code", null, "Risk"),
                    createTextVNode(" object (AERisk) is used in your screening. This is the same evidence as Single Instant Payment, re-captured because it may differ slightly under delegation. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Beneficiary models"),
                    createTextVNode(" — one authorised pre-production consent for each of "),
                    createVNode("strong", null, "Single"),
                    createTextVNode(" (one creditor), "),
                    createVNode("strong", null, "Multiple"),
                    createTextVNode(" (2–10 fixed creditors) and "),
                    createVNode("strong", null, "Open"),
                    createTextVNode(" (no creditor fixed at consent; supplied at "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode("), each with the "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(" and the authorization screen the customer saw. ")
                  ])
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
              createVNode(_component_EdNote, {
                type: "note",
                title: "Advertise your beneficiary models"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" To accept the Multiple and Open beneficiary models you must advertise support for each on your Trust Framework authorisation-server entry. The portal shows a reference decrypted PII for each model. See the "),
                    createVNode("a", {
                      href: __props.area.creditorDocHref
                    }, "Creditor PII page", 8, ["href"]),
                    createTextVNode(" for the model definitions. ")
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
                  _push3(` When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot. Attach it to a <a href="/support-service-desk" data-v-0f666a77${_scopeId2}>Service Desk</a> certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot. Attach it to a "),
                    createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                    createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-0f666a77${_scopeId}><a class="ed-doc__cta-btn"${ssrRenderAttr("href", submissionPath)} data-v-0f666a77${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-0f666a77${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot. Attach it to a "),
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/functional-certification/FcDelegatedScaExplainer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0f666a77"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FcDelegatedScaExplainer = __unplugin_components_0;
      _push(ssrRenderComponent(_component_FcDelegatedScaExplainer, mergeProps({ area: unref(delegatedScaArea) }, _attrs), null, _parent));
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/delegated-sca/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
