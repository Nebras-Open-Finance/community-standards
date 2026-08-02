<route lang="yaml">
meta:
  title: Complete User Registration
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · User Registration"
    title="Complete User Registration"
    version="v2.2-draft"
    method="POST"
    path="/users/actions/register/complete"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/users/actions/register/complete"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
