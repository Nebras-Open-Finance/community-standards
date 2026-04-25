/**
 * Fee calculator definitions for the pricing page.
 *
 * Each flow declares its segment, kind, the input fields it needs from the
 * UI, and a `perTxnFils` function that returns the LFI portion of the fee.
 * The Nebras API Hub fee is added at calculation time in the page component
 * (2.5 fils per chargeable call, 0.5 fils when a Balance/CoP call is paired
 * with a payment).
 *
 * All rates and caps mirror the AlTareq Commercial and Pricing Model.
 */

const FILS_PER_AED = 100

function yearVal(schedule, year) {
  const idx = Math.max(0, Math.min(schedule.length - 1, (year || 1) - 1))
  return schedule[idx]
}

const MERCHANT_BPS_SCHEDULE = [38, 35, 32, 29, 25]

export const FLOWS = {
  consumer_p2p: {
    id: 'consumer_p2p',
    label: 'Transfer (P2P)',
    segment: 'retail-sme',
    kind: 'payment',
    unit: 'transfers / month',
    perTxnFils: () => 25,
  },

  me_to_me: {
    id: 'me_to_me',
    label: 'Me-to-Me payment',
    segment: 'retail-sme',
    kind: 'payment',
    unit: 'payments / month',
    yearStep: { years: [1, 2, 3], schedule: [20, 18, 17] },
    perTxnFils: ({ year }) => yearVal([20, 18, 17], year),
  },

  merchant_collect_rsme: {
    id: 'merchant_collect_rsme',
    label: 'Merchant Collections (Retail/SME)',
    segment: 'retail-sme',
    kind: 'payment',
    unit: 'transactions / month',
    needsAmount: true,
    yearStep: { years: [1, 2, 3, 4, 5], schedule: MERCHANT_BPS_SCHEDULE },
    perTxnFils: ({ year, avgAmountAED }) => {
      const bps = yearVal(MERCHANT_BPS_SCHEDULE, year)
      const txnFils = (avgAmountAED || 0) * (bps / 10000) * FILS_PER_AED
      const capFils = 50 * FILS_PER_AED
      return Math.min(txnFils, capFils)
    },
  },

  large_value: {
    id: 'large_value',
    label: 'Large Value / Rent / Invoice Collection',
    segment: 'any',
    kind: 'payment',
    unit: 'collections / month',
    perTxnFils: () => 4 * FILS_PER_AED,
  },

  data_sharing: {
    id: 'data_sharing',
    label: 'Data Sharing',
    segment: 'retail-sme',
    kind: 'data',
    unit: 'customers',
  },
}

export const FLOW_LIST = Object.values(FLOWS)

export const PRESETS = [
  {
    id: 'p2p_at_scale',
    label: 'Transfer (P2P) at scale',
    blurb: '50,000 transfers per month',
    inputs: {
      flowId: 'consumer_p2p',
      monthlyVolume: 50000,
      pairWithCoP: false,
    },
  },
  {
    id: 'merchant_retail',
    label: 'Retail merchant collections',
    blurb: '5,000 collections / month at AED 80, Year 1',
    inputs: {
      flowId: 'merchant_collect_rsme',
      monthlyVolume: 5000,
      avgAmountAED: 80,
      year: 1,
      pairWithCoP: false,
    },
  },
  {
    id: 'data_app',
    label: 'Data-sharing app',
    blurb: '2,500 customers, 50 requests / month each, within free threshold',
    inputs: {
      flowId: 'data_sharing',
      customers: 2500,
      monthlyRequests: 50,
      hasBillableRequests: false,
      billableRequests: 0,
      lfiOverageAED: 0,
    },
  },
  {
    id: 'invoice_collect',
    label: 'Rent / invoice collection',
    blurb: '500 invoice collections per month',
    inputs: {
      flowId: 'large_value',
      monthlyVolume: 500,
    },
  },
]
