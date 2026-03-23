<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant A as API Hub (LFI A)
    participant B as API Hub (LFI B)
    participant AR as LFI A
    participant BR as LFI B

    Note over TPP,B: Step 1 — Token request for each LFI (in parallel)
    par
        TPP->>+A: POST /token (client_credentials, scope=products)
        A-->>-TPP: access_token A
    and
        TPP->>+B: POST /token (client_credentials, scope=products)
        B-->>-TPP: access_token B
    end

    Note over TPP,BR: Step 2 — GET /products from each LFI (in parallel)
    par
        TPP->>+A: GET /products
        A->>+AR: GET /products
        AR->>-A: 200 { Data: [ Products ] }
        A-->>-TPP: 200 { Data: [ Products ] }
    and
        TPP->>+B: GET /products
        B->>+BR: GET /products
        BR->>-B: 200 { Data: [ Products ] }
        B-->>-TPP: 200 { Data: [ Products ] }
    end

    Note over TPP: Aggregate & present all products to user

    alt User selects Apply Now
        Note over TPP: Use ApplicationUri, PhoneNumber,<br/>Email, or Description
    else User requests contact from LFI B
        TPP->>+B: POST /leads
        B->>+BR: POST /leads
        BR->>-B: 201 { LeadId }
        B-->>-TPP: 201 { LeadId }
    end
`

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'light',
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 30,
      actorMargin: 80,
      width: 200,
      height: 65,
      boxMargin: 20,
      messageMargin: 45,
      mirrorActors: false,
      useMaxWidth: true
    },
    securityLevel: 'loose'
  })

  if (mermaidContainer.value) {
    try {
      const { svg } = await mermaid.render('products-leads-diagram', mermaidDefinition)
      mermaidContainer.value.innerHTML = svg
    } catch (err) {
      console.error(err)
      mermaidContainer.value.innerHTML = `
        <div style="color:#f87171; padding:60px; text-align:center; font-family:monospace; font-size:15px;">
          Failed to render Mermaid diagram — check console
        </div>`
    }
  }
})
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
