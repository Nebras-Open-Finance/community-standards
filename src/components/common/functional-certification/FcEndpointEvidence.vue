<script setup lang="ts">
// Evidence block for one selected endpoint. Collects the four pieces of evidence
// per endpoint: the Testing Tool HTML log for the Ozone Connect endpoint, a
// pass / issues outcome with notes, a Postman success screenshot, and the full
// JSON response — the latter two against the TPP-facing (API Hub resource
// server) equivalent. `state` is a reactive object owned by the portal; nested
// fields are bound directly.
import { computed } from 'vue'
import type { FcEndpoint } from '@/data/functional-certification/types'
import type { EndpointState } from './types'

const props = defineProps<{
  endpoint: FcEndpoint
  state: EndpointState
  /** Resolved TPP-facing base URL, with the LFI code already substituted. */
  tppBaseUrl: string
  /** Whether every required piece of evidence for this endpoint is present. */
  complete?: boolean
}>()

const tppUrl = computed(() =>
  props.endpoint.tppPath ? `${props.tppBaseUrl}${props.endpoint.tppPath}` : '',
)
</script>

<template>
  <div class="fc-ev">
    <div class="fc-ev__head">
      <span class="fc-ev__method">{{ endpoint.method }}</span>
      <code class="fc-ev__path">{{ endpoint.ozonePath }}</code>
      <span class="fc-ev__status" :class="complete ? 'fc-ev__status--ok' : 'fc-ev__status--todo'">
        {{ complete ? '✓ Complete' : 'Incomplete' }}
      </span>
    </div>

    <p class="fc-ev__perms">
      <span class="fc-ev__perms-label">Permission(s)</span>
      <code v-for="p in endpoint.permissions" :key="p" class="fc-ev__perm">{{ p }}</code>
    </p>

    <!-- 1. Ozone Connect Testing Tool output -->
    <FcFileInput
      v-model="state.testLog"
      label="Testing Tool output (Ozone Connect)"
      accept=".html,.htm,text/html"
      :hint="`HTML report from the Testing Tool for your Ozone Connect ${endpoint.method} ${endpoint.ozonePath} endpoint.`"
    />

    <!-- 2. Outcome + failure/skip notes -->
    <div class="fc-ev__outcome">
      <span class="fc-ev__label">Test outcome</span>
      <label class="fc-ev__radio">
        <input v-model="state.outcome" type="radio" value="all-pass" />
        All tests passed
      </label>
      <label class="fc-ev__radio">
        <input v-model="state.outcome" type="radio" value="issues" />
        Some tests failed or were skipped
      </label>
    </div>
    <div v-if="state.outcome === 'issues'" class="fc-ev__notes">
      <label class="fc-ev__label" :for="`notes-${endpoint.slug}`">
        Explain why tests failed or were skipped
      </label>
      <textarea
        :id="`notes-${endpoint.slug}`"
        v-model="state.notes"
        class="fc-ev__textarea"
        placeholder="Describe each failed or skipped test and why — e.g. an optional field your product does not populate, or a scenario not applicable to your proposition."
      />
    </div>

    <!-- 3 & 4. TPP-facing equivalent evidence -->
    <template v-if="endpoint.tppPath">
      <p class="fc-ev__tpp">
        <span class="fc-ev__perms-label">TPP-facing equivalent</span>
        <code class="fc-ev__tppurl">{{ tppUrl }}</code>
      </p>
      <FcFileInput
        v-model="state.postman"
        label="Postman success screenshot (TPP-facing)"
        accept="image/png,image/jpeg,image/webp"
        hint="Screenshot from the Postman collection showing a successful response for the TPP-facing equivalent endpoint."
      />
      <FcFileInput
        v-model="state.responseJson"
        label="Full JSON response (TPP-facing)"
        accept=".json,application/json"
        hint="The complete JSON response body returned by the TPP-facing equivalent endpoint."
      />
    </template>
    <EdNote v-else type="note" title="No TPP-facing equivalent">
      <p>
        This Ozone Connect endpoint has no direct TPP-facing equivalent on the Account Information
        resource server, so only the Testing Tool output is required. If your proposition reaches this
        data another way, describe it in the notes above.
      </p>
    </EdNote>
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

.fc-ev__perms, .fc-ev__tpp {
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
.fc-ev__perm, .fc-ev__tppurl {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 7%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.1rem 0.4rem;
}
.fc-ev__tppurl { word-break: break-all; }

.fc-ev__outcome {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  margin: 0.4rem 0 0.75rem;
}
.fc-ev__radio {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-navy-deep);
}
.fc-ev__label { display: block; margin-bottom: 0.35rem; }

.fc-ev__notes { margin-bottom: 0.85rem; }
.fc-ev__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 90px;
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
