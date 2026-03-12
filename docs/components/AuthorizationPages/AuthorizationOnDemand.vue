<template>
    <div class="auth-page-frame">

        <div class="auth-page-header">
            <div class="auth-page-screen-name">
                <div class="auth-page-tpp-text">
                    LFI
                </div>

                <svg class="auth-page-arrow-left" width="11" height="18" viewBox="0 0 11 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41418 16.7071L1.41418 8.70711L9.41418 0.707108" stroke="white" stroke-width="2" />
                </svg>
                <div class="auth-page-rectangle">
                </div>

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
                        <div class="auth-page-progress-text">
                            Consent
                        </div>

                    </div>
                    <div class="auth-page-progress-2">
                        <div class="auth-page-progress-icon-active">
                            <div class="auth-page-progress-icon-text-active">
                                2
                            </div>
                        </div>
                        <div class="auth-page-progress-text">
                            Authorize
                        </div>
                    </div>
                    <div class="auth-page-progress-3">
                        <div class="auth-page-progress-icon">
                            <div class="auth-page-progress-icon-text">
                                3
                            </div>
                        </div>
                        <div class="auth-page-progress-text">
                            Complete
                        </div>
                    </div>
                    <svg class="auth-page-progress-line" width="222" height="2" viewBox="0 0 222 2" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H221.5" stroke="#D5D7E1" stroke-width="2" />
                        <path d="M0.5 1H168" stroke="#00C8AF" stroke-width="2" />
                    </svg>

                </div>
            </div>
        </div>
        <div class="auth-page-text-frame">
            <div class="auth-page-text-inner-frame">
                <div class="auth-page-text-header">
                    Flexi-Pay Setup
                    <div v-if="sharedState?.pii?.Initiation?.Creditor?.length" class="auth-page-text-header-sub">
                        [TPP trading name] needs your permission to make payment(s) from your account within the payment rules below:
                    </div>
                    <div v-else class="auth-page-text-header-sub">
                        [TPP trading name] needs your permission to make payments from your account under the rules below. They will process payments in line with your agreement and are responsible for selecting the beneficiaries.
                    </div>
                </div>
                <div class="auth-page-accounts-section">

                    <div class="auth-page-account-card">

                        <div v-if="sharedState?.pii?.Initiation?.Creditor?.length" class="auth-page-account-header-2">Who you’re paying</div>
                        <div v-else class="auth-page-account-header-2">Payment Details</div>


                        <div class="auth-page-account-subtext-container">



                                <template v-if="(sharedState?.pii?.Initiation?.Creditor?.length ?? 0) === 1">
                                    <div class="auth-page-account-subtext-container-2">
                                        <div class="auth-page-account-subtext-part">Payee Name</div>
                                        <div class="auth-page-account-amount-container">
                                            <div class="auth-page-account-amount">
                                                {{ sharedState?.pii?.Initiation?.Creditor?.[0]?.Creditor?.Name || sharedState?.pii?.Initiation?.Creditor?.[0]?.CreditorAccount?.Name?.en || sharedState?.pii?.Initiation?.Creditor?.[0]?.CreditorAccount?.Name?.ar }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="auth-page-account-subtext-container-2">
                                        <div class="auth-page-account-subtext-part">IBAN</div>
                                        <div class="auth-page-account-amount-container">
                                            <div class="auth-page-account-amount-iban">
                                                {{ sharedState?.pii?.Initiation?.Creditor?.[0]?.CreditorAccount?.Identification?.match(/.{1,4}/g)?.join(" ") }}
                                            </div>
                                        </div>
                                    </div>
                                </template>

                                <template v-else-if="(sharedState?.pii?.Initiation?.Creditor?.length ?? 0) > 1">
                                    <div class="benef-drop">
                                        <div class="benef-card">
                                            <div class="benef-drop-header" @click="benefListOpen = !benefListOpen">
                                                <span class="benef-drop-label">Beneficiary List</span>
                                                <svg class="benef-drop-arrow" :class="{ 'benef-drop-arrow-collapsed': !benefListOpen }" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;">
                                                    <path d="M1 1L7 6.5L1 12" stroke="#0C1441" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                            <div v-if="benefListOpen" class="benef-drop-items">
                                                <div v-for="(creditor, idx) in sharedState?.pii?.Initiation?.Creditor" :key="idx" class="benef-item">
                                                    <div class="benef-text-line benef-text-line-center">
                                                        <span class="benef-name">{{ creditor?.Creditor?.Name || creditor?.CreditorAccount?.Name?.en || creditor?.CreditorAccount?.Name?.ar }}</span>
                                                    </div>
                                                    <div class="benef-text-line">
                                                        <span class="benef-iban-label">IBAN</span>
                                                        <span class="benef-iban">{{ creditor?.CreditorAccount?.Identification?.match(/.{1,4}/g)?.join(" ") }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>


                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">Payment Reference</div>
                                <div class="auth-page-account-amount-container">
                                    <div class="auth-page-account-amount">
                                        {{sharedState?.value?.consent?.DebtorReference }}
                                    </div>

                                </div>

                            </div>



                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">Payment Purpose</div>
                                <div class="auth-page-account-amount-container">
                                    <div class="auth-page-account-amount">
                                        {{ getPurposeDescription(sharedState?.value?.consent?.PaymentPurposeCode) }}
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                                        <div  class="auth-page-account-card" >

                        <div class="auth-page-account-header-2">Payment rules</div>


                        <div class="auth-page-account-subtext-container">

                                                    <div class="auth-page-account-subtext-container-2">
                                    <div class="auth-page-account-subtext-part">First Payment Date</div>
                                        <div class="auth-page-account-amount">
                                            {{formatDate(sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.PeriodStartDate)}}
                                        </div>
                                </div>
                                                                <div class="auth-page-account-subtext-container-2">
                                    <div class="auth-page-account-subtext-part">Expiry Date</div>
                                        <div class="auth-page-account-amount">
                                            {{formatDate(sharedState?.value?.consent?.ExpirationDateTime)}}
                                        </div>
                                </div>

                                <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">{{ primaryAmountLabel }}</div>
 <div class="auth-page-account-amount-container">
                                    <DirhamAmount :amount="primaryAmount" />

                                </div>
                                
                                </div>


                                                                <div v-if="sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeNumberOfPayments" class="auth-page-account-subtext-container-2">
                                    <div class="auth-page-account-subtext-part">Total Number of Payments allowed</div>
 <div class="auth-page-account-amount-container">
                                    <div class="auth-page-account-amount">
                                        {{sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeNumberOfPayments }}
                                    </div>

                                </div>
                                </div>

                                                                                                <div v-if="sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeValueOfPayments" class="auth-page-account-subtext-container-2">
                                    <div class="auth-page-account-subtext-part">Total Value allowed</div>
<div class="auth-page-account-amount-container">
                                    <DirhamAmount :amount="sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.MaximumCumulativeValueOfPayments?.Amount" />

                                </div>
                                </div>

                                                                                                <div v-if="sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Controls?.MaximumCumulativeNumberOfPaymentsPerPeriod" class="auth-page-account-subtext-container-2">
                                    <div class="auth-page-account-subtext-part">Max Payments per {{sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.PeriodType }}</div>
 <div class="auth-page-account-amount-container">
                                    <div class="auth-page-account-amount">
                                        {{sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Controls?.MaximumCumulativeNumberOfPaymentsPerPeriod }}
                                    </div>

                                </div>
                                </div>


                                                                                                                                <div v-if="sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Controls?.MaximumCumulativeValueOfPaymentsPerPeriod?.Amount" class="auth-page-account-subtext-container-2">
                                    <div class="auth-page-account-subtext-part">Max Value per {{sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.PeriodType }}</div>
 <div class="auth-page-account-amount-container">
                                    <DirhamAmount :amount="sharedState?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule?.Controls?.MaximumCumulativeValueOfPaymentsPerPeriod?.Amount" />

                                </div>
                                </div>

                        </div>
                    </div>
                </div>

            </div>
            


        </div>



        <div  class="auth-page-text-frame">
            <div class="auth-page-text-inner-frame">
                <div class="auth-page-text-header">
                    {{ sharedState?.pii?.Initiation?.DebtorAccount?.Identification ? 'Account selected for the payment' : 'Please select the account to pay from' }}
                </div>
                <div class="auth-page-accounts-section">
                    <div v-if="sharedState?.pii?.Initiation?.DebtorAccount?.Identification" class="auth-page-account-card">
                        <div class="auth-page-account-title">
                            <div class="auth-page-account-title-text">
                                Current Account
                            </div>
                        </div>
                        <div class="auth-page-account-subtext-container">
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext">{{ sharedState?.pii?.Initiation?.DebtorAccount?.Identification?.match(/.{1,4}/g)?.join(" ") }}</div>
                            </div>
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">Balance</div>
                                <div class="auth-page-account-amount-container">
                                    <DirhamAmount amount="5,000" />
                                </div>
                            </div>
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">Overdraft</div>
                                <div class="auth-page-account-amount-container">
                                    <DirhamAmount amount="1,500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-else>
                    <div class="auth-page-account-card" style="cursor: pointer;" @click="selected = 'current_account'">
                        <div class="auth-page-account-title">
                            <div class="auth-page-account-title-text">
                                Current Account
                            </div>
                            <div class="auth-page-account-checkbox-2">
                                <div class="auth-page-account-checkbox-inactive-2" :class="{ 'is-active': selected === 'current_account' }">
                                    <div class="auth-page-account-checkbox-selected">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="auth-page-account-subtext-container">
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext">AE07 0331 2345 6123 4567 890</div>

                            </div>
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">Balance</div>
                                <div class="auth-page-account-amount-container">
                                    <DirhamAmount amount="5,000" />
                                </div>

                            </div>

                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">Overdraft</div>
                                <div class="auth-page-account-amount-container">
                                    <DirhamAmount amount="1,500" />
                                </div>

                            </div>

                        </div>
                    </div>

                    <div class="auth-page-account-card" style="cursor: pointer;" @click="selected = 'savings_account'">
                        <div class="auth-page-account-title">
                            <div class="auth-page-account-title-text">
                                Savings
                            </div>
                            <div class="auth-page-account-checkbox-2">
                                <div class="auth-page-account-checkbox-inactive-2" :class="{ 'is-active': selected === 'savings_account' }">
                                    <div class="auth-page-account-checkbox-selected">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="auth-page-account-subtext-container">
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext">AE07 0331 2345 6123 4567 891</div>

                            </div>
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">Balance</div>
                                <div class="auth-page-account-amount-container">
                                    <DirhamAmount amount="25,000" />

                                </div>

                            </div>


                        </div>
                    </div>

                    </template>
                </div>

            </div>



        </div>



        <div v-if="authPermissionText" class="auth-page-text-frame-2">
                <div class="auth-page-text-bottom">
                    {{ authPermissionText }}
                </div>
                </div>

        <!-- <div v-else class="auth-page-text-frame">
     <div class="auth-page-text-inner-frame">
                <div class="auth-page-text-header">
                    Something went wrong
                </div>
                <div class="auth-page-error-image-container">

                    <svg class="auth-page-error-image" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M44.9596 51.8971L32.2422 39.1797" stroke="black" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M44.8327 39.3086L32.1152 52.026" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.1143 19.2697H44.9602C51.3832 19.2697 51.3832 16.0582 51.3832 12.8468C51.3832 6.42383 48.1717 6.42383 44.9602 6.42383H32.1143C28.9029 6.42383 25.6914 6.42383 25.6914 12.8468C25.6914 19.2697 28.9029 19.2697 32.1143 19.2697Z" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M51.3839 12.9102C62.0781 13.4882 67.4412 17.4383 67.4412 32.1147V51.3836C67.4412 64.2294 64.2297 70.6524 48.1724 70.6524H28.9036C12.8462 70.6524 9.63477 64.2294 9.63477 51.3836V32.1147C9.63477 17.4704 14.9979 13.4882 25.6921 12.9102" stroke="#0C1441" stroke-width="2.06452" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </div>
                 <div class="auth-page-text">
                        We couldn’t find any accounts that match the data sharing request, so unfortunatley we’re unable to share any information with {{sharedState?.consent?.OnBehalfOf?.TradingName || '[TPP Trading Name]'}}.
                    </div>
            </div>
        </div> -->



        <div v-if="!sharedState?.consent?.AccountSubType || sharedState?.consent?.AccountSubType.includes('CurrentAccount') || sharedState?.consent?.AccountSubType.includes('Savings')" class="auth-page-button-with-description">
            <div class="auth-page-button">
                <div class="auth-page-button-text-section">
                    <svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none"
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

                    <div class="auth-page-button-text">
                        Authorize using AlTareq
                    </div>
                </div>
            </div>
            <div class="auth-page-button-cancel">
                <div class="auth-page-button-cancel-text">
                    Cancel
                </div>
            </div>
        </div>
     <div v-else class="auth-page-button-with-description">
                    <div class="auth-page-button">
                <div class="auth-page-button-text-section">
                    <svg class="auth-page-button-icon" width="22" height="23" viewBox="0 0 22 23" fill="none"
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

                    <div class="auth-page-button-text">
                        Close
                    </div>
                </div>
            </div>
            <div class="auth-page-button-description">
                By pressing Close you will be returned to {{ sharedState?.consent?.OnBehalfOf?.TradingName ||
                    '[TPP Trading Name]'}}. No data will be shared.
            </div>
        </div>




    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSharedState } from '../Composables/useSharedState.ts'
import { getPurposeDescription } from '../Composables/aaniPaymentCodes.ts'
import { formatDate } from '../Composables/formatDate.ts'
import { getAuthPaymentPermissionText } from '../Composables/serviceInitiationPermissionDescriptions.ts'
import DirhamAmount from '../ConsentPages/DirhamAmount.vue'

const { sharedState } = useSharedState()

const selected = ref(null)
const benefListOpen = ref(true)

const periodicSchedule = computed(() => sharedState?.value?.value?.consent?.ControlParameters?.ConsentSchedule?.MultiPayment?.PeriodicSchedule)
const primaryAmountLabel = computed(() => periodicSchedule.value?.Controls?.MaximumIndividualAmount ? 'Max per Payment' : 'Amount')
const primaryAmount = computed(() => periodicSchedule.value?.Controls?.MaximumIndividualAmount?.Amount ?? periodicSchedule.value?.Amount?.Amount)
const authPermissionText = computed(() =>
    getAuthPaymentPermissionText(sharedState?.value?.value?.consent?.Permissions)
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@100..900&display=swap');


.auth-page-frame {
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

.auth-page-header {
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

.auth-page-text-mini-header-section-header {
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




.auth-page-text-min-header-section-header-text {
    margin-right: auto;
    /* width: 215px; */
    height: 14px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    /* or 14px */
    letter-spacing: -0.01em;

    color: #36BFD4;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.auth-page-mini-header-icon {
    transform: rotate(-90deg);
    margin-left: auto;
    /* width: 7.41px;
height: 14.7px; */

    position: absolute;
    right: 0;
}

.auth-page-screen-name {
    width: 372px;
    height: 56px;


    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    position: relative;
}

.auth-page-account-header-2 {
    /* width: 272px;
height: 14px; */

font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 120%;
/* or 14px */
letter-spacing: -0.01em;

color: #0C1441;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
}

.auth-page-date-text {
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

.auth-page-dropdown-subtext-section {
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

.auth-page-dropdown-container {
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

.auth-page-dropdown-subtext {
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


.auth-page-tpp-text {
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


.auth-page-arrow-left {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 28px;
    top: calc(50% - 24px/2);
    z-index: 1;
}

.auth-page-rectangle {
    position: absolute;
    height: 56px;
    left: 0px;
    right: 0px;
    top: 0px;
    background: #FD6436;
}

.auth-page-contents {
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

.auth-page-logo {
    width: 114px;
    height: 42px;
    flex: none;
    order: 0;
    flex-grow: 0;
}

.auth-page-progress {
    width: 372px;
    height: 80px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    position: relative;
}

.auth-page-progress-3 {
    position: absolute;
    width: 61px;
    height: 42px;
    left: calc(50% - 61px/2 + 116.5px);
    top: 27px;
}

.auth-page-progress-2 {
    position: absolute;
    width: 61px;
    height: 42px;
    left: calc(50% - 61px/2 + 4.5px);
    top: 27px;
}

.auth-page-progress-1 {
    position: absolute;
    width: 61px;
    height: 42px;
    left: 39px;
    top: 27px;
}

.auth-page-progress-line {
    position: absolute;
    width: 222px;
    height: 3px;
    left: 80px;
    top: 37px;
}

.auth-page-progress-text {
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

.auth-page-progress-icon {
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

.auth-page-progress-icon-text {
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

.auth-page-progress-icon-active {
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

.auth-page-progress-icon-text-active {
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



.auth-page-text-frame {
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
    order: 1;
    flex-grow: 0;
}

.auth-page-text-inner-frame {
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

.auth-page-text-header {
    width: 292px;
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


.auth-page-text-bottom {
width: 292px;
/* height: 38px; */

font-family: 'Poppins';
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 160%;
/* or 19px */
padding-top: 2px;
color: #0C1441;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
}


.auth-page-text-header-sub {
width: 292px;

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 160%;
/* or 19px */
letter-spacing: -0.04em;

color: #0C1441;
margin-top: 10px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
}



.auth-page-text-section {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 10px;
    gap: 4px;

    width: 292px;
    /* height: 192px; */

    border-radius: 6px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-text {
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

.auth-page-text-frame-2 {
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

.auth-page-text-inner-frame-2 {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;

    width: 292px;
    /* height: 216px; */


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-text-mini-header-section {

    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 7px;

    width: 292px;
    height: 14px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}



.auth-page-text-mini-header {
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

.auth-page-dropdown {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 14px;

    width: 272px;
    height: 32px;
    cursor: pointer;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-dropdown-text-section {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 6px;

    margin: 0 auto;
    width: 240.5px;
    height: 18px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

}


.auth-page-dropdown-text {
    /* width: 120px; */
    height: 14px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    /* or 14px */
    letter-spacing: -0.01em;

    color: #0C1441;


    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;

}

.auth-page-button-with-description {
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

.auth-page-accounts-section {
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

.auth-page-account-card {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    gap: 10px;

    width: 292px;
    /* height: 112px; */
    /* cursor: pointer; */
    background: #F9F9FC;
    border-radius: 6px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-account-title {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    gap: 30px;

    width: 272px;
    height: 20px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-account-title-text {
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

.auth-page-account-checkbox {
    margin-right: 8px;
    width: 18px;
    height: 18px;


    /* Inside auto layout */
    position: relative;
    flex: none;
    flex-grow: 0;
}

.auth-page-account-checkbox-2 {
    margin-right: 8px;
    width: 20px;
    height: 20px;


    /* Inside auto layout */
    position: relative;
    flex: none;
    flex-grow: 0;
}

.auth-page-account-checkbox-inactive-2 {
    /* Check */

    box-sizing: border-box;

    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    border: 2px solid #8287A0;
    border-radius: 50%;
}

.auth-page-account-checkbox-inactive-2.is-active {
    border: 2px solid #FD6436;
}

.auth-page-warning {
/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 316px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
}


.auth-page-warning-text {
width: 280px;
/* height: 108px; */

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 150%;
/* or 18px */
letter-spacing: -0.01em;

color: #FD6436;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;

}


.auth-page-account-checkbox-inactive-2.is-active .auth-page-account-checkbox-selected {
position: absolute;
width: 10px;
height: 10px;
  border: 2px solid #FD6436;
  background: #FD6436;
      border-radius: 50%;
      left: calc(50% - 5px);
      top: calc(50% - 5px);
}

.auth-page-error-image-container {
    width: 292px;
}

.auth-page-error-image {
    margin: auto
}

.auth-page-account-checkbox-inactive {
    /* Check */

    box-sizing: border-box;

    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #FFFFFF;
    border: 2px solid #D5D7E1;
    border-radius: 6px;
}

.auth-page-account-checkbox-inactive.is-active {
    background: #36BFD4;
    border: 2px solid #36BFD4;
}

.auth-page-account-checkbox-check {
position: absolute;
left: 10%;
top: 20%;
}


.auth-page-account-subtext-container {
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

.auth-page-account-subtext-container-2 {

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    /* gap: 142px; */

    width: 272px;
    /* height: 14px; */


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-account-subtext {
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

.auth-page-account-subtext-part {
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

.auth-page-account-amount-container {
   font-size: 12px;
   font-weight: 400;
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

.auth-page-account-amount-dirham {
    /* Dirham Symbol */

    width: 13px;
    height: 10px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

}

.auth-page-account-amount {
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
    letter-spacing: -0.01em;

    color: #616786;


    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}

.auth-page-account-amount-iban {
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

.auth-page-button {
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

.auth-page-date-range {
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


.auth-page-date-3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;

    width: 292px;
    height: 16px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-date-text {
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

.auth-page-button-description {
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



.auth-page-dropdown-arrow {
    margin-left: auto;
    width: 5px;
    height: 10px;

    /* background: rgba(0, 0, 0, 0.4); */
    transform: matrix(1, 0, 0, -1, 0, 0);

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;

}

.auth-page-mini-header-icon.is-open {
    transform: rotate(0deg);
}

.auth-page-dropdown-arrow.is-open {
    transform: rotate(90deg);
}

.auth-page-button-text-section {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;

    height: 22px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.auth-page-divider {
    width: 292px;
    height: 2px;

    background: rgba(217, 217, 217, 0.1);

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

}

.auth-page-date {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;

    width: 292px;



    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-button-cancel {
    box-sizing: border-box;
    cursor: pointer;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 14px;
    gap: 10px;

    width: 316px;
    height: 48px;

    border: 2px solid transparent;
    border-radius: 64px;

    background:
        linear-gradient(white, white) padding-box,
        linear-gradient(90deg, #000000 0%, #005AD7 50%, #00C8AF 100%) border-box;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-button-cancel-text {

    width: 48px;
    height: 14px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    /* identical to box height, or 14px */
    letter-spacing: -0.03em;

    color: #0C1441;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.auth-page-date-2 {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;

    width: 292px;
    height: 14px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.auth-page-button-text {
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

.auth-page-button-icon {
    width: 22px;
    height: 22px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.auth-page-why-text {
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

.auth-page-no-creditor-text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 160%;
    letter-spacing: -0.01em;
    color: #616786;
    width: 272px;
}

.benef-drop {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
    width: 272px;
}

.benef-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    width: 272px;
    align-self: stretch;
    margin-bottom: 10px;
}

.benef-drop-header {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    gap: 14px;
    width: 272px;
    height: 34px;
    align-self: stretch;
}

.benef-drop-label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #616786;
}

.benef-drop-arrow {
    transition: transform 0.2s ease;
    transform: rotate(90deg);
}

.benef-drop-arrow-collapsed {
    transform: rotate(0deg);
}

.benef-drop-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    width: 272px;
    align-self: stretch;
}

.benef-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    width: 272px;
    align-self: stretch;
}

.benef-text-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    width: 272px;
    align-self: stretch;
}

.benef-text-line-center {
    align-items: center;
}

.benef-name {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #616786;
}

.benef-iban-label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    letter-spacing: -0.01em;
    color: #616786;
}

.benef-iban {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    text-align: right;
    letter-spacing: -0.01em;
    color: #616786;
}
</style>



