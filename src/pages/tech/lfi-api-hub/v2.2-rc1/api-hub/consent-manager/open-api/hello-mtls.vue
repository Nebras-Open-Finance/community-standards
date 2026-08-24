<route lang="yaml">
meta:
  title: Hello MTLS
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Hello MTLS"
    version="v2.2-rc1"
    method="GET"
    path="/hello-mtls"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/hello-mtls"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
