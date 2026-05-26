<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSharedState } from '../composables/useSharedState'

type InsuranceType = 'Motor' | 'Health' | 'Home' | 'Life' | 'Travel' | 'Renters' | 'Employment'

interface TypeEntry {
  id: number
  type: InsuranceType
  permissions: string[]
}

interface InsuranceConsent {
  id: number
  status: string
  lfiDigit: number
  types: TypeEntry[]
  baseConsentId?: string | number
}

const route = useRoute()
const isLfi = computed(() => (route.path ?? '').includes('/lfi-api-hub'))
const entityLabel = computed(() => isLfi.value ? 'TPP' : 'LFI')

const { updateField } = useSharedState()

const ALL_CONSENT_STATUSES = [
  'AwaitingAuthorization', 'Authorized', 'Rejected',
  'Suspended', 'Paused', 'Expired', 'Revoked',
]

const CONSENT_STATUSES = computed(() =>
  isLfi.value ? ALL_CONSENT_STATUSES.filter((s) => s !== 'Paused') : ALL_CONSENT_STATUSES,
)

const INSURANCE_TYPES: InsuranceType[] = [
  'Motor', 'Health', 'Home', 'Life', 'Travel', 'Renters', 'Employment',
]

const ALL_PERMISSIONS = [
  'ReadInsurancePolicies',
  'ReadCustomerBasic',
  'ReadCustomerDetail',
  'ReadInsuranceProduct',
  'ReadInsurancePremium',
  'ReadCustomerPaymentDetails',
  'ReadCustomerClaims',
] as const

const PERMISSION_SHORT_LABELS: Record<string, string> = {
  ReadInsurancePolicies: 'Policy',
  ReadCustomerBasic: 'Basic',
  ReadCustomerDetail: 'Detail',
  ReadInsuranceProduct: 'Product',
  ReadInsurancePremium: 'Premium',
  ReadCustomerPaymentDetails: 'Payment',
  ReadCustomerClaims: 'Claims',
}

const LFI_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const MAX_CONSENTS = 12
const MAX_TYPES_PER_CONSENT = 4

function randomLfiDigit() { return Math.floor(Math.random() * 9) + 1 }

let nextTypeId = 100
function newTypeEntry(type: InsuranceType, permissions: string[]): TypeEntry {
  return { id: nextTypeId++, type, permissions: [...permissions] }
}

const ALL_PERMS = [...ALL_PERMISSIONS]
const ALL_SEED_CONSENTS: InsuranceConsent[] = [
  { id: 1, status: 'Authorized', lfiDigit: 3, baseConsentId: 2,
    types: [newTypeEntry('Motor', ALL_PERMS)] },
  { id: 2, status: 'Revoked', lfiDigit: 3, baseConsentId: '',
    types: [newTypeEntry('Motor', ALL_PERMS)] },
  { id: 3, status: 'Authorized', lfiDigit: 7, baseConsentId: '',
    types: [
      newTypeEntry('Health', ['ReadInsurancePolicies', 'ReadInsurancePremium', 'ReadCustomerPaymentDetails']),
      newTypeEntry('Life',   ['ReadInsurancePolicies', 'ReadCustomerClaims']),
    ] },
  { id: 4, status: 'Authorized', lfiDigit: 5, baseConsentId: '',
    types: [newTypeEntry('Life', ['ReadInsurancePolicies', 'ReadInsurancePremium', 'ReadCustomerClaims'])] },
  { id: 5, status: 'AwaitingAuthorization', lfiDigit: randomLfiDigit(), baseConsentId: '',
    types: [newTypeEntry('Home', ALL_PERMS)] },
  { id: 6, status: 'Suspended', lfiDigit: 2, baseConsentId: '',
    types: [newTypeEntry('Travel', ['ReadInsurancePolicies'])] },
  { id: 7, status: 'Paused', lfiDigit: 6, baseConsentId: '',
    types: [
      newTypeEntry('Motor', ['ReadInsurancePolicies']),
      newTypeEntry('Home',  ['ReadInsurancePolicies', 'ReadInsurancePremium']),
    ] },
  { id: 8, status: 'Expired', lfiDigit: 6, baseConsentId: '',
    types: [newTypeEntry('Employment', ['ReadInsurancePolicies', 'ReadCustomerBasic', 'ReadCustomerDetail'])] },
  { id: 9, status: 'Rejected', lfiDigit: 1, baseConsentId: '',
    types: [newTypeEntry('Travel', ['ReadInsurancePolicies'])] },
]

let nextId = ALL_SEED_CONSENTS.reduce((m, c) => Math.max(m, c.id), 0) + 1
const consents = ref<InsuranceConsent[]>(JSON.parse(JSON.stringify(ALL_SEED_CONSENTS)))

function unusedTypeFor(consent: InsuranceConsent): InsuranceType {
  const used = new Set(consent.types.map(t => t.type))
  return INSURANCE_TYPES.find(t => !used.has(t)) ?? 'Motor'
}

function addConsent() {
  if (consents.value.length >= MAX_CONSENTS) return
  consents.value.push({
    id: nextId++,
    status: 'Authorized',
    lfiDigit: randomLfiDigit(),
    types: [newTypeEntry('Motor', ALL_PERMS)],
    baseConsentId: '',
  })
}

function removeConsent(id: number) {
  if (consents.value.length <= 1) return
  consents.value = consents.value.filter((c) => c.id !== id)
}

function addType(consent: InsuranceConsent) {
  if (consent.types.length >= MAX_TYPES_PER_CONSENT) return
  consent.types.push(newTypeEntry(unusedTypeFor(consent), ALL_PERMS))
}

function removeType(consent: InsuranceConsent, entryId: number) {
  if (consent.types.length <= 1) return
  consent.types = consent.types.filter(t => t.id !== entryId)
}

function togglePermission(entry: TypeEntry, perm: string) {
  if (entry.permissions.includes(perm)) {
    entry.permissions = entry.permissions.filter(p => p !== perm)
  } else {
    entry.permissions = [...entry.permissions, perm]
  }
}

function normalizeStatus(consent: InsuranceConsent): string {
  if (isLfi.value && consent.status === 'Paused') return 'Authorized'
  return consent.status
}

watch(
  consents,
  (val) => {
    for (const consent of val) {
      consent.status = normalizeStatus(consent)
    }

    const payload = val.map((item) => ({
      id: item.id,
      status: item.status,
      lfiDigit: Number(item.lfiDigit),
      types: item.types.map(t => ({ type: t.type, permissions: [...t.permissions] })),
      baseConsentId: item.baseConsentId || undefined,
    }))
    updateField('insuranceConsentConnections', JSON.stringify(payload))
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <section class="ice">
    <header class="ice__header">
      <span class="ice__eyebrow">
        <span class="ice__eyebrow-dash" />
        Simulated consents
      </span>
      <span class="ice__subtitle">Insurance consents may carry multiple insurance types, each with its own permissions</span>
    </header>

    <div class="ice__rows">
      <div v-for="consent in consents" :key="consent.id" class="ice__consent">
        <div class="ice__row ice__row--main">
          <div class="ice__field ice__field--status">
            <label class="ice__label">Status</label>
            <select class="ice__control" v-model="consent.status">
              <option v-for="status in CONSENT_STATUSES" :key="status" :value="status">{{ status }}</option>
            </select>
          </div>

          <div class="ice__field ice__field--lfi">
            <label class="ice__label">{{ entityLabel }}</label>
            <select class="ice__control" v-model.number="consent.lfiDigit">
              <option v-for="digit in LFI_DIGITS" :key="digit" :value="digit">{{ digit }}</option>
            </select>
          </div>

          <div class="ice__field ice__field--base">
            <label class="ice__label">BaseConsentId</label>
            <input class="ice__control" type="text" v-model="consent.baseConsentId" placeholder="Optional" />
          </div>

          <button
            type="button"
            class="ice__remove"
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

        <div class="ice__types">
          <div class="ice__types-label">Insurance types &amp; permissions</div>
          <div v-for="entry in consent.types" :key="entry.id" class="ice__type-row">
            <select class="ice__control ice__type-select" v-model="entry.type">
              <option v-for="t in INSURANCE_TYPES" :key="t" :value="t">{{ t }}</option>
            </select>
            <div class="ice__perm-checks">
              <label
                v-for="perm in ALL_PERMISSIONS"
                :key="perm"
                class="ice__perm-check"
                :title="perm"
              >
                <input
                  type="checkbox"
                  :checked="entry.permissions.includes(perm)"
                  @change="togglePermission(entry, perm)"
                />
                <span>{{ PERMISSION_SHORT_LABELS[perm] }}</span>
              </label>
            </div>
            <button
              type="button"
              class="ice__type-remove"
              :disabled="consent.types.length <= 1"
              title="Remove insurance type"
              aria-label="Remove insurance type"
              @click="removeType(consent, entry.id)"
            >×</button>
          </div>
          <button
            type="button"
            class="ice__type-add"
            :disabled="consent.types.length >= MAX_TYPES_PER_CONSENT"
            @click="addType(consent)"
          >+ Add insurance type</button>
        </div>
      </div>
    </div>

    <footer class="ice__footer">
      <button
        type="button"
        class="ice__add"
        :disabled="consents.length >= MAX_CONSENTS"
        @click="addConsent"
      >+ Add consent</button>
      <span class="ice__count">{{ consents.length }} / {{ MAX_CONSENTS }}</span>
    </footer>
  </section>
</template>

<style scoped>
.ice {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  margin: 1.5rem 0;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.ice__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.ice__eyebrow {
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
.ice__eyebrow-dash { width: 18px; height: 1px; background: currentColor; }
.ice__subtitle {
  font-size: 0.82rem;
  color: var(--at-mute-2);
}

.ice__rows {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.ice__consent {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.65rem 0.85rem 0.85rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}

.ice__row {
  display: flex;
  align-items: flex-end;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.ice__field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.ice__field--status { min-width: 220px; }
.ice__field--lfi    { width: 90px; }
.ice__field--base   { width: 130px; }

.ice__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
}

.ice__control {
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
.ice__control:focus {
  border-color: var(--at-teal);
  box-shadow: inset 0 -2px 0 var(--at-teal);
}
.ice__control::placeholder { color: var(--at-mute); }

.ice__remove,
.ice__type-remove {
  background: none;
  border: none;
  padding: 0.4rem;
  align-self: center;
  color: var(--at-mute);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.15s ease;
}
.ice__remove { margin-left: auto; }
.ice__remove:hover:not(:disabled),
.ice__type-remove:hover:not(:disabled) { color: #B33A3A; }
.ice__remove:disabled,
.ice__type-remove:disabled { opacity: 0.3; cursor: not-allowed; }
.ice__remove svg { display: block; }
.ice__type-remove {
  font-size: 1.1rem;
  line-height: 1;
  width: 1.6rem;
  height: 1.6rem;
}

.ice__types {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.55rem 0 0;
  border-top: 1px dashed var(--at-grid-line);
  margin-top: 0.35rem;
}
.ice__types-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
}

.ice__type-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.ice__type-select { min-width: 130px; width: 130px; flex-shrink: 0; }

.ice__perm-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.85rem;
  flex: 1 1 auto;
}
.ice__perm-check {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--at-sans);
  font-size: 0.78rem;
  color: var(--at-navy-deep);
  cursor: pointer;
  white-space: nowrap;
}
.ice__perm-check input {
  margin: 0;
  cursor: pointer;
}

.ice__type-add {
  align-self: flex-start;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.35rem 0.7rem;
  border: 1px dashed var(--at-grid-line-2);
  background: transparent;
  color: var(--at-mute-2);
  cursor: pointer;
}
.ice__type-add:hover:not(:disabled) {
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.ice__type-add:disabled { opacity: 0.4; cursor: not-allowed; }

.ice__footer {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.1rem;
  border-top: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.ice__add {
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
.ice__add:hover:not(:disabled) {
  background: var(--at-bg-cream);
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.ice__add:disabled { opacity: 0.4; cursor: not-allowed; }

.ice__count {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-mute);
}
</style>

<style>
.is-tech .ice__header {
  background: var(--at-navy-deep);
  border-bottom: 0;
}
.is-tech .ice__eyebrow {
  color: var(--at-bg-cream);
}
.is-tech .ice__subtitle {
  color: color-mix(in srgb, var(--at-bg-cream) 75%, transparent);
}
</style>
