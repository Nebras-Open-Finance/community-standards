<route lang="yaml">
meta:
  layout: internal
  title: 'OFP-005 · Confirm data deletion when a consent is revoked'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-005. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Revocation paths, Consent types, Technical
// changes, Draft schema, Pros, and Cons. Styling follows the site's editorial
// system (cream/white bands, Fraunces/Poppins/IBM Plex Mono, sharp corners) and
// mirrors OFP-001 / OFP-004.
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
const OG_TITLE = 'OFP-005 · Confirm data deletion when a consent is revoked'
const OG_DESCRIPTION =
  'When a consent is revoked, expires, or is consumed, the TPP must review and delete the data it no longer has a lawful basis to hold — but the API Hub, the consent source of truth, holds no confirmation that it happened. Add an append-only attestations sub-resource so a TPP can attest, per data category, what it deleted or lawfully retained — across every consent type, within 45 days, with no new state model.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-005',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '16 Jul 2026',
  closes: '30 Jul 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

const pros = [
  'Closes the compliance-evidence gap — the API Hub, the consent source of truth, gains a durable, timestamped attestation that the TPP met its data-deletion obligation. Today it holds a terminal consent but no such confirmation.',
  'Minimal build — an append-only sub-resource on the consent: no state model to maintain and no reconciliation between a separate event and the consent, because the attestation is the consent’s own child.',
  'Reuses the existing authorisation — the sub-resource is called with the same client credentials token a TPP already uses to create and get the consent (not the consent-bound token). There is no new auth flow to add, and the call works unchanged after the consent has ended.',
  'Captures the real picture, per category — one Attestation Event lists each data category and whether it was Deleted, Retained, Anonymised, or ArchivedRestricted, with the reason and retention period where kept — not a bare “done”.',
  'One shape for every ending — the same event serves Revoked, Expired, and Consumed, because an append-only POST never depends on the consent’s status.',
  'Uniform across every consent type — Bank Data Sharing, Bank Service Initiation, and every Insurance type get the same sub-resource and the same event shape.',
  'The deadline is visible in the response — the Hub returns RegulatoryDeadlineMetIndicator, so the TPP gets immediate confirmation it attested within the 45-day window.',
  'An extensible pattern — a future obligation to attest to something else against a consent is a new AttestationType, not a new API: the standard grows and the Consent Manager absorbs it.',
  'Non-breaking and stateless — it adds a sub-resource; the existing consent revoke (PATCH) flow is untouched, and there is no de-duplication or correction endpoint to build.',
]

const cons = [
  'It is a new operation — a sub-resource, not merely a field on an existing call — so there is some new surface to specify, build, and secure, even if far less than a standalone events API with reconciliation.',
  'A self-declaration, not proof — the attestation captures the TPP’s confirmation that it deleted (or lawfully retained) the data, not independently verified erasure.',
  'No state model means no enforcement in the consent layer — whether a required attestation was posted, and by when, is a reporting-layer concern the Hub must build separately (a deliberate trade to keep state out of the consent).',
  'The per-category model asks more of the TPP — listing every applicable DataCategory with its reason, retention date, and access restriction is richer than a single flag, and TPPs must map their data holdings onto the categories.',
  'A new obligation for TPPs — completing the review and attesting within 45 days is extra work and tooling, and non-attestation needs a defined consequence to be meaningful rather than cosmetic.',
]

// Empirical evidence — rendered as dark code blocks. The gap the proposal rests
// on (today the Hub records the revocation but nothing about the data), and the
// proposed append-only sub-resource that closes it.
const exampleGap = `# A consent reaches a terminal status — Revoked (by the TPP, the LFI, or the
# customer), Expired, or Consumed (a payment consent, once fully used).
# The TPP must then review and delete the data it no longer has a lawful basis
# to hold. Today the Hub can record only the ending itself — e.g. a revocation:

PATCH /account-access-consents/{ConsentId}
{ "Data": { "Status": "Revoked", "RevokedBy": "TPP.InitiatedByUser" } }

# ...and on expiry or consumption the Hub moves the consent to its terminal
# status on its own. Either way, there is nowhere to confirm the TPP has acted
# on the data it holds.`

const examplePost = `# PROPOSED — post an immutable Attestation Event to the consent
POST /account-access-consents/{ConsentId}/attestations   # Bank Data Sharing
POST /payment-consents/{ConsentId}/attestations          # Bank Service Initiation
POST /insurance-consents/{ConsentId}/attestations        # Insurance (all types)

{
  "Data": {
    "AttestationType": "DataRetentionDeletion",
    "AttestationStatusAppliedDateTime": "2026-07-08T17:30:00Z",
    "DataAccessCeasedDateTime": "2026-07-01T09:15:30Z",
    "ConsentRevocationDateTime": "2026-07-01T09:15:00Z",   # only if revoked at the TPP
    "DataActions": [
      { "AttestationType": "Deleted",
        "DataCategory": "AllConsentedData",
        "AttestationDate": "2026-07-08T17:00:00Z" }
    ]
  }
}
# 201 Created — a receipt, not a status transition. Authorised with the same
# client credentials token used to create/get the consent; no new auth, no state.`

const exampleOutcomes = `# One event lists every data category the consent covers, and states what
# happened to each — deletion is not always the whole story.

"DataActions": [
  { "AttestationType": "Deleted",
    "DataCategory": "AllConsentedData",
    "AttestationDate": "2026-07-08T17:00:00Z" },

  # Retained under a lawful basis — reason, retained-until, and restriction required:
  { "AttestationType": "Retained",
    "DataCategory": "AuditRecords",
    "AttestationDate": "2026-07-08T17:01:00Z",
    "RetentionReason": "RegulatoryOrLegalObligation",
    "RetainedUntilDate": "2031-07-01",
    "AccessRestriction": "RestrictedUseOnly" },

  # Anonymised for analytics:
  { "AttestationType": "Anonymised",
    "DataCategory": "AnalyticsData",
    "AttestationDate": "2026-07-08T17:02:00Z",
    "RetentionReason": "AnonymisedOrAggregatedData",
    "RetainedUntilDate": "2027-07-01",
    "AccessRestriction": "NotRestricted" }
]`

const exampleGet = `# The 201 response is a receipt — including whether the 45-day deadline was met:
{ "Data": {
    "AttestationId": "3f1c8b1e-9a2d-4c7e-bf10-1d2e3f4a5b6c",
    "AttestationReceivedDateTime": "2026-07-08T17:30:04Z",
    "RegulatoryDeadlineMetIndicator": true
} }

# GET the Attestation Events a TPP has posted against this consent:
GET /account-access-consents/{ConsentId}/attestations

{
  "Data": [
    {
      "Attestation": { "AttestationType": "DataRetentionDeletion", "...": "..." },
      "Receipt": {
        "AttestationId": "3f1c8b1e-9a2d-4c7e-bf10-1d2e3f4a5b6c",
        "AttestationReceivedDateTime": "2026-07-08T17:30:04Z",
        "RegulatoryDeadlineMetIndicator": true
      }
    }
  ]
}`

// ─── Field reference ────────────────────────────────────────────────────────
// The request/response payload tables shown under the draft-schema card, so the
// field definitions read inline without opening the rendered schema. Sourced
// from the proposal's payload tables (§5.1 / §5.2). `req` drives the pill colour.
type FieldRow = { path: string; req: 'Yes' | 'No' | 'Conditional'; type: string; desc: string }

const requestFields: FieldRow[] = [
  { path: '$.Data', req: 'Yes', type: 'object', desc: 'The Attestation being submitted. The only permitted type today is DataRetentionDeletion.' },
  { path: '$.Data.AttestationType', req: 'Yes', type: 'string', desc: 'The attestation type. Value: DataRetentionDeletion.' },
  { path: '$.Data.AttestationStatusAppliedDateTime', req: 'Yes', type: 'date-time', desc: 'Date and time from which the attestation is valid. Must be in the past.' },
  { path: '$.Data.DataAccessCeasedDateTime', req: 'Yes', type: 'date-time', desc: 'Date and time at which the TPP’s data access ceased. Must be in the past.' },
  { path: '$.Data.ConsentRevocationDateTime', req: 'No', type: 'date-time', desc: 'Date and time the customer revoked consent at the TPP. Provided only where the consent was revoked at the TPP — not where it expired or was consumed.' },
  { path: '$.Data.DataActions', req: 'Yes', type: 'array (≥1)', desc: 'The action taken for each category of data held. Must list every category that applies to the consent.' },
  { path: '$.Data.DataActions[*].AttestationType', req: 'Yes', type: 'string', desc: 'Deleted, Retained, Anonymised, or ArchivedRestricted. Deleted attests the data is gone; the others attest it is retained in some form.' },
  { path: '$.Data.DataActions[*].DataCategory', req: 'Yes', type: 'string', desc: 'The category the action applies to: AllConsentedData, a Permission Code, AnalyticsData, or AuditRecords.' },
  { path: '$.Data.DataActions[*].AttestationDate', req: 'Yes', type: 'date-time', desc: 'Date and time the attestation for this category is made.' },
  { path: '$.Data.DataActions[*].RetentionReason', req: 'Conditional', type: 'string', desc: 'Why the data is retained. Required where the action is Retained, Anonymised, or ArchivedRestricted.' },
  { path: '$.Data.DataActions[*].RetentionReasonDescription', req: 'Conditional', type: 'string (1–500)', desc: 'Free-text reason. Required where RetentionReason is Other.' },
  { path: '$.Data.DataActions[*].RetainedUntilDate', req: 'Conditional', type: 'date', desc: 'The date until which the data is retained. Required where the action is Retained, Anonymised, or ArchivedRestricted; must be in the future.' },
  { path: '$.Data.DataActions[*].AccessRestriction', req: 'Conditional', type: 'string', desc: 'How access to retained data is restricted: NotRestricted, RestrictedUseOnly, or Other. Required where the action is Retained, Anonymised, or ArchivedRestricted.' },
  { path: '$.Data.DataActions[*].AccessRestrictionDescription', req: 'Conditional', type: 'string (1–500)', desc: 'Free-text description. Required where the action is ArchivedRestricted and AccessRestriction is Other.' },
]

const responseFields: FieldRow[] = [
  { path: '$.Data', req: 'Yes', type: 'object', desc: 'Wrapper for the receipt recorded by the API Hub.' },
  { path: '$.Data.AttestationId', req: 'Yes', type: 'uuid', desc: 'Unique identifier the API Hub assigns to the Attestation Event.' },
  { path: '$.Data.AttestationReceivedDateTime', req: 'Yes', type: 'date-time', desc: 'Date and time at which the API Hub received the Attestation Event.' },
  { path: '$.Data.RegulatoryDeadlineMetIndicator', req: 'Yes', type: 'boolean', desc: 'Whether the API Hub received the event before the regulatory deadline — 45 days after the consent reached its terminal status.' },
]

function reqClass(req: FieldRow['req']): string {
  if (req === 'Yes') return 'is-yes'
  if (req === 'Conditional') return 'is-cond'
  return 'is-no'
}

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
const status = ref<Status>('open')
const priority = ref<Priority>(meta.priority)
const openedDisplay = ref(meta.opened)
const closesDisplay = ref(meta.closes)
const versionDisplay = ref(meta.version)

const priorityLabel = computed(() => PRIORITY[priority.value]?.label ?? PRIORITY.medium.label)

// Voting has finished: swap the "Cast your vote" CTA for a closed treatment and
// let the tally show through (the draft state keeps its frosted cover below).
const isClosed = computed(() => status.value === 'closed')

// Optional companion partials, authored per proposal and co-located in this
// folder (ofp-005.outcome.vue / ofp-005.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-005.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-005.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Confirm data deletion when a consent is revoked',
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

// Format an ISO date ('2026-06-29') as the strip's display form ('29 Jun 2026').
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

        <h1 class="ofp__title">Confirm data deletion when a consent is revoked</h1>
        <p class="ofp__summary">
          When a consent is <strong>revoked</strong>, <strong>expires</strong>, or is <strong>consumed</strong>,
          the TPP must review and delete the data it no longer has a lawful basis to hold, but the API Hub, the
          consent <strong>source of truth</strong>, holds no confirmation that it happened. Add an append-only
          <code>attestations</code> sub-resource so a TPP can attest &mdash; per data category &mdash; what it
          deleted or lawfully retained, across every consent type and within 45 days, with no new state model.
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
            <div class="ofp__strip-key">Target version</div>
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
         DECISION · once closed with an Outcome, this whole region becomes tabs:
         Outcome of Proposal · Votes Received & Feedback · Original Proposal.
         Otherwise it renders straight through (the current single-scroll view).
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
            each person may vote once.
          </p>
        </div>
        <PvVotePanel :proposal="proposal" :my-vote="myVote" @vote="onVote" @submit="onSubmit" />
        <p v-if="submitError && status === 'open'" class="ofp-vote-error" role="alert">{{ submitError }}</p>
      </div>

      <!-- Before voting opens, frost over the whole white block. Once voting has
           closed the cover is dropped so the tally shows through — the band head
           and panel carry the "Voting is now closed" treatment instead. -->
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 · Background</div>
          <h2 class="ofp-band__title">Revocation ends access, but leaves the data</h2>
        </div>
        <div class="ofp-prose">
          <p>
            A consent is the customer's permission for a TPP to hold and use their data. When that consent
            reaches a <strong>terminal status</strong> &mdash; <strong>revoked</strong> (by the TPP, the LFI, or
            the customer), <strong>expired</strong>, or <strong>consumed</strong> (a payment consent, once fully
            used) &mdash; the permission is gone, and the TPP must review and delete what it no longer has a
            lawful basis to hold. That is not always <em>everything</em>: a TPP may be required to retain certain
            records to meet other legal obligations, such as anti-money-laundering rules. Ending the consent
            stops <em>future</em> access at the gateway; it does nothing about the data the TPP has
            <em>already</em> pulled and stored.
          </p>
          <p>
            The API Hub is the <strong>source of truth</strong> for consent: it creates, stores, and manages
            every consent, and validates it on every request. That makes it the natural place to hold the
            confirmation of what happened to the data afterwards &mdash; yet today it has none. When a consent
            ends the Hub records the ending itself &mdash; a revocation, or a move to <code>Expired</code> or
            <code>Consumed</code> &mdash; and nothing more:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today — the Hub records the ending, not the deletion</div>
            <pre class="ofp-code__pre">{{ exampleGap }}</pre>
          </div>

          <p>
            The requirement here is deliberately contained: give the TPP a way to <strong>attest that it has
            completed its data review and deletion</strong> &mdash; or lawful retention &mdash; in line with its
            statutory obligations, and let the Hub hold that attestation against the consent. It is not a request
            for a deletion workflow or a status model &mdash; just a durable, timestamped attestation, allied to
            the consent it concerns, submitted within a defined window.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         02 · RECOMMENDATION
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 · Recommendation</div>
          <h2 class="ofp-band__title">An append-only attestations sub-resource on the consent</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Add an <code>attestations</code> sub-resource to each consent.</strong> A TPP
            <code>POST</code>s an <strong>Attestation Event</strong> to confirm it has completed its data review
            and deletion once the consent ended, whether revoked, expired, or consumed. A TPP <code>GET</code>s
            the sub-resource to read the events it has posted. The event hangs off the consent it concerns, so
            the confirmation is allied to the consent with nothing to reconcile.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed — POST an Attestation Event (append-only)</div>
            <pre class="ofp-code__pre">{{ examplePost }}</pre>
          </div>

          <p>
            A TPP's answer is not a single flag: the same data was not necessarily all handled the same way. So
            the event carries a <code>DataActions</code> array with <strong>one entry per category of data</strong>
            &mdash; and an event must list every category the consent covers. Each entry states its
            <code>AttestationType</code>: <strong><code>Deleted</code></strong> (the data is gone), or
            <strong><code>Retained</code></strong> / <strong><code>Anonymised</code></strong> /
            <strong><code>ArchivedRestricted</code></strong> (the data is kept in some form &mdash; a
            <code>RetentionReason</code>, a <code>RetainedUntilDate</code>, and an <code>AccessRestriction</code>
            are then required). The category is <code>AllConsentedData</code> where one action covers everything,
            or a specific Permission Code, <code>AnalyticsData</code>, or <code>AuditRecords</code> where it does
            not:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed — per-category DataActions (deleted, retained, anonymised)</div>
            <pre class="ofp-code__pre">{{ exampleOutcomes }}</pre>
          </div>

          <p>
            Each <code>POST</code> records a new, immutable event, treated as a <strong>single atomic
            event</strong> uncorrelated with any other. There is <strong>no state model</strong> and
            <strong>no correction endpoint</strong>: an <code>AttestationType</code> is data on the event, not a
            status the consent moves through, the Hub applies no de-duplication, and all successfully recorded
            events are stored. If a TPP posts more than once, it has still met its obligation; which event is
            surfaced in reporting &mdash; the earliest, the latest, or all &mdash; is a reporting-layer matter,
            not consent state. The event's top-level
            <code>AttestationType</code> is the extension point &mdash; <code>DataRetentionDeletion</code> is the
            only value defined today, and a future obligation to attest to something else against a consent
            becomes a new value, not a new API. The <code>201</code> response is a receipt, and a
            <code>GET</code> returns the list:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed — the receipt, and GET the events for a consent</div>
            <pre class="ofp-code__pre">{{ exampleGet }}</pre>
          </div>

          <p>
            The sub-resource is a child of the consent (nothing to reconcile) and append-only (no state model)
            &mdash; two properties the other shapes we looked at could not both offer, as
            <strong>Alternatives considered</strong> below sets out. <strong>Authorisation is the same as getting
            a consent</strong>: the sub-resource is called with the very
            <RouterLink to="/tech/tpp-standards/security/tokens/">client credentials access token</RouterLink>
            a TPP already uses to create and retrieve the consent itself (for example
            <code>GET /account-access-consents</code>). So there is
            no new auth flow, and no dependence on a token that dies with the consent. The
            attestation obligation and its 45-day window are documented on the
            <RouterLink to="/tech/tpp-standards/v2.1/consent/requirements">consent requirements</RouterLink>
            page; whether every required attestation was posted is a reporting-layer question, kept out of the
            consent itself.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · THE 45-DAY RULE & TERMINAL STATUSES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 · The 45-day rule</div>
          <h2 class="ofp-band__title">Attest within 45 days of the consent ending</h2>
        </div>
        <div class="ofp-prose">
          <p>
            The obligation attaches only when a consent reaches one of three <strong>terminal statuses</strong>,
            and it carries a defined deadline. Within <strong>45 days</strong> of the consent reaching that
            status, the TPP <strong>MUST</strong> complete its data review and deletion (or record a lawful
            retention) and <code>POST</code> the Attestation Event. The receipt's
            <code>RegulatoryDeadlineMetIndicator</code> tells the TPP, there and then, whether it attested inside
            the window.
          </p>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Terminal statuses in scope</div>
            <ul class="ofp-rules__list">
              <li>
                <strong><code>Revoked</code></strong> &mdash; the consent was withdrawn, by the TPP, the LFI, or
                the customer.
              </li>
              <li>
                <strong><code>Expired</code></strong> &mdash; the consent's <code>ExpirationDateTime</code>
                passed and the Hub moved it to <code>Expired</code>.
              </li>
              <li>
                <strong><code>Consumed</code></strong> &mdash; a payment consent that has been fully used. This
                is why Service Initiation is in scope (see below).
              </li>
            </ul>
          </div>

          <p>
            No other terminal status is in scope for v2.2 &mdash; <code>Rejected</code>, for example, is not,
            because no data was shared under it. The requirement applies to consents created under Standards
            v2.2 or later, and to earlier consents that are still <code>Authorized</code> on the CBUAE-mandated
            v2.2 implementation date and subsequently become <code>Revoked</code>, <code>Expired</code>, or
            <code>Consumed</code>. Consents that were <em>already</em> terminal before that date are out of
            scope.
          </p>
          <p>
            The clock and the deadline live in the <strong>reporting layer</strong>, not on the consent: the
            consent holds no deletion state, and the 45-day rule is enforced by monitoring which consents have a
            recorded attestation, not by a new consent status. This proposal deliberately leaves the monitoring,
            reminder, and escalation processes &mdash; and any correction process for a mistaken attestation
            &mdash; out of scope.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · ALTERNATIVES CONSIDERED
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · Alternatives considered</div>
          <h2 class="ofp-band__title">Why a sub-resource, and not the two obvious alternatives</h2>
        </div>
        <div class="ofp-prose">
          <p>
            Two other shapes were worked through first. Both can be made to work; each carries a cost the
            sub-resource avoids.
          </p>
          <p>
            <strong>A field on the consent revoke (<code>PATCH</code>).</strong> The first instinct was to add a
            <code>DataDeletion</code> object to the existing consent PATCH body &mdash; a small
            <code>Status</code> (say <code>Completed</code>, <code>NotRequired</code>,
            <code>RetainedUnderLegalObligation</code>) and a timestamp &mdash; so the TPP confirms deletion in
            the same call it uses to revoke. It is appealingly small and needs no new operation. But it couples
            an <em>attestation</em> to a <em>status transition</em>, and the two do not share a lifetime. Once
            the consent has already ended &mdash; revoked at the LFI, or expired &mdash; which is exactly when
            the confirmation is needed, there is no transition left to make: the PATCH would have to be relaxed
            to accept a body with no status change, on a consent already in a terminal state. That is a
            carve-out in the revoke contract &mdash; and because the field would live on the consent itself, the
            consent now carries deletion state, the very thing the requirement does not ask it to hold. (An
            <code>AttestationType</code> on a separate, immutable Attestation Event, as recommended above, is
            different: it describes a single confirmation, and the consent holds no deletion state of its own.)
          </p>
          <p>
            <strong>A standalone events API.</strong> The other option was a new top-level resource &mdash; a
            <code>/revocation-events</code> endpoint, say &mdash; that the TPP posts to. This cleanly separates
            the report from the consent, but it buys a new problem: every event must then be
            <em>reconciled</em> back to the consent it concerns, with its own rules for matching, ordering, and
            orphaned records. It is not the endpoint that is expensive so much as the reconciliation around it.
          </p>
          <p>
            <strong>The sub-resource takes the good part of each.</strong> Like the events API it is a distinct,
            append-only Attestation Event rather than a field bolted onto a status change &mdash; so it behaves
            identically whether the consent is active, revoked, expired, or consumed. Like the PATCH field it is
            allied to the consent &mdash; the event is a <em>child</em> of the consent, so there is nothing to
            reconcile. And because each post is an immutable event, there is no state model to build or enforce
            in the consent layer. Any enforcement that emerges later &mdash; checking a required attestation was
            posted by its deadline &mdash; sits in the reporting layer over these events, leaving the events
            themselves immutable and the consent stateless.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · END OF CONSENT
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 · End of consent</div>
          <h2 class="ofp-band__title">One event shape, however the consent ends</h2>
        </div>
        <div class="ofp-prose">
          <p>
            A consent reaches the end of its life in more than one way, and an append-only <code>POST</code>
            serves them all without special cases &mdash; because it never depends on the consent's status.
          </p>
          <p>
            <strong>Path A — the TPP revokes.</strong> The TPP revokes the consent (<code>PATCH</code> to
            <code>Status: Revoked</code>) as it does today, deletes the data, and <code>POST</code>s an
            Attestation Event to the consent's <code>attestations</code> sub-resource.
          </p>
          <p>
            <strong>Path B — the customer revokes at the LFI.</strong> The customer withdraws consent in their
            bank's or insurer's app. The LFI tells the Hub, the Hub sets the consent to <code>Revoked</code>,
            and the Hub notifies the TPP through the existing
            <RouterLink to="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide">Consent Status Event</RouterLink>.
            The TPP deletes its data and <code>POST</code>s the same event.
          </p>
          <p>
            <strong>Path C — the consent expires.</strong> No one revokes it: its <code>ExpirationDateTime</code>
            passes and the Hub moves it to <code>Expired</code> on its own, firing the same Consent Status
            Event. The TPP's basis to hold the data ends just as it does on revocation, so it deletes the data
            and <code>POST</code>s the same event. Expiry is a quiet case &mdash; there is no deliberate act by
            anyone to prompt the clean-up &mdash; which is exactly why it must be in scope.
          </p>
          <p>
            <strong>Path D — a payment consent is consumed.</strong> A Service Initiation consent that has been
            fully used moves to <code>Consumed</code>. Like expiry, it is a status the Hub sets on its own,
            firing the same Consent Status Event &mdash; and the payment consent still holds data (see the next
            section). The TPP deletes it and <code>POST</code>s the same event.
          </p>
          <p>
            The one event shape carries all four because it is <em>appended</em>, not a status change: it does
            not matter that the consent is already <code>Revoked</code>, <code>Expired</code>, or
            <code>Consumed</code>, since there is no transition to fight &mdash; as there would be if the
            confirmation were a <code>PATCH</code> of the consent's status. And because the sub-resource is
            authorised with the same client credentials token used to create and get the consent &mdash; not a
            consent-bound token &mdash; it works the same way whether the consent is still active or already
            terminal: there is no token that expires with the consent, and no new authorisation flow to add.
          </p>
          <p>
            The TPP learns the consent has ended either from the Consent Status Event webhook (Paths B, C, and
            D) or, where it has not subscribed, by checking the consent status on its own schedule. Either way,
            the absence of a webhook subscription does not remove the obligation to notice the terminal status
            and attest.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         06 · EVERY CONSENT TYPE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 · Every consent type</div>
          <h2 class="ofp-band__title">This applies to all consent types — including Service Initiation</h2>
        </div>
        <div class="ofp-prose">
          <p>
            Every consent type carries data the TPP may have retrieved and stored, so the sub-resource applies
            uniformly to all three:
          </p>

          <div class="ofp-rules">
            <div class="ofp-rules__label">The sub-resource, per consent type</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>Bank Data Sharing</strong> &mdash;
                <code>POST /account-access-consents/{ConsentId}/attestations</code>. The obvious case: account,
                balance, transaction, and party data pulled under the consent.
              </li>
              <li>
                <strong>Bank Service Initiation</strong> &mdash;
                <code>POST /payment-consents/{ConsentId}/attestations</code>. See the call-out below &mdash; a
                payment consent is not empty.
              </li>
              <li>
                <strong>Insurance</strong> &mdash;
                <code>POST /insurance-consents/{ConsentId}/attestations</code>, across every insurance type
                (Motor, Health, Home, Life, Travel, and the rest), each carrying policy and claims data.
              </li>
            </ul>
          </div>

          <p>
            <strong>Service Initiation is the one to call out</strong>, because it is the easiest to wave
            through. It is filed under "payments", not "data sharing", so it is tempting to assume a payment
            consent holds nothing to delete once the money has moved. That is wrong. A Service Initiation
            consent carries data: the debtor and creditor account identifiers and names, the amounts,
            references, and the charge and exchange-rate information attached to the consent
            (<code>Charges</code>, <code>ExchangeRate</code>) &mdash; and any account data the TPP retrieved to
            set the payment up. That is personal and financial data held under a consent, and when the consent
            ends &mdash; revoked, expired, or consumed &mdash; it falls under the same deletion obligation as any
            Data Sharing consent. Excluding Service Initiation would leave exactly the data people assume is not
            there.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         07 · TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 · Technical changes</div>
          <h2 class="ofp-band__title">What changes in the spec</h2>
          <p class="ofp-band__lede">
            A new sub-resource on each consent, a shared Attestation Event schema, and storage against the
            consent. No new top-level API, no change to the consent status model.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Add the <code>attestations</code> sub-resource</div>
            <p>
              Add <code>POST</code> and <code>GET</code> on <code>/{consent}/attestations</code> to the three
              TPP-facing consent specs: Bank Data Sharing (<code>/account-access-consents</code>), Bank Service
              Initiation (<code>/payment-consents</code>), and Insurance (<code>/insurance-consents</code>).
              The <code>POST</code> records an Attestation Event; the <code>GET</code> lists them. No
              <code>PATCH</code> or <code>DELETE</code> &mdash; events are immutable. Authorisation is the same
              as the consent endpoints: the client credentials token used to create and get the consent (the
              <code>client_credentials</code> grant), with the same scope as the parent consent &mdash; not the
              consent-bound (<code>authorization_code</code>) token.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · Define the Attestation Event schema</div>
            <p>
              A shared event: a top-level <code>AttestationType</code> (<code>DataRetentionDeletion</code> today,
              extensible), the envelope date-times (<code>AttestationStatusAppliedDateTime</code>,
              <code>DataAccessCeasedDateTime</code>, optional <code>ConsentRevocationDateTime</code>), and a
              <code>DataActions</code> array of one entry per <code>DataCategory</code>. Each action's
              <code>AttestationType</code> (<code>Deleted</code> / <code>Retained</code> / <code>Anonymised</code>
              / <code>ArchivedRestricted</code>) selects whether <code>RetentionReason</code>,
              <code>RetainedUntilDate</code>, and <code>AccessRestriction</code> are required. The Hub returns a
              receipt: <code>AttestationId</code>, <code>AttestationReceivedDateTime</code>, and
              <code>RegulatoryDeadlineMetIndicator</code>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · Validate by schema first, rules second</div>
            <p>
              Mandatory properties, enum values, and date-time formats are enforced by <strong>schema
              validation</strong> &mdash; not restated as technical rules. The rule layer covers only what schema
              cannot: the temporal ordering of the date-times and the conditional requirements. A rule failure
              returns <code>400</code> with <code>Attestation.ValidationError</code>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 · Store against the consent; keep state in reporting</div>
            <p>
              The Consent Manager stores each Attestation Event against its <code>ConsentId</code>. All
              successfully recorded events are kept; the Hub applies no de-duplication and offers no correction
              endpoint. Whether a required attestation was posted, and within the 45 days, is derived in the
              reporting layer &mdash; not held as state on the consent &mdash; so the consent layer needs no new
              state machine.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">05 · Documentation — the obligation and the flow</div>
            <p>
              Document the obligation and its 45-day window on the
              <RouterLink to="/tech/tpp-standards/v2.1/consent/requirements">consent requirements</RouterLink>
              page, and add the attestation step to the
              <RouterLink to="/tech/tpp-standards/v2.1/consent/api-guide">consent API guide</RouterLink> and the
              <RouterLink to="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide">Consent Status Event</RouterLink>
              guide (on receiving a revocation, expiry, or consumption event, delete and post an Attestation
              Event).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         08 · DRAFT SCHEMA
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 08 · Draft schema</div>
          <h2 class="ofp-band__title">The sub-resource, written out</h2>
          <p class="ofp-band__lede">
            A working draft attached to this proposal &mdash; the <code>attestations</code> sub-resource on all
            three consent types, with its shared Attestation Event schema. It opens in the same rendered view as
            the published API specs.
          </p>
        </div>

        <div class="ofp-cards">
          <RouterLink
            to="/internal/proposals/ofp-005/attestation-schema"
            class="ofp-card"
            :style="{ '--card-color': '#008B78' }"
          >
            <span class="ofp-card__top" :style="{ background: '#008B78' }" />
            <div class="ofp-card__meta">
              <span class="ofp-card__cat" :style="{ color: '#008B78' }">Consent attestations</span>
            </div>
            <h3 class="ofp-card__title">attestation-schema.yaml</h3>
            <p class="ofp-card__desc">
              The append-only <code>attestations</code> sub-resource — POST and GET on
              <code>/{consent}/attestations</code> across Bank Data Sharing, Bank Service Initiation, and
              Insurance.
            </p>
            <div class="ofp-card__foot">
              <span class="ofp-card__cta">Open rendered schema</span>
              <span class="ofp-card__arrow" :style="{ color: '#008B78' }">&rarr;</span>
            </div>
          </RouterLink>
        </div>

        <div class="ofp-fields">
          <div class="ofp-fields__label">Request payload — the Attestation Event</div>
          <div class="ofp-fields__scroll">
            <table class="ofp-fields__table">
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Required</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="f in requestFields" :key="f.path">
                  <td class="ofp-fields__path">{{ f.path }}</td>
                  <td class="ofp-fields__req"><span class="ofp-fields__pill" :class="reqClass(f.req)">{{ f.req }}</span></td>
                  <td class="ofp-fields__type">{{ f.type }}</td>
                  <td class="ofp-fields__desc">{{ f.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="ofp-fields">
          <div class="ofp-fields__label">Response payload — the receipt (201)</div>
          <div class="ofp-fields__scroll">
            <table class="ofp-fields__table">
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Required</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="f in responseFields" :key="f.path">
                  <td class="ofp-fields__path">{{ f.path }}</td>
                  <td class="ofp-fields__req"><span class="ofp-fields__pill" :class="reqClass(f.req)">{{ f.req }}</span></td>
                  <td class="ofp-fields__type">{{ f.type }}</td>
                  <td class="ofp-fields__desc">{{ f.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         09 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 09 · Pros</div>
          <h2 class="ofp-band__title">What an attestations sub-resource buys</h2>
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
         10 · CONS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 10 · Cons</div>
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

.ofp-band__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

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

/* ─── Rules recap (sub-resource per consent type) ─────────────────────────── */
.ofp-rules {
  max-width: 52rem;
  margin: 28px 0 0;
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

/* ─── Draft-schema cards (rendered via Redoc) — mirrors /tech card style ─── */
.ofp-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
  max-width: 60rem;
}

.ofp-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ofp-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ofp-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ofp-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ofp-card__cat { font-weight: 700; }

.ofp-card__title {
  font-family: var(--at-mono);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
  word-break: break-all;
}

.ofp-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}

.ofp-card__desc code {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 4px;
  color: var(--at-navy-deep);
}

.ofp-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.ofp-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ofp-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ofp-card:hover .ofp-card__arrow { transform: translateX(4px); }
.ofp-card:hover .ofp-card__cta { color: var(--at-navy-deep); }

/* ─── Field tables (payload reference under the schema card) ─────────────── */
.ofp-fields { max-width: 60rem; margin: 2.25rem 0 0; }

.ofp-fields__label {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--at-teal);
  margin-bottom: 12px;
}

.ofp-fields__scroll {
  overflow-x: auto;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-teal);
  background: var(--at-surface);
}

.ofp-fields__table {
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;
  font-size: 13.5px;
  line-height: 1.55;
}

.ofp-fields__table th {
  text-align: left;
  vertical-align: bottom;
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy);
  opacity: 0.6;
  padding: 12px 16px;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  white-space: nowrap;
}

.ofp-fields__table td {
  padding: 11px 16px;
  vertical-align: top;
  color: var(--at-navy);
  border-bottom: 1px solid var(--at-grid-line);
}

.ofp-fields__table tr:last-child td { border-bottom: none; }

.ofp-fields__path {
  font-family: var(--at-mono);
  font-size: 12px;
  color: var(--at-navy-deep);
  white-space: nowrap;
}

.ofp-fields__type {
  font-family: var(--at-mono);
  font-size: 12px;
  color: var(--at-mute-2);
  white-space: nowrap;
}

.ofp-fields__req { white-space: nowrap; }

.ofp-fields__desc { min-width: 20rem; }

.ofp-fields__pill {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 3px 8px;
  border: 1px solid var(--at-grid-line);
}

.ofp-fields__pill.is-yes { color: var(--at-teal-deep, #008b78); background: rgba(0, 194, 169, 0.1); }
.ofp-fields__pill.is-cond { color: var(--at-gold); background: rgba(180, 140, 40, 0.08); }
.ofp-fields__pill.is-no { color: var(--at-mute-2); }

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
  .ofp-cards { grid-template-columns: 1fr; }
}
</style>
