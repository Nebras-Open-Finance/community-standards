<script setup lang="ts">
// TPP Domestic Payments Functional Certification portal — the consumer side. The
// TPP ticks the domestic payment types it offers and, for each, provides the two
// objects it is responsible for constructing — the Consent (authorization_details
// / RAR) it sends at PAR and the Risk (AERisk) object it sends for fraud scoring,
// both edited in a schema-validated JSON editor — plus a Postman example of a
// payment made against a consent of that type. Delegated SCA additionally
// evidences the authentication the TPP performs before each payment and how it
// maps to Risk.DebtorIndicators.Authentication. A TPP may also declare it uses the
// account/balance reads a payment consent can carry (evidenced before the payment)
// and/or Refunds (after it). Identity comes from Sandbox Trust Framework SSO; the
// bundle is assembled entirely in the browser. Mirrors the other TPP portals.
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type {
  FcTppPaymentArea,
  FcTppPaymentCapability,
  FcTppPaymentType,
} from '@/data/functional-certification/types'
import { VERSIONS, type Version } from '@/data/versions'
import { useSandboxAuth } from '@/composables/useSandboxAuth'
import { createZip, downloadBlob, fileBytes, type ZipEntry } from '@/utils/zip'
import {
  buildPaymentTppSummaryHtml,
  type TppCapabilityEvidenceRef,
  type TppPaymentTypeEvidenceRef,
} from './summary-payment-tpp'
import {
  emptyPaymentTppFormState,
  emptyTppPaymentCapabilityState,
  emptyTppPaymentTypeState,
  type TppPaymentCapabilityState,
  type TppPaymentTypeState,
} from './types'

const props = defineProps<{ area: FcTppPaymentArea }>()

const { auth, loadMe, signIn } = useSandboxAuth()

const form = reactive(emptyPaymentTppFormState())

// Type states — consent/risk seeded up front so the summary has them even before
// an editor first commits; the editors then overwrite on load and on each edit.
const typeStates = reactive<Record<string, TppPaymentTypeState>>(
  Object.fromEntries(
    props.area.types.map((t) => {
      const st = emptyTppPaymentTypeState()
      st.consentJson = JSON.stringify(t.consentSeed, null, 2)
      st.riskJson = JSON.stringify(t.riskSeed, null, 2)
      return [t.key, st]
    }),
  ),
)
const typeState = (key: string): TppPaymentTypeState => typeStates[key] as TppPaymentTypeState

const capStates = reactive<Record<string, TppPaymentCapabilityState>>(
  Object.fromEntries(props.area.capabilities.map((c) => [c.key, emptyTppPaymentCapabilityState()])),
)
const capState = (key: string): TppPaymentCapabilityState => capStates[key] as TppPaymentCapabilityState

// Organisation(s) this certification is for — same pattern as the other TPP portals.
const selectedOrgIds = ref<string[]>([])
watch(
  () => auth.value.orgs,
  (orgs) => {
    if (orgs.length && selectedOrgIds.value.length === 0) selectedOrgIds.value = orgs.map((o) => o.id)
  },
  { immediate: true },
)

const STEPS = ['Your details', 'Payment types', 'Consent, Risk & evidence', 'Review & generate']
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
const baseUrl = computed(() => props.area.tppBaseUrlTemplate.replace('{VERSION}', form.version))

const selectedTypes = computed(() => props.area.types.filter((t) => typeState(t.key).selected))
const usedCapabilities = computed(() => props.area.capabilities.filter((c) => capState(c.key).used))

// Present the payment types with the shared endpoint-selector panel so type
// selection looks and behaves exactly like endpoint selection on the LFI side —
// the `Type` value takes the "method/path" mono line, the summary the name row.
const typeItems = computed(() =>
  props.area.types.map((t) => ({
    slug: t.key,
    name: t.label,
    method: '',
    path: t.summary,
    selected: typeState(t.key).selected,
  })),
)
function toggleType(key: string): void {
  typeState(key).selected = !typeState(key).selected
}
function selectAllTypes(): void {
  props.area.types.forEach((t) => (typeState(t.key).selected = true))
}
function clearTypes(): void {
  props.area.types.forEach((t) => (typeState(t.key).selected = false))
}
function setVersion(v: string): void {
  form.version = v as Version
}

function typeComplete(t: FcTppPaymentType): boolean {
  const st = typeState(t.key)
  if (!st.paymentPostman) return false
  if (t.isDelegatedSca && (!st.authScreenshot || !st.authExplanation.trim())) return false
  return true
}
function capComplete(c: FcTppPaymentCapability): boolean {
  return !!capState(c.key).postman
}
const typeCompleteCount = computed(() => selectedTypes.value.filter(typeComplete).length)
const allEvidenceComplete = computed(
  () =>
    selectedTypes.value.length > 0 &&
    selectedTypes.value.every(typeComplete) &&
    usedCapabilities.value.every(capComplete),
)

function canLeave(step: number): boolean {
  if (step === 2) return form.useCase.trim().length > 0 && selectedTypes.value.length > 0
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
watch(currentStep, () => {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
})

const canGenerate = computed(() => selectedTypes.value.length > 0 && !generating.value)

function extOf(name: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(name)
  return m ? (m[1] as string).toLowerCase() : 'png'
}
function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40)
}
const zipName = computed(() => {
  const who = slugify(org.value) || 'submission'
  return `functional-certification-tpp-domestic-payments-${who}.zip`
})

async function generate(): Promise<void> {
  generating.value = true
  genError.value = ''
  try {
    const entries: ZipEntry[] = []

    const typeRefs: TppPaymentTypeEvidenceRef[] = []
    for (const t of selectedTypes.value) {
      const st = typeState(t.key)
      const ref: TppPaymentTypeEvidenceRef = { type: t, state: st }
      entries.push({ name: `types/${t.key}/consent.json`, data: new TextEncoder().encode(st.consentJson) })
      entries.push({ name: `types/${t.key}/risk.json`, data: new TextEncoder().encode(st.riskJson) })
      if (st.paymentPostman) {
        ref.paymentPostman = `evidence/${t.key}/payment-postman.${extOf(st.paymentPostman.name)}`
        entries.push({ name: ref.paymentPostman, data: await fileBytes(st.paymentPostman) })
      }
      if (t.isDelegatedSca && st.authScreenshot) {
        ref.authScreenshot = `evidence/${t.key}/authentication.${extOf(st.authScreenshot.name)}`
        entries.push({ name: ref.authScreenshot, data: await fileBytes(st.authScreenshot) })
      }
      typeRefs.push(ref)
    }

    const capRefs: TppCapabilityEvidenceRef[] = []
    for (const c of usedCapabilities.value) {
      const st = capState(c.key)
      const urls = c.endpoints.map((e) => c.baseUrlTemplate.replace('{VERSION}', form.version) + e.path)
      const ref: TppCapabilityEvidenceRef = { capability: c, state: st, urls }
      if (st.postman) {
        ref.postman = `evidence/capabilities/${c.key}/postman.${extOf(st.postman.name)}`
        entries.push({ name: ref.postman, data: await fileBytes(st.postman) })
      }
      capRefs.push(ref)
    }

    const summary = buildPaymentTppSummaryHtml({
      area: props.area,
      form,
      identity: { name: identityName.value, org: org.value, email: auth.value.email ?? '' },
      baseUrl: baseUrl.value,
      types: typeRefs,
      capabilities: capRefs,
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
          sign-in used across the portal. Sign in so your submission is attributed to your organisation.
        </p>
        <FcIdentity v-model:selected="selectedOrgIds" />
      </section>

      <!-- Step 2 — Payment types & capabilities -->
      <section v-show="currentStep === 2" class="fc__panel">
        <h2 class="fc__h2">Payment types</h2>
        <p class="fc__lede">
          Tell us briefly why you offer domestic payments, pick the standards version, then tick every
          payment type you offer. For each one you will provide the Consent and Risk objects you
          construct, and a Postman example of a payment made against it on the Model Bank.
        </p>

        <label class="fc__label" for="fc-usecase">Use case</label>
        <p class="fc__hint">
          A sentence or two on what you use domestic payments for — for example, letting customers settle
          a merchant checkout, or move money between their own accounts.
        </p>
        <textarea
          id="fc-usecase"
          v-model="form.useCase"
          class="fc__textarea fc__textarea--sm"
          placeholder="e.g. We let customers pay an e-commerce basket at checkout by initiating a single instant payment straight from their bank account."
        />

        <label class="fc__label">Payment types you offer</label>
        <FcEndpointSelector
          title="Domestic Payments"
          :items="typeItems"
          :version="form.version"
          :versions="VERSIONS"
          @toggle="toggleType"
          @select-all="selectAllTypes"
          @clear="clearTypes"
          @update:version="setVersion"
        />

        <label class="fc__label">Optional capabilities</label>
        <p class="fc__hint">
          Beyond initiating payments, a payment consent can carry account and balance reads, and a
          refund-account read. Tick anything your proposition uses — you will evidence a balance read
          <strong>before</strong> the payment and a refund read <strong>after</strong> it.
        </p>
        <div class="fc__caps">
          <div
            v-for="c in area.capabilities"
            :key="c.key"
            class="fc__caps-item"
            :class="{ on: capState(c.key).used }"
            role="checkbox"
            :aria-checked="capState(c.key).used"
            tabindex="0"
            @click="capState(c.key).used = !capState(c.key).used"
            @keydown.enter.prevent="capState(c.key).used = !capState(c.key).used"
            @keydown.space.prevent="capState(c.key).used = !capState(c.key).used"
          >
            <span class="fc__caps-box">{{ capState(c.key).used ? '✓' : '' }}</span>
            <span class="fc__caps-info">
              <span class="fc__caps-name">{{ c.label }} <span class="fc__cap-when">{{ c.timing === 'before' ? 'before payment' : 'after payment' }}</span></span>
              <span class="fc__caps-desc">{{ c.description }}</span>
            </span>
          </div>
        </div>
      </section>

      <!-- Step 3 — Consent, Risk & evidence -->
      <section v-show="currentStep === 3" class="fc__panel">
        <h2 class="fc__h2">Consent, Risk &amp; evidence</h2>
        <p class="fc__lede">
          For each type, edit the <strong>Consent</strong> (<code>authorization_details</code>) and
          <strong>Risk</strong> (<code>AERisk</code>) objects to match what you send. The objects
          validate against the OpenAPI schema — edits commit on blur, and anything that does not match
          reverts. Your evidence is produced by <strong>making a payment against a consent of each type on
          the sandbox <a :href="area.sandboxEvidenceHref">AlTareq Model Bank</a></strong> using the
          <a :href="area.postmanGuideHref">Postman collection</a>, and attaching the Postman screenshot of
          that payment.
        </p>

        <div v-if="selectedTypes.length === 0" class="fc__empty">
          You haven’t selected any payment types yet.
          <button type="button" class="fc__link" @click="goTo(2)">Go back to select types</button>.
        </div>

        <template v-else>
          <div class="fc__progress-note" :class="{ 'fc__progress-note--done': allEvidenceComplete }">
            {{ typeCompleteCount }} of {{ selectedTypes.length }} payment types complete{{ allEvidenceComplete ? ' — you can continue.' : '.' }}
          </div>

          <div v-for="t in selectedTypes" :key="t.key" class="fc__type-block">
            <h3 class="fc__h3">
              {{ t.label }}
              <span class="fc__type-tag">{{ t.paymentType }}</span>
              <span v-if="typeComplete(t)" class="fc__done-tag">✓ complete</span>
            </h3>
            <p class="fc__sub">
              {{ t.summary }} See the <a :href="t.docHref">{{ t.label }} API guide</a>.
            </p>

            <EditableJson
              :spec="area.consentEditor.spec"
              :schema-name="area.consentEditor.schemaName"
              :initial-data="t.consentSeed"
              :state-field="`payment-consent-${t.key}`"
              label="Consent — authorization_details"
              description="The RAR object you send at /par"
              @update:json="typeState(t.key).consentJson = $event"
            />

            <EditableJson
              :spec="area.riskEditor.spec"
              :schema-name="area.riskEditor.schemaName"
              :initial-data="t.riskSeed"
              :state-field="`payment-risk-${t.key}`"
              label="Risk object (AERisk)"
              description="The Risk object you send for fraud scoring"
              @update:json="typeState(t.key).riskJson = $event"
            />

            <FcFileInput
              v-model:model-value="typeState(t.key).paymentPostman"
              label="Payment against this consent (Postman)"
              accept="image/*,.pdf"
              :hint="`Postman screenshot of a payment initiated against a ${t.label} consent on the Model Bank.`"
            />

            <template v-if="t.isDelegatedSca">
              <div class="fc__delegated">
                <p class="fc__sub">
                  <strong>Delegated SCA:</strong> you perform the customer authentication yourself before each
                  payment. Evidence that authentication and describe how it populates the
                  <code>Authentication</code> section of the Risk object above.
                </p>
                <FcFileInput
                  v-model:model-value="typeState(t.key).authScreenshot"
                  label="Authentication performed before the payment"
                  accept="image/*,.pdf"
                  hint="Screenshot of the SCA challenge your app performs before initiating a Delegated SCA payment."
                />
                <label class="fc__label" :for="`fc-auth-${t.key}`">
                  How this maps to <code>Risk.DebtorIndicators.Authentication</code>
                </label>
                <textarea
                  :id="`fc-auth-${t.key}`"
                  v-model="typeState(t.key).authExplanation"
                  class="fc__textarea fc__textarea--sm"
                  placeholder="e.g. A passkey (PossessionFactor) plus face recognition (InherenceFactor) is performed in-app; the pass/fail result is sent as ChallengeOutcome, with AuthenticationFlow: MFA and AuthenticationChannel: App."
                />
              </div>
            </template>
          </div>

          <!-- Optional capability evidence -->
          <template v-if="usedCapabilities.length">
            <h3 class="fc__h3">Optional capabilities</h3>
            <p class="fc__sub">
              Attach a Postman screenshot evidencing each capability you declared — a balance read before
              the payment, a refund read after it.
            </p>
            <div v-for="c in usedCapabilities" :key="c.key" class="fc__type-block">
              <h4 class="fc__h4">
                {{ c.label }}
                <span class="fc__cap-when">{{ c.timing === 'before' ? 'before payment' : 'after payment' }}</span>
                <span v-if="capComplete(c)" class="fc__done-tag">✓ complete</span>
              </h4>
              <p class="fc__sub">{{ c.description }} See the <a :href="c.docHref">API guide</a>.</p>
              <p class="fc__perms-note">
                <span
                  v-for="e in c.endpoints"
                  :key="e.path"
                  class="fc__perm"
                ><code>{{ e.method }}</code> {{ e.path }} — {{ e.permission }}</span>
              </p>
              <FcFileInput
                v-model:model-value="capState(c.key).postman"
                label="Capability evidence (Postman)"
                accept="image/*,.pdf"
                :hint="`Postman screenshot of a successful ${c.label} call ${c.timing === 'before' ? 'before' : 'after'} the payment.`"
              />
            </div>
          </template>
        </template>
      </section>

      <!-- Step 4 — Review & generate -->
      <section v-show="currentStep === 4" class="fc__panel">
        <h2 class="fc__h2">Review &amp; generate</h2>
        <p class="fc__lede">
          Review the summary below, add any comments, then download your submission. The ZIP contains a
          <code>summary.html</code>, the Consent and Risk JSON for each type, and every screenshot —
          attach it to your <strong>{{ area.certType }}</strong> Service Desk ticket.
        </p>

        <dl class="fc__review">
          <div><dt>Organisation</dt><dd>{{ org || '—' }}</dd></div>
          <div><dt>Submitted by</dt><dd>{{ identityName || '—' }}</dd></div>
          <div><dt>Version</dt><dd>{{ form.version.toUpperCase() }}</dd></div>
          <div><dt>Payment types</dt><dd>{{ selectedTypes.map((t) => t.label).join(', ') || '—' }}</dd></div>
          <div><dt>Capabilities</dt><dd>{{ usedCapabilities.map((c) => c.label).join(', ') || 'None' }}</dd></div>
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
.fc__h3 { font-family: var(--at-serif); font-size: 1.25rem; font-weight: 600; margin: 1.75rem 0 0.4rem; color: var(--at-navy-deep); display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem; }
.fc__h4 { font-family: var(--at-serif); font-size: 1.05rem; font-weight: 600; margin: 0 0 0.4rem; color: var(--at-navy-deep); display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem; }
.fc__sub { font-family: var(--at-sans); font-size: 0.9rem; line-height: 1.6; color: var(--at-mute-2); margin: 0 0 1rem; max-width: 48rem; }
.fc__sub a, .fc__lede a { color: var(--at-teal-deep); }
.fc__sub strong, .fc__lede strong { color: var(--at-navy-deep); }
.fc__lede { font-family: var(--at-sans); font-size: 0.98rem; line-height: 1.65; color: var(--at-mute-2); margin: 0 0 1.5rem; max-width: 48rem; }
.fc__lede code, .fc__sub code { font-family: var(--at-mono); font-size: 0.82rem; }

.fc__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-navy);
  font-weight: 700;
  margin: 1.25rem 0 0.3rem;
}
.fc__label code { font-family: var(--at-mono); font-size: 0.72rem; text-transform: none; letter-spacing: 0; }
.fc__opt { opacity: 0.6; font-weight: 400; }
.fc__hint { font-family: var(--at-sans); font-size: 0.85rem; color: var(--at-mute-2); margin: 0 0 0.5rem; line-height: 1.5; }
.fc__hint strong { color: var(--at-navy-deep); }

.fc__textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 0.6rem 0.75rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
  min-height: 110px;
  resize: vertical;
  line-height: 1.6;
}
.fc__textarea--sm { min-height: 70px; }
.fc__textarea:focus { outline: none; border-color: var(--at-navy-deep); }

/* Capability picker — mirrors the shared endpoint-selector rows (.ep-*) so it
   reads as the same control as the payment-type selection above it. */
.fc__caps { border: 1px solid var(--at-grid-line-2); background: var(--at-surface); margin-top: 0.4rem; }
.fc__caps-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 13px 20px;
  border-bottom: 1px solid var(--at-grid-line);
  cursor: pointer;
  transition: background 0.12s;
}
.fc__caps-item:last-child { border-bottom: none; }
.fc__caps-item:hover { background: var(--at-bg-cream); }
.fc__caps-item:focus-visible { outline: 2px solid var(--at-teal); outline-offset: -2px; }
.fc__caps-box {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--at-grid-line-2);
  background: var(--at-bg-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 11px;
  transition: background 0.15s, border-color 0.15s;
}
.fc__caps-item.on .fc__caps-box { background: var(--at-teal); border-color: var(--at-teal); }
.fc__caps-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.fc__caps-name { font-size: 13.5px; font-weight: 500; color: var(--at-navy-deep); display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; }
.fc__caps-desc { font-family: var(--at-mono); font-size: 10px; color: var(--at-mute); line-height: 1.5; }
.fc__cap-when { font-family: var(--at-mono); font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--at-teal-deep); }

.fc__type-block { border-left: 3px solid var(--at-grid-line-2); padding-left: 1.1rem; margin: 1.5rem 0; }
.fc__type-tag, .fc__done-tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
}
.fc__type-tag { color: var(--at-navy-deep); background: color-mix(in srgb, var(--at-navy) 8%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); }
.fc__done-tag { color: var(--at-teal-deep); background: color-mix(in srgb, var(--at-teal) 10%, var(--at-bg-cream)); }
.fc__delegated { border-left: 3px solid var(--at-gold); padding: 0.5rem 0 0.5rem 1rem; margin-top: 0.5rem; }

.fc__perms-note { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; margin: 0.5rem 0 0.75rem; }
.fc__perm { font-family: var(--at-mono); font-size: 0.72rem; background: color-mix(in srgb, var(--at-teal) 7%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.15rem 0.45rem; color: var(--at-navy-deep); }
.fc__perm code { font-family: var(--at-mono); }

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
