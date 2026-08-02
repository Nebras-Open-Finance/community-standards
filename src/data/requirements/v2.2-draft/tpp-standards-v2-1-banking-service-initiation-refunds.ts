import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Payment Refunds — Requirements',
  version: 'v2.2-draft',
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
        { field: 'Account state', rule: 'The debtor account must not be blocked from receiving payments. <br> If the account is blocked for a temporary reason (e.g. account status is <code>Suspended</code>, or the account is otherwise unable to receive a credit transaction refund on a transient basis), the response will be <code>403</code> with <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The debtor account is blocked from receiving payments.</code> <br> If the account is blocked permanently (e.g. account status is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code>), the response will be <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The debtor account is blocked from receiving payments.</code>', validatedBy: 'LFI' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
      ],
    },
  ],
}
