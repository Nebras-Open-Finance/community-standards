<route lang="yaml">
meta:
  layout: internal
  title: Certificate rotation
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// Certificate rotation — the browser front end for
// reports/src/scripts/createOrgCertificate.js. Layout and tokens follow
// ReportPanel so it sits with the other API Hub tools; it does not use
// ReportPanel itself because this is a form that submits, not a download.

import { computed, onMounted, reactive, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ENV_LABEL, type ReportEnv } from '@/composables/useReports'
import {
  CERT_TYPES, ROTATION_ENVS, useCertificateRotation, type CertType,
} from '@/composables/useCertificateRotation'

useHead({ title: 'Certificate rotation' })

const {
  env, organisationId, lfiCode, certType, csr, csrError,
  orgIdError, lfiCodeError, description, ready,
  busy, error, errorDetail, result, redirecting, loopDetected, restored,
  loadCsr, clearCsr, restore, submit, retry,
} = useCertificateRotation()

onMounted(restore)

const ENVS: ReportEnv[] = ['sandbox', 'prod']
const TYPES = Object.keys(CERT_TYPES) as CertType[]

// Field errors show once a field has been left, or once submit was attempted —
// not while the user is still typing into an empty form.
const touched = reactive({ org: false, lfi: false, type: false, csr: false })
const attempted = ref(false)
const show = (field: keyof typeof touched) => touched[field] || attempted.value

const fileInput = ref<HTMLInputElement | null>(null)
const dragging = ref(false)

async function onFile(e: Event): Promise<void> {
  touched.csr = true
  const input = e.target as HTMLInputElement
  await loadCsr(input.files?.[0])
  input.value = ''
}

async function onDrop(e: DragEvent): Promise<void> {
  dragging.value = false
  touched.csr = true
  await loadCsr(e.dataTransfer?.files?.[0])
}

function removeCsr(): void {
  clearCsr()
  touched.csr = true
}

// Normalise as typed: LFI codes are lowercase DNS labels.
function onLfiInput(e: Event): void {
  lfiCode.value = (e.target as HTMLInputElement).value.toLowerCase().replace(/\s/g, '')
}

function onSubmit(): void {
  attempted.value = true
  void submit()
}

const certificateJson = computed(() =>
  result.value ? JSON.stringify(result.value.certificate, null, 2) : '',
)

const copied = ref(false)
async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(certificateJson.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch { /* clipboard blocked — the text is selectable */ }
}

function download(): void {
  if (!result.value) return
  const blob = new Blob([certificateJson.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${lfiCode.value.trim()}-${result.value.certType}-${result.value.env}.jwk.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="cr">
    <div class="cr__eyebrow">API Hub</div>
    <h1 class="cr__title">Certificate Rotation</h1>
    <p class="cr__lede">
      Submit an LFI's certificate signing request to the directory and receive the
      issued certificate.
    </p>

    <form class="cr__card" novalidate @submit.prevent="onSubmit">
      <!-- Environment -->
      <div>
        <div class="cr__label">Environment</div>
        <div class="cr__envs">
          <button
            v-for="value in ENVS"
            :key="value"
            type="button"
            class="cr__env"
            :class="{
              'cr__env--on': env === value,
              'cr__env--off': !ROTATION_ENVS.includes(value),
            }"
            :disabled="!ROTATION_ENVS.includes(value)"
            :aria-pressed="env === value"
            :title="ROTATION_ENVS.includes(value) ? undefined : 'Not yet available'"
            @click="env = value"
          >
            <span class="cr__dot" :class="`cr__dot--${value}`" />
            {{ ENV_LABEL[value] }}
            <span v-if="!ROTATION_ENVS.includes(value)" class="cr__soon">Coming soon</span>
          </button>
        </div>
      </div>

      <!-- CSR -->
      <div>
        <div class="cr__label" id="cr-csr-label">Certificate signing request</div>
        <div
          v-if="!csr"
          class="cr__drop"
          :class="{ 'cr__drop--over': dragging, 'cr__drop--bad': show('csr') && csrError }"
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop.prevent="onDrop"
        >
          <p class="cr__dropline">Drop a <code>.csr</code> file here, or</p>
          <button type="button" class="cr__pick" @click="fileInput?.click()">Choose file</button>
          <input
            ref="fileInput"
            type="file"
            class="cr__file"
            accept=".csr,.req,.pem,application/pkcs10"
            aria-labelledby="cr-csr-label"
            @change="onFile"
          >
          <p class="cr__hint">PEM-encoded CSR only. Never upload a private key.</p>
        </div>
        <div v-else class="cr__chosen">
          <div>
            <div class="cr__fname">{{ csr.name }}</div>
            <div class="cr__hint">
              <template v-if="csr.organisationId">Organisation in CSR: <code>{{ csr.organisationId }}</code></template>
              <template v-else>No organisation ID found in the CSR subject.</template>
            </div>
          </div>
          <button type="button" class="cr__pick" @click="removeCsr">Remove</button>
        </div>
        <p v-if="csrError" class="cr__ferr">{{ csrError }}</p>
        <p v-else-if="show('csr') && !csr" class="cr__ferr">Upload the certificate signing request.</p>
      </div>

      <!-- Organisation ID -->
      <div>
        <label class="cr__label" for="cr-org">Organisation ID</label>
        <input
          id="cr-org"
          v-model="organisationId"
          class="cr__input"
          :class="{ 'cr__input--bad': show('org') && orgIdError }"
          type="text"
          inputmode="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="a084403e-b182-4369-8ec2-2e22b125b78c"
          :aria-invalid="show('org') && !!orgIdError"
          aria-describedby="cr-org-msg"
          @blur="touched.org = true"
        >
        <p v-if="show('org') && orgIdError" id="cr-org-msg" class="cr__ferr">{{ orgIdError }}</p>
        <p v-else id="cr-org-msg" class="cr__hint">The LFI's organisation ID in the Trust Framework directory.</p>
      </div>

      <!-- Certificate type -->
      <div>
        <div class="cr__label" id="cr-type-label">Certificate type</div>
        <div class="cr__types" role="radiogroup" aria-labelledby="cr-type-label">
          <button
            v-for="t in TYPES"
            :key="t"
            type="button"
            role="radio"
            class="cr__type"
            :class="{ 'cr__type--on': certType === t }"
            :aria-checked="certType === t"
            @click="certType = t; touched.type = true"
          >
            <span class="cr__tname">{{ t }}</span>
            <span class="cr__tuse">{{ CERT_TYPES[t].usage }}</span>
          </button>
        </div>
        <p v-if="show('type') && !certType" class="cr__ferr">Choose a certificate type.</p>
        <p v-else-if="certType" class="cr__hint">Issued as <code>{{ CERT_TYPES[certType].type }}</code>.</p>
      </div>

      <!-- LFI code -->
      <div>
        <label class="cr__label" for="cr-lfi">LFI code</label>
        <input
          id="cr-lfi"
          :value="lfiCode"
          class="cr__input"
          :class="{ 'cr__input--bad': show('lfi') && lfiCodeError }"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          maxlength="32"
          placeholder="e.g. adcbrt"
          :aria-invalid="show('lfi') && !!lfiCodeError"
          aria-describedby="cr-lfi-msg"
          @input="onLfiInput"
          @blur="touched.lfi = true"
        >
        <p v-if="show('lfi') && lfiCodeError" id="cr-lfi-msg" class="cr__ferr">{{ lfiCodeError }}</p>
        <p v-else id="cr-lfi-msg" class="cr__hint">
          As it appears in <code>rs1.<b>{{ lfiCode.trim() || 'lfi-code' }}</b>.apihub.openfinance.ae</code>
        </p>
      </div>

      <div class="cr__rule" />

      <div class="cr__row">
        <div class="cr__summary">
          <div class="cr__fname">Description</div>
          <div class="cr__hint"><code>{{ description }}</code></div>
        </div>
        <button type="submit" class="cr__go" :disabled="busy || redirecting || (attempted && !ready)">
          {{ busy ? 'Creating…' : 'Create certificate' }}
        </button>
      </div>

      <p v-if="restored && !busy" class="cr__note">
        Signed in. Your form has been restored — check it and press
        <strong>Create certificate</strong> to submit.
      </p>

      <p v-if="redirecting" class="cr__note">
        Taking you to the Trust Framework to sign in. Your form is kept, and you
        submit it again when you come back.
      </p>

      <div v-else-if="loopDetected" class="cr__error">
        <p class="cr__errline">Sign-in didn't complete.</p>
        <p class="cr__errline">
          We sent you to the Trust Framework but the session didn't stick. Try
          again, and if this keeps happening, check that third-party cookies are
          allowed for this site and that your directory account can manage this
          organisation's certificates.
        </p>
        <button type="button" class="cr__pick" @click="retry">Try again</button>
      </div>

      <p v-else-if="busy" class="cr__note">Submitting the CSR to the {{ ENV_LABEL[env] }} directory…</p>

      <div v-else-if="error" class="cr__error">
        <p class="cr__errline">{{ error }}</p>
        <pre v-if="errorDetail" class="cr__detail">{{ errorDetail }}</pre>
      </div>
    </form>

    <section v-if="result" class="cr__card cr__result" aria-live="polite">
      <div class="cr__row">
        <div>
          <div class="cr__done">Certificate created in {{ ENV_LABEL[result.env] }}.</div>
          <div class="cr__hint">
            {{ result.certType }} · <code>{{ result.certificateType }}</code> ·
            organisation <code>{{ result.organisationId }}</code>
          </div>
        </div>
        <div class="cr__actions">
          <button type="button" class="cr__pick" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
          <button type="button" class="cr__go" @click="download">Download JWK</button>
        </div>
      </div>
      <pre class="cr__json">{{ certificateJson }}</pre>
    </section>
  </div>
</template>

<style scoped>
.cr {
  max-width: 40rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}

.cr__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 700;
}

.cr__title {
  font-family: var(--at-serif);
  font-size: clamp(1.9rem, 3.4vw, 2.4rem);
  color: var(--at-navy-deep);
  margin: 0.4rem 0 0;
  line-height: 1.15;
}

.cr__lede { margin: 0.5rem 0 0; font-size: 1rem; color: var(--at-mute); }

.cr__card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-navy-deep);
  border-radius: 10px;
  padding: 1.75rem 1.9rem;
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cr__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  margin-bottom: 0.65rem;
}

/* Environment — same as ReportPanel, plus a disabled state. */
.cr__envs, .cr__types { display: flex; gap: 0.75rem; }

.cr__env, .cr__type {
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
.cr__env:hover:not(:disabled), .cr__type:hover { border-color: var(--at-teal); }
.cr__env--on, .cr__type--on {
  border-color: var(--at-navy-deep);
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}
.cr__env--off {
  opacity: 0.45;
  cursor: not-allowed;
  border-style: dashed;
}

.cr__soon {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
}

.cr__dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.cr__dot--sandbox { background: var(--at-teal); }
.cr__dot--prod { background: var(--at-gold); }

.cr__type { flex-direction: column; gap: 0.15rem; }
.cr__tname { font-size: 1rem; }
.cr__tuse {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
}

/* CSR upload */
.cr__drop {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.4rem 1rem;
  border: 1px dashed var(--at-grid-line);
  border-radius: 8px;
  text-align: center;
  transition: border-color 0.15s, background 0.15s;
}
.cr__drop--over { border-color: var(--at-teal); background: var(--at-bg-paper); }
.cr__drop--bad { border-color: #B3261E; }
.cr__dropline { margin: 0; font-size: 0.92rem; }
.cr__file { display: none; }

.cr__chosen {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
  border-radius: 8px;
  background: var(--at-bg-paper);
}

.cr__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 8px;
  background: transparent;
  font-family: var(--at-mono);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}
.cr__input:focus { outline: none; border-color: var(--at-teal); }
.cr__input--bad, .cr__input--bad:focus { border-color: #B3261E; }

.cr__hint { font-size: 0.82rem; color: var(--at-mute); margin: 0.35rem 0 0; overflow-wrap: anywhere; }
.cr__ferr { font-size: 0.82rem; color: #B3261E; margin: 0.35rem 0 0; }
.cr__fname { font-size: 0.95rem; font-weight: 600; color: var(--at-navy-deep); overflow-wrap: anywhere; }

.cr__rule { height: 1px; background: var(--at-grid-line); }

.cr__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.cr__summary { min-width: 0; flex: 1 1 14rem; }
.cr__actions { display: flex; gap: 0.6rem; }

.cr__go {
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
.cr__go:disabled { opacity: 0.6; cursor: not-allowed; }

.cr__pick {
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
.cr__pick:hover { border-color: var(--at-teal); }

.cr__note, .cr__error { margin: 0; font-size: 0.88rem; }
.cr__note { color: var(--at-mute); }
.cr__error { color: #B3261E; }
.cr__errline { margin: 0 0 0.4rem; }
.cr__done { font-size: 0.95rem; font-weight: 600; color: var(--at-teal-deep); }

.cr__detail, .cr__json {
  margin: 0;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-paper);
  font-family: var(--at-mono);
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--at-navy-deep);
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 22rem;
  overflow: auto;
}

@media (max-width: 30rem) {
  .cr__card { padding: 1.4rem 1.1rem; }
  .cr__envs { flex-direction: column; }
  .cr__row { align-items: stretch; }
  .cr__go { justify-content: center; }
}
</style>
