<route lang="yaml">
meta:
  layout: biopay
  title: Payment — API Guide
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Payment — API Guide · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'prerequisites', label: 'Before you start' },
  { id: 'resolve', label: 'ICP token' },
  { id: 'token', label: 'Access token' },
  { id: 'lookup', label: 'Instrument lookup' },
  { id: 'decrypt', label: 'Payment token' },
  { id: 'payment', label: 'Account payment' },
  { id: 'status', label: 'Payment status' },
  { id: 'card', label: 'Card payment' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Audience', value: 'BPIP' },
  { label: 'Version', value: '0.1' },
]

// ── Access token ────────────────────────────────────────────────────────────
const tokenRequest = `POST /token HTTP/1.1
Host: as1.[LFICODE].apihub.openfinance.ae
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&scope=biometric-payments
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJQUzI1NiIsImtpZCI6...`

// ── Instrument lookup ───────────────────────────────────────────────────────
const lookupRequest = `POST /open-finance/biometric-payments/v1/instrument-lookup HTTP/1.1
Host: rs1.[LFICODE].apihub.openfinance.ae
Authorization: Bearer <access_token>
Content-Type: application/json
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
x-fapi-auth-date: Thu, 15 Oct 2026 10:15:02 GMT
x-jws-signature: eyJhbGciOiJQUzI1NiIsImtpZCI6...

{
  "Data": {
    "uaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
    "IcpToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImljcC1zaWduLTEifQ...",
    "TransactionAmount": { "Amount": "149.50", "Currency": "AED" }
  }
}`

const lookupResponse = `HTTP/1.1 200 OK
Content-Type: application/json
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d

{
  "Data": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiYnBpcC1lbmMtMSIsImN0eSI6IkpXVCJ9..."
}`

// ── Payment token decryption ───────────────────────────────────────────────
const readKidTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const encryptedToken = lookupResponse.Data
const kid = getJweKid(encryptedToken)
const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

encrypted_token = lookup_response["Data"]
kid = get_jwe_kid(encrypted_token)
private_key = my_key_store.get_private_key(kid)`,
  },
] as const

const decryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { compactDecrypt, importPKCS8 } from 'jose'

const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(encryptedToken, privateKey)
const paymentToken = new TextDecoder().decode(plaintext) // the LFI's JWS`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `from jwcrypto import jwe

token = jwe.JWE()
token.deserialize(encrypted_token, key=private_key)
payment_token = token.payload.decode()  # the LFI's JWS`,
  },
] as const

const verifyTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { createRemoteJWKSet, jwtVerify } from 'jose'

// The LFI's signing keys, from its JWKS in the Directory
const lfiJwks = createRemoteJWKSet(new URL(lfiJwksUri))

const { payload } = await jwtVerify(paymentToken, lfiJwks, {
  issuer: expectedLfiIssuer,
  algorithms: ['PS256'],
})

// Check it was issued to you, for the ICP token you sent on the lookup
if (payload.azp !== myOrganisationId) {
  throw new Error('Payment token was not issued to this BPIP')
}
if (payload.IcpToken !== icpToken) {
  throw new Error('Payment token was not issued for this ICP token')
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import json
from jwcrypto import jwk, jwt

# The LFI's signing keys, from its JWKS in the Directory
lfi_keys = jwk.JWKSet.from_json(fetch_lfi_jwks())

verified = jwt.JWT(
    key=lfi_keys,
    jwt=payment_token,
    algs=["PS256"],
    check_claims={"iss": expected_lfi_issuer, "exp": None},
)
claims = json.loads(verified.claims)

# Check it was issued to you, for the ICP token you sent on the lookup
if claims["azp"] != my_organisation_id:
    raise ValueError("Payment token was not issued to this BPIP")
if claims["IcpToken"] != icp_token:
    raise ValueError("Payment token was not issued for this ICP token")`,
  },
] as const

const fullDecryptTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { compactDecrypt, createRemoteJWKSet, importPKCS8, jwtVerify } from 'jose'

async function openPaymentToken(encryptedToken: string, icpToken: string) {
  // 1. Select your private key by the kid in the JWE header
  const [headerB64] = encryptedToken.split('.')
  const { kid } = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  const privateKey = await importPKCS8(myKeyStore.getPrivateKeyPem(kid), 'RSA-OAEP-256')

  // 2. Decrypt the JWE → the payment token, a JWS signed by the LFI
  const { plaintext } = await compactDecrypt(encryptedToken, privateKey)
  const paymentToken = new TextDecoder().decode(plaintext)

  // 3. Verify the LFI's signature and standard claims
  const lfiJwks = createRemoteJWKSet(new URL(lfiJwksUri))
  const { payload } = await jwtVerify(paymentToken, lfiJwks, {
    issuer: expectedLfiIssuer,
    algorithms: ['PS256'],
  })

  // 4. Check it was issued to you, for this ICP token
  if (payload.azp !== myOrganisationId) {
    throw new Error('Payment token was not issued to this BPIP')
  }
  if (payload.IcpToken !== icpToken) {
    throw new Error('Payment token was not issued for this ICP token')
  }

  // Keep the JWS to send back at the point of payment. Hold card details in
  // memory only. Never log or persist them.
  return { paymentToken, claims: payload }
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json
from jwcrypto import jwe, jwk, jwt

def open_payment_token(encrypted_token: str, icp_token: str) -> tuple[str, dict]:
    # 1. Select your private key by the kid in the JWE header
    header_b64 = encrypted_token.split(".")[0]
    kid = json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]
    private_key = my_key_store.get_private_key(kid)

    # 2. Decrypt the JWE → the payment token, a JWS signed by the LFI
    token = jwe.JWE()
    token.deserialize(encrypted_token, key=private_key)
    payment_token = token.payload.decode()

    # 3. Verify the LFI's signature and standard claims
    lfi_keys = jwk.JWKSet.from_json(fetch_lfi_jwks())
    verified = jwt.JWT(
        key=lfi_keys,
        jwt=payment_token,
        algs=["PS256"],
        check_claims={"iss": expected_lfi_issuer, "exp": None},
    )
    claims = json.loads(verified.claims)

    # 4. Check it was issued to you, for this ICP token
    if claims["azp"] != my_organisation_id:
        raise ValueError("Payment token was not issued to this BPIP")
    if claims["IcpToken"] != icp_token:
        raise ValueError("Payment token was not issued for this ICP token")

    # Keep the JWS to send back at the point of payment. Hold card details in
    # memory only. Never log or persist them.
    return payment_token, claims`,
  },
] as const

const accountTokenClaims = `{
  "iss": "[LFI_ORGANISATION_ID]",
  "azp": "[BPIP_ORGANISATION_ID]",
  "iat": 1792059303,
  "exp": 1792059423,
  "jti": "pt-3c9a7e21-5b84-4f0d-9e62-1a7b8c9d0e1f",
  "uaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
  "IcpToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImljcC1zaWduLTEifQ...",
  "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
  "InstrumentType": "ACCOUNT",
  "DebtorAccount": { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" }
}`

const cardTokenClaims = `{
  "iss": "[LFI_ORGANISATION_ID]",
  "azp": "[BPIP_ORGANISATION_ID]",
  "iat": 1792059303,
  "exp": 1792059423,
  "jti": "pt-8d2f4b60-1e93-4c7a-b5d8-6f0e2a3c9b14",
  "uaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
  "IcpToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImljcC1zaWduLTEifQ...",
  "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
  "InstrumentType": "CARD",
  "CardDetails": { "CardNumber": "4895370012003478", "ExpiryDate": "08/29" }
}`

// ── Account payment ─────────────────────────────────────────────────────────
const paymentRequest = `POST /open-finance/biometric-payments/v1/biometric-payments HTTP/1.1
Host: rs1.[LFICODE].apihub.openfinance.ae
Authorization: Bearer <access_token>
Content-Type: application/json
x-idempotency-key: 6f1d2a0c-9b43-4e7a-8d15-2c3b4a5e6f70
x-fapi-interaction-id: 1f0e9c2a-77d4-4b8e-a3f1-5d2c6b7e8a90
x-fapi-auth-date: Thu, 15 Oct 2026 10:15:02 GMT
x-jws-signature: eyJhbGciOiJQUzI1NiIsImtpZCI6...

{
  "Data": {
    "PaymentToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImxmaS1zaWduLTEifQ...",
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE220331234567890876543"
    },
    "PaymentPurposeCode": "ACM",
    "DebtorReference": "Example Grocers 000731",
    "CreditorReference": "POS T-0042 RRN 628810000731",
    "Subscription": {
      "Webhook": {
        "Url": "https://bpip.example.com/webhooks/biopay",
        "IsActive": true
      }
    }
  },
  "Risk": {}
}`

const paymentResponse = `HTTP/1.1 201 Created
Content-Type: application/json
x-fapi-interaction-id: 1f0e9c2a-77d4-4b8e-a3f1-5d2c6b7e8a90

{
  "Data": {
    "PaymentId": "7130812d-4d81-4c68-8187-6358cfbce521",
    "Status": "Pending",
    "CreationDateTime": "2026-10-15T10:15:03Z",
    "StatusUpdateDateTime": "2026-10-15T10:15:03Z",
    "PaymentToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImxmaS1zaWduLTEifQ...",
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE220331234567890876543"
    },
    "PaymentPurposeCode": "ACM",
    "DebtorReference": "Example Grocers 000731",
    "CreditorReference": "POS T-0042 RRN 628810000731",
    "Subscription": {
      "Webhook": {
        "Url": "https://bpip.example.com/webhooks/biopay",
        "IsActive": true
      }
    }
  },
  "Links": {
    "Self": "https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/biometric-payments/v1/biometric-payments/7130812d-4d81-4c68-8187-6358cfbce521"
  },
  "Meta": {}
}`

// ── Status ──────────────────────────────────────────────────────────────────
const ackResponse = `HTTP/1.1 202 Accepted
x-fapi-interaction-id: <echo the received value>`

const eventPayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": ["[CLIENT_ID]"],
  "iat": 1792059305,
  "nbf": 1792059305,
  "exp": 1792062905,
  "jti": "b7a4f2e0-1c3d-4e5f-8a9b-0c1d2e3f4a5b",
  "message": {
    "Meta": {
      "EventDateTime": "2026-10-15T10:15:05Z",
      "EventResource": "/biometric-payments/7130812d-4d81-4c68-8187-6358cfbce521",
      "EventType": "Resource.Updated",
      "PaymentId": "7130812d-4d81-4c68-8187-6358cfbce521"
    },
    "Data": {
      "PaymentId": "7130812d-4d81-4c68-8187-6358cfbce521",
      "Status": "AcceptedWithoutPosting",
      "CreationDateTime": "2026-10-15T10:15:03Z",
      "StatusUpdateDateTime": "2026-10-15T10:15:05Z",
      "PaymentToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImxmaS1zaWduLTEifQ...",
      "CreditorAccount": {
        "SchemeName": "IBAN",
        "Identification": "AE220331234567890876543"
      },
      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Example Grocers 000731",
      "CreditorReference": "POS T-0042 RRN 628810000731",
      "PaymentRail": "AANI",
      "PaymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b",
      "Subscription": {
        "Webhook": {
          "Url": "https://bpip.example.com/webhooks/biopay",
          "IsActive": true
        }
      }
    }
  }
}`

const pollById = `GET /open-finance/biometric-payments/v1/biometric-payments/7130812d-4d81-4c68-8187-6358cfbce521 HTTP/1.1
Host: rs1.[LFICODE].apihub.openfinance.ae
Authorization: Bearer <access_token>
x-fapi-interaction-id: 4c2e8a1f-6b3d-4f7e-9a0c-1d2e3f4a5b6c`

const pollRejectedResponse = `HTTP/1.1 200 OK
Content-Type: application/json
x-fapi-interaction-id: 4c2e8a1f-6b3d-4f7e-9a0c-1d2e3f4a5b6c

{
  "Data": {
    "PaymentId": "7130812d-4d81-4c68-8187-6358cfbce521",
    "Status": "Rejected",
    "CreationDateTime": "2026-10-15T10:15:03Z",
    "StatusUpdateDateTime": "2026-10-15T10:15:04Z",
    "PaymentToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImxmaS1zaWduLTEifQ...",
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE220331234567890876543"
    },
    "PaymentPurposeCode": "ACM",
    "DebtorReference": "Example Grocers 000731",
    "CreditorReference": "POS T-0042 RRN 628810000731",
    "PaymentRail": "AANI",
    "PaymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b",
    "RejectReasonCode": [
      {
        "Code": "AANI.AM04",
        "Message": "Payment request cannot be executed as insufficient funds at debtor account."
      }
    ],
    "Subscription": {
      "Webhook": {
        "Url": "https://bpip.example.com/webhooks/biopay",
        "IsActive": true
      }
    }
  },
  "Links": {
    "Self": "https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/biometric-payments/v1/biometric-payments/7130812d-4d81-4c68-8187-6358cfbce521"
  },
  "Meta": {}
}`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Payment · Draft"
      eyebrow-color="var(--at-gold)"
      title="Payment API Guide"
      :meta="meta"
      lede="How a BPIP takes a BioPay payment: resolving the customer with ICP, looking up their payment instrument through the API Hub, decrypting the payment token, initiating an account-to-account payment, and tracking its status. <strong>Everything here is draft</strong> &mdash; endpoints, fields and claims are proposals for review."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-gold)"
      eyebrow="Before you start"
      title="What a BPIP needs in place"
      tone="surface"
    >
      <EdNote type="info" title="About this guide">
        <p>
          This API Guide describes the expected API flow for a BioPay payment, from the BPIP&rsquo;s
          point of view. The end-to-end sequence, and what each party checks at each step, are on
          the <RouterLink to="/biopay/payment/technical-architecture">Payment API Sequence Flow</RouterLink>
          page.
        </p>
      </EdNote>
      <EdBullets accent="var(--at-gold)">
        <li>
          <strong>A client with the BPIP role</strong> in the Directory, entitled to the
          <code>biometric-payments</code> scope. See
          <RouterLink to="/biopay/directory">Directory</RouterLink>.
        </li>
        <li>
          <strong>A transport certificate</strong> for mTLS on every call to the API Hub. The ICP
          token is bound to it.
        </li>
        <li>
          <strong>A signing certificate</strong> for your client assertion and the
          <code>x-jws-signature</code> on every request. See
          <RouterLink to="/tech/tpp-standards/security/fapi/message-signing">Message Signing</RouterLink>.
        </li>
        <li>
          <strong>An encryption certificate</strong>, required for every BPIP. The LFI encrypts the
          payment token in every lookup response to it, and the API Hub encrypts payment status
          events to it.
        </li>
        <li>
          <strong>A webhook endpoint</strong> to receive payment status events, given on each
          payment request. Optional if you only poll.
        </li>
        <li>
          <strong>The ICP SDK</strong>, integrated at your acceptance point.
        </li>
      </EdBullets>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="resolve"
      num="02"
      color="var(--at-gold)"
      eyebrow="Step 1"
      title="Handle what ICP returns"
    >
      <EdNote type="info" title="Coming soon — ICP SDK">
        <p>
          Customer resolution is a call to ICP through the ICP SDK, outside the API Hub. The
          integration will be documented with the ICP SDK.
        </p>
      </EdNote>
      <EdProse>
        <p>When ICP identifies the customer, it returns three things:</p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>ICP returns</th><th>What the BPIP does with it</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>uaeKycId</code></td>
              <td>Sends it as <code>Data.uaeKycId</code> on the lookup.</td>
            </tr>
            <tr>
              <td>Default LFI</td>
              <td>Addresses every call for this payment to that LFI&rsquo;s API Hub resource server, <code>rs1.[LFICODE].apihub.openfinance.ae</code>.</td>
            </tr>
            <tr>
              <td>ICP token</td>
              <td>Sends it unchanged as <code>Data.IcpToken</code> on the lookup, where the LFI validates it with ICP. Keeps it to check against the payment token the LFI returns.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="token"
      num="03"
      color="var(--at-blue-deep)"
      eyebrow="Step 2"
      title="Obtain an access token"
      tone="surface"
    >
      <EdProse>
        <p>
          BioPay has no consent and no redirect. Request an access token from the API Hub with the
          <code>client_credentials</code> grant and the <code>biometric-payments</code> scope,
          authenticating with a <code>private_key_jwt</code> client assertion over mTLS. The token is
          not bound to a customer &mdash; the customer&rsquo;s authority for each payment is the ICP
          token &mdash; so one token serves every payment until it expires.
        </p>
      </EdProse>
      <EdCode :code="tokenRequest" lang="http" filename="Token request" />
      <EdProse>
        <p>
          See <RouterLink to="/tech/tpp-standards/security/tokens/client-assertion">Client
          Assertion</RouterLink> for how to build and sign the <code>client_assertion</code>.
        </p>
      </EdProse>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="lookup"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 3"
      title="Look up the payment instrument"
    >
      <EdProse>
        <p>
          Call
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>
          on <strong>every</strong> payment, at the default LFI&rsquo;s API Hub resource server. Only
          the LFI knows whether the customer pays by account or by card, and you cannot route the
          payment until you know. Sign the body with <code>x-jws-signature</code>, and send the time
          of the biometric identification in <code>x-fapi-auth-date</code>.
        </p>
      </EdProse>
      <EdNote type="info" title="The LFI validates the ICP token">
        <p>
          The API Hub checks your entitlement and the request schema, and proxies the lookup to the
          LFI without reading the ICP token. The LFI validates <code>Data.IcpToken</code> by calling
          ICP&rsquo;s token validation endpoint &mdash; that ICP issued it, that it has not expired
          and that it has not been used &mdash; and checks that it was issued to your organisation
          for the <code>uaeKycId</code> and amount in the request. The LFI answers
          <strong>only if the ICP token is valid</strong>. Otherwise the request is rejected with
          <code>403</code> &mdash; see <a href="#lookup-errors">Errors</a>.
        </p>
      </EdNote>
      <EdCode :code="lookupRequest" lang="http" filename="POST /instrument-lookup" />
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Data.uaeKycId</code></td><td>Yes</td><td>Know Your Customer identification reference, as ICP returned it. MUST equal the ICP token&rsquo;s <code>sub</code>.</td></tr>
            <tr><td><code>Data.IcpToken</code></td><td>Yes</td><td>The ICP token, unchanged.</td></tr>
            <tr><td><code>Data.TransactionAmount</code></td><td>Yes</td><td>The amount processed for the transaction (DE04), exactly as given to ICP. Returned as <code>InstructedAmount</code> in the payment token, and the amount the LFI debits.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <p>
          The ICP token&rsquo;s <code>txn</code> is a hash of <code>TransactionAmount</code>. Send
          it exactly as you gave it to ICP, or the lookup fails with
          <code>IcpToken.BindingMismatch</code>.
        </p>
      </EdProse>

      <h3 class="bp-sub">Handle the response</h3>
      <EdProse>
        <p>
          A successful lookup always returns the <strong>payment token</strong>, and nothing else.
          <code>Data</code> is a JWE encrypted to you, which the API Hub cannot read. Decrypt it in
          <a href="#decrypt">Step 4</a> before you route the payment.
        </p>
      </EdProse>
      <EdCode :code="lookupResponse" lang="http" filename="200 OK" />

      <h3 id="lookup-errors" class="bp-sub">Errors</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Status</th><th><code>ErrorCode</code></th><th>Meaning and what to do</th></tr>
          </thead>
          <tbody>
            <tr><td><code>403</code></td><td><code>IcpToken.Invalid</code></td><td>ICP did not confirm it issued the ICP token, or the token was altered. Do not retry.</td></tr>
            <tr><td><code>403</code></td><td><code>IcpToken.Expired</code></td><td>Take a new biometric.</td></tr>
            <tr><td><code>403</code></td><td><code>IcpToken.BindingMismatch</code></td><td>The amount, <code>uaeKycId</code> or organisation differs from what ICP bound. Check you sent exactly the amount you gave ICP, from the same organisation.</td></tr>
            <tr><td><code>403</code></td><td><code>IcpToken.AlreadyUsed</code></td><td>This ICP token was already used on a lookup. Take a new biometric.</td></tr>
            <tr><td><code>404</code></td><td>&mdash;</td><td>The LFI holds no live BioPay registration for the <code>uaeKycId</code>. Fall back to another payment method.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="decrypt"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 4"
      title="Decrypt the payment token"
      tone="surface"
    >
      <EdProse>
        <p>
          <code>Data</code> is a compact JWE (<code>RSA-OAEP-256</code>, <code>A256GCM</code>)
          encrypted by the LFI to your public encryption key from the Directory. Inside is the
          <strong>payment token</strong>: a JWS signed by the LFI (<code>PS256</code>). The API Hub
          passes the JWE on without reading it, so neither the IBAN nor the card details pass
          through the Hub in the clear. This is the same sign-then-encrypt pattern as Open Finance
          PII and events &mdash; here the BPIP is the recipient.
        </p>
      </EdProse>

      <h3 class="bp-sub">1. Read the <code>kid</code> and select your private key</h3>
      <EdProse>
        <p>
          The JWE protected header names the encryption key the LFI used. Resolve your private key by
          <code>kid</code>, not by assuming your current key &mdash; after a rotation the LFI may
          still be using the previous one.
        </p>
      </EdProse>
      <EdCodeGroup :tabs="readKidTabs" />

      <h3 class="bp-sub">2. Decrypt the JWE</h3>
      <EdCodeGroup :tabs="decryptTabs" />

      <h3 class="bp-sub">3. Verify the LFI&rsquo;s signature and the ICP binding</h3>
      <EdProse>
        <p>
          Verify the payment token against the LFI&rsquo;s signing keys from its JWKS in the
          Directory. Check that <code>iss</code> is the LFI you called, that <code>azp</code> is your
          organisation, and that <code>exp</code> has not passed. Then check that
          <code>IcpToken</code> equals the ICP token you sent on the lookup.
        </p>
      </EdProse>
      <EdCodeGroup :tabs="verifyTabs" />

      <h3 class="bp-sub">End to end</h3>
      <EdCodeGroup :tabs="fullDecryptTabs" />

      <h3 id="payment-token" class="bp-sub">Route on the instrument type</h3>
      <EdProse>
        <p>
          The payment token carries the <code>uaeKycId</code>, the ICP token, the amount from your
          lookup as <code>InstructedAmount</code>, and what the customer&rsquo;s payment
          instrument needs. Route on
          <code>InstrumentType</code>:
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>InstrumentType</code></th><th>Token carries</th><th>Next step</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ACCOUNT</code></td>
              <td><code>DebtorAccount</code> &mdash; the customer&rsquo;s IBAN</td>
              <td>Make the account payment with <code>POST /biometric-payments</code>, sending the payment token as <code>Data.PaymentToken</code> and the IBAN to credit. <a href="#payment">Step 5</a></td>
            </tr>
            <tr>
              <td><code>CARD</code></td>
              <td><code>CardDetails</code> &mdash; <code>CardNumber</code> and <code>ExpiryDate</code></td>
              <td>Authorise through Jaywan with the card details and the payment token. <a href="#card">Card payment</a></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCode :code="accountTokenClaims" lang="json" filename="Payment token claims — ACCOUNT" />
      <EdCode :code="cardTokenClaims" lang="json" filename="Payment token claims — CARD" />

      <h3 class="bp-sub">Using the payment token</h3>
      <EdProse>
        <p>
          The payment token <strong>replaces the ICP token at the point of payment</strong>. You pass
          it back to the LFI, which verifies its own signature and relies on the token to make the
          payment.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>InstrumentType</code></th><th>Present it to</th><th>Who verifies it</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ACCOUNT</code></td><td><code>POST /biometric-payments</code>, as <code>Data.PaymentToken</code></td><td>The LFI, after the API Hub proxies the payment</td></tr>
            <tr><td><code>CARD</code></td><td>The card scheme, in the card authorisation</td><td>The LFI, as issuer, when the authorisation reaches it</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdBullets accent="var(--at-teal-deep)">
        <li>Send the <strong>JWS</strong> &mdash; the decrypted content of <code>Data</code> &mdash; not the JWE. The JWE is encrypted to you, so the LFI cannot read it.</li>
        <li>Send it unchanged, <strong>once</strong>, for this payment only. It is bound to your organisation.</li>
        <li>Use it before it expires &mdash; about two minutes after the lookup. If it expires, take a new biometric.</li>
        <li>Hold card details in memory only. Never log or persist them.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 06 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="payment"
      num="06"
      color="var(--at-blue-deep)"
      eyebrow="Step 5 — account only"
      title="Make the account payment"
    >
      <EdProse>
        <p>
          For <code>InstrumentType: ACCOUNT</code>, call
          <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink>
          at the same API Hub resource server, with the
          <a href="#payment-token">payment token</a> the lookup returned and the IBAN to credit.
          Nothing else is needed: the token already carries the <code>uaeKycId</code>, the
          customer&rsquo;s account and the amount, and the LFI takes them from it. The API Hub
          proxies the payment to the LFI, which verifies the token it issued &mdash; its own
          signature, expiry, <code>InstrumentType: ACCOUNT</code>, that it was issued to your
          organisation, and that it has not been used &mdash; and creates the payment only if it is
          valid. The LFI marks the token used once it creates the payment.
        </p>
      </EdProse>
      <EdNote type="info" title="You are accountable for the creditor account">
        <p>
          The account to credit is not in the payment token, and the customer&rsquo;s biometric
          gesture is not bound to it. You supply it on the payment and are accountable for it, as
          an acquirer is for settling with its merchant in a card payment.
        </p>
      </EdNote>
      <EdCode :code="paymentRequest" lang="http" filename="POST /biometric-payments" />
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>x-idempotency-key</code></td><td>Generated by you, unique per payment. Keep it until the payment reaches a final status &mdash; it is how you recover from a lost response.</td></tr>
            <tr><td><code>Data.PaymentToken</code></td><td>The payment token &mdash; the JWS you decrypted from the lookup response, not the JWE &mdash; unchanged.</td></tr>
            <tr><td><code>Data.CreditorAccount</code></td><td>The account to credit over AANI. <code>SchemeName</code> is always <code>IBAN</code>.</td></tr>
            <tr><td><code>Data.PaymentPurposeCode</code></td><td>Required. The category of goods or services the payment is for, from the published AANI payment purpose code list.</td></tr>
            <tr><td><code>Data.DebtorReference</code></td><td>Optional. A note for the customer, which may appear on their statement. Up to 35 characters.</td></tr>
            <tr><td><code>Data.CreditorReference</code></td><td>Optional. A note for the merchant or its bank, to support reconciliation. Up to 35 characters.</td></tr>
            <tr><td><code>Data.Subscription.Webhook</code></td><td>Optional. Your webhook <code>Url</code>, and <code>IsActive: true</code>, to receive payment status events for this payment. Omit it to poll instead.</td></tr>
            <tr><td><code>Risk</code></td><td><strong>Not yet specified.</strong> Send an empty object. Its contents are an open item.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <p>
          You do not send any evidence of the biometric identification. The API Hub records it from
          the ICP token embedded in the payment token, once the LFI has accepted the payment.
        </p>
      </EdProse>
      <EdCode :code="paymentResponse" lang="http" filename="201 Created" />
      <EdProse>
        <p>
          The response is always <code>201</code> with <code>Status: Pending</code>. It echoes what
          you sent, with the <code>PaymentId</code> and status. The LFI
          executes the payment asynchronously; tell the customer the payment is pending and track it
          as in Step 6.
        </p>
      </EdProse>

      <h3 class="bp-sub">Errors</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Status</th><th><code>ErrorCode</code></th><th>Meaning and what to do</th></tr>
          </thead>
          <tbody>
            <tr><td><code>403</code></td><td><code>PaymentToken.InvalidSignature</code></td><td>The payment token was not signed by the LFI or was altered. Check you sent the JWS, not the JWE. Do not retry.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.Expired</code></td><td>Take a new biometric and look up again.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.WrongInstrumentType</code></td><td>The token is for a <code>CARD</code>. Authorise through the card scheme instead.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.BindingMismatch</code></td><td>The token was issued to a different organisation. Present it from the organisation that made the lookup.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.AlreadyUsed</code></td><td>A payment already used this token. If you are retrying, use the same <code>x-idempotency-key</code> and body; otherwise take a new biometric.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.TemporarilyBlocked</code></td><td>The customer&rsquo;s account is <code>Inactive</code>, <code>Dormant</code> or <code>Suspended</code>. Tell the customer to contact their bank, and offer another payment method.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.PermanentAccessFailure</code></td><td>The customer&rsquo;s account is <code>Closed</code>, <code>Deceased</code> or <code>Unclaimed</code>. Do not retry. Offer another payment method.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.DebtorAccountMismatch</code></td><td>The payment token&rsquo;s <code>DebtorAccount</code> is no longer the account the customer has registered for BioPay &mdash; for example, they changed it after the lookup. Take a new biometric and start again from the lookup.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.TransientAccessFailure</code></td><td>The account is temporarily inaccessible. You MAY retry once while the payment token is still valid; otherwise offer another payment method.</td></tr>
            <tr><td><code>409</code></td><td>&mdash;</td><td>The <code>x-idempotency-key</code> was already used with a different body.</td></tr>
            <tr><td><code>500</code></td><td><code>GenericRecoverableError</code></td><td>A temporary failure at the API Hub or the LFI. Retry with the same <code>x-idempotency-key</code> and identical body while the payment token is still valid.</td></tr>
            <tr><td><code>500</code></td><td><code>GenericError</code></td><td>The payment could not be processed. Do not retry. Offer another payment method.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <p>
          An error means <strong>no payment was created</strong>, and the payment token is not
          used up. The LFI&rsquo;s fraud, sanctions and AML screening, and the balance check, run
          after the payment is created: their outcome is a <code>Rejected</code> status, not an
          error &mdash; see <a href="#rejections">Rejected payments</a>.
        </p>
      </EdProse>
      <EdNote type="tip" title="Lost response">
        <p>
          If the request times out, do not send a new payment. Retry with the same
          <code>x-idempotency-key</code> and identical body. If the payment was created, the API Hub
          returns the original payment with its <code>PaymentId</code>; if not, it is created now.
          The same payment token is accepted on an idempotent retry.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 07 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="status"
      num="07"
      color="var(--at-gold)"
      eyebrow="Step 6 — account only"
      title="Track the payment status"
      tone="surface"
    >
      <EdProse>
        <p>
          The payment stays <code>Pending</code> until the LFI patches its outcome to the API Hub.
          Learn the outcome by event, by polling, or both.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>Status</code></th><th>ISO 20022</th><th>Meaning</th><th>Final</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Pending</code></td><td><code>PDNG</code></td><td>Payment accepted for processing; further checks or rail submission outstanding.</td><td>No</td></tr>
            <tr><td><code>AcceptedSettlementCompleted</code></td><td><code>ACSC</code></td><td>AANI only. The LFI has passed the payment to AANI and is awaiting confirmation.</td><td>No</td></tr>
            <tr><td><code>AcceptedWithoutPosting</code></td><td><code>ACWP</code></td><td>AANI only. AANI has confirmed the payment &mdash; the successful outcome.</td><td>Yes</td></tr>
            <tr><td><code>AcceptedCreditSettlementCompleted</code></td><td><code>ACCC</code></td><td>LFI only. The merchant&rsquo;s account is at the same bank, and the LFI has booked the payment on its own ledger &mdash; the successful outcome.</td><td>Yes</td></tr>
            <tr><td><code>Rejected</code></td><td><code>RJCT</code></td><td>The payment was rejected, by the LFI or by AANI. <code>RejectReasonCode</code> says why &mdash; see <a href="#rejections">Rejected payments</a>.</td><td>Yes</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <p>
          Once the LFI has routed the payment, <code>PaymentRail</code> says how it was settled:
          <code>AANI</code>, or <code>LFI</code> where the customer and the merchant bank with the
          same LFI. Treat <code>AcceptedWithoutPosting</code> (AANI) or
          <code>AcceptedCreditSettlementCompleted</code> (LFI) as paid.
          <code>AcceptedSettlementCompleted</code> is not final: the LFI updates the payment again
          once AANI confirms it. On AANI, <code>PaymentTransactionId</code> carries the transaction
          identifier the LFI assigned on the rail, starting <code>OFP</code>; a payment booked on the
          LFI&rsquo;s own ledger has none. The statuses and how LFIs map them from each rail are the
          same as for Open Finance payments &mdash; see
          <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-status">Payment Status</RouterLink>.
        </p>
      </EdProse>

      <h3 id="rejections" class="bp-sub">Rejected payments</h3>
      <EdProse>
        <p>
          A rejected payment carries <code>RejectReasonCode</code>: one or more entries, each with
          a <code>Code</code> and a <code>Message</code>. The namespace of <code>Code</code> follows
          <code>PaymentRail</code>, not where the check failed: <code>AANI.</code> for a payment
          routed to AANI, including one the LFI rejected before submitting it, and
          <code>LFI.</code> for a payment booked on the LFI&rsquo;s own ledger. The LFI sanitises
          <code>Message</code>, but it is not standardised &mdash; act on <code>Code</code>.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Scenario</th><th><code>RejectReasonCode[].Code</code> (AANI)</th><th>What to do</th></tr>
          </thead>
          <tbody>
            <tr><td>Fraud, sanctions or AML screening at the LFI</td><td><code>AANI.ScreeningRejected</code></td><td>Do not retry. Offer another payment method. Do not suggest a reason to the customer.</td></tr>
            <tr><td>Not enough balance</td><td><code>AANI.AM04</code></td><td>Tell the customer. A new payment needs a new biometric.</td></tr>
            <tr><td>Amount above the customer&rsquo;s limit</td><td><code>AANI.AM14</code></td><td>Tell the customer. Offer another payment method.</td></tr>
            <tr><td>Customer&rsquo;s account blocked after the payment was created</td><td><code>AANI.AC06</code></td><td>Tell the customer to contact their bank.</td></tr>
            <tr><td>Merchant&rsquo;s account closed or unknown</td><td><code>AANI.AC07</code>, <code>AANI.UCRD</code></td><td>Check your creditor details for this merchant. Do not retry with the same details.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="warning" title="Screening rejections are not itemised">
        <p>
          Fraud, sanctions and AML rejections share one code, <code>AANI.ScreeningRejected</code>
          (<code>LFI.ScreeningRejected</code> on a payment booked on the LFI&rsquo;s own ledger).
          As in Open Finance, the LFI MUST NOT reveal its detection logic, a sanctions match or a
          case reference, so the BPIP is not told which control rejected the payment. The
          <code>AANI.</code> codes shown are the most common; the full list is in the AANI Core
          Service Interface Specification, and the LFI relays them unchanged.
        </p>
      </EdNote>

      <h3 class="bp-sub">Option 1 &mdash; Receive the payment status event (recommended)</h3>
      <EdProse>
        <p>
          Set <code>Data.Subscription.Webhook</code> on
          <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink>
          with your webhook <code>Url</code> and <code>IsActive: true</code>. Each time the LFI patches
          the payment, the API Hub POSTs a
          <RouterLink to="/biopay/payment/api-reference/payment-status-event">payment status event</RouterLink>
          to that URL. The body is a JWE
          (<code>Content-Type: application/jwe</code>) encrypted to your encryption certificate,
          wrapping a JWS signed by the API Hub.
        </p>
      </EdProse>
      <EdBullets accent="var(--at-gold)">
        <li><strong>Acknowledge first.</strong> Respond <code>202 Accepted</code> with an empty body before any processing. The Hub retries on anything other than <code>2xx</code>.</li>
        <li><strong>Decrypt</strong> with the private key matching the <code>kid</code> in the JWE header.</li>
        <li><strong>Verify</strong> the API Hub&rsquo;s signature and the <code>iss</code>, <code>aud</code>, <code>exp</code> and <code>nbf</code> claims, and reject a <code>jti</code> you have already processed.</li>
        <li><strong>Read</strong> <code>message.Data</code> &mdash; the payment as it stands after the change.</li>
      </EdBullets>
      <EdCode :code="ackResponse" lang="http" filename="HTTP response" />
      <EdProse>
        <p>
          Decryption and verification follow
          <RouterLink to="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event
          Notifications</RouterLink>, except that the event concerns a <code>PaymentId</code>, not a
          <code>ConsentId</code>.
        </p>
      </EdProse>
      <EdCode :code="eventPayload" lang="json" filename="Decrypted and verified event" />

      <h3 class="bp-sub">Option 2 &mdash; Poll the payment</h3>
      <EdProse>
        <p>
          Call
          <RouterLink to="/biopay/payment/api-reference/biometric-payments-payment-id"><code>GET /biometric-payments/{PaymentId}</code></RouterLink>
          until <code>Status</code> is no longer <code>Pending</code>. Back off between calls.
        </p>
      </EdProse>
      <EdCode :code="pollById" lang="http" filename="GET /biometric-payments/{PaymentId}" />
      <EdCode :code="pollRejectedResponse" lang="http" filename="200 OK — rejected payment" />
      <EdProse>
        <p>
          If you never received the <code>201</code> and do not have a <code>PaymentId</code>, retry
          the original request with the same <code>x-idempotency-key</code> and identical body
          &mdash; see <a href="#payment">Lost response</a>.
        </p>
      </EdProse>
    </EdSectionBand>

    <!-- 08 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="card"
      num="08"
      color="var(--at-navy)"
      eyebrow="Card payment"
      title="Authorise through the card scheme"
    >
      <EdNote type="info" title="Coming soon — Jaywan specification">
        <p>
          The card authorisation message, and how BioPay fields map onto it, will come from the
          Jaywan specification.
        </p>
      </EdNote>
      <EdProse>
        <p>
          After Step 4 you hold the <a href="#payment-token">payment token</a> with
          <code>InstrumentType: CARD</code>, carrying the customer&rsquo;s <code>CardDetails</code>.
          As acquirer, you submit the authorisation to Jaywan &mdash; not through the API Hub. It
          will carry:
        </p>
      </EdProse>
      <EdBullets accent="var(--at-navy)">
        <li><code>CardNumber</code> and <code>ExpiryDate</code> from the payment token, the same amount you sent on the lookup, and your merchant and terminal details as for any card authorisation.</li>
        <li>The payment token, with cardholder verification coded as biometric, verified by ICP. Field mapping to be agreed with the scheme.</li>
      </EdBullets>
      <EdProse>
        <p>
          The card scheme carries the payment token to the LFI as issuer. The LFI verifies the token
          it issued &mdash; its own signature and expiry, that it is a <code>CARD</code> token, that
          the card and amount match the authorisation, and that it has not been used
          &mdash; marks it used, and approves or declines. The outcome comes back to you from the
          card scheme; there is no <code>PaymentId</code>, payment status event or polling for a card
          payment.
        </p>
      </EdProse>
    </EdSectionBand>
  </div>
</template>

<style scoped>
/* Subsection heading inside a section band. */
.bp-sub {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--at-navy-deep);
  margin: 2.25rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--at-grid-line);
}
</style>
