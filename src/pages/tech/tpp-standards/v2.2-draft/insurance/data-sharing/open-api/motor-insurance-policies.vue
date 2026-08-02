<route lang="yaml">
meta:
  title: Get Motor Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get Motor Insurance Policies"
    version="v2.2-draft"
    method="GET"
    path="/motor-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/motor-insurance-policies"
    />
  </EndpointPage>
</template>
