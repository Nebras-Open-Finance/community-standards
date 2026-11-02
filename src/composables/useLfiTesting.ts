// LFI functional testing — upload an LFI's sandbox certificates and keys and run
// a functional test through the API Hub. Client for /lfi-testing/* on the
// proposals API (standards-api).
//
// The tests come from the suite's catalogue (GET /lfi-testing/tests). Each test
// declares what the upload must carry (`needs`: the LFI's C3 certificates, the
// TPP redirect URI) and the inputs the form collects (`inputs`). The form renders
// both from the catalogue, so a new test that uses the existing input types needs
// no work here; an input type this page does not know is shown as plain text.
//
// One test is chosen at a time, except in a group whose sub-tests can run
// together (`group.multiple`): there any of them can be ticked, the form shows
// their inputs once each (one value per input ID, shared), and they run one
// after another, each sent only its own inputs.
//
// A run goes on in the background on the API: POST /lfi-testing/runs answers 202
// with the run `running`, and the page polls GET /lfi-testing/runs/:id until it
// is not, showing each step as it finishes. (An API that runs synchronously
// answers 200 with the finished run, which needs no polling.)
//
// Pre-production API Hub only. Production is listed on the form but cannot be
// chosen yet.
//
// Access: the same Sandbox Trust Framework SSO as useSandboxAuth (GET /me with
// the session cookie, top-level /login?redirect=). The tool is for Nebras staff,
// which /me reports as isAdmin; the page shows the form only to them, and the API
// re-checks on every call. The user signs in before touching the form, so nothing
// has to survive the sign-in round trip: file contents are held in memory only.
// A 401 from any call reloads /me and puts the page back to the sign-in step; a
// 403 shows the API's own message.
//
// Every check here is repeated by the API and the suite; these exist so mistakes
// show up as the form is filled in rather than as a refused upload or run.

import { ref, reactive, computed, watch, onScopeDispose } from 'vue'
import { useSandboxAuth } from './useSandboxAuth'

/** The proposals API (standards-api) — the same host useSandboxAuth signs in against. */
const API_BASE = (
  (import.meta.env.VITE_PROPOSALS_API as string | undefined) ||
  'https://proposals-api.nebras-open-finance.com'
).replace(/\/$/, '')

export type HubEnv = 'preprod' | 'production'

/**
 * API Hub environments, in the order the form shows them. Only `available` ones
 * can be chosen. Hosts are {service}.{lfiCode}.{env}.apihub.openfinance.ae.
 */
export const HUB_ENVS: { value: HubEnv; label: string; available: boolean }[] = [
  { value: 'preprod', label: 'Pre-production', available: true },
  { value: 'production', label: 'Production', available: false },
]

// ── Test catalogue shapes ────────────────────────────────────────────────────

export interface LfiTestStep {
  id: string
  title: string
}

/** What a test needs the upload to carry, beyond the TPP certificate and keys. */
export interface LfiTestNeeds {
  /** The LFI's C3 transport certificate and key (and the Sig4 key when JWT Auth is on). */
  lfiCertificates: boolean
  /** The TPP redirect URI. */
  redirectUri: boolean
}

export interface LfiTestChoiceOption {
  value: string
  label: string
  hint?: string
}

interface InputDefBase {
  id: string
  label: string
  required: boolean
  hint?: string
  /** What the answer must be that no check can confirm before the run, e.g. "The first account must be Active." Shown prominently. */
  flag?: string
}

/**
 * One input a test asks for. Any type this page does not know is read as `text`,
 * so it still renders (as a plain text input) and its value is sent as a string.
 */
export type LfiTestInputDef =
  | (InputDefBase & {
    type: 'text'
    placeholder?: string
    /** A JS regular expression source, anchored, the answer must match; patternMessage says what is wrong when it does not. */
    pattern?: string
    patternMessage?: string
  })
  | (InputDefBase & { type: 'list' })
  | (InputDefBase & {
    type: 'choice'
    multiple: true
    options: LfiTestChoiceOption[]
    default?: string[]
  })
  | (InputDefBase & { type: 'iban' })
  | (InputDefBase & { type: 'payee' })

export type PayeeNameType = 'person' | 'business'

/** A payee input's value. `nameType` decides whether the name is sent as FullName or BusinessName. */
export interface LfiTestPayee {
  iban: string
  name: string
  nameType: PayeeNameType
}

/** An input's value, as sent in POST /lfi-testing/runs and recorded on the run. */
export type LfiTestInputValue = string | string[] | LfiTestPayee

export interface LfiTest {
  id: string
  version: string
  title: string
  /**
   * What the picker shows first. A test with no group is a group of one.
   * `multiple`: the group's sub-tests can be ticked and run together.
   */
  group: { id: string; title: string; multiple: boolean }
  /** A group may split again: tests sharing a subgroup are picked under it, by their subtitles. */
  subgroup: { id: string; title: string } | null
  /** A sub-test's name within its group (or subgroup), e.g. "Credit Cards"; null otherwise. */
  subtitle: string | null
  /** False: listed, but not runnable yet. */
  available: boolean
  description: string
  covers: string[]
  needs: LfiTestNeeds
  inputs: LfiTestInputDef[]
  steps: LfiTestStep[]
}

// ── LFIs ─────────────────────────────────────────────────────────────────────

export interface LfiOption {
  code: string
  name: string
  /** Filled into the form when the LFI is chosen; it can still be changed. */
  redirectUri: string
  /**
   * Per group ID, subgroup ID or test ID, per input ID: values filled in when
   * the LFI or the test is chosen, on top of the catalogue's defaults. A test
   * takes its group's, then its subgroup's, then its own, each overriding the
   * last; tests run together take the group's, then each one's subgroup's, then
   * each one's own, in catalogue order. They never replace an input the user has
   * changed, and can still be changed.
   */
  inputDefaults: Record<string, Record<string, LfiTestInputValue>>
}

/** The LFIs the tool can test. Choosing one sets the LFI code and its defaults. */
export const LFIS: LfiOption[] = [
  {
    code: 'nebrasuat',
    name: 'Nebras UAT',
    redirectUri: 'https://api.demo-tpp.nebras-open-finance.com/callback',
    inputDefaults: {
      'bank-data-sharing': {
        psuUserId: '100001000000000000000002',
        accountIds: ['100004000000000000000002'],
      },
      // Dormant savings account (nebras-uat lfi/responses/account-status.js).
      'bank-data-sharing-current-savings-non-active': {
        accountIds: ['100004000000000000000003'],
      },
      // Active current account with transactions booked in 2026.
      'bank-data-sharing-current-savings-transaction-dates': {
        accountIds: ['100004000000000000000001'],
      },
      'confirmation-of-payee': {
        fullMatch: { iban: 'AE130339000000000000001', name: 'Aisha Binte Demo', nameType: 'person' },
        partialMatch: { iban: 'AE130339000000000000001', name: 'Aisha Bint Demo', nameType: 'person' },
        noMatch: { iban: 'AE130339000000000000001', name: 'John Smith', nameType: 'person' },
        otherBankIban: 'AE380260000001234567890',
      },
      'bank-service-initiation': {
        psuUserId: '100001000000000000000002',
        debtorAccountId: '100004000000000000000001',
        creditor: { iban: 'AE380260000001234567890', name: 'Mario International', nameType: 'business' },
        lowFundsAmount: '1000000.00',
      },
    },
  },
]

/**
 * The API Hub hosts a test may talk to, in the order the page lists them.
 * `c3` hosts are called with the LFI's C3 certificate, so only by tests that
 * need the LFI's certificates.
 */
export const HUB_SERVICES: { service: string; role: string; c3: boolean }[] = [
  { service: 'auth1', role: 'API Hub authorisation server', c3: false },
  { service: 'rs1', role: 'API Hub resource server', c3: false },
  { service: 'hh', role: 'Headless Heimdall', c3: true },
  { service: 'cm', role: 'Consent Manager', c3: true },
]

// ── Files ────────────────────────────────────────────────────────────────────

export type SlotId =
  | 'tppTransportCert'
  | 'tppTransportKey'
  | 'tppSigningKey'
  | 'c3TransportCert'
  | 'c3TransportKey'
  | 'c3SigningKey'

export type PemKind = 'certificate' | 'key'

export interface SlotSpec {
  label: string
  kind: PemKind
  accept: string
}

export const FILE_SLOTS: Record<SlotId, SlotSpec> = {
  tppTransportCert: { label: 'TPP transport certificate (.pem)', kind: 'certificate', accept: '.pem,.crt,.cer' },
  tppTransportKey: { label: 'TPP transport key (.key)', kind: 'key', accept: '.key,.pem' },
  tppSigningKey: { label: 'TPP signing key (.key)', kind: 'key', accept: '.key,.pem' },
  c3TransportCert: { label: 'C3 transport certificate (.pem)', kind: 'certificate', accept: '.pem,.crt,.cer' },
  c3TransportKey: { label: 'C3 transport key (.key)', kind: 'key', accept: '.key,.pem' },
  c3SigningKey: { label: 'C3-hh-cm-client signing key (Sig4, .key)', kind: 'key', accept: '.key,.pem' },
}

const SLOT_IDS = Object.keys(FILE_SLOTS) as SlotId[]

/** Required by every test. */
const TPP_SLOTS: SlotId[] = ['tppTransportCert', 'tppTransportKey', 'tppSigningKey']
/** Required when the test needs the LFI's certificates; c3SigningKey too when JWT Auth is on. */
const C3_SLOTS: SlotId[] = ['c3TransportCert', 'c3TransportKey']

export interface FileGroup {
  id: 'tpp' | 'c3' | 'jwt'
  title: string
  hint: string
  slots: SlotId[]
}

/** The `c3` and `jwt` groups are shown only when the chosen test needs the LFI's certificates. */
export const FILE_GROUPS: FileGroup[] = [
  {
    id: 'tpp',
    title: 'TPP',
    hint: 'The TPP application the test acts as. Every test calls the API Hub as this TPP.',
    slots: TPP_SLOTS,
  },
  {
    id: 'c3',
    title: 'LFI (C3)',
    hint: "The LFI's C3 client certificate, used over mTLS on calls to Headless Heimdall and the Consent Manager.",
    slots: C3_SLOTS,
  },
  {
    id: 'jwt',
    title: 'JWT Auth (LFI → API Hub)',
    hint: 'Only for LFIs that send JWT Auth on their calls to the API Hub.',
    slots: ['c3SigningKey'],
  },
]

/** The API Hub Consent Manager release the test calls. Fixed: not on the form. */
const CM_VERSION = 'v2025.47'

export const MAX_PEM_BYTES = 16 * 1024

// POST /lfi-testing/runs answers at once (202) and the run goes on in the
// background. An API that runs it synchronously answers when it has finished,
// normally inside ~90 seconds. Past this the browser stops waiting for the
// answer; the run may still be recorded.
const RUN_TIMEOUT_MS = 150_000
/** How often a running run is read while it is followed. */
const POLL_MS = 1_500
/** Reads in a row that may fail (network, 5xx) before the page stops following a run. */
const MAX_MISSES = 5
/** The page stops following a run still running after this. (The API records one left running 15 minutes as an error.) */
const FOLLOW_LIMIT_MS = 20 * 60_000
const STOPPED_MESSAGE = 'Stopped following. A run already started finishes on the server — see Recent runs.'

// ── API shapes ───────────────────────────────────────────────────────────────

export interface CertSummary {
  subject: string
  notAfter: string
  fingerprint: string
}

export interface UploadSummary {
  tpp: {
    clientId: string
    organisationId: string
    softwareStatementId: string
    signingKid: string
    transportCert: CertSummary
  }
  /** Null when no C3 certificate was uploaded (the test does not need one). */
  lfi: {
    organisationName: string
    organisationId: string
    c3Cert: CertSummary
    jwtAuth: { enabled: boolean; kid: string | null; audience: string | null }
  } | null
  hosts: { discovery: string; rs1: string; hh: string; cm: string }
  cmVersion: string
  /** Null when no redirect URI was sent (the test does not need one). */
  redirectUri: string | null
  warnings: string[]
}

export interface UploadRecord {
  id: string
  createdAt: string
  environment: HubEnv
  lfiCode: string
  /** The signed-in person's name or email. */
  uploadedBy?: string | null
  summary: UploadSummary
}

export type RunStatus = 'running' | 'passed' | 'failed' | 'error'
/** `pending`: planned, not run yet — only while the run is `running`. */
export type StepStatus = 'pending' | 'passed' | 'failed' | 'skipped' | 'error'

export interface RunCall {
  method: string
  url: string
  status: number | null
  interactionId: string | null
  durationMs: number | null
  excerpt: string | null
}

export interface RunStep {
  id: string
  title: string
  status: StepStatus
  durationMs: number | null
  summary: string | null
  error: string | null
  /** Worth the LFI's attention but not failures. Absent on older runs. */
  warnings?: string[]
  calls: RunCall[]
}

export interface Run {
  id: string
  uploadId: string
  testId: string
  testVersion: string
  lfiCode: string
  environment: string
  uploadedBy?: string | null
  status: RunStatus
  startedAt: string
  /** Null while running. */
  finishedAt: string | null
  durationMs: number | null
  error: string | null
  /** The normalised inputs the run used, keyed by input ID. Absent on older runs. */
  inputs?: Record<string, unknown> | null
  /** While running: every planned step, those not run yet `pending`. */
  steps: RunStep[]
}

export interface RunListItem {
  id: string
  testId: string
  lfiCode: string
  environment: string
  uploadedBy?: string | null
  status: RunStatus
  startedAt: string
  finishedAt: string | null
}

interface ErrorBody {
  error?: string
  detail?: string
  fields?: Record<string, unknown>
}

// ── PEM checks ───────────────────────────────────────────────────────────────

export interface PemFile {
  name: string
  /** The normalised PEM text. Held in memory only. */
  text: string
  kind: PemKind
  /** One line describing what was found, e.g. the certificate subject. */
  hint: string
  /** Something worth knowing that does not stop the upload, e.g. expiry. */
  warning: string | null
}

interface PemBlock {
  label: string
  body: string
}

const PEM_BLOCK_RE = /-----BEGIN ([A-Z0-9 ]+)-----\n([\s\S]*?)\n?-----END \1-----/g

function pemBlocks(text: string): PemBlock[] {
  return Array.from(text.matchAll(PEM_BLOCK_RE), (m) => ({ label: m[1] ?? '', body: m[2] ?? '' }))
}

function base64ToBytes(b64: string): Uint8Array | null {
  try {
    const bin = atob(b64.replace(/\s/g, ''))
    const out = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
    return out
  } catch {
    return null
  }
}

// A minimal DER reader — enough to pull the subject and expiry out of an X.509
// certificate for the hint under each file. Anything it cannot read falls back to
// a plain description; the API does the real parsing.
interface Tlv {
  tag: number
  start: number
  end: number
}

function tlvAt(b: Uint8Array, off: number, limit: number): Tlv {
  if (off + 2 > limit) throw new Error('truncated')
  const tag = b[off] ?? 0
  let len = b[off + 1] ?? 0
  let p = off + 2
  if (len & 0x80) {
    const n = len & 0x7f
    if (n < 1 || n > 4 || p + n > limit) throw new Error('bad length')
    len = 0
    for (let i = 0; i < n; i++) len = len * 256 + (b[p++] ?? 0)
  }
  if (p + len > limit) throw new Error('truncated')
  return { tag, start: p, end: p + len }
}

function childrenOf(b: Uint8Array, t: Tlv): Tlv[] {
  const out: Tlv[] = []
  for (let off = t.start; off < t.end;) {
    const c = tlvAt(b, off, t.end)
    out.push(c)
    off = c.end
  }
  return out
}

function hexOf(b: Uint8Array, start = 0, end = b.length): string {
  let s = ''
  for (let i = start; i < end; i++) s += (b[i] ?? 0).toString(16).padStart(2, '0')
  return s
}

const NAME_ATTRS: Record<string, string> = {
  '550403': 'CN',
  '55040b': 'OU',
  '55040a': 'O',
}

function readName(b: Uint8Array, name: Tlv): Record<string, string> {
  const out: Record<string, string> = {}
  for (const set of childrenOf(b, name)) {
    for (const atv of childrenOf(b, set)) {
      const [oid, value] = childrenOf(b, atv)
      if (!oid || !value || oid.tag !== 0x06) continue
      const attr = NAME_ATTRS[hexOf(b, oid.start, oid.end)]
      if (attr && !(attr in out)) out[attr] = new TextDecoder().decode(b.subarray(value.start, value.end))
    }
  }
  return out
}

function readTime(b: Uint8Array, t: Tlv): Date | null {
  const s = new TextDecoder().decode(b.subarray(t.start, t.end))
  const m = t.tag === 0x17
    ? s.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?Z$/)
    : s.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?/)
  if (!m) return null
  let year = Number(m[1])
  if (t.tag === 0x17) year += year >= 50 ? 1900 : 2000
  return new Date(Date.UTC(year, Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]), Number(m[6] ?? 0)))
}

function readCertificate(der: Uint8Array): { subject: Record<string, string>; notAfter: Date | null } | null {
  try {
    const cert = tlvAt(der, 0, der.length)
    const tbs = childrenOf(der, cert)[0]
    if (cert.tag !== 0x30 || !tbs || tbs.tag !== 0x30) return null
    const fields = childrenOf(der, tbs)
    // [0] version is optional; then serial, signature algorithm, issuer, validity, subject.
    const i = fields[0]?.tag === 0xa0 ? 1 : 0
    const validity = fields[i + 3]
    const subject = fields[i + 4]
    if (!validity || !subject) return null
    const notAfterTlv = childrenOf(der, validity)[1]
    return {
      subject: readName(der, subject),
      notAfter: notAfterTlv ? readTime(der, notAfterTlv) : null,
    }
  } catch {
    return null
  }
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function curveOf(hex: string): string {
  if (hex.includes('06082a8648ce3d030107')) return 'P-256 '
  if (hex.includes('06052b81040022')) return 'P-384 '
  if (hex.includes('06052b81040023')) return 'P-521 '
  return ''
}

function describeKey(label: string, der: Uint8Array): string {
  const hex = hexOf(der)
  if (label === 'RSA PRIVATE KEY') return 'RSA private key (PKCS#1)'
  if (label === 'EC PRIVATE KEY') return `EC ${curveOf(hex)}private key (SEC1)`
  if (hex.includes('06092a864886f70d010101')) return 'RSA private key (PKCS#8)'
  if (hex.includes('06072a8648ce3d0201')) return `EC ${curveOf(hex)}private key (PKCS#8)`
  if (der.length < 100 && hex.includes('06032b6570')) return 'Ed25519 private key (PKCS#8)'
  return 'Private key (PKCS#8)'
}

/**
 * Check a file's text is the right kind of PEM for its slot: one or more
 * certificates for a certificate slot, exactly one unencrypted private key for
 * a key slot, and nothing else.
 * @returns an error message, or the parsed file.
 */
export function parsePem(slot: SlotId, name: string, raw: string): PemFile | string {
  const text = raw.replace(/\r\n?/g, '\n').replace(/[ \t]+$/gm, '').trim()
  const blocks = pemBlocks(text)
  const certs = blocks.filter((b) => b.label === 'CERTIFICATE')
  const keys = blocks.filter((b) => /PRIVATE KEY$/.test(b.label))
  const hasKey = keys.length > 0 || text.includes('PRIVATE KEY-----')
  const hasCert = certs.length > 0 || text.includes('-----BEGIN CERTIFICATE-----')
  const isCsr = /-----BEGIN (NEW )?CERTIFICATE REQUEST-----/.test(text)
  const isPublicKey = /-----BEGIN (RSA |EC )?PUBLIC KEY-----/.test(text)

  if (FILE_SLOTS[slot].kind === 'certificate') {
    if (hasKey) {
      return hasCert
        ? 'This file holds a private key as well as a certificate. Add the certificate on its own here, and the key in its key slot.'
        : 'This is a private key, not a certificate. Add the certificate (.pem) here, and the key in its key slot.'
    }
    if (!hasCert) {
      return isCsr
        ? 'This is a certificate signing request, not an issued certificate.'
        : 'Not a PEM certificate. Expected a block starting "-----BEGIN CERTIFICATE-----".'
    }
    if (!certs.length) return 'The certificate is incomplete: there is no matching "-----END CERTIFICATE-----" line.'
    const ders = certs.map((c) => base64ToBytes(c.body))
    if (ders.some((d) => !d || d.length < 64 || d[0] !== 0x30)) {
      return 'The certificate is corrupt: its body is not valid base64-encoded DER.'
    }
    const info = readCertificate(ders[0]!)
    const parts: string[] = []
    let warning: string | null = null
    if (info) {
      for (const attr of ['CN', 'OU', 'O']) {
        const v = info.subject[attr]
        if (v) parts.push(`${attr}=${v}`)
      }
      if (info.notAfter) {
        parts.push(`expires ${isoDate(info.notAfter)}`)
        if (info.notAfter.getTime() < Date.now()) warning = `This certificate expired on ${isoDate(info.notAfter)}.`
      }
    }
    if (!parts.length) parts.push('PEM certificate')
    if (certs.length > 1) parts.push(`first of ${certs.length} certificates in the file`)
    return { name, text: `${text}\n`, kind: 'certificate', hint: parts.join(' · '), warning }
  }

  if (text.includes('ENCRYPTED PRIVATE KEY') || /^Proc-Type:\s*4,ENCRYPTED/m.test(text)) {
    return 'This private key is encrypted. Add the unencrypted key (no passphrase).'
  }
  if (!hasKey) {
    if (hasCert) {
      return 'This is a certificate, not a private key. Add the private key (.key) here, and the certificate in its certificate slot.'
    }
    if (isCsr) return 'This is a certificate signing request, not a private key.'
    if (isPublicKey) return 'This is a public key. Add the private key.'
    return 'Not a PEM private key. Expected a block starting "-----BEGIN PRIVATE KEY-----".'
  }
  if (hasCert) {
    return 'This file holds a certificate as well as the private key. Add the key on its own here, and the certificate in its certificate slot.'
  }
  const key = keys[0]
  if (!key) return 'The private key is incomplete: there is no matching "-----END … PRIVATE KEY-----" line.'
  if (keys.length > 1) return 'This file holds more than one private key. Add one key per slot.'
  const der = base64ToBytes(key.body)
  if (!der || der.length < 32 || der[0] !== 0x30) {
    return 'The private key is corrupt: its body is not valid base64-encoded DER.'
  }
  return { name, text: `${text}\n`, kind: 'key', hint: describeKey(key.label, der), warning: null }
}

// ── Test catalogue ───────────────────────────────────────────────────────────

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

function strings(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
}

function toInputDef(raw: unknown): LfiTestInputDef[] {
  if (!isRecord(raw) || typeof raw.id !== 'string' || !raw.id) return []
  const hint = str(raw.hint)
  const flag = str(raw.flag)
  const base: InputDefBase = {
    id: raw.id,
    label: str(raw.label) || raw.id,
    required: raw.required === true,
    ...(hint ? { hint } : {}),
    ...(flag ? { flag } : {}),
  }
  const type = raw.type
  if (type === 'list') return [{ ...base, type: 'list' }]
  if (type === 'iban') return [{ ...base, type: 'iban' }]
  if (type === 'payee') return [{ ...base, type: 'payee' }]
  if (type === 'choice') {
    const options = (Array.isArray(raw.options) ? raw.options : []).flatMap((o): LfiTestChoiceOption[] => {
      if (!isRecord(o) || typeof o.value !== 'string') return []
      const optionHint = str(o.hint)
      return [{ value: o.value, label: str(o.label) || o.value, ...(optionHint ? { hint: optionHint } : {}) }]
    })
    const known = new Set(options.map((o) => o.value))
    return [{
      ...base, type: 'choice', multiple: true, options, default: strings(raw.default).filter((v) => known.has(v)),
    }]
  }
  // 'text', and any type this page does not know.
  const placeholder = str(raw.placeholder)
  const pattern = str(raw.pattern)
  const patternMessage = str(raw.patternMessage)
  return [{
    ...base,
    type: 'text',
    ...(placeholder ? { placeholder } : {}),
    ...(pattern ? { pattern } : {}),
    ...(pattern && patternMessage ? { patternMessage } : {}),
  }]
}

function toTest(raw: unknown): LfiTest[] {
  if (!isRecord(raw) || typeof raw.id !== 'string' || !raw.id) return []
  // A catalogue without `needs` predates them: ask for everything.
  const needs = isRecord(raw.needs)
    ? { lfiCertificates: raw.needs.lfiCertificates === true, redirectUri: raw.needs.redirectUri === true }
    : { lfiCertificates: true, redirectUri: true }
  const title = str(raw.title) || raw.id
  const group = isRecord(raw.group) && typeof raw.group.id === 'string' && raw.group.id
    ? { id: raw.group.id, title: str(raw.group.title) || raw.group.id, multiple: raw.group.multiple === true }
    : { id: raw.id, title, multiple: false }
  const subgroup = isRecord(raw.subgroup) && typeof raw.subgroup.id === 'string' && raw.subgroup.id
    ? { id: raw.subgroup.id, title: str(raw.subgroup.title) || raw.subgroup.id }
    : null
  return [{
    id: raw.id,
    version: str(raw.version),
    title,
    group,
    subgroup,
    subtitle: str(raw.subtitle) || null,
    available: raw.available !== false,
    description: str(raw.description),
    covers: strings(raw.covers),
    needs,
    inputs: (Array.isArray(raw.inputs) ? raw.inputs : []).flatMap(toInputDef),
    steps: (Array.isArray(raw.steps) ? raw.steps : []).flatMap((s): LfiTestStep[] =>
      isRecord(s) && typeof s.id === 'string' ? [{ id: s.id, title: str(s.title) || s.id }] : []),
  }]
}

/** The `tests` of GET /lfi-testing/tests, with defaults for anything missing. Shared with useLfiTestResults. */
export function parseLfiTestCatalogue(raw: unknown): LfiTest[] {
  return Array.isArray(raw) ? raw.flatMap(toTest) : []
}

// ── Test inputs ──────────────────────────────────────────────────────────────

/**
 * An input as the form holds it: a string for text, IBAN and list inputs (a list
 * is the text as typed), the ticked values for a choice, the three parts of a payee.
 */
export type LfiTestInputDraft = string | string[] | LfiTestPayee

const EMPTY_PAYEE: LfiTestPayee = { iban: '', name: '', nameType: 'person' }

function emptyDraft(def: LfiTestInputDef): LfiTestInputDraft {
  if (def.type === 'choice') return []
  if (def.type === 'payee') return { ...EMPTY_PAYEE }
  return ''
}

/** An IBAN as sent: spaces removed, uppercase. */
function cleanIban(v: string): string {
  return v.replace(/\s+/g, '').toUpperCase()
}

/** A list input's text as entries: split on commas and whitespace, de-duplicated. */
function listItems(text: string): string[] {
  return Array.from(new Set(text.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean)))
}

function draftText(d: LfiTestInputDraft | undefined): string {
  return typeof d === 'string' ? d : ''
}

function draftPayee(d: LfiTestInputDraft | undefined): LfiTestPayee {
  return d && typeof d === 'object' && !Array.isArray(d) ? d : EMPTY_PAYEE
}

/** The ticked values, in option order. */
function draftChoice(def: { options: LfiTestChoiceOption[] }, d: LfiTestInputDraft | undefined): string[] {
  const picked = new Set(Array.isArray(d) ? d : [])
  return def.options.map((o) => o.value).filter((v) => picked.has(v))
}

/** A default (the LFI's or the catalogue's) as the form holds it, or null if it does not fit the input. */
function toDraft(def: LfiTestInputDef, v: unknown): LfiTestInputDraft | null {
  switch (def.type) {
    case 'choice':
      return Array.isArray(v) ? draftChoice(def, strings(v)) : null
    case 'list':
      if (Array.isArray(v)) return strings(v).join(', ')
      return typeof v === 'string' ? v : null
    case 'payee':
      if (!isRecord(v)) return null
      return { iban: cleanIban(str(v.iban)), name: str(v.name), nameType: v.nameType === 'business' ? 'business' : 'person' }
    case 'iban':
      return typeof v === 'string' ? cleanIban(v) : null
    default:
      return typeof v === 'string' ? v : null
  }
}

/** An input's value as POST /lfi-testing/runs takes it. */
function inputValue(def: LfiTestInputDef, d: LfiTestInputDraft | undefined): LfiTestInputValue {
  switch (def.type) {
    case 'choice':
      return draftChoice(def, d)
    case 'list':
      return listItems(draftText(d))
    case 'payee': {
      const p = draftPayee(d)
      return { iban: cleanIban(p.iban), name: p.name.trim(), nameType: p.nameType }
    }
    case 'iban':
      return cleanIban(draftText(d))
    default:
      return draftText(d).trim()
  }
}

function isBlank(v: LfiTestInputValue): boolean {
  if (typeof v === 'string') return !v
  if (Array.isArray(v)) return !v.length
  return !v.iban && !v.name
}

/**
 * A light IBAN check: the shape (23 characters for AE) and the mod-97 check
 * digits. The suite repeats it and refuses an IBAN that fails.
 * @returns an error message, or null.
 */
function ibanProblem(iban: string): string | null {
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) {
    return 'Not an IBAN: two letters, two check digits, then the account number.'
  }
  if (iban.startsWith('AE') && !/^AE\d{21}$/.test(iban)) {
    return 'A UAE IBAN is 23 characters: AE followed by 21 digits.'
  }
  let rem = 0
  for (const ch of `${iban.slice(4)}${iban.slice(0, 4)}`) {
    const digits = ch >= 'A' ? String(ch.charCodeAt(0) - 55) : ch
    for (const d of digits) rem = (rem * 10 + Number(d)) % 97
  }
  return rem === 1 ? null : 'The check digits do not match (mod-97). Check the IBAN for a typing mistake.'
}

const patterns = new Map<string, RegExp | null>()

/**
 * A text input's `pattern`, compiled once: with the `u` flag where it compiles
 * so (\p{…} classes need it), otherwise without. Null if it does not compile at
 * all — the suite still checks it.
 */
function patternOf(source: string): RegExp | null {
  if (!patterns.has(source)) {
    let re: RegExp | null = null
    try {
      re = new RegExp(source, 'u')
    } catch {
      try { re = new RegExp(source) } catch { re = null }
    }
    patterns.set(source, re)
  }
  return patterns.get(source) ?? null
}

/**
 * The inputs of the tests run together: each input ID once, in the order it
 * first appears across them (catalogue order). One value per ID goes to every
 * test that asks for it, so it is required if any of them requires it.
 */
function unionInputs(tests: LfiTest[]): LfiTestInputDef[] {
  const out: LfiTestInputDef[] = []
  for (const t of tests) {
    for (const def of t.inputs) {
      const i = out.findIndex((d) => d.id === def.id)
      if (i === -1) out.push(def)
      else if (def.required && !out[i]!.required) out[i] = { ...out[i]!, required: true }
    }
  }
  return out
}

/** Where the form keeps a test's inputs: per test, or per group for tests run together, which share them. */
function formKeyOf(test: LfiTest): string {
  return test.group.multiple ? `group:${test.group.id}` : test.id
}

/** Keyed by input ID, or '<id>.iban' / '<id>.name' for a payee. */
type InputErrors = Record<string, string>

function checkInputs(defs: LfiTestInputDef[], drafts: Record<string, LfiTestInputDraft>): InputErrors {
  const errors: InputErrors = {}
  function iban(key: string, value: string, required: boolean): void {
    if (!value) {
      if (required) errors[key] = 'Enter an IBAN.'
      return
    }
    const problem = ibanProblem(value)
    if (problem) errors[key] = problem
  }
  for (const def of defs) {
    const d = drafts[def.id]
    switch (def.type) {
      case 'payee': {
        const p = draftPayee(d)
        if (!def.required && !p.iban.trim() && !p.name.trim()) break
        iban(`${def.id}.iban`, cleanIban(p.iban), true)
        if (!p.name.trim()) errors[`${def.id}.name`] = 'Enter the name.'
        break
      }
      case 'iban':
        iban(def.id, cleanIban(draftText(d)), def.required)
        break
      case 'choice':
        if (def.required && !draftChoice(def, d).length) errors[def.id] = 'Choose at least one.'
        break
      case 'list':
        if (def.required && !listItems(draftText(d)).length) errors[def.id] = 'Enter at least one.'
        break
      default: {
        const text = draftText(d).trim()
        if (!text) {
          if (def.required) errors[def.id] = 'Enter a value.'
        } else if (def.pattern && patternOf(def.pattern)?.test(text) === false) {
          errors[def.id] = def.patternMessage ?? 'Not in the expected format.'
        }
      }
    }
  }
  return errors
}

/** The inputs for POST /lfi-testing/runs: blank optional inputs are left out. */
function runInputsFor(test: LfiTest, drafts: Record<string, LfiTestInputDraft>): Record<string, LfiTestInputValue> {
  const out: Record<string, LfiTestInputValue> = {}
  for (const def of test.inputs) {
    const v = inputValue(def, drafts[def.id])
    if (!isBlank(v)) out[def.id] = v
  }
  return out
}

/** A recorded input for display: a payee as "IBAN · name (person)", a choice by its option labels. */
function formatInputValue(def: LfiTestInputDef | undefined, v: unknown): string {
  if (typeof v === 'string') return v || '—'
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (Array.isArray(v)) {
    const labels = v.map((x) => {
      const s = String(x)
      return def?.type === 'choice' ? (def.options.find((o) => o.value === s)?.label ?? s) : s
    })
    return labels.length ? labels.join(', ') : '—'
  }
  if (isRecord(v) && ('iban' in v || 'name' in v)) {
    const type = v.nameType === 'person' || v.nameType === 'business' ? ` (${v.nameType})` : ''
    return `${str(v.iban) || '—'} · ${str(v.name) || '—'}${type}`
  }
  if (v === null || v === undefined) return '—'
  return JSON.stringify(v)
}

/**
 * A run's recorded inputs as label/value rows: the test's inputs in catalogue
 * order, then any the catalogue does not list, under their raw key.
 */
export function lfiTestInputRows(
  test: LfiTest | null | undefined,
  inputs: unknown,
): { id: string; label: string; value: string }[] {
  if (!isRecord(inputs)) return []
  const defs = test?.inputs ?? []
  const ids = [
    ...defs.map((d) => d.id).filter((id) => id in inputs),
    ...Object.keys(inputs).filter((k) => !defs.some((d) => d.id === k)),
  ]
  return ids.map((id) => {
    const def = defs.find((d) => d.id === id)
    return { id, label: def?.label ?? id, value: formatInputValue(def, inputs[id]) }
  })
}

// ── Field names the API may report errors against ────────────────────────────

export type FieldKey =
  | 'environment'
  | 'lfiCode'
  | 'redirectUri'
  | 'jwtAudience'
  | 'testId'

const FIELD_LABEL: Record<FieldKey, string> = {
  environment: 'Hub environment',
  lfiCode: 'LFI',
  redirectUri: 'TPP redirect URI',
  jwtAudience: 'JWT audience',
  testId: 'Test',
}

/** The API names fields after the request body; the form names them after its inputs. */
const SERVER_FIELD: Record<string, FieldKey> = {
  environment: 'environment',
  lfiCode: 'lfiCode',
  redirectUri: 'redirectUri',
  'jwtAuth.audience': 'jwtAudience',
  audience: 'jwtAudience',
  jwtAudience: 'jwtAudience',
  testId: 'testId',
}

/** A field name without a trailing array index: 'inputs.accountIds[1]' → 'inputs.accountIds'. */
function withoutIndex(name: string): string {
  return name.replace(/\[\d+\]$|\.\d+$/, '')
}

function mapServerField(name: string): FieldKey | SlotId | null {
  const n = withoutIndex(name)
  const slot = n.replace(/^files\./, '')
  if ((SLOT_IDS as string[]).includes(slot)) return slot as SlotId
  return SERVER_FIELD[n] ?? null
}

function fieldLabel(key: FieldKey | SlotId): string {
  return key in FILE_SLOTS ? FILE_SLOTS[key as SlotId].label : FIELD_LABEL[key as FieldKey]
}

interface SlotState {
  file: PemFile | null
  error: string | null
}

interface ApiResult<T> {
  status: number
  ok: boolean
  data: T | null
  err: ErrorBody | null
}

/** JSON call to /lfi-testing/* with the session cookie. Shared with useLfiTestResults. */
export async function lfiTestingApi<T>(
  path: string,
  init: { method?: 'GET' | 'POST'; body?: unknown; signal?: AbortSignal } = {},
): Promise<ApiResult<T>> {
  const hasBody = init.body !== undefined
  const res = await fetch(`${API_BASE}${path}`, {
    method: init.method ?? 'GET',
    credentials: 'include',
    headers: hasBody
      ? { Accept: 'application/json', 'Content-Type': 'application/json' }
      : { Accept: 'application/json' },
    ...(hasBody ? { body: JSON.stringify(init.body) } : {}),
    ...(init.signal ? { signal: init.signal } : {}),
  })
  const json: unknown = await res.json().catch(() => null)
  if (res.ok) return { status: res.status, ok: true, data: json as T, err: null }
  const err = json && typeof json === 'object' ? (json as ErrorBody) : null
  return { status: res.status, ok: false, data: null, err }
}

export function lfiTestingNetworkMessage(e: unknown): string {
  const why = e instanceof Error ? e.message : 'network error'
  return `Could not reach the testing service (${why}).`
}

/** What POST /lfi-testing/runs is sent — and what "Run again" repeats. */
interface RunRequest {
  uploadId: string
  testId: string
  inputs: Record<string, unknown>
}

/** How one run went: the run as last read, and why it could not start or be followed to its end. */
interface RunOutcome {
  run: Run | null
  error: string | null
  errorDetail: string | null
  errorOnForm: boolean
  /** Start no more: the session is gone, access was refused, or the page stopped following. */
  stop: boolean
}

/** One of several tests run together, and how it went. */
export interface BatchItem {
  testId: string
  /** The test's name within its group. */
  title: string
  /** `done` once it finished, or could not start (`error`, no `run`); `not-run` if the batch stopped first. */
  state: 'waiting' | 'running' | 'done' | 'not-run'
  /** The run as last read; null until the API has started it. */
  run: Run | null
  error: string | null
  errorDetail: string | null
  /** Some of the refused run's problems are marked against the form's fields. */
  errorOnForm: boolean
}

/** Wait `ms`, or less if `signal` aborts first. */
function pause(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve()
      return
    }
    const done = (): void => {
      clearTimeout(timer)
      signal.removeEventListener('abort', done)
      resolve()
    }
    const timer = setTimeout(done, ms)
    signal.addEventListener('abort', done)
  })
}

export function useLfiTesting() {
  const { auth, loadMe, signIn } = useSandboxAuth()

  // ── Form: fields ───────────────────────────────────────────────────────────
  const environment = ref<HubEnv>('preprod')
  const lfiCode = ref('')
  const redirectUri = ref('')
  const jwtAuthEnabled = ref(false)
  const jwtAudience = ref('')
  /**
   * The chosen tests, in catalogue order: one, or any of a `multiple` group's
   * sub-tests. No default: the user chooses the test before anything else.
   */
  const testIds = ref<string[]>([])
  /** The chosen test (the first, when several are). Setting it chooses that test alone. */
  const testId = computed<string | null>({
    get: () => testIds.value[0] ?? null,
    set: (id) => { testIds.value = id ? [id] : [] },
  })

  // ── Form: files (memory only) ──────────────────────────────────────────────
  const slots = reactive(
    Object.fromEntries(SLOT_IDS.map((id) => [id, { file: null, error: null }])) as Record<SlotId, SlotState>,
  )

  // ── Form: test inputs ──────────────────────────────────────────────────────
  /**
   * Per form key (the test ID, or the group for tests run together — formKeyOf),
   * per input ID: what the form holds. Kept while the user switches tests.
   */
  const drafts = reactive<Record<string, Record<string, LfiTestInputDraft>>>({})
  /** Per form key, the inputs the user has changed. Defaults never overwrite these. */
  const edited = reactive<Record<string, Record<string, true>>>({})

  // ── Tests ──────────────────────────────────────────────────────────────────
  const tests = ref<LfiTest[]>([])
  const testsLoading = ref(false)
  const testsError = ref<string | null>(null)

  // ── Session ────────────────────────────────────────────────────────────────
  /** Set by a 401: the API no longer accepts the session, whatever /me said. */
  const sessionLost = ref(false)
  /** A 403 on a background call (the recent-runs list), in the API's words. */
  const accessError = ref<string | null>(null)

  /** Signed in, not blocked, Nebras staff, and the API has not refused the session. */
  const allowed = computed(() =>
    auth.value.loaded && auth.value.authenticated && !auth.value.blocked
      && auth.value.isAdmin === true && !sessionLost.value,
  )

  // ── Upload and run ─────────────────────────────────────────────────────────
  const phase = ref<'idle' | 'uploading' | 'running'>('idle')
  const elapsed = ref(0)
  const upload = ref<UploadRecord | null>(null)
  const uploadError = ref<string | null>(null)
  const uploadErrorDetail = ref<string | null>(null)
  const serverErrors = ref<Partial<Record<FieldKey | SlotId, string>>>({})
  /** Per-input messages from refused runs, keyed '<id>' or '<id>.<part>', for the form (formKeyOf) they concern. */
  const runFieldErrors = ref<{ key: string; fields: Record<string, string> } | null>(null)
  /** The shown run: while one is followed, as last read. */
  const run = ref<Run | null>(null)
  /** Several tests run together, each with how it went; null when one was run. */
  const batch = ref<{ items: BatchItem[] } | null>(null)
  const runError = ref<string | null>(null)
  const runErrorDetail = ref<string | null>(null)
  /** Some of the refused run's problems are marked against the form's fields. */
  const runErrorOnForm = ref(false)
  /** False when the API refused the run request itself (400): repeating it would not help. */
  const runRetryable = ref(true)
  /** What "Run again" / "Try again" re-runs: the shown run, or the last one asked for. */
  const lastRequest = ref<RunRequest | null>(null)
  const recentRuns = ref<RunListItem[]>([])
  const openingRunId = ref<string | null>(null)

  // ── Derived ────────────────────────────────────────────────────────────────
  const selectedTests = computed(() => tests.value.filter((t) => testIds.value.includes(t.id)))
  const selectedTest = computed(() => selectedTests.value[0] ?? null)
  /** The chosen tests are a `multiple` group's, run together. */
  const multiple = computed(() => !!selectedTest.value?.group.multiple)
  const formKey = computed(() => (selectedTest.value ? formKeyOf(selectedTest.value) : null))
  /** The form's title: the test's, or the group's when its tests run together. */
  const formTitle = computed(() =>
    (multiple.value ? selectedTest.value?.group.title : selectedTest.value?.title) ?? '',
  )
  /** The inputs the form shows: the chosen tests', each once. */
  const formInputs = computed(() => unionInputs(selectedTests.value))

  /** What the upload must carry: whatever any chosen test needs. */
  const needs = computed<LfiTestNeeds | null>(() => {
    const chosen = selectedTests.value
    if (!chosen.length) return null
    return {
      lfiCertificates: chosen.some((t) => t.needs.lfiCertificates),
      redirectUri: chosen.some((t) => t.needs.redirectUri),
    }
  })

  const hosts = computed(() => {
    const code = lfiCode.value.trim() || 'lfi-code'
    return HUB_SERVICES
      .filter((s) => !s.c3 || !!needs.value?.lfiCertificates)
      .map(({ service, role }) => ({
        service, role, code, host: `${service}.${code}.${environment.value}.apihub.openfinance.ae`,
      }))
  })

  const requiredSlots = computed<SlotId[]>(() => {
    if (!needs.value) return []
    if (!needs.value.lfiCertificates) return TPP_SLOTS
    return jwtAuthEnabled.value ? [...TPP_SLOTS, ...C3_SLOTS, 'c3SigningKey'] : [...TPP_SLOTS, ...C3_SLOTS]
  })

  /** The form's inputs as it holds them. */
  const inputDrafts = computed<Record<string, LfiTestInputDraft>>(() =>
    (formKey.value && drafts[formKey.value]) || {},
  )

  /** Client-side checks of the form's inputs. Required-ness included; the page decides when to show them. */
  const inputErrors = computed<InputErrors>(() => checkInputs(formInputs.value, inputDrafts.value))

  /** Refused runs' messages for the form's inputs. */
  const inputServerErrors = computed<Record<string, string>>(() =>
    runFieldErrors.value && runFieldErrors.value.key === formKey.value ? runFieldErrors.value.fields : {},
  )

  /** Client-side checks only. Required-ness included; the page decides when to show them. */
  const fieldErrors = computed<Record<FieldKey, string | null>>(() => {
    let redirectUriError: string | null = null
    if (needs.value?.redirectUri) {
      const uri = redirectUri.value.trim()
      if (!uri) redirectUriError = 'Enter the TPP redirect URI.'
      else {
        let url: URL | null = null
        try { url = new URL(uri) } catch { /* reported below */ }
        if (!url) redirectUriError = 'Not a valid URL.'
        else if (url.protocol !== 'https:') redirectUriError = 'Must be an https:// URL.'
        else if (url.hash) redirectUriError = 'A redirect URI must not contain a fragment (#…).'
      }
    }

    return {
      environment: HUB_ENVS.some((e) => e.value === environment.value && e.available)
        ? null : 'Choose an environment.',
      lfiCode: LFIS.some((l) => l.code === lfiCode.value) ? null : 'Choose an LFI.',
      redirectUri: redirectUriError,
      jwtAudience: null,
      testId: selectedTest.value ? null : 'Choose a test.',
    }
  })

  /**
   * What still stands between the user and "Upload and run", by label. Until a
   * test is chosen that is the test alone. Client checks only: an error the API
   * reported is shown against its field but does not block a retry.
   */
  const missing = computed<string[]>(() => {
    const test = selectedTest.value
    if (!test) return [FIELD_LABEL.testId]
    const out: string[] = []
    for (const [key, err] of Object.entries(fieldErrors.value) as [FieldKey, string | null][]) {
      if (err) out.push(FIELD_LABEL[key])
    }
    for (const s of requiredSlots.value) {
      if (!slots[s].file || slots[s].error) out.push(FILE_SLOTS[s].label)
    }
    const errorKeys = Object.keys(inputErrors.value)
    for (const def of formInputs.value) {
      if (errorKeys.some((k) => k === def.id || k.startsWith(`${def.id}.`))) out.push(def.label)
    }
    return out
  })

  const ready = computed(() => missing.value.length === 0)

  /** POST /lfi-testing/uploads: only what the chosen test needs. */
  const uploadBody = computed(() => {
    const n = needs.value
    const files: Partial<Record<SlotId, string>> = {}
    for (const s of requiredSlots.value) files[s] = slots[s].file?.text ?? ''
    return {
      environment: environment.value,
      lfiCode: lfiCode.value,
      cmVersion: CM_VERSION,
      ...(n?.redirectUri ? { redirectUri: redirectUri.value.trim() } : {}),
      ...(n?.lfiCertificates
        ? { jwtAuth: { enabled: jwtAuthEnabled.value, audience: jwtAuthEnabled.value ? jwtAudience.value.trim() : '' } }
        : {}),
      files,
    }
  })

  /** Everything the upload is made of, so the page can tell when the form has moved on. */
  const signature = computed(() => JSON.stringify(uploadBody.value))
  const uploadedSignature = ref<string | null>(null)
  const uploadStale = computed(() => !!upload.value && uploadedSignature.value !== signature.value)

  // ── Field-level server errors clear when the field changes ─────────────────
  function clearServerError(key: FieldKey | SlotId): void {
    if (!(key in serverErrors.value)) return
    const next = { ...serverErrors.value }
    delete next[key]
    serverErrors.value = next
  }

  const FIELD_SOURCES: [FieldKey, () => unknown][] = [
    ['environment', () => environment.value],
    ['lfiCode', () => lfiCode.value],
    ['redirectUri', () => redirectUri.value],
    ['jwtAudience', () => jwtAudience.value],
    ['testId', () => testId.value],
  ]
  for (const [key, source] of FIELD_SOURCES) watch(source, () => clearServerError(key))

  // An upload error belongs to the form that produced it.
  watch(signature, () => {
    uploadError.value = null
    uploadErrorDetail.value = null
  })

  // ── Test inputs ────────────────────────────────────────────────────────────
  /**
   * Fill the form's inputs with their defaults — the catalogue's, then the
   * chosen LFI's on top (see LfiOption.inputDefaults) — leaving alone any input
   * the user has changed.
   */
  function applyDefaults(): void {
    const chosen = selectedTests.value
    const key = formKey.value
    if (!chosen.length || !key) return
    const lfi = LFIS.find((l) => l.code === lfiCode.value)
    if (!drafts[key]) drafts[key] = {}
    const values = drafts[key]!
    const changed = edited[key] ?? {}
    const lfiDefaults: Record<string, LfiTestInputValue> = { ...lfi?.inputDefaults[chosen[0]!.group.id] }
    for (const t of chosen) if (t.subgroup) Object.assign(lfiDefaults, lfi?.inputDefaults[t.subgroup.id])
    for (const t of chosen) Object.assign(lfiDefaults, lfi?.inputDefaults[t.id])
    for (const def of formInputs.value) {
      if (changed[def.id]) continue
      values[def.id] = toDraft(def, lfiDefaults[def.id])
        ?? (def.type === 'choice' ? toDraft(def, def.default) : null)
        ?? emptyDraft(def)
    }
  }

  // Choosing a test, or an LFI, fills in the defaults.
  watch([selectedTests, lfiCode], () => applyDefaults(), { immediate: true })

  /** Tick or untick one of a `multiple` group's sub-tests; a test of another group is chosen alone. */
  function toggleTest(id: string): void {
    const test = tests.value.find((t) => t.id === id)
    if (!test?.available || !test.group.multiple) return
    if (selectedTest.value?.group.id !== test.group.id) {
      testIds.value = [id]
      return
    }
    const picked = new Set(testIds.value)
    if (picked.has(id)) picked.delete(id)
    else picked.add(id)
    testIds.value = tests.value.filter((t) => picked.has(t.id)).map((t) => t.id)
  }

  /** Set one of the form's inputs, as the user typed or ticked it. */
  function setInputDraft(inputId: string, value: LfiTestInputDraft): void {
    const key = formKey.value
    if (!key) return
    if (!drafts[key]) drafts[key] = {}
    drafts[key]![inputId] = value
    if (!edited[key]) edited[key] = {}
    edited[key]![inputId] = true
    clearRunFieldErrors(key, inputId)
  }

  function clearRunFieldErrors(forKey: string, inputId: string): void {
    const cur = runFieldErrors.value
    if (!cur || cur.key !== forKey) return
    const keys = Object.keys(cur.fields).filter((k) => k === inputId || k.startsWith(`${inputId}.`))
    if (!keys.length) return
    const fields = { ...cur.fields }
    for (const k of keys) delete fields[k]
    runFieldErrors.value = { key: cur.key, fields }
  }

  // ── Files ──────────────────────────────────────────────────────────────────
  async function loadFile(slot: SlotId, file: File | null | undefined): Promise<void> {
    const state = slots[slot]
    state.file = null
    state.error = null
    clearServerError(slot)
    if (!file) return
    if (file.size > MAX_PEM_BYTES) {
      state.error = `${file.name} is ${Math.round(file.size / 1024)} KB — over the 16 KB limit, too large to be a PEM certificate or key.`
      return
    }
    let raw: string
    try {
      raw = await file.text()
    } catch {
      state.error = `${file.name} could not be read.`
      return
    }
    const parsed = parsePem(slot, file.name, raw)
    if (typeof parsed === 'string') state.error = parsed
    else state.file = parsed
  }

  function clearFile(slot: SlotId): void {
    slots[slot].file = null
    slots[slot].error = null
    clearServerError(slot)
  }

  // ── LFI ────────────────────────────────────────────────────────────────────
  /** Choose an LFI: sets the code, its redirect URI, and its defaults for the chosen test's inputs. */
  function selectLfi(code: string): void {
    const lfi = LFIS.find((l) => l.code === code)
    if (!lfi) return
    lfiCode.value = lfi.code
    redirectUri.value = lfi.redirectUri
    applyDefaults()
  }

  // Start with the first LFI chosen — while there is only one, that is the choice.
  if (LFIS[0]) selectLfi(LFIS[0].code)

  // ── Session ────────────────────────────────────────────────────────────────
  /** Any 401: the session is gone. Re-read /me and show the sign-in step. */
  function onUnauthorised(): void {
    sessionLost.value = true
    recentRuns.value = []
    void loadMe()
  }

  // ── Tests ──────────────────────────────────────────────────────────────────
  async function loadTests(): Promise<void> {
    testsLoading.value = true
    testsError.value = null
    try {
      const r = await lfiTestingApi<{ tests?: unknown }>('/lfi-testing/tests')
      if (!r.ok) {
        tests.value = []
        testsError.value = r.err?.error ?? `Could not load the tests (${r.status}).`
        return
      }
      tests.value = parseLfiTestCatalogue(r.data?.tests)
      if (!tests.value.length) testsError.value = 'No tests are available.'
      testIds.value = testIds.value.filter((id) => tests.value.some((t) => t.id === id))
    } catch (e) {
      tests.value = []
      testsError.value = lfiTestingNetworkMessage(e)
    } finally {
      testsLoading.value = false
    }
  }

  // ── Upload and run ─────────────────────────────────────────────────────────
  /** 400 (with optional per-field messages), 403, 503 and the rest. */
  function applyUploadError(status: number, err: ErrorBody | null): void {
    uploadError.value = err?.error ?? `The test could not start (${status}).`
    const extra: string[] = []
    if (err?.detail) extra.push(String(err.detail))
    const mapped: Partial<Record<FieldKey | SlotId, string>> = {}
    if (err?.fields && typeof err.fields === 'object') {
      for (const [name, message] of Object.entries(err.fields)) {
        const key = mapServerField(name)
        if (key) mapped[key] = String(message)
        else extra.push(`${name}: ${String(message)}`)
      }
    }
    serverErrors.value = mapped
    uploadErrorDetail.value = extra.length ? extra.join('\n') : null
  }

  /** Whether the form currently shows the field a server message is about. */
  function fieldShown(key: FieldKey | SlotId): boolean {
    if (key in FILE_SLOTS) return requiredSlots.value.includes(key as SlotId)
    if (key === 'redirectUri') return !!needs.value?.redirectUri
    if (key === 'jwtAudience') return !!needs.value?.lfiCertificates && jwtAuthEnabled.value
    return true
  }

  /**
   * A refused run's per-field messages ('inputs.<id>[.<part>]', 'files.<slot>',
   * 'redirectUri'). When the run came from the form and the form still shows that
   * test, they are marked against its fields; otherwise they are listed. `keep`
   * adds its input messages to those already marked (tests run together share
   * the inputs); otherwise they replace them.
   */
  function applyRunError(err: ErrorBody | null, forTest: string, fromForm: boolean, keep = false): void {
    const extra: string[] = []
    if (err?.detail) extra.push(String(err.detail))
    const test = tests.value.find((t) => t.id === forTest)
    const formOf = test ? formKeyOf(test) : forTest
    const onForm = fromForm && testIds.value.includes(forTest) && formKey.value === formOf
    const inputs: Record<string, string> = {}
    const fields: Partial<Record<FieldKey | SlotId, string>> = {}
    if (err?.fields && typeof err.fields === 'object') {
      for (const [rawName, message] of Object.entries(err.fields)) {
        const name = withoutIndex(rawName)
        const text = String(message)
        if (name.startsWith('inputs.')) {
          const key = name.slice('inputs.'.length)
          const id = key.split('.')[0] ?? key
          const def = test?.inputs.find((d) => d.id === id)
          if (onForm && def) inputs[key] = text
          else extra.push(`${def?.label ?? id}${key === id ? '' : ` (${key.slice(id.length + 1)})`}: ${text}`)
          continue
        }
        const key = mapServerField(name)
        if (onForm && key && fieldShown(key)) fields[key] = text
        else extra.push(`${key ? fieldLabel(key) : rawName}: ${text}`)
      }
    }
    const kept = keep && runFieldErrors.value?.key === formOf ? runFieldErrors.value.fields : {}
    const marked = { ...kept, ...inputs }
    runFieldErrors.value = Object.keys(marked).length ? { key: formOf, fields: marked } : null
    if (Object.keys(fields).length) serverErrors.value = { ...serverErrors.value, ...fields }
    runErrorOnForm.value = Object.keys(inputs).length + Object.keys(fields).length > 0
    runErrorDetail.value = extra.length ? extra.join('\n') : null
  }

  let clock: ReturnType<typeof setInterval> | null = null
  function stopClock(): void {
    if (clock) clearInterval(clock)
    clock = null
  }
  function startClock(): void {
    stopClock()
    const t0 = Date.now()
    elapsed.value = 0
    clock = setInterval(() => { elapsed.value = Math.floor((Date.now() - t0) / 1000) }, 1000)
  }
  onScopeDispose(stopClock)

  /** Aborted to stop following the run in progress, and to start no more of a batch. */
  let following: AbortController | null = null

  /** Stop following: the run carries on on the server, and no more of a batch starts. Also on leaving the page. */
  function stopFollowing(): void {
    following?.abort()
    following = null
  }
  onScopeDispose(stopFollowing)

  /**
   * POST one run and follow it to its end. The API answers 202 with the run
   * `running` and goes on in the background, so it is read again every POLL_MS
   * until it is not; an API that runs it synchronously answers 200 with the run
   * finished. `onRun` gets the run each time it is read. Sets the run error
   * state as a single run always has; `keepFieldErrors` adds to the input
   * messages already marked rather than replacing them.
   */
  async function runOne(
    req: RunRequest,
    fromForm: boolean,
    keepFieldErrors: boolean,
    signal: AbortSignal,
    onRun: (r: Run) => void,
  ): Promise<RunOutcome> {
    runError.value = null
    runErrorDetail.value = null
    runErrorOnForm.value = false
    runRetryable.value = true
    lastRequest.value = req
    startClock()
    const outcome = (r: Run | null, stop = false): RunOutcome => ({
      run: r, error: runError.value, errorDetail: runErrorDetail.value, errorOnForm: runErrorOnForm.value, stop,
    })
    const stopped = (r: Run | null): RunOutcome => {
      runError.value = STOPPED_MESSAGE
      return outcome(r, true)
    }

    // Start it. The POST has its own time limit, and stops with the page.
    const post = new AbortController()
    const abortPost = (): void => post.abort()
    signal.addEventListener('abort', abortPost)
    const timer = setTimeout(abortPost, RUN_TIMEOUT_MS)
    let current: Run
    try {
      const r = await lfiTestingApi<{ run?: Run }>('/lfi-testing/runs', {
        method: 'POST',
        body: req,
        signal: post.signal,
      })
      if (r.status === 401) {
        onUnauthorised()
        return outcome(null, true)
      }
      if (!r.ok || !r.data?.run) {
        runError.value = r.err?.error ?? (r.ok ? 'No run came back.' : `The run could not start (${r.status}).`)
        runRetryable.value = r.status !== 400
        applyRunError(r.err, req.testId, fromForm, keepFieldErrors)
        return outcome(null, r.status === 403)
      }
      current = r.data.run
    } catch (e) {
      if (signal.aborted) return stopped(null)
      runError.value = post.signal.aborted
        ? `No answer after ${RUN_TIMEOUT_MS / 1000} seconds. The run may still finish on the server — check Recent runs.`
        : lfiTestingNetworkMessage(e)
      return outcome(null)
    } finally {
      clearTimeout(timer)
      signal.removeEventListener('abort', abortPost)
    }
    onRun(current)

    // Follow it. A read that fails is tried again, up to MAX_MISSES in a row.
    const since = Date.now()
    let misses = 0
    while (current.status === 'running') {
      await pause(POLL_MS, signal)
      if (signal.aborted) return stopped(current)
      if (Date.now() - since > FOLLOW_LIMIT_MS) {
        runError.value = `Still running after ${FOLLOW_LIMIT_MS / 60_000} minutes, so no longer followed here. It may yet finish — check Recent runs.`
        return outcome(current)
      }
      let r: ApiResult<{ run?: Run }>
      try {
        r = await lfiTestingApi<{ run?: Run }>(`/lfi-testing/runs/${encodeURIComponent(current.id)}`, { signal })
      } catch (e) {
        if (signal.aborted) return stopped(current)
        if (++misses < MAX_MISSES) continue
        runError.value = `${lfiTestingNetworkMessage(e)} The run may still finish on the server — check Recent runs.`
        return outcome(current)
      }
      if (r.status === 401) {
        onUnauthorised()
        return outcome(current, true)
      }
      if (!r.ok || !r.data?.run) {
        if (r.status !== 403 && ++misses < MAX_MISSES) continue
        runError.value = r.err?.error
          ?? `Could not follow the run (${r.status}). It may still finish on the server — check Recent runs.`
        return outcome(current, r.status === 403)
      }
      misses = 0
      current = r.data.run
      onRun(current)
    }
    return outcome(current)
  }

  /** A test's name within its group, for the batch list. */
  function shortTitle(id: string): string {
    const t = tests.value.find((x) => x.id === id)
    return t?.subtitle ?? t?.title ?? id
  }

  /**
   * Run the requests one after another, each followed to its end before the
   * next starts. One that fails or cannot start does not stop the rest; a lost
   * session, a 403 or Stop does. Several are tracked in `batch`, each with how
   * it went; the shown run is the one in progress, then the last.
   */
  async function runAll(reqs: RunRequest[], fromForm: boolean): Promise<void> {
    stopFollowing()
    const controller = new AbortController()
    following = controller
    batch.value = reqs.length > 1
      ? {
        items: reqs.map((r): BatchItem => ({
          testId: r.testId, title: shortTitle(r.testId), state: 'waiting', run: null, error: null, errorDetail: null, errorOnForm: false,
        })),
      }
      : null
    phase.value = 'running'
    try {
      for (const [i, req] of reqs.entries()) {
        const item = batch.value?.items[i] ?? null
        if (item) item.state = 'running'
        run.value = null
        const outcome = await runOne(req, fromForm, i > 0, controller.signal, (r) => {
          run.value = r
          if (item) item.run = r
        })
        if (item) {
          Object.assign(item, {
            state: 'done', run: outcome.run, error: outcome.error, errorDetail: outcome.errorDetail, errorOnForm: outcome.errorOnForm,
          })
        }
        if (allowed.value) void loadRecentRuns()
        if (outcome.stop) break
      }
    } finally {
      for (const item of batch.value?.items ?? []) if (item.state === 'waiting') item.state = 'not-run'
      stopClock()
      if (following === controller) following = null
      phase.value = 'idle'
    }
  }

  async function uploadAndRun(): Promise<void> {
    const chosen = selectedTests.value
    if (!allowed.value || !ready.value || phase.value !== 'idle' || !chosen.length) return
    // Each test is sent only its own inputs, from the values the form shares.
    const values = inputDrafts.value
    const planned = chosen.map((t) => ({ testId: t.id, inputs: runInputsFor(t, values) }))
    uploadError.value = null
    uploadErrorDetail.value = null
    serverErrors.value = {}
    runFieldErrors.value = null
    phase.value = 'uploading'
    const sentSignature = signature.value
    let uploaded: UploadRecord | null = null
    try {
      const r = await lfiTestingApi<{ upload?: UploadRecord }>('/lfi-testing/uploads', { method: 'POST', body: uploadBody.value })
      if (r.status === 401) onUnauthorised()
      else if (!r.ok || !r.data?.upload) applyUploadError(r.status, r.err)
      else uploaded = r.data.upload
    } catch (e) {
      uploadError.value = lfiTestingNetworkMessage(e)
    }
    if (!uploaded) {
      phase.value = 'idle'
      return
    }
    upload.value = uploaded
    uploadedSignature.value = sentSignature
    const uploadId = uploaded.id
    await runAll(planned.map((p) => ({ uploadId, ...p })), true)
  }

  /**
   * Re-run the shown run's upload, test and inputs — or the last request if it
   * failed to start. A run recorded without inputs re-runs with the inputs sent.
   */
  const rerunTarget = computed<RunRequest | null>(() => {
    const r = run.value
    if (!r) return lastRequest.value
    const last = lastRequest.value
    const inputs = isRecord(r.inputs)
      ? r.inputs
      : last && last.uploadId === r.uploadId && last.testId === r.testId ? last.inputs : {}
    return { uploadId: r.uploadId, testId: r.testId, inputs }
  })

  /** False when the shown run's test is no longer in the catalogue, so it cannot be run again. */
  const rerunAvailable = computed(() =>
    !run.value || !tests.value.length || tests.value.some((t) => t.id === run.value?.testId),
  )

  async function runAgain(): Promise<void> {
    const target = rerunTarget.value
    if (!allowed.value || !target || phase.value !== 'idle' || !rerunAvailable.value) return
    await runAll([target], false)
  }

  // ── Recent runs ────────────────────────────────────────────────────────────
  async function loadRecentRuns(): Promise<void> {
    try {
      const r = await lfiTestingApi<{ runs?: RunListItem[] }>('/lfi-testing/runs?limit=20')
      if (r.status === 401) {
        onUnauthorised()
        return
      }
      if (r.status === 403) {
        accessError.value = r.err?.error ?? 'Access was refused (403).'
        return
      }
      if (r.ok && Array.isArray(r.data?.runs)) recentRuns.value = r.data.runs
    } catch { /* the list is a nicety — say nothing */ }
  }

  // Once the page knows the user may use the tool, show what has run before.
  watch(allowed, (ok) => { if (ok) void loadRecentRuns() }, { immediate: true })

  async function openRun(id: string): Promise<void> {
    if (phase.value !== 'idle' || openingRunId.value) return
    openingRunId.value = id
    runError.value = null
    runErrorDetail.value = null
    runErrorOnForm.value = false
    runRetryable.value = true
    try {
      const r = await lfiTestingApi<{ run?: Run }>(`/lfi-testing/runs/${encodeURIComponent(id)}`)
      if (r.status === 401) {
        onUnauthorised()
        return
      }
      if (!r.ok || !r.data?.run) {
        runError.value = r.err?.error ?? `Could not load the run (${r.status}).`
        return
      }
      const opened = r.data.run
      run.value = opened
      lastRequest.value = {
        uploadId: opened.uploadId,
        testId: opened.testId,
        inputs: isRecord(opened.inputs) ? opened.inputs : {},
      }
    } catch (e) {
      runError.value = lfiTestingNetworkMessage(e)
    } finally {
      openingRunId.value = null
    }
  }

  return {
    // session
    auth, allowed, sessionLost, accessError, loadMe, signIn,
    // form
    environment, lfiCode, redirectUri, jwtAuthEnabled, jwtAudience, testId, testIds, slots, requiredSlots, hosts, needs,
    fieldErrors, serverErrors, missing, ready,
    // test inputs
    formKey, formTitle, formInputs, inputDrafts, inputErrors, inputServerErrors, setInputDraft,
    // tests
    tests, testsLoading, testsError, selectedTest, selectedTests, multiple,
    // upload and run
    phase, elapsed, upload, uploadStale, uploadError, uploadErrorDetail,
    run, runError, runErrorDetail, runErrorOnForm, runRetryable, rerunTarget, rerunAvailable, batch,
    recentRuns, openingRunId,
    // actions
    loadFile, clearFile, selectLfi, loadTests, toggleTest, uploadAndRun, runAgain, openRun, stopFollowing,
  }
}
