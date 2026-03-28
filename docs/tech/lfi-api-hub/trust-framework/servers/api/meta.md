---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# API Resource – Meta Data

Each API resource registered in the Trust Framework can carry optional metadata fields. These fields are surfaced in the directory and in TPP-facing portals, helping developers understand what your API resource provides and where to find documentation.

## Fields

### Customer Friendly Name

A short, human-readable name for this API resource. This name may be displayed in developer portals and directory listings.

**Example:** `Acme Bank – Account Data`

---

### Customer Friendly Description

A brief description of what this API resource provides. Keep it concise and developer-facing.

**Example:** `Access to account information, balances, transactions, and related data for Acme Bank customers.`

---

### Developer Portal URI

A URL pointing to documentation or a developer portal specific to this API resource. This should help TPP developers understand how to integrate with your implementation — including any institution-specific behaviour, sandbox access, or support contacts.

**Example:** `https://developer.example.com/open-finance`

---

### Terms of Service URI

A URL to the terms of service governing access to this API resource. TPPs may be required to accept these terms before accessing your APIs.

**Example:** `https://developer.example.com/terms`

---

## Field Summary

| Field | Required | Description |
|-------|----------|-------------|
| **Customer Friendly Name** | Recommended | Human-readable name for this resource, displayed in portals. |
| **Customer Friendly Description** | Recommended | Short description of what the resource provides. |
| **Developer Portal URI** | Optional | URL to your developer documentation for this resource. |
| **Terms of Service URI** | Optional | URL to your terms of service for API consumers. |

::: tip
While these fields are optional, completing them improves your institution's discoverability and helps TPP developers integrate correctly with your APIs. Institutions with well-documented directory entries typically experience fewer integration support requests.
:::
