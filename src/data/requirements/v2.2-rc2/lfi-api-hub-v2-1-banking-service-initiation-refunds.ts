import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Payment Refunds — Requirements',
  version: 'v2.2-rc2',
  readTime: '2 min',
  lede: 'The tables below list the rules that apply to the Payment Refunds endpoint. The Hub validates authorization and consent permissions before calling your Ozone Connect server — your LFI is responsible for retrieving and returning the debtor\'s account details.',
  sections: [
    {
      id: 'get-refund',
      num: '01',
      method: 'GET',
      path: '/payment-consents/{consentId}/refund',
      title: 'Get Refund',
      blocks: [
        { kind: 'table', table: {
          headers: ['#', 'Condition', 'Rule'],
          rows: [
            { cells: ['1', 'Refund account request received from Hub', 'Return <code>200</code> with a <code>data</code> object containing <code>refundAccount</code> and <code>accountStatus</code>. The <code>refundAccount</code> must include the debtor\'s <code>schemeName</code> (always <code>IBAN</code>), <code>identification</code> (the debtor\'s IBAN), and <code>name</code> (an object with <code>en</code> or <code>ar</code>).'] },
            { cells: ['2', 'Any <code>200</code> response', 'Populate <code>accountStatus</code> with the status of the account in <code>refundAccount</code>, using the statuses that apply to current and savings accounts, with the same meanings as <code>status</code> on <code>GET /accounts/{accountId}</code>: <code>Active</code>, <code>Inactive</code>, <code>Dormant</code>, <code>Unclaimed</code>, <code>Deceased</code>, <code>Suspended</code> or <code>Closed</code>. The Hub returns it to the TPP as <code>AccountStatus</code>.'] },
            { cells: ['3', 'Account not <code>Active</code>', 'Return the refund account regardless of its status, as <code>GET /accounts</code> does. An account that is <code>Inactive</code>, <code>Dormant</code>, <code>Suspended</code>, <code>Unclaimed</code>, <code>Deceased</code> or <code>Closed</code> MUST still be answered with <code>200</code> under rows 1 and 2 — <code>accountStatus</code> reflects its state so the TPP can observe it. Do <strong>not</strong> return <code>403</code> because the account is blocked from receiving payments.'] },
          ],
        } },
      ],
    },
  ],
}
