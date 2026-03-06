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
import { ref, onMounted, watch, nextTick } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const canvasRef = ref(null)
let chartInstance = null
const rawData = ref([])

/* =========================
   DATE PARSING
   Handles:
   "26/12/2025 0:00"
   "08/02/2026"
   null values
========================= */
const parseMonthKey = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null

  const datePart = dateStr.trim().split(' ')[0]
  const parts = datePart.split('/')
  if (parts.length !== 3) return null

  const [day, month, year] = parts.map(Number)
  if (!day || !month || !year) return null

  return `${year}-${String(month).padStart(2, '0')}`
}

/* =========================
   DEFAULT MONTH (Previous)
========================= */
const getFallbackMonth = () => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  return d.toISOString().slice(0, 7)
}

const selectedMonth = ref(getFallbackMonth())

const isIncludedOpenFinanceUrl = (url) => {
  if (!url?.startsWith('open-finance/')) return false
  if (url.includes('account-access-consents')) return false
  if (url.includes('payment-consents')) return false
  return true
}

/* =========================
   LOAD DATA
========================= */
const loadData = async () => {
  try {
    const response = await fetch('/api/aggregated-api-log.json')
    rawData.value = await response.json()

    // Auto-select latest available month
    const months = new Set()

    rawData.value.forEach(item => {
      if (isIncludedOpenFinanceUrl(item.url)) {
        const mk = parseMonthKey(item.Date)
        if (mk) months.add(mk)
      }
    })

    if (months.size > 0) {
      selectedMonth.value = [...months].sort().pop()
    }

    await nextTick()
    createChart()
  } catch (err) {
    console.error('Failed to load API log:', err)
  }
}

/* =========================
   FILTER DATA
   - Only open-finance/
   - Only selected month
========================= */
const getFilteredData = () => {
  return rawData.value.filter(item => {
    if (!isIncludedOpenFinanceUrl(item.url)) return false
    const monthKey = parseMonthKey(item.Date)
    return !selectedMonth.value || monthKey === selectedMonth.value
  })
}

/* =========================
   BUILD AVERAGES
   executionTime is already TOTAL
========================= */
const buildAverages = (data) => {
  const map = {}

  data.forEach(item => {
    const key = item.LFI || 'Unknown'
    const volume = Number(item.Volume) || 0
    const errors = Number(item.Error) || 0

    if (!map[key]) {
      map[key] = {
        totalVolume: 0,   // ✅ YOU WERE MISSING THIS
        totalErrors: 0
      }
    }

    map[key].totalVolume += volume
    map[key].totalErrors += errors
  })

  const entries = Object.entries(map)
    .map(([lfi, stats]) => ({
      lfi,
      avg: stats.totalVolume
        ? (stats.totalErrors / stats.totalVolume) * 100 // ✅ make it %
        : 0
    }))
    .sort((a, b) => b.avg - a.avg)

  return {
    labels: entries.map(e => e.lfi),
    values: entries.map(e => e.avg)
  }
}

/* =========================
   CREATE CHART
========================= */
const createChart = () => {
  if (!canvasRef.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  const filtered = getFilteredData()
  const { labels, values } = buildAverages(filtered)

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Error Rate (%)',
          data: values,
          backgroundColor: '#4F46E5',
          borderColor: '#4338CA',
          borderWidth: 2,
          borderRadius: 8,
          maxBarThickness: 50
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.parsed.y.toFixed(0)} %`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Error Rate (%)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'LFI'
          }
        }
      }
    }
  })
}

/* =========================
   UPDATE CHART
========================= */
const updateChart = () => {
  if (!chartInstance) {
    createChart()
    return
  }

  const filtered = getFilteredData()
  const { labels, values } = buildAverages(filtered)

  chartInstance.data.labels = labels
  chartInstance.data.datasets[0].data = values
  chartInstance.update()
}

/* =========================
   LIFECYCLE
========================= */
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

