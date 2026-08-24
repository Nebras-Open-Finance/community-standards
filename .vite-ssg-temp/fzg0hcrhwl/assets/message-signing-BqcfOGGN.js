import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
const headerJson = `{
  "alg": "PS256",
  "kid": "<your-signing-key-id>"
}`;
const compactSerialization = `base64url(header) . base64url(payload) . base64url(signature)`;
const stripPemCode = `awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' signing.key`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "message-signing",
  __ssrInlineRender: true,
  setup(__props) {
    const signTabs = [
      {
        label: "Node.js (jose)",
        lang: "typescript",
        code: `import { SignJWT, importPKCS8 } from 'jose'
import { readFileSync } from 'node:fs'

const ALGORITHM = 'PS256'
const KEY_ID = process.env.SIGNING_KEY_ID!      // kid from Trust Framework
const CLIENT_ID = process.env.CLIENT_ID!          // your application's client_id
const ISSUER = process.env.AUTHORIZATION_SERVER_ISSUER! // from .well-known

const privateKeyPem = readFileSync('./certificates/signing.key', 'utf8')
const privateKey = await importPKCS8(privateKeyPem, ALGORITHM)

/**
 * Sign a payload as a FAPI-compliant JWS.
 * Caller provides the domain-specific claims; timing claims are added automatically.
 */
export async function signJWT(
  claims: Record<string, unknown>,
  expiresInSeconds = 300
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({
    ...claims,
    iat: now,
    nbf: now - 10,       // 10-second clock skew buffer
    exp: now + expiresInSeconds,
  })
    .setProtectedHeader({ alg: ALGORITHM, kid: KEY_ID })
    .sign(privateKey)
}`
      },
      {
        label: "Python (PyJWT)",
        lang: "python",
        code: `import jwt
import time
import uuid
from cryptography.hazmat.primitives.serialization import load_pem_private_key

ALGORITHM = "PS256"
KEY_ID = "your-signing-key-id"          # kid from Trust Framework
CLIENT_ID = "your-client-id"
ISSUER = "https://auth.[lfi].apihub.openfinance.ae"

with open("./certificates/signing.key", "rb") as f:
    private_key = load_pem_private_key(f.read(), password=None)

def sign_jwt(claims: dict, expires_in: int = 300) -> str:
    now = int(time.time())
    payload = {
        **claims,
        "iat": now,
        "nbf": now - 10,
        "exp": now + expires_in,
    }
    return jwt.encode(
        payload,
        private_key,
        algorithm=ALGORITHM,
        headers={"kid": KEY_ID},
    )`
      }
    ];
    const verifyTabs = [
      {
        label: "Node.js (jose)",
        lang: "typescript",
        code: `import { jwtVerify, createRemoteJWKSet } from 'jose'

const JWKS = createRemoteJWKSet(
  new URL('https://keystore.directory.openfinance.ae/[your-org-id]/application.jwks')
)

const { payload, protectedHeader } = await jwtVerify(token, JWKS, {
  algorithms: ['PS256'],
})`
      },
      {
        label: "Python (PyJWT)",
        lang: "python",
        code: `import jwt
from jwt import PyJWKClient

JWKS_URL = "https://keystore.directory.openfinance.ae/[your-org-id]/application.jwks"

jwks_client = PyJWKClient(JWKS_URL)
signing_key = jwks_client.get_signing_key_from_jwt(token)

payload = jwt.decode(
    token,
    signing_key.key,
    algorithms=["PS256"],
)`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-dc99a0e8><section class="ed-doc__hero" data-v-dc99a0e8><div class="ed-doc__inner" data-v-dc99a0e8><div class="ed-doc__eyebrow" data-v-dc99a0e8><span class="ed-doc__eyebrow-dash" data-v-dc99a0e8></span> Security · FAPI · JWS </div><h1 class="ed-doc__title" data-v-dc99a0e8> Message Signing (JWS) <span class="ed-doc__read" data-v-dc99a0e8>2 min read</span></h1><p class="ed-doc__lede" data-v-dc99a0e8> A <strong data-v-dc99a0e8>JWS</strong> (JSON Web Signature — <a href="https://datatracker.ietf.org/doc/html/rfc7515" data-v-dc99a0e8>RFC 7515</a>) is the cryptographic mechanism that signs a JSON payload to prove two things: </p><ul class="ed-doc__bullets" data-v-dc99a0e8><li data-v-dc99a0e8><strong data-v-dc99a0e8>Authenticity</strong> — it genuinely came from the holder of the private key</li><li data-v-dc99a0e8><strong data-v-dc99a0e8>Integrity</strong> — the content has not been modified since it was signed</li></ul><p class="ed-doc__lede ed-doc__lede--tight" data-v-dc99a0e8> In UAE Open Finance, signing is required whenever your application sends a JWT to an Authorization Server: </p><ul class="ed-doc__bullets" data-v-dc99a0e8><li data-v-dc99a0e8>The <strong data-v-dc99a0e8>Request Object</strong> sent to <a href="/tech/tpp-standards/v2.1/consent/open-api/par" data-v-dc99a0e8><code data-v-dc99a0e8>/par</code></a></li><li data-v-dc99a0e8>The <strong data-v-dc99a0e8>Client Assertion</strong> sent to <a href="/tech/tpp-standards/security/tokens/open-api/token" data-v-dc99a0e8><code data-v-dc99a0e8>/token</code></a></li></ul></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "structure",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Structure of a Signed JWT",
        title: "Three base64url parts joined by dots",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A signed JWT consists of three base64url-encoded parts joined by <code data-v-dc99a0e8${_scopeId2}>.</code>:`);
                } else {
                  return [
                    createTextVNode("A signed JWT consists of three base64url-encoded parts joined by "),
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
                  createTextVNode("A signed JWT consists of three base64url-encoded parts joined by "),
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
        title: "Algorithm and signing key identifier",
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
                  _push3(`<table data-v-dc99a0e8${_scopeId2}><thead data-v-dc99a0e8${_scopeId2}><tr data-v-dc99a0e8${_scopeId2}><th data-v-dc99a0e8${_scopeId2}>Field</th><th data-v-dc99a0e8${_scopeId2}>Value</th><th data-v-dc99a0e8${_scopeId2}>Description</th></tr></thead><tbody data-v-dc99a0e8${_scopeId2}><tr data-v-dc99a0e8${_scopeId2}><td data-v-dc99a0e8${_scopeId2}><code data-v-dc99a0e8${_scopeId2}>alg</code></td><td data-v-dc99a0e8${_scopeId2}><code data-v-dc99a0e8${_scopeId2}>PS256</code></td><td data-v-dc99a0e8${_scopeId2}>RSA-PSS with SHA-256. The only algorithm supported by the UAE Open Finance FAPI profile</td></tr><tr data-v-dc99a0e8${_scopeId2}><td data-v-dc99a0e8${_scopeId2}><code data-v-dc99a0e8${_scopeId2}>kid</code></td><td data-v-dc99a0e8${_scopeId2}>string</td><td data-v-dc99a0e8${_scopeId2}>The Key ID of your signing certificate, as registered in the Trust Framework</td></tr></tbody></table>`);
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
                            createVNode("code", null, "PS256")
                          ]),
                          createVNode("td", null, "RSA-PSS with SHA-256. The only algorithm supported by the UAE Open Finance FAPI profile")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "kid")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "The Key ID of your signing certificate, as registered in the Trust Framework")
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
                  _push3(` Your <code data-v-dc99a0e8${_scopeId2}>kid</code> is assigned by the Trust Framework when your signing certificate is issued. Find it on the certificate detail page: Application → App Certificates → select the certificate. See <a href="/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid" data-v-dc99a0e8${_scopeId2}>Finding Your Key ID</a> for a screenshot. `);
                } else {
                  return [
                    createTextVNode(" Your "),
                    createVNode("code", null, "kid"),
                    createTextVNode(" is assigned by the Trust Framework when your signing certificate is issued. Find it on the certificate detail page: Application → App Certificates → select the certificate. See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid" }, "Finding Your Key ID"),
                    createTextVNode(" for a screenshot. ")
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
                          createVNode("code", null, "PS256")
                        ]),
                        createVNode("td", null, "RSA-PSS with SHA-256. The only algorithm supported by the UAE Open Finance FAPI profile")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "kid")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "The Key ID of your signing certificate, as registered in the Trust Framework")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Your "),
                  createVNode("code", null, "kid"),
                  createTextVNode(" is assigned by the Trust Framework when your signing certificate is issued. Find it on the certificate detail page: Application → App Certificates → select the certificate. See "),
                  createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid" }, "Finding Your Key ID"),
                  createTextVNode(" for a screenshot. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "payload",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Payload",
        title: "Domain claims plus FAPI-required timing claims",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The payload is a JSON object of claims. The structure depends on the use case — see <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-dc99a0e8${_scopeId2}>Request JWT</a> and <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-dc99a0e8${_scopeId2}>Client Assertion</a> for the specific claim sets. `);
                } else {
                  return [
                    createTextVNode(" The payload is a JSON object of claims. The structure depends on the use case — see "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Request JWT"),
                    createTextVNode(" and "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                    createTextVNode(" for the specific claim sets. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`All signed JWTs must include timing claims to prevent replay attacks:`);
                } else {
                  return [
                    createTextVNode("All signed JWTs must include timing claims to prevent replay attacks:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-dc99a0e8${_scopeId2}><thead data-v-dc99a0e8${_scopeId2}><tr data-v-dc99a0e8${_scopeId2}><th data-v-dc99a0e8${_scopeId2}>Claim</th><th data-v-dc99a0e8${_scopeId2}>Description</th></tr></thead><tbody data-v-dc99a0e8${_scopeId2}><tr data-v-dc99a0e8${_scopeId2}><td data-v-dc99a0e8${_scopeId2}><code data-v-dc99a0e8${_scopeId2}>iat</code></td><td data-v-dc99a0e8${_scopeId2}>Issued At — current Unix timestamp</td></tr><tr data-v-dc99a0e8${_scopeId2}><td data-v-dc99a0e8${_scopeId2}><code data-v-dc99a0e8${_scopeId2}>nbf</code></td><td data-v-dc99a0e8${_scopeId2}>Not Before — slightly before <code data-v-dc99a0e8${_scopeId2}>iat</code> to allow for clock skew (e.g. <code data-v-dc99a0e8${_scopeId2}>iat - 10</code>)</td></tr><tr data-v-dc99a0e8${_scopeId2}><td data-v-dc99a0e8${_scopeId2}><code data-v-dc99a0e8${_scopeId2}>exp</code></td><td data-v-dc99a0e8${_scopeId2}>Expiry — short-lived; typically 5 minutes (<code data-v-dc99a0e8${_scopeId2}>iat + 300</code>)</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Claim"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iat")
                          ]),
                          createVNode("td", null, "Issued At — current Unix timestamp")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nbf")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Not Before — slightly before "),
                            createVNode("code", null, "iat"),
                            createTextVNode(" to allow for clock skew (e.g. "),
                            createVNode("code", null, "iat - 10"),
                            createTextVNode(")")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "exp")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Expiry — short-lived; typically 5 minutes ("),
                            createVNode("code", null, "iat + 300"),
                            createTextVNode(")")
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
                  createTextVNode(" The payload is a JSON object of claims. The structure depends on the use case — see "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Request JWT"),
                  createTextVNode(" and "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Client Assertion"),
                  createTextVNode(" for the specific claim sets. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("All signed JWTs must include timing claims to prevent replay attacks:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Claim"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iat")
                        ]),
                        createVNode("td", null, "Issued At — current Unix timestamp")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nbf")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Not Before — slightly before "),
                          createVNode("code", null, "iat"),
                          createTextVNode(" to allow for clock skew (e.g. "),
                          createVNode("code", null, "iat - 10"),
                          createTextVNode(")")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "exp")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Expiry — short-lived; typically 5 minutes ("),
                          createVNode("code", null, "iat + 300"),
                          createTextVNode(")")
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
        id: "prerequisites",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Prerequisites",
        title: "What you need before signing",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-dc99a0e8${_scopeId2}>An <strong data-v-dc99a0e8${_scopeId2}>application registered</strong> in the Trust Framework with an appropriate role</li><li data-v-dc99a0e8${_scopeId2}>A <strong data-v-dc99a0e8${_scopeId2}>valid signing certificate</strong> and its corresponding private key</li><li data-v-dc99a0e8${_scopeId2}>The <strong data-v-dc99a0e8${_scopeId2}>Key ID</strong> (<code data-v-dc99a0e8${_scopeId2}>kid</code>) of your signing certificate from the Trust Framework</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("An "),
                      createVNode("strong", null, "application registered"),
                      createTextVNode(" in the Trust Framework with an appropriate role")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("A "),
                      createVNode("strong", null, "valid signing certificate"),
                      createTextVNode(" and its corresponding private key")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The "),
                      createVNode("strong", null, "Key ID"),
                      createTextVNode(" ("),
                      createVNode("code", null, "kid"),
                      createTextVNode(") of your signing certificate from the Trust Framework")
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
                    createTextVNode("An "),
                    createVNode("strong", null, "application registered"),
                    createTextVNode(" in the Trust Framework with an appropriate role")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("A "),
                    createVNode("strong", null, "valid signing certificate"),
                    createTextVNode(" and its corresponding private key")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The "),
                    createVNode("strong", null, "Key ID"),
                    createTextVNode(" ("),
                    createVNode("code", null, "kid"),
                    createTextVNode(") of your signing certificate from the Trust Framework")
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
        id: "signing",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "Signing a JWT",
        title: "Reusable signer for FAPI-compliant JWS",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Node.js example uses the <a href="https://github.com/panva/jose" data-v-dc99a0e8${_scopeId2}><code data-v-dc99a0e8${_scopeId2}>jose</code></a> library (available for Node.js, browsers, Deno, and Cloudflare Workers); the Python example uses <a href="https://pyjwt.readthedocs.io/en/stable/" data-v-dc99a0e8${_scopeId2}><code data-v-dc99a0e8${_scopeId2}>PyJWT</code></a>. `);
                } else {
                  return [
                    createTextVNode(" The Node.js example uses the "),
                    createVNode("a", { href: "https://github.com/panva/jose" }, [
                      createVNode("code", null, "jose")
                    ]),
                    createTextVNode(" library (available for Node.js, browsers, Deno, and Cloudflare Workers); the Python example uses "),
                    createVNode("a", { href: "https://pyjwt.readthedocs.io/en/stable/" }, [
                      createVNode("code", null, "PyJWT")
                    ]),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: signTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Removing whitespace from PEM keys"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dc99a0e8${_scopeId2}> Some environments require the PEM key to have no line breaks when passed as an environment variable. Strip them with: </p>`);
                  _push3(ssrRenderComponent(_component_EdCode, {
                    code: stripPemCode,
                    lang: "bash",
                    filename: "bash"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("p", null, " Some environments require the PEM key to have no line breaks when passed as an environment variable. Strip them with: "),
                    createVNode(_component_EdCode, {
                      code: stripPemCode,
                      lang: "bash",
                      filename: "bash"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Testing signing on the sandbox"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-dc99a0e8${_scopeId2}> The sandbox provides <strong data-v-dc99a0e8${_scopeId2}>O3 Utility endpoints</strong> that accept your private key and return ready-made signed JWTs — useful for validating your signing setup before writing your own code. See <a href="/tech/tpp-standards/security/fapi/o3-utils" data-v-dc99a0e8${_scopeId2}>O3 Sandbox Utilities</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The sandbox provides "),
                      createVNode("strong", null, "O3 Utility endpoints"),
                      createTextVNode(" that accept your private key and return ready-made signed JWTs — useful for validating your signing setup before writing your own code. See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils" }, "O3 Sandbox Utilities"),
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
                  createTextVNode(" The Node.js example uses the "),
                  createVNode("a", { href: "https://github.com/panva/jose" }, [
                    createVNode("code", null, "jose")
                  ]),
                  createTextVNode(" library (available for Node.js, browsers, Deno, and Cloudflare Workers); the Python example uses "),
                  createVNode("a", { href: "https://pyjwt.readthedocs.io/en/stable/" }, [
                    createVNode("code", null, "PyJWT")
                  ]),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: signTabs }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Removing whitespace from PEM keys"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Some environments require the PEM key to have no line breaks when passed as an environment variable. Strip them with: "),
                  createVNode(_component_EdCode, {
                    code: stripPemCode,
                    lang: "bash",
                    filename: "bash"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Testing signing on the sandbox"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The sandbox provides "),
                    createVNode("strong", null, "O3 Utility endpoints"),
                    createTextVNode(" that accept your private key and return ready-made signed JWTs — useful for validating your signing setup before writing your own code. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils" }, "O3 Sandbox Utilities"),
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
        id: "verifying",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Verifying a Signature",
        title: "Useful for testing your own setup",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` LFIs will verify your signatures using your <strong data-v-dc99a0e8${_scopeId2}>public key</strong> fetched from your application&#39;s JWKS URI in the Trust Framework. You do not need to implement verification yourself, but it is useful for testing: `);
                } else {
                  return [
                    createTextVNode(" LFIs will verify your signatures using your "),
                    createVNode("strong", null, "public key"),
                    createTextVNode(" fetched from your application's JWKS URI in the Trust Framework. You do not need to implement verification yourself, but it is useful for testing: ")
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
                  createTextVNode(" LFIs will verify your signatures using your "),
                  createVNode("strong", null, "public key"),
                  createTextVNode(" fetched from your application's JWKS URI in the Trust Framework. You do not need to implement verification yourself, but it is useful for testing: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: verifyTabs })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/message-signing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const messageSigning = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc99a0e8"]]);
export {
  messageSigning as default
};
