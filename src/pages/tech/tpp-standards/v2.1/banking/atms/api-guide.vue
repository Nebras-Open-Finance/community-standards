<route lang="yaml">
meta:
  title: ATMs — API Guide
</route>

<script setup lang="ts">
const step1Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.LFI_ISSUER!   // from the LFI's .well-known/openid-configuration

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: ISSUER,
  jti: crypto.randomUUID(),
})
`

const step1Python = `import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER    = os.environ["LFI_ISSUER"]   # from the LFI's .well-known/openid-configuration

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": ISSUER,
    "jti": str(uuid.uuid4()),
})
`

const step2Node = `const TOKEN_ENDPOINT = process.env.LFI_TOKEN_ENDPOINT!

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'atm',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      clientAssertion,
})

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token } = await tokenResponse.json()
`

const step2Python = `import httpx, os

token_endpoint = os.environ["LFI_TOKEN_ENDPOINT"]

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "atm",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
`

const step3Node = `import crypto from 'node:crypto'

const API_BASE = process.env.LFI_API_BASE!

const response = await fetch(\`\${API_BASE}/open-finance/atm/v2.1/atms\`, {
  method: 'GET',
  headers: {
    'Authorization':         \`Bearer \${access_token}\`,
    'x-fapi-interaction-id': crypto.randomUUID(),
  },
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { Data, Meta } = await response.json()
// Data — array of ATM records
// Meta.TotalRecords — total count
// Meta.LastUpdatedDateTime — when the data was last refreshed
`

const step3Python = `import httpx, uuid, os

api_base = os.environ["LFI_API_BASE"]

response = httpx.get(
    f"{api_base}/open-finance/atm/v2.1/atms",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    # cert=("transport.crt", "transport.key"),
)

payload      = response.json()
atms         = payload["Data"]
total        = payload["Meta"]["TotalRecords"]
last_updated = payload["Meta"]["LastUpdatedDateTime"]
`

const responseJson = `{
  "Data": [
    {
      "ATMId": "ATM-001",
      "LFIId": "ADCB",
      "LFIBrandId": "ADCB",
      "SupportedCurrencies": ["AED"],
      "SupportedLanguages": ["en", "ar"],
      "Services": ["CashWithdrawal", "Balance", "MiniStatement", "PINChange"],
      "Accessibility": ["WheelchairAccess", "AudioCashMachine"],
      "IsAccess24Hour": true,
      "Availability": {
        "Status": "Available"
      },
      "MinimumPossibleAmount": { "Amount": "20.00", "Currency": "AED" },
      "MaximumPossibleAmount": { "Amount": "5000.00", "Currency": "AED" },
      "Location": {
        "LocationCategory": ["BranchExternal"],
        "PostalAddress": {
          "StreetName": "Corniche Road",
          "TownName": "Abu Dhabi",
          "CountrySubDivision": "AbuDhabi",
          "Country": "AE"
        },
        "GeoLocation": {
          "Latitude": "24.4539",
          "Longitude": "54.3773"
        }
      }
    }
  ],
  "Meta": {
    "TotalRecords": 1,
    "LastUpdatedDateTime": "2025-03-21T08:00:00Z"
  }
}
`

const step1Tabs = [
  { label: 'Node.js', lang: 'typescript', code: step1Node },
  { label: 'Python',  lang: 'python',     code: step1Python },
] as const

const step2Tabs = [
  { label: 'Node.js', lang: 'typescript', code: step2Node },
  { label: 'Python',  lang: 'python',     code: step2Python },
] as const

const step3Tabs = [
  { label: 'Node.js', lang: 'typescript', code: step3Node },
  { label: 'Python',  lang: 'python',     code: step3Python },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · ATMs
        </div>
        <h1 class="ed-doc__title">
          ATMs &mdash; API Guide
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The ATM API exposes a single endpoint &mdash; <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/atms</code></span> &mdash; that returns the
          details of all ATMs managed by the LFI.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before calling the ATM API"
      tone="cream"
    >
      <EdProse>Before calling the ATM API, ensure the following requirements are met:</EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the
          <strong>BDSP role</strong> as defined in
          <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Transport Certificate</a></strong>
          &mdash; an active transport certificate must be issued and registered in the Trust Framework to
          establish secure <strong>mTLS communication</strong> with the LFI.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Signing Certificate</a></strong>
          &mdash; an active signing certificate must be issued and registered in the Trust Framework for
          client authentication.
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
      title="End-to-end ATM request"
      tone="surface"
    >
      <APIFlowViewer title="ATM API Flow">
        <APIFlowsATMs />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="step-1-client-assertion"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1 — Build a Client Assertion"
      title="Prove your application's identity"
      tone="cream"
    >
      <EdProse>
        The ATM API uses the OAuth 2.0 <strong>client credentials</strong> grant with
        <code>scope=atm</code>.
      </EdProse>

      <EdProse>
        Use the
        <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt"><code>signJWT()</code></a>
        helper to build a client assertion proving your application's identity:
      </EdProse>

      <EdCodeGroup :tabs="step1Tabs" />

      <EdProse>
        See <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the
        full claims reference.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-2-token-request"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 2 — Token Request"
      title="Exchange the assertion for an access token"
      tone="surface"
    >
      <EdProse>
        POST to the LFI's token endpoint with <code>scope=atm</code>:
      </EdProse>

      <EdCodeGroup :tabs="step2Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-3-get-atms"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3 — GET /atms"
      title="Retrieve the ATM directory"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/atms</code>
      </div>

      <EdProse>
        Call the endpoint with the access token. Include <code>x-fapi-interaction-id</code> on every
        request. See <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdProse>
        <code>x-fapi-customer-ip-address</code> is <strong>not</strong> required for ATMs &mdash; the data
        is static and public, so no customer is involved in the call.
      </EdProse>

      <EdProse>
        <code>LFI_API_BASE</code> is the LFI's API Hub resource server &mdash;
        <code>https://rs1.&lt;lfiCode&gt;.apihub.openfinance.ae</code> (production) or
        <code>https://rs1.&lt;lfiCode&gt;.sandbox.apihub.openfinance.ae</code> (sandbox). Resolve the
        <code>&lt;lfiCode&gt;</code> from the
        <a href="/tech/tpp-standards/trust-framework/api-discovery">Trust Framework Directory</a>. See
        <a href="/tech/tpp-standards/trust-framework/api-resources">API Resources</a> for the full
        endpoint format.
      </EdProse>

      <EdCodeGroup :tabs="step3Tabs" />

      <h3 class="ed-doc__subhead">Response structure</h3>
      <EdCode :code="responseJson" lang="json" filename="response body" />

      <EdProse>
        See the <a href="./open-api/atms">GET /atms</a> API reference for the full response schema.
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
