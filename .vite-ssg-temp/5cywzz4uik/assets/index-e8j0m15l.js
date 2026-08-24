import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdNote = __unplugin_components_7;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-1e988c99><section class="ed-doc__hero" data-v-1e988c99><div class="ed-doc__inner" data-v-1e988c99><div class="ed-doc__eyebrow" data-v-1e988c99><span class="ed-doc__eyebrow-dash" data-v-1e988c99></span> LFI · Banking · Service Initiation · PII </div><h1 class="ed-doc__title" data-v-1e988c99> Personal Identifiable Information (PII) <span class="ed-doc__read" data-v-1e988c99>2 min read</span></h1><p class="ed-doc__lede" data-v-1e988c99> Every payment instruction carries sensitive data about who is paying and who is receiving the funds — creditor account details, optional debtor account, and risk indicators. This data is collectively referred to as <strong data-v-1e988c99>Personal Identifiable Information (PII)</strong>. </p><p class="ed-doc__lede" data-v-1e988c99> PII arrives at the LFI as an <strong data-v-1e988c99>encrypted JWE string</strong> in the <code data-v-1e988c99>PersonalIdentifiableInformation</code> field. The API Hub passes the JWE through without inspection — it cannot read or validate the contents. This means: </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "hub-cant-inspect",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "What this implies",
    title: "The Hub does not see PII",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-1e988c99${_scopeId2}><strong data-v-1e988c99${_scopeId2}>The LFI is solely responsible for decrypting and validating PII.</strong></li><li data-v-1e988c99${_scopeId2}>The PII has <strong data-v-1e988c99${_scopeId2}>not been schema-validated</strong> by the API Hub.</li><li data-v-1e988c99${_scopeId2}>The PII content has <strong data-v-1e988c99${_scopeId2}>not been read or inspected</strong> by any intermediary.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "The LFI is solely responsible for decrypting and validating PII.")
                ]),
                createVNode("li", null, [
                  createTextVNode("The PII has "),
                  createVNode("strong", null, "not been schema-validated"),
                  createTextVNode(" by the API Hub.")
                ]),
                createVNode("li", null, [
                  createTextVNode("The PII content has "),
                  createVNode("strong", null, "not been read or inspected"),
                  createTextVNode(" by any intermediary.")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "LFI validation is mandatory"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-1e988c99${_scopeId2}> Unlike other fields in the consent or payment request — which the API Hub validates against the OpenAPI specification before forwarding — PII is opaque to the API Hub. The LFI MUST decrypt, parse, and validate the PII independently against the schema defined in the OpenAPI specification. A malformed or invalid PII payload MUST be rejected by the LFI. </p>`);
            } else {
              return [
                createVNode("p", null, " Unlike other fields in the consent or payment request — which the API Hub validates against the OpenAPI specification before forwarding — PII is opaque to the API Hub. The LFI MUST decrypt, parse, and validate the PII independently against the schema defined in the OpenAPI specification. A malformed or invalid PII payload MUST be rejected by the LFI. ")
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
                createVNode("strong", null, "The LFI is solely responsible for decrypting and validating PII.")
              ]),
              createVNode("li", null, [
                createTextVNode("The PII has "),
                createVNode("strong", null, "not been schema-validated"),
                createTextVNode(" by the API Hub.")
              ]),
              createVNode("li", null, [
                createTextVNode("The PII content has "),
                createVNode("strong", null, "not been read or inspected"),
                createTextVNode(" by any intermediary.")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "LFI validation is mandatory"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " Unlike other fields in the consent or payment request — which the API Hub validates against the OpenAPI specification before forwarding — PII is opaque to the API Hub. The LFI MUST decrypt, parse, and validate the PII independently against the schema defined in the OpenAPI specification. A malformed or invalid PII payload MUST be rejected by the LFI. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "when-received",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "When PII is received",
    title: "Two points in the payment lifecycle",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`PII is present at <strong data-v-1e988c99${_scopeId2}>two points</strong> in the payment lifecycle:`);
            } else {
              return [
                createTextVNode("PII is present at "),
                createVNode("strong", null, "two points"),
                createTextVNode(" in the payment lifecycle:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-1e988c99${_scopeId2}><thead data-v-1e988c99${_scopeId2}><tr data-v-1e988c99${_scopeId2}><th data-v-1e988c99${_scopeId2}>Stage</th><th data-v-1e988c99${_scopeId2}>Source</th><th data-v-1e988c99${_scopeId2}>Field</th></tr></thead><tbody data-v-1e988c99${_scopeId2}><tr data-v-1e988c99${_scopeId2}><td data-v-1e988c99${_scopeId2}>Consent authorisation</td><td data-v-1e988c99${_scopeId2}>Consent Manager → LFI</td><td data-v-1e988c99${_scopeId2}><code data-v-1e988c99${_scopeId2}>consent.PersonalIdentifiableInformation</code></td></tr><tr data-v-1e988c99${_scopeId2}><td data-v-1e988c99${_scopeId2}>Payment creation</td><td data-v-1e988c99${_scopeId2}>Ozone Connect → LFI</td><td data-v-1e988c99${_scopeId2}><code data-v-1e988c99${_scopeId2}>payment.PersonalIdentifiableInformation</code></td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Stage"),
                      createVNode("th", null, "Source"),
                      createVNode("th", null, "Field")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, "Consent authorisation"),
                      createVNode("td", null, "Consent Manager → LFI"),
                      createVNode("td", null, [
                        createVNode("code", null, "consent.PersonalIdentifiableInformation")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, "Payment creation"),
                      createVNode("td", null, "Ozone Connect → LFI"),
                      createVNode("td", null, [
                        createVNode("code", null, "payment.PersonalIdentifiableInformation")
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
              _push3(` The structure of the decrypted PII differs between the two stages — see <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par" data-v-1e988c99${_scopeId2}>PII (Consent — Consent Manager)</a> and <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments" data-v-1e988c99${_scopeId2}>PII (Payments — Ozone Connect)</a> for the full schemas. `);
            } else {
              return [
                createTextVNode(" The structure of the decrypted PII differs between the two stages — see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par" }, "PII (Consent — Consent Manager)"),
                createTextVNode(" and "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments" }, "PII (Payments — Ozone Connect)"),
                createTextVNode(" for the full schemas. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("PII is present at "),
              createVNode("strong", null, "two points"),
              createTextVNode(" in the payment lifecycle:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Stage"),
                    createVNode("th", null, "Source"),
                    createVNode("th", null, "Field")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, "Consent authorisation"),
                    createVNode("td", null, "Consent Manager → LFI"),
                    createVNode("td", null, [
                      createVNode("code", null, "consent.PersonalIdentifiableInformation")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "Payment creation"),
                    createVNode("td", null, "Ozone Connect → LFI"),
                    createVNode("td", null, [
                      createVNode("code", null, "payment.PersonalIdentifiableInformation")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The structure of the decrypted PII differs between the two stages — see "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par" }, "PII (Consent — Consent Manager)"),
              createTextVNode(" and "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments" }, "PII (Payments — Ozone Connect)"),
              createTextVNode(" for the full schemas. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "why-encrypted",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Why PII is encrypted",
    title: "End-to-end confidentiality",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Payment consents are stored centrally at the API Hub. Because the API Hub acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that the API Hub, and any other party in transit, cannot read the sensitive payment details. `);
            } else {
              return [
                createTextVNode(" Payment consents are stored centrally at the API Hub. Because the API Hub acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that the API Hub, and any other party in transit, cannot read the sensitive payment details. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The encryption uses the LFI&#39;s public encryption key (<a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" data-v-1e988c99${_scopeId2}>Enc1</a>). Only the LFI can decrypt the payload using the corresponding Enc1 private key. `);
            } else {
              return [
                createTextVNode(" The encryption uses the LFI's public encryption key ("),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" }, "Enc1"),
                createTextVNode("). Only the LFI can decrypt the payload using the corresponding Enc1 private key. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Payment consents are stored centrally at the API Hub. Because the API Hub acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that the API Hub, and any other party in transit, cannot read the sensitive payment details. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The encryption uses the LFI's public encryption key ("),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/#enc1-encryption-key" }, "Enc1"),
              createTextVNode("). Only the LFI can decrypt the payload using the corresponding Enc1 private key. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "lfi-responsibilities",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "LFI responsibilities",
    title: "Decrypt, validate, reject",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Because the API Hub cannot inspect PII, the LFI takes on additional responsibilities compared to other parts of the request: `);
            } else {
              return [
                createTextVNode(" Because the API Hub cannot inspect PII, the LFI takes on additional responsibilities compared to other parts of the request: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-1e988c99${_scopeId2}><thead data-v-1e988c99${_scopeId2}><tr data-v-1e988c99${_scopeId2}><th data-v-1e988c99${_scopeId2}>Responsibility</th><th data-v-1e988c99${_scopeId2}>Description</th></tr></thead><tbody data-v-1e988c99${_scopeId2}><tr data-v-1e988c99${_scopeId2}><td data-v-1e988c99${_scopeId2}><strong data-v-1e988c99${_scopeId2}>Decryption</strong></td><td data-v-1e988c99${_scopeId2}>Decrypt the JWE using the Enc1 private key — see <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii" data-v-1e988c99${_scopeId2}>How to Decrypt PII</a></td></tr><tr data-v-1e988c99${_scopeId2}><td data-v-1e988c99${_scopeId2}><strong data-v-1e988c99${_scopeId2}>Schema validation</strong></td><td data-v-1e988c99${_scopeId2}>Validate the decrypted payload against the OpenAPI schema — no additional properties are permitted</td></tr><tr data-v-1e988c99${_scopeId2}><td data-v-1e988c99${_scopeId2}><strong data-v-1e988c99${_scopeId2}>Field validation</strong></td><td data-v-1e988c99${_scopeId2}>Verify mandatory fields, IBAN format, BIC consistency, and creditor matching rules — see <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" data-v-1e988c99${_scopeId2}>Debtor Account</a> and <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" data-v-1e988c99${_scopeId2}>Creditor</a></td></tr><tr data-v-1e988c99${_scopeId2}><td data-v-1e988c99${_scopeId2}><strong data-v-1e988c99${_scopeId2}>Rejection</strong></td><td data-v-1e988c99${_scopeId2}>Mark the consent invalid via <span class="endpoint" data-v-1e988c99${_scopeId2}><span class="http-method http-method--post" data-v-1e988c99${_scopeId2}>POST</span><code data-v-1e988c99${_scopeId2}>/consent/action/validate</code></span> if PII is malformed, missing required fields, or fails validation</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Responsibility"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Decryption")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Decrypt the JWE using the Enc1 private key — see "),
                        createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii" }, "How to Decrypt PII")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Schema validation")
                      ]),
                      createVNode("td", null, "Validate the decrypted payload against the OpenAPI schema — no additional properties are permitted")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Field validation")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Verify mandatory fields, IBAN format, BIC consistency, and creditor matching rules — see "),
                        createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" }, "Debtor Account"),
                        createTextVNode(" and "),
                        createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Rejection")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("Mark the consent invalid via "),
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consent/action/validate")
                        ]),
                        createTextVNode(" if PII is malformed, missing required fields, or fails validation")
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
              createTextVNode(" Because the API Hub cannot inspect PII, the LFI takes on additional responsibilities compared to other parts of the request: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Responsibility"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Decryption")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Decrypt the JWE using the Enc1 private key — see "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii" }, "How to Decrypt PII")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Schema validation")
                    ]),
                    createVNode("td", null, "Validate the decrypted payload against the OpenAPI schema — no additional properties are permitted")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Field validation")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Verify mandatory fields, IBAN format, BIC consistency, and creditor matching rules — see "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account" }, "Debtor Account"),
                      createTextVNode(" and "),
                      createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor" }, "Creditor")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Rejection")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("Mark the consent invalid via "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent/action/validate")
                      ]),
                      createTextVNode(" if PII is malformed, missing required fields, or fails validation")
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
    id: "structure",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Structure of the PII payload",
    title: "Initiation and Risk",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The decrypted PII contains two top-level sections:`);
            } else {
              return [
                createTextVNode("The decrypted PII contains two top-level sections:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-1e988c99${_scopeId2}><thead data-v-1e988c99${_scopeId2}><tr data-v-1e988c99${_scopeId2}><th data-v-1e988c99${_scopeId2}>Property</th><th data-v-1e988c99${_scopeId2}>Description</th></tr></thead><tbody data-v-1e988c99${_scopeId2}><tr data-v-1e988c99${_scopeId2}><td data-v-1e988c99${_scopeId2}><code data-v-1e988c99${_scopeId2}>Initiation</code></td><td data-v-1e988c99${_scopeId2}>Creditor and debtor account details — structure differs between consent and payment stages</td></tr><tr data-v-1e988c99${_scopeId2}><td data-v-1e988c99${_scopeId2}><code data-v-1e988c99${_scopeId2}>Risk</code></td><td data-v-1e988c99${_scopeId2}>Fraud and risk indicators about the debtor, transaction, and creditor</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Property"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "Initiation")
                      ]),
                      createVNode("td", null, "Creditor and debtor account details — structure differs between consent and payment stages")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "Risk")
                      ]),
                      createVNode("td", null, "Fraud and risk indicators about the debtor, transaction, and creditor")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-1e988c99${_scopeId}>At consent validation (<span class="endpoint" data-v-1e988c99${_scopeId}><span class="http-method http-method--post" data-v-1e988c99${_scopeId}>POST</span><code data-v-1e988c99${_scopeId}>/consent/action/validate</code></span>)</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-1e988c99${_scopeId2}><code data-v-1e988c99${_scopeId2}>Initiation.Creditor</code> is an <strong data-v-1e988c99${_scopeId2}>array</strong> of 1–10 creditor entries (or omitted for open beneficiary)</li><li data-v-1e988c99${_scopeId2}><code data-v-1e988c99${_scopeId2}>Initiation.DebtorAccount</code> is optionally present</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "Initiation.Creditor"),
                  createTextVNode(" is an "),
                  createVNode("strong", null, "array"),
                  createTextVNode(" of 1–10 creditor entries (or omitted for open beneficiary)")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "Initiation.DebtorAccount"),
                  createTextVNode(" is optionally present")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 class="ed-doc__subhead" data-v-1e988c99${_scopeId}>At payment time (Ozone Connect payment instruction)</h3>`);
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-1e988c99${_scopeId2}>Creditor fields sit <strong data-v-1e988c99${_scopeId2}>directly on <code data-v-1e988c99${_scopeId2}>Initiation</code></strong> as a single creditor (not an array)</li><li data-v-1e988c99${_scopeId2}><code data-v-1e988c99${_scopeId2}>DebtorAccount</code> is <strong data-v-1e988c99${_scopeId2}>absent</strong> — the debtor account was fixed during consent authorisation</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createTextVNode("Creditor fields sit "),
                  createVNode("strong", null, [
                    createTextVNode("directly on "),
                    createVNode("code", null, "Initiation")
                  ]),
                  createTextVNode(" as a single creditor (not an array)")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "DebtorAccount"),
                  createTextVNode(" is "),
                  createVNode("strong", null, "absent"),
                  createTextVNode(" — the debtor account was fixed during consent authorisation")
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
              createTextVNode("The decrypted PII contains two top-level sections:")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Property"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Initiation")
                    ]),
                    createVNode("td", null, "Creditor and debtor account details — structure differs between consent and payment stages")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Risk")
                    ]),
                    createVNode("td", null, "Fraud and risk indicators about the debtor, transaction, and creditor")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, [
            createTextVNode("At consent validation ("),
            createVNode("span", { class: "endpoint" }, [
              createVNode("span", { class: "http-method http-method--post" }, "POST"),
              createVNode("code", null, "/consent/action/validate")
            ]),
            createTextVNode(")")
          ]),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "Initiation.Creditor"),
                createTextVNode(" is an "),
                createVNode("strong", null, "array"),
                createTextVNode(" of 1–10 creditor entries (or omitted for open beneficiary)")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "Initiation.DebtorAccount"),
                createTextVNode(" is optionally present")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", { class: "ed-doc__subhead" }, "At payment time (Ozone Connect payment instruction)"),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createTextVNode("Creditor fields sit "),
                createVNode("strong", null, [
                  createTextVNode("directly on "),
                  createVNode("code", null, "Initiation")
                ]),
                createTextVNode(" as a single creditor (not an array)")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "DebtorAccount"),
                createTextVNode(" is "),
                createVNode("strong", null, "absent"),
                createTextVNode(" — the debtor account was fixed during consent authorisation")
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
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1e988c99"]]);
export {
  index as default
};
