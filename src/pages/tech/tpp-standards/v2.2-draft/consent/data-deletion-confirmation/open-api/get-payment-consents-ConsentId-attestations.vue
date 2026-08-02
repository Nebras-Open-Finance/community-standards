<route lang="yaml">
meta:
  title: List Bank Service Initiation Attestation Events
</route>

<script setup lang="ts">
// The attestations sub-resource is not yet in the published api-specs release,
// so it is served from public/openapi-drafts/ rather than the fetched (and
// gitignored) public/openapi/{version}/ tree. Repoint SPEC at the standards
// spec once it lands upstream — see supporting/internal_helpers/v2.2-draft-plan.md.
const SPEC = '/openapi-drafts/v2.2-draft/uae-consent-attestations-openapi.yaml'
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Consent · Data Deletion Confirmation"
    title="List Bank Service Initiation Attestation Events"
    version="v2.2-draft"
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
