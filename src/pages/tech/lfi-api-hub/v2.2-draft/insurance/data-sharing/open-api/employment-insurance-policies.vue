<route lang="yaml">
meta:
  title: Get Employment Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Data Sharing"
    title="Get Employment Insurance Policies"
    version="v2.2-draft"
    method="GET"
    path="/employment-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/employment-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
