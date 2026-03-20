---
next: false
prev: false
aside: false
---


# Bank Data Sharing - User Experience

Before a customer is redirected to Open Finance to consent to Data Sharing, you must present a Consent Page that clearly explains what the customer is consenting to and collects their explicit, informed consent. This page must accurately reflect the scope, purpose, and nature of the data being shared. The examples and interactive wireframes provided below define the expected structure, content, and behaviour of the Consent Page and must be followed.

While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the consent content, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval.

## Interactive Demo

Customise the `authorization_details` object below and watch the **Consent** and **Authorisation** page previews update live. Try changing permissions, account types, date ranges, or the TPP name to see how the pages respond.

<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">authorization_details</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">PAR request body field</span>
    </div>
    <a href="/tech/tpp-standards/v2.1/consent/open-api/par" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View PAR endpoint ↗</a>
  </div>
  <EditableJson spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
    schemaName="AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties"
    :initialData="initialFormData"
    :customValidator="myCustomValidator"
    stateField="consent"
  />
</div>




<script setup>
import { ref } from 'vue'


const myCustomValidator = (value) => {
if (
  (() => {
    const expiration = new Date(value.consent.ExpirationDateTime);
    const now = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(now.getFullYear() + 1);

    return expiration <= now || expiration >= oneYearFromNow;
  })()
) {
  return "consent.ExpirationDateTime cannot be in the past and must be less than a year in the future.";
} else if (
  (() => {
    const perms = value.consent?.Permissions || [];

    const dependentPermissions = [
      "ReadBalances",
      "ReadBeneficiariesBasic",
      "ReadBeneficiariesDetail",
      "ReadTransactionsBasic",
      "ReadTransactionsDetail",
      "ReadProduct",
      "ReadScheduledPaymentsBasic",
      "ReadScheduledPaymentsDetail",
      "ReadDirectDebits",
      "ReadStandingOrdersBasic",
      "ReadStandingOrdersDetail",
      "ReadStatements",
      "ReadProductFinanceRates"
    ];

    const hasDependentPermission = dependentPermissions.some(p =>
      perms.includes(p)
    );

    const hasAccountPermission =
      perms.includes("ReadAccountsBasic") ||
      perms.includes("ReadAccountsDetail");

    return hasDependentPermission && !hasAccountPermission;
  })()
) {
  return "ReadAccountsBasic or ReadAccountsDetail must be provided when permissions that require an accountId are included.";
}
  return null
}

const initialFormData = ref({
                "type": "urn:openfinanceuae:account-access-consent:v2.1",
                "consent": {
                    "ExpirationDateTime": "2026-12-25T23:00:00.000Z",
                    "OnBehalfOf": {
                        "TradingName": "Nebras",
                        "LegalName": "Nebras Open Finance Ltd",
                        "IdentifierType": "Other",
                        "Identifier": "Identifier"
                    },
                    "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
                    "BaseConsentId": "b9f42378-10ac-46a1-8d20-4e020484216d",
                    "AccountType": ["Retail"],
                    "AccountSubType": ["CurrentAccount", "Savings"],
                    "Permissions": [
                        "ReadAccountsBasic",
                         "ReadAccountsDetail",
                          "ReadBalances",
                          "ReadBeneficiariesBasic",
                          "ReadBeneficiariesDetail", 
                        //   "ReadFXTransactionsBasic", 
                        //   "ReadFXTransactionsDetail", 
                        //   "ReadFXRemittanceCharges", 
                          "ReadTransactionsBasic", 
                          "ReadTransactionsDetail", 
                          "ReadProduct", 
                          "ReadScheduledPaymentsBasic", 
                          "ReadScheduledPaymentsDetail", 
                          "ReadDirectDebits", 
                          "ReadStandingOrdersBasic", 
                          "ReadStandingOrdersDetail", 
                          "ReadStatements", 
                          "ReadPartyUser", 
                          "ReadPartyUserIdentity", 
                          "ReadParty",
                          "ReadProductFinanceRates"
                    ],
                    "FromDate": "2025-03-01",
                    "ToDate": "2025-03-31",
                    "OpenFinanceBilling": {
                        "UserType": "Retail",
                        "Purpose": "AccountAggregation"
                    },
                },
                "subscription": {
                    "Webhook": {
                        "Url": "https://webhook.site/mock-event-receiver",
                        "IsActive": false
                    }
                }
            }
            
            )
</script>


Configure the mock accounts the authenticated user holds at their bank. Only accounts whose type matches the `AccountSubType` filter in `authorization_details` above will appear on the Authorisation Page.

<AccountEditor />

### Live UI Preview

Changes made above are immediately reflected in both panels.

<ConsentAuthLayout>
  <template #consent>
    <ConsentBankDataSharing />
  </template>
  <template #auth>
    <AuthorizationBankDataSharing />
  </template>
</ConsentAuthLayout>

## UI Behaviour Driven by API Fields

### Permissions and Data Access

The table below outlines the text displayed to users on the Consent Page when they expand each data category associated with the consent permissions.

<PermissionsReference />


### Account Sub Type Filtering

The `AccountSubType` field in `authorization_details` acts as a filter, controlling which of the user's accounts are presented for selection on the LFI Authorisation Page.

| `AccountSubType` | LFI Authorisation Page Behaviour |
|---|---|
| **Provided** | Only accounts whose sub-type matches one of the specified values are shown. If the user holds no accounts of the requested sub-type, the LFI returns an error and the authorisation flow cannot proceed. |
| **Not provided** | All of the user's available accounts are shown for selection, regardless of account type. |

::: tip
Use `AccountSubType` to restrict access to specific account types (e.g. `Mortgage`). Omit it to allow selection from all account types.
:::


## Example User Journeys

#### Example 1 - Current and Savings Account

<ImageViewer
  src="/images/user-experience/data-sharing/1.png"
  alt="bank-data-sharing-journey"
/>

#### Example 2 - Current Account, Savings Account, Credit Card, Mortgage & Auto Finance

<ImageViewer
  src="/images/user-experience/data-sharing/2.png"
  alt="bank-data-sharing-journey"
/>

#### Example 3 - Current Account, Current Account (USD) & Current Account (INR)

<ImageViewer
  src="/images/user-experience/data-sharing/3.png"
  alt="bank-data-sharing-journey"
/>