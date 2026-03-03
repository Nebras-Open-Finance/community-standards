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

// Load JSON
const loadData = async () => {
  const response = await fetch('/api/payment-log-1nov-22feb.json')
  rawData.value = await response.json()
  createChart()
}

// Create chart
const createChart = () => {
  if (chartInstance) chartInstance.destroy()

  // Group amounts by month (YYYY-MM)
  const grouped = {}
  rawData.value.forEach(item => {
    if (!item.Date) return

    const monthKey = item.Date.slice(6, 10) + '-' + item.Date.slice(3, 5) // Convert DD/MM/YYYY → YYYY-MM
    const value = Number(item.amount) || 0

    if (!grouped[monthKey]) grouped[monthKey] = 0
    grouped[monthKey] += value
  })

  const labels = Object.keys(grouped).sort()
  const values = labels.map(month => grouped[month])

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Amount',
          data: values,
          backgroundColor: 'rgba(79, 70, 229, 0.5)', // 50% opacity
          borderRadius: 8,
          maxBarThickness: 60
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
            label: ctx => `${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Amount (AED)' }
        },
        x: {
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
  background: rgba(255, 255, 255, 0.7);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.chart-container {
  height: 365px;
}
</style>