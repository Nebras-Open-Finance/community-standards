import type { DefaultTheme } from 'vitepress'
import { apiRef } from './shared'
import { CURRENT_VERSION } from '../../version'

const BASE = `/tech/api-specs/${CURRENT_VERSION}`


export const apiSpecsSidebar: DefaultTheme.SidebarItem[] = [
    {
        text: 'TPP - Standards',
        items: [
            {
                text: 'Trust Framework', items: [
                    apiRef('GET', '/participants', `${BASE}/trust-framework/open-api/participants`)]
            },
            {
                text: 'Registration', items: [
                    apiRef('POST', '/tpp-registration', `${BASE}/registration/open-api/tpp-registration`),
                ]
            },
            {
                text: 'Token', items: [
                    apiRef('POST', '/token', `${BASE}/security/tokens/open-api/token`),
                ]
            },
            {
                text: 'Consent',
                items: [
                    {
                        text: 'Create Consent',
                        items: [
                            apiRef('POST', '/par', `${BASE}/${CURRENT_VERSION}/consent/open-api/par`),
                        ],
                    },
                    {
                        text: 'Bank Data Sharing',
                        items: [
                            apiRef('GET', '/account-access-consents', `${BASE}/${CURRENT_VERSION}/consent/open-api/account-access-consents`),
                            apiRef('GET', '/account-access-consents/{ConsentId}', `${BASE}/${CURRENT_VERSION}/consent/open-api/account-access-consents-ConsentId`),
                            apiRef('PATCH', '/account-access-consents/{ConsentId}', `${BASE}/${CURRENT_VERSION}/consent/open-api/patch-account-access-consents-ConsentId`),
                        ],
                    },
                    {
                        text: 'Bank Service Initiation',
                        items: [
                            apiRef('GET', '/payment-consents', `${BASE}/${CURRENT_VERSION}/consent/open-api/payment-consents`),
                            apiRef('GET', '/payment-consents/{ConsentId}', `${BASE}/${CURRENT_VERSION}/consent/open-api/payment-consents-ConsentId`),
                            apiRef('PATCH', '/payment-consents/{ConsentId}', `${BASE}/${CURRENT_VERSION}/consent/open-api/patch-payment-consents-ConsentId`),
                        ],
                    },
                ],
            },
            {
                text: 'Bank Data Sharing',
                items: [
                    apiRef('GET', '/accounts', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts`),
                    apiRef('GET', '/accounts/{AccountId}', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId`),
                    apiRef('GET', '/accounts/{AccountId}/balances', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId-balances`),
                    apiRef('GET', '/accounts/{AccountId}/beneficiaries', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
                    apiRef('GET', '/accounts/{AccountId}/direct-debits', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
                    apiRef('GET', '/parties', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/parties`),
                    apiRef('GET', '/accounts/{AccountId}/parties', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId-parties`),
                    apiRef('GET', '/accounts/{AccountId}/scheduled-payments', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments`),
                    apiRef('GET', '/accounts/{AccountId}/standing-orders', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId-standing-orders`),
                    apiRef('GET', '/accounts/{AccountId}/statements', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId-statements`),
                    apiRef('GET', '/accounts/{AccountId}/transactions', `${BASE}/${CURRENT_VERSION}/banking/data-sharing/open-api/accounts-AccountId-transactions`),
                ],
            },
            {
                text: 'Bank Service Initation',
                items: [
                    apiRef('POST', '/payments', `${BASE}/${CURRENT_VERSION}/banking/service-initiation/open-api/payments`),
                    apiRef('GET', '/payments/{PaymentId}', `${BASE}/${CURRENT_VERSION}/banking/service-initiation/open-api/payments-PaymentId`),
                    apiRef('GET', '/payments', `${BASE}/${CURRENT_VERSION}/banking/service-initiation/open-api/payments-idempotency`),
                    apiRef('GET', '/payment-consents/{ConsentId}/refund', `${BASE}/${CURRENT_VERSION}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`),
                ],
            },
            {
                text: 'Confirmation of Payee',
                items: [
                            apiRef('POST', '/discovery', `${BASE}/${CURRENT_VERSION}/banking/confirmation-of-payee/open-api/discovery`),
                            apiRef('POST', '/confirmation', `${BASE}/${CURRENT_VERSION}/banking/confirmation-of-payee/open-api/confirmation`),
                        ],
            },
        ]
    }
]
