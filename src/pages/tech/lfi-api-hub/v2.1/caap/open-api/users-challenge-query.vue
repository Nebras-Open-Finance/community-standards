<route lang="yaml">
meta:
  title: Query a User Challenge
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · User Verification"
    title="Query a User Challenge"
    version="v2.1"
    method="POST"
    path="/users/actions/challenge/query"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/users/actions/challenge/query"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
