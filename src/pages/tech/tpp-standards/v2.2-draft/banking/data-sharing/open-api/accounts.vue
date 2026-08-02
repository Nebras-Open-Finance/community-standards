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
    version="v2.2-draft"
    method="GET"
    path="/accounts"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-account-information-openapi.yaml"
      filterPath="/accounts"
    />
  </EndpointPage>
</template>
