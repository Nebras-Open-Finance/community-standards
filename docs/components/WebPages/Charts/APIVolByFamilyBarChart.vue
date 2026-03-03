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

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

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

/* =========================
   EXTRACT API FAMILY
========================= */
const getApiFamily = (url) => {
  if (!url || !url.startsWith('open-finance/')) return null

  const parts = url.split('/')
  return parts.length > 1 ? `${parts[1]} ${parts[2]}` : null
}

/* =========================
   LOAD DATA
========================= */
const loadData = async () => {
  try {
    const response = await fetch('/api/aggregated-api-log-1nov-22feb.json')
    rawData.value = await response.json()

    const months = new Set()
    rawData.value.forEach(item => {
      if (item.url?.startsWith('open-finance/')) {
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
    if (!item.url?.startsWith('open-finance/')) return false
    const monthKey = parseMonthKey(item.Date)
    return monthKey === selectedMonth.value
  })
}

/* =========================
   GROUP BY API FAMILY
========================= */
const buildGroupedByFamily = (data) => {
  const map = {}

  data.forEach(item => {
    const family = getApiFamily(item.url)
    if (!family) return

    const volume = Number(item.Volume) || 0
    map[family] = (map[family] || 0) + volume
  })

  const sorted = Object.entries(map)
    .sort((a, b) => b[1] - a[1])

  return {
    labels: sorted.map(([k]) => k),
    values: sorted.map(([, v]) => v)
  }
}

/* =========================
   CREATE / UPDATE CHART
========================= */
const updateChart = () => {
  const filtered = getFilteredData()
  const { labels, values } = buildGroupedByFamily(filtered)

  if (chartInstance) {
    chartInstance.data.labels = labels
    chartInstance.data.datasets[0].data = values
    chartInstance.update()
  } else {
    chartInstance = new Chart(canvasRef.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Open Finance API Calls (by Family)',
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
              label: ctx => `${ctx.parsed.y.toLocaleString()} calls`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Total API Calls' }
          },
          x: {
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
  background: rgba(255, 255, 255, 0.7);
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