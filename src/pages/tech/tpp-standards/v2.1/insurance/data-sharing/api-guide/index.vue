<route lang="yaml">
meta:
  title: Insurance Data Sharing — API Guide
  isIndex: true
</route>

<script setup lang="ts">
const exampleAuthDetails = `"authorization_details": [
  {
    "type": "urn:openfinanceuae:insurance-consent:v2.1",
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
`

const step2Node = `import crypto from 'node:crypto'
import { generateCodeVerifier, deriveCodeChallenge } from './pkce'    // from FAPI page
import { buildRequestJWT } from './request-jwt'                        // from FAPI page

// 1. Generate PKCE pair — store codeVerifier in your session before redirecting
const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

// 2. Define the authorization_details for this consent
const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:insurance-consent:v2.1',
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
`

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
        "type": "urn:openfinanceuae:insurance-consent:v2.1",
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
`

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
`

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
`

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
`

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
`

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
`

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
`

const callbackUrl = `https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`

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
`

const step6Python = `from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
code  = params["code"][0]
state = params["state"][0]
iss   = params["iss"][0]

if state != stored_state:
    raise ValueError("State mismatch — possible CSRF attack. Abort the flow.")
if iss != ISSUER:
    raise ValueError(f"Unexpected issuer: {iss}")
`

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
`

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
`

const step8Node = `import crypto from 'node:crypto'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!  // resource server base URL from .well-known

// Substitute the sector the customer consented to — employment, health, home,
// life, motor, renters, or travel.
const policiesResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/insurance/v2.1/motor-insurance-policies\`,
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
`

const step8Python = `import uuid

# Substitute the sector the customer consented to — employment, health, home,
# life, motor, renters, or travel.
policies_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/insurance/v2.1/motor-insurance-policies",
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
`

const step9Node = `const policyResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/insurance/v2.1/motor-insurance-policies/\${insurancePolicyId}\`,
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
`

const step9Python = `policy_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/insurance/v2.1/motor-insurance-policies/{insurance_policy_id}",
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
`

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
`

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
`

const step2Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step2Node },  { label: 'Python', lang: 'python', code: step2Python }] as const
const step3Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step3Node },  { label: 'Python', lang: 'python', code: step3Python }] as const
const step4Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step4Node },  { label: 'Python', lang: 'python', code: step4Python }] as const
const step5Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step5Node },  { label: 'Python', lang: 'python', code: step5Python }] as const
const step6Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step6Node },  { label: 'Python', lang: 'python', code: step6Python }] as const
const step7Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step7Node },  { label: 'Python', lang: 'python', code: step7Python }] as const
const step8Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step8Node },  { label: 'Python', lang: 'python', code: step8Python }] as const
const step9Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step9Node },  { label: 'Python', lang: 'python', code: step9Python }] as const
const step10Tabs = [{ label: 'Node.js', lang: 'typescript', code: step10Node }, { label: 'Python', lang: 'python', code: step10Python }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP &middot; Insurance &middot; Data Sharing
        </div>
        <h1 class="ed-doc__title">
          Insurance Data Sharing &mdash; API Guide
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Create an Insurance Data Sharing consent, redirect the user to authenticate at their LFI, exchange
          the authorization code for tokens, and call the policy APIs &mdash; an end-to-end walkthrough of
          the customer-present insurance data-sharing flow.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before creating a consent"
      tone="cream"
    >
      <EdProse>
        Before creating an Insurance Data Sharing consent, ensure the following requirements are met:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the
          <strong>ISP role</strong> as defined in
          <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Transport Certificate</a></strong>
          &mdash; an active transport certificate must be issued and registered in the Trust Framework to
          establish secure <strong>mTLS communication</strong>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Signing Certificate</a></strong>
          &mdash; an active signing certificate must be issued and registered in the Trust Framework. This
          certificate is used to sign request objects and client assertions.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Encryption Certificate</a></strong>
          &mdash; required to decrypt the <code>Premium</code> JWE when the customer has granted
          <code>ReadInsurancePremium</code>. See
          <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/premiums">Encrypted Premiums</a>.
        </li>
        <li>
          <strong>Registration with the relevant <a href="/tech/tpp-standards/registration/api-guide">API Hub (Authorisation Server)</a></strong>
          &mdash; the application must be registered with the API Hub (Server) of the LFI for which you
          intend to create an Insurance Data Sharing consent.
        </li>
        <li>
          <strong>Understanding of the <a href="/tech/tpp-standards/security/fapi/">FAPI Security Profile</a></strong>
          and <strong><a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a></strong>
          &mdash; you should understand how request object signing, client authentication, and access
          token validation underpin secure API interactions.
        </li>
        <li>
          <strong>Understanding of <a href="/tech/tpp-standards/v2.1/consent/">Consents</a></strong>
          &mdash; you should understand how to create, retrieve, and manage consents, including consent
          states and lifecycle transitions.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Insurance Data Sharing"
      tone="surface"
    >
      <APIFlowViewer title="Insurance Data Sharing API Flow">
        <APIFlowsInsuranceDataSharing />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="step-1-authorization-details"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="POST /par · Step 1 — Constructing Authorization Details"
      title="Build the consent payload"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/par</code>
      </div>

      <EdProse>
        To send a <code>/par</code> request, first we need to generate the <code>request JWT</code>. We do
        this by first constructing <code>authorization_details</code> of type
        (<code>urn:openfinanceuae:insurance-consent:v2.1</code>).
      </EdProse>

      <h3 class="ed-doc__subhead">authorization_details</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>type</code>*</td>
              <td>enum</td>
              <td>Must be <code>urn:openfinanceuae:insurance-consent:v2.1</code></td>
              <td><code>urn:openfinanceuae:insurance-consent:v2.1</code></td>
            </tr>
            <tr>
              <td><code>consent</code>*</td>
              <td>object</td>
              <td>Properties of the consent agreed by the User with the TPP. <em>Described below.</em></td>
              <td><em>Described below</em></td>
            </tr>
            <tr>
              <td><code>subscription</code></td>
              <td>object</td>
              <td>Optional subscription to Event Notifications, to be sent to the TPP Webhook Url. <em>Described below.</em></td>
              <td><em>Described below</em></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">consent (Required) | <code>authorization_details.consent</code></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ConsentId</code>*</td><td>string (uuid)</td><td>Unique ID assigned by the TPP (1–128 chars)</td><td><code>123e4567-e89b-12d3-a456-426614174001</code></td></tr>
            <tr><td><code>BaseConsentId</code></td><td>string (uuid)</td><td>Used when renewing or modifying an existing consent</td><td><code>123e4567-e89b-12d3-a456-426614174000</code></td></tr>
            <tr><td><code>Permissions</code>*</td><td>array&lt;object&gt;</td><td>One entry per insurance sector being consented &mdash; <em>described below</em></td><td><em>Described below</em></td></tr>
            <tr><td><code>ExpirationDateTime</code>*</td><td>date-time</td><td>Expiry date/time (ISO 8601 with timezone, max 1 year)</td><td><code>2025-11-03T15:46:00+00:00</code></td></tr>
            <tr><td><code>OpenFinanceBilling</code>*</td><td>object</td><td>Billing parameters specified by the TPP. <em>Described below.</em></td><td><em>Described below</em></td></tr>
            <tr><td><code>OnBehalfOf</code></td><td>object</td><td>Provided when TPP is acting for another regulated entity. <em>Described below.</em></td><td><em>Described below</em></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Permissions entry | <code>authorization_details.consent.Permissions[*]</code></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Allowed Values</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>InsuranceType</code>*</td>
              <td>enum</td>
              <td><code>Employment</code>, <code>Health</code>, <code>Home</code>, <code>Life</code>, <code>Motor</code>, <code>Renters</code>, <code>Travel</code></td>
            </tr>
            <tr>
              <td><code>Permissions</code>*</td>
              <td>array&lt;enum&gt;</td>
              <td><code>ReadInsurancePolicies</code>, <code>ReadCustomerBasic</code>, <code>ReadCustomerDetail</code>, <code>ReadCustomerPaymentDetails</code>, <code>ReadInsuranceProduct</code>, <code>ReadCustomerClaims</code>, <code>ReadInsurancePremium</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">OpenFinanceBilling (Required) | <code>authorization_details.consent.OpenFinanceBilling</code></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Allowed Values</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>UserType</code>*</td><td>enum</td><td><code>Retail</code>, <code>SME</code>, <code>Corporate</code></td><td><code>Retail</code></td></tr>
            <tr><td><code>Purpose</code>*</td><td>enum</td><td><code>AccountAggregation</code>, <code>RiskAssessment</code>, <code>TaxFiling</code>, <code>Onboarding</code>, <code>Verification</code>, <code>QuoteComparison</code>, <code>BudgetingAnalysis</code>, <code>FinancialAdvice</code>, <code>AuditReconciliation</code></td><td><code>QuoteComparison</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">OnBehalfOf (Optional) | <code>authorization_details.consent.OnBehalfOf</code></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>TradingName</code></td><td>string</td><td>Trading name if acting on behalf of another entity</td><td><code>Acme Ltd</code></td></tr>
            <tr><td><code>LegalName</code></td><td>string</td><td>Legal name of represented entity</td><td><code>Acme Legal Name</code></td></tr>
            <tr><td><code>IdentifierType</code></td><td>enum</td><td>Only <code>Other</code> currently supported</td><td><code>Other</code></td></tr>
            <tr><td><code>Identifier</code></td><td>string</td><td>Identifier value</td><td><code>9876543210</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">subscription (Optional) | <code>authorization_details.subscription</code></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Webhook</code>*</td><td>object</td><td><em>Described below.</em></td><td><em>Described below</em></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Webhook (Required) | <code>authorization_details.subscription.Webhook</code></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Url</code>*</td><td>string</td><td>HTTPS callback URL</td><td><code>https://tpp.example.com/webhook</code></td></tr>
            <tr><td><code>IsActive</code>*</td><td>boolean</td><td>Whether webhook is active</td><td><code>true</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Example request</h3>
      <EdProse>
        See an example of a valid <code>authorization_details</code> for
        <code>urn:openfinanceuae:insurance-consent:v2.1</code>:
      </EdProse>
      <EdCode :code="exampleAuthDetails" lang="json" filename="authorization_details" />
    </EdSectionBand>

    <EdSectionBand
      id="step-2-request-jwt"
      num="04"
      color="var(--at-navy)"
      eyebrow="POST /par · Step 2 — Constructing the Request JWT"
      title="Bind PKCE and authorization details into a signed JWT"
      tone="surface"
    >
      <EdProse>
        With your <code>authorization_details</code> ready, generate a PKCE code pair then use the
        <a href="/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt"><code>buildRequestJWT()</code></a>
        helper from the FAPI page, passing <code>openid insurance</code> as the scope.
      </EdProse>

      <EdCodeGroup :tabs="step2Tabs" />

      <EdNote type="tip" title="Store the code_verifier">
        <p>
          Save <code>codeVerifier</code> in your server-side session or an <code>httpOnly</code> cookie.
          You will need it in
          <a href="#step-7-post-token-authorization-code">Step 7</a> to exchange the authorization code
          for tokens.
        </p>
      </EdNote>

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/request-jwt">Preparing the Request JWT</a> for the
        full JWT claim reference and PKCE helpers.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-3-client-assertion"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="POST /par · Step 3 — Creating a Client Assertion"
      title="Prove the application's identity to the API Hub"
      tone="cream"
    >
      <EdProse>
        Every call to the API Hub (Authorisation Server) requires a <strong>client assertion</strong>
        &mdash; a short-lived signed JWT that proves your application's identity in place of a client
        secret. Use the
        <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt"><code>signJWT()</code></a>
        helper from the FAPI Message Signing page:
      </EdProse>

      <EdCodeGroup :tabs="step3Tabs" />

      <EdProse>
        See <a href="/tech/tpp-standards/security/tokens/#generating-a-client-assertion">Tokens &amp;
        Assertions</a> for the full claims reference and
        <a href="/tech/tpp-standards/security/tokens/client-assertion">Preparing Your Client Assertion</a>
        for a step-by-step walkthrough.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-4-par-request"
      num="06"
      color="var(--at-teal)"
      eyebrow="POST /par · Step 4 — Sending the /par Request"
      title="Push the request to the API Hub"
      tone="surface"
    >
      <EdProse>
        With your signed Request JWT and client assertion ready, POST both to the API Hub's
        <code>/par</code> endpoint. The connection must use your <strong>mTLS transport
        certificate</strong>.
      </EdProse>

      <EdProse>
        Include <code>x-fapi-interaction-id</code> &mdash; a UUID v4 you generate per request. The API Hub
        echoes it in the response, enabling end-to-end traceability. See
        <a href="/tech/tpp-standards/security/request-headers">Request Headers</a> for the full header
        reference.
      </EdProse>

      <EdCodeGroup :tabs="step4Tabs" />

      <EdNote type="info" title="mTLS transport certificate">
        <p>
          You must present your <strong>transport certificate</strong> on every connection to the API Hub
          and resource APIs. In Node.js, configure an <code>https.Agent</code> with your PEM certificate
          and private key. See <a href="/tech/tpp-standards/trust-framework/certificates">Certificates</a>
          for how to obtain and configure your transport certificate.
        </p>
      </EdNote>

      <EdProse>The <code>/par</code> response contains:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>request_uri</code></td><td>A single-use reference to your pushed authorization request</td><td><code>urn:ietf:params:oauth:request-uri:bwc4JDpSd7</code></td></tr>
            <tr><td><code>expires_in</code></td><td>Seconds until the <code>request_uri</code> expires &mdash; redirect the user before this window closes</td><td><code>90</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="step-5-authorization-url"
      num="07"
      color="var(--at-gold)"
      eyebrow="Redirecting the User · Step 5 — Building the Authorization URL"
      title="Send the user to the LFI to authenticate"
      tone="cream"
    >
      <EdProse>
        Use the <code>request_uri</code> returned by <code>/par</code> to build the redirect URL. The
        <code>authorization_endpoint</code> is found in the LFI's
        <code>.well-known/openid-configuration</code> &mdash; not constructed from the issuer URL
        directly. All authorization parameters are already inside the signed Request JWT, so the only
        query parameters needed are <code>client_id</code>, <code>response_type</code>, and
        <code>request_uri</code>.
      </EdProse>

      <EdCodeGroup :tabs="step5Tabs" />

      <EdNote type="tip" title="User Experience">
        <p>
          See <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/user-journeys">User Experience</a>
          for screen mockups of the <strong>Consent</strong> and <strong>Authorization</strong> pages the
          user sees at their insurer, including the per-sector permission previews.
        </p>
      </EdNote>

      <EdProse>After redirecting, the user will:</EdProse>
      <EdBullets>
        <li>Authenticate with their insurer.</li>
        <li>Review the consent &mdash; sectors, policies, permissions, and expiry &mdash; on the insurer's authorization screen.</li>
        <li>Approve or decline.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="step-6-extract-code"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Handling the Callback · Step 6 — Extracting the Authorization Code"
      title="Validate state and issuer on the redirect"
      tone="surface"
    >
      <EdProse>
        After the user approves, the insurer redirects them back to your <code>redirect_uri</code>. The
        callback includes an authorization <code>code</code>, the <code>state</code> you sent in your
        Request JWT, and the <code>iss</code> (issuer) of the API Hub Authorisation Server:
      </EdProse>

      <EdCode :code="callbackUrl" lang="plaintext" filename="callback URL" />

      <EdProse>
        Extract all three parameters and validate <code>state</code> and <code>iss</code> before
        proceeding:
      </EdProse>

      <EdCodeGroup :tabs="step6Tabs" />

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/handling-callback">Handling Authorization
        Callbacks</a> for a full guide on security best practices including issuer verification, replay
        prevention, and keeping callback logic minimal.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-7-post-token-authorization-code"
      num="09"
      color="var(--at-navy)"
      eyebrow="Exchanging the Code for Tokens · Step 7 — POST /token (Authorization Code)"
      title="Swap the auth code for an access and refresh token"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/token</code>
      </div>

      <EdProse>
        Exchange the authorization code for an access token and refresh token. Include the
        <code>code_verifier</code> from Step 2 &mdash; the API Hub will verify it against the
        <code>code_challenge</code> in your Request JWT before issuing tokens.
      </EdProse>

      <EdCodeGroup :tabs="step7Tabs" />

      <EdProse>
        Store both tokens securely. The <strong>access token</strong> expires in
        <strong>10 minutes</strong>; the <strong>refresh token</strong> remains valid for the lifetime
        of the consent.
      </EdProse>

      <EdNote type="tip" title="Token storage">
        <p>
          Never store tokens in <code>localStorage</code>. Use <code>httpOnly</code> cookies or a
          server-side session store. See
          <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a> for the full token
          lifecycle and expiry guidance.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-8-get-policies"
      num="10"
      color="var(--at-teal-deep)"
      eyebrow="Calling the Policy APIs · Step 8 — GET /{type}-insurance-policies"
      title="Retrieve the consented policies for a sector"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/{type}-insurance-policies</code>
      </div>

      <EdProse>
        With a valid access token, retrieve all policies of a given sector the user consented to share.
        The endpoint is the same shape for every sector &mdash; substitute the sector slug
        (<code>employment</code>, <code>health</code>, <code>home</code>, <code>life</code>,
        <code>motor</code>, <code>renters</code>, <code>travel</code>) into the path. Include
        <code>x-fapi-interaction-id</code> on every request, and when the customer is present also send
        <code>x-fapi-customer-ip-address</code>, <code>x-customer-user-agent</code>, and
        <code>x-fapi-auth-date</code>. See
        <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdCodeGroup :tabs="step8Tabs" />

      <EdNote type="info" title="No pagination">
        <p>
          Insurance policy endpoints return the full set of consented policies for the named sector in a
          single response. There is no <code>page</code> query parameter, and <code>Meta</code> does not
          carry <code>TotalPages</code> or <code>TotalRecords</code>.
        </p>
      </EdNote>

      <EdProse>
        Repeat the call once per sector the consent grants &mdash; one for each
        <code>InsuranceType</code> in the <code>Permissions</code> array. See the OpenAPI reference for
        every sector under
        <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/">Insurance Data Sharing</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-9-get-policy-detail"
      num="11"
      color="var(--at-teal)"
      eyebrow="Calling the Policy APIs · Step 9 — GET /{type}-insurance-policies/{InsurancePolicyId}"
      title="Fetch detailed information for a specific policy"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/{type}-insurance-policies/{InsurancePolicyId}</code>
      </div>

      <EdProse>
        Use an <code>InsurancePolicyId</code> returned in Step 8 to fetch the detailed policy &mdash;
        cover, riders, claims, premium, and beneficiaries. Each field set requires the matching
        permission in the consented sector. Apply the same FAPI headers as Step 8.
      </EdProse>

      <EdCodeGroup :tabs="step9Tabs" />

      <EdProse>Permissions and the data fields they unlock:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Permission</th><th>Unlocks</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ReadInsurancePolicies</code></td><td>Core policy attributes &mdash; ID, number, status, dates, sums insured, coverage.</td></tr>
            <tr><td><code>ReadCustomerBasic</code></td><td>Basic policy-holder identity and contact details.</td></tr>
            <tr><td><code>ReadCustomerDetail</code></td><td>Full customer details, including additional verification fields.</td></tr>
            <tr><td><code>ReadCustomerPaymentDetails</code></td><td>Customer payment methods recorded on the policy.</td></tr>
            <tr><td><code>ReadInsuranceProduct</code></td><td>Underwritten product detail &mdash; cover type, features, terms, add-ons.</td></tr>
            <tr><td><code>ReadCustomerClaims</code></td><td>Claims raised against the policy &mdash; status, dates, amounts.</td></tr>
            <tr><td><code>ReadInsurancePremium</code></td><td>The <code>Premium</code> field. Returned as a JWE that the customer device decrypts &mdash; see <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/premiums">Encrypted Premiums</a>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Premium is encrypted in transit">
        <p>
          When the consent grants <code>ReadInsurancePremium</code>, the <code>Premium</code> field on
          the policy is returned as a compact JWE string. The TPP server MUST NOT decrypt it &mdash;
          forward it to the customer&rsquo;s device, where it is unwrapped. Full walkthrough:
          <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/premiums">Encrypted Premiums</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-10-refreshing-the-access-token"
      num="12"
      color="var(--at-gold)"
      eyebrow="Refresh Token Flow · Step 10 — Refreshing the Access Token"
      title="Keep the session alive without re-authorisation"
      tone="surface"
    >
      <EdProse>
        Access tokens expire after <strong>10 minutes</strong>. Track the <code>expires_in</code> value
        returned by <code>/token</code> and refresh proactively rather than waiting for a
        <code>401 Unauthorized</code>. Each refresh requires a fresh client assertion.
      </EdProse>

      <EdCodeGroup :tabs="step10Tabs" />

      <EdNote type="warning" title="Refresh token rotation">
        <p>
          Always replace both <code>access_token</code> and <code>refresh_token</code> from the response.
          If the API Hub rotates refresh tokens, continuing to use the old one will return
          <code>400 invalid_grant</code>.
        </p>
      </EdNote>

      <EdProse>
        The refresh token remains valid until the consent's <code>ExpirationDateTime</code>. Once
        expired, the user must go through the full authorization flow again &mdash; send a new
        <code>/par</code> request with a new <code>ConsentId</code>.
      </EdProse>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 1.5rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
