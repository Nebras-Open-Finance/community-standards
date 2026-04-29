import type { RequirementsPageData } from './types'

export const data: RequirementsPageData = {
  title: 'Confirmation of Payee — Requirements',
  version: 'v2.1',
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
        { field: 'OpenAPI schema', rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery">POST <code>/discovery</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: 'API Hub' },
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
        { field: 'OpenAPI schema', rule: 'The request must conform exactly to the <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation">POST <code>/confirmation</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: 'API Hub' },
        { field: 'IBAN not recognised', rule: 'If the IBAN is not recognised, the response will be <code>204</code> with no body.', validatedBy: 'LFI' },
        { field: 'Account state', rule: 'The account identified by the IBAN must not be blocked from receiving payments. If the account is blocked for a temporary reason (e.g. account status is <code>Suspended</code>), the response will be <code>403</code> with <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The account is blocked from receiving payments.</code> If the account is blocked permanently (e.g. account status is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code>), the response will be <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is blocked from receiving payments.</code>', validatedBy: 'LFI' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
      ],
    },
  ],
}
