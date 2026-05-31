<route lang="yaml">
meta:
  title: Initialize a User Challenge
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · User Verification"
    title="Initialize a User Challenge"
    version="v2.1"
    method="POST"
    path="/users/actions/challenge/initialize"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/users/actions/challenge/initialize"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
