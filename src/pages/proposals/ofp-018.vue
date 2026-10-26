<route lang="yaml">
meta:
  title: 'OFP-018 · Product Application Submission'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-018. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Lifecycle, Technical changes, Pros, and Cons.
// Follows the OFP-017 layout, with tables for the payload and status model.
// Adapted from the Product Application Submission consultation paper (v0.1).
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
const OG_TITLE = 'OFP-018 · Product Application Submission'
const OG_DESCRIPTION =
  'A User who compares products through a TPP still has to re-enter their details on the LFI’s own channel. From V2.2, a TPP can submit a User-confirmed application to the chosen LFI through the API Hub, and track it to a decision.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-018',
  proposedBy: 'Nebras',
  author: 'Sunil',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '22 Oct 2026',
  closes: '8 Nov 2026',
  priority: 'high' as Priority,
  version: 'V2.2',
}

const envelope = [
  { field: 'ProductId', type: 'string', req: 'Mandatory', notes: 'From GET /products' },
  { field: 'ProductCategory', type: 'AEProductCategoryCodes', req: 'Mandatory', notes: 'CurrentAccount, SavingsAccount, Finance or CreditCard' },
  { field: 'DataClusters', type: 'array of enum', req: 'Mandatory', notes: 'The clusters in the applicant payload' },
  { field: 'Provenance', type: 'array', req: 'Mandatory', notes: 'One entry per cluster: Cluster, Source and, for DataSharing, HostLfiCode, DataSharingConsentId and RetrievedDateTime' },
  { field: 'TppApplicationReference', type: 'string', req: 'Optional', notes: 'The TPP’s own reference for the journey' },
  { field: 'Channel', type: 'enum', req: 'Optional', notes: 'MobileApp or Web' },
  { field: 'ApplicantPayload', type: 'string (JWE)', req: 'Mandatory', notes: 'The applicant data below, encrypted to the Candidate LFI' },
]

const applicant = [
  { group: 'Applicant core', field: 'FullNameEnglish', req: 'Mandatory', notes: 'As on the Emirates ID' },
  { group: 'Applicant core', field: 'FullNameArabic', req: 'Optional', notes: '' },
  { group: 'Applicant core', field: 'EmiratesIdNumber', req: 'Mandatory', notes: 'Declared by the User; format-checked only' },
  { group: 'Applicant core', field: 'DateOfBirth', req: 'Mandatory', notes: '' },
  { group: 'Applicant core', field: 'Nationality', req: 'Mandatory', notes: 'ISO 3166-1 alpha-2' },
  { group: 'Contact', field: 'MobileNumber', req: 'Mandatory', notes: 'E.164' },
  { group: 'Contact', field: 'Email', req: 'Mandatory', notes: '' },
  { group: 'Contact', field: 'PreferredLanguage', req: 'Optional', notes: 'en or ar' },
  { group: 'Employment and financial', field: 'EmploymentStatus', req: 'Conditional', notes: 'Mandatory for Finance and CreditCard' },
  { group: 'Employment and financial', field: 'EmployerName', req: 'Conditional', notes: '' },
  { group: 'Employment and financial', field: 'MonthlySalary', req: 'Conditional', notes: 'Amount and currency' },
  { group: 'Employment and financial', field: 'LengthOfServiceMonths', req: 'Conditional', notes: '' },
  { group: 'Employment and financial', field: 'SalaryTransferBank', req: 'Optional', notes: 'Name and, where known, the LFI code' },
  { group: 'Employment and financial', field: 'ExistingMonthlyLiabilities', req: 'Optional', notes: 'Amount and currency' },
  { group: 'Product request', field: 'RequestedAmount', req: 'Conditional', notes: 'Finance amount or card limit' },
  { group: 'Product request', field: 'TenorMonths', req: 'Conditional', notes: 'Finance only' },
  { group: 'Product request', field: 'ProductSpecificAnswers', req: 'Optional', notes: 'Key–value answers to inputs the product publishes in GET /products' },
  { group: 'Declaration', field: 'UserConfirmedAccuracy', req: 'Mandatory', notes: 'true, with ConfirmedDateTime from the review screen' },
]

const statuses = [
  { code: 'Received', meaning: 'The LFI has accepted the submission for processing. Returned in the acknowledgement.', final: 'No' },
  { code: 'UnderReview', meaning: 'The LFI is carrying out KYC, fraud, risk and credit checks.', final: 'No' },
  { code: 'ActionRequired', meaning: 'The LFI needs something from the User, described by NextAction.ActionType.', final: 'No' },
  { code: 'Approved', meaning: 'The LFI has decided to offer the product. Acceptance or activation may still be pending.', final: 'No' },
  { code: 'Onboarded', meaning: 'The account, card or finance has been opened.', final: 'Yes' },
  { code: 'Rejected', meaning: 'The LFI has declined the application.', final: 'Yes' },
  { code: 'Withdrawn', meaning: 'The User withdrew the application, on the TPP’s request.', final: 'Yes' },
  { code: 'Expired', meaning: 'The User did not complete the required action in time.', final: 'Yes' },
]

const errors = [
  { http: '400', code: 'InvalidRequest', when: 'The envelope or the applicant payload fails schema validation', by: 'API Hub or LFI' },
  { http: '404', code: 'ProductNotFound', when: 'The ProductId is unknown to the LFI', by: 'LFI' },
  { http: '404', code: 'ApplicationNotFound', when: 'The reference is unknown, or belongs to another TPP', by: 'LFI' },
  { http: '409', code: 'IdempotencyConflict', when: 'The key was used before with a different payload', by: 'LFI' },
  { http: '409', code: 'DuplicateApplication', when: 'An equivalent open application already exists', by: 'LFI' },
  { http: '409', code: 'ApplicationInFinalStatus', when: 'Withdrawal requested for an application in a final status', by: 'LFI' },
  { http: '422', code: 'ProductNotAvailable', when: 'The product is no longer offered', by: 'LFI' },
  { http: '422', code: 'RequirementsNotMet', when: 'A mandatory field is missing, or a value is outside the range in the product data', by: 'LFI' },
]

const exampleRequest = `POST /product-applications
x-fapi-interaction-id: 93bac548-d2de-4546-b106-880a5018460d
x-idempotency-key: 6f1d2c0e-8b3a-4f7e-9c21-5a4b7d9e0f13

{
  "Data": {
    "ProductId": "PL-STD-001",
    "ProductCategory": "Finance",
    "DataClusters": ["ApplicantCore", "Contact", "EmploymentFinancial", "ProductRequest"],
    "Provenance": [
      {
        "Cluster": "ApplicantCore",
        "Source": "DataSharing",
        "HostLfiCode": "HOSTLFI01",
        "DataSharingConsentId": "dsc-91d4a7e2-33b0-4c8a-8f6e-5d1c0e7b2a44",
        "RetrievedDateTime": "2026-11-03T09:41:12Z"
      },
      { "Cluster": "Contact", "Source": "UserAmended" },
      { "Cluster": "EmploymentFinancial", "Source": "UserEntered" },
      { "Cluster": "ProductRequest", "Source": "UserEntered" }
    ],
    "TppApplicationReference": "app-20261103-5521",
    "Channel": "MobileApp",
    "ApplicantPayload": "<JWE compact serialisation>"
  }
}`

const exampleStatus = `{
  "Data": {
    "ApplicationReferenceId": "APP-7K2M9Q4X",
    "ProductId": "PL-STD-001",
    "Status": "ActionRequired",
    "StatusUpdateDateTime": "2026-11-03T11:02:10Z",
    "NextAction": {
      "ActionType": "IdentityVerification",
      "ExpirationDateTime": "2026-11-10T11:02:10Z",
      "HandOffUrl": "https://onboarding.example-lfi.ae/continue/3f9a1c"
    }
  }
}`

const pros = [
  'The User applies once. Details entered or shared in the TPP reach the LFI’s onboarding engine as a structured application, instead of being re-keyed on the LFI’s website or app.',
  'One integration for every LFI. A TPP submits the same payload through one API Hub endpoint, rather than building a bespoke integration per bank.',
  'The LFI keeps the decision. KYC, fraud and risk checks, credit assessment and onboarding stay with the LFI, and the TPP may not present a submitted application as approved.',
  'It builds on what exists. Product selection uses GET /products, Model 2 uses unchanged Data Sharing consents, status reuses the Webhooks service, and the Leads API stays the fallback for LFIs that are not ready.',
  'Personal data stays out of the API Hub. The applicant payload is encrypted to the Candidate LFI, so the Hub, its logs and its operators never hold it.',
  'The LFI knows where the data came from. Each cluster is marked as entered by the User, shared from a Host LFI, or amended by the User, so the LFI can weigh it accordingly.',
]

const cons = [
  'It is a new build for every participating LFI. Submission, status and withdrawal must be wired into the origination engine through Ozone Connect, with idempotency, a status feed and secure hand-off links.',
  'It needs new API Hub capability: an endpoint for LFIs to publish status events, a new webhook event, a capability flag, and registration of hand-off domains and encryption keys.',
  'There is no consent record for the submission. The User’s agreement rests on the TPP’s review screen and the evidence the TPP keeps, and the legal basis for sending the data needs review before issue.',
  'An encrypted payload cannot be validated by the API Hub. Schema errors in the applicant data surface at the LFI, and key publication and rotation have to be built.',
  'Shared data is attested, not proven. In Model 2 the Candidate LFI cannot confirm the TPP did not alter data retrieved from the Host LFI; source marking is the TPP’s declaration.',
  'The channel can be abused. Fraudulent or repeat applications are controlled by TPP authentication, API Hub rate limits and the LFI’s own checks, not by the protocol.',
]

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
// page (ofp-018.outcome.vue / ofp-018.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-018.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-018.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'Product Application Submission',
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

        <h1 class="ofp__title">Product Application Submission</h1>
        <p class="ofp__summary">
          A User who compares products through a TPP and picks one still has to leave the TPP and
          <strong>re-enter the same details</strong> on the LFI&rsquo;s own channel. This proposal adds,
          from <strong>V2.2</strong>, a way for the TPP to submit a <strong>User-confirmed
          application</strong> to the chosen LFI through the API Hub and track it to a decision. The LFI
          keeps full control of KYC, credit assessment and the outcome.
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
            each person may vote once. Use the comment box to tell us which parts of the design you would
            change &mdash; in particular the confirmation model, payload encryption and the status model.
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
          <h2 class="ofp-band__title">The journey stops at product selection</h2>
        </div>
        <div class="ofp-prose">
          <p>
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/products-leads/open-api/products"><code>GET /products</code></RouterLink>
            lets a TPP compare retail products from every LFI without a User consent.
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/products-leads/open-api/leads"><code>POST /leads</code></RouterLink>
            lets it refer a User to an LFI with a name, contact details and the product of interest. Neither
            carries an application. A User who wants to apply now must re-key their personal, employment and
            income details on the LFI&rsquo;s website or app, which adds friction and loses applicants.
          </p>
          <p>
            The closest precedent is
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/">Account Opening</RouterLink>
            in Service Initiation, where a TPP forwards an account opening request and User data from a
            Host LFI to a Candidate LFI and marks fields the User typed or edited. This proposal reuses its
            Host and Candidate roles and its source marking, and extends the pattern to banking products
            chosen through a comparison.
          </p>
          <p>
            Product Application Submission sits between the two existing journeys. If the User wants to be
            contacted, the TPP uses the Leads API. If the User wants to apply now, the TPP uses this journey.
            In both cases the LFI takes over for KYC and completion.
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
          <h2 class="ofp-band__title">One submission API, two ways to fill it</h2>
          <p class="ofp-band__lede">
            Both models end in the same <code>POST /product-applications</code> call. They differ only in
            where the application data comes from.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-table-wrap">
            <table class="ofp-table">
              <thead>
                <tr><th></th><th>Model 1 &middot; Direct submission</th><th>Model 2 &middot; Hybrid origination</th></tr>
              </thead>
              <tbody>
                <tr>
                  <th>Data source</th>
                  <td>Entered by the User in the TPP</td>
                  <td>Retrieved from the User&rsquo;s existing bank (the Host LFI), completed by the User where gaps remain</td>
                </tr>
                <tr>
                  <th>Consents</th>
                  <td>None. The User confirms on a TPP review screen</td>
                  <td>A standard data sharing consent with the Host LFI, created through PAR. Nothing about it changes</td>
                </tr>
                <tr>
                  <th>Source marking</th>
                  <td>Every cluster <code>UserEntered</code></td>
                  <td><code>DataSharing</code>, <code>UserAmended</code> or <code>UserEntered</code> per cluster</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Scope of the first release</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>In scope:</strong> retail individuals applying for a <code>CurrentAccount</code>,
                <code>SavingsAccount</code>, personal <code>Finance</code> or <code>CreditCard</code> product
                that the Candidate LFI publishes in <code>GET /products</code>.
              </li>
              <li>
                <strong>Out of scope:</strong> collecting or verifying KYC documents; credit decisioning,
                pricing and eligibility; commercial arrangements between TPPs and LFIs; mortgages, SME and
                corporate products, insurance, joint applications and applications on behalf of another
                person; funding the account or disbursing finance.
              </li>
            </ul>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">User confirmation</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>There is no consent for the submission.</strong> The User&rsquo;s agreement is shown
                by confirming the application on a review screen in the TPP. No consent record is created in
                the API Hub. The only consent in the journey is the Model 2 data sharing consent.
              </li>
              <li>
                <strong>The review screen MUST show,</strong> in English and Arabic: the TPP and Candidate
                LFI, with AlTareq branding; the product; every data item to be sent, with its value; where
                each item came from; that the purpose is to apply for that product and nothing else; what
                the LFI may do next; and that the User can withdraw.
              </li>
              <li>
                <strong>The TPP MUST NOT submit data the User has not seen and confirmed,</strong> and MUST
                NOT combine the confirmation with marketing consent or terms for other services.
              </li>
              <li>
                <strong>The TPP MUST keep evidence</strong> of what the User saw and confirmed, when, and how
                the User was authenticated, and MUST provide it to the LFI or Nebras on request.
              </li>
              <li>
                <strong>In Model 2, the data sharing consent is obtained separately,</strong> and its stated
                purpose MUST include preparing an application for the chosen product.
              </li>
            </ul>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Submission and processing</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The TPP builds the form from <code>GET /products</code>.</strong> There is no
                separate requirements endpoint; the LFI MUST publish any product information a TPP needs,
                such as amount and tenor ranges.
              </li>
              <li>
                <strong>The TPP MUST send only the fields that apply to the product category,</strong> and
                MUST NOT send KYC documents, document images or biometric data.
              </li>
              <li>
                <strong>Every submission carries <code>x-idempotency-key</code>.</strong> For a repeat of the
                same key within 24 hours, the LFI MUST return the original response and MUST NOT create a
                second application.
              </li>
              <li>
                <strong>The LFI MUST acknowledge synchronously</strong> with an
                <code>ApplicationReferenceId</code>, a timestamp and the status <code>Received</code>. The
                acknowledgement confirms receipt, not acceptance; assessment never happens in the
                synchronous call.
              </li>
              <li>
                <strong>The LFI MUST treat these applications like its own digital channels</strong> &mdash;
                same priority, terms, pricing and eligibility &mdash; MUST use the data only to process the
                application, MUST apply its normal fraud and risk checks, and MUST NOT silently substitute
                another product.
              </li>
              <li>
                <strong>The TPP MUST present the status the LFI reports</strong> and MUST NOT describe a
                submitted application as approved, pre-approved or guaranteed.
              </li>
            </ul>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Personal data</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The applicant payload is encrypted</strong> (JWE) to a key the Candidate LFI
                publishes. The API Hub validates the envelope only and forwards the payload unread.
              </li>
              <li>
                <strong>The Emirates ID number, date of birth and contact details MUST NOT appear</strong> in
                URLs, query strings, logs, analytics or error messages at any party. The API Hub logs
                metadata only.
              </li>
              <li>
                <strong>The TPP MUST delete the application data</strong> once it is no longer needed to show
                status and meet its record-keeping duties.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · LIFECYCLE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Lifecycle</div>
          <h2 class="ofp-band__title">Eight statuses, four of them final</h2>
          <p class="ofp-band__lede">
            Every status is set by the LFI. The TPP reads it through <code>GET</code> and is told of each
            change by webhook.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-table-wrap">
            <table class="ofp-table">
              <thead>
                <tr><th>Status</th><th>Meaning</th><th>Final</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in statuses" :key="s.code">
                  <td><code>{{ s.code }}</code></td>
                  <td>{{ s.meaning }}</td>
                  <td>{{ s.final }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Transition rules</div>
            <ul class="ofp-rules__list">
              <li><strong>A final status never changes.</strong></li>
              <li>
                <strong>Only <code>ActionRequired</code> returns an application to review.</strong> The LFI
                MAY move an application from <code>Approved</code> to <code>ActionRequired</code>, for
                example for offer acceptance, and products with no separate approval step MAY move from
                <code>UnderReview</code> straight to <code>Onboarded</code>.
              </li>
              <li>
                <strong><code>ActionRequired</code> carries an action type:</strong> <code>Documents</code>,
                <code>IdentityVerification</code>, <code>ESignature</code>, <code>WetSignature</code>,
                <code>BranchVisit</code>, <code>OfferAcceptance</code> or <code>Other</code>. Where the User
                must continue in the LFI&rsquo;s channel, the LFI MUST provide a single-use, time-limited
                <code>HandOffUrl</code> on a domain registered with the API Hub, which the TPP opens in the
                system browser. The TPP MUST NOT collect or relay KYC documents.
              </li>
              <li>
                <strong>An application left in <code>ActionRequired</code> past its expiry</strong> MUST move
                to <code>Expired</code> with reason <code>ActionNotCompleted</code>.
              </li>
              <li>
                <strong>On <code>Rejected</code> the LFI MAY return a reason code</strong> &mdash;
                <code>NotEligible</code>, <code>UnableToVerify</code>, <code>DuplicateApplication</code>,
                <code>ProductUnavailable</code> or <code>Other</code> &mdash; and MUST NOT return free text or
                personal data. Explaining the decision remains the LFI&rsquo;s job, in its own channel.
              </li>
              <li>
                <strong>The TPP MUST let the User withdraw</strong> an application that is not in a final
                status, and the LFI MUST set it to <code>Withdrawn</code>. Withdrawal does not oblige the LFI
                to delete records it must keep by law.
              </li>
              <li>
                <strong>Each status change MUST generate one webhook event,</strong> in order, and MUST be
                visible through <code>GET</code> before the event is sent.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         04 · TECHNICAL CHANGES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 04 &middot; Technical changes</div>
          <h2 class="ofp-band__title">What changes</h2>
          <p class="ofp-band__lede">
            Three TPP-facing endpoints, a webhook event, and API Hub support. Names and fields below are
            proposals and will be replaced by OpenAPI definitions once the design is agreed. They follow the
            casing of the existing Products and Leads APIs.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards specification &mdash; Product Application endpoints</div>
            <p>
              <code>POST /product-applications</code> submits an application and returns <code>201</code>
              with the acknowledgement. <code>GET /product-applications/{ApplicationReferenceId}</code>
              returns <code>Status</code>, <code>StatusUpdateDateTime</code> and, where relevant,
              <code>StatusReasonCode</code> and <code>NextAction</code>.
              <code>POST /product-applications/{ApplicationReferenceId}/withdrawal</code> withdraws a
              non-final application.
            </p>
            <p>
              As with <code>POST /leads</code>, the call is authorised by the TPP&rsquo;s own access token,
              not a User-authorised one: the User does not authenticate at the Candidate LFI and no consent
              is recorded. Every call carries <code>x-fapi-interaction-id</code>; the submission also
              carries <code>x-idempotency-key</code>. Targets <strong>V2.2</strong>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; Ozone Connect</div>
            <p>
              Matching operations on the Candidate LFI&rsquo;s Ozone Connect endpoints for submission,
              status and withdrawal. The API Hub forwards the envelope and the encrypted applicant payload,
              enriched with TPP information. Errors follow the LFI error model and are mapped to the TPP
              standard by the API Hub.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; API Hub</div>
            <p>
              Validate the TPP&rsquo;s token and the envelope on every submission, rejecting one that is not
              valid for the calling TPP, the Candidate LFI or the <code>ProductId</code>. Add an endpoint for
              LFIs to publish status changes. Register each LFI&rsquo;s hand-off domains and encryption keys,
              expose which LFIs support the journey so a TPP does not offer &ldquo;apply&rdquo; where it
              cannot be accepted, and apply rate limits.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; Webhooks &mdash; <code>uae-webhook-template-openapi.yaml</code></div>
            <p>
              Add the event <code>product-application.status-changed</code>, carrying only
              <code>ApplicationReferenceId</code>, <code>Status</code> and
              <code>StatusUpdateDateTime</code>. It carries no personal data; the TPP calls
              <code>GET</code> for details. Delivery is at least once, with retry for 24 hours.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">05 &middot; Products API</div>
            <p>
              No change to <code>GET /products</code> is proposed, but an LFI MUST publish there any product
              information a TPP needs to complete the application. Gaps found during drafting would be
              added to the product schema.
            </p>
          </div>
        </div>

        <div class="ofp-prose">
          <h3 class="ofp-subhead">Request envelope</h3>
          <p>Readable and validated by the API Hub.</p>
          <div class="ofp-table-wrap">
            <table class="ofp-table">
              <thead>
                <tr><th>Field</th><th>Type</th><th>Required</th><th>Notes</th></tr>
              </thead>
              <tbody>
                <tr v-for="f in envelope" :key="f.field">
                  <td><code>{{ f.field }}</code></td>
                  <td>{{ f.type }}</td>
                  <td>{{ f.req }}</td>
                  <td>{{ f.notes }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="ofp-subhead">Applicant payload</h3>
          <p>Encrypted to the Candidate LFI. The API Hub does not read it.</p>
          <div class="ofp-table-wrap">
            <table class="ofp-table">
              <thead>
                <tr><th>Group</th><th>Field</th><th>Required</th><th>Notes</th></tr>
              </thead>
              <tbody>
                <tr v-for="f in applicant" :key="f.field">
                  <td>{{ f.group }}</td>
                  <td><code>{{ f.field }}</code></td>
                  <td>{{ f.req }}</td>
                  <td>{{ f.notes }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="ofp-subhead">Errors added by this journey</h3>
          <div class="ofp-table-wrap">
            <table class="ofp-table">
              <thead>
                <tr><th>HTTP</th><th>Code</th><th>When</th><th>Returned by</th></tr>
              </thead>
              <tbody>
                <tr v-for="e in errors" :key="e.code">
                  <td>{{ e.http }}</td>
                  <td><code>{{ e.code }}</code></td>
                  <td>{{ e.when }}</td>
                  <td>{{ e.by }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Error messages MUST NOT echo applicant data.</p>

          <h3 class="ofp-subhead">Examples</h3>
          <div class="ofp-code">
            <div class="ofp-code__label">Model 2 submission &middot; applicant payload shown encrypted</div>
            <pre class="ofp-code__pre">{{ exampleRequest }}</pre>
          </div>
          <div class="ofp-code">
            <div class="ofp-code__label">GET status &middot; further action required</div>
            <pre class="ofp-code__pre">{{ exampleStatus }}</pre>
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
          <h2 class="ofp-band__title">What the journey buys</h2>
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
  font-size: 0.86em;
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

.ofp-subhead {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 2.25rem 0 0.6rem;
}

.ofp-subhead:first-child { margin-top: 0; }

/* ─── Tables (models, statuses, payload fields, errors) ─────────────────── */
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

/* ─── Rules recap (proposed rules, in Recommendation and Lifecycle) ─────── */
.ofp-rules {
  max-width: 52rem;
  margin: 0 0 24px;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-teal);
  background: var(--at-surface);
  padding: 20px 24px;
}

.ofp-rules:last-child { margin-bottom: 0; }

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
