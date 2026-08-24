import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const compactSerialization = `base64url(header) . base64url(encrypted-key) . base64url(iv) . base64url(ciphertext) . base64url(tag)`;
const headerJson = `{
  "alg": "RSA-OAEP-256",
  "enc": "A256GCM",
  "kid": "<lfi-encryption-key-id>"
}`;
const jwksUriExample = `https://keystore.directory.openfinance.ae/[LFI-UUID]/application.jwks`;
const exampleEncKey = `{
  "kty": "RSA",
  "use": "enc",
  "x5c": ["MIIF5zCCBM+gAwIBAgIUTAsBRMW3lPiptQPq4DD3aPVvT/gwDQYJKoZIhvcNAQEL..."],
  "n": "qyWmUY-_eWY7H8IHeHDTM-UIgJUVeoEme1J2KCvMMzmUDLSRUP8HljchOQKx9zwMquOSEXsQC4IOsXOa2NKPFbeidhnzSire6nHALJMowN3fMfIeBTbf9nuEzafJHMLixSpcjrPvyhzhMKjGZ5EY6MCBm6fNdRmcEOBCTfF8wjOrl9Y4mi-fz16INi8zHJrsKMJwuj3VD5jQ3J64twLQ-E9aECuIBH51L-6J4c9Pwp1M3W_nZ0RpivBQlLY8jJKr_r-a9TUKikFzVSWK9-trvMK32fLjuEwTvSB9YHLPfOq8qNmyS8djf8vM2AIavkE5Ge-ZRGr0JXXbS5vEAOUHkw",
  "e": "AQAB",
  "kid": "NLVWCFEnbvtP1n4mG040VTwTMl-mhI6AdQiOOJbf_1w",
  "x5u": "https://keystore.directory.openfinance.ae/36b067c3-8017-4144-bb7e-49cf794089c9/NLVWCFEnbvtP1n4mG040VTwTMl-mhI6AdQiOOJbf_1w.pem",
  "x5t#S256": "NLVWCFEnbvtP1n4mG040VTwTMl-mhI6AdQiOOJbf_1w",
  "x5dn": "OU=36b067c3-8017-4144-bb7e-49cf794089c9,O=Abu Dhabi Commercial Bank PBJC,C=AE"
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "message-encryption",
  __ssrInlineRender: true,
  setup(__props) {
    const encryptTabs = [
      {
        label: "Node.js (jose)",
        lang: "typescript",
        code: `import { importJWK, CompactEncrypt } from 'jose'

interface JWK {
  use: string
  kid: string
  [key: string]: unknown
}

/**
 * Encrypt a payment PII payload as a compact JWE using the LFI's public key.
 * @param pii      - The PII JSON (Initiation, RiskIndicators, etc.)
 * @param jwksUri  - The LFI's JWKS URI from .well-known
 */
export async function encryptPii(
  pii: Record<string, unknown>,
  jwksUri: string,
): Promise<string> {
  // 1. Fetch the LFI's public keys
  const response = await fetch(jwksUri)
  const { keys } = await response.json() as { keys: JWK[] }

  // 2. Find the encryption key
  const encKeyJwk = keys.find((k) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  // 3. Import the public key
  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  // 4. Encrypt the PII JSON
  const plaintext = new TextEncoder().encode(JSON.stringify(pii))
  return new CompactEncrypt(plaintext)
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(encKey)
}`
      },
      {
        label: "Python (python-jose)",
        lang: "python",
        code: `import json
import requests
from jose import jwe

def encrypt_pii(pii: dict, jwks_uri: str) -> str:
    """Encrypt a payment PII payload as a compact JWE using the LFI's public key."""
    # 1. Fetch the LFI's public keys
    response = requests.get(jwks_uri)
    keys = response.json()["keys"]

    # 2. Find the encryption key
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    # 3. Encrypt the PII JSON
    return jwe.encrypt(
        json.dumps(pii).encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()`
      }
    ];
    const embedTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `import crypto from 'node:crypto'
import { encryptPii } from './encrypt-pii'
import { buildRequestJWT } from './request-jwt'

const jwksUri = 'https://keystore.directory.openfinance.ae/[lfi-uuid]/application.jwks'

// 1. Build the PII payload (creditor/debtor accounts, risk indicators)
const pii = {
  Initiation: {
    Debtor: { Name: { en: 'John Doe' } },
    Creditor: [
      { Name: { en: 'Acme Ltd' }, Identification: 'AE070331234567890123456' },
    ],
  },
  RiskIndicators: { /* ... */ },
}

// 2. Encrypt the PII as a JWE
const piiJwe = await encryptPii(pii, jwksUri)

// 3. Embed the JWE inside the consent's authorization_details
const authorizationDetails = [{
  type: 'urn:openfinanceuae:service-initiation-consent:v2.1',
  consent: {
    ConsentId: crypto.randomUUID(),
    ExpirationDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    pii: piiJwe,                    // ← encrypted PII goes here
    // other consent fields
  },
}]

// 4. Build and sign the Request JWT — note: the Request JWT itself is NOT encrypted
const requestJwt = await buildRequestJWT({
  scope: 'payments openid',
  codeChallenge: '<from PKCE>',
  authorizationDetails,
})

// 5. Send to /par as usual
// body: new URLSearchParams({ request: requestJwt })`
      },
      {
        label: "Python",
        lang: "python",
        code: `import uuid
from datetime import datetime, timedelta, timezone
from encrypt_pii import encrypt_pii
from request_jwt import build_request_jwt

JWKS_URI = "https://keystore.directory.openfinance.ae/[lfi-uuid]/application.jwks"

# 1. Build the PII payload (creditor/debtor accounts, risk indicators)
pii = {
    "Initiation": {
        "Debtor": {"Name": {"en": "John Doe"}},
        "Creditor": [
            {"Name": {"en": "Acme Ltd"}, "Identification": "AE070331234567890123456"},
        ],
    },
    "RiskIndicators": { },  # ...
}

# 2. Encrypt the PII as a JWE
pii_jwe = encrypt_pii(pii, JWKS_URI)

# 3. Embed the JWE inside the consent's authorization_details
expires_at = datetime.now(timezone.utc) + timedelta(days=1)
authorization_details = [{
    "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
    "consent": {
        "ConsentId": str(uuid.uuid4()),
        "ExpirationDateTime": expires_at.isoformat(),
        "pii": pii_jwe,                # ← encrypted PII goes here
        # other consent fields
    },
}]

# 4. Build and sign the Request JWT — note: the Request JWT itself is NOT encrypted
request_jwt = build_request_jwt(
    scope="payments openid",
    code_challenge="<from PKCE>",
    authorization_details=authorization_details,
)

# 5. Send to /par as usual
# data={"request": request_jwt}`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-a1358d9c><section class="ed-doc__hero" data-v-a1358d9c><div class="ed-doc__inner" data-v-a1358d9c><div class="ed-doc__eyebrow" data-v-a1358d9c><span class="ed-doc__eyebrow-dash" data-v-a1358d9c></span> Security · FAPI · JWE </div><h1 class="ed-doc__title" data-v-a1358d9c> Message Encryption (JWE) <span class="ed-doc__read" data-v-a1358d9c>3 min read</span></h1><p class="ed-doc__lede" data-v-a1358d9c> A <strong data-v-a1358d9c>JWE</strong> (JSON Web Encryption — <a href="https://datatracker.ietf.org/doc/html/rfc7516" data-v-a1358d9c>RFC 7516</a>) is the cryptographic mechanism that encrypts a payload so that only the intended recipient can read it. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-a1358d9c> In UAE Open Finance, JWE is used <strong data-v-a1358d9c>specifically for payment consents</strong> — to encrypt the consent&#39;s <strong data-v-a1358d9c>PII payload</strong> (creditor and debtor names, account numbers, risk indicators) end-to-end with the LFI&#39;s public key. The encrypted blob is carried in the consent&#39;s <code data-v-a1358d9c>pii</code> field, nested inside the <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-a1358d9c>Request JWT</a>&#39;s <code data-v-a1358d9c>authorization_details</code>. The Request JWT itself is signed (JWS) but is <strong data-v-a1358d9c>not</strong> wrapped in a JWE; only the <code data-v-a1358d9c>pii</code> field is. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-a1358d9c> See <a href="/knowledge-base/articles/pii-encryption" data-v-a1358d9c>Payment PII Encryption</a> for the data privacy rationale and the LFI/TPP validation responsibilities that flow from this design. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "structure",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Structure of an Encrypted Payload",
        title: "Five base64url parts joined by dots",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A compact-serialised JWE consists of five base64url-encoded parts joined by <code data-v-a1358d9c${_scopeId2}>.</code>:`);
                } else {
                  return [
                    createTextVNode("A compact-serialised JWE consists of five base64url-encoded parts joined by "),
                    createVNode("code", null, "."),
                    createTextVNode(":")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: compactSerialization,
              lang: "plaintext",
              filename: "Compact serialization"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A compact-serialised JWE consists of five base64url-encoded parts joined by "),
                  createVNode("code", null, "."),
                  createTextVNode(":")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: compactSerialization,
                lang: "plaintext",
                filename: "Compact serialization"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "header",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "JOSE Header",
        title: "Key wrap, content encryption, and the LFI's key ID",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: headerJson,
              lang: "json",
              filename: "JOSE header"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-a1358d9c${_scopeId2}><thead data-v-a1358d9c${_scopeId2}><tr data-v-a1358d9c${_scopeId2}><th data-v-a1358d9c${_scopeId2}>Field</th><th data-v-a1358d9c${_scopeId2}>Value</th><th data-v-a1358d9c${_scopeId2}>Description</th></tr></thead><tbody data-v-a1358d9c${_scopeId2}><tr data-v-a1358d9c${_scopeId2}><td data-v-a1358d9c${_scopeId2}><code data-v-a1358d9c${_scopeId2}>alg</code></td><td data-v-a1358d9c${_scopeId2}><code data-v-a1358d9c${_scopeId2}>RSA-OAEP-256</code></td><td data-v-a1358d9c${_scopeId2}>Key-wrapping algorithm — encrypts the content encryption key using the LFI&#39;s RSA public key</td></tr><tr data-v-a1358d9c${_scopeId2}><td data-v-a1358d9c${_scopeId2}><code data-v-a1358d9c${_scopeId2}>enc</code></td><td data-v-a1358d9c${_scopeId2}><code data-v-a1358d9c${_scopeId2}>A256GCM</code></td><td data-v-a1358d9c${_scopeId2}>Content encryption algorithm — encrypts the actual payload using AES-256-GCM</td></tr><tr data-v-a1358d9c${_scopeId2}><td data-v-a1358d9c${_scopeId2}><code data-v-a1358d9c${_scopeId2}>kid</code></td><td data-v-a1358d9c${_scopeId2}>string</td><td data-v-a1358d9c${_scopeId2}>Key ID of the LFI&#39;s encryption key, taken from their JWKS</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Value"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "alg")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "RSA-OAEP-256")
                          ]),
                          createVNode("td", null, "Key-wrapping algorithm — encrypts the content encryption key using the LFI's RSA public key")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "enc")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "A256GCM")
                          ]),
                          createVNode("td", null, "Content encryption algorithm — encrypts the actual payload using AES-256-GCM")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "kid")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Key ID of the LFI's encryption key, taken from their JWKS")
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
                code: headerJson,
                lang: "json",
                filename: "JOSE header"
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Value"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "alg")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "RSA-OAEP-256")
                        ]),
                        createVNode("td", null, "Key-wrapping algorithm — encrypts the content encryption key using the LFI's RSA public key")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "enc")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "A256GCM")
                        ]),
                        createVNode("td", null, "Content encryption algorithm — encrypts the actual payload using AES-256-GCM")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "kid")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Key ID of the LFI's encryption key, taken from their JWKS")
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
        id: "discover",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Discover the LFI's encryption key",
        title: "JWKS URI and key selection",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-a1358d9c${_scopeId}>Step 1 — Discover the JWKS URI</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each LFI publishes its public keys at a JWKS URI. You can find this URI by performing <a href="/tech/tpp-standards/trust-framework/api-discovery" data-v-a1358d9c${_scopeId2}>API Discovery</a> via the <code data-v-a1358d9c${_scopeId2}>.well-known</code> endpoint. `);
                } else {
                  return [
                    createTextVNode(" Each LFI publishes its public keys at a JWKS URI. You can find this URI by performing "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery"),
                    createTextVNode(" via the "),
                    createVNode("code", null, ".well-known"),
                    createTextVNode(" endpoint. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The JWKS URI follows this format:`);
                } else {
                  return [
                    createTextVNode("The JWKS URI follows this format:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: jwksUriExample,
              lang: "plaintext",
              filename: "JWKS URI"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-a1358d9c${_scopeId}>Step 2 — Select the encryption key</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Fetch the JWKS and find a key where <code data-v-a1358d9c${_scopeId2}>&quot;use&quot;: &quot;enc&quot;</code>. This is the LFI&#39;s public key intended for encryption. `);
                } else {
                  return [
                    createTextVNode(" Fetch the JWKS and find a key where "),
                    createVNode("code", null, '"use": "enc"'),
                    createTextVNode(". This is the LFI's public key intended for encryption. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-a1358d9c${_scopeId2}>Example encryption key from a JWKS:</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "Example encryption key from a JWKS:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleEncKey,
              lang: "json",
              filename: "application.jwks (excerpt)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Key selection"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-a1358d9c${_scopeId2}> If the JWKS contains multiple keys, always select the one where <code data-v-a1358d9c${_scopeId2}>&quot;use&quot;: &quot;enc&quot;</code>. Do not use a signing key (<code data-v-a1358d9c${_scopeId2}>&quot;use&quot;: &quot;sig&quot;</code>) for encryption — the operations are not interchangeable. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If the JWKS contains multiple keys, always select the one where "),
                      createVNode("code", null, '"use": "enc"'),
                      createTextVNode(". Do not use a signing key ("),
                      createVNode("code", null, '"use": "sig"'),
                      createTextVNode(") for encryption — the operations are not interchangeable. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Step 1 — Discover the JWKS URI"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each LFI publishes its public keys at a JWKS URI. You can find this URI by performing "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery"),
                  createTextVNode(" via the "),
                  createVNode("code", null, ".well-known"),
                  createTextVNode(" endpoint. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The JWKS URI follows this format:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: jwksUriExample,
                lang: "plaintext",
                filename: "JWKS URI"
              }),
              createVNode("h3", null, "Step 2 — Select the encryption key"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Fetch the JWKS and find a key where "),
                  createVNode("code", null, '"use": "enc"'),
                  createTextVNode(". This is the LFI's public key intended for encryption. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Example encryption key from a JWKS:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleEncKey,
                lang: "json",
                filename: "application.jwks (excerpt)"
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Key selection"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If the JWKS contains multiple keys, always select the one where "),
                    createVNode("code", null, '"use": "enc"'),
                    createTextVNode(". Do not use a signing key ("),
                    createVNode("code", null, '"use": "sig"'),
                    createTextVNode(") for encryption — the operations are not interchangeable. ")
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
        id: "encrypt",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Encrypt the PII Payload",
        title: "Produce a compact JWE from the PII JSON",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The plaintext to encrypt is the <strong data-v-a1358d9c${_scopeId2}>PII JSON object</strong> — the <code data-v-a1358d9c${_scopeId2}>Initiation</code> and <code data-v-a1358d9c${_scopeId2}>RiskIndicators</code> structures defined by the consent schema. Encrypt it as a compact JWE before placing the result in the consent&#39;s <code data-v-a1358d9c${_scopeId2}>pii</code> field. `);
                } else {
                  return [
                    createTextVNode(" The plaintext to encrypt is the "),
                    createVNode("strong", null, "PII JSON object"),
                    createTextVNode(" — the "),
                    createVNode("code", null, "Initiation"),
                    createTextVNode(" and "),
                    createVNode("code", null, "RiskIndicators"),
                    createTextVNode(" structures defined by the consent schema. Encrypt it as a compact JWE before placing the result in the consent's "),
                    createVNode("code", null, "pii"),
                    createTextVNode(" field. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: encryptTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Testing encryption on the sandbox"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-a1358d9c${_scopeId2}> The sandbox provides an <strong data-v-a1358d9c${_scopeId2}>O3 Utility endpoint</strong> that accepts your PII payload and the LFI&#39;s JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See <a href="/tech/tpp-standards/security/fapi/o3-utils#example-1-o3-util-prepare-encrypted-pii" data-v-a1358d9c${_scopeId2}>O3 Sandbox Utilities</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The sandbox provides an "),
                      createVNode("strong", null, "O3 Utility endpoint"),
                      createTextVNode(" that accepts your PII payload and the LFI's JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils#example-1-o3-util-prepare-encrypted-pii" }, "O3 Sandbox Utilities"),
                      createTextVNode(". ")
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
                  createTextVNode(" The plaintext to encrypt is the "),
                  createVNode("strong", null, "PII JSON object"),
                  createTextVNode(" — the "),
                  createVNode("code", null, "Initiation"),
                  createTextVNode(" and "),
                  createVNode("code", null, "RiskIndicators"),
                  createTextVNode(" structures defined by the consent schema. Encrypt it as a compact JWE before placing the result in the consent's "),
                  createVNode("code", null, "pii"),
                  createTextVNode(" field. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: encryptTabs }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Testing encryption on the sandbox"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The sandbox provides an "),
                    createVNode("strong", null, "O3 Utility endpoint"),
                    createTextVNode(" that accepts your PII payload and the LFI's JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils#example-1-o3-util-prepare-encrypted-pii" }, "O3 Sandbox Utilities"),
                    createTextVNode(". ")
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
        id: "embed",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Embed the JWE in the Consent",
        title: "The JWE goes in the consent's pii field, then the Request JWT is signed around it",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once you have the JWE string, place it in the <code data-v-a1358d9c${_scopeId2}>pii</code> field of the consent inside the Request JWT&#39;s <code data-v-a1358d9c${_scopeId2}>authorization_details</code>. The surrounding Request JWT is signed (JWS) as usual — only the <code data-v-a1358d9c${_scopeId2}>pii</code> field is encrypted. `);
                } else {
                  return [
                    createTextVNode(" Once you have the JWE string, place it in the "),
                    createVNode("code", null, "pii"),
                    createTextVNode(" field of the consent inside the Request JWT's "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(". The surrounding Request JWT is signed (JWS) as usual — only the "),
                    createVNode("code", null, "pii"),
                    createTextVNode(" field is encrypted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: embedTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each encryption is fresh: a new payload is produced and encrypted at consent creation, and a fresh payload is produced and encrypted again at each <span class="endpoint" data-v-a1358d9c${_scopeId2}><span class="http-method http-method--post" data-v-a1358d9c${_scopeId2}>POST</span><code data-v-a1358d9c${_scopeId2}>/payments</code></span>. The two payloads are independently validated by the LFI after decryption. `);
                } else {
                  return [
                    createTextVNode(" Each encryption is fresh: a new payload is produced and encrypted at consent creation, and a fresh payload is produced and encrypted again at each "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(". The two payloads are independently validated by the LFI after decryption. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once you have the JWE string, place it in the "),
                  createVNode("code", null, "pii"),
                  createTextVNode(" field of the consent inside the Request JWT's "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(". The surrounding Request JWT is signed (JWS) as usual — only the "),
                  createVNode("code", null, "pii"),
                  createTextVNode(" field is encrypted. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: embedTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each encryption is fresh: a new payload is produced and encrypted at consent creation, and a fresh payload is produced and encrypted again at each "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(". The two payloads are independently validated by the LFI after decryption. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "receiving",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Receiving a JWE",
        title: "Inbound encrypted webhooks from the API Hub",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For guidance on receiving and decrypting inbound JWEs from the API Hub — including key selection by <code data-v-a1358d9c${_scopeId2}>kid</code>, signature verification, and FAPI-required security checks — see <a href="/tech/tpp-standards/security/fapi/receiving-events" data-v-a1358d9c${_scopeId2}>Receiving Event Notifications</a>. `);
                } else {
                  return [
                    createTextVNode(" For guidance on receiving and decrypting inbound JWEs from the API Hub — including key selection by "),
                    createVNode("code", null, "kid"),
                    createTextVNode(", signature verification, and FAPI-required security checks — see "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
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
                  createTextVNode(" For guidance on receiving and decrypting inbound JWEs from the API Hub — including key selection by "),
                  createVNode("code", null, "kid"),
                  createTextVNode(", signature verification, and FAPI-required security checks — see "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/receiving-events" }, "Receiving Event Notifications"),
                  createTextVNode(". ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/message-encryption.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messageEncryption = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1358d9c"]]);
export {
  messageEncryption as default
};
