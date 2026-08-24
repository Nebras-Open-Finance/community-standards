<route lang="yaml">
meta:
  title: Revoke Consents in Consent Group
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Revoke Consents in Consent Group"
    version="v2.2-rc1"
    method="POST"
    path="/consent-groups/{ConsentGroupId}/consents/action/revoke"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
      filterPath="/consent-groups/{consentGroupId}/consents/action/revoke"
      filterMethod="post"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
