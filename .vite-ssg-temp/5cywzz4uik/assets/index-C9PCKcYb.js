import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const policiesListJson = `{
  "Data": {
    "Policy": [
      {
        "InsurancePolicyId": "policy-001",
        "PolicyNumber": "MTR-2025-000123",
        "PolicyStatus": "Active",
        "InceptionDate": "2025-01-15",
        "RenewalDate": "2026-01-14",
        "Insurer": { "Name": "Example Insurance LLC" },
        "Premium": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NN..."
      }
    ]
  },
  "Links": {
    "Self": "https://ozone-connect.example.ae/motor-insurance-policies"
  },
  "Meta": {}
}
`;
const policyByIdJson = `{
  "Data": {
    "Policy": {
      "InsurancePolicyId": "policy-001",
      "PolicyNumber": "MTR-2025-000123",
      "PolicyStatus": "Active",
      "Insurer": { "Name": "Example Insurance LLC" },
      "Premium": {
        "PremiumAmountExcludingVAT": "950.00",
        "PremiumVATAmount": "47.50",
        "TotalPremiumAmount": "997.50",
        "Currency": "AED",
        "PremiumFrequency": "Annually"
      }
    }
  },
  "Meta": {}
}
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-383c6e7c><section class="ed-doc__hero" data-v-383c6e7c><div class="ed-doc__inner" data-v-383c6e7c><div class="ed-doc__eyebrow" data-v-383c6e7c><span class="ed-doc__eyebrow-dash" data-v-383c6e7c></span> LFI · Insurance · Data Sharing </div><h1 class="ed-doc__title" data-v-383c6e7c> Insurance Data Sharing — API Guide <span class="ed-doc__read" data-v-383c6e7c>5 min read</span></h1><p class="ed-doc__lede" data-v-383c6e7c> How your Ozone Connect server receives, processes, and responds to Insurance Data Sharing requests proxied by the API Hub. The end-to-end flow — consent validation, authorisation, token issuance — is identical to Bank Data Sharing; this page focuses on the insurance-specific differences. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "positioning",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Where this fits",
        title: "What you implement on Ozone Connect",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For Insurance Data Sharing, your LFI implements one pair of endpoints per insurance sector you underwrite on your Ozone Connect server: `);
                } else {
                  return [
                    createTextVNode(" For Insurance Data Sharing, your LFI implements one pair of endpoints per insurance sector you underwrite on your Ozone Connect server: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-383c6e7c${_scopeId2}><thead data-v-383c6e7c${_scopeId2}><tr data-v-383c6e7c${_scopeId2}><th data-v-383c6e7c${_scopeId2}>Endpoint</th><th data-v-383c6e7c${_scopeId2}>Purpose</th></tr></thead><tbody data-v-383c6e7c${_scopeId2}><tr data-v-383c6e7c${_scopeId2}><td data-v-383c6e7c${_scopeId2}><span class="endpoint" data-v-383c6e7c${_scopeId2}><span class="http-method http-method--get" data-v-383c6e7c${_scopeId2}>GET</span><code data-v-383c6e7c${_scopeId2}>/{type}-insurance-policies</code></span></td><td data-v-383c6e7c${_scopeId2}>Return every policy of the named sector the consent grants access to.</td></tr><tr data-v-383c6e7c${_scopeId2}><td data-v-383c6e7c${_scopeId2}><span class="endpoint" data-v-383c6e7c${_scopeId2}><span class="http-method http-method--get" data-v-383c6e7c${_scopeId2}>GET</span><code data-v-383c6e7c${_scopeId2}>/{type}-insurance-policies/{InsurancePolicyId}</code></span></td><td data-v-383c6e7c${_scopeId2}>Return the single policy identified by the path parameter, after checking it belongs to the consented customer.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Endpoint"),
                          createVNode("th", null, "Purpose")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/{type}-insurance-policies")
                            ])
                          ]),
                          createVNode("td", null, "Return every policy of the named sector the consent grants access to.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("span", { class: "endpoint" }, [
                              createVNode("span", { class: "http-method http-method--get" }, "GET"),
                              createVNode("code", null, "/{type}-insurance-policies/{InsurancePolicyId}")
                            ])
                          ]),
                          createVNode("td", null, "Return the single policy identified by the path parameter, after checking it belongs to the consented customer.")
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
                  _push3(` Substitute the sector slug (<code data-v-383c6e7c${_scopeId2}>employment</code>, <code data-v-383c6e7c${_scopeId2}>health</code>, <code data-v-383c6e7c${_scopeId2}>home</code>, <code data-v-383c6e7c${_scopeId2}>life</code>, <code data-v-383c6e7c${_scopeId2}>motor</code>, <code data-v-383c6e7c${_scopeId2}>renters</code>, <code data-v-383c6e7c${_scopeId2}>travel</code>) for <code data-v-383c6e7c${_scopeId2}>{type}</code>. Implement only the sectors your LFI underwrites — the API Hub will not route requests for unmounted sectors. `);
                } else {
                  return [
                    createTextVNode(" Substitute the sector slug ("),
                    createVNode("code", null, "employment"),
                    createTextVNode(", "),
                    createVNode("code", null, "health"),
                    createTextVNode(", "),
                    createVNode("code", null, "home"),
                    createTextVNode(", "),
                    createVNode("code", null, "life"),
                    createTextVNode(", "),
                    createVNode("code", null, "motor"),
                    createTextVNode(", "),
                    createVNode("code", null, "renters"),
                    createTextVNode(", "),
                    createVNode("code", null, "travel"),
                    createTextVNode(") for "),
                    createVNode("code", null, "{type}"),
                    createTextVNode(". Implement only the sectors your LFI underwrites — the API Hub will not route requests for unmounted sectors. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For Insurance Data Sharing, your LFI implements one pair of endpoints per insurance sector you underwrite on your Ozone Connect server: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Endpoint"),
                        createVNode("th", null, "Purpose")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/{type}-insurance-policies")
                          ])
                        ]),
                        createVNode("td", null, "Return every policy of the named sector the consent grants access to.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("span", { class: "endpoint" }, [
                            createVNode("span", { class: "http-method http-method--get" }, "GET"),
                            createVNode("code", null, "/{type}-insurance-policies/{InsurancePolicyId}")
                          ])
                        ]),
                        createVNode("td", null, "Return the single policy identified by the path parameter, after checking it belongs to the consented customer.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Substitute the sector slug ("),
                  createVNode("code", null, "employment"),
                  createTextVNode(", "),
                  createVNode("code", null, "health"),
                  createTextVNode(", "),
                  createVNode("code", null, "home"),
                  createTextVNode(", "),
                  createVNode("code", null, "life"),
                  createTextVNode(", "),
                  createVNode("code", null, "motor"),
                  createTextVNode(", "),
                  createVNode("code", null, "renters"),
                  createTextVNode(", "),
                  createVNode("code", null, "travel"),
                  createTextVNode(") for "),
                  createVNode("code", null, "{type}"),
                  createTextVNode(". Implement only the sectors your LFI underwrites — the API Hub will not route requests for unmounted sectors. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "consent-validation",
        num: "02",
        color: "var(--at-gold, #b08800)",
        eyebrow: "Consent validation",
        title: "Same validate hook as Bank Data Sharing",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` During consent creation, if your LFI has configured the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" class="endpoint" data-v-383c6e7c${_scopeId2}><span class="http-method http-method--post" data-v-383c6e7c${_scopeId2}>POST</span><code data-v-383c6e7c${_scopeId2}>/consent/action/validate</code></a> endpoint, the API Hub forwards the full insurance consent payload to your Ozone Connect server before the consent is created. For Insurance Data Sharing consents, <code data-v-383c6e7c${_scopeId2}>consentType</code> is <code data-v-383c6e7c${_scopeId2}>cbuae-insurance-consents</code>. `);
                } else {
                  return [
                    createTextVNode(" During consent creation, if your LFI has configured the "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/consent/action/validate")
                    ]),
                    createTextVNode(" endpoint, the API Hub forwards the full insurance consent payload to your Ozone Connect server before the consent is created. For Insurance Data Sharing consents, "),
                    createVNode("code", null, "consentType"),
                    createTextVNode(" is "),
                    createVNode("code", null, "cbuae-insurance-consents"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The mechanics are identical to Bank Data Sharing — respond with <code data-v-383c6e7c${_scopeId2}>data.status: valid</code> to allow the consent, or <code data-v-383c6e7c${_scopeId2}>invalid</code> with an error if the requested permissions cannot be granted. See the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide#step-2-optional-validate-the-consent" data-v-383c6e7c${_scopeId2}>Consent Journey API Guide — Validate the consent</a> for the request and response shapes. `);
                } else {
                  return [
                    createTextVNode(" The mechanics are identical to Bank Data Sharing — respond with "),
                    createVNode("code", null, "data.status: valid"),
                    createTextVNode(" to allow the consent, or "),
                    createVNode("code", null, "invalid"),
                    createTextVNode(" with an error if the requested permissions cannot be granted. See the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide#step-2-optional-validate-the-consent" }, "Consent Journey API Guide — Validate the consent"),
                    createTextVNode(" for the request and response shapes. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" During consent creation, if your LFI has configured the "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" endpoint, the API Hub forwards the full insurance consent payload to your Ozone Connect server before the consent is created. For Insurance Data Sharing consents, "),
                  createVNode("code", null, "consentType"),
                  createTextVNode(" is "),
                  createVNode("code", null, "cbuae-insurance-consents"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The mechanics are identical to Bank Data Sharing — respond with "),
                  createVNode("code", null, "data.status: valid"),
                  createTextVNode(" to allow the consent, or "),
                  createVNode("code", null, "invalid"),
                  createTextVNode(" with an error if the requested permissions cannot be granted. See the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide#step-2-optional-validate-the-consent" }, "Consent Journey API Guide — Validate the consent"),
                  createTextVNode(" for the request and response shapes. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "auth-flow",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Consent flow",
        title: "Authorize the customer at your LFI",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the consent has been created, the TPP redirects the customer to your LFI’s authorisation endpoint — the same URL you registered for Bank Data Sharing. From there, your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it, patch the customer identifier onto the consent, and redirect back to the Hub. `);
                } else {
                  return [
                    createTextVNode(" Once the consent has been created, the TPP redirects the customer to your LFI’s authorisation endpoint — the same URL you registered for Bank Data Sharing. From there, your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it, patch the customer identifier onto the consent, and redirect back to the Hub. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The endpoints your LFI implements against the API Hub for this flow are the same as Bank Data Sharing — see <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide#consent-flow" data-v-383c6e7c${_scopeId2}>Bank Data Sharing — Consent flow</a> for the full list. The only difference for insurance is that there are no per-account identifiers to patch; the consent is granted at the policy-collection level per sector, and the Hub forwards each policy lookup directly to your endpoints. `);
                } else {
                  return [
                    createTextVNode(" The endpoints your LFI implements against the API Hub for this flow are the same as Bank Data Sharing — see "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide#consent-flow" }, "Bank Data Sharing — Consent flow"),
                    createTextVNode(" for the full list. The only difference for insurance is that there are no per-account identifiers to patch; the consent is granted at the policy-collection level per sector, and the Hub forwards each policy lookup directly to your endpoints. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once the consent has been created, the TPP redirects the customer to your LFI’s authorisation endpoint — the same URL you registered for Bank Data Sharing. From there, your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it, patch the customer identifier onto the consent, and redirect back to the Hub. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The endpoints your LFI implements against the API Hub for this flow are the same as Bank Data Sharing — see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide#consent-flow" }, "Bank Data Sharing — Consent flow"),
                  createTextVNode(" for the full list. The only difference for insurance is that there are no per-account identifiers to patch; the consent is granted at the policy-collection level per sector, and the Hub forwards each policy lookup directly to your endpoints. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "conventions",
        num: "04",
        color: "var(--at-teal-deep)",
        eyebrow: "Ozone Connect Insurance responses",
        title: "Shared conventions",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="ed-doc__subhead" data-v-383c6e7c${_scopeId}>Field population</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every field that <strong data-v-383c6e7c${_scopeId2}>exists</strong> on the LFI’s systems, or is <strong data-v-383c6e7c${_scopeId2}>derivable</strong> from them, MUST be populated in the response. TPPs rely on this data to serve customer use cases end-to-end — a field omitted by the LFI is a feature the TPP cannot build. `);
                } else {
                  return [
                    createTextVNode(" Every field that "),
                    createVNode("strong", null, "exists"),
                    createTextVNode(" on the LFI’s systems, or is "),
                    createVNode("strong", null, "derivable"),
                    createTextVNode(" from them, MUST be populated in the response. TPPs rely on this data to serve customer use cases end-to-end — a field omitted by the LFI is a feature the TPP cannot build. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-383c6e7c${_scopeId}>Common request headers</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Insurance endpoints receive the same set of <code data-v-383c6e7c${_scopeId2}>o3-*</code> headers from the API Hub as Bank Data Sharing. See <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide#common-request-headers" data-v-383c6e7c${_scopeId2}>Common request headers</a> for the full table. `);
                } else {
                  return [
                    createTextVNode(" Insurance endpoints receive the same set of "),
                    createVNode("code", null, "o3-*"),
                    createTextVNode(" headers from the API Hub as Bank Data Sharing. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide#common-request-headers" }, "Common request headers"),
                    createTextVNode(" for the full table. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-383c6e7c${_scopeId}>No pagination</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Insurance policy endpoints return the full set of consented policies for the named sector in a single response. There is no <code data-v-383c6e7c${_scopeId2}>page</code> query parameter, and <code data-v-383c6e7c${_scopeId2}>Meta</code> does not carry <code data-v-383c6e7c${_scopeId2}>TotalPages</code> or <code data-v-383c6e7c${_scopeId2}>TotalRecords</code>. If the consent grants access to twelve motor policies, your <code data-v-383c6e7c${_scopeId2}>/motor-insurance-policies</code> response MUST contain all twelve. `);
                } else {
                  return [
                    createTextVNode(" Insurance policy endpoints return the full set of consented policies for the named sector in a single response. There is no "),
                    createVNode("code", null, "page"),
                    createTextVNode(" query parameter, and "),
                    createVNode("code", null, "Meta"),
                    createTextVNode(" does not carry "),
                    createVNode("code", null, "TotalPages"),
                    createTextVNode(" or "),
                    createVNode("code", null, "TotalRecords"),
                    createTextVNode(". If the consent grants access to twelve motor policies, your "),
                    createVNode("code", null, "/motor-insurance-policies"),
                    createTextVNode(" response MUST contain all twelve. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-383c6e7c${_scopeId}>Error responses</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use the same UAE Open Finance error envelope and HTTP status codes as Bank Data Sharing. <code data-v-383c6e7c${_scopeId2}>404</code> for an <code data-v-383c6e7c${_scopeId2}>InsurancePolicyId</code> the consent does not grant access to. <code data-v-383c6e7c${_scopeId2}>403</code> if the policy exists but is not in a state your LFI surfaces (e.g. cancelled and outside the retention window). The Hub validates token, consent, and TPP role before the request reaches your endpoint; you do not re-validate any of those. `);
                } else {
                  return [
                    createTextVNode(" Use the same UAE Open Finance error envelope and HTTP status codes as Bank Data Sharing. "),
                    createVNode("code", null, "404"),
                    createTextVNode(" for an "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" the consent does not grant access to. "),
                    createVNode("code", null, "403"),
                    createTextVNode(" if the policy exists but is not in a state your LFI surfaces (e.g. cancelled and outside the retention window). The Hub validates token, consent, and TPP role before the request reaches your endpoint; you do not re-validate any of those. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", { class: "ed-doc__subhead" }, "Field population"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every field that "),
                  createVNode("strong", null, "exists"),
                  createTextVNode(" on the LFI’s systems, or is "),
                  createVNode("strong", null, "derivable"),
                  createTextVNode(" from them, MUST be populated in the response. TPPs rely on this data to serve customer use cases end-to-end — a field omitted by the LFI is a feature the TPP cannot build. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Common request headers"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Insurance endpoints receive the same set of "),
                  createVNode("code", null, "o3-*"),
                  createTextVNode(" headers from the API Hub as Bank Data Sharing. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide#common-request-headers" }, "Common request headers"),
                  createTextVNode(" for the full table. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "No pagination"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Insurance policy endpoints return the full set of consented policies for the named sector in a single response. There is no "),
                  createVNode("code", null, "page"),
                  createTextVNode(" query parameter, and "),
                  createVNode("code", null, "Meta"),
                  createTextVNode(" does not carry "),
                  createVNode("code", null, "TotalPages"),
                  createTextVNode(" or "),
                  createVNode("code", null, "TotalRecords"),
                  createTextVNode(". If the consent grants access to twelve motor policies, your "),
                  createVNode("code", null, "/motor-insurance-policies"),
                  createTextVNode(" response MUST contain all twelve. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Error responses"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Use the same UAE Open Finance error envelope and HTTP status codes as Bank Data Sharing. "),
                  createVNode("code", null, "404"),
                  createTextVNode(" for an "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" the consent does not grant access to. "),
                  createVNode("code", null, "403"),
                  createTextVNode(" if the policy exists but is not in a state your LFI surfaces (e.g. cancelled and outside the retention window). The Hub validates token, consent, and TPP role before the request reaches your endpoint; you do not re-validate any of those. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "list-policies",
        num: "05",
        color: "var(--at-teal)",
        eyebrow: "GET /{type}-insurance-policies",
        title: "Return all consented policies for a sector",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-383c6e7c${_scopeId}><span class="http-badge http-get" data-v-383c6e7c${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-383c6e7c${_scopeId}>/{type}-insurance-policies</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return every active policy of the named sector the consent grants access to. Each <code data-v-383c6e7c${_scopeId2}>Policy</code> entry MUST include the fields required by the OpenAPI spec for that sector, plus every optional field your LFI holds. `);
                } else {
                  return [
                    createTextVNode(" Return every active policy of the named sector the consent grants access to. Each "),
                    createVNode("code", null, "Policy"),
                    createTextVNode(" entry MUST include the fields required by the OpenAPI spec for that sector, plus every optional field your LFI holds. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-383c6e7c${_scopeId}>Required permission</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Hub only routes the request to your endpoint if the consent contains <code data-v-383c6e7c${_scopeId2}>ReadInsurancePolicies</code> for the named sector. You do not need to re-check the permission. `);
                } else {
                  return [
                    createTextVNode(" The Hub only routes the request to your endpoint if the consent contains "),
                    createVNode("code", null, "ReadInsurancePolicies"),
                    createTextVNode(" for the named sector. You do not need to re-check the permission. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-383c6e7c${_scopeId}>Example response</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: policiesListJson,
              lang: "json",
              filename: "GET /motor-insurance-policies"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/{type}-insurance-policies")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return every active policy of the named sector the consent grants access to. Each "),
                  createVNode("code", null, "Policy"),
                  createTextVNode(" entry MUST include the fields required by the OpenAPI spec for that sector, plus every optional field your LFI holds. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Required permission"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Hub only routes the request to your endpoint if the consent contains "),
                  createVNode("code", null, "ReadInsurancePolicies"),
                  createTextVNode(" for the named sector. You do not need to re-check the permission. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example response"),
              createVNode(_component_EdCode, {
                code: policiesListJson,
                lang: "json",
                filename: "GET /motor-insurance-policies"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "get-policy",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "GET /{type}-insurance-policies/{InsurancePolicyId}",
        title: "Return a single policy",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-383c6e7c${_scopeId}><span class="http-badge http-get" data-v-383c6e7c${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-383c6e7c${_scopeId}>/{type}-insurance-policies/{InsurancePolicyId}</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Return the single policy identified by <code data-v-383c6e7c${_scopeId2}>InsurancePolicyId</code>. The <code data-v-383c6e7c${_scopeId2}>InsurancePolicyId</code> MUST belong to a policy your LFI underwrites for the customer identified by the <code data-v-383c6e7c${_scopeId2}>o3-psu-identifier</code> header — if it does not, respond with <code data-v-383c6e7c${_scopeId2}>404</code>. `);
                } else {
                  return [
                    createTextVNode(" Return the single policy identified by "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(". The "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" MUST belong to a policy your LFI underwrites for the customer identified by the "),
                    createVNode("code", null, "o3-psu-identifier"),
                    createTextVNode(" header — if it does not, respond with "),
                    createVNode("code", null, "404"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-383c6e7c${_scopeId}>Example response</h3>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: policyByIdJson,
              lang: "json",
              filename: "GET /motor-insurance-policies/policy-001"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/{type}-insurance-policies/{InsurancePolicyId}")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Return the single policy identified by "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(". The "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" MUST belong to a policy your LFI underwrites for the customer identified by the "),
                  createVNode("code", null, "o3-psu-identifier"),
                  createTextVNode(" header — if it does not, respond with "),
                  createVNode("code", null, "404"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example response"),
              createVNode(_component_EdCode, {
                code: policyByIdJson,
                lang: "json",
                filename: "GET /motor-insurance-policies/policy-001"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "premium-field",
        num: "07",
        color: "var(--at-navy)",
        eyebrow: "Encrypted Premium",
        title: "Returning the Premium field as a JWE",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <code data-v-383c6e7c${_scopeId2}>Premium</code> field on every policy is defined as <code data-v-383c6e7c${_scopeId2}>anyOf</code> a structured <code data-v-383c6e7c${_scopeId2}>AEInsurance.AEInsuranceDataSharingPremiumProperties</code> object or an <code data-v-383c6e7c${_scopeId2}>AEInsurance.AEInsurancePremiumJWE</code> compact string. Your LFI decides, per policy, whether to return the premium in cleartext or as an encrypted JWE. `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" field on every policy is defined as "),
                    createVNode("code", null, "anyOf"),
                    createTextVNode(" a structured "),
                    createVNode("code", null, "AEInsurance.AEInsuranceDataSharingPremiumProperties"),
                    createTextVNode(" object or an "),
                    createVNode("code", null, "AEInsurance.AEInsurancePremiumJWE"),
                    createTextVNode(" compact string. Your LFI decides, per policy, whether to return the premium in cleartext or as an encrypted JWE. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-383c6e7c${_scopeId2}><strong data-v-383c6e7c${_scopeId2}>Cleartext</strong> — populate the structured object with <code data-v-383c6e7c${_scopeId2}>PremiumAmountExcludingVAT</code>, <code data-v-383c6e7c${_scopeId2}>PremiumVATAmount</code>, <code data-v-383c6e7c${_scopeId2}>TotalPremiumAmount</code>, <code data-v-383c6e7c${_scopeId2}>Currency</code>, and <code data-v-383c6e7c${_scopeId2}>PremiumFrequency</code>. </li><li data-v-383c6e7c${_scopeId2}><strong data-v-383c6e7c${_scopeId2}>Encrypted (JWE)</strong> — encrypt the same structured object as a compact JWE using key material the customer’s device can unwrap. The TPP MUST NOT decrypt the JWE on its server — this lets you surface premium values that are commercially sensitive without the TPP backend ever holding the cleartext. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Cleartext"),
                      createTextVNode(" — populate the structured object with "),
                      createVNode("code", null, "PremiumAmountExcludingVAT"),
                      createTextVNode(", "),
                      createVNode("code", null, "PremiumVATAmount"),
                      createTextVNode(", "),
                      createVNode("code", null, "TotalPremiumAmount"),
                      createTextVNode(", "),
                      createVNode("code", null, "Currency"),
                      createTextVNode(", and "),
                      createVNode("code", null, "PremiumFrequency"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Encrypted (JWE)"),
                      createTextVNode(" — encrypt the same structured object as a compact JWE using key material the customer’s device can unwrap. The TPP MUST NOT decrypt the JWE on its server — this lets you surface premium values that are commercially sensitive without the TPP backend ever holding the cleartext. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Whichever shape you choose, return it under the <code data-v-383c6e7c${_scopeId2}>Premium</code> key in the policy object. The TPP guide explains the customer-device decryption flow in detail at <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" data-v-383c6e7c${_scopeId2}>Encrypted Premiums</a>. `);
                } else {
                  return [
                    createTextVNode(" Whichever shape you choose, return it under the "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" key in the policy object. The TPP guide explains the customer-device decryption flow in detail at "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Permission gating"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-383c6e7c${_scopeId2}> The Hub only routes the request with <code data-v-383c6e7c${_scopeId2}>Premium</code> in scope if the consent contains <code data-v-383c6e7c${_scopeId2}>ReadInsurancePremium</code> for the relevant sector. If the consent does not include this permission, omit the <code data-v-383c6e7c${_scopeId2}>Premium</code> field entirely from the response. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The Hub only routes the request with "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" in scope if the consent contains "),
                      createVNode("code", null, "ReadInsurancePremium"),
                      createTextVNode(" for the relevant sector. If the consent does not include this permission, omit the "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" field entirely from the response. ")
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
                  createTextVNode(" The "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(" field on every policy is defined as "),
                  createVNode("code", null, "anyOf"),
                  createTextVNode(" a structured "),
                  createVNode("code", null, "AEInsurance.AEInsuranceDataSharingPremiumProperties"),
                  createTextVNode(" object or an "),
                  createVNode("code", null, "AEInsurance.AEInsurancePremiumJWE"),
                  createTextVNode(" compact string. Your LFI decides, per policy, whether to return the premium in cleartext or as an encrypted JWE. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Cleartext"),
                    createTextVNode(" — populate the structured object with "),
                    createVNode("code", null, "PremiumAmountExcludingVAT"),
                    createTextVNode(", "),
                    createVNode("code", null, "PremiumVATAmount"),
                    createTextVNode(", "),
                    createVNode("code", null, "TotalPremiumAmount"),
                    createTextVNode(", "),
                    createVNode("code", null, "Currency"),
                    createTextVNode(", and "),
                    createVNode("code", null, "PremiumFrequency"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Encrypted (JWE)"),
                    createTextVNode(" — encrypt the same structured object as a compact JWE using key material the customer’s device can unwrap. The TPP MUST NOT decrypt the JWE on its server — this lets you surface premium values that are commercially sensitive without the TPP backend ever holding the cleartext. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Whichever shape you choose, return it under the "),
                  createVNode("code", null, "Premium"),
                  createTextVNode(" key in the policy object. The TPP guide explains the customer-device decryption flow in detail at "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Permission gating"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The Hub only routes the request with "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" in scope if the consent contains "),
                    createVNode("code", null, "ReadInsurancePremium"),
                    createTextVNode(" for the relevant sector. If the consent does not include this permission, omit the "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" field entirely from the response. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/api-guide/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-383c6e7c"]]);
export {
  index as default
};
