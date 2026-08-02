<route lang="yaml">
meta:
  title: Confirm the IBAN matches the Name on the Account
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
    title="Confirm the IBAN matches the Name on the Account"
    version="v2.2-draft"
    method="POST"
    path="/confirmation"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-confirmation-of-payee-openapi.yaml"
      filterPath="/confirmation"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
