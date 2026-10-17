// Validation for the Sandbox onboarding form. Pure functions over the form's
// values and chosen files, so the rules in the design handoff can be tested
// without mounting anything.
//
// Keys are field keys (see fields.ts), choice keys (orgType, altNominate) or
// `doc:<DocKey>` for an upload.

import { CHOICE_LABELS, FIELDS, contactKeys, type OrgType, type SectionId, type Values } from './fields'
import { requiredDocs, type DocDef, type DocKey, type FileLike } from './documents'

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export type Files = Partial<Record<DocKey, FileLike>>
export type FileErrors = Partial<Record<DocKey, string>>

/** "7841990…" → "784-1990-1234567-1", while typing. */
export function formatEid(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 15)
  return [d.slice(0, 3), d.slice(3, 7), d.slice(7, 14), d.slice(14)].filter(Boolean).join('-')
}

/** Digits and spaces only, at most 16 characters. */
export function sanitisePhone(raw: string): string {
  return raw.replace(/[^\d\s]/g, '').slice(0, 16)
}

export function orgTypeOf(values: Values): OrgType {
  return values.orgType === 'LFI' || values.orgType === 'TPP' ? values.orgType : ''
}

export function docsFor(values: Values): DocDef[] {
  return requiredDocs(orgTypeOf(values), values.altNominate === 'yes')
}

const BASE_KEYS = [
  'requesterEmail', 'orgName', 'orgType',
  'addr1', 'addr2', 'country', 'city', 'postCode',
  ...contactKeys('pbc'), 'altNominate',
]

/** Every key that is validated: additional contact only when nominated, documents for the chosen type. */
export function activeKeys(values: Values): string[] {
  const keys = [...BASE_KEYS]
  if (values.altNominate === 'yes') keys.push(...contactKeys('alt'))
  for (const d of docsFor(values)) keys.push(`doc:${d.key}`)
  return keys
}

export function sectionKeys(id: SectionId, values: Values): string[] {
  switch (id) {
    case 'org': return ['requesterEmail', 'orgName', 'orgType']
    case 'address': return ['addr1', 'addr2', 'country', 'city', 'postCode']
    case 'pbc': return contactKeys('pbc')
    case 'alt': return values.altNominate === 'yes' ? ['altNominate', ...contactKeys('alt')] : ['altNominate']
    case 'docs': {
      const docs = docsFor(values)
      return docs.length ? docs.map((d) => `doc:${d.key}`) : ['orgType']
    }
  }
}

/** The error message for `key`, or '' when it is valid. */
export function validate(key: string, values: Values, files: Files, fileErrors: FileErrors): string {
  if (key.startsWith('doc:')) {
    const k = key.slice(4) as DocKey
    if (fileErrors[k]) return fileErrors[k] as string
    const doc = docsFor(values).find((d) => d.key === k)
    return files[k] || !doc ? '' : `Upload the ${doc.title}`
  }
  if (key === 'orgType') return orgTypeOf(values) ? '' : 'Select LFI or TPP'
  if (key === 'altNominate') {
    return values[key] === 'yes' || values[key] === 'no' ? '' : 'Select Yes or No'
  }

  const def = FIELDS[key]
  if (!def) return ''
  const v = (values[key] || '').trim()
  if (!v) return def.required

  if (def.kind === 'email' && !EMAIL_RE.test(v)) {
    return 'Enter an email address in the format name@example.com'
  }
  if (def.kind === 'eid') {
    const n = v.replace(/\D/g, '')
    if (n.length !== 15 || !n.startsWith('784')) {
      return 'Emirates ID must be 15 digits starting with 784, e.g. 784-1990-1234567-1'
    }
  }
  if (def.kind === 'phone') {
    const n = v.replace(/\D/g, '')
    const cc = values[`${key}Cc`] || '+971'
    if (cc === '+971') {
      if (!/^5\d{8}$/.test(n.replace(/^0/, ''))) {
        return 'Enter a UAE mobile number: 9 digits starting with 5, e.g. 50 123 4567'
      }
    } else if (n.length < 6 || n.length > 14) {
      return 'Enter a valid mobile number (6 to 14 digits)'
    }
  }
  return ''
}

/** How a key is named in the error summary. Contact fields are suffixed with their contact. */
export function labelFor(key: string, values: Values): string {
  if (key.startsWith('doc:')) return docsFor(values).find((d) => d.key === key.slice(4))?.title ?? key
  const def = FIELDS[key]
  if (!def) return CHOICE_LABELS[key] ?? key
  if (key.startsWith('alt')) return `${def.label} (Additional Organisation Admin)`
  if (key.startsWith('pbc')) return `${def.label} (Organisation Admin)`
  return def.label
}

/**
 * The values sent to standards-api: only those that apply — the additional
 * Organisation Admin's only when nominated. Country codes travel with the mobiles.
 */
export function submissionValues(values: Values): Values {
  const keys = [...activeKeys(values).filter((k) => !k.startsWith('doc:')), 'pbcMobileCc']
  if (values.altNominate === 'yes') keys.push('altMobileCc')
  return Object.fromEntries(keys.map((k) => [k, values[k] ?? '']))
}
