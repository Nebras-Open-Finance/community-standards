<route lang="yaml">
meta:
  title: Get Auth
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Headless Heimdall"
    title="Get Auth"
    version="v2.1"
    method="GET"
    path="/auth"
  >
    <RedocWrapper
      spec="/openapi/v2.1/api-hub/uae-api-hub-authorisation-server-openapi.yaml"
      filterPath="/auth"
      filterMethod="get"
      :overrideServers="[ { url: 'https://hh.[LFICODE].apihub.openfinance.ae' }, { url: 'https://hh.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
