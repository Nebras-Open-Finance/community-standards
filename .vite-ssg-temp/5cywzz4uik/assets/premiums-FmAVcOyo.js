import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const cleartextExample = `{
  "Premium": {
    "PremiumAmountExcludingVAT": "950.00",
    "PremiumVATAmount": "47.50",
    "TotalPremiumAmount": "997.50",
    "Currency": "AED",
    "PremiumFrequency": "Annually"
  }
}
`;
const jweExample = `{
  "Premium": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIiwicDJzIjoiNGtBWG..."
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "premiums",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-b2f5806e><section class="ed-doc__hero" data-v-b2f5806e><div class="ed-doc__inner" data-v-b2f5806e><div class="ed-doc__eyebrow" data-v-b2f5806e><span class="ed-doc__eyebrow-dash" data-v-b2f5806e></span> LFI · Insurance · Data Sharing · API Guide </div><h1 class="ed-doc__title" data-v-b2f5806e> Encrypted Premiums <span class="ed-doc__read" data-v-b2f5806e>4 min read</span></h1><p class="ed-doc__lede" data-v-b2f5806e> The <code data-v-b2f5806e>Premium</code> field on every insurance policy response is an <code data-v-b2f5806e>anyOf</code> of a structured cleartext object or a compact JWE string. Your LFI chooses, per policy, which shape to return. When you return a JWE, the TPP backend MUST NOT decrypt it — the payload is unwrapped only on the customer’s device. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "when-to-encrypt",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "When to encrypt",
        title: "Per-policy LFI choice",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Encrypted premiums let your LFI surface commercially sensitive premium values to a customer-present TPP experience without the TPP backend ever holding the cleartext. The decision is per policy and entirely yours — the TPP and the API Hub do not influence it. Both shapes are valid under the OpenAPI spec, so the TPP is required to handle either on every call. `);
                } else {
                  return [
                    createTextVNode(" Encrypted premiums let your LFI surface commercially sensitive premium values to a customer-present TPP experience without the TPP backend ever holding the cleartext. The decision is per policy and entirely yours — the TPP and the API Hub do not influence it. Both shapes are valid under the OpenAPI spec, so the TPP is required to handle either on every call. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-b2f5806e${_scopeId2}><strong data-v-b2f5806e${_scopeId2}>Cleartext</strong> — appropriate when the premium is non-sensitive or already publicly disclosed (e.g. tariff-based products with published rates). </li><li data-v-b2f5806e${_scopeId2}><strong data-v-b2f5806e${_scopeId2}>Encrypted (JWE)</strong> — appropriate for individually underwritten policies where the premium reflects pricing decisions you do not want exposed in a TPP’s server-side analytics, switching pipelines, or third-party data flows. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cleartext"),
                      createTextVNode(" — appropriate when the premium is non-sensitive or already publicly disclosed (e.g. tariff-based products with published rates). ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Encrypted (JWE)"),
                      createTextVNode(" — appropriate for individually underwritten policies where the premium reflects pricing decisions you do not want exposed in a TPP’s server-side analytics, switching pipelines, or third-party data flows. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Permission still required"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b2f5806e${_scopeId2}> The Hub only routes the request with <code data-v-b2f5806e${_scopeId2}>Premium</code> in scope when the consent grants <code data-v-b2f5806e${_scopeId2}>ReadInsurancePremium</code>. If the permission is absent for the relevant sector, omit the <code data-v-b2f5806e${_scopeId2}>Premium</code> field entirely — do not return an empty object or a placeholder JWE. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The Hub only routes the request with "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" in scope when the consent grants "),
                      createVNode("code", null, "ReadInsurancePremium"),
                      createTextVNode(". If the permission is absent for the relevant sector, omit the "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" field entirely — do not return an empty object or a placeholder JWE. ")
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
                  createTextVNode(" Encrypted premiums let your LFI surface commercially sensitive premium values to a customer-present TPP experience without the TPP backend ever holding the cleartext. The decision is per policy and entirely yours — the TPP and the API Hub do not influence it. Both shapes are valid under the OpenAPI spec, so the TPP is required to handle either on every call. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cleartext"),
                    createTextVNode(" — appropriate when the premium is non-sensitive or already publicly disclosed (e.g. tariff-based products with published rates). ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Encrypted (JWE)"),
                    createTextVNode(" — appropriate for individually underwritten policies where the premium reflects pricing decisions you do not want exposed in a TPP’s server-side analytics, switching pipelines, or third-party data flows. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Permission still required"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The Hub only routes the request with "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" in scope when the consent grants "),
                    createVNode("code", null, "ReadInsurancePremium"),
                    createTextVNode(". If the permission is absent for the relevant sector, omit the "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" field entirely — do not return an empty object or a placeholder JWE. ")
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
        id: "cleartext-shape",
        num: "02",
        color: "var(--at-gold, #b08800)",
        eyebrow: "Cleartext shape",
        title: "AEInsuranceDataSharingPremiumProperties",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Populate the structured object directly under the <code data-v-b2f5806e${_scopeId2}>Premium</code> key. All five fields are required by the OpenAPI spec. `);
                } else {
                  return [
                    createTextVNode(" Populate the structured object directly under the "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" key. All five fields are required by the OpenAPI spec. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: cleartextExample,
              lang: "json",
              filename: "cleartext Premium"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-b2f5806e${_scopeId2}><thead data-v-b2f5806e${_scopeId2}><tr data-v-b2f5806e${_scopeId2}><th data-v-b2f5806e${_scopeId2}>Field</th><th data-v-b2f5806e${_scopeId2}>Type</th><th data-v-b2f5806e${_scopeId2}>Description</th></tr></thead><tbody data-v-b2f5806e${_scopeId2}><tr data-v-b2f5806e${_scopeId2}><td data-v-b2f5806e${_scopeId2}><code data-v-b2f5806e${_scopeId2}>PremiumAmountExcludingVAT</code></td><td data-v-b2f5806e${_scopeId2}>string (amount)</td><td data-v-b2f5806e${_scopeId2}>The Premium Amount excluding any VAT amount.</td></tr><tr data-v-b2f5806e${_scopeId2}><td data-v-b2f5806e${_scopeId2}><code data-v-b2f5806e${_scopeId2}>PremiumVATAmount</code></td><td data-v-b2f5806e${_scopeId2}>string (amount)</td><td data-v-b2f5806e${_scopeId2}>The Premium VAT amount.</td></tr><tr data-v-b2f5806e${_scopeId2}><td data-v-b2f5806e${_scopeId2}><code data-v-b2f5806e${_scopeId2}>TotalPremiumAmount</code></td><td data-v-b2f5806e${_scopeId2}>string (amount)</td><td data-v-b2f5806e${_scopeId2}>The total Premium amount including VAT.</td></tr><tr data-v-b2f5806e${_scopeId2}><td data-v-b2f5806e${_scopeId2}><code data-v-b2f5806e${_scopeId2}>Currency</code></td><td data-v-b2f5806e${_scopeId2}>string (ISO 4217)</td><td data-v-b2f5806e${_scopeId2}>Currency of the premium amounts.</td></tr><tr data-v-b2f5806e${_scopeId2}><td data-v-b2f5806e${_scopeId2}><code data-v-b2f5806e${_scopeId2}>PremiumFrequency</code></td><td data-v-b2f5806e${_scopeId2}>enum</td><td data-v-b2f5806e${_scopeId2}>The payment frequency the calculated Premium has been based on.</td></tr></tbody></table>`);
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
                            createVNode("code", null, "PremiumAmountExcludingVAT")
                          ]),
                          createVNode("td", null, "string (amount)"),
                          createVNode("td", null, "The Premium Amount excluding any VAT amount.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PremiumVATAmount")
                          ]),
                          createVNode("td", null, "string (amount)"),
                          createVNode("td", null, "The Premium VAT amount.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TotalPremiumAmount")
                          ]),
                          createVNode("td", null, "string (amount)"),
                          createVNode("td", null, "The total Premium amount including VAT.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Currency")
                          ]),
                          createVNode("td", null, "string (ISO 4217)"),
                          createVNode("td", null, "Currency of the premium amounts.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "PremiumFrequency")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, "The payment frequency the calculated Premium has been based on.")
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
                  createTextVNode(" Populate the structured object directly under the "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(" key. All five fields are required by the OpenAPI spec. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: cleartextExample,
                lang: "json",
                filename: "cleartext Premium"
              }),
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
                          createVNode("code", null, "PremiumAmountExcludingVAT")
                        ]),
                        createVNode("td", null, "string (amount)"),
                        createVNode("td", null, "The Premium Amount excluding any VAT amount.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PremiumVATAmount")
                        ]),
                        createVNode("td", null, "string (amount)"),
                        createVNode("td", null, "The Premium VAT amount.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TotalPremiumAmount")
                        ]),
                        createVNode("td", null, "string (amount)"),
                        createVNode("td", null, "The total Premium amount including VAT.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Currency")
                        ]),
                        createVNode("td", null, "string (ISO 4217)"),
                        createVNode("td", null, "Currency of the premium amounts.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "PremiumFrequency")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, "The payment frequency the calculated Premium has been based on.")
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
        id: "jwe-shape",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Encrypted shape",
        title: "AEInsurancePremiumJWE",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Encrypt the same structured premium object as a compact JWE and place the resulting string directly under the <code data-v-b2f5806e${_scopeId2}>Premium</code> key — not wrapped in another object. `);
                } else {
                  return [
                    createTextVNode(" Encrypt the same structured premium object as a compact JWE and place the resulting string directly under the "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" key — not wrapped in another object. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: jweExample,
              lang: "json",
              filename: "encrypted Premium"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The JWE mechanism mirrors Bank Data Sharing’s encrypted <code data-v-b2f5806e${_scopeId2}>FinanceRates</code> field — same algorithms, same client-side decryption pattern, same handling obligations on the TPP. The customer-side decryption flow is documented for TPPs at <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" data-v-b2f5806e${_scopeId2}>Encrypted Premiums</a>; treat the LFI obligations on this page as the producer-side equivalent. `);
                } else {
                  return [
                    createTextVNode(" The JWE mechanism mirrors Bank Data Sharing’s encrypted "),
                    createVNode("code", null, "FinanceRates"),
                    createTextVNode(" field — same algorithms, same client-side decryption pattern, same handling obligations on the TPP. The customer-side decryption flow is documented for TPPs at "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                    createTextVNode("; treat the LFI obligations on this page as the producer-side equivalent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Do not mix shapes within one response"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-b2f5806e${_scopeId2}> A single policy response carries exactly one of the two shapes — either the cleartext object or the JWE string. Do not include both keys, do not embed the JWE inside the structured object, and do not return a partially populated structured object alongside a JWE. </p>`);
                } else {
                  return [
                    createVNode("p", null, " A single policy response carries exactly one of the two shapes — either the cleartext object or the JWE string. Do not include both keys, do not embed the JWE inside the structured object, and do not return a partially populated structured object alongside a JWE. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Encrypt the same structured premium object as a compact JWE and place the resulting string directly under the "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(" key — not wrapped in another object. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: jweExample,
                lang: "json",
                filename: "encrypted Premium"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The JWE mechanism mirrors Bank Data Sharing’s encrypted "),
                  createVNode("code", null, "FinanceRates"),
                  createTextVNode(" field — same algorithms, same client-side decryption pattern, same handling obligations on the TPP. The customer-side decryption flow is documented for TPPs at "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                  createTextVNode("; treat the LFI obligations on this page as the producer-side equivalent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Do not mix shapes within one response"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " A single policy response carries exactly one of the two shapes — either the cleartext object or the JWE string. Do not include both keys, do not embed the JWE inside the structured object, and do not return a partially populated structured object alongside a JWE. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/api-guide/premiums.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const premiums = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b2f5806e"]]);
export {
  premiums as default
};
