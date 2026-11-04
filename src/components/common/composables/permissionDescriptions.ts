/**
 * Single source of truth for permission descriptions.
 * Used by ConsentBankDataSharing.vue and the PermissionsReference docs component.
 * Edit here to update both the consent page UI and the documentation table.
 */
export const permissionDescriptions: Record<string, string> = {
  ReadAccountsDetail:
    'Full account information (account number/ID, type and description of account, currency, nickname you gave it, and account holder name, opening date)',
  ReadAccountsBasic:
    'Basic account information (account number/ID, type of account, currency, nickname you gave it, and account holder name)',
  ReadBalances:
    'Your current account balances (available balance, booked balance, credit limit/overdraft if any, and when the balance was last updated)',

  ReadBeneficiariesDetail:
    'Full beneficiaries information (saved payee account number/ID, type, name and nickname, bank name and details, address, reference)',
  ReadBeneficiariesBasic:
    'Basic beneficiaries information (saved payee account number/ID, type, name and nickname, bank name and details, reference)',
  ReadStandingOrdersDetail:
    'Full standing orders information (payee name and nickname, reference, frequency, first/next/final payment amounts and dates, number of payments, purpose, status, type)',
  ReadStandingOrdersBasic:
    'Basic standing orders information (payee name and nickname, reference, frequency, first/next/final payment amounts and dates, number of payments, purpose, status, type)',
  ReadScheduledPaymentsDetail:
    'Full scheduled payments information (payee account details, name and nickname, creditor/debtor reference, instructed amount, scheduled date/time, ID, type)',
  ReadScheduledPaymentsBasic:
    'Basic scheduled payments information (payee name and nickname, instructed amount, scheduled date/time, ID, type)',
  ReadDirectDebits:
    'Direct debits information (account ID, direct debit ID, status, frequency, mandate identification, name, previous payment amount and date)',

  ReadTransactionsDetail:
    'Full transactions information (date/time, amount, type, description/narrative, payee/merchant name and details, category, status, reference, currency exchange if applicable)',
  ReadTransactionsBasic:
    'Basic transactions information (date/time, amount, type, description/narrative, status, reference)',

  ReadStatements:
    'Account statements (monthly/periodic summaries including transaction lists, opening/closing balances, fees, interest, and period details)',

  ReadProduct:
    "Product information (details about your account's financial product, including name, features, interest rates, fees, and key terms)",

  ReadPartyUserIdentity:
    'Detailed personal identity details (name, date of birth, contact information, Emirates ID, nationality, residential address, employer details)',
  ReadPartyUser:
    'Detailed personal details (name, date of birth, contact information, residential address)',
  ReadParty:
    'Your legal or registered name as the account holder',
  ReadPartyIdentity:
    'Your name and Emirates ID (or, for a business, its registered name and trade licence)',

  ReadProductFinanceRates:
    "Details of the interest or profit rate on your mortgage, finance, or credit card. In some cases, your bank may protect this information by sending it in a locked format and issue you a code (via SMS or email). You'll need to enter this code within the service so that it can show you the rate.",
}

export const permissionGroups: Array<{ label: string; permissions: string[] }> = [
  {
    label: 'Your Account Details',
    permissions: ['ReadAccountsBasic', 'ReadAccountsDetail', 'ReadBalances'],
  },
  {
    label: 'Your Regular Payments',
    permissions: [
      'ReadBeneficiariesBasic',
      'ReadBeneficiariesDetail',
      'ReadStandingOrdersBasic',
      'ReadStandingOrdersDetail',
      'ReadScheduledPaymentsBasic',
      'ReadScheduledPaymentsDetail',
      'ReadDirectDebits',
    ],
  },
  {
    label: 'Your Account Transactions',
    permissions: ['ReadTransactionsBasic', 'ReadTransactionsDetail'],
  },
  {
    label: 'Your Account Statements',
    permissions: ['ReadStatements'],
  },
  {
    label: 'Your Product Information',
    permissions: ['ReadProduct'],
  },
  {
    label: 'Contact and Party Details',
    permissions: ['ReadPartyUser', 'ReadPartyUserIdentity', 'ReadParty', 'ReadPartyIdentity'],
  },
  {
    label: 'Your Finance Rates',
    permissions: ['ReadProductFinanceRates'],
  },
]

/** Permissions introduced in v2.2. Reference tables omit them on v2.1 pages. */
export const permissionsSinceV22: readonly string[] = ['ReadPartyIdentity']

export const partyPermissions = ['ReadPartyUser', 'ReadPartyUserIdentity', 'ReadParty', 'ReadPartyIdentity']

/**
 * The lines shown under "Contact and Party Details" for a consent's permissions.
 *
 * `ReadPartyUserIdentity` already includes the name and Emirates ID, so it covers
 * `ReadPartyIdentity`. `ReadPartyUser` (contact details, no Emirates ID) and
 * `ReadPartyIdentity` (name and Emirates ID, no contact details) each show their
 * own line. `ReadParty` (the account holder's name) is covered by either.
 */
export function partyPermissionLines(permissions: string[] | undefined): string[] {
  const perms = permissions ?? []
  if (perms.includes('ReadPartyUserIdentity')) return ['ReadPartyUserIdentity']
  const lines = ['ReadPartyUser', 'ReadPartyIdentity'].filter((p) => perms.includes(p))
  if (lines.length > 0) return lines
  return perms.includes('ReadParty') ? ['ReadParty'] : []
}
