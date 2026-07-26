<script setup lang="ts">
// Confirmation of Payee Functional Certification portal. CoP has a single Ozone
// Connect endpoint and the match verdict is computed by the API Hub, so evidence
// is organised per match outcome (Yes / Partial / No / not-found) for each
// segment the LFI certifies — not per endpoint. Identity comes from Sandbox
// Trust Framework SSO; the bundle is assembled entirely in the browser. Mirrors
// the look and flow of the endpoint-based portals.
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { CopOutcome, CopSegment, FcCopArea } from '@/data/functional-certification/types'
import { VERSIONS, type Version } from '@/data/versions'
import { useSandboxAuth } from '@/composables/useSandboxAuth'
import { createZip, downloadBlob, fileBytes, type ZipEntry } from '@/utils/zip'
import { buildCopSummaryHtml, type CopScenarioEvidenceRef } from './summary-cop'
import { emptyCopFormState, emptyCopScenarioState, type CopScenarioState } from './types'

const props = defineProps<{ area: FcCopArea }>()

const { auth, loadMe, signIn } = useSandboxAuth()

const form = reactive(emptyCopFormState())

// Seed a state for every segment × outcome up front so indexing is always
// defined; only the scenarios for selected segments are ever rendered.
const scenarioKey = (segKey: string, outcomeKey: string): string => `${segKey}__${outcomeKey}`
const scenarioStates = reactive<Record<string, CopScenarioState>>(
  Object.fromEntries(
    props.area.segments.flatMap((s) =>
      props.area.outcomes.map((o) => [scenarioKey(s.key, o.key), emptyCopScenarioState()]),
    ),
  ),
)
const stateFor = (segKey: string, outcomeKey: string): CopScenarioState =>
  scenarioStates[scenarioKey(segKey, outcomeKey)] as CopScenarioState

function setVersion(v: string): void {
  form.version = v as Version
}
function toggleSegment(s: string): void {
  form.segment = form.segment.includes(s) ? form.segment.filter((x) => x !== s) : [...form.segment, s]
}

const selectedOrgIds = ref<string[]>([])
watch(
  () => auth.value.orgs,
  (orgs) => {
    if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id)
  },
  { immediate: true },
)

const STEPS = ['Your details', 'Segments & version', 'Evidence', 'Review & generate']
const currentStep = ref(1)
const generating = ref(false)
const genError = ref('')
const redirecting = ref(false)

const LOGIN_MARKER = 'fc_login_attempt'
const LOGIN_COOLDOWN_MS = 20_000

onMounted(async () => {
  await loadMe()
  if (typeof window === 'undefined') return
  if (auth.value.authenticated) {
    window.sessionStorage.removeItem(LOGIN_MARKER)
    return
  }
  const marker = Number(window.sessionStorage.getItem(LOGIN_MARKER) || 0)
  if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
    window.sessionStorage.removeItem(LOGIN_MARKER)
    return
  }
  window.sessionStorage.setItem(LOGIN_MARKER, String(Date.now()))
  redirecting.value = true
  signIn()
})

const org = computed(() =>
  auth.value.orgs.filter((o) => selectedOrgIds.value.includes(o.id)).map((o) => o.name).join(', '),
)
const identityName = computed(() => auth.value.name ?? auth.value.email ?? '')
const baseUrl = computed(() => props.area.baseUrlTemplate.replace('{VERSION}', form.version))
const confirmationUrl = computed(() => `${baseUrl.value}${props.area.tppEndpoints[0]?.path ?? '/confirmation'}`)
const outcomeLabels = computed(() => props.area.outcomes.map((o) => o.label).join(', '))

const selectedSegments = computed(() => props.area.segments.filter((s) => form.segment.includes(s.key)))

interface Scenario {
  segment: CopSegment
  outcome: CopOutcome
  state: CopScenarioState
}
const scenarios = computed<Scenario[]>(() =>
  selectedSegments.value.flatMap((segment) =>
    props.area.outcomes.map((outcome) => ({
      segment,
      outcome,
      state: stateFor(segment.key, outcome.key),
    })),
  ),
)

function scenarioComplete(s: Scenario): boolean {
  const st = s.state
  if (!st.reqName.trim() || !st.reqIban.trim()) return false
  if (!st.postman) return false
  if (props.area.captureResponseName) {
    if (s.outcome.returnsName && !st.resName.trim()) return false
    if (!s.outcome.returnsName && !st.confirmedEmpty) return false
  }
  return true
}
const completeCount = computed(() => scenarios.value.filter(scenarioComplete).length)
const allEvidenceComplete = computed(
  () =>
    scenarios.value.length > 0 &&
    completeCount.value === scenarios.value.length &&
    (!props.area.requiresTestingTool || !!form.testingTool),
)

function canLeave(step: number): boolean {
  if (step === 2) return form.segment.length > 0
  if (step === 3) return allEvidenceComplete.value
  return true
}
const canAdvance = computed(() => canLeave(currentStep.value))

function goTo(n: number): void {
  if (n <= currentStep.value) currentStep.value = n
}
function next(): void {
  if (currentStep.value < STEPS.length && canAdvance.value) currentStep.value++
}

// Any step change (Back, Next, or a stepper click) returns the reader to the top
// of the page — steps can be long, and the controls sit far below the heading.
watch(currentStep, () => {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
})

const canGenerate = computed(() => scenarios.value.length > 0 && !generating.value)

function extOf(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name)
  return m ? (m[1] as string).toLowerCase() : 'png'
}
function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40)
}
const zipName = computed(() => {
  const who = slugify(org.value) || 'submission'
  return `functional-certification-${props.area.key}-${who}.zip`
})

async function generate(): Promise<void> {
  generating.value = true
  genError.value = ''
  try {
    const entries: ZipEntry[] = []
    const refs: CopScenarioEvidenceRef[] = []

    let testingToolPath: string | undefined
    if (form.testingTool) {
      testingToolPath = 'testing-tool-cop-query.html'
      entries.push({ name: testingToolPath, data: await fileBytes(form.testingTool) })
    }

    for (const s of scenarios.value) {
      const dir = `evidence/${slugify(s.segment.key)}-${s.outcome.key}`
      const paths: CopScenarioEvidenceRef['paths'] = {}
      if (s.state.postman) {
        paths.postman = `${dir}/postman-confirmation.${extOf(s.state.postman.name)}`
        entries.push({ name: paths.postman, data: await fileBytes(s.state.postman) })
      }
      refs.push({ segment: s.segment, outcome: s.outcome, state: s.state, paths })
    }

    const summary = buildCopSummaryHtml({
      area: props.area,
      form,
      identity: { name: identityName.value, org: org.value, email: auth.value.email ?? '' },
      baseUrl: baseUrl.value,
      testingToolPath,
      scenarios: refs,
      generatedAt: new Date().toLocaleString(),
    })
    entries.unshift({ name: 'summary.html', data: new TextEncoder().encode(summary) })

    const blob = await createZip(entries)
    downloadBlob(blob, zipName.value)
  } catch (err) {
    genError.value = err instanceof Error ? err.message : String(err)
  } finally {
    generating.value = false
  }
}
</script>

<template>
  <div class="fc">
    <div v-if="redirecting" class="fc__redirect">
      Redirecting you to the Sandbox Trust Framework to sign in…
    </div>

    <template v-else>
    <FcStepper :steps="STEPS" :current="currentStep" @go="goTo" />

    <!-- Step 1 — Your details (SSO) -->
    <section v-show="currentStep === 1" class="fc__panel">
      <h2 class="fc__h2">Your details</h2>
      <p class="fc__lede">
        Your organisation and name are taken from your Sandbox Trust Framework session — the same
        sign-in used across the portal. Sign in so your submission is attributed to your
        {{ area.role === 'lfi' ? 'LFI' : 'organisation' }}.
      </p>
      <FcIdentity v-model:selected="selectedOrgIds" />
    </section>

    <!-- Step 2 — Segments & version -->
    <section v-show="currentStep === 2" class="fc__panel">
      <h2 class="fc__h2">Segments &amp; version</h2>
      <p class="fc__lede">
        Choose the standards version and the segments you are certifying. Each segment is evidenced
        against every match outcome on the next step — Retail with a personal name, SME and Corporate
        with a business name.
      </p>

      <div class="fc__controls">
        <div class="fc__ctrl">
          <label class="fc__label" for="cop-version">API version</label>
          <select id="cop-version" class="fc__select" :value="form.version" @change="setVersion(($event.target as HTMLSelectElement).value)">
            <option v-for="v in VERSIONS" :key="v" :value="v">{{ v }}</option>
          </select>
        </div>
        <div class="fc__ctrl">
          <label class="fc__label">Segments <span class="fc__opt">select all that apply</span></label>
          <div class="fc__seg">
            <button
              v-for="s in area.segments"
              :key="s.key"
              type="button"
              class="fc__seg-btn"
              :class="{ on: form.segment.includes(s.key) }"
              :aria-pressed="form.segment.includes(s.key)"
              @click="toggleSegment(s.key)"
            >
              {{ s.key }}
              <span class="fc__seg-type">{{ s.nameType === 'business' ? 'business name' : 'personal name' }}</span>
            </button>
          </div>
        </div>
      </div>

      <EdNote type="note" title="The API Hub computes the verdict">
        <p v-if="area.role === 'lfi'">
          Confirmation of Payee has a single Ozone Connect endpoint,
          <code>{{ area.ozoneEndpoint.method }} {{ area.ozoneEndpoint.path }}</code>. The API Hub
          computes the name-match verdict, so you evidence each outcome — {{ outcomeLabels }} — for
          every segment above.
        </p>
        <p v-else>
          You retrieve a Confirmation of Payee verdict from the sandbox Model Bank: call
          <code>POST /discovery</code> to resolve the LFI, then <code>POST /confirmation</code> to get
          the name-match result. Evidence each outcome — {{ outcomeLabels }} — for every segment above.
        </p>
      </EdNote>
    </section>

    <!-- Step 3 — Evidence -->
    <section v-show="currentStep === 3" class="fc__panel">
      <h2 class="fc__h2">Evidence</h2>
      <p class="fc__lede">
        <template v-if="area.requiresTestingTool">Attach one Testing Tool report for your cop-query endpoint, then evidence each match outcome
        per segment.</template>
        <template v-else>Evidence each match outcome per segment with a Postman screenshot of the
        <code>/confirmation</code> verdict.</template>
        <template v-if="area.role === 'lfi'">All evidence must come from your own
        <strong>pre-production environment</strong>.</template>
        <template v-else>All evidence must come from the
        <a :href="area.sandboxEvidenceHref">AlTareq Model Bank</a> sandbox.</template>
      </p>

      <p v-if="area.wellKnownUrl" class="fc__wellknown">
        <span class="fc__id-label">Model Bank .well-known</span>
        <code>{{ area.wellKnownUrl }}</code>
      </p>

      <FcFileInput
        v-if="area.requiresTestingTool"
        v-model="form.testingTool"
        label="Testing Tool output (cop-query)"
        accept=".html,.htm,text/html"
        :hint="`HTML report from the Testing Tool for your Ozone Connect ${area.ozoneEndpoint.method} ${area.ozoneEndpoint.path} endpoint.`"
      />

      <div v-if="scenarios.length === 0" class="fc__empty">
        You haven’t selected any segments yet.
        <button type="button" class="fc__link" @click="goTo(2)">Go back to choose segments</button>.
      </div>

      <template v-else>
        <div class="fc__progress-note" :class="{ 'fc__progress-note--done': allEvidenceComplete }">
          {{ completeCount }} of {{ scenarios.length }} scenarios complete<template v-if="area.requiresTestingTool && !form.testingTool"> · Testing Tool report required</template>{{ allEvidenceComplete ? ' — you can continue.' : '.' }}
        </div>

        <template v-for="seg in selectedSegments" :key="seg.key">
          <h3 class="fc__seg-heading">{{ seg.key }}</h3>
          <FcCopScenario
            v-for="o in area.outcomes"
            :key="`${seg.key}-${o.key}`"
            :segment="seg"
            :outcome="o"
            :state="stateFor(seg.key, o.key)"
            :capture-response-name="area.captureResponseName"
            :confirmation-url="confirmationUrl"
            :complete="scenarioComplete({ segment: seg, outcome: o, state: stateFor(seg.key, o.key) })"
          />
        </template>
      </template>
    </section>

    <!-- Step 4 — Review & generate -->
    <section v-show="currentStep === 4" class="fc__panel">
      <h2 class="fc__h2">Review &amp; generate</h2>
      <p class="fc__lede">
        Review the summary below, add any comments, then download your submission. The ZIP contains a
        <code>summary.html</code>{{ area.requiresTestingTool ? ', your Testing Tool report,' : '' }} and
        every screenshot — attach it to your
        <strong>{{ area.certType }}</strong> Service Desk ticket.
      </p>

      <dl class="fc__review">
        <div><dt>Organisation</dt><dd>{{ org || '—' }}</dd></div>
        <div><dt>Submitted by</dt><dd>{{ identityName || '—' }}</dd></div>
        <div><dt>Version</dt><dd>{{ form.version.toUpperCase() }}</dd></div>
        <div><dt>Segments</dt><dd>{{ form.segment.join(', ') || '—' }}</dd></div>
        <div><dt>Scenarios in scope</dt><dd>{{ scenarios.length }}</dd></div>
      </dl>

      <div class="fc-comment">
        <label class="fc-comment__label" for="fc-comments">Comments <span class="fc__opt">(optional)</span></label>
        <textarea
          id="fc-comments"
          v-model="form.comments"
          class="fc-comment__field"
          placeholder="Anything the certification team should know when reviewing this submission — context, caveats, or anything not captured above."
        />
      </div>

      <p v-if="genError" class="fc__error">Could not build the submission: {{ genError }}</p>
    </section>

    <!-- Nav -->
    <div class="fc__nav">
      <button type="button" class="fc__btn" :disabled="currentStep === 1" @click="currentStep--">Back</button>
      <span class="fc__nav-pos">Step {{ currentStep }} of {{ STEPS.length }}</span>
      <button
        v-if="currentStep < STEPS.length"
        type="button"
        class="fc__btn"
        :disabled="!canAdvance"
        :title="!canAdvance && currentStep === 3 ? 'Attach the Testing Tool report and complete every scenario first' : ''"
        @click="next"
      >
        Next
      </button>
      <button
        v-else
        type="button"
        class="fc__btn fc__btn--primary"
        :disabled="!canGenerate"
        @click="generate"
      >
        {{ generating ? 'Building…' : 'Download Functional Certification Submission' }}
      </button>
    </div>
    </template>
  </div>
</template>

<style scoped>
.fc { max-width: var(--at-page-max); margin: 0 auto; padding: 0 0 3rem; }

.fc__redirect {
  padding: 2.5rem 1.5rem;
  text-align: center;
  font-family: var(--at-sans);
  font-size: 1rem;
  color: var(--at-mute-2);
  background: color-mix(in srgb, var(--at-teal) 6%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
}

.fc__panel { min-height: 20rem; }
.fc__h2 { font-family: var(--at-serif); font-size: 1.6rem; font-weight: 600; margin: 0 0 0.5rem; color: var(--at-navy-deep); }
.fc__lede { font-family: var(--at-sans); font-size: 0.98rem; line-height: 1.65; color: var(--at-mute-2); margin: 0 0 1.5rem; max-width: 48rem; }
.fc__lede a { color: var(--at-teal-deep); }

.fc__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-navy);
  font-weight: 700;
  margin: 0 0 0.5rem;
}
.fc__opt { opacity: 0.6; font-weight: 400; text-transform: none; letter-spacing: 0; }

.fc__controls { display: flex; gap: 2.5rem; flex-wrap: wrap; margin-bottom: 1.75rem; }
.fc__ctrl { display: flex; flex-direction: column; }

.fc__select {
  min-width: 130px;
  padding: 0.6rem 0.75rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  font-family: var(--at-mono);
  font-size: 0.85rem;
  color: var(--at-navy-deep);
}
.fc__select:focus { outline: none; border-color: var(--at-teal); }

.fc__seg { display: inline-flex; flex-wrap: wrap; border: 1px solid var(--at-grid-line-2); background: var(--at-bg-cream); }
.fc__seg-btn {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--at-mute);
  background: none;
  border: none;
  border-right: 1px solid var(--at-grid-line-2);
  padding: 0.55rem 1.1rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.fc__seg-btn:last-child { border-right: none; }
.fc__seg-btn:hover { color: var(--at-navy); background: var(--at-surface); }
.fc__seg-btn.on { background: var(--at-teal); color: #fff; }
.fc__seg-btn.on:hover { background: var(--at-teal-deep); }
.fc__seg-type { font-family: var(--at-mono); font-size: 0.6rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; opacity: 0.75; }

.fc__seg-heading {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 1.5rem 0 0.75rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.fc__wellknown { display: flex; flex-direction: column; gap: 0.25rem; margin: 0 0 1.25rem; }
.fc__wellknown code { font-family: var(--at-mono); font-size: 0.8rem; color: var(--at-navy-deep); background: var(--at-surface); border: 1px solid var(--at-grid-line); padding: 0.3rem 0.5rem; word-break: break-all; }
.fc__id-label { display: block; font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--at-mute); margin-bottom: 0.15rem; }

.fc__empty { font-family: var(--at-sans); font-size: 0.95rem; color: var(--at-mute-2); padding: 1.5rem 0; }
.fc__link { background: none; border: none; padding: 0; font: inherit; color: var(--at-teal-deep); text-decoration: underline; cursor: pointer; }

.fc__progress-note {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 700;
  color: #a6391f;
  padding: 0.6rem 0.85rem;
  margin: 1rem 0;
  background: color-mix(in srgb, #a6391f 6%, var(--at-bg-cream));
  border-left: 3px solid #a6391f;
}
.fc__progress-note--done { color: var(--at-teal-deep); background: color-mix(in srgb, var(--at-teal) 8%, var(--at-bg-cream)); border-left-color: var(--at-teal); }

.fc__review { display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); gap: 1rem; margin: 0 0 1.5rem; }
.fc__review dt { font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--at-mute); }
.fc__review dd { margin: 0.2rem 0 0; font-family: var(--at-sans); font-size: 1rem; color: var(--at-navy-deep); }

.fc-comment {
  padding: 1.25rem 1.5rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
  margin-bottom: 1.5rem;
}
.fc-comment__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy);
  opacity: 0.85;
  margin-bottom: 0.6rem;
}
.fc-comment__field {
  width: 100%;
  box-sizing: border-box;
  min-height: 160px;
  resize: vertical;
  line-height: 1.6;
  padding: 0.75rem 0.9rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}
.fc-comment__field:focus { outline: none; border-color: var(--at-navy-deep); }

.fc__error { font-family: var(--at-sans); font-size: 0.9rem; color: #a6391f; margin: 0.75rem 0; }

.fc__btn {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.65rem 1.4rem;
  border: 1px solid var(--at-navy-deep);
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.fc__btn:hover:not(:disabled) { background: var(--at-navy-deep); color: #fff; }
.fc__btn:disabled { opacity: 0.4; cursor: default; }
.fc__btn--primary { background: var(--at-navy-deep); color: #fff; padding: 0.8rem 1.8rem; font-size: 0.95rem; }
.fc__btn--primary:hover:not(:disabled) { background: var(--at-teal-deep); border-color: var(--at-teal-deep); }

.fc__nav { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--at-grid-line); }
.fc__nav-pos { font-family: var(--at-mono); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--at-mute); }
</style>
