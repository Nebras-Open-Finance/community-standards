<route lang="yaml">
meta:
  title: 'OFP-020 · Introduce Bulk/Batch Payments in V2.2'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-020. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Why V2.2, Technical changes, Questions, Pros, and
// Cons. Follows the OFP-019 layout. The payment model itself was settled by
// OFP-001; this proposal decides scope and timing only.
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
const OG_TITLE = 'OFP-020 · Introduce Bulk/Batch Payments in V2.2'
const OG_DESCRIPTION =
  'OFP-001 agreed that Bulk/Batch Payments carry their payments as a JSON array, not an uploaded file. This proposal asks whether to deliver them in V2.2: LFIs MUST support Bulk/Batch for SME and Corporate accounts, and MAY offer it for Retail accounts.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-020',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '26 Oct 2026',
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
    q: 'Can you support Bulk/Batch Payments for SME and Corporate accounts in V2.2? Do you plan to offer them for Retail accounts as well?',
    why: 'This confirms that the mandatory scope can be delivered on the V2.2 timeline, and tells TPPs early which LFIs intend to offer Retail Bulk/Batch.',
  },
  {
    who: 'TPPs',
    q: 'What would you use Bulk/Batch Payments for, and how many payments do you expect in one batch? Is a maximum of 5,000 instructions per request enough?',
    why: 'OFP-001 drafted Instructions[] with a maximum of 5,000 elements and left the final figure open. The answers set the limit in the V2.2 specification.',
  },
  {
    who: 'TPPs and LFIs',
    q: 'Is the split right: mandatory for SME and Corporate accounts, optional for Retail accounts?',
    why: 'The split decides which LFIs must build Bulk/Batch for V2.2, and how far TPPs can rely on it across the ecosystem.',
  },
]

const pros = [
  'Businesses can run payroll and supplier payments through Open Finance from V2.2, without waiting for a later release.',
  'The design is settled. OFP-001 agreed the JSON array model, which reuses the single-payment fields LFIs already implement.',
  'TPPs get a known baseline: every LFI supports Bulk/Batch for SME and Corporate accounts.',
  'There is no file handling to build: nothing to parse, scan for malware, or negotiate formats for.',
  'The API Hub checks each batch against NumberOfTransactions and ControlSum, so LFIs do not each build that check.',
  'LFIs that see no Retail demand do not have to offer Bulk/Batch to Retail accounts.',
]

const cons = [
  'Every LFI with SME or Corporate customers must build Bulk/Batch for V2.2: the Ozone Connect endpoint, the authorisation journey, and processing of the instructions.',
  'Because Retail support is optional, a TPP cannot assume Retail Bulk/Batch at every LFI.',
  'One JSON request is bounded by request-size limits, so the maximum batch size has to be fixed and very large runs split across several consents.',
  'Back-office files (ISO 20022 pain.001, CSV) must be mapped to JSON by the TPP before submission.',
  'Leaving debit posting to the LFI means a business may see one debit for the total at one LFI and one debit per payment at another.',
]

// The end-to-end flow — rendered in the Recommendation section. The consent and
// request shapes are the ones agreed in OFP-001.
const flowExample = `# 1 - TPP stages the consent at POST /par
"authorization_details": [{
  "type": "urn:openfinanceuae:service-initiation-consent:v2.2",
  "consent": {
    "ConsentId": "pcon_8821",
    "ControlParameters": {
      "ConsentSchedule": {
        "FilePayment": {
          "Description": "Payroll June 2026",
          "NumberOfTransactions": 250,
          "ControlSum": "125000.00",
          "RequestedExecutionDate": "2026-06-28"
        }
      }
    },
    ...
  }
}]

# 2 - The User authorises at the LFI, debiting an SME or Corporate account

# 3 - TPP creates the batch at POST /file-payments (signed JWS)
{
  "Data": {
    "ConsentId": "pcon_8821",
    "PaymentPurposeCode": "SALA",
    "OpenFinanceBilling": { ... },
    "Instructions": [ { ... }, { ... } ]     # 250 elements, as agreed in OFP-001
  }
}
# The API Hub checks Instructions.length == 250 and sum(Amount) == 125000.00
# before the request is proxied to the LFI.

# 4 - TPP tracks the batch at GET /file-payments/{PaymentId}`

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

const priorityLabel = computed(() => PRIORITY[priority.value]?.label ?? PRIORITY.high.label)

// Voting has finished: swap the "Cast your vote" CTA for a closed treatment and
// let the tally show through (the draft state keeps its frosted cover below).
const isClosed = computed(() => status.value === 'closed')

// Optional companion partials, authored per proposal and co-located with this
// page (ofp-020.outcome.vue / ofp-020.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-020.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-020.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Introduce Bulk/Batch Payments in V2.2',
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

// Format an ISO date ('2026-10-26') as the strip's display form ('26 Oct 2026').
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

        <h1 class="ofp__title">Introduce Bulk/Batch Payments in V2.2</h1>
        <p class="ofp__summary">
          <RouterLink to="/proposals/ofp-001/">OFP-001</RouterLink> agreed how Bulk/Batch Payments will
          work: the payments travel as a <strong>JSON array in one signed request</strong>, not as an
          uploaded file. This proposal asks whether to deliver them in <strong>V2.2</strong>. It recommends
          that LFIs <strong>MUST</strong> support Bulk/Batch for <strong>SME and Corporate</strong> accounts,
          and <strong>MAY</strong> offer it for Retail accounts.
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
            set out in section 05 below. The first asks LFIs whether they can deliver on the V2.2 timeline;
            the second asks TPPs how large their batches are; the third asks both whether the split between
            business and Retail accounts is right.
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
          <h2 class="ofp-band__title">The model is agreed; the timing is not</h2>
        </div>
        <div class="ofp-prose">
          <p>
            Bulk/Batch Payments &mdash; called <strong>File Payments</strong> in the specification &mdash;
            have been defined since v1.2 as a file upload. A TPP uploads a payment file in an LFI-specific
            format to <code>POST /payment-consents/{ConsentId}/file</code>, references it by hash on the
            consent, and then creates the batch with <code>POST /file-payments</code>. No LFI in the
            ecosystem has implemented these endpoints, and Bulk/Batch Payments are not yet documented for
            V2.2.
          </p>
          <p>
            <RouterLink to="/proposals/ofp-001/">OFP-001</RouterLink> replaced the file with a JSON array.
            The create request carries one <code>Instructions[]</code> element per payment, built from the
            single-payment fields the standard already defines, and is signed end-to-end like
            <code>POST /payments</code>. The consent drops <code>FileType</code>, <code>FileHash</code> and
            <code>FileReference</code>, adds a customer-facing <code>Description</code>, and keeps
            <code>NumberOfTransactions</code>, <code>ControlSum</code> and
            <code>RequestedExecutionDate</code>.
          </p>
          <p>
            This proposal does not reopen that model. It asks two questions that OFP-001 left open:
            <strong>should Bulk/Batch Payments be delivered in V2.2</strong>, and
            <strong>which LFIs must support them</strong>.
          </p>
        </div>

        <div class="ofp-callout">
          <div class="ofp-callout__title">Agreed in OFP-001</div>
          <div class="ofp-callout__text">
            The JSON array model, the revised consent object, and the draft schemas are taken from OFP-001
            as agreed. Comments on the shape of the request belong in the V2.2 specification review, not in
            this vote.
          </div>
        </div>

        <div class="ofp-ref">
          <span class="ofp-ref__label">Builds on</span>
          <RouterLink to="/proposals/ofp-001/" class="ofp-ref__chip">
            <span class="ofp-ref__square" /> OFP-001 &middot; Replace file-based Bulk/Batch Payments with a JSON array
          </RouterLink>
          <RouterLink to="/proposals/ofp-001/par-schema" class="ofp-ref__chip">
            <span class="ofp-ref__square" /> par-file-payment-schema.yaml
          </RouterLink>
          <RouterLink to="/proposals/ofp-001/schema" class="ofp-ref__chip">
            <span class="ofp-ref__square" /> bulk-payment-schema.yaml
          </RouterLink>
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
          <h2 class="ofp-band__title">Bulk/Batch in V2.2, mandatory for business accounts</h2>
          <p class="ofp-band__lede">
            Deliver Bulk/Batch Payments in V2.2 on the OFP-001 model. Every LFI supports them for SME and
            Corporate accounts; Retail support is the LFI&rsquo;s choice.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>Bulk/Batch Payments are part of V2.2</strong>, using the JSON array model agreed in
                OFP-001. The file-upload model is not part of V2.2.
              </li>
              <li>
                <strong>An LFI MUST support Bulk/Batch Payments for SME and Corporate accounts</strong>
                &mdash; accounts whose <code>AccountType</code> is <code>SME</code> or
                <code>Corporate</code>.
              </li>
              <li>
                <strong>An LFI MAY support Bulk/Batch Payments for Retail accounts.</strong> Where it does
                not, it MUST NOT offer a Retail account as the debtor account when the User authorises a
                Bulk/Batch consent. If the User holds no eligible account, the LFI MUST tell the User so, and
                the User returns to the TPP with the consent rejected.
              </li>
              <li>
                <strong>Bulk and Batch are one capability.</strong> The TPP sends one consent and one array of
                instructions. Whether the LFI posts one debit for the total or one debit per instruction is
                the LFI&rsquo;s decision.
              </li>
              <li>
                <strong>The API Hub validates the batch.</strong> Before the request reaches the LFI, the API
                Hub checks that the number of <code>Instructions</code> equals
                <code>NumberOfTransactions</code> and that the sum of their amounts equals
                <code>ControlSum</code>, and rejects the request if either check fails.
              </li>
              <li>
                <strong>Multi-authorisation is unchanged.</strong> Where a business account needs more than
                one approver, the existing
                <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/multi-authorization">multi-authorization</RouterLink>
                flow applies to a Bulk/Batch consent as it does to any other payment consent.
              </li>
            </ul>
          </div>

          <div class="ofp-code">
            <div class="ofp-code__label">End to end &mdash; one consent, one signed request</div>
            <pre class="ofp-code__pre">{{ flowExample }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · WHY V2.2
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Why V2.2</div>
          <h2 class="ofp-band__title">Why now, and why business accounts</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>The cost that kept Bulk/Batch unbuilt has gone.</strong> Under the file model, each LFI
            had to accept files in its own formats, scan them for malware, and protect the PII held in them,
            with no specification for any of it. OFP-001 removes all of that. What remains is one JSON
            endpoint built from fields LFIs already implement for single payments.
          </p>
          <p>
            <strong>Business accounts are where batches happen.</strong> Payroll, supplier runs and
            disbursements are made from SME and Corporate accounts. Making Bulk/Batch mandatory for those
            accounts gives a TPP serving businesses the same capability at every LFI.
          </p>
          <p>
            <strong>Retail demand is less clear.</strong> Few Retail Users pay many creditors at once.
            Leaving Retail optional lets an LFI offer it where it sees demand without requiring every LFI to
            build and support it.
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
            The OFP-001 drafts move into the V2.2 specifications, and the file-only endpoints are removed.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards specification &mdash; <code>uae-bank-initiation-openapi.yaml</code></div>
            <p>
              Remove <code>POST /payment-consents/{ConsentId}/file</code>. Replace the
              <code>POST /file-payments</code> request body with the OFP-001 <code>Instructions[]</code>
              request, and set the <code>maxItems</code> of <code>Instructions</code> from the answers to
              question 02. <code>GET /file-payments/{PaymentId}</code> and
              <code>GET /file-payments/{PaymentId}/report</code> stay; the report&rsquo;s format is aligned to
              the JSON model as part of the V2.2 specification work.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; Standards specification &mdash; <code>uae-authorization-endpoints-openapi.yaml</code></div>
            <p>
              Apply the OFP-001 changes to <code>ControlParameters.ConsentSchedule.FilePayment</code>: remove
              <code>FileType</code>, <code>FileHash</code> and <code>FileReference</code>; add
              <code>Description</code>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; API Hub</div>
            <p>
              Store the Bulk/Batch consent like any other payment consent. On
              <code>POST /file-payments</code>, validate the request against the schema and the array against
              <code>NumberOfTransactions</code> and <code>ControlSum</code>, then proxy it to the LFI.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; Ozone Connect &mdash; <code>uae-ozone-connect-bank-service-initiation-openapi.yaml</code></div>
            <p>
              The LFI receives the batch on its Ozone Connect
              <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/open-api/payments"><code>POST /payments</code></RouterLink>
              endpoint, whose file-payment request body is replaced by the array. The Ozone Connect
              <code>POST /payment-consents</code> and <code>POST /payment-consents/{consentId}/file</code>
              endpoints are removed. They exist only so the LFI can validate an uploaded file before
              authorisation; with no file to upload, the consent is held only in the API Hub, as for every
              other payment type. The LFI&rsquo;s authorisation journey shows the batch&rsquo;s
              <code>Description</code>, number of payments, total and execution date, and offers only eligible
              debtor accounts.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">05 &middot; Documentation</div>
            <p>
              Add Bulk/Batch Payment pages to the V2.2 TPP Standards and LFI API Hub guides, update the
              <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-status">payment status</RouterLink>
              note that says Bulk/Batch is not yet documented in V2.2, and add a V2.2 changelog entry.
            </p>
          </div>
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
          <h2 class="ofp-band__title">Three questions, asked with the vote</h2>
          <p class="ofp-band__lede">
            These appear as optional boxes when you confirm your vote.
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
          <h2 class="ofp-band__title">What delivering in V2.2 buys</h2>
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

