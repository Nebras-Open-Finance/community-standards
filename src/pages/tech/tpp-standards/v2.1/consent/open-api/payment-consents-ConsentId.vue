<route lang="yaml">
meta:
  title: Retrieve Payment Consent by ConsentId
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/payment/v2.1' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/payment/v2.1' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/payment/v2.1' },
]
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent"
    title="Retrieve Payment Consent by ConsentId"
    version="v2.1"
    method="GET"
    path="/payment-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-bank-initiation-openapi.yaml"
      filterPath="/payment-consents/{ConsentId}"
      filterMethod="get"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
