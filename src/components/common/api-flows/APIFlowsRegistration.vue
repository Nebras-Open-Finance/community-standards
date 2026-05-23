<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    TPP->>+Hub: POST /tpp-registration
    Hub-->>-TPP: 204 No Content
`

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'tpp-registration-diagram',
  {
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 30,
      actorMargin: 275,
      width: 110,
      height: 65,
      boxMargin: 20,
      messageMargin: 45,
      mirrorActors: false,
      useMaxWidth: true,
    },
  },
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>

