<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

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

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'light',
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
      useMaxWidth: true
    },
    securityLevel: 'loose'
  })

  if (mermaidContainer.value) {
    try {
      const { svg } = await mermaid.render('connectivity-certificates-diagram', mermaidDefinition)
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
