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
    version="v2.2-draft"
    method="GET"
    path="/hello-mtls"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/hello-mtls"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
