<route lang="yaml">
meta:
  title: Retrieve a Travel Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Retrieve a Travel Insurance Quote"
    version="v2.2-draft"
    method="GET"
    path="/travel-insurance-quotes/{QuoteId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/travel-insurance-quotes/{QuoteId}"
      filterMethod="get"
    />
  </EndpointPage>
</template>
