<route lang="yaml">
meta:
  title: Fail Authorization
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Headless Heimdall"
    title="Fail Authorization"
    version="v2.2-draft"
    method="POST"
    path="/auth/{InteractionId}/doFail"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/api-hub/uae-api-hub-authorisation-server-openapi.yaml"
      filterPath="/auth/{interactionId}/doFail"
      filterMethod="post"
      :overrideServers="[ { url: 'https://hh.[LFICODE].apihub.openfinance.ae' }, { url: 'https://hh.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
