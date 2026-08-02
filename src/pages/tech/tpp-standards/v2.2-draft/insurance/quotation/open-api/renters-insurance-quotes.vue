<route lang="yaml">
meta:
  title: Create a Renters Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Renters Insurance Quote"
    version="v2.2-draft"
    method="POST"
    path="/renters-insurance-quotes"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/renters-insurance-quotes"
      filterMethod="post"
    />
  </EndpointPage>
</template>
