<script setup lang="ts">
import { computed } from 'vue'

// Renders in the same shell as the API Reference pages — cream hero with the
// endpoint, white body with the content — so a reader moving between an
// endpoint's schema and its field map stays in one visual language.
const props = defineProps<{
  /** Shard filename stem, e.g. `bank-data-sharing__accounts`. */
  slug: string
  eyebrow: string
  title: string
  /** The operation the LFI implements, or the Standards one where the Hub serves it. */
  method: string
  path: string
  /** The Standards operation, named in the meta description. */
  standards: string
  version: string
}>()

const description = computed(
  () =>
    `Field mapping for ${props.method} ${props.path}: every Ozone Connect field the LFI returns, the field the TPP receives for it in ${props.standards}, and the consent permission that exposes it. UAE Open Finance ${props.version}.`,
)
</script>

<template>
  <EndpointPage
    :eyebrow="eyebrow"
    :title="title"
    :version="version"
    :method="method"
    :path="path"
    :description="description"
  >
    <FieldMapExplorer :slug="slug" />
  </EndpointPage>
</template>
