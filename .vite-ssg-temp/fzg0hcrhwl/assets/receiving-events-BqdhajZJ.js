import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "receiving-events",
  __ssrInlineRender: true,
  setup(__props) {
    const readKidTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const kid = getJweKid(jweString)
const privateKey = myKeyStore.getPrivateKey(kid)`
      },
      {
        label: "Python",
        lang: "python",
        code: `import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

kid = get_jwe_kid(jwe_string)
private_key = my_key_store.get_private_key(kid)`
      }
    ];
    const decryptTabs = [
      {
        label: "Node.js (jose)",
        lang: "typescript",
        code: `import { compactDecrypt, importPKCS8 } from 'jose'

const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)
const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(jweString, privateKey)
const jwsString = new TextDecoder().decode(plaintext)`
      },
      {
        label: "Python (jwcrypto)",
        lang: "python",
        code: `from jwcrypto import jwe as jwecrypto

token = jwecrypto.JWE()
token.deserialize(jwe_string, key=private_key)
jws_string = token.payload.decode()`
      }
    ];
    const verifyTabs = [
      {
        label: "Node.js (jose)",
        lang: "typescript",
        code: `import { createLocalJWKSet, jwtVerify } from 'jose'

// Fetch Hub JWKS from the Hub's .well-known/openid-configuration
const hubJwks = createLocalJWKSet(await fetchHubJwks())

const { payload } = await jwtVerify(jwsString, hubJwks, {
  issuer:   expectedLfiIssuer,   // see security checks below
  audience: process.env.CLIENT_ID,
})

return payload.message`
      },
      {
        label: "Python (jwcrypto)",
        lang: "python",
        code: `import json
from jwcrypto import jwt

hub_key = fetch_hub_public_key()
verified = jwt.JWT(key=hub_key, jwt=jws_string)
claims = json.loads(verified.claims)

# Perform claim validation manually — see security checks below
return claims["message"]`
      }
    ];
    const fullExampleTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `import { compactDecrypt, createLocalJWKSet, importPKCS8, jwtVerify } from 'jose'

async function processWebhookEvent(jweString: string) {
  // 1. Read kid from the JWE protected header and select the right private key
  const kid = getJweKid(jweString)
  const privateKey = await importPKCS8(
    myKeyStore.getPrivateKeyPem(kid),
    'RSA-OAEP-256',
  )

  // 2. Decrypt the JWE → inner JWS string
  const { plaintext } = await compactDecrypt(jweString, privateKey)
  const jwsString = new TextDecoder().decode(plaintext)

  // 3. Peek at the unverified payload to find which consent this event is about
  const [, payloadB64] = jwsString.split('.')
  const unverified = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
  const consentId = unverified?.message?.Meta?.ConsentId

  // 4. Look up the expected LFI issuer from your consent store
  const expectedIssuer = myConsentStore.getIssuer(consentId)
  if (!expectedIssuer) throw new Error(\`Unknown consentId: \${consentId}\`)

  // 5. Verify signature and standard claims (iss, aud, exp, nbf)
  const hubJwks = createLocalJWKSet(await fetchHubJwks())
  const { payload } = await jwtVerify(jwsString, hubJwks, {
    issuer:   expectedIssuer,
    audience: process.env.CLIENT_ID,
  })

  // 6. Replay check
  if (payload.jti && seenJtis.has(payload.jti)) {
    throw new Error(\`Replayed event jti: \${payload.jti}\`)
  }
  if (payload.jti) seenJtis.add(payload.jti)

  return payload.message
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `import base64
import json
from jwcrypto import jwe as jwecrypto, jwt

def process_webhook_event(jwe_string: str):
    # 1. Read kid from the JWE protected header and select the right private key
    header_b64 = jwe_string.split(".")[0]
    kid = json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]
    private_key = my_key_store.get_private_key(kid)

    # 2. Decrypt the JWE → inner JWS string
    token = jwecrypto.JWE()
    token.deserialize(jwe_string, key=private_key)
    jws_string = token.payload.decode()

    # 3. Peek at the unverified payload to find which consent this event is about
    payload_b64 = jws_string.split(".")[1]
    unverified = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))
    consent_id = unverified.get("message", {}).get("Meta", {}).get("ConsentId")

    # 4. Look up the expected LFI issuer from your consent store
    expected_issuer = my_consent_store.get_issuer(consent_id)
    if not expected_issuer:
        raise ValueError(f"Unknown consentId: {consent_id}")

    # 5. Verify signature and standard claims
    hub_key = fetch_hub_public_key()
    verified = jwt.JWT(
        key=hub_key,
        jwt=jws_string,
        check_claims={
            "iss": expected_issuer,
            "aud": os.environ["CLIENT_ID"],
            "exp": None,
            "nbf": None,
        },
    )
    claims = json.loads(verified.claims)

    # 6. Replay check
    jti = claims.get("jti")
    if jti and jti in seen_jtis:
        raise ValueError(f"Replayed event jti: {jti}")
    if jti:
        seen_jtis.add(jti)

    return claims["message"]`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-abe1a961><section class="ed-doc__hero" data-v-abe1a961><div class="ed-doc__inner" data-v-abe1a961><div class="ed-doc__eyebrow" data-v-abe1a961><span class="ed-doc__eyebrow-dash" data-v-abe1a961></span> Security · FAPI · Webhooks </div><h1 class="ed-doc__title" data-v-abe1a961> Receiving Event Notifications <span class="ed-doc__read" data-v-abe1a961>2 min read</span></h1><p class="ed-doc__lede" data-v-abe1a961> When the API Hub delivers a webhook event (such as a Payment Status or Consent Status change), it POSTs a <strong data-v-abe1a961>JWE compact serialisation</strong> to your registered webhook URL. The JWE is encrypted with your public <strong data-v-abe1a961>Encryption Certificate</strong>, and the decrypted payload is a signed JWT (JWS) containing the event. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-abe1a961> This page covers how to correctly decrypt, verify, and validate the event in line with the FAPI 2.0 Security Profile. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Step 1",
        title: "Read the kid and select the right key",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The JWE protected header identifies which of your registered encryption keys was used via the <code data-v-abe1a961${_scopeId2}>kid</code> claim. Decode the first segment to read it before attempting decryption: `);
                } else {
                  return [
                    createTextVNode(" The JWE protected header identifies which of your registered encryption keys was used via the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" claim. Decode the first segment to read it before attempting decryption: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: readKidTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Multiple encryption keys"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-abe1a961${_scopeId2}> Keep retired private keys available until you are confident no in-flight events were encrypted with them — the <code data-v-abe1a961${_scopeId2}>kid</code> tells you exactly which key to use. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Keep retired private keys available until you are confident no in-flight events were encrypted with them — the "),
                      createVNode("code", null, "kid"),
                      createTextVNode(" tells you exactly which key to use. ")
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
                  createTextVNode(" The JWE protected header identifies which of your registered encryption keys was used via the "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" claim. Decode the first segment to read it before attempting decryption: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: readKidTabs }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Multiple encryption keys"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Keep retired private keys available until you are confident no in-flight events were encrypted with them — the "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" tells you exactly which key to use. ")
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
        id: "step-2",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Step 2",
        title: "Decrypt the JWE",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Decrypt the JWE using the private key selected above. The result is the inner JWS: `);
                } else {
                  return [
                    createTextVNode(" Decrypt the JWE using the private key selected above. The result is the inner JWS: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: decryptTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Decrypt the JWE using the private key selected above. The result is the inner JWS: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: decryptTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 3",
        title: "Verify the JWS signature and validate claims",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The inner JWS is signed by the API Hub. Verify the signature using the Hub&#39;s public JWKS, then validate the JWT claims. `);
                } else {
                  return [
                    createTextVNode(" The inner JWS is signed by the API Hub. Verify the signature using the Hub's public JWKS, then validate the JWT claims. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: verifyTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The inner JWS is signed by the API Hub. Verify the signature using the Hub's public JWKS, then validate the JWT claims. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: verifyTabs })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "security-checks",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Security Checks",
        title: "FAPI-required claim validation before processing",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After decrypting and verifying the signature, validate the following claims before processing the event. These checks are required by the FAPI 2.0 Security Profile. `);
                } else {
                  return [
                    createTextVNode(" After decrypting and verifying the signature, validate the following claims before processing the event. These checks are required by the FAPI 2.0 Security Profile. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-abe1a961${_scopeId2}><thead data-v-abe1a961${_scopeId2}><tr data-v-abe1a961${_scopeId2}><th data-v-abe1a961${_scopeId2}>Check</th><th data-v-abe1a961${_scopeId2}>Claim</th><th data-v-abe1a961${_scopeId2}>What to verify</th></tr></thead><tbody data-v-abe1a961${_scopeId2}><tr data-v-abe1a961${_scopeId2}><td data-v-abe1a961${_scopeId2}>Issuer</td><td data-v-abe1a961${_scopeId2}><code data-v-abe1a961${_scopeId2}>iss</code></td><td data-v-abe1a961${_scopeId2}>Must match the issuer of the LFI that owns the consent — cross-reference with the <code data-v-abe1a961${_scopeId2}>ConsentId</code> in <code data-v-abe1a961${_scopeId2}>Meta</code>. Reject events where <code data-v-abe1a961${_scopeId2}>iss</code> does not match the expected LFI to prevent an event from one LFI being replayed against a consent held at another.</td></tr><tr data-v-abe1a961${_scopeId2}><td data-v-abe1a961${_scopeId2}>Audience</td><td data-v-abe1a961${_scopeId2}><code data-v-abe1a961${_scopeId2}>aud</code></td><td data-v-abe1a961${_scopeId2}>Must contain your application&#39;s <code data-v-abe1a961${_scopeId2}>client_id</code>. Reject events addressed to a different client.</td></tr><tr data-v-abe1a961${_scopeId2}><td data-v-abe1a961${_scopeId2}>Expiry</td><td data-v-abe1a961${_scopeId2}><code data-v-abe1a961${_scopeId2}>exp</code></td><td data-v-abe1a961${_scopeId2}>Must be in the future. Reject expired tokens.</td></tr><tr data-v-abe1a961${_scopeId2}><td data-v-abe1a961${_scopeId2}>Not Before</td><td data-v-abe1a961${_scopeId2}><code data-v-abe1a961${_scopeId2}>nbf</code></td><td data-v-abe1a961${_scopeId2}>If present, must not be in the future.</td></tr><tr data-v-abe1a961${_scopeId2}><td data-v-abe1a961${_scopeId2}>Replay</td><td data-v-abe1a961${_scopeId2}><code data-v-abe1a961${_scopeId2}>jti</code></td><td data-v-abe1a961${_scopeId2}>If present, record the value and reject any future event with the same <code data-v-abe1a961${_scopeId2}>jti</code>. This prevents a delivered event from being replayed.</td></tr><tr data-v-abe1a961${_scopeId2}><td data-v-abe1a961${_scopeId2}>Consent match</td><td data-v-abe1a961${_scopeId2}><code data-v-abe1a961${_scopeId2}>Meta.ConsentId</code></td><td data-v-abe1a961${_scopeId2}>Must correspond to a consent your application created. Discard events for unknown consent IDs.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Check"),
                          createVNode("th", null, "Claim"),
                          createVNode("th", null, "What to verify")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, "Issuer"),
                          createVNode("td", null, [
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Must match the issuer of the LFI that owns the consent — cross-reference with the "),
                            createVNode("code", null, "ConsentId"),
                            createTextVNode(" in "),
                            createVNode("code", null, "Meta"),
                            createTextVNode(". Reject events where "),
                            createVNode("code", null, "iss"),
                            createTextVNode(" does not match the expected LFI to prevent an event from one LFI being replayed against a consent held at another.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Audience"),
                          createVNode("td", null, [
                            createVNode("code", null, "aud")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Must contain your application's "),
                            createVNode("code", null, "client_id"),
                            createTextVNode(". Reject events addressed to a different client.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Expiry"),
                          createVNode("td", null, [
                            createVNode("code", null, "exp")
                          ]),
                          createVNode("td", null, "Must be in the future. Reject expired tokens.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Not Before"),
                          createVNode("td", null, [
                            createVNode("code", null, "nbf")
                          ]),
                          createVNode("td", null, "If present, must not be in the future.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Replay"),
                          createVNode("td", null, [
                            createVNode("code", null, "jti")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("If present, record the value and reject any future event with the same "),
                            createVNode("code", null, "jti"),
                            createTextVNode(". This prevents a delivered event from being replayed.")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, "Consent match"),
                          createVNode("td", null, [
                            createVNode("code", null, "Meta.ConsentId")
                          ]),
                          createVNode("td", null, "Must correspond to a consent your application created. Discard events for unknown consent IDs.")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Issuer validation is critical"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-abe1a961${_scopeId2}> Always verify that <code data-v-abe1a961${_scopeId2}>iss</code> corresponds to the LFI tied to the consent in <code data-v-abe1a961${_scopeId2}>Meta.ConsentId</code>. Without this check, a malicious actor could craft or replay an event from a different LFI to influence your application&#39;s view of a consent it holds elsewhere. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Always verify that "),
                      createVNode("code", null, "iss"),
                      createTextVNode(" corresponds to the LFI tied to the consent in "),
                      createVNode("code", null, "Meta.ConsentId"),
                      createTextVNode(". Without this check, a malicious actor could craft or replay an event from a different LFI to influence your application's view of a consent it holds elsewhere. ")
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
                  createTextVNode(" After decrypting and verifying the signature, validate the following claims before processing the event. These checks are required by the FAPI 2.0 Security Profile. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Check"),
                        createVNode("th", null, "Claim"),
                        createVNode("th", null, "What to verify")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, "Issuer"),
                        createVNode("td", null, [
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Must match the issuer of the LFI that owns the consent — cross-reference with the "),
                          createVNode("code", null, "ConsentId"),
                          createTextVNode(" in "),
                          createVNode("code", null, "Meta"),
                          createTextVNode(". Reject events where "),
                          createVNode("code", null, "iss"),
                          createTextVNode(" does not match the expected LFI to prevent an event from one LFI being replayed against a consent held at another.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Audience"),
                        createVNode("td", null, [
                          createVNode("code", null, "aud")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Must contain your application's "),
                          createVNode("code", null, "client_id"),
                          createTextVNode(". Reject events addressed to a different client.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Expiry"),
                        createVNode("td", null, [
                          createVNode("code", null, "exp")
                        ]),
                        createVNode("td", null, "Must be in the future. Reject expired tokens.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Not Before"),
                        createVNode("td", null, [
                          createVNode("code", null, "nbf")
                        ]),
                        createVNode("td", null, "If present, must not be in the future.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Replay"),
                        createVNode("td", null, [
                          createVNode("code", null, "jti")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("If present, record the value and reject any future event with the same "),
                          createVNode("code", null, "jti"),
                          createTextVNode(". This prevents a delivered event from being replayed.")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, "Consent match"),
                        createVNode("td", null, [
                          createVNode("code", null, "Meta.ConsentId")
                        ]),
                        createVNode("td", null, "Must correspond to a consent your application created. Discard events for unknown consent IDs.")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Issuer validation is critical"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Always verify that "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" corresponds to the LFI tied to the consent in "),
                    createVNode("code", null, "Meta.ConsentId"),
                    createTextVNode(". Without this check, a malicious actor could craft or replay an event from a different LFI to influence your application's view of a consent it holds elsewhere. ")
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
        id: "full-example",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Full Example",
        title: "End-to-end webhook handler with FAPI checks",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: fullExampleTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCodeGroup, { tabs: fullExampleTabs })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/receiving-events.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const receivingEvents = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-abe1a961"]]);
export {
  receivingEvents as default
};
