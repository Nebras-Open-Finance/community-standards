import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { i as insuranceDataSharingTppArea } from "./insurance-data-sharing-tpp-DHAlN5jD.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./insurance-data-sharing-BL4Oizff.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const consumableCount = insuranceDataSharingTppArea.endpoints.filter((e) => e.tppPath).length;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c0158691><section class="ed-doc__hero" data-v-c0158691><div class="ed-doc__inner" data-v-c0158691><div class="ed-doc__eyebrow" data-v-c0158691><span class="ed-doc__eyebrow-dash" data-v-c0158691></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-c0158691> Functional Certification — Insurance Data Sharing <span class="ed-doc__read" data-v-c0158691>3 min read</span></h1><p class="ed-doc__lede" data-v-c0158691> Functional Certification proves that your proposition consumes Insurance Data Sharing correctly: you request only the permissions your endpoints need, across the insurance sectors you support, and you can retrieve that policy data from the AlTareq Model Insurer. This page explains what evidence to gather; the portal then builds your submission for you. </p><div class="ed-doc__cta" data-v-c0158691><a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/submission" data-v-c0158691> Start your submission <span class="ed-doc__cta-arrow" data-v-c0158691>↗</span></a></div></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What it is",
        title: "Evidence that your proposition consumes the data correctly",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Insurance Data Sharing, it demonstrates that your consent requests only the permissions your proposition uses, that those permissions align to the endpoints you consume, and that you can retrieve the policy data from the <a${ssrRenderAttr("href", unref(insuranceDataSharingTppArea).sandboxEvidenceHref)} data-v-c0158691${_scopeId2}>AlTareq Model Insurer</a> sandbox. `);
                } else {
                  return [
                    createTextVNode(" Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Insurance Data Sharing, it demonstrates that your consent requests only the permissions your proposition uses, that those permissions align to the endpoints you consume, and that you can retrieve the policy data from the "),
                    createVNode("a", {
                      href: unref(insuranceDataSharingTppArea).sandboxEvidenceHref
                    }, "AlTareq Model Insurer", 8, ["href"]),
                    createTextVNode(" sandbox. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "note",
              title: "Premium sharing is certified separately"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c0158691${_scopeId2}> This area certifies policy retrieval (<code data-v-c0158691${_scopeId2}>ReadInsurancePolicies</code>). Consuming the encrypted <code data-v-c0158691${_scopeId2}>Premium</code> field — a JWE gated by <code data-v-c0158691${_scopeId2}>ReadInsurancePremium</code> — has its own certification and is out of scope here. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" This area certifies policy retrieval ("),
                      createVNode("code", null, "ReadInsurancePolicies"),
                      createTextVNode("). Consuming the encrypted "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" field — a JWE gated by "),
                      createVNode("code", null, "ReadInsurancePremium"),
                      createTextVNode(" — has its own certification and is out of scope here. ")
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
                  createTextVNode(" Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Insurance Data Sharing, it demonstrates that your consent requests only the permissions your proposition uses, that those permissions align to the endpoints you consume, and that you can retrieve the policy data from the "),
                  createVNode("a", {
                    href: unref(insuranceDataSharingTppArea).sandboxEvidenceHref
                  }, "AlTareq Model Insurer", 8, ["href"]),
                  createTextVNode(" sandbox. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "note",
                title: "Premium sharing is certified separately"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" This area certifies policy retrieval ("),
                    createVNode("code", null, "ReadInsurancePolicies"),
                    createTextVNode("). Consuming the encrypted "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" field — a JWE gated by "),
                    createVNode("code", null, "ReadInsurancePremium"),
                    createTextVNode(" — has its own certification and is out of scope here. ")
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
                  _push3(` The portal covers the ${ssrInterpolate(unref(consumableCount))} Insurance Data Sharing endpoints available to TPPs — a policy-collection and a policy-by-id endpoint per sector. Have the following ready: `);
                } else {
                  return [
                    createTextVNode(" The portal covers the " + toDisplayString(unref(consumableCount)) + " Insurance Data Sharing endpoints available to TPPs — a policy-collection and a policy-by-id endpoint per sector. Have the following ready: ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c0158691${_scopeId2}><strong data-v-c0158691${_scopeId2}>Use case</strong> — a sentence or two on why you consume this data (for example, aggregating a customer’s motor and health policies to power a coverage-comparison product). </li><li data-v-c0158691${_scopeId2}><strong data-v-c0158691${_scopeId2}>Your consent (RAR object)</strong> — the <code data-v-c0158691${_scopeId2}>authorization_details</code> object you send at <code data-v-c0158691${_scopeId2}>/par</code>, and confirmation that its per-sector permissions align to the endpoints you consume. </li><li data-v-c0158691${_scopeId2}><strong data-v-c0158691${_scopeId2}>Postman evidence</strong> — for each endpoint you consume, a screenshot showing you retrieved that policy data from the sandbox Model Insurer. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Use case"),
                      createTextVNode(" — a sentence or two on why you consume this data (for example, aggregating a customer’s motor and health policies to power a coverage-comparison product). ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Your consent (RAR object)"),
                      createTextVNode(" — the "),
                      createVNode("code", null, "authorization_details"),
                      createTextVNode(" object you send at "),
                      createVNode("code", null, "/par"),
                      createTextVNode(", and confirmation that its per-sector permissions align to the endpoints you consume. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Postman evidence"),
                      createTextVNode(" — for each endpoint you consume, a screenshot showing you retrieved that policy data from the sandbox Model Insurer. ")
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
                  _push3(`<p data-v-c0158691${_scopeId2}> Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed correctly. </p>`);
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
                  createTextVNode(" The portal covers the " + toDisplayString(unref(consumableCount)) + " Insurance Data Sharing endpoints available to TPPs — a policy-collection and a policy-by-id endpoint per sector. Have the following ready: ", 1)
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Use case"),
                    createTextVNode(" — a sentence or two on why you consume this data (for example, aggregating a customer’s motor and health policies to power a coverage-comparison product). ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Your consent (RAR object)"),
                    createTextVNode(" — the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" object you send at "),
                    createVNode("code", null, "/par"),
                    createTextVNode(", and confirmation that its per-sector permissions align to the endpoints you consume. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Postman evidence"),
                    createTextVNode(" — for each endpoint you consume, a screenshot showing you retrieved that policy data from the sandbox Model Insurer. ")
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
                  _push3(` When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP to a Service Desk ticket with the Certification Type <strong data-v-c0158691${_scopeId2}>“${ssrInterpolate(unref(insuranceDataSharingTppArea).certType)}”</strong>. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP to a Service Desk ticket with the Certification Type "),
                    createVNode("strong", null, "“" + toDisplayString(unref(insuranceDataSharingTppArea).certType) + "”", 1),
                    createTextVNode(". Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-c0158691${_scopeId}><a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/submission" data-v-c0158691${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-c0158691${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP to a Service Desk ticket with the Certification Type "),
                  createVNode("strong", null, "“" + toDisplayString(unref(insuranceDataSharingTppArea).certType) + "”", 1),
                  createTextVNode(". Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__cta" }, [
                createVNode("a", {
                  class: "ed-doc__cta-btn",
                  href: "/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/submission"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c0158691"]]);
export {
  index as default
};
