---
next: false
prev: false
aside: false
---


# Bank Data Sharing - User Journeys


## Consent Journey Example

Bank Data Sharing allows a user to consent to sharing specific elements of their banking data through **Open Finance**. As outlined in the [API Guide](./api-guide) and [requirements](./requirements), the user follows a structured journey:

1. **Consent Page**  
   The user is presented with a **Consent page** summarizing the details of the data they are about to share. Once the user provides consent, the **TPP stages the consent**, making it ready for user authorization.

2. **Redirect to LFI**  
   The user is redirected to the **LFI** to:
   - **Authenticate** with their bank.  
   - **Authorize** the previously staged consent object.  

   Upon authorization, the consent is confirmed, and the authorization process is finalized. The user is then redirected back to the TPP.

3. **Access to Banking Data**  
   Once the consent is in the **`authorized`** state, the TPP can access the user’s banking data according to the consent details specified by the user.

### Example Journey

<br>

<img src="/images/journeys/data-sharing.png" alt="bank-data-sharing-journey" />


## Consent Pages

- AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties from [/par](../../../../consent/open-api/par)


<EditableJson spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
  schemaName="AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties"
  :initialData="initialFormData"
  />




<script setup>
import { ref } from 'vue'

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


### UI - User has Current Account And Savings Account

<div style="display: flex; justify-content: space-between; align-items: flex-start;">
<ConsentBankDataSharing />
<AuthorizationBankDataSharing />
</div>

