---
next: false
prev: false
aside: false
---

# Functional Evidence — Bank Data Sharing

<FunctionalEvidenceDownload />

Complete this document and submit it as part of your integration review. All sections are required unless marked optional. Evidence must be from the [AlTareq Model Bank](../v2.1/banking/testing/model-bank) sandbox environment.

## 1. Proposition Overview

Describe the product or service you are building and how Bank Data Sharing supports it.

| | |
|---|---|
| **TPP / Application name** | |
| **Proposition description** | *Describe what your product does and the user need it serves* |
| **How data sharing is used** | *Explain which account data your proposition reads and why — e.g. "We read balances and transactions to generate a spending report for the user"* |
| **User type** | `Retail` / `SME` / `Corporate` |
| **OpenFinanceBilling Purpose** | *The `Purpose` value you set — e.g. `AccountAggregation`, `BudgetingAnalysis`* |


## 2. Consent Definition

Paste the exact `authorization_details` object you send inside your PAR request JWT. Then describe every field you have set.

### 2a. Your authorization_details

```json
// Paste your authorization_details here — do not redact any fields
{
  "type": "urn:openfinanceuae:account-access-consent:v2.1",
  "consent": {
    "ConsentId": "",
    "ExpirationDateTime": "",
    "Permissions": [],
    "OpenFinanceBilling": {
      "UserType": "",
      "Purpose": ""
    }
  }
}
```

### 2b. Field Justification

For every field you set, explain why it is present. For every permission in `Permissions`, state which API endpoint requires it.

| Field | Value set | Justification |
|-------|-----------|---------------|
| `ConsentId` | | *e.g. UUID generated at consent creation time by our system* |
| `ExpirationDateTime` | | *e.g. 90 days from consent creation — matches our session model* |
| `OpenFinanceBilling.UserType` | | |
| `OpenFinanceBilling.Purpose` | | |
| `FromDate` *(if set)* | | |
| `ToDate` *(if set)* | | |
| `AccountType` *(if set)* | | |
| `AccountSubType` *(if set)* | | |
| `BaseConsentId` *(if set)* | | |
| `OnBehalfOf` *(if set)* | | |

**Permission justification** — complete a row for each permission in your `Permissions` array:

| Permission | Endpoint(s) that require it | Used by your proposition? | Reason |
|------------|-----------------------------|---------------------------|--------|
| `ReadAccountsBasic` | `GET /accounts` | | |
| `ReadAccountsDetail` | `GET /accounts`, `GET /accounts/{AccountId}` | | |
| `ReadBalances` | `GET /accounts/{AccountId}/balances` | | |
| `ReadTransactionsBasic` | `GET /accounts/{AccountId}/transactions` | | |
| `ReadTransactionsDetail` | `GET /accounts/{AccountId}/transactions` | | |
| `ReadBeneficiariesBasic` | `GET /accounts/{AccountId}/beneficiaries` | | |
| `ReadBeneficiariesDetail` | `GET /accounts/{AccountId}/beneficiaries` | | |
| `ReadDirectDebits` | `GET /accounts/{AccountId}/direct-debits` | | |
| `ReadStandingOrdersBasic` | `GET /accounts/{AccountId}/standing-orders` | | |
| `ReadStandingOrdersDetail` | `GET /accounts/{AccountId}/standing-orders` | | |
| `ReadScheduledPaymentsBasic` | `GET /accounts/{AccountId}/scheduled-payments` | | |
| `ReadScheduledPaymentsDetail` | `GET /accounts/{AccountId}/scheduled-payments` | | |
| `ReadStatements` | `GET /accounts/{AccountId}/statements` | | |
| `ReadPartyUser` | `GET /parties`, `GET /accounts/{AccountId}/parties` | | |
| `ReadPartyUserIdentity` | `GET /parties`, `GET /accounts/{AccountId}/parties` | | |
| `ReadParty` | `GET /accounts/{AccountId}/parties` | | |
| `ReadProduct` | *(product sub-resource)* | | |
| `ReadProductFinanceRates` | *(product sub-resource)* | | |

> Remove any rows for permissions you do not request. Any permission present in `Permissions` must have a row here with a justification.


## 3. Model Bank Evidence

For each endpoint your proposition calls, provide evidence of a successful `200 OK` response from the AlTareq Model Bank. Include the full response body or a clearly readable excerpt. Use the Model Bank accounts for `mits` or `rora` — see [Model Bank credentials](../v2.1/banking/testing/model-bank#model-bank-credentials).

### 3a. Consent Authorized

Provide the response from `GET /account-access-consents/{ConsentId}` showing `Status: Authorized`.

```json
// Paste GET /account-access-consents/{ConsentId} response here
```

| Field | Observed value |
|-------|----------------|
| `ConsentId` | |
| `Status` | `Authorized` |
| `ExpirationDateTime` | |
| `Permissions` (list) | |



### 3b. GET /accounts

```json
// Paste response body (or excerpt showing at least one account)
```

| | |
|---|---|
| **HTTP status** | `200` |
| **AccountId used in subsequent calls** | |



### 3c. GET /accounts/{AccountId}/balances

```json
// Paste response body
```

| | |
|---|---|
| **HTTP status** | `200` |
| **AccountId** | |



### 3d. GET /accounts/{AccountId}/transactions

```json
// Paste response body (excerpt of at least one transaction is sufficient)
```

| | |
|---|---|
| **HTTP status** | `200` |
| **AccountId** | |



### 3e. Additional endpoints *(repeat for each endpoint your proposition calls)*

For each additional endpoint (`/beneficiaries`, `/direct-debits`, `/standing-orders`, `/scheduled-payments`, `/statements`, `/parties`), add a section below in the same format as 3b–3d.

```json
// Endpoint: GET /accounts/{AccountId}/___________
// Paste response body
```

| | |
|---|---|
| **Endpoint** | |
| **HTTP status** | `200` |
| **AccountId** | |


## 4. Consent State Handling

Describe how your application tracks and responds to consent state changes.

| Scenario | How your application handles it |
|----------|---------------------------------|
| Consent moves to `Revoked` | |
| Consent moves to `Expired` | |
| Access token expires mid-session | |
| Refresh token is rejected (`invalid_grant`) | |



## 5. Minimum Permissions Declaration

| Declaration | Yes / No |
|---|---|
| Every permission in my `Permissions` array has a corresponding row in the table in section 2b | |
| I have not requested any permission for data that is not displayed or used within my proposition | |
| I am not requesting permissions speculatively for future features not yet built | |

**Signed off by:** *(name and role)*

**Date:**

---

*Submit this document to the Open Finance team alongside your integration request. Incomplete submissions will be returned.*
