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

const getApiFamily = (url) => {
  if (!url || !url.startsWith('open-finance/')) return 'other'
  const parts = url.split('/')
  if (parts.length > 1) return parts[1]
  return 'other'
}

// Group by TPP and API family (stacked)
const buildStackedByTppFamily = (data) => {
  const tpps = new Set()
  const families = new Set()
  const bucket = {}

  // Map of TPP replacements
  const tppMap = {
    'PAY TEN PAYMENT SERVICES PROVIDER LLC': 'Pay10'
    // Add more replacements here if needed
  }

  data.forEach(item => {
    let tpp = item.Tpp
    if (!tpp || tpp.toUpperCase() === 'UNKNOWN') return
    if (tppMap[tpp]) tpp = tppMap[tpp]

    const family = getApiFamily(item.url)
    const value = Number(item.Volume) || 0

    tpps.add(tpp)
    families.add(family)

    if (!bucket[tpp]) bucket[tpp] = {}
    bucket[tpp][family] = (bucket[tpp][family] || 0) + value
  })

  const labels = Array.from(tpps).sort()
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

  const datasets = familyList.map((fam, idx) => ({
    label: fam,
    data: labels.map(tpp => bucket[tpp]?.[fam] || 0),
    backgroundColor: palette[idx % palette.length],
    borderColor: palette[idx % palette.length],
    borderWidth: 1,
    borderRadius: 8,
    maxBarThickness: 50,
    stack: 'families'
  }))

  return { labels, datasets }
}

// Create / update chart
const updateChart = () => {
  const filtered = getFilteredData()
  const { labels, datasets } = buildStackedByTppFamily(filtered)

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
            title: { display: true, text: 'TPP' }
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
