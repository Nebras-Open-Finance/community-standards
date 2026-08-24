<route lang="yaml">
meta:
  title: Append a Bank Data Sharing Attestation Event
</route>

<script setup lang="ts">
const SPEC = '/openapi/v2.2-rc1/standards/uae-account-information-openapi.yaml'
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent · Data Deletion Confirmation"
    title="Append a Bank Data Sharing Attestation Event"
    version="v2.2-rc1"
    method="POST"
    path="/account-access-consents/{ConsentId}/attestations"
  >
    <RedocWrapper
      :spec="SPEC"
      filterPath="/account-access-consents/{ConsentId}/attestations"
      filterMethod="POST"
    />
  </EndpointPage>
</template>
