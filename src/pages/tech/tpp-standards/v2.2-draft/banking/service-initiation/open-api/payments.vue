<route lang="yaml">
meta:
  title: Create a Payment
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/payment/v2.2' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/payment/v2.2' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/payment/v2.2' },
]
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Service Initiation"
    title="Create a Payment"
    version="v2.2-draft"
    method="POST"
    path="/payments"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-bank-initiation-openapi.yaml"
      filterPath="/payments"
      filterMethod="post"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
