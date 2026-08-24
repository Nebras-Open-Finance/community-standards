<route lang="yaml">
meta:
  title: Get Consent by ID
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Get Consent by ID"
    version="v2.2-rc1"
    method="GET"
    path="/consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/consents/{consentId}"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
