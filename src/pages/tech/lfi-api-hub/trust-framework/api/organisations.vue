<route lang="yaml">
meta:
  title: 'Retrieve all Organisations'
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Trust Framework"
    title="Retrieve all Organisations"
    method="GET"
    path="/organisations"
  >
    <RedocWrapper
      spec="/openapi/trust-framework.yaml"
      filterPath="/organisations"
      :overrideServers="[{ url: 'https://matls-api.directory.openfinance.ae' }, { url: 'https://matls-api.sandbox.directory.openfinance.ae' }]"
    />
  </EndpointPage>
</template>
