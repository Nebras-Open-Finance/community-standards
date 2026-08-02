<route lang="yaml">
meta:
  title: Complete a User Challenge
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · User Verification"
    title="Complete a User Challenge"
    version="v2.2-draft"
    method="POST"
    path="/users/actions/challenge/complete"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/users/actions/challenge/complete"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
