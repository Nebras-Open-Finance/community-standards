import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_5 } from "./Carousel-BiOyohqq.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const aiExample = `{
  "AccountSubType": ["CurrentAccount", "Savings", "CreditCard"],
  "OverLimitFees": "0.50"
}`;
const paymentExample = `{
  "SingleInstantPayment": {
    "Supported": true
  },
  "FixedDefinedSchedule": {
    "Supported": true
  },
  "VariableDefinedSchedule": {
    "Supported": false
  },
  "FixedPeriodicSchedule": {
    "Supported": true
  },
  "VariablePeriodicSchedule": {
    "Supported": false
  },
  "FixedOnDemand": {
    "Supported": true
  },
  "VariableOnDemand": {
    "SingleBeneficiarySupported": true,
    "MultipleBeneficiariesSupported": true,
    "OpenBeneficiariesSupported": false
  },
  "DelegatedAuthentication": {
    "SingleBeneficiarySupported": true,
    "MultipleBeneficiariesSupported": false,
    "OpenBeneficiariesSupported": false
  }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "meta",
  __ssrInlineRender: true,
  setup(__props) {
    const images1 = [
      { src: new URL("/images/raidiam/add-api/15.png", import.meta.url).href, alt: "Step 1", title: "Click the actions menu and select Configure API Metadata" },
      { src: new URL("/images/raidiam/add-api/16.png", import.meta.url).href, alt: "Step 2", title: "Enter the metadata fields for the API family | The example shown is account-information with Account Sub Types set to CurrentAccount Savings CreditCard" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_Carousel = __unplugin_components_5;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      const _component_EdProse = __unplugin_components_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-f3e1e066><section class="ed-doc__hero" data-v-f3e1e066><div class="ed-doc__inner" data-v-f3e1e066><div class="ed-doc__eyebrow" data-v-f3e1e066><span class="ed-doc__eyebrow-dash" data-v-f3e1e066></span> LFI · Trust Framework · Servers · API Resources </div><h1 class="ed-doc__title" data-v-f3e1e066> Meta Data <span class="ed-doc__read" data-v-f3e1e066>4 min read</span></h1><p class="ed-doc__lede" data-v-f3e1e066> Each API resource registered in the Trust Framework carries a metadata schema specific to its API family. These metadata fields are surfaced in the directory and via <a href="/tech/tpp-standards/trust-framework/open-api/participants" class="endpoint" data-v-f3e1e066><span class="http-method http-method--get" data-v-f3e1e066>GET</span><code data-v-f3e1e066>/participants</code></a>, allowing TPPs to discover your institution&#39;s capabilities and configuration. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-f3e1e066> The metadata schemas described below correspond to version <strong data-v-f3e1e066>2.1</strong> of the Open Finance UAE standards. The full schema definitions can be retrieved programmatically via <a href="/tech/lfi-api-hub/trust-framework/api/api-families" class="endpoint" data-v-f3e1e066><span class="http-method http-method--get" data-v-f3e1e066>GET</span><code data-v-f3e1e066>/references/apifamilies</code></a>. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "configuring",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Configuring Metadata",
        title: "Where to enter values in the directory",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol class="ed-doc__substeps" data-v-f3e1e066${_scopeId}><li data-v-f3e1e066${_scopeId}>Click the actions menu on the API resource and select <strong data-v-f3e1e066${_scopeId}>Configure API Metadata</strong>.</li><li data-v-f3e1e066${_scopeId}>Enter the metadata fields for the API family. The required fields vary per family — see the sections below for details.</li></ol>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Carousel, { images: images1 }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Carousel, { images: images1 })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("ol", { class: "ed-doc__substeps" }, [
                createVNode("li", null, [
                  createTextVNode("Click the actions menu on the API resource and select "),
                  createVNode("strong", null, "Configure API Metadata"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, "Enter the metadata fields for the API family. The required fields vary per family — see the sections below for details.")
              ]),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode(_component_Carousel, { images: images1 })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "account-information",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "account-information",
        title: "Banking data sharing metadata",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f3e1e066${_scopeId2}><thead data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><th data-v-f3e1e066${_scopeId2}>Field</th><th data-v-f3e1e066${_scopeId2}>Required</th><th data-v-f3e1e066${_scopeId2}>Type</th><th data-v-f3e1e066${_scopeId2}>Description</th></tr></thead><tbody data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>AccountSubType</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>array</code></td><td data-v-f3e1e066${_scopeId2}>Account sub-types supported for data sharing. One or more of: <code data-v-f3e1e066${_scopeId2}>CurrentAccount</code>, <code data-v-f3e1e066${_scopeId2}>Savings</code>, <code data-v-f3e1e066${_scopeId2}>CreditCard</code>, <code data-v-f3e1e066${_scopeId2}>Mortgage</code>, <code data-v-f3e1e066${_scopeId2}>Finance</code></td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>OverLimitFees</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The cost per API call (in AED) for each data sharing transactional data request when usage limits have been exceeded (15 pages per customer per day for attended calls, or 5 pages per customer per day for unattended calls). Format: up to 16 digits with 2 decimal places (e.g. <code data-v-f3e1e066${_scopeId2}>0.50</code>)</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>DeprecationDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>RetirementDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "AccountSubType")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "array")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Account sub-types supported for data sharing. One or more of: "),
                            createVNode("code", null, "CurrentAccount"),
                            createTextVNode(", "),
                            createVNode("code", null, "Savings"),
                            createTextVNode(", "),
                            createVNode("code", null, "CreditCard"),
                            createTextVNode(", "),
                            createVNode("code", null, "Mortgage"),
                            createTextVNode(", "),
                            createVNode("code", null, "Finance")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "OverLimitFees")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The cost per API call (in AED) for each data sharing transactional data request when usage limits have been exceeded (15 pages per customer per day for attended calls, or 5 pages per customer per day for unattended calls). Format: up to 16 digits with 2 decimal places (e.g. "),
                            createVNode("code", null, "0.50"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "DeprecationDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "RetirementDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e1e066${_scopeId}>Example</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: aiExample,
              lang: "json",
              filename: "account-information metadata"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "AccountSubType")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "array")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Account sub-types supported for data sharing. One or more of: "),
                          createVNode("code", null, "CurrentAccount"),
                          createTextVNode(", "),
                          createVNode("code", null, "Savings"),
                          createTextVNode(", "),
                          createVNode("code", null, "CreditCard"),
                          createTextVNode(", "),
                          createVNode("code", null, "Mortgage"),
                          createTextVNode(", "),
                          createVNode("code", null, "Finance")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "OverLimitFees")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The cost per API call (in AED) for each data sharing transactional data request when usage limits have been exceeded (15 pages per customer per day for attended calls, or 5 pages per customer per day for unattended calls). Format: up to 16 digits with 2 decimal places (e.g. "),
                          createVNode("code", null, "0.50"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "DeprecationDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "RetirementDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Example"),
              createVNode(_component_EdCode, {
                code: aiExample,
                lang: "json",
                filename: "account-information metadata"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "payment",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "payment",
        title: "Payment Initiation metadata — declare supported types and consent models",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-f3e1e066${_scopeId2}>payment</code> family declares which payment types and consent models your institution supports. <strong data-v-f3e1e066${_scopeId2}>All payment type fields are required</strong> — set <code data-v-f3e1e066${_scopeId2}>Supported</code> to <code data-v-f3e1e066${_scopeId2}>false</code> for payment types you do not support. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "payment"),
                    createTextVNode(" family declares which payment types and consent models your institution supports. "),
                    createVNode("strong", null, "All payment type fields are required"),
                    createTextVNode(" — set "),
                    createVNode("code", null, "Supported"),
                    createTextVNode(" to "),
                    createVNode("code", null, "false"),
                    createTextVNode(" for payment types you do not support. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e1e066${_scopeId}>Simple payment types</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`These payment types require a single <code data-v-f3e1e066${_scopeId2}>Supported</code> boolean:`);
                } else {
                  return [
                    createTextVNode("These payment types require a single "),
                    createVNode("code", null, "Supported"),
                    createTextVNode(" boolean:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f3e1e066${_scopeId2}><thead data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><th data-v-f3e1e066${_scopeId2}>Field</th><th data-v-f3e1e066${_scopeId2}>Required</th><th data-v-f3e1e066${_scopeId2}>Description</th></tr></thead><tbody data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>SingleInstantPayment.Supported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if single instant payments are supported</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>FixedDefinedSchedule.Supported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if fixed amount payments on a defined schedule are supported</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>VariableDefinedSchedule.Supported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if variable amount payments on a defined schedule are supported</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>FixedPeriodicSchedule.Supported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if fixed amount periodic payments are supported</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>VariablePeriodicSchedule.Supported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if variable amount periodic payments are supported</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>FixedOnDemand.Supported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if fixed amount on-demand payments are supported</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "SingleInstantPayment.Supported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if single instant payments are supported")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "FixedDefinedSchedule.Supported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if fixed amount payments on a defined schedule are supported")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "VariableDefinedSchedule.Supported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if variable amount payments on a defined schedule are supported")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "FixedPeriodicSchedule.Supported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if fixed amount periodic payments are supported")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "VariablePeriodicSchedule.Supported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if variable amount periodic payments are supported")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "FixedOnDemand.Supported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if fixed amount on-demand payments are supported")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e1e066${_scopeId}>Beneficiary-aware payment types</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` These payment types require additional detail about which beneficiary models are supported: `);
                } else {
                  return [
                    createTextVNode(" These payment types require additional detail about which beneficiary models are supported: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f3e1e066${_scopeId2}><thead data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><th data-v-f3e1e066${_scopeId2}>Field</th><th data-v-f3e1e066${_scopeId2}>Required</th><th data-v-f3e1e066${_scopeId2}>Description</th></tr></thead><tbody data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>VariableOnDemand.SingleBeneficiarySupported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if variable on-demand consents support a single beneficiary</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>VariableOnDemand.MultipleBeneficiariesSupported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if variable on-demand consents support multiple beneficiaries (2–10)</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>VariableOnDemand.OpenBeneficiariesSupported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if variable on-demand consents support unrestricted beneficiaries defined at the point of payment</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>DelegatedAuthentication.SingleBeneficiarySupported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if delegated authentication consents support a single beneficiary</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>DelegatedAuthentication.MultipleBeneficiariesSupported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if delegated authentication consents support multiple beneficiaries (2–10)</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>DelegatedAuthentication.OpenBeneficiariesSupported</strong></td><td data-v-f3e1e066${_scopeId2}>Yes</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>true</code> if delegated authentication consents support unrestricted beneficiaries defined at the point of payment</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "VariableOnDemand.SingleBeneficiarySupported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if variable on-demand consents support a single beneficiary")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "VariableOnDemand.MultipleBeneficiariesSupported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if variable on-demand consents support multiple beneficiaries (2–10)")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "VariableOnDemand.OpenBeneficiariesSupported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if variable on-demand consents support unrestricted beneficiaries defined at the point of payment")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "DelegatedAuthentication.SingleBeneficiarySupported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if delegated authentication consents support a single beneficiary")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "DelegatedAuthentication.MultipleBeneficiariesSupported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if delegated authentication consents support multiple beneficiaries (2–10)")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "DelegatedAuthentication.OpenBeneficiariesSupported")
                          ]),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createVNode("code", null, "true"),
                            createTextVNode(" if delegated authentication consents support unrestricted beneficiaries defined at the point of payment")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e1e066${_scopeId}>Lifecycle fields</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f3e1e066${_scopeId2}><thead data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><th data-v-f3e1e066${_scopeId2}>Field</th><th data-v-f3e1e066${_scopeId2}>Required</th><th data-v-f3e1e066${_scopeId2}>Type</th><th data-v-f3e1e066${_scopeId2}>Description</th></tr></thead><tbody data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>DeprecationDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>RetirementDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "DeprecationDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "RetirementDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e1e066${_scopeId}>Example</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: paymentExample,
              lang: "json",
              filename: "payment metadata"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "payment"),
                  createTextVNode(" family declares which payment types and consent models your institution supports. "),
                  createVNode("strong", null, "All payment type fields are required"),
                  createTextVNode(" — set "),
                  createVNode("code", null, "Supported"),
                  createTextVNode(" to "),
                  createVNode("code", null, "false"),
                  createTextVNode(" for payment types you do not support. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Simple payment types"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("These payment types require a single "),
                  createVNode("code", null, "Supported"),
                  createTextVNode(" boolean:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "SingleInstantPayment.Supported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if single instant payments are supported")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "FixedDefinedSchedule.Supported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if fixed amount payments on a defined schedule are supported")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "VariableDefinedSchedule.Supported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if variable amount payments on a defined schedule are supported")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "FixedPeriodicSchedule.Supported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if fixed amount periodic payments are supported")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "VariablePeriodicSchedule.Supported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if variable amount periodic payments are supported")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "FixedOnDemand.Supported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if fixed amount on-demand payments are supported")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Beneficiary-aware payment types"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" These payment types require additional detail about which beneficiary models are supported: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "VariableOnDemand.SingleBeneficiarySupported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if variable on-demand consents support a single beneficiary")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "VariableOnDemand.MultipleBeneficiariesSupported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if variable on-demand consents support multiple beneficiaries (2–10)")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "VariableOnDemand.OpenBeneficiariesSupported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if variable on-demand consents support unrestricted beneficiaries defined at the point of payment")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "DelegatedAuthentication.SingleBeneficiarySupported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if delegated authentication consents support a single beneficiary")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "DelegatedAuthentication.MultipleBeneficiariesSupported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if delegated authentication consents support multiple beneficiaries (2–10)")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "DelegatedAuthentication.OpenBeneficiariesSupported")
                        ]),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createVNode("code", null, "true"),
                          createTextVNode(" if delegated authentication consents support unrestricted beneficiaries defined at the point of payment")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Lifecycle fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "DeprecationDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "RetirementDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Example"),
              createVNode(_component_EdCode, {
                code: paymentExample,
                lang: "json",
                filename: "payment metadata"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "confirmation",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "confirmation",
        title: "Confirmation of Payee metadata — lifecycle fields only",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f3e1e066${_scopeId2}><thead data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><th data-v-f3e1e066${_scopeId2}>Field</th><th data-v-f3e1e066${_scopeId2}>Required</th><th data-v-f3e1e066${_scopeId2}>Type</th><th data-v-f3e1e066${_scopeId2}>Description</th></tr></thead><tbody data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>DeprecationDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>RetirementDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "DeprecationDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "RetirementDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
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
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "DeprecationDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "RetirementDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
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
        id: "atm",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "atm",
        title: "ATM metadata — lifecycle fields only",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f3e1e066${_scopeId2}><thead data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><th data-v-f3e1e066${_scopeId2}>Field</th><th data-v-f3e1e066${_scopeId2}>Required</th><th data-v-f3e1e066${_scopeId2}>Type</th><th data-v-f3e1e066${_scopeId2}>Description</th></tr></thead><tbody data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>DeprecationDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>RetirementDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "DeprecationDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "RetirementDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
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
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "DeprecationDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "RetirementDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
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
        id: "product",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "product",
        title: "Products & Leads metadata — lifecycle fields only",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f3e1e066${_scopeId2}><thead data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><th data-v-f3e1e066${_scopeId2}>Field</th><th data-v-f3e1e066${_scopeId2}>Required</th><th data-v-f3e1e066${_scopeId2}>Type</th><th data-v-f3e1e066${_scopeId2}>Description</th></tr></thead><tbody data-v-f3e1e066${_scopeId2}><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>DeprecationDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date</td></tr><tr data-v-f3e1e066${_scopeId2}><td data-v-f3e1e066${_scopeId2}><strong data-v-f3e1e066${_scopeId2}>RetirementDate</strong></td><td data-v-f3e1e066${_scopeId2}>Optional</td><td data-v-f3e1e066${_scopeId2}><code data-v-f3e1e066${_scopeId2}>string</code></td><td data-v-f3e1e066${_scopeId2}>The date (<code data-v-f3e1e066${_scopeId2}>YYYY-MM-DD</code>) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "DeprecationDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "RetirementDate")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, [
                            createVNode("code", null, "string")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The date ("),
                            createVNode("code", null, "YYYY-MM-DD"),
                            createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
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
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "DeprecationDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "RetirementDate")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, [
                          createVNode("code", null, "string")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The date ("),
                          createVNode("code", null, "YYYY-MM-DD"),
                          createTextVNode(") on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/trust-framework/servers/api/meta.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const meta = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f3e1e066"]]);
export {
  meta as default
};
