import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as _sfc_main$1 } from "./APIFlowsATMs-DUJH6uNc.js";
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
  "data": [
    {
      "LFIId": "lfi-001",
      "LFIBrandId": "First National Bank UAE",
      "ATMId": "atm-dxb-001",
      "SupportedLanguages": ["en", "ar"],
      "Services": ["CashWithdrawal", "Balance", "MiniStatement", "PINChange"],
      "Accessibility": ["WheelchairAccess", "AudioCashMachine"],
      "IsAccess24Hour": true,
      "Availability": {
        "Status": "Available"
      },
      "SupportedCurrencies": ["AED"],
      "MinimumPossibleAmount": {
        "Amount": "20",
        "Currency": "AED"
      },
      "MaximumPossibleAmount": {
        "Amount": "5000",
        "Currency": "AED"
      },
      "Location": {
        "LocationCategory": ["BranchExternal"],
        "PostalAddress": {
          "AddressLine": ["Sheikh Zayed Road", "Al Quoz"],
          "TownName": "Dubai",
          "CountrySubDivision": "Dubai",
          "Country": "AE"
        },
        "GeoLocation": {
          "Latitude": "25.1972",
          "Longitude": "55.2796"
        }
      },
      "ATMFee": [
        {
          "Type": "CrossBankWithdrawal",
          "Amount": {
            "Amount": "2.00",
            "Currency": "AED"
          }
        }
      ]
    }
  ],
  "meta": {
    "LastUpdatedDateTime": "2025-03-01T08:00:00Z",
    "TotalRecords": 1
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
      const _component_APIFlowsATMs = _sfc_main$1;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-bdc568a9><section class="ed-doc__hero" data-v-bdc568a9><div class="ed-doc__inner" data-v-bdc568a9><div class="ed-doc__eyebrow" data-v-bdc568a9><span class="ed-doc__eyebrow-dash" data-v-bdc568a9></span> LFI · Banking · ATMs </div><h1 class="ed-doc__title" data-v-bdc568a9> ATMs — API Guide <span class="ed-doc__read" data-v-bdc568a9>3 min read</span></h1><p class="ed-doc__lede" data-v-bdc568a9> The ATM API exposes a single endpoint that returns all ATM records published by the LFI. This is open data — no customer consent is required. The Hub calls your Ozone Connect <a href="/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm" class="endpoint" data-v-bdc568a9><span class="http-method http-method--get" data-v-bdc568a9>GET</span><code data-v-bdc568a9>/atm</code></a> endpoint whenever a TPP or public consumer requests ATM data for your institution. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "sequence-flow",
        num: "01",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end ATM request",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "ATM API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsATMs, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsATMs)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "ATM API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsATMs)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-atm",
        num: "02",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "GET /atm",
        title: "Return all ATM records",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-bdc568a9${_scopeId}><span class="http-badge http-get" data-v-bdc568a9${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-bdc568a9${_scopeId}>/atm</code></div><h3 class="ed-doc__subhead" data-v-bdc568a9${_scopeId}>Request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}>Header</th><th data-v-bdc568a9${_scopeId2}>Required</th><th data-v-bdc568a9${_scopeId2}>Description</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>o3-provider-id</code></td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Identifier for your LFI registered in the Hub</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>o3-caller-org-id</code></td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Organisation ID of the TPP making the underlying request</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>o3-caller-client-id</code></td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>OIDC client ID of the TPP application</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>o3-caller-software-statement-id</code></td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Software statement ID of the TPP application</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>o3-api-uri</code></td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>The parameterised URL of the API being called by the TPP</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>o3-api-operation</code></td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>The HTTP method of the operation carried out by the TPP (e.g. <code data-v-bdc568a9${_scopeId2}>GET</code>)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>o3-ozone-interaction-id</code></td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Hub-generated interaction ID. Equals <code data-v-bdc568a9${_scopeId2}>o3-caller-interaction-id</code> if the TPP provided one</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>o3-caller-interaction-id</code></td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>Interaction ID passed in by the TPP, if present</td></tr></tbody></table>`);
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
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-bdc568a9${_scopeId}>Response</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-bdc568a9${_scopeId2}>Content-Type: application/json</code>`);
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
                  _push3(` Return <code data-v-bdc568a9${_scopeId2}>200</code> with a <code data-v-bdc568a9${_scopeId2}>data</code> array containing one record per ATM. Return an empty array if no ATMs are registered — do not return <code data-v-bdc568a9${_scopeId2}>404</code>. `);
                } else {
                  return [
                    createTextVNode(" Return "),
                    createVNode("code", null, "200"),
                    createTextVNode(" with a "),
                    createVNode("code", null, "data"),
                    createTextVNode(" array containing one record per ATM. Return an empty array if no ATMs are registered — do not return "),
                    createVNode("code", null, "404"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>data[]</code> — ATM record</h4><h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}>Required fields</h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}>Field</th><th data-v-bdc568a9${_scopeId2}>Type</th><th data-v-bdc568a9${_scopeId2}>Description</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>LFIId</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>Your LFI identifier as registered in the Hub (1–36 characters)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>LFIBrandId</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>Brand identifier for the LFI (1–140 characters)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>ATMId</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>Unique identifier for the ATM (1–36 characters)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>SupportedCurrencies</code></td><td data-v-bdc568a9${_scopeId2}>string[]</td><td data-v-bdc568a9${_scopeId2}>ISO 4217 currency codes the ATM dispenses or accepts (at least one required)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Location</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}>Physical location of the ATM — see below</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LFIId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Your LFI identifier as registered in the Hub (1–36 characters)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LFIBrandId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Brand identifier for the LFI (1–140 characters)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ATMId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Unique identifier for the ATM (1–36 characters)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SupportedCurrencies")
                          ]),
                          createVNode("td", null, "string[]"),
                          createVNode("td", null, "ISO 4217 currency codes the ATM dispenses or accepts (at least one required)")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Location")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Physical location of the ATM — see below")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>Location</code></h5>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Both <code data-v-bdc568a9${_scopeId2}>PostalAddress</code> and <code data-v-bdc568a9${_scopeId2}>GeoLocation</code> are required.`);
                } else {
                  return [
                    createTextVNode("Both "),
                    createVNode("code", null, "PostalAddress"),
                    createTextVNode(" and "),
                    createVNode("code", null, "GeoLocation"),
                    createTextVNode(" are required.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}>Field</th><th data-v-bdc568a9${_scopeId2}>Type</th><th data-v-bdc568a9${_scopeId2}>Required</th><th data-v-bdc568a9${_scopeId2}>Description</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>PostalAddress</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Structured postal address — see below</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>GeoLocation</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>GPS coordinates — see below</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>LocationCategory</code></td><td data-v-bdc568a9${_scopeId2}>string[]</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>One or more of: <code data-v-bdc568a9${_scopeId2}>BranchExternal</code>, <code data-v-bdc568a9${_scopeId2}>BranchInternal</code>, <code data-v-bdc568a9${_scopeId2}>BranchLobby</code>, <code data-v-bdc568a9${_scopeId2}>RetailerOutlet</code>, <code data-v-bdc568a9${_scopeId2}>RemoteUnit</code>, <code data-v-bdc568a9${_scopeId2}>DriveThru</code>, <code data-v-bdc568a9${_scopeId2}>Other</code></td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Site</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Identification</code> and <code data-v-bdc568a9${_scopeId2}>Name</code> of the site</td></tr></tbody></table>`);
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
                            createVNode("code", null, "PostalAddress")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Structured postal address — see below")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GeoLocation")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "GPS coordinates — see below")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LocationCategory")
                          ]),
                          createVNode("td", null, "string[]"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("One or more of: "),
                            createVNode("code", null, "BranchExternal"),
                            createTextVNode(", "),
                            createVNode("code", null, "BranchInternal"),
                            createTextVNode(", "),
                            createVNode("code", null, "BranchLobby"),
                            createTextVNode(", "),
                            createVNode("code", null, "RetailerOutlet"),
                            createTextVNode(", "),
                            createVNode("code", null, "RemoteUnit"),
                            createTextVNode(", "),
                            createVNode("code", null, "DriveThru"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Site")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createVNode("code", null, "Identification"),
                            createTextVNode(" and "),
                            createVNode("code", null, "Name"),
                            createTextVNode(" of the site")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>PostalAddress</code></h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}>Field</th><th data-v-bdc568a9${_scopeId2}>Type</th><th data-v-bdc568a9${_scopeId2}>Required</th><th data-v-bdc568a9${_scopeId2}>Description</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>AddressLine</code></td><td data-v-bdc568a9${_scopeId2}>string[]</td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>1–7 free-form address lines</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>TownName</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>City or town</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>CountrySubDivision</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>UAE emirate: <code data-v-bdc568a9${_scopeId2}>AbuDhabi</code>, <code data-v-bdc568a9${_scopeId2}>Dubai</code>, <code data-v-bdc568a9${_scopeId2}>Sharjah</code>, <code data-v-bdc568a9${_scopeId2}>Ajman</code>, <code data-v-bdc568a9${_scopeId2}>UmmAlQuwain</code>, <code data-v-bdc568a9${_scopeId2}>RasAlKhaimah</code>, <code data-v-bdc568a9${_scopeId2}>Fujairah</code></td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Country</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>ISO 3166-1 alpha-2 country code (e.g. <code data-v-bdc568a9${_scopeId2}>AE</code>)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>StreetName</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>Street name</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>BuildingNumber</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>Building number</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>BuildingName</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>Building name</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Floor</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>Floor within the building</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>DistrictName</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>District or neighbourhood</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>PostBox</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}>PO box</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>AddressType</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>No</td><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Business</code> or <code data-v-bdc568a9${_scopeId2}>Other</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "AddressLine")
                          ]),
                          createVNode("td", null, "string[]"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "1–7 free-form address lines")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TownName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "City or town")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CountrySubDivision")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("UAE emirate: "),
                            createVNode("code", null, "AbuDhabi"),
                            createTextVNode(", "),
                            createVNode("code", null, "Dubai"),
                            createTextVNode(", "),
                            createVNode("code", null, "Sharjah"),
                            createTextVNode(", "),
                            createVNode("code", null, "Ajman"),
                            createTextVNode(", "),
                            createVNode("code", null, "UmmAlQuwain"),
                            createTextVNode(", "),
                            createVNode("code", null, "RasAlKhaimah"),
                            createTextVNode(", "),
                            createVNode("code", null, "Fujairah")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Country")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("ISO 3166-1 alpha-2 country code (e.g. "),
                            createVNode("code", null, "AE"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "StreetName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Street name")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BuildingNumber")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Building number")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BuildingName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Building name")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Floor")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Floor within the building")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "DistrictName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "District or neighbourhood")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PostBox")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "PO box")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AddressType")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createVNode("code", null, "Business"),
                            createTextVNode(" or "),
                            createVNode("code", null, "Other")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>GeoLocation</code></h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}>Field</th><th data-v-bdc568a9${_scopeId2}>Type</th><th data-v-bdc568a9${_scopeId2}>Required</th><th data-v-bdc568a9${_scopeId2}>Description</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Latitude</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Latitude of the ATM</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Longitude</code></td><td data-v-bdc568a9${_scopeId2}>string</td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Longitude of the ATM</td></tr></tbody></table>`);
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
                            createVNode("code", null, "Latitude")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Latitude of the ATM")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Longitude")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Longitude of the ATM")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}>Optional fields</h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}>Field</th><th data-v-bdc568a9${_scopeId2}>Type</th><th data-v-bdc568a9${_scopeId2}>Description</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>SupportedLanguages</code></td><td data-v-bdc568a9${_scopeId2}>string[]</td><td data-v-bdc568a9${_scopeId2}>Languages supported on the ATM interface</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Services</code></td><td data-v-bdc568a9${_scopeId2}>string[]</td><td data-v-bdc568a9${_scopeId2}>Services available: <code data-v-bdc568a9${_scopeId2}>Balance</code>, <code data-v-bdc568a9${_scopeId2}>BillPayments</code>, <code data-v-bdc568a9${_scopeId2}>CashDeposits</code>, <code data-v-bdc568a9${_scopeId2}>CharityDonation</code>, <code data-v-bdc568a9${_scopeId2}>ChequeDeposits</code>, <code data-v-bdc568a9${_scopeId2}>CashWithdrawal</code>, <code data-v-bdc568a9${_scopeId2}>EnvelopeDeposit</code>, <code data-v-bdc568a9${_scopeId2}>FastCash</code>, <code data-v-bdc568a9${_scopeId2}>MobileBankingRegistration</code>, <code data-v-bdc568a9${_scopeId2}>MobilePaymentRegistration</code>, <code data-v-bdc568a9${_scopeId2}>MobilePhoneTopUp</code>, <code data-v-bdc568a9${_scopeId2}>OrderStatement</code>, <code data-v-bdc568a9${_scopeId2}>PINActivation</code>, <code data-v-bdc568a9${_scopeId2}>PINChange</code>, <code data-v-bdc568a9${_scopeId2}>PINUnblock</code>, <code data-v-bdc568a9${_scopeId2}>MiniStatement</code>, <code data-v-bdc568a9${_scopeId2}>Other</code>, or a namespaced extension value</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Accessibility</code></td><td data-v-bdc568a9${_scopeId2}>string[]</td><td data-v-bdc568a9${_scopeId2}>Accessibility features: <code data-v-bdc568a9${_scopeId2}>AudioCashMachine</code>, <code data-v-bdc568a9${_scopeId2}>AutomaticDoors</code>, <code data-v-bdc568a9${_scopeId2}>ExternalRamp</code>, <code data-v-bdc568a9${_scopeId2}>InductionLoop</code>, <code data-v-bdc568a9${_scopeId2}>InternalRamp</code>, <code data-v-bdc568a9${_scopeId2}>LevelAccess</code>, <code data-v-bdc568a9${_scopeId2}>LowerLevelCounter</code>, <code data-v-bdc568a9${_scopeId2}>WheelchairAccess</code>, <code data-v-bdc568a9${_scopeId2}>Other</code></td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>IsAccess24Hour</code></td><td data-v-bdc568a9${_scopeId2}>boolean</td><td data-v-bdc568a9${_scopeId2}>Whether the ATM is accessible 24 hours</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Availability</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Status</code> (<code data-v-bdc568a9${_scopeId2}>Available</code>, <code data-v-bdc568a9${_scopeId2}>Unavailable</code>, <code data-v-bdc568a9${_scopeId2}>UnderMaintenance</code>) and <code data-v-bdc568a9${_scopeId2}>OperatingHours</code> (array of <code data-v-bdc568a9${_scopeId2}>Days</code>, <code data-v-bdc568a9${_scopeId2}>OpenTime</code>, <code data-v-bdc568a9${_scopeId2}>CloseTime</code>)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>MinimumPossibleAmount</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}>Minimum transaction amount (<code data-v-bdc568a9${_scopeId2}>Amount</code> and <code data-v-bdc568a9${_scopeId2}>Currency</code>)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>MaximumPossibleAmount</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}>Maximum transaction amount (<code data-v-bdc568a9${_scopeId2}>Amount</code> and <code data-v-bdc568a9${_scopeId2}>Currency</code>)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Branch</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}>Associated branch identifier (<code data-v-bdc568a9${_scopeId2}>SchemeName</code>: <code data-v-bdc568a9${_scopeId2}>BICFI</code> or <code data-v-bdc568a9${_scopeId2}>Other</code>, and <code data-v-bdc568a9${_scopeId2}>Identification</code>)</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>ATMFee</code></td><td data-v-bdc568a9${_scopeId2}>array</td><td data-v-bdc568a9${_scopeId2}>Fee records — each requires <code data-v-bdc568a9${_scopeId2}>Type</code>; optionally includes <code data-v-bdc568a9${_scopeId2}>Amount</code>, <code data-v-bdc568a9${_scopeId2}>Percentage</code>, <code data-v-bdc568a9${_scopeId2}>ApplicableNetworks</code>, <code data-v-bdc568a9${_scopeId2}>Conditions</code></td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Notes</code></td><td data-v-bdc568a9${_scopeId2}>string[]</td><td data-v-bdc568a9${_scopeId2}>Free-text notes about the ATM</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Links</code></td><td data-v-bdc568a9${_scopeId2}>object</td><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>FeesUri</code> — URL to a full fee schedule</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SupportedLanguages")
                          ]),
                          createVNode("td", null, "string[]"),
                          createVNode("td", null, "Languages supported on the ATM interface")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Services")
                          ]),
                          createVNode("td", null, "string[]"),
                          createVNode("td", null, [
                            createTextVNode("Services available: "),
                            createVNode("code", null, "Balance"),
                            createTextVNode(", "),
                            createVNode("code", null, "BillPayments"),
                            createTextVNode(", "),
                            createVNode("code", null, "CashDeposits"),
                            createTextVNode(", "),
                            createVNode("code", null, "CharityDonation"),
                            createTextVNode(", "),
                            createVNode("code", null, "ChequeDeposits"),
                            createTextVNode(", "),
                            createVNode("code", null, "CashWithdrawal"),
                            createTextVNode(", "),
                            createVNode("code", null, "EnvelopeDeposit"),
                            createTextVNode(", "),
                            createVNode("code", null, "FastCash"),
                            createTextVNode(", "),
                            createVNode("code", null, "MobileBankingRegistration"),
                            createTextVNode(", "),
                            createVNode("code", null, "MobilePaymentRegistration"),
                            createTextVNode(", "),
                            createVNode("code", null, "MobilePhoneTopUp"),
                            createTextVNode(", "),
                            createVNode("code", null, "OrderStatement"),
                            createTextVNode(", "),
                            createVNode("code", null, "PINActivation"),
                            createTextVNode(", "),
                            createVNode("code", null, "PINChange"),
                            createTextVNode(", "),
                            createVNode("code", null, "PINUnblock"),
                            createTextVNode(", "),
                            createVNode("code", null, "MiniStatement"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other"),
                            createTextVNode(", or a namespaced extension value")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Accessibility")
                          ]),
                          createVNode("td", null, "string[]"),
                          createVNode("td", null, [
                            createTextVNode("Accessibility features: "),
                            createVNode("code", null, "AudioCashMachine"),
                            createTextVNode(", "),
                            createVNode("code", null, "AutomaticDoors"),
                            createTextVNode(", "),
                            createVNode("code", null, "ExternalRamp"),
                            createTextVNode(", "),
                            createVNode("code", null, "InductionLoop"),
                            createTextVNode(", "),
                            createVNode("code", null, "InternalRamp"),
                            createTextVNode(", "),
                            createVNode("code", null, "LevelAccess"),
                            createTextVNode(", "),
                            createVNode("code", null, "LowerLevelCounter"),
                            createTextVNode(", "),
                            createVNode("code", null, "WheelchairAccess"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsAccess24Hour")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether the ATM is accessible 24 hours")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Availability")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createVNode("code", null, "Status"),
                            createTextVNode(" ("),
                            createVNode("code", null, "Available"),
                            createTextVNode(", "),
                            createVNode("code", null, "Unavailable"),
                            createTextVNode(", "),
                            createVNode("code", null, "UnderMaintenance"),
                            createTextVNode(") and "),
                            createVNode("code", null, "OperatingHours"),
                            createTextVNode(" (array of "),
                            createVNode("code", null, "Days"),
                            createTextVNode(", "),
                            createVNode("code", null, "OpenTime"),
                            createTextVNode(", "),
                            createVNode("code", null, "CloseTime"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MinimumPossibleAmount")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Minimum transaction amount ("),
                            createVNode("code", null, "Amount"),
                            createTextVNode(" and "),
                            createVNode("code", null, "Currency"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "MaximumPossibleAmount")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Maximum transaction amount ("),
                            createVNode("code", null, "Amount"),
                            createTextVNode(" and "),
                            createVNode("code", null, "Currency"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Branch")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Associated branch identifier ("),
                            createVNode("code", null, "SchemeName"),
                            createTextVNode(": "),
                            createVNode("code", null, "BICFI"),
                            createTextVNode(" or "),
                            createVNode("code", null, "Other"),
                            createTextVNode(", and "),
                            createVNode("code", null, "Identification"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ATMFee")
                          ]),
                          createVNode("td", null, "array"),
                          createVNode("td", null, [
                            createTextVNode("Fee records — each requires "),
                            createVNode("code", null, "Type"),
                            createTextVNode("; optionally includes "),
                            createVNode("code", null, "Amount"),
                            createTextVNode(", "),
                            createVNode("code", null, "Percentage"),
                            createTextVNode(", "),
                            createVNode("code", null, "ApplicableNetworks"),
                            createTextVNode(", "),
                            createVNode("code", null, "Conditions")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Notes")
                          ]),
                          createVNode("td", null, "string[]"),
                          createVNode("td", null, "Free-text notes about the ATM")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Links")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createVNode("code", null, "FeesUri"),
                            createTextVNode(" — URL to a full fee schedule")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>ATMFee.Type</code> values</h5>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-bdc568a9${_scopeId2}>Withdrawal</code>, <code data-v-bdc568a9${_scopeId2}>BalanceInquiry</code>, <code data-v-bdc568a9${_scopeId2}>MiniStatement</code>, <code data-v-bdc568a9${_scopeId2}>PINChange</code>, <code data-v-bdc568a9${_scopeId2}>CashDeposit</code>, <code data-v-bdc568a9${_scopeId2}>CardlessWithdrawal</code>, <code data-v-bdc568a9${_scopeId2}>InternationalWithdrawal</code>, <code data-v-bdc568a9${_scopeId2}>CrossBankWithdrawal</code>, <code data-v-bdc568a9${_scopeId2}>OverLimit</code>, <code data-v-bdc568a9${_scopeId2}>DeclinedTransaction</code>, <code data-v-bdc568a9${_scopeId2}>EmergencyCashWithdrawal</code>, <code data-v-bdc568a9${_scopeId2}>ForeignATMUsage</code>, <code data-v-bdc568a9${_scopeId2}>ServiceDenial</code>, <code data-v-bdc568a9${_scopeId2}>FastCashWithdrawal</code>, <code data-v-bdc568a9${_scopeId2}>NetworkSurcharge</code>, <code data-v-bdc568a9${_scopeId2}>ForeignExchange</code>, <code data-v-bdc568a9${_scopeId2}>DomesticCrossBank</code>, <code data-v-bdc568a9${_scopeId2}>InternationalCrossBank</code>, <code data-v-bdc568a9${_scopeId2}>Other</code>`);
                } else {
                  return [
                    createVNode("code", null, "Withdrawal"),
                    createTextVNode(", "),
                    createVNode("code", null, "BalanceInquiry"),
                    createTextVNode(", "),
                    createVNode("code", null, "MiniStatement"),
                    createTextVNode(", "),
                    createVNode("code", null, "PINChange"),
                    createTextVNode(", "),
                    createVNode("code", null, "CashDeposit"),
                    createTextVNode(", "),
                    createVNode("code", null, "CardlessWithdrawal"),
                    createTextVNode(", "),
                    createVNode("code", null, "InternationalWithdrawal"),
                    createTextVNode(", "),
                    createVNode("code", null, "CrossBankWithdrawal"),
                    createTextVNode(", "),
                    createVNode("code", null, "OverLimit"),
                    createTextVNode(", "),
                    createVNode("code", null, "DeclinedTransaction"),
                    createTextVNode(", "),
                    createVNode("code", null, "EmergencyCashWithdrawal"),
                    createTextVNode(", "),
                    createVNode("code", null, "ForeignATMUsage"),
                    createTextVNode(", "),
                    createVNode("code", null, "ServiceDenial"),
                    createTextVNode(", "),
                    createVNode("code", null, "FastCashWithdrawal"),
                    createTextVNode(", "),
                    createVNode("code", null, "NetworkSurcharge"),
                    createTextVNode(", "),
                    createVNode("code", null, "ForeignExchange"),
                    createTextVNode(", "),
                    createVNode("code", null, "DomesticCrossBank"),
                    createTextVNode(", "),
                    createVNode("code", null, "InternationalCrossBank"),
                    createTextVNode(", "),
                    createVNode("code", null, "Other")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>meta</code></h4>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}>Field</th><th data-v-bdc568a9${_scopeId2}>Type</th><th data-v-bdc568a9${_scopeId2}>Required</th><th data-v-bdc568a9${_scopeId2}>Description</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>LastUpdatedDateTime</code></td><td data-v-bdc568a9${_scopeId2}>string (date-time)</td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Timestamp of the most recent update to the ATM data</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>TotalRecords</code></td><td data-v-bdc568a9${_scopeId2}>integer</td><td data-v-bdc568a9${_scopeId2}>Yes</td><td data-v-bdc568a9${_scopeId2}>Total number of ATM records returned</td></tr></tbody></table>`);
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
                            createVNode("code", null, "LastUpdatedDateTime")
                          ]),
                          createVNode("td", null, "string (date-time)"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Timestamp of the most recent update to the ATM data")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TotalRecords")
                          ]),
                          createVNode("td", null, "integer"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Total number of ATM records returned")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-bdc568a9${_scopeId}>Example response</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleResponse,
              lang: "json",
              filename: "200 OK"
            }, null, _parent2, _scopeId));
            _push2(`<h4 class="ed-doc__subhead ed-doc__subhead--small" data-v-bdc568a9${_scopeId}>Error responses</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Only return an error when the Hub&#39;s request itself is invalid or a server condition prevents you from responding. All error bodies must include <code data-v-bdc568a9${_scopeId2}>errorCode</code> and <code data-v-bdc568a9${_scopeId2}>errorMessage</code>. `);
                } else {
                  return [
                    createTextVNode(" Only return an error when the Hub's request itself is invalid or a server condition prevents you from responding. All error bodies must include "),
                    createVNode("code", null, "errorCode"),
                    createTextVNode(" and "),
                    createVNode("code", null, "errorMessage"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>400</code> — Bad request</h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>errorCode</code></th><th data-v-bdc568a9${_scopeId2}>When to use</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Body.InvalidFormat</code></td><td data-v-bdc568a9${_scopeId2}>Request is malformed or does not match the schema</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>Resource.InvalidFormat</code></td><td data-v-bdc568a9${_scopeId2}>A request parameter is present but syntactically invalid</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>GenericRecoverableError</code></td><td data-v-bdc568a9${_scopeId2}>Recoverable validation error not covered above — Hub may retry</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>GenericError</code></td><td data-v-bdc568a9${_scopeId2}>Unrecoverable validation error not covered above</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Body.InvalidFormat")
                          ]),
                          createVNode("td", null, "Request is malformed or does not match the schema")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Resource.InvalidFormat")
                          ]),
                          createVNode("td", null, "A request parameter is present but syntactically invalid")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericRecoverableError")
                          ]),
                          createVNode("td", null, "Recoverable validation error not covered above — Hub may retry")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericError")
                          ]),
                          createVNode("td", null, "Unrecoverable validation error not covered above")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>403</code> — Forbidden</h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>errorCode</code></th><th data-v-bdc568a9${_scopeId2}>When to use</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>AccessToken.InvalidScope</code></td><td data-v-bdc568a9${_scopeId2}>The Hub&#39;s token does not include the required scope</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>GenericRecoverableError</code></td><td data-v-bdc568a9${_scopeId2}>Recoverable access failure not covered above</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>GenericError</code></td><td data-v-bdc568a9${_scopeId2}>Unrecoverable access failure not covered above</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "AccessToken.InvalidScope")
                          ]),
                          createVNode("td", null, "The Hub's token does not include the required scope")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericRecoverableError")
                          ]),
                          createVNode("td", null, "Recoverable access failure not covered above")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericError")
                          ]),
                          createVNode("td", null, "Unrecoverable access failure not covered above")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h5 class="ed-doc__subhead ed-doc__subhead--xs" data-v-bdc568a9${_scopeId}><code data-v-bdc568a9${_scopeId}>500</code> — Internal server error</h5>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-bdc568a9${_scopeId2}><thead data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><th data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>errorCode</code></th><th data-v-bdc568a9${_scopeId2}>When to use</th></tr></thead><tbody data-v-bdc568a9${_scopeId2}><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>GenericRecoverableError</code></td><td data-v-bdc568a9${_scopeId2}>Transient server error — Hub may retry after a delay</td></tr><tr data-v-bdc568a9${_scopeId2}><td data-v-bdc568a9${_scopeId2}><code data-v-bdc568a9${_scopeId2}>GenericError</code></td><td data-v-bdc568a9${_scopeId2}>Unrecoverable server error</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "errorCode")
                          ]),
                          createVNode("th", null, "When to use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericRecoverableError")
                          ]),
                          createVNode("td", null, "Transient server error — Hub may retry after a delay")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "GenericError")
                          ]),
                          createVNode("td", null, "Unrecoverable server error")
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
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/atm")
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
                  createTextVNode(" with a "),
                  createVNode("code", null, "data"),
                  createTextVNode(" array containing one record per ATM. Return an empty array if no ATMs are registered — do not return "),
                  createVNode("code", null, "404"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "data[]"),
                createTextVNode(" — ATM record")
              ]),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, "Required fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LFIId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Your LFI identifier as registered in the Hub (1–36 characters)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LFIBrandId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Brand identifier for the LFI (1–140 characters)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ATMId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Unique identifier for the ATM (1–36 characters)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SupportedCurrencies")
                        ]),
                        createVNode("td", null, "string[]"),
                        createVNode("td", null, "ISO 4217 currency codes the ATM dispenses or accepts (at least one required)")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Location")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Physical location of the ATM — see below")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, [
                createVNode("code", null, "Location")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Both "),
                  createVNode("code", null, "PostalAddress"),
                  createTextVNode(" and "),
                  createVNode("code", null, "GeoLocation"),
                  createTextVNode(" are required.")
                ]),
                _: 1
              }),
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
                          createVNode("code", null, "PostalAddress")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Structured postal address — see below")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GeoLocation")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "GPS coordinates — see below")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LocationCategory")
                        ]),
                        createVNode("td", null, "string[]"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("One or more of: "),
                          createVNode("code", null, "BranchExternal"),
                          createTextVNode(", "),
                          createVNode("code", null, "BranchInternal"),
                          createTextVNode(", "),
                          createVNode("code", null, "BranchLobby"),
                          createTextVNode(", "),
                          createVNode("code", null, "RetailerOutlet"),
                          createTextVNode(", "),
                          createVNode("code", null, "RemoteUnit"),
                          createTextVNode(", "),
                          createVNode("code", null, "DriveThru"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Site")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createVNode("code", null, "Identification"),
                          createTextVNode(" and "),
                          createVNode("code", null, "Name"),
                          createTextVNode(" of the site")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, [
                createVNode("code", null, "PostalAddress")
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
                          createVNode("code", null, "AddressLine")
                        ]),
                        createVNode("td", null, "string[]"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "1–7 free-form address lines")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TownName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "City or town")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CountrySubDivision")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("UAE emirate: "),
                          createVNode("code", null, "AbuDhabi"),
                          createTextVNode(", "),
                          createVNode("code", null, "Dubai"),
                          createTextVNode(", "),
                          createVNode("code", null, "Sharjah"),
                          createTextVNode(", "),
                          createVNode("code", null, "Ajman"),
                          createTextVNode(", "),
                          createVNode("code", null, "UmmAlQuwain"),
                          createTextVNode(", "),
                          createVNode("code", null, "RasAlKhaimah"),
                          createTextVNode(", "),
                          createVNode("code", null, "Fujairah")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Country")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("ISO 3166-1 alpha-2 country code (e.g. "),
                          createVNode("code", null, "AE"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "StreetName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Street name")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BuildingNumber")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Building number")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BuildingName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Building name")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Floor")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Floor within the building")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "DistrictName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "District or neighbourhood")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PostBox")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "PO box")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AddressType")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createVNode("code", null, "Business"),
                          createTextVNode(" or "),
                          createVNode("code", null, "Other")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, [
                createVNode("code", null, "GeoLocation")
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
                          createVNode("code", null, "Latitude")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Latitude of the ATM")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Longitude")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Longitude of the ATM")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, "Optional fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SupportedLanguages")
                        ]),
                        createVNode("td", null, "string[]"),
                        createVNode("td", null, "Languages supported on the ATM interface")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Services")
                        ]),
                        createVNode("td", null, "string[]"),
                        createVNode("td", null, [
                          createTextVNode("Services available: "),
                          createVNode("code", null, "Balance"),
                          createTextVNode(", "),
                          createVNode("code", null, "BillPayments"),
                          createTextVNode(", "),
                          createVNode("code", null, "CashDeposits"),
                          createTextVNode(", "),
                          createVNode("code", null, "CharityDonation"),
                          createTextVNode(", "),
                          createVNode("code", null, "ChequeDeposits"),
                          createTextVNode(", "),
                          createVNode("code", null, "CashWithdrawal"),
                          createTextVNode(", "),
                          createVNode("code", null, "EnvelopeDeposit"),
                          createTextVNode(", "),
                          createVNode("code", null, "FastCash"),
                          createTextVNode(", "),
                          createVNode("code", null, "MobileBankingRegistration"),
                          createTextVNode(", "),
                          createVNode("code", null, "MobilePaymentRegistration"),
                          createTextVNode(", "),
                          createVNode("code", null, "MobilePhoneTopUp"),
                          createTextVNode(", "),
                          createVNode("code", null, "OrderStatement"),
                          createTextVNode(", "),
                          createVNode("code", null, "PINActivation"),
                          createTextVNode(", "),
                          createVNode("code", null, "PINChange"),
                          createTextVNode(", "),
                          createVNode("code", null, "PINUnblock"),
                          createTextVNode(", "),
                          createVNode("code", null, "MiniStatement"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other"),
                          createTextVNode(", or a namespaced extension value")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Accessibility")
                        ]),
                        createVNode("td", null, "string[]"),
                        createVNode("td", null, [
                          createTextVNode("Accessibility features: "),
                          createVNode("code", null, "AudioCashMachine"),
                          createTextVNode(", "),
                          createVNode("code", null, "AutomaticDoors"),
                          createTextVNode(", "),
                          createVNode("code", null, "ExternalRamp"),
                          createTextVNode(", "),
                          createVNode("code", null, "InductionLoop"),
                          createTextVNode(", "),
                          createVNode("code", null, "InternalRamp"),
                          createTextVNode(", "),
                          createVNode("code", null, "LevelAccess"),
                          createTextVNode(", "),
                          createVNode("code", null, "LowerLevelCounter"),
                          createTextVNode(", "),
                          createVNode("code", null, "WheelchairAccess"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsAccess24Hour")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether the ATM is accessible 24 hours")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Availability")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createVNode("code", null, "Status"),
                          createTextVNode(" ("),
                          createVNode("code", null, "Available"),
                          createTextVNode(", "),
                          createVNode("code", null, "Unavailable"),
                          createTextVNode(", "),
                          createVNode("code", null, "UnderMaintenance"),
                          createTextVNode(") and "),
                          createVNode("code", null, "OperatingHours"),
                          createTextVNode(" (array of "),
                          createVNode("code", null, "Days"),
                          createTextVNode(", "),
                          createVNode("code", null, "OpenTime"),
                          createTextVNode(", "),
                          createVNode("code", null, "CloseTime"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MinimumPossibleAmount")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Minimum transaction amount ("),
                          createVNode("code", null, "Amount"),
                          createTextVNode(" and "),
                          createVNode("code", null, "Currency"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "MaximumPossibleAmount")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Maximum transaction amount ("),
                          createVNode("code", null, "Amount"),
                          createTextVNode(" and "),
                          createVNode("code", null, "Currency"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Branch")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Associated branch identifier ("),
                          createVNode("code", null, "SchemeName"),
                          createTextVNode(": "),
                          createVNode("code", null, "BICFI"),
                          createTextVNode(" or "),
                          createVNode("code", null, "Other"),
                          createTextVNode(", and "),
                          createVNode("code", null, "Identification"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ATMFee")
                        ]),
                        createVNode("td", null, "array"),
                        createVNode("td", null, [
                          createTextVNode("Fee records — each requires "),
                          createVNode("code", null, "Type"),
                          createTextVNode("; optionally includes "),
                          createVNode("code", null, "Amount"),
                          createTextVNode(", "),
                          createVNode("code", null, "Percentage"),
                          createTextVNode(", "),
                          createVNode("code", null, "ApplicableNetworks"),
                          createTextVNode(", "),
                          createVNode("code", null, "Conditions")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Notes")
                        ]),
                        createVNode("td", null, "string[]"),
                        createVNode("td", null, "Free-text notes about the ATM")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Links")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createVNode("code", null, "FeesUri"),
                          createTextVNode(" — URL to a full fee schedule")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, [
                createVNode("code", null, "ATMFee.Type"),
                createTextVNode(" values")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Withdrawal"),
                  createTextVNode(", "),
                  createVNode("code", null, "BalanceInquiry"),
                  createTextVNode(", "),
                  createVNode("code", null, "MiniStatement"),
                  createTextVNode(", "),
                  createVNode("code", null, "PINChange"),
                  createTextVNode(", "),
                  createVNode("code", null, "CashDeposit"),
                  createTextVNode(", "),
                  createVNode("code", null, "CardlessWithdrawal"),
                  createTextVNode(", "),
                  createVNode("code", null, "InternationalWithdrawal"),
                  createTextVNode(", "),
                  createVNode("code", null, "CrossBankWithdrawal"),
                  createTextVNode(", "),
                  createVNode("code", null, "OverLimit"),
                  createTextVNode(", "),
                  createVNode("code", null, "DeclinedTransaction"),
                  createTextVNode(", "),
                  createVNode("code", null, "EmergencyCashWithdrawal"),
                  createTextVNode(", "),
                  createVNode("code", null, "ForeignATMUsage"),
                  createTextVNode(", "),
                  createVNode("code", null, "ServiceDenial"),
                  createTextVNode(", "),
                  createVNode("code", null, "FastCashWithdrawal"),
                  createTextVNode(", "),
                  createVNode("code", null, "NetworkSurcharge"),
                  createTextVNode(", "),
                  createVNode("code", null, "ForeignExchange"),
                  createTextVNode(", "),
                  createVNode("code", null, "DomesticCrossBank"),
                  createTextVNode(", "),
                  createVNode("code", null, "InternationalCrossBank"),
                  createTextVNode(", "),
                  createVNode("code", null, "Other")
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, [
                createVNode("code", null, "meta")
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
                          createVNode("code", null, "LastUpdatedDateTime")
                        ]),
                        createVNode("td", null, "string (date-time)"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Timestamp of the most recent update to the ATM data")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TotalRecords")
                        ]),
                        createVNode("td", null, "integer"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Total number of ATM records returned")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Example response"),
              createVNode(_component_EdCode, {
                code: exampleResponse,
                lang: "json",
                filename: "200 OK"
              }),
              createVNode("h4", { class: "ed-doc__subhead ed-doc__subhead--small" }, "Error responses"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Only return an error when the Hub's request itself is invalid or a server condition prevents you from responding. All error bodies must include "),
                  createVNode("code", null, "errorCode"),
                  createTextVNode(" and "),
                  createVNode("code", null, "errorMessage"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, [
                createVNode("code", null, "400"),
                createTextVNode(" — Bad request")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Body.InvalidFormat")
                        ]),
                        createVNode("td", null, "Request is malformed or does not match the schema")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Resource.InvalidFormat")
                        ]),
                        createVNode("td", null, "A request parameter is present but syntactically invalid")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericRecoverableError")
                        ]),
                        createVNode("td", null, "Recoverable validation error not covered above — Hub may retry")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericError")
                        ]),
                        createVNode("td", null, "Unrecoverable validation error not covered above")
                      ])
                    ])
                  ])
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
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "AccessToken.InvalidScope")
                        ]),
                        createVNode("td", null, "The Hub's token does not include the required scope")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericRecoverableError")
                        ]),
                        createVNode("td", null, "Recoverable access failure not covered above")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericError")
                        ]),
                        createVNode("td", null, "Unrecoverable access failure not covered above")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h5", { class: "ed-doc__subhead ed-doc__subhead--xs" }, [
                createVNode("code", null, "500"),
                createTextVNode(" — Internal server error")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "errorCode")
                        ]),
                        createVNode("th", null, "When to use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericRecoverableError")
                        ]),
                        createVNode("td", null, "Transient server error — Hub may retry after a delay")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "GenericError")
                        ]),
                        createVNode("td", null, "Unrecoverable server error")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/atms/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bdc568a9"]]);
export {
  apiGuide as default
};
