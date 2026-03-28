---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# Walkthrough – Creating an Authorisation Server

This walkthrough covers registering your authorisation server in the Trust Framework. You must complete this before registering API resources or being discoverable by TPPs.

::: info Prerequisites
Before creating an authorisation server your organisation must be onboarded to the Trust Framework and you must have the necessary admin permissions. See [Onboarding](../onboarding) if you have not yet completed this step.
:::

---

## Step 1 – Navigate to your Organisation

1. Sign in to the Trust Framework directory.
2. Navigate to your **Organisation**.
3. Open the **Auth Servers** section.
4. Click **+ New Auth Server**.

---

## Step 2 – Provide the Server Details

Fill in the fields that describe your authorisation server. These values are published in the directory and are visible to TPPs.

| Field | Guidance |
|-------|----------|
| **Customer Friendly Name** | A public-facing name for your institution's open finance service (e.g. `Acme Bank Open Finance`). |
| **Customer Friendly Description** | A short description of the service (e.g. `Open finance APIs for Acme Bank customers`). |
| **Developer Portal URI** | URL to your developer portal or API documentation. |
| **Terms of Service URI** | URL to your terms of service for API consumers. |
| **Notification Webhook** | The HTTPS endpoint on your infrastructure that receives consent lifecycle events from the API Hub. This must be reachable from the platform. See [Consent Events & Actions](/tech/lfi-api-hub/v2.1/consent/events-and-actions) for details on the events sent to this endpoint. |

---

## Step 3 – Provide the OIDC Discovery URI

The **Open ID Well Known** field must point to your OIDC discovery document, for example:

```
https://auth.example.com/.well-known/openid-configuration
```

This document must be publicly reachable and must include at minimum:

- `authorization_endpoint`
- `token_endpoint`
- `jwks_uri`
- `issuer`

The Trust Framework will use this document to validate your server's configuration during registration.

---

## Step 4 – Provide the Payload Signing Cert Location URI

The **Payload Signing Cert Location URI** is the JWKS endpoint that TPPs will use to verify JWTs signed by your authorisation server. This is typically the same `jwks_uri` value published in your OIDC discovery document.

```
https://auth.example.com/.well-known/jwks.json
```

---

## Step 5 – Save the Authorisation Server

1. Review all fields.
2. Click **Create** (or **Save**) to register the authorisation server.

Once created, the authorisation server will appear in the directory and be assigned a unique **Authorisation Server ID**. You will need this ID when calling the Trust Framework API and when associating API resources.

::: tip Finding your Authorisation Server ID
After creation, your Authorisation Server ID is visible on the server detail page. It is also returned by the [`GET /organisations/{OrganisationId}/authorisationservers`](/tech/lfi-api-hub/trust-framework/api/auth-servers) Trust Framework API endpoint.
:::

---

## Next Steps

With your authorisation server registered, you can now add API resources to describe the APIs your institution exposes:

- [API Resources – Overview](./api/)
- [Creating an API Resource](./api/creating)
