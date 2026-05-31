<route lang="yaml">
meta:
  title: Get Consents by End User
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Get Consents by End User"
    version="v2.1"
    method="GET"
    path="/psu/{UserId}/consents"
  >
    <RedocWrapper
      spec="/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/psu/{userId}/consents"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
