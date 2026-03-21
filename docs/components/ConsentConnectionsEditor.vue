<script setup>
import { ref, watch } from 'vue'
import { useSharedState } from './Composables/useSharedState.ts'

const { updateField } = useSharedState()

const CONSENT_STATUSES = [
  'AwaitingAuthorization',
  'Authorized',
  'Rejected',
  'Suspended',
  'Paused',
  'Consumed',
  'Expired',
  'Revoked'
]

const CONSENT_TYPES = [
  'Data Sharing',
  'Single Instant Payment',
  'Multi Payment (VariableOnDemand)',
  'Multi Payment (FixedOnDemand)',
  'Multi Payment (VariablePeriodicSchedule)',
  'Multi Payment (FixedPeriodicSchedule)',
  'Multi Payment (VariableDefinedSchedule)',
  'Multi Payment (FixedDefinedSchedule)',
  'Multi Payment (DelegatedSCA)'
]

const PAYMENT_STATUSES = [
  'Pending',
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
  'Rejected'
]

const LFI_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const MAX_CONSENTS = 12

function randomLfiDigit() {
  return Math.floor(Math.random() * 9) + 1
}

function isSingleInstantPayment(type) {
  return type === 'Single Instant Payment'
}

function isMultiPayment(type) {
  return type.startsWith('Multi Payment')
}

function getFallbackStatusForType(type) {
  if (isSingleInstantPayment(type)) return 'AwaitingAuthorization'
  return 'Authorized'
}

function normalizeStatusForType(type, status) {
  if (isSingleInstantPayment(type) && (status === 'Authorized' || status === 'Paused')) {
    return getFallbackStatusForType(type)
  }
  if (isConsumedDisabled(type) && status === 'Consumed') {
    return 'Authorized'
  }
  return status
}

function onTypeChanged(consent) {
  consent.status = normalizeStatusForType(consent.type, consent.status)
  ensureMaskedIban(consent)
}

function isConsumedDisabled(type) {
  return type === 'Data Sharing' || type === 'Multi Payment (DelegatedSCA)'
}

function isStatusDisabled(consentType, status) {
  if (isSingleInstantPayment(consentType) && (status === 'Authorized' || status === 'Paused')) return true
  if (isConsumedDisabled(consentType) && status === 'Consumed') return true
  return false
}

function needsPaymentStatus(consent) {
  return isSingleInstantPayment(consent.type) && consent.status === 'Consumed'
}

function generateMaskedIban(seed) {
  const suffix = String(seed).padStart(6, '0').slice(-6)
  return `AE** **** **** **** ${suffix.slice(0, 3)} ${suffix.slice(3)}`
}

function ensureMaskedIban(consent) {
  if (isSingleInstantPayment(consent.type) || isMultiPayment(consent.type)) {
    if (!consent.maskedIban) consent.maskedIban = generateMaskedIban(consent.id ?? Math.random() * 999999)
  } else {
    consent.maskedIban = undefined
  }
}

let nextId = 8
const consents = ref([
  { id: 1, status: 'Authorized', lfiDigit: randomLfiDigit(), type: 'Data Sharing' },
  { id: 2, status: 'Revoked', lfiDigit: randomLfiDigit(), type: 'Data Sharing' },
  { id: 3, status: 'Expired', lfiDigit: randomLfiDigit(), type: 'Data Sharing' },
  { id: 4, status: 'AwaitingAuthorization', lfiDigit: randomLfiDigit(), type: 'Single Instant Payment', maskedIban: generateMaskedIban(4) },
  { id: 5, status: 'Consumed', lfiDigit: randomLfiDigit(), type: 'Single Instant Payment', maskedIban: generateMaskedIban(5), paymentStatus: 'AcceptedWithoutPosting' },
  { id: 6, status: 'Authorized', lfiDigit: randomLfiDigit(), type: 'Multi Payment (VariableOnDemand)', maskedIban: generateMaskedIban(6) },
  { id: 7, status: 'Suspended', lfiDigit: randomLfiDigit(), type: 'Multi Payment (FixedOnDemand)', maskedIban: generateMaskedIban(7) }
])

function addConsent() {
  if (consents.value.length >= MAX_CONSENTS) return
  consents.value.push({
    id: nextId++,
    status: getFallbackStatusForType('Data Sharing'),
    lfiDigit: randomLfiDigit(),
    type: 'Data Sharing'
  })
}

function removeConsent(id) {
  if (consents.value.length <= 1) return
  consents.value = consents.value.filter(item => item.id !== id)
}

watch(
  consents,
  (val) => {
    for (const consent of val) {
      consent.status = normalizeStatusForType(consent.type, consent.status)
      ensureMaskedIban(consent)
      if (isSingleInstantPayment(consent.type) && consent.status === 'Consumed') {
        if (!consent.paymentStatus) consent.paymentStatus = 'Pending'
      } else {
        consent.paymentStatus = undefined
      }
    }

    const payload = val.map(item => ({
      status: item.status,
      lfiDigit: Number(item.lfiDigit),
      type: item.type,
      maskedIban: item.maskedIban,
      paymentStatus: item.paymentStatus
    }))
    updateField('consentConnections', JSON.stringify(payload))
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="cce-panel">
    <div class="cce-header">
      <span class="cce-title">Simulated Consents</span>
      <span class="cce-subtitle">Configure the consents shown on the Consent Management screen</span>
    </div>

    <div class="cce-rows">
      <div v-for="consent in consents" :key="consent.id" class="cce-row">
        <div class="cce-field cce-field-status">
          <label class="cce-label">Status</label>
          <select class="cce-select" v-model="consent.status">
            <option
              v-for="status in CONSENT_STATUSES"
              :key="status"
              :value="status"
              :disabled="isStatusDisabled(consent.type, status)"
            >
              {{ status }}
            </option>
          </select>
        </div>

        <div class="cce-field cce-field-lfi">
          <label class="cce-label">LFI</label>
          <select class="cce-select" v-model.number="consent.lfiDigit">
            <option v-for="digit in LFI_DIGITS" :key="digit" :value="digit">{{ digit }}</option>
          </select>
        </div>

        <div class="cce-field cce-field-type">
          <label class="cce-label">Type</label>
          <select class="cce-select" v-model="consent.type" @change="onTypeChanged(consent)">
            <option v-for="type in CONSENT_TYPES" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div v-if="needsPaymentStatus(consent)" class="cce-field cce-field-payment-status">
          <label class="cce-label">Payment Status</label>
          <select class="cce-select" v-model="consent.paymentStatus">
            <option v-for="ps in PAYMENT_STATUSES" :key="ps" :value="ps">{{ ps }}</option>
          </select>
        </div>

        <button class="cce-remove" @click="removeConsent(consent.id)" :disabled="consents.length <= 1"
          title="Remove">
          x
        </button>
      </div>
    </div>

    <div class="cce-footer">
      <button class="cce-add" @click="addConsent" :disabled="consents.length >= MAX_CONSENTS">+ Add Consent</button>
      <span class="cce-count">{{ consents.length }} / {{ MAX_CONSENTS }}</span>
    </div>
  </div>
</template>

<style scoped>
.cce-panel {
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 39, 127, 0.06);
  background: #fff;
}

.cce-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  background: rgba(0, 39, 127, 0.04);
  border-bottom: 1px solid #bfdbfe;
  flex-wrap: wrap;
}

.cce-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(0, 39, 127, 0.8);
}

.cce-subtitle {
  font-size: 0.72rem;
  color: rgba(0, 39, 127, 0.45);
}

.cce-rows {
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.cce-row {
  display: flex;
  align-items: flex-end;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding: 0.5rem 0.4rem;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e8f0fe;
}

.cce-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cce-field-status {
  min-width: 210px;
}

.cce-field-lfi {
  width: 80px;
}

.cce-field-type {
  min-width: 180px;
}

.cce-field-payment-status {
  min-width: 240px;
}

.cce-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

.cce-select {
  font-size: 0.8rem;
  padding: 4px 7px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  background: #fff;
  color: #1a202c;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}

.cce-select:focus {
  border-color: rgba(0, 39, 127, 0.5);
}

.cce-remove {
  font-size: 0.75rem;
  width: 26px;
  height: 26px;
  border: 1px solid #fed7d7;
  border-radius: 5px;
  background: #fff0f0;
  color: #c53030;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 1px;
  transition: background 0.15s;
}

.cce-remove:hover:not(:disabled) {
  background: #fed7d7;
}

.cce-remove:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.cce-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-top: 1px solid #e8f0fe;
  background: #f8fafc;
}

.cce-add {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 12px;
  border: 1px solid rgba(0, 39, 127, 0.3);
  border-radius: 5px;
  background: #fff;
  color: rgba(0, 39, 127, 0.8);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.cce-add:hover:not(:disabled) {
  background: #e8f0fe;
  border-color: rgba(0, 39, 127, 0.6);
}

.cce-add:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.cce-count {
  font-size: 0.72rem;
  color: #94a3b8;
}
</style>
