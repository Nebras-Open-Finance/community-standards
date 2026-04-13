---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Trust Framework – Servers

A **Server** in the Trust Framework represents your LFI's **API Hub** — the centralised platform that acts as the OIDC Authorisation Server, Resource Server, and Open Finance Gateway for your institution. Each API Hub instance is provisioned by the platform and is the entry point through which TPPs discover and interact with your Open Finance APIs.

As an LFI you MUST publish your API Hub as a server to the Trust Framework and associate your [API Resources](./api/) with it so that TPPs can discover the endpoints you expose via [`GET /participants`](/tech/tpp-standards/trust-framework/open-api/participants).

::: warning Environment Mapping
You MUST publish your **pre-production** API Hub to the **Sandbox Trust Framework** and your **production** API Hub to the **Production Trust Framework**.
:::

## What Does a Server Represent?

Within the Trust Framework, a server entry is a directory record that represents your API Hub. It tells TPPs:

- **Where to send users** for authentication and consent (the API Hub's authorisation endpoint)
- **Where to obtain tokens** (the API Hub's token endpoint)
- **What APIs you expose** and at which base URLs (via your registered [API Resources](./api/))
- **How to validate identity** (via the API Hub's JWKS URI and OIDC discovery document)

When a TPP initiates an authorisation code flow, it queries the Trust Framework directory to locate the correct server (API Hub) for the institution it wants to interact with.

## How the API Hub Discovery URI is Obtained

When your API Hub is provisioned, the platform provides you with a **well-known discovery document URI**. This URI is unique to your institution and environment. It exposes your API Hub's `authorization_endpoint`, `token_endpoint`, `jwks_uri`, `issuer`, and supported parameters.

You will receive this URI as part of your [environment-specific onboarding configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/).

The `issuer` value from the discovery document is a required field when creating your server entry in the Trust Framework.

## Required Information

To create a server in the Trust Framework, you MUST provide:

| Field | Description |
|-------|-------------|
| **Customer Friendly Server Name** | A public-facing name for your institution's Open Finance service, displayed in TPP-facing portals and consent screens. This MUST reflect the brand that the API Hub supports (see [Logo](#logo-and-branding) below). |
| **Issuer** | The `issuer` value from your API Hub's well-known discovery document. |
| **Description** | A short description of your institution's Open Finance offering. |
| **Logo** | Your institution's logo for this API Hub instance (see [Logo and Branding](#logo-and-branding) below). |
| **Account Type** | The account type(s) supported by this server: **Retail**, **SME**, or **Corporate** (see [Account Types](#account-types) below). |

## Logo and Branding

The logo you provide MUST match the brand that the API Hub supports. If your institution operates multiple API Hubs — for example, one for retail banking and one for business banking — each server entry MUST use the logo corresponding to that specific brand.

This ensures that TPPs and PSUs see the correct branding during consent and authorisation journeys.

## Account Types

Each server MUST indicate the account type(s) it supports. This allows TPPs to identify which server to use when requesting access to a specific category of accounts.

| Account Type | Description |
|--------------|-------------|
| **Retail** | Personal and individual customer accounts. |
| **SME** | Small and medium enterprise accounts. |
| **Corporate** | Corporate and institutional accounts. |

An institution MAY register multiple servers if it operates separate API Hubs for different account types or brands.

## Relationship to API Resources

A server acts as the parent for one or more **API Resources**. Each API resource entry associates a specific API family (e.g. banking data sharing, payment initiation) with the scopes your implementation supports.

```
Organisation
└── Server (API Hub)
    ├── API Resource  (Banking Data Sharing)
    ├── API Resource  (Payment Initiation)
    └── API Resource  (Confirmation of Payee)
```

TPPs retrieving your directory entry will see both the server endpoints and the list of API resources, giving them everything they need to dynamically register and call your APIs.

## Next Steps

- [Creating a Server](./creating) — step-by-step walkthrough
- [API Resources](./api/) — what API resources are and how to configure them
