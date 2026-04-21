<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

const mermaidDefinition = `
flowchart LR
    subgraph Nebras["Nebras"]
        RH[Retail API Hub]
        SH[SME API Hub]
    end

    subgraph LFI["LFI"]
        OC[Ozone Connect]
        RC[Retail Core Banking]
        SC[SME Core Banking]
    end

    RH -->|"o3-provider-id: {lfi}retail"| OC
    SH -->|"o3-provider-id: {lfi}sme"| OC
    OC --> RC
    OC --> SC

    style Nebras fill:#e8eefc,stroke:#0043A6
    style LFI fill:#e6f7f3,stroke:#009882

    classDef whitebox fill:#ffffff,stroke:#333,color:#333
    class RH,SH,OC,RC,SC whitebox
`

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'light',
    flowchart: {
      curve: 'basis',
      padding: 20,
      nodeSpacing: 50,
      rankSpacing: 80,
      useMaxWidth: true
    },
    securityLevel: 'loose'
  })

  if (mermaidContainer.value) {
    try {
      const { svg } = await mermaid.render('multi-segment-api-hubs-diagram', mermaidDefinition)
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
