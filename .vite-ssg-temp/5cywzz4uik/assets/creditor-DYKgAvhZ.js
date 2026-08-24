import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const invalidConsentJson = `{
  "data": {
    "status": "invalid",
    "code": "InvalidCreditor",
    "description": "Creditor validation failed: <reason>."
  },
  "meta": {}
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "creditor",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-1a66ab9a><section class="ed-doc__hero" data-v-1a66ab9a><div class="ed-doc__inner" data-v-1a66ab9a><div class="ed-doc__eyebrow" data-v-1a66ab9a><span class="ed-doc__eyebrow-dash" data-v-1a66ab9a></span> LFI · Banking · Service Initiation · PII </div><h1 class="ed-doc__title" data-v-1a66ab9a> Creditor <span class="ed-doc__read" data-v-1a66ab9a>2 min read</span></h1><p class="ed-doc__lede" data-v-1a66ab9a> At consent validation — <span class="endpoint" data-v-1a66ab9a><span class="http-method http-method--post" data-v-1a66ab9a>POST</span><code data-v-1a66ab9a>/consent/action/validate</code></span> — the LFI MUST validate <code data-v-1a66ab9a>Initiation.Creditor</code> in the decrypted PII against three concerns: </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "overview",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Overview",
        title: "Three concerns the LFI MUST check",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-1a66ab9a${_scopeId2}><strong data-v-1a66ab9a${_scopeId2}>Cardinality</strong> — the shape of <code data-v-1a66ab9a${_scopeId2}>Initiation.Creditor</code> matches a beneficiary model permitted by the requested payment type.</li><li data-v-1a66ab9a${_scopeId2}><strong data-v-1a66ab9a${_scopeId2}>Mandatory fields</strong> — every entry carries the fields required for a UAE domestic payment.</li><li data-v-1a66ab9a${_scopeId2}><strong data-v-1a66ab9a${_scopeId2}>Domestic creditor validity</strong> — each entry names an account reachable on a supported UAE domestic rail.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cardinality"),
                      createTextVNode(" — the shape of "),
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode(" matches a beneficiary model permitted by the requested payment type.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Mandatory fields"),
                      createTextVNode(" — every entry carries the fields required for a UAE domestic payment.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Domestic creditor validity"),
                      createTextVNode(" — each entry names an account reachable on a supported UAE domestic rail.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If any check fails, the LFI MUST mark the consent invalid in its validate response — see <a href="#rejecting-an-invalid-consent" data-v-1a66ab9a${_scopeId2}>Rejecting an invalid consent</a> below. `);
                } else {
                  return [
                    createTextVNode(" If any check fails, the LFI MUST mark the consent invalid in its validate response — see "),
                    createVNode("a", { href: "#rejecting-an-invalid-consent" }, "Rejecting an invalid consent"),
                    createTextVNode(" below. ")
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
                    createVNode("strong", null, "Cardinality"),
                    createTextVNode(" — the shape of "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" matches a beneficiary model permitted by the requested payment type.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Mandatory fields"),
                    createTextVNode(" — every entry carries the fields required for a UAE domestic payment.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Domestic creditor validity"),
                    createTextVNode(" — each entry names an account reachable on a supported UAE domestic rail.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If any check fails, the LFI MUST mark the consent invalid in its validate response — see "),
                  createVNode("a", { href: "#rejecting-an-invalid-consent" }, "Rejecting an invalid consent"),
                  createTextVNode(" below. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "cardinality",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Cardinality",
        title: "Beneficiary model",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The shape of <code data-v-1a66ab9a${_scopeId2}>Initiation.Creditor</code> determines the beneficiary model. Three models are defined: `);
                } else {
                  return [
                    createTextVNode(" The shape of "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" determines the beneficiary model. Three models are defined: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-1a66ab9a${_scopeId2}><thead data-v-1a66ab9a${_scopeId2}><tr data-v-1a66ab9a${_scopeId2}><th data-v-1a66ab9a${_scopeId2}>Beneficiary model</th><th data-v-1a66ab9a${_scopeId2}><code data-v-1a66ab9a${_scopeId2}>Initiation.Creditor</code></th></tr></thead><tbody data-v-1a66ab9a${_scopeId2}><tr data-v-1a66ab9a${_scopeId2}><td data-v-1a66ab9a${_scopeId2}>Single</td><td data-v-1a66ab9a${_scopeId2}>Array of exactly <strong data-v-1a66ab9a${_scopeId2}>1 entry</strong></td></tr><tr data-v-1a66ab9a${_scopeId2}><td data-v-1a66ab9a${_scopeId2}>Multiple</td><td data-v-1a66ab9a${_scopeId2}>Array of <strong data-v-1a66ab9a${_scopeId2}>2–10 entries</strong></td></tr><tr data-v-1a66ab9a${_scopeId2}><td data-v-1a66ab9a${_scopeId2}>Open</td><td data-v-1a66ab9a${_scopeId2}>Array <strong data-v-1a66ab9a${_scopeId2}>omitted</strong> — no creditor fixed at consent time</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Beneficiary model"),
                          createVNode("th", null, [
                            createVNode("code", null, "Initiation.Creditor")
                          ])
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Single"),
                          createVNode("td", null, [
                            createTextVNode("Array of exactly "),
                            createVNode("strong", null, "1 entry")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Multiple"),
                          createVNode("td", null, [
                            createTextVNode("Array of "),
                            createVNode("strong", null, "2–10 entries")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Open"),
                          createVNode("td", null, [
                            createTextVNode("Array "),
                            createVNode("strong", null, "omitted"),
                            createTextVNode(" — no creditor fixed at consent time")
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
                  _push3(` Each payment type accepts only certain beneficiary models. The LFI MUST reject a consent where the cardinality doesn&#39;t align with a model permitted for the requested payment type. The allowed models are documented on each payment type&#39;s Requirements page (e.g. <a href="../domestic-payments/multi-payments/variable-on-demand/requirements" data-v-1a66ab9a${_scopeId2}>Variable On-Demand — Requirements</a>). `);
                } else {
                  return [
                    createTextVNode(" Each payment type accepts only certain beneficiary models. The LFI MUST reject a consent where the cardinality doesn't align with a model permitted for the requested payment type. The allowed models are documented on each payment type's Requirements page (e.g. "),
                    createVNode("a", { href: "../domestic-payments/multi-payments/variable-on-demand/requirements" }, "Variable On-Demand — Requirements"),
                    createTextVNode("). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The shape of "),
                  createVNode("code", null, "Initiation.Creditor"),
                  createTextVNode(" determines the beneficiary model. Three models are defined: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Beneficiary model"),
                        createVNode("th", null, [
                          createVNode("code", null, "Initiation.Creditor")
                        ])
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Single"),
                        createVNode("td", null, [
                          createTextVNode("Array of exactly "),
                          createVNode("strong", null, "1 entry")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Multiple"),
                        createVNode("td", null, [
                          createTextVNode("Array of "),
                          createVNode("strong", null, "2–10 entries")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Open"),
                        createVNode("td", null, [
                          createTextVNode("Array "),
                          createVNode("strong", null, "omitted"),
                          createTextVNode(" — no creditor fixed at consent time")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each payment type accepts only certain beneficiary models. The LFI MUST reject a consent where the cardinality doesn't align with a model permitted for the requested payment type. The allowed models are documented on each payment type's Requirements page (e.g. "),
                  createVNode("a", { href: "../domestic-payments/multi-payments/variable-on-demand/requirements" }, "Variable On-Demand — Requirements"),
                  createTextVNode("). ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "mandatory-fields",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Mandatory fields",
        title: "Required for every creditor entry",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For every entry in <code data-v-1a66ab9a${_scopeId2}>Initiation.Creditor[]</code>, the following fields MUST be present for a UAE domestic payment: `);
                } else {
                  return [
                    createTextVNode(" For every entry in "),
                    createVNode("code", null, "Initiation.Creditor[]"),
                    createTextVNode(", the following fields MUST be present for a UAE domestic payment: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-1a66ab9a${_scopeId2}><thead data-v-1a66ab9a${_scopeId2}><tr data-v-1a66ab9a${_scopeId2}><th data-v-1a66ab9a${_scopeId2}>Field</th><th data-v-1a66ab9a${_scopeId2}>Rule</th></tr></thead><tbody data-v-1a66ab9a${_scopeId2}><tr data-v-1a66ab9a${_scopeId2}><td data-v-1a66ab9a${_scopeId2}><code data-v-1a66ab9a${_scopeId2}>CreditorAccount.SchemeName</code></td><td data-v-1a66ab9a${_scopeId2}>MUST be <code data-v-1a66ab9a${_scopeId2}>&quot;IBAN&quot;</code> — <code data-v-1a66ab9a${_scopeId2}>&quot;AccountNumber&quot;</code> is not valid for domestic payments</td></tr><tr data-v-1a66ab9a${_scopeId2}><td data-v-1a66ab9a${_scopeId2}><code data-v-1a66ab9a${_scopeId2}>CreditorAccount.Identification</code></td><td data-v-1a66ab9a${_scopeId2}>MUST be a valid UAE IBAN</td></tr><tr data-v-1a66ab9a${_scopeId2}><td data-v-1a66ab9a${_scopeId2}><code data-v-1a66ab9a${_scopeId2}>CreditorAccount.Name.en</code> OR <code data-v-1a66ab9a${_scopeId2}>CreditorAccount.Name.ar</code></td><td data-v-1a66ab9a${_scopeId2}>At least one MUST be present</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Rule")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.SchemeName")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("MUST be "),
                            createVNode("code", null, '"IBAN"'),
                            createTextVNode(" — "),
                            createVNode("code", null, '"AccountNumber"'),
                            createTextVNode(" is not valid for domestic payments")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.Identification")
                          ]),
                          createVNode("td", null, "MUST be a valid UAE IBAN")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.Name.en"),
                            createTextVNode(" OR "),
                            createVNode("code", null, "CreditorAccount.Name.ar")
                          ]),
                          createVNode("td", null, "At least one MUST be present")
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
                  _push3(` If any required field is missing, <code data-v-1a66ab9a${_scopeId2}>SchemeName</code> is set to <code data-v-1a66ab9a${_scopeId2}>&quot;AccountNumber&quot;</code>, or the IBAN is invalid, the LFI MUST invalidate the consent. `);
                } else {
                  return [
                    createTextVNode(" If any required field is missing, "),
                    createVNode("code", null, "SchemeName"),
                    createTextVNode(" is set to "),
                    createVNode("code", null, '"AccountNumber"'),
                    createTextVNode(", or the IBAN is invalid, the LFI MUST invalidate the consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Schema conformance — including <code data-v-1a66ab9a${_scopeId2}>additionalProperties: false</code> at every level — is enforced through the OpenAPI spec. See <a href="./api-guide/decrypt-pii" data-v-1a66ab9a${_scopeId2}>How to Decrypt PII</a> for how to plug the PII schema into a validator. `);
                } else {
                  return [
                    createTextVNode(" Schema conformance — including "),
                    createVNode("code", null, "additionalProperties: false"),
                    createTextVNode(" at every level — is enforced through the OpenAPI spec. See "),
                    createVNode("a", { href: "./api-guide/decrypt-pii" }, "How to Decrypt PII"),
                    createTextVNode(" for how to plug the PII schema into a validator. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For every entry in "),
                  createVNode("code", null, "Initiation.Creditor[]"),
                  createTextVNode(", the following fields MUST be present for a UAE domestic payment: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Rule")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.SchemeName")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("MUST be "),
                          createVNode("code", null, '"IBAN"'),
                          createTextVNode(" — "),
                          createVNode("code", null, '"AccountNumber"'),
                          createTextVNode(" is not valid for domestic payments")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.Identification")
                        ]),
                        createVNode("td", null, "MUST be a valid UAE IBAN")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.Name.en"),
                          createTextVNode(" OR "),
                          createVNode("code", null, "CreditorAccount.Name.ar")
                        ]),
                        createVNode("td", null, "At least one MUST be present")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If any required field is missing, "),
                  createVNode("code", null, "SchemeName"),
                  createTextVNode(" is set to "),
                  createVNode("code", null, '"AccountNumber"'),
                  createTextVNode(", or the IBAN is invalid, the LFI MUST invalidate the consent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Schema conformance — including "),
                  createVNode("code", null, "additionalProperties: false"),
                  createTextVNode(" at every level — is enforced through the OpenAPI spec. See "),
                  createVNode("a", { href: "./api-guide/decrypt-pii" }, "How to Decrypt PII"),
                  createTextVNode(" for how to plug the PII schema into a validator. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "creditor-agent",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "CreditorAgent",
        title: "BIC derivation rules",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-1a66ab9a${_scopeId2}><thead data-v-1a66ab9a${_scopeId2}><tr data-v-1a66ab9a${_scopeId2}><th data-v-1a66ab9a${_scopeId2}>Scenario</th><th data-v-1a66ab9a${_scopeId2}>LFI behaviour</th></tr></thead><tbody data-v-1a66ab9a${_scopeId2}><tr data-v-1a66ab9a${_scopeId2}><td data-v-1a66ab9a${_scopeId2}><code data-v-1a66ab9a${_scopeId2}>CreditorAgent.Identification</code> not provided</td><td data-v-1a66ab9a${_scopeId2}>LFI MUST derive the BIC from the IBAN</td></tr><tr data-v-1a66ab9a${_scopeId2}><td data-v-1a66ab9a${_scopeId2}><code data-v-1a66ab9a${_scopeId2}>CreditorAgent.Identification</code> provided</td><td data-v-1a66ab9a${_scopeId2}>MUST be in 8- or 11-character BIC format, and MUST match the BIC derivable from the IBAN</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Scenario"),
                          createVNode("th", null, "LFI behaviour")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAgent.Identification"),
                            createTextVNode(" not provided")
                          ]),
                          createVNode("td", null, "LFI MUST derive the BIC from the IBAN")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAgent.Identification"),
                            createTextVNode(" provided")
                          ]),
                          createVNode("td", null, "MUST be in 8- or 11-character BIC format, and MUST match the BIC derivable from the IBAN")
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
                        createVNode("th", null, "Scenario"),
                        createVNode("th", null, "LFI behaviour")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAgent.Identification"),
                          createTextVNode(" not provided")
                        ]),
                        createVNode("td", null, "LFI MUST derive the BIC from the IBAN")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAgent.Identification"),
                          createTextVNode(" provided")
                        ]),
                        createVNode("td", null, "MUST be in 8- or 11-character BIC format, and MUST match the BIC derivable from the IBAN")
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
        id: "domestic-creditor-validity",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Domestic creditor validity",
        title: "Reachability on AANI / UAEFTS",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For each entry, the LFI MUST validate that the creditor account is reachable on a supported UAE domestic rail — <strong data-v-1a66ab9a${_scopeId2}>AANI</strong> or <strong data-v-1a66ab9a${_scopeId2}>UAEFTS</strong>. Where the LFI can determine the state of the receiving account, it MUST also check that the account is able to receive payments. `);
                } else {
                  return [
                    createTextVNode(" For each entry, the LFI MUST validate that the creditor account is reachable on a supported UAE domestic rail — "),
                    createVNode("strong", null, "AANI"),
                    createTextVNode(" or "),
                    createVNode("strong", null, "UAEFTS"),
                    createTextVNode(". Where the LFI can determine the state of the receiving account, it MUST also check that the account is able to receive payments. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For each entry, the LFI MUST validate that the creditor account is reachable on a supported UAE domestic rail — "),
                  createVNode("strong", null, "AANI"),
                  createTextVNode(" or "),
                  createVNode("strong", null, "UAEFTS"),
                  createTextVNode(". Where the LFI can determine the state of the receiving account, it MUST also check that the account is able to receive payments. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "rejecting-an-invalid-consent",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "Rejecting an invalid consent",
        title: "Mark the consent invalid in the validate response",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If any check above fails, the LFI MUST mark the consent invalid in its <span class="endpoint" data-v-1a66ab9a${_scopeId2}><span class="http-method http-method--post" data-v-1a66ab9a${_scopeId2}>POST</span><code data-v-1a66ab9a${_scopeId2}>/consent/action/validate</code></span> response. The API Hub will then reject the consent back to the TPP. `);
                } else {
                  return [
                    createTextVNode(" If any check above fails, the LFI MUST mark the consent invalid in its "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/action/validate")
                    ]),
                    createTextVNode(" response. The API Hub will then reject the consent back to the TPP. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: invalidConsentJson,
              lang: "json",
              filename: "invalid validate response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/lfi-api-hub/v2.1/consent-events/api-guide" data-v-1a66ab9a${_scopeId2}>Consent Events &amp; Actions — API Guide</a> for the full <span class="endpoint" data-v-1a66ab9a${_scopeId2}><span class="http-method http-method--post" data-v-1a66ab9a${_scopeId2}>POST</span><code data-v-1a66ab9a${_scopeId2}>/consent/action/validate</code></span> flow and response schema. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-events/api-guide" }, "Consent Events & Actions — API Guide"),
                    createTextVNode(" for the full "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/action/validate")
                    ]),
                    createTextVNode(" flow and response schema. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If any check above fails, the LFI MUST mark the consent invalid in its "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" response. The API Hub will then reject the consent back to the TPP. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: invalidConsentJson,
                lang: "json",
                filename: "invalid validate response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/consent-events/api-guide" }, "Consent Events & Actions — API Guide"),
                  createTextVNode(" for the full "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" flow and response schema. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const creditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a66ab9a"]]);
export {
  creditor as default
};
