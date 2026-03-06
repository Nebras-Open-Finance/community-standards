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

// default to last month
const getLastMonth = () => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  return d.toISOString().slice(0, 7)
}

const selectedMonth = ref(getLastMonth())

// Load JSON
const loadData = async () => {
  const response = await fetch('/api/payment-log.json')
  rawData.value = await response.json()
  updateChart()
}

// Filter by selected month (DD/MM/YYYY → YYYY-MM)
const getFilteredData = () =>
  rawData.value.filter(item => {
    if (!item.Date) return false
    const monthKey = item.Date.slice(6, 10) + '-' + item.Date.slice(3, 5)
    return !selectedMonth.value || monthKey === selectedMonth.value
  })

// Compute average payment amount per LFI
const buildAverageAmountByLFI = data => {
  const map = {}

  data.forEach(item => {
    const key = item.LFI || 'Unknown'
    if (key.toUpperCase() === 'UNKNOWN') return

    const amount = Number(item.amount) || 0
    const count = Number(item.Count) || 0
    if (!map[key]) map[key] = { totalAmount: 0, totalCount: 0 }

    map[key].totalAmount += amount
    map[key].totalCount += count
  })

  const labels = Object.keys(map).sort() // alphabetically
  const values = labels.map(k => {
    const entry = map[k]
    return entry.totalCount > 0 ? entry.totalAmount / entry.totalCount : 0
  })

  return { labels, values }
}

// Create / update chart
const updateChart = () => {
  if (chartInstance) chartInstance.destroy()

  const filtered = getFilteredData()
  const { labels, values } = buildAverageAmountByLFI(filtered)

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Average Payment Amount',
          data: values,
          backgroundColor: 'rgba(79, 70, 229, 0.5)', // 50% opacity
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
            label: ctx => `${ctx.parsed.y.toFixed(2)} (AED)`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Average Payment Amount (AED)' }
        },
        x: {
          title: { display: true, text: 'Bank (LFI)' }
        }
      }
    }
  })
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
