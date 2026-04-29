<route lang="yaml">
meta:
  title: Revoke Consent
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Revoke Consent"
    version="v2.1"
    method="POST"
    path="/consents/{ConsentId}/action/revoke"
  >
    <RedocWrapper
      spec="/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/consents/{consentId}/action/revoke"
      filterMethod="post"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
