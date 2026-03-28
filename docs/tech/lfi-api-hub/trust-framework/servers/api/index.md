---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Trust Framework – API Resources

**API Resources** are registered under your Authorisation Server and describe the specific API endpoints your organisation exposes to TPPs. Each API resource is associated with a set of scopes and a base URL, allowing TPPs to discover what you offer and how to reach it.

## What is an API Resource?

An API resource entry in the Trust Framework directory tells TPPs:

- **Which API family** you support (e.g. banking data sharing, payment initiation)
- **Where to send requests** (the base URL for that API on your infrastructure)
- **Which scopes are applicable** for that API family

When a TPP dynamically registers with your authorisation server, it uses the API resource entries to understand which scopes to request and which base URL to call.

## API Families

The Open Finance UAE ecosystem organises APIs into **API families**. You register one API resource entry per family you support. The available families are published in the Trust Framework and can be retrieved via the [`GET /references/apifamilies`](/tech/lfi-api-hub/trust-framework/api/api-families) endpoint.

Common families include:

| API Family | Description |
|------------|-------------|
| **Bank Account and Transaction** | Banking data sharing — account information, balances, transactions, etc. |
| **Bank Payment Initiation** | Payment initiation — domestic transfers and payments. |
| **Bank Confirmation of Payee** | Confirmation of payee — payee name validation. |
| **Insurance Data Sharing** | Insurance policy and claims data sharing. |

::: info
Register only the API families that your institution is licensed and technically ready to support. TPPs will only see and register for the families you have declared.
:::

## Relationship to Scopes

Each API family carries a defined set of OAuth 2.0 scopes. When you register an API resource, the Trust Framework associates those scopes with your authorisation server. TPPs requesting tokens for a given scope will be directed to your server as the resource owner for that family.

## Next Steps

- [Creating an API Resource](./creating) — step-by-step walkthrough
- [API Resource Meta Data](./meta) — descriptions of each metadata field
