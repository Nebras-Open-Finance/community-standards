<route lang="yaml">
meta:
  title: Retrieve Account Details for a Refund
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Service Initiation"
    title="Retrieve Account Details for a Refund"
    version="v2.2-draft"
    method="GET"
    path="/payment-consents/{ConsentId}/refund"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml"
      filterPath="/payment-consents/{consentId}/refund"
      filterMethod="GET"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]'}]" />
  </EndpointPage>
</template>
