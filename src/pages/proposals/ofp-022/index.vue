<route lang="yaml">
meta:
  title: 'OFP-022 · Send the Debtor’s Emirates ID or Trade Licence Number on any payment above AED 50,000, tied to a multi-payment consent'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-022. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections: a
// short Background, one section for each of the proposal's four points —
// login_hint, the Risk block fields, payments above AED 50,000 tied to a
// multi-payment consent, and Data Sharing — then Technical changes, Questions,
// Pros and Cons.
//
// Scope is the Debtor identifier that V2.2 already adds to Risk.DebtorIndicators
// (v2.1 → v2.2 changelog §21): EmiratesId for a Retail User, TradeLicenceNumber
// for the business of an SME or Corporate User.
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
const OG_TITLE = 'OFP-022 · Send the Debtor’s Emirates ID or Trade Licence Number on any payment above AED 50,000, tied to a multi-payment consent'
const OG_DESCRIPTION =
  'The TPP MUST send the Debtor’s Emirates ID (Retail) or Trade Licence number (SME and Corporate) in the V2.2 Risk block on any payment above AED 50,000, tied to a multi-payment consent, and the LFI may reject the payment when it is missing or does not match. It is not required in login_hint, which stays optional as OpenID Connect and FAPI define it, or for Data Sharing.'
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
  opened: '24 Nov 2026',
  closes: '30 Dec 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

const LFI_SI = '/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation'
const TPP_SI = '/tech/tpp-standards/v2.2-rc2/banking/service-initiation'
const TPP_DS = '/tech/tpp-standards/v2.2-rc2/banking/data-sharing'
const KB_ARTICLE = '/knowledge-base/articles/emirates-id-trade-licence-long-lived-payments'
const KB_LOGIN_HINT = '/knowledge-base/articles/login-hint-emirates-id'
const CHANGE_21 = '/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-21'

// The V2.2 OpenAPI documents that define the two Risk fields, as served from
// public/openapi/ (fetched from api-specs at build time).
const SPECS = [
  {
    surface: 'Standards',
    file: 'uae-authorization-endpoints-openapi.yaml',
    href: '/openapi/v2.2-rc2/standards/uae-authorization-endpoints-openapi.yaml',
    schema: 'The consent-time <code>Risk.DebtorIndicators</code>, at <code>POST /par</code>',
  },
  {
    surface: 'Standards',
    file: 'uae-bank-initiation-openapi.yaml',
    href: '/openapi/v2.2-rc2/standards/uae-bank-initiation-openapi.yaml',
    schema: 'The payment-time <code>Risk.DebtorIndicators</code>, in the payment PII, at <code>POST /payments</code>',
  },
  {
    surface: 'API Hub',
    file: 'uae-api-hub-consent-manager-openapi.yaml',
    href: '/openapi/v2.2-rc2/api-hub/uae-api-hub-consent-manager-openapi.yaml',
    schema: 'Both <code>DebtorIndicators</code> schemas',
  },
  {
    surface: 'Ozone Connect',
    file: 'uae-ozone-connect-bank-service-initiation-openapi.yaml',
    href: '/openapi/v2.2-rc2/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml',
    schema: '<code>AEDebtorIndicators</code>, received by the LFI&rsquo;s <code>POST /payments</code>; <code>TradeLicenceNumber</code> from v2.2.7',
  },
]

// The seven multi-payment consent types — every payment consent other than
// Single Instant Payment. Each links to its TPP requirements page.
const multiPaymentTypes = [
  { name: 'Fixed Defined Schedule', slug: 'fixed-defined-schedule' },
  { name: 'Fixed On Demand', slug: 'fixed-on-demand' },
  { name: 'Fixed Periodic Schedule', slug: 'fixed-periodic-schedule' },
  { name: 'Variable Defined Schedule', slug: 'variable-defined-schedule' },
  { name: 'Variable On Demand', slug: 'variable-on-demand' },
  { name: 'Variable Periodic Schedule', slug: 'variable-periodic-schedule' },
  { name: 'Delegated SCA', slug: 'delegated-sca' },
]

// 01 · Where the Debtor's identifier is required, with this proposal. Strings
// are static and authored here, so they are rendered with v-html.
const atAGlance = [
  {
    where: '<code>login_hint</code>, for any consent',
    tpp: 'Not required. MAY send it.',
    lfi: 'MUST NOT reject because it is absent.',
    required: false,
  },
  {
    where: 'Any payment above AED 50,000, tied to a multi-payment consent',
    tpp: '<strong>MUST send it</strong> in <code>Risk.DebtorIndicators</code>.',
    lfi: 'MAY reject when it is absent or does not match.',
    required: true,
  },
  {
    where: 'A payment of AED 50,000 or less, tied to a multi-payment consent',
    tpp: 'Not required. MAY send it.',
    lfi: 'MUST NOT reject because it is absent.',
    required: false,
  },
  {
    where: 'Single Instant Payment',
    tpp: 'Not required. MAY send it.',
    lfi: 'MUST NOT reject because it is absent.',
    required: false,
  },
  {
    where: 'Data Sharing, including transactional data',
    tpp: 'Not required.',
    lfi: 'MUST NOT reject because it is absent.',
    required: false,
  },
]

// 04 · The four rejections the LFI may return for a payment above the threshold.
const rejections = [
  { condition: 'Retail: <code>EmiratesId</code> is absent', message: 'Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID is required for a payment above AED 50,000 tied to a multi-payment consent' },
  { condition: 'Retail: <code>EmiratesId</code> does not match the PSU', message: 'Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID does not match the PSU ID' },
  { condition: 'SME or Corporate: <code>TradeLicenceNumber</code> is absent', message: 'Validation failed for AEPaymentPII: risk.debtorIndicators.tradeLicenceNumber is required for a payment above AED 50,000 tied to a multi-payment consent' },
  { condition: 'SME or Corporate: <code>TradeLicenceNumber</code> does not match the business', message: 'Validation failed for AEPaymentPII: risk.debtorIndicators.tradeLicenceNumber does not match the business Trade Licence' },
]

// The questions asked alongside the vote. These are ALSO held in the proposals
// API (the `questions` column) — that is where the vote form reads them from,
// and where the answers are stored. Kept here so they are readable on the page
// before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'Enforcement',
    q: 'Should the LFI check stay permitted but optional, as proposed, or should every LFI be required to reject a payment above AED 50,000, tied to a multi-payment consent, when the Emirates ID or Trade Licence number is missing or does not match?',
    why: 'An optional check lets each LFI adopt it when it is ready, but a TPP then sees a missing identifier rejected by one LFI and accepted by another.',
  },
]

const pros = [
  'It aligns with OpenID Connect and FAPI: login_hint stays optional, and no authorization request is rejected for lacking it.',
  'The check sits on the payment itself, where the LFI can compare the identifier, not in a hint delivered once during authorization.',
  'It concentrates the check on high-value payments, and asks TPPs for less personal data everywhere else.',
  'Both fields are already in the V2.2 specifications. No endpoint, header or consent field is added.',
  'The identifier travels inside the encrypted PII, so the API Hub never holds it.',
  'Each LFI decides when to enforce, so an LFI that is not ready keeps accepting payments as it does today.',
]

const cons = [
  'Payments of AED 50,000 or less need not carry the identifier, and a larger sum split into smaller payments is never checked.',
  'It drops the V2.1 login_hint expectation, agreed with the UBF group as a fraud control, though it was rarely implemented.',
  'Under a variable consent the TPP may not know whether a payment above AED 50,000 will come, so it may have to collect the identifier anyway.',
  'Enforcement is optional, so the same payment can be rejected by one LFI and accepted by another.',
  'A wrong value in the TPP’s or the LFI’s records fails every payment above the threshold until corrected, and TradeLicenceNumber has no pattern, so the LFI must normalise both values before comparing them.',
  'The API Hub cannot enforce the rule, as the field sits inside encrypted PII, and V2.1 endpoints cannot carry it.',
]

// The V2.2 definition, as published — rendered in the Point 2 section.
const schemaExample = `# Standards - uae-authorization-endpoints-openapi.yaml (consent-time Risk, POST /par)
# Standards - uae-bank-initiation-openapi.yaml       (payment-time Risk, POST /payments)
DebtorIndicators:
  EmiratesId:
    type: string
    pattern: ^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$
    description: The Emirates ID number of the User initiating the Payment, where the User
      is a Retail customer. ...
  TradeLicenceNumber:
    type: string
    description: The Trade Licence number of the business on whose behalf the User is
      initiating the Payment, where the User is an SME or Corporate customer. ...`

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
  title: 'Send the Debtor’s Emirates ID or Trade Licence Number on any payment above AED 50,000, tied to a multi-payment consent',
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

        <h1 class="ofp__title">Send the Debtor&rsquo;s Emirates ID or Trade Licence Number on any payment above AED 50,000, tied to a multi-payment consent</h1>
        <p class="ofp__summary">
          The TPP <strong>MUST</strong> send the Debtor&rsquo;s <strong>Emirates ID</strong> (Retail) or
          <strong>Trade Licence number</strong> (SME and Corporate) in the V2.2 <code>Risk</code> block on
          <strong>any payment above AED 50,000, tied to a multi-payment consent</strong>, and the LFI
          <strong>may reject</strong> the payment when it is missing or does not match. It is <strong>not
          required</strong> in <code>login_hint</code>, which stays optional as OpenID Connect and FAPI define it,
          or for Data Sharing.
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
            set out in section 07 below. It asks whether the LFI check should stay optional.
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
         01 · BACKGROUND
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream ofp-band--seam">
      <span class="ofp-seam-label">The proposal</span>
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 &middot; Background</div>
          <h2 class="ofp-band__title">Where the Debtor&rsquo;s identity is required</h2>
          <p class="ofp-band__lede">
            V2.1 asks for the Debtor&rsquo;s Emirates ID in <code>login_hint</code>, an optional hint that TPPs
            rarely send and LFIs rarely check. The current V2.2 requirements ask for it on every payment under a
            long-lived consent. This proposal replaces both.
          </p>
        </div>

        <div class="ofp-table-wrap ofp-table-wrap--wide">
          <table class="ofp-table">
            <thead>
              <tr><th>Where</th><th>TPP</th><th>LFI</th></tr>
            </thead>
            <tbody>
              <tr v-for="row in atAGlance" :key="row.where" :class="{ 'is-changed': row.required }">
                <th v-html="row.where" />
                <td v-html="row.tpp" />
                <td v-html="row.lfi" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         02 · POINT 1 · login_hint
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 &middot; Point 1 &middot; <code>login_hint</code></div>
          <h2 class="ofp-band__title">Not required in <code>login_hint</code></h2>
          <p class="ofp-band__lede">
            OpenID Connect Core defines <code>login_hint</code> as OPTIONAL, and the FAPI 2.0 Security Profile does
            not require it. The UAE
            <a href="/openapi/v2.2-rc2/standards/uae-authorization-endpoints-openapi.yaml">Authorization Endpoints specification</a>
            already says a request should not be rejected if it is not provided. This point keeps the UAE profile
            aligned with both.
          </p>
        </div>

        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The TPP is not required to send <code>login_hint</code></strong>, for any consent. It MAY
                still send the User&rsquo;s Emirates ID or Trade Licence Number in it, encrypted to the LFI.
              </li>
              <li>
                <strong>The LFI MUST NOT reject the request, or fail the journey, because it is absent.</strong>
                Where it is present, the LFI MAY use it to identify the customer before authentication, and MUST
                NOT use it to bypass authentication.
              </li>
              <li>
                <strong>Why it cannot carry the check.</strong> It reaches the LFI once, in the
                <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/headless-heimdall/open-api/auth"><code>GET /auth</code></RouterLink>
                response, and is never stored on the consent, so it is not available when a payment is made. See
                <RouterLink :to="KB_LOGIN_HINT">Emirates ID in login_hint</RouterLink>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · POINT 2 · THE RISK BLOCK
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Point 2 &middot; The <code>Risk</code> block</div>
          <h2 class="ofp-band__title">Already in the V2.2 <code>Risk</code> block</h2>
          <p class="ofp-band__lede">
            V2.2 adds <code>EmiratesId</code> (Retail) and <code>TradeLicenceNumber</code> (SME and Corporate) to
            <RouterLink :to="`${TPP_SI}/personal-identifiable-information/risk`"><code>Risk.DebtorIndicators</code></RouterLink>
            (<RouterLink :to="CHANGE_21">changelog &sect;21</RouterLink>). This proposal uses them as published.
          </p>
        </div>

        <div class="ofp-prose">
          <div class="ofp-table-wrap ofp-table-wrap--wide">
            <table class="ofp-table">
              <thead>
                <tr><th>Specification</th><th>Where the fields are defined</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in SPECS" :key="s.file">
                  <th>{{ s.surface }} &middot; <a :href="s.href"><code>{{ s.file }}</code></a></th>
                  <td v-html="s.schema" />
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ofp-code">
            <div class="ofp-code__label">The V2.2 definition (excerpt)</div>
            <pre class="ofp-code__pre">{{ schemaExample }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · POINT 3 · PAYMENTS ABOVE AED 50,000
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 &middot; Point 3 &middot; Payments above AED 50,000</div>
          <h2 class="ofp-band__title">Required on any payment above AED 50,000, tied to a multi-payment consent</h2>
        </div>

        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The threshold.</strong> The TPP MUST send the identifier on any
                <RouterLink :to="`${TPP_SI}/open-api/payments`"><code>POST /payments</code></RouterLink>
                where <code>Data.Instruction.Amount.Amount</code> is greater than <code>50000.00</code> (always
                AED), tied to a consent of any of the seven multi-payment types:
                <template v-for="(t, i) in multiPaymentTypes" :key="t.slug">
                  <RouterLink :to="`${TPP_SI}/domestic-payments/multi-payments/${t.slug}/requirements`">{{ t.name }}</RouterLink><template v-if="i < multiPaymentTypes.length - 1">, </template>
                </template>.
                Each payment is judged on its own amount, not on the consent&rsquo;s limits. Single Instant
                Payment is out of scope.
              </li>
              <li>
                <strong>Which identifier.</strong> <code>EmiratesId</code> for a Retail User;
                <code>TradeLicenceNumber</code>, of the business on whose behalf the User pays, for an SME or
                Corporate User.
              </li>
              <li>
                <strong>AED 50,000 or less.</strong> Not required, and the TPP MAY send it. This is an exception to
                the rule that the TPP populates every <code>Risk</code> field it holds.
              </li>
              <li>
                <strong>The LFI MAY reject above the threshold.</strong> At its Ozone Connect
                <RouterLink :to="`${LFI_SI}/open-api/payments`"><code>POST /payments</code></RouterLink>
                endpoint, the LFI MAY compare the identifier with what it holds for the customer identified by
                <code>o3-psu-identifier</code> (Emirates ID ignoring hyphens; Trade Licence number on letters and
                digits only, ignoring case), and reject with <code>400 Consent.BusinessRuleViolation</code> when it
                is absent or does not match. At or below the threshold it MUST NOT reject because the identifier is
                absent, and MAY reject a value that is sent and does not match.
              </li>
            </ul>
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
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · POINT 4 · DATA SHARING
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; Point 4 &middot; Data Sharing</div>
          <h2 class="ofp-band__title">Not required for Data Sharing</h2>
          <p class="ofp-band__lede">
            Under a Data Sharing consent, including one for transactional data, the TPP is not required to send
            the Debtor&rsquo;s identifier &mdash; not in <code>login_hint</code> (point 1), and not on any request:
            no Data Sharing request, such as
            <RouterLink :to="`${TPP_DS}/open-api/accounts-AccountId-transactions`"><code>GET /accounts/{AccountId}/transactions</code></RouterLink>,
            has a field for it. The PSU authenticates at the LFI, and the API Hub validates the consent on every
            request. The LFI MUST NOT reject an authorization or a request because the identifier is absent.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         06 · TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; Technical changes</div>
          <h2 class="ofp-band__title">What changes</h2>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Specifications &mdash; no change</div>
            <p>
              The Standards, API Hub Consent Manager and Ozone Connect specifications already carry both fields,
              and <code>login_hint</code> is already optional.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; TPP requirements &mdash; changed</div>
            <p>
              The seven multi-payment requirements pages and the
              <RouterLink :to="`${TPP_SI}/personal-identifiable-information/risk`"><code>Risk</code></RouterLink>
              page move from &ldquo;every <code>POST /payments</code> under a long-lived consent&rdquo; to
              &ldquo;any payment above AED 50,000, tied to a multi-payment consent&rdquo;. The guidance states that
              the identifier is not required in <code>login_hint</code> or for Data Sharing.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; LFI requirements and Knowledge Base &mdash; new and updated</div>
            <p>
              The LFI requirements of the seven multi-payment types gain the check above AED 50,000, its four error
              responses, and the MUST NOT rules. The articles
              <RouterLink :to="KB_ARTICLE">Emirates ID and Trade Licence Number on Long-Lived Payments</RouterLink>
              and <RouterLink :to="KB_LOGIN_HINT">Emirates ID in login_hint</RouterLink> are updated to match.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         07 · QUESTIONS ATTACHED TO THIS VOTE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 &middot; Questions</div>
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
         08 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 08 &middot; Pros</div>
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
         09 · CONS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 09 &middot; Cons</div>
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

/* ─── Inline code in table cells (01, 03, 04) ───────────────────────────── */
/* Cells are rendered with v-html, which scoped styles do not reach without
   :deep(). */
.ofp-table td :deep(code),
.ofp-table th :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

.ofp-table :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Wide tables (01, 03, 04) ──────────────────────────────────────────── */
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
@media (max-width: 920px) {
  .ofp-hero__inner { padding: 2rem 1.25rem 2.25rem; }
  .ofp-band { padding: 2.5rem 0 3rem; }
  .ofp-band__inner { padding: 0 1.25rem; }
  .ofp-pros { grid-template-columns: 1fr; }
  .ofp-cons { grid-template-columns: 1fr; }
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
