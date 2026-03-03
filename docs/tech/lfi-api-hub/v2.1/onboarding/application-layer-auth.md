---
next: false
prev: false
---

# Application Layer Authentication

All communication between the API Hub and an LFI's resource server uses **mutual TLS (mTLS)** for transport security combined with **signed Bearer tokens** for application-layer authorization.

## Mutual TLS (mTLS)

The Hub presents its client certificate to your resource server, and your server must present its transport certificate to the Hub. Both sides validate each other's certificates against the Trust Framework JWKS.

**Configure your server to:**
1. Require client certificate authentication on all Open Finance API routes
2. Validate the client certificate against the Hub's published certificate (discoverable from the Trust Framework)
3. Reject requests that do not present a valid mTLS certificate

```nginx
# Example Nginx mTLS config
ssl_client_certificate /etc/ssl/hub-ca.pem;
ssl_verify_client on;
ssl_verify_depth 2;
```

## Hub-to-LFI Request Authentication

When the Hub routes a TPP's API call to your resource server, it attaches:

- **mTLS client certificate** (Hub's transport cert)
- **Authorization header** — a Bearer token issued by the Hub's authorization server

Your resource server must:
1. Verify the mTLS certificate matches the Hub's registered transport certificate
2. Validate the Bearer token — check signature, expiry, `iss`, `aud`, and `scope`
3. Extract the `consentId` from the token claims and verify the consent is `Authorized`

## LFI-to-Hub Callback Authentication

When your authorization server calls Hub endpoints (e.g., `GET /consent/{consentId}`, `PATCH /consent/{consentId}`, `/doconfirm`), you authenticate using:

- **mTLS** — your application's transport certificate
- **Client assertion JWT** — signed with your application's signing key

```typescript
// Build client assertion JWT for Hub callback
const clientAssertion = await buildClientAssertion({
  iss: APPLICATION_CLIENT_ID,      // your app's client_id from Trust Framework
  sub: APPLICATION_CLIENT_ID,
  aud: HUB_CONSENT_MANAGER_URL,
  jti: crypto.randomUUID(),
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 60,
})
```

The signing key must match the signing certificate registered in the Trust Framework for your application.
