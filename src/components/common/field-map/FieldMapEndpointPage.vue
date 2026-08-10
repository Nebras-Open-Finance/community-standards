<script setup lang="ts">
import { computed } from 'vue'
import { resourceLinks } from '@/composables/useFieldMap'

// Renders in the same shell as the API Reference pages — cream hero with the
// endpoint, white body with the content — so a reader moving between an
// endpoint's schema and its field map stays in one visual language.
const props = defineProps<{
  /** Resource key as it appears in the field map, e.g. `/accounts/{}/customer`. */
  resource: string
  /** Shard filename stem, e.g. `bank-data-sharing__accounts`. */
  slug: string
  eyebrow: string
  title: string
  /** The operation the LFI implements, or the Standards one where the Hub serves it. */
  method: string
  path: string
  /** The Ozone Connect operation, e.g. `GET /accounts/{accountId}/customer`. */
  ozone: string
  /** The Standards operation, e.g. `GET /accounts/{AccountId}/parties`. */
  standards: string
  version: string
}>()

const { docsVersion } = useRouteVersion()
const links = computed(() => resourceLinks(props.resource, docsVersion.value))

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
    <!-- Both sides of the boundary, each linking to its own API Reference page:
         the schema you implement, and the schema the TPP reads. -->
    <template #hero>
      <div class="fmp-pair">
        <div class="fmp-pair__side">
          <span class="fmp-pair__label">Ozone Connect</span>
          <a v-if="ozone && links.lfi" :href="links.lfi"><code>{{ ozone }}</code></a>
          <code v-else-if="ozone">{{ ozone }}</code>
          <span v-else class="fmp-pair__none">Served by the API Hub</span>
        </div>

        <span class="fmp-pair__arrow" aria-hidden="true">&rarr;</span>

        <div class="fmp-pair__side">
          <span class="fmp-pair__label">Standards</span>
          <a v-if="links.tpp" :href="links.tpp"><code>{{ standards }}</code></a>
          <code v-else>{{ standards }}</code>
        </div>
      </div>
    </template>

    <FieldMapExplorer :slug="slug" />
  </EndpointPage>
</template>

<style scoped>
.fmp-pair {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.6rem 1.5rem;
  margin-top: 1.25rem;
}

.fmp-pair__side { display: flex; flex-direction: column; gap: 0.3rem; }

.fmp-pair__label {
  font-family: var(--at-mono);
  font-size: 0.56rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.fmp-pair code {
  font-family: var(--at-mono);
  font-size: 0.82rem;
  color: var(--at-navy-deep);
  word-break: break-word;
}

.fmp-pair a {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--at-grid-line-2);
}
.fmp-pair a:hover code { color: var(--at-teal-deep); }
.fmp-pair a:hover { text-decoration-color: var(--at-teal); }

.fmp-pair__none { font-size: 0.8rem; color: var(--at-mute); font-style: italic; }

.fmp-pair__arrow { color: var(--at-teal); font-size: 1rem; padding-bottom: 0.05rem; }

@media (max-width: 640px) {
  .fmp-pair__arrow { display: none; }
}
</style>
