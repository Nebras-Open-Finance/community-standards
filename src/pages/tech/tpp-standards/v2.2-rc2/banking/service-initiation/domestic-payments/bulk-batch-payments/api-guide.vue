<route lang="yaml">
meta:
  title: Bulk and Batch Payments — API Guide
</route>

<script setup lang="ts">
const SI = '/tech/tpp-standards/v2.2-rc2/banking/service-initiation'
const REF = `${SI}/domestic-payments/bulk-batch-payments/open-api`

const exampleAuthDetails = `"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2026-06-24T15:46:00+00:00",

      "ControlParameters": {
        "ConsentSchedule": {
          "BulkBatchPayment": {
            "Description": "Payroll June 2026",
            "NumberOfTransactions": 3,
            "TotalValueOfPayments": {
              "Amount": "4250.00",
              "Currency": "AED"
            }
          }
        }
      },

      // Encrypted PII from Step 1 — the Bulk and Batch Risk block
      "PersonalIdentifiableInformation": "{{encryptedConsentPII}}"
    }
  }
]
`

const step3Node = `import crypto from 'node:crypto'
import { generateCodeVerifier, deriveCodeChallenge } from './pkce'
import { buildRequestJWT } from './request-jwt'

const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

// The batch the User is paying. NumberOfTransactions and TotalValueOfPayments
// are derived from it here, so they cannot drift from what POST /bulk-payments sends.
const payments = loadBatch()   // [{ amount: '1500.00', debtorIban: 'AE07...', creditor: {...}, creditorReference: 'EMP-001' }, ...]

const totalFils = payments
  .reduce((total, p) => total + Math.round(Number(p.amount) * 100), 0)

const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:service-initiation-consent:v2.2',
    consent: {
      ConsentId: crypto.randomUUID(),
      IsSingleAuthorization: true,
      ExpirationDateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      ControlParameters: {
        ConsentSchedule: {
          BulkBatchPayment: {
            Description: 'Payroll June 2026',
            NumberOfTransactions: payments.length,
            TotalValueOfPayments: {
              Amount: (totalFils / 100).toFixed(2),   // integer fils avoids float drift
              Currency: 'AED',                        // every instruction must use this currency
            },
          },
        },
      },
      PersonalIdentifiableInformation: encryptedConsentPII,  // from Step 1
    },
  },
]

const requestJWT = await buildRequestJWT({
  scope: 'payments openid',
  codeChallenge,
  authorizationDetails,
})
`

const step3Python = `import uuid
from datetime import datetime, timezone, timedelta
from decimal import Decimal
from pkce import generate_code_verifier, derive_code_challenge
from request_jwt import build_request_jwt

code_verifier  = generate_code_verifier()
code_challenge = derive_code_challenge(code_verifier)

# The batch the User is paying. NumberOfTransactions and TotalValueOfPayments
# are derived from it here, so they cannot drift from what POST /bulk-payments sends.
payments = load_batch()   # [{"amount": "1500.00", "debtor_iban": "AE07...", "creditor": {...}, "creditor_reference": "EMP-001"}, ...]

total = sum(Decimal(p["amount"]) for p in payments)

authorization_details = [
    {
        "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
        "consent": {
            "ConsentId": str(uuid.uuid4()),
            "IsSingleAuthorization": True,
            "ExpirationDateTime": (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat(),
            "ControlParameters": {
                "ConsentSchedule": {
                    "BulkBatchPayment": {
                        "Description": "Payroll June 2026",
                        "NumberOfTransactions": len(payments),
                        "TotalValueOfPayments": {
                            "Amount": f"{total:.2f}",
                            "Currency": "AED",   # every instruction must use this currency
                        },
                    }
                }
            },
            "PersonalIdentifiableInformation": encrypted_consent_pii,  # from Step 1
        },
    }
]

request_jwt = build_request_jwt(
    scope="payments openid",
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)
`

const step9Node = `// encryptPII is the same JWS-inside-JWE helper used in Step 1.

// 9a — the Risk block, once for the whole batch (File Payment Risk PII Schema Object)
const batchPII = await encryptPII(
  { Risk: buildRisk(payments) },
  LFI_JWKS_URI, signingKey, SIGNING_KEY_ID,
)

// 9b — one PII token per payment (File Payment PII Schema Object):
// that payment's Debtor Account and creditor, and no Risk block
const instructions = await Promise.all(payments.map(async (p) => ({
  Amount: { Amount: p.amount, Currency: 'AED' },   // must equal TotalValueOfPayments.Currency
  PaymentPurposeCode: 'SAL',                       // set on each payment
  PersonalIdentifiableInformation: await encryptPII(
    {
      Initiation: {
        DebtorAccount: {
          SchemeName: 'IBAN',
          Identification: p.debtorIban,             // payments may come from different accounts
        },
        Creditor: { Name: p.creditor.name },
        CreditorAccount: {
          SchemeName: 'IBAN',
          Identification: p.creditor.iban,
          Name: { en: p.creditor.accountName },
        },
      },
    },
    LFI_JWKS_URI, signingKey, SIGNING_KEY_ID,
  ),
  DebtorReference:   'Payroll Jun26',
  CreditorReference: p.creditorReference,
})))
`

const step9Python = `# encrypt_pii is the same JWS-inside-JWE helper used in Step 1.

# 9a — the Risk block, once for the whole batch (File Payment Risk PII Schema Object)
batch_pii = encrypt_pii({"Risk": build_risk(payments)}, LFI_JWKS_URI)

# 9b — one PII token per payment (File Payment PII Schema Object):
# that payment's Debtor Account and creditor, and no Risk block
instructions = [
    {
        "Amount": {"Amount": p["amount"], "Currency": "AED"},   # must equal TotalValueOfPayments.Currency
        "PaymentPurposeCode": "SAL",                            # set on each payment
        "PersonalIdentifiableInformation": encrypt_pii(
            {
                "Initiation": {
                    "DebtorAccount": {
                        "SchemeName": "IBAN",
                        "Identification": p["debtor_iban"],   # payments may come from different accounts
                    },
                    "Creditor": {"Name": p["creditor"]["name"]},
                    "CreditorAccount": {
                        "SchemeName": "IBAN",
                        "Identification": p["creditor"]["iban"],
                        "Name": {"en": p["creditor"]["account_name"]},
                    },
                },
            },
            LFI_JWKS_URI,
        ),
        "DebtorReference":   "Payroll Jun26",
        "CreditorReference": p["creditor_reference"],
    }
    for p in payments
]
`

const step10Node = `import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

// Wrapped in \`message\` per AEFilePaymentRequestSigned
const bulkPaymentPayload = {
  message: {
    Data: {
      ConsentId:                       consentId,     // the authorized consent
      PersonalIdentifiableInformation: batchPII,      // from Step 9a — the batch's Risk block
      Instructions:                    instructions,  // from Step 9b — length MUST equal NumberOfTransactions
    },
  },
}

const signedBulkPayment = await new SignJWT(bulkPaymentPayload)
  .setProtectedHeader({ alg: 'PS256', kid: SIGNING_KEY_ID, typ: 'JWT' })
  .setIssuedAt()
  .setIssuer(CLIENT_ID)
  .setAudience(AUTHORIZATION_SERVER_ISSUER)
  .setExpirationTime('5m')
  .sign(signingKey)

const response = await fetch(\`\${LFI_API_BASE}/open-finance/payment/v2.2/bulk-payments\`, {
  method: 'POST',
  headers: {
    'Authorization':              \`Bearer \${access_token}\`,
    'Content-Type':               'application/jwt',
    'x-idempotency-key':          idempotencyKey,     // one key per batch; reuse it on every retry
    'x-fapi-interaction-id':      crypto.randomUUID(),
    'x-fapi-auth-date':           lastCustomerAuthDate,
    'x-fapi-customer-ip-address': customerIpAddress,
  },
  body: signedBulkPayment,
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { Data: { BulkPaymentId, Instructions } } = await response.json()
// Store BulkPaymentId for the batch, and each Instructions[i].PaymentId for its payment
`

const step10Python = `import uuid
import time
from jose import jwt as jose_jwt

LFI_API_BASE = os.environ["LFI_API_BASE_URL"]

# Wrapped in \`message\` per AEFilePaymentRequestSigned
bulk_payment_payload = {
    "message": {
        "Data": {
            "ConsentId":                       consent_id,    # the authorized consent
            "PersonalIdentifiableInformation": batch_pii,     # from Step 9a — the batch's Risk block
            "Instructions":                    instructions,  # from Step 9b — length MUST equal NumberOfTransactions
        }
    }
}

now = int(time.time())
signed_bulk_payment = jose_jwt.encode(
    {
        **bulk_payment_payload,
        "iss": CLIENT_ID,
        "aud": AUTHORIZATION_SERVER_ISSUER,
        "iat": now,
        "exp": now + 300,
    },
    signing_key,
    algorithm="PS256",
    headers={"kid": SIGNING_KEY_ID, "typ": "JWT"},
)

response = httpx.post(
    f"{LFI_API_BASE}/open-finance/payment/v2.2/bulk-payments",
    headers={
        "Authorization":              f"Bearer {access_token}",
        "Content-Type":               "application/jwt",
        "x-idempotency-key":          idempotency_key,   # one key per batch; reuse it on every retry
        "x-fapi-interaction-id":      str(uuid.uuid4()),
        "x-fapi-auth-date":           last_customer_auth_date,
        "x-fapi-customer-ip-address": customer_ip_address,
    },
    content=signed_bulk_payment,
    # cert=("transport.crt", "transport.key"),
)

data            = response.json()["Data"]
bulk_payment_id = data["BulkPaymentId"]
# Store bulk_payment_id for the batch, and each data["Instructions"][i]["PaymentId"] for its payment
`

const step11Node = `// GET /bulk-payments/{BulkPaymentId} takes a client-credentials token
// (scope openid payments), not the consent's access token.
const statusResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/payment/v2.2/bulk-payments/\${BulkPaymentId}\`,
  {
    headers: {
      'Authorization':         \`Bearer \${clientCredentialsToken}\`,
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
  },
)
const { Data } = await statusResponse.json()
// The batch carries no status of its own. Data.Instructions has one element per
// payment, in request order — read each as you would a single payment.
for (const p of Data.Instructions) {
  // p.PaymentId, p.Status ('Pending' | 'AcceptedSettlementCompleted' | ... | 'Rejected'),
  // p.PaymentRail, p.RejectReasonCode
}
`

const step11Python = `# GET /bulk-payments/{BulkPaymentId} takes a client-credentials token
# (scope openid payments), not the consent's access token.
status_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/payment/v2.2/bulk-payments/{bulk_payment_id}",
    headers={
        "Authorization":         f"Bearer {client_credentials_token}",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
)
data = status_response.json()["Data"]
# The batch carries no status of its own. data["Instructions"] has one element per
# payment, in request order — read each as you would a single payment.
for p in data["Instructions"]:
    ...  # p["PaymentId"], p["Status"], p.get("PaymentRail"), p.get("RejectReasonCode")
`

const successResponseJson = `{
  "message": {
    "Data": {
      "BulkPaymentId": "4f1c2a9e-7b3d-4e8a-9c61-2d5f0b7a8e13",
      "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
      "CreationDateTime": "2026-06-24T15:47:02+00:00",
      "Instructions": [
        {
          "PaymentId": "83b47199-90c2-4c05-9ef1-aeae68b0fc7c",
          "Status": "Pending",
          "StatusUpdateDateTime": "2026-06-24T15:47:02+00:00",
          "Amount": { "Amount": "1500.00", "Currency": "AED" },
          "PaymentPurposeCode": "SAL",
          "CreditorReference": "EMP-001"
        },
        {
          "PaymentId": "1d2e9a40-5c7b-4f18-8e36-0b9a2c4d7e51",
          "Status": "Pending",
          "StatusUpdateDateTime": "2026-06-24T15:47:02+00:00",
          "Amount": { "Amount": "1500.00", "Currency": "AED" },
          "PaymentPurposeCode": "SAL",
          "CreditorReference": "EMP-002"
        },
        {
          "PaymentId": "a7c3f5e2-9b14-4d6a-b08e-3e5f1c2d9a74",
          "Status": "Pending",
          "StatusUpdateDateTime": "2026-06-24T15:47:02+00:00",
          "Amount": { "Amount": "1250.00", "Currency": "AED" },
          "PaymentPurposeCode": "SAL",
          "CreditorReference": "EMP-003"
        }
      ]
    },
    "Links": {
      "Self": "https://api.lfi.example/open-finance/payment/v2.2/bulk-payments/4f1c2a9e-7b3d-4e8a-9c61-2d5f0b7a8e13"
    }
  }
}
`

const step3Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step3Node },  { label: 'Python', lang: 'python', code: step3Python }] as const
const step9Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step9Node },  { label: 'Python', lang: 'python', code: step9Python }] as const
const step10Tabs = [{ label: 'Node.js', lang: 'typescript', code: step10Node }, { label: 'Python', lang: 'python', code: step10Python }] as const
const step11Tabs = [{ label: 'Node.js', lang: 'typescript', code: step11Node }, { label: 'Python', lang: 'python', code: step11Python }] as const

const step12Node = `// One payment from the batch, by its BulkPaymentId and the PaymentId on its
// element of Instructions. Takes a client-credentials token (scope openid payments).
const paymentId = Instructions[0].PaymentId   // from the POST /bulk-payments response

const paymentResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/payment/v2.2/bulk-payments/\${BulkPaymentId}/payments/\${paymentId}\`,
  {
    headers: {
      'Authorization':         \`Bearer \${clientCredentialsToken}\`,
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
  },
)
// Data is that payment's element of Instructions on GET /bulk-payments/{BulkPaymentId}.
// 404 if the PaymentId is not a payment within this Bulk/Batch Payment.
const { Data: { Status, StatusUpdateDateTime, PaymentRail, RejectReasonCode } } = await paymentResponse.json()
`

const step12Python = `# One payment from the batch, by its BulkPaymentId and the PaymentId on its
# element of Instructions. Takes a client-credentials token (scope openid payments).
payment_id = data["Instructions"][0]["PaymentId"]   # from the POST /bulk-payments response

payment_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/payment/v2.2/bulk-payments/{bulk_payment_id}/payments/{payment_id}",
    headers={
        "Authorization":         f"Bearer {client_credentials_token}",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
)
# Data is that payment's element of Instructions on GET /bulk-payments/{BulkPaymentId}.
# 404 if the PaymentId is not a payment within this Bulk/Batch Payment.
payment = payment_response.json()["Data"]
status  = payment["Status"]   # also StatusUpdateDateTime, PaymentRail, RejectReasonCode
`

const step12Tabs = [{ label: 'Node.js', lang: 'typescript', code: step12Node }, { label: 'Python', lang: 'python', code: step12Python }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · Service Initiation · Bulk and Batch Payments
        </div>
        <h1 class="ed-doc__title">
          Bulk and Batch Payments &mdash; API Guide
          <span class="ed-doc__read">7 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A Bulk/Batch Payment pays many creditors under a single consent &mdash; a payroll run, for
          example. The User authorizes the batch once, by its reason, the number of payments and their
          total. The TPP then sends every payment in one signed request, as a JSON array, and the API Hub
          checks the array against what the User authorized. Each payment carries its own Debtor Account,
          so the payments in one batch may be made from different accounts.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before initiating a Bulk/Batch Payment"
      tone="cream"
    >
      <EdProse>Before initiating a Bulk/Batch Payment, ensure the following requirements are met:</EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the
          <strong>BSIP role</strong> as defined in
          <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Transport Certificate</a></strong>
          &mdash; an active transport certificate must be issued and registered in the Trust Framework
          to establish secure <strong>mTLS communication</strong>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Signing Certificate</a></strong>
          &mdash; an active signing certificate must be issued and registered in the Trust Framework.
          This certificate is used to sign request objects, client assertions and the
          <code>POST /bulk-payments</code> request.
        </li>
        <li>
          <strong>Registration with the relevant <a href="/tech/tpp-standards/registration/api-guide">API Hub (Authorisation Server)</a></strong>
          &mdash; the application must be registered with the API Hub (Server) of the LFI with which
          you intend to initiate payments.
        </li>
        <li>
          <strong>Understanding of the <a href="/tech/tpp-standards/security/fapi/">FAPI Security Profile</a></strong>
          and <strong><a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a></strong>
          &mdash; you should understand how request object signing, client authentication, and access
          token validation underpin secure API interactions.
        </li>
        <li>
          <strong>Understanding of <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a></strong>
          &mdash; PII must be encrypted as a JWE: once for the consent, once for the batch's
          <code>Risk</code> block, and once for <strong>each payment</strong> in the batch. You will need
          the LFI's public encryption key from their JWKS.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Bulk/Batch Payment"
      tone="surface"
    >
      <APIFlowViewer title="Bulk and Batch Payment API Flow">
        <APIFlowsBulkBatchPayment />
      </APIFlowViewer>

      <EdProse>
        The consent and authorization steps are the same as for a
        <a :href="`${SI}/domestic-payments/single-instant-payment/api-guide`">Single Instant Payment</a>.
        What differs is what the consent fixes, and how the payments are sent and tracked:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Stage</th><th>Bulk/Batch Payment</th></tr>
          </thead>
          <tbody>
            <tr><td>Consent (<code>POST /par</code>)</td><td><code>ConsentSchedule.BulkBatchPayment</code> fixes the reason (<code>Description</code>), the number of payments (<code>NumberOfTransactions</code>) and their total, amount and currency (<code>TotalValueOfPayments</code>). The individual payments are not on the consent.</td></tr>
            <tr><td>Authorization (at the LFI)</td><td>The User authenticates at the LFI and authorizes the batch. The LFI shows <code>Description</code> as the reason for the payment.</td></tr>
            <tr><td>Payment (<code>POST /bulk-payments</code>)</td><td>One signed request carries every payment in <code>Data.Instructions</code>, each with its own amount, purpose code, encrypted Debtor Account and creditor, and references, and the batch's <code>Risk</code> block once. The API Hub rejects the request unless the count matches <code>NumberOfTransactions</code>, every currency matches <code>TotalValueOfPayments.Currency</code>, and the amounts sum to <code>TotalValueOfPayments.Amount</code>.</td></tr>
            <tr><td>Outcome (<code>GET /bulk-payments/{BulkPaymentId}</code>)</td><td>The batch carries no status of its own. Each payment within it has its own <code>PaymentId</code> and status, reported on its element of <code>Instructions</code> and read as for a single payment.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="Collecting the batch from the User">
        <p>
          A TPP may still collect the payments as a file &mdash; a spreadsheet of salaries, for
          example. The TPP converts it to the <code>Instructions</code> array itself. Nothing is
          uploaded to the API Hub or the LFI.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-1-encrypt-pii"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="POST /par · Step 1 — Encrypting PII"
      title="Sign and encrypt the consent PII"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/par</code>
      </div>

      <EdProse>
        <code>consent.PersonalIdentifiableInformation</code> is required on every payment consent. For a
        Bulk/Batch Payment consent it is the Bulk/Batch Payment PII (<code>AEBulkBatchPaymentPII</code>),
        which carries <strong>only the <code>Risk</code> block</strong>. The Debtor Account and creditor
        of each payment are not held on the consent; they are sent with each payment in
        <a href="#step-9-encrypt-pii-instructions">Step 9</a>. Sign the object as a JWS and encrypt the
        JWS as a JWE using the LFI's public encryption key. The resulting compact JWE string is the
        <code>encryptedConsentPII</code> used in Step 2.
      </EdProse>

      <h3 id="bulk-batch-risk" class="ed-doc__subhead">The Bulk and Batch Risk block</h3>
      <EdProse>
        A Bulk/Batch Payment can debit more than one Debtor Account and pay many creditors, so its
        <code>Risk</code> block (<code>AEBulkBatchPaymentRisk</code>) describes only what holds for the
        <strong>whole submission</strong>: the User who submits it, and the batch itself. Nothing in it
        describes a single Debtor Account or creditor. The same block is sent on the consent and, once
        for the batch, on <code>POST /bulk-payments</code> (<a href="#step-9-encrypt-pii-instructions">Step
        9a</a>). Populate every field that is known or derivable from your system. No field is required,
        and no additional properties are permitted.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>UserIndicators.UserName</code></td><td>The name of the User submitting the batch (<code>en</code> and/or <code>ar</code>)</td></tr>
            <tr><td><code>UserIndicators.EmiratesId</code></td><td>The User's Emirates ID number</td></tr>
            <tr><td><code>UserIndicators.GeoLocation</code></td><td><code>Latitude</code> and <code>Longitude</code> of the User's device, both required when the object is sent</td></tr>
            <tr><td><code>UserIndicators.Authentication</code></td><td>How the User authenticated at the TPP: <code>AuthenticationChannel</code> (<code>App</code>, <code>Web</code>), the <code>PossessionFactor</code>, <code>KnowledgeFactor</code> and <code>InherenceFactor</code> used, <code>ChallengeOutcome</code> (<code>Pass</code>, <code>Fail</code>, <code>NotPerformed</code>), <code>AuthenticationFlow</code>, <code>AuthenticationValue</code> and <code>ChallengeDateTime</code></td></tr>
            <tr><td><code>UserIndicators.DeviceInformation</code></td><td>The device the batch is submitted from: <code>DeviceId</code>, <code>DeviceOperatingSystem</code>, <code>DeviceOperatingSystemVersion</code>, <code>DeviceType</code></td></tr>
            <tr><td><code>UserIndicators.AccountRiskIndicators</code></td><td>The User's account with the TPP: <code>UserOnboardingDateTime</code>, <code>LastAccountChangeDate</code>, <code>LastPasswordChangeDate</code>, <code>SuspiciousActivity</code></td></tr>
            <tr><td><code>BatchIndicators.Channel</code></td><td>Where the batch was submitted from: <code>Web</code> or <code>Mobile</code></td></tr>
            <tr><td><code>BatchIndicators.BatchSource</code></td><td>How the TPP assembled the payments: <code>ManualEntry</code>, <code>FileUpload</code>, <code>AccountingSystem</code> (an accounting, payroll or ERP system connected to the TPP) or <code>Other</code></td></tr>
            <tr><td><code>BatchIndicators.NumberOfNewCreditorAccounts</code></td><td>The number of distinct Creditor Accounts in the batch the User has not paid before through the TPP, from any Debtor Account. A creditor whose account has changed since the User last paid them counts as new</td></tr>
            <tr><td><code>SupplementaryData</code></td><td>Additional information that cannot be captured in the structured fields</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a> for
        the JWS-inside-JWE pattern, fetching the LFI's JWKS and selecting the correct encryption key. The
        same helper is used again in <a href="#step-9-encrypt-pii-instructions">Step 9</a>, for the batch
        and for each payment.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-2-authorization-details"
      num="04"
      color="var(--at-navy)"
      eyebrow="POST /par · Step 2 — Constructing Authorization Details"
      title="Build the consent payload"
      tone="surface"
    >
      <EdProse>
        With the encrypted PII ready, construct the <code>authorization_details</code> of type
        <code>urn:openfinanceuae:service-initiation-consent:v2.2</code>. The encrypted PII is embedded
        as <code>consent.PersonalIdentifiableInformation</code>, and the batch is described in
        <code>consent.ControlParameters.ConsentSchedule.BulkBatchPayment</code>.
      </EdProse>

      <h3 class="ed-doc__subhead">authorization_details</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>type</code>*</td><td>enum</td><td>Must be <code>urn:openfinanceuae:service-initiation-consent:v2.2</code></td><td><code>urn:openfinanceuae:service-initiation-consent:v2.2</code></td></tr>
            <tr><td><code>consent</code>*</td><td>object</td><td>Consent properties agreed by the User with the TPP. <em>Described below.</em></td><td>&mdash;</td></tr>
            <tr><td><code>subscription</code></td><td>object</td><td>Optional subscription to Event Notifications via Webhook.</td><td>&mdash;</td></tr>
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
            <tr><td><code>ConsentId</code>*</td><td>string (uuid)</td><td>Unique ID assigned by the TPP (1–128 chars)</td><td><code>b8f42378-10ac-46a1-8d20-4e020484216d</code></td></tr>
            <tr><td><code>IsSingleAuthorization</code></td><td>boolean</td><td>Whether the consent must be authorized by a single authorizer at the LFI. Defaults to <code>false</code> &mdash; see <a :href="`${SI}/multi-authorization`">Multi-Authorization</a></td><td><code>true</code></td></tr>
            <tr><td><code>ExpirationDateTime</code>*</td><td>date-time</td><td>Consent expiry (ISO 8601 with timezone, max 1 year)</td><td><code>2026-06-24T15:46:00+00:00</code></td></tr>
            <tr><td><code>AuthorizationExpirationDateTime</code></td><td>date-time</td><td>Deadline by which the consent must reach <code>Authorized</code>. MUST NOT be in the past or after <code>ExpirationDateTime</code>.</td><td><code>2026-06-24T16:00:00+00:00</code></td></tr>
            <tr><td><code>BaseConsentId</code></td><td>string (uuid)</td><td>Used when amending or renewing an existing consent</td><td>&mdash;</td></tr>
            <tr><td><code>ControlParameters</code>*</td><td>object</td><td>The Bulk/Batch control parameters. <em>Described below.</em></td><td>&mdash;</td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code>*</td><td>string (JWE)</td><td>Encrypted consent PII &mdash; the <code>encryptedConsentPII</code> string from Step 1</td><td><code>eyJhbGci...</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Fields that do not apply to a Bulk/Batch consent">
        <p>
          A Bulk/Batch Payment consent is its own consent shape, identified by
          <code>ControlParameters.ConsentSchedule</code> carrying <code>BulkBatchPayment</code>. It
          carries no <code>Permissions</code>, <code>CurrencyRequest</code>,
          <code>PaymentPurposeCode</code>, <code>DebtorReference</code> or <code>CreditorReference</code>
          &mdash; the payment purpose and references of each payment are set on that payment &mdash; and
          its <code>ControlParameters</code> carry no
          <code>IsDelegatedAuthentication</code>. <code>ConsentSchedule</code> carries only
          <code>BulkBatchPayment</code>, so a batch cannot be combined with a single or multi-payment in
          one consent.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">ControlParameters.ConsentSchedule.BulkBatchPayment (Required)</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Description</code>*</td><td>string (1–140)</td><td>The reason for the Bulk/Batch Payment. The LFI shows it to the User when the User authorizes the consent</td><td><code>Payroll June 2026</code></td></tr>
            <tr><td><code>NumberOfTransactions</code>*</td><td>integer (max 500)</td><td>The number of payments in the batch, at most 500. MUST equal the number of elements in <code>Instructions</code> on <code>POST /bulk-payments</code></td><td><code>3</code></td></tr>
            <tr><td><code>TotalValueOfPayments.Amount</code>*</td><td>string</td><td>The total value of the payments, with exactly two decimal places. MUST equal the sum of <code>Instructions[].Amount.Amount</code> on <code>POST /bulk-payments</code></td><td><code>4250.00</code></td></tr>
            <tr><td><code>TotalValueOfPayments.Currency</code>*</td><td>string</td><td>Must be <code>AED</code> &mdash; a Bulk/Batch Payment is a domestic payment. The <code>Amount.Currency</code> of every instruction MUST equal it</td><td><code>AED</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Derive the control parameters from the batch">
        <p>
          Compute <code>NumberOfTransactions</code> and <code>TotalValueOfPayments</code> from the same list
          of payments you will send in <a href="#step-10-submit-bulk-payment">Step 10</a>, and sum the
          amounts in integer fils or a decimal type rather than binary floating point. A one-fils
          difference between <code>TotalValueOfPayments.Amount</code> and the sum of the instructions is
          enough for the API Hub to reject the batch &mdash; after the User has authorized it.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">Example request</h3>
      <EdCode :code="exampleAuthDetails" lang="json" filename="authorization_details" />
    </EdSectionBand>

    <EdSectionBand
      id="step-3-request-jwt"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="POST /par · Step 3 — Constructing the Request JWT"
      title="Bind PKCE and authorization details into a signed JWT"
      tone="cream"
    >
      <ApiGuideStepRequestJwtScopeNote />

      <EdCodeGroup :tabs="step3Tabs" />

      <EdNote type="tip" title="Store the code_verifier">
        <p>
          Save <code>codeVerifier</code> in your server-side session or an <code>httpOnly</code> cookie
          &mdash; you will need it in
          <a href="#step-8-post-token-authorization-code">Step 8</a> to exchange the authorization code
          for tokens.
        </p>
      </EdNote>

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/request-jwt">Preparing the Request JWT</a> for
        the full JWT claim reference and PKCE helpers.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-4-client-assertion"
      num="06"
      color="var(--at-teal)"
      eyebrow="POST /par · Step 4 — Creating a Client Assertion"
      title="Prove the application's identity to the API Hub"
      tone="surface"
    >
      <ApiGuideStepClientAssertion />
    </EdSectionBand>

    <EdSectionBand
      id="step-5-par-request"
      num="07"
      color="var(--at-gold)"
      eyebrow="POST /par · Step 5 — Sending the /par Request"
      title="Push the request to the API Hub"
      tone="cream"
    >
      <ApiGuideStepParRequest />
    </EdSectionBand>

    <EdSectionBand
      id="step-6-authorization-url"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Redirecting the User · Step 6 — Building the Authorization URL"
      title="Send the user to the LFI to authenticate"
      tone="surface"
    >
      <EdProse>
        The <code>authorization_endpoint</code> is found in the LFI's
        <code>.well-known/openid-configuration</code> &mdash; not constructed from the issuer URL
        directly.
      </EdProse>

      <ApiGuideStepRedirectCode />

      <EdNote type="tip" title="User Experience">
        <p>
          See <a href="./user-journeys">User Experience</a> for what the User must be shown before
          and during authorization of a Bulk/Batch Payment.
        </p>
      </EdNote>

      <EdProse>After redirecting, the user will:</EdProse>
      <EdBullets>
        <li>Authenticate with their bank.</li>
        <li>Review the batch &mdash; its reason (<code>Description</code>), the number of payments and their total &mdash; on the bank's authorization screen.</li>
        <li>Approve or decline.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="step-7-callback"
      num="09"
      color="var(--at-navy)"
      eyebrow="Handling the Callback · Step 7 — Extracting the Authorization Code"
      title="Validate state and issuer on the redirect"
      tone="cream"
    >
      <ApiGuideStepCallback />
    </EdSectionBand>

    <EdSectionBand
      id="step-8-post-token-authorization-code"
      num="10"
      color="var(--at-teal-deep)"
      eyebrow="Exchanging the Code for Tokens · Step 8 — POST /token (Authorization Code)"
      title="Swap the auth code for an access and refresh token"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/token</code>
      </div>

      <ApiGuideStepTokenExchange />
    </EdSectionBand>

    <EdSectionBand
      id="step-9-encrypt-pii-instructions"
      num="11"
      color="var(--at-teal)"
      eyebrow="Creating the Payment · Step 9 — Encrypt PII for the Batch and each Instruction"
      title="Build the batch Risk PII and one instruction per payment"
      tone="cream"
    >
      <EdProse>
        The PII of a Bulk/Batch Payment is split in two. The <code>Risk</code> block is carried
        <strong>once</strong>, for the whole batch, in <code>Data.PersonalIdentifiableInformation</code>
        (File Payment Risk PII Schema Object, <code>AEFilePaymentRiskPIIProperties</code>). The Debtor
        Account and creditor of each payment are carried in that payment's own
        <code>PersonalIdentifiableInformation</code> (File Payment PII Schema Object,
        <code>AEFilePaymentPIIProperties</code>), which has no <code>Risk</code> block.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Instruction PII field</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Initiation.DebtorAccount</code></td><td>Yes</td><td>The account this payment is made from. <code>SchemeName</code> must be <code>IBAN</code>; <code>Identification</code> is required; <code>Name</code> may be omitted if not held by the TPP</td></tr>
            <tr><td><code>Initiation.CreditorAccount</code></td><td>Yes</td><td>The domestic Creditor Account of this payment</td></tr>
            <tr><td><code>Initiation.Creditor</code></td><td>No</td><td>The creditor's name and postal address</td></tr>
            <tr><td><code>Initiation.CreditorAgent</code></td><td>No</td><td>The Financial Institution that holds the Creditor Account</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="One JWE per payment">
        <p>
          Encrypt each instruction's PII separately, with the same JWS-inside-JWE helper used in Step 1.
          Each element of <code>Instructions</code> carries exactly one Debtor Account and one creditor,
          and the payments in a batch may be made from different accounts. Confirmation of Payee is not
          carried for a Bulk/Batch Payment.
        </p>
      </EdNote>

      <EdCodeGroup :tabs="step9Tabs" />

      <EdProse>
        See <a :href="`${SI}/personal-identifiable-information/creditor`">Creditor</a> for the creditor
        field reference and validation rules, and
        <a href="#bulk-batch-risk">the Bulk and Batch Risk block</a> for the batch's <code>Risk</code>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-10-submit-bulk-payment"
      num="12"
      color="var(--at-gold)"
      eyebrow="Creating the Payment · Step 10 — Sign and Submit the Bulk/Batch Payment"
      title="POST /bulk-payments — signed JWT submission"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/bulk-payments</code>
      </div>

      <EdProse>
        The <code>POST /bulk-payments</code> body is sent as <code>Content-Type: application/jwt</code>
        &mdash; the payload is wrapped in a signed JWT (<code>AEFilePaymentRequestSigned</code>) using
        your private signing key, exactly as for <code>POST /payments</code>.
        Only <code>ConsentId</code> and <code>PersonalIdentifiableInformation</code> (the
        <code>Risk</code> block) are set once for the whole batch. Everything else, including the
        <code>PaymentPurposeCode</code>, is set on each payment, and a Bulk/Batch Payment carries no
        <code>OpenFinanceBilling</code>.
      </EdProse>

      <EdProse>
        Include <code>x-fapi-interaction-id</code> and <code>x-idempotency-key</code>. If the customer is
        present, also send <code>x-fapi-customer-ip-address</code>, <code>x-customer-user-agent</code>
        and, if the customer has been authenticated, <code>x-fapi-auth-date</code>. See
        <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>. Generate a new
        <code>x-idempotency-key</code> for each batch and store it with the request before you send it.
        If you receive no response or an error, look the batch up by key with
        <a :href="`${REF}/bulk-payments-idempotency`">GET <code>/bulk-payments</code></a> before you
        retry, and retry only with the same key and the same body.
      </EdProse>

      <h3 class="ed-doc__subhead">Data</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ConsentId</code>*</td><td>string (uuid)</td><td>The authorized consent</td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code></td><td>string (JWE)</td><td>The batch's <code>Risk</code> block, from Step 9a. It applies to every payment in <code>Instructions</code></td></tr>
            <tr><td><code>Instructions</code>*</td><td>array (1–500)</td><td>The payments in the batch, one element per payment. <em>Described below.</em></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Data.Instructions[]</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Amount.Amount</code>*</td><td>string</td><td>Payment amount, with exactly two decimal places</td></tr>
            <tr><td><code>Amount.Currency</code>*</td><td>string</td><td>Must be <code>AED</code>, equal to <code>TotalValueOfPayments.Currency</code> on the consent</td></tr>
            <tr><td><code>PaymentPurposeCode</code>*</td><td>string (3 chars)</td><td>AANI payment purpose code of this payment</td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code>*</td><td>string (JWE)</td><td>This payment's encrypted Debtor Account and creditor, from Step 9b</td></tr>
            <tr><td><code>DebtorReference</code></td><td>string</td><td>Reference shown on the debtor's statement for this payment</td></tr>
            <tr><td><code>CreditorReference</code></td><td>string</td><td>Reference passed to the creditor for this payment</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCodeGroup :tabs="step10Tabs" />

      <EdNote type="warning" title="Validation against the consent">
        <p>
          The API Hub validates the request against the <code>BulkBatchPayment</code> control parameters of
          the authorized consent. The number of elements in <code>Instructions</code> MUST equal
          <code>NumberOfTransactions</code>, the <code>Amount.Currency</code> of every element MUST equal
          <code>TotalValueOfPayments.Currency</code>, and the sum of their <code>Amount.Amount</code>
          values MUST equal <code>TotalValueOfPayments.Amount</code>. A request that fails any of these
          checks is rejected. The LFI then decrypts the batch PII and the PII of each instruction.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">A successful POST /bulk-payments</h3>
      <EdProse>
        A <code>201 Created</code> response is returned as a signed JWT
        (<code>application/jwt</code>). The verified JWT body is a <code>message</code> envelope
        wrapping <code>Data</code> and <code>Links</code> per <code>AEFilePaymentIdResponseSigned</code>.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Response body — <code>Data</code></h4>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>BulkPaymentId</code></td><td>Yes</td><td>Identifier of the Bulk/Batch Payment as a whole &mdash; use it to read the status of its payments</td></tr>
            <tr><td><code>ConsentId</code></td><td>Yes</td><td>The consent this Bulk/Batch Payment is bound to</td></tr>
            <tr><td><code>CreationDateTime</code></td><td>Yes</td><td>ISO 8601 datetime when the resource was created</td></tr>
            <tr><td><code>Instructions</code></td><td>Yes</td><td>One element per payment, in the order of the request. Each carries its own <code>PaymentId</code>, <code>Status</code>, <code>StatusUpdateDateTime</code>, <code>Amount</code> and <code>PaymentPurposeCode</code>, and where available <code>PaymentTransactionId</code>, <code>PaymentRail</code>, <code>RejectReasonCode</code>, <code>DebtorReference</code> and <code>CreditorReference</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCode :code="successResponseJson" lang="json" filename="201 Created — decoded JWT body" />

      <EdProse>
        See the <a :href="`${REF}/bulk-payments`">POST /bulk-payments</a> API reference for the full
        request and response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-11-payment-status"
      num="13"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Tracking the Batch · Step 11 — Payment Status"
      title="Read the status of each payment"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/bulk-payments/{BulkPaymentId}</code>
      </div>

      <EdProse>
        Read the Bulk/Batch Payment with
        <a :href="`${REF}/bulk-payments-BulkPaymentId`">GET <code>/bulk-payments/{BulkPaymentId}</code></a>.
        It takes a client-credentials access token (scope <code>openid payments</code>) rather than the
        consent's access token &mdash; see
        <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a>.
      </EdProse>

      <EdProse>
        The Bulk/Batch Payment carries <strong>no status of its own</strong>. Each element of
        <code>Instructions</code> carries the same status fields as a single payment on
        <code>GET /payments/{PaymentId}</code> &mdash; <code>Pending</code> through to
        <code>AcceptedWithoutPosting</code>, <code>AcceptedCreditSettlementCompleted</code> or
        <code>Rejected</code> &mdash; and the LFI updates them in the same way. Each payment settles over
        its own rail, reported in its <code>PaymentRail</code>. See
        <a :href="`${SI}/domestic-payments/overview/payment-status`">Payment Rails and Status</a>.
      </EdProse>

      <EdCodeGroup :tabs="step11Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-12-individual-payment-status"
      num="14"
      color="var(--at-teal-deep)"
      eyebrow="Tracking the Batch · Step 12 — Individual Payment Status"
      title="Check the status of an individual PaymentId"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/bulk-payments/{BulkPaymentId}/payments/{PaymentId}</code>
      </div>

      <EdProse>
        Each payment in a Bulk/Batch Payment has its own <code>PaymentId</code>, returned on its element of
        <code>Instructions</code> in the <code>201</code> response to <code>POST /bulk-payments</code>.
        To check one payment without reading the whole batch, call
        <a :href="`${REF}/bulk-payments-BulkPaymentId-payments-PaymentId`">GET <code>/bulk-payments/{BulkPaymentId}/payments/{PaymentId}</code></a>.
        It takes a client-credentials access token (scope <code>openid payments</code>), not the consent's
        access token.
      </EdProse>

      <EdProse>
        <code>Data</code> is that payment's element of <code>Instructions</code>, exactly as
        <code>GET /bulk-payments/{BulkPaymentId}</code> returns it for every payment
        (<code>AEFilePaymentInstructionResponse</code>), with <code>Links</code>. Read <code>Status</code>
        and <code>StatusUpdateDateTime</code>, and where present <code>PaymentRail</code>,
        <code>PaymentTransactionId</code> and <code>RejectReasonCode</code>. A <code>PaymentId</code> that is
        not a payment within the Bulk/Batch Payment identified by <code>BulkPaymentId</code> returns
        <code>404</code>. See
        <a :href="`${SI}/domestic-payments/overview/payment-status`">Payment Rails and Status</a>.
      </EdProse>

      <EdCodeGroup :tabs="step12Tabs" />

      <EdNote type="info" title="Not on GET /payments/{PaymentId}">
        <p>
          Bulk/Batch Payments are kept separate from single payments. A payment within a batch is read only
          with <code>GET /bulk-payments/{BulkPaymentId}/payments/{PaymentId}</code>.
          <a :href="`${SI}/open-api/payments-PaymentId`">GET <code>/payments/{PaymentId}</code></a> returns
          only payments made on <code>POST /payments</code>, and a batch payment's <code>PaymentId</code>
          returns <code>404</code> there.
        </p>
      </EdNote>

      <EdProse>
        Use <code>GET /bulk-payments/{BulkPaymentId}</code> (<a href="#step-11-payment-status">Step 11</a>)
        to follow the whole batch, and <code>GET /bulk-payments/{BulkPaymentId}/payments/{PaymentId}</code>
        to follow a single payment within it &mdash; for example, one the User asks about, or one still at
        <code>Pending</code>.
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
.ed-doc__subhead--small { font-size: 1.05rem; }
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
