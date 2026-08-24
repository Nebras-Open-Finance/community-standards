import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
const objectShape = `{
  "TradingName": "string",
  "LegalName": "string",
  "IdentifierType": "string",
  "Identifier": "string"
}`;
const dataSharingExample = `{
  "type": "urn:openfinanceuae:bank-data-sharing-consent:v2.1",
  "consent": {
    "Permissions": ["ReadAccountsBasic", "ReadBalances"],
    "ExpirationDateTime": "2026-02-21T12:00:00+00:00",
    "OnBehalfOf": {
      "TradingName": "Acme Aggregation Ltd",
      "LegalName": "Acme Aggregation Limited",
      "IdentifierType": "Other",
      "Identifier": "AA-TPP-12345"
    }
  }
}`;
const paymentExample = `{
  "type": "urn:openfinanceuae:bank-service-initiation-consent:v2.1",
  "consent": {
    "PersonalIdentifiableInformation": {
      "Initiation": {
        "Creditor": {
          "Name": "Example Merchant Ltd"
        },
        "CreditorAccount": {
          "Name": {
            "en": "Example Merchant",
            "ar": "مثال التاجر"
          }
        }
      }
    }
  }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "on-behalf-of",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "when", label: "When to use" },
      { id: "object", label: "The object" },
      { id: "where", label: "Where it applies" },
      { id: "payments", label: "Payments" },
      { id: "examples", label: "Examples" },
      { id: "checklist", label: "Checklist" }
    ];
    const meta = [
      { label: "Category", value: "Consents" },
      { label: "Read", value: "5 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["Consents", "OnBehalfOf", "Data Sharing"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-1bd48fc5>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "OnBehalfOf — When to Use It and When Not To",
        meta,
        lede: "<code>OnBehalfOf</code> appears in <strong>Bank Data Sharing</strong> and <strong>Insurance Data Sharing</strong> PAR schemas to declare that the TPP is acting on behalf of another regulated entity. For <strong>Bank Service Initiation (payment) PARs</strong>, <code>OnBehalfOf</code> is not used — the payment recipient is represented via creditor fields instead."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-1bd48fc5${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-1bd48fc5${_scopeId}>${ssrInterpolate(t)}</span>`);
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
        id: "when",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "When to use",
        title: "Acting for another regulated entity",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Populate <code data-v-1bd48fc5${_scopeId2}>OnBehalfOf</code> when the caller (TPP) is requesting authorisation for <strong data-v-1bd48fc5${_scopeId2}>bank or insurance data sharing only</strong>, but is doing so on behalf of another legal or regulated entity:`);
                } else {
                  return [
                    createTextVNode("Populate "),
                    createVNode("code", null, "OnBehalfOf"),
                    createTextVNode(" when the caller (TPP) is requesting authorisation for "),
                    createVNode("strong", null, "bank or insurance data sharing only"),
                    createTextVNode(", but is doing so on behalf of another legal or regulated entity:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-1bd48fc5${_scopeId2}>A TPP provides technology services to an LFI and stages the PAR on behalf of that LFI.</li><li data-v-1bd48fc5${_scopeId2}>A licensed aggregator or reseller acts as the technical integration layer for another regulated entity.</li>`);
                } else {
                  return [
                    createVNode("li", null, "A TPP provides technology services to an LFI and stages the PAR on behalf of that LFI."),
                    createVNode("li", null, "A licensed aggregator or reseller acts as the technical integration layer for another regulated entity.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If the TPP is representing itself (no other regulated entity is involved), <code data-v-1bd48fc5${_scopeId2}>OnBehalfOf</code> is not required.`);
                } else {
                  return [
                    createTextVNode("If the TPP is representing itself (no other regulated entity is involved), "),
                    createVNode("code", null, "OnBehalfOf"),
                    createTextVNode(" is not required.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Populate "),
                  createVNode("code", null, "OnBehalfOf"),
                  createTextVNode(" when the caller (TPP) is requesting authorisation for "),
                  createVNode("strong", null, "bank or insurance data sharing only"),
                  createTextVNode(", but is doing so on behalf of another legal or regulated entity:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "A TPP provides technology services to an LFI and stages the PAR on behalf of that LFI."),
                  createVNode("li", null, "A licensed aggregator or reseller acts as the technical integration layer for another regulated entity.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If the TPP is representing itself (no other regulated entity is involved), "),
                  createVNode("code", null, "OnBehalfOf"),
                  createTextVNode(" is not required.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "object",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "The object",
        title: "Field shape",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: objectShape,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-1bd48fc5${_scopeId2}><thead data-v-1bd48fc5${_scopeId2}><tr data-v-1bd48fc5${_scopeId2}><th data-v-1bd48fc5${_scopeId2}>Field</th><th data-v-1bd48fc5${_scopeId2}>Description</th></tr></thead><tbody data-v-1bd48fc5${_scopeId2}><tr data-v-1bd48fc5${_scopeId2}><td data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>TradingName</code></td><td data-v-1bd48fc5${_scopeId2}>The trading name of the entity being represented.</td></tr><tr data-v-1bd48fc5${_scopeId2}><td data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>LegalName</code></td><td data-v-1bd48fc5${_scopeId2}>The registered legal name of the entity.</td></tr><tr data-v-1bd48fc5${_scopeId2}><td data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>IdentifierType</code></td><td data-v-1bd48fc5${_scopeId2}>Identifier scheme — currently <code data-v-1bd48fc5${_scopeId2}>&quot;Other&quot;</code> in the published schema.</td></tr><tr data-v-1bd48fc5${_scopeId2}><td data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>Identifier</code></td><td data-v-1bd48fc5${_scopeId2}>The identifier value for the represented entity.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TradingName")
                          ]),
                          createVNode("td", null, "The trading name of the entity being represented.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LegalName")
                          ]),
                          createVNode("td", null, "The registered legal name of the entity.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IdentifierType")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Identifier scheme — currently "),
                            createVNode("code", null, '"Other"'),
                            createTextVNode(" in the published schema.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Identifier")
                          ]),
                          createVNode("td", null, "The identifier value for the represented entity.")
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
              createVNode(_component_EdCode, {
                code: objectShape,
                lang: "json"
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TradingName")
                        ]),
                        createVNode("td", null, "The trading name of the entity being represented.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LegalName")
                        ]),
                        createVNode("td", null, "The registered legal name of the entity.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IdentifierType")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Identifier scheme — currently "),
                          createVNode("code", null, '"Other"'),
                          createTextVNode(" in the published schema.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Identifier")
                        ]),
                        createVNode("td", null, "The identifier value for the represented entity.")
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
        id: "where",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Where it applies",
        title: "Per consent type",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-1bd48fc5${_scopeId2}><thead data-v-1bd48fc5${_scopeId2}><tr data-v-1bd48fc5${_scopeId2}><th data-v-1bd48fc5${_scopeId2}>Consent type</th><th data-v-1bd48fc5${_scopeId2}>OnBehalfOf supported?</th><th data-v-1bd48fc5${_scopeId2}>Notes</th></tr></thead><tbody data-v-1bd48fc5${_scopeId2}><tr data-v-1bd48fc5${_scopeId2}><td data-v-1bd48fc5${_scopeId2}>Bank Data Sharing</td><td data-v-1bd48fc5${_scopeId2}>Yes</td><td data-v-1bd48fc5${_scopeId2}>Declare the legal entity the TPP is acting for within the rich authorisation request.</td></tr><tr data-v-1bd48fc5${_scopeId2}><td data-v-1bd48fc5${_scopeId2}>Insurance Data Sharing</td><td data-v-1bd48fc5${_scopeId2}>Yes</td><td data-v-1bd48fc5${_scopeId2}>References a common <code data-v-1bd48fc5${_scopeId2}>AEOnBehalfOf</code> object — same intent and fields.</td></tr><tr data-v-1bd48fc5${_scopeId2}><td data-v-1bd48fc5${_scopeId2}>Bank Service Initiation (payments)</td><td data-v-1bd48fc5${_scopeId2}><strong data-v-1bd48fc5${_scopeId2}>No</strong></td><td data-v-1bd48fc5${_scopeId2}>Not used. Merchant identity is carried via the creditor fields in the payment consent.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Consent type"),
                          createVNode("th", null, "OnBehalfOf supported?"),
                          createVNode("th", null, "Notes")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Bank Data Sharing"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "Declare the legal entity the TPP is acting for within the rich authorisation request.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Insurance Data Sharing"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("References a common "),
                            createVNode("code", null, "AEOnBehalfOf"),
                            createTextVNode(" object — same intent and fields.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Bank Service Initiation (payments)"),
                          createVNode("td", null, [
                            createVNode("strong", null, "No")
                          ]),
                          createVNode("td", null, "Not used. Merchant identity is carried via the creditor fields in the payment consent.")
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
                        createVNode("th", null, "Consent type"),
                        createVNode("th", null, "OnBehalfOf supported?"),
                        createVNode("th", null, "Notes")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Bank Data Sharing"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "Declare the legal entity the TPP is acting for within the rich authorisation request.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Insurance Data Sharing"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("References a common "),
                          createVNode("code", null, "AEOnBehalfOf"),
                          createTextVNode(" object — same intent and fields.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Bank Service Initiation (payments)"),
                        createVNode("td", null, [
                          createVNode("strong", null, "No")
                        ]),
                        createVNode("td", null, "Not used. Merchant identity is carried via the creditor fields in the payment consent.")
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
        id: "payments",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Payments",
        title: "Use creditor fields instead",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For payment consents, the user must be shown who the payment is going to. This information is provided via the creditor fields in the payment consent — not via <code data-v-1bd48fc5${_scopeId2}>OnBehalfOf</code>.`);
                } else {
                  return [
                    createTextVNode("For payment consents, the user must be shown who the payment is going to. This information is provided via the creditor fields in the payment consent — not via "),
                    createVNode("code", null, "OnBehalfOf"),
                    createTextVNode(".")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Populate the creditor fields so the LFI can display the recipient (merchant/payee) to the user:`);
                } else {
                  return [
                    createTextVNode("Populate the creditor fields so the LFI can display the recipient (merchant/payee) to the user:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-1bd48fc5${_scopeId2}>Prefer <strong data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>Creditor.Name</code></strong> when it is provided.</li><li data-v-1bd48fc5${_scopeId2}>If <code data-v-1bd48fc5${_scopeId2}>Creditor.Name</code> is not present, fall back to <strong data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>CreditorAccount.Name.en</code></strong> or <strong data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>CreditorAccount.Name.ar</code></strong> as applicable.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Prefer "),
                      createVNode("strong", null, [
                        createVNode("code", null, "Creditor.Name")
                      ]),
                      createTextVNode(" when it is provided.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("If "),
                      createVNode("code", null, "Creditor.Name"),
                      createTextVNode(" is not present, fall back to "),
                      createVNode("strong", null, [
                        createVNode("code", null, "CreditorAccount.Name.en")
                      ]),
                      createTextVNode(" or "),
                      createVNode("strong", null, [
                        createVNode("code", null, "CreditorAccount.Name.ar")
                      ]),
                      createTextVNode(" as applicable.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This ensures the user sees a meaningful recipient name when authorising the payment.`);
                } else {
                  return [
                    createTextVNode("This ensures the user sees a meaningful recipient name when authorising the payment.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-1bd48fc5${_scopeId2}>Do not attempt to carry merchant identity in an <code data-v-1bd48fc5${_scopeId2}>OnBehalfOf</code> object for payment consents — it is not part of the service initiation schema and will be ignored or rejected.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("Do not attempt to carry merchant identity in an "),
                      createVNode("code", null, "OnBehalfOf"),
                      createTextVNode(" object for payment consents — it is not part of the service initiation schema and will be ignored or rejected.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-1bd48fc5${_scopeId}>Merchant Name on the authorisation page</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If the TPP populates <code data-v-1bd48fc5${_scopeId2}>Risk.CreditorIndicators.MerchantDetails.MerchantName</code> in the PII payload, the LFI <strong data-v-1bd48fc5${_scopeId2}>must</strong> reflect this on the authorisation page by displaying the merchant name in the permission header:`);
                } else {
                  return [
                    createTextVNode("If the TPP populates "),
                    createVNode("code", null, "Risk.CreditorIndicators.MerchantDetails.MerchantName"),
                    createTextVNode(" in the PII payload, the LFI "),
                    createVNode("strong", null, "must"),
                    createTextVNode(" reflect this on the authorisation page by displaying the merchant name in the permission header:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "With MerchantName"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-1bd48fc5${_scopeId2}><strong data-v-1bd48fc5${_scopeId2}>[TPP trading name] needs your permission on-behalf of [MerchantName] to make the payment below:</strong></p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "[TPP trading name] needs your permission on-behalf of [MerchantName] to make the payment below:")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`When <code data-v-1bd48fc5${_scopeId2}>MerchantName</code> is not present, the standard wording is shown:`);
                } else {
                  return [
                    createTextVNode("When "),
                    createVNode("code", null, "MerchantName"),
                    createTextVNode(" is not present, the standard wording is shown:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Without MerchantName"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-1bd48fc5${_scopeId2}><strong data-v-1bd48fc5${_scopeId2}>[TPP trading name] needs your permission to make the payment below:</strong></p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("strong", null, "[TPP trading name] needs your permission to make the payment below:")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This allows TPPs acting as a payment facilitator or aggregator on behalf of a sub-merchant to surface that merchant&#39;s identity clearly to the user at the point of authorisation.`);
                } else {
                  return [
                    createTextVNode("This allows TPPs acting as a payment facilitator or aggregator on behalf of a sub-merchant to surface that merchant's identity clearly to the user at the point of authorisation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For payment consents, the user must be shown who the payment is going to. This information is provided via the creditor fields in the payment consent — not via "),
                  createVNode("code", null, "OnBehalfOf"),
                  createTextVNode(".")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Populate the creditor fields so the LFI can display the recipient (merchant/payee) to the user:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("Prefer "),
                    createVNode("strong", null, [
                      createVNode("code", null, "Creditor.Name")
                    ]),
                    createTextVNode(" when it is provided.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("If "),
                    createVNode("code", null, "Creditor.Name"),
                    createTextVNode(" is not present, fall back to "),
                    createVNode("strong", null, [
                      createVNode("code", null, "CreditorAccount.Name.en")
                    ]),
                    createTextVNode(" or "),
                    createVNode("strong", null, [
                      createVNode("code", null, "CreditorAccount.Name.ar")
                    ]),
                    createTextVNode(" as applicable.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This ensures the user sees a meaningful recipient name when authorising the payment.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Do not attempt to carry merchant identity in an "),
                    createVNode("code", null, "OnBehalfOf"),
                    createTextVNode(" object for payment consents — it is not part of the service initiation schema and will be ignored or rejected.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Merchant Name on the authorisation page"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If the TPP populates "),
                  createVNode("code", null, "Risk.CreditorIndicators.MerchantDetails.MerchantName"),
                  createTextVNode(" in the PII payload, the LFI "),
                  createVNode("strong", null, "must"),
                  createTextVNode(" reflect this on the authorisation page by displaying the merchant name in the permission header:")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "With MerchantName"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "[TPP trading name] needs your permission on-behalf of [MerchantName] to make the payment below:")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("When "),
                  createVNode("code", null, "MerchantName"),
                  createTextVNode(" is not present, the standard wording is shown:")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Without MerchantName"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("strong", null, "[TPP trading name] needs your permission to make the payment below:")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This allows TPPs acting as a payment facilitator or aggregator on behalf of a sub-merchant to surface that merchant's identity clearly to the user at the point of authorisation.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "examples",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Examples",
        title: "Concrete payloads",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-1bd48fc5${_scopeId}>Bank Data Sharing PAR (with OnBehalfOf)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Use this structure when the TPP is staging the PAR on behalf of another regulated entity:`);
                } else {
                  return [
                    createTextVNode("Use this structure when the TPP is staging the PAR on behalf of another regulated entity:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: dataSharingExample,
              lang: "json",
              filename: "Bank Data Sharing PAR"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-1bd48fc5${_scopeId}>Bank Service Initiation PAR (payment) — creditor fields for merchant identity</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Use the creditor fields to identify the payment recipient — not <code data-v-1bd48fc5${_scopeId2}>OnBehalfOf</code>:`);
                } else {
                  return [
                    createTextVNode("Use the creditor fields to identify the payment recipient — not "),
                    createVNode("code", null, "OnBehalfOf"),
                    createTextVNode(":")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: paymentExample,
              lang: "json",
              filename: "Bank Service Initiation PAR"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-1bd48fc5${_scopeId2}>In production, <code data-v-1bd48fc5${_scopeId2}>PersonalIdentifiableInformation</code> is a JWE encrypted with the LFI&#39;s encryption key. The structure above shows the decrypted payload for illustration.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("In production, "),
                      createVNode("code", null, "PersonalIdentifiableInformation"),
                      createTextVNode(" is a JWE encrypted with the LFI's encryption key. The structure above shows the decrypted payload for illustration.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Bank Data Sharing PAR (with OnBehalfOf)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Use this structure when the TPP is staging the PAR on behalf of another regulated entity:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: dataSharingExample,
                lang: "json",
                filename: "Bank Data Sharing PAR"
              }),
              createVNode("h3", null, "Bank Service Initiation PAR (payment) — creditor fields for merchant identity"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Use the creditor fields to identify the payment recipient — not "),
                  createVNode("code", null, "OnBehalfOf"),
                  createTextVNode(":")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: paymentExample,
                lang: "json",
                filename: "Bank Service Initiation PAR"
              }),
              createVNode(_component_EdNote, { type: "info" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("In production, "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(" is a JWE encrypted with the LFI's encryption key. The structure above shows the decrypted payload for illustration.")
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
        id: "checklist",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Implementation checklist",
        title: "Practical rules of thumb",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-1bd48fc5${_scopeId2}>If acting on behalf of another regulated entity, include <code data-v-1bd48fc5${_scopeId2}>OnBehalfOf</code> in <strong data-v-1bd48fc5${_scopeId2}>Bank Data Sharing</strong> or <strong data-v-1bd48fc5${_scopeId2}>Insurance Data Sharing</strong> PARs.</li><li data-v-1bd48fc5${_scopeId2}>For payment consents, populate <strong data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>Creditor.Name</code></strong> — or <strong data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>CreditorAccount.Name.en</code></strong> / <strong data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>CreditorAccount.Name.ar</code></strong> if <code data-v-1bd48fc5${_scopeId2}>Creditor.Name</code> is not available — so the LFI can display the recipient to the user.</li><li data-v-1bd48fc5${_scopeId2}>If the TPP is acting as a payment facilitator for a sub-merchant, populate <strong data-v-1bd48fc5${_scopeId2}><code data-v-1bd48fc5${_scopeId2}>Risk.CreditorIndicators.MerchantDetails.MerchantName</code></strong> in the PII payload so the LFI can display the merchant name on the authorisation page.</li><li data-v-1bd48fc5${_scopeId2}>Do <strong data-v-1bd48fc5${_scopeId2}>not</strong> use <code data-v-1bd48fc5${_scopeId2}>OnBehalfOf</code> in service initiation (payment) PARs.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("If acting on behalf of another regulated entity, include "),
                      createVNode("code", null, "OnBehalfOf"),
                      createTextVNode(" in "),
                      createVNode("strong", null, "Bank Data Sharing"),
                      createTextVNode(" or "),
                      createVNode("strong", null, "Insurance Data Sharing"),
                      createTextVNode(" PARs.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("For payment consents, populate "),
                      createVNode("strong", null, [
                        createVNode("code", null, "Creditor.Name")
                      ]),
                      createTextVNode(" — or "),
                      createVNode("strong", null, [
                        createVNode("code", null, "CreditorAccount.Name.en")
                      ]),
                      createTextVNode(" / "),
                      createVNode("strong", null, [
                        createVNode("code", null, "CreditorAccount.Name.ar")
                      ]),
                      createTextVNode(" if "),
                      createVNode("code", null, "Creditor.Name"),
                      createTextVNode(" is not available — so the LFI can display the recipient to the user.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("If the TPP is acting as a payment facilitator for a sub-merchant, populate "),
                      createVNode("strong", null, [
                        createVNode("code", null, "Risk.CreditorIndicators.MerchantDetails.MerchantName")
                      ]),
                      createTextVNode(" in the PII payload so the LFI can display the merchant name on the authorisation page.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Do "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" use "),
                      createVNode("code", null, "OnBehalfOf"),
                      createTextVNode(" in service initiation (payment) PARs.")
                    ])
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
                    createTextVNode("If acting on behalf of another regulated entity, include "),
                    createVNode("code", null, "OnBehalfOf"),
                    createTextVNode(" in "),
                    createVNode("strong", null, "Bank Data Sharing"),
                    createTextVNode(" or "),
                    createVNode("strong", null, "Insurance Data Sharing"),
                    createTextVNode(" PARs.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("For payment consents, populate "),
                    createVNode("strong", null, [
                      createVNode("code", null, "Creditor.Name")
                    ]),
                    createTextVNode(" — or "),
                    createVNode("strong", null, [
                      createVNode("code", null, "CreditorAccount.Name.en")
                    ]),
                    createTextVNode(" / "),
                    createVNode("strong", null, [
                      createVNode("code", null, "CreditorAccount.Name.ar")
                    ]),
                    createTextVNode(" if "),
                    createVNode("code", null, "Creditor.Name"),
                    createTextVNode(" is not available — so the LFI can display the recipient to the user.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("If the TPP is acting as a payment facilitator for a sub-merchant, populate "),
                    createVNode("strong", null, [
                      createVNode("code", null, "Risk.CreditorIndicators.MerchantDetails.MerchantName")
                    ]),
                    createTextVNode(" in the PII payload so the LFI can display the merchant name on the authorisation page.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Do "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" use "),
                    createVNode("code", null, "OnBehalfOf"),
                    createTextVNode(" in service initiation (payment) PARs.")
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
              href: "/knowledge-base/articles/pii-encryption",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "Payment PII Encryption",
              desc: "Why PII in payment consents is encrypted end-to-end."
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
                href: "/knowledge-base/articles/pii-encryption",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "Payment PII Encryption",
                desc: "Why PII in payment consents is encrypted end-to-end."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/on-behalf-of.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const onBehalfOf = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bd48fc5"]]);
export {
  onBehalfOf as default
};
