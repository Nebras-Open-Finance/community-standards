<route lang="yaml">
meta:
  title: Hello MTLS
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Headless Heimdall"
    title="Hello MTLS"
    version="v2.2-rc1"
    method="GET"
    path="/hello-mtls"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/api-hub/uae-api-hub-authorisation-server-openapi.yaml"
      filterPath="/hello-mtls"
      filterMethod="get"
      :overrideServers="[ { url: 'https://hh.[LFICODE].apihub.openfinance.ae' }, { url: 'https://hh.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
