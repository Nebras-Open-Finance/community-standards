<route lang="yaml">
meta:
  title: Variable Periodic Schedule - User Experience
  next: false
  prev: false
  aside: false
</route>

<script setup>
import { purposeCodes } from '@/components/common/composables/aaniPaymentCodes.ts'
import { domesticPaymentPiiScenarios, paymentConsentScenarios } from '@/data/editor-scenarios'
import { futureDateTime, futureDateOnly } from '@/components/common/composables/futureDates.ts'
import WireframePreview from '../../../../../../../tpp-standards/v2.2-draft/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/_shared/WireframePreview.vue'
import AccountSetup from '../../../../../../../tpp-standards/v2.2-draft/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/_shared/AccountSetup.vue'
import UIBehaviour from '../../../../../../../tpp-standards/v2.2-draft/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/_shared/UIBehaviour.vue'
import ExampleJourneys from '../../../../../../../tpp-standards/v2.2-draft/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/_shared/ExampleJourneys.vue'

const expirationDateTime = futureDateTime(330)
const periodStartDate = futureDateOnly(14)


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
    value?.Data?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Type !== 'VariablePeriodicSchedule' ||
    value?.Data?.ControlParameters?.ConsentSchedule?.SinglePayment ||
    value?.Data?.ControlParameters?.ConsentSchedule?.FilePayment
  ) {
    return "Data.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type must be 'VariablePeriodicSchedule'"
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

const piiScenarios = domesticPaymentPiiScenarios(initialFormDataPII.value)
const consentScenarios = paymentConsentScenarios(initialFormDataSIP.value, 'Data')
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Banking · Service Initiation · Variable Periodic Schedule · UX
        </div>
        <h1 class="ed-doc__title">
          Variable Periodic Schedule &mdash; User Experience
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When a customer is redirected to you to authorize a Variable Periodic Schedule payment consent
          through Open Finance, you must present an <strong>Authorization Page</strong> that clearly explains
          the payment the customer is authorizing &mdash; that recurring payments of varying amounts will be
          made at a set frequency. The page must collect the customer's explicit and informed consent, and it
          must accurately reflect the key details of the consent (payee, the maximum amount per payment,
          payment frequency, etc.)
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The examples and interactive wireframes provided below define the expected structure, content, and
          behavior of the Authorization Page and must be followed.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          While you may adapt visual elements such as color palette, fonts, and styling, you must not alter
          the meaning, clarity, or completeness of the payment information shown. The representation of
          <strong>AlTareq</strong> (including logos, naming, and action buttons) must be preserved at all
          times. The customer must be able to clearly understand what payment they are authorizing and that
          the authorization is part of the AlTareq ecosystem.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          Your Authorization Page must be submitted as part of <strong>CX certification</strong> prior to
          production. Any material changes to a production Authorization Page must also be resubmitted for
          review and approval.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="interactive-demo"
      num="01"
      color="var(--at-teal)"
      eyebrow="Interactive Demo"
      title="Edit the consent and watch the previews respond"
      tone="cream"
    >
      <WireframePreview />

      <EdProse>
        Customise the request body fields below and watch the <strong>Consent</strong> and
        <strong>Authorisation</strong> page previews update live.
      </EdProse>

      <EditableJson
        spec="/openapi-drafts/v2.2-draft/uae-api-hub-consent-manager-openapi.yaml"
        schema-name="AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
        :initial-data="initialFormDataPII"
        :scenarios="piiScenarios"
        state-field="pii"
        :custom-validator="myPIICustomValidator"
        label="domestic_payment_pii"
        description="Consent Body (AEDomesticPaymentPII)"
        endpoint-href="/tech/lfi-api-hub/v2.2-draft/api-hub/consent-manager/open-api/consents-consentId"
        endpoint-label="View Consent endpoint"
      />

      <EditableJson
        spec="/openapi-drafts/v2.2-draft/uae-api-hub-consent-manager-openapi.yaml"
        schema-name="AEPaymentConsentResponse"
        :excluded-fields="['Data.PersonalIdentifiableInformation']"
        :initial-data="initialFormDataSIP"
        :scenarios="consentScenarios"
        :custom-validator="myCustomValidator"
        label="consentBody"
        description="AEPaymentConsentResponse"
        endpoint-href="/tech/lfi-api-hub/v2.2-draft/api-hub/consent-manager/open-api/consents-consentId"
        endpoint-label="View Consent endpoint"
      />

      <AccountSetup />
    </EdSectionBand>

    <EdSectionBand
      id="ui-behaviour"
      num="02"
      color="var(--at-gold)"
      eyebrow="Field-Driven UI"
      title="How API request fields change what the user sees"
      tone="surface"
    >
      <UIBehaviour />
    </EdSectionBand>

    <EdSectionBand
      id="example-journeys"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Examples"
      title="Sample user journeys"
      tone="cream"
    >
      <ExampleJourneys />
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 70rem;
  color: var(--at-mute-2);
}
.ed-doc__lede--tight { margin-top: 1.25rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}

</style>
