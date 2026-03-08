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
import { sortLfis, formatLfiLabel, getStatusBucket } from './chartHelpers'

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

// Group counts by LFI and compute success rate
const buildCountsAndRateByLFI = data => {
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

  const ordered = sortLfis(Object.keys(map))
  const totals = ordered.map(k => map[k].pending + map[k].rejected + map[k].successful)
  const successRates = ordered.map((k, idx) => {
    const total = totals[idx]
    if (!total) return 0
    return (map[k].successful / total) * 100
  })

  return {
    labels: ordered.map(formatLfiLabel),
    totals,
    successRates
  }
}

// Create / update chart
const updateChart = () => {
  if (chartInstance) chartInstance.destroy()

  const filtered = getFilteredData()
  const { labels, totals, successRates } = buildCountsAndRateByLFI(filtered)

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          label: 'Total Payments',
          data: totals,
          backgroundColor: 'rgba(79, 70, 229, 0.65)',
          borderRadius: 8,
          maxBarThickness: 50,
          yAxisID: 'yCount'
        },
        {
          type: 'line',
          label: 'Success Rate (%)',
          data: successRates,
          borderColor: '#10B981',
          backgroundColor: '#10B98155',
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 4,
          pointBackgroundColor: '#10B981',
          yAxisID: 'yRate',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom' },
        tooltip: {
          callbacks: {
            label: ctx => {
              if (ctx.dataset.type === 'line') {
                return `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} %`
              }
              return `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`
            }
          }
        }
      },
      scales: {
        yCount: {
          beginAtZero: true,
          title: { display: true, text: 'Count (#)' }
        },
        yRate: {
          beginAtZero: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          title: { display: true, text: 'Success Rate (%)' },
          ticks: {
            callback: value => `${value}%`
          }
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

