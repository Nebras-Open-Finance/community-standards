---
next: false
prev: false
aside: false
---


# Fixed Periodic Schedule - User Experience

When a customer is redirected to you to authorize a Fixed Periodic Schedule payment consent through Open Finance, you must present an Authorization Page that clearly explains the payment the customer is authorizing — that recurring payments of a fixed amount will be made at a set frequency. The page must collect the customer's explicit and informed consent, and it must accurately reflect the key details of the consent (payee, amount per payment, payment frequency, etc.)

The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed.

While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what payment they are authorizing and that the authorization is part of the AlTareq ecosystem.

Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval.

## Interactive Demo

Customise the request body fields below and watch the **Consent** and **Authorisation** page previews update live.

<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">domestic_payment_pii</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">Consent Body (AEDomesticPaymentPII)</span>
    </div>
    <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View Consent endpoint ↗</a>
  </div>
  <EditableJson spec="/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
    schemaName="AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
    :initialData="initialFormDataPII"
    stateField="pii"
    :customValidator="myPIICustomValidator"
  />
</div>


<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">consentBody</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">AEPaymentConsentResponse</span>
    </div>
    <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View Consent endpoint ↗</a>
  </div>
  <EditableJson
    spec="/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
    schemaName="AEPaymentConsentResponse"
    :excludedFields="['Data.PersonalIdentifiableInformation']"
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
  if (value?.Data?.ControlParameters?.IsDelegatedAuthentication === true) {
    return "value?.Data?.ControlParameters?.IsDelegatedAuthentication must be false or not set."
  }
  if (
    !value?.Data ||
    !value?.Data?.ControlParameters ||
    !value?.Data?.ControlParameters?.ConsentSchedule ||
    !value?.Data?.ControlParameters?.ConsentSchedule?.MultiPayment ||
    !value?.Data?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule ||
    value?.Data?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Type !== 'FixedPeriodicSchedule' ||
    value?.Data?.ControlParameters?.ConsentSchedule?.SinglePayment ||
    value?.Data?.ControlParameters?.ConsentSchedule?.FilePayment
  ) {
    return "Data.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type must be 'FixedPeriodicSchedule'"
  } 
  
  if (
    !value?.Data?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeNumberOfPayments
    )
    {
        return "MaximumCumulativeNumberOfPayments is required"
    }
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
    }

    if (value.Data.PaymentPurposeCode && !purposeCodes[value.Data.PaymentPurposeCode]) {
        return `Data.PaymentPurposeCode '${value.Data.PaymentPurposeCode}' is not a valid purpose code`
    }

    const perms = value.Data.Permissions || []
    if (perms.includes('ReadBalances') && !perms.includes('ReadAccountsBasic') && !perms.includes('ReadAccountsDetail')) {
        return "Data.Permissions: ReadBalances requires ReadAccountsBasic or ReadAccountsDetail"
    }

    if (value.Data.AuthorizationExpirationDateTime) {
        const authExpiry = new Date(value.Data.AuthorizationExpirationDateTime)
        const now = new Date()
        if (authExpiry < now) {
        return "Data.AuthorizationExpirationDateTime must not be in the past"
        }
        if (value.Data.ExpirationDateTime && authExpiry > new Date(value.Data.ExpirationDateTime)) {
        return "Data.AuthorizationExpirationDateTime must not be after Data.ExpirationDateTime"
        }
    }

    const periodStartDate = value?.Data?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.PeriodStartDate
    if (periodStartDate) {
        const startDate = new Date(periodStartDate)
        startDate.setHours(0, 0, 0, 0)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (startDate < today) {
            return "Data.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodStartDate must not be in the past"
        }
        if (value.Data.ExpirationDateTime && startDate > new Date(value.Data.ExpirationDateTime)) {
            return "Data.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodStartDate must not be after Data.ExpirationDateTime"
        }
    }
  return null
}

const initialFormDataSIP = ref({
  "Data": {
    "Status": "AwaitingAuthorization",
                    "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
                    "IsSingleAuthorization": true,
                    "ExpirationDateTime": expirationDateTime,
                    "BaseConsentId": "b9f42378-10ac-46a1-8d20-4e020484216d",
                    "AuthorizationExpirationDateTime": expirationDateTime,
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
                                    "Type": "FixedPeriodicSchedule",
                                    "PeriodType": "Week",
                                    "PeriodStartDate": periodStartDate,
                                    "Amount": {
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
                }
            })


const myPIICustomValidator = (value) => {
 if (
   !value.Initiation.Creditor     
    ) {
    return "value.Initiation.Creditor is required for Type 'FixedPeriodicSchedule'"

  }    
  else if (
    value.Initiation.Creditor.length > 1
    ) {
    return "Only a single Creditor is required for Type 'FixedPeriodicSchedule'"
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


<!--@include: ../../../../../../../tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/_shared/live-preview.md-->

<!--@include: ../../../../../../../tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/_shared/ui-behaviour.md-->

<!--@include: ../../../../../../../tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/_shared/example-journeys.md-->
