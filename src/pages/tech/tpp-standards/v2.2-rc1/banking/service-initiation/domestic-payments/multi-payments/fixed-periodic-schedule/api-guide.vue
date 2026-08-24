<route lang="yaml">
meta:
  title: Fixed Periodic Schedule — API Guide
</route>

<script setup lang="ts">
const exampleAuthDetails = `"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2027-03-02T00:00:00+00:00",

      // Multi-authorization only: deadline for all authorizers to act.
      // SHOULD NOT be set when IsSingleAuthorization is true.
      // "AuthorizationExpirationDateTime": "2026-03-03T10:00:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances"
      ],

      "ControlParameters": {
        "ConsentSchedule": {
          "MultiPayment": {
            "MaximumCumulativeNumberOfPayments": 24,
            // Optional consent-lifetime cumulative value cap:
            // "MaximumCumulativeValueOfPayments": { "Amount": "3600.00", "Currency": "AED" },

            "PeriodicSchedule": {
              "Type": "FixedPeriodicSchedule",
              "PeriodType": "Month",
              "PeriodStartDate": "2027-01-01",
              "Amount": { "Amount": "150.00", "Currency": "AED" }
            }
          }
        }
      },

      // Encrypted PII from Step 1
      "PersonalIdentifiableInformation": "{{encryptedPII}}",

      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Subscription",
      "CreditorReference": "Subscription"
    }
  }
]
`

const step3Node = `import crypto from 'node:crypto'
import { generateCodeVerifier, deriveCodeChallenge } from './pkce'
import { buildRequestJWT } from './request-jwt'

const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:service-initiation-consent:v2.2',
    consent: {
      ConsentId: crypto.randomUUID(),
      IsSingleAuthorization: true,
      ExpirationDateTime: new Date(Date.now() + 364 * 24 * 60 * 60 * 1000).toISOString(),
      Permissions: ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances'],
      ControlParameters: {
        ConsentSchedule: {
          MultiPayment: {
            MaximumCumulativeNumberOfPayments: 24,
            // Optional consent-lifetime cumulative value cap:
            // MaximumCumulativeValueOfPayments: { Amount: '3600.00', Currency: 'AED' },
            PeriodicSchedule: {
              Type: 'FixedPeriodicSchedule',
              PeriodType: 'Month',
              PeriodStartDate: '2027-01-01',
              Amount: { Amount: '150.00', Currency: 'AED' },
            },
          },
        },
      },
      PersonalIdentifiableInformation: encryptedPII,  // from Step 1
      PaymentPurposeCode: 'ACM',
      DebtorReference: 'Subscription',
      CreditorReference: 'Subscription',
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
from pkce import generate_code_verifier, derive_code_challenge
from request_jwt import build_request_jwt

code_verifier  = generate_code_verifier()
code_challenge = derive_code_challenge(code_verifier)

authorization_details = [
    {
        "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
        "consent": {
            "ConsentId": str(uuid.uuid4()),
            "IsSingleAuthorization": True,
            "ExpirationDateTime": (datetime.now(timezone.utc) + timedelta(days=364)).isoformat(),
            "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances"],
            "ControlParameters": {
                "ConsentSchedule": {
                    "MultiPayment": {
                        "MaximumCumulativeNumberOfPayments": 24,
                        # Optional consent-lifetime cumulative value cap:
                        # "MaximumCumulativeValueOfPayments": {"Amount": "3600.00", "Currency": "AED"},
                        "PeriodicSchedule": {
                            "Type": "FixedPeriodicSchedule",
                            "PeriodType": "Month",
                            "PeriodStartDate": "2027-01-01",
                            "Amount": {"Amount": "150.00", "Currency": "AED"},
                        },
                    }
                }
            },
            "PersonalIdentifiableInformation": encrypted_pii,  # from Step 1
            "PaymentPurposeCode": "ACM",
            "DebtorReference": "Subscription",
            "CreditorReference": "Subscription",
        },
    }
]

request_jwt = build_request_jwt(
    scope="payments openid",
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)
`

const step9Node = `import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

async function initiateFixedPeriodicPayment(
  accessToken: string,
  consentId: string,
  paymentEncryptedPII: string,  // from the PII step above
  idempotencyKey: string,
) {
  // Wrapped in \`message\` per AEPaymentRequestSigned
  const paymentPayload = {
    message: {
      Data: {
        ConsentId: consentId,                    // must match the authorized consent
        Instruction: {
          Amount: {
            Amount:   '150.00',                  // must be within consent parameters
            Currency: 'AED',
          },
        },
        PersonalIdentifiableInformation: paymentEncryptedPII,
        PaymentPurposeCode: 'ACM',
        DebtorReference:    'Subscription',
        CreditorReference:  'Subscription',
        OpenFinanceBilling: {
          Type: 'PushP2P',
        },
      },
    },
  }

  // AUTHORIZATION_SERVER_ISSUER is the \`issuer\` value from the LFI's .well-known/openid-configuration
  const signedPayment = await new SignJWT(paymentPayload)
    .setProtectedHeader({ alg: 'PS256', kid: SIGNING_KEY_ID, typ: 'JWT' })
    .setIssuedAt()
    .setIssuer(CLIENT_ID)
    .setAudience(AUTHORIZATION_SERVER_ISSUER)
    .setExpirationTime('5m')
    .sign(signingKey)

  const paymentResponse = await fetch(\`\${LFI_API_BASE}/open-finance/payment/v2.2/payments\`, {
    method: 'POST',
    headers: {
      Authorization:                \`Bearer \${accessToken}\`,
      'Content-Type':               'application/jwt',
      'x-idempotency-key':          idempotencyKey,
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-auth-date':           lastCustomerAuthDate,
      'x-fapi-customer-ip-address': customerIpAddress,
    },
    body: signedPayment,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })

  const { Data: { PaymentId, Status } } = await paymentResponse.json()
  return { PaymentId, Status }
}

// March payment
const { PaymentId: marPay } = await initiateFixedPeriodicPayment(access_token, consentId, paymentEncryptedPII, crypto.randomUUID())

// April payment (following month, using a refreshed access token)
const { PaymentId: aprPay } = await initiateFixedPeriodicPayment(refreshedToken, consentId, paymentEncryptedPII, crypto.randomUUID())
`

const step9Python = `import time
from jose import jwt as jose_jwt

def initiate_fixed_periodic_payment(
    access_token: str,
    consent_id: str,
    payment_encrypted_pii: str,  # from the PII step above
    idempotency_key: str,
) -> dict:
    # Wrapped in \`message\` per AEPaymentRequestSigned
    payment_payload = {
        "message": {
            "Data": {
                "ConsentId":   consent_id,               # must match the authorized consent
                "Instruction": {
                    "Amount": {
                        "Amount":   "150.00",          # must be within consent parameters
                        "Currency": "AED",
                    }
                },
                "PersonalIdentifiableInformation": payment_encrypted_pii,
                "PaymentPurposeCode": "ACM",
                "DebtorReference":    "Subscription",
                "CreditorReference":  "Subscription",
                "OpenFinanceBilling": {
                    "Type": "PushP2P",
                },
            }
        }
    }

    # AUTHORIZATION_SERVER_ISSUER is the \`issuer\` value from the LFI's .well-known/openid-configuration
    now = int(time.time())
    signed_payment = jose_jwt.encode(
        {
            **payment_payload,
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
        f"{LFI_API_BASE}/open-finance/payment/v2.2/payments",
        headers={
            "Authorization":               f"Bearer {access_token}",
            "Content-Type":                "application/jwt",
            "x-idempotency-key":           idempotency_key,
            "x-fapi-interaction-id":       str(uuid.uuid4()),
            "x-fapi-auth-date":            last_customer_auth_date,
            "x-fapi-customer-ip-address":  customer_ip_address,
        },
        content=signed_payment,
        # cert=("transport.crt", "transport.key"),
    )
    data = response.json()["Data"]
    return {"payment_id": data["PaymentId"], "status": data["Status"]}


# March payment
mar_pay = initiate_fixed_periodic_payment(access_token, consent_id, payment_encrypted_pii, str(uuid.uuid4()))

# April payment (following month, using a refreshed access token)
apr_pay = initiate_fixed_periodic_payment(refreshed_token, consent_id, payment_encrypted_pii, str(uuid.uuid4()))
`

const step3Tabs = [{ label: 'Node.js', lang: 'typescript', code: step3Node }, { label: 'Python', lang: 'python', code: step3Python }] as const
const step9Tabs = [{ label: 'Node.js', lang: 'typescript', code: step9Node }, { label: 'Python', lang: 'python', code: step9Python }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · Service Initiation · Fixed Periodic Schedule
        </div>
        <h1 class="ed-doc__title">
          Fixed Periodic Schedule &mdash; API Guide
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A Fixed Periodic Schedule consent authorises a TPP to initiate <strong>one payment per
          period</strong> at a <strong>fixed amount</strong> over the lifetime of the consent. The user
          authorises once &mdash; approving a specific payment amount and the recurring period &mdash;
          and the TPP submits one payment per period without requiring re-authorisation each time.
        </p>
        <p class="ed-doc__lede">
          Common use cases include fixed monthly subscriptions, regular instalment collection, and
          recurring membership fees where the charge is always the same and payments follow a
          predictable calendar.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before initiating a Fixed Periodic Schedule payment"
      tone="cream"
    >
      <EdProse>Before initiating a Fixed Periodic Schedule payment, ensure the following requirements are met:</EdProse>

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
          This certificate is used to sign request objects and client assertions.
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
          &mdash; PII (creditor name and account details) must be encrypted as a JWE before being
          embedded in the consent. You will need the LFI's public encryption key from their JWKS.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end Fixed Periodic Schedule"
      tone="surface"
    >
      <APIFlowViewer title="Fixed Periodic Schedule API Flow">
        <APIFlowsPeriodicSchedule />
      </APIFlowViewer>
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

      <ApiGuideStepEncryptPii />
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
        <code>urn:openfinanceuae:service-initiation-consent:v2.2</code>. Set
        <code>PeriodicSchedule.Type</code> to <code>"FixedPeriodicSchedule"</code>. The payment amount
        <strong>is fixed at consent time</strong> via <code>PeriodicSchedule.Amount</code> &mdash;
        every <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span> call under this consent must use exactly this amount, and
        only one payment may be submitted per period.
      </EdProse>

      <h3 class="ed-doc__subhead">authorization_details</h3>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>type</code>*</td><td>enum</td><td>Must be <code>urn:openfinanceuae:service-initiation-consent:v2.2</code></td><td><code>urn:openfinanceuae:service-initiation-consent:v2.2</code></td></tr>
            <tr><td><code>consent</code>*</td><td>object</td><td>Consent properties agreed by the User with the TPP. <em>Described below.</em></td><td>&mdash;</td></tr>
            <tr><td><code>subscription</code></td><td>object</td><td>Optional subscription to Event Notifications via Webhook. <em>Described below.</em></td><td>&mdash;</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">consent (Required) | <code>authorization_details.consent</code></h3>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>ConsentId</code>*</td><td>string (uuid)</td><td>Unique ID assigned by the TPP (1–128 chars)</td><td><code>b8f42378-10ac-46a1-8d20-4e020484216d</code></td></tr>
            <tr><td><code>IsSingleAuthorization</code>*</td><td>boolean</td><td>Whether the payment requires only one authorizing party</td><td><code>true</code></td></tr>
            <tr><td><code>ExpirationDateTime</code>*</td><td>date-time</td><td>Consent expiry (ISO 8601 with timezone, max 1 year)</td><td><code>2027-03-02T00:00:00+00:00</code></td></tr>
            <tr><td><code>AuthorizationExpirationDateTime</code></td><td>date-time</td><td>Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when <code>IsSingleAuthorization</code> is <code>false</code>; SHOULD NOT be set when <code>IsSingleAuthorization</code> is <code>true</code>. MUST NOT be after <code>ExpirationDateTime</code>.</td><td><code>2026-03-03T10:00:00+00:00</code></td></tr>
            <tr><td><code>BaseConsentId</code></td><td>string (uuid)</td><td>Links to prior consent if renewing &mdash; see <a href="/knowledge-base/articles/base-consent-id">Base Consent ID</a></td><td>&mdash;</td></tr>
            <tr><td><code>Permissions</code></td><td>array&lt;enum&gt;</td><td>Optional access permissions granted alongside the payment consent</td><td><code>ReadAccountsBasic</code>, <code>ReadBalances</code></td></tr>
            <tr><td><code>ControlParameters</code>*</td><td>object</td><td>Payment controls &mdash; <strong>see below</strong></td><td>&mdash;</td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code>*</td><td>string (JWE)</td><td>Encrypted creditor and risk data &mdash; the <code>encryptedPII</code> string from Step 1</td><td><code>eyJhbGci...</code></td></tr>
            <tr><td><code>PaymentPurposeCode</code>*</td><td>string (3 chars)</td><td>AANI payment purpose code</td><td><code>ACM</code></td></tr>
            <tr><td><code>DebtorReference</code></td><td>string</td><td>Reference shown on the debtor's statement</td><td><code>Subscription</code></td></tr>
            <tr><td><code>CreditorReference</code></td><td>string</td><td>Reference shown on the creditor's statement</td><td><code>Subscription</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">ControlParameters &mdash; Fixed Periodic Schedule</h3>
      <EdProse>
        <code>ControlParameters.ConsentSchedule.MultiPayment</code> carries the control definition. Set
        <code>PeriodicSchedule.Type</code> to <code>"FixedPeriodicSchedule"</code>. Only <strong>one
        payment is permitted per period</strong>. There is no <code>Controls</code> block &mdash; the
        period itself acts as the limiting boundary.
      </EdProse>

      <EdProse>
        <strong>Cumulative Control Parameters</strong> &mdash; apply across the entire consent lifetime:
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Required</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>MaximumCumulativeNumberOfPayments</code></td><td><strong>Yes</strong></td><td>Maximum total number of payments over the consent lifetime</td><td><code>24</code></td></tr>
            <tr><td><code>MaximumCumulativeValueOfPayments.Amount</code></td><td>No</td><td>Maximum total value of all payments over the consent lifetime</td><td><code>3600.00</code></td></tr>
            <tr><td><code>MaximumCumulativeValueOfPayments.Currency</code></td><td>No</td><td>ISO 4217 currency code</td><td><code>AED</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <strong>Periodic Schedule Parameters</strong> &mdash; define the fixed amount and period, set
        directly inside <code>PeriodicSchedule</code>:
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Required</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>PeriodicSchedule.PeriodType</code></td><td>Yes</td><td>The period length: <code>Day</code>, <code>Week</code>, <code>Month</code>, or <code>Year</code></td><td><code>Month</code></td></tr>
            <tr><td><code>PeriodicSchedule.PeriodStartDate</code></td><td>Yes</td><td>The date from which each period is counted. Must be in the future (today is rejected) and before <code>ExpirationDateTime</code></td><td><code>2027-01-01</code></td></tr>
            <tr><td><code>PeriodicSchedule.Amount.Amount</code></td><td>Yes</td><td>The <strong>fixed</strong> payment amount. Every payment submitted under this consent must be for exactly this value</td><td><code>150.00</code></td></tr>
            <tr><td><code>PeriodicSchedule.Amount.Currency</code></td><td>Yes</td><td>ISO 4217 currency code</td><td><code>AED</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="One payment per period">
        <p>
          Only one payment may be submitted per period. The API Hub will reject a second
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span> call within the same period, even if the amount matches.
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

      <EdProse>After redirecting, the user will see the bank's authorization screen showing:</EdProse>
      <EdBullets>
        <li>The TPP name and purpose.</li>
        <li>The fixed payment <code>Amount</code> (e.g. "AED 150.00 per payment").</li>
        <li>The period type and start date (e.g. "Monthly from 1 March 2026").</li>
        <li>Any lifetime cumulative caps.</li>
        <li>The consent expiry date.</li>
      </EdBullets>

      <EdNote type="tip" title="User Experience">
        <p>
          See <a href="./user-journeys">User Experience</a> for screen mockups of the Fixed Periodic
          Schedule <strong>Consent</strong> and <strong>Authorization</strong> pages the user sees at
          the bank.
        </p>
      </EdNote>
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
      id="payment-encrypt-pii"
      num="11"
      color="var(--at-teal)"
      eyebrow="Initiating Payments · Encrypt PII for Payment Initiation"
      title="Re-encrypt the creditor PII for each payment"
      tone="cream"
    >
      <ApiGuideStepPaymentEncryptPii />
    </EdSectionBand>

    <EdSectionBand
      id="step-9-post-payments"
      num="12"
      color="var(--at-gold)"
      eyebrow="Initiating Payments · Step 9 — POST /payments"
      title="Submit one payment per period"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/payments</code>
      </div>

      <EdProse>
        Include <code>x-fapi-interaction-id</code> and <code>x-idempotency-key</code>. If the customer
        is present at this point in the flow, also send <code>x-fapi-customer-ip-address</code>,
        <code>x-customer-user-agent</code> and <code>x-fapi-auth-date</code> if the customer has been
        authenticated. See <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdProse>
        Submit one payment per period under this consent. The <code>Instruction.Amount</code> must
        exactly match the fixed <code>Amount</code> defined in <code>PeriodicSchedule</code> &mdash;
        the API Hub will reject any payment where the amount does not match, and will reject a second
        payment submitted within the same period.
      </EdProse>

      <EdNote type="info" title="Fields that can vary per payment">
        <p>
          Unlike Single Instant Payment, multi-payment consents do not require
          <code>PaymentPurposeCode</code>, <code>DebtorReference</code>, <code>CreditorReference</code>,
          or <code>OpenFinanceBilling</code> to match the consent exactly. Only <code>ConsentId</code>
          must match the authorized consent. <code>Instruction.Amount</code> must be within the
          parameters the consent allows for this payment type.
        </p>
      </EdNote>

      <EdCodeGroup :tabs="step9Tabs" />

      <EdNote type="warning" title="Fixed amount and period enforcement">
        <p>
          The API Hub will reject a payment if <code>Instruction.Amount</code> does not exactly match
          <code>PeriodicSchedule.Amount</code>, if a payment has already been submitted in the current
          period, or if any lifetime cumulative cap has been reached.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="token-refresh"
      num="13"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Token refresh for subsequent payments"
      title="Use the refresh_token to keep the session alive"
      tone="cream"
    >
      <ApiGuideStepTokenRefresh />
    </EdSectionBand>

    <EdSectionBand
      id="payment-response"
      num="14"
      color="var(--at-navy)"
      eyebrow="A successful POST /payments"
      title="201 Created — signed JWT response"
      tone="surface"
    >
      <ApiGuideStepPaymentResponse />

      <EdNote type="info" title="Consent stays Authorized">
        <p>
          After each successful payment, the consent remains in the <code>Authorized</code> state
          until the next period begins (unless lifetime cumulative caps are reached or the consent
          expires). You do <strong>not</strong> need to re-initiate the authorization flow.
        </p>
      </EdNote>
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
