<route lang="yaml">
meta:
  title: Confirm Authorization
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Headless Heimdall"
    title="Confirm Authorization"
    version="v2.2-draft"
    method="POST"
    path="/auth/{InteractionId}/doConfirm"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/api-hub/uae-api-hub-authorisation-server-openapi.yaml"
      filterPath="/auth/{interactionId}/doConfirm"
      filterMethod="post"
      :overrideServers="[ { url: 'https://hh.[LFICODE].apihub.openfinance.ae' }, { url: 'https://hh.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
