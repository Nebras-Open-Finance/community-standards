---
next: false
prev: false
aside: false
---

🕒 **6 minute read**

# Consent Management Interface — API Guide

This guide explains how to use the API Hub's Consent Manager API to retrieve and manage the data needed to populate each page of the LFI Consent Management Interface (CMI). See the [Requirements](./requirements) page for what each page must display, and the [User Experience](./user-experience) page for interactive wireframes.


## Prerequisites

Before making Consent Manager API calls the LFI must:

1. Have a working mTLS connection to the API Hub — verify with [GET /hello-mtls](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/hello-mtls)
2. Patch the PSU identifier onto each consent using [PATCH /consents/{consentId}](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId) so that consents can be retrieved by user

## Retrieving user consents

To retrieve all consents associated with a customer use:

<span style="color: #22c55e; padding-right: 5px;">GET</span> [`/psu/{userId}/consents`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents)

where `userId` is the LFI's unique identifier for the customer.

The response returns a paginated array of consent objects. Each consent object contains the fields needed to populate the dashboard cards and detail pages described in the [Requirements](./requirements).

### Query parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `consentType` | No | Filter by consent type |
| `status` | No | Filter by consent status |
| `page` | No | Page number for paginated results |
| `pageSize` | No | Number of records per page |

### Alternative retrieval operations

| Operation | Use when |
|-----------|----------|
| [GET /consents/{consentId}](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId) | You need a single consent by its ID |
| [GET /accounts/{accountId}/consents](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/accounts-accountId-consents) | You need all consents linked to a specific account |
| [GET /consents](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents) | You need to search consents by criteria other than user |


## Dashboard — mapping API fields to CMI

The sections below map each CMI field from the [Requirements](./requirements#dashboard--card-content) to the API response property and any transformation the LFI must apply.

### Data Sharing

| # | CMI field | Operation | JSONPath | Guidelines |
|---|-----------|-----------|----------|------------|
| 1 | **TPP name** | GET /psu/{userId}/consents | `$..TradingName` or `$.data[*].tpp.tppName` | If a trading name is supplied in the consent, display it. Otherwise fall back to the TPP name from the Trust Framework. |
| 2 | **Last data shared** | GET /psu/{userId}/consents | `$.data[*].consentUsage.lastDataShared` | |
| 3 | **Connection expires** | GET /psu/{userId}/consents | `$.data[*].request.consent.ExpirationDateTime` | |
| 4 | **Status** | GET /psu/{userId}/consents | `$.data[*].status` | Map to user-friendly label per [Status labels](./requirements#status-labels). |
| 5 | **Consent ID** | GET /psu/{userId}/consents | `$.data[*].id` | Display truncated with copy button. |
| 6 | **IBAN** | GET /psu/{userId}/consents | `$.data[*].accountIds` | The surrogate account identifiers patched onto the consent are returned. The LFI must replace these with the real IBAN — PII is not stored in the API Hub. |
| 7 | **Data permissions** | GET /psu/{userId}/consents | `$.data[*].request.consent.Permissions` | Permissions must be displayed using the standardised data cluster language provided in the Customer Data standards. Map each permission code to its correct language label. |
| 8 | **First Connected** | GET /psu/{userId}/consents or GET /consent-groups/{consentGroupId}/consents | `$.data[*].consentBody.Data.CreationDateTime` | If the consent has a `BaseConsentId`, this must be the `CreationDateTime` of the **first** consent in the consent group. The `BaseConsentId` value is used as the `consentGroupId` parameter. If `BaseConsentId` is not set, use the consent's own `CreationDateTime`. |
| 9 | **Last Updated** | GET /psu/{userId}/consents or GET /consent-groups/{consentGroupId}/consents | `$.data[*].consentBody.Data.CreationDateTime` or `$.data[*].updatedAt` | If the consent has a `BaseConsentId`, this must be the `CreationDateTime` of the **latest** consent in the consent group. If `BaseConsentId` is not set, use the consent's `updatedAt` value. |

### Single Instant Payment

| # | CMI field | Operation | JSONPath | Guidelines |
|---|-----------|-----------|----------|------------|
| 1 | **TPP name** | GET /psu/{userId}/consents | `$..TradingName` or `$.data[*].tpp.tppName` | Same trading name / TPP name fallback as Data Sharing. |
| 2 | **Total paid** | GET /psu/{userId}/consents or GET /payment-log | `$.data[*].consentBody.Data.PaymentConsumption.CumulativeValueOfPayments` or `$.data[*].requestBody.Data.Instruction.Amount.Amount` | For single instant payments the amount matches the payment value. |
| 3 | **Permission Cancelled / Expired / Consumed** | GET /psu/{userId}/consents | `$.data[*].updatedAt` | Terminal states — the last update date reflects when the consent entered that state. |
| 4 | **Last payment made** | GET /psu/{userId}/consents | `$.data[*].consentUsage.lastServiceInitiationAttempt` | |
| 5 | **Payment to** | GET /psu/{userId}/consents or GET /payment-log | `$.data[*].request.consent.PersonalIdentifiableInformation` or `$.data[*].requestBody.Data.PersonalIdentifiableInformation` | Use the value of `Creditor.Name` from either the consent or the payment initiation request, depending on the payment type. |
| 6 | **IBAN** | GET /psu/{userId}/consents or GET /payment-log | Same as above | Use the value of `CreditorAccount.Identification` from either the consent or the payment initiation request. |
| 7 | **Reference** | GET /payment-log | `$.data[*].requestBody.Data.CreditorReference` | |
| 8 | **Payment Purpose** | GET /payment-log | `$.data[*].requestBody.Data.PaymentPurposeCode` | The payment request provides the Aani purpose code, which must be transposed to the correct purpose code description based on Aani reference information. |
| 9 | **From account** | GET /psu/{userId}/consents | `$.data[*].accountIds` or `$.data[*].request.consent.PersonalIdentifiableInformation` | The surrogate account identifiers patched onto the consent must be replaced with the real IBAN. Alternatively, if the TPP provided the debtor IBAN on the consent, use `DebtorAccount.Identification`. |
| 10 | **Payment Rules** | GET /psu/{userId}/consents | `$.data[*].request.consent.ControlParameters` | The displayed properties depend on the values found in control parameters, which differ by payment type. Refer to the [API spec](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents) for available properties. |
| 11 | **You started this permission** | GET /psu/{userId}/consents or GET /consent-groups/{consentGroupId}/consents | `$.data[*].consentBody.Data.CreationDateTime` | Same consent-group logic as Data Sharing "First Connected" — use the first consent's `CreationDateTime` when `BaseConsentId` is set. |
| 12 | **You cancelled this permission** | GET /psu/{userId}/consents | `$.data[*].updatedAt` | |

### Multi Payment (all subtypes)

Multi Payment consents follow the same field mappings as Single Instant Payment, with these additions:

| # | CMI field | Operation | JSONPath | Guidelines |
|---|-----------|-----------|----------|------------|
| 2 | **Total paid to date** | GET /psu/{userId}/consents or GET /payment-log | `$.data[*].consentBody.Data.PaymentConsumption.CumulativeValueOfPayments` | For long-lived consents the `CumulativeValueOfPayments` property is maintained to provide the cumulative value of all payments. |



## Connection history

To provide the **List of Updates** view described in the [Requirements](./requirements#detail-page--list-of-updates), use:

<span style="color: #22c55e; padding-right: 5px;">GET</span> [`/consent-groups/{consentGroupId}/consents`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents)

where `consentGroupId` is the value of `BaseConsentId` on the current consent.

This returns all consents in a consent group — consents that are linked by the same `BaseConsentId`.

### How `BaseConsentId` works

Connection history is driven by "revisions" to consents orchestrated by TPPs: an existing consent is replaced by a new consent with updated permissions or data-access terms. The TPP links the new consent to the original by setting `BaseConsentId` on the new consent to the `ConsentId` of the original consent. All subsequent consents sharing the same history use the same `BaseConsentId` value.

::: danger PSU isolation risk
When a consent is created it contains no customer information — the PSU identity is only added later when the LFI patches in the PSU ID. This means two consents sharing the same `BaseConsentId` are not guaranteed to belong to the same customer. LFIs must ensure that only consents belonging to the same PSU are returned when resolving related consents.
:::

::: info
The [GET /consents/{consentId}/audit](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-audit) operation is **not** the correct way to retrieve connection history. It relates to changes within a single consent, not changes across multiple consents linked by `BaseConsentId`.
:::

### Connection history — Data Sharing & Insurance

| # | CMI field | JSONPath | Guidelines |
|---|-----------|----------|------------|
| 1 | **TPP name** | `$..TradingName` or `$.data[*].tpp.tppName` | Same trading name / TPP name fallback. |
| 2 | **Consent ID** | `$.data[*].id` | |
| 3 | **IBAN** (Data Sharing) | `$.data[*].accountIds` | Replace surrogate IDs with real IBANs. |
| 4 | **Policy number** (Insurance) | `$.data[*].supplementaryInformation.{{policyNumber}}` | Same `supplementaryInformation` or `insurancePolicyIds` approach. |
| 5 | **Policy expires** (Insurance) | `$.data[*].supplementaryInformation.{{policyExpires}}` | Same approach. |
| 6 | **Data permissions** | `$.data[*].request.consent.Permissions` | Map permission codes to standardised language. |
| 7 | **Connection date** (shown as label) | `$.data[*].consentBody.Data.CreationDateTime` | |

### Connection history — Service Initiation

| # | CMI field | JSONPath | Guidelines |
|---|-----------|----------|------------|
| 1 | **Payment to** | `$.data[*].request.consent.PersonalIdentifiableInformation` or payment-log `$.data[*].requestBody.Data.PersonalIdentifiableInformation` | Use `Creditor.Name` from the consent group member or the payment initiation request. |
| 2 | **IBAN** | Same as above | Use `CreditorAccount.Identification`. |
| 3 | **Reference** | `$.data[*].request.consent.DebtorReference` | |
| 4 | **Payment Purpose** | `$.data[*].request.consent.PaymentPurposeCode` | Transpose to purpose code description. |
| 5 | **From account** | `$.data[*].accountIds` or `$.data[*].request.consent.PersonalIdentifiableInformation` | Replace surrogate IDs with real IBANs, or use `DebtorAccount.Identification` if provided by the TPP. |
| 6 | **Payment Rules** | `$.data[*].request.consent.ControlParameters` | Properties vary by payment type. |
| 7 | **Connection date** (shown as label) | `$.data[*].consentBody.Data.CreationDateTime` | |


## Payment history

To provide the **Payment History** tab described in the [Requirements](./requirements#multi-payment--additional-sections), use:

<span style="color: #22c55e; padding-right: 5px;">GET</span> [`/payment-log?consentId={consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log)

This returns a summary of all payments for a given consent. Each payment log entry contains the fields needed to populate a single row in the Payment History tab.

| # | CMI field | JSONPath | Guidelines |
|---|-----------|----------|------------|
| 1 | **TPP name** | `$..TradingName` or `$.data[*].tpp.tppName` | Same trading name / TPP name fallback. |
| 2 | **Total paid to date** | `$.data[*].requestBody.Data.Instruction.Amount.Amount` | Sum the amounts of all successful payments returned by this operation. |
| 3 | **Payment date/time** | `$.data[*].paymentResponse.creationDateTime` | Display as date and time, e.g. `15/02/2025 14:22`. |
| 4 | **Status** | `$.data[*].paymentResponse.status` | Map API status to display label: `AcceptedSettlementCompleted`, `AcceptedCreditSettlementCompleted`, `AcceptedWithoutPosting` → **Successful**; `Rejected` → **Failed**; `Pending` → **Pending**. |
| 5 | **Amount** | `$.data[*].requestBody.Data.Instruction.Amount.Amount` | Display with currency symbol. |
| 6 | **Purpose** | `$.data[*].requestBody.Data.PaymentPurposeCode` | The payment request provides the Aani purpose code. Transpose to the purpose code description, e.g. `ACM` → `Agency Commission (ACM)`. |
| 7 | **Reference** | `$.data[*].requestBody.Data.CreditorReference` | |


## Revoking a consent

When the customer confirms a revocation action on the CMI, the LFI must immediately revoke the consent via:

<span style="color: #ef4444; padding-right: 5px;">POST</span> [`/consents/{consentId}/action/revoke`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke)

This also revokes any associated tokens. The request body must include `revokedBy` set to `LFI.InitiatedByUser`.

```json
{
  "revokedBy": "LFI.InitiatedByUser"
}
```

To revoke all consents in a consent group at once, use:

<span style="color: #ef4444; padding-right: 5px;">POST</span> [`/consent-groups/{consentGroupId}/consents/action/revoke`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke)




## Audit trail

To inspect the change history of a single consent use:

<span style="color: #22c55e; padding-right: 5px;">GET</span> [`/consents/{consentId}/audit`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-audit)

This returns a chronological list of all operations performed on the consent, including the caller details and patch content. This is useful for debugging and compliance but is **not** the same as [connection history](#connection-history).


## Status code mapping

The Consent Manager API returns status codes that must be mapped to user-friendly labels. See [Status labels](./requirements#status-labels) for the full mapping table.

| API status | CMI label |
|---|---|
| `Authorized` | Active |
| `AwaitingAuthorization` | Pending |
| `Revoked` | Cancelled |
| `Suspended` | Suspended |
| `Consumed` | Consumed (or Successful/Failed for payments) |
| `Expired` | Expired |
| `Rejected` | Rejected |

If a status code does not appear in this list, it should be normalised by splitting on word boundaries and maintaining case. If the status requires truncation for display, return the whole of the leftmost word.
