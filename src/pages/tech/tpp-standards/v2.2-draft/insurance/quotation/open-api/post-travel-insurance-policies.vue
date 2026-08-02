<route lang="yaml">
meta:
  title: Create a Travel Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Travel Insurance Policy"
    version="v2.2-draft"
    method="POST"
    path="/travel-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/travel-insurance-policies"
      filterMethod="post"
    />
  </EndpointPage>
</template>
