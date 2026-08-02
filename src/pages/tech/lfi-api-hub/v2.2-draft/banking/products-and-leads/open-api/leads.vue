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
    version="v2.2-draft"
    method="POST"
    path="/leads"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-bank-products-data-openapi.yaml"
      filterPath="/leads"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
