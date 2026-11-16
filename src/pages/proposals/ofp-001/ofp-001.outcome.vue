<script setup lang="ts">
// Outcome of Proposal — OFP-001. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed. This is a decision RECORD: the
// rationale and the resulting spec change are authored here; the numeric tally
// is pulled LIVE from the proposals API so the headline metrics, and the
// figures quoted in the summary, always match the "Votes Received & Feedback" tab.
//
// The verdict is derived from that live tally (simple majority of votes cast:
// For > Against, abstentions not counted) unless `verdictOverride` is set once
// the decision has been formally recorded. "Ratified" only shows when
// `ratified` is true — set it once ratification is confirmed.
//
// Final tally as published on the Votes tab: 16 for, 1 against, 1 abstain
// (18 of 24 voters; 89% in favour, 75% participation) → Approved.
//
// Follows the ofp-007/outcome.vue decision-record format. The vote themes are in
// ofp-001.feedback.vue.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-001',
  ref: 'DR-2026-001',
  title: 'Replace file-based Bulk/Batch Payments with a JSON array',
  category: 'Payments · Bulk/Batch',
  decisionDate: '24 Jul 2026',
  // When the change takes effect; '' to omit the pill.
  effective: 'V2.2',
  proposedBy: 'Nebras',
  // null → derive from the live tally. Set once the decision is formally recorded.
  verdictOverride: null as null | 'approved' | 'rejected',
  // Only set true once ratification is confirmed in the project records.
  ratified: false,
}

// ── Live tally (from the proposals API, via useProposals) ────────────────────
const counts = computed(() => tallyOf(record.id).counts)
const loaded = computed(() => counts.value.total > 0)
const pct = computed(() =>
  counts.value.total ? Math.round((counts.value.for / counts.value.total) * 100) : 0,
)
const turnout = computed(() =>
  voterTotal ? Math.round((counts.value.total / voterTotal) * 100) : 0,
)

// No override and no tally yet (loading, or the API is unreachable): show a
// neutral pending state rather than falling through to 'Rejected'.
const pending = computed(() => !record.verdictOverride && !loaded.value)
const approved = computed(() =>
  !pending.value &&
  (record.verdictOverride
    ? record.verdictOverride === 'approved'
    : counts.value.for > counts.value.against),
)
const verdictLabel = computed(() =>
  pending.value ? 'Awaiting tally' : approved.value ? 'Approved' : 'Rejected',
)
const glyph = computed(() => (pending.value ? '–' : approved.value ? '✓' : '✕'))

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
const tallyPhrase = computed(() => {
  const c = counts.value
  const against = c.against ? plural(c.against, 'against', 'against') : 'none against'
  const abstain = c.abstain ? plural(c.abstain, 'abstaining', 'abstaining') : 'none abstaining'
  return `${plural(c.for, 'vote', 'votes')} in favour, ${against}, ${abstain}`
})

const summary = computed(() =>
  approved.value
    ? `Approved — ${tallyPhrase.value}. The unused file-upload model for Bulk/Batch Payments will be deprecated, and the individual payments will instead be carried as a JSON Instructions[] array in a single signed request to POST /file-payments, assembled from the single-payment fields the standard already defines. No LFI has implemented the file endpoints, so there is no live integration to migrate. The proposal now passes to the standards team for incorporation into V2.2.`
    : `Rejected — ${tallyPhrase.value}. The file-upload model for Bulk/Batch Payments remains in the specification as it stands today, and no change will be made to the PAR consent object, the authorization page, or the POST /file-payments request. The under-specification the proposal described is not resolved by this decision.`,
)

// Seal colours flip with the verdict.
const seal = computed(() =>
  pending.value ? 'var(--at-navy, #00277F)' : approved.value ? 'var(--at-teal-deep, #008B78)' : '#A6391F',
)
const sealTint = computed(() =>
  pending.value ? 'rgba(0, 39, 127, 0.06)' : approved.value ? 'rgba(0, 194, 169, 0.12)' : 'rgba(166, 57, 31, 0.08)',
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
              <span class="po-seal__glyph">{{ glyph }}</span>
            </div>
            <div class="po-verdict__text">
              <div class="po-verdict__label">
                {{ verdictLabel }}
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
              <span class="po-badge__g">{{ glyph }}</span>
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

      <!-- ── Body ─────────────────────────────────────────────────────────── -->
      <div class="po-body">
        <div v-if="!pending">
          <div class="po-seclabel">§ Decision summary</div>
          <p class="po-summary">{{ summary }}</p>

          <!-- ── APPROVED ─────────────────────────────────────────────────── -->
          <template v-if="approved">
            <div class="po-detail">
              <p>
                The approved change replaces the <strong>file upload</strong> with an
                <strong>inline JSON array</strong>. A TPP no longer uploads a payment file to
                <code>POST /payment-consents/{ConsentId}/file</code> and references it by hash; it sends
                the payments themselves, one <code>Instructions[]</code> element per transaction, in the
                body of <code>POST /file-payments</code>. The request is a <strong>signed JWS end-to-end,
                exactly like <code>POST /payments</code></strong>, so the same validation, signing, and
                idempotency rules apply to a batch as to a single payment.
              </p>
              <p>
                The <strong>integrity checks are retained</strong>. <code>NumberOfTransactions</code> and
                <code>ControlSum</code> stay on the consent, and the API Hub validates the array against
                them — the number of instructions against <code>NumberOfTransactions</code>, the sum of
                their amounts against <code>ControlSum</code> — so each LFI no longer has to build that
                check itself.
              </p>
              <p>
                For the customer, little changes. A TPP may still collect a file — an Excel sheet of
                payments, for example — but the <strong>TPP</strong> now maps it to the JSON array rather
                than the LFI parsing it. At authorization the customer sees the standard confirm-payment
                details, with a <code>Description</code> as the stated reason, in place of a rendered file.
                Because no LFI has built the file endpoints, there is nothing in production to migrate.
              </p>
            </div>

            <div class="po-note">
              <div class="po-note__k">What happens next</div>
              <p class="po-note__p">
                The proposal is now <strong>handed over to the standards team</strong> for incorporation
                into <strong>V2.2</strong>, working from the draft schemas attached to the proposal. The
                published specification, and any timings, will be communicated through the
                <strong>release notes</strong> — this page will not be updated with a schedule. Until V2.2
                is published, the current specification remains in force and no action is required from
                LFIs or TPPs.
              </p>
            </div>

            <div class="po-spec">
              <h3 class="po-h">
                The change in the spec
                <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
              </h3>
              <p class="po-spec__lede">
                Three changes, as set out in the proposal and its draft schemas —
                <RouterLink to="/proposals/ofp-001/par-schema">par-file-payment-schema.yaml</RouterLink> and
                <RouterLink to="/proposals/ofp-001/schema">bulk-payment-schema.yaml</RouterLink>. Each
                instruction is built from the single-payment fields the standard already defines; nothing
                new is introduced for implementers to learn.
              </p>
              <div class="po-rules">
                <div class="po-rules__label">Approved · V2.2</div>
                <ul class="po-rules__list">
                  <li>
                    <strong>Consent (PAR) — File Payment object.</strong> <code>FileType</code>,
                    <code>FileHash</code>, and <code>FileReference</code> are removed. <code>Description</code>
                    is added — the reason the LFI shows the customer at authorization.
                    <code>NumberOfTransactions</code>, <code>ControlSum</code>, and
                    <code>RequestedExecutionDate</code> are retained.
                  </li>
                  <li>
                    <strong>Authorization page.</strong> No uploaded file is rendered. The page shows the
                    standard confirm-payment details, with <code>Description</code> as the stated reason.
                  </li>
                  <li>
                    <strong><code>POST /file-payments</code> body.</strong> Carries everything
                    <code>POST /payments</code> carries, with the payments as an <code>Instructions[]</code>
                    array. <code>PersonalIdentifiableInformation</code>, <code>DebtorReference</code>, and
                    <code>CreditorReference</code> move inside each element. <code>CurrencyRequest</code> is
                    dropped. <code>ConsentId</code>, <code>PaymentPurposeCode</code>, and
                    <code>OpenFinanceBilling</code> stay at batch level.
                  </li>
                  <li>
                    <strong>Validation.</strong> The API Hub checks
                    <code>Instructions.length == NumberOfTransactions</code> and
                    <code>sum(Amount) == ControlSum</code> against the consent.
                  </li>
                  <li>
                    <strong>File upload deprecated.</strong> The file-upload mechanism at
                    <code>POST /payment-consents/{ConsentId}/file</code> is deprecated in favour of the
                    inline array.
                  </li>
                </ul>
              </div>

            </div>
          </template>

          <!-- ── REJECTED ─────────────────────────────────────────────────── -->
          <template v-else>
            <div class="po-detail">
              <p>
                <strong>No change is made to the specification.</strong> File Payments remain defined as a
                file upload to <code>POST /payment-consents/{ConsentId}/file</code>, referenced on the
                consent by <code>FileType</code>, <code>FileHash</code>, and <code>FileReference</code>,
                with the batch created by <code>POST /file-payments</code>.
              </p>
              <p>
                The gaps the proposal described in the file model — no encryption element for the PII the
                file holds, no definition of how uploaded files are scanned, and no defined file structures,
                supported file types, or means for a TPP to discover which types an LFI accepts — remain
                open, and would need to be addressed by a separate proposal.
              </p>
            </div>

            <div class="po-note">
              <div class="po-note__k">What happens next</div>
              <p class="po-note__p">
                The proposal is <strong>closed without change</strong>. The current specification remains in
                force and no action is required from LFIs or TPPs. Any revised approach to Bulk/Batch
                Payments would be brought forward as a <strong>new proposal</strong>.
              </p>
            </div>
          </template>
        </div>

        <p v-else class="po-pending">Loading the voting record…</p>
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

.po-body { margin-top: 44px; }
.po-pending {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.5;
}
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
