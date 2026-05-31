<route lang="yaml">
meta:
  title: Accept a Travel Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Quotation"
    title="Accept a Travel Insurance Quote"
    version="v2.1"
    method="PATCH"
    path="/travel-insurance-quotes/{QuoteId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/travel-insurance-quotes/{QuoteId}"
      filterMethod="patch"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
