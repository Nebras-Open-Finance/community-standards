---
prev: false
next: false
aside: false
---

# Preparing the Request JWT

To send a [/par](../../v2.1/consent/open-api/par) request, you must first construct a signed **Request JWT** (also called a Request Object or JAR — JWT Authorization Request). This JWT is a signed package of all authorization parameters, proving they came from your registered application and haven't been tampered with.

<img src="/images/journeys/par_spotlight-request.png" alt="Request JWT highlighted in the PAR flow" />

::: tip Strict claim rules
For a precise per-claim reference covering `aud`, `exp`/`nbf` lifetime windows, clock skew, and the difference between the Request Object and Client Assertion, see [JWT Claim Rules](./jwt-claims).
:::

## Header

```json
{
  "alg": "PS256",
  "kid": "<your-signing-key-id>"
}
```

| Field | Value | Description |
|-------|-------|-------------|
| `alg` | `PS256` | Signing algorithm — RSA-PSS with SHA-256 |
| `kid` | string | Key ID of your signing certificate, as registered in the Trust Framework |

## Payload Claims

| Claim | Type | Required | Description | Example |
|-------|------|:--------:|-------------|---------|
| `aud` | string | ✓ | The `issuer` of the Authorization Server — found via [API Discovery](../../trust-framework/api-discovery) | `https://auth1.[LFICode].apihub.openfinance.ae` |
| `exp` | number | ✓ | Expiry as a Unix timestamp. Must be shortly after `nbf` — maximum **5 minutes** | `1713196423` |
| `iss` | string | ✓ | Your application's Client ID from the Trust Framework | `your-client-id` |
| `client_id` | string | ✓ | Your application's Client ID (same as `iss`) | `your-client-id` |
| `redirect_uri` | string | ✓ | The callback URI registered in your Trust Framework application | `https://yourapp.com/callback` |
| `scope` | string | ✓ | Space-separated [OAuth 2.0 scopes](./scopes) | `accounts openid` |
| `nonce` | string | ✓ | Random UUID — prevents replay attacks by binding the ID token to this request | `a1b2c3d4-...` |
| `state` | string | ✓ | Random UUID — returned in the redirect; prevents CSRF attacks | `e5f6g7h8-...` |
| `nbf` | number | ✓ | Not Before Unix timestamp. Set slightly before `iat` (e.g. `iat - 10`) to allow for clock skew | `1713196103` |
| `response_type` | string | ✓ | Must be `code` | `code` |
| `code_challenge_method` | string | ✓ | PKCE method — only `S256` is supported | `S256` |
| `code_challenge` | string | ✓ | Base64url-encoded SHA-256 hash of your `code_verifier` | `E9Melhoa2Ow...` |
| `max_age` | number |  | Maximum age (seconds) of the user's existing authentication session. Capped at `3600` | `3600` |
| `authorization_details` | array | ✓ | Describes what the user is consenting to — see [Consent](../../consent/api-guide) | `[{...}]` |

## Generating a PKCE Code Challenge

Before building the JWT, generate a `code_verifier` and derive the `code_challenge` from it:

```typescript
import crypto from 'node:crypto'

// Generate a cryptographically random code_verifier (43–128 chars, URL-safe)
export function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString('base64url')
}

// Derive the code_challenge (S256 = SHA-256 of the verifier, base64url-encoded)
export function deriveCodeChallenge(verifier: string): string {
  return crypto.createHash('sha256').update(verifier).digest('base64url')
}
```

Store the `code_verifier` securely — you'll need it when exchanging the authorization code for tokens.

## Building the Request JWT

```typescript
import { SignJWT, importPKCS8 } from 'jose'
import { readFileSync } from 'node:fs'
import crypto from 'node:crypto'

const ALGORITHM   = 'PS256'
const KEY_ID      = process.env.SIGNING_KEY_ID!
const CLIENT_ID   = process.env.CLIENT_ID!
const ISSUER      = process.env.AUTHORIZATION_SERVER_ISSUER!  // from .well-known
const REDIRECT_URI = process.env.REDIRECT_URI!

const privateKey = await importPKCS8(
  readFileSync('./certificates/signing.key', 'utf8'),
  ALGORITHM
)

interface RequestJWTOptions {
  scope: string
  codeChallenge: string
  authorizationDetails: unknown[]
  maxAge?: number
}

export async function buildRequestJWT({
  scope,
  codeChallenge,
  authorizationDetails,
  maxAge = 3600,
}: RequestJWTOptions): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({
    // Authorization Server identity
    aud: ISSUER,

    // Client identity
    iss: CLIENT_ID,
    client_id: CLIENT_ID,

    // Authorization parameters
    scope,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',

    // PKCE
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,

    // Security
    nonce: crypto.randomUUID(),
    state: crypto.randomUUID(),
    max_age: maxAge,

    // Consent
    authorization_details: authorizationDetails,

    // Timing
    nbf: now - 10,
    exp: now + 300,  // 5-minute expiry
  })
    .setProtectedHeader({ alg: ALGORITHM, kid: KEY_ID })
    .sign(privateKey)
}
```

## Full Example

```typescript
import { generateCodeVerifier, deriveCodeChallenge } from './pkce'
import { buildRequestJWT } from './request-jwt'

// 1. Generate PKCE pair
const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

// 2. Build the authorization_details (example: bank data sharing consent)
const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:account-access-consent:v2.1',
    consent: {
      ConsentId: crypto.randomUUID(),
      ExpirationDateTime: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      Permissions: ['ReadAccountsBasic', 'ReadBalances', 'ReadTransactionsBasic'],
      OpenFinanceBilling: {
        UserType: 'Retail',
        Purpose: 'AccountAggregation',
      },
    },
  },
]

// 3. Build and sign the Request JWT
const requestJWT = await buildRequestJWT({
  scope: 'accounts openid',
  codeChallenge,
  authorizationDetails,
})

// 4. Send to /par
const response = await fetch(`${authServerBaseUrl}/par`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ request: requestJWT }),
})
const { request_uri, expires_in } = await response.json()

// 5. Redirect the user
const authorizeUrl = new URL(`${authServerBaseUrl}/authorize`)
authorizeUrl.searchParams.set('client_id', CLIENT_ID)
authorizeUrl.searchParams.set('request_uri', request_uri)
window.location.href = authorizeUrl.toString()
```

::: tip
Store `codeVerifier` in your session — you'll need it at the [/token](../tokens/open-api/token) endpoint to exchange the authorization code for access tokens.
:::

## Encrypting the Request JWT

If the LFI requires encrypted request objects, wrap the signed JWT in a JWE before sending to `/par`. See [Message Encryption](./message-encryption).
