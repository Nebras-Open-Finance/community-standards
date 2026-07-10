<script setup lang="ts">
// Functional Certification portal — a guided, config-driven form that produces a
// downloadable ZIP submission for an LFI to attach to its Service Desk evidence
// ticket. Identity is pulled from the Sandbox Trust Framework session (SSO),
// never typed. Nothing is sent to a server: the bundle is assembled entirely in
// the browser.
import { computed, onMounted, reactive, ref } from 'vue'
import type { FcArea, FcEndpoint } from '@/data/functional-certification/types'
import { VERSIONS } from '@/data/versions'
import { useSandboxAuth } from '@/composables/useSandboxAuth'
import { createZip, downloadBlob, fileBytes, type ZipEntry } from '@/utils/zip'
import { buildSummaryHtml, type EndpointEvidenceRef } from './summary'
import { emptyEndpointState, emptyFormState, type EndpointState } from './types'

const props = defineProps<{ area: FcArea }>()

const { auth, loadMe, signIn } = useSandboxAuth()

const form = reactive(emptyFormState())
const endpointStates = reactive<Record<string, EndpointState>>(
  Object.fromEntries(props.area.endpoints.map((e) => [e.slug, emptyEndpointState()])),
)
// Every slug is seeded above, so indexing is always defined — this keeps the
// template free of non-null assertions.
const stateFor = (slug: string): EndpointState => endpointStates[slug] as EndpointState

const STEPS = ['Your details', 'Select endpoints', 'Evidence', 'Review & generate']
const currentStep = ref(1)
const generating = ref(false)
const genError = ref('')
// True while we bounce the user to Trust Framework SSO, so we show a redirect
// notice rather than flashing the form.
const redirecting = ref(false)

// Identity is required, so on load we send an unauthenticated user straight to
// Trust Framework SSO. A short-lived sessionStorage marker guards against a
// redirect loop: if we come back still unauthenticated within the cooldown, we
// stop and show the manual sign-in prompt instead of bouncing again.
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

const org = computed(() => auth.value.orgs.map((o) => o.name).join(', '))
const identityName = computed(() => auth.value.name ?? auth.value.email ?? '')
const lfiCode = computed(() => form.lfiCode.trim() || '{LFICODE}')
const tppBaseUrl = computed(() =>
  props.area.tppBaseUrlTemplate.replace('{LFICODE}', lfiCode.value).replace('{VERSION}', form.version),
)

const selectedEndpoints = computed(() => props.area.endpoints.filter((e) => stateFor(e.slug).selected))

// An endpoint's evidence is complete when it has a Testing Tool log, a stated
// outcome (with notes when there were issues), and — where a TPP-facing
// equivalent exists — both the Postman screenshot and the JSON response.
function endpointComplete(e: FcEndpoint): boolean {
  const st = stateFor(e.slug)
  if (!st.testLog) return false
  if (!st.outcome) return false
  if (st.outcome === 'issues' && !st.notes.trim()) return false
  if (e.tppPath && (!st.postman || !st.responseJson)) return false
  return true
}
const completeCount = computed(() => selectedEndpoints.value.filter(endpointComplete).length)
const allEvidenceComplete = computed(
  () => selectedEndpoints.value.length > 0 && completeCount.value === selectedEndpoints.value.length,
)

// Gate forward navigation: you can only leave "Select endpoints" once at least
// one is ticked, and only leave "Evidence" once every selected endpoint is
// complete.
function canLeave(step: number): boolean {
  if (step === 2) return selectedEndpoints.value.length > 0
  if (step === 3) return allEvidenceComplete.value
  return true
}
const canAdvance = computed(() => canLeave(currentStep.value))

// The stepper only navigates to steps already reached; forward movement goes
// through the gated Next button.
function goTo(n: number): void {
  if (n <= currentStep.value) currentStep.value = n
}
function next(): void {
  if (currentStep.value < STEPS.length && canAdvance.value) currentStep.value++
}

const canGenerate = computed(() => selectedEndpoints.value.length > 0 && !generating.value)

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
    const refs: EndpointEvidenceRef[] = []

    for (const e of selectedEndpoints.value) {
      const st = stateFor(e.slug)
      const dir = `evidence/${e.slug}`
      const paths: EndpointEvidenceRef['paths'] = {}

      if (st.testLog) {
        paths.testLog = `${dir}/testing-tool-log.html`
        entries.push({ name: paths.testLog, data: await fileBytes(st.testLog) })
      }
      if (e.tppPath && st.postman) {
        paths.postman = `${dir}/postman-success.${extOf(st.postman.name)}`
        entries.push({ name: paths.postman, data: await fileBytes(st.postman) })
      }
      if (e.tppPath && st.responseJson) {
        paths.responseJson = `${dir}/tpp-response.json`
        entries.push({ name: paths.responseJson, data: await fileBytes(st.responseJson) })
      }
      refs.push({ endpoint: e, state: st, paths })
    }

    const summary = buildSummaryHtml({
      area: props.area,
      form,
      identity: { name: identityName.value, org: org.value, email: auth.value.email ?? '' },
      tppBaseUrl: tppBaseUrl.value,
      endpoints: refs,
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
    <!-- Redirecting to Trust Framework SSO -->
    <div v-if="redirecting" class="fc__redirect">
      Redirecting you to the Sandbox Trust Framework to sign in…
    </div>

    <template v-else>
    <!-- Progress bar -->
    <nav class="fc-stepper">
      <button
        v-for="(label, i) in STEPS"
        :key="label"
        type="button"
        class="fc-step"
        :class="{ 'fc-step--active': currentStep === i + 1, 'fc-step--done': currentStep > i + 1 }"
        :disabled="i + 1 > currentStep"
        @click="goTo(i + 1)"
      >
        <span class="fc-step__num">{{ i + 1 }}</span>
        <span class="fc-step__txt">
          <span class="fc-step__kicker">Step {{ i + 1 }}</span>
          <span class="fc-step__label">{{ label }}</span>
        </span>
      </button>
    </nav>

    <!-- Step 1 — Your details (SSO) -->
    <section v-show="currentStep === 1" class="fc__panel">
      <h2 class="fc__h2">Your details</h2>
      <p class="fc__lede">
        Your organisation and name are taken from your Sandbox Trust Framework session — the same
        sign-in used across the portal. Sign in so your submission is attributed to your LFI.
      </p>

      <div v-if="!auth.loaded" class="fc__identity fc__identity--muted">Checking your session…</div>
      <div v-else-if="auth.authenticated" class="fc__identity">
        <div><span class="fc__id-label">Organisation</span><strong>{{ org || '—' }}</strong></div>
        <div><span class="fc__id-label">Signed in as</span>{{ identityName || '—' }}</div>
      </div>
      <div v-else class="fc__identity fc__identity--signin">
        <p>You are not signed in.</p>
        <button type="button" class="fc__btn" @click="signIn">Sign in with the Sandbox Trust Framework</button>
      </div>

      <label class="fc__label" for="fc-lficode">LFI code</label>
      <p class="fc__hint">
        Your LFI code — used to build the TPP-facing resource-server URLs, e.g.
        <code>{{ tppBaseUrl }}</code>.
      </p>
      <input id="fc-lficode" v-model="form.lfiCode" class="fc__input" placeholder="e.g. adcb" />

      <label class="fc__label" for="fc-implnotes">Implementation notes <span class="fc__opt">(optional)</span></label>
      <p class="fc__hint">Anything about your implementation the reviewer should know up front — e.g. account types or subtypes you support.</p>
      <textarea id="fc-implnotes" v-model="form.implementationNotes" class="fc__textarea fc__textarea--sm" placeholder="Optional context for the certification team." />
    </section>

    <!-- Step 2 — Select endpoints -->
    <section v-show="currentStep === 2" class="fc__panel">
      <h2 class="fc__h2">Select endpoints</h2>
      <p class="fc__lede">
        Choose the version you are certifying, then tick every {{ area.label }} endpoint your Ozone
        Connect implementation exposes. You will attach evidence for each on the next step.
      </p>

      <label class="fc__label" for="fc-version">Version</label>
      <select id="fc-version" v-model="form.version" class="fc__select">
        <option v-for="v in VERSIONS" :key="v" :value="v">{{ v.toUpperCase() }}</option>
      </select>

      <div class="fc__endpoints">
        <label v-for="e in area.endpoints" :key="e.slug" class="fc__endpoint-tick">
          <input v-model="stateFor(e.slug).selected" type="checkbox" />
          <span class="fc__method">{{ e.method }}</span>
          <code class="fc__epath">{{ e.ozonePath }}</code>
          <span class="fc__etitle">{{ e.title }}</span>
        </label>
      </div>

      <p class="fc__count">{{ selectedEndpoints.length }} of {{ area.endpoints.length }} selected</p>
    </section>

    <!-- Step 3 — Evidence -->
    <section v-show="currentStep === 3" class="fc__panel">
      <h2 class="fc__h2">Evidence</h2>
      <p class="fc__lede">
        Attach the evidence for each endpoint you selected. Evidence must be from the
        <a :href="area.sandboxEvidenceHref">AlTareq Model Bank</a> sandbox. All items are required for
        each endpoint before you can continue.
      </p>

      <div v-if="selectedEndpoints.length === 0" class="fc__empty">
        You haven’t selected any endpoints yet.
        <button type="button" class="fc__link" @click="goTo(2)">Go back to select endpoints</button>.
      </div>

      <template v-else>
        <div class="fc__progress-note" :class="{ 'fc__progress-note--done': allEvidenceComplete }">
          {{ completeCount }} of {{ selectedEndpoints.length }} endpoints complete{{ allEvidenceComplete ? ' — you can continue.' : '.' }}
        </div>
        <FcEndpointEvidence
          v-for="e in selectedEndpoints"
          :key="e.slug"
          :endpoint="e"
          :state="stateFor(e.slug)"
          :tpp-base-url="tppBaseUrl"
          :complete="endpointComplete(e)"
        />
      </template>
    </section>

    <!-- Step 4 — Review & generate -->
    <section v-show="currentStep === 4" class="fc__panel">
      <h2 class="fc__h2">Review &amp; generate</h2>
      <p class="fc__lede">
        Review the summary below, add any comments, then download your submission. The ZIP contains a
        <code>summary.html</code> plus every evidence file — attach it to your
        <strong>{{ area.certType }}</strong> Service Desk ticket.
      </p>

      <dl class="fc__review">
        <div><dt>Organisation</dt><dd>{{ org || '—' }}</dd></div>
        <div><dt>Submitted by</dt><dd>{{ identityName || '—' }}</dd></div>
        <div><dt>Version</dt><dd>{{ form.version.toUpperCase() }}</dd></div>
        <div><dt>LFI code</dt><dd>{{ form.lfiCode || '—' }}</dd></div>
        <div><dt>Endpoints in scope</dt><dd>{{ selectedEndpoints.length }}</dd></div>
      </dl>

      <!-- Comment box — proposals style -->
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

      <button type="button" class="fc__btn fc__btn--primary" :disabled="!canGenerate" @click="generate">
        {{ generating ? 'Building…' : 'Download Functional Certification Submission' }}
      </button>
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
        :title="!canAdvance && currentStep === 3 ? 'Attach all required evidence for each endpoint first' : ''"
        @click="next"
      >
        Next
      </button>
      <span v-else class="fc__nav-spacer" />
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

/* ── Progress bar (styled after the standalone portal) ──────────────────── */
.fc-stepper {
  display: flex;
  border-top: 1px solid var(--at-grid-line);
  border-bottom: 1px solid var(--at-grid-line);
  margin: 0 0 2rem;
  overflow-x: auto;
}
.fc-step {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 8px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  transition: opacity 0.15s;
}
.fc-step:disabled { cursor: default; opacity: 0.55; }
.fc-step__num {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border: 1.5px solid var(--at-grid-line-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--at-mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--at-mute);
  background: var(--at-bg-cream);
  transition: all 0.2s;
}
.fc-step__txt { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.fc-step__kicker {
  font-family: var(--at-mono);
  font-size: 8.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.5;
}
.fc-step__label {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--at-mute);
  line-height: 1.2;
  white-space: nowrap;
}
.fc-step--active .fc-step__num { background: var(--at-navy-deep); border-color: var(--at-navy-deep); color: #fff; }
.fc-step--active .fc-step__label { color: var(--at-navy-deep); font-weight: 600; }
.fc-step--done .fc-step__num { background: var(--at-teal); border-color: var(--at-teal); color: #fff; }
.fc-step--done .fc-step__label { color: var(--at-navy-deep); }

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
  margin: 1rem 0 0.3rem;
}
.fc__opt { opacity: 0.6; font-weight: 400; }
.fc__hint { font-family: var(--at-sans); font-size: 0.85rem; color: var(--at-mute-2); margin: 0 0 0.5rem; line-height: 1.5; }
.fc__hint code { font-family: var(--at-mono); font-size: 0.78rem; }

.fc__input, .fc__textarea, .fc__select {
  box-sizing: border-box;
  padding: 0.6rem 0.75rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}
.fc__input, .fc__textarea { width: 100%; }
.fc__input:focus, .fc__textarea:focus, .fc__select:focus { outline: none; border-color: var(--at-navy-deep); }
.fc__textarea { min-height: 110px; resize: vertical; line-height: 1.6; }
.fc__textarea--sm { min-height: 70px; }
.fc__select { min-width: 160px; background: var(--at-bg-cream); border-color: var(--at-grid-line-2); }

.fc__identity {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 0.9rem 1.1rem;
  background: color-mix(in srgb, var(--at-teal) 6%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  margin-bottom: 1rem;
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}
.fc__identity--muted { color: var(--at-mute); }
.fc__identity--signin { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
.fc__id-label { display: block; font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--at-mute); margin-bottom: 0.15rem; }

.fc__endpoints { margin-top: 1.25rem; border-top: 1px solid var(--at-grid-line); }
.fc__endpoint-tick {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  flex-wrap: wrap;
  padding: 0.6rem 0.2rem;
  border-bottom: 1px solid var(--at-grid-line);
}
.fc__method { font-family: var(--at-mono); font-size: 0.62rem; font-weight: 700; color: #fff; background: var(--at-teal-deep); padding: 0.12rem 0.35rem; }
.fc__epath { font-family: var(--at-mono); font-size: 0.85rem; color: var(--at-navy-deep); }
.fc__etitle { font-family: var(--at-sans); font-size: 0.85rem; color: var(--at-mute); }
.fc__count { font-family: var(--at-mono); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--at-mute); margin-top: 0.85rem; }

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
  margin-bottom: 1rem;
  background: color-mix(in srgb, #a6391f 6%, var(--at-bg-cream));
  border-left: 3px solid #a6391f;
}
.fc__progress-note--done { color: var(--at-teal-deep); background: color-mix(in srgb, var(--at-teal) 8%, var(--at-bg-cream)); border-left-color: var(--at-teal); }

.fc__review { display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); gap: 1rem; margin: 0 0 1.5rem; }
.fc__review dt { font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--at-mute); }
.fc__review dd { margin: 0.2rem 0 0; font-family: var(--at-sans); font-size: 1rem; color: var(--at-navy-deep); }

/* Comment box — proposals style */
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
.fc__nav-spacer { width: 1px; }

@media (max-width: 640px) {
  .fc-step__txt { display: none; }
  .fc-step { flex: 0 0 auto; padding: 14px 12px; }
}
</style>
