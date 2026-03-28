---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Trust Framework – Authorisation Servers

An **Authorisation Server** (sometimes called an auth server or server) represents an OAuth 2.0 authorisation server your organisation operates within the Trust Framework. TPPs discover your authorisation server through the directory in order to initiate consent and token flows against your APIs.

As an LFI you must register at least one authorisation server and associate your API resources with it so that TPPs can discover the endpoints you expose.

## What is an Authorisation Server?

Within the Trust Framework, your authorisation server entry is a directory record that tells TPPs:

- **Where to send users** for authentication and consent (your authorisation endpoint)
- **Where to obtain tokens** (your token endpoint)
- **What APIs you expose** and at which base URLs (via your registered [API Resources](./api/))
- **How to validate your identity** (via your JWKS URI and OIDC discovery document)

When a TPP performs dynamic client registration or initiates an authorisation code flow, it first queries the Trust Framework directory to locate the correct authorisation server for the institution it wants to interact with.

## Key Fields

| Field | Description |
|-------|-------------|
| **Customer Friendly Name** | The public-facing name for your authorisation server, displayed in TPP-facing portals and consent screens. |
| **Customer Friendly Description** | A short description of your institution's open finance offering. |
| **Developer Portal URI** | A URL pointing to your developer documentation or portal. |
| **Terms of Service URI** | A URL to your terms of service for API consumers. |
| **Notification Webhook** | The endpoint on your infrastructure that the API Hub will call with consent lifecycle events. |
| **Open ID Well Known** | The URL of your OIDC discovery document (`.well-known/openid-configuration`). Must be publicly reachable. |
| **Payload Signing Cert Location URI** | The URI of the JWKS endpoint used by TPPs to verify JWTs you sign. |
| **API Resources** | The set of API resource entries associated with this server, each describing an API family, base URL, and applicable scopes. |

## Relationship to API Resources

An authorisation server acts as the parent for one or more **API Resources**. Each API resource entry associates a specific API family (e.g. banking data sharing, payment initiation) with a base URL on your infrastructure and the scopes your implementation supports.

```
Organisation
└── Authorisation Server
    ├── API Resource  (Banking Data Sharing)
    ├── API Resource  (Payment Initiation)
    └── API Resource  (Confirmation of Payee)
```

TPPs retrieving your directory entry will see both the authorisation server endpoints and the list of API resources, giving them everything they need to dynamically register and call your APIs.

## Next Steps

- [Creating an Authorisation Server](./creating) — step-by-step walkthrough
- [API Resources](./api/) — what API resources are and how to configure them
