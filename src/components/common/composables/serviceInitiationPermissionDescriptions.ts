// The permissions sentence on the payment Consent Page (TPP) and Authorization
// Page (LFI). Both pages list the same things in the same order and differ only
// in the lead-in, so one builder serves both.
//
// What is listed before the payment: account details (ReadAccountsBasic or
// ReadAccountsDetail), balance (ReadBalances, which requires account details)
// and, from v2.2, identity details (ReadPartyIdentity). ReadRefundAccount adds
// refunds — as a trailing clause when account details are already listed, or as
// the reason account details are accessed when they are not.

const CONSENT_LEAD = 'You also grant us permission to access'
const AUTH_LEAD = 'We are also providing access to'

function joinAnd(items: string[]): string {
  return items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function buildPermissionText(permissions: string[] | undefined, lead: string): string | null {
  if (!permissions) return null

  const account = permissions.includes('ReadAccountsBasic') || permissions.includes('ReadAccountsDetail')
  const balances = permissions.includes('ReadBalances')
  const refund = permissions.includes('ReadRefundAccount')
  const identity = permissions.includes('ReadPartyIdentity')

  const items: string[] = []
  if (account) items.push('account details')
  if (account && balances) items.push('balance')
  if (identity) items.push('identity details')

  // Refund only: account details are accessed for the refund, not the payment
  if (items.length === 0) return refund ? `${lead} your account details in order to process a refund.` : null

  // Identity details on their own are spelt out; alongside account details they are not
  const note = items.length === 1 && identity ? ' (your name and Emirates ID)' : ''
  const access = `${lead} your ${joinAnd(items)}${note} before making the payment`

  if (refund && account) return `${access}, as well as to process refunds.`
  if (refund) return `${access}, as well as your account details in order to process a refund.`
  return `${access}.`
}

export function getPaymentPermissionText(permissions: string[] | undefined): string | null {
  return buildPermissionText(permissions, CONSENT_LEAD)
}

export function getAuthPaymentPermissionText(permissions: string[] | undefined): string | null {
  return buildPermissionText(permissions, AUTH_LEAD)
}

/**
 * Every valid combination of the given permissions, smallest first and in spec
 * order within a size. The one constraint: ReadBalances requires
 * ReadAccountsBasic or ReadAccountsDetail.
 */
function validCombinations(perms: readonly string[]): string[][] {
  const out: string[][] = []
  for (let size = 1; size <= perms.length; size++) {
    const pick = (start: number, acc: string[]): void => {
      if (acc.length === size) {
        const balancesOk =
          !acc.includes('ReadBalances') || acc.includes('ReadAccountsBasic') || acc.includes('ReadAccountsDetail')
        if (balancesOk) out.push(acc)
        return
      }
      for (let i = start; i < perms.length; i++) pick(i + 1, [...acc, perms[i]!])
    }
    pick(0, [])
  }
  return out
}

const V21_PERMISSIONS = ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances', 'ReadRefundAccount'] as const

/** All valid permission combinations for service initiation in v2.1, in spec order. */
export const paymentPermissionCombinations: string[][] = validCombinations(V21_PERMISSIONS)

/** As above for v2.2, which adds ReadPartyIdentity. */
export const paymentPermissionCombinationsV22: string[][] = validCombinations([...V21_PERMISSIONS, 'ReadPartyIdentity'])
