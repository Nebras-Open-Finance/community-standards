<route lang="yaml">
meta:
  title: Decrypt PII for a User
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · PII Decryption"
    title="Decrypt PII for a User"
    version="v2.2-draft"
    method="POST"
    path="/users/actions/pii/decrypt"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/users/actions/pii/decrypt"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
