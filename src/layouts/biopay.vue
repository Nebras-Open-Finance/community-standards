<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBiopayAuth } from '@/composables/useBiopayAuth'
import { biopaySidebar } from '@/data/biopay'

// Layout for every page under /biopay. Pages opt in with `layout: biopay` in
// their <route> block. It does two things:
//   1. Password-gates the whole space (see useBiopayAuth — not real security;
//      the password differs from /internal and has its own session key).
//   2. Renders the space's own sidebar.

const { unlocked, unlock } = useBiopayAuth()

// Gate on a mounted flag so SSR and the first client render agree (both show
// the locked form); the unlocked content only appears after hydration. This
// also keeps the prerendered HTML free of any gated content.
const ready = ref(false)
onMounted(() => { ready.value = true })

const password = ref('')
const error = ref(false)

function submit(): void {
  if (unlock(password.value)) {
    error.value = false
    password.value = ''
  } else {
    error.value = true
  }
}
</script>

<template>
  <div class="app-shell">
    <PageHeader />
    <main class="app-shell__main">
      <!-- Locked: password gate -->
      <div v-if="!ready || !unlocked" class="bp-gate">
        <form class="bp-gate__card" @submit.prevent="submit">
          <div class="bp-gate__eyebrow">
            <span class="bp-gate__dash" />
            BioPay
          </div>
          <h1 class="bp-gate__title">This area is password-protected</h1>
          <p class="bp-gate__lede">
            Enter the BioPay password to continue. Access lasts for this browser session
            and is separate from the internal area.
          </p>
          <label class="bp-gate__label" for="bp-pw">Password</label>
          <input
            id="bp-pw"
            v-model="password"
            type="password"
            class="bp-gate__input"
            :class="{ 'is-error': error }"
            autocomplete="off"
            placeholder="••••••••"
          />
          <p v-if="error" class="bp-gate__error">Incorrect password — try again.</p>
          <button type="submit" class="bp-gate__btn">Unlock</button>
        </form>
      </div>

      <!-- Unlocked: sidebar + page content -->
      <template v-else>
        <BioPayDraftBanner />
        <EdHoverSidebar :items="biopaySidebar" title="BioPay" root-href="/biopay/" />
        <router-view />
      </template>
    </main>
    <PageFooter />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-shell__main {
  flex: 1 0 auto;
  padding-top: var(--at-header-height);
}

/* ── Password gate ─────────────────────────────────────────────────────── */
.bp-gate {
  display: flex;
  justify-content: center;
  padding: 5rem 2rem 6rem;
  background: var(--at-bg-cream);
}

.bp-gate__card {
  width: 100%;
  max-width: 26rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2.5rem 2.25rem;
}

.bp-gate__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 1.1rem;
}
.bp-gate__dash { width: 24px; height: 1px; background: currentColor; }

.bp-gate__title {
  font-family: var(--at-serif);
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
}

.bp-gate__lede {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.75rem;
}

.bp-gate__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  margin-bottom: 0.5rem;
}

.bp-gate__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.65rem 0.8rem;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
}
.bp-gate__input:focus {
  outline: 2px solid var(--at-teal);
  outline-offset: 1px;
}
.bp-gate__input.is-error { border-color: #c0392b; }

.bp-gate__error {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: #c0392b;
  margin: 0.5rem 0 0;
}

.bp-gate__btn {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.7rem 1rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border: 0;
  cursor: pointer;
  transition: background 0.16s;
}
.bp-gate__btn:hover { background: var(--at-teal-deep); }
.bp-gate__btn:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }
</style>
