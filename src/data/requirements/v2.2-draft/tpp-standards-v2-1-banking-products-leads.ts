import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Products and Leads — Requirements',
  version: 'v2.2-draft',
  readTime: '2 min',
  lede: 'The <a href="./user-journeys">User Journeys</a> must be adhered to.',
  preconditions: 'The tables below list the validation rules and operational requirements that apply to Products and Leads. The <strong>Validated by</strong> column indicates where each rule is enforced. All requests require an active <a href="/tech/tpp-standards/trust-framework/application">Trust Framework application</a> with the <strong>BDSP</strong> role, a valid <a href="/tech/tpp-standards/trust-framework/certificates">transport certificate</a> presented on every request via mTLS, and an active <a href="/tech/tpp-standards/security/fapi/message-signing">signing key</a> for JWT signing.',
  sections: [
    {
      id: 'retrieve-product-data',
      num: '01',
      method: 'GET',
      path: '/products',
      title: 'Retrieve Product Data',
      rules: [
        { field: '<code>Authorization</code>', rule: 'Must contain a valid Bearer access token obtained via a <code>client_credentials</code> grant with <code>products</code> scope.', validatedBy: 'API Hub' },
        { field: '<code>x-fapi-customer-ip-address</code>', rule: '<strong>Required.</strong> Must be included on every <code>GET /products</code> request to prove that the User is present in the interaction. Must be a valid IPv4 or IPv6 address.', validatedBy: 'TPP' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
        { field: 'OpenAPI schema', rule: 'The request must conform to the <a href="/tech/tpp-standards/v2.2-draft/banking/products-leads/open-api/products">GET <code>/products</code> OpenAPI schema</a>. No additional or undocumented parameters are permitted.', validatedBy: 'API Hub' },
        { field: 'Application fields (<code>ApplicationUri</code>, <code>ApplicationPhoneNumber</code>, <code>ApplicationEmail</code>, <code>ApplicationDescription</code>)', rule: '<strong>Every product returned must include at least one</strong> of the application fields, so the TPP always has a path for the end user to apply. Where multiple are populated, <code>ApplicationUri</code> is the preferred channel.', validatedBy: 'LFI' },
      ],
      blocks: [
        { kind: 'prose', html: 'The Products API does not require user consent. The TPP authenticates using a client credentials grant and calls each LFI individually. All LFI <code>GET /products</code> requests must be made in parallel unless the User has specifically filtered out (de-selected) individual LFIs.' },
      ],
    },
    {
      id: 'submit-a-lead',
      num: '02',
      method: 'POST',
      path: '/leads',
      title: 'Submit a Lead',
      rules: [
        { field: '<code>Authorization</code>', rule: 'Must contain a valid Bearer access token obtained via a <code>client_credentials</code> grant with <code>products</code> scope.', validatedBy: 'API Hub' },
        { field: '<code>x-fapi-customer-ip-address</code>', rule: '<strong>Required.</strong> Must be included on every <code>POST /leads</code> request. Must be a valid IPv4 or IPv6 address.', validatedBy: 'TPP' },
        { field: '<code>x-fapi-interaction-id</code>', rule: 'Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible.', validatedBy: 'N/A' },
        { field: 'OpenAPI schema', rule: 'The request must conform to the <a href="/tech/tpp-standards/v2.2-draft/banking/products-leads/open-api/leads">POST <code>/leads</code> OpenAPI schema</a>.', validatedBy: 'API Hub' },
      ],
      blocks: [
        { kind: 'prose', html: 'The Leads API allows a TPP to refer a User to a specific LFI when the User wishes further information about a specific product or wishes the LFI to contact them.' },
      ],
    },
  ],
}
