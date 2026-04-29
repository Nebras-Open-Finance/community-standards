<route lang="yaml">
meta:
  title: Get Consents in Consent Group
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Get Consents in Consent Group"
    version="v2.1"
    method="GET"
    path="/consent-groups/{ConsentGroupId}/consents"
  >
    <RedocWrapper
      spec="/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/consent-groups/{consentGroupId}/consents"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
