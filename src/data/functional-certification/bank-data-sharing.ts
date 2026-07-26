// Functional Certification config for Bank Data Sharing.
//
// The endpoint list is NOT hardcoded here — it is derived from the canonical
// endpoint registry (the same source that drives the API reference), filtered
// to the Ozone Connect "Bank Data Sharing" section. Each endpoint is then
// annotated with the consent permission(s) that grant it and its TPP-facing
// equivalent path. If a future spec version adds or removes a Bank Data Sharing
// endpoint, the registry changes, this checklist changes with it, and the
// `supporting/tests/functional-cert-endpoints.test.mjs` guard fails until the
// registry and the fetched Ozone Connect spec agree again.

import { ozoneConnectEndpoints } from '../endpoints/ozone-connect'
import type { FcArea, FcConsentOp, FcEndpoint } from './types'

// API Hub hosts the LFI calls for consent-lifecycle operations. The Consent
// Manager (cm.*) is the single source of truth for consent state; Headless
// Heimdall (hh.*) is the authorization server the LFI drives during the PSU
// authorization journey. Neither is versioned in its base path.
const CONSENT_MANAGER_BASE = 'https://cm.{LFICODE}.apihub.openfinance.ae'
const HEIMDALL_BASE = 'https://hh.{LFICODE}.apihub.openfinance.ae'
const CM_DOC = '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api'
const HH_DOC = '/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api'

// Cross-cutting consent-lifecycle operations every LFI certifies, whichever data
// endpoints it exposes. All are calls the LFI makes to the API Hub Consent
// Manager, except the cancelled-authorization scenario, which the LFI drives on
// Headless Heimdall.
const lfiConsentOps: FcConsentOp[] = [
  {
    slug: 'get-consent-by-id',
    title: 'Get consent by ConsentId',
    method: 'GET',
    path: '/consents/{consentId}',
    baseUrlTemplate: CONSENT_MANAGER_BASE,
    scenario:
      'Retrieve a single consent from the API Hub Consent Manager by its consentId and confirm its status.',
    docHref: `${CM_DOC}/consents-consentId`,
  },
  {
    slug: 'get-consents-by-psu',
    title: 'Get consents by end user',
    method: 'GET',
    path: '/psu/{userId}/consents',
    baseUrlTemplate: CONSENT_MANAGER_BASE,
    scenario:
      'Retrieve every consent associated with an end user from the Consent Manager, matched on the psuIdentifiers.userId.',
    docHref: `${CM_DOC}/psu-userId-consents`,
  },
  {
    slug: 'revoke-consent',
    title: 'Revoke consent',
    method: 'POST',
    path: '/consents/{consentId}/action/revoke',
    baseUrlTemplate: CONSENT_MANAGER_BASE,
    scenario:
      'Revoke a consent via the Consent Manager revoke action (revokedBy LFI or LFI.InitiatedByUser) — this also revokes the associated access and refresh tokens.',
    docHref: `${CM_DOC}/consents-consentId-action-revoke`,
  },
  {
    slug: 'suspend-consent',
    title: 'Suspend consent',
    method: 'PATCH',
    path: '/consents/{consentId}',
    baseUrlTemplate: CONSENT_MANAGER_BASE,
    scenario:
      'Suspend a consent by patching its status to Suspended on the Consent Manager (pending further enquiries).',
    docHref: `${CM_DOC}/patch-consents-consentId`,
  },
  {
    slug: 'cancelled-authorization',
    title: 'Cancelled authorization (do-fail)',
    method: 'POST',
    path: '/auth/{interactionId}/doFail',
    baseUrlTemplate: HEIMDALL_BASE,
    scenario:
      'End an authorization interaction with a failure on Headless Heimdall when the customer cancels — returning the error and error_description the API Hub relays back to the TPP.',
    docHref: `${HH_DOC}/auth-interactionId-doFail`,
    captureErrorDetails: true,
  },
]

// Per-Ozone-path annotations: the permission(s) that authorise the endpoint and
// the TPP-facing (API Hub resource server) path a TPP calls through the Hub.
// TPP-facing paths mirror the Ozone Connect paths except that Ozone Connect's
// customer endpoints surface as `/parties` on the TPP standards API, and account
// product configuration has no direct TPP-facing equivalent (tppPath omitted).
const ANNOTATIONS: Record<string, { permissions: string[]; tppPath?: string }> = {
  '/accounts': { permissions: ['ReadAccountsBasic', 'ReadAccountsDetail'], tppPath: '/accounts' },
  '/accounts/{AccountId}': { permissions: ['ReadAccountsBasic', 'ReadAccountsDetail'], tppPath: '/accounts/{AccountId}' },
  '/accounts/{AccountId}/balances': { permissions: ['ReadBalances'], tppPath: '/accounts/{AccountId}/balances' },
  '/accounts/{AccountId}/beneficiaries': { permissions: ['ReadBeneficiariesBasic', 'ReadBeneficiariesDetail'], tppPath: '/accounts/{AccountId}/beneficiaries' },
  '/customer': { permissions: ['ReadPartyUser', 'ReadPartyUserIdentity'], tppPath: '/parties' },
  '/accounts/{AccountId}/customer': { permissions: ['ReadParty'], tppPath: '/accounts/{AccountId}/parties' },
  '/accounts/{AccountId}/direct-debits': { permissions: ['ReadDirectDebits'], tppPath: '/accounts/{AccountId}/direct-debits' },
  '/accounts/{AccountId}/products': { permissions: ['ReadProduct', 'ReadProductFinanceRates'] },
  '/accounts/{AccountId}/scheduled-payments': { permissions: ['ReadScheduledPaymentsBasic', 'ReadScheduledPaymentsDetail'], tppPath: '/accounts/{AccountId}/scheduled-payments' },
  '/accounts/{AccountId}/standing-orders': { permissions: ['ReadStandingOrdersBasic', 'ReadStandingOrdersDetail'], tppPath: '/accounts/{AccountId}/standing-orders' },
  '/accounts/{AccountId}/statements': { permissions: ['ReadStatements'], tppPath: '/accounts/{AccountId}/statements' },
  '/accounts/{AccountId}/transactions': { permissions: ['ReadTransactionsBasic', 'ReadTransactionsDetail'], tppPath: '/accounts/{AccountId}/transactions' },
}

// Shared across the LFI and TPP Bank Data Sharing areas — same endpoint set,
// permissions, and TPP-facing mapping.
export const bankDataSharingEndpoints: FcEndpoint[] = ozoneConnectEndpoints
  .filter((e) => e.sectionSlug === 'data-sharing' && e.version === 'v2.1')
  .map((e): FcEndpoint => {
    const ann = ANNOTATIONS[e.path]
    if (!ann) {
      // A registry endpoint with no annotation means the spec gained an endpoint
      // this config hasn't been updated for. Fail loudly rather than ship a
      // checklist row with no permission mapping.
      throw new Error(
        `[functional-certification] Bank Data Sharing endpoint ${e.path} has no permission annotation. ` +
          `Add it to ANNOTATIONS in src/data/functional-certification/bank-data-sharing.ts.`,
      )
    }
    return {
      slug: e.slug,
      method: e.method,
      ozonePath: e.path,
      title: e.title,
      permissions: ann.permissions,
      ...(ann.tppPath ? { tppPath: ann.tppPath } : {}),
    }
  })

export const bankDataSharingArea: FcArea = {
  key: 'bank-data-sharing',
  label: 'Bank Data Sharing',
  apiName: 'Account Information',
  certType: 'LFI Functional Certification Evidence',
  tppBaseUrlTemplate:
    'https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/account-information/{VERSION}',
  segments: ['Retail', 'SME', 'Corporate'],
  sandboxEvidenceHref: '/tech/lfi-api-hub/getting-started/',
  endpoints: bankDataSharingEndpoints,
  consentOps: lfiConsentOps,
}
