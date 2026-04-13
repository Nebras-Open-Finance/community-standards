---
next: false
prev: false
aside: false
---


# Bank Data Sharing - User Experience

When a customer is redirected to you to authorize an Open Finance consent for data sharing, you must present an Authorization Page that clearly explains what the customer is authorizing. The page must collect the customer’s explicit and informed consent, and it must accurately reflect the scope and nature of the data being shared.

The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Consent Page and must be followed.

While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the consent content. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what they are authorizing and that the authorization is part of the AlTareq ecosystem.

Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval.

## Interactive Demo

Customise the `consentBody` object below and watch the **Consent** and **Authorisation** page previews update live. Try changing permissions, account types, date ranges, or the TPP name to see how the pages respond.

<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">consentBody</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">AEAccountAccessConsentBody</span>
    </div>
    <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View Consent endpoint ↗</a>
  </div>
  <EditableJson spec="/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
    schemaName="AEAccountAccessConsentBody"
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
    const expiration = new Date(value.Data.ExpirationDateTime);
    const now = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(now.getFullYear() + 1);

    return expiration <= now || expiration >= oneYearFromNow;
  })()
) {
  return "Data.ExpirationDateTime cannot be in the past and must be less than a year in the future.";
} else if (
  (() => {
    const perms = value.Data?.Permissions || [];

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
                "Data": {
                    "ExpirationDateTime": "2026-12-25T23:00:00.000Z",
                    "OnBehalfOf": {
                        "TradingName": "Nebras",
                        "LegalName": "Nebras Open Finance Ltd",
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


<!--@include: ../../../../tpp-standards/v2.1/banking/data-sharing/_shared/live-preview.md-->

<!--@include: ../../../../tpp-standards/v2.1/banking/data-sharing/_shared/ui-behaviour.md-->

<!--@include: ../../../../tpp-standards/v2.1/banking/data-sharing/_shared/example-journeys.md-->