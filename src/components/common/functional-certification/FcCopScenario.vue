<script setup lang="ts">
// Evidence block for one Confirmation of Payee match outcome, within one segment.
// Collects the name + IBAN that was requested, the name the LFI's cop-query
// returned (personal segments carry first/last; business a business name), and a
// Postman screenshot of the TPP-facing /confirmation verdict. The not-found
// outcome returns no name, so it is evidenced by confirming the empty response
// instead. `state` is a reactive object owned by the portal; fields bind directly.
import type { CopOutcome, CopSegment } from '@/data/functional-certification/types'
import type { CopScenarioState } from './types'

const props = defineProps<{
  segment: CopSegment
  outcome: CopOutcome
  state: CopScenarioState
  /** Whether the LFI captures the name its cop-query returned. */
  captureResponseName: boolean
  /** Resolved TPP-facing /confirmation URL, LFI code already substituted. */
  confirmationUrl: string
  /** Whether every required piece of evidence for this scenario is present. */
  complete?: boolean
}>()

const isBusiness = props.segment.nameType === 'business'
const nameLabel = isBusiness ? 'Business name' : 'Full name'
const uid = `${props.segment.key}-${props.outcome.key}`
</script>

<template>
  <div class="cop-sc">
    <div class="cop-sc__head">
      <span class="cop-sc__seg">{{ segment.key }}</span>
      <span class="cop-sc__outcome">{{ outcome.label }}</span>
      <code v-if="outcome.indicator" class="cop-sc__ind">{{ outcome.indicator }}</code>
      <code v-else class="cop-sc__ind cop-sc__ind--muted">HTTP 204 — no body</code>
      <span class="cop-sc__status" :class="complete ? 'cop-sc__status--ok' : 'cop-sc__status--todo'">
        {{ complete ? '✓ Complete' : 'Incomplete' }}
      </span>
    </div>

    <p class="cop-sc__guidance">{{ outcome.guidance }}</p>

    <!-- 1. What was requested -->
    <div class="cop-sc__group">
      <span class="cop-sc__group-label">Confirmation request — name &amp; IBAN you asked as</span>
      <div class="cop-sc__grid">
        <label class="cop-sc__field">
          <span class="cop-sc__flabel">{{ nameLabel }}</span>
          <input v-model="state.reqName" type="text" class="cop-sc__input" :placeholder="isBusiness ? 'e.g. Nebras Trading LLC' : 'e.g. Ahmed Ali Al Mansoori'" />
        </label>
        <label v-if="!isBusiness" class="cop-sc__field">
          <span class="cop-sc__flabel">First name <span class="cop-sc__opt">(optional)</span></span>
          <input v-model="state.reqFirstName" type="text" class="cop-sc__input" placeholder="e.g. Ahmed" />
        </label>
        <label v-if="!isBusiness" class="cop-sc__field">
          <span class="cop-sc__flabel">Last name <span class="cop-sc__opt">(optional)</span></span>
          <input v-model="state.reqLastName" type="text" class="cop-sc__input" placeholder="e.g. Al Mansoori" />
        </label>
        <label class="cop-sc__field">
          <span class="cop-sc__flabel">IBAN</span>
          <input v-model="state.reqIban" type="text" class="cop-sc__input cop-sc__input--mono" placeholder="AE070331234567890123456" />
        </label>
      </div>
    </div>

    <!-- 2. What the LFI returned -->
    <template v-if="captureResponseName">
      <div v-if="outcome.returnsName" class="cop-sc__group">
        <span class="cop-sc__group-label">cop-query response — name you returned as the LFI</span>
        <div class="cop-sc__grid">
          <label class="cop-sc__field">
            <span class="cop-sc__flabel">{{ nameLabel }}</span>
            <input v-model="state.resName" type="text" class="cop-sc__input" :placeholder="isBusiness ? 'e.g. Nebras Trading LLC' : 'e.g. Ahmed Ali Al Mansoori'" />
          </label>
          <label v-if="!isBusiness" class="cop-sc__field">
            <span class="cop-sc__flabel">First name <span class="cop-sc__opt">(optional)</span></span>
            <input v-model="state.resFirstName" type="text" class="cop-sc__input" placeholder="e.g. Ahmed" />
          </label>
          <label v-if="!isBusiness" class="cop-sc__field">
            <span class="cop-sc__flabel">Last name <span class="cop-sc__opt">(optional)</span></span>
            <input v-model="state.resLastName" type="text" class="cop-sc__input" placeholder="e.g. Al Mansoori" />
          </label>
        </div>
      </div>
      <label v-else class="cop-sc__confirm">
        <input v-model="state.confirmedEmpty" type="checkbox" />
        <span>I confirm my cop-query returned HTTP 200 with an empty <code>data</code> object for this IBAN, and the TPP-facing <code>/confirmation</code> call returned HTTP 204.</span>
      </label>
    </template>

    <!-- 3. Postman verdict evidence -->
    <p class="cop-sc__tpp">
      <span class="cop-sc__group-label">TPP-facing verdict</span>
      <code class="cop-sc__url">POST {{ confirmationUrl }}</code>
    </p>
    <FcFileInput
      v-model="state.postman"
      :label="`Postman screenshot — ${outcome.label}`"
      accept="image/png,image/jpeg,image/webp"
      :hint="outcome.indicator ? `Screenshot from the Postman collection showing the /confirmation response with NameMatchIndicator ${outcome.indicator}.` : 'Screenshot from the Postman collection showing the /confirmation call returning HTTP 204 for the unrecognised IBAN.'"
    />

    <label class="cop-sc__flabel cop-sc__flabel--block" :for="`cop-notes-${uid}`">Notes <span class="cop-sc__opt">(optional)</span></label>
    <textarea :id="`cop-notes-${uid}`" v-model="state.notes" class="cop-sc__textarea" placeholder="Anything relevant to this scenario — e.g. how the partial match was constructed." />
  </div>
</template>

<style scoped>
.cop-sc {
  padding: 1.1rem 1.25rem 1.25rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
  margin-bottom: 1rem;
}

.cop-sc__head { display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.6rem; }
.cop-sc__seg {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--at-inverse-fg);
  background: var(--at-inverse-bg);
  padding: 0.15rem 0.45rem;
}
.cop-sc__outcome { font-family: var(--at-serif); font-size: 1.05rem; font-weight: 600; color: var(--at-navy-deep); }
.cop-sc__ind {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 8%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.1rem 0.4rem;
}
.cop-sc__ind--muted { color: var(--at-mute); }
.cop-sc__status {
  margin-left: auto;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.45rem;
  border: 1px solid;
}
.cop-sc__status--ok { color: var(--at-teal-deep); border-color: color-mix(in srgb, var(--at-teal) 45%, var(--at-grid-line)); background: color-mix(in srgb, var(--at-teal) 8%, var(--at-bg-cream)); }
.cop-sc__status--todo { color: #a6391f; border-color: color-mix(in srgb, #a6391f 30%, var(--at-grid-line)); background: color-mix(in srgb, #a6391f 6%, var(--at-bg-cream)); }

.cop-sc__guidance { font-family: var(--at-sans); font-size: 0.88rem; line-height: 1.55; color: var(--at-mute-2); margin: 0 0 1rem; }

.cop-sc__group { margin-bottom: 1rem; }
.cop-sc__group-label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  margin-bottom: 0.55rem;
}
.cop-sc__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); gap: 0.75rem; }
.cop-sc__field { display: flex; flex-direction: column; gap: 0.3rem; }
.cop-sc__flabel { font-family: var(--at-sans); font-size: 0.8rem; font-weight: 600; color: var(--at-navy-deep); }
.cop-sc__flabel--block { display: block; margin: 0.4rem 0 0.35rem; }
.cop-sc__opt { font-weight: 400; opacity: 0.6; }
.cop-sc__input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.55rem 0.65rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-navy-deep);
}
.cop-sc__input:focus { outline: none; border-color: var(--at-navy-deep); }
.cop-sc__input--mono { font-family: var(--at-mono); font-size: 0.82rem; }

.cop-sc__confirm {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-gold);
  font-family: var(--at-sans);
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
  cursor: pointer;
}
.cop-sc__confirm input { margin-top: 0.2rem; flex-shrink: 0; }
.cop-sc__confirm code { font-family: var(--at-mono); font-size: 0.8em; }

.cop-sc__tpp { display: flex; flex-direction: column; gap: 0.35rem; margin: 0 0 0.6rem; }
.cop-sc__url {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 0.3rem 0.5rem;
  word-break: break-all;
}

.cop-sc__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 70px;
  resize: vertical;
  padding: 0.6rem 0.7rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}
.cop-sc__textarea:focus { outline: none; border-color: var(--at-navy-deep); }
</style>
