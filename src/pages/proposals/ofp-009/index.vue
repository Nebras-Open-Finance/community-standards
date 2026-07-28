<route lang="yaml">
meta:
  title: 'OFP-009 · Define validation patterns for the Leads API personal-data fields'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-009. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Technical changes, Pros, Cons, and the open
// questions put to the ecosystem. Styling follows the site's editorial system
// and mirrors OFP-003.
import { ref, computed, onMounted, watch, type Component } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'
import PvProposalTabs from '@/components/proposals/PvProposalTabs.vue'

const OG_TITLE = 'OFP-009 · Define validation patterns for the Leads API personal-data fields'
const OG_DESCRIPTION =
  'Constrain the free-text PII on POST /leads — names, Emirates ID, and address lines — to defined, ISO-grounded patterns, reusing the validation the ecosystem already applies elsewhere, so LFIs receive predictable, well-formed lead data.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-009',
  proposedBy: 'Nebras',
  author: 'Nowaier AlQahtani',
  // Fallbacks shown until the API responds (and during the static build).
  opened: '15 Aug 2026',
  closes: '29 Aug 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

const pros = [
  'LFIs receive predictable, well-formed lead PII — no guessing what characters or shape a name, Emirates ID, or address line might arrive in.',
  'Reuses a pattern the ecosystem already defines — the Emirates ID pattern from the insurance specs — so validation is consistent, not invented here.',
  'Emirates ID gains real validation where today it has none: a malformed ID is rejected at the API Hub before it ever reaches an LFI.',
  'Grounded in ISO where a standard exists — ISO 3166-1 for the 784 prefix and ISO 20022 PostalAddress27 for address text — matching how PhoneNumber (E.164) and Country (ISO 3166-1) are already validated in this very schema.',
  'A defined boundary rejects a class of junk, encoding, and injection edge cases at the API Hub rather than leaving each LFI core to cope.',
  'Field shapes and length limits are unchanged — this is additive validation only.',
]

const cons = [
  'TPPs must sanitise or transliterate customer input — strip disallowed punctuation, transliterate names — before submitting a lead.',
  'The Latin-only baseline rejects Arabic and accented-Latin names outright, so a customer named “José” or “فاطمة” cannot be submitted verbatim until the Arabic question below is settled.',
  'Reintroducing patterns is a validation change every TPP integration must adopt, even though field shapes and lengths do not move.',
  'A regex cannot verify the Emirates ID check digit, so a shape-valid but non-existent ID still passes schema validation.',
]

const exampleToday = `# POST /leads · LeadRequest.Data — today
Name:                       # AEUserName (oneOf)
  GivenName:    { type: string, minLength: 1, maxLength: 70 }    # no pattern
  LastName:     { type: string, minLength: 1, maxLength: 70 }    # no pattern
  FullName:     { type: string, minLength: 1, maxLength: 140 }   # no pattern
  BusinessName: { type: string, minLength: 1, maxLength: 140 }   # no pattern
EmiratesId:     { type: string }                                # no validation at all
ResidentialAddress:                                             # AEResidentialAddress
  AddressLine:  [ { type: string, minLength: 1, maxLength: 70 } ] # no pattern`

const exampleProposed = `# POST /leads · LeadRequest.Data — proposed (patterns added, lengths unchanged)
Name:
  GivenName:    { maxLength: 70,  pattern: "^[A-Za-z '.\\-]+$" }
  LastName:     { maxLength: 70,  pattern: "^[A-Za-z '.\\-]+$" }
  FullName:     { maxLength: 140, pattern: "^[A-Za-z '.\\-]+$" }
  BusinessName: { maxLength: 140, pattern: "^[A-Za-z0-9 &'.,\\-()/]+$" }
EmiratesId:
  pattern: "^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$"                 # 784 = ISO 3166-1 numeric (UAE)
ResidentialAddress:
  AddressLine:
    items: { maxLength: 70, pattern: "^[A-Za-z0-9 /?:().,'+\\-]+$" } # OFP-003 "x" set, minus Arabic`

// Worked examples — a valid/invalid grid spanning the fields.
const validRefs = [
  { ref: 'Ahmed', note: 'GivenName — letters only' },
  { ref: 'Al-Maktoum', note: 'LastName — hyphen allowed' },
  { ref: "O'Brien", note: 'LastName — apostrophe allowed' },
  { ref: 'Mohd.', note: 'GivenName — trailing period' },
  { ref: 'ACME Trading L.L.C.', note: 'BusinessName — periods and spaces' },
  { ref: 'Gulf & Co (Dubai)', note: 'BusinessName — “&” and parentheses' },
  { ref: 'Flat 5, Building 12', note: 'AddressLine — digits and comma' },
  { ref: '784-1990-1234567-8', note: 'EmiratesId — hyphenated 784 form' },
  { ref: '784199012345678', note: 'EmiratesId — 15 digits, no hyphens' },
]
const invalidRefs = [
  { ref: 'Ahmed 3rd', note: 'GivenName — digits are not allowed in person names' },
  { ref: 'فاطمة', note: 'GivenName — Arabic is excluded from the baseline (see open questions)' },
  { ref: 'José', note: 'GivenName — accented “é” is outside the Latin set' },
  { ref: 'Flat #5', note: 'AddressLine — “#” is outside the set' },
  { ref: '123-1990-1234567-8', note: 'EmiratesId — must begin with 784' },
  { ref: '784-90-1234567-8', note: 'EmiratesId — the year block must be 4 digits' },
]

// The open questions put to the ecosystem.
const asks = [
  {
    n: 'Q1',
    text: 'Arabic support — should any of these fields accept the Arabic block (U+0600–U+06FF)? OFP-003 rejected Arabic for payment references because they ride SWIFT/UAEFTS, which neither carry nor store it. Lead names and addresses are stored PII, not carried over the rails, so the trade-off genuinely differs. Do we add Arabic here — per field, or not at all?',
  },
  {
    n: 'Q2',
    text: 'Emirates ID harmonisation — this proposal patterns EmiratesId on POST /leads only. The same field is still an unvalidated string in Account Information, Account Opening, and FX Service Initiation, while the insurance specs already carry the 784 pattern. Should the pattern be applied uniformly wherever EmiratesId appears, in one place?',
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
  title: 'Define validation patterns for the Leads API personal-data fields',
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

        <h1 class="ofp__title">Define validation patterns for the Leads API personal-data fields</h1>
        <p class="ofp__summary">
          Constrain the free-text PII on <code>POST /leads</code> — names, Emirates ID, and address
          lines — to defined, ISO-grounded patterns, reusing the validation the ecosystem already applies
          elsewhere, so every LFI receives predictable, well-formed lead data.
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
              <h2 class="ofp-band__title">Lead data arrives unvalidated</h2>
            </div>
            <div class="ofp-prose">
              <p>
                <code>POST /leads</code> lets a TPP hand an LFI a prospective customer — a name, an
                Emirates ID, a residential address, and the product categories they are interested in. Unlike a
                payment, this data is <strong>written into the LFI</strong>: it is stored, matched against
                existing records, and used to make contact. What the LFI can do with it depends entirely on it
                arriving in a shape the LFI can store and reconcile.
              </p>
              <p>
                Today most of those fields carry no validation beyond a length limit. <code>GivenName</code>,
                <code>LastName</code>, <code>FullName</code>, <code>BusinessName</code> and each
                <code>AddressLine</code> are free-text strings with no pattern. And <code>EmiratesId</code> —
                the single most important identifier on the request — is a <strong>plain string with no pattern
                and no length at all</strong>: any value is accepted and passed straight through to the LFI.
              </p>
              <p>
                This sits oddly next to the two fields in the <em>same</em> schema that are already validated to
                a standard: <code>PhoneNumber</code> is constrained to E.164
                (<code>^\+[1-9]\d{1,14}$</code>) and <code>Country</code> to the ISO 3166-1 alpha-2 code
                (<code>^[A-Z]{2}$</code>). The discipline is already here — it simply has not been extended to
                the personal-data fields around them.
              </p>
              <p>
                The most important of these has also <strong>already been solved elsewhere</strong>: the
                insurance specifications validate an Emirates ID with
                <code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code>. Yet the same <code>EmiratesId</code> is left
                unchecked in Account Information, Account Opening, FX, and here in Leads. The ask is to close the
                gap on the Leads fields by <strong>reusing what the ecosystem has already agreed</strong> where
                a pattern exists, and defining a purpose-built one where it does not.
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
              <h2 class="ofp-band__title">Reuse the patterns we already have, per field</h2>
            </div>
            <div class="ofp-prose">
              <p>
                Add a <code>pattern</code> to each Leads personal-data field, purpose-built for what that field
                actually holds, and — wherever a validation already exists in the ecosystem — <strong>reuse it
                verbatim</strong>. Lengths and field shapes do not change.
              </p>

              <p><strong>Emirates ID</strong> — adopt the existing insurance-spec pattern. The leading
                <code>784</code> is the <strong>ISO 3166-1 numeric country code for the UAE</strong>; the final
                digit is a checksum (which a regex validates in shape but not in value):</p>
              <p class="ofp-regex"><code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code></p>

              <p><strong>Names</strong> — a tight, Latin-only character set. Person names
                (<code>GivenName</code>, <code>LastName</code>, <code>FullName</code>) allow letters, space,
                apostrophe, period, and hyphen — enough for “Al-Maktoum”, “O’Brien”, “Mohd.” — but no digits.
                <code>BusinessName</code> additionally allows digits and business punctuation:</p>
              <p class="ofp-regex"><code>person&nbsp;&nbsp;^[A-Za-z '.\-]+$
business&nbsp;^[A-Za-z0-9 &amp;'.,\-()/]+$</code></p>

              <p><strong>Address lines</strong> — the field already cites ISO 20022 <code>PostalAddress27</code>.
                Reuse the <RouterLink to="/proposals/ofp-003/">OFP-003</RouterLink> approved “x” set — the ISO
                20022 / SWIFT set of Latin letters, digits, space and <code>/ - ? : ( ) . , ' +</code>:</p>
              <p class="ofp-regex"><code>^[A-Za-z0-9 /?:().,'+\-]+$</code></p>

              <p>
                The baseline is deliberately <strong>Latin-only</strong>. OFP-003 originally proposed the Arabic
                block (<code>U+0600–U+06FF</code>) and it was <strong>removed on approval</strong>, because
                Arabic cannot be carried end-to-end over SWIFT/UAEFTS and is transliterated to Latin before
                submission. Whether that reasoning should hold for <em>stored</em> lead PII — names and
                addresses that never touch the rails — is a genuine question, and is put to the ecosystem below
                rather than assumed here. As in OFP-003, length is counted in Unicode characters, the API Hub
                normalises to Unicode NFC before validating, and validation is enforced centrally at the
                <strong>API Hub</strong> so a malformed lead is rejected before it reaches the LFI.
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
                Additive <code>pattern</code> constraints on the existing Leads schemas — lengths and shapes
                unchanged.
              </p>
            </div>

            <div class="ofp-changes">
              <div class="ofp-change">
                <div class="ofp-change__label">01 · Name schemas</div>
                <p>
                  Add the person-name pattern to <code>GivenName</code> / <code>LastName</code>
                  (<code>AEPersonalAccountName</code>) and <code>FullName</code>
                  (<code>AEPersonalAccountFullName</code>), and the business-name pattern to
                  <code>BusinessName</code> (<code>AEBusinessAccountName</code>).
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">02 · Emirates ID</div>
                <p>
                  On <code>Data.EmiratesId</code>, add the <code>784</code> pattern. The same change applies to
                  the Lead <em>response</em> object, which echoes the field.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">03 · Address lines</div>
                <p>
                  Add the “x”-set pattern to the <code>AddressLine</code> items in
                  <code>AEResidentialAddress</code>. <code>minItems 1</code>, <code>maxItems 7</code>, and the
                  per-item <code>maxLength 70</code> are unchanged.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">04 · Applied to Ozone Connect too</div>
                <p>
                  <code>AEUserName</code> and <code>AEResidentialAddress</code> are shared by the TPP product
                  specification and the Ozone Connect products-data specification, so the same patterns apply
                  identically to both — a lead that validates at the API Hub will not be rejected downstream.
                </p>
              </div>
              <div class="ofp-change">
                <div class="ofp-change__label">05 · Validation &amp; error handling</div>
                <p>
                  A field that does not match its pattern fails schema validation at the <strong>API Hub</strong>
                  and is rejected before the request reaches the LFI — returned as a standard request-validation
                  error, not silently sanitised on the TPP’s behalf.
                </p>
              </div>
            </div>

            <div class="ofp-code">
              <div class="ofp-code__label">Today — length limits only (Emirates ID unvalidated)</div>
              <pre class="ofp-code__pre">{{ exampleToday }}</pre>
            </div>

            <div class="ofp-code">
              <div class="ofp-code__label">Proposed — patterns added, lengths unchanged</div>
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
              Length is enforced separately — a value over its <code>maxLength</code> fails on length, not on
              the pattern.
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
              <h2 class="ofp-band__title">What validating the Leads fields buys</h2>
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
                Two points the baseline deliberately leaves open — settle these and they fold into the change.
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
