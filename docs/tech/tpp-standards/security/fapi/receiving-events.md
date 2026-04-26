---
prev: false
next: false
aside: false
---

🕒 **2 minute read**

# Receiving Event Notifications

When the API Hub delivers a webhook event (such as a Payment Status or Consent Status change), it POSTs a **JWE compact serialisation** to your registered webhook URL. The JWE is encrypted with your public **Encryption Certificate**, and the decrypted payload is a signed JWT (JWS) containing the event.

This page covers how to correctly decrypt, verify, and validate the event in line with the FAPI 2.0 Security Profile.

## Step 1 — Read the `kid` and select the right key

The JWE protected header identifies which of your registered encryption keys was used via the `kid` claim. Decode the first segment to read it before attempting decryption:

::: code-group

```typescript [Node.js]
function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const kid = getJweKid(jweString)
const privateKey = myKeyStore.getPrivateKey(kid)
```

```python [Python]
import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

kid = get_jwe_kid(jwe_string)
private_key = my_key_store.get_private_key(kid)
```

:::

::: tip Multiple encryption keys
Keep retired private keys available until you are confident no in-flight events were encrypted with them — the `kid` tells you exactly which key to use.
:::

## Step 2 — Decrypt the JWE

Decrypt the JWE using the private key selected above. The result is the inner JWS:

::: code-group

```typescript [Node.js (jose)]
import { compactDecrypt, importPKCS8 } from 'jose'

const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)
const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(jweString, privateKey)
const jwsString = new TextDecoder().decode(plaintext)
```

```python [Python (jwcrypto)]
from jwcrypto import jwe as jwecrypto

token = jwecrypto.JWE()
token.deserialize(jwe_string, key=private_key)
jws_string = token.payload.decode()
```

:::

## Step 3 — Verify the JWS signature and validate claims

The inner JWS is signed by the API Hub. Verify the signature using the Hub's public JWKS, then validate the JWT claims.

::: code-group

```typescript [Node.js (jose)]
import { createLocalJWKSet, jwtVerify } from 'jose'

// Fetch Hub JWKS from the Hub's .well-known/openid-configuration
const hubJwks = createLocalJWKSet(await fetchHubJwks())

const { payload } = await jwtVerify(jwsString, hubJwks, {
  issuer:   expectedLfiIssuer,   // see security checks below
  audience: process.env.CLIENT_ID,
})

return payload.message
```

```python [Python (jwcrypto)]
import json
from jwcrypto import jwt

hub_key = fetch_hub_public_key()
verified = jwt.JWT(key=hub_key, jwt=jws_string)
claims = json.loads(verified.claims)

# Perform claim validation manually — see security checks below
return claims["message"]
```

:::

## Security Checks

After decrypting and verifying the signature, validate the following claims before processing the event. These checks are required by the FAPI 2.0 Security Profile.

| Check | Claim | What to verify |
|-------|-------|----------------|
| Issuer | `iss` | Must match the issuer of the LFI that owns the consent — cross-reference with the `ConsentId` in `Meta`. Reject events where `iss` does not match the expected LFI to prevent an event from one LFI being replayed against a consent held at another. |
| Audience | `aud` | Must contain your application's `client_id`. Reject events addressed to a different client. |
| Expiry | `exp` | Must be in the future. Reject expired tokens. |
| Not Before | `nbf` | If present, must not be in the future. |
| Replay | `jti` | If present, record the value and reject any future event with the same `jti`. This prevents a delivered event from being replayed. |
| Consent match | `Meta.ConsentId` | Must correspond to a consent your application created. Discard events for unknown consent IDs. |

::: warning Issuer validation is critical
Always verify that `iss` corresponds to the LFI tied to the consent in `Meta.ConsentId`. Without this check, a malicious actor could craft or replay an event from a different LFI to influence your application's view of a consent it holds elsewhere.
:::

### Example validation (Node.js)

```typescript
import { createLocalJWKSet, jwtVerify } from 'jose'

async function processWebhookEvent(jweString: string) {
  // 1. Decrypt
  const kid = getJweKid(jweString)
  const privateKey = await importPKCS8(myKeyStore.getPrivateKeyPem(kid), 'RSA-OAEP-256')
  const { plaintext } = await compactDecrypt(jweString, privateKey)
  const jwsString = new TextDecoder().decode(plaintext)

  // 2. Decode header to read kid before verifying (Hub signs with its own key)
  const [, payloadB64] = jwsString.split('.')
  const unverified = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
  const consentId = unverified?.message?.Meta?.ConsentId

  // 3. Look up the expected LFI issuer from your consent store
  const expectedIssuer = myConsentStore.getIssuer(consentId)
  if (!expectedIssuer) throw new Error(`Unknown consentId: ${consentId}`)

  // 4. Verify signature and standard claims
  const hubJwks = createLocalJWKSet(await fetchHubJwks())
  const { payload } = await jwtVerify(jwsString, hubJwks, {
    issuer:   expectedIssuer,
    audience: process.env.CLIENT_ID,
  })

  // 5. Replay check
  if (payload.jti && seenJtis.has(payload.jti)) {
    throw new Error(`Replayed event jti: ${payload.jti}`)
  }
  if (payload.jti) seenJtis.add(payload.jti)

  return payload.message
}
```
