<route lang="yaml">
meta:
  title: Retrieve a Home Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Retrieve a Home Insurance Quote"
    version="v2.2-draft"
    method="GET"
    path="/home-insurance-quotes/{QuoteId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/home-insurance-quotes/{QuoteId}"
      filterMethod="get"
    />
  </EndpointPage>
</template>
