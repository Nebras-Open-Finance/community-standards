<route lang="yaml">
meta:
  title: Create a Home Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Home Insurance Quote"
    version="v2.2-draft"
    method="POST"
    path="/home-insurance-quotes"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/home-insurance-quotes"
      filterMethod="post"
    />
  </EndpointPage>
</template>
