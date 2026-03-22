---
next: false
prev: false
aside: false
---

# ATMs - API Guide

The ATM API exposes a single endpoint — `GET /atms` — that returns all ATM records published by a participating LFI. No user consent or redirect is required; the TPP authenticates directly using a client credentials grant.

## Prerequisites

Before calling the ATM API, ensure the following requirements are met:

- **Registered [Application](/tech/tpp-standards/trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **BDSP role** as defined in [Roles](/tech/tpp-standards/trust-framework/roles).

- **Valid [Transport Certificate](/tech/tpp-standards/trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication** with the LFI.

- **Valid [Signing Certificate](/tech/tpp-standards/trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework for client authentication.

- **Understanding of [Tokens & Assertions](/tech/tpp-standards/security/tokens)**
  You should understand how client authentication works with `private_key_jwt` before calling the token endpoint.

## API Sequence Flow

<APIFlowViewer title="ATM API Flow">
  <APIFlowsATMs/>
</APIFlowViewer>

## Step 1 — Build a Client Assertion

The ATM API uses the OAuth 2.0 **client credentials** grant with `scope=atm`.

Use the [`signJWT()`](/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt) helper to build a short-lived JWT asserting your application's identity:

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.LFI_ISSUER!   // from the LFI's .well-known/openid-configuration

const clientAssertion = await signJWT({
  iss: CLIENT_ID,
  sub: CLIENT_ID,
  aud: ISSUER,
  jti: crypto.randomUUID(),
})
```

```python [Python]
import os, uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER    = os.environ["LFI_ISSUER"]   # from the LFI's .well-known/openid-configuration

client_assertion = sign_jwt({
    "iss": CLIENT_ID,
    "sub": CLIENT_ID,
    "aud": ISSUER,
    "jti": str(uuid.uuid4()),
})
```

:::

See [Client Assertion](/tech/tpp-standards/security/tokens/client-assertion) for the full claims reference.

## Step 2 — Token Request

POST to the LFI's token endpoint with `scope=atm`:

::: code-group

```typescript [Node.js]
const TOKEN_ENDPOINT = process.env.LFI_TOKEN_ENDPOINT!

const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'atm',
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      clientAssertion,
})

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token } = await tokenResponse.json()
```

```python [Python]
import httpx, os

token_endpoint = os.environ["LFI_TOKEN_ENDPOINT"]

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "atm",
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      client_assertion,
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]
```

:::

## Step 3 — GET /atms

Call the endpoint with the access token. Include `x-fapi-interaction-id` on every request. See [Request Headers](/tech/tpp-standards/security/request-headers).

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'

const API_BASE = process.env.LFI_API_BASE!

const response = await fetch(`${API_BASE}/open-finance/atm/v2.1/atms`, {
  method: 'GET',
  headers: {
    'Authorization':         `Bearer ${access_token}`,
    'x-fapi-interaction-id': crypto.randomUUID(),
  },
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { Data, Meta } = await response.json()
// Data — array of ATM records
// Meta.TotalRecords — total count
// Meta.LastUpdatedDateTime — when the data was last refreshed
```

```python [Python]
import httpx, uuid, os

api_base = os.environ["LFI_API_BASE"]

response = httpx.get(
    f"{api_base}/open-finance/atm/v2.1/atms",
    headers={
        "Authorization":         f"Bearer {access_token}",
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    # cert=("transport.crt", "transport.key"),
)

payload      = response.json()
atms         = payload["Data"]
total        = payload["Meta"]["TotalRecords"]
last_updated = payload["Meta"]["LastUpdatedDateTime"]
```

:::

### Response structure

```json
{
  "Data": [
    {
      "ATMId": "ATM-001",
      "LFIId": "ADCB",
      "LFIBrandId": "ADCB",
      "SupportedCurrencies": ["AED"],
      "SupportedLanguages": ["en", "ar"],
      "Services": ["CashWithdrawal", "Balance", "MiniStatement", "PINChange"],
      "Accessibility": ["WheelchairAccess", "AudioCashMachine"],
      "IsAccess24Hour": true,
      "Availability": {
        "Status": "Available"
      },
      "MinimumPossibleAmount": { "Amount": "20.00", "Currency": "AED" },
      "MaximumPossibleAmount": { "Amount": "5000.00", "Currency": "AED" },
      "Location": {
        "LocationCategory": ["BranchExternal"],
        "PostalAddress": {
          "StreetName": "Corniche Road",
          "TownName": "Abu Dhabi",
          "CountrySubDivision": "AbuDhabi",
          "Country": "AE"
        },
        "GeoLocation": {
          "Latitude": "24.4539",
          "Longitude": "54.3773"
        }
      }
    }
  ],
  "Meta": {
    "TotalRecords": 1,
    "LastUpdatedDateTime": "2025-03-21T08:00:00Z"
  }
}
```

See the [GET /atms](./open-api/atms) API reference for the full response schema.
