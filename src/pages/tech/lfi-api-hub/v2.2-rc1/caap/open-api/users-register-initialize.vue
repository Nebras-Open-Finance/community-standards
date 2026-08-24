<route lang="yaml">
meta:
  title: Initialize User Registration
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · User Registration"
    title="Initialize User Registration"
    version="v2.2-rc1"
    method="POST"
    path="/users/actions/register/initialize"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/users/actions/register/initialize"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
