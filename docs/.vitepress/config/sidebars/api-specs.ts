import type { DefaultTheme } from 'vitepress'
import { apiRef } from './shared'
import { CURRENT_VERSION } from '../../version'

const BASE = `/tech/api-specs/${CURRENT_VERSION}`

export const apiSpecsSidebar: DefaultTheme.SidebarItem[] = [
    {
        text: 'TPP - Standards',
        link: `${BASE}/tpp/`,
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
    {
        text: 'API Hub',
        link: `${BASE}/api-hub/`,
        items: [
            {
                text: 'Headless Heimdall Auth Server',
                collapsed: true,
                items: [
                    {
                        text: 'Health Check',
                        items: [
                            apiRef('GET', '/hello-mtls', `${BASE}/api-hub/headless-heimdall/open-api/hello-mtls`),
                        ],
                    },
                    {
                        text: 'Authorization',
                        items: [
                            apiRef('GET', '/auth', `${BASE}/api-hub/headless-heimdall/open-api/auth`),
                            apiRef('POST', '/auth/{interactionId}/doConfirm', `${BASE}/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm`),
                            apiRef('POST', '/auth/{interactionId}/doFail', `${BASE}/api-hub/headless-heimdall/open-api/auth-interactionId-doFail`),
                        ],
                    },
                ],
            },
            {
                text: 'Consent Manager',
                collapsed: true,
                items: [
                    {
                        text: 'Health Check',
                        items: [
                            apiRef('GET', '/hello-mtls', `${BASE}/api-hub/consent-manager/open-api/hello-mtls`),
                        ],
                    },
                    {
                        text: 'Consents',
                        items: [
                            apiRef('GET', '/consents', `${BASE}/api-hub/consent-manager/open-api/consents`),
                            apiRef('GET', '/consents/{consentId}', `${BASE}/api-hub/consent-manager/open-api/consents-consentId`),
                            apiRef('PATCH', '/consents/{consentId}', `${BASE}/api-hub/consent-manager/open-api/patch-consents-consentId`),
                            apiRef('GET', '/consents/{consentId}/audit', `${BASE}/api-hub/consent-manager/open-api/consents-consentId-audit`),
                            apiRef('GET', '/consent-groups/{consentGroupId}/consents', `${BASE}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents`),
                            apiRef('GET', '/psu/{userId}/consents', `${BASE}/api-hub/consent-manager/open-api/psu-userId-consents`),
                            apiRef('GET', '/accounts/{accountId}/consents', `${BASE}/api-hub/consent-manager/open-api/accounts-accountId-consents`),
                            apiRef('POST', '/consent-groups/{consentGroupId}/consents/action/revoke', `${BASE}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke`),
                            apiRef('POST', '/consents/{consentId}/action/revoke', `${BASE}/api-hub/consent-manager/open-api/consents-consentId-action-revoke`),
                        ],
                    },
                    {
                        text: 'Payment Log',
                        items: [
                            apiRef('GET', '/payment-log', `${BASE}/api-hub/consent-manager/open-api/payment-log`),
                            apiRef('PATCH', '/payment-log/{id}', `${BASE}/api-hub/consent-manager/open-api/payment-log-id`),
                        ],
                    },
                ],
            },
        ],
    },
    {
        text: 'Ozone Connect',
        link: `${BASE}/ozone-connect/`,
        items: [
            {
                text: 'Consent Events',
                collapsed: true,
                items: [
                    apiRef('POST', '/consent/action/validate', `${BASE}/ozone-connect/consent-events/validate`),
                    apiRef('POST', '/consent/event/{operation}', `${BASE}/ozone-connect/consent-events/event-op`),
                ],
            },
            {
                text: 'Bank Data Sharing',
                collapsed: true,
                items: [
                    apiRef('GET', '/accounts',                                `${BASE}/ozone-connect/data-sharing/accounts`),
                    apiRef('GET', '/accounts/{AccountId}',                    `${BASE}/ozone-connect/data-sharing/accounts-AccountId`),
                    apiRef('GET', '/accounts/{AccountId}/balances',           `${BASE}/ozone-connect/data-sharing/accounts-AccountId-balances`),
                    apiRef('GET', '/accounts/{AccountId}/beneficiaries',      `${BASE}/ozone-connect/data-sharing/accounts-AccountId-beneficiaries`),
                    apiRef('GET', '/customer',                                `${BASE}/ozone-connect/data-sharing/customer`),
                    apiRef('GET', '/accounts/{AccountId}/customer',           `${BASE}/ozone-connect/data-sharing/accounts-AccountId-customer`),
                    apiRef('GET', '/accounts/{AccountId}/direct-debits',      `${BASE}/ozone-connect/data-sharing/accounts-AccountId-direct-debits`),
                    apiRef('GET', '/accounts/{AccountId}/products',           `${BASE}/ozone-connect/data-sharing/accounts-AccountId-products`),
                    apiRef('GET', '/accounts/{AccountId}/scheduled-payments', `${BASE}/ozone-connect/data-sharing/accounts-AccountId-scheduled-payments`),
                    apiRef('GET', '/accounts/{AccountId}/standing-orders',    `${BASE}/ozone-connect/data-sharing/accounts-AccountId-standing-orders`),
                    apiRef('GET', '/accounts/{AccountId}/statements',         `${BASE}/ozone-connect/data-sharing/accounts-AccountId-statements`),
                    apiRef('GET', '/accounts/{AccountId}/transactions',       `${BASE}/ozone-connect/data-sharing/accounts-AccountId-transactions`),
                ],
            },
            {
                text: 'Bank Service Initiation',
                collapsed: true,
                items: [
                    apiRef('POST', '/payments',                            `${BASE}/ozone-connect/service-initiation/payments`),
                    apiRef('GET',  '/payments/{PaymentId}',                `${BASE}/ozone-connect/service-initiation/payments-PaymentId`),
                    apiRef('GET',  '/payment-consents/{ConsentId}/refund', `${BASE}/ozone-connect/service-initiation/payment-consents-ConsentId-refund`),
                ],
            },
            {
                text: 'Confirmation of Payee',
                collapsed: true,
                items: [
                    apiRef('POST', '/customers/action/cop-query', `${BASE}/ozone-connect/confirmation-of-payee/cop-query`),
                ],
            },
            {
                text: 'Products & Leads',
                collapsed: true,
                items: [
                    apiRef('GET',  '/products', `${BASE}/ozone-connect/products-and-leads/products`),
                    apiRef('POST', '/leads',    `${BASE}/ozone-connect/products-and-leads/leads`),
                ],
            },
            {
                text: 'ATMs',
                collapsed: true,
                items: [
                    apiRef('GET', '/atm', `${BASE}/ozone-connect/atms/atm`),
                ],
            },
        ],
    },
]
