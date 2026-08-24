import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const invalidDebtorAccountJson = `{
  "data": {
    "status": "invalid",
    "code": "InvalidDebtorAccount",
    "description": "The supplied DebtorAccount is not recognised at this LFI or cannot be used for payment initiation."
  },
  "meta": {}
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "debtor-account",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e28ba354><section class="ed-doc__hero" data-v-e28ba354><div class="ed-doc__inner" data-v-e28ba354><div class="ed-doc__eyebrow" data-v-e28ba354><span class="ed-doc__eyebrow-dash" data-v-e28ba354></span> LFI · Banking · Service Initiation · PII </div><h1 class="ed-doc__title" data-v-e28ba354> Debtor Account <span class="ed-doc__read" data-v-e28ba354>2 min read</span></h1>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "info",
        title: "Consent validation only"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-e28ba354${_scopeId}><code data-v-e28ba354${_scopeId}>Initiation.DebtorAccount</code> is only present in the PII the LFI receives at <span class="endpoint" data-v-e28ba354${_scopeId}><span class="http-method http-method--post" data-v-e28ba354${_scopeId}>POST</span><code data-v-e28ba354${_scopeId}>/consent/action/validate</code></span> (consent validation). It is <strong data-v-e28ba354${_scopeId}>not part of the PII delivered with a payment instruction via Ozone Connect</strong> — by the time a payment is created, the debtor account has been fixed by the consent authorisation journey. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode("code", null, "Initiation.DebtorAccount"),
                createTextVNode(" is only present in the PII the LFI receives at "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" (consent validation). It is "),
                createVNode("strong", null, "not part of the PII delivered with a payment instruction via Ozone Connect"),
                createTextVNode(" — by the time a payment is created, the debtor account has been fixed by the consent authorisation journey. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="ed-doc__lede" data-v-e28ba354> When a TPP supplies <code data-v-e28ba354>Initiation.DebtorAccount</code> in the consent PII, the LFI MUST validate it during consent validation — <span class="endpoint" data-v-e28ba354><span class="http-method http-method--post" data-v-e28ba354>POST</span><code data-v-e28ba354>/consent/action/validate</code></span>. At this stage the customer has <strong data-v-e28ba354>not yet authenticated</strong>, so the LFI cannot check ownership. The checks are limited to whether the account exists at this LFI, is reachable through this API Hub, and is eligible for payment initiation. </p>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "tip",
        title: "Customer-specific checks happen later"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-e28ba354${_scopeId}> Checks that depend on the authenticated customer — e.g. whether the <code data-v-e28ba354${_scopeId}>DebtorAccount</code> supplied by the TPP actually belongs to the user who logs in at the LFI — are covered separately under the authorisation journey. This page covers only what the LFI MUST validate before the consent is stored. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" Checks that depend on the authenticated customer — e.g. whether the "),
                createVNode("code", null, "DebtorAccount"),
                createTextVNode(" supplied by the TPP actually belongs to the user who logs in at the LFI — are covered separately under the authorisation journey. This page covers only what the LFI MUST validate before the consent is stored. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "validation-requirements",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Validation requirements",
        title: "What to check after decryption",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Perform these checks after <a href="./api-guide/decrypt-pii" data-v-e28ba354${_scopeId2}>decrypting the PII</a> in the <span class="endpoint" data-v-e28ba354${_scopeId2}><span class="http-method http-method--post" data-v-e28ba354${_scopeId2}>POST</span><code data-v-e28ba354${_scopeId2}>/consent/action/validate</code></span> handler: `);
                } else {
                  return [
                    createTextVNode(" Perform these checks after "),
                    createVNode("a", { href: "./api-guide/decrypt-pii" }, "decrypting the PII"),
                    createTextVNode(" in the "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/action/validate")
                    ]),
                    createTextVNode(" handler: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e28ba354${_scopeId2}><thead data-v-e28ba354${_scopeId2}><tr data-v-e28ba354${_scopeId2}><th data-v-e28ba354${_scopeId2}>Check</th><th data-v-e28ba354${_scopeId2}>Rule</th></tr></thead><tbody data-v-e28ba354${_scopeId2}><tr data-v-e28ba354${_scopeId2}><td data-v-e28ba354${_scopeId2}>Schema</td><td data-v-e28ba354${_scopeId2}><code data-v-e28ba354${_scopeId2}>DebtorAccount</code> conforms to <code data-v-e28ba354${_scopeId2}>AEDomesticPaymentPII</code> — see <a href="./api-schema/pii-par" data-v-e28ba354${_scopeId2}>PII Schema — Consent</a></td></tr><tr data-v-e28ba354${_scopeId2}><td data-v-e28ba354${_scopeId2}>Scheme</td><td data-v-e28ba354${_scopeId2}><code data-v-e28ba354${_scopeId2}>SchemeName</code> MUST be <code data-v-e28ba354${_scopeId2}>IBAN</code></td></tr><tr data-v-e28ba354${_scopeId2}><td data-v-e28ba354${_scopeId2}>Account exists</td><td data-v-e28ba354${_scopeId2}><code data-v-e28ba354${_scopeId2}>Identification</code> (IBAN) corresponds to an account held at this LFI and reachable through this API Hub</td></tr><tr data-v-e28ba354${_scopeId2}><td data-v-e28ba354${_scopeId2}>Payments enabled</td><td data-v-e28ba354${_scopeId2}>The account is in a state that permits payment initiation (e.g. not blocked, dormant, or closed)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Check"),
                          createVNode("th", null, "Rule")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Schema"),
                          createVNode("td", null, [
                            createVNode("code", null, "DebtorAccount"),
                            createTextVNode(" conforms to "),
                            createVNode("code", null, "AEDomesticPaymentPII"),
                            createTextVNode(" — see "),
                            createVNode("a", { href: "./api-schema/pii-par" }, "PII Schema — Consent")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Scheme"),
                          createVNode("td", null, [
                            createVNode("code", null, "SchemeName"),
                            createTextVNode(" MUST be "),
                            createVNode("code", null, "IBAN")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Account exists"),
                          createVNode("td", null, [
                            createVNode("code", null, "Identification"),
                            createTextVNode(" (IBAN) corresponds to an account held at this LFI and reachable through this API Hub")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Payments enabled"),
                          createVNode("td", null, "The account is in a state that permits payment initiation (e.g. not blocked, dormant, or closed)")
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
                  createTextVNode(" Perform these checks after "),
                  createVNode("a", { href: "./api-guide/decrypt-pii" }, "decrypting the PII"),
                  createTextVNode(" in the "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" handler: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Check"),
                        createVNode("th", null, "Rule")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Schema"),
                        createVNode("td", null, [
                          createVNode("code", null, "DebtorAccount"),
                          createTextVNode(" conforms to "),
                          createVNode("code", null, "AEDomesticPaymentPII"),
                          createTextVNode(" — see "),
                          createVNode("a", { href: "./api-schema/pii-par" }, "PII Schema — Consent")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Scheme"),
                        createVNode("td", null, [
                          createVNode("code", null, "SchemeName"),
                          createTextVNode(" MUST be "),
                          createVNode("code", null, "IBAN")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Account exists"),
                        createVNode("td", null, [
                          createVNode("code", null, "Identification"),
                          createTextVNode(" (IBAN) corresponds to an account held at this LFI and reachable through this API Hub")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Payments enabled"),
                        createVNode("td", null, "The account is in a state that permits payment initiation (e.g. not blocked, dormant, or closed)")
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
        id: "rejecting-an-invalid-debtor-account",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Rejecting an invalid DebtorAccount",
        title: "Mark the consent invalid in the validate response",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If any check fails, the LFI MUST mark the consent invalid in its <span class="endpoint" data-v-e28ba354${_scopeId2}><span class="http-method http-method--post" data-v-e28ba354${_scopeId2}>POST</span><code data-v-e28ba354${_scopeId2}>/consent/action/validate</code></span> response. The API Hub will then reject the consent back to the TPP. `);
                } else {
                  return [
                    createTextVNode(" If any check fails, the LFI MUST mark the consent invalid in its "),
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
              code: invalidDebtorAccountJson,
              lang: "json",
              filename: "invalid validate response"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide" data-v-e28ba354${_scopeId2}>Consent Events &amp; Actions — API Guide</a> for the full <span class="endpoint" data-v-e28ba354${_scopeId2}><span class="http-method http-method--post" data-v-e28ba354${_scopeId2}>POST</span><code data-v-e28ba354${_scopeId2}>/consent/action/validate</code></span> flow and response schema. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide" }, "Consent Events & Actions — API Guide"),
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
                  createTextVNode(" If any check fails, the LFI MUST mark the consent invalid in its "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" response. The API Hub will then reject the consent back to the TPP. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: invalidDebtorAccountJson,
                lang: "json",
                filename: "invalid validate response"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide" }, "Consent Events & Actions — API Guide"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const debtorAccount = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e28ba354"]]);
export {
  debtorAccount as default
};
