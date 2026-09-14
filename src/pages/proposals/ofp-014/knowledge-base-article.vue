<route lang="yaml">
meta:
  title: 'OFP-014 · Date & Time Handling Across the Standard (draft article)'
</route>

<script setup lang="ts">
// The knowledge base article proposed for publication alongside OFP-014, drafted
// here so the ecosystem can review the guidance and the specification change
// together. Authored with the same editorial components as the published
// knowledge base so it can move to /knowledge-base/articles/date-time-handling
// unchanged once the proposal is agreed.
import { useHead } from '@unhead/vue'

const OG_TITLE = 'Date & Time Handling Across the Standard'
const OG_DESCRIPTION =
  'Every date-time in the standard is an instant, not a wall clock. What TPPs must send, what LFIs must accept, and how to verify your normalisation. Draft article attached to OFP-014.'
useHead({
  title: 'OFP-014 · Date & Time Handling Across the Standard (draft article)',
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'model',   label: 'The model' },
  { id: 'tpp',     label: 'For TPPs' },
  { id: 'lfi',     label: 'For LFIs' },
  { id: 'vectors', label: 'Test vectors' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Integration' },
  { label: 'Read',     value: '5 min' },
  { label: 'Status',   value: 'Draft · OFP-014' },
]

const tags: readonly string[] = ['Data Sharing', 'Consents', 'Ozone Connect']

const equivalentEncodings = `2027-07-22T00:00:00Z
2027-07-22T00:00:00.000Z
2027-07-22T00:00:00+00:00
2027-07-22T00:00:00.000+00:00
2027-07-22T04:00:00+04:00

# Five encodings. One instant. A conforming implementation
# resolves all five to the same moment.`

const selfTest = `2027-07-22T00:00:00Z
2027-07-22T04:00:00+04:00

# The same moment, written two ways. If your system behaves
# differently for these two, it is not applying the offset.`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/proposals/ofp-014" text="Back to OFP-014" />

    <EdHero
      eyebrow="Draft · Proposed for publication with OFP-014"
      title="Date &amp; Time Handling Across the Standard"
      :meta="meta"
      lede="Every date-time field in the standard identifies <strong>an instant in time</strong>, not a wall-clock reading. The same instant has many valid spellings, and all of them must behave identically. Getting this wrong produces errors that are invisible at long time horizons and severe at short ones."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdProse class="ed-page__intro">
      This article is a <strong>draft attached to OFP-014</strong>. It sets out how to produce and
      consume date-times across the standard, and publishes to the knowledge base if that proposal is
      agreed. The date-range <em>query parameters</em> on the transaction and statement list endpoints
      are specified separately and are not covered here.
    </EdProse>

    <EdSectionBand
      id="model"
      num="01"
      color="var(--at-teal)"
      eyebrow="The model"
      title="A date-time is an instant, not a wall clock"
      tone="cream"
    >
      <EdProse>
        Date-time fields across the standard &mdash; <code>ExpirationDateTime</code>,
        <code>CreationDateTime</code>, <code>TransactionDateTime</code>, <code>BookingDateTime</code>,
        <code>ValueDateTime</code> and the rest &mdash; are defined as <code>type: string</code>,
        <code>format: date-time</code>: an ISO 8601 / RFC 3339 date-time carrying a mandatory timezone
        offset. Three rules follow, and everything else here is a consequence of them.
      </EdProse>

      <EdBullets>
        <li><strong>A date-time is an instant.</strong> The offset is part of the value, not decoration.</li>
        <li><strong>Equivalent representations MUST behave identically.</strong> Two encodings of the same moment are the same value.</li>
        <li><strong>The offset is mandatory.</strong> A value without one is not valid against the standard and MUST NOT be produced.</li>
      </EdBullets>

      <EdCode :code="equivalentEncodings" lang="text" filename="Five spellings of one moment" />

      <EdProse>
        <strong>Why this matters more than it looks.</strong> The UAE is UTC+04:00. An implementation
        that reads the digits and ignores the offset resolves a UTC value to an instant
        <strong>four hours earlier</strong> than intended. At a thirty-day consent expiry that error is
        invisible. At a one-hour expiry the consent is already expired on arrival. The bug does not
        announce itself &mdash; it ships, and surfaces later as an unreproducible customer complaint.
      </EdProse>

      <EdNote type="warning" title="Do not rely on your counterparty, or on the platform, to normalise for you">
        <p>
          Normalise at your own boundary, on the way in. Treat every date-time you receive as a string
          that must be parsed into an instant before it is used, stored, or compared.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="tpp"
      num="02"
      color="var(--at-blue)"
      eyebrow="For TPPs"
      title="What to send, and how to read what comes back"
      tone="surface"
    >
      <EdProse><strong>Sending</strong></EdProse>

      <EdBullets>
        <li><strong>SHOULD emit UTC</strong> &mdash; <code>Z</code> or <code>+00:00</code>. Both are equally valid; pick one and be consistent.</li>
        <li><strong>MUST include an offset.</strong> A value with no offset is rejected by the API Hub on consent creation, with a <code>format - date-time</code> error.</li>
        <li><strong>MUST NOT use <code>-00:00</code>.</strong> ISO 8601 prohibits a negative zero offset; RFC 3339 permits it but assigns it <em>&ldquo;UTC, local offset unknown&rdquo;</em> semantics, which is not what you mean.</li>
        <li>Fractional seconds are optional. Send them or omit them &mdash; but do not rely on the value coming back at the same precision.</li>
      </EdBullets>

      <EdProse><strong>Receiving</strong></EdProse>

      <EdBullets>
        <li><strong>Parse into an instant.</strong> Apply the offset. Never read the wall-clock digits.</li>
        <li><strong>Never default a missing offset to local time.</strong> Treat it as an error, or at minimum default to <strong>UTC</strong>. Defaulting to local is what turns a missing offset into a silent four-hour error.</li>
        <li><strong>Never compare date-times as strings.</strong> <code>2027-07-22T00:00:00Z</code> and <code>2027-07-22T00:00:00.000Z</code> are the same instant and different strings. Anything built on string equality &mdash; deduplication keys, idempotency hashes, change detection &mdash; breaks the moment a counterparty adjusts its serialiser. Key on identifiers such as <code>TransactionId</code>, or on the parsed instant at a fixed precision.</li>
        <li><strong>A single payload may legitimately mix offsets.</strong> A consent record can carry the TPP's <code>ExpirationDateTime</code> as <code>Z</code> alongside the platform's own <code>CreationDateTime</code> as <code>+04:00</code>. Both are correct.</li>
      </EdBullets>

      <EdNote type="tip" title="Expect variation across LFIs">
        <p>
          Different institutions serialise differently, and legitimately so. Record what each
          counterparty emits and alert when the shape changes &mdash; a serialiser change upstream
          produces no error, only different bytes.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="lfi"
      num="03"
      color="var(--at-gold)"
      eyebrow="For LFIs"
      title="Apply the offset, and check your own stack first"
      tone="cream"
    >
      <EdProse><strong>Receiving from the API Hub</strong></EdProse>

      <EdBullets>
        <li><strong>Parse the offset.</strong> This is the single most important line in this article. A consent expiry of <code>2027-07-22T00:00:00Z</code> is <code>2027-07-22T04:00:00</code> UAE time &mdash; <strong>not</strong> <code>2027-07-22T00:00:00</code> UAE time.</li>
        <li><strong>Do not re-implement validation the platform already performs.</strong> The API Hub validates consent date-times on creation: it rejects values with no offset, and rejects an <code>ExpirationDateTime</code> that is not in the future. Re-validating in the LFI adds a second, divergent implementation of a centralised check.</li>
        <li><strong>Beware your own framework.</strong> In most reported cases of &ldquo;we received it without an offset&rdquo;, the offset was present on the wire and removed by a deserialiser, an ORM column mapping, or a log formatter.</li>
      </EdBullets>

      <EdNote type="important" title="Capture the raw body before you raise a ticket">
        <p>
          When diagnosing a missing offset, capture the <strong>raw request body before any JSON
          parsing</strong>. A value read back from your own database or logs has already passed through
          the layer most likely to be at fault, so it cannot tell you what arrived.
        </p>
      </EdNote>

      <EdProse><strong>Emitting</strong></EdProse>

      <EdBullets>
        <li><strong>SHOULD emit UTC</strong> &mdash; <code>Z</code> or <code>+00:00</code> &mdash; on every date-time you produce.</li>
        <li><strong>MUST include an offset</strong> on every date-time in every response.</li>
        <li>Where a transaction's local context matters, carry it in the dedicated <code>LocalTimeZone</code> field (format <code>UTC+04:00</code>, including the <code>UTC</code> prefix &mdash; a bare <code>+04:00</code> fails that field's pattern). Do <strong>not</strong> express local context by shifting the offset on <code>TransactionDateTime</code>.</li>
      </EdBullets>

      <EdProse><strong>A two-minute self-test</strong></EdProse>

      <EdCode :code="selfTest" lang="text" filename="Submit the same instant twice, spelled differently" />

      <EdProse>
        If your system behaves differently for those two values, your implementation is not applying the
        offset &mdash; and you have reproduced the defect without instrumenting anything.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="vectors"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Test vectors"
      title="Verify your normalisation"
      tone="surface"
      narrow
    >
      <EdProse>
        <code>Epoch</code> is seconds since <code>1970-01-01T00:00:00Z</code>.
      </EdProse>

      <div class="ed-table-wrap">
        <table class="ed-table">
          <thead>
            <tr><th>Value</th><th>Epoch</th><th>UAE local time</th></tr>
          </thead>
          <tbody>
            <tr><td><code>2027-07-22T00:00:00Z</code></td><td>1816214400</td><td>2027-07-22T04:00:00+04:00</td></tr>
            <tr><td><code>2027-07-22T00:00:00.000Z</code></td><td>1816214400</td><td>2027-07-22T04:00:00+04:00</td></tr>
            <tr><td><code>2027-07-22T00:00:00+00:00</code></td><td>1816214400</td><td>2027-07-22T04:00:00+04:00</td></tr>
            <tr><td><code>2027-07-22T00:00:00.000+00:00</code></td><td>1816214400</td><td>2027-07-22T04:00:00+04:00</td></tr>
            <tr><td><code>2027-07-22T04:00:00+04:00</code></td><td>1816214400</td><td>2027-07-22T04:00:00+04:00</td></tr>
            <tr><td><code>2027-07-22T00:00:00-05:00</code></td><td>1816232400</td><td>2027-07-22T09:00:00+04:00</td></tr>
            <tr><td><code>2027-04-05T10:43:07+00:00</code></td><td>1806921787</td><td>2027-04-05T14:43:07+04:00</td></tr>
          </tbody>
        </table>
      </div>

      <EdProse>
        <strong>The first five rows are one instant.</strong> If your implementation produces more than
        one distinct value for them, it is not conforming. The sixth row is a genuinely different
        instant, five hours later &mdash; included so the test distinguishes &ldquo;applies the
        offset&rdquo; from &ldquo;ignores the offset and happens to agree&rdquo;.
      </EdProse>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue-deep) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
.ed-page__intro { max-width: var(--at-page-max); margin: 1.5rem auto -1rem; padding: 0 2rem; }

.ed-table-wrap { overflow-x: auto; margin: 0 0 1.5rem; }
.ed-table { width: 100%; border-collapse: collapse; font-family: var(--at-mono); font-size: 0.8rem; }
.ed-table th {
  text-align: left;
  padding: 0.6rem 0.9rem;
  border-bottom: 2px solid var(--at-grid-line);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
}
.ed-table td { padding: 0.55rem 0.9rem; border-bottom: 1px solid var(--at-grid-line); white-space: nowrap; }
.ed-table code { font-size: 0.8rem; }
</style>
