<route lang="yaml">
meta:
  title: 'Retrieve all Software Statements for an Organisation'
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Trust Framework"
    title="Retrieve all Software Statements for an Organisation"
    method="GET"
    path="/organisations/{OrganisationId}/softwarestatements"
  >
    <RedocWrapper
      spec="/openapi/trust-framework.yaml"
      filterPath="/organisations/{OrganisationId}/softwarestatements"
      :overrideServers="[{ url: 'https://matls-api.directory.openfinance.ae' }, { url: 'https://matls-api.sandbox.directory.openfinance.ae' }]"
    />
  </EndpointPage>
</template>
