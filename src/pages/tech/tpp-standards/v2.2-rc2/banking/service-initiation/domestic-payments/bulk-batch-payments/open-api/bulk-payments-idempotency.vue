<route lang="yaml">
meta:
  title: Get a Bulk/Batch PaymentId from Idempotency Key
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
    eyebrow="TPP · Banking · Service Initiation · Bulk/Batch"
    title="Get a Bulk/Batch PaymentId from Idempotency Key"
    version="v2.2-rc2"
    method="GET"
    path="/bulk-payments"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc2/standards/uae-bank-initiation-openapi.yaml"
      filterPath="/bulk-payments"
      filterMethod="get"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
