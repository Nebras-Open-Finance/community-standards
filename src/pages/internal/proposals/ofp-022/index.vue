<route lang="yaml">
meta:
  layout: internal
  title: 'OFP-022 · Send the Debtor’s Emirates ID to the LFI on long-lived payments'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-022. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Why not login_hint, Recommendation, Technical changes,
// Questions, Pros, and Cons. Follows the OFP-021 layout. Internal
// review only: it sits behind the /internal gate and is marked noindex.
//
// Scope is the Emirates ID that V2.2 already adds to Risk.DebtorIndicators
// (v2.1 → v2.2 changelog §21): it formalises the TPP obligation to send it on
// every POST /payments under a long-lived consent, and permits the LFI to
// enforce it at its Ozone Connect POST /payments endpoint.
import { ref, computed, onMounted, watch, type Component } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'
import PvProposalTabs from '@/components/proposals/PvProposalTabs.vue'

// Per-page link-preview override: a tailored title + description so a shared
// link to this proposal reads as the proposal itself, not the site default.
const OG_TITLE = 'OFP-022 · Send the Debtor’s Emirates ID to the LFI on long-lived payments'
const OG_DESCRIPTION =
  'TPPs must already capture the Debtor’s Emirates ID for long-lived payment consents, but V2.1 gives them no way to pass it to the LFI. This proposal uses the Risk block, as extended in V2.2, so the LFI receives the Emirates ID on every POST /payments under a long-lived consent and may reject a payment when it is missing or does not match.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
    // Unlinked, internal-only page — keep it out of search indexes.
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

const meta = {
  id: 'OFP-022',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '19 Nov 2026',
  closes: '3 Dec 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

const LFI_SI = '/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation'

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

// The questions asked alongside the vote. These are ALSO held in the proposals
// API (the `questions` column) — that is where the vote form reads them from,
// and where the answers are stored. Kept here so they are readable on the page
// before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'Enforcement',
    q: 'Should the LFI check stay permitted but optional, as proposed, or should every LFI be required to reject a payment under a long-lived consent when the Emirates ID is missing or does not match?',
    why: 'An optional check lets each LFI adopt it when it is ready, but a TPP then sees a missing Emirates ID rejected by one LFI and accepted by another.',
  },
]

const pros = [
  'The existing obligation gets a way to reach the LFI. The Emirates ID the TPP must already capture arrives with every payment under a long-lived consent.',
  'The LFI can confirm that each payment is made for the User who authorized the consent, including payments made when the User is not present.',
  'The field is already in the V2.2 specifications: Standards, Consent Manager and Ozone Connect. No endpoint, header or consent field is added.',
  'The API orchestration does not change. The Emirates ID arrives on the POST /payments request, and the LFI already retrieves the consent for every payment request.',
  'The Emirates ID travels inside the encrypted PII. The API Hub passes it through without decrypting it, so it is never held centrally.',
  'It follows the existing rule that a TPP populates every Risk field it knows. It adds no new kind of obligation.',
  'Each LFI decides when to enforce, so an LFI that is not ready keeps accepting payments as it does today.',
]

const cons = [
  'Enforcement is optional, so the same payment can be rejected by one LFI and accepted by another. A TPP has to send the field correctly everywhere to be safe.',
  'A TPP that has not been capturing the Emirates ID must collect it from existing Users before their next payment, or see those payments rejected by LFIs that enforce.',
  'A wrong value in the TPP’s or the LFI’s records fails every payment under the consent until it is corrected.',
  'The API Hub cannot enforce the rule. The field sits inside encrypted PII, so a missing value is caught only by an LFI that checks.',
  'V2.1 has no field for the Emirates ID, so payments made through V2.1 endpoints cannot carry it and cannot be checked.',
  'Payments for business customers are not checked.',
]

// The payment-time PII and the two rejections — rendered in the Recommendation section.
const payloadExample = `# POST /payments - payment-time PII, as decrypted by the LFI (excerpt)
{
  "Initiation": { ... },
  "Risk": {
    "DebtorIndicators": {
      "UserName": { "en": "...", "ar": "..." },
      "EmiratesId": "784-1990-1234567-1",     # required for a retail User under a long-lived consent
      ...
    },
    "TransactionIndicators": { ... },
    "CreditorIndicators": { ... }
  }
}

# LFI rejects the payment - 400, EmiratesId absent
{
  "errorCode": "Consent.BusinessRuleViolation",
  "errorMessage": "Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID is required for a long-lived payment consent"
}

# LFI rejects the payment - 400, EmiratesId does not match the PSU
{
  "errorCode": "Consent.BusinessRuleViolation",
  "errorMessage": "Validation failed for AEPaymentPII: risk.debtorIndicators.emiratesID does not match the PSU ID"
}`

// The V2.2 definition — rendered in the Technical changes section.
const schemaExample = `# Standards - uae-authorization-endpoints-openapi.yaml (consent-time Risk, POST /par)
# Standards - uae-bank-initiation-openapi.yaml       (payment-time Risk, POST /payments)
DebtorIndicators:
  EmiratesId:
    type: string
    pattern: ^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$
    description: The Emirates ID number of the User initiating the Payment. For payments
      made under a long-lived consent, the LFI can use it to confirm that each payment
      is being made for the same User who authorized the consent.

# Ozone Connect - uae-ozone-connect-bank-service-initiation-openapi.yaml
# The same definition on AEDebtorIndicators, received by POST /payments.`

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
  title: 'Send the Debtor’s Emirates ID to the LFI on long-lived payments',
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
        <RouterLink to="/internal/proposals/" class="ofp__back">
          <span class="ofp__back-arrow">&larr;</span> Internal proposals
        </RouterLink>

        <div class="ofp__meta-row">
          <span class="ofp__id">{{ meta.id }}</span>
          <span class="ofp__divider" />
          <PvStatusPill :status="status" />
          <span class="ofp__tag ofp__tag--priority">{{ priorityLabel }}</span>
        </div>

        <h1 class="ofp__title">Send the Debtor&rsquo;s Emirates ID to the LFI on long-lived payments</h1>
        <p class="ofp__summary">
          TPPs must already capture the Debtor&rsquo;s Emirates ID for long-lived payment consents, but
          V2.1 gives them no way to pass it to the LFI. This proposal uses the <code>Risk</code> block, as
          already extended in V2.2. For <strong>retail customers</strong>, the LFI <strong>receives the
          Debtor&rsquo;s Emirates ID on every payment</strong> under a long-lived consent, and <strong>may
          reject the payment</strong> at <code>POST /payments</code> when the Emirates ID is missing or does
          not match.
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
            set out in section 05 below. It asks whether the LFI check should stay optional.
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
          <h2 class="ofp-band__title">An obligation with no way to reach the LFI</h2>
        </div>
        <div class="ofp-prose">
          <p>
            A Single Instant Payment consent is authorized and used once. Every other payment consent is
            <strong>long-lived</strong>: the User authorizes it at the LFI once, and the TPP then initiates
            payments under it for weeks or months, often with the User not present. Each of those later
            payments reaches the LFI with no authentication of its own, only the consent it was made under.
          </p>
          <p>
            TPPs are already required to capture the Debtor&rsquo;s Emirates ID for long-lived payment
            consents. V2.1 gives them no way to pass it to the LFI. <code>Risk.DebtorIndicators</code>
            identifies the User initiating a payment only by name, in <code>UserName</code>, and nothing
            else in the payment carries an identifier the LFI can compare with the PSU who authorized the
            consent. <strong>The TPP holds the Emirates ID, but the LFI, which executes the payment, never
            receives it.</strong>
          </p>

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

          <p>
            <strong>This proposal applies to retail customers only.</strong> A payment for a business
            customer may arrive without an Emirates ID, and is not rejected for it.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         02 · WHY NOT login_hint
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 &middot; Why not <code>login_hint</code></div>
          <h2 class="ofp-band__title"><code>login_hint</code> is a hint, and cannot be required</h2>
          <p class="ofp-band__lede">
            <code>login_hint</code> already lets a TPP send the Emirates ID of the customer who is going to
            authenticate. It cannot carry this obligation.
          </p>
        </div>
        <div class="ofp-prose">
          <p>
            <code>login_hint</code> is a claim of the Request JWT that the TPP sends to
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/consent/open-api/par"><code>POST /par</code></RouterLink>.
            It is encrypted to the LFI, and the LFI receives it in the
            <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/headless-heimdall/open-api/auth"><code>GET /auth</code></RouterLink>
            response when the authorization journey starts. See
            <RouterLink to="/knowledge-base/articles/login-hint-emirates-id">Emirates ID in login_hint</RouterLink>.
          </p>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Why it cannot be used here</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>It is a FAPI authorization request parameter, and in the redirect flow it is only a
                hint.</strong> It helps the LFI with authentication, and nothing more. The Authorization
                Endpoints specification follows OpenID Connect Core: <code>login_hint</code> &ldquo;MUST NOT be
                used to bypass authentication of the User, nor should a request be rejected if
                <code>login_hint</code> is not provided.&rdquo; An LFI cannot require it.
              </li>
              <li>
                <strong>It reaches the LFI once, during authorization.</strong> It is delivered only in the
                <code>GET /auth</code> response and is never written onto the consent, so it is not available
                when a payment arrives at <code>POST /payments</code>.
              </li>
              <li>
                <strong>It identifies who is expected to authenticate, not who makes each payment.</strong>
                Under a long-lived consent, each payment after the first is made after the authorization
                journey has ended.
              </li>
            </ul>
          </div>

          <p>
            This proposal does not change <code>login_hint</code>. It remains available for its intended
            purpose: helping the LFI identify the customer before authentication.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · RECOMMENDATION
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Recommendation</div>
          <h2 class="ofp-band__title">Carry it in the <code>Risk</code> block, and let the LFI check it</h2>
          <p class="ofp-band__lede">
            Use the <code>Risk.DebtorIndicators.EmiratesId</code> field that V2.2 already adds. The TPP sends
            it on every payment under a long-lived consent, and the LFI may reject a payment that lacks it or
            carries one that does not match.
          </p>
        </div>
        <div class="ofp-prose">
          <p>
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/personal-identifiable-information/risk"><code>Risk</code></RouterLink>
            is part of the payment PII, which the TPP signs and encrypts to the LFI. It already carries
            what the TPP knows about the debtor, the transaction and the creditor, for the LFI&rsquo;s fraud
            and risk checks. V2.2 adds <code>EmiratesId</code> to its debtor indicators
            (<RouterLink to="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-21">v2.1 &rarr; v2.2 changelog, &sect;21</RouterLink>).
          </p>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The field.</strong> <code>Risk.DebtorIndicators.EmiratesId</code> is an optional string
                matching <code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code>: the 15 digits of the Emirates ID,
                with or without hyphens. It is defined on the consent-time <code>Risk</code> sent to
                <code>POST /par</code> and on the payment-time <code>Risk</code> sent to
                <code>POST /payments</code>.
              </li>
              <li>
                <strong>TPPs populate what they hold.</strong> The TPP MUST populate every <code>Risk</code>
                field that is known or derivable from its system, for the debtor, the transaction and the
                creditor. A TPP that holds the Debtor&rsquo;s Emirates ID therefore sends it wherever
                <code>Risk</code> is sent.
              </li>
              <li>
                <strong>Long-lived consents.</strong> For a retail User under a long-lived consent, the TPP
                MUST capture the User&rsquo;s Emirates ID, and MUST send it in
                <code>Risk.DebtorIndicators.EmiratesId</code> on <strong>every</strong>
                <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/open-api/payments"><code>POST /payments</code></RouterLink>
                under that consent, not only the first.
              </li>
              <li>
                <strong>The LFI MAY enforce it at <code>POST /payments</code>.</strong> When its Ozone Connect
                <RouterLink :to="`${LFI_SI}/open-api/payments`"><code>POST /payments</code></RouterLink>
                endpoint receives a payment for a retail customer under a long-lived consent, the LFI MAY
                compare <code>EmiratesId</code> with the Emirates ID it holds for the PSU identified by
                <code>o3-psu-identifier</code>, ignoring hyphens. If the value is absent or does not match,
                the LFI MAY reject the payment with <code>400</code> and
                <code>Consent.BusinessRuleViolation</code>.
              </li>
              <li>
                <strong>Out of scope.</strong> Single Instant Payment consents, and payments for business
                customers, are not checked.
              </li>
            </ul>
          </div>

          <p>
            The Emirates ID arrives on the <code>POST /payments</code> request itself, so the LFI compares it
            with the Emirates ID it holds for the PSU. The API orchestration does not change: the LFI already
            calls the Consent Manager
            <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/api-hub/consent-manager/open-api/consents-consentId"><code>GET /consents/{consentId}</code></RouterLink>
            for payment requests, or stores the consent locally.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">The payment-time PII, and the two rejections</div>
            <pre class="ofp-code__pre">{{ payloadExample }}</pre>
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
         04 · TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 &middot; Technical changes</div>
          <h2 class="ofp-band__title">What changes</h2>
          <p class="ofp-band__lede">
            The specification changes and the TPP requirement are already in V2.2. The new part is the
            LFI&rsquo;s permission to enforce. No endpoint is added or removed.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards &mdash; <code>uae-authorization-endpoints-openapi.yaml</code>, <code>uae-bank-initiation-openapi.yaml</code></div>
            <p>
              <code>DebtorIndicators.EmiratesId</code> on the consent-time and payment-time <code>Risk</code>.
              <strong>Already in V2.2.</strong>
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; API Hub Consent Manager &mdash; <code>uae-api-hub-consent-manager-openapi.yaml</code></div>
            <p>
              <code>EmiratesId</code> in both <code>DebtorIndicators</code> schemas. <strong>Already in V2.2.</strong>
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; Ozone Connect &mdash; <code>uae-ozone-connect-bank-service-initiation-openapi.yaml</code></div>
            <p>
              <code>EmiratesId</code> on <code>AEDebtorIndicators</code>, which the LFI&rsquo;s Ozone Connect
              <code>POST /payments</code> endpoint receives, and on the corresponding schemas in the CAAP
              Operations and Consent Events and Actions descriptions. <strong>Already in V2.2.</strong>
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; TPP requirements</div>
            <p>
              <code>EmiratesId</code> required for a retail User on every <code>POST /payments</code>, in the
              Payment Initiation requirements of each of the seven long-lived payment types.
              <strong>Already in V2.2.</strong>
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">05 &middot; LFI requirements &mdash; new</div>
            <p>
              Add the check as a MAY, with its two error responses, to the LFI requirements and API guides
              of the seven long-lived payment types. Today it is described only in the Knowledge Base
              article
              <RouterLink to="/knowledge-base/articles/emirates-id-long-lived-payments">Emirates ID on Long-Lived Payments</RouterLink>.
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
         05 · QUESTIONS ATTACHED TO THIS VOTE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; Questions</div>
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
         06 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; Pros</div>
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
         07 · CONS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 &middot; Cons</div>
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

.ofp-table a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ofp-table a:hover { color: var(--at-navy-deep); }
</style>
