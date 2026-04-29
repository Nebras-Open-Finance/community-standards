<script setup lang="ts">
import { reactive, ref, computed, nextTick } from 'vue'

const EMIRATES_ID_REGEX = /^784-\d{4}-\d{7}-\d$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FIELDS = ['firstName', 'lastName', 'emiratesId', 'email', 'mobile'] as const
type Field = typeof FIELDS[number]

interface FormState {
  firstName: string
  lastName: string
  emiratesId: string
  email: string
  mobile: string
  mobileDialCode: string
}

const form = reactive<FormState>({
  firstName: '',
  lastName: '',
  emiratesId: '',
  email: '',
  mobile: '',
  mobileDialCode: '+971',
})

const submitted = ref(false)

function setField(field: Field, value: string | number | undefined) {
  form[field] = (value ?? '') as string
}

function onMobileOutput(payload: { data: string | number | undefined; meta: Record<string, unknown> }) {
  setField('mobile', payload.data)
  const cc = payload.meta?.['countryCallingCode']
  if (typeof cc === 'string') form.mobileDialCode = '+' + cc
}

const errors = computed<Record<Field, string>>(() => {
  const e = {} as Record<Field, string>
  for (const f of FIELDS) {
    const v = String(form[f] ?? '').trim()
    if (!submitted.value) { e[f] = ''; continue }
    if (!v) { e[f] = 'Field is required.'; continue }
    if (f === 'emiratesId' && !EMIRATES_ID_REGEX.test(v)) {
      e[f] = 'Must match format: 784-YYYY-XXXXXXX-C (e.g. 784-1990-1234567-1)'
      continue
    }
    if (f === 'email' && !EMAIL_REGEX.test(v)) {
      e[f] = 'Must be a valid email address.'
      continue
    }
    e[f] = ''
  }
  return e
})

const hasErrors = computed(() => FIELDS.some(f => !!errors.value[f]))

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
    <h1 style="font-size:16pt;color:#001738;margin:0 0 1cm 0;">Primary Organisation Admin Details</h1>
    <table style="width:100%;border-collapse:collapse;font-size:11pt;">
      ${row('First Name', form.firstName)}
      ${row('Last Name', form.lastName)}
      ${row('Emirates ID', form.emiratesId)}
      ${row('Work Email Address', form.email)}
      ${row('Mobile Country Code', form.mobileDialCode)}
      ${row('Mobile Number', form.mobile)}
    </table>
  `

  const bodyChildren = Array.from(document.body.children) as HTMLElement[]
  bodyChildren.forEach(el => el.style.setProperty('display', 'none', 'important'))
  document.body.appendChild(printEl)
  window.print()
  document.body.removeChild(printEl)
  bodyChildren.forEach(el => el.style.removeProperty('display'))
}
</script>

<template>
  <form class="oaf" @submit.prevent="submit">

    <div class="oaf__row oaf__row--two">
      <div class="oaf__field">
        <FormInput
          placeholder="First name"
          name="admin_first_name"
          :input="form.firstName"
          :error="!!errors.firstName"
          @output="(v) => setField('firstName', v.data)"
        />
        <p class="oaf__error" aria-live="polite">{{ errors.firstName }}</p>
      </div>

      <div class="oaf__field">
        <FormInput
          placeholder="Last name"
          name="admin_last_name"
          :input="form.lastName"
          :error="!!errors.lastName"
          @output="(v) => setField('lastName', v.data)"
        />
        <p class="oaf__error" aria-live="polite">{{ errors.lastName }}</p>
      </div>
    </div>

    <div class="oaf__field">
      <FormInput
        placeholder="Emirates ID (e.g. 784-1990-1234567-1)"
        name="admin_emirates_id"
        :input="form.emiratesId"
        :error="!!errors.emiratesId"
        @output="(v) => setField('emiratesId', v.data)"
      />
      <p class="oaf__error" aria-live="polite">{{ errors.emiratesId }}</p>
    </div>

    <div class="oaf__field">
      <FormInput
        placeholder="Work email address"
        name="admin_email"
        type="email"
        :input="form.email"
        :error="!!errors.email"
        @output="(v) => setField('email', v.data)"
      />
      <p class="oaf__error" aria-live="polite">{{ errors.email }}</p>
    </div>

    <div class="oaf__field">
      <FormInputPhoneNumber
        placeholder="Mobile number"
        country-code="AE"
        :input="{ country_code: 'AE', phone_number: form.mobile }"
        :error="!!errors.mobile"
        @output="onMobileOutput"
      />
      <p class="oaf__error" aria-live="polite">{{ errors.mobile }}</p>
    </div>

    <div class="oaf__actions">
      <button type="submit" class="oaf-cta">
        <svg
          class="oaf-cta__icon"
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
.oaf {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
  max-width: 36rem;
}

.oaf__row {
  display: grid;
  gap: 1rem;
}
.oaf__row--two {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.oaf__field {
  display: flex;
  flex-direction: column;
}

.oaf__error {
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

.oaf__actions {
  display: flex;
  justify-content: flex-start;
  padding-top: 0.5rem;
}

.oaf-cta {
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
.oaf-cta:hover:not(:disabled) {
  background: var(--at-navy);
}
.oaf-cta:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.oaf-cta__icon {
  width: 16px;
  height: 16px;
  flex: none;
}

@media (max-width: 640px) {
  .oaf__row--two { grid-template-columns: 1fr; }
}
</style>
