<template>
    <div class="auth-page-frame">

        <div class="auth-page-header">
            <div class="auth-page-screen-name">
                <div class="auth-page-tpp-text">LFI</div>
                <svg class="auth-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" />
                </svg>
                <div class="auth-page-rectangle"></div>
            </div>
            <div class="auth-page-contents">
                <img class="auth-page-logo" src="/images/journeys/ConsentPages/AlTareq.png" alt="AlTareq logo" />
                <div class="auth-page-progress">
                    <div class="auth-page-progress-1">
                        <div class="auth-page-progress-icon-active">
                            <svg class="auth-page-progress-icon-text-active" width="10" height="8" viewBox="0 0 10 8"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z"
                                    fill="white" />
                            </svg>
                        </div>
                        <div class="auth-page-progress-text">Consent</div>
                    </div>
                    <div class="auth-page-progress-2">
                        <div class="auth-page-progress-icon-active">
                            <div class="auth-page-progress-icon-text-active">2</div>
                        </div>
                        <div class="auth-page-progress-text">Authorize</div>
                    </div>
                    <div class="auth-page-progress-3">
                        <div class="auth-page-progress-icon">
                            <div class="auth-page-progress-icon-text">3</div>
                        </div>
                        <div class="auth-page-progress-text">Complete</div>
                    </div>
                    <svg class="auth-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" />
                        <path d="M0.5 1H168" stroke="#00C8AF" stroke-width="2" />
                    </svg>
                </div>
            </div>
        </div>

        <div v-if="visiblePolicies.length > 0" class="auth-page-text-frame">
            <div class="auth-page-text-inner-frame">
                <div class="auth-page-text-header">
                    Select policy(ies) to share information with
                    {{ consentData?.OnBehalfOf?.TradingName || '[TPP Trading Name]' }}
                </div>

                <div class="ins-status-group" v-if="activePolicies.length">
                    <div class="ins-status-group-header">
                        <div class="ins-status-group-head-left">
                            <svg class="ins-status-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8.5" cy="8.5" r="6.95" fill="#22A35D" fill-opacity="0.4" />
                                <path d="M5.5 8.7L7.7 10.9L11.7 6.5" stroke="#22A35D" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                            </svg>
                            <div class="ins-status-group-title">Active Policies</div>
                        </div>
                    </div>

                    <div class="ins-policy-list">
                        <div
                            v-for="policy in activePolicies"
                            :key="policy.id"
                            class="ins-policy-card"
                            @click="toggleSelected(policy.id)"
                        >
                            <div class="ins-policy-card-head">
                                <div class="ins-policy-card-title">{{ policyTitle(policy) }}</div>
                                <div class="ins-policy-checkbox" :class="{ 'is-active': selectedPolicies[policy.id] }">
                                    <svg v-if="selectedPolicies[policy.id]" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16667 8.68333L0 4.51667L1.175 3.34167L4.16667 6.325L10.4917 0L11.6667 1.18333L4.16667 8.68333Z" fill="white"/></svg>
                                </div>
                            </div>
                            <div class="ins-policy-card-meta">
                                <div class="ins-policy-card-row ins-policy-card-row--ref">{{ policy.policyNumber }}</div>
                                <div class="ins-policy-card-row">
                                    <span class="ins-policy-card-row-label">Premium</span>
                                    <DirhamAmount class="ins-policy-card-row-value" :amount="policy.premium.toLocaleString()" />
                                </div>
                                <div class="ins-policy-card-row">
                                    <span class="ins-policy-card-row-label">Valid until</span>
                                    <span class="ins-policy-card-row-value">{{ formatDateOnly(policy.endDate) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ins-status-group" v-if="inactivePolicies.length">
                    <div class="ins-status-group-header is-collapsible" @click="show_inactive = !show_inactive">
                        <div class="ins-status-group-head-left">
                            <svg class="ins-status-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8.5" cy="8.5" r="6.95" fill="#FDAA35" fill-opacity="0.4" />
                                <path d="M8.5 5.2V8.5L10.3 9.7" stroke="#FDAA35" stroke-width="1.4" stroke-linecap="round" fill="none" />
                            </svg>
                            <div class="ins-status-group-title">Inactive Policies</div>
                        </div>
                        <svg class="ins-status-group-arrow" :class="{ 'is-open': show_inactive }" width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z" fill="black" fill-opacity="0.4" />
                        </svg>
                    </div>

                    <div v-if="show_inactive" class="ins-policy-list">
                        <div
                            v-for="policy in inactivePolicies"
                            :key="policy.id"
                            class="ins-policy-card ins-policy-card--inactive"
                            @click="toggleSelected(policy.id)"
                        >
                            <div class="ins-policy-card-head">
                                <div class="ins-policy-card-title-section">
                                    <div class="ins-policy-card-title">{{ policyTitle(policy) }}</div>
                                    <div class="ins-policy-card-status">{{ statusLabel(policy.status) }}</div>
                                </div>
                                <div class="ins-policy-checkbox" :class="{ 'is-active': selectedPolicies[policy.id] }">
                                    <svg v-if="selectedPolicies[policy.id]" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16667 8.68333L0 4.51667L1.175 3.34167L4.16667 6.325L10.4917 0L11.6667 1.18333L4.16667 8.68333Z" fill="white"/></svg>
                                </div>
                            </div>
                            <div class="ins-policy-card-meta">
                                <div class="ins-policy-card-row ins-policy-card-row--ref">{{ policy.policyNumber }}</div>
                                <div class="ins-policy-card-row">
                                    <span class="ins-policy-card-row-label">Valid until</span>
                                    <span class="ins-policy-card-row-value">{{ formatDateOnly(policy.endDate) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="insuranceGroups.length" class="auth-page-text-inner-frame-2">
                    <div class="auth-page-text-mini-header-section">
                        <div class="auth-page-text-mini-header-section-header"
                            @click="show_information = !show_information">
                            <div class="auth-page-text-min-header-section-header-text">
                                Review the information you will share
                            </div>
                            <svg class="auth-page-mini-header-icon" :class="{ 'is-open': show_information }" width="15"
                                height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z"
                                    fill="#36BFD4" />
                            </svg>
                        </div>
                    </div>

                    <div v-if="show_information" class="auth-page-text-section ins-auth-review">
                        <div
                            v-for="group in insuranceGroups"
                            :key="group.InsuranceType"
                            class="ins-auth-type-section"
                        >
                            <div class="ins-auth-type-heading">
                                {{ insuranceTypeLabels[group.InsuranceType] || `${group.InsuranceType} Insurance` }}
                            </div>
                            <template
                                v-for="row in insurancePermissionGroups"
                                :key="`${group.InsuranceType}::${row.permission}`"
                            >
                                <div
                                    v-if="group.Permissions?.includes(row.permission)"
                                    class="auth-page-dropdown-container"
                                >
                                    <div
                                        class="auth-page-dropdown"
                                        @click="toggleRow(group.InsuranceType, row.permission)"
                                    >
                                        <div class="auth-page-dropdown-text-section">
                                            <component :is="permissionIcon(row.permission)" />
                                            <div class="auth-page-dropdown-text">{{ row.label }}</div>
                                        </div>
                                        <svg
                                            class="auth-page-dropdown-arrow"
                                            :class="{ 'is-open': isOpen(group.InsuranceType, row.permission) }"
                                            width="5" height="10" viewBox="0 0 5 10" fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                                                fill="black" fill-opacity="0.4"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        v-if="isOpen(group.InsuranceType, row.permission)"
                                        class="auth-page-dropdown-subtext-section"
                                    >
                                        <div class="auth-page-dropdown-subtext">
                                            {{ insurancePermissionDescriptions[row.permission] }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <div class="auth-page-date-range">
                <svg class="auth-page-divider" width="292" height="2" viewBox="0 0 292 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="292" height="2" fill="#D9D9D9" fill-opacity="0.1" />
                </svg>
                <div class="auth-page-dropdown" style="cursor: default;">
                    <div class="auth-page-date">
                        <div class="auth-page-date-text">We will share your data until</div>
                        <div class="auth-page-date-2">
                            <div class="auth-page-date-3">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.33301 1.33203V3.33203" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.667 1.33203V3.33203" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.33301 6.05859H13.6663" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="auth-page-date-text">{{ formatDate(consentData?.ExpirationDateTime) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="auth-page-text-frame">
            <div class="auth-page-text-inner-frame">
                <div class="auth-page-text-header">Something went wrong</div>
                <div class="auth-page-error-image-container">
                    <svg class="auth-page-error-image" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.9596 51.8971L32.2422 39.1797" stroke="black" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M44.8327 39.3086L32.1152 52.026" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M32.1143 19.2697H44.9602C51.3832 19.2697 51.3832 16.0582 51.3832 12.8468C51.3832 6.42383 48.1717 6.42383 44.9602 6.42383H32.1143C28.9029 6.42383 25.6914 6.42383 25.6914 12.8468C25.6914 19.2697 28.9029 19.2697 32.1143 19.2697Z" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M51.3839 12.9102C62.0781 13.4882 67.4412 17.4383 67.4412 32.1147V51.3836C67.4412 64.2294 64.2297 70.6524 48.1724 70.6524H28.9036C12.8462 70.6524 9.63477 64.2294 9.63477 51.3836V32.1147C9.63477 17.4704 14.9979 13.4882 25.6921 12.9102" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="auth-page-text">
                    We couldn&rsquo;t find any policies that match the insurance type(s) requested, so unfortunately
                    we&rsquo;re unable to share any information with
                    {{ consentData?.OnBehalfOf?.TradingName || '[TPP Trading Name]' }}.
                </div>
            </div>
        </div>

        <div class="auth-page-button-with-description"
            :class="{ 'auth-page-button-with-description--error': visiblePolicies.length === 0 }">
            <div class="auth-page-button">
                <div class="auth-page-button-text-section">
                    <svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z" fill="white" />
                        <path d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z" fill="url(#paint0_linear_ins_auth)" />
                        <path d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z" fill="url(#paint1_linear_ins_auth)" />
                        <path d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z" fill="url(#paint2_linear_ins_auth)" />
                        <path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z" fill="url(#paint3_radial_ins_auth)" />
                        <defs>
                            <linearGradient id="paint0_linear_ins_auth" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4083E1" /><stop offset="0.08" stop-color="#3E8BDD" /><stop offset="0.48" stop-color="#36B1CC" /><stop offset="0.8" stop-color="#31C9C1" /><stop offset="1" stop-color="#30D2BE" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_ins_auth" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#80ACEB" /><stop offset="0.3" stop-color="#7BC0E1" /><stop offset="0.73" stop-color="#76D8D7" /><stop offset="1" stop-color="#75E1D4" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_ins_auth" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#BFD6F5" /><stop offset="0.55" stop-color="#BBE7ED" /><stop offset="1" stop-color="#BAF0E9" />
                            </linearGradient>
                            <radialGradient id="paint3_radial_ins_auth" cx="0" cy="0" r="1" gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#40E0C7" /><stop offset="0.304248" stop-color="#0050C8" /><stop offset="0.623256" stop-color="white" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div class="auth-page-button-text">
                        {{ visiblePolicies.length > 0 ? 'Authorize using AlTareq' : 'Close' }}
                    </div>
                </div>
            </div>
            <div v-if="visiblePolicies.length > 0" class="auth-page-button-cancel">
                <div class="auth-page-button-cancel-text">Cancel</div>
            </div>
            <div v-else class="auth-page-button-description">
                By pressing Close you will be returned to
                {{ consentData?.OnBehalfOf?.TradingName || '[TPP Trading Name]' }}. No data will be shared.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, h } from 'vue'
import { useSharedState } from '../composables/useSharedState.ts'
import { formatDateTime as formatDate } from '../composables/formatDate.ts'
import {
    insurancePolicyStatusGroup,
    STATUS_LABELS,
    type InsurancePolicyStatus,
} from '../composables/insurancePolicyStatus.ts'
import {
    insurancePermissionDescriptions,
    insurancePermissionGroups,
    insuranceTypeLabels,
} from '../composables/insurancePermissionDescriptions.ts'
import DirhamAmount from '../consent-ui/DirhamAmount.vue'

const { sharedState, consentData } = useSharedState()
const show_inactive = ref(false)
const show_information = ref(true)

// Open-state per (InsuranceType, Permission) so accordions are independent
// across types — same pattern as the TPP consent wireframe.
const openRows = ref<Record<string, boolean>>({})
const rowKey = (insuranceType: string, permission: string) => `${insuranceType}::${permission}`
const isOpen = (insuranceType: string, permission: string) =>
    !!openRows.value[rowKey(insuranceType, permission)]
const toggleRow = (insuranceType: string, permission: string) => {
    const k = rowKey(insuranceType, permission)
    openRows.value = { ...openRows.value, [k]: !openRows.value[k] }
}

// Normalises consent.Permissions into an array of { InsuranceType, Permissions[] }.
const insuranceGroups = computed(() => {
    const raw = consentData.value?.Permissions
    if (!Array.isArray(raw)) return []
    return raw.filter(
        (g: any) =>
            g && typeof g === 'object' && typeof g.InsuranceType === 'string' && Array.isArray(g.Permissions),
    )
})

interface Policy {
    id: number
    insuranceType: string
    status: InsurancePolicyStatus
    policyNumber: string
    premium: number
    startDate: string
    endDate: string
}

const DEFAULT_POLICIES: Policy[] = [
    { id: 1, insuranceType: 'Motor', status: 'New', policyNumber: 'MOT-2026-0001', premium: 2400, startDate: '2025-11-26', endDate: '2026-11-26' },
    { id: 2, insuranceType: 'Health', status: 'Renewed', policyNumber: 'HLT-2026-0001', premium: 6800, startDate: '2025-11-26', endDate: '2026-11-26' },
    { id: 3, insuranceType: 'Travel', status: 'Expired', policyNumber: 'TRV-2026-0001', premium: 320, startDate: '2024-05-25', endDate: '2025-04-25' },
]

const policies = computed<Policy[]>(() => sharedState.value?.policies ?? DEFAULT_POLICIES)

// Insurance types the TPP requested, drawn from consent.Permissions[].InsuranceType.
const requestedTypes = computed<Set<string>>(() => {
    const groups = consentData.value?.Permissions
    if (!Array.isArray(groups)) return new Set()
    return new Set(groups
        .map((g: any) => g?.InsuranceType)
        .filter((t: any) => typeof t === 'string'))
})

const visiblePolicies = computed<Policy[]>(() =>
    policies.value.filter(p => requestedTypes.value.has(p.insuranceType)),
)

const activePolicies = computed<Policy[]>(() =>
    visiblePolicies.value.filter(p => insurancePolicyStatusGroup(p.status) === 'active'),
)

const inactivePolicies = computed<Policy[]>(() =>
    visiblePolicies.value.filter(p => insurancePolicyStatusGroup(p.status) === 'inactive'),
)

const selectedPolicies = reactive<Record<number, boolean>>({})
function toggleSelected(id: number) {
    selectedPolicies[id] = !selectedPolicies[id]
}

function policyTitle(policy: Policy) {
    return `${policy.insuranceType} Insurance`
}

function statusLabel(status: InsurancePolicyStatus) {
    return STATUS_LABELS[status] ?? status
}

// The PolicyEditor stores dates as YYYY-MM-DD; render them as DD/MM/YYYY to
// match the shorthand the bank wireframe uses for non-time-bearing dates.
function formatDateOnly(iso: string) {
    if (!iso) return ''
    const [y, m, d] = iso.split('-')
    if (!y || !m || !d) return iso
    return `${d}/${m}/${y}`
}

// Per-permission row icons for the 'Review the information you will share'
// section. Sized 18×18 to match the bank auth screen's permission rows
// (vs the 24×24 used on the larger TPP consent wireframe). SVG paths are
// authored against a 24-unit viewBox.
const iconBase = (paths: Array<Record<string, any>>) =>
    () =>
        h(
            'svg',
            { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
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

const icons: Record<string, ReturnType<typeof iconBase>> = {
    // receipt-edit
    ReadInsurancePolicies: iconBase([
        { d: 'M3.5 4.5C3.5 3.4 4.4 2.5 5.5 2.5H15C16.1 2.5 17 3.4 17 4.5V20L14.5 18.5L12 20L9.5 18.5L7 20L4.5 18.5L2 20V4.5C2 3.4 2.9 2.5 4 2.5' },
        { d: 'M8 7H13' },
        { d: 'M9 11H12' },
        { d: 'M19.2 14.8L15.7 18.3C15.6 18.5 15.5 18.7 15.4 18.9L15.2 20.3C15.1 20.7 15.5 21.1 16 21L17.3 20.8C17.5 20.8 17.8 20.7 17.9 20.5L21.4 17C22 16.4 22.3 15.7 21.4 14.8C20.5 13.9 19.8 14.2 19.2 14.8Z' },
    ]),
    // user
    ReadCustomerBasic: iconBase([
        { d: 'M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z' },
        { d: 'M19 21C19 17.13 15.87 14 12 14C8.13 14 5 17.13 5 21' },
    ]),
    // document-text
    ReadCustomerDetail: iconBase([
        { d: 'M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14' },
        { d: 'M22 10H18C15 10 14 9 14 6V2L22 10Z' },
        { d: 'M8 13H13' },
        { d: 'M8 17H11' },
    ]),
    // element-equal
    ReadInsuranceProduct: iconBase([
        { d: 'M18 9.5H16C14 9.5 14 8.5 14 7.5V5.5C14 3.5 15 2.5 17 2.5H21C22 2.5 22 3.5 22 5.5V7.5C22 8.5 22 9.5 21 9.5H18Z' },
        { d: 'M6 9.5H8C10 9.5 10 8.5 10 7.5V5.5C10 3.5 9 2.5 7 2.5H3C2 2.5 2 3.5 2 5.5V7.5C2 8.5 2 9.5 3 9.5H6Z' },
        { d: 'M6 21.5H8C10 21.5 10 20.5 10 19.5V17.5C10 15.5 9 14.5 7 14.5H3C2 14.5 2 15.5 2 17.5V19.5C2 20.5 2 21.5 3 21.5H6Z' },
        { d: 'M14 17.5H21' },
        { d: 'M14 20.5H21' },
    ]),
    // dollar-circle
    ReadInsurancePremium: iconBase([
        { d: 'M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984' },
        { d: 'M12 6V18' },
        { d: 'M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12Z' },
    ]),
    // wallet-2
    ReadCustomerPaymentDetails: iconBase([
        { d: 'M7 11H14' },
        { d: 'M18 14.5H17C16 14.5 15 13.7 15 12.5C15 11.4 15.9 10.5 17 10.5H18C19.1 10.5 20 11.4 20 12.5C20 13.7 19.1 14.5 18 14.5Z' },
        { d: 'M20 10.5V13.5C20 17.5 18 19.5 14 19.5H8C4 19.5 2 17.5 2 13.5V7.5C2 4 4 2 7.5 2H14C18 2 20 4 20 8' },
    ]),
    // more-circle
    ReadCustomerClaims: iconBase([
        { d: 'M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z' },
        { d: 'M15.9965 12H16.0054', 'stroke-width': 2 },
        { d: 'M11.9955 12H12.0045', 'stroke-width': 2 },
        { d: 'M7.99451 12H8.00349', 'stroke-width': 2 },
    ]),
}

const permissionIcon = (permission: string) => icons[permission] || icons.ReadInsurancePolicies
</script>

<style scoped>
@import './authorization-page.css';

/* Insurance-only: the LFI auth screen groups visible policies by status
   (Active/Inactive) instead of the bank's flat account list. These rules
   style the status group headers, the per-status policy cards, and the
   custom checkbox. Header/button/date come from the shared file above. */

.ins-status-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 16px;
    width: 292px;
    align-self: stretch;
}

/* Tighten the gap between Active and Inactive groups — they're closely
   related and don't need the full 26px the parent inner-frame uses
   between unrelated sections. Negative margin offsets the parent gap. */
.ins-status-group + .ins-status-group {
    margin-top: -14px;
}

/* Push the 'Review the information you will share' section further away
   from the policy lists so it reads as a distinct stage of the screen. */
.auth-page-text-inner-frame-2 {
    margin-top: 16px;
}

.ins-status-group-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 6px;
    width: 292px;
    height: 17px;
    align-self: stretch;
}

/* Collapsible variant has an extra arrow on the right, so push the
   left cluster and the arrow to opposite ends. */
.ins-status-group-header.is-collapsible {
    cursor: pointer;
    justify-content: space-between;
}

.ins-status-group-head-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
}

.ins-status-icon {
    flex: none;
    width: 17px;
    height: 17px;
}

.ins-status-group-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #0C1441;
}

.ins-status-group-arrow {
    width: 5px;
    height: 10px;
    transform: rotate(90deg);
    transition: transform 0.15s ease;
}

.ins-status-group-arrow.is-open {
    transform: rotate(-90deg);
}

.ins-policy-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 8px;
    width: 292px;
    align-self: stretch;
}

.ins-policy-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    gap: 10px;
    width: 292px;
    background: #F9F9FC;
    border-radius: 6px;
    cursor: pointer;
    box-sizing: border-box;
    align-self: stretch;
}

.ins-policy-card--inactive {
    opacity: 0.78;
}

.ins-policy-card-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    gap: 30px;
    width: 272px;
    align-self: stretch;
}

.ins-policy-card-title-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
}

.ins-policy-card-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #0C1441;
}

.ins-policy-card-status {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 120%;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #FDAA35;
}

.ins-policy-checkbox {
    width: 20px;
    height: 20px;
    background: #FFFFFF;
    border: 2px solid #D5D7E1;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    flex-shrink: 0;
}

.ins-policy-checkbox.is-active {
    background: #FD6436;
    border-color: #FD6436;
}

.ins-policy-card-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 6px;
    width: 272px;
}

.ins-policy-card-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    padding: 0;
    gap: 14px;
    width: 272px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #616786;
}

.ins-policy-card-row--ref {
    font-family: 'Poppins';
    color: #4D5464;
    font-weight: 400;
}

.ins-policy-card-row-label {
    color: #616786;
}

.ins-policy-card-row-value {
    color: #0C1441;
    font-weight: 400;
}

/* 'Review the information you will share' — per-insurance-type subgroup
   heading + its stack of permission accordions. Each group sits inside the
   shared `.auth-page-text-section` and lets the user see the permissions
   the TPP requested for that specific insurance type. */
.ins-auth-review {
    gap: 20px;
}

.ins-auth-type-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
}

.ins-auth-type-heading {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #0C1441;
}

/* Insurance-only: give the no-matching-policies error card a bit more
   breathing room below the body copy. Banking's variant uses the shared
   default padding and is intentionally tighter. */
.auth-page-text-frame:has(.auth-page-error-image-container) {
    padding-bottom: 28px;
}
</style>
