<route lang="yaml">
meta:
  title: "Choosing a Payment Type"
  description: "Guide to the seven UAE Open Finance payment types — Single Instant Payment and the six Multi-Payment variants — with a decision framework for selecting the right one and notes on the Delegated SCA overlay."
  category: Payments
  readTime: "10 min"
  updated: "2026-04-21"
  tags:
    - Payments
    - Multi-Payment
    - Decision Guide
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'path',      label: 'Pick a path' },
  { id: 'sip',       label: 'Single Instant Payment' },
  { id: 'multi',     label: 'Multi-Payment' },
  { id: 'delegated', label: 'Delegated SCA' },
  { id: 'pitfalls',  label: 'Pitfalls' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Payments' },
  { label: 'Read',     value: '10 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['Payments', 'Multi-Payment', 'Decision Guide']
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Choosing a Payment Type"
      :meta="meta"
      lede="UAE Open Finance defines <strong>seven payment shapes</strong>. The first decision is whether you need <strong>one payment now</strong> (Single Instant Payment) or <strong>many payments over time</strong> (one of six Multi-Payment variants). <strong>Delegated SCA</strong> is an optional overlay on the multi-payment variants that shifts strong customer authentication from the LFI to the TPP."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="path"
      num="01"
      color="var(--at-teal)"
      eyebrow="Pick a path"
      title="One payment now, or many over time?"
      lede="That single question splits the seven shapes into two paths. If you only need one payment, stop &mdash; Single Instant Payment is the only option. If you need to take more than one payment under the same consent, you're in Multi-Payment territory."
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>You need&hellip;</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>Exactly one payment, executed immediately</td><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide">Single Instant Payment</a></td></tr>
            <tr><td>More than one payment under the same authorisation</td><td>One of the six <a href="#multi">Multi-Payment</a> variants</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="sip"
      num="02"
      color="var(--at-gold)"
      eyebrow="Single Instant Payment"
      title="One payment, one authorisation, settled now"
      lede="Settled immediately on UAE domestic rails (AANI or UAEFTS)."
      tone="surface"
      narrow
    >
      <EdBullets>
        <li><strong>When to use:</strong> A checkout, an ad-hoc bill, a one-off transfer &mdash; any situation where the user is making a single payment decision in the moment.</li>
        <li><strong>What's known up front:</strong> The exact amount, the creditor, the payment purpose.</li>
        <li><strong>Re-authorisation:</strong> Every payment is its own consent. There is no "next payment" under the same authorisation.</li>
      </EdBullets>

      <EdProse>If one payment is all you need, you're done &mdash; the rest of this article is about the multi-payment path.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="multi"
      num="03"
      color="var(--at-blue)"
      eyebrow="Multi-Payment"
      title="Six variants, two questions"
      lede="Multi-Payment covers everything that isn't a single instant payment. The six variants come from answering two questions about the consent."
      tone="cream"
    >
      <EdBullets>
        <li><strong>How much is each payment for?</strong> &mdash; <strong>Fixed</strong> means every payment is the same amount; <strong>Variable</strong> means each payment is capped at a per-payment ceiling but can come in for less.</li>
        <li><strong>When does each payment run?</strong> &mdash; <strong>OnDemand</strong> means the TPP triggers each payment whenever it wants; <strong>PeriodicSchedule</strong> means one payment per recurring period (monthly, weekly, etc.); <strong>DefinedSchedule</strong> means a pre-agreed list of specific calendar dates.</li>
      </EdBullets>

      <EdProse>Two amount answers &times; three timing answers = six combinations. Each one is a distinct payment shape with its own api-guide:</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Amount</th><th>Timing</th><th>Variant</th></tr></thead>
          <tbody>
            <tr><td>Fixed per payment</td><td>TPP triggers each payment</td><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide">FixedOnDemand</a></td></tr>
            <tr><td>Variable up to a per-payment cap</td><td>TPP triggers each payment</td><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide">VariableOnDemand</a></td></tr>
            <tr><td>Fixed per payment</td><td>One per recurring period (e.g. monthly)</td><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide">FixedPeriodicSchedule</a></td></tr>
            <tr><td>Variable up to a per-payment cap</td><td>One per recurring period</td><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide">VariablePeriodicSchedule</a></td></tr>
            <tr><td>Exact amount known for each dated payment</td><td>List of specific calendar dates</td><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide">FixedDefinedSchedule</a></td></tr>
            <tr><td>Per-date ceiling, actual amount may differ</td><td>List of specific calendar dates</td><td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide">VariableDefinedSchedule</a></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>On-demand &mdash; the TPP triggers each payment</h3>
      <EdCompareCards>
        <EdCompareCard accent="var(--at-blue)" kicker="FixedOnDemand" example="Same amount each time">
          <ul>
            <li><strong>When to use:</strong> Fixed-amount subscription billing, regular instalment collection, membership fees &mdash; the charge is always the same, and the TPP (not the calendar) decides when to take it.</li>
            <li><strong>What's known up front:</strong> The per-payment amount (<code>PeriodicSchedule.Amount</code>), the creditor, and cumulative caps via <code>PeriodicSchedule.PeriodType</code>.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-blue-deep)" kicker="VariableOnDemand" example="Variable up to a ceiling">
          <ul>
            <li><strong>When to use:</strong> Metered billing, utility top-ups, variable-charge subscriptions, TPP-managed savings sweeps &mdash; both the amount and the timing depend on usage or TPP logic, not a calendar.</li>
            <li><strong>What's known up front:</strong> The per-payment ceiling (<code>MaximumIndividualAmount</code>), cumulative caps via <code>PeriodicSchedule.PeriodType</code>, and optional <code>Controls</code> on total count and total value across the consent.</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>

      <EdNote type="tip" title="PeriodType is a cap window, not a cadence">
        <p>On on-demand variants, <code>PeriodicSchedule.PeriodType</code> (<code>Day</code>, <code>Week</code>, <code>Month</code>, &hellip;) defines the <strong>reference window for cumulative limits</strong> &mdash; e.g. "no more than N payments totalling X AED per rolling month". It is <strong>not</strong> a recurrence schedule. The TPP still triggers every payment explicitly.</p>
      </EdNote>

      <h3>Periodic schedule &mdash; one payment per period</h3>
      <EdCompareCards>
        <EdCompareCard accent="var(--at-blue)" kicker="FixedPeriodicSchedule" example="Fixed amount, fixed cadence">
          <ul>
            <li><strong>When to use:</strong> Fixed-price subscriptions, loan repayments, membership dues &mdash; predictable recurring charges that follow a calendar.</li>
            <li><strong>What's known up front:</strong> The per-payment amount and the period cadence. The LFI will only permit <strong>one payment per period</strong> under this consent.</li>
            <li><strong>vs FixedOnDemand:</strong> Same fixed amount, but the calendar &mdash; not the TPP &mdash; gates payment frequency.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-blue-deep)" kicker="VariablePeriodicSchedule" example="Variable amount, fixed cadence">
          <ul>
            <li><strong>When to use:</strong> Utility bills, variable monthly service charges, TPP-managed savings where the amount differs each period but must stay within a pre-approved cap.</li>
            <li><strong>What's known up front:</strong> The per-payment ceiling (<code>MaximumIndividualAmount</code>) and the period cadence. One payment per period, actual amount variable within the cap.</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>

      <h3>Defined schedule &mdash; a pre-agreed list of dates</h3>
      <EdCompareCards>
        <EdCompareCard accent="var(--at-blue)" kicker="FixedDefinedSchedule" example="Fixed amount per date">
          <ul>
            <li><strong>When to use:</strong> Structured instalment plans, staged loan repayments, any case where both dates and amounts are known and agreed up front (e.g. "AED 500 on the 1st of each of Jan/Apr/Jul/Oct").</li>
            <li><strong>What's known up front:</strong> Every <code>(PaymentExecutionDate, Amount)</code> pair in the <code>Schedule</code> array. The TPP submits exactly one payment per scheduled entry, for exactly the listed amount.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-blue-deep)" kicker="VariableDefinedSchedule" example="Ceiling per date">
          <ul>
            <li><strong>When to use:</strong> Milestone-based project billing, staged payments where the dates are fixed but the final amount on each date depends on delivered work or usage.</li>
            <li><strong>What's known up front:</strong> Every <code>(PaymentExecutionDate, MaximumIndividualAmount)</code> pair. The TPP submits one payment per scheduled entry, at or below the listed ceiling.</li>
            <li><strong>vs FixedDefinedSchedule:</strong> Same schedule shape, same dates, same <code>Schedule</code> array &mdash; the only structural difference is whether each entry carries a locked <code>Amount</code> or a <code>MaximumIndividualAmount</code> ceiling.</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>
    </EdSectionBand>

    <EdSectionBand
      id="delegated"
      num="04"
      color="var(--at-navy)"
      eyebrow="Delegated SCA"
      title="An overlay on multi-payment consents"
      lede="Delegated SCA is not a payment shape. It's a <code>ControlParameters.IsDelegatedAuthentication: true</code> flag that can be set on a multi-payment consent to shift responsibility for performing Strong Customer Authentication from the LFI to the TPP."
      tone="surface"
    >
      <EdBullets>
        <li><strong>Default flow:</strong> The LFI authenticates the user at each step of the consent journey and SCA for the payment itself.</li>
        <li><strong>With Delegated SCA:</strong> The TPP has already performed SCA at its own surface (biometrics, secure enclave, MFA) and asserts this to the LFI via a fully-populated <code>Risk.DebtorIndicators.Authentication</code> block on every <code>POST /par</code> and <code>POST /payments</code>.</li>
      </EdBullets>
      <EdProse><strong>When to use:</strong> Apps that already run a compliant SCA flow on the user's device at the point of every payment, so do not need to rely on the other control parameters.</EdProse>
      <EdProse>The nature of this payment means the Risk fields a TPP provides for Delegated SCA payments are different to other payment types &mdash; see the <a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide">Delegated SCA api-guide</a> for the full flow and mandatory Risk fields.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="pitfalls"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Common pitfalls"
      title="The four most frequent confusions"
      tone="cream"
    >
      <h3>Treating <code>PeriodicSchedule.PeriodType</code> as a cadence on on-demand variants</h3>
      <EdProse>On <code>FixedOnDemand</code> and <code>VariableOnDemand</code>, <code>PeriodType</code> is a <strong>cap reference window</strong>, not a recurrence schedule. The TPP still triggers every payment.</EdProse>

      <h3>Picking <code>FixedDefinedSchedule</code> when dates are known but amounts aren't</h3>
      <EdProse>If amounts may vary per date, use <code>VariableDefinedSchedule</code> with a <code>MaximumIndividualAmount</code> per entry &mdash; <code>FixedDefinedSchedule</code> locks the amount up front and the LFI will reject any payment for a different value.</EdProse>

      <h3>Assuming <code>PeriodicSchedule</code> means "periodic payments"</h3>
      <EdProse>The object is named for its role in the schema, not its semantics in every variant. For <code>OnDemand</code> variants it governs caps; for <code>PeriodicSchedule</code> variants it governs cadence; for <code>DefinedSchedule</code> variants it carries the date list.</EdProse>

      <h3>Setting the <code>Type</code> on the wrong object</h3>
      <EdProse>The OpenAPI discriminator is on <code>PeriodicSchedule.Type</code> (e.g. <code>"FixedOnDemand"</code>), <strong>not</strong> on <code>MultiPayment.Type</code>. A mis-placed discriminator is rejected with <code>400 invalid_message_format</code>.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/payment-account-permissions"
        category="Payments"
        category-color="var(--at-gold)"
        title="Account Permissions in a Payment Consent"
        desc="Reading payer accounts and balances under a payment consent."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/pii-encryption"
        category="Security"
        category-color="var(--at-blue)"
        title="Payment PII Encryption"
        desc="Why PII in payment consents is encrypted end-to-end."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-gold) 14%, transparent); color: var(--at-gold); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
