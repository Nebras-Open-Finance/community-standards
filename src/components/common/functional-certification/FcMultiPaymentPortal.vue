<script setup lang="ts">
// Multi-Payment / Delegated SCA Functional Certification portal (LFI side). These
// certs are consent-focused: the LFI shares the JIRA ticket of its Single Instant
// Payment certification, then evidences two pre-production consents for this
// payment type — one with every optional control parameter set, one with only the
// required minimum — each with the ConsentId, the consent details, and a
// screenshot of the authorization screen linked to it. Variable On-Demand
// additionally evidences the Multiple and Open beneficiary models (a reference PII,
// a ConsentId, the consent Creditor array for Multiple, and an authorization
// screen each). An optional Testing Tool report may be attached as supporting
// evidence. Identity comes from Sandbox Trust Framework SSO; the bundle is
// assembled entirely in the browser.
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FcConsentScenario, FcMultiPaymentArea } from '@/data/functional-certification/types'
import { VERSIONS, type Version } from '@/data/versions'
import { useSandboxAuth } from '@/composables/useSandboxAuth'
import { createZip, downloadBlob, fileBytes, type ZipEntry } from '@/utils/zip'
import {
  buildMultiPaymentSummaryHtml,
  type BeneficiaryEvidenceRef,
  type ConsentScenarioEvidenceRef,
} from './summary-multi-payment'
import {
  emptyBeneficiaryModelState,
  emptyConsentScenarioState,
  emptyMultiPaymentFormState,
  type BeneficiaryModelState,
  type ConsentScenarioState,
} from './types'

const props = defineProps<{ area: FcMultiPaymentArea }>()

const { auth, loadMe, signIn } = useSandboxAuth()

const form = reactive(emptyMultiPaymentFormState())
const scenarioStates = reactive<Record<string, ConsentScenarioState>>(
  Object.fromEntries(props.area.scenarios.map((s) => [s.key, emptyConsentScenarioState()])),
)
const beneficiaryModels = computed(() => props.area.beneficiaryModels ?? [])
const beneficiaryStates = reactive<Record<string, BeneficiaryModelState>>(
  Object.fromEntries((props.area.beneficiaryModels ?? []).map((m) => [m.key, emptyBeneficiaryModelState()])),
)

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

const STEPS = ['Your details', 'Scope & SIP ticket', 'Consent scenarios', 'Review & generate']
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
const baseUrl = computed(() =>
  props.area.tppBaseUrlTemplate.replace('{VERSION}', form.version).replace('{LFICODE}', 'LFICODE'),
)

const stateFor = (key: string): ConsentScenarioState =>
  scenarioStates[key] as ConsentScenarioState

function scenarioComplete(s: FcConsentScenario): boolean {
  const st = stateFor(s.key)
  return !!st.consentId.trim() && !!st.consentDetails.trim() && !!st.authScreenshot
}
const completeCount = computed(() => props.area.scenarios.filter(scenarioComplete).length)
const scenariosComplete = computed(() => completeCount.value === props.area.scenarios.length)

const beneficiaryStateFor = (key: string): BeneficiaryModelState =>
  beneficiaryStates[key] as BeneficiaryModelState

function beneficiaryComplete(m: { key: string; collectsCreditorArray: boolean }): boolean {
  const st = beneficiaryStateFor(m.key)
  return !!st.consentId.trim() && !!st.authScreenshot && (!m.collectsCreditorArray || !!st.creditorArray.trim())
}
const beneficiariesComplete = computed(() => beneficiaryModels.value.every(beneficiaryComplete))

// Step 3 collects both the control-parameter scenarios and (for VOD) the
// beneficiary-model evidence — both are required to advance and to generate.
const evidenceComplete = computed(() => scenariosComplete.value && beneficiariesComplete.value)

const scopeComplete = computed(() => form.segment.length > 0 && !!form.sipJiraTicket.trim())

function canLeave(step: number): boolean {
  if (step === 2) return scopeComplete.value
  if (step === 3) return evidenceComplete.value
  return true
}
const canAdvance = computed(() => canLeave(currentStep.value))

function goTo(n: number): void {
  if (n <= currentStep.value) currentStep.value = n
}
function next(): void {
  if (currentStep.value < STEPS.length && canAdvance.value) currentStep.value++
}

watch(currentStep, () => {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
})

const canGenerate = computed(() => evidenceComplete.value && !generating.value)

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
    const refs: ConsentScenarioEvidenceRef[] = []

    const testingToolPath = form.testingTool ? 'testing-tool-payments.html' : undefined
    if (form.testingTool && testingToolPath) {
      entries.push({ name: testingToolPath, data: await fileBytes(form.testingTool) })
    }

    for (const scenario of props.area.scenarios) {
      const st = stateFor(scenario.key)
      let authPath: string | undefined
      if (st.authScreenshot) {
        authPath = `evidence/${scenario.key}/authorization-screen.${extOf(st.authScreenshot.name)}`
        entries.push({ name: authPath, data: await fileBytes(st.authScreenshot) })
      }
      refs.push({ scenario, state: st, authPath })
    }

    const beneficiaryRefs: BeneficiaryEvidenceRef[] = []
    for (const model of beneficiaryModels.value) {
      const st = beneficiaryStateFor(model.key)
      let authPath: string | undefined
      if (st.authScreenshot) {
        authPath = `evidence/beneficiary-${model.key}/authorization-screen.${extOf(st.authScreenshot.name)}`
        entries.push({ name: authPath, data: await fileBytes(st.authScreenshot) })
      }
      beneficiaryRefs.push({ model, state: st, authPath })
    }

    const summary = buildMultiPaymentSummaryHtml({
      area: props.area,
      form,
      identity: { name: identityName.value, org: org.value, email: auth.value.email ?? '' },
      baseUrl: baseUrl.value,
      testingToolPath,
      scenarios: refs,
      beneficiaries: beneficiaryRefs,
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
          sign-in used across the portal. Sign in so your submission is attributed to your LFI.
        </p>
        <FcIdentity v-model:selected="selectedOrgIds" />
      </section>

      <!-- Step 2 — Scope & SIP ticket -->
      <section v-show="currentStep === 2" class="fc__panel">
        <h2 class="fc__h2">Scope &amp; Single Instant Payment ticket</h2>
        <p class="fc__lede">
          Choose the standards version and segments, and give the JIRA ticket for your completed
          <strong>Single Instant Payment</strong> certification — {{ area.label }} builds on it, so that
          certification must be in place first.
        </p>

        <div class="fc__controls">
          <div class="fc__ctrl">
            <label class="fc__label" for="mp-version">API version</label>
            <select id="mp-version" class="fc__select" :value="form.version" @change="setVersion(($event.target as HTMLSelectElement).value)">
              <option v-for="v in VERSIONS" :key="v" :value="v">{{ v }}</option>
            </select>
          </div>
          <div class="fc__ctrl">
            <label class="fc__label">Segments <span class="fc__opt">select all that apply</span></label>
            <div class="fc__seg">
              <button
                v-for="s in area.segments"
                :key="s"
                type="button"
                class="fc__seg-btn"
                :class="{ on: form.segment.includes(s) }"
                :aria-pressed="form.segment.includes(s)"
                @click="toggleSegment(s)"
              >
                {{ s }}
              </button>
            </div>
          </div>
        </div>

        <div class="fc__ctrl" style="max-width: 24rem">
          <label class="fc__label" for="mp-jira">Single Instant Payment JIRA ticket</label>
          <input
            id="mp-jira"
            v-model="form.sipJiraTicket"
            class="fc__input fc__input--mono"
            placeholder="e.g. OF-612"
            spellcheck="false"
          />
        </div>

        <div class="fc__controlnote">
          <p class="fc__controlnote-h">Control parameters for {{ area.label }}</p>
          <p><strong>Required:</strong> {{ area.requiredControls.join(', ') }}</p>
          <p><strong>Optional:</strong> {{ area.optionalControls.join(', ') }}</p>
          <p class="fc__controlnote-doc">
            See the <a :href="area.docHref" target="_blank" rel="noopener">{{ area.label }} API guide ↗</a>
            for the full ControlParameters model.
          </p>
        </div>
      </section>

      <!-- Step 3 — Consent scenarios -->
      <section v-show="currentStep === 3" class="fc__panel">
        <h2 class="fc__h2">Consent evidence</h2>
        <p class="fc__lede">
          Evidence two pre-production {{ area.label }} consents — one with every optional control
          parameter set, one with only the required minimum. For each, share the ConsentId, paste the
          consent details, and attach the authorization screen linked to it.<template v-if="beneficiaryModels.length">
          Then evidence one consent for each beneficiary model below.</template> All evidence must come
          from your own <strong>pre-production environment</strong>.
        </p>

        <div class="fc__progress-note" :class="{ 'fc__progress-note--done': evidenceComplete }">
          {{ completeCount }} of {{ area.scenarios.length }} control-parameter scenarios complete{{ beneficiaryModels.length ? `, ${beneficiaryModels.filter(beneficiaryComplete).length} of ${beneficiaryModels.length} beneficiary models` : '' }}{{ evidenceComplete ? ' — you can continue.' : '.' }}
        </div>

        <div class="fc__group">
          <h3 class="fc__group-h">Testing Tool output <span class="fc__opt">optional</span></h3>
          <p class="fc__hint">
            Optionally attach the Testing Tool HTML report for your Ozone Connect payment endpoints. This
            is not required for {{ area.label }} — the certification is consent-focused — but you may
            include it as supporting evidence.
          </p>
          <FcFileInput
            v-model="form.testingTool"
            label="Testing Tool report (optional)"
            accept=".html,.htm,text/html"
            hint="HTML report from the Testing Tool for your Ozone Connect payment endpoints."
          />
        </div>

        <div v-for="s in area.scenarios" :key="s.key" class="fc__group" :class="{ 'fc__group--done': scenarioComplete(s) }">
          <h3 class="fc__group-h">{{ s.label }}</h3>
          <p class="fc__hint">{{ s.guidance }}</p>

          <details class="fc__example">
            <summary>Reference — example ControlParameters</summary>
            <pre>{{ s.example }}</pre>
          </details>

          <label class="fc__field" style="max-width: 26rem; margin: 0.85rem 0">
            <span class="fc__flabel">Pre-production ConsentId</span>
            <input v-model="stateFor(s.key).consentId" class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" />
          </label>

          <label class="fc__flabel fc__flabel--block" :for="`mp-details-${s.key}`">Consent details <span class="fc__opt">paste the ControlParameters / authorization_details for this consent</span></label>
          <textarea
            :id="`mp-details-${s.key}`"
            v-model="stateFor(s.key).consentDetails"
            class="fc__textarea fc__textarea--code"
            placeholder="Paste the consent (ControlParameters / authorization_details) exactly as created for this ConsentId."
          />

          <FcFileInput
            v-model="stateFor(s.key).authScreenshot"
            label="Authorization screen"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of the authorization screen the customer saw for this consent, showing the control parameters above."
          />
        </div>

        <!-- Beneficiary models (Variable On-Demand only) -->
        <template v-if="beneficiaryModels.length">
          <h3 class="fc__subhead">Beneficiary models</h3>
          <p class="fc__hint">
            Variable On-Demand accepts more than a single beneficiary. Evidence one consent for each
            beneficiary model — the shape is fixed by the decrypted PII's <code>Initiation.Creditor</code>.
            You must advertise support for each model on your Trust Framework authorisation-server entry.
            See the <a :href="area.creditorDocHref" target="_blank" rel="noopener">Creditor PII page ↗</a>
            for the model definitions.
          </p>

          <div
            v-for="m in beneficiaryModels"
            :key="m.key"
            class="fc__group"
            :class="{ 'fc__group--done': beneficiaryComplete(m) }"
          >
            <h3 class="fc__group-h">{{ m.label }}</h3>
            <p class="fc__hint">{{ m.description }}</p>
            <p class="fc__hint">
              Advertise via <code>{{ m.trustFrameworkFlag }}</code>.
            </p>

            <details class="fc__example">
              <summary>Reference — decrypted PersonalIdentifiableInformation</summary>
              <pre>{{ m.referencePii }}</pre>
            </details>

            <label class="fc__field" style="max-width: 26rem; margin: 0.85rem 0">
              <span class="fc__flabel">Pre-production ConsentId</span>
              <input v-model="beneficiaryStateFor(m.key).consentId" class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" />
            </label>

            <template v-if="m.collectsCreditorArray">
              <label class="fc__flabel fc__flabel--block" :for="`bf-creditors-${m.key}`">Consent <code>Initiation.Creditor</code> array <span class="fc__opt">paste the 2–10 creditor entries from your consent</span></label>
              <textarea
                :id="`bf-creditors-${m.key}`"
                v-model="beneficiaryStateFor(m.key).creditorArray"
                class="fc__textarea fc__textarea--code"
                placeholder="Paste the Initiation.Creditor array (2–10 entries) exactly as carried on this consent."
              />
            </template>
            <div v-else class="fc__opennote">
              <strong>No creditor to submit.</strong> For Open Beneficiaries the consent carries no
              <code>Initiation.Creditor</code> — see the reference PII above, where the array is absent.
              Your authorization screen should reflect that the TPP selects the beneficiaries.
            </div>

            <FcFileInput
              v-model="beneficiaryStateFor(m.key).authScreenshot"
              label="Authorization screen"
              accept="image/png,image/jpeg,image/webp"
              :hint="m.collectsCreditorArray
                ? 'Screenshot of the authorization screen the customer saw for this consent, showing the list of beneficiaries.'
                : 'Screenshot of the authorization screen the customer saw for this consent, showing that no fixed beneficiary is set and the TPP selects the beneficiaries.'"
            />
          </div>
        </template>
      </section>

      <!-- Step 4 — Review & generate -->
      <section v-show="currentStep === 4" class="fc__panel">
        <h2 class="fc__h2">Review &amp; generate</h2>
        <p class="fc__lede">
          Review the summary below, add any comments, then download your submission. The ZIP contains a
          <code>summary.html</code> and every authorization-screen screenshot — attach it to your
          <strong>{{ area.certType }}</strong> Service Desk ticket.
        </p>

        <dl class="fc__review">
          <div><dt>Organisation</dt><dd>{{ org || '—' }}</dd></div>
          <div><dt>Submitted by</dt><dd>{{ identityName || '—' }}</dd></div>
          <div><dt>Version</dt><dd>{{ form.version.toUpperCase() }}</dd></div>
          <div><dt>Payment type</dt><dd>{{ area.paymentType }}</dd></div>
          <div><dt>Segments</dt><dd>{{ form.segment.join(', ') || '—' }}</dd></div>
          <div><dt>SIP JIRA ticket</dt><dd>{{ form.sipJiraTicket || '—' }}</dd></div>
        </dl>

        <div class="fc-comment">
          <label class="fc-comment__label" for="mp-comments">Comments <span class="fc__opt">(optional)</span></label>
          <textarea
            id="mp-comments"
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
          :title="!canAdvance && currentStep === 3 ? 'Complete the consent evidence first' : ''"
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
.fc__lede strong { color: var(--at-navy-deep); }

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
.fc__hint { font-family: var(--at-sans); font-size: 0.86rem; line-height: 1.55; color: var(--at-mute); margin: 0 0 0.85rem; max-width: 46rem; }
.fc__hint code { font-family: var(--at-mono); font-size: 0.78rem; background: var(--at-surface); padding: 0.05rem 0.3rem; border: 1px solid var(--at-grid-line); word-break: break-all; }
.fc__hint a { color: var(--at-teal-deep); }

.fc__controls { display: flex; gap: 2.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
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

.fc__input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.55rem 0.7rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-navy-deep);
}
.fc__input:focus { outline: none; border-color: var(--at-navy-deep); }
.fc__input--mono { font-family: var(--at-mono); font-size: 0.82rem; }

.fc__controlnote {
  margin-top: 1.75rem;
  padding: 1rem 1.25rem;
  background: color-mix(in srgb, var(--at-gold) 8%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-gold);
  font-family: var(--at-sans);
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}
.fc__controlnote p { margin: 0 0 0.35rem; }
.fc__controlnote-h { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--at-navy); }
.fc__controlnote-doc a { color: var(--at-teal-deep); }

.fc__group {
  padding: 1.25rem 1.35rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-gold);
  margin-bottom: 1.1rem;
}
.fc__group--done { border-left-color: var(--at-teal); }
.fc__group-h { font-family: var(--at-serif); font-size: 1.2rem; font-weight: 600; color: var(--at-navy-deep); margin: 0 0 0.5rem; }

.fc__subhead {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 2.25rem 0 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--at-grid-line);
}

.fc__opennote {
  margin: 0.5rem 0 0.85rem;
  padding: 0.85rem 1rem;
  background: color-mix(in srgb, var(--at-teal) 6%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
  font-family: var(--at-sans);
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}
.fc__opennote code { font-family: var(--at-mono); font-size: 0.78rem; background: var(--at-surface); padding: 0.05rem 0.3rem; border: 1px solid var(--at-grid-line); word-break: break-all; }

.fc__example { margin: 0 0 0.5rem; }
.fc__example summary { font-family: var(--at-mono); font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 700; color: var(--at-teal-deep); cursor: pointer; }
.fc__example pre {
  margin: 0.6rem 0 0;
  padding: 0.85rem 1rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.76rem;
  line-height: 1.5;
  color: var(--at-navy-deep);
  overflow-x: auto;
}

.fc__field { display: flex; flex-direction: column; gap: 0.3rem; }
.fc__flabel { font-family: var(--at-sans); font-size: 0.8rem; font-weight: 600; color: var(--at-navy-deep); }
.fc__flabel--block { display: block; margin: 0.6rem 0 0.35rem; }
.fc__flabel--block code { font-family: var(--at-mono); font-size: 0.78rem; }

.fc__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 120px;
  resize: vertical;
  padding: 0.6rem 0.7rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
  margin-bottom: 0.85rem;
}
.fc__textarea:focus { outline: none; border-color: var(--at-navy-deep); }
.fc__textarea--code { font-family: var(--at-mono); font-size: 0.8rem; }

.fc__progress-note {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 700;
  color: #a6391f;
  padding: 0.6rem 0.85rem;
  margin: 1rem 0 1.5rem;
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
