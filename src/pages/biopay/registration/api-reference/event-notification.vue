<route lang="yaml">
meta:
  layout: biopay
  title: POST Event
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// The registration event the API Hub POSTs to the initiator. Direction is
// reversed from every other operation in the document — the initiator
// implements this one — so the server is shown as ICP's registered event
// endpoint rather than an API Hub host.
import { BIOPAY_SPEC } from '@/data/biopay-spec'

const servers = [{ url: 'https://[ICP_Event_Endpoint]' }]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Registration · Draft"
    title="Registration event notification"
    version="Draft · 0.1"
    method="POST"
    path="/biometric-payment-registration-events"
    description="The registration event the API Hub delivers to an authorised BioPay initiator once an LFI has registered a customer, structured as an Open Finance webhook: signed envelope, Data and Meta schema, event types and delivery expectations."
  >
    <RedocWrapper
      :spec-text="BIOPAY_SPEC"
      filter-path="/biometric-payment-registration-events"
      filter-method="post"
      display-path="/biometric-payment-registration-events"
      :override-servers="servers"
      container-id="redoc-biopay-registration-event"
    />
  </EndpointPage>
</template>
