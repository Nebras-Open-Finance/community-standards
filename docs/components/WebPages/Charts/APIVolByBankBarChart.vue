<template>
  <div class="chart-card">
    <div class="controls">
      <label>Month:</label>
      <input type="month" v-model="selectedMonth" />
    </div>

    <div class="chart-container">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { sortLfis, formatLfiLabel } from './chartHelpers'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const canvasRef = ref(null)
let chartInstance = null
const rawData = ref([])

// Robust month key parser (handles "08/02/2026", "21/12/2025 0:00", null, etc.)
const parseMonthKey = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null
  const datePart = dateStr.trim().split(' ')[0]
  const parts = datePart.split('/')
  if (parts.length !== 3) return null
  const [day, month, year] = parts.map(Number)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null
  return `${year}-${String(month).padStart(2, '0')}`
}

// Default fallback (will be overwritten by real latest month)
const getFallbackMonth = () => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  return d.toISOString().slice(0, 7)
}

const selectedMonth = ref(getFallbackMonth())

// Load JSON
const loadData = async () => {
  try {
    const response = await fetch('/api/aggregated-api-log.json')
    rawData.value = await response.json()

    // Set to the latest month that has open-finance data
    const months = new Set()
    rawData.value.forEach(item => {
      if (item.url && item.url.startsWith('open-finance/')) {
        const mk = parseMonthKey(item.Date)
        if (mk) months.add(mk)
      }
    })
    if (months.size > 0) {
      selectedMonth.value = [...months].sort().pop() // latest month
    }

    updateChart()
  } catch (err) {
    console.error('Failed to load API log:', err)
  }
}

// Filter: ONLY open-finance/ URLs + selected month
const getFilteredData = () => {
  return rawData.value.filter(item => {
    if (!item.url || !item.url.startsWith('open-finance/')) return false

    const monthKey = parseMonthKey(item.Date)
    return !selectedMonth.value || monthKey === selectedMonth.value
  })
}

// Group by LFI and API family (for stacking)
const buildStackedByLFI = (data) => {
  const lfis = new Set()
  const families = new Set()
  const buckets = {}

  data.forEach(item => {
    const lfi = item.LFI || 'Unknown'
    const volume = Number(item.Volume) || 0
    const family = (() => {
      const parts = (item.url || '').split('/')
      const idx = parts.indexOf('open-finance')
      if (idx >= 0 && parts.length > idx + 1) return parts[idx + 1]
      if (parts.length > 1) return parts[1]
      return 'other'
    })()

    lfis.add(lfi)
    families.add(family)

    if (!buckets[lfi]) buckets[lfi] = {}
    buckets[lfi][family] = (buckets[lfi][family] || 0) + volume
  })

  const orderedLfis = sortLfis(Array.from(lfis))
  const familyList = Array.from(families).sort()
  const palette = [
    '#4F46E5',
    '#10B981',
    '#F59E0B',
    '#3B82F6',
    '#EC4899',
    '#8B5CF6',
    '#F97316',
    '#14B8A6'
  ]

  const datasets = familyList.map((family, idx) => ({
    label: family,
    data: orderedLfis.map(lfi => buckets[lfi]?.[family] || 0),
    backgroundColor: palette[idx % palette.length],
    borderColor: palette[idx % palette.length],
    borderWidth: 1,
    borderRadius: 8,
    maxBarThickness: 50,
    stack: 'apiFamilies'
  }))

  return { labels: orderedLfis.map(formatLfiLabel), datasets }
}

// Create / update chart (stacked by API family per LFI)
const updateChart = () => {
  const filtered = getFilteredData()
  const { labels, datasets } = buildStackedByLFI(filtered)

  if (chartInstance) {
    chartInstance.data.labels = labels
    chartInstance.data.datasets = datasets
    chartInstance.update()
  } else {
    chartInstance = new Chart(canvasRef.value, {
      type: 'bar',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'bottom' },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()} calls`
            }
          }
        },
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            title: { display: true, text: 'Total API Calls' }
          },
          x: {
            stacked: true,
            title: { display: true, text: 'LFI' }
          }
        }
      }
    })
  }
}

onMounted(loadData)
watch(selectedMonth, updateChart)
</script>

<style scoped>
.chart-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.controls {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.chart-container {
  height: 320px;
}
</style>
