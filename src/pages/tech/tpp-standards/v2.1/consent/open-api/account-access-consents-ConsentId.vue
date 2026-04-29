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
    version="v2.1"
    method="GET"
    path="/account-access-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-account-information-openapi.yaml"
      filterPath="/account-access-consents/{ConsentId}"
      filterMethod="get"
    />
  </EndpointPage>
</template>
