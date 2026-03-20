<template>
    <div class="consent-page-frame">

        <div class="consent-page-header">
            <div class="consent-page-screen-name">
                <div class="consent-page-tpp-text">
                    TPP
                </div>

                <svg class="consent-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" />
                </svg>
                <div class="consent-page-rectangle">
                </div>

            </div>
            <div class="consent-page-contents">
                <img class="consent-page-logo" src="/images/journeys/ConsentPages/AlTareq.png" alt="AlTareq logo" />
                <div class="consent-page-progress">
                    <div class="consent-page-progress-1">
                        <div class="consent-page-progress-icon-active">
                            <div class="consent-page-progress-icon-text-active">
                                1
                            </div>
                        </div>
                        <div class="consent-page-progress-text">
                            Consent
                        </div>

                    </div>
                    <div class="consent-page-progress-2">
                        <div class="consent-page-progress-icon">
                            <div class="consent-page-progress-icon-text">
                                2
                            </div>
                        </div>
                        <div class="consent-page-progress-text">
                            Authorize
                        </div>
                    </div>
                    <div class="consent-page-progress-3">
                        <div class="consent-page-progress-icon">
                            <div class="consent-page-progress-icon-text">
                                3
                            </div>
                        </div>
                        <div class="consent-page-progress-text">
                            Complete
                        </div>
                    </div>
                    <svg class="consent-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" />
                        <path d="M0.5 1H53.5" stroke="#00C8AF" stroke-width="2" />
                    </svg>

                </div>
            </div>
        </div>
        <div class="consent-page-text-frame">
            <div class="consent-page-text-inner-frame">
                <div class="consent-page-text-header">
                    Permission to make payment(s)
                </div>
                <div class="consent-page-text-section">
                    <div class="consent-page-text">
                       To make payments from your bank, we need your permission to securely initiate the payment(s)
                    </div>


                                    <div class="consent-page-text-inner-frame-2">
                    <div class="consent-page-text-mini-header-section">
                        <div class="consent-page-text-mini-header-section-header"
                            @click="show_payment_setup = !show_payment_setup">
                            <div class="consent-page-text-min-header-section-header-text">
                                Payment setup
                            </div>
                            <svg class="consent-page-mini-header-icon" :class="{ 'is-open': show_payment_setup }" width="15"
                                height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z"
                                    fill="#36BFD4" />
                            </svg>

                        </div>

                    </div>
                                                    <div v-if="show_payment_setup" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">Payment to</div>
                                        <div class="consent-page-account-amount">
                                            {{ sharedState?.pii?.Initiation?.Creditor?.[0]?.Creditor?.Name || sharedState?.pii?.Initiation?.Creditor?.[0]?.CreditorAccount?.Name?.en || sharedState?.pii?.Initiation?.Creditor?.[0]?.CreditorAccount?.Name?.ar }}
                                        </div>
                                </div>
                                                                <div v-if="show_payment_setup" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">Reference</div>
                                        <div class="consent-page-account-amount">
                                            {{sharedState?.value?.consent?.DebtorReference }}
                                        </div>
                                </div>

                                <div v-if="show_payment_setup" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">Payment Purpose</div>
                                        <div class="consent-page-account-amount">
                                             {{ getPurposeDescription(sharedState?.value?.consent?.PaymentPurposeCode) }}
                                        </div>
                                </div>

                </div>


                                                    <div class="consent-page-text-inner-frame-2">
                    <div class="consent-page-text-mini-header-section">
                        <div class="consent-page-text-mini-header-section-header"
                            @click="show_payment_rules = !show_payment_rules">
                            <div class="consent-page-text-min-header-section-header-text">
                                Payment rules
                            </div>
                            <svg class="consent-page-mini-header-icon" :class="{ 'is-open': show_payment_rules }" width="15"
                                height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z"
                                    fill="#36BFD4" />
                            </svg>

                        </div>

                    </div>


                                <div v-if="show_payment_rules" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">{{ primaryAmountLabel }}</div>
 <DirhamAmount style="font-weight: 300;" :amount="primaryAmount" />
                                
                                </div>

                                                    <div v-if="show_payment_rules" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">First Payment Date</div>
                                        <div class="consent-page-account-amount">
                                            {{formatDate(sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.PeriodStartDate)}}
                                        </div>
                                </div>

                                                    <div v-if="show_payment_rules" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">Payments Repeat every</div>
                                        <div class="consent-page-account-amount">
                                            {{sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.PeriodType}}
                                        </div>
                                </div>

                                                                <div v-if="show_payment_rules" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">Expiry Date</div>
                                        <div class="consent-page-account-amount">
                                            {{formatDate(sharedState?.value?.consent?.ExpirationDateTime)}}
                                        </div>
                                </div>




                                                                <div v-if="show_payment_rules && sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeNumberOfPayments" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">Total Number of Payments allowed</div>
 <div class="consent-page-account-amount-container">
                                    <div class="consent-page-account-amount">
                                        {{sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeNumberOfPayments }}
                                    </div>

                                </div>
                                </div>

                                                                                                <div v-if="show_payment_rules && sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeValueOfPayments" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part">Total Value allowed</div>
 <DirhamAmount style="font-weight: 300;" :amount="sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeValueOfPayments?.Amount" />
                                </div>


                </div>


      <div class="consent-page-text-inner-frame-2">
                    <div class="consent-page-text-mini-header-section">
                        <div class="consent-page-text-mini-header-section-header"
                            @click="show_from_account = !show_from_account">
                            <div class="consent-page-text-min-header-section-header-text">
                               From account
                            </div>
                            <svg class="consent-page-mini-header-icon" :class="{ 'is-open': show_from_account }" width="15"
                                height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z"
                                    fill="#36BFD4" />
                            </svg>

                        </div>

                    </div>

                                                    <template v-if="show_from_account">
                                    <div class="consent-page-account-subtext-container-2">
                                        <div class="consent-page-account-subtext-part">Bank</div>
                                        <div class="consent-page-account-amount">
                                            [Your LFI]
                                        </div>
                                    </div>
                                    <div v-if="sharedState?.pii?.Initiation?.DebtorAccount?.Name?.en || sharedState?.pii?.Initiation?.DebtorAccount?.Name?.ar" class="consent-page-account-subtext-container-2">
                                        <div class="consent-page-account-subtext-part">Payer Name</div>
                                        <div class="consent-page-account-amount">
                                            {{ sharedState?.pii?.Initiation?.DebtorAccount?.Name?.en || sharedState?.pii?.Initiation?.DebtorAccount?.Name?.ar }}
                                        </div>
                                    </div>
                                    <div v-if="sharedState?.pii?.Initiation?.DebtorAccount?.Identification" class="consent-page-account-subtext-container-2">
                                        <div class="consent-page-account-subtext-part">IBAN</div>
                                        <div class="consent-page-account-amount-iban">
                                            {{ sharedState?.pii?.Initiation?.DebtorAccount?.Identification?.match(/.{1,4}/g)?.join(" ") }}
                                        </div>
                                    </div>
                                </template>

                </div>


                                                    <div class="consent-page-text-inner-frame-2">
                    <div class="consent-page-text-mini-header-section">
                        <div class="consent-page-text-mini-header-section-header"
                            @click="show_to_account = !show_to_account">
                            <div class="consent-page-text-min-header-section-header-text">
                               To account
                            </div>
                            <svg class="consent-page-mini-header-icon" :class="{ 'is-open': show_to_account }" width="15"
                                height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z"
                                    fill="#36BFD4" />
                            </svg>

                        </div>

                    </div>

 
                                <template v-if="show_to_account && (sharedState?.pii?.Initiation?.Creditor?.length ?? 0) === 1">
                                    <div class="consent-page-account-subtext-container-2">
                                        <div class="consent-page-account-subtext-part">Payee Name</div>
                                        <div class="consent-page-account-amount">
                                            {{ sharedState?.pii?.Initiation?.Creditor?.[0]?.Creditor?.Name || sharedState?.pii?.Initiation?.Creditor?.[0]?.CreditorAccount?.Name?.en || sharedState?.pii?.Initiation?.Creditor?.[0]?.CreditorAccount?.Name?.ar }}
                                        </div>
                                    </div>
                                    <div class="consent-page-account-subtext-container-2">
                                        <div class="consent-page-account-subtext-part">IBAN</div>
                                        <div class="consent-page-account-amount-iban">
                                            {{ sharedState?.pii?.Initiation?.Creditor?.[0]?.CreditorAccount?.Identification?.match(/.{1,4}/g)?.join(" ") }}
                                        </div>
                                    </div>
                                </template>

                                <template v-else-if="show_to_account && (sharedState?.pii?.Initiation?.Creditor?.length ?? 0) > 1">
                                    <div v-for="(creditor, idx) in sharedState?.pii?.Initiation?.Creditor" :key="idx" class="consent-page-account-subtext-container-2" style="flex-direction: column; align-items: flex-start; gap: 4px; padding-bottom: 8px;">
                                        <div style="font-size: 12px; color: #1a202c;">
                                            {{ creditor?.Creditor?.Name || creditor?.CreditorAccount?.Name?.en || creditor?.CreditorAccount?.Name?.ar }}
                                        </div>
                                        <div class="consent-page-account-subtext-container-2" style="width: 100%; margin-top: 2px;">
                                            <div class="consent-page-account-subtext-part">IBAN</div>
                                            <div class="consent-page-account-amount-iban">
                                                {{ creditor?.CreditorAccount?.Identification?.match(/.{1,4}/g)?.join(" ") }}
                                            </div>
                                        </div>
                                    </div>
                                </template>

                </div>


                                                                    <div class="consent-page-text-inner-frame-2">
                    <div class="consent-page-text-mini-header-section">
                        <div class="consent-page-text-mini-header-section-header"
                            @click="show_terms = !show_terms">
                            <div class="consent-page-text-min-header-section-header-text">
                               Terms
                            </div>
                            <svg class="consent-page-mini-header-icon" :class="{ 'is-open': show_terms }" width="15"
                                height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.28033 0.21967C0.987438 -0.0732232 0.512563 -0.0732232 0.21967 0.21967C-0.0732235 0.512563 -0.0732235 0.987437 0.21967 1.28033L1.28033 0.21967ZM14.4803 1.28033C14.7732 0.987437 14.7732 0.512563 14.4803 0.21967C14.1874 -0.0732226 13.7126 -0.0732226 13.4197 0.21967L14.4803 1.28033ZM0.21967 1.28033L5.653 6.71366L6.71366 5.653L1.28033 0.21967L0.21967 1.28033ZM5.653 6.71366C6.58756 7.64822 8.11244 7.64822 9.047 6.71366L7.98634 5.653C7.63756 6.00178 7.06244 6.00178 6.71366 5.653L5.653 6.71366ZM9.047 6.71366L14.4803 1.28033L13.4197 0.21967L7.98634 5.653L9.047 6.71366Z"
                                    fill="#36BFD4" />
                            </svg>

                        </div>

                    </div>

                                                    <div v-if="show_terms" class="consent-page-account-subtext-container-2">
                                    <div class="consent-page-account-subtext-part" style="height: auto; width: 292px;">The terms vary by the Third Party Provider (TPP) and their use case. The terms govern their access to your account.</div>
                                </div>

                </div>


                </div>

            </div>


        </div>



                <PaymentConsentPermissionsText />


        <div class="consent-page-button-with-description">
            <div class="consent-page-button">
                <div class="consent-page-button-text-section">
                    <svg class="consent-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 0C4.92501 0 0 4.93861 0 11.0306C0 17.1225 4.92501 22.0611 11 22.0611C17.075 22.0611 22 17.1225 22 11.0306C22 4.93861 17.075 0 11 0Z"
                            fill="white" />
                        <path
                            d="M14.8042 14.8454H7.19727V7.21704H14.8056V14.8454H14.8042ZM8.95837 13.078H13.0417V8.98435H8.95837V13.078Z"
                            fill="url(#paint0_linear_2_496)" />
                        <path
                            d="M5.4292 5.44275V16.6169H16.5723V5.44275H5.4292ZM14.8042 14.8454H7.19727V7.2171H14.8056V14.8454H14.8042Z"
                            fill="url(#paint1_linear_2_496)" />
                        <path
                            d="M3.66125 3.6698V18.3899H18.3404V3.6698H3.66125ZM16.5724 16.6183H5.42793V5.44416H16.5724V16.6183Z"
                            fill="url(#paint2_linear_2_496)" />
                        <path d="M22 22.0611L13.0416 13.0781H8.95831L17.9166 22.0611H22Z"
                            fill="url(#paint3_radial_2_496)" />
                        <defs>
                            <linearGradient id="paint0_linear_2_496" x1="7.02442" y1="10.9465" x2="14.6294" y2="10.9465"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4083E1" />
                                <stop offset="0.08" stop-color="#3E8BDD" />
                                <stop offset="0.48" stop-color="#36B1CC" />
                                <stop offset="0.8" stop-color="#31C9C1" />
                                <stop offset="1" stop-color="#30D2BE" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_2_496" x1="5.42781" y1="11.0305" x2="16.5723" y2="11.0305"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#80ACEB" />
                                <stop offset="0.3" stop-color="#7BC0E1" />
                                <stop offset="0.73" stop-color="#76D8D7" />
                                <stop offset="1" stop-color="#75E1D4" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_2_496" x1="3.65987" y1="11.0305" x2="18.3404" y2="11.0305"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#BFD6F5" />
                                <stop offset="0.55" stop-color="#BBE7ED" />
                                <stop offset="1" stop-color="#BAF0E9" />
                            </linearGradient>
                            <radialGradient id="paint3_radial_2_496" cx="0" cy="0" r="1"
                                gradientTransform="matrix(9.09232 8.98302 -65.3309 67.979 10.8846 13.0781)"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#40E0C7" />
                                <stop offset="0.304248" stop-color="#0050C8" />
                                <stop offset="0.623256" stop-color="white" />
                            </radialGradient>
                        </defs>
                    </svg>

                    <div class="consent-page-button-text">
                        Authorize using AlTareq
                    </div>
                </div>
            </div>
            <div class="consent-page-button-description">
                We will securely transfer you to [YOUR LFI] to authorize and set up the payment
            </div>
        </div>



    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSharedState } from '../Composables/useSharedState.ts'
import { getPurposeDescription } from '../Composables/aaniPaymentCodes.ts'
import { formatDate } from '../Composables/formatDate.ts'
import DirhamAmount from './DirhamAmount.vue'

const { sharedState } = useSharedState()

const show_payment_setup = ref(true)
const show_payment_rules = ref(true)
const show_from_account = ref(true)
const show_to_account = ref(true)
const show_terms = ref(false)
const periodicSchedule = computed(() => sharedState?.value?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule)
const primaryAmountLabel = computed(() => periodicSchedule.value?.MaximumIndividualAmount ? 'Max per Payment' : 'Amount')
const primaryAmount = computed(() => periodicSchedule.value?.MaximumIndividualAmount?.Amount ?? periodicSchedule.value?.Amount?.Amount)

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&display=swap');


.consent-page-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 24px;
    zoom: 0.6;

    width: 372px;
    /* height: 1023px; */

    background: #F4F8FB;

    flex: none;
    order: 1;
    flex-grow: 0;
    position: relative;
}

.consent-page-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;

    width: 372px;
    height: 218px;


    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    position: relative;
}

.consent-page-mini-header-icon.is-open {
    transform: rotate(0deg);
}

.consent-page-dropdown-arrow.is-open {
    transform: rotate(90deg);
}


.consent-page-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;

    width: 372px;
    height: 218px;


    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    position: relative;
}

.consent-page-text-mini-header-section-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 142px;
    cursor: pointer;
    width: 292px;
    height: 14px;
    position: relative;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}




.consent-page-text-min-header-section-header-text {
    margin-right: auto;
    /* width: 215px; */
    height: 14px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 120%;
    /* or 14px */
    letter-spacing: -0.01em;

    color: #36BFD4;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.consent-page-mini-header-icon {
    transform: rotate(-90deg);
    margin-left: auto;
    /* width: 7.41px;
height: 14.7px; */

    position: absolute;
    right: 0;
}

.consent-page-screen-name {
    width: 372px;
    height: 56px;


    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    position: relative;
}

.consent-page-date-text {
    width: 292px;
    height: 34px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 140%;
    /* or 17px */
    letter-spacing: -0.01em;

    color: #000000;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

}

.consent-page-dropdown-subtext-section {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;

    width: 272px;
    /* height: 146px; */

    background: #F5F5FD;
    border-radius: 8px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-dropdown-container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 2px;

    width: 272px;
    /* height: 32px; */


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

}

.consent-page-dropdown-subtext {
    width: 252px;
    display: flex;
    flex-direction: column;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 140%;
    /* or 14px */
    letter-spacing: -0.01em;

    color: #667085;
    gap: 12px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;
}



.consent-page-text-mini-header-section-header {
    width: 292px;
    height: 23px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 120%;
    /* identical to box height, or 23px */
    letter-spacing: -0.01em;

    color: #0C1441;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;

}


.consent-page-screen-name {
    width: 372px;
    height: 56px;


    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    position: relative;
}

.consent-page-dropdown-subtext-section {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;

    width: 292px;
    /* height: 146px; */

    background: #F5F5FD;
    border-radius: 8px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-dropdown-container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    /* gap: 10px; */

    width: 292px;


    /* Inside auto layout */
    flex: none;
    order: 5;
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
    /* or 14px */
    letter-spacing: -0.01em;

    color: #667085;
    gap: 12px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;
}


.consent-page-tpp-text {
    position: absolute;
    width: 48px;
    height: 32px;
    left: calc(50% - 48px/2);
    top: 12px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 124%;
    /* or 32px */
    text-align: center;

    color: #FBFBFF;
    z-index: 1;
}


.consent-page-arrow-left {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 28px;
    top: calc(50% - 24px/2);
    z-index: 1;
}

.consent-page-rectangle {
    position: absolute;
    height: 56px;
    left: 0px;
    right: 0px;
    top: 0px;
    background: #36BFD4;
}

.consent-page-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px 0px;

    width: 372px;
    height: 162px;

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-logo {
    width: 114px;
    height: 42px;
    flex: none;
    order: 0;
    flex-grow: 0;
}

.consent-page-progress {
    width: 372px;
    height: 80px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    position: relative;
}

.consent-page-progress-3 {
    position: absolute;
    width: 61px;
    height: 42px;
    left: calc(50% - 61px/2 + 116.5px);
    top: 27px;
}

.consent-page-progress-2 {
    position: absolute;
    width: 61px;
    height: 42px;
    left: calc(50% - 61px/2 + 4.5px);
    top: 27px;
}

.consent-page-progress-1 {
    position: absolute;
    width: 61px;
    height: 42px;
    left: 39px;
    top: 27px;
}

.consent-page-progress-line {
    position: absolute;
    width: 222px;
    height: 3px;
    left: 80px;
    top: 37px;
}

.consent-page-progress-text {
    position: absolute;
    left: 6.56%;
    right: 6.56%;
    top: 66.67%;
    bottom: 4.76%;

    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    /* identical to box height, or 12px */
    text-align: center;

    color: #515151;
}

.consent-page-progress-icon {
    box-sizing: border-box;

    position: absolute;
    width: 22px;
    height: 22px;
    left: calc(50% - 22px/2 - 0.5px);
    top: 0px;
    z-index: 1;
    background: #FFFFFF;
    border: 2px solid #B2B2B2;
    border-radius: 30px;
}

.consent-page-progress-icon-text {
    position: absolute;
    width: 7px;
    height: 12px;
    left: calc(50% - 7px/2 + 0.5px);
    top: calc(50% - 12px/2);

    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    /* identical to box height, or 12px */
    text-align: center;

    color: #515151;
}

.consent-page-progress-icon-active {
    box-sizing: border-box;

    position: absolute;
    width: 22px;
    height: 22px;
    left: calc(50% - 22px/2 - 0.5px);
    top: 0px;
    z-index: 1;
    background: #00C8AF;
    border: 2px solid #00C8AF;
    border-radius: 30px;
}

.consent-page-progress-icon-text-active {
    position: absolute;
    width: 7px;
    height: 12px;
    left: calc(50% - 7px/2 + 0.5px);
    top: calc(50% - 12px/2);

    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    /* identical to box height, or 12px */
    text-align: center;

    color: white;
}

.consent-page-account-amount-container {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 4px;

    margin-left: auto;
    height: 14px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}


.consent-page-accounts-section {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;

    width: 292px;
    /* height: 336px; */


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-account-card {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    gap: 10px;

    width: 292px;
    /* height: 112px; */
    background: #F9F9FC;
    border-radius: 6px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text-bottom {
width: 292px;
/* height: 38px; */

font-family: 'Poppins';
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 160%;
/* or 19px */

color: #0C1441;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
}

.consent-page-account-title {
    /* Frame 787880425 */

    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 272px;
    gap: 14px;

    width: 272px;
    height: 40px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

}

.consent-page-account-title-icon {
    /* Frame 787880425 */

    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 14px;
    height: 40px;
    width: 272px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

}

.consent-page-account-title-icon-2 {
    width: 40px;
    height: 40px;
    z-index: 1;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.consent-page-account-title-icon-3 {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 10px;
    top: 7px;
}

.consent-page-account-title-elipse {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 0px;
    top: 0px;

    background: #35BFD4;
    border-radius: 50%;
}

.consent-page-account-title-text {
    /* Current Account */

    margin-left: 0;
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 0;
    width: 113px;
    height: 17px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 120%;
    /* identical to box height, or 17px */
    letter-spacing: -0.01em;

    color: #0C1441;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.consent-page-title-text-2 {
    /* Auto layout */
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 4px;

    height: 14px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}


.consent-page-account-subtext-container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;

    width: 272px;
    /* height: 62px; */


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-account-subtext-container-2 {
   font-size: 12px;
   font-weight: 400;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;

    /* width: 272px; */
    /* height: 14px; */


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-account-subtext {
    margin: 0 auto;
    width: 272px;
    /* height: 14px; */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    /* or 14px */
    letter-spacing: -0.01em;

    color: #616786;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;
}

.consent-page-account-subtext-part {
    margin-right: auto;
    /* width: 48px; */
    height: 14px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    /* or 14px */
    letter-spacing: -0.01em;

    color: #616786;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.consent-page-account-amount {
margin-left: auto;
max-width: 140px;
 white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
height: 14px;

font-family: 'Poppins';
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 120%;
/* or 14px */
text-align: right;
letter-spacing: -0.01em;

color: #616786;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
}

.consent-page-account-amount-iban {
margin-left: auto;
max-width: 180px;
 white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
height: 14px;

font-family: 'Poppins';
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 120%;
/* or 14px */
text-align: right;
letter-spacing: -0.01em;

color: #616786;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

}

.consent-page-text-frame {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 12px;
    gap: 26px;

    width: 316px;
    /* height: 182px; */

    background: #FFFFFF;
    border-radius: 12px;

    /* Inside auto layout */
    flex: none;
    flex-grow: 0;
}

.consent-page-text-inner-frame {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 26px;

    width: 292px;
    /* height: 150px; */

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text-header {
    width: 292px;
    height: 23px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 18.5px;
    line-height: 120%;
    letter-spacing: -0.01em;

    color: #0C1441;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;

    width: 292px;
    /* height: 101px; */

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text {
    width: 292px;
    height: 57px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 160%;
    color: #0C1441;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text-frame-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 12px;
    gap: 12px;

    width: 316px;
    /* height: 405px; */

    background: #FFFFFF;
    border-radius: 12px;

    /* Inside auto layout */
    flex: none;
    order: 2;
    flex-grow: 0;
}

.consent-page-text-inner-frame-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;

    width: 292px;
    /* height: 307px; */


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


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-text-mini-header {
    width: 292px;
    height: 23px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 120%;
    /* identical to box height, or 23px */
    letter-spacing: -0.01em;

    color: #0C1441;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;
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


    /* Inside auto layout */
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
    /* or 14px */
    letter-spacing: -0.01em;

    color: #0C1441;

    flex: none;
    order: 1;
    flex-grow: 0;
}

.consent-page-button-with-description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 28px 30px;
    gap: 10px;

    width: 372px;
    height: 146px;

    border-radius: 0px;

    flex: none;
    order: 3;
    flex-grow: 0;
}

.consent-page-button {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 10px 20px;
    cursor: pointer;
    width: 316px;
    height: 48px;

    /* Button Grad */
    background: linear-gradient(84.64deg, #00C8AF 0%, #015AD7 41.05%, #000000 82.6%);
    border-radius: 66px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-date-range {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;

    width: 292px;
    height: 54px;


    /* Inside auto layout */
    flex: none;
    order: 1;
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
    /* or 14px */
    letter-spacing: -0.01em;

    color: #8287A0;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;

}

.consent-page-button-description {
    margin: 0px;
    width: 316px;
    height: 38px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 160%;
    /* or 19px */

    color: #0C1441;


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}



.consent-page-dropdown-arrow {
    margin-left: 0 auto;
    width: 7.41px;
    height: 14.7px;

    /* background: rgba(0, 0, 0, 0.8); */
    transform: matrix(1, 0, 0, -1, 0, 0);

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}

.consent-page-dropdown-arrow.is-open {
    transform: rotate(90deg);
}

.consent-page-button-text-section {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;

    /* width: 186px; */
    height: 22px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.consent-page-divider {
    width: 292px;
    height: 2px;

    background: rgba(217, 217, 217, 0.1);

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

}

.consent-page-date {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;

    width: 292px;
    height: 40px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-date-2 {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 0px 0px 28px;
    gap: 10px;

    width: 292px;
    height: 14px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.consent-page-button-text {
    /* width: 154px; */
    height: 17px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    /* identical to box height, or 17px */
    letter-spacing: -0.01em;

    color: #FFFFFF;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}

.consent-page-button-icon {
    width: 22px;
    height: 22px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.consent-page-why-text {
    margin-right: auto;
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    width: 218px;
    height: 14px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 120%;
    /* or 14px */
    letter-spacing: -0.01em;

    color: #0C1441;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}
</style>
