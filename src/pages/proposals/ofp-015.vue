<route lang="yaml">
meta:
  title: 'OFP-015 · One Confirmation of Payee endpoint per bank, answering for every account'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-015. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Scope, Technical changes, Rollout, Alternatives,
// Questions, Pros, and Cons. Supersedes the fan-out design in OFP-013, and
// mirrors its layout.
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
const OG_TITLE = 'OFP-015 · One Confirmation of Payee endpoint per bank, answering for every account'
const OG_DESCRIPTION =
  'Each LFI nominates one Confirmation of Payee instance per bank code, and that instance answers for every account under the bank code — retail, SME, corporate, or any other estate. /discovery keeps returning a single endpoint, TPPs change nothing, and one payee check stays one call and one charge.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-015',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: 'TBC',
  closes: '8 Nov 2026',
  priority: 'high' as Priority,
  version: 'V2.2',
}

// The three questions asked alongside the vote. These are ALSO held in the
// proposals API (the `questions` column) — that is where the vote form reads
// them from, and where the answers are stored. Kept here so they are readable
// on the page before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'LFIs',
    q: 'Does one of your Confirmation of Payee instances already answer cop-query for every account under your bank code, across every segment and core platform? If not, which estates does it miss, and what would it take to reach them?',
    why: 'This decides how much of the ecosystem is already conformant. Some LFIs have told us their CoP lookup already spans the full stack; for those, this proposal is a nomination and nothing more. For an LFI whose estates sit on separate cores, the answer sizes the real work — and whether V2.2 is a realistic date for it.',
  },
  {
    who: 'LFIs',
    q: 'Which instance would you nominate for each bank code you issue IBANs under — and do you operate more than one brand or bank code that discovery must keep apart?',
    why: 'The nomination is keyed on bank code, not on organisation. Where one organisation runs several brands, each with its own bank code, each needs its own nomination — and today’s resolution by organisation is known to get this wrong.',
  },
  {
    who: 'TPPs and LFIs',
    q: 'Would you prefer the TPP to supply the payee’s AccountType (Retail, SME or Corporate) in POST /discovery, with the Hub routing to one instance per bank code and account type? TPPs: do you know the payee’s account type at the point of a check? LFIs: could you keep an accurate account-type routing map?',
    why: 'This is alternative 04 in section 06. It avoids fan-out without asking split LFIs to build a lookup across estates, but it only works if TPPs know the payee’s account type and LFIs can say which instance serves each one. The answers tell us whether it is a workable alternative to a single nominated instance.',
  },
]

const pros = [
  'It answers every objection raised against OFP-013. No fan-out, so no multiplied load on LFIs; one call per payee check, so one charge; and no new behaviour for TPPs to build or get wrong.',
  'Nothing changes for TPPs. /discovery still returns one endpoint, /confirmation is unchanged, and every existing Confirmation of Payee integration keeps working exactly as it does today.',
  'A 204 means what it says. Because the nominated instance answers for the whole bank code, “IBAN not recognised” is a statement about the bank rather than about one estate — there is no inconclusive state for a TPP to interpret or a payer to misread.',
  'Many LFIs are already conformant. Banks whose CoP lookup already spans every segment, or that run one core for all of them, need only confirm which instance to nominate.',
  'The work lands where the knowledge is. Only the LFI knows which of its estates holds an account; the proposal asks it to answer that question internally rather than asking the Hub or the TPP to guess.',
  'It also fixes splits that have nothing to do with segment — a digital brand alongside its parent, or an estate part-way through a core migration — because the requirement is on the bank code, not on any segment taxonomy.',
]

const cons = [
  'The work falls entirely on the LFIs with split estates. Where retail, SME and corporate accounts sit on separate cores, the nominated instance needs a lookup that reaches all of them — a real integration, not a configuration change.',
  'Until a split LFI conforms, its non-retail payees still come back “not recognised”. The proposal makes no ecosystem-side workaround for that gap; it is closed only when the LFI is.',
  'The nominated instance becomes a single point of failure for Confirmation of Payee across the whole bank code. An outage there stops every check against that bank, where today only one estate’s checks would fail.',
  'Some LFIs keep segments apart deliberately, for data-segregation or operating-model reasons. Answering a name match across segments from one instance may need internal sign-off before it can be built.',
  'There is no fallback by design. If an LFI nominates an instance that cannot in fact see every account, nothing in the protocol reveals it — only functional certification, with test accounts drawn from every estate, would catch it.',
]

// What happens today — rendered in the Background section.
const todayExample = `# Today — one bank code resolves to one instance, which sees one estate
POST /discovery
  { "Data": { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" } }

200
  { "Data": { "DiscoveryEndpointUrl": "https://auth1.bank-retail.apihub.openfinance.ae/.well-known/openid-configuration",
              "ResourceServerUrl":    "https://rs1.bank-retail.apihub.openfinance.ae" } }

POST https://rs1.bank-retail.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.1/confirmation
  -> cop-query at bank-retail searches the retail core only

204   # "IBAN is not recognised"
# The account is real. It sits on the corporate core, which the retail
# instance's cop-query never looks at.`

// The proposed behaviour — rendered in the Recommendation section.
const proposedExample = `# Proposed — the same request, the same response shape
POST /discovery
  { "Data": { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" } }

200
  { "Data": { "DiscoveryEndpointUrl": "https://auth1.bank-retail.apihub.openfinance.ae/.well-known/openid-configuration",
              "ResourceServerUrl":    "https://rs1.bank-retail.apihub.openfinance.ae" } }
# bank-retail is the instance this bank nominated for its bank code.

POST https://rs1.bank-retail.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.1/confirmation
  -> cop-query at bank-retail resolves the IBAN across every estate
     under the bank code: retail, SME, corporate

200   { "Data": { "NameMatchIndicator": "ConfirmationOfPayee.Yes" } }

# One discovery call, one confirmation call, one charge.
# A 204 now means the bank does not hold the account — not that one
# estate does not.`

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
// page (ofp-015.outcome.vue / ofp-015.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-015.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-015.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'One Confirmation of Payee endpoint per bank, answering for every account',
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

        <h1 class="ofp__title">One Confirmation of Payee endpoint per bank, answering for every account</h1>
        <p class="ofp__summary">
          An IBAN carries a bank code, not a segment, so <code>POST /discovery</code> can only send a
          Confirmation of Payee check to one of a bank&rsquo;s instances &mdash; and a payee whose account
          sits on another estate comes back <strong>&ldquo;IBAN not recognised&rdquo;</strong>. This
          proposal fixes that at the LFI: each bank nominates <strong>one CoP instance per bank
          code</strong>, and that instance answers for <strong>every account under the bank code</strong>.
          Discovery keeps returning a single endpoint, and TPPs change nothing.
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
            set out in section 07 below. The first two, addressed to LFIs, tell us how much of the
            ecosystem already conforms and how much work the rest is facing; the third asks TPPs and
            LFIs whether an account-type alternative would work.
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
          <h2 class="ofp-band__title">The problem OFP-013 raised still needs solving</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <RouterLink to="/proposals/ofp-013">OFP-013</RouterLink> set out a gap in Confirmation of
            Payee: a check against a real, active account can come back &ldquo;IBAN not recognised&rdquo;
            because discovery of the IBAN returned the wrong segment (API Hub) for the bank. Its recommendation was not accepted, but
            the gap remains &mdash; and so does the risk that payers are warned about accounts that would
            have matched.
            This proposal takes a different approach to the same problem.
          </p>
          <p>
            The cause is in how a check finds its bank. The payee is not the TPP&rsquo;s customer, so the
            destination IBAN is the only input, and
            <RouterLink to="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery"><code>POST /discovery</code></RouterLink>
            turns it into the API Hub to send the check to. The IBAN identifies the bank, but not
            whether the account is retail, SME or corporate &mdash; and many banks are onboarded with a
            separate API Hub for each. Discovery only returns one API Hub. If that API Hub&rsquo;s
            <code>cop-query</code> searches only its own accounts, a payee held anywhere else in the bank
            is reported as not recognised:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today &mdash; the corporate payee that cannot be found</div>
            <pre class="ofp-code__pre">{{ todayExample }}</pre>
          </div>

          <p>
            The <code>204</code> is indistinguishable, to the TPP and to the payer, from a mistyped or
            fraudulent IBAN &mdash; the very outcome Confirmation of Payee exists to identify.
          </p>

          <div class="ofp-rules">
            <div class="ofp-rules__label">What the OFP-013 vote told us</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The fan-out was rejected.</strong>
                <RouterLink to="/proposals/ofp-013">OFP-013</RouterLink> proposed returning every
                instance from <code>/discovery</code> and having the TPP try each in turn. It closed with
                three votes for and five against. LFIs objected to multiplying CoP traffic by the number
                of instances they run, and both LFIs and TPPs to paying for every leg that missed.
              </li>
              <li>
                <strong>Several LFIs already answer for the whole bank.</strong> One LFI told us its
                CoP lookup already searches every segment of its accounting platform, so its responses
                reflect the full stack, not one estate. Another runs a single core for every segment, so
                every one of its instances would give the same answer. For these banks, fan-out adds
                load and cost and finds nothing new.
              </li>
              <li>
                <strong>The fix belongs where the knowledge is.</strong> Only the LFI knows which of
                its estates holds an account. Asking the TPP to guess (an account-type hint) or the
                Hub to try every option (fan-out) works around a question the LFI can answer directly.
              </li>
              <li>
                <strong>Resolution must follow the bank code, not the organisation.</strong> One vote
                noted that discovery currently resolves by organisation rather than by brand. Where one
                organisation operates several brands, each with its own bank code, the check must
                reach the brand that issued the IBAN.
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
          <h2 class="ofp-band__title">One bank code, one CoP instance, every account</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Each LFI nominates exactly one Confirmation of Payee instance for each bank code it
            issues IBANs under.</strong> The Hub resolves the IBAN to its bank code, as it does today, and
            returns the nominated instance &mdash; the same single
            <code>DiscoveryEndpointUrl</code> and <code>ResourceServerUrl</code> the response carries now.
          </p>
          <p>
            <strong>The nominated instance answers for every account under that bank code.</strong> Its
            <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/confirmation-of-payee/open-api/cop-query"><code>POST /customers/action/cop-query</code></RouterLink>
            resolves the IBAN wherever the account is held &mdash; retail, SME, corporate, a separate
            brand on a shared bank code, or an estate part-way through a migration. How it reaches those
            accounts is the LFI&rsquo;s internal design.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed &mdash; same request, same shape, the whole bank searched</div>
            <pre class="ofp-code__pre">{{ proposedExample }}</pre>
          </div>

          <p>
            The result is authoritative either way. A <code>200</code> with
            <code>ConfirmationOfPayee.Yes</code>, <code>Partial</code> or <code>No</code> is final, as
            today. A <code>204</code> now means <strong>the bank does not hold the account</strong>, not
            that one of its estates does not &mdash; so the TPP can report &ldquo;not recognised&rdquo;
            with confidence, and there is no inconclusive state to explain to the payer.
          </p>
          <p>
            <strong>Nothing changes for the TPP.</strong> One discovery call, one token, one
            confirmation call, one charge &mdash; the flow every Confirmation of Payee integration is
            already built against.
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
            The requirement sits on the bank code, not on any segment taxonomy, so it covers every reason
            one bank code maps to more than one instance.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>An LFI MUST nominate exactly one CoP instance per bank code.</strong> The
                nominated instance MUST serve Confirmation of Payee and advertise the
                <code>confirmation</code> API family. An LFI with a single instance nominates that
                instance; there is no special case.
              </li>
              <li>
                <strong>The nominated instance MUST answer <code>cop-query</code> for every account
                under the bank code</strong>, whatever segment, brand, product line or core platform holds
                it. Returning <code>204</code> for an account the bank holds on another estate is
                non-conformant.
              </li>
              <li>
                <strong>The Hub MUST return the nominated instance</strong> for every IBAN carrying that
                bank code, and MUST resolve on the bank code rather than on the organisation. Where one
                organisation holds several bank codes, each resolves to its own nomination.
              </li>
              <li>
                <strong>A <code>204</code> is authoritative for the bank.</strong> It states that the
                bank does not hold the account. A <code>4xx</code> or <code>5xx</code> remains a failure
                to answer, reported to the payer as <em>could not verify</em>, as today.
              </li>
              <li>
                <strong>Other instances are not routed to.</strong> An LFI&rsquo;s non-nominated
                instances MAY keep their own CoP endpoints, but discovery never returns them, so there is
                exactly one place a check for a given bank code can land.
              </li>
              <li>
                <strong>No change to the TPP-facing API.</strong> The <code>/discovery</code> request
                and response, the <code>/confirmation</code> request and response, and the match
                indicators are all unchanged. One payee check remains one chargeable call.
              </li>
              <li>
                <strong>No change to the Ozone Connect contract.</strong>
                <code>cop-query</code> keeps its request and response schemas; what changes is the
                population of accounts the nominated instance answers for.
              </li>
              <li>
                <strong>Out of scope: every other flow.</strong> Data Sharing and Service Initiation
                select an authorisation server with the customer&rsquo;s involvement, so segmentation is
                already handled there. Insurance is unaffected.
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
            No schema changes. The work is a nomination for every LFI, a lookup across estates for the
            LFIs that split them, and routing by bank code at the Hub. <strong>TPPs change nothing.</strong>
          </p>
        </div>

        <div class="ofp-rules">
          <div class="ofp-rules__label">Who implements what</div>
          <ul class="ofp-rules__list">
            <li>
              <strong>LFI &mdash; nominate, and answer for the whole bank code.</strong> Every LFI
              nominates one instance per bank code. An LFI whose CoP lookup already spans every estate, or
              that runs one core for all of them, has nothing further to build. An LFI with separate cores
              extends the nominated instance&rsquo;s <code>cop-query</code> to resolve accounts held on
              the others.
            </li>
            <li>
              <strong>API Hub &mdash; route by bank code.</strong> Hold the nomination per bank code and
              return it from <code>/discovery</code>, replacing today&rsquo;s resolution by organisation.
            </li>
            <li>
              <strong>TPP &mdash; nothing.</strong> No parsing change, no retry logic, no new reporting
              rule.
            </li>
          </ul>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards specification</div>
            <p>
              Keep <code>AEConfirmationDiscoveryResponse.Data</code> as the single
              <code>AEConfirmationSourceProperties</code> object it is in V2.1. The V2.2-rc2 draft
              currently carries <code>Data.ConfirmationSource</code> as an array, from the OFP-013 work;
              that change is reverted. Add normative text to the <code>/discovery</code> description
              stating that the endpoint returned is the bank&rsquo;s nominated instance and answers for
              every account under the bank code. Targets <strong>V2.2</strong>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; Ozone Connect</div>
            <p>
              Add the conformance requirement to the <code>POST /customers/action/cop-query</code>
              description: the nominated instance MUST resolve any account under its bank code, and MUST
              NOT return <code>204</code> for an account the bank holds on another estate. The request
              and response schemas are unchanged.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; Directory and onboarding</div>
            <p>
              Capture the nomination: for each bank code, the authorisation server whose instance answers
              Confirmation of Payee. Single-instance LFIs default to their only instance. Multi-instance
              LFIs confirm their choice as part of onboarding, and again whenever an instance is added or
              retired.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; API Hub</div>
            <p>
              Resolve the IBAN&rsquo;s bank code to the nominated instance and return it. This replaces
              resolution by organisation, which today can send a brand&rsquo;s IBANs to a sibling
              brand&rsquo;s instance.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">05 &middot; Documentation</div>
            <p>
              Update the
              <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/confirmation-of-payee/api-guide">Confirmation of Payee API Guide</RouterLink>
              to state what a <code>204</code> now means, and the LFI implementation guide to set out the
              nomination and the whole-bank-code requirement. Record the change in the version changelog.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">06 &middot; Functional certification</div>
            <p>
              Add a Confirmation of Payee scenario that sends test IBANs from <strong>every</strong>
              estate under the bank code &mdash; retail, SME, corporate, and any other brand or platform
              &mdash; to the nominated instance, and asserts a <code>200</code> for each. This is the only
              place a nomination that cannot see every account would be caught.
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
          <h2 class="ofp-band__title">Non-breaking, and never worse than today</h2>
          <p class="ofp-band__lede">
            No response shape changes, so there is no version migration for TPPs. The new obligation
            falls on LFIs, so conformance is set at <strong>V2.2</strong>.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">How it lands</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>Nominations can be taken now.</strong> They are directory data, not a release.
                For an LFI that already answers for the whole bank code, nominating ends the false
                negatives the day the Hub routes to it.
              </li>
              <li>
                <strong>Split LFIs conform by V2.2.</strong> Until they do, the Hub keeps returning the
                instance it returns today, so a payee on an unreached estate gets the same
                <code>204</code> as now. The proposal never makes a check worse.
              </li>
              <li>
                <strong>TPPs are unaffected at every step.</strong> The V2.1 and V2.2
                <code>/discovery</code> responses are identical, so no TPP has to move to benefit.
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
          <h2 class="ofp-band__title">Other ways to find the right estate</h2>
          <p class="ofp-band__lede">
            Each of these routes around the LFI. Each puts the cost of a split estate on someone who
            does not know where the account is.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-changes">
            <div class="ofp-change">
              <div class="ofp-change__label">01 &middot; Return every instance and let the TPP fan out &mdash; OFP-013</div>
              <p>
                Discovery returns an array and the TPP tries each entry until one answers. It needs no LFI
                work, but multiplies CoP traffic at every multi-instance bank, charges for every leg that
                misses, and adds an inconclusive outcome TPPs must report correctly. It was voted down for
                exactly those reasons, and for LFIs that already answer for the whole bank it buys
                nothing.
              </p>
            </div>

            <div class="ofp-change">
              <div class="ofp-change__label">02 &middot; The Hub fans out on the TPP&rsquo;s behalf</div>
              <p>
                The TPP makes one call; the Hub tries each instance&rsquo;s <code>cop-query</code> in turn
                and bills once. It fixes the charging and spares TPPs any change, but leaves the load on
                LFIs untouched &mdash; the objection LFIs raised first &mdash; and makes the Hub
                responsible for interpreting a sequence of <code>204</code>s.
              </p>
            </div>

            <div class="ofp-change">
              <div class="ofp-change__label">03 &middot; An LFI-hosted CoP discovery endpoint</div>
              <p>
                The LFI exposes an endpoint that maps its IBANs to the estate holding them, and the Hub
                calls it before answering <code>/discovery</code>. Accurate, but it adds a new endpoint to
                every LFI and a new hop to every check. Once an LFI can work out which estate holds an
                account, it can just as well answer the check itself &mdash; which is what this proposal
                asks for.
              </p>
            </div>

            <div class="ofp-change">
              <div class="ofp-change__label">04 &middot; The TPP supplies the payee&rsquo;s <code>AccountType</code> to <code>/discovery</code></div>
              <p>
                The TPP sends <code>AccountType</code> alongside the payee&rsquo;s IBAN in
                <code>POST /discovery</code>, using the existing <code>Retail</code>, <code>SME</code>
                and <code>Corporate</code> values already defined for account information. The Hub uses
                the bank code, the account type and the supported API version to identify a single
                eligible Confirmation of Payee instance, and returns its
                <code>DiscoveryEndpointUrl</code> and <code>ResourceServerUrl</code> &mdash; the existing
                single-object response.
              </p>
              <p>
                If <code>AccountType</code> is missing or invalid, or the mapping does not resolve to
                exactly one eligible instance, the Hub returns a discovery error. It does not select a
                default endpoint or return several endpoints.
              </p>
              <p>
                This avoids routing-related fan-out, and with it unnecessary CoP calls and the
                transaction costs they carry. However, it requires the TPP to know the payee&rsquo;s
                account type and the bank to maintain accurate routing mappings. It cannot serve a check
                where the account type is unknown, or where more than one instance serves the same
                account type. The <code>/confirmation</code> contract is unchanged.
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
            These appear as optional boxes when you confirm your vote. The first two are addressed to
            LFIs: the answers tell us how much of the ecosystem already conforms, and what the rest have
            to build. The third asks TPPs and LFIs whether the account-type alternative is workable.
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
          <h2 class="ofp-band__title">What a single nominated instance buys</h2>
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
