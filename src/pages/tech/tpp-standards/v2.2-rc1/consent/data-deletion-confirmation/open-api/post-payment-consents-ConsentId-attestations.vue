<route lang="yaml">
meta:
  title: Append a Bank Service Initiation Attestation Event
</route>

<script setup lang="ts">
const SPEC = '/openapi/v2.2-rc1/standards/uae-bank-initiation-openapi.yaml'
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent · Data Deletion Confirmation"
    title="Append a Bank Service Initiation Attestation Event"
    version="v2.2-rc1"
    method="POST"
    path="/payment-consents/{ConsentId}/attestations"
  >
    <RedocWrapper
      :spec="SPEC"
      filterPath="/payment-consents/{ConsentId}/attestations"
      filterMethod="POST"
    />
  </EndpointPage>
</template>
