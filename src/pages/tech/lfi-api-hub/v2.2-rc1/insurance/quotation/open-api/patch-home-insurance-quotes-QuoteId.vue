<route lang="yaml">
meta:
  title: Accept a Home Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Quotation"
    title="Accept a Home Insurance Quote"
    version="v2.2-rc1"
    method="PATCH"
    path="/home-insurance-quotes/{QuoteId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/home-insurance-quotes/{QuoteId}"
      filterMethod="patch"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
