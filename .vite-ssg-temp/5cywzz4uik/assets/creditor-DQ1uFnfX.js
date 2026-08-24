import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const parEntrySample = `{
  "CreditorAgent": { "SchemeName": "BICFI", "Identification": "ADCBAEAA" },
  "Creditor": { "Name": "Ivan England" },
  "CreditorAccount": {
    "SchemeName": "IBAN",
    "Identification": "AE070331234567890123456",
    "Name": { "en": "Ivan David England" }
  },
  "ConfirmationOfPayeeResponse": "eyJhbGci..."
}`;
const singleBeneficiarySample = `{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ivan England" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ivan David England" }
        },
        "ConfirmationOfPayeeResponse": "eyJhbGci..."
      }
    ]
  }
}`;
const multipleBeneficiariesSample = `{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ivan England" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ivan David England" }
        }
      },
      {
        "Creditor": { "Name": "Sara Al Zaabi" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE140260123456789012345",
          "Name": { "en": "Sara Al Zaabi" }
        }
      }
    ]
  }
}`;
const openBeneficiarySample = `{
  "Initiation": {
    "DebtorAccount": { ... }
    // Creditor array omitted — supplied at payment time
  },
  "Risk": { ... }
}`;
const paymentTimeSample = `{
  "Initiation": {
    "CreditorAgent": { "SchemeName": "BICFI", "Identification": "ADCBAEAA" },
    "Creditor": { "Name": "Ivan England" },
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": { "en": "Ivan David England" }
    },
    "ConfirmationOfPayeeResponse": "eyJhbGci..."
  },
  "Risk": { ... }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "creditor",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-d908f18c><section class="ed-doc__hero" data-v-d908f18c><div class="ed-doc__inner" data-v-d908f18c><div class="ed-doc__eyebrow" data-v-d908f18c><span class="ed-doc__eyebrow-dash" data-v-d908f18c></span> Service Initiation · PII · Creditor </div><h1 class="ed-doc__title" data-v-d908f18c> Creditor <span class="ed-doc__read" data-v-d908f18c>4 min read</span></h1><p class="ed-doc__lede" data-v-d908f18c> Creditor data is submitted as part of the PII payload at two points in the payment lifecycle. The structure is <strong data-v-d908f18c>different</strong> at each stage. </p>`);
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-v-d908f18c${_scopeId}><thead data-v-d908f18c${_scopeId}><tr data-v-d908f18c${_scopeId}><th data-v-d908f18c${_scopeId}>Stage</th><th data-v-d908f18c${_scopeId}>Endpoint</th><th data-v-d908f18c${_scopeId}>Structure</th></tr></thead><tbody data-v-d908f18c${_scopeId}><tr data-v-d908f18c${_scopeId}><td data-v-d908f18c${_scopeId}>Consent staging</td><td data-v-d908f18c${_scopeId}><span class="endpoint" data-v-d908f18c${_scopeId}><span class="http-method http-method--post" data-v-d908f18c${_scopeId}>POST</span><code data-v-d908f18c${_scopeId}>/par</code></span></td><td data-v-d908f18c${_scopeId}><code data-v-d908f18c${_scopeId}>Initiation.Creditor</code> — an <strong data-v-d908f18c${_scopeId}>array</strong> of creditor entries</td></tr><tr data-v-d908f18c${_scopeId}><td data-v-d908f18c${_scopeId}>Payment creation</td><td data-v-d908f18c${_scopeId}><span class="endpoint" data-v-d908f18c${_scopeId}><span class="http-method http-method--post" data-v-d908f18c${_scopeId}>POST</span><code data-v-d908f18c${_scopeId}>/payments</code></span></td><td data-v-d908f18c${_scopeId}><code data-v-d908f18c${_scopeId}>Initiation.CreditorAccount</code>, <code data-v-d908f18c${_scopeId}>Initiation.CreditorAgent</code>, <code data-v-d908f18c${_scopeId}>Initiation.Creditor</code>, <code data-v-d908f18c${_scopeId}>Initiation.ConfirmationOfPayeeResponse</code> — <strong data-v-d908f18c${_scopeId}>flat fields</strong> on <code data-v-d908f18c${_scopeId}>Initiation</code></td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Stage"),
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Structure")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Consent staging"),
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode(" — an "),
                      createVNode("strong", null, "array"),
                      createTextVNode(" of creditor entries")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Payment creation"),
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ])
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "Initiation.CreditorAccount"),
                      createTextVNode(", "),
                      createVNode("code", null, "Initiation.CreditorAgent"),
                      createTextVNode(", "),
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode(", "),
                      createVNode("code", null, "Initiation.ConfirmationOfPayeeResponse"),
                      createTextVNode(" — "),
                      createVNode("strong", null, "flat fields"),
                      createTextVNode(" on "),
                      createVNode("code", null, "Initiation")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-time",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Creditor at consent time — POST /par",
        title: "Initiation.Creditor — array of creditor entries",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` At consent staging, creditor data lives in <code data-v-d908f18c${_scopeId2}>Initiation.Creditor</code> — an array of creditor entry objects. Each entry has the structure: `);
                } else {
                  return [
                    createTextVNode(" At consent staging, creditor data lives in "),
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" — an array of creditor entry objects. Each entry has the structure: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: parEntrySample,
              lang: "json",
              filename: "Creditor entry — POST /par"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The number of entries in the array determines the beneficiary model, which constrains which payment types are available. `);
                } else {
                  return [
                    createTextVNode(" The number of entries in the array determines the beneficiary model, which constrains which payment types are available. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-d908f18c${_scopeId}>Single Beneficiary (1 entry)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-d908f18c${_scopeId2}>Creditor</code> array contains exactly <strong data-v-d908f18c${_scopeId2}>one entry</strong>. The consent is bound to that creditor — every payment made under this consent must go to that account. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "Creditor"),
                    createTextVNode(" array contains exactly "),
                    createVNode("strong", null, "one entry"),
                    createTextVNode(". The consent is bound to that creditor — every payment made under this consent must go to that account. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: singleBeneficiarySample,
              lang: "json",
              filename: "Single beneficiary"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-d908f18c${_scopeId2}>Supported payment types:</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "Supported payment types:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-d908f18c${_scopeId2}><thead data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><th data-v-d908f18c${_scopeId2}>Payment Type</th></tr></thead><tbody data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Single Instant Payment — domestic</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Single Instant Payment — international</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Fixed Defined Schedule multi-payment</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Variable Defined Schedule multi-payment</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Fixed Periodic Schedule multi-payment</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Variable Periodic Schedule multi-payment</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Fixed On-Demand multi-payment</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Variable On-Demand multi-payment</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Delegated SCA (<code data-v-d908f18c${_scopeId2}>IsDelegatedAuthentication: true</code>)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Payment Type")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Single Instant Payment — domestic")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Single Instant Payment — international")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Fixed Defined Schedule multi-payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Variable Defined Schedule multi-payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Fixed Periodic Schedule multi-payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Variable Periodic Schedule multi-payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Fixed On-Demand multi-payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Variable On-Demand multi-payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createTextVNode("Delegated SCA ("),
                            createVNode("code", null, "IsDelegatedAuthentication: true"),
                            createTextVNode(")")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-d908f18c${_scopeId}>Multiple Beneficiaries (2–10 entries)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-d908f18c${_scopeId2}>Creditor</code> array contains between <strong data-v-d908f18c${_scopeId2}>2 and 10 entries</strong>. The consent authorises payments to any one of the listed creditors — each individual payment specifies which one. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "Creditor"),
                    createTextVNode(" array contains between "),
                    createVNode("strong", null, "2 and 10 entries"),
                    createTextVNode(". The consent authorises payments to any one of the listed creditors — each individual payment specifies which one. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: multipleBeneficiariesSample,
              lang: "json",
              filename: "Multiple beneficiaries"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-d908f18c${_scopeId2}>Supported payment types:</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "Supported payment types:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-d908f18c${_scopeId2}><thead data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><th data-v-d908f18c${_scopeId2}>Payment Type</th></tr></thead><tbody data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Variable On-Demand multi-payment</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Delegated SCA (<code data-v-d908f18c${_scopeId2}>IsDelegatedAuthentication: true</code>)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Payment Type")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Variable On-Demand multi-payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createTextVNode("Delegated SCA ("),
                            createVNode("code", null, "IsDelegatedAuthentication: true"),
                            createTextVNode(")")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-d908f18c${_scopeId}>Open Beneficiary (array omitted)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-d908f18c${_scopeId2}>Creditor</code> array is <strong data-v-d908f18c${_scopeId2}>not provided</strong>. No beneficiary is fixed at consent time — the creditor is supplied with each <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/payments</code></span> call. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "Creditor"),
                    createTextVNode(" array is "),
                    createVNode("strong", null, "not provided"),
                    createTextVNode(". No beneficiary is fixed at consent time — the creditor is supplied with each "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" call. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: openBeneficiarySample,
              lang: "json",
              filename: "Open beneficiary"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-d908f18c${_scopeId2}>Supported payment types:</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "Supported payment types:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-d908f18c${_scopeId2}><thead data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><th data-v-d908f18c${_scopeId2}>Payment Type</th></tr></thead><tbody data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Variable On-Demand multi-payment</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Delegated SCA (<code data-v-d908f18c${_scopeId2}>IsDelegatedAuthentication: true</code>)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Payment Type")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Variable On-Demand multi-payment")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createTextVNode("Delegated SCA ("),
                            createVNode("code", null, "IsDelegatedAuthentication: true"),
                            createTextVNode(")")
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" At consent staging, creditor data lives in "),
                  createVNode("code", null, "Initiation.Creditor"),
                  createTextVNode(" — an array of creditor entry objects. Each entry has the structure: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: parEntrySample,
                lang: "json",
                filename: "Creditor entry — POST /par"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The number of entries in the array determines the beneficiary model, which constrains which payment types are available. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Single Beneficiary (1 entry)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "Creditor"),
                  createTextVNode(" array contains exactly "),
                  createVNode("strong", null, "one entry"),
                  createTextVNode(". The consent is bound to that creditor — every payment made under this consent must go to that account. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: singleBeneficiarySample,
                lang: "json",
                filename: "Single beneficiary"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Supported payment types:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Payment Type")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Single Instant Payment — domestic")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Single Instant Payment — international")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Fixed Defined Schedule multi-payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Variable Defined Schedule multi-payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Fixed Periodic Schedule multi-payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Variable Periodic Schedule multi-payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Fixed On-Demand multi-payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Variable On-Demand multi-payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createTextVNode("Delegated SCA ("),
                          createVNode("code", null, "IsDelegatedAuthentication: true"),
                          createTextVNode(")")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Multiple Beneficiaries (2–10 entries)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "Creditor"),
                  createTextVNode(" array contains between "),
                  createVNode("strong", null, "2 and 10 entries"),
                  createTextVNode(". The consent authorises payments to any one of the listed creditors — each individual payment specifies which one. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: multipleBeneficiariesSample,
                lang: "json",
                filename: "Multiple beneficiaries"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Supported payment types:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Payment Type")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Variable On-Demand multi-payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createTextVNode("Delegated SCA ("),
                          createVNode("code", null, "IsDelegatedAuthentication: true"),
                          createTextVNode(")")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Open Beneficiary (array omitted)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "Creditor"),
                  createTextVNode(" array is "),
                  createVNode("strong", null, "not provided"),
                  createTextVNode(". No beneficiary is fixed at consent time — the creditor is supplied with each "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" call. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: openBeneficiarySample,
                lang: "json",
                filename: "Open beneficiary"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Supported payment types:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Payment Type")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Variable On-Demand multi-payment")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createTextVNode("Delegated SCA ("),
                          createVNode("code", null, "IsDelegatedAuthentication: true"),
                          createTextVNode(")")
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
        id: "payment-time",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Creditor at payment time — POST /payments",
        title: "Flat fields on Initiation — single AEDomesticCreditor",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` At payment creation, the <code data-v-d908f18c${_scopeId2}>Initiation</code> object in the PII payload <strong data-v-d908f18c${_scopeId2}>is</strong> a single <code data-v-d908f18c${_scopeId2}>AEDomesticCreditor</code> — the creditor fields are flat properties of <code data-v-d908f18c${_scopeId2}>Initiation</code>, not nested inside an array. `);
                } else {
                  return [
                    createTextVNode(" At payment creation, the "),
                    createVNode("code", null, "Initiation"),
                    createTextVNode(" object in the PII payload "),
                    createVNode("strong", null, "is"),
                    createTextVNode(" a single "),
                    createVNode("code", null, "AEDomesticCreditor"),
                    createTextVNode(" — the creditor fields are flat properties of "),
                    createVNode("code", null, "Initiation"),
                    createTextVNode(", not nested inside an array. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: paymentTimeSample,
              lang: "json",
              filename: "Creditor — POST /payments"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Note on naming"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>Initiation.Creditor</code> at <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/payments</code></span> is the <strong data-v-d908f18c${_scopeId2}>party identity object</strong> (<code data-v-d908f18c${_scopeId2}>{ Name, PostalAddress }</code>) — not the array that appears at <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/par</code></span>. The two uses of the word <code data-v-d908f18c${_scopeId2}>Creditor</code> refer to different things. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("code", null, "Initiation.Creditor"),
                      createTextVNode(" at "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" is the "),
                      createVNode("strong", null, "party identity object"),
                      createTextVNode(" ("),
                      createVNode("code", null, "{ Name, PostalAddress }"),
                      createTextVNode(") — not the array that appears at "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ]),
                      createTextVNode(". The two uses of the word "),
                      createVNode("code", null, "Creditor"),
                      createTextVNode(" refer to different things. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-d908f18c${_scopeId}>Matching the authorised creditor</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The creditor supplied at <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/payments</code></span> must correspond to one of the creditors authorised on the consent. The rule depends on the beneficiary model: `);
                } else {
                  return [
                    createTextVNode(" The creditor supplied at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" must correspond to one of the creditors authorised on the consent. The rule depends on the beneficiary model: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-d908f18c${_scopeId2}><thead data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><th data-v-d908f18c${_scopeId2}>Consent model</th><th data-v-d908f18c${_scopeId2}>Creditor at POST /par</th><th data-v-d908f18c${_scopeId2}>Requirement at POST /payments</th></tr></thead><tbody data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Single beneficiary</td><td data-v-d908f18c${_scopeId2}>1 entry in <code data-v-d908f18c${_scopeId2}>Initiation.Creditor[]</code></td><td data-v-d908f18c${_scopeId2}>Must exactly match that entry — same IBAN and account name</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Multiple beneficiaries</td><td data-v-d908f18c${_scopeId2}>2–10 entries in <code data-v-d908f18c${_scopeId2}>Initiation.Creditor[]</code></td><td data-v-d908f18c${_scopeId2}>Must exactly match one entry from the pre-approved list</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}>Open beneficiary</td><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>Initiation.Creditor[]</code> omitted</td><td data-v-d908f18c${_scopeId2}>Any valid creditor — no consent-time match required</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Consent model"),
                          createVNode("th", null, "Creditor at POST /par"),
                          createVNode("th", null, "Requirement at POST /payments")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Single beneficiary"),
                          createVNode("td", null, [
                            createTextVNode("1 entry in "),
                            createVNode("code", null, "Initiation.Creditor[]")
                          ]),
                          createVNode("td", null, "Must exactly match that entry — same IBAN and account name")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Multiple beneficiaries"),
                          createVNode("td", null, [
                            createTextVNode("2–10 entries in "),
                            createVNode("code", null, "Initiation.Creditor[]")
                          ]),
                          createVNode("td", null, "Must exactly match one entry from the pre-approved list")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Open beneficiary"),
                          createVNode("td", null, [
                            createVNode("code", null, "Initiation.Creditor[]"),
                            createTextVNode(" omitted")
                          ]),
                          createVNode("td", null, "Any valid creditor — no consent-time match required")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Creditor must match the consent"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-d908f18c${_scopeId2}> For Single and Multiple Beneficiary consents, the LFI validates that the <code data-v-d908f18c${_scopeId2}>CreditorAccount.Identification</code> (IBAN) at <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/payments</code></span> matches a creditor entry from the authorised consent. A mismatch will result in the payment being rejected. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" For Single and Multiple Beneficiary consents, the LFI validates that the "),
                      createVNode("code", null, "CreditorAccount.Identification"),
                      createTextVNode(" (IBAN) at "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" matches a creditor entry from the authorised consent. A mismatch will result in the payment being rejected. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Open beneficiary: first appearance at POST /payments"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-d908f18c${_scopeId2}> For Open Beneficiary consents, this is where the creditor details appear for the first time. The LFI validates the supplied creditor against the same mandatory field and IBAN rules that apply at consent time — there is no consent-time entry to match against. </p>`);
                } else {
                  return [
                    createVNode("p", null, " For Open Beneficiary consents, this is where the creditor details appear for the first time. The LFI validates the supplied creditor against the same mandatory field and IBAN rules that apply at consent time — there is no consent-time entry to match against. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" At payment creation, the "),
                  createVNode("code", null, "Initiation"),
                  createTextVNode(" object in the PII payload "),
                  createVNode("strong", null, "is"),
                  createTextVNode(" a single "),
                  createVNode("code", null, "AEDomesticCreditor"),
                  createTextVNode(" — the creditor fields are flat properties of "),
                  createVNode("code", null, "Initiation"),
                  createTextVNode(", not nested inside an array. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: paymentTimeSample,
                lang: "json",
                filename: "Creditor — POST /payments"
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Note on naming"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("code", null, "Initiation.Creditor"),
                    createTextVNode(" at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" is the "),
                    createVNode("strong", null, "party identity object"),
                    createTextVNode(" ("),
                    createVNode("code", null, "{ Name, PostalAddress }"),
                    createTextVNode(") — not the array that appears at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(". The two uses of the word "),
                    createVNode("code", null, "Creditor"),
                    createTextVNode(" refer to different things. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Matching the authorised creditor"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The creditor supplied at "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" must correspond to one of the creditors authorised on the consent. The rule depends on the beneficiary model: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Consent model"),
                        createVNode("th", null, "Creditor at POST /par"),
                        createVNode("th", null, "Requirement at POST /payments")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Single beneficiary"),
                        createVNode("td", null, [
                          createTextVNode("1 entry in "),
                          createVNode("code", null, "Initiation.Creditor[]")
                        ]),
                        createVNode("td", null, "Must exactly match that entry — same IBAN and account name")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Multiple beneficiaries"),
                        createVNode("td", null, [
                          createTextVNode("2–10 entries in "),
                          createVNode("code", null, "Initiation.Creditor[]")
                        ]),
                        createVNode("td", null, "Must exactly match one entry from the pre-approved list")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Open beneficiary"),
                        createVNode("td", null, [
                          createVNode("code", null, "Initiation.Creditor[]"),
                          createTextVNode(" omitted")
                        ]),
                        createVNode("td", null, "Any valid creditor — no consent-time match required")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Creditor must match the consent"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" For Single and Multiple Beneficiary consents, the LFI validates that the "),
                    createVNode("code", null, "CreditorAccount.Identification"),
                    createTextVNode(" (IBAN) at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" matches a creditor entry from the authorised consent. A mismatch will result in the payment being rejected. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Open beneficiary: first appearance at POST /payments"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " For Open Beneficiary consents, this is where the creditor details appear for the first time. The LFI validates the supplied creditor against the same mandatory field and IBAN rules that apply at consent time — there is no consent-time entry to match against. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "entry-schema",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Creditor entry schema",
        title: "The shape of each creditor entry — applies to both stages",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The following schema applies to <strong data-v-d908f18c${_scopeId2}>each entry in <code data-v-d908f18c${_scopeId2}>Initiation.Creditor[]</code></strong> at <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/par</code></span>, and to the <strong data-v-d908f18c${_scopeId2}>flat fields on <code data-v-d908f18c${_scopeId2}>Initiation</code></strong> at <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/payments</code></span>. `);
                } else {
                  return [
                    createTextVNode(" The following schema applies to "),
                    createVNode("strong", null, [
                      createTextVNode("each entry in "),
                      createVNode("code", null, "Initiation.Creditor[]")
                    ]),
                    createTextVNode(" at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(", and to the "),
                    createVNode("strong", null, [
                      createTextVNode("flat fields on "),
                      createVNode("code", null, "Initiation")
                    ]),
                    createTextVNode(" at "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-d908f18c${_scopeId2}><thead data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><th data-v-d908f18c${_scopeId2}>Field</th><th data-v-d908f18c${_scopeId2}>Type</th><th data-v-d908f18c${_scopeId2}>Required</th><th data-v-d908f18c${_scopeId2}>Description</th></tr></thead><tbody data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.SchemeName</code></td><td data-v-d908f18c${_scopeId2}>enum</td><td data-v-d908f18c${_scopeId2}>Yes</td><td data-v-d908f18c${_scopeId2}>Always <code data-v-d908f18c${_scopeId2}>IBAN</code> for domestic payments</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.Identification</code></td><td data-v-d908f18c${_scopeId2}>string</td><td data-v-d908f18c${_scopeId2}>Yes</td><td data-v-d908f18c${_scopeId2}>The IBAN of the creditor account</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.Name.en</code></td><td data-v-d908f18c${_scopeId2}>string</td><td data-v-d908f18c${_scopeId2}>Yes*</td><td data-v-d908f18c${_scopeId2}>Account holder name in English</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.Name.ar</code></td><td data-v-d908f18c${_scopeId2}>string</td><td data-v-d908f18c${_scopeId2}>Yes*</td><td data-v-d908f18c${_scopeId2}>Account holder name in Arabic</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.TradingName</code></td><td data-v-d908f18c${_scopeId2}>object</td><td data-v-d908f18c${_scopeId2}>No</td><td data-v-d908f18c${_scopeId2}>Trading brand name, if applicable</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.Type</code></td><td data-v-d908f18c${_scopeId2}>enum</td><td data-v-d908f18c${_scopeId2}>No</td><td data-v-d908f18c${_scopeId2}>Account type: <code data-v-d908f18c${_scopeId2}>Individual</code>, <code data-v-d908f18c${_scopeId2}>Merchant</code>, <code data-v-d908f18c${_scopeId2}>Business</code>, <code data-v-d908f18c${_scopeId2}>Charity</code>, <code data-v-d908f18c${_scopeId2}>GovernmentBody</code>, <code data-v-d908f18c${_scopeId2}>Other</code></td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>Creditor.Name</code></td><td data-v-d908f18c${_scopeId2}>string</td><td data-v-d908f18c${_scopeId2}>No</td><td data-v-d908f18c${_scopeId2}>Full legal name of the payment recipient</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>Creditor.PostalAddress</code></td><td data-v-d908f18c${_scopeId2}>object</td><td data-v-d908f18c${_scopeId2}>No</td><td data-v-d908f18c${_scopeId2}>Postal address of the payment recipient</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAgent.SchemeName</code></td><td data-v-d908f18c${_scopeId2}>enum</td><td data-v-d908f18c${_scopeId2}>No</td><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>BICFI</code> or <code data-v-d908f18c${_scopeId2}>Other</code></td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAgent.Identification</code></td><td data-v-d908f18c${_scopeId2}>string</td><td data-v-d908f18c${_scopeId2}>No</td><td data-v-d908f18c${_scopeId2}>BIC/SWIFT code or payment scheme identifier</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>ConfirmationOfPayeeResponse</code></td><td data-v-d908f18c${_scopeId2}>string (JWS)</td><td data-v-d908f18c${_scopeId2}>No</td><td data-v-d908f18c${_scopeId2}>The full JWS returned by the CoP <code data-v-d908f18c${_scopeId2}>/confirmation</code> endpoint, if CoP was performed</td></tr></tbody></table>`);
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
                            createVNode("code", null, "CreditorAccount.SchemeName")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Always "),
                            createVNode("code", null, "IBAN"),
                            createTextVNode(" for domestic payments")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.Identification")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The IBAN of the creditor account")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.Name.en")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes*"),
                          createVNode("td", null, "Account holder name in English")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.Name.ar")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes*"),
                          createVNode("td", null, "Account holder name in Arabic")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.TradingName")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Trading brand name, if applicable")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.Type")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("Account type: "),
                            createVNode("code", null, "Individual"),
                            createTextVNode(", "),
                            createVNode("code", null, "Merchant"),
                            createTextVNode(", "),
                            createVNode("code", null, "Business"),
                            createTextVNode(", "),
                            createVNode("code", null, "Charity"),
                            createTextVNode(", "),
                            createVNode("code", null, "GovernmentBody"),
                            createTextVNode(", "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Creditor.Name")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Full legal name of the payment recipient")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Creditor.PostalAddress")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Postal address of the payment recipient")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAgent.SchemeName")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createVNode("code", null, "BICFI"),
                            createTextVNode(" or "),
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAgent.Identification")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "BIC/SWIFT code or payment scheme identifier")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConfirmationOfPayeeResponse")
                          ]),
                          createVNode("td", null, "string (JWS)"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("The full JWS returned by the CoP "),
                            createVNode("code", null, "/confirmation"),
                            createTextVNode(" endpoint, if CoP was performed")
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
                  _push3(` *At least one of <code data-v-d908f18c${_scopeId2}>Name.en</code> or <code data-v-d908f18c${_scopeId2}>Name.ar</code> must be present. `);
                } else {
                  return [
                    createTextVNode(" *At least one of "),
                    createVNode("code", null, "Name.en"),
                    createTextVNode(" or "),
                    createVNode("code", null, "Name.ar"),
                    createTextVNode(" must be present. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Confirmation of Payee"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-d908f18c${_scopeId2}> Where Confirmation of Payee has been performed for a creditor, include the full JWS response string in <code data-v-d908f18c${_scopeId2}>ConfirmationOfPayeeResponse</code>. This gives the LFI confidence that the creditor account details have been verified. See <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/api-guide" data-v-d908f18c${_scopeId2}>Confirmation of Payee API Guide</a> for how to obtain the CoP response. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Where Confirmation of Payee has been performed for a creditor, include the full JWS response string in "),
                      createVNode("code", null, "ConfirmationOfPayeeResponse"),
                      createTextVNode(". This gives the LFI confidence that the creditor account details have been verified. See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/api-guide" }, "Confirmation of Payee API Guide"),
                      createTextVNode(" for how to obtain the CoP response. ")
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
                  createTextVNode(" The following schema applies to "),
                  createVNode("strong", null, [
                    createTextVNode("each entry in "),
                    createVNode("code", null, "Initiation.Creditor[]")
                  ]),
                  createTextVNode(" at "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/par")
                  ]),
                  createTextVNode(", and to the "),
                  createVNode("strong", null, [
                    createTextVNode("flat fields on "),
                    createVNode("code", null, "Initiation")
                  ]),
                  createTextVNode(" at "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(". ")
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
                          createVNode("code", null, "CreditorAccount.SchemeName")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Always "),
                          createVNode("code", null, "IBAN"),
                          createTextVNode(" for domestic payments")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.Identification")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The IBAN of the creditor account")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.Name.en")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes*"),
                        createVNode("td", null, "Account holder name in English")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.Name.ar")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes*"),
                        createVNode("td", null, "Account holder name in Arabic")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.TradingName")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Trading brand name, if applicable")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.Type")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("Account type: "),
                          createVNode("code", null, "Individual"),
                          createTextVNode(", "),
                          createVNode("code", null, "Merchant"),
                          createTextVNode(", "),
                          createVNode("code", null, "Business"),
                          createTextVNode(", "),
                          createVNode("code", null, "Charity"),
                          createTextVNode(", "),
                          createVNode("code", null, "GovernmentBody"),
                          createTextVNode(", "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Creditor.Name")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Full legal name of the payment recipient")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Creditor.PostalAddress")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Postal address of the payment recipient")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAgent.SchemeName")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createVNode("code", null, "BICFI"),
                          createTextVNode(" or "),
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAgent.Identification")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "BIC/SWIFT code or payment scheme identifier")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConfirmationOfPayeeResponse")
                        ]),
                        createVNode("td", null, "string (JWS)"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("The full JWS returned by the CoP "),
                          createVNode("code", null, "/confirmation"),
                          createTextVNode(" endpoint, if CoP was performed")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" *At least one of "),
                  createVNode("code", null, "Name.en"),
                  createTextVNode(" or "),
                  createVNode("code", null, "Name.ar"),
                  createTextVNode(" must be present. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Confirmation of Payee"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Where Confirmation of Payee has been performed for a creditor, include the full JWS response string in "),
                    createVNode("code", null, "ConfirmationOfPayeeResponse"),
                    createTextVNode(". This gives the LFI confidence that the creditor account details have been verified. See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/api-guide" }, "Confirmation of Payee API Guide"),
                    createTextVNode(" for how to obtain the CoP response. ")
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
        id: "validation",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Validation requirements — domestic payments",
        title: "Rules the LFI applies after decrypting the PII",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` These requirements apply at <strong data-v-d908f18c${_scopeId2}>both <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/par</code></span> and <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/payments</code></span></strong>: `);
                } else {
                  return [
                    createTextVNode(" These requirements apply at "),
                    createVNode("strong", null, [
                      createTextVNode("both "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ]),
                      createTextVNode(" and "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ])
                    ]),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-d908f18c${_scopeId2}>At <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/par</code></span>: each entry in the <code data-v-d908f18c${_scopeId2}>Initiation.Creditor[]</code> array is validated independently.</li><li data-v-d908f18c${_scopeId2}>At <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/payments</code></span>: the flat creditor fields on <code data-v-d908f18c${_scopeId2}>Initiation</code> are validated.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("At "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/par")
                      ]),
                      createTextVNode(": each entry in the "),
                      createVNode("code", null, "Initiation.Creditor[]"),
                      createTextVNode(" array is validated independently.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("At "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(": the flat creditor fields on "),
                      createVNode("code", null, "Initiation"),
                      createTextVNode(" are validated.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Because PII is encrypted using the LFI&#39;s public key, <strong data-v-d908f18c${_scopeId2}>Nebras cannot validate it</strong>. All validation is performed by the LFI after decryption. A consent or payment that fails LFI validation will be rejected. `);
                } else {
                  return [
                    createTextVNode(" Because PII is encrypted using the LFI's public key, "),
                    createVNode("strong", null, "Nebras cannot validate it"),
                    createTextVNode(". All validation is performed by the LFI after decryption. A consent or payment that fails LFI validation will be rejected. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-d908f18c${_scopeId}>1. Schema conformance</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The decrypted PII must conform exactly to the schema defined in the OpenAPI specification (<code data-v-d908f18c${_scopeId2}>AEDomesticPaymentPII</code> for <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/par</code></span>, <code data-v-d908f18c${_scopeId2}>AEDomesticPaymentPIIProperties</code> for <span class="endpoint" data-v-d908f18c${_scopeId2}><span class="http-method http-method--post" data-v-d908f18c${_scopeId2}>POST</span><code data-v-d908f18c${_scopeId2}>/payments</code></span>). No additional properties are permitted. `);
                } else {
                  return [
                    createTextVNode(" The decrypted PII must conform exactly to the schema defined in the OpenAPI specification ("),
                    createVNode("code", null, "AEDomesticPaymentPII"),
                    createTextVNode(" for "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(", "),
                    createVNode("code", null, "AEDomesticPaymentPIIProperties"),
                    createTextVNode(" for "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode("). No additional properties are permitted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-d908f18c${_scopeId}>2. Mandatory fields</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-d908f18c${_scopeId2}><thead data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><th data-v-d908f18c${_scopeId2}>Field</th><th data-v-d908f18c${_scopeId2}>Requirement</th></tr></thead><tbody data-v-d908f18c${_scopeId2}><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.Name.en</code> <strong data-v-d908f18c${_scopeId2}>or</strong> <code data-v-d908f18c${_scopeId2}>CreditorAccount.Name.ar</code></td><td data-v-d908f18c${_scopeId2}>At least one must be present</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.SchemeName</code></td><td data-v-d908f18c${_scopeId2}>Must be <code data-v-d908f18c${_scopeId2}>&quot;IBAN&quot;</code> — <code data-v-d908f18c${_scopeId2}>&quot;AccountNumber&quot;</code> is not valid for domestic payments</td></tr><tr data-v-d908f18c${_scopeId2}><td data-v-d908f18c${_scopeId2}><code data-v-d908f18c${_scopeId2}>CreditorAccount.Identification</code></td><td data-v-d908f18c${_scopeId2}>Must be a valid UAE IBAN</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Requirement")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.Name.en"),
                            createTextVNode(),
                            createVNode("strong", null, "or"),
                            createTextVNode(),
                            createVNode("code", null, "CreditorAccount.Name.ar")
                          ]),
                          createVNode("td", null, "At least one must be present")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "CreditorAccount.SchemeName")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Must be "),
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
                          createVNode("td", null, "Must be a valid UAE IBAN")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-d908f18c${_scopeId}>3. CreditorAgent — BIC derivation and validation</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-d908f18c${_scopeId2}>CreditorAgent.Identification</code> field identifies the creditor&#39;s bank. LFIs apply the following rules: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "CreditorAgent.Identification"),
                    createTextVNode(" field identifies the creditor's bank. LFIs apply the following rules: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-d908f18c${_scopeId2}><strong data-v-d908f18c${_scopeId2}>If <code data-v-d908f18c${_scopeId2}>CreditorAgent</code> is not provided</strong> — the LFI must derive the BIC from the IBAN.</li><li data-v-d908f18c${_scopeId2}><strong data-v-d908f18c${_scopeId2}>If <code data-v-d908f18c${_scopeId2}>CreditorAgent.Identification</code> is provided</strong> — the LFI must accept both 8-character and 11-character BIC formats. The LFI must not reject a valid BIC solely because of its length. Where AANI requires an 8-character BIC and an 11-character BIC is received, the LFI must validate that the 8-character truncation is consistent with the IBAN before submitting. In all cases, the LFI must validate that the provided BIC matches the BIC derivable from the IBAN.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("If "),
                        createVNode("code", null, "CreditorAgent"),
                        createTextVNode(" is not provided")
                      ]),
                      createTextVNode(" — the LFI must derive the BIC from the IBAN.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("If "),
                        createVNode("code", null, "CreditorAgent.Identification"),
                        createTextVNode(" is provided")
                      ]),
                      createTextVNode(" — the LFI must accept both 8-character and 11-character BIC formats. The LFI must not reject a valid BIC solely because of its length. Where AANI requires an 8-character BIC and an 11-character BIC is received, the LFI must validate that the 8-character truncation is consistent with the IBAN before submitting. In all cases, the LFI must validate that the provided BIC matches the BIC derivable from the IBAN.")
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
                  createTextVNode(" These requirements apply at "),
                  createVNode("strong", null, [
                    createTextVNode("both "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(" and "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ])
                  ]),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("At "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/par")
                    ]),
                    createTextVNode(": each entry in the "),
                    createVNode("code", null, "Initiation.Creditor[]"),
                    createTextVNode(" array is validated independently.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("At "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(": the flat creditor fields on "),
                    createVNode("code", null, "Initiation"),
                    createTextVNode(" are validated.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Because PII is encrypted using the LFI's public key, "),
                  createVNode("strong", null, "Nebras cannot validate it"),
                  createTextVNode(". All validation is performed by the LFI after decryption. A consent or payment that fails LFI validation will be rejected. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "1. Schema conformance"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The decrypted PII must conform exactly to the schema defined in the OpenAPI specification ("),
                  createVNode("code", null, "AEDomesticPaymentPII"),
                  createTextVNode(" for "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/par")
                  ]),
                  createTextVNode(", "),
                  createVNode("code", null, "AEDomesticPaymentPIIProperties"),
                  createTextVNode(" for "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode("). No additional properties are permitted. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "2. Mandatory fields"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Requirement")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.Name.en"),
                          createTextVNode(),
                          createVNode("strong", null, "or"),
                          createTextVNode(),
                          createVNode("code", null, "CreditorAccount.Name.ar")
                        ]),
                        createVNode("td", null, "At least one must be present")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "CreditorAccount.SchemeName")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Must be "),
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
                        createVNode("td", null, "Must be a valid UAE IBAN")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "3. CreditorAgent — BIC derivation and validation"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The "),
                  createVNode("code", null, "CreditorAgent.Identification"),
                  createTextVNode(" field identifies the creditor's bank. LFIs apply the following rules: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("If "),
                      createVNode("code", null, "CreditorAgent"),
                      createTextVNode(" is not provided")
                    ]),
                    createTextVNode(" — the LFI must derive the BIC from the IBAN.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("If "),
                      createVNode("code", null, "CreditorAgent.Identification"),
                      createTextVNode(" is provided")
                    ]),
                    createTextVNode(" — the LFI must accept both 8-character and 11-character BIC formats. The LFI must not reject a valid BIC solely because of its length. Where AANI requires an 8-character BIC and an 11-character BIC is received, the LFI must validate that the 8-character truncation is consistent with the IBAN before submitting. In all cases, the LFI must validate that the provided BIC matches the BIC derivable from the IBAN.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const creditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d908f18c"]]);
export {
  creditor as default
};
