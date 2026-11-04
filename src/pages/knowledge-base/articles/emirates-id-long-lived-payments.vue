<route lang="yaml">
meta:
  title: "Emirates ID on Long-Lived Payments — Sending It as a TPP, Checking It as an LFI"
  description: "Under a long-lived payment consent, the TPP must send a retail User's Emirates ID in Risk.DebtorIndicators.EmiratesId on every POST /payments, and the LFI compares it with the Emirates ID of the PSU behind the consent."
  category: Payments
  readTime: "6 min"
  updated: "2026-11-04"
  tags:
    - Payments
    - Emirates ID
    - Risk
  versions:
    - v2.2-rc2
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'what',        label: 'What it is' },
  { id: 'long-lived',  label: 'Long-lived consents' },
  { id: 'tpps',        label: 'For TPPs' },
  { id: 'lfis',        label: 'For LFIs' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Payments' },
  { label: 'Read',     value: '6 min' },
  { label: 'Updated',  value: '4 Nov 2026' },
]

const tags: readonly string[] = ['Payments', 'Emirates ID', 'Risk']

const TPP_SI = '/tech/tpp-standards/v2.2-rc2/banking/service-initiation/domestic-payments/multi-payments'

const longLivedTypes = [
  { name: 'Fixed Defined Schedule',     slug: 'fixed-defined-schedule',     how: '<code>ConsentSchedule.MultiPayment</code>' },
  { name: 'Fixed Periodic Schedule',    slug: 'fixed-periodic-schedule',    how: '<code>ConsentSchedule.MultiPayment</code>' },
  { name: 'Fixed On Demand',            slug: 'fixed-on-demand',            how: '<code>ConsentSchedule.MultiPayment</code>' },
  { name: 'Variable Defined Schedule',  slug: 'variable-defined-schedule',  how: '<code>ConsentSchedule.MultiPayment</code>' },
  { name: 'Variable Periodic Schedule', slug: 'variable-periodic-schedule', how: '<code>ConsentSchedule.MultiPayment</code>' },
  { name: 'Variable On Demand',         slug: 'variable-on-demand',         how: '<code>ConsentSchedule.MultiPayment</code>' },
  { name: 'Delegated SCA',              slug: 'delegated-sca',              how: '<code>IsDelegatedAuthentication: true</code>, with an empty <code>ConsentSchedule</code>' },
]

const riskExample = `{
  "Risk": {
    "DebtorIndicators": {
      "EmiratesId": "784-1990-1234567-1",
      "Authentication": { "...": "..." },
      "...": "..."
    },
    "TransactionIndicators": { "...": "..." },
    "CreditorIndicators": { "...": "..." }
  }
}`

const checkTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// The pattern makes the hyphens optional, so 784-1990-1234567-1 and
// 784199012345671 are the same Emirates ID. Compare the digits only.
const digits = (id: string) => id.replace(/-/g, '')

// Single Instant Payment is the only consent that carries
// ControlParameters.ConsentSchedule.SinglePayment; every other payment
// consent is long-lived.
const isLongLived = (consent: PaymentConsent) =>
  !consent.ControlParameters.ConsentSchedule?.SinglePayment

function checkEmiratesId(
  consent: PaymentConsent,   // the consent identified by o3-consent-id
  customer: Customer,        // resolved from o3-psu-identifier
  pii: PaymentPII,           // the decrypted payment-time PII
): ErrorResponse | null {
  if (!isLongLived(consent) || customer.type !== 'Retail') return null

  const sent = pii.Risk?.DebtorIndicators?.EmiratesId
  if (!sent) {
    return {
      errorCode: 'Consent.BusinessRuleViolation',
      errorMessage: 'Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID is required for a long-lived payment consent',
    }
  }
  if (digits(sent) !== digits(customer.emiratesId)) {
    return {
      errorCode: 'Consent.BusinessRuleViolation',
      errorMessage: 'Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID does not match the PSU ID',
    }
  }
  return null
}`,
  },
]

const missingError = `{
  "errorCode": "Consent.BusinessRuleViolation",
  "errorMessage": "Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID is required for a long-lived payment consent"
}`

const mismatchError = `{
  "errorCode": "Consent.BusinessRuleViolation",
  "errorMessage": "Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID does not match the PSU ID"
}`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Emirates ID on Long-Lived Payments — Sending It as a TPP, Checking It as an LFI"
      :meta="meta"
      lede="A long-lived payment consent is authorized once and then pays many times. From v2.2, the TPP sends a retail User's <strong>Emirates ID</strong> in <code>Risk.DebtorIndicators.EmiratesId</code> on every <code>POST /payments</code> under such a consent, so the LFI can confirm that each payment is being made for the same User who authorized the consent."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="what"
      num="01"
      color="var(--at-teal)"
      eyebrow="What it is"
      title="One identifier, on every payment"
      tone="cream"
    >
      <EdProse>
        A Single Instant Payment consent is authorized and used once. Every other payment consent is
        <strong>long-lived</strong>: the User authorizes it at the LFI once, and the TPP then initiates
        payments under it for weeks or months, often with the User not present. Each of those later
        payments reaches the LFI with no authentication of its own &mdash; only the consent it was made
        under.
      </EdProse>
      <EdProse>
        v2.1 identifies the User initiating a payment in <code>Risk.DebtorIndicators</code> only by
        name. v2.2 adds <code>EmiratesId</code>
        (<a href="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-21">changelog §21</a>),
        and for long-lived consents the TPP requirements make it mandatory for retail Users. The LFI
        compares it with the Emirates ID it holds for the PSU behind the consent.
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Who</th><th>What</th><th>When</th></tr></thead>
          <tbody>
            <tr><td>TPP</td><td>Captures the retail User's Emirates ID</td><td>Before the first payment under the consent</td></tr>
            <tr><td>TPP</td><td>Sends it in <code>Risk.DebtorIndicators.EmiratesId</code> inside the encrypted PII</td><td>Every <code>POST /payments</code> under a long-lived consent</td></tr>
            <tr><td>LFI</td><td>Compares it with the Emirates ID held for the PSU</td><td>On receiving <code>POST /payments</code> at its Ozone Connect endpoint</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="info" title="Only the LFI reads it">
        <p>
          <code>Risk</code> is part of the payment PII, which the TPP signs and encrypts to the LFI.
          The API Hub passes it through without decrypting it, so the Emirates ID is never held
          centrally. See
          <a href="/knowledge-base/articles/pii-encryption">Payment PII Encryption</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="long-lived"
      num="02"
      color="var(--at-gold)"
      eyebrow="Long-lived consents"
      title="Every payment type except Single Instant Payment"
      tone="surface"
    >
      <EdProse>
        The requirement applies to the seven multi-payment types. An LFI can tell them apart from a
        Single Instant Payment consent by its <code>ControlParameters</code>:
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Payment type</th><th>Identified on the consent by</th><th>TPP requirements</th></tr></thead>
          <tbody>
            <tr v-for="t in longLivedTypes" :key="t.slug">
              <td>{{ t.name }}</td>
              <td v-html="t.how" />
              <td><a :href="`${TPP_SI}/${t.slug}/requirements#payment-initiation`">Payment Initiation</a></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        A Single Instant Payment consent carries <code>ConsentSchedule.SinglePayment</code> instead,
        and is out of scope.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="tpps"
      num="03"
      color="var(--at-teal)"
      eyebrow="For TPPs"
      title="Capture it, then send it on every payment"
      tone="cream"
    >
      <EdBullets>
        <li>For a <strong>retail</strong> User, the TPP <strong>MUST</strong> capture the User's Emirates ID before initiating payments under a long-lived consent.</li>
        <li>The TPP <strong>MUST</strong> send it in <code>Risk.DebtorIndicators.EmiratesId</code> in the PII of <strong>every</strong> <code>POST /payments</code> under that consent &mdash; not only the first.</li>
        <li>The value must match <code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code>: the 15 digits of the Emirates ID, with or without hyphens.</li>
      </EdBullets>
      <EdCode :code="riskExample" lang="json" filename="PII — Risk (excerpt)" />
      <EdProse>
        The rule is listed in the Payment Initiation requirements of each multi-payment type (linked
        above), and the field is described on the
        <a href="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/personal-identifiable-information/risk">Risk</a>
        page.
      </EdProse>
      <EdNote type="warning" title="A missing Emirates ID can fail the payment">
        <p>
          An LFI that checks the Emirates ID rejects a payment under a long-lived consent that does
          not carry one, as well as one that carries the wrong one. Both come back as
          <code>400 Consent.BusinessRuleViolation</code> &mdash; see <a href="#lfis">For LFIs</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="lfis"
      num="04"
      color="var(--at-gold)"
      eyebrow="For LFIs"
      title="Compare it with the PSU behind the consent"
      tone="surface"
    >
      <EdProse>
        When your Ozone Connect
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
        endpoint receives a payment, you can check the Emirates ID as part of validating the PII:
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Step</th><th>What to do</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Identify the consent from <code>o3-consent-id</code> and check that it is long-lived &mdash; it does not carry <code>ConsentSchedule.SinglePayment</code>.</td></tr>
            <tr><td>2</td><td>Identify the customer from <code>o3-psu-identifier</code> &mdash; the reference your LFI patched onto the consent when the User authorized it &mdash; and check that the customer is retail.</td></tr>
            <tr><td>3</td><td>Read <code>Risk.DebtorIndicators.EmiratesId</code> from the decrypted payment-time PII.</td></tr>
            <tr><td>4</td><td>Compare it with the Emirates ID you hold for that customer, ignoring hyphens.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="checkTabs" />

      <h3>Error responses</h3>
      <EdProse>
        Reject the payment with <code>400</code> and <code>Consent.BusinessRuleViolation</code>:
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Condition</th><th><code>errorCode</code></th><th><code>errorMessage</code></th></tr></thead>
          <tbody>
            <tr><td><code>EmiratesId</code> is absent</td><td><code>Consent.BusinessRuleViolation</code></td><td><code>Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID is required for a long-lived payment consent</code></td></tr>
            <tr><td><code>EmiratesId</code> does not match the PSU</td><td><code>Consent.BusinessRuleViolation</code></td><td><code>Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID does not match the PSU ID</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCode :code="missingError" lang="json" filename="400 — Emirates ID missing" />
      <EdCode :code="mismatchError" lang="json" filename="400 — Emirates ID does not match" />

      <EdNote type="info" title="Retail customers only">
        <p>
          The check applies to retail customers. The requirement on the TPP covers retail Users only,
          so a payment for a business customer may arrive without an Emirates ID and is not rejected
          for it.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdRelatedCards>
      <EdRelatedCard
        href="/knowledge-base/articles/choosing-a-payment-type"
        category="Payments"
        category-color="var(--at-gold)"
        title="Choosing a Payment Type"
        desc="Single Instant Payment and the seven multi-payment types — which consent each one is, and when to use it."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/pii-encryption"
        category="Security"
        category-color="var(--at-blue)"
        title="Payment PII Encryption"
        desc="How the PII that carries the Risk block is signed and encrypted end to end, so only the LFI reads it."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/login-hint-emirates-id"
        category="Security"
        category-color="var(--at-blue)"
        title="Emirates ID in login_hint"
        desc="The other place a TPP sends an Emirates ID to the LFI — once, at authorization, to correlate the User before they arrive."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
