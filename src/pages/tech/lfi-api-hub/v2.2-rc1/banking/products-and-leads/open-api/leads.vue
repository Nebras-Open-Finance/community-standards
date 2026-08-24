<route lang="yaml">
meta:
  title: Submit Lead
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Products & Leads"
    title="Submit Lead"
    version="v2.2-rc1"
    method="POST"
    path="/leads"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-bank-products-data-openapi.yaml"
      filterPath="/leads"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
