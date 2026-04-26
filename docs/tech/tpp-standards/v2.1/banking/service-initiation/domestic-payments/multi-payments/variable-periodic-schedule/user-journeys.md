---
next: false
prev: false
aside: false
---

🕒 **4 minute read**

# Variable Periodic Schedule - User Experience

Before a customer authorises a Variable Periodic Schedule payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to make recurring payments of varying amounts at a set frequency. This page must accurately reflect the key details of the consent (payee, the maximum amount per payment, payment frequency, etc.) The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed.

While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval.

## Interactive Demo

Customise the request body fields below and watch the **Consent** and **Authorisation** page previews update live.

<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">domestic_payment_pii</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">PAR request body (AEDomesticPaymentPII)</span>
    </div>
    <a href="/tech/tpp-standards/v2.1/consent/open-api/par" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View PAR endpoint ↗</a>
  </div>
  <EditableJson spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
    schemaName="AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
    :initialData="initialFormDataPII"
    stateField="pii"
    :customValidator="myPIICustomValidator"
  />
</div>


<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">authorization_details</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">PAR request body field</span>
    </div>
    <a href="/tech/tpp-standards/v2.1/consent/open-api/par" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View PAR endpoint ↗</a>
  </div>
  <EditableJson
    spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
    schemaName="AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties"
    :excludedFields="['consent.PersonalIdentifiableInformation']"
    :initialData="initialFormDataSIP"
    :customValidator="myCustomValidator"
  />
</div>


<script setup>
import { ref, watch } from 'vue'
import { useSharedState } from '../../../../../../../../components/Composables/useSharedState.ts'
import { purposeCodes } from '../../../../../../../../components/Composables/aaniPaymentCodes.ts'
import { futureDateTime, futureDateOnly } from '../../../../../../../../components/Composables/futureDates.ts'

const expirationDateTime = futureDateTime(330)
const periodStartDate = futureDateOnly(14)


const { sharedState } = useSharedState()

const simulateDuplicatePayment = ref(false)
watch(simulateDuplicatePayment, (val) => {
  sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, duplicatePaymentAlert: val }
}, { immediate: true })

const simulatePaymentLimitExceeded = ref(false)
watch(simulatePaymentLimitExceeded, (val) => {
  sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, paymentLimitExceeded: val }
}, { immediate: true })

const myCustomValidator = (value) => {
  if (value?.consent?.ControlParameters?.IsDelegatedAuthentication === true) {
    return "value?.consent?.ControlParameters?.IsDelegatedAuthentication must be false or not set."
  }
  if (
    !value?.consent ||
    !value?.consent?.ControlParameters ||
    !value?.consent?.ControlParameters?.ConsentSchedule ||
    !value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment ||
    !value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule ||
    value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Type !== 'VariablePeriodicSchedule' ||
    value?.consent?.ControlParameters?.ConsentSchedule?.SinglePayment ||
    value?.consent?.ControlParameters?.ConsentSchedule?.FilePayment
  ) {
    return "consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type must be 'VariablePeriodicSchedule'"
  } 
  if (
    !value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeNumberOfPayments
    )
    {
        return "MaximumCumulativeNumberOfPayments is required"
    }
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
    }

    if (value.consent.PaymentPurposeCode && !purposeCodes[value.consent.PaymentPurposeCode]) {
        return `consent.PaymentPurposeCode '${value.consent.PaymentPurposeCode}' is not a valid purpose code`
    }

    const perms = value.consent.Permissions || []
    if (perms.includes('ReadBalances') && !perms.includes('ReadAccountsBasic') && !perms.includes('ReadAccountsDetail')) {
        return "consent.Permissions: ReadBalances requires ReadAccountsBasic or ReadAccountsDetail"
    }

    if (value.consent.AuthorizationExpirationDateTime) {
        const authExpiry = new Date(value.consent.AuthorizationExpirationDateTime)
        const now = new Date()
        if (authExpiry < now) {
        return "consent.AuthorizationExpirationDateTime must not be in the past"
        }
        if (value.consent.ExpirationDateTime && authExpiry > new Date(value.consent.ExpirationDateTime)) {
        return "consent.AuthorizationExpirationDateTime must not be after consent.ExpirationDateTime"
        }
    }

    const periodStartDate = value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.PeriodStartDate
    if (periodStartDate) {
        const startDate = new Date(periodStartDate)
        startDate.setHours(0, 0, 0, 0)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (startDate < today) {
            return "consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodStartDate must not be in the past"
        }
        if (value.consent.ExpirationDateTime && startDate > new Date(value.consent.ExpirationDateTime)) {
            return "consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodStartDate must not be after consent.ExpirationDateTime"
        }
    }
  return null
}

const initialFormDataSIP = ref({
                "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
                "consent": {
                    "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
                    "IsSingleAuthorization": true,
                    "ExpirationDateTime": expirationDateTime,
                    "BaseConsentId": "b9f42378-10ac-46a1-8d20-4e020484216d",
                    "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"],
                    "ControlParameters": {
                        "ConsentSchedule": {
                            "MultiPayment": {
                                "MaximumCumulativeNumberOfPayments": 2,
                                "MaximumCumulativeValueOfPayments": {
                                    "Amount": "500.00",
                                    "Currency": "AED"
                                },
                                "PeriodicSchedule": {
                                    "Type": "VariablePeriodicSchedule",
                                    "PeriodType": "Week",
                                    "PeriodStartDate": periodStartDate,
                                    "MaximumIndividualAmount": {
                                            "Amount": "200.00",
                                            "Currency": "AED"
                                    },
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


const myPIICustomValidator = (value) => {
 if (
   !value.Initiation.Creditor     
    ) {
    return "value.Initiation.Creditor is required for Type 'VariablePeriodicSchedule'"

  }    
  else if (
    value.Initiation.Creditor.length > 1
    ) {
    return "Only a single Creditor is required for Type 'VariablePeriodicSchedule'"
  }
  return null
}

const initialFormDataPII = ref({
  "Initiation": {
     "DebtorAccount": {
       "SchemeName": "IBAN",
       "Identification": "AE070331234567890123456",
       "Name": {
         "en": "Mohammed Al Rashidi",
       }
     },
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
  }
})
</script>


<!--@include: _shared/live-preview.md-->

<!--@include: _shared/ui-behaviour.md-->

<!--@include: _shared/example-journeys.md-->
