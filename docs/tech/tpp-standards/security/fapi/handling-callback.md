---
prev: false
next: false
aside: false
---

# Handling Authorization Callbacks

After the user approves (or declines) consent at the LFI, the Authorization Server redirects them back to your registered `redirect_uri`. How you handle this callback is security-critical — mistakes here can allow CSRF attacks, token theft, and authorization code replay.

The callback URL will be of the form:

```
https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae
```

| Parameter | Description |
|-----------|-------------|
| `code` | The authorization code to exchange at `/token`. Single-use and short-lived |
| `state` | The value you sent in the Request JWT — must match what you stored before redirecting |
| `iss` | The issuer of the Authorization Server that issued the code |

## Good Practices for Handling Authorization Callbacks

### Always Validate the `state` Parameter

Confirm that the `state` value returned in the callback matches the one you set in your [Request JWT](/tech/tpp-standards/security/fapi/request-jwt). This protects against CSRF (Cross-Site Request Forgery) attacks where a malicious page triggers an unintended authorization.

::: code-group

```typescript [Node.js]
const params = new URLSearchParams(window.location.search)
// or server-side: new URLSearchParams(req.url.split('?')[1])

const state = params.get('state')!

if (state !== storedState) {
  // Do not proceed — discard the code and show an error
  throw new Error('State mismatch — possible CSRF attack')
}
```

```python [Python]
from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
state  = params["state"][0]

if state != stored_state:
    # Do not proceed — discard the code and show an error
    raise ValueError("State mismatch — possible CSRF attack")
```

:::

### Verify the `iss` (Issuer)

Check that the `iss` parameter matches the Authorization Server you sent the `/par` request to. This ensures the response comes from the expected LFI and not a confused deputy or misconfigured redirect.

::: code-group

```typescript [Node.js]
const iss = params.get('iss')!

if (iss !== ISSUER) {
  throw new Error(`Unexpected issuer in callback: ${iss}`)
}
```

```python [Python]
iss = params["iss"][0]

if iss != ISSUER:
    raise ValueError(f"Unexpected issuer in callback: {iss}")
```

:::

### Time-Limit Callback Validity

Authorization codes are single-use and short-lived — typically valid for only a few minutes. Exchange the code immediately upon receipt.

- Exchange the code at `/token` within seconds of receiving it — do not queue or defer
- Do not accept callbacks that arrive long after the authorization request was initiated
- Once a code has been exchanged successfully, treat it as consumed and reject any attempt to use it again

::: tip Track request initiation time
Store a timestamp when you send the user to `/par`. In your callback handler, reject any callback where too much time has elapsed since that timestamp (e.g. more than 10 minutes), even if `state` is otherwise valid.
:::

### Keep Callback Logic Minimal

When handling the callback, execute only the minimum necessary logic:

1. Validate `state` and `iss`
2. Exchange the `code` for tokens at `/token`
3. Store tokens securely
4. Redirect the user to the next step in your application flow

Avoid running complex business logic, sending external requests (other than `/token`), or initiating sensitive operations at this stage. A failed or slow callback should not leave the user in an inconsistent state.

::: warning Error handling
If validation fails or the code exchange returns an error, show the user a clean error message and discard all parameters from the callback. Do not log authorization codes or tokens.
:::

## Complete Callback Handler Example

::: code-group

```typescript [Node.js]
import { buildClientAssertion } from './client-assertion'

const ISSUER       = process.env.AUTHORIZATION_SERVER_ISSUER!
const REDIRECT_URI = process.env.REDIRECT_URI!

export async function handleCallback(callbackUrl: string, session: {
  storedState: string
  codeVerifier: string
}) {
  const params = new URLSearchParams(callbackUrl.split('?')[1])

  const code  = params.get('code')
  const state = params.get('state')
  const iss   = params.get('iss')

  // 1. Validate state
  if (!state || state !== session.storedState) {
    throw new Error('State mismatch — possible CSRF attack')
  }

  // 2. Validate issuer
  if (!iss || iss !== ISSUER) {
    throw new Error(`Unexpected issuer: ${iss}`)
  }

  if (!code) {
    throw new Error('No authorization code in callback')
  }

  // 3. Exchange code for tokens immediately
  const tokenResponse = await fetch(`${ISSUER}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:            'authorization_code',
      code,
      redirect_uri:          REDIRECT_URI,
      code_verifier:         session.codeVerifier,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion:      await buildClientAssertion(),
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })

  if (!tokenResponse.ok) {
    throw new Error(`Token exchange failed: ${tokenResponse.status}`)
  }

  const { access_token, refresh_token, expires_in } = await tokenResponse.json()

  // 4. Return tokens — caller is responsible for secure storage
  return { access_token, refresh_token, expires_in }
}
```

```python [Python]
import httpx
from urllib.parse import urlparse, parse_qs

ISSUER       = os.environ["AUTHORIZATION_SERVER_ISSUER"]
REDIRECT_URI = os.environ["REDIRECT_URI"]

def handle_callback(callback_url: str, stored_state: str, code_verifier: str) -> dict:
    params = parse_qs(urlparse(callback_url).query)

    code  = params.get("code",  [None])[0]
    state = params.get("state", [None])[0]
    iss   = params.get("iss",   [None])[0]

    # 1. Validate state
    if not state or state != stored_state:
        raise ValueError("State mismatch — possible CSRF attack")

    # 2. Validate issuer
    if not iss or iss != ISSUER:
        raise ValueError(f"Unexpected issuer: {iss}")

    if not code:
        raise ValueError("No authorization code in callback")

    # 3. Exchange code for tokens immediately
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

    token_response.raise_for_status()
    tokens = token_response.json()

    # 4. Return tokens — caller is responsible for secure storage
    return {
        "access_token":  tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
        "expires_in":    tokens["expires_in"],
    }
```

:::

## Consent status in `/token` responses

On a successful `POST /token` (HTTP 200), the Authorization Server returns not only the `access_token` and `refresh_token` but also the Consent object, including its current `Status`. See the token endpoint reference for details: [CreateAccessTokenRequestV21](/tech/tpp-standards/security/tokens/open-api/token) (OpenAPI: `docs/public/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml`, schema `AEAuthorizationEndpointsV21.AEAuthorizationCodeGrantTokenResponseProperties`).

Example response:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5c",
  "token_type": "Bearer",
  "expires_in": 300,
  "authorization_details": [
    {
      "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
      "consent": {
        "Data": {
            "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
            "IsSingleAuthorization": true,
            "ExpirationDateTime": "2026-12-25T23:00:00.000Z",
            "AuthorizationExpirationDateTime": "2026-12-25T23:00:00.000Z",
            "ControlParameters": {
               "ConsentSchedule": {
                  "MultiPayment": {
                      "PeriodicSchedule": {
                          "Type": "VariableOnDemand",
                          "PeriodType": "Week",
                          "PeriodStartDate": "2026-12-01",
                          "Controls": {
                              "MaximumIndividualAmount": {
                                  "Amount": "200.00",
                                  "Currency": "AED"
                              },
                          }
                      }
                  }
              }
          },
          "PaymentPurposeCode": "ACM",
          "DebtorReference": "Test Purchase",
          "CreditorReference": "Test Purchase"
        },
        "Links": {
          "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/payment/v2.1/payment-consents/b8f42378-10ac-46a1-8d20-4e020484216d"
        },
      }
    }
  ],
  "scope": "payments openid",
  "state": "eyJhbGciOiJSUzI1NiIsInR5cC",
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cC",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cC",
}
```

Because access to resources requires both a valid access token **and** an authorized consent, the TPP can determine from this response whether resource access is permitted. 

In most flows the consent status will be `Authorized`. However, for payment (Bank Service Initiation) consents that support and require multi-authorization, the consent status may instead be `AwaitingAuthorization`, indicating the first authorizer has approved but additional authorizers are still required before a payment can be made.
