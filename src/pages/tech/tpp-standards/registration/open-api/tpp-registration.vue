<route lang="yaml">
meta:
  title: TPP Registration endpoint
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae' },
]
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Registration"
    title="Post Registration to Request Onboarding to an LFI"
    version="v2.1"
    method="POST"
    path="/tpp-registration"
  >
    <RedocWrapper
      spec="/openapi/v2.1/api-hub/uae-api-hub-tpp-onboarding-openapi.yaml"
      filterPath="/tpp-registration"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
