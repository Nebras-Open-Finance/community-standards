<script setup lang="ts">
// Outcome of Proposal — OFP-018. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed. Co-located with ofp-018.vue, which
// glob-imports './ofp-018.outcome.vue' and switches to the tabbed view when it
// exists — no change to the parent page is needed. This is a decision RECORD:
// the verdict, the rationale, and the resulting change are authored here; the
// numeric tally is pulled LIVE from the proposals API so the headline metrics
// always match the "Votes Received & Feedback" tab.
//
// OFP-018 was approved for V2.2 as an OPTIONAL capability for LFIs to deliver.
// The endpoint and field names below are those in the proposal; they will be
// confirmed by the V2.2 OpenAPI definitions.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-018',
  ref: 'DR-2026-018',
  // 'optional' = added to the spec, optional for delivery (as OFP-020).
  verdict: 'optional' as 'approved' | 'optional' | 'rejected',
  ratified: false,
  title: 'Product Application Submission',
  category: 'Products & Leads · Origination',
  decisionDate: '9 Nov 2026',
  // A label (or date) for when the decision takes effect; '' to omit the pill.
  effective: 'V2.2 · optional for LFIs',
  proposedBy: 'Nebras',
  summary:
    'Added to the spec, optional for delivery. Voting closed with 3 votes in favour, 9 against and 1 abstaining, so the proposal did not pass as drafted. Product Application Submission will still be added to V2.2, with support optional for every LFI: a TPP may submit a User-confirmed application for a retail current account, savings account, personal finance or credit card product to an LFI that offers the journey, and track it to a decision. Each LFI decides whether to offer it, and keeps full control of KYC, credit assessment and the outcome. The specification, Ozone Connect, API Hub and webhook changes proceed as proposed, so the journey is fully defined in V2.2 for any LFI that chooses to deliver it.',
}

// ── Live tally (from the proposals API, via useProposals) ────────────────────
const counts = computed(() => tallyOf(record.id).counts)
const pct = computed(() =>
  counts.value.total ? Math.round((counts.value.for / counts.value.total) * 100) : 0,
)
const turnout = computed(() =>
  voterTotal ? Math.round((counts.value.total / voterTotal) * 100) : 0,
)

// 'optional' reads as a positive outcome (teal seal, check) with its own label.
const approved = computed(() => record.verdict !== 'rejected')
const verdictLabel = computed(() =>
  record.verdict === 'optional' ? 'Optional' : record.verdict === 'approved' ? 'Approved' : 'Rejected',
)
const verdictTagline = computed(() =>
  record.verdict === 'optional' ? 'Added to the spec, optional for delivery' : '',
)

// Seal colours flip with the verdict.
const seal = computed(() => (approved.value ? 'var(--at-teal-deep, #008B78)' : '#A6391F'))
const sealTint = computed(() =>
  approved.value ? 'rgba(0, 194, 169, 0.12)' : 'rgba(166, 57, 31, 0.08)',
)
</script>

<template>
  <section class="po" :style="{ '--seal': seal, '--seal-tint': sealTint }">
    <div class="po__inner">
      <!-- ── Decision sheet ──────────────────────────────────────────────── -->
      <div class="po-sheet">
        <div class="po-sheet__head">
          <div class="po-eyebrow">
            <span class="po-eyebrow__k">Decision record · {{ record.ref }}</span>
            <span class="po-eyebrow__dot" />
            <span class="po-eyebrow__k">{{ record.category }}</span>
            <span class="po-eyebrow__dot" />
            <span class="po-eyebrow__k">Voting closed {{ record.decisionDate }}</span>
          </div>

          <div class="po-verdict">
            <div class="po-seal" :class="{ 'po-seal--approved': approved }">
              <span class="po-seal__glyph">{{ approved ? '✓' : '✕' }}</span>
            </div>
            <div class="po-verdict__text">
              <div class="po-verdict__label">
                {{ verdictLabel }}
                <span v-if="record.verdict === 'approved' && record.ratified" class="po-verdict__chip">Ratified</span>
              </div>
              <div v-if="verdictTagline" class="po-verdict__tagline">{{ verdictTagline }}</div>
              <div class="po-verdict__sub">
                {{ pct }}% in favour · {{ counts.for }}–{{ counts.against }}–{{ counts.abstain }}
              </div>
            </div>
          </div>

          <div class="po-sheet__title">
            <span class="po-pid">{{ record.id }}</span>
            <h2>{{ record.title }}</h2>
          </div>
        </div>

        <!-- headline metrics strip -->
        <div class="po-metrics">
          <div class="po-metrics__cell po-metrics__cell--hl">
            <div class="po-metrics__bar" />
            <div class="po-badge">
              <span class="po-badge__g">{{ approved ? '✓' : '✕' }}</span>
              <span class="po-badge__w">{{ verdictLabel }}</span>
            </div>
            <div class="po-metrics__cap">Final decision</div>
          </div>
          <div class="po-metrics__cell">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">{{ pct }}%</div>
            <div class="po-metrics__cap">In favour</div>
          </div>
          <div class="po-metrics__cell">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">
              {{ counts.total }}<span class="po-metrics__denom">/{{ voterTotal }}</span>
            </div>
            <div class="po-metrics__cap">Total votes</div>
          </div>
          <div class="po-metrics__cell">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">{{ turnout }}%</div>
            <div class="po-metrics__cap">Participation</div>
          </div>
        </div>
      </div>

      <!-- ── Body: summary + the resulting change ──────────────────────────── -->
      <div class="po-body">
        <div>
          <div class="po-seclabel">§ Decision summary</div>
          <p class="po-summary">{{ record.summary }}</p>

          <div class="po-detail">
            <p>
              The approved change adds <strong>one submission API with two ways to fill it</strong>. In
              direct submission the User enters the application data in the TPP; in hybrid origination it
              is retrieved from the User’s existing bank (the Host LFI) under a standard data sharing
              consent, and completed by the User where gaps remain. Both end in the same
              <code>POST /product-applications</code> call, and each data cluster is marked
              <code>UserEntered</code>, <code>DataSharing</code> or <code>UserAmended</code> so the Candidate
              LFI knows where it came from.
            </p>
            <p>
              <strong>Delivery is optional for LFIs.</strong> No LFI is obliged to offer the journey, so a TPP
              cannot assume it is available at any given LFI. An LFI that does not offer it has nothing to
              build. Where an LFI does, the requirements in the proposal apply in full — synchronous acknowledgement,
              idempotency, the eight-status lifecycle, a webhook on every status change, hand-off links on
              registered domains, and the personal data rules. Because support will vary, the API Hub’s
              indication of which LFIs support the journey is what stops a TPP offering “apply” where an
              application cannot be accepted. The Leads API remains the route to LFIs that do not offer it.
            </p>
            <p>
              <strong>There is no consent for the submission.</strong> The User’s agreement is a confirmation
              on the TPP’s review screen, evidenced by the TPP. The only consent in the journey is the hybrid
              origination data sharing consent with the Host LFI, which is unchanged. The applicant payload
              is encrypted to the Candidate LFI; the API Hub validates the envelope and forwards the payload
              unread.
            </p>
            <p>
              The first release is limited to retail individuals. KYC document collection, credit
              decisioning, pricing and eligibility, commercial arrangements between TPPs and LFIs, mortgages,
              SME and corporate products, insurance, joint applications, and funding or disbursement all
              remain out of scope.
            </p>
          </div>

          <!-- Handover / rollout note -->
          <div class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              The proposal is now <strong>handed over for specification and implementation in V2.2</strong>.
              The endpoint and field names in the proposal will be confirmed by the
              <strong>V2.2 OpenAPI definitions</strong>, and delivery timings will be communicated through the
              relevant <strong>release notes</strong> — this page will not be updated with a schedule. No
              action is required from LFIs or TPPs in the meantime, and offering the journey remains each
              LFI’s choice.
            </p>
          </div>

          <!-- The resulting change -->
          <div class="po-spec">
            <h3 class="po-h">
              The change
              <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
            </h3>
            <p class="po-spec__lede">
              Three TPP-facing endpoints, one webhook event, matching
              <RouterLink to="/tech/lfi-api-hub/">Ozone Connect</RouterLink> operations and API Hub support. It
              builds on what exists: product selection uses
              <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/products-leads/open-api/products"><code>GET /products</code></RouterLink>,
              hybrid origination uses unchanged data sharing consents, and status reuses the Webhooks service.
            </p>
            <div class="po-rules">
              <div class="po-rules__label">Added in V2.2 · optional for LFIs to deliver</div>
              <ul class="po-rules__list">
                <li>
                  <strong>Product Application endpoints</strong> —
                  <code>POST /product-applications</code> returns <code>201</code> with an
                  <code>ApplicationReferenceId</code>, a timestamp and the status <code>Received</code>;
                  <code>GET /product-applications/{ApplicationReferenceId}</code> returns the status and, where
                  relevant, <code>StatusReasonCode</code> and <code>NextAction</code>;
                  <code>POST /product-applications/{ApplicationReferenceId}/withdrawal</code> withdraws a
                  non-final application. Authorised by the TPP’s own access token, as with
                  <code>POST /leads</code>.
                </li>
                <li>
                  <strong>Headers and idempotency</strong> — every call carries
                  <code>x-fapi-interaction-id</code>; the submission also carries
                  <code>x-idempotency-key</code>, and a repeat of the same key within 24 hours returns the
                  original response without creating a second application.
                </li>
                <li>
                  <strong>Request envelope</strong> — <code>ProductId</code>, <code>ProductCategory</code>
                  (<code>CurrentAccount</code>, <code>SavingsAccount</code>, <code>Finance</code> or
                  <code>CreditCard</code>), <code>DataClusters</code> and <code>Provenance</code>, with optional
                  <code>TppApplicationReference</code> and <code>Channel</code>. Readable and validated by the
                  API Hub.
                </li>
                <li>
                  <strong>Applicant payload</strong> — <code>ApplicantPayload</code> as a JWE encrypted to a key
                  the Candidate LFI publishes, carrying applicant core, contact, employment and financial, and
                  product request fields, and the <code>UserConfirmedAccuracy</code> declaration. No KYC
                  documents, document images or biometric data.
                </li>
                <li>
                  <strong>Lifecycle</strong> — eight statuses, all set by the LFI: <code>Received</code>,
                  <code>UnderReview</code>, <code>ActionRequired</code>, <code>Approved</code>, and the final
                  <code>Onboarded</code>, <code>Rejected</code>, <code>Withdrawn</code> and
                  <code>Expired</code>. <code>ActionRequired</code> carries an action type and, where the User
                  continues in the LFI’s channel, a single-use, time-limited <code>HandOffUrl</code> on a
                  registered domain.
                </li>
                <li>
                  <strong>Webhook event</strong> — <code>product-application.status-changed</code> in
                  <code>uae-webhook-template-openapi.yaml</code>, carrying only
                  <code>ApplicationReferenceId</code>, <code>Status</code> and
                  <code>StatusUpdateDateTime</code>. Delivered at least once, with retry for 24 hours.
                </li>
                <li>
                  <strong>Ozone Connect and API Hub</strong> — matching operations for submission, status and
                  withdrawal on the Candidate LFI’s Ozone Connect endpoints; envelope and token validation, an
                  endpoint for LFIs to publish status changes, registration of hand-off domains and encryption
                  keys, an indication of which LFIs support the journey, and rate limits.
                </li>
                <li>
                  <strong>Errors</strong> — <code>InvalidRequest</code>, <code>ProductNotFound</code>,
                  <code>ApplicationNotFound</code>, <code>IdempotencyConflict</code>,
                  <code>DuplicateApplication</code>, <code>ApplicationInFinalStatus</code>,
                  <code>ProductNotAvailable</code> and <code>RequirementsNotMet</code>. Error messages must not
                  echo applicant data.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.po {
  background: var(--at-bg-cream);
  padding: 3.5rem 0 4rem;
  border-top: 1px solid var(--at-grid-line);
}
.po__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 0 2rem; }

/* ── Decision sheet ───────────────────────────────────────────────────────── */
.po-sheet {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 5px solid var(--seal);
}
.po-sheet__head { padding: 36px 40px 30px; border-bottom: 1px solid var(--at-grid-line); }

.po-eyebrow { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 28px; }
.po-eyebrow__k {
  font-family: var(--at-mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.55;
}
.po-eyebrow__dot { width: 1px; height: 12px; background: var(--at-grid-line); }

.po-verdict { display: flex; align-items: center; gap: 26px; flex-wrap: wrap; }
.po-seal {
  width: 92px;
  height: 92px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 3px solid var(--seal);
  background: var(--seal-tint);
  display: flex;
  align-items: center;
  justify-content: center;
}
.po-seal__glyph { font-size: 32px; line-height: 1; color: var(--seal); font-weight: 700; }
.po-seal--approved {
  background: var(--seal);
  border: none;
  box-shadow: 0 0 0 3px var(--at-surface), 0 0 0 6px var(--seal);
}
.po-seal--approved .po-seal__glyph { color: #fff; }

.po-verdict__label {
  font-family: var(--at-serif);
  font-size: 54px;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 0.95;
  color: var(--at-navy-deep);
  display: inline-flex;
  align-items: center;
  gap: 16px;
}
.po-verdict__chip {
  font-family: var(--at-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #fff;
  background: var(--seal);
  padding: 6px 12px;
}
.po-verdict__tagline {
  font-family: var(--at-serif);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--seal);
  margin-top: 10px;
}
.po-verdict__sub {
  font-family: var(--at-mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  margin-top: 15px;
}

.po-sheet__title { margin-top: 28px; }
.po-pid {
  font-family: var(--at-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--seal);
}
.po-sheet__title h2 {
  font-family: var(--at-serif);
  font-size: 33px;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.12;
  margin: 12px 0 0;
  color: var(--at-navy-deep);
  max-width: 760px;
  text-wrap: balance;
}

.po-metrics { display: grid; grid-template-columns: repeat(4, 1fr); }
.po-metrics__cell { padding: 22px 26px; border-right: 1px solid var(--at-grid-line); position: relative; }
.po-metrics__cell:last-child { border-right: none; }
.po-metrics__bar { position: absolute; top: 0; left: 0; height: 3px; width: 30px; background: var(--at-navy); }
.po-metrics__cell--hl .po-metrics__bar { background: var(--seal); }
.po-metrics__num {
  font-family: var(--at-serif);
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--at-navy-deep);
}
.po-metrics__denom { font-size: 18px; opacity: 0.45; }
.po-badge { display: inline-flex; align-items: center; gap: 9px; padding: 9px 16px 9px 12px; background: var(--seal); }
.po-badge__g {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}
.po-badge__w {
  font-family: var(--at-serif);
  font-size: 23px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #fff;
}
.po-metrics__cap {
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  margin-top: 11px;
}

/* ── Body ─────────────────────────────────────────────────────────────────── */
.po-body { margin-top: 44px; }
.po-seclabel {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--seal);
  margin-bottom: 16px;
}
.po-summary {
  font-family: var(--at-serif);
  font-size: 22px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  margin: 0;
  text-wrap: pretty;
}

.po-detail { max-width: 52rem; margin-top: 28px; }
.po-detail p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--at-navy);
  margin: 0 0 18px;
  text-wrap: pretty;
}
.po-detail p:last-child { margin-bottom: 0; }
.po-detail strong { color: var(--at-navy-deep); font-weight: 600; }
.po-detail code,
.po-note__p code,
.po-spec__lede code,
.po-rules__list code {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 1px 5px;
  color: var(--at-navy-deep);
}

.po-h {
  font-family: var(--at-serif);
  font-size: 25px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 20px;
}

.po-next__eff {
  font-family: var(--at-mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--seal);
  padding: 4px 10px;
  background: var(--seal-tint);
  margin-left: 12px;
  vertical-align: middle;
}

.po-note {
  margin-top: 32px;
  max-width: 52rem;
  border-left: 4px solid var(--seal);
  background: var(--seal-tint);
  padding: 18px 22px;
}
.po-note__k {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--seal);
  margin-bottom: 9px;
}
.po-note__p {
  font-size: 15px;
  line-height: 1.62;
  color: var(--at-navy-deep);
  margin: 0;
  text-wrap: pretty;
}
.po-note__p strong { font-weight: 600; }

.po-spec { margin-top: 44px; }
.po-spec__lede {
  font-size: 15.5px;
  line-height: 1.68;
  color: var(--at-navy);
  max-width: 52rem;
  margin: 0 0 20px;
  text-wrap: pretty;
}
.po-spec__lede a { color: var(--at-teal-deep, #008b78); text-decoration: none; border-bottom: 1px solid currentColor; }
.po-spec__lede a:hover { color: var(--at-navy-deep); }

.po-rules {
  max-width: 52rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--seal);
  background: var(--at-surface);
  padding: 20px 24px;
}
.po-rules--muted {
  margin-top: 20px;
  border-top-color: var(--at-grid-line);
  background: transparent;
}
.po-rules--muted .po-rules__label { color: var(--at-navy); opacity: 0.7; }
.po-rules--muted .po-rules__list li::before { background: var(--at-navy); opacity: 0.35; }
.po-rules__label {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--seal);
  margin-bottom: 12px;
}
.po-rules__list { list-style: none; margin: 0; padding: 0; }
.po-rules__list li {
  position: relative;
  padding-left: 1.2rem;
  font-size: 15.5px;
  line-height: 1.68;
  color: var(--at-navy);
  margin-bottom: 10px;
}
.po-rules__list li:last-child { margin-bottom: 0; }
.po-rules__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 7px;
  height: 7px;
  background: var(--seal);
}
.po-rules__list strong { color: var(--at-navy-deep); font-weight: 600; }

@media (max-width: 920px) {
  .po { padding: 2.5rem 0 3rem; }
  .po__inner { padding: 0 1.25rem; }
  .po-sheet__head { padding: 26px 22px 24px; }
  .po-metrics { grid-template-columns: repeat(2, 1fr); }
  .po-metrics__cell:nth-child(2) { border-right: none; }
  .po-verdict__label { font-size: 42px; }
}
</style>
