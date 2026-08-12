<route lang="yaml">
meta:
  title: Variable Defined Schedule - User Experience
  next: false
  prev: false
  aside: false
</route>

<script setup>
import { purposeCodes } from '@/components/common/composables/aaniPaymentCodes.ts'
import { domesticPaymentPiiScenarios, paymentConsentScenarios } from '@/data/editor-scenarios'
import { generateScheduleDates, futureDateTime } from '@/components/common/composables/futureDates.ts'
import WireframePreview from './_shared/WireframePreview.vue'
import AccountSetup from './_shared/AccountSetup.vue'
import UIBehaviour from './_shared/UIBehaviour.vue'
import ExampleJourneys from './_shared/ExampleJourneys.vue'

const scheduleAmounts = ["500.00", "1200.00", "300.00", "300.00", "300.00", "400.00", "500.00", "1200.00", "300.00", "300.00", "300.00", "400.00"]
const scheduleDates = generateScheduleDates(scheduleAmounts.length)
const expirationDateTime = futureDateTime(10 + (scheduleAmounts.length - 1) * 28)


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
    value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Type !== 'VariableDefinedSchedule' ||
    value?.consent?.ControlParameters?.ConsentSchedule?.SinglePayment ||
    value?.consent?.ControlParameters?.ConsentSchedule?.FilePayment
  ) {
    return "consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type must be 'VariableDefinedSchedule'"
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

    const schedule = value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Schedule
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
        if (value.consent.ExpirationDateTime) {
            const expirationDate = value.consent.ExpirationDateTime.substring(0, 10)
            if (expirationDate !== lastExecDateStr) {
                return `consent.ExpirationDateTime date (${expirationDate}) must match the last PaymentExecutionDate in the schedule (${lastExecDateStr})`
            }
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

const piiScenarios = domesticPaymentPiiScenarios(initialFormDataPII.value)
const consentScenarios = paymentConsentScenarios(initialFormDataSIP.value, 'consent')
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Banking · Service Initiation · Variable Defined Schedule · UX
        </div>
        <h1 class="ed-doc__title">
          Variable Defined Schedule &mdash; User Experience
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Before a customer authorises a Variable Defined Schedule payment consent through Open Finance, you
          must present a <strong>Consent Page</strong> that clearly explains that you are seeking permission
          to make a pre-defined series of payments, each on a specific date and up to a variable maximum
          amount. This page must accurately reflect the key details of the consent (payee, the complete list
          of scheduled payment dates and the maximum amount for each, etc.) The examples and interactive
          wireframes below define the expected structure, content, and behaviour of the Consent Page and must
          be followed.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter
          the meaning, clarity, or completeness of the payment information shown, and the representation of
          <strong>AlTareq</strong> (including logos, naming, and action buttons) must be preserved. The
          customer must always be able to clearly understand what payment they are consenting to and that it
          is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of
          <strong>CX certification</strong> prior to production, and any material changes to a production
          Consent Page must be re-submitted for review and approval.
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
        spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
        schema-name="AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
        :initial-data="initialFormDataPII"
        :scenarios="piiScenarios"
        state-field="pii"
        :custom-validator="myPIICustomValidator"
        label="domestic_payment_pii"
        description="PAR request body (AEDomesticPaymentPII)"
        endpoint-href="/tech/tpp-standards/v2.1/consent/open-api/par"
        endpoint-label="View PAR endpoint"
      />

      <EditableJson
        spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
        schema-name="AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties"
        :excluded-fields="['consent.PersonalIdentifiableInformation']"
        :initial-data="initialFormDataSIP"
        :scenarios="consentScenarios"
        :custom-validator="myCustomValidator"
        label="authorization_details"
        description="PAR request body field"
        endpoint-href="/tech/tpp-standards/v2.1/consent/open-api/par"
        endpoint-label="View PAR endpoint"
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
