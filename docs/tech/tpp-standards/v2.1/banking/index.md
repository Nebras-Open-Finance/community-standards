---
next: false
prev: false
aside: false
---

# Banking

The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment initiation, and verification, empowering third-party providers (TPPs) with the necessary tools to enhance user experience and financial services. These services are provided with strict consent management and detailed data access permissions.



<LiveAPIs />


### Bank Data Sharing (Account Information)

Allows consented access to account, balance, transaction, beneficiary, direct debit, standing order, scheduled payment, and party information.
Supported permissions include `ReadAccountsBasic`, `ReadBalances`, `ReadTransactionsDetail`, etc., with data filtered by consent expiration and date ranges.

### Service Initiation (Payments)

Enables TPPs to initiate domestic and international payments on behalf of users after obtaining explicit consent.

Covers single instant payments, multi payments (variable/fixed schedules), refund retrieval, and bulk/batch file uploads.

### Confirmation of Payee (CoP)

Verifies whether a payee name matches the account holder name before executing a payment, reducing misdirected payment risk.

Uses a two-step process: discovery (resolve LFI from IBAN) followed by confirmation request, returning match indicators (Yes / Partial / No).

### Products & Leads

Provides access to current product catalogues (e.g. savings, current accounts, credit cards) and allows creation of leads for product origination.

Includes filters for Sharia compliance, product category, last updated date, and supports both retail and business banking products.