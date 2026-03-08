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
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const canvasRef = ref(null)
let chartInstance = null
const rawData = ref([])

/* =========================
   MONTH PARSER
========================= */
const parseMonthKey = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null
  const datePart = dateStr.trim().split(' ')[0]
  const parts = datePart.split('/')
  if (parts.length !== 3) return null
  const [day, month, year] = parts.map(Number)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null
  return `${year}-${String(month).padStart(2, '0')}`
}

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
   EXTRACT API FAMILY
========================= */
const getApiFamily = (url) => {
  if (!url || !url.startsWith('open-finance/')) return null

  const parts = url.split('/')
  if (parts.length > 2) {
    const version = parts[2] || ''
    return {
      family: parts[1],
      version
    }
  }
  return null
}

/* =========================
   LOAD DATA
========================= */
const loadData = async () => {
  try {
    const response = await fetch('/api/aggregated-api-log.json')
    rawData.value = await response.json()

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

    updateChart()
  } catch (err) {
    console.error('Failed to load API log:', err)
  }
}

/* =========================
   FILTER DATA
========================= */
const getFilteredData = () => {
  return rawData.value.filter(item => {
    if (!isIncludedOpenFinanceUrl(item.url)) return false
    const monthKey = parseMonthKey(item.Date)
    return !selectedMonth.value || monthKey === selectedMonth.value
  })
}

/* =========================
   GROUP BY API FAMILY
========================= */
const buildStackedByFamilyVersion = (data) => {
  const families = new Set()
  const versions = new Set()
  const bucket = {}

  data.forEach(item => {
    const info = getApiFamily(item.url)
    if (!info) return
    const { family, version } = info
    families.add(family)
    versions.add(version)
    const vol = Number(item.Volume) || 0
    if (!bucket[family]) bucket[family] = {}
    bucket[family][version] = (bucket[family][version] || 0) + vol
  })

  const labels = Array.from(families).sort()
  const versionList = Array.from(versions).sort()

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

  const datasets = versionList.map((ver, idx) => ({
    label: ver || 'v? (unspecified)',
    data: labels.map(fam => bucket[fam]?.[ver] || 0),
    backgroundColor: palette[idx % palette.length],
    borderColor: palette[idx % palette.length],
    borderWidth: 1,
    borderRadius: 8,
    maxBarThickness: 50,
    stack: 'versions'
  }))

  return { labels, datasets }
}

/* =========================
   CREATE / UPDATE CHART
========================= */
const updateChart = () => {
  const filtered = getFilteredData()
  const { labels, datasets } = buildStackedByFamilyVersion(filtered)

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
              label: ctx => `${ctx.parsed.y.toLocaleString()} calls`
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
            title: { display: true, text: 'API Family' }
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

