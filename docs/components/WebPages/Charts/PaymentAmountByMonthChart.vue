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
import { getStatusBucket } from './chartHelpers'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const canvasRef = ref(null)
let chartInstance = null
const rawData = ref([])

// Load JSON
const loadData = async () => {
  const response = await fetch('/api/payment-log.json')
  rawData.value = await response.json()
  createChart()
}

// Create chart
const createChart = () => {
  if (chartInstance) chartInstance.destroy()

  // Group amounts by month (YYYY-MM) and status bucket
  const grouped = {}
  rawData.value.forEach(item => {
    if (!item.Date) return

    const monthKey = item.Date.slice(6, 10) + '-' + item.Date.slice(3, 5)
    const value = Number(item.amount) || 0
    const bucket = getStatusBucket(item.status)

    if (!grouped[monthKey]) {
      grouped[monthKey] = { pending: 0, rejected: 0, successful: 0 }
    }

    grouped[monthKey][bucket] += value
  })

  const labels = Object.keys(grouped).sort()
  const pendingValues = labels.map(month => grouped[month].pending)
  const rejectedValues = labels.map(month => grouped[month].rejected)
  const successfulValues = labels.map(month => grouped[month].successful)

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
          maxBarThickness: 60
        },
        {
          label: 'Rejected',
          data: rejectedValues,
          backgroundColor: 'rgba(239, 68, 68, 0.75)',
          borderRadius: 8,
          maxBarThickness: 60
        },
        {
          label: 'Successful',
          data: successfulValues,
          backgroundColor: 'rgba(16, 185, 129, 0.75)',
          borderRadius: 8,
          maxBarThickness: 60
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
          title: { display: true, text: 'Amount (AED)' }
        },
        x: {
          stacked: true,
          title: { display: true, text: 'Month' }
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
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.chart-container {
  height: 365px;
}
</style>
