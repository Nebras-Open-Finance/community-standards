<route lang="yaml">
meta:
  title: 'Retrieve all API Families'
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="Trust Framework"
    title="Retrieve all API Families"
    method="GET"
    path="/references/apifamilies"
  >
    <RedocWrapper
      spec="/openapi/trust-framework.yaml"
      filterPath="/references/apifamilies"
      :overrideServers="[{ url: 'https://matls-api.directory.openfinance.ae' }, { url: 'https://matls-api.sandbox.directory.openfinance.ae' }]"
    />
  </EndpointPage>
</template>
