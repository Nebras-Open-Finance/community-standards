<route lang="yaml">
meta:
  title: 'OFP-003 · Define an allowed character set for Debtor and Creditor References'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-003. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Technical changes, Pros, Cons, and the specific
// asks of the ecosystem. Styling follows the site's editorial system
// (cream/white bands, Fraunces/Poppins/IBM Plex Mono, sharp corners) and mirrors
// OFP-001.
import { ref, computed, onMounted, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'

useHead({ title: 'OFP-003 · Define an allowed character set for Debtor and Creditor References' })

const meta = {
  id: 'OFP-003',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '16 Jun 2026',
  closes: '23 Jun 2026',
  priority: 'medium' as Priority,
  version: 'V2.1-errata',
}

const pros = [
  'Every LFI knows exactly which characters it must accept and store — no per-institution guesswork about an unbounded UTF-8 string.',
  'One uniform rule across PAR, Bank Service Initiation, Consent Manager, Consent Events, and Ozone Connect — a reference that validates at the API Hub will not be rejected downstream by an LFI.',
  'Still free text: the customer’s reference comes first and is not squeezed behind a machine prefix, so the v1.2/v2.0 truncation problem does not return.',
  'Supports Arabic as well as Latin, so a customer can use a reference in their own script rather than a transliteration.',
  'A known character set removes a class of encoding, storage, and injection edge cases that an unrestricted string invites.',
  'Validation is enforced centrally at the API Hub, so a malformed reference is rejected before it ever reaches an LFI.',
]

const cons = [
  'TPPs must sanitise or transliterate customer input to the agreed set before submitting.',
  'Arabic characters are two bytes each in UTF-8, so an all-Arabic 35-character reference is roughly 70 bytes — LFI cores that size this field in bytes rather than characters must allow for it.',
  'Reintroducing a pattern is a validation change every implementer must adopt, even though the field’s shape and length are unchanged.',
]

const exampleToday = `# v2.1 today — free text, no character validation
AECreditorReference:
  type: string
  minLength: 1
  maxLength: 35
  # any UTF-8 character is accepted; each LFI is left to guess
  # what its own systems can store and reconcile`

const exampleProposed = `# Proposed — free text, one agreed character set (Latin + Arabic)
AECreditorReference:
  type: string
  minLength: 1
  maxLength: 35                                      # counted in Unicode characters
  pattern: "^[A-Za-z0-9 /?:().,'+\\u0600-\\u06FF-]+$"   # SWIFT "x" set + Arabic block
  description: >-
    A Creditor Reference is a note for a given Creditor or Creditor LFI
    that supports reconciliation of a payment instruction. Characters are
    limited to the Open Finance reference set — the Latin "x" set plus the
    Arabic block (U+0600–U+06FF) — so every LFI can accept and store it.`

// Worked examples of the proposed pattern — rendered as a valid/invalid grid
// in the Technical changes section.
const validRefs = [
  { ref: 'Invoice 12345', note: 'plain Latin free text' },
  { ref: 'Rent-Jun/2026', note: 'dash and slash' },
  { ref: 'Salary (June)', note: 'parentheses and space' },
  { ref: 'Ref: 9981, paid', note: 'colon and comma' },
  { ref: 'Ahmed-ENBD-Lean', note: 'structured: text – bank – TPP' },
  { ref: 'فاتورة ٢٠٢٦', note: 'Arabic letters with Arabic-Indic digits' },
  { ref: 'دفعة Lean', note: 'mixed Arabic and Latin' },
]
const invalidRefs = [
  { ref: 'Pay @ Ahmed', note: '“@” is outside the set' },
  { ref: 'Order #4471', note: '“#” is outside the set' },
  { ref: '100% deposit', note: '“%” is outside the set' },
  { ref: 'A/C <12345>', note: '“<” and “>” are outside the set' },
  { ref: 'Note; DROP', note: '“;” is outside the set' },
  { ref: 'Café Milano', note: 'accented “é” is not in the Latin set' },
  { ref: 'Заказ 12', note: 'Cyrillic script is not included' },
  { ref: 'Tip 😀', note: 'emoji are not included' },
]

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
const versionDisplay = ref(meta.version)

const priorityLabel = computed(() => PRIORITY[priority.value]?.label ?? PRIORITY.medium.label)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Define an allowed character set for Debtor and Creditor References',
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

        <h1 class="ofp__title">Define an allowed character set for Debtor and Creditor References</h1>
        <p class="ofp__summary">
          Keep the payment references free-text, but constrain them to a single agreed character set —
          uniform across the ecosystem — so every LFI knows exactly which characters it must accept and
          store.
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
          <h2 class="ofp-band__title">The references that didn’t fit</h2>
        </div>
        <div class="ofp-prose">
          <p>
            Every payment instruction carries two free-form notes — a <strong>Debtor Reference</strong> and
            a <strong>Creditor Reference</strong> — that travel with the payment to support reconciliation
            and to give the customer something recognisable against the transaction. In v1.2 and v2.0 these
            were not free text at all: they were defined by a tightly prescribed regular expression
            (<code>AEStructuredDebtorReference</code> / <code>AEStructuredCreditorReference</code>) that
            required a fixed machine prefix — the TPP’s Trust Framework ID, the account BIC, and, for
            merchant payments, a merchant identifier — with the human-readable text appended
            <strong>at the end</strong>, up to a combined 120 characters.
          </p>
          <p>
            That shape did not meet the needs of TPPs. The part a customer actually reads — the free-text
            reference — sat behind roughly 50–60 characters of identifiers. LFI core banking systems carry a
            narrower reference field than 120 characters and truncate from the right, so the machine prefix
            survived intact while the meaningful free text was clipped or lost entirely. The rigid pattern
            also rejected legitimate references outright, leaving TPPs no room to pass the information their
            use case required.
          </p>
          <p>
            In <strong>version 2.1 we relaxed the schema</strong>: the Debtor and Creditor References became
            a plain free-text string (<code>minLength 1</code>, <code>maxLength 35</code>, no enforced
            pattern), so the text the customer relies on comes first and is no longer squeezed behind a
            fixed prefix. Alongside that, we moved the structuring guidance out of the schema and into a
            business rule — <strong>CRG-5.3</strong> — that TPPs SHOULD follow where a payments use case does
            not dictate otherwise, putting the free-text reference first and the bank / merchant / TPP names
            after it, within the 35-character budget. Structure became a recommended convention, not a
            validation gate.
          </p>
          <p>
            Since that change, LFIs have asked that the references not be left <strong>completely open to
            any character</strong>. Relaxing the structural pattern was right — but with no validation at
            all, an LFI cannot know in advance which characters it will be handed, and each institution is
            left to guess what its own systems can accept and store. The ask is for a defined set of
            permitted characters: not as prescriptive as the old structured pattern, but a single,
            <strong>uniform character-set validation</strong> applied consistently across the entire Open
            Finance ecosystem, so that every LFI knows exactly what it must accept and every TPP knows
            exactly what it may send.
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
          <h2 class="ofp-band__title">Constrain the characters, not the structure</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Keep the references free-text and 35 characters long, but reintroduce a single pattern
            that validates the <em>characters</em>, not the <em>structure</em>.</strong> The pattern defines
            an allowed character set — nothing about where the bank name or TPP name must sit. That ordering
            stays a recommendation in the TPP standards (linked below), not a validation rule.
          </p>
          <p>
            We propose a set in <strong>two groups</strong>: a conservative <strong>Latin baseline</strong> —
            the ISO 20022 / SWIFT “x” set (Latin letters, digits, space, and
            <code>/ - ? : ( ) . , ’ +</code>) that LFI cores, the SWIFT-heritage UAEFTS rail, and ISO 20022
            AANI all store reliably — plus the <strong>Arabic block</strong> (<code>U+0600–U+06FF</code>), so a
            customer can write a genuinely Arabic reference, names included. As one regular expression, with
            length still capped at 35:
          </p>
          <p class="ofp-regex"><code>^[A-Za-z0-9 /?:().,'+\\u0600-\\u06FF-]+$</code></p>
          <p>
            The Arabic block covers Arabic letters, Arabic-Indic digits (٠–٩) and Arabic punctuation, but the
            set deliberately stops there — no presentation-form ligatures, rare extended letters, or
            bidirectional control characters, which add only ambiguity and spoofing risk. This is
            <strong>not</strong> framed as “the AANI set”: AANI imposes no character class of its own (it
            length-checks the field and passes the value through), so the constraint exists to give LFI core
            systems one predictable set. The same pattern applies wherever the current v2.1 free-text
            reference is defined, so validation is identical across PAR, Bank Service Initiation, Consent
            Manager, Consent Events, and Ozone Connect. The 35-character limit is counted in Unicode
            characters, and the API Hub normalises to Unicode NFC before validating.
          </p>

          <p>
            The structuring convention is defined in the TPP standards as a requirement — it is not
            restated here. See the <strong>Structured Reference</strong> requirement under
            <RouterLink to="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements#consent-creation">Single
            Instant Payment → Consent Creation</RouterLink> (the same requirement applies to each
            multi-payment type). In short: where a use case does not dictate the reference, the TPP puts the
            User’s free-text reference first (to a maximum of 22 characters), then the Creditor LFI bank
            name, an optional Merchant name, and the TPP name — to a maximum of 35 characters in total.
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
            A single, additive change — a character-set pattern on the current reference definition —
            applied identically everywhere the references appear.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Reference schemas (current v2.1 definition)</div>
            <p>
              Add a <code>pattern</code> that defines the allowed character set to the plain-string
              Debtor and Creditor reference schemas —
              <code>AEBankServiceInitiation.AEDebtorReference</code> /
              <code>AECreditorReference</code> in the standards, and the current-version branch of
              <code>AEServiceInitiationDebtorReference</code> /
              <code>AEServiceInitiationCreditorReference</code> on the LFI side.
              <code>minLength 1</code>, <code>maxLength 35</code>, and free-text-first all stay. The
              deprecated structured variants retained for older versions are not touched.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · Structured Reference requirement</div>
            <p>
              Unchanged. The Structured Reference requirement in the TPP standards remains the convention
              for <em>structuring</em> the reference — free text first, then bank / merchant / TPP names.
              This proposal adds the character-set validation underneath it; it does not reinstate a
              structural pattern.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · Validation &amp; error handling</div>
            <p>
              A reference containing a character outside the agreed set fails schema validation at the
              <strong>API Hub</strong> and is rejected before the request reaches the LFI — returned as a
              standard request-validation error, not silently sanitised on the TPP’s behalf.
            </p>
          </div>
        </div>

        <div class="ofp-code">
          <div class="ofp-code__label">Today — free text, no character validation</div>
          <pre class="ofp-code__pre">{{ exampleToday }}</pre>
        </div>

        <div class="ofp-code">
          <div class="ofp-code__label">Proposed — free text, one agreed character set</div>
          <pre class="ofp-code__pre">{{ exampleProposed }}</pre>
        </div>

        <div class="ofp-ex">
          <div class="ofp-ex__col ofp-ex__col--ok">
            <div class="ofp-ex__head">
              <span class="ofp-ex__glyph ofp-ex__glyph--ok">&check;</span> Valid
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
              <span class="ofp-ex__glyph ofp-ex__glyph--no">&times;</span> Invalid
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
          Length is enforced separately — a reference over 35 characters fails on <code>maxLength</code>,
          not on the pattern.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · Pros</div>
          <h2 class="ofp-band__title">What a uniform character set buys</h2>
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

/* ─── Specification gaps (bullets in Background / Recommendation) ─────────── */
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
  .ofp-ex { grid-template-columns: 1fr; }
}
</style>
