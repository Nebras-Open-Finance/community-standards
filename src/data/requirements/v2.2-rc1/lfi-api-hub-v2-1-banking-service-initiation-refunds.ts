import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Payment Refunds — Requirements',
  version: 'v2.2-rc1',
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
            { cells: ['1', 'Refund account request received from Hub', 'Return <code>200</code> with a <code>data</code> object containing <code>refundAccount</code>. The <code>refundAccount</code> must include the debtor\'s <code>schemeName</code> (always <code>IBAN</code>), <code>identification</code> (the debtor\'s IBAN), and <code>name</code> (an object with <code>en</code> or <code>ar</code>).'] },
            { cells: ['2', 'Account is blocked from receiving payments — temporary', 'Return <code>403</code> with <code>errorCode</code>: <code>Consent.AccountTemporarilyBlocked</code> and <code>errorMessage</code>: <code>The debtor account is blocked from receiving payments.</code> Applies when the block is temporary — e.g. account status is <code>Suspended</code>, or the account is otherwise unable to receive a credit transaction refund on a transient basis.'] },
            { cells: ['3', 'Account is blocked from receiving payments — permanent', 'Return <code>403</code> with <code>errorCode</code>: <code>Consent.PermanentAccountAccessFailure</code> and <code>errorMessage</code>: <code>The debtor account is blocked from receiving payments.</code> Applies when the block is permanent — e.g. account status is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code>.'] },
          ],
        } },
      ],
    },
  ],
}
