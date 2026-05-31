<route lang="yaml">
meta:
  title: Create a Travel Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Quotation"
    title="Create a Travel Insurance Quote"
    version="v2.1"
    method="POST"
    path="/travel-insurance-quotes"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/travel-insurance-quotes"
      filterMethod="post"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
