// Functional Certification config for Insurance Data Sharing.
//
// Like Bank Data Sharing, the endpoint list is NOT hardcoded — it is derived
// from the canonical endpoint registry (the same source that drives the API
// reference), filtered to the Ozone Connect "Insurance Data Sharing" section:
// seven insurance sectors, each with a policy-collection GET and a policy-by-id
// GET (14 endpoints). Each is annotated with the consent permission that grants
// it and its TPP-facing (API Hub resource server) path. If a future spec version
// adds or removes an Insurance Data Sharing endpoint, the registry changes, this
// checklist changes with it, and the
// `supporting/tests/functional-cert-insurance.test.mjs` guard fails until the
// registry and the fetched Ozone Connect spec agree again.
//
// Scope note: the encrypted `Premium` field (returned as a JWE and gated by
// `ReadInsurancePremium`) is certified separately and is deliberately out of
// scope here — this area certifies the policy-retrieval surface authorised by
// `ReadInsurancePolicies`. Insurance has no Retail/SME/Corporate segmentation,
// so `segments` is omitted (see FcArea in ./types.ts).

import { ozoneConnectEndpoints } from '../endpoints/ozone-connect'
import type { FcArea, FcConsentOp, FcEndpoint } from './types'

// API Hub hosts the LFI calls for consent-lifecycle operations. The Consent
// Manager (cm.*) is the single source of truth for consent state; Headless
// Heimdall (hh.*) is the authorization server the LFI drives during the customer
// authorization journey. Neither is versioned in its base path.
const CONSENT_MANAGER_BASE = 'https://cm.{LFICODE}.apihub.openfinance.ae'
const HEIMDALL_BASE = 'https://hh.{LFICODE}.apihub.openfinance.ae'
const CM_DOC = '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api'
const HH_DOC = '/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api'

// Cross-cutting consent-lifecycle operations every LFI certifies, whichever data
// endpoints it exposes — identical to Bank Data Sharing because these act on the
// consent itself (by consentId), not on any sector's data. All are calls the LFI
// makes to the API Hub Consent Manager, except the cancelled-authorization
// scenario, which the LFI drives on Headless Heimdall.
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

// The seven insurance sectors the registry defines, in the same order. Each
// contributes a policy-collection endpoint and a policy-by-id endpoint, both
// authorised by ReadInsurancePolicies for that sector and both exposed through
// the API Hub resource server at the same path.
const INSURANCE_SECTORS = [
  'employment',
  'health',
  'home',
  'life',
  'motor',
  'renters',
  'travel',
] as const

// Per-Ozone-path annotations: the permission that authorises the endpoint and
// the TPP-facing (API Hub resource server) path. Every Insurance Data Sharing
// policy endpoint is authorised by ReadInsurancePolicies (for its sector) and
// mirrors its Ozone Connect path on the TPP standards API.
const ANNOTATIONS: Record<string, { permissions: string[]; tppPath?: string }> =
  Object.fromEntries(
    INSURANCE_SECTORS.flatMap((type) => [
      [`/${type}-insurance-policies`, { permissions: ['ReadInsurancePolicies'], tppPath: `/${type}-insurance-policies` }],
      [
        `/${type}-insurance-policies/{InsurancePolicyId}`,
        { permissions: ['ReadInsurancePolicies'], tppPath: `/${type}-insurance-policies/{InsurancePolicyId}` },
      ],
    ]),
  )

// Shared across the LFI and TPP Insurance Data Sharing areas — same endpoint set,
// permissions, and TPP-facing mapping.
export const insuranceDataSharingEndpoints: FcEndpoint[] = ozoneConnectEndpoints
  .filter((e) => e.sectionSlug === 'insurance-data-sharing' && e.version === 'v2.1')
  .map((e): FcEndpoint => {
    const ann = ANNOTATIONS[e.path]
    if (!ann) {
      // A registry endpoint with no annotation means the spec gained an endpoint
      // this config hasn't been updated for. Fail loudly rather than ship a
      // checklist row with no permission mapping.
      throw new Error(
        `[functional-certification] Insurance Data Sharing endpoint ${e.path} has no permission annotation. ` +
          `Add it to ANNOTATIONS in src/data/functional-certification/insurance-data-sharing.ts.`,
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

export const insuranceDataSharingArea: FcArea = {
  key: 'insurance-data-sharing',
  label: 'Insurance Data Sharing',
  apiName: 'Insurance',
  certType: 'LFI Functional Certification Evidence',
  tppBaseUrlTemplate:
    'https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/insurance/{VERSION}',
  // Insurance has no customer segmentation — omit segments.
  sandboxEvidenceHref: '/tech/lfi-api-hub/getting-started/',
  endpoints: insuranceDataSharingEndpoints,
  consentOps: lfiConsentOps,
}
