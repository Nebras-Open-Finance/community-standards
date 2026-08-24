import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as _sfc_main$1 } from "./APIFlowsInsuranceDataSharing-B0lt2IHB.js";
import { _ as __unplugin_components_8 } from "./APIFlowViewer-C5xJUdUs.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "mermaid";
import "./useChartTheme-DtmiKid7.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const exampleAuthDetails = `"authorization_details": [
  {
    "type": "urn:openfinanceuae:insurance-consent:v2.2",
    "consent": {
      "ConsentId": "{{unique-guid}}", // Unique ID assigned by the TPP (uuid format)
      "ExpirationDateTime": "2026-05-03T15:46:00+00:00", // Max 1 year from today (ISO 8601 format with timezone)

      // Permissions are grouped per insurance sector. Repeat one block per
      // sector the customer is sharing.
      "Permissions": [
        {
          "InsuranceType": "Motor",
          "Permissions": [
            "ReadInsurancePolicies",
            "ReadCustomerBasic",
            "ReadCustomerDetail",
            "ReadCustomerPaymentDetails",
            "ReadInsuranceProduct",
            "ReadCustomerClaims",
            "ReadInsurancePremium"
          ]
        },
        {
          "InsuranceType": "Home",
          "Permissions": [
            "ReadInsurancePolicies",
            "ReadInsurancePremium"
          ]
        }
      ],

      "OpenFinanceBilling": {
        "UserType": "Retail",                 // Options: Retail, SME, Corporate
        "Purpose": "QuoteComparison"           // e.g. AccountAggregation, QuoteComparison, RiskAssessment
      }

      // Optional: to link to other ConsentId e.g. when renewing long-lived consents
      // "BaseConsentId": "existing-consent-id",

      // Optional: for consent on behalf of another legal entity
      // "OnBehalfOf": {
      //   "TradingName": "Ozone",
      //   "LegalName": "Ozone-CBUAE",
      //   "IdentifierType": "Other", // Only 'Other' allowed for now
      //   "Identifier": "1234567890"
      // }
    },

    // Optional: to receive webhook notifications from LFI
    // "subscription": {
    //   "Webhook": {
    //     "Url": "https://tpp.example.com/webhook",
    //     "IsActive": true
    //   }
    // }
  }
]
`;
const step2Node = `import crypto from 'node:crypto'
import { generateCodeVerifier, deriveCodeChallenge } from './pkce'    // from FAPI page
import { buildRequestJWT } from './request-jwt'                        // from FAPI page

// 1. Generate PKCE pair — store codeVerifier in your session before redirecting
const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

// 2. Define the authorization_details for this consent
const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:insurance-consent:v2.2',
    consent: {
      ConsentId: crypto.randomUUID(),
      ExpirationDateTime: new Date(Date.now() + 364 * 24 * 60 * 60 * 1000).toISOString(),
      Permissions: [
        {
          InsuranceType: 'Motor',
          Permissions: [
            'ReadInsurancePolicies',
            'ReadCustomerBasic',
            'ReadInsurancePremium',
          ],
        },
      ],
      OpenFinanceBilling: {
        UserType: 'Retail',
        Purpose: 'QuoteComparison',
      },
    },
  },
]

// 3. Build and sign the Request JWT
const requestJWT = await buildRequestJWT({
  scope: 'openid insurance',
  codeChallenge,
  authorizationDetails,
})
`;
const step2Python = `import uuid
from datetime import datetime, timedelta, timezone
from pkce import generate_code_verifier, derive_code_challenge    # from FAPI page
from request_jwt import build_request_jwt                          # from FAPI page

# 1. Generate PKCE pair — store code_verifier in your session before redirecting
code_verifier  = generate_code_verifier()
code_challenge = derive_code_challenge(code_verifier)

# 2. Define the authorization_details for this consent
authorization_details = [
    {
        "type": "urn:openfinanceuae:insurance-consent:v2.2",
        "consent": {
            "ConsentId": str(uuid.uuid4()),
            "ExpirationDateTime": (
                datetime.now(timezone.utc) + timedelta(days=364)
            ).isoformat(),
            "Permissions": [
                {
                    "InsuranceType": "Motor",
                    "Permissions": [
                        "ReadInsurancePolicies",
                        "ReadCustomerBasic",
                        "ReadInsurancePremium",
                    ],
                },
            ],
            "OpenFinanceBilling": {
                "UserType": "Retail",
                "Purpose": "QuoteComparison",
            },
        },
    },
]

# 3. Build and sign the Request JWT
request_jwt = build_request_jwt(
    scope="openid insurance",
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)
`;
const step3Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'    // from FAPI Message Signing page

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.AUTHORIZATION_SERVER_ISSUER!  // from .well-known

async function buildClientAssertion(): Promise<string> {
  return signJWT({
    iss: CLIENT_ID,
    sub: CLIENT_ID,
    aud: ISSUER,
    jti: crypto.randomUUID(),
  })
}
`;
const step3Python = `import os, uuid
from sign_jwt import sign_jwt    # from FAPI Message Signing page

CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER    = os.environ["AUTHORIZATION_SERVER_ISSUER"]   # from .well-known

def build_client_assertion() -> str:
    return sign_jwt({
        "iss": CLIENT_ID,
        "sub": CLIENT_ID,
        "aud": ISSUER,
        "jti": str(uuid.uuid4()),
    })
`;
const step4Node = `import crypto from 'node:crypto'

// PAR endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const PAR_ENDPOINT = discoveryDoc.pushed_authorization_request_endpoint

const parResponse = await fetch(PAR_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type':          'application/x-www-form-urlencoded',
    'x-fapi-interaction-id': crypto.randomUUID(),
  },
  body: new URLSearchParams({
    request:               requestJWT,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // Node.js: pass an https.Agent configured with your transport cert and key
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { request_uri, expires_in } = await parResponse.json()
`;
const step4Python = `import httpx, uuid

# PAR endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
par_endpoint = discovery_doc["pushed_authorization_request_endpoint"]

par_response = httpx.post(
    par_endpoint,
    headers={
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    data={
        "request":               request_jwt,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),  # mTLS
)

data        = par_response.json()
request_uri = data["request_uri"]
expires_in  = data["expires_in"]
`;
const step5Node = `// authorization_endpoint is discovered from the LFI's .well-known/openid-configuration
// Each LFI sets its own path — there is no fixed structure
// e.g. on the altareq1 sandbox: 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth'
const AUTHORIZATION_ENDPOINT = discoveryDoc.authorization_endpoint

const response_type = 'code'

const authCodeUrl = \`\${AUTHORIZATION_ENDPOINT}?client_id=\${CLIENT_ID}&response_type=\${response_type}&request_uri=\${encodeURIComponent(request_uri)}\`

// Redirect the user
window.location.href = authCodeUrl
// or server-side:
// res.redirect(authCodeUrl)
`;
const step5Python = `import urllib.parse

# authorization_endpoint from .well-known/openid-configuration
# Each LFI sets its own path — there is no fixed structure
# e.g. on the altareq1 sandbox: 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth'
AUTHORIZATION_ENDPOINT = discovery_doc["authorization_endpoint"]

auth_code_url = (
    f"{AUTHORIZATION_ENDPOINT}"
    f"?client_id={CLIENT_ID}"
    f"&response_type=code"
    f"&request_uri={urllib.parse.quote(request_uri)}"
)
# redirect the user to auth_code_url
`;
const callbackUrl = `https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`;
const step6Node = `const params = new URLSearchParams(window.location.search)
// or server-side: new URLSearchParams(req.url.split('?')[1])

const code  = params.get('code')!
const state = params.get('state')!
const iss   = params.get('iss')!

if (state !== storedState) {
  throw new Error('State mismatch — possible CSRF attack. Abort the flow.')
}
if (iss !== ISSUER) {
  throw new Error(\`Unexpected issuer: \${iss}\`)
}
`;
const step6Python = `from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
code  = params["code"][0]
state = params["state"][0]
iss   = params["iss"][0]

if state != stored_state:
    raise ValueError("State mismatch — possible CSRF attack. Abort the flow.")
if iss != ISSUER:
    raise ValueError(f"Unexpected issuer: {iss}")
`;
const step7Node = `// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type:            'authorization_code',
    code,
    redirect_uri:          REDIRECT_URI,
    code_verifier:         codeVerifier,            // from Step 2
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const {
  access_token,
  refresh_token,
  expires_in,   // 600 — access token lasts 10 minutes
  token_type,   // 'Bearer'
} = await tokenResponse.json()
`;
const step7Python = `# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
token_endpoint = discovery_doc["token_endpoint"]

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "authorization_code",
        "code":                  code,
        "redirect_uri":          REDIRECT_URI,
        "code_verifier":         code_verifier,     # from Step 2
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = token_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]
expires_in    = tokens["expires_in"]   # 600 — access token lasts 10 minutes
`;
const step8Node = `import crypto from 'node:crypto'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!  // resource server base URL from .well-known

// Substitute the sector the customer consented to — employment, health, home,
// life, motor, renters, or travel.
const policiesResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/insurance/v2.2/motor-insurance-policies\`,
  {
    headers: {
      Authorization:                \`Bearer \${access_token}\`,
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-auth-date':           lastCustomerAuthDate,   // RFC 7231 — last time user authenticated with TPP
      'x-fapi-customer-ip-address': customerIpAddress,      // customer's IP address
      // 'x-customer-user-agent':   req.headers['user-agent'],
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Policy: policies } } = await policiesResponse.json()

// Store the InsurancePolicyId(s) for sub-resource queries
const insurancePolicyId = policies[0].InsurancePolicyId
`;
const step8Python = `import uuid

# Substitute the sector the customer consented to — employment, health, home,
# life, motor, renters, or travel.
policies_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/insurance/v2.2/motor-insurance-policies",
    headers={
        "Authorization":                f"Bearer {access_token}",
        "x-fapi-interaction-id":        str(uuid.uuid4()),
        "x-fapi-auth-date":             last_customer_auth_date,  # RFC 7231 — last time user authenticated with TPP
        "x-fapi-customer-ip-address":   customer_ip_address,      # customer's IP address
        # "x-customer-user-agent":      request.headers.get("user-agent"),
    },
    # cert=("transport.crt", "transport.key"),
)

policies            = policies_response.json()["Data"]["Policy"]
insurance_policy_id = policies[0]["InsurancePolicyId"]
`;
const step9Node = `const policyResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/insurance/v2.2/motor-insurance-policies/\${insurancePolicyId}\`,
  {
    headers: {
      Authorization:                \`Bearer \${access_token}\`,
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-auth-date':           lastCustomerAuthDate,
      'x-fapi-customer-ip-address': customerIpAddress,
      // 'x-customer-user-agent':   req.headers['user-agent'],
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Policy: policy } } = await policyResponse.json()

// Premium is anyOf { object | string }. A string is a compact JWE.
// See the Encrypted Premiums page for how to handle it client-side.
const premium = policy.Premium
`;
const step9Python = `policy_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/insurance/v2.2/motor-insurance-policies/{insurance_policy_id}",
    headers={
        "Authorization":                f"Bearer {access_token}",
        "x-fapi-interaction-id":        str(uuid.uuid4()),
        "x-fapi-auth-date":             last_customer_auth_date,
        "x-fapi-customer-ip-address":   customer_ip_address,
        # "x-customer-user-agent":      request.headers.get("user-agent"),
    },
    # cert=("transport.crt", "transport.key"),
)

policy = policy_response.json()["Data"]["Policy"]

# Premium is anyOf { object | string }. A string is a compact JWE.
# See the Encrypted Premiums page for how to handle it client-side.
premium = policy.get("Premium")
`;
const step10Node = `// Reuse the TOKEN_ENDPOINT discovered in Step 7 (discoveryDoc.token_endpoint).
async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type:            'refresh_token',
      refresh_token:         refreshToken,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion:      await buildClientAssertion(),
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })

  const { access_token, refresh_token: newRefreshToken, expires_in } = await response.json()

  // Always replace both tokens — some servers rotate the refresh token on each use
  return { access_token, refresh_token: newRefreshToken, expires_in }
}
`;
const step10Python = `# Reuse the token_endpoint discovered in Step 7 (discovery_doc["token_endpoint"]).
def refresh_access_token(refresh_token: str) -> dict:
    response = httpx.post(
        token_endpoint,
        data={
            "grant_type":            "refresh_token",
            "refresh_token":         refresh_token,
            "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            "client_assertion":      build_client_assertion(),
        },
        # cert=("transport.crt", "transport.key"),
    )

    tokens = response.json()
    # Always replace both tokens — some servers rotate the refresh token on each use
    return {
        "access_token":  tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
        "expires_in":    tokens["expires_in"],
    }
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const step2Tabs = [{ label: "Node.js", lang: "typescript", code: step2Node }, { label: "Python", lang: "python", code: step2Python }];
    const step3Tabs = [{ label: "Node.js", lang: "typescript", code: step3Node }, { label: "Python", lang: "python", code: step3Python }];
    const step4Tabs = [{ label: "Node.js", lang: "typescript", code: step4Node }, { label: "Python", lang: "python", code: step4Python }];
    const step5Tabs = [{ label: "Node.js", lang: "typescript", code: step5Node }, { label: "Python", lang: "python", code: step5Python }];
    const step6Tabs = [{ label: "Node.js", lang: "typescript", code: step6Node }, { label: "Python", lang: "python", code: step6Python }];
    const step7Tabs = [{ label: "Node.js", lang: "typescript", code: step7Node }, { label: "Python", lang: "python", code: step7Python }];
    const step8Tabs = [{ label: "Node.js", lang: "typescript", code: step8Node }, { label: "Python", lang: "python", code: step8Python }];
    const step9Tabs = [{ label: "Node.js", lang: "typescript", code: step9Node }, { label: "Python", lang: "python", code: step9Python }];
    const step10Tabs = [{ label: "Node.js", lang: "typescript", code: step10Node }, { label: "Python", lang: "python", code: step10Python }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_APIFlowViewer = __unplugin_components_8;
      const _component_APIFlowsInsuranceDataSharing = _sfc_main$1;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      const _component_EdCodeGroup = __unplugin_components_9;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-e8696d7f><section class="ed-doc__hero" data-v-e8696d7f><div class="ed-doc__inner" data-v-e8696d7f><div class="ed-doc__eyebrow" data-v-e8696d7f><span class="ed-doc__eyebrow-dash" data-v-e8696d7f></span> TPP · Insurance · Data Sharing </div><h1 class="ed-doc__title" data-v-e8696d7f> Insurance Data Sharing — API Guide <span class="ed-doc__read" data-v-e8696d7f>5 min read</span></h1><p class="ed-doc__lede" data-v-e8696d7f> Create an Insurance Data Sharing consent, redirect the user to authenticate at their LFI, exchange the authorization code for tokens, and call the policy APIs — an end-to-end walkthrough of the customer-present insurance data-sharing flow. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Prerequisites",
        title: "What you need before creating a consent",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Before creating an Insurance Data Sharing consent, ensure the following requirements are met: `);
                } else {
                  return [
                    createTextVNode(" Before creating an Insurance Data Sharing consent, ensure the following requirements are met: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e8696d7f${_scopeId2}><strong data-v-e8696d7f${_scopeId2}>Registered <a href="/tech/tpp-standards/trust-framework/application" data-v-e8696d7f${_scopeId2}>Application</a></strong> — the application must be created within the Trust Framework and assigned the <strong data-v-e8696d7f${_scopeId2}>ISP role</strong> as defined in <a href="/tech/tpp-standards/trust-framework/roles" data-v-e8696d7f${_scopeId2}>Roles</a>. </li><li data-v-e8696d7f${_scopeId2}><strong data-v-e8696d7f${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-e8696d7f${_scopeId2}>Transport Certificate</a></strong> — an active transport certificate must be issued and registered in the Trust Framework to establish secure <strong data-v-e8696d7f${_scopeId2}>mTLS communication</strong>. </li><li data-v-e8696d7f${_scopeId2}><strong data-v-e8696d7f${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-e8696d7f${_scopeId2}>Signing Certificate</a></strong> — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. </li><li data-v-e8696d7f${_scopeId2}><strong data-v-e8696d7f${_scopeId2}>Valid <a href="/tech/tpp-standards/trust-framework/certificates" data-v-e8696d7f${_scopeId2}>Encryption Certificate</a></strong> — required to decrypt the <code data-v-e8696d7f${_scopeId2}>Premium</code> JWE when the customer has granted <code data-v-e8696d7f${_scopeId2}>ReadInsurancePremium</code>. See <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" data-v-e8696d7f${_scopeId2}>Encrypted Premiums</a>. </li><li data-v-e8696d7f${_scopeId2}><strong data-v-e8696d7f${_scopeId2}>Registration with the relevant <a href="/tech/tpp-standards/registration/api-guide" data-v-e8696d7f${_scopeId2}>API Hub (Authorisation Server)</a></strong> — the application must be registered with the API Hub (Server) of the LFI for which you intend to create an Insurance Data Sharing consent. </li><li data-v-e8696d7f${_scopeId2}><strong data-v-e8696d7f${_scopeId2}>Understanding of the <a href="/tech/tpp-standards/security/fapi/" data-v-e8696d7f${_scopeId2}>FAPI Security Profile</a></strong> and <strong data-v-e8696d7f${_scopeId2}><a href="/tech/tpp-standards/security/tokens/" data-v-e8696d7f${_scopeId2}>Tokens &amp; Assertions</a></strong> — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. </li><li data-v-e8696d7f${_scopeId2}><strong data-v-e8696d7f${_scopeId2}>Understanding of <a href="/tech/tpp-standards/v2.2-rc1/consent/" data-v-e8696d7f${_scopeId2}>Consents</a></strong> — you should understand how to create, retrieve, and manage consents, including consent states and lifecycle transitions. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registered "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                      ]),
                      createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                      createVNode("strong", null, "ISP role"),
                      createTextVNode(" as defined in "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                      ]),
                      createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to establish secure "),
                      createVNode("strong", null, "mTLS communication"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                      ]),
                      createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Valid "),
                        createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Encryption Certificate")
                      ]),
                      createTextVNode(" — required to decrypt the "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" JWE when the customer has granted "),
                      createVNode("code", null, "ReadInsurancePremium"),
                      createTextVNode(". See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                      createTextVNode(". ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Registration with the relevant "),
                        createVNode("a", { href: "/tech/tpp-standards/registration/api-guide" }, "API Hub (Authorisation Server)")
                      ]),
                      createTextVNode(" — the application must be registered with the API Hub (Server) of the LFI for which you intend to create an Insurance Data Sharing consent. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Understanding of the "),
                        createVNode("a", { href: "/tech/tpp-standards/security/fapi/" }, "FAPI Security Profile")
                      ]),
                      createTextVNode(" and "),
                      createVNode("strong", null, [
                        createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                      ]),
                      createTextVNode(" — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("Understanding of "),
                        createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/" }, "Consents")
                      ]),
                      createTextVNode(" — you should understand how to create, retrieve, and manage consents, including consent states and lifecycle transitions. ")
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
                  createTextVNode(" Before creating an Insurance Data Sharing consent, ensure the following requirements are met: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registered "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/application" }, "Application")
                    ]),
                    createTextVNode(" — the application must be created within the Trust Framework and assigned the "),
                    createVNode("strong", null, "ISP role"),
                    createTextVNode(" as defined in "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/roles" }, "Roles"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Transport Certificate")
                    ]),
                    createTextVNode(" — an active transport certificate must be issued and registered in the Trust Framework to establish secure "),
                    createVNode("strong", null, "mTLS communication"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Signing Certificate")
                    ]),
                    createTextVNode(" — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Valid "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Encryption Certificate")
                    ]),
                    createTextVNode(" — required to decrypt the "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" JWE when the customer has granted "),
                    createVNode("code", null, "ReadInsurancePremium"),
                    createTextVNode(". See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                    createTextVNode(". ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Registration with the relevant "),
                      createVNode("a", { href: "/tech/tpp-standards/registration/api-guide" }, "API Hub (Authorisation Server)")
                    ]),
                    createTextVNode(" — the application must be registered with the API Hub (Server) of the LFI for which you intend to create an Insurance Data Sharing consent. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Understanding of the "),
                      createVNode("a", { href: "/tech/tpp-standards/security/fapi/" }, "FAPI Security Profile")
                    ]),
                    createTextVNode(" and "),
                    createVNode("strong", null, [
                      createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions")
                    ]),
                    createTextVNode(" — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("Understanding of "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/consent/" }, "Consents")
                    ]),
                    createTextVNode(" — you should understand how to create, retrieve, and manage consents, including consent states and lifecycle transitions. ")
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
        id: "sequence-flow",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "API Sequence Flow",
        title: "End-to-end Insurance Data Sharing",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_APIFlowViewer, { title: "Insurance Data Sharing API Flow" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_APIFlowsInsuranceDataSharing, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_APIFlowsInsuranceDataSharing)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_APIFlowViewer, { title: "Insurance Data Sharing API Flow" }, {
                default: withCtx(() => [
                  createVNode(_component_APIFlowsInsuranceDataSharing)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-1-authorization-details",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "POST /par · Step 1 — Constructing Authorization Details",
        title: "Build the consent payload",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e8696d7f${_scopeId}><span class="http-badge http-post" data-v-e8696d7f${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-e8696d7f${_scopeId}>/par</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To send a <code data-v-e8696d7f${_scopeId2}>/par</code> request, first we need to generate the <code data-v-e8696d7f${_scopeId2}>request JWT</code>. We do this by first constructing <code data-v-e8696d7f${_scopeId2}>authorization_details</code> of type (<code data-v-e8696d7f${_scopeId2}>urn:openfinanceuae:insurance-consent:v2.2</code>). `);
                } else {
                  return [
                    createTextVNode(" To send a "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request, first we need to generate the "),
                    createVNode("code", null, "request JWT"),
                    createTextVNode(". We do this by first constructing "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" of type ("),
                    createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.2"),
                    createTextVNode("). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e8696d7f${_scopeId}>authorization_details</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Field</th><th data-v-e8696d7f${_scopeId2}>Type</th><th data-v-e8696d7f${_scopeId2}>Description</th><th data-v-e8696d7f${_scopeId2}>Example</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>type</code>*</td><td data-v-e8696d7f${_scopeId2}>enum</td><td data-v-e8696d7f${_scopeId2}>Must be <code data-v-e8696d7f${_scopeId2}>urn:openfinanceuae:insurance-consent:v2.2</code></td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>urn:openfinanceuae:insurance-consent:v2.2</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>consent</code>*</td><td data-v-e8696d7f${_scopeId2}>object</td><td data-v-e8696d7f${_scopeId2}>Properties of the consent agreed by the User with the TPP. <em data-v-e8696d7f${_scopeId2}>Described below.</em></td><td data-v-e8696d7f${_scopeId2}><em data-v-e8696d7f${_scopeId2}>Described below</em></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>subscription</code></td><td data-v-e8696d7f${_scopeId2}>object</td><td data-v-e8696d7f${_scopeId2}>Optional subscription to Event Notifications, to be sent to the TPP Webhook Url. <em data-v-e8696d7f${_scopeId2}>Described below.</em></td><td data-v-e8696d7f${_scopeId2}><em data-v-e8696d7f${_scopeId2}>Described below</em></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "type"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createTextVNode("Must be "),
                            createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.2")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.2")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "consent"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Properties of the consent agreed by the User with the TPP. "),
                            createVNode("em", null, "Described below.")
                          ]),
                          createVNode("td", null, [
                            createVNode("em", null, "Described below")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "subscription")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Optional subscription to Event Notifications, to be sent to the TPP Webhook Url. "),
                            createVNode("em", null, "Described below.")
                          ]),
                          createVNode("td", null, [
                            createVNode("em", null, "Described below")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e8696d7f${_scopeId}>consent (Required) | <code data-v-e8696d7f${_scopeId}>authorization_details.consent</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Field</th><th data-v-e8696d7f${_scopeId2}>Type</th><th data-v-e8696d7f${_scopeId2}>Description</th><th data-v-e8696d7f${_scopeId2}>Example</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ConsentId</code>*</td><td data-v-e8696d7f${_scopeId2}>string (uuid)</td><td data-v-e8696d7f${_scopeId2}>Unique ID assigned by the TPP (1–128 chars)</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>123e4567-e89b-12d3-a456-426614174001</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>BaseConsentId</code></td><td data-v-e8696d7f${_scopeId2}>string (uuid)</td><td data-v-e8696d7f${_scopeId2}>Used when renewing or modifying an existing consent</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>123e4567-e89b-12d3-a456-426614174000</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Permissions</code>*</td><td data-v-e8696d7f${_scopeId2}>array&lt;object&gt;</td><td data-v-e8696d7f${_scopeId2}>One entry per insurance sector being consented — <em data-v-e8696d7f${_scopeId2}>described below</em></td><td data-v-e8696d7f${_scopeId2}><em data-v-e8696d7f${_scopeId2}>Described below</em></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ExpirationDateTime</code>*</td><td data-v-e8696d7f${_scopeId2}>date-time</td><td data-v-e8696d7f${_scopeId2}>Expiry date/time (ISO 8601 with timezone, max 1 year)</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>2025-11-03T15:46:00+00:00</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>OpenFinanceBilling</code>*</td><td data-v-e8696d7f${_scopeId2}>object</td><td data-v-e8696d7f${_scopeId2}>Billing parameters specified by the TPP. <em data-v-e8696d7f${_scopeId2}>Described below.</em></td><td data-v-e8696d7f${_scopeId2}><em data-v-e8696d7f${_scopeId2}>Described below</em></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>OnBehalfOf</code></td><td data-v-e8696d7f${_scopeId2}>object</td><td data-v-e8696d7f${_scopeId2}>Provided when TPP is acting for another regulated entity. <em data-v-e8696d7f${_scopeId2}>Described below.</em></td><td data-v-e8696d7f${_scopeId2}><em data-v-e8696d7f${_scopeId2}>Described below</em></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ConsentId"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string (uuid)"),
                          createVNode("td", null, "Unique ID assigned by the TPP (1–128 chars)"),
                          createVNode("td", null, [
                            createVNode("code", null, "123e4567-e89b-12d3-a456-426614174001")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "BaseConsentId")
                          ]),
                          createVNode("td", null, "string (uuid)"),
                          createVNode("td", null, "Used when renewing or modifying an existing consent"),
                          createVNode("td", null, [
                            createVNode("code", null, "123e4567-e89b-12d3-a456-426614174000")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Permissions"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "array<object>"),
                          createVNode("td", null, [
                            createTextVNode("One entry per insurance sector being consented — "),
                            createVNode("em", null, "described below")
                          ]),
                          createVNode("td", null, [
                            createVNode("em", null, "Described below")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ExpirationDateTime"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "date-time"),
                          createVNode("td", null, "Expiry date/time (ISO 8601 with timezone, max 1 year)"),
                          createVNode("td", null, [
                            createVNode("code", null, "2025-11-03T15:46:00+00:00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OpenFinanceBilling"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Billing parameters specified by the TPP. "),
                            createVNode("em", null, "Described below.")
                          ]),
                          createVNode("td", null, [
                            createVNode("em", null, "Described below")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "OnBehalfOf")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createTextVNode("Provided when TPP is acting for another regulated entity. "),
                            createVNode("em", null, "Described below.")
                          ]),
                          createVNode("td", null, [
                            createVNode("em", null, "Described below")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e8696d7f${_scopeId}>Permissions entry | <code data-v-e8696d7f${_scopeId}>authorization_details.consent.Permissions[*]</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Field</th><th data-v-e8696d7f${_scopeId2}>Type</th><th data-v-e8696d7f${_scopeId2}>Allowed Values</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>InsuranceType</code>*</td><td data-v-e8696d7f${_scopeId2}>enum</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Employment</code>, <code data-v-e8696d7f${_scopeId2}>Health</code>, <code data-v-e8696d7f${_scopeId2}>Home</code>, <code data-v-e8696d7f${_scopeId2}>Life</code>, <code data-v-e8696d7f${_scopeId2}>Motor</code>, <code data-v-e8696d7f${_scopeId2}>Renters</code>, <code data-v-e8696d7f${_scopeId2}>Travel</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Permissions</code>*</td><td data-v-e8696d7f${_scopeId2}>array&lt;enum&gt;</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ReadInsurancePolicies</code>, <code data-v-e8696d7f${_scopeId2}>ReadCustomerBasic</code>, <code data-v-e8696d7f${_scopeId2}>ReadCustomerDetail</code>, <code data-v-e8696d7f${_scopeId2}>ReadCustomerPaymentDetails</code>, <code data-v-e8696d7f${_scopeId2}>ReadInsuranceProduct</code>, <code data-v-e8696d7f${_scopeId2}>ReadCustomerClaims</code>, <code data-v-e8696d7f${_scopeId2}>ReadInsurancePremium</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Allowed Values")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "InsuranceType"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Employment"),
                            createTextVNode(", "),
                            createVNode("code", null, "Health"),
                            createTextVNode(", "),
                            createVNode("code", null, "Home"),
                            createTextVNode(", "),
                            createVNode("code", null, "Life"),
                            createTextVNode(", "),
                            createVNode("code", null, "Motor"),
                            createTextVNode(", "),
                            createVNode("code", null, "Renters"),
                            createTextVNode(", "),
                            createVNode("code", null, "Travel")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Permissions"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "array<enum>"),
                          createVNode("td", null, [
                            createVNode("code", null, "ReadInsurancePolicies"),
                            createTextVNode(", "),
                            createVNode("code", null, "ReadCustomerBasic"),
                            createTextVNode(", "),
                            createVNode("code", null, "ReadCustomerDetail"),
                            createTextVNode(", "),
                            createVNode("code", null, "ReadCustomerPaymentDetails"),
                            createTextVNode(", "),
                            createVNode("code", null, "ReadInsuranceProduct"),
                            createTextVNode(", "),
                            createVNode("code", null, "ReadCustomerClaims"),
                            createTextVNode(", "),
                            createVNode("code", null, "ReadInsurancePremium")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e8696d7f${_scopeId}>OpenFinanceBilling (Required) | <code data-v-e8696d7f${_scopeId}>authorization_details.consent.OpenFinanceBilling</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Field</th><th data-v-e8696d7f${_scopeId2}>Type</th><th data-v-e8696d7f${_scopeId2}>Allowed Values</th><th data-v-e8696d7f${_scopeId2}>Example</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>UserType</code>*</td><td data-v-e8696d7f${_scopeId2}>enum</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Retail</code>, <code data-v-e8696d7f${_scopeId2}>SME</code>, <code data-v-e8696d7f${_scopeId2}>Corporate</code></td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Retail</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Purpose</code>*</td><td data-v-e8696d7f${_scopeId2}>enum</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>AccountAggregation</code>, <code data-v-e8696d7f${_scopeId2}>RiskAssessment</code>, <code data-v-e8696d7f${_scopeId2}>TaxFiling</code>, <code data-v-e8696d7f${_scopeId2}>Onboarding</code>, <code data-v-e8696d7f${_scopeId2}>Verification</code>, <code data-v-e8696d7f${_scopeId2}>QuoteComparison</code>, <code data-v-e8696d7f${_scopeId2}>BudgetingAnalysis</code>, <code data-v-e8696d7f${_scopeId2}>FinancialAdvice</code>, <code data-v-e8696d7f${_scopeId2}>AuditReconciliation</code></td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>QuoteComparison</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Allowed Values"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "UserType"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "Retail"),
                            createTextVNode(", "),
                            createVNode("code", null, "SME"),
                            createTextVNode(", "),
                            createVNode("code", null, "Corporate")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "Retail")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Purpose"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createVNode("code", null, "AccountAggregation"),
                            createTextVNode(", "),
                            createVNode("code", null, "RiskAssessment"),
                            createTextVNode(", "),
                            createVNode("code", null, "TaxFiling"),
                            createTextVNode(", "),
                            createVNode("code", null, "Onboarding"),
                            createTextVNode(", "),
                            createVNode("code", null, "Verification"),
                            createTextVNode(", "),
                            createVNode("code", null, "QuoteComparison"),
                            createTextVNode(", "),
                            createVNode("code", null, "BudgetingAnalysis"),
                            createTextVNode(", "),
                            createVNode("code", null, "FinancialAdvice"),
                            createTextVNode(", "),
                            createVNode("code", null, "AuditReconciliation")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "QuoteComparison")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e8696d7f${_scopeId}>OnBehalfOf (Optional) | <code data-v-e8696d7f${_scopeId}>authorization_details.consent.OnBehalfOf</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Field</th><th data-v-e8696d7f${_scopeId2}>Type</th><th data-v-e8696d7f${_scopeId2}>Description</th><th data-v-e8696d7f${_scopeId2}>Example</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>TradingName</code></td><td data-v-e8696d7f${_scopeId2}>string</td><td data-v-e8696d7f${_scopeId2}>Trading name if acting on behalf of another entity</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Acme Ltd</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>LegalName</code></td><td data-v-e8696d7f${_scopeId2}>string</td><td data-v-e8696d7f${_scopeId2}>Legal name of represented entity</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Acme Legal Name</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>IdentifierType</code></td><td data-v-e8696d7f${_scopeId2}>enum</td><td data-v-e8696d7f${_scopeId2}>Only <code data-v-e8696d7f${_scopeId2}>Other</code> currently supported</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Other</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Identifier</code></td><td data-v-e8696d7f${_scopeId2}>string</td><td data-v-e8696d7f${_scopeId2}>Identifier value</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>9876543210</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "TradingName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Trading name if acting on behalf of another entity"),
                          createVNode("td", null, [
                            createVNode("code", null, "Acme Ltd")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "LegalName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Legal name of represented entity"),
                          createVNode("td", null, [
                            createVNode("code", null, "Acme Legal Name")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IdentifierType")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, [
                            createTextVNode("Only "),
                            createVNode("code", null, "Other"),
                            createTextVNode(" currently supported")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "Other")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Identifier")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Identifier value"),
                          createVNode("td", null, [
                            createVNode("code", null, "9876543210")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e8696d7f${_scopeId}>subscription (Optional) | <code data-v-e8696d7f${_scopeId}>authorization_details.subscription</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Field</th><th data-v-e8696d7f${_scopeId2}>Type</th><th data-v-e8696d7f${_scopeId2}>Description</th><th data-v-e8696d7f${_scopeId2}>Example</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Webhook</code>*</td><td data-v-e8696d7f${_scopeId2}>object</td><td data-v-e8696d7f${_scopeId2}><em data-v-e8696d7f${_scopeId2}>Described below.</em></td><td data-v-e8696d7f${_scopeId2}><em data-v-e8696d7f${_scopeId2}>Described below</em></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Webhook"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, [
                            createVNode("em", null, "Described below.")
                          ]),
                          createVNode("td", null, [
                            createVNode("em", null, "Described below")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e8696d7f${_scopeId}>Webhook (Required) | <code data-v-e8696d7f${_scopeId}>authorization_details.subscription.Webhook</code></h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Field</th><th data-v-e8696d7f${_scopeId2}>Type</th><th data-v-e8696d7f${_scopeId2}>Description</th><th data-v-e8696d7f${_scopeId2}>Example</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>Url</code>*</td><td data-v-e8696d7f${_scopeId2}>string</td><td data-v-e8696d7f${_scopeId2}>HTTPS callback URL</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>https://tpp.example.com/webhook</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>IsActive</code>*</td><td data-v-e8696d7f${_scopeId2}>boolean</td><td data-v-e8696d7f${_scopeId2}>Whether webhook is active</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>true</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Url"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "HTTPS callback URL"),
                          createVNode("td", null, [
                            createVNode("code", null, "https://tpp.example.com/webhook")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "IsActive"),
                            createTextVNode("*")
                          ]),
                          createVNode("td", null, "boolean"),
                          createVNode("td", null, "Whether webhook is active"),
                          createVNode("td", null, [
                            createVNode("code", null, "true")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__subhead" data-v-e8696d7f${_scopeId}>Example request</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See an example of a valid <code data-v-e8696d7f${_scopeId2}>authorization_details</code> for <code data-v-e8696d7f${_scopeId2}>urn:openfinanceuae:insurance-consent:v2.2</code>: `);
                } else {
                  return [
                    createTextVNode(" See an example of a valid "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" for "),
                    createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.2"),
                    createTextVNode(": ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleAuthDetails,
              lang: "json",
              filename: "authorization_details"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/par")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To send a "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" request, first we need to generate the "),
                  createVNode("code", null, "request JWT"),
                  createTextVNode(". We do this by first constructing "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" of type ("),
                  createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.2"),
                  createTextVNode("). ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "authorization_details"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "type"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createTextVNode("Must be "),
                          createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.2")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.2")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "consent"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Properties of the consent agreed by the User with the TPP. "),
                          createVNode("em", null, "Described below.")
                        ]),
                        createVNode("td", null, [
                          createVNode("em", null, "Described below")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "subscription")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Optional subscription to Event Notifications, to be sent to the TPP Webhook Url. "),
                          createVNode("em", null, "Described below.")
                        ]),
                        createVNode("td", null, [
                          createVNode("em", null, "Described below")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("consent (Required) | "),
                createVNode("code", null, "authorization_details.consent")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ConsentId"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string (uuid)"),
                        createVNode("td", null, "Unique ID assigned by the TPP (1–128 chars)"),
                        createVNode("td", null, [
                          createVNode("code", null, "123e4567-e89b-12d3-a456-426614174001")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "BaseConsentId")
                        ]),
                        createVNode("td", null, "string (uuid)"),
                        createVNode("td", null, "Used when renewing or modifying an existing consent"),
                        createVNode("td", null, [
                          createVNode("code", null, "123e4567-e89b-12d3-a456-426614174000")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Permissions"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "array<object>"),
                        createVNode("td", null, [
                          createTextVNode("One entry per insurance sector being consented — "),
                          createVNode("em", null, "described below")
                        ]),
                        createVNode("td", null, [
                          createVNode("em", null, "Described below")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ExpirationDateTime"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "date-time"),
                        createVNode("td", null, "Expiry date/time (ISO 8601 with timezone, max 1 year)"),
                        createVNode("td", null, [
                          createVNode("code", null, "2025-11-03T15:46:00+00:00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OpenFinanceBilling"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Billing parameters specified by the TPP. "),
                          createVNode("em", null, "Described below.")
                        ]),
                        createVNode("td", null, [
                          createVNode("em", null, "Described below")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "OnBehalfOf")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createTextVNode("Provided when TPP is acting for another regulated entity. "),
                          createVNode("em", null, "Described below.")
                        ]),
                        createVNode("td", null, [
                          createVNode("em", null, "Described below")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("Permissions entry | "),
                createVNode("code", null, "authorization_details.consent.Permissions[*]")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Allowed Values")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "InsuranceType"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Employment"),
                          createTextVNode(", "),
                          createVNode("code", null, "Health"),
                          createTextVNode(", "),
                          createVNode("code", null, "Home"),
                          createTextVNode(", "),
                          createVNode("code", null, "Life"),
                          createTextVNode(", "),
                          createVNode("code", null, "Motor"),
                          createTextVNode(", "),
                          createVNode("code", null, "Renters"),
                          createTextVNode(", "),
                          createVNode("code", null, "Travel")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Permissions"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "array<enum>"),
                        createVNode("td", null, [
                          createVNode("code", null, "ReadInsurancePolicies"),
                          createTextVNode(", "),
                          createVNode("code", null, "ReadCustomerBasic"),
                          createTextVNode(", "),
                          createVNode("code", null, "ReadCustomerDetail"),
                          createTextVNode(", "),
                          createVNode("code", null, "ReadCustomerPaymentDetails"),
                          createTextVNode(", "),
                          createVNode("code", null, "ReadInsuranceProduct"),
                          createTextVNode(", "),
                          createVNode("code", null, "ReadCustomerClaims"),
                          createTextVNode(", "),
                          createVNode("code", null, "ReadInsurancePremium")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("OpenFinanceBilling (Required) | "),
                createVNode("code", null, "authorization_details.consent.OpenFinanceBilling")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Allowed Values"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "UserType"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "Retail"),
                          createTextVNode(", "),
                          createVNode("code", null, "SME"),
                          createTextVNode(", "),
                          createVNode("code", null, "Corporate")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "Retail")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Purpose"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createVNode("code", null, "AccountAggregation"),
                          createTextVNode(", "),
                          createVNode("code", null, "RiskAssessment"),
                          createTextVNode(", "),
                          createVNode("code", null, "TaxFiling"),
                          createTextVNode(", "),
                          createVNode("code", null, "Onboarding"),
                          createTextVNode(", "),
                          createVNode("code", null, "Verification"),
                          createTextVNode(", "),
                          createVNode("code", null, "QuoteComparison"),
                          createTextVNode(", "),
                          createVNode("code", null, "BudgetingAnalysis"),
                          createTextVNode(", "),
                          createVNode("code", null, "FinancialAdvice"),
                          createTextVNode(", "),
                          createVNode("code", null, "AuditReconciliation")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "QuoteComparison")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("OnBehalfOf (Optional) | "),
                createVNode("code", null, "authorization_details.consent.OnBehalfOf")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "TradingName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Trading name if acting on behalf of another entity"),
                        createVNode("td", null, [
                          createVNode("code", null, "Acme Ltd")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "LegalName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Legal name of represented entity"),
                        createVNode("td", null, [
                          createVNode("code", null, "Acme Legal Name")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IdentifierType")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, [
                          createTextVNode("Only "),
                          createVNode("code", null, "Other"),
                          createTextVNode(" currently supported")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "Other")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Identifier")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Identifier value"),
                        createVNode("td", null, [
                          createVNode("code", null, "9876543210")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("subscription (Optional) | "),
                createVNode("code", null, "authorization_details.subscription")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Webhook"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, [
                          createVNode("em", null, "Described below.")
                        ]),
                        createVNode("td", null, [
                          createVNode("em", null, "Described below")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, [
                createTextVNode("Webhook (Required) | "),
                createVNode("code", null, "authorization_details.subscription.Webhook")
              ]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Url"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "HTTPS callback URL"),
                        createVNode("td", null, [
                          createVNode("code", null, "https://tpp.example.com/webhook")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "IsActive"),
                          createTextVNode("*")
                        ]),
                        createVNode("td", null, "boolean"),
                        createVNode("td", null, "Whether webhook is active"),
                        createVNode("td", null, [
                          createVNode("code", null, "true")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__subhead" }, "Example request"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See an example of a valid "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" for "),
                  createVNode("code", null, "urn:openfinanceuae:insurance-consent:v2.2"),
                  createTextVNode(": ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: exampleAuthDetails,
                lang: "json",
                filename: "authorization_details"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-2-request-jwt",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "POST /par · Step 2 — Constructing the Request JWT",
        title: "Bind PKCE and authorization details into a signed JWT",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` With your <code data-v-e8696d7f${_scopeId2}>authorization_details</code> ready, generate a PKCE code pair then use the <a href="/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt" data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>buildRequestJWT()</code></a> helper from the FAPI page, passing <code data-v-e8696d7f${_scopeId2}>openid insurance</code> as the scope. `);
                } else {
                  return [
                    createTextVNode(" With your "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" ready, generate a PKCE code pair then use the "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt" }, [
                      createVNode("code", null, "buildRequestJWT()")
                    ]),
                    createTextVNode(" helper from the FAPI page, passing "),
                    createVNode("code", null, "openid insurance"),
                    createTextVNode(" as the scope. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step2Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Store the code_verifier"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e8696d7f${_scopeId2}> Save <code data-v-e8696d7f${_scopeId2}>codeVerifier</code> in your server-side session or an <code data-v-e8696d7f${_scopeId2}>httpOnly</code> cookie. You will need it in <a href="#step-7-post-token-authorization-code" data-v-e8696d7f${_scopeId2}>Step 7</a> to exchange the authorization code for tokens. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Save "),
                      createVNode("code", null, "codeVerifier"),
                      createTextVNode(" in your server-side session or an "),
                      createVNode("code", null, "httpOnly"),
                      createTextVNode(" cookie. You will need it in "),
                      createVNode("a", { href: "#step-7-post-token-authorization-code" }, "Step 7"),
                      createTextVNode(" to exchange the authorization code for tokens. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/request-jwt" data-v-e8696d7f${_scopeId2}>Preparing the Request JWT</a> for the full JWT claim reference and PKCE helpers. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Preparing the Request JWT"),
                    createTextVNode(" for the full JWT claim reference and PKCE helpers. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" With your "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" ready, generate a PKCE code pair then use the "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt" }, [
                    createVNode("code", null, "buildRequestJWT()")
                  ]),
                  createTextVNode(" helper from the FAPI page, passing "),
                  createVNode("code", null, "openid insurance"),
                  createTextVNode(" as the scope. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step2Tabs }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Store the code_verifier"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Save "),
                    createVNode("code", null, "codeVerifier"),
                    createTextVNode(" in your server-side session or an "),
                    createVNode("code", null, "httpOnly"),
                    createTextVNode(" cookie. You will need it in "),
                    createVNode("a", { href: "#step-7-post-token-authorization-code" }, "Step 7"),
                    createTextVNode(" to exchange the authorization code for tokens. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/request-jwt" }, "Preparing the Request JWT"),
                  createTextVNode(" for the full JWT claim reference and PKCE helpers. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-3-client-assertion",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "POST /par · Step 3 — Creating a Client Assertion",
        title: "Prove the application's identity to the API Hub",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Every call to the API Hub (Authorisation Server) requires a <strong data-v-e8696d7f${_scopeId2}>client assertion</strong> — a short-lived signed JWT that proves your application&#39;s identity in place of a client secret. Use the <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>signJWT()</code></a> helper from the FAPI Message Signing page: `);
                } else {
                  return [
                    createTextVNode(" Every call to the API Hub (Authorisation Server) requires a "),
                    createVNode("strong", null, "client assertion"),
                    createTextVNode(" — a short-lived signed JWT that proves your application's identity in place of a client secret. Use the "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" }, [
                      createVNode("code", null, "signJWT()")
                    ]),
                    createTextVNode(" helper from the FAPI Message Signing page: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step3Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/tokens/#generating-a-client-assertion" data-v-e8696d7f${_scopeId2}>Tokens &amp; Assertions</a> for the full claims reference and <a href="/tech/tpp-standards/security/tokens/client-assertion" data-v-e8696d7f${_scopeId2}>Preparing Your Client Assertion</a> for a step-by-step walkthrough. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/#generating-a-client-assertion" }, "Tokens & Assertions"),
                    createTextVNode(" for the full claims reference and "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Preparing Your Client Assertion"),
                    createTextVNode(" for a step-by-step walkthrough. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Every call to the API Hub (Authorisation Server) requires a "),
                  createVNode("strong", null, "client assertion"),
                  createTextVNode(" — a short-lived signed JWT that proves your application's identity in place of a client secret. Use the "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt" }, [
                    createVNode("code", null, "signJWT()")
                  ]),
                  createTextVNode(" helper from the FAPI Message Signing page: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step3Tabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/#generating-a-client-assertion" }, "Tokens & Assertions"),
                  createTextVNode(" for the full claims reference and "),
                  createVNode("a", { href: "/tech/tpp-standards/security/tokens/client-assertion" }, "Preparing Your Client Assertion"),
                  createTextVNode(" for a step-by-step walkthrough. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-4-par-request",
        num: "06",
        color: "var(--at-teal)",
        eyebrow: "POST /par · Step 4 — Sending the /par Request",
        title: "Push the request to the API Hub",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` With your signed Request JWT and client assertion ready, POST both to the API Hub&#39;s <code data-v-e8696d7f${_scopeId2}>/par</code> endpoint. The connection must use your <strong data-v-e8696d7f${_scopeId2}>mTLS transport certificate</strong>. `);
                } else {
                  return [
                    createTextVNode(" With your signed Request JWT and client assertion ready, POST both to the API Hub's "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" endpoint. The connection must use your "),
                    createVNode("strong", null, "mTLS transport certificate"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Include <code data-v-e8696d7f${_scopeId2}>x-fapi-interaction-id</code> — a UUID v4 you generate per request. The API Hub echoes it in the response, enabling end-to-end traceability. See <a href="/tech/tpp-standards/security/request-headers" data-v-e8696d7f${_scopeId2}>Request Headers</a> for the full header reference. `);
                } else {
                  return [
                    createTextVNode(" Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" — a UUID v4 you generate per request. The API Hub echoes it in the response, enabling end-to-end traceability. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(" for the full header reference. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step4Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "mTLS transport certificate"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e8696d7f${_scopeId2}> You must present your <strong data-v-e8696d7f${_scopeId2}>transport certificate</strong> on every connection to the API Hub and resource APIs. In Node.js, configure an <code data-v-e8696d7f${_scopeId2}>https.Agent</code> with your PEM certificate and private key. See <a href="/tech/tpp-standards/trust-framework/certificates" data-v-e8696d7f${_scopeId2}>Certificates</a> for how to obtain and configure your transport certificate. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" You must present your "),
                      createVNode("strong", null, "transport certificate"),
                      createTextVNode(" on every connection to the API Hub and resource APIs. In Node.js, configure an "),
                      createVNode("code", null, "https.Agent"),
                      createTextVNode(" with your PEM certificate and private key. See "),
                      createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Certificates"),
                      createTextVNode(" for how to obtain and configure your transport certificate. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The <code data-v-e8696d7f${_scopeId2}>/par</code> response contains:`);
                } else {
                  return [
                    createTextVNode("The "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" response contains:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Field</th><th data-v-e8696d7f${_scopeId2}>Description</th><th data-v-e8696d7f${_scopeId2}>Example</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>request_uri</code></td><td data-v-e8696d7f${_scopeId2}>A single-use reference to your pushed authorization request</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>urn:ietf:params:oauth:request-uri:bwc4JDpSd7</code></td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>expires_in</code></td><td data-v-e8696d7f${_scopeId2}>Seconds until the <code data-v-e8696d7f${_scopeId2}>request_uri</code> expires — redirect the user before this window closes</td><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>90</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "request_uri")
                          ]),
                          createVNode("td", null, "A single-use reference to your pushed authorization request"),
                          createVNode("td", null, [
                            createVNode("code", null, "urn:ietf:params:oauth:request-uri:bwc4JDpSd7")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "expires_in")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("Seconds until the "),
                            createVNode("code", null, "request_uri"),
                            createTextVNode(" expires — redirect the user before this window closes")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "90")
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
                  createTextVNode(" With your signed Request JWT and client assertion ready, POST both to the API Hub's "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" endpoint. The connection must use your "),
                  createVNode("strong", null, "mTLS transport certificate"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" — a UUID v4 you generate per request. The API Hub echoes it in the response, enabling end-to-end traceability. See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                  createTextVNode(" for the full header reference. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step4Tabs }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "mTLS transport certificate"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" You must present your "),
                    createVNode("strong", null, "transport certificate"),
                    createTextVNode(" on every connection to the API Hub and resource APIs. In Node.js, configure an "),
                    createVNode("code", null, "https.Agent"),
                    createTextVNode(" with your PEM certificate and private key. See "),
                    createVNode("a", { href: "/tech/tpp-standards/trust-framework/certificates" }, "Certificates"),
                    createTextVNode(" for how to obtain and configure your transport certificate. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" response contains:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "request_uri")
                        ]),
                        createVNode("td", null, "A single-use reference to your pushed authorization request"),
                        createVNode("td", null, [
                          createVNode("code", null, "urn:ietf:params:oauth:request-uri:bwc4JDpSd7")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "expires_in")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("Seconds until the "),
                          createVNode("code", null, "request_uri"),
                          createTextVNode(" expires — redirect the user before this window closes")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "90")
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
        id: "step-5-authorization-url",
        num: "07",
        color: "var(--at-gold)",
        eyebrow: "Redirecting the User · Step 5 — Building the Authorization URL",
        title: "Send the user to the LFI to authenticate",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use the <code data-v-e8696d7f${_scopeId2}>request_uri</code> returned by <code data-v-e8696d7f${_scopeId2}>/par</code> to build the redirect URL. The <code data-v-e8696d7f${_scopeId2}>authorization_endpoint</code> is found in the LFI&#39;s <code data-v-e8696d7f${_scopeId2}>.well-known/openid-configuration</code> — not constructed from the issuer URL directly. All authorization parameters are already inside the signed Request JWT, so the only query parameters needed are <code data-v-e8696d7f${_scopeId2}>client_id</code>, <code data-v-e8696d7f${_scopeId2}>response_type</code>, and <code data-v-e8696d7f${_scopeId2}>request_uri</code>. `);
                } else {
                  return [
                    createTextVNode(" Use the "),
                    createVNode("code", null, "request_uri"),
                    createTextVNode(" returned by "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" to build the redirect URL. The "),
                    createVNode("code", null, "authorization_endpoint"),
                    createTextVNode(" is found in the LFI's "),
                    createVNode("code", null, ".well-known/openid-configuration"),
                    createTextVNode(" — not constructed from the issuer URL directly. All authorization parameters are already inside the signed Request JWT, so the only query parameters needed are "),
                    createVNode("code", null, "client_id"),
                    createTextVNode(", "),
                    createVNode("code", null, "response_type"),
                    createTextVNode(", and "),
                    createVNode("code", null, "request_uri"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step5Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "User Experience"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e8696d7f${_scopeId2}> See <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/user-journeys" data-v-e8696d7f${_scopeId2}>User Experience</a> for screen mockups of the <strong data-v-e8696d7f${_scopeId2}>Consent</strong> and <strong data-v-e8696d7f${_scopeId2}>Authorization</strong> pages the user sees at their insurer, including the per-sector permission previews. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" See "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/user-journeys" }, "User Experience"),
                      createTextVNode(" for screen mockups of the "),
                      createVNode("strong", null, "Consent"),
                      createTextVNode(" and "),
                      createVNode("strong", null, "Authorization"),
                      createTextVNode(" pages the user sees at their insurer, including the per-sector permission previews. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`After redirecting, the user will:`);
                } else {
                  return [
                    createTextVNode("After redirecting, the user will:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e8696d7f${_scopeId2}>Authenticate with their insurer.</li><li data-v-e8696d7f${_scopeId2}>Review the consent — sectors, policies, permissions, and expiry — on the insurer&#39;s authorization screen.</li><li data-v-e8696d7f${_scopeId2}>Approve or decline.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Authenticate with their insurer."),
                    createVNode("li", null, "Review the consent — sectors, policies, permissions, and expiry — on the insurer's authorization screen."),
                    createVNode("li", null, "Approve or decline.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Use the "),
                  createVNode("code", null, "request_uri"),
                  createTextVNode(" returned by "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" to build the redirect URL. The "),
                  createVNode("code", null, "authorization_endpoint"),
                  createTextVNode(" is found in the LFI's "),
                  createVNode("code", null, ".well-known/openid-configuration"),
                  createTextVNode(" — not constructed from the issuer URL directly. All authorization parameters are already inside the signed Request JWT, so the only query parameters needed are "),
                  createVNode("code", null, "client_id"),
                  createTextVNode(", "),
                  createVNode("code", null, "response_type"),
                  createTextVNode(", and "),
                  createVNode("code", null, "request_uri"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step5Tabs }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "User Experience"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/user-journeys" }, "User Experience"),
                    createTextVNode(" for screen mockups of the "),
                    createVNode("strong", null, "Consent"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "Authorization"),
                    createTextVNode(" pages the user sees at their insurer, including the per-sector permission previews. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("After redirecting, the user will:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Authenticate with their insurer."),
                  createVNode("li", null, "Review the consent — sectors, policies, permissions, and expiry — on the insurer's authorization screen."),
                  createVNode("li", null, "Approve or decline.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-6-extract-code",
        num: "08",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Handling the Callback · Step 6 — Extracting the Authorization Code",
        title: "Validate state and issuer on the redirect",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` After the user approves, the insurer redirects them back to your <code data-v-e8696d7f${_scopeId2}>redirect_uri</code>. The callback includes an authorization <code data-v-e8696d7f${_scopeId2}>code</code>, the <code data-v-e8696d7f${_scopeId2}>state</code> you sent in your Request JWT, and the <code data-v-e8696d7f${_scopeId2}>iss</code> (issuer) of the API Hub Authorisation Server: `);
                } else {
                  return [
                    createTextVNode(" After the user approves, the insurer redirects them back to your "),
                    createVNode("code", null, "redirect_uri"),
                    createTextVNode(". The callback includes an authorization "),
                    createVNode("code", null, "code"),
                    createTextVNode(", the "),
                    createVNode("code", null, "state"),
                    createTextVNode(" you sent in your Request JWT, and the "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" (issuer) of the API Hub Authorisation Server: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: callbackUrl,
              lang: "plaintext",
              filename: "callback URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Extract all three parameters and validate <code data-v-e8696d7f${_scopeId2}>state</code> and <code data-v-e8696d7f${_scopeId2}>iss</code> before proceeding: `);
                } else {
                  return [
                    createTextVNode(" Extract all three parameters and validate "),
                    createVNode("code", null, "state"),
                    createTextVNode(" and "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" before proceeding: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step6Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See <a href="/tech/tpp-standards/security/fapi/handling-callback" data-v-e8696d7f${_scopeId2}>Handling Authorization Callbacks</a> for a full guide on security best practices including issuer verification, replay prevention, and keeping callback logic minimal. `);
                } else {
                  return [
                    createTextVNode(" See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
                    createTextVNode(" for a full guide on security best practices including issuer verification, replay prevention, and keeping callback logic minimal. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" After the user approves, the insurer redirects them back to your "),
                  createVNode("code", null, "redirect_uri"),
                  createTextVNode(". The callback includes an authorization "),
                  createVNode("code", null, "code"),
                  createTextVNode(", the "),
                  createVNode("code", null, "state"),
                  createTextVNode(" you sent in your Request JWT, and the "),
                  createVNode("code", null, "iss"),
                  createTextVNode(" (issuer) of the API Hub Authorisation Server: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: callbackUrl,
                lang: "plaintext",
                filename: "callback URL"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Extract all three parameters and validate "),
                  createVNode("code", null, "state"),
                  createTextVNode(" and "),
                  createVNode("code", null, "iss"),
                  createTextVNode(" before proceeding: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step6Tabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
                  createTextVNode(" for a full guide on security best practices including issuer verification, replay prevention, and keeping callback logic minimal. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-7-post-token-authorization-code",
        num: "09",
        color: "var(--at-navy)",
        eyebrow: "Exchanging the Code for Tokens · Step 7 — POST /token (Authorization Code)",
        title: "Swap the auth code for an access and refresh token",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e8696d7f${_scopeId}><span class="http-badge http-post" data-v-e8696d7f${_scopeId}>POST</span><code class="ed-doc__endpoint-path" data-v-e8696d7f${_scopeId}>/token</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Exchange the authorization code for an access token and refresh token. Include the <code data-v-e8696d7f${_scopeId2}>code_verifier</code> from Step 2 — the API Hub will verify it against the <code data-v-e8696d7f${_scopeId2}>code_challenge</code> in your Request JWT before issuing tokens. `);
                } else {
                  return [
                    createTextVNode(" Exchange the authorization code for an access token and refresh token. Include the "),
                    createVNode("code", null, "code_verifier"),
                    createTextVNode(" from Step 2 — the API Hub will verify it against the "),
                    createVNode("code", null, "code_challenge"),
                    createTextVNode(" in your Request JWT before issuing tokens. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step7Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Store both tokens securely. The <strong data-v-e8696d7f${_scopeId2}>access token</strong> expires in <strong data-v-e8696d7f${_scopeId2}>10 minutes</strong>; the <strong data-v-e8696d7f${_scopeId2}>refresh token</strong> remains valid for the lifetime of the consent. `);
                } else {
                  return [
                    createTextVNode(" Store both tokens securely. The "),
                    createVNode("strong", null, "access token"),
                    createTextVNode(" expires in "),
                    createVNode("strong", null, "10 minutes"),
                    createTextVNode("; the "),
                    createVNode("strong", null, "refresh token"),
                    createTextVNode(" remains valid for the lifetime of the consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Token storage"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e8696d7f${_scopeId2}> Never store tokens in <code data-v-e8696d7f${_scopeId2}>localStorage</code>. Use <code data-v-e8696d7f${_scopeId2}>httpOnly</code> cookies or a server-side session store. See <a href="/tech/tpp-standards/security/tokens/" data-v-e8696d7f${_scopeId2}>Tokens &amp; Assertions</a> for the full token lifecycle and expiry guidance. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Never store tokens in "),
                      createVNode("code", null, "localStorage"),
                      createTextVNode(". Use "),
                      createVNode("code", null, "httpOnly"),
                      createTextVNode(" cookies or a server-side session store. See "),
                      createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
                      createTextVNode(" for the full token lifecycle and expiry guidance. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/token")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Exchange the authorization code for an access token and refresh token. Include the "),
                  createVNode("code", null, "code_verifier"),
                  createTextVNode(" from Step 2 — the API Hub will verify it against the "),
                  createVNode("code", null, "code_challenge"),
                  createTextVNode(" in your Request JWT before issuing tokens. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step7Tabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Store both tokens securely. The "),
                  createVNode("strong", null, "access token"),
                  createTextVNode(" expires in "),
                  createVNode("strong", null, "10 minutes"),
                  createTextVNode("; the "),
                  createVNode("strong", null, "refresh token"),
                  createTextVNode(" remains valid for the lifetime of the consent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Token storage"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Never store tokens in "),
                    createVNode("code", null, "localStorage"),
                    createTextVNode(". Use "),
                    createVNode("code", null, "httpOnly"),
                    createTextVNode(" cookies or a server-side session store. See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
                    createTextVNode(" for the full token lifecycle and expiry guidance. ")
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
        id: "step-8-get-policies",
        num: "10",
        color: "var(--at-teal-deep)",
        eyebrow: "Calling the Policy APIs · Step 8 — GET /{type}-insurance-policies",
        title: "Retrieve the consented policies for a sector",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e8696d7f${_scopeId}><span class="http-badge http-get" data-v-e8696d7f${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-e8696d7f${_scopeId}>/{type}-insurance-policies</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` With a valid access token, retrieve all policies of a given sector the user consented to share. The endpoint is the same shape for every sector — substitute the sector slug (<code data-v-e8696d7f${_scopeId2}>employment</code>, <code data-v-e8696d7f${_scopeId2}>health</code>, <code data-v-e8696d7f${_scopeId2}>home</code>, <code data-v-e8696d7f${_scopeId2}>life</code>, <code data-v-e8696d7f${_scopeId2}>motor</code>, <code data-v-e8696d7f${_scopeId2}>renters</code>, <code data-v-e8696d7f${_scopeId2}>travel</code>) into the path. Include <code data-v-e8696d7f${_scopeId2}>x-fapi-interaction-id</code> on every request, and when the customer is present also send <code data-v-e8696d7f${_scopeId2}>x-fapi-customer-ip-address</code>, <code data-v-e8696d7f${_scopeId2}>x-customer-user-agent</code>, and <code data-v-e8696d7f${_scopeId2}>x-fapi-auth-date</code>. See <a href="/tech/tpp-standards/security/request-headers" data-v-e8696d7f${_scopeId2}>Request Headers</a>. `);
                } else {
                  return [
                    createTextVNode(" With a valid access token, retrieve all policies of a given sector the user consented to share. The endpoint is the same shape for every sector — substitute the sector slug ("),
                    createVNode("code", null, "employment"),
                    createTextVNode(", "),
                    createVNode("code", null, "health"),
                    createTextVNode(", "),
                    createVNode("code", null, "home"),
                    createTextVNode(", "),
                    createVNode("code", null, "life"),
                    createTextVNode(", "),
                    createVNode("code", null, "motor"),
                    createTextVNode(", "),
                    createVNode("code", null, "renters"),
                    createTextVNode(", "),
                    createVNode("code", null, "travel"),
                    createTextVNode(") into the path. Include "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" on every request, and when the customer is present also send "),
                    createVNode("code", null, "x-fapi-customer-ip-address"),
                    createTextVNode(", "),
                    createVNode("code", null, "x-customer-user-agent"),
                    createTextVNode(", and "),
                    createVNode("code", null, "x-fapi-auth-date"),
                    createTextVNode(". See "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step8Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "No pagination"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e8696d7f${_scopeId2}> Insurance policy endpoints return the full set of consented policies for the named sector in a single response. There is no <code data-v-e8696d7f${_scopeId2}>page</code> query parameter, and <code data-v-e8696d7f${_scopeId2}>Meta</code> does not carry <code data-v-e8696d7f${_scopeId2}>TotalPages</code> or <code data-v-e8696d7f${_scopeId2}>TotalRecords</code>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Insurance policy endpoints return the full set of consented policies for the named sector in a single response. There is no "),
                      createVNode("code", null, "page"),
                      createTextVNode(" query parameter, and "),
                      createVNode("code", null, "Meta"),
                      createTextVNode(" does not carry "),
                      createVNode("code", null, "TotalPages"),
                      createTextVNode(" or "),
                      createVNode("code", null, "TotalRecords"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Repeat the call once per sector the consent grants — one for each <code data-v-e8696d7f${_scopeId2}>InsuranceType</code> in the <code data-v-e8696d7f${_scopeId2}>Permissions</code> array. See the OpenAPI reference for every sector under <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/" data-v-e8696d7f${_scopeId2}>Insurance Data Sharing</a>. `);
                } else {
                  return [
                    createTextVNode(" Repeat the call once per sector the consent grants — one for each "),
                    createVNode("code", null, "InsuranceType"),
                    createTextVNode(" in the "),
                    createVNode("code", null, "Permissions"),
                    createTextVNode(" array. See the OpenAPI reference for every sector under "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/" }, "Insurance Data Sharing"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/{type}-insurance-policies")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" With a valid access token, retrieve all policies of a given sector the user consented to share. The endpoint is the same shape for every sector — substitute the sector slug ("),
                  createVNode("code", null, "employment"),
                  createTextVNode(", "),
                  createVNode("code", null, "health"),
                  createTextVNode(", "),
                  createVNode("code", null, "home"),
                  createTextVNode(", "),
                  createVNode("code", null, "life"),
                  createTextVNode(", "),
                  createVNode("code", null, "motor"),
                  createTextVNode(", "),
                  createVNode("code", null, "renters"),
                  createTextVNode(", "),
                  createVNode("code", null, "travel"),
                  createTextVNode(") into the path. Include "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" on every request, and when the customer is present also send "),
                  createVNode("code", null, "x-fapi-customer-ip-address"),
                  createTextVNode(", "),
                  createVNode("code", null, "x-customer-user-agent"),
                  createTextVNode(", and "),
                  createVNode("code", null, "x-fapi-auth-date"),
                  createTextVNode(". See "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step8Tabs }),
              createVNode(_component_EdNote, {
                type: "info",
                title: "No pagination"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Insurance policy endpoints return the full set of consented policies for the named sector in a single response. There is no "),
                    createVNode("code", null, "page"),
                    createTextVNode(" query parameter, and "),
                    createVNode("code", null, "Meta"),
                    createTextVNode(" does not carry "),
                    createVNode("code", null, "TotalPages"),
                    createTextVNode(" or "),
                    createVNode("code", null, "TotalRecords"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Repeat the call once per sector the consent grants — one for each "),
                  createVNode("code", null, "InsuranceType"),
                  createTextVNode(" in the "),
                  createVNode("code", null, "Permissions"),
                  createTextVNode(" array. See the OpenAPI reference for every sector under "),
                  createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/" }, "Insurance Data Sharing"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "step-9-get-policy-detail",
        num: "11",
        color: "var(--at-teal)",
        eyebrow: "Calling the Policy APIs · Step 9 — GET /{type}-insurance-policies/{InsurancePolicyId}",
        title: "Fetch detailed information for a specific policy",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-doc__endpoint" data-v-e8696d7f${_scopeId}><span class="http-badge http-get" data-v-e8696d7f${_scopeId}>GET</span><code class="ed-doc__endpoint-path" data-v-e8696d7f${_scopeId}>/{type}-insurance-policies/{InsurancePolicyId}</code></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Use an <code data-v-e8696d7f${_scopeId2}>InsurancePolicyId</code> returned in Step 8 to fetch the detailed policy — cover, riders, claims, premium, and beneficiaries. Each field set requires the matching permission in the consented sector. Apply the same FAPI headers as Step 8. `);
                } else {
                  return [
                    createTextVNode(" Use an "),
                    createVNode("code", null, "InsurancePolicyId"),
                    createTextVNode(" returned in Step 8 to fetch the detailed policy — cover, riders, claims, premium, and beneficiaries. Each field set requires the matching permission in the consented sector. Apply the same FAPI headers as Step 8. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step9Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Permissions and the data fields they unlock:`);
                } else {
                  return [
                    createTextVNode("Permissions and the data fields they unlock:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-e8696d7f${_scopeId2}><thead data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><th data-v-e8696d7f${_scopeId2}>Permission</th><th data-v-e8696d7f${_scopeId2}>Unlocks</th></tr></thead><tbody data-v-e8696d7f${_scopeId2}><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ReadInsurancePolicies</code></td><td data-v-e8696d7f${_scopeId2}>Core policy attributes — ID, number, status, dates, sums insured, coverage.</td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ReadCustomerBasic</code></td><td data-v-e8696d7f${_scopeId2}>Basic policy-holder identity and contact details.</td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ReadCustomerDetail</code></td><td data-v-e8696d7f${_scopeId2}>Full customer details, including additional verification fields.</td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ReadCustomerPaymentDetails</code></td><td data-v-e8696d7f${_scopeId2}>Customer payment methods recorded on the policy.</td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ReadInsuranceProduct</code></td><td data-v-e8696d7f${_scopeId2}>Underwritten product detail — cover type, features, terms, add-ons.</td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ReadCustomerClaims</code></td><td data-v-e8696d7f${_scopeId2}>Claims raised against the policy — status, dates, amounts.</td></tr><tr data-v-e8696d7f${_scopeId2}><td data-v-e8696d7f${_scopeId2}><code data-v-e8696d7f${_scopeId2}>ReadInsurancePremium</code></td><td data-v-e8696d7f${_scopeId2}>The <code data-v-e8696d7f${_scopeId2}>Premium</code> field. Returned as a JWE that the customer device decrypts — see <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" data-v-e8696d7f${_scopeId2}>Encrypted Premiums</a>.</td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Permission"),
                          createVNode("th", null, "Unlocks")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadInsurancePolicies")
                          ]),
                          createVNode("td", null, "Core policy attributes — ID, number, status, dates, sums insured, coverage.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadCustomerBasic")
                          ]),
                          createVNode("td", null, "Basic policy-holder identity and contact details.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadCustomerDetail")
                          ]),
                          createVNode("td", null, "Full customer details, including additional verification fields.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadCustomerPaymentDetails")
                          ]),
                          createVNode("td", null, "Customer payment methods recorded on the policy.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadInsuranceProduct")
                          ]),
                          createVNode("td", null, "Underwritten product detail — cover type, features, terms, add-ons.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadCustomerClaims")
                          ]),
                          createVNode("td", null, "Claims raised against the policy — status, dates, amounts.")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "ReadInsurancePremium")
                          ]),
                          createVNode("td", null, [
                            createTextVNode("The "),
                            createVNode("code", null, "Premium"),
                            createTextVNode(" field. Returned as a JWE that the customer device decrypts — see "),
                            createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                            createTextVNode(".")
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
              type: "warning",
              title: "Premium is encrypted in transit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e8696d7f${_scopeId2}> When the consent grants <code data-v-e8696d7f${_scopeId2}>ReadInsurancePremium</code>, the <code data-v-e8696d7f${_scopeId2}>Premium</code> field on the policy is returned as a compact JWE string. The TPP server MUST NOT decrypt it — forward it to the customer’s device, where it is unwrapped. Full walkthrough: <a href="/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" data-v-e8696d7f${_scopeId2}>Encrypted Premiums</a>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" When the consent grants "),
                      createVNode("code", null, "ReadInsurancePremium"),
                      createTextVNode(", the "),
                      createVNode("code", null, "Premium"),
                      createTextVNode(" field on the policy is returned as a compact JWE string. The TPP server MUST NOT decrypt it — forward it to the customer’s device, where it is unwrapped. Full walkthrough: "),
                      createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("code", { class: "ed-doc__endpoint-path" }, "/{type}-insurance-policies/{InsurancePolicyId}")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Use an "),
                  createVNode("code", null, "InsurancePolicyId"),
                  createTextVNode(" returned in Step 8 to fetch the detailed policy — cover, riders, claims, premium, and beneficiaries. Each field set requires the matching permission in the consented sector. Apply the same FAPI headers as Step 8. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step9Tabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Permissions and the data fields they unlock:")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Permission"),
                        createVNode("th", null, "Unlocks")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadInsurancePolicies")
                        ]),
                        createVNode("td", null, "Core policy attributes — ID, number, status, dates, sums insured, coverage.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadCustomerBasic")
                        ]),
                        createVNode("td", null, "Basic policy-holder identity and contact details.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadCustomerDetail")
                        ]),
                        createVNode("td", null, "Full customer details, including additional verification fields.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadCustomerPaymentDetails")
                        ]),
                        createVNode("td", null, "Customer payment methods recorded on the policy.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadInsuranceProduct")
                        ]),
                        createVNode("td", null, "Underwritten product detail — cover type, features, terms, add-ons.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadCustomerClaims")
                        ]),
                        createVNode("td", null, "Claims raised against the policy — status, dates, amounts.")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "ReadInsurancePremium")
                        ]),
                        createVNode("td", null, [
                          createTextVNode("The "),
                          createVNode("code", null, "Premium"),
                          createTextVNode(" field. Returned as a JWE that the customer device decrypts — see "),
                          createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
                          createTextVNode(".")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Premium is encrypted in transit"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" When the consent grants "),
                    createVNode("code", null, "ReadInsurancePremium"),
                    createTextVNode(", the "),
                    createVNode("code", null, "Premium"),
                    createTextVNode(" field on the policy is returned as a compact JWE string. The TPP server MUST NOT decrypt it — forward it to the customer’s device, where it is unwrapped. Full walkthrough: "),
                    createVNode("a", { href: "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums" }, "Encrypted Premiums"),
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
        id: "step-10-refreshing-the-access-token",
        num: "12",
        color: "var(--at-gold)",
        eyebrow: "Refresh Token Flow · Step 10 — Refreshing the Access Token",
        title: "Keep the session alive without re-authorisation",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Access tokens expire after <strong data-v-e8696d7f${_scopeId2}>10 minutes</strong>. Track the <code data-v-e8696d7f${_scopeId2}>expires_in</code> value returned by <code data-v-e8696d7f${_scopeId2}>/token</code> and refresh proactively rather than waiting for a <code data-v-e8696d7f${_scopeId2}>401 Unauthorized</code>. Each refresh requires a fresh client assertion. `);
                } else {
                  return [
                    createTextVNode(" Access tokens expire after "),
                    createVNode("strong", null, "10 minutes"),
                    createTextVNode(". Track the "),
                    createVNode("code", null, "expires_in"),
                    createTextVNode(" value returned by "),
                    createVNode("code", null, "/token"),
                    createTextVNode(" and refresh proactively rather than waiting for a "),
                    createVNode("code", null, "401 Unauthorized"),
                    createTextVNode(". Each refresh requires a fresh client assertion. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: step10Tabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Refresh token rotation"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e8696d7f${_scopeId2}> Always replace both <code data-v-e8696d7f${_scopeId2}>access_token</code> and <code data-v-e8696d7f${_scopeId2}>refresh_token</code> from the response. If the API Hub rotates refresh tokens, continuing to use the old one will return <code data-v-e8696d7f${_scopeId2}>400 invalid_grant</code>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" Always replace both "),
                      createVNode("code", null, "access_token"),
                      createTextVNode(" and "),
                      createVNode("code", null, "refresh_token"),
                      createTextVNode(" from the response. If the API Hub rotates refresh tokens, continuing to use the old one will return "),
                      createVNode("code", null, "400 invalid_grant"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The refresh token remains valid until the consent&#39;s <code data-v-e8696d7f${_scopeId2}>ExpirationDateTime</code>. Once expired, the user must go through the full authorization flow again — send a new <code data-v-e8696d7f${_scopeId2}>/par</code> request with a new <code data-v-e8696d7f${_scopeId2}>ConsentId</code>. `);
                } else {
                  return [
                    createTextVNode(" The refresh token remains valid until the consent's "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(". Once expired, the user must go through the full authorization flow again — send a new "),
                    createVNode("code", null, "/par"),
                    createTextVNode(" request with a new "),
                    createVNode("code", null, "ConsentId"),
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
                  createTextVNode(" Access tokens expire after "),
                  createVNode("strong", null, "10 minutes"),
                  createTextVNode(". Track the "),
                  createVNode("code", null, "expires_in"),
                  createTextVNode(" value returned by "),
                  createVNode("code", null, "/token"),
                  createTextVNode(" and refresh proactively rather than waiting for a "),
                  createVNode("code", null, "401 Unauthorized"),
                  createTextVNode(". Each refresh requires a fresh client assertion. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: step10Tabs }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Refresh token rotation"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" Always replace both "),
                    createVNode("code", null, "access_token"),
                    createTextVNode(" and "),
                    createVNode("code", null, "refresh_token"),
                    createTextVNode(" from the response. If the API Hub rotates refresh tokens, continuing to use the old one will return "),
                    createVNode("code", null, "400 invalid_grant"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The refresh token remains valid until the consent's "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(". Once expired, the user must go through the full authorization flow again — send a new "),
                  createVNode("code", null, "/par"),
                  createTextVNode(" request with a new "),
                  createVNode("code", null, "ConsentId"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e8696d7f"]]);
export {
  index as default
};
