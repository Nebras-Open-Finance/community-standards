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
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const canvasRef = ref(null)
let chartInstance = null
const rawData = ref([])

// Load JSON
const loadData = async () => {
  const response = await fetch('/metrics/payment-metrics.json')
  rawData.value = await response.json()
  createChart()
}

// Build sum of amount by paymentConsentType
const buildDonutData = data => {
  const map = {}
  data.forEach(item => {
    const key = item.paymentConsentType
    const value = Number(item.amount) || 0
    map[key] = (map[key] || 0) + value
  })

  return {
    labels: Object.keys(map),
    values: Object.values(map)
  }
}

const createChart = () => {
  const { labels, values } = buildDonutData(rawData.value)

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#4F46E5',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 20,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${ctx.parsed.toFixed(2)}`
          }
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
  height: 320px;
}
</style>
