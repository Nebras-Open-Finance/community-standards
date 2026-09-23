<script setup lang="ts">
// Shared shell for the API Hub report pages.
//
// Generate Report and PII Report are the same interaction — pick an environment,
// download a CSV — so they share this panel rather than each carrying a copy of
// the layout. Anything genuinely specific to one report goes in the `options`
// slot.
//
// Layout follows the design mockups; colour and type come from the site's own
// tokens rather than the mockups' raw hex, so these pages look like the rest of
// the site instead of like a pasted-in design.

import { ENV_LABEL, type ReportEnv } from '@/composables/useReports'

const props = defineProps<{
  eyebrow?: string
  title: string
  description: string
  /** Label for the thing being downloaded, e.g. 'Report file'. */
  fileLabel: string
  fileHint?: string
  env: ReportEnv
  busy: boolean
  error: string | null
  done: boolean
  loginUrl: string | null
  doneMessage?: string
}>()

const emit = defineEmits<{
  'update:env': [value: ReportEnv]
  download: []
}>()

const ENVS: ReportEnv[] = ['sandbox', 'prod']

function select(value: ReportEnv): void {
  if (props.env !== value) emit('update:env', value)
}
</script>

<template>
  <div class="rp">
    <div class="rp__eyebrow">{{ eyebrow ?? 'API Hub' }}</div>
    <h1 class="rp__title">{{ title }}</h1>
    <p class="rp__lede">{{ description }}</p>

    <div class="rp__card">
      <div>
        <div class="rp__label">Environment</div>
        <div class="rp__envs">
          <button
            v-for="value in ENVS"
            :key="value"
            type="button"
            class="rp__env"
            :class="{ 'rp__env--on': env === value }"
            :aria-pressed="env === value"
            @click="select(value)"
          >
            <span class="rp__dot" :class="`rp__dot--${value}`" />
            {{ ENV_LABEL[value] }}
          </button>
        </div>
      </div>

      <slot name="options" />

      <div class="rp__rule" />

      <div class="rp__row">
        <div>
          <div class="rp__file">{{ fileLabel }}</div>
          <div class="rp__hint">{{ fileHint ?? `CSV — ${ENV_LABEL[env]} environment` }}</div>
        </div>
        <button type="button" class="rp__go" :disabled="busy" @click="emit('download')">
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 3 V13 M10 13 L6 9 M10 13 L14 9" stroke="currentColor" stroke-width="1.8" fill="none" />
            <path d="M4 15 V16.5 C4 17.3 4.7 18 5.5 18 H14.5 C15.3 18 16 17.3 16 16.5 V15" stroke="currentColor" stroke-width="1.8" fill="none" />
          </svg>
          {{ busy ? 'Generating…' : 'Download CSV' }}
        </button>
      </div>

      <!-- Generating walks the whole directory, so say so rather than appearing hung. -->
      <p v-if="busy" class="rp__note">
        Building the report from the {{ ENV_LABEL[env] }} directory. This can take
        up to a minute.
      </p>

      <p v-else-if="error" class="rp__error">
        {{ error }}
        <a v-if="loginUrl" :href="loginUrl" class="rp__signin">Sign in and try again</a>
      </p>

      <p v-else-if="done" class="rp__done">
        {{ doneMessage ?? `Report generated for ${ENV_LABEL[env]}.` }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.rp {
  max-width: 40rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}

.rp__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 700;
}

.rp__title {
  font-family: var(--at-serif);
  font-size: clamp(1.9rem, 3.4vw, 2.4rem);
  color: var(--at-navy-deep);
  margin: 0.4rem 0 0;
  line-height: 1.15;
}

.rp__lede { margin: 0.5rem 0 0; font-size: 1rem; color: var(--at-mute); }

.rp__card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-navy-deep);
  border-radius: 10px;
  padding: 1.75rem 1.9rem;
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.rp__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  margin-bottom: 0.65rem;
}

.rp__envs { display: flex; gap: 0.75rem; }

.rp__env {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--at-mute);
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.rp__env:hover { border-color: var(--at-teal); }
.rp__env--on {
  border-color: var(--at-navy-deep);
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}

.rp__dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
/* Production is visually distinct on purpose — it is the one with real data. */
.rp__dot--sandbox { background: var(--at-teal); }
.rp__dot--prod { background: var(--at-gold); }

.rp__rule { height: 1px; background: var(--at-grid-line); }

.rp__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.rp__file { font-size: 0.95rem; font-weight: 600; color: var(--at-navy-deep); }
.rp__hint { font-size: 0.82rem; color: var(--at-mute); margin-top: 0.15rem; }

.rp__go {
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
.rp__go:disabled { opacity: 0.6; cursor: progress; }

.rp__note, .rp__done, .rp__error { margin: 0; font-size: 0.88rem; }
.rp__note { color: var(--at-mute); }
.rp__done { color: var(--at-teal-deep); }
.rp__error { color: #B3261E; }
.rp__signin { margin-left: 0.5rem; }

@media (max-width: 30rem) {
  .rp__row { align-items: stretch; }
  .rp__go { justify-content: center; }
}
</style>
