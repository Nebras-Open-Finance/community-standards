import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { c as confirmationOfPayeeTppArea } from "./confirmation-of-payee-tpp-CRM2JZr8.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-cc1f7286><section class="ed-doc__hero" data-v-cc1f7286><div class="ed-doc__inner" data-v-cc1f7286><div class="ed-doc__eyebrow" data-v-cc1f7286><span class="ed-doc__eyebrow-dash" data-v-cc1f7286></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-cc1f7286> Functional Certification — Confirmation of Payee <span class="ed-doc__read" data-v-cc1f7286>3 min read</span></h1><p class="ed-doc__lede" data-v-cc1f7286> Functional Certification proves that your proposition consumes Confirmation of Payee correctly: you resolve the LFI, submit a payee name and IBAN, and handle the name-match verdict the API Hub returns — both a full match and a no match — using the AlTareq Model Bank. This page explains what evidence to gather; the portal then builds your submission for you. </p><div class="ed-doc__cta" data-v-cc1f7286><a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee/submission" data-v-cc1f7286> Start your submission <span class="ed-doc__cta-arrow" data-v-cc1f7286>↗</span></a></div></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What it is",
        title: "Evidence that your proposition handles the verdict correctly",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Confirmation of Payee it demonstrates that you can resolve the servicing LFI via <code data-v-cc1f7286${_scopeId2}>POST /discovery</code>, submit a payee name and IBAN to <code data-v-cc1f7286${_scopeId2}>POST /confirmation</code>, and correctly handle the <code data-v-cc1f7286${_scopeId2}>NameMatchIndicator</code> the API Hub returns — retrieved from the <a${ssrRenderAttr("href", unref(confirmationOfPayeeTppArea).sandboxEvidenceHref)} data-v-cc1f7286${_scopeId2}>AlTareq Model Bank</a> sandbox. `);
                } else {
                  return [
                    createTextVNode(" Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Confirmation of Payee it demonstrates that you can resolve the servicing LFI via "),
                    createVNode("code", null, "POST /discovery"),
                    createTextVNode(", submit a payee name and IBAN to "),
                    createVNode("code", null, "POST /confirmation"),
                    createTextVNode(", and correctly handle the "),
                    createVNode("code", null, "NameMatchIndicator"),
                    createTextVNode(" the API Hub returns — retrieved from the "),
                    createVNode("a", {
                      href: unref(confirmationOfPayeeTppArea).sandboxEvidenceHref
                    }, "AlTareq Model Bank", 8, ["href"]),
                    createTextVNode(" sandbox. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Confirmation of Payee it demonstrates that you can resolve the servicing LFI via "),
                  createVNode("code", null, "POST /discovery"),
                  createTextVNode(", submit a payee name and IBAN to "),
                  createVNode("code", null, "POST /confirmation"),
                  createTextVNode(", and correctly handle the "),
                  createVNode("code", null, "NameMatchIndicator"),
                  createTextVNode(" the API Hub returns — retrieved from the "),
                  createVNode("a", {
                    href: unref(confirmationOfPayeeTppArea).sandboxEvidenceHref
                  }, "AlTareq Model Bank", 8, ["href"]),
                  createTextVNode(" sandbox. ")
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
                  _push3(` For each segment you support (Retail with a personal name, SME and Corporate with a business name), you evidence a full match and a no match. Have the following ready: `);
                } else {
                  return [
                    createTextVNode(" For each segment you support (Retail with a personal name, SME and Corporate with a business name), you evidence a full match and a no match. Have the following ready: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-cc1f7286${_scopeId2}><strong data-v-cc1f7286${_scopeId2}>Requested name &amp; IBAN</strong> — for each outcome, the payee name and IBAN you submitted. Use the account holder’s exact name for the full match, and a different name for the no match. </li><li data-v-cc1f7286${_scopeId2}><strong data-v-cc1f7286${_scopeId2}>Postman verdict screenshot</strong> — a screenshot from the Postman collection showing the <code data-v-cc1f7286${_scopeId2}>/confirmation</code> response with the expected <code data-v-cc1f7286${_scopeId2}>NameMatchIndicator</code> (<code data-v-cc1f7286${_scopeId2}>ConfirmationOfPayee.Yes</code> for the full match, <code data-v-cc1f7286${_scopeId2}>ConfirmationOfPayee.No</code> for the no match), retrieved from the Model Bank. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Requested name & IBAN"),
                      createTextVNode(" — for each outcome, the payee name and IBAN you submitted. Use the account holder’s exact name for the full match, and a different name for the no match. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Postman verdict screenshot"),
                      createTextVNode(" — a screenshot from the Postman collection showing the "),
                      createVNode("code", null, "/confirmation"),
                      createTextVNode(" response with the expected "),
                      createVNode("code", null, "NameMatchIndicator"),
                      createTextVNode(" ("),
                      createVNode("code", null, "ConfirmationOfPayee.Yes"),
                      createTextVNode(" for the full match, "),
                      createVNode("code", null, "ConfirmationOfPayee.No"),
                      createTextVNode(" for the no match), retrieved from the Model Bank. ")
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
                  _push3(`<p data-v-cc1f7286${_scopeId2}> Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed correctly. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed correctly. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For each segment you support (Retail with a personal name, SME and Corporate with a business name), you evidence a full match and a no match. Have the following ready: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Requested name & IBAN"),
                    createTextVNode(" — for each outcome, the payee name and IBAN you submitted. Use the account holder’s exact name for the full match, and a different name for the no match. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Postman verdict screenshot"),
                    createTextVNode(" — a screenshot from the Postman collection showing the "),
                    createVNode("code", null, "/confirmation"),
                    createTextVNode(" response with the expected "),
                    createVNode("code", null, "NameMatchIndicator"),
                    createTextVNode(" ("),
                    createVNode("code", null, "ConfirmationOfPayee.Yes"),
                    createTextVNode(" for the full match, "),
                    createVNode("code", null, "ConfirmationOfPayee.No"),
                    createTextVNode(" for the no match), retrieved from the Model Bank. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "note",
                title: "Identity comes from SSO"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed correctly. ")
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
                  _push3(` When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per scenario. Attach that ZIP to a Service Desk ticket with the Certification Type <strong data-v-cc1f7286${_scopeId2}>“${ssrInterpolate(unref(confirmationOfPayeeTppArea).certType)}”</strong>. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per scenario. Attach that ZIP to a Service Desk ticket with the Certification Type "),
                    createVNode("strong", null, "“" + toDisplayString(unref(confirmationOfPayeeTppArea).certType) + "”", 1),
                    createTextVNode(". Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-cc1f7286${_scopeId}><a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee/submission" data-v-cc1f7286${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-cc1f7286${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per scenario. Attach that ZIP to a Service Desk ticket with the Certification Type "),
                  createVNode("strong", null, "“" + toDisplayString(unref(confirmationOfPayeeTppArea).certType) + "”", 1),
                  createTextVNode(". Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__cta" }, [
                createVNode("a", {
                  class: "ed-doc__cta-btn",
                  href: "/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee/submission"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc1f7286"]]);
export {
  index as default
};
