---
next: false
prev: false
aside: false
---

🕒 **7 minute read**

# Confirmation of Payee - API Guide

Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or business before initiating a payment. Unlike payment flows, CoP does **not** require user authorization — the TPP authenticates directly using a client credentials grant and the LFI responds with a match result in seconds.

CoP is served by each participating LFI independently. Before calling an LFI directly, the TPP first calls the API Hub's **discovery** endpoint to identify which LFI holds the destination account and retrieve its endpoint URLs.

## Prerequisites

Before calling the CoP API, ensure the following requirements are met:

- **Registered [Application](../../../../../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **CoP role** as defined in [Roles](../../../../../trust-framework/roles).

- **Valid [Transport Certificate](../../../../../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication** with participating LFIs.

- **Valid [Signing Certificate](../../../../../trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign the confirmation request JWT and client assertions.

- **Registration with the relevant [Authorisation Server](../../../../registration/api-guide)**
  The application must be registered with the Authorisation Server of the LFI that holds the destination account.

- **Understanding of [Tokens & Assertions](../../../../security/tokens)**
  You should understand how client authentication works with `private_key_jwt` before calling the token endpoint.

## API Sequence Flow

<APIFlowViewer title="Confirmation of Payee API Flow">
  <APIFlowsConfirmationOfPayee/>
</APIFlowViewer>

### Step 1 — Discover the LFI

CoP is served by individual LFIs — the API Hub's `/discovery` endpoint resolves a payee IBAN to the correct LFI and returns two URLs you will need for the rest of the flow:

| Field | Description |
|-------|-------------|
| `DiscoveryEndpointUrl` | The `.well-known` endpoint for the LFI's Authorisation Server. Fetch this to obtain the `token_endpoint` and `issuer` used in Step 2. |
| `ResourceServerUrl` | The base URL of the LFI's Resource Server. Use this as the base URL when calling `/confirmation` in Step 4. |

### Step 2 — Build a signed discovery request

The request body is a signed JWT containing the IBAN, signed with your signing key:

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID  = process.env.CLIENT_ID!
const HUB_ISSUER = process.env.HUB_ISSUER!   // from the Hub's .well-known/openid-configuration

const discoveryRequest = await signJWT({
  iss: CLIENT_ID,
  aud: HUB_ISSUER,
  jti: crypto.randomUUID(),
  message: {
    Data: {
      SchemeName:     'IBAN',
      Identification: 'AE070331234567890123456',   // IBAN to check
    },
  },
})
```

```python [Python]
import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID  = os.environ["CLIENT_ID"]
HUB_ISSUER = os.environ["HUB_ISSUER"]   # from the Hub's .well-known/openid-configuration

discovery_request = sign_jwt({
    "iss": CLIENT_ID,
    "aud": HUB_ISSUER,
    "jti": str(uuid.uuid4()),
    "message": {
        "Data": {
            "SchemeName":     "IBAN",
            "Identification": "AE070331234567890123456",   # IBAN to check
        }
    },
})
```

:::

### Step 3 — POST /discovery

Include `x-fapi-interaction-id` on the request. See [Request Headers](/tech/tpp-standards/security/request-headers).

::: code-group

```typescript [Node.js]
const HUB_API_BASE   = process.env.HUB_API_BASE!      // API Hub base URL
const hubAccessToken = process.env.HUB_ACCESS_TOKEN!  // client credentials token from the Hub

const discoveryResponse = await fetch(
  `${HUB_API_BASE}/open-finance/confirmation-of-payee/v2.1/discovery`,
  {
    method:  'POST',
    headers: {
      'Authorization':         `Bearer ${hubAccessToken}`,
      'Content-Type':          'application/jwt',
      'Accept':                'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    body: discoveryRequest,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const discoveryJwt     = await discoveryResponse.text()
const [, discoveryB64] = discoveryJwt.split('.')
const { message }      = JSON.parse(Buffer.from(discoveryB64, 'base64url').toString())

const { DiscoveryEndpointUrl, ResourceServerUrl } = message.Data
```

```python [Python]
import httpx, base64, json, os

HUB_API_BASE    = os.environ["HUB_API_BASE"]
hub_access_token = os.environ["HUB_ACCESS_TOKEN"]

discovery_response = httpx.post(
    f"{HUB_API_BASE}/open-finance/confirmation-of-payee/v2.1/discovery",
    headers={
        "Authorization":         f"Bearer {hub_access_token}",
        "Content-Type":          "application/jwt",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    content=discovery_request,
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
discovery_jwt = discovery_response.text
payload_b64   = discovery_jwt.split(".")[1]
message       = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))["message"]

discovery_endpoint_url = message["Data"]["DiscoveryEndpointUrl"]
resource_server_url    = message["Data"]["ResourceServerUrl"]
```

:::

See the [POST /discovery](./open-api/discovery) API reference for the full request and response schema.

### Step 4 — Resolve the LFI token endpoint

Fetch the `DiscoveryEndpointUrl` directly to read the LFI's OpenID configuration. This gives you the `token_endpoint` and `issuer` needed in Step 2:

::: code-group

```typescript [Node.js]
const oidcConfig    = await fetch(DiscoveryEndpointUrl).then(r => r.json())
const tokenEndpoint = oidcConfig.token_endpoint   // used in Step 2b
const issuer        = oidcConfig.issuer           // used in Step 2a
```

```python [Python]
oidc_config    = httpx.get(discovery_endpoint_url).json()
token_endpoint = oidc_config["token_endpoint"]   # used in Step 2b
issuer         = oidc_config["issuer"]           # used in Step 2a
```

:::


### Step 5 — Build a Client Assertion

CoP uses the OAuth 2.0 **client credentials** grant — no user consent or redirect is required.

Use the [`signJWT()`](/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt) helper to build a short-lived JWT asserting your application's identity to the LFI's Authorisation Server:

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
// issuer resolved from DiscoveryEndpointUrl in Step 4

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
# issuer resolved from discovery_endpoint_url in Step 4

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
})
```

:::

See [Client Assertion](/tech/tpp-standards/security/tokens/client-assertion) for the full claims reference.

### Step 6 — Token Request

POST to the LFI's token endpoint (resolved in Step 4) with `scope=confirmation-of-payee`:

::: code-group

```typescript [Node.js]
// tokenEndpoint resolved from DiscoveryEndpointUrl in Step 4

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'confirmation-of-payee',
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

# token_endpoint resolved from discovery_endpoint_url in Step 4

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "confirmation-of-payee",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
```

:::

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/open-finance/confirmation-of-payee/v1.2/confirmation`

## Step 3 — Build and Sign the Confirmation Request

The confirmation request is sent as a **signed JWT** (`Content-Type: application/jwt`). Build the JWT payload containing the account details you want to verify, then sign it with your signing key.

### Request payload fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `Data.SchemeName`* | enum | Account identifier type — always `IBAN` | `IBAN` |
| `Data.Identification`* | string | The IBAN to verify | `AE070331234567890123456` |
| `Data.Name.FullName`* | string | Full name of the account holder | `Ibrahim Al Suwaidi` |
| `Data.Name.GivenName` | string | Given (first) name — individual accounts | `Ibrahim` |
| `Data.Name.LastName` | string | Family name — individual accounts | `Al Suwaidi` |
| `Data.Name.BusinessName` | string | Registered business name — use instead of personal name fields for business accounts | `Business Inc.` |

::: tip Individual vs. Business
Provide `GivenName` + `LastName` for personal accounts, or `BusinessName` for business accounts. Do not mix both.
:::

### Example payload (inside the JWT `message` claim)

```json
{
  "Data": {
    "SchemeName": "IBAN",
    "Identification": "AE070331234567890123456",
    "Name": {
      "FullName": "Ibrahim Al Suwaidi",
      "GivenName": "Ibrahim",
      "LastName": "Al Suwaidi"
    }
  }
}
```

### Signing the request

Use the [`signJWT()`](/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt) helper, wrapping the payload in a `message` claim:

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const signedRequest = await signJWT({
  iss: CLIENT_ID,
  aud: issuer,
  jti: crypto.randomUUID(),
  message: {
    Data: {
      SchemeName:     'IBAN',
      Identification: 'AE070331234567890123456',
      Name: {
        FullName:  'Ibrahim Al Suwaidi',
        GivenName: 'Ibrahim',
        LastName:  'Al Suwaidi',
      },
    },
  },
})
```

```python [Python]
import uuid
from sign_jwt import sign_jwt

signed_request = sign_jwt({
    "iss": CLIENT_ID,
    "aud": issuer,
    "jti": str(uuid.uuid4()),
    "message": {
        "Data": {
            "SchemeName":     "IBAN",
            "Identification": "AE070331234567890123456",
            "Name": {
                "FullName":  "Ibrahim Al Suwaidi",
                "GivenName": "Ibrahim",
                "LastName":  "Al Suwaidi",
            },
        }
    },
})
```

:::

## Step 4 — POST /confirmation

Send the signed JWT to the LFI's CoP endpoint using the `ResourceServerUrl` resolved in Step 3. Both the request body and the response are JWTs. Include `x-fapi-interaction-id` on every request. See [Request Headers](/tech/tpp-standards/security/request-headers).

::: code-group

```typescript [Node.js]
// ResourceServerUrl resolved from discovery in Step 3

const copResponse = await fetch(
  `${ResourceServerUrl}/open-finance/confirmation-of-payee/v1.2/confirmation`,
  {
    method:  'POST',
    headers: {
      'Authorization':       `Bearer ${access_token}`,
      'Content-Type':        'application/jwt',
      'Accept':              'application/jwt',
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    body: signedRequest,
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

// Response is a signed JWT — decode the payload to read the result
const responseJwt   = await copResponse.text()
const [, payloadB64] = responseJwt.split('.')
const result = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
```

```python [Python]
import httpx, base64, json

# resource_server_url resolved from discovery in Step 3

cop_response = httpx.post(
    f"{resource_server_url}/open-finance/confirmation-of-payee/v1.2/confirmation",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "Content-Type":          "application/jwt",
        "Accept":                "application/jwt",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    content=signed_request,
    # cert=("transport.crt", "transport.key"),
)

# Response is a signed JWT — decode the payload to read the result
response_jwt  = cop_response.text
payload_b64   = response_jwt.split(".")[1]
result        = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))
```

:::

### Response

The LFI returns a signed JWT. Decode the payload to read the match result:

| Field | Type | Description |
|-------|------|-------------|
| `Data.NameMatchIndicator` | string | The result of the name match check — see enum below |
| `Data.MaskedName` | string | The account holder's name, partially masked. Returned on `ConfirmationOfPayee.Partial` and `ConfirmationOfPayee.No` |

| `NameMatchIndicator` | Meaning |
|---------------------|---------|
| `ConfirmationOfPayee.Yes` | Name and account match — safe to proceed |
| `ConfirmationOfPayee.Partial` | Name partially matches — present the `MaskedName` to the payer |
| `ConfirmationOfPayee.No` | Name does not match — present the `MaskedName` to the payer |

::: warning Proceed with caution on non-Yes results
A `ConfirmationOfPayee.Partial` or `ConfirmationOfPayee.No` result must be surfaced to the payer — along with the `MaskedName` — before initiating a payment. Proceeding without informing the user may increase the risk of authorised push payment fraud.
:::

### Decoding the JWS

The `/confirmation` response body is a compact JWS — three base64url-encoded segments separated by `.`:

```
<header>.<payload>.<signature>
```

Verify the signature using the LFI's public key, then base64url-decode the payload:

```typescript
function decodeJwsPayload(jws: string) {
  const [, payloadB64] = jws.split('.')
  const json = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(json)
}
```

The decoded payload contains a `message` object with the CoP result under `message.Data`:

```json
{
  "iss": "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
  "aud": ["https://tpp.example.com"],
  "iat": 1713196200,
  "nbf": 1713196200,
  "exp": 1713196500,
  "message": {
    "Data": {
      "NameMatchIndicator": "ConfirmationOfPayee.Partial",
      "MaskedName": "Ibrahim Al S*****"
    },
    "Links": {
      "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.1/confirmation"
    },
    "Meta": {}
  }
}
```

See the [POST /confirmation](./open-api/confirmation) API reference for the full request and response schema.

## Using the CoP Response in a Payment Consent

Where Confirmation of Payee has been performed for a creditor, include the **full raw JWS response string** returned by the `/confirmation` endpoint in the `ConfirmationOfPayeeResponse` field of the creditor entry inside the payment consent PII.

```json
{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ibrahim Al Suwaidi" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ibrahim Al Suwaidi" }
        },
        "ConfirmationOfPayeeResponse": "eyJhbGci..."   // full JWS string from Step 4
      }
    ]
  }
}
```

This gives the LFI confidence that the creditor account details have been verified before the payment consent was created. The value must be the complete compact JWS string — do not decode it to an object before embedding.

See [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor) for the full PII creditor schema and the creditor models (single, multiple, and open beneficiary).

See [Confirmation of Payee — User Experience](/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys) for consent and authorisation page examples across different match results.
