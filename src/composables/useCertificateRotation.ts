// Certificate rotation — submit a CSR to the directory and get back the
// certificate it issues. Client for POST /certificates/rotate on the reports API
// (standards-api), ported from reports/src/scripts/createOrgCertificate.js.
//
// SANDBOX ONLY for now. Production is shown, disabled, so the page already has
// the shape it will have once the API grows a production path.
//
// Sign-in works like the PII report: the directory call acts as the signed-in
// person, so a 401 bounces to Trust Framework SSO. Unlike the PII report the
// request is NOT re-sent automatically on return — it creates a certificate, so
// the form is restored and the user presses the button again knowingly.
//
// Every check here is repeated by the API; these exist so mistakes show up as
// you type rather than as a refused request.

import { ref, computed, watch } from 'vue'
import { API_BASE, withRedirect, type ReportEnv } from './useReports'
import { rememberSignInReturn, clearSignInReturn } from './useSignInReturn'

export type CertType = 'Sig2' | 'S1' | 'S3'

/** Mirrors CERT_TYPES in standards-api services/reports/certificate.js. */
export const CERT_TYPES: Record<CertType, { usage: string; type: string }> = {
  Sig2: { usage: 'Signing', type: 'opf_uae_server_signing' },
  S1: { usage: 'Transport', type: 'opf_uae_server_transport' },
  S3: { usage: 'Transport', type: 'opf_uae_server_transport' },
}

/** The environments rotation can run in today. Production follows. */
export const ROTATION_ENVS: ReportEnv[] = ['sandbox']

const ORG_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const UUID_IN_TEXT_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
/** The label in rs1.<code>.apihub.openfinance.ae — a DNS label. */
const LFI_CODE_RE = /^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])$/
const CSR_RE = /^-----BEGIN (NEW )?CERTIFICATE REQUEST-----\s*\n([A-Za-z0-9+/=\s]+?)\n-----END (NEW )?CERTIFICATE REQUEST-----\s*$/
export const MAX_CSR_BYTES = 16 * 1024

const LOGIN_COOLDOWN_MS = 120_000
const RESUME_TTL_MS = 10 * 60_000
const MARKER_KEY = 'nebras_cert_rotation_login_attempt'
const FORM_KEY = 'nebras_cert_rotation_form'

export interface ParsedCsr {
  name: string
  text: string
  /** The OU — the organisation the CSR was generated for — if one is present. */
  organisationId: string | null
}

export interface RotationResult {
  env: ReportEnv
  organisationId: string
  certType: CertType
  certificateType: string
  description: string
  certificate: unknown
}

/**
 * Check a file's text is one PEM certificate request and nothing else.
 * @returns an error message, or the parsed CSR.
 */
export function parseCsr(name: string, raw: string): ParsedCsr | string {
  if (/PRIVATE KEY/.test(raw)) {
    return 'This file contains a private key. Never upload a private key — upload the certificate signing request only.'
  }
  const text = raw.replace(/\r\n?/g, '\n').trim()
  const match = text.match(CSR_RE)
  if (!match) {
    return /BEGIN CERTIFICATE-----/.test(text)
      ? 'This is an issued certificate, not a certificate signing request.'
      : 'Not a certificate signing request. Expected one PEM block starting "-----BEGIN CERTIFICATE REQUEST-----".'
  }
  let der: string
  try {
    der = atob((match[2] ?? '').replace(/\s/g, ''))
  } catch {
    return 'The certificate signing request is corrupt: its body is not valid base64.'
  }
  if (der.length < 64 || der.charCodeAt(0) !== 0x30) {
    return 'The certificate signing request is corrupt: its body is not valid DER.'
  }
  return { name, text, organisationId: der.match(UUID_IN_TEXT_RE)?.[0].toLowerCase() ?? null }
}

export function useCertificateRotation() {
  const env = ref<ReportEnv>('sandbox')
  const organisationId = ref('')
  const lfiCode = ref('')
  const certType = ref<CertType | null>(null)
  const csr = ref<ParsedCsr | null>(null)
  const csrError = ref<string | null>(null)

  const busy = ref(false)
  const error = ref<string | null>(null)
  const errorDetail = ref<string | null>(null)
  const result = ref<RotationResult | null>(null)
  const redirecting = ref(false)
  const loopDetected = ref(false)
  /** True when the form was restored after a sign-in round trip. */
  const restored = ref(false)

  const orgIdNorm = computed(() => organisationId.value.trim().toLowerCase())

  const orgIdError = computed(() => {
    if (!orgIdNorm.value) return 'Enter the organisation ID.'
    if (!ORG_ID_RE.test(orgIdNorm.value)) {
      return 'Must be a UUID, e.g. a084403e-b182-4369-8ec2-2e22b125b78c.'
    }
    if (csr.value?.organisationId && csr.value.organisationId !== orgIdNorm.value) {
      return `The CSR was generated for organisation ${csr.value.organisationId}. The two must match.`
    }
    return null
  })

  const lfiCodeError = computed(() => {
    const v = lfiCode.value.trim()
    if (!v) return 'Enter the LFI code.'
    if (v.length < 2 || v.length > 32) return 'Must be 2–32 characters.'
    if (!LFI_CODE_RE.test(v)) {
      return 'Lowercase letters, digits and hyphens only, not starting or ending with a hyphen.'
    }
    return null
  })

  const description = computed(() =>
    `${lfiCode.value.trim() || '<lfi-code>'} - ${certType.value ?? '<type>'} - Ozone - Certificate Rotation`,
  )

  const ready = computed(() =>
    !!csr.value && !orgIdError.value && !lfiCodeError.value && !!certType.value,
  )

  // A result belongs to the inputs that produced it.
  watch([organisationId, lfiCode, certType, csr], () => {
    result.value = null
    error.value = null
    errorDetail.value = null
  })

  async function loadCsr(file: File | null | undefined): Promise<void> {
    csrError.value = null
    csr.value = null
    if (!file) return
    if (file.size > MAX_CSR_BYTES) {
      csrError.value = `${file.name} is ${Math.round(file.size / 1024)} KB — too large to be a certificate signing request.`
      return
    }
    const parsed = parseCsr(file.name, await file.text())
    if (typeof parsed === 'string') {
      csrError.value = parsed
      return
    }
    csr.value = parsed
    // The CSR names its organisation; save typing it when the field is empty.
    if (parsed.organisationId && !organisationId.value.trim()) organisationId.value = parsed.organisationId
  }

  function clearCsr(): void {
    csr.value = null
    csrError.value = null
  }

  function saveForm(): void {
    try {
      window.sessionStorage.setItem(FORM_KEY, JSON.stringify({
        t: Date.now(),
        organisationId: organisationId.value,
        lfiCode: lfiCode.value,
        certType: certType.value,
        // A CSR holds only public material, so it is safe to park here.
        csr: csr.value,
      }))
    } catch { /* private mode — the user re-enters the form */ }
  }

  /** Call from onMounted: puts back a form interrupted by sign-in. */
  function restore(): void {
    if (typeof window === 'undefined') return
    let raw: string | null = null
    try {
      raw = window.sessionStorage.getItem(FORM_KEY)
      if (raw) window.sessionStorage.removeItem(FORM_KEY)
    } catch {
      return
    }
    if (!raw) return
    try {
      const saved = JSON.parse(raw)
      if (!saved.t || Date.now() - saved.t > RESUME_TTL_MS) return
      organisationId.value = String(saved.organisationId ?? '')
      lfiCode.value = String(saved.lfiCode ?? '')
      certType.value = saved.certType in CERT_TYPES ? saved.certType : null
      if (saved.csr?.text) {
        const parsed = parseCsr(String(saved.csr.name ?? 'request.csr'), String(saved.csr.text))
        if (typeof parsed !== 'string') csr.value = parsed
      }
      restored.value = true
    } catch { /* corrupt entry — start clean */ }
  }

  /** Same loop guard as useReports: do not bounce twice inside the cooldown. */
  function startSignIn(target: string): boolean {
    if (typeof window === 'undefined') return false
    let marker = 0
    try { marker = Number(window.sessionStorage.getItem(MARKER_KEY) || 0) } catch { /* ignore */ }
    if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
      try { window.sessionStorage.removeItem(MARKER_KEY) } catch { /* ignore */ }
      loopDetected.value = true
      return false
    }
    try { window.sessionStorage.setItem(MARKER_KEY, String(Date.now())) } catch { /* ignore */ }
    saveForm()
    rememberSignInReturn()
    redirecting.value = true
    window.location.href = withRedirect(target)
    return true
  }

  function clearMarker(): void {
    try { window.sessionStorage.removeItem(MARKER_KEY) } catch { /* ignore */ }
    clearSignInReturn()
  }

  async function submit(): Promise<void> {
    if (!ready.value || busy.value || !ROTATION_ENVS.includes(env.value)) return
    error.value = null
    errorDetail.value = null
    result.value = null
    loopDetected.value = false
    restored.value = false
    busy.value = true
    try {
      const res = await fetch(`${API_BASE}/certificates/rotate?env=${env.value}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organisationId: orgIdNorm.value,
          lfiCode: lfiCode.value.trim(),
          certType: certType.value,
          csr: csr.value!.text,
        }),
      })
      const body = await res.json().catch(() => null)

      if (!res.ok) {
        if (res.status === 401 && startSignIn(body?.login_url ?? `${API_BASE}/login/${env.value}`)) return
        error.value = body?.error ?? `Request failed (${res.status})`
        errorDetail.value = body?.detail ?? null
        return
      }

      clearMarker()
      result.value = body as RotationResult
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Network error'
    } finally {
      busy.value = false
    }
  }

  function retry(): void {
    clearMarker()
    loopDetected.value = false
    void submit()
  }

  return {
    env, organisationId, lfiCode, certType, csr, csrError,
    orgIdError, lfiCodeError, description, ready,
    busy, error, errorDetail, result, redirecting, loopDetected, restored,
    loadCsr, clearCsr, restore, submit, retry,
  }
}
