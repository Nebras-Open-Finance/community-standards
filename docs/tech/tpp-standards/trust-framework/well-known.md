---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# The `.well-known` Endpoint

The `.well-known/openid-configuration` endpoint provides a standardized way for Third Party Providers (TPPs) to retrieve OAuth 2.0 and OpenID Connect configuration for a Licensed Financial Institution (LFI). This allows TPPs to discover authorization, token, and other endpoints programmatically, without hardcoding URLs.

For UAE Open Finance, the discovery URL format is:

```bash
https://auth1.[LFICode].apihub.openfinance.ae/.well-known/openid-configuration
```

| Property | Description |
|----------|-------------|
| `issuer` | Identifier for the Authorization Server, used in JWT validation. |
| `authorization_endpoint` | URL where end-users are redirected to in order to authenticate and authorize access. |
| `token_endpoint` | Endpoint to exchange authorization codes or other grants for access tokens. |
| `registration_endpoint` | Endpoint for Dynamic Client Registration (DCR) using software statements. |
| `jwks_uri` | URL exposing the server’s public keys for validating JWT signatures. |
| `pushed_authorization_request_endpoint` | Endpoint for submitting signed authorization requests (PAR flow). |


Example of `.well-known` response:

```json
{
  "issuer": "https://auth1.[LFICode].apihub.openfinance.ae",
  ...
  "token_endpoint": "https://as1.[LFICode].apihub.openfinance.ae/token",
  "authorization_endpoint": "https://app.lfi.com/open-finance",
  "registration_endpoint": "https://rs1.[LFICode].apihub.openfinance.ae/tpp-registration",
  "jwks_uri": "https://keystore.directory.openfinance.ae/64e5061d-123f-43c8-9f17-1df9a4600705/application.jwks",
}
```

#### Caching

The information returned from <GET /> `/.well-known/openid-configuration` changes infrequently and is cached accordingly. 

- Cache-Control header: max-age=900
- Cache duration: 15 minutes

