---
next: false
prev: false
aside: false
---

# Banking

The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment initiation, and verification — empowering third-party providers (TPPs) with the tools they need to enhance user experience and financial services. These services operate under strict consent management and granular data access permissions, all mediated and validated by the API Hub.

::: tip See who's live
[**Which TPPs are consuming Open Finance services** →](/program/whats-live?type=tpp)
:::

### Bank Data Sharing (Account Information)

Allows consented access to account, balance, transaction, beneficiary, direct debit, standing order, scheduled payment, and party information.
Supported permissions include `ReadAccountsBasic`, `ReadBalances`, `ReadTransactionsDetail`, etc., with data filtered by consent expiration and date ranges.

### Service Initiation (Payments)

Enables TPPs to initiate domestic payments on behalf of customers after explicit consent has been authorised at the LFI.

Covers single instant payments, multi-payment consents (variable/fixed amounts on demand, periodic, or defined schedules), delegated SCA, and refund retrieval.

### Confirmation of Payee (CoP)

Verifies whether a payee name matches the account holder name before a payment is executed, reducing the risk of misdirected payments.

Uses a two-step process: discovery (resolve the LFI from an IBAN) followed by a confirmation request directly against the resolved LFI, returning match indicators (Yes / Partial / No).

### Products & Leads

Allows LFIs to publish their product catalogue (e.g. savings, current accounts, credit cards) and to receive customer leads forwarded by TPPs for product origination.

Includes filters for Sharia compliance, product category, and last-updated date, and supports both retail and business banking products.

### ATMs

Allows LFIs to publish ATM location, service, accessibility, fee, and availability data. The API is read-only and requires no customer consent or redirect.
