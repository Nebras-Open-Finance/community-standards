<route lang="yaml">
meta:
  title: Get Payment Log
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Get Payment Log"
    version="v2.2-draft"
    method="GET"
    path="/payment-log"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/payment-log"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
