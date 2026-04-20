---
next: false
prev: false
aside: false
---


# Single Instant Payment - User Experience

Before a customer authorises a payment through Open Finance, you must present a Consent Page that clearly explains the payment they are consenting to. This page must accurately reflect the payee, amount, schedule, and all material terms of the payment consent. The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed.

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
import { useSharedState } from '../../../../../../../components/Composables/useSharedState.ts'
import { purposeCodes } from '../../../../../../../components/Composables/aaniPaymentCodes.ts'
import { futureDateTime } from '../../../../../../../components/Composables/futureDates.ts'

const expirationDateTime = futureDateTime(330)

const { sharedState } = useSharedState()

const simulateDuplicatePayment = ref(false)
watch(simulateDuplicatePayment, (val) => {
  sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, duplicatePaymentAlert: val }
}, { immediate: true })

const simulatePaymentLimitExceeded = ref(false)
watch(simulatePaymentLimitExceeded, (val) => {
  sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, paymentLimitExceeded: val }
}, { immediate: true })

const simulateAlreadyTrustedPayee = ref(false)
watch(simulateAlreadyTrustedPayee, (val) => {
  sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, alreadyTrustedPayee: val }
}, { immediate: true })

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

const myPIICustomValidator = (value) => {
  if (
   !value.Initiation.Creditor     
    ) {
    return "value.Initiation.Creditor is required for Type 'SingleInstantPayment'"

  }    
  else if (
    value.Initiation.Creditor.length > 1
    ) {
    return "Only a single Creditor is required for Type 'SingleInstantPayment'"
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
  },
  "Risk": {
    "CreditorIndicators": {
      "MerchantDetails": {
        "MerchantName": "Al Noor General"
      }
    }
  }
})
</script>


<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe;">
    <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">Simulated Accounts Behaviour</span>
  </div>
  <div style="padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
    <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.85rem; color: #1a202c; user-select: none;">
      <input type="checkbox" v-model="simulateDuplicatePayment" style="width: 15px; height: 15px; cursor: pointer; accent-color: rgba(0,39,127,0.7);" />
      <span>Duplicate Payment Alert</span>
    </label>
    <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.85rem; color: #1a202c; user-select: none;">
      <input type="checkbox" v-model="simulatePaymentLimitExceeded" style="width: 15px; height: 15px; cursor: pointer; accent-color: rgba(0,39,127,0.7);" />
      <span>Payment Limit Exceeded</span>
    </label>
    <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.85rem; color: #1a202c; user-select: none;">
      <input type="checkbox" v-model="simulateAlreadyTrustedPayee" style="width: 15px; height: 15px; cursor: pointer; accent-color: rgba(0,39,127,0.7);" />
      <span>Already a Trusted Payee</span>
    </label>
  </div>
</div>

<!--@include: _shared/live-preview.md-->

<!--@include: _shared/ui-behaviour.md-->

<!--@include: _shared/example-journeys.md-->