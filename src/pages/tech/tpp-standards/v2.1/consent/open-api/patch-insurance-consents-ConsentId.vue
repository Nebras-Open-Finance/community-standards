<route lang="yaml">
meta:
  title: Modify an Insurance Data Sharing Consent
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent"
    title="Modify an Insurance Data Sharing Consent"
    version="v2.1"
    method="PATCH"
    path="/insurance-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-insurance-openapi.yaml"
      filterPath="/insurance-consents/{ConsentId}"
      filterMethod="patch"
    />
  </EndpointPage>
</template>
