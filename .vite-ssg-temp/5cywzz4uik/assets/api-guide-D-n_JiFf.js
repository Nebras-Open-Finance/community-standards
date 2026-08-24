import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./APIFlowsConsentValidate-D0N0P3xI.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdBullets = __unplugin_components_5;
  const _component_APIFlowViewer = __unplugin_components_8;
  const _component_APIFlowsConsentValidate = _sfc_main$1;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_APIFlowsConsentEventLFI = _sfc_main$2;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-bf5af421><section class="ed-doc__hero" data-v-bf5af421><div class="ed-doc__inner" data-v-bf5af421><div class="ed-doc__eyebrow" data-v-bf5af421><span class="ed-doc__eyebrow-dash" data-v-bf5af421></span> LFI · Ozone Connect · Consent Events &amp; Actions · API Guide </div><h1 class="ed-doc__title" data-v-bf5af421> Consent Events &amp; Actions — API Guide <span class="ed-doc__read" data-v-bf5af421>3 min read</span></h1><p class="ed-doc__lede" data-v-bf5af421> This guide covers the implementation of the Consent Events &amp; Actions endpoints on your Ozone Connect server. These are endpoints <strong data-v-bf5af421>your LFI exposes</strong> and the <strong data-v-bf5af421>API Hub calls</strong>. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "prerequisites",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Prerequisites",
    title: "What must already be in place",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Before implementing these endpoints, ensure the following are in place: `);
            } else {
              return [
                createTextVNode(" Before implementing these endpoints, ensure the following are in place: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-bf5af421${_scopeId2}><strong data-v-bf5af421${_scopeId2}>API Hub onboarded</strong> — Your API Hub instance is provisioned and your <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" data-v-bf5af421${_scopeId2}>environment-specific configuration</a> is complete </li><li data-v-bf5af421${_scopeId2}><strong data-v-bf5af421${_scopeId2}>Ozone Connect base URL configured</strong> — The API Hub knows the base URL of your Ozone Connect server. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/ozone-connect-url" data-v-bf5af421${_scopeId2}>Ozone Connect Base URL</a></li><li data-v-bf5af421${_scopeId2}><strong data-v-bf5af421${_scopeId2}>Connectivity verified</strong> — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" data-v-bf5af421${_scopeId2}>Connectivity &amp; Certificates</a></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "API Hub onboarded"),
                  createTextVNode(" — Your API Hub instance is provisioned and your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                  createTextVNode(" is complete ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Ozone Connect base URL configured"),
                  createTextVNode(" — The API Hub knows the base URL of your Ozone Connect server. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/ozone-connect-url" }, "Ozone Connect Base URL")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Connectivity verified"),
                  createTextVNode(" — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" }, "Connectivity & Certificates")
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
              createTextVNode(" Before implementing these endpoints, ensure the following are in place: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "API Hub onboarded"),
                createTextVNode(" — Your API Hub instance is provisioned and your "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "environment-specific configuration"),
                createTextVNode(" is complete ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Ozone Connect base URL configured"),
                createTextVNode(" — The API Hub knows the base URL of your Ozone Connect server. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/ozone-connect-url" }, "Ozone Connect Base URL")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Connectivity verified"),
                createTextVNode(" — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/" }, "Connectivity & Certificates")
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
    id: "validate",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Validate",
    title: "POST /consent/action/validate",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-bf5af421${_scopeId}>API Sequence Flow</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The API Hub calls this endpoint during consent creation, <strong data-v-bf5af421${_scopeId2}>before</strong> the consent is stored. The trigger is a TPP submitting a <span class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--post" data-v-bf5af421${_scopeId2}>POST</span><code data-v-bf5af421${_scopeId2}>/par</code></span> request to the API Hub. `);
            } else {
              return [
                createTextVNode(" The API Hub calls this endpoint during consent creation, "),
                createVNode("strong", null, "before"),
                createTextVNode(" the consent is stored. The trigger is a TPP submitting a "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/par")
                ]),
                createTextVNode(" request to the API Hub. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Consent Validation Flow" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_APIFlowsConsentValidate, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_APIFlowsConsentValidate)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-bf5af421${_scopeId}>What to validate</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Your LFI SHOULD validate that the consent is one you can support. At a high level, typical checks include: `);
            } else {
              return [
                createTextVNode(" Your LFI SHOULD validate that the consent is one you can support. At a high level, typical checks include: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-bf5af421${_scopeId2}>Does the consent version match what your LFI supports?</li><li data-v-bf5af421${_scopeId2}>Are the requested permissions within the scope of what your LFI offers?</li>`);
            } else {
              return [
                createVNode("li", null, "Does the consent version match what your LFI supports?"),
                createVNode("li", null, "Are the requested permissions within the scope of what your LFI offers?")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Each consent type defines its own specific validation rules in its <strong data-v-bf5af421${_scopeId2}>Requirements</strong> page (e.g. <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements" data-v-bf5af421${_scopeId2}>Bank Data Sharing — Requirements</a>). Refer to the Requirements page for each consent type your LFI supports to understand the full set of validation checks you MUST implement. `);
            } else {
              return [
                createTextVNode(" Each consent type defines its own specific validation rules in its "),
                createVNode("strong", null, "Requirements"),
                createTextVNode(" page (e.g. "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements" }, "Bank Data Sharing — Requirements"),
                createTextVNode("). Refer to the Requirements page for each consent type your LFI supports to understand the full set of validation checks you MUST implement. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-bf5af421${_scopeId}>Response schema</h3>`);
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-bf5af421${_scopeId2}><thead data-v-bf5af421${_scopeId2}><tr data-v-bf5af421${_scopeId2}><th data-v-bf5af421${_scopeId2}>Field</th><th data-v-bf5af421${_scopeId2}>Type</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-bf5af421${_scopeId2}>Required</th><th data-v-bf5af421${_scopeId2}>Description</th></tr></thead><tbody data-v-bf5af421${_scopeId2}><tr data-v-bf5af421${_scopeId2}><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>data.status</code></td><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>string</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-bf5af421${_scopeId2}>Yes</td><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>valid</code> or <code data-v-bf5af421${_scopeId2}>invalid</code></td></tr><tr data-v-bf5af421${_scopeId2}><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>data.code</code></td><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>string</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-bf5af421${_scopeId2}>No</td><td data-v-bf5af421${_scopeId2}>An error code — returned when status is <code data-v-bf5af421${_scopeId2}>invalid</code></td></tr><tr data-v-bf5af421${_scopeId2}><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>data.description</code></td><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>string</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-bf5af421${_scopeId2}>No</td><td data-v-bf5af421${_scopeId2}>A human-readable description of why the consent was rejected</td></tr><tr data-v-bf5af421${_scopeId2}><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>meta</code></td><td data-v-bf5af421${_scopeId2}><code data-v-bf5af421${_scopeId2}>object</code></td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-bf5af421${_scopeId2}>Yes</td><td data-v-bf5af421${_scopeId2}>Empty object <code data-v-bf5af421${_scopeId2}>{}</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Field"),
                      createVNode("th", null, "Type"),
                      createVNode("th", { style: { "text-align": "center" } }, "Required"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "data.status")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "string")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, [
                        createVNode("code", null, "valid"),
                        createTextVNode(" or "),
                        createVNode("code", null, "invalid")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "data.code")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "string")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "No"),
                      createVNode("td", null, [
                        createTextVNode("An error code — returned when status is "),
                        createVNode("code", null, "invalid")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "data.description")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "string")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "No"),
                      createVNode("td", null, "A human-readable description of why the consent was rejected")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "meta")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "object")
                      ]),
                      createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                      createVNode("td", null, [
                        createTextVNode("Empty object "),
                        createVNode("code", null, "{}")
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
              _push3(` See the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" data-v-bf5af421${_scopeId2}><span class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--post" data-v-bf5af421${_scopeId2}>POST</span><code data-v-bf5af421${_scopeId2}>/consent/action/validate</code></span> API Reference</a> for the full request and response schemas. `);
            } else {
              return [
                createTextVNode(" See the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" }, [
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" API Reference")
                ]),
                createTextVNode(" for the full request and response schemas. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "API Sequence Flow"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The API Hub calls this endpoint during consent creation, "),
              createVNode("strong", null, "before"),
              createTextVNode(" the consent is stored. The trigger is a TPP submitting a "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/par")
              ]),
              createTextVNode(" request to the API Hub. ")
            ]),
            _: 1
          }),
          createVNode(_component_APIFlowViewer, { title: "Consent Validation Flow" }, {
            default: withCtx(() => [
              createVNode(_component_APIFlowsConsentValidate)
            ]),
            _: 1
          }),
          createVNode("h3", null, "What to validate"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Your LFI SHOULD validate that the consent is one you can support. At a high level, typical checks include: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Does the consent version match what your LFI supports?"),
              createVNode("li", null, "Are the requested permissions within the scope of what your LFI offers?")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Each consent type defines its own specific validation rules in its "),
              createVNode("strong", null, "Requirements"),
              createTextVNode(" page (e.g. "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements" }, "Bank Data Sharing — Requirements"),
              createTextVNode("). Refer to the Requirements page for each consent type your LFI supports to understand the full set of validation checks you MUST implement. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Response schema"),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Field"),
                    createVNode("th", null, "Type"),
                    createVNode("th", { style: { "text-align": "center" } }, "Required"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "data.status")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "string")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, [
                      createVNode("code", null, "valid"),
                      createTextVNode(" or "),
                      createVNode("code", null, "invalid")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "data.code")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "string")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "No"),
                    createVNode("td", null, [
                      createTextVNode("An error code — returned when status is "),
                      createVNode("code", null, "invalid")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "data.description")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "string")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "No"),
                    createVNode("td", null, "A human-readable description of why the consent was rejected")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "meta")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "object")
                    ]),
                    createVNode("td", { style: { "text-align": "center" } }, "Yes"),
                    createVNode("td", null, [
                      createTextVNode("Empty object "),
                      createVNode("code", null, "{}")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See the "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" }, [
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" API Reference")
              ]),
              createTextVNode(" for the full request and response schemas. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "consent-events",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Consent events",
    title: "POST /consent/event/{operation}",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-bf5af421${_scopeId}>API Sequence Flow</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The API Hub calls this endpoint to notify your LFI of consent lifecycle changes: `);
            } else {
              return [
                createTextVNode(" The API Hub calls this endpoint to notify your LFI of consent lifecycle changes: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-bf5af421${_scopeId2}><thead data-v-bf5af421${_scopeId2}><tr data-v-bf5af421${_scopeId2}><th data-v-bf5af421${_scopeId2}>Operation</th><th data-v-bf5af421${_scopeId2}>Trigger</th></tr></thead><tbody data-v-bf5af421${_scopeId2}><tr data-v-bf5af421${_scopeId2}><td data-v-bf5af421${_scopeId2}><span class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--post" data-v-bf5af421${_scopeId2}>POST</span><code data-v-bf5af421${_scopeId2}>/consent/event/post</code></span></td><td data-v-bf5af421${_scopeId2}>A consent has been <strong data-v-bf5af421${_scopeId2}>created</strong> — i.e. after <span class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--post" data-v-bf5af421${_scopeId2}>POST</span><code data-v-bf5af421${_scopeId2}>/par</code></span> succeeds (and after validation, if configured)</td></tr><tr data-v-bf5af421${_scopeId2}><td data-v-bf5af421${_scopeId2}><span class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--post" data-v-bf5af421${_scopeId2}>POST</span><code data-v-bf5af421${_scopeId2}>/consent/event/patch</code></span></td><td data-v-bf5af421${_scopeId2}>A consent has been <strong data-v-bf5af421${_scopeId2}>updated</strong> — e.g. status changed to <code data-v-bf5af421${_scopeId2}>Authorized</code>, <code data-v-bf5af421${_scopeId2}>Rejected</code>, <code data-v-bf5af421${_scopeId2}>Revoked</code>, or <code data-v-bf5af421${_scopeId2}>Expired</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Operation"),
                      createVNode("th", null, "Trigger")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consent/event/post")
                        ])
                      ]),
                      createVNode("td", null, [
                        createTextVNode("A consent has been "),
                        createVNode("strong", null, "created"),
                        createTextVNode(" — i.e. after "),
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/par")
                        ]),
                        createTextVNode(" succeeds (and after validation, if configured)")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consent/event/patch")
                        ])
                      ]),
                      createVNode("td", null, [
                        createTextVNode("A consent has been "),
                        createVNode("strong", null, "updated"),
                        createTextVNode(" — e.g. status changed to "),
                        createVNode("code", null, "Authorized"),
                        createTextVNode(", "),
                        createVNode("code", null, "Rejected"),
                        createTextVNode(", "),
                        createVNode("code", null, "Revoked"),
                        createTextVNode(", or "),
                        createVNode("code", null, "Expired")
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Consent Event Flow" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_APIFlowsConsentEventLFI, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_APIFlowsConsentEventLFI)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-bf5af421${_scopeId}>What to do with the event</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If your LFI stores consents locally, use these events to keep your local state in sync with the API Hub: `);
            } else {
              return [
                createTextVNode(" If your LFI stores consents locally, use these events to keep your local state in sync with the API Hub: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-bf5af421${_scopeId2}><strong data-v-bf5af421${_scopeId2}>On <code data-v-bf5af421${_scopeId2}>post</code></strong> — Store the new consent in your local system</li><li data-v-bf5af421${_scopeId2}><strong data-v-bf5af421${_scopeId2}>On <code data-v-bf5af421${_scopeId2}>patch</code></strong> — Update your local consent record to reflect the latest state</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, [
                    createTextVNode("On "),
                    createVNode("code", null, "post")
                  ]),
                  createTextVNode(" — Store the new consent in your local system")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, [
                    createTextVNode("On "),
                    createVNode("code", null, "patch")
                  ]),
                  createTextVNode(" — Update your local consent record to reflect the latest state")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The request body contains the <strong data-v-bf5af421${_scopeId2}>full consent object</strong> as stored in the API Hub&#39;s Consent Manager — not a diff. Your LFI can replace its local record entirely with the received payload. `);
            } else {
              return [
                createTextVNode(" The request body contains the "),
                createVNode("strong", null, "full consent object"),
                createTextVNode(" as stored in the API Hub's Consent Manager — not a diff. Your LFI can replace its local record entirely with the received payload. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Source of truth"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-bf5af421${_scopeId2}> The API Hub is the <strong data-v-bf5af421${_scopeId2}>single source of truth</strong> for consent state. Your local copy is a convenience cache. If there is ever a discrepancy, the Hub&#39;s state takes precedence. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" The API Hub is the "),
                  createVNode("strong", null, "single source of truth"),
                  createTextVNode(" for consent state. Your local copy is a convenience cache. If there is ever a discrepancy, the Hub's state takes precedence. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-bf5af421${_scopeId}>Response</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Your LFI MUST return <code data-v-bf5af421${_scopeId2}>204 No Content</code> to acknowledge receipt.`);
            } else {
              return [
                createTextVNode("Your LFI MUST return "),
                createVNode("code", null, "204 No Content"),
                createTextVNode(" to acknowledge receipt.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "No retry, no rollback"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-bf5af421${_scopeId2}> If your endpoint returns an error (e.g. <code data-v-bf5af421${_scopeId2}>400</code> or <code data-v-bf5af421${_scopeId2}>500</code>), the API Hub will <strong data-v-bf5af421${_scopeId2}>not</strong> retry the notification and will <strong data-v-bf5af421${_scopeId2}>not</strong> roll back the consent change. The consent state in the Hub proceeds regardless. </p><p data-v-bf5af421${_scopeId2}> Because the Hub is the source of truth and your local copy is a cache, any missed event can be reconciled by reading from the Consent Manager: </p><ul data-v-bf5af421${_scopeId2}><li data-v-bf5af421${_scopeId2}><strong data-v-bf5af421${_scopeId2}>Handler received the payload but failed to process it</strong> — you have the <code data-v-bf5af421${_scopeId2}>consentId</code>, so call <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--get" data-v-bf5af421${_scopeId2}>GET</span><code data-v-bf5af421${_scopeId2}>/consents/{consentId}</code></a> to fetch the latest state. </li><li data-v-bf5af421${_scopeId2}><strong data-v-bf5af421${_scopeId2}>Your system was offline and never received the event</strong> — reconcile lazily at end user login by calling <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents" class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--get" data-v-bf5af421${_scopeId2}>GET</span><code data-v-bf5af421${_scopeId2}>/psu/{userId}/consents</code></a> before rendering the CMI. </li></ul><p data-v-bf5af421${_scopeId2}> LFIs that do not maintain a local consent cache do not need to reconcile — read from the Consent Manager on demand. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" If your endpoint returns an error (e.g. "),
                  createVNode("code", null, "400"),
                  createTextVNode(" or "),
                  createVNode("code", null, "500"),
                  createTextVNode("), the API Hub will "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" retry the notification and will "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" roll back the consent change. The consent state in the Hub proceeds regardless. ")
                ]),
                createVNode("p", null, " Because the Hub is the source of truth and your local copy is a cache, any missed event can be reconciled by reading from the Consent Manager: "),
                createVNode("ul", null, [
                  createVNode("li", null, [
                    createVNode("strong", null, "Handler received the payload but failed to process it"),
                    createTextVNode(" — you have the "),
                    createVNode("code", null, "consentId"),
                    createTextVNode(", so call "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/consents/{consentId}")
                    ]),
                    createTextVNode(" to fetch the latest state. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Your system was offline and never received the event"),
                    createTextVNode(" — reconcile lazily at end user login by calling "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/psu/{userId}/consents")
                    ]),
                    createTextVNode(" before rendering the CMI. ")
                  ])
                ]),
                createVNode("p", null, " LFIs that do not maintain a local consent cache do not need to reconcile — read from the Consent Manager on demand. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "API Sequence Flow"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The API Hub calls this endpoint to notify your LFI of consent lifecycle changes: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Operation"),
                    createVNode("th", null, "Trigger")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent/event/post")
                      ])
                    ]),
                    createVNode("td", null, [
                      createTextVNode("A consent has been "),
                      createVNode("strong", null, "created"),
                      createTextVNode(" — i.e. after "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ]),
                      createTextVNode(" succeeds (and after validation, if configured)")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent/event/patch")
                      ])
                    ]),
                    createVNode("td", null, [
                      createTextVNode("A consent has been "),
                      createVNode("strong", null, "updated"),
                      createTextVNode(" — e.g. status changed to "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(", "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(", "),
                      createVNode("code", null, "Revoked"),
                      createTextVNode(", or "),
                      createVNode("code", null, "Expired")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_APIFlowViewer, { title: "Consent Event Flow" }, {
            default: withCtx(() => [
              createVNode(_component_APIFlowsConsentEventLFI)
            ]),
            _: 1
          }),
          createVNode("h3", null, "What to do with the event"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If your LFI stores consents locally, use these events to keep your local state in sync with the API Hub: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, [
                  createTextVNode("On "),
                  createVNode("code", null, "post")
                ]),
                createTextVNode(" — Store the new consent in your local system")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, [
                  createTextVNode("On "),
                  createVNode("code", null, "patch")
                ]),
                createTextVNode(" — Update your local consent record to reflect the latest state")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The request body contains the "),
              createVNode("strong", null, "full consent object"),
              createTextVNode(" as stored in the API Hub's Consent Manager — not a diff. Your LFI can replace its local record entirely with the received payload. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Source of truth"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" The API Hub is the "),
                createVNode("strong", null, "single source of truth"),
                createTextVNode(" for consent state. Your local copy is a convenience cache. If there is ever a discrepancy, the Hub's state takes precedence. ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Response"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Your LFI MUST return "),
              createVNode("code", null, "204 No Content"),
              createTextVNode(" to acknowledge receipt.")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "No retry, no rollback"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" If your endpoint returns an error (e.g. "),
                createVNode("code", null, "400"),
                createTextVNode(" or "),
                createVNode("code", null, "500"),
                createTextVNode("), the API Hub will "),
                createVNode("strong", null, "not"),
                createTextVNode(" retry the notification and will "),
                createVNode("strong", null, "not"),
                createTextVNode(" roll back the consent change. The consent state in the Hub proceeds regardless. ")
              ]),
              createVNode("p", null, " Because the Hub is the source of truth and your local copy is a cache, any missed event can be reconciled by reading from the Consent Manager: "),
              createVNode("ul", null, [
                createVNode("li", null, [
                  createVNode("strong", null, "Handler received the payload but failed to process it"),
                  createTextVNode(" — you have the "),
                  createVNode("code", null, "consentId"),
                  createTextVNode(", so call "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/consents/{consentId}")
                  ]),
                  createTextVNode(" to fetch the latest state. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Your system was offline and never received the event"),
                  createTextVNode(" — reconcile lazily at end user login by calling "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/psu/{userId}/consents")
                  ]),
                  createTextVNode(" before rendering the CMI. ")
                ])
              ]),
              createVNode("p", null, " LFIs that do not maintain a local consent cache do not need to reconcile — read from the Consent Manager on demand. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "api-reference",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "API Reference",
    title: "Full request and response schemas",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-bf5af421${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--post" data-v-bf5af421${_scopeId2}>POST</span><code data-v-bf5af421${_scopeId2}>/consent/action/validate</code></a> — Full request and response schema</li><li data-v-bf5af421${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/event-op" class="endpoint" data-v-bf5af421${_scopeId2}><span class="http-method http-method--post" data-v-bf5af421${_scopeId2}>POST</span><code data-v-bf5af421${_scopeId2}>/consent/event/{operation}</code></a> — Full request and response schema</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" — Full request and response schema")
                ]),
                createVNode("li", null, [
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/event-op",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/event/{operation}")
                  ]),
                  createTextVNode(" — Full request and response schema")
                ])
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
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" — Full request and response schema")
              ]),
              createVNode("li", null, [
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/event-op",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/event/{operation}")
                ]),
                createTextVNode(" — Full request and response schema")
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-bf5af421"]]);
export {
  apiGuide as default
};
