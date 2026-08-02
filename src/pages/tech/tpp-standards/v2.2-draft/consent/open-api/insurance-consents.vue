<route lang="yaml">
meta:
  title: Retrieve Insurance Data Sharing Consents by BaseConsentId
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent"
    title="Retrieve Insurance Data Sharing Consents by BaseConsentId"
    version="v2.2-draft"
    method="GET"
    path="/insurance-consents"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/insurance-consents"
    />
  </EndpointPage>
</template>
