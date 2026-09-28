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
    version="v2.2-rc2"
    method="PATCH"
    path="/account-access-consents/{ConsentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc2/standards/uae-account-information-openapi.yaml"
      filterPath="/account-access-consents/{ConsentId}"
      filterMethod="patch"
    />
  </EndpointPage>
</template>
