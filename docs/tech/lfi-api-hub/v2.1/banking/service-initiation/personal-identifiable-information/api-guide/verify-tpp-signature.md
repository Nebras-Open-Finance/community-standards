---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Verifying the TPP JWS Signature

::: info This step is optional
The `PersonalIdentifiableInformation` field is embedded within a request that the API Hub has already verified was signed by the TPP. The outer JWS signature confirms that the PII was submitted by the authenticated TPP and has not been modified in transit.

Verifying the inner JWS signature on the PII payload is therefore **not required**, but LFIs may choose to implement it as a defence-in-depth measure.
:::

## When to consider this

You may want to verify the TPP's JWS signature on the PII if:

- Your security policy requires independent verification of all signed payloads, regardless of upstream validation.
- You want to confirm the specific TPP identity that constructed the PII (available in the `iss` and `sub` claims).
- You are building an audit trail that requires cryptographic proof tied to the TPP's signing key.

## How to verify

The inner JWS (the result of decrypting the JWE) is signed by the TPP using their signing key. The JWS header contains the `kid` of the TPP's signing key, and the `iss` / `sub` claims identify the TPP's `client_id`.

### Step 1 — Discover the TPP's JWKS

The TPP's public signing keys are published through the Trust Framework directory. You can resolve the TPP's JWKS URI using the `o3-caller-software-statement-id` header from the inbound request:

```
https://keystore.directory.openfinance.ae/[software-statement-id]/application.jwks
```

### Step 2 — Verify the JWS

::: code-group

```typescript [Node.js (jose)]
import { createRemoteJWKSet, jwtVerify } from 'jose'

async function verifyTPPSignature(
  jwsString: string,
  softwareStatementId: string
): Promise<Record<string, unknown>> {
  // 1. Build a JWKS resolver for the TPP's published keys
  const jwksUri = `https://keystore.directory.openfinance.ae/${softwareStatementId}/application.jwks`
  const jwks = createRemoteJWKSet(new URL(jwksUri))

  // 2. Verify the signature and validate standard claims
  const { payload } = await jwtVerify(jwsString, jwks)

  return payload
}
```

```python [Python (jwcrypto)]
import json
import requests
from jwcrypto import jwt, jwk

def verify_tpp_signature(jws_string: str, software_statement_id: str) -> dict:
    # 1. Fetch the TPP's published keys
    jwks_uri = f"https://keystore.directory.openfinance.ae/{software_statement_id}/application.jwks"
    response = requests.get(jwks_uri)
    keyset = jwk.JWKSet.from_json(response.text)

    # 2. Verify the signature
    verified = jwt.JWT(key=keyset, jwt=jws_string)
    return json.loads(verified.claims)
```

:::

### Claims to validate

If you verify the JWS, you SHOULD also validate the following claims:

| Claim | Validation |
|-------|------------|
| `iss` | Must match the TPP's `client_id` (available in the `o3-caller-client-id` request header) |
| `sub` | Must match the TPP's `client_id` |
| `aud` | Must contain your LFI's issuer identifier |
| `exp` | Must not be expired |
| `iat` | Must be in the past |
| `jti` | Record for replay detection if required by your security policy |
