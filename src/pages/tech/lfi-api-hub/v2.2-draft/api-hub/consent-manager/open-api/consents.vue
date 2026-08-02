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
    version="v2.2-draft"
    method="GET"
    path="/consents"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/consents"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
