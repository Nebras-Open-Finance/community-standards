<script setup lang="ts">
import { reactive, ref, computed, nextTick } from 'vue'

const FIELDS = ['name', 'legalName', 'registrationNumber', 'registeredName', 'address', 'city'] as const
type Field = typeof FIELDS[number]

interface FormState {
  name: string
  legalName: string
  registrationNumber: string
  registeredName: string
  address: string
  city: string
}

const form = reactive<FormState>({
  name: '',
  legalName: '',
  registrationNumber: '',
  registeredName: '',
  address: '',
  city: '',
})

const submitted = ref(false)

function setField(field: Field, value: string | number | undefined) {
  form[field] = (value ?? '') as string
}

const errors = computed<Record<Field, string>>(() => {
  const e = {} as Record<Field, string>
  for (const f of FIELDS) {
    const v = String(form[f] ?? '').trim()
    if (!submitted.value)        { e[f] = '';                   continue }
    if (!v)                      { e[f] = 'Field is required.'; continue }
    e[f] = ''
  }
  return e
})

const hasErrors = computed(() => FIELDS.some((f) => !!errors.value[f]))

function row(label: string, value: string) {
  return `<tr>
    <th style="text-align:left;padding:0.4cm 0.5cm;background:#f0f4f7;font-weight:600;width:40%;border:1px solid #ccc;">${label}</th>
    <td style="padding:0.4cm 0.5cm;border:1px solid #ccc;">${value}</td>
  </tr>`
}

async function submit() {
  submitted.value = true
  await nextTick()
  if (hasErrors.value) return

  const printEl = document.createElement('div')
  printEl.style.cssText = 'position:fixed;inset:0;background:white;z-index:99999;padding:3cm 2.5cm;color:#000;font-family:Arial,sans-serif;'
  printEl.innerHTML = `
    <div style="font-size:11pt;font-weight:bold;color:#001738;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1.5cm;padding-bottom:0.5cm;border-bottom:2px solid #001738;">Nebras Open Finance</div>
    <h1 style="font-size:16pt;color:#001738;margin:0 0 1cm 0;">Organisation Details</h1>
    <table style="width:100%;border-collapse:collapse;font-size:11pt;">
      ${row('Organisation Name',                form.name)}
      ${row('Organisation Legal Name',          form.legalName)}
      ${row('Organisation Registration Number', form.registrationNumber)}
      ${row('Organisation Registered Name',     form.registeredName)}
      ${row('Address Line 1',                   form.address)}
      ${row('City',                             form.city)}
      ${row('Country',                          'UAE')}
      ${row('Organisation Type',                'TPP')}
      ${row('Organisation Category',            'TPP')}
      ${row('Environment',                      'Sandbox')}
    </table>
  `

  const bodyChildren = Array.from(document.body.children) as HTMLElement[]
  bodyChildren.forEach((el) => el.style.setProperty('display', 'none', 'important'))
  document.body.appendChild(printEl)
  window.print()
  document.body.removeChild(printEl)
  bodyChildren.forEach((el) => el.style.removeProperty('display'))
}
</script>

<template>
  <form class="oof" @submit.prevent="submit">

    <div class="oof__field">
      <FormInput
        placeholder="Organisation name"
        name="org_name"
        :input="form.name"
        :error="!!errors.name"
        @output="(v) => setField('name', v.data)"
      />
      <p class="oof__error" aria-live="polite">{{ errors.name }}</p>
    </div>

    <div class="oof__field">
      <FormInput
        placeholder="Organisation legal name"
        name="org_legal_name"
        :input="form.legalName"
        :error="!!errors.legalName"
        @output="(v) => setField('legalName', v.data)"
      />
      <p class="oof__error" aria-live="polite">{{ errors.legalName }}</p>
    </div>

    <div class="oof__row oof__row--two">
      <div class="oof__field">
        <FormInput
          placeholder="Organisation registration number"
          name="org_reg_number"
          :input="form.registrationNumber"
          :error="!!errors.registrationNumber"
          @output="(v) => setField('registrationNumber', v.data)"
        />
        <p class="oof__error" aria-live="polite">{{ errors.registrationNumber }}</p>
      </div>
      <div class="oof__field">
        <FormInput
          placeholder="Organisation registered name"
          name="org_reg_name"
          :input="form.registeredName"
          :error="!!errors.registeredName"
          @output="(v) => setField('registeredName', v.data)"
        />
        <p class="oof__error" aria-live="polite">{{ errors.registeredName }}</p>
      </div>
    </div>

    <div class="oof__field">
      <FormInput
        placeholder="Address line 1"
        name="org_address"
        :input="form.address"
        :error="!!errors.address"
        @output="(v) => setField('address', v.data)"
      />
      <p class="oof__error" aria-live="polite">{{ errors.address }}</p>
    </div>

    <div class="oof__row oof__row--two">
      <div class="oof__field">
        <FormInput
          placeholder="City"
          name="org_city"
          :input="form.city"
          :error="!!errors.city"
          @output="(v) => setField('city', v.data)"
        />
        <p class="oof__error" aria-live="polite">{{ errors.city }}</p>
      </div>
      <div class="oof__field">
        <div class="oof-locked">
          <span class="oof-locked__value">UAE</span>
          <span class="oof-locked__label">Country</span>
          <svg class="oof-locked__lock" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="1" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
      </div>
    </div>

    <div class="oof__row oof__row--two">
      <div class="oof__field">
        <div class="oof-locked">
          <span class="oof-locked__value">TPP</span>
          <span class="oof-locked__label">Organisation type</span>
          <svg class="oof-locked__lock" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="1" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
      </div>
      <div class="oof__field">
        <div class="oof-locked">
          <span class="oof-locked__value">TPP</span>
          <span class="oof-locked__label">Organisation category</span>
          <svg class="oof-locked__lock" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="1" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
      </div>
    </div>

    <div class="oof__row oof__row--two">
      <div class="oof__field">
        <div class="oof-locked">
          <span class="oof-locked__value">Sandbox</span>
          <span class="oof-locked__label">Environment</span>
          <svg class="oof-locked__lock" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="1" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
      </div>
      <div class="oof__field"><!-- spacer to keep environment half-width on wide viewports --></div>
    </div>

    <div class="oof__actions">
      <button type="submit" class="oof-cta">
        <svg
          class="oof-cta__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        Print / Save as PDF
      </button>
    </div>

  </form>
</template>

<style scoped>
.oof {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
  max-width: 42rem;
}

.oof__row {
  display: grid;
  gap: 1rem;
}
.oof__row--two {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.oof__field {
  display: flex;
  flex-direction: column;
}

.oof__error {
  min-height: 1.1rem;
  margin: 0.4rem 0 0;
  padding-left: 0.25rem;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: #B33A3A;
}

/* Locked / read-only field — mirrors FormInput's frame so it sits in the
   same row rhythm, but the floating label is always raised, the value
   is muted, and a small lock glyph marks it as immutable. */
.oof-locked {
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 2.25rem 0 1rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  cursor: not-allowed;
}

.oof-locked__value {
  font-family: var(--at-sans);
  font-size: 1rem;
  color: var(--at-mute-2);
  line-height: 1.4;
}

.oof-locked__label {
  position: absolute;
  top: 0;
  left: 1rem;
  transform: translateY(-50%);
  padding: 0 0.35rem;
  background: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
  pointer-events: none;
}

.oof-locked__lock {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--at-mute);
}

.oof__actions {
  display: flex;
  justify-content: flex-start;
  padding-top: 0.5rem;
}

.oof-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.95rem 1.5rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border: none;
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  transition: background 0.15s ease;
}
.oof-cta:hover:not(:disabled) { background: var(--at-navy); }
.oof-cta:disabled { cursor: not-allowed; opacity: 0.6; }

.oof-cta__icon {
  width: 16px;
  height: 16px;
  flex: none;
}

@media (max-width: 640px) {
  .oof__row--two { grid-template-columns: 1fr; }
}
</style>
