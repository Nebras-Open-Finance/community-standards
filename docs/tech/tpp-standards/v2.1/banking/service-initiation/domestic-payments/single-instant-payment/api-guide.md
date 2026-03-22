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

<APIFlowViewer title="Single Instant Payment API Flow">
  <APIFlowsSingleInstantPayment/>
</APIFlowViewer>

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

<!--@include: ../_shared/step-3-request-jwt-scope.md-->

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

### Step 9 - Encrypt PII for Payment Initiation

Before constructing the payment request, you must encrypt a fresh PII token specifically for the payment. This follows the **Domestic Payment PII Schema Object** (`AEBankServiceInitiation.AEDomesticPaymentPIIProperties`) — the same JWS-inside-JWE pattern used in Step 1, but submitted on the payment itself rather than on the `/par` consent.

::: danger Creditor must exactly match the consent PII
The `Creditor` object inside the payment PII — including `CreditorAccount.SchemeName`, `CreditorAccount.Identification`, `CreditorAccount.Name`, and any `Creditor.Name` or `CreditorAgent` fields — **must be byte-for-byte identical** to the Creditor you encrypted in Step 1. The LFI decrypts both PII tokens and compares them; any discrepancy can result in rejection.
:::

Build the PII object according to the schema, then encrypt it using the same `encryptPII` helper from Step 1:

::: code-group

```typescript [Node.js]
import { SignJWT, importJWK, CompactEncrypt } from 'jose'

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
```

```python [Python]
import json
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
```
:::

See [Personal Identifiable Information](../../../personal-identifiable-information/) for the complete field reference, required vs optional fields, and creditor models for each domestic payment type.

See [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption) for details on fetching the LFI's JWKS and selecting the correct encryption key.

### Step 10 - Sign and Submit the Payment Request

Include `x-fapi-interaction-id` and `x-idempotency-key`. As the customer is present at this point in the flow, also send `x-fapi-customer-ip-address`, `x-customer-user-agent` and `x-fapi-auth-date` if the customer has been authenticated. See [Request Headers](/tech/tpp-standards/security/request-headers).

The POST /payments body is sent as `Content-Type: application/jwt` — the payment payload is wrapped in a signed JWT (`AEPaymentRequestSigned`) using your private signing key. The LFI verifies the signature before processing the payment.

Every field in the request **must exactly match** the corresponding value from the authorized consent:

| Field | Must match |
|-------|-----------|
| `ConsentId` | The `ConsentId` from the authorized consent |
| `Instruction.Amount.Amount` | `consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Amount` |
| `Instruction.Amount.Currency` | `consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Currency` |
| `PaymentPurposeCode` | `consent.PaymentPurposeCode` |
| `OpenFinanceBilling` | `consent.OpenFinanceBilling` (including `Type` and, if present, `MerchantId`) |
| `DebtorReference` | `consent.DebtorReference` |
| `CreditorReference` | `consent.CreditorReference` |

::: code-group

```typescript [Node.js]
import { SignJWT } from 'jose'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!

// Build the payment payload
const paymentPayload = {
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
}

// Sign the payload as a JWT using your private signing key
const signedPayment = await new SignJWT(paymentPayload)
  .setProtectedHeader({ alg: 'PS256', kid: SIGNING_KEY_ID })
  .setIssuedAt()
  .setIssuer(CLIENT_ID)
  .setExpirationTime('5m')
  .sign(signingKey)

const paymentResponse = await fetch(`${LFI_API_BASE}/open-finance/v2.1/payments`, {
  method: 'POST',
  headers: {
    'Authorization':               `Bearer ${access_token}`,
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
```

```python [Python]
import uuid
import time
from jose import jwt as jose_jwt

LFI_API_BASE = os.environ["LFI_API_BASE_URL"]

# Build the payment payload
payment_payload = {
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

# Sign the payload as a JWT using your private signing key
now = int(time.time())
signed_payment = jose_jwt.encode(
    {**payment_payload, "iss": CLIENT_ID, "iat": now, "exp": now + 300},
    signing_key,
    algorithm="PS256",
    headers={"kid": SIGNING_KEY_ID},
)

payment_response = httpx.post(
    f"{LFI_API_BASE}/open-finance/v2.1/payments",
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
```


::: warning Consent replay validation
The payment request is validated at two points. The API Hub checks that `ConsentId`, `Instruction.Amount`, `PaymentPurposeCode`, `DebtorReference`, `CreditorReference`, and `OpenFinanceBilling` exactly match the authorized consent — a mismatch returns `400` before the request reaches the LFI. The LFI then decrypts the payment PII and verifies that all creditor fields match the PII from the consent. Either validation failure results in rejection.
:::



### A successful POST /payments

A `201 Created` response is returned as a signed JWT (`application/jwt`).

#### Response body — `Data`

| Field | Required | Description |
|-------|----------|-------------|
| `PaymentId` | Yes | LFI-assigned unique identifier for this payment resource (use this to poll for status) |
| `ConsentId` | Yes | The consent this payment is bound to |
| `Status` | Yes | Current payment status — see status lifecycle below |
| `StatusUpdateDateTime` | Yes | ISO 8601 datetime of the last status change |
| `CreationDateTime` | Yes | ISO 8601 datetime when the payment resource was created |
| `Instruction.Amount` | Yes | Echoes back the amount and currency from the request |
| `PaymentPurposeCode` | Yes | Echoes back the payment purpose code |
| `OpenFinanceBilling` | Yes | Echoes back the billing parameters |
| `PaymentTransactionId` | No | End-to-end transaction ID generated by the Aani payment rails once the payment is submitted for settlement. Not present at `Pending`. |
| `DebtorReference` | No | Echoes back the debtor reference if provided |
| `RejectReasonCode` | No | Array of `{ Code, Message }` objects — present only when `Status` is `Rejected` |

```json
{
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
    "Self": "https://api.lfi.example/open-finance/v2.1/payments/83b47199-90c2-4c05-9ef1-aeae68b0fc7c",
  }
}
```

See the [POST /payments](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments) API reference for the full request and response schema.
