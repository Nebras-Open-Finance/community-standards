<script setup lang="ts">
// Outcome of Proposal — OFP-012. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed; glob-imported by the flat page
// ofp-012.vue. This is a decision RECORD: the verdict, the rationale, and the
// resulting change are authored here; the numeric tally is pulled LIVE from the
// proposals API so the headline metrics always match the "Votes Received &
// Feedback" tab.
//
// OFP-012 closed 23 Sep 2026 at 11 for / 1 against / 0 abstain (12 of 24
// eligible organisations). The vote themes are in ofp-012.feedback.vue.
//
// `ratified` gates the Ratified chip. Leave it false until ratification is
// confirmed in the project records.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-012',
  ref: 'DR-2026-012',
  verdict: 'approved' as 'approved' | 'rejected',
  ratified: false,
  title: 'Return transactions and statements newest-first',
  category: 'Data Sharing · Ordering',
  decisionDate: '23 Sep 2026',
  // A label (or date) for when the decision takes effect; '' to omit the pill.
  effective: 'V2.2',
  proposedBy: 'Nebras',
  summary:
    'Approved as proposed — 11 votes in favour, one against, none abstaining. From V2.2, transactions and statements will be returned in descending date order, newest first, by every LFI, including those already live. Today neither specification says which end of history a response starts from, so a TPP cannot treat page 1 as recent activity and has to pull and sort the whole filtered set before it can show a customer what has just happened on their account. The proposal now passes to the standards team for incorporation into V2.2.',
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
          <p class="po-summary">{{ record.summary }}</p>

          <div class="po-detail">
            <p>
              The approved rule fixes the <strong>key, the direction, and the tiebreaker</strong> for
              <code>GET /accounts/{AccountId}/transactions</code> and
              <code>GET /accounts/{AccountId}/statements</code>. Transactions are ordered on
              <code>bookingDateTime</code> and statements on <code>OpeningDate</code> — in each case the
              field the existing date filters already act on — so filtering, ordering, and paging all address
              the same value. Ordering is applied to the <strong>filtered result set, before pagination</strong>,
              so the first page always carries the most recent records the query matched.
            </p>
            <p>
              <strong>No transition period is granted.</strong> The requirement applies at V2.2 to every LFI,
              including those already live. Because the API Hub passes the LFI's order through unchanged and
              does not re-sort, the requirement has to be met at the LFI; there is no Hub-side correction.
            </p>
            <p>
              <strong>No sort control is introduced.</strong> Neither specification gains a sort parameter or
              header, and there are no schema changes, new fields, or new parameters. A TPP that needs
              ascending order reverses the response itself. Whether TPPs should later be able to request
              ascending order was asked, not decided, and is <strong>not part of this decision</strong>.
            </p>
          </div>

          <!-- Handover / rollout note -->
          <div class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              The proposal is now <strong>handed over for incorporation into V2.2</strong>: the ordering
              statement in the Ozone Connect and Standards specifications, the supporting documentation, and
              a new functional certification check. Timings, and the detail of how the change is
              incorporated, will be communicated through the relevant
              <strong>release notes and erratas</strong> — this page will not be updated with a schedule.
              LFIs that do not already return these endpoints newest-first should plan to conform at V2.2.
              TPPs have nothing to implement.
            </p>
          </div>

          <!-- The resulting change -->
          <div class="po-spec">
            <h3 class="po-h">
              The change
              <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
            </h3>
            <p class="po-spec__lede">
              No schema changes, no new fields, no new parameters — an ordering statement on two endpoints,
              the documentation that describes them, and a conformance check. The existing
              <RouterLink to="/knowledge-base/articles/pagination">Pagination</RouterLink>
              rule moves from “deterministic” to “deterministic and descending”.
            </p>
            <div class="po-rules">
              <div class="po-rules__label">Ordering rules · transactions and statements, from V2.2</div>
              <ul class="po-rules__list">
                <li>
                  <strong>Transactions MUST be ordered by <code>bookingDateTime</code>, descending.</strong>
                  This is the field the <code>fromBookingDateTime</code> / <code>toBookingDateTime</code>
                  filters act on.
                </li>
                <li>
                  <strong>Statements MUST be ordered by <code>OpeningDate</code>, descending</strong> — the start
                  of the statement period, and the field the <code>fromStatementDate</code> /
                  <code>toStatementDate</code> filters act on. <code>StatementDate</code> and
                  <code>ClosingDate</code> are not used.
                </li>
                <li>
                  <strong>A stable, unique tiebreaker SHOULD be applied</strong> — <code>transactionId</code>
                  for transactions, <code>StatementId</code> for statements — so that records sharing a date
                  hold a fixed position across requests. An LFI whose ledger already guarantees a total order
                  by other means satisfies the intent; ties must not move between page requests.
                </li>
                <li>
                  <strong>Ordering precedes pagination.</strong> Filtering is applied first, then ordering, then
                  paging. <code>totalRecords</code> and <code>totalPages</code> are unaffected.
                </li>
                <li>
                  <strong>The order does not vary with the request.</strong> Date filters, <code>page</code>,
                  <code>page-size</code>, and the <code>o3-fx-transactions</code> header change which records
                  are returned, never the direction.
                </li>
                <li>
                  <strong>The API Hub passes the order through unchanged.</strong> It maps the LFI's
                  <code>meta</code> to the TPP-facing <code>Links</code> envelope without re-sorting.
                </li>
              </ul>
            </div>

            <div class="po-rules po-rules--gap">
              <div class="po-rules__label">Where the change is made</div>
              <ul class="po-rules__list">
                <li>
                  <strong>Ozone Connect specification</strong> — the normative statement on
                  <code>GET /accounts/{accountId}/transactions</code> and
                  <code>GET /accounts/{accountId}/statements</code> in the bank data sharing specification:
                  key, direction, tiebreaker, and that ordering precedes pagination.
                </li>
                <li>
                  <strong>Standards specification</strong> — the same statement mirrored on the TPP-facing
                  endpoints in the account information specification, so a TPP can rely on it without reading
                  the LFI-facing spec. No request or response schema changes.
                </li>
                <li>
                  <strong>Documentation</strong> — the
                  <RouterLink to="/knowledge-base/articles/pagination">Pagination</RouterLink> article and the LFI
                  <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/data-sharing/api-guide/pagination">Bank Data Sharing — Pagination</RouterLink>
                  guide updated with the direction, the tiebreaker, and the duplicate-record failure it
                  prevents; the guarantee added to the TPP Data Sharing API guide; and an errata entry.
                </li>
                <li>
                  <strong>Functional certification</strong> — a Data Sharing check that walks a multi-page
                  transactions query, asserts descending order across the page boundary, and confirms that
                  re-requesting a page returns the same records in the same positions.
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
.po-spec__lede a,
.po-rules__list a { color: var(--at-teal-deep, #008b78); text-decoration: none; border-bottom: 1px solid currentColor; }
.po-spec__lede a:hover,
.po-rules__list a:hover { color: var(--at-navy-deep); }

/* rule blocks (mirror the proposal's ofp-rules block) */
.po-rules {
  max-width: 52rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--seal);
  background: var(--at-surface);
  padding: 20px 24px;
}
.po-rules--gap { margin-top: 20px; }
/* the follow-ups block sits below the change and reads as secondary */
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
