---
prev: false
next: false
aside: false
---

# Message Encryption (JWE)

A **JWE** (JSON Web Encryption — [RFC 7516](https://datatracker.ietf.org/doc/html/rfc7516)) is the cryptographic mechanism that encrypts a payload so that only the intended recipient can read it.

In UAE Open Finance, encryption is used to protect the **Request Object** sent to `/par`. When enabled, the signed JWT (JWS) is wrapped inside an encrypted envelope (JWE), producing a **Nested JWT** — a structure that is both signed and encrypted.

## Structure of an Encrypted JWT

A compact-serialised JWE consists of five base64url-encoded parts joined by `.`:

```
base64url(header) . base64url(encrypted-key) . base64url(iv) . base64url(ciphertext) . base64url(tag)
```

### Header

```json
{
  "alg": "RSA-OAEP-256",
  "enc": "A256GCM",
  "kid": "<lfi-encryption-key-id>"
}
```

| Field | Value | Description |
|-------|-------|-------------|
| `alg` | `RSA-OAEP-256` | Key-wrapping algorithm — encrypts the content encryption key using the LFI's RSA public key |
| `enc` | `A256GCM` | Content encryption algorithm — encrypts the actual payload using AES-256-GCM |
| `kid` | string | Key ID of the LFI's encryption key, taken from their JWKS |

## Creating a JWE

### Step 1 — Discover the JWKS URI

Each LFI publishes its public keys at a JWKS URI. You can find this URI by performing [API Discovery](../../trust-framework/api-discovery) via the `.well-known` endpoint.

The JWKS URI follows this format:

```
https://keystore.directory.openfinance.ae/[LFI-UUID]/application.jwks
```

### Step 2 — Select the Encryption Key

Fetch the JWKS and find a key where `"use": "enc"`. This is the LFI's public key intended for encryption.

**Example encryption key from a JWKS:**

```json
{
  "kty": "RSA",
  "use": "enc",
  "n": "z0gtRfUg24gtrhME8LZL8wl-LsN-Sv-t8DMqXrl2u10j7eaPI4Tj9Ai5WPlxJIIvUnuoHs8MWp-ZpTvThZkvfIrnh4QEjUbkmNK5z_7ZqmomGijVDC-pPLaDsqOmeifSUpMj5rul5b8v5fO86oeB3meUKFTbn_C_RZo8wUQ-DIuzWgbfu7vr2YfAtIVwF_rsOeYo2BM2MfREuG9hkDX6cVs2nssQGGbWn2wlGgyxwIT9N764qhmnzCRMAcJCFQWZSdJZWo37T9JYVoYyhGSkxjnC-GLEEovFTn2VMWZAEIzgZnRrGtjaegvyzIuZxz8Ehle7P9qlZsAsTHyZrKOGNQ",
  "e": "AQAB",
  "kid": "s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs",
  "x5u": "https://keystore.sandbox.directory.openfinance.ae/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c/s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs.pem",
  "x5t#S256": "s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs",
  "x5dn": "OU=4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c,O=MASHREQBANK PSC,C=AE"
}
```

::: warning Key selection
If the JWKS contains multiple keys, always select the one where `"use": "enc"`. Do not use a signing key (`"use": "sig"`) for encryption — the operations are not interchangeable.
:::

### Step 3 — Encrypt the Payload

The payload to encrypt is the **signed Request JWT** produced in [Message Signing](./message-signing). The result is a Nested JWT.

::: code-group

```typescript [Node.js (jose)]
import { importJWK, CompactEncrypt } from 'jose'

interface JWK {
  use: string
  kid: string
  [key: string]: unknown
}

/**
 * Encrypt a signed JWT (JWS) into a Nested JWT (JWE).
 * @param signedJWT - The compact JWS produced by signJWT()
 * @param jwksUri   - The LFI's JWKS URI from .well-known
 */
export async function encryptRequestObject(
  signedJWT: string,
  jwksUri: string
): Promise<string> {
  // 1. Fetch the LFI's public keys
  const response = await fetch(jwksUri)
  const { keys } = await response.json() as { keys: JWK[] }

  // 2. Find the encryption key
  const encKeyJwk = keys.find(k => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  // 3. Import the public key
  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  // 4. Encrypt — payload is the signed JWT as bytes
  const jwe = await new CompactEncrypt(new TextEncoder().encode(signedJWT))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
      cty: 'JWT',   // Content-Type: JWT (signals this is a Nested JWT)
    })
    .encrypt(encKey)

  return jwe
}
```

```python [Python (python-jose)]
from jose import jwe
from jose.utils import base64url_encode
import requests
import json

def encrypt_request_object(signed_jwt: str, jwks_uri: str) -> str:
    # 1. Fetch the LFI's public keys
    response = requests.get(jwks_uri)
    keys = response.json()["keys"]

    # 2. Find the encryption key
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    # 3. Encrypt
    return jwe.encrypt(
        signed_jwt.encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
        cty="JWT",
    ).decode()
```

:::

::: tip Testing encryption on the sandbox
The sandbox provides an **O3 Utility endpoint** that accepts your private key and JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See [O3 Sandbox Utilities](./o3-utils#example-1-o3-util-prepare-encrypted-pii).
:::

## Producing a Nested JWT (Signed + Encrypted)

A Nested JWT is a JWS wrapped inside a JWE. The complete flow is:

```
1. Build the Request JWT payload (claims)
        ↓
2. Sign it → compact JWS  (see Message Signing)
        ↓
3. Encrypt the JWS → compact JWE  (this page)
        ↓
4. Send the JWE as the `request` parameter in /par
```

::: code-group

```typescript [Full example]
import { signJWT } from './sign-jwt'           // from Message Signing page
import { encryptRequestObject } from './encrypt' // from above

const jwksUri = 'https://keystore.directory.openfinance.ae/[lfi-uuid]/application.jwks'

// 1. Build and sign
const signedJWT = await signJWT({
  aud: process.env.AUTHORIZATION_SERVER_ISSUER,
  iss: process.env.CLIENT_ID,
  client_id: process.env.CLIENT_ID,
  // ... all request claims (see Request JWT page)
})

// 2. Encrypt
const nestedJWT = await encryptRequestObject(signedJWT, jwksUri)

// 3. Send to /par
const params = new URLSearchParams({ request: nestedJWT })
const response = await fetch(`${authServerBaseUrl}/par`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: params,
})
```

:::
