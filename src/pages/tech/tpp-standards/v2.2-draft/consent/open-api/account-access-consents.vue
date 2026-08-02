<route lang="yaml">
meta:
  title: Retrieve Bank Data Sharing Consents by BaseConsentId
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent"
    title="Retrieve Bank Data Sharing Consents by BaseConsentId"
    version="v2.2-draft"
    method="GET"
    path="/account-access-consents"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-account-information-openapi.yaml"
      filterPath="/account-access-consents"
    />
  </EndpointPage>
</template>
