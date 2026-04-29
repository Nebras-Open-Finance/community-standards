<route lang="yaml">
meta:
  title: 'Retrieve all Available Open Finance Servers and API Resources'
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Trust Framework"
    title="Retrieve all Available Open Finance Servers and API Resources"
    method="GET"
    path="/participants"
  >
    <RedocWrapper
      spec="/openapi/trust-framework.yaml"
      filterPath="/organisations/export/open-data"
      displayPath="/participants"
      :overrideServers="[{ url: 'https://data.directory.openfinance.ae' }, { url: 'https://data.sandbox.directory.openfinance.ae' }]"
      :hideSecurity="true"
    />
  </EndpointPage>
</template>
