<script setup lang="ts">
// Attribution step, revealed under the vote buttons once a stance is selected.
// Voting requires a Trust Framework SSO session: the voter's organisation and
// name are PULLED from the signed-in identity (never typed in). Depending on the
// session this renders one of:
//   • a "Sign in with the Trust Framework" prompt (signed out)
//   • a not-eligible notice (signed in but not an active member of any org)
//   • the comment box + submit, headed by "Voting as <name> · <org(s)>"
//   • a confirmation card once the vote is recorded
import { ref, computed, watch } from 'vue'
import { STANCE, type Stance } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'

const props = withDefaults(
  defineProps<{
    stance: Stance
    submitted: boolean
    // Optional proposal questions (max 3); each renders its own text box.
    questions?: string[]
  }>(),
  { questions: () => [] },
)

const emit = defineEmits<{
  (e: 'submit', detail: { comment: string; answers: string[] }): void
}>()

const { auth, signInToVote } = useProposals()

const comment = ref('')
// One answer slot per question, aligned by index. Kept in sync as questions load
// (preserving anything already typed) and cleared when the stance changes.
const answers = ref<string[]>([])

function syncAnswers(): void {
  answers.value = (props.questions ?? []).map((_, i) => answers.value[i] ?? '')
}
watch(() => props.questions, syncAnswers, { immediate: true, deep: true })

const meta = computed(() => STANCE[props.stance])
const stanceLabel = computed(() => meta.value.label)
const showForm = computed(() => !props.submitted)

// The organisation(s) the vote is attributed to. A multi-org member votes on
// behalf of all of them, so their names are joined with a comma.
const org = computed(() => auth.value.orgs.map((o) => o.name).join(', '))
const voterName = computed(() => auth.value.name ?? auth.value.email ?? '')

// Why the signed-in user can't vote, if applicable. The only ineligible case is
// an account that is not an active member of any organisation.
const ineligibleReason = computed(() => {
  if (!auth.value.authenticated || auth.value.canVote) return ''
  return 'Your Trust Framework account is not an active member of any organisation, so it cannot vote.'
})

// Switching stance resets the in-progress comment and answers.
watch(
  () => props.stance,
  () => {
    comment.value = ''
    answers.value = (props.questions ?? []).map(() => '')
  },
)

function submit(): void {
  if (!auth.value.canVote) return
  emit('submit', { comment: comment.value, answers: [...answers.value] })
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
      Recorded for <strong>{{ org }}</strong>{{ voterName ? ` · ${voterName}` : '' }}.
    </div>
  </div>

  <!-- Signed out — prompt Trust Framework SSO -->
  <div
    v-else-if="auth.loaded && !auth.authenticated"
    class="pv-attrib pv-attrib--auth"
    :style="{ borderLeftColor: meta.ink }"
  >
    <div class="pv-attrib__title" :style="{ color: meta.ink }">
      Sign in with the Sandbox Trust Framework to record your {{ stanceLabel }} vote
    </div>
    <button
      type="button"
      class="pv-attrib__submit pv-attrib__signin"
      :style="{ background: meta.ink }"
      @click="signInToVote"
    >
      Vote
    </button>
  </div>

  <!-- Signed in but not eligible -->
  <div
    v-else-if="auth.loaded && auth.authenticated && !auth.canVote"
    class="pv-attrib pv-attrib--auth"
    :style="{ borderLeftColor: '#a6391f' }"
  >
    <div class="pv-attrib__title" :style="{ color: '#a6391f' }">Can't vote with this account</div>
    <div class="pv-attrib__auth-text">{{ ineligibleReason }}</div>
  </div>

  <!-- Signed in and eligible — comment + submit -->
  <div
    v-else-if="auth.loaded"
    class="pv-attrib"
    :style="{ borderLeftColor: meta.ink }"
  >
    <div class="pv-attrib__title" :style="{ color: meta.ink }">
      Confirm your {{ stanceLabel }} vote
    </div>
    <div class="pv-attrib__identity">
      <span class="pv-attrib__identity-label">Voting as</span>
      <span class="pv-attrib__identity-val">
        <strong>{{ org }}</strong>{{ voterName ? ` · ${voterName}` : '' }}
      </span>
    </div>
    <!-- Per-question text boxes (only when the proposal defines questions). -->
    <div
      v-for="(question, i) in questions"
      :key="i"
      class="pv-attrib__q"
    >
      <label class="pv-attrib__label">{{ question }} <span class="pv-attrib__opt">(optional)</span></label>
      <textarea
        v-model="answers[i]"
        class="pv-attrib__field pv-attrib__textarea pv-attrib__qfield"
        placeholder="Your answer…"
      />
    </div>
    <div>
      <label class="pv-attrib__label">Comment <span class="pv-attrib__opt">(optional)</span></label>
      <textarea
        v-model="comment"
        class="pv-attrib__field pv-attrib__textarea"
        :placeholder="`Set out in detail why you are voting ${stanceLabel.toLowerCase()} — context, concerns, conditions, anything the working group should weigh.`"
      />
    </div>
    <div class="pv-attrib__actions">
      <button
        type="button"
        class="pv-attrib__submit"
        :style="{ background: meta.ink }"
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

/* Auth prompt / not-eligible notice */
.pv-attrib__auth-text {
  font-size: 13.5px;
  color: var(--at-navy);
  opacity: 0.85;
  line-height: 1.55;
  max-width: 46rem;
  margin-bottom: 16px;
}

.pv-attrib__auth-text strong { color: var(--at-navy-deep); }

/* "Voting as" identity row, pulled from the signed-in session */
.pv-attrib__identity {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  padding: 11px 14px;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.pv-attrib__identity-label {
  font-family: var(--at-mono);
  font-size: 8.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
}

.pv-attrib__identity-val { font-size: 13.5px; color: var(--at-navy); }
.pv-attrib__identity-val strong { color: var(--at-navy-deep); font-weight: 600; }

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
  min-height: 160px;
  resize: vertical;
  line-height: 1.6;
  padding: 12px 14px;
}

/* Per-question answer block — sits above the comment box. */
.pv-attrib__q { margin-bottom: 16px; }

/* Question answers are shorter than the catch-all comment. */
.pv-attrib__qfield { min-height: 88px; }

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
.pv-attrib__signin { margin-top: 2px; }

@media (max-width: 640px) {
  .pv-attrib__actions { justify-content: stretch; }
  .pv-attrib__submit { width: 100%; }
}
</style>
