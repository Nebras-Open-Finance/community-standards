/**
 * dashboardCharts.js
 * ─────────────────────────────────────────────────────────────────────────
 * Single source of truth for dashboard layout and chart configuration.
 *
 * Chart config shape:
 * {
 *   id:             string        — unique identifier
 *   title:          string        — card title
 *   component:      string        — renderer type (see DashboardChart.vue)
 *   props:          object?       — forwarded as v-bind to the chart component
 *   dataSource:     string        — 'api' | 'payment' | 'rt'
 *   hideIfFiltered: string?       — hide this chart when this filter key is set
 *   span:           number?       — grid column span (1 or 2, default 1)
 * }
 *
 * component values:
 *   'volume'       → DashApiVolumeChart (bar / stacked bar)
 *   'rt'           → DashResponseTimeChart (line / bar / histogram / percentiles)
 *   'error-rate'   → inline bar+line: API calls + error rate %
 *   'error-codes'  → inline doughnut: error code distribution
 *   'success-rate' → inline bar+line: payment count + success rate %
 *   'pay-status'   → inline doughnut: payment status split
 *   'rt-ranked'    → ranked list: slowest endpoints
 */

// ── Sidebar navigation structure ──────────────────────────────────────────
export const NAV_SECTIONS = [
  {
    id: 'api',
    label: 'API',
    icon: 'api',
    items: [
      { id: 'api-volumes',        label: 'API Volumes'     },
      { id: 'api-errors',         label: 'API Errors'      },
      { id: 'api-response-times', label: 'Response Times'  },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: 'payments',
    items: [
      { id: 'payment-volumes', label: 'Payment Volumes' },
      { id: 'payment-errors',  label: 'Payment Errors'  },
    ],
  },
]

// ── Section metadata (used by section header) ─────────────────────────────
export const SECTION_META = {
  'api-volumes':        { title: 'API Volumes',        description: 'Call volume across LFIs, TPPs and API families' },
  'api-errors':         { title: 'API Errors',          description: 'Error counts, rates and code distributions' },
  'api-response-times': { title: 'API Response Times',  description: 'Latency trends, percentiles and endpoint rankings' },
  'payment-volumes':    { title: 'Payment Volumes',     description: 'Payment counts and AED amounts by LFI and TPP' },
  'payment-errors':     { title: 'Payment Errors',      description: 'Failed payments and success rate analysis' },
}

// ── Chart registry ────────────────────────────────────────────────────────
export const CHART_REGISTRY = {

  'api-volumes': [
    {
      id: 'vol_by_month',
      title: 'Successful Volume by Month',
      component: 'volume',
      props: { groupBy: 'month', stackBy: 'family' },
      dataSource: 'api-success',
    },
    {
      id: 'vol_by_lfi',
      title: 'Successful Volume by LFI',
      component: 'volume',
      props: { groupBy: 'lfi' },
      dataSource: 'api-success',
      hideIfFiltered: 'lfi',
    },
    {
      id: 'vol_by_version',
      title: 'Successful Volume by API Version',
      component: 'volume',
      props: { groupBy: 'version' },
      dataSource: 'api-success',
    },
    {
      id: 'vol_by_tpp',
      title: 'Successful Volume by TPP',
      component: 'volume',
      props: { groupBy: 'tpp' },
      dataSource: 'api-success',
      hideIfFiltered: 'tpp',
    },
    {
      id: 'vol_by_endpoint',
      title: 'Successful Volume by Endpoint',
      component: 'volume',
      props: { groupBy: 'endpoint' },
      dataSource: 'api-success',
      showOnlyIfFiltered: true,
    },
  ],

  'api-errors': [
    {
      id: 'err_by_month',
      title: 'Success vs Error by Month',
      component: 'volume',
      props: { groupBy: 'month', stackBy: 'status' },
      dataSource: 'api',
    },
    {
      id: 'err_vol_by_lfi',
      title: 'Error Volume by LFI',
      component: 'volume',
      props: { groupBy: 'lfi', valueKey: 'errors' },
      dataSource: 'api',
      hideIfFiltered: 'lfi',
    },
    {
      id: 'err_rate',
      title: 'Error Rate by LFI',
      component: 'error-rate',
      dataSource: 'api',
    },
    {
      id: 'err_rate_version',
      title: 'Error Rate by API Version',
      component: 'error-rate',
      props: { groupBy: 'version' },
      dataSource: 'api',
    },
    {
      id: 'err_vol_by_endpoint',
      title: 'Volume by Endpoint',
      component: 'volume',
      props: { groupBy: 'endpoint', stackBy: 'status' },
      dataSource: 'api',
      showOnlyIfFiltered: true,
    },
    {
      id: 'err_rate_by_endpoint',
      title: 'Error Rate by Endpoint',
      component: 'error-rate',
      props: { groupBy: 'endpoint' },
      dataSource: 'api',
      showOnlyIfFiltered: true,
    },
  ],

  'api-response-times': [
    {
      id: 'rt_avg_month',
      title: 'Avg Response Time by Month',
      component: 'rt',
      props: { mode: 'avg-line' },
      dataSource: 'rt',
    },
    {
      id: 'rt_by_family',
      title: 'Avg Latency by API Family',
      component: 'rt',
      props: { mode: 'avg-bar', groupBy: 'family' },
      dataSource: 'rt',
      hideIfFiltered: 'apiFamily',
    },
    {
      id: 'rt_by_endpoint',
      title: 'Avg Latency by Endpoint',
      component: 'rt',
      props: { mode: 'avg-bar', groupBy: 'endpoint' },
      dataSource: 'rt',
      showOnlyIfFiltered: 'apiFamily',
    },
    {
      id: 'rt_by_lfi',
      title: 'Avg Latency by LFI',
      component: 'rt',
      props: { mode: 'avg-bar', groupBy: 'lfi' },
      dataSource: 'rt',
      hideIfFiltered: 'lfi',
    },
    {
      id: 'rt_ranked',
      title: 'Slowest Endpoints (Top 8)',
      component: 'rt-ranked',
      dataSource: 'rt',
    },
  ],

  'payment-volumes': [
    {
      id: 'pay_success_amount_month',
      title: 'Successful Payment Amount by Month (AED)',
      component: 'volume',
      props: { groupBy: 'month', stackBy: 'consentType', valueKey: 'amount' },
      dataSource: 'payment-success',
      hideIfFiltered: 'month',
    },
    {
      id: 'pay_success_count_month',
      title: 'Successful Payment Count by Month',
      component: 'volume',
      props: { groupBy: 'month', stackBy: 'consentType', valueKey: 'count' },
      dataSource: 'payment-success',
      hideIfFiltered: 'month',
    },
    {
      id: 'pay_success_amount_lfi',
      title: 'Successful Payment Amount by LFI (AED)',
      component: 'volume',
      props: { groupBy: 'lfi', stackBy: 'consentType', valueKey: 'amount' },
      dataSource: 'payment-success',
      hideIfFiltered: 'lfi',
    },
    {
      id: 'pay_success_count_lfi',
      title: 'Successful Payment Count by LFI',
      component: 'volume',
      props: { groupBy: 'lfi', stackBy: 'consentType', valueKey: 'count' },
      dataSource: 'payment-success',
      hideIfFiltered: 'lfi',
    },
    {
      id: 'pay_success_amount_tpp',
      title: 'Successful Payment Amount by TPP (AED)',
      component: 'volume',
      props: { groupBy: 'tpp', stackBy: 'consentType', valueKey: 'amount' },
      dataSource: 'payment-success',
      hideIfFiltered: 'tpp',
    },
    {
      id: 'pay_success_count_tpp',
      title: 'Successful Payment Count by TPP',
      component: 'volume',
      props: { groupBy: 'tpp', stackBy: 'consentType', valueKey: 'count' },
      dataSource: 'payment-success',
      hideIfFiltered: 'tpp',
    },
    {
      id: 'pay_success_amount_lfi_status',
      title: 'Successful Payment Amount by LFI (AED)',
      component: 'volume',
      props: { groupBy: 'lfi', stackBy: 'rawStatus', valueKey: 'amount' },
      dataSource: 'payment-success',
      showOnlyIfFiltered: true,
    },
    {
      id: 'pay_success_count_lfi_status',
      title: 'Successful Payment Count by LFI',
      component: 'volume',
      props: { groupBy: 'lfi', stackBy: 'rawStatus', valueKey: 'count' },
      dataSource: 'payment-success',
      showOnlyIfFiltered: true,
    },
  ],

  'payment-errors': [
    {
      id: 'pay_err_amount_month',
      title: 'Payment Amount by Month (AED)',
      component: 'volume',
      props: { groupBy: 'month', stackBy: 'status', valueKey: 'amount' },
      dataSource: 'payment-all',
      hideIfFiltered: 'month',
    },
    {
      id: 'pay_err_count_month',
      title: 'Payment Count by Month',
      component: 'volume',
      props: { groupBy: 'month', stackBy: 'status', valueKey: 'count' },
      dataSource: 'payment-all',
      hideIfFiltered: 'month',
    },
    {
      id: 'pay_err_amount_lfi',
      title: 'Payment Amount by LFI (AED)',
      component: 'volume',
      props: { groupBy: 'lfi', stackBy: 'status', valueKey: 'amount' },
      dataSource: 'payment-all',
      hideIfFiltered: 'lfi',
    },
    {
      id: 'pay_err_count_lfi',
      title: 'Payment Count by LFI',
      component: 'volume',
      props: { groupBy: 'lfi', stackBy: 'status', valueKey: 'count' },
      dataSource: 'payment-all',
      hideIfFiltered: 'lfi',
    },
    {
      id: 'pay_err_amount_tpp',
      title: 'Payment Amount by TPP (AED)',
      component: 'volume',
      props: { groupBy: 'tpp', stackBy: 'status', valueKey: 'amount' },
      dataSource: 'payment-all',
      hideIfFiltered: 'tpp',
    },
    {
      id: 'pay_err_count_tpp',
      title: 'Payment Count by TPP',
      component: 'volume',
      props: { groupBy: 'tpp', stackBy: 'status', valueKey: 'count' },
      dataSource: 'payment-all',
      hideIfFiltered: 'tpp',
    },
  ],
}
