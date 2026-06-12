<script setup lang="ts">
// Attribution form, revealed under the vote buttons once a stance is selected.
// The voter names themselves and (optionally) adds a comment; submitting records
// the attribution against their vote.
import { ref, computed, watch } from 'vue'
import { STANCE, type Stance } from '@/data/proposals'

const props = defineProps<{
  stance: Stance
  submitted: boolean
  submittedOrg?: string | undefined
  submittedPerson?: string | undefined
}>()

const emit = defineEmits<{
  (e: 'submit', detail: { org: string; person: string; comment: string }): void
}>()

const org = ref('')
const name = ref('')
const comment = ref('')
const editing = ref(false)

const meta = computed(() => STANCE[props.stance])
const stanceLabel = computed(() => meta.value.label)
const showForm = computed(() => !props.submitted || editing.value)
// Organisation is the vote's identity (one vote per org), so it's required.
const canSubmit = computed(() => org.value.trim().length > 0)

// Switching stance resets the in-progress comment and re-opens the form. The
// organisation is kept — it's who you are, not what you're voting.
watch(
  () => props.stance,
  () => {
    comment.value = ''
    editing.value = false
  },
)

function submit(): void {
  if (!canSubmit.value) return
  emit('submit', { org: org.value, person: name.value, comment: comment.value })
  editing.value = false
}

function edit(): void {
  editing.value = true
  org.value = props.submittedOrg ?? ''
  name.value = ''
  comment.value = ''
}
</script>

<template>
  <!-- Confirmation card -->
  <div
    v-if="!showForm"
    class="pv-attrib pv-attrib--done"
    :style="{
      background: `color-mix(in srgb, ${meta.ink} 9%, white)`,
      borderLeftColor: meta.ink,
    }"
  >
    <div class="pv-attrib__done-title" :style="{ color: meta.ink }">
      ✓ Submitted · {{ stanceLabel }}
    </div>
    <div class="pv-attrib__done-text">
      Recorded for <strong>{{ submittedOrg }}</strong>{{ submittedPerson ? ` · ${submittedPerson}` : '' }}.
    </div>
    <button type="button" class="pv-attrib__edit" @click="edit">Edit details</button>
  </div>

  <!-- Entry form -->
  <div
    v-else
    class="pv-attrib"
    :style="{ borderLeftColor: meta.ink }"
  >
    <div class="pv-attrib__title" :style="{ color: meta.ink }">
      Add your details · {{ stanceLabel }}
    </div>
    <div class="pv-attrib__grid">
      <div>
        <label class="pv-attrib__label">Organisation</label>
        <input
          v-model="org"
          class="pv-attrib__field"
          placeholder="e.g. FAB"
          autocomplete="off"
        />
      </div>
      <div>
        <label class="pv-attrib__label">Your name <span class="pv-attrib__opt">(optional)</span></label>
        <input v-model="name" class="pv-attrib__field" placeholder="e.g. F. Karimi" />
      </div>
      <div>
        <label class="pv-attrib__label">Comment <span class="pv-attrib__opt">(optional)</span></label>
        <textarea
          v-model="comment"
          class="pv-attrib__field pv-attrib__textarea"
          :placeholder="`Why are you voting ${stanceLabel.toLowerCase()}?`"
        />
      </div>
    </div>
    <div class="pv-attrib__actions">
      <button
        type="button"
        class="pv-attrib__submit"
        :disabled="!canSubmit"
        :style="{ background: canSubmit ? meta.ink : 'var(--at-grid-line)' }"
        @click="submit"
      >
        Submit {{ stanceLabel }} vote
      </button>
    </div>
  </div>
</template>

<style scoped>
.pv-attrib {
  padding: 20px 26px;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  border-left: 3px solid;
}

.pv-attrib--done {
  padding: 18px 26px;
}

.pv-attrib__title,
.pv-attrib__done-title {
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 14px;
}

.pv-attrib__done-title { margin-bottom: 5px; }

.pv-attrib__done-text {
  font-size: 13px;
  color: var(--at-navy);
  opacity: 0.8;
  line-height: 1.45;
}

.pv-attrib__done-text strong { color: var(--at-navy-deep); }

.pv-attrib__edit {
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0 0;
  text-decoration: underline;
}

.pv-attrib__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 14px;
  align-items: start;
}

.pv-attrib__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 8.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  margin-bottom: 5px;
}

.pv-attrib__opt { opacity: 0.6; }

.pv-attrib__field {
  width: 100%;
  box-sizing: border-box;
  padding: 9px 11px;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 13px;
  color: var(--at-navy-deep);
  outline: none;
}

.pv-attrib__field:focus { border-color: var(--at-navy-deep); }

.pv-attrib__textarea {
  min-height: 38px;
  resize: vertical;
  line-height: 1.5;
}

.pv-attrib__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.pv-attrib__submit {
  padding: 12px 32px;
  color: #fff;
  border: none;
  font-family: var(--at-sans);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}

.pv-attrib__submit:disabled { cursor: default; }

@media (max-width: 640px) {
  .pv-attrib__grid { grid-template-columns: 1fr; gap: 12px; }
  .pv-attrib__actions { justify-content: stretch; }
  .pv-attrib__submit { width: 100%; }
}
</style>
