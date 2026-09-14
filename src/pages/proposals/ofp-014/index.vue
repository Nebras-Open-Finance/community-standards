<route lang="yaml">
meta:
  title: 'OFP-014 · Define date-time semantics once, in a shared component'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-014. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Technical changes, Enforcement, Publication,
// Requiring UTC, Questions, Pros, and Cons. Styling follows the
// site's editorial system and mirrors OFP-013.
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
const OG_TITLE = 'OFP-014 · Define date-time semantics once, in a shared component'
const OG_DESCRIPTION =
  'Every date-time field in the specifications repeats the same description, and none of them says the value is an instant in time. That omission lets an implementation read a UTC value as local time and still consider itself conformant. This proposal introduces a shared AEDateTime component that states the semantics once, and has every date-time field reference it.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-014',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '16 Sep 2026',
  closes: '7 Oct 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

// The three questions asked alongside the vote. These are ALSO held in the
// proposals API (the `questions` column) — that is where the vote form reads
// them from, and where the answers are stored. Kept here so they are readable
// on the page before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'LFIs',
    q: 'Does your implementation treat 2027-07-22T00:00:00Z and 2027-07-22T04:00:00+04:00 as the same moment today — and if not, what is involved in correcting it?',
    why: 'These two strings are the same instant. The clarification makes any difference in behaviour between them a conformance failure, and it is the test certification would apply. The answer tells us whether this is a documentation change the ecosystem absorbs quietly or one that requires a remediation window — and it is worth running before voting, because it takes minutes and does not need any instrumentation.',
  },
  {
    who: 'TPPs and LFIs',
    q: 'Should V2.2 also carry a pattern that prohibits -00:00 while continuing to permit non-UTC offsets, or should the schema stay unconstrained until a major version requires UTC outright?',
    why: 'The pattern in section 04 makes the MUST NOT on -00:00 enforceable at close to zero migration cost, since almost nobody emits it deliberately. Requiring UTC by schema is breaking for every participant currently sending a non-UTC offset — all of whom are conformant today. This asks whether the first is worth landing now, rather than waiting for the second.',
  },
  {
    who: 'TPPs and LFIs',
    q: 'Should V2.2 require UTC outright by schema — so that +04:00 and every other non-UTC offset is rejected — or should that wait for a major version?',
    why: 'Section 06 sets out exactly what this would look like and which strings would stop being valid. It is the enforceable end state, and it would remove the equivalence class entirely rather than asking every participant to handle it. It is also breaking: any producer emitting a non-UTC offset is conformant today and would be rejected on the day it lands. This proposal defers it — the question asks whether the ecosystem would rather take it at V2.2 and absorb the migration in one step.',
  },
]

const pros = [
  'It states the semantics that are currently missing. The existing text describes the encoding — "ISO 8601 date-time format", "must include the timezone" — but never says the value identifies an instant, which is the one sentence that makes ignoring the offset non-conformant.',
  'It makes the defect testable. The equivalence example is itself a certification case: 2027-07-22T00:00:00Z and 2027-07-22T04:00:00+04:00 are the same moment, and any implementation that behaves differently for the two has a defect that can be demonstrated in a single call.',
  'It is not a breaking change. type and format are unchanged, so the change is wire-identical and validation-identical. Every implementation conformant today stays conformant, and no participant is required to do anything on a date.',
  'It collapses roughly twenty duplicated descriptions into one component. Today the same paragraph is restated per schema with minor variations, so it drifts and any correction has to be made in twenty places.',
  'It costs the central platform nothing. No API Hub behaviour changes, no normalisation is introduced into the request path, and no new validation is added at V2.2 — the entire change is specification text.',
  'It addresses a failure mode that does not announce itself. An implementation that ignores the offset is wrong by four hours in the UAE, which is invisible at a thirty-day horizon and severe at a one-hour one — so it reaches production and surfaces later as an unreproducible complaint.',
]

const cons = [
  'A description is not enforcement. A non-conforming implementation still passes schema validation at V2.2, because the constraint lives in prose. Only functional certification would catch it, and only if the case is added there.',
  'It touches every specification. The edit is mechanical but wide — roughly twenty schemas across data sharing, service initiation, confirmation of payee, insurance and the consent specs — and each site needs checking rather than a blind replace.',
  'The allOf + $ref construction makes each field three lines where it was two, and some code generators flatten allOf poorly, producing a less readable model than the inline description did.',
  'It does not repair implementations already in production. Participants who read the offset incorrectly today must still change their code; the clarification establishes that they are wrong, it does not fix them.',
  'It defers the constraint that would actually prevent the problem. Requiring UTC by schema is the enforceable version, and this proposal explicitly leaves that to a major version — so the ambiguity remains legal in the meantime.',
]

// The text as it stands — rendered in the Background section.
const currentYaml = `# Today — one of ~20 near-identical definitions across the specifications

    AEConsentExpirationDateTime:
      description: |2-
            Specified date and time the consent will expire.

            All dates in the JSON payloads are represented in ISO 8601 date-time format.
            All date-time fields in responses must include the timezone. An example is :2023-04-05T10:43:07+00:00
      type: string
      format: date-time

# It describes the ENCODING. It never says the value identifies an INSTANT, and
# it never says that two encodings of the same instant are equivalent. An
# implementation that reads the date and time components as local time is not
# contradicted by anything above.`

// The shared component — rendered in the Technical changes section.
const sharedYaml = `    AEDateTime:
      title: AEDateTime
      description: |
        An instant in time, per ISO 8601 / RFC 3339, with a mandatory offset.

        Recipients MUST apply the offset, and MUST NOT read the date and time
        components as local time. Encodings of the same instant are equivalent and
        MUST behave identically: \`2027-07-22T00:00:00Z\` and \`2027-07-22T04:00:00+04:00\`
        are the same value.

        Producers SHOULD emit UTC (\`Z\` or \`+00:00\`), and MUST NOT use \`-00:00\`.
        Fractional seconds are optional.
      type: string
      format: date-time
      example: "2027-07-22T00:00:00Z"`

// Each field after the change — rendered in the Technical changes section.
const fieldYaml = `    AEConsentExpirationDateTime:
      allOf:
        - $ref: '#/components/schemas/AEDateTime'
        - description: Specified date and time the consent will expire.

# type and format are unchanged, so the wire format and schema validation are
# identical before and after. Every date-time field in every specification takes
# the same treatment, keeping its own field-specific description.`

// The two candidate patterns — rendered in the Enforcement section. Behaviour
// below was verified against each value rather than reasoned about.
const patternYaml = `# Enforces the MUST NOT on -00:00, while permitting every other offset.
pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|\+\d{2}:\d{2}|-(?:0[1-9]|1[0-2]):\d{2})$'

# Verified behaviour:
#
#   2027-07-22T00:00:00Z              pass
#   2027-07-22T00:00:00.000Z          pass
#   2027-07-22T00:00:00+00:00         pass
#   2027-07-22T00:00:00.000+00:00     pass
#   2027-07-22T00:00:00.123456Z       pass
#   2027-07-22T04:00:00+04:00         pass
#   2027-07-22T00:00:00-05:00         pass
#   2027-07-22T00:00:00-00:00         REJECT
#   2027-07-22T00:00:00               REJECT
#   2027-07-22 00:00:00Z              REJECT
#   22/07/2027 00:00:00               REJECT`

// The stricter option, written out — rendered in section 06.
const strictYaml = `    AEDateTime:
      title: AEDateTime
      description: |
        An instant in time, per ISO 8601 / RFC 3339, expressed in UTC.

        Recipients MUST apply the offset, and MUST NOT read the date and time
        components as local time.

        Producers MUST emit UTC, using either \`Z\` or \`+00:00\`.
        Fractional seconds are optional.
      type: string
      format: date-time
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|\\+00:00)$'
      example: "2027-07-22T00:00:00Z"`

// Which strings the pattern above admits — rendered in section 06.
const strictExamples = `# Accepted
2027-07-22T00:00:00Z              # UTC, whole seconds
2027-07-22T00:00:00.000Z          # UTC, milliseconds
2027-07-22T00:00:00.123456Z       # UTC, any fractional precision
2027-07-22T00:00:00+00:00         # the zero offset written out in full
2027-07-22T00:00:00.000+00:00     # zero offset, milliseconds

# No longer valid — but conformant under V2.1, and in use today
2027-07-22T04:00:00+04:00         # Gulf Standard Time
2027-07-22T00:00:00-05:00         # any other non-UTC offset

# Invalid today, and still invalid under this pattern
2027-07-22T00:00:00-00:00         # negative zero offset
2027-07-22T00:00:00               # no offset at all
2027-07-22 00:00:00Z              # space instead of T
22/07/2027 00:00:00               # not ISO 8601`

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
// page (ofp-014/outcome.vue / ofp-014/feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Define date-time semantics once, in a shared component',
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

        <h1 class="ofp__title">Define date-time semantics once, in a shared component</h1>
        <p class="ofp__summary">
          Every date-time field in the specifications carries its own copy of the same description,
          and not one of them says that the value identifies <strong>an instant in time</strong>.
          The text describes the encoding and stops there &mdash; so an implementation that reads
          <code>2027-07-22T00:00:00Z</code> as local midnight is contradicted by nothing. In the UAE
          that is an error of <strong>four hours</strong>, invisible at a thirty-day horizon and
          fatal at a one-hour one. This proposal introduces a shared
          <strong><code>AEDateTime</code></strong> component that states the semantics once, and has
          every date-time field reference it.
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
            set out in section 07 below. The first takes minutes to answer and is worth running before you
            vote; the second decides how far V2.2 goes.
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
          <h2 class="ofp-band__title">The specification describes the encoding, not the meaning</h2>
        </div>
        <div class="ofp-prose">
          <p>
            A date-time field appears in almost every payload in the standard &mdash;
            <code>ExpirationDateTime</code>, <code>CreationDateTime</code>,
            <code>TransactionDateTime</code>, <code>BookingDateTime</code>,
            <code>ValueDateTime</code>, and many more. Each is defined as
            <code>type: string</code>, <code>format: date-time</code>, accompanied by a short
            description which is duplicated, with minor variations, across approximately twenty
            schema definitions.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today &mdash; the definition, and what it leaves unsaid</div>
            <pre class="ofp-code__pre">{{ currentYaml }}</pre>
          </div>

          <p>
            Nowhere does the standard say that a date-time identifies an instant, or that two encodings of the same
            instant are equivalent and must behave identically. A developer who reads the date and time
            components and ignores the offset has not contradicted the specification. They have simply
            read it literally.
          </p>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Why this is worth a proposal rather than a bug report</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The error is four hours, in the UAE, in the expiring direction.</strong> A value
                of <code>2027-07-22T00:00:00Z</code> is <code>04:00</code> Gulf time. Read as local, it
                resolves four hours early. On a consent with a thirty-day expiry nobody notices; on one
                set an hour ahead the consent is already expired when it arrives.
              </li>
              <li>
                <strong>Nothing in the ecosystem catches it.</strong> The value is well formed, so schema
                validation passes. The API Hub stores and returns it unchanged. The receiving system
                records a time that is simply wrong, and no error is raised at any hop.
              </li>
              <li>
                <strong>It has already happened.</strong> This proposal follows a live integration in
                which a correctly-formed UTC consent expiry was interpreted as local time, causing
                short-window consents to fail on arrival. The reported symptom &mdash; &ldquo;the LFI
                receives it without an offset&rdquo; &mdash; was not what the wire showed.
              </li>
              <li>
                <strong>Every participant carries the cost.</strong> Because the standard permits a range
                of encodings, each participant must implement normalisation for every counterparty it
                talks to. That is the same logic written many times over, and each implementation is an
                opportunity to get it wrong in a way nothing will flag.
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
          <h2 class="ofp-band__title">Say it once, in a component every field references</h2>
          <p class="ofp-band__lede">
            Introduce a single shared <code>AEDateTime</code> schema carrying the semantics, and replace
            the duplicated description on every date-time field with a reference to it. The rules become
            normative, stated in one place, and correctable in one place.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">What the component establishes</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>A date-time is an instant.</strong> The offset is part of the value. Recipients
                MUST apply it and MUST NOT read the date and time components as local time.
              </li>
              <li>
                <strong>Equivalent encodings MUST behave identically.</strong>
                <code>2027-07-22T00:00:00Z</code> and <code>2027-07-22T04:00:00+04:00</code> are the same
                value. This is the sentence that turns the defect above into a conformance failure.
              </li>
              <li>
                <strong>Producers SHOULD emit UTC</strong> &mdash; <code>Z</code> or
                <code>+00:00</code> &mdash; which signals the direction of travel without requiring
                anyone to move at V2.2.
              </li>
              <li>
                <strong><code>-00:00</code> MUST NOT be used.</strong> ISO 8601 prohibits a negative zero
                offset; RFC 3339 permits it but assigns it &ldquo;local offset unknown&rdquo; semantics,
                which is not what any producer in this ecosystem means.
              </li>
              <li>
                <strong>Fractional seconds are optional</strong>, at unspecified precision &mdash; so
                recipients must accept their presence or absence, and must not compare these values as
                strings.
              </li>
            </ul>
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
          <h2 class="ofp-band__title">One new schema, and a reference from every date-time field</h2>
          <p class="ofp-band__lede">
            Taking <code>AEConsentExpirationDateTime</code> as the worked example. The same treatment
            applies to every date-time field across every specification.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-code">
            <div class="ofp-code__label">The shared component &mdash; added once</div>
            <pre class="ofp-code__pre">{{ sharedYaml }}</pre>
          </div>

          <div class="ofp-code">
            <div class="ofp-code__label">Each field &mdash; reference plus its own description</div>
            <pre class="ofp-code__pre">{{ fieldYaml }}</pre>
          </div>

          <p>
            A short normative section is added to each specification&rsquo;s
            <code>info.description</code> as well, so the rule is discoverable without reading a schema
            and certification has a single place to point at.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · ENFORCEMENT
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 &middot; Enforcement</div>
          <h2 class="ofp-band__title">Whether to add a pattern</h2>
          <p class="ofp-band__lede">
            As drafted, the rules above are prose: a non-conforming value still passes schema validation.
            A <code>pattern</code> would make one of them enforceable, at very little cost &mdash; but it
            would not reach the behaviour this proposal is chiefly concerned with.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-code">
            <div class="ofp-code__label">The candidate pattern, and its verified behaviour</div>
            <pre class="ofp-code__pre">{{ patternYaml }}</pre>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">The distinction that matters</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>It enforces only the <code>-00:00</code> prohibition.</strong>
                Every other offset continues to validate, so the only producers affected are those
                emitting a negative zero offset &mdash; which ISO 8601 already prohibits and which
                essentially nobody emits deliberately. It converts a MUST NOT from advice into a rule at
                close to zero migration cost.
              </li>
              <li>
                <strong>Requiring UTC by schema is a different proposition, and is breaking.</strong> Any participant
                sending <code>+04:00</code> today is conformant today and would be rejected the day it
                lands. That is a major-version change with a runway, not something to carry along with a
                clarification.
              </li>
              <li>
                <strong>A pattern does not fix the actual defect.</strong> An implementation that ignores
                the offset on a perfectly valid <code>Z</code> value passes it. Enforcement
                addresses what is <em>sent</em>; the clarification in section 02 addresses how it is
                <em>read</em>, and only certification tests the latter.
              </li>
            </ul>
          </div>

          <p>
            The recommendation is to signal UTC as a <code>SHOULD</code> at V2.2, decide this pattern on
            the ecosystem&rsquo;s answer to question 02, and defer any schema-enforced UTC requirement
            to a major version, with the runway sized by measured exposure rather than by assumption.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · PUBLICATION
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; Publication</div>
          <h2 class="ofp-band__title">A knowledge base article published alongside</h2>
          <p class="ofp-band__lede">
            The specification states the rule; the knowledge base explains how to satisfy it. An article
            &mdash; <em>Date &amp; Time Handling Across the Standard</em> &mdash; publishes with this
            change.
          </p>
        </div>
        <div class="ofp-prose">

          <div class="ed-tpp-grid">
            <RouterLink
              to="/proposals/ofp-014/knowledge-base-article"
              class="ed-tpp-card"
              :style="{ '--card-color': '#0043A6' }"
            >
              <span class="ed-tpp-card__top" :style="{ background: '#0043A6' }" />

              <div class="ed-tpp-card__meta">
                <span class="ed-tpp-card__cat" :style="{ color: '#0043A6' }">Draft article</span>
              </div>

              <h3 class="ed-tpp-card__title">Date &amp; Time Handling Across the Standard</h3>
              <p class="ed-tpp-card__desc">
                The guidance in full &mdash; the model, what TPPs send and read, what LFIs must apply,
                a two-minute self-test, and a table of test vectors.
              </p>

              <div class="ed-tpp-card__tags">
                <span
                  v-for="tag in ['Data Sharing', 'Consents', 'Ozone Connect']"
                  :key="tag"
                  class="ed-tpp-card__tag"
                  :style="{ background: 'rgba(0, 67, 166, 0.10)', color: '#0043A6' }"
                >{{ tag }}</span>
              </div>

              <div class="ed-tpp-card__foot">
                <span class="ed-tpp-card__cta">Open article</span>
                <span class="ed-tpp-card__arrow" :style="{ color: '#0043A6' }">&rarr;</span>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         06 · REQUIRING UTC
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; Requiring UTC</div>
          <h2 class="ofp-band__title">Constraining the format so that UTC is required outright</h2>
          <p class="ofp-band__lede">
            The stricter option: rather than recommending UTC, require it by schema. This proposal does
            not include it &mdash; but it is where the standard should eventually arrive, and it is put
            to the ecosystem as question 03 rather than settled in advance.
          </p>
        </div>
        <div class="ofp-prose">
          <p>
            The change is a single added <code>pattern</code> on the shared component. Nothing else
            about <code>AEDateTime</code> moves, and no field definition changes &mdash; which is the
            advantage of having consolidated them in the first place.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">AEDateTime, with UTC required</div>
            <pre class="ofp-code__pre">{{ strictYaml }}</pre>
          </div>

          <div class="ofp-code">
            <div class="ofp-code__label">Which strings the pattern admits</div>
            <pre class="ofp-code__pre">{{ strictExamples }}</pre>
          </div>

          <p>
            The recommendation remains to signal UTC as a <code>SHOULD</code> at V2.2 and require it at
            the next major version, with the runway set by measured exposure. If the answers to
            question 03 show the ecosystem would rather absorb the change in one step, that
            recommendation should be revisited before V2.2 is finalised.
          </p>
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
            These appear as optional boxes when you confirm your vote. Answer the ones addressed to you
            &mdash; every voter sees both. The first is worth running <em>before</em> you vote: it takes
            minutes and needs no instrumentation.
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
          <h2 class="ofp-band__title">What the component buys</h2>
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

/* ─── Companion-page card — matches the /tech/tpp-standards card ─── */
.ed-tpp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
  max-width: 60rem;
}

.ed-tpp-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ed-tpp-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-tpp-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-tpp-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ed-tpp-card__cat { font-weight: 700; }

.ed-tpp-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.ed-tpp-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
}

.ed-tpp-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.ed-tpp-card__tag {
  padding: 0.28rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  text-transform: uppercase;
}

.ed-tpp-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
  margin-top: auto;
}

.ed-tpp-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-tpp-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ed-tpp-card:hover .ed-tpp-card__arrow { transform: translateX(4px); }
.ed-tpp-card:hover .ed-tpp-card__cta { color: var(--at-navy-deep); }

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
