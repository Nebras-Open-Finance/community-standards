---
next: false
prev: false
aside: false
---


# Domestic Payments - Single Instant Payment - User Journeys

- AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties from [/par](../../../../consent/open-api/par)


<EditableJson
  spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
  schemaName="AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties"
  :excludedFields="['consent.PersonalIdentifiableInformation']"
  :initialData="initialFormDataSIP"
  :customValidator="myCustomValidator" 
/>


- AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII from [/par](../../../../consent/open-api/par)

<EditableJson spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
  schemaName="AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
  :initialData="initialFormDataPII"
  stateField="pii"
  />





<script setup>
import { ref } from 'vue'

const myCustomValidator = (value) => {
  if (
    !value.consent ||
    !value.consent.ControlParameters ||
    !value.consent.ControlParameters.ConsentSchedule ||
    !value.consent.ControlParameters.ConsentSchedule.SinglePayment ||
    value.consent.ControlParameters.ConsentSchedule.SinglePayment.Type !== 'SingleInstantPayment' ||
    value.consent.ControlParameters.ConsentSchedule.MultiPayment ||
    value.consent.ControlParameters.ConsentSchedule.FilePayment
  ) {
    return "consent.ControlParameters.ConsentSchedule.SinglePayment.Type must be 'SingleInstantPayment'"
  }
  return null
}

const initialFormDataSIP = ref({
                "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
                "consent": {
                    "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
                    "IsSingleAuthorization": true,
                    "ExpirationDateTime": "2026-12-25T23:00:00.000Z",
                    "BaseConsentId": "b9f42378-10ac-46a1-8d20-4e020484216d",
                    "AuthorizationExpirationDateTime": "2026-12-25T23:00:00.000Z",
                    "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"],
                    "ControlParameters": {
                        "ConsentSchedule": {
                            "SinglePayment": {
                                "Type": "SingleInstantPayment",
                                "Amount": {
                                    "Amount": "100.00",
                                    "Currency": "AED"
                                }
                            }
                        }
                    },
                    "PaymentPurposeCode": "ACM",
                    "DebtorReference": "Test Purchase",
                    "CreditorReference": "Test Purchase"
                },
                "subscription": {
                    "Webhook": {
                        "Url": "https://webhook.site/mock-event-receiver",
                        "IsActive": false
                    }
                }
            })

  const initialFormDataPII = ref(
    {"Initiation": {
            "Creditor": [
                {
                    "Creditor": {
                        "Name": "Ivan England"
                    },
                    "CreditorAccount": {
                        "SchemeName": "IBAN",
                        "Identification": "AE070331234567890123456",
                        "Name": {
                            "en": "Ivan David England"
                        }
                    }
                }
            ]
        },
        "Risk": {
            "DebtorIndicators": {
                "UserName": {
                    "en": "xx"
                } 
            },
            "CreditorIndicators": {
                "IsCreditorConfirmed": true,
                "IsCreditorPrePopulated": true
            }
        }
        })      
</script>


### UI - User has Current Account And Savings Account

<div style="display: flex; justify-content: space-between; align-items: flex-start;">


<ConsentSingleInstantPayment />
<AuthorizationSingleInstantPayment />
</div>
