<route lang="yaml">
meta:
  title: 'OFP-004 · Enforce a minimum ExpirationDateTime for consents'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-004. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Technical changes, Alternative approach, Pros,
// and Cons. Styling follows the site's editorial system (cream/white bands,
// Fraunces/Poppins/IBM Plex Mono, sharp corners) and mirrors OFP-003.
import { ref, computed, onMounted, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'

// Per-page link-preview override: a tailored title + description so a shared
// link to this proposal reads as the proposal itself, not the site default.
// (og:image is inherited from the branded site default in App.vue.) Later meta
// of the same property/name wins under Unhead's dedupe.
const OG_TITLE = 'OFP-004 · Enforce a minimum ExpirationDateTime for consents'
const OG_DESCRIPTION =
  'A consent can be created today that expires in seconds — long before the customer can authenticate at the LFI. Add a minimum ExpirationDateTime at consent creation so a consent is never born already doomed to expire mid-journey.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-004',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '1 Jul 2026',
  closes: '22 Jul 2026',
  priority: 'medium' as Priority,
  version: 'V2.1-errata',
}

const pros = [
  'Eliminates dead-on-arrival consents — a consent can no longer be created that expires before the customer has time to authenticate at the LFI and the TPP to make its first call.',
  'Ties the minimum to the real constraint — the authorisation journey — so it stays correct even if the API Hub’s internal authorisation-timeout window is later retuned.',
  'Preserves data minimisation: a TPP can still create a short-lived, single-use consent (e.g. a one-off balance or verification check) rather than holding a long-lived grant it does not need.',
  'Small and additive — one extra bound on ExpirationDateTime at the API Hub, alongside the existing “must be in the future” rule and the documented one-year maximum.',
  'Closes a spec/implementation gap: the AwaitingAuthorization → Expired transition already happens in practice, and this aligns the documented consent status model with observed behaviour.',
  'Cheap for TPPs to adopt — any sensible ExpirationDateTime already clears a 15-minute floor, so only absurd values are rejected.',
]

const cons = [
  '“Expired” now carries two histories — a consent that lapsed before it was ever authorised, and one that lapsed after active use — so a Consent Management Interface needs the audit trail (or a status reason) to tell them apart.',
  'Requires legitimising and documenting the AwaitingAuthorization → Expired transition — a change to the consent status model, not validation alone.',
  'The exact floor (15 minutes) is a judgement call; an unusually slow authentication journey could in theory still outrun a minimum-length consent, so the margin must be chosen with comfort to spare.',
  'Two terminal statuses for an unauthorised consent depending on timing — Expired if it reaches its ExpirationDateTime first, Rejected if the authorisation-timeout cleanup fires first — which implementers must apply correctly.',
]

// Empirical evidence — observed sandbox behaviour, rendered as dark code blocks
// in the Background section. These are not schema; they are the measured facts
// the proposal rests on.
const evidenceAccepted = `# PAR validation TODAY — the only rule enforced is "must be in the future"
ExpirationDateTime     PAR result
past (-1 hour)         400   "The ExpirationDateTime value must be in the future."
now + 30 seconds       201   accepted   <-- expires mid-journey: dead on arrival
now + 2 minutes        201   accepted
now + 2 hours          201   accepted
now + 364 days         201   accepted
now + > 1 year               rejected (documented maximum)`

const evidenceLifecycle = `# 10 consents created, then left UNAUTHORISED (Model Bank sandbox)
label      ExpirationDateTime   terminal status   reached at   reason
SH-2m      now + 2 min          Expired           ~ +3m        ExpirationDateTime reached while AwaitingAuthorization
SH-30m     now + 30 min         Expired           ~ +35m       ExpirationDateTime reached while AwaitingAuthorization
SH-2h      now + 2 h            Expired           ~ +2h03m     ExpirationDateTime reached
LL-1..7    now + 364 days       Rejected          ~ +2h03m     authorisation not completed within ~2h (API Hub cleanup)`

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
  title: 'Enforce a minimum ExpirationDateTime for consents',
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

        <h1 class="ofp__title">Enforce a minimum ExpirationDateTime for consents</h1>
        <p class="ofp__summary">
          A consent can be created today that expires in seconds — long before the customer can be
          redirected to the LFI, authenticate, and authorise it. Add a minimum
          <code>ExpirationDateTime</code> at consent creation so a consent is never born already doomed to
          expire mid-journey.
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
         01 · BACKGROUND
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream ofp-band--seam">
      <span class="ofp-seam-label">The proposal</span>
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 · Background</div>
          <h2 class="ofp-band__title">A consent that expires before it can be used</h2>
        </div>
        <div class="ofp-prose">
          <p>
            Every consent — whatever its type — carries an <code>ExpirationDateTime</code>, the
            <code>AEPushedAuthorizationRequests.AEConsentExpirationDateTime</code> field set by the TPP in
            the consent request, that fixes the date and time the consent will expire. Today the API Hub
            applies a <strong>single</strong> rule to it at consent creation: it must be in the future.
            There is no minimum. A past value is rejected; everything else is accepted. The behaviour
            described here is the same for <strong>all consent types</strong>; the figures below were
            measured on the Model Bank sandbox, and the lifecycle and validation they reveal are shared
            across every type.
          </p>
          <p>
            We tested this directly against the Model Bank sandbox. A consent set to expire <strong>30
            seconds</strong> in the future is accepted just as readily as one a year out:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Observed — PAR acceptance by ExpirationDateTime</div>
            <pre class="ofp-code__pre">{{ evidenceAccepted }}</pre>
          </div>

          <p>
            That is the problem. Authorising a consent is not instant: the customer is redirected to the
            LFI, authenticates, reviews and approves the consent, is redirected back, and only then does the
            TPP exchange the code for a token and make its first call. That journey takes
            <strong>minutes</strong>. A consent whose <code>ExpirationDateTime</code> falls inside that
            window is <strong>dead on arrival</strong> — it lapses before anyone can finish using it. A
            one-second expiry is not a hypothetical: the platform accepts it.
          </p>
          <p>
            Separately, the API Hub runs a background job that <strong>terminates consents not authorised
            within roughly two hours</strong>, moving them to <code>Rejected</code>. The two mechanisms are
            independent, and conflating them causes confusion, so it is worth stating plainly that there are
            <strong>two different clocks</strong>:
          </p>
          <ul class="ofp-gaps">
            <li>
              <strong>ExpirationDateTime</strong> — the consent’s usable lifetime, chosen by the TPP. It
              governs how long an <em>authorised</em> consent remains valid for data sharing.
            </li>
            <li>
              <strong>The ~2-hour authorisation timeout</strong> — an API Hub cleanup job. It governs how
              long an <em>un-authorised</em> consent may sit waiting before it is rejected.
            </li>
          </ul>
          <p>
            We confirmed both by creating ten consents and leaving every one of them unauthorised. The three
            with short expiries lapsed to <code>Expired</code> when their <code>ExpirationDateTime</code>
            passed; the seven long-lived ones were swept to <code>Rejected</code> at about two hours by the
            cleanup job:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Observed — terminal status of ten unauthorised consents</div>
            <pre class="ofp-code__pre">{{ evidenceLifecycle }}</pre>
          </div>

          <p>
            That first group exposes a second gap. An unauthorised consent reaching its
            <code>ExpirationDateTime</code> moves <code>AwaitingAuthorization → Expired</code> — but the
            documented consent status model frames <code>Expired</code> as the end of an <em>authorised</em>
            consent, and <code>Rejected</code> as “the unauthorized consent has been rejected at the LFI.”
            The behaviour we observe (the Hub expiring, and elsewhere rejecting, a consent the LFI never
            saw) is not what the status descriptions describe.
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 02 · Recommendation</div>
          <h2 class="ofp-band__title">A journey-based minimum, set to 15 minutes</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Reject, at consent creation, any <code>ExpirationDateTime</code> less than 15 minutes in
            the future.</strong> The check sits alongside the two bounds already in place — “must be in the
            future” and the one-year maximum — and fails with the same kind of request-validation
            <code>400</code> a past value gets today. Fifteen minutes is comfortably longer than the
            authorisation journey (redirect, customer authentication, approval, return, token exchange, and
            a first call), while still short enough that a TPP can keep a single-use consent tight.
          </p>
          <p>
            Crucially, the minimum is anchored to the <strong>journey</strong>, not to the ~2-hour cleanup
            job. The cleanup window is an internal operational value that may be retuned; the time a customer
            needs to authenticate is not. Tying the floor to the journey keeps it correct independent of the
            job, and the two clocks should be documented side by side so no one re-derives a false
            dependency between them.
          </p>
          <p>
            Because a valid short consent (≥ 15 minutes) can still lapse while unauthorised — the customer
            simply abandons the journey — this recommendation also <strong>legitimises the
            <code>AwaitingAuthorization → Expired</code> transition</strong> in the consent status model and
            pins down the two terminal meanings:
          </p>
          <ul class="ofp-gaps">
            <li><strong><code>Expired</code></strong> — the consent reached its <code>ExpirationDateTime</code>, whether or not it had been authorised.</li>
            <li><strong><code>Rejected</code></strong> — authorisation was not completed within the API Hub’s authorisation window (the ~2-hour cleanup), or the LFI rejected it.</li>
          </ul>
          <p>
            That leaves one wrinkle to handle deliberately: an <code>Expired</code> consent that was never
            authorised and one that expired after active use share a single status. A Consent Management
            Interface should distinguish them from the <strong>consent audit</strong> (the status-transition
            history) or a status reason — “expired before authorisation” versus “expired after use” — rather
            than from the <code>Status</code> value alone. A TPP sets <code>ExpirationDateTime</code> in the
            consent request for every type; the
            <RouterLink to="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/">Data Sharing API guide</RouterLink>
            shows one example.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 · Technical changes</div>
          <h2 class="ofp-band__title">What changes in the spec</h2>
          <p class="ofp-band__lede">
            One new validation bound, one alignment of the consent status model, and a documentation note —
            no new fields, endpoints, or schemas.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Minimum on <code>AEConsentExpirationDateTime</code></div>
            <p>
              At the API Hub, validate that <code>ExpirationDateTime</code> is at least <strong>15 minutes</strong>
              in the future at consent creation (PAR), in addition to the existing “must be in the future”
              check and the documented one-year maximum. A value below the floor is rejected as a standard
              request-validation error — not silently clamped. This is a Hub-side validation rule; the field
              definition itself is unchanged.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · Consent status model (<code>AEConsentStatus.AEConsentStatusCodes</code>)</div>
            <p>
              Explicitly permit the <code>AwaitingAuthorization → Expired</code> transition, and clarify the
              terminal descriptions: <code>Expired</code> applies whenever <code>ExpirationDateTime</code> is
              reached (authorised or not); <code>Rejected</code> covers an authorisation that was not
              completed in time (the API Hub cleanup) as well as an LFI rejection. The current
              <code>Rejected</code> text — “rejected at the LFI” — should be widened, since the ~2-hour
              timeout is a Hub-side action on a consent the LFI never saw.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · Documentation — the two clocks</div>
            <p>
              Add a consent-lifecycle note describing the two independent timers —
              <code>ExpirationDateTime</code> (usable lifetime, TPP-chosen) and the authorisation-timeout
              cleanup (Hub-side) — and the new minimum, on the consent lifecycle pages and the per-type API
              guides, so TPPs size <code>ExpirationDateTime</code> against the journey rather than against
              the cleanup window. The rule and the lifecycle apply to every consent type, not one product
              area.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · ALTERNATIVE APPROACH
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · Alternative approach</div>
          <h2 class="ofp-band__title">Align the minimum to the cleanup window (~130 minutes)</h2>
          <p class="ofp-band__lede">
            A larger floor — just over the ~2-hour authorisation timeout — that buys cleaner status
            semantics at the cost of banning short consents.
          </p>
        </div>
        <div class="ofp-prose">
          <p>
            Instead of a journey-based 15 minutes, set the minimum <code>ExpirationDateTime</code> to roughly
            <strong>130 minutes</strong> — a little beyond the ~2-hour cleanup window. The effect is elegant:
            any unauthorised consent is swept to <code>Rejected</code> by the cleanup <em>before</em> its
            <code>ExpirationDateTime</code> (≥ 130 min) can ever be reached. So <code>Expired</code> would
            then mean one thing only — <strong>“was authorised, then lapsed”</strong> — the
            <code>AwaitingAuthorization → Expired</code> transition would not arise in practice, and the
            documented status model could stay as it is. In a Consent Management Interface, an
            <code>Expired</code> consent unambiguously had a life; you never see one that was never active.
          </p>
          <p><strong>Why we do not recommend it:</strong></p>
          <ul class="ofp-gaps">
            <li>
              It forces <em>every</em> consent to live at least ~130 minutes, even when the use case wants a
              tight, single-use one-off check — working directly against <strong>data minimisation</strong>,
              and outlawing a legitimate short-lived pattern.
            </li>
            <li>
              It couples a public standards value to a <strong>configurable internal job duration</strong>.
              Retune the cleanup to 30 minutes or 4 hours and the 130-minute floor is immediately wrong.
            </li>
            <li>
              It buys little for the actual problem. The dead-on-arrival case is already solved by a
              15-minute floor; the extra ~115 minutes only delivers status tidiness — which the recommended
              option recovers anyway through the consent audit.
            </li>
          </ul>
          <p>
            The trade is real, which is why it is presented here rather than dismissed: 130 minutes gives the
            cleanest <code>Expired</code> semantics with no status-model change, but 15 minutes solves the
            safety problem without sacrificing short consents. The recommendation takes the latter and
            handles the status ambiguity explicitly.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 · Pros</div>
          <h2 class="ofp-band__title">What a journey-based minimum buys</h2>
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 · Cons</div>
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
.ofp-gaps strong { color: var(--at-navy-deep); font-weight: 600; }
.ofp-gaps em { font-style: italic; }

.ofp-gaps code {
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
