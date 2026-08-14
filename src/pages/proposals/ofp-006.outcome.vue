<script setup lang="ts">
// Outcome of Proposal — OFP-006. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed. This is a decision RECORD: the
// verdict, the rationale, and what happens next are authored here; the numeric
// tally is pulled LIVE from the proposals API so the headline metrics always
// match the "Votes Received & Feedback" tab.
//
// OFP-006 is the first proposal to close DEFERRED rather than approved or
// rejected, so the seal carries a third state. Every vote cast was in favour,
// but §05 of the proposal set an explicit bar — the API Hub work only goes ahead
// if a significant part of the ecosystem would actually use it — and a 6-of-24
// turnout whose answers were uniformly prospective does not clear it. The
// verdict is therefore about timing and evidence, not about merit, and the
// gold seal has to read that way rather than as a rejection.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-006',
  ref: 'DR-2026-006',
  verdict: 'deferred' as 'approved' | 'rejected' | 'deferred',
  title: 'Carry the requested API version into the Ozone Connect path',
  category: 'API Hub · Request routing',
  decisionDate: '10 Aug 2026',
  // When the decision will be re-tested; '' to omit the pill.
  revisit: 'the next major version transition',
  proposedBy: 'Nebras',
  summary:
    'Deferred. Every vote cast was in favour — 6 for, none against, none abstaining — but only 6 of 24 eligible voters took part, and the answers behind those votes described a problem LFIs expect to have rather than one they have. Only one LFI dual-runs concurrent versions today, and it has already built the header-parsing workaround this proposal would replace. Section 05 set the bar explicitly: a change on the API Hub request path only pays for itself if a significant part of the ecosystem would actually use it. The vote established consensus that the path is the right place to carry the version; it did not establish that the work is needed now. The engineering is therefore not being scheduled, and Nebras will bring the question back at the next major version transition, when concurrent dual-running becomes an obligation under the Major Version Deprecation Policy rather than a plan.',
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
const deferred = computed(() => record.verdict === 'deferred')

// Verdict label + glyph. Deferred takes a double-bar (a hold, not a cross).
const verdictLabel = computed(() =>
  approved.value ? 'Approved' : deferred.value ? 'Deferred' : 'Rejected',
)
const verdictGlyph = computed(() => (approved.value ? '✓' : deferred.value ? '‖' : '✕'))

// Seal colours follow the verdict: teal approved, gold deferred, red rejected.
const seal = computed(() =>
  approved.value ? 'var(--at-teal-deep, #008B78)' : deferred.value ? '#B37819' : '#A6391F',
)
const sealTint = computed(() =>
  approved.value
    ? 'rgba(0, 194, 169, 0.12)'
    : deferred.value
      ? 'rgba(179, 120, 25, 0.12)'
      : 'rgba(166, 57, 31, 0.08)',
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
              <span class="po-seal__glyph">{{ verdictGlyph }}</span>
            </div>
            <div class="po-verdict__text">
              <div class="po-verdict__label">
                {{ verdictLabel }}
                <span v-if="approved" class="po-verdict__chip">Ratified</span>
                <span v-else-if="deferred" class="po-verdict__chip">No decision taken</span>
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
              <span class="po-badge__g">{{ verdictGlyph }}</span>
              <span class="po-badge__w">{{ verdictLabel }}</span>
            </div>
            <div class="po-metrics__cap">Final decision</div>
          </div>
          <div class="po-metrics__cell">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">{{ pct }}%</div>
            <div class="po-metrics__cap">In favour · of votes cast</div>
          </div>
          <div class="po-metrics__cell">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">
              {{ counts.total }}<span class="po-metrics__denom">/{{ voterTotal }}</span>
            </div>
            <div class="po-metrics__cap">Total votes</div>
          </div>
          <div class="po-metrics__cell po-metrics__cell--hl">
            <div class="po-metrics__bar" />
            <div class="po-metrics__num">{{ turnout }}%</div>
            <div class="po-metrics__cap">Participation</div>
          </div>
        </div>
      </div>

      <!-- ── Body: summary + what the decision means ───────────────────────── -->
      <div class="po-body">
        <div>
          <div class="po-seclabel">§ Decision summary</div>
          <p class="po-summary">{{ record.summary }}</p>

          <div class="po-detail">
            <p>
              <strong>The vote was unanimous but shallow.</strong> Six LFIs voted, all in favour, and none
              asked for the proposal to be amended. Participation was the lowest of any proposal to date —
              a quarter of eligible voters — and two of the six answered neither question on the form. A
              proposal that asks the ecosystem to justify a build cannot treat silence as demand.
            </p>
            <p>
              <strong>Where voters did answer, the need was prospective.</strong> Two LFIs said they would
              adopt the token only for new versions; one said it is not running concurrent versions at all
              and would revisit when it does; another said its plan is a single implementation that stays
              backward compatible with the prior version rather than two deployments side by side. None of
              those positions is an argument against the mechanism. All of them describe a problem that
              begins at the next major version transition, not one that exists now.
            </p>
            <p>
              <strong>The one LFI that dual-runs today has already solved it.</strong> It intercepts
              <code>o3-api-uri</code>, substitutes the version into its own internal path, and routes on
              that — precisely the workaround the proposal set out to remove, already built, in production,
              and working. That is the single most consequential answer in the vote. The proposal's premise
              is that the workaround is a cost LFIs are carrying; the only LFI actually carrying it has paid
              that cost once and is not asking to be relieved of it.
            </p>
            <p>
              <strong>Section 05 of the proposal committed Nebras to this outcome in advance.</strong> It
              stated that a vote in favour had to mean an institution would <em>use</em> the token, not
              merely that it seemed like a good idea, and that if the answers showed LFIs would keep routing
              on the header, the work would not be scheduled. Holding to that is what makes the question
              worth asking. Reading six prospective yes votes as a mandate for a change on the hot path of
              every proxied request in the ecosystem would make the exercise decorative.
            </p>
            <p>
              <strong>Nothing changes for any LFI or TPP.</strong> The <code>o3-api-uri</code> header
              remains the routing signal, the configured API family base path remains a static string, and
              the <RouterLink to="/policy/lfi-deprecation">Major Version Deprecation Policy</RouterLink> is
              unchanged — including the concurrent-running obligation it places on an LFI at each major
              version transition. No LFI needs to revise a design or a roadmap because of this decision.
            </p>
          </div>

          <!-- Handover / revisit note -->
          <div class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              <strong>There is no implementation timeline, because there is no implementation.</strong> One
              voter asked when the change would land if supported; the answer is that it has not been
              scheduled and will not appear in an API Hub release. Nebras will <strong>bring OFP-006 back at
              the next major version transition</strong>, when dual-running stops being a plan and becomes
              an obligation — at that point LFIs will be answering from experience rather than from
              intention, and the evidence will mean something. The proposal is deferred on timing and
              evidence, <strong>not rejected on merit</strong>: no voter argued against the mechanism, and
              Nebras expects to build it when the demand is real.
            </p>
          </div>

          <!-- Where this leaves dual-running today -->
          <div class="po-spec">
            <h3 class="po-h">
              Where this leaves dual-running
              <span v-if="record.revisit" class="po-next__eff">Revisited at {{ record.revisit }}</span>
            </h3>
            <p class="po-spec__lede">
              No configuration, header, schema, or endpoint changes as a result of this decision. An LFI
              planning for a major version transition should design against the position below, which is
              the same position that applied before the proposal was raised.
            </p>
            <div class="po-rules">
              <div class="po-rules__label">The position today · unchanged by this decision</div>
              <ul class="po-rules__list">
                <li>
                  <strong>The version reaches Ozone Connect in the <code>o3-api-uri</code> header</strong>,
                  which carries the parameterised URL the TPP called. This remains the supported routing
                  signal for an LFI serving concurrent versions.
                </li>
                <li>
                  <strong>The API family base path stays a static string</strong>, configured per
                  environment at
                  <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific onboarding</RouterLink>
                  and prepended verbatim to every request in that family. No substitution token is
                  recognised.
                </li>
                <li>
                  <strong>Parsing the header and substituting the version into an internal path is a valid
                  pattern</strong>, and is what the one LFI dual-running in production does today. It is not
                  a workaround Nebras intends to deprecate.
                </li>
                <li>
                  <strong>The concurrent-running obligation is unchanged.</strong> An LFI going live with a
                  new major version must still run the prior and new versions side by side for the whole
                  deprecation window, routing each TPP request to the correct implementation.
                </li>
              </ul>
            </div>

            <!-- What would change the answer -->
            <div class="po-rules po-rules--muted">
              <div class="po-rules__label">What would change the answer</div>
              <ul class="po-rules__list">
                <li>
                  <strong>LFIs actually dual-running.</strong> The decisive weakness in the vote was that
                  almost no one is. Once several LFIs are running two versions concurrently and answering
                  from operational experience, the same two questions produce evidence rather than
                  intention.
                </li>
                <li>
                  <strong>A concrete case header routing cannot serve.</strong> No voter described one. An
                  LFI that hits a dual-running problem it cannot solve by parsing <code>o3-api-uri</code>
                  should raise it through the Service Desk, and it will reopen this proposal on its own
                  merits rather than waiting for the next transition.
                </li>
                <li>
                  <strong>Adoption at scale rather than in principle.</strong> Two LFIs said they would use
                  the token only for new versions and one said it would treat the header as informational.
                  A material number of LFIs committing to route on the path — for versions they are already
                  running — is what clears the bar Section 05 set.
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
/* Approved reads as a ratified stamp: filled disc, white check, double ring.
   Deferred deliberately keeps the outlined ring — a hold, not a stamp. */
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
.po-detail em { font-style: italic; }
.po-detail a,
.po-rules__list a {
  color: var(--at-teal-deep, #008b78);
  text-decoration: underline;
  text-underline-offset: 3px;
}
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

/* the resulting position */
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

/* rule blocks (mirror the proposal's ofp-rules block) */
.po-rules {
  max-width: 52rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--seal);
  background: var(--at-surface);
  padding: 20px 24px;
}
/* the conditions block sits below the position and reads as secondary */
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
