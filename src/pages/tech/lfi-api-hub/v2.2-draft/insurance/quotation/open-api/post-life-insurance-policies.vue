<route lang="yaml">
meta:
  title: Create a Life Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Quotation"
    title="Create a Life Insurance Policy"
    version="v2.2-draft"
    method="POST"
    path="/life-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/life-insurance-policies"
      filterMethod="post"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
