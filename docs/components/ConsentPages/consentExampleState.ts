const dataSharingState = {
  Permissions: [
    'ReadAccountsDetail',
    'ReadBalances',
    'ReadTransactionsDetail',
    'ReadStatements',
    'ReadBeneficiariesDetail',
    'ReadDirectDebits',
    'ReadStandingOrdersDetail',
    'ReadScheduledPaymentsDetail',
    'ReadPartyUser',
    'ReadProduct',
    'ReadProductFinanceRates'
  ],
  ExpirationDateTime: '2026-03-31T00:00:00Z',
  OnBehalfOf: { TradingName: 'AlTareq' }
}

const paymentState = {
  Permissions: ['ReadAccountsDetail', 'ReadBalances', 'ReadRefundAccount'],
  ExpirationDateTime: '2026-03-31T00:00:00Z'
}

export const CONSENT_EXAMPLE_STATE: Record<string, object> = {
  'Data Sharing': dataSharingState,
  'Single Instant Payment': paymentState,
  'Multi Payment (VariableOnDemand)': paymentState,
  'Multi Payment (FixedOnDemand)': paymentState,
  'Multi Payment (VariablePeriodicSchedule)': paymentState,
  'Multi Payment (FixedPeriodicSchedule)': paymentState,
  'Multi Payment (VariableDefinedSchedule)': paymentState,
  'Multi Payment (FixedDefinedSchedule)': paymentState,
  'Multi Payment (DelegatedSCA)': paymentState
}
