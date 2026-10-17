<script setup lang="ts">
// Everything a Jira form page shares: the page header, Sandbox Trust Framework
// sign-in, the ticket field (key, link, or ?ticket= in the URL), the access
// check, the ticket card, and the submitted / error states. The form itself goes
// in the default slot and is shown only once access is granted:
//
//   <JiraFormShell form-id="supported-currency-pairs" title="…" description="…">
//     <template #default="{ submit, submitting }"> …fields… </template>
//   </JiraFormShell>
//
// The slot is keyed on the ticket, so checking another ticket starts the form
// afresh. Styles are global (all jf__-prefixed) so form components reuse the
// same inputs, labels and buttons. See useJiraForm and src/data/jiraForms.ts.

import { computed, onMounted, ref, watch } from 'vue'
import { useSandboxAuth } from '@/composables/useSandboxAuth'
import { parseTicketKey, useJiraForm } from '@/composables/useJiraForm'

const props = defineProps<{
  /** The form's id in the standards-api registry; also its page slug. */
  formId: string
  title: string
  description: string
}>()

const { auth, loadMe, signIn } = useSandboxAuth()
const {
  state, ticket, message, submitting, submitError, submitted, delivered, check, submit,
} = useJiraForm(props.formId)

const ticketInput = ref('')
const attempted = ref(false)

const parsedKey = computed(() => parseTicketKey(ticketInput.value))
const keyError = computed(() =>
  attempted.value && !parsedKey.value
    ? 'Enter a ticket key such as OF-7894, or paste the ticket link.'
    : '',
)

const ACCESS_LABEL: Record<string, string> = {
  reporter: 'You raised this ticket',
  participant: 'You are a participant on this ticket',
  organisation: 'Shared with your organisation',
  admin: 'Administrator access',
}

/** Keep ?ticket= in step, so the page can be linked to and survives sign-in. */
function syncUrl(key: string | null): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (key) url.searchParams.set('ticket', key)
  else url.searchParams.delete('ticket')
  window.history.replaceState({}, '', url.toString())
}

function onCheck(): void {
  attempted.value = true
  const key = parsedKey.value
  if (!key) return
  ticketInput.value = key
  syncUrl(key)
  void check(key)
}

onMounted(async () => {
  ticketInput.value = new URLSearchParams(window.location.search).get('ticket') || ''
  await loadMe()
})

// Check a linked ticket as soon as we know there is a session.
watch(
  () => auth.value.authenticated,
  (signedIn) => {
    if (signedIn && parsedKey.value && state.value === 'idle') onCheck()
  },
)
</script>

<template>
  <div class="jf">
    <div class="jf__eyebrow">Jira forms</div>
    <h1 class="jf__title">{{ title }}</h1>
    <p class="jf__lede">
      {{ description }} Available only for tickets your Sandbox Trust Framework account can see.
    </p>

    <div class="jf__card">
      <!-- Session -->
      <p v-if="!auth.loaded" class="jf__note">Checking your session…</p>

      <p v-else-if="auth.blocked" class="jf__error">
        Your account is not permitted to use this form.
      </p>

      <div v-else-if="!auth.authenticated || state === 'signedOut'" class="jf__row">
        <p class="jf__note">
          Sign in with your Sandbox Trust Framework account — the same one you use for
          the Service Desk.
        </p>
        <button type="button" class="jf__go" @click="signIn">Sign in</button>
      </div>

      <template v-else>
        <p class="jf__note">
          Signed in as <strong>{{ auth.name || auth.email }}</strong>
          <template v-if="auth.orgs.length"> · {{ auth.orgs.map((o) => o.name).join(', ') }}</template>
        </p>

        <!-- Ticket -->
        <form novalidate @submit.prevent="onCheck">
          <label class="jf__label" for="jf-ticket">Ticket</label>
          <div class="jf__inline">
            <input
              id="jf-ticket"
              v-model="ticketInput"
              class="jf__input"
              :class="{ 'jf__input--bad': keyError }"
              type="text"
              autocomplete="off"
              spellcheck="false"
              placeholder="OF-7894 or https://servicedesk.nebrasopenfinance.ae/browse/OF-7894"
              :aria-invalid="!!keyError"
              aria-describedby="jf-ticket-msg"
            >
            <button type="submit" class="jf__pick" :disabled="state === 'checking'">
              {{ state === 'checking' ? 'Checking…' : 'Check access' }}
            </button>
          </div>
          <p v-if="keyError" id="jf-ticket-msg" class="jf__ferr">{{ keyError }}</p>
          <p v-else id="jf-ticket-msg" class="jf__hint">The ticket key, or its Service Desk link.</p>
        </form>

        <p v-if="state === 'denied' || state === 'error'" class="jf__error">{{ message }}</p>

        <!-- Granted: ticket details, then the form -->
        <template v-if="state === 'granted' && ticket">
          <div class="jf__rule" />

          <div class="jf__ticket">
            <div class="jf__tkey">
              <a v-if="ticket.url" :href="ticket.url" target="_blank" rel="noopener">{{ ticket.key }} ↗</a>
              <template v-else>{{ ticket.key }}</template>
              <span v-if="ticket.status" class="jf__status">{{ ticket.status }}</span>
            </div>
            <div class="jf__tsum">{{ ticket.summary || 'No summary' }}</div>
            <div class="jf__hint">{{ ACCESS_LABEL[ticket.access] }}</div>
          </div>

          <p v-if="submitted" class="jf__ok">
            Submitted to {{ ticket.key }}.
            <template v-if="delivered === 'comment'">Added as a comment, with the JSON inline.</template>
            <template v-else>Attached as JSON, with a summary comment.</template>
          </p>

          <div v-else :key="ticket.key">
            <slot :ticket="ticket" :submit="submit" :submitting="submitting" />
            <p v-if="submitError" class="jf__error jf__error--submit">{{ submitError }}</p>
          </div>
        </template>
      </template>
    </div>

    <!-- A form's JiraFormSubmitBar is teleported here, so it sits below the card. -->
    <div id="jf-bar" class="jf__bar" />
  </div>
</template>

<style>
/* Global on purpose: every class is jf__-prefixed, and form components in the
   shell's slot use the same inputs, labels and buttons. */
.jf {
  max-width: 40rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 0;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
  /* At least a screen tall, so the submit bar (pushed down by margin-top: auto)
     sits at the bottom of the window even when the form is short. */
  box-sizing: border-box;
  min-height: calc(100vh - var(--at-header-height));
  display: flex;
  flex-direction: column;
}

.jf__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 700;
}

.jf__title {
  font-family: var(--at-serif);
  font-size: clamp(1.9rem, 3.4vw, 2.4rem);
  color: var(--at-navy-deep);
  margin: 0.4rem 0 0;
  line-height: 1.15;
}

.jf__lede { margin: 0.5rem 0 0; font-size: 1rem; color: var(--at-mute); }

.jf__card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-navy-deep);
  border-radius: 10px;
  padding: 1.75rem 1.9rem;
  margin-top: 1.75rem;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Sticky itself: .jf is its containing block, so it stays in view at the foot
   of the viewport while the card scrolls. Bleeds out to .jf's side padding. */
.jf__bar {
  position: sticky;
  bottom: 0;
  z-index: 10;
  margin: auto -1.5rem 0;
}
/* With a bar, it sits on the footer, as on Sandbox onboarding: cancel base.css's
   8rem breathing room, which lands on this last child of the page. With no bar
   (signing in, checking a ticket, submitted) that room stays. Selector out-ranks
   the base.css rule's specificity. */
.app-shell:not(.is-home) .app-shell__main > .jf > .jf__bar:not(:empty) { padding-bottom: 0; margin-bottom: 8rem; }
.jf__bar > .jfsb { padding-left: 1.5rem; padding-right: 1.5rem; }

.jf__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  margin-bottom: 0.65rem;
}

.jf__inline { display: flex; gap: 0.6rem; }

.jf__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 8px;
  background: transparent;
  font-family: var(--at-mono);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}
.jf__input:focus { outline: none; border-color: var(--at-teal); }
.jf__input--bad, .jf__input--bad:focus { border-color: #B3261E; }

.jf__hint { font-size: 0.82rem; color: var(--at-mute); margin: 0.35rem 0 0; overflow-wrap: anywhere; }
.jf__ferr { font-size: 0.82rem; color: #B3261E; margin: 0.35rem 0 0; }

.jf__rule { height: 1px; background: var(--at-grid-line); }

.jf__ticket {
  padding: 0.85rem 1rem;
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
  border-radius: 8px;
  background: var(--at-bg-paper);
}
.jf__tkey {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--at-navy-deep);
}
.jf__tkey a { color: inherit; }
.jf__status {
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.15rem 0.45rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 4px;
  color: var(--at-mute);
}
.jf__tsum { margin-top: 0.35rem; font-size: 0.98rem; font-weight: 600; color: var(--at-navy-deep); }

.jf__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.jf__row--end { justify-content: flex-end; margin-top: 1rem; }

.jf__go {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  border-radius: 8px;
  border: none;
  background: var(--at-navy-deep);
  color: var(--at-inverse-fg, #fff);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}
.jf__go:disabled { opacity: 0.6; cursor: not-allowed; }

.jf__pick {
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  cursor: pointer;
}
.jf__pick:hover:not(:disabled) { border-color: var(--at-teal); }
.jf__pick:disabled { opacity: 0.6; cursor: not-allowed; }

.jf__note, .jf__error, .jf__ok { margin: 0; font-size: 0.88rem; }
.jf__note { color: var(--at-mute); }
.jf__error { color: #B3261E; }
.jf__error--submit { margin-top: 0.75rem; }
.jf__ok { font-weight: 600; color: var(--at-teal-deep); }

@media (max-width: 30rem) {
  .jf__card { padding: 1.4rem 1.1rem; }
  .jf__inline { flex-direction: column; }
  .jf__go { justify-content: center; width: 100%; }
}
</style>
