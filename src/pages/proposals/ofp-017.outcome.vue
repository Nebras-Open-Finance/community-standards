<script setup lang="ts">
// Outcome of Proposal — OFP-017. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed. ofp-017.vue already glob-imports
// this file (./ofp-017.outcome.vue), so no change to the page is needed.
//
// As with OFP-007, the numeric tally is pulled LIVE from the proposals API so the
// headline metrics always match the "Votes Received & Feedback" tab. Unlike
// OFP-007, the verdict and the summary sentence are also derived from that live
// tally rather than hard-coded, so this record cannot disagree with the votes
// shown on the site. To pin the verdict once it has been confirmed, set
// `record.verdict` to 'approved' or 'rejected'.
//
// Decision rule applied when `record.verdict` is null: approved when votes For
// exceed votes Against; abstentions are counted in the total and in
// participation but do not count towards either side.
//
// `record.ratified` stays false until ratification is confirmed in the project
// records — the "Ratified" chip is shown only when it is true.
//
// OFP-017 adds three values to an existing enum. The change below is taken from
// the proposal's own definitions, rules and technical changes; nothing is added
// beyond what was put to the vote.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-017',
  ref: 'DR-2026-017',
  // Pinned from the closed tally on the site: 11 For, 0 Against, 0 Abstain
  // (11 of 24 voters, 100% in favour). The figures themselves still render live.
  verdict: 'approved' as 'approved' | 'rejected' | null,
  ratified: false,
  title: 'Credit account statuses',
  category: 'Data Sharing · Accounts',
  decisionDate: '9 Nov 2026',
  // A label (or date) for when the decision takes effect; '' to omit the pill.
  effective: 'V2.2',
  proposedBy: 'Nebras',
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

// 'pending' until the live tally has arrived (and in the static build), so no
// verdict is shown before the real votes are known.
const verdict = computed<'approved' | 'rejected' | 'pending'>(() => {
  if (record.verdict) return record.verdict
  if (!loaded.value) return 'pending'
  return counts.value.for > counts.value.against ? 'approved' : 'rejected'
})
const approved = computed(() => verdict.value === 'approved')
const pending = computed(() => verdict.value === 'pending')
const verdictLabel = computed(() =>
  pending.value ? 'Result pending' : approved.value ? 'Approved' : 'Rejected',
)
const glyph = computed(() => (pending.value ? '–' : approved.value ? '✓' : '✕'))

const tallyPhrase = computed(() => {
  const c = counts.value
  const forP = `${c.for} ${c.for === 1 ? 'vote' : 'votes'} in favour`
  const againstP = c.against === 0 ? 'none against' : `${c.against} against`
  const abstainP = c.abstain === 0 ? 'none abstaining' : `${c.abstain} abstaining`
  return `${forP}, ${againstP}, ${abstainP}`
})

const summary = computed(() => {
  const c = counts.value
  if (approved.value) {
    const lead = c.against === 0 && c.abstain === 0 ? 'Approved as proposed, and unanimously' : 'Approved as proposed'
    return `${lead} — ${tallyPhrase.value}. From V2.2, three values are added to the account Status enum — InArrears, Defaulted and WrittenOff — each defined in the standard, and an LFI MUST return the one that applies in place of Active. Today a credit card, finance or mortgage account that is in arrears, in default or written off can only be reported as Active, Suspended or Closed, none of which is accurate, and different LFIs choose differently. The proposal now passes for incorporation into the V2.2 specifications.`
  }
  return `Rejected — ${tallyPhrase.value}. The account Status enum keeps its seven current values, and InArrears, Defaulted and WrittenOff are not added in V2.2. No change will be made to the standards specification, the Ozone Connect specifications or the API Hub as a result of this proposal.`
})

// Kept for the sub-line; uses the same en-dash format as OFP-007.
const scoreLine = computed(() =>
  pending.value
    ? 'Awaiting the final tally'
    : `${pct.value}% in favour · ${counts.value.for}–${counts.value.against}–${counts.value.abstain}`,
)

// Seal colours flip with the verdict.
const seal = computed(() =>
  pending.value ? '#6B7280' : approved.value ? 'var(--at-teal-deep, #008B78)' : '#A6391F',
)
const sealTint = computed(() =>
  pending.value ? 'rgba(107, 114, 128, 0.12)' : approved.value ? 'rgba(0, 194, 169, 0.12)' : 'rgba(166, 57, 31, 0.08)',
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
              <div class="po-verdict__label" :class="{ 'po-verdict__label--pending': pending }">
                {{ verdictLabel }}
                <span v-if="approved && record.ratified" class="po-verdict__chip">Ratified</span>
              </div>
              <div class="po-verdict__sub">{{ scoreLine }}</div>
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
            <div v-if="!pending" class="po-badge">
              <span class="po-badge__g">{{ glyph }}</span>
              <span class="po-badge__w">{{ verdictLabel }}</span>
            </div>
            <div v-else class="po-metrics__num">—</div>
            <div class="po-metrics__cap">Final decision</div>
          </div>
          <div class="po-metrics__cell">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">{{ pending ? '—' : `${pct}%` }}</div>
            <div class="po-metrics__cap">In favour</div>
          </div>
          <div class="po-metrics__cell">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">
              {{ pending ? '—' : counts.total }}<span class="po-metrics__denom">/{{ voterTotal }}</span>
            </div>
            <div class="po-metrics__cap">Total votes</div>
          </div>
          <div class="po-metrics__cell">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">{{ pending ? '—' : `${turnout}%` }}</div>
            <div class="po-metrics__cap">Participation</div>
          </div>
        </div>
      </div>

      <!-- ── Body: summary + the resulting change ──────────────────────────── -->
      <div class="po-body">
        <div>
          <div class="po-seclabel">§ Decision summary</div>
          <p class="po-summary">{{ pending ? 'Loading the final tally…' : summary }}</p>

          <div v-if="approved" class="po-detail">
            <p>
              The approved change adds <code>InArrears</code>, <code>Defaulted</code> and
              <code>WrittenOff</code> to <code>AEAccountStatusCode</code>, so it changes <code>Status</code> on
              <strong><code>GET /accounts</code></strong> and <strong><code>GET /accounts/{AccountId}</code></strong>,
              and the same three values are added to <code>status</code> on <code>CbuaeAccount</code> in Ozone
              Connect. The statuses exist for credit card, finance and mortgage accounts but are not restricted
              to them: an LFI MAY use them for any account the definitions fit, such as an overdrawn current
              account in arrears.
            </p>
            <p>
              <strong>Only one status applies at a time.</strong> <code>WrittenOff</code> takes precedence over
              <code>Defaulted</code>, which takes precedence over <code>InArrears</code>; <code>Closed</code> and
              <code>Deceased</code> take precedence over all three. <code>StatusUpdateDateTime</code> MUST change
              whenever an account moves into, between or out of these statuses, and an account leaves
              <code>InArrears</code> and returns to <code>Active</code> when it is brought up to date. The
              precedence between the new statuses and <code>Suspended</code> or <code>Dormant</code> was left open
              by the proposal and is <strong>not settled by this decision</strong>.
            </p>
            <p>
              Confirmation of Payee is untouched. The CoP <code>AccountStatus</code> keeps its current enum and an
              LFI MUST NOT return the new statuses in a CoP response, so a payer never learns a payee's credit
              standing. No new fields, endpoints or permissions are introduced; a TPP that validates
              <code>Status</code> strictly, or treats anything other than <code>Active</code> as an error, will
              need to accept the three new values when it moves to V2.2.
            </p>
          </div>
          <div v-else-if="!pending" class="po-detail">
            <p>
              The proposal would have added <code>InArrears</code>, <code>Defaulted</code> and
              <code>WrittenOff</code> to <code>AEAccountStatusCode</code> and to <code>status</code> on
              <code>CbuaeAccount</code> in Ozone Connect, and required LFIs to return them in place of
              <code>Active</code>. None of that will be made. LFIs continue to report credit card, finance and
              mortgage accounts using the existing seven values, and TPPs have nothing to change.
            </p>
          </div>

          <!-- Handover / rollout note -->
          <div v-if="!pending" class="po-note">
            <div class="po-note__k">What happens next</div>
            <p v-if="approved" class="po-note__p">
              The proposal is now <strong>handed over for incorporation into V2.2</strong>: the standards
              specification, the Ozone Connect Bank Data Sharing and CAAP operations specifications, the API Hub,
              and the LFI and TPP Data Sharing documentation. Delivery timings, and the detail of how the change is
              incorporated, will be communicated through the <strong>V2.2 release notes and changelog</strong> —
              this page will not be updated with a schedule. Once V2.2 applies, LFIs will need to supply these
              statuses through Ozone Connect, and TPPs will need to handle them.
            </p>
            <p v-else class="po-note__p">
              The proposal is <strong>closed with no change</strong>. Nothing is scheduled for V2.2 and no action
              is required from LFIs or TPPs. Any revised approach to reporting the state of credit accounts would be
              brought forward as a new proposal.
            </p>
          </div>

          <!-- The resulting change -->
          <div class="po-spec">
            <h3 class="po-h">
              The change
              <span v-if="!pending && approved && record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
            </h3>
            <p class="po-spec__lede">
              <template v-if="approved">
                Three enum values, added in the standard and in Ozone Connect. No new fields, endpoints or
                permissions. The definitions and precedence rules will be added to the LFI
                <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/data-sharing/requirements">Data Sharing requirements</RouterLink>
                and the TPP Data Sharing API Guide.
              </template>
              <template v-else-if="pending">
                The three values put to the vote, and where they would be added.
              </template>
              <template v-else>
                Not made. Recorded here for reference: the three values, and where they would have been added.
              </template>
            </p>

            <div class="po-rules">
              <div class="po-rules__label">Added to <code>AEAccountStatusCode</code> and <code>CbuaeAccount.status</code></div>
              <ul class="po-rules__list">
                <li>
                  <strong><code>InArrears</code></strong> — an amount due under the account's terms (a scheduled
                  repayment, a minimum payment, or an amount above an agreed limit) is past due and unpaid, and the
                  account has not been classified as <code>Defaulted</code> or <code>WrittenOff</code>.
                </li>
                <li>
                  <strong><code>Defaulted</code></strong> — the LFI has classified the account as in default. This
                  MUST apply no later than the point at which an amount has been past due for more than 90 days, and
                  MAY apply earlier where the LFI's credit-risk classification does so.
                </li>
                <li>
                  <strong><code>WrittenOff</code></strong> — the LFI has written off all or part of the outstanding
                  balance, and the account is not yet closed. Recovery may continue while the account has this
                  status.
                </li>
              </ul>
            </div>

            <div class="po-rules po-rules--stack">
              <div class="po-rules__label">Where it changes</div>
              <ul class="po-rules__list">
                <li>
                  <strong><code>uae-account-information-openapi.yaml</code></strong> — the three values and their
                  definitions in <code>AEAccountStatusCode</code>; <code>Status</code> on <code>GET /accounts</code>
                  and <code>GET /accounts/{AccountId}</code>.
                </li>
                <li>
                  <strong><code>uae-ozone-connect-bank-data-sharing-openapi.yaml</code></strong> and
                  <strong><code>uae-ozone-connect-caap-operations-openapi.yaml</code></strong> — the same values on
                  <code>status</code> in <code>CbuaeAccount</code>.
                </li>
                <li>
                  <strong>API Hub</strong> — accepts the new values from Ozone Connect and passes them to the TPP on
                  the V2.2 base path. No mapping is needed.
                </li>
                <li>
                  <strong>Unchanged</strong> — <code>CbuaeCopCustomer</code> and
                  <code>uae-confirmation-of-payee-openapi.yaml</code>.
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
.po-verdict__label--pending { font-size: 40px; color: var(--at-mute-2); }
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
.po-rules__label code { font-family: var(--at-mono); font-size: 1em; }
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
