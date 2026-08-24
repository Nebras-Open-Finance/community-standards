<route lang="yaml">
meta:
  title: Pushed Authorization Request endpoint
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://as1.[LFICODE].apihub.openfinance.ae' },
  { url: 'https://as1.[LFICODE].preprod.apihub.openfinance.ae' },
  { url: 'https://as1.[LFICODE].sandbox.apihub.openfinance.ae' },
]
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent"
    title="Pushed Authorization Request endpoint"
    version="v2.2-rc1"
    method="POST"
    path="/par"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-authorization-endpoints-openapi.yaml"
      filterPath="/par"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
