<route lang="yaml">
meta:
  title: "Emirates ID and Trade Licence Number on Long-Lived Payments — Sending Them as a TPP, Checking Them as an LFI"
  description: "Under a long-lived payment consent, the TPP must send a Retail User's Emirates ID in Risk.DebtorIndicators.EmiratesId, or the Trade Licence number of an SME or Corporate User's business in Risk.DebtorIndicators.TradeLicenceNumber, on every POST /payments, and the LFI compares it with the customer behind the consent."
  category: Payments
  readTime: "7 min"
  updated: "2026-11-23"
  tags:
    - Payments
    - Emirates ID
    - Trade Licence
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
  { label: 'Read',     value: '7 min' },
  { label: 'Updated',  value: '23 Nov 2026' },
]

const tags: readonly string[] = ['Payments', 'Emirates ID', 'Trade Licence', 'Risk']

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

const retailExample = `{
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

const businessExample = `{
  "Risk": {
    "DebtorIndicators": {
      "TradeLicenceNumber": "CN-1234567",
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
    code: `// EmiratesId: the pattern makes the hyphens optional, so 784-1990-1234567-1
// and 784199012345671 are the same Emirates ID. Compare the digits only.
const emiratesIdKey = (id: string) => id.replace(/-/g, '')

// TradeLicenceNumber has no pattern, so the same licence can arrive in a
// different case or with different separators. Compare letters and digits only.
const licenceKey = (n: string) => n.toUpperCase().replace(/[^A-Z0-9]/g, '')

// Single Instant Payment is the only consent that carries
// ControlParameters.ConsentSchedule.SinglePayment; every other payment
// consent is long-lived.
const isLongLived = (consent: PaymentConsent) =>
  !consent.ControlParameters.ConsentSchedule?.SinglePayment

const reject = (detail: string): ErrorResponse => ({
  errorCode: 'Consent.BusinessRuleViolation',
  errorMessage: 'Validation failed for AEPaymentPII: ' + detail,
})

function checkDebtorIdentifier(
  consent: PaymentConsent,   // the consent identified by o3-consent-id
  customer: Customer,        // resolved from o3-psu-identifier
  pii: PaymentPII,           // the decrypted payment-time PII
): ErrorResponse | null {
  if (!isLongLived(consent)) return null
  const debtor = pii.Risk?.DebtorIndicators

  if (customer.type === 'Retail') {
    const sent = debtor?.EmiratesId
    if (!sent) {
      return reject('risk.debtorIndicators.emiratesID is required for a long-lived payment consent')
    }
    if (emiratesIdKey(sent) !== emiratesIdKey(customer.emiratesId)) {
      return reject('risk.debtorIndicators.emiratesID does not match the PSU ID')
    }
    return null
  }

  // SME or Corporate: the business on whose behalf the consent was authorized
  const sent = debtor?.TradeLicenceNumber
  if (!sent) {
    return reject('risk.debtorIndicators.tradeLicenceNumber is required for a long-lived payment consent')
  }
  if (licenceKey(sent) !== licenceKey(customer.tradeLicenceNumber)) {
    return reject('risk.debtorIndicators.tradeLicenceNumber does not match the business Trade Licence')
  }
  return null
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import re

# EmiratesId: the pattern makes the hyphens optional, so 784-1990-1234567-1
# and 784199012345671 are the same Emirates ID. Compare the digits only.
def emirates_id_key(value: str) -> str:
    return value.replace("-", "")

# TradeLicenceNumber has no pattern, so the same licence can arrive in a
# different case or with different separators. Compare letters and digits only.
def licence_key(value: str) -> str:
    return re.sub(r"[^A-Z0-9]", "", value.upper())

# Single Instant Payment is the only consent that carries
# ControlParameters.ConsentSchedule.SinglePayment; every other payment
# consent is long-lived.
def is_long_lived(consent: dict) -> bool:
    schedule = consent["ControlParameters"].get("ConsentSchedule") or {}
    return "SinglePayment" not in schedule

def reject(detail: str) -> dict:
    return {
        "errorCode": "Consent.BusinessRuleViolation",
        "errorMessage": "Validation failed for AEPaymentPII: " + detail,
    }

def check_debtor_identifier(consent: dict, customer: dict, pii: dict) -> dict | None:
    # consent:  the consent identified by o3-consent-id
    # customer: resolved from o3-psu-identifier
    # pii:      the decrypted payment-time PII
    if not is_long_lived(consent):
        return None
    debtor = (pii.get("Risk") or {}).get("DebtorIndicators") or {}

    if customer["type"] == "Retail":
        sent = debtor.get("EmiratesId")
        if not sent:
            return reject("risk.debtorIndicators.emiratesID is required for a long-lived payment consent")
        if emirates_id_key(sent) != emirates_id_key(customer["emiratesId"]):
            return reject("risk.debtorIndicators.emiratesID does not match the PSU ID")
        return None

    # SME or Corporate: the business on whose behalf the consent was authorized
    sent = debtor.get("TradeLicenceNumber")
    if not sent:
        return reject("risk.debtorIndicators.tradeLicenceNumber is required for a long-lived payment consent")
    if licence_key(sent) != licence_key(customer["tradeLicenceNumber"]):
        return reject("risk.debtorIndicators.tradeLicenceNumber does not match the business Trade Licence")
    return None`,
  },
] as const

const errorExample = `{
  "errorCode": "Consent.BusinessRuleViolation",
  "errorMessage": "Validation failed for AEPaymentPII: risk.debtorIndicators.tradeLicenceNumber is required for a long-lived payment consent"
}`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Emirates ID and Trade Licence Number on Long-Lived Payments — Sending Them as a TPP, Checking Them as an LFI"
      :meta="meta"
      lede="A long-lived payment consent is authorized once and then pays many times. From v2.2, the TPP sends an identifier on every <code>POST /payments</code> under such a consent: a Retail User's <strong>Emirates ID</strong> in <code>Risk.DebtorIndicators.EmiratesId</code>, or, for an SME or Corporate User, the <strong>Trade Licence number</strong> of the business in <code>Risk.DebtorIndicators.TradeLicenceNumber</code>. The LFI uses it to confirm that each payment is being made for the same User, or the same business, for whom the consent was authorized."
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
        name. v2.2 adds two identifiers
        (<a href="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-21">changelog §21</a>),
        and for long-lived consents the TPP requirements make the one that applies to the User
        mandatory. The LFI compares it with what it holds for the customer behind the consent.
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>User</th><th>Field</th><th>Holds</th><th>Format</th></tr></thead>
          <tbody>
            <tr><td>Retail</td><td><code>EmiratesId</code></td><td>The Emirates ID number of the User</td><td><code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code> &mdash; 15 digits, hyphens optional</td></tr>
            <tr><td>SME or Corporate</td><td><code>TradeLicenceNumber</code></td><td>The Trade Licence number of the business on whose behalf the User is initiating the payment</td><td>No pattern &mdash; the format varies by issuing authority</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdRefTable>
        <table>
          <thead><tr><th>Who</th><th>What</th><th>When</th></tr></thead>
          <tbody>
            <tr><td>TPP</td><td>Captures the Retail User's Emirates ID, or the Trade Licence number of the SME or Corporate User's business</td><td>Before the first payment under the consent</td></tr>
            <tr><td>TPP</td><td>Sends it in <code>Risk.DebtorIndicators.EmiratesId</code> or <code>Risk.DebtorIndicators.TradeLicenceNumber</code> inside the encrypted PII</td><td>Every <code>POST /payments</code> under a long-lived consent</td></tr>
            <tr><td>LFI</td><td>Compares it with the Emirates ID or Trade Licence number held for the customer</td><td>On receiving <code>POST /payments</code> at its Ozone Connect endpoint</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="info" title="Only the LFI reads it">
        <p>
          <code>Risk</code> is part of the payment PII, which the TPP signs and encrypts to the LFI.
          The API Hub passes it through without decrypting it, so neither identifier is ever held
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
      title="Capture the one that applies, then send it on every payment"
      tone="cream"
    >
      <EdBullets>
        <li>For a <strong>Retail</strong> User, the TPP <strong>MUST</strong> capture the User's Emirates ID before initiating payments under a long-lived consent, and send it in <code>Risk.DebtorIndicators.EmiratesId</code>.</li>
        <li>For an <strong>SME or Corporate</strong> User, the TPP <strong>MUST</strong> capture the Trade Licence number of the business on whose behalf the User is initiating payments, and send it in <code>Risk.DebtorIndicators.TradeLicenceNumber</code>.</li>
        <li>The TPP <strong>MUST</strong> send it in the PII of <strong>every</strong> <code>POST /payments</code> under that consent &mdash; not only the first.</li>
        <li><code>EmiratesId</code> must match <code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code>: the 15 digits of the Emirates ID, with or without hyphens. <code>TradeLicenceNumber</code> has no pattern, as the format varies by issuing authority; send it as it appears on the business's Trade Licence.</li>
      </EdBullets>
      <EdCode :code="retailExample" lang="json" filename="PII — Risk, Retail User (excerpt)" />
      <EdCode :code="businessExample" lang="json" filename="PII — Risk, SME or Corporate User (excerpt)" />
      <EdProse>
        The rule is listed in the Payment Initiation requirements of each multi-payment type (linked
        above), and both fields are described on the
        <a href="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/personal-identifiable-information/risk">Risk</a>
        page.
      </EdProse>
      <EdNote type="warning" title="A missing identifier can fail the payment">
        <p>
          An LFI that checks the identifier rejects a payment under a long-lived consent that does
          not carry the one for its customer, as well as one that carries the wrong value. Both come
          back as <code>400 Consent.BusinessRuleViolation</code> &mdash; see <a href="#lfis">For LFIs</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="lfis"
      num="04"
      color="var(--at-gold)"
      eyebrow="For LFIs"
      title="Compare it with the customer behind the consent"
      tone="surface"
    >
      <EdProse>
        When your Ozone Connect
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
        endpoint receives a payment, you can check the identifier as part of validating the PII:
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Step</th><th>What to do</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Identify the consent from <code>o3-consent-id</code> and check that it is long-lived &mdash; it does not carry <code>ConsentSchedule.SinglePayment</code>.</td></tr>
            <tr><td>2</td><td>Identify the customer from <code>o3-psu-identifier</code> &mdash; the reference your LFI patched onto the consent when the User authorized it &mdash; and whether the customer is Retail, or SME or Corporate. That decides which field you check.</td></tr>
            <tr><td>3</td><td>Read <code>Risk.DebtorIndicators.EmiratesId</code> (Retail) or <code>Risk.DebtorIndicators.TradeLicenceNumber</code> (SME or Corporate) from the decrypted payment-time PII.</td></tr>
            <tr><td>4</td><td>Compare <code>EmiratesId</code> with the Emirates ID you hold for the customer, ignoring hyphens. Compare <code>TradeLicenceNumber</code> with the Trade Licence number you hold for the business, using only its letters and digits and ignoring case: the field has no pattern, so the TPP may send the same number with different separators from your record.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="checkTabs" />

      <h3>Error responses</h3>
      <EdProse>
        Reject the payment with <code>400</code> and <code>Consent.BusinessRuleViolation</code>. Every
        case has the same shape; only <code>errorMessage</code> changes.
      </EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Condition</th><th><code>errorCode</code></th><th><code>errorMessage</code></th></tr></thead>
          <tbody>
            <tr><td>Retail: <code>EmiratesId</code> is absent</td><td><code>Consent.BusinessRuleViolation</code></td><td><code>Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID is required for a long-lived payment consent</code></td></tr>
            <tr><td>Retail: <code>EmiratesId</code> does not match the PSU</td><td><code>Consent.BusinessRuleViolation</code></td><td><code>Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID does not match the PSU ID</code></td></tr>
            <tr><td>SME or Corporate: <code>TradeLicenceNumber</code> is absent</td><td><code>Consent.BusinessRuleViolation</code></td><td><code>Validation failed for AEPaymentPII: risk.debtorIndicators.tradeLicenceNumber is required for a long-lived payment consent</code></td></tr>
            <tr><td>SME or Corporate: <code>TradeLicenceNumber</code> does not match the business</td><td><code>Consent.BusinessRuleViolation</code></td><td><code>Validation failed for AEPaymentPII: risk.debtorIndicators.tradeLicenceNumber does not match the business Trade Licence</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCode :code="errorExample" lang="json" filename="400 — Trade Licence number missing" />

      <EdNote type="info" title="Check the field for the customer type">
        <p>
          Check only the field that matches the customer behind the consent: <code>EmiratesId</code>
          for a Retail customer, <code>TradeLicenceNumber</code> for an SME or Corporate customer. Do
          not reject a payment because the other field is absent.
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
        desc="The other place a TPP sends an Emirates ID or Trade Licence number to the LFI — once, at authorization, to correlate the User before they arrive."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
