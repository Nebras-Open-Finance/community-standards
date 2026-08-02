<route lang="yaml">
meta:
  title: Deregister a User
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · User Registration"
    title="Deregister a User"
    version="v2.2-draft"
    method="POST"
    path="/users/actions/deregister"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/users/actions/deregister"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
