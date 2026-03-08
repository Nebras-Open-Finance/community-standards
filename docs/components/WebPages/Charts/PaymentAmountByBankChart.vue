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
import { sortLfis, formatLfiLabel, getStatusBucket } from './chartHelpers'

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

// Filter by selected month (DD/MM/YYYY -> YYYY-MM)
const getFilteredData = () =>
  rawData.value.filter(item => {
    if (!item.Date) return false
    const monthKey = item.Date.slice(6, 10) + '-' + item.Date.slice(3, 5)
    return !selectedMonth.value || monthKey === selectedMonth.value
  })

// Sum amount per LFI by status bucket
const buildAmountsByLFI = data => {
  const map = {}

  data.forEach(item => {
    const key = item.LFI || 'Unknown'
    if (key.toUpperCase() === 'UNKNOWN') return

    const amount = Number(item.amount) || 0
    const bucket = getStatusBucket(item.status)

    if (!map[key]) {
      map[key] = { pending: 0, rejected: 0, successful: 0 }
    }

    map[key][bucket] += amount
  })

  const ordered = sortLfis(Object.keys(map))
  return {
    labels: ordered.map(formatLfiLabel),
    pendingValues: ordered.map(k => map[k].pending),
    rejectedValues: ordered.map(k => map[k].rejected),
    successfulValues: ordered.map(k => map[k].successful)
  }
}

// Create / update chart
const updateChart = () => {
  if (chartInstance) chartInstance.destroy()

  const filtered = getFilteredData()
  const { labels, pendingValues, rejectedValues, successfulValues } = buildAmountsByLFI(filtered)

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
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          title: { display: true, text: 'Amount (AED)' }
        },
        x: {
          stacked: true,
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

