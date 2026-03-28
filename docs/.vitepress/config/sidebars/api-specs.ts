import type { DefaultTheme } from 'vitepress'
import { apiRef } from './shared'
import { CURRENT_VERSION } from '../../version'

const BASE = `/tech/api-specs/${CURRENT_VERSION}`

export const apiSpecsSidebar: DefaultTheme.SidebarItem[] = [
    {
        text: 'TPP - Standards',
        items: [
            {
                text: 'Trust Framework',
                collapsed: true,
                items: [
                    apiRef('GET', '/participants', `${BASE}/trust-framework/open-api/participants`),
                ],
            },
            {
                text: 'Registration',
                collapsed: true,
                items: [
                    apiRef('POST', '/tpp-registration', `${BASE}/registration/open-api/tpp-registration`),
                ],
            },
            {
                text: 'Token',
                collapsed: true,
                items: [
                    apiRef('POST', '/token', `${BASE}/security/tokens/open-api/token`),
                ],
            },
            {
                text: 'Consent',
                collapsed: true,
                items: [
                    {
                        text: 'Create Consent',
                        items: [
                            apiRef('POST', '/par', `${BASE}/consent/open-api/par`),
                        ],
                    },
                    {
                        text: 'Bank Data Sharing',
                        items: [
                            apiRef('GET',   '/account-access-consents',             `${BASE}/consent/open-api/account-access-consents`),
                            apiRef('GET',   '/account-access-consents/{ConsentId}', `${BASE}/consent/open-api/account-access-consents-ConsentId`),
                            apiRef('PATCH', '/account-access-consents/{ConsentId}', `${BASE}/consent/open-api/patch-account-access-consents-ConsentId`),
                        ],
                    },
                    {
                        text: 'Bank Service Initiation',
                        items: [
                            apiRef('GET',   '/payment-consents',             `${BASE}/consent/open-api/payment-consents`),
                            apiRef('GET',   '/payment-consents/{ConsentId}', `${BASE}/consent/open-api/payment-consents-ConsentId`),
                            apiRef('PATCH', '/payment-consents/{ConsentId}', `${BASE}/consent/open-api/patch-payment-consents-ConsentId`),
                        ],
                    },
                ],
            },
            {
                text: 'Bank Data Sharing',
                collapsed: true,
                items: [
                    apiRef('GET', '/accounts',                               `${BASE}/banking/data-sharing/open-api/accounts`),
                    apiRef('GET', '/accounts/{AccountId}',                   `${BASE}/banking/data-sharing/open-api/accounts-AccountId`),
                    apiRef('GET', '/accounts/{AccountId}/balances',          `${BASE}/banking/data-sharing/open-api/accounts-AccountId-balances`),
                    apiRef('GET', '/accounts/{AccountId}/beneficiaries',     `${BASE}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
                    apiRef('GET', '/accounts/{AccountId}/direct-debits',     `${BASE}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
                    apiRef('GET', '/parties',                                `${BASE}/banking/data-sharing/open-api/parties`),
                    apiRef('GET', '/accounts/{AccountId}/parties',           `${BASE}/banking/data-sharing/open-api/accounts-AccountId-parties`),
                    apiRef('GET', '/accounts/{AccountId}/scheduled-payments',`${BASE}/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments`),
                    apiRef('GET', '/accounts/{AccountId}/standing-orders',   `${BASE}/banking/data-sharing/open-api/accounts-AccountId-standing-orders`),
                    apiRef('GET', '/accounts/{AccountId}/statements',        `${BASE}/banking/data-sharing/open-api/accounts-AccountId-statements`),
                    apiRef('GET', '/accounts/{AccountId}/transactions',      `${BASE}/banking/data-sharing/open-api/accounts-AccountId-transactions`),
                ],
            },
            {
                text: 'Bank Service Initiation',
                collapsed: true,
                items: [
                    apiRef('POST', '/payments',                              `${BASE}/banking/service-initiation/open-api/payments`),
                    apiRef('GET',  '/payments/{PaymentId}',                  `${BASE}/banking/service-initiation/open-api/payments-PaymentId`),
                    apiRef('GET',  '/payments',                              `${BASE}/banking/service-initiation/open-api/payments-idempotency`),
                    apiRef('GET',  '/payment-consents/{ConsentId}/refund',   `${BASE}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`),
                ],
            },
            {
                text: 'Confirmation of Payee',
                collapsed: true,
                items: [
                    apiRef('POST', '/discovery',    `${BASE}/banking/confirmation-of-payee/open-api/discovery`),
                    apiRef('POST', '/confirmation', `${BASE}/banking/confirmation-of-payee/open-api/confirmation`),
                ],
            },
            {
                text: 'ATMs',
                collapsed: true,
                items: [
                    apiRef('GET', '/atms', `${BASE}/banking/atms/open-api/atms`),
                ],
            },
            {
                text: 'Events & Webhooks',
                collapsed: true,
                items: [
                    apiRef('POST', '[consent status]', `${BASE}/banking/confirmation-of-payee/open-api/discovery`),
                    apiRef('POST', '[payment status]', `${BASE}/banking/confirmation-of-payee/open-api/confirmation`),
                ],
            },
        ],
    },
]
