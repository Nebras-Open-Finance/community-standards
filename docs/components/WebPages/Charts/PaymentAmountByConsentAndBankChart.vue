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
import { sortLfis, formatLfiLabel } from './chartHelpers'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const canvasRef = ref(null)
let chartInstance = null
const rawData = ref([])

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

const getLastMonth = () => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  return d.toISOString().slice(0, 7)
}

const selectedMonth = ref(getLastMonth())

const loadData = async () => {
  const response = await fetch('/api/payment-log.json')
  rawData.value = await response.json()
  updateChart()
}

const getFilteredData = () =>
  rawData.value.filter(item => {
    if (!item.Date) return false
    const monthKey = item.Date.slice(6, 10) + '-' + item.Date.slice(3, 5)
    return !selectedMonth.value || monthKey === selectedMonth.value
  })

const buildAmountsByLFIConsent = data => {
  const map = {}
  const consentSet = new Set()

  data.forEach(item => {
    const lfi = item.LFI || 'Unknown'
    if (lfi.toUpperCase() === 'UNKNOWN') return
    const consent = item.paymentConsentType || 'Unknown'
    const amount = Number(item.amount) || 0

    consentSet.add(consent)
    if (!map[lfi]) map[lfi] = {}
    map[lfi][consent] = (map[lfi][consent] || 0) + amount
  })

  const ordered = sortLfis(Object.keys(map))
  const consents = Array.from(consentSet).sort()

  const datasets = consents.map((consent, idx) => ({
    label: consent,
    data: ordered.map(lfi => map[lfi]?.[consent] || 0),
    backgroundColor: palette[idx % palette.length],
    borderColor: palette[idx % palette.length],
    borderWidth: 1,
    borderRadius: 8,
    maxBarThickness: 50,
    stack: 'consents'
  }))

  return { labels: ordered.map(formatLfiLabel), datasets }
}

const updateChart = () => {
  if (chartInstance) chartInstance.destroy()

  const filtered = getFilteredData()
  const { labels, datasets } = buildAmountsByLFIConsent(filtered)

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom' },
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
