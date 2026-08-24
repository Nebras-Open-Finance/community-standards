import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'ATMs — Requirements',
  version: 'v2.2-rc1',
  readTime: '2 min',
  lede: 'The tables below list the validation rules that apply to the ATM API. The <strong>Validated by</strong> column indicates where each rule is enforced.',
  preconditions: 'All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>BDSP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, and an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing.',
  sections: [
    {
      id: 'list-atms',
      num: '01',
      method: 'GET',
      path: '/atms',
      title: 'List Atms',
      rules: [
        { field: '<code>Authorization</code>', rule: 'Must contain a valid Bearer access token obtained via a <code>client_credentials</code> grant with the <code>atm</code> scope.', validatedBy: 'API Hub' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
      ],
    },
  ],
}
