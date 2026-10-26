<route lang="yaml">
meta:
  title: 'OFP-019 · TPP account preselection for Data Sharing'
</route>

<script setup lang="ts">
// Bespoke detail page for OFP-019. Hand-authored (not rendered from the
// proposals data array) so the content can be laid out in named sections —
// Background, Recommendation, Customer experience, Technical changes,
// Questions, Pros, and Cons. A shorter variant of the OFP-016 layout.
import { ref, computed, onMounted, watch, type Component } from 'vue'
import { useHead } from '@unhead/vue'
import { type Proposal, type Stance, type Status, type Priority, deriveStatus, PRIORITY } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvVotePanel from '@/components/proposals/PvVotePanel.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'
import PvProposalTabs from '@/components/proposals/PvProposalTabs.vue'
import DirhamAmount from '@/components/common/consent-ui/DirhamAmount.vue'

// Per-page link-preview override: a tailored title + description so a shared
// link to this proposal reads as the proposal itself, not the site default.
// (og:image is inherited from the branded site default in App.vue.) Later meta
// of the same property/name wins under Unhead's dedupe.
const OG_TITLE = 'OFP-019 · TPP account preselection for Data Sharing'
const OG_DESCRIPTION =
  'A TPP can name the debtor account for a payment, but cannot name the accounts it wants for Data Sharing. From V2.2, a TPP MAY pass an encrypted list of account identifiers in the Data Sharing consent, and the LFI shows only those accounts, preselected, on the authorisation page.'
useHead({
  title: OG_TITLE,
  meta: [
    { property: 'og:title', content: `${OG_TITLE} | UAE Open Finance` },
    { property: 'og:description', content: OG_DESCRIPTION },
    { name: 'twitter:description', content: OG_DESCRIPTION },
  ],
})

const meta = {
  id: 'OFP-019',
  proposedBy: 'Nebras',
  author: 'Thomas Catchpole',
  // Fallbacks shown until the API responds (and during the static build). The
  // live status/priority/dates are sourced from the API — see syncFromApi().
  opened: '22 Oct 2026',
  closes: '8 Nov 2026',
  priority: 'medium' as Priority,
  version: 'V2.2',
}

// The three questions asked alongside the vote. These are ALSO held in the
// proposals API (the `questions` column) — that is where the vote form reads
// them from, and where the answers are stored. Kept here so they are readable
// on the page before anyone opens the vote panel; the two MUST stay in step.
const questions = [
  {
    who: 'TPPs',
    q: 'Where would you use account preselection — for example re-connecting a User whose consent has expired, or a lending journey for one known card or mortgage — and which identifier schemes would you send?',
    why: 'This confirms the use cases, and tells us whether every scheme in the list is needed or whether IBAN and MaskedPAN cover most journeys.',
  },
  {
    who: 'LFIs',
    q: 'Can your authorisation journey match each scheme — IBAN, AccountNumber, MaskedPAN, MortgageReference and FinanceReference — against the User’s accounts and lock the list to the matches by V2.2? Is any scheme ambiguous for you, such as a masked PAN shared by two cards?',
    why: 'Preselection only works if every LFI can resolve the identifiers it receives. A scheme that cannot be matched reliably may need to be removed or tightened before the change is adopted.',
  },
  {
    who: 'TPPs and LFIs',
    q: 'Is locking the list right, or should the User be able to add or remove accounts at the LFI? Is it right that identifiers which match nothing are dropped silently?',
    why: 'Locking mirrors DebtorAccount for payments and keeps the result predictable for the TPP. Letting the User change the list gives them more control; the answers decide which way the standard goes.',
  },
]

const pros = [
  'Less friction. A User who has already chosen accounts in the TPP’s interface does not have to find and tick them again at the LFI.',
  'Fewer wrong selections. The TPP receives the accounts its service needs, rather than whatever the User happened to tick.',
  'It reuses what exists. The encrypted PII object, the identifier schemes and the locked-account pattern are already in the standard for payments and the accounts endpoint.',
  'It is optional. A TPP that does not send PersonalIdentifiableInformation gets today’s journey, unchanged.',
]

const cons = [
  'LFIs must build matching. Each LFI has to decrypt the PII, resolve every identifier scheme against the User’s accounts, and render a locked list.',
  'Less choice for the User. With the list locked, a User who wants to share a different account must go back to the TPP and start again.',
  'Silent drops can confuse. If an identifier does not match, the account simply does not appear; the TPP learns which accounts were shared only from GET /accounts afterwards.',
  'The TPP must already hold the identifiers, which in practice means an earlier consent or the User typing them in.',
]

// The proposed consent — rendered in the Recommendation section.
const parExample = `"authorization_details": [{
  "type": "urn:openfinanceuae:account-access-consent:v2.2",
  "consent": {
    "ConsentId": "b8f42378-10ce-4d8c-a1b4-91d1a3f6b2e1",
    "Permissions": [ "ReadAccountsDetail", "ReadBalances", "ReadTransactionsDetail" ],
    "ExpirationDateTime": "2027-04-22T00:00:00Z",
    "OpenFinanceBilling": { ... },
    "PersonalIdentifiableInformation": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0..."
  }
}]

# Decrypted PersonalIdentifiableInformation
{
  "Accounts": [
    { "SchemeName": "IBAN",      "Identification": "AE070331234567890123456" },
    { "SchemeName": "MaskedPAN", "Identification": "************1001" },
    { "SchemeName": "IBAN",      "Identification": "AE070331234567890123499" }
  ]
}`


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
// page (ofp-019.outcome.vue / ofp-019.feedback.vue) — excluded from routing in
// vite.config. Their presence drives the layout: an Outcome switches a closed
// proposal to the tabbed view; Feedback is appended under the vote panel. When
// neither exists the page renders exactly as before.
const outcomeMods = import.meta.glob('./ofp-019.outcome.vue', { eager: true }) as Record<string, { default: Component }>
const feedbackMods = import.meta.glob('./ofp-019.feedback.vue', { eager: true }) as Record<string, { default: Component }>
const OutcomePartial = Object.values(outcomeMods)[0]?.default ?? null
const FeedbackPartial = Object.values(feedbackMods)[0]?.default ?? null

// Tabs appear only once voting has closed AND an Outcome has been written.
const showTabs = computed(() => isClosed.value && !!OutcomePartial)

const proposal = computed<Proposal>(() => ({
  id: meta.id,
  title: 'TPP account preselection for Data Sharing',
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

        <h1 class="ofp__title">TPP account preselection for Data Sharing</h1>
        <p class="ofp__summary">
          A TPP can name the account a payment is made from, but cannot name the accounts it wants for
          Data Sharing. This proposal lets a TPP pass an encrypted list of <strong>account identifiers</strong>
          in the Data Sharing consent from <strong>V2.2</strong>. The LFI shows only those accounts,
          <strong>preselected and locked</strong>, on the authorisation page &mdash; the same pattern payments
          already use for <code>DebtorAccount</code>.
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
            set out in section 05 below. The first asks TPPs where they would use preselection; the second
            asks LFIs whether they can match every identifier scheme; the third asks both whether the list
            should be locked.
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
          <h2 class="ofp-band__title">Payments can name an account; Data Sharing cannot</h2>
        </div>
        <div class="ofp-prose">
          <p>
            A payment consent carries an encrypted <code>PersonalIdentifiableInformation</code> object. When
            the TPP includes
            <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/personal-identifiable-information/debtor-account"><code>Initiation.DebtorAccount</code></RouterLink>
            in it, the LFI shows that account as &ldquo;Account selected for the payment&rdquo; and the User
            cannot pick another. When the account does not match, the LFI shows an error and the User returns
            to the TPP.
          </p>
          <p>
            A Data Sharing consent has no equivalent. Its only account filters are <code>AccountType</code>
            and <code>AccountSubType</code>, so a TPP that already knows which accounts it needs &mdash; from
            an earlier consent, or because the User chose them in the TPP&rsquo;s own interface &mdash; can
            only send the User to the LFI to find and tick them again. If the User ticks the wrong accounts,
            the TPP finds out only after the consent is authorised.
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
          <h2 class="ofp-band__title">An encrypted list of accounts in the consent</h2>
          <p class="ofp-band__lede">
            Take the PII object from payments, keep only the account, call it <code>Accounts</code>, and
            make it a list.
          </p>
        </div>
        <div class="ofp-prose">
          <div class="ofp-code">
            <div class="ofp-code__label">Proposed &mdash; Data Sharing consent at <code>POST /par</code></div>
            <pre class="ofp-code__pre">{{ parExample }}</pre>
          </div>

          <div class="ofp-rules">
            <div class="ofp-rules__label">Proposed rules</div>
            <ul class="ofp-rules__list">
              <li>
                <strong>The TPP MAY include <code>PersonalIdentifiableInformation</code></strong> in a Data
                Sharing consent. It is signed and encrypted to the LFI&rsquo;s encryption key exactly as for
                payments, and decrypts to an object holding <code>Accounts</code>: an array of at least one
                <code>{ SchemeName, Identification }</code>.
              </li>
              <li>
                <strong><code>SchemeName</code> uses the schemes of the accounts endpoint:</strong>
                <code>IBAN</code>, <code>AccountNumber</code>, <code>MaskedPAN</code>,
                <code>MortgageReference</code> and <code>FinanceReference</code>
                (<code>AEExternalAccountIdentificationCode</code>). A TPP SHOULD send the identifier exactly as
                <code>GET /accounts</code> returned it.
              </li>
              <li>
                <strong>The LFI MUST lock the list.</strong> It MUST show only the User&rsquo;s accounts that
                match an entry in <code>Accounts</code>, preselected, and MUST NOT let the User select any
                other account. The User may authorise or cancel.
              </li>
              <li>
                <strong>Identifiers that match nothing are dropped.</strong> The LFI MUST NOT show or tell the
                TPP which entries failed to match. If <strong>no</strong> entry matches, the LFI MUST show that
                no matching accounts were found, and the User returns to the TPP with nothing shared.
              </li>
              <li>
                <strong>The existing filters still apply.</strong> An account that matches an entry but falls
                outside the consent&rsquo;s <code>AccountType</code> or <code>AccountSubType</code> is dropped.
              </li>
              <li>
                <strong>Without <code>PersonalIdentifiableInformation</code>, nothing changes.</strong> The User
                selects accounts at the LFI as today.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         03 · CUSTOMER EXPERIENCE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 03 &middot; Customer experience</div>
          <h2 class="ofp-band__title">What the User sees at the LFI</h2>
          <p class="ofp-band__lede">
            The User holds a current account, a savings account, a credit card and a mortgage. The TPP
            preselects the current account (by IBAN), the credit card (by masked PAN) and an IBAN the User
            does not hold. The LFI shows the two matches, locked, with no checkboxes; the third entry is
            dropped without comment.
          </p>
        </div>
        <!-- One fixed, non-editable example of the LFI authorisation page with
             preselected accounts. Static markup styled by the shared
             authorisation-page stylesheet; it reads no shared state. -->
        <div class="ofp-cx">
        <div class="auth-page-frame">
        <div class="auth-page-header">
            <div class="auth-page-screen-name">
                <div class="auth-page-tpp-text">
                    LFI
                </div>

                <svg class="auth-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" />
                </svg>
                <div class="auth-page-rectangle">
                </div>

            </div>
            <div class="auth-page-contents">
                <img class="auth-page-logo"
                    src="/images/journeys/ConsentPages/AlTareq.png"
                    alt="AlTareq logo" />
                <div class="auth-page-progress">
                    <div class="auth-page-progress-1">
                        <div class="auth-page-progress-icon-active">
                            <svg class="auth-page-progress-icon-text-active" width="10" height="8" viewBox="0 0 10 8"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z"
                                    fill="white" />
                            </svg>

                        </div>
                        <div class="auth-page-progress-text">
                            Consent
                        </div>

                    </div>
                    <div class="auth-page-progress-2">
                        <div class="auth-page-progress-icon-active">
                            <div class="auth-page-progress-icon-text-active">
                                2
                            </div>
                        </div>
                        <div class="auth-page-progress-text">
                            Authorize
                        </div>
                    </div>
                    <div class="auth-page-progress-3">
                        <div class="auth-page-progress-icon">
                            <div class="auth-page-progress-icon-text">
                                3
                            </div>
                        </div>
                        <div class="auth-page-progress-text">
                            Complete
                        </div>
                    </div>
                    <svg class="auth-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" />
                        <path d="M0.5 1H168" stroke="#00C8AF" stroke-width="2" />
                    </svg>

                </div>
            </div>
        </div>
          <div class="auth-page-text-frame">
            <div class="auth-page-text-inner-frame">
              <div class="auth-page-text-header">
                Account(s) selected to share information with AlTareq
              </div>
              <div class="auth-page-accounts-section">
              <div class="auth-page-account-card">
                <div class="auth-page-account-title">
                  <div class="auth-page-account-title-text">Current Account</div>
                </div>
                <div class="auth-page-account-subtext-container">
                  <div class="auth-page-account-subtext-container-2">
                    <div class="auth-page-account-subtext">AE07 0331 2345 6789 0123 456</div>
                  </div>
                  <div class="auth-page-account-subtext-container-2">
                    <div class="auth-page-account-subtext-part">Balance</div>
                    <div class="auth-page-account-amount-container">
                      <DirhamAmount amount="5,000" />
                    </div>
                  </div>
                  <div class="auth-page-account-subtext-container-2">
                    <div class="auth-page-account-subtext-part">Overdraft</div>
                    <div class="auth-page-account-amount-container">
                      <DirhamAmount amount="1,500" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="auth-page-account-card">
                <div class="auth-page-account-title">
                  <div class="auth-page-account-title-text">Credit Card | Cashback Card</div>
                </div>
                <div class="auth-page-account-subtext-container">
                  <div class="auth-page-account-subtext-container-2">
                    <div class="auth-page-account-subtext">**** **** **** 1001</div>
                  </div>
                  <div class="auth-page-account-subtext-container-2">
                    <div class="auth-page-account-subtext-part">Outstanding</div>
                    <div class="auth-page-account-amount-container">
                      <DirhamAmount amount="2,400" />
                    </div>
                  </div>
                  <div class="auth-page-account-subtext-container-2">
                    <div class="auth-page-account-subtext-part">Available</div>
                    <div class="auth-page-account-amount-container">
                      <DirhamAmount amount="7,600" />
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div class="auth-page-text-inner-frame-2">
                <div class="auth-page-text-mini-header-section">
                  <div class="auth-page-text-mini-header-section-header">
                    <div class="auth-page-text-min-header-section-header-text">
                      Review the information you will share
                    </div>
                    <svg class="auth-page-mini-header-icon is-open" width="15"
                      height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z"
                        fill="#36BFD4" />
                    </svg>
                  </div>
                </div>
                <!-- Expanded for the example: one group per permission in the
                     consent (ReadAccountsDetail, ReadBalances, ReadTransactionsDetail),
                     worded as in AuthorizationBankDataSharing.vue. -->
                <div class="auth-page-text-section">
                  <div class="auth-page-dropdown-container">
                    <div class="auth-page-dropdown">
                      <div class="auth-page-dropdown-text-section">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z"
                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                          <path
                            d="M15.4426 16.5C15.4426 13.5975 12.5551 11.25 9.00011 11.25C5.44511 11.25 2.55762 13.5975 2.55762 16.5"
                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="auth-page-dropdown-text">Your Account Details</div>
                      </div>
                      <svg class="auth-page-dropdown-arrow is-open" width="5" height="10" viewBox="0 0 5 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                          fill="black" fill-opacity="0.4" />
                      </svg>
                    </div>
                    <div class="auth-page-dropdown-subtext-section">
                      <div class="auth-page-dropdown-subtext">
                        <div>
                          Full account information (account number/ID, type and description of account, currency,
                          nickname you gave it, and account holder name, opening date)
                        </div>
                        <div>
                          Your current account balances (available balance, booked balance, credit limit/
                          overdraft if any, and when the balance was last updated)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="auth-page-dropdown-container">
                    <div class="auth-page-dropdown">
                      <div class="auth-page-dropdown-text-section">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.75 6.75H5.25" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                          <path
                            d="M16.5 8.22749V9.77254C16.5 10.185 16.17 10.5225 15.75 10.5375H14.28C13.47 10.5375 12.7275 9.94501 12.66 9.13501C12.615 8.66251 12.795 8.22001 13.11 7.91251C13.3875 7.62751 13.77 7.46252 14.19 7.46252H15.75C16.17 7.47752 16.5 7.81499 16.5 8.22749Z"
                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                          <path
                            d="M13.11 7.91249C12.795 8.21999 12.615 8.66249 12.66 9.13499C12.7275 9.94499 13.47 10.5375 14.28 10.5375H15.75V11.625C15.75 13.875 14.25 15.375 12 15.375H5.25C3 15.375 1.5 13.875 1.5 11.625V6.375C1.5 4.335 2.73 2.91 4.6425 2.67C4.8375 2.64 5.04 2.625 5.25 2.625H12C12.195 2.625 12.3825 2.63249 12.5625 2.66249C14.4975 2.88749 15.75 4.32 15.75 6.375V7.46251H14.19C13.77 7.46251 13.3875 7.62749 13.11 7.91249Z"
                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="auth-page-dropdown-text">Your Account Transactions</div>
                      </div>
                      <svg class="auth-page-dropdown-arrow is-open" width="5" height="10" viewBox="0 0 5 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                          fill="black" fill-opacity="0.4" />
                      </svg>
                    </div>
                    <div class="auth-page-dropdown-subtext-section">
                      <div class="auth-page-dropdown-subtext">
                        Full transactions information (date/time, amount, type, description/narrative,
                        payee/merchant name and details, category, status, reference, currency exchange if
                        applicable)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="auth-page-date-range">
              <svg class="auth-page-divider" width="292" height="2" viewBox="0 0 292 2" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="292" height="2" fill="#D9D9D9" fill-opacity="0.1" />
              </svg>
              <div class="auth-page-dropdown">
                <div class="auth-page-date">
                  <div class="auth-page-date-text">We will share your data until</div>
                  <div class="auth-page-date-2">
                    <div class="auth-page-date-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33301 1.33203V3.33203" stroke="#0C1441" stroke-miterlimit="10"
                          stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.667 1.33203V3.33203" stroke="#0C1441" stroke-miterlimit="10"
                          stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.33301 6.05859H13.6663" stroke="#0C1441" stroke-miterlimit="10"
                          stroke-linecap="round" stroke-linejoin="round" />
                        <path
                          d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z"
                          stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.4635 9.13411H10.4694" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.4635 11.1341H10.4694" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.99666 9.13411H8.00265" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.99666 11.1341H8.00265" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.52987 9.13411H5.53585" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.52987 11.1341H5.53585" stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="auth-page-date-text">22/04/2027, 4:00 am</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div class="auth-page-button-with-description">
            <div class="auth-page-button">
                <div class="auth-page-button-text-section">
                    <svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z"
                            fill="white" />
                        <path
                            d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z"
                            fill="url(#paint0_linear_2_496)" />
                        <path
                            d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z"
                            fill="url(#paint1_linear_2_496)" />
                        <path
                            d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z"
                            fill="url(#paint2_linear_2_496)" />
                        <path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z"
                            fill="url(#paint3_radial_2_496)" />
                        <defs>
                            <linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4083E1" />
                                <stop offset="0.08" stop-color="#3E8BDD" />
                                <stop offset="0.48" stop-color="#36B1CC" />
                                <stop offset="0.8" stop-color="#31C9C1" />
                                <stop offset="1" stop-color="#30D2BE" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#80ACEB" />
                                <stop offset="0.3" stop-color="#7BC0E1" />
                                <stop offset="0.73" stop-color="#76D8D7" />
                                <stop offset="1" stop-color="#75E1D4" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#BFD6F5" />
                                <stop offset="0.55" stop-color="#BBE7ED" />
                                <stop offset="1" stop-color="#BAF0E9" />
                            </linearGradient>
                            <radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1"
                                gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#40E0C7" />
                                <stop offset="0.304248" stop-color="#0050C8" />
                                <stop offset="0.623256" stop-color="white" />
                            </radialGradient>
                        </defs>
                    </svg>

                    <div class="auth-page-button-text">
                        Authorize using AlTareq
                    </div>
                </div>
            </div>
            <div class="auth-page-button-cancel">
                <div class="auth-page-button-cancel-text">
                    Cancel
                </div>
            </div>
        </div>
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
            One optional property on the Data Sharing consent, and a locked account list at the LFI.
          </p>
        </div>

        <div class="ofp-changes">
          <div class="ofp-change">
            <div class="ofp-change__label">01 &middot; Standards specification &mdash; <code>uae-authorization-endpoints-openapi.yaml</code></div>
            <p>
              Add an optional <code>PersonalIdentifiableInformation</code> (a JWE string) to the
              <code>consent</code> of the <code>urn:openfinanceuae:account-access-consent:v2.2</code>
              authorisation details, and define the decrypted <code>AEBankDataSharingPII</code> schema with a
              required <code>Accounts</code> array (<code>minItems: 1</code>) of
              <code>SchemeName</code> and <code>Identification</code>. Targets <strong>V2.2</strong>.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">02 &middot; API Hub</div>
            <p>
              Store the encrypted <code>PersonalIdentifiableInformation</code> with the consent and make it
              available to the LFI during the authorisation journey, as for payment consents. The Hub does
              not decrypt it. The accounts the User authorises are recorded on the consent as today.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">03 &middot; LFI</div>
            <p>
              Decrypt the PII, match each entry against the User&rsquo;s accounts, and render the locked list
              (or the no-matching-accounts state) on the authorisation page.
            </p>
          </div>

          <div class="ofp-change">
            <div class="ofp-change__label">04 &middot; Documentation</div>
            <p>
              Add a preselection section to the TPP and LFI Data Sharing
              <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/data-sharing/user-journeys">user journeys</RouterLink>,
              a PII page alongside the payments one, and a V2.2 changelog entry.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         05 · QUESTIONS ATTACHED TO THIS VOTE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--cream">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 05 &middot; Questions</div>
          <h2 class="ofp-band__title">Three questions, asked with the vote</h2>
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
         06 · PROS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ofp-band ofp-band--white">
      <div class="ofp-band__inner">
        <div class="ofp-band__head">
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 06 &middot; Pros</div>
          <h2 class="ofp-band__title">What preselection buys</h2>
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
          <div class="ofp-band__eyebrow"><span class="ofp-band__eyebrow-dash" /> 07 &middot; Cons</div>
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

<style scoped>
@import '../../components/common/authorization-ui/authorization-page.css';

/* The LFI authorisation page in the Customer experience section — one fixed,
   non-editable example, sized like the wireframe panels elsewhere. */
.ofp-cx {
  max-width: 420px;
  margin: 0 auto;
}

/* The example is static: nothing in it is clickable. */
.ofp-cx .auth-page-account-card,
.ofp-cx .auth-page-dropdown,
.ofp-cx .auth-page-text-mini-header-section-header,
.ofp-cx .auth-page-button,
.ofp-cx .auth-page-button-cancel {
  cursor: default;
}
</style>
