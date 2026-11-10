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
  { id: 'query', label: 'Instrument query' },
  { id: 'decrypt', label: 'Response' },
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

// ── Instrument query ────────────────────────────────────────────────────────
const queryClaims = `{
  "iss": "[CLIENT_ID]",
  "aud": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "iat": 1792059302,
  "nbf": 1792059292,
  "exp": 1792059602,
  "jti": "0b6f3c2e-8d41-4a7b-9e25-6c1d0f3a8b94",
  "message": {
    "Data": {
      "UaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
      "IcpToken": "d95fdf39-c9d5-4762-ad8a-ce26f3167ecc",
      "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
      "MerchantId": "100000000000731",
      "TerminalId": "T0000042",
      "AcquirerId": "123456",
      "MerchantName": "Example Grocers"
    }
  }
}`

const queryRequest = `POST /open-finance/biometric-payments/v2.2/instrument-query HTTP/1.1
Host: rs1.[LFICODE].apihub.openfinance.ae
Authorization: Bearer <access_token>
Content-Type: application/jwt
Accept: application/jwt
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d

eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoibGZpLWVuYy0xIiwiY3R5IjoiSldUIn0...`

const queryResponse = `HTTP/1.1 200 OK
Content-Type: application/jwt
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d

eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiYnBpcC1lbmMtMSIsImN0eSI6IkpXVCJ9...`

// ── Response ────────────────────────────────────────────────────────────────
const ibanResponseClaims = `{
  "iss": "[LFI_ORGANISATION_ID]",
  "azp": "[BPIP_ORGANISATION_ID]",
  "iat": 1792059303,
  "nbf": 1792059303,
  "exp": 1792059333,
  "message": {
    "Data": {
      "UaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
      "IcpToken": "d95fdf39-c9d5-4762-ad8a-ce26f3167ecc",
      "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
      "MerchantId": "100000000000731",
      "TerminalId": "T0000042",
      "AcquirerId": "123456",
      "MerchantName": "Example Grocers",
      "PaymentToken": "3f2b8c1e-7a4d-4e9b-b6c2-5d1e0f9a8b7c",
      "Instruments": [
        { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" }
      ]
    }
  }
}`

const panResponseClaims = `{
  "iss": "[LFI_ORGANISATION_ID]",
  "azp": "[BPIP_ORGANISATION_ID]",
  "iat": 1792059303,
  "nbf": 1792059303,
  "exp": 1792059333,
  "message": {
    "Data": {
      "UaeKycId": "ICP-7c9e1f4a-2b60-4d3e-9a15-0f8c2d1b7e43",
      "IcpToken": "d95fdf39-c9d5-4762-ad8a-ce26f3167ecc",
      "InstructedAmount": { "Amount": "149.50", "Currency": "AED" },
      "MerchantId": "100000000000731",
      "TerminalId": "T0000042",
      "AcquirerId": "123456",
      "MerchantName": "Example Grocers",
      "PaymentToken": "9c41d7a2-5e8f-4b13-a0d6-2f7b3e9c1a54",
      "Instruments": [
        { "SchemeName": "PAN", "Identification": "4895370012003478", "ExpiryDate": "08/29" }
      ]
    }
  }
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
    "PaymentToken": "3f2b8c1e-7a4d-4e9b-b6c2-5d1e0f9a8b7c",
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
    "PaymentToken": "3f2b8c1e-7a4d-4e9b-b6c2-5d1e0f9a8b7c",
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
      "PaymentToken": "3f2b8c1e-7a4d-4e9b-b6c2-5d1e0f9a8b7c",
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
    "PaymentToken": "3f2b8c1e-7a4d-4e9b-b6c2-5d1e0f9a8b7c",
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
      lede="How a BPIP takes a BioPay payment: resolving the customer with ICP, querying their payment instrument through the API Hub with a signed and encrypted request, decrypting the LFI&rsquo;s response, initiating an account-to-account payment, and tracking its status. <strong>Everything here is draft</strong> &mdash; endpoints, fields and claims are proposals for review."
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
          page. How the instrument query is signed and encrypted in each direction is on
          <RouterLink to="/biopay/payment/api-guide/signing-and-encryption">Signing and Encryption</RouterLink>,
          and the rules for the payment token are on
          <RouterLink to="/biopay/payment/api-guide/payment-token">Payment Token</RouterLink>.
        </p>
      </EdNote>
      <EdBullets accent="var(--at-gold)">
        <li>
          <strong>A client with the BPIP role</strong> in the Directory, entitled to the
          <code>biometric-payments</code> scope. See
          <RouterLink to="/biopay/directory">Directory</RouterLink>.
        </li>
        <li>
          <strong>A transport certificate</strong> for mTLS on every call to the API Hub.
        </li>
        <li>
          <strong>A signing certificate</strong> for your client assertion, the signed instrument
          query, and the <code>x-jws-signature</code> on the account payment. See
          <RouterLink to="/tech/tpp-standards/security/fapi/message-signing">Message Signing</RouterLink>.
        </li>
        <li>
          <strong>An encryption certificate</strong>, required for every BPIP. The LFI encrypts every
          instrument query response to it, and the API Hub encrypts payment status events to it.
        </li>
        <li>
          <strong>The LFI&rsquo;s encryption key</strong> &mdash; the <code>"use": "enc"</code> key in
          the LFI&rsquo;s organisation JWKS &mdash; to encrypt each instrument query to it.
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
              <td>Sends it as <code>Data.UaeKycId</code> in the instrument query.</td>
            </tr>
            <tr>
              <td>Default LFI</td>
              <td>Addresses every call for this payment to that LFI&rsquo;s API Hub resource server, <code>rs1.[LFICODE].apihub.openfinance.ae</code>, and encrypts the instrument query to that LFI.</td>
            </tr>
            <tr>
              <td>ICP token</td>
              <td>An opaque, single-use identifier for the identification. Sends it unchanged as <code>Data.IcpToken</code> in the instrument query, where the LFI validates it with ICP. Keeps it to check against the response the LFI returns.</td>
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
          authenticating with a <code>private_key_jwt</code> client assertion over mTLS. The API Hub
          grants the scope only to a client whose organisation holds the BPIP role. The token is
          not bound to a customer &mdash; the customer&rsquo;s authority for each payment is the ICP
          token, and the payment token the LFI issues for it &mdash; so one access token serves every
          payment until it expires.
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
      id="query"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 3"
      title="Query the payment instrument"
    >
      <EdProse>
        <p>
          Call
          <RouterLink to="/biopay/payment/api-reference/standards/instrument-query"><code>POST /instrument-query</code></RouterLink>
          on <strong>every</strong> payment, at the default LFI&rsquo;s API Hub resource server. Only
          the LFI knows whether the customer pays by account or by card, and you cannot route the
          payment until you know. The query is not made under a consent.
        </p>
        <p>
          The request body is not JSON. It is a <strong>signed request, encrypted to the
          LFI</strong>, sent as <code>Content-Type: application/jwt</code>:
        </p>
      </EdProse>
      <EdBullets accent="var(--at-navy)">
        <li>
          <strong>Sign.</strong> Put the request fields under <code>message.Data</code>, add the
          JWT claims, and sign it as a JWS with your signing key (<code>PS256</code>).
        </li>
        <li>
          <strong>Encrypt.</strong> Encrypt the signed JWS as a compact JWE
          (<code>RSA-OAEP-256</code>, <code>A256GCM</code>) to the LFI&rsquo;s public encryption
          key, taken from its organisation JWKS. The whole body is encrypted.
        </li>
        <li>
          <strong>Send</strong> the JWE as the request body. Sending the signed request without
          encryption is prohibited.
        </li>
      </EdBullets>
      <EdNote type="info" title="Only the LFI can read the request">
        <p>
          The API Hub checks your access token and its <code>biometric-payments</code> scope, and
          forwards the body unchanged to the LFI&rsquo;s Ozone Connect
          <RouterLink to="/biopay/payment/api-reference/ozone-connect/instrument-query"><code>POST /customers/action/instrument-query</code></RouterLink>,
          identifying you in <code>o3-caller-org-id</code>. It cannot read the
          <code>UaeKycId</code> or the ICP token. The LFI decrypts the request, verifies your
          signature, and validates <code>Data.IcpToken</code> by calling ICP&rsquo;s token
          validation endpoint, at which ICP confirms that it issued the token to your organisation
          for the <code>UaeKycId</code> in the request, that it has not expired and that it has not
          been used.
        </p>
      </EdNote>
      <EdCode :code="queryClaims" lang="json" filename="Signed request claims, before encryption" />
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>message.Data.UaeKycId</code></td><td>Yes</td><td>Know Your Customer identification reference, as ICP returned it with the ICP token.</td></tr>
            <tr><td><code>message.Data.IcpToken</code></td><td>Yes</td><td>The ICP token for this identification, unchanged.</td></tr>
            <tr><td><code>message.Data.InstructedAmount</code></td><td>Yes</td><td>The amount processed for the transaction (DE04). Stored against the payment token, and the amount the LFI debits.</td></tr>
            <tr><td><code>message.Data.MerchantId</code></td><td>Yes</td><td>Unique identification code assigned to the merchant (DE42), up to 15 characters.</td></tr>
            <tr><td><code>message.Data.TerminalId</code></td><td>Yes</td><td>Unique identification code assigned to the terminal (DE41), up to 8 characters.</td></tr>
            <tr><td><code>message.Data.AcquirerId</code></td><td>Yes</td><td>Unique identification code assigned to the acquiring bank (DE32), up to 11 digits.</td></tr>
            <tr><td><code>message.Data.MerchantName</code></td><td>Yes</td><td>Name of the merchant (DE43), up to 40 characters. Returned in the response, but not matched at the point of payment.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        <p>
          The claims around <code>message</code> follow the
          <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/confirmation-of-payee/api-guide">Confirmation
          of Payee</RouterLink> signed request: <code>iss</code> is your client ID, <code>aud</code>
          is the LFI&rsquo;s authorisation server issuer, and <code>jti</code> is unique. The
          specification requires <code>iss</code>, <code>exp</code> and <code>nbf</code>. How to
          sign, find the LFI&rsquo;s key and encrypt, with code, is on
          <RouterLink to="/biopay/payment/api-guide/signing-and-encryption#request-sign">Signing and
          Encryption</RouterLink>.
        </p>
      </EdProse>
      <EdCode :code="queryRequest" lang="http" filename="POST /instrument-query" />
      <EdProse>
        <p>
          The ICP token is issued at the point of customer identity verification, and carries no
          amount or merchant. The LFI stores the amount, merchant, terminal and acquirer you send
          against the payment token it issues. For a card payment, send the same amount,
          <code>MerchantId</code>, <code>TerminalId</code> and <code>AcquirerId</code> in the card
          authorisation: the LFI declines it if they do not match.
        </p>
      </EdProse>

      <h3 class="bp-sub">The response</h3>
      <EdProse>
        <p>
          A successful query returns <code>200</code> with <code>Content-Type: application/jwt</code>.
          The whole body is a JWE, encrypted to you by the LFI, around a JWS the LFI signed. The API
          Hub forwards it without reading it. Decrypt and verify it in
          <a href="#decrypt">Step 4</a>.
        </p>
      </EdProse>
      <EdCode :code="queryResponse" lang="http" filename="200 OK" />

      <h3 id="query-errors" class="bp-sub">Errors</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Status</th><th><code>Errors[].Code</code></th><th>Meaning and what to do</th></tr>
          </thead>
          <tbody>
            <tr><td><code>400</code></td><td><code>Query.UnmatchedInstrument</code></td><td>The LFI could not match an instrument from the values in the request. Fall back to another payment method.</td></tr>
            <tr><td><code>400</code></td><td><code>JWE.DecryptionError</code>, <code>JWE.InvalidHeader</code></td><td>The LFI could not decrypt the request. Check you encrypted to the <code>"use": "enc"</code> key of the LFI ICP returned, with <code>RSA-OAEP-256</code> and <code>A256GCM</code>.</td></tr>
            <tr><td><code>400</code></td><td><code>JWS.InvalidSignature</code>, <code>JWS.Malformed</code>, <code>JWS.InvalidHeader</code></td><td>The decrypted request is not a JWS the LFI can verify against your signing key. Check the <code>kid</code> and <code>PS256</code>.</td></tr>
            <tr><td><code>400</code></td><td><code>JWS.InvalidClaim</code></td><td>A claim failed: <code>iss</code>, <code>aud</code>, <code>exp</code> or <code>nbf</code>.</td></tr>
            <tr><td><code>400</code></td><td><code>Body.InvalidFormat</code></td><td><code>message.Data</code> does not match the schema.</td></tr>
            <tr><td><code>401</code></td><td>&mdash;</td><td>The access token is missing, invalid or expired. Obtain a new one.</td></tr>
            <tr><td><code>403</code></td><td><code>AccessToken.InvalidScope</code></td><td>The access token does not carry the <code>biometric-payments</code> scope.</td></tr>
            <tr><td><code>429</code></td><td>&mdash;</td><td>Too many requests. Wait for the number of seconds in <code>Retry-After</code>.</td></tr>
            <tr><td><code>500</code></td><td><code>GenericRecoverableError</code>, <code>GenericError</code></td><td>A failure at the API Hub or the LFI. The ICP token may already be used, so take a new biometric before you query again.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="warning" title="ICP token rejections">
        <p>
          The specification does not yet define the error the LFI returns when ICP does not confirm
          the ICP token &mdash; not issued to you, issued for another <code>UaeKycId</code>, expired
          or already used. Treat any such rejection as final for that biometric: take a new one.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="decrypt"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 4"
      title="Decrypt and verify the response"
      tone="surface"
    >
      <EdProse>
        <p>
          The response body is a compact JWE (<code>RSA-OAEP-256</code>, <code>A256GCM</code>)
          encrypted by the LFI to your public encryption key from the Directory. Inside is a JWS
          signed by the LFI (<code>PS256</code>) carrying the payment token, the values from your
          request it was issued for, and the customer&rsquo;s instruments. Returning it unencrypted
          is prohibited, so the IBAN or card details never pass through the API Hub in the clear.
        </p>
      </EdProse>
      <EdBullets accent="var(--at-teal-deep)">
        <li><strong>Decrypt</strong> the JWE with the private key named by the <code>kid</code> in its header.</li>
        <li><strong>Verify</strong> the LFI&rsquo;s signature against the JWKS of the LFI you called &mdash; never one taken from the JWS&rsquo;s <code>iss</code> &mdash; and pin <code>PS256</code>.</li>
        <li><strong>Check</strong> that <code>iss</code> is that LFI, <code>azp</code> is your organisation ID, <code>exp</code> has not passed, and <code>message.Data</code> repeats the <code>UaeKycId</code>, <code>IcpToken</code>, <code>InstructedAmount</code>, <code>MerchantId</code>, <code>TerminalId</code>, <code>AcquirerId</code> and <code>MerchantName</code> you sent.</li>
      </EdBullets>
      <EdNote type="info" title="Step by step, with code">
        <p>
          How to decrypt the response and verify it, with Node.js and Python examples, is on
          <RouterLink to="/biopay/payment/api-guide/signing-and-encryption#response-open">Signing
          and Encryption</RouterLink>. That page also shows how the LFI decrypts and verifies your
          request, and signs and encrypts its response.
        </p>
      </EdNote>

      <h3 id="route" class="bp-sub">Route on the scheme name</h3>
      <EdProse>
        <p>
          <code>message.Data.Instruments</code> lists the customer&rsquo;s instruments. Route on the
          instrument&rsquo;s <code>SchemeName</code>:
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>SchemeName</code></th><th>The instrument carries</th><th>Next step</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>IBAN</code></td>
              <td><code>Identification</code> &mdash; the IBAN of the customer&rsquo;s account registered for ICP Pay</td>
              <td>Make the account payment with <code>POST /biometric-payments</code>, sending the payment token as <code>Data.PaymentToken</code> and the IBAN to credit. <a href="#payment">Step 5</a></td>
            </tr>
            <tr>
              <td><code>PAN</code></td>
              <td><code>Identification</code> &mdash; the card number &mdash; and <code>ExpiryDate</code></td>
              <td>Authorise through Jaywan with the card details and the payment token. <a href="#card">Card payment</a></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCode :code="ibanResponseClaims" lang="json" filename="Decrypted and verified response — IBAN" />
      <EdCode :code="panResponseClaims" lang="json" filename="Decrypted and verified response — PAN" />
      <EdNote type="warning" title="One payment token, a list of instruments">
        <p>
          <code>Data.Instruments</code> is a list, but the response carries a single payment token.
          Which instrument to use when the list holds more than one is to be agreed.
        </p>
      </EdNote>

      <h3 class="bp-sub">Using the payment token</h3>
      <EdProse>
        <p>
          The payment token &mdash; a 36-character UUID &mdash; <strong>replaces the ICP token at
          the point of payment</strong>. It carries no data: you pass it back to the LFI, which
          looks up what it stored against it and makes the payment from that.
        </p>
      </EdProse>
      <EdBullets accent="var(--at-teal-deep)">
        <li>Send <code>message.Data.PaymentToken</code> from the response &mdash; nothing else from it.</li>
        <li>Send it unchanged, <strong>once</strong>, for this payment only. It is bound to your organisation.</li>
        <li>Send it <strong>within 30 seconds</strong> of the LFI issuing it. If it expires, take a new biometric and query again.</li>
        <li>Hold card details in memory only. Never log or persist them.</li>
      </EdBullets>
      <EdProse>
        <p>
          The full requirements, and what the LFI checks before it approves or declines, are on
          <RouterLink to="/biopay/payment/api-guide/payment-token">Payment Token</RouterLink>.
        </p>
      </EdProse>
    </EdSectionBand>

    <!-- 06 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="payment"
      num="06"
      color="var(--at-blue-deep)"
      eyebrow="Step 5 — IBAN only"
      title="Make the account payment"
    >
      <EdProse>
        <p>
          For <code>SchemeName: IBAN</code>, call
          <code>POST /biometric-payments</code>
          at the same API Hub resource server, with the
          payment token the instrument query returned and the IBAN to credit.
          Nothing else is needed: the LFI stored the <code>UaeKycId</code>, the customer&rsquo;s
          account and the amount against the payment token, and takes them from there. The API Hub
          proxies the payment to the LFI, which checks the payment token &mdash; see
          <RouterLink to="/biopay/payment/api-guide/payment-token#check">Payment Token</RouterLink>
          &mdash; and creates the payment only if it passes. The LFI marks the payment token used
          once it creates the payment.
        </p>
      </EdProse>
      <EdNote type="info" title="You are accountable for the creditor account">
        <p>
          The LFI did not issue the payment token for an account to credit, and the
          customer&rsquo;s biometric gesture is not bound to one. You supply it on the payment and are accountable for it, as
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
            <tr><td><code>Data.PaymentToken</code></td><td>The payment token, unchanged from <code>message.Data.PaymentToken</code> of the instrument query response.</td></tr>
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
          You do not send any evidence of the biometric identification: the LFI stored the ICP
          token against the payment token when it issued it.
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
            <tr><td><code>403</code></td><td><code>PaymentToken.Invalid</code></td><td>The payment token is not a 36-character UUID, or the LFI did not issue it. Check you sent <code>message.Data.PaymentToken</code> from the instrument query response, unchanged, to the LFI that issued it. Do not retry.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.Expired</code></td><td>More than 30 seconds passed since the LFI issued it. Take a new biometric and query again.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.WrongInstrumentType</code></td><td>The payment token was issued for a <code>PAN</code>. Authorise through the card scheme instead.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.BindingMismatch</code></td><td>The payment token was issued to a different organisation. Present it from the organisation that made the instrument query.</td></tr>
            <tr><td><code>403</code></td><td><code>PaymentToken.AlreadyUsed</code></td><td>A payment already used this payment token. If you are retrying, use the same <code>x-idempotency-key</code> and body; otherwise take a new biometric.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.TemporarilyBlocked</code></td><td>The customer&rsquo;s account is <code>Inactive</code>, <code>Dormant</code> or <code>Suspended</code>. Tell the customer to contact their bank, and offer another payment method.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.PermanentAccessFailure</code></td><td>The customer&rsquo;s account is <code>Closed</code>, <code>Deceased</code> or <code>Unclaimed</code>. Do not retry. Offer another payment method.</td></tr>
            <tr><td><code>403</code></td><td><code>Account.DebtorAccountMismatch</code></td><td>The IBAN the payment token was issued for is no longer the account the customer has registered for ICP Pay &mdash; for example, they changed it after the instrument query. Take a new biometric and start again from the instrument query.</td></tr>
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
      eyebrow="Step 6 — IBAN only"
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
          <code>POST /biometric-payments</code>
          with your webhook <code>Url</code> and <code>IsActive: true</code>. Each time the LFI patches
          the payment, the API Hub POSTs a
          payment status event
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
          <code>GET /biometric-payments/{PaymentId}</code>
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
          After Step 4 you hold an instrument with <code>SchemeName: PAN</code>, carrying the card
          number in <code>Identification</code> and its <code>ExpiryDate</code>, and the payment
          token. As acquirer, you submit the authorisation to Jaywan &mdash; not through the API
          Hub. It will carry:
        </p>
      </EdProse>
      <EdBullets accent="var(--at-navy)">
        <li><code>Identification</code> and <code>ExpiryDate</code> from the response, and the same amount, <code>MerchantId</code>, <code>TerminalId</code>, <code>AcquirerId</code> and <code>MerchantName</code> you sent in the instrument query.</li>
        <li>The payment token &mdash; a 36-character UUID &mdash; with cardholder verification coded as biometric, verified by ICP. Field mapping to be agreed with the scheme.</li>
      </EdBullets>
      <EdProse>
        <p>
          The card scheme carries the payment token to the LFI as issuer. The LFI checks it &mdash;
          that it is a 36-character UUID it issued, within its 30 seconds, for a <code>PAN</code>,
          that the card, amount, merchant, terminal and acquirer in the authorisation match what it
          stored, and that it has not been used &mdash; marks it used, and approves or declines. See
          <RouterLink to="/biopay/payment/api-guide/payment-token#check">Payment Token</RouterLink>.
          The outcome comes back to you from the card scheme; there is no <code>PaymentId</code>,
          payment status event or polling for a card payment.
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
