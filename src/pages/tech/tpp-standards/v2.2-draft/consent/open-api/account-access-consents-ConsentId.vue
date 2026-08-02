<route lang="yaml">
meta:
  title: Retrieve Bank Data Sharing Consent by ConsentId
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent"
    title="Retrieve Bank Data Sharing Consent by ConsentId"
    version="v2.2-draft"
    method="GET"
    path="/account-access-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-account-information-openapi.yaml"
      filterPath="/account-access-consents/{ConsentId}"
      filterMethod="get"
    />
  </EndpointPage>
</template>
