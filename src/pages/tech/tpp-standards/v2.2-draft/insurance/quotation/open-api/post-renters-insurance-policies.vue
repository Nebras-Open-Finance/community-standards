<route lang="yaml">
meta:
  title: Create a Renters Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Renters Insurance Policy"
    version="v2.2-draft"
    method="POST"
    path="/renters-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/renters-insurance-policies"
      filterMethod="post"
    />
  </EndpointPage>
</template>
