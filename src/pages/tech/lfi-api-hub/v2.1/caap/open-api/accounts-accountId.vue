<route lang="yaml">
meta:
  title: Retrieve an Account (CAAP)
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Accounts"
    title="Retrieve an Account (CAAP)"
    version="v2.1"
    method="GET"
    path="/accounts/{accountId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/accounts/{accountId}"
      filterMethod="get"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
