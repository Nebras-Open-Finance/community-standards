<route lang="yaml">
meta:
  title: 'OFP-010 · Make the transaction narrative (TransactionInformation) a required field'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-010. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Technical changes, Pros, Cons, and the open
// questions put to the ecosystem. Styling follows the site's editorial system
// and mirrors OFP-009.
import { ref, computed, onMounted, watch, type Component } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'
import PvProposalTabs from '@/components/proposals/PvProposalTabs.vue'

const OG_TITLE = 'OFP-010 · Make the transaction narrative (TransactionInformation) a required field'
const OG_DESCRIPTION =
  'Make TransactionInformation — the transaction narrative — a required field on every transaction the API returns. The narrative is what powers categorisation, affordability, and underwriting; without it the dataset is close to meaningless. Codifies what Nebras already enforces for CASA into the spec, and asks the ecosystem whether it is achievable for every product.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-010',
  proposedBy: 'Nebras',
  author: 'Nowaier AlQahtani',
  // Fallbacks shown until the API responds (and during the static build).
  opened: '30 Jul 2026',
  closes: '19 Aug 2026',
  priority: 'high' as Priority,
  version: 'V2.2',
}

const pros = [
  'The dataset gains its meaning. The narrative is what turns a row of amounts and dates into something a TPP can act on — categorisation, affordability assessment, and underwriting all read from it. Without it the payload is close to inert.',
  'Codifies a rule Nebras already enforces. Where CASA transaction data has arrived without narratives, Nebras has required remediation plans before functional sign-off. Making the field required turns that case-by-case remediation into a published, testable conformance rule.',
  'One consistent expectation across every LFI — the narrative can no longer be silently dropped by some institutions and populated by others, which is what makes cross-LFI data comparable.',
  'A missing narrative is caught at functional certification, before production, rather than surfacing as a data-quality gap once TPPs are live.',
  'Minimal, additive spec change: the field already exists and is already sized (1–500 characters). This only adds it to the transaction object’s required list — no new fields, no shape changes.',
]

const cons = [
  'The rule was shaped by CASA. Current and savings accounts reliably carry a narrative; credit cards, personal finance, mortgages, and SME / corporate accounts may source it differently — or, for some product cores, not populate it at all.',
  'An LFI whose core does not emit a narrative for a given product line would need a core or mapping change to comply — a real remediation cost, not just a schema toggle.',
  'A hard presence check guarantees the field is there, not that it is useful. It invites placeholder padding (“-”, “N/A”, “Transaction”) that passes validation while defeating the intent.',
  'The transaction object is a single shared schema — required is all-or-nothing across products. It cannot, as written, say “required for CASA, optional for mortgages”.',
  'Because this is a response field, strict runtime rejection is blunt: one transaction missing a narrative could fail validation for an entire page of results. Primary enforcement therefore sits at certification, not at every live call.',
]

const exampleToday = `# GET /accounts/{AccountId}/transactions · AETransaction — today
required:
  - TransactionId
  - CreditDebitIndicator
  - Status
  - BookingDateTime
  - Amount
  - TransactionDateTime
  - TransactionType
  - SubTransactionType
  # TransactionInformation is DEFINED but not required:
properties:
  TransactionInformation:
    description: The transaction narrative — unstructured text.
    type: string
    minLength: 1
    maxLength: 500`

const exampleProposed = `# GET /accounts/{AccountId}/transactions · AETransaction — proposed
required:
  - TransactionId
  - CreditDebitIndicator
  - Status
  - BookingDateTime
  - Amount
  - TransactionDateTime
  - TransactionType
  - SubTransactionType
  - TransactionInformation        # ← added; field bounds unchanged (1–500)`

// Worked examples — a "meaningful vs defeats-the-purpose" grid. Both columns
// pass minLength 1; only the left column carries actual narrative value. This
// is deliberately the tension the quality open question raises.
const validRefs = [
  { ref: 'CARREFOUR HYPERMARKET, DUBAI MALL', note: 'Debit — merchant and location' },
  { ref: 'SALARY — ACME TRADING LLC', note: 'Credit — payer identified' },
  { ref: 'ATM Withdrawal — ADCB, Sheikh Zayed Rd', note: 'Cash — channel and site' },
  { ref: 'Etisalat postpaid bill', note: 'Bill payment — biller named' },
  { ref: 'IB Transfer to A. Khan — rent', note: 'Transfer — counterparty and reason' },
]
const invalidRefs = [
  { ref: '(field omitted)', note: 'Fails: the field is now required and absent' },
  { ref: '-', note: 'Passes schema, defeats intent — placeholder padding' },
  { ref: 'N/A', note: 'Passes schema, defeats intent — no narrative' },
  { ref: 'Transaction', note: 'Passes schema, defeats intent — generic filler' },
  { ref: 'TXN', note: 'Passes schema, defeats intent — carries nothing' },
]

// The open questions put to the ecosystem.
const asks = [
  {
    n: 'Q1',
    text: 'Cross-product achievability — this is the central question. The narrative is dependable for CASA, but the transactions endpoint is shared across credit cards, personal finance, mortgages, and SME / corporate accounts. For each of those, can your core reliably supply a meaningful narrative for every transaction? Where it cannot today, what would remediation involve, and how long would it take? Making the field required binds every product at once — we need to know where that is not achievable before we commit.',
  },
]

// ─── Voting ─────────────────────────────────────────────────────────────────
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

const outcomeMods = import.meta.glob('./outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Make the transaction narrative a required field',
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

function toISO(display: string): string {
  const d = new Date(display)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
}

function daysLeft(iso: string): string {
  if (!iso) return ''
  const days = Math.ceil((new Date(`${iso}T23:59:59Z`).getTime() - Date.now()) / 86_400_000)
  if (days < 0) return 'Closed'
  if (days === 0) return 'Closing today'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function fmtDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

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

        <h1 class="ofp__title">Make the transaction narrative a required field</h1>
        <p class="ofp__summary">
          Add <code>TransactionInformation</code> — the transaction narrative — to the required list on
          every transaction the data-sharing API returns. The narrative is what powers categorisation,
          affordability, and underwriting; without it the dataset is close to meaningless. This codifies
          what Nebras already enforces for CASA, and asks the ecosystem whether it is achievable for
          <em>every</em> product.
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
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 · Background</div>
              <h2 class="ofp-band__title">The narrative is the value — and it is optional</h2>
            </div>
            <div class="ofp-prose">
              <p>
                A transaction returned from
                <RouterLink to="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions">
                <code>GET /accounts/{AccountId}/transactions</code></RouterLink> carries the structured
                essentials — an amount, a date, a credit/debit indicator, a type. What tells a TPP what the
                transaction was actually <em>for</em> is the narrative: the free-text
                <code>TransactionInformation</code> field. It is the single most important input to the
                use cases Open Finance exists to enable — <strong>categorisation</strong>,
                <strong>affordability assessment</strong>, and <strong>underwriting</strong>. Strip it out
                and a statement collapses into a column of amounts a TPP cannot reason about.
              </p>
              <p>
                Yet in the specification the field is <strong>defined but not required</strong>. In the TPP
                Standards spec, <code>TransactionInformation</code> is a
                <code>string</code> of 1–500 characters described as “the transaction narrative, which is
                unstructured text”, but it does not appear in the <code>AETransaction</code> required list.
                The picture is the same on the LFI side: the
                <RouterLink to="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions">
                Ozone Connect</RouterLink> <code>transactionInformation</code> field is optional on
                <code>CbuaeTransaction</code> too. An LFI can therefore return a schema-valid transactions
                response with no narrative at all.
              </p>
              <p>
                In practice Nebras has not accepted that. Where an LFI’s <strong>CASA</strong> transaction data
                has arrived without narratives, it has been treated as a functional-certification failure and a
                <strong>remediation plan has been required</strong> before sign-off — because a dataset without
                the narrative is not a functioning dataset. This proposal asks that we stop enforcing that
                case by case and <strong>write it into the standard</strong>.
              </p>
              <p>
                The complication is scope. The remediation practice grew up around CASA — current and savings
                accounts, where a narrative is dependable. But the transactions endpoint is a
                <strong>single shared schema</strong> used for every product: credit cards, personal finance,
                mortgages, and SME / corporate accounts all report through it. We have not scrutinised the
                narrative for those products the way we have for CASA. Making the field technically required
                turns it on for all of them at once — so the honest question this proposal puts to the
                ecosystem is whether every LFI can actually supply it, for every product.
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
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 · Recommendation</div>
              <h2 class="ofp-band__title">Require it on the transaction object</h2>
            </div>
            <div class="ofp-prose">
              <p>
                Add <code>TransactionInformation</code> to the <code>required</code> list of the transaction
                object, on both sides of the Hub: <code>AETransaction</code> in the TPP Standards spec and
                <code>transactionInformation</code> on <code>CbuaeTransaction</code> in the Ozone Connect spec.
                The field already exists and is already sized — this is a one-line addition to a required
                array, not a new field or a shape change. Field bounds (1–500 characters) do not move.
              </p>
              <p>
                Because the LFI is the producer of this data, the obligation binds the LFI. It is asserted
                <strong>primarily at functional certification</strong> — exactly where Nebras already asserts
                it for CASA — so that a narrative-less transactions response fails sign-off before production
                rather than being remediated ad hoc afterwards. Writing it into the schema makes the rule
                <strong>published and testable</strong> instead of discretionary.
              </p>
              <p>
                The proposal deliberately recommends the <strong>uniform</strong> change — required across every
                product — because that is what a schema-level requirement means, and because a consistent
                narrative across LFIs is what makes the data comparable. But it does not assume every product
                can meet it. Whether that is achievable for credit cards, personal finance, mortgages, and
                SME accounts is the <strong>central open question</strong> below, and the answer may move us
                toward a product-scoped rule enforced at certification rather than in the schema. We would
                rather surface that trade-off than legislate through it.
              </p>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             TECHNICAL CHANGES
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--cream">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 · Technical changes</div>
              <h2 class="ofp-band__title">What changes in the spec</h2>
              <p class="ofp-band__lede">
                A single field added to the transaction object’s <code>required</code> list on each side —
                field definition and bounds unchanged.
              </p>
            </div>

            <div class="ofp-changes">
              <div class="ofp-change">
                <div class="ofp-change__label">01 · TPP Standards spec</div>
                <p>
                  Add <code>TransactionInformation</code> to <code>AETransaction.required</code> in
                  <code>uae-account-information-openapi.yaml</code>. The field’s own definition
                  (<code>string</code>, <code>minLength 1</code>, <code>maxLength 500</code>) is untouched.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">02 · Ozone Connect spec</div>
                <p>
                  Add <code>transactionInformation</code> to <code>CbuaeTransaction.required</code> in
                  <code>uae-ozone-connect-bank-data-sharing-openapi.yaml</code>, so the obligation binds the
                  LFI as the data producer and the two sides stay in step.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">03 · Align the Ozone Connect bounds</div>
                <p>
                  The Ozone Connect <code>transactionInformation</code> currently declares no length bounds.
                  Add <code>minLength 1</code> / <code>maxLength 500</code> so both sides agree on what a
                  valid narrative is — otherwise a field that is “required” could still be an empty string.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">04 · Where it is enforced</div>
                <p>
                  Primarily at <strong>functional certification</strong>, against the LFI’s pre-production
                  environment — the same gate at which Nebras already requires CASA narratives. Formalising it
                  in the schema turns today’s case-by-case remediation into a standing conformance rule.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">05 · Runtime behaviour</div>
                <p>
                  This is a <em>response</em> field, so strict runtime rejection is blunt: a single narrative
                  missing from an LFI response would otherwise fail schema validation for a whole page of
                  transactions. Certification is therefore the primary control; any runtime handling at the
                  API Hub should be decided deliberately rather than defaulting to a hard reject.
                </p>
              </div>
            </div>

            <div class="ofp-code">
              <div class="ofp-code__label">Today — defined, but not required</div>
              <pre class="ofp-code__pre">{{ exampleToday }}</pre>
            </div>

            <div class="ofp-code">
              <div class="ofp-code__label">Proposed — one line added to required</div>
              <pre class="ofp-code__pre">{{ exampleProposed }}</pre>
            </div>

            <div class="ofp-ex">
              <div class="ofp-ex__col ofp-ex__col--ok">
                <div class="ofp-ex__head">
                  <span class="ofp-ex__glyph ofp-ex__glyph--ok">&check;</span> Meaningful
                </div>
                <ul class="ofp-ex__list">
                  <li v-for="(e, i) in validRefs" :key="`ok-${i}`" class="ofp-ex__item">
                    <code class="ofp-ex__ref" dir="auto">{{ e.ref }}</code>
                    <span class="ofp-ex__note">{{ e.note }}</span>
                  </li>
                </ul>
              </div>
              <div class="ofp-ex__col ofp-ex__col--no">
                <div class="ofp-ex__head">
                  <span class="ofp-ex__glyph ofp-ex__glyph--no">&times;</span> Defeats the purpose
                </div>
                <ul class="ofp-ex__list">
                  <li v-for="(e, i) in invalidRefs" :key="`no-${i}`" class="ofp-ex__item">
                    <code class="ofp-ex__ref" dir="auto">{{ e.ref }}</code>
                    <span class="ofp-ex__note">{{ e.note }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <p class="ofp-ex__foot">
              Only the first row on the right is caught by the schema (the field is now required and absent).
              The rest pass a presence check yet carry no narrative — which is precisely what the quality
              question below is about.
            </p>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════
             PROS
        ═══════════════════════════════════════════════════════════════ -->
        <section class="ofp-band ofp-band--white">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · Pros</div>
              <h2 class="ofp-band__title">What requiring the narrative buys</h2>
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
        <section class="ofp-band ofp-band--cream">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 · Cons</div>
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
        <section class="ofp-band ofp-band--white">
          <div class="ofp-band__inner">
            <div class="ofp-band__head">
              <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 · Open questions</div>
              <h2 class="ofp-band__title">What we’re asking the ecosystem</h2>
              <p class="ofp-band__lede">
                The recommendation is uniform on purpose — but whether it is achievable everywhere is
                genuinely open. Settle this and it folds into the change.
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

/* ─── Proposed regex line ───────────────────────────────────────────────── */
.ofp-prose .ofp-regex {
  margin: 4px 0 20px;
  padding: 12px 16px;
  background: var(--at-inverse-bg);
  overflow-x: auto;
}

.ofp-prose .ofp-regex code {
  font-family: var(--at-mono);
  font-size: 13px;
  color: #d7e4f5;
  background: none;
  border: none;
  padding: 0;
  white-space: pre;
}

/* ─── Valid / invalid examples ──────────────────────────────────────────── */
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

.ofp-ex__foot code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
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
