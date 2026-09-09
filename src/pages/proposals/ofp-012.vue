<route lang="yaml">
meta:
  title: 'OFP-012 · Return transactions and statements newest-first'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-012. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Scope, Technical changes, Cost, Questions, Pros,
// and Cons. Styling follows the site's editorial system and mirrors OFP-008.
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
const OG_TITLE = 'OFP-012 · Return transactions and statements newest-first'
const OG_DESCRIPTION =
  'Neither specification says which end of history a transactions or statements response starts from. This proposal makes descending date order — newest first — a requirement on both endpoints at V2.2, for every LFI including those already live, and asks whether TPPs need to request ascending order later.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-012',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '8 Sep 2026',
  closes: '23 Sep 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

// The three questions asked alongside the vote. These are ALSO held in the
// proposals API (the `questions` column) — that is where the vote form reads
// them from, and where the answers are stored. Kept here so they are readable
// on the page before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'LFIs already live with transactions',
    q: 'Would newest-first ordering change your implementation, and what work would it involve?',
    why: 'This is the question that decides whether the requirement is a one-line sort clause or a change to how a feed is built. If a meaningful number of live LFIs answer that it is structural, the transition treatment below is the part to revisit.',
  },
  {
    who: 'TPPs',
    q: 'Does newest-first work for your use cases, or do you need to request ascending order?',
    why: 'Descending suits the common case — showing recent activity. Reconciliation and running-balance reconstruction read oldest-first, and under pagination that means collecting every page before processing. We need to know whether that cost is real for anyone.',
  },
  {
    who: 'LFIs',
    q: 'Could you support a TPP-requested asc/desc sort control, or is a fixed descending order materially easier?',
    why: 'A control is only worth specifying if LFIs can implement it. If descending-only is materially easier, that settles it — and the answers to the TPP question tell us what we are asking TPPs to give up.',
  },
]

const pros = [
  'TPPs can rely on the order for the first time. “Show me this customer’s recent activity” becomes the first page of the response rather than a full pull-and-sort of the filtered set.',
  'Removes a silent interop difference. Ordering is the kind of assumption a TPP makes against one LFI in the sandbox and only discovers is wrong against another in production — where it surfaces as a mis-ordered account view, not an error.',
  'Newest-first matches how account activity is read almost everywhere else — banking apps, card statements, the account views TPPs are building. It is the direction the common case wants.',
  'Cheapest to fix now. Ordering is set by the query that already serves these endpoints, so for most LFIs this is a sort clause and a regression test — and only a handful of LFIs are live to change.',
  'Tightens pagination stability at the same time. The tiebreaker guidance addresses a real failure: rows sharing a date can shuffle between page requests, so a record appears twice on one page and never on another.',
  'Makes conformance testable. A functional check can assert newest-first across a multi-page query; “deterministic” alone is hard to test meaningfully.',
]

const cons = [
  'It is a behaviour change for any LFI already live that returns oldest-first, and this proposal gives them no grace period — they conform at V2.2 with everyone else.',
  'Consumers that read forwards — reconciliation, ledger replay, reconstructing a running balance — must reverse the order themselves, and under pagination that means collecting the whole filtered set before they can start. The cost of the choice lands on that use case.',
  'If the consultation says a sort control is wanted, LFIs implement ordering twice: a fixed descending order now, and a direction control in a later version.',
  'The statement ordering key is less self-evident than the transaction one. An LFI that thinks of a statement by its issue date (StatementDate) rather than the start of its period (OpeningDate) has a mapping to make, even though the date filters already act on OpeningDate.',
  'It settles direction without settling choice. A TPP that wants ascending has no way to ask for it until a later proposal, and this one deliberately does not answer that.',
]

// What the specs say today — rendered in the Background section.
const todayExample = `# Today — neither specification constrains the order

# TPP-facing (uae-account-information-openapi.yaml)
GET /accounts/{AccountId}/transactions?fromBookingDateTime=...&toBookingDateTime=...
GET /accounts/{AccountId}/statements?fromStatementDate=...&toStatementDate=...

# Ozone Connect (uae-ozone-connect-bank-data-sharing-openapi.yaml)
GET /accounts/{accountId}/transactions?fromBookingDateTime=...&page=1&page-size=100
  "Return all transactions for the account, filtered on date range parameters
   as required."

# No sort parameter. No ordering statement. A TPP holding page 1 has no way to
# know whether it is this month's activity or activity from two years ago — and
# no way to ask for the other one.`

// The proposed rule — rendered in the Recommendation section.
const proposedExample = `# Proposed — one direction, defined for both endpoints

GET /accounts/{accountId}/transactions
  order by  bookingDateTime  DESC   # MUST   — newest first
            transactionId    DESC   # SHOULD — stable tiebreaker

GET /accounts/{accountId}/statements
  order by  openingDate      DESC   # MUST   — newest first
            statementId      DESC   # SHOULD — stable tiebreaker

# Applied to the FILTERED result set, before it is paged. Page 1 therefore
# always carries the most recent records the query matched.`

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
// page (ofp-012.outcome.vue / ofp-012.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-012.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-012.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Return transactions and statements newest-first',
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

        <h1 class="ofp__title">Return transactions and statements newest-first</h1>
        <p class="ofp__summary">
          Neither specification says which end of history a transactions or statements response
          starts from. A TPP holding page 1 cannot tell whether it is this month&rsquo;s activity or
          activity from two years ago, and has no way to ask for the other one. This proposal makes
          <strong>descending date order &mdash; newest first &mdash; a requirement</strong> on both
          endpoints at V2.2, for every LFI including those already live. Whether TPPs should later be
          able to request ascending order is asked, not answered.
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
            each person may vote once. <strong>Three questions are attached to this vote</strong> &mdash;
            set out in section 06 below &mdash; and the answers matter more than the tally: they decide
            whether the transition treatment holds and whether a sort control follows in a later version.
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
          <h2 class="ofp-band__title">Nothing says which end of history a page starts from</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <RouterLink to="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions"><code>GET /accounts/{AccountId}/transactions</code></RouterLink>
            and
            <RouterLink to="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements"><code>GET /accounts/{AccountId}/statements</code></RouterLink>
            both return a list that can run to thousands of records across a mandated two years of
            history. Neither the TPP-facing standard nor the Ozone Connect specification says what
            order that list arrives in, and neither offers a parameter to ask for one.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today &mdash; the order is whatever each LFI&rsquo;s query happens to produce</div>
            <pre class="ofp-code__pre">{{ todayExample }}</pre>
          </div>

          <p>
            The only ordering rule that exists anywhere is ours, not the specification&rsquo;s: the
            <RouterLink to="/knowledge-base/articles/pagination">Pagination</RouterLink> article
            requires an LFI to return records in a <strong>deterministic</strong> order so that paging
            is stable across successive page requests. Deterministic is not a direction. An LFI
            returning oldest-first and an LFI returning newest-first are both conformant today, and a
            TPP integrating with both gets two different answers to the same question.
          </p>
          <p>
            The consequences land entirely on the TPP, and they are not small. It cannot treat page 1
            as recent activity, so the common case &mdash; showing a customer what has just happened on
            their account &mdash; requires pulling <em>every</em> page of the filtered set and sorting
            client-side before anything can be displayed. It cannot bound work by asking for the last
            fifty transactions. And because the difference is invisible until it meets a second LFI,
            it is the kind of assumption that survives the sandbox and fails in production &mdash;
            surfacing as a mis-ordered account view rather than an error anyone can catch.
          </p>
          <p>
            The related weakness is <strong>stability</strong>. Both endpoints filter on a date field
            that is not unique: transactions share a <code>bookingDateTime</code> routinely, and
            statements carry an <code>OpeningDate</code> that is a date, not a timestamp. If an LFI
            orders on that field alone, two records that tie can be returned in either order on either
            request &mdash; so walking pages can hand a TPP the same record twice and never show it
            another. That is permitted by &ldquo;deterministic&rdquo; only on a generous reading of it.
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 &middot; Recommendation</div>
          <h2 class="ofp-band__title">Newest first, on both endpoints, from V2.2</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Transactions and statements MUST be returned in descending date order &mdash;
            newest first.</strong> The ordering applies to the filtered result set and is applied
            before pagination, so the first page always carries the most recent records the query
            matched.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed &mdash; the rule, stated once, for both endpoints</div>
            <pre class="ofp-code__pre">{{ proposedExample }}</pre>
          </div>

          <p>
            Descending is chosen because it serves the common case without a client-side pass. Account
            aggregation, spending views, notifications, and the &ldquo;what happened recently&rdquo;
            question that most TPP journeys open with all read backwards from today &mdash; and it is
            the direction a customer already sees in every banking app they use. Under pagination the
            direction decides which page holds the answer: newest-first puts it on page 1, oldest-first
            puts it on the last page the TPP can only reach by fetching all of them.
          </p>
          <p>
            <strong>The requirement applies to every LFI at V2.2, including those already live.</strong>
            No grace period is proposed. Ordering is a property of the query that already serves these
            endpoints rather than of the data model, so for most implementations this is a sort clause
            and a regression test &mdash; and the cost of leaving it unspecified compounds with every
            LFI and TPP that joins. Whether that reading holds for LFIs who have already built is the
            first question attached to this vote, and a clear answer to the contrary is the thing that
            would reopen it.
          </p>
          <p>
            <strong>This proposal does not introduce a way to request ascending order.</strong> A
            direction control &mdash; a request header or query parameter carrying
            <code>asc</code>&nbsp;/&nbsp;<code>desc</code> &mdash; is a reasonable thing to want and a
            different thing to specify: it doubles what an LFI must implement and test, and it is only
            worth defining if LFIs can support it and TPPs would use it. Both are asked in section 06.
            If the answers point that way, a control follows as its own proposal against a later
            version, with descending remaining the default.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · SCOPE AND BEHAVIOUR
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Scope and behaviour</div>
          <h2 class="ofp-band__title">What &ldquo;newest first&rdquo; means, precisely</h2>
          <p class="ofp-band__lede">
            An ordering rule is only worth having if two LFIs reading it independently produce the same
            sequence, so the key, the tiebreaker, and the interaction with filtering and paging all have
            to be pinned down.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>Transactions MUST be ordered by <code>bookingDateTime</code>,
                descending.</strong> This is the field the existing
                <code>fromBookingDateTime</code>&nbsp;/&nbsp;<code>toBookingDateTime</code> filters
                already act on, so filtering, ordering, and paging all address the same value.
              </li>
              <li>
                <strong>Statements MUST be ordered by <code>OpeningDate</code>,
                descending</strong> &mdash; the start of the statement period. Again this is the field
                the <code>fromStatementDate</code>&nbsp;/&nbsp;<code>toStatementDate</code> filters act
                on. <code>StatementDate</code> (when the statement was issued) and
                <code>ClosingDate</code> are deliberately not used: ordering on a field the filters do
                not use would let a statement fall inside the requested range and outside the expected
                position.
              </li>
              <li>
                <strong>A stable, unique tiebreaker SHOULD be applied</strong> &mdash;
                <code>transactionId</code> for transactions, <code>StatementId</code> for statements
                &mdash; so that records sharing a date hold a fixed relative position across requests.
                Without one, ties can be returned in either order on either request, and walking pages
                can duplicate a record on one page while dropping it from another. It is a SHOULD rather
                than a MUST because an LFI whose ledger already guarantees a total order by other means
                satisfies the intent; what matters is that ties never move.
              </li>
              <li>
                <strong>Ordering is applied to the filtered result set, before pagination.</strong> This
                extends the existing rule that filtering is applied first and pagination to the filtered
                set; ordering sits between them. <code>totalRecords</code> and <code>totalPages</code>
                are unaffected.
              </li>
              <li>
                <strong>The order does not vary with the request.</strong> Date filters,
                <code>page</code>, <code>page-size</code>, and the <code>o3-fx-transactions</code> header
                narrow <em>which</em> records are returned; none of them change the direction they are
                returned in.
              </li>
              <li>
                <strong>The API Hub passes the LFI&rsquo;s order through unchanged.</strong> It converts
                the LFI&rsquo;s <code>meta</code> into the TPP-facing <code>Links</code> envelope and does
                not re-sort, so the order the TPP observes is the order Ozone Connect produced. The
                requirement therefore has to be met at the LFI; there is no Hub-side correction.
              </li>
              <li>
                <strong>No sort control is introduced.</strong> Neither specification gains a sort
                parameter or header under this proposal. The order is fixed, and a TPP that needs
                ascending reverses it itself.
              </li>
              <li>
                <strong>Other list endpoints are out of scope.</strong>
                <code>/beneficiaries</code>, <code>/direct-debits</code>, <code>/scheduled-payments</code>,
                <code>/standing-orders</code>, <code>/products</code>, <code>/accounts</code> and
                <code>/accounts/{accountId}/customer</code> are unaffected and remain subject only to the
                existing deterministic-order rule. They are small, optionally paginated, and mostly carry
                no obvious date to sort on.
              </li>
            </ul>
          </div>
          <p>
            Insurance Data Sharing is not covered by this proposal. If the ecosystem wants the same
            treatment for policy-level history, it should be raised separately rather than folded in
            here, where the endpoints, filters, and pagination behaviour are different.
          </p>
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
            No schema changes, no new fields, no new parameters. Four endpoint descriptions, the
            documentation that describes them, and a conformance check.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Ozone Connect specification</div>
            <p>
              In the bank data sharing specification, state the ordering requirement on
              <code>GET /accounts/{accountId}/transactions</code> and
              <code>GET /accounts/{accountId}/statements</code> &mdash; the key, the direction, the
              tiebreaker, and that ordering precedes pagination. This is the normative home of the rule,
              because this is the surface the LFI implements. Targets <strong>V2.2</strong>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; Standards specification</div>
            <p>
              Mirror the statement on the TPP-facing
              <code>GET /accounts/{AccountId}/transactions</code> and
              <code>GET /accounts/{AccountId}/statements</code> in the account information
              specification, so a TPP reading only the standard knows what it can rely on without
              inferring it from the LFI-facing spec. No request or response schema changes.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; Documentation</div>
            <p>
              Tighten the ordering line in the
              <RouterLink to="/knowledge-base/articles/pagination">Pagination</RouterLink> article and the
              LFI
              <RouterLink to="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/pagination">Bank Data Sharing &mdash; Pagination</RouterLink>
              guide from &ldquo;deterministic&rdquo; to &ldquo;deterministic and descending&rdquo;, with the
              tiebreaker and the duplicate-record failure it prevents spelled out. Add the guarantee to the
              TPP Data Sharing API guide so it is stated where TPPs read, and record the change as an
              errata entry.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; Functional certification</div>
            <p>
              Add a Data Sharing check that walks a multi-page transactions query and asserts the order is
              descending across the page boundary, and that re-requesting a page returns the same records
              in the same positions. This is what makes the requirement enforceable rather than
              aspirational &mdash; and it is a check that &ldquo;deterministic&rdquo; on its own could
              never support.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · WHAT THIS COSTS TO BUILD
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; What this costs to build</div>
          <h2 class="ofp-band__title">A sort clause for most LFIs &mdash; but not, necessarily, for all</h2>
        </div>
        <div class="ofp-prose">
          <p>
            For an LFI serving these endpoints from a query against a ledger or transaction store, this
            is an <code>ORDER BY</code>, a tiebreaker column, and a regression test that walks two pages.
            That is the expectation this proposal is written on, and it is why no grace period is offered.
          </p>
          <p>
            It is not universally true. An LFI serving transactions from a cache, a materialised feed, or
            an event log built forwards in time may find that reversing the order means reversing how that
            feed is built or indexed &mdash; a different size of change, and one that has to be scheduled
            rather than absorbed. An LFI whose statement records are keyed by issue date rather than
            <code>OpeningDate</code> has a mapping to make on top. <strong>Nobody outside those LFIs can
            size this, which is exactly why it is the first question attached to the vote.</strong>
          </p>
          <p>
            For a TPP, conforming costs nothing &mdash; the guarantee only adds something to rely on. The
            cost falls on the TPP that wanted the other direction: reconciliation and running-balance work
            reads forwards, and reversing a paginated response means holding the whole filtered set before
            processing can start. That is a real cost, and section 06 asks who carries it.
          </p>
          <p>
            A vote in favour is a statement that your institution would <em>conform to</em> this &mdash; an
            LFI that it would return newest-first at V2.2 without a transition period, a TPP that it would
            build against a fixed descending order. Answering the questions matters more than the tally: a
            For vote with &ldquo;this is a two-line change for us&rdquo; and a For vote with &ldquo;this
            rebuilds our feed&rdquo; mean different things, and the second is what would change the
            proposal.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         06 · QUESTIONS ATTACHED TO THIS VOTE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; Questions</div>
          <h2 class="ofp-band__title">Three questions, asked with the vote</h2>
          <p class="ofp-band__lede">
            These appear as optional boxes when you confirm your vote. Answer the ones addressed to you
            &mdash; every voter sees all three. The vote decides descending order; these answers decide
            whether the transition holds and whether a direction control follows.
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
         07 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 &middot; Pros</div>
          <h2 class="ofp-band__title">What a defined order buys</h2>
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
         08 · CONS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 08 &middot; Cons</div>
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
</style>
