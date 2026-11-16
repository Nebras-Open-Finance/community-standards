<script setup lang="ts">
// Outcome of Proposal — OFP-010. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed; the parent ofp-010/index.vue
// glob-imports this file, so adding it is what switches the page to tabs.
//
// This is a decision RECORD: the verdict, rationale, and resulting change are
// authored here; the numeric tally is pulled LIVE from the proposals API so the
// headline metrics and the summary sentence always match the "Votes Received &
// Feedback" tab. No vote counts are hardcoded on this page.
//
// OFP-010 closed 19 Aug 2026 at 10 for / 2 against / 0 abstain (12 of 24
// voters): 83% in favour, 50% participation.
//
// OFP-010 adds TransactionInformation to the required list of the transaction
// object on both sides of the Hub. The change is shown as the resulting schema
// diff, with the points the proposal itself left open recorded alongside it.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-010',
  ref: 'DR-2026-010',
  verdict: 'approved' as 'approved' | 'rejected',
  // Only set true once ratification is confirmed in the decision records.
  ratified: false,
  title: 'Make the transaction narrative a required field',
  category: 'Data Sharing · Data quality',
  decisionDate: '19 Aug 2026',
  // A label (or date) for when the decision takes effect; '' to omit the pill.
  effective: 'Standards V2.2',
  proposedBy: 'Nebras',
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

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
const tallySentence = computed(() => {
  const c = counts.value
  return `${plural(c.for, 'vote', 'votes')} in favour, ${c.against || 'none'} against, ${c.abstain || 'none'} abstaining`
})

const summary = computed(() =>
  `Approved as proposed — ${tallySentence.value}. TransactionInformation, the transaction narrative, becomes a required field on every transaction returned by GET /accounts/{AccountId}/transactions, on both the TPP-facing and the Ozone Connect side of the Hub. What Nebras has so far enforced case by case for CASA, through remediation plans at functional certification, becomes a published and testable rule of the standard. The proposal now passes to the standards team for incorporation into V2.2.`,
)

// Seal colours flip with the verdict.
const seal = computed(() => (approved.value ? 'var(--at-teal-deep, #008B78)' : '#A6391F'))
const sealTint = computed(() =>
  approved.value ? 'rgba(0, 194, 169, 0.12)' : 'rgba(166, 57, 31, 0.08)',
)

const schemaProposed = `# AETransaction (TPP Standards) · CbuaeTransaction (Ozone Connect)
required:
  - TransactionId
  - CreditDebitIndicator
  - Status
  - BookingDateTime
  - Amount
  - TransactionDateTime
  - TransactionType
  - SubTransactionType
  - TransactionInformation        # ← added; bounds 1–500 on both sides`
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
                {{ approved ? 'Approved' : 'Rejected' }}
                <span v-if="approved && record.ratified" class="po-verdict__chip">Ratified</span>
              </div>
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
              <span class="po-badge__w">{{ approved ? 'Approved' : 'Rejected' }}</span>
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
          <p class="po-summary">{{ summary }}</p>

          <div class="po-detail">
            <p>
              The approved change adds <code>TransactionInformation</code> to the <code>required</code> list of
              the transaction object on <strong>both sides of the Hub</strong>: <code>AETransaction</code> in
              the TPP Standards spec and <code>transactionInformation</code> on <code>CbuaeTransaction</code>
              in the Ozone Connect spec. The field already exists and is already sized. This is a one-line
              addition to each required array, not a new field or a change of shape, and the
              <strong>1–500 character bounds do not move</strong>.
            </p>
            <p>
              The requirement is <strong>uniform across every product</strong> that reports through the
              transactions endpoint — current and savings accounts, credit cards, personal finance, mortgages,
              and SME / corporate accounts — because the transaction object is a single shared schema and a
              schema-level requirement cannot be scoped by product. Because the LFI is the producer of the
              data, the obligation binds the LFI.
            </p>
            <p>
              It is asserted <strong>primarily at functional certification</strong>, against the LFI's
              pre-production environment — the same gate at which Nebras already requires CASA narratives — so
              that a narrative-less transactions response fails sign-off before production rather than being
              remediated afterwards. No hard runtime reject is introduced by this decision. The TPP-facing
              request, the endpoint, and every other field on the transaction are unchanged, and TPPs have
              nothing to implement beyond relying on the narrative being present.
            </p>
          </div>

          <!-- Handover / rollout note -->
          <div class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              The proposal is now <strong>handed over to the standards team</strong> for incorporation into
              the <strong>V2.2</strong> TPP Standards and Ozone Connect specifications, and into the functional
              certification checks that apply them. Timings, and the detail of how the change is incorporated,
              will be communicated through the relevant <strong>release notes</strong> — this page will not be
              updated with a schedule. LFIs whose cores do not yet populate the narrative for every product
              line should use the time before V2.2 to confirm where remediation is needed.
            </p>
          </div>

          <!-- The resulting change -->
          <div class="po-spec">
            <h3 class="po-h">
              The change
              <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
            </h3>
            <p class="po-spec__lede">
              A single field added to the transaction object's <code>required</code> list on each side of the
              Hub, plus matching length bounds on the Ozone Connect field. Applies to
              <RouterLink to="/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions"><code>GET /accounts/{AccountId}/transactions</code></RouterLink>
              and its
              <RouterLink to="/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions">Ozone Connect counterpart</RouterLink>.
            </p>

            <div class="po-code">
              <div class="po-code__label">Resulting required list — both specs</div>
              <pre class="po-code__pre">{{ schemaProposed }}</pre>
            </div>

            <div class="po-rules">
              <div class="po-rules__label">Changed in V2.2 · schema and certification</div>
              <ul class="po-rules__list">
                <li>
                  <strong>TPP Standards spec</strong> — add <code>TransactionInformation</code> to
                  <code>AETransaction.required</code> in <code>uae-account-information-openapi.yaml</code>. The
                  field's definition (<code>string</code>, <code>minLength 1</code>, <code>maxLength 500</code>)
                  is untouched.
                </li>
                <li>
                  <strong>Ozone Connect spec</strong> — add <code>transactionInformation</code> to
                  <code>CbuaeTransaction.required</code> in
                  <code>uae-ozone-connect-bank-data-sharing-openapi.yaml</code>, so the obligation binds the LFI
                  as the data producer and the two sides stay in step.
                </li>
                <li>
                  <strong>Ozone Connect bounds</strong> — add <code>minLength 1</code> /
                  <code>maxLength 500</code> to <code>transactionInformation</code>, which currently declares
                  none, so a required field cannot be satisfied by an empty string.
                </li>
                <li>
                  <strong>Functional certification</strong> — a transactions response without a narrative fails
                  sign-off for any product, replacing today's case-by-case CASA remediation with a standing
                  conformance rule.
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

/* resulting schema (mirrors the proposal's ofp-code block) */
.po-code { max-width: 52rem; margin: 0 0 20px; border: 1px solid var(--at-grid-line); }
.po-code__label {
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
.po-code__pre {
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

/* rule blocks (mirror the proposal's ofp-rules block) */
.po-rules {
  max-width: 52rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--seal);
  background: var(--at-surface);
  padding: 20px 24px;
}
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
