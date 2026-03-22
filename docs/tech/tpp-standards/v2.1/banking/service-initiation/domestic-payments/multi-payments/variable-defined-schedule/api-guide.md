---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Variable Defined Schedule — API Guide

A Variable Defined Schedule consent authorises a TPP to initiate payments on a **pre-agreed set of specific dates**, each with its own **maximum amount ceiling**. Rather than a recurring period, the TPP supplies an explicit schedule at consent time — listing each `PaymentExecutionDate` alongside the maximum amount permitted on that date. The user authorises once, approving the full schedule, and the TPP submits one payment per scheduled date without requiring re-authorisation.

Common use cases include milestone-based project billing, staged instalment plans, and seasonal payment programmes where both the dates and indicative amounts are known upfront but the final charge may vary per date.

## Prerequisites

Before initiating a Variable Defined Schedule payment, ensure the following requirements are met:

- **Registered [Application](../../../../../../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **BSIP role** as defined in [Roles](../../../../../../trust-framework/roles).

- **Valid [Transport Certificate](../../../../../../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication**.

- **Valid [Signing Certificate](../../../../../../trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions.

- **Registration with the relevant [Authorisation Server](../../../../../../registration/api-guide)**
  The application must be registered with the Authorisation Server of the LFI with which you intend to initiate payments.

- **Understanding of the [FAPI Security Profile](../../../../../../security/fapi)** and **[Tokens & Assertions](../../../../../../security/tokens)**
  You should understand how request object signing, client authentication, and access token validation underpin secure API interactions.

- **Understanding of [Message Encryption](../../../../../../security/fapi/message-encryption)**
  PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS.

## API Sequence Flow

<APIFlowViewer title="Variable Defined Schedule API Flow">
  <APIFlowsDefinedSchedule/>
</APIFlowViewer>

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/par`

<!--@include: ../../_shared/step-1-encrypt-pii.md-->

### Step 2 - Constructing Authorization Details

With the encrypted PII ready, construct the `authorization_details` of type `urn:openfinanceuae:service-initiation-consent:v2.1`. Set `Type` to `"VariableDefinedSchedule"`. Unlike a Periodic Schedule, there is no recurring period — instead, the `Schedule` array lists each specific `PaymentExecutionDate` and the maximum amount permitted on that date. The TPP submits one `POST /payments` per scheduled entry.

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
| `ExpirationDateTime`* | date-time | Consent expiry (ISO 8601 with timezone, max 1 year). All scheduled dates must fall before this value. | `2027-03-02T00:00:00+00:00` |
| `AuthorizationExpirationDateTime` | date-time | Deadline by which the user must authorize at the LFI | `2026-03-03T10:00:00+00:00` |
| `BaseConsentId` | string (uuid) | Links to prior consent if renewing — see [Base Consent ID](/knowledge-base/articles/base-consent-id) | — |
| `Permissions` | array\<enum\> | Optional access permissions granted alongside the payment consent | `ReadAccountsBasic`, `ReadBalances` |
| `ControlParameters`* | object | Payment controls — **see below** | — |
| `PersonalIdentifiableInformation`* | string (JWE) | Encrypted creditor and risk data — the `encryptedPII` string from Step 1 | `eyJhbGci...` |
| `PaymentPurposeCode`* | string (3 chars) | AANI payment purpose code | `ACM` |
| `DebtorReference` | string | Reference shown on the debtor's statement | `Invoice 2026-08` |
| `CreditorReference` | string | Reference shown on the creditor's statement | `Invoice 2026-08` |

#### ControlParameters — Variable Defined Schedule

`ControlParameters.ConsentSchedule.MultiPayment` carries the control definition. Set `Type` to `"VariableDefinedSchedule"`. The `Schedule` array defines every execution date and its per-date amount ceiling — the TPP submits a payment on or around each date, and the actual amount must be ≤ the `MaximumIndividualAmount` for that entry.

**Cumulative Control Parameters** — apply across the entire consent lifetime:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `MaximumCumulativeValueOfPayments.Amount` | No | Maximum total value of all payments over the consent lifetime | `6000.00` |
| `MaximumCumulativeValueOfPayments.Currency` | No | ISO 4217 currency code | `AED` |
| `MaximumCumulativeNumberOfPayments` | No | Maximum total number of payments over the consent lifetime | `12` |

**Schedule Parameters** — the explicit list of execution dates, set inside `PeriodicSchedule.Schedule`:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `PeriodicSchedule.Type` | Yes | Must be `"VariableDefinedSchedule"` | `VariableDefinedSchedule` |
| `PeriodicSchedule.Schedule` | Yes | Array of schedule entries. Must be non-empty. | — |
| `PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Yes | The date on which the TPP intends to submit a payment. Must be unique within the schedule, today or in the future, and before `ExpirationDateTime`. | `2026-08-01` |
| `PeriodicSchedule.Schedule[*].MaximumIndividualAmount.Amount` | Yes | The maximum amount permitted for the payment on this date. Each `POST /payments` call must be ≤ this value. | `500.00` |
| `PeriodicSchedule.Schedule[*].MaximumIndividualAmount.Currency` | Yes | ISO 4217 currency code | `AED` |

::: info One payment per scheduled date
Each entry in the `Schedule` array corresponds to exactly one `POST /payments` call. Once a payment has been submitted for a given `PaymentExecutionDate`, the LFI will reject further payments for that date.
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

            // Optional consent-lifetime cumulative caps:
            // "MaximumCumulativeValueOfPayments": { "Amount": "6000.00", "Currency": "AED" },
            // "MaximumCumulativeNumberOfPayments": 12,

            "PeriodicSchedule": {
              "Type": "VariableDefinedSchedule",
              "Schedule": [
                {
                  "PaymentExecutionDate": "2026-08-01",
                  "MaximumIndividualAmount": { "Amount": "500.00", "Currency": "AED" }
                },
                {
                  "PaymentExecutionDate": "2026-09-02",
                  "MaximumIndividualAmount": { "Amount": "1200.00", "Currency": "AED" }
                },
                {
                  "PaymentExecutionDate": "2026-10-11",
                  "MaximumIndividualAmount": { "Amount": "300.00", "Currency": "AED" }
                }
              ]
            }
          }
        }
      },

      // Encrypted PII from Step 1
      "PersonalIdentifiableInformation": "{{encryptedPII}}",

      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Invoice 2026-08",
      "CreditorReference": "Invoice 2026-08"
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
            // MaximumCumulativeValueOfPayments: { Amount: '6000.00', Currency: 'AED' },
            // MaximumCumulativeNumberOfPayments: 12,
            PeriodicSchedule: {
              Type: 'VariableDefinedSchedule',
              Schedule: [
                { PaymentExecutionDate: '2026-08-01', MaximumIndividualAmount: { Amount: '500.00',  Currency: 'AED' } },
                { PaymentExecutionDate: '2026-09-02', MaximumIndividualAmount: { Amount: '1200.00', Currency: 'AED' } },
                { PaymentExecutionDate: '2026-10-11', MaximumIndividualAmount: { Amount: '300.00',  Currency: 'AED' } },
              ],
            },
          },
        },
      },
      PersonalIdentifiableInformation: encryptedPII,  // from Step 1
      PaymentPurposeCode: 'ACM',
      DebtorReference: 'Invoice 2026-08',
      CreditorReference: 'Invoice 2026-08',
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
                        # "MaximumCumulativeValueOfPayments": {"Amount": "6000.00", "Currency": "AED"},
                        # "MaximumCumulativeNumberOfPayments": 12,
                        "PeriodicSchedule": {
                            "Type": "VariableDefinedSchedule",
                            "Schedule": [
                                {"PaymentExecutionDate": "2026-08-01", "MaximumIndividualAmount": {"Amount": "500.00",  "Currency": "AED"}},
                                {"PaymentExecutionDate": "2026-09-02", "MaximumIndividualAmount": {"Amount": "1200.00", "Currency": "AED"}},
                                {"PaymentExecutionDate": "2026-10-11", "MaximumIndividualAmount": {"Amount": "300.00",  "Currency": "AED"}},
                            ],
                        },
                    }
                }
            },
            "PersonalIdentifiableInformation": encrypted_pii,  # from Step 1
            "PaymentPurposeCode": "ACM",
            "DebtorReference": "Invoice 2026-08",
            "CreditorReference": "Invoice 2026-08",
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
- The full payment schedule — each date alongside its maximum amount ceiling
- Any lifetime cumulative caps
- The consent expiry date

::: tip User Experience
See [User Experience](./user-journeys) for screen mockups of the Variable Defined Schedule **Consent** and **Authorization** pages the user sees at the bank.
:::

## Handling the Callback

<!--@include: ../../_shared/step-7-callback.md-->

## Exchanging the Code for Tokens

<!--@include: ../../_shared/step-8-token-exchange.md-->

## Initiating Payments on the Defined Schedule

<!--@include: ../../_shared/step-encrypt-pii-multi-payment.md-->

### Step 9 - POST /payments

Include `x-fapi-interaction-id` and `x-idempotency-key`. If the customer is present at this point in the flow, also send `x-fapi-customer-ip-address`, `x-customer-user-agent` and `x-fapi-auth-date` if the customer has been authenticated. See [Request Headers](/tech/tpp-standards/security/request-headers).

Submit **one payment per scheduled date** under this consent. On or around each `PaymentExecutionDate`, call `POST /payments` with the actual amount for that date — it must be ≤ the `MaximumIndividualAmount` defined for that entry. The API Hub will reject any payment that exceeds the per-date ceiling, duplicates a date already paid, or is submitted after the consent has expired.

::: info Fields that can vary per payment
Unlike Single Instant Payment, multi-payment consents do not require `PaymentPurposeCode`, `DebtorReference`, `CreditorReference`, or `OpenFinanceBilling` to match the consent exactly. Only `ConsentId` must match the authorized consent. `Instruction.Amount` must be within the parameters the consent allows for this payment type.
:::

::: warning One payment per scheduled date
Each `PaymentExecutionDate` in the schedule may only be used for a single `POST /payments` call. Submitting a second payment for the same date will be rejected, regardless of the amount.
:::


::: code-group

```typescript [Node.js]
import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

async function initiateDefinedSchedulePayment(
  accessToken: string,
  consentId: string,
  amount: string,        // must be ≤ MaximumIndividualAmount for this date
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
      DebtorReference:    'Invoice 2026-08',
      CreditorReference:  'Invoice 2026-08',
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

// Payment on 2026-08-01 — ceiling AED 500.00
const { PaymentId: aug } = await initiateDefinedSchedulePayment(accessToken, consentId, '487.50', paymentEncryptedPII, crypto.randomUUID())

// Payment on 2026-09-02 — ceiling AED 1200.00 (using a refreshed access token)
const { PaymentId: sep } = await initiateDefinedSchedulePayment(refreshedToken, consentId, '1150.00', paymentEncryptedPII, crypto.randomUUID())
```

```python [Python]
import time
from jose import jwt as jose_jwt

def initiate_defined_schedule_payment(
    access_token: str,
    consent_id: str,
    amount: str,          # must be ≤ MaximumIndividualAmount for this date
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
            "DebtorReference":    "Invoice 2026-08",
            "CreditorReference":  "Invoice 2026-08",
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


# Payment on 2026-08-01 — ceiling AED 500.00
aug_pay = initiate_defined_schedule_payment(access_token, consent_id, "487.50", payment_encrypted_pii, str(uuid.uuid4()))

# Payment on 2026-09-02 — ceiling AED 1200.00 (using a refreshed access token)
sep_pay = initiate_defined_schedule_payment(refreshed_token, consent_id, "1150.00", payment_encrypted_pii, str(uuid.uuid4()))
```

:::

::: warning Amount ceiling enforcement
The API Hub will reject a payment if `Instruction.Amount` exceeds the `MaximumIndividualAmount` for the corresponding `PaymentExecutionDate`, if that date has already been paid, or if any lifetime cumulative cap has been reached.
:::

<!--@include: ../../_shared/step-token-refresh.md-->
<!--@include: ../../_shared/step-payment-response.md-->

::: info Consent stays Authorized between payments
After each successful payment, the consent remains in the `Authorized` state. You do **not** need to re-initiate the authorization flow between scheduled dates — use the token refresh flow to maintain a valid access token.
:::
