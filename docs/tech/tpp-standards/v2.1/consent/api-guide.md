---
next: false
prev: false
aside: false
---

🕒 **10 minute read**

# Consent - API Guide

In UAE Open Finance, a **Consent** is a structured, user-authorized agreement that grants a TPP specific rights to access data or initiate payments on a user's behalf. All API access is consent-bound — you cannot call a resource endpoint without a valid, authorized consent.

Consents are created through the **Pushed Authorization Request** flow ([FAPI 2.0 PAR](../security/fapi)). Rather than creating a consent resource directly, the TPP embeds the consent definition inside a signed Request JWT and pushes it to the Authorization Server. The user then authenticates at the LFI and explicitly authorizes the consent.

## Consent Types

| Type | `authorization_details.type` | Used For |
|------|------------------------------|----------|
| Bank Data Sharing | `urn:openfinanceuae:account-access-consent:v2.1` | Reading account information, balances, transactions |
| Service Initiation | `urn:openfinanceuae:service-initiation-consent:v2.1` | Initiating domestic payments |

## API Sequence Flow

<APIFlowsConsentFlow/>

## The Consent Flow

All consent types follow the same authorization pattern:

```
1. Build authorization_details  →  POST /par  →  request_uri
2. Redirect user to bank        →  user authenticates and authorizes
3. Bank redirects back          →  authorization code in callback
4. Exchange code                →  POST /token  →  access_token + refresh_token
5. Retrieve consent             →  GET /account-access-consents/{ConsentId}
                                    or GET /payment-consents/{ConsentId}
```

For the full construction of `authorization_details` — including field tables, PII encryption, and code examples — see the specific API guides:

- [Bank Data Sharing — API Guide](../banking/data-sharing/api-guide)
- [Single Instant Payment — API Guide](../banking/service-initiation/domestic-payments/single-instant-payment/api-guide)

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/par`

Push the signed Request JWT to the Authorization Server. The `authorization_details` inside the JWT carries the full consent definition — account permissions, payment amounts, billing details, and (for payments) encrypted PII.

::: code-group

```typescript [Node.js]
const parResponse = await fetch(`${ISSUER}/par`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    request:               requestJWT,           // signed Request JWT containing authorization_details
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { request_uri } = await parResponse.json()
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

See [Preparing the Request JWT](/tech/tpp-standards/security/fapi/request-jwt) for how to build and sign the Request JWT, and [POST /par](/tech/tpp-standards/v2.1/consent/open-api/par) for the full API reference.

## Redirecting the User

Build the authorization URL using the `authorization_endpoint` from the LFI's `.well-known/openid-configuration` and the `request_uri` returned by `/par`:

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
```

:::

The user will authenticate with their bank and authorize the consent on the LFI's authorization screen.

## Handling the Callback

After authorization, the LFI redirects the user back to your `redirect_uri`:

```
https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae
```

Always validate `state` and `iss` before proceeding. See [Handling Authorization Callbacks](/tech/tpp-standards/security/fapi/handling-callback) for the full security guide.

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/token`

Exchange the authorization code for an access token and refresh token. The `code_verifier` must match the `code_challenge` sent in the Request JWT (PKCE).

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

The access token is consent-bound — it carries the scope and `ConsentId` granted during authorization. See [Tokens & Assertions](/tech/tpp-standards/security/tokens) for token lifetimes and the refresh flow.

## Retrieving the Consent

After obtaining an access token, retrieve the consent to confirm it has moved to the `Authorized` state before making resource API calls. The endpoint differs by consent type.

### Bank Data Sharing

::: code-group

```typescript [Node.js]
const LFI_API_BASE = process.env.LFI_API_BASE_URL!

const consentResponse = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/account-access-consents/${consentId}`,
  {
    headers: { Authorization: `Bearer ${access_token}` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, Permissions, ExpirationDateTime } } =
  await consentResponse.json()

if (Status !== 'Authorized') {
  throw new Error(`Consent not authorized: ${Status}`)
}
```

```python [Python]
consent_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/account-access-consents/{consent_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data   = consent_response.json()["Data"]
status = data["Status"]

if status != "Authorized":
    raise ValueError(f"Consent not authorized: {status}")
```

:::

See [GET /account-access-consents/{ConsentId}](/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId) for the full response schema.

### Service Initiation

::: code-group

```typescript [Node.js]
const consentResponse = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/payment-consents/${consentId}`,
  {
    headers: { Authorization: `Bearer ${access_token}` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, ControlParameters, ExpirationDateTime } } =
  await consentResponse.json()

if (Status !== 'Authorized') {
  throw new Error(`Consent not authorized: ${Status}`)
}
```

```python [Python]
consent_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/payment-consents/{consent_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data   = consent_response.json()["Data"]
status = data["Status"]

if status != "Authorized":
    raise ValueError(f"Consent not authorized: {status}")
```

:::

See [GET /payment-consents/{ConsentId}](/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId) for the full response schema.

::: info Consent States
A consent moves through a defined lifecycle — `AwaitingAuthorization` → `Authorized` → `Consumed` / `Expired` / `Revoked`. See [Consent States](./consent-states) for the full state machine and transition rules.
:::
