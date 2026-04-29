// To add a release: append entries with the same `release` value, incrementing
// `number` per entry within that release. New calendar years are picked up
// automatically from `apiHubYears` by the SSG path enumeration.

export type ReleaseAudience = 'TPP' | 'LFI' | 'Both'

// `path` is relative to the standards root, no leading slash. URL resolves to:
//   versioned !== false → /tech/{target}/{version}/{path}   (default)
//   versioned === false → /tech/{target}/{path}
// Use versioned: false for areas outside the per-version tree (security/,
// trust-framework/, registration/, sandbox/, production/).
export interface ReleaseSectionRef {
  label: string
  path: string
  target?: 'tpp' | 'lfi'
  versioned?: boolean
}

export interface ReleaseEndpoint {
  label: string
  path: string
  target?: 'tpp' | 'lfi'
  versioned?: boolean
}

export interface ReleaseEntry {
  release: string                      // '2026.13.1'
  effectiveDate: string                // ISO, e.g. '2026-04-20'
  number: number                       // sequence within the release (1, 2, …)
  title: string
  summary: string                      // one-line hook
  description: string                  // prose, \n\n for paragraph breaks
  impact: string                       // who must act, and what changes
  audience: ReleaseAudience
  areas: string[]                      // functional area facet, e.g. ['Service Initiation']
  sections?: ReleaseSectionRef[]       // docs pages the entry relates to
  endpoints?: ReleaseEndpoint[]
}

// Canonical functional-area labels — single source prevents drift like
// 'Data Sharing' vs 'Bank Data Sharing' across entries.
export const AREAS = {
  dataSharing: 'Data Sharing',
  serviceInitiation: 'Service Initiation',
  confirmationOfPayee: 'Confirmation of Payee',
  consent: 'Consent',
  tokens: 'Tokens & Authorization',
  webhooks: 'Webhooks',
  productsLeads: 'Products & Leads',
  atms: 'ATMs',
  sandbox: 'Sandbox',
} as const

export const API_HUB_RELEASES: ReleaseEntry[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 2026.13.1 — 20 April 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2026.13.1',
    effectiveDate: '2026-04-20',
    number: 1,
    title: 'Refresh token support for multi-authorization on Single Instant Payments',
    summary:
      'TPPs can now use the refresh token issued at initial authorization to submit a Single Instant Payment after all authorizers complete.',
    description:
      'Added refresh token support to the Single Instant Payment flow when used under Multi-Authorization.\n\n' +
      'Previously, the access token issued at initial authorization expired after 10 minutes. In a multi-authorization journey the final authorizer can act much later than this, so by the time the consent reached Status=Authorized the TPP no longer held a valid access token to call POST /payments. This effectively blocked Single Instant Payments from being used with multi-authorization consents.\n\n' +
      'TPPs can now use the refresh token issued at initial authorization to obtain a fresh access token and submit the payment once all authorizers have completed their step.',
    impact:
      'TPPs intending to use Single Instant Payments under multi-authorization consents must implement refresh token handling. TPPs that only use single-authorizer SIP are unaffected.',
    audience: 'TPP',
    areas: [AREAS.serviceInitiation, AREAS.tokens],
    sections: [
      { label: 'Tokens & Assertions', path: 'security/tokens', versioned: false },
      { label: 'Single Instant Payment', path: 'banking/service-initiation/domestic-payments/single-instant-payment/api-guide' },
      { label: 'Multi Authorization', path: 'banking/service-initiation/multi-authorization' },
    ],
    endpoints: [
      { label: 'POST /token', path: 'security/tokens/open-api/token', versioned: false },
      { label: 'POST /payments', path: 'banking/service-initiation/open-api/payments' },
    ],
  },
  {
    release: '2026.13.1',
    effectiveDate: '2026-04-20',
    number: 2,
    title: 'Corrected response mapping for GET /beneficiaries',
    summary:
      'The response for GET /accounts/{AccountId}/beneficiaries now preserves the full AEBeneficiary payload sent by the LFI.',
    description:
      'Corrected the response mapping for GET /accounts/{AccountId}/beneficiaries to align with the TPP-facing specification.\n\n' +
      'Previously, fields such as CreditorAccount and AccountHolderName were dropped from the response sent to the TPP, even though the LFI returned them on its Ozone Connect endpoint. The mapping between Ozone Connect responses and TPP-facing responses has been corrected so the full AEBeneficiary payload is preserved.',
    impact:
      'TPPs now receive the complete AEBeneficiary record — including CreditorAccount, AccountHolderName, AccountHolderShortName, Reference, CreditorAgent, and SupplementaryData — as defined in the spec. No TPP changes are required to consume the additional fields.',
    audience: 'TPP',
    areas: [AREAS.dataSharing],
    sections: [
      { label: 'Bank Data Sharing', path: 'banking/data-sharing' },
    ],
    endpoints: [
      { label: 'GET /accounts/{AccountId}/beneficiaries', path: 'banking/data-sharing/open-api/accounts-AccountId-beneficiaries' },
    ],
  },
  {
    release: '2026.13.1',
    effectiveDate: '2026-04-20',
    number: 3,
    title: 'Corrected response mapping for GET /standing-orders',
    summary:
      'The response for GET /accounts/{AccountId}/standing-orders now preserves the full standing order payload sent by the LFI.',
    description:
      'Corrected the response mapping for GET /accounts/{AccountId}/standing-orders to align with the TPP-facing specification.\n\n' +
      'Previously, fields such as CreditorAccount and AccountHolderName were dropped from the response sent to the TPP, even though the LFI returned them on its Ozone Connect endpoint. The mapping between Ozone Connect responses and TPP-facing responses has been corrected so the full standing order payload is preserved.',
    impact:
      'TPPs now receive CreditorAccount, AccountHolderName, and the other standing order fields as defined in the spec. No TPP changes are required to consume the additional fields.',
    audience: 'TPP',
    areas: [AREAS.dataSharing],
    sections: [
      { label: 'Bank Data Sharing', path: 'banking/data-sharing' },
    ],
    endpoints: [
      { label: 'GET /accounts/{AccountId}/standing-orders', path: 'banking/data-sharing/open-api/accounts-AccountId-standing-orders' },
    ],
  },
  {
    release: '2026.13.1',
    effectiveDate: '2026-04-20',
    number: 4,
    title: 'Corrected Sandbox Model Bank behaviour for pre-populated Debtor Account',
    summary:
      'A valid pre-populated DebtorAccount is now accepted by the Sandbox Model Bank during the authorisation journey.',
    description:
      'Corrected Sandbox Model Bank behaviour when the TPP supplies a valid Initiation.DebtorAccount in the PAR request for a Single Instant Payment or Multi Payment consent.\n\n' +
      'Previously, the Sandbox Model Bank incorrectly rejected the consent during the authorisation journey even when the supplied DebtorAccount was a valid IBAN held by the test PSU. This deviated from the Debtor Account validation rules — a valid pre-populated account should be accepted and used as the source account for the payment.\n\n' +
      'The Sandbox Model Bank now accepts a valid pre-populated DebtorAccount and proceeds with the consent journey as specified.',
    impact:
      'TPPs testing pre-populated DebtorAccount flows in the Sandbox can now exercise both Single Instant Payment and Multi Payment journeys end-to-end. Production behaviour is unchanged.',
    audience: 'TPP',
    areas: [AREAS.serviceInitiation, AREAS.sandbox],
    sections: [
      { label: 'Debtor Account', path: 'banking/service-initiation/personal-identifiable-information/debtor-account' },
      { label: 'Single Instant Payment', path: 'banking/service-initiation/domestic-payments/single-instant-payment/api-guide' },
      { label: 'Variable On Demand', path: 'banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide' },
    ],
  },
  {
    release: '2026.13.1',
    effectiveDate: '2026-04-20',
    number: 5,
    title: 'Account Information v2.1 consent response schema tightening',
    summary:
      'Consent response validation has been tightened to enforce the flat Permissions structure defined by v2.1.',
    description:
      'Tightened response validation for Account Access Consent endpoints to bring the API Hub in line with the v2.1 specification.\n\n' +
      'Previously, the API Hub permitted an additional array nested inside the Permissions field on consent responses. This was never valid per the spec, but the loose validation allowed it through. Validation has now been tightened to remove the extra array and enforce the strict Permissions structure defined in the spec.',
    impact:
      'No real-world impact — this is a validation tightening on a malformed structure that was technically possible to send before. Functional behaviour and the documented schema are unchanged.',
    audience: 'TPP',
    areas: [AREAS.consent, AREAS.dataSharing],
    sections: [
      { label: 'Consent — API Guide', path: 'consent/api-guide' },
    ],
    endpoints: [
      { label: 'GET /account-access-consents', path: 'consent/open-api/account-access-consents' },
      { label: 'GET /account-access-consents/{ConsentId}', path: 'consent/open-api/account-access-consents-ConsentId' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2026.07.0 — 11 March 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2026.07.0',
    effectiveDate: '2026-03-11',
    number: 1,
    title: 'V2.1 Banking API families enabled end-to-end',
    summary:
      'Every v2.1 Banking endpoint is live in the API Hub and available for TPPs and LFIs to integrate against.',
    description:
      'Every Banking endpoint defined in v2.1 of the UAE Open Finance standard is now live in the API Hub and available for TPPs and LFIs to integrate and test against. This covers:\n\n' +
      '- Data Sharing — accounts, balances, transactions, beneficiaries, standing orders, scheduled payments, direct debits, statements, customer, and product endpoints.\n' +
      '- Service Initiation — Single Instant Payment, all Multi Payment variants (variable/fixed × on-demand/periodic/defined schedules), refunds, multi-authorization, and PII handling.\n' +
      '- Confirmation of Payee — POST /customers/action/cop-query.\n' +
      '- Products & Leads — GET /products, POST /leads.\n' +
      '- ATMs — GET /atm.\n\n' +
      'The release spans all three layers required for an end-to-end v2.1 journey:\n\n' +
      '- TPP-facing standards exposed by the API Hub at the rs1.* resource server.\n' +
      '- Ozone Connect endpoints that LFIs implement to serve data and execute payments.\n' +
      '- API Hub Consent Manager updates needed to support the v2.1 consent and payment lifecycle.\n\n' +
      'The full request/response mapping between Ozone Connect and the TPP-facing standards is in place for every endpoint in the families above.',
    impact:
      'TPPs can begin integrating against any v2.1 Banking endpoint through the API Hub. LFIs can implement, deploy, and certify their Ozone Connect endpoints against the live Hub.',
    audience: 'Both',
    areas: [
      AREAS.dataSharing,
      AREAS.serviceInitiation,
      AREAS.confirmationOfPayee,
      AREAS.productsLeads,
      AREAS.atms,
    ],
    sections: [
      { label: 'Bank Data Sharing', path: 'banking/data-sharing' },
      { label: 'Service Initiation', path: 'banking/service-initiation/' },
      { label: 'Confirmation of Payee', path: 'banking/confirmation-of-payee' },
      { label: 'Products & Leads', path: 'banking/products-leads/' },
      { label: 'ATMs', path: 'banking/atms' },
    ],
  },
]

export function yearOf(release: string): string {
  return release.split('.')[0] ?? ''
}

export function entriesForYear(year: string): ReleaseEntry[] {
  return API_HUB_RELEASES
    .filter((e) => yearOf(e.release) === year)
    .slice()
    .sort((a, b) => {
      if (a.release !== b.release) return b.release.localeCompare(a.release) // newest first
      return a.number - b.number
    })
}

export function anchorFor(entry: ReleaseEntry): string {
  const safeRelease = entry.release.replace(/\./g, '-')
  return `release-${safeRelease}-${entry.number}`
}

export const apiHubYears: string[] = [
  ...new Set(API_HUB_RELEASES.map((e) => yearOf(e.release))),
].sort()
