<script setup lang="ts">
// TPP evidence block for one consumed endpoint: a Postman screenshot proving the
// data was retrieved from the sandbox Model Bank, plus optional notes. `state`
// is a reactive object owned by the portal; nested fields are bound directly.
import { computed } from 'vue'
import type { FcEndpoint } from '@/data/functional-certification/types'
import type { TppEndpointState } from './types'

const props = defineProps<{
  endpoint: FcEndpoint
  state: TppEndpointState
  /** Resolved sandbox Model Bank base URL (version substituted). */
  baseUrl: string
  /** Whether the required evidence for this endpoint is present. */
  complete?: boolean
}>()

const modelBankUrl = computed(() =>
  props.endpoint.tppPath ? `${props.baseUrl}${props.endpoint.tppPath}` : '',
)
</script>

<template>
  <div class="fc-ev">
    <div class="fc-ev__head">
      <span class="fc-ev__method">{{ endpoint.method }}</span>
      <code class="fc-ev__path">{{ endpoint.tppPath || endpoint.ozonePath }}</code>
      <span class="fc-ev__status" :class="complete ? 'fc-ev__status--ok' : 'fc-ev__status--todo'">
        {{ complete ? '✓ Complete' : 'Incomplete' }}
      </span>
    </div>

    <p class="fc-ev__perms">
      <span class="fc-ev__perms-label">Permission(s)</span>
      <code v-for="p in endpoint.permissions" :key="p" class="fc-ev__perm">{{ p }}</code>
    </p>

    <p v-if="modelBankUrl" class="fc-ev__url">
      <span class="fc-ev__perms-label">Retrieve from</span>
      <code class="fc-ev__urlval">{{ modelBankUrl }}</code>
    </p>

    <FcFileInput
      v-model="state.postman"
      label="Postman evidence (Model Bank)"
      accept="image/png,image/jpeg,image/webp"
      hint="Screenshot from Postman showing you successfully retrieved this data from the sandbox Model Bank."
    />

    <div class="fc-ev__notes">
      <label class="fc-ev__label" :for="`tpp-notes-${endpoint.slug}`">Notes <span class="fc-ev__opt">(optional)</span></label>
      <textarea
        :id="`tpp-notes-${endpoint.slug}`"
        v-model="state.notes"
        class="fc-ev__textarea"
        placeholder="Anything worth noting about this call — e.g. which Model Bank account or consent you used."
      />
    </div>
  </div>
</template>

<style scoped>
.fc-ev {
  padding: 1.1rem 1.25rem 1.25rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
  margin-bottom: 1rem;
}

.fc-ev__head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; }
.fc-ev__method {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  background: var(--at-teal-deep);
  padding: 0.15rem 0.4rem;
}
.fc-ev__path { font-family: var(--at-mono); font-size: 0.9rem; color: var(--at-navy-deep); }
.fc-ev__status {
  margin-left: auto;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.45rem;
  border: 1px solid;
}
.fc-ev__status--ok { color: var(--at-teal-deep); border-color: color-mix(in srgb, var(--at-teal) 45%, var(--at-grid-line)); background: color-mix(in srgb, var(--at-teal) 8%, var(--at-bg-cream)); }
.fc-ev__status--todo { color: #a6391f; border-color: color-mix(in srgb, #a6391f 30%, var(--at-grid-line)); background: color-mix(in srgb, #a6391f 6%, var(--at-bg-cream)); }

.fc-ev__perms, .fc-ev__url {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 0.85rem;
}
.fc-ev__perms-label, .fc-ev__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}
.fc-ev__perm, .fc-ev__urlval {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 7%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.1rem 0.4rem;
}
.fc-ev__urlval { word-break: break-all; }

.fc-ev__label { display: block; margin-bottom: 0.35rem; }
.fc-ev__opt { opacity: 0.6; font-weight: 400; }
.fc-ev__notes { margin-top: 0.25rem; }
.fc-ev__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 80px;
  resize: vertical;
  padding: 0.6rem 0.7rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}
.fc-ev__textarea:focus { outline: none; border-color: var(--at-navy-deep); }
</style>
