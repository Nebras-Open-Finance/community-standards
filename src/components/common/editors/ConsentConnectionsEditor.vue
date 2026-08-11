<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSharedState } from '../composables/useSharedState'

interface Consent {
  id: number
  status: string
  lfiDigit: number
  type: string
  maskedIban?: string | undefined
  paymentStatus?: string | undefined
  beneficiary?: string | undefined
  baseConsentId?: string | number
}

const props = withDefaults(
  defineProps<{ mode?: 'all' | 'data-sharing' | 'payments' }>(),
  { mode: 'all' },
)

const route = useRoute()
const isLfi = computed(() => (route.path ?? '').includes('/lfi-api-hub'))
const entityLabel = computed(() => isLfi.value ? 'TPP' : 'LFI')

const { updateField } = useSharedState()

const ALL_CONSENT_STATUSES = [
  'AwaitingAuthorization',
  'Authorized',
  'Rejected',
  'Suspended',
  'Paused',
  'Consumed',
  'Expired',
  'Revoked',
]

const CONSENT_STATUSES = computed(() => {
  let statuses = isLfi.value ? ALL_CONSENT_STATUSES.filter((s) => s !== 'Paused') : ALL_CONSENT_STATUSES
  if (props.mode === 'data-sharing') statuses = statuses.filter((s) => s !== 'Consumed')
  return statuses
})

const ALL_CONSENT_TYPES = [
  'Data Sharing',
  'Single Instant Payment',
  'Multi Payment (VariableOnDemand)',
  'Multi Payment (FixedOnDemand)',
  'Multi Payment (VariablePeriodicSchedule)',
  'Multi Payment (FixedPeriodicSchedule)',
  'Multi Payment (VariableDefinedSchedule)',
  'Multi Payment (FixedDefinedSchedule)',
  'Multi Payment (DelegatedSCA)',
]

const CONSENT_TYPES = computed(() => {
  if (props.mode === 'data-sharing') return ALL_CONSENT_TYPES.filter((t) => t === 'Data Sharing')
  if (props.mode === 'payments') return ALL_CONSENT_TYPES.filter((t) => t !== 'Data Sharing')
  return ALL_CONSENT_TYPES
})

function defaultTypeForMode(): string {
  if (props.mode === 'payments') return 'Single Instant Payment'
  return 'Data Sharing'
}

const PAYMENT_STATUSES = [
  'Pending',
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
  'Rejected',
]

// Beneficiary model — the shape of Initiation.Creditor[] the consent was authorized
// against. Only Variable On Demand and Delegated SCA accept more than one entry or
// no entry at all; every other type is fixed to a single creditor. See
// /tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor
const BENEFICIARY_MODELS = [
  { value: 'single',   label: 'Single Beneficiary' },
  { value: 'multiple', label: 'Multiple Beneficiaries' },
  { value: 'open',     label: 'Open Beneficiary' },
]

const MULTI_BENEFICIARY_TYPES = new Set([
  'Multi Payment (VariableOnDemand)',
  'Multi Payment (DelegatedSCA)',
])

function supportsBeneficiaryModel(type: string) {
  return MULTI_BENEFICIARY_TYPES.has(type)
}

const LFI_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const MAX_CONSENTS = 12

function randomLfiDigit() { return Math.floor(Math.random() * 9) + 1 }
function isSingleInstantPayment(type: string) { return type === 'Single Instant Payment' }
function isMultiPayment(type: string) { return type.startsWith('Multi Payment') }
function isConsumedDisabled(type: string) {
  return type === 'Data Sharing' || type === 'Multi Payment (DelegatedSCA)'
}
function isStatusDisabled(consentType: string, status: string) {
  if (isSingleInstantPayment(consentType) && (status === 'Authorized' || status === 'Paused')) return true
  if (isConsumedDisabled(consentType) && status === 'Consumed') return true
  return false
}
function getFallbackStatusForType(type: string) {
  if (isSingleInstantPayment(type)) return 'AwaitingAuthorization'
  return 'Authorized'
}
function normalizeStatusForType(type: string, status: string) {
  if (isLfi.value && status === 'Paused') return 'Authorized'
  if (isSingleInstantPayment(type) && (status === 'Authorized' || status === 'Paused')) return getFallbackStatusForType(type)
  if (isConsumedDisabled(type) && status === 'Consumed') return 'Authorized'
  return status
}
function needsPaymentStatus(consent: Consent) {
  return isSingleInstantPayment(consent.type) && consent.status === 'Consumed'
}
function generateMaskedIban(seed: number) {
  const suffix = String(seed).padStart(6, '0').slice(-6)
  return `AE** **** **** **** ${suffix.slice(0, 3)} ${suffix.slice(3)}`
}
function ensureMaskedIban(consent: Consent) {
  if (isSingleInstantPayment(consent.type) || isMultiPayment(consent.type)) {
    if (!consent.maskedIban) consent.maskedIban = generateMaskedIban(consent.id ?? Math.random() * 999999)
  } else {
    consent.maskedIban = undefined
  }
}

function ensureBeneficiary(consent: Consent) {
  if (!supportsBeneficiaryModel(consent.type)) {
    consent.beneficiary = undefined
    return
  }
  if (!BENEFICIARY_MODELS.some((m) => m.value === consent.beneficiary)) {
    consent.beneficiary = 'single'
  }
}

function onTypeChanged(consent: Consent) {
  consent.status = normalizeStatusForType(consent.type, consent.status)
  ensureMaskedIban(consent)
  ensureBeneficiary(consent)
}

const ALL_SEED_CONSENTS: Consent[] = [
  { id: 1,  status: 'Authorized',            lfiDigit: 9, type: 'Data Sharing',                              baseConsentId: 3 },
  { id: 2,  status: 'Revoked',               lfiDigit: randomLfiDigit(), type: 'Data Sharing',               baseConsentId: '' },
  { id: 3,  status: 'Expired',               lfiDigit: 9, type: 'Data Sharing',                              baseConsentId: '' },
  { id: 4,  status: 'Authorized',            lfiDigit: 5, type: 'Data Sharing',                              baseConsentId: '' },
  { id: 5,  status: 'Suspended',             lfiDigit: 2, type: 'Data Sharing',                              baseConsentId: '' },
  { id: 6,  status: 'Paused',                lfiDigit: 7, type: 'Data Sharing',                              baseConsentId: '' },
  { id: 7,  status: 'Rejected',              lfiDigit: 1, type: 'Data Sharing',                              baseConsentId: '' },
  { id: 8,  status: 'AwaitingAuthorization', lfiDigit: randomLfiDigit(), type: 'Single Instant Payment',     maskedIban: generateMaskedIban(8),  baseConsentId: '' },
  { id: 9,  status: 'Consumed',              lfiDigit: randomLfiDigit(), type: 'Single Instant Payment',     maskedIban: generateMaskedIban(9),  paymentStatus: 'AcceptedWithoutPosting', baseConsentId: '' },
  { id: 10, status: 'Consumed',              lfiDigit: randomLfiDigit(), type: 'Single Instant Payment',     maskedIban: generateMaskedIban(10), paymentStatus: 'Rejected',                baseConsentId: '' },
  { id: 11, status: 'Rejected',              lfiDigit: randomLfiDigit(), type: 'Single Instant Payment',     maskedIban: generateMaskedIban(11), baseConsentId: '' },
  { id: 12, status: 'Authorized',            lfiDigit: 4, type: 'Multi Payment (VariableOnDemand)',          maskedIban: generateMaskedIban(12), beneficiary: 'multiple', baseConsentId: 15 },
  { id: 13, status: 'Suspended',             lfiDigit: randomLfiDigit(), type: 'Multi Payment (FixedOnDemand)', maskedIban: generateMaskedIban(13), baseConsentId: '' },
  { id: 14, status: 'Authorized',            lfiDigit: 6, type: 'Multi Payment (VariablePeriodicSchedule)',  maskedIban: generateMaskedIban(14), baseConsentId: '' },
  { id: 15, status: 'Revoked',               lfiDigit: 4, type: 'Multi Payment (VariableOnDemand)',          maskedIban: generateMaskedIban(12), beneficiary: 'multiple', baseConsentId: '' },
  { id: 16, status: 'Expired',               lfiDigit: 3, type: 'Multi Payment (FixedDefinedSchedule)',      maskedIban: generateMaskedIban(16), baseConsentId: '' },
  { id: 17, status: 'Authorized',            lfiDigit: 8, type: 'Multi Payment (DelegatedSCA)',              maskedIban: generateMaskedIban(17), beneficiary: 'open', baseConsentId: '' },
]

function seedConsents(): Consent[] {
  if (props.mode === 'data-sharing') return ALL_SEED_CONSENTS.filter((c) => c.type === 'Data Sharing')
  if (props.mode === 'payments') return ALL_SEED_CONSENTS.filter((c) => c.type !== 'Data Sharing')
  return ALL_SEED_CONSENTS
}

let nextId = ALL_SEED_CONSENTS.reduce((m, c) => Math.max(m, c.id), 0) + 1
const consents = ref<Consent[]>(seedConsents())

function addConsent() {
  if (consents.value.length >= MAX_CONSENTS) return
  const type = defaultTypeForMode()
  consents.value.push({
    id: nextId++,
    status: getFallbackStatusForType(type),
    lfiDigit: randomLfiDigit(),
    type,
    baseConsentId: '',
  })
}

function removeConsent(id: number) {
  if (consents.value.length <= 1) return
  consents.value = consents.value.filter((c) => c.id !== id)
}

watch(
  consents,
  (val) => {
    for (const consent of val) {
      consent.status = normalizeStatusForType(consent.type, consent.status)
      ensureMaskedIban(consent)
      ensureBeneficiary(consent)
      if (isSingleInstantPayment(consent.type) && consent.status === 'Consumed') {
        if (!consent.paymentStatus) consent.paymentStatus = 'Pending'
      } else {
        consent.paymentStatus = undefined
      }
    }

    const payload = val.map((item) => ({
      id: item.id,
      status: item.status,
      lfiDigit: Number(item.lfiDigit),
      type: item.type,
      maskedIban: item.maskedIban,
      paymentStatus: item.paymentStatus,
      beneficiary: item.beneficiary,
      baseConsentId: item.baseConsentId || undefined,
    }))
    updateField('consentConnections', JSON.stringify(payload))
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <section class="cce">
    <header class="cce__header">
      <span class="cce__eyebrow">
        <span class="cce__eyebrow-dash" />
        Simulated consents
      </span>
      <span class="cce__subtitle">Configure the consents shown on the Consent Management screen</span>
    </header>

    <div class="cce__rows">
      <div v-for="consent in consents" :key="consent.id" class="cce__row">
        <div class="cce__field cce__field--status">
          <label class="cce__label">Status</label>
          <select class="cce__control" v-model="consent.status">
            <option
              v-for="status in CONSENT_STATUSES"
              :key="status"
              :value="status"
              :disabled="isStatusDisabled(consent.type, status)"
            >{{ status }}</option>
          </select>
        </div>

        <div class="cce__field cce__field--lfi">
          <label class="cce__label">{{ entityLabel }}</label>
          <select class="cce__control" v-model.number="consent.lfiDigit">
            <option v-for="digit in LFI_DIGITS" :key="digit" :value="digit">{{ digit }}</option>
          </select>
        </div>

        <div class="cce__field cce__field--type">
          <label class="cce__label">Type</label>
          <select class="cce__control" v-model="consent.type" @change="onTypeChanged(consent)">
            <option v-for="type in CONSENT_TYPES" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div v-if="supportsBeneficiaryModel(consent.type)" class="cce__field cce__field--beneficiary">
          <label class="cce__label">Beneficiary</label>
          <select class="cce__control" v-model="consent.beneficiary">
            <option v-for="model in BENEFICIARY_MODELS" :key="model.value" :value="model.value">{{ model.label }}</option>
          </select>
        </div>

        <div v-if="needsPaymentStatus(consent)" class="cce__field cce__field--payment">
          <label class="cce__label">Payment status</label>
          <select class="cce__control" v-model="consent.paymentStatus">
            <option v-for="ps in PAYMENT_STATUSES" :key="ps" :value="ps">{{ ps }}</option>
          </select>
        </div>

        <div class="cce__field cce__field--base">
          <label class="cce__label">BaseConsentId</label>
          <input class="cce__control" type="text" v-model="consent.baseConsentId" placeholder="Optional" />
        </div>

        <button
          type="button"
          class="cce__remove"
          :disabled="consents.length <= 1"
          title="Remove consent"
          aria-label="Remove consent"
          @click="removeConsent(consent.id)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>

    <footer class="cce__footer">
      <button
        type="button"
        class="cce__add"
        :disabled="consents.length >= MAX_CONSENTS"
        @click="addConsent"
      >+ Add consent</button>
      <span class="cce__count">{{ consents.length }} / {{ MAX_CONSENTS }}</span>
    </footer>
  </section>
</template>

<style scoped>
.cce {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  margin: 1.5rem 0;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.cce__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.cce__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
}
.cce__eyebrow-dash { width: 18px; height: 1px; background: currentColor; }
.cce__subtitle {
  font-size: 0.82rem;
  color: var(--at-mute-2);
}

.cce__rows {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cce__row {
  display: flex;
  align-items: flex-end;
  gap: 0.65rem;
  flex-wrap: wrap;
  padding: 0.65rem 0.85rem 0.65rem 0.65rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}

.cce__field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.cce__field--status  { min-width: 220px; }
.cce__field--lfi     { width: 90px; }
.cce__field--type    { min-width: 200px; }
.cce__field--beneficiary { min-width: 150px; }
.cce__field--payment { min-width: 240px; }
.cce__field--base    { width: 110px; }

.cce__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
}

.cce__control {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  color: var(--at-navy-deep);
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.cce__control:focus {
  border-color: var(--at-teal);
  box-shadow: inset 0 -2px 0 var(--at-teal);
}
.cce__control::placeholder { color: var(--at-mute); }

.cce__remove {
  background: none;
  border: none;
  padding: 0.4rem;
  margin-left: auto;        /* push to the far right of the row */
  align-self: center;        /* vertically centre against the field group */
  color: var(--at-mute);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.15s ease;
}
.cce__remove:hover:not(:disabled) { color: #B33A3A; }
.cce__remove:disabled { opacity: 0.3; cursor: not-allowed; }
.cce__remove svg { display: block; }

.cce__footer {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.1rem;
  border-top: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.cce__add {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  color: var(--at-navy-deep);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.cce__add:hover:not(:disabled) {
  background: var(--at-bg-cream);
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.cce__add:disabled { opacity: 0.4; cursor: not-allowed; }

.cce__count {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-mute);
}
</style>

<!--
  /tech/** override — match the requirements-page table-header style:
  navy-deep background with cream text on the "Simulated consents" header
  bar. Unscoped because the layout root (.is-tech) is outside this
  component.
-->
<style>
.is-tech .cce__header {
  background: var(--at-navy-deep);
  border-bottom: 0;
}
.is-tech .cce__eyebrow {
  color: var(--at-bg-cream);
}
.is-tech .cce__subtitle {
  color: color-mix(in srgb, var(--at-bg-cream) 75%, transparent);
}
</style>
