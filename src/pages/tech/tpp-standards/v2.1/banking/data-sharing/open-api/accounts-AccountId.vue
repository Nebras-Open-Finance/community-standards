<route lang="yaml">
meta:
  title: Get an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Data Sharing"
    title="Get an Account"
    version="v2.1"
    method="GET"
    path="/accounts/{AccountId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-account-information-openapi.yaml"
      filterPath="/accounts/{AccountId}"
    />
  </EndpointPage>
</template>
