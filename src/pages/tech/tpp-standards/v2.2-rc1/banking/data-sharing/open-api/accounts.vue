<route lang="yaml">
meta:
  title: Get Accounts
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Data Sharing"
    title="Get Accounts"
    version="v2.2-rc1"
    method="GET"
    path="/accounts"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-account-information-openapi.yaml"
      filterPath="/accounts"
    />
  </EndpointPage>
</template>
