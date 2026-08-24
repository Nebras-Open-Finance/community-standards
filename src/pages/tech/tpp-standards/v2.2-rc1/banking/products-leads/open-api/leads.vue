<route lang="yaml">
meta:
  title: Provide user lead details
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/product/v2.2' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/product/v2.2' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/product/v2.2' },
]
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Products & Leads"
    title="Provide user lead details"
    version="v2.2-rc1"
    method="POST"
    path="/leads"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-product-openapi.yaml"
      filterPath="/leads"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
