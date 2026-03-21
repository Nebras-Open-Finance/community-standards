---
next: false
prev: false
aside: false
---

🕒 **4 minute read**

# Payment Refunds — API Guide

The Refunds API lets a TPP retrieve the debtor's payment account details from the LFI after a payment has been made, so a merchant can initiate a refund back to the original payer. This guide starts **after a payment consent has been created** with the `ReadRefundAccount` permission and the underlying payment has been authorised.

Unlike the payment consent flow, retrieving refund details does **not** require a user redirect — the TPP authenticates directly using a client credentials grant.

## Prerequisites

Before calling the Refunds API, ensure the following requirements are met:

- **Completed payment consent with `ReadRefundAccount` permission**
  The original payment consent must have been created with `ReadRefundAccount` in the `Permissions` array, and the payment must have been authorised by the user. See the [Payment Consent API Guide](/tech/tpp-standards/v2.1/consent/api-guide).

- **Registered [Application](../../../../../trust-framework/application)**
  The application must be assigned the **BSIP role** in the Trust Framework. See [Roles](../../../../../trust-framework/roles).

- **Valid [Transport Certificate](../../../../../trust-framework/certificates)**
  An active transport certificate for mTLS communication with the LFI.

- **Valid [Signing Certificate](../../../../../trust-framework/certificates)**
  An active signing certificate for signing client assertions.

- **LFI token endpoint**
  You should already hold the LFI's `token_endpoint` and `ResourceServerUrl` from the original payment consent flow. If not, fetch the LFI's `.well-known/openid-configuration` to resolve them.

- **Understanding of [Tokens & Assertions](../../../../security/tokens)**
  Familiarise yourself with `private_key_jwt` client authentication before calling the token endpoint.

## API Sequence Flow

<APIFlowViewer title="Payment Refunds API Flow">
  <APIFlowsRefunds/>
</APIFlowViewer>


### Step 1 — Build a Client Assertion

Retrieving refund details uses the OAuth 2.0 **client credentials** grant — no user consent or redirect is required.


Use the [`signJWT()`](/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt) helper to build a short-lived JWT asserting your application's identity to the LFI's Authorisation Server:

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const issuer    = process.env.LFI_ISSUER!   // from the LFI's .well-known/openid-configuration

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: issuer,
  jti: crypto.randomUUID(),
})
```

```python [Python]
import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
issuer    = os.environ["LFI_ISSUER"]   # from the LFI's .well-known/openid-configuration

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
})
```

:::

See [Client Assertion](/tech/tpp-standards/security/tokens/client-assertion) for the full claims reference.

### Step 2 — Token Request

POST to the LFI's token endpoint with `scope=payments`:

::: code-group

```typescript [Node.js]
const tokenEndpoint = process.env.LFI_TOKEN_ENDPOINT!   // from the LFI's .well-known/openid-configuration

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'payments',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      clientAssertion,
})

const tokenResponse = await fetch(tokenEndpoint, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token } = await tokenResponse.json()
```

```python [Python]
import httpx

token_endpoint = os.environ["LFI_TOKEN_ENDPOINT"]   # from the LFI's .well-known/openid-configuration

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "payments",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
```

:::

## <span style="color: #22c55e; padding-right: 5px;">GET</span> `/payment-consents/{ConsentId}/refund`

### Step 3 — Retrieve the Refund Account

Call the LFI's refund endpoint using the `ConsentId` from the original payment consent. Include `x-fapi-interaction-id` on every request. See [Request Headers](/tech/tpp-standards/security/request-headers).

::: code-group

```typescript [Node.js]
const RESOURCE_SERVER_URL = process.env.LFI_RESOURCE_SERVER_URL!
const CONSENT_ID          = process.env.CONSENT_ID!

const refundResponse = await fetch(
  `${RESOURCE_SERVER_URL}/open-finance/bank-service-initiation/v2.1/payment-consents/${CONSENT_ID}/refund`,
  {
    method:  'GET',
    headers: {
      'Authorization':         `Bearer ${access_token}`,
      'Accept':                'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const responseJwt    = await refundResponse.text()
const [, payloadB64] = responseJwt.split('.')
const result         = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())

const { ConsentId, RefundAccount } = result.message.Data
```

```python [Python]
import httpx, base64, json

RESOURCE_SERVER_URL = os.environ["LFI_RESOURCE_SERVER_URL"]
CONSENT_ID          = os.environ["CONSENT_ID"]

refund_response = httpx.get(
    f"{RESOURCE_SERVER_URL}/open-finance/bank-service-initiation/v2.1/payment-consents/{CONSENT_ID}/refund",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
response_jwt = refund_response.text
payload_b64  = response_jwt.split(".")[1]
result       = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

consent_id     = result["message"]["Data"]["ConsentId"]
refund_account = result["message"]["Data"]["RefundAccount"]
```

:::

### Response

The LFI returns a signed JWT. Decode the payload to read the refund account details:

| Field | Type | Description |
|-------|------|-------------|
| `Data.ConsentId` | string | The ConsentId of the original payment consent |
| `Data.BaseConsentId` | string | The BaseConsentId, if the consent was part of a multi-payment arrangement |
| `Data.RefundAccount.SchemeName` | enum | Account identifier type — always `IBAN` |
| `Data.RefundAccount.Identification` | string | The debtor's IBAN |
| `Data.RefundAccount.Name` | object | The debtor's account name |

### Example decoded payload

```json
{
  "iss": "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
  "aud": ["https://tpp.example.com"],
  "iat": 1713196200,
  "exp": 1713196500,
  "message": {
    "Data": {
      "ConsentId": "con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c",
      "RefundAccount": {
        "SchemeName": "IBAN",
        "Identification": "AE070331234567890123456",
        "Name": {
          "en": "Ibrahim Al Suwaidi"
        }
      }
    },
    "Links": {
      "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/bank-service-initiation/v2.1/payment-consents/con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c/refund"
    },
    "Meta": {}
  }
}
```

### Decoding the JWS

The response body is a compact JWS — three base64url-encoded segments separated by `.`:

```
<header>.<payload>.<signature>
```

Verify the signature using the LFI's public key (from their JWKS endpoint), then base64url-decode the payload:

```typescript
function decodeJwsPayload(jws: string) {
  const [, payloadB64] = jws.split('.')
  const json = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(json)
}
```

See the [GET /payment-consents/{ConsentId}/refund](../open-api/payment-consents-ConsentId-refund) API reference for the full request and response schema.

## Using the Refund Account to Initiate a Refund

Once you have the debtor's `RefundAccount` details, use the returned IBAN and name as the **creditor** in a new payment consent to initiate the refund. The refund payment follows the same initiation flow as any other payment.

See [Creditor PII](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor) for how to populate the creditor fields using the retrieved account details.
