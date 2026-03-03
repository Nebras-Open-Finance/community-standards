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
  const response = await fetch('/api/payment-log-1nov-22feb.json')
  rawData.value = await response.json()
  updateChart()
}

// Filter by selected month (DD/MM/YYYY → YYYY-MM)
const getFilteredData = () =>
  rawData.value.filter(item => {
    if (!item.Date) return false
    const monthKey = item.Date.slice(6, 10) + '-' + item.Date.slice(3, 5)
    return monthKey === selectedMonth.value
  })

// Sum amount per LFI
const buildAmountsByLFI = data => {
  const map = {}
  data.forEach(item => {
    const key = item.LFI || 'Unknown'
    if (key.toUpperCase() === 'UNKNOWN') return // skip unknown
    const amount = Number(item.amount) || 0
    map[key] = (map[key] || 0) + amount
  })
  return {
    labels: Object.keys(map).sort(), // alphabetically
    values: Object.keys(map).sort().map(k => map[k])
  }
}

// Create / update chart
const updateChart = () => {
  if (chartInstance) chartInstance.destroy()

  const filtered = getFilteredData()
  const { labels, values } = buildAmountsByLFI(filtered)

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
            label: ctx => `${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Amount (AED)' }
        },
        x: {
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