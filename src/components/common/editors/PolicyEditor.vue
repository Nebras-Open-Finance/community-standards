<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useSharedState } from '../composables/useSharedState'
import {
  ALL_STATUSES,
  STATUS_LABELS,
  type InsurancePolicyStatus,
} from '../composables/insurancePolicyStatus'

type InsuranceType = 'Motor' | 'Health' | 'Home' | 'Life' | 'Travel' | 'Renters' | 'Employment'

interface Policy {
  id: number
  insuranceType: InsuranceType
  status: InsurancePolicyStatus
  policyNumber: string
  premium: number
  startDate: string
  endDate: string
}

const props = withDefaults(defineProps<{
  allowedTypes?: InsuranceType[]
  allowedStatuses?: InsurancePolicyStatus[]
}>(), {
  allowedTypes: () => ['Motor', 'Health', 'Home', 'Life', 'Travel', 'Renters', 'Employment'],
  allowedStatuses: () => ALL_STATUSES,
})

const { updateField } = useSharedState()

const INSURANCE_TYPES = computed(() => props.allowedTypes)
const STATUSES = computed(() => props.allowedStatuses)
const TYPE_LABELS: Record<InsuranceType, string> = {
  Motor: 'Motor',
  Health: 'Health',
  Home: 'Home',
  Life: 'Life',
  Travel: 'Travel',
  Renters: 'Renters',
  Employment: 'Employment',
}
const MAX_POLICIES = 12

const TYPE_PREFIX: Record<InsuranceType, string> = {
  Motor: 'MOT',
  Health: 'HLT',
  Home: 'HOM',
  Life: 'LIF',
  Travel: 'TRV',
  Renters: 'RNT',
  Employment: 'EMP',
}

function genPolicyNumber(type: InsuranceType, n: number) {
  return `${TYPE_PREFIX[type]}-2026-${String(n + 1).padStart(4, '0')}`
}

function isoDateOffset(daysAhead: number) {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() + daysAhead)
  return d.toISOString().slice(0, 10)
}

function defaultDatesFor(status: InsurancePolicyStatus) {
  // Active policies start in the past and end in the future; inactive ones
  // sit entirely in the past so the demo's start/end dates match the status.
  if (status === 'Expired' || status === 'Lapsed' || status === 'Cancelled' ||
      status === 'Surrendered' || status === 'Converted' ||
      status === 'DeathClaim' || status === 'RiderClaim') {
    return { startDate: isoDateOffset(-730), endDate: isoDateOffset(-30) }
  }
  return { startDate: isoDateOffset(-180), endDate: isoDateOffset(185) }
}

const INITIAL_POLICIES: Policy[] = [
  { id: 1,  insuranceType: 'Motor',      status: 'New',         policyNumber: genPolicyNumber('Motor', 0),      premium: 2400, ...defaultDatesFor('New') },
  { id: 2,  insuranceType: 'Motor',      status: 'Renewed',     policyNumber: genPolicyNumber('Motor', 1),      premium: 2100, ...defaultDatesFor('Renewed') },
  { id: 3,  insuranceType: 'Health',     status: 'Renewed',     policyNumber: genPolicyNumber('Health', 0),     premium: 6800, ...defaultDatesFor('Renewed') },
  { id: 4,  insuranceType: 'Health',     status: 'New',         policyNumber: genPolicyNumber('Health', 1),     premium: 4500, ...defaultDatesFor('New') },
  { id: 5,  insuranceType: 'Life',       status: 'InForce',     policyNumber: genPolicyNumber('Life', 0),       premium: 4200, ...defaultDatesFor('InForce') },
  { id: 6,  insuranceType: 'Life',       status: 'Surrendered', policyNumber: genPolicyNumber('Life', 1),       premium: 3200, ...defaultDatesFor('Surrendered') },
  { id: 7,  insuranceType: 'Home',       status: 'PaidUp',      policyNumber: genPolicyNumber('Home', 0),       premium: 1800, ...defaultDatesFor('PaidUp') },
  { id: 8,  insuranceType: 'Travel',     status: 'Expired',     policyNumber: genPolicyNumber('Travel', 0),     premium: 320,  ...defaultDatesFor('Expired') },
  { id: 9,  insuranceType: 'Renters',    status: 'Lapsed',      policyNumber: genPolicyNumber('Renters', 0),    premium: 900,  ...defaultDatesFor('Lapsed') },
  { id: 10, insuranceType: 'Employment', status: 'Cancelled',   policyNumber: genPolicyNumber('Employment', 0), premium: 1500, ...defaultDatesFor('Cancelled') },
]

let nextId = INITIAL_POLICIES.reduce((m, p) => Math.max(m, p.id), 0) + 1
const policies = ref<Policy[]>([...INITIAL_POLICIES])

function onTypeChange(policy: Policy, newType: InsuranceType) {
  const idx = policies.value.findIndex(p => p.id === policy.id)
  policy.insuranceType = newType
  policy.policyNumber = genPolicyNumber(newType, idx >= 0 ? idx : 0)
}

function onStatusChange(policy: Policy, newStatus: InsurancePolicyStatus) {
  const wasInactive = !['New', 'Renewed', 'InForce', 'PaidUp'].includes(policy.status)
  const willBeInactive = !['New', 'Renewed', 'InForce', 'PaidUp'].includes(newStatus)
  policy.status = newStatus
  // Only auto-adjust dates when the active/inactive bucket actually changes —
  // otherwise the user's customised dates would get clobbered on a no-op flip.
  if (wasInactive !== willBeInactive) {
    const d = defaultDatesFor(newStatus)
    policy.startDate = d.startDate
    policy.endDate = d.endDate
  }
}

function addPolicy() {
  if (policies.value.length >= MAX_POLICIES) return
  const idx = policies.value.length
  const defaultType = (INSURANCE_TYPES.value[0] ?? 'Motor') as InsuranceType
  const defaultStatus = (STATUSES.value[0] ?? 'New') as InsurancePolicyStatus
  policies.value.push({
    id: nextId++,
    insuranceType: defaultType,
    status: defaultStatus,
    policyNumber: genPolicyNumber(defaultType, idx),
    premium: 1000,
    ...defaultDatesFor(defaultStatus),
  })
}

function removePolicy(id: number) {
  if (policies.value.length <= 1) return
  policies.value = policies.value.filter(p => p.id !== id)
}

watch(policies, (val) => updateField('policies', JSON.stringify(val)), { deep: true, immediate: true })
</script>

<template>
  <section class="pe">
    <header class="pe__header">
      <span class="pe__eyebrow">
        <span class="pe__eyebrow-dash" />
        Simulated user policies
      </span>
      <span class="pe__subtitle">Insurance policies the authenticated user holds at their LFI</span>
    </header>

    <div class="pe__rows">
      <div v-for="policy in policies" :key="policy.id" class="pe__row">

        <div class="pe__field pe__field--type">
          <label class="pe__label">Insurance type</label>
          <select
            class="pe__control"
            :value="policy.insuranceType"
            @change="onTypeChange(policy, ($event.target as HTMLSelectElement).value as InsuranceType)"
          >
            <option v-for="t in INSURANCE_TYPES" :key="t" :value="t">{{ TYPE_LABELS[t] }}</option>
          </select>
        </div>

        <div class="pe__field pe__field--status">
          <label class="pe__label">Status</label>
          <select
            class="pe__control"
            :value="policy.status"
            @change="onStatusChange(policy, ($event.target as HTMLSelectElement).value as InsurancePolicyStatus)"
          >
            <option v-for="s in STATUSES" :key="s" :value="s">{{ STATUS_LABELS[s] }}</option>
          </select>
        </div>

        <div class="pe__field pe__field--ref">
          <label class="pe__label">Policy number</label>
          <input class="pe__control pe__control--mono" v-model="policy.policyNumber" />
        </div>

        <div class="pe__field pe__field--amount">
          <label class="pe__label">Premium (AED)</label>
          <input class="pe__control" type="number" v-model.number="policy.premium" min="0" step="50" />
        </div>

        <div class="pe__field pe__field--date">
          <label class="pe__label">Start</label>
          <input class="pe__control" type="date" v-model="policy.startDate" />
        </div>

        <div class="pe__field pe__field--date">
          <label class="pe__label">End</label>
          <input class="pe__control" type="date" v-model="policy.endDate" />
        </div>

        <button
          type="button"
          class="pe__remove"
          :disabled="policies.length <= 1"
          title="Remove policy"
          aria-label="Remove policy"
          @click="removePolicy(policy.id)"
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

    <footer class="pe__footer">
      <button
        type="button"
        class="pe__add"
        :disabled="policies.length >= MAX_POLICIES"
        @click="addPolicy"
      >+ Add policy</button>
      <span class="pe__count">{{ policies.length }} / {{ MAX_POLICIES }}</span>
    </footer>
  </section>
</template>

<style scoped>
.pe {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  margin: 1.5rem 0;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.pe__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.pe__eyebrow {
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
.pe__eyebrow-dash { width: 18px; height: 1px; background: currentColor; }
.pe__subtitle {
  font-size: 0.82rem;
  color: var(--at-mute-2);
}

.pe__rows {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pe__row {
  display: flex;
  align-items: flex-end;
  gap: 0.65rem;
  flex-wrap: wrap;
  padding: 0.65rem 0.85rem 0.65rem 0.65rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}

.pe__field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.pe__field--type    { min-width: 130px; }
.pe__field--status  { min-width: 130px; }
.pe__field--ref     { flex: 1; min-width: 170px; }
.pe__field--amount  { width: 130px; }
.pe__field--date    { width: 150px; }

.pe__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
}

.pe__control {
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
.pe__control:focus {
  border-color: var(--at-teal);
  box-shadow: inset 0 -2px 0 var(--at-teal);
}
.pe__control--mono {
  font-family: var(--at-mono);
  font-size: 0.78rem;
}

.pe__remove {
  background: none;
  border: none;
  padding: 0.4rem;
  margin-left: auto;
  align-self: center;
  color: var(--at-mute);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.15s ease;
}
.pe__remove:hover:not(:disabled) { color: #B33A3A; }
.pe__remove:disabled { opacity: 0.3; cursor: not-allowed; }
.pe__remove svg { display: block; }

.pe__footer {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.1rem;
  border-top: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.pe__add {
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
.pe__add:hover:not(:disabled) {
  background: var(--at-bg-cream);
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.pe__add:disabled { opacity: 0.4; cursor: not-allowed; }

.pe__count {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-mute);
}
</style>

<!--
  /tech/** override to match the requirements-page table-header style —
  navy-deep background, cream text on the editor header bar.
-->
<style>
.is-tech .pe__header {
  background: var(--at-navy-deep);
  border-bottom: 0;
}
.is-tech .pe__eyebrow {
  color: var(--at-bg-cream);
}
.is-tech .pe__subtitle {
  color: color-mix(in srgb, var(--at-bg-cream) 75%, transparent);
}
</style>
