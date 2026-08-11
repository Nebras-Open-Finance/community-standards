<script setup lang="ts">
// Outcome of Proposal — OFP-007. Rendered inside the "Outcome of Proposal" tab
// (see PvProposalTabs) once voting has closed. This is a decision RECORD: the
// verdict, the rationale, and the resulting change are authored here; the
// numeric tally is pulled LIVE from the proposals API so the headline metrics
// always match the "Votes Received & Feedback" tab.
//
// OFP-007 changes no API, no schema, and nothing on the request path — it adds a
// read-only view in the Admin Portal — so there is no reference YAML to import.
// The change is shown as what the Configuration section will hold instead, with
// the follow-ups raised in the vote recorded alongside it.
import { computed } from 'vue'
import { useProposals, tallyOf } from '@/composables/useProposals'

const { voterTotal } = useProposals()

// ── Authored decision record (edit these) ────────────────────────────────────
const record = {
  id: 'OFP-007',
  ref: 'DR-2026-007',
  verdict: 'approved' as 'approved' | 'rejected',
  title: 'Show an LFI its own API Hub configuration in the Admin Portal',
  category: 'Admin Portal · Transparency',
  decisionDate: '3 Aug 2026',
  // A label (or date) for when the decision takes effect; '' to omit the pill.
  effective: 'a future API Hub release',
  proposedBy: 'Nebras',
  ratifiedBy: 'Nebras Standards Working Group',
  summary:
    'Approved as proposed, and unanimously — 13 votes in favour, none against, none abstaining. A read-only Configuration section will be added to the Admin Portal, showing the effective connectivity and application layer authentication configuration the API Hub actually holds for that hub and environment, including the worked forwarded URL for each API family. Today that state exists only as a chain of Service Desk tickets an LFI has to find, order, and replay — where missing one gives a wrong answer that looks exactly like a right one. The proposal now passes to engineering for implementation.',
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
                <span v-if="approved" class="po-verdict__chip">Ratified</span>
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
              The approved change adds a <strong>Configuration section to the Admin Portal</strong>, scoped —
              as the portal already is — to <strong>one API Hub and one environment</strong>. It is generated
              from the <strong>live configuration the API Hub enforces</strong> at proxy time, not from a
              stored copy of the onboarding submission, so it cannot drift from the running configuration.
              A multi-brand LFI opens each brand's portal and sees that brand's values, which is precisely
              the distinction that is hardest to hold onto across ticket threads.
            </p>
            <p>
              <strong>No editing capability is introduced.</strong> Every value on the page is read-only.
              Configuration continues to be submitted and changed exactly as it is today, through the Service
              Desk, with Nebras's end-to-end connectivity validation unchanged. The vote showed clear appetite
              for editing some of these fields directly, and that will be taken forward as a
              <strong>separate proposal</strong> with the roles, approval, and validation model worked through
              properly — it is not part of this decision.
            </p>
            <p>
              Nothing on the request path changes. The Ozone Connect contract, the headers, the schemas, the
              TPP-facing API, and the onboarding process are all untouched, and neither LFIs nor TPPs have
              anything to implement. Certificates remain out of scope: the Trust Framework is their system of
              record, and a second view of them would raise the question of which is authoritative.
            </p>
          </div>

          <!-- Handover / rollout note -->
          <div class="po-note">
            <div class="po-note__k">What happens next</div>
            <p class="po-note__p">
              The proposal is now <strong>handed over to engineering for implementation</strong>. Delivery
              timings, and the detail of how the change is incorporated, will be communicated through the
              relevant <strong>API Hub release notes</strong> — this page will not be updated with a schedule.
              No action is required from LFIs or TPPs in the meantime.
            </p>
          </div>

          <!-- The resulting change: what the Configuration section will hold -->
          <div class="po-spec">
            <h3 class="po-h">
              The change
              <span v-if="record.effective" class="po-next__eff">This change will be made in {{ record.effective }}</span>
            </h3>
            <p class="po-spec__lede">
              No new fields, endpoints, or schemas — a read model over configuration the API Hub already
              holds, rendered in a portal an LFI already signs in to, behind Trust Framework SSO it already
              uses. Field names follow the
              <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">onboarding documentation</RouterLink>
              so the two read as one thing.
            </p>
            <div class="po-rules">
              <div class="po-rules__label">Shown in the Admin Portal · read-only, per hub and per environment</div>
              <ul class="po-rules__list">
                <li>
                  <strong>Ozone Connect Base URL</strong> — the base URL the API Hub forwards to for this
                  environment.
                </li>
                <li>
                  <strong>Authorization Endpoint</strong> — the OIDC authorisation URL the customer is
                  redirected to, or an explicit indication that the LFI has adopted <strong>CAAP</strong> and
                  therefore provides none.
                </li>
                <li>
                  <strong>Application layer authentication method</strong> — mTLS only, API Key, Client
                  Credentials Grant, or JWT Auth, with its configured sub-settings.
                </li>
                <li>
                  <strong>API family base paths</strong> — one row per family, showing the configured path
                  <em>or</em> an explicit “not set”, and beside it the <strong>effective forwarded URL</strong>
                  worked through against the base URL.
                </li>
                <li>
                  <strong>Instance identifiers and allocated values</strong> — LFI Code, LFI Organisation ID,
                  the Ozone-allocated domains for the environment, and the API Hub egress IP addresses to
                  allowlist.
                </li>
              </ul>
            </div>

            <!-- Follow-ups the vote produced, recorded but not part of this decision -->
            <div class="po-rules po-rules--muted">
              <div class="po-rules__label">Raised in the vote · carried forward separately</div>
              <ul class="po-rules__list">
                <li>
                  <strong>Restrict the section by role before release.</strong> Portal access is not
                  role-differentiated today, so an LFI asked that backend URLs, internal paths, and egress IPs
                  be limited to the technical roles. Carried into implementation as a requirement.
                </li>
                <li>
                  <strong>Editing these values in the portal.</strong> Four of the five voters who answered
                  the question wanted it, naming API family base paths, endpoint URLs, and the LFI redirect
                  URL (C3) — every one of them conditioned on maker-checker or four-eyes approval, a
                  restricted role, audit logging, and controlled promotion to production. To be brought
                  forward as its own proposal.
                </li>
                <li>
                  <strong>Log search by Interaction ID</strong>, with keyword search within a single request
                  journey. Not configuration; recorded and taken up on its own merits.
                </li>
                <li>
                  <strong>Replace the mock-bank placeholder</strong> with the LFI's own base URL wherever it
                  appears. A documentation and portal-copy fix, handled outside this proposal.
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
/* Approved reads as a ratified stamp: filled disc, white check, double ring. */
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

/* rule blocks (mirror the proposal's ofp-rules block) */
.po-rules {
  max-width: 52rem;
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--seal);
  background: var(--at-surface);
  padding: 20px 24px;
}
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
