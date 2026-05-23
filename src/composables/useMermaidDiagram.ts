// Shared Mermaid setup for the sequence/flowchart diagram components.
// Each caller passes the diagram source, an id prefix, and (optionally)
// an init config override. The composable handles theme detection,
// re-render on toggle, and the standard error fallback.

import mermaid from 'mermaid'
import { ref, onMounted, type Ref } from 'vue'
import { onThemeChange } from './useChartTheme'

const DEFAULT_SEQUENCE = {
  diagramMarginX: 50,
  diagramMarginY: 30,
  actorMargin:    80,
  width:          200,
  height:         65,
  boxMargin:      20,
  messageMargin:  45,
  mirrorActors:   false,
  useMaxWidth:    true,
}

// Anything in mermaid.initialize's config except theme + startOnLoad +
// securityLevel (which the composable owns).
export type MermaidConfigOverride = Record<string, unknown>

function currentTheme(): 'dark' | 'default' {
  if (typeof document === 'undefined') return 'default'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'default'
}

export interface UseMermaidDiagram {
  containerRef: Ref<HTMLDivElement | null>
}

export function useMermaidDiagram(
  definition: string,
  idPrefix: string,
  config: MermaidConfigOverride = { sequence: DEFAULT_SEQUENCE },
): UseMermaidDiagram {
  const containerRef = ref<HTMLDivElement | null>(null)
  let renderCount = 0

  async function render(): Promise<void> {
    const container = containerRef.value
    if (!container) return
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme(),
      securityLevel: 'loose',
      ...config,
    })
    // Unique id per render so successive renders (e.g. on theme toggle)
    // don't collide with mermaid's internal cache.
    const id = `${idPrefix}-${++renderCount}-${Math.random().toString(36).slice(2, 8)}`
    try {
      const { svg } = await mermaid.render(id, definition)
      container.innerHTML = svg
    } catch (err) {
      console.error(err)
      container.innerHTML = `
        <div style="color:#f87171; padding:60px; text-align:center; font-family:monospace; font-size:15px;">
          Failed to render Mermaid diagram — check console
        </div>`
    }
  }

  onMounted(render)
  onThemeChange(() => { void render() })

  return { containerRef }
}
