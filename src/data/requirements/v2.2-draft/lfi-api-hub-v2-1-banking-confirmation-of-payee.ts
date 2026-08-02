import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Confirmation of Payee — Requirements',
  version: 'v2.2-draft',
  readTime: '2 min',
  lede: 'The <a href="./user-journeys">User Journeys</a> for this service also apply and must be adhered to.',
  preconditions: 'The tables below list the rules that apply to Confirmation of Payee. The Hub receives and validates the TPP\'s request, then calls your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-draft/banking/confirmation-of-payee/open-api/cop-query"><code>POST /customers/action/cop-query</code></a> endpoint. You are responsible for returning accurate customer data — the Hub performs name matching.',
  sections: [
    {
      id: 'create-cop-query',
      num: '01',
      method: 'POST',
      path: '/customers/action/cop-query',
      title: 'Create Cop Query',
      blocks: [
        { kind: 'table', table: {
          headers: ['#', 'Condition', 'Rule'],
          rows: [
            { cells: ['1', 'Account found, holder not opted out', 'Return <code>200</code> with a <code>data</code> array containing the account holder\'s customer record(s). For personal accounts, <code>verifiedClaims[].claims.fullName</code> is mandatory; include <code>givenName</code> and <code>familyName</code> if held separately. For business accounts, populate <code>verifiedClaims[].organisationClaims.name</code> with the registered business name. Joint accounts may return multiple records.'] },
            { cells: ['2', 'IBAN not recognised at this LFI', 'Return <code>200</code> with an empty <code>data</code> array.'] },
            { cells: ['3', 'Account is blocked from receiving payments — temporary', 'Return <code>403</code> with <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The account is blocked from receiving payments.</code> Applies when the block is temporary — e.g. account status is <code>Suspended</code>.'] },
            { cells: ['4', 'Account is blocked from receiving payments — permanent', 'Return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is blocked from receiving payments.</code> Applies when the block is permanent — e.g. account status is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code>.'] },
            { cells: ['5', 'Account holder has opted out of CoP', 'Return <code>200</code> with an empty <code>data</code> array.'] },
          ],
        } },
      ],
    },
    {
      id: 'opt-out',
      num: '02',
      title: 'Opt-out',
      blocks: [
        { kind: 'table', table: {
          headers: ['#', 'Rule'],
          rows: [
            { cells: ['1', 'LFIs <strong>must not</strong> provide users with a general opt-out option for the CoP service. Opt-out is only permitted in exceptional circumstances — for example, where the account holder is a national or Emirati leader or their immediate family.'] },
            { cells: ['2', 'The opt-out process is not defined by the Open Finance Framework. LFIs must implement opt-out as part of their own BAU processes.'] },
            { cells: ['3', 'When an account holder has opted out, the LFI must return no data in the response — i.e. <code>200</code> with an empty <code>data</code> array (see row 5 of the table above).'] },
          ],
        } },
      ],
    },
  ],
}
