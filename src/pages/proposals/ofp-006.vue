<route lang="yaml">
meta:
  title: 'OFP-006 · Carry the requested API version into the Ozone Connect path'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-006. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Scope, Technical changes, Cost, Pros, and Cons.
// Styling follows the site's editorial system and mirrors OFP-004.
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
const OG_TITLE = 'OFP-006 · Carry the requested API version into the Ozone Connect path'
const OG_DESCRIPTION =
  'An LFI dual-running two versions can only tell them apart by parsing the o3-api-uri header. Let the LFI put a ${VERSION} token in the API family base path it configures at onboarding, and have the API Hub substitute the version the TPP requested at proxy time.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-006',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '20 Jul 2026',
  closes: '10 Aug 2026',
  priority: 'medium' as Priority,
  version: 'API Hub',
}

const pros = [
  'Puts version routing in the URL, where gateways, load balancers, service meshes, and reverse proxies already route — no application code needs to read a header to decide where a request goes.',
  'Removes the duplicated configuration or bespoke in-application routing an LFI needs today to serve two concurrent versions from one configured path.',
  'Directly eases the dual-running obligation in the Major Version Deprecation Policy, which every LFI must meet at each major version transition.',
  'Entirely opt-in and non-breaking — a configured path with no ${VERSION} token behaves exactly as it does today, so no LFI is affected unless it chooses to be.',
  'Configuration-only for the LFI: the token goes in the existing environment-specific onboarding field, with no change to the Ozone Connect contract, headers, schemas, or TPP-facing API.',
  'Per API family and per environment, because the base path already is — an LFI can adopt it for Data Sharing in pre-production alone and leave everything else untouched.',
  'The o3-api-uri header is unchanged and still carries the version, so an LFI can adopt the token, keep routing on the header, or use both during a migration.',
]

const cons = [
  'It is a meaningful piece of engineering in the API Hub, on the hot path for every proxied request — it must be specified, built, tested, and supported across every API family and environment, which is why the level of ecosystem demand matters before committing to it.',
  'It creates a second, LFI-selectable way to express the same fact. The version is then available in both the forwarded path and the o3-api-uri header, and an LFI must be clear which one it routes on.',
  'The exact substituted value becomes a contract. Once LFIs route on it, the format of the version segment (e.g. v2.1) cannot change without breaking their routing, so it must be pinned down in the specification.',
  'It shifts a routing decision from the LFI\'s code into Nebras-managed configuration, so a change to it becomes an onboarding/Service Desk change rather than a deployment the LFI controls end to end.',
  'Adoption is not automatic — an LFI still has to stand up per-version paths on its own infrastructure to get any benefit from the token.',
]

// The substitution, shown as a dark code block in the Recommendation section.
const substitutionExample = `# Configured base path (environment-specific onboarding)
  /data-sharing/\${VERSION}

# Ozone Connect Base URL
  https://openapi.example.com

TPP requests                                        Forwarded to Ozone Connect
/open-finance/account-information/v2.0/parties  -->  https://openapi.example.com/data-sharing/v2.0/parties
/open-finance/account-information/v2.1/parties  -->  https://openapi.example.com/data-sharing/v2.1/parties

# A path with no token is unchanged — today's behaviour, exactly
  /data-sharing              -->  https://openapi.example.com/data-sharing/parties`

// What the LFI has to work with TODAY, rendered in the Background section.
const todayExample = `# TPP calls the API Hub
GET /open-finance/account-information/v2.1/parties

# API Hub forwards to Ozone Connect, using the STATIC configured base path
GET https://openapi.example.com/data-sharing/parties
  o3-api-uri: /open-finance/account-information/v2.1/parties   <-- the only signal
  o3-api-operation: GET
  o3-provider-id: ...

# The forwarded PATH is identical for v2.0 and v2.1. To route between two
# concurrent versions, the LFI must parse the version out of o3-api-uri.`

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
// page (ofp-006.outcome.vue / ofp-006.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-006.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-006.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Carry the requested API version into the Ozone Connect path',
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

        <h1 class="ofp__title">Carry the requested API version into the Ozone Connect path</h1>
        <p class="ofp__summary">
          An LFI dual-running two versions can only tell them apart by parsing the
          <code>o3-api-uri</code> header, because the base path the API Hub prepends is a static string.
          Let the LFI place a <code>${VERSION}</code> token in that path and have the API Hub substitute
          the version the TPP actually requested.
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
            each person may vote once. Because this change carries a real engineering cost, the two
            questions on the form matter as much as the vote itself.
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
          <h2 class="ofp-band__title">The forwarded path looks the same whatever version was asked for</h2>
        </div>
        <div class="ofp-prose">
          <p>
            When a TPP calls the API Hub, the Hub validates the token and consent, enforces the OpenAPI
            schema, enriches the request, and then forwards it to the LFI's
            <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url">Ozone Connect Base URL</RouterLink>.
            Between that base URL and the endpoint, the Hub inserts an optional
            <strong>API family base path</strong> the LFI configures per environment during
            <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific onboarding</RouterLink>
            &mdash; one field each for Data Sharing, Service Initiation, Products, Consent Events, and
            Health Check &mdash; so an LFI can route different API families to different paths on the same
            server.
          </p>
          <p>
            That configured path is a <strong>static string</strong>. It is prepended verbatim to every
            request in that family, whatever version the TPP asked for.
          </p>
          <p>
            The TPP, meanwhile, carries the version as a segment of the request URL &mdash;
            <code>v2.1</code> in <code>/open-finance/account-information/v2.1/parties</code>. The API Hub
            knows which version was requested; it is what the Hub routed and schema-validated on. But by the
            time the request reaches the LFI, the only place that fact survives is the
            <code>o3-api-uri</code> header, which carries the parameterised URL the TPP called:
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today &mdash; the version reaches the LFI only in a header</div>
            <pre class="ofp-code__pre">{{ todayExample }}</pre>
          </div>

          <p>
            So an LFI wanting to serve two concurrent versions from one Ozone Connect deployment has to
            parse the version out of <code>o3-api-uri</code> and branch on it &mdash; a routing decision
            taken inside the application, on a header, rather than at the edge where routing normally
            happens. The alternative is to duplicate configuration or stand up bespoke routing in front of
            the backend.
          </p>
          <p>
            This is not a hypothetical requirement. The
            <RouterLink to="/policy/lfi-deprecation">Major Version Deprecation Policy</RouterLink> requires
            an LFI going live with a new major version to run the prior and new versions
            <strong>concurrently</strong> for the whole deprecation window &mdash; up to a 17-month
            transition envelope &mdash; routing each TPP request to the correct implementation, and keeping
            the two independently maintained with no cross-version dependencies. Every LFI will face this at
            every major version transition. Today the policy itself notes the routing signal is
            &ldquo;currently via the <code>o3-api-uri</code> header&rdquo;, because that is all there is.
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
          <h2 class="ofp-band__title">A <code>${VERSION}</code> token in the configured path</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Allow an LFI to include a substitution token &mdash; <code>${VERSION}</code> &mdash; in
            the API family base path it configures for an environment. At proxy time, the API Hub replaces
            the token with the version the TPP requested, parsed from the request URL path, before
            forwarding to Ozone Connect.</strong>
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed &mdash; the same configured path serves both versions</div>
            <pre class="ofp-code__pre">{{ substitutionExample }}</pre>
          </div>

          <p>
            The version then appears in the <strong>URL</strong>, which is where gateways, load balancers,
            service meshes, and reverse proxies already route. An LFI can point <code>/data-sharing/v2.0</code>
            and <code>/data-sharing/v2.1</code> at two independent deployments using infrastructure it
            already runs, rather than reading a header in application code to decide where a request goes.
          </p>
          <p>
            This is deliberately <strong>opt-in and non-breaking</strong>. The token is something an LFI
            chooses to put in a field it already fills in. A configured path with no <code>${VERSION}</code>
            in it behaves exactly as it does today &mdash; byte for byte &mdash; so no existing LFI is
            affected unless it decides to adopt this. Because the base path is already per API family and
            per environment, adoption is too: an LFI can use the token for Data Sharing in pre-production
            alone and leave everything else untouched.
          </p>
          <p>
            Nothing else changes. The <code>o3-api-uri</code> header still carries the parameterised URL
            including the version, exactly as it does now. The Ozone Connect contract, the headers, the
            schemas, and the TPP-facing API are all unchanged. An LFI may adopt the token, keep routing on
            the header, or run both while it migrates.
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
          <h2 class="ofp-band__title">What the token means, precisely</h2>
          <p class="ofp-band__lede">
            The substituted value becomes something LFIs route on, so it has to be pinned down rather than
            left to implementation.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                The token is <strong>literal and case-sensitive</strong>: <code>${VERSION}</code>. Any other
                text in the configured path is passed through verbatim, as today.
              </li>
              <li>
                The substituted value is the version segment <strong>exactly as it appears in the TPP's
                request path</strong> &mdash; e.g. <code>v2.1</code>, including the leading <code>v</code>.
              </li>
              <li>
                The token may appear <strong>at most once</strong> in a configured path, and may sit at any
                position within it (<code>/data-sharing/${VERSION}</code> or
                <code>/${VERSION}/data-sharing</code>).
              </li>
              <li>
                It is available on <strong>every API family</strong> that has a configurable base path, and
                is configured <strong>independently per environment</strong>, like the path itself.
              </li>
              <li>
                A path containing <strong>no token</strong> behaves exactly as it does today. This is the
                default and remains so.
              </li>
              <li>
                If a request has <strong>no version segment</strong> to substitute, the API Hub rejects the
                configuration at onboarding rather than forwarding a malformed path at runtime &mdash; the
                token is only offered for families whose requests are versioned.
              </li>
            </ul>
          </div>
          <p>
            The version used is the one the API Hub itself resolved for the request &mdash; the same value
            it routed and schema-validated on, and the same one it writes into <code>o3-api-uri</code>. The
            two can therefore never disagree.
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
            One change in the API Hub's proxy path, one in onboarding validation, and documentation. No
            change to the Ozone Connect contract, the headers, the schemas, or anything TPP-facing.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Substitution at proxy time</div>
            <p>
              When constructing the forwarded URL, the API Hub substitutes <code>${VERSION}</code> in the
              configured API family base path with the resolved request version before appending the
              endpoint. Where no token is present the path is used verbatim, as today. This sits on the
              request path for every proxied call, so it must be a cheap, allocation-light string
              substitution.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · Onboarding validation</div>
            <p>
              Accept <code>${VERSION}</code> in the environment-specific base path fields, validating that
              it appears at most once, that the surrounding path is otherwise valid, and that the API family
              is one whose requests carry a version. A configuration that could not resolve at runtime is
              rejected at onboarding, not at proxy time.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · Documentation</div>
            <p>
              Document the token on the
              <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment-Specific Configuration</RouterLink>
              page alongside the existing optional API family base paths, with the worked example above.
              Update the
              <RouterLink to="/policy/lfi-deprecation">Major Version Deprecation Policy</RouterLink> so that
              dual-running names both routing options &mdash; the <code>o3-api-uri</code> header and, where
              the LFI has configured it, the version in the forwarded path.
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
          <h2 class="ofp-band__title">This only goes ahead if the ecosystem would genuinely use it</h2>
        </div>
        <div class="ofp-prose">
          <p>
            The proposal reads as a small idea &mdash; a token in a configuration field &mdash; and the
            change to any individual LFI is small. The change to the <strong>API Hub is not</strong>. It
            touches request routing, which is on the hot path for every single proxied call in the
            ecosystem, and it makes a value that is currently fixed at configuration time into one resolved
            per request. That has to be specified, built, and then tested and supported across every API
            family, every environment, and every LFI configuration &mdash; including the overwhelming
            majority who will not use it and whose behaviour must be provably unchanged.
          </p>
          <p>
            <strong>This is a meaningful piece of engineering work, and Nebras would only commit to it if a
            significant part of the ecosystem would actually make use of it.</strong> A change of this size
            on the critical path is not worth making for one or two adopters, and it is not worth making at
            all if LFIs would continue to route on the <code>o3-api-uri</code> header regardless because
            that is what they have already built.
          </p>
          <p>
            That is what this proposal is asking. A vote in favour is a statement that your institution
            would <em>use</em> this, not merely that it seems like a good idea. The two questions on the
            vote form &mdash; whether you would route on the path instead of the header, and how you dual-run
            today &mdash; carry as much weight in the decision as the tally itself. If the answers show the
            ecosystem would keep using the header, that is a perfectly good outcome and the work will not be
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
          <h2 class="ofp-band__title">What the token buys</h2>
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

/* The recommendation heading carries the token inline — keep it monospaced but
   sized to the serif heading rather than boxed like body code. */
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
