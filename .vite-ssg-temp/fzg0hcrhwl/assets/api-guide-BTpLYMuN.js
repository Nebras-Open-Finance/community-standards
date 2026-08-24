import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as _sfc_main$1 } from "./APIFlowsConfirmationOfPayee-Ccc7-ZyG.js";
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
const examplePersonalRequest = `{
  "data": {
    "account": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456",
      "name": {
        "fullName": "Ahmed Al Mansouri",
        "firstName": "Ahmed",
        "lastName": "Al Mansouri"
      }
    }
  }
}
`;
const exampleBusinessRequest = `{
  "data": {
    "account": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456",
      "name": {
        "businessName": "Al Mansouri Trading LLC"
      }
    }
  }
}
`;
const examplePersonalResponse = `{
  "data": [
    {
      "id": "cust-001",
      "verifiedClaims": [
        {
          "verification": {
            "trustFramework": "UAE.FI"
          },
          "claims": {
            "fullName": "Ahmed Al Mansouri",
            "givenName": "Ahmed",
            "familyName": "Al Mansouri"
          }
        }
      ]
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`;
const exampleBusinessResponse = `{
  "data": [
    {
      "id": "cust-002",
      "verifiedClaims": [
        {
          "verification": {
            "trustFramework": "UAE.FI"
          },
          "organisationClaims": {
            "name": "Al Mansouri Trading LLC"
          }
        }
      ]
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`;
const exampleNotFoundResponse = `{
  "data": [],
  "meta": {
    "totalPages": 0,
    "totalRecords": 0
  }
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsConfirmationOfPayee = _sfc_main$1;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-5c2f0d11><section class="ed-doc__hero" data-v-5c2f0d11><div class="ed-doc__inner" data-v-5c2f0d11><div class="ed-doc__eyebrow" data-v-5c2f0d11><span class="ed-doc__eyebrow-dash" data-v-5c2f0d11></span> LFI · Banking · Confirmation of Payee </div><h1 class="ed-doc__title" data-v-5c2f0d11> Confirmation of Payee — API Guide <span class="ed-doc__read" data-v-5c2f0d11>2 min read</span></h1><p class="ed-doc__lede" data-v-5c2f0d11> Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or business before initiating a payment. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "sequence-flow",
        num: "01",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end Confirmation of Payee",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Confirmation of Payee API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsConfirmationOfPayee, { version: "v2.1" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsConfirmationOfPayee, { version: "v2.1" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Confirmation of Payee API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsConfirmationOfPayee, { version: "v2.1" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "post-cop-query",
        num: "02",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "POST /customers/action/cop-query",
        title: "Match an IBAN against an account holder",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-5c2f0d11${_scopeId}><span class="http-badge http-post" data-v-5c2f0d11${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-5c2f0d11${_scopeId}>/customers/action/cop-query</code></div><h3 class="ed-doc__subhead" data-v-5c2f0d11${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-5c2f0d11${_scopeId2}><thead data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><th data-v-5c2f0d11${_scopeId2}>Header</th><th data-v-5c2f0d11${_scopeId2}>Required</th><th data-v-5c2f0d11${_scopeId2}>Description</th></tr></thead><tbody data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-provider-id</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>Identifier for your LFI registered in the Hub</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-aspsp-id</code></td><td data-v-5c2f0d11${_scopeId2}>Yes <em data-v-5c2f0d11${_scopeId2}>(deprecated)</em></td><td data-v-5c2f0d11${_scopeId2}>Deprecated alias for <code data-v-5c2f0d11${_scopeId2}>o3-provider-id</code>. Will be removed in a future version — use <code data-v-5c2f0d11${_scopeId2}>o3-provider-id</code></td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-caller-org-id</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>Organisation ID of the TPP making the underlying request</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-caller-client-id</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>OIDC client ID of the TPP application</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-caller-software-statement-id</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>Software statement ID of the TPP application</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-api-uri</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>The parameterised URL of the API being called by the TPP</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-api-operation</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>The HTTP method of the operation carried out by the TPP (e.g. <code data-v-5c2f0d11${_scopeId2}>POST</code>)</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-ozone-interaction-id</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>Hub-generated interaction ID. Equals <code data-v-5c2f0d11${_scopeId2}>o3-caller-interaction-id</code> if the TPP provided one</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>o3-caller-interaction-id</code></td><td data-v-5c2f0d11${_scopeId2}>No</td><td data-v-5c2f0d11${_scopeId2}>Interaction ID passed in by the TPP, if present</td></tr></tbody></table>`);
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
                            createVNode("code", null, "POST"),
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
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-5c2f0d11${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-5c2f0d11${_scopeId2}><thead data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><th data-v-5c2f0d11${_scopeId2}>Parameter</th><th data-v-5c2f0d11${_scopeId2}>Required</th><th data-v-5c2f0d11${_scopeId2}>Default</th><th data-v-5c2f0d11${_scopeId2}>Description</th></tr></thead><tbody data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>page</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>1</code></td><td data-v-5c2f0d11${_scopeId2}>Page number for paginated results</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>page-size</code></td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>100</code></td><td data-v-5c2f0d11${_scopeId2}>Number of records per page</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Default"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "1")
                          ]),
                          createVNode("td", null, "Page number for paginated results")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "page-size")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "100")
                          ]),
                          createVNode("td", null, "Number of records per page")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-5c2f0d11${_scopeId}>Request body</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-5c2f0d11${_scopeId2}>Content-Type: application/json</code>`);
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
                  _push3(` The Hub sends a plain JSON body — not a JWS. The body always contains a single account identified by IBAN and a name to match against. `);
                } else {
                  return [
                    createTextVNode(" The Hub sends a plain JSON body — not a JWS. The body always contains a single account identified by IBAN and a name to match against. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-5c2f0d11${_scopeId}><code data-v-5c2f0d11${_scopeId}>data.account</code></h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-5c2f0d11${_scopeId2}><thead data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><th data-v-5c2f0d11${_scopeId2}>Field</th><th data-v-5c2f0d11${_scopeId2}>Type</th><th data-v-5c2f0d11${_scopeId2}>Required</th><th data-v-5c2f0d11${_scopeId2}>Description</th></tr></thead><tbody data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>schemeName</code></td><td data-v-5c2f0d11${_scopeId2}>string</td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>Always <code data-v-5c2f0d11${_scopeId2}>IBAN</code></td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>identification</code></td><td data-v-5c2f0d11${_scopeId2}>string</td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>The IBAN to look up</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>name</code></td><td data-v-5c2f0d11${_scopeId2}>object</td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>Either a <code data-v-5c2f0d11${_scopeId2}>PersonName</code> or <code data-v-5c2f0d11${_scopeId2}>BusinessName</code> — see below</td></tr></tbody></table>`);
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
                            createTextVNode("Always "),
                            createVNode("code", null, "IBAN")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "identification")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The IBAN to look up")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "name")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Either a "),
                            createVNode("code", null, "PersonName"),
                            createTextVNode(" or "),
                            createVNode("code", null, "BusinessName"),
                            createTextVNode(" — see below")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-5c2f0d11${_scopeId}><code data-v-5c2f0d11${_scopeId}>PersonName</code></h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-5c2f0d11${_scopeId2}><thead data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><th data-v-5c2f0d11${_scopeId2}>Field</th><th data-v-5c2f0d11${_scopeId2}>Type</th><th data-v-5c2f0d11${_scopeId2}>Required</th><th data-v-5c2f0d11${_scopeId2}>Description</th></tr></thead><tbody data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>fullName</code></td><td data-v-5c2f0d11${_scopeId2}>string</td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>The full name of the person as submitted by the TPP</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>firstName</code></td><td data-v-5c2f0d11${_scopeId2}>string</td><td data-v-5c2f0d11${_scopeId2}>No</td><td data-v-5c2f0d11${_scopeId2}>Given name, if provided by the TPP</td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>lastName</code></td><td data-v-5c2f0d11${_scopeId2}>string</td><td data-v-5c2f0d11${_scopeId2}>No</td><td data-v-5c2f0d11${_scopeId2}>Family name, if provided by the TPP</td></tr></tbody></table>`);
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
                            createVNode("code", null, "fullName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The full name of the person as submitted by the TPP")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "firstName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Given name, if provided by the TPP")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "lastName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Family name, if provided by the TPP")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-5c2f0d11${_scopeId}><code data-v-5c2f0d11${_scopeId}>BusinessName</code></h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-5c2f0d11${_scopeId2}><thead data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><th data-v-5c2f0d11${_scopeId2}>Field</th><th data-v-5c2f0d11${_scopeId2}>Type</th><th data-v-5c2f0d11${_scopeId2}>Required</th><th data-v-5c2f0d11${_scopeId2}>Description</th></tr></thead><tbody data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>businessName</code></td><td data-v-5c2f0d11${_scopeId2}>string</td><td data-v-5c2f0d11${_scopeId2}>Yes</td><td data-v-5c2f0d11${_scopeId2}>The business name as submitted by the TPP</td></tr></tbody></table>`);
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
                            createVNode("code", null, "businessName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The business name as submitted by the TPP")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-5c2f0d11${_scopeId}>Example — personal name</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: examplePersonalRequest,
              lang: "json",
              filename: "personal name request"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-5c2f0d11${_scopeId}>Example — business name</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleBusinessRequest,
              lang: "json",
              filename: "business name request"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-5c2f0d11${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-5c2f0d11${_scopeId2}>Content-Type: application/json</code>`);
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
                  _push3(` Return <code data-v-5c2f0d11${_scopeId2}>200</code> in all lookup scenarios — whether the account is found or not. The Hub interprets the <code data-v-5c2f0d11${_scopeId2}>data</code> array contents to determine the match result returned to the TPP. `);
                } else {
                  return [
                    createTextVNode(" Return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" in all lookup scenarios — whether the account is found or not. The Hub interprets the "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array contents to determine the match result returned to the TPP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-5c2f0d11${_scopeId}><code data-v-5c2f0d11${_scopeId}>200</code> — Account found</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return a <code data-v-5c2f0d11${_scopeId2}>data</code> array containing one record per account holder. Joint accounts may return multiple records. `);
                } else {
                  return [
                    createTextVNode(" Return a "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array containing one record per account holder. Joint accounts may return multiple records. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-5c2f0d11${_scopeId}>Personal account</h5>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-5c2f0d11${_scopeId2}>verifiedClaims[].claims.fullName</code> is mandatory. Include <code data-v-5c2f0d11${_scopeId2}>givenName</code> and <code data-v-5c2f0d11${_scopeId2}>familyName</code> if your system holds them separately — the Hub uses these to improve match precision. `);
                } else {
                  return [
                    createVNode("code", null, "verifiedClaims[].claims.fullName"),
                    createTextVNode(" is mandatory. Include "),
                    createVNode("code", null, "givenName"),
                    createTextVNode(" and "),
                    createVNode("code", null, "familyName"),
                    createTextVNode(" if your system holds them separately — the Hub uses these to improve match precision. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: examplePersonalResponse,
              lang: "json",
              filename: "personal account response"
            }, null, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-5c2f0d11${_scopeId}>Business account</h5>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Populate <code data-v-5c2f0d11${_scopeId2}>verifiedClaims[].organisationClaims.name</code> with the registered business name on the account. `);
                } else {
                  return [
                    createTextVNode(" Populate "),
                    createVNode("code", null, "verifiedClaims[].organisationClaims.name"),
                    createTextVNode(" with the registered business name on the account. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleBusinessResponse,
              lang: "json",
              filename: "business account response"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-5c2f0d11${_scopeId}><code data-v-5c2f0d11${_scopeId}>200</code> — Account not found, opted out</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return <code data-v-5c2f0d11${_scopeId2}>200</code> with an empty <code data-v-5c2f0d11${_scopeId2}>data</code> array for scenarios where no account was found matching the IBAN or if the account opted out of CoP. Do not use <code data-v-5c2f0d11${_scopeId2}>404</code> or <code data-v-5c2f0d11${_scopeId2}>204</code> — the Hub expects <code data-v-5c2f0d11${_scopeId2}>200</code> and treats an empty array as a no-result response. `);
                } else {
                  return [
                    createTextVNode(" Return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array for scenarios where no account was found matching the IBAN or if the account opted out of CoP. Do not use "),
                    createVNode("code", null, "404"),
                    createTextVNode(" or "),
                    createVNode("code", null, "204"),
                    createTextVNode(" — the Hub expects "),
                    createVNode("code", null, "200"),
                    createTextVNode(" and treats an empty array as a no-result response. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleNotFoundResponse,
              lang: "json",
              filename: "not found response"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-5c2f0d11${_scopeId}>Error responses</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`All error bodies must include <code data-v-5c2f0d11${_scopeId2}>errorCode</code> and <code data-v-5c2f0d11${_scopeId2}>errorMessage</code>.`);
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
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-5c2f0d11${_scopeId}><code data-v-5c2f0d11${_scopeId}>403</code> — Forbidden</h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-5c2f0d11${_scopeId2}><thead data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><th data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>errorCode</code></th><th data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>errorMessage</code></th><th data-v-5c2f0d11${_scopeId2}>When to use</th></tr></thead><tbody data-v-5c2f0d11${_scopeId2}><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>Consent.AccountTemporarilyBlocked</code></td><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>The account is blocked from receiving payments.</code></td><td data-v-5c2f0d11${_scopeId2}>The account is blocked from receiving payments for a temporary reason — e.g. account status is <code data-v-5c2f0d11${_scopeId2}>Suspended</code></td></tr><tr data-v-5c2f0d11${_scopeId2}><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>Consent.PermanentAccountAccessFailure</code></td><td data-v-5c2f0d11${_scopeId2}><code data-v-5c2f0d11${_scopeId2}>The account is blocked from receiving payments.</code></td><td data-v-5c2f0d11${_scopeId2}>The account is blocked from receiving payments permanently — e.g. account status is <code data-v-5c2f0d11${_scopeId2}>Closed</code>, <code data-v-5c2f0d11${_scopeId2}>Deceased</code>, or <code data-v-5c2f0d11${_scopeId2}>Unclaimed</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "The account is blocked from receiving payments.")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The account is blocked from receiving payments for a temporary reason — e.g. account status is "),
                            createVNode("code", null, "Suspended")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "The account is blocked from receiving payments.")
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
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/customers/action/cop-query")
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
                          createVNode("code", null, "POST"),
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
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Default"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "1")
                        ]),
                        createVNode("td", null, "Page number for paginated results")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "page-size")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "100")
                        ]),
                        createVNode("td", null, "Number of records per page")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Request body"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Content-Type: application/json")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Hub sends a plain JSON body — not a JWS. The body always contains a single account identified by IBAN and a name to match against. ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "data.account")
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
                          createTextVNode("Always "),
                          createVNode("code", null, "IBAN")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "identification")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The IBAN to look up")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "name")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Either a "),
                          createVNode("code", null, "PersonName"),
                          createTextVNode(" or "),
                          createVNode("code", null, "BusinessName"),
                          createTextVNode(" — see below")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "PersonName")
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
                          createVNode("code", null, "fullName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The full name of the person as submitted by the TPP")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "firstName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Given name, if provided by the TPP")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "lastName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Family name, if provided by the TPP")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "BusinessName")
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
                          createVNode("code", null, "businessName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The business name as submitted by the TPP")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example — personal name"),
              createVNode(_component_EdCode, {
                code: examplePersonalRequest,
                lang: "json",
                filename: "personal name request"
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example — business name"),
              createVNode(_component_EdCode, {
                code: exampleBusinessRequest,
                lang: "json",
                filename: "business name request"
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
                  createTextVNode(" in all lookup scenarios — whether the account is found or not. The Hub interprets the "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array contents to determine the match result returned to the TPP. ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "200"),
                createTextVNode(" — Account found")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return a "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array containing one record per account holder. Joint accounts may return multiple records. ")
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, "Personal account"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "verifiedClaims[].claims.fullName"),
                  createTextVNode(" is mandatory. Include "),
                  createVNode("code", null, "givenName"),
                  createTextVNode(" and "),
                  createVNode("code", null, "familyName"),
                  createTextVNode(" if your system holds them separately — the Hub uses these to improve match precision. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: examplePersonalResponse,
                lang: "json",
                filename: "personal account response"
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, "Business account"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Populate "),
                  createVNode("code", null, "verifiedClaims[].organisationClaims.name"),
                  createTextVNode(" with the registered business name on the account. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleBusinessResponse,
                lang: "json",
                filename: "business account response"
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "200"),
                createTextVNode(" — Account not found, opted out")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return "),
                  createVNode("code", null, "200"),
                  createTextVNode(" with an empty "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array for scenarios where no account was found matching the IBAN or if the account opted out of CoP. Do not use "),
                  createVNode("code", null, "404"),
                  createTextVNode(" or "),
                  createVNode("code", null, "204"),
                  createTextVNode(" — the Hub expects "),
                  createVNode("code", null, "200"),
                  createTextVNode(" and treats an empty array as a no-result response. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleNotFoundResponse,
                lang: "json",
                filename: "not found response"
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
                          createVNode("code", null, "The account is blocked from receiving payments.")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The account is blocked from receiving payments for a temporary reason — e.g. account status is "),
                          createVNode("code", null, "Suspended")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Consent.PermanentAccountAccessFailure")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "The account is blocked from receiving payments.")
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
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c2f0d11"]]);
export {
  apiGuide as default
};
