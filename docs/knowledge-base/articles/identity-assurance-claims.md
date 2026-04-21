---
title: "Identity Assurance Claims — OIDC IDA as the response format for customer data"
description: "Why GET /customer, GET /accounts/{AccountId}/customer, and the CoP query response all share a verifiedClaims envelope derived from OpenID Connect for Identity Assurance 1.0."
category: Integration
readTime: "9 min"
updated: "2026-04-21"
tags:
  - OIDC IDA
  - Customer Data
  - Ozone Connect
next: false
prev: false
---

# Identity Assurance Claims — OIDC IDA as the response format for customer data

Three Ozone Connect endpoints return customer identity data:

- `GET /customer` — the authenticated PSU behind the current consent
- `GET /accounts/{accountId}/customer` — the customer(s) associated with a specific account
- `POST /customers/action/cop-query` — the customer(s) on the account matched during a Confirmation of Payee lookup

All three share the **same response envelope**, derived from the [OpenID Connect for Identity Assurance 1.0 Specification](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html) (OIDC IDA). This article explains why the envelope is shared, what each part means, and how to populate it correctly for personal and business customers.

## Why OIDC IDA

UAE Open Finance treats customer identity as **verified claims** — assertions about a person or organisation that the LFI has checked under a known framework. OIDC IDA is the standards-track JSON format for exactly this: claims grouped inside a `verifiedClaims` object, each group labelled with the `verification.trustFramework` under which it was verified.

Reusing IDA across every customer-returning endpoint gives TPPs a single parser and a single mental model — whether the data comes from a consented account, a Confirmation of Payee lookup, or a direct call for the authenticated PSU's identity, the shape is the same.

The Ozone Connect schema (`CbuaeCustomerById`) is explicit about this derivation:

> Party Identity Assurance (Response) Schema — Based on the [OpenID Connect for Identity Assurance 1.0 Specification](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)

## The shared envelope

Every response wraps customer identity in the same three-level structure:

```json
{
  "verifiedClaims": [
    {
      "verification": {
        "trustFramework": "UAE.FI"
      },
      "claims": {
        "identityType": "Person",
        "fullName": "Ahmed Al Mansouri",
        "...": "..."
      }
    }
  ]
}
```

| Level | Purpose |
|-------|---------|
| `verifiedClaims[]` | Array — allows multiple claim groups for the same subject, each verified under a different framework or evidence path. Most LFIs return a single element |
| `verification` | Describes how the claims were verified. `trustFramework` is the primary discriminator |
| `claims` | The actual identity attributes — name, Emirates ID, address, business name, trade licence, etc. |

### `verification.trustFramework`

For UAE Open Finance, the canonical value is `UAE.FI` — the Trust Framework under which UAE Licensed Financial Institutions verify customer identity to onboarding standards set by the CBUAE.

### `claims` — person vs. organisation

The shape of `claims` depends on whether the subject is a natural person or an organisation. `identityType` discriminates:

| `identityType` | Used for | Key claims |
|----------------|----------|------------|
| `Person` | Retail customers | `fullName`, `givenName`, `familyName`, `emiratesId`, `emiratesIdExpiryDate`, `birthDate`, `nationality`, `mobileNumber`, `email`, `residentialAddress` |
| `Organisation` | SME / Corporate customers | `businessName`, `tradeLicenceNumber`, `taxIdentificationNumber`, `dateOfIncorporation`, `countryOfIncorporation`, `corporateAddress` |

LFIs MUST populate every claim that exists or is derivable for the subject. The OpenAPI spec marks the minimum required set; holding back optional fields degrades the TPP experience without serving any protection purpose — the claims have already been released under the authorized consent.

## How each endpoint uses the envelope

### `GET /customer`

The record for the PSU who authenticated the consent. The LFI identifies the PSU from the `o3-psu-identifier` header (the opaque reference patched onto the consent at authorization), and returns **one** customer record:

```json
{
  "data": {
    "id": "cust-001",
    "customerCategory": "Retail",
    "verifiedClaims": [
      {
        "verification": { "trustFramework": "UAE.FI" },
        "claims": {
          "identityType": "Person",
          "fullName": "Ahmed Al Mansouri",
          "givenName": "Ahmed",
          "familyName": "Al Mansouri",
          "emiratesId": "784-1985-1234567-1",
          "emiratesIdExpiryDate": "2029-06-15",
          "residentialAddress": {
            "streetAddress": "Building 12, Marina Walk",
            "locality": "Dubai",
            "country": "AE"
          }
        }
      }
    ]
  },
  "meta": {}
}
```

Single object under `data`, not an array.

### `GET /accounts/{accountId}/customer`

Returns **one record per customer** associated with the account. Joint accounts produce one record per joint holder. Each record carries `customerType` (`Sole`, `Joint`, `Delegate`) and `accountRole` (`Principal`, `SecondaryOwner`, `PowerOfAttorney`, etc.) in addition to the shared envelope:

```json
{
  "data": [
    {
      "id": "cust-001",
      "customerType": "Joint",
      "customerCategory": "Retail",
      "accountRole": "Principal",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Person",
            "fullName": "Ahmed Al Mansouri",
            "emiratesId": "784-1985-1234567-1",
            "...": "..."
          }
        }
      ]
    },
    {
      "id": "cust-004",
      "customerType": "Joint",
      "customerCategory": "Retail",
      "accountRole": "SecondaryOwner",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Person",
            "fullName": "Mariam Al Mansouri",
            "emiratesId": "784-1987-7654321-2",
            "...": "..."
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 2 }
}
```

### `POST /customers/action/cop-query`

Returns **one record per customer** on the account being looked up. The schema uses a slightly leaner shape — only the `verifiedClaims` envelope with the name-related claims the Hub needs to run the CoP match:

```json
{
  "data": [
    {
      "id": "cust-001",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "fullName": "Ahmed Al Mansouri",
            "givenName": "Ahmed",
            "familyName": "Al Mansouri"
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
```

For business accounts, CoP uses `verifiedClaims[].organisationClaims.name` in place of `claims`:

```json
{
  "data": [
    {
      "id": "cust-002",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "organisationClaims": {
            "name": "Al Mansouri Trading LLC"
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}
```

The Hub compares these values against the name submitted by the TPP and returns a match verdict to the caller.

## Why the same envelope for CoP as for data sharing

CoP and `GET /customer` have very different use cases — a name-match check before a payment vs. the full identity of a consented PSU — but the shape of the answer is the same because the **question** is the same at its core: "under which trust framework has this institution verified this party's identity, and what are the claims?"

Having one envelope means LFIs implement one internal mapping from their core banking identity records to OIDC IDA, and that mapping serves every customer-returning endpoint. TPPs parse one format. Auditors review one schema.

## Summary

| Aspect | Rule |
|--------|------|
| Response envelope | `verifiedClaims[]` → `verification` + `claims` (or `organisationClaims` for CoP businesses) |
| Trust framework | `UAE.FI` for UAE Open Finance |
| Person vs. organisation | Discriminated by `identityType` (`Person` / `Organisation`) |
| Field population | Every claim the LFI holds or can derive MUST be populated |
| Source specification | [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html) |
