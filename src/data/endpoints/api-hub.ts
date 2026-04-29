import type { Endpoint, EndpointRedoc, OverrideServer } from './types'

const VERSION = 'v2.1'

const HEIMDALL_SERVERS: OverrideServer[] = [
  { url: 'https://hh.[LFICODE].apihub.openfinance.ae' },
  { url: 'https://hh.[LFICODE].preprod.apihub.openfinance.ae' },
]

const CONSENT_MANAGER_SERVERS: OverrideServer[] = [
  { url: 'https://cm.[LFICODE].apihub.openfinance.ae' },
  { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' },
]

const SPEC_HEIMDALL = '/openapi/v2.1/api-hub/uae-api-hub-authorisation-server-openapi.yaml'
const SPEC_CONSENT_MANAGER = '/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml'

interface EntryInput {
  section: string
  sectionSlug: string
  subsection?: string
  slug: string
  method: Endpoint['method']
  path: string
  title: string
  redoc: EndpointRedoc
}

function entry(input: EntryInput): Endpoint {
  return {
    surface: 'api-hub',
    version: VERSION,
    ...input,
  }
}

export const apiHubEndpoints: readonly Endpoint[] = [
  // Headless Heimdall — Health Check
  entry({
    section: 'Headless Heimdall Auth Server',
    sectionSlug: 'headless-heimdall/open-api',
    subsection: 'Health Check',
    slug: 'hello-mtls',
    method: 'GET',
    path: '/hello-mtls',
    title: 'Hello MTLS',
    redoc: {
      spec: SPEC_HEIMDALL,
      filterPath: '/hello-mtls',
      filterMethod: 'get',
      overrideServers: HEIMDALL_SERVERS,
    },
  }),

  // Headless Heimdall — Authorization
  entry({
    section: 'Headless Heimdall Auth Server',
    sectionSlug: 'headless-heimdall/open-api',
    subsection: 'Authorization',
    slug: 'auth',
    method: 'GET',
    path: '/auth',
    title: 'Get Auth',
    redoc: {
      spec: SPEC_HEIMDALL,
      filterPath: '/auth',
      filterMethod: 'get',
      overrideServers: HEIMDALL_SERVERS,
    },
  }),
  entry({
    section: 'Headless Heimdall Auth Server',
    sectionSlug: 'headless-heimdall/open-api',
    subsection: 'Authorization',
    slug: 'auth-interactionId-doConfirm',
    method: 'POST',
    path: '/auth/{interactionId}/doConfirm',
    title: 'Confirm Authorization',
    redoc: {
      spec: SPEC_HEIMDALL,
      filterPath: '/auth/{interactionId}/doConfirm',
      filterMethod: 'post',
      overrideServers: HEIMDALL_SERVERS,
    },
  }),
  entry({
    section: 'Headless Heimdall Auth Server',
    sectionSlug: 'headless-heimdall/open-api',
    subsection: 'Authorization',
    slug: 'auth-interactionId-doFail',
    method: 'POST',
    path: '/auth/{interactionId}/doFail',
    title: 'Fail Authorization',
    redoc: {
      spec: SPEC_HEIMDALL,
      filterPath: '/auth/{interactionId}/doFail',
      filterMethod: 'post',
      overrideServers: HEIMDALL_SERVERS,
    },
  }),

  // Consent Manager — Health Check
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Health Check',
    slug: 'hello-mtls',
    method: 'GET',
    path: '/hello-mtls',
    title: 'Hello MTLS',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/hello-mtls',
      filterMethod: 'get',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),

  // Consent Manager — Consents
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'consents',
    method: 'GET',
    path: '/consents',
    title: 'Get Consents',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/consents',
      filterMethod: 'get',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'consents-consentId',
    method: 'GET',
    path: '/consents/{consentId}',
    title: 'Get Consent by ID',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/consents/{consentId}',
      filterMethod: 'get',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'patch-consents-consentId',
    method: 'PATCH',
    path: '/consents/{consentId}',
    title: 'Get Consent by ID',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/consents/{consentId}',
      filterMethod: 'patch',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'consents-consentId-audit',
    method: 'GET',
    path: '/consents/{consentId}/audit',
    title: 'Get Consent Audit',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/consents/{consentId}/audit',
      filterMethod: 'get',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'consent-groups-consentGroupId-consents',
    method: 'GET',
    path: '/consent-groups/{consentGroupId}/consents',
    title: 'Get Consents in Consent Group',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/consent-groups/{consentGroupId}/consents',
      filterMethod: 'get',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'psu-userId-consents',
    method: 'GET',
    path: '/psu/{userId}/consents',
    title: 'Get Consents by PSU',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/psu/{userId}/consents',
      filterMethod: 'get',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'accounts-accountId-consents',
    method: 'GET',
    path: '/accounts/{accountId}/consents',
    title: 'Get Consents by Account',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/accounts/{accountId}/consents',
      filterMethod: 'get',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'consent-groups-consentGroupId-consents-action-revoke',
    method: 'POST',
    path: '/consent-groups/{consentGroupId}/consents/action/revoke',
    title: 'Revoke Consents in Consent Group',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/consent-groups/{consentGroupId}/consents/action/revoke',
      filterMethod: 'post',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Consents',
    slug: 'consents-consentId-action-revoke',
    method: 'POST',
    path: '/consents/{consentId}/action/revoke',
    title: 'Revoke Consent',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/consents/{consentId}/action/revoke',
      filterMethod: 'post',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),

  // Consent Manager — Payment Log
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Payment Log',
    slug: 'payment-log',
    method: 'GET',
    path: '/payment-log',
    title: 'Get Payment Log',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/payment-log',
      filterMethod: 'get',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
  entry({
    section: 'Consent Manager',
    sectionSlug: 'consent-manager/open-api',
    subsection: 'Payment Log',
    slug: 'payment-log-id',
    method: 'PATCH',
    path: '/payment-log/{id}',
    title: 'Get Payment Log',
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: '/payment-log/{id}',
      filterMethod: 'patch',
      overrideServers: CONSENT_MANAGER_SERVERS,
    },
  }),
] as const
