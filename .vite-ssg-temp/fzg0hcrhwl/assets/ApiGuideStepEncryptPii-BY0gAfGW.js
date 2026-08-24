import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { u as useRouteVersion, _ as _export_sfc } from "../main.mjs";
const encryptNode = `import { SignJWT, importJWK, CompactEncrypt } from 'jose'

/**
 * Sign PII as a JWT and encrypt it as a JWE using the LFI's public encryption key.
 * Fetch the LFI's JWKS URI from their .well-known/openid-configuration.
 */
async function encryptPII(pii: object, jwksUri: string, signingKey: CryptoKey, signingKeyId: string): Promise<string> {
  // 1. Sign the PII as a JWT
  const signedPII = await new SignJWT(pii as Record<string, unknown>)
    .setProtectedHeader({ alg: 'PS256', kid: signingKeyId })
    .sign(signingKey)

  // 2. Fetch the LFI's encryption key
  const { keys } = await fetch(jwksUri).then(r => r.json())
  const encKeyJwk = keys.find((k: { use: string }) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  // 3. Encrypt the signed JWT
  return new CompactEncrypt(new TextEncoder().encode(signedPII))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(encKey)
}

const pii = {
   "Initiation": {
     "DebtorAccount": {
       "SchemeName": "IBAN",
       "Identification": "AE070331234567890123456",
       "Name": {
         "en": "Mohammed Al Rashidi",
       }
     },
    "Creditor": [
      {
        "Creditor": {
          "Name": "Ivan England"
        },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": {
            "en": "Ivan David England"
          }
        }
      }
    ]
  }
}

const encryptedPII = await encryptPII(pii, LFI_JWKS_URI, signingKey, SIGNING_KEY_ID)
// encryptedPII is a compact JWE string — embed it in authorization_details below
`;
const encryptPython = `import json
import requests
from jose import jwe

def encrypt_pii(pii: dict, jwks_uri: str) -> str:
    keys = requests.get(jwks_uri).json()["keys"]
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    return jwe.encrypt(
        json.dumps(pii).encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()

pii = {
  "Initiation": {
     "DebtorAccount": {
       "SchemeName": "IBAN",
       "Identification": "AE070331234567890123456",
       "Name": {
         "en": "Mohammed Al Rashidi",
       }
     },
    "Creditor": [
      {
        "Creditor": {
          "Name": "Ivan England"
        },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": {
            "en": "Ivan David England"
          }
        }
      }
    ]
  },
}

encrypted_pii = encrypt_pii(pii, LFI_JWKS_URI)
# encrypted_pii is a compact JWE string — embed it in authorization_details below
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepEncryptPii",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { label: "Node.js", lang: "typescript", code: encryptNode },
      { label: "Python", lang: "python", code: encryptPython }
    ];
    const { docsVersion } = useRouteVersion();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))} data-v-345ea339>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` The <code data-v-345ea339${_scopeId}>consent.PersonalIdentifiableInformation</code> property in the <code data-v-345ea339${_scopeId}>authorization_details</code> carries sensitive payment data — creditor account details, debtor information, and risk indicators. Because consents are stored centrally at Nebras, this data is encrypted end-to-end so that no intermediate party can read it. `);
          } else {
            return [
              createTextVNode(" The "),
              createVNode("code", null, "consent.PersonalIdentifiableInformation"),
              createTextVNode(" property in the "),
              createVNode("code", null, "authorization_details"),
              createTextVNode(" carries sensitive payment data — creditor account details, debtor information, and risk indicators. Because consents are stored centrally at Nebras, this data is encrypted end-to-end so that no intermediate party can read it. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`The schema defines <code data-v-345ea339${_scopeId}>PersonalIdentifiableInformation</code> as a <code data-v-345ea339${_scopeId}>oneOf</code> with three variants:`);
          } else {
            return [
              createTextVNode("The schema defines "),
              createVNode("code", null, "PersonalIdentifiableInformation"),
              createTextVNode(" as a "),
              createVNode("code", null, "oneOf"),
              createTextVNode(" with three variants:")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-v-345ea339${_scopeId}><thead data-v-345ea339${_scopeId}><tr data-v-345ea339${_scopeId}><th data-v-345ea339${_scopeId}>Variant</th><th data-v-345ea339${_scopeId}>Form</th><th data-v-345ea339${_scopeId}>Notes</th></tr></thead><tbody data-v-345ea339${_scopeId}><tr data-v-345ea339${_scopeId}><td data-v-345ea339${_scopeId}><strong data-v-345ea339${_scopeId}>Domestic Payment PII Schema Object</strong></td><td data-v-345ea339${_scopeId}>object</td><td data-v-345ea339${_scopeId}>Unencrypted form — shows the PII structure for domestic payments. For reference only.</td></tr><tr data-v-345ea339${_scopeId}><td data-v-345ea339${_scopeId}><strong data-v-345ea339${_scopeId}>International Payment PII Schema Object</strong></td><td data-v-345ea339${_scopeId}>object</td><td data-v-345ea339${_scopeId}>Unencrypted form — shows the PII structure for international payments. For reference only.</td></tr><tr data-v-345ea339${_scopeId}><td data-v-345ea339${_scopeId}><strong data-v-345ea339${_scopeId}>Encrypted PII Object</strong> (<code data-v-345ea339${_scopeId}>AEJWEPaymentPII</code>)</td><td data-v-345ea339${_scopeId}>string</td><td data-v-345ea339${_scopeId}>Compact JWE string. <strong data-v-345ea339${_scopeId}>MUST</strong> be used when invoking the PAR operation.</td></tr></tbody></table>`);
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
                      createVNode("strong", null, "Domestic Payment PII Schema Object")
                    ]),
                    createVNode("td", null, "object"),
                    createVNode("td", null, "Unencrypted form — shows the PII structure for domestic payments. For reference only.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "International Payment PII Schema Object")
                    ]),
                    createVNode("td", null, "object"),
                    createVNode("td", null, "Unencrypted form — shows the PII structure for international payments. For reference only.")
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
                      createTextVNode(" be used when invoking the PAR operation.")
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
            _push2(`<p data-v-345ea339${_scopeId}> The object you encrypt <strong data-v-345ea339${_scopeId}>MUST</strong> conform exactly to the <strong data-v-345ea339${_scopeId}>Domestic Payment PII Schema Object</strong>. Field names, nesting, and data types are validated by the LFI after decryption — any deviation will result in payment rejection. Do not add undocumented fields or omit required ones. </p><p data-v-345ea339${_scopeId}> See <a${ssrRenderAttr("href", `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/`)} data-v-345ea339${_scopeId}>Personal Identifiable Information</a> for the complete field reference, required vs optional fields, and creditor models for each domestic payment type. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" The object you encrypt "),
                createVNode("strong", null, "MUST"),
                createTextVNode(" conform exactly to the "),
                createVNode("strong", null, "Domestic Payment PII Schema Object"),
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
        type: "info",
        title: "Creditor array — exactly one entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-345ea339${_scopeId}><code data-v-345ea339${_scopeId}>Initiation.Creditor</code> is an <strong data-v-345ea339${_scopeId}>array</strong> but must contain <strong data-v-345ea339${_scopeId}>exactly one entry</strong> for this payment type. The consent is bound to that single recipient — every payment made under this consent must go to that account. </p><p data-v-345ea339${_scopeId}> See <a${ssrRenderAttr("href", `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/creditor`)} data-v-345ea339${_scopeId}>Creditor</a> for the field schema and validation rules. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode("code", null, "Initiation.Creditor"),
                createTextVNode(" is an "),
                createVNode("strong", null, "array"),
                createTextVNode(" but must contain "),
                createVNode("strong", null, "exactly one entry"),
                createTextVNode(" for this payment type. The consent is bound to that single recipient — every payment made under this consent must go to that account. ")
              ]),
              createVNode("p", null, [
                createTextVNode(" See "),
                createVNode("a", {
                  href: `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/personal-identifiable-information/creditor`
                }, "Creditor", 8, ["href"]),
                createTextVNode(" for the field schema and validation rules. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` The PII object is serialized to JSON, signed as a JWS using your signing key, and then encrypted as a JWE using the LFI&#39;s public encryption key — producing the <code data-v-345ea339${_scopeId}>AEJWEPaymentPII</code> compact string embedded as <code data-v-345ea339${_scopeId}>PersonalIdentifiableInformation</code> in the consent. `);
          } else {
            return [
              createTextVNode(" The PII object is serialized to JSON, signed as a JWS using your signing key, and then encrypted as a JWE using the LFI's public encryption key — producing the "),
              createVNode("code", null, "AEJWEPaymentPII"),
              createTextVNode(" compact string embedded as "),
              createVNode("code", null, "PersonalIdentifiableInformation"),
              createTextVNode(" in the consent. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h3 class="ag-step__subhead" data-v-345ea339>Encrypting the PII</h3>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Build the PII object according to the schema, then encrypt it as a JWE using the LFI&#39;s public encryption key: `);
          } else {
            return [
              createTextVNode(" Build the PII object according to the schema, then encrypt it as a JWE using the LFI's public encryption key: ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdCodeGroup, { tabs }, null, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` See <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-345ea339${_scopeId}>Message Encryption</a> for details on fetching the LFI&#39;s JWKS and selecting the correct encryption key. `);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepEncryptPii.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-345ea339"]]);
export {
  __unplugin_components_5 as _
};
