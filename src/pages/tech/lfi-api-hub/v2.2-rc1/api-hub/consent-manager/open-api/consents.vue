<route lang="yaml">
meta:
  title: Get Consents
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Get Consents"
    version="v2.2-rc1"
    method="GET"
    path="/consents"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/consents"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
