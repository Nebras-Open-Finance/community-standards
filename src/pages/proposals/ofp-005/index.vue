<route lang="yaml">
meta:
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
  'When a consent is revoked or expires, the TPP must delete the data it no longer has a lawful basis to hold — but the API Hub, the consent source of truth, keeps no record that it happened. Add an append-only audit sub-resource to the consent so a TPP can report the deletion, across every consent type — no new state model, no reconciliation.'
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
  'Closes the loop on revocation — the API Hub, the consent source of truth, gains a durable, timestamped record that the TPP acted on its deletion obligation. Today it has none.',
  'Minimal build — an append-only sub-resource on the consent: no state model to maintain and no reconciliation between a separate event and the consent, because the record is the consent’s own child.',
  'Allies the data to the consent — every record hangs off the ConsentId it concerns, and a GET returns that consent’s own reporting history.',
  'Handles both revocation paths with one call — the TPP posts a record whenever it acts, whether it revoked the consent itself or the customer revoked at the LFI. The consent’s status is irrelevant to an append-only POST.',
  'Uniform across every consent type — Bank Data Sharing, Bank Service Initiation, and every Insurance type get the same sub-resource and the same record shape.',
  'An extensible pattern — if a future obligation requires TPPs to report something else against a consent, it is a new record Type, not a new API: the standard grows and the Consent Manager absorbs it.',
  'Captures reality, not just success — a record can say deletion is scheduled for a date, or that data is lawfully retained with a reason, not only that it is done.',
  'Non-breaking — it adds a sub-resource; the existing consent revoke (PATCH) flow is untouched.',
]

const cons = [
  'It is a new operation — a sub-resource, not merely a field on an existing call — so there is some new surface to specify, build, and secure, even if far less than a standalone events API with reconciliation.',
  'A self-declaration, not proof — the record captures the TPP’s attestation that it deleted the data, not verified erasure.',
  'No state model means no enforcement in the consent layer — whether a required record was posted, and by when, is a reporting-layer concern the Hub must build separately (a deliberate trade to keep state out of the consent).',
  'Authorisation after revocation — once a consent is revoked its consent-bound access token is dead, so a post-revocation record must be authorised by a TPP client-level credential scoped to consent management, a flow some TPPs will need to add.',
  'A new obligation for TPPs — posting the record within a defined window is extra work and tooling, and non-posting needs a defined consequence to be meaningful rather than cosmetic.',
]

// Empirical evidence — rendered as dark code blocks. The gap the proposal rests
// on (today the Hub records the revocation but nothing about the data), and the
// proposed append-only sub-resource that closes it.
const exampleGap = `# A consent ends — revoked (by the TPP, the LFI, or the customer) or expired.
# The TPP must then delete the data it no longer has a lawful basis to hold.
# Today the Hub can record only the ending itself — e.g. a revocation:

PATCH /account-access-consents/{ConsentId}
{ "Data": { "Status": "Revoked", "RevokedBy": "TPP.InitiatedByUser" } }

# ...and on expiry the Hub moves the consent to "Expired" on its own.
# Either way, there is nowhere to record that the deletion actually happened.`

const examplePost = `# PROPOSED — append an immutable audit record to the consent
POST /account-access-consents/{ConsentId}/audit     # Bank Data Sharing
POST /payment-consents/{ConsentId}/audit            # Bank Service Initiation
POST /insurance-consents/{ConsentId}/audit          # Insurance (all types)

{
  "Data": {
    "Type": "DataDeletion",                        # what is being reported (extensible)
    "Outcome": "Deleted",                          # Deleted | Planned | NotDeleted
    "EventDateTime": "2026-07-09T14:12:00Z",       # when the TPP deleted the data
    "Description": "Personal data erased; txn records retained per AML rules."   # optional
  }
}
# 201 Created — a new record. No status transition, no state model:
# the TPP posts a record whenever it has something to report.`

const exampleOutcomes = `# The Outcome field selects the shape — a TPP need not always report "done".

# Deletion is scheduled, not yet done — a target date is required:
{ "Data": {
    "Type": "DataDeletion",
    "Outcome": "Planned",
    "EventDateTime": "2026-07-09T14:12:00Z",         # when the plan was recorded
    "PlannedDeletionDateTime": "2026-08-01T00:00:00Z"  # deleted by this date
} }

# Data has NOT been deleted — a reason is required:
{ "Data": {
    "Type": "DataDeletion",
    "Outcome": "NotDeleted",
    "EventDateTime": "2026-07-09T14:12:00Z",
    "Reason": "Retained under AML record-keeping obligation; review Jul 2031."
} }`

const exampleGet = `# GET the records a TPP has posted against this consent
GET /account-access-consents/{ConsentId}/audit

{
  "Data": [
    {
      "AuditId": "aud_9f2c8b1e...",
      "Type": "DataDeletion",
      "Outcome": "Deleted",
      "EventDateTime": "2026-07-09T14:12:00Z",
      "Description": "Personal data erased; txn records retained per AML rules.",
      "CreationDateTime": "2026-07-09T14:12:03Z"
    }
  ]
}`

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
        <RouterLink to="/proposals/" class="ofp__back">
          <span class="ofp__back-arrow">&larr;</span> All proposals
        </RouterLink>

        <div class="ofp__meta-row">
          <span class="ofp__id">{{ meta.id }}</span>
          <span class="ofp__divider" />
          <PvStatusPill :status="status" />
          <span class="ofp__tag ofp__tag--priority">{{ priorityLabel }}</span>
        </div>

        <h1 class="ofp__title">Confirm data deletion when a consent is revoked</h1>
        <p class="ofp__summary">
          When a consent is revoked &mdash; or expires &mdash; the TPP must delete the data it no longer has a
          lawful basis to hold, but the API Hub, the consent <strong>source of truth</strong>, keeps no record
          that it happened. Add an append-only <code>audit</code> sub-resource to the consent so a TPP can
          report the deletion, across every consent type &mdash; no new state model, no reconciliation.
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
            ends &mdash; whether it is <strong>revoked</strong> (by the TPP, the LFI, or the customer) or simply
            <strong>expires</strong> &mdash; the permission is gone, and the TPP must stop using the data and
            delete what it no longer has a lawful basis to hold. That is not always <em>everything</em>: a TPP
            may be required to retain certain records to meet other legal obligations, such as
            anti-money-laundering rules. Ending the consent stops <em>future</em> access at the gateway; it does
            nothing about the data the TPP has <em>already</em> pulled and stored.
          </p>
          <p>
            The API Hub is the <strong>source of truth</strong> for consent: it creates, stores, and manages
            every consent, and validates it on every request. That makes it the natural place to hold the
            record of what happened to the data afterwards &mdash; yet today it has none. When a consent ends
            the Hub records the ending itself &mdash; a revocation, or a move to <code>Expired</code> &mdash;
            and nothing more:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today — the Hub records the ending, not the deletion</div>
            <pre class="ofp-code__pre">{{ exampleGap }}</pre>
          </div>

          <p>
            The original requirement here is deliberately simple: give the TPP a way to provide an
            <strong>indicator that it has deleted the data</strong> in line with its statutory obligations, and
            let the Hub hold that record against the consent. It is not a request for a deletion workflow or a
            status model &mdash; just a durable, timestamped attestation, allied to the consent it concerns.
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
          <h2 class="ofp-band__title">An append-only audit sub-resource on the consent</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Add an <code>audit</code> sub-resource to each consent.</strong> A TPP <code>POST</code>s a
            record to report an action it has taken against the consent &mdash; today, that it has dealt with the
            data it held once the consent ended, whether revoked or expired. A TPP <code>GET</code>s the
            sub-resource to read the records it has posted. The record hangs off the consent it concerns, so the
            data is allied to the consent with nothing to reconcile.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed — POST a record (append-only)</div>
            <pre class="ofp-code__pre">{{ examplePost }}</pre>
          </div>

          <p>
            A TPP's answer is not always a clean "done", so the record's <code>Outcome</code> carries one of
            three cases: <strong><code>Deleted</code></strong> (the data is gone),
            <strong><code>Planned</code></strong> (deletion is scheduled &mdash; a
            <code>PlannedDeletionDateTime</code> is required), or <strong><code>NotDeleted</code></strong> (the
            data is retained &mdash; a <code>Reason</code> is required, for example a lawful record-keeping
            obligation). The <code>Outcome</code> selects the shape, so the right field is always present:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed — the Planned and NotDeleted outcomes</div>
            <pre class="ofp-code__pre">{{ exampleOutcomes }}</pre>
          </div>

          <p>
            Each <code>POST</code> creates a new, immutable record. There is <strong>no state model</strong>:
            the <code>Outcome</code> is data on the record, not a status the consent moves through &mdash; the
            TPP simply posts a record when it has something to report, and reads the standard to know when that
            is. The record's <code>Type</code> is the extension point &mdash; <code>DataDeletion</code> is the
            only type defined today, and a future obligation to report something else against a consent becomes a
            new <code>Type</code>, not a new API. A <code>GET</code> returns the list:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed — GET the records for a consent</div>
            <pre class="ofp-code__pre">{{ exampleGet }}</pre>
          </div>

          <p>
            The sub-resource is a child of the consent (nothing to reconcile) and append-only (no state model)
            &mdash; two properties the other shapes we looked at could not both offer, as
            <strong>Alternatives considered</strong> below sets out. The confirmation obligation and its window
            are documented on the
            <RouterLink to="/tech/tpp-standards/v2.1/consent/requirements">consent requirements</RouterLink>
            page; whether every required record was posted is a reporting-layer question, kept out of the
            consent itself.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · ALTERNATIVES CONSIDERED
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 · Alternatives considered</div>
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
            <code>Outcome</code> on a separate, immutable audit record, as recommended above, is different: it
            describes a single report, and the consent holds no deletion state of its own.)
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
            append-only record rather than a field bolted onto a status change &mdash; so it behaves identically
            whether the consent is active, revoked, or expired. Like the PATCH field it is allied to the consent
            &mdash; the record is a <em>child</em> of the consent, so there is nothing to reconcile. And because
            each post is an immutable record, there is no state model to build or enforce in the consent layer.
            If a genuine need for enforced states emerges later, it can be layered on (a first <code>POST</code>,
            subsequent <code>PATCH</code>es) without redoing the shape.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · END OF CONSENT
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · End of consent</div>
          <h2 class="ofp-band__title">One record shape, however the consent ends</h2>
        </div>
        <div class="ofp-prose">
          <p>
            A consent reaches the end of its life in more than one way, and an append-only <code>POST</code>
            serves them all without special cases &mdash; because it never depends on the consent's status.
          </p>
          <p>
            <strong>Path A — the TPP revokes.</strong> The TPP revokes the consent (<code>PATCH</code> to
            <code>Status: Revoked</code>) as it does today, deletes the data, and <code>POST</code>s a
            <code>DataDeletion</code> record to the consent's <code>audit</code> sub-resource.
          </p>
          <p>
            <strong>Path B — the customer revokes at the LFI.</strong> The customer withdraws consent in their
            bank's or insurer's app. The LFI tells the Hub, the Hub sets the consent to <code>Revoked</code>,
            and the Hub notifies the TPP through the existing
            <RouterLink to="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide">Consent Status Event</RouterLink>.
            The TPP deletes its data and <code>POST</code>s the same record.
          </p>
          <p>
            <strong>Path C — the consent expires.</strong> No one revokes it: its <code>ExpirationDateTime</code>
            passes and the Hub moves it to <code>Expired</code> on its own, firing the same Consent Status
            Event. The TPP's basis to hold the data ends just as it does on revocation, so it deletes the data
            and <code>POST</code>s the same record. Expiry is the quiet case &mdash; there is no deliberate act
            by anyone to prompt the clean-up &mdash; which is exactly why it must be in scope.
          </p>
          <p>
            The one record shape carries all three because it is <em>appended</em>, not a status change: it does
            not matter that the consent is already <code>Revoked</code> or <code>Expired</code>, since there is
            no transition to fight &mdash; as there would be if the confirmation were a <code>PATCH</code> of the
            consent's status.
          </p>
          <p>
            One caveat worth naming: once the consent has ended (Paths B and C) its consent-bound access token
            is dead, so the record must be authorised by a TPP client-level credential scoped to consent
            management, not the customer's now-expired token.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · EVERY CONSENT TYPE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 · Every consent type</div>
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
                <code>POST /account-access-consents/{ConsentId}/audit</code>. The obvious case: account,
                balance, transaction, and party data pulled under the consent.
              </li>
              <li>
                <strong>Bank Service Initiation</strong> &mdash;
                <code>POST /payment-consents/{ConsentId}/audit</code>. See the call-out below &mdash; a payment
                consent is not empty.
              </li>
              <li>
                <strong>Insurance</strong> &mdash; <code>POST /insurance-consents/{ConsentId}/audit</code>,
                across every insurance type (Motor, Health, Home, Life, Travel, and the rest), each carrying
                policy and claims data.
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
            ends &mdash; revoked or expired &mdash; it falls under the same deletion obligation as any Data
            Sharing consent. Excluding Service Initiation would leave exactly the data people assume is not
            there.
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 · Technical changes</div>
          <h2 class="ofp-band__title">What changes in the spec</h2>
          <p class="ofp-band__lede">
            A new sub-resource on each consent, a small shared record schema, and storage against the consent.
            No new top-level API, no change to the consent status model.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Add the <code>audit</code> sub-resource</div>
            <p>
              Add <code>POST</code> and <code>GET</code> on <code>/{consent}/audit</code> to the three
              TPP-facing consent specs: Bank Data Sharing (<code>/account-access-consents</code>), Bank Service
              Initiation (<code>/payment-consents</code>), and Insurance (<code>/insurance-consents</code>).
              The <code>POST</code> appends a record; the <code>GET</code> lists them. No <code>PATCH</code> or
              <code>DELETE</code> &mdash; records are immutable.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · Define the record schema</div>
            <p>
              A shared record: <code>Type</code> (enum, <code>DataDeletion</code> today, extensible),
              <code>Outcome</code> (<code>Deleted</code> / <code>Planned</code> / <code>NotDeleted</code>),
              <code>EventDateTime</code>, and an optional <code>Description</code>. The request body is a
              <code>oneOf</code> keyed on <code>Outcome</code>, so a <code>Planned</code> record must carry
              <code>PlannedDeletionDateTime</code> and a <code>NotDeleted</code> record must carry
              <code>Reason</code>. The Hub assigns an <code>AuditId</code> and a <code>CreationDateTime</code>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · Store against the consent; keep state in reporting</div>
            <p>
              The Consent Manager stores each record against its <code>ConsentId</code>, alongside the
              consent's existing
              <code>GET /consents/{consentId}/audit</code> trail. Whether a required record was posted, and by
              when, is derived in the reporting layer &mdash; not held as state on the consent &mdash; so the
              consent layer needs no new state machine.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 · Documentation — the obligation and the flow</div>
            <p>
              Document the obligation and its window on the
              <RouterLink to="/tech/tpp-standards/v2.1/consent/requirements">consent requirements</RouterLink>
              page, and add the confirmation step to the
              <RouterLink to="/tech/tpp-standards/v2.1/consent/api-guide">consent API guide</RouterLink> and the
              <RouterLink to="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide">Consent Status Event</RouterLink>
              guide (on receiving a revocation or expiry event, delete and post a record).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         07 · DRAFT SCHEMA
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 · Draft schema</div>
          <h2 class="ofp-band__title">The sub-resource, written out</h2>
          <p class="ofp-band__lede">
            A working draft attached to this proposal &mdash; the <code>audit</code> sub-resource on all three
            consent types, with its shared record schema. It opens in the same rendered view as the published
            API specs.
          </p>
        </div>

        <div class="ofp-cards">
          <RouterLink
            to="/proposals/ofp-005/audit-schema"
            class="ofp-card"
            :style="{ '--card-color': '#008B78' }"
          >
            <span class="ofp-card__top" :style="{ background: '#008B78' }" />
            <div class="ofp-card__meta">
              <span class="ofp-card__cat" :style="{ color: '#008B78' }">Consent audit</span>
            </div>
            <h3 class="ofp-card__title">consent-audit-schema.yaml</h3>
            <p class="ofp-card__desc">
              The append-only <code>audit</code> sub-resource — POST and GET on <code>/{consent}/audit</code>
              across Bank Data Sharing, Bank Service Initiation, and Insurance.
            </p>
            <div class="ofp-card__foot">
              <span class="ofp-card__cta">Open rendered schema</span>
              <span class="ofp-card__arrow" :style="{ color: '#008B78' }">&rarr;</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         08 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 08 · Pros</div>
          <h2 class="ofp-band__title">What an audit sub-resource buys</h2>
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 09 · Cons</div>
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
