import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const envelope = `{
  "verifiedClaims": [
    {
      "verification": {
        "trustFramework": "UAE.FI"
      },
      "claims": {
        "identityType": "Person",
        "fullName": "Ahmed Al Mansouri",
        "...": "..."
      }
    }
  ]
}`;
const customerExample = `{
  "data": {
    "id": "cust-001",
    "customerCategory": "Retail",
    "verifiedClaims": [
      {
        "verification": { "trustFramework": "UAE.FI" },
        "claims": {
          "identityType": "Person",
          "fullName": "Ahmed Al Mansouri",
          "givenName": "Ahmed",
          "familyName": "Al Mansouri",
          "emiratesId": "784-1985-1234567-1",
          "emiratesIdExpiryDate": "2029-06-15",
          "residentialAddress": {
            "streetAddress": "Building 12, Marina Walk",
            "locality": "Dubai",
            "country": "AE"
          }
        }
      }
    ]
  },
  "meta": {}
}`;
const accountCustomerExample = `{
  "data": [
    {
      "id": "cust-001",
      "customerType": "Joint",
      "customerCategory": "Retail",
      "accountRole": "Principal",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Person",
            "fullName": "Ahmed Al Mansouri",
            "emiratesId": "784-1985-1234567-1",
            "...": "..."
          }
        }
      ]
    },
    {
      "id": "cust-004",
      "customerType": "Joint",
      "customerCategory": "Retail",
      "accountRole": "SecondaryOwner",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Person",
            "fullName": "Mariam Al Mansouri",
            "emiratesId": "784-1987-7654321-2",
            "...": "..."
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 2 }
}`;
const copPersonExample = `{
  "data": [
    {
      "id": "cust-001",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "fullName": "Ahmed Al Mansouri",
            "givenName": "Ahmed",
            "familyName": "Al Mansouri"
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}`;
const copOrgExample = `{
  "data": [
    {
      "id": "cust-002",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "organisationClaims": {
            "name": "Al Mansouri Trading LLC"
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "identity-assurance-claims",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "why", label: "Why OIDC IDA" },
      { id: "envelope", label: "Envelope" },
      { id: "endpoints", label: "Per endpoint" },
      { id: "shared", label: "Shared shape" },
      { id: "summary", label: "Summary" }
    ];
    const meta = [
      { label: "Category", value: "Integration" },
      { label: "Read", value: "9 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["OIDC IDA", "Customer Data", "Ozone Connect"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-280ae940>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Identity Assurance Claims — OIDC IDA as the response format for customer data",
        meta,
        lede: "Three Ozone Connect endpoints return customer identity data — <code>GET /customer</code>, <code>GET /accounts/{accountId}/customer</code>, and <code>POST /customers/action/cop-query</code>. All three share the <strong>same response envelope</strong>, derived from <a href='https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html'>OpenID Connect for Identity Assurance 1.0</a>."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-280ae940${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-280ae940${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Why OIDC IDA",
        title: "Customer identity as verified claims",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`UAE Open Finance treats customer identity as <strong data-v-280ae940${_scopeId2}>verified claims</strong> — assertions about a person or organisation that the LFI has checked under a known framework. OIDC IDA is the standards-track JSON format for exactly this: claims grouped inside a <code data-v-280ae940${_scopeId2}>verifiedClaims</code> object, each group labelled with the <code data-v-280ae940${_scopeId2}>verification.trustFramework</code> under which it was verified.`);
                } else {
                  return [
                    createTextVNode("UAE Open Finance treats customer identity as "),
                    createVNode("strong", null, "verified claims"),
                    createTextVNode(" — assertions about a person or organisation that the LFI has checked under a known framework. OIDC IDA is the standards-track JSON format for exactly this: claims grouped inside a "),
                    createVNode("code", null, "verifiedClaims"),
                    createTextVNode(" object, each group labelled with the "),
                    createVNode("code", null, "verification.trustFramework"),
                    createTextVNode(" under which it was verified.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Reusing IDA across every customer-returning endpoint gives TPPs a single parser and a single mental model — whether the data comes from a consented account, a Confirmation of Payee lookup, or a direct call for the authenticated end user&#39;s identity, the shape is the same.`);
                } else {
                  return [
                    createTextVNode("Reusing IDA across every customer-returning endpoint gives TPPs a single parser and a single mental model — whether the data comes from a consented account, a Confirmation of Payee lookup, or a direct call for the authenticated end user's identity, the shape is the same.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "From the schema"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-280ae940${_scopeId2}><em data-v-280ae940${_scopeId2}>Party Identity Assurance (Response) Schema — Based on the <a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" data-v-280ae940${_scopeId2}>OpenID Connect for Identity Assurance 1.0 Specification</a></em></p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("em", null, [
                        createTextVNode("Party Identity Assurance (Response) Schema — Based on the "),
                        createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0 Specification")
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
                  createTextVNode("UAE Open Finance treats customer identity as "),
                  createVNode("strong", null, "verified claims"),
                  createTextVNode(" — assertions about a person or organisation that the LFI has checked under a known framework. OIDC IDA is the standards-track JSON format for exactly this: claims grouped inside a "),
                  createVNode("code", null, "verifiedClaims"),
                  createTextVNode(" object, each group labelled with the "),
                  createVNode("code", null, "verification.trustFramework"),
                  createTextVNode(" under which it was verified.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Reusing IDA across every customer-returning endpoint gives TPPs a single parser and a single mental model — whether the data comes from a consented account, a Confirmation of Payee lookup, or a direct call for the authenticated end user's identity, the shape is the same.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "From the schema"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("em", null, [
                      createTextVNode("Party Identity Assurance (Response) Schema — Based on the "),
                      createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0 Specification")
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
        id: "envelope",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Shared envelope",
        title: "The three-level structure used everywhere",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: envelope,
              lang: "json",
              filename: "verifiedClaims envelope"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-280ae940${_scopeId2}><thead data-v-280ae940${_scopeId2}><tr data-v-280ae940${_scopeId2}><th data-v-280ae940${_scopeId2}>Level</th><th data-v-280ae940${_scopeId2}>Purpose</th></tr></thead><tbody data-v-280ae940${_scopeId2}><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>verifiedClaims[]</code></td><td data-v-280ae940${_scopeId2}>Array — allows multiple claim groups for the same subject, each verified under a different framework or evidence path. Most LFIs return a single element</td></tr><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>verification</code></td><td data-v-280ae940${_scopeId2}>Describes how the claims were verified. <code data-v-280ae940${_scopeId2}>trustFramework</code> is the primary discriminator</td></tr><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>claims</code></td><td data-v-280ae940${_scopeId2}>The actual identity attributes — name, Emirates ID, address, business name, trade licence, etc.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Level"),
                          createVNode("th", null, "Purpose")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "verifiedClaims[]")
                          ]),
                          createVNode("td", null, "Array — allows multiple claim groups for the same subject, each verified under a different framework or evidence path. Most LFIs return a single element")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "verification")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Describes how the claims were verified. "),
                            createVNode("code", null, "trustFramework"),
                            createTextVNode(" is the primary discriminator")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "claims")
                          ]),
                          createVNode("td", null, "The actual identity attributes — name, Emirates ID, address, business name, trade licence, etc.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-280ae940${_scopeId}><code data-v-280ae940${_scopeId}>verification.trustFramework</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For UAE Open Finance, the canonical value is <code data-v-280ae940${_scopeId2}>UAE.FI</code> — the Trust Framework under which UAE Licensed Financial Institutions verify customer identity to onboarding standards set by the CBUAE.`);
                } else {
                  return [
                    createTextVNode("For UAE Open Finance, the canonical value is "),
                    createVNode("code", null, "UAE.FI"),
                    createTextVNode(" — the Trust Framework under which UAE Licensed Financial Institutions verify customer identity to onboarding standards set by the CBUAE.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-280ae940${_scopeId}><code data-v-280ae940${_scopeId}>claims</code> — person vs. organisation</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The shape of <code data-v-280ae940${_scopeId2}>claims</code> depends on whether the subject is a natural person or an organisation. <code data-v-280ae940${_scopeId2}>identityType</code> discriminates:`);
                } else {
                  return [
                    createTextVNode("The shape of "),
                    createVNode("code", null, "claims"),
                    createTextVNode(" depends on whether the subject is a natural person or an organisation. "),
                    createVNode("code", null, "identityType"),
                    createTextVNode(" discriminates:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-280ae940${_scopeId2}><thead data-v-280ae940${_scopeId2}><tr data-v-280ae940${_scopeId2}><th data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>identityType</code></th><th data-v-280ae940${_scopeId2}>Used for</th><th data-v-280ae940${_scopeId2}>Key claims</th></tr></thead><tbody data-v-280ae940${_scopeId2}><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>Person</code></td><td data-v-280ae940${_scopeId2}>Retail customers</td><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>fullName</code>, <code data-v-280ae940${_scopeId2}>givenName</code>, <code data-v-280ae940${_scopeId2}>familyName</code>, <code data-v-280ae940${_scopeId2}>emiratesId</code>, <code data-v-280ae940${_scopeId2}>emiratesIdExpiryDate</code>, <code data-v-280ae940${_scopeId2}>birthDate</code>, <code data-v-280ae940${_scopeId2}>nationality</code>, <code data-v-280ae940${_scopeId2}>mobileNumber</code>, <code data-v-280ae940${_scopeId2}>email</code>, <code data-v-280ae940${_scopeId2}>residentialAddress</code></td></tr><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>Organisation</code></td><td data-v-280ae940${_scopeId2}>SME / Corporate customers</td><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>businessName</code>, <code data-v-280ae940${_scopeId2}>tradeLicenceNumber</code>, <code data-v-280ae940${_scopeId2}>taxIdentificationNumber</code>, <code data-v-280ae940${_scopeId2}>dateOfIncorporation</code>, <code data-v-280ae940${_scopeId2}>countryOfIncorporation</code>, <code data-v-280ae940${_scopeId2}>corporateAddress</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createVNode("code", null, "identityType")
                          ]),
                          createVNode("th", null, "Used for"),
                          createVNode("th", null, "Key claims")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Person")
                          ]),
                          createVNode("td", null, "Retail customers"),
                          createVNode("td", null, [
                            createVNode("code", null, "fullName"),
                            createTextVNode(", "),
                            createVNode("code", null, "givenName"),
                            createTextVNode(", "),
                            createVNode("code", null, "familyName"),
                            createTextVNode(", "),
                            createVNode("code", null, "emiratesId"),
                            createTextVNode(", "),
                            createVNode("code", null, "emiratesIdExpiryDate"),
                            createTextVNode(", "),
                            createVNode("code", null, "birthDate"),
                            createTextVNode(", "),
                            createVNode("code", null, "nationality"),
                            createTextVNode(", "),
                            createVNode("code", null, "mobileNumber"),
                            createTextVNode(", "),
                            createVNode("code", null, "email"),
                            createTextVNode(", "),
                            createVNode("code", null, "residentialAddress")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Organisation")
                          ]),
                          createVNode("td", null, "SME / Corporate customers"),
                          createVNode("td", null, [
                            createVNode("code", null, "businessName"),
                            createTextVNode(", "),
                            createVNode("code", null, "tradeLicenceNumber"),
                            createTextVNode(", "),
                            createVNode("code", null, "taxIdentificationNumber"),
                            createTextVNode(", "),
                            createVNode("code", null, "dateOfIncorporation"),
                            createTextVNode(", "),
                            createVNode("code", null, "countryOfIncorporation"),
                            createTextVNode(", "),
                            createVNode("code", null, "corporateAddress")
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
                  _push3(`LFIs <strong data-v-280ae940${_scopeId2}>MUST</strong> populate every claim that exists or is derivable for the subject. The OpenAPI spec marks the minimum required set; holding back optional fields degrades the TPP experience without serving any protection purpose — the claims have already been released under the authorized consent.`);
                } else {
                  return [
                    createTextVNode("LFIs "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" populate every claim that exists or is derivable for the subject. The OpenAPI spec marks the minimum required set; holding back optional fields degrades the TPP experience without serving any protection purpose — the claims have already been released under the authorized consent.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: envelope,
                lang: "json",
                filename: "verifiedClaims envelope"
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Level"),
                        createVNode("th", null, "Purpose")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "verifiedClaims[]")
                        ]),
                        createVNode("td", null, "Array — allows multiple claim groups for the same subject, each verified under a different framework or evidence path. Most LFIs return a single element")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "verification")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Describes how the claims were verified. "),
                          createVNode("code", null, "trustFramework"),
                          createTextVNode(" is the primary discriminator")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "claims")
                        ]),
                        createVNode("td", null, "The actual identity attributes — name, Emirates ID, address, business name, trade licence, etc.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "verification.trustFramework")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For UAE Open Finance, the canonical value is "),
                  createVNode("code", null, "UAE.FI"),
                  createTextVNode(" — the Trust Framework under which UAE Licensed Financial Institutions verify customer identity to onboarding standards set by the CBUAE.")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "claims"),
                createTextVNode(" — person vs. organisation")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The shape of "),
                  createVNode("code", null, "claims"),
                  createTextVNode(" depends on whether the subject is a natural person or an organisation. "),
                  createVNode("code", null, "identityType"),
                  createTextVNode(" discriminates:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, [
                          createVNode("code", null, "identityType")
                        ]),
                        createVNode("th", null, "Used for"),
                        createVNode("th", null, "Key claims")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Person")
                        ]),
                        createVNode("td", null, "Retail customers"),
                        createVNode("td", null, [
                          createVNode("code", null, "fullName"),
                          createTextVNode(", "),
                          createVNode("code", null, "givenName"),
                          createTextVNode(", "),
                          createVNode("code", null, "familyName"),
                          createTextVNode(", "),
                          createVNode("code", null, "emiratesId"),
                          createTextVNode(", "),
                          createVNode("code", null, "emiratesIdExpiryDate"),
                          createTextVNode(", "),
                          createVNode("code", null, "birthDate"),
                          createTextVNode(", "),
                          createVNode("code", null, "nationality"),
                          createTextVNode(", "),
                          createVNode("code", null, "mobileNumber"),
                          createTextVNode(", "),
                          createVNode("code", null, "email"),
                          createTextVNode(", "),
                          createVNode("code", null, "residentialAddress")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Organisation")
                        ]),
                        createVNode("td", null, "SME / Corporate customers"),
                        createVNode("td", null, [
                          createVNode("code", null, "businessName"),
                          createTextVNode(", "),
                          createVNode("code", null, "tradeLicenceNumber"),
                          createTextVNode(", "),
                          createVNode("code", null, "taxIdentificationNumber"),
                          createTextVNode(", "),
                          createVNode("code", null, "dateOfIncorporation"),
                          createTextVNode(", "),
                          createVNode("code", null, "countryOfIncorporation"),
                          createTextVNode(", "),
                          createVNode("code", null, "corporateAddress")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("LFIs "),
                  createVNode("strong", null, "MUST"),
                  createTextVNode(" populate every claim that exists or is derivable for the subject. The OpenAPI spec marks the minimum required set; holding back optional fields degrades the TPP experience without serving any protection purpose — the claims have already been released under the authorized consent.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "endpoints",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Per endpoint",
        title: "How each endpoint uses the envelope",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-280ae940${_scopeId}><code data-v-280ae940${_scopeId}>GET /customer</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The record for the end user who authenticated the consent. The LFI identifies the end user from the <code data-v-280ae940${_scopeId2}>o3-psu-identifier</code> header and returns <strong data-v-280ae940${_scopeId2}>one</strong> customer record:`);
                } else {
                  return [
                    createTextVNode("The record for the end user who authenticated the consent. The LFI identifies the end user from the "),
                    createVNode("code", null, "o3-psu-identifier"),
                    createTextVNode(" header and returns "),
                    createVNode("strong", null, "one"),
                    createTextVNode(" customer record:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: customerExample,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Single object under <code data-v-280ae940${_scopeId2}>data</code>, not an array.`);
                } else {
                  return [
                    createTextVNode("Single object under "),
                    createVNode("code", null, "data"),
                    createTextVNode(", not an array.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-280ae940${_scopeId}><code data-v-280ae940${_scopeId}>GET /accounts/{accountId}/customer</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Returns <strong data-v-280ae940${_scopeId2}>one record per customer</strong> associated with the account. Joint accounts produce one record per joint holder. Each record carries <code data-v-280ae940${_scopeId2}>customerType</code> (<code data-v-280ae940${_scopeId2}>Sole</code>, <code data-v-280ae940${_scopeId2}>Joint</code>, <code data-v-280ae940${_scopeId2}>Delegate</code>) and <code data-v-280ae940${_scopeId2}>accountRole</code> (<code data-v-280ae940${_scopeId2}>Principal</code>, <code data-v-280ae940${_scopeId2}>SecondaryOwner</code>, <code data-v-280ae940${_scopeId2}>PowerOfAttorney</code>, etc.) in addition to the shared envelope:`);
                } else {
                  return [
                    createTextVNode("Returns "),
                    createVNode("strong", null, "one record per customer"),
                    createTextVNode(" associated with the account. Joint accounts produce one record per joint holder. Each record carries "),
                    createVNode("code", null, "customerType"),
                    createTextVNode(" ("),
                    createVNode("code", null, "Sole"),
                    createTextVNode(", "),
                    createVNode("code", null, "Joint"),
                    createTextVNode(", "),
                    createVNode("code", null, "Delegate"),
                    createTextVNode(") and "),
                    createVNode("code", null, "accountRole"),
                    createTextVNode(" ("),
                    createVNode("code", null, "Principal"),
                    createTextVNode(", "),
                    createVNode("code", null, "SecondaryOwner"),
                    createTextVNode(", "),
                    createVNode("code", null, "PowerOfAttorney"),
                    createTextVNode(", etc.) in addition to the shared envelope:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: accountCustomerExample,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-280ae940${_scopeId}><code data-v-280ae940${_scopeId}>POST /customers/action/cop-query</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Returns <strong data-v-280ae940${_scopeId2}>one record per customer</strong> on the account being looked up. The schema uses a slightly leaner shape — only the <code data-v-280ae940${_scopeId2}>verifiedClaims</code> envelope with the name-related claims the Hub needs to run the CoP match:`);
                } else {
                  return [
                    createTextVNode("Returns "),
                    createVNode("strong", null, "one record per customer"),
                    createTextVNode(" on the account being looked up. The schema uses a slightly leaner shape — only the "),
                    createVNode("code", null, "verifiedClaims"),
                    createTextVNode(" envelope with the name-related claims the Hub needs to run the CoP match:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: copPersonExample,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For business accounts, CoP uses <code data-v-280ae940${_scopeId2}>verifiedClaims[].organisationClaims.name</code> in place of <code data-v-280ae940${_scopeId2}>claims</code>:`);
                } else {
                  return [
                    createTextVNode("For business accounts, CoP uses "),
                    createVNode("code", null, "verifiedClaims[].organisationClaims.name"),
                    createTextVNode(" in place of "),
                    createVNode("code", null, "claims"),
                    createTextVNode(":")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: copOrgExample,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The Hub compares these values against the name submitted by the TPP and returns a match verdict to the caller.`);
                } else {
                  return [
                    createTextVNode("The Hub compares these values against the name submitted by the TPP and returns a match verdict to the caller.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, [
                createVNode("code", null, "GET /customer")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The record for the end user who authenticated the consent. The LFI identifies the end user from the "),
                  createVNode("code", null, "o3-psu-identifier"),
                  createTextVNode(" header and returns "),
                  createVNode("strong", null, "one"),
                  createTextVNode(" customer record:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: customerExample,
                lang: "json"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Single object under "),
                  createVNode("code", null, "data"),
                  createTextVNode(", not an array.")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "GET /accounts/{accountId}/customer")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Returns "),
                  createVNode("strong", null, "one record per customer"),
                  createTextVNode(" associated with the account. Joint accounts produce one record per joint holder. Each record carries "),
                  createVNode("code", null, "customerType"),
                  createTextVNode(" ("),
                  createVNode("code", null, "Sole"),
                  createTextVNode(", "),
                  createVNode("code", null, "Joint"),
                  createTextVNode(", "),
                  createVNode("code", null, "Delegate"),
                  createTextVNode(") and "),
                  createVNode("code", null, "accountRole"),
                  createTextVNode(" ("),
                  createVNode("code", null, "Principal"),
                  createTextVNode(", "),
                  createVNode("code", null, "SecondaryOwner"),
                  createTextVNode(", "),
                  createVNode("code", null, "PowerOfAttorney"),
                  createTextVNode(", etc.) in addition to the shared envelope:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: accountCustomerExample,
                lang: "json"
              }),
              createVNode("h3", null, [
                createVNode("code", null, "POST /customers/action/cop-query")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Returns "),
                  createVNode("strong", null, "one record per customer"),
                  createTextVNode(" on the account being looked up. The schema uses a slightly leaner shape — only the "),
                  createVNode("code", null, "verifiedClaims"),
                  createTextVNode(" envelope with the name-related claims the Hub needs to run the CoP match:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: copPersonExample,
                lang: "json"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For business accounts, CoP uses "),
                  createVNode("code", null, "verifiedClaims[].organisationClaims.name"),
                  createTextVNode(" in place of "),
                  createVNode("code", null, "claims"),
                  createTextVNode(":")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: copOrgExample,
                lang: "json"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The Hub compares these values against the name submitted by the TPP and returns a match verdict to the caller.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "shared",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Shared shape",
        title: "Why the same envelope for CoP as for data sharing",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`CoP and <code data-v-280ae940${_scopeId2}>GET /customer</code> have very different use cases — a name-match check before a payment vs. the full identity of a consented end user — but the shape of the answer is the same because the <strong data-v-280ae940${_scopeId2}>question</strong> is the same at its core: &quot;under which trust framework has this institution verified this party&#39;s identity, and what are the claims?&quot;`);
                } else {
                  return [
                    createTextVNode("CoP and "),
                    createVNode("code", null, "GET /customer"),
                    createTextVNode(" have very different use cases — a name-match check before a payment vs. the full identity of a consented end user — but the shape of the answer is the same because the "),
                    createVNode("strong", null, "question"),
                    createTextVNode(` is the same at its core: "under which trust framework has this institution verified this party's identity, and what are the claims?"`)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Having one envelope means LFIs implement one internal mapping from their core banking identity records to OIDC IDA, and that mapping serves every customer-returning endpoint. TPPs parse one format. Auditors review one schema.`);
                } else {
                  return [
                    createTextVNode("Having one envelope means LFIs implement one internal mapping from their core banking identity records to OIDC IDA, and that mapping serves every customer-returning endpoint. TPPs parse one format. Auditors review one schema.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("CoP and "),
                  createVNode("code", null, "GET /customer"),
                  createTextVNode(" have very different use cases — a name-match check before a payment vs. the full identity of a consented end user — but the shape of the answer is the same because the "),
                  createVNode("strong", null, "question"),
                  createTextVNode(` is the same at its core: "under which trust framework has this institution verified this party's identity, and what are the claims?"`)
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Having one envelope means LFIs implement one internal mapping from their core banking identity records to OIDC IDA, and that mapping serves every customer-returning endpoint. TPPs parse one format. Auditors review one schema.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "summary",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Summary",
        title: "At a glance",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-280ae940${_scopeId2}><thead data-v-280ae940${_scopeId2}><tr data-v-280ae940${_scopeId2}><th data-v-280ae940${_scopeId2}>Aspect</th><th data-v-280ae940${_scopeId2}>Rule</th></tr></thead><tbody data-v-280ae940${_scopeId2}><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}>Response envelope</td><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>verifiedClaims[]</code> → <code data-v-280ae940${_scopeId2}>verification</code> + <code data-v-280ae940${_scopeId2}>claims</code> (or <code data-v-280ae940${_scopeId2}>organisationClaims</code> for CoP businesses)</td></tr><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}>Trust framework</td><td data-v-280ae940${_scopeId2}><code data-v-280ae940${_scopeId2}>UAE.FI</code> for UAE Open Finance</td></tr><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}>Person vs. organisation</td><td data-v-280ae940${_scopeId2}>Discriminated by <code data-v-280ae940${_scopeId2}>identityType</code> (<code data-v-280ae940${_scopeId2}>Person</code> / <code data-v-280ae940${_scopeId2}>Organisation</code>)</td></tr><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}>Field population</td><td data-v-280ae940${_scopeId2}>Every claim the LFI holds or can derive <strong data-v-280ae940${_scopeId2}>MUST</strong> be populated</td></tr><tr data-v-280ae940${_scopeId2}><td data-v-280ae940${_scopeId2}>Source specification</td><td data-v-280ae940${_scopeId2}><a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" data-v-280ae940${_scopeId2}>OpenID Connect for Identity Assurance 1.0</a></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Aspect"),
                          createVNode("th", null, "Rule")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Response envelope"),
                          createVNode("td", null, [
                            createVNode("code", null, "verifiedClaims[]"),
                            createTextVNode(" → "),
                            createVNode("code", null, "verification"),
                            createTextVNode(" + "),
                            createVNode("code", null, "claims"),
                            createTextVNode(" (or "),
                            createVNode("code", null, "organisationClaims"),
                            createTextVNode(" for CoP businesses)")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Trust framework"),
                          createVNode("td", null, [
                            createVNode("code", null, "UAE.FI"),
                            createTextVNode(" for UAE Open Finance")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Person vs. organisation"),
                          createVNode("td", null, [
                            createTextVNode("Discriminated by "),
                            createVNode("code", null, "identityType"),
                            createTextVNode(" ("),
                            createVNode("code", null, "Person"),
                            createTextVNode(" / "),
                            createVNode("code", null, "Organisation"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Field population"),
                          createVNode("td", null, [
                            createTextVNode("Every claim the LFI holds or can derive "),
                            createVNode("strong", null, "MUST"),
                            createTextVNode(" be populated")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Source specification"),
                          createVNode("td", null, [
                            createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0")
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
                        createVNode("th", null, "Aspect"),
                        createVNode("th", null, "Rule")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Response envelope"),
                        createVNode("td", null, [
                          createVNode("code", null, "verifiedClaims[]"),
                          createTextVNode(" → "),
                          createVNode("code", null, "verification"),
                          createTextVNode(" + "),
                          createVNode("code", null, "claims"),
                          createTextVNode(" (or "),
                          createVNode("code", null, "organisationClaims"),
                          createTextVNode(" for CoP businesses)")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Trust framework"),
                        createVNode("td", null, [
                          createVNode("code", null, "UAE.FI"),
                          createTextVNode(" for UAE Open Finance")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Person vs. organisation"),
                        createVNode("td", null, [
                          createTextVNode("Discriminated by "),
                          createVNode("code", null, "identityType"),
                          createTextVNode(" ("),
                          createVNode("code", null, "Person"),
                          createTextVNode(" / "),
                          createVNode("code", null, "Organisation"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Field population"),
                        createVNode("td", null, [
                          createTextVNode("Every claim the LFI holds or can derive "),
                          createVNode("strong", null, "MUST"),
                          createTextVNode(" be populated")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Source specification"),
                        createVNode("td", null, [
                          createVNode("a", { href: "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html" }, "OpenID Connect for Identity Assurance 1.0")
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
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/consent-identifiers",
              category: "Consents",
              "category-color": "var(--at-teal)",
              title: "Consent Identifiers",
              desc: "Why end user and account IDs patched onto a consent must be opaque."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/tpp-context-block",
              category: "Integration",
              "category-color": "var(--at-blue-deep)",
              title: "The tpp and decodedSsa Context Blocks",
              desc: "What the TPP context object on every Ozone Connect call contains."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/consent-identifiers",
                category: "Consents",
                "category-color": "var(--at-teal)",
                title: "Consent Identifiers",
                desc: "Why end user and account IDs patched onto a consent must be opaque."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/tpp-context-block",
                category: "Integration",
                "category-color": "var(--at-blue-deep)",
                title: "The tpp and decodedSsa Context Blocks",
                desc: "What the TPP context object on every Ozone Connect call contains."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/identity-assurance-claims.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const identityAssuranceClaims = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-280ae940"]]);
export {
  identityAssuranceClaims as default
};
