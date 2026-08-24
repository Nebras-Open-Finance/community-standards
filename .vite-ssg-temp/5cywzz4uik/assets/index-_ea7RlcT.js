import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { b as bankDataSharingTppArea } from "./bank-data-sharing-tpp-CPzNmsup.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "./bank-data-sharing-BzvFCI2T.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const consumableCount = bankDataSharingTppArea.endpoints.filter((e) => e.tppPath).length;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-1c20446b><section class="ed-doc__hero" data-v-1c20446b><div class="ed-doc__inner" data-v-1c20446b><div class="ed-doc__eyebrow" data-v-1c20446b><span class="ed-doc__eyebrow-dash" data-v-1c20446b></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-1c20446b> Functional Certification — Bank Data Sharing <span class="ed-doc__read" data-v-1c20446b>3 min read</span></h1><p class="ed-doc__lede" data-v-1c20446b> Functional Certification proves that your proposition consumes Bank Data Sharing correctly: you request only the permissions your endpoints need, and you can retrieve that data from the AlTareq Model Bank. This page explains what evidence to gather; the portal then builds your submission for you. </p><div class="ed-doc__cta" data-v-1c20446b><a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing/submission" data-v-1c20446b> Start your submission <span class="ed-doc__cta-arrow" data-v-1c20446b>↗</span></a></div></div></section>`);
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
                  _push3(` Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Bank Data Sharing, it demonstrates that your consent requests only the permissions your proposition uses, that those permissions align to the endpoints you consume, and that you can retrieve the data from the <a${ssrRenderAttr("href", unref(bankDataSharingTppArea).sandboxEvidenceHref)} data-v-1c20446b${_scopeId2}>AlTareq Model Bank</a> sandbox. `);
                } else {
                  return [
                    createTextVNode(" Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Bank Data Sharing, it demonstrates that your consent requests only the permissions your proposition uses, that those permissions align to the endpoints you consume, and that you can retrieve the data from the "),
                    createVNode("a", {
                      href: unref(bankDataSharingTppArea).sandboxEvidenceHref
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
                  createTextVNode(" Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Bank Data Sharing, it demonstrates that your consent requests only the permissions your proposition uses, that those permissions align to the endpoints you consume, and that you can retrieve the data from the "),
                  createVNode("a", {
                    href: unref(bankDataSharingTppArea).sandboxEvidenceHref
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
                  _push3(` The portal covers the ${ssrInterpolate(unref(consumableCount))} Bank Data Sharing endpoints available to TPPs. Have the following ready: `);
                } else {
                  return [
                    createTextVNode(" The portal covers the " + toDisplayString(unref(consumableCount)) + " Bank Data Sharing endpoints available to TPPs. Have the following ready: ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-1c20446b${_scopeId2}><strong data-v-1c20446b${_scopeId2}>Use case</strong> — a sentence or two on why you consume this data (for example, powering a retail PFM product with the customer’s balances and transactions). </li><li data-v-1c20446b${_scopeId2}><strong data-v-1c20446b${_scopeId2}>Your consent (RAR object)</strong> — the <code data-v-1c20446b${_scopeId2}>authorization_details</code> object you send at <code data-v-1c20446b${_scopeId2}>/par</code>, and confirmation that its permissions align to the endpoints you consume. </li><li data-v-1c20446b${_scopeId2}><strong data-v-1c20446b${_scopeId2}>Postman evidence</strong> — for each endpoint you consume, a screenshot showing you retrieved that data from the sandbox Model Bank. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Use case"),
                      createTextVNode(" — a sentence or two on why you consume this data (for example, powering a retail PFM product with the customer’s balances and transactions). ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Your consent (RAR object)"),
                      createTextVNode(" — the "),
                      createVNode("code", null, "authorization_details"),
                      createTextVNode(" object you send at "),
                      createVNode("code", null, "/par"),
                      createTextVNode(", and confirmation that its permissions align to the endpoints you consume. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Postman evidence"),
                      createTextVNode(" — for each endpoint you consume, a screenshot showing you retrieved that data from the sandbox Model Bank. ")
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
                  _push3(`<p data-v-1c20446b${_scopeId2}> Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed correctly. </p>`);
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
                  createTextVNode(" The portal covers the " + toDisplayString(unref(consumableCount)) + " Bank Data Sharing endpoints available to TPPs. Have the following ready: ", 1)
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Use case"),
                    createTextVNode(" — a sentence or two on why you consume this data (for example, powering a retail PFM product with the customer’s balances and transactions). ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Your consent (RAR object)"),
                    createTextVNode(" — the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" object you send at "),
                    createVNode("code", null, "/par"),
                    createTextVNode(", and confirmation that its permissions align to the endpoints you consume. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Postman evidence"),
                    createTextVNode(" — for each endpoint you consume, a screenshot showing you retrieved that data from the sandbox Model Bank. ")
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
                  _push3(` When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP to a Service Desk ticket with the Certification Type <strong data-v-1c20446b${_scopeId2}>“${ssrInterpolate(unref(bankDataSharingTppArea).certType)}”</strong>. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP to a Service Desk ticket with the Certification Type "),
                    createVNode("strong", null, "“" + toDisplayString(unref(bankDataSharingTppArea).certType) + "”", 1),
                    createTextVNode(". Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-1c20446b${_scopeId}><a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing/submission" data-v-1c20446b${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-1c20446b${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP to a Service Desk ticket with the Certification Type "),
                  createVNode("strong", null, "“" + toDisplayString(unref(bankDataSharingTppArea).certType) + "”", 1),
                  createTextVNode(". Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__cta" }, [
                createVNode("a", {
                  class: "ed-doc__cta-btn",
                  href: "/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing/submission"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c20446b"]]);
export {
  index as default
};
