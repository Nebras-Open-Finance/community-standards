<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Construct Authorization Details (IsSingleAuthorization=false)
    TPP->>+Hub: POST /par (service-initiation-consent)
    opt Config-dependent
        Hub->>+LFI: POST /consents/action/validate
        Hub->>+LFI: POST /consents/event/post
    end
    Hub-->>-TPP: 200 {request_uri, expires_in}

    TPP-->>LFI: Redirect user to LFI Auth URL

    LFI->>+Hub: GET /auth
    LFI->>Hub: GET /consents/{consentId}
    Note over LFI: User 1 authenticates & authorizes consent

    LFI->>Hub: PATCH /consents/{consentId}\\nStatus=AwaitingAuthorization\\nMeta.MultipleAuthorizers
    LFI->>Hub: POST /auth/{interactionId}/doConfirm
    LFI-->>TPP: Redirect to callback (code, state, iss)

    TPP->>+Hub: POST /token (code + code_verifier)
    Hub-->>-TPP: {access_token + refresh_token + consent Status=AwaitingAuthorization}

    loop Additional authorizers
        alt Approval
            LFI->>Hub: PATCH /consents/{consentId}\\nupdate Authorizations[]
        else Rejection
            LFI->>Hub: PATCH /consents/{consentId}\\nStatus=Rejected
        end
    end

    Hub-->>TPP: Event / GET /payment-consents/{ConsentId}\\nStatus=Authorized
    TPP->>+Hub: POST /payments
    Hub->>LFI: POST /payments
    LFI-->>Hub: 201 {PaymentId}
     Hub-->>-TPP: 201 {PaymentId, Status: Pending}
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
      const { svg } = await mermaid.render('multi-auth-diagram', mermaidDefinition)
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
