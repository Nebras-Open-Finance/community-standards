<template>
  <div class="donut-wrapper">
    <div class="donut-title">{{ title }}</div>
    <canvas ref="chartRef"></canvas>
    <div class="donut-center"></div>
  </div>
</template>

<script>
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const DEFAULT_PALETTE = [
  '#00C2A9',
  '#00277F',
  '#008BE4',
  '#B37819',
  '#0043A6',
  '#00A2FB',
  '#008B78',
]

export default {
  props: {
    title:  { type: String, required: true },
    items:  {
      type: Array,
      required: true,
      default: () => [],
      validator(arr) {
        return arr.every(i => typeof i.label === 'string' && typeof i.value === 'number')
      },
    },
    colors: { type: Array, default: () => [] },
  },

  data() {
    return { chart: null }
  },

  mounted() { this.createChart() },

  watch: {
    items: {
      deep: true,
      handler() { this.updateChart() },
    },
  },

  methods: {
    createChart() {
      this.chart = new Chart(this.$refs.chartRef, {
        type: 'doughnut',
        data: {
          labels: this.items.map(i => i.label),
          datasets: [{
            data: this.items.map(i => i.value),
            backgroundColor: this.getColors(),
            borderWidth: 2,
            borderColor: '#FAFAF7',
          }],
        },
        options: {
          cutout: '72%',
          radius: 100,
          responsive: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                boxWidth: 10,
                boxHeight: 10,
                font: { family: 'Poppins, sans-serif', size: 10 },
                color: '#001738',
                padding: 8,
              },
            },
            tooltip: {
              backgroundColor: '#001738',
              titleColor: '#FAFAF7',
              bodyColor: '#D7DEE8',
              borderRadius: 0,
              padding: 10,
              titleFont: { family: 'IBM Plex Mono, monospace', size: 10, weight: '500' },
              bodyFont: { family: 'Poppins, sans-serif', size: 11 },
              callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}` },
            },
          },
        },
      })
    },

    updateChart() {
      if (!this.chart) return
      this.chart.data.labels = this.items.map(i => i.label)
      this.chart.data.datasets[0].data = this.items.map(i => i.value)
      this.chart.data.datasets[0].backgroundColor = this.getColors()
      this.chart.update()
    },

    getColors() {
      return this.items.map((_, i) => this.colors[i] || DEFAULT_PALETTE[i % DEFAULT_PALETTE.length])
    },
  },
}
</script>

<style scoped>
.donut-wrapper {
  position: relative;
  width: 360px;
  height: 260px;
}

.donut-title {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--at-mute);
}

canvas {
  width: 100%;
  height: 100%;
  transform: translateY(-4rem);
}

.donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
</style>
