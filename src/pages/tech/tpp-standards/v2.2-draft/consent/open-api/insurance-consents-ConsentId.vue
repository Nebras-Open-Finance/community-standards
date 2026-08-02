<route lang="yaml">
meta:
  title: Retrieve Insurance Data Sharing Consent by ConsentId
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent"
    title="Retrieve Insurance Data Sharing Consent by ConsentId"
    version="v2.2-draft"
    method="GET"
    path="/insurance-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/insurance-consents/{ConsentId}"
      filterMethod="get"
    />
  </EndpointPage>
</template>
