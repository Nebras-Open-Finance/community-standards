<script setup lang="ts">
// Phase 5b-iii — chart grid + section header + CSV export, ported from
// `docs/components/WebPages/DashboardCharts.vue`. This component is the
// client-only entry-point: the parent `metrics.vue` page wraps it (and the
// sidebar/navbar/cards) in <ClientOnly> to dodge Chart.js SSG hydration
// mismatches (R11 in the migration spec).

import {
  state,
  filteredApiData,
  filteredSuccessApiData,
  filteredPaymentData,
  filteredAuthData,
  filteredRtData,
  dataForSource,
  type AnyRow,
} from '@/stores/dashboard'
import {
  CHART_REGISTRY,
  SECTION_META,
  type ChartConfig,
  type DataSource,
  type SectionMeta,
} from '@/data/dashboard-charts'

// ── CSV export (inlined — utils/csv.js was a 42-line one-off helper) ─────
function escapeCell(value: unknown): string {
  if (value == null) return ''
  const str = String(value)
  if (/[",\r\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`
  return str
}

function rowsToCsv<T>(rows: readonly T[], columns: readonly string[]): string {
  if (!rows.length) return ''
  const header = columns.map(escapeCell).join(',')
  const body = rows
    .map(r => columns.map(c => escapeCell((r as Record<string, unknown>)[c])).join(','))
    .join('\r\n')
  return `${header}\r\n${body}`
}

function downloadCsv<T>(filename: string, rows: readonly T[], columns: readonly string[]): void {
  if (typeof window === 'undefined') return
  const csv = rowsToCsv(rows, columns)
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

function datedFilename(prefix: string, ext = 'csv'): string {
  const iso = new Date().toISOString().slice(0, 10)
  return `${prefix}-${iso}.${ext}`
}

// ── Section meta + eyebrow ───────────────────────────────────────────────
const meta = computed<SectionMeta>(() =>
  SECTION_META[state.activeSection] ?? { title: '', description: '' },
)

const sectionEyebrow = computed<string>(() => {
  const s = state.activeSection
  if (s.startsWith('payment')) return 'Payments'
  if (s.startsWith('auth'))    return 'Authentication'
  if (s.startsWith('rt') || s === 'response-time') return 'Performance'
  return 'API Hub'
})

// ── Visible charts (filter + month→day re-titling) ───────────────────────
const visibleCharts = computed<ChartConfig[]>(() => {
  const configs = CHART_REGISTRY[state.activeSection] ?? []
  const hasAnyFilter = Object.values(state.filters).some(v => v != null)
  const monthFiltered = !!state.filters.month

  return configs
    .filter(c => {
      if (c.hideIfFiltered && c.hideIfFiltered !== 'month' && state.filters[c.hideIfFiltered]) return false
      if (c.showOnlyIfFiltered === true && !hasAnyFilter) return false
      if (typeof c.showOnlyIfFiltered === 'string' && !state.filters[c.showOnlyIfFiltered]) return false
      return true
    })
    .map(c => {
      if (!monthFiltered) return c
      const isByMonth =
        c.props?.groupBy === 'month' ||
        c.hideIfFiltered === 'month' ||
        c.props?.mode === 'avg-line'
      if (!isByMonth) return c
      return {
        ...c,
        title: c.title.replace('by Month', 'by Day'),
        props: { ...c.props, groupBy: 'day' },
      }
    })
})

const recordCount = computed<number>(() => {
  const section = state.activeSection
  if (section === 'api-volumes')     return filteredSuccessApiData.value.length
  if (section.startsWith('api'))     return filteredApiData.value.length
  if (section.startsWith('payment')) return filteredPaymentData.value.length
  return filteredRtData.value.length
})

// ── CSV export config (active section drives shape) ──────────────────────
interface CsvExportConfig {
  label:    string
  filename: string
  rows:     readonly AnyRow[]
  columns:  readonly string[]
}

const csvExport = computed<CsvExportConfig | null>(() => {
  const s = state.activeSection
  if (s.startsWith('payment')) {
    return {
      label: 'Download payments log',
      filename: datedFilename('payments-log'),
      rows: filteredPaymentData.value,
      columns: ['day', 'month', 'lfi', 'tpp', 'consentType', 'status', 'rawStatus', 'count', 'amount', 'successCount', 'failCount'],
    }
  }
  if (s.startsWith('auth')) {
    return {
      label: 'Download auth log',
      filename: datedFilename('auth-log'),
      rows: filteredAuthData.value,
      columns: ['day', 'month', 'lfi', 'url', 'type', 'count'],
    }
  }
  if (s.startsWith('api') || s === 'response-time' || s.startsWith('rt')) {
    return {
      label: 'Download API log',
      filename: datedFilename('api-log'),
      rows: filteredApiData.value,
      columns: ['day', 'month', 'lfi', 'tpp', 'family', 'version', 'endpoint', 'status', 'volume', 'errors', 'avgMs', 'p50', 'p95', 'p99'],
    }
  }
  return null
})

function downloadActiveCsv(): void {
  if (!csvExport.value) return
  const { filename, rows, columns } = csvExport.value
  downloadCsv(filename, rows, columns)
}

function dataFor(source: DataSource): AnyRow[] {
  return dataForSource(source)
}
</script>

<template>
  <section class="db-charts">

    <!-- Section header -->
    <div class="db-charts__header">
      <div class="db-charts__title-block">
        <span class="db-charts__eyebrow">§ {{ sectionEyebrow }}</span>
        <h2 class="db-charts__title">{{ meta.title }}</h2>
        <p class="db-charts__desc">{{ meta.description }}</p>
      </div>
      <div class="db-charts__actions">
        <span class="db-charts__count">{{ recordCount.toLocaleString() }} records</span>
        <button
          v-if="csvExport"
          class="db-charts__csv"
          :disabled="!csvExport.rows.length"
          @click="downloadActiveCsv"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ csvExport.label }}
        </button>
      </div>
    </div>

    <!-- Chart grid -->
    <div class="db-charts__grid">
      <div
        v-for="chart in visibleCharts"
        :key="chart.id"
        class="db-charts__cell"
        :style="{
          gridColumn: chart.span    ? `span ${chart.span}`    : undefined,
          gridRow:    chart.rowSpan ? `span ${chart.rowSpan}` : undefined,
          maxHeight:  chart.maxHeight || undefined,
        }"
      >
        <DashboardChart :config="chart" :data="dataFor(chart.dataSource)" />
      </div>
    </div>

  </section>
</template>

<style scoped>
.db-charts {
  padding: 1.5rem 0;
  flex: 1;
  min-width: 0;
}

/* ── Section header ───────────────────────────────────────────────────── */
.db-charts__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--at-grid-line-2);
  flex-wrap: wrap;
}

.db-charts__title-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.db-charts__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--at-teal);
}

.db-charts__title {
  font-family: var(--at-serif);
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.db-charts__desc {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 60ch;
  line-height: 1.45;
}

.db-charts__actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-shrink: 0;
}

.db-charts__count {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--at-mute);
  white-space: nowrap;
}

.db-charts__csv {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid var(--at-navy-deep);
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border-radius: 0;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.db-charts__csv:not(:disabled):hover {
  background: var(--at-teal);
  border-color: var(--at-teal);
  color: var(--at-navy-deep);
}

.db-charts__csv:disabled {
  opacity: 0.35;
  cursor: default;
}

/* ── Grid ─────────────────────────────────────────────────────────────── */
.db-charts__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(360px, auto);
  gap: 1rem;
}

.db-charts__cell {
  display: flex;
  min-width: 0;
}

.db-charts__cell > * {
  flex: 1;
  min-width: 0;
}

.db-charts__cell :deep(.chart-wrap) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.db-charts__cell :deep(.chart-container) {
  flex: 1;
  min-height: 280px;
  height: auto;
}

@media (max-width: 900px) {
  .db-charts__grid { grid-template-columns: 1fr; }
  .db-charts__header { align-items: flex-start; }
}

@media (max-width: 600px) {
  .db-charts { padding: 1rem 0; }
  .db-charts__title { font-size: 1.3rem; }
}
</style>
