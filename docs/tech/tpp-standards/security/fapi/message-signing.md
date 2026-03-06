---
prev: false
next: false
aside: false
---

# Message Signing (JWS)

A **JWS** (JSON Web Signature — [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515)) is the cryptographic mechanism that signs a JSON payload to prove two things:

1. **Authenticity** — it genuinely came from the holder of the private key
2. **Integrity** — the content has not been modified since it was signed

In UAE Open Finance, signing is required whenever your application sends a JWT to an Authorization Server:

- The **Request Object** sent to [/par](../../v2.1/consent/open-api/par)
- The **Client Assertion** sent to [/token](../tokens/open-api/token)

## Structure of a Signed JWT

A signed JWT consists of three base64url-encoded parts joined by `.`:

```
base64url(header) . base64url(payload) . base64url(signature)
```

### Header

```json
{
  "alg": "PS256",
  "kid": "<your-signing-key-id>"
}
```

| Field | Value | Description |
|-------|-------|-------------|
| `alg` | `PS256` | RSA-PSS with SHA-256. The only algorithm supported by the UAE Open Finance FAPI profile |
| `kid` | string | The Key ID of your signing certificate, as registered in the Trust Framework |

Your `kid` is assigned by the Trust Framework when your signing certificate is issued. Find it on the certificate detail page: Application → App Certificates → select the certificate. See [Finding Your Key ID](../../trust-framework/certificates#finding-your-key-id-kid) for a screenshot.

### Payload

The payload is a JSON object of claims. The structure depends on the use case — see [Request JWT](./request-jwt) and [Client Assertion](../tokens/client-assertion) for the specific claim sets.

All signed JWTs must include timing claims to prevent replay attacks:

| Claim | Description |
|-------|-------------|
| `iat` | Issued At — current Unix timestamp |
| `nbf` | Not Before — slightly before `iat` to allow for clock skew (e.g. `iat - 10`) |
| `exp` | Expiry — short-lived; typically 5 minutes (`iat + 300`) |

## Prerequisites

Before signing, ensure you have:

- An **application registered** in the Trust Framework with an appropriate role
- A **valid signing certificate** and its corresponding private key
- The **Key ID (`kid`)** of your signing certificate from the Trust Framework

## Signing a JWT

The following example uses the [`jose`](https://github.com/panva/jose) library (available for Node.js, browsers, Deno, and Cloudflare Workers).

::: code-group

```typescript [Node.js (jose)]
import { SignJWT, importPKCS8 } from 'jose'
import { readFileSync } from 'node:fs'

const ALGORITHM = 'PS256'
const KEY_ID = process.env.SIGNING_KEY_ID!      // kid from Trust Framework
const CLIENT_ID = process.env.CLIENT_ID!          // your application's client_id
const ISSUER = process.env.AUTHORIZATION_SERVER_ISSUER! // from .well-known

const privateKeyPem = readFileSync('./certificates/signing.key', 'utf8')
const privateKey = await importPKCS8(privateKeyPem, ALGORITHM)

/**
 * Sign a payload as a FAPI-compliant JWS.
 * Caller provides the domain-specific claims; timing claims are added automatically.
 */
export async function signJWT(
  claims: Record<string, unknown>,
  expiresInSeconds = 300
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({
    ...claims,
    iat: now,
    nbf: now - 10,       // 10-second clock skew buffer
    exp: now + expiresInSeconds,
  })
    .setProtectedHeader({ alg: ALGORITHM, kid: KEY_ID })
    .sign(privateKey)
}
```

```python [Python (PyJWT)]
import jwt
import time
import uuid
from cryptography.hazmat.primitives.serialization import load_pem_private_key

ALGORITHM = "PS256"
KEY_ID = "your-signing-key-id"          # kid from Trust Framework
CLIENT_ID = "your-client-id"
ISSUER = "https://auth.[lfi].apihub.openfinance.ae"

with open("./certificates/signing.key", "rb") as f:
    private_key = load_pem_private_key(f.read(), password=None)

def sign_jwt(claims: dict, expires_in: int = 300) -> str:
    now = int(time.time())
    payload = {
        **claims,
        "iat": now,
        "nbf": now - 10,
        "exp": now + expires_in,
    }
    return jwt.encode(
        payload,
        private_key,
        algorithm=ALGORITHM,
        headers={"kid": KEY_ID},
    )
```

:::

::: tip Removing whitespace from PEM keys
Some environments require the PEM key to have no line breaks when passed as an environment variable. Strip them with:
```bash
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' signing.key
```
:::

::: tip Testing signing on the sandbox
The sandbox provides **O3 Utility endpoints** that accept your private key and return ready-made signed JWTs — useful for validating your signing setup before writing your own code. See [O3 Sandbox Utilities](./o3-utils).
:::

## Verifying a Signature

LFIs will verify your signatures using your **public key** fetched from your application's JWKS URI in the Trust Framework. You do not need to implement verification yourself, but it is useful for testing:

```typescript
import { jwtVerify, createRemoteJWKSet } from 'jose'

const JWKS = createRemoteJWKSet(
  new URL('https://keystore.directory.openfinance.ae/[your-org-id]/application.jwks')
)

const { payload, protectedHeader } = await jwtVerify(token, JWKS, {
  algorithms: ['PS256'],
})
```
