<route lang="yaml">
meta:
  title: 'OFP-016 · Paginate the ATM API'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-016. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Scope, Technical changes, Rollout, Alternatives,
// Questions, Pros, and Cons. Mirrors the layout of OFP-015.
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
const OG_TITLE = 'OFP-016 · Paginate the ATM API'
const OG_DESCRIPTION =
  'GET /atms returns an LFI’s entire ATM estate in one response, with no way to request a slice. From V2.2, LFIs paginate Ozone Connect GET /atm on page and page-size, and the API Hub returns the standard Links envelope and Meta.TotalPages to the TPP — the same model as Bank Data Sharing and Products.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-016',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '21 Oct 2026',
  closes: '4 Nov 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

// The three questions asked alongside the vote. These are ALSO held in the
// proposals API (the `questions` column) — that is where the vote form reads
// them from, and where the answers are stored. Kept here so they are readable
// on the page before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'LFIs',
    q: 'How many ATM records does your Ozone Connect GET /atm return today, and how large and how slow is that response? Can you honour page and page-size, in a stable order, by V2.2?',
    why: 'This sizes the problem and the build. The case for pagination rests on how large ATM estates are and how quickly they are growing; the answers also tell us whether a mandatory requirement at V2.2 is realistic for every LFI, or whether some need longer.',
  },
  {
    who: 'TPPs',
    q: 'How do you consume GET /atms today — a periodic full sync, on-demand lookups, or something else? Would following Links.Next until it is absent cause you any difficulty?',
    why: 'Pagination changes what a single call returns. A TPP that reads only the first response would silently hold the first 100 ATMs. The answers tell us how many integrations are affected and how much the TPP guide needs to say about walking pages.',
  },
  {
    who: 'TPPs and LFIs',
    q: 'Is a fixed page size of 100, set by the API Hub, right for ATM data — or should TPPs be able to set page-size, or filter the estate (for example by LastUpdatedDateTime), in a later version?',
    why: 'This proposal deliberately adds no TPP-facing query parameters, so it matches Bank Data Sharing and stays small. If there is demand for client-chosen page sizes or a change feed, that is a separate proposal; the answers tell us whether to write it.',
  },
]

const pros = [
  'Responses are bounded. The size of one GET /atms response no longer grows with the LFI’s ATM estate, which protects the API Hub, the LFI, and the TPP from payloads that only get larger.',
  'One pagination model across the standard. ATMs adopt the page / page-size contract LFIs already implement for Bank Data Sharing and the Links envelope TPPs already parse for Products and Account Information.',
  'Mandatory pagination is predictable. Because every LFI paginates, a TPP writes one loop that works against every bank, instead of handling some that page and some that do not.',
  'A failure costs one page, not the whole estate. A timeout or 5xx part-way through is retried for the page that failed, not by fetching every ATM again.',
  'The TPP request does not change. The first call to GET /atms is the same unparameterised request it is today; the TPP only has to follow Links.Next.',
  'TotalRecords and LastUpdatedDateTime are kept, so a TPP that checks the estate’s freshness or size before syncing can keep doing so from page 1.',
]

const cons = [
  'Every LFI has to build it. Ozone Connect GET /atm takes no query parameters today, so each LFI must add page and page-size handling, a stable order, and TotalPages.',
  'It is breaking for TPPs at V2.2. A TPP that reads Data from the first response and stops will silently hold only the first page of ATMs. Nothing in the response fails; the data is just incomplete.',
  'More calls for the same data. A full sync of a large estate becomes several requests instead of one, each with its own token check, its own latency, and its own entry in reporting.',
  'Pages can drift during a walk. If an LFI adds or removes an ATM between page requests, a TPP walking the estate can miss or repeat a record. A stable order narrows this, but does not remove it.',
  'It does not help a TPP that only wants what has changed. A full sync still fetches every page; delta retrieval is left for a later proposal.',
]

// What happens today — rendered in the Background section.
const todayExample = `# Today — one call, the whole estate, no way to ask for less
GET /open-finance/atm/v2.2/atms

  API Hub -> Ozone Connect   GET /atm          # no query parameters
  Ozone Connect -> API Hub   200 { "data": [ ...every ATM... ],
                                   "meta": { "LastUpdatedDateTime": "2026-10-20T00:00:00Z",
                                             "TotalRecords": 1240 } }

200
{
  "Data": [ { "ATMId": "ATM-0001", ... }, ... { "ATMId": "ATM-1240", ... } ],
  "Meta": { "LastUpdatedDateTime": "2026-10-20T00:00:00Z", "TotalRecords": 1240 }
}
# No Links. No TotalPages. Every record, in one payload, on every call.`

// The proposed behaviour — rendered in the Recommendation section.
const proposedExample = `# Proposed — same first request, a bounded page, and a link to the next one
GET /open-finance/atm/v2.2/atms

  API Hub -> Ozone Connect   GET /atm?page=1&page-size=100
  Ozone Connect -> API Hub   200 { "data": [ ...ATMs 1-100... ],
                                   "meta": { "LastUpdatedDateTime": "2026-10-20T00:00:00Z",
                                             "TotalRecords": 1240, "TotalPages": 13 } }

200
{
  "Data": [ { "ATMId": "ATM-0001", ... }, ... { "ATMId": "ATM-0100", ... } ],
  "Links": {
    "Self":  "https://rs1.bank.apihub.openfinance.ae/open-finance/atm/v2.2/atms?page=1",
    "First": "https://rs1.bank.apihub.openfinance.ae/open-finance/atm/v2.2/atms?page=1",
    "Next":  "https://rs1.bank.apihub.openfinance.ae/open-finance/atm/v2.2/atms?page=2",
    "Last":  "https://rs1.bank.apihub.openfinance.ae/open-finance/atm/v2.2/atms?page=13"
  },
  "Meta": { "LastUpdatedDateTime": "2026-10-20T00:00:00Z", "TotalRecords": 1240, "TotalPages": 13 }
}
# The TPP follows Links.Next until it is absent.`

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
// page (ofp-016.outcome.vue / ofp-016.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-016.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-016.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Paginate the ATM API',
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

        <h1 class="ofp__title">Paginate the ATM API</h1>
        <p class="ofp__summary">
          <code>GET /atms</code> returns an LFI&rsquo;s <strong>entire ATM estate in one response</strong>,
          with no <code>Links</code> and no way to ask for a slice. This proposal brings ATMs into line
          with Bank Data Sharing and Products: from <strong>V2.2</strong>, every LFI <strong>MUST</strong>
          paginate its Ozone Connect <code>GET /atm</code> on <code>page</code> and
          <code>page-size</code>, and the API Hub returns the standard <code>Links</code> envelope and
          <code>Meta.TotalPages</code> to the TPP. The TPP&rsquo;s first request does not change.
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
            set out in section 07 below. The first asks LFIs how large their ATM estates are and whether
            they can paginate by V2.2; the second asks TPPs how they consume ATM data today; the third
            asks both whether TPP-controlled page sizes or filters are wanted later.
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
          <h2 class="ofp-band__title">A list endpoint with no pages</h2>
        </div>
        <div class="ofp-prose">
          <p>
            The ATM API publishes an LFI&rsquo;s ATM network to TPPs: each record carries the ATM&rsquo;s
            location, opening hours, supported services, currencies, accessibility features and fees.
            The TPP calls
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/atms/open-api/atms"><code>GET /atms</code></RouterLink>
            on the API Hub, and the Hub proxies the request to the LFI&rsquo;s Ozone Connect
            <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/atms/open-api/atm"><code>GET /atm</code></RouterLink>
            endpoint.
          </p>
          <p>
            Neither side of that call can ask for less than everything. Ozone Connect
            <code>GET /atm</code> takes no query parameters, and the TPP-facing response
            (<code>AEReadAtms1</code>) has only <code>Data</code> and <code>Meta</code>, with
            <code>Meta</code> carrying <code>LastUpdatedDateTime</code> and <code>TotalRecords</code>. There
            is no <code>Links</code> object and no <code>TotalPages</code>. Every call returns every ATM:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today &mdash; the whole estate on every call</div>
            <pre class="ofp-code__pre">{{ todayExample }}</pre>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Why this needs changing</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The response has no upper bound.</strong> Its size is set by the LFI&rsquo;s ATM
                estate, not by the standard. Each record is large (opening hours per day, service and
                currency arrays, a full postal address and geolocation), so a large network produces a
                large payload. That payload grows as the network grows, and every hop &mdash; Ozone
                Connect, the API Hub and the TPP &mdash; has to carry it in one go.
              </li>
              <li>
                <strong>A failure costs the whole estate.</strong> A timeout or a <code>5xx</code> part-way
                through cannot be resumed. The only retry is to request every ATM again.
              </li>
              <li>
                <strong>It is out of step with the rest of the standard.</strong> Bank Data Sharing lists
                are paginated on <code>page</code> and <code>page-size</code> at Ozone Connect, and the Hub
                converts the LFI&rsquo;s <code>meta</code> into a TPP-facing <code>Links</code> envelope
                (see <RouterLink to="/knowledge-base/articles/pagination">Pagination &mdash; LFI meta to TPP Links</RouterLink>).
                Products, the other public-data API, already requires <code>Links</code> and
                <code>Meta.TotalPages</code> on <code>GET /products</code>. ATMs are the exception.
              </li>
              <li>
                <strong>V2.2 is the point to fix it.</strong> Adding <code>Links</code> to a response
                defined with <code>additionalProperties: false</code> changes its shape, so it belongs in
                a new version rather than an errata.
              </li>
            </ul>
          </div>
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
          <h2 class="ofp-band__title">Use the Data Sharing pagination model for ATMs</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>At Ozone Connect, pagination is page-based and mandatory.</strong> The API Hub sends
            <code>page</code> and <code>page-size</code> on every call to <code>GET /atm</code>. The LFI
            returns that slice of its estate, in a stable order, and adds <code>TotalPages</code> to the
            <code>meta</code> it already returns.
          </p>
          <p>
            <strong>For the TPP, pagination is link-based.</strong> The Hub converts the LFI&rsquo;s
            <code>meta</code> into the same <code>Links</code> envelope (<code>Self</code>,
            <code>First</code>, <code>Prev</code>, <code>Next</code>, <code>Last</code>) and
            <code>Meta.TotalPages</code> that Products and Account Information already return. The
            TPP&rsquo;s first request is unchanged. To read the whole estate, the TPP follows
            <code>Links.Next</code> until it is absent.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed &mdash; page 1 of 13, with a link to page 2</div>
            <pre class="ofp-code__pre">{{ proposedExample }}</pre>
          </div>

          <p>
            This is the pattern LFIs already implement for Bank Data Sharing and the API Hub already
            operates. The only differences are that pagination is <strong>required</strong> here, not
            optional, and that ATMs are ordered by identifier rather than by date.
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
          <h2 class="ofp-band__title">The rules</h2>
          <p class="ofp-band__lede">
            The rules follow the Bank Data Sharing pagination guide wherever they can. The ordering rule
            is new, because ATMs have no natural date to order by.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The API Hub MUST send <code>page</code> and <code>page-size</code></strong> on every
                request to Ozone Connect <code>GET /atm</code>. <code>page</code> is 1-indexed and defaults
                to <code>1</code>; <code>page-size</code> defaults to <code>100</code>, in line with the
                Operating Guidelines default used for Bank Data Sharing.
              </li>
              <li>
                <strong>The LFI MUST paginate.</strong> It MUST return only the records for the requested
                <code>page</code> and <code>page-size</code>, and MUST NOT return the full estate in place of
                a page. There is no <code>paginated: false</code> option for ATMs.
              </li>
              <li>
                <strong>The order MUST be stable.</strong> The LFI MUST order its ATMs by
                <code>ATMId</code> ascending, and SHOULD use <code>LFIBrandId</code> ascending as a
                tiebreaker. It MUST apply this order before cutting the page, so that the same ATM does not
                move between pages while a TPP is reading them.
              </li>
              <li>
                <strong><code>meta</code> MUST describe the full estate.</strong> <code>TotalRecords</code>
                is the number of ATMs across all pages. <code>TotalPages</code> is
                <code>ceil(TotalRecords / page-size)</code>. <code>LastUpdatedDateTime</code> is the time
                the estate&rsquo;s data was last updated, and is the same on every page.
              </li>
              <li>
                <strong>Empty results return <code>200</code>.</strong> An LFI with no ATMs returns an empty
                <code>data</code> array with <code>TotalRecords</code> and <code>TotalPages</code> of
                <code>0</code>, as in Bank Data Sharing. It MUST NOT return <code>404</code>.
              </li>
              <li>
                <strong>The TPP-facing response MUST carry <code>Links</code> and
                <code>Meta.TotalPages</code>.</strong> <code>Links.Self</code> is always present;
                <code>First</code>, <code>Prev</code>, <code>Next</code> and <code>Last</code> are present
                when they apply. <code>Meta.TotalRecords</code> and <code>Meta.LastUpdatedDateTime</code> are
                kept.
              </li>
              <li>
                <strong>The TPP request does not change.</strong> No TPP-facing query parameters are added
                to the request definition. The <code>page</code> value in the Hub&rsquo;s links is set by the
                Hub, and the TPP MUST treat each link as opaque and follow it as given. The TPP cannot set
                <code>page-size</code>.
              </li>
              <li>
                <strong>Out of scope: filtering and delta retrieval.</strong> This proposal adds no filters
                by location, service or <code>LastUpdatedDateTime</code>. Question 03 asks whether those are
                wanted in a later proposal.
              </li>
            </ul>
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
            Two schema changes in the standard, two parameters in Ozone Connect, and a
            <code>meta</code>-to-<code>Links</code> conversion at the Hub that already exists for Data
            Sharing.
          </p>
        </div>

        <div class="ofp-rules">
          <div class="ofp-rules__label">Who implements what</div>
          <ul class="ofp-rules__list">
            <li>
              <strong>LFI &mdash; paginate <code>GET /atm</code>.</strong> Accept <code>page</code> and
              <code>page-size</code>, order the estate by <code>ATMId</code>, return the requested slice, and
              add <code>TotalPages</code> to <code>meta</code>.
            </li>
            <li>
              <strong>API Hub &mdash; send the parameters and build the links.</strong> Send
              <code>page</code> and <code>page-size</code> to Ozone Connect, and convert the LFI&rsquo;s
              <code>meta</code> into <code>Links</code> and <code>Meta.TotalPages</code> on the TPP
              response, as it does for Bank Data Sharing.
            </li>
            <li>
              <strong>TPP &mdash; follow <code>Links.Next</code>.</strong> A TPP that needs the whole estate
              loops on <code>Links.Next</code> until it is absent. The first request is unchanged.
            </li>
          </ul>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards specification &mdash; <code>uae-atm-openapi.yaml</code></div>
            <p>
              Add a required <code>Links</code> property to <code>AEReadAtms1</code>, using the same
              <code>Links</code> schema as <code>uae-product-openapi.yaml</code> (<code>Self</code> required;
              <code>First</code>, <code>Prev</code>, <code>Next</code>, <code>Last</code> optional). Add a
              required <code>TotalPages</code> to <code>AEReadAtmsMeta1</code>, alongside the existing
              <code>LastUpdatedDateTime</code> and <code>TotalRecords</code>. Update the
              <code>GET /atms</code> description to state that results are paginated and the TPP follows
              <code>Links.Next</code>. The per-ATM <code>Links.FeesUri</code> object inside each
              <code>Data</code> item is unrelated and does not change. Targets <strong>V2.2</strong>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; Ozone Connect &mdash; <code>uae-ozone-connect-bank-open-data-openapi.yaml</code></div>
            <p>
              Add required <code>page</code> and <code>page-size</code> query parameters to
              <code>GET /atm</code>, defined as in the Bank Data Sharing Ozone Connect spec (integer,
              defaults <code>1</code> and <code>100</code>). Add a required <code>TotalPages</code> to the
              ATM <code>meta</code> (<code>UAEATMAPI.AEReadAtmsMeta1</code>), in the PascalCase that object
              already uses. Add the ordering and full-estate <code>meta</code> rules to the endpoint
              description.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; API Hub</div>
            <p>
              Send <code>page</code> and <code>page-size</code> on every <code>GET /atm</code> call, and apply
              the <code>meta</code>-to-<code>Links</code> conversion used for Bank Data Sharing to the V2.2
              ATM response. Calls to the V2.1 base path keep the V2.1 contract.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; Documentation</div>
            <p>
              Write the LFI
              <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/atms/requirements">ATM requirements</RouterLink>
              page, which is currently a placeholder, covering pagination and ordering. Update the LFI and
              TPP ATM API Guides with the request, the response and a worked page walk. Add ATMs to the
              <RouterLink to="/knowledge-base/articles/pagination">Pagination</RouterLink> knowledge-base
              article, and record the change in the version changelog.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">05 &middot; Functional certification</div>
            <p>
              Add an ATM scenario that walks every page of the LFI&rsquo;s estate. It asserts that
              <code>TotalPages</code> and <code>TotalRecords</code> are consistent, that no page exceeds
              <code>page-size</code>, that each <code>ATMId</code> appears exactly once across the walk, and
              that the order is the same when the walk is repeated.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · ROLLOUT
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; Rollout</div>
          <h2 class="ofp-band__title">A V2.2 change, with V2.1 left as it is</h2>
          <p class="ofp-band__lede">
            The response shape changes, so the change lands with the version. TPPs opt in by moving to
            V2.2.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">How it lands</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>V2.1 is unchanged.</strong> A TPP calling <code>/open-finance/atm/v2.1/atms</code>
                keeps receiving the full estate in one response, without <code>Links</code>, for as long as
                V2.1 is supported.
              </li>
              <li>
                <strong>LFIs conform by V2.2.</strong> Pagination is a V2.2 conformance requirement for every
                LFI that offers the ATM API, and is tested in functional certification.
              </li>
              <li>
                <strong>TPPs move when they move to V2.2.</strong> The migration is a loop on
                <code>Links.Next</code>. The TPP ATM API Guide will state plainly that the first page is not
                the whole estate, because that is the one way this change can go wrong without anything
                failing.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         06 · ALTERNATIVES CONSIDERED
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; Alternatives considered</div>
          <h2 class="ofp-band__title">Other ways to bound the response</h2>
        </div>
        <div class="ofp-prose">
          <div class="ofp-changes">
            <div class="ofp-change">
              <div class="ofp-change__label">01 &middot; Optional pagination, as for most Data Sharing lists</div>
              <p>
                The Hub always sends <code>page</code> and <code>page-size</code>, and each LFI decides
                whether to honour them, signalling its choice with <code>meta.paginated</code>. This avoids
                work for LFIs with small estates, but it leaves the response unbounded at exactly the banks
                where it matters. It also means a TPP cannot know in advance whether a given bank pages.
                For a public-data endpoint that every TPP reads in full, one predictable behaviour is worth
                more than the saved effort.
              </p>
            </div>

            <div class="ofp-change">
              <div class="ofp-change__label">02 &middot; The API Hub paginates on the LFI&rsquo;s behalf</div>
              <p>
                The LFI keeps returning the full estate, and the Hub fetches it, holds it and serves it to the
                TPP in pages. TPPs get bounded responses and LFIs build nothing. But the largest payload in
                the chain, the one from Ozone Connect to the Hub, stays unbounded. The Hub would also have
                to hold a copy of each LFI&rsquo;s estate between page requests and decide when that copy is
                stale.
              </p>
            </div>

            <div class="ofp-change">
              <div class="ofp-change__label">03 &middot; Cursor-based pagination</div>
              <p>
                The LFI returns an opaque continuation token instead of page numbers. That is more robust
                to records changing during a walk, but no other API in the standard uses it. It would mean
                a second pagination model for LFIs to implement and for the Hub to translate, and would
                remove <code>Last</code> and <code>TotalPages</code>, which TPPs use to size a sync.
              </p>
            </div>

            <div class="ofp-change">
              <div class="ofp-change__label">04 &middot; A <code>LastUpdatedDateTime</code> filter instead of pages</div>
              <p>
                TPPs request only ATMs changed since their last sync. This reduces repeat traffic, but the
                first sync, and any full refresh, still returns the whole estate in one response. It
                complements pagination rather than replacing it, which is why question 03 asks about it as
                a possible follow-up.
              </p>
            </div>
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
          <h2 class="ofp-band__title">Three questions, asked with the vote</h2>
          <p class="ofp-band__lede">
            These appear as optional boxes when you confirm your vote. The first sizes the work for LFIs,
            the second the migration for TPPs, and the third decides whether a follow-up proposal is
            needed.
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
          <h2 class="ofp-band__title">What pagination buys</h2>
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
</style>
