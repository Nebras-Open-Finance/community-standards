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
  { label: 'Status', value: 'Draft — content to come' },
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
      lede="The API calls that follow a completed registration: the LFI posting the registration to the API Hub, the registration event, and discovery."
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
          <RouterLink to="/biopay/registration/technical-architecture">Registration Technical Architecture</RouterLink>
          page.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>
