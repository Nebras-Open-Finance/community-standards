<route lang="yaml">
meta:
  title: Payment Refunds — API Guide
</route>

<script setup lang="ts">
const step1Node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const issuer    = process.env.LFI_ISSUER!   // from the LFI's .well-known/openid-configuration

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: issuer,
  jti: crypto.randomUUID(),
})
`

const step1Python = `import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
issuer    = os.environ["LFI_ISSUER"]   # from the LFI's .well-known/openid-configuration

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
})
`

const step2Node = `const tokenEndpoint = process.env.LFI_TOKEN_ENDPOINT!   // from the LFI's .well-known/openid-configuration

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'payments',
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

const step2Python = `import httpx

token_endpoint = os.environ["LFI_TOKEN_ENDPOINT"]   # from the LFI's .well-known/openid-configuration

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "payments",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
`

const step3Node = `const RESOURCE_SERVER_URL = process.env.LFI_RESOURCE_SERVER_URL!
const CONSENT_ID          = process.env.CONSENT_ID!

const refundResponse = await fetch(
  \`\${RESOURCE_SERVER_URL}/open-finance/bank-service-initiation/v2.2/payment-consents/\${CONSENT_ID}/refund\`,
  {
    method:  'GET',
    headers: {
      'Authorization':         \`Bearer \${access_token}\`,
      'Accept':                'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const responseJwt    = await refundResponse.text()
const [, payloadB64] = responseJwt.split('.')
const result         = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())

const { ConsentId, RefundAccount } = result.message.Data
`

const step3Python = `import httpx, base64, json

RESOURCE_SERVER_URL = os.environ["LFI_RESOURCE_SERVER_URL"]
CONSENT_ID          = os.environ["CONSENT_ID"]

refund_response = httpx.get(
    f"{RESOURCE_SERVER_URL}/open-finance/bank-service-initiation/v2.2/payment-consents/{CONSENT_ID}/refund",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
response_jwt = refund_response.text
payload_b64  = response_jwt.split(".")[1]
result       = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

consent_id     = result["message"]["Data"]["ConsentId"]
refund_account = result["message"]["Data"]["RefundAccount"]
`

const exampleResponse = `{
  "iss": "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
  "aud": ["https://tpp.example.com"],
  "iat": 1713196200,
  "exp": 1713196500,
  "message": {
    "Data": {
      "ConsentId": "con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c",
      "RefundAccount": {
        "SchemeName": "IBAN",
        "Identification": "AE070331234567890123456",
        "Name": {
          "en": "Ibrahim Al Suwaidi"
        }
      }
    },
    "Links": {
      "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/bank-service-initiation/v2.2/payment-consents/con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c/refund"
    },
    "Meta": {}
  }
}
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

const step1Tabs       = [{ label: 'Node.js', lang: 'typescript', code: step1Node },     { label: 'Python', lang: 'python', code: step1Python }] as const
const step2Tabs       = [{ label: 'Node.js', lang: 'typescript', code: step2Node },     { label: 'Python', lang: 'python', code: step2Python }] as const
const step3Tabs       = [{ label: 'Node.js', lang: 'typescript', code: step3Node },     { label: 'Python', lang: 'python', code: step3Python }] as const
const decodeJwsTabs   = [{ label: 'Node.js', lang: 'typescript', code: decodeJwsNode }, { label: 'Python', lang: 'python', code: decodeJwsPython }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · Service Initiation · Refunds
        </div>
        <h1 class="ed-doc__title">
          Payment Refunds &mdash; API Guide
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Refunds API lets a TPP retrieve the debtor's payment account details from the LFI after a
          payment has been made, so a merchant can initiate a refund back to the original payer. This
          guide starts <strong>after a payment consent has been created</strong> with the
          <code>ReadRefundAccount</code> permission and the underlying payment has been authorised.
        </p>
        <p class="ed-doc__lede">
          Unlike the payment consent flow, retrieving refund details does <strong>not</strong> require a
          user redirect &mdash; the TPP authenticates directly using a client credentials grant.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before retrieving refund details"
      tone="cream"
    >
      <EdProse>Before calling the Refunds API, ensure the following requirements are met:</EdProse>

      <EdBullets>
        <li>
          <strong>Completed payment consent with <code>ReadRefundAccount</code> permission</strong>
          &mdash; the original payment consent must have been created with
          <code>ReadRefundAccount</code> in the <code>Permissions</code> array, and the payment must
          have been authorised by the user. See the
          <a href="/tech/tpp-standards/v2.2-rc1/consent/api-guide">Payment Consent API Guide</a>.
        </li>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be assigned the <strong>BSIP role</strong> in the Trust
          Framework. See <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Transport Certificate</a></strong>
          &mdash; an active transport certificate for mTLS communication with the LFI.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Signing Certificate</a></strong>
          &mdash; an active signing certificate for signing client assertions.
        </li>
        <li>
          <strong>LFI token endpoint</strong>
          &mdash; you should already hold the LFI's <code>token_endpoint</code> and
          <code>ResourceServerUrl</code> from the original payment consent flow. If not, fetch the LFI's
          <code>.well-known/openid-configuration</code> to resolve them.
        </li>
        <li>
          <strong>Understanding of <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a></strong>
          &mdash; familiarise yourself with <code>private_key_jwt</code> client authentication before
          calling the token endpoint.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end refund account retrieval"
      tone="surface"
    >
      <APIFlowViewer title="Payment Refunds API Flow">
        <APIFlowsRefunds />
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
        Retrieving refund details uses the OAuth 2.0 <strong>client credentials</strong> grant &mdash;
        no user consent or redirect is required.
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
        POST to the LFI's token endpoint with <code>scope=payments</code>:
      </EdProse>

      <EdCodeGroup :tabs="step2Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-3-retrieve-refund-account"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3 — Retrieve the Refund Account"
      title="GET /payment-consents/{ConsentId}/refund"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/payment-consents/{ConsentId}/refund</code>
      </div>

      <EdProse>
        Call the LFI's refund endpoint using the <code>ConsentId</code> from the original payment
        consent. Include <code>x-fapi-interaction-id</code> on every request. See
        <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdCodeGroup :tabs="step3Tabs" />

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse>The response is a signed JWT. Decode the payload to read the refund account details:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Data.ConsentId</code></td><td>string</td><td>The ConsentId of the original payment consent</td></tr>
            <tr><td><code>Data.BaseConsentId</code></td><td>string</td><td>The BaseConsentId, if the consent was part of a multi-payment arrangement</td></tr>
            <tr><td><code>Data.RefundAccount.SchemeName</code></td><td>enum</td><td>Account identifier type &mdash; always <code>IBAN</code></td></tr>
            <tr><td><code>Data.RefundAccount.Identification</code></td><td>string</td><td>The debtor's IBAN</td></tr>
            <tr><td><code>Data.RefundAccount.Name</code></td><td>object</td><td>The debtor's account name</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Example decoded payload</h3>
      <EdCode :code="exampleResponse" lang="json" filename="decoded payload" />

      <h3 class="ed-doc__subhead">Decoding the JWS</h3>
      <EdProse>
        The response body is a compact JWS &mdash; three base64url-encoded segments separated by
        <code>.</code>:
      </EdProse>
      <EdCode :code="jwsCompact" lang="plaintext" filename="JWS compact form" />

      <EdProse>
        Verify the signature using the LFI's public key (from their JWKS endpoint), then base64url-decode
        the payload:
      </EdProse>
      <EdCodeGroup :tabs="decodeJwsTabs" />

      <EdProse>
        See the
        <a href="../open-api/payment-consents-ConsentId-refund">GET /payment-consents/{ConsentId}/refund</a>
        API reference for the full request and response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="initiate-refund"
      num="06"
      color="var(--at-teal)"
      eyebrow="Using the Refund Account to Initiate a Refund"
      title="Reuse the debtor's account as the creditor"
      tone="surface"
    >
      <EdProse>
        Once you have the debtor's <code>RefundAccount</code> details, use the returned IBAN and name as
        the <strong>creditor</strong> in a new payment consent to initiate the refund. The refund payment
        follows the same initiation flow as any other payment.
      </EdProse>

      <EdProse>
        See
        <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor">Creditor
        PII</a> for how to populate the creditor fields using the retrieved account details.
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
