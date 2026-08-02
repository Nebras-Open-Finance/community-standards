<route lang="yaml">
meta:
  title: Create a Home Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Quotation"
    title="Create a Home Insurance Policy"
    version="v2.2-draft"
    method="POST"
    path="/home-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/home-insurance-policies"
      filterMethod="post"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
