import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Confirmation of Payee — Requirements',
  version: 'v2.2-rc2',
  readTime: '2 min',
  lede: 'The <a href="./user-journeys">User Journeys</a> for this service also apply and must be adhered to.',
  preconditions: 'The tables below list the validation rules that apply to Confirmation of Payee. The <strong>Validated by</strong> column indicates where each rule is enforced. All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>BSIP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, and an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing.',
  sections: [
    {
      id: 'mandatory-cop-requirement',
      num: '01',
      title: 'Mandatory CoP Requirement',
      blocks: [
        { kind: 'prose', html: 'For all Open Finance account-to-account transfers where the creditor is unknown to the TPP — for example, entered by the customer at the time of payment — a Confirmation of Payee request <strong>must</strong> be made prior to consent creation, provided the receiving bank supports the CoP service. A creditor is considered unknown when the TPP does not already hold a verified record of the payee (for example, a pre-enrolled beneficiary confirmed by a prior successful CoP check). Where CoP has been performed, the full raw JWS response from the <code>/confirmation</code> endpoint must be included in the <code>ConfirmationOfPayeeResponse</code> field of the creditor entry in the payment consent PII.' },
      ],
    },
    {
      id: 'payee-discovery',
      num: '02',
      method: 'POST',
      path: '/discovery',
      title: 'Payee Discovery',
      rules: [
        { field: '<code>Authorization</code>', rule: 'Must contain a valid Bearer access token obtained via a <code>client_credentials</code> grant with the <code>confirmation-of-payee</code> scope.', validatedBy: 'API Hub' },
        { field: 'Request body', rule: 'Must be a compact signed JWT (<code>Content-Type: application/jwt</code>).', validatedBy: 'API Hub' },
        { field: '<code>message.Data.Identification</code>', rule: 'Required. Must be a valid UAE IBAN.', validatedBy: 'API Hub' },
        { field: '<code>message.Data.AccountType</code>', rule: 'Optional. Where supplied, must be one of <code>Retail</code>, <code>SME</code> or <code>Corporate</code>. Should be supplied where the TPP knows the account type: only the confirmation sources for that account type are then returned.', validatedBy: 'API Hub' },
        { field: 'OpenAPI schema', rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.2-rc2/banking/confirmation-of-payee/open-api/discovery">POST <code>/discovery</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: 'API Hub' },
        { field: '<code>Data.ConfirmationSource</code> in response', rule: 'Carries one or more confirmation sources, in the order they should be tried. Each source is one API Hub tenant of the LFI identified by the bank code in the IBAN. The TPP must read the array and must not assume that a single source is returned.', validatedBy: 'TPP' },
        { field: 'More than one source', rule: 'Where more than one source is returned, the TPP should call <code>/confirmation</code> against each source in the order returned until one responds with <code>200</code>. A <code>204</code> from a source means that source does not hold the account. <a href="/tech/tpp-standards/trust-framework/api-discovery">Participants discovery</a> is how a TPP determines which LFIs expose confirmation for all their segments and which expose it segment by segment.', validatedBy: 'TPP' },
        { field: 'No source resolved', rule: 'If the IBAN cannot be paired with an LFI that offers Confirmation of Payee or, where <code>AccountType</code> is supplied, the LFI offers no source for that account type, the response will be <code>204</code> with no body.', validatedBy: 'API Hub' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
      ],
    },
    {
      id: 'name-match',
      num: '03',
      method: 'POST',
      path: '/confirmation',
      title: 'Name Match',
      rules: [
        { field: '<code>Authorization</code>', rule: 'Must contain a valid Bearer access token obtained via a <code>client_credentials</code> grant with the <code>confirmation-of-payee</code> scope.', validatedBy: 'API Hub' },
        { field: 'Request body', rule: 'Must be a compact signed JWT (<code>Content-Type: application/jwt</code>).', validatedBy: 'API Hub' },
        { field: '<code>message.Data.Identification</code>', rule: 'Required. Must be a valid UAE IBAN.', validatedBy: 'API Hub' },
        { field: '<code>ConfirmationOfPayeeResponse</code> in PII', rule: 'Where CoP has been performed, the full raw JWS response string from <code>/confirmation</code> must be included in the <code>ConfirmationOfPayeeResponse</code> field of the creditor entry in the payment consent PII.', validatedBy: 'TPP' },
        { field: 'OpenAPI schema', rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.2-rc2/banking/confirmation-of-payee/open-api/confirmation">POST <code>/confirmation</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: 'API Hub' },
        { field: 'IBAN not recognised', rule: 'If the source does not hold the account, the response will be <code>204</code> with no body. Where discovery returned more than one source, the TPP should try the next source.', validatedBy: 'LFI' },
        { field: 'Account state', rule: 'An account that is not <code>Active</code> is not reported as an error. The confirmation response is returned whatever the account\'s status, and <code>Data.AccountStatus</code> carries that status — as <code>Status</code> does on <code>GET /accounts</code>. A <code>403</code> is no longer returned because the account is blocked from receiving payments; the account\'s state is conveyed by <code>Data.AccountStatus</code> instead.', validatedBy: 'LFI' },
        { field: '<code>Data.AccountStatus</code> in response', rule: 'Always present on a confirmation response, alongside <code>NameMatchIndicator</code>. Carries the status of the account at the LFI, using the statuses that apply to current and savings accounts: <code>Active</code>, <code>Inactive</code>, <code>Dormant</code>, <code>Unclaimed</code>, <code>Deceased</code>, <code>Suspended</code> or <code>Closed</code>, with the same meanings as <code>Status</code> on the account resource. The value is supplied by the LFI; a joint account carries a single value.', validatedBy: 'API Hub' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
      ],
    },
  ],
}
