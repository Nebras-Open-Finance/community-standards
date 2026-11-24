<route lang="yaml">
meta:
  title: Bulk and Batch Payments - User Experience
  next: false
  prev: false
  aside: false
</route>

<script setup>
import { ref } from 'vue'
import { futureDateTime } from '@/components/common/composables/futureDates.ts'
import { bulkBatchConsentScenarios } from '@/data/editor-scenarios'
import WireframePreview from '../../../../../../tpp-standards/v2.2-rc2/banking/service-initiation/domestic-payments/bulk-batch-payments/_shared/WireframePreview.vue'

const LFI = '/tech/lfi-api-hub/v2.2-rc2'
const BASE = `${LFI}/banking/service-initiation/domestic-payments/bulk-batch-payments`

const expirationDateTime = futureDateTime(330)

const bulkBatchValidator = (value) => {
  const bulkBatch = value?.Data?.ControlParameters?.ConsentSchedule?.BulkBatchPayment
  if (!bulkBatch) {
    return 'Data.ControlParameters.ConsentSchedule.BulkBatchPayment is required for a Bulk/Batch Payment'
  }

  if (typeof bulkBatch.Description !== 'string' || bulkBatch.Description.length < 1 || bulkBatch.Description.length > 140) {
    return 'BulkBatchPayment.Description must be 1–140 characters'
  }

  if (!Number.isInteger(bulkBatch.NumberOfTransactions)) {
    return 'BulkBatchPayment.NumberOfTransactions must be an integer'
  }

  const total = bulkBatch.TotalValueOfPayments
  if (!total || typeof total.Amount !== 'string' || !/^\d{1,16}\.\d{2}$/.test(total.Amount)) {
    return "BulkBatchPayment.TotalValueOfPayments.Amount must be a decimal string with exactly two decimal places, e.g. '4250.00'"
  }
  if (total.Currency !== 'AED') {
    return "BulkBatchPayment.TotalValueOfPayments.Currency must be 'AED': a Bulk/Batch Payment is a domestic payment"
  }

  const expiration = new Date(value.Data.ExpirationDateTime)
  const now = new Date()
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(now.getFullYear() + 1)
  if (expiration.getTime() <= now.getTime() + 15 * 60 * 1000 || expiration >= oneYearFromNow) {
    return 'Data.ExpirationDateTime must be more than 15 minutes in the future and less than a year in the future.'
  }

  return null
}

const initialFormData = ref({
  "Data": {
    "Status": "AwaitingAuthorization",
    "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
    "IsSingleAuthorization": true,
    "ExpirationDateTime": expirationDateTime,
    "ControlParameters": {
      "ConsentSchedule": {
        "BulkBatchPayment": {
          "Description": "Payroll June 2026",
          "NumberOfTransactions": 3,
          "TotalValueOfPayments": {
            "Amount": "4250.00",
            "Currency": "AED"
          }
        }
      }
    }
  }
})

const consentScenarios = bulkBatchConsentScenarios(initialFormData.value, 'Data')
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Banking · Service Initiation · Bulk and Batch Payments · UX
        </div>
        <h1 class="ed-doc__title">
          Bulk and Batch Payments &mdash; User Experience
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <BulkBatchOptionalNotice />
        <p class="ed-doc__lede">
          When a customer is redirected to you to authorize an Open Finance consent for a Bulk/Batch
          Payment, you must present an <strong>Authorization Page</strong> that clearly explains the batch
          the customer is authorizing. The page must collect the customer's explicit and informed consent,
          and it must accurately reflect the reason for the batch, the number of payments, their total, and
          all material terms of the payment consent.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The interactive wireframes provided below define the expected structure, content, and behavior of
          the Authorization Page and must be followed.
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
        Customise the consent below, as your LFI retrieves it from the API Hub with
        <RouterLink :to="`${LFI}/api-hub/consent-manager/open-api/consents-consentId`"><code>GET /consents/{consentId}</code></RouterLink>,
        and watch the <strong>Consent</strong> and <strong>Authorisation</strong> page previews update
        live. The editor validates it against the Consent Manager schema and the Bulk/Batch rules in
        <RouterLink :to="`${BASE}/requirements`">Requirements</RouterLink>.
      </EdProse>

      <EditableJson
        spec="/openapi/v2.2-rc2/api-hub/uae-api-hub-consent-manager-openapi.yaml"
        schema-name="AEPaymentConsentResponse"
        :initial-data="initialFormData"
        :scenarios="consentScenarios"
        :custom-validator="bulkBatchValidator"
        label="consentBody"
        description="(AEPaymentConsentResponse)"
        endpoint-href="/tech/lfi-api-hub/v2.2-rc2/api-hub/consent-manager/open-api/consents-consentId"
        endpoint-label="View Consent endpoint"
      />

      <EdNote type="info" title="No account to select">
        <p>
          A Bulk/Batch consent names no Debtor Account and no creditor: each payment in the batch carries
          its own, on <RouterLink :to="`${BASE}/open-api/bulk-payments`"><code>POST /bulk-payments</code></RouterLink>.
          The Authorization Page therefore has no account selection screen. It shows the batch the User is
          authorizing.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="ui-behaviour"
      num="02"
      color="var(--at-gold)"
      eyebrow="Field-Driven UI"
      title="How the consent fields map to the Authorization Page"
      tone="surface"
    >
      <EdProse>
        A Bulk/Batch Payment consent describes the batch, not the individual payments. The Authorization
        Page shows the values in <code>Data.ControlParameters.ConsentSchedule.BulkBatchPayment</code>:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Consent field</th><th>Authorization Page (LFI)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>BulkBatchPayment.TotalValueOfPayments</code></td>
              <td><strong>Total Amount</strong>, with its currency</td>
            </tr>
            <tr>
              <td><code>BulkBatchPayment.Description</code></td>
              <td><strong>Description</strong>, shown to the User as the reason for the payment, for example <em>Payroll June 2026</em></td>
            </tr>
            <tr>
              <td><code>BulkBatchPayment.NumberOfTransactions</code></td>
              <td><strong>No. of Transactions</strong></td>
            </tr>
            <tr>
              <td><code>OnBehalfOf.TradingName</code></td>
              <td>Named as the party the TPP is acting <em>on-behalf of</em>, in the request text above the payment details</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The page shows no payment purpose and no payee. A Bulk/Batch consent carries no
        <code>PaymentPurposeCode</code>, and each payment's creditor and purpose code arrive with that
        payment on <code>POST /bulk-payments</code>.
      </EdProse>

      <EdNote type="info" title="Eligibility still applies">
        <p>
          No payment file is rendered at authorization. You still check that the User holds an account
          eligible to make the payments, as <code>IsSingleAuthorization</code> constrains it, and reject the
          consent with <code>user_lacks_eligible_accounts</code> if not. See
          <RouterLink :to="`${BASE}/requirements#authorization`">Requirements</RouterLink>.
        </p>
      </EdNote>
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
