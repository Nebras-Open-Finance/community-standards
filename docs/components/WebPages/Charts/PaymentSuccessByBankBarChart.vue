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

const getLastMonth = () => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  return d.toISOString().slice(0, 7)
}

const selectedMonth = ref(getLastMonth())

const getStatusBucket = (status) => {
  const normalized = String(status || '').toLowerCase()

  if (normalized.includes('pending') || normalized.includes('received')) return 'pending'
  if (normalized.includes('rejected')) return 'rejected'
  return 'successful'
}

// Load JSON
const loadData = async () => {
  const response = await fetch('/api/payment-log.json')
  rawData.value = await response.json()
  updateChart()
}

// Filter by selected month (DD/MM/YYYY -> YYYY-MM)
const getFilteredData = () =>
  rawData.value.filter(item => {
    if (!item.Date) return false
    const monthKey = item.Date.slice(6, 10) + '-' + item.Date.slice(3, 5)
    return !selectedMonth.value || monthKey === selectedMonth.value
  })

// Group counts by LFI and status bucket
const buildStatusByLFI = data => {
  const map = {}

  data.forEach(item => {
    const key = item.LFI || 'Unknown'
    if (key.toUpperCase() === 'UNKNOWN') return

    const count = Number(item.Count) || 0
    const bucket = getStatusBucket(item.status)

    if (!map[key]) {
      map[key] = { pending: 0, rejected: 0, successful: 0 }
    }

    map[key][bucket] += count
  })

  const labels = Object.keys(map).sort()
  return {
    labels,
    pendingValues: labels.map(k => map[k].pending),
    rejectedValues: labels.map(k => map[k].rejected),
    successfulValues: labels.map(k => map[k].successful)
  }
}

// Create / update chart
const updateChart = () => {
  if (chartInstance) chartInstance.destroy()

  const filtered = getFilteredData()
  const { labels, pendingValues, rejectedValues, successfulValues } = buildStatusByLFI(filtered)

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pending',
          data: pendingValues,
          backgroundColor: 'rgba(245, 158, 11, 0.75)',
          borderRadius: 8,
          maxBarThickness: 50
        },
        {
          label: 'Rejected',
          data: rejectedValues,
          backgroundColor: 'rgba(239, 68, 68, 0.75)',
          borderRadius: 8,
          maxBarThickness: 50
        },
        {
          label: 'Successful',
          data: successfulValues,
          backgroundColor: 'rgba(16, 185, 129, 0.75)',
          borderRadius: 8,
          maxBarThickness: 50
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          title: { display: true, text: 'Count (#)' }
        },
        x: {
          stacked: true,
          title: { display: true, text: 'LFI' }
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

