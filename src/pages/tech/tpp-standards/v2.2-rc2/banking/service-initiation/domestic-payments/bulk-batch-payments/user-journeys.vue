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
import WireframePreview from './_shared/WireframePreview.vue'

const SI = '/tech/tpp-standards/v2.2-rc2/banking/service-initiation'
const BASE = `${SI}/domestic-payments/bulk-batch-payments`

const expirationDateTime = futureDateTime(330)

const bulkBatchValidator = (value) => {
  const schedule = value?.consent?.ControlParameters?.ConsentSchedule
  const bulkBatch = schedule?.BulkBatchPayment
  if (!bulkBatch) {
    return 'consent.ControlParameters.ConsentSchedule.BulkBatchPayment is required for a Bulk/Batch Payment'
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

  const expiration = new Date(value.consent.ExpirationDateTime)
  const now = new Date()
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(now.getFullYear() + 1)
  if (expiration.getTime() <= now.getTime() + 15 * 60 * 1000 || expiration >= oneYearFromNow) {
    return 'consent.ExpirationDateTime must be more than 15 minutes in the future and less than a year in the future.'
  }

  if (value.consent.AuthorizationExpirationDateTime) {
    const authExpiry = new Date(value.consent.AuthorizationExpirationDateTime)
    if (authExpiry.getTime() <= now.getTime() + 15 * 60 * 1000) {
      return 'consent.AuthorizationExpirationDateTime must be more than 15 minutes in the future'
    }
    if (value.consent.ExpirationDateTime && authExpiry > new Date(value.consent.ExpirationDateTime)) {
      return 'consent.AuthorizationExpirationDateTime must not be after consent.ExpirationDateTime'
    }
  }

  return null
}

const initialFormData = ref({
  "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
  "consent": {
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

const consentScenarios = bulkBatchConsentScenarios(initialFormData.value)
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
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Before a customer authorises a Bulk/Batch Payment through Open Finance, you must present a
          <strong>Consent Page</strong> that clearly explains the batch they are consenting to. This page
          must accurately reflect the reason for the batch, the number of payments, their total, and all
          material terms of the payment consent. The interactive wireframes below define the expected
          structure, content, and behaviour of the Consent Page and must be followed.
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
        The TPP side has two screens. On the <strong>Upload</strong> screen, whose content is fixed, the
        TPP asks the User for their payments file, in a format the TPP recognises, and links to the CSV
        format it accepts. The file is the TPP's own: the TPP converts it to the <code>Instructions</code> array of
        <code>POST /bulk-payments</code>, and it never reaches the API Hub or the LFI. The
        <strong>Consent</strong> screen then shows the batch the User is consenting to.
      </EdProse>

      <EdProse>
        Customise the <code>authorization_details</code> below and watch the <strong>Consent</strong> and
        <strong>Authorisation</strong> page previews update live. The editor validates it against the
        <code>POST /par</code> schema and the Bulk/Batch rules in
        <RouterLink :to="`${BASE}/requirements`">Requirements</RouterLink>.
      </EdProse>

      <EditableJson
        spec="/openapi/v2.2-rc2/standards/uae-authorization-endpoints-openapi.yaml"
        schema-name="AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties"
        :excluded-fields="['consent.PersonalIdentifiableInformation']"
        :initial-data="initialFormData"
        :scenarios="consentScenarios"
        :custom-validator="bulkBatchValidator"
        label="authorization_details"
        description="PAR request body field"
        endpoint-href="/tech/tpp-standards/v2.2-rc2/consent/open-api/par"
        endpoint-label="View PAR endpoint"
      />

      <EdNote type="info" title="No payer or payee details to preview">
        <p>
          Unlike a Single Instant Payment, a Bulk/Batch consent's
          <code>PersonalIdentifiableInformation</code> carries only the <code>Risk</code> block. The
          Debtor Account and creditor of each payment are not on the consent: they are carried on that
          payment, on <RouterLink :to="`${BASE}/open-api/bulk-payments`"><code>POST /bulk-payments</code></RouterLink>.
          The Consent screen therefore shows the payer by bank alone and no payee, and points the User to
          the payments in the file they uploaded. The Authorisation Page has no account to select.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="ui-behaviour"
      num="02"
      color="var(--at-gold)"
      eyebrow="Field-Driven UI"
      title="How the consent fields map to what the user sees"
      tone="surface"
    >
      <EdProse>
        A Bulk/Batch Payment consent describes the batch, not the individual payments. The User consents
        to, and then authorizes, the values in
        <code>consent.ControlParameters.ConsentSchedule.BulkBatchPayment</code>:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Consent field</th><th>Consent Page (TPP)</th><th>Authorisation Page (LFI)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>BulkBatchPayment.TotalValueOfPayments</code></td>
              <td><strong>Payment Total</strong>, with its currency</td>
              <td><strong>Total Amount</strong>, with its currency</td>
            </tr>
            <tr>
              <td><code>BulkBatchPayment.Description</code></td>
              <td><strong>Description</strong>, for example <em>Payroll June 2026</em></td>
              <td><strong>Description</strong>. The LFI shows it to the User as the reason for the payment when the User authorizes the consent</td>
            </tr>
            <tr>
              <td><code>BulkBatchPayment.NumberOfTransactions</code></td>
              <td><strong>No. of Transactions</strong></td>
              <td><strong>No. of Transactions</strong></td>
            </tr>
            <tr>
              <td><code>OnBehalfOf.TradingName</code></td>
              <td>&mdash;</td>
              <td>Named as the party the TPP is acting <em>on-behalf of</em>, in the request text above the payment details</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Neither page shows a payment purpose. A Bulk/Batch consent carries no
        <code>PaymentPurposeCode</code>: each payment in the batch carries its own, on
        <RouterLink :to="`${BASE}/open-api/bulk-payments`"><code>POST /bulk-payments</code></RouterLink>.
      </EdProse>

      <EdNote type="info" title="At the LFI">
        <p>
          No payment file is rendered at authorization. The LFI shows the confirm-payment details above,
          with <code>Description</code> as the stated reason for the payment. The LFI still checks that the
          User holds an account eligible to make the payments, as
          <code>consent.IsSingleAuthorization</code> constrains it. See
          <RouterLink :to="`${BASE}/requirements#authorization`">Requirements</RouterLink> and
          <RouterLink :to="`${SI}/multi-authorization`">Multi-Authorization</RouterLink>.
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
