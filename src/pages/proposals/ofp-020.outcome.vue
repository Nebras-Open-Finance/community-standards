<script setup lang="ts">
// Outcome of Proposal — OFP-020. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed; picked up by ofp-020.vue via
// import.meta.glob('./ofp-020.outcome.vue'). This is a decision RECORD: the
// verdict, the rationale, and the resulting change are authored here; the
// numeric tally is pulled LIVE from the proposals API so the headline metrics
// always match the "Votes Received & Feedback" tab.
//
// Closed 9 Nov 2026 at 3 for / 5 against / 1 abstain (9 of 24; 33% in favour).
// Decision: Bulk/Batch Payments are added to V2.2 on the OFP-001 JSON array
// model, with support OPTIONAL for every LFI. The proposed MUST for SME and
// Corporate accounts was not adopted. Ratification is not yet recorded, so the
// "Ratified" chip is gated on `record.ratified` and stays hidden until it is.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-020',
  ref: 'DR-2026-020',
  verdict: 'approved' as 'approved' | 'rejected',
  // Headline wording for the decision (replaces the generic Approved/Rejected text).
  label: 'Optional',
  // One line shown under the verdict label.
  headline: 'Added to the spec, optional for delivery',
  qualifier: '',
  badge: 'Optional',
  // Set true only once ratification is confirmed in the project records.
  ratified: false,
  title: 'Introduce Bulk/Batch Payments in V2.2',
  category: 'Service Initiation · Bulk/Batch Payments',
  decisionDate: '9 Nov 2026',
  // A label (or date) for when the decision takes effect; '' to omit the pill.
  effective: 'V2.2',
  proposedBy: 'Nebras',
  summary:
    'Added to the spec, optional for delivery. Voting closed with 3 votes in favour, 5 against and 1 abstaining, so the proposal did not pass as drafted: the requirement that LFIs MUST support Bulk/Batch for SME and Corporate accounts has not been adopted. Bulk/Batch Payments will still be added to V2.2 on the JSON array model agreed in OFP-001, with support optional for every LFI. Each LFI decides whether to offer Bulk/Batch Payments. The specification, API Hub, and documentation changes proceed as proposed, so the capability is fully defined in V2.2 for any LFI that chooses to deliver it.',
}

// ── Live tally (from the proposals API, via useProposals) ────────────────────
const counts = computed(() => tallyOf(record.id).counts)
const pct = computed(() =>
  counts.value.total ? Math.round((counts.value.for / counts.value.total) * 100) : 0,
)
const turnout = computed(() =>
  voterTotal ? Math.round((counts.value.total / voterTotal) * 100) : 0,
)

const approved = computed(() => record.verdict === 'approved')

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
                {{ record.label }}
                <span v-if="approved && record.ratified" class="po-verdict__chip">Ratified</span>
                <span v-if="record.qualifier" class="po-verdict__chip po-verdict__chip--outline">{{ record.qualifier }}</span>
              </div>
              <div v-if="record.headline" class="po-verdict__headline">{{ record.headline }}</div>
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
              <span class="po-badge__w">{{ record.badge }}</span>
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
              The approved change brings Bulk/Batch Payments &mdash; <strong>File Payments</strong> in the
              specification &mdash; into V2.2 on the
              <RouterLink to="/proposals/ofp-001/">OFP-001</RouterLink> model: <strong>one consent and one
              signed request</strong> carrying an <code>Instructions[]</code> array, built from the
              single-payment fields the standard already defines. The file-upload model is not part of V2.2.
              <code>POST /payment-consents/{ConsentId}/file</code> is removed, and the consent drops
              <code>FileType</code>, <code>FileHash</code> and <code>FileReference</code> and gains a
              customer-facing <code>Description</code>.
            </p>
            <p>
              <strong>Delivery is optional for LFIs.</strong> The requirement that every LFI MUST support
              Bulk/Batch for SME and Corporate accounts is not part of this decision, so a TPP cannot assume
              Bulk/Batch is available at any given LFI, for any account type. An LFI that offers it receives
              the batch on its Ozone Connect <code>POST /payments</code> endpoint, and its authorisation
              journey shows the batch&rsquo;s <code>Description</code>, number of payments, total and execution
              date, offering only eligible debtor accounts. An LFI that does not offer it has nothing to build.
            </p>
            <p>
              The remainder of the recommendation stands as proposed. The <strong>API Hub validates every
              batch</strong> before it reaches the LFI, checking the number of <code>Instructions</code>
              against <code>NumberOfTransactions</code> and the sum of their amounts against
              <code>ControlSum</code>. Bulk and Batch remain one capability, with debit posting left to the
              LFI, and the existing multi-authorisation flow applies unchanged.
            </p>
          </div>

          <!-- Handover / rollout note -->
          <div class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              The proposal is now <strong>handed over for inclusion in the V2.2 standards</strong>. The OFP-001
              drafts move into the V2.2 specifications, and the API Hub and documentation changes are taken
              forward as part of the V2.2 release. Delivery timings will be communicated through the
              <strong>V2.2 release notes</strong> &mdash; this page will not be updated with a schedule. No LFI
              is required to deliver Bulk/Batch Payments; an LFI that intends to offer them can plan against the
              V2.2 specification once it is published.
            </p>
          </div>

          <!-- The resulting change -->
          <div class="po-spec">
            <h3 class="po-h">
              The change
              <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
            </h3>
            <p class="po-spec__lede">
              The OFP-001 drafts move into the V2.2 specifications and the file-only endpoints are removed.
              Support at an LFI is optional; the rules below describe how Bulk/Batch Payments work wherever
              they are offered. The consent and request shapes are those agreed in
              <RouterLink to="/proposals/ofp-001/">OFP-001</RouterLink>
              (<RouterLink to="/proposals/ofp-001/par-schema">par-file-payment-schema.yaml</RouterLink>,
              <RouterLink to="/proposals/ofp-001/schema">bulk-payment-schema.yaml</RouterLink>).
            </p>
            <div class="po-rules">
              <div class="po-rules__label">Adopted for V2.2 · optional for LFIs</div>
              <ul class="po-rules__list">
                <li>
                  <strong>Bulk/Batch Payments are part of V2.2</strong>, using the JSON array model agreed in
                  OFP-001. The file-upload model is not part of V2.2.
                </li>
                <li>
                  <strong>An LFI MAY support Bulk/Batch Payments.</strong> This replaces the proposed split
                  &mdash; MUST for accounts whose <code>AccountType</code> is <code>SME</code> or
                  <code>Corporate</code>, MAY for Retail.
                </li>
                <li>
                  <strong>Bulk and Batch are one capability.</strong> The TPP sends one consent and one array of
                  instructions. Whether the LFI posts one debit for the total or one debit per instruction is
                  the LFI&rsquo;s decision.
                </li>
                <li>
                  <strong>The API Hub validates the batch.</strong> Before the request reaches the LFI, the API
                  Hub checks that the number of <code>Instructions</code> equals
                  <code>NumberOfTransactions</code> and that the sum of their amounts equals
                  <code>ControlSum</code>, and rejects the request if either check fails.
                </li>
                <li>
                  <strong>Multi-authorisation is unchanged.</strong> Where an account needs more than one
                  approver, the existing
                  <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/multi-authorization">multi-authorization</RouterLink>
                  flow applies to a Bulk/Batch consent as it does to any other payment consent.
                </li>
              </ul>
            </div>

            <div class="po-rules po-rules--stack">
              <div class="po-rules__label">Specifications, API Hub and documentation</div>
              <ul class="po-rules__list">
                <li>
                  <strong><code>uae-bank-initiation-openapi.yaml</code></strong> &mdash; remove
                  <code>POST /payment-consents/{ConsentId}/file</code>; replace the
                  <code>POST /file-payments</code> request body with the OFP-001 <code>Instructions[]</code>
                  request. <code>GET /file-payments/{PaymentId}</code> and
                  <code>GET /file-payments/{PaymentId}/report</code> stay, with the report format aligned to the
                  JSON model.
                </li>
                <li>
                  <strong><code>uae-authorization-endpoints-openapi.yaml</code></strong> &mdash; in
                  <code>ControlParameters.ConsentSchedule.FilePayment</code>, remove <code>FileType</code>,
                  <code>FileHash</code> and <code>FileReference</code>; add <code>Description</code>.
                  <code>NumberOfTransactions</code>, <code>ControlSum</code> and
                  <code>RequestedExecutionDate</code> are kept.
                </li>
                <li>
                  <strong>API Hub</strong> &mdash; store the Bulk/Batch consent like any other payment consent;
                  on <code>POST /file-payments</code>, validate against the schema and against
                  <code>NumberOfTransactions</code> and <code>ControlSum</code>, then proxy to the LFI.
                </li>
                <li>
                  <strong><code>uae-ozone-connect-bank-service-initiation-openapi.yaml</code></strong> &mdash; the
                  file-payment request body on Ozone Connect <code>POST /payments</code> is replaced by the
                  array; Ozone Connect <code>POST /payment-consents</code> and
                  <code>POST /payment-consents/{consentId}/file</code> are removed, and the consent is held only
                  in the API Hub, as for every other payment type.
                </li>
                <li>
                  <strong>Documentation</strong> &mdash; Bulk/Batch Payment pages in the V2.2 TPP Standards and
                  LFI API Hub guides, an update to the
                  <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-status">payment status</RouterLink>
                  note that says Bulk/Batch is not yet documented in V2.2, and a V2.2 changelog entry.
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
  flex-wrap: wrap;
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
/* Qualifier — same chip, outlined, so it reads as a qualifier not a stamp. */
.po-verdict__chip--outline {
  color: var(--seal);
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--seal);
}
.po-verdict__headline {
  font-family: var(--at-serif);
  font-size: 21px;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--seal);
  margin-top: 12px;
}
.po-verdict__sub {
  font-family: var(--at-mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  margin-top: 12px;
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

/* headline metrics */
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
.po-detail a,
.po-rules__list a { color: var(--at-teal-deep, #008b78); text-decoration: underline; text-underline-offset: 3px; }
.po-detail a:hover,
.po-rules__list a:hover { color: var(--at-navy-deep); }
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

/* handover note */
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

/* the resulting change */
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
.po-rules--stack { margin-top: 20px; }
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
/* code inside a bold lead-in keeps the box but not the doubled weight */
.po-rules__list strong code { font-weight: 500; }

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 920px) {
  .po { padding: 2.5rem 0 3rem; }
  .po__inner { padding: 0 1.25rem; }
  .po-sheet__head { padding: 26px 22px 24px; }
  .po-metrics { grid-template-columns: repeat(2, 1fr); }
  .po-metrics__cell:nth-child(2) { border-right: none; }
  .po-verdict__label { font-size: 42px; }
}
</style>
