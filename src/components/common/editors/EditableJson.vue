<script setup lang="ts">
import { ref, watch, watchEffect, nextTick, computed } from 'vue'
import YAML from 'yaml'
import { useSharedState } from '../composables/useSharedState'

interface Schema {
  // OpenAPI 3.x schema, partial — we only touch the fields we resolve.
  $ref?: string
  type?: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean'
  properties?: Record<string, Schema>
  required?: string[]
  items?: Schema
  allOf?: Schema[]
  anyOf?: Schema[]
  oneOf?: Schema[]
  enum?: unknown[]
  pattern?: string
  format?: string
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  minItems?: number
  maxItems?: number
  description?: string
  additionalProperties?: boolean | Schema
}

interface Spec {
  components?: { schemas?: Record<string, Schema> }
}

const props = withDefaults(defineProps<{
  spec: string
  schemaName?: string
  initialData?: Record<string, unknown>
  excludedFields?: string[]
  customValidator?: (value: unknown) => string | null
  stateField?: string
  label?: string
  description?: string
  endpointHref?: string
  endpointLabel?: string
}>(), {
  schemaName: 'AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties',
  initialData: () => ({}),
  excludedFields: () => [],
  customValidator: () => null,
  stateField: 'value',
  label: 'Editable JSON',
  description: '',
  endpointHref: '',
  endpointLabel: 'View endpoint',
})

const { updateField } = useSharedState()

const spec = ref<Spec | null>(null)
const rootSchema = ref<Schema | null>(null)
const form = ref<unknown>({})
const jsonInput = ref('')

const toastMessage = ref('')
const toastShowing = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null
function addError(msg: string) {
  toastMessage.value = msg
  toastShowing.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastShowing.value = false }, 2400)
}

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null
async function copyJson() {
  try {
    await navigator.clipboard.writeText(jsonInput.value)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 1800)
  } catch {
    addError('Copy failed — clipboard access denied')
  }
}

const lineCount = computed(() => jsonInput.value.split('\n').length)
const charCount = computed(() => jsonInput.value.length)

function resolveSchema(schema: Schema | undefined): Schema | undefined {
  if (!schema) return schema
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop() ?? ''
    const refSchema = spec.value?.components?.schemas?.[refName]
    return resolveSchema(refSchema)
  }
  return schema
}

function fullResolveSchema(schema: Schema | undefined): Schema {
  let resolved = resolveSchema(schema) ?? {}
  resolved = JSON.parse(JSON.stringify(resolved)) as Schema

  if (resolved.allOf) {
    const merged: Schema = { type: 'object', properties: {}, required: [] }
    if (resolved.description) merged.description = resolved.description
    resolved.allOf.forEach((sub) => {
      const subMerged = fullResolveSchema(sub)
      Object.assign(merged.properties!, subMerged.properties)
      if (subMerged.required) merged.required = [...new Set([...(merged.required ?? []), ...subMerged.required])]
    })
    return merged
  }
  if (resolved.anyOf) resolved.anyOf = resolved.anyOf.map(fullResolveSchema)
  if (resolved.oneOf) resolved.oneOf = resolved.oneOf.map(fullResolveSchema)
  if (resolved.properties) {
    for (const k of Object.keys(resolved.properties)) {
      resolved.properties[k] = fullResolveSchema(resolved.properties[k])
    }
  }
  if (resolved.items) resolved.items = fullResolveSchema(resolved.items)
  return resolved
}

function removeProperties(schema: Schema, paths: string[]) {
  paths.forEach((pathStr) => {
    const parts = pathStr.split('.')
    let current: Schema = schema
    for (let i = 0; i < parts.length - 1; i++) {
      if (current.type !== 'object' || !current.properties) {
        addError(`Cannot traverse non-object at ${parts.slice(0, i + 1).join('.')}`)
        return
      }
      const next = current.properties[parts[i]!]
      if (!next) return
      current = next
    }
    if (current.type !== 'object' || !current.properties) {
      addError(`Cannot remove from non-object at ${pathStr}`)
      return
    }
    const last = parts[parts.length - 1]!
    delete current.properties[last]
    if (current.required) current.required = current.required.filter((r) => r !== last)
  })
}

function initFormValue(schema: Schema): unknown {
  const resolved = schema
  if (resolved.allOf) {
    const merged: Record<string, unknown> = {}
    resolved.allOf.forEach((sub) => Object.assign(merged, initFormValue(sub) as object))
    return merged
  }
  if (resolved.anyOf || resolved.oneOf) {
    const variants = resolved.anyOf || resolved.oneOf || []
    return variants.length > 0 ? initFormValue(variants[0]!) : null
  }
  if (resolved.type === 'object') {
    const obj: Record<string, unknown> = {}
    const properties = resolved.properties || {}
    const required = new Set(resolved.required || [])
    for (const [key, sub] of Object.entries(properties)) {
      if (required.has(key)) obj[key] = initFormValue(sub)
    }
    return obj
  }
  if (resolved.type === 'array') return []
  if (resolved.enum) return resolved.enum[0] ?? ''
  if (resolved.type === 'boolean') return false
  if (resolved.type === 'number' || resolved.type === 'integer') return 0
  return ''
}

function deepMerge(target: unknown, source: unknown): unknown {
  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) return source
  if (Array.isArray(target) && Array.isArray(source)) return source
  const merged: Record<string, unknown> = { ...(target as Record<string, unknown>) }
  for (const key of Object.keys(source as object)) {
    const s = (source as Record<string, unknown>)[key]
    if (key in merged) merged[key] = deepMerge(merged[key], s)
    else merged[key] = s
  }
  return merged
}

function validateAgainstSchema(value: unknown, schema: Schema, path = ''): string | null {
  const resolved = schema
  if (resolved.allOf) {
    for (const sub of resolved.allOf) {
      const err = validateAgainstSchema(value, sub, path)
      if (err) return err
    }
    return null
  }
  if (resolved.anyOf) {
    for (const sub of resolved.anyOf) if (!validateAgainstSchema(value, sub, path)) return null
    return `Doesn't match any schema at ${path}`
  }
  if (resolved.oneOf) {
    let matches = 0
    for (const sub of resolved.oneOf) if (!validateAgainstSchema(value, sub, path)) matches++
    if (matches === 0) return `Doesn't match any schema at ${path}`
    if (matches > 1) return `Matches more than one schema at ${path}`
    return null
  }
  if (resolved.type === 'object') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return `Expected object at ${path}`
    const properties = resolved.properties || {}
    for (const req of resolved.required || []) if (!(req in (value as object))) return `Missing required field: ${req} at ${path}`
    for (const [key, val] of Object.entries(value as object)) {
      if (!(key in properties) && resolved.additionalProperties === false) return `Unexpected field: ${key} at ${path}`
      if (key in properties) {
        const err = validateAgainstSchema(val, properties[key]!, `${path ? path + '.' : ''}${key}`)
        if (err) return err
      }
    }
    return null
  }
  if (resolved.type === 'array') {
    if (!Array.isArray(value)) return `Expected array at ${path}`
    for (let i = 0; i < value.length; i++) {
      const err = validateAgainstSchema(value[i], resolved.items!, `${path}[${i}]`)
      if (err) return err
    }
    if (resolved.minItems && value.length < resolved.minItems) return `Array too short (min ${resolved.minItems}) at ${path}`
    if (resolved.maxItems && value.length > resolved.maxItems) return `Array too long (max ${resolved.maxItems}) at ${path}`
    return null
  }
  if (resolved.type === 'string') {
    if (typeof value !== 'string') return `Expected string at ${path}`
    if (resolved.enum && !resolved.enum.includes(value)) return `Invalid enum value: ${value} at ${path}`
    if (resolved.pattern && !new RegExp(resolved.pattern).test(value)) return `Does not match pattern at ${path}`
    if (resolved.minLength && value.length < resolved.minLength) return `String too short at ${path}`
    if (resolved.maxLength && value.length > resolved.maxLength) return `String too long at ${path}`
    if (resolved.format === 'uuid' && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) return `Invalid UUID at ${path}`
    if (resolved.format === 'date-time' && isNaN(Date.parse(value))) return `Invalid date-time at ${path}`
    if (resolved.format === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return `Invalid date at ${path}`
    return null
  }
  if (resolved.type === 'number' || resolved.type === 'integer') {
    if (typeof value !== 'number') return `Expected ${resolved.type} at ${path}`
    if (resolved.type === 'integer' && !Number.isInteger(value)) return `Expected integer at ${path}`
    if (resolved.minimum !== undefined && value < resolved.minimum) return `Value too small at ${path}`
    if (resolved.maximum !== undefined && value > resolved.maximum) return `Value too large at ${path}`
    return null
  }
  if (resolved.type === 'boolean') {
    if (typeof value !== 'boolean') return `Expected boolean at ${path}`
    return null
  }
  return `Unknown schema type at ${path}`
}

async function loadSpec() {
  try {
    const response = await fetch(props.spec)
    const text = await response.text()
    spec.value = YAML.parse(text) as Spec
    const maybeSchema = spec.value?.components?.schemas?.[props.schemaName]
    if (!maybeSchema) {
      addError(`Schema ${props.schemaName} not found`)
      return
    }
    rootSchema.value = fullResolveSchema(maybeSchema)
    removeProperties(rootSchema.value, props.excludedFields)
    const defaults = initFormValue(rootSchema.value)
    const merged = deepMerge(defaults, props.initialData)
    const validationError = validateAgainstSchema(merged, rootSchema.value)
    const customError = props.customValidator(merged)
    if (validationError || customError) {
      addError(`Initial data invalid: ${validationError || customError}. Using defaults.`)
      form.value = defaults
    } else {
      form.value = merged
    }
  } catch (err) {
    addError(String(err))
  }
}

let suppressNextStateUpdate = false

function updateFromJson() {
  try {
    const newObj = JSON.parse(jsonInput.value)
    const validationError = rootSchema.value ? validateAgainstSchema(newObj, rootSchema.value) : null
    const customError = props.customValidator(newObj)
    if (validationError || customError) {
      addError(`Validation: ${validationError || customError}`)
      suppressNextStateUpdate = true
      jsonInput.value = JSON.stringify(form.value, null, 2)
    } else {
      form.value = newObj
      nextTick(() => updateField(props.stateField, JSON.stringify(form.value)))
    }
  } catch {
    addError('Invalid JSON — reverting changes.')
    suppressNextStateUpdate = true
    jsonInput.value = JSON.stringify(form.value, null, 2)
  }
}

watch(form, () => { jsonInput.value = JSON.stringify(form.value, null, 2) }, { deep: true })

watch(jsonInput, (newValue) => {
  if (suppressNextStateUpdate) { suppressNextStateUpdate = false; return }
  try { updateField(props.stateField, newValue) } catch { /* ignore mid-edit invalid JSON */ }
})

watchEffect(() => { loadSpec() })
</script>

<template>
  <section class="ej">
    <header class="ej__header">
      <div class="ej__header-left">
        <span class="ej__eyebrow">
          <span class="ej__eyebrow-dash" />
          {{ label }}
        </span>
        <span v-if="description" class="ej__description">{{ description }}</span>
      </div>
      <div class="ej__header-right">
        <span class="ej__schema">{{ schemaName }}</span>
        <a
          v-if="endpointHref"
          :href="endpointHref"
          class="ej__endpoint"
        >{{ endpointLabel }} ↗</a>
      </div>
    </header>

    <div class="ej__canvas">
      <textarea
        v-model="jsonInput"
        spellcheck="false"
        class="ej__textarea"
        @blur="updateFromJson"
      />

      <Transition name="ej-toast">
        <div v-if="toastShowing" class="ej__toast" role="status">{{ toastMessage }}</div>
      </Transition>
    </div>

    <footer class="ej__footer">
      <span class="ej__stat">{{ lineCount }} lines</span>
      <span class="ej__stat">{{ charCount }} chars</span>
      <span class="ej__hint">Edits commit on blur — invalid JSON reverts.</span>
      <button
        type="button"
        class="ej__copy"
        :class="{ 'ej__copy--ok': copied }"
        :title="copied ? 'Copied' : 'Copy JSON'"
        :aria-label="copied ? 'JSON copied to clipboard' : 'Copy JSON to clipboard'"
        @click="copyJson"
      >
        <svg
          v-if="!copied"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg
          v-else
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span class="ej__copy-label">{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </footer>
  </section>
</template>

<style scoped>
.ej {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  margin: 1.5rem 0;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.ej__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.ej__header-left,
.ej__header-right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  min-width: 0;
}
.ej__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
}
.ej__eyebrow-dash { width: 18px; height: 1px; background: currentColor; }
.ej__description {
  font-family: var(--at-sans);
  font-size: 0.78rem;
  color: var(--at-mute-2);
}
.ej__schema {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-mute-2);
  word-break: break-all;
}
.ej__endpoint {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  white-space: nowrap;
}
.ej__endpoint:hover { color: var(--at-navy-deep); }

.ej__canvas {
  position: relative;
}

.ej__textarea {
  display: block;
  width: 100%;
  min-height: 320px;
  padding: 1rem 1.15rem;
  background: var(--at-bg-paper);
  border: none;
  outline: none;
  resize: vertical;
  font-family: var(--at-mono);
  font-size: 0.78rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
  tab-size: 2;
  box-sizing: border-box;
  transition: box-shadow 0.15s ease;
}
.ej__textarea:focus {
  box-shadow: inset 0 -2px 0 var(--at-teal);
}

.ej__toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--at-surface);
  border: 1px solid #B33A3A;
  border-left-width: 3px;
  padding: 0.7rem 1.1rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: #B33A3A;
  box-shadow: 0 12px 32px rgba(0, 23, 56, 0.18);
  pointer-events: none;
  z-index: 5;
  white-space: nowrap;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ej-toast-enter-from,
.ej-toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -45%);
}
.ej-toast-enter-active,
.ej-toast-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.ej__copy {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}
.ej__copy:hover {
  color: var(--at-navy-deep);
  border-color: var(--at-navy-deep);
}
.ej__copy--ok,
.ej__copy--ok:hover {
  color: var(--at-teal-deep);
  border-color: var(--at-teal-deep);
  background: color-mix(in srgb, var(--at-teal) 8%, var(--at-bg-cream));
}
.ej__copy-label { line-height: 1; }

.ej__footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.65rem 1.1rem;
  border-top: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
  flex-wrap: wrap;
}
.ej__stat {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
}
.ej__hint {
  font-family: var(--at-sans);
  font-size: 0.78rem;
  color: var(--at-mute);
  margin-left: auto;
}
</style>

<!--
  /tech/** override — match the requirements-page table-header style:
  navy-deep background with cream text on the EditableJson header bar.
  Unscoped because the layout root (.is-tech) is outside this component.
-->
<style>
.is-tech .ej__header {
  background: var(--at-navy-deep);
  border-bottom: 0;
}
.is-tech .ej__eyebrow {
  color: var(--at-bg-cream);
}
.is-tech .ej__description,
.is-tech .ej__schema {
  color: color-mix(in srgb, var(--at-bg-cream) 75%, transparent);
}
.is-tech .ej__endpoint {
  color: var(--at-bg-cream);
  border-bottom-color: color-mix(in srgb, var(--at-bg-cream) 60%, transparent);
}
.is-tech .ej__endpoint:hover {
  color: color-mix(in srgb, var(--at-bg-cream) 80%, var(--at-teal));
  border-bottom-color: currentColor;
}
</style>
