import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { u as useRouteVersion } from "../main.mjs";
const node = `const paymentPii = {
  Initiation: {
    Creditor: [
      {
        Creditor: {
          Name: 'Ivan England',                  // must match consent PII (single/multiple beneficiary)
        },
        CreditorAccount: {
          SchemeName:     'IBAN',                // must match consent PII (single/multiple beneficiary)
          Identification: 'AE070331234567890123456',  // must match consent PII (single/multiple beneficiary)
          Name: {
            en: 'Ivan David England',            // must match consent PII (single/multiple beneficiary)
          },
        },
      },
    ],
  },
  // Risk can reflect the context of this specific payment
  Risk: {
    PaymentContextCode: 'BillPayment',
  },
}

const paymentEncryptedPII = await encryptPII(paymentPii, LFI_JWKS_URI, signingKey, SIGNING_KEY_ID)
// paymentEncryptedPII is a compact JWE string — embed it in the payment request below
`;
const python = `payment_pii = {
    "Initiation": {
        "Creditor": [
            {
                "Creditor": {
                    "Name": "Ivan England",              # must match consent PII (single/multiple beneficiary)
                },
                "CreditorAccount": {
                    "SchemeName":     "IBAN",            # must match consent PII (single/multiple beneficiary)
                    "Identification": "AE070331234567890123456",  # must match consent PII (single/multiple beneficiary)
                    "Name": {
                        "en": "Ivan David England",      # must match consent PII (single/multiple beneficiary)
                    },
                },
            }
        ],
    },
    # Risk can reflect the context of this specific payment
    "Risk": {
        "PaymentContextCode": "BillPayment",
    },
}

payment_encrypted_pii = encrypt_pii(payment_pii, LFI_JWKS_URI)
# payment_encrypted_pii is a compact JWE string — embed it in the payment request below
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepPaymentEncryptPii",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { label: "Node.js", lang: "typescript", code: node },
      { label: "Python", lang: "python", code: python }
    ];
    const { docsVersion } = useRouteVersion();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Each <code${_scopeId}>POST /payments</code> request carries its own <code${_scopeId}>PersonalIdentifiableInformation</code> — a fresh JWE encrypted for that specific payment. This follows the same JWS-inside-JWE pattern used in Step 1, but uses the <strong${_scopeId}>Domestic Payment PII Schema Object</strong> (<code${_scopeId}>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code>) rather than the consent PII schema. The creditor fields are flat on <code${_scopeId}>Initiation</code> at this stage — they are not wrapped in an array. `);
          } else {
            return [
              createTextVNode(" Each "),
              createVNode("code", null, "POST /payments"),
              createTextVNode(" request carries its own "),
              createVNode("code", null, "PersonalIdentifiableInformation"),
              createTextVNode(" — a fresh JWE encrypted for that specific payment. This follows the same JWS-inside-JWE pattern used in Step 1, but uses the "),
              createVNode("strong", null, "Domestic Payment PII Schema Object"),
              createTextVNode(" ("),
              createVNode("code", null, "AEBankServiceInitiation.AEDomesticPaymentPIIProperties"),
              createTextVNode(") rather than the consent PII schema. The creditor fields are flat on "),
              createVNode("code", null, "Initiation"),
              createTextVNode(" at this stage — they are not wrapped in an array. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` The schema defines <code${_scopeId}>PersonalIdentifiableInformation</code> for <code${_scopeId}>POST /payments</code> as a <code${_scopeId}>oneOf</code> with two variants: `);
          } else {
            return [
              createTextVNode(" The schema defines "),
              createVNode("code", null, "PersonalIdentifiableInformation"),
              createTextVNode(" for "),
              createVNode("code", null, "POST /payments"),
              createTextVNode(" as a "),
              createVNode("code", null, "oneOf"),
              createTextVNode(" with two variants: ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Variant</th><th${_scopeId}>Form</th><th${_scopeId}>Notes</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Domestic Payment PII Schema Object</strong> (<code${_scopeId}>AEDomesticPaymentPIIProperties</code>)</td><td${_scopeId}>object</td><td${_scopeId}>Unencrypted form — shows the payment PII structure. For reference only.</td></tr><tr${_scopeId}><td${_scopeId}><strong${_scopeId}>Encrypted PII Object</strong> (<code${_scopeId}>AEJWEPaymentPII</code>)</td><td${_scopeId}>string</td><td${_scopeId}>Compact JWE string. <strong${_scopeId}>MUST</strong> be used when invoking <code${_scopeId}>POST /payments</code>.</td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Variant"),
                    createVNode("th", null, "Form"),
                    createVNode("th", null, "Notes")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Domestic Payment PII Schema Object"),
                      createTextVNode(" ("),
                      createVNode("code", null, "AEDomesticPaymentPIIProperties"),
                      createTextVNode(")")
                    ]),
                    createVNode("td", null, "object"),
                    createVNode("td", null, "Unencrypted form — shows the payment PII structure. For reference only.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Encrypted PII Object"),
                      createTextVNode(" ("),
                      createVNode("code", null, "AEJWEPaymentPII"),
                      createTextVNode(")")
                    ]),
                    createVNode("td", null, "string"),
                    createVNode("td", null, [
                      createTextVNode("Compact JWE string. "),
                      createVNode("strong", null, "MUST"),
                      createTextVNode(" be used when invoking "),
                      createVNode("code", null, "POST /payments"),
                      createTextVNode(".")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdNote, {
        type: "warning",
        title: "Domestic Payment PII Schema Object must be strictly followed"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}> The object you encrypt <strong${_scopeId}>MUST</strong> conform exactly to <code${_scopeId}>AEDomesticPaymentPIIProperties</code>. Field names, nesting, and data types are validated by the LFI after decryption — any deviation will result in payment rejection. Do not add undocumented fields or omit required ones. </p><p${_scopeId}> See <a${ssrRenderAttr("href", `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/`)}${_scopeId}>Personal Identifiable Information</a> for the complete field reference, required vs optional fields, and creditor models for each domestic payment type. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" The object you encrypt "),
                createVNode("strong", null, "MUST"),
                createTextVNode(" conform exactly to "),
                createVNode("code", null, "AEDomesticPaymentPIIProperties"),
                createTextVNode(". Field names, nesting, and data types are validated by the LFI after decryption — any deviation will result in payment rejection. Do not add undocumented fields or omit required ones. ")
              ]),
              createVNode("p", null, [
                createTextVNode(" See "),
                createVNode("a", {
                  href: `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/`
                }, "Personal Identifiable Information", 8, ["href"]),
                createTextVNode(" for the complete field reference, required vs optional fields, and creditor models for each domestic payment type. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdNote, {
        type: "danger",
        title: "Creditor must match the consent PII"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}> The creditor supplied here must correspond to the single beneficiary set at consent time. <code${_scopeId}>CreditorAccount.SchemeName</code>, <code${_scopeId}>CreditorAccount.Identification</code>, and <code${_scopeId}>CreditorAccount.Name</code> must exactly match the entry in the consent PII. The LFI decrypts both PII tokens and compares them; any discrepancy results in rejection. </p><p${_scopeId}> See <a${ssrRenderAttr("href", `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/creditor`)}${_scopeId}>Creditor</a> for the full matching rules and <a${ssrRenderAttr("href", `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement`)}${_scopeId}>field validation requirements</a>. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" The creditor supplied here must correspond to the single beneficiary set at consent time. "),
                createVNode("code", null, "CreditorAccount.SchemeName"),
                createTextVNode(", "),
                createVNode("code", null, "CreditorAccount.Identification"),
                createTextVNode(", and "),
                createVNode("code", null, "CreditorAccount.Name"),
                createTextVNode(" must exactly match the entry in the consent PII. The LFI decrypts both PII tokens and compares them; any discrepancy results in rejection. ")
              ]),
              createVNode("p", null, [
                createTextVNode(" See "),
                createVNode("a", {
                  href: `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/creditor`
                }, "Creditor", 8, ["href"]),
                createTextVNode(" for the full matching rules and "),
                createVNode("a", {
                  href: `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement`
                }, "field validation requirements", 8, ["href"]),
                createTextVNode(". ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdNote, {
        type: "info",
        title: "Risk block is flexible per payment"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}> Unlike the Creditor, the <code${_scopeId}>Risk</code> block does not need to match the consent PII exactly. It should reflect the actual risk context of the individual payment — for example, a different <code${_scopeId}>Channel</code> or updated <code${_scopeId}>TransactionIndicators</code> for each payment under the consent. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" Unlike the Creditor, the "),
                createVNode("code", null, "Risk"),
                createTextVNode(" block does not need to match the consent PII exactly. It should reflect the actual risk context of the individual payment — for example, a different "),
                createVNode("code", null, "Channel"),
                createTextVNode(" or updated "),
                createVNode("code", null, "TransactionIndicators"),
                createTextVNode(" for each payment under the consent. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Build the PII object according to the schema, then encrypt it using the same <code${_scopeId}>encryptPII</code> helper from Step 1: `);
          } else {
            return [
              createTextVNode(" Build the PII object according to the schema, then encrypt it using the same "),
              createVNode("code", null, "encryptPII"),
              createTextVNode(" helper from Step 1: ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdCodeGroup, { tabs }, null, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` See <a${ssrRenderAttr("href", `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/`)}${_scopeId}>Personal Identifiable Information</a> for the complete field reference, required vs optional fields, and creditor models for each domestic payment type. `);
          } else {
            return [
              createTextVNode(" See "),
              createVNode("a", {
                href: `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/`
              }, "Personal Identifiable Information", 8, ["href"]),
              createTextVNode(" for the complete field reference, required vs optional fields, and creditor models for each domestic payment type. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` See <a href="/tech/tpp-standards/security/fapi/message-encryption"${_scopeId}>Message Encryption</a> for details on fetching the LFI&#39;s JWKS and selecting the correct encryption key. `);
          } else {
            return [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
              createTextVNode(" for details on fetching the LFI's JWKS and selecting the correct encryption key. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepPaymentEncryptPii.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
