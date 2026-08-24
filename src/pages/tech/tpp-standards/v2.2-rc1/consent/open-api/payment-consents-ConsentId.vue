<route lang="yaml">
meta:
  title: Retrieve Payment Consent by ConsentId
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
    eyebrow="TPP · Consent"
    title="Retrieve Payment Consent by ConsentId"
    version="v2.2-rc1"
    method="GET"
    path="/payment-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-bank-initiation-openapi.yaml"
      filterPath="/payment-consents/{ConsentId}"
      filterMethod="get"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
