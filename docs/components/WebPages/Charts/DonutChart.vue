<template>
    <div class="donut-wrapper">
        <div class="donut-title">{{ title }}</div>
        <canvas ref="chartRef"></canvas>

        <!-- Center label -->
        <div class="donut-center">
        </div>
    </div>
</template>

<script >
import {
    Chart,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

export default {
    props: {
        title: { type: String, required: true },

        // Accept an array of items: [{ label: string, value: number }]
        items: {
            type: Array,
            required: true,
            default: () => [],
            validator(arr) {
                return arr.every(
                    i =>
                        typeof i.label === 'string' &&
                        typeof i.value === 'number'
                )
            }
        },

        // Optional colors array
        colors: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            chart: null
        }
    },


    mounted() {
        this.createChart()
    },

    watch: {
        items: {
            deep: true,
            handler() {
                this.updateChart()
            }
        }
    },

    methods: {
        createChart() {
            this.chart = new Chart(this.$refs.chartRef, {
                type: 'doughnut',
                data: {
                    labels: this.items.map(i => i.label),
                    datasets: [
                        {
                            data: this.items.map(i => i.value),
                            backgroundColor: this.getColors(),
                            borderWidth: 0
                        }
                    ]
                },
                options: {
                    cutout: '75%',
                    radius: 100,   // radius of the outer edge
                    responsive: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true, // small circles instead of squares
                                boxWidth: 12,        // width of legend box
                                boxHeight: 12,       // height of legend box
                                font: {
                                    size: 10           // shrink label font size
                                },
                                padding: 8           // spacing between items
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: ctx => `${ctx.label}: ${ctx.raw}`
                            }
                        }
                    }
                }
            })
        },

        updateChart() {
            if (!this.chart) return
            this.chart.data.labels = this.items.map(i => i.label)
            this.chart.data.datasets[0].data = this.items.map(i => i.value)
            this.chart.data.datasets[0].backgroundColor = this.getColors()
            this.chart.update()
        },

        // Generate colors: use prop.colors if provided, otherwise default palette
        getColors() {
            const defaultPalette = [
                'rgba(122, 210, 248, 0.95)',
                'rgba(0, 192, 167, 0.55)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.7)',
                'rgba(168, 85, 247, 0.7)'
            ]

            return this.items.map((_, i) =>
                this.colors[i] || defaultPalette[i % defaultPalette.length]
            )
        }
    }
}
</script>

<style scoped>
.donut-title {
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 0.5rem;
    font-weight: 500;
    opacity: 75%;
}

.donut-wrapper {
    position: relative;
    width:360px;
    height: 260px;
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

.total {
    font-size: 2.2rem;
    font-weight: 800;
    color: #f8fafc;
}

.label {
    font-size: 0.85rem;
    color: #94a3b8;
}
</style>
