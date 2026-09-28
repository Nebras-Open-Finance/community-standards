<route lang="yaml">
meta:
  title: Get a Payment by PaymentId
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Service Initiation"
    title="Get a Payment by PaymentId"
    version="v2.2-rc2"
    method="GET"
    path="/payments/{PaymentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc2/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml"
      filterPath="/payments/{paymentId}"
      filterMethod="GET"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]'}]" />
  </EndpointPage>
</template>
