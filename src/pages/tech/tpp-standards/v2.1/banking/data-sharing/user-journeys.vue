<route lang="yaml">
meta:
  title: Bank Data Sharing - User Experience
  next: false
  prev: false
  aside: false
</route>

<script setup>
import { futureDateTime } from '@/components/common/composables/futureDates.ts'
import { bankDataSharingScenarios } from '@/data/editor-scenarios'
import WireframePreview from './_shared/WireframePreview.vue'
import AccountSetup from './_shared/AccountSetup.vue'
import UIBehaviour from './_shared/UIBehaviour.vue'
import ExampleJourneys from './_shared/ExampleJourneys.vue'

const expirationDateTime = futureDateTime(330)

const myCustomValidator = (value) => {
  if (
    (() => {
      const expiration = new Date(value.consent.ExpirationDateTime)
      const now = new Date()
      const oneYearFromNow = new Date()
      oneYearFromNow.setFullYear(now.getFullYear() + 1)

      return expiration <= now || expiration >= oneYearFromNow
    })()
  ) {
    return 'consent.ExpirationDateTime cannot be in the past and must be less than a year in the future.'
  } else if (
    (() => {
      const perms = value.consent?.Permissions || []

      const dependentPermissions = [
        'ReadBalances',
        'ReadBeneficiariesBasic',
        'ReadBeneficiariesDetail',
        'ReadTransactionsBasic',
        'ReadTransactionsDetail',
        'ReadProduct',
        'ReadScheduledPaymentsBasic',
        'ReadScheduledPaymentsDetail',
        'ReadDirectDebits',
        'ReadStandingOrdersBasic',
        'ReadStandingOrdersDetail',
        'ReadStatements',
        'ReadProductFinanceRates',
      ]

      const hasDependentPermission = dependentPermissions.some(p => perms.includes(p))

      const hasAccountPermission =
        perms.includes('ReadAccountsBasic') ||
        perms.includes('ReadAccountsDetail')

      return hasDependentPermission && !hasAccountPermission
    })()
  ) {
    return 'ReadAccountsBasic or ReadAccountsDetail must be provided when permissions that require an accountId are included.'
  }
  return null
}

const initialFormData = ref({
  type: 'urn:openfinanceuae:account-access-consent:v2.1',
  consent: {
    ExpirationDateTime: expirationDateTime,
    OnBehalfOf: {
      TradingName: 'Nebras',
      LegalName: 'Nebras Open Finance Ltd',
      IdentifierType: 'Other',
      Identifier: 'Identifier',
    },
    ConsentId: 'b8f42378-10ac-46a1-8d20-4e020484216d',
    BaseConsentId: 'b9f42378-10ac-46a1-8d20-4e020484216d',
    AccountType: ['Retail'],
    AccountSubType: ['CurrentAccount', 'Savings'],
    Permissions: [
      'ReadAccountsBasic',
      'ReadAccountsDetail',
      'ReadBalances',
      'ReadBeneficiariesBasic',
      'ReadBeneficiariesDetail',
      // 'ReadFXTransactionsBasic',
      // 'ReadFXTransactionsDetail',
      // 'ReadFXRemittanceCharges',
      'ReadTransactionsBasic',
      'ReadTransactionsDetail',
      'ReadProduct',
      'ReadScheduledPaymentsBasic',
      'ReadScheduledPaymentsDetail',
      'ReadDirectDebits',
      'ReadStandingOrdersBasic',
      'ReadStandingOrdersDetail',
      'ReadStatements',
      'ReadPartyUser',
      'ReadPartyUserIdentity',
      'ReadParty',
      'ReadProductFinanceRates',
    ],
    FromDate: '2025-03-01',
    ToDate: '2025-03-31',
    OpenFinanceBilling: {
      UserType: 'Retail',
      Purpose: 'AccountAggregation',
    },
  },
  subscription: {
    Webhook: {
      Url: 'https://webhook.site/mock-event-receiver',
      IsActive: false,
    },
  },
})

const scenarios = bankDataSharingScenarios(initialFormData.value, 'consent')
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Banking · Data Sharing · UX
        </div>
        <h1 class="ed-doc__title">
          Bank Data Sharing &mdash; User Experience
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Before a customer is redirected to Open Finance to consent to Data Sharing, you must present a
          <strong>Consent Page</strong> that clearly explains what the customer is consenting to and collects
          their explicit, informed consent. This page must accurately reflect the scope, purpose, and nature
          of the data being shared. The examples and interactive wireframes below define the expected
          structure, content, and behaviour of the Consent Page and must be followed.
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
      title="Edit the consent and watch the previews respond"
      tone="cream"
    >
      <WireframePreview />

      <EdProse>
        Customise the <code>authorization_details</code> object below and watch the wireframes above
        update live. Try changing permissions, account types, date ranges, or the TPP name to see how the
        pages respond, or pick one of the scenarios beside the editor to load a preset consent.
      </EdProse>

      <EditableJson
        spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
        schema-name="AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties"
        :initial-data="initialFormData"
        :custom-validator="myCustomValidator"
        :scenarios="scenarios"
        state-field="consent"
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
