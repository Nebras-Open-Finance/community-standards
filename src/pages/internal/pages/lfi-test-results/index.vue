<route lang="yaml">
meta:
  layout: internal
  title: LFI test results
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// LFI test results — read-only viewer for the runs recorded by LFI functional
// testing, from /lfi-testing/runs on the proposals API (standards-api). Layout,
// sign-in states and tokens follow the LFI functional testing page. Access is
// the Sandbox Trust Framework SSO from useSandboxAuth, restricted to Nebras
// staff. The chosen LFI and the open run are kept in the URL (?lfi=&run=) so a
// run can be shared as a link. Field names only: response values (the API's
// call excerpts) are never shown here. The run's inputs are, labelled from the
// test catalogue.

import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { LFIS, lfiTestInputRows } from '@/composables/useLfiTesting'
import { useLfiTestResults, type SpecField, type SpecReport } from '@/composables/useLfiTestResults'

useHead({ title: 'LFI test results' })

const {
  auth, allowed, sessionLost, accessError, loadMe, signIn,
  loadTests, testTitle, testOf,
  lfiCode, runId, selectLfi, runQuery, closeRun,
  runs, nextBefore, listFor, listLoading, moreLoading, listError, counts, loadMore, refreshRuns, retryRuns,
  run, runLoading, runError, refreshRun,
} = useLfiTestResults()

onMounted(() => {
  void loadMe()
  void loadTests()
})

const who = computed(() => auth.value.name || auth.value.email || 'your Sandbox Trust Framework account')
const lfiName = computed(() => LFIS.find((l) => l.code === lfiCode.value)?.name ?? lfiCode.value)

// ── Formatting ───────────────────────────────────────────────────────────────
function fmtMs(ms: number | null | undefined): string {
  if (ms === null || ms === undefined || !Number.isFinite(ms)) return ''
  if (ms < 1000) return `${Math.round(ms)} ms`
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)} s`
  const total = Math.round(ms / 1000)
  return `${Math.floor(total / 60)} min ${total % 60} s`
}

function fmtWhen(iso: string | null | undefined, seconds = false): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: seconds ? 'medium' : 'short' })
}

function shortId(id: string | null | undefined): string {
  return id ? id.slice(0, 8) : ''
}

// ── Copying IDs ──────────────────────────────────────────────────────────────
/** Which button last copied, for its "Copied" label. */
const copied = ref<'id' | 'link' | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

async function copy(what: 'id' | 'link', text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    return
  }
  copied.value = what
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copied.value = null }, 2000)
}

/** The page URL already names the open run (?lfi=&run=), so it is the link. */
function copyLink(): void {
  void copy('link', window.location.href)
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`
}

/** Status → colour family shared by pills, step rows and the verdict banner. */
function tone(status: string | null | undefined): 'pass' | 'fail' | 'error' | 'run' | 'skip' {
  if (status === 'passed') return 'pass'
  if (status === 'failed') return 'fail'
  if (status === 'error') return 'error'
  if (status === 'running') return 'run'
  return 'skip'
}

function httpTone(status: number | null): 'ok' | 'bad' | '' {
  if (status === null) return ''
  if (status >= 200 && status < 300) return 'ok'
  return status >= 400 ? 'bad' : ''
}

/** The URL as host (shown small) and path with any query string. */
function splitUrl(url: string): { host: string; path: string } {
  try {
    const u = new URL(url)
    return { host: u.host, path: `${u.pathname}${u.search}` }
  } catch {
    return { host: '', path: url }
  }
}

/**
 * 'Data.Account[].AccountId' → [['Data.', 'Account[].'], 'AccountId']: the parent
 * segments (shown muted, with a line-break opportunity after each dot) and the leaf.
 */
function splitPath(path: string): [string[], string] {
  const parts = path.split('.')
  const leaf = parts.pop() ?? ''
  return [parts.map((p) => `${p}.`), leaf]
}

// ── Spec check ───────────────────────────────────────────────────────────────
/** "0 of 2", or "—" when the parent object was not returned at all. */
function returnedText(f: SpecField): string {
  return f.of === 0 ? '—' : `${f.returned} of ${f.of}`
}

/** A required field some returned parent object did not carry. */
function missingRequired(f: SpecField): boolean {
  return f.required && f.of > 0 && f.returned < f.of
}

function specBadge(s: SpecReport): string {
  if (s.matches) return 'Matches'
  return s.problemCount ? plural(s.problemCount, 'problem') : 'Does not match'
}

/**
 * Problems not already shown against a field row: the whole response (path ''),
 * or a path that, with its array indexes removed, is not a listed field carrying
 * that same message.
 */
function otherProblems(s: SpecReport): { path: string; message: string }[] {
  const byField = new Map(s.fields.map((f) => [f.path, f.problems]))
  return s.problems.filter((p) => {
    if (!p.path) return true
    return !byField.get(p.path.replace(/\[\d+\]/g, '[]'))?.includes(p.message)
  })
}

// ── List ─────────────────────────────────────────────────────────────────────
const listReady = computed(() => listFor.value === lfiCode.value)

const summary = computed(() => {
  const n = runs.value.length
  const c = counts.value
  const parts = [`${c.passed} passed`, `${c.failed} failed`, plural(c.error, 'error')]
  if (c.running) parts.push(`${c.running} running`)
  return nextBefore.value
    ? `${parts.join(', ')} of the ${n} loaded.`
    : `${plural(n, 'run')}: ${parts.join(', ')}.`
})

// ── Detail ───────────────────────────────────────────────────────────────────
const verdict = computed(() => {
  const r = run.value
  if (!r) return ''
  const steps = r.steps
  if (r.status === 'running') {
    // Steps are recorded as they finish; those to come are `pending`. Refresh reads it again.
    const done = steps.filter((s) => s.status !== 'pending').length
    return steps.length ? `Still running: ${done} of ${steps.length} steps finished.` : 'Still running.'
  }
  if (r.status === 'passed') {
    const passed = steps.filter((s) => s.status === 'passed').length
    const warned = steps.reduce((n, s) => n + (s.warnings?.length ?? 0), 0)
    const note = warned ? `, with ${warned} warning${warned === 1 ? '' : 's'}` : ''
    return `Passed${note}. ${passed} of ${steps.length} steps passed.`
  }
  const at = steps.findIndex((s) => s.status === 'failed' || s.status === 'error')
  const where = at === -1 ? '' : ` at step ${at + 1}: ${steps[at]?.title ?? ''}`
  if (r.status === 'failed') return `Failed${where}.`
  return `The run could not complete${where}.`
})

/** The run's inputs, labelled from the catalogue (raw keys where it has no label). */
const runInputRows = computed(() => (run.value ? lfiTestInputRows(testOf(run.value.testId), run.value.inputs) : []))

const specTally = computed(() => {
  let checked = 0
  let matched = 0
  for (const s of run.value?.steps ?? []) {
    for (const c of s.calls) {
      if (!c.spec) continue
      checked++
      if (c.spec.matches) matched++
    }
  }
  return { checked, matched }
})

// Opening a run swaps the list for the run; closing it returns to the run's row.
const detailHeading = ref<HTMLElement | null>(null)

watch(runId, async (id, old) => {
  await nextTick()
  if (id) {
    detailHeading.value?.closest('section')?.scrollIntoView({ block: 'start' })
    detailHeading.value?.focus({ preventScroll: true })
  } else if (old) {
    const row = document.getElementById(`tr-run-${old}`)
    row?.scrollIntoView({ block: 'center' })
    row?.focus({ preventScroll: true })
  }
})
</script>

<template>
  <div class="tr">
    <div class="tr__eyebrow">API Hub</div>
    <h1 class="tr__title">LFI Test Results</h1>
    <p class="tr__lede">
      Every functional test run against an LFI through the API Hub, newest first. Responses the
      tests receive through the API Hub are checked against the Open Finance OpenAPI
      specification: each check lists the fields the specification defines and whether the LFI
      returned them.
    </p>
    <p class="tr__lede tr__lede--small">
      Field names only — this page never shows response values. Runs are started from
      <RouterLink to="/internal/pages/lfi-testing">LFI functional testing</RouterLink>.
    </p>

    <!-- The page's last child takes the site's before-footer padding (base.css),
         so the cards sit in a plain wrapper rather than the last card taking it. -->
    <div class="tr__body">
      <!-- Sign in -->
      <section class="tr__card" aria-labelledby="tr-signin-h">
        <h2 id="tr-signin-h" class="tr__h2">Sign in</h2>

        <p v-if="!auth.loaded" class="tr__note">Checking your session…</p>

        <p v-else-if="auth.blocked" class="tr__error">
          This Sandbox Trust Framework account is blocked and cannot see test results.
        </p>

        <template v-else-if="!auth.authenticated || sessionLost">
          <p v-if="sessionLost" class="tr__error">Your session has expired. Sign in again.</p>
          <div class="tr__row">
            <span class="tr__hint">
              Test results are for Nebras staff. Sign in with your Sandbox Trust Framework account
              to see them.
            </span>
            <button type="button" class="tr__go" @click="signIn">
              Sign in with the Sandbox Trust Framework
            </button>
          </div>
        </template>

        <template v-else-if="!auth.isAdmin">
          <p class="tr__note">Signed in as <strong>{{ who }}</strong>.</p>
          <p class="tr__error">Test results are restricted to Nebras staff.</p>
        </template>

        <template v-else>
          <p class="tr__ok">Signed in as {{ who }}.</p>
          <p v-if="accessError" class="tr__error">{{ accessError }}</p>
        </template>
      </section>

      <template v-if="allowed">
        <!-- LFI -->
        <section class="tr__card" aria-labelledby="tr-lfi-label">
          <div>
            <div id="tr-lfi-label" class="tr__label">LFI</div>
            <div class="tr__envs" role="radiogroup" aria-labelledby="tr-lfi-label">
              <button
                v-for="l in LFIS"
                :key="l.code"
                type="button"
                role="radio"
                class="tr__env"
                :class="{ 'tr__env--on': lfiCode === l.code }"
                :aria-checked="lfiCode === l.code"
                @click="selectLfi(l.code)"
              >
                {{ l.name }}
                <code class="tr__envcode">{{ l.code }}</code>
              </button>
            </div>
          </div>
        </section>

        <!-- Runs -->
        <section v-if="!runId" class="tr__card" aria-labelledby="tr-runs-h">
          <div class="tr__row">
            <div class="tr__summary">
              <h2 id="tr-runs-h" class="tr__h2">Runs</h2>
              <p v-if="listReady && runs.length" class="tr__hint" aria-live="polite">{{ summary }}</p>
            </div>
            <button
              v-if="listReady || listError"
              type="button"
              class="tr__pick"
              :disabled="listLoading || moreLoading"
              @click="refreshRuns"
            >
              {{ listLoading ? 'Refreshing…' : 'Refresh' }}
            </button>
          </div>

          <p v-if="listLoading && !runs.length" class="tr__note">Loading runs…</p>

          <p v-else-if="listReady && !runs.length && !listError" class="tr__empty">
            No functional tests have been run against {{ lfiName }} yet.
          </p>

          <ul v-if="runs.length" class="tr__runs">
            <li v-for="r in runs" :key="r.id">
              <RouterLink
                :id="`tr-run-${r.id}`"
                class="tr__rrow"
                :to="{ query: runQuery(r.id) }"
                replace
              >
                <span class="tr__pill" :class="`tr__pill--${tone(r.status)}`">{{ r.status }}</span>
                <span class="tr__rmain">
                  <span class="tr__rtitle">{{ testTitle(r.testId) }}</span>
                  <span class="tr__rmeta">Run <code>{{ r.id }}</code></span>
                  <span class="tr__rmeta">
                    <time :datetime="r.startedAt">{{ fmtWhen(r.startedAt) }}</time><template v-if="r.runBy"> · by {{ r.runBy }}</template>
                  </span>
                </span>
                <span class="tr__rdur">{{ fmtMs(r.durationMs) || (r.status === 'running' ? 'Running' : '—') }}</span>
              </RouterLink>
            </li>
          </ul>

          <div v-if="listError" class="tr__error">
            <p class="tr__errline">{{ listError }}</p>
            <button type="button" class="tr__pick" @click="retryRuns">Retry</button>
          </div>

          <div v-if="nextBefore && runs.length" class="tr__more">
            <button type="button" class="tr__pick" :disabled="moreLoading || listLoading" @click="loadMore">
              {{ moreLoading ? 'Loading…' : 'Load more' }}
            </button>
          </div>
        </section>

        <!-- Run -->
        <section v-else class="tr__card" aria-labelledby="tr-run-h">
          <div class="tr__row">
            <button type="button" class="tr__pick" @click="closeRun">← All runs</button>
            <button
              v-if="run?.status === 'running' || runError"
              type="button"
              class="tr__pick"
              :disabled="runLoading"
              @click="refreshRun"
            >
              {{ runLoading ? 'Refreshing…' : runError ? 'Retry' : 'Refresh' }}
            </button>
          </div>

          <h2 id="tr-run-h" ref="detailHeading" class="tr__sr" tabindex="-1">
            Run {{ runId }}
          </h2>

          <p v-if="runLoading && !run" class="tr__note">Loading run <code>{{ shortId(runId) }}</code>…</p>
          <p v-else-if="runError" class="tr__error">{{ runError }}</p>

          <template v-if="run">
            <!-- Verdict -->
            <div class="tr__verdict" :class="`tr__verdict--${tone(run.status)}`" aria-live="polite">
              <div class="tr__vhead">
                <span class="tr__pill" :class="`tr__pill--${tone(run.status)}`">{{ run.status }}</span>
                <p class="tr__vtext">{{ verdict }}</p>
              </div>
              <p v-if="run.error" class="tr__verr">{{ run.error }}</p>
              <dl class="tr__facts">
                <dt>Test</dt>
                <dd>
                  {{ testTitle(run.testId) }}<template v-if="run.testVersion"> v{{ run.testVersion }}</template>
                  · <code>{{ run.testId }}</code>
                </dd>
                <dt>When</dt>
                <dd><time :datetime="run.startedAt">{{ fmtWhen(run.startedAt, true) }}</time></dd>
                <dt>Duration</dt>
                <dd>{{ fmtMs(run.durationMs) || (run.status === 'running' ? 'Running' : '—') }}</dd>
                <dt>Environment</dt>
                <dd>{{ run.lfiCode }} ({{ run.environment }})</dd>
                <template v-if="run.runBy">
                  <dt>Run by</dt>
                  <dd>{{ run.runBy }}</dd>
                </template>
                <dt>Run ID</dt>
                <dd class="tr__idrow">
                  <code>{{ run.id }}</code>
                  <button type="button" class="tr__mini" @click="copy('id', run.id)">
                    {{ copied === 'id' ? 'Copied' : 'Copy ID' }}
                  </button>
                  <button type="button" class="tr__mini" @click="copyLink">
                    {{ copied === 'link' ? 'Copied' : 'Copy link' }}
                  </button>
                </dd>
              </dl>
              <p v-if="specTally.checked" class="tr__hint tr__hint--flush">
                Spec check: {{ specTally.matched }} of {{ plural(specTally.checked, 'response') }}
                matched the specification.
              </p>
            </div>

            <!-- Inputs -->
            <div v-if="runInputRows.length" class="tr__inputs" role="group" aria-labelledby="tr-inputs-h">
              <div id="tr-inputs-h" class="tr__sublabel">Inputs</div>
              <dl class="tr__facts">
                <template v-for="row in runInputRows" :key="row.id">
                  <dt>{{ row.label }}</dt>
                  <dd><code>{{ row.value }}</code></dd>
                </template>
              </dl>
            </div>

            <!-- Steps -->
            <ol class="tr__steps">
              <li
                v-for="(step, i) in run.steps"
                :key="`${i}-${step.id}`"
                class="tr__step"
                :class="`tr__step--${tone(step.status)}`"
              >
                <div class="tr__steptop">
                  <span class="tr__pill" :class="`tr__pill--${tone(step.status)}`">{{ step.status }}</span>
                  <span class="tr__stitle">{{ i + 1 }}. {{ step.title }} <code class="tr__sid">{{ step.id }}</code></span>
                  <span class="tr__sdur">{{ fmtMs(step.durationMs) }}</span>
                </div>
                <p v-if="step.error" class="tr__serr">{{ step.error }}</p>
                <p v-for="(w, k) in step.warnings" :key="`w${k}`" class="tr__swarn">Warning: {{ w }}</p>
                <p v-if="step.summary" class="tr__ssum">{{ step.summary }}</p>

                <ul v-if="step.calls.length" class="tr__calls">
                  <li v-for="(call, j) in step.calls" :key="j" class="tr__call">
                    <div class="tr__callhead">
                      <span class="tr__method">{{ call.method }}</span>
                      <code class="tr__path">{{ splitUrl(call.url).path }}</code>
                    </div>
                    <div class="tr__callmeta">
                      <span v-if="splitUrl(call.url).host" class="tr__host">{{ splitUrl(call.url).host }}</span>
                      <span>HTTP <b :class="`tr__http--${httpTone(call.status)}`">{{ call.status ?? '—' }}</b></span>
                      <span v-if="fmtMs(call.durationMs)">Response time <b>{{ fmtMs(call.durationMs) }}</b></span>
                      <span v-if="call.interactionId">x-fapi-interaction-id <code>{{ call.interactionId }}</code></span>
                    </div>

                    <!-- Spec check -->
                    <div
                      v-if="call.spec"
                      class="tr__spec"
                      :class="call.spec.matches ? 'tr__spec--ok' : 'tr__spec--bad'"
                    >
                      <div class="tr__spechead">
                        <span class="tr__speclabel">Spec check</span>
                        <span class="tr__badge" :class="call.spec.matches ? 'tr__badge--ok' : 'tr__badge--bad'">
                          {{ specBadge(call.spec) }}
                        </span>
                      </div>
                      <p class="tr__specline">
                        <code>{{ call.spec.spec }} {{ call.spec.version }}</code> ·
                        <code>{{ call.spec.operation }} {{ call.spec.status }}</code>
                        <template v-if="call.spec.schema"> · <code>{{ call.spec.schema }}</code></template>
                      </p>

                      <details v-if="call.spec.fields.length" class="tr__fields" :open="!call.spec.matches">
                        <summary>
                          {{ plural(call.spec.fields.length, 'field') }} in the spec<template
                            v-if="call.spec.fields.some(missingRequired)"
                          > · {{ plural(call.spec.fields.filter(missingRequired).length, 'required field') }} not always returned</template>
                        </summary>
                        <div class="tr__tablewrap">
                          <table class="tr__table">
                            <thead>
                              <tr>
                                <th scope="col">Field</th>
                                <th scope="col">Required</th>
                                <th scope="col">Returned</th>
                                <th scope="col">Matches spec</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="f in call.spec.fields"
                                :key="f.path"
                                :class="{ 'tr__frow--missing': missingRequired(f) }"
                              >
                                <th scope="row" class="tr__fpath">
                                  <code><template v-for="(seg, k) in splitPath(f.path)[0]" :key="k"><span class="tr__fparent">{{ seg }}</span><wbr></template>{{ splitPath(f.path)[1] }}</code>
                                </th>
                                <td>{{ f.required ? 'Yes' : 'No' }}</td>
                                <td class="tr__fnum">{{ returnedText(f) }}</td>
                                <td>
                                  <template v-if="!f.problems.length">
                                    <span class="tr__tick" aria-hidden="true">✓</span><span class="tr__sr">Matches</span>
                                  </template>
                                  <template v-else>
                                    <span class="tr__cross" aria-hidden="true">✗</span><span class="tr__sr">Does not match:</span>
                                    <ul class="tr__fprobs">
                                      <li v-for="(m, k) in f.problems" :key="k">{{ m }}</li>
                                    </ul>
                                  </template>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </details>
                      <p v-else class="tr__hint tr__hint--flush">The spec defines no fields for this response.</p>

                      <div v-if="call.spec.unexpected.length">
                        <div class="tr__sublabel">Returned but not in the spec</div>
                        <ul class="tr__plist">
                          <li v-for="u in call.spec.unexpected" :key="u.path">
                            <code><template v-for="(seg, k) in splitPath(u.path)[0]" :key="k">{{ seg }}<wbr></template>{{ splitPath(u.path)[1] }}</code>
                            <span class="tr__pmeta">{{ plural(u.returned, 'time') }}</span>
                          </li>
                        </ul>
                      </div>

                      <div v-if="otherProblems(call.spec).length">
                        <div class="tr__sublabel">Other problems</div>
                        <ul class="tr__plist">
                          <li v-for="(p, k) in otherProblems(call.spec)" :key="k">
                            <code>{{ p.path || 'Whole response' }}</code>
                            <span class="tr__pmsg">{{ p.message }}</span>
                          </li>
                        </ul>
                      </div>

                      <p v-if="call.spec.problemCount > call.spec.problems.length" class="tr__hint tr__hint--flush">
                        {{ plural(call.spec.problemCount - call.spec.problems.length, 'more problem') }}
                        not listed — only the first {{ call.spec.problems.length }} are recorded.
                      </p>
                    </div>
                  </li>
                </ul>
              </li>
            </ol>
            <p v-if="!run.steps.length" class="tr__note">This run recorded no steps.</p>
          </template>
        </section>
      </template>
    </div>
  </div>
</template>

<style scoped>
.tr {
  /* Status colours for this page; the rest comes from the site's --at-* tokens. */
  --tr-bad: #b3261e;
  --tr-bad-bg: rgba(179, 38, 30, 0.06);
  --tr-warn: #8a6d1f;
  --tr-run: var(--at-blue-deep);

  max-width: 48rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 0;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}
html.dark .tr {
  --tr-bad: #ff8a80;
  --tr-bad-bg: rgba(255, 138, 128, 0.08);
  --tr-warn: var(--at-gold);
}

.tr__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.tr__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 700;
}

.tr__title {
  font-family: var(--at-serif);
  font-size: clamp(1.9rem, 3.4vw, 2.4rem);
  color: var(--at-navy-deep);
  margin: 0.4rem 0 0;
  line-height: 1.15;
}

.tr__lede { margin: 0.5rem 0 0; font-size: 1rem; color: var(--at-mute); }
.tr__lede--small { font-size: 0.88rem; }
.tr__lede a { color: var(--at-teal-deep); }

.tr__card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-navy-deep);
  border-radius: 10px;
  padding: 1.75rem 1.9rem;
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
  scroll-margin-top: calc(var(--at-header-height, 4rem) + 1rem);
}

.tr__h2 {
  margin: 0;
  font-family: var(--at-serif);
  font-size: 1.25rem;
  color: var(--at-navy-deep);
  line-height: 1.2;
}

.tr__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  margin-bottom: 0.65rem;
}

/* LFI selector — same as LFI functional testing. */
.tr__envs { display: flex; gap: 0.75rem; }
.tr__env {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--at-mute);
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.tr__env:hover { border-color: var(--at-teal); }
.tr__env--on {
  border-color: var(--at-navy-deep);
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}
.tr__envcode {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.06em;
  font-weight: 600;
}

.tr__hint { font-size: 0.82rem; color: var(--at-mute); margin: 0.35rem 0 0; overflow-wrap: anywhere; }
.tr__hint--flush { margin: 0; }

.tr__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.tr__row > .tr__hint { margin: 0; flex: 1 1 14rem; }
.tr__summary { min-width: 0; flex: 1 1 14rem; }

.tr__go {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  border-radius: 8px;
  border: none;
  background: var(--at-navy-deep);
  color: var(--at-inverse-fg, #fff);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}
html.dark .tr__go { color: var(--at-bg-cream); }

.tr__pick {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  cursor: pointer;
}
.tr__pick:hover:not(:disabled) { border-color: var(--at-teal); }
.tr__pick:disabled { cursor: not-allowed; opacity: 0.6; }

.tr__note, .tr__error, .tr__empty { margin: 0; font-size: 0.88rem; }
.tr__note, .tr__empty { color: var(--at-mute); }
.tr__ok { margin: 0; font-size: 0.88rem; font-weight: 600; color: var(--at-teal-deep); }
.tr__error { color: var(--tr-bad); overflow-wrap: anywhere; }
.tr__errline { margin: 0 0 0.5rem; }

/* Status pill — same family as LFI functional testing. */
.tr__pill {
  flex: 0 0 auto;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.2rem 0.45rem;
  border: 1px solid currentColor;
  border-radius: 3px;
  line-height: 1;
}
.tr__pill--pass { color: var(--at-teal-deep); }
.tr__pill--fail { color: var(--tr-bad); }
.tr__pill--error { color: var(--tr-warn); }
.tr__pill--run { color: var(--tr-run); }
.tr__pill--skip { color: var(--at-mute); }

/* Runs list */
.tr__runs { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.tr__rrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.8rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
  scroll-margin-top: calc(var(--at-header-height, 4rem) + 1rem);
}
.tr__rrow:hover { border-color: var(--at-teal); }
.tr__rrow .tr__pill { min-width: 4.4rem; text-align: center; }
.tr__rrow:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }
.tr__rmain { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.15rem; }
.tr__rtitle { font-size: 0.9rem; font-weight: 600; color: var(--at-navy-deep); overflow-wrap: anywhere; }
.tr__rmeta { font-size: 0.8rem; color: var(--at-mute); overflow-wrap: anywhere; }
.tr__rdur { flex: 0 0 auto; font-family: var(--at-mono); font-size: 0.72rem; color: var(--at-mute); }
.tr__more { display: flex; justify-content: center; }

/* Verdict banner */
.tr__verdict {
  padding: 0.9rem 1rem;
  border: 1px solid var(--at-grid-line);
  border-left: 4px solid var(--at-grid-line-2);
  border-radius: 8px;
  background: var(--at-bg-paper);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.tr__verdict--pass { border-left-color: var(--at-teal-deep); }
.tr__verdict--fail { border-left-color: var(--tr-bad); }
.tr__verdict--error { border-left-color: var(--tr-warn); }
.tr__verdict--run { border-left-color: var(--tr-run); }
.tr__vhead { display: flex; align-items: center; gap: 0.6rem; min-width: 0; }
.tr__vtext { margin: 0; min-width: 0; font-size: 1rem; font-weight: 700; color: var(--at-navy-deep); overflow-wrap: anywhere; }
.tr__verr { margin: 0; font-size: 0.86rem; color: var(--tr-bad); overflow-wrap: anywhere; }

.tr__facts {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.2rem 1rem;
  margin: 0;
  font-size: 0.82rem;
}
.tr__facts dt { color: var(--at-mute); }
.tr__facts dd { margin: 0; min-width: 0; color: var(--at-navy-deep); overflow-wrap: anywhere; }
.tr__idrow { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem 0.5rem; }

/* Inputs */
.tr__inputs {
  padding: 0.75rem 1rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 8px;
}
.tr__inputs .tr__facts code { font-size: 0.78rem; color: var(--at-navy-deep); }
.tr__mini {
  padding: 0.15rem 0.55rem;
  border-radius: 6px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  font-family: inherit;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  cursor: pointer;
}
.tr__mini:hover { border-color: var(--at-teal); }
.tr__sid {
  margin-left: 0.35rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--at-mute);
}

/* Steps */
.tr__steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.tr__step {
  min-width: 0;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-grid-line-2);
  border-radius: 6px;
}
.tr__step--pass { border-left-color: var(--at-teal-deep); }
.tr__step--fail { border-left-color: var(--tr-bad); }
.tr__step--error { border-left-color: var(--tr-warn); }
.tr__step--run { border-left-color: var(--tr-run); }
.tr__steptop { display: flex; align-items: center; gap: 0.6rem; }
.tr__stitle { flex: 1; min-width: 0; font-size: 0.92rem; font-weight: 600; color: var(--at-navy-deep); overflow-wrap: anywhere; }
.tr__sdur { font-family: var(--at-mono); font-size: 0.72rem; color: var(--at-mute); }
.tr__ssum, .tr__serr { margin: 0.35rem 0 0; font-size: 0.84rem; overflow-wrap: anywhere; }
.tr__ssum { color: var(--at-mute-2); }
.tr__serr { color: var(--tr-bad); }
.tr__swarn { margin: 0.35rem 0 0; font-size: 0.84rem; color: var(--tr-warn); overflow-wrap: anywhere; }

/* Calls */
.tr__calls { list-style: none; margin: 0.5rem 0 0; padding: 0; font-size: 0.82rem; }
.tr__call { min-width: 0; margin-top: 0.6rem; padding-top: 0.6rem; border-top: 1px dashed var(--at-grid-line); }
.tr__callhead { display: flex; gap: 0.5rem; align-items: baseline; min-width: 0; }
.tr__method { font-family: var(--at-mono); font-size: 0.72rem; font-weight: 700; color: var(--at-navy-deep); }
.tr__path { font-size: 0.8rem; color: var(--at-navy-deep); overflow-wrap: anywhere; min-width: 0; }
.tr__callmeta { display: flex; flex-wrap: wrap; gap: 0.2rem 1rem; margin-top: 0.3rem; color: var(--at-mute); }
.tr__callmeta b { color: var(--at-navy-deep); }
.tr__callmeta code { overflow-wrap: anywhere; }
.tr__host { font-family: var(--at-mono); font-size: 0.72rem; overflow-wrap: anywhere; }
.tr__callmeta .tr__http--ok { color: var(--at-teal-deep); }
.tr__callmeta .tr__http--bad { color: var(--tr-bad); }

/* Spec check */
.tr__spec {
  min-width: 0;
  margin-top: 0.6rem;
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-grid-line-2);
  border-radius: 6px;
  background: var(--at-bg-paper);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.tr__spec--ok { border-left-color: var(--at-teal-deep); }
.tr__spec--bad { border-left-color: var(--tr-bad); }
.tr__spechead { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
.tr__speclabel, .tr__sublabel {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.tr__sublabel { margin-bottom: 0.3rem; }
.tr__badge {
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  border: 1px solid currentColor;
  white-space: nowrap;
}
.tr__badge--ok { color: var(--at-teal-deep); }
.tr__badge--bad { color: var(--tr-bad); }
.tr__specline { margin: 0; color: var(--at-mute); overflow-wrap: anywhere; }
.tr__specline code { color: var(--at-navy-deep); font-size: 0.78rem; }

.tr__fields > summary {
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--at-navy-deep);
}
.tr__tablewrap {
  margin-top: 0.5rem;
  overflow-x: auto;
  border: 1px solid var(--at-grid-line);
  border-radius: 6px;
  background: var(--at-surface);
}
.tr__table { width: 100%; min-width: 34rem; border-collapse: collapse; font-size: 0.78rem; }
.tr__table th, .tr__table td {
  padding: 0.4rem 0.6rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--at-grid-line);
}
.tr__table tbody tr:last-child > * { border-bottom: 0; }
.tr__table thead th {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  white-space: nowrap;
}
/* Paths break after a dot (<wbr>), not mid-name; Required and Returned never wrap.
   The Field column stays put while a narrow screen scrolls the table sideways. */
.tr__table thead th:first-child, .tr__fpath {
  position: sticky;
  left: 0;
  z-index: 1;
  background: var(--at-surface);
}
.tr__fpath { font-weight: 400; width: 45%; }
.tr__fpath code { font-size: 0.76rem; color: var(--at-navy-deep); overflow-wrap: break-word; }
.tr__table td:nth-child(2), .tr__table td:nth-child(3) { white-space: nowrap; }
.tr__table td:last-child { min-width: 11rem; overflow-wrap: anywhere; }
.tr__fparent { color: var(--at-mute); }
.tr__fnum { white-space: nowrap; font-family: var(--at-mono); font-size: 0.74rem; }
.tr__frow--missing > * { background: linear-gradient(var(--tr-bad-bg), var(--tr-bad-bg)), var(--at-surface); }
.tr__frow--missing .tr__fnum { color: var(--tr-bad); font-weight: 700; }
.tr__tick { color: var(--at-teal-deep); font-weight: 700; }
.tr__cross { color: var(--tr-bad); font-weight: 700; }
.tr__fprobs { margin: 0.15rem 0 0; padding-left: 1rem; color: var(--tr-bad); overflow-wrap: anywhere; }

.tr__plist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.25rem; }
.tr__plist li { display: flex; flex-wrap: wrap; gap: 0.1rem 0.6rem; align-items: baseline; }
.tr__plist code { font-size: 0.76rem; color: var(--at-navy-deep); overflow-wrap: break-word; min-width: 0; }
.tr__pmeta { font-size: 0.74rem; color: var(--at-mute); }
.tr__pmsg { color: var(--tr-bad); overflow-wrap: anywhere; }

@media (max-width: 30rem) {
  .tr { padding: 2rem 1rem 0; }
  .tr__card { padding: 1.25rem 1rem; }
  .tr__envs { flex-direction: column; }
  .tr__row { align-items: stretch; }
  .tr__go { justify-content: center; }
  .tr__rrow { flex-wrap: wrap; }
  .tr__rmain { flex-basis: 100%; order: 2; }
  .tr__rdur { margin-left: auto; }
  .tr__step { padding: 0.65rem 0.7rem; }
  .tr__spec { padding: 0.65rem 0.7rem; }
  .tr__fpath { width: 9rem; }
}
</style>
