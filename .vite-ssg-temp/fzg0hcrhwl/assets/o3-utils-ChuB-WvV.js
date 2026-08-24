import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const stripPemCmd = `awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' signing.key`;
const pmVarEncryptedPii = "{{encryptedPII}}";
const pmVarGuid = "{{$guid}}";
const ex1PreRequest = `const uuid = require('uuid')
const codeVerifier = uuid.v4() + uuid.v4()
const hashedCodeVerifier = CryptoJS.SHA256(codeVerifier)
let codeChallenge = CryptoJS.enc.Base64.stringify(hashedCodeVerifier)
codeChallenge = codeChallenge.replaceAll('+', '-').replaceAll('/', '_')
if (codeChallenge.endsWith('=')) codeChallenge = codeChallenge.slice(0, -1)

pm.environment.set('code-challenge', codeChallenge)
pm.environment.set('code-verifier', codeVerifier)
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)`;
const ex1TestScript = `pm.environment.set('encryptedPII', responseBody)`;
const ex1Body = `{
    "header": {
        "alg": "PS256",
        "kid": "{{kid-local}}"
    },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}",
        "Initiation": {
            // Optional — omit to allow the user to select their account at the LFI
            // "DebtorAccount": {
            //     "SchemeName": "IBAN",
            //     "Identification": "AE070331234567890123456",
            //     "Name": { "en": "Mohammed Al Rashidi" }
            // },
            "Creditor": [
                {
                    "CreditorAgent": {
                        "SchemeName": "BICFI",
                        "Identification": "10000109010101",
                        "Name": "Mario International",
                        "PostalAddress": [
                            { "AddressType": "Business", "Country": "AE" }
                        ]
                    },
                    "Creditor": {
                        "Name": "Mario International"
                    },
                    "CreditorAccount": {
                        "SchemeName": "AccountNumber",
                        "Identification": "10000109010101",
                        "Name": { "en": "Mario International" }
                    }
                }
            ]
        },
        "Risk": {
            "DebtorIndicators": {
                "UserName": { "en": "Mohammed Al Rashidi" }
            },
            "CreditorIndicators": {
                "AccountType": "Retail",
                "IsCreditorConfirmed": true,
                "IsCreditorPrePopulated": true,
                "TradingName": "Mario International"
            }
        }
    },
    "signingKeyPEM": "{{pem-local}}",
    "jwksUrl": "{{jwksUrl}}"
}`;
const ex2PreRequest = `pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)`;
const ex2TestScript = `pm.environment.set('private_key_jwt', responseBody)`;
const ex2Body = `{
    "header": {
        "alg": "PS256",
        "kid": "{{kid-local}}"
    },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}"
    },
    "signingKeyPEM": "{{pem-local}}"
}`;
const ex2ParRequest = `POST /par
Content-Type: application/x-www-form-urlencoded

client_id={{_clientId}}
&request={{requestObject}}
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={{private_key_jwt}}`;
const ex3TokenRequest = `POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code={{authorizationCode}}
&redirect_uri={{redirect_uri}}
&code_verifier={{code-verifier}}
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={{private_key_jwt}}`;
const ex4PreRequest = `const uuid = require('uuid')
const codeVerifier = uuid.v4() + uuid.v4()
const hashedCodeVerifier = CryptoJS.SHA256(codeVerifier)
let codeChallenge = CryptoJS.enc.Base64.stringify(hashedCodeVerifier)
codeChallenge = codeChallenge.replaceAll('+', '-').replaceAll('/', '_')
if (codeChallenge.endsWith('=')) codeChallenge = codeChallenge.slice(0, -1)

pm.environment.set('code-challenge', codeChallenge)
pm.environment.set('code-verifier', codeVerifier)
pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)
pm.environment.set('today', new Date().toISOString().split('T')[0])`;
const ex4TestScript = `pm.environment.set('requestObject', responseBody)

// Decode the payload to extract the consent ID
const parts = responseBody.split('.')
const payload = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(parts[1])))
pm.environment.set('response_type', payload.response_type)
pm.environment.set('scope', payload.scope)
pm.environment.set('consentId', payload.authorization_details[0].consent.ConsentId)`;
const ex4Body = `{
    "header": {
        "alg": "PS256",
        "kid": "{{kid-local}}"
    },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "scope": "payments openid",
        "redirect_uri": "https://docs.openfinance-hackathon.com/starter-kit/callback",
        "client_id": "{{_clientId}}",
        "nonce": "{{$guid}}",
        "state": "{{$guid}}",
        "nbf": "{{nbf}}",
        "response_type": "code",
        "code_challenge_method": "S256",
        "code_challenge": "{{code-challenge}}",
        "max_age": 3600,
        "authorization_details": [
            {
                "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
                "consent": {
                    "ConsentId": "{{$guid}}",
                    "IsSingleAuthorization": true,
                    "ExpirationDateTime": "{{today}}T23:00:00.000Z",
                    "ControlParameters": {
                        "ConsentSchedule": {
                            "SinglePayment": {
                                "MaximumIndividualAmount": {
                                    "Amount": "500.00",
                                    "Currency": "AED"
                                }
                            }
                        }
                    },
                    "PersonalIdentifiableInformation": "{{encryptedPII}}",
                    "PaymentPurposeCode": "ACM",
                    "DebtorReference": "Invoice 2026-08",
                    "CreditorReference": "Invoice 2026-08"
                }
            }
        ]
    },
    "signingKeyPEM": "{{pem-local}}"
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "o3-utils",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-292ee74b><section class="ed-doc__hero" data-v-292ee74b><div class="ed-doc__inner" data-v-292ee74b><div class="ed-doc__eyebrow" data-v-292ee74b><span class="ed-doc__eyebrow-dash" data-v-292ee74b></span> Security · Sandbox · O3 Utilities </div><h1 class="ed-doc__title" data-v-292ee74b> O3 Sandbox Utilities <span class="ed-doc__read" data-v-292ee74b>4 min read</span></h1><p class="ed-doc__lede" data-v-292ee74b> The Nebras Open Finance sandbox exposes a small set of <strong data-v-292ee74b>O3 Utility endpoints</strong> to help you verify that your signing and encryption logic is correct before wiring everything together in your own application. You send a signing key (and, for encryption, a JWKS URL) in the request body, and the utility returns the signed or encrypted token directly — so you can validate output at any stage of the flow without having to build the full cryptographic pipeline first. </p>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "danger",
        title: "Sandbox only — never use in production"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-292ee74b${_scopeId}> These endpoints accept raw private key material in the request body. They exist <strong data-v-292ee74b${_scopeId}>exclusively for development and testing on the sandbox</strong>. They are <strong data-v-292ee74b${_scopeId}>not available in any production environment</strong>, and you should never send real private keys to any external service. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" These endpoints accept raw private key material in the request body. They exist "),
                createVNode("strong", null, "exclusively for development and testing on the sandbox"),
                createTextVNode(". They are "),
                createVNode("strong", null, "not available in any production environment"),
                createTextVNode(", and you should never send real private keys to any external service. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "Base URL and Postman environment variables",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-292ee74b${_scopeId}>Base URL</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` All O3 Utility requests target the sandbox resource server: `);
                } else {
                  return [
                    createTextVNode(" All O3 Utility requests target the sandbox resource server: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
              lang: "plaintext"
            }, null, _parent2, _scopeId));
            _push2(`<h3 data-v-292ee74b${_scopeId}>Required environment variables</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Each example below references Postman environment variables. Set these before running: `);
                } else {
                  return [
                    createTextVNode(" Each example below references Postman environment variables. Set these before running: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-292ee74b${_scopeId2}><thead data-v-292ee74b${_scopeId2}><tr data-v-292ee74b${_scopeId2}><th data-v-292ee74b${_scopeId2}>Variable</th><th data-v-292ee74b${_scopeId2}>Description</th></tr></thead><tbody data-v-292ee74b${_scopeId2}><tr data-v-292ee74b${_scopeId2}><td data-v-292ee74b${_scopeId2}><code data-v-292ee74b${_scopeId2}>kid-local</code></td><td data-v-292ee74b${_scopeId2}>The Key ID (<code data-v-292ee74b${_scopeId2}>kid</code>) of your signing certificate, from the Trust Framework</td></tr><tr data-v-292ee74b${_scopeId2}><td data-v-292ee74b${_scopeId2}><code data-v-292ee74b${_scopeId2}>pem-local</code></td><td data-v-292ee74b${_scopeId2}>Your signing private key in PEM format (PKCS#8, stripped of newlines — see <a href="/tech/tpp-standards/security/fapi/message-signing#prerequisites" data-v-292ee74b${_scopeId2}>Message Signing</a>)</td></tr><tr data-v-292ee74b${_scopeId2}><td data-v-292ee74b${_scopeId2}><code data-v-292ee74b${_scopeId2}>_clientId</code></td><td data-v-292ee74b${_scopeId2}>Your application&#39;s <code data-v-292ee74b${_scopeId2}>client_id</code>, from the Trust Framework</td></tr><tr data-v-292ee74b${_scopeId2}><td data-v-292ee74b${_scopeId2}><code data-v-292ee74b${_scopeId2}>jwksUrl</code></td><td data-v-292ee74b${_scopeId2}>The LFI&#39;s JWKS URI (required for encryption only) — e.g. <code data-v-292ee74b${_scopeId2}>https://keystore.sandbox.directory.openfinance.ae/{lfi-uuid}/application.jwks</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Variable"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "kid-local")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The Key ID ("),
                            createVNode("code", null, "kid"),
                            createTextVNode(") of your signing certificate, from the Trust Framework")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "pem-local")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Your signing private key in PEM format (PKCS#8, stripped of newlines — see "),
                            createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#prerequisites" }, "Message Signing"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "_clientId")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Your application's "),
                            createVNode("code", null, "client_id"),
                            createTextVNode(", from the Trust Framework")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jwksUrl")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The LFI's JWKS URI (required for encryption only) — e.g. "),
                            createVNode("code", null, "https://keystore.sandbox.directory.openfinance.ae/{lfi-uuid}/application.jwks")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Stripping newlines from PEM keys"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-292ee74b${_scopeId2}>Postman environment variables cannot contain literal newlines. Strip them with:</p>`);
                  _push3(ssrRenderComponent(_component_EdCode, {
                    code: stripPemCmd,
                    lang: "bash"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, "Postman environment variables cannot contain literal newlines. Strip them with:"),
                    createVNode(_component_EdCode, {
                      code: stripPemCmd,
                      lang: "bash"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Base URL"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" All O3 Utility requests target the sandbox resource server: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
                lang: "plaintext"
              }),
              createVNode("h3", null, "Required environment variables"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Each example below references Postman environment variables. Set these before running: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Variable"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "kid-local")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The Key ID ("),
                          createVNode("code", null, "kid"),
                          createTextVNode(") of your signing certificate, from the Trust Framework")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "pem-local")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Your signing private key in PEM format (PKCS#8, stripped of newlines — see "),
                          createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#prerequisites" }, "Message Signing"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "_clientId")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Your application's "),
                          createVNode("code", null, "client_id"),
                          createTextVNode(", from the Trust Framework")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jwksUrl")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The LFI's JWKS URI (required for encryption only) — e.g. "),
                          createVNode("code", null, "https://keystore.sandbox.directory.openfinance.ae/{lfi-uuid}/application.jwks")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Stripping newlines from PEM keys"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "Postman environment variables cannot contain literal newlines. Strip them with:"),
                  createVNode(_component_EdCode, {
                    code: stripPemCmd,
                    lang: "bash"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-1",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Example 1",
        title: "Prepare Encrypted PII",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="o3-endpoint" data-v-292ee74b${_scopeId}><strong data-v-292ee74b${_scopeId}>Endpoint:</strong><span class="endpoint" data-v-292ee74b${_scopeId}><span class="http-method http-method--get" data-v-292ee74b${_scopeId}>GET</span><code data-v-292ee74b${_scopeId}>/o3/v1.0/message-encryption</code></span></p>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Produces an encrypted PII token (JWE) from a structured payload containing creditor and risk data. The output is stored in <code data-v-292ee74b${_scopeId2}>encryptedPII</code> and is used directly as the <code data-v-292ee74b${_scopeId2}>PersonalIdentifiableInformation</code> field in a consent&#39;s <code data-v-292ee74b${_scopeId2}>authorization_details</code>. `);
                } else {
                  return [
                    createTextVNode(" Produces an encrypted PII token (JWE) from a structured payload containing creditor and risk data. The output is stored in "),
                    createVNode("code", null, "encryptedPII"),
                    createTextVNode(" and is used directly as the "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(" field in a consent's "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This utility signs the PII payload with your private key and then encrypts it using the LFI&#39;s public encryption key (fetched from <code data-v-292ee74b${_scopeId2}>jwksUrl</code>), producing a Nested JWT (JWS wrapped inside a JWE) — exactly as described in <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-292ee74b${_scopeId2}>Message Encryption</a>. `);
                } else {
                  return [
                    createTextVNode(" This utility signs the PII payload with your private key and then encrypts it using the LFI's public encryption key (fetched from "),
                    createVNode("code", null, "jwksUrl"),
                    createTextVNode("), producing a Nested JWT (JWS wrapped inside a JWE) — exactly as described in "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Pre-request script</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Generates a PKCE code pair and sets timing claims:`);
                } else {
                  return [
                    createTextVNode("Generates a PKCE code pair and sets timing claims:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex1PreRequest,
              lang: "javascript",
              filename: "Pre-request script"
            }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Test script</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Saves the encrypted PII for use in subsequent requests:`);
                } else {
                  return [
                    createTextVNode("Saves the encrypted PII for use in subsequent requests:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex1TestScript,
              lang: "javascript",
              filename: "Test script"
            }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Request body</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex1Body,
              lang: "json",
              filename: "Request body"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-292ee74b${_scopeId2}>Output:</strong> A compact JWE string (five base64url-encoded segments separated by <code data-v-292ee74b${_scopeId2}>.</code>). Use the saved <code data-v-292ee74b${_scopeId2}>${ssrInterpolate(pmVarEncryptedPii)}</code> variable as <code data-v-292ee74b${_scopeId2}>PersonalIdentifiableInformation</code> in your consent&#39;s <code data-v-292ee74b${_scopeId2}>authorization_details</code>. `);
                } else {
                  return [
                    createVNode("strong", null, "Output:"),
                    createTextVNode(" A compact JWE string (five base64url-encoded segments separated by "),
                    createVNode("code", null, "."),
                    createTextVNode("). Use the saved "),
                    createVNode("code", null, toDisplayString(pmVarEncryptedPii)),
                    createTextVNode(" variable as "),
                    createVNode("code", null, "PersonalIdentifiableInformation"),
                    createTextVNode(" in your consent's "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-292ee74b${_scopeId2}>Message Encryption</a> for a full explanation of the JWE structure, algorithm choices, and how to produce this token in your own code. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                    createTextVNode(" for a full explanation of the JWE structure, algorithm choices, and how to produce this token in your own code. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "o3-endpoint" }, [
                createVNode("strong", null, "Endpoint:"),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/o3/v1.0/message-encryption")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Produces an encrypted PII token (JWE) from a structured payload containing creditor and risk data. The output is stored in "),
                  createVNode("code", null, "encryptedPII"),
                  createTextVNode(" and is used directly as the "),
                  createVNode("code", null, "PersonalIdentifiableInformation"),
                  createTextVNode(" field in a consent's "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This utility signs the PII payload with your private key and then encrypts it using the LFI's public encryption key (fetched from "),
                  createVNode("code", null, "jwksUrl"),
                  createTextVNode("), producing a Nested JWT (JWS wrapped inside a JWE) — exactly as described in "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Pre-request script"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Generates a PKCE code pair and sets timing claims:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex1PreRequest,
                lang: "javascript",
                filename: "Pre-request script"
              }),
              createVNode("h4", null, "Test script"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Saves the encrypted PII for use in subsequent requests:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex1TestScript,
                lang: "javascript",
                filename: "Test script"
              }),
              createVNode("h4", null, "Request body"),
              createVNode(_component_EdCode, {
                code: ex1Body,
                lang: "json",
                filename: "Request body"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Output:"),
                  createTextVNode(" A compact JWE string (five base64url-encoded segments separated by "),
                  createVNode("code", null, "."),
                  createTextVNode("). Use the saved "),
                  createVNode("code", null, toDisplayString(pmVarEncryptedPii)),
                  createTextVNode(" variable as "),
                  createVNode("code", null, "PersonalIdentifiableInformation"),
                  createTextVNode(" in your consent's "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                  createTextVNode(" for a full explanation of the JWE structure, algorithm choices, and how to produce this token in your own code. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-2",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Example 2",
        title: "Prepare private key JWT for PAR endpoint",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="o3-endpoint" data-v-292ee74b${_scopeId}><strong data-v-292ee74b${_scopeId}>Endpoint:</strong><span class="endpoint" data-v-292ee74b${_scopeId}><span class="http-method http-method--get" data-v-292ee74b${_scopeId}>GET</span><code data-v-292ee74b${_scopeId}>/o3/v1.0/message-signature</code></span></p>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Produces a <strong data-v-292ee74b${_scopeId2}>Client Assertion JWT</strong> for use as <code data-v-292ee74b${_scopeId2}>client_assertion</code> when calling <code data-v-292ee74b${_scopeId2}>/par</code>. The client assertion proves your application&#39;s identity to the Authorization Server without a shared secret — it is signed with your private key and verified by the LFI using your public key from the Trust Framework JWKS. `);
                } else {
                  return [
                    createTextVNode(" Produces a "),
                    createVNode("strong", null, "Client Assertion JWT"),
                    createTextVNode(" for use as "),
                    createVNode("code", null, "client_assertion"),
                    createTextVNode(" when calling "),
                    createVNode("code", null, "/par"),
                    createTextVNode(". The client assertion proves your application's identity to the Authorization Server without a shared secret — it is signed with your private key and verified by the LFI using your public key from the Trust Framework JWKS. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Pre-request script</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Sets timing claims:`);
                } else {
                  return [
                    createTextVNode("Sets timing claims:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex2PreRequest,
              lang: "javascript",
              filename: "Pre-request script"
            }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Test script</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Saves the client assertion for use in the PAR request:`);
                } else {
                  return [
                    createTextVNode("Saves the client assertion for use in the PAR request:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex2TestScript,
              lang: "javascript",
              filename: "Test script"
            }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Request body</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex2Body,
              lang: "json",
              filename: "Request body"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-292ee74b${_scopeId2}>Output:</strong> A compact JWS string. Pass it as <code data-v-292ee74b${_scopeId2}>client_assertion</code> in your <code data-v-292ee74b${_scopeId2}>/par</code> request body, alongside <code data-v-292ee74b${_scopeId2}>client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>. `);
                } else {
                  return [
                    createVNode("strong", null, "Output:"),
                    createTextVNode(" A compact JWS string. Pass it as "),
                    createVNode("code", null, "client_assertion"),
                    createTextVNode(" in your "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request body, alongside "),
                    createVNode("code", null, "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex2ParRequest,
              lang: "http",
              filename: "POST /par"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-292ee74b${_scopeId2}>Client Assertion</a> for the full claim set requirements and <a href="/tech/tpp-standards/security/fapi/message-signing" data-v-292ee74b${_scopeId2}>Message Signing</a> for how to produce this token in your own code. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                    createTextVNode(" for the full claim set requirements and "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                    createTextVNode(" for how to produce this token in your own code. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "o3-endpoint" }, [
                createVNode("strong", null, "Endpoint:"),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/o3/v1.0/message-signature")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Produces a "),
                  createVNode("strong", null, "Client Assertion JWT"),
                  createTextVNode(" for use as "),
                  createVNode("code", null, "client_assertion"),
                  createTextVNode(" when calling "),
                  createVNode("code", null, "/par"),
                  createTextVNode(". The client assertion proves your application's identity to the Authorization Server without a shared secret — it is signed with your private key and verified by the LFI using your public key from the Trust Framework JWKS. ")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Pre-request script"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Sets timing claims:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex2PreRequest,
                lang: "javascript",
                filename: "Pre-request script"
              }),
              createVNode("h4", null, "Test script"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Saves the client assertion for use in the PAR request:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex2TestScript,
                lang: "javascript",
                filename: "Test script"
              }),
              createVNode("h4", null, "Request body"),
              createVNode(_component_EdCode, {
                code: ex2Body,
                lang: "json",
                filename: "Request body"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Output:"),
                  createTextVNode(" A compact JWS string. Pass it as "),
                  createVNode("code", null, "client_assertion"),
                  createTextVNode(" in your "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" request body, alongside "),
                  createVNode("code", null, "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex2ParRequest,
                lang: "http",
                filename: "POST /par"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                  createTextVNode(" for the full claim set requirements and "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                  createTextVNode(" for how to produce this token in your own code. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-3",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Example 3",
        title: "Prepare private key JWT for /token",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="o3-endpoint" data-v-292ee74b${_scopeId}><strong data-v-292ee74b${_scopeId}>Endpoint:</strong><span class="endpoint" data-v-292ee74b${_scopeId}><span class="http-method http-method--get" data-v-292ee74b${_scopeId}>GET</span><code data-v-292ee74b${_scopeId}>/o3/v1.0/message-signature</code></span></p>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Produces the same <strong data-v-292ee74b${_scopeId2}>Client Assertion JWT</strong> as Example 2, but intended for use at the <code data-v-292ee74b${_scopeId2}>/token</code> endpoint — for exchanging an authorization code for tokens, refreshing an access token, or obtaining a client credentials token. A fresh assertion with a new <code data-v-292ee74b${_scopeId2}>jti</code> must be generated for every request. `);
                } else {
                  return [
                    createTextVNode(" Produces the same "),
                    createVNode("strong", null, "Client Assertion JWT"),
                    createTextVNode(" as Example 2, but intended for use at the "),
                    createVNode("code", null, "/token"),
                    createTextVNode(" endpoint — for exchanging an authorization code for tokens, refreshing an access token, or obtaining a client credentials token. A fresh assertion with a new "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" must be generated for every request. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Pre-request script</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex2PreRequest,
              lang: "javascript",
              filename: "Pre-request script"
            }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Test script</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex2TestScript,
              lang: "javascript",
              filename: "Test script"
            }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Request body</h4>`);
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex2Body,
              lang: "json",
              filename: "Request body"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-292ee74b${_scopeId2}>Output:</strong> A compact JWS string. Pass it as <code data-v-292ee74b${_scopeId2}>client_assertion</code> in your <code data-v-292ee74b${_scopeId2}>/token</code> request body: `);
                } else {
                  return [
                    createVNode("strong", null, "Output:"),
                    createTextVNode(" A compact JWS string. Pass it as "),
                    createVNode("code", null, "client_assertion"),
                    createTextVNode(" in your "),
                    createVNode("code", null, "/token"),
                    createTextVNode(" request body: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex3TokenRequest,
              lang: "http",
              filename: "POST /token"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "One assertion per request"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-292ee74b${_scopeId2}> The <code data-v-292ee74b${_scopeId2}>jti</code> claim must be a fresh UUID on every call. The Authorization Server tracks seen <code data-v-292ee74b${_scopeId2}>jti</code> values and will reject replayed assertions. Postman&#39;s <code data-v-292ee74b${_scopeId2}>${ssrInterpolate(pmVarGuid)}</code> variable generates a new UUID on each request automatically. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("code", null, "jti"),
                      createTextVNode(" claim must be a fresh UUID on every call. The Authorization Server tracks seen "),
                      createVNode("code", null, "jti"),
                      createTextVNode(" values and will reject replayed assertions. Postman's "),
                      createVNode("code", null, toDisplayString(pmVarGuid)),
                      createTextVNode(" variable generates a new UUID on each request automatically. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-292ee74b${_scopeId2}>Client Assertion</a> for the full claim set and <a href="/tech/tpp-standards/security/fapi/message-signing" data-v-292ee74b${_scopeId2}>Message Signing</a> for code examples. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                    createTextVNode(" for the full claim set and "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                    createTextVNode(" for code examples. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "o3-endpoint" }, [
                createVNode("strong", null, "Endpoint:"),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/o3/v1.0/message-signature")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Produces the same "),
                  createVNode("strong", null, "Client Assertion JWT"),
                  createTextVNode(" as Example 2, but intended for use at the "),
                  createVNode("code", null, "/token"),
                  createTextVNode(" endpoint — for exchanging an authorization code for tokens, refreshing an access token, or obtaining a client credentials token. A fresh assertion with a new "),
                  createVNode("code", null, "jti"),
                  createTextVNode(" must be generated for every request. ")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Pre-request script"),
              createVNode(_component_EdCode, {
                code: ex2PreRequest,
                lang: "javascript",
                filename: "Pre-request script"
              }),
              createVNode("h4", null, "Test script"),
              createVNode(_component_EdCode, {
                code: ex2TestScript,
                lang: "javascript",
                filename: "Test script"
              }),
              createVNode("h4", null, "Request body"),
              createVNode(_component_EdCode, {
                code: ex2Body,
                lang: "json",
                filename: "Request body"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Output:"),
                  createTextVNode(" A compact JWS string. Pass it as "),
                  createVNode("code", null, "client_assertion"),
                  createTextVNode(" in your "),
                  createVNode("code", null, "/token"),
                  createTextVNode(" request body: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex3TokenRequest,
                lang: "http",
                filename: "POST /token"
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "One assertion per request"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" claim must be a fresh UUID on every call. The Authorization Server tracks seen "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" values and will reject replayed assertions. Postman's "),
                    createVNode("code", null, toDisplayString(pmVarGuid)),
                    createTextVNode(" variable generates a new UUID on each request automatically. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                  createTextVNode(" for the full claim set and "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                  createTextVNode(" for code examples. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-4",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Example 4",
        title: "Prepare request object JWT for PAR endpoint",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="o3-endpoint" data-v-292ee74b${_scopeId}><strong data-v-292ee74b${_scopeId}>Endpoint:</strong><span class="endpoint" data-v-292ee74b${_scopeId}><span class="http-method http-method--get" data-v-292ee74b${_scopeId}>GET</span><code data-v-292ee74b${_scopeId}>/o3/v1.0/message-signature</code></span></p>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Produces a <strong data-v-292ee74b${_scopeId2}>signed Request Object JWT</strong> (JWS) for use as the <code data-v-292ee74b${_scopeId2}>request</code> parameter in a <code data-v-292ee74b${_scopeId2}>/par</code> call. The request object contains the full authorization intent — scope, PKCE code challenge, <code data-v-292ee74b${_scopeId2}>redirect_uri</code>, and <code data-v-292ee74b${_scopeId2}>authorization_details</code> — signed with your private key so the Authorization Server can verify it has not been tampered with. `);
                } else {
                  return [
                    createTextVNode(" Produces a "),
                    createVNode("strong", null, "signed Request Object JWT"),
                    createTextVNode(" (JWS) for use as the "),
                    createVNode("code", null, "request"),
                    createTextVNode(" parameter in a "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" call. The request object contains the full authorization intent — scope, PKCE code challenge, "),
                    createVNode("code", null, "redirect_uri"),
                    createTextVNode(", and "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" — signed with your private key so the Authorization Server can verify it has not been tampered with. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Pre-request script</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Generates a PKCE pair and timestamps:`);
                } else {
                  return [
                    createTextVNode("Generates a PKCE pair and timestamps:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex4PreRequest,
              lang: "javascript",
              filename: "Pre-request script"
            }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Test script</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Saves the signed request object and extracts the consent ID:`);
                } else {
                  return [
                    createTextVNode("Saves the signed request object and extracts the consent ID:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex4TestScript,
              lang: "javascript",
              filename: "Test script"
            }, null, _parent2, _scopeId));
            _push2(`<h4 data-v-292ee74b${_scopeId}>Request body</h4>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Service initiation example — adapt <code data-v-292ee74b${_scopeId2}>authorization_details</code> for your consent type: `);
                } else {
                  return [
                    createTextVNode(" Service initiation example — adapt "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" for your consent type: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: ex4Body,
              lang: "json",
              filename: "Request body"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-292ee74b${_scopeId2}>Output:</strong> A compact JWS string. Pass it as <code data-v-292ee74b${_scopeId2}>request</code> in your <code data-v-292ee74b${_scopeId2}>/par</code> request body. `);
                } else {
                  return [
                    createVNode("strong", null, "Output:"),
                    createTextVNode(" A compact JWS string. Pass it as "),
                    createVNode("code", null, "request"),
                    createTextVNode(" in your "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request body. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Run in order"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-292ee74b${_scopeId2}>For a complete payment flow, run the utilities in this order:</p><ol data-v-292ee74b${_scopeId2}><li data-v-292ee74b${_scopeId2}><strong data-v-292ee74b${_scopeId2}>Example 1</strong> — Prepare Encrypted PII → saves <code data-v-292ee74b${_scopeId2}>encryptedPII</code></li><li data-v-292ee74b${_scopeId2}><strong data-v-292ee74b${_scopeId2}>Example 2</strong> — Prepare private key JWT for PAR → saves <code data-v-292ee74b${_scopeId2}>private_key_jwt</code> (client assertion)</li><li data-v-292ee74b${_scopeId2}><strong data-v-292ee74b${_scopeId2}>Example 4</strong> — Prepare request object JWT for PAR → saves <code data-v-292ee74b${_scopeId2}>requestObject</code> (using <code data-v-292ee74b${_scopeId2}>encryptedPII</code>)</li><li data-v-292ee74b${_scopeId2}><strong data-v-292ee74b${_scopeId2}>POST /par</strong> — using <code data-v-292ee74b${_scopeId2}>requestObject</code> and <code data-v-292ee74b${_scopeId2}>private_key_jwt</code></li><li data-v-292ee74b${_scopeId2}>Redirect user to bank → receive authorization code</li><li data-v-292ee74b${_scopeId2}><strong data-v-292ee74b${_scopeId2}>Example 3</strong> — Prepare private key JWT → saves fresh <code data-v-292ee74b${_scopeId2}>private_key_jwt</code> for <code data-v-292ee74b${_scopeId2}>/token</code></li><li data-v-292ee74b${_scopeId2}><strong data-v-292ee74b${_scopeId2}>POST /token</strong> — exchange authorization code for tokens</li></ol>`);
                } else {
                  return [
                    createVNode("p", null, "For a complete payment flow, run the utilities in this order:"),
                    createVNode("ol", null, [
                      createVNode("li", null, [
                        createVNode("strong", null, "Example 1"),
                        createTextVNode(" — Prepare Encrypted PII → saves "),
                        createVNode("code", null, "encryptedPII")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Example 2"),
                        createTextVNode(" — Prepare private key JWT for PAR → saves "),
                        createVNode("code", null, "private_key_jwt"),
                        createTextVNode(" (client assertion)")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "Example 4"),
                        createTextVNode(" — Prepare request object JWT for PAR → saves "),
                        createVNode("code", null, "requestObject"),
                        createTextVNode(" (using "),
                        createVNode("code", null, "encryptedPII"),
                        createTextVNode(")")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "POST /par"),
                        createTextVNode(" — using "),
                        createVNode("code", null, "requestObject"),
                        createTextVNode(" and "),
                        createVNode("code", null, "private_key_jwt")
                      ]),
                      createVNode("li", null, "Redirect user to bank → receive authorization code"),
                      createVNode("li", null, [
                        createVNode("strong", null, "Example 3"),
                        createTextVNode(" — Prepare private key JWT → saves fresh "),
                        createVNode("code", null, "private_key_jwt"),
                        createTextVNode(" for "),
                        createVNode("code", null, "/token")
                      ]),
                      createVNode("li", null, [
                        createVNode("strong", null, "POST /token"),
                        createTextVNode(" — exchange authorization code for tokens")
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
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/message-signing" data-v-292ee74b${_scopeId2}>Message Signing</a> for how to produce signed JWTs in your own code. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                    createTextVNode(" for how to produce signed JWTs in your own code. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "o3-endpoint" }, [
                createVNode("strong", null, "Endpoint:"),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--get" }, "GET"),
                  createVNode("code", null, "/o3/v1.0/message-signature")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Produces a "),
                  createVNode("strong", null, "signed Request Object JWT"),
                  createTextVNode(" (JWS) for use as the "),
                  createVNode("code", null, "request"),
                  createTextVNode(" parameter in a "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" call. The request object contains the full authorization intent — scope, PKCE code challenge, "),
                  createVNode("code", null, "redirect_uri"),
                  createTextVNode(", and "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" — signed with your private key so the Authorization Server can verify it has not been tampered with. ")
                ]),
                _: 1
              }),
              createVNode("h4", null, "Pre-request script"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Generates a PKCE pair and timestamps:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex4PreRequest,
                lang: "javascript",
                filename: "Pre-request script"
              }),
              createVNode("h4", null, "Test script"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Saves the signed request object and extracts the consent ID:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex4TestScript,
                lang: "javascript",
                filename: "Test script"
              }),
              createVNode("h4", null, "Request body"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Service initiation example — adapt "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" for your consent type: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: ex4Body,
                lang: "json",
                filename: "Request body"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Output:"),
                  createTextVNode(" A compact JWS string. Pass it as "),
                  createVNode("code", null, "request"),
                  createTextVNode(" in your "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" request body. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Run in order"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "For a complete payment flow, run the utilities in this order:"),
                  createVNode("ol", null, [
                    createVNode("li", null, [
                      createVNode("strong", null, "Example 1"),
                      createTextVNode(" — Prepare Encrypted PII → saves "),
                      createVNode("code", null, "encryptedPII")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Example 2"),
                      createTextVNode(" — Prepare private key JWT for PAR → saves "),
                      createVNode("code", null, "private_key_jwt"),
                      createTextVNode(" (client assertion)")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Example 4"),
                      createTextVNode(" — Prepare request object JWT for PAR → saves "),
                      createVNode("code", null, "requestObject"),
                      createTextVNode(" (using "),
                      createVNode("code", null, "encryptedPII"),
                      createTextVNode(")")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "POST /par"),
                      createTextVNode(" — using "),
                      createVNode("code", null, "requestObject"),
                      createTextVNode(" and "),
                      createVNode("code", null, "private_key_jwt")
                    ]),
                    createVNode("li", null, "Redirect user to bank → receive authorization code"),
                    createVNode("li", null, [
                      createVNode("strong", null, "Example 3"),
                      createTextVNode(" — Prepare private key JWT → saves fresh "),
                      createVNode("code", null, "private_key_jwt"),
                      createTextVNode(" for "),
                      createVNode("code", null, "/token")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "POST /token"),
                      createTextVNode(" — exchange authorization code for tokens")
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                  createTextVNode(" for how to produce signed JWTs in your own code. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/o3-utils.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const o3Utils = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-292ee74b"]]);
export {
  o3Utils as default
};
