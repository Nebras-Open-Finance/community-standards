---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Variable On-Demand — API Guide

A Variable On-Demand consent authorises a TPP to initiate **multiple payments** at variable amounts over the lifetime of the consent. The user authorises once — setting a ceiling on individual payments and optional period-based limits — and the TPP can then submit individual payments on-demand without requiring re-authorisation for each one.

Common use cases include subscription billing with variable charges, metered service payments, and TPP-managed savings top-ups.

## Prerequisites

Before initiating a Variable On-Demand payment, ensure the following requirements are met:

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

<APIFlowViewer title="Variable On-Demand API Flow">
  <APIFlowsOnDemand/>
</APIFlowViewer>

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/par`

<!--@include: ../../_shared/step-1-encrypt-pii-variable.md-->

### Step 2 - Constructing Authorization Details

With the encrypted PII ready, construct the `authorization_details` of type `urn:openfinanceuae:service-initiation-consent:v2.1`. The critical difference from Single Instant Payment is that `ControlParameters` uses `MultiPayment` with `Type: "VariableOnDemand"` — no fixed amount is set at consent time. Instead, limits are defined via cumulative caps and periodic controls.

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

#### ControlParameters — Variable On-Demand

`ControlParameters.ConsentSchedule.MultiPayment` carries the control definition. Set `Type` to `"VariableOnDemand"`. The amount is **not fixed at consent time** — each `POST /payments` call specifies its own amount, subject to the controls below.

**Cumulative Control Parameters** — apply across the entire consent lifetime:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `MaximumCumulativeValueOfPayments.Amount` | No | Maximum total value of all payments over the consent lifetime | `10000.00` |
| `MaximumCumulativeValueOfPayments.Currency` | No | ISO 4217 currency code | `AED` |
| `MaximumCumulativeNumberOfPayments` | No | Maximum total number of payments over the consent lifetime | `50` |

**Periodic Control Parameters** — apply per recurring period, defined inside `PeriodicSchedule`:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `PeriodicSchedule.PeriodType` | Yes | The period length: `Day`, `Week`, `Month`, or `Year` | `Month` |
| `PeriodicSchedule.PeriodStartDate` | Yes | The date from which the period starts. For `Day` and `Year`, this is when payments may begin | `2026-03-01` |
| `PeriodicSchedule.Controls.MaximumIndividualAmount.Amount` | At least one of three | Maximum amount permitted per individual payment | `500.00` |
| `PeriodicSchedule.Controls.MaximumIndividualAmount.Currency` | At least one of three | ISO 4217 currency code | `AED` |
| `PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Amount` | No | Maximum cumulative value of payments within the period. Must be greater than `MaximumIndividualAmount` when both are provided | `2000.00` |
| `PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Currency` | No | ISO 4217 currency code | `AED` |
| `PeriodicSchedule.Controls.MaximumCumulativeNumberOfPaymentsPerPeriod` | No | Maximum number of payments within the period | `5` |

::: warning At least one periodic control must be provided
At least one of `MaximumIndividualAmount`, `MaximumCumulativeValueOfPaymentsPerPeriod`, or `MaximumCumulativeNumberOfPaymentsPerPeriod` must be present inside `PeriodicSchedule.Controls`. The cumulative and lifetime caps are independent of each other.
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
            "Type": "VariableOnDemand",

            // Optional consent-lifetime cumulative caps:
            // "MaximumCumulativeValueOfPayments": { "Amount": "10000.00", "Currency": "AED" },
            // "MaximumCumulativeNumberOfPayments": 50,

            "PeriodicSchedule": {
              "PeriodType": "Month",
              "PeriodStartDate": "2026-03-01",
              "Controls": {
                // At least ONE of the following three must be provided:
                "MaximumIndividualAmount": { "Amount": "500.00", "Currency": "AED" }
                // Optional per-period caps:
                // "MaximumCumulativeValueOfPaymentsPerPeriod": { "Amount": "2000.00", "Currency": "AED" },
                // "MaximumCumulativeNumberOfPaymentsPerPeriod": 5
              }
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
            Type: 'VariableOnDemand',
            PeriodicSchedule: {
              PeriodType: 'Month',
              PeriodStartDate: '2026-03-01',
              Controls: {
                MaximumIndividualAmount: { Amount: '500.00', Currency: 'AED' },
                // MaximumCumulativeValueOfPaymentsPerPeriod: { Amount: '2000.00', Currency: 'AED' },
                // MaximumCumulativeNumberOfPaymentsPerPeriod: 5,
              },
            },
            // MaximumCumulativeValueOfPayments: { Amount: '10000.00', Currency: 'AED' },
            // MaximumCumulativeNumberOfPayments: 50,
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
                        "Type": "VariableOnDemand",
                        "PeriodicSchedule": {
                            "PeriodType": "Month",
                            "PeriodStartDate": "2026-03-01",
                            "Controls": {
                                "MaximumIndividualAmount": {"Amount": "500.00", "Currency": "AED"},
                                # "MaximumCumulativeValueOfPaymentsPerPeriod": {"Amount": "2000.00", "Currency": "AED"},
                                # "MaximumCumulativeNumberOfPaymentsPerPeriod": 5,
                            },
                        },
                        # "MaximumCumulativeValueOfPayments": {"Amount": "10000.00", "Currency": "AED"},
                        # "MaximumCumulativeNumberOfPayments": 50,
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
- The active periodic controls (e.g. "up to AED 500.00 per payment" if `MaximumIndividualAmount` is set, per-period value and count limits if set)
- Any lifetime cumulative caps
- The consent expiry date

::: tip User Experience
See [User Experience](./user-journeys) for screen mockups of the Variable On-Demand **Consent** and **Authorization** pages the user sees at the bank.
:::

## Handling the Callback

<!--@include: ../../_shared/step-7-callback.md-->

## Exchanging the Code for Tokens

<!--@include: ../../_shared/step-8-token-exchange.md-->

## Initiating Payments On-Demand

<!--@include: ../../_shared/step-encrypt-pii-multi-payment-variable.md-->

### Step 9 - POST /payments

Unlike Single Instant Payment, this step can be called **multiple times** under the same consent. Each call specifies the actual amount for that payment — it must satisfy whichever control parameters exist on the consent (`MaximumIndividualAmount`, `MaximumCumulativeValueOfPaymentsPerPeriod`, and/or `MaximumCumulativeNumberOfPaymentsPerPeriod`), as well as any lifetime cumulative caps.

::: info Fields that can vary per payment
Unlike Single Instant Payment, multi-payment consents do not require `PaymentPurposeCode`, `DebtorReference`, `CreditorReference`, or `OpenFinanceBilling` to match the consent exactly. Only `ConsentId` must match the authorized consent. `Instruction.Amount` must be within the parameters the consent allows for this payment type.
:::


::: code-group

```typescript [Node.js]
import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

async function initiateVariablePayment(
  accessToken: string,
  consentId: string,
  amount: string,        // must satisfy the control parameters on the consent
  paymentEncryptedPII: string,  // from the PII step above
  idempotencyKey: string,
) {
  const paymentPayload = {
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
      Authorization:       `Bearer ${accessToken}`,
      'Content-Type':      'application/jwt',
      'x-consent-id':      consentId,
      'x-idempotency-key': idempotencyKey,
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
```

```python [Python]
import time
from jose import jwt as jose_jwt

def initiate_variable_payment(
    access_token: str,
    consent_id: str,
    amount: str,          # must satisfy the control parameters on the consent
    payment_encrypted_pii: str,  # from the PII step above
    idempotency_key: str,
) -> dict:
    payment_payload = {
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
            "Authorization":     f"Bearer {access_token}",
            "Content-Type":      "application/jwt",
            "x-consent-id":      consent_id,
            "x-idempotency-key": idempotency_key,
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
```

:::

::: warning Amount validation
The API Hub will reject a payment if `Instruction.Amount` violates any control parameter present on the consent — whether `MaximumIndividualAmount`, `MaximumCumulativeValueOfPaymentsPerPeriod`, `MaximumCumulativeNumberOfPaymentsPerPeriod`, or any lifetime cumulative cap.
:::

<!--@include: ../../_shared/step-token-refresh.md-->
<!--@include: ../../_shared/step-payment-response.md-->

::: info Consent stays Authorized
After each successful payment, the consent remains in the `Authorized` state (unless cumulative caps are reached or the consent expires). You do **not** need to re-initiate the authorization flow.
:::