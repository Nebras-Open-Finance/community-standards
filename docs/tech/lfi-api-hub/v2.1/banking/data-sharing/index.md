---
next: false
prev: false
aside: false
---

# Bank Data Sharing

The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These services empower licensed third-party providers (TPPs) to deliver account aggregation, financial management tools, lending assessments, and value-added digital services.

All data access operates under explicit customer consent, with granular permission scopes, strict expiry controls, and full auditability.

::: info Required role: BDSP
Access to the Bank Data Sharing APIs requires the **BDSP** (Bank Data Sharing Provider) role. This role must be assigned to your application in the Trust Framework before making any account information requests. See [Roles](/tech/tpp-standards/trust-framework/roles) for the full list of scopes and grant types this role permits.
:::

<LiveAPIs families="['account-information']" />


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