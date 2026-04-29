<route lang="yaml">
meta:
  title: Token endpoint
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
    eyebrow="TPP · Security · Tokens"
    title="Create an Access Token"
    version="v2.1"
    method="POST"
    path="/token"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
      filterPath="/token"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
