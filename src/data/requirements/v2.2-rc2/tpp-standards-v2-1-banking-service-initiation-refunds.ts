import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Payment Refunds — Requirements',
  version: 'v2.2-rc2',
  readTime: '2 min',
  lede: 'The tables below list the validation rules that apply to the Payment Refunds API. The <strong>Validated by</strong> column indicates where each rule is enforced.',
  preconditions: 'All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>BSIP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, and an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing.',
  sections: [
    {
      id: 'retrieve-refund-account',
      num: '01',
      method: 'GET',
      path: '/payment-consents/{ConsentId}/refund',
      title: 'Retrieve Refund Account',
      rules: [
        { field: '<code>Authorization</code>', rule: 'Must contain a valid Bearer access token obtained via a <code>client_credentials</code> grant with the <code>payments</code> scope.', validatedBy: 'API Hub' },
        { field: '<code>ConsentId</code> (path)', rule: 'The consent record linked to the <code>ConsentId</code> must include the <code>ReadRefundAccount</code> permission.', validatedBy: 'API Hub' },
        { field: 'Account state', rule: 'An account that is not <code>Active</code> is not reported as an error. The refund account is returned whatever its status, and <code>Data.AccountStatus</code> carries that status — as <code>Status</code> does on <code>GET /accounts</code>. A <code>403</code> is no longer returned because the debtor account is blocked from receiving payments; the account\'s state is conveyed by <code>Data.AccountStatus</code> instead.', validatedBy: 'LFI' },
        { field: '<code>Data.AccountStatus</code> in response', rule: 'Always present on a refund response, alongside <code>RefundAccount</code>. Carries the status of the refund account at the LFI, using the statuses that apply to current and savings accounts: <code>Active</code>, <code>Inactive</code>, <code>Dormant</code>, <code>Unclaimed</code>, <code>Deceased</code>, <code>Suspended</code> or <code>Closed</code>, with the same meanings as <code>Status</code> on the account resource. The value is supplied by the LFI.', validatedBy: 'API Hub' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
      ],
    },
  ],
}
