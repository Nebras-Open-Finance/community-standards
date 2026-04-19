---
title: "mtls_endpoint_aliases — what it is and when it matters"
description: "FYI explainer for the mtls_endpoint_aliases object returned by .well-known/openid-configuration. Today the aliases match the top-level endpoints, but the FAPI 2.0 spec allows them to diverge — preferring the alias keeps your client future-proof."
next: false
prev: false
---

# `mtls_endpoint_aliases` — What It Is and When It Matters

::: info Low priority — informational
This is an FYI article. On the current sandbox the values inside `mtls_endpoint_aliases` are identical to the top-level endpoints, so a TPP that ignores this object will work today. The article exists so that the day an LFI separates the two, you already know what to look for.
:::

## What discovery returns

The LFI's `.well-known/openid-configuration` includes both top-level endpoints and a parallel `mtls_endpoint_aliases` object:

```json
{
  "token_endpoint":                         "https://as1.altareq1.sandbox.apihub.openfinance.ae/token",
  "introspection_endpoint":                 "https://as1.altareq1.sandbox.apihub.openfinance.ae/introspection",
  "revocation_endpoint":                    "https://as1.altareq1.sandbox.apihub.openfinance.ae/token/revoke",
  "pushed_authorization_request_endpoint":  "https://as1.altareq1.sandbox.apihub.openfinance.ae/par",

  "tls_client_certificate_bound_access_tokens": true,

  "mtls_endpoint_aliases": {
    "token_endpoint":                        "https://as1.altareq1.sandbox.apihub.openfinance.ae/token",
    "introspection_endpoint":                "https://as1.altareq1.sandbox.apihub.openfinance.ae/introspection",
    "revocation_endpoint":                   "https://as1.altareq1.sandbox.apihub.openfinance.ae/token/revoke",
    "pushed_authorization_request_endpoint": "https://as1.altareq1.sandbox.apihub.openfinance.ae/par"
  }
}
```

## Why the aliases exist

`mtls_endpoint_aliases` comes from [RFC 8705 §5](https://datatracker.ietf.org/doc/html/rfc8705#section-5) — *OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens*.

The motivation is operational: an Authorization Server may want to offer the same logical endpoint at two URLs — one that requires mTLS and one that does not. For example, the introspection endpoint may be reachable without mTLS for some operations but bound to a different host for the cert-bound flows.

When `tls_client_certificate_bound_access_tokens: true` is set (as it is in UAE Open Finance), all token-related calls — `/par`, `/token`, `/introspection`, `/revocation` — must be made with your transport certificate so the issued token can be cryptographically bound to the cert. The aliases let the AS publish a separate URL set for those mTLS-bound calls if it ever needs to.

## Why this is currently a non-issue

In UAE Open Finance today, the values inside `mtls_endpoint_aliases` are **identical** to the top-level values. Posting your PAR or token request to either URL works equivalently and produces the same cert-bound token.

The two only diverge if an LFI deliberately splits its mTLS surface from its non-mTLS surface — a configuration change that is not currently planned.

## How to be safe regardless

If you want to be future-proof with no runtime cost, prefer the aliased endpoint when you have your client cert attached:

::: code-group

```typescript [Node.js]
// Prefer the mTLS alias when available, fall back to the top-level endpoint.
const PAR_ENDPOINT =
  discoveryDoc.mtls_endpoint_aliases?.pushed_authorization_request_endpoint
  ?? discoveryDoc.pushed_authorization_request_endpoint

const TOKEN_ENDPOINT =
  discoveryDoc.mtls_endpoint_aliases?.token_endpoint
  ?? discoveryDoc.token_endpoint
```

```python [Python]
# Prefer the mTLS alias when available, fall back to the top-level endpoint.
mtls = discovery_doc.get("mtls_endpoint_aliases", {})

par_endpoint   = mtls.get("pushed_authorization_request_endpoint") \
    or discovery_doc["pushed_authorization_request_endpoint"]

token_endpoint = mtls.get("token_endpoint") \
    or discovery_doc["token_endpoint"]
```

:::

The same pattern applies to `introspection_endpoint` and `revocation_endpoint`.

## What you do **not** need to do

- The `authorization_endpoint` is browser-driven (the PSU is redirected there) — it is not an mTLS call and does not appear in `mtls_endpoint_aliases`. Always use the top-level value.
- You do not need to call discovery twice or maintain two endpoint sets in code. One discovery fetch with the alias-fallback pattern above is enough.

## Related reading

- [RFC 8705 §5 — Metadata for Mutual-TLS Endpoint Aliases](https://datatracker.ietf.org/doc/html/rfc8705#section-5)
- [API Discovery](/tech/tpp-standards/trust-framework/api-discovery)
- [Preparing the Request JWT](/tech/tpp-standards/security/fapi/request-jwt)
