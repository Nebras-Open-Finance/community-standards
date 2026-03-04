---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Single Instant Payment - API Guide

A Single Instant Payment is a one-time, immediate domestic payment initiated by the TPP on behalf of the user. The payment amount and destination are fixed at the point of consent — the user approves once, and the payment executes immediately after authorization.

## Prerequisites

Before initiating a Single Instant Payment, ensure the following requirements are met:

- **Registered [Application](../../../../../../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **PISP role** as defined in [Roles](../../../../../../trust-framework/roles).

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

<APIFlowsSingleInstantPayment/>

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/par`

<!--@include: ../_shared/step-1-encrypt-pii.md-->

### Step 2 - Constructing Authorization Details

With the encrypted PII ready, construct the `authorization_details` of type `urn:openfinanceuae:service-initiation-consent:v2.1`. The encrypted PII is embedded as `consent.PersonalIdentifiableInformation`.

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
| `ExpirationDateTime`* | date-time | Consent expiry (ISO 8601 with timezone, max 1 year) | `2026-05-03T15:46:00+00:00` |
| `AuthorizationExpirationDateTime` | date-time | Deadline by which the user must authorize at the LFI | `2026-05-03T16:00:00+00:00` |
| `BaseConsentId` | string (uuid) | Used when amending or renewing an existing consent | — |
| `Permissions` | array\<enum\> | Optional access permissions granted alongside the payment consent | `ReadAccountsBasic`, `ReadBalances` |
| `ControlParameters`* | object | Payment schedule and amount. *Described below* | — |
| `PersonalIdentifiableInformation`* | string (JWE) | Encrypted creditor and risk data — the `encryptedPII` string from Step 1 | `eyJhbGci...` |
| `PaymentPurposeCode`* | string (3 chars) | AANI payment purpose code | `ACM` |
| `DebtorReference` | string | Reference shown on the debtor's statement | `Test Purchase` |
| `CreditorReference` | string | Reference shown on the creditor's statement | `Test Purchase` |

#### ControlParameters.ConsentSchedule.SinglePayment (Required)

| Field | Type | Description | Example |
|-------|------|------------|---------|
| `Type`* | enum | Must be `SingleInstantPayment` | `SingleInstantPayment` |
| `Amount.Amount`* | string | Payment amount (decimal, max 2 d.p.) | `100.00` |
| `Amount.Currency`* | string | ISO 4217 currency code | `AED` |


#### Example request

```json
"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2026-05-03T15:46:00+00:00",

      // Deadline for the user to authorize at the bank (optional)
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
```

### Step 3 - Constructing the Request JWT

With your `authorization_details` ready, generate a PKCE code pair then use the [`buildRequestJWT()`](/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt) helper, passing `payments openid` as the scope.

::: warning Scope change required when using Permissions
If your consent includes `ReadAccountsBasic`, `ReadAccountsDetail`, or `ReadBalances`, you must change the scope to `accounts payments openid`. Without the `accounts` scope the issued token will not grant access to the account endpoints. See [Account Permissions in a Payment Consent](/knowledge-base/articles/payment-account-permissions).
:::

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
```

:::

::: tip Store the code_verifier
Save `codeVerifier` in your server-side session or an `httpOnly` cookie — you will need it in [Step 8](#step-8-post-token-authorization-code) to exchange the authorization code for tokens.
:::

See [Preparing the Request JWT](/tech/tpp-standards/security/fapi/request-jwt) for the full JWT claim reference and PKCE helpers.

<!--@include: ../_shared/step-4-client-assertion.md-->

<!--@include: ../_shared/step-5-par-request.md-->

## Redirecting the User to the Bank

### Step 6 - Building the Authorization URL

The `authorization_endpoint` is found in the LFI's `.well-known/openid-configuration` — not constructed from the issuer URL directly.

<!--@include: ../_shared/step-6-redirect-code.md-->

::: tip User Experience
See [User Experience](./user-journeys) for screen mockups of the **Consent** and **Authorization** pages the user sees at the bank, including an interactive form where you can edit the consent JSON and PII and preview the resulting UI.
:::

After redirecting, the user will:

1. Authenticate with their bank
2. Review the payment details — amount, recipient, and purpose — on the bank's authorization screen
3. Approve or decline

## Handling the Callback

<!--@include: ../_shared/step-7-callback.md-->

## Exchanging the Code for Tokens

<!--@include: ../_shared/step-8-token-exchange.md-->

## Creating the Payment

### Step 9 - POST /payments

With a valid access token, submit the payment instruction to the LFI. The request **replays the same values** as those consented to in Step 2 — the `ConsentId` ties the payment to the authorized consent, and the LFI will reject requests where the details do not match.

::: code-group

```typescript [Node.js]
const LFI_API_BASE = process.env.LFI_API_BASE_URL!

const paymentResponse = await fetch(`${LFI_API_BASE}/open-finance/v2.1/payments`, {
  method: 'POST',
  headers: {
    Authorization:  `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    Data: {
      ConsentId: consentId,               // same ConsentId from Step 2
      Instruction: {
        Amount: {
          Amount:   '100.00',             // same amount as ControlParameters.SinglePayment
          Currency: 'AED',
        },
      },
      PersonalIdentifiableInformation: encryptedPII,  // same encrypted PII from Step 1
      PaymentPurposeCode: 'ACM',          // same as consent
      DebtorReference:    'Invoice 1234', // same as consent
      CreditorReference:  'Invoice 1234', // same as consent
      OpenFinanceBilling: {
        UserType: 'Retail',
        Purpose:  'PersonalTransfer',
      },
    },
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { Data: { PaymentId, Status } } = await paymentResponse.json()
// Store PaymentId to poll for status
```

```python [Python]
payment_response = httpx.post(
    f"{LFI_API_BASE}/open-finance/v2.1/payments",
    headers={
        "Authorization":  f"Bearer {access_token}",
        "Content-Type":   "application/json",
    },
    json={
        "Data": {
            "ConsentId":   consent_id,          # same ConsentId from Step 2
            "Instruction": {
                "Amount": {
                    "Amount":   "100.00",       # same amount as SinglePayment
                    "Currency": "AED",
                }
            },
            "PersonalIdentifiableInformation": encrypted_pii,  # same from Step 1
            "PaymentPurposeCode": "ACM",        # same as consent
            "DebtorReference":    "Invoice 1234",
            "CreditorReference":  "Invoice 1234",
            "OpenFinanceBilling": {
                "UserType": "Retail",
                "Purpose":  "PersonalTransfer",
            },
        }
    },
    # cert=("transport.crt", "transport.key"),
)

data       = payment_response.json()["Data"]
payment_id = data["PaymentId"]
status     = data["Status"]
```

:::

::: warning Consent replay validation
The LFI validates that the `Instruction.Amount` and all other fields in the payment request exactly match the values in the authorized consent. Any mismatch will result in a rejection. Use the same `ConsentId`, amount, currency, purpose code, and references that were submitted in Step 2.
:::

The response contains:

| Field | Description | Example |
|-------|-------------|---------|
| `PaymentId` | Unique LFI-assigned identifier for this payment | `pay-abc123` |
| `Status` | Current payment status | `Pending`, `AcceptedSettlementInProcess` |
| `ConsentId` | The consent this payment is bound to | `b8f42378-...` |

See the [POST /payments](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments) API reference for the full request and response schema.

## Checking Payment Status

### Step 10 - GET /payments/{PaymentId}

Poll the payment status using the `PaymentId` returned in Step 9:

::: code-group

```typescript [Node.js]
const statusResponse = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/payments/${paymentId}`,
  {
    headers: { Authorization: `Bearer ${access_token}` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, StatusUpdateDateTime } } = await statusResponse.json()
```

```python [Python]
status_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/payments/{payment_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data                   = status_response.json()["Data"]
status                 = data["Status"]
status_update_datetime = data["StatusUpdateDateTime"]
```

:::

| Status | Description |
|--------|-------------|
| `Pending` | Payment received by LFI, awaiting processing |
| `AcceptedSettlementInProcess` | Payment accepted and settlement is in progress |
| `AcceptedSettlementCompleted` | Payment settled successfully |
| `Rejected` | Payment rejected by the LFI or payment rail |

See the [GET /payments/{PaymentId}](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId) API reference for the full response schema and all possible status values.
