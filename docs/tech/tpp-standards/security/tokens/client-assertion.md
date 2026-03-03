---
prev: false
next: false
aside: false
---

## Generating a Client Assertion

Every call to the `/token` endpoint must be accompanied by a **client assertion** — a short-lived, signed JWT that proves your application's identity to the Authorization Server. This replaces a client secret.

### Structure

The client assertion is built from three parts:

```json
{
  "header": {
    "alg": "PS256",
    "kid": "{{kid-local}}"
  },
  "body": {
    "aud": "{{issuer}}",
    "exp": {{exp}},
    "iss": "{{_clientId}}",
    "sub": "{{_clientId}}",
    "jti": "{{$guid}}",
    "iat": {{nbf}}
  },
  "signingKeyPEM": "{{pem-local}}"
}
```

### Claims

#### Header

| Field | Value | Description |
|-------|-------|-------------|
| `alg` | `PS256` | Algorithm used to sign the JWT. Required by the FAPI 2.0 security profile |
| `kid` | string | Key ID of your signing certificate, as registered in the Trust Framework |

#### Body

| Claim | Description | Example |
|-------|-------------|---------|
| `aud` | The Authorization Server's issuer URI — obtained from the `.well-known` discovery endpoint | `https://auth.[LFICode].apihub.openfinance.ae` |
| `iss` | Your application's `client_id` from the Trust Framework | `a1b2c3d4-...` |
| `sub` | Same as `iss` — your `client_id` | `a1b2c3d4-...` |
| `iat` | Unix timestamp of when the JWT was issued | `1713196123` |
| `exp` | Unix timestamp when the JWT expires. Keep this short — 5 minutes is standard | `1713196423` |
| `jti` | A unique identifier (UUID) for this assertion. Prevents replay attacks | `f47ac10b-58cc-...` |

#### Signing key

| Field | Description |
|-------|-------------|
| `signingKeyPEM` | Your private signing key in PEM format, used to sign the JWT. Strip all whitespace and line breaks before use |

### Signing the assertion

Once the structure is prepared, sign it as a JWS using the `PS256` algorithm and your private signing key. See [Message Signing (JWS)](/tech/tpp-standards/security/fapi/message-signing) for the signing helper and full code examples in TypeScript and Python.
