import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { a as bankDataSharingArea } from "./bank-data-sharing-BzvFCI2T.js";
import { C as CURRENT_VERSION, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const endpointCount = bankDataSharingArea.endpoints.length;
    const sampleBaseUrl = bankDataSharingArea.tppBaseUrlTemplate.replace("{LFICODE}", "LFICODE").replace("{VERSION}", CURRENT_VERSION);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-bd4c0348><section class="ed-doc__hero" data-v-bd4c0348><div class="ed-doc__inner" data-v-bd4c0348><div class="ed-doc__eyebrow" data-v-bd4c0348><span class="ed-doc__eyebrow-dash" data-v-bd4c0348></span> Testing &amp; Certification · Functional Certification </div><h1 class="ed-doc__title" data-v-bd4c0348> Functional Certification — Bank Data Sharing <span class="ed-doc__read" data-v-bd4c0348>3 min read</span></h1><p class="ed-doc__lede" data-v-bd4c0348> Functional Certification proves that your Ozone Connect implementation of the Bank Data Sharing endpoints returns correct, complete data — endpoint by endpoint — and that the same data flows through the API Hub to a TPP. This page explains what the evidence is and how to produce it; the portal then builds your submission for you. </p><div class="ed-doc__cta" data-v-bd4c0348><a class="ed-doc__cta-btn" href="/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/submission" data-v-bd4c0348> Start your submission <span class="ed-doc__cta-arrow" data-v-bd4c0348>↗</span></a></div></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "What it is",
        title: "Evidence that your Ozone Connect endpoints work end to end",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Functional Certification is one of the certification areas an LFI must satisfy before publishing API resources to the production Trust Framework. For Bank Data Sharing, it demonstrates — endpoint by endpoint — that your Ozone Connect endpoints behave as the standard requires, and that the same data is correctly returned to a TPP through the API Hub resource server. All evidence must come from your own <strong data-v-bd4c0348${_scopeId2}>pre-production environment</strong>. `);
                } else {
                  return [
                    createTextVNode(" Functional Certification is one of the certification areas an LFI must satisfy before publishing API resources to the production Trust Framework. For Bank Data Sharing, it demonstrates — endpoint by endpoint — that your Ozone Connect endpoints behave as the standard requires, and that the same data is correctly returned to a TPP through the API Hub resource server. All evidence must come from your own "),
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
                  createTextVNode(" Functional Certification is one of the certification areas an LFI must satisfy before publishing API resources to the production Trust Framework. For Bank Data Sharing, it demonstrates — endpoint by endpoint — that your Ozone Connect endpoints behave as the standard requires, and that the same data is correctly returned to a TPP through the API Hub resource server. All evidence must come from your own "),
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
                  _push3(` The portal walks you through ${ssrInterpolate(unref(endpointCount))} Bank Data Sharing endpoints. For every endpoint your implementation exposes, have the following ready: `);
                } else {
                  return [
                    createTextVNode(" The portal walks you through " + toDisplayString(unref(endpointCount)) + " Bank Data Sharing endpoints. For every endpoint your implementation exposes, have the following ready: ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-bd4c0348${_scopeId2}><strong data-v-bd4c0348${_scopeId2}>Testing Tool output</strong> — the HTML report the Testing Tool produces for your Ozone Connect endpoint (e.g. <code data-v-bd4c0348${_scopeId2}>GET /accounts/{AccountId}/balances</code>). </li><li data-v-bd4c0348${_scopeId2}><strong data-v-bd4c0348${_scopeId2}>Outcome &amp; notes</strong> — whether every test passed, and where any failed or were skipped, a short explanation of why. </li><li data-v-bd4c0348${_scopeId2}><strong data-v-bd4c0348${_scopeId2}>Postman success screenshot</strong> — a screenshot from the Postman collection showing a successful response from the TPP-facing equivalent endpoint on the API Hub resource server (e.g. <code data-v-bd4c0348${_scopeId2}>${ssrInterpolate(unref(sampleBaseUrl))}/accounts</code>). </li><li data-v-bd4c0348${_scopeId2}><strong data-v-bd4c0348${_scopeId2}>Full JSON response</strong> — the complete JSON body returned by that same TPP-facing call. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Testing Tool output"),
                      createTextVNode(" — the HTML report the Testing Tool produces for your Ozone Connect endpoint (e.g. "),
                      createVNode("code", null, "GET /accounts/{AccountId}/balances"),
                      createTextVNode("). ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Outcome & notes"),
                      createTextVNode(" — whether every test passed, and where any failed or were skipped, a short explanation of why. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Postman success screenshot"),
                      createTextVNode(" — a screenshot from the Postman collection showing a successful response from the TPP-facing equivalent endpoint on the API Hub resource server (e.g. "),
                      createVNode("code", null, toDisplayString(unref(sampleBaseUrl)) + "/accounts", 1),
                      createTextVNode("). ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Full JSON response"),
                      createTextVNode(" — the complete JSON body returned by that same TPP-facing call. ")
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
                  _push3(`<p data-v-bd4c0348${_scopeId2}> Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. </p>`);
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
                  createTextVNode(" The portal walks you through " + toDisplayString(unref(endpointCount)) + " Bank Data Sharing endpoints. For every endpoint your implementation exposes, have the following ready: ", 1)
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Testing Tool output"),
                    createTextVNode(" — the HTML report the Testing Tool produces for your Ozone Connect endpoint (e.g. "),
                    createVNode("code", null, "GET /accounts/{AccountId}/balances"),
                    createTextVNode("). ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Outcome & notes"),
                    createTextVNode(" — whether every test passed, and where any failed or were skipped, a short explanation of why. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Postman success screenshot"),
                    createTextVNode(" — a screenshot from the Postman collection showing a successful response from the TPP-facing equivalent endpoint on the API Hub resource server (e.g. "),
                    createVNode("code", null, toDisplayString(unref(sampleBaseUrl)) + "/accounts", 1),
                    createTextVNode("). ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Full JSON response"),
                    createTextVNode(" — the complete JSON body returned by that same TPP-facing call. ")
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
                  _push3(` When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document and every file you uploaded, organised per endpoint. Attach that ZIP to a <a href="/support-service-desk" data-v-bd4c0348${_scopeId2}>Service Desk</a> certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. `);
                } else {
                  return [
                    createTextVNode(" When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document and every file you uploaded, organised per endpoint. Attach that ZIP to a "),
                    createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                    createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__cta" data-v-bd4c0348${_scopeId}><a class="ed-doc__cta-btn" href="/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/submission" data-v-bd4c0348${_scopeId}> Start your submission <span class="ed-doc__cta-arrow" data-v-bd4c0348${_scopeId}>↗</span></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document and every file you uploaded, organised per endpoint. Attach that ZIP to a "),
                  createVNode("a", { href: "/support-service-desk" }, "Service Desk"),
                  createTextVNode(" certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__cta" }, [
                createVNode("a", {
                  class: "ed-doc__cta-btn",
                  href: "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/submission"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd4c0348"]]);
export {
  index as default
};
