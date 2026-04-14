---
next: false
prev: false
aside: false
---


# Variable Defined Schedule - User Experience

When a customer is redirected to you to authorize a Variable Defined Schedule payment consent through Open Finance, you must present an Authorization Page that clearly explains the payment the customer is authorizing — that a pre-defined series of payments will be made, each on a specific date and up to a variable maximum amount. The page must collect the customer's explicit and informed consent, and it must accurately reflect the key details of the consent (payee, the complete list of scheduled payment dates and the maximum amount for each, etc.)

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
import { generateScheduleDates, futureDateTime } from '../../../../../../../../components/Composables/futureDates.ts'

const scheduleAmounts = ["500.00", "1200.00", "300.00", "300.00", "300.00", "400.00", "500.00", "1200.00", "300.00", "300.00", "300.00", "400.00"]
const scheduleDates = generateScheduleDates(scheduleAmounts.length)
const expirationDateTime = futureDateTime(10 + (scheduleAmounts.length - 1) * 28)


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
    value?.Data?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Type !== 'VariableDefinedSchedule' ||
    value?.Data?.ControlParameters?.ConsentSchedule?.SinglePayment ||
    value?.Data?.ControlParameters?.ConsentSchedule?.FilePayment
  ) {
    return "Data.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type must be 'VariableDefinedSchedule'"
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

    const schedule = value?.Data?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Schedule
    if (Array.isArray(schedule)) {
        const dates = schedule.map(item => item.PaymentExecutionDate)
        const duplicates = dates.filter((date, i) => dates.indexOf(date) !== i)
        if (duplicates.length > 0) {
            return `Schedule contains duplicate PaymentExecutionDate: ${[...new Set(duplicates)].join(', ')}`
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const lastExecDateStr = [...dates].sort().at(-1)
        for (const item of schedule) {
            const execDate = new Date(item.PaymentExecutionDate)
            execDate.setHours(0, 0, 0, 0)
            if (execDate < today) {
                return `Schedule PaymentExecutionDate '${item.PaymentExecutionDate}' must be today or in the future`
            }
        }
        if (value.Data.ExpirationDateTime) {
            const expirationDate = value.Data.ExpirationDateTime.substring(0, 10)
            if (expirationDate !== lastExecDateStr) {
                return `Data.ExpirationDateTime date (${expirationDate}) must match the last PaymentExecutionDate in the schedule (${lastExecDateStr})`
            }
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
                                "MaximumCumulativeNumberOfPayments": 12,
                                "MaximumCumulativeValueOfPayments": {
                                    "Amount": "6000.00",
                                    "Currency": "AED"
                                },
                                "PeriodicSchedule": {
                                    "Type": "VariableDefinedSchedule",
                                    "Schedule": scheduleDates.map((date, i) => ({
                                      "PaymentExecutionDate": date,
                                      "MaximumIndividualAmount": {
                                        "Amount": scheduleAmounts[i],
                                        "Currency": "AED"
                                      }
                                    }))
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
    return "value.Initiation.Creditor is required for Type 'VariableDefinedSchedule'"

  }    
  else if (
    value.Initiation.Creditor.length > 1
    ) {
    return "Only a single Creditor is required for Type 'VariableDefinedSchedule'"
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


<!--@include: ../../../../../../../tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/_shared/live-preview.md-->

<!--@include: ../../../../../../../tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/_shared/ui-behaviour.md-->

<!--@include: ../../../../../../../tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/_shared/example-journeys.md-->
