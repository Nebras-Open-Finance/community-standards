import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "request-jwt",
  __ssrInlineRender: true,
  setup(__props) {
    const pkceTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `import crypto from 'node:crypto'

// Generate a cryptographically random code_verifier (43–128 chars, URL-safe)
export function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString('base64url')
}

// Derive the code_challenge (S256 = SHA-256 of the verifier, base64url-encoded)
export function deriveCodeChallenge(verifier: string): string {
  return crypto.createHash('sha256').update(verifier).digest('base64url')
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `import secrets
import hashlib
import base64

def generate_code_verifier() -> str:
    """Generate a cryptographically random code_verifier (43–128 chars, URL-safe)."""
    return base64.urlsafe_b64encode(secrets.token_bytes(32)).rstrip(b"=").decode()

def derive_code_challenge(verifier: str) -> str:
    """Derive the code_challenge (S256 = SHA-256 of the verifier, base64url-encoded)."""
    digest = hashlib.sha256(verifier.encode()).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b"=").decode()`
      }
    ];
    const buildJwtTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `import { SignJWT, importPKCS8 } from 'jose'
import { readFileSync } from 'node:fs'
import crypto from 'node:crypto'

const ALGORITHM   = 'PS256'
const KEY_ID      = process.env.SIGNING_KEY_ID!
const CLIENT_ID   = process.env.CLIENT_ID!
const ISSUER      = process.env.AUTHORIZATION_SERVER_ISSUER!  // from .well-known
const REDIRECT_URI = process.env.REDIRECT_URI!

const privateKey = await importPKCS8(
  readFileSync('./certificates/signing.key', 'utf8'),
  ALGORITHM
)

interface RequestJWTOptions {
  scope: string
  codeChallenge: string
  authorizationDetails: unknown[]
  maxAge?: number
}

export async function buildRequestJWT({
  scope,
  codeChallenge,
  authorizationDetails,
  maxAge = 3600,
}: RequestJWTOptions): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({
    // Authorization Server identity
    aud: ISSUER,

    // Client identity
    iss: CLIENT_ID,
    client_id: CLIENT_ID,

    // Authorization parameters
    scope,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',

    // PKCE
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,

    // Security
    nonce: crypto.randomUUID(),
    state: crypto.randomUUID(),
    max_age: maxAge,

    // Consent
    authorization_details: authorizationDetails,

    // Timing
    iat: now,
    nbf: now - 10,
    exp: now + 300,  // 5-minute expiry
  })
    .setProtectedHeader({ alg: ALGORITHM, kid: KEY_ID })
    .sign(privateKey)
}`
      },
      {
        label: "Python",
        lang: "python",
        code: `import os
import time
import uuid
import jwt
from cryptography.hazmat.primitives.serialization import load_pem_private_key

ALGORITHM = "PS256"
KEY_ID = os.environ["SIGNING_KEY_ID"]
CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER = os.environ["AUTHORIZATION_SERVER_ISSUER"]  # from .well-known
REDIRECT_URI = os.environ["REDIRECT_URI"]

with open("./certificates/signing.key", "rb") as f:
    private_key = load_pem_private_key(f.read(), password=None)

def build_request_jwt(
    scope: str,
    code_challenge: str,
    authorization_details: list,
    max_age: int = 3600,
) -> str:
    now = int(time.time())
    payload = {
        # Authorization Server identity
        "aud": ISSUER,

        # Client identity
        "iss": CLIENT_ID,
        "client_id": CLIENT_ID,

        # Authorization parameters
        "scope": scope,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",

        # PKCE
        "code_challenge_method": "S256",
        "code_challenge": code_challenge,

        # Security
        "nonce": str(uuid.uuid4()),
        "state": str(uuid.uuid4()),
        "max_age": max_age,

        # Consent
        "authorization_details": authorization_details,

        # Timing
        "iat": now,
        "nbf": now - 10,
        "exp": now + 300,  # 5-minute expiry
    }
    return jwt.encode(
        payload,
        private_key,
        algorithm=ALGORITHM,
        headers={"alg": ALGORITHM, "kid": KEY_ID},
    )`
      }
    ];
    const fullExampleTabs = [
      {
        label: "Node.js",
        lang: "typescript",
        code: `import { generateCodeVerifier, deriveCodeChallenge } from './pkce'
import { buildRequestJWT } from './request-jwt'

// 1. Generate PKCE pair
const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

// 2. Build the authorization_details (example: bank data sharing consent)
const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:account-access-consent:v2.1',
    consent: {
      ConsentId: crypto.randomUUID(),
      ExpirationDateTime: new Date(Date.now() + 364 * 24 * 60 * 60 * 1000).toISOString(),
      Permissions: ['ReadAccountsBasic', 'ReadBalances', 'ReadTransactionsBasic'],
      OpenFinanceBilling: {
        UserType: 'Retail',
        Purpose: 'AccountAggregation',
      },
    },
  },
]

// 3. Build and sign the Request JWT
const requestJWT = await buildRequestJWT({
  scope: 'accounts openid',
  codeChallenge,
  authorizationDetails,
})

// 4. Send to /par
// Endpoints are read from .well-known/openid-configuration —
// not constructed from the issuer URL (they live on different hosts).
const response = await fetch(discoveryDoc.pushed_authorization_request_endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ request: requestJWT }),
})
const { request_uri, expires_in } = await response.json()

// 5. Redirect the user
const authorizeUrl = new URL(discoveryDoc.authorization_endpoint)
authorizeUrl.searchParams.set('client_id', CLIENT_ID)
authorizeUrl.searchParams.set('request_uri', request_uri)
window.location.href = authorizeUrl.toString()`
      },
      {
        label: "Python",
        lang: "python",
        code: `import os
import uuid
import requests
from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode
from pkce import generate_code_verifier, derive_code_challenge
from request_jwt import build_request_jwt

CLIENT_ID = os.environ["CLIENT_ID"]

# 1. Generate PKCE pair
code_verifier = generate_code_verifier()
code_challenge = derive_code_challenge(code_verifier)

# 2. Build the authorization_details (example: bank data sharing consent)
expires_at = datetime.now(timezone.utc) + timedelta(days=364)
authorization_details = [
    {
        "type": "urn:openfinanceuae:account-access-consent:v2.1",
        "consent": {
            "ConsentId": str(uuid.uuid4()),
            "ExpirationDateTime": expires_at.isoformat(),
            "Permissions": ["ReadAccountsBasic", "ReadBalances", "ReadTransactionsBasic"],
            "OpenFinanceBilling": {
                "UserType": "Retail",
                "Purpose": "AccountAggregation",
            },
        },
    }
]

# 3. Build and sign the Request JWT
request_jwt = build_request_jwt(
    scope="accounts openid",
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)

# 4. Send to /par
# Endpoints are read from .well-known/openid-configuration —
# not constructed from the issuer URL (they live on different hosts).
response = requests.post(
    discovery_doc["pushed_authorization_request_endpoint"],
    headers={"Content-Type": "application/x-www-form-urlencoded"},
    data={"request": request_jwt},
)
request_uri = response.json()["request_uri"]

# 5. Redirect the user
authorize_url = (
    discovery_doc["authorization_endpoint"]
    + "?" + urlencode({"client_id": CLIENT_ID, "request_uri": request_uri})
)
# In a web framework, redirect to authorize_url`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ImageViewer = ImageViewer;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-6522edb3><section class="ed-doc__hero" data-v-6522edb3><div class="ed-doc__inner" data-v-6522edb3><div class="ed-doc__eyebrow" data-v-6522edb3><span class="ed-doc__eyebrow-dash" data-v-6522edb3></span> Security · FAPI · /par </div><h1 class="ed-doc__title" data-v-6522edb3> Preparing the Request JWT <span class="ed-doc__read" data-v-6522edb3>2 min read</span></h1><p class="ed-doc__lede" data-v-6522edb3> To send a <a href="/tech/tpp-standards/v2.1/consent/open-api/par" data-v-6522edb3>/par</a> request, you must first construct a signed <strong data-v-6522edb3>Request JWT</strong> (also called a Request Object or JAR — JWT Authorization Request). This JWT is a signed package of all authorization parameters, proving they came from your registered application and haven&#39;t been tampered with. </p><div class="ed-doc__hero-image" data-v-6522edb3>`);
      _push(ssrRenderComponent(_component_ImageViewer, {
        src: "/images/journeys/par_spotlight-request.png",
        alt: "Request JWT highlighted in the PAR flow"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "tip",
        title: "Strict claim rules"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-6522edb3${_scopeId}> For a precise per-claim reference covering <code data-v-6522edb3${_scopeId}>aud</code>, <code data-v-6522edb3${_scopeId}>exp</code>/<code data-v-6522edb3${_scopeId}>nbf</code> lifetime windows, clock skew, and the difference between the Request Object and Client Assertion, see <a href="/knowledge-base/articles/jwt-claims" data-v-6522edb3${_scopeId}>JWT Claim Rules</a>. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" For a precise per-claim reference covering "),
                createVNode("code", null, "aud"),
                createTextVNode(", "),
                createVNode("code", null, "exp"),
                createTextVNode("/"),
                createVNode("code", null, "nbf"),
                createTextVNode(" lifetime windows, clock skew, and the difference between the Request Object and Client Assertion, see "),
                createVNode("a", { href: "/knowledge-base/articles/jwt-claims" }, "JWT Claim Rules"),
                createTextVNode(". ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "header",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Header",
        title: "JOSE header — algorithm and signing key",
        tone: "cream"
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
                  _push3(`<table data-v-6522edb3${_scopeId2}><thead data-v-6522edb3${_scopeId2}><tr data-v-6522edb3${_scopeId2}><th data-v-6522edb3${_scopeId2}>Field</th><th data-v-6522edb3${_scopeId2}>Value</th><th data-v-6522edb3${_scopeId2}>Description</th></tr></thead><tbody data-v-6522edb3${_scopeId2}><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>alg</code></td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>PS256</code></td><td data-v-6522edb3${_scopeId2}>Signing algorithm — RSA-PSS with SHA-256</td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>kid</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>Key ID of your signing certificate, as registered in the Trust Framework</td></tr></tbody></table>`);
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
                          createVNode("td", null, "Signing algorithm — RSA-PSS with SHA-256")
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
                        createVNode("td", null, "Signing algorithm — RSA-PSS with SHA-256")
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
        id: "payload",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Payload Claims",
        title: "Authorization parameters carried inside the signed JWT",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-6522edb3${_scopeId2}><thead data-v-6522edb3${_scopeId2}><tr data-v-6522edb3${_scopeId2}><th data-v-6522edb3${_scopeId2}>Claim</th><th data-v-6522edb3${_scopeId2}>Type</th><th data-v-6522edb3${_scopeId2}>Required</th><th data-v-6522edb3${_scopeId2}>Description</th><th data-v-6522edb3${_scopeId2}>Example</th></tr></thead><tbody data-v-6522edb3${_scopeId2}><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>aud</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>The <code data-v-6522edb3${_scopeId2}>issuer</code> of the Authorization Server — found via <a href="/tech/tpp-standards/trust-framework/api-discovery" data-v-6522edb3${_scopeId2}>API Discovery</a></td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>https://auth1.[LFICode].apihub.openfinance.ae</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>iat</code></td><td data-v-6522edb3${_scopeId2}>number</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Issued At Unix timestamp — when the JWT was created</td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>1713196113</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>exp</code></td><td data-v-6522edb3${_scopeId2}>number</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Expiry as a Unix timestamp. Must be shortly after <code data-v-6522edb3${_scopeId2}>nbf</code> — maximum <strong data-v-6522edb3${_scopeId2}>5 minutes</strong></td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>1713196423</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>iss</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Your application&#39;s Client ID from the Trust Framework</td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>your-client-id</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>client_id</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Your application&#39;s Client ID (same as <code data-v-6522edb3${_scopeId2}>iss</code>)</td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>your-client-id</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>redirect_uri</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>The callback URI registered in your Trust Framework application</td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>https://yourapp.com/callback</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>scope</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Space-separated <a href="/tech/tpp-standards/security/fapi/scopes" data-v-6522edb3${_scopeId2}>OAuth 2.0 scopes</a></td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>accounts openid</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>nonce</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Random UUID — prevents replay attacks by binding the ID token to this request</td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>a1b2c3d4-...</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>state</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Random UUID — returned in the redirect; prevents CSRF attacks</td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>e5f6g7h8-...</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>nbf</code></td><td data-v-6522edb3${_scopeId2}>number</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Not Before Unix timestamp. Set slightly before <code data-v-6522edb3${_scopeId2}>iat</code> (e.g. <code data-v-6522edb3${_scopeId2}>iat - 10</code>) to allow for clock skew</td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>1713196103</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>response_type</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Must be <code data-v-6522edb3${_scopeId2}>code</code></td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>code</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>code_challenge_method</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>PKCE method — only <code data-v-6522edb3${_scopeId2}>S256</code> is supported</td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>S256</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>code_challenge</code></td><td data-v-6522edb3${_scopeId2}>string</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Base64url-encoded SHA-256 hash of your <code data-v-6522edb3${_scopeId2}>code_verifier</code></td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>E9Melhoa2Ow...</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>max_age</code></td><td data-v-6522edb3${_scopeId2}>number</td><td data-v-6522edb3${_scopeId2}></td><td data-v-6522edb3${_scopeId2}>Maximum age (seconds) of the user&#39;s existing authentication session. Capped at <code data-v-6522edb3${_scopeId2}>3600</code></td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>3600</code></td></tr><tr data-v-6522edb3${_scopeId2}><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>authorization_details</code></td><td data-v-6522edb3${_scopeId2}>array</td><td data-v-6522edb3${_scopeId2}>✓</td><td data-v-6522edb3${_scopeId2}>Describes what the user is consenting to — see <a href="/tech/tpp-standards/v2.1/consent/api-guide" data-v-6522edb3${_scopeId2}>Consent</a></td><td data-v-6522edb3${_scopeId2}><code data-v-6522edb3${_scopeId2}>[{...}]</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Claim"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "aud")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "issuer"),
                            createTextVNode(" of the Authorization Server — found via "),
                            createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://auth1.[LFICode].apihub.openfinance.ae")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iat")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "Issued At Unix timestamp — when the JWT was created"),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196113")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "exp")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Expiry as a Unix timestamp. Must be shortly after "),
                            createVNode("code", null, "nbf"),
                            createTextVNode(" — maximum "),
                            createVNode("strong", null, "5 minutes")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196423")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "iss")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "Your application's Client ID from the Trust Framework"),
                          createVNode("td", null, [
                            createVNode("code", null, "your-client-id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "client_id")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Your application's Client ID (same as "),
                            createVNode("code", null, "iss"),
                            createTextVNode(")")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "your-client-id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "redirect_uri")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "The callback URI registered in your Trust Framework application"),
                          createVNode("td", null, [
                            createVNode("code", null, "https://yourapp.com/callback")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "scope")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Space-separated "),
                            createVNode("a", { href: "/tech/tpp-standards/security/fapi/scopes" }, "OAuth 2.0 scopes")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "accounts openid")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nonce")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "Random UUID — prevents replay attacks by binding the ID token to this request"),
                          createVNode("td", null, [
                            createVNode("code", null, "a1b2c3d4-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "state")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, "Random UUID — returned in the redirect; prevents CSRF attacks"),
                          createVNode("td", null, [
                            createVNode("code", null, "e5f6g7h8-...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "nbf")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Not Before Unix timestamp. Set slightly before "),
                            createVNode("code", null, "iat"),
                            createTextVNode(" (e.g. "),
                            createVNode("code", null, "iat - 10"),
                            createTextVNode(") to allow for clock skew")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "1713196103")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "response_type")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Must be "),
                            createVNode("code", null, "code")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "code")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "code_challenge_method")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("PKCE method — only "),
                            createVNode("code", null, "S256"),
                            createTextVNode(" is supported")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "S256")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "code_challenge")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Base64url-encoded SHA-256 hash of your "),
                            createVNode("code", null, "code_verifier")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "E9Melhoa2Ow...")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "max_age")
                          ]),
                          createVNode("td", null, "number"),
                          createVNode("td"),
                          createVNode("td", null, [
                            createTextVNode("Maximum age (seconds) of the user's existing authentication session. Capped at "),
                            createVNode("code", null, "3600")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "3600")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "authorization_details")
                          ]),
                          createVNode("td", null, "array"),
                          createVNode("td", null, "✓"),
                          createVNode("td", null, [
                            createTextVNode("Describes what the user is consenting to — see "),
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "Consent")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "[{...}]")
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
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Claim"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "aud")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, "issuer"),
                          createTextVNode(" of the Authorization Server — found via "),
                          createVNode("a", { href: "/tech/tpp-standards/trust-framework/api-discovery" }, "API Discovery")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://auth1.[LFICode].apihub.openfinance.ae")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iat")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "Issued At Unix timestamp — when the JWT was created"),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196113")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "exp")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Expiry as a Unix timestamp. Must be shortly after "),
                          createVNode("code", null, "nbf"),
                          createTextVNode(" — maximum "),
                          createVNode("strong", null, "5 minutes")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196423")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "iss")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "Your application's Client ID from the Trust Framework"),
                        createVNode("td", null, [
                          createVNode("code", null, "your-client-id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "client_id")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Your application's Client ID (same as "),
                          createVNode("code", null, "iss"),
                          createTextVNode(")")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "your-client-id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "redirect_uri")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "The callback URI registered in your Trust Framework application"),
                        createVNode("td", null, [
                          createVNode("code", null, "https://yourapp.com/callback")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "scope")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Space-separated "),
                          createVNode("a", { href: "/tech/tpp-standards/security/fapi/scopes" }, "OAuth 2.0 scopes")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "accounts openid")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nonce")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "Random UUID — prevents replay attacks by binding the ID token to this request"),
                        createVNode("td", null, [
                          createVNode("code", null, "a1b2c3d4-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "state")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, "Random UUID — returned in the redirect; prevents CSRF attacks"),
                        createVNode("td", null, [
                          createVNode("code", null, "e5f6g7h8-...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "nbf")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Not Before Unix timestamp. Set slightly before "),
                          createVNode("code", null, "iat"),
                          createTextVNode(" (e.g. "),
                          createVNode("code", null, "iat - 10"),
                          createTextVNode(") to allow for clock skew")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "1713196103")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "response_type")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Must be "),
                          createVNode("code", null, "code")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "code")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "code_challenge_method")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("PKCE method — only "),
                          createVNode("code", null, "S256"),
                          createTextVNode(" is supported")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "S256")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "code_challenge")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Base64url-encoded SHA-256 hash of your "),
                          createVNode("code", null, "code_verifier")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "E9Melhoa2Ow...")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "max_age")
                        ]),
                        createVNode("td", null, "number"),
                        createVNode("td"),
                        createVNode("td", null, [
                          createTextVNode("Maximum age (seconds) of the user's existing authentication session. Capped at "),
                          createVNode("code", null, "3600")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "3600")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "authorization_details")
                        ]),
                        createVNode("td", null, "array"),
                        createVNode("td", null, "✓"),
                        createVNode("td", null, [
                          createTextVNode("Describes what the user is consenting to — see "),
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/consent/api-guide" }, "Consent")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "[{...}]")
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
        id: "pkce",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "PKCE",
        title: "Generating a PKCE code challenge",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before building the JWT, generate a <code data-v-6522edb3${_scopeId2}>code_verifier</code> and derive the <code data-v-6522edb3${_scopeId2}>code_challenge</code> from it: `);
                } else {
                  return [
                    createTextVNode(" Before building the JWT, generate a "),
                    createVNode("code", null, "code_verifier"),
                    createTextVNode(" and derive the "),
                    createVNode("code", null, "code_challenge"),
                    createTextVNode(" from it: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: pkceTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Store the <code data-v-6522edb3${_scopeId2}>code_verifier</code> securely — you&#39;ll need it when exchanging the authorization code for tokens. `);
                } else {
                  return [
                    createTextVNode(" Store the "),
                    createVNode("code", null, "code_verifier"),
                    createTextVNode(" securely — you'll need it when exchanging the authorization code for tokens. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Before building the JWT, generate a "),
                  createVNode("code", null, "code_verifier"),
                  createTextVNode(" and derive the "),
                  createVNode("code", null, "code_challenge"),
                  createTextVNode(" from it: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: pkceTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Store the "),
                  createVNode("code", null, "code_verifier"),
                  createTextVNode(" securely — you'll need it when exchanging the authorization code for tokens. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "build",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "Building the Request JWT",
        title: "Assemble and sign the JWT in code",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: buildJwtTabs }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCodeGroup, { tabs: buildJwtTabs })
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
        title: "End-to-end PAR submission and redirect",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: fullExampleTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-6522edb3${_scopeId2}> Store <code data-v-6522edb3${_scopeId2}>codeVerifier</code> in your session — you&#39;ll need it at the <a href="/tech/tpp-standards/security/tokens/open-api/token" data-v-6522edb3${_scopeId2}>/token</a> endpoint to exchange the authorization code for access tokens. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Store "),
                      createVNode("code", null, "codeVerifier"),
                      createTextVNode(" in your session — you'll need it at the "),
                      createVNode("a", { href: "/tech/tpp-standards/security/tokens/open-api/token" }, "/token"),
                      createTextVNode(" endpoint to exchange the authorization code for access tokens. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCodeGroup, { tabs: fullExampleTabs }),
              createVNode(_component_EdNote, { type: "tip" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Store "),
                    createVNode("code", null, "codeVerifier"),
                    createTextVNode(" in your session — you'll need it at the "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/open-api/token" }, "/token"),
                    createTextVNode(" endpoint to exchange the authorization code for access tokens. ")
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
        id: "encrypting-pii",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "Encrypting Payment PII",
        title: "The pii field inside payment consents is itself a JWE",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For payment consents, the consent&#39;s PII payload (creditor and debtor names, account numbers, and related personal data) must be encrypted with the LFI&#39;s public encryption key and carried as a JWE in the consent&#39;s <code data-v-6522edb3${_scopeId2}>pii</code> field — nested inside <code data-v-6522edb3${_scopeId2}>authorization_details</code> within this Request JWT. The Request JWT itself is signed (JWS) but is <strong data-v-6522edb3${_scopeId2}>not</strong> wrapped in a JWE; only the <code data-v-6522edb3${_scopeId2}>pii</code> field is. `);
                } else {
                  return [
                    createTextVNode(" For payment consents, the consent's PII payload (creditor and debtor names, account numbers, and related personal data) must be encrypted with the LFI's public encryption key and carried as a JWE in the consent's "),
                    createVNode("code", null, "pii"),
                    createTextVNode(" field — nested inside "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" within this Request JWT. The Request JWT itself is signed (JWS) but is "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" wrapped in a JWE; only the "),
                    createVNode("code", null, "pii"),
                    createTextVNode(" field is. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This keeps the PII end-to-end encrypted: the API Hub routes the consent without being able to read the personal data, and only the LFI — holder of the private key — can decrypt and validate it. See <a href="/tech/tpp-standards/security/fapi/message-encryption" data-v-6522edb3${_scopeId2}>Message Encryption</a> for how to produce the JWE, and <a href="/knowledge-base/articles/pii-encryption" data-v-6522edb3${_scopeId2}>Payment PII Encryption</a> for the rationale and validation responsibilities. `);
                } else {
                  return [
                    createTextVNode(" This keeps the PII end-to-end encrypted: the API Hub routes the consent without being able to read the personal data, and only the LFI — holder of the private key — can decrypt and validate it. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                    createTextVNode(" for how to produce the JWE, and "),
                    createVNode("a", { href: "/knowledge-base/articles/pii-encryption" }, "Payment PII Encryption"),
                    createTextVNode(" for the rationale and validation responsibilities. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For payment consents, the consent's PII payload (creditor and debtor names, account numbers, and related personal data) must be encrypted with the LFI's public encryption key and carried as a JWE in the consent's "),
                  createVNode("code", null, "pii"),
                  createTextVNode(" field — nested inside "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" within this Request JWT. The Request JWT itself is signed (JWS) but is "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" wrapped in a JWE; only the "),
                  createVNode("code", null, "pii"),
                  createTextVNode(" field is. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This keeps the PII end-to-end encrypted: the API Hub routes the consent without being able to read the personal data, and only the LFI — holder of the private key — can decrypt and validate it. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-encryption" }, "Message Encryption"),
                  createTextVNode(" for how to produce the JWE, and "),
                  createVNode("a", { href: "/knowledge-base/articles/pii-encryption" }, "Payment PII Encryption"),
                  createTextVNode(" for the rationale and validation responsibilities. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/fapi/request-jwt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requestJwt = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6522edb3"]]);
export {
  requestJwt as default
};
