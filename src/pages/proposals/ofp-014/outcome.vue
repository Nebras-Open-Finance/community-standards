<script setup lang="ts">
// Outcome of Proposal — OFP-014. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed. ofp-014/index.vue already
// glob-imports ./outcome.vue, so adding this file is the whole integration.
//
// As with OFP-007, the numeric tally is pulled LIVE from the proposals API so
// the headline metrics always match the "Votes Received & Feedback" tab. Unlike
// OFP-007, the verdict is also derived from that live tally (For > Against,
// abstentions excluded) unless `verdictOverride` is set, and the summary prose
// is built from the counts — so nothing on this page states a figure the API
// does not hold. Ratification is shown ONLY when `ratified` is set to true on
// confirmation from the Standards Working Group.
import { computed, onMounted } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal, loadOne } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-014',
  ref: 'DR-2026-014',
  // Pinned from the closed tally: 8 for, 1 against, 0 abstain (89% in favour,
  // 9 of 24 voters, 38% participation). null → derive from the live tally.
  verdictOverride: 'approved' as null | 'approved' | 'rejected',
  // Set true only once ratification is confirmed in the project records.
  ratified: false,
  title: 'Define date-time semantics once, in a shared component',
  category: 'API Specifications · Date-time semantics',
  decisionDate: '13 Oct 2026',
  // The target version from the proposal; '' to omit the pill.
  effective: 'V2.2',
  proposedBy: 'Nebras',
  ratifiedBy: 'Nebras Standards Working Group',
}

// ── Live tally (from the proposals API, via useProposals) ────────────────────
onMounted(() => { void loadOne(record.id) })

const counts = computed(() => tallyOf(record.id).counts)
const loaded = computed(() => counts.value.total > 0)
const pct = computed(() =>
  counts.value.total ? Math.round((counts.value.for / counts.value.total) * 100) : 0,
)
const turnout = computed(() =>
  voterTotal ? Math.round((counts.value.total / voterTotal) * 100) : 0,
)

const verdict = computed<'approved' | 'rejected' | 'pending'>(() => {
  if (record.verdictOverride) return record.verdictOverride
  if (!loaded.value) return 'pending'
  return counts.value.for > counts.value.against ? 'approved' : 'rejected'
})
const approved = computed(() => verdict.value === 'approved')
const rejected = computed(() => verdict.value === 'rejected')
const verdictLabel = computed(() =>
  approved.value ? 'Approved' : rejected.value ? 'Rejected' : 'Result pending',
)
const glyph = computed(() => (approved.value ? '✓' : rejected.value ? '✕' : '–'))

const n = (x: number) => (x === 0 ? 'none' : String(x))
const summary = computed(() => {
  const c = counts.value
  if (approved.value) {
    const unanimous = c.against === 0 && c.abstain === 0
    const lead = unanimous
      ? `Approved as proposed, and unanimously — ${c.for} votes in favour, none against, none abstaining.`
      : `Approved as proposed — ${c.for} votes in favour, ${n(c.against)} against, ${n(c.abstain)} abstaining.`
    return `${lead} A shared AEDateTime component will be added to the specifications, stating once that a date-time identifies an instant in time, that recipients must apply the offset, and that equivalent encodings must behave identically. Every date-time field will reference it in place of the description it carries today, which describes the encoding but never the meaning — so an implementation that reads a UTC value as local time, four hours early in the UAE, is no longer conformant. The proposal now passes to the standards team for incorporation into V2.2.`
  }
  if (rejected.value) {
    return `Rejected — ${c.for} votes in favour, ${n(c.against)} against, ${n(c.abstain)} abstaining. No shared AEDateTime component will be introduced, and the date-time definitions across the specifications remain as they are today. The proposal is closed in its current form.`
  }
  return 'The tally for this proposal is loading from the proposals service.'
})

// Seal colours flip with the verdict.
const seal = computed(() =>
  approved.value ? 'var(--at-teal-deep, #008B78)' : rejected.value ? '#A6391F' : 'var(--at-navy)',
)
const sealTint = computed(() =>
  approved.value ? 'rgba(0, 194, 169, 0.12)' : rejected.value ? 'rgba(166, 57, 31, 0.08)' : 'rgba(0, 39, 127, 0.06)',
)

const sharedYaml = `    AEDateTime:
      title: AEDateTime
      description: |
        An instant in time, per ISO 8601 / RFC 3339, with a mandatory offset.

        Recipients MUST apply the offset, and MUST NOT read the date and time
        components as local time. Encodings of the same instant are equivalent and
        MUST behave identically: \`2027-07-22T00:00:00Z\` and \`2027-07-22T04:00:00+04:00\`
        are the same value.

        Producers SHOULD emit UTC (\`Z\` or \`+00:00\`), and MUST NOT use \`-00:00\`.
        Fractional seconds are optional.
      type: string
      format: date-time
      example: "2027-07-22T00:00:00Z"`

const fieldYaml = `    AEConsentExpirationDateTime:
      allOf:
        - $ref: '#/components/schemas/AEDateTime'
        - description: Specified date and time the consent will expire.`
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
              <span class="po-badge__w">{{ approved ? 'Approved' : rejected ? 'Rejected' : 'Pending' }}</span>
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

          <div v-if="approved" class="po-detail">
            <p>
              The approved change adds a single <strong>shared <code>AEDateTime</code> schema</strong> to each
              specification and replaces the near-identical description carried by roughly twenty date-time
              schemas with a <strong>reference to it</strong>. Each field keeps its own field-specific
              description alongside the reference. A short <strong>normative section</strong> is added to each
              specification's <code>info.description</code>, so the rule is discoverable without reading a schema
              and certification has a single place to point at.
            </p>
            <p>
              <strong>It is not a breaking change.</strong> <code>type: string</code> and
              <code>format: date-time</code> are unchanged, so the wire format and schema validation are
              identical before and after. Every implementation that is conformant today on the wire stays
              conformant on the wire. What changes is what the standard says a value <em>means</em>:
              <code>2027-07-22T00:00:00Z</code> and <code>2027-07-22T04:00:00+04:00</code> are the same instant,
              and an implementation that behaves differently for the two is now non-conformant rather than
              merely unwise.
            </p>
            <p>
              <strong>No schema enforcement is added at V2.2 by this decision.</strong> Producers
              <em>SHOULD</em> emit UTC; the <code>-00:00</code> prohibition is stated in the component text.
              Neither the candidate pattern that would reject <code>-00:00</code> nor the stricter option of
              requiring UTC by schema is part of the approved text. No API Hub behaviour changes, and no normalisation is introduced on the request
              path.
            </p>
          </div>
          <div v-else-if="rejected" class="po-detail">
            <p>
              The specifications are <strong>unchanged</strong>. Each date-time field keeps its existing
              description, and <code>type</code>, <code>format</code>, and validation are as they are today. No
              action is required from LFIs or TPPs.
            </p>
          </div>

          <!-- Handover / rollout note -->
          <div v-if="approved" class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              The proposal is now <strong>handed over to the standards team for incorporation into V2.2</strong>.
              The detail of how the change is applied across each specification will be communicated through the
              <RouterLink to="/tech/release-notes-and-erratas/">V2.2 changelog and release notes</RouterLink> — this
              page will not be updated with a schedule. Because the change is wire-identical, no participant is
              required to change anything on a date. An LFI or TPP that reads the date and time components as
              local time should, however, expect that behaviour to fall outside V2.2, and can check its
              implementation against the equivalence example and the
              <RouterLink to="/proposals/ofp-014/knowledge-base-article">Date &amp; Time Handling</RouterLink>
              article in the meantime.
            </p>
          </div>
          <div v-else-if="rejected" class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              The proposal is <strong>closed</strong>. Nothing is carried into V2.2 from it. Any revised approach
              to date-time semantics would be brought forward as a <strong>new proposal</strong> and put to a
              separate vote.
            </p>
          </div>

          <!-- The resulting change -->
          <div v-if="approved" class="po-spec">
            <h3 class="po-h">
              The change
              <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
            </h3>
            <p class="po-spec__lede">
              One new schema, and a reference from every date-time field. Taking
              <code>AEConsentExpirationDateTime</code> as the worked example; the same treatment applies to every
              date-time field across data sharing, service initiation, confirmation of payee, insurance, and the
              consent specifications.
            </p>

            <div class="po-code">
              <div class="po-code__label">The shared component — added once</div>
              <pre class="po-code__pre">{{ sharedYaml }}</pre>
            </div>
            <div class="po-code">
              <div class="po-code__label">Each field — reference plus its own description</div>
              <pre class="po-code__pre">{{ fieldYaml }}</pre>
            </div>

            <div class="po-rules">
              <div class="po-rules__label">What the component establishes · normative from V2.2</div>
              <ul class="po-rules__list">
                <li>
                  <strong>A date-time is an instant.</strong> The offset is part of the value. Recipients MUST
                  apply it and MUST NOT read the date and time components as local time.
                </li>
                <li>
                  <strong>Equivalent encodings MUST behave identically.</strong>
                  <code>2027-07-22T00:00:00Z</code> and <code>2027-07-22T04:00:00+04:00</code> are the same value.
                </li>
                <li>
                  <strong>Producers SHOULD emit UTC</strong> — <code>Z</code> or <code>+00:00</code>. Non-UTC
                  offsets such as <code>+04:00</code> remain valid.
                </li>
                <li>
                  <strong><code>-00:00</code> MUST NOT be used.</strong> Stated in the component text; not
                  enforced by schema at V2.2.
                </li>
                <li>
                  <strong>Fractional seconds are optional</strong>, at unspecified precision — recipients must
                  accept their presence or absence, and must not compare these values as strings.
                </li>
                <li>
                  <strong>Published alongside</strong> — the knowledge base article
                  <RouterLink to="/proposals/ofp-014/knowledge-base-article">Date &amp; Time Handling Across the Standard</RouterLink>,
                  which explains how to satisfy the rule.
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
.po-note__p a,
.po-rules__list a { color: var(--at-teal-deep, #008b78); text-decoration: none; border-bottom: 1px solid currentColor; }
.po-note__p a:hover,
.po-rules__list a:hover { color: var(--at-navy-deep); }

.po-spec { margin-top: 44px; }
.po-spec__lede {
  font-size: 15.5px;
  line-height: 1.68;
  color: var(--at-navy);
  max-width: 52rem;
  margin: 0 0 20px;
  text-wrap: pretty;
}

/* code blocks (mirror the proposal's ofp-code block) */
.po-code {
  max-width: 52rem;
  margin: 0 0 20px;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}
.po-code__label {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy);
  opacity: 0.7;
  padding: 10px 16px;
  border-bottom: 1px solid var(--at-grid-line);
}
.po-code__pre {
  margin: 0;
  padding: 16px;
  font-family: var(--at-mono);
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--at-navy-deep);
  overflow-x: auto;
  white-space: pre;
}

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
