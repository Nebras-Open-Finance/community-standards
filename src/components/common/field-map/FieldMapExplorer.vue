<script setup lang="ts">
import { computed } from 'vue'
import {
  useFieldMapIndex,
  useFieldMapResource,
  type FieldMapRecord,
} from '@/composables/useFieldMap'

// One endpoint per page: the shard is the unit of loading and of display.
const props = defineProps<{
  slug: string
}>()

const { docsVersion } = useRouteVersion()
const { records, loading, error } = useFieldMapResource(docsVersion, () => props.slug)
const { endpoints } = useFieldMapIndex(docsVersion)

const endpoint = computed(() => endpoints.value.find((e) => e.slug === props.slug))

// The response envelope — `Links.*` and `Meta.*` on the Standards side, `meta.*`
// on the Ozone side — is transport, not data. It is identical on every endpoint
// and the Hub composes it rather than mapping it, so it pushed the fields the
// reader came for down the page. The optional `[].` prefix covers list resources.
const ENVELOPE_STANDARDS = /^(\[\]\.)?(Links|Meta)(\.|$)/
const ENVELOPE_OZONE = /^(\[\]\.)?(links|meta)(\.|$)/

function isEnvelope(record: FieldMapRecord): boolean {
  return (
    ENVELOPE_STANDARDS.test(record.standardsPath ?? '') ||
    ENVELOPE_OZONE.test(record.ozonePath ?? '')
  )
}

// Every remaining row is rendered, unmapped fields included. Hiding those would
// drop a third of some endpoints' fields with nothing to say so; the Mapping
// column flags them in red instead.
const rows = computed(() => records.value.filter((r) => !isEnvelope(r)))

// Payments and the open-data endpoints are not permission-gated, so the column
// would be a run of em dashes on every row.
const showPermissions = computed(() => rows.value.some((r) => r.permissions.length > 0))

// Permission sets come precomputed by the generator: permission set → how many
// fields it exposes. Counted over observed rows where the endpoint has any, so
// "what does Detail buy me over Basic" is a measurement, not a spec total.
const permissionSets = computed(() => {
  const sets = endpoint.value?.permissionSets ?? {}
  const observed = (endpoint.value?.observedPermissions ?? 0) > 0
  return Object.entries(sets).map(([key, count]) => ({ key, count, observed }))
})
</script>

<template>
  <div class="fm">
    <p v-if="loading && !records.length" class="fm__status">Loading the field map&hellip;</p>
    <p v-else-if="error" class="fm__status fm__status--error">
      The field map could not be loaded ({{ error }}). Reload the page to try again.
    </p>

    <template v-if="rows.length">
      <div class="fm__bar">
        <div v-if="permissionSets.length" class="fm__perm-sets">
          <span class="fm__perm-sets-label">Fields per permission set</span>
          <span
            v-for="set in permissionSets"
            :key="set.key"
            class="fm__perm-set"
            :class="{ 'fm__perm-set--observed': set.observed }"
            :title="set.observed
              ? 'Measured: a consent carrying exactly these permissions returned this many fields in the verification run.'
              : 'Not measured: the endpoint declares these permissions, and this is how many Standards fields the specification defines for it.'"
          >
            {{ set.key }}
            <strong>{{ set.count }}</strong>
            <em v-if="!set.observed">declared</em>
          </span>
        </div>
      </div>

      <!-- The Hub is the enforcement point for consent. Said as a relief from
           work rather than a prohibition: an LFI that wants to filter as well
           is free to, it just gains nothing by it. -->
      <p v-if="showPermissions" class="fm__enforcement">
        <strong>The API Hub applies these permissions before the TPP sees the response.</strong>
        Your Ozone Connect endpoint can return the full payload for the account it was asked
        about, and the Hub removes whatever the consent does not permit. You may apply the same
        filtering yourself if you prefer, but nothing requires it &mdash; the Hub enforces the
        consent either way.
      </p>

      <FieldMapTable :rows="rows" :show-permissions="showPermissions" />
    </template>
  </div>
</template>

<style scoped>
.fm {
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.fm__status {
  font-size: 0.95rem;
  color: var(--at-mute);
  padding: 2rem 0;
}
.fm__status--error { color: var(--at-gold); }

.fm__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
  padding-bottom: 0.9rem;
}

.fm__enforcement {
  margin: 0 0 1.1rem;
  padding: 0.7rem 0.9rem;
  border-left: 3px solid var(--at-teal);
  background: color-mix(in srgb, var(--at-teal) 6%, var(--at-surface));
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  max-width: 60rem;
}
.fm__enforcement strong { color: var(--at-navy-deep); font-weight: 600; }

.fm__perm-sets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
}
.fm__perm-sets-label {
  font-family: var(--at-mono);
  font-size: 0.56rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-right: 0.2rem;
}
.fm__perm-set {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  color: var(--at-mute-2);
  border: 1px dashed var(--at-grid-line-2);
  padding: 0.2rem 0.5rem;
  cursor: help;
}
/* Solid = measured against a live response; dashed = inherited from the
   endpoint declaration. The two must not read as the same claim. */
.fm__perm-set--observed {
  border-style: solid;
  border-color: color-mix(in srgb, var(--at-teal) 45%, transparent);
  background: color-mix(in srgb, var(--at-teal) 10%, var(--at-surface));
  color: var(--at-teal-ink);
}
.fm__perm-set strong { color: var(--at-navy-deep); font-weight: 700; margin-left: 0.3rem; }
.fm__perm-set em {
  font-style: normal;
  font-size: 0.56rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-left: 0.3rem;
}

</style>
