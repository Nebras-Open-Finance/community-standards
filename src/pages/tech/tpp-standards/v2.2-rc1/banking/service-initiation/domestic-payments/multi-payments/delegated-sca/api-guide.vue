<route lang="yaml">
meta:
  title: Delegated SCA — API Guide
</route>

<script setup lang="ts">
const riskJson = `{
  "Risk": {
    "DebtorIndicators": {
      "Authentication": {
        "AuthenticationChannel": "App",
        "AuthenticationFlow":    "MFA",
        "ChallengeOutcome":      "Pass",
        "ChallengeDateTime":     "2025-06-19T09:55:44Z",
        "PossessionFactor": { "IsUsed": true, "Type": "SecureEnclaveKey" },
        "InherenceFactor":  { "IsUsed": true, "Type": "Fingerprint" }
      },
      "GeoLocation":       { "Latitude": "25.1972", "Longitude": "55.2744" },
      "DeviceInformation": { "DeviceType": "Mobile" /* ... */ }
      // AppInformation, BiometricCapabilities, AccountRiskIndicators, ...
    },
    "TransactionIndicators": {
      "IsCustomerPresent": true,
      "Channel":           "Mobile",
      "ChannelType":       "InApp"
      // SubChannelType, PaymentProcess, ...
    },
    "CreditorIndicators": {
      "AccountType":         "Retail",
      "IsCreditorConfirmed": true
      // IsCreditorPrePopulated, IsVerifiedByTPP, ...
    }
  }
}
`

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
        "IsDelegatedAuthentication": true,
        "ConsentSchedule": {}
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
        IsDelegatedAuthentication: true,
        ConsentSchedule: {},
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
                "IsDelegatedAuthentication": True,
                "ConsentSchedule": {}
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

async function initiateVariablePayment(
  accessToken: string,
  consentId: string,
  amount: string,        // amount the user just approved via your SCA flow
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
            Amount:   amount,                  // must be within consent parameters
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

// First payment
const { PaymentId: pay1 } = await initiateVariablePayment(access_token, consentId, '149.99', paymentEncryptedPII, crypto.randomUUID())

// Second payment (days/weeks later using a refreshed access token)
const { PaymentId: pay2 } = await initiateVariablePayment(refreshedToken, consentId, '89.00', paymentEncryptedPII, crypto.randomUUID())
`

const step9Python = `import time
from jose import jwt as jose_jwt

def initiate_variable_payment(
    access_token: str,
    consent_id: str,
    amount: str,          # amount the user just approved via your SCA flow
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
                        "Amount":   amount,            # must be within consent parameters
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


# First payment
pay1 = initiate_variable_payment(access_token, consent_id, "149.99", payment_encrypted_pii, str(uuid.uuid4()))

# Second payment (days/weeks later using a refreshed access token)
pay2 = initiate_variable_payment(refreshed_token, consent_id, "89.00", payment_encrypted_pii, str(uuid.uuid4()))
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
          TPP · Banking · Service Initiation · Delegated SCA
        </div>
        <h1 class="ed-doc__title">
          Delegated SCA &mdash; API Guide
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A Delegated SCA consent authorises a TPP to initiate <strong>multiple payments</strong> at
          variable amounts over the lifetime of the consent. The user authorises the consent once.
          Unlike other multi-payments a Delegated SCA consent does not contain predefined control
          parameters. Instead, the TPP is responsible for performing Strong Customer Authentication
          (SCA) on the user before each payment request (POST /payments).
        </p>
        <p class="ed-doc__lede">
          Common use cases include digital wallet experiences where the TPP authenticates the user
          within its own app, as well as usage-based services such as taxi rides, EV charging
          sessions, and other metered services where the final charge is presented to the user after
          the service is completed.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before initiating a Delegated SCA payment"
      tone="cream"
    >
      <EdProse>Before initiating a Delegated SCA payment, ensure the following requirements are met:</EdProse>

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
      title="End-to-end Delegated SCA"
      tone="surface"
    >
      <APIFlowViewer title="Delegated SCA API Flow">
        <APIFlowsDelegatedSCA />
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

      <ApiGuideStepEncryptPiiVariable />

      <EdNote type="warning" title="Delegated SCA requires a populated Risk block">
        <p>
          Unlike standard payment flows, Delegated SCA <strong>MUST</strong> prove the SCA already
          performed at the TPP. At minimum,
          <code>Risk.DebtorIndicators.Authentication</code> must demonstrate MFA with two distinct
          factors, and the wider <code>Risk</code> block must be fully populated with everything
          derivable from your system.
        </p>
        <EdCode :code="riskJson" lang="jsonc" filename="Risk block" />
        <p>
          See the
          <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/risk#delegated-sca-payment">Delegated
          SCA Payment example</a> for a fully-populated version and the
          <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/risk">Risk
          reference</a> for the field-by-field schema.
        </p>
      </EdNote>
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
        <code>urn:openfinanceuae:service-initiation-consent:v2.2</code>. For Delegated SCA you
        <strong>must</strong> set <code>ControlParameters.IsDelegatedAuthentication</code> to
        <code>true</code> and leave <code>ConsentSchedule</code> empty, indicating that the TPP will
        perform SCA on the user before each <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span> request.
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
            <tr><td><code>ControlParameters</code>*</td><td>object</td><td>Must include <code>IsDelegatedAuthentication: true</code> and an empty <code>ConsentSchedule</code></td><td>&mdash;</td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code>*</td><td>string (JWE)</td><td>Encrypted creditor and risk data &mdash; the <code>encryptedPII</code> string from Step 1</td><td><code>eyJhbGci...</code></td></tr>
            <tr><td><code>PaymentPurposeCode</code>*</td><td>string (3 chars)</td><td>AANI payment purpose code</td><td><code>ACM</code></td></tr>
            <tr><td><code>DebtorReference</code></td><td>string</td><td>Reference shown on the debtor's statement</td><td><code>Subscription</code></td></tr>
            <tr><td><code>CreditorReference</code></td><td>string</td><td>Reference shown on the creditor's statement</td><td><code>Subscription</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">ControlParameters &mdash; Delegated SCA</h3>
      <EdProse>
        For Delegated SCA consents, the LFI defers payment-level controls to the TPP. Declare
        delegation and keep the schedule empty:
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Required</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>IsDelegatedAuthentication</code></td><td>Yes</td><td>Must be <code>true</code> to indicate the TPP will perform SCA before every payment request</td><td><code>true</code></td></tr>
            <tr><td><code>ConsentSchedule</code></td><td>Yes</td><td>Leave empty <code>{}</code> &mdash; no bank-enforced caps or schedules are defined on the consent</td><td><code>{}</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="Who enforces limits?">
        <p>
          Any spend, frequency are enforced by the TPP and Strong Customer Authentication must be done
          before each Payment.
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
        <li>That payments will be authenticated by the TPP (Delegated SCA).</li>
        <li>The consent expiry date.</li>
      </EdBullets>

      <EdNote type="tip" title="User Experience">
        <p>
          See <a href="./user-journeys">User Experience</a> for screen mockups of the Delegated SCA
          <strong>Consent</strong> and <strong>Authorization</strong> pages the user sees at the bank.
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
      eyebrow="Initiating Payments On-Demand · Encrypt PII for Payment Initiation"
      title="Re-encrypt the creditor PII for each payment"
      tone="cream"
    >
      <ApiGuideStepPaymentEncryptPiiVariable />
    </EdSectionBand>

    <EdSectionBand
      id="step-9-post-payments"
      num="12"
      color="var(--at-gold)"
      eyebrow="Initiating Payments On-Demand · Step 9 — POST /payments"
      title="Submit each payment after performing SCA on the user"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/payments</code>
      </div>

      <EdProse>
        Include <code>x-fapi-interaction-id</code> and <code>x-idempotency-key</code>. As the customer
        must always have been present and authenticated for the TPP to instruct a delegated SCA
        payment, also send <code>x-fapi-customer-ip-address</code>,
        <code>x-customer-user-agent</code> and <code>x-fapi-auth-date</code>. See
        <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdProse>
        Unlike Single Instant Payment, this step can be called <strong>multiple times</strong> under
        the same consent. Each call specifies the actual amount for that payment. There are no
        consent-time caps &mdash; make sure you have just performed SCA on the user in your own
        channel before sending the payment request.
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
          until it expires or is revoked. You do <strong>not</strong> need to re-initiate the
          authorization flow.
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
