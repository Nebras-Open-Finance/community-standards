import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const wireExample = `client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJQUzI1NiIs...`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "client-assertion",
  __ssrInlineRender: true,
  setup(__props) {
    const buildAssertionTabs = [
      {
        label: "Node.js (jose)",
        lang: "typescript",
        code: `import { SignJWT, importPKCS8 } from 'jose'
import { readFileSync } from 'node:fs'
import crypto from 'node:crypto'

const ALGORITHM = 'PS256'
const KEY_ID    = process.env.SIGNING_KEY_ID!     // kid from Trust Framework
const CLIENT_ID = process.env.CLIENT_ID!           // your application's client_id
const ISSUER    = process.env.AUTHORIZATION_SERVER_ISSUER!  // from .well-known

const privateKey = await importPKCS8(
  readFileSync('./certificates/signing.key', 'utf8'),
  ALGORITHM,
)

export async function buildClientAssertion(): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({
    aud: ISSUER,                  // Authorization Server's issuer URI
    iss: CLIENT_ID,               // your client_id
    sub: CLIENT_ID,               // same as iss
    iat: now,
    exp: now + 300,               // 5-minute expiry
    jti: crypto.randomUUID(),     // fresh UUID per assertion
  })
    .setProtectedHeader({ alg: ALGORITHM, kid: KEY_ID })
    .sign(privateKey)
}`
      },
      {
        label: "Python (PyJWT)",
        lang: "python",
        code: `import os
import time
import uuid
import jwt
from cryptography.hazmat.primitives.serialization import load_pem_private_key

ALGORITHM = "PS256"
KEY_ID    = os.environ["SIGNING_KEY_ID"]              # kid from Trust Framework
CLIENT_ID = os.environ["CLIENT_ID"]                    # your application's client_id
ISSUER    = os.environ["AUTHORIZATION_SERVER_ISSUER"]  # from .well-known

with open("./certificates/signing.key", "rb") as f:
    private_key = load_pem_private_key(f.read(), password=None)

def build_client_assertion() -> str:
    now = int(time.time())
    claims = {
        "aud": ISSUER,            # Authorization Server's issuer URI
        "iss": CLIENT_ID,         # your client_id
        "sub": CLIENT_ID,         # same as iss
        "iat": now,
        "exp": now + 300,         # 5-minute expiry
        "jti": str(uuid.uuid4()), # fresh UUID per assertion
    }
    return jwt.encode(
        claims,
        private_key,
        algorithm=ALGORITHM,
        headers={"kid": KEY_ID},
    )`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-76a8fe1f><section class="ed-doc__hero" data-v-76a8fe1f><div class="ed-doc__inner" data-v-76a8fe1f><div class="ed-doc__eyebrow" data-v-76a8fe1f><span class="ed-doc__eyebrow-dash" data-v-76a8fe1f></span> Security · OAuth 2.0 · Client authentication </div><h1 class="ed-doc__title" data-v-76a8fe1f> Client Assertion <span class="ed-doc__read" data-v-76a8fe1f>2 min read</span></h1><p class="ed-doc__lede" data-v-76a8fe1f> A <strong data-v-76a8fe1f>client assertion</strong> is a short-lived, signed JWT that your application presents to the Authorization Server to prove its identity. It takes the place of a static client secret, providing a stronger and more auditable form of client authentication. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-76a8fe1f> Because each assertion is signed with your application&#39;s private key, the Authorization Server can verify it using your public key from the Trust Framework — without any shared secret ever leaving your system. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "where-used",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Where it's used",
        title: "Two endpoints require a client assertion",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`In UAE Open Finance, a client assertion is required on two endpoints:`);
                } else {
                  return [
                    createTextVNode("In UAE Open Finance, a client assertion is required on two endpoints:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-76a8fe1f${_scopeId2}><thead data-v-76a8fe1f${_scopeId2}><tr data-v-76a8fe1f${_scopeId2}><th data-v-76a8fe1f${_scopeId2}>Endpoint</th><th data-v-76a8fe1f${_scopeId2}>Use</th></tr></thead><tbody data-v-76a8fe1f${_scopeId2}><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><a href="/tech/tpp-standards/security/tokens/open-api/token" data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>/token</code></a></td><td data-v-76a8fe1f${_scopeId2}>Exchanging an authorisation code for tokens, refreshing an access token, or obtaining a client credentials token</td></tr><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><a href="/tech/tpp-standards/v2.1/consent/open-api/par" data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>/par</code></a></td><td data-v-76a8fe1f${_scopeId2}>Submitting a Pushed Authorization Request to initiate a consent journey</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Endpoint"),
                          createVNode("th", null, "Use")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/security/tokens/open-api/token" }, [
                              createVNode("code", null, "/token")
                            ])
                          ]),
                          createVNode("td", null, "Exchanging an authorisation code for tokens, refreshing an access token, or obtaining a client credentials token")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/open-api/par" }, [
                              createVNode("code", null, "/par")
                            ])
                          ]),
                          createVNode("td", null, "Submitting a Pushed Authorization Request to initiate a consent journey")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "One assertion per request"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-76a8fe1f${_scopeId2}> A client assertion must be freshly generated for every request. The <code data-v-76a8fe1f${_scopeId2}>jti</code> claim (a unique UUID) ensures the Authorization Server can detect and reject replayed assertions. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A client assertion must be freshly generated for every request. The "),
                      createVNode("code", null, "jti"),
                      createTextVNode(" claim (a unique UUID) ensures the Authorization Server can detect and reject replayed assertions. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Strict claim rules"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-76a8fe1f${_scopeId2}> For a complete per-claim reference — including the exact <code data-v-76a8fe1f${_scopeId2}>aud</code> value, <code data-v-76a8fe1f${_scopeId2}>jti</code> uniqueness requirements, <code data-v-76a8fe1f${_scopeId2}>exp</code>/<code data-v-76a8fe1f${_scopeId2}>iat</code> lifetime window, and a side-by-side comparison with the Request Object — see <a href="/knowledge-base/articles/jwt-claims" data-v-76a8fe1f${_scopeId2}>JWT Claim Rules</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" For a complete per-claim reference — including the exact "),
                      createVNode("code", null, "aud"),
                      createTextVNode(" value, "),
                      createVNode("code", null, "jti"),
                      createTextVNode(" uniqueness requirements, "),
                      createVNode("code", null, "exp"),
                      createTextVNode("/"),
                      createVNode("code", null, "iat"),
                      createTextVNode(" lifetime window, and a side-by-side comparison with the Request Object — see "),
                      createVNode("a", { href: "/knowledge-base/articles/jwt-claims" }, "JWT Claim Rules"),
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
                  createTextVNode("In UAE Open Finance, a client assertion is required on two endpoints:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Endpoint"),
                        createVNode("th", null, "Use")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/security/tokens/open-api/token" }, [
                            createVNode("code", null, "/token")
                          ])
                        ]),
                        createVNode("td", null, "Exchanging an authorisation code for tokens, refreshing an access token, or obtaining a client credentials token")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/open-api/par" }, [
                            createVNode("code", null, "/par")
                          ])
                        ]),
                        createVNode("td", null, "Submitting a Pushed Authorization Request to initiate a consent journey")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "One assertion per request"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A client assertion must be freshly generated for every request. The "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" claim (a unique UUID) ensures the Authorization Server can detect and reject replayed assertions. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Strict claim rules"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" For a complete per-claim reference — including the exact "),
                    createVNode("code", null, "aud"),
                    createTextVNode(" value, "),
                    createVNode("code", null, "jti"),
                    createTextVNode(" uniqueness requirements, "),
                    createVNode("code", null, "exp"),
                    createTextVNode("/"),
                    createVNode("code", null, "iat"),
                    createTextVNode(" lifetime window, and a side-by-side comparison with the Request Object — see "),
                    createVNode("a", { href: "/knowledge-base/articles/jwt-claims" }, "JWT Claim Rules"),
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
        id: "header",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Structure — Header",
        title: "JOSE header — algorithm and signing key identifier",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The client assertion is a signed JWT composed of a header and a set of claims.`);
                } else {
                  return [
                    createTextVNode("The client assertion is a signed JWT composed of a header and a set of claims.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-76a8fe1f${_scopeId2}><thead data-v-76a8fe1f${_scopeId2}><tr data-v-76a8fe1f${_scopeId2}><th data-v-76a8fe1f${_scopeId2}>Field</th><th data-v-76a8fe1f${_scopeId2}>Value</th><th data-v-76a8fe1f${_scopeId2}>Description</th></tr></thead><tbody data-v-76a8fe1f${_scopeId2}><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>alg</code></td><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>PS256</code></td><td data-v-76a8fe1f${_scopeId2}>The only algorithm supported by the UAE Open Finance FAPI profile</td></tr><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>kid</code></td><td data-v-76a8fe1f${_scopeId2}>string</td><td data-v-76a8fe1f${_scopeId2}>Key ID of your signing certificate, as registered in the Trust Framework</td></tr></tbody></table>`);
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
                          createVNode("td", null, "The only algorithm supported by the UAE Open Finance FAPI profile")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "kid")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Key ID of your signing certificate, as registered in the Trust Framework")
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
                  createTextVNode("The client assertion is a signed JWT composed of a header and a set of claims.")
                ]),
                _: 1
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
                        createVNode("td", null, "The only algorithm supported by the UAE Open Finance FAPI profile")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "kid")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Key ID of your signing certificate, as registered in the Trust Framework")
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
        id: "claims",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Structure — Claims",
        title: "Identity, audience, and short-lived timing claims",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-76a8fe1f${_scopeId2}><thead data-v-76a8fe1f${_scopeId2}><tr data-v-76a8fe1f${_scopeId2}><th data-v-76a8fe1f${_scopeId2}>Claim</th><th data-v-76a8fe1f${_scopeId2}>Description</th><th data-v-76a8fe1f${_scopeId2}>Example</th></tr></thead><tbody data-v-76a8fe1f${_scopeId2}><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>aud</code></td><td data-v-76a8fe1f${_scopeId2}>The Authorization Server&#39;s issuer URI — obtained from the <a href="/tech/tpp-standards/trust-framework/well-known" data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>.well-known</code></a> discovery endpoint</td><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>https://auth.[LFICode].apihub.openfinance.ae</code></td></tr><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>iss</code></td><td data-v-76a8fe1f${_scopeId2}>Your application&#39;s <code data-v-76a8fe1f${_scopeId2}>client_id</code> from the Trust Framework</td><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>a1b2c3d4-...</code></td></tr><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>sub</code></td><td data-v-76a8fe1f${_scopeId2}>Same as <code data-v-76a8fe1f${_scopeId2}>iss</code> — your <code data-v-76a8fe1f${_scopeId2}>client_id</code></td><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>a1b2c3d4-...</code></td></tr><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>iat</code></td><td data-v-76a8fe1f${_scopeId2}>Unix timestamp of when the JWT was issued</td><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>1713196123</code></td></tr><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>exp</code></td><td data-v-76a8fe1f${_scopeId2}>Unix timestamp when the JWT expires. Keep this short — 5 minutes is standard</td><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>1713196423</code></td></tr><tr data-v-76a8fe1f${_scopeId2}><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>jti</code></td><td data-v-76a8fe1f${_scopeId2}>A unique identifier (UUID) for this assertion. Prevents replay attacks</td><td data-v-76a8fe1f${_scopeId2}><code data-v-76a8fe1f${_scopeId2}>f47ac10b-58cc-...</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Claim"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "aud")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The Authorization Server's issuer URI — obtained from the "),
                            createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known" }, [
                              createVNode("code", null, ".well-known")
                            ]),
                            createTextVNode(" discovery endpoint")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://auth.[LFICode].apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Your application's "),
                            createVNode("code", null, "client_id"),
                            createTextVNode(" from the Trust Framework")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "a1b2c3d4-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "sub")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Same as "),
                            createVNode("code", null, "iss"),
                            createTextVNode(" — your "),
                            createVNode("code", null, "client_id")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "a1b2c3d4-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iat")
                          ]),
                          createVNode("td", null, "Unix timestamp of when the JWT was issued"),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196123")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "exp")
                          ]),
                          createVNode("td", null, "Unix timestamp when the JWT expires. Keep this short — 5 minutes is standard"),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196423")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jti")
                          ]),
                          createVNode("td", null, "A unique identifier (UUID) for this assertion. Prevents replay attacks"),
                          createVNode("td", null, [
                            createVNode("code", null, "f47ac10b-58cc-...")
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
              title: "Keep assertions short-lived"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-76a8fe1f${_scopeId2}> Set <code data-v-76a8fe1f${_scopeId2}>exp</code> to no more than 5 minutes after <code data-v-76a8fe1f${_scopeId2}>iat</code>. Long-lived assertions increase the window of exposure if intercepted. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Set "),
                      createVNode("code", null, "exp"),
                      createTextVNode(" to no more than 5 minutes after "),
                      createVNode("code", null, "iat"),
                      createTextVNode(". Long-lived assertions increase the window of exposure if intercepted. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Testing client assertions on the sandbox"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-76a8fe1f${_scopeId2}> The sandbox provides <strong data-v-76a8fe1f${_scopeId2}>O3 Utility endpoints</strong> that accept your private key and return a ready-made client assertion JWT — useful for confirming your key setup is correct before writing your own signing code. See <a href="/tech/tpp-standards/security/fapi/o3-utils#example-2-o3-util-prepare-private-key-jwt-for-par-end-point" data-v-76a8fe1f${_scopeId2}>O3 Sandbox Utilities</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The sandbox provides "),
                      createVNode("strong", null, "O3 Utility endpoints"),
                      createTextVNode(" that accept your private key and return a ready-made client assertion JWT — useful for confirming your key setup is correct before writing your own signing code. See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils#example-2-o3-util-prepare-private-key-jwt-for-par-end-point" }, "O3 Sandbox Utilities"),
                      createTextVNode(". ")
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
                        createVNode("th", null, "Claim"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "aud")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The Authorization Server's issuer URI — obtained from the "),
                          createVNode("a", { href: "/tech/tpp-standards/trust-framework/well-known" }, [
                            createVNode("code", null, ".well-known")
                          ]),
                          createTextVNode(" discovery endpoint")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://auth.[LFICode].apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Your application's "),
                          createVNode("code", null, "client_id"),
                          createTextVNode(" from the Trust Framework")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "a1b2c3d4-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "sub")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Same as "),
                          createVNode("code", null, "iss"),
                          createTextVNode(" — your "),
                          createVNode("code", null, "client_id")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "a1b2c3d4-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iat")
                        ]),
                        createVNode("td", null, "Unix timestamp of when the JWT was issued"),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196123")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "exp")
                        ]),
                        createVNode("td", null, "Unix timestamp when the JWT expires. Keep this short — 5 minutes is standard"),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196423")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jti")
                        ]),
                        createVNode("td", null, "A unique identifier (UUID) for this assertion. Prevents replay attacks"),
                        createVNode("td", null, [
                          createVNode("code", null, "f47ac10b-58cc-...")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Keep assertions short-lived"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Set "),
                    createVNode("code", null, "exp"),
                    createTextVNode(" to no more than 5 minutes after "),
                    createVNode("code", null, "iat"),
                    createTextVNode(". Long-lived assertions increase the window of exposure if intercepted. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Testing client assertions on the sandbox"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The sandbox provides "),
                    createVNode("strong", null, "O3 Utility endpoints"),
                    createTextVNode(" that accept your private key and return a ready-made client assertion JWT — useful for confirming your key setup is correct before writing your own signing code. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/o3-utils#example-2-o3-util-prepare-private-key-jwt-for-par-end-point" }, "O3 Sandbox Utilities"),
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
        id: "signing",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Signing the Assertion",
        title: "Assemble the claims and sign as a JWS using PS256",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Once the header and claims are assembled, sign the JWT as a JWS using the <code data-v-76a8fe1f${_scopeId2}>PS256</code> algorithm and your private signing key. `);
                } else {
                  return [
                    createTextVNode(" Once the header and claims are assembled, sign the JWT as a JWS using the "),
                    createVNode("code", null, "PS256"),
                    createTextVNode(" algorithm and your private signing key. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: buildAssertionTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Send the resulting string in the <code data-v-76a8fe1f${_scopeId2}>client_assertion</code> form parameter alongside <code data-v-76a8fe1f${_scopeId2}>client_assertion_type</code> when calling <code data-v-76a8fe1f${_scopeId2}>/par</code> or <code data-v-76a8fe1f${_scopeId2}>/token</code>: `);
                } else {
                  return [
                    createTextVNode(" Send the resulting string in the "),
                    createVNode("code", null, "client_assertion"),
                    createTextVNode(" form parameter alongside "),
                    createVNode("code", null, "client_assertion_type"),
                    createTextVNode(" when calling "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" or "),
                    createVNode("code", null, "/token"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: wireExample,
              lang: "plaintext",
              filename: "application/x-www-form-urlencoded body"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/message-signing" data-v-76a8fe1f${_scopeId2}>Message Signing (JWS)</a> for the underlying signing helper and additional context on how the signature is produced. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing (JWS)"),
                    createTextVNode(" for the underlying signing helper and additional context on how the signature is produced. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Once the header and claims are assembled, sign the JWT as a JWS using the "),
                  createVNode("code", null, "PS256"),
                  createTextVNode(" algorithm and your private signing key. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: buildAssertionTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Send the resulting string in the "),
                  createVNode("code", null, "client_assertion"),
                  createTextVNode(" form parameter alongside "),
                  createVNode("code", null, "client_assertion_type"),
                  createTextVNode(" when calling "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" or "),
                  createVNode("code", null, "/token"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: wireExample,
                lang: "plaintext",
                filename: "application/x-www-form-urlencoded body"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing (JWS)"),
                  createTextVNode(" for the underlying signing helper and additional context on how the signature is produced. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/tokens/client-assertion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const clientAssertion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-76a8fe1f"]]);
export {
  clientAssertion as default
};
