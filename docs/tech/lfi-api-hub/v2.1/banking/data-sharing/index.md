---
next: false
prev: false
aside: false
---

# Bank Data Sharing

The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These services empower licensed third-party providers (TPPs) to deliver account aggregation, financial management tools, lending assessments, and value-added digital services.

::: info Required role: BDSP
Access to the Bank Data Sharing APIs requires TPPs to hold the **BDSP** (Bank Data Sharing Provider) role. The API Hub validates the role on every request before proxying it to the LFI.
:::

<LiveTPPs :families="['account-information']" />

## Endpoint & account type coverage

Not all endpoints are expected to be delivered for every account subtype, and not all account subtypes are available for every account type. The tables below show what is expected to be supported.

### Account subtypes by account type

| `AccountSubType` | `Retail` | `SME` | `Corporate` |
|-----------------|:--------:|:-----:|:-----------:|
| `CurrentAccount` | ✓ | ✓ | ✓ |
| `Savings` | ✓ | ✓ | ✓ |
| `CreditCard` | ✓ | — | — |
| `Finance` | ✓ | — | — |
| `Mortgage` | ✓ | — | — |

### Endpoints by account subtype

| Endpoint | `CurrentAccount` | `Savings` | `CreditCard` | `Finance` | `Mortgage` |
|----------|:----------------:|:---------:|:------------:|:---------:|:----------:|
| `GET /accounts` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}/balances` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}/transactions` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}/statements` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}/products` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /customer` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}/customer` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}/beneficiaries` | ✓ | ✓ | — | — | — |
| `GET /accounts/{AccountId}/direct-debits` | ✓ | ✓ | — | — | — |
| `GET /accounts/{AccountId}/scheduled-payments` | ✓ | ✓ | — | — | — |
| `GET /accounts/{AccountId}/standing-orders` | ✓ | ✓ | — | — | — |
