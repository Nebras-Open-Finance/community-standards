import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { c as confirmationOfPayeeArea } from "./confirmation-of-payee-CK6a5hvw.js";
import { C as CURRENT_VERSION, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const outcomeCount = confirmationOfPayeeArea.outcomes.length;
    const sampleBaseUrl = confirmationOfPayeeArea.baseUrlTemplate.replace("{LFICODE}", "LFICODE").replace("{VERSION}", CURRENT_VERSION);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-fd345c25><section class="ed-doc__hero" data-v-fd345c25><div class="ed-doc__inner" data-v-fd345c25><div class="ed-doc__eyebrow" data-v-fd345c25><span class="ed-doc__eyebrow-dash" data-v-fd345c25></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-fd345c25> Functional Certification — Confirmation of Payee <span class="ed-doc__read" data-v-fd345c25>3 min read</span></h1><p class="ed-doc__lede" data-v-fd345c25> Functional Certification proves that your Ozone Connect Confirmation of Payee implementation returns the correct account-holder name, and that the API Hub then produces the right name-match verdict — Yes, Partial, No, and account-not-found — for the payee names a TPP submits. This page explains what the evidence is and how to produce it; the portal then builds your submission for you. </p><div class="ed-doc__cta" data-v-fd345c25><a class="ed-doc__cta-btn" href="/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/submission" data-v-fd345c25> Start your submission <span class="ed-doc__cta-arrow" data-v-fd345c25>↗</span></a></div></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What it is",
        title: "Evidence that your cop-query drives the right verdict",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Confirmation of Payee has a single Ozone Connect endpoint, <code data-v-fd345c25${_scopeId2}>${ssrInterpolate(unref(confirmationOfPayeeArea).ozoneEndpoint.method)} ${ssrInterpolate(unref(confirmationOfPayeeArea).ozoneEndpoint.path)}</code>. Unlike Bank Data Sharing, the LFI does not decide the match — your endpoint returns the account-holder name and <strong data-v-fd345c25${_scopeId2}>the API Hub applies the name-matching rules</strong> to produce the verdict. Functional Certification therefore proves each match <em data-v-fd345c25${_scopeId2}>outcome</em>, per segment: that the name you return, matched against the name a TPP submits, yields the correct <code data-v-fd345c25${_scopeId2}>NameMatchIndicator</code>. All evidence must come from your own <strong data-v-fd345c25${_scopeId2}>pre-production environment</strong>. `);
                } else {
                  return [
                    createTextVNode(" Confirmation of Payee has a single Ozone Connect endpoint, "),
                    createVNode("code", null, toDisplayString(unref(confirmationOfPayeeArea).ozoneEndpoint.method) + " " + toDisplayString(unref(confirmationOfPayeeArea).ozoneEndpoint.path), 1),
                    createTextVNode(". Unlike Bank Data Sharing, the LFI does not decide the match — your endpoint returns the account-holder name and "),
                    createVNode("strong", null, "the API Hub applies the name-matching rules"),
                    createTextVNode(" to produce the verdict. Functional Certification therefore proves each match "),
                    createVNode("em", null, "outcome"),
                    createTextVNode(", per segment: that the name you return, matched against the name a TPP submits, yields the correct "),
                    createVNode("code", null, "NameMatchIndicator"),
                    createTextVNode(". All evidence must come from your own "),
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
                  createTextVNode(" Confirmation of Payee has a single Ozone Connect endpoint, "),
                  createVNode("code", null, toDisplayString(unref(confirmationOfPayeeArea).ozoneEndpoint.method) + " " + toDisplayString(unref(confirmationOfPayeeArea).ozoneEndpoint.path), 1),
                  createTextVNode(". Unlike Bank Data Sharing, the LFI does not decide the match — your endpoint returns the account-holder name and "),
                  createVNode("strong", null, "the API Hub applies the name-matching rules"),
                  createTextVNode(" to produce the verdict. Functional Certification therefore proves each match "),
                  createVNode("em", null, "outcome"),
                  createTextVNode(", per segment: that the name you return, matched against the name a TPP submits, yields the correct "),
                  createVNode("code", null, "NameMatchIndicator"),
                  createTextVNode(". All evidence must come from your own "),
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
                  _push3(` You choose the version and segments (Retail is evidenced with a personal name; SME and Corporate with a business name), then evidence each of the ${ssrInterpolate(unref(outcomeCount))} outcomes per segment. Have the following ready: `);
                } else {
                  return [
                    createTextVNode(" You choose the version and segments (Retail is evidenced with a personal name; SME and Corporate with a business name), then evidence each of the " + toDisplayString(unref(outcomeCount)) + " outcomes per segment. Have the following ready: ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-fd345c25${_scopeId2}><strong data-v-fd345c25${_scopeId2}>Testing Tool output</strong> — one HTML report the Testing Tool produces for your Ozone Connect <code data-v-fd345c25${_scopeId2}>cop-query</code> endpoint. </li><li data-v-fd345c25${_scopeId2}><strong data-v-fd345c25${_scopeId2}>Requested name &amp; IBAN</strong> — for each outcome, the name and IBAN you sent in the confirmation request. Craft the name to force the outcome: exact for Yes, close for Partial, different for No, and an unrecognised IBAN for account-not-found. </li><li data-v-fd345c25${_scopeId2}><strong data-v-fd345c25${_scopeId2}>Name you returned</strong> — the full name (and, if collected, first and last name) or business name your <code data-v-fd345c25${_scopeId2}>cop-query</code> returned as the LFI. Account-not-found returns an empty <code data-v-fd345c25${_scopeId2}>data</code> object instead. </li><li data-v-fd345c25${_scopeId2}><strong data-v-fd345c25${_scopeId2}>Postman verdict screenshot</strong> — a screenshot from the Postman collection showing the TPP-facing <code data-v-fd345c25${_scopeId2}>POST ${ssrInterpolate(unref(sampleBaseUrl))}/confirmation</code> response with the expected <code data-v-fd345c25${_scopeId2}>NameMatchIndicator</code> (or HTTP 204 for account-not-found). </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Testing Tool output"),
                      createTextVNode(" — one HTML report the Testing Tool produces for your Ozone Connect "),
                      createVNode("code", null, "cop-query"),
                      createTextVNode(" endpoint. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Requested name & IBAN"),
                      createTextVNode(" — for each outcome, the name and IBAN you sent in the confirmation request. Craft the name to force the outcome: exact for Yes, close for Partial, different for No, and an unrecognised IBAN for account-not-found. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Name you returned"),
                      createTextVNode(" — the full name (and, if collected, first and last name) or business name your "),
                      createVNode("code", null, "cop-query"),
                      createTextVNode(" returned as the LFI. Account-not-found returns an empty "),
                      createVNode("code", null, "data"),
                      createTextVNode(" object instead. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Postman verdict screenshot"),
                      createTextVNode(" — a screenshot from the Postman collection showing the TPP-facing "),
                      createVNode("code", null, "POST " + toDisplayString(unref(sampleBaseUrl)) + "/confirmation", 1),
                      createTextVNode(" response with the expected "),
                      createVNode("code", null, "NameMatchIndicator"),
                      createTextVNode(" (or HTTP 204 for account-not-found). ")
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
                  _push3(`<p data-v-fd345c25${_scopeId2}> Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. </p>`);
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
                  createTextVNode(" You choose the version and segments (Retail is evidenced with a personal name; SME and Corporate with a business name), then evidence each of the " + toDisplayString(unref(outcomeCount)) + " outcomes per segment. Have the following ready: ", 1)
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Testing Tool output"),
                    createTextVNode(" — one HTML report the Testing Tool produces for your Ozone Connect "),
                    createVNode("code", null, "cop-query"),
                    createTextVNode(" endpoint. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Requested name & IBAN"),
                    createTextVNode(" — for each outcome, the name and IBAN you sent in the confirmation request. Craft the name to force the outcome: exact for Yes, close for Partial, different for No, and an unrecognised IBAN for account-not-found. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Name you returned"),
                    createTextVNode(" — the full name (and, if collected, first and last name) or business name your "),
                    createVNode("code", null, "cop-query"),
                    createTextVNode(" returned as the LFI. Account-not-found returns an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" object instead. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Postman verdict screenshot"),
                    createTextVNode(" — a screenshot from the Postman collection showing the TPP-facing "),
                    createVNode("code", null, "POST " + toDisplayString(unref(sampleBaseUrl)) + "/confirmation", 1),
                    createTextVNode(" response with the expected "),
                    createVNode("code", null, "NameMatchIndicator"),
                    createTextVNode(" (or HTTP 204 for account-not-found). ")
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
                  _push3(` When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document, your Testing Tool report, and every screenshot, organised per scenario. Attach that ZIP to a <a href="/support-service-desk" data-v-fd345c25${_scopeId2}>Service Desk</a> certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document, your Testing Tool report, and every screenshot, organised per scenario. Attach that ZIP to a "),
                    createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                    createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-fd345c25${_scopeId}><a class="ed-doc__cta-btn" href="/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/submission" data-v-fd345c25${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-fd345c25${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document, your Testing Tool report, and every screenshot, organised per scenario. Attach that ZIP to a "),
                  createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                  createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__cta" }, [
                createVNode("a", {
                  class: "ed-doc__cta-btn",
                  href: "/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/submission"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fd345c25"]]);
export {
  index as default
};
