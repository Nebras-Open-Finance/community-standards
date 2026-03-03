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

### Step 1 - Encrypting PII

Before constructing the `authorization_details`, the **Personal Identifiable Information (PII)** — creditor name, IBAN, and risk indicators — must be encrypted as a JWE using the LFI's public encryption key. This prevents the Authorization Server from reading sensitive payment details in transit.

#### PII Structure

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `Initiation` | object | Creditor identification details. *Described below* | — |
| `Risk` | object | Risk and fraud indicators for the payment. *Described below* | — |

#### Initiation | `Initiation.Creditor[]`

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `Creditor.Name` | string | Full legal name of the payment recipient | `Ivan England` |
| `CreditorAccount.SchemeName` | enum | Account scheme — `IBAN` or `BBAN` | `IBAN` |
| `CreditorAccount.Identification` | string | Account identifier in the chosen scheme | `AE070331234567890123456` |
| `CreditorAccount.Name.en` | string | Account holder name (English) | `Ivan David England` |
| `CreditorAccount.Name.ar` | string | Account holder name (Arabic, optional) | — |

#### Risk | `Risk`

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `DebtorIndicators.UserName.en` | string | Display name of the paying user | `Ahmad Al Mansouri` |
| `CreditorIndicators.IsCreditorConfirmed` | boolean | Whether the creditor identity was confirmed by Confirmation of Payee | `true` |
| `CreditorIndicators.IsCreditorPrePopulated` | boolean | Whether the creditor details were pre-filled by the TPP rather than entered by the user | `true` |

#### Encrypting the PII

Serialize the PII object to JSON and encrypt it as a JWE using the LFI's public encryption key. Use the [`encryptRequestObject()`](/tech/tpp-standards/security/fapi/message-encryption#step-3-encrypt-the-payload) helper from the Message Encryption page — the only difference is that the payload is a JSON string rather than a signed JWT:

::: code-group

```typescript [Node.js]
import { importJWK, CompactEncrypt } from 'jose'

/**
 * Encrypt PII as a JWE using the LFI's public encryption key.
 * Fetch the LFI's JWKS URI from their .well-known/openid-configuration.
 */
async function encryptPII(pii: object, jwksUri: string): Promise<string> {
  const { keys } = await fetch(jwksUri).then(r => r.json())
  const encKeyJwk = keys.find((k: { use: string }) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  return new CompactEncrypt(new TextEncoder().encode(JSON.stringify(pii)))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(encKey)
}

const pii = {
  Initiation: {
    Creditor: [
      {
        Creditor: { Name: 'Ivan England' },
        CreditorAccount: {
          SchemeName: 'IBAN',
          Identification: 'AE070331234567890123456',
          Name: { en: 'Ivan David England' },
        },
      },
    ],
  },
  Risk: {
    DebtorIndicators: { UserName: { en: 'Ahmad Al Mansouri' } },
    CreditorIndicators: {
      IsCreditorConfirmed: true,
      IsCreditorPrePopulated: true,
    },
  },
}

const encryptedPII = await encryptPII(pii, LFI_JWKS_URI)
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
        "Creditor": [
            {
                "Creditor": {"Name": "Ivan England"},
                "CreditorAccount": {
                    "SchemeName": "IBAN",
                    "Identification": "AE070331234567890123456",
                    "Name": {"en": "Ivan David England"},
                },
            }
        ]
    },
    "Risk": {
        "DebtorIndicators": {"UserName": {"en": "Ahmad Al Mansouri"}},
        "CreditorIndicators": {
            "IsCreditorConfirmed": True,
            "IsCreditorPrePopulated": True,
        },
    },
}

encrypted_pii = encrypt_pii(pii, LFI_JWKS_URI)
# encrypted_pii is a compact JWE string — embed it in authorization_details below
```

:::

See [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption) for details on fetching the LFI's JWKS and selecting the correct encryption key.

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

#### Permissions (Optional) | `authorization_details.consent.Permissions`

Payment consents may optionally include account-reading permissions so the TPP can display debit account details and confirmation screens.

| Permission | Description |
|------------|-------------|
| `ReadAccountsBasic` | List accounts and basic metadata |
| `ReadAccountsDetail` | Read full account details |
| `ReadBalances` | Read account balances |
| `ReadRefundAccount` | Read account details for refund routing |

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

:::

::: tip Store the code_verifier
Save `codeVerifier` in your server-side session or an `httpOnly` cookie — you will need it in [Step 8](#step-8-post-token-authorization-code) to exchange the authorization code for tokens.
:::

See [Preparing the Request JWT](/tech/tpp-standards/security/fapi/request-jwt) for the full JWT claim reference and PKCE helpers.

### Step 4 - Creating a Client Assertion

Use the [`signJWT()`](/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt) helper to build a client assertion proving your application's identity:

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.AUTHORIZATION_SERVER_ISSUER!

async function buildClientAssertion(): Promise<string> {
  return signJWT({
    iss: CLIENT_ID,
    sub: CLIENT_ID,
    aud: ISSUER,
    jti: crypto.randomUUID(),
  })
}
```

:::

See [Tokens & Assertions](/tech/tpp-standards/security/tokens#generating-a-client-assertion) for the full claims reference.

### Step 5 - Sending the /par Request

::: code-group

```typescript [Node.js]
const parResponse = await fetch(`${ISSUER}/par`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    request:               requestJWT,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { request_uri, expires_in } = await parResponse.json()
```

```python [Python]
import httpx

par_response = httpx.post(
    f"{ISSUER}/par",
    data={
        "request":               request_jwt,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

data        = par_response.json()
request_uri = data["request_uri"]
expires_in  = data["expires_in"]
```

:::

::: info mTLS transport certificate
You must present your **transport certificate** on every connection to the Authorization Server and resource APIs. See [Certificates](/tech/tpp-standards/trust-framework/certificates).
:::

| Field | Description | Example |
|-------|-------------|---------|
| `request_uri` | Single-use reference to your pushed authorization request | `urn:ietf:params:oauth:request-uri:bwc4JDpSd7` |
| `expires_in` | Seconds until the `request_uri` expires — redirect the user before this window closes | `90` |

## Redirecting the User to the Bank

### Step 6 - Building the Authorization URL

The `authorization_endpoint` is found in the LFI's `.well-known/openid-configuration` — not constructed from the issuer URL directly.

::: code-group

```typescript [Node.js]
// authorization_endpoint from .well-known/openid-configuration
// e.g. 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/authorize'
const AUTHORIZATION_ENDPOINT = discoveryDoc.authorization_endpoint

const authCodeUrl = `${AUTHORIZATION_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&scope=openid&request_uri=${encodeURIComponent(request_uri)}`

window.location.href = authCodeUrl
// or server-side: res.redirect(authCodeUrl)
```

```python [Python]
import urllib.parse

AUTHORIZATION_ENDPOINT = discovery_doc["authorization_endpoint"]

auth_code_url = (
    f"{AUTHORIZATION_ENDPOINT}"
    f"?client_id={CLIENT_ID}"
    f"&response_type=code"
    f"&scope=openid"
    f"&request_uri={urllib.parse.quote(request_uri)}"
)
# redirect the user to auth_code_url
```

:::

::: tip User Journeys
See [User Journeys](./user-journeys) for screen mockups of the **Consent** and **Authorization** pages the user sees at the bank, including an interactive form where you can edit the consent JSON and PII and preview the resulting UI.
:::

After redirecting, the user will:

1. Authenticate with their bank
2. Review the payment details — amount, recipient, and purpose — on the bank's authorization screen
3. Approve or decline

## Handling the Callback

### Step 7 - Extracting the Authorization Code

After the user approves, the bank redirects to your `redirect_uri`:

```
https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae
```

::: code-group

```typescript [Node.js]
const params = new URLSearchParams(window.location.search)

const code  = params.get('code')!
const state = params.get('state')!
const iss   = params.get('iss')!

if (state !== storedState) throw new Error('State mismatch — possible CSRF attack')
if (iss !== ISSUER)        throw new Error(`Unexpected issuer: ${iss}`)
```

```python [Python]
from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
code  = params["code"][0]
state = params["state"][0]
iss   = params["iss"][0]

if state != stored_state: raise ValueError("State mismatch — possible CSRF attack")
if iss != ISSUER:         raise ValueError(f"Unexpected issuer: {iss}")
```

:::

See [Handling Authorization Callbacks](/tech/tpp-standards/security/fapi/handling-callback) for a full guide on state validation, issuer verification, and replay prevention.

## Exchanging the Code for Tokens

### Step 8 - POST /token (Authorization Code)

::: code-group

```typescript [Node.js]
const tokenResponse = await fetch(`${ISSUER}/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:            'authorization_code',
    code,
    redirect_uri:          REDIRECT_URI,
    code_verifier:         codeVerifier,            // from Step 3
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token, refresh_token, expires_in } = await tokenResponse.json()
```

```python [Python]
token_response = httpx.post(
    f"{ISSUER}/token",
    data={
        "grant_type":            "authorization_code",
        "code":                  code,
        "redirect_uri":          REDIRECT_URI,
        "code_verifier":         code_verifier,     # from Step 3
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = token_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]
expires_in    = tokens["expires_in"]    # 600 — access token lasts 10 minutes
```

:::

::: tip Token storage
Never store tokens in `localStorage`. Use `httpOnly` cookies or a server-side session store. See [Tokens & Assertions](/tech/tpp-standards/security/tokens) for the full token lifecycle.
:::

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
