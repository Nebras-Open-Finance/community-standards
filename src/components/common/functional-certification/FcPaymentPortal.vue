<script setup lang="ts">
// Single Instant Payment Functional Certification portal (LFI side). Payment
// certification is scenario-shaped, not per-endpoint: the LFI declares the rails
// it supports and evidences each rail's terminal status, times the AANI
// POST→rail and POST→terminal-PATCH windows, evidences Creditor decryption /
// validation and Risk handling (the encryption model puts the Creditor inside the
// encrypted PII), and evidences two consent-shape scenarios — account + balance
// reads before a payment, and a refund-account read after one. Identity comes from
// Sandbox Trust Framework SSO; the bundle is assembled entirely in the browser.
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FcPaymentArea } from '@/data/functional-certification/types'
import { VERSIONS, type Version } from '@/data/versions'
import { useSandboxAuth } from '@/composables/useSandboxAuth'
import { createZip, downloadBlob, fileBytes, type ZipEntry } from '@/utils/zip'
import {
  buildPaymentSummaryHtml,
  type PaymentAuthScreenEvidenceRef,
  type PaymentRailEvidenceRef,
} from './summary-payment'
import {
  emptyPaymentAaniRejectState,
  emptyPaymentAuthScenarioState,
  emptyPaymentCreditorRiskState,
  emptyPaymentDataSharingState,
  emptyPaymentFormState,
  emptyPaymentRailState,
  emptyPaymentRefundState,
  emptyPaymentTimingState,
  type PaymentAuthScenarioState,
  type PaymentRailState,
} from './types'

const props = defineProps<{ area: FcPaymentArea }>()

const { auth, loadMe, signIn } = useSandboxAuth()

const form = reactive(emptyPaymentFormState())
const railStates = reactive<Record<string, PaymentRailState>>(
  Object.fromEntries(props.area.rails.map((r) => [r.key, emptyPaymentRailState()])),
)
const timing = reactive(emptyPaymentTimingState())
const aaniReject = reactive(emptyPaymentAaniRejectState())
const creditorRisk = reactive(emptyPaymentCreditorRiskState())
const dataSharing = reactive(emptyPaymentDataSharingState())
const refund = reactive(emptyPaymentRefundState())
const authScreens = reactive<Record<string, PaymentAuthScenarioState>>(
  Object.fromEntries(props.area.authScreenScenarios.map((s) => [s.key, emptyPaymentAuthScenarioState()])),
)

const aaniRail = props.area.rails.find((r) => r.timed)
const aaniSupported = computed(() => (aaniRail ? !!railStates[aaniRail.key]?.supported : false))
const supportedRails = computed(() => props.area.rails.filter((r) => railStates[r.key]?.supported))

function setVersion(v: string): void {
  form.version = v as Version
}
function toggleSegment(s: string): void {
  form.segment = form.segment.includes(s) ? form.segment.filter((x) => x !== s) : [...form.segment, s]
}
function toggleRail(key: string): void {
  const st = railStates[key]
  if (st) st.supported = !st.supported
}

const selectedOrgIds = ref<string[]>([])
watch(
  () => auth.value.orgs,
  (orgs) => {
    if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id)
  },
  { immediate: true },
)

const STEPS = ['Your details', 'Scope & rails', 'Evidence', 'Review & generate']
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
const accountInfoBaseUrl = computed(() =>
  props.area.accountInfoBaseUrlTemplate.replace('{VERSION}', form.version).replace('{LFICODE}', 'LFICODE'),
)

// ── Completeness ──────────────────────────────────────────────────────────────
const scopeComplete = computed(
  () => form.segment.length > 0 && supportedRails.value.length > 0 && !!form.paymentLimit.trim(),
)

const coreComplete = computed(() => !!form.testingTool && !!form.postPaymentsPostman)
const railsComplete = computed(() => supportedRails.value.every((r) => !!railStates[r.key]?.postman))
const timingComplete = computed(() => {
  if (!aaniSupported.value) return true
  return (
    !!timing.postTimestamp.trim() &&
    !!timing.railSubmitTimestamp.trim() &&
    !!timing.railSubmitScreenshot &&
    !!timing.terminalPatchTimestamp.trim() &&
    !!timing.terminalPatchScreenshot
  )
})
const aaniRejectComplete = computed(() => {
  if (!aaniSupported.value) return true
  return !!aaniReject.rejectCode.trim() && !!aaniReject.postman
})
const creditorRiskComplete = computed(
  () =>
    !!creditorRisk.decryptScreenshot &&
    !!creditorRisk.creditorScreenshot &&
    !!creditorRisk.creditorValidationText.trim() &&
    !!creditorRisk.riskScreenshot &&
    !!creditorRisk.riskValidationText.trim(),
)
const dataSharingComplete = computed(
  () =>
    !!dataSharing.consentId.trim() &&
    !!dataSharing.accountsPostman &&
    !!dataSharing.balancesPostman &&
    !!dataSharing.postPaymentsPostman &&
    !!dataSharing.authScreenshot,
)
const refundComplete = computed(
  () =>
    !!refund.consentId.trim() &&
    !!refund.postPaymentsPostman &&
    !!refund.refundPostman &&
    !!refund.authScreenshot,
)
const authScreensComplete = computed(() =>
  props.area.authScreenScenarios.every(
    (s) => !!authScreens[s.key]?.consentId.trim() && !!authScreens[s.key]?.screenshot,
  ),
)

const evidenceComplete = computed(
  () =>
    coreComplete.value &&
    railsComplete.value &&
    timingComplete.value &&
    aaniRejectComplete.value &&
    creditorRiskComplete.value &&
    dataSharingComplete.value &&
    refundComplete.value &&
    authScreensComplete.value,
)

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

async function push(entries: ZipEntry[], file: File | null, name: string): Promise<string | undefined> {
  if (!file) return undefined
  const path = `${name}.${extOf(file.name)}`
  entries.push({ name: path, data: await fileBytes(file) })
  return path
}

async function generate(): Promise<void> {
  generating.value = true
  genError.value = ''
  try {
    const entries: ZipEntry[] = []

    const testingToolPath = form.testingTool ? 'testing-tool-payments.html' : undefined
    if (form.testingTool && testingToolPath) {
      entries.push({ name: testingToolPath, data: await fileBytes(form.testingTool) })
    }
    const postPaymentsPath = await push(entries, form.postPaymentsPostman, 'evidence/core/postman-post-payments')
    const limitPath = await push(entries, form.limitScreenshot, 'evidence/core/postman-limit-exceeded')

    const rails: PaymentRailEvidenceRef[] = []
    for (const rail of supportedRails.value) {
      const st = railStates[rail.key] as PaymentRailState
      const postman = await push(entries, st.postman, `evidence/rails/${rail.key}-terminal`)
      rails.push({ rail, state: st, postman })
    }

    const railSubmitPath = await push(entries, timing.railSubmitScreenshot, 'evidence/timing/rail-submission')
    const terminalPatchPath = await push(entries, timing.terminalPatchScreenshot, 'evidence/timing/terminal-patch')

    const aaniRejectPath = await push(entries, aaniReject.postman, 'evidence/timing/aani-rejection')

    const decryptPath = await push(entries, creditorRisk.decryptScreenshot, 'evidence/creditor-risk/decrypt-pii')
    const creditorPath = await push(entries, creditorRisk.creditorScreenshot, 'evidence/creditor-risk/creditor-validation')
    const riskPath = await push(entries, creditorRisk.riskScreenshot, 'evidence/creditor-risk/risk-object')

    const accountsPath = await push(entries, dataSharing.accountsPostman, 'evidence/data-sharing/accounts')
    const balancesPath = await push(entries, dataSharing.balancesPostman, 'evidence/data-sharing/balances')
    const dsPostPath = await push(entries, dataSharing.postPaymentsPostman, 'evidence/data-sharing/post-payments')
    const dsAuthPath = await push(entries, dataSharing.authScreenshot, 'evidence/data-sharing/authorisation-page')

    const rfPostPath = await push(entries, refund.postPaymentsPostman, 'evidence/refund/post-payments')
    const refundPath = await push(entries, refund.refundPostman, 'evidence/refund/refund')
    const rfAuthPath = await push(entries, refund.authScreenshot, 'evidence/refund/authorisation-page')

    const authScreenRefs: PaymentAuthScreenEvidenceRef[] = []
    for (const scenario of props.area.authScreenScenarios) {
      const st = authScreens[scenario.key] as PaymentAuthScenarioState
      const screenshot = await push(entries, st.screenshot, `evidence/authorisation-screen/${scenario.key}`)
      authScreenRefs.push({ scenario, state: st, screenshot })
    }

    const summary = buildPaymentSummaryHtml({
      area: props.area,
      form,
      identity: { name: identityName.value, org: org.value, email: auth.value.email ?? '' },
      baseUrl: baseUrl.value,
      accountInfoBaseUrl: accountInfoBaseUrl.value,
      testingToolPath,
      postPaymentsPath,
      limitPath,
      rails,
      timing: { state: timing, railSubmitPath, terminalPatchPath },
      aaniReject: { state: aaniReject, postman: aaniRejectPath },
      creditorRisk: { state: creditorRisk, decryptPath, creditorPath, riskPath },
      dataSharing: { state: dataSharing, accountsPath, balancesPath, postPaymentsPath: dsPostPath, authPath: dsAuthPath },
      refund: { state: refund, postPaymentsPath: rfPostPath, refundPath, authPath: rfAuthPath },
      authScreens: authScreenRefs,
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

      <!-- Step 2 — Scope & rails -->
      <section v-show="currentStep === 2" class="fc__panel">
        <h2 class="fc__h2">Scope &amp; rails</h2>
        <p class="fc__lede">
          Choose the standards version and segments, declare the rails your LFI supports for
          {{ area.label }}, and state the payment limit you apply. Each rail you declare is evidenced
          against its terminal status on the next step.
        </p>

        <div class="fc__controls">
          <div class="fc__ctrl">
            <label class="fc__label" for="pay-version">API version</label>
            <select id="pay-version" class="fc__select" :value="form.version" @change="setVersion(($event.target as HTMLSelectElement).value)">
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

        <label class="fc__label" style="margin-top: 0.5rem">Payment rails supported</label>
        <p class="fc__hint">
          Select every execution mode your LFI supports for {{ area.label }}. The terminal Open
          Finance status each reaches is fixed by the
          <a :href="area.paymentStatusDocHref" target="_blank" rel="noopener">Payment Status</a> rules.
        </p>
        <div class="fc__rails">
          <button
            v-for="r in area.rails"
            :key="r.key"
            type="button"
            class="fc__rail"
            :class="{ on: railStates[r.key]?.supported }"
            :aria-pressed="railStates[r.key]?.supported"
            @click="toggleRail(r.key)"
          >
            <span class="fc__rail-name">{{ r.label }}</span>
            <code class="fc__rail-status">{{ r.terminalStatus }}</code>
            <span class="fc__rail-note">{{ r.note }}</span>
          </button>
        </div>

        <div class="fc__ctrl fc__limit">
          <label class="fc__label" for="pay-limit">Payment limit (max AED)</label>
          <input
            id="pay-limit"
            v-model="form.paymentLimit"
            class="fc__input"
            type="text"
            inputmode="decimal"
            placeholder="e.g. 50000.00"
          />
          <p class="fc__hint">
            The maximum amount a single payment can take through Open Finance on your LFI. This MUST NOT
            be more restrictive than your other digital channels.
          </p>
        </div>
      </section>

      <!-- Step 3 — Evidence -->
      <section v-show="currentStep === 3" class="fc__panel">
        <h2 class="fc__h2">Evidence</h2>
        <p class="fc__lede">
          Attach the evidence below. All evidence must come from the
          <a :href="area.sandboxEvidenceHref">AlTareq Model Bank</a> sandbox.
        </p>

        <div class="fc__progress-note" :class="{ 'fc__progress-note--done': evidenceComplete }">
          {{ evidenceComplete ? 'All evidence complete — you can continue.' : 'Some evidence is still outstanding.' }}
        </div>

        <!-- Core payment execution -->
        <div class="fc__group" :class="{ 'fc__group--done': coreComplete }">
          <h3 class="fc__group-h">Core payment execution</h3>
          <FcFileInput
            v-model="form.testingTool"
            label="Testing Tool output (POST /payments)"
            accept=".html,.htm,text/html"
            hint="HTML report from the Testing Tool for your Ozone Connect POST /payments endpoint."
          />
          <FcFileInput
            v-model="form.postPaymentsPostman"
            label="Postman — POST /payments (201 Pending)"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot showing a successful POST /payments returning HTTP 201 with status Pending."
          />
          <FcFileInput
            v-model="form.limitScreenshot"
            label="Payment limit exceeded (optional)"
            accept="image/png,image/jpeg,image/webp"
            hint="Optional: a payment rejected for exceeding your stated AED limit."
          />
        </div>

        <!-- Rails & terminal status -->
        <div class="fc__group" :class="{ 'fc__group--done': railsComplete }">
          <h3 class="fc__group-h">Terminal status per supported rail</h3>
          <p v-if="supportedRails.length === 0" class="fc__empty">
            You haven’t declared any rails yet.
            <button type="button" class="fc__link" @click="goTo(2)">Go back to declare rails</button>.
          </p>
          <template v-else>
            <div v-for="r in supportedRails" :key="r.key" class="fc__rail-ev">
              <div class="fc__rail-ev-head">
                <span class="fc__rail-ev-name">{{ r.label }}</span>
                <code class="fc__rail-ev-status">{{ r.terminalStatus }}</code>
              </div>
              <p class="fc__rail-ev-note">{{ r.note }}</p>
              <FcFileInput
                v-model="railStates[r.key]!.postman"
                :label="`Postman — ${r.label} terminal status`"
                accept="image/png,image/jpeg,image/webp"
                :hint="`Screenshot evidencing a payment on ${r.label} reaching ${r.terminalStatus} (e.g. GET /payments/{PaymentId} or the Payment Log PATCH).`"
              />
            </div>
          </template>
        </div>

        <!-- AANI timing -->
        <div v-if="aaniSupported" class="fc__group" :class="{ 'fc__group--done': timingComplete }">
          <h3 class="fc__group-h">AANI timing</h3>
          <p class="fc__hint">
            Evidence the two delays for AANI, the primary instant rail: from POST /payments to rail
            submission, and from POST /payments to the terminal-status PATCH. Enter each timestamp as
            shown in Postman or your logs and attach the screenshot it comes from.
          </p>
          <div class="fc__grid">
            <label class="fc__field">
              <span class="fc__flabel">POST /payments timestamp</span>
              <input v-model="timing.postTimestamp" class="fc__input fc__input--mono" placeholder="2026-04-18T10:14:20.102Z" />
            </label>
            <label class="fc__field">
              <span class="fc__flabel">Submitted to AANI timestamp</span>
              <input v-model="timing.railSubmitTimestamp" class="fc__input fc__input--mono" placeholder="2026-04-18T10:14:21.540Z" />
            </label>
          </div>
          <FcFileInput
            v-model="timing.railSubmitScreenshot"
            label="Rail-submission screenshot"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot evidencing submission to AANI and its timestamp."
          />
          <div class="fc__grid">
            <label class="fc__field">
              <span class="fc__flabel">Terminal-status PATCH timestamp</span>
              <input v-model="timing.terminalPatchTimestamp" class="fc__input fc__input--mono" placeholder="2026-04-18T10:14:22.845Z" />
            </label>
          </div>
          <FcFileInput
            v-model="timing.terminalPatchScreenshot"
            label="Terminal-PATCH screenshot"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot evidencing the PATCH /payment-log/{paymentId} to AcceptedWithoutPosting and its timestamp."
          />
        </div>

        <!-- AANI rejection example -->
        <div v-if="aaniSupported" class="fc__group" :class="{ 'fc__group--done': aaniRejectComplete }">
          <h3 class="fc__group-h">AANI rejection example</h3>
          <p class="fc__hint">
            Evidence one payment rejected on AANI, mapped to the <code>Rejected</code> status with a
            correctly namespaced <code>AANI.&lt;code&gt;</code> reason (for example
            <code>AANI.AM04</code>). The rail code MUST NOT be transposed into the <code>LFI.</code>
            namespace.
          </p>
          <label class="fc__field" style="max-width: 20rem; margin-bottom: 0.85rem">
            <span class="fc__flabel">Reject reason code</span>
            <input v-model="aaniReject.rejectCode" class="fc__input fc__input--mono" placeholder="AANI.AM04" spellcheck="false" />
          </label>
          <FcFileInput
            v-model="aaniReject.postman"
            label="Postman — PATCH /payment-log/{paymentId} (Rejected)"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of the PATCH /payment-log/{paymentId} call to the Consent Manager setting status Rejected with the AANI.<code> reject reason code."
          />
        </div>

        <!-- Creditor & Risk -->
        <div class="fc__group" :class="{ 'fc__group--done': creditorRiskComplete }">
          <h3 class="fc__group-h">Creditor validation &amp; Risk handling</h3>
          <p class="fc__hint">
            The Creditor account arrives inside the encrypted <code>PersonalIdentifiableInformation</code>,
            so evidence decrypting it and validating the creditor. The <code>Risk</code> object (AERisk)
            is cleartext — evidence that it is received and used in your fraud/screening.
          </p>
          <FcFileInput
            v-model="creditorRisk.decryptScreenshot"
            label="PII decryption"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot evidencing decryption of the payment PersonalIdentifiableInformation."
          />
          <FcFileInput
            v-model="creditorRisk.creditorScreenshot"
            label="Creditor validation"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot evidencing Creditor account validation — reachability and/or CoP confirmation (Risk.CreditorIndicators.IsCreditorConfirmed)."
          />
          <label class="fc__flabel fc__flabel--block" for="cr-creditor-text">Creditor validation rules — beyond the OpenAPI spec</label>
          <textarea
            id="cr-creditor-text"
            v-model="creditorRisk.creditorValidationText"
            class="fc__textarea"
            placeholder="Describe the fields and validations you place on the TPP when validating the Creditor that go beyond the OpenAPI spec — e.g. always requiring the IBAN, name-match thresholds, or rejecting specific account types."
          />
          <FcFileInput
            v-model="creditorRisk.riskScreenshot"
            label="Risk object received &amp; used"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot evidencing the Risk object is received and consumed in fraud/screening."
          />
          <label class="fc__flabel fc__flabel--block" for="cr-risk-text">Risk validation rules — beyond the OpenAPI spec</label>
          <textarea
            id="cr-risk-text"
            v-model="creditorRisk.riskValidationText"
            class="fc__textarea"
            placeholder="Describe any validations you apply to the Risk object that go beyond what the OpenAPI spec defines — e.g. required indicators, cross-checks, or rejection conditions."
          />
        </div>

        <!-- Data sharing before payment -->
        <div class="fc__group" :class="{ 'fc__group--done': dataSharingComplete }">
          <h3 class="fc__group-h">Account &amp; balance reads before the payment</h3>
          <p class="fc__hint">
            Evidence a payment consent carrying <code>ReadAccountsBasic</code> /
            <code>ReadAccountsDetail</code> and <code>ReadBalances</code> — a successful account read and
            balance read <a :href="area.accountPermsDocHref" target="_blank" rel="noopener">before</a> a
            successful payment. Account reads are served from
            <code>{{ accountInfoBaseUrl }}</code>.
          </p>
          <label class="fc__field" style="max-width: 26rem; margin-bottom: 0.85rem">
            <span class="fc__flabel">Pre-production ConsentId</span>
            <input v-model="dataSharing.consentId" class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" />
          </label>
          <FcFileInput
            v-model="dataSharing.accountsPostman"
            label="Postman — GET /accounts"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of a successful GET /accounts on the payment consent."
          />
          <FcFileInput
            v-model="dataSharing.balancesPostman"
            label="Postman — GET /accounts/{AccountId}/balances"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of a successful GET /accounts/{AccountId}/balances on the payment consent."
          />
          <FcFileInput
            v-model="dataSharing.postPaymentsPostman"
            label="Postman — subsequent POST /payments"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of the successful POST /payments made after the account and balance reads."
          />
          <FcFileInput
            v-model="dataSharing.authScreenshot"
            label="Authorisation page"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of your authorisation page where the customer authorised this payment consent."
          />
        </div>

        <!-- Refund after payment -->
        <div class="fc__group" :class="{ 'fc__group--done': refundComplete }">
          <h3 class="fc__group-h">Refund-account read after the payment</h3>
          <p class="fc__hint">
            Evidence a payment consent carrying <code>ReadRefundAccount</code> — a successful
            <a :href="area.refundsDocHref" target="_blank" rel="noopener">refund-account read</a> after a
            successful payment.
          </p>
          <label class="fc__field" style="max-width: 26rem; margin-bottom: 0.85rem">
            <span class="fc__flabel">Pre-production ConsentId</span>
            <input v-model="refund.consentId" class="fc__input fc__input--mono" placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5" spellcheck="false" />
          </label>
          <FcFileInput
            v-model="refund.postPaymentsPostman"
            label="Postman — POST /payments"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of the successful POST /payments."
          />
          <FcFileInput
            v-model="refund.refundPostman"
            label="Postman — GET /payment-consents/{ConsentId}/refund"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of the successful refund-account read after the payment."
          />
          <FcFileInput
            v-model="refund.authScreenshot"
            label="Authorisation page"
            accept="image/png,image/jpeg,image/webp"
            hint="Screenshot of your authorisation page where the customer authorised this payment consent."
          />
        </div>

        <!-- Payment authorisation screen -->
        <div class="fc__group" :class="{ 'fc__group--done': authScreensComplete }">
          <h3 class="fc__group-h">Payment authorisation screen</h3>
          <p class="fc__hint">
            The customer authorises the payment consent on your own authorisation page, so these
            screenshots come from the LFI side: the debtor account when the TPP specified it in the
            consent, and each Confirmation of Payee <code>NameMatchIndicator</code>
            (<code>ConfirmationOfPayee.Yes</code> / <code>ConfirmationOfPayee.Partial</code> /
            <code>ConfirmationOfPayee.No</code>) surfaced to the customer. Each scenario is its own
            pre-production consent.
          </p>
          <div v-for="s in area.authScreenScenarios" :key="s.key" class="fc__rail-ev">
            <div class="fc__rail-ev-head">
              <span class="fc__rail-ev-name">{{ s.label }}</span>
              <code v-if="s.indicator" class="fc__rail-ev-status">{{ s.indicator }}</code>
            </div>
            <p class="fc__rail-ev-note">{{ s.guidance }}</p>
            <label class="fc__field" style="max-width: 26rem; margin-bottom: 0.85rem">
              <span class="fc__flabel">Pre-production ConsentId</span>
              <input
                v-model="authScreens[s.key]!.consentId"
                class="fc__input fc__input--mono"
                placeholder="e.g. cac2381a-7111-4c5f-bc2f-4319a93da7c5"
                spellcheck="false"
              />
            </label>
            <FcFileInput
              v-model="authScreens[s.key]!.screenshot"
              :label="`Authorisation page — ${s.label}`"
              accept="image/png,image/jpeg,image/webp"
              :hint="`Screenshot of your authorisation page for this consent showing ${s.indicator ? s.indicator + ' to the customer' : 'the TPP-specified debtor account'}.`"
            />
          </div>
        </div>
      </section>

      <!-- Step 4 — Review & generate -->
      <section v-show="currentStep === 4" class="fc__panel">
        <h2 class="fc__h2">Review &amp; generate</h2>
        <p class="fc__lede">
          Review the summary below, add any comments, then download your submission. The ZIP contains a
          <code>summary.html</code>, your Testing Tool report, and every screenshot — attach it to your
          <strong>{{ area.certType }}</strong> Service Desk ticket.
        </p>

        <dl class="fc__review">
          <div><dt>Organisation</dt><dd>{{ org || '—' }}</dd></div>
          <div><dt>Submitted by</dt><dd>{{ identityName || '—' }}</dd></div>
          <div><dt>Version</dt><dd>{{ form.version.toUpperCase() }}</dd></div>
          <div><dt>Payment type</dt><dd>{{ area.paymentType }}</dd></div>
          <div><dt>Segments</dt><dd>{{ form.segment.join(', ') || '—' }}</dd></div>
          <div><dt>Rails</dt><dd>{{ supportedRails.map((r) => r.label).join(', ') || '—' }}</dd></div>
          <div><dt>Payment limit</dt><dd>{{ form.paymentLimit ? `${form.paymentLimit} AED` : '—' }}</dd></div>
        </dl>

        <div class="fc-comment">
          <label class="fc-comment__label" for="pay-comments">Comments <span class="fc__opt">(optional)</span></label>
          <textarea
            id="pay-comments"
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
          :title="!canAdvance && currentStep === 3 ? 'Complete every evidence group first' : ''"
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
.fc__hint { font-family: var(--at-sans); font-size: 0.84rem; line-height: 1.55; color: var(--at-mute); margin: 0 0 0.85rem; max-width: 46rem; }
.fc__hint a { color: var(--at-teal-deep); }
.fc__hint code { font-family: var(--at-mono); font-size: 0.78rem; background: var(--at-surface); padding: 0.05rem 0.3rem; border: 1px solid var(--at-grid-line); word-break: break-all; }

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

.fc__rails { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 0.75rem; margin-bottom: 1.75rem; }
.fc__rail {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: left;
  padding: 0.85rem 1rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  border-left: 3px solid var(--at-grid-line-2);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.fc__rail:hover { background: var(--at-surface); }
.fc__rail.on { border-left-color: var(--at-teal); background: color-mix(in srgb, var(--at-teal) 6%, var(--at-bg-cream)); }
.fc__rail-name { font-family: var(--at-sans); font-size: 0.95rem; font-weight: 700; color: var(--at-navy-deep); }
.fc__rail-status { font-family: var(--at-mono); font-size: 0.72rem; color: var(--at-teal-deep); }
.fc__rail-note { font-family: var(--at-sans); font-size: 0.78rem; line-height: 1.45; color: var(--at-mute); }

.fc__limit { margin-top: 0.5rem; max-width: 22rem; }

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
.fc__input--mono { font-family: var(--at-mono); font-size: 0.8rem; }

.fc__group {
  padding: 1.25rem 1.35rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-gold);
  margin-bottom: 1.1rem;
}
.fc__group--done { border-left-color: var(--at-teal); }
.fc__group-h { font-family: var(--at-serif); font-size: 1.2rem; font-weight: 600; color: var(--at-navy-deep); margin: 0 0 0.75rem; }

.fc__rail-ev { padding: 0.85rem 0 1rem; border-top: 1px dashed var(--at-grid-line); }
.fc__rail-ev:first-of-type { border-top: none; padding-top: 0; }
.fc__rail-ev-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem; }
.fc__rail-ev-name { font-family: var(--at-sans); font-size: 0.95rem; font-weight: 700; color: var(--at-navy-deep); }
.fc__rail-ev-status { font-family: var(--at-mono); font-size: 0.72rem; color: var(--at-teal-deep); background: color-mix(in srgb, var(--at-teal) 8%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.1rem 0.4rem; }
.fc__rail-ev-note { font-family: var(--at-sans); font-size: 0.8rem; line-height: 1.5; color: var(--at-mute); margin: 0 0 0.75rem; }

.fc__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 0.75rem; margin-bottom: 0.85rem; }
.fc__field { display: flex; flex-direction: column; gap: 0.3rem; }
.fc__flabel { font-family: var(--at-sans); font-size: 0.8rem; font-weight: 600; color: var(--at-navy-deep); }
.fc__flabel--block { display: block; margin: 0.6rem 0 0.35rem; }

.fc__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 80px;
  resize: vertical;
  padding: 0.6rem 0.7rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}
.fc__textarea:focus { outline: none; border-color: var(--at-navy-deep); }

.fc__empty { font-family: var(--at-sans); font-size: 0.92rem; color: var(--at-mute-2); padding: 0.5rem 0; }
.fc__link { background: none; border: none; padding: 0; font: inherit; color: var(--at-teal-deep); text-decoration: underline; cursor: pointer; }

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
