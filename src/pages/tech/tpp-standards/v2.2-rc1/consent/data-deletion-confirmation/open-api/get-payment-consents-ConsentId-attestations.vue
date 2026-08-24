<route lang="yaml">
meta:
  title: List Bank Service Initiation Attestation Events
</route>

<script setup lang="ts">
const SPEC = '/openapi/v2.2-rc1/standards/uae-bank-initiation-openapi.yaml'
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent · Data Deletion Confirmation"
    title="List Bank Service Initiation Attestation Events"
    version="v2.2-rc1"
    method="GET"
    path="/payment-consents/{ConsentId}/attestations"
  >
    <RedocWrapper
      :spec="SPEC"
      filterPath="/payment-consents/{ConsentId}/attestations"
      filterMethod="GET"
    />
  </EndpointPage>
</template>
