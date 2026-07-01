<route lang="yaml">
meta:
  title: 'OFP-002 · Split the payment schema into Domestic and International definitions'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-002. Hand-authored (not rendered from the proposals
// data array) so the content can be laid out in named sections — Background,
// Recommendation, Technical changes, Draft schemas, Pros, Cons, and the specific
// asks of the ecosystem. Styling follows the site's editorial system and mirrors
// OFP-001. This proposal lives in its own folder so the two draft schema YAMLs
// (domestic-payment-schema.yaml / international-payment-schema.yaml) sit beside the
// page; they are imported raw below and shown in the Draft schemas section.
import { ref, computed, onMounted, watch, type Component } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'
import PvProposalTabs from '@/components/proposals/PvProposalTabs.vue'

useHead({ title: 'OFP-002 · Split the payment schema into Domestic and International definitions' })

const meta = {
  id: 'OFP-002',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '17 Jun 2026',
  closes: '28 Jul 2026',
  priority: 'high' as Priority,
  version: 'V2.2',
}

const pros = [
  'Domestic vs international is read from the top of the request — not inferred from whether an optional object is present or from which shape happens to be inside the encrypted PII blob.',
  'The common case gets simpler: domestic no longer carries the international-only CurrencyRequest (FX) object at all.',
  'International gets its own schema that can be modelled to cross-border reality, so the fields LFIs need live in the standard instead of in bespoke per-LFI consent and authorization journeys.',
  'One standard international schema means one consistent customer experience across the ecosystem, rather than each LFI diverging.',
  'Validation becomes context-specific: the API Hub can require FX / currency-of-transfer only for international, and Confirmation of Payee only for domestic.',
  'Restricting international to Single Instant Payment and Fixed Periodic Schedule matches what is realistically supported cross-border and shrinks what each LFI must build.',
]

const cons = [
  'It is a breaking change to the consent (PAR) and payment-creation request that every implementer must adopt.',
  'The detailed international field set still has to be designed — this proposal makes the split and moves CurrencyRequest across; the field-by-field cross-border modelling is a follow-up worked through with LFIs.',
]

const exampleToday = `# ONE shared schema for domestic AND international.
# Which one it is gets signalled only IMPLICITLY:
POST /payments
{
  "Data": {
    "ConsentId": "pcon_8821",
    "Instruction": { "Amount": { "Amount": "5000.00", "Currency": "AED" } },
    "CurrencyRequest": {                # optional — its PRESENCE means "international"
      "ExtendedPurpose": "Family support",
      "CurrencyOfTransfer": "GBP",
      "DestinationCountryCode": "GB"
    },
    "PersonalIdentifiableInformation": "<JWE>",   # anyOf[ Domestic | International ]
    "PaymentPurposeCode": "GDDS",
    "OpenFinanceBilling": { ... }
  }
}
# Domestic vs international is decided by (a) whether CurrencyRequest is present and
# (b) which PII shape happens to sit inside the encrypted blob — never stated outright.`

const exampleProposed = `# TWO definitions, chosen at the TOP of the request.

# == DOMESTIC == today's shape, CurrencyRequest removed
POST /payments                         # Domestic
{
  "Data": {
    "ConsentId": "pcon_8821",
    "Instruction": { "Amount": { "Amount": "5000.00", "Currency": "AED" } },
    "PersonalIdentifiableInformation": "<JWE: domestic creditor (IBAN) + CoP>",
    "PaymentPurposeCode": "GDDS",
    "OpenFinanceBilling": { ... }
  }
}

# == INTERNATIONAL == banking cross-border (FX quoting is a separate spec)
POST /payments                         # International
{
  "Data": {
    "ConsentId": "pcon_9034",
    "Instruction": {                   # external (instructed) XOR internal (equivalent)
      "EquivalentAmount": {            # debtor pays 5,000 AED, converted to GBP
        "Amount": { "Amount": "5000.00", "Currency": "AED" },
        "CurrencyOfTransfer": "GBP"
      }
    },
    "ExchangeRateInformation": { "UnitCurrency": "AED", "RateType": "Indicative" },
    "ChargeBearer": "Shared",
    "DestinationCountryCode": "GB",
    "PaymentPurposeCode": "GDDS",      # external — ISO ExternalPurpose1Code, not Aani
    "ProprietaryPurposeCode": "FAMILY-SUPPORT",   # internal — bank/corridor code
    "ExtendedPurpose": "Family support",
    "EndToEndIdentification": "e2e-9034-jun26",
    "PersonalIdentifiableInformation": "<JWE: international creditor + agent — unchanged>",
    "OpenFinanceBilling": { ... }
  }
}
# International payment types: SingleInstantPayment and FixedPeriodicSchedule only.`

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
// let the tally show through (draft/internal keep their frosted cover below).
const isClosed = computed(() => status.value === 'closed')

// Optional companion partials, authored per proposal and co-located in this
// folder (ofp-002.outcome.vue / ofp-002.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-002.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-002.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Split the payment schema into Domestic and International definitions',
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

// Format an ISO date ('2026-06-16') as the strip's display form ('16 Jun 2026').
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
  // OFP-002 is internal — once the API confirms it, the status becomes 'internal'
  // (overriding the date-derived open/closed), which the hero pill and the vote
  // cover below key off.
  status.value = deriveStatus(openedISO, closesISO, undefined, m?.internal ?? false)
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

        <h1 class="ofp__title">Split the payment schema into Domestic and International definitions</h1>
        <p class="ofp__summary">
          PAR and <code>POST /payments</code> carry both domestic and international payments through one
          shared schema, where international is only signalled implicitly. Split them at the top into a
          Domestic definition (today&rsquo;s shape, minus the FX object) and an International definition that
          can be modelled to cross-border reality.
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

      <!-- Before voting opens (or while internal), frost over the whole white
           block. Once voting has closed the cover is dropped so the tally shows
           through — the band head and panel carry the closed treatment instead. -->
      <div v-if="status === 'draft' || status === 'internal'" class="ofp-vote-cover" aria-hidden="false">
        <div class="ofp-vote-cover__card">
          <div class="ofp-vote-cover__label">
            {{ status === 'internal' ? 'Internal proposal' : 'Voting not yet open' }}
          </div>
          <div class="ofp-vote-cover__msg">
            {{ status === 'internal'
              ? 'This proposal is under internal review.'
              : `Voting opens ${openedDisplay}` }}
          </div>
        </div>
      </div>
    </section>

        <!-- Feedback: appended under the vote panel once voting has closed, when a
             feedback partial has been authored (else just the vote panel shows). -->
        <component :is="FeedbackPartial" v-if="FeedbackPartial && isClosed" />
      </template>

      <template #proposal>
    <!-- ═══════════════════════════════════════════════════════════════════
         THE PROPOSAL (starts here) · BACKGROUND
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream ofp-band--seam">
      <span class="ofp-seam-label">The proposal</span>
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 · Background</div>
          <h2 class="ofp-band__title">One schema asked to be two</h2>
        </div>
        <div class="ofp-prose">
          <p>
            PAR (<code>POST /par</code>) and <code>POST /payments</code> were designed to carry
            <strong>both</strong> domestic and international payments through a single payment schema. Nothing
            at the top of the request says which one is being made. The distinction is signalled only
            indirectly: by whether the optional <code>CurrencyRequest</code> (FX) object is present, and by
            which shape — domestic or international — happens to sit inside the encrypted
            <code>PersonalIdentifiableInformation</code> blob, expressed as an <code>anyOf</code> rather than
            an explicit choice.
          </p>
          <p>
            In practice the two have diverged sharply. <strong>Domestic payments have made real
            headway; international payments have not been delivered.</strong> Multiple LFIs have raised
            issues and asked for clarifications because the international fields have not mapped naturally to
            how a cross-border payment actually works — the international creditor shape is thin (a creditor
            account plus a single creditor agent), with none of the structure a SWIFT / ISO 20022 payment
            needs.
          </p>
          <p>
            Because the international schema was not what it needed to be, <strong>LFIs have moved the
            fields they actually require out of the standard and into their own Open Finance international
            consent and authorization journeys.</strong> If the API is adopted as it stands, that leads to a
            <strong>varying customer experience across the ecosystem</strong> — the opposite of what a shared
            standard is meant to deliver.
          </p>
          <p>
            The split is cheap to make now and expensive to defer. With little to no live international
            integration to migrate, separating the two definitions keeps the domestic schema free of
            international-only complexity and gives international its own home to be modelled properly.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         RECOMMENDATION
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 · Recommendation</div>
          <h2 class="ofp-band__title">Make the split explicit at the top</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Replace the single shared payment schema with an explicit choice between a Domestic
            definition and an International definition</strong>, made at the top of both the PAR consent and
            <code>POST /payments</code> — in place of today&rsquo;s implicit signalling through an
            <code>anyOf</code> PII and an optional <code>CurrencyRequest</code>.
          </p>
          <p>
            The <strong>Domestic definition is today&rsquo;s schema, unchanged, with one removal</strong>:
            the <code>CurrencyRequest</code> object goes. A domestic payment is always a same-currency
            (AED&nbsp;&rarr;&nbsp;AED) transfer, so FX never applies; the domestic creditor (IBAN-only, with
            Confirmation of Payee) stays exactly as it is.
          </p>
          <p>
            The <strong>International definition gets its own schema</strong>. As a first step it carries
            today&rsquo;s international PII plus the <code>CurrencyRequest</code> object — moved across and
            made a <strong>required, first-class part</strong> of the definition rather than an optional
            add-on. From there we realign its fields, field by field and with the LFIs, to cross-border
            SWIFT / ISO 20022 (pacs.008) practice. International is limited to <strong>two payment
            types</strong>: Single Instant Payment and Fixed Periodic Schedule.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 · Technical changes</div>
          <h2 class="ofp-band__title">What changes in the spec</h2>
          <p class="ofp-band__lede">
            One structural change — an explicit top-level split — and what each definition then looks like.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Top-level split (PAR + <code>POST /payments</code>)</div>
            <p>
              Introduce an explicit Domestic / International choice at the top of the consent and the
              payment-creation request, replacing the <code>anyOf</code> over the two
              <code>PersonalIdentifiableInformation</code> shapes and the &ldquo;is
              <code>CurrencyRequest</code> present?&rdquo; heuristic. The payment context is stated, not
              inferred.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · Domestic definition</div>
            <p>
              Remove the <code>CurrencyRequest</code> object — FX never applies to a same-currency domestic
              transfer. Everything else (the IBAN-only domestic creditor, Confirmation of Payee, the full
              payment-type taxonomy, references, billing) is unchanged.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · International definition — request body</div>
            <p>
              The old <code>CurrencyRequest</code> object is unpacked onto the request. <strong>Amount becomes
              an explicit choice</strong>: <code>InstructedAmount</code> (the external / target amount the
              creditor receives, in the currency of transfer) or <code>EquivalentAmount</code> (the internal /
              source amount debited in the debtor’s currency, plus the currency it converts into) — both
              reusing the domestic <code>{ Amount, Currency }</code> shape. <strong>Purpose splits</strong>
              into an external <code>PaymentPurposeCode</code> (ISO 20022 <code>ExternalPurpose1Code</code>;
              the domestic Aani 3-letter list no longer applies) and a simple internal
              <code>ProprietaryPurposeCode</code>, alongside the free-text <code>ExtendedPurpose</code>.
              <code>ExchangeRateInformation</code>, <code>ChargeBearer</code>, <code>InstructionPriority</code>
              and <code>DestinationCountryCode</code> stay; <code>EndToEndIdentification</code> is added; and
              the exchange-house <code>FxQuoteId</code> is removed (FX quoting is the separate FX Service
              Initiation spec). Payment types are restricted to <code>SingleInstantPayment</code> and
              <code>FixedPeriodicSchedule</code>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 · International definition — creditor (next step)</div>
            <p>
              The encrypted creditor block is <strong>unchanged in this draft</strong>. The cross-border
              additions LFIs need — intermediary agents, ultimate creditor / debtor, regulatory reporting, and
              structured remittance information, on top of the structured creditor address the schema already
              carries — are <strong>recommended as the next step</strong> and called out in the asks below,
              rather than modelled here yet.
            </p>
          </div>
        </div>

        <div class="ofp-code">
          <div class="ofp-code__label">Today — one shared schema, international signalled implicitly</div>
          <pre class="ofp-code__pre">{{ exampleToday }}</pre>
        </div>

        <div class="ofp-code">
          <div class="ofp-code__label">Proposed — Domestic and International, chosen at the top</div>
          <pre class="ofp-code__pre">{{ exampleProposed }}</pre>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         DRAFT SCHEMAS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · Draft schemas</div>
          <h2 class="ofp-band__title">The split, written out</h2>
          <p class="ofp-band__lede">
            Working drafts attached to this proposal — open each to read it in the same rendered view as
            the published API specs. Schemas the proposal changes are defined in full; schemas unchanged
            from the published spec are shown as stubs marked &ldquo;unchanged&rdquo;. The International draft
            restructures the cleartext request body (the instructed / equivalent amount choice, split purpose
            codes, <code>EndToEndIdentification</code>) while leaving today&rsquo;s encrypted creditor block
            unchanged — the cross-border creditor fields are the next step.
          </p>
        </div>

        <div class="ofp-cards">
          <RouterLink
            to="/proposals/ofp-002/domestic-schema"
            class="ofp-card"
            :style="{ '--card-color': '#008B78' }"
          >
            <span class="ofp-card__top" :style="{ background: '#008B78' }" />
            <div class="ofp-card__meta">
              <span class="ofp-card__cat" :style="{ color: '#008B78' }">Domestic</span>
            </div>
            <h3 class="ofp-card__title">domestic-payment-schema.yaml</h3>
            <p class="ofp-card__desc">Today&rsquo;s shape, with the CurrencyRequest object removed.</p>
            <div class="ofp-card__foot">
              <span class="ofp-card__cta">Open rendered schema</span>
              <span class="ofp-card__arrow" :style="{ color: '#008B78' }">&rarr;</span>
            </div>
          </RouterLink>

          <RouterLink
            to="/proposals/ofp-002/international-schema"
            class="ofp-card"
            :style="{ '--card-color': '#0043A6' }"
          >
            <span class="ofp-card__top" :style="{ background: '#0043A6' }" />
            <div class="ofp-card__meta">
              <span class="ofp-card__cat" :style="{ color: '#0043A6' }">International</span>
            </div>
            <h3 class="ofp-card__title">international-payment-schema.yaml</h3>
            <p class="ofp-card__desc">Banking cross-border request body, two payment types.</p>
            <div class="ofp-card__foot">
              <span class="ofp-card__cta">Open rendered schema</span>
              <span class="ofp-card__arrow" :style="{ color: '#0043A6' }">&rarr;</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 · Pros</div>
          <h2 class="ofp-band__title">What the split buys</h2>
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
         CONS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 · Cons</div>
          <h2 class="ofp-band__title">What the split costs</h2>
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
  font-size: 0.82em;
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

.ofp-band__lede code {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
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
  max-height: 32rem;
  overflow-y: auto;
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
  background: var(--at-bg-cream);
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

/* ─── Asks ──────────────────────────────────────────────────────────────── */
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
  line-height: 1.55;
  color: var(--at-navy-deep);
}

/* ─── Reference chip ────────────────────────────────────────────────────── */
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

/* External (GitHub api-specs) links — deliberately distinct from the internal
   chips: monospace, dashed border, and a trailing arrow-out glyph. */
.ofp-ref--ext { margin-top: 12px; }

.ofp-ref__chip--ext {
  gap: 10px;
  font-family: var(--at-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--at-navy);
  border: 1px dashed var(--at-grid-line);
  background: transparent;
}

.ofp-ref__chip--ext:hover {
  border-color: var(--at-navy-deep);
  border-style: solid;
  background: var(--at-surface);
  color: var(--at-navy-deep);
}

.ofp-ref__ext-arrow {
  font-size: 14px;
  line-height: 1;
  color: var(--at-teal);
  transition: transform 0.15s ease;
}

.ofp-ref__chip--ext:hover .ofp-ref__ext-arrow { transform: translate(1px, -1px); }

/* ─── Vote cover (shown when voting is not open) ─────────────────────────── */
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
