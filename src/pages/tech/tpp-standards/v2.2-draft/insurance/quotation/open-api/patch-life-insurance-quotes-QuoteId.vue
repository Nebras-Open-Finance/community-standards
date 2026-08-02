<route lang="yaml">
meta:
  title: Accept a Life Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Accept a Life Insurance Quote"
    version="v2.2-draft"
    method="PATCH"
    path="/life-insurance-quotes/{QuoteId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/life-insurance-quotes/{QuoteId}"
      filterMethod="patch"
    />
  </EndpointPage>
</template>
