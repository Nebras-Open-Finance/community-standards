<route lang="yaml">
meta:
  title: Discover the LFI that will confirm the payee
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.2' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.2' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/v2.2' },
]
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Confirmation of Payee"
    title="Discover the LFI that will confirm the payee"
    version="v2.2-rc1"
    method="POST"
    path="/discovery"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-confirmation-of-payee-openapi.yaml"
      filterPath="/discovery"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
