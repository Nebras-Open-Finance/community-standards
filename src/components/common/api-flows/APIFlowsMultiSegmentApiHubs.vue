<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

const mermaidDefinition = `
flowchart LR
    subgraph Nebras["Nebras"]
        RH[Retail API Hub]
        SH[Business API Hub]
    end

    subgraph LFI["LFI"]
        OC[Ozone Connect]
        RC[Retail Core Banking]
        SC[Business Core Banking]
    end

    RH -->|"o3-provider-id: fabretail"| OC
    SH -->|"o3-provider-id: fabbusiness"| OC
    OC --> RC
    OC --> SC

    style Nebras fill:#e8eefc,stroke:#0043A6
    style LFI fill:#e6f7f3,stroke:#009882

    classDef whitebox fill:#ffffff,stroke:#333,color:#333
    class RH,SH,OC,RC,SC whitebox
`

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'multi-segment-api-hubs-diagram',
  { flowchart: { curve: 'basis', padding: 20, nodeSpacing: 50, rankSpacing: 80, useMaxWidth: true } },
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
