<route lang="yaml">
meta:
  title: Hello
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Health Check"
    title="Hello"
    version="v2.1"
    method="GET"
    path="/hello"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-health-check-openapi.yaml"
      filterPath="/hello"
      filterMethod="get"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
