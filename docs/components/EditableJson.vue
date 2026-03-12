<script setup>
import { reactive, ref, watchEffect, watch, nextTick } from 'vue'
import YAML from 'yaml'
import { useSharedState } from './Composables/useSharedState.ts'

const { updateField } = useSharedState()

const props = defineProps({
  spec: { type: String, required: true },
  schemaName: {
    type: String,
    default:
      'AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties'
  },
  initialData: {
    type: Object,
    default: () => ({})
  },
  excludedFields: {
    type: Array,
    default: () => []
  },
  customValidator: {
    type: Function,
   default: (value) => null
  },
  stateField: {
    type: String, 
    default: 'value',
  }
})

const spec = ref(null)
const rootSchema = ref(null)
const form = ref({})
const errors = ref([])
const jsonInput = ref('')

const toastMessage = ref('')
const toastShowing = ref(false)
let toastTimer = null
function addError(msg) {
  errors.value.push(msg)
  toastMessage.value = msg
  toastShowing.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastShowing.value = false }, 2000)
}

/** Resolve $ref schemas recursively */
function resolveSchema(schema) {
  if (!schema) return schema
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop()
    const refSchema = spec.value?.components?.schemas?.[refName]
    return resolveSchema(refSchema) // Recurse to handle nested $refs
  }
  return schema
}

/** Fully resolve schema by merging allOf, resolving refs, etc. Returns a cloned, merged schema */
function fullResolveSchema(schema) {
  let resolved = resolveSchema(schema)
  resolved = JSON.parse(JSON.stringify(resolved)) // Deep clone to avoid modifying original spec

  if (resolved.allOf) {
    let merged = { type: 'object', properties: {}, required: [] }
    if (resolved.description) merged.description = resolved.description
    resolved.allOf.forEach(sub => {
      let subMerged = fullResolveSchema(sub)
      Object.assign(merged.properties, subMerged.properties)
      if (subMerged.required) {
        merged.required = [...new Set([...merged.required, ...subMerged.required])]
      }
    })
    return merged
  }

  if (resolved.anyOf) {
    resolved.anyOf = resolved.anyOf.map(fullResolveSchema)
  }

  if (resolved.oneOf) {
    resolved.oneOf = resolved.oneOf.map(fullResolveSchema)
  }

  if (resolved.properties) {
    for (let key in resolved.properties) {
      resolved.properties[key] = fullResolveSchema(resolved.properties[key])
    }
  }

  if (resolved.items) {
    resolved.items = fullResolveSchema(resolved.items)
  }

  return resolved
}

/** Remove properties from the schema based on dot-separated paths (e.g., 'consent.PersonalIdentifiableInformation') */
function removeProperties(schema, paths) {
  paths.forEach(pathStr => {
    const parts = pathStr.split('.')
    let current = schema
    for (let i = 0; i < parts.length - 1; i++) {
      if (current.type !== 'object' || !current.properties) {
        addError(`Cannot traverse non-object at ${parts.slice(0, i + 1).join('.')}`)
        return
      }
      current = current.properties[parts[i]]
    }
    if (current.type !== 'object' || !current.properties) {
      addError(`Cannot remove from non-object at ${pathStr}`)
      return
    }
    const last = parts[parts.length - 1]
    delete current.properties[last]
    if (current.required) {
      current.required = current.required.filter(r => r !== last)
    }
  })
}

/** Initialize form values based on schema (handles allOf, anyOf, oneOf). Only initializes required fields. */
function initFormValue(schema) {
  let resolved = schema // Already fully resolved

  if (resolved.allOf) {
    let mergedValue = {}
    resolved.allOf.forEach(sub => {
      const subValue = initFormValue(sub)
      Object.assign(mergedValue, subValue) // Merge values from each subschema
    })
    return mergedValue
  }

  if (resolved.anyOf || resolved.oneOf) {
    const variants = resolved.anyOf || resolved.oneOf
    if (variants.length > 0) {
      return initFormValue(variants[0]) // Pick first for initialization
    }
    return null
  }

  if (resolved.type === 'object') {
    const obj = {}
    const props = resolved.properties || {}
    const required = new Set(resolved.required || [])
    for (const [key, subschema] of Object.entries(props)) {
      if (required.has(key)) {
        obj[key] = initFormValue(subschema)
      }
    }
    return obj
  }

  if (resolved.type === 'array') {
    return [] // Empty array for required arrays
  }
  if (resolved.enum) return resolved.enum[0] ?? ''
  if (resolved.type === 'boolean') return false
  if (resolved.type === 'number' || resolved.type === 'integer') return 0

  return ''
}

/** Deep merge two objects (overrides defaults with initials, but only for existing keys in target) */
function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
    return source // Replace primitives or mismatched types with source
  }

  if (Array.isArray(target) && Array.isArray(source)) {
    return source // Replace arrays entirely to avoid length mismatches
  }

  const merged = { ...target }
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (key in merged) { // Only merge if key exists in target
        merged[key] = deepMerge(merged[key], source[key])
      } else {
        // Add new keys from source (for optional fields provided in initialData)
        merged[key] = source[key]
      }
    }
  }
  return merged
}

/** Validate value against schema (recursive, handles allOf, anyOf, oneOf) */
function validateAgainstSchema(value, schema, path = '') {
  let resolved = schema // Already fully resolved

  if (resolved.allOf) {
    for (let sub of resolved.allOf) {
      const err = validateAgainstSchema(value, sub, path)
      if (err) return err
    }
    return null
  }

  if (resolved.anyOf) {
    let hasMatch = false
    let errs = []
    for (let sub of resolved.anyOf) {
      const err = validateAgainstSchema(value, sub, path)
      if (!err) {
        hasMatch = true
        break
      } else {
        errs.push(err)
      }
    }
    if (!hasMatch) return `Doesn't match any schema at ${path}: ${errs.join(', ')}`
    return null
  }

  if (resolved.oneOf) {
    let matches = 0
    let errs = []
    for (let sub of resolved.oneOf) {
      const err = validateAgainstSchema(value, sub, path)
      if (!err) {
        matches++
      } else {
        errs.push(err)
      }
    }
    if (matches === 0) return `Doesn't match any schema at ${path}`
    if (matches > 1) return `Matches more than one schema at ${path}`
    return null
  }

  if (resolved.type === 'object') {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return `Expected object at ${path}`
    const props = resolved.properties || {}
    const required = resolved.required || []
    for (const req of required) {
      if (!(req in value)) return `Missing required field: ${req} at ${path}`
    }
    for (const [key, val] of Object.entries(value)) {
      if (!(key in props) && resolved.additionalProperties === false) return `Unexpected field: ${key} at ${path}`
      if (key in props) {
        const err = validateAgainstSchema(val, props[key], `${path ? path + '.' : ''}${key}`)
        if (err) return err
      }
    }
    return null
  }

  if (resolved.type === 'array') {
    if (!Array.isArray(value)) return `Expected array at ${path}`
    for (let i = 0; i < value.length; i++) {
      const err = validateAgainstSchema(value[i], resolved.items, `${path}[${i}]`)
      if (err) return err
    }
    if (resolved.minItems && value.length < resolved.minItems) return `Array too short (min ${resolved.minItems}) at ${path}`
    if (resolved.maxItems && value.length > resolved.maxItems) return `Array too long (max ${resolved.maxItems}) at ${path}`
    return null
  }

  if (resolved.type === 'string') {
    if (typeof value !== 'string') return `Expected string at ${path}`
    if (resolved.enum && !resolved.enum.includes(value)) return `Invalid enum value: ${value} at ${path}`
    if (resolved.pattern && !new RegExp(resolved.pattern).test(value)) return `Does not match pattern: ${resolved.pattern} at ${path}`
    if (resolved.minLength && value.length < resolved.minLength) return `String too short (min ${resolved.minLength}) at ${path}`
    if (resolved.maxLength && value.length > resolved.maxLength) return `String too long (max ${resolved.maxLength}) at ${path}`
    if (resolved.format) {
      if (resolved.format === 'uuid') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        if (!uuidRegex.test(value)) return `Invalid UUID format at ${path}`
      } else if (resolved.format === 'date-time') {
        if (isNaN(Date.parse(value))) return `Invalid date-time format (expected ISO 8601) at ${path}`
      } else if (resolved.format === 'date') {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(value) || isNaN(Date.parse(value + 'T00:00:00Z'))) return `Invalid date format (expected YYYY-MM-DD) at ${path}`
      }
      // Add more formats if needed
    }
    return null
  }

  if (resolved.type === 'number' || resolved.type === 'integer') {
    if (typeof value !== 'number') return `Expected ${resolved.type} at ${path}`
    if (resolved.type === 'integer' && !Number.isInteger(value)) return `Expected integer at ${path}`
    if (resolved.minimum && value < resolved.minimum) return `Value too small (min ${resolved.minimum}) at ${path}`
    if (resolved.maximum && value > resolved.maximum) return `Value too large (max ${resolved.maximum}) at ${path}`
    return null
  }

  if (resolved.type === 'boolean') {
    if (typeof value !== 'boolean') return `Expected boolean at ${path}`
    return null
  }

  return `Unknown schema type at ${path}`
}

/** Load YAML spec and initialize form */
async function loadSpec() {
  try {
    const response = await fetch(props.spec)
    const text = await response.text()
    spec.value = YAML.parse(text)

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
    const customError = props.customValidator(merged) // Use the prop function
    if (validationError || customError) {
      addError(`Initial data validation error: ${validationError || customError}. Using defaults.`)
      form.value = defaults
    } else {
      form.value = merged
    }
  } catch (err) {
    addError(String(err))
  }
}

let suppressNextStateUpdate = false

/** Update form from edited JSON */
function updateFromJson() {
  try {
    const newObj = JSON.parse(jsonInput.value)
    const validationError = validateAgainstSchema(newObj, rootSchema.value)
    const customError = props.customValidator(newObj) // Use the prop function
    if (validationError || customError) {
      addError(`Validation error: ${validationError || customError}`)
      suppressNextStateUpdate = true
      jsonInput.value = JSON.stringify(form.value, null, 2)
    } else {
      form.value = newObj
      // Defer updateField to the next tick so Vue has finished flushing reactive updates
      // from form.value = newObj before we replace sharedState.value. Calling it synchronously
      // here can trigger a sharedState replacement mid-flush, causing a blank-screen rendering
      // error. The watch(form) → watch(jsonInput) cascade alone is unreliable because:
      //   (a) suppressNextStateUpdate from a prior revert cycle silently skips updateField, or
      //   (b) JSON.stringify(newObj) === jsonInput.value means Vue won't fire watch(jsonInput).
      nextTick(() => {
        updateField(props.stateField, JSON.stringify(form.value))
      })
    }
  } catch (e) {
    addError('Invalid JSON—reverting changes.')
    suppressNextStateUpdate = true
    jsonInput.value = JSON.stringify(form.value, null, 2)
  }
}

// Sync JSON input when form changes
watch(form, () => {
  jsonInput.value = JSON.stringify(form.value, null, 2)
}, { deep: true })

// Inject jsonInput to sharedState (skip when jsonInput is being reverted by validation failure)
watch(jsonInput, (newValue) => {
  if (suppressNextStateUpdate) {
    suppressNextStateUpdate = false
    return
  }
  try {
    updateField(props.stateField, newValue)
  } catch (e) {
    // Invalid JSON during mid-edit typing, skip state update
  }
})

// Load spec initially
watchEffect(() => {
  loadSpec()
})


</script>

<template>
  <div class="editor" style="position: relative;">
    <div class="ej-toast" :class="{ 'ej-toast--visible': toastShowing }">{{ toastMessage }}</div>

    <!-- Editable JSON (updates on blur) -->
    <textarea
      v-model="jsonInput"
      @blur="updateFromJson"
      style="width: 100%; min-height: 300px; font-size: 12px; line-height: 15px; background: #f4f4f4; padding: 1rem; font-family: monospace; overflow-x: auto;"
    ></textarea>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}
.ej-toast {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(185, 28, 28, 0.92);
  color: #fff;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  pointer-events: none;
  z-index: 9999;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.ej-toast--visible {
  opacity: 1;
}
</style>