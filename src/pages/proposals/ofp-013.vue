<route lang="yaml">
meta:
  title: 'OFP-013 · Return every Confirmation of Payee endpoint a bank operates'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-013. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Scope, Technical changes, Alternatives,
// Questions, Pros, and Cons. Styling follows the site's editorial system and
// mirrors OFP-012.
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
const OG_TITLE = 'OFP-013 · Return every Confirmation of Payee endpoint a bank operates'
const OG_DESCRIPTION =
  'An IBAN carries a bank code, not a segment. Banks run separate Retail, SME and Corporate instances, and /discovery can only name one of them — so a Confirmation of Payee check on a corporate IBAN reaches the retail estate and comes back "IBAN not recognised". This proposal makes the discovery response an array of every instance that can answer.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-013',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '21 Sep 2026',
  closes: '6 Oct 2026',
  priority: 'high' as Priority,
  version: 'V2.2',
}

// The two questions asked alongside the vote. These are ALSO held in the
// proposals API (the `questions` column) — that is where the vote form reads
// them from, and where the answers are stored. Kept here so they are readable
// on the page before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'TPPs using Confirmation of Payee',
    q: 'When would you move to the V2.2 /discovery response shape, and would you attempt the returned endpoints one at a time or in parallel?',
    why: 'Data changes from an object to an array. Both versions are served side by side, so nobody is forced to move on a date — but the fix only reaches payees once TPPs do move, and we need to know whether that is a sprint or a release cycle. The second half matters separately: fanning out in parallel multiplies both the load and the charges on every check.',
  },
  {
    who: 'TPPs and LFIs',
    q: 'Should a 204 “IBAN not recognised” remain a chargeable Confirmation of Payee transaction once fan-out means most attempts return one?',
    why: 'POST /confirmation is chargeable. Under fan-out a single payee check can produce three billed calls, two of which found nothing. This proposal does not change pricing — it asks the question, so the commercial decision is taken with the ecosystem’s answer in front of it.',
  },
]

const pros = [
  'Accounts held outside a bank’s retail estate become verifiable at all. A single-valued discovery response can only ever send the check to one instance, so an account held on any other one returns “not recognised” however correct the IBAN is.',
  'It removes a class of false negative. An account held outside the retail estate currently produces the same result as an IBAN that does not exist, so the payer is warned about an account that would have matched had the request reached the instance holding it.',
  'No LFI implementation effort. The Hub already holds every authorisation server and resource server in the directory, so this is a response-assembly change over data it has. That is precisely why the LFI-hosted alternative was deferred rather than built.',
  'It fixes every reason a bank code maps to more than one instance, not only segmentation. A digital-only brand alongside its parent, or an estate part-way through a migration, breaks discovery in exactly the same way and is fixed by the same change.',
  '“Not recognised” becomes a statement about the bank rather than about one instance. The TPP reports it only after every instance the Hub named has returned 204, instead of after the single instance the Hub happened to select.',
  'The IBAN stays the only input. No new field from the TPP, no new endpoint at the LFI, and no segment anyone has to ask for — which matters, because the payee is not the TPP’s customer and cannot be asked anything.',
]

const cons = [
  'It is a breaking change to a response shape every existing Confirmation of Payee integration is built against. Serving both versions side by side means no TPP is forced to move on a date, but it does leave the Hub maintaining two response shapes for as long as V2.1 is served.',
  'Fan-out has a price. A TPP that attempts every entry incurs up to one token exchange and one chargeable /confirmation call per instance for a single payee check, most of them returning 204 — and this proposal flags that cost rather than fixing it.',
  'The entries are untagged, so a TPP that does know something about the payee often cannot act on it. Nothing in the response says which entry is the corporate one, so unless the TPP recognises the instance from a previous check it is left attempting them in order and paying for the attempts that miss.',
  'The protocol fix does not deliver coverage on its own. Until the non-retail instances are CoP-enabled the array returns one entry and a corporate payee still fails — work this proposal identifies but does not schedule.',
  'It publishes how many estates each bank runs to every TPP that resolves an IBAN. The same topology is already visible in the directory, so this is a small exposure rather than a new one, but it stops being something a TPP has to go looking for.',
  'Because calling a single entry is permitted, the non-conformance is not in how many entries a TPP calls but in what it reports afterwards — and a TPP that reports “not recognised” off one 204 looks identical to a conformant one on every retail payee. Functional certification is the only place that would be caught.',
]

// What happens today — rendered in the Background section.
const todayExample = `# Today — one bank code resolves to one instance

POST /discovery
  { "Data": { "SchemeName": "IBAN", "Identification": "AE070331234567890123456" } }

200
  { "Data": { "DiscoveryEndpointUrl": "https://auth1.bank-retail.apihub.openfinance.ae/.well-known/openid-configuration",
              "ResourceServerUrl":    "https://rs1.bank-retail.apihub.openfinance.ae" } }

# The bank code resolved. The segment did not — an IBAN does not carry one — so
# the retail instance is returned, because a single-valued Data has no room for
# the alternative.

POST https://rs1.bank-retail.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.1/confirmation
204   # "IBAN is not recognised"

# The account exists on the business estate, which was not queried. The
# response is identical to the one returned for a mistyped IBAN.`

// The proposed shape — rendered in the Recommendation section.
const proposedExample = `# Proposed — one bank code resolves to every instance that can answer

200
  { "Data": [
      { "DiscoveryEndpointUrl": "https://auth1.bank-retail.apihub.openfinance.ae/.well-known/openid-configuration",
        "ResourceServerUrl":    "https://rs1.bank-retail.apihub.openfinance.ae" },
      { "DiscoveryEndpointUrl": "https://auth1.bank-sme.apihub.openfinance.ae/.well-known/openid-configuration",
        "ResourceServerUrl":    "https://rs1.bank-sme.apihub.openfinance.ae" },
      { "DiscoveryEndpointUrl": "https://auth1.bank-corp.apihub.openfinance.ae/.well-known/openid-configuration",
        "ResourceServerUrl":    "https://rs1.bank-corp.apihub.openfinance.ae" }
    ],
    "Links": { "Self": "..." },
    "Meta":  { } }

# Which entries to call is the TPP's choice: one it has grounds to identify,
# the entries in turn, or all of them. What may be concluded is not:
#
#   200 from an entry      -> authoritative. The account was found. Stop.
#   204 from an entry      -> this instance does not hold the account.
#   204 from EVERY entry   -> the IBAN is not recognised.
#   204 from some entries  -> inconclusive. Report "could not verify",
#                             which is NOT the same as "not recognised".
#   4xx/5xx from an entry  -> that instance did not answer. Inconclusive on
#                             the same terms.`

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
// page (ofp-013.outcome.vue / ofp-013.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-013.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-013.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Return every Confirmation of Payee endpoint a bank operates',
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

        <h1 class="ofp__title">Return every Confirmation of Payee endpoint a bank operates</h1>
        <p class="ofp__summary">
          An IBAN carries a bank code, not a segment. Banks run separate Retail, SME and Corporate
          instances on the API Hub, and <code>POST /discovery</code> can only name one of them &mdash; so
          a Confirmation of Payee check on a corporate IBAN is sent to the retail estate and comes back
          <strong>&ldquo;IBAN not recognised&rdquo;</strong> for an account that is real, active, and
          verifiable. This proposal makes the discovery response
          <strong>an array of every instance that can answer</strong>, and has the TPP try each until
          one does.
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
            each person may vote once. <strong>Two questions are attached to this vote</strong> &mdash;
            set out in section 07 below &mdash; and they carry as much weight as the tally: they decide
            whether a breaking change lands at V2.2, and what a fanned-out check should cost.
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
          <h2 class="ofp-band__title">An IBAN names a bank, not an estate</h2>
        </div>
        <div class="ofp-prose">
          <p>
            Confirmation of Payee is the one flow where the API Hub chooses the LFI on the TPP&rsquo;s
            behalf. Everywhere else the customer picks their own institution and the consent is raised
            against the authorisation server they chose. Here the subject of the check is the
            <em>payee</em> &mdash; not the TPP&rsquo;s customer, not present, and not able to be asked
            anything &mdash; so the only input is the destination IBAN, and
            <RouterLink to="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery"><code>POST /discovery</code></RouterLink>
            exists to turn it into somewhere to send the request.
          </p>
          <p>
            A UAE IBAN carries the bank code, and the Hub resolves it correctly. What the IBAN does not
            carry is the <strong>segment</strong> &mdash; whether the account sits on the bank&rsquo;s
            retail, SME, or corporate estate &mdash; and those estates are separate Open Finance
            instances with their own <code>lfiCode</code>, their own authorisation server, and their own
            API Hub resource server. That separation is not an edge case &mdash; it is the ordinary way a
            bank with more than one customer base is onboarded:
          </p>

          <div class="ofp-rules">
            <div class="ofp-rules__label">How one bank code can map to several instances</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>A retail and a business estate.</strong> One instance
                (<code>bank-retail</code>) carries personal current and savings accounts; a second
                (<code>bank-sme</code>) carries the SME book. Two <code>lfiCode</code>s, two
                authorisation servers, one bank code in the IBAN.
              </li>
              <li>
                <strong>A three-way split.</strong> <code>bank-retail</code>, <code>bank-sme</code>, and
                <code>bank-corp</code> each onboarded separately, typically because each sits on a
                different core platform with its own release cycle.
              </li>
              <li>
                <strong>A split that has nothing to do with segment.</strong> A digital-only brand run
                alongside the parent bank, or an estate part-way through a migration, produces two
                instances under one bank code for reasons no segment field would describe.
              </li>
            </ul>
          </div>

          <p>
            <code>AEConfirmationDiscoveryResponse.Data</code> is a single object holding one
            <code>DiscoveryEndpointUrl</code> and one <code>ResourceServerUrl</code>. One bank code, one
            answer. With no segment to discriminate on and no room to return more than one, the Hub
            returns the retail instance &mdash; correct when the payee holds a retail account, and wrong
            in every other case. The TPP is given no way to tell which of the two it received.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today &mdash; the corporate payee that cannot be found</div>
            <pre class="ofp-code__pre">{{ todayExample }}</pre>
          </div>

          <p>
            The outcome is not reported as an error. A
            <RouterLink to="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation"><code>204</code></RouterLink>
            is a valid CoP response meaning <em>the IBAN is not recognised</em>, so the request succeeds,
            no fault is raised, and neither the TPP nor the Hub has a signal that the check was sent to
            an instance that was never going to hold the account. The TPP reports to the payer that the
            account could not be verified, for an account that would have matched had the request reached
            the instance that holds it.
          </p>
          <p>
            The result is a negative that is indistinguishable, to the TPP and to the payer, from a
            mistyped or fraudulent IBAN &mdash; which is the outcome Confirmation of Payee exists to
            identify.
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
          <h2 class="ofp-band__title">Return them all, and let the TPP ask each in turn</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong><code>Data</code> becomes an array.</strong> The Hub resolves the IBAN to a bank code
            as it does today, and returns <strong>every instance registered under that bank code that
            serves Confirmation of Payee</strong> &mdash; each as the same
            <code>DiscoveryEndpointUrl</code> and <code>ResourceServerUrl</code> pair the response
            already carries. A bank running one instance returns an array of one. A bank running retail,
            SME, and corporate returns three.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed &mdash; the shape, and what the TPP does with it</div>
            <pre class="ofp-code__pre">{{ proposedExample }}</pre>
          </div>

          <p>
            <strong>How many of the entries a TPP calls is the TPP&rsquo;s choice.</strong> One that
            already knows where the payee&rsquo;s account sits &mdash; from a previous successful check
            against the same IBAN, or from what it knows of the payee &mdash; may go straight to that
            entry. One with nothing to go on attempts the entries in turn, or attempts them all.
          </p>
          <p>
            What the choice does not change is what may be concluded. A <code>200</code> carrying
            <code>ConfirmationOfPayee.Yes</code>, <code>Partial</code>, or <code>No</code> is
            authoritative, because the account was found and the submitted name was evaluated against it.
            A <code>204</code> means only that the instance queried does not hold the account.
            <strong>The IBAN may be reported as not recognised only once every entry in the array has
            returned <code>204</code></strong> &mdash; a TPP that called some of the entries and received
            <code>204</code> from each has an inconclusive result, not a negative one.
          </p>
          <p>
            <strong>Nothing changes at the LFI.</strong> Ozone Connect keeps the same
            <RouterLink to="/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/open-api/cop-query"><code>POST /customers/action/cop-query</code></RouterLink>
            contract, and each instance answers for the accounts it holds exactly as it does now. Both
            URLs in every entry are Hub-hosted &mdash; <code>auth1.{lfiCode}</code> and
            <code>rs1.{lfiCode}</code> &mdash; so this is the Hub returning more of what it already
            knows, from directory data it already holds. This is the reason for preferring this shape to the
            alternatives set out in section 06.
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
          <h2 class="ofp-band__title">What goes in the array, and what the TPP does with it</h2>
          <p class="ofp-band__lede">
            Returning more than one endpoint only helps if it is unambiguous which responses end the
            search, which ones continue it, and what the TPP is entitled to tell the payer at the end.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong><code>Data</code> MUST be an array of one or more source objects.</strong> Each
                object keeps the current schema unchanged &mdash;
                <code>DiscoveryEndpointUrl</code> and <code>ResourceServerUrl</code>, both required. A
                bank with a single instance returns an array of one; there is no special case and no
                object form to fall back to.
              </li>
              <li>
                <strong>The Hub MUST include only instances that serve Confirmation of Payee.</strong>
                An instance that does not advertise the <code>confirmation</code> API family is left out,
                so a TPP is never sent to an endpoint that cannot answer the question it is being asked.
              </li>
              <li>
                <strong>The order MUST be stable for a given bank code</strong>, and the Hub SHOULD order
                entries by how likely each is to hold an arbitrary account &mdash; in practice retail
                first. Position carries no assertion about the payee: the first entry is the most likely
                instance, not the identified one.
              </li>
              <li>
                <strong>How many entries to call is the TPP&rsquo;s choice.</strong> A TPP that has
                grounds to identify the instance holding the payee&rsquo;s account MAY call that entry
                alone; a TPP without them MAY call the entries in turn or call them all. Nothing in this
                proposal requires a fixed number of attempts.
              </li>
              <li>
                <strong>A <code>200</code> is authoritative and ends the check.</strong> The account was
                found and the submitted name was evaluated against it, so <code>Yes</code>,
                <code>Partial</code>, and <code>No</code> are all final. The TPP MUST NOT continue to
                other entries looking for a better answer.
              </li>
              <li>
                <strong>A <code>204</code> MUST NOT be reported as &ldquo;not recognised&rdquo; unless
                every entry returned one.</strong> A <code>204</code> states only that the instance
                queried does not hold the account. Where the TPP called a subset, or where any entry
                answered <code>4xx</code> or <code>5xx</code>, the result is inconclusive and the outcome
                reported to the payer is <em>could not verify</em> &mdash; a different statement from
                <em>not recognised</em>, and the
                <RouterLink to="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys">user journeys</RouterLink>
                must keep the two apart.
              </li>
              <li>
                <strong>Each entry is authenticated on its own terms.</strong> The access token for a
                <code>/confirmation</code> call comes from the token endpoint published at that
                entry&rsquo;s <code>DiscoveryEndpointUrl</code>; a token issued by one instance is not
                valid at another. TPPs SHOULD cache tokens per instance and reuse them across checks
                rather than re-authenticating on every attempt.
              </li>
              <li>
                <strong>Where more than one entry is attempted, the attempts SHOULD be sequential.</strong>
                Calling every entry in parallel incurs a charge for each one and multiplies load across the
                ecosystem for a single payee check, whereas sequential attempts stop at the first
                <code>200</code>.
              </li>
              <li>
                <strong>The request is unchanged.</strong> <code>POST /discovery</code> still takes the
                IBAN alone &mdash; no segment hint, no account-type parameter. The TPP does not know the
                payee&rsquo;s segment either, so asking it to declare one would only move the guess.
              </li>
              <li>
                <strong>No change to <code>/confirmation</code>, and none at the LFI.</strong> The
                confirmation request and response schemas, the match indicators, and the Ozone Connect
                <code>cop-query</code> contract are all untouched.
              </li>
              <li>
                <strong>Out of scope: every other flow.</strong> Data Sharing and Service Initiation
                select an authorisation server from the directory with the customer&rsquo;s involvement,
                so segmentation is already handled there. Insurance is unaffected.
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
            One schema field changes cardinality. The implementation work falls on the API Hub and on
            TPPs. <strong>No LFI changes anything.</strong>
          </p>
        </div>

        <div class="ofp-rules">
          <div class="ofp-rules__label">Who implements what</div>
          <ul class="ofp-rules__list">
            <li>
              <strong>LFI &mdash; nothing.</strong> No new endpoint, no schema change, and no change to
              Ozone Connect. <code>POST /customers/action/cop-query</code> keeps its current contract,
              and each instance answers for the accounts it holds exactly as it does now. An LFI does
              not see this change: it never learns whether the Hub named it alone or alongside its other
              instances, because the array is assembled after the Hub has resolved the IBAN and before
              any LFI is called at all. Nothing is required of an LFI to be conformant at V2.2.
            </li>
            <li>
              <strong>API Hub &mdash; the response.</strong> The schema change, and assembling the array
              from directory data the Hub already holds. It calls no one it does not call today.
            </li>
            <li>
              <strong>TPP &mdash; parsing and reporting.</strong> Read an array rather than an object,
              decide which entries to call, and apply the reporting rule: &ldquo;not recognised&rdquo;
              only once every entry has returned <code>204</code>.
            </li>
          </ul>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards specification</div>
            <p>
              In <code>uae-confirmation-of-payee-openapi.yaml</code>, change
              <code>AEConfirmationDiscoveryResponse.Data</code> from a
              <code>$ref</code> to <code>AEConfirmationSourceProperties</code> into an
              <code>array</code> of it, with <code>minItems: 1</code>.
              <code>AEConfirmationSourceProperties</code> itself is unchanged &mdash; both fields stay
              required, so each entry is exactly the object TPPs parse today. The request schema,
              <code>Links</code>, and <code>Meta</code> are untouched, and
              <code>/confirmation</code> does not move. Targets <strong>V2.2</strong>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; API Hub</div>
            <p>
              Assemble the response from every authorisation server registered under the resolved bank
              code whose instance advertises the <code>confirmation</code> API family, in a stable order
              with the retail instance first. The Hub holds all of this in the Trust Framework directory
              already &mdash; <code>lfiCode</code>, <code>issuer</code>, <code>discoveryUri</code>,
              <code>apiFamilies</code> &mdash; so the change is in how the response is built, not in what
              the Hub knows or who it has to ask.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; Documentation</div>
            <p>
              Rewrite steps 5 to 10 of the
              <RouterLink to="/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/api-guide">Confirmation of Payee API Guide</RouterLink>
              so discovery yields a list and the token-and-confirm sequence is shown as a loop over it,
              with the stop conditions from section 03 stated as code rather than prose. Update the CoP
              sequence diagram, the capability landing page, and the
              <RouterLink to="/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/user-journeys">user journeys</RouterLink>
              so &ldquo;not recognised&rdquo; and &ldquo;could not verify&rdquo; are presented to the
              payer as the different outcomes they are. Record the change in the version changelog.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; Functional certification and Postman</div>
            <p>
              Add a Confirmation of Payee scenario in which an IBAN belonging to a multi-instance bank
              resolves to an array of more than one entry, the first attempt returns <code>204</code>,
              and a later entry returns a match. The assertion is on what the TPP reports, not on how
              many entries it called: a single <code>204</code> must not be surfaced to the payer as
              &ldquo;not recognised&rdquo;. Update the CoP Postman collection to iterate the returned
              entries.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">05 &middot; Separate prerequisite &mdash; onboarding the non-retail instances</div>
            <p>
              This one is not part of the change above, is not required for conformance at V2.2, and is
              not scheduled by this proposal &mdash; but without it the array returns nothing beyond the
              retail instance. For a corporate payee to be verifiable, the SME and corporate instances
              have to serve CoP, advertise the <code>confirmation</code> API family, and accept the
              <code>confirmation-of-payee</code> scope, and TPPs have to be able to authenticate against
              them. Where an LFI has not implemented <code>cop-query</code> on those instances, that is
              LFI work &mdash; but it is the work of extending an existing capability to another estate,
              not anything this proposal introduces.
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- ═══════════════════════════════════════════════════════════════════
         05 · VERSIONING AND MIGRATION
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; Versioning and migration</div>
          <h2 class="ofp-band__title">A breaking change that is safe in a minor version</h2>
          <p class="ofp-band__lede">
            The change is breaking &mdash; <code>Data</code> stops being an object &mdash; so it is
            proposed for <strong>V2.2</strong>, at a version boundary, rather than as an erratum against
            V2.1. What makes a minor version sufficient is that nothing about this endpoint forces two
            participants to migrate together.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Why the two versions can run side by side</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The API Hub controls the endpoint end to end.</strong>
                <code>POST /discovery</code> is answered by the Hub alone, from directory data, with no
                LFI in the path. The Hub can therefore serve
                <code>/open-finance/confirmation-of-payee/v2.1/discovery</code> and
                <code>/v2.2/discovery</code> concurrently, returning the single object at one and the
                array at the other.
              </li>
              <li>
                <strong>The call is client credentials, not consented.</strong> There is no consent bound
                to a version, no authorisation journey, and no stored state that outlives the request.
                Each discovery call stands alone, so the version is a property of the request the TPP
                makes and of nothing else.
              </li>
            </ul>
          </div>
          <p>
            Together these mean <strong>a TPP migrates when it chooses to</strong>. One that has not
            moved keeps calling the V2.1 path and keeps receiving the single-object response &mdash;
            including where the LFI holding the payee&rsquo;s account has already migrated, because the
            LFI&rsquo;s version has no bearing on the shape the Hub returns to a TPP. The V2.1 request
            and response examples stay correct for as long as V2.1 is served.
          </p>
          <p>
            This is what separates it from a breaking change in Data Sharing or Service Initiation, where
            a consent is created at a version and held for its lifetime, so one participant&rsquo;s
            migration pulls on the other&rsquo;s. Here there is no such coupling: a TPP picks up the
            segment fix at the point it moves to V2.2, and until then behaves exactly as it does today.
          </p>
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
          <h2 class="ofp-band__title">Two other ways to find the right estate</h2>
          <p class="ofp-band__lede">
            Both resolve the segment more precisely than fan-out does. Both were set aside &mdash; the
            first deliberately rather than permanently.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-changes">
            <div class="ofp-change">
              <div class="ofp-change__label">01 &middot; An LFI-hosted CoP discovery endpoint &mdash; deferred</div>
              <p>
                The LFI exposes an endpoint that resolves one of its own IBANs to the estate that holds
                it, and the Hub calls it before answering <code>/discovery</code>. This is the accurate
                answer: one request, the correct instance, no fan-out, no wasted charges, and no
                <code>204</code> that has to be interpreted.
              </p>
              <p>
                It was deferred on implementation effort. It puts a new endpoint into every LFI &mdash;
                specification, build, test, certification, and an operational dependency on the
                <code>/discovery</code> path for every bank in the ecosystem &mdash; to solve a problem
                the Hub can address on its own with data it already holds. Deferred, not rejected: if
                fan-out proves expensive in practice, this is the change that replaces it.
              </p>
            </div>

            <div class="ofp-change">
              <div class="ofp-change__label">02 &middot; A segment hint in the discovery request</div>
              <p>
                The TPP declares the expected account type and the Hub returns the matching instance.
                This requires the TPP to know the payee&rsquo;s segment, which it has no basis for: the
                payee is not its customer, and a TPP paying an invoice holds a name and an IBAN, not an
                account type. The parameter would move the assumption from the Hub to the TPP without
                the retry that fan-out provides when the assumption is wrong.
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
          <h2 class="ofp-band__title">Two questions, asked with the vote</h2>
          <p class="ofp-band__lede">
            These appear as optional boxes when you confirm your vote. Answer the ones addressed to you
            &mdash; every voter sees both. The vote decides the response shape; these answers decide the
            version it lands at and what it costs to use.
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
          <h2 class="ofp-band__title">What the array buys</h2>
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
