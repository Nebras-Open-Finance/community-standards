import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as _sfc_main$1 } from "./APIFlowsRefunds-ILpIjHAl.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const exampleResponse = `{
  "data": {
    "consentId": "con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c",
    "refundAccount": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456",
      "name": {
        "en": "Ibrahim Al Suwaidi"
      }
    }
  },
  "meta": {}
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsRefunds = _sfc_main$1;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-c2f4b467><section class="ed-doc__hero" data-v-c2f4b467><div class="ed-doc__inner" data-v-c2f4b467><div class="ed-doc__eyebrow" data-v-c2f4b467><span class="ed-doc__eyebrow-dash" data-v-c2f4b467></span> LFI · Banking · Service Initiation · Refunds </div><h1 class="ed-doc__title" data-v-c2f4b467> Payment Refunds — API Guide <span class="ed-doc__read" data-v-c2f4b467>2 min read</span></h1><p class="ed-doc__lede" data-v-c2f4b467> The Payment Refunds endpoint lets the API Hub retrieve the debtor&#39;s payment account details from your LFI after a payment has been made. The TPP uses those details to initiate a refund back to the original payer. This endpoint does <strong data-v-c2f4b467>not</strong> execute the refund itself — it only returns the account details needed to initiate one. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "sequence-flow",
        num: "01",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end refund account retrieval",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Payment Refunds API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsRefunds, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsRefunds)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Payment Refunds API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsRefunds)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-refund",
        num: "02",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "GET /payment-consents/{consentId}/refund",
        title: "Return the debtor's refund account",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-c2f4b467${_scopeId}><span class="http-badge http-get" data-v-c2f4b467${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-c2f4b467${_scopeId}>/payment-consents/{consentId}/refund</code></div><h3 class="ed-doc__subhead" data-v-c2f4b467${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c2f4b467${_scopeId2}><thead data-v-c2f4b467${_scopeId2}><tr data-v-c2f4b467${_scopeId2}><th data-v-c2f4b467${_scopeId2}>Header</th><th data-v-c2f4b467${_scopeId2}>Required</th><th data-v-c2f4b467${_scopeId2}>Description</th></tr></thead><tbody data-v-c2f4b467${_scopeId2}><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-provider-id</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>Identifier for your LFI registered in the Hub</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-aspsp-id</code></td><td data-v-c2f4b467${_scopeId2}>Yes <em data-v-c2f4b467${_scopeId2}>(deprecated)</em></td><td data-v-c2f4b467${_scopeId2}>Deprecated alias for <code data-v-c2f4b467${_scopeId2}>o3-provider-id</code>. Will be removed in a future version — use <code data-v-c2f4b467${_scopeId2}>o3-provider-id</code></td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-caller-org-id</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>Organisation ID of the TPP making the underlying request</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-caller-client-id</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>OIDC client ID of the TPP application</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-caller-software-statement-id</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>Software statement ID of the TPP application</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-api-uri</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>The parameterised URL of the API being called by the TPP</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-api-operation</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>The HTTP method of the operation carried out by the TPP (e.g. <code data-v-c2f4b467${_scopeId2}>GET</code>)</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-ozone-interaction-id</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>Hub-generated interaction ID. Equals <code data-v-c2f4b467${_scopeId2}>o3-caller-interaction-id</code> if the TPP provided one</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-caller-interaction-id</code></td><td data-v-c2f4b467${_scopeId2}>No</td><td data-v-c2f4b467${_scopeId2}>Interaction ID passed in by the TPP, if present</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>o3-psu-identifier</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>Base64-encoded representation of the customer identifier JSON object</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Header"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-provider-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Identifier for your LFI registered in the Hub")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-aspsp-id")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Yes "),
                            createVNode("em", null, "(deprecated)")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Deprecated alias for "),
                            createVNode("code", null, "o3-provider-id"),
                            createTextVNode(". Will be removed in a future version — use "),
                            createVNode("code", null, "o3-provider-id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-org-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Organisation ID of the TPP making the underlying request")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-client-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "OIDC client ID of the TPP application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-software-statement-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Software statement ID of the TPP application")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-api-uri")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The parameterised URL of the API being called by the TPP")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-api-operation")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The HTTP method of the operation carried out by the TPP (e.g. "),
                            createVNode("code", null, "GET"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-ozone-interaction-id")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Hub-generated interaction ID. Equals "),
                            createVNode("code", null, "o3-caller-interaction-id"),
                            createTextVNode(" if the TPP provided one")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-caller-interaction-id")
                          ]),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Interaction ID passed in by the TPP, if present")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "o3-psu-identifier")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Base64-encoded representation of the customer identifier JSON object")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c2f4b467${_scopeId}>Path parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c2f4b467${_scopeId2}><thead data-v-c2f4b467${_scopeId2}><tr data-v-c2f4b467${_scopeId2}><th data-v-c2f4b467${_scopeId2}>Parameter</th><th data-v-c2f4b467${_scopeId2}>Required</th><th data-v-c2f4b467${_scopeId2}>Description</th></tr></thead><tbody data-v-c2f4b467${_scopeId2}><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>consentId</code></td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>The consent ID of the original payment consent</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "consentId")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The consent ID of the original payment consent")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-c2f4b467${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-c2f4b467${_scopeId2}>Content-Type: application/json</code>`);
                } else {
                  return [
                    createVNode("code", null, "Content-Type: application/json")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return <code data-v-c2f4b467${_scopeId2}>200</code> with the debtor&#39;s refund account details. The Hub wraps the response in a signed JWS before returning it to the TPP — your LFI returns plain JSON. `);
                } else {
                  return [
                    createTextVNode(" Return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with the debtor's refund account details. The Hub wraps the response in a signed JWS before returning it to the TPP — your LFI returns plain JSON. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c2f4b467${_scopeId}><code data-v-c2f4b467${_scopeId}>200</code> — Refund account found</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return the debtor&#39;s account details under <code data-v-c2f4b467${_scopeId2}>data.refundAccount</code>. The <code data-v-c2f4b467${_scopeId2}>refundAccount</code> object is required and must contain the debtor&#39;s IBAN and name. `);
                } else {
                  return [
                    createTextVNode(" Return the debtor's account details under "),
                    createVNode("code", null, "data.refundAccount"),
                    createTextVNode(". The "),
                    createVNode("code", null, "refundAccount"),
                    createTextVNode(" object is required and must contain the debtor's IBAN and name. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleResponse,
              lang: "json",
              filename: "200 OK"
            }, null, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-c2f4b467${_scopeId}><code data-v-c2f4b467${_scopeId}>data.refundAccount</code></h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c2f4b467${_scopeId2}><thead data-v-c2f4b467${_scopeId2}><tr data-v-c2f4b467${_scopeId2}><th data-v-c2f4b467${_scopeId2}>Field</th><th data-v-c2f4b467${_scopeId2}>Type</th><th data-v-c2f4b467${_scopeId2}>Required</th><th data-v-c2f4b467${_scopeId2}>Description</th></tr></thead><tbody data-v-c2f4b467${_scopeId2}><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>schemeName</code></td><td data-v-c2f4b467${_scopeId2}>string</td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>Account identifier scheme — always <code data-v-c2f4b467${_scopeId2}>IBAN</code></td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>identification</code></td><td data-v-c2f4b467${_scopeId2}>string</td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>The debtor&#39;s IBAN</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>name</code></td><td data-v-c2f4b467${_scopeId2}>object</td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>The account holder name</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>name.en</code></td><td data-v-c2f4b467${_scopeId2}>string</td><td data-v-c2f4b467${_scopeId2}>Yes</td><td data-v-c2f4b467${_scopeId2}>Account holder name in English (max 70 characters)</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>name.ar</code></td><td data-v-c2f4b467${_scopeId2}>string</td><td data-v-c2f4b467${_scopeId2}>No</td><td data-v-c2f4b467${_scopeId2}>Account holder name in Arabic (max 70 characters)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "schemeName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Account identifier scheme — always "),
                            createVNode("code", null, "IBAN")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "identification")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The debtor's IBAN")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "name")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The account holder name")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "name.en")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Account holder name in English (max 70 characters)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "name.ar")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Account holder name in Arabic (max 70 characters)")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-c2f4b467${_scopeId}>Error responses</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`All error bodies must include <code data-v-c2f4b467${_scopeId2}>errorCode</code> and <code data-v-c2f4b467${_scopeId2}>errorMessage</code>.`);
                } else {
                  return [
                    createTextVNode("All error bodies must include "),
                    createVNode("code", null, "errorCode"),
                    createTextVNode(" and "),
                    createVNode("code", null, "errorMessage"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-c2f4b467${_scopeId}><code data-v-c2f4b467${_scopeId}>403</code> — Forbidden</h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c2f4b467${_scopeId2}><thead data-v-c2f4b467${_scopeId2}><tr data-v-c2f4b467${_scopeId2}><th data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>errorCode</code></th><th data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>errorMessage</code></th><th data-v-c2f4b467${_scopeId2}>When to use</th></tr></thead><tbody data-v-c2f4b467${_scopeId2}><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>Consent.AccountTemporarilyBlocked</code></td><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>The debtor account is blocked from receiving payments.</code></td><td data-v-c2f4b467${_scopeId2}>The account is blocked from receiving payments for a temporary reason — e.g. account status is <code data-v-c2f4b467${_scopeId2}>Suspended</code>, or the account is otherwise unable to receive a credit transaction refund on a transient basis</td></tr><tr data-v-c2f4b467${_scopeId2}><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>Consent.PermanentAccountAccessFailure</code></td><td data-v-c2f4b467${_scopeId2}><code data-v-c2f4b467${_scopeId2}>The debtor account is blocked from receiving payments.</code></td><td data-v-c2f4b467${_scopeId2}>The account is blocked from receiving payments permanently — e.g. account status is <code data-v-c2f4b467${_scopeId2}>Closed</code>, <code data-v-c2f4b467${_scopeId2}>Deceased</code>, or <code data-v-c2f4b467${_scopeId2}>Unclaimed</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, [
                            createVNode("code", null, "errorMessage")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.AccountTemporarilyBlocked")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "The debtor account is blocked from receiving payments.")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The account is blocked from receiving payments for a temporary reason — e.g. account status is "),
                            createVNode("code", null, "Suspended"),
                            createTextVNode(", or the account is otherwise unable to receive a credit transaction refund on a transient basis")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "The debtor account is blocked from receiving payments.")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The account is blocked from receiving payments permanently — e.g. account status is "),
                            createVNode("code", null, "Closed"),
                            createTextVNode(", "),
                            createVNode("code", null, "Deceased"),
                            createTextVNode(", or "),
                            createVNode("code", null, "Unclaimed")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/payment-consents/{consentId}/refund")
              ]),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request headers"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Header"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-provider-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Identifier for your LFI registered in the Hub")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-aspsp-id")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Yes "),
                          createVNode("em", null, "(deprecated)")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Deprecated alias for "),
                          createVNode("code", null, "o3-provider-id"),
                          createTextVNode(". Will be removed in a future version — use "),
                          createVNode("code", null, "o3-provider-id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-org-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Organisation ID of the TPP making the underlying request")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-client-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "OIDC client ID of the TPP application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-software-statement-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Software statement ID of the TPP application")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-api-uri")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The parameterised URL of the API being called by the TPP")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-api-operation")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The HTTP method of the operation carried out by the TPP (e.g. "),
                          createVNode("code", null, "GET"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-ozone-interaction-id")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Hub-generated interaction ID. Equals "),
                          createVNode("code", null, "o3-caller-interaction-id"),
                          createTextVNode(" if the TPP provided one")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-caller-interaction-id")
                        ]),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Interaction ID passed in by the TPP, if present")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "o3-psu-identifier")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Base64-encoded representation of the customer identifier JSON object")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Path parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "consentId")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The consent ID of the original payment consent")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Response"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with the debtor's refund account details. The Hub wraps the response in a signed JWS before returning it to the TPP — your LFI returns plain JSON. ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "200"),
                createTextVNode(" — Refund account found")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return the debtor's account details under "),
                  createVNode("code", null, "data.refundAccount"),
                  createTextVNode(". The "),
                  createVNode("code", null, "refundAccount"),
                  createTextVNode(" object is required and must contain the debtor's IBAN and name. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleResponse,
                lang: "json",
                filename: "200 OK"
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, [
                createVNode("code", null, "data.refundAccount")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "schemeName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Account identifier scheme — always "),
                          createVNode("code", null, "IBAN")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "identification")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The debtor's IBAN")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "name")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The account holder name")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "name.en")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Account holder name in English (max 70 characters)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "name.ar")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Account holder name in Arabic (max 70 characters)")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Error responses"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("All error bodies must include "),
                  createVNode("code", null, "errorCode"),
                  createTextVNode(" and "),
                  createVNode("code", null, "errorMessage"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, [
                createVNode("code", null, "403"),
                createTextVNode(" — Forbidden")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, [
                          createVNode("code", null, "errorMessage")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.AccountTemporarilyBlocked")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "The debtor account is blocked from receiving payments.")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The account is blocked from receiving payments for a temporary reason — e.g. account status is "),
                          createVNode("code", null, "Suspended"),
                          createTextVNode(", or the account is otherwise unable to receive a credit transaction refund on a transient basis")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "The debtor account is blocked from receiving payments.")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The account is blocked from receiving payments permanently — e.g. account status is "),
                          createVNode("code", null, "Closed"),
                          createTextVNode(", "),
                          createVNode("code", null, "Deceased"),
                          createTextVNode(", or "),
                          createVNode("code", null, "Unclaimed")
                        ])
                      ])
                    ])
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
        id: "api-reference",
        num: "03",
        color: "var(--at-teal)",
        eyebrow: "API Reference",
        title: "Full request and response schema",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See the <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" data-v-c2f4b467${_scopeId2}>GET <code data-v-c2f4b467${_scopeId2}>/payment-consents/{consentId}/refund</code> API Reference</a> for the full request and response schema. `);
                } else {
                  return [
                    createTextVNode(" See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" }, [
                      createTextVNode("GET "),
                      createVNode("code", null, "/payment-consents/{consentId}/refund"),
                      createTextVNode(" API Reference")
                    ]),
                    createTextVNode(" for the full request and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund" }, [
                    createTextVNode("GET "),
                    createVNode("code", null, "/payment-consents/{consentId}/refund"),
                    createTextVNode(" API Reference")
                  ]),
                  createTextVNode(" for the full request and response schema. ")
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c2f4b467"]]);
export {
  apiGuide as default
};
