<route lang="yaml">
meta:
  title: Append an Insurance Attestation Event
</route>

<script setup lang="ts">
const SPEC = '/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml'
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent · Data Deletion Confirmation"
    title="Append an Insurance Attestation Event"
    version="v2.2-rc1"
    method="POST"
    path="/insurance-consents/{ConsentId}/attestations"
  >
    <RedocWrapper
      :spec="SPEC"
      filterPath="/insurance-consents/{ConsentId}/attestations"
      filterMethod="POST"
    />
  </EndpointPage>
</template>
