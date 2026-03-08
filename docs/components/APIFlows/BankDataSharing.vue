<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Construct Authorization Details
    Note over TPP: Construct Request JWT (payments openid)
    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /par (urn:openfinanceuae:account-access-consent:v2.1)
    opt Config-dependent
        Hub->>+LFI: POST /consents/action/validate
        Hub->>+LFI: POST /consents/event/post
    end
    Hub-->>-TPP: 200 {request_uri + expires_in}

    TPP-->>LFI: Redirect customer to LFI Auth URL
    
    LFI->>+Hub: GET /auth
    LFI->>Hub: GET /consents/{consentId}
    Note over LFI: User authenticates & authorizes consent
    LFI->>Hub: PATCH /consent/{consentId}
    LFI->>Hub: POST /auth/{interactionId}/doConfirm

    LFI-->>TPP: Redirect customer to TPP callback with code

    TPP->>+Hub: POST /token (authorization_code)
    Hub-->>-TPP: {access_token + refresh_token + consent}

    TPP->>+Hub: GET /accounts
    Hub->>LFI: GET /accounts
    LFI-->>Hub: 200 {...}
    Hub-->>-TPP: 200 {...}
    TPP->>+Hub: GET /accounts/{accountId}/balances (transactions, ...)
    Hub->>LFI: GET /accounts/{accountId}/balances (transactions, ...)
    LFI-->>Hub: 200 {...}
    Hub-->>-TPP: 200 {...}

    TPP->>+Hub: POST /token (refresh_token)
    Hub-->>-TPP: {access_token + refresh_token + consent}
    TPP->>+Hub: GET /accounts/{accountId}/balances (transactions, ...)
    Hub->>LFI: GET /accounts/{accountId}/balances (transactions, ...)
    LFI-->>Hub: 200 {...}
    Hub-->>-TPP: 200 {...}
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
      const { svg } = await mermaid.render('pure-diagram', mermaidDefinition)
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

