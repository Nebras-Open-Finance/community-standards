<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

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

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'light',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis',
    },
    securityLevel: 'loose'
  })

  if (mermaidContainer.value) {
    try {
      const { svg } = await mermaid.render('api-hub-architecture', mermaidDefinition)
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
