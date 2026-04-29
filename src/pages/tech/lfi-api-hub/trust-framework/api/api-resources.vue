<route lang="yaml">
meta:
  title: 'Retrieve all API Resources for an Authorisation Server'
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Trust Framework"
    title="Retrieve all API Resources for an Authorisation Server"
    method="GET"
    path="/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources"
  >
    <RedocWrapper
      spec="/openapi/trust-framework.yaml"
      filterPath="/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources"
      :overrideServers="[{ url: 'https://matls-api.directory.openfinance.ae' }, { url: 'https://matls-api.sandbox.directory.openfinance.ae' }]"
    />
  </EndpointPage>
</template>
