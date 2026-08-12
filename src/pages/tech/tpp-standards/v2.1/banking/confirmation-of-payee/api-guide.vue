<route lang="yaml">
meta:
  title: Confirmation of Payee — API Guide
</route>

<script setup lang="ts">
const step2Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.ISSUER!   // from the LFI's .well-known/openid-configuration

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: ISSUER,
  jti: crypto.randomUUID(),
})
`

const step2Python = `import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER    = os.environ["ISSUER"]   # from the LFI's .well-known/openid-configuration

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": ISSUER,
    "jti": str(uuid.uuid4()),
})
`

const step3Node = `const TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT!  // from the LFI's .well-known/openid-configuration

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'confirmation-of-payee',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      clientAssertion,
})

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token: accessToken } = await tokenResponse.json()
`

const step3Python = `import httpx, os

TOKEN_ENDPOINT = os.environ["TOKEN_ENDPOINT"]  # from the LFI's .well-known/openid-configuration

token_response = httpx.post(
    TOKEN_ENDPOINT,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "confirmation-of-payee",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
`

const step4Node = `// CLIENT_ID and ISSUER already set in Step 2

const discoveryRequest = await signJWT({
  iss: CLIENT_ID,
  aud: ISSUER,
  jti: crypto.randomUUID(),
  message: {
    Data: {
      SchemeName:     'IBAN',
      Identification: 'AE070331234567890123456',   // IBAN to check
    },
  },
})
`

const step4Python = `# CLIENT_ID and ISSUER already set in Step 2

discovery_request = sign_jwt({
    "iss": CLIENT_ID,
    "aud": ISSUER,
    "jti": str(uuid.uuid4()),
    "message": {
        "Data": {
            "SchemeName":     "IBAN",
            "Identification": "AE070331234567890123456",   # IBAN to check
        }
    },
})
`

const step5Node = `const LFI_BASE_URL = process.env.LFI_BASE_URL!  // base URL of the LFI you authenticated with in Step 3
// accessToken obtained in Step 3

const discoveryResponse = await fetch(
  \`\${LFI_BASE_URL}/open-finance/confirmation-of-payee/v2.1/discovery\`,
  {
    method:  'POST',
    headers: {
      'Authorization':         \`Bearer \${accessToken}\`,
      'Content-Type':          'application/jwt',
      'Accept':                'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    body: discoveryRequest,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const discoveryJwt     = await discoveryResponse.text()
const [, discoveryB64] = discoveryJwt.split('.')
const { message }      = JSON.parse(Buffer.from(discoveryB64, 'base64url').toString())

const { DiscoveryEndpointUrl, ResourceServerUrl } = message.Data
`

const step5Python = `import httpx, base64, json, os

LFI_BASE_URL = os.environ["LFI_BASE_URL"]  # base URL of the LFI you authenticated with in Step 3
# access_token obtained in Step 3

discovery_response = httpx.post(
    f"{LFI_BASE_URL}/open-finance/confirmation-of-payee/v2.1/discovery",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "Content-Type":          "application/jwt",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    content=discovery_request,
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
discovery_jwt = discovery_response.text
payload_b64   = discovery_jwt.split(".")[1]
message       = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))["message"]

discovery_endpoint_url = message["Data"]["DiscoveryEndpointUrl"]
resource_server_url    = message["Data"]["ResourceServerUrl"]
`

const step6Node = `const oidcConfig    = await fetch(DiscoveryEndpointUrl).then(r => r.json())
const tokenEndpoint = oidcConfig.token_endpoint   // used in Step 8
const issuer        = oidcConfig.issuer           // used in Step 7
`

const step6Python = `oidc_config    = httpx.get(discovery_endpoint_url).json()
token_endpoint = oidc_config["token_endpoint"]   # used in Step 8
issuer         = oidc_config["issuer"]           # used in Step 7
`

const step7Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
// issuer resolved from DiscoveryEndpointUrl in Step 6

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: issuer,
  jti: crypto.randomUUID(),
})
`

const step7Python = `import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
# issuer resolved from discovery_endpoint_url in Step 6

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
})
`

const step8Node = `// tokenEndpoint resolved from DiscoveryEndpointUrl in Step 6

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'confirmation-of-payee',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      clientAssertion,
})

const tokenResponse = await fetch(tokenEndpoint, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token } = await tokenResponse.json()
`

const step8Python = `import httpx

# token_endpoint resolved from discovery_endpoint_url in Step 6

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "confirmation-of-payee",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
`

const examplePayload = `{
  "Data": {
    "SchemeName": "IBAN",
    "Identification": "AE070331234567890123456",
    "Name": {
      "FullName": "Ibrahim Al Suwaidi",
      "GivenName": "Ibrahim",
      "LastName": "Al Suwaidi"
    }
  }
}
`

const step9Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const signedRequest = await signJWT({
  iss: CLIENT_ID,
  aud: issuer,
  jti: crypto.randomUUID(),
  message: {
    Data: {
      SchemeName:     'IBAN',
      Identification: 'AE070331234567890123456',
      Name: {
        FullName:  'Ibrahim Al Suwaidi',
        GivenName: 'Ibrahim',
        LastName:  'Al Suwaidi',
      },
    },
  },
})
`

const step9Python = `import uuid
from sign_jwt import sign_jwt

signed_request = sign_jwt({
    "iss": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
    "message": {
        "Data": {
            "SchemeName":     "IBAN",
            "Identification": "AE070331234567890123456",
            "Name": {
                "FullName":  "Ibrahim Al Suwaidi",
                "GivenName": "Ibrahim",
                "LastName":  "Al Suwaidi",
            },
        }
    },
})
`

const step10Node = `// ResourceServerUrl resolved from discovery in Step 5

const copResponse = await fetch(
  \`\${ResourceServerUrl}/open-finance/confirmation-of-payee/v2.1/confirmation\`,
  {
    method:  'POST',
    headers: {
      'Authorization':       \`Bearer \${access_token}\`,
      'Content-Type':        'application/jwt',
      'Accept':              'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    body: signedRequest,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const responseJwt   = await copResponse.text()
const [, payloadB64] = responseJwt.split('.')
const result = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
`

const step10Python = `import httpx, base64, json

# resource_server_url resolved from discovery in Step 5

cop_response = httpx.post(
    f"{resource_server_url}/open-finance/confirmation-of-payee/v2.1/confirmation",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "Content-Type":          "application/jwt",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    content=signed_request,
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
response_jwt  = cop_response.text
payload_b64   = response_jwt.split(".")[1]
result        = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))
`

const jwsCompact = `<header>.<payload>.<signature>
`

const decodeJwsNode = `function decodeJwsPayload(jws: string) {
  const [, payloadB64] = jws.split('.')
  const json = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(json)
}
`

const decodeJwsPython = `import base64, json

def decode_jws_payload(jws: str) -> dict:
    payload_b64 = jws.split(".")[1]
    # Pad to a multiple of 4 chars so urlsafe_b64decode accepts it
    padded = payload_b64 + "=" * (-len(payload_b64) % 4)
    return json.loads(base64.urlsafe_b64decode(padded))
`

const decodedPayload = `{
  "iss": "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
  "aud": ["https://tpp.example.com"],
  "iat": 1713196200,
  "nbf": 1713196200,
  "exp": 1713196500,
  "message": {
    "Data": {
      "NameMatchIndicator": "ConfirmationOfPayee.Partial",
      "MaskedName": "Ibrahim Al S*****"
    },
    "Links": {
      "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.1/confirmation"
    },
    "Meta": {}
  }
}
`

const consentEmbedJson = `{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ibrahim Al Suwaidi" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ibrahim Al Suwaidi" }
        },
        "ConfirmationOfPayeeResponse": "eyJhbGci..."   // full JWS string from Step 10
      }
    ]
  }
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
const step10Tabs    = [{ label: 'Node.js', lang: 'typescript', code: step10Node }, { label: 'Python', lang: 'python', code: step10Python }] as const
const decodeJwsTabs = [{ label: 'Node.js', lang: 'typescript', code: decodeJwsNode }, { label: 'Python', lang: 'python', code: decodeJwsPython }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · Confirmation of Payee
        </div>
        <h1 class="ed-doc__title">
          Confirmation of Payee &mdash; API Guide
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or
          business before initiating a payment. Unlike payment flows, CoP does <strong>not</strong> require
          user authorization &mdash; the TPP authenticates directly using a client credentials grant and the
          LFI responds with a match result in seconds.
        </p>
        <p class="ed-doc__lede">
          CoP is served by each participating LFI independently. Before calling an LFI directly, the TPP
          first calls the API Hub's <strong>discovery</strong> endpoint to identify which LFI holds the
          destination account and retrieve its endpoint URLs.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before calling the CoP API"
      tone="cream"
    >
      <EdProse>Before calling the CoP API, ensure the following requirements are met:</EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the
          <strong>BSIP role</strong> as defined in
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
          certificate is used to sign the confirmation request JWT and client assertions.
        </li>
        <li>
          <strong>Registration with the relevant <a href="/tech/tpp-standards/registration/api-guide">API Hub (Authorisation Server)</a></strong>
          &mdash; the application must be registered with the API Hub (Server) of the LFI that holds
          the destination account.
        </li>
        <li>
          <strong>Understanding of <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a></strong>
          &mdash; you should understand how client authentication works with <code>private_key_jwt</code>
          before calling the token endpoint.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Confirmation of Payee"
      tone="surface"
    >
      <APIFlowViewer title="Confirmation of Payee API Flow">
        <APIFlowsConfirmationOfPayee version="v2.1" />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="step-1-discover-lfi"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1 — Discover the LFI"
      title="Resolve the IBAN to a specific LFI"
      tone="cream"
    >
      <EdProse>
        CoP is served by individual LFIs &mdash; the <code>/discovery</code> endpoint resolves a payee IBAN
        to the correct LFI and returns two URLs you will need for the rest of the flow:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>DiscoveryEndpointUrl</code></td>
              <td>The <code>.well-known</code> endpoint for the LFI's Authorisation Server. Fetch this to obtain the <code>token_endpoint</code> and <code>issuer</code> used in later steps.</td>
            </tr>
            <tr>
              <td><code>ResourceServerUrl</code></td>
              <td>The base URL of the LFI's API Hub resource server. Use this as the base URL when calling <code>/confirmation</code>.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Before calling <code>/discovery</code> you must obtain an access token from any LFI you are
        registered with using a client credentials grant. The API Hub does not make any requests to the
        LFI when processing <code>/discovery</code> &mdash; it resolves the IBAN centrally &mdash; so the
        response is the same regardless of which LFI you authenticate with. You only need to perform
        discovery once, and the <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/discovery</code></span> request must be sent to the LFI whose token
        you are using.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-2-client-assertion"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 2 — Build a Client Assertion"
      title="Prove your application's identity"
      tone="surface"
    >
      <EdProse>
        Use the
        <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt"><code>signJWT()</code></a>
        helper to build a client assertion proving your application's identity:
      </EdProse>

      <EdCodeGroup :tabs="step2Tabs" />

      <EdProse>
        See <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the
        full claims reference.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-3-token-request"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3 — Token Request"
      title="Exchange the assertion for an access token"
      tone="cream"
    >
      <EdProse>
        POST to any LFI's token endpoint with <code>scope=confirmation-of-payee</code>:
      </EdProse>

      <EdCodeGroup :tabs="step3Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-4-discovery-request"
      num="06"
      color="var(--at-teal)"
      eyebrow="Step 4 — Build a signed discovery request"
      title="Sign the IBAN-lookup payload"
      tone="surface"
    >
      <EdProse>
        The request body is a signed JWT containing the IBAN, signed with your signing key:
      </EdProse>

      <EdCodeGroup :tabs="step4Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-5-post-discovery"
      num="07"
      color="var(--at-gold)"
      eyebrow="Step 5 — POST /discovery"
      title="Resolve the LFI for an IBAN"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/discovery</code>
      </div>

      <EdProse>
        Include <code>x-fapi-interaction-id</code> on the request. See
        <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdCodeGroup :tabs="step5Tabs" />

      <EdProse>
        See the <a href="./open-api/discovery">POST /discovery</a> API reference for the full request and
        response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-6-resolve-token-endpoint"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 6 — Resolve the LFI token endpoint"
      title="Read the LFI's OpenID configuration"
      tone="surface"
    >
      <EdProse>
        Fetch the <code>DiscoveryEndpointUrl</code> directly to read the LFI's OpenID configuration. This
        gives you the <code>token_endpoint</code> and <code>issuer</code> needed for the next steps:
      </EdProse>

      <EdCodeGroup :tabs="step6Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-7-client-assertion"
      num="09"
      color="var(--at-navy)"
      eyebrow="Step 7 — Build a Client Assertion"
      title="Build a fresh assertion for the resolved LFI"
      tone="cream"
    >
      <EdProse>
        Use the
        <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt"><code>signJWT()</code></a>
        helper to build a client assertion proving your application's identity:
      </EdProse>

      <EdCodeGroup :tabs="step7Tabs" />

      <EdProse>
        See <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the
        full claims reference.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-8-token-request"
      num="10"
      color="var(--at-teal-deep)"
      eyebrow="Step 8 — Token Request"
      title="Get an access token from the resolved LFI"
      tone="surface"
    >
      <EdProse>
        POST to the token endpoint (resolved in Step 6) with <code>scope=confirmation-of-payee</code>:
      </EdProse>

      <EdCodeGroup :tabs="step8Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-9-build-confirmation-request"
      num="11"
      color="var(--at-teal)"
      eyebrow="Step 9 — Build and Sign the Confirmation Request"
      title="POST /confirmation — request payload"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/open-finance/confirmation-of-payee/v2.1/confirmation</code>
      </div>

      <EdProse>
        The confirmation request is sent as a <strong>signed JWT</strong>
        (<code>Content-Type: application/jwt</code>). Build the JWT payload containing the account details
        you want to verify, then sign it with your signing key.
      </EdProse>

      <h3 class="ed-doc__subhead">Request payload fields</h3>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Data.SchemeName</code>*</td>
              <td>enum</td>
              <td>Account identifier type &mdash; always <code>IBAN</code></td>
              <td><code>IBAN</code></td>
            </tr>
            <tr>
              <td><code>Data.Identification</code>*</td>
              <td>string</td>
              <td>The IBAN to verify</td>
              <td><code>AE070331234567890123456</code></td>
            </tr>
            <tr>
              <td><code>Data.Name.FullName</code>*</td>
              <td>string</td>
              <td>Full name of the account holder</td>
              <td><code>Ibrahim Al Suwaidi</code></td>
            </tr>
            <tr>
              <td><code>Data.Name.GivenName</code></td>
              <td>string</td>
              <td>Given (first) name &mdash; individual accounts</td>
              <td><code>Ibrahim</code></td>
            </tr>
            <tr>
              <td><code>Data.Name.LastName</code></td>
              <td>string</td>
              <td>Family name &mdash; individual accounts</td>
              <td><code>Al Suwaidi</code></td>
            </tr>
            <tr>
              <td><code>Data.Name.BusinessName</code></td>
              <td>string</td>
              <td>Registered business name &mdash; use instead of personal name fields for business accounts</td>
              <td><code>Business Inc.</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Individual vs. Business">
        <p>
          Provide <code>GivenName</code> + <code>LastName</code> for personal accounts, or
          <code>BusinessName</code> for business accounts. Do not mix both.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">Example payload (inside the JWT <code>message</code> claim)</h3>
      <EdCode :code="examplePayload" lang="json" filename="message claim" />

      <h3 class="ed-doc__subhead">Signing the request</h3>
      <EdProse>
        Use the
        <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt"><code>signJWT()</code></a>
        helper, wrapping the payload in a <code>message</code> claim:
      </EdProse>

      <EdCodeGroup :tabs="step9Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-10-post-confirmation"
      num="12"
      color="var(--at-gold)"
      eyebrow="Step 10 — POST /confirmation"
      title="Send the signed JWT and decode the response"
      tone="surface"
    >
      <EdProse>
        Send the signed JWT to the LFI's CoP endpoint using the <code>ResourceServerUrl</code> resolved in
        Step 5. Both the request body and the response are JWTs. Include
        <code>x-fapi-interaction-id</code> on every request. See
        <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdCodeGroup :tabs="step10Tabs" />

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse>The response is a signed JWT. Decode the payload to read the match result:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Data.NameMatchIndicator</code></td>
              <td>string</td>
              <td>The result of the name match check &mdash; see enum below</td>
            </tr>
            <tr>
              <td><code>Data.MaskedName</code></td>
              <td>string</td>
              <td>The account holder's name, partially masked. Returned on <code>ConfirmationOfPayee.Partial</code> and <code>ConfirmationOfPayee.No</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>NameMatchIndicator</code></th><th>Meaning</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ConfirmationOfPayee.Yes</code></td><td>Name and account match &mdash; safe to proceed</td></tr>
            <tr><td><code>ConfirmationOfPayee.Partial</code></td><td>Name partially matches &mdash; present the <code>MaskedName</code> to the payer</td></tr>
            <tr><td><code>ConfirmationOfPayee.No</code></td><td>Name does not match &mdash; present the <code>MaskedName</code> to the payer</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Proceed with caution on non-Yes results">
        <p>
          A <code>ConfirmationOfPayee.Partial</code> or <code>ConfirmationOfPayee.No</code> result must be
          surfaced to the payer &mdash; along with the <code>MaskedName</code> &mdash; before initiating a
          payment. Proceeding without informing the user may increase the risk of authorised push payment
          fraud.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">Decoding the JWS</h3>
      <EdProse>
        The <code>/confirmation</code> response body is a compact JWS &mdash; three base64url-encoded
        segments separated by <code>.</code>:
      </EdProse>

      <EdCode :code="jwsCompact" lang="plaintext" filename="JWS compact form" />

      <EdProse>
        Verify the signature using the LFI's public key, then base64url-decode the payload:
      </EdProse>

      <EdCodeGroup :tabs="decodeJwsTabs" />

      <EdProse>
        The decoded payload contains a <code>message</code> object with the CoP result under
        <code>message.Data</code>:
      </EdProse>

      <EdCode :code="decodedPayload" lang="json" filename="decoded payload" />

      <EdProse>
        See the <a href="./open-api/confirmation">POST /confirmation</a> API reference for the full request
        and response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="cop-in-payment-consent"
      num="13"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Embedding the result"
      title="Using the CoP Response in a Payment Consent"
      tone="cream"
    >
      <EdProse>
        Where Confirmation of Payee has been performed for a creditor, include the <strong>full raw JWS
        response string</strong> returned by the <code>/confirmation</code> endpoint in the
        <code>ConfirmationOfPayeeResponse</code> field of the creditor entry inside the payment consent
        PII.
      </EdProse>

      <EdCode :code="consentEmbedJson" lang="json" filename="payment consent excerpt" />

      <EdProse>
        This gives the LFI confidence that the creditor account details have been verified before the
        payment consent was created. The value must be the complete compact JWS string &mdash; do not
        decode it to an object before embedding.
      </EdProse>

      <EdProse>
        See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a>
        for the full PII creditor schema and the creditor models (single, multiple, and open beneficiary).
      </EdProse>

      <EdProse>
        See <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys">Confirmation of
        Payee &mdash; User Experience</a> for consent and authorisation page examples across different
        match results.
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
