export function getPaymentPermissionText(permissions: string[] | undefined): string | null {
  if (!permissions) return null

  const basic = permissions.includes('ReadAccountsBasic')
  const detail = permissions.includes('ReadAccountsDetail')
  const balances = permissions.includes('ReadBalances')
  const refund = permissions.includes('ReadRefundAccount')

  const hasBasicOrDetail = basic || detail

  // E: any account info + balances + refund
  if (hasBasicOrDetail && balances && refund) {
    return 'You also grant us permission to access your account details and balance before making the payment, as well as to process refunds.'
  }
  // D: any account info + refund (no balances)
  if (hasBasicOrDetail && refund && !balances) {
    return 'You also grant us permission to access your account details before making the payment, as well as to process refunds.'
  }
  // C: refund only (no account info, no balances)
  if (refund && !hasBasicOrDetail && !balances) {
    return 'You also grant us permission to access your account details in order to process a refund.'
  }
  // B: any account info + balances (no refund)
  if (hasBasicOrDetail && balances && !refund) {
    return 'You also grant us permission to access your account details and balance before making the payment.'
  }
  // A: any account info only (no balances, no refund)
  if (hasBasicOrDetail && !balances && !refund) {
    return 'You also grant us permission to access your account details before making the payment.'
  }
  return null
}

export function getAuthPaymentPermissionText(permissions: string[] | undefined): string | null {
  if (!permissions) return null

  const basic = permissions.includes('ReadAccountsBasic')
  const detail = permissions.includes('ReadAccountsDetail')
  const balances = permissions.includes('ReadBalances')
  const refund = permissions.includes('ReadRefundAccount')

  const hasBasicOrDetail = basic || detail

  // E: any account info + balances + refund
  if (hasBasicOrDetail && balances && refund) {
    return 'We are also providing access to your account details and balance before making the payment, as well as to process refunds.'
  }
  // D: any account info + refund (no balances)
  if (hasBasicOrDetail && refund && !balances) {
    return 'We are also providing access to your account details before making the payment, as well as to process refunds.'
  }
  // C: refund only (no account info, no balances)
  if (refund && !hasBasicOrDetail && !balances) {
    return 'We are also providing access to your account details in order to process a refund.'
  }
  // B: any account info + balances (no refund)
  if (hasBasicOrDetail && balances && !refund) {
    return 'We are also providing access to your account details and balance before making the payment.'
  }
  // A: any account info only (no balances, no refund)
  if (hasBasicOrDetail && !balances && !refund) {
    return 'We are also providing access to your account details before making the payment.'
  }
  return null
}

/** All valid permission combinations for service initiation, in spec order. */
export const paymentPermissionCombinations: string[][] = [
  ['ReadAccountsBasic'],
  ['ReadAccountsDetail'],
  ['ReadRefundAccount'],
  ['ReadAccountsBasic', 'ReadAccountsDetail'],
  ['ReadAccountsBasic', 'ReadBalances'],
  ['ReadAccountsBasic', 'ReadRefundAccount'],
  ['ReadAccountsDetail', 'ReadBalances'],
  ['ReadAccountsDetail', 'ReadRefundAccount'],
  ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances'],
  ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadRefundAccount'],
  ['ReadAccountsBasic', 'ReadBalances', 'ReadRefundAccount'],
  ['ReadAccountsDetail', 'ReadBalances', 'ReadRefundAccount'],
  ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances', 'ReadRefundAccount'],
]
