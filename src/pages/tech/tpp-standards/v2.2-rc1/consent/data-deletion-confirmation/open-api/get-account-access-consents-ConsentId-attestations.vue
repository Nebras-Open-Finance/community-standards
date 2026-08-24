<route lang="yaml">
meta:
  title: List Bank Data Sharing Attestation Events
</route>

<script setup lang="ts">
const SPEC = '/openapi/v2.2-rc1/standards/uae-account-information-openapi.yaml'
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent · Data Deletion Confirmation"
    title="List Bank Data Sharing Attestation Events"
    version="v2.2-rc1"
    method="GET"
    path="/account-access-consents/{ConsentId}/attestations"
  >
    <RedocWrapper
      :spec="SPEC"
      filterPath="/account-access-consents/{ConsentId}/attestations"
      filterMethod="GET"
    />
  </EndpointPage>
</template>
