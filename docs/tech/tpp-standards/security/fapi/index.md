---
prev: false
next: false
---

# FAPI Security Profile

UAE Open Finance mandates the **FAPI 2.0 Security Profile** ([Financial-grade API](https://openid.net/specs/fapi/2.0/fapi-2_0-security-profile-03.html)) as the security foundation for all API interactions. FAPI 2.0 is an extension of OAuth 2.0 and OpenID Connect designed specifically for high-value financial APIs, where the consequences of a security breach are significant.

## Key Security Mechanisms

### Pushed Authorization Requests (PAR)

Rather than passing authorization parameters directly in a browser redirect URL (where they're visible and potentially manipulable), consent parameters are first sent server-to-server to the `/par` endpoint. The Authorization Server returns a short-lived `request_uri` which is the only thing passed in the browser redirect.

This ensures authorization parameters are never exposed in browser history or server logs.

### Signed Request Objects (JAR)

The body of the `/par` request must be a signed JWT — a [JSON Web Signature (JWS)](./message-signing). This is a cryptographically signed package of claims that proves:

- **Authenticity** — the request genuinely came from your registered application
- **Integrity** — no parameter was modified in transit

See [Preparing the Request JWT](./request-jwt) for the full structure.

### PKCE (Proof Key for Code Exchange)

Every authorization request includes a `code_challenge` derived from a secret `code_verifier`. When the authorization code is later exchanged for tokens, the `code_verifier` must be provided. This prevents authorization code interception attacks.

The only supported method is `S256` (SHA-256 hash of the verifier).

### mTLS (Mutual TLS)

All API requests use **mutual TLS** — both client and server present certificates during the TLS handshake. Your application must present its **transport certificate** (issued by the Trust Framework) to authenticate at the network level.

This ensures that even a stolen access token cannot be used without the corresponding private key.

## Cryptographic Requirements

| Requirement | Value |
|-------------|-------|
| Signing algorithm | `PS256` (RSA-PSS with SHA-256) |
| Minimum RSA key size | 2048 bits |
| Token endpoint auth method | `private_key_jwt` |
| Request object signing | Required for `/par` |
| Encryption | Optional (see [Message Encryption](./message-encryption)) |

## In This Section

| Page | Description |
|------|-------------|
| [Message Signing](./message-signing) | How to sign JWTs using PS256 — used for request objects and client assertions |
| [Message Encryption](./message-encryption) | How to encrypt a request object using the LFI's public key |
| [Preparing the Request JWT](./request-jwt) | Full structure of the signed JWT sent to `/par` |
| [JWT Claim Rules](./jwt-claims) | Strict per-claim reference for both the Request Object and Client Assertion — `aud`, `jti`, lifetime windows, and common rejection causes |
| [Scopes](./scopes) | All OAuth 2.0 scopes available in UAE Open Finance |
