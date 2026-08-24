<route lang="yaml">
meta:
  title: Create a Payment
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Service Initiation"
    title="Create a Payment"
    version="v2.2-rc1"
    method="POST"
    path="/payments"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml"
      filterSchema="AEPaymentRequest"
      displayPath="/payments"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]'}]" />
  </EndpointPage>
</template>
