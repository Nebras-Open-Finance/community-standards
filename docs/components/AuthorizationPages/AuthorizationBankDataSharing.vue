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
        <div v-if="visibleAccounts.length > 0" class="auth-page-text-frame">
            <div class="auth-page-text-inner-frame">
                <div class="auth-page-text-header">
                    Select account(s) to share information with {{ sharedState?.value?.consent?.OnBehalfOf?.TradingName ||
                    '[TPP Trading Name]'}}
                </div>
                <div class="auth-page-accounts-section">
                    <div v-for="account in visibleAccounts" :key="account.id" class="auth-page-account-card" @click="toggleSelected(account.id)">
                        <div class="auth-page-account-title">
                            <div class="auth-page-account-title-text">{{ typeLabel(account) }}</div>
                            <div class="auth-page-account-checkbox">
                                <div class="auth-page-account-checkbox-inactive" :class="{ 'is-active': selectedAccounts[account.id] }">
                                    <svg class="auth-page-account-checkbox-check" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16667 8.68333L0 4.51667L1.175 3.34167L4.16667 6.325L10.4917 0L11.6667 1.18333L4.16667 8.68333Z" fill="white"/></svg>
                                </div>
                            </div>
                        </div>
                        <div class="auth-page-account-subtext-container">
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext">{{ getAccountRef(account) }}</div>
                            </div>
                            <div class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">{{ balanceLabel(account.type) }}</div>
                                <div class="auth-page-account-amount-container">
                                    <DirhamAmount
                                        v-if="!currencySymbol(account)"
                                        :amount="account.balance?.toLocaleString ? account.balance.toLocaleString() : account.balance"
                                    />
                                    <template v-else>
                                        <span class="auth-page-account-currency-symbol">{{ currencySymbol(account) }}</span>
                                        <div class="auth-page-account-amount">{{ account.balance.toLocaleString() }}</div>
                                    </template>
                                </div>
                            </div>
                            <div v-if="account.secondary != null" class="auth-page-account-subtext-container-2">
                                <div class="auth-page-account-subtext-part">{{ secondaryLabel(account.type) }}</div>
                                <div class="auth-page-account-amount-container">
                                    <DirhamAmount
                                        v-if="!currencySymbol(account)"
                                        :amount="account.secondary?.toLocaleString ? account.secondary.toLocaleString() : account.secondary"
                                    />
                                    <template v-else>
                                        <span class="auth-page-account-currency-symbol">{{ currencySymbol(account) }}</span>
                                        <div class="auth-page-account-amount">{{ account.secondary.toLocaleString() }}</div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="auth-page-text-inner-frame-2">
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
                    <div v-if="show_information" class="auth-page-text-section">

                        <div v-if="sharedState?.value?.consent?.Permissions.some(item => ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances'].includes(item))"
                            class="auth-page-dropdown-container">
                            <div class="auth-page-dropdown" @click="show_account_details = !show_account_details">
                                <div class="auth-page-dropdown-text-section">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M15.4426 16.5C15.4426 13.5975 12.5551 11.25 9.00011 11.25C5.44511 11.25 2.55762 13.5975 2.55762 16.5"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <div class="auth-page-dropdown-text"> Your Account Details</div>

                                </div>



                                <svg class="auth-page-dropdown-arrow" :class="{ 'is-open': show_account_details }"
                                    width="5" height="10" viewBox="0 0 5 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                                        fill="black" fill-opacity="0.4" />
                                </svg>





                            </div>
                            <div v-if="show_account_details" class="auth-page-dropdown-subtext-section">
                                <div class="auth-page-dropdown-subtext">

                                    <div v-if="sharedState?.value?.consent?.Permissions.includes('ReadAccountsDetail')">
                                        Full account information (account number/ID, type and description of account,
                                        currency, nickname
                                        you gave it, and account holder name, opening date)
                                    </div>
                                    <div v-else-if="sharedState?.value?.consent?.Permissions.includes('ReadAccountsBasic')">
                                        Basic account information (account number/ID, type of account, currency,
                                        nickname
                                        you gave it, and account holder name)
                                    </div>
                                    <div v-if="sharedState?.value?.consent?.Permissions.includes('ReadBalances')">
                                        Your current account balances (available balance, booked balance, credit limit/
                                        overdraft if any, and when the balance was last updated)
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div v-if="sharedState?.value?.consent?.Permissions.some(item => ['ReadBeneficiariesBasic', 'ReadBeneficiariesDetail', 'ReadStandingOrdersBasic', 'ReadStandingOrdersDetail', 'ReadDirectDebits', 'ReadScheduledPaymentsBasic', 'ReadScheduledPaymentsDetail'].includes(item))"
                            class="auth-page-dropdown-container">
                            <div class="auth-page-dropdown" @click="show_regular_payments = !show_regular_payments">
                                <div class="auth-page-dropdown-text-section">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.50391 10.7474C6.50391 11.7149 7.24641 12.4949 8.16891 12.4949H10.0514C10.8539 12.4949 11.5064 11.8124 11.5064 10.9724C11.5064 10.0574 11.1089 9.73488 10.5164 9.52488L7.49391 8.47488C6.90141 8.26488 6.50391 7.94238 6.50391 7.02738C6.50391 6.18738 7.15641 5.50488 7.95891 5.50488H9.84141C10.7639 5.50488 11.5064 6.28488 11.5064 7.25238"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9 4.5V13.5" stroke="#0C1441" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>



                                    <div class="auth-page-dropdown-text"> Your Regular Payments</div>

                                </div>

                                <svg class="auth-page-dropdown-arrow" :class="{ 'is-open': show_regular_payments }"
                                    width="5" height="10" viewBox="0 0 5 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                                        fill="black" fill-opacity="0.4" />
                                </svg>




                            </div>

                            <div v-if="show_regular_payments" class="auth-page-dropdown-subtext-section">
                                <div class="auth-page-dropdown-subtext">
                                    <div v-if="sharedState?.value?.consent?.Permissions.includes('ReadBeneficiariesDetail')">
                                        Full beneficiaries information (saved payee account number/ID, type, name and
                                        nickname, bank name and details, address, reference)
                                    </div>
                                    <div
                                        v-else-if="sharedState?.value?.consent?.Permissions.includes('ReadBeneficiariesBasic')">
                                        Basic beneficiaries information (saved payee account number/ID, type, name and
                                        nickname, bank name and details, reference)
                                    </div>
                                    <div v-if="sharedState?.value?.consent?.Permissions.includes('ReadStandingOrdersDetail')">
                                        Full standing orders information (payee name and nickname, reference, frequency,
                                        first/next/final payment amounts and dates, number of payments, purpose, status,
                                        type)
                                    </div>
                                    <div
                                        v-else-if="sharedState?.value?.consent?.Permissions.includes('ReadStandingOrdersBasic')">
                                        Basic standing orders information (payee name and nickname, reference,
                                        frequency, first/next/final payment amounts and dates, number of payments,
                                        purpose, status, type)
                                    </div>
                                    <div
                                        v-if="sharedState?.value?.consent?.Permissions.includes('ReadScheduledPaymentsDetail')">
                                        Full scheduled payments information (payee account details, name and nickname,
                                        creditor/debtor reference, instructed amount, scheduled date/time, ID, type)
                                    </div>
                                    <div
                                        v-else-if="sharedState?.value?.consent?.Permissions.includes('ReadScheduledPaymentsBasic')">
                                        Basic standing orders information (payee name and nickname, reference,
                                        frequency, first/next/final payment amounts and dates, number of payments,
                                        purpose, status, type)
                                    </div>
                                    <div v-if="sharedState?.value?.consent?.Permissions.includes('ReadDirectDebits')">
                                        Direct debits information (account ID, direct debit ID, status, frequency,
                                        mandate identification, name, previous payment amount and date)
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div v-if="sharedState?.value?.consent?.Permissions.some(item => ['ReadTransactionsBasic', 'ReadTransactionsDetail'].includes(item))"
                            class="auth-page-dropdown-container">
                            <div class="auth-page-dropdown" @click="show_account_trans = !show_account_trans">
                                <div class="auth-page-dropdown-text-section">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.75 6.75H5.25" stroke="#0C1441" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M16.5 8.22749V9.77254C16.5 10.185 16.17 10.5225 15.75 10.5375H14.28C13.47 10.5375 12.7275 9.94501 12.66 9.13501C12.615 8.66251 12.795 8.22001 13.11 7.91251C13.3875 7.62751 13.77 7.46252 14.19 7.46252H15.75C16.17 7.47752 16.5 7.81499 16.5 8.22749Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M13.11 7.91249C12.795 8.21999 12.615 8.66249 12.66 9.13499C12.7275 9.94499 13.47 10.5375 14.28 10.5375H15.75V11.625C15.75 13.875 14.25 15.375 12 15.375H5.25C3 15.375 1.5 13.875 1.5 11.625V6.375C1.5 4.335 2.73 2.91 4.6425 2.67C4.8375 2.64 5.04 2.625 5.25 2.625H12C12.195 2.625 12.3825 2.63249 12.5625 2.66249C14.4975 2.88749 15.75 4.32 15.75 6.375V7.46251H14.19C13.77 7.46251 13.3875 7.62749 13.11 7.91249Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>



                                    <div class="auth-page-dropdown-text"> Your Account Transactions</div>

                                </div>

                                <svg class="auth-page-dropdown-arrow" :class="{ 'is-open': show_account_trans }"
                                    width="5" height="10" viewBox="0 0 5 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                                        fill="black" fill-opacity="0.4" />
                                </svg>



                            </div>
                            <div v-if="show_account_trans" class="auth-page-dropdown-subtext-section">
                                <div v-if="sharedState?.value?.consent?.Permissions.includes('ReadTransactionsDetail')"
                                    class="auth-page-dropdown-subtext">
                                    Full transactions information (date/time, amount, type, description/narrative,
                                    payee/merchant name and details, category, status, reference, currency exchange if
                                    applicable)
                                </div>
                                <div v-else-if="sharedState?.value?.consent?.Permissions.includes('ReadTransactionsBasic')"
                                    class="auth-page-dropdown-subtext">
                                    Basic transactions information (date/time, amount, type, description/narrative,
                                    status, reference)
                                </div>
                            </div>
                        </div>


                        <div v-if="sharedState?.value?.consent?.Permissions.some(item => ['ReadStatements'].includes(item))"
                            class="auth-page-dropdown-container">
                            <div class="auth-page-dropdown" @click="show_account_statements = !show_account_statements">
                                <div class="auth-page-dropdown-text-section">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.375 8.47499V5.28001C15.375 2.25751 14.67 1.5 11.835 1.5H6.165C3.33 1.5 2.625 2.25751 2.625 5.28001V13.725C2.625 15.72 3.72001 16.1925 5.04751 14.7675L5.05499 14.76C5.66999 14.1075 6.60749 14.16 7.13999 14.8725L7.8975 15.885"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 5.25H12" stroke="#0C1441" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M6.75 8.25H11.25" stroke="#0C1441" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M13.6583 11.0777L11.0033 13.7327C10.8983 13.8377 10.8008 14.0327 10.7783 14.1752L10.6358 15.1877C10.5833 15.5552 10.8383 15.8102 11.2058 15.7577L12.2183 15.6152C12.3608 15.5927 12.5633 15.4952 12.6608 15.3902L15.3158 12.7352C15.7733 12.2777 15.9908 11.7452 15.3158 11.0702C14.6483 10.4027 14.1158 10.6202 13.6583 11.0777Z"
                                            stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M13.2744 11.4602C13.4994 12.2702 14.1294 12.9002 14.9394 13.1252"
                                            stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>



                                    <div class="auth-page-dropdown-text"> Your Account Statements</div>

                                </div>



                                <svg class="auth-page-dropdown-arrow" :class="{ 'is-open': show_account_statements }"
                                    width="5" height="10" viewBox="0 0 5 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                                        fill="black" fill-opacity="0.4" />
                                </svg>




                            </div>

                            <div v-if="show_account_statements" class="auth-page-dropdown-subtext-section">
                                <div class="auth-page-dropdown-subtext">
                                    Account statements (monthly/periodic summaries including transaction lists,
                                    opening/closing balances, fees, interest, and period details)
                                </div>
                            </div>
                        </div>

                        <div v-if="sharedState?.value?.consent?.Permissions.some(item => ['ReadProduct'].includes(item))"
                            class="auth-page-dropdown-container">
                            <div class="auth-page-dropdown" @click="show_product_info = !show_product_info">
                                <div class="auth-page-dropdown-text-section">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.9973 9H12.0041" stroke="#0C1441" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.99661 9H9.00335" stroke="#0C1441" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M5.99588 9H6.00262" stroke="#0C1441" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>



                                    <div class="auth-page-dropdown-text"> Your Product Information</div>

                                </div>


                                <svg class="auth-page-dropdown-arrow" :class="{ 'is-open': show_product_info }"
                                    width="5" height="10" viewBox="0 0 5 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                                        fill="black" fill-opacity="0.4" />
                                </svg>


                            </div>
                            <div v-if="show_product_info" class="auth-page-dropdown-subtext-section">
                                <div class="auth-page-dropdown-subtext">
                                    Product information (details about your account's financial product, including name,
                                    features, interest rates, fees, and key terms)
                                </div>
                            </div>

                        </div>

                        <div v-if="sharedState?.value?.consent?.Permissions.some(item => ['ReadPartyUser', 'ReadPartyUserIdentity', 'ReadParty'].includes(item))"
                            class="auth-page-dropdown-container">
                            <div class="auth-page-dropdown" @click="show_parties = !show_parties">
                                <div class="auth-page-dropdown-text-section">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.5 6.2025V3.1725C16.5 1.98 16.02 1.5 14.8275 1.5H11.7975C10.605 1.5 10.125 1.98 10.125 3.1725V6.2025C10.125 7.395 10.605 7.875 11.7975 7.875H14.8275C16.02 7.875 16.5 7.395 16.5 6.2025Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M7.875 6.39V2.985C7.875 1.9275 7.395 1.5 6.2025 1.5H3.1725C1.98 1.5 1.5 1.9275 1.5 2.985V6.3825C1.5 7.4475 1.98 7.8675 3.1725 7.8675H6.2025C7.395 7.875 7.875 7.4475 7.875 6.39Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M7.875 14.8275V11.7975C7.875 10.605 7.395 10.125 6.2025 10.125H3.1725C1.98 10.125 1.5 10.605 1.5 11.7975V14.8275C1.5 16.02 1.98 16.5 3.1725 16.5H6.2025C7.395 16.5 7.875 16.02 7.875 14.8275Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.25 11.625H15.75" stroke="#0C1441" stroke-linecap="round" />
                                        <path d="M11.25 14.625H15.75" stroke="#0C1441" stroke-linecap="round" />
                                    </svg>



                                    <div class="auth-page-dropdown-text"> Contact and Party Details</div>

                                </div>


                                <svg class="auth-page-dropdown-arrow" :class="{ 'is-open': show_parties }" width="5"
                                    height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                                        fill="black" fill-opacity="0.4" />
                                </svg>





                            </div>
                            <div v-if="show_parties" class="auth-page-dropdown-subtext-section">
                                <div v-if="sharedState?.value?.consent?.Permissions.includes('ReadPartyUserIdentity')"
                                    class="auth-page-dropdown-subtext">
                                    Detailed personal identity details (name, date of birth, contact information,
                                    Emirates ID, nationality, residential address, employer details)
                                </div>
                                <div v-else-if="sharedState?.value?.consent?.Permissions.includes('ReadPartyUser')"
                                    class="auth-page-dropdown-subtext">
                                    Detailed personal details (name, date of birth, contact information, residential
                                    address)
                                </div>
                                <div v-else-if="sharedState?.value?.consent?.Permissions.includes('ReadParty')"
                                    class="auth-page-dropdown-subtext">
                                    Your legal or registered name as the account holder
                                </div>
                            </div>

                        </div>

                        <div v-if="sharedState?.value?.consent?.Permissions.some(item => ['ReadProductFinanceRates'].includes(item))"
                            class="auth-page-dropdown-container">
                            <div class="auth-page-dropdown" @click="show_finance_rates = !show_finance_rates">
                                <div class="auth-page-dropdown-text-section">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.42773 11.4519L11.3327 6.54688" stroke="#0C1441"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M6.73501 7.77859C7.24449 7.77859 7.65749 7.36558 7.65749 6.8561C7.65749 6.34662 7.24449 5.93359 6.73501 5.93359C6.22553 5.93359 5.8125 6.34662 5.8125 6.8561C5.8125 7.36558 6.22553 7.77859 6.73501 7.77859Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M11.6403 12.0676C12.1497 12.0676 12.5628 11.6546 12.5628 11.1451C12.5628 10.6357 12.1497 10.2227 11.6403 10.2227C11.1308 10.2227 10.7178 10.6357 10.7178 11.1451C10.7178 11.6546 11.1308 12.0676 11.6403 12.0676Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                                            stroke="#0C1441" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>




                                    <div class="auth-page-dropdown-text"> Your Finance Rates</div>

                                </div>


                                <svg class="auth-page-dropdown-arrow" :class="{ 'is-open': show_finance_rates }"
                                    width="5" height="10" viewBox="0 0 5 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.148134 9.12903C-0.0493779 9.32827 -0.0493779 9.65132 0.148134 9.85056C0.345645 10.0498 0.665875 10.0498 0.863386 9.85056L0.148134 9.12903ZM0.863386 0.149435C0.665875 -0.0498123 0.345645 -0.0498123 0.148134 0.149435C-0.0493779 0.348681 -0.0493779 0.671725 0.148134 0.870972L0.863386 0.149435ZM0.863386 9.85056L4.52734 6.15442L3.81208 5.43288L0.148134 9.12903L0.863386 9.85056ZM4.52734 6.15442C5.15755 5.51866 5.15755 4.48133 4.52734 3.84558L3.81208 4.56712C4.04728 4.80438 4.04728 5.19562 3.81208 5.43288L4.52734 6.15442ZM4.52734 3.84558L0.863386 0.149435L0.148134 0.870972L3.81208 4.56712L4.52734 3.84558Z"
                                        fill="black" fill-opacity="0.4" />
                                </svg>

                            </div>
                            <div v-if="show_finance_rates" class="auth-page-dropdown-subtext-section">
                                <div class="auth-page-dropdown-subtext">
                                    <div>Details of the interest or profit rate on your mortgage, finance, or credit
                                        card.</div>

                                    <div>OPTIONAL ---- </div>

                                    <div>As part of your consent, the interest or profit rates for the selected finance
                                        products will be securely shared with {{
                                            sharedState?.value?.consent?.OnBehalfOf?.TradingName || '[TPP Trading Name]'}}. </div>

                                    <div>To protect this information, your rates will be encrypted when requested. A
                                        one-time code will be sent to your mobile ending [016].</div>

                                    <div>You will need to provide this code to [TPP Name] when prompted, so they can
                                        display your rate details.</div>

                                    <div>Please note: This code will expire after 2 hours. After that, the rates won't
                                        be available to view unless you request them again.</div>
                                </div>
                            </div>



                        </div>


                    </div>


                </div>
            </div>
            <div class="auth-page-date-range">
                <svg class="auth-page-divider" width="292" height="2" viewBox="0 0 292 2" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="292" height="2" fill="#D9D9D9" fill-opacity="0.1" />
                </svg>

                <div class="auth-page-dropdown" style="cursor: default;">
                    <div class="auth-page-date">
                        <div class="auth-page-date-text">We will share your data until</div>



                        <div class="auth-page-date-2">
                            <div class="auth-page-date-3">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.33301 1.33203V3.33203" stroke="#0C1441" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.667 1.33203V3.33203" stroke="#0C1441" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.33301 6.05859H13.6663" stroke="#0C1441" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M14 5.66536V11.332C14 13.332 13 14.6654 10.6667 14.6654H5.33333C3 14.6654 2 13.332 2 11.332V5.66536C2 3.66536 3 2.33203 5.33333 2.33203H10.6667C13 2.33203 14 3.66536 14 5.66536Z"
                                        stroke="#0C1441" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M10.4635 9.13411H10.4694" stroke="#0C1441" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M10.4635 11.1341H10.4694" stroke="#0C1441" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.99666 9.13411H8.00265" stroke="#0C1441" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M7.99666 11.1341H8.00265" stroke="#0C1441" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M5.52987 9.13411H5.53585" stroke="#0C1441" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M5.52987 11.1341H5.53585" stroke="#0C1441" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>

                                <div class="auth-page-date-text">
                                    {{ formatDate(sharedState?.value?.consent?.ExpirationDateTime) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
        <div v-else class="auth-page-text-frame">
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
                        We couldn’t find any accounts that match the data sharing request, so unfortunatley we’re unable to share any information with {{sharedState?.value?.consent?.OnBehalfOf?.TradingName || '[TPP Trading Name]'}}.
                    </div>
            </div>
        </div>



        <div v-if="visibleAccounts.length > 0" class="auth-page-button-with-description">
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
                By pressing Close you will be returned to {{ sharedState?.value?.consent?.OnBehalfOf?.TradingName ||
                    '[TPP Trading Name]'}}. No data will be shared.
            </div>
        </div>




    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useSharedState } from '../Composables/useSharedState.ts'
import { formatDateTime as formatDate } from '../Composables/formatDate.ts'
import DirhamAmount from '../ConsentPages/DirhamAmount.vue'

const { sharedState } = useSharedState()

const show_information = ref(true)
const show_account_details = ref(false)
const show_regular_payments = ref(false)
const show_account_trans = ref(false)
const show_account_statements = ref(false)
const show_product_info = ref(false)
const show_parties = ref(false)
const show_finance_rates = ref(false)

// --- Dynamic accounts ---
const DEFAULT_ACCOUNTS = [
  { id: 1, type: 'CurrentAccount', iban: 'AE07 0331 2345 6123 4567 890', balance: 5000, secondary: 1500, currency: 'AED' },
  { id: 2, type: 'Savings',        iban: 'AE07 0331 2345 6123 4567 891', balance: 25000, secondary: null, currency: 'AED' },
]
const TYPE_LABELS = {
  CurrentAccount: 'Current Account',
  Savings: 'Savings',
  CreditCard: 'Credit Card',
  Mortgage: 'Mortgage',
  Finance: 'Finance',
}
const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', INR: '₹', SAR: '﷼' }
function currencySymbol(account) {
  return CURRENCY_SYMBOLS[account.currency] ?? null
}
function typeLabel(account) {
  const base = TYPE_LABELS[account.type] || account.type
  if (account.type === 'CreditCard' && account.cardName) return `${base} | ${account.cardName}`
  if ((account.type === 'CurrentAccount' || account.type === 'Savings') && account.currency && account.currency !== 'AED') return `${base} (${account.currency})`
  return base
}
function balanceLabel(type) {
  if (type === 'Mortgage' || type === 'Finance' || type === 'CreditCard') return 'Outstanding'
  return 'Balance'
}
function secondaryLabel(type) {
  if (type === 'CurrentAccount') return 'Overdraft'
  if (type === 'CreditCard') return 'Available'
  return null
}
function getAccountRef(account) {
  switch (account.type) {
    case 'CurrentAccount':
    case 'Savings':    return account.iban || ''
    case 'CreditCard': return account.maskedPan || ''
    case 'Mortgage':   return account.mortgageRef || ''
    case 'Finance':    return account.financeRef || ''
    default: return ''
  }
}

const selectedAccounts = reactive({})
const accounts = computed(() => sharedState.value?.accounts || DEFAULT_ACCOUNTS)
const visibleAccounts = computed(() => {
  const subtypes = sharedState.value?.value?.consent?.AccountSubType
  if (!subtypes) return accounts.value
  return accounts.value.filter(a => subtypes.includes(a.type))
})
function toggleSelected(id) {
  selectedAccounts[id] = !selectedAccounts[id]
}
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
    /* height: 23px; */

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 120%;
    letter-spacing: -0.01em;

    color: #0C1441;

    flex: none;
    order: 0;
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
    padding: 16px 12px;
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
    cursor: pointer;
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
    max-width: 215px;
    white-space: nowrap;       
    overflow: hidden;         
    text-overflow: ellipsis;   
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
    margin-left: auto;
    width: 20px;
    height: 20px;


    /* Inside auto layout */
    position: relative;
    flex: none;
    order: 1;
    flex-grow: 0;
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
    background: #FD6436;
    border: 2px solid #FD6436;
}

.auth-page-account-checkbox-check {
position: absolute;
left: 15%;
top: 22%;
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
    gap: 142px;

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
    width: 48px;
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
   font-weight: 300;
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

.auth-page-account-currency-symbol {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 120%;
    color: #616786;
}

.auth-page-account-amount {
    /* Amount */

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
</style>
