import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
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
  __name: "pii-encryption",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "why", label: "Why" },
      { id: "what", label: "What" },
      { id: "lfis", label: "For LFIs" },
      { id: "tpps", label: "For TPPs" },
      { id: "creditor", label: "Creditor rules" }
    ];
    const meta = [
      { label: "Category", value: "Security" },
      { label: "Read", value: "8 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["PII", "Encryption", "JWE"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-db898310>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "Payment PII Encryption — Why It Exists and What It Means for You",
        meta,
        lede: "Payment PII — payer/payee names, account numbers, risk context — is encrypted <strong>end-to-end</strong> using the LFI's public encryption key before it leaves the TPP. Nebras passes the encrypted blob through but cannot read, inspect, or validate it. Only the LFI, holding the private key, can decrypt and act on the data."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-db898310${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-db898310${_scopeId}>${ssrInterpolate(t)}</span>`);
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
        eyebrow: "Why",
        title: "The data privacy rationale",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The core reason is <strong data-v-db898310${_scopeId2}>data privacy</strong>: the PII inside a payment consent contains account holder names, IBANs, and other personal details that have no business being visible to any party other than the LFI processing the payment.`);
                } else {
                  return [
                    createTextVNode("The core reason is "),
                    createVNode("strong", null, "data privacy"),
                    createTextVNode(": the PII inside a payment consent contains account holder names, IBANs, and other personal details that have no business being visible to any party other than the LFI processing the payment.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Nebras operates as a central hub holding the consents. Without encryption, Nebras would have visibility into every creditor account, debtor name, and transaction risk indicator across all payment flows on the platform. Encrypting the PII directly to the LFI&#39;s key ensures that Nebras acts purely as a routing layer, with no access to the personal data it carries.`);
                } else {
                  return [
                    createTextVNode("Nebras operates as a central hub holding the consents. Without encryption, Nebras would have visibility into every creditor account, debtor name, and transaction risk indicator across all payment flows on the platform. Encrypting the PII directly to the LFI's key ensures that Nebras acts purely as a routing layer, with no access to the personal data it carries.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This design also means if the central hub were ever compromised, the PII within payment consents would remain unreadable.`);
                } else {
                  return [
                    createTextVNode("This design also means if the central hub were ever compromised, the PII within payment consents would remain unreadable.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The core reason is "),
                  createVNode("strong", null, "data privacy"),
                  createTextVNode(": the PII inside a payment consent contains account holder names, IBANs, and other personal details that have no business being visible to any party other than the LFI processing the payment.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Nebras operates as a central hub holding the consents. Without encryption, Nebras would have visibility into every creditor account, debtor name, and transaction risk indicator across all payment flows on the platform. Encrypting the PII directly to the LFI's key ensures that Nebras acts purely as a routing layer, with no access to the personal data it carries.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This design also means if the central hub were ever compromised, the PII within payment consents would remain unreadable.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "what",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "What is encrypted",
        title: "The PersonalIdentifiableInformation payload",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-db898310${_scopeId2}><thead data-v-db898310${_scopeId2}><tr data-v-db898310${_scopeId2}><th data-v-db898310${_scopeId2}>When</th><th data-v-db898310${_scopeId2}>Where</th><th data-v-db898310${_scopeId2}>Contains</th></tr></thead><tbody data-v-db898310${_scopeId2}><tr data-v-db898310${_scopeId2}><td data-v-db898310${_scopeId2}>Consent creation</td><td data-v-db898310${_scopeId2}><code data-v-db898310${_scopeId2}>POST /par</code> — inside <code data-v-db898310${_scopeId2}>authorization_details</code></td><td data-v-db898310${_scopeId2}>Debtor account details, creditor account(s), risk indicators</td></tr><tr data-v-db898310${_scopeId2}><td data-v-db898310${_scopeId2}>Each payment request</td><td data-v-db898310${_scopeId2}><code data-v-db898310${_scopeId2}>POST /payments</code></td><td data-v-db898310${_scopeId2}>The specific creditor for that payment, risk indicators</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "When"),
                          createVNode("th", null, "Where"),
                          createVNode("th", null, "Contains")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Consent creation"),
                          createVNode("td", null, [
                            createVNode("code", null, "POST /par"),
                            createTextVNode(" — inside "),
                            createVNode("code", null, "authorization_details")
                          ]),
                          createVNode("td", null, "Debtor account details, creditor account(s), risk indicators")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Each payment request"),
                          createVNode("td", null, [
                            createVNode("code", null, "POST /payments")
                          ]),
                          createVNode("td", null, "The specific creditor for that payment, risk indicators")
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
                  _push3(`Each encryption is fresh — the TPP re-encrypts a new payload each time, using the LFI&#39;s current public key. The two payloads (consent-time and payment-time) are independently validated by the LFI after decryption.`);
                } else {
                  return [
                    createTextVNode("Each encryption is fresh — the TPP re-encrypts a new payload each time, using the LFI's current public key. The two payloads (consent-time and payment-time) are independently validated by the LFI after decryption.")
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
                        createVNode("th", null, "When"),
                        createVNode("th", null, "Where"),
                        createVNode("th", null, "Contains")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Consent creation"),
                        createVNode("td", null, [
                          createVNode("code", null, "POST /par"),
                          createTextVNode(" — inside "),
                          createVNode("code", null, "authorization_details")
                        ]),
                        createVNode("td", null, "Debtor account details, creditor account(s), risk indicators")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Each payment request"),
                        createVNode("td", null, [
                          createVNode("code", null, "POST /payments")
                        ]),
                        createVNode("td", null, "The specific creditor for that payment, risk indicators")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Each encryption is fresh — the TPP re-encrypts a new payload each time, using the LFI's current public key. The two payloads (consent-time and payment-time) are independently validated by the LFI after decryption.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "lfis",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "For LFIs",
        title: "You bear full validation responsibility",
        lede: "Because Nebras cannot read the PII, <strong>LFIs bear full responsibility for validating it</strong> after decryption.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db898310${_scopeId2}>Confirming that the PII payload conforms to the schema (<code data-v-db898310${_scopeId2}>AEDomesticPaymentPIIProperties</code> for domestic payments).</li><li data-v-db898310${_scopeId2}>Validating mandatory fields — at minimum <code data-v-db898310${_scopeId2}>CreditorAccount.Identification</code> (a valid UAE IBAN) and at least one of <code data-v-db898310${_scopeId2}>CreditorAccount.Name.en</code> or <code data-v-db898310${_scopeId2}>CreditorAccount.Name.ar</code>.</li><li data-v-db898310${_scopeId2}>Comparing the creditor supplied at <code data-v-db898310${_scopeId2}>POST /payments</code> against the creditor(s) recorded in the consent PII, and rejecting the payment if they do not match.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("Confirming that the PII payload conforms to the schema ("),
                      createVNode("code", null, "AEDomesticPaymentPIIProperties"),
                      createTextVNode(" for domestic payments).")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Validating mandatory fields — at minimum "),
                      createVNode("code", null, "CreditorAccount.Identification"),
                      createTextVNode(" (a valid UAE IBAN) and at least one of "),
                      createVNode("code", null, "CreditorAccount.Name.en"),
                      createTextVNode(" or "),
                      createVNode("code", null, "CreditorAccount.Name.ar"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Comparing the creditor supplied at "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(" against the creditor(s) recorded in the consent PII, and rejecting the payment if they do not match.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A payment rejected at the LFI due to malformed or mismatched PII is not surfaced as an API Hub error — it appears as a payment-level rejection. LFIs should return clear error responses so that TPPs can diagnose and correct the issue.`);
                } else {
                  return [
                    createTextVNode("A payment rejected at the LFI due to malformed or mismatched PII is not surfaced as an API Hub error — it appears as a payment-level rejection. LFIs should return clear error responses so that TPPs can diagnose and correct the issue.")
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
                    createTextVNode("Confirming that the PII payload conforms to the schema ("),
                    createVNode("code", null, "AEDomesticPaymentPIIProperties"),
                    createTextVNode(" for domestic payments).")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Validating mandatory fields — at minimum "),
                    createVNode("code", null, "CreditorAccount.Identification"),
                    createTextVNode(" (a valid UAE IBAN) and at least one of "),
                    createVNode("code", null, "CreditorAccount.Name.en"),
                    createTextVNode(" or "),
                    createVNode("code", null, "CreditorAccount.Name.ar"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Comparing the creditor supplied at "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" against the creditor(s) recorded in the consent PII, and rejecting the payment if they do not match.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A payment rejected at the LFI due to malformed or mismatched PII is not surfaced as an API Hub error — it appears as a payment-level rejection. LFIs should return clear error responses so that TPPs can diagnose and correct the issue.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "tpps",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "For TPPs",
        title: "Errors aren't caught centrally — onboarding care matters",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Because PII validation happens entirely inside the LFI after decryption, errors in the encrypted payload <strong data-v-db898310${_scopeId2}>are not caught centrally</strong>. A consent or payment may be accepted by the API Hub and then rejected by the LFI.`);
                } else {
                  return [
                    createTextVNode("Because PII validation happens entirely inside the LFI after decryption, errors in the encrypted payload "),
                    createVNode("strong", null, "are not caught centrally"),
                    createTextVNode(". A consent or payment may be accepted by the API Hub and then rejected by the LFI.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "important",
              title: "When onboarding with a new LFI, take extra care"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-db898310${_scopeId2}>A successful <code data-v-db898310${_scopeId2}>POST /par</code> response only means the API Hub accepted the request — it does not mean the LFI successfully decrypted and validated the PII inside it.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("A successful "),
                      createVNode("code", null, "POST /par"),
                      createTextVNode(" response only means the API Hub accepted the request — it does not mean the LFI successfully decrypted and validated the PII inside it.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db898310${_scopeId2}>Confirm the exact field names, nesting structure, and data types the LFI expects. While the schema is standardised, LFIs may have specific expectations — for example, BIC format (8 vs 11 characters) or name field encoding.</li><li data-v-db898310${_scopeId2}>Test end-to-end with the LFI before going live.</li><li data-v-db898310${_scopeId2}>Ensure the creditor details you encrypt exactly match what you intend: for single and multiple beneficiary consents, even a minor discrepancy (whitespace, encoding difference) in the account name can cause payment rejection.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Confirm the exact field names, nesting structure, and data types the LFI expects. While the schema is standardised, LFIs may have specific expectations — for example, BIC format (8 vs 11 characters) or name field encoding."),
                    createVNode("li", null, "Test end-to-end with the LFI before going live."),
                    createVNode("li", null, "Ensure the creditor details you encrypt exactly match what you intend: for single and multiple beneficiary consents, even a minor discrepancy (whitespace, encoding difference) in the account name can cause payment rejection.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Because PII validation happens entirely inside the LFI after decryption, errors in the encrypted payload "),
                  createVNode("strong", null, "are not caught centrally"),
                  createTextVNode(". A consent or payment may be accepted by the API Hub and then rejected by the LFI.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "important",
                title: "When onboarding with a new LFI, take extra care"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("A successful "),
                    createVNode("code", null, "POST /par"),
                    createTextVNode(" response only means the API Hub accepted the request — it does not mean the LFI successfully decrypted and validated the PII inside it.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Confirm the exact field names, nesting structure, and data types the LFI expects. While the schema is standardised, LFIs may have specific expectations — for example, BIC format (8 vs 11 characters) or name field encoding."),
                  createVNode("li", null, "Test end-to-end with the LFI before going live."),
                  createVNode("li", null, "Ensure the creditor details you encrypt exactly match what you intend: for single and multiple beneficiary consents, even a minor discrepancy (whitespace, encoding difference) in the account name can cause payment rejection.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "creditor",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Creditor rules",
        title: "Single, multiple, or open beneficiary by payment type",
        lede: "The number of creditor entries you may include in the consent PII depends on the payment type. This determines the <strong>beneficiary model</strong> and constrains what creditors can be used at payment time.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-db898310${_scopeId}>Single-beneficiary payment types</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The following payment types accept <strong data-v-db898310${_scopeId2}>exactly one creditor entry</strong> in <code data-v-db898310${_scopeId2}>Initiation.Creditor[]</code>. The consent is bound to that single recipient — all payments under the consent must go to that account.`);
                } else {
                  return [
                    createTextVNode("The following payment types accept "),
                    createVNode("strong", null, "exactly one creditor entry"),
                    createTextVNode(" in "),
                    createVNode("code", null, "Initiation.Creditor[]"),
                    createTextVNode(". The consent is bound to that single recipient — all payments under the consent must go to that account.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db898310${_scopeId2}>Single Instant Payment</li><li data-v-db898310${_scopeId2}>Fixed Defined Schedule</li><li data-v-db898310${_scopeId2}>Variable Defined Schedule</li><li data-v-db898310${_scopeId2}>Fixed On-Demand</li><li data-v-db898310${_scopeId2}>Fixed Periodic Schedule</li><li data-v-db898310${_scopeId2}>Variable Periodic Schedule</li>`);
                } else {
                  return [
                    createVNode("li", null, "Single Instant Payment"),
                    createVNode("li", null, "Fixed Defined Schedule"),
                    createVNode("li", null, "Variable Defined Schedule"),
                    createVNode("li", null, "Fixed On-Demand"),
                    createVNode("li", null, "Fixed Periodic Schedule"),
                    createVNode("li", null, "Variable Periodic Schedule")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-db898310${_scopeId}>Flexible beneficiary payment types</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The following payment types support all three beneficiary models, giving TPPs more flexibility at the cost of additional validation complexity:`);
                } else {
                  return [
                    createTextVNode("The following payment types support all three beneficiary models, giving TPPs more flexibility at the cost of additional validation complexity:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-db898310${_scopeId2}><thead data-v-db898310${_scopeId2}><tr data-v-db898310${_scopeId2}><th data-v-db898310${_scopeId2}>Model</th><th data-v-db898310${_scopeId2}><code data-v-db898310${_scopeId2}>Initiation.Creditor[]</code></th><th data-v-db898310${_scopeId2}>Effect</th></tr></thead><tbody data-v-db898310${_scopeId2}><tr data-v-db898310${_scopeId2}><td data-v-db898310${_scopeId2}><strong data-v-db898310${_scopeId2}>Open beneficiary</strong></td><td data-v-db898310${_scopeId2}>Omitted</td><td data-v-db898310${_scopeId2}>No creditor fixed at consent time — each <code data-v-db898310${_scopeId2}>POST /payments</code> specifies a fresh creditor</td></tr><tr data-v-db898310${_scopeId2}><td data-v-db898310${_scopeId2}><strong data-v-db898310${_scopeId2}>Single beneficiary</strong></td><td data-v-db898310${_scopeId2}>1 entry</td><td data-v-db898310${_scopeId2}>All payments under the consent go to that one account</td></tr><tr data-v-db898310${_scopeId2}><td data-v-db898310${_scopeId2}><strong data-v-db898310${_scopeId2}>Multiple beneficiaries</strong></td><td data-v-db898310${_scopeId2}>2–10 entries</td><td data-v-db898310${_scopeId2}>Each payment specifies one of the pre-approved accounts</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Model"),
                          createVNode("th", null, [
                            createVNode("code", null, "Initiation.Creditor[]")
                          ]),
                          createVNode("th", null, "Effect")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Open beneficiary")
                          ]),
                          createVNode("td", null, "Omitted"),
                          createVNode("td", null, [
                            createTextVNode("No creditor fixed at consent time — each "),
                            createVNode("code", null, "POST /payments"),
                            createTextVNode(" specifies a fresh creditor")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Single beneficiary")
                          ]),
                          createVNode("td", null, "1 entry"),
                          createVNode("td", null, "All payments under the consent go to that one account")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Multiple beneficiaries")
                          ]),
                          createVNode("td", null, "2–10 entries"),
                          createVNode("td", null, "Each payment specifies one of the pre-approved accounts")
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
                  _push3(`Payment types that support all three models:`);
                } else {
                  return [
                    createTextVNode("Payment types that support all three models:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-db898310${_scopeId2}><strong data-v-db898310${_scopeId2}>Variable On-Demand</strong></li><li data-v-db898310${_scopeId2}><strong data-v-db898310${_scopeId2}>Delegated SCA</strong></li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Variable On-Demand")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Delegated SCA")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For multiple and open beneficiary consents the LFI still validates each individual payment&#39;s creditor against the same field and IBAN rules — the flexibility is in who the creditor can be, not in bypassing validation.`);
                } else {
                  return [
                    createTextVNode("For multiple and open beneficiary consents the LFI still validates each individual payment's creditor against the same field and IBAN rules — the flexibility is in who the creditor can be, not in bypassing validation.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor" data-v-db898310${_scopeId2}>Creditor</a> for the full matching rules and field validation requirements, and <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/" data-v-db898310${_scopeId2}>Personal Identifiable Information</a> for the complete schema reference.`);
                } else {
                  return [
                    createTextVNode("See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                    createTextVNode(" for the full matching rules and field validation requirements, and "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/" }, "Personal Identifiable Information"),
                    createTextVNode(" for the complete schema reference.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Single-beneficiary payment types"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The following payment types accept "),
                  createVNode("strong", null, "exactly one creditor entry"),
                  createTextVNode(" in "),
                  createVNode("code", null, "Initiation.Creditor[]"),
                  createTextVNode(". The consent is bound to that single recipient — all payments under the consent must go to that account.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Single Instant Payment"),
                  createVNode("li", null, "Fixed Defined Schedule"),
                  createVNode("li", null, "Variable Defined Schedule"),
                  createVNode("li", null, "Fixed On-Demand"),
                  createVNode("li", null, "Fixed Periodic Schedule"),
                  createVNode("li", null, "Variable Periodic Schedule")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Flexible beneficiary payment types"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The following payment types support all three beneficiary models, giving TPPs more flexibility at the cost of additional validation complexity:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Model"),
                        createVNode("th", null, [
                          createVNode("code", null, "Initiation.Creditor[]")
                        ]),
                        createVNode("th", null, "Effect")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Open beneficiary")
                        ]),
                        createVNode("td", null, "Omitted"),
                        createVNode("td", null, [
                          createTextVNode("No creditor fixed at consent time — each "),
                          createVNode("code", null, "POST /payments"),
                          createTextVNode(" specifies a fresh creditor")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Single beneficiary")
                        ]),
                        createVNode("td", null, "1 entry"),
                        createVNode("td", null, "All payments under the consent go to that one account")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Multiple beneficiaries")
                        ]),
                        createVNode("td", null, "2–10 entries"),
                        createVNode("td", null, "Each payment specifies one of the pre-approved accounts")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Payment types that support all three models:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Variable On-Demand")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Delegated SCA")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For multiple and open beneficiary consents the LFI still validates each individual payment's creditor against the same field and IBAN rules — the flexibility is in who the creditor can be, not in bypassing validation.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor"),
                  createTextVNode(" for the full matching rules and field validation requirements, and "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/" }, "Personal Identifiable Information"),
                  createTextVNode(" for the complete schema reference.")
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
              href: "/knowledge-base/articles/choosing-a-payment-type",
              category: "Payments",
              "category-color": "var(--at-gold)",
              title: "Choosing a Payment Type",
              desc: "The seven payment shapes and how to pick the right one."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/payment-account-permissions",
              category: "Payments",
              "category-color": "var(--at-gold)",
              title: "Account Permissions in a Payment Consent",
              desc: "Reading payer accounts and balances under a payment consent."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/consent-identifiers",
              category: "Consents",
              "category-color": "var(--at-teal)",
              title: "Consent Identifiers",
              desc: "Why end user and account IDs patched onto a consent must be opaque."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/choosing-a-payment-type",
                category: "Payments",
                "category-color": "var(--at-gold)",
                title: "Choosing a Payment Type",
                desc: "The seven payment shapes and how to pick the right one."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/payment-account-permissions",
                category: "Payments",
                "category-color": "var(--at-gold)",
                title: "Account Permissions in a Payment Consent",
                desc: "Reading payer accounts and balances under a payment consent."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/consent-identifiers",
                category: "Consents",
                "category-color": "var(--at-teal)",
                title: "Consent Identifiers",
                desc: "Why end user and account IDs patched onto a consent must be opaque."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/pii-encryption.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const piiEncryption = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-db898310"]]);
export {
  piiEncryption as default
};
