<template>
  <div class="form-root">

    <div class="form-section">
      <FormInput placeholder="Organisation Name" name="org_name" :input="form.name"
        :error="!!errors.name" @output="v => setField('name', v.data)" />
      <div class="field-error" aria-live="polite">{{ errors.name }}</div>
    </div>

    <div class="form-section">
      <FormInput placeholder="Organisation Legal Name" name="org_legal_name" :input="form.legalName"
        :error="!!errors.legalName" @output="v => setField('legalName', v.data)" />
      <div class="field-error" aria-live="polite">{{ errors.legalName }}</div>
    </div>

    <div class="form-section two-col">
      <div class="field-col">
        <FormInput placeholder="Organisation Registration Number" name="org_reg_number" :input="form.registrationNumber"
          :error="!!errors.registrationNumber" @output="v => setField('registrationNumber', v.data)" />
        <div class="field-error" aria-live="polite">{{ errors.registrationNumber }}</div>
      </div>
      <div class="field-col">
        <FormInput placeholder="Organisation Registered Name" name="org_reg_name" :input="form.registeredName"
          :error="!!errors.registeredName" @output="v => setField('registeredName', v.data)" />
        <div class="field-error" aria-live="polite">{{ errors.registeredName }}</div>
      </div>
    </div>

    <div class="form-section">
      <FormInput placeholder="Address Line 1" name="org_address" :input="form.address"
        :error="!!errors.address" @output="v => setField('address', v.data)" />
      <div class="field-error" aria-live="polite">{{ errors.address }}</div>
    </div>

    <div class="form-section two-col">
      <div class="field-col">
        <FormInput placeholder="City" name="org_city" :input="form.city"
          :error="!!errors.city" @output="v => setField('city', v.data)" />
        <div class="field-error" aria-live="polite">{{ errors.city }}</div>
      </div>
      <div class="field-col locked-field">
        <div class="locked-input">UAE</div>
        <div class="locked-label">Country</div>
      </div>
    </div>

    <div class="form-section two-col">
      <div class="field-col locked-field">
        <div class="locked-input">TPP</div>
        <div class="locked-label">Organisation Type</div>
      </div>
      <div class="field-col locked-field">
        <div class="locked-input">TPP</div>
        <div class="locked-label">Organisation Category</div>
      </div>
    </div>

    <div class="form-section">
      <div class="locked-field locked-field--inline">
        <div class="locked-input">Sandbox</div>
        <div class="locked-label">Environment</div>
      </div>
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

const FIELDS = ['name', 'legalName', 'registrationNumber', 'registeredName', 'address', 'city']

const form = reactive({
  name: '', legalName: '', registrationNumber: '',
  registeredName: '', address: '', city: ''
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
    <h1 style="font-size:16pt;color:rgba(17,85,113,1);margin:0 0 1cm 0;">Organisation Details</h1>
    <table style="width:100%;border-collapse:collapse;font-size:11pt;">
      ${row('Organisation Name', form.name)}
      ${row('Organisation Legal Name', form.legalName)}
      ${row('Organisation Registration Number', form.registrationNumber)}
      ${row('Organisation Registered Name', form.registeredName)}
      ${row('Address Line 1', form.address)}
      ${row('City', form.city)}
      ${row('Country', 'UAE')}
      ${row('Organisation Type', 'TPP')}
      ${row('Organisation Category', 'TPP')}
      ${row('Environment', 'Sandbox')}
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

.locked-field {
  position: relative;
}

.locked-input {
  font-size: 1rem;
  line-height: 1.75rem;
  border: 1px solid var(--at-navy);
  box-shadow: 0 0 4px var(--at-navy);
  padding: 17px 17px 17px 24px;
  border-radius: 4px;
  background: rgba(224, 224, 224, 1);
  color: var(--at-navy);
  cursor: not-allowed;
}

.locked-label {
  font-size: 12px;
  color: var(--at-navy);
  margin-top: 4px;
  padding-left: 4px;
}

.locked-field--inline {
  max-width: calc(50% - 7px);
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
  .locked-field--inline { max-width: 100%; }
}
</style>
