<route lang="yaml">
meta:
  title: 'OFP-021 · Correct formats for five Data Sharing fields'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-021. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Technical changes, Questions, Pros, and Cons.
// Follows the OFP-020 layout. Scope is the five Data Sharing fields aligned by
// Ozone Connect Bank Data Sharing v2.2.6, on both the Standards and the Ozone
// Connect side.
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
const OG_TITLE = 'OFP-021 · Correct formats for five Data Sharing fields'
const OG_DESCRIPTION =
  'Ozone Connect Bank Data Sharing v2.2.6 aligned MerchantId, TerminalId, BillerId, ExchangeRate and Salary to the Standards types, but those types are wrong for the data. This proposal sets one correct format for each field, in both specifications, for V2.2.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-021',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '2 Nov 2026',
  closes: '9 Nov 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

// The two questions asked alongside the vote. These are ALSO held in the
// proposals API (the `questions` column) — that is where the vote form reads
// them from, and where the answers are stored. Kept here so they are readable
// on the page before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'LFIs',
    q: 'Do the card and biller identifiers you hold fit these formats: MerchantId up to 15, TerminalId up to 16 and BillerId up to 35 letters and digits? Do any contain other characters, such as spaces or hyphens?',
    why: 'The limits follow ISO 8583 and are tighter than the 8 to 20 characters the Standards state today. Any identifier that does not fit must be found before the patterns are fixed in V2.2.',
  },
  {
    who: 'LFIs',
    q: 'Salary Frequency is not required. Do the values Weekly, Fortnightly, Monthly and Annual allow you to populate it for the salaries you hold? If not, which values are missing?',
    why: 'Frequency is optional so that an LFI which does not hold a period can still send Salary. Where an LFI does hold one, the list must cover it, or the field cannot be populated.',
  },
]

const pros = [
  'No value reaches the TPP as null because of its format. A value the LFI holds is a value the TPP receives.',
  'Identifiers keep their leading zeros and can carry the letters that card identifiers allow.',
  'Each field has the same format in the Standards and in Ozone Connect, so the API Hub maps it across without changing its type.',
  'ExchangeRate has a defined precision and arrives exactly as the LFI sent it, with no floating-point rounding or exponent notation.',
  'Salary carries its currency, and its period wherever the LFI holds one, so a TPP knows what the figure means.',
  'Length limits take effect. Today minLength and maxLength sit on integer fields, where they have no effect.',
  'The change is small: five fields in one API, in its two specifications.',
]

const cons = [
  'All five fields change type between V2.1 and V2.2, so a TPP that reads them must change its parsing.',
  'It reverses part of Ozone Connect v2.2.6. An LFI that has already built digits-only identifiers, or a numeric exchangeRate or salary, must change them again.',
  'The identifier limits are tighter than the 8 to 20 characters the Standards state today. An LFI holding longer merchant or terminal identifiers would fail validation.',
  'An LFI that holds salary as a bare figure must decide which currency to send with it.',
  'The identity object that holds Salary is also copied into the account-opening, FX and Ozone Connect payment specifications. Those copies keep number until they are aligned, so Salary differs between specifications for a time.',
]

// Before / after — rendered in the Recommendation section.
const payloadExample = `# GET /accounts/{AccountId}/transactions - V2.1
"TerminalId": null,                                  # "T0012345" at the LFI is not a number
"MerchantDetails": { "MerchantId": 450012345678, ... },   # "000450012345678" at the LFI
"BillDetails": { "BillerId": 15, ... },              # "015" at the LFI arrives as 15
"CurrencyExchange": { "ExchangeRate": 0.27229407760381213, ... }   # no limit on decimal places

# Proposed
"TerminalId": "T0012345",
"MerchantDetails": { "MerchantId": "000450012345678", ... },
"BillDetails": { "BillerId": "015", ... },
"CurrencyExchange": { "ExchangeRate": "0.2722940776", ... }

# GET /parties - V2.1
"Salary": 25000                                      # which currency? per month or per year?

# Proposed
"Salary": { "Amount": "25000.00", "Currency": "AED", "Frequency": "Monthly" }`

// The proposed definitions — rendered in the Technical changes section.
const schemaExample = `# Standards - uae-account-information-openapi.yaml
TerminalId:
  type: string
  pattern: ^[A-Za-z0-9]{1,16}$
AEMerchantDetails1:
  MerchantId:
    type: string
    pattern: ^[A-Za-z0-9]{1,15}$
BillDetails:
  BillerId:
    type: string
    pattern: ^[A-Za-z0-9]{1,35}$
AECurrencyExchange:
  ExchangeRate:
    type: string
    pattern: ^\\d{1,11}(\\.\\d{1,10})?$
Claims:
  Salary:
    type: object
    required: [ Amount, Currency ]          # Frequency is optional
    properties:
      Amount:    $ref AEActiveCurrencyAndAmount_SimpleType   # ^\\d{1,13}$|^\\d{1,13}\\.\\d{1,5}$
      Currency:  $ref ActiveOrHistoricCurrencyCode_1         # ISO 4217
      Frequency: { type: string, enum: [ Weekly, Fortnightly, Monthly, Annual ] }

# Ozone Connect - uae-ozone-connect-bank-data-sharing-openapi.yaml
# The same formats on terminalId, merchantId, BillerID, exchangeRate,
# and salary { amount, currency, optional frequency }.`

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

// Optional companion partials, authored per proposal and co-located with this
// page (ofp-021.outcome.vue / ofp-021.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-021.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-021.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Correct formats for five Data Sharing fields',
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

// Format an ISO date ('2026-11-02') as the strip's display form ('2 Nov 2026').
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

        <h1 class="ofp__title">Correct formats for five Data Sharing fields</h1>
        <p class="ofp__summary">
          Ozone Connect Bank Data Sharing v2.2.6 aligned five fields to the types in the Standards Account
          Information API. Those types are wrong for the data: identifiers that lose their leading zeros and
          cannot hold letters, an exchange rate with no precision limit, and a salary with no currency or
          period. This proposal sets <strong>one correct format for each field</strong>, in both
          specifications, for <strong>V2.2</strong>.
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
            set out in section 04 below. The first asks LFIs whether their identifiers fit the proposed
            formats; the second asks LFIs whether the Frequency values let them populate Salary
            Frequency.
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
          <h2 class="ofp-band__title">Aligned, but to the wrong types</h2>
        </div>
        <div class="ofp-prose">
          <p>
            In V2.1, Ozone Connect carries all five fields as strings, while the Standards Account Information
            API defines them as numbers. The API Hub converts each value to a number when it maps the Ozone
            Connect response to the Standards response. <strong>A value that is not a number is not mapped,
            and the TPP receives <code>null</code>.</strong>
          </p>

          <div class="ofp-table-wrap">
            <table class="ofp-table">
              <thead>
                <tr><th>Field</th><th>Standards V2.1</th><th>Ozone Connect V2.1</th><th>Problem</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>MerchantId</th>
                  <td><code>integer</code>, <code>minLength 8</code>, <code>maxLength 20</code></td>
                  <td><code>string</code></td>
                  <td>A merchant identifier containing a letter reaches the TPP as <code>null</code>, and a numeric one loses its leading zeros. The length limits have no effect on an integer.</td>
                </tr>
                <tr>
                  <th>TerminalId</th>
                  <td><code>integer</code>, <code>minLength 8</code>, <code>maxLength 20</code></td>
                  <td><code>string</code>, 8&ndash;20</td>
                  <td>As for MerchantId.</td>
                </tr>
                <tr>
                  <th>BillerId</th>
                  <td><code>number</code></td>
                  <td><code>BillerID</code>: <code>string</code></td>
                  <td>A biller code containing a letter reaches the TPP as <code>null</code>, and <code>015</code> becomes <code>15</code>. Both descriptions refer to SADAD, Saudi Arabia&rsquo;s bill-payment system.</td>
                </tr>
                <tr>
                  <th>ExchangeRate</th>
                  <td><code>number</code></td>
                  <td><code>string</code></td>
                  <td>A rate that is not a number reaches the TPP as <code>null</code>. The Standards set no limit on decimal places, and many systems parse a JSON number as a binary floating-point value, which rounds and can be written in exponent form.</td>
                </tr>
                <tr>
                  <th>Salary</th>
                  <td><code>number</code></td>
                  <td><code>string</code></td>
                  <td>A salary written with a currency or separators, such as <code>AED 25,000</code>, reaches the TPP as <code>null</code>. A numeric salary has no currency and no period, so a TPP cannot tell what the figure means.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            In V2.2-rc2, Ozone Connect Bank Data Sharing v2.2.6 narrows the Ozone Connect side to match the
            Standards
            (<RouterLink to="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-16">v2.1 &rarr; v2.2 changelog, &sect;16, item 4</RouterLink>):
            <code>salary</code> and <code>exchangeRate</code> become numbers, and <code>BillerID</code>,
            <code>merchantId</code> and <code>TerminalId</code> become strings of digits only. That stops the
            <code>null</code>s by rejecting non-numeric values at the LFI, but it keeps the Standards types.
            Leading zeros are still lost in the Standards response, an identifier containing a letter cannot be
            sent at all, and ExchangeRate and Salary are unchanged.
          </p>

          <p>
            The four transaction fields are returned by
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/data-sharing/open-api/accounts-AccountId-transactions"><code>GET /accounts/{AccountId}/transactions</code></RouterLink>.
            Salary is part of the party identity returned by
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/data-sharing/open-api/parties"><code>GET /parties</code></RouterLink>
            and
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/data-sharing/open-api/accounts-AccountId-parties"><code>GET /accounts/{AccountId}/parties</code></RouterLink>.
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
          <h2 class="ofp-band__title">One format per field, in both specifications</h2>
          <p class="ofp-band__lede">
            Identifiers become strings of letters and digits, ExchangeRate becomes a decimal string, and
            Salary becomes an amount with a currency and an optional frequency.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-table-wrap">
            <table class="ofp-table">
              <thead>
                <tr><th>Field</th><th>Proposed format</th><th>Basis</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>MerchantId</th>
                  <td><code>string</code>, <code>^[A-Za-z0-9]{1,15}$</code></td>
                  <td>ISO 8583 field 42, the card acceptor identification code: 15 characters, letters allowed.</td>
                </tr>
                <tr>
                  <th>TerminalId</th>
                  <td><code>string</code>, <code>^[A-Za-z0-9]{1,16}$</code></td>
                  <td>ISO 8583 field 41, the card acceptor terminal identification: 8 characters, letters allowed. The limit of 16 leaves room for longer acquirer identifiers.</td>
                </tr>
                <tr>
                  <th>BillerId</th>
                  <td><code>string</code>, <code>^[A-Za-z0-9]{1,35}$</code></td>
                  <td>The 35-character identifier length used throughout ISO 20022.</td>
                </tr>
                <tr>
                  <th>ExchangeRate</th>
                  <td><code>string</code>, <code>^\d{1,11}(\.\d{1,10})?$</code></td>
                  <td>The ISO 20022 exchange-rate type (<code>BaseOneRate</code>) allows at most 10 decimal places. A string carries the value exactly, as amounts already are.</td>
                </tr>
                <tr>
                  <th>Salary</th>
                  <td>Object: <code>Amount</code>, <code>Currency</code>, optional <code>Frequency</code></td>
                  <td>The amount and currency formats already used for transaction amounts. Frequency values are taken from the existing direct debit frequency list.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>MerchantId, TerminalId and BillerId are strings of letters and digits.</strong> The LFI
                MUST send each identifier as it holds it, including leading zeros, and MUST NOT pad it with
                spaces.
              </li>
              <li>
                <strong>BillerId is described for the UAE.</strong> The SADAD wording is removed. BillerId is the
                identifier of the biller as assigned by the LFI or by the bill-payment service it uses.
              </li>
              <li>
                <strong>ExchangeRate is a decimal string with at most 10 decimal places.</strong> Its meaning is
                unchanged: the rate between <code>UnitCurrency</code> and the quoted currency.
              </li>
              <li>
                <strong>Salary is an object of <code>Amount</code>, <code>Currency</code> and an optional
                <code>Frequency</code>.</strong> When Salary is present, <code>Amount</code> and
                <code>Currency</code> MUST be present. <code>Frequency</code> is not required; where the LFI
                holds the period, it SHOULD send it as one of <code>Weekly</code>, <code>Fortnightly</code>,
                <code>Monthly</code> or <code>Annual</code>. Salary itself stays optional.
              </li>
              <li>
                <strong>Both specifications use the same formats.</strong> Each Ozone Connect field has the same
                type and pattern as its Standards counterpart, so the API Hub maps it across unchanged.
              </li>
            </ul>
          </div>

          <div class="ofp-code">
            <div class="ofp-code__label">Before and after &mdash; Standards responses</div>
            <pre class="ofp-code__pre">{{ payloadExample }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Technical changes</div>
          <h2 class="ofp-band__title">What changes</h2>
          <p class="ofp-band__lede">
            Five property definitions in each of two specifications. No endpoint is added or removed.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards specification &mdash; <code>uae-account-information-openapi.yaml</code></div>
            <p>
              Change <code>TerminalId</code>, <code>AEMerchantDetails1.MerchantId</code>,
              <code>BillDetails.BillerId</code> and <code>AECurrencyExchange.ExchangeRate</code> on
              <code>AETransaction</code>, and <code>Claims.Salary</code> on the party identity, to the formats
              above. Rewrite the <code>BillerId</code> description without SADAD. Targets <strong>V2.2</strong>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; Ozone Connect &mdash; <code>uae-ozone-connect-bank-data-sharing-openapi.yaml</code></div>
            <p>
              Apply the same formats to <code>TerminalId</code>, <code>MerchantDetails.merchantId</code>,
              <code>BillDetails.BillerID</code> and <code>CurrencyExchange.exchangeRate</code>, which the LFI
              returns from its Ozone Connect
              <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/data-sharing/open-api/accounts-AccountId-transactions"><code>GET /accounts/{accountId}/transactions</code></RouterLink>
              endpoint, and to <code>CustomerPersonClaims.salary</code>, which it returns from
              <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/data-sharing/open-api/customer"><code>GET /customer</code></RouterLink>
              and
              <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/data-sharing/open-api/accounts-AccountId-customer"><code>GET /accounts/{accountId}/customer</code></RouterLink>.
              This replaces the digits-only patterns and the <code>number</code> types introduced in v2.2.6.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; API Hub</div>
            <p>
              Validate each field against its new format and map it from Ozone Connect to the Standards
              response. With both sides using the same format, no type conversion is needed.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; Documentation and scope</div>
            <p>
              Update item 4 of the
              <RouterLink to="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-16">V2.2 changelog entry</RouterLink>
              to describe the new formats. The copies of the identity object in the account-opening, FX and
              Ozone Connect payment specifications are outside this proposal and keep <code>Salary</code> as a
              <code>number</code> until they are aligned separately.
            </p>
          </div>
        </div>

        <div class="ofp-code">
          <div class="ofp-code__label">Proposed definitions</div>
          <pre class="ofp-code__pre">{{ schemaExample }}</pre>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · QUESTIONS ATTACHED TO THIS VOTE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 &middot; Questions</div>
          <h2 class="ofp-band__title">Two questions, asked with the vote</h2>
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
         05 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; Pros</div>
          <h2 class="ofp-band__title">What the correct formats buy</h2>
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
         06 · CONS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; Cons</div>
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

/* ─── Tables (current and proposed formats) ─────────────────────────────── */
.ofp-table-wrap {
  overflow-x: auto;
  margin: 0 0 24px;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ofp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--at-navy);
}

.ofp-table th,
.ofp-table td {
  text-align: left;
  vertical-align: top;
  padding: 10px 14px;
  border-bottom: 1px solid var(--at-grid-line);
}

.ofp-table thead th {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  background: var(--at-bg-cream);
}

.ofp-table tbody th { font-weight: 600; color: var(--at-navy-deep); white-space: nowrap; }
.ofp-table tbody tr:last-child th,
.ofp-table tbody tr:last-child td { border-bottom: none; }

.ofp-table code { white-space: nowrap; }

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

