<script setup>
import { computed, ref, h } from 'vue'
import {
  insurancePermissionDescriptions,
  insurancePermissionGroups,
  insuranceTypeLabels,
} from '../composables/insurancePermissionDescriptions.ts'
import { insurancePolicyStatusGroup } from '../composables/insurancePolicyStatus.ts'
import { generateConsentPolicies } from '../composables/generateConsentPolicies.ts'
import DirhamAmount from './DirhamAmount.vue'
import { formatDate } from '../composables/formatDate.ts'

const props = defineProps({
  connection: { type: Object, required: true },
  allConnections: { type: Array, default: () => [] },
  perspective: { type: String, default: 'tpp' },
  headerColor: { type: String, default: '' },
})

const emit = defineEmits(['back', 'navigate'])

const isLfi = computed(() => props.perspective === 'lfi')
const barTitle = computed(() => isLfi.value ? 'LFI' : 'TPP')
const entityLabel = computed(() => isLfi.value ? 'TPP' : 'LFI')

const CONSENT_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
const truncatedConsentId = `${CONSENT_ID.slice(0, 8)}...${CONSENT_ID.slice(-4)}`
const copied = ref(false)

const EXPIRATION_ISO = '2026-03-31T00:00:00Z'
const LAST_DATA_RECEIVED = '30/09/2024'

function copyConsentId() {
  navigator.clipboard.writeText(CONSENT_ID).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  })
}

const CONSENT_STATUS_LABELS = {
  'Authorized': 'Active',
  'Revoked': 'Cancelled',
  'AwaitingAuthorization': 'Pending',
}

const displayStatus = computed(() => CONSENT_STATUS_LABELS[props.connection?.status] ?? props.connection?.status)

const statusClass = computed(() => {
  const s = props.connection?.status
  if (s === 'Authorized') return 'imd-status-authorized'
  if (s === 'AwaitingAuthorization') return 'imd-status-awaiting'
  if (s === 'Suspended') return 'imd-status-suspended'
  if (s === 'Paused') return 'imd-status-paused'
  if (s === 'Expired') return 'imd-status-expired'
  if (s === 'Rejected' || s === 'Revoked') return 'imd-status-rejected'
  return 'imd-status-awaiting'
})

const DISCONNECT_STATUSES = new Set(['AwaitingAuthorization', 'Authorized', 'Suspended', 'Paused'])
const showDisconnect = computed(() => DISCONNECT_STATUSES.has(props.connection?.status))
const showPause = computed(() => props.connection?.status === 'Authorized' && !isLfi.value)
const showReactivate = computed(() => props.connection?.status === 'Paused' && !isLfi.value)

// All (type, permissions[]) entries the consent carries.
const consentTypes = computed(() => {
  const raw = props.connection?.types
  return Array.isArray(raw) ? raw : []
})

// 1–2 policies per insurance type, deterministically generated from the
// consent id so the same consent always renders the same policies.
const generatedPolicies = computed(() => generateConsentPolicies(props.connection))

const policyGroups = computed(() =>
  consentTypes.value
    .map(entry => ({
      type: entry.type,
      label: insuranceTypeLabels[entry.type] || `${entry.type} Insurance`,
      policies: generatedPolicies.value.filter(p => p.insuranceType === entry.type),
    }))
    .filter(group => group.policies.length > 0),
)

const totalPolicies = computed(() =>
  policyGroups.value.reduce((sum, g) => sum + g.policies.length, 0),
)

function policyIsActive(policy) {
  return insurancePolicyStatusGroup(policy?.status) === 'active'
}

// Permission accordion — open state keyed per (insuranceType, permission) so
// each type's permissions toggle independently.
const openPermissions = ref({})
function permKey(type, permission) { return `${type}::${permission}` }
function isOpen(type, permission) { return !!openPermissions.value[permKey(type, permission)] }
function togglePermission(type, permission) {
  const k = permKey(type, permission)
  openPermissions.value = { ...openPermissions.value, [k]: !openPermissions.value[k] }
}

// Per-permission icons, mirroring AuthorizationInsuranceDataSharing.vue. Rendered
// at 22x22 to match the bank consent permission rows.
const iconBase = (paths) =>
  () =>
    h(
      'svg',
      { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
      paths.map((p) =>
        h('path', {
          ...p,
          stroke: '#0C1441',
          'stroke-width': p['stroke-width'] || 1.5,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          fill: 'none',
        }),
      ),
    )

const permissionIcons = {
  ReadInsurancePolicies: iconBase([
    { d: 'M3.5 4.5C3.5 3.4 4.4 2.5 5.5 2.5H15C16.1 2.5 17 3.4 17 4.5V20L14.5 18.5L12 20L9.5 18.5L7 20L4.5 18.5L2 20V4.5C2 3.4 2.9 2.5 4 2.5' },
    { d: 'M8 7H13' },
    { d: 'M9 11H12' },
    { d: 'M19.2 14.8L15.7 18.3C15.6 18.5 15.5 18.7 15.4 18.9L15.2 20.3C15.1 20.7 15.5 21.1 16 21L17.3 20.8C17.5 20.8 17.8 20.7 17.9 20.5L21.4 17C22 16.4 22.3 15.7 21.4 14.8C20.5 13.9 19.8 14.2 19.2 14.8Z' },
  ]),
  ReadCustomerBasic: iconBase([
    { d: 'M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z' },
    { d: 'M19 21C19 17.13 15.87 14 12 14C8.13 14 5 17.13 5 21' },
  ]),
  ReadCustomerDetail: iconBase([
    { d: 'M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14' },
    { d: 'M22 10H18C15 10 14 9 14 6V2L22 10Z' },
    { d: 'M8 13H13' },
    { d: 'M8 17H11' },
  ]),
  ReadInsuranceProduct: iconBase([
    { d: 'M18 9.5H16C14 9.5 14 8.5 14 7.5V5.5C14 3.5 15 2.5 17 2.5H21C22 2.5 22 3.5 22 5.5V7.5C22 8.5 22 9.5 21 9.5H18Z' },
    { d: 'M6 9.5H8C10 9.5 10 8.5 10 7.5V5.5C10 3.5 9 2.5 7 2.5H3C2 2.5 2 3.5 2 5.5V7.5C2 8.5 2 9.5 3 9.5H6Z' },
    { d: 'M6 21.5H8C10 21.5 10 20.5 10 19.5V17.5C10 15.5 9 14.5 7 14.5H3C2 14.5 2 15.5 2 17.5V19.5C2 20.5 2 21.5 3 21.5H6Z' },
    { d: 'M14 17.5H21' },
    { d: 'M14 20.5H21' },
  ]),
  ReadInsurancePremium: iconBase([
    { d: 'M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984' },
    { d: 'M12 6V18' },
    { d: 'M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12Z' },
  ]),
  ReadCustomerPaymentDetails: iconBase([
    { d: 'M7 11H14' },
    { d: 'M18 14.5H17C16 14.5 15 13.7 15 12.5C15 11.4 15.9 10.5 17 10.5H18C19.1 10.5 20 11.4 20 12.5C20 13.7 19.1 14.5 18 14.5Z' },
    { d: 'M20 10.5V13.5C20 17.5 18 19.5 14 19.5H8C4 19.5 2 17.5 2 13.5V7.5C2 4 4 2 7.5 2H14C18 2 20 4 20 8' },
  ]),
  ReadCustomerClaims: iconBase([
    { d: 'M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z' },
    { d: 'M15.9965 12H16.0054', 'stroke-width': 2 },
    { d: 'M11.9955 12H12.0045', 'stroke-width': 2 },
    { d: 'M7.99451 12H8.00349', 'stroke-width': 2 },
  ]),
}

function permissionIcon(permission) {
  return permissionIcons[permission] || permissionIcons.ReadInsurancePolicies
}

// Updates view
const showUpdates = ref(false)
const relatedConsents = computed(() => {
  const myBaseId = props.connection?.baseConsentId
  if (!myBaseId) return []
  const myId = props.connection?.id
  return props.allConnections.filter(c => {
    if (c.id != null && c.id == myId) return false
    return c.baseConsentId == myBaseId || c.id == myBaseId
  })
})

function navigateToConsent(connection) {
  showUpdates.value = false
  emit('navigate', connection)
}

function relatedTypesLabel(related) {
  const types = Array.isArray(related?.types) ? related.types : []
  return types.map(t => insuranceTypeLabels[t.type] || t.type).join(', ')
}

// Confirmation
const confirmAction = ref(null)
const confirmTitle = computed(() => {
  if (confirmAction.value === 'pause') return 'Pause data sharing'
  if (confirmAction.value === 'reactivate') return 'Resume data sharing'
  return 'Stop sharing'
})
const confirmButtonLabel = computed(() => {
  if (confirmAction.value === 'pause') return 'Confirm pause'
  if (confirmAction.value === 'reactivate') return 'Confirm reactivation'
  return 'Confirm stop sharing'
})
const confirmImpactText = computed(() => {
  if (confirmAction.value === 'pause') {
    return '[Placeholder] This text is set by the TPP and should explain to the customer what pausing this insurance data sharing consent will mean for their experience — for example, which features or services will be temporarily unavailable and how they can resume access.'
  }
  if (confirmAction.value === 'reactivate') {
    return '[Placeholder] This text is set by the TPP and should explain to the customer what reactivating this insurance data sharing consent will mean for their experience — for example, which features or services will become available again.'
  }
  return '[Placeholder] This text is set by the TPP and should explain to the customer what stopping this insurance data sharing consent will mean for their experience — for example, which features or services will stop working and what steps they would need to take to reconnect.'
})
</script>

<template>
  <div
    class="imd-frame"
    :class="{ 'imd-lfi': isLfi }"
    :style="props.headerColor ? { '--cmi-header-color': props.headerColor } : undefined"
  >
    <div class="imd-screen-name">
      <div class="imd-screen-bar"></div>
      <button
        type="button"
        class="imd-back-button"
        @click="showUpdates ? (showUpdates = false) : confirmAction !== null ? (confirmAction = null) : emit('back')"
        aria-label="Back"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14.5 5.5L8.5 12L14.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="imd-screen-title">{{ barTitle }}</div>
    </div>

    <!-- Main detail view -->
    <template v-if="confirmAction === null && !showUpdates">
      <div class="imd-card-shell">
        <!-- Meta card -->
        <div class="imd-meta-card">
          <div class="imd-meta-header">
            <div class="imd-meta-lfi">[{{ entityLabel }} {{ connection.lfiDigit }}]</div>
            <div class="imd-status" :class="statusClass">{{ displayStatus }}</div>
          </div>
          <div class="imd-meta-rows">
            <button
              type="button"
              class="imd-meta-row imd-consent-id"
              :class="{ 'is-copied': copied }"
              @click="copyConsentId"
              :aria-label="`Consent ID: ${CONSENT_ID}. Click to copy.`"
            >
              <span class="imd-meta-row-label">Consent ID</span>
              <span class="imd-consent-id-right">
                <span class="imd-consent-id-action">{{ copied ? 'Copied!' : 'Copy' }}</span>
                <span class="imd-consent-id-value">{{ truncatedConsentId }}</span>
              </span>
            </button>
            <div class="imd-meta-row">
              <span class="imd-meta-row-label">Last data received</span>
              <span class="imd-meta-row-value">{{ LAST_DATA_RECEIVED }}</span>
            </div>
          </div>
        </div>

        <!-- Policies card -->
        <div class="imd-section-card">
          <div class="imd-section-header">
            <div class="imd-section-title">Policies</div>
          </div>
          <div v-if="totalPolicies > 0" class="imd-policies-list">
            <template v-for="group in policyGroups" :key="group.type">
              <div
                v-for="policy in group.policies"
                :key="policy.id"
                class="imd-policy-card"
                :class="{ 'imd-policy-card--inactive': !policyIsActive(policy) }"
              >
                <span class="imd-policy-status-icon" :title="policyIsActive(policy) ? 'Active policy' : 'Inactive policy'">
                  <svg v-if="policyIsActive(policy)" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="8.5" cy="8.5" r="6.95" fill="#22A35D" fill-opacity="0.4" />
                    <path d="M5.5 8.7L7.7 10.9L11.7 6.5" stroke="#22A35D" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                  </svg>
                  <svg v-else width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="8.5" cy="8.5" r="6.95" fill="#FDAA35" fill-opacity="0.4" />
                    <path d="M8.5 5.2V8.5L10.3 9.7" stroke="#FDAA35" stroke-width="1.4" stroke-linecap="round" fill="none" />
                  </svg>
                </span>
                <div class="imd-policy-body">
                  <div class="imd-policy-title-text">{{ group.label }}</div>
                  <div class="imd-policy-subtext">{{ policy.policyNumber }}</div>
                  <div class="imd-policy-row">
                    <span class="imd-policy-row-label">Premium</span>
                    <DirhamAmount class="imd-policy-row-value" :amount="Number(policy.premium ?? 0).toLocaleString()" />
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div v-else class="imd-policies-empty">
            No linked policies for this consent.
          </div>
        </div>

        <!-- Data permissions card — grouped per insurance type -->
        <div class="imd-section-card">
          <div v-if="consentTypes.length === 1" class="imd-section-header">
            <div class="imd-section-title">Data we can access</div>
          </div>
          <div class="imd-type-sections">
            <div
              v-for="entry in consentTypes"
              :key="entry.type"
              class="imd-type-section"
            >
              <div v-if="consentTypes.length > 1" class="imd-section-title">
                {{ insuranceTypeLabels[entry.type] || `${entry.type} Insurance` }}
              </div>
              <div class="imd-permissions-list">
                <template v-for="row in insurancePermissionGroups" :key="`${entry.type}::${row.permission}`">
                  <div
                    v-if="entry.permissions.includes(row.permission)"
                    class="imd-permission-row"
                  >
                    <button
                      type="button"
                      class="imd-permission-toggle"
                      :aria-expanded="isOpen(entry.type, row.permission)"
                      @click="togglePermission(entry.type, row.permission)"
                    >
                      <span class="imd-permission-label-section">
                        <component :is="permissionIcon(row.permission)" class="imd-permission-icon" />
                        <span class="imd-permission-label">{{ row.label }}</span>
                      </span>
                      <svg
                        class="imd-permission-arrow"
                        :class="{ 'is-open': isOpen(entry.type, row.permission) }"
                        width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                      >
                        <path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" />
                      </svg>
                    </button>
                    <div v-if="isOpen(entry.type, row.permission)" class="imd-permission-description">
                      {{ insurancePermissionDescriptions[row.permission] }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- How we are using your data (TPP-only, hidden for Rejected) -->
        <div v-if="!isLfi && connection.status !== 'Rejected'" class="imd-usage-card">
          <div class="imd-usage-header">
            <div class="imd-usage-title">
              {{ connection.status === 'Revoked' ? 'You cancelled this connection' : 'How we are using your data' }}
            </div>
            <div class="imd-usage-subtitle">[Detail purpose for which insurance data will be used].</div>
          </div>
          <div class="imd-usage-dates">
            <div class="imd-usage-date-block">
              <div class="imd-usage-date-row">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink: 0;">
                  <path d="M5.33301 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10.667 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2.33301 6.05859H13.6663" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="imd-usage-date-label">First Connected</span>
              </div>
              <div class="imd-usage-date-value">{{ LAST_DATA_RECEIVED }}</div>
            </div>
            <div class="imd-usage-date-block">
              <div class="imd-usage-date-row">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink: 0;">
                  <path d="M5.33301 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10.667 1.33203V3.33203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2.33301 6.05859H13.6663" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="imd-usage-date-label">{{ connection.status === 'Expired' ? 'Connection Expired' : 'Connection Expires' }}</span>
              </div>
              <div class="imd-usage-date-value">{{ formatDate(EXPIRATION_ISO) }}</div>
            </div>
            <div v-if="connection.baseConsentId" class="imd-usage-date-block">
              <div class="imd-usage-date-row">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink: 0;">
                  <rect x="1.33301" y="1.33203" width="13.334" height="13.334" rx="2" stroke="#36BFD4" stroke-width="1.5" />
                  <path d="M10.167 6.16536C9.667 5.33203 8.667 4.66536 7.5 4.83203C6.167 5.0487 5.167 6.16536 5.0003 7.4987C4.8003 9.16536 6.0003 10.6654 7.6003 10.832C8.667 10.9487 9.6003 10.4987 10.167 9.83203" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10.5 4.5V6.5H8.5" stroke="#36BFD4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="imd-usage-date-label">Last Updated</span>
              </div>
              <div class="imd-usage-date-value">{{ LAST_DATA_RECEIVED }}</div>
              <div class="imd-usage-updates-link" @click.stop="showUpdates = true">List of Updates</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showDisconnect || showReactivate" class="imd-footer">
        <button v-if="showReactivate" type="button" class="imd-reactivate-btn" @click="confirmAction = 'reactivate'">Reactivate</button>
        <button v-if="showPause" type="button" class="imd-pause-btn" @click="confirmAction = 'pause'">Pause</button>
        <button v-if="showDisconnect" type="button" class="imd-revoke-btn" @click="confirmAction = 'revoke'">Stop Sharing</button>
      </div>
    </template>

    <!-- Updates list view -->
    <template v-else-if="showUpdates">
      <div class="imd-card-shell">
        <div class="imd-section-card">
          <div class="imd-section-header">
            <div class="imd-section-title">List of Updates</div>
          </div>
          <div class="imd-updates-subtitle">List of all changes that you made to this connection since first authorization.</div>
        </div>

        <div v-if="relatedConsents.length > 0" class="imd-updates-list">
          <div
            v-for="(related, idx) in relatedConsents"
            :key="idx"
            class="imd-updates-item"
            role="button"
            tabindex="0"
            @click="navigateToConsent(related)"
            @keydown.enter.prevent="navigateToConsent(related)"
            @keydown.space.prevent="navigateToConsent(related)"
          >
            <div class="imd-updates-item-name">{{ LAST_DATA_RECEIVED }}</div>
            <div class="imd-updates-item-count">[{{ entityLabel }} {{ related.lfiDigit }}]</div>
            <div class="imd-updates-item-meta imd-updates-item-meta-row">
              <span class="imd-updates-item-meta-label">Insurance Type:</span>
              <span class="imd-updates-item-meta-value">{{ relatedTypesLabel(related) }}</span>
            </div>
            <svg class="imd-updates-chevron" xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>

        <div v-else class="imd-updates-empty">No related updates found.</div>
      </div>
    </template>

    <!-- Confirmation screen -->
    <template v-else>
      <div class="imd-confirm-card imd-confirm-title-card">
        <div class="imd-confirm-title">{{ confirmTitle }}</div>
        <div class="imd-confirm-subtitle">Are you sure you want to proceed?</div>
      </div>
      <div class="imd-confirm-card">
        <div class="imd-confirm-impact-header">What this will mean</div>
        <p class="imd-confirm-impact-text">{{ confirmImpactText }}</p>
      </div>
      <div class="imd-confirm-footer">
        <button
          type="button"
          class="imd-confirm-btn"
          :class="confirmAction === 'pause' ? 'imd-confirm-btn-pause' : confirmAction === 'reactivate' ? 'imd-confirm-btn-reactivate' : 'imd-confirm-btn-revoke'"
        >{{ confirmButtonLabel }}</button>
        <button type="button" class="imd-confirm-back-btn" @click="confirmAction = null">Go back</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.imd-frame {
  display: flex; flex-direction: column; align-items: center;
  padding: 0 0 30px; gap: 20px;
  width: 372px; min-height: 720px;
  background: #f4f8fb; zoom: 0.85;
}

.imd-screen-name { width: 372px; height: 56px; position: relative; }
.imd-screen-bar { position: absolute; inset: 0; background: var(--cmi-header-color, #35bfd4); }
.imd-back-button {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  background: transparent; border: none; padding: 0; cursor: pointer;
  display: flex; align-items: center; justify-content: center; z-index: 1;
}
.imd-screen-title {
  position: absolute; left: 50%; top: 12px; transform: translateX(-50%);
  width: 48px; height: 32px;
  font-family: 'Poppins'; font-weight: 700; font-size: 26px; line-height: 124%;
  text-align: center; color: #f5f5fd; z-index: 1;
}

.imd-card-shell {
  display: flex; flex-direction: column; gap: 16px; width: 316px;
}

.imd-meta-card {
  display: flex; flex-direction: column; gap: 4px; width: 316px;
  background: #ffffff; border-radius: 12px; padding: 16px 12px; box-sizing: border-box;
}
.imd-meta-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;
}
.imd-meta-lfi {
  font-family: 'Poppins'; font-weight: 500; font-size: 19px; line-height: 120%;
  letter-spacing: -0.01em; color: #0b1340;
}
.imd-meta-rows {
  display: flex; flex-direction: column; gap: 4px; margin-top: 6px;
}
.imd-meta-row {
  display: flex; flex-direction: row; justify-content: space-between;
  align-items: center; width: 100%;
}
.imd-meta-row-label {
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 160%;
  letter-spacing: -0.01em; color: #616786; white-space: nowrap;
}
.imd-meta-row-value {
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 160%;
  letter-spacing: -0.01em; color: #0b1340;
}

.imd-consent-id {
  background: transparent; border: none; padding: 0; cursor: pointer; text-align: left;
}
.imd-consent-id-right { display: flex; align-items: center; gap: 6px; }
.imd-consent-id-value {
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 160%;
  letter-spacing: -0.01em; color: #0b1340;
}
.imd-consent-id-action {
  font-family: 'Poppins'; font-size: 12px; font-weight: 300;
  letter-spacing: -0.01em; color: #35bfd4;
  opacity: 0; transition: opacity 0.15s; white-space: nowrap;
}
.imd-consent-id:hover .imd-consent-id-action,
.imd-consent-id.is-copied .imd-consent-id-action { opacity: 1; }
.imd-consent-id.is-copied .imd-consent-id-action { color: #12b76a; }

.imd-status {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 2px 8px; border-radius: 20px; font-family: 'Poppins';
  font-weight: 500; font-size: 10px; line-height: 160%;
  width: fit-content; color: #ffffff;
}
.imd-status-authorized { background: #21a35d; }
.imd-status-awaiting { background: #2563eb; }
.imd-status-suspended { background: #d97706; }
.imd-status-paused { background: #b45309; }
.imd-status-expired { background: #6b7280; }
.imd-status-rejected { background: #dc2626; }

.imd-section-card {
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 16px 12px; gap: 12px; width: 316px;
  background: #ffffff; border-radius: 12px; box-sizing: border-box;
}
.imd-section-header {
  display: flex; flex-direction: row; align-items: flex-start;
  width: 292px;
}
.imd-section-title {
  font-family: 'Poppins'; font-weight: 500; font-size: 19px; line-height: 120%;
  letter-spacing: -0.01em; color: #0c1441;
}

.imd-policies-list {
  display: flex; flex-direction: column; align-items: flex-start; gap: 12px; width: 292px;
}
.imd-policy-card {
  display: flex; flex-direction: row; align-items: flex-start;
  padding: 0; gap: 10px; width: 292px;
}
.imd-policy-card--inactive { opacity: 0.78; }
.imd-policy-status-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 17px; height: 17px; flex-shrink: 0; margin-top: 1px;
}
.imd-policy-body {
  display: flex; flex-direction: column; align-items: flex-start;
  gap: 4px; flex: 1; min-width: 0;
}
.imd-policy-title-text {
  font-family: 'Poppins'; font-style: normal; font-weight: 300; font-size: 14px;
  line-height: 120%; letter-spacing: -0.01em; color: #0c1441;
}
.imd-policy-subtext {
  font-family: 'Poppins'; font-style: normal; font-weight: 300; font-size: 12px;
  line-height: 120%; letter-spacing: -0.01em; color: #616786;
}
.imd-policy-row {
  display: flex; flex-direction: row; justify-content: space-between;
  align-items: baseline; gap: 14px; width: 100%;
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 120%;
  letter-spacing: -0.01em; color: #616786;
}
.imd-policy-row-label { color: #616786; }
.imd-policy-row-value { color: #0C1441; font-weight: 400; }

.imd-policies-empty {
  width: 292px; padding: 12px 0; text-align: center;
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; color: #616786;
}

.imd-type-sections {
  display: flex; flex-direction: column; gap: 16px; width: 292px;
}
.imd-type-section {
  display: flex; flex-direction: column; gap: 6px; width: 292px;
}

.imd-permissions-list {
  display: flex; flex-direction: column; gap: 8px; width: 292px;
}
.imd-permission-row {
  display: flex; flex-direction: column; width: 292px;
}
.imd-permission-toggle {
  display: flex; justify-content: space-between; align-items: center;
  width: 100%; padding: 8px 0; background: transparent; border: 0; cursor: pointer;
}
.imd-permission-label-section {
  display: inline-flex; align-items: center; gap: 10px;
}
.imd-permission-icon { flex-shrink: 0; }
.imd-permission-label {
  font-family: 'Poppins'; font-weight: 400; font-size: 13px;
  letter-spacing: -0.01em; color: #0C1441;
}
.imd-permission-arrow {
  width: 7.41px; height: 14.7px;
  transform: matrix(1, 0, 0, -1, 0, 0);
  transition: transform 0.15s ease;
  flex: none;
}
.imd-permission-arrow.is-open { transform: rotate(90deg); }
.imd-permission-description {
  padding: 4px 0 8px;
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 140%;
  letter-spacing: -0.01em; color: #616786;
}

/* How we are using your data card */
.imd-usage-card {
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 16px 12px; gap: 24px; width: 316px;
  background: #FFFFFF; border-radius: 12px; box-sizing: border-box;
}
.imd-usage-header {
  display: flex; flex-direction: column; align-items: flex-start;
  gap: 12px; width: 292px;
}
.imd-usage-title {
  width: 292px; font-family: 'Poppins'; font-weight: 500; font-size: 19px;
  line-height: 120%; letter-spacing: -0.01em; color: #0B1340;
}
.imd-usage-subtitle {
  width: 292px; font-family: 'Poppins'; font-weight: 300; font-size: 12px;
  line-height: 140%; letter-spacing: -0.01em; color: #8287A0;
}
.imd-usage-dates {
  display: flex; flex-direction: column; align-items: flex-start; gap: 10px; width: 292px;
}
.imd-usage-date-block {
  display: flex; flex-direction: column; align-items: flex-start; gap: 10px; width: 292px;
}
.imd-usage-date-row {
  display: flex; flex-direction: row; align-items: center; gap: 10px; width: 292px;
}
.imd-usage-date-label {
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 120%;
  letter-spacing: -0.01em; color: #000000;
}
.imd-usage-date-value {
  padding-left: 28px;
  font-family: 'Poppins'; font-weight: 400; font-size: 12px; line-height: 120%;
  letter-spacing: -0.01em; color: #8287A0;
}
.imd-usage-updates-link {
  padding-left: 28px;
  font-family: 'Poppins'; font-weight: 600; font-size: 12px; line-height: 120%;
  letter-spacing: -0.01em; text-decoration-line: underline;
  color: #36BFD4; cursor: pointer;
}

/* Footer buttons */
.imd-footer { width: 316px; display: flex; flex-direction: column; gap: 10px; }
.imd-revoke-btn {
  width: 100%; padding: 10px; border: 1px solid #f04438; border-radius: 66px;
  background: transparent; font-family: 'Poppins'; font-weight: 500; font-size: 14px;
  line-height: 120%; letter-spacing: -0.01em; color: #f04438;
  cursor: pointer; transition: background 0.15s;
}
.imd-revoke-btn:hover { background: #fff0f0; }

.imd-pause-btn {
  width: 100%; padding: 10px; border: 1px solid #d97706; border-radius: 66px;
  background: transparent; font-family: 'Poppins'; font-weight: 500; font-size: 14px;
  line-height: 120%; letter-spacing: -0.01em; color: #d97706;
  cursor: pointer; transition: background 0.15s;
}
.imd-pause-btn:hover { background: #fffbeb; }

.imd-reactivate-btn {
  width: 100%; padding: 10px; border: 1px solid #00897b; border-radius: 66px;
  background: transparent; font-family: 'Poppins'; font-weight: 500; font-size: 14px;
  line-height: 120%; letter-spacing: -0.01em; color: #00897b;
  cursor: pointer; transition: background 0.15s;
}
.imd-reactivate-btn:hover { background: #e0f2f1; }

/* Confirmation */
.imd-confirm-card {
  width: 316px; background: #ffffff; border-radius: 12px; padding: 16px 12px;
  box-sizing: border-box; display: flex; flex-direction: column; gap: 8px;
}
.imd-confirm-title-card { gap: 4px; }
.imd-confirm-title {
  font-family: 'Poppins'; font-weight: 600; font-size: 19px; line-height: 120%;
  letter-spacing: -0.01em; color: #0b1340;
}
.imd-confirm-subtitle {
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 160%;
  letter-spacing: -0.01em; color: #616786;
}
.imd-confirm-impact-header {
  font-family: 'Poppins'; font-weight: 500; font-size: 19px; line-height: 120%;
  letter-spacing: -0.01em; color: #0b1340;
}
.imd-confirm-impact-text {
  font-family: 'Poppins'; font-weight: 300; font-size: 12px; line-height: 160%;
  letter-spacing: -0.01em; color: #616786; margin: 0;
}
.imd-confirm-footer { width: 316px; display: flex; flex-direction: column; gap: 10px; }
.imd-confirm-btn {
  width: 100%; padding: 10px; border-radius: 66px; background: transparent;
  font-family: 'Poppins'; font-weight: 500; font-size: 14px; line-height: 120%;
  letter-spacing: -0.01em; cursor: pointer; transition: background 0.15s;
}
.imd-confirm-btn-revoke { border: 1px solid #f04438; color: #f04438; }
.imd-confirm-btn-revoke:hover { background: #fff0f0; }
.imd-confirm-btn-pause { border: 1px solid #d97706; color: #d97706; }
.imd-confirm-btn-pause:hover { background: #fffbeb; }
.imd-confirm-btn-reactivate { border: 1px solid #00897b; color: #00897b; }
.imd-confirm-btn-reactivate:hover { background: #e0f2f1; }
.imd-confirm-back-btn {
  width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 66px;
  background: transparent; font-family: 'Poppins'; font-weight: 500; font-size: 14px;
  line-height: 120%; letter-spacing: -0.01em; color: #0b1340;
  cursor: pointer; transition: background 0.15s;
}
.imd-confirm-back-btn:hover { background: #f4f8fb; }

/* Updates list */
.imd-updates-subtitle {
  width: 292px; font-family: 'Poppins'; font-weight: 300; font-size: 12px;
  line-height: 160%; color: #0B1340;
}
.imd-updates-list {
  display: flex; flex-direction: column;
  width: 316px; background: #FFFFFF; border-radius: 12px;
  padding: 16px 12px; box-sizing: border-box;
}
.imd-updates-item {
  position: relative; padding: 0 32px 20px 0;
  border-bottom: 1px solid rgba(11, 19, 64, 0.2); border-radius: 6px;
  cursor: pointer; transition: background 0.15s ease, box-shadow 0.15s ease;
  outline: none;
}
.imd-updates-item + .imd-updates-item { padding-top: 10px; }
.imd-updates-item:last-child { border-bottom: none; padding-bottom: 0; }
.imd-updates-item:hover { background: rgba(54, 191, 212, 0.05); }
.imd-updates-item:focus-visible { box-shadow: 0 0 0 2px #36bfd4; }
.imd-updates-chevron {
  position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
  color: rgba(11, 19, 64, 0.2);
  transition: color 0.15s ease, transform 0.15s ease; flex-shrink: 0;
}
.imd-updates-item:hover .imd-updates-chevron {
  color: #36bfd4; transform: translateY(-50%) translateX(2px);
}
.imd-updates-item-name {
  font-family: 'Poppins'; font-weight: 600; font-size: 14px; line-height: 120%;
  letter-spacing: -0.01em; color: #0b1340;
}
.imd-updates-item-count {
  margin-top: 8px; margin-bottom: 6px; font-family: 'Poppins'; font-weight: 300;
  font-size: 13px; line-height: 120%; letter-spacing: -0.01em; color: #0b1340; font-style: italic;
}
.imd-updates-item-meta {
  margin-top: 8px; font-family: 'Poppins'; font-weight: 300; font-size: 11px;
  line-height: 120%; letter-spacing: -0.01em; color: #616786;
}
.imd-updates-item-meta-row {
  display: flex; flex-direction: row; justify-content: space-between;
  width: 100%; align-items: center; column-gap: 8px;
}
.imd-updates-item-meta-label { color: #616786; }
.imd-updates-item-meta-value { color: #0b1340; }
.imd-updates-empty {
  width: 316px; padding: 40px 12px; text-align: center;
  font-family: 'Poppins'; font-weight: 400; font-size: 12px; line-height: 140%;
  color: #616786; background: #FFFFFF; border-radius: 12px; box-sizing: border-box;
}

.imd-lfi .imd-screen-bar { background: var(--cmi-header-color, #FD6436); }
</style>
