<script setup lang="ts">
// Outcome of Proposal — OFP-009. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed. This is a decision RECORD: the
// verdict, the rationale, and the resulting spec change are authored here; the
// numeric tally is pulled LIVE from the proposals API so the headline metrics
// always match the "Votes Received & Feedback" tab.
//
// OFP-009 closed 29 Aug 2026 at 10 for / 0 against / 0 abstain. It is approved
// as proposed: the Latin-only baseline patterns on the Leads personal-data
// fields. The two open questions (Arabic support, Emirates ID harmonisation)
// are not settled by this decision and are recorded as carried forward.
// Ratification is NOT yet confirmed — set `ratified: true` (and `ratifiedBy`)
// only once the record confirms it.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-009',
  ref: 'DR-2026-009',
  verdict: 'approved' as 'approved' | 'rejected',
  ratified: false,
  ratifiedBy: '',
  title: 'Define validation patterns for the Leads API personal-data fields',
  category: 'Products & Leads · Schema',
  decisionDate: '29 Aug 2026',
  // A label (or date) for when the decision takes effect; '' to omit the pill.
  effective: 'V2.2',
  proposedBy: 'Nebras',
  summary:
    'Approved as proposed, and unanimously — 10 votes in favour, none against, none abstaining. The free-text personal data on POST /leads — GivenName, LastName, FullName, BusinessName, EmiratesId, and each AddressLine — will be constrained to defined patterns, reusing validation the ecosystem has already agreed wherever it exists: the insurance-spec 784 pattern for Emirates ID and the OFP-003 ISO 20022 / SWIFT “x” set for address lines. Today EmiratesId is accepted with no pattern and no length at all, and the name and address fields carry nothing beyond a length limit. The proposal now passes to the standards team for incorporation into V2.2.',
}

// The approved schema change, as set out in the proposal (patterns added,
// lengths and shapes unchanged).
const approvedSchema = `# POST /leads · LeadRequest.Data — approved (patterns added, lengths unchanged)
Name:
  GivenName:    { maxLength: 70,  pattern: "^[A-Za-z '.\\-]+$" }
  LastName:     { maxLength: 70,  pattern: "^[A-Za-z '.\\-]+$" }
  FullName:     { maxLength: 140, pattern: "^[A-Za-z '.\\-]+$" }
  BusinessName: { maxLength: 140, pattern: "^[A-Za-z0-9 &'.,\\-()/]+$" }
EmiratesId:
  pattern: "^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$"                 # 784 = ISO 3166-1 numeric (UAE)
ResidentialAddress:
  AddressLine:
    items: { maxLength: 70, pattern: "^[A-Za-z0-9 /?:().,'+\\-]+$" } # OFP-003 "x" set, minus Arabic`

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

      <!-- ── Body: summary + the resulting spec change ─────────────────────── -->
      <div class="po-body">
        <div>
          <div class="po-seclabel">§ Decision summary</div>
          <p class="po-summary">{{ record.summary }}</p>

          <div class="po-detail">
            <p>
              The approved change adds a <code>pattern</code> to each Leads personal-data field and
              <strong>nothing else</strong>. Field shapes, <code>minLength</code> / <code>maxLength</code>, and
              the <code>AddressLine</code> item counts are unchanged; length is still enforced separately, so a
              value over its limit fails on length rather than on the pattern. <code>PhoneNumber</code> (E.164)
              and <code>Country</code> (ISO 3166-1 alpha-2) were already validated and are untouched.
            </p>
            <p>
              <strong>The baseline is Latin-only.</strong> Person names allow letters, space, apostrophe, period,
              and hyphen, with no digits; <code>BusinessName</code> additionally allows digits and
              <code>&amp; , ( ) /</code>. Address lines take the OFP-003 “x” set, without the Arabic block that
              OFP-003 removed on approval. Arabic and accented-Latin names — “فاطمة”, “José” — are therefore
              rejected under this decision, and TPPs must transliterate or sanitise customer input before
              submitting a lead. Whether stored lead PII should accept Arabic was put to the ecosystem as an
              open question and is <strong>not settled by this decision</strong>.
            </p>
            <p>
              Validation is enforced centrally at the <strong>API Hub</strong>. The Hub normalises to Unicode
              NFC, counts length in Unicode characters, and rejects a field that does not match its pattern as a
              standard request-validation error before the request reaches the LFI — it is not silently
              sanitised on the TPP’s behalf. Because <code>AEUserName</code> and <code>AEResidentialAddress</code>
              are shared with the Ozone Connect products-data specification, the same patterns apply there, so a
              lead that validates at the API Hub is not rejected downstream.
            </p>
          </div>

          <!-- Handover / rollout note -->
          <div class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              The proposal is now <strong>handed over for incorporation into the V2.2 specifications</strong>.
              Delivery timings, and the detail of how the change is incorporated, will be communicated through the
              relevant <strong>release notes</strong> — this page will not be updated with a schedule. Nothing
              changes in the published specifications until that release. TPPs calling
              <code>POST /leads</code> may wish to review how they capture names, Emirates IDs, and addresses
              ahead of it; LFIs have nothing to implement, as validation is applied at the API Hub.
            </p>
          </div>

          <!-- The resulting change: patterns applied to the Leads schemas -->
          <div class="po-spec">
            <h3 class="po-h">
              The change in the spec
              <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
            </h3>
            <p class="po-spec__lede">
              Additive <code>pattern</code> constraints on the existing Leads schemas, reusing validation the
              ecosystem has already agreed wherever it exists. No new fields, endpoints, or schemas.
            </p>
            <div class="po-rules">
              <div class="po-rules__label">Patterns applied · TPP products specification and Ozone Connect products-data specification</div>
              <ul class="po-rules__list">
                <li>
                  <strong>Person names</strong> — <code>GivenName</code> / <code>LastName</code>
                  (<code>AEPersonalAccountName</code>) and <code>FullName</code>
                  (<code>AEPersonalAccountFullName</code>) take <code>^[A-Za-z '.\-]+$</code>.
                </li>
                <li>
                  <strong>Business name</strong> — <code>BusinessName</code> (<code>AEBusinessAccountName</code>)
                  takes <code>^[A-Za-z0-9 &amp;'.,\-()/]+$</code>.
                </li>
                <li>
                  <strong>Emirates ID</strong> — <code>Data.EmiratesId</code> takes the existing insurance-spec
                  pattern <code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code>, on the request and on the Lead
                  response object that echoes it. Hyphenated and unhyphenated 15-digit forms are both valid.
                </li>
                <li>
                  <strong>Address lines</strong> — each <code>AddressLine</code> item in
                  <code>AEResidentialAddress</code> takes the OFP-003 “x” set
                  <code>^[A-Za-z0-9 /?:().,'+\-]+$</code>. <code>minItems 1</code>, <code>maxItems 7</code>, and
                  <code>maxLength 70</code> are unchanged.
                </li>
                <li>
                  <strong>Error handling</strong> — a non-matching field fails schema validation at the API Hub and
                  is returned as a standard request-validation error.
                </li>
              </ul>
            </div>

            <div class="po-code">
              <div class="po-code__label">POST /leads · LeadRequest.Data · patterns added, lengths unchanged</div>
              <pre class="po-code__pre">{{ approvedSchema }}</pre>
            </div>

            <!-- Points raised in the vote, recorded but not part of this decision -->
            <div class="po-rules po-rules--muted">
              <div class="po-rules__label">Raised in the vote · carried forward separately</div>
              <ul class="po-rules__list">
                <li>
                  <strong>Changes to internal systems.</strong> Some participants noted that existing internal APIs and systems may require changes to meet the new validation requirements. This is an implementation consideration and does not alter the approved scope.
                </li>
                <li>
                  <strong>Arabic in lead names and addresses.</strong> Some participants reported limitations in accepting, storing, and reconciling Arabic characters, while suggestions were also raised to introduce separate optional Arabic fields in the future. The approved baseline remains Latin-only. Any extension should be considered through a separate proposal.
                </li>
                <li>
                  <strong>Applying the Emirates ID pattern across all APIs.</strong> Some participants supported consistent validation wherever <code>EmiratesId</code> appears, while others noted that broader harmonisation would require separate consultation and impact assessment. OFP-009 applies to <code>POST /leads</code> only.
                </li>
                <li>
                  <strong>Validation beyond the Leads API.</strong> Suggestions to extend validation to <code>POST /payments</code> and establish general patterns for optional fields in future releases are outside the approved scope and should be considered separately.
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
/* Approved reads as a stamp: filled disc, white check, double ring. */
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

/* the resulting spec change */
.po-spec { margin-top: 44px; }
.po-spec__lede {
  font-size: 15.5px;
  line-height: 1.68;
  color: var(--at-navy);
  max-width: 52rem;
  margin: 0 0 20px;
  text-wrap: pretty;
}

/* rule blocks (mirror the proposal's change list) */
.po-rules {
  max-width: 52rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--seal);
  background: var(--at-surface);
  padding: 20px 24px;
}
/* the carried-forward block sits below the change and reads as secondary */
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

/* schema code block (as OFP-003) */
.po-code { max-width: 52rem; margin-top: 20px; border: 1px solid var(--at-grid-line); }
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
  font-size: 12.5px;
  line-height: 1.6;
  color: #d7e4f5;
  white-space: pre;
  tab-size: 2;
}

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
