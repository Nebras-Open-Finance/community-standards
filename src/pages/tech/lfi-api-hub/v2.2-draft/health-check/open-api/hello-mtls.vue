<route lang="yaml">
meta:
  title: Hello MTLS
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Health Check"
    title="Hello MTLS"
    version="v2.2-draft"
    method="GET"
    path="/hello-mtls"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-health-check-openapi.yaml"
      filterPath="/hello-mtls"
      filterMethod="get"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
