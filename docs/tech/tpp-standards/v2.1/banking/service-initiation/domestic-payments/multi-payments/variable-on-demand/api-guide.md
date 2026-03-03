---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Variable On-Demand — API Guide

A Variable On-Demand consent authorises a TPP to initiate **multiple payments** at variable amounts over the lifetime of the consent. The user authorises once — setting a ceiling via `MaximumIndividualAmount` — and the TPP can then submit individual payments up to that cap on-demand, without requiring re-authorisation for each payment.

Common use cases include subscription billing with variable charges, metered service payments, and TPP-managed savings top-ups.

## Key differences from Single Instant Payment

| Aspect | Single Instant Payment | Variable On-Demand |
|---|---|---|
| `Type` | `SingleInstantPayment` | `VariableOnDemand` |
| Amount at consent | Fixed — one exact amount | Not fixed — a maximum cap per payment |
| Payments allowed | One | Many, until expiry or cap reached |
| Consent after first payment | `Consumed` | Remains `Authorized` |
| `ControlParameters` key | `SinglePayment` | `MultiPayment` |

---

## Prerequisites

Before initiating a Variable On-Demand payment, ensure the following requirements are met:

- **Registered [Application](../../../../../../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **PISP role** as defined in [Roles](../../../../../../trust-framework/roles).

- **Valid [Transport Certificate](../../../../../../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication** with participating LFIs.

- **Valid [Signing Certificate](../../../../../../trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework for signing request objects and client assertions.

- **Registration with the relevant [Authorisation Server](../../../../../../registration/api-guide)**
  The application must be registered with the LFI's Authorization Server.

- **Understanding of [Message Encryption](../../../../../../security/fapi/message-encryption)**
  PII must be encrypted as a JWE and embedded in the consent. You will need the LFI's public encryption key from their JWKS.

---

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/par`

### Step 1 - Encrypting PII

PII encryption is identical to Single Instant Payment — serialize the creditor and risk data to JSON and encrypt it as a JWE using the LFI's public `enc` key.

| Field | Type | Description | Example |
|---|---|---|---|
| `Initiation.Creditor[].Creditor.Name` | string | Full legal name of the recipient | `Ivan England` |
| `Initiation.Creditor[].CreditorAccount.SchemeName` | enum | `IBAN` or `BBAN` | `IBAN` |
| `Initiation.Creditor[].CreditorAccount.Identification` | string | Account identifier | `AE070331234567890123456` |
| `Initiation.Creditor[].CreditorAccount.Name.en` | string | Account holder name (English) | `Ivan David England` |
| `Risk.DebtorIndicators.UserName.en` | string | Display name of the paying user | `Ahmad Al Mansouri` |
| `Risk.CreditorIndicators.IsCreditorConfirmed` | boolean | CoP result | `true` |
| `Risk.CreditorIndicators.IsCreditorPrePopulated` | boolean | Whether TPP pre-filled creditor details | `false` |

::: code-group

```typescript [Node.js]
import { importJWK, CompactEncrypt } from 'jose'

async function encryptPII(pii: object, jwksUri: string): Promise<string> {
  const { keys } = await fetch(jwksUri).then(r => r.json())
  const encKeyJwk = keys.find((k: { use: string }) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  return new CompactEncrypt(new TextEncoder().encode(JSON.stringify(pii)))
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM', kid: encKeyJwk.kid })
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
      IsCreditorPrePopulated: false,
    },
  },
}

const encryptedPII = await encryptPII(pii, LFI_JWKS_URI)
```

```python [Python]
import json, requests
from jose import jwe

def encrypt_pii(pii: dict, jwks_uri: str) -> str:
    keys = requests.get(jwks_uri).json()["keys"]
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key found in JWKS")
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
            "IsCreditorPrePopulated": False,
        },
    },
}

encrypted_pii = encrypt_pii(pii, LFI_JWKS_URI)
```

:::

See [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption) for full details.

---

### Step 2 - Constructing Authorization Details

Construct `authorization_details` of type `urn:openfinanceuae:service-initiation-consent:v2.1`. The critical difference from Single Instant Payment is that `ControlParameters` uses `MultiPayment` with `Type: "VariableOnDemand"` — no fixed amount, but a maximum per-payment ceiling.

#### authorization_details

| Field | Type | Description | Example |
|---|---|---|---|
| `type`* | enum | Must be `urn:openfinanceuae:service-initiation-consent:v2.1` | — |
| `consent`* | object | Consent properties | — |

#### consent | `authorization_details.consent`

| Field | Type | Description | Example |
|---|---|---|---|
| `ConsentId`* | string (uuid) | TPP-assigned unique consent ID | `b8f42378-10ac-46a1-8d20-4e020484216d` |
| `IsSingleAuthorization`* | boolean | One authorizing party | `true` |
| `ExpirationDateTime`* | date-time | Consent expiry (max 1 year) | `2027-03-02T00:00:00+00:00` |
| `AuthorizationExpirationDateTime` | date-time | Deadline for user to authorize | `2026-03-03T10:00:00+00:00` |
| `BaseConsentId` | string (uuid) | Links to prior consent if renewing — see [Base Consent ID](/knowledge-base/articles/base-consent-id) | — |
| `Permissions` | array\<enum\> | Optional account-reading permissions | `ReadAccountsBasic`, `ReadBalances` |
| `ControlParameters`* | object | Payment schedule — **see below** | — |
| `PersonalIdentifiableInformation`* | string (JWE) | Encrypted PII from Step 1 | `eyJhbGci...` |
| `PaymentPurposeCode`* | string (3 chars) | AANI payment purpose code | `ACM` |
| `DebtorReference` | string | Reference on debtor's statement | `Subscription` |
| `CreditorReference` | string | Reference on creditor's statement | `Subscription` |

#### ControlParameters — Variable On-Demand

`ControlParameters.ConsentSchedule.MultiPayment` carries the schedule definition. For Variable On-Demand, set `Type` to `"VariableOnDemand"` and define the per-payment ceiling. The amount is **not fixed at consent time** — each `POST /payments` call specifies its own amount (up to `MaximumIndividualAmount`).

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `Type`* | enum | ✅ | Must be `VariableOnDemand` | `VariableOnDemand` |
| `MaximumIndividualAmount.Amount`* | string | ✅ | Maximum amount per single payment | `500.00` |
| `MaximumIndividualAmount.Currency`* | string | ✅ | ISO 4217 currency code | `AED` |
| `MaximumCumulativeAmount.Amount` | string | — | Optional total cap across all payments | `5000.00` |
| `MaximumCumulativeAmount.Currency` | string | — | ISO 4217 currency code | `AED` |
| `MaximumNumberOfPayments` | integer | — | Optional cap on number of payments | `20` |

::: warning MaximumIndividualAmount is a ceiling, not a fixed amount
The user sees `MaximumIndividualAmount` on the bank's authorization screen. Each payment you later submit can be **any amount up to this value** — but the LFI will reject payments that exceed it.
:::

#### Example authorization_details

```json
"authorization_details": [
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
    "consent": {
      "ConsentId": "{{unique-guid}}",
      "IsSingleAuthorization": true,
      "ExpirationDateTime": "2027-03-02T00:00:00+00:00",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances"
      ],

      "ControlParameters": {
        "ConsentSchedule": {
          "MultiPayment": {
            "Type": "VariableOnDemand",
            "MaximumIndividualAmount": {
              "Amount": "500.00",
              "Currency": "AED"
            },
            // Optional caps:
            // "MaximumCumulativeAmount": { "Amount": "5000.00", "Currency": "AED" },
            // "MaximumNumberOfPayments": 20
          }
        }
      },

      "PersonalIdentifiableInformation": "{{encryptedPII}}",

      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Subscription",
      "CreditorReference": "Subscription"
    }
  }
]
```

---

### Step 3 - Constructing the Request JWT

Generate a PKCE code pair and build the Request JWT using `buildRequestJWT()` with scope `payments openid`.

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
            MaximumIndividualAmount: { Amount: '500.00', Currency: 'AED' },
            MaximumCumulativeAmount:  { Amount: '5000.00', Currency: 'AED' },
            MaximumNumberOfPayments: 20,
          },
        },
      },
      PersonalIdentifiableInformation: encryptedPII,
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

:::

::: tip Store the code_verifier
Save `codeVerifier` in your server-side session — you will need it in [Step 8](#step-8-post-token-authorization-code).
:::

---

### Step 4 - Creating a Client Assertion

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

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

See [Tokens & Assertions](/tech/tpp-standards/security/tokens#generating-a-client-assertion).

---

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

request_uri = par_response.json()["request_uri"]
```

:::

---

## Redirecting the User to the Bank

### Step 6 - Building the Authorization URL

::: code-group

```typescript [Node.js]
const AUTHORIZATION_ENDPOINT = discoveryDoc.authorization_endpoint

const authCodeUrl =
  `${AUTHORIZATION_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&scope=openid` +
  `&request_uri=${encodeURIComponent(request_uri)}`

window.location.href = authCodeUrl
```

```python [Python]
import urllib.parse

auth_code_url = (
    f"{discovery_doc['authorization_endpoint']}"
    f"?client_id={CLIENT_ID}&response_type=code&scope=openid"
    f"&request_uri={urllib.parse.quote(request_uri)}"
)
```

:::

After redirecting, the user will see the bank's authorization screen showing:
- The TPP name
- `MaximumIndividualAmount` (e.g. "up to AED 500.00 per payment")
- Optional cumulative cap and payment count limit
- Expiry date of the consent

::: tip User Journeys
See [User Journeys](./user-journeys) for screen mockups of the Variable On-Demand authorization screens.
:::

---

## Handling the Callback

### Step 7 - Extracting the Authorization Code

```
https://yourapp.com/callback?code=fbe03604-...&state=d2fe5e2c-...&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae
```

::: code-group

```typescript [Node.js]
const params = new URLSearchParams(window.location.search)

const code  = params.get('code')!
const state = params.get('state')!
const iss   = params.get('iss')!

if (state !== storedState) throw new Error('State mismatch — possible CSRF attack')
if (iss   !== ISSUER)      throw new Error(`Unexpected issuer: ${iss}`)
```

```python [Python]
from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
code  = params["code"][0]
state = params["state"][0]
iss   = params["iss"][0]

if state != stored_state: raise ValueError("State mismatch")
if iss   != ISSUER:       raise ValueError(f"Unexpected issuer: {iss}")
```

:::

---

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
    code_verifier:         codeVerifier,
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
        "code_verifier":         code_verifier,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = token_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]
```

:::

---

## Initiating Payments On-Demand

### Step 9 - POST /payments

Unlike Single Instant Payment, this step can be called **multiple times** under the same consent. Each call specifies the actual amount for that payment — it must be ≤ `MaximumIndividualAmount`.

::: info Consent stays Authorized
After each successful payment, the consent remains in the `Authorized` state (unless cumulative caps are reached or the consent expires). You do **not** need to re-initiate the authorization flow.
:::

::: code-group

```typescript [Node.js]
const LFI_API_BASE = process.env.LFI_API_BASE_URL!

async function initiateVariablePayment(
  accessToken: string,
  consentId: string,
  amount: string,        // must be ≤ MaximumIndividualAmount ('500.00')
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
            Amount:   amount,   // variable — the actual charge for this payment
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
const { PaymentId: pay1 } = await initiateVariablePayment(access_token, consentId, '149.99', encryptedPII)

// Second payment (days/weeks later using a refreshed access token)
const { PaymentId: pay2 } = await initiateVariablePayment(refreshedToken, consentId, '89.00', encryptedPII)
```

```python [Python]
def initiate_variable_payment(
    access_token: str,
    consent_id: str,
    amount: str,
    encrypted_pii: str,
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
                        "Amount":   amount,   # variable — the actual charge
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
```

:::

::: warning Amount validation
The LFI will reject a payment if `Instruction.Amount` exceeds `MaximumIndividualAmount` from the consent, or if `MaximumCumulativeAmount` or `MaximumNumberOfPayments` has already been reached.
:::

### Token refresh for subsequent payments

The initial access token expires (typically after 10 minutes). For subsequent on-demand payments, use the `refresh_token` to obtain a new access token without re-involving the user:

::: code-group

```typescript [Node.js]
const refreshResponse = await fetch(`${ISSUER}/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:            'refresh_token',
    refresh_token:         storedRefreshToken,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token: newToken, refresh_token: newRefresh } = await refreshResponse.json()
// Update your stored tokens
```

:::

See [Tokens & Assertions](/tech/tpp-standards/security/tokens) for refresh token lifetimes and rotation policy.

---

## Checking Payment Status

### Step 10 - GET /payments/{PaymentId}

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

data   = status_response.json()["Data"]
status = data["Status"]
```

:::

| Status | Description |
|---|---|
| `Pending` | Payment received by LFI, awaiting processing |
| `AcceptedSettlementInProcess` | Payment accepted and settlement is in progress |
| `AcceptedSettlementCompleted` | Payment settled successfully |
| `Rejected` | Payment rejected by the LFI or payment rail |

See [GET /payments/{PaymentId}](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId) for the full response schema.

---

## Listing Payments Under a Consent

To retrieve all payments submitted under a Variable On-Demand consent, use idempotency key listing:

::: code-group

```typescript [Node.js]
const listResponse = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/payments?consentId=${consentId}`,
  {
    headers: { Authorization: `Bearer ${access_token}` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Payment: payments } } = await listResponse.json()
```

:::

See [GET /payments](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-idempotency) for the full reference.
