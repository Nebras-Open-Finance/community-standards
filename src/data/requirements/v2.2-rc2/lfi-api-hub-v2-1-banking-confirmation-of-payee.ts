import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Confirmation of Payee — Requirements',
  version: 'v2.2-rc2',
  readTime: '2 min',
  lede: 'The <a href="./user-journeys">User Journeys</a> for this service also apply and must be adhered to.',
  preconditions: 'The tables below list the rules that apply to Confirmation of Payee. The Hub receives and validates the TPP\'s request, then calls your Ozone Connect <a href="/tech/lfi-api-hub/v2.2-rc2/banking/confirmation-of-payee/open-api/cop-query"><code>POST /customers/action/cop-query</code></a> endpoint with the IBAN alone. You are responsible for returning the name(s) you hold against that account, accurately — the Hub performs the name matching.',
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
            { cells: ['1', 'Any request', 'Look the account up by <code>data.account.identification</code> (the IBAN). The request carries no name from v2.2, so there is nothing to compare against: you <strong>must not</strong> attempt to match, and <strong>must not</strong> filter, rank, or omit holders on any basis. The Hub owns the matching rules and applies them to what you return.'] },
            { cells: ['2', 'Account found, holder not opted out', 'Return <code>200</code> with a <code>data</code> array containing <strong>one entry per account holder</strong> — a joint account returns one entry per holder, in any order. Each entry carries <code>id</code>, <code>name</code> and <code>accountStatus</code>. For personal accounts, <code>name.fullName</code> is mandatory; <code>givenName</code>, <code>middleName</code>, <code>familyName</code> and <code>alsoKnownAs</code> are optional — supply them where held separately. For business accounts, populate <code>name.businessName</code>; <code>alsoKnownAs</code> is optional.'] },
            { cells: ['3', 'Account found, holder not opted out', 'Populate <code>accountStatus</code> on every entry with the status of the account, using the same code set as <code>status</code> on <code>GET /accounts/{accountId}</code>: <code>Active</code>, <code>Inactive</code>, <code>Dormant</code>, <code>Unclaimed</code>, <code>Deceased</code>, <code>Suspended</code> or <code>Closed</code>. A joint account <strong>must</strong> return the same value on every entry. The Hub returns it to the TPP as <code>AccountStatus</code>.'] },
            { cells: ['4', 'Any response', 'Return name data and account status only. The <code>verifiedClaims</code> / <code>verification</code> envelope and the wider customer data it carried in v2.1 — <code>emiratesId</code>, <code>birthDate</code>, <code>nationality</code>, <code>residentialAddress</code>, <code>salary</code>, and the rest — are removed from this operation and <strong>must not</strong> be sent. Confirmation of Payee is not carried out under a consent.'] },
            { cells: ['5', 'IBAN not recognised at this LFI', 'Return <code>200</code> with an empty <code>data</code> array. Do not use <code>204</code>, <code>404</code>, <code>201</code>, or <code>202</code>.'] },
            { cells: ['6', 'Account is blocked from receiving payments — temporary', 'Return <code>403</code> with <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The account is blocked from receiving payments.</code> Applies when the block is temporary — e.g. account status is <code>Suspended</code>.'] },
            { cells: ['7', 'Account is blocked from receiving payments — permanent', 'Return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The account is blocked from receiving payments.</code> Applies when the block is permanent — e.g. account status is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code>.'] },
            { cells: ['8', 'Account holder has opted out of CoP', 'Return <code>200</code> with an empty <code>data</code> array.'] },
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
            { cells: ['3', 'When an account holder has opted out, the LFI must return no data in the response — i.e. <code>200</code> with an empty <code>data</code> array (see row 8 of the table above).'] },
          ],
        } },
      ],
    },
  ],
}
