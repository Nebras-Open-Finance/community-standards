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
  { id: 'resolve', label: 'ICP authorisation' },
  { id: 'token', label: 'Access token' },
  { id: 'lookup', label: 'Instrument lookup' },
  { id: 'decrypt', label: 'Card credential' },
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
    "IcpAuthorisation": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImljcC1zaWduLTEifQ...",
    "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
    "CardAcceptor": {
      "AcquirerIdentification": "400123",
      "MerchantIdentification": "MID-000123",
      "TerminalIdentification": "T-0042"
    }
  }
}`

const lookupAccountResponse = `HTTP/1.1 200 OK
Content-Type: application/json
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d

{
  "Data": {
    "uaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
    "PaymentInstrument": "AANI",
    "DebtorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456"
    },
    "PaymentToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6Imh1Yi1zaWduLTEifQ..."
  },
  "Meta": {}
}`

const paymentTokenClaims = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "sub": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
  "azp": "[BPIP_ORGANISATION_ID]",
  "aud": "https://rs1.[LFICODE].apihub.openfinance.ae",
  "jti": "pt-3c9a7e21-5b84-4f0d-9e62-1a7b8c9d0e1f",
  "iat": 1792059303,
  "exp": 1792059423,
  "cnf": { "x5t#S256": "bwcK0esc3ACC3DB2Y5_lESsXE8o9ltc05O89jdN-dg2" },
  "PaymentType": "Account",
  "PaymentInstrument": "AANI",
  "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
  "CardAcceptor": {
    "AcquirerIdentification": "400123",
    "MerchantIdentification": "MID-000123",
    "TerminalIdentification": "T-0042"
  },
  "DebtorAccount": { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" },
  "IcpAuthorisation": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImljcC1zaWduLTEifQ..."
}`

const lookupCardResponse = `HTTP/1.1 200 OK
Content-Type: application/json
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d

{
  "Data": {
    "uaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
    "PaymentInstrument": "JAYWAN",
    "EncryptedCardCredential": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiYnBpcC1lbmMtMSJ9...",
    "PaymentToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6Imh1Yi1zaWduLTEifQ..."
  },
  "Meta": {}
}`

// ── Card credential decryption ─────────────────────────────────────────────
const readKidTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const kid = getJweKid(encryptedCardCredential)
const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

kid = get_jwe_kid(encrypted_card_credential)
private_key = my_key_store.get_private_key(kid)`,
  },
] as const

const decryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { compactDecrypt, importPKCS8 } from 'jose'

const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(encryptedCardCredential, privateKey)
const lfiJws = new TextDecoder().decode(plaintext)`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `from jwcrypto import jwe

token = jwe.JWE()
token.deserialize(encrypted_card_credential, key=private_key)
lfi_jws = token.payload.decode()`,
  },
] as const

const verifyTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { createRemoteJWKSet, jwtVerify } from 'jose'

// The LFI's signing keys, from its JWKS in the Directory
const lfiJwks = createRemoteJWKSet(new URL(lfiJwksUri))

const { payload } = await jwtVerify(lfiJws, lfiJwks, {
  issuer: expectedLfiIssuer,
  audience: process.env.CLIENT_ID,
  algorithms: ['PS256'],
})

// Bind the credential to the ICP authorisation you presented on the lookup
if (payload.IcpTransactionId !== icpJti) {
  throw new Error('Card credential was not issued for this ICP authorisation')
}`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import json, os
from jwcrypto import jwk, jwt

# The LFI's signing keys, from its JWKS in the Directory
lfi_keys = jwk.JWKSet.from_json(fetch_lfi_jwks())

verified = jwt.JWT(
    key=lfi_keys,
    jwt=lfi_jws,
    algs=["PS256"],
    check_claims={"iss": expected_lfi_issuer, "aud": os.environ["CLIENT_ID"], "exp": None},
)
claims = json.loads(verified.claims)

# Bind the credential to the ICP authorisation you presented on the lookup
if claims["IcpTransactionId"] != icp_jti:
    raise ValueError("Card credential was not issued for this ICP authorisation")`,
  },
] as const

const fullDecryptTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { compactDecrypt, createRemoteJWKSet, importPKCS8, jwtVerify } from 'jose'

async function openCardCredential(encryptedCardCredential: string, icpJti: string) {
  // 1. Select your private key by the kid in the JWE header
  const [headerB64] = encryptedCardCredential.split('.')
  const { kid } = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  const privateKey = await importPKCS8(myKeyStore.getPrivateKeyPem(kid), 'RSA-OAEP-256')

  // 2. Decrypt the JWE → the LFI's JWS
  const { plaintext } = await compactDecrypt(encryptedCardCredential, privateKey)
  const lfiJws = new TextDecoder().decode(plaintext)

  // 3. Verify the LFI's signature and standard claims
  const lfiJwks = createRemoteJWKSet(new URL(lfiJwksUri))
  const { payload } = await jwtVerify(lfiJws, lfiJwks, {
    issuer: expectedLfiIssuer,
    audience: process.env.CLIENT_ID,
    algorithms: ['PS256'],
  })

  // 4. Bind to the ICP authorisation, and refuse an expired cryptogram
  if (payload.IcpTransactionId !== icpJti) {
    throw new Error('Card credential was not issued for this ICP authorisation')
  }
  if (Date.parse(payload.ExpirationDateTime as string) <= Date.now()) {
    throw new Error('Cryptogram has expired')
  }

  // Hold in memory only, for the card scheme authorisation. Never log or persist.
  return {
    cardSchemeToken: payload.CardSchemeToken as string,
    cryptogram: payload.Cryptogram as string,
    expirationDateTime: payload.ExpirationDateTime as string,
  }
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json, os
from datetime import datetime, timezone
from jwcrypto import jwe, jwk, jwt

def open_card_credential(encrypted_card_credential: str, icp_jti: str) -> dict:
    # 1. Select your private key by the kid in the JWE header
    header_b64 = encrypted_card_credential.split(".")[0]
    kid = json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]
    private_key = my_key_store.get_private_key(kid)

    # 2. Decrypt the JWE → the LFI's JWS
    token = jwe.JWE()
    token.deserialize(encrypted_card_credential, key=private_key)
    lfi_jws = token.payload.decode()

    # 3. Verify the LFI's signature and standard claims
    lfi_keys = jwk.JWKSet.from_json(fetch_lfi_jwks())
    verified = jwt.JWT(
        key=lfi_keys,
        jwt=lfi_jws,
        algs=["PS256"],
        check_claims={"iss": expected_lfi_issuer, "aud": os.environ["CLIENT_ID"], "exp": None},
    )
    claims = json.loads(verified.claims)

    # 4. Bind to the ICP authorisation, and refuse an expired cryptogram
    if claims["IcpTransactionId"] != icp_jti:
        raise ValueError("Card credential was not issued for this ICP authorisation")
    expires = datetime.fromisoformat(claims["ExpirationDateTime"].replace("Z", "+00:00"))
    if expires <= datetime.now(timezone.utc):
        raise ValueError("Cryptogram has expired")

    # Hold in memory only, for the card scheme authorisation. Never log or persist.
    return {
        "card_scheme_token": claims["CardSchemeToken"],
        "cryptogram": claims["Cryptogram"],
        "expiration_date_time": claims["ExpirationDateTime"],
    }`,
  },
] as const

const decryptedCredential = `{
  "iss": "[LFI_ORGANISATION_ID]",
  "aud": "[CLIENT_ID]",
  "iat": 1792059302,
  "exp": 1792059362,
  "IcpTransactionId": "icp-txn-5f2b9c71e0a4",
  "CardSchemeToken": "4895370012003478",
  "Cryptogram": "AgAAAAAAAIR8CQrXcIhbQAAAAAA=",
  "ExpirationDateTime": "2026-10-15T10:16:02Z"
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
    "uaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
    "DebtorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456"
    },
    "Instruction": {
      "InstructionIdentification": "POS-20261015-000731",
      "EndToEndIdentification": "E2E-20261015-000731",
      "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
      "RemittanceInformation": { "Reference": "Receipt 000731" }
    },
    "Creditor": {
      "CreditorAccount": {
        "SchemeName": "IBAN",
        "Identification": "AE220331234567890876543",
        "Name": { "en": "Example Grocers LLC" }
      }
    },
    "PaymentToken": "eyJhbGciOiJQUzI1NiIsImtpZCI6Imh1Yi1zaWduLTEifQ...",
    "Subscription": {
      "Webhook": {
        "Url": "https://bpip.example.com/webhooks/biopay",
        "IsActive": true
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "BiometricPointOfSale",
    "MerchantCategoryCode": "5411",
    "MerchantIdentification": "MID-000123",
    "MerchantName": "Example Grocers",
    "TerminalIdentification": "T-0042"
  }
}`

const paymentResponse = `HTTP/1.1 201 Created
Content-Type: application/json
x-fapi-interaction-id: 1f0e9c2a-77d4-4b8e-a3f1-5d2c6b7e8a90

{
  "Data": {
    "PaymentId": "7130812d-4d81-4c68-8187-6358cfbce521",
    "IdempotencyKey": "6f1d2a0c-9b43-4e7a-8d15-2c3b4a5e6f70",
    "Status": "Pending",
    "CreationDateTime": "2026-10-15T10:15:03Z",
    "StatusUpdateDateTime": "2026-10-15T10:15:03Z",
    "BiometricAssurance": {
      "MatchMethod": "Fingerprint",
      "MatchDateTime": "2026-10-15T10:15:02Z",
      "IcpTransactionId": "icp-txn-5f2b9c71e0a4"
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
      "IdempotencyKey": "6f1d2a0c-9b43-4e7a-8d15-2c3b4a5e6f70",
      "Status": "AcceptedWithoutPosting",
      "CreationDateTime": "2026-10-15T10:15:03Z",
      "StatusUpdateDateTime": "2026-10-15T10:15:05Z",
      "RailReference": {
        "Scheme": "AANI",
        "SchemeTransactionId": "AANI2026101510150500731"
      }
    }
  }
}`

const pollById = `GET /open-finance/biometric-payments/v1/biometric-payments/7130812d-4d81-4c68-8187-6358cfbce521 HTTP/1.1
Host: rs1.[LFICODE].apihub.openfinance.ae
Authorization: Bearer <access_token>
x-fapi-interaction-id: 4c2e8a1f-6b3d-4f7e-9a0c-1d2e3f4a5b6c`

const pollByKey = `GET /open-finance/biometric-payments/v1/biometric-payments?IdempotencyKey=6f1d2a0c-9b43-4e7a-8d15-2c3b4a5e6f70 HTTP/1.1
Host: rs1.[LFICODE].apihub.openfinance.ae
Authorization: Bearer <access_token>
x-fapi-interaction-id: 8e1f2a3b-4c5d-4e6f-8a7b-9c0d1e2f3a4b`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Payment · Draft"
      eyebrow-color="var(--at-gold)"
      title="Payment API Guide"
      :meta="meta"
      lede="How a BPIP takes a BioPay payment: resolving the customer with ICP, looking up their payment instrument through the API Hub, decrypting a card credential, initiating an account-to-account payment, and tracking its status. <strong>Everything here is draft</strong> &mdash; endpoints, fields and claims are proposals for review."
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
          authorisation is bound to it.
        </li>
        <li>
          <strong>A signing certificate</strong> for your client assertion and the
          <code>x-jws-signature</code> on every request. See
          <RouterLink to="/tech/tpp-standards/security/fapi/message-signing">Message Signing</RouterLink>.
        </li>
        <li>
          <strong>An encryption certificate</strong>, required for every BPIP. The LFI encrypts the
          card credential to it, and the API Hub encrypts payment status events to it.
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
              <td>Sends it as <code>Data.uaeKycId</code> on the lookup and on the payment.</td>
            </tr>
            <tr>
              <td>Default LFI</td>
              <td>Addresses every call for this payment to that LFI&rsquo;s API Hub resource server, <code>rs1.[LFICODE].apihub.openfinance.ae</code>.</td>
            </tr>
            <tr>
              <td>ICP authorisation</td>
              <td>Sends it unchanged as <code>Data.IcpAuthorisation</code> on the lookup, where the API Hub exchanges it for a payment token. Keeps its <code>jti</code> to check against the card credential.</td>
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
          authorisation &mdash; so one token serves every payment until it expires.
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
      <EdNote type="info" title="The API Hub checks the ICP authorisation first">
        <p>
          The API Hub verifies <code>Data.IcpAuthorisation</code> before anything reaches the LFI:
          ICP&rsquo;s signature and expiry, that it was issued to your client and bound to your
          transport certificate, that it matches the <code>uaeKycId</code>, amount and merchant
          details in the request, and that it has not been used before. The Hub proxies the lookup to
          the LFI <strong>only if the ICP authorisation is valid</strong>. Otherwise it rejects the
          request with <code>403</code> &mdash; see <a href="#lookup-errors">Errors</a>.
        </p>
      </EdNote>
      <EdCode :code="lookupRequest" lang="http" filename="POST /instrument-lookup" />
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Data.uaeKycId</code></td><td>Yes</td><td>As ICP returned it. MUST equal the ICP authorisation&rsquo;s <code>sub</code>.</td></tr>
            <tr><td><code>Data.IcpAuthorisation</code></td><td>Yes</td><td>The ICP authorisation, unchanged.</td></tr>
            <tr><td><code>Data.InstructedAmount</code></td><td>Yes</td><td>The payment amount, exactly as given to ICP. For a card, the LFI binds the cryptogram to it.</td></tr>
            <tr><td><code>Data.CardAcceptor</code></td><td>Yes</td><td>Your acquirer, merchant and terminal identifiers, exactly as given to ICP. For a card, the LFI binds the cryptogram to them and uses them to pick a scheme the merchant accepts on a co-badged card.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="bp-sub">Handle the response</h3>
      <EdProse>
        <p>Route on <code>Data.PaymentInstrument</code>:</p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>PaymentInstrument</code></th><th>Response carries</th><th>Next step</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>AANI</code></td>
              <td><code>DebtorAccount</code> &mdash; the customer&rsquo;s IBAN &mdash; and a payment token with <code>PaymentType: Account</code></td>
              <td>Make the account payment with <code>POST /biometric-payments</code>, sending the IBAN back as <code>Data.DebtorAccount</code> and the payment token as <code>Data.PaymentToken</code>. <a href="#payment">Step 5</a></td>
            </tr>
            <tr>
              <td><code>JAYWAN</code>, <code>VISA</code>, <code>MASTERCARD</code></td>
              <td><code>EncryptedCardCredential</code> &mdash; a JWE only you can decrypt &mdash; and a payment token with <code>PaymentType: Card</code></td>
              <td>Decrypt the credential, then authorise through that card scheme with the payment token. <a href="#decrypt">Step 4</a></td>
            </tr>
            <tr>
              <td><code>CBDC</code></td>
              <td>To be defined</td>
              <td>Not yet specified.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCode :code="lookupAccountResponse" lang="http" filename="200 — account (AANI)" />
      <EdCode :code="lookupCardResponse" lang="http" filename="200 — card (Jaywan)" />

      <h3 id="payment-token" class="bp-sub">The payment token</h3>
      <EdProse>
        <p>
          Every successful lookup returns <code>Data.PaymentToken</code>: a JWS signed by the API Hub
          once the LFI has answered. It <strong>replaces the ICP authorisation at the point of
          payment</strong> &mdash; the ICP authorisation is used once, on the lookup, and is
          embedded unchanged inside the payment token. The token states whether this is an account
          or a card payment, and binds the customer, the amount, the merchant and, for an account,
          the IBAN.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>PaymentType</code></th><th>Present it to</th><th>Who verifies it</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Account</code></td><td><code>POST /biometric-payments</code>, as <code>Data.PaymentToken</code></td><td>The API Hub</td></tr>
            <tr><td><code>Card</code></td><td>The card scheme, in the card authorisation</td><td>The card scheme, against the API Hub&rsquo;s published signing keys</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdBullets accent="var(--at-navy)">
        <li>Treat it as opaque and send it unchanged. You MAY decode it to read <code>PaymentType</code>.</li>
        <li>Use it <strong>once</strong>, for this payment only. It is bound to your client and transport certificate.</li>
        <li>Use it before it expires &mdash; about two minutes after the lookup. If it expires, take a new biometric.</li>
      </EdBullets>
      <EdCode :code="paymentTokenClaims" lang="json" filename="Payment token claims (account)" />

      <h3 id="lookup-errors" class="bp-sub">Errors</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Status</th><th><code>ErrorCode</code></th><th>Meaning and what to do</th></tr>
          </thead>
          <tbody>
            <tr><td><code>403</code></td><td><code>IcpAuthorisation.InvalidSignature</code></td><td>The ICP authorisation was not signed by ICP or was altered. Do not retry.</td></tr>
            <tr><td><code>403</code></td><td><code>IcpAuthorisation.Expired</code></td><td>Take a new biometric.</td></tr>
            <tr><td><code>403</code></td><td><code>IcpAuthorisation.BindingMismatch</code></td><td>The amount, merchant, <code>uaeKycId</code>, client or certificate differs from what ICP bound. Check you sent exactly the amount and merchant details you gave ICP, from the same client and certificate.</td></tr>
            <tr><td><code>403</code></td><td><code>IcpAuthorisation.AlreadyUsed</code></td><td>This ICP authorisation was already exchanged for a payment token. Take a new biometric.</td></tr>
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
      eyebrow="Step 4 — card only"
      title="Decrypt the card credential"
      tone="surface"
    >
      <EdProse>
        <p>
          For a card, <code>EncryptedCardCredential</code> is a compact JWE (<code>RSA-OAEP-256</code>,
          <code>A256GCM</code>) encrypted by the LFI to your public encryption key from the Directory.
          Inside is a JWS signed by the LFI (<code>PS256</code>). The API Hub passes the JWE on
          without reading it, so card data never passes through the Hub in the clear. This is the
          same sign-then-encrypt pattern as Open Finance PII and events &mdash; here the BPIP is the
          recipient.
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
          Verify the inner JWS against the LFI&rsquo;s signing keys from its JWKS in the Directory.
          Check that <code>iss</code> is the LFI you called, that <code>aud</code> is your client
          identifier, and that <code>exp</code> has not passed. Then check that
          <code>IcpTransactionId</code> equals the <code>jti</code> of the ICP authorisation you sent
          on the lookup.
        </p>
      </EdProse>
      <EdCodeGroup :tabs="verifyTabs" />
      <EdCode :code="decryptedCredential" lang="json" filename="Verified card credential claims" />

      <h3 class="bp-sub">End to end</h3>
      <EdCodeGroup :tabs="fullDecryptTabs" />

      <EdProse>
        <p>Continue with <a href="#card">Card payment</a>.</p>
      </EdProse>
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
          For an account instrument, call
          <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink>
          at the same API Hub resource server, with the
          <a href="#payment-token">payment token</a> the lookup returned. The API Hub verifies the
          token &mdash; its own signature, expiry, <code>PaymentType: Account</code>, your client and
          certificate, and that the <code>uaeKycId</code>, IBAN and amount match the request &mdash;
          and proxies the payment to the LFI only if it is valid. It marks the token used once the
          LFI creates the payment.
        </p>
      </EdProse>
      <EdCode :code="paymentRequest" lang="http" filename="POST /biometric-payments" />
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>x-idempotency-key</code></td><td>Generated by you, unique per payment. Keep it until the payment reaches a final status &mdash; it is how you recover from a lost response.</td></tr>
            <tr><td><code>Data.DebtorAccount</code></td><td>The customer&rsquo;s IBAN, exactly as the lookup returned it in <code>Data.DebtorAccount</code>. The API Hub checks it against the IBAN bound in the payment token.</td></tr>
            <tr><td><code>Data.Instruction.InstructedAmount</code></td><td>MUST equal the amount you sent on the lookup, which is bound in the payment token.</td></tr>
            <tr><td><code>Data.Creditor</code></td><td>The merchant&rsquo;s account, credited over AANI.</td></tr>
            <tr><td><code>Data.PaymentToken</code></td><td>The payment token from the lookup, unchanged.</td></tr>
            <tr><td><code>Data.Subscription.Webhook</code></td><td>Optional. Your webhook <code>Url</code>, and <code>IsActive: true</code>, to receive payment status events for this payment. Omit it to poll instead.</td></tr>
            <tr><td><code>Risk</code></td><td>The payment context and merchant details.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <p>
          You do not send <code>BiometricAssurance</code>. The API Hub records it on the payment from
          the ICP authorisation embedded in the payment token.
        </p>
      </EdProse>
      <EdCode :code="paymentResponse" lang="http" filename="201 Created" />
      <EdProse>
        <p>
          The response is always <code>201</code> with <code>Status: Pending</code>. The LFI executes
          the payment over AANI/IPP asynchronously; tell the customer the payment is pending and track
          it as in Step 6.
        </p>
      </EdProse>

      <h3 class="bp-sub">Errors</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Status</th><th><code>ErrorCode</code></th><th>Meaning and what to do</th></tr>
          </thead>
          <tbody>
            <tr><td><code>403</code></td><td><code>PaymentToken.InvalidSignature</code></td><td>The payment token was not signed by the API Hub or was altered. Do not retry.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.Expired</code></td><td>Take a new biometric and look up again.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.WrongPaymentType</code></td><td>The token is for a card payment. Authorise through the card scheme instead.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.BindingMismatch</code></td><td>The <code>uaeKycId</code>, IBAN, amount, client or certificate differs from what the token binds. Send the values from the lookup, from the same client and certificate.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.AlreadyUsed</code></td><td>A payment already used this token. If you are retrying, use the same <code>x-idempotency-key</code> and body; otherwise take a new biometric.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.TemporarilyBlocked</code></td><td>The customer&rsquo;s account is <code>Inactive</code>, <code>Dormant</code> or <code>Suspended</code>. Tell the customer to contact their bank, and offer another payment method.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.PermanentAccessFailure</code></td><td>The customer&rsquo;s account is <code>Closed</code>, <code>Deceased</code> or <code>Unclaimed</code>. Do not retry. Offer another payment method.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.DebtorAccountMismatch</code></td><td><code>DebtorAccount</code> is not the account the customer has registered for BioPay &mdash; for example, they changed it after the lookup. Take a new biometric and start again from the lookup.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.TransientAccessFailure</code></td><td>The account is temporarily inaccessible. You MAY retry once while the payment token is still valid; otherwise offer another payment method.</td></tr>
            <tr><td><code>409</code></td><td>&mdash;</td><td>The <code>x-idempotency-key</code> was already used with a different body.</td></tr>
            <tr><td><code>500</code></td><td><code>GenericRecoverableError</code></td><td>A temporary failure at the API Hub or the LFI. Check by idempotency key before retrying (Step 6).</td></tr>
            <tr><td><code>500</code></td><td><code>GenericError</code></td><td>The payment could not be processed. Check by idempotency key, and do not retry if no payment exists.</td></tr>
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
          <code>x-idempotency-key</code> and identical body, or query by idempotency key as shown in
          Step 6. The same payment token is accepted on an idempotent retry.
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
            <tr><td><code>AcceptedSettlementCompleted</code></td><td><code>ACSC</code></td><td>Settlement of the customer&rsquo;s account has been completed &mdash; a temporary, payment-processing state.</td><td>No</td></tr>
            <tr><td><code>AcceptedWithoutPosting</code></td><td><code>ACWP</code></td><td>The receiving bank has accepted the payment, but the LFI cannot confirm the merchant&rsquo;s account has been credited &mdash; a settlement state, and the successful outcome.</td><td>Yes</td></tr>
            <tr><td><code>Rejected</code></td><td><code>RJCT</code></td><td>The payment was rejected, either pre-rail by the LFI or post-rail by AANI / UAEFTS. <code>StatusReason.Code</code> says why &mdash; see <a href="#rejections">Rejected payments</a>.</td><td>Yes</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <p>
          Treat <code>AcceptedWithoutPosting</code> as paid. <code>AcceptedSettlementCompleted</code>
          is temporary: the LFI MAY report it before the final status. The statuses and how LFIs map
          them from each rail are the same as for Open Finance payments &mdash; see
          <RouterLink to="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status">Payment Status</RouterLink>.
        </p>
      </EdProse>

      <h3 id="rejections" class="bp-sub">Rejected payments</h3>
      <EdProse>
        <p>
          <code>StatusReason.Code</code> is namespaced by where the payment was rejected:
          <code>LFI.</code> when the LFI rejected it before the rail; <code>AANI.</code> when AANI or
          the receiving bank rejected it.
          <code>StatusReason.Description</code> is safe to show the customer.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Scenario</th><th><code>StatusReason.Code</code></th><th>What to do</th></tr>
          </thead>
          <tbody>
            <tr><td>Fraud, sanctions or AML screening at the LFI</td><td><code>LFI.ScreeningRejected</code></td><td>Do not retry. Offer another payment method. Do not suggest a reason to the customer.</td></tr>
            <tr><td>Not enough balance, checked by the LFI before the rail</td><td><code>LFI.InsufficientFunds</code></td><td>Tell the customer. A new payment needs a new biometric.</td></tr>
            <tr><td>Not enough balance, reported by AANI</td><td><code>AANI.AM04</code></td><td>As above.</td></tr>
            <tr><td>Amount above the customer&rsquo;s limit</td><td><code>LFI.AmountExceedsLimit</code> or <code>AANI.AM14</code></td><td>Tell the customer. Offer another payment method.</td></tr>
            <tr><td>Customer&rsquo;s account blocked after the payment was created</td><td><code>LFI.AccountBlocked</code> or <code>AANI.AC06</code></td><td>Tell the customer to contact their bank.</td></tr>
            <tr><td>Merchant&rsquo;s account closed or unknown</td><td><code>AANI.AC07</code>, <code>AANI.UCRD</code></td><td>Check your creditor details for this merchant. Do not retry with the same details.</td></tr>
            <tr><td>Merchant&rsquo;s bank not reachable</td><td><code>LFI.CreditorBankNotReachable</code></td><td>Offer another payment method.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="warning" title="Screening rejections are not itemised">
        <p>
          Fraud, sanctions and AML rejections share one code, <code>LFI.ScreeningRejected</code>.
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
      <EdProse>
        <p>
          If you never received the <code>201</code> and do not have a <code>PaymentId</code>, call
          <RouterLink to="/biopay/payment/api-reference/biometric-payments-by-idempotency-key"><code>GET /biometric-payments</code></RouterLink>
          with your idempotency key. An empty <code>Data</code> array means no payment was created,
          and you can safely retry the original request while the payment token is still valid.
        </p>
      </EdProse>
      <EdCode :code="pollByKey" lang="http" filename="GET /biometric-payments?IdempotencyKey" />
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
          After Step 4 you hold a one-time card scheme token and cryptogram, and the
          <a href="#payment-token">payment token</a> with <code>PaymentType: Card</code>. As acquirer,
          you submit the authorisation to the card scheme named in <code>PaymentInstrument</code>
          &mdash; not through the API Hub. It will carry:
        </p>
      </EdProse>
      <EdBullets accent="var(--at-navy)">
        <li>The card scheme token and cryptogram, and the same amount and merchant details you sent on the lookup.</li>
        <li>The payment token, with cardholder verification coded as biometric, verified by ICP. Field mapping to be agreed with the scheme.</li>
      </EdBullets>
      <EdProse>
        <p>
          The card scheme verifies the payment token against the API Hub&rsquo;s published signing
          keys &mdash; that it is a <code>Card</code> token for this scheme, that the amount and
          merchant match, and that it has not been used &mdash; and marks it used. When the
          authorisation reaches the LFI as issuer, it validates the cryptogram and approves or
          declines. The outcome comes back to you from the card scheme; there is no
          <code>PaymentId</code>, payment status event or polling for a card payment.
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
