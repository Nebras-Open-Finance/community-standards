<route lang="yaml">
meta:
  title: Create a Health Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Quotation"
    title="Create a Health Insurance Quote"
    version="v2.2-draft"
    method="POST"
    path="/health-insurance-quotes"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/health-insurance-quotes"
      filterMethod="post"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
