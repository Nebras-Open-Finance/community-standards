<route lang="yaml">
meta:
  title: Modify a Payment Consent
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
    title="Modify a Payment Consent"
    version="v2.2-rc1"
    method="PATCH"
    path="/payment-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-bank-initiation-openapi.yaml"
      filterPath="/payment-consents/{ConsentId}"
      filterMethod="patch"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
