<script setup lang="ts">
// Evidence block for one cross-cutting consent-lifecycle operation (get / revoke
// / suspend a consent, or the cancelled-authorization do-fail). Every op takes a
// Postman screenshot; the do-fail op also collects the error + error_description
// the certifier returns. Shared by the LFI and TPP portals. `state` is a reactive
// object owned by the portal; nested fields are bound directly.
import { computed } from 'vue'
import type { FcConsentOp } from '@/data/functional-certification/types'
import type { ConsentOpState } from './types'

const props = defineProps<{
  op: FcConsentOp
  state: ConsentOpState
  /** Selected standards version — substituted into the op's base URL template. */
  version: string
  /** Whether the required evidence for this op is present. */
  complete?: boolean
}>()

const url = computed(() => props.op.baseUrlTemplate.replace('{VERSION}', props.version) + props.op.path)
</script>

<template>
  <div class="fc-ev">
    <div class="fc-ev__head">
      <span class="fc-ev__method">{{ op.method }}</span>
      <code class="fc-ev__path">{{ op.path }}</code>
      <span class="fc-ev__status" :class="complete ? 'fc-ev__status--ok' : 'fc-ev__status--todo'">
        {{ complete ? '✓ Complete' : 'Incomplete' }}
      </span>
    </div>

    <p class="fc-ev__title">{{ op.title }}</p>
    <p class="fc-ev__scenario">{{ op.scenario }}</p>

    <p class="fc-ev__url">
      <span class="fc-ev__label">Call</span>
      <code class="fc-ev__urlval">{{ url }}</code>
    </p>
    <p v-if="op.docHref" class="fc-ev__doc">
      <a :href="op.docHref" target="_blank" rel="noopener">View the API reference for this operation ↗</a>
    </p>

    <FcFileInput
      v-model="state.postman"
      label="Postman success screenshot"
      accept="image/png,image/jpeg,image/webp"
      hint="Screenshot from Postman showing a successful call for this operation."
    />

    <!-- Cancelled-authorization scenario — the error the certifier returns on do-fail. -->
    <template v-if="op.captureErrorDetails">
      <div class="fc-ev__err">
        <label class="fc-ev__label" :for="`err-${op.slug}`">error</label>
        <input
          :id="`err-${op.slug}`"
          v-model="state.error"
          class="fc-ev__input"
          type="text"
          placeholder="access_denied"
          spellcheck="false"
        />
        <p class="fc-ev__errhint">
          The OAuth2 / OIDC <code>error</code> value you return when the customer cancels the
          authorization. The convention for a customer declining is <code>access_denied</code>.
        </p>
      </div>
      <div class="fc-ev__err">
        <label class="fc-ev__label" :for="`errd-${op.slug}`">error_description</label>
        <input
          :id="`errd-${op.slug}`"
          v-model="state.errorDescription"
          class="fc-ev__input"
          type="text"
          placeholder="The customer cancelled the authorization."
        />
        <p class="fc-ev__errhint">The human-readable description you return alongside the error.</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.fc-ev {
  padding: 1.1rem 1.25rem 1.25rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-gold);
  margin-bottom: 1rem;
}

.fc-ev__head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; }
.fc-ev__method {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  background: var(--at-navy-deep);
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

.fc-ev__title { font-family: var(--at-sans); font-size: 0.98rem; font-weight: 600; color: var(--at-navy-deep); margin: 0 0 0.25rem; }
.fc-ev__scenario { font-family: var(--at-sans); font-size: 0.88rem; line-height: 1.55; color: var(--at-mute-2); margin: 0 0 0.85rem; }

.fc-ev__url { display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem; margin: 0 0 0.5rem; }
.fc-ev__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}
.fc-ev__urlval {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-gold) 10%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.1rem 0.4rem;
  word-break: break-all;
}
.fc-ev__doc { margin: 0 0 0.85rem; }
.fc-ev__doc a { font-family: var(--at-sans); font-size: 0.82rem; color: var(--at-teal-deep); }

.fc-ev__err { margin-top: 0.75rem; }
.fc-ev__err .fc-ev__label { display: block; margin-bottom: 0.3rem; }
.fc-ev__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.55rem 0.7rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.85rem;
  color: var(--at-navy-deep);
}
.fc-ev__input:focus { outline: none; border-color: var(--at-navy-deep); }
.fc-ev__errhint { font-family: var(--at-sans); font-size: 0.8rem; color: var(--at-mute); margin: 0.35rem 0 0; line-height: 1.45; }
.fc-ev__errhint code { font-family: var(--at-mono); font-size: 0.76rem; background: var(--at-surface); padding: 0.05rem 0.25rem; border: 1px solid var(--at-grid-line); }
</style>
