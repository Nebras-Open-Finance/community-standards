<template>
  <div class="form-root">

    <div class="form-section two-col">
      <div class="field-col">
        <FormInput placeholder="First Name" name="admin_first_name" :input="form.firstName"
          :error="!!errors.firstName" @output="v => setField('firstName', v.data)" />
        <div class="field-error" aria-live="polite">{{ errors.firstName }}</div>
      </div>
      <div class="field-col">
        <FormInput placeholder="Last Name" name="admin_last_name" :input="form.lastName"
          :error="!!errors.lastName" @output="v => setField('lastName', v.data)" />
        <div class="field-error" aria-live="polite">{{ errors.lastName }}</div>
      </div>
    </div>

    <div class="form-section">
      <FormInput placeholder="Emirates ID (e.g. 784-1990-1234567-1)" name="admin_emirates_id" :input="form.emiratesId"
        :error="!!errors.emiratesId" @output="v => setField('emiratesId', v.data)" />
      <div class="field-error" aria-live="polite">{{ errors.emiratesId }}</div>
    </div>

    <div class="form-section">
      <FormInput placeholder="Work Email Address" name="admin_email" :input="form.email"
        :error="!!errors.email" @output="v => setField('email', v.data)" />
      <div class="field-error" aria-live="polite">{{ errors.email }}</div>
    </div>

    <div class="form-section">
      <FormInputPhoneNumber placeholder="Mobile Number" country_code="AE" :input="{ country_code: 'AE', phone_number: form.mobile }"
        :error="!!errors.mobile" @output="v => { setField('mobile', v.data); if (v.meta?.countryCallingCode) form.mobileDialCode = '+' + v.meta.countryCallingCode }" />
      <div class="field-error" aria-live="polite">{{ errors.mobile }}</div>
    </div>

    <div class="actions">
      <button class="ed-cta" @click="submit">
        <svg class="ed-cta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        <span class="ed-cta__text">Print / Save as PDF</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref, computed, nextTick } from 'vue'
import FormInput from './FormInput.vue'
import FormInputPhoneNumber from './FormInputPhoneNumber.vue'

const EMIRATES_ID_REGEX = /^784-\d{4}-\d{7}-\d$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FIELDS = ['firstName', 'lastName', 'emiratesId', 'email', 'mobile']

const form = reactive({
  firstName: '', lastName: '', emiratesId: '', email: '', mobile: '', mobileDialCode: '+971'
})

const submitted = ref(false)

function setField(field, value) {
  form[field] = value ?? ''
}

const errors = computed(() => {
  const e = {}
  for (const f of FIELDS) {
    const v = form[f]?.trim()
    if (!submitted.value) { e[f] = ''; continue }
    if (!v) { e[f] = 'Field is required.'; continue }
    if (f === 'emiratesId' && !EMIRATES_ID_REGEX.test(v))
      { e[f] = 'Must match format: 784-YYYY-XXXXXXX-C (e.g. 784-1990-1234567-1)'; continue }
    if (f === 'email' && !EMAIL_REGEX.test(v))
      { e[f] = 'Must be a valid email address.'; continue }
    e[f] = ''
  }
  return e
})

const hasErrors = computed(() => FIELDS.some(f => !!errors.value[f]))

function row(label, value) {
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
    <div style="font-size:11pt;font-weight:bold;color:rgba(17,85,113,1);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1.5cm;padding-bottom:0.5cm;border-bottom:2px solid rgba(17,85,113,1);">Nebras Open Finance</div>
    <h1 style="font-size:16pt;color:rgba(17,85,113,1);margin:0 0 1cm 0;">Primary Organisation Admin Details</h1>
    <table style="width:100%;border-collapse:collapse;font-size:11pt;">
      ${row('First Name', form.firstName)}
      ${row('Last Name', form.lastName)}
      ${row('Emirates ID', form.emiratesId)}
      ${row('Work Email Address', form.email)}
      ${row('Mobile Country Code', form.mobileDialCode)}
      ${row('Mobile Number', form.mobile)}
    </table>
  `

  const bodyChildren = Array.from(document.body.children)
  bodyChildren.forEach(el => el.style.setProperty('display', 'none', 'important'))
  document.body.appendChild(printEl)
  window.print()
  document.body.removeChild(printEl)
  bodyChildren.forEach(el => el.style.removeProperty('display'))
}
</script>

<style scoped>
.form-root {
  margin: 0 auto;
  padding: 16px 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
}

.form-section {
  position: relative;
  width: 100%;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.field-col {
  display: flex;
  flex-direction: column;
}

.field-error {
  min-height: 18px;
  font-size: 12px;
  padding-left: 12px;
  color: #dc2626;
}

.actions {
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
}

/* Editorial CTA — matches .ed-action__primary / .ed-sd-repo__cta */
.ed-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.95rem 1.5rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  transition: background 0.15s ease, transform 0.15s ease;
}

.ed-cta:hover:not(:disabled) {
  background: var(--at-navy);
  transform: translateY(-1px);
}

.ed-cta:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ed-cta__icon {
  width: 18px;
  height: 18px;
  flex: none;
}

.ed-cta__text {
  white-space: nowrap;
}

@media (max-width: 640px) {
  .two-col { grid-template-columns: 1fr; }
}
</style>
