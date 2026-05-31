<route lang="yaml">
meta:
  title: Patch Insurance Quote Log
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Patch Insurance Quote Log"
    version="v2.1"
    method="PATCH"
    path="/insurance-quote-log/{logId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/insurance-quote-log/{logId}"
      filterMethod="patch"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
