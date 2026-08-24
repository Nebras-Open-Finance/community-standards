<route lang="yaml">
meta:
  title: Create a Home Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Home Insurance Policy"
    version="v2.2-rc1"
    method="POST"
    path="/home-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/home-insurance-policies"
      filterMethod="post"
    />
  </EndpointPage>
</template>
