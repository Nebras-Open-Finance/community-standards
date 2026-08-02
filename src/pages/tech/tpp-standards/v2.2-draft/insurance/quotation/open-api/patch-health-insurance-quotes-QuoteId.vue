<route lang="yaml">
meta:
  title: Accept a Health Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Accept a Health Insurance Quote"
    version="v2.2-draft"
    method="PATCH"
    path="/health-insurance-quotes/{QuoteId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/health-insurance-quotes/{QuoteId}"
      filterMethod="patch"
    />
  </EndpointPage>
</template>
