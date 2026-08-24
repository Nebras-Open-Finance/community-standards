<route lang="yaml">
meta:
  title: Validate a Consent
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Consent"
    title="Validate a Consent"
    version="v2.2-rc1"
    method="POST"
    path="/consent/actions/validate"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/consent/actions/validate"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
