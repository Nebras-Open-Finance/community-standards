<route lang="yaml">
meta:
  title: 'OFP-007 · Show an LFI its own API Hub configuration in the Admin Portal'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-007. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, What is shown, Why view-only, Technical changes,
// Pros, and Cons. Styling mirrors OFP-006.
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
const OG_TITLE = 'OFP-007 · Show an LFI its own API Hub configuration in the Admin Portal'
const OG_DESCRIPTION =
  'An LFI\'s Ozone Connect Base URL, Authorization Endpoint, application layer authentication method, and API family base paths live across an onboarding ticket and every later ticket that changed one of them. Show the effective configuration, read-only, in the Admin Portal.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-007',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '20 Jul 2026',
  closes: '3 Aug 2026',
  priority: 'medium' as Priority,
  version: 'API Hub',
}

const pros = [
  'Gives an LFI one current answer for its own connectivity configuration, held by the party that actually enforces it, instead of a state that has to be reconstructed by replaying every ticket that ever touched it.',
  'Removes a class of Service Desk ticket entirely — the ones that ask what a value is set to rather than asking to change it.',
  'Closes the gap that opens after every change ticket, where the newest value is known to whoever raised it and to nobody else.',
  'Makes forwarded-URL problems self-diagnosable. Seeing the resolved Ozone Connect URL per API family turns "why is the Hub calling a path that does not exist?" into something the LFI can answer in seconds.',
  'Makes pre-production and production drift visible, because each environment\'s portal shows its own values side by side with the same field names.',
  'Access control comes free too: Trust Framework SSO already gates the portal, so no new identity, credential, or permission model is introduced.',
  'It is a read model over configuration the API Hub already holds — no change to the Ozone Connect contract, the headers, the schemas, the onboarding process, or anything TPP-facing.',
  'Shortens onboarding handover. A new engineer joining an LFI\'s Open Finance team can read the live configuration instead of being walked through it.',
]

const cons = [
  'It is still a build — a read model over the Hub\'s live configuration, an API, a portal page, and documentation — for information an LFI could in principle keep its own copy of.',
  'It widens the audience for operational detail. Backend base URLs, internal paths, and egress IP addresses move from an onboarding ticket to a screen visible to everyone the Trust Framework grants portal access, so the access model has to be right before this ships.',
  'Read-only is the smaller half of the problem. It tells an LFI what is configured without letting it change anything, so a value that is wrong still costs a Service Desk ticket and a wait.',
]

// The proposed Configuration page, sketched as a dark code block in the
// Recommendation section.
const proposedView = `Admin Portal  ·  Configuration          admin.examplebank.preprod.apihub.openfinance.ae

CONNECTIVITY
  Ozone Connect Base URL        https://openapi-uat.example.com
  Authorization Endpoint        https://auth.example.com/openfinance/authorize

APPLICATION LAYER AUTHENTICATION
  Method                        JWT Auth  (PS256, keys via Trust Framework JWKS)
  JWT Auth on LFI -> Hub calls  Enabled   (Consent Manager, Headless Heimdall)

API FAMILY BASE PATHS                                   Effective forwarded URL
  Data Sharing        /openfinance/data-sharing         https://openapi-uat.example.com/openfinance/data-sharing/accounts
  Service Initiation  /openfinance/service-initiation   https://openapi-uat.example.com/openfinance/service-initiation/domestic-payments
  Products            (not set)                         https://openapi-uat.example.com/products
  Consent Events      (not set)                         https://openapi-uat.example.com/event-notifications
  Health Check        /openfinance/health               https://openapi-uat.example.com/openfinance/health/echo-cert

INSTANCE
  LFI Code                      examplebank
  LFI Organisation ID           b41f9c2e-...
  API Hub egress IPs            203.0.113.10, 203.0.113.11   (allowlist these)`

// What an LFI has to work with TODAY, rendered in the Background section.
const todayExample = `Q: "What is our Data Sharing base path in pre-production?"

  OF-1042   Environment-specific onboarding, pre-prod     = /openfinance/data
  OF-1361   Add a base path for Products                  untouched?
  OF-1590   Move the Authorization Endpoint               untouched?
  OF-1847   Correct the Data Sharing base path            = /openfinance/data-sharing
  OF-2033   Switch application layer auth to JWT Auth     untouched?

The answer is whatever the LAST ticket to touch that field said — so you have to
find them all, order them, and be sure none was missed. Miss one and the wrong
answer looks exactly like the right one.

Then repeat for production. Then repeat for every other brand.`

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
// Voting has closed — the fallback matches, so the pre-rendered HTML opens on the
// Outcome tab rather than briefly showing the "voting not yet open" cover.
const status = ref<Status>('closed')
const priority = ref<Priority>(meta.priority)
const openedDisplay = ref(meta.opened)
const closesDisplay = ref(meta.closes)
const versionDisplay = ref(meta.version)

const priorityLabel = computed(() => PRIORITY[priority.value]?.label ?? PRIORITY.medium.label)

// Voting has finished: swap the "Cast your vote" CTA for a closed treatment and
// let the tally show through (the draft state keeps its frosted cover below).
const isClosed = computed(() => status.value === 'closed')

// Optional companion partials, authored per proposal and co-located with this
// page (outcome.vue / feedback.vue) — excluded from routing in vite.config.
// Their presence drives the layout: an Outcome switches a closed proposal to the
// tabbed view; Feedback is appended under the vote panel. When neither exists the
// page renders exactly as before.
const outcomeMods = import.meta.glob('./outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Show an LFI its own API Hub configuration in the Admin Portal',
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

        <h1 class="ofp__title">Show an LFI its own API Hub configuration in the Admin Portal</h1>
        <p class="ofp__summary">
          An LFI's Ozone Connect Base URL, Authorization Endpoint, application layer authentication
          method, and API family base paths are spread across an onboarding ticket and every later ticket
          that changed one of them. Nothing holds the current answer in one place. Surface the effective
          configuration, read-only, in the Admin Portal.
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
            each person may vote once. The second question on the form &mdash; whether you would want to
            <em>edit</em> any of this configuration yourself &mdash; shapes a separate proposal, so please
            answer it even if you vote against this one.
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
          <h2 class="ofp-band__title">Knowable in principle, scattered across tickets in practice</h2>
        </div>
        <div class="ofp-prose">
          <p>
            During
            <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific onboarding</RouterLink>,
            an LFI hands Nebras the details that define how the API Hub reaches its backend: the
            <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url">Ozone Connect Base URL</RouterLink>,
            the
            <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint">Authorization Endpoint</RouterLink>,
            and an optional <strong>API family base path</strong> for each of Data Sharing, Service
            Initiation, Products, Consent Events &amp; Notifications, and Health Check. Earlier in
            onboarding it selects an
            <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth">application layer authentication method</RouterLink>
            &mdash; mTLS only, API Key, Client Credentials Grant, or JWT Auth &mdash; along with its
            sub-settings, such as the scopes used for Client Credentials or whether JWT Auth headers are
            also sent on the LFI's own calls to the Consent Manager and Headless Heimdall.
          </p>
          <p>
            All of it is submitted on a <strong>Service Desk ticket</strong>. That is the documented
            process and it works: the ticket is raised, the values are exchanged, connectivity is
            validated in both directions, and the ticket is closed.
          </p>
          <p>
            None of this is hidden from the LFI. The values are in the tickets, the tickets are searchable,
            and in principle everything can be recovered from them. The difficulty is that
            <strong>it is never one ticket</strong>. Onboarding creates the first record, and everything
            after it arrives as its own ticket, each raised to change one specific thing &mdash; a base
            path added when Products went live, a corrected path, a moved Authorization Endpoint, a switch
            from mTLS-only to JWT Auth. Each ticket is a <em>delta</em>, not a statement of the whole.
          </p>
          <p>
            So working out what is configured <em>today</em> is not a lookup. It means finding every ticket
            that has ever touched the field, putting them in order, replaying them, and being confident
            none was missed &mdash; where missing one gives you a wrong answer that looks exactly like a
            right one. Then doing it again for the other environment, and again for each brand if the LFI
            runs more than one hub.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Today &mdash; reconstructing a value from the ticket history</div>
            <pre class="ofp-code__pre">{{ todayExample }}</pre>
          </div>

          <p>
            Meanwhile the API Hub holds the answer as a <strong>single current value</strong>, because that
            is what it enforces on every proxied request. There is simply no way for the LFI to ask it. The
            one place an LFI already signs in to look at its own hub &mdash; the
            <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/">Admin Portal</RouterLink> &mdash;
            shows TPP activation, consents, logs, reports, outages, and the users who hold access. It does
            not show a single one of the values above.
          </p>

          <p>
            The cost of this is small each time and constant in aggregate. It lands hardest in the places
            where accuracy matters most: an incident where a forwarded request is 404ing and nobody can
            confirm the path the Hub is prepending; a suspected drift between pre-production and production
            that nobody can rule out; a multi-brand LFI running several hubs whose configurations must be
            told apart from ticket history; a new engineer joining the team with no way to read the current
            state of the integration they have inherited.
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
          <h2 class="ofp-band__title">A Configuration section in the Admin Portal</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <strong>Add a read-only Configuration section to the Admin Portal that shows the effective
            onboarding configuration the API Hub actually holds for that instance and environment.</strong>
            Not a copy of the onboarding form &mdash; the live values the Hub enforces at proxy time.
          </p>

          <div class="ofp-code">
            <div class="ofp-code__label">Proposed &mdash; Admin Portal &rsaquo; Configuration (illustrative)</div>
            <pre class="ofp-code__pre">{{ proposedView }}</pre>
          </div>

          <p>
            The scoping falls out of what already exists. The Admin Portal is provisioned
            <strong>one instance per API Hub, per environment</strong> &mdash;
            <code>admin.{lficode}.preprod.apihub.openfinance.ae</code> and
            <code>admin.{lficode}.apihub.openfinance.ae</code> &mdash; so a page inside it is already
            correctly scoped to one brand and one environment without anything new being built. A
            multi-brand LFI opens each brand's portal and sees that brand's configuration, which is exactly
            the distinction that is hardest to hold onto across ticket threads.
          </p>
          <p>
            Access control falls out too. Portal access is already granted via Trust Framework SSO to
            users holding the relevant roles &mdash; PTC, PBC, STC &mdash; and revoked by managing those
            roles in the Trust Framework. This proposal introduces no new identity, credential, or
            permission model; the audience for the page is the audience the portal already has.
          </p>
          <p>
            Nothing else changes. The Ozone Connect contract, the headers, the schemas, the TPP-facing API,
            and the onboarding process itself are all untouched. Configuration continues to be submitted
            and changed exactly as it is today.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · WHAT IS SHOWN
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 · What is shown</div>
          <h2 class="ofp-band__title">Connectivity and authentication, for this hub and this environment</h2>
          <p class="ofp-band__lede">
            The scope is the configuration an LFI provides or is allocated for connectivity. Certificates
            are deliberately excluded &mdash; see below.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-rules">
            <div class="ofp-rules__label">In scope</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>Ozone Connect Base URL</strong> &mdash; the base URL the API Hub forwards to for
                this environment.
              </li>
              <li>
                <strong>Authorization Endpoint</strong> &mdash; the OIDC authorisation URL the customer is
                redirected to, or an explicit indication that the LFI has adopted <strong>CAAP</strong> and
                therefore provides none.
              </li>
              <li>
                <strong>Application layer authentication method</strong> &mdash; mTLS only, API Key, Client
                Credentials Grant, or JWT Auth, together with its configured sub-settings: the
                <code>scope</code> values agreed for Client Credentials, and whether JWT Auth headers are
                sent on the LFI's calls to the Consent Manager and Headless Heimdall Auth Server.
              </li>
              <li>
                <strong>Optional API family base paths</strong> &mdash; one row per family (Data Sharing,
                Service Initiation, Products, Consent Events &amp; Notifications, Health Check), showing the
                configured path <em>or</em> an explicit &ldquo;not set&rdquo;, and next to it the
                <strong>effective forwarded URL</strong> worked through against the base URL, so there is
                nothing left to infer.
              </li>
              <li>
                <strong>Instance identifiers and allocated values</strong> &mdash; LFI Code, LFI
                Organisation ID, the Ozone-allocated domains for the environment, and the API Hub egress IP
                addresses the LFI must allowlist.
              </li>
            </ul>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Out of scope</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>Certificates.</strong> The certificate set (S1, S3, C4, Sig2, Sig3, C3, S4, Sig4,
                Enc1) and its JWKS URLs and KIDs are not included. They are held and managed in the Trust
                Framework, which is their system of record, and surfacing a second view of them raises
                questions about which one is authoritative. Keeping this proposal to connectivity and
                authentication keeps it small enough to be worth building; certificates can be taken up
                separately if the ecosystem wants them.
              </li>
              <li>
                <strong>Editing.</strong> Nothing on the page is changeable. See section 04.
              </li>
            </ul>
          </div>

          <p>
            One requirement matters more than the rest: the page must be generated from the
            <strong>live configuration the API Hub enforces</strong>, not from a stored copy of what was
            written on the onboarding ticket. A page that can drift from the running configuration is
            worse than no page, because it would be trusted.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · WHY VIEW-ONLY
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 · Why view-only</div>
          <h2 class="ofp-band__title">Seeing and changing are different proposals</h2>
        </div>
        <div class="ofp-prose">
          <p>
            The obvious next question is whether an LFI should be able to <em>change</em> these values in
            the portal rather than raising a Service Desk ticket. This proposal deliberately does not ask
            for that, for three reasons.
          </p>
          <p>
            <strong>The risk profiles are not comparable.</strong> Displaying a value the Hub already holds
            cannot break a live integration. Editing the Ozone Connect Base URL, the Authorization
            Endpoint, or a base path on a production hub can take an LFI's entire Open Finance estate
            offline in one click, and a wrong application layer authentication method breaks every call in
            both directions. Nebras's end-to-end connectivity validation exists precisely because these
            values are not safe to set unverified.
          </p>
          <p>
            <strong>Editing needs a change-control model that does not exist yet.</strong> The portal today
            documents no role-differentiated permissions &mdash; every user granted access sees the same
            thing. Before any of this becomes editable there has to be an answer on who may change what,
            whether approval is required, how a change is validated before it takes effect, how it is
            audited, and whether production is treated differently from pre-production. That is a
            substantial piece of design in its own right and it should not ride along on a display change.
          </p>
          <p>
            <strong>Read-only is worth having on its own.</strong> A meaningful share of the Service Desk
            traffic these fields generate is not &ldquo;please change this&rdquo; but &ldquo;what is this
            set to?&rdquo;. That question disappears entirely with a view, at a fraction of the cost.
          </p>
          <p>
            That said, we want to know whether editing would be valuable to you, so
            <strong>the second question on the vote form asks exactly that</strong> &mdash; which fields
            you would want to change yourself, and what change control your institution would need around
            them. If the answers show real appetite, we will bring it forward as a separate proposal with
            the permissions and validation model worked through properly. Please answer it whichever way
            you vote on this one.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 · Technical changes</div>
          <h2 class="ofp-band__title">What changes</h2>
          <p class="ofp-band__lede">
            A read model, a portal page, and documentation. Nothing on the request path, and nothing that
            an LFI or TPP must implement.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 · Configuration read model</div>
            <p>
              Expose the effective connectivity and application-layer-authentication configuration for an
              API Hub instance and environment, read from the configuration the Hub enforces rather than
              from a stored copy of the onboarding submission. Read-only: no write path is introduced.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 · Admin Portal Configuration section</div>
            <p>
              A new section in the portal rendering the values in section 03, using the same field names as
              the onboarding documentation so the two read as one thing. The API family table resolves each
              path against the base URL and shows the forwarded URL alongside it. Fields that are not set
              are shown explicitly as not set, with the resulting default path, rather than being omitted.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 · Documentation</div>
            <p>
              A new page under
              <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/">Admin Portal</RouterLink>
              describing the section and each field it shows, cross-linked from
              <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">Environment-Specific Configuration</RouterLink>,
              <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url">Ozone Connect Base URL</RouterLink>,
              <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint">Authorization Endpoint</RouterLink>,
              and
              <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth">Application Layer Authentication</RouterLink>,
              each stating plainly that the configured value can be viewed in the portal and changed via
              the Service Desk.
            </p>
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 · Pros</div>
          <h2 class="ofp-band__title">What the view buys</h2>
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

.ofp-band__lede em { font-style: italic; }

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

/* ─── Rules recap (in scope / out of scope) ─────────────────────────────── */
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
.ofp-rules__list em { font-style: italic; }

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
