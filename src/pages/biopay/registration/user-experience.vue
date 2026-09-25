<route lang="yaml">
meta:
  layout: biopay
  title: Registration — User Experience
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Registration — User Experience · BioPay' })

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
      title="User Experience"
      :meta="meta"
      lede="The customer-facing registration journey in the LFI&rsquo;s own channel: identity verification against ICP, instrument selection, and what the customer is told about how biometric payments will work."
    />

    <EdSectionBand
      id="coming"
      color="var(--at-gold)"
      eyebrow="Placeholder"
      title="Content coming later"
    >
      <EdNote type="info" title="Not yet written">
        <p>
          This page will set out the registration journey as the customer experiences it &mdash;
          screens, wording, consent language, instrument selection, and the confirmation they
          receive. It is deliberately empty for now.
        </p>
        <p>
          The technical side of the same journey is on the
          <RouterLink to="/biopay/registration/api-guide">Registration API Guide</RouterLink>.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>
