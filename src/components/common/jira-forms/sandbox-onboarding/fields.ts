// Field config for the Sandbox onboarding form: labels, hints, placeholders and
// required-field messages, mirroring the tables in
// supporting/design_handoff_sandbox_onboarding/README.md. Pure data — no Vue —
// so validators.ts and the components read the same source.

export type FieldKind = 'text' | 'email' | 'eid' | 'phone' | 'select'

export interface FieldDef {
  label: string
  kind: FieldKind
  /** Message when the field is empty. */
  required: string
  hint?: string
  /** Render the hint under the control rather than above it. */
  hintBelow?: boolean
  /** Invisible text above the control, so it lines up with a hinted neighbour. */
  spacer?: string
  placeholder?: string
  autocomplete?: string
  options?: string[]
  /** Span the full grid row. */
  full?: boolean
}

export type Values = Record<string, string>
export type ContactPrefix = 'pbc' | 'alt'
export type OrgType = '' | 'LFI' | 'TPP'

// GCC first, then alphabetical.
export const COUNTRIES = [
  'United Arab Emirates', 'Saudi Arabia', 'Bahrain', 'Kuwait', 'Oman', 'Qatar',
  'Australia', 'Canada', 'China', 'Egypt', 'France', 'Germany', 'Hong Kong', 'India',
  'Ireland', 'Italy', 'Japan', 'Jordan', 'Lebanon', 'Luxembourg', 'Netherlands',
  'Pakistan', 'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Turkey',
  'United Kingdom', 'United States',
]

export const COUNTRY_CODES = [
  '+971', '+966', '+973', '+965', '+968', '+974', '+20', '+33', '+44', '+49', '+65', '+91', '+92', '+1',
]

const EID_HINT = '15 digits, starting with 784.'

function contactFields(p: ContactPrefix): Record<string, FieldDef> {
  const pbc = p === 'pbc'
  return {
    [`${p}First`]: {
      label: 'First name',
      kind: 'text',
      autocomplete: pbc ? 'given-name' : 'off',
      required: 'Enter the first name',
    },
    [`${p}Last`]: {
      label: 'Last name',
      kind: 'text',
      autocomplete: pbc ? 'family-name' : 'off',
      required: 'Enter the last name',
    },
    [`${p}Eid`]: {
      label: 'Emirates ID',
      kind: 'eid',
      hint: EID_HINT,
      placeholder: '784-XXXX-XXXXXXX-X',
      required: 'Enter the Emirates ID',
    },
    [`${p}Mobile`]: {
      label: 'Mobile number',
      kind: 'phone',
      spacer: EID_HINT,
      placeholder: '50 123 4567',
      autocomplete: pbc ? 'tel-national' : 'off',
      required: 'Enter the mobile number',
    },
    [`${p}Email`]: {
      label: 'Email ID',
      kind: 'email',
      placeholder: 'name@organisation.ae',
      autocomplete: pbc ? 'email' : 'off',
      required: 'Enter the email address',
      full: true,
    },
  }
}

export const FIELDS: Record<string, FieldDef> = {
  requesterEmail: {
    label: 'Your email address',
    kind: 'email',
    hint: 'The email address of the person raising this request.',
    placeholder: 'name@organisation.ae',
    autocomplete: 'email',
    required: 'Enter your email address',
    full: true,
  },
  orgName: {
    label: 'Organisation name',
    kind: 'text',
    hint: 'The registered legal name of the organisation.',
    autocomplete: 'organization',
    required: 'Enter the organisation name',
    full: true,
  },
  addr1: {
    label: 'Address line 1', kind: 'text', placeholder: 'Building and street',
    autocomplete: 'address-line1', required: 'Enter address line 1', full: true,
  },
  addr2: {
    label: 'Address line 2', kind: 'text', placeholder: 'Floor, office or area',
    autocomplete: 'address-line2', required: 'Enter address line 2', full: true,
  },
  country: {
    label: 'Country', kind: 'select', placeholder: 'Select a country', options: COUNTRIES,
    autocomplete: 'country-name', required: 'Select a country',
  },
  city: { label: 'City', kind: 'text', autocomplete: 'address-level2', required: 'Enter the city' },
  postCode: {
    label: 'Post code', kind: 'text', autocomplete: 'postal-code',
    hint: 'No post code? Use your P.O. Box number.', hintBelow: true, required: 'Enter the post code',
  },
  ...contactFields('pbc'),
  ...contactFields('alt'),
}

/** The config for a field key; throws on a typo rather than rendering an empty field. */
export function fieldDef(key: string): FieldDef {
  const def = FIELDS[key]
  if (!def) throw new Error(`Unknown Sandbox onboarding field: ${key}`)
  return def
}

/** Radio-style keys, which have no FieldDef. Labels are used in the error summary. */
export const CHOICE_LABELS: Record<string, string> = {
  orgType: 'Organisation type',
  altNominate: 'Nominate additional Organisation Admin?',
}

export const CONTACT_INPUTS = ['First', 'Last', 'Eid', 'Mobile', 'Email'] as const

/** The contact's fields, e.g. pbcFirst … pbcEmail. */
export function contactKeys(p: ContactPrefix): string[] {
  return CONTACT_INPUTS.map((s) => p + s)
}

export type SectionId = 'org' | 'address' | 'pbc' | 'alt' | 'docs'

export const SECTIONS: { id: SectionId; num: string; title: string }[] = [
  { id: 'org', num: '01', title: 'Organisation' },
  { id: 'address', num: '02', title: 'Registered address' },
  { id: 'pbc', num: '03', title: 'Organisation Admin' },
  { id: 'alt', num: '04', title: 'Additional Organisation Admin' },
  { id: 'docs', num: '05', title: 'Supporting documents' },
]

export function blankValues(): Values {
  return { pbcMobileCc: '+971', altMobileCc: '+971' }
}
