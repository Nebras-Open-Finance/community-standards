---
next: false
prev: false
aside: false
---


# Single Instant Payment - User Experience


## Interactive Demo

Customise the request body fields below and watch the **Consent** and **Authorisation** page previews update live.

<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">domestic_payment_pii</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);">PAR request body field</span>
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
  </div>
</div>

### Live UI Preview

Changes made above are immediately reflected in both panels.

<ConsentAuthLayout>
  <template #consent>
    <ConsentSingleInstantPayment />
  </template>
  <template #auth>
    <AuthorizationSingleInstantPayment />
  </template>
</ConsentAuthLayout>


## UI Behaviour Driven by API Fields


### Debtor Account Selection

The presence or absence of `Initiation.DebtorAccount` in `domestic_payment_pii` determines whether the user selects their account at the LFI or if it is pre-selected by the TPP.

<DebtorAccountSelectionTable />

::: tip
Passing a `DebtorAccount` reduces friction for users who have already selected their account within the TPP's own interface, but removes the user's ability to choose a different account at the LFI.
:::


### Merchant Details

When a TPP processes payments on behalf of a merchant (e.g. a payment aggregator), `Risk.CreditorIndicators.MerchantDetails.MerchantName` can be passed to identify the merchant to the user on the LFI Authorisation Page.

| `Risk.CreditorIndicators.MerchantDetails.MerchantName` | LFI Authorisation Page Behaviour |
|---|---|
| **Passed in** | The merchant name is displayed on the Authorisation Page alongside the creditor details, indicating that the payment is being made on behalf of that merchant. *(See Example 4)* |
| **Not passed in** | No merchant information is shown. Only the creditor details are displayed. *(See Examples 1, 2 & 3)* |


### LFI Warnings & Priority

The LFI may surface one of three warnings on the Authorisation Page based on the account and payment state. Only one warning is shown at a time, with the following priority order:

| Priority | Warning | Warning Text |
|---|---|---|
| **1 (highest)** | Payment Limit Exceeded | *Payment limit exceeded — The amount exceeds the payment limit you've set on your account. You may need to change your settings or try a smaller amount.* |
| **2** | Overdraft | *This payment will take your selected account into an overdraft/unarranged overdraft.* |
| **3** | Duplicate Payment Alert | *Duplicate Payment Alert — Our systems indicate that you have already made a payment of the same amount to this beneficiary in the last 24 hours. Please check and ensure that you are not making a duplicate payment.* |

If a higher-priority warning applies, lower-priority warnings are suppressed. For example, if both a payment limit breach and a duplicate are detected, only the Payment Limit Exceeded warning is shown.


### Creditor Configuration

The presence or absence of creditors in `Initiation.Creditor` in `domestic_payment_pii` determines how the LFI presents payment recipient information to the user.

| `Initiation.Creditor` | LFI Authorisation Page Behaviour |
|---|---|
| **1 creditor** | The single payee's name and account details are displayed under "Who you're paying". *(See Example 1)* |
| **2–10 defined creditors** | ❌ **Not Supported** |
| **Undefined** (absent or empty) | ❌ **Not Supported** |


### Permissions and Data Access

The table below describes the text shown to users on the Consent Page.

<ServiceInitiationPermissionText />



## Example User Journeys

#### Example 1 - User selects account at LFI

<ImageViewer
  src="/images/user-experience/single-instant-payment/1.png"
  alt="single-instant-payment-journey"
/>

#### Example 2 - User selects account at TPP (duplicate payment warning)

<ImageViewer
  src="/images/user-experience/single-instant-payment/2.png"
  alt="single-instant-payment-journey"
/>

#### Example 3 - User selects account at TPP (overdraft warning)

<ImageViewer
  src="/images/user-experience/single-instant-payment/3.png"
  alt="single-instant-payment-journey"
/>

#### Example 4 - User selects account at LFI (merchant details passed in by TPP)

<ImageViewer
  src="/images/user-experience/single-instant-payment/4.png"
  alt="single-instant-payment-journey"
/>