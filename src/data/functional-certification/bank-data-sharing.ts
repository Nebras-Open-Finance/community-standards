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
import type { FcArea, FcEndpoint } from './types'

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

const endpoints: FcEndpoint[] = ozoneConnectEndpoints
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
  sandboxEvidenceHref: '/tech/tpp-standards/sandbox/model-bank',
  endpoints,
}
