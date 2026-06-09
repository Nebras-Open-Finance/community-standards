<route lang="yaml">
meta:
  title: 'Retrieve all Contacts for an Organisation'
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Trust Framework"
    title="Retrieve all Contacts for an Organisation"
    method="GET"
    path="/organisations/{OrganisationId}/contacts"
  >
    <RedocWrapper
      spec="/openapi/trust-framework.yaml"
      filterPath="/organisations/{OrganisationId}/contacts"
      :overrideServers="[{ url: 'https://matls-api.directory.openfinance.ae' }, { url: 'https://matls-api.sandbox.directory.openfinance.ae' }]"
    />
  </EndpointPage>
</template>
