<template>
  <div class="chart-card">
    <div class="chart-container">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

// Robust date parser
const parseMonthKey = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null
  const datePart = dateStr.trim().split(' ')[0]
  const parts = datePart.split('/')
  if (parts.length !== 3) return null
  const [day, month, year] = parts.map(Number)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null
  return `${year}-${String(month).padStart(2, '0')}`
}

const loadData = async () => {
  try {
    const response = await fetch('/api/aggregated-api-log.json')
    rawData.value = await response.json()
    createChart()
  } catch (err) {
    console.error('Failed to load API log:', err)
  }
}

const createChart = () => {
  if (chartInstance) chartInstance.destroy()

  const monthFamilyTotals = {}
  const familiesSet = new Set()

  rawData.value.forEach(item => {
    // === FILTER: Only URLs starting with "open-finance/" ===
    if (!item.url || !item.url.startsWith('open-finance/')) return

    const monthKey = parseMonthKey(item.Date)
    if (!monthKey) return

    const volume = Number(item.Volume) || 0
    const family = (() => {
      const parts = item.url.split('/')
      const idx = parts.indexOf('open-finance')
      if (idx >= 0 && parts.length > idx + 1) return parts[idx + 1]
      if (parts.length > 1) return parts[1]
      return 'other'
    })()

    familiesSet.add(family)

    if (!monthFamilyTotals[monthKey]) monthFamilyTotals[monthKey] = {}
    monthFamilyTotals[monthKey][family] = (monthFamilyTotals[monthKey][family] || 0) + volume
  })

  const labels = Object.keys(monthFamilyTotals).sort()
  const families = Array.from(familiesSet).sort()

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

  const datasets = families.map((family, idx) => ({
    label: family,
    data: labels.map(month => monthFamilyTotals[month]?.[family] || 0),
    backgroundColor: palette[idx % palette.length],
    borderColor: palette[idx % palette.length],
    borderWidth: 1,
    borderRadius: 8,
    maxBarThickness: 60,
    stack: 'apiFamilies'
  }))

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
          backgroundColor: '#1F2937',
          titleColor: '#F3F4F6',
          bodyColor: '#F3F4F6'
        }
      },
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          title: { display: true, text: 'Total API Calls', font: { size: 14 } }
        },
        x: {
          stacked: true,
          title: { display: true, text: 'Month (YYYY-MM)', font: { size: 14 } }
        }
      }
    }
  })
}

onMounted(loadData)
</script>

<style scoped>
.chart-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.chart-container {
  height: 363px;
}
</style>
