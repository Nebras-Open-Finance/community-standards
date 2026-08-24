<route lang="yaml">
meta:
  title: Single Instant Payment — API Guide
</route>

<script setup lang="ts">
const exampleAuthDetails = `"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2026-05-03T15:46:00+00:00",

      // Multi-authorization only: deadline for all authorizers to act.
      // SHOULD NOT be set when IsSingleAuthorization is true.
      // "AuthorizationExpirationDateTime": "2026-05-03T16:00:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadRefundAccount"
      ],

      "ControlParameters": {
        "ConsentSchedule": {
          "SinglePayment": {
            "Type": "SingleInstantPayment",
            "Amount": {
              "Amount": "100.00",
              "Currency": "AED"
            }
          }
        }
      },

      // Encrypted PII from Step 1
      "PersonalIdentifiableInformation": "{{encryptedPII}}",

      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Invoice 1234",
      "CreditorReference": "Invoice 1234"
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
      ExpirationDateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      Permissions: ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances', 'ReadRefundAccount'],
      ControlParameters: {
        ConsentSchedule: {
          SinglePayment: {
            Type: 'SingleInstantPayment',
            Amount: { Amount: '100.00', Currency: 'AED' },
          },
        },
      },
      PersonalIdentifiableInformation: encryptedPII,  // from Step 1
      PaymentPurposeCode: 'ACM',
      DebtorReference: 'Invoice 1234',
      CreditorReference: 'Invoice 1234',
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
            "ExpirationDateTime": (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat(),
            "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"],
            "ControlParameters": {
                "ConsentSchedule": {
                    "SinglePayment": {
                        "Type": "SingleInstantPayment",
                        "Amount": {"Amount": "100.00", "Currency": "AED"},
                    }
                }
            },
            "PersonalIdentifiableInformation": encrypted_pii,  # from Step 1
            "PaymentPurposeCode": "ACM",
            "DebtorReference": "Invoice 1234",
            "CreditorReference": "Invoice 1234",
        },
    }
]

request_jwt = build_request_jwt(
    scope="payments openid",
    code_challenge=code_challenge,
    authorization_details=authorization_details,
)
`

const step9Node = `import { SignJWT, importJWK, CompactEncrypt } from 'jose'

/**
 * Sign PII as a JWT and encrypt it as a JWE using the LFI's public encryption key.
 * Fetch the LFI's JWKS URI from their .well-known/openid-configuration.
 */
async function encryptPII(pii: object, jwksUri: string, signingKey: CryptoKey, signingKeyId: string): Promise<string> {
  // 1. Sign the PII as a JWT
  const signedPII = await new SignJWT(pii as Record<string, unknown>)
    .setProtectedHeader({ alg: 'PS256', kid: signingKeyId })
    .sign(signingKey)

  // 2. Fetch the LFI's encryption key
  const { keys } = await fetch(jwksUri).then(r => r.json())
  const encKeyJwk = keys.find((k: { use: string }) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  // 3. Encrypt the signed JWT
  return new CompactEncrypt(new TextEncoder().encode(signedPII))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(encKey)
}

const pii = {
  "Initiation": {
    "Creditor": {
      "Name": "Ivan England"
    },
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": {
        "en": "Ivan David England"
      }
    }
  }
}

const encryptedPII = await encryptPII(pii, LFI_JWKS_URI, signingKey, SIGNING_KEY_ID)
// encryptedPII is a compact JWE string — embed it in authorization_details below
`

const step9Python = `import json
import requests
from jose import jwe

def encrypt_pii(pii: dict, jwks_uri: str) -> str:
    keys = requests.get(jwks_uri).json()["keys"]
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    return jwe.encrypt(
        json.dumps(pii).encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()

pii = {
  "Initiation": {
    "Creditor": {
      "Name": "Ivan England"
    },
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": {
        "en": "Ivan David England"
      }
    }
  }
}

encrypted_pii = encrypt_pii(pii, LFI_JWKS_URI)
# encrypted_pii is a compact JWE string — embed it in authorization_details below
`

const step10Node = `import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

// Build the payment payload — wrapped in \`message\` per AEPaymentRequestSigned
const paymentPayload = {
  message: {
    Data: {
      ConsentId: consentId,                        // must exactly match the authorized consent
      Instruction: {
        Amount: {
          Amount:   '100.00',                      // must exactly match SinglePayment.Amount.Amount
          Currency: 'AED',                         // must exactly match SinglePayment.Amount.Currency
        },
      },
      PersonalIdentifiableInformation: paymentEncryptedPII,  // from Step 9a
      PaymentPurposeCode: 'ACM',                   // must exactly match consent.PaymentPurposeCode
      DebtorReference:    'Invoice 1234',          // must exactly match consent.DebtorReference
      CreditorReference:  'Invoice 1234',          // must exactly match consent.CreditorReference
      OpenFinanceBilling: {
        Type: 'PushP2P',                           // must exactly match consent.OpenFinanceBilling.Type
      },
    },
  },
}

// Sign the payload as a JWT using your private signing key
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
    'Authorization':               \`Bearer \${access_token}\`,
    'Content-Type':                'application/jwt',
    'x-idempotency-key':           idempotencyKey,       // stable per payment attempt; reuse on retry
    'x-fapi-interaction-id':       crypto.randomUUID(),
    'x-fapi-auth-date':            lastCustomerAuthDate,
    'x-fapi-customer-ip-address':  customerIpAddress,
  },
  body: signedPayment,
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { Data: { PaymentId, Status } } = await paymentResponse.json()
// Store PaymentId to poll for status
`

const step10Python = `import uuid
import time
from jose import jwt as jose_jwt

LFI_API_BASE = os.environ["LFI_API_BASE_URL"]

# Build the payment payload — wrapped in \`message\` per AEPaymentRequestSigned
payment_payload = {
    "message": {
        "Data": {
            "ConsentId":   consent_id,               # must exactly match the authorized consent
            "Instruction": {
                "Amount": {
                    "Amount":   "100.00",            # must exactly match SinglePayment.Amount.Amount
                    "Currency": "AED",               # must exactly match SinglePayment.Amount.Currency
                }
            },
            "PersonalIdentifiableInformation": payment_encrypted_pii,  # from Step 9a
            "PaymentPurposeCode": "ACM",             # must exactly match consent.PaymentPurposeCode
            "DebtorReference":    "Invoice 1234",    # must exactly match consent.DebtorReference
            "CreditorReference":  "Invoice 1234",    # must exactly match consent.CreditorReference
            "OpenFinanceBilling": {
                "Type": "PushP2P",                   # must exactly match consent.OpenFinanceBilling.Type
            },
        }
    }
}

# Sign the payload as a JWT using your private signing key
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

payment_response = httpx.post(
    f"{LFI_API_BASE}/open-finance/payment/v2.2/payments",
    headers={
        "Authorization":               f"Bearer {access_token}",
        "Content-Type":                "application/jwt",
        "x-idempotency-key":           idempotency_key,   # stable per payment attempt; reuse on retry
        "x-fapi-interaction-id":       str(uuid.uuid4()),
        "x-fapi-auth-date":            last_customer_auth_date,
        "x-fapi-customer-ip-address":  customer_ip_address,
    },
    content=signed_payment,
    # cert=("transport.crt", "transport.key"),
)

data       = payment_response.json()["Data"]
payment_id = data["PaymentId"]
status     = data["Status"]
`

const successResponseJson = `{
  "message": {
    "Data": {
      "PaymentId": "83b47199-90c2-4c05-9ef1-aeae68b0fc7c",
      "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
      "Status": "Pending",
      "StatusUpdateDateTime": "2026-05-03T15:46:01+00:00",
      "CreationDateTime": "2026-05-03T15:46:01+00:00",
      "Instruction": {
        "Amount": {
          "Amount": "100.00",
          "Currency": "AED"
        }
      },
      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Invoice 1234",
      "OpenFinanceBilling": {
        "Type": "PushP2P"
      }
    },
    "Links": {
      "Self": "https://api.lfi.example/open-finance/payment/v2.2/payments/83b47199-90c2-4c05-9ef1-aeae68b0fc7c"
    }
  }
}
`

const step3Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step3Node },  { label: 'Python', lang: 'python', code: step3Python }] as const
const step9Tabs  = [{ label: 'Node.js', lang: 'typescript', code: step9Node },  { label: 'Python', lang: 'python', code: step9Python }] as const
const step10Tabs = [{ label: 'Node.js', lang: 'typescript', code: step10Node }, { label: 'Python', lang: 'python', code: step10Python }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · Service Initiation · Single Instant Payment
        </div>
        <h1 class="ed-doc__title">
          Single Instant Payment &mdash; API Guide
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A Single Instant Payment is a one-time, immediate domestic payment initiated by the TPP on
          behalf of the user. The payment amount and destination are fixed at the point of consent
          &mdash; the user approves once, and the payment executes immediately after authorization.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before initiating a Single Instant Payment"
      tone="cream"
    >
      <EdProse>Before initiating a Single Instant Payment, ensure the following requirements are met:</EdProse>

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
      title="End-to-end Single Instant Payment"
      tone="surface"
    >
      <APIFlowViewer title="Single Instant Payment API Flow">
        <APIFlowsSingleInstantPayment />
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
        <code>urn:openfinanceuae:service-initiation-consent:v2.2</code>. The encrypted PII is embedded
        as <code>consent.PersonalIdentifiableInformation</code>.
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
            <tr><td><code>subscription</code></td><td>object</td><td>Optional subscription to Event Notifications via Webhook. <em>Described below.</em></td><td>&mdash;</td></tr>
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
            <tr><td><code>IsSingleAuthorization</code>*</td><td>boolean</td><td>Whether the payment requires only one authorizing party</td><td><code>true</code></td></tr>
            <tr><td><code>ExpirationDateTime</code>*</td><td>date-time</td><td>Consent expiry (ISO 8601 with timezone, max 1 year)</td><td><code>2026-05-03T15:46:00+00:00</code></td></tr>
            <tr><td><code>AuthorizationExpirationDateTime</code></td><td>date-time</td><td>Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when <code>IsSingleAuthorization</code> is <code>false</code>; SHOULD NOT be set when <code>IsSingleAuthorization</code> is <code>true</code>. MUST NOT be after <code>ExpirationDateTime</code>.</td><td><code>2026-05-03T16:00:00+00:00</code></td></tr>
            <tr><td><code>BaseConsentId</code></td><td>string (uuid)</td><td>Used when amending or renewing an existing consent</td><td>&mdash;</td></tr>
            <tr><td><code>Permissions</code></td><td>array&lt;enum&gt;</td><td>Optional access permissions granted alongside the payment consent</td><td><code>ReadAccountsBasic</code>, <code>ReadBalances</code></td></tr>
            <tr><td><code>ControlParameters</code>*</td><td>object</td><td>Payment schedule and amount. <em>Described below.</em></td><td>&mdash;</td></tr>
            <tr><td><code>PersonalIdentifiableInformation</code>*</td><td>string (JWE)</td><td>Encrypted creditor and risk data &mdash; the <code>encryptedPII</code> string from Step 1</td><td><code>eyJhbGci...</code></td></tr>
            <tr><td><code>PaymentPurposeCode</code>*</td><td>string (3 chars)</td><td>AANI payment purpose code</td><td><code>ACM</code></td></tr>
            <tr><td><code>DebtorReference</code></td><td>string</td><td>Reference shown on the debtor's statement</td><td><code>Test Purchase</code></td></tr>
            <tr><td><code>CreditorReference</code></td><td>string</td><td>Reference shown on the creditor's statement</td><td><code>Test Purchase</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">ControlParameters.ConsentSchedule.SinglePayment (Required)</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Type</code>*</td><td>enum</td><td>Must be <code>SingleInstantPayment</code></td><td><code>SingleInstantPayment</code></td></tr>
            <tr><td><code>Amount.Amount</code>*</td><td>string</td><td>Payment amount (decimal, max 2 d.p.)</td><td><code>100.00</code></td></tr>
            <tr><td><code>Amount.Currency</code>*</td><td>string</td><td>ISO 4217 currency code</td><td><code>AED</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

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
          See <a href="./user-journeys">User Experience</a> for screen mockups of the
          <strong>Consent</strong> and <strong>Authorization</strong> pages the user sees at the bank,
          including an interactive form where you can edit the consent JSON and PII and preview the
          resulting UI.
        </p>
      </EdNote>

      <EdProse>After redirecting, the user will:</EdProse>
      <EdBullets>
        <li>Authenticate with their bank.</li>
        <li>Review the payment details &mdash; amount, recipient, and purpose &mdash; on the bank's authorization screen.</li>
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
      id="step-9-encrypt-pii-payment"
      num="11"
      color="var(--at-teal)"
      eyebrow="Creating the Payment · Step 9 — Encrypt PII for Payment Initiation"
      title="Re-encrypt the creditor PII for the payment request"
      tone="cream"
    >
      <EdProse>
        Before constructing the payment request, you must encrypt a fresh PII token specifically for
        the payment. This follows the <strong>Domestic Payment PII Schema Object</strong>
        (<code>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code>) &mdash; the same
        JWS-inside-JWE pattern used in Step 1, but submitted on the payment itself rather than on the
        <code>/par</code> consent.
      </EdProse>

      <EdNote type="danger" title="Creditor must exactly match the consent PII">
        <p>
          The <code>Creditor</code> object inside the payment PII &mdash; including
          <code>CreditorAccount.SchemeName</code>, <code>CreditorAccount.Identification</code>,
          <code>CreditorAccount.Name</code>, and any <code>Creditor.Name</code> or
          <code>CreditorAgent</code> fields &mdash; <strong>must be byte-for-byte identical</strong> to
          the Creditor you encrypted in Step 1. The LFI decrypts both PII tokens and compares them; any
          discrepancy can result in rejection.
        </p>
      </EdNote>

      <EdProse>
        Build the PII object according to the schema, then encrypt it using the same
        <code>encryptPII</code> helper from Step 1:
      </EdProse>

      <EdCodeGroup :tabs="step9Tabs" />

      <EdProse>
        See
        <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/">Personal
        Identifiable Information</a> for the complete field reference, required vs optional fields, and
        creditor models for each domestic payment type.
      </EdProse>

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a> for
        details on fetching the LFI's JWKS and selecting the correct encryption key.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-10-submit-payment"
      num="12"
      color="var(--at-gold)"
      eyebrow="Creating the Payment · Step 10 — Sign and Submit the Payment Request"
      title="POST /payments — signed JWT submission"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/payments</code>
      </div>

      <EdNote type="warning" title="Submit the payment without undue delay">
        <p>
          For a <code>SingleInstantPayment</code>, the TPP MUST submit <code>POST /payments</code>
          without undue delay after completing the token exchange in
          <a href="#step-8-post-token-authorization-code">Step 8</a>. Although the access token is
          valid for 10 minutes, the User has just authorized the payment at the LFI and is waiting for
          the TPP to confirm the outcome &mdash; avoidable delay creates uncertainty about whether the
          payment has been initiated and degrades the User experience.
        </p>
        <p>
          Where practicable, prepare work that can be done before the callback (PII encryption, JWT
          signing key loading) in advance so the call to <code>POST /payments</code> can fire as soon
          as the access token is returned.
        </p>
      </EdNote>

      <EdProse>
        Include <code>x-fapi-interaction-id</code> and <code>x-idempotency-key</code>. As the customer
        is present at this point in the flow, also send <code>x-fapi-customer-ip-address</code>,
        <code>x-customer-user-agent</code> and <code>x-fapi-auth-date</code> if the customer has been
        authenticated. See <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
      </EdProse>

      <EdProse>
        The POST /payments body is sent as <code>Content-Type: application/jwt</code> &mdash; the
        payment payload is wrapped in a signed JWT (<code>AEPaymentRequestSigned</code>) using your
        private signing key. The LFI verifies the signature before processing the payment.
      </EdProse>

      <EdProse>
        Every field in the request <strong>must exactly match</strong> the corresponding value from the
        authorized consent:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Must match</th></tr>
          </thead>
          <tbody>
            <tr><td><code>ConsentId</code></td><td>The <code>ConsentId</code> from the authorized consent</td></tr>
            <tr><td><code>Instruction.Amount.Amount</code></td><td><code>consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Amount</code></td></tr>
            <tr><td><code>Instruction.Amount.Currency</code></td><td><code>consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Currency</code></td></tr>
            <tr><td><code>PaymentPurposeCode</code></td><td><code>consent.PaymentPurposeCode</code></td></tr>
            <tr><td><code>OpenFinanceBilling</code></td><td><code>consent.OpenFinanceBilling</code> (including <code>Type</code> and, if present, <code>MerchantId</code>)</td></tr>
            <tr><td><code>DebtorReference</code></td><td><code>consent.DebtorReference</code></td></tr>
            <tr><td><code>CreditorReference</code></td><td><code>consent.CreditorReference</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCodeGroup :tabs="step10Tabs" />

      <EdNote type="warning" title="Consent replay validation">
        <p>
          The payment request is validated at two points. The API Hub checks that
          <code>ConsentId</code>, <code>Instruction.Amount</code>, <code>PaymentPurposeCode</code>,
          <code>DebtorReference</code>, <code>CreditorReference</code>, and
          <code>OpenFinanceBilling</code> exactly match the authorized consent &mdash; a mismatch
          returns <code>400</code> before the request reaches the LFI. The LFI then decrypts the
          payment PII and verifies that all creditor fields match the PII from the consent. Either
          validation failure results in rejection.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">A successful POST /payments</h3>
      <EdProse>
        A <code>201 Created</code> response is returned as a signed JWT
        (<code>application/jwt</code>). The verified JWT body is a <code>message</code> envelope
        wrapping <code>Data</code> and <code>Links</code> per <code>AEPaymentIdResponseSigned</code>.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Response body — <code>Data</code></h4>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>PaymentId</code></td><td>Yes</td><td>LFI-assigned unique identifier for this payment resource (use this to poll for status)</td></tr>
            <tr><td><code>ConsentId</code></td><td>Yes</td><td>The consent this payment is bound to</td></tr>
            <tr><td><code>Status</code></td><td>Yes</td><td>Current payment status &mdash; see status lifecycle below</td></tr>
            <tr><td><code>StatusUpdateDateTime</code></td><td>Yes</td><td>ISO 8601 datetime of the last status change</td></tr>
            <tr><td><code>CreationDateTime</code></td><td>Yes</td><td>ISO 8601 datetime when the payment resource was created</td></tr>
            <tr><td><code>Instruction.Amount</code></td><td>Yes</td><td>Echoes back the amount and currency from the request</td></tr>
            <tr><td><code>PaymentPurposeCode</code></td><td>Yes</td><td>Echoes back the payment purpose code</td></tr>
            <tr><td><code>OpenFinanceBilling</code></td><td>Yes</td><td>Echoes back the billing parameters</td></tr>
            <tr><td><code>PaymentTransactionId</code></td><td>No</td><td>End-to-end transaction ID generated by the Aani payment rails once the payment is submitted for settlement. Not present at <code>Pending</code>.</td></tr>
            <tr><td><code>DebtorReference</code></td><td>No</td><td>Echoes back the debtor reference if provided</td></tr>
            <tr><td><code>RejectReasonCode</code></td><td>No</td><td>Array of <code>{ Code, Message }</code> objects &mdash; present only when <code>Status</code> is <code>Rejected</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCode :code="successResponseJson" lang="json" filename="201 Created — decoded JWT body" />

      <EdProse>
        See the
        <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payments">POST /payments</a>
        API reference for the full request and response schema.
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
