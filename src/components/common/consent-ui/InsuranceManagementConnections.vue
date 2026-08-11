<template>
  <InsuranceManagementDetail
    v-if="selectedConnection"
    :connection="selectedConnection"
    :all-connections="resolvedConnections"
    :perspective="perspective"
    :header-color="headerColor"
    @back="selectConnection(null)"
    @navigate="selectConnection($event)"
  />
  <div
    v-else
    class="insurance-management-frame"
    :class="{ 'insurance-management-lfi': isLfi }"
    :style="headerColor ? { '--cmi-header-color': headerColor } : undefined"
  >
    <div class="insurance-management-screen-name">
      <div class="insurance-management-screen-bar"></div>
      <svg class="insurance-management-arrow-left" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14.5 5.5L8.5 12L14.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <div class="insurance-management-screen-title">{{ barTitle }}</div>
    </div>

    <div class="insurance-management-card-shell">
      <div class="insurance-management-card">
        <div class="insurance-management-header">
          <div class="insurance-management-main-title">AlTareq Connections</div>
          <div class="insurance-management-subtitle">{{ connectionSubtitle }}</div>
        </div>

        <div class="insurance-management-manage-hint">
          <span>Tap Manage to view, update or disconnect</span>
          <div class="insurance-management-info-trigger">
            <button type="button" class="insurance-management-info-button" aria-describedby="insurance-management-info-tooltip">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="8" cy="8" r="6.75" stroke="#0C1441" stroke-width="1.25" />
                <path d="M8 4.5V4.7" stroke="#0C1441" stroke-width="1.25" stroke-linecap="round" />
                <path d="M8 7V11" stroke="#0C1441" stroke-width="1.25" stroke-linecap="round" />
              </svg>
            </button>
            <div id="insurance-management-info-tooltip" class="insurance-management-info-message" role="tooltip">
              <p>{{ tooltipText.p1 }}</p>
              <p>{{ tooltipText.p2 }}</p>
            </div>
          </div>
        </div>

        <div class="insurance-management-controls">
          <div class="insurance-management-filter">
            <div class="insurance-management-filter-row">
              <button
                type="button"
                class="insurance-management-filter-toggle"
                :aria-expanded="isFilterPanelOpen"
                @click="isFilterPanelOpen = !isFilterPanelOpen"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="#36BFD4" fill-opacity="0.12" stroke="#36BFD4" />
                  <path d="M7.5 8H16.5L12.5 12V16L11 15.25V12L7.5 8Z" fill="#36BFD4" />
                </svg>
                <span>Filter</span>
              </button>
            </div>

            <div v-if="isFilterPanelOpen" class="insurance-management-filter-fields">
              <label class="insurance-management-filter-field">
                <span class="insurance-management-filter-field-label">{{ filterEntityLabel }}</span>
                <select v-model="filters.lfiName" class="insurance-management-filter-select" @change="onFilterSelected">
                  <option v-for="option in lfiOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </label>

              <label class="insurance-management-filter-field">
                <span class="insurance-management-filter-field-label">Insurance Type</span>
                <select v-model="filters.insuranceType" class="insurance-management-filter-select" @change="onFilterSelected">
                  <option v-for="option in insuranceTypeOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </label>

              <label class="insurance-management-filter-field">
                <span class="insurance-management-filter-field-label">Consent State</span>
                <select v-model="filters.consentState" class="insurance-management-filter-select" @change="onFilterSelected">
                  <option v-for="option in consentStateOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </label>
            </div>

            <div v-if="appliedFilters.length > 0" class="insurance-management-applied-filters">
              <div class="insurance-management-chips">
                <div class="insurance-management-chips-row">
                  <button
                    v-for="filter in appliedFilters"
                    :key="filter.key"
                    type="button"
                    class="insurance-management-chip"
                    @click="removeFilter(filter.key)"
                  >
                    <span class="insurance-management-chip-text">{{ filter.value }}</span>
                    <svg class="insurance-management-chip-remove" width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M1 1L5 5" />
                      <path d="M5 1L1 5" />
                    </svg>
                  </button>
                  <button type="button" class="insurance-management-chip insurance-management-chip-clear" @click="clearFilters">
                    <span class="insurance-management-chip-text">Clear</span>
                  </button>
                </div>
                <div class="insurance-management-results">Results: {{ displayedConnections.length }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="insurance-management-divider"></div>

        <div class="insurance-management-tabs">
          <button type="button" class="insurance-management-tab"
            :class="{ 'insurance-management-tab-active': activeTab === 'current' }"
            @click="activeTab = 'current'">
            Current
          </button>
          <button type="button" class="insurance-management-tab"
            :class="{ 'insurance-management-tab-active': activeTab === 'history' }"
            @click="activeTab = 'history'">
            History
          </button>
        </div>

        <div class="insurance-management-connection-list">
          <div
            v-for="(connection, index) in displayedConnections"
            :key="`${connection.lfiDigit}-${connection.id ?? index}-${index}`"
            class="insurance-management-connection"
            role="button"
            tabindex="0"
            @click="handleManage(connection)"
            @keydown.enter.prevent="handleManage(connection)"
            @keydown.space.prevent="handleManage(connection)"
          >
            <div class="insurance-management-connection-header">
              <div class="insurance-management-connection-name">[{{ entityLabel }} {{ connection.lfiDigit }}]</div>
              <div class="insurance-management-status" :class="statusClass(connection.status)">{{ displayStatus(connection.status) }}</div>
            </div>
            <div class="insurance-management-connection-count">
              {{ policyCountLabel(connection) }}
            </div>
            <div class="insurance-management-connection-meta insurance-management-connection-meta-row">
              <span class="insurance-management-connection-meta-label">{{ connectionTypes(connection).length > 1 ? 'Insurance Types:' : 'Insurance Type:' }}</span>
              <span class="insurance-management-connection-meta-value">{{ insuranceTypeListLabel(connection) }}</span>
            </div>
            <div class="insurance-management-connection-meta insurance-management-connection-meta-row">
              <span class="insurance-management-connection-meta-label">Last data received:</span>
              <span class="insurance-management-connection-meta-value">{{ lastDataReceived }}</span>
            </div>
            <div class="insurance-management-connection-meta insurance-management-connection-meta-row">
              <span class="insurance-management-connection-meta-label">Connection expires:</span>
              <span class="insurance-management-connection-meta-value">{{ expiryDate }}</span>
            </div>

            <svg class="insurance-management-chevron" xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div v-if="displayedConnections.length === 0" class="insurance-management-empty-state">
            <template v-if="isLfi">
              No connections yet
              <br/> <br/>
              You do not have any AlTareq connections in this tab.
            </template>
            <template v-else>
              No connections yet
              <br/> <br/>
              You don’t have any consents in this tab.
              <br/> <br/>
              Connect a policy to get started.
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLfi" class="insurance-management-footer">
      <button type="button" class="insurance-management-cta">Connect another policy</button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useSharedState } from '../composables/useSharedState.ts'
import { insuranceTypeLabels } from '../composables/insurancePermissionDescriptions.ts'
import { generateConsentPolicies } from '../composables/generateConsentPolicies.ts'
import InsuranceManagementDetail from './InsuranceManagementDetail.vue'

const props = defineProps({
  perspective: { type: String, default: 'tpp' },
  headerColor: { type: String, default: '' },
})

const { sharedState } = useSharedState()

const isLfi = computed(() => props.perspective === 'lfi')
const barTitle = computed(() => isLfi.value ? 'LFI' : 'TPP')
const entityLabel = computed(() => isLfi.value ? 'TPP' : 'LFI')
const filterEntityLabel = computed(() => isLfi.value ? 'TPP Name' : 'LFI Name')
// Hold the *identity* of the open consent, not the object itself — the editor
// rebuilds resolvedConnections on every change, so a captured object would go
// stale and the detail view would keep rendering the pre-edit consent.
const selectedKey = ref(null)
const activeTab = ref('current')
const isFilterPanelOpen = ref(false)
const filters = reactive({
  lfiName: 'All',
  insuranceType: 'All',
  consentState: 'All',
})

const HISTORY_STATUSES = new Set(['Rejected', 'Expired', 'Revoked'])

const VALID_CONSENT_STATUSES = [
  'AwaitingAuthorization', 'Authorized', 'Rejected',
  'Suspended', 'Paused', 'Expired', 'Revoked',
]

const VALID_INSURANCE_TYPES = ['Motor', 'Health', 'Home', 'Life', 'Travel', 'Renters', 'Employment']

const lastDataReceived = '30/09/2024'
const expiryDate = '30/03/2025'

const defaultConnections = [
  { id: 1, lfiDigit: 3, status: 'Authorized', baseConsentId: 2,
    types: [{ type: 'Motor', permissions: ['ReadInsurancePolicies'] }] },
  { id: 2, lfiDigit: 7, status: 'Authorized', baseConsentId: '',
    types: [
      { type: 'Health', permissions: ['ReadInsurancePolicies', 'ReadInsurancePremium'] },
      { type: 'Life',   permissions: ['ReadInsurancePolicies'] },
    ] },
]

function normalizeTypeEntry(entry) {
  const type = VALID_INSURANCE_TYPES.includes(entry?.type) ? entry.type : 'Motor'
  const permissions = Array.isArray(entry?.permissions) ? entry.permissions : []
  return { type, permissions }
}

function normalizeConnection(connection, fallback) {
  const numericLfi = Number(connection?.lfiDigit)
  const lfiDigit = Number.isInteger(numericLfi) && numericLfi >= 1 && numericLfi <= 9
    ? numericLfi
    : fallback.lfiDigit

  const status = VALID_CONSENT_STATUSES.includes(connection?.status)
    ? connection.status
    : fallback.status

  const rawTypes = Array.isArray(connection?.types) && connection.types.length > 0
    ? connection.types
    : fallback.types
  const types = rawTypes.map(normalizeTypeEntry)

  // Identity fields pass through verbatim — never inherit from the fallback,
  // since that would silently graft another consent's baseConsentId onto a
  // consent the user explicitly cleared, breaking the List of Updates link.
  const id = connection?.id
  const baseConsentId = connection?.baseConsentId || undefined

  return { id, lfiDigit, status, types, baseConsentId }
}

const resolvedConnections = computed(() => {
  const configured = sharedState.value?.insuranceConsentConnections
  if (!Array.isArray(configured) || configured.length === 0) return defaultConnections
  return configured.map((connection, index) =>
    normalizeConnection(connection, defaultConnections[index % defaultConnections.length]),
  )
})

// Resolve the open consent from the live list each render, so edits made while the
// detail view is open are reflected immediately.
const selectedConnection = computed(() => {
  const key = selectedKey.value
  if (!key) return null
  if (key.id != null) return resolvedConnections.value.find(c => c.id === key.id) ?? null
  return resolvedConnections.value[key.index] ?? null
})

function selectConnection(connection) {
  if (!connection) {
    selectedKey.value = null
    return
  }
  if (connection.id != null) {
    selectedKey.value = { id: connection.id }
    return
  }
  const index = resolvedConnections.value.indexOf(connection)
  selectedKey.value = index >= 0 ? { index } : null
}

const currentConnections = computed(() =>
  resolvedConnections.value.filter(c => !HISTORY_STATUSES.has(c.status)),
)

const historyConnections = computed(() =>
  resolvedConnections.value.filter(c => HISTORY_STATUSES.has(c.status)),
)

function connectionTypes(connection) {
  return Array.isArray(connection?.types) ? connection.types.map(t => t.type) : []
}

const displayedConnections = computed(() =>
  (activeTab.value === 'history' ? historyConnections.value : currentConnections.value).filter(connection => {
    if (filters.lfiName !== 'All' && `${entityLabel.value} ${connection.lfiDigit}` !== filters.lfiName) return false
    if (filters.insuranceType !== 'All' && !connectionTypes(connection).includes(filters.insuranceType)) return false
    if (filters.consentState !== 'All' && connection.status !== filters.consentState) return false
    return true
  }),
)

const appliedFilters = computed(() => {
  return [
    { key: 'lfiName', value: filters.lfiName },
    { key: 'insuranceType', value: filters.insuranceType },
    { key: 'consentState', value: filters.consentState },
  ].filter(e => e.value !== 'All').map(e => ({ key: e.key, value: String(e.value) }))
})

const lfiOptions = computed(() => {
  const prefix = entityLabel.value
  const values = Array.from(new Set(resolvedConnections.value.map(c => `${prefix} ${c.lfiDigit}`)))
    .sort((a, b) => Number(a.replace(`${prefix} `, '')) - Number(b.replace(`${prefix} `, '')))
  return ['All', ...values]
})

const insuranceTypeOptions = computed(() => {
  const values = new Set()
  for (const c of resolvedConnections.value) {
    for (const t of connectionTypes(c)) values.add(t)
  }
  return ['All', ...Array.from(values)]
})

const consentStateOptions = computed(() => {
  const values = Array.from(new Set(resolvedConnections.value.map(c => c.status)))
  return ['All', ...values]
})

function clearFilters() {
  filters.lfiName = 'All'
  filters.insuranceType = 'All'
  filters.consentState = 'All'
}

function onFilterSelected() {
  isFilterPanelOpen.value = false
}

function removeFilter(filterKey) {
  filters[filterKey] = 'All'
}

function policyCountLabel(connection) {
  const count = generateConsentPolicies(connection).length
  return count === 1 ? '1 Policy Connected' : `${count} Policies Connected`
}

function insuranceTypeListLabel(connection) {
  return connectionTypes(connection)
    .map(t => insuranceTypeLabels[t] || t)
    .join(', ')
}

function handleManage(connection) {
  selectConnection(connection)
}

function statusClass(status) {
  if (status === 'Authorized') return 'insurance-management-status-authorized'
  if (status === 'AwaitingAuthorization') return 'insurance-management-status-awaiting'
  if (status === 'Suspended') return 'insurance-management-status-suspended'
  if (status === 'Paused') return 'insurance-management-status-paused'
  if (status === 'Expired') return 'insurance-management-status-expired'
  if (status === 'Rejected' || status === 'Revoked') return 'insurance-management-status-rejected'
  return 'insurance-management-status-awaiting'
}

const STATUS_LABELS = {
  'Authorized': 'Active',
  'Revoked': 'Cancelled',
  'AwaitingAuthorization': 'Pending',
}

function displayStatus(status) {
  return STATUS_LABELS[status] ?? status
}

const connectionSubtitle = computed(() => {
  if (isLfi.value) return 'These are the third party providers connected to your insurance policies'
  return 'These are the insurance providers we are connected to for data sharing'
})

const tooltipText = computed(() => {
  if (isLfi.value) return {
    p1: 'This page gives you an overview of the insurance data-sharing permissions you have given to third party providers.',
    p2: 'They will continue to access your policy data on your behalf until the permission ends or you cancel.',
  }
  return {
    p1: 'This page gives you an overview of the insurance data-sharing permissions you have given to us.',
    p2: 'We will continue to access your policy data on your behalf until the permission ends or you cancel.',
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.insurance-management-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 30px;
  gap: 20px;
  width: 372px;
  min-height: 720px;
  background: #f4f8fb;
  zoom: 0.85;
}

.insurance-management-screen-name { width: 372px; height: 56px; position: relative; }
.insurance-management-screen-bar { position: absolute; inset: 0; background: var(--cmi-header-color, #35bfd4); }
.insurance-management-arrow-left { position: absolute; left: 28px; top: 16px; z-index: 1; }
.insurance-management-screen-title {
  position: absolute; left: 50%; top: 12px; transform: translateX(-50%);
  width: 48px; height: 32px;
  font-family: 'Poppins'; font-weight: 700; font-size: 26px; line-height: 124%;
  text-align: center; color: #f5f5fd; z-index: 1;
}

.insurance-management-card-shell { width: 316px; }
.insurance-management-card {
  display: flex; flex-direction: column; gap: 20px;
  width: 316px; background: #ffffff; border-radius: 12px;
  padding: 16px 12px; box-sizing: border-box;
}

.insurance-management-header { display: flex; flex-direction: column; gap: 12px; }
.insurance-management-main-title {
  font-family: 'Poppins'; font-weight: 500; font-size: 19px; line-height: 120%;
  letter-spacing: -0.01em; color: #0b1340;
}
.insurance-management-subtitle {
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 160%;
  color: #0b1340;
}

.insurance-management-manage-hint {
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
  font-family: 'Poppins'; font-weight: 400; font-size: 12px; line-height: 160%;
  letter-spacing: -0.02em; color: #36bfd4;
}

.insurance-management-info-button {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; padding: 0; border: 0; background: transparent; cursor: help;
}
.insurance-management-info-trigger { position: relative; display: inline-flex; align-items: center; }
.insurance-management-info-button:focus-visible {
  outline: 2px solid #36bfd4; outline-offset: 2px; border-radius: 50%;
}
.insurance-management-info-message {
  position: absolute; right: 0; top: calc(100% + 8px); z-index: 30;
  width: 270px; padding: 10px 12px;
  border: 1px solid rgba(54, 191, 212, 0.5); border-radius: 10px;
  background: rgba(54, 191, 212, 0.24); backdrop-filter: blur(2px);
  box-shadow: 0 6px 18px rgba(12, 20, 65, 0.12);
  opacity: 0; visibility: hidden; transform: translateY(-4px);
  transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s ease;
  pointer-events: none;
}
.insurance-management-info-trigger:hover .insurance-management-info-message,
.insurance-management-info-trigger:focus-within .insurance-management-info-message {
  opacity: 1; visibility: visible; transform: translateY(0);
}
.insurance-management-info-message p {
  margin: 0; font-family: 'Poppins'; font-weight: 400; font-size: 11px;
  line-height: 140%; letter-spacing: -0.01em; color: #0c1441;
}
.insurance-management-info-message p + p { margin-top: 8px; }

.insurance-management-controls { display: flex; flex-direction: column; gap: 12px; }
.insurance-management-filter { display: flex; flex-direction: column; gap: 8px; }
.insurance-management-filter-row { display: flex; justify-content: flex-start; align-items: center; }
.insurance-management-filter-toggle {
  display: inline-flex; align-items: center; gap: 4px; padding: 0; border: 0;
  background: transparent; font-family: 'Poppins'; font-weight: 400; font-size: 12px;
  line-height: 120%; letter-spacing: -0.01em; color: #0c1441; cursor: pointer;
}
.insurance-management-filter-toggle:focus-visible { outline: 2px solid #36bfd4; outline-offset: 2px; }
.insurance-management-filter-fields {
  display: flex; flex-direction: column; gap: 10px;
  padding: 10px; border: 1px solid #e7e8ef; border-radius: 10px; background: #ffffff;
}

.insurance-management-applied-filters {
  display: flex; flex-direction: column; align-items: flex-start; padding: 0;
  width: 292px; min-height: 64px; align-self: stretch;
}
.insurance-management-chips {
  display: flex; flex-direction: column; align-items: flex-end;
  padding: 10px; gap: 10px; width: 292px; min-height: 64px; box-sizing: border-box;
}
.insurance-management-chips-row {
  display: flex; flex-direction: row; flex-wrap: wrap; align-items: center;
  align-content: flex-start; gap: 8px; width: 272px; min-height: 22px;
}
.insurance-management-chip {
  display: inline-flex; flex-direction: row; align-items: center; padding: 4px 7px;
  gap: 10px; min-height: 22px; border: 0; background: #e7e8ef; border-radius: 15px;
  cursor: pointer;
}
.insurance-management-chip-text {
  font-family: 'Poppins'; font-weight: 400; font-size: 12px; line-height: 120%;
  letter-spacing: -0.01em; color: #0c1441; white-space: nowrap;
}
.insurance-management-chip-remove {
  width: 6px; height: 6px; stroke: #0c1441; stroke-width: 1.2;
  stroke-linecap: round; fill: none; flex: none;
}
.insurance-management-chip-clear { min-width: 63px; justify-content: center; background: #36bfd4; }
.insurance-management-chip-clear .insurance-management-chip-text { color: #ffffff; }
.insurance-management-results {
  width: 100%; font-family: 'Poppins'; font-weight: 400; font-size: 10px;
  line-height: 120%; letter-spacing: -0.01em; color: #616786; text-align: left;
}

.insurance-management-filter-field { display: flex; flex-direction: column; gap: 6px; }
.insurance-management-filter-field-label {
  font-family: 'Poppins'; font-weight: 400; font-size: 11px; line-height: 120%;
  letter-spacing: -0.01em; color: #0b1340;
}
.insurance-management-filter-select {
  width: 100%; min-height: 34px; border: 1px solid #d6d9e7; border-radius: 8px;
  background: #ffffff; color: #0c1441; font-family: 'Poppins'; font-weight: 400;
  font-size: 12px; line-height: 120%; padding: 6px 8px;
}

.insurance-management-divider { width: 100%; border-top: 1px solid #e7e8ef; }

.insurance-management-tabs {
  display: flex; width: 100%; border-bottom: 2px solid #35bfd4;
}
.insurance-management-tab {
  border: 0; background: transparent; cursor: pointer; display: flex;
  justify-content: center; align-items: center; flex: 1; height: 42px;
  font-family: 'Poppins'; font-weight: 500; font-size: 14px; line-height: 160%;
  letter-spacing: -0.01em; color: #0b1340;
}
.insurance-management-tab-active {
  border-bottom: 4px solid #35bfd4; color: #35bfd4; font-weight: 600;
}

.insurance-management-connection-list { display: flex; flex-direction: column; }

.insurance-management-empty-state {
  padding: 72px 0; text-align: center; font-family: 'Poppins';
  font-weight: 400; font-size: 12px; line-height: 140%; color: #616786;
}

.insurance-management-connection {
  position: relative; padding: 0 32px 20px 0;
  border-bottom: 1px solid rgba(11, 19, 64, 0.2); border-radius: 6px;
  cursor: pointer; transition: background 0.15s ease, box-shadow 0.15s ease;
  outline: none;
}
.insurance-management-connection + .insurance-management-connection { padding-top: 10px; }
.insurance-management-connection:hover { background: rgba(54, 191, 212, 0.05); }
.insurance-management-connection:focus-visible { box-shadow: 0 0 0 2px #36bfd4; }

.insurance-management-connection-header {
  display: flex; justify-content: space-between; align-items: center;
}

.insurance-management-status {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 2px 8px; border-radius: 20px; font-family: 'Poppins';
  font-weight: 500; font-size: 10px; line-height: 160%; color: #ffffff;
  flex-shrink: 0; margin-right: -20px;
}
.insurance-management-status-authorized { background: #21a35d; }
.insurance-management-status-awaiting { background: #2563eb; }
.insurance-management-status-suspended { background: #d97706; }
.insurance-management-status-paused { background: #b45309; }
.insurance-management-status-expired { background: #6b7280; }
.insurance-management-status-rejected { background: #dc2626; }

.insurance-management-connection-name {
  font-family: 'Poppins'; font-weight: 600; font-size: 14px; line-height: 120%;
  letter-spacing: -0.01em; color: #0b1340;
}

.insurance-management-connection-count {
  margin-top: 8px; margin-bottom: 6px; font-family: 'Poppins'; font-weight: 300;
  font-size: 13px; line-height: 120%; letter-spacing: -0.01em; color: #0b1340; font-style: italic;
}

.insurance-management-connection-meta {
  margin-top: 8px; font-family: 'Poppins'; font-weight: 300; font-size: 11px;
  line-height: 120%; letter-spacing: -0.01em; color: #616786;
}
.insurance-management-connection-meta-row {
  display: flex; flex-direction: row; justify-content: space-between;
  width: 100%; align-items: center; column-gap: 8px;
}
.insurance-management-connection-meta-label { color: #616786; }
.insurance-management-connection-meta-value { color: #0b1340; }

.insurance-management-chevron {
  position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
  color: rgba(11, 19, 64, 0.2);
  transition: color 0.15s ease, transform 0.15s ease; flex-shrink: 0;
}
.insurance-management-connection:hover .insurance-management-chevron {
  color: #36bfd4; transform: translateY(-50%) translateX(2px);
}

.insurance-management-footer { width: 372px; padding: 20px 28px 0; box-sizing: border-box; }
.insurance-management-cta {
  width: 316px; height: 55px; border: 0; border-radius: 66px;
  background: #36bfd4; color: #ffffff; font-family: 'Poppins';
  font-weight: 500; font-size: 16px; line-height: 100%;
  letter-spacing: -0.03em; cursor: pointer;
}

.insurance-management-lfi .insurance-management-screen-bar {
  background: var(--cmi-header-color, #FD6436);
}
</style>
