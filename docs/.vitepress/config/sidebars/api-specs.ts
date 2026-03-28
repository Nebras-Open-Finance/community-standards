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
                    apiRef('GET', '/participants', `${BASE}/tpp/trust-framework/participants`),
                ],
            },
            {
                text: 'Registration',
                collapsed: true,
                items: [
                    apiRef('POST', '/tpp-registration', `${BASE}/tpp/registration/tpp-registration`),
                ],
            },
            {
                text: 'Token',
                collapsed: true,
                items: [
                    apiRef('POST', '/token', `${BASE}/tpp/token/token`),
                ],
            },
            {
                text: 'Consent',
                collapsed: true,
                items: [
                    {
                        text: 'Create Consent',
                        items: [
                            apiRef('POST', '/par', `${BASE}/tpp/consent/par`),
                        ],
                    },
                    {
                        text: 'Bank Data Sharing',
                        items: [
                            apiRef('GET',   '/account-access-consents',             `${BASE}/tpp/consent/account-access-consents`),
                            apiRef('GET',   '/account-access-consents/{ConsentId}', `${BASE}/tpp/consent/account-access-consents-ConsentId`),
                            apiRef('PATCH', '/account-access-consents/{ConsentId}', `${BASE}/tpp/consent/patch-account-access-consents-ConsentId`),
                        ],
                    },
                    {
                        text: 'Bank Service Initiation',
                        items: [
                            apiRef('GET',   '/payment-consents',             `${BASE}/tpp/consent/payment-consents`),
                            apiRef('GET',   '/payment-consents/{ConsentId}', `${BASE}/tpp/consent/payment-consents-ConsentId`),
                            apiRef('PATCH', '/payment-consents/{ConsentId}', `${BASE}/tpp/consent/patch-payment-consents-ConsentId`),
                        ],
                    },
                ],
            },
            {
                text: 'Bank Data Sharing',
                collapsed: true,
                items: [
                    apiRef('GET', '/accounts',                               `${BASE}/tpp/data-sharing/accounts`),
                    apiRef('GET', '/accounts/{AccountId}',                   `${BASE}/tpp/data-sharing/accounts-AccountId`),
                    apiRef('GET', '/accounts/{AccountId}/balances',          `${BASE}/tpp/data-sharing/accounts-AccountId-balances`),
                    apiRef('GET', '/accounts/{AccountId}/beneficiaries',     `${BASE}/tpp/data-sharing/accounts-AccountId-beneficiaries`),
                    apiRef('GET', '/accounts/{AccountId}/direct-debits',     `${BASE}/tpp/data-sharing/accounts-AccountId-direct-debits`),
                    apiRef('GET', '/parties',                                `${BASE}/tpp/data-sharing/parties`),
                    apiRef('GET', '/accounts/{AccountId}/parties',           `${BASE}/tpp/data-sharing/accounts-AccountId-parties`),
                    apiRef('GET', '/accounts/{AccountId}/scheduled-payments',`${BASE}/tpp/data-sharing/accounts-AccountId-scheduled-payments`),
                    apiRef('GET', '/accounts/{AccountId}/standing-orders',   `${BASE}/tpp/data-sharing/accounts-AccountId-standing-orders`),
                    apiRef('GET', '/accounts/{AccountId}/statements',        `${BASE}/tpp/data-sharing/accounts-AccountId-statements`),
                    apiRef('GET', '/accounts/{AccountId}/transactions',      `${BASE}/tpp/data-sharing/accounts-AccountId-transactions`),
                ],
            },
            {
                text: 'Bank Service Initiation',
                collapsed: true,
                items: [
                    apiRef('POST', '/payments',                              `${BASE}/tpp/service-initiation/payments`),
                    apiRef('GET',  '/payments/{PaymentId}',                  `${BASE}/tpp/service-initiation/payments-PaymentId`),
                    apiRef('GET',  '/payments',                              `${BASE}/tpp/service-initiation/payments-idempotency`),
                    apiRef('GET',  '/payment-consents/{ConsentId}/refund',   `${BASE}/tpp/service-initiation/payment-consents-ConsentId-refund`),
                ],
            },
            {
                text: 'Confirmation of Payee',
                collapsed: true,
                items: [
                    apiRef('POST', '/discovery',    `${BASE}/tpp/confirmation-of-payee/discovery`),
                    apiRef('POST', '/confirmation', `${BASE}/tpp/confirmation-of-payee/confirmation`),
                ],
            },
            {
                text: 'ATMs',
                collapsed: true,
                items: [
                    apiRef('GET', '/atms', `${BASE}/tpp/atms/atms`),
                ],
            },
            {
                text: 'Events & Webhooks',
                collapsed: true,
                items: [
                    apiRef('POST', '[consent status]', `${BASE}/tpp/webhooks/consent-status`),
                    apiRef('POST', '[payment status]', `${BASE}/tpp/webhooks/payment-status`),
                ],
            },
        ],
    },
]
