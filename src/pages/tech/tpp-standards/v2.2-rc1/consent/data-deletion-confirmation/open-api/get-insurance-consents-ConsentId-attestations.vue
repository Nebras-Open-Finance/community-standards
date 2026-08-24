<route lang="yaml">
meta:
  title: List Insurance Attestation Events
</route>

<script setup lang="ts">
const SPEC = '/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml'
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent · Data Deletion Confirmation"
    title="List Insurance Attestation Events"
    version="v2.2-rc1"
    method="GET"
    path="/insurance-consents/{ConsentId}/attestations"
  >
    <RedocWrapper
      :spec="SPEC"
      filterPath="/insurance-consents/{ConsentId}/attestations"
      filterMethod="GET"
    />
  </EndpointPage>
</template>
