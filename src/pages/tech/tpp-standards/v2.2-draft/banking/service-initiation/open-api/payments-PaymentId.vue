<route lang="yaml">
meta:
  title: Get a Payment
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
    title="Get a Payment"
    version="v2.2-draft"
    method="GET"
    path="/payments/{PaymentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-bank-initiation-openapi.yaml"
      filterPath="/payments/{PaymentId}"
      filterMethod="get"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
