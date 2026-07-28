<route lang="yaml">
meta:
  title: 'OFP-008 · Protect FinanceRates with an LFI-hosted display element'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-008. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Scope, Technical changes, Cost, Pros, and Cons.
// Styling follows the site's editorial system and mirrors OFP-006.
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
const OG_TITLE = 'OFP-008 · Protect FinanceRates with an LFI-hosted display element'
const OG_DESCRIPTION =
  'Retire the encrypted-JWE protection for FinanceRates. Instead of handing the TPP an encrypted rate to decrypt locally, the LFI returns a reference to a surface it renders itself, which the TPP embeds as a cross-origin element — 3DS-style — so the rate is never received by the TPP at all.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-008',
  proposedBy: 'Nebras',
  author: 'Nowaier AlQahtani',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '4 Aug 2026',
  closes: '25 Aug 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

const pros = [
  'The rate never enters the TPP’s systems in any form — protection is structural (cross-origin isolation), not a matter of trusting the TPP’s conduct after a point-in-time certification.',
  'Removes the heaviest parts of the LFI build: JWE generation and the PBES2 / A256GCM crypto, per-call one-time-code minting and out-of-band delivery, and OTP-spam rate limiting.',
  'Expiry is enforced by the LFI server-side, eliminating today’s “the TPP must honour exp” weakness and the header-vs-plaintext ambiguity in the current design.',
  'Lets LFIs reuse existing 3DS / challenge infrastructure to authenticate the customer inside the surface, rather than build a bespoke encryption-and-OTP flow.',
  'Makes the certification meaningful and technically enforceable at consent creation — closing the gap where nothing today stops an uncertified TPP requesting ReadProductFinanceRates.',
  'Cleartext stays available for LFIs that do not consider a given rate sensitive, so no forced friction is added where none is wanted.',
  'No LFI has a live JWE implementation, so removing AEJwe affects no one — this is a clean introduction, not a migration, with no deprecation window to run.',
]

const cons = [
  'LFIs must expose a customer-facing web surface with token validation — more front-end responsibility than a pure API contract, even where it reuses existing customer channels.',
  'Embedded cross-origin frames bring UX cost: sizing, theming to fit the TPP’s design, mobile-webview quirks, and accessibility. 3DS challenge windows are a known source of friction.',
  'The TPP cannot theme or localise the rate presentation — it is the LFI’s element. Consistency of protection is bought at the price of TPP brand control.',
  'Clickjacking / overlay attempts belong in the threat model. They are mitigated by the LFI’s framing hygiene, the certification, and the low value of a display-only surface showing the customer their own rate — but we deliberately do not defend them with a per-TPP origin allowlist.',
  'Viewing a protected rate now requires a live, customer-present context and an LFI round-trip — it is not a server-side or batch-friendly path. (This already applies to today’s JWE + OTP path, which is also customer-present.)',
]

// The JWE shape LFIs return TODAY, rendered in the Background section.
const todayExample = `# Today — the LFI returns FinanceRates as an encrypted JWE
GET /accounts/{AccountId}/product

"FinanceRates": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIn0..."

# The TPP forwards this compact JWE to the customer’s browser and decrypts it
# locally using a one-time code the LFI sent out of band. Once decrypted, the
# cleartext rate exists in a context the TPP controls — whether it is stored or
# leaves the device rests on the TPP behaving as it demonstrated at certification.`

// The proposed display-reference shape, rendered in the Recommendation section.
const proposedExample = `# Proposed — the LFI returns a reference to a surface it renders itself
GET /accounts/{AccountId}/product

"FinanceRates": {
  "DisplayUrl": "https://display.altareq1.example.ae/rates?rt=eyJhbGciOi...",
  "ExpiresAt": "2026-08-01T14:30:00Z"
}

# The TPP embeds DisplayUrl as a cross-origin iframe. The customer sees the rate
# rendered by LFI-origin content; the TPP’s own code cannot read it. The rate
# value never reaches the TPP in any form, encrypted or cleartext.`

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
// page (ofp-008.outcome.vue / ofp-008.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-008.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-008.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Protect FinanceRates with an LFI-hosted display element',
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

        <h1 class="ofp__title">Protect FinanceRates with an LFI-hosted display element</h1>
        <p class="ofp__summary">
          Retire the encrypted-JWE protection for <code>FinanceRates</code>. Instead of handing the TPP
          an encrypted rate to decrypt on the device, the LFI returns a reference to a surface it
          <strong>renders itself</strong>, which the TPP embeds as a cross-origin element &mdash;
          3DS-style &mdash; so the rate is never received by the TPP at all.
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
            each person may vote once. This changes how a protected rate reaches the customer for every
            LFI and TPP, so the reasoning you record carries as much weight as the tally itself.
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 01 · Background</div>
          <h2 class="ofp-band__title">The encrypted-rate design is heavy to build and thin on protection</h2>
        </div>
        <div class="ofp-prose">
          <p>
            When a TPP holds <code>ReadProductFinanceRates</code> and calls
            <RouterLink to="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product"><code>GET /accounts/{AccountId}/product</code></RouterLink>,
            the LFI MAY return the <code>FinanceRates</code> field as a compact JWE rather than a
            cleartext object. The TPP forwards that JWE to the customer’s browser and decrypts it
            locally, using a one-time code the LFI sends the customer out of band. The
            <RouterLink to="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/finance-rates">Encrypted FinanceRates</RouterLink>
            guide documents the full flow.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today &mdash; the rate is handed to the TPP encrypted, then decrypted on the device</div>
            <pre class="ofp-code__pre">{{ todayExample }}</pre>
          </div>

          <p>
            LFI feedback has surfaced two structural problems. First, it is
            <strong>heavy to implement for thin protection</strong>. The LFI must generate a per-call JWE
            (PBES2-HS512+A256KW / A256GCM), mint and deliver a one-time code on a channel it controls,
            and operate OTP-spam rate limits &mdash; a significant build. Yet once the browser decrypts
            the JWE, the cleartext rate exists in a context the TPP controls; whether it is stored or
            leaves the device rests on trusting the TPP to behave as it demonstrated at certification.
          </p>
          <p>
            Second, that <strong>certification is a point-in-time check, and it is not technically
            required</strong>. The optional certification attests, once, that the TPP decrypts and
            displays locally and does not persist the rate &mdash; it cannot bind the TPP’s runtime
            behaviour thereafter. Separately, nothing in the API Hub currently prevents an
            <em>uncertified</em> TPP from requesting <code>ReadProductFinanceRates</code> when it creates
            a consent; the dependency is documented but not enforced.
          </p>
          <p>
            The net effect is real engineering cost on the LFI side buying protection that still rests on
            trust, with an enforcement gap on top.
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
          <h2 class="ofp-band__title">Have the LFI show the rate itself, inside the TPP&rsquo;s screen</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>On <code>GET /accounts/{AccountId}/product</code>, an LFI protecting a rate returns
            &mdash; in place of the rate value &mdash; a short-lived reference to an LFI-hosted display
            surface. The TPP embeds that surface as a cross-origin element (a plain iframe, or an
            LFI-provided web component) within its own screen.</strong> The customer sees the rate in the
            flow of the TPP application; it is rendered by LFI-origin content that the TPP’s code
            cannot read, script into, or capture.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed &mdash; the LFI returns a reference to a surface it renders itself</div>
            <pre class="ofp-code__pre">{{ proposedExample }}</pre>
          </div>

          <p>
            This mirrors 3-D Secure: the LFI is the issuer, the TPP is the merchant, and the sensitive
            interaction happens in an issuer-controlled frame the merchant hosts but cannot see into.
            LFIs that already run 3DS challenge infrastructure can reuse that tooling to authenticate the
            customer inside the surface, replacing the out-of-band OTP entirely.
          </p>
          <p>
            The customer’s browser or app loads the LFI surface <strong>directly from the LFI
            origin</strong>, exactly as it already reaches the LFI when the customer authenticates during
            consent authorisation. Strict mediation is preserved &mdash; the invariant governs API and
            data traffic, and the rate value is never proxied to the TPP; only a reference is.
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 · Scope and behaviour</div>
          <h2 class="ofp-band__title">What the reference means, precisely</h2>
          <p class="ofp-band__lede">
            The reference and the surface behind it become something TPPs and LFIs build against, so the
            shape and the controls have to be pinned down rather than left to implementation.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <code>FinanceRates</code> becomes <code>anyOf</code> a cleartext
                <code>AEProductFinanceRates</code> object <strong>or</strong> a new
                <code>AERateDisplayRef</code>. The <code>AEJwe</code> shape is
                <strong>removed</strong> from this field.
              </li>
              <li>
                <code>AERateDisplayRef</code> carries a <code>DisplayUrl</code> on the LFI’s
                customer-facing display origin &mdash; itself carrying a signed, single-use request token
                bound to the consent, <code>AccountId</code>, <code>ProductId</code>, and the TPP’s
                client identity &mdash; and an <code>ExpiresAt</code>.
              </li>
              <li>
                <strong>Confidentiality comes from cross-origin isolation.</strong> Because the frame is
                cross-origin, the TPP page cannot read the rate from the DOM, script into the frame, or
                capture its content. This holds regardless of any allowlist.
              </li>
              <li>
                <strong>Access comes from the token.</strong> A valid <code>DisplayUrl</code> only ever
                reaches the legitimate TPP, because obtaining one requires an authenticated, consented
                call through the API Hub. The LFI validates the token before rendering anything.
              </li>
              <li>
                <strong>Expiry is enforced by the LFI, server-side.</strong> After <code>ExpiresAt</code>
                the surface stops rendering the rate &mdash; it is no longer a TPP obligation to honour a
                display window.
              </li>
              <li>
                <strong>No per-TPP embedding-origin registration.</strong> We deliberately avoid a
                <code>frame-ancestors</code> allowlist; it would only add clickjacking defence for a
                display-only surface showing the customer their own rate, at the cost of a new
                registration artifact and LFI upkeep, and it does not map cleanly onto native / webview.
              </li>
              <li>
                <code>ReadProductFinanceRates</code> is <strong>unchanged</strong>. It still gates whether
                the LFI surfaces the rate at all; if the permission is absent, <code>FinanceRates</code>
                is omitted from the <code>Product</code> record, exactly as today.
              </li>
            </ul>
          </div>
          <p>
            The baseline embedding is a plain cross-origin iframe &mdash; the lowest common denominator
            and the closest reuse of 3DS browser flows &mdash; with an optional LFI-provided web-component
            or mobile-SDK profile defined for richer embedding, and for native contexts where an iframe is
            not the host.
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · Technical changes</div>
          <h2 class="ofp-band__title">What changes</h2>
          <p class="ofp-band__lede">
            One schema change, a display surface on the LFI side, a repurposed certification the API Hub
            can enforce, and documentation. The consent, audit, and billing semantics are untouched.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Standards schema</div>
            <p>
              In the account-information specification, change <code>FinanceRates</code> to
              <code>anyOf</code> <code>[ AEProductFinanceRates, AERateDisplayRef ]</code>, add the
              <code>AERateDisplayRef</code> schema, and <strong>remove <code>AEJwe</code></strong> from
              this field. Targets <strong>V2.2</strong>. Because no LFI has a live JWE implementation, the
              removal affects no one and needs no deprecation window.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · LFI display surface</div>
            <p>
              A protecting LFI stands up (or reuses) a tokenised, customer-facing display surface that
              validates the request token, authenticates the customer where it chooses to &mdash; reusing
              existing 3DS / challenge infrastructure &mdash; renders the rate, and enforces
              <code>ExpiresAt</code> server-side. In return it retires the JWE generation, the one-time-code
              minting and delivery, and the OTP-spam rate limits. No per-TPP allowlist is maintained.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · Certification &amp; enforcement</div>
            <p>
              Rename the optional <em>Access Encrypted Resource Data</em> certification &mdash; a misnomer
              once there is no encryption &mdash; to <strong>Rate Display Embedding</strong>, and repurpose
              it: the TPP demonstrates it can correctly embed and operate the LFI element and does not
              attempt to defeat its isolation. The API Hub SHOULD then reject a consent requesting
              <code>ReadProductFinanceRates</code> from a TPP that does not hold the certification, using
              the trust-framework record it already holds &mdash; closing today’s enforcement gap.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 · Documentation</div>
            <p>
              Rewrite the two <em>Encrypted FinanceRates</em> guides (TPP and LFI) and the Data Sharing
              requirements tables around the embedded surface, update the certification page under its new
              name, and record the change as an errata. No new registration field is introduced.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · WHAT THIS COSTS TO BUILD
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 · What this costs to build</div>
          <h2 class="ofp-band__title">A different shape of work, not obviously less of it</h2>
        </div>
        <div class="ofp-prose">
          <p>
            This proposal trades one build for another. It retires the JWE crypto, the one-time-code
            delivery, and the OTP rate limiting &mdash; genuinely the heaviest parts of today’s LFI
            work &mdash; but in their place a protecting LFI has to expose a <strong>customer-facing
            display surface</strong> with token validation and, if it wants friction control, a challenge
            step. For an LFI that already runs 3DS this is largely reuse; for one that does not, it is new
            front-end responsibility.
          </p>
          <p>
            The change is <strong>meaningful for TPPs too</strong>: they move from forwarding a JWE and
            decrypting in-browser to embedding and operating a cross-origin element they cannot style. And
            it is a <strong>breaking schema change</strong> to <code>FinanceRates</code>, taken at V2.2.
            The one thing that makes it cheap right now is that <strong>no LFI has shipped the JWE
            path</strong>, so nothing has to be migrated &mdash; this is close to a clean start rather than
            a transition.
          </p>
          <p>
            A vote in favour is a statement that your institution would <em>build to</em> this &mdash; an
            LFI that it would host the surface, a TPP that it would embed it &mdash; not merely that it
            reads as more secure. If the ecosystem would rather keep the encrypted-rate design, or would
            not use the protected path at all, that is a perfectly good outcome and the work will not be
            scheduled.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         06 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 · Pros</div>
          <h2 class="ofp-band__title">What the display surface buys</h2>
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 · Cons</div>
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
