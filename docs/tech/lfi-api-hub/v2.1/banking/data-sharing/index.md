---
next: false
prev: false
aside: false
---

# Bank Data Sharing

The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These services empower licensed third-party providers (TPPs) to deliver account aggregation, financial management tools, lending assessments, and value-added digital services.


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
| `GET /accounts/{AccountId}/product` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /parties` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}/parties` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `GET /accounts/{AccountId}/beneficiaries` | ✓ | ✓ | — | — | — |
| `GET /accounts/{AccountId}/direct-debits` | ✓ | ✓ | — | — | — |
| `GET /accounts/{AccountId}/scheduled-payments` | ✓ | ✓ | — | — | — |
| `GET /accounts/{AccountId}/standing-orders` | ✓ | ✓ | — | — | — |

## Capabilities

### Account & Balance Information

Provides consented access to core account data, including account identifiers, account types, currency, and status.

Enables retrieval of real-time and available balances, overdraft limits, and related account details.

### Historical Transaction & Statement Data

Provides access to transaction and statement history, including debit and credit entries, references, amounts, running balances, booking and value dates, and associated metadata where available.

Supports filtering by consented date ranges and statement periods.

### Party & Account Holder Information

Allows access to verified account holder details, including name, Emirates ID (where permitted), contact information, and KYC verification status.

Data sharing is subject to explicit consent scope and regulatory data minimisation principles.

### Regular Payments

Provides access to configured payment instructions and beneficiaries, including:
- Beneficiary details
- Standing orders
- Direct debits
- Scheduled and recurring payments

Enables visibility into existing payment commitments and setup information.

### Product Information

Provides structured information on banking products associated with the account, including fees, charges, rewards, benefits, eligibility criteria, and key product features.

Supports transparency and comparison of product terms under customer consent.

