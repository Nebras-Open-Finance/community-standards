---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# Authorisation Servers

Each **Authorisation Server** represents an **Ozone API Hub** through which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. These servers allow Third Party Providers (TPPs) to authenticate, request consent, and interact securely with the LFI's API ecosystem.

Each server object provides both technical and customer-facing metadata, enabling TPPs to integrate programmatically while also presenting consistent branding to end-users.

## Key Properties

| Property | Description |
|----------|-------------|
| `AuthorisationServerId` | Unique identifier for this Authorisation Server. |
| `Status` | Current status of the server (e.g., Active). |
| `Issuer` | Base URL of the Authorization Server used for token validation and JWT verification. |
| `OpenIDDiscoveryDocument` | URL of the `.well-known/openid-configuration` endpoint containing OAuth 2.0 and OpenID Connect metadata. This document provides TPPs with all necessary endpoints for registration, authentication, and token exchange. |
| `CustomerFriendlyName` | Display name chosen by the LFI to represent the server to Customers. TPPs should present this to end-users. Example: `"ENBDX"`. |
| `CustomerFriendlyLogoUri` | URL to the logo the LFI considers best for the server. TPPs should use this logo when displaying the server to end-users to maintain consistent branding. Example: `https://data.directory.openfinance.ae/logos/.../authorisationservers/...png`. |

The `CustomerFriendlyLogoUri` and `CustomerFriendlyName` allow TPPs to display a consistent user interface for end-users when selecting or authenticating with an Authorisation Server. This ensures the server is easily identifiable and trusted by customers.

:::tip
Always use the logo dynamically from `CustomerFriendlyLogoUri` rather than hardcoding, so any updates made by the LFI are automatically reflected.
:::

::: info OpenIDDiscoveryDocument is a URL, not the document
`OpenIDDiscoveryDocument` is the **URL** of the LFI's `.well-known/openid-configuration` endpoint — it is a pointer, not the configuration data itself. To obtain the actual endpoints your application needs (such as `authorization_endpoint`, `token_endpoint`, `pushed_authorization_request_endpoint`, and `registration_endpoint`), you must make a separate `GET` request to that URL.
:::

Additional details about the Discovery endpoint can be found in [Discovery](./well-known/).
