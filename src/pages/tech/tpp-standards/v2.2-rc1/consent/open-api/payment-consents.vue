<route lang="yaml">
meta:
  title: Retrieve Payment Consents by BaseConsentId
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
    title="Retrieve Payment Consents by BaseConsentId"
    version="v2.2-rc1"
    method="GET"
    path="/payment-consents"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-bank-initiation-openapi.yaml"
      filterPath="/payment-consents"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
