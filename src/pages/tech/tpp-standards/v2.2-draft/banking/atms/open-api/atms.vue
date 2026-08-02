<route lang="yaml">
meta:
  title: Retrieve ATMs
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/atm/v2.2' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/atm/v2.2' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/atm/v2.2' },
]
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · ATMs"
    title="Retrieve ATMs"
    version="v2.2-draft"
    method="GET"
    path="/atms"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-atm-openapi.yaml"
      filterPath="/atms"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
