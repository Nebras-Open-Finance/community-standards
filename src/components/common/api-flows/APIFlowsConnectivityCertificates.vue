<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP,Hub: TPP to API Hub over mTLS.<br/>TPP: C1 transport + Sig1 request signing.<br/>API Hub: S1 transport + Sig2 response signing.
    TPP->>Hub: Request (C1 + Sig1)
    Hub-->>TPP: Response (Sig2)

    rect rgb(240, 249, 255)
    Note over Hub,LFI: API Hub to Ozone Connect over mTLS.<br/>API Hub acts as the C4 client.<br/>API Hub: C4 transport + Sig3 signing.<br/>Ozone Connect: S4 transport + Sig4 signing.<br/>Sig3 and Sig4 only apply with JWT Auth.
    Hub->>LFI: Request (C4 + Sig3)
    LFI-->>Hub: Response (Sig4)
    end

    rect rgb(255, 245, 238)
    Note over LFI,Hub: LFI to API Hub (CM and HH) over mTLS.<br/>LFI acts as the C3-hh-cm-client.<br/>LFI: C3 transport + Sig4 signing.<br/>API Hub: S3 transport + Sig3 signing.<br/>Sig3 and Sig4 only apply with JWT Auth.
    LFI->>Hub: Request (C3 + Sig4)
    Hub-->>LFI: Response (Sig3)
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'connectivity-certificates-diagram',
  {
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 30,
      actorMargin: 120,
      width: 220,
      height: 65,
      boxMargin: 20,
      messageMargin: 50,
      noteMargin: 15,
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
