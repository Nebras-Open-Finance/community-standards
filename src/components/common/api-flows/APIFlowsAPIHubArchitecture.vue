<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

const mermaidDefinition = `
flowchart LR
    TPP["TPP"]
    HubA["API Hub — A"]
    LFIA["LFI (Ozone Connect API) - A"]
    HubB["API Hub — B"]
    LFIB["LFI (Ozone Connect API) - B"]
    HubC["API Hub — N"]
    LFIC["LFI (Ozone Connect API) - N"]

    TPP --> HubA --> LFIA
    TPP --> HubB --> LFIB
    TPP --> HubC --> LFIC
`

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'api-hub-architecture',
  { flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' } },
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
