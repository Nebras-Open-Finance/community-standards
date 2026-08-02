<route lang="yaml">
meta:
  title: Modify a Bank Data Sharing Consent
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent"
    title="Modify a Bank Data Sharing Consent"
    version="v2.2-draft"
    method="PATCH"
    path="/account-access-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-account-information-openapi.yaml"
      filterPath="/account-access-consents/{ConsentId}"
      filterMethod="patch"
    />
  </EndpointPage>
</template>
