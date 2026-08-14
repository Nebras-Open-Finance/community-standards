<route lang="yaml">
meta:
  layout: internal
  title: 'OFP-011 · Replace certification testing windows with a Nebras-operated conformance portal'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-011. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, How it works, Nebras as a TPP, Data handling,
// What it replaces, Rollout, Pros, Cons, and the open questions. Styling
// follows the site's editorial system and mirrors OFP-008 / OFP-010.
import { ref, computed, onMounted, watch, type Component } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'
import PvProposalTabs from '@/components/proposals/PvProposalTabs.vue'

// Per-page link-preview override: a tailored title + description so a shared
// link to this proposal reads as the proposal itself, not the site default.
const OG_TITLE = 'OFP-011 · Replace certification testing windows with a Nebras-operated conformance portal'
const OG_DESCRIPTION =
  'Nebras registers as a TPP and operates a portal that drives certification scenarios against an LFI’s implementation — in pre-production for functional certification, and in production in place of waiting for a buddy TPP. LFIs click through scenarios instead of running a containerised harness and Postman collections, and the ecosystem gains a standing, published record of how each LFI actually behaves.'
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
  id: 'OFP-011',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '14 Aug 2026',
  closes: '4 Sep 2026',
  priority: 'high' as Priority,
  // Not a specification change — nothing in the OpenAPI specs moves. Delivery is
  // an API Hub / portal release, so there is no target standards version.
  version: 'Process change',
}

// The pre-production certification path an LFI walks today.
const stepsPre = [
  {
    n: '01',
    title: 'LFI registers and claims its areas',
    text: 'The LFI signs in to the portal and selects the certification areas it is claiming — bank data sharing, domestic payments, confirmation of payee. The portal presents only the scenarios relevant to those areas.',
  },
  {
    n: '02',
    title: 'The portal presents scenarios, not requests',
    text: 'Each scenario is expressed in the terms of the journey it proves — “retrieve twelve months of transactions for a current account”, “initiate a domestic payment and refund it” — rather than as a sequence of HTTP calls the LFI has to assemble and fire itself.',
  },
  {
    n: '03',
    title: 'The LFI clicks through',
    text: 'Nebras drives the traffic as a registered TPP: portal to API Hub, API Hub to the LFI’s pre-production Ozone Connect, and back. The LFI authenticates and authorises the consent in its own application exactly as a customer would, so the journey under test is the real one.',
  },
  {
    n: '04',
    title: 'The portal records the outcome and the behaviour',
    text: 'Pass or fail against the scenario, plus what the implementation actually did — which optional fields were populated, which validations rejected what, which error codes came back, how long each call took.',
  },
  {
    n: '05',
    title: 'The evidence pack is generated, not assembled',
    text: 'The LFI raises its Service Desk ticket when it believes it is ready, as today. What it attaches is portal output rather than screenshots, exports, and hand-collated harness logs. Nebras review and sign-off are unchanged.',
  },
]

// The production path — volunteer-driven, replacing the wait for a buddy TPP.
const stepsProd = [
  {
    n: '01',
    title: 'A volunteer opens the portal',
    text: 'The production portal is open to anyone. A volunteer picks an LFI, gives consent, and authenticates at that LFI in the usual way. No buddy TPP has to be found, scheduled, or persuaded.',
  },
  {
    n: '02',
    title: 'They see their own data',
    text: 'The portal shows the volunteer what Open Finance returned for them — their accounts, their transactions, the payment they initiated. The session is useful to the person taking part, which is what makes volunteering worth doing.',
  },
  {
    n: '03',
    title: 'The session doubles as an observation',
    text: 'Behind the volunteer’s view, the portal records how that LFI behaved: what it shared, what it withheld, what it validated, and where its responses differ from the standard or from its peers.',
  },
  {
    n: '04',
    title: 'The record feeds the ecosystem view',
    text: 'Observations accumulate into a standing, published picture of each LFI’s implementation — visible to every TPP, so integration behaviour is read rather than rediscovered.',
  },
]

const pros = [
  'Removes the scheduling dependency that creates the testing window. An LFI’s production proving no longer waits on a buddy TPP being available and willing — the portal is always there, so two LFIs ready in the same week no longer compete for the same scarce attention.',
  'Certification evidence becomes generated rather than assembled. No containerised harness to stand up locally, no Postman collection walked request by request, no screenshots collated by hand — the artefact comes out of the tool that ran the test.',
  'Scenarios are expressed as journeys, so the thing being proved is legible to the people signing it off. An LFI can see what it is being asked to demonstrate without first reading a collection of HTTP requests.',
  'Re-proving a functional change becomes cheap. An LFI that adjusts its implementation after certification can re-run the affected scenarios rather than reassembling a full evidence pack, which makes small corrections worth making.',
  'TPPs stop paying the discovery cost individually. Today each TPP learns how an LFI behaves — which optional fields it populates, which validations it applies — by integrating and finding out. Publishing that record once shortens onboarding for every TPP.',
  'Nebras gains standing visibility of production conformance. Deviation from the standard is currently observed at a point in time during certification; this makes it observable continuously, which is what turns standardisation from an assertion into something we can see.',
  'One implementation of the scenarios, rather than one per LFI. Where a harness is run locally, differences in how it is run become differences in what was proved. A hosted portal removes that variance.',
]

const cons = [
  'Nebras becomes a registered participant in the market it operates and whose standard it authors. The limitation to testing is a published policy commitment rather than a technical control, so it rests on Nebras’s conduct and on being seen to hold to it.',
  'Production conformance depends on volunteers. Real people have to connect real accounts and, for payments, move real money. If volunteers do not come forward for a given LFI, that LFI’s production picture is thin — and this is the part of the design with the least certainty behind it.',
  'Real money moves in production scenarios. A payment initiated in a conformance session is a genuine payment, with genuine consequences if it fails or is misdirected. That is a materially different risk profile from a pre-production harness.',
  'The health view ages between windows. Nebras’s access to a given LFI is granted around a functional change, not held permanently — so the published record describes what was last observed, which may be some time ago, and must be presented as such rather than as a live reading.',
  'It concentrates a shared dependency. Where the harness and collections were artefacts each LFI ran for itself, certification would now route through one Nebras-operated service. Its availability becomes every LFI’s availability.',
  'A scenario portal proves what its scenarios cover, and no more. A gap in the scenario set is a gap in what certification asserts — and unlike a collection an LFI can extend locally, closing it depends on Nebras shipping it.',
  'Building it is a real programme, not a tooling change: a customer-facing production application, a scenario engine, an evidence generator, and a published data surface, all under the obligations that attach to holding a TPP registration.',
]

const todayExample = `# Today — proving an implementation

PRE-PRODUCTION
  LFI stands up the containerised conformance tool locally
  LFI walks the Postman collection for each certification area
  LFI captures results, collates evidence by hand
  LFI raises a Service Desk ticket per area and attaches it

PRODUCTION
  LFI waits for a buddy TPP to be available and willing
  Buddy TPP integrates and exercises the LFI's production implementation
  ... which is the testing window this proposal is trying to remove`

const proposedExample = `# Proposed — the conformance portal

PRE-PRODUCTION
  LFI registers in the portal and selects its certification areas
  Portal presents the scenarios for those areas
  LFI clicks through; Nebras drives the traffic as a registered TPP
  Portal generates the evidence pack
  LFI raises the Service Desk ticket and attaches it   # unchanged

PRODUCTION
  Portal is open to volunteers — connect an account, make a payment
  Volunteer sees their own data; the session is also an observation
  Observations accumulate into a published per-LFI implementation record
  No buddy TPP required`

// What the portal keeps, and for how long — the two classes are deliberately
// separated because they have opposite retention answers.
const dataKeep = [
  { ref: 'Fields an LFI populates', note: 'Which optional fields are present, which are absent, across every scenario run' },
  { ref: 'Validations it applies', note: 'What it rejects, on what grounds, and with which error code' },
  { ref: 'Response shapes and codes', note: 'How the implementation answers, including its edge and failure behaviour' },
  { ref: 'Timings', note: 'Per-call latency against the response-time policy' },
  { ref: 'Scenario outcomes', note: 'Pass / fail per scenario, and the certification evidence derived from it' },
]
const dataDiscard = [
  { ref: 'Balances and transactions', note: 'Held for the session and any live investigation, then discarded on a short cycle' },
  { ref: 'Names and identifiers', note: 'Volunteer identity, account names, Emirates ID — never part of the published record' },
  { ref: 'IBANs and account numbers', note: 'Evaluated against the scenario, not retained beyond the working window' },
  { ref: 'Payment details', note: 'Amounts, creditors, references — retained only as long as a payment can be disputed' },
  { ref: 'Anything customer-identifying', note: 'Excluded from the ecosystem view by construction, not by redaction after the fact' },
]

// The open questions put to the internal review.
const asks = [
  {
    n: 'Q1',
    text: 'Volunteer supply is the load the whole production half of this rests on. Production conformance only produces a picture if real people connect real accounts, and for payments, move real money. Is a public volunteer pool realistic, or does this in practice run on LFI and Nebras staff? If the latter, is the observation still representative enough to replace a buddy TPP?',
  },
  {
    n: 'Q2',
    text: 'Windowed access versus a current picture. Nebras’s ability to call a given LFI is granted around a functional change, not held permanently — which means production observation stops between windows while the published view stays up. Is an explicitly dated “last observed” record acceptable to TPPs, or does the view need a standing low-volume window to stay useful?',
  },
  {
    n: 'Q3',
    text: 'How much of an LFI’s implementation record should be public? The value to TPPs comes from the differences being visible — but the same record makes an LFI’s gaps visible to its competitors. Where is the line between transparency that shortens onboarding and exposure an LFI would reasonably object to?',
  },
  {
    n: 'Q4',
    text: 'Is a policy commitment sufficient for Nebras holding a production TPP registration? Nebras would be the operator of the API Hub, the author of the standard, and a registered participant at the same time. The recommendation is an ordinary registration limited by published policy rather than a restricted role in the trust framework. Does that need a technical control, a regulatory notification, or both?',
  },
  {
    n: 'Q5',
    text: 'Who carries a failed or misdirected production payment made in a conformance session? The volunteer initiated it, Nebras drove it, and the LFI executed it. This needs an answer before the payments scenarios go live, not after.',
  },
  {
    n: 'Q6',
    text: 'What is the route for closing a scenario gap? Certification would assert exactly what the scenario set covers. When production observation shows something the scenarios miss, how quickly can a scenario be added, and does adding one re-open certifications already granted under the old set?',
  },
]

// ─── Voting ─────────────────────────────────────────────────────────────────
// Live tally + vote submission are backed by the proposals API (D1) via
// useProposals. PvVotePanel takes a Proposal-shaped object; only id/status/
// closes are read by the panel, the rest come from `meta` above.
const { myVotes, setVote, submitVote, hydrate, loadOne, loadMe, metaById } = useProposals()

const apiMeta = computed(() => metaById.value[meta.id])

const closesIn = ref('')
const status = ref<Status>('draft')
const priority = ref<Priority>(meta.priority)
const openedDisplay = ref(meta.opened)
const closesDisplay = ref(meta.closes)
const versionDisplay = ref(meta.version)

const priorityLabel = computed(() => PRIORITY[priority.value]?.label ?? PRIORITY.medium.label)

const isClosed = computed(() => status.value === 'closed')

// Optional companion partials, authored per proposal and co-located with this
// page. Their presence drives the layout: an Outcome switches a closed proposal
// to the tabbed view; Feedback is appended under the vote panel.
const outcomeMods = import.meta.glob('./outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Replace certification testing windows with a Nebras-operated conformance portal',
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
// so the static build and first client render agree, avoiding a hydration mismatch.
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

        <h1 class="ofp__title">Replace certification testing windows with a Nebras-operated conformance portal</h1>
        <p class="ofp__summary">
          Nebras registers as a TPP and operates a portal that drives certification scenarios against an
          LFI&rsquo;s implementation &mdash; in <strong>pre-production</strong> for functional certification,
          and in <strong>production</strong> in place of waiting for a buddy TPP. LFIs click through
          scenarios instead of standing up a containerised harness and walking Postman collections, and the
          ecosystem gains a standing, published record of how each LFI actually behaves.
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
            <div class="ofp__strip-key">Change type</div>
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

          <div v-if="status === 'draft'" class="ofp-vote-cover" aria-hidden="false">
            <div class="ofp-vote-cover__card">
              <div class="ofp-vote-cover__label">Voting not yet open</div>
              <div class="ofp-vote-cover__msg">Voting opens {{ openedDisplay }}</div>
            </div>
          </div>
        </section>

        <component :is="FeedbackPartial" v-if="FeedbackPartial && isClosed" />
      </template>

      <template #proposal>
        <!-- ═══════════════════════════════════════════════════════════════
             BACKGROUND
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--cream" :class="{ 'ofp-band--seam': !showTabs }">
          <span v-if="!showTabs" class="ofp-seam-label">The proposal</span>
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 &middot; Background</div>
              <h2 class="ofp-band__title">Certification is gated by scheduling, not by readiness</h2>
            </div>
            <div class="ofp-prose">
              <p>
                An LFI proving it has implemented the standard correctly assembles its own evidence. It stands
                up a containerised conformance tool against its pre-production
                <RouterLink to="/tech/lfi-api-hub/getting-started/">Ozone Connect</RouterLink> implementation,
                walks a Postman collection request by request, captures what came back, and collates it into a
                submission &mdash;
                <RouterLink to="/tech/lfi-api-hub/production/testing-certification/functional/">once for each
                certification area</RouterLink>. Bank data sharing, confirmation of payee, insurance, and each
                payment type are separate exercises with separate evidence.
              </p>
              <p>
                That is laborious, but it is not the part that creates a <em>window</em>. The window appears in
                production. An LFI&rsquo;s production implementation can only be exercised by a real TPP, so
                <RouterLink to="/tech/lfi-api-hub/production/testing-certification/tpp-buddying">TPP
                buddying</RouterLink> pairs the LFI with a TPP that has to be available, willing, and far
                enough along its own
                <RouterLink to="/tech/tpp-standards/production/live-proving">live proving</RouterLink> to be
                useful. Two LFIs ready in the same week compete for the same scarce attention. An LFI that
                makes a small functional change after certification has no cheap way to re-prove it, so small
                corrections do not get made.
              </p>
              <p>
                There is a second cost that nobody currently pays visibly. The evidence an LFI produces is seen
                by the LFI and its reviewer, and then it is filed. A TPP integrating across the ecosystem
                discovers how each LFI <em>actually</em> behaves &mdash; which optional fields it populates,
                which validations it applies, how it answers an edge case &mdash; by integrating and finding
                out. Every TPP pays that discovery cost independently, for every LFI, and none of what they
                learn is written down anywhere the next TPP can read it.
              </p>
              <p>
                Nebras also has no continuous view of production conformance. Deviation from the standard is
                observed at a point in time, during certification, against a pre-production environment. After
                that, the first signal that an implementation has drifted is usually a TPP raising a ticket.
              </p>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             RECOMMENDATION
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--white">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 &middot; Recommendation</div>
              <h2 class="ofp-band__title">Nebras builds the portal, and registers as a TPP to drive it</h2>
            </div>
            <div class="ofp-prose">
              <p>
                Nebras builds and operates a <strong>conformance portal</strong>, and registers as a TPP so the
                portal can drive genuine Open Finance traffic through the API Hub against an LFI&rsquo;s
                implementation. Architecturally nothing unusual happens: the portal is a TPP, it calls the API
                Hub, and the API Hub proxies to Ozone Connect. What changes is who does the work of proving.
              </p>
              <p>
                In <strong>pre-production</strong>, an LFI registers, selects the areas it is claiming, and
                works through the scenarios in a browser. The evidence pack is generated by the portal rather
                than assembled by the LFI.
              </p>
              <p>
                In <strong>production</strong>, the portal is open to volunteers. Anyone can connect their own
                accounts or make a payment and see their own data come back &mdash; and that session doubles as
                a conformance observation. No buddy TPP has to be found. The observations accumulate into a
                published, per-LFI record of implementation behaviour that any TPP can read before it starts
                integrating.
              </p>
              <p>
                This is a <strong>process change, not a specification change</strong>. No OpenAPI field,
                endpoint, or schema moves. What changes is how conformance to those specifications is
                demonstrated, and who can see the result.
              </p>
            </div>

            <div class="ofp-code">
              <div class="ofp-code__label">Today &mdash; proving an implementation</div>
              <pre class="ofp-code__pre">{{ todayExample }}</pre>
            </div>

            <div class="ofp-code">
              <div class="ofp-code__label">Proposed &mdash; the conformance portal</div>
              <pre class="ofp-code__pre">{{ proposedExample }}</pre>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             HOW IT WORKS — PRE-PRODUCTION
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--cream">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Pre-production</div>
              <h2 class="ofp-band__title">Functional certification, click by click</h2>
              <p class="ofp-band__lede">
                The LFI still decides when it is ready and still raises the ticket. What it no longer does is
                build the evidence by hand.
              </p>
            </div>

            <div class="ofp-changes">
              <div v-for="s in stepsPre" :key="s.n" class="ofp-change">
                <div class="ofp-change__label">{{ s.n }} &middot; {{ s.title }}</div>
                <p>{{ s.text }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             HOW IT WORKS — PRODUCTION
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--white">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 &middot; Production</div>
              <h2 class="ofp-band__title">Volunteers in place of a buddy TPP</h2>
              <p class="ofp-band__lede">
                The portal is useful to the person using it, which is the only durable reason anyone would take
                part. The conformance record is a by-product of that usefulness.
              </p>
            </div>

            <div class="ofp-changes">
              <div v-for="s in stepsProd" :key="s.n" class="ofp-change">
                <div class="ofp-change__label">{{ s.n }} &middot; {{ s.title }}</div>
                <p>{{ s.text }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             NEBRAS AS A TPP
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--cream">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; The Nebras TPP role</div>
              <h2 class="ofp-band__title">A registration limited by policy, and by access</h2>
              <p class="ofp-band__lede">
                Nebras holding a production TPP registration is the part of this proposal that most deserves
                scrutiny. It is set out here in full rather than left implicit.
              </p>
            </div>

            <div class="ofp-changes">
              <div class="ofp-change">
                <div class="ofp-change__label">01 &middot; Ordinary registration, limited by published policy</div>
                <p>
                  Nebras registers as a TPP in the normal way &mdash; no new role and no change to the trust
                  framework. The limitation to certification and conformance testing is a
                  <strong>published policy commitment</strong>: Nebras will not launch a product, will not
                  onboard customers for any purpose other than testing, and will not use the registration
                  commercially. This is a commitment, not a technical control, and
                  <a href="#asks">Q4</a> asks whether that is sufficient.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">02 &middot; Per-LFI authorisation</div>
                <p>
                  Nebras may only exercise an LFI that has explicitly registered for the portal and authorised
                  testing against itself. The registration does not confer a standing right to call the whole
                  ecosystem.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">03 &middot; Time-boxed access</div>
                <p>
                  Access to a given LFI is granted for a <strong>window around a functional change</strong> and
                  lapses afterwards. This is functional certification, not perpetual monitoring &mdash; Nebras
                  should not hold open-ended production access to an LFI that is not changing anything.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">04 &middot; The record outlives the window</div>
                <p>
                  When a window closes, Nebras loses access but the ecosystem does not lose the picture. What
                  was learned about that LFI&rsquo;s implementation &mdash; what it returns, what it validates
                  &mdash; stays published and stays readable. It is presented as an observation with a date,
                  not as a live reading.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">05 &middot; The portal itself is always on</div>
                <p>
                  The public view of ecosystem health never goes dark, even between windows. What is windowed
                  is Nebras&rsquo;s ability to generate <em>new</em> observations against a particular LFI.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">06 &middot; Informational first, compliance second</div>
                <p>
                  The portal reports; it does not adjudicate. A minor deviation is surfaced to the LFI and
                  shown in the record. Where a deviation is significant, Nebras picks it up through the
                  existing compliance route as a failure to meet the LFI&rsquo;s standardisation obligations
                  &mdash; the portal is the evidence, not the enforcement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             DATA HANDLING
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--white">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; Data handling</div>
              <h2 class="ofp-band__title">Keep the behaviour, discard the customer</h2>
              <p class="ofp-band__lede">
                Two classes of data pass through the portal and they get opposite treatment. The published
                record describes how an implementation behaves; it never describes a person.
              </p>
            </div>

            <div class="ofp-ex">
              <div class="ofp-ex__col ofp-ex__col--ok">
                <div class="ofp-ex__head">
                  <span class="ofp-ex__glyph ofp-ex__glyph--ok">&check;</span> Persisted &mdash; implementation behaviour
                </div>
                <ul class="ofp-ex__list">
                  <li v-for="(e, i) in dataKeep" :key="`keep-${i}`" class="ofp-ex__item">
                    <code class="ofp-ex__ref" dir="auto">{{ e.ref }}</code>
                    <span class="ofp-ex__note">{{ e.note }}</span>
                  </li>
                </ul>
              </div>
              <div class="ofp-ex__col ofp-ex__col--no">
                <div class="ofp-ex__head">
                  <span class="ofp-ex__glyph ofp-ex__glyph--no">&times;</span> Short-lived &mdash; customer data
                </div>
                <ul class="ofp-ex__list">
                  <li v-for="(e, i) in dataDiscard" :key="`drop-${i}`" class="ofp-ex__item">
                    <code class="ofp-ex__ref" dir="auto">{{ e.ref }}</code>
                    <span class="ofp-ex__note">{{ e.note }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <p class="ofp-ex__foot">
              A volunteer sees their own retrieved data during their session &mdash; that is the point of taking
              part. What survives the session is the left-hand column: an account of how the LFI answered,
              carrying nothing that identifies the person who asked.
            </p>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             WHAT IT REPLACES
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--cream">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 &middot; What changes</div>
              <h2 class="ofp-band__title">What the portal replaces, and what stays exactly as it is</h2>
            </div>

            <div class="ofp-changes">
              <div class="ofp-change">
                <div class="ofp-change__label">Retired &middot; The containerised conformance tool</div>
                <p>
                  LFIs no longer stand up a local harness against their own pre-production environment. The
                  scenarios run in the portal, hosted and identical for everyone, which also removes the
                  variance that comes from differences in how a local harness was run.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">Retired &middot; Postman collections as the evidence route</div>
                <p>
                  The collections stop being the required path to certification evidence. They remain available
                  as an optional developer aid for day-to-day integration work &mdash; this retires their role
                  in certification, not the collections themselves.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">Retired &middot; Waiting for a buddy TPP</div>
                <p>
                  The scheduling dependency at the heart of the production testing window goes away. An LFI
                  proves against the portal instead of waiting for a TPP to become available.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">Unchanged &middot; The Service Desk ticket</div>
                <p>
                  Functional certification is still requested by ticket, raised by the LFI when it believes it
                  is ready, one per certification area. What is attached to it changes almost entirely to
                  portal output &mdash; the submission route does not.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">Unchanged &middot; Nebras review and sign-off</div>
                <p>
                  The portal generates evidence; it does not grant certification. A person at Nebras still
                  reviews the pack and signs off, with the same judgement applied to the same standard.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">Unchanged &middot; The standards themselves</div>
                <p>
                  No OpenAPI change, no version target. Everything an LFI must implement stays exactly as
                  specified &mdash; only the demonstration of it changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             ROLLOUT
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--white">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 08 &middot; Rollout</div>
              <h2 class="ofp-band__title">Three areas first, existing routes stay open for the rest</h2>
            </div>
            <div class="ofp-prose">
              <p>The initial release covers three certification areas:</p>
            </div>
            <div class="ofp-changes">
              <div class="ofp-change">
                <div class="ofp-change__label">01 &middot; Bank data sharing</div>
                <p>
                  The highest-volume area and the one where implementation differences between LFIs cost TPPs
                  the most to discover &mdash; so it is also where a published behaviour record earns the most
                  immediately.
                  <RouterLink to="/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/">Current
                  certification route</RouterLink>.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">02 &middot; Bank service initiation &mdash; domestic payments, including refunds</div>
                <p>
                  Single instant domestic payments and the refund path. Payments are where a production
                  scenario carries real consequence, so starting with the simplest, most-used payment type
                  keeps the risk proportionate while the model is proved.
                  <RouterLink to="/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/">Current
                  certification route</RouterLink>.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">03 &middot; Confirmation of payee</div>
                <p>
                  Small surface, sharply defined behaviour, and a validation-heavy area where LFI-to-LFI
                  differences are exactly what the record is good at capturing.
                  <RouterLink to="/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/">Current
                  certification route</RouterLink>.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">04 &middot; Everything else keeps its current route</div>
                <p>
                  Insurance data sharing, the remaining payment types &mdash; on-demand, periodic schedule, and
                  defined schedule in both fixed and variable forms &mdash; and delegated SCA continue to
                  certify exactly as they do today until the portal covers them. Nothing is withdrawn before
                  its replacement exists.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             PROS
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--cream">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 09 &middot; Pros</div>
              <h2 class="ofp-band__title">What the portal buys</h2>
            </div>
            <ul class="ofp-pros">
              <li v-for="(p, i) in pros" :key="i" class="ofp-pros__item">
                <span class="ofp-pros__glyph">&check;</span>
                <span>{{ p }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             CONS
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--white">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 10 &middot; Cons</div>
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

        <!-- ═══════════════════════════════════════════════════════════════
             OPEN QUESTIONS
        ═══════════════════════════════════════════════════════════════ -->
        <section id="asks" class="ofp-band ofp-band--cream">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 11 &middot; Open questions</div>
              <h2 class="ofp-band__title">What has to be settled before this is built</h2>
              <p class="ofp-band__lede">
                Two of these &mdash; volunteer supply and payment liability &mdash; could change the shape of
                the production half of the proposal, so they are worth answering first.
              </p>
            </div>
            <ul class="ofp-asks">
              <li v-for="a in asks" :key="a.n" class="ofp-ask">
                <span class="ofp-ask__num">{{ a.n }}</span>
                <div class="ofp-ask__text">{{ a.text }}</div>
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
  font-size: 0.86em;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
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
.ofp-band__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
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

/* ─── Step / change cards ───────────────────────────────────────────────── */
.ofp-changes {
  max-width: 52rem;
  margin: 0 0 2.25rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-teal);
  background: var(--at-surface);
}

.ofp-changes:last-child { margin-bottom: 0; }

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

.ofp-change a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ofp-change a:hover { color: var(--at-navy-deep); }

.ofp-change code {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

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

.ofp-band__inner > .ofp-code:first-of-type { margin-top: 2.25rem; }

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

/* ─── Kept / discarded columns ──────────────────────────────────────────── */
.ofp-ex {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 52rem;
  margin-top: 4px;
}

.ofp-ex__col { border: 1px solid var(--at-grid-line); background: var(--at-surface); }
.ofp-ex__col--ok { border-top: 2px solid var(--at-teal); }
.ofp-ex__col--no { border-top: 2px solid #a6391f; }

.ofp-ex__head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 12px 16px;
  border-bottom: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

.ofp-ex__glyph {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.ofp-ex__glyph--ok { background: rgba(0, 194, 169, 0.14); color: var(--at-teal-deep, #008b78); }
.ofp-ex__glyph--no { background: rgba(166, 57, 31, 0.12); color: #a6391f; }

.ofp-ex__list { list-style: none; margin: 0; padding: 0; }

.ofp-ex__item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--at-grid-line);
}

.ofp-ex__item:last-child { border-bottom: none; }

.ofp-ex__ref {
  font-family: var(--at-mono);
  font-size: 13px;
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 2px 6px;
  align-self: flex-start;
  max-width: 100%;
  overflow-wrap: anywhere;
}

.ofp-ex__note { font-size: 12.5px; color: var(--at-mute-2); line-height: 1.45; }

.ofp-ex__foot {
  max-width: 52rem;
  margin: 14px 0 0;
  font-size: 13px;
  color: var(--at-mute-2);
  line-height: 1.6;
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

/* ─── Cons ──────────────────────────────────────────────────────────────── */
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

/* ─── Asks / open questions ─────────────────────────────────────────────── */
.ofp-asks {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 56rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-navy-deep);
}

.ofp-ask {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 18px 24px;
  border-bottom: 1px solid var(--at-grid-line);
}

.ofp-ask:last-child { border-bottom: none; }

.ofp-ask__num {
  font-family: var(--at-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--at-teal);
  padding-top: 2px;
  flex-shrink: 0;
}

.ofp-ask__text {
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--at-navy-deep);
}

/* ─── Vote cover ────────────────────────────────────────────────────────── */
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
  .ofp-ex { grid-template-columns: 1fr; }
}
</style>
