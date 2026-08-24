import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6$1, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BDBcOaPe.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "consent-identifiers",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "rule", label: "The rule" },
      { id: "why", label: "Why" },
      { id: "format", label: "Format rules" }
    ];
    const meta = [
      { label: "Category", value: "Consents" },
      { label: "Read", value: "6 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["Consents", "end user Identifiers", "Data Protection"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCallout = __unplugin_components_6;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRelatedCards = __unplugin_components_6$1;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-c3d53684>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Consent Identifiers — Why End User and Account IDs Must Be Opaque",
        meta,
        lede: "When an LFI authorises a consent, it patches identifiers onto it — the end user who authenticated (<code>psuIdentifiers</code>) and the accounts the end user selected (<code>accountIds</code>). These values are stored centrally in the API Hub and used to enrich every TPP request proxied to the LFI."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-c3d53684${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-c3d53684${_scopeId}>${ssrInterpolate(t)}</span>`);
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
        id: "rule",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "The rule",
        title: "What you MUST NOT use as an identifier",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Because these values live outside the LFI&#39;s own systems, they <strong data-v-c3d53684${_scopeId2}>MUST</strong> be <strong data-v-c3d53684${_scopeId2}>opaque internal references</strong> — never the underlying personal or account data they point to. `);
                } else {
                  return [
                    createTextVNode(" Because these values live outside the LFI's own systems, they "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" be "),
                    createVNode("strong", null, "opaque internal references"),
                    createTextVNode(" — never the underlying personal or account data they point to. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Any value patched onto a consent <strong data-v-c3d53684${_scopeId2}>MUST NOT</strong> be a sensitive or personally identifiable value. An LFI <strong data-v-c3d53684${_scopeId2}>MUST NOT</strong> use any of the following as an identifier on the consent: `);
                } else {
                  return [
                    createTextVNode(" Any value patched onto a consent "),
                    createVNode("strong", null, "MUST NOT"),
                    createTextVNode(" be a sensitive or personally identifiable value. An LFI "),
                    createVNode("strong", null, "MUST NOT"),
                    createTextVNode(" use any of the following as an identifier on the consent: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-c3d53684${_scopeId2}>Emirates ID, passport number, or any regulated national identifier</li><li data-v-c3d53684${_scopeId2}>Full name, date of birth, email, or mobile number</li><li data-v-c3d53684${_scopeId2}>IBAN, account number, card number, or PAN</li><li data-v-c3d53684${_scopeId2}>CIF number or any other internal identifier that maps 1:1 to regulated data</li>`);
                } else {
                  return [
                    createVNode("li", null, "Emirates ID, passport number, or any regulated national identifier"),
                    createVNode("li", null, "Full name, date of birth, email, or mobile number"),
                    createVNode("li", null, "IBAN, account number, card number, or PAN"),
                    createVNode("li", null, "CIF number or any other internal identifier that maps 1:1 to regulated data")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The identifier <strong data-v-c3d53684${_scopeId2}>MUST</strong> be an LFI-defined opaque reference that is meaningful only inside the LFI&#39;s own systems. The LFI resolves it back to the real customer or account internally when processing a request. `);
                } else {
                  return [
                    createTextVNode(" The identifier "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" be an LFI-defined opaque reference that is meaningful only inside the LFI's own systems. The LFI resolves it back to the real customer or account internally when processing a request. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Because these values live outside the LFI's own systems, they "),
                  createVNode("strong", null, "MUST"),
                  createTextVNode(" be "),
                  createVNode("strong", null, "opaque internal references"),
                  createTextVNode(" — never the underlying personal or account data they point to. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Any value patched onto a consent "),
                  createVNode("strong", null, "MUST NOT"),
                  createTextVNode(" be a sensitive or personally identifiable value. An LFI "),
                  createVNode("strong", null, "MUST NOT"),
                  createTextVNode(" use any of the following as an identifier on the consent: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Emirates ID, passport number, or any regulated national identifier"),
                  createVNode("li", null, "Full name, date of birth, email, or mobile number"),
                  createVNode("li", null, "IBAN, account number, card number, or PAN"),
                  createVNode("li", null, "CIF number or any other internal identifier that maps 1:1 to regulated data")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The identifier "),
                  createVNode("strong", null, "MUST"),
                  createTextVNode(" be an LFI-defined opaque reference that is meaningful only inside the LFI's own systems. The LFI resolves it back to the real customer or account internally when processing a request. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "why",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Why",
        title: "The hub stores it; therefore it must be opaque",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The API Hub is the central consent store for UAE Open Finance. Consents — including the identifiers patched onto them — are persisted centrally, visible to operators of the API Hub, and surface in operational logs and reports. They are long-lived and outlive individual sessions. `);
                } else {
                  return [
                    createTextVNode(" The API Hub is the central consent store for UAE Open Finance. Consents — including the identifiers patched onto them — are persisted centrally, visible to operators of the API Hub, and surface in operational logs and reports. They are long-lived and outlive individual sessions. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCallout, { color: "var(--at-gold)" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c3d53684${_scopeId2}> Storing sensitive values on the consent would <strong data-v-c3d53684${_scopeId2}>leak PII outside the LFI&#39;s boundary</strong>, create a durable record of regulated data the LFI cannot unwind, and break the trust model where the API Hub receives only opaque handles from the LFI. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Storing sensitive values on the consent would "),
                      createVNode("strong", null, "leak PII outside the LFI's boundary"),
                      createTextVNode(", create a durable record of regulated data the LFI cannot unwind, and break the trust model where the API Hub receives only opaque handles from the LFI. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The same principle governs payment PII, which is encrypted end-to-end to keep personal data opaque to the hub — see <a href="/knowledge-base/articles/pii-encryption" data-v-c3d53684${_scopeId2}>PII Encryption</a>. `);
                } else {
                  return [
                    createTextVNode(" The same principle governs payment PII, which is encrypted end-to-end to keep personal data opaque to the hub — see "),
                    createVNode("a", { href: "/knowledge-base/articles/pii-encryption" }, "PII Encryption"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The API Hub is the central consent store for UAE Open Finance. Consents — including the identifiers patched onto them — are persisted centrally, visible to operators of the API Hub, and surface in operational logs and reports. They are long-lived and outlive individual sessions. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCallout, { color: "var(--at-gold)" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Storing sensitive values on the consent would "),
                    createVNode("strong", null, "leak PII outside the LFI's boundary"),
                    createTextVNode(", create a durable record of regulated data the LFI cannot unwind, and break the trust model where the API Hub receives only opaque handles from the LFI. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The same principle governs payment PII, which is encrypted end-to-end to keep personal data opaque to the hub — see "),
                  createVNode("a", { href: "/knowledge-base/articles/pii-encryption" }, "PII Encryption"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "format",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "Format rules",
        title: "Per-identifier requirements",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-c3d53684${_scopeId2}><thead data-v-c3d53684${_scopeId2}><tr data-v-c3d53684${_scopeId2}><th data-v-c3d53684${_scopeId2}>Identifier</th><th data-v-c3d53684${_scopeId2}>Requirement</th></tr></thead><tbody data-v-c3d53684${_scopeId2}><tr data-v-c3d53684${_scopeId2}><td data-v-c3d53684${_scopeId2}><code data-v-c3d53684${_scopeId2}>psuIdentifiers.userId</code></td><td data-v-c3d53684${_scopeId2}>Opaque string. Stable per end user (same value across all their consents). Unique within the LFI. UUID v4 recommended.</td></tr><tr data-v-c3d53684${_scopeId2}><td data-v-c3d53684${_scopeId2}><code data-v-c3d53684${_scopeId2}>accountIds[]</code></td><td data-v-c3d53684${_scopeId2}>Array of opaque strings, 1–40 chars each, <code data-v-c3d53684${_scopeId2}>minItems: 1</code>. Each value <strong data-v-c3d53684${_scopeId2}>MUST</strong> match the <code data-v-c3d53684${_scopeId2}>AccountId</code> the LFI returns from its <code data-v-c3d53684${_scopeId2}>/accounts</code> APIs. Immutable once issued. UUID v4 recommended.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Identifier"),
                          createVNode("th", null, "Requirement")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "psuIdentifiers.userId")
                          ]),
                          createVNode("td", null, "Opaque string. Stable per end user (same value across all their consents). Unique within the LFI. UUID v4 recommended.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "accountIds[]")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Array of opaque strings, 1–40 chars each, "),
                            createVNode("code", null, "minItems: 1"),
                            createTextVNode(". Each value "),
                            createVNode("strong", null, "MUST"),
                            createTextVNode(" match the "),
                            createVNode("code", null, "AccountId"),
                            createTextVNode(" the LFI returns from its "),
                            createVNode("code", null, "/accounts"),
                            createTextVNode(" APIs. Immutable once issued. UUID v4 recommended.")
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
                  _push3(` For Bank Service Initiation consents, <code data-v-c3d53684${_scopeId2}>accountIds</code> <strong data-v-c3d53684${_scopeId2}>MUST</strong> contain exactly one element — the debtor account. For Bank Data Sharing, it <strong data-v-c3d53684${_scopeId2}>MUST</strong> contain every account the end user selected. `);
                } else {
                  return [
                    createTextVNode(" For Bank Service Initiation consents, "),
                    createVNode("code", null, "accountIds"),
                    createTextVNode(),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" contain exactly one element — the debtor account. For Bank Data Sharing, it "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" contain every account the end user selected. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "important",
              title: "Guiding principle"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-c3d53684${_scopeId2}> The consent is a central record, not a private LFI record. Anything the LFI puts on it <strong data-v-c3d53684${_scopeId2}>MUST</strong> be meaningless to any party other than the LFI itself. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The consent is a central record, not a private LFI record. Anything the LFI puts on it "),
                      createVNode("strong", null, "MUST"),
                      createTextVNode(" be meaningless to any party other than the LFI itself. ")
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
                        createVNode("th", null, "Identifier"),
                        createVNode("th", null, "Requirement")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "psuIdentifiers.userId")
                        ]),
                        createVNode("td", null, "Opaque string. Stable per end user (same value across all their consents). Unique within the LFI. UUID v4 recommended.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "accountIds[]")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Array of opaque strings, 1–40 chars each, "),
                          createVNode("code", null, "minItems: 1"),
                          createTextVNode(". Each value "),
                          createVNode("strong", null, "MUST"),
                          createTextVNode(" match the "),
                          createVNode("code", null, "AccountId"),
                          createTextVNode(" the LFI returns from its "),
                          createVNode("code", null, "/accounts"),
                          createTextVNode(" APIs. Immutable once issued. UUID v4 recommended.")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For Bank Service Initiation consents, "),
                  createVNode("code", null, "accountIds"),
                  createTextVNode(),
                  createVNode("strong", null, "MUST"),
                  createTextVNode(" contain exactly one element — the debtor account. For Bank Data Sharing, it "),
                  createVNode("strong", null, "MUST"),
                  createTextVNode(" contain every account the end user selected. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "important",
                title: "Guiding principle"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The consent is a central record, not a private LFI record. Anything the LFI puts on it "),
                    createVNode("strong", null, "MUST"),
                    createTextVNode(" be meaningless to any party other than the LFI itself. ")
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
              href: "/knowledge-base/articles/pii-encryption",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "PII Encryption",
              desc: "How payment PII is encrypted end-to-end to keep personal data opaque to the hub."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/base-consent-id",
              category: "Consents",
              "category-color": "var(--at-teal)",
              title: "Base Consent ID",
              desc: "How to link related consents within a TPP's service via consentGroupId."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/pii-encryption",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "PII Encryption",
                desc: "How payment PII is encrypted end-to-end to keep personal data opaque to the hub."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/base-consent-id",
                category: "Consents",
                "category-color": "var(--at-teal)",
                title: "Base Consent ID",
                desc: "How to link related consents within a TPP's service via consentGroupId."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/consent-identifiers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const consentIdentifiers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c3d53684"]]);
export {
  consentIdentifiers as default
};
