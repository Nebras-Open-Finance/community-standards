import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
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
const exampleRequest = `{
  "data": {
    "account": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456"
    }
  }
}
`;
const examplePersonalResponse = `{
  "data": [
    {
      "id": "cust-001",
      "name": {
        "fullName": "Ahmed Al Mansouri",
        "firstName": "Ahmed",
        "lastName": "Al Mansouri",
        "fullNameAr": "أحمد المنصوري"
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`;
const exampleMinimalResponse = `{
  "data": [
    {
      "id": "cust-001",
      "name": {
        "fullName": "Ahmed Al Mansouri"
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
`;
const exampleJointResponse = `{
  "data": [
    {
      "id": "cust-001",
      "name": {
        "fullName": "Ahmed Al Mansouri",
        "firstName": "Ahmed",
        "lastName": "Al Mansouri"
      }
    },
    {
      "id": "cust-002",
      "name": {
        "fullName": "Fatima Al Mansouri",
        "firstName": "Fatima",
        "lastName": "Al Mansouri"
      }
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 2
  }
}
`;
const exampleBusinessResponse = `{
  "data": [
    {
      "id": "cust-003",
      "name": {
        "businessName": "Al Mansouri Trading LLC",
        "alsoKnownAs": ["Al Mansouri Trading"]
      }
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
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e36cf925><section class="ed-doc__hero" data-v-e36cf925><div class="ed-doc__inner" data-v-e36cf925><div class="ed-doc__eyebrow" data-v-e36cf925><span class="ed-doc__eyebrow-dash" data-v-e36cf925></span> LFI · Banking · Confirmation of Payee </div><h1 class="ed-doc__title" data-v-e36cf925> Confirmation of Payee — API Guide <span class="ed-doc__read" data-v-e36cf925>2 min read</span></h1><p class="ed-doc__lede" data-v-e36cf925> Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or business before initiating a payment. </p></div></section>`);
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
                  _push3(ssrRenderComponent(_component_APIFlowsConfirmationOfPayee, { version: "v2.2-rc1" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsConfirmationOfPayee, { version: "v2.2-rc1" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Confirmation of Payee API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsConfirmationOfPayee, { version: "v2.2-rc1" })
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
        title: "Return the name(s) held against an IBAN",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e36cf925${_scopeId}><span class="http-badge http-post" data-v-e36cf925${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-e36cf925${_scopeId}>/customers/action/cop-query</code></div>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "important",
              title: "Migrating from v2.1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e36cf925${_scopeId2}> Both bodies changed in v2.2. The request no longer carries <code data-v-e36cf925${_scopeId2}>data.account.name</code> — drop it from your parser, and stop reading it if you used it to select which name to return. The response is flattened: replace <code data-v-e36cf925${_scopeId2}>data[].verifiedClaims[].verification</code> and <code data-v-e36cf925${_scopeId2}>data[].verifiedClaims[].claims</code> with a single <code data-v-e36cf925${_scopeId2}>data[].name</code>, mapping <code data-v-e36cf925${_scopeId2}>claims.fullName</code> to <code data-v-e36cf925${_scopeId2}>name.fullName</code>, <code data-v-e36cf925${_scopeId2}>givenName</code> to <code data-v-e36cf925${_scopeId2}>firstName</code>, <code data-v-e36cf925${_scopeId2}>familyName</code> to <code data-v-e36cf925${_scopeId2}>lastName</code>, and <code data-v-e36cf925${_scopeId2}>organisationClaims.name</code> to <code data-v-e36cf925${_scopeId2}>name.businessName</code>. Everything else the envelope carried — trust framework, assurance evidence, and the wider customer fields such as <code data-v-e36cf925${_scopeId2}>emiratesId</code>, <code data-v-e36cf925${_scopeId2}>birthDate</code> and <code data-v-e36cf925${_scopeId2}>salary</code> — is removed and MUST NOT be sent. </p><p data-v-e36cf925${_scopeId2}> Headers, query parameters, status codes and error codes are unchanged, so this is a rewrite of your request parser and response builder rather than a new integration. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Both bodies changed in v2.2. The request no longer carries "),
                      createVNode("code", null, "data.account.name"),
                      createTextVNode(" — drop it from your parser, and stop reading it if you used it to select which name to return. The response is flattened: replace "),
                      createVNode("code", null, "data[].verifiedClaims[].verification"),
                      createTextVNode(" and "),
                      createVNode("code", null, "data[].verifiedClaims[].claims"),
                      createTextVNode(" with a single "),
                      createVNode("code", null, "data[].name"),
                      createTextVNode(", mapping "),
                      createVNode("code", null, "claims.fullName"),
                      createTextVNode(" to "),
                      createVNode("code", null, "name.fullName"),
                      createTextVNode(", "),
                      createVNode("code", null, "givenName"),
                      createTextVNode(" to "),
                      createVNode("code", null, "firstName"),
                      createTextVNode(", "),
                      createVNode("code", null, "familyName"),
                      createTextVNode(" to "),
                      createVNode("code", null, "lastName"),
                      createTextVNode(", and "),
                      createVNode("code", null, "organisationClaims.name"),
                      createTextVNode(" to "),
                      createVNode("code", null, "name.businessName"),
                      createTextVNode(". Everything else the envelope carried — trust framework, assurance evidence, and the wider customer fields such as "),
                      createVNode("code", null, "emiratesId"),
                      createTextVNode(", "),
                      createVNode("code", null, "birthDate"),
                      createTextVNode(" and "),
                      createVNode("code", null, "salary"),
                      createTextVNode(" — is removed and MUST NOT be sent. ")
                    ]),
                    createVNode("p", null, " Headers, query parameters, status codes and error codes are unchanged, so this is a rewrite of your request parser and response builder rather than a new integration. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e36cf925${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e36cf925${_scopeId2}><thead data-v-e36cf925${_scopeId2}><tr data-v-e36cf925${_scopeId2}><th data-v-e36cf925${_scopeId2}>Header</th><th data-v-e36cf925${_scopeId2}>Required</th><th data-v-e36cf925${_scopeId2}>Description</th></tr></thead><tbody data-v-e36cf925${_scopeId2}><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-provider-id</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>Identifier for your LFI registered in the Hub</td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-aspsp-id</code></td><td data-v-e36cf925${_scopeId2}>Yes <em data-v-e36cf925${_scopeId2}>(deprecated)</em></td><td data-v-e36cf925${_scopeId2}>Deprecated alias for <code data-v-e36cf925${_scopeId2}>o3-provider-id</code>. Will be removed in a future version — use <code data-v-e36cf925${_scopeId2}>o3-provider-id</code></td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-caller-org-id</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>Organisation ID of the TPP making the underlying request</td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-caller-client-id</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>OIDC client ID of the TPP application</td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-caller-software-statement-id</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>Software statement ID of the TPP application</td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-api-uri</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>The parameterised URL of the API being called by the TPP</td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-api-operation</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>The HTTP method of the operation carried out by the TPP (e.g. <code data-v-e36cf925${_scopeId2}>POST</code>)</td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-ozone-interaction-id</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>Hub-generated interaction ID. Equals <code data-v-e36cf925${_scopeId2}>o3-caller-interaction-id</code> if the TPP provided one</td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>o3-caller-interaction-id</code></td><td data-v-e36cf925${_scopeId2}>No</td><td data-v-e36cf925${_scopeId2}>Interaction ID passed in by the TPP, if present</td></tr></tbody></table>`);
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
            _push2(`<h3 class="ed-doc__subhead" data-v-e36cf925${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e36cf925${_scopeId2}><thead data-v-e36cf925${_scopeId2}><tr data-v-e36cf925${_scopeId2}><th data-v-e36cf925${_scopeId2}>Parameter</th><th data-v-e36cf925${_scopeId2}>Required</th><th data-v-e36cf925${_scopeId2}>Default</th><th data-v-e36cf925${_scopeId2}>Description</th></tr></thead><tbody data-v-e36cf925${_scopeId2}><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>page</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>1</code></td><td data-v-e36cf925${_scopeId2}>Page number for paginated results</td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>page-size</code></td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>100</code></td><td data-v-e36cf925${_scopeId2}>Number of records per page</td></tr></tbody></table>`);
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
            _push2(`<h3 class="ed-doc__subhead" data-v-e36cf925${_scopeId}>Request body</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-e36cf925${_scopeId2}>Content-Type: application/json</code>`);
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
                  _push3(` The Hub sends a plain JSON body — not a JWS. The body identifies a single account by IBAN, and carries nothing else. The name the TPP submitted is <strong data-v-e36cf925${_scopeId2}>not</strong> sent to you: look the account up by IBAN and return the holders you have, and the Hub does the comparing. `);
                } else {
                  return [
                    createTextVNode(" The Hub sends a plain JSON body — not a JWS. The body identifies a single account by IBAN, and carries nothing else. The name the TPP submitted is "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" sent to you: look the account up by IBAN and return the holders you have, and the Hub does the comparing. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-e36cf925${_scopeId}><code data-v-e36cf925${_scopeId}>data.account</code></h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e36cf925${_scopeId2}><thead data-v-e36cf925${_scopeId2}><tr data-v-e36cf925${_scopeId2}><th data-v-e36cf925${_scopeId2}>Field</th><th data-v-e36cf925${_scopeId2}>Type</th><th data-v-e36cf925${_scopeId2}>Required</th><th data-v-e36cf925${_scopeId2}>Description</th></tr></thead><tbody data-v-e36cf925${_scopeId2}><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>schemeName</code></td><td data-v-e36cf925${_scopeId2}>string</td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>Always <code data-v-e36cf925${_scopeId2}>IBAN</code></td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>identification</code></td><td data-v-e36cf925${_scopeId2}>string</td><td data-v-e36cf925${_scopeId2}>Yes</td><td data-v-e36cf925${_scopeId2}>The IBAN to look up</td></tr></tbody></table>`);
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
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-e36cf925${_scopeId}>Example</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleRequest,
              lang: "json",
              filename: "cop-query request"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e36cf925${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-e36cf925${_scopeId2}>Content-Type: application/json</code>`);
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
                  _push3(` Return <code data-v-e36cf925${_scopeId2}>200</code> in all lookup scenarios — whether the account is found or not. The Hub interprets the <code data-v-e36cf925${_scopeId2}>data</code> array contents to determine the match result returned to the TPP. `);
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
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-e36cf925${_scopeId}><code data-v-e36cf925${_scopeId}>200</code> — Account found</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return a <code data-v-e36cf925${_scopeId2}>data</code> array containing <strong data-v-e36cf925${_scopeId2}>one entry per account holder</strong>. <code data-v-e36cf925${_scopeId2}>id</code> and <code data-v-e36cf925${_scopeId2}>name</code> are the only required members of an entry. `);
                } else {
                  return [
                    createTextVNode(" Return a "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array containing "),
                    createVNode("strong", null, "one entry per account holder"),
                    createTextVNode(". "),
                    createVNode("code", null, "id"),
                    createTextVNode(" and "),
                    createVNode("code", null, "name"),
                    createTextVNode(" are the only required members of an entry. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-e36cf925${_scopeId}>Personal account</h5>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-e36cf925${_scopeId2}>name.fullName</code> is mandatory and is the value the Hub matches on today. Every other field is <strong data-v-e36cf925${_scopeId2}>optional</strong> — supply <code data-v-e36cf925${_scopeId2}>firstName</code>, <code data-v-e36cf925${_scopeId2}>middleName</code>, <code data-v-e36cf925${_scopeId2}>lastName</code>, <code data-v-e36cf925${_scopeId2}>fullNameAr</code> and <code data-v-e36cf925${_scopeId2}>alsoKnownAs</code> where your systems hold them separately, so that improvements to the matching algorithm can use them without a further change to this contract. A response carrying only <code data-v-e36cf925${_scopeId2}>fullName</code> is fully conformant. `);
                } else {
                  return [
                    createVNode("code", null, "name.fullName"),
                    createTextVNode(" is mandatory and is the value the Hub matches on today. Every other field is "),
                    createVNode("strong", null, "optional"),
                    createTextVNode(" — supply "),
                    createVNode("code", null, "firstName"),
                    createTextVNode(", "),
                    createVNode("code", null, "middleName"),
                    createTextVNode(", "),
                    createVNode("code", null, "lastName"),
                    createTextVNode(", "),
                    createVNode("code", null, "fullNameAr"),
                    createTextVNode(" and "),
                    createVNode("code", null, "alsoKnownAs"),
                    createTextVNode(" where your systems hold them separately, so that improvements to the matching algorithm can use them without a further change to this contract. A response carrying only "),
                    createVNode("code", null, "fullName"),
                    createTextVNode(" is fully conformant. ")
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
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-e36cf925${_scopeId}>Personal account — minimum conformant response</h5>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleMinimalResponse,
              lang: "json",
              filename: "minimum conformant response"
            }, null, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-e36cf925${_scopeId}>Joint account</h5>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return one entry per holder. The Hub evaluates <strong data-v-e36cf925${_scopeId2}>every</strong> entry in <code data-v-e36cf925${_scopeId2}>data</code>, so the order is not significant — do not attempt to place the most likely match first. `);
                } else {
                  return [
                    createTextVNode(" Return one entry per holder. The Hub evaluates "),
                    createVNode("strong", null, "every"),
                    createTextVNode(" entry in "),
                    createVNode("code", null, "data"),
                    createTextVNode(", so the order is not significant — do not attempt to place the most likely match first. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleJointResponse,
              lang: "json",
              filename: "joint account response"
            }, null, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-e36cf925${_scopeId}>Business account</h5>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Populate <code data-v-e36cf925${_scopeId2}>name.businessName</code> with the registered business name on the account. <code data-v-e36cf925${_scopeId2}>businessNameAr</code> and <code data-v-e36cf925${_scopeId2}>alsoKnownAs</code> are optional. `);
                } else {
                  return [
                    createTextVNode(" Populate "),
                    createVNode("code", null, "name.businessName"),
                    createTextVNode(" with the registered business name on the account. "),
                    createVNode("code", null, "businessNameAr"),
                    createTextVNode(" and "),
                    createVNode("code", null, "alsoKnownAs"),
                    createTextVNode(" are optional. ")
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
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-e36cf925${_scopeId}><code data-v-e36cf925${_scopeId}>200</code> — Account not found, opted out</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return <code data-v-e36cf925${_scopeId2}>200</code> with an empty <code data-v-e36cf925${_scopeId2}>data</code> array where no account was found matching the IBAN, the account is under a bar, or the customer has opted out of CoP. Do <strong data-v-e36cf925${_scopeId2}>not</strong> use <code data-v-e36cf925${_scopeId2}>204</code>, <code data-v-e36cf925${_scopeId2}>404</code>, <code data-v-e36cf925${_scopeId2}>201</code> or <code data-v-e36cf925${_scopeId2}>202</code> — the Hub expects <code data-v-e36cf925${_scopeId2}>200</code> and treats an empty array as a no-result response. `);
                } else {
                  return [
                    createTextVNode(" Return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with an empty "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array where no account was found matching the IBAN, the account is under a bar, or the customer has opted out of CoP. Do "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" use "),
                    createVNode("code", null, "204"),
                    createTextVNode(", "),
                    createVNode("code", null, "404"),
                    createTextVNode(", "),
                    createVNode("code", null, "201"),
                    createTextVNode(" or "),
                    createVNode("code", null, "202"),
                    createTextVNode(" — the Hub expects "),
                    createVNode("code", null, "200"),
                    createTextVNode(" and treats an empty array as a no-result response. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The three cases are deliberately indistinguishable to the TPP, so that a CoP query cannot be used to probe for the existence of an account. `);
                } else {
                  return [
                    createTextVNode(" The three cases are deliberately indistinguishable to the TPP, so that a CoP query cannot be used to probe for the existence of an account. ")
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
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-e36cf925${_scopeId}>Error responses</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`All error bodies must include <code data-v-e36cf925${_scopeId2}>errorCode</code> and <code data-v-e36cf925${_scopeId2}>errorMessage</code>.`);
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
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-e36cf925${_scopeId}><code data-v-e36cf925${_scopeId}>403</code> — Forbidden</h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e36cf925${_scopeId2}><thead data-v-e36cf925${_scopeId2}><tr data-v-e36cf925${_scopeId2}><th data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>errorCode</code></th><th data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>errorMessage</code></th><th data-v-e36cf925${_scopeId2}>When to use</th></tr></thead><tbody data-v-e36cf925${_scopeId2}><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>Consent.AccountTemporarilyBlocked</code></td><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>The account is blocked from receiving payments.</code></td><td data-v-e36cf925${_scopeId2}>The account is blocked from receiving payments for a temporary reason — e.g. account status is <code data-v-e36cf925${_scopeId2}>Suspended</code></td></tr><tr data-v-e36cf925${_scopeId2}><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>Consent.PermanentAccountAccessFailure</code></td><td data-v-e36cf925${_scopeId2}><code data-v-e36cf925${_scopeId2}>The account is blocked from receiving payments.</code></td><td data-v-e36cf925${_scopeId2}>The account is blocked from receiving payments permanently — e.g. account status is <code data-v-e36cf925${_scopeId2}>Closed</code>, <code data-v-e36cf925${_scopeId2}>Deceased</code>, or <code data-v-e36cf925${_scopeId2}>Unclaimed</code></td></tr></tbody></table>`);
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
              createVNode(_component_EdNote, {
                type: "important",
                title: "Migrating from v2.1"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Both bodies changed in v2.2. The request no longer carries "),
                    createVNode("code", null, "data.account.name"),
                    createTextVNode(" — drop it from your parser, and stop reading it if you used it to select which name to return. The response is flattened: replace "),
                    createVNode("code", null, "data[].verifiedClaims[].verification"),
                    createTextVNode(" and "),
                    createVNode("code", null, "data[].verifiedClaims[].claims"),
                    createTextVNode(" with a single "),
                    createVNode("code", null, "data[].name"),
                    createTextVNode(", mapping "),
                    createVNode("code", null, "claims.fullName"),
                    createTextVNode(" to "),
                    createVNode("code", null, "name.fullName"),
                    createTextVNode(", "),
                    createVNode("code", null, "givenName"),
                    createTextVNode(" to "),
                    createVNode("code", null, "firstName"),
                    createTextVNode(", "),
                    createVNode("code", null, "familyName"),
                    createTextVNode(" to "),
                    createVNode("code", null, "lastName"),
                    createTextVNode(", and "),
                    createVNode("code", null, "organisationClaims.name"),
                    createTextVNode(" to "),
                    createVNode("code", null, "name.businessName"),
                    createTextVNode(". Everything else the envelope carried — trust framework, assurance evidence, and the wider customer fields such as "),
                    createVNode("code", null, "emiratesId"),
                    createTextVNode(", "),
                    createVNode("code", null, "birthDate"),
                    createTextVNode(" and "),
                    createVNode("code", null, "salary"),
                    createTextVNode(" — is removed and MUST NOT be sent. ")
                  ]),
                  createVNode("p", null, " Headers, query parameters, status codes and error codes are unchanged, so this is a rewrite of your request parser and response builder rather than a new integration. ")
                ]),
                _: 1
              }),
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
                  createTextVNode(" The Hub sends a plain JSON body — not a JWS. The body identifies a single account by IBAN, and carries nothing else. The name the TPP submitted is "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" sent to you: look the account up by IBAN and return the holders you have, and the Hub does the comparing. ")
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
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example"),
              createVNode(_component_EdCode, {
                code: exampleRequest,
                lang: "json",
                filename: "cop-query request"
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
                  createTextVNode(" array containing "),
                  createVNode("strong", null, "one entry per account holder"),
                  createTextVNode(". "),
                  createVNode("code", null, "id"),
                  createTextVNode(" and "),
                  createVNode("code", null, "name"),
                  createTextVNode(" are the only required members of an entry. ")
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, "Personal account"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "name.fullName"),
                  createTextVNode(" is mandatory and is the value the Hub matches on today. Every other field is "),
                  createVNode("strong", null, "optional"),
                  createTextVNode(" — supply "),
                  createVNode("code", null, "firstName"),
                  createTextVNode(", "),
                  createVNode("code", null, "middleName"),
                  createTextVNode(", "),
                  createVNode("code", null, "lastName"),
                  createTextVNode(", "),
                  createVNode("code", null, "fullNameAr"),
                  createTextVNode(" and "),
                  createVNode("code", null, "alsoKnownAs"),
                  createTextVNode(" where your systems hold them separately, so that improvements to the matching algorithm can use them without a further change to this contract. A response carrying only "),
                  createVNode("code", null, "fullName"),
                  createTextVNode(" is fully conformant. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: examplePersonalResponse,
                lang: "json",
                filename: "personal account response"
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, "Personal account — minimum conformant response"),
              createVNode(_component_EdCode, {
                code: exampleMinimalResponse,
                lang: "json",
                filename: "minimum conformant response"
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, "Joint account"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return one entry per holder. The Hub evaluates "),
                  createVNode("strong", null, "every"),
                  createTextVNode(" entry in "),
                  createVNode("code", null, "data"),
                  createTextVNode(", so the order is not significant — do not attempt to place the most likely match first. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleJointResponse,
                lang: "json",
                filename: "joint account response"
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, "Business account"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Populate "),
                  createVNode("code", null, "name.businessName"),
                  createTextVNode(" with the registered business name on the account. "),
                  createVNode("code", null, "businessNameAr"),
                  createTextVNode(" and "),
                  createVNode("code", null, "alsoKnownAs"),
                  createTextVNode(" are optional. ")
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
                  createTextVNode(" array where no account was found matching the IBAN, the account is under a bar, or the customer has opted out of CoP. Do "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" use "),
                  createVNode("code", null, "204"),
                  createTextVNode(", "),
                  createVNode("code", null, "404"),
                  createTextVNode(", "),
                  createVNode("code", null, "201"),
                  createTextVNode(" or "),
                  createVNode("code", null, "202"),
                  createTextVNode(" — the Hub expects "),
                  createVNode("code", null, "200"),
                  createTextVNode(" and treats an empty array as a no-result response. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The three cases are deliberately indistinguishable to the TPP, so that a CoP query cannot be used to probe for the existence of an account. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e36cf925"]]);
export {
  apiGuide as default
};
