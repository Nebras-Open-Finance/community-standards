<route lang="yaml">
meta:
  layout: biopay
  title: Payment — API Guide
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Payment — API Guide · BioPay' })

interface MetaItem { label: string; value: string }

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft — content to come' },
  { label: 'Version', value: '0.1' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Payment · Draft"
      eyebrow-color="var(--at-gold)"
      title="Payment API Guide"
      :meta="meta"
      lede="The API calls that make up a biometric payment: obtaining an access token, creating the payment, execution at the LFI, and tracking its status."
    />

    <EdSectionBand
      id="coming"
      color="var(--at-gold)"
      eyebrow="Placeholder"
      title="Coming soon"
    >
      <EdNote type="info" title="Not yet written">
        <p>
          This API guide will be drafted after the technical sequence flow and the options have
          been decided.
        </p>
        <p>
          The flow and the options under consideration are on the
          <RouterLink to="/biopay/payment/technical-architecture">Payment Technical Architecture</RouterLink>
          page.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>
