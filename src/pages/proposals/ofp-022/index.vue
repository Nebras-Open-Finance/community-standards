<route lang="yaml">
meta:
  title: 'OFP-022 · Send the Debtor’s Emirates ID or Trade Licence Number to the LFI on long-lived payments'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-022. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections. The
// sections follow the "E-ID in Open Finance" standards-review deck: the position
// as we stand, where the debtor's identity is mandated today, SIP, the Risk
// block, the operating model, the V2.1 conclusion, then the V2.2 recommendation,
// Technical changes, Questions, Pros and Cons.
//
// Scope is the debtor identifier that V2.2 already adds to Risk.DebtorIndicators
// (v2.1 → v2.2 changelog §21): EmiratesId for a Retail User, TradeLicenceNumber
// for the business of an SME or Corporate User. It formalises the TPP obligation
// to send it on every POST /payments under a long-lived consent, and permits the
// LFI to enforce it at its Ozone Connect POST /payments endpoint.
import { ref, computed, onMounted, watch, type Component } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'
import PvProposalTabs from '@/components/proposals/PvProposalTabs.vue'

// Per-page link-preview override: a tailored title + description so a shared
// link to this proposal reads as the proposal itself, not the site default.
// (og:image is inherited from the branded site default in App.vue.) Later meta
// of the same property/name wins under Unhead's dedupe.
const OG_TITLE = 'OFP-022 · Send the Debtor’s Emirates ID or Trade Licence Number to the LFI on long-lived payments'
const OG_DESCRIPTION =
  'V2.1 asks the TPP for the Debtor’s Emirates ID in login_hint when a long-lived payment consent is established, and nothing carries it again when a payment is made under that consent. This proposal uses the Risk block, as extended in V2.2: on every POST /payments under a long-lived consent, the TPP sends the Emirates ID of a Retail User, or the Trade Licence number of the business for an SME or Corporate User, and the LFI may reject a payment when it is missing or does not match.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-022',
  proposedBy: 'Nebras',
  author: 'Jonathan Holman',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '19 Nov 2026',
  closes: '3 Dec 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

const LFI_SI = '/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation'
const TPP_SI = '/tech/tpp-standards/v2.2-rc2/banking/service-initiation'
const KB_ARTICLE = '/knowledge-base/articles/emirates-id-trade-licence-long-lived-payments'
const CHANGE_21 = '/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-21'

// The seven long-lived payment types — every payment consent other than Single
// Instant Payment. Each links to its LFI requirements page, where the LFI check
// proposed here would be listed.
const longLivedTypes = [
  { name: 'Fixed Defined Schedule', slug: 'fixed-defined-schedule' },
  { name: 'Fixed On Demand', slug: 'fixed-on-demand' },
  { name: 'Fixed Periodic Schedule', slug: 'fixed-periodic-schedule' },
  { name: 'Variable Defined Schedule', slug: 'variable-defined-schedule' },
  { name: 'Variable On Demand', slug: 'variable-on-demand' },
  { name: 'Variable Periodic Schedule', slug: 'variable-periodic-schedule' },
  { name: 'Delegated SCA', slug: 'delegated-sca' },
]

// 05 · Operating model — the two flows. Strings are static and authored here,
// so they are rendered with v-html for the inline <code>.
const creditorFlow = [
  { title: 'TPP executes the payment', text: 'Includes the creditor’s identifier in <code>Risk.CreditorIndicators</code> if it holds it.' },
  { title: 'LFI processes the request', text: 'Does not reject the payment solely because the optional creditor identifier is missing.' },
  { title: 'Standards observation', text: 'The LFI records the omission, or any other <code>Risk</code> issue, as a conformance concern.' },
  { title: 'Escalate to Nebras', text: 'Nebras addresses standards compliance with the TPP in question.' },
]

const debtorFlow = [
  { title: 'TPP sends the identifier', text: '<code>EmiratesId</code> or <code>TradeLicenceNumber</code> in <code>Risk.DebtorIndicators</code>, on every <code>POST /payments</code> under the consent.' },
  { title: 'LFI identifies the customer', text: 'From <code>o3-psu-identifier</code>. Whether the customer is Retail, or SME or Corporate, decides which field is checked.' },
  { title: 'LFI compares', text: 'With the Emirates ID it holds for the customer, or the Trade Licence number it holds for the business.' },
  { title: 'LFI MAY reject', text: '<code>400 Consent.BusinessRuleViolation</code> when the value is missing or does not match.' },
]

// 06 · The V2.1 position per scenario, and what this proposal changes in V2.2.
const scenarios = [
  {
    scenario: 'Transactional-data consent set-up',
    subject: 'Debtor',
    where: '<code>login_hint</code>, at <code>POST /par</code>',
    stance: 'The TPP is asked to send it, but the specification says a request should not be rejected if <code>login_hint</code> is not provided.',
    v22: 'Unchanged',
    changed: false,
  },
  {
    scenario: 'Transactional-data <code>GET</code> request',
    subject: 'Debtor',
    where: 'No field in the specification',
    stance: 'Do not expect or validate.',
    v22: 'Unchanged &mdash; out of scope',
    changed: false,
  },
  {
    scenario: 'Long-lived payment consent set-up',
    subject: 'Debtor',
    where: '<code>login_hint</code>, at <code>POST /par</code>',
    stance: 'The TPP is asked to send it, but the specification says a request should not be rejected if <code>login_hint</code> is not provided.',
    v22: 'Unchanged',
    changed: false,
  },
  {
    scenario: 'Payment under a long-lived consent',
    subject: 'Debtor',
    where: 'No field, and no obligation to send it again',
    stance: 'Do not expect or validate.',
    v22: '<strong>Changed.</strong> <code>EmiratesId</code> (Retail) or <code>TradeLicenceNumber</code> (SME or Corporate) in <code>Risk.DebtorIndicators</code>, on every <code>POST /payments</code>. The LFI MAY reject when it is missing or does not match.',
    changed: true,
  },
  {
    scenario: 'Single Instant Payment consent and payment',
    subject: 'Debtor',
    where: 'The <code>login_hint</code> rule does not apply',
    stance: 'Do not apply the long-lived consent check.',
    v22: 'Unchanged &mdash; out of scope',
    changed: false,
  },
  {
    scenario: 'Payment <code>Risk</code> block',
    subject: 'Creditor',
    where: 'Optional <code>CreditorIndicators.AdditionalAccountHolderIdentifiers</code>, if the TPP holds it',
    stance: 'Do not block; report conformance gaps.',
    v22: 'Unchanged',
    changed: false,
  },
]

// 07 · The V2.2 design questions put to LFIs and TPPs, with this proposal's answer.
const designQuestions = [
  {
    q: 'At what stage should the debtor’s identity be supplied for long-lived payments and transactional-data requests?',
    a: 'For long-lived payments, on <strong>every</strong> <code>POST /payments</code>, in the payment-time <code>Risk</code> block, as well as in <code>login_hint</code> when the consent is established. This proposal does not address transactional-data requests.',
  },
  {
    q: 'Which risks are material, and which mitigants are effective enough to justify implementation?',
    a: 'A payment under a long-lived consent reaches the LFI with no authentication of its own. Comparing an identifier the LFI already holds for its customer confirms that the payment is for the User, or the business, behind the consent, for the cost of one field and one comparison.',
  },
  {
    q: 'What solution will both TPPs and LFIs implement consistently in live use, not only in documentation?',
    a: 'One field for each type of customer, already in every V2.2 specification, on an endpoint both sides already implement. No new endpoint, header or consent field, and no change at the API Hub.',
  },
  {
    q: 'Should creditor extended information continue to be carried through the Risk block?',
    a: 'This proposal does not change it. <code>CreditorIndicators.AdditionalAccountHolderIdentifiers</code> stays optional, and the TPP sends it if it holds it.',
  },
  {
    q: 'What ecosystem guidance is required for validation, including when to reject, warn or report?',
    a: 'For the debtor’s identifier under a long-lived consent, the LFI MAY reject with <code>400 Consent.BusinessRuleViolation</code>, using the four error messages below. Whether that should become a MUST is the question attached to the vote. For the creditor’s identifier: report, do not block.',
  },
]

// 07 · The four rejections the LFI may return.
const rejections = [
  { condition: 'Retail: <code>EmiratesId</code> is absent', message: 'Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID is required for a long-lived payment consent' },
  { condition: 'Retail: <code>EmiratesId</code> does not match the PSU', message: 'Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID does not match the PSU ID' },
  { condition: 'SME or Corporate: <code>TradeLicenceNumber</code> is absent', message: 'Validation failed for AEPaymentPII: risk.debtorIndicators.tradeLicenceNumber is required for a long-lived payment consent' },
  { condition: 'SME or Corporate: <code>TradeLicenceNumber</code> does not match the business', message: 'Validation failed for AEPaymentPII: risk.debtorIndicators.tradeLicenceNumber does not match the business Trade Licence' },
]

// The questions asked alongside the vote. These are ALSO held in the proposals
// API (the `questions` column) — that is where the vote form reads them from,
// and where the answers are stored. Kept here so they are readable on the page
// before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'Enforcement',
    q: 'Should the LFI check stay permitted but optional, as proposed, or should every LFI be required to reject a payment under a long-lived consent when the Emirates ID or Trade Licence number is missing or does not match?',
    why: 'An optional check lets each LFI adopt it when it is ready, but a TPP then sees a missing identifier rejected by one LFI and accepted by another.',
  },
]

const pros = [
  'The Debtor’s identity reaches the LFI with every payment under a long-lived consent, not only once in login_hint when the consent is established.',
  'The LFI can confirm that each payment is made for the User, or the business, for whom the consent was authorized, including payments made when the User is not present.',
  'Retail, SME and Corporate customers are all covered: one field for each, chosen by the type of customer.',
  'Both fields are already in the V2.2 specifications: Standards, Consent Manager and Ozone Connect. No endpoint, header or consent field is added.',
  'The API orchestration does not change. The identifier arrives on the same POST /payments request, and the LFI already retrieves the consent for every payment request.',
  'The identifier travels inside the encrypted PII. The API Hub passes it through without decrypting it, so it is never held centrally.',
  'It follows the existing rule that a TPP populates every Risk field it knows. It adds no new kind of obligation.',
  'Each LFI decides when to enforce, so an LFI that is not ready keeps accepting payments as it does today.',
  'The creditor side is unchanged: the optional creditor identifier is still sent if held, and a missing one is reported, not blocked.',
]

const cons = [
  'Enforcement is optional, so the same payment can be rejected by one LFI and accepted by another. A TPP has to send the field correctly everywhere to be safe.',
  'A TPP that has not been capturing the identifier must collect it from existing Users, or for their businesses, before their next payment, or see those payments rejected by LFIs that enforce.',
  'A wrong value in the TPP’s or the LFI’s records fails every payment under the consent until it is corrected.',
  'TradeLicenceNumber has no pattern, as the format varies by issuing authority, so its format cannot be checked and the LFI must normalise both values before comparing them.',
  'The TPP must know whether the User is a Retail customer or is paying for a business. If it sends the wrong field, an LFI that enforces rejects the payment.',
  'The API Hub cannot enforce the rule. The field sits inside encrypted PII, so a missing value is caught only by an LFI that checks.',
  'V2.1 has no field for either identifier, so payments made through V2.1 endpoints cannot carry it and cannot be checked.',
]

// The payment-time PII for each type of customer, and a rejection — rendered in
// the Recommendation section.
const payloadExample = `# POST /payments - payment-time PII, as decrypted by the LFI (excerpt)

# Retail User
{
  "Initiation": { ... },
  "Risk": {
    "DebtorIndicators": {
      "UserName": { "en": "...", "ar": "..." },
      "EmiratesId": "784-1990-1234567-1",   # required under a long-lived consent
      ...
    },
    "TransactionIndicators": { ... },
    "CreditorIndicators": { ... }
  }
}

# SME or Corporate User
{
  "Initiation": { ... },
  "Risk": {
    "DebtorIndicators": {
      "UserName": { "en": "...", "ar": "..." },
      "TradeLicenceNumber": "CN-1234567",   # required under a long-lived consent
      ...
    },
    "TransactionIndicators": { ... },
    "CreditorIndicators": { ... }
  }
}

# LFI rejects the payment - 400, TradeLicenceNumber absent
{
  "errorCode": "Consent.BusinessRuleViolation",
  "errorMessage": "Validation failed for AEPaymentPII: risk.debtorIndicators.tradeLicenceNumber is required for a long-lived payment consent"
}`

// The V2.2 definition — rendered in the Technical changes section.
const schemaExample = `# Standards - uae-authorization-endpoints-openapi.yaml (consent-time Risk, POST /par)
# Standards - uae-bank-initiation-openapi.yaml       (payment-time Risk, POST /payments)
DebtorIndicators:
  EmiratesId:
    type: string
    pattern: ^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$
    description: The Emirates ID number of the User initiating the Payment, where the User
      is a Retail customer. For payments made under a long-lived consent, the LFI can use
      it to confirm that each payment is being made for the same User who authorized the
      consent.
  TradeLicenceNumber:
    type: string
    description: The Trade Licence number of the business on whose behalf the User is
      initiating the Payment, where the User is an SME or Corporate customer. For payments
      made under a long-lived consent, the LFI can use it to confirm that each payment is
      being made for the same business on whose behalf the consent was authorized.

# Ozone Connect - uae-ozone-connect-bank-service-initiation-openapi.yaml (v2.2.7)
# The same definitions on AEDebtorIndicators, received by POST /payments.`

// ─── Voting ─────────────────────────────────────────────────────────────────
// Live tally + vote submission are backed by the proposals API (D1) via
// useProposals. PvVotePanel takes a Proposal-shaped object; only id/status/
// closes are read by the panel, the rest come from `meta` above.
const { myVotes, setVote, submitVote, hydrate, loadOne, loadMe, metaById } = useProposals()

// The proposal's live metadata from the API (dates, priority). Drives the hero
// status pill, priority tag, and the Opened/Closes strip — falling back to the
// static values in `meta` until the API responds (and for the static build).
const apiMeta = computed(() => metaById.value[meta.id])

const closesIn = ref('')
const status = ref<Status>('draft')
const priority = ref<Priority>(meta.priority)
const openedDisplay = ref(meta.opened)
const closesDisplay = ref(meta.closes)
const versionDisplay = ref(meta.version)

const priorityLabel = computed(() => PRIORITY[priority.value]?.label ?? PRIORITY.medium.label)

// Voting has finished: swap the "Cast your vote" CTA for a closed treatment and
// let the tally show through (the draft state keeps its frosted cover below).
const isClosed = computed(() => status.value === 'closed')

// Optional companion partials, authored per proposal and co-located with this
// page (outcome.vue / feedback.vue). Their presence drives the layout: an
// Outcome switches a closed proposal to the tabbed view; Feedback is appended
// under the vote panel. When neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Send the Debtor’s Emirates ID or Trade Licence Number to the LFI on long-lived payments',
  summary: '',
  category: '',
  priority: priority.value,
  status: status.value,
  author: { org: meta.proposedBy, person: meta.author },
  opened: openedDisplay.value,
  closes: closesDisplay.value,
  closesIn: closesIn.value,
  body: [],
  questions: apiMeta.value?.questions ?? [],
  version: versionDisplay.value,
}))

const myVote = computed(() => myVotes.value[meta.id])
const submitError = ref('')

function onVote(stance: Stance | null): void {
  submitError.value = ''
  setVote(meta.id, stance)
}

async function onSubmit(detail: { comment: string; answers: string[] }): Promise<void> {
  if (!myVote.value) return
  submitError.value = ''
  const result = await submitVote(meta.id, { stance: myVote.value.stance, comment: detail.comment, answers: detail.answers })
  if (!result.ok) submitError.value = result.message ?? 'Could not record your vote.'
}

// Convert a display date ('3 Jul 2026') to ISO 'YYYY-MM-DD' for status/countdown.
function toISO(display: string): string {
  const d = new Date(display)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
}

// Relative countdown for the panel's "closes" line.
function daysLeft(iso: string): string {
  if (!iso) return ''
  const days = Math.ceil((new Date(`${iso}T23:59:59Z`).getTime() - Date.now()) / 86_400_000)
  if (days < 0) return 'Closed'
  if (days === 0) return 'Closing today'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

// Format an ISO date ('2026-11-19') as the strip's display form ('19 Nov 2026').
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function fmtDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// Derive status / countdown / priority / dates from the API metadata when it has
// loaded, otherwise from the static fallbacks in `meta`. Run on the client only
// (onMounted + a watch on apiMeta) so the static build and first client render
// agree on the defaults, avoiding a hydration mismatch.
function syncFromApi(): void {
  const m = apiMeta.value
  const openedISO = m?.opened || toISO(meta.opened)
  const closesISO = m?.closes || toISO(meta.closes)
  status.value = deriveStatus(openedISO, closesISO)
  closesIn.value = daysLeft(closesISO)
  priority.value = (m?.priority as Priority) || meta.priority
  openedDisplay.value = m?.opened ? fmtDate(m.opened) : meta.opened
  closesDisplay.value = m?.closes ? fmtDate(m.closes) : meta.closes
  versionDisplay.value = m?.version || meta.version
}

watch(apiMeta, syncFromApi)

onMounted(() => {
  hydrate()
  void loadOne(meta.id)
  void loadMe()
  syncFromApi()
  if (typeof window !== 'undefined') window.scrollTo(0, 0)
})
</script>

<template>
  <div class="ofp">
    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-hero">
      <div class="ofp-hero__inner">
        <RouterLink to="/proposals/" class="ofp__back">
          <span class="ofp__back-arrow">&larr;</span> All proposals
        </RouterLink>

        <div class="ofp__meta-row">
          <span class="ofp__id">{{ meta.id }}</span>
          <span class="ofp__divider" />
          <PvStatusPill :status="status" />
          <span class="ofp__tag ofp__tag--priority">{{ priorityLabel }}</span>
        </div>

        <h1 class="ofp__title">Send the Debtor&rsquo;s Emirates ID or Trade Licence Number to the LFI on long-lived payments</h1>
        <p class="ofp__summary">
          V2.1 asks the TPP for the Debtor&rsquo;s Emirates ID in <code>login_hint</code> when a long-lived
          payment consent is established, and nothing carries it again when a payment is made under that
          consent. This proposal uses the <code>Risk</code> block, as already extended in V2.2. On
          <strong>every payment</strong> under a long-lived consent, the TPP sends the
          <strong>Emirates ID</strong> of a Retail User, or the <strong>Trade Licence number</strong> of the
          business for an SME or Corporate User, on the same <code>POST /payments</code>. The LFI
          <strong>may reject the payment</strong> when it is missing or does not match.
        </p>

        <div class="ofp__strip">
          <div class="ofp__strip-item">
            <div class="ofp__strip-key">Proposed by</div>
            <div class="ofp__strip-val">{{ meta.proposedBy }}</div>
          </div>
          <div class="ofp__strip-item">
            <div class="ofp__strip-key">Author</div>
            <div class="ofp__strip-val">{{ meta.author }}</div>
          </div>
          <div class="ofp__strip-item">
            <div class="ofp__strip-key">Target</div>
            <div class="ofp__strip-val">{{ versionDisplay }}</div>
          </div>
          <div class="ofp__strip-item">
            <div class="ofp__strip-key">Opened</div>
            <div class="ofp__strip-val">{{ openedDisplay }}</div>
          </div>
          <div class="ofp__strip-item">
            <div class="ofp__strip-key">Closes</div>
            <div class="ofp__strip-val">{{ closesDisplay }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         DECISION · once closed with an Outcome, this whole region becomes tabs.
    ═══════════════════════════════════════════════════════════════════ -->
    <PvProposalTabs :tabbed="showTabs">
      <template #outcome>
        <component :is="OutcomePartial" />
      </template>

      <template #votes>
    <!-- ─── CAST YOUR VOTE ─── -->
    <section class="ofp-band ofp-band--white ofp-vote-wrap">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> Decision</div>
          <h2 class="ofp-band__title">{{ isClosed ? 'Voting is now closed' : 'Cast your vote' }}</h2>
          <p v-if="isClosed" class="ofp-band__lede">
            The voting period has ended. The votes cast are shown below.
          </p>
          <p v-else class="ofp-band__lede">
            Sign in with the Trust Framework to vote &mdash; For, Against, or Abstain &mdash; recorded in
            the open with your reasoning. Your organisation and name come from your directory profile, and
            each person may vote once. <strong>One question is attached to this vote</strong> &mdash;
            set out in section 09 below. It asks whether the LFI check should stay optional.
          </p>
        </div>
        <PvVotePanel :proposal="proposal" :my-vote="myVote" @vote="onVote" @submit="onSubmit" />
        <p v-if="submitError && status === 'open'" class="ofp-vote-error" role="alert">{{ submitError }}</p>
      </div>

      <!-- Before voting opens, frost over the whole white block. Once voting has
           closed the cover is dropped so the tally shows through. -->
      <div v-if="status === 'draft'" class="ofp-vote-cover" aria-hidden="false">
        <div class="ofp-vote-cover__card">
          <div class="ofp-vote-cover__label">Voting not yet open</div>
          <div class="ofp-vote-cover__msg">Voting opens {{ openedDisplay }}</div>
        </div>
      </div>
    </section>

        <!-- Feedback: appended under the vote panel once voting has closed, when a
             feedback partial has been authored (else just the vote panel shows). -->
        <component :is="FeedbackPartial" v-if="FeedbackPartial && isClosed" />
      </template>

      <template #proposal>
    <!-- ═══════════════════════════════════════════════════════════════════
         01 · THE POSITION AS WE STAND
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream ofp-band--seam">
      <span class="ofp-seam-label">The proposal</span>
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 &middot; The position as we stand</div>
          <h2 class="ofp-band__title">Three identities, and where each one travels</h2>
          <p class="ofp-band__lede">
            The key distinction is between the debtor&rsquo;s identity when a consent is established, the
            debtor&rsquo;s identity when a payment is made under it, and the creditor&rsquo;s identity in the
            payment <code>Risk</code> block.
          </p>
        </div>

        <div class="ofp-cards">
          <div class="ofp-card">
            <div class="ofp-card__num">01</div>
            <div class="ofp-card__title">Current mandate</div>
            <p>
              The Debtor&rsquo;s Emirates ID is asked for in <code>login_hint</code> when a TPP establishes a
              consent for transactional data or a long-lived payment.
            </p>
            <p>
              It is not supplied again when data is pulled or a payment is initiated under that consent.
            </p>
          </div>
          <div class="ofp-card">
            <div class="ofp-card__num">02</div>
            <div class="ofp-card__title">SIP and the <code>Risk</code> block</div>
            <p>Single Instant Payment is not governed by the <code>login_hint</code> rule.</p>
            <p>
              At payment, the V2.1 <code>Risk</code> block has an optional identifier for the
              <strong>creditor</strong>, which the TPP sends if it holds it. It has none for the debtor.
            </p>
          </div>
          <div class="ofp-card">
            <div class="ofp-card__num">03</div>
            <div class="ofp-card__title">Validation approach</div>
            <p>
              An LFI should not fail a payment because the optional creditor identifier is absent. It cannot
              reliably tell whether the TPP holds it.
            </p>
            <p>Gaps are reported to Nebras, not blocked.</p>
          </div>
        </div>

        <div class="ofp-callout">
          <div class="ofp-callout__title">V2.2 objective</div>
          <div class="ofp-callout__text">
            Agree an ecosystem-wide control that LFIs and TPPs will actually implement and use. For long-lived
            payments, this proposal is that control: the TPP sends the Debtor&rsquo;s identifier on every
            <code>POST /payments</code>, and the LFI may check it.
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         02 · WHERE THE DEBTOR'S IDENTITY IS MANDATED TODAY
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 &middot; Where it is mandated today</div>
          <h2 class="ofp-band__title">At consent establishment, not when the consent is used</h2>
          <p class="ofp-band__lede">
            V2.1 places the obligation at the start of the consent. Nothing carries the Debtor&rsquo;s identity
            when the consent is used.
          </p>
        </div>

        <ol class="ofp-steps ofp-steps--3">
          <li class="ofp-step">
            <div class="ofp-step__num">1</div>
            <div class="ofp-step__title">Establish the consent</div>
            <p>
              The TPP supplies the Debtor&rsquo;s Emirates ID in <code>login_hint</code> for a transactional-data
              consent or a long-lived payment consent, at
              <RouterLink to="/tech/tpp-standards/v2.2-rc2/consent/open-api/par"><code>POST /par</code></RouterLink>.
            </p>
          </li>
          <li class="ofp-step">
            <div class="ofp-step__num">2</div>
            <div class="ofp-step__title">Use the consent</div>
            <p>
              On a transactional-data <code>GET</code> request, or a payment under a long-lived consent, V2.1 has
              no obligation, and no field, to send it again.
            </p>
          </li>
          <li class="ofp-step">
            <div class="ofp-step__num">3</div>
            <div class="ofp-step__title">The relevant identity</div>
            <p>
              The value asked for is the Debtor&rsquo;s &mdash; the account owner&rsquo;s &mdash; Emirates ID, not
              the creditor&rsquo;s.
            </p>
          </li>
        </ol>

        <div class="ofp-compare">
          <div class="ofp-compare__col">
            <div class="ofp-compare__head">Original rationale</div>
            <p>The Emirates ID point was agreed with the UBF group as part of fraud controls.</p>
          </div>
          <div class="ofp-compare__col">
            <div class="ofp-compare__head">Implementation reality</div>
            <p>
              Existing LFI implementations are generally not validating it, and TPPs are generally not
              supplying it.
            </p>
          </div>
        </div>

        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Why <code>login_hint</code> cannot carry it to the payment</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>It is a FAPI authorization request parameter, and in the redirect flow it is only a
                hint.</strong> It helps the LFI with authentication, and nothing more. The Authorization
                Endpoints specification follows OpenID Connect Core: <code>login_hint</code> &ldquo;MUST NOT be
                used to bypass authentication of the User, nor should a request be rejected if
                <code>login_hint</code> is not provided.&rdquo;
              </li>
              <li>
                <strong>It reaches the LFI once, during authorization.</strong> It is delivered only in the
                <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/headless-heimdall/open-api/auth"><code>GET /auth</code></RouterLink>
                response and is never written onto the consent, so it is not available when a payment arrives at
                <code>POST /payments</code>.
              </li>
              <li>
                <strong>It identifies who is expected to authenticate, not who makes each payment.</strong>
                Under a long-lived consent, each payment after the first is made after the authorization journey
                has ended.
              </li>
            </ul>
          </div>
          <p>
            This proposal does not change <code>login_hint</code>. It remains available for its intended
            purpose: helping the LFI identify the customer before authentication. See
            <RouterLink to="/knowledge-base/articles/login-hint-emirates-id">Emirates ID in login_hint</RouterLink>.
          </p>
        </div>

        <div class="ofp-callout">
          <div class="ofp-callout__title">Implication</div>
          <div class="ofp-callout__text">
            Revise the design in V2.2 rather than enforce a control with low adoption: carry the Debtor&rsquo;s
            identifier where the payment is made and can be checked.
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · SINGLE INSTANT PAYMENT IS OUT OF SCOPE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Single Instant Payment</div>
          <h2 class="ofp-band__title">Only long-lived consents are in scope</h2>
          <p class="ofp-band__lede">
            A Single Instant Payment consent is not long-lived, so neither the <code>login_hint</code> rule nor
            this proposal&rsquo;s check applies to it.
          </p>
        </div>

        <div class="ofp-compare">
          <div class="ofp-compare__col">
            <div class="ofp-compare__head">Long-lived payment consent <span class="ofp-badge ofp-badge--in">In scope</span></div>
            <ul class="ofp-compare__list">
              <li>Authorized at the LFI once, then used for weeks or months, often with the User not present.</li>
              <li>Each later payment reaches the LFI with no authentication of its own, only the consent it was made under.</li>
              <li>V2.1: the Debtor&rsquo;s identity is supplied in <code>login_hint</code> when the consent is established.</li>
              <li>V2.2, with this proposal: and on every <code>POST /payments</code> under the consent.</li>
            </ul>
          </div>
          <div class="ofp-compare__col">
            <div class="ofp-compare__head">Single Instant Payment <span class="ofp-badge ofp-badge--out">Out of scope</span></div>
            <ul class="ofp-compare__list">
              <li>Authorized and used once.</li>
              <li>Not governed by the <code>login_hint</code> rule.</li>
              <li>No check of the Debtor&rsquo;s identifier, at consent or at payment.</li>
              <li>The TPP still populates every <code>Risk</code> field it holds.</li>
            </ul>
          </div>
        </div>

        <div class="ofp-prose">
          <div class="ofp-table-wrap">
            <table class="ofp-table">
              <thead>
                <tr><th>Consent</th><th>Payment types</th><th>In scope</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>Long-lived</th>
                  <td>
                    <template v-for="(t, i) in longLivedTypes" :key="t.slug">
                      <RouterLink :to="`${LFI_SI}/domestic-payments/multi-payments/${t.slug}/requirements`">{{ t.name }}</RouterLink><template v-if="i < longLivedTypes.length - 1">, </template>
                    </template>
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <th>Single-use</th>
                  <td>Single Instant Payment</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · THE RISK BLOCK
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 &middot; The <code>Risk</code> block</div>
          <h2 class="ofp-band__title">The debtor&rsquo;s identifier is new in V2.2; the creditor&rsquo;s stays optional</h2>
          <p class="ofp-band__lede">
            <RouterLink :to="`${TPP_SI}/personal-identifiable-information/risk`"><code>Risk</code></RouterLink>
            is where the LFI receives what the TPP knows about a payment. It is part of the payment PII, which
            the TPP signs and encrypts to the LFI.
          </p>
        </div>

        <div class="ofp-cards">
          <div class="ofp-card">
            <div class="ofp-card__title">Debtor <span class="ofp-badge ofp-badge--new">New in V2.2</span></div>
            <p>V2.1 has no identifier for the debtor in <code>Risk.DebtorIndicators</code>.</p>
            <p>
              V2.2 adds <code>EmiratesId</code> for a Retail User and <code>TradeLicenceNumber</code> for the
              business of an SME or Corporate User
              (<RouterLink :to="CHANGE_21">changelog &sect;21</RouterLink>). This proposal concerns these fields.
            </p>
          </div>
          <div class="ofp-card">
            <div class="ofp-card__title">Payment <code>Risk</code> block <span class="ofp-badge ofp-badge--neutral">Encrypted PII</span></div>
            <p>
              The TPP MUST populate every <code>Risk</code> field that is known or derivable from its system.
            </p>
            <p>The API Hub passes it to the LFI without decrypting it, so it is never held centrally.</p>
          </div>
          <div class="ofp-card">
            <div class="ofp-card__title">Creditor <span class="ofp-badge ofp-badge--held">Send if held</span></div>
            <p>
              <code>CreditorIndicators.AdditionalAccountHolderIdentifiers</code> carries an optional
              <code>EmiratesID</code> or <code>TradeLicenceNumber</code> for the creditor, in V2.1 and V2.2.
            </p>
            <p>The TPP sends it if it holds it. This proposal does not change it.</p>
          </div>
        </div>

        <div class="ofp-callout">
          <div class="ofp-callout__title">Optional does not mean irrelevant</div>
          <div class="ofp-callout__text">
            For the creditor, optional means availability depends on the TPP&rsquo;s real-world context. The
            Debtor&rsquo;s identifier is different: under a long-lived consent the TPP is required to capture it.
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · OPERATING MODEL
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; Operating model</div>
          <h2 class="ofp-band__title">Report a missing creditor identifier; check the debtor&rsquo;s</h2>
          <p class="ofp-band__lede">
            An LFI cannot tell whether a TPP should hold the creditor&rsquo;s identifier, so it reports a gap
            rather than blocking the payment. Under a long-lived consent the TPP is required to hold the
            Debtor&rsquo;s identifier, so the LFI can check it.
          </p>
        </div>

        <div class="ofp-flow-label">Creditor identifier &mdash; report, do not block</div>
        <ol class="ofp-steps ofp-steps--4">
          <li v-for="(s, i) in creditorFlow" :key="s.title" class="ofp-step">
            <div class="ofp-step__num">{{ i + 1 }}</div>
            <div class="ofp-step__title">{{ s.title }}</div>
            <p v-html="s.text" />
          </li>
        </ol>

        <div class="ofp-flow-label">Debtor identifier under a long-lived consent &mdash; check</div>
        <ol class="ofp-steps ofp-steps--4">
          <li v-for="(s, i) in debtorFlow" :key="s.title" class="ofp-step">
            <div class="ofp-step__num">{{ i + 1 }}</div>
            <div class="ofp-step__title">{{ s.title }}</div>
            <p v-html="s.text" />
          </li>
        </ol>

        <div class="ofp-callout">
          <div class="ofp-callout__title">Why the two differ</div>
          <div class="ofp-callout__text">
            Real-world circumstances are too varied to encode as conditional rules for when a TPP holds the
            creditor&rsquo;s identifier, and the LFI does not know the TPP&rsquo;s data holdings. This applies in
            testing and in live production. The Debtor&rsquo;s identifier has no such uncertainty: under a
            long-lived consent the TPP MUST capture it, so its absence is a failure the LFI can act on.
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         06 · V2.1 POSITION, AND WHAT V2.2 CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; The V2.1 position</div>
          <h2 class="ofp-band__title">One scenario changes in V2.2</h2>
          <p class="ofp-band__lede">
            Apply the V2.1 mandate narrowly, and do not validate what the specification cannot reliably
            support. This proposal changes only the payment under a long-lived consent.
          </p>
        </div>

        <div class="ofp-table-wrap ofp-table-wrap--wide">
          <table class="ofp-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Identity of</th>
                <th>Where it is supplied (V2.1)</th>
                <th>LFI stance (V2.1)</th>
                <th>V2.2, with this proposal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in scenarios" :key="row.scenario" :class="{ 'is-changed': row.changed }">
                <th v-html="row.scenario" />
                <td>{{ row.subject }}</td>
                <td v-html="row.where" />
                <td v-html="row.stance" />
                <td v-html="row.v22" />
              </tr>
            </tbody>
          </table>
        </div>

        <div class="ofp-callout">
          <div class="ofp-callout__title">Practical preference</div>
          <div class="ofp-callout__text">
            Do not begin strict <code>login_hint</code> enforcement. Adoption is low, the specification says a
            request should not be rejected for its absence, and it is not available when a payment is made, so
            it adds little fraud-control value at the point the API is used.
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         07 · RECOMMENDATION (V2.2)
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 &middot; Recommendation for V2.2</div>
          <h2 class="ofp-band__title">Carry it in the <code>Risk</code> block, on the same <code>POST /payments</code></h2>
          <p class="ofp-band__lede">
            Use the fields V2.2 already adds. The TPP sends the Debtor&rsquo;s identifier on every payment under a
            long-lived consent, and the LFI may reject a payment that lacks it or carries one that does not
            match.
          </p>
        </div>

        <div class="ofp-prose">
          <div class="ofp-qa">
            <div class="ofp-qa__label">The V2.2 design questions, and this proposal&rsquo;s answers</div>
            <div v-for="(item, i) in designQuestions" :key="i" class="ofp-qa__item">
              <div class="ofp-qa__q"><span class="ofp-qa__n">{{ String(i + 1).padStart(2, '0') }}</span>{{ item.q }}</div>
              <p class="ofp-qa__a" v-html="item.a" />
            </div>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The fields.</strong> <code>Risk.DebtorIndicators.EmiratesId</code> is an optional string
                matching <code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code>: the 15 digits of the Emirates ID, with
                or without hyphens. <code>Risk.DebtorIndicators.TradeLicenceNumber</code> is an optional string
                with no pattern, as the format varies by issuing authority. Both are defined on the consent-time
                <code>Risk</code> sent to <code>POST /par</code> and on the payment-time <code>Risk</code> sent to
                <code>POST /payments</code>.
              </li>
              <li>
                <strong>TPPs populate what they hold.</strong> The TPP MUST populate every <code>Risk</code> field
                that is known or derivable from its system, for the debtor, the transaction and the creditor. A
                TPP that holds the Debtor&rsquo;s identifier therefore sends it wherever <code>Risk</code> is sent.
              </li>
              <li>
                <strong>Long-lived consents.</strong> Under a long-lived consent, the TPP MUST capture the
                identifier that applies to the User and MUST send it on <strong>every</strong>
                <RouterLink :to="`${TPP_SI}/open-api/payments`"><code>POST /payments</code></RouterLink>
                under that consent, not only the first. For a Retail User, this is the User&rsquo;s Emirates ID, in
                <code>EmiratesId</code>. For an SME or Corporate User, it is the Trade Licence number of the
                business on whose behalf the User is initiating the payment, in <code>TradeLicenceNumber</code>.
              </li>
              <li>
                <strong>The LFI MAY enforce it at <code>POST /payments</code>.</strong> When its Ozone Connect
                <RouterLink :to="`${LFI_SI}/open-api/payments`"><code>POST /payments</code></RouterLink>
                endpoint receives a payment under a long-lived consent, the LFI MAY compare the identifier with
                what it holds for the customer identified by <code>o3-psu-identifier</code>: for a Retail customer,
                <code>EmiratesId</code> with the customer&rsquo;s Emirates ID, ignoring hyphens; for an SME or
                Corporate customer, <code>TradeLicenceNumber</code> with the business&rsquo;s Trade Licence
                number, using only letters and digits and ignoring case. If the value is absent or does not
                match, the LFI MAY reject the payment with <code>400</code> and
                <code>Consent.BusinessRuleViolation</code>. It checks only the field for the customer&rsquo;s type.
              </li>
              <li>
                <strong>Out of scope.</strong> Single Instant Payment consents; transactional-data requests; and
                the creditor&rsquo;s identifier, which stays optional &mdash; sent if held, reported rather than
                blocked when missing.
              </li>
            </ul>
          </div>

          <p>
            The identifier arrives on the <code>POST /payments</code> request itself, so the LFI compares it with
            what it holds for its customer. The API orchestration does not change: the LFI already calls the
            Consent Manager
            <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/consent-manager/open-api/consents-consentId"><code>GET /consents/{consentId}</code></RouterLink>
            for payment requests, or stores the consent locally.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">The payment-time PII for each type of customer, and a rejection</div>
            <pre class="ofp-code__pre">{{ payloadExample }}</pre>
          </div>

          <div class="ofp-table-wrap ofp-table-wrap--wide">
            <table class="ofp-table">
              <thead>
                <tr><th>Rejected when</th><th><code>errorMessage</code> (<code>400 Consent.BusinessRuleViolation</code>)</th></tr>
              </thead>
              <tbody>
                <tr v-for="r in rejections" :key="r.message">
                  <th v-html="r.condition" />
                  <td><code class="ofp-wrap">{{ r.message }}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ofp-callout">
            <div class="ofp-callout__title">How the TPP sends it, and how the LFI checks it</div>
            <div class="ofp-callout__text">
              The Knowledge Base article
              <RouterLink :to="KB_ARTICLE">Emirates ID and Trade Licence Number on Long-Lived Payments</RouterLink>
              sets out what the TPP sends for each type of customer, the LFI&rsquo;s check step by step with sample
              code in Node.js and Python, and the four error responses.
            </div>
          </div>

          <div class="ofp-callout">
            <div class="ofp-callout__title">Read alongside <code>ReadPartyIdentity</code></div>
            <div class="ofp-callout__text">
              TPPs should read this proposal alongside the V2.2 change to the permission model, which adds
              <code>ReadPartyIdentity</code> to Bank Data Sharing and Bank Service Initiation consents
              (<RouterLink to="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-20">v2.1 &rarr; v2.2 changelog, &sect;20</RouterLink>).
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         08 · TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 08 &middot; Technical changes</div>
          <h2 class="ofp-band__title">What changes</h2>
          <p class="ofp-band__lede">
            The specification stays the same: no endpoint is added or removed, and the identifier travels on the
            existing <code>POST /payments</code>. The fields and the TPP requirement are already in V2.2. The new
            part is the LFI&rsquo;s permission to enforce.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards &mdash; <code>uae-authorization-endpoints-openapi.yaml</code>, <code>uae-bank-initiation-openapi.yaml</code></div>
            <p>
              <code>DebtorIndicators.EmiratesId</code> and <code>DebtorIndicators.TradeLicenceNumber</code> on the
              consent-time and payment-time <code>Risk</code>. <strong>Already in V2.2.</strong>
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; API Hub Consent Manager &mdash; <code>uae-api-hub-consent-manager-openapi.yaml</code></div>
            <p>
              Both fields in both <code>DebtorIndicators</code> schemas; <code>TradeLicenceNumber</code> from
              v2.2.5. <strong>Already in V2.2.</strong>
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; Ozone Connect &mdash; <code>uae-ozone-connect-bank-service-initiation-openapi.yaml</code></div>
            <p>
              Both fields on <code>AEDebtorIndicators</code>, which the LFI&rsquo;s Ozone Connect
              <code>POST /payments</code> endpoint receives, and on the corresponding schemas in the CAAP
              Operations and Consent Events and Actions descriptions. <code>TradeLicenceNumber</code> is in v2.2.7
              of Bank Service Initiation, v2.2.6 of CAAP Operations and v2.2.4 of Consent Events and Actions.
              <strong>Already in V2.2.</strong>
            </p>
            <p>
              <code>AEDebtorIndicators</code> does not allow additional properties, so an LFI that validates
              against an earlier v2.2 release rejects a payment that carries <code>TradeLicenceNumber</code> until
              it updates to v2.2.7.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; TPP requirements</div>
            <p>
              <code>EmiratesId</code> required for a Retail User, and <code>TradeLicenceNumber</code> for an SME or
              Corporate User, on every <code>POST /payments</code>, in the Payment Initiation requirements of each
              of the seven long-lived payment types. <strong>Already in V2.2.</strong>
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">05 &middot; LFI requirements &mdash; new</div>
            <p>
              Add the check as a MAY, with its four error responses, to the LFI requirements and API guides of
              the seven long-lived payment types. Today it is described only in the Knowledge Base article
              <RouterLink :to="KB_ARTICLE">Emirates ID and Trade Licence Number on Long-Lived Payments</RouterLink>.
            </p>
          </div>
        </div>

        <div class="ofp-code">
          <div class="ofp-code__label">The V2.2 definition</div>
          <pre class="ofp-code__pre">{{ schemaExample }}</pre>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         09 · QUESTIONS ATTACHED TO THIS VOTE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 09 &middot; Questions</div>
          <h2 class="ofp-band__title">One question, asked with the vote</h2>
          <p class="ofp-band__lede">
            It appears as an optional box when you confirm your vote.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-changes">
            <div v-for="(item, i) in questions" :key="i" class="ofp-change">
              <div class="ofp-change__label">{{ String(i + 1).padStart(2, '0') }} &middot; {{ item.who }}</div>
              <p><strong>{{ item.q }}</strong></p>
              <p>{{ item.why }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         10 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 10 &middot; Pros</div>
          <h2 class="ofp-band__title">What it gives</h2>
        </div>
        <ul class="ofp-pros">
          <li v-for="(p, i) in pros" :key="i" class="ofp-pros__item">
            <span class="ofp-pros__glyph">&check;</span>
            <span>{{ p }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         11 · CONS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 11 &middot; Cons</div>
          <h2 class="ofp-band__title">What it costs</h2>
        </div>
        <ul class="ofp-cons">
          <li v-for="(c, i) in cons" :key="i" class="ofp-cons__item">
            <span class="ofp-cons__glyph">&times;</span>
            <span>{{ c }}</span>
          </li>
        </ul>
      </div>
    </section>
      </template>
    </PvProposalTabs>

  </div>
</template>
<style scoped>
.ofp {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ofp-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ofp-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 2.75rem 2rem 3rem;
}

.ofp__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute-2);
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.15s ease;
}

.ofp__back:hover { color: var(--at-navy-deep); }
.ofp__back-arrow { transition: transform 0.15s ease; }
.ofp__back:hover .ofp__back-arrow { transform: translateX(-3px); }

.ofp__meta-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.ofp__id {
  font-family: var(--at-mono);
  font-size: 12px;
  color: var(--at-navy);
  font-weight: 600;
  letter-spacing: 0.06em;
}

.ofp__divider { width: 1px; height: 14px; background: var(--at-grid-line); }

.ofp__tag {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 4px 9px;
  border: 1px solid var(--at-grid-line);
}

.ofp__tag--priority { color: var(--at-gold); }

.ofp__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.04;
  margin: 0;
  color: var(--at-navy-deep);
  max-width: 880px;
  text-wrap: balance;
}

.ofp__summary {
  font-size: 19px;
  line-height: 1.55;
  color: var(--at-navy);
  opacity: 0.8;
  max-width: 740px;
  margin: 22px 0 0;
}

.ofp__summary code {
  font-family: var(--at-mono);
  font-size: 0.84em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

.ofp__summary a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ofp__summary a:hover { color: var(--at-navy-deep); }

.ofp__strip {
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
  margin-top: 30px;
  padding-top: 22px;
  border-top: 1px solid var(--at-grid-line);
}

.ofp__strip-key {
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.5;
  margin-bottom: 5px;
}

.ofp__strip-val { font-size: 14px; color: var(--at-navy-deep); font-weight: 500; }

/* ─── Bands ─────────────────────────────────────────────────────────────── */
.ofp-band { padding: 3.5rem 0 4rem; border-top: 1px solid var(--at-grid-line); }
.ofp-band--white { background: var(--at-surface); }
.ofp-band--cream { background: var(--at-bg-cream); }

/* "The proposal" marker centred on the colour-change seam at the top of the
   proposal section. It straddles the band's top border (the white→cream line). */
.ofp-band--seam { position: relative; }

.ofp-seam-label {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--at-navy-deep);
  color: #fff;
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 7px 18px;
  white-space: nowrap;
  z-index: 4;
}

.ofp-band__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ofp-band__head { max-width: 52rem; margin-bottom: 2rem; }

.ofp-band__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ofp-band__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ofp-band__title {
  font-family: var(--at-serif);
  font-size: clamp(1.9rem, 3.6vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.06;
  margin: 0;
  color: var(--at-navy-deep);
}

/* Inline code inside a serif heading — keep it monospaced but sized to the
   heading rather than boxed like body code. */
.ofp-band__title code {
  font-family: var(--at-mono);
  font-size: 0.78em;
  letter-spacing: -0.01em;
}

.ofp-band__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ofp-band__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

.ofp-band__lede a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ─── Callout (Agreed in OFP-001, in Background) ────────────────────────── */
.ofp-callout {
  margin-top: 1.75rem;
  max-width: 52rem;
  border-left: 4px solid var(--at-teal);
  background: rgba(0, 194, 169, 0.06);
  padding: 20px 24px;
}

.ofp-callout__title {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  margin-bottom: 9px;
}

.ofp-callout__text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--at-navy-deep);
  opacity: 0.92;
}

/* ─── Reference chips (links to OFP-001 and its schemas) ─────────────────── */
.ofp-ref {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.ofp-ref__label {
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.5;
}

.ofp-ref__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--at-navy-deep);
  padding: 8px 14px;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.ofp-ref__chip:hover {
  border-color: var(--at-teal);
  background: var(--at-bg-cream);
}

.ofp-ref__square { width: 6px; height: 6px; background: var(--at-teal); flex-shrink: 0; }

/* ─── Prose ─────────────────────────────────────────────────────────────── */
.ofp-prose { max-width: 52rem; }

.ofp-prose p {
  font-size: 16.5px;
  line-height: 1.72;
  color: var(--at-navy);
  margin: 0 0 20px;
  text-wrap: pretty;
}

.ofp-prose p:last-child { margin-bottom: 0; }
.ofp-prose strong { color: var(--at-navy-deep); font-weight: 600; }
.ofp-prose em { font-style: italic; }

.ofp-prose a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ofp-prose a:hover { color: var(--at-navy-deep); }

.ofp-prose code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

/* ─── Tables (current and proposed formats) ─────────────────────────────── */
.ofp-table-wrap {
  overflow-x: auto;
  margin: 0 0 24px;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ofp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--at-navy);
}

.ofp-table th,
.ofp-table td {
  text-align: left;
  vertical-align: top;
  padding: 10px 14px;
  border-bottom: 1px solid var(--at-grid-line);
}

.ofp-table thead th {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  background: var(--at-bg-cream);
}

.ofp-table tbody th { font-weight: 600; color: var(--at-navy-deep); white-space: nowrap; }
.ofp-table tbody tr:last-child th,
.ofp-table tbody tr:last-child td { border-bottom: none; }

.ofp-table code { white-space: nowrap; }

/* ─── Technical changes ─────────────────────────────────────────────────── */
.ofp-changes {
  max-width: 52rem;
  margin: 0 0 2.25rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-teal);
  background: var(--at-surface);
}

.ofp-change {
  padding: 20px 24px;
  border-bottom: 1px solid var(--at-grid-line);
}

.ofp-change:last-child { border-bottom: none; }

.ofp-change__label {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--at-teal);
  margin-bottom: 10px;
}

.ofp-change p {
  font-size: 15.5px;
  line-height: 1.68;
  color: var(--at-navy);
  margin: 0;
  text-wrap: pretty;
}

.ofp-change p + p { margin-top: 12px; }

.ofp-change strong { color: var(--at-navy-deep); font-weight: 600; }
.ofp-change em { font-style: italic; }

.ofp-change code {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

.ofp-change a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Inline code inside the mono label is unboxed (overrides .ofp-change code). */
.ofp-change__label code {
  font-size: 0.92em;
  color: var(--at-teal);
  background: none;
  border: none;
  padding: 0;
}

/* ─── Code blocks ───────────────────────────────────────────────────────── */
.ofp-code { margin: 0 0 20px; border: 1px solid var(--at-grid-line); }
.ofp-code:last-child { margin-bottom: 0; }

.ofp-code__label {
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  padding: 10px 16px;
  border-bottom: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.ofp-code__pre {
  margin: 0;
  padding: 18px 20px;
  overflow-x: auto;
  background: var(--at-inverse-bg);
  font-family: var(--at-mono);
  font-size: 13px;
  line-height: 1.65;
  color: #d7e4f5;
  white-space: pre;
}

/* ─── Rules recap (proposed rules, in Scope and behaviour) ───────────────── */
.ofp-rules {
  max-width: 52rem;
  margin: 0 0 24px;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-teal);
  background: var(--at-surface);
  padding: 20px 24px;
}

.ofp-rules__label {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--at-teal);
  margin-bottom: 12px;
}

.ofp-rules__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ofp-rules__list li {
  position: relative;
  padding-left: 1.2rem;
  font-size: 15.5px;
  line-height: 1.68;
  color: var(--at-navy);
  margin-bottom: 10px;
}

.ofp-rules__list li:last-child { margin-bottom: 0; }

.ofp-rules__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 7px;
  height: 7px;
  background: var(--at-teal);
}

.ofp-rules__list strong { color: var(--at-navy-deep); font-weight: 600; }

.ofp-rules__list code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

.ofp-rules__list a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ─── Pros ──────────────────────────────────────────────────────────────── */
.ofp-pros {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 28px;
  max-width: 60rem;
}

.ofp-pros__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15.5px;
  line-height: 1.55;
  color: var(--at-navy);
}

.ofp-pros__glyph {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 194, 169, 0.14);
  color: var(--at-teal-deep, #008b78);
  font-size: 13px;
  font-weight: 700;
  margin-top: 1px;
}

/* ─── Cons (same layout as pros, red crosses) ───────────────────────────── */
.ofp-cons {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 28px;
  max-width: 60rem;
}

.ofp-cons__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15.5px;
  line-height: 1.55;
  color: var(--at-navy);
}

.ofp-cons__glyph {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(166, 57, 31, 0.12);
  color: #a6391f;
  font-size: 13px;
  font-weight: 700;
  margin-top: 1px;
}

/* ─── Position cards (01) and Risk block columns (04) ───────────────────── */
.ofp-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  max-width: 64rem;
}

.ofp-card {
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-teal);
  background: var(--at-surface);
  padding: 20px 22px;
}

.ofp-band--white .ofp-card,
.ofp-band--white .ofp-step,
.ofp-band--white .ofp-compare__col { background: var(--at-bg-cream); }

.ofp-card__num {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--at-teal);
  margin-bottom: 8px;
}

.ofp-card__title {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.25;
  color: var(--at-navy-deep);
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
}

.ofp-card p,
.ofp-step p,
.ofp-compare__col p {
  font-size: 15px;
  line-height: 1.62;
  color: var(--at-navy);
  margin: 0;
  text-wrap: pretty;
}

.ofp-card p + p,
.ofp-compare__col p + p { margin-top: 10px; }

/* ─── Badges (scope and field status) ───────────────────────────────────── */
.ofp-badge {
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 3px 8px;
  white-space: nowrap;
}

.ofp-badge--in { background: rgba(0, 194, 169, 0.14); color: var(--at-teal-deep, #008b78); }
.ofp-badge--new { background: rgba(0, 194, 169, 0.14); color: var(--at-teal-deep, #008b78); }
.ofp-badge--held { background: color-mix(in srgb, var(--at-gold) 16%, transparent); color: var(--at-gold); }
.ofp-badge--out { background: rgba(166, 57, 31, 0.12); color: #a6391f; }
.ofp-badge--neutral { background: var(--at-bg-paper); color: var(--at-mute-2); border: 1px solid var(--at-grid-line); }

/* ─── Numbered steps (02, 05) ───────────────────────────────────────────── */
.ofp-flow-label {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--at-teal);
  margin: 0 0 12px;
}

.ofp-steps {
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
  display: grid;
  gap: 16px;
  max-width: 64rem;
}

.ofp-steps--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.ofp-steps--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

.ofp-step {
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  padding: 18px 20px;
}

.ofp-step__num {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--at-teal);
  color: var(--at-teal);
  font-family: var(--at-mono);
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
}

.ofp-step__title {
  font-weight: 600;
  font-size: 15.5px;
  color: var(--at-navy-deep);
  margin-bottom: 6px;
}

/* ─── Two-column comparison (02, 03) ────────────────────────────────────── */
.ofp-compare {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  max-width: 64rem;
  margin: 0 0 2rem;
}

.ofp-compare__col {
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  padding: 20px 22px;
}

.ofp-compare__head {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
}

.ofp-compare__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ofp-compare__list li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 15px;
  line-height: 1.6;
  color: var(--at-navy);
  margin-bottom: 8px;
}

.ofp-compare__list li:last-child { margin-bottom: 0; }

.ofp-compare__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 6px;
  height: 6px;
  background: var(--at-navy);
  opacity: 0.5;
}

/* Inline code in the new blocks, matching the prose treatment. Steps, table
   cells and answers are rendered with v-html, which scoped styles do not reach
   without :deep(). */
.ofp-card code,
.ofp-step :deep(code),
.ofp-compare code,
.ofp-qa :deep(code),
.ofp-table td :deep(code),
.ofp-table th :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

.ofp-card__title code { font-size: 0.8em; }

/* Long schema paths (CreditorIndicators.AdditionalAccountHolderIdentifiers)
   must break inside narrow cards and table cells rather than widen them. */
.ofp-card p code,
.ofp-step :deep(code),
.ofp-compare__list code,
.ofp-qa__a :deep(code) { overflow-wrap: anywhere; }

.ofp-table :deep(strong),
.ofp-qa__a :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

.ofp-card a,
.ofp-step a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ─── V2.1 position table (06) ──────────────────────────────────────────── */
.ofp-table-wrap--wide { max-width: 72rem; }
.ofp-table-wrap--wide .ofp-table tbody th { white-space: normal; min-width: 11rem; }
.ofp-table tr.is-changed th,
.ofp-table tr.is-changed td { background: rgba(0, 194, 169, 0.07); }
.ofp-table code.ofp-wrap { white-space: normal; word-break: break-word; }
.ofp-table-wrap--wide .ofp-table td :deep(code) { white-space: normal; overflow-wrap: anywhere; }
.ofp-table thead :deep(code) {
  text-transform: none;
  letter-spacing: 0;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
}

/* ─── Design questions and answers (07) ─────────────────────────────────── */
.ofp-qa {
  max-width: 52rem;
  margin: 0 0 24px;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-teal);
  background: var(--at-surface);
}

.ofp-qa__label {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--at-teal);
  padding: 18px 24px 0;
}

.ofp-qa__item {
  padding: 16px 24px;
  border-bottom: 1px solid var(--at-grid-line);
}

.ofp-qa__item:last-child { border-bottom: none; }

.ofp-qa__q {
  font-weight: 600;
  font-size: 15.5px;
  line-height: 1.5;
  color: var(--at-navy-deep);
  margin-bottom: 6px;
}

.ofp-qa__n {
  font-family: var(--at-mono);
  font-size: 11px;
  color: var(--at-teal);
  margin-right: 10px;
}

.ofp-prose .ofp-qa__a,
.ofp-qa__a {
  font-size: 15px;
  line-height: 1.62;
  color: var(--at-navy);
  margin: 0;
}

/* ─── Vote cover (shown when voting is not open) ─────────────────────────── */
/* The panel still renders underneath, frosted and non-interactive, so the
   section reads as "covered up" rather than missing. */
.ofp-vote-wrap { position: relative; }

.ofp-vote-cover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 2;
}

.ofp-vote-cover__card {
  position: relative;
  z-index: 3;
  text-align: center;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-navy-deep);
  padding: 26px 34px;
  max-width: 28rem;
  box-shadow: 0 10px 30px rgba(0, 39, 127, 0.12);
}

.ofp-vote-cover__label {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  margin-bottom: 10px;
}

.ofp-vote-cover__msg {
  font-family: var(--at-serif);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--at-navy-deep);
}

/* ─── Vote error ────────────────────────────────────────────────────────── */
.ofp-vote-error {
  margin: 16px 0 0;
  padding: 12px 16px;
  background: rgba(166, 57, 31, 0.08);
  border-left: 3px solid #a6391f;
  color: #a6391f;
  font-size: 13.5px;
  font-weight: 500;
}

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 1100px) {
  .ofp-steps--4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 920px) {
  .ofp-hero__inner { padding: 2rem 1.25rem 2.25rem; }
  .ofp-band { padding: 2.5rem 0 3rem; }
  .ofp-band__inner { padding: 0 1.25rem; }
  .ofp-pros { grid-template-columns: 1fr; }
  .ofp-cons { grid-template-columns: 1fr; }
  .ofp-cards,
  .ofp-steps--3,
  .ofp-steps--4,
  .ofp-compare { grid-template-columns: 1fr; }
}

/* ─── Inline code and links in the callout and eyebrow (OFP-022) ────────── */
.ofp-callout__title code {
  font-size: 0.95em;
  text-transform: none;
  letter-spacing: 0;
}

.ofp-callout__text code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

.ofp-callout__text a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ofp-callout__text a:hover { color: var(--at-navy-deep); }

.ofp-band__eyebrow code {
  font-family: var(--at-mono);
  text-transform: none;
  letter-spacing: 0.02em;
}

.ofp-rules__label code {
  font-size: 0.95em;
}

.ofp-table a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ofp-table a:hover { color: var(--at-navy-deep); }
</style>
