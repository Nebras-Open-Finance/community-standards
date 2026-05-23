// Chart.js theming. Chart.js bakes colours at chart-build time, so the
// dark CSS token remap doesn't reach axis ticks, grid lines, or legends
// — those are JS values handed to Chart.js as plain strings. This
// composable returns the right palette for the active theme and lets
// chart components subscribe to theme changes so they can rebuild.

import { onBeforeUnmount } from 'vue'

export interface ChartTokens {
  axisTick:     string  // small axis tick labels
  axisLabel:    string  // x-axis category labels
  axisTitle:    string  // axis title text (e.g. "ms")
  grid:         string  // gridlines drawn behind data
  legend:       string  // legend swatch label colour
  tooltipBg:    string
  tooltipTitle: string
  tooltipBody:  string
  pointBorder:  string  // ring around point markers — matches card bg
}

const LIGHT: ChartTokens = {
  axisTick:     'rgba(0, 23, 56, 0.55)',
  axisLabel:    'rgba(0, 23, 56, 0.72)',
  axisTitle:    'rgba(0, 23, 56, 0.55)',
  grid:         'rgba(0, 39, 127, 0.08)',
  legend:       '#001738',
  tooltipBg:    '#001738',
  tooltipTitle: '#FAFAF7',
  tooltipBody:  '#D7DEE8',
  pointBorder:  '#FFFFFF',
}

const DARK: ChartTokens = {
  axisTick:     'rgba(232, 238, 246, 0.62)',
  axisLabel:    'rgba(232, 238, 246, 0.82)',
  axisTitle:    'rgba(232, 238, 246, 0.62)',
  grid:         'rgba(255, 255, 255, 0.10)',
  legend:       '#E8EEF6',
  tooltipBg:    '#1A2440',
  tooltipTitle: '#FAFAF7',
  tooltipBody:  '#D7DEE8',
  pointBorder:  '#161F33',
}

export function chartTokens(): ChartTokens {
  if (typeof document === 'undefined') return LIGHT
  return document.documentElement.classList.contains('dark') ? DARK : LIGHT
}

const subscribers = new Set<() => void>()
let observer: MutationObserver | null = null

function ensureObserver(): void {
  if (observer || typeof document === 'undefined') return
  observer = new MutationObserver(() => {
    subscribers.forEach((cb) => cb())
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

function maybeTeardown(): void {
  if (subscribers.size === 0 && observer) {
    observer.disconnect()
    observer = null
  }
}

/**
 * Subscribe to dark-class changes on <html>. Auto-unsubscribes when the
 * caller's component unmounts. Use in chart components to rebuild the
 * canvas with fresh colours when the user toggles theme.
 */
export function onThemeChange(cb: () => void): void {
  if (typeof document === 'undefined') return
  ensureObserver()
  subscribers.add(cb)
  onBeforeUnmount(() => {
    subscribers.delete(cb)
    maybeTeardown()
  })
}
