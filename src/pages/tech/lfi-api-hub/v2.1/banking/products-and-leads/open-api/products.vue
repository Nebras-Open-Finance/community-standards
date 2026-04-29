<route lang="yaml">
meta:
  title: Get Products
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Products & Leads"
    title="Get Products"
    version="v2.1"
    method="GET"
    path="/products"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-products-data-openapi.yaml"
      filterPath="/products"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
