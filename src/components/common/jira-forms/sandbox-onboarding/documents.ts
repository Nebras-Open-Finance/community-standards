// Supporting documents for the Sandbox onboarding form. Which documents are
// required depends on the organisation type and on whether an additional
// Organisation Admin is nominated:
//
//   LFI  CBUAE LFI License · CCO approval email (Organisation Admin)
//   TPP  CBUAE Trade License · Letter of Intent / Business Plan · CCO approval email (Organisation Admin)
//   +    CCO approval email (Additional Organisation Admin), for either type, when one is nominated
//
// Pure data — no Vue.

import type { OrgType } from './fields'

export type DocKey = 'cco' | 'ccoAlt' | 'lfiLicense' | 'tradeLicense' | 'loi'

export interface DocDef {
  key: DocKey
  title: string
  description: string
  /** Lower-case extensions without the dot. */
  exts: string[]
  acceptLabel: string
}

/** Enough of a File to validate it; lets the validators run without a DOM. */
export interface FileLike {
  name: string
  size: number
}

const EMAIL_EXTS = ['pdf', 'eml', 'msg', 'png', 'jpg', 'jpeg']
const EMAIL_ACCEPT = 'PDF, EML, MSG, PNG or JPG'
const IMAGE_EXTS = ['pdf', 'png', 'jpg', 'jpeg']
const IMAGE_ACCEPT = 'PDF, PNG or JPG'

function ccoDoc(altNominated: boolean): DocDef {
  return {
    key: 'cco',
    title: altNominated ? 'CCO Approval Email – Organisation Admin' : 'CCO Approval Email',
    description: 'A copy of the CCO approval email nominating the Organisation Admin or approving onboarding.',
    exts: EMAIL_EXTS,
    acceptLabel: EMAIL_ACCEPT,
  }
}

const CCO_ALT: DocDef = {
  key: 'ccoAlt',
  title: 'CCO Approval Email – Additional Organisation Admin',
  description: 'A copy of the CCO approval email nominating the Additional Organisation Admin.',
  exts: EMAIL_EXTS,
  acceptLabel: EMAIL_ACCEPT,
}

const LFI_LICENSE: DocDef = {
  key: 'lfiLicense', title: 'CBUAE LFI License', description: '', exts: IMAGE_EXTS, acceptLabel: IMAGE_ACCEPT,
}
const TRADE_LICENSE: DocDef = {
  key: 'tradeLicense', title: 'CBUAE Trade License', description: '', exts: IMAGE_EXTS, acceptLabel: IMAGE_ACCEPT,
}
const LETTER_OF_INTENT: DocDef = {
  key: 'loi', title: 'Letter of Intent / Business Plan', description: '', exts: ['pdf', 'doc', 'docx'], acceptLabel: 'PDF, DOC or DOCX',
}

/** The documents to upload, in display order. Empty until an organisation type is chosen. */
export function requiredDocs(orgType: OrgType, altNominated: boolean): DocDef[] {
  if (!orgType) return []
  // CCO approval emails come last: they are the final thing to upload.
  const cco = altNominated ? [ccoDoc(true), CCO_ALT] : [ccoDoc(false)]
  return orgType === 'LFI'
    ? [LFI_LICENSE, ...cco]
    : [TRADE_LICENSE, LETTER_OF_INTENT, ...cco]
}

export function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase()
}

/** Upload limits — the Service Desk's attachment limit. standards-api enforces the same. */
export const MAX_FILE_BYTES = 10 * 1024 * 1024
export const MAX_TOTAL_BYTES = 30 * 1024 * 1024

/** Why a chosen file cannot be used for `doc`, or '' when it can. */
export function fileError(doc: DocDef, file: FileLike): string {
  if (!doc.exts.includes(extensionOf(file.name))) {
    return `This file type is not accepted. Upload a ${doc.acceptLabel} file.`
  }
  if (file.size === 0) return 'This file is empty. Choose a different file.'
  if (file.size > MAX_FILE_BYTES) return 'This file is larger than 10 MB. Choose a smaller file.'
  return ''
}

/**
 * Why `file` cannot join the other chosen documents, or '' when it can: the
 * documents together must stay within 30 MB. `others` excludes the file it replaces.
 */
export function totalSizeError(file: FileLike, others: FileLike[]): string {
  const total = others.reduce((n, f) => n + f.size, file.size)
  return total > MAX_TOTAL_BYTES
    ? 'Together, your documents must be 30 MB or smaller. Choose a smaller file.'
    : ''
}

export function formatSize(bytes: number): string {
  return bytes >= 1048576
    ? `${(bytes / 1048576).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`
}
