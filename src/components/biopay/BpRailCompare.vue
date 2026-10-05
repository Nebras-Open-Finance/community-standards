<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// The two rails, one above the other. Account-to-account: the BPIP pushes the payment
// to the LFI, which instructs it over AANI/IPP. The API Hub is left out for
// simplicity — the payment request still passes through it. Card: the
// BPIP, as acquirer, pushes an authorisation to the card scheme (e.g. Jaywan), which routes it to the
// LFI as issuer. Draft.
const mermaidDefinition = `
flowchart TB
    subgraph A2A["Account-to-account (AANI/IPP)"]
        direction LR
        A1[BPIP<br/>acquirer] -->|Payment request| A3[LFI]
        A3 -->|Pushes payment| A4[AANI/IPP]
    end

    subgraph Card["Card (card scheme, e.g. Jaywan)"]
        direction LR
        C1[BPIP<br/>acquirer] -->|Authorisation request| C2[Card Scheme<br/>e.g. Jaywan]
        C2 -->|Routes to issuer| C3[LFI<br/>issuer]
        C3 -.->|Approve / decline| C2
    end

    A2A ~~~ Card
`

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'biopay-rail-compare',
  // SVG labels rather than HTML ones: Mermaid measures HTML labels before the
  // site font applies, so the text overflowed and was clipped.
  {
    themeVariables: { fontSize: '13px' },
    flowchart: { htmlLabels: false, curve: 'basis', padding: 16, nodeSpacing: 40, rankSpacing: 60, useMaxWidth: true },
  },
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
