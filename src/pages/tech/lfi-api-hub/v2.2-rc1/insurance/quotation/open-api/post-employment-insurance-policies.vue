<route lang="yaml">
meta:
  title: Create a Employment Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Quotation"
    title="Create a Employment Insurance Policy"
    version="v2.2-rc1"
    method="POST"
    path="/employment-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/employment-insurance-policies"
      filterMethod="post"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
