<route lang="yaml">
meta:
  title: Get Customers
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Data Sharing"
    title="Get Customers"
    version="v2.2-rc2"
    method="GET"
    path="/customer"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc2/ozone-connect/uae-ozone-connect-bank-data-sharing-openapi.yaml"
      filterPath="/customer"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
