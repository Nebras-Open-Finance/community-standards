<route lang="yaml">
meta:
  title: Insurance Data Sharing — User Experience
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { futureDateTime } from '@/components/common/composables/futureDates.ts'
import WireframePreview from './_shared/WireframePreview.vue'
import PolicySetup from './_shared/PolicySetup.vue'
import UIBehaviour from './_shared/UIBehaviour.vue'

const expirationDateTime = futureDateTime(330)

const myCustomValidator = (value: any) => {
  const expiration = new Date(value?.consent?.ExpirationDateTime)
  const now = new Date()
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(now.getFullYear() + 1)
  if (Number.isNaN(expiration.getTime()) || expiration <= now || expiration >= oneYearFromNow) {
    return 'consent.ExpirationDateTime cannot be in the past and must be less than a year in the future.'
  }
  const groups = value?.consent?.Permissions
  if (!Array.isArray(groups) || groups.length === 0) {
    return 'consent.Permissions must contain at least one insurance type entry.'
  }
  for (const g of groups) {
    if (!g?.InsuranceType) {
      return 'Each Permissions entry must specify an InsuranceType.'
    }
    if (!Array.isArray(g?.Permissions) || g.Permissions.length === 0) {
      return `Insurance type "${g.InsuranceType}" must declare at least one permission.`
    }
  }
  return null
}

const initialFormData = ref({
  type: 'urn:openfinanceuae:insurance-consent:v2.1',
  consent: {
    ExpirationDateTime: expirationDateTime,
    OnBehalfOf: {
      TradingName: 'Nebras',
      LegalName: 'Nebras Open Finance Ltd',
      IdentifierType: 'Other',
      Identifier: 'Identifier',
    },
    ConsentId: 'c1a42378-10ac-46a1-8d20-4e020484216d',
    BaseConsentId: 'c2a42378-10ac-46a1-8d20-4e020484216d',
    Permissions: [
      {
        InsuranceType: 'Motor',
        Permissions: [
          'ReadInsurancePolicies',
          'ReadCustomerBasic',
          'ReadInsuranceProduct',
          'ReadInsurancePremium',
          'ReadCustomerClaims',
        ],
      },
      {
        InsuranceType: 'Health',
        Permissions: [
          'ReadInsurancePolicies',
          'ReadCustomerDetail',
          'ReadInsuranceProduct',
          'ReadInsurancePremium',
          'ReadCustomerPaymentDetails',
          'ReadCustomerClaims',
        ],
      },
      {
        InsuranceType: 'Travel',
        Permissions: [
          'ReadInsurancePolicies',
          'ReadCustomerBasic',
        ],
      },
    ],
    OpenFinanceBilling: {
      Purpose: 'QuoteComparison',
    },
  },
  subscription: {
    Webhook: {
      Url: 'https://webhook.site/mock-event-receiver',
      IsActive: false,
    },
  },
})
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Insurance &middot; Data Sharing &middot; UX
        </div>
        <h1 class="ed-doc__title">
          Insurance Data Sharing &mdash; User Experience
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Before a customer is redirected to Open Finance to consent to Insurance Data Sharing, you must
          present a <strong>Consent Page</strong> that clearly explains what the customer is consenting to and
          collects their explicit, informed consent. The page must accurately reflect each insurance type
          requested and the permissions selected within it. The interactive wireframe below defines the
          expected structure, content, and behaviour of the Consent Page and must be followed.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter
          the meaning, clarity, or completeness of the consent content, and the representation of
          <strong>AlTareq</strong> (including logos, naming, and action buttons) must be preserved. Your
          Consent Page must be submitted as part of <strong>CX certification</strong> prior to production,
          and any material changes to a production Consent Page must be re-submitted for review and approval.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="interactive-demo"
      num="01"
      color="var(--at-teal)"
      eyebrow="Interactive Demo"
      title="Edit the consent and watch the preview respond"
      tone="cream"
    >
      <WireframePreview />

      <EdProse>
        Customise the <code>authorization_details</code> object below and watch the wireframes above update
        live. Each entry in <code>consent.Permissions</code> is an <code>InsuranceType</code> paired with the
        permissions requested for it &mdash; add, remove, or change types to see how the pages respond.
      </EdProse>

      <EditableJson
        spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
        schema-name="AEInsuranceDataSharingRichAuthorizationRequestsV21.AEInsuranceDataSharingAuthorizationDetailsProperties"
        :initial-data="initialFormData"
        :custom-validator="myCustomValidator"
        state-field="consent"
        label="authorization_details"
        description="PAR request body field"
        endpoint-href="/tech/tpp-standards/v2.1/consent/open-api/par"
        endpoint-label="View PAR endpoint"
      />

      <PolicySetup />
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

.ins-wf-frame {
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
