---
prev: false
next: false
aside: false
---

# Client Assertion

A **client assertion** is a short-lived, signed JWT that your application presents to the Authorization Server to prove its identity. It takes the place of a static client secret, providing a stronger and more auditable form of client authentication.

In UAE Open Finance, a client assertion is required on two endpoints:

| Endpoint | Use |
|----------|-----|
| [`/token`](./open-api/token) | Exchanging an authorisation code for tokens, refreshing an access token, or obtaining a client credentials token |
| [`/par`](../../v2.1/consent/open-api/par) | Submitting a Pushed Authorization Request to initiate a consent journey |

Because each assertion is signed with your application's private key, the Authorization Server can verify it using your public key from the Trust Framework — without any shared secret ever leaving your system.

::: info One assertion per request
A client assertion must be freshly generated for every request. The `jti` claim (a unique UUID) ensures the Authorization Server can detect and reject replayed assertions.
:::

::: tip Strict claim rules
For a complete per-claim reference — including the exact `aud` value, `jti` uniqueness requirements, `exp`/`iat` lifetime window, and a side-by-side comparison with the Request Object — see [JWT Claim Rules](/knowledge-base/articles/jwt-claims).
:::

## Structure

The client assertion is a signed JWT composed of a header and a set of claims:

### Header

| Field | Value | Description |
|-------|-------|-------------|
| `alg` | `PS256` | The only algorithm supported by the UAE Open Finance FAPI profile |
| `kid` | string | Key ID of your signing certificate, as registered in the Trust Framework |

### Claims

| Claim | Description | Example |
|-------|-------------|---------|
| `aud` | The Authorization Server's issuer URI — obtained from the [`.well-known`](../../trust-framework/well-known) discovery endpoint | `https://auth.[LFICode].apihub.openfinance.ae` |
| `iss` | Your application's `client_id` from the Trust Framework | `a1b2c3d4-...` |
| `sub` | Same as `iss` — your `client_id` | `a1b2c3d4-...` |
| `iat` | Unix timestamp of when the JWT was issued | `1713196123` |
| `exp` | Unix timestamp when the JWT expires. Keep this short — 5 minutes is standard | `1713196423` |
| `jti` | A unique identifier (UUID) for this assertion. Prevents replay attacks | `f47ac10b-58cc-...` |

::: tip Keep assertions short-lived
Set `exp` to no more than 5 minutes after `iat`. Long-lived assertions increase the window of exposure if intercepted.
:::

::: tip Testing client assertions on the sandbox
The sandbox provides **O3 Utility endpoints** that accept your private key and return a ready-made client assertion JWT — useful for confirming your key setup is correct before writing your own signing code. See [O3 Sandbox Utilities](../fapi/o3-utils#example-2-o3-util-prepare-private-key-jwt-for-par-end-point).
:::

## Signing the assertion

Once the header and claims are assembled, sign the JWT as a JWS using the `PS256` algorithm and your private signing key.

See [Message Signing (JWS)](../fapi/message-signing) for the signing helper and full code examples in TypeScript and Python.
