<route lang="yaml">
meta:
  title: Retrieve Banking products currently publicly available
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/product/v2.1' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/product/v2.1' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/product/v2.1' },
]
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Products & Leads"
    title="Retrieve Banking products currently publicly available"
    version="v2.1"
    method="GET"
    path="/products"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-product-openapi.yaml"
      filterPath="/products"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
