---
next: false
prev: false
aside: false
---

# Ozone Connect Base URL

The **Ozone Connect Base URL** is the root URL of your Ozone Connect API endpoints — the server that the API Hub calls when proxying TPP requests to your institution.

When a TPP makes a valid API request to the API Hub, the API Hub validates the token and consent, enforces the OpenAPI schema, enriches the request, and then forwards it to your Ozone Connect Base URL.

## What you provide

You MUST provide a base URL for each environment:

| Environment | Example |
|-------------|---------|
| Pre-production | `https://openapi-uat.example.com` |
| Production | `https://openapi.example.com` |

The API Hub appends the API path to your base URL. For example, if your base URL is `https://openapi.example.com`, a TPP request for account data will be forwarded to:

```
https://openapi.example.com/accounts
```

## Requirements

The Ozone Connect Base URL MUST:

- Use **HTTPS**
- Be reachable from the API Hub's egress IP addresses (provided during onboarding — see [Environment Specific Configuration](./#values-provided-by-ozone))
- **Not** include a trailing slash
- **Not** include path segments beyond the root (e.g. `/v2.1` is not required — the API Hub manages versioned routing)

## Network access

You MUST allowlist the API Hub's outbound IP address(es) at your network or firewall level. These IPs are provided by Ozone as part of the [environment-specific onboarding](./).

## Separate URLs per environment

Your pre-production and production Ozone Connect Base URLs will typically point to different infrastructure (e.g. a UAT environment and a live environment). Each is configured independently via the environment-specific Service Desk ticket.
