<route lang="yaml">
meta:
  layout: biopay
  title: Registration — API Guide
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Registration — API Guide · BioPay' })

interface MetaItem { label: string; value: string }

const meta: MetaItem[] = [
  { label: 'Status', value: 'Content coming soon from ICP SDK' },
  { label: 'Version', value: '0.1' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Registration · Draft"
      eyebrow-color="var(--at-gold)"
      title="Registration API Guide"
      :meta="meta"
      lede="The registration API is provided by the ICP SDK."
    />

    <EdSectionBand
      id="coming"
      color="var(--at-gold)"
      eyebrow="Placeholder"
      title="Content coming soon from ICP SDK"
    >
      <EdNote type="info" title="Not yet written">
        <p>
          The LFI channel integrates with ICP directly through the ICP SDK. The API guide for
          registration will come from the ICP SDK documentation.
        </p>
        <p>
          The registration flow is on the
          <RouterLink to="/biopay/registration/technical-architecture">Registration Technical Architecture</RouterLink>
          page.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>
