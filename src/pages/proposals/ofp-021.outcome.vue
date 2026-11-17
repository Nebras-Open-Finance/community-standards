<script setup lang="ts">
// Outcome of Proposal — OFP-021. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed. ofp-021.vue already glob-imports
// this file, so adding it is the only change needed to switch the page to tabs.
//
// This is a decision RECORD: the rationale and the resulting spec change are
// authored here; the numeric tally is pulled LIVE from the proposals API so the
// headline metrics, and the figures quoted in the summary, always match the
// "Votes Received & Feedback" tab.
//
// Final tally as published on the Votes tab: 5 for, 0 against, 0 abstain
// (5 of 24 voters): 100% in favour, 21% participation.
//
// The vote themes are in ofp-021.feedback.vue.
//
// Follows the ofp-001 / ofp-007 decision-record format.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-021',
  ref: 'DR-2026-021',
  verdict: 'approved' as 'approved' | 'rejected',
  // Only set true once ratification is confirmed in the decision records.
  ratified: false,
  title: 'Correct formats for five Data Sharing fields',
  category: 'Data Sharing · Field formats',
  decisionDate: '9 Nov 2026',
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
  `Approved as proposed — ${tallySentence.value}. MerchantId, TerminalId and BillerId become strings of letters and digits, ExchangeRate becomes a decimal string with at most 10 decimal places, and Salary becomes an object of Amount, Currency and an optional Frequency, with the same format in the Standards Account Information API and in Ozone Connect Bank Data Sharing. Today a value the API Hub cannot convert to a number reaches the TPP as null, and a numeric identifier loses its leading zeros. The proposal now passes to the standards team for incorporation into V2.2.`,
)

// Seal colours flip with the verdict.
const seal = computed(() => (approved.value ? 'var(--at-teal-deep, #008B78)' : '#A6391F'))
const sealTint = computed(() =>
  approved.value ? 'rgba(0, 194, 169, 0.12)' : 'rgba(166, 57, 31, 0.08)',
)

const schemaProposed = `# uae-account-information-openapi.yaml (TPP Standards)
AEMerchantDetails1.MerchantId:
  type: string
  pattern: '^[A-Za-z0-9]{1,15}$'        # ← was integer
TerminalId:
  type: string
  pattern: '^[A-Za-z0-9]{1,16}$'        # ← was integer
BillDetails.BillerId:
  type: string
  pattern: '^[A-Za-z0-9]{1,35}$'        # ← was number
AECurrencyExchange.ExchangeRate:
  type: string
  pattern: '^\\d{1,11}(\\.\\d{1,10})?$'    # ← was number
Claims.Salary:                          # ← was number
  type: object
  required: [Amount, Currency]
  properties:
    Amount:    AEActiveCurrencyAndAmount_SimpleType
    Currency:  ISO 4217 currency code
    Frequency: [Weekly, Fortnightly, Monthly, Annual]   # optional

# uae-ozone-connect-bank-data-sharing-openapi.yaml (Ozone Connect)
# same formats on merchantId, TerminalId, BillerID, exchangeRate, salary`
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

      <!-- ── Body ─────────────────────────────────────────────────────────── -->
      <div class="po-body">
        <div>
          <div class="po-seclabel">§ Decision summary</div>
          <p class="po-summary">{{ summary }}</p>

            <div class="po-detail">
              <p>
                The approved change gives each field <strong>one format, used in both specifications</strong>.
                <strong>MerchantId</strong>, <strong>TerminalId</strong> and <strong>BillerId</strong> become
                strings of letters and digits, limited to 15, 16 and 35 characters, following ISO 8583 fields 42
                and 41 and the ISO 20022 identifier length. The LFI MUST send each identifier as it holds it,
                including leading zeros, and MUST NOT pad it with spaces. The <code>BillerId</code> description
                is rewritten for the UAE, with the SADAD wording removed.
              </p>
              <p>
                <strong>ExchangeRate</strong> becomes a decimal string with at most 10 decimal places, the
                precision of the ISO 20022 <code>BaseOneRate</code> type, so it arrives exactly as the LFI sent
                it. Its meaning is unchanged. <strong>Salary</strong> becomes an object of <code>Amount</code>,
                <code>Currency</code> and an optional <code>Frequency</code>. When Salary is present,
                <code>Amount</code> and <code>Currency</code> MUST be present; where the LFI holds the period, it
                SHOULD send <code>Frequency</code> as one of <code>Weekly</code>, <code>Fortnightly</code>,
                <code>Monthly</code> or <code>Annual</code>. Salary itself stays optional.
              </p>
              <p>
                Because the Ozone Connect and Standards fields share a type and pattern, the
                <strong>API Hub validates each field and maps it across unchanged</strong>, with no type
                conversion. This replaces the digits-only patterns and <code>number</code> types introduced in
                Ozone Connect Bank Data Sharing v2.2.6. No endpoint is added or removed. All five fields change
                type between V2.1 and V2.2, so a TPP that reads them must change its parsing, and an LFI that has
                already built to v2.2.6 must change those fields again.
              </p>
            </div>

            <div class="po-note">
              <div class="po-note__k">What happens next</div>
              <p class="po-note__p">
                The proposal is now <strong>handed over to the standards team</strong> for incorporation into
                <strong>V2.2</strong>, covering both specifications, API Hub validation and the V2.2 changelog.
                The published specification, and any timings, will be communicated through the
                <strong>release notes</strong> — this page will not be updated with a schedule. Until V2.2 is
                published, the current specification remains in force.
              </p>
            </div>

            <div class="po-spec">
              <h3 class="po-h">
                The change
                <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
              </h3>
              <p class="po-spec__lede">
                Five property definitions in each of two specifications, as set out in the proposal. The four
                transaction fields are returned by
                <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/data-sharing/open-api/accounts-AccountId-transactions"><code>GET /accounts/{AccountId}/transactions</code></RouterLink>;
                Salary is part of the party identity returned by
                <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/data-sharing/open-api/parties"><code>GET /parties</code></RouterLink>
                and
                <RouterLink to="/tech/tpp-standards/v2.2-rc2/banking/data-sharing/open-api/accounts-AccountId-parties"><code>GET /accounts/{AccountId}/parties</code></RouterLink>.
              </p>
              <div class="po-code">
                <div class="po-code__label">Resulting field formats — both specs</div>
                <pre class="po-code__pre">{{ schemaProposed }}</pre>
              </div>

              <div class="po-rules">
                <div class="po-rules__label">Changed in V2.2 · schema and validation</div>
                <ul class="po-rules__list">
                  <li>
                    <strong>Standards — <code>uae-account-information-openapi.yaml</code>.</strong>
                    <code>TerminalId</code> → <code>^[A-Za-z0-9]{1,16}$</code>;
                    <code>AEMerchantDetails1.MerchantId</code> → <code>^[A-Za-z0-9]{1,15}$</code>;
                    <code>BillDetails.BillerId</code> → <code>^[A-Za-z0-9]{1,35}$</code>;
                    <code>AECurrencyExchange.ExchangeRate</code> → <code>^\d{1,11}(\.\d{1,10})?$</code>, all of
                    type <code>string</code>. <code>Claims.Salary</code> → an object with required
                    <code>Amount</code> (<code>AEActiveCurrencyAndAmount_SimpleType</code>) and
                    <code>Currency</code> (ISO 4217), and optional <code>Frequency</code>. The
                    <code>BillerId</code> description is rewritten without SADAD.
                  </li>
                  <li>
                    <strong>Ozone Connect — <code>uae-ozone-connect-bank-data-sharing-openapi.yaml</code>.</strong>
                    The same formats on <code>TerminalId</code>, <code>MerchantDetails.merchantId</code>,
                    <code>BillDetails.BillerID</code> and <code>CurrencyExchange.exchangeRate</code>, returned from
                    <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/data-sharing/open-api/accounts-AccountId-transactions"><code>GET /accounts/{accountId}/transactions</code></RouterLink>,
                    and on <code>CustomerPersonClaims.salary</code>, returned from
                    <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/data-sharing/open-api/customer"><code>GET /customer</code></RouterLink>
                    and
                    <RouterLink to="/tech/lfi-api-hub/v2.2-rc2/banking/data-sharing/open-api/accounts-AccountId-customer"><code>GET /accounts/{accountId}/customer</code></RouterLink>.
                  </li>
                  <li>
                    <strong>API Hub.</strong> Each field is validated against its new format and mapped from Ozone
                    Connect to the Standards response without type conversion.
                  </li>
                  <li>
                    <strong>Documentation.</strong> Item 4 of the
                    <RouterLink to="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-16">V2.2 changelog entry</RouterLink>
                    is updated to describe the new formats.
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
.po-spec__lede a,
.po-rules__list a { color: var(--at-teal-deep, #008b78); text-decoration: none; border-bottom: 1px solid currentColor; }
.po-spec__lede a:hover,
.po-rules__list a:hover { color: var(--at-navy-deep); }

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

@media (max-width: 920px) {
  .po { padding: 2.5rem 0 3rem; }
  .po__inner { padding: 0 1.25rem; }
  .po-sheet__head { padding: 26px 22px 24px; }
  .po-metrics { grid-template-columns: repeat(2, 1fr); }
  .po-metrics__cell:nth-child(2) { border-right: none; }
  .po-verdict__label { font-size: 42px; }
}
</style>
