<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI (Ozone Connect)

    Note over TPP: Initial request — no page parameters
    TPP->>+Hub: GET /accounts/acc-001/transactions?fromBookingDateTime=...
    Hub->>+LFI: GET /accounts/acc-001/transactions?...&page=1&page-size=100
    LFI-->>-Hub: 200 {data + meta {totalPages 3}}
    Note over Hub: Convert meta to Links envelope
    Hub-->>-TPP: 200 {Data + Links {Self + First + Next page 2 + Last} + Meta}

    Note over TPP: Follow Links.Next
    TPP->>+Hub: GET Links.Next from page 1
    Hub->>+LFI: GET /accounts/acc-001/transactions?...&page=2&page-size=100
    LFI-->>-Hub: 200 {data + meta {totalPages 3}}
    Hub-->>-TPP: 200 {Data + Links {Self + First + Prev + Next page 3 + Last} + Meta}

    Note over TPP: Follow Links.Next
    TPP->>+Hub: GET Links.Next from page 2
    Hub->>+LFI: GET /accounts/acc-001/transactions?...&page=3&page-size=100
    LFI-->>-Hub: 200 {data + meta {totalPages 3}}
    Note over Hub: Last page reached — Links.Next omitted
    Hub-->>-TPP: 200 {Data + Links {Self + First + Prev + Last} + Meta}

    Note over TPP: Links.Next absent — loop terminates
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'pagination-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
