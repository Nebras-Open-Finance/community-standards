---
next: false
prev: false
---

# Environment Specific Configuration

## Base URLs

| Service | Pre-Production | Production |
|---|---|---|
| API Hub (consent / auth) | `https://sandbox.apihub.openfinance.ae` | `https://apihub.openfinance.ae` |
| Trust Framework Directory | `https://sandbox.directory.openfinance.ae` | `https://directory.openfinance.ae` |
| Admin Portal | `https://sandbox.admin.apihub.openfinance.ae` | `https://admin.apihub.openfinance.ae` |

## LFI-Specific Discovery

Each LFI has a unique discovery document hosted by the Hub. Your `/.well-known/openid-configuration` URL is derived from your LFI identifier assigned during onboarding:

```
Pre-Production:  https://auth.{lfiId}.sandbox.apihub.openfinance.ae/.well-known/openid-configuration
Production:      https://auth.{lfiId}.apihub.openfinance.ae/.well-known/openid-configuration
```

This document exposes your `authorization_endpoint`, `token_endpoint`, `jwks_uri`, and supported parameters. TPPs use it to discover where to redirect their users.

## Hub Consent Manager Endpoints

The Hub's Consent Manager is the service your authorization server calls to retrieve and update consent records:

| Action | Endpoint |
|---|---|
| Get consent details | `GET {HUB_CONSENT_MANAGER}/consent/{consentId}` |
| Update consent status | `PATCH {HUB_CONSENT_MANAGER}/consent/{consentId}` |
| Confirm authorization | `POST {HUB_CONSENT_MANAGER}/doconfirm` |
| Reject authorization | `POST {HUB_CONSENT_MANAGER}/dofail` |

::: info
Exact endpoint URLs for the Consent Manager are provided in your onboarding pack from AlTareq.
:::

## IP Allowlisting

The Hub routes outbound requests to your resource server from a fixed set of egress IPs. You should allowlist these IPs at your network/firewall level:

| Environment | Egress IPs |
|---|---|
| Pre-Production | Provided in your AlTareq onboarding pack |
| Production | Provided in your AlTareq onboarding pack |

## Feature Flags

Some API Hub features are toggled per environment or per LFI. These are configured in the Admin Portal under **Settings → Feature Flags**. Common flags include:

| Flag | Description |
|---|---|
| `consent_events_enabled` | Whether the Hub sends async consent lifecycle events to your webhook |
| `jwe_required` | Whether payment consent PII must be JWE-encrypted |
| `confirmation_of_payee_enabled` | Whether CoP endpoints are active for your integration |
