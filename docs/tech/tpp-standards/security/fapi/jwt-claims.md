---
prev: false
next: false
aside: false
---

# JWT Claim Rules

UAE Open Finance requires two distinct signed JWTs in every authorization flow. Their claim rules differ in ways that are easy to confuse. This page is the single authoritative reference for both.

| JWT | Sent to | Purpose |
|-----|---------|---------|
| **Request Object** (JAR) | `/par` as `request=` | Carries all authorization parameters in a tamper-proof, signed envelope |
| **Client Assertion** | `/par` and `/token` as `client_assertion=` | Proves your application's identity to the Authorization Server — replaces a client secret |

::: warning Same endpoint, two different JWTs
Both JWTs are sent to `/par` in the same request, but they serve entirely separate purposes. Mixing up their claim rules — particularly `jti` and `sub` — is the most common source of `400 Bad Request` errors.
:::



## JOSE Header (both JWTs)

```json
{
  "alg": "PS256",
  "kid": "<your-signing-key-id>"
}
```

| Field | Rule |
|-------|------|
| `alg` | **Must be `PS256`** — the only algorithm accepted in the UAE Open Finance FAPI profile |
| `kid` | The thumbprint of your signing certificate, as registered in the Trust Framework. The Authorization Server uses this to fetch your public key and verify the signature |
| `typ` | Optional. Not required by the profile |

::: danger No algorithm flexibility
ES256, RS256, and HS256 are not accepted. Any JWT signed with a non-PS256 algorithm will be rejected.
:::



## Request Object (JAR)

The Request Object is a signed JWT whose payload contains all `/par` authorization parameters. It is sent as the `request` form parameter.

### Claims

| Claim | Type | Required | Rule | Example |
|-------|------|:--------:|------|---------|
| `aud` | string | ✓ | **The Authorization Server's `issuer` value** — from the LFI's `.well-known/openid-configuration`. This is not the token endpoint URL. | `https://auth1.altareq1.sandbox.apihub.openfinance.ae` |
| `iss` | string | ✓ | Your application's `client_id` from the Trust Framework | `a1b2c3d4-5678-...` |
| `client_id` | string | ✓ | Same value as `iss` | `a1b2c3d4-5678-...` |
| `exp` | number | ✓ | Unix timestamp. Must be **no more than 10 minutes after `nbf`**. Recommended: `nbf + 300` (5 minutes) | `1713196423` |
| `nbf` | number | ✓ | Unix timestamp. Must be **no more than 10 minutes in the past** at the time the Authorization Server processes the request. Recommended: `iat - 10` | `1713196103` |
| `response_type` | string | ✓ | Must be `code` | `code` |
| `scope` | string | ✓ | Space-separated OAuth 2.0 scopes — see [Scopes](./scopes) | `payments openid` |
| `redirect_uri` | string | ✓ | Must exactly match a URI registered in the Trust Framework | `https://yourapp.com/callback` |
| `nonce` | string | ✓ | A fresh UUID for every request. Bound to the ID token — prevents ID token replay | `f47ac10b-58cc-...` |
| `state` | string | ✓ | A fresh UUID for every request. Returned in the redirect — prevents CSRF | `e5f6g7h8-...` |
| `code_challenge` | string | ✓ | Base64url-encoded SHA-256 hash of your `code_verifier` (PKCE) | `E9Melhoa2Ow...` |
| `code_challenge_method` | string | ✓ | Must be `S256` — only PKCE method supported | `S256` |
| `authorization_details` | array | ✓ | RAR object describing the consent — see [Consent API Guide](../../v2.1/consent/api-guide) | `[{...}]` |
| `max_age` | number | | Maximum authentication age in seconds. Capped at `3600` | `3600` |
| `jti` | string | | Not required in the Request Object. Use `nonce` for replay prevention instead | — |

### `aud` — issuer, not token endpoint

The `aud` claim must be the Authorization Server's **issuer identifier**, not the token endpoint URL.

```
✅  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae"
❌  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/token"
❌  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/par"
```

Find the correct value from the LFI's `.well-known/openid-configuration` under the `issuer` key.

### Lifetime window

```
nbf ──────────────────────── exp
 │        max 10 minutes       │
 │   recommended 5 minutes     │
```

The Authorization Server checks that:
- `nbf` is no more than **10 minutes in the past**
- `exp` is no more than **10 minutes after `nbf`**
- The current time falls between `nbf` and `exp`

Clock skew between your server and the Authorization Server can cause rejections. Always set `nbf` slightly in the past (`iat - 10`) to absorb up to 10 seconds of drift.



## Client Assertion (`private_key_jwt`)

The Client Assertion proves your application's identity to the Authorization Server. It is sent as `client_assertion` with `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

It must be sent to **both** `/par` and `/token`. A **fresh assertion with a new `jti` must be generated for every request** — the same assertion cannot be reused.

### Claims

| Claim | Type | Required | Rule | Example |
|-------|------|:--------:|------|---------|
| `aud` | string | ✓ | **The Authorization Server's `issuer` value** — same source as the Request Object `aud`. Not the token endpoint URL | `https://auth1.altareq1.sandbox.apihub.openfinance.ae` |
| `iss` | string | ✓ | Your application's `client_id` | `a1b2c3d4-5678-...` |
| `sub` | string | ✓ | Your application's `client_id` — **must equal `iss`** | `a1b2c3d4-5678-...` |
| `iat` | number | ✓ | Unix timestamp of issuance | `1713196113` |
| `exp` | number | ✓ | Unix timestamp. Keep short-lived — **maximum 5 minutes** after `iat`. Recommended: `iat + 300` | `1713196413` |
| `jti` | string | ✓ | A unique identifier (UUID) for **this specific assertion**. The Authorization Server records seen `jti` values and will reject any reuse. Generate a fresh UUID for every request | `c770aef3-6784-...` |
| `nbf` | number | | Not Before. If provided, set to `iat - 10` to absorb clock skew | `1713196103` |

### `sub` must equal `iss`

```
✅  iss: "a1b2c3d4-...", sub: "a1b2c3d4-..."   (same client_id)
❌  iss: "a1b2c3d4-...", sub: ""               (empty)
❌  sub omitted entirely
```

### `jti` replay prevention

The `jti` must be a UUID that has never been used before with this Authorization Server. Reusing a `jti` — even from seconds earlier — will result in a `400` or `401` rejection.

```
✅  jti: crypto.randomUUID()    ← fresh UUID every time
❌  jti: "fixed-string"         ← rejected on second use
❌  jti omitted
```

### Lifetime window

```
iat ────────────── exp
 │   max 5 minutes  │
```

Unlike the Request Object, there is no `nbf` requirement for the Client Assertion, but keeping `exp` short-lived (5 minutes maximum) limits exposure if intercepted.



## Side-by-side comparison

| Claim | Request Object | Client Assertion |
|-------|---------------|-----------------|
| `aud` | AS issuer URL | AS issuer URL |
| `iss` | `client_id` | `client_id` |
| `sub` | Not used | `client_id` (must equal `iss`) |
| `exp` max | 10 min after `nbf` | 5 min after `iat` |
| `nbf` | Required | Optional (recommended) |
| `jti` | Not required | **Required — must be unique per request** |
| `nonce` | Required | Not used |
| `state` | Required | Not used |
| `client_id` | Required | Not used |



## Common rejection causes

| Error | Likely cause |
|-------|-------------|
| `aud` rejected | `aud` set to token endpoint URL instead of issuer |
| `jti` already used | Client Assertion `jti` reused across requests |
| `sub` missing | Client Assertion sent without `sub` claim |
| Token expired | `exp` too short or clock skew — set `nbf` to `iat - 10` |
| Wrong algorithm | Non-PS256 algorithm used in JOSE header |
| `kid` not found | Signing certificate not yet registered or wrong `kid` value |



## Related pages

- [Message Signing](./message-signing) — how to sign a JWT with PS256
- [Request JWT](./request-jwt) — full code example for building the Request Object
- [Client Assertion](../tokens/client-assertion) — full code example for building the Client Assertion
- [API Discovery](../../trust-framework/api-discovery) — where to find the `issuer` value
