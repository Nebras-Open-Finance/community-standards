---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# Flags & Meta Data

## Flags

Flags provide additional attributes about an Organisation or Authorisation Server within the `/participants` response.

Example:

```json
"Flags": {
  "AccountType": [
    "Retail"
  ]
}
```

This example indicates that the Authorisation Server supports Retail account types only. Integrators should interpret this as a restriction, meaning non-retail (e.g., corporate or SME) account types are not supported by this server.

TPPs should use flags to apply filtering and implement business logic decisions during participant selection and integration.

## API Meta Data

Each `ApiResources` object may include an `ApiMetadata` section, which provides additional information about the API that TPPs can use for business logic, filtering, or display purposes.

Example:
```json
"ApiMetadata": {
  "AccountSubType": [
    "CurrentAccount",
    "Savings",
    "CreditCard"
  ],
  "OverLimitFees": "0.01"
}
```

This example indicates that the account-information API family supports the account subtypes `CurrentAccount`, `Savings`, and `CreditCard`, and that data sharing fees exceeding the limits as defined in the commercial model will be set at 0.01 AED for this API family.

TPPs can leverage `ApiMetadata` to:
- Filter available APIs by account types or product subtypes.
- Calculate or display applicable data sharing fees to end-users.
- Apply conditional business logic based on API capabilities.
