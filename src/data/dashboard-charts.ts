export type FilterKey = 'lfi' | 'tpp' | 'month' | 'apiFamily'

export type DataSource =
  | 'api'
  | 'api-success'
  | 'payment'
  | 'payment-success'
  | 'payment-all'
  | 'rt'
  | 'auth'

export type ChartComponent =
  | 'volume'
  | 'rt'
  | 'rt-ranked'
  | 'error-rate'
  | 'error-codes'
  | 'success-rate'
  | 'pay-status'
  | 'auth-rate'

// Loose by design — different `component` values consume different subsets,
// and forwarding via `v-bind="config.props"` lets the chart component own
// the validation. The union here just keeps autocomplete useful.
export interface ChartProps {
  groupBy?: string
  stackBy?: string
  valueKey?: string
  mode?: 'avg-line' | 'avg-bar' | 'p-percentiles' | 'histogram'
  grouped?: boolean
  numeratorType?: 'doConfirm' | 'doFail'
}

export interface ChartConfig {
  id: string
  title: string
  component: ChartComponent
  dataSource: DataSource
  props?: ChartProps
  /** Hide this chart when the named filter is set. */
  hideIfFiltered?: FilterKey
  /** `true` shows only when any filter is set; a key shows only for that filter. */
  showOnlyIfFiltered?: boolean | FilterKey
  span?: number
  rowSpan?: number
  maxHeight?: string
}

export interface NavItem {
  id: string
  label: string
}

export interface NavSection {
  id: string
  label: string
  icon: string
  items: NavItem[]
}

export interface SectionMeta {
  title: string
  description: string
}

export const NAV_SECTIONS: readonly NavSection[] = [
  {
    id: 'api',
    label: 'API',
    icon: 'api',
    items: [
      { id: 'api-volumes',        label: 'API Volumes'    },
      { id: 'api-errors',         label: 'API Errors'     },
      { id: 'api-response-times', label: 'Response Times' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: 'payments',
    items: [
      { id: 'payment-volumes', label: 'Payment Volumes' },
      { id: 'payment-errors',  label: 'Payment Errors'  },
      { id: 'payment-status',  label: 'Payment Status'  },
    ],
  },
  {
    id: 'authorization',
    label: 'Authorization',
    icon: 'auth',
    items: [
      { id: 'auth-conversion', label: 'Auth Conversion' },
    ],
  },
] as const

export const SECTION_META: Readonly<Record<string, SectionMeta>> = {
  'api-volumes':        { title: 'API Volumes',        description: 'Call volume across LFIs, TPPs and API families' },
  'api-errors':         { title: 'API Errors',          description: 'Error counts, rates and code distributions' },
  'api-response-times': { title: 'API Response Times',  description: 'Latency trends, percentiles and endpoint rankings' },
  'payment-volumes':    { title: 'Payment Volumes',     description: 'Payment counts and AED amounts by LFI and TPP' },
  'payment-errors':     { title: 'Payment Errors',      description: 'Failed payments and success rate analysis' },
  'payment-status':     { title: 'Payment Status',      description: 'Payment breakdown by actual ISO 20022 status' },
  'auth-conversion':    { title: 'Auth Conversion',     description: 'Authorization success and cancellation rates across LFIs and months' },
}

export const CHART_REGISTRY: Readonly<Record<string, readonly ChartConfig[]>> = {

  'api-volumes': [
    { id: 'vol_by_month',    title: 'Successful Volume by Month',          component: 'volume', props: { groupBy: 'month', stackBy: 'family' }, dataSource: 'api-success' },
    { id: 'vol_by_lfi',      title: 'Successful Volume by LFI',            component: 'volume', props: { groupBy: 'lfi' },                       dataSource: 'api-success', hideIfFiltered: 'lfi' },
    { id: 'vol_by_version',  title: 'Successful Volume by API Version',    component: 'volume', props: { groupBy: 'version' },                   dataSource: 'api-success' },
    { id: 'vol_by_tpp',      title: 'Successful Volume by TPP',            component: 'volume', props: { groupBy: 'tpp' },                       dataSource: 'api-success', hideIfFiltered: 'tpp' },
    { id: 'vol_by_endpoint', title: 'Successful Volume by Endpoint',       component: 'volume', props: { groupBy: 'endpoint' },                  dataSource: 'api-success', showOnlyIfFiltered: true },
  ],

  'api-errors': [
    { id: 'err_by_month',          title: 'Success vs Error by Month',     component: 'volume',     props: { groupBy: 'month', stackBy: 'status' },        dataSource: 'api' },
    { id: 'err_vol_by_lfi',        title: 'Error Volume by LFI',           component: 'volume',     props: { groupBy: 'lfi', valueKey: 'errors' },         dataSource: 'api', hideIfFiltered: 'lfi' },
    { id: 'err_rate',              title: 'Error Rate by LFI',             component: 'error-rate',                                                        dataSource: 'api' },
    { id: 'err_rate_version',      title: 'Error Rate by API Version',     component: 'error-rate', props: { groupBy: 'version' },                         dataSource: 'api' },
    { id: 'err_vol_by_endpoint',   title: 'Volume by Endpoint',            component: 'volume',     props: { groupBy: 'endpoint', stackBy: 'status' },     dataSource: 'api', showOnlyIfFiltered: true },
    { id: 'err_rate_by_endpoint',  title: 'Error Rate by Endpoint',        component: 'error-rate', props: { groupBy: 'endpoint' },                        dataSource: 'api', showOnlyIfFiltered: true },
  ],

  'api-response-times': [
    { id: 'rt_avg_month',   title: 'Avg Response Time by Month', component: 'rt',        props: { mode: 'avg-line' },                   dataSource: 'rt' },
    { id: 'rt_by_family',   title: 'Avg Latency by API Family',  component: 'rt',        props: { mode: 'avg-bar', groupBy: 'family' }, dataSource: 'rt', hideIfFiltered: 'apiFamily' },
    { id: 'rt_by_endpoint', title: 'Avg Latency by Endpoint',    component: 'rt',        props: { mode: 'avg-bar', groupBy: 'endpoint' }, dataSource: 'rt', showOnlyIfFiltered: 'apiFamily' },
    { id: 'rt_by_lfi',      title: 'Avg Latency by LFI',         component: 'rt',        props: { mode: 'avg-bar', groupBy: 'lfi' },    dataSource: 'rt', hideIfFiltered: 'lfi' },
    { id: 'rt_ranked',      title: 'Slowest Endpoints (Top 8)',  component: 'rt-ranked',                                                dataSource: 'rt' },
  ],

  'payment-volumes': [
    { id: 'pay_success_amount_month',      title: 'Successful Payment Amount by Month (AED)', component: 'volume', props: { groupBy: 'month', stackBy: 'consentType', valueKey: 'amount' }, dataSource: 'payment-success', hideIfFiltered: 'month' },
    { id: 'pay_success_count_month',       title: 'Successful Payment Count by Month',         component: 'volume', props: { groupBy: 'month', stackBy: 'consentType', valueKey: 'count'  }, dataSource: 'payment-success', hideIfFiltered: 'month' },
    { id: 'pay_success_amount_lfi',        title: 'Successful Payment Amount by LFI (AED)',    component: 'volume', props: { groupBy: 'lfi',   stackBy: 'consentType', valueKey: 'amount' }, dataSource: 'payment-success', hideIfFiltered: 'lfi'   },
    { id: 'pay_success_count_lfi',         title: 'Successful Payment Count by LFI',           component: 'volume', props: { groupBy: 'lfi',   stackBy: 'consentType', valueKey: 'count'  }, dataSource: 'payment-success', hideIfFiltered: 'lfi'   },
    { id: 'pay_success_amount_tpp',        title: 'Successful Payment Amount by TPP (AED)',    component: 'volume', props: { groupBy: 'tpp',   stackBy: 'consentType', valueKey: 'amount' }, dataSource: 'payment-success', hideIfFiltered: 'tpp'   },
    { id: 'pay_success_count_tpp',         title: 'Successful Payment Count by TPP',           component: 'volume', props: { groupBy: 'tpp',   stackBy: 'consentType', valueKey: 'count'  }, dataSource: 'payment-success', hideIfFiltered: 'tpp'   },
    { id: 'pay_success_amount_lfi_status', title: 'Successful Payment Amount by LFI (AED)',    component: 'volume', props: { groupBy: 'lfi',   stackBy: 'rawStatus',  valueKey: 'amount' }, dataSource: 'payment-success', showOnlyIfFiltered: true },
    { id: 'pay_success_count_lfi_status',  title: 'Successful Payment Count by LFI',           component: 'volume', props: { groupBy: 'lfi',   stackBy: 'rawStatus',  valueKey: 'count'  }, dataSource: 'payment-success', showOnlyIfFiltered: true },
  ],

  'payment-errors': [
    { id: 'pay_err_amount_month', title: 'Payment Amount by Month (AED)', component: 'volume', props: { groupBy: 'month', stackBy: 'status', valueKey: 'amount' }, dataSource: 'payment-all', hideIfFiltered: 'month' },
    { id: 'pay_err_count_month',  title: 'Payment Count by Month',         component: 'volume', props: { groupBy: 'month', stackBy: 'status', valueKey: 'count'  }, dataSource: 'payment-all', hideIfFiltered: 'month' },
    { id: 'pay_err_amount_lfi',   title: 'Payment Amount by LFI (AED)',    component: 'volume', props: { groupBy: 'lfi',   stackBy: 'status', valueKey: 'amount' }, dataSource: 'payment-all', hideIfFiltered: 'lfi' },
    { id: 'pay_err_count_lfi',    title: 'Payment Count by LFI',           component: 'volume', props: { groupBy: 'lfi',   stackBy: 'status', valueKey: 'count'  }, dataSource: 'payment-all', hideIfFiltered: 'lfi' },
    { id: 'pay_err_amount_tpp',   title: 'Payment Amount by TPP (AED)',    component: 'volume', props: { groupBy: 'tpp',   stackBy: 'status', valueKey: 'amount' }, dataSource: 'payment-all', hideIfFiltered: 'tpp' },
    { id: 'pay_err_count_tpp',    title: 'Payment Count by TPP',           component: 'volume', props: { groupBy: 'tpp',   stackBy: 'status', valueKey: 'count'  }, dataSource: 'payment-all', hideIfFiltered: 'tpp' },
  ],

  'payment-status': [
    { id: 'pay_status_count_lfi',       title: 'Payment Count by LFI',          component: 'volume', props: { groupBy: 'lfi',       stackBy: 'rawStatus', valueKey: 'count'  }, dataSource: 'payment-all', hideIfFiltered: 'lfi',   span: 2, rowSpan: 2, maxHeight: '520px' },
    { id: 'pay_status_count_month',     title: 'Payment Count by Month',        component: 'volume', props: { groupBy: 'month',     stackBy: 'rawStatus', valueKey: 'count'  }, dataSource: 'payment-all', hideIfFiltered: 'month' },
    { id: 'pay_status_amount_month',    title: 'Payment Amount by Month (AED)', component: 'volume', props: { groupBy: 'month',     stackBy: 'rawStatus', valueKey: 'amount' }, dataSource: 'payment-all', hideIfFiltered: 'month' },
    { id: 'pay_status_count_breakdown', title: 'Payment Count by Status',       component: 'volume', props: { groupBy: 'rawStatus',                       valueKey: 'count'  }, dataSource: 'payment-all' },
    { id: 'pay_status_count_tpp',       title: 'Payment Count by TPP',          component: 'volume', props: { groupBy: 'tpp',       stackBy: 'rawStatus', valueKey: 'count'  }, dataSource: 'payment-all', hideIfFiltered: 'tpp' },
  ],

  'auth-conversion': [
    { id: 'auth_count_lfi',         title: 'Auth Count by LFI',         component: 'volume',    props: { groupBy: 'lfi',   stackBy: 'type', valueKey: 'count', grouped: true }, dataSource: 'auth', hideIfFiltered: 'lfi'   },
    { id: 'auth_conversion_lfi',    title: 'Conversion Rate by LFI',    component: 'auth-rate', props: { groupBy: 'lfi',   numeratorType: 'doConfirm' },                       dataSource: 'auth', hideIfFiltered: 'lfi'   },
    { id: 'auth_count_month',       title: 'Auth Count by Month',       component: 'volume',    props: { groupBy: 'month', stackBy: 'type', valueKey: 'count', grouped: true }, dataSource: 'auth', hideIfFiltered: 'month' },
    { id: 'auth_conversion_month',  title: 'Conversion Rate by Month',  component: 'auth-rate', props: { groupBy: 'month', numeratorType: 'doConfirm' },                       dataSource: 'auth', hideIfFiltered: 'month' },
    { id: 'auth_cancel_lfi',        title: 'Cancellation Rate by LFI',  component: 'auth-rate', props: { groupBy: 'lfi',   numeratorType: 'doFail' },                          dataSource: 'auth', hideIfFiltered: 'lfi'   },
    { id: 'auth_cancel_month',      title: 'Cancellation Rate by Month', component: 'auth-rate', props: { groupBy: 'month', numeratorType: 'doFail' },                         dataSource: 'auth', hideIfFiltered: 'month' },
  ],
}
