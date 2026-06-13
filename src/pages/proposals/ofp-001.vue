<route lang="yaml">
meta:
  title: 'OFP-001 · Replace file-based Bulk/Batch Payments with a JSON array'
</route>

<script setup lang="ts">
// Bespoke detail page for the first real proposal, OFP-001. Hand-authored
// (not rendered from the proposals data array) so the content can be laid out
// in named sections — Background, Recommendation, Examples, Pros, Cons, and the
// specific asks of the ecosystem. Styling follows the site's editorial system
// (cream/white bands, Fraunces/Poppins/IBM Plex Mono, sharp corners).
import { ref, computed, onMounted, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'

useHead({ title: 'OFP-001 · Replace file-based Bulk/Batch Payments with a JSON array' })

const meta = {
  id: 'OFP-001',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '12 Jun 2026',
  closes: '24 Jul 2026',
  priority: 'high' as Priority,
}

const pros = [
  'No CSV parsing, character-encoding, or line-ending handling.',
  'No partial or corrupted uploads — and no single malformed record that fails an entire file.',
  'No malware scanning of uploaded bytes.',
  'No additional encryption layer to protect the PII held at rest in a file.',
  'No "wrong file format" error class to specify, return, and handle.',
  'No ecosystem-wide negotiation of which file formats each LFI accepts.',
  'The API Hub can validate the array’s count and total against NumberOfTransactions and ControlSum centrally — each LFI no longer has to build that check itself.',
  'Reuses the established single-payment shape — nothing new for implementers to learn.',
  'Adjacent areas (error-code mapping, the risk block) change incrementally, not structurally.',
]

const cons = [
  'Existing back-office files (ISO 20022 pain.001, CSV) the file model accepted as-is must now be mapped to JSON at the TPP boundary.',
  'A file upload can stream; a single JSON request is held in memory and bounded by request-size limits.',
]

const asks = [
  'Vote to deprecate the file-upload model in favour of carrying the payments as a JSON array in the signed create request.',
  'Decide whether to keep the existing file-payments naming or rename it (e.g. to bulk-payments) now that there is no file element. This touches the PAR consent object (the File Payment control parameters) and the endpoints POST /file-payments, GET /file-payments, GET /file-payments/{PaymentId}, and GET /file-payments/{PaymentId}/report, along with their request and response schemas.',
  'Confirm whether this holds true: existing back-office files (ISO 20022 pain.001, CSV) that the file model accepted as-is would now need to be mapped to JSON at the TPP boundary — and whether that is acceptable.',
  'Agree a maximum number of instructions per bulk request (a published cap), above which a run must be split.',
]

const exampleToday = `# 1 - Upload the payment file: any format the LFI happens to accept
POST /payment-consents/{ConsentId}/file
Content-Type: */*               # CSV, ISO 20022 XML, fixed-width...

# 2 - Reference the file by hash on the consent instruction
"Instruction": {
  "FileType": "UK.OBIE.pain.001.001.08",
  "FileHash": "OErCwePj...",     # base64 SHA-256 of the bytes above
  "FileReference": "payroll-2026-06",
  "NumberOfTransactions": 250,
  "ControlSum": "125000.00"
}`

const exampleProposed = `POST /file-payments
Content-Type: application/jwt          # signed JWS, exactly like POST /payments

{
  "Data": {
    "ConsentId": "pcon_8821",
    "PaymentPurposeCode": "SALA",
    "OpenFinanceBilling": { ... },      # unchanged from POST /payments
    "Instructions": [
      {
        "Amount": { "Amount": "1000.00", "Currency": "AED" },
        "PersonalIdentifiableInformation": "eyJhbGciOiJSU0Et...",   # JWE: creditor account + PII
        "DebtorReference": "payroll-jun26",
        "CreditorReference": "emp-001"
      },
      {
        "Amount": { "Amount": "750.00", "Currency": "AED" },
        "PersonalIdentifiableInformation": "eyJhbGciOiJSU0Et...",
        "DebtorReference": "payroll-jun26",
        "CreditorReference": "emp-002"
      }
    ]
  }
}
# API Hub validates the array against the consent:
#   Instructions.length  ==  NumberOfTransactions
#   sum(Amount)          ==  ControlSum`

// ─── Voting ─────────────────────────────────────────────────────────────────
// Live tally + vote submission are backed by the proposals API (D1) via
// useProposals. PvVotePanel takes a Proposal-shaped object; only id/status/
// quorum/closes are read by the panel, the rest come from `meta` above.
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

const priorityLabel = computed(() => PRIORITY[priority.value]?.label ?? PRIORITY.high.label)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Replace file-based Bulk/Batch Payments with a JSON array',
  summary: '',
  category: '',
  priority: priority.value,
  status: status.value,
  author: { org: meta.proposedBy, person: meta.author },
  opened: openedDisplay.value,
  closes: closesDisplay.value,
  closesIn: closesIn.value,
  quorum: 16,
  body: [],
}))

const myVote = computed(() => myVotes.value[meta.id])
const submitError = ref('')

function onVote(stance: Stance | null): void {
  submitError.value = ''
  setVote(meta.id, stance)
}

async function onSubmit(detail: { comment: string }): Promise<void> {
  if (!myVote.value) return
  submitError.value = ''
  const result = await submitVote(meta.id, { stance: myVote.value.stance, comment: detail.comment })
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

// Format an ISO date ('2026-06-12') as the strip's display form ('12 Jun 2026').
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

        <h1 class="ofp__title">Replace file-based Bulk/Batch Payments with a JSON array</h1>
        <p class="ofp__summary">
          Deprecate the unused file-upload model for Bulk/Batch Payments and carry the individual
          payments as a JSON array in a single signed request.
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
         CAST YOUR VOTE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white ofp-vote-wrap">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> Decision</div>
          <h2 class="ofp-band__title">Cast your vote</h2>
          <p class="ofp-band__lede">
            Sign in with the Trust Framework to vote &mdash; For, Against, or Abstain &mdash; recorded in
            the open with your reasoning. Your organisation and name come from your directory profile, and
            each person may vote once.
          </p>
        </div>
        <PvVotePanel :proposal="proposal" :my-vote="myVote" @vote="onVote" @submit="onSubmit" />
        <p v-if="submitError && status === 'open'" class="ofp-vote-error" role="alert">{{ submitError }}</p>
      </div>

      <!-- When voting is not open, frost over the whole white block. -->
      <div v-if="status !== 'open'" class="ofp-vote-cover" aria-hidden="false">
        <div class="ofp-vote-cover__card">
          <div class="ofp-vote-cover__label">
            {{ status === 'draft' ? 'Voting not yet open' : 'Voting closed' }}
          </div>
          <div class="ofp-vote-cover__msg">
            {{ status === 'draft'
              ? `Voting opens ${openedDisplay}`
              : 'Voting is now closed' }}
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         THE PROPOSAL (starts here) · BACKGROUND
         "The proposal" rides the colour-change seam at the top of this band.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream ofp-band--seam">
      <span class="ofp-seam-label">The proposal</span>
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 · Background</div>
          <h2 class="ofp-band__title">A file model nobody has built</h2>
        </div>
        <div class="ofp-prose">
          <p>
            File-based Bulk/Batch Payments — referred to in the standard as <strong>File Payments</strong> —
            have been part of the specification since v1.2. They are defined as a file
            <strong>upload</strong> model: a TPP uploads a payment file in an LFI-specific format to
            <code>POST /payment-consents/{ConsentId}/file</code>, declares its <code>FileType</code>,
            <code>FileHash</code>, <code>NumberOfTransactions</code> and <code>ControlSum</code> on the
            consent, then creates the batch with <code>POST /file-payments</code>. The execution report
            is returned as a file as well.
          </p>
          <p>
            In practice, <strong>no LFI in the ecosystem has implemented these endpoints.</strong> There
            is not a single live File Payment integration — which means there is nothing to migrate, and
            the model can be revised at effectively zero cost <em>before</em> banks begin building
            file-parsing and malware-scanning pipelines to support it.
          </p>
          <p>
            Beyond being unbuilt, the file model is under-specified: an LFI could not implement it
            today without a round of clarifications. A few examples — not an exhaustive list — are below:
          </p>
          <ul class="ofp-gaps">
            <li>
              The file holds PII, but the specification defines no encryption element to protect it.
            </li>
            <li>
              The specification does not cover how uploaded files are scanned.
            </li>
            <li>
              It does not define the required file structures, which file types must be supported, or
              how a TPP discovers which file types each LFI accepts.
            </li>
          </ul>
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
          <h2 class="ofp-band__title">Carry the payments as a JSON array</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Deprecate the file-upload mechanism and carry the payments inline instead.</strong>
            The Bulk/Batch create request — <code>POST /file-payments</code> today — would carry the
            individual payments as a <strong>JSON array in a single signed request</strong>, one array
            element per transaction, in place of a reference to an uploaded file. (Whether the endpoint
            and schemas keep the <code>file-payments</code> name is an open question for the ecosystem —
            see the asks below.)
          </p>
          <p>
            Each element of <code>Instructions[]</code> is assembled from the
            <strong>single-payment fields the standard already defines</strong> (amount, creditor account,
            references). The request is signed end-to-end exactly like <code>POST /payments</code>, so the
            same validation, signing, and idempotency rules apply to a batch as to a single payment. The
            <code>NumberOfTransactions</code> and <code>ControlSum</code> integrity checks are retained —
            now computed over the array rather than a file.
          </p>
          <p>
            A TPP can still collect a file from the customer — for example, an Excel sheet of ten
            payments. The difference is where it is converted: the <strong>TPP</strong> maps that file
            into the JSON array per its own specification and passes the result to the LFI, who processes
            the payments from the array. There is little customer impact — the same file is still the
            customer’s starting point. What moves is the conversion: the TPP turns the file into
            JSON-format payments rather than the LFI parsing the file itself.
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
            Three concrete changes — to the consent, the authorization experience, and the
            payment-creation request.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Consent (PAR) — File Payment object</div>
            <p>
              Remove <code>FileType</code>, <code>FileHash</code>, and <code>FileReference</code> — there
              is no file to type, hash, or reference. Add <code>Description</code>: the reason the LFI
              shows the customer at authorization (for example, <em>“Payroll June 2026”</em>).
              <code>NumberOfTransactions</code>, <code>ControlSum</code>, and
              <code>RequestedExecutionDate</code> stay — the LFI validates the JSON array’s count and
              total against <code>NumberOfTransactions</code> and <code>ControlSum</code>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · Authorization page</div>
            <p>
              The authorization page no longer renders an uploaded file. It shows the standard
              confirm-payment details, with <code>Description</code> as the stated reason. The change for
              the customer is minimal — the consent confirmation looks like any other payment.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · <code>POST /file-payments</code> body</div>
            <p>
              The create request carries everything <code>POST /payments</code> carries, with two
              structural changes: the payments become an <code>Instructions[]</code> array — one element
              per transaction — and <code>PersonalIdentifiableInformation</code>,
              <code>DebtorReference</code>, and <code>CreditorReference</code> move <strong>inside each
              element</strong>, so every instruction is self-contained. <code>CurrencyRequest</code> is
              dropped to remove complexity. <code>ConsentId</code>, <code>PaymentPurposeCode</code>, and
              <code>OpenFinanceBilling</code> stay at the batch level. The request is a signed JWS
              end-to-end, exactly like <code>POST /payments</code>.
            </p>
          </div>
        </div>

        <div class="ofp-code">
          <div class="ofp-code__label">Today — file upload + reference (2 steps)</div>
          <pre class="ofp-code__pre">{{ exampleToday }}</pre>
        </div>

        <div class="ofp-code">
          <div class="ofp-code__label">Proposed — JSON array in one signed request</div>
          <pre class="ofp-code__pre">{{ exampleProposed }}</pre>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · Pros</div>
          <h2 class="ofp-band__title">What moving to JSON removes</h2>
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
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 · Cons</div>
          <h2 class="ofp-band__title">What moving to JSON costs</h2>
        </div>
        <ul class="ofp-cons">
          <li v-for="(c, i) in cons" :key="i" class="ofp-cons__item">
            <span class="ofp-cons__glyph">&times;</span>
            <span>{{ c }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         SPECIFIC ASKS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 · Specific asks</div>
          <h2 class="ofp-band__title">What we are asking the ecosystem</h2>
        </div>
        <ol class="ofp-asks">
          <li v-for="(a, i) in asks" :key="i" class="ofp-ask">
            <span class="ofp-ask__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="ofp-ask__text">{{ a }}</span>
          </li>
        </ol>

        <div class="ofp-ref">
          <span class="ofp-ref__label">Relates to</span>
          <RouterLink to="/tech/tpp-standards/v2.1/banking/service-initiation/" class="ofp-ref__chip">
            <span class="ofp-ref__square" />
            Bank Service Initiation · POST /file-payments (TPP)
          </RouterLink>
          <RouterLink to="/tech/tpp-standards/v2.1/consent/open-api/par" class="ofp-ref__chip">
            <span class="ofp-ref__square" />
            Pushed Authorization Request · POST /par (TPP)
          </RouterLink>
          <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents" class="ofp-ref__chip">
            <span class="ofp-ref__square" />
            API Hub Consent Manager · Consents (LFI side)
          </RouterLink>
        </div>

        <div class="ofp-ref ofp-ref--ext">
          <span class="ofp-ref__label">Specs affected</span>
          <a
            href="https://github.com/Nebras-Open-Finance/api-specs/blob/main/dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml"
            target="_blank"
            rel="noopener"
            class="ofp-ref__chip ofp-ref__chip--ext"
          >
            uae-bank-initiation-openapi.yaml
            <span class="ofp-ref__ext-arrow" aria-hidden="true">&#8599;</span>
          </a>
          <a
            href="https://github.com/Nebras-Open-Finance/api-specs/blob/main/dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml"
            target="_blank"
            rel="noopener"
            class="ofp-ref__chip ofp-ref__chip--ext"
          >
            uae-authorization-endpoints-openapi.yaml
            <span class="ofp-ref__ext-arrow" aria-hidden="true">&#8599;</span>
          </a>
          <a
            href="https://github.com/Nebras-Open-Finance/api-specs/blob/main/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml"
            target="_blank"
            rel="noopener"
            class="ofp-ref__chip ofp-ref__chip--ext"
          >
            uae-api-hub-consent-manager-openapi.yaml
            <span class="ofp-ref__ext-arrow" aria-hidden="true">&#8599;</span>
          </a>
          <a
            href="https://github.com/Nebras-Open-Finance/api-specs/blob/main/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml"
            target="_blank"
            rel="noopener"
            class="ofp-ref__chip ofp-ref__chip--ext"
          >
            uae-ozone-connect-bank-service-initiation-openapi.yaml
            <span class="ofp-ref__ext-arrow" aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>
    </section>
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

.ofp-prose code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

/* ─── Callout ───────────────────────────────────────────────────────────── */
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

/* ─── Specification gaps (bullets in Background) ─────────────────────────── */
.ofp-gaps {
  margin: 4px 0 0;
  padding-left: 1.2rem;
  max-width: 52rem;
}

.ofp-gaps li {
  font-size: 16.5px;
  line-height: 1.72;
  color: var(--at-navy);
  margin-bottom: 8px;
}

.ofp-gaps li:last-child { margin-bottom: 0; }

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
