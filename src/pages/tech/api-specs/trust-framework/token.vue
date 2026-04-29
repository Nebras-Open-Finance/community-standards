<route lang="yaml">
meta:
  title: 'Obtain an Access Token'
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="Trust Framework"
    title="Obtain an Access Token"
    method="POST"
    path="/token"
  >
    <RedocWrapper
      spec="/openapi/trust-framework.yaml"
      filterPath="/token"
      :overrideServers="[{ url: 'https://matls-auth.directory.openfinance.ae' }, { url: 'https://matls-auth.sandbox.directory.openfinance.ae' }]"
    />
  </EndpointPage>
</template>
