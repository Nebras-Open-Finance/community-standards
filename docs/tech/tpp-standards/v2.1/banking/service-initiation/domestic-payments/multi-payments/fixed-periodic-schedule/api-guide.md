---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Fixed Periodic Schedule — API Guide

A Fixed Periodic Schedule consent authorises a TPP to initiate **one payment per period** at a **fixed amount** over the lifetime of the consent. The user authorises once — approving a specific payment amount and the recurring period — and the TPP submits one payment per period without requiring re-authorisation each time.

Common use cases include fixed monthly subscriptions, regular instalment collection, and recurring membership fees where the charge is always the same and payments follow a predictable calendar.

## Prerequisites

Before initiating a Fixed Periodic Schedule payment, ensure the following requirements are met:

- **Registered [Application](../../../../../../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **BSIP role** as defined in [Roles](../../../../../../trust-framework/roles).

- **Valid [Transport Certificate](../../../../../../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication** with participating LFIs.

- **Valid [Signing Certificate](../../../../../../trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions.

- **Registration with the relevant [Authorisation Server](../../../../../../registration/api-guide)**
  The application must be registered with the Authorisation Server of the LFI with which you intend to initiate payments.

- **Understanding of the [FAPI Security Profile](../../../../../../security/fapi)** and **[Tokens & Assertions](../../../../../../security/tokens)**
  You should understand how request object signing, client authentication, and access token validation underpin secure API interactions.

- **Understanding of [Message Encryption](../../../../../../security/fapi/message-encryption)**
  PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS.

## API Sequence Flow

<APIFlowViewer title="Fixed Periodic Schedule API Flow">
  <APIFlowsPeriodicSchedule/>
</APIFlowViewer>

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/par`

<!--@include: ../../_shared/step-1-encrypt-pii.md-->

### Step 2 - Constructing Authorization Details

With the encrypted PII ready, construct the `authorization_details` of type `urn:openfinanceuae:service-initiation-consent:v2.1`. Set `Type` to `"FixedPeriodicSchedule"`. The payment amount **is fixed at consent time** via `PeriodicSchedule.Amount` — every `POST /payments` call under this consent must use exactly this amount, and only one payment may be submitted per period.

#### authorization_details

| Field | Type | Description | Example |
|-------|------|------------|---------|
| `type`* | enum | Must be `urn:openfinanceuae:service-initiation-consent:v2.1` | `urn:openfinanceuae:service-initiation-consent:v2.1` |
| `consent`* | object | Consent properties agreed by the User with the TPP. *Described below* | — |
| `subscription` | object | Optional subscription to Event Notifications via Webhook. *Described below* | — |

#### consent (Required) | `authorization_details.consent`

| Field | Type | Description | Example |
|-------|------|------------|---------|
| `ConsentId`* | string (uuid) | Unique ID assigned by the TPP (1–128 chars) | `b8f42378-10ac-46a1-8d20-4e020484216d` |
| `IsSingleAuthorization`* | boolean | Whether the payment requires only one authorizing party | `true` |
| `ExpirationDateTime`* | date-time | Consent expiry (ISO 8601 with timezone, max 1 year) | `2027-03-02T00:00:00+00:00` |
| `AuthorizationExpirationDateTime` | date-time | Deadline by which the user must authorize at the LFI | `2026-03-03T10:00:00+00:00` |
| `BaseConsentId` | string (uuid) | Links to prior consent if renewing — see [Base Consent ID](/knowledge-base/articles/base-consent-id) | — |
| `Permissions` | array\<enum\> | Optional access permissions granted alongside the payment consent | `ReadAccountsBasic`, `ReadBalances` |
| `ControlParameters`* | object | Payment controls — **see below** | — |
| `PersonalIdentifiableInformation`* | string (JWE) | Encrypted creditor and risk data — the `encryptedPII` string from Step 1 | `eyJhbGci...` |
| `PaymentPurposeCode`* | string (3 chars) | AANI payment purpose code | `ACM` |
| `DebtorReference` | string | Reference shown on the debtor's statement | `Subscription` |
| `CreditorReference` | string | Reference shown on the creditor's statement | `Subscription` |

#### ControlParameters — Fixed Periodic Schedule

`ControlParameters.ConsentSchedule.MultiPayment` carries the control definition. Set `Type` to `"FixedPeriodicSchedule"`. Only **one payment is permitted per period**. There is no `Controls` block — the period itself acts as the limiting boundary.

**Cumulative Control Parameters** — apply across the entire consent lifetime:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `MaximumCumulativeValueOfPayments.Amount` | No | Maximum total value of all payments over the consent lifetime | `3600.00` |
| `MaximumCumulativeValueOfPayments.Currency` | No | ISO 4217 currency code | `AED` |
| `MaximumCumulativeNumberOfPayments` | No | Maximum total number of payments over the consent lifetime | `24` |

**Periodic Schedule Parameters** — define the fixed amount and period, set directly inside `PeriodicSchedule`:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `PeriodicSchedule.PeriodType` | Yes | The period length: `Day`, `Week`, `Month`, or `Year` | `Month` |
| `PeriodicSchedule.PeriodStartDate` | Yes | The date from which each period is counted | `2026-03-01` |
| `PeriodicSchedule.Amount.Amount` | Yes | The **fixed** payment amount. Every payment submitted under this consent must be for exactly this value | `150.00` |
| `PeriodicSchedule.Amount.Currency` | Yes | ISO 4217 currency code | `AED` |

::: info One payment per period
Only one payment may be submitted per period. The API Hub will reject a second `POST /payments` call within the same period, even if the amount matches.
:::

#### Example request

```json
"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2027-03-02T00:00:00+00:00",

      // Deadline for the user to authorize at the bank (optional)
      // "AuthorizationExpirationDateTime": "2026-03-03T10:00:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances"
      ],

      "ControlParameters": {
        "ConsentSchedule": {
          "MultiPayment": {
            "Type": "FixedPeriodicSchedule",

            // Optional consent-lifetime cumulative caps:
            // "MaximumCumulativeValueOfPayments": { "Amount": "3600.00", "Currency": "AED" },
            // "MaximumCumulativeNumberOfPayments": 24,

            "PeriodicSchedule": {
              "PeriodType": "Month",
              "PeriodStartDate": "2026-03-01",
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
```

### Step 3 - Constructing the Request JWT

<!--@include: ../../_shared/step-3-request-jwt-scope.md-->


::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { generateCodeVerifier, deriveCodeChallenge } from './pkce'
import { buildRequestJWT } from './request-jwt'

const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:service-initiation-consent:v2.1',
    consent: {
      ConsentId: crypto.randomUUID(),
      IsSingleAuthorization: true,
      ExpirationDateTime: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      Permissions: ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances'],
      ControlParameters: {
        ConsentSchedule: {
          MultiPayment: {
            Type: 'FixedPeriodicSchedule',
            PeriodicSchedule: {
              PeriodType: 'Month',
              PeriodStartDate: '2026-03-01',
              Amount: { Amount: '150.00', Currency: 'AED' },
            },
            // MaximumCumulativeValueOfPayments: { Amount: '3600.00', Currency: 'AED' },
            // MaximumCumulativeNumberOfPayments: 24,
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
```

```python [Python]
import uuid
from datetime import datetime, timezone, timedelta
from pkce import generate_code_verifier, derive_code_challenge
from request_jwt import build_request_jwt

code_verifier  = generate_code_verifier()
code_challenge = derive_code_challenge(code_verifier)

authorization_details = [
    {
        "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
        "consent": {
            "ConsentId": str(uuid.uuid4()),
            "IsSingleAuthorization": True,
            "ExpirationDateTime": (datetime.now(timezone.utc) + timedelta(days=365)).isoformat(),
            "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances"],
            "ControlParameters": {
                "ConsentSchedule": {
                    "MultiPayment": {
                        "Type": "FixedPeriodicSchedule",
                        "PeriodicSchedule": {
                            "PeriodType": "Month",
                            "PeriodStartDate": "2026-03-01",
                            "Amount": {"Amount": "150.00", "Currency": "AED"},
                        },
                        # "MaximumCumulativeValueOfPayments": {"Amount": "3600.00", "Currency": "AED"},
                        # "MaximumCumulativeNumberOfPayments": 24,
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
```

:::

::: tip Store the code_verifier
Save `codeVerifier` in your server-side session or an `httpOnly` cookie — you will need it in [Step 8](#step-8-post-token-authorization-code) to exchange the authorization code for tokens.
:::

See [Preparing the Request JWT](/tech/tpp-standards/security/fapi/request-jwt) for the full JWT claim reference and PKCE helpers.

<!--@include: ../../_shared/step-4-client-assertion.md-->

<!--@include: ../../_shared/step-5-par-request.md-->

## Redirecting the User to the Bank

### Step 6 - Building the Authorization URL

The `authorization_endpoint` is found in the LFI's `.well-known/openid-configuration` — not constructed from the issuer URL directly.

<!--@include: ../../_shared/step-6-redirect-code.md-->

After redirecting, the user will see the bank's authorization screen showing:

- The TPP name and purpose
- The fixed payment `Amount` (e.g. "AED 150.00 per payment")
- The period type and start date (e.g. "Monthly from 1 March 2026")
- Any lifetime cumulative caps
- The consent expiry date

::: tip User Experience
See [User Experience](./user-journeys) for screen mockups of the Fixed Periodic Schedule **Consent** and **Authorization** pages the user sees at the bank.
:::

## Handling the Callback

<!--@include: ../../_shared/step-7-callback.md-->

## Exchanging the Code for Tokens

<!--@include: ../../_shared/step-8-token-exchange.md-->

## Initiating Payments

<!--@include: ../../_shared/step-encrypt-pii-multi-payment.md-->

### Step 9 - POST /payments

Include `x-fapi-interaction-id` and `x-idempotency-key`. If the customer is present at this point in the flow, also send `x-fapi-customer-ip-address`, `x-customer-user-agent` and `x-fapi-auth-date` if the customer has been authenticated. See [Request Headers](/tech/tpp-standards/security/request-headers).

Submit one payment per period under this consent. The `Instruction.Amount` must exactly match the fixed `Amount` defined in `PeriodicSchedule` — the API Hub will reject any payment where the amount does not match, and will reject a second payment submitted within the same period.

::: info Fields that can vary per payment
Unlike Single Instant Payment, multi-payment consents do not require `PaymentPurposeCode`, `DebtorReference`, `CreditorReference`, or `OpenFinanceBilling` to match the consent exactly. Only `ConsentId` must match the authorized consent. `Instruction.Amount` must be within the parameters the consent allows for this payment type.
:::


::: code-group

```typescript [Node.js]
import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

async function initiateFixedPeriodicPayment(
  accessToken: string,
  consentId: string,
  paymentEncryptedPII: string,  // from the PII step above
  idempotencyKey: string,
) {
  const paymentPayload = {
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
  }

  const signedPayment = await new SignJWT(paymentPayload)
    .setProtectedHeader({ alg: 'PS256', kid: SIGNING_KEY_ID })
    .setIssuedAt()
    .setIssuer(CLIENT_ID)
    .setExpirationTime('5m')
    .sign(signingKey)

  const paymentResponse = await fetch(`${LFI_API_BASE}/open-finance/v2.1/payments`, {
    method: 'POST',
    headers: {
      Authorization:                `Bearer ${accessToken}`,
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
```

```python [Python]
import time
from jose import jwt as jose_jwt

def initiate_fixed_periodic_payment(
    access_token: str,
    consent_id: str,
    payment_encrypted_pii: str,  # from the PII step above
    idempotency_key: str,
) -> dict:
    payment_payload = {
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

    now = int(time.time())
    signed_payment = jose_jwt.encode(
        {**payment_payload, "iss": CLIENT_ID, "iat": now, "exp": now + 300},
        signing_key,
        algorithm="PS256",
        headers={"kid": SIGNING_KEY_ID},
    )

    response = httpx.post(
        f"{LFI_API_BASE}/open-finance/v2.1/payments",
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
```

:::

::: warning Fixed amount and period enforcement
The API Hub will reject a payment if `Instruction.Amount` does not exactly match `PeriodicSchedule.Amount`, if a payment has already been submitted in the current period, or if any lifetime cumulative cap has been reached.
:::

<!--@include: ../../_shared/step-token-refresh.md-->
<!--@include: ../../_shared/step-payment-response.md-->

::: info Consent stays Authorized
After each successful payment, the consent remains in the `Authorized` state until the next period begins (unless lifetime cumulative caps are reached or the consent expires). You do **not** need to re-initiate the authorization flow.
:::
