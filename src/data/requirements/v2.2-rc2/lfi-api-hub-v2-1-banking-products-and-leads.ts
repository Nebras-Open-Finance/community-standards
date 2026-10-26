import type { RequirementsPageData } from '../types'

const SPEC = '/tech/lfi-api-hub/v2.2-rc2/banking/products-and-leads/open-api'

export const data: RequirementsPageData = {
  title: 'Products & Leads — Requirements',
  version: 'v2.2-rc2',
  readTime: '6 min',
  lede: 'The rules your Ozone Connect <a href="' + SPEC + '/products"><code>GET /products</code></a> and <a href="' + SPEC + '/leads"><code>POST /leads</code></a> endpoints must follow. Read alongside the TPP <a href="/tech/tpp-standards/v2.2-rc2/banking/products-leads/requirements">Products and Leads requirements</a>, which describe how TPPs call the API and present your products.',
  preconditions: 'Products &amp; Leads is not consent-based: a TPP holding the <strong>BDSP</strong> role calls it with a <code>client_credentials</code> token, and only while a customer is in a live session with the TPP. The API Hub validates the TPP\'s token, role, and request against the OpenAPI schema before it calls your Ozone Connect endpoints, so you do not re-validate them. The rules below cover what your endpoints must return.',
  sections: [
    {
      id: 'retrieve-products',
      num: '01',
      method: 'GET',
      path: '/products',
      title: 'Retrieve Products',
      blocks: [
        { kind: 'prose', html: 'The API Hub calls your Ozone Connect <a href="' + SPEC + '/products"><code>GET /products</code></a> endpoint on behalf of a TPP to retrieve your product catalogue.' },
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['1', 'Query filters', 'Apply the optional filters when present: <code>ProductCategory</code> returns only products of that category; <code>IsShariaCompliant</code> returns only products whose <code>IsShariaCompliant</code> matches; <code>LastUpdatedDateTime</code> returns only products updated after that date and time.'] },
            { cells: ['2', 'Sorting', 'Order the results by <code>SortField</code> (<code>LastUpdatedDateTime</code> or <code>ProductId</code>; default <code>LastUpdatedDateTime</code>) in <code>SortOrder</code> (<code>asc</code> or <code>desc</code>; default <code>asc</code>).'] },
            { cells: ['3', 'Pagination', 'The API Hub sends <code>page</code> and <code>page-size</code> on every request. Return only the requested page, and populate <code>meta.totalPages</code> and <code>meta.totalRecords</code> for the full filtered result set.'] },
            { cells: ['4', '<code>data</code>', 'Each entry in <code>data</code> MUST include <code>LFIId</code>, <code>LFIBrandId</code>, and <code>Products</code> — the products offered under that brand.'] },
            { cells: ['5', 'Required product fields', 'Every product MUST include <code>ProductId</code>, <code>ProductName</code>, and <code>ProductCategory</code>. <code>ProductId</code> MUST be unique to the product within your catalogue.'] },
            { cells: ['6', 'Category details', 'The product-type object under <code>Product</code> MUST be returned for the product\'s <code>ProductCategory</code>: <code>CurrentAccount</code> &rarr; <code>Product.CurrentAccount</code>; <code>SavingsAccount</code> &rarr; <code>Product.SavingsAccount</code>; <code>CreditCard</code> &rarr; <code>Product.CreditCard</code>; <code>Finance</code> &rarr; <code>Product.Finance</code>; <code>Mortgage</code> &rarr; <code>Product.Mortgage</code>.'] },
            { cells: ['7', 'Application fields', 'Every product MUST include at least one of <code>Links.ApplicationUri</code>, <code>Links.ApplicationPhoneNumber</code>, <code>Links.ApplicationEmail</code>, or <code>Links.ApplicationDescription</code>, so the TPP always has a way for the customer to apply. Where more than one is populated, TPPs treat <code>ApplicationUri</code> as the preferred channel.'] },
            { cells: ['8', '<code>LastUpdatedDateTime</code>', 'Populate with the date and time the product\'s information last changed, or the date it was created if it has never changed. The <code>LastUpdatedDateTime</code> filter and the default sort both depend on it.'] },
            { cells: ['9', 'Sharia-compliant products', 'Set <code>IsShariaCompliant</code> on every product so the <code>IsShariaCompliant</code> filter is accurate. Where a product has been confirmed as Sharia-compliant, populate <code>ShariaStructure</code> with its Islamic finance contract type, and <code>AlternativeBrandName</code> and <code>ShariaInformation</code> where held.'] },
            { cells: ['10', 'Data completeness', 'All fields that exist or are derivable from your systems SHOULD be populated, including the rates, charges, eligibility, and links for each product, so that TPPs can present and compare it accurately.'] },
            { cells: ['11', 'Date and time format', '<code>EffectiveFromDateTime</code>, <code>EffectiveToDateTime</code>, and <code>LastUpdatedDateTime</code> MUST carry an explicit offset (e.g. <code>2027-07-22T00:00:00Z</code>). You SHOULD emit UTC; the offset <code>-00:00</code> MUST NOT be used. Apply the offset on the <code>LastUpdatedDateTime</code> query parameter — two encodings of the same instant MUST filter identically.'] },
          ],
        } },
        { kind: 'prose', html: '<strong>Sharia-compliant product data.</strong> v2.2 adds a Sharia-compliant counterpart to each interest-based rate structure. Every field below is optional: an LFI with no Islamic products sends nothing new. Where you offer Islamic products, describe them with these fields rather than approximating them in the interest-based ones. See <a href="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-19">changelog §19</a>.' },
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['12', '<code>Product.ExpectedProfitRates</code>', 'Deposit rates for Sharia-compliant products. Each entry MUST include <code>RateType</code> (<code>FixedProfit</code> or <code>VariableProfit</code>), <code>DepositRateType</code>, and <code>RateDetails</code>, and MAY include <code>ProfitSharingRatio</code>, <code>ProfitDistributionMethod</code>, <code>ProfitDistributionFrequency</code>, and <code>Description</code>.'] },
            { cells: ['13', '<code>DepositRateType</code>', 'Use <code>ExpectedProfitRate</code> for your projected return on a profit-sharing deposit, and <code>IndicativeProfitRate</code> where the rate is illustrative only. The two are not comparable, and TPPs rely on this field to tell them apart.'] },
            { cells: ['14', '<code>Product.ShariaFinanceRates</code>', 'Finance rates for Sharia-compliant products, one entry per rate, discriminated on <code>RateType</code>: <code>FixedProfit</code>, <code>VariableProfit</code>, or <code>HybridProfit</code>. <code>ProfitCalculationMethod</code> takes <code>PrincipalBalance</code>, <code>OutstandingBalance</code>, <code>InitialDrawdownAmount</code>, <code>UnusedCreditLine</code>, or <code>UtilizedLimit</code>.'] },
            { cells: ['15', 'Charge calculation method', 'On charge components, <code>InterestCalculationMethod</code> now describes interest only. Where a charge uses an Islamic calculation method, populate <code>ProfitCalculationMethod</code> instead.'] },
            { cells: ['16', '<code>Product.TakafulRequired</code>, <code>Product.TakafulDescription</code>', 'Where a product requires Takaful cover, set <code>TakafulRequired</code> to <code>true</code> and describe the type and purpose of the cover in <code>TakafulDescription</code> (1–500 characters).'] },
          ],
        } },
      ],
    },
    {
      id: 'create-a-lead',
      num: '02',
      method: 'POST',
      path: '/leads',
      title: 'Create a Lead',
      blocks: [
        { kind: 'prose', html: 'When a customer asks to be contacted about your products, the TPP submits a lead and the API Hub forwards it to your Ozone Connect <a href="' + SPEC + '/leads"><code>POST /leads</code></a> endpoint. The API Hub does not retain the lead: once you have responded, your systems hold the only copy.' },
        { kind: 'table', table: {
          headers: ['#', 'Field', 'Rule'],
          rows: [
            { cells: ['1', 'Request', 'The request has already been validated by the API Hub against the <code>POST /leads</code> schema. <code>Name</code>, <code>Email</code>, <code>EmiratesId</code>, <code>MarketingOptOut</code>, and <code>ProductCategories</code> are always present; <code>PhoneNumber</code>, <code>Nationality</code>, <code>ResidentialAddress</code>, and <code>LeadInformation</code> are present when the customer provided them.'] },
            { cells: ['2', 'Response', 'Record the lead and respond <code>201</code>. The response <code>data</code> MUST include <code>LeadId</code>, <code>Name</code>, <code>Email</code>, <code>EmiratesId</code>, and <code>MarketingOptOut</code>.'] },
            { cells: ['3', '<code>LeadId</code>', 'A unique identifier you assign to the lead. It is returned to the TPP.'] },
            { cells: ['4', '<code>ProductCategories</code>', 'The product categories the customer is interested in. Follow up on those categories.'] },
            { cells: ['5', 'Follow-up', 'The LFI is expected to follow up with the customer within 30 days of receiving the lead.'] },
            { cells: ['6', '<code>MarketingOptOut</code>', 'Reflects the customer\'s marketing preference. Where it is <code>true</code>, use the lead\'s details only to follow up on this request, not for marketing communications.'] },
            { cells: ['7', 'Personal data constraints', 'v2.2 constrains the personal data a lead carries, and the API Hub rejects non-conforming requests before they reach you. <code>EmiratesId</code> matches <code>^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$</code> — the hyphens are optional, so the same ID can arrive in either form. <code>GivenName</code>, <code>LastName</code>, and <code>FullName</code> contain Latin letters, space, apostrophe, period, and hyphen only; <code>BusinessName</code> also allows digits, ampersand, comma, parentheses, and forward slash. <code>AddressLine</code> uses the ISO 20022 <code>PostalAddress27</code> character set.'] },
            { cells: ['8', '<code>EmiratesId</code> in the response', 'The response <code>EmiratesId</code> MUST match the same pattern. Return the value as received.'] },
          ],
        } },
      ],
    },
    {
      id: 'error-responses',
      num: '03',
      title: 'Error Responses',
      blocks: [
        { kind: 'prose', html: 'The API Hub maps your error responses to the TPP standard. Error bodies MUST carry an <code>errorCode</code> and an <code>errorMessage</code>.' },
        { kind: 'table', table: {
          headers: ['Status', 'When', 'errorCode'],
          rows: [
            { cells: ['<code>400</code>', 'A request parameter cannot be processed.', 'A prescribed code such as <code>Resource.InvalidFormat</code> or <code>Body.InvalidFormat</code>, or a namespaced code.'] },
            { cells: ['<code>500</code>', 'An internal error prevented the request from completing.', '<code>GenericRecoverableError</code> where a retry may succeed; otherwise <code>GenericError</code>.'] },
          ],
        } },
      ],
    },
  ],
}
