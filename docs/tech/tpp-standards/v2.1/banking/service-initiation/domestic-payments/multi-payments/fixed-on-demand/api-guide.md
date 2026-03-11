---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Fixed On-Demand — API Guide

A Fixed On-Demand consent authorises a TPP to initiate **multiple payments** at a **fixed amount** over the lifetime of the consent. The user authorises once — approving a specific per-payment amount and periodic limits — and the TPP can then submit individual payments on-demand without requiring re-authorisation for each one.

Common use cases include fixed-amount subscription billing, regular instalment collection, and scheduled membership fees where the charge is always the same.

## Prerequisites

Before initiating a Fixed On-Demand payment, ensure the following requirements are met:

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

<APIFlowViewer title="Fixed On-Demand API Flow">
  <APIFlowsOnDemand/>
</APIFlowViewer>

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/par`

<!--@include: ../../_shared/step-1-encrypt-pii.md-->

### Step 2 - Constructing Authorization Details

With the encrypted PII ready, construct the `authorization_details` of type `urn:openfinanceuae:service-initiation-consent:v2.1`. The key difference from Variable On-Demand is that `PeriodicSchedule.Amount` is a **mandatory fixed amount** — every payment under this consent must be for exactly this value.

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

#### ControlParameters — Fixed On-Demand

`ControlParameters.ConsentSchedule.MultiPayment` carries the control definition. Set `Type` to `"FixedOnDemand"`. The payment amount **is fixed at consent time** via `PeriodicSchedule.Amount` — every `POST /payments` call under this consent must use exactly this amount.

**Cumulative Control Parameters** — apply across the entire consent lifetime:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `MaximumCumulativeValueOfPayments.Amount` | No | Maximum total value of all payments over the consent lifetime | `10000.00` |
| `MaximumCumulativeValueOfPayments.Currency` | No | ISO 4217 currency code | `AED` |
| `MaximumCumulativeNumberOfPayments` | No | Maximum total number of payments over the consent lifetime | `24` |

**Periodic Control Parameters** — apply per recurring period, defined inside `PeriodicSchedule`:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `PeriodicSchedule.PeriodType` | Yes | The period length: `Day`, `Week`, `Month`, or `Year` | `Month` |
| `PeriodicSchedule.PeriodStartDate` | Yes | The date from which the period starts. For `Day` and `Year`, this is when payments may begin | `2026-03-01` |
| `PeriodicSchedule.Amount.Amount` | Yes | The **fixed** payment amount. Every payment submitted under this consent must be for exactly this value | `150.00` |
| `PeriodicSchedule.Amount.Currency` | Yes | ISO 4217 currency code | `AED` |
| `PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Amount` | At least one of two | Maximum cumulative value of payments within the period. Must be greater than `Amount` | `450.00` |
| `PeriodicSchedule.Controls.MaximumCumulativeValueOfPaymentsPerPeriod.Currency` | At least one of two | ISO 4217 currency code | `AED` |
| `PeriodicSchedule.Controls.MaximumCumulativeNumberOfPaymentsPerPeriod` | At least one of two | Maximum number of payments within the period | `3` |

::: warning At least one periodic control must be provided
At least one of `MaximumCumulativeValueOfPaymentsPerPeriod` or `MaximumCumulativeNumberOfPaymentsPerPeriod` must be present inside `PeriodicSchedule.Controls`. Both may be provided. When `MaximumCumulativeValueOfPaymentsPerPeriod` is provided, it must be greater than `Amount`.
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
            "Type": "FixedOnDemand",

            // Optional consent-lifetime cumulative caps:
            // "MaximumCumulativeValueOfPayments": { "Amount": "10000.00", "Currency": "AED" },
            // "MaximumCumulativeNumberOfPayments": 24,

            "PeriodicSchedule": {
              "PeriodType": "Month",
              "PeriodStartDate": "2026-03-01",
              "Amount": { "Amount": "150.00", "Currency": "AED" },
              "Controls": {
                // At least ONE of the following two must be provided:
                "MaximumCumulativeNumberOfPaymentsPerPeriod": 3
                // "MaximumCumulativeValueOfPaymentsPerPeriod": { "Amount": "450.00", "Currency": "AED" }
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
            Type: 'FixedOnDemand',
            PeriodicSchedule: {
              PeriodType: 'Month',
              PeriodStartDate: '2026-03-01',
              Amount: { Amount: '150.00', Currency: 'AED' },
              Controls: {
                MaximumCumulativeNumberOfPaymentsPerPeriod: 3,
                // MaximumCumulativeValueOfPaymentsPerPeriod: { Amount: '450.00', Currency: 'AED' },
              },
            },
            // MaximumCumulativeValueOfPayments: { Amount: '10000.00', Currency: 'AED' },
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
                        "Type": "FixedOnDemand",
                        "PeriodicSchedule": {
                            "PeriodType": "Month",
                            "PeriodStartDate": "2026-03-01",
                            "Amount": {"Amount": "150.00", "Currency": "AED"},
                            "Controls": {
                                "MaximumCumulativeNumberOfPaymentsPerPeriod": 3,
                                # "MaximumCumulativeValueOfPaymentsPerPeriod": {"Amount": "450.00", "Currency": "AED"},
                            },
                        },
                        # "MaximumCumulativeValueOfPayments": {"Amount": "10000.00", "Currency": "AED"},
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
- Any periodic caps (per-period count and value limits)
- Any lifetime cumulative caps
- The consent expiry date

::: tip User Experience
See [User Experience](./user-journeys) for screen mockups of the Fixed On-Demand **Consent** and **Authorization** pages the user sees at the bank.
:::

## Handling the Callback

<!--@include: ../../_shared/step-7-callback.md-->

## Exchanging the Code for Tokens

<!--@include: ../../_shared/step-8-token-exchange.md-->

## Initiating Payments On-Demand

### Step 9 - POST /payments

This step can be called **multiple times** under the same consent. Unlike Variable On-Demand, the `Instruction.Amount` must exactly match the fixed `Amount` defined in `PeriodicSchedule` — the LFI will reject any payment where the amount does not match.

::: info Consent stays Authorized
After each successful payment, the consent remains in the `Authorized` state (unless cumulative caps are reached or the consent expires). You do **not** need to re-initiate the authorization flow.
:::

::: code-group

```typescript [Node.js]
const LFI_API_BASE = process.env.LFI_API_BASE_URL!

async function initiateFixedPayment(
  accessToken: string,
  consentId: string,
  encryptedPII: string,  // same encrypted PII from Step 1
) {
  const paymentResponse = await fetch(`${LFI_API_BASE}/open-finance/v2.1/payments`, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Data: {
        ConsentId: consentId,
        Instruction: {
          Amount: {
            Amount:   '150.00',   // must exactly match PeriodicSchedule.Amount
            Currency: 'AED',
          },
        },
        PersonalIdentifiableInformation: encryptedPII,
        PaymentPurposeCode: 'ACM',
        DebtorReference:    'Subscription',
        CreditorReference:  'Subscription',
        OpenFinanceBilling: {
          UserType: 'Retail',
          Purpose:  'PersonalTransfer',
        },
      },
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })

  const { Data: { PaymentId, Status } } = await paymentResponse.json()
  return { PaymentId, Status }
}

// First payment
const { PaymentId: pay1 } = await initiateFixedPayment(access_token, consentId, encryptedPII)

// Second payment (days/weeks later using a refreshed access token)
const { PaymentId: pay2 } = await initiateFixedPayment(refreshedToken, consentId, encryptedPII)
```

```python [Python]
def initiate_fixed_payment(
    access_token: str,
    consent_id: str,
    encrypted_pii: str,   # same encrypted PII from Step 1
) -> dict:
    response = httpx.post(
        f"{LFI_API_BASE}/open-finance/v2.1/payments",
        headers={
            "Authorization":  f"Bearer {access_token}",
            "Content-Type":   "application/json",
        },
        json={
            "Data": {
                "ConsentId":   consent_id,
                "Instruction": {
                    "Amount": {
                        "Amount":   "150.00",  # must exactly match PeriodicSchedule.Amount
                        "Currency": "AED",
                    }
                },
                "PersonalIdentifiableInformation": encrypted_pii,
                "PaymentPurposeCode": "ACM",
                "DebtorReference":    "Subscription",
                "CreditorReference":  "Subscription",
                "OpenFinanceBilling": {
                    "UserType": "Retail",
                    "Purpose":  "PersonalTransfer",
                },
            }
        },
        # cert=("transport.crt", "transport.key"),
    )
    data = response.json()["Data"]
    return {"payment_id": data["PaymentId"], "status": data["Status"]}


# First payment
pay1 = initiate_fixed_payment(access_token, consent_id, encrypted_pii)

# Second payment (days/weeks later using a refreshed access token)
pay2 = initiate_fixed_payment(refreshed_token, consent_id, encrypted_pii)
```

:::

::: warning Fixed amount enforcement
The LFI will reject a payment if `Instruction.Amount` does not exactly match the `PeriodicSchedule.Amount` from the consent, or if any periodic or lifetime cumulative cap has already been reached.
:::

<!--@include: ../../_shared/step-token-refresh.md-->

