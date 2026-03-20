<script setup>
import { ref, inject, computed } from 'vue'
import { useSharedState } from '../Composables/useSharedState.ts'
import { formatDate } from '../Composables/formatDate.ts'
import { permissionDescriptions } from '../Composables/permissionDescriptions.ts'

const { sharedState } = useSharedState()

// When rendered inside ConsentManagementDetail, use injected consent directly.
// Falls back to sharedState for standalone usage (e.g. ConsentBankDataSharing context).
const detailConsent = inject('detailConsent', null)
const consent = computed(() => detailConsent?.value ?? sharedState?.value?.consent)

const show_account_details = ref(false)
const show_regular_payments = ref(false)
const show_account_trans = ref(false)
const show_account_statements = ref(false)
const show_product_info = ref(false)
const show_parties = ref(false)
const show_finance_rates = ref(false)
</script>

<template>
    <div class="consent-page-text-frame-2">
        <div class="consent-page-text-inner-frame">
            <div class="consent-page-text-inner-frame-2">
                <div class="consent-page-text-mini-header-section">
                    <div class="consent-page-text-mini-header-section-header">
                        Data we can access
                    </div>
                </div>
                <div class="consent-page-text-section">

                    <!-- Account Details -->
                    <div v-if="consent?.Permissions?.some(item => ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances'].includes(item))"
                        class="consent-page-dropdown-container">
                        <div class="consent-page-dropdown" @click="show_account_details = !show_account_details">
                            <div class="consent-page-dropdown-text-section">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="consent-page-dropdown-text"> Your Account Details</div>
                            </div>
                            <svg class="consent-page-dropdown-arrow" :class="{ 'is-open': show_account_details }" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" />
                            </svg>
                        </div>
                        <div v-if="show_account_details" class="consent-page-dropdown-subtext-section">
                            <div class="consent-page-dropdown-subtext">
                                <div v-if="consent?.Permissions?.includes('ReadAccountsDetail')">{{ permissionDescriptions['ReadAccountsDetail'] }}</div>
                                <div v-else-if="consent?.Permissions?.includes('ReadAccountsBasic')">{{ permissionDescriptions['ReadAccountsBasic'] }}</div>
                                <div v-if="consent?.Permissions?.includes('ReadBalances')">{{ permissionDescriptions['ReadBalances'] }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Regular Payments -->
                    <div v-if="consent?.Permissions?.some(item => ['ReadBeneficiariesBasic', 'ReadBeneficiariesDetail', 'ReadStandingOrdersBasic', 'ReadStandingOrdersDetail', 'ReadDirectDebits', 'ReadScheduledPaymentsBasic', 'ReadScheduledPaymentsDetail'].includes(item))"
                        class="consent-page-dropdown-container">
                        <div class="consent-page-dropdown" @click="show_regular_payments = !show_regular_payments">
                            <div class="consent-page-dropdown-text-section">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 6V18" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="consent-page-dropdown-text"> Your Regular Payments</div>
                            </div>
                            <svg class="consent-page-dropdown-arrow" :class="{ 'is-open': show_regular_payments }" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" />
                            </svg>
                        </div>
                        <div v-if="show_regular_payments" class="consent-page-dropdown-subtext-section">
                            <div class="consent-page-dropdown-subtext">
                                <div v-if="consent?.Permissions?.includes('ReadBeneficiariesDetail')">{{ permissionDescriptions['ReadBeneficiariesDetail'] }}</div>
                                <div v-else-if="consent?.Permissions?.includes('ReadBeneficiariesBasic')">{{ permissionDescriptions['ReadBeneficiariesBasic'] }}</div>
                                <div v-if="consent?.Permissions?.includes('ReadStandingOrdersDetail')">{{ permissionDescriptions['ReadStandingOrdersDetail'] }}</div>
                                <div v-else-if="consent?.Permissions?.includes('ReadStandingOrdersBasic')">{{ permissionDescriptions['ReadStandingOrdersBasic'] }}</div>
                                <div v-if="consent?.Permissions?.includes('ReadScheduledPaymentsDetail')">{{ permissionDescriptions['ReadScheduledPaymentsDetail'] }}</div>
                                <div v-else-if="consent?.Permissions?.includes('ReadScheduledPaymentsBasic')">{{ permissionDescriptions['ReadScheduledPaymentsBasic'] }}</div>
                                <div v-if="consent?.Permissions?.includes('ReadDirectDebits')">{{ permissionDescriptions['ReadDirectDebits'] }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Transactions -->
                    <div v-if="consent?.Permissions?.some(item => ['ReadTransactionsBasic', 'ReadTransactionsDetail'].includes(item))"
                        class="consent-page-dropdown-container">
                        <div class="consent-page-dropdown" @click="show_account_trans = !show_account_trans">
                            <div class="consent-page-dropdown-text-section">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 9H7" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M22 10.97V13.03C22 13.58 21.56 14.03 21 14.05H19.04C17.96 14.05 16.97 13.26 16.88 12.18C16.82 11.55 17.06 10.96 17.48 10.55C17.85 10.17 18.36 9.95001 18.92 9.95001H21C21.56 9.97001 22 10.42 22 10.97Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.48 10.55C17.06 10.96 16.82 11.55 16.88 12.18C16.97 13.26 17.96 14.05 19.04 14.05H21V15.5C21 18.5 19 20.5 16 20.5H7C4 20.5 2 18.5 2 15.5V8.5C2 5.78 3.64 3.88 6.19 3.56C6.45 3.52 6.72 3.5 7 3.5H16C16.26 3.5 16.51 3.50999 16.75 3.54999C19.33 3.84999 21 5.76 21 8.5V9.95001H18.92C18.36 9.95001 17.85 10.17 17.48 10.55Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="consent-page-dropdown-text"> Your Account Transactions</div>
                            </div>
                            <svg class="consent-page-dropdown-arrow" :class="{ 'is-open': show_account_trans }" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" />
                            </svg>
                        </div>
                        <div v-if="show_account_trans" class="consent-page-dropdown-subtext-section">
                            <div v-if="consent?.Permissions?.includes('ReadTransactionsDetail')" class="consent-page-dropdown-subtext">{{ permissionDescriptions['ReadTransactionsDetail'] }}</div>
                            <div v-else-if="consent?.Permissions?.includes('ReadTransactionsBasic')" class="consent-page-dropdown-subtext">{{ permissionDescriptions['ReadTransactionsBasic'] }}</div>
                        </div>
                    </div>

                    <!-- Statements -->
                    <div v-if="consent?.Permissions?.some(item => ['ReadStatements'].includes(item))"
                        class="consent-page-dropdown-container">
                        <div class="consent-page-dropdown" @click="show_account_statements = !show_account_statements">
                            <div class="consent-page-dropdown-text-section">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.5 11.3V7.04001C20.5 3.01001 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01001 3.5 7.04001V18.3C3.5 20.96 4.96001 21.59 6.73001 19.69L6.73999 19.68C7.55999 18.81 8.80999 18.88 9.51999 19.83L10.53 21.18" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 7H16" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9 11H15" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18.211 14.7703L14.671 18.3103C14.531 18.4503 14.401 18.7103 14.371 18.9003L14.181 20.2503C14.111 20.7403 14.451 21.0803 14.941 21.0103L16.291 20.8203C16.481 20.7903 16.751 20.6603 16.881 20.5203L20.421 16.9803C21.031 16.3703 21.321 15.6603 20.421 14.7603C19.531 13.8703 18.821 14.1603 18.211 14.7703Z" stroke="#0C1441" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17.6992 15.2803C17.9992 16.3603 18.8392 17.2003 19.9192 17.5003" stroke="#0C1441" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="consent-page-dropdown-text"> Your Account Statements</div>
                            </div>
                            <svg class="consent-page-dropdown-arrow" :class="{ 'is-open': show_account_statements }" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" />
                            </svg>
                        </div>
                        <div v-if="show_account_statements" class="consent-page-dropdown-subtext-section">
                            <div class="consent-page-dropdown-subtext">{{ permissionDescriptions['ReadStatements'] }}</div>
                        </div>
                    </div>

                    <!-- Product -->
                    <div v-if="consent?.Permissions?.some(item => ['ReadProduct'].includes(item))"
                        class="consent-page-dropdown-container">
                        <div class="consent-page-dropdown" @click="show_product_info = !show_product_info">
                            <div class="consent-page-dropdown-text-section">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.9965 12H16.0054" stroke="#0C1441" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9955 12H12.0045" stroke="#0C1441" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.99451 12H8.00349" stroke="#0C1441" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="consent-page-dropdown-text"> Your Product Information</div>
                            </div>
                            <svg class="consent-page-dropdown-arrow" :class="{ 'is-open': show_product_info }" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" />
                            </svg>
                        </div>
                        <div v-if="show_product_info" class="consent-page-dropdown-subtext-section">
                            <div class="consent-page-dropdown-subtext">{{ permissionDescriptions['ReadProduct'] }}</div>
                        </div>
                    </div>

                    <!-- Parties -->
                    <div v-if="consent?.Permissions?.some(item => ['ReadPartyUser', 'ReadPartyUserIdentity', 'ReadParty'].includes(item))"
                        class="consent-page-dropdown-container">
                        <div class="consent-page-dropdown" @click="show_parties = !show_parties">
                            <div class="consent-page-dropdown-text-section">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 8.27V4.23C22 2.64 21.36 2 19.77 2H15.73C14.14 2 13.5 2.64 13.5 4.23V8.27C13.5 9.86 14.14 10.5 15.73 10.5H19.77C21.36 10.5 22 9.86 22 8.27Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 15.5H21" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M15 19.5H21" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                                <div class="consent-page-dropdown-text"> Contact and Party Details</div>
                            </div>
                            <svg class="consent-page-dropdown-arrow" :class="{ 'is-open': show_parties }" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" />
                            </svg>
                        </div>
                        <div v-if="show_parties" class="consent-page-dropdown-subtext-section">
                            <div v-if="consent?.Permissions?.includes('ReadPartyUserIdentity')" class="consent-page-dropdown-subtext">{{ permissionDescriptions['ReadPartyUserIdentity'] }}</div>
                            <div v-else-if="consent?.Permissions?.includes('ReadPartyUser')" class="consent-page-dropdown-subtext">{{ permissionDescriptions['ReadPartyUser'] }}</div>
                            <div v-else-if="consent?.Permissions?.includes('ReadParty')" class="consent-page-dropdown-subtext">{{ permissionDescriptions['ReadParty'] }}</div>
                        </div>
                    </div>

                    <!-- Finance Rates -->
                    <div v-if="consent?.Permissions?.some(item => ['ReadProductFinanceRates'].includes(item))"
                        class="consent-page-dropdown-container">
                        <div class="consent-page-dropdown" @click="show_finance_rates = !show_finance_rates">
                            <div class="consent-page-dropdown-text-section">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.57007 15.27L15.11 8.72998" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.98001 10.3699C9.65932 10.3699 10.21 9.81923 10.21 9.13992C10.21 8.46061 9.65932 7.90991 8.98001 7.90991C8.3007 7.90991 7.75 8.46061 7.75 9.13992C7.75 9.81923 8.3007 10.3699 8.98001 10.3699Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.52 16.0899C16.1993 16.0899 16.75 15.5392 16.75 14.8599C16.75 14.1806 16.1993 13.6299 15.52 13.6299C14.8407 13.6299 14.29 14.1806 14.29 14.8599C14.29 15.5392 14.8407 16.0899 15.52 16.0899Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="consent-page-dropdown-text"> Your Finance Rates</div>
                            </div>
                            <svg class="consent-page-dropdown-arrow" :class="{ 'is-open': show_finance_rates }" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.21967 13.4197C-0.0732232 13.7126 -0.0732232 14.1874 0.21967 14.4803C0.512563 14.7732 0.987437 14.7732 1.28033 14.4803L0.21967 13.4197ZM1.28033 0.219683C0.987437 -0.0732107 0.512563 -0.0732107 0.21967 0.219683C-0.0732232 0.512576 -0.0732232 0.987449 0.21967 1.28034L1.28033 0.219683ZM1.28033 14.4803L6.71366 9.04701L5.653 7.98635L0.21967 13.4197L1.28033 14.4803ZM6.71366 9.04701C7.64822 8.11245 7.64822 6.58757 6.71366 5.65302L5.653 6.71368C6.00178 7.06245 6.00178 7.63758 5.653 7.98635L6.71366 9.04701ZM6.71366 5.65302L1.28033 0.219683L0.21967 1.28034L5.653 6.71368L6.71366 5.65302Z" fill="black" fill-opacity="0.8" />
                            </svg>
                        </div>
                        <div v-if="show_finance_rates" class="consent-page-dropdown-subtext-section">
                            <div class="consent-page-dropdown-subtext">{{ permissionDescriptions['ReadProductFinanceRates'] }}</div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="consent-page-date-range">
                <svg class="consent-page-divider" width="292" height="2" viewBox="0 0 292 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="292" height="2" fill="#D9D9D9" fill-opacity="0.1" />
                </svg>
                <div class="consent-page-date">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink: 0; display: block; margin-top: 2px;">
                        <path d="M5.33301 1.33203V3.33203" stroke="#0C1441" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.667 1.33203V3.33203" stroke="#0C1441" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.33301 6.05859H13.6663" stroke="#0C1441" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z" stroke="#0C1441" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.4635 9.13411H10.4694" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.4635 11.1341H10.4694" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.99666 9.13411H8.00265" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.99666 11.1341H8.00265" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.52987 9.13411H5.53585" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.52987 11.1341H5.53585" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="consent-page-date-text-group">
                        <div class="consent-page-date-expiry-label">Connection valid until</div>
                        <div class="consent-page-date-2">
                            <div class="consent-page-date-text">
                                {{ formatDate(consent?.ExpirationDateTime) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.consent-page-text-frame-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 12px;
    gap: 12px;
    width: 316px;
    background: #FFFFFF;
    border-radius: 12px;
    flex: none;
    order: 2;
    flex-grow: 0;
}

.consent-page-text-inner-frame {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 26px;
    width: 292px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text-inner-frame-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 28px;
    width: 292px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text-mini-header-section {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    width: 292px;
    height: 23px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text-mini-header-section-header {
    width: 292px;
    height: 23px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #0C1441;
    flex: none;
    order: 0;
    flex-grow: 1;
}

.consent-page-text-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    width: 292px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-dropdown-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    width: 292px;
    flex: none;
    order: 5;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-dropdown {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 14px;
    cursor: pointer;
    width: 292px;
    height: 48px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-dropdown-text-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 6px;
    margin-right: auto;
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    width: 240.5px;
    height: 24px;
    flex: none;
    order: 0;
    flex-grow: 0;
}

.consent-page-dropdown-text {
    width: 200px;
    height: 14px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #0C1441;
    flex: none;
    order: 1;
    flex-grow: 0;
}

.consent-page-dropdown-arrow {
    margin-left: 0 auto;
    width: 7.41px;
    height: 14.7px;
    transform: matrix(1, 0, 0, -1, 0, 0);
    flex: none;
    order: 1;
    flex-grow: 0;
}

.consent-page-dropdown-arrow.is-open {
    transform: rotate(90deg);
}

.consent-page-dropdown-subtext-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    width: 292px;
    background: #F5F5FD;
    border-radius: 8px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-dropdown-subtext {
    width: 272px;
    display: flex;
    flex-direction: column;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 140%;
    letter-spacing: -0.01em;
    color: #667085;
    gap: 12px;
    flex: none;
    order: 0;
    flex-grow: 1;
}

.consent-page-date-range {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 292px;
    flex: none;
    order: 1;
    flex-grow: 0;
}

.consent-page-divider {
    width: 292px;
    height: 2px;
    background: rgba(217, 217, 217, 0.1);
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-date {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    width: 292px;
}

.consent-page-date-text-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.consent-page-date-expiry-label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 140%;
    letter-spacing: -0.01em;
    color: #8287A0;
}

.consent-page-date-2 {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    width: 292px;
    height: 14px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-date-text {
    width: 264px;
    height: 14px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #8287A0;
    flex: none;
    order: 0;
    flex-grow: 1;
}
</style>
