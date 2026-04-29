<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CURRENT_VERSION } from '@/data/versions'

interface FormData {
  client_id: string
  roles: string[]
  redirect_uri: string
  transport_key_id: string
  signing_key_id: string
  discovery_uri: string
  key_file_name: string
  key_content: string
}

const ROLES = ['BDSP (Bank Data Sharing)', 'BSIP (Payments / Service Initiation)']
const MODEL_BANK_DISCOVERY = 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration'

const route = useRoute()
const currentVersion = computed<string>(() => {
  const match = route.path.match(/\/(v\d+\.\d+)\//)
  return match?.[1] ?? CURRENT_VERSION
})

const formData = reactive<FormData>({
  client_id: '',
  roles: [],
  redirect_uri: '',
  transport_key_id: '',
  signing_key_id: '',
  discovery_uri: MODEL_BANK_DISCOVERY,
  key_file_name: '',
  key_content: '',
})

const complete = ref(false)
const uploadError = ref('')
const discoveryError = ref('')
const isDownloading = ref(false)

function setRoles(val: string) {
  const i = formData.roles.indexOf(val)
  if (i >= 0) formData.roles.splice(i, 1)
  else formData.roles.push(val)
}

function setField<K extends keyof FormData>(key: K, payload: { data: string | number | undefined }) {
  formData[key] = ((payload.data as string) ?? '') as FormData[K]
  if (key === 'discovery_uri') discoveryError.value = ''
}

async function handleKeyUpload(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file) return
  if (!/\.(key|pem|txt)$/i.test(file.name)) {
    uploadError.value = 'Please upload a .key, .pem or .txt private key file.'
    formData.key_file_name = ''
    formData.key_content = ''
    return
  }
  const text = await file.text()
  if (!/-----BEGIN[\w\s]+PRIVATE KEY-----/.test(text) || !/-----END[\w\s]+PRIVATE KEY-----/.test(text)) {
    uploadError.value = 'File does not appear to be a valid PEM private key. Expected -----BEGIN PRIVATE KEY----- / -----END PRIVATE KEY----- headers.'
    formData.key_file_name = ''
    formData.key_content = ''
    return
  }
  uploadError.value = ''
  formData.key_file_name = file.name
  formData.key_content = text
}

function showError(key: string): string {
  if (!complete.value) return ''
  if (key === 'client_id' && !formData.client_id) return 'Field is required.'
  if (key === 'role' && formData.roles.length === 0) return 'One role is required.'
  if (key === 'redirect_uri') {
    if (!formData.redirect_uri) return 'Field is required.'
    try { new URL(formData.redirect_uri) } catch { return 'Must be a valid URI.' }
  }
  if (key === 'transport_key_id' && !formData.transport_key_id) return 'Field is required.'
  if (key === 'signing_key_id' && !formData.signing_key_id) return 'Field is required.'
  if (key === 'discovery_uri') {
    if (!formData.discovery_uri) return 'Field is required.'
    if (!/^https:\/\/auth1\.[a-zA-Z0-9-]{1,15}\.(sandbox|preprod|uat)\.apihub\.openfinance\.ae\/\.well-known\/openid-configuration$/.test(formData.discovery_uri))
      return 'Must match: https://auth1.[LFI-CODE].(sandbox|preprod).apihub.openfinance.ae/.well-known/openid-configuration'
  }
  if (key === 'key_upload' && !formData.key_file_name) return 'Signing .key file is required.'
  return ''
}

async function submit() {
  if (isDownloading.value) return
  complete.value = true
  discoveryError.value = ''
  if (
    showError('client_id') || showError('role') || showError('redirect_uri') ||
    showError('transport_key_id') || showError('signing_key_id') ||
    showError('key_upload') || showError('discovery_uri')
  ) {
    window.scrollTo({ top: 300, behavior: 'smooth' })
    return
  }

  isDownloading.value = true
  try {
    // Pattern-derived fallbacks if the discovery doc fetch fails.
    const discoveryUrl = new URL(formData.discovery_uri)
    const issuerPattern = discoveryUrl.origin
    const rs = issuerPattern.replace(/^(https:\/\/)auth1\./, '$1rs1.')
    const as1Base = issuerPattern.replace(/^(https:\/\/)auth1\./, '$1as1.')

    let issuer = issuerPattern
    let authEndpoint = issuerPattern + '/auth'
    let tokenEndpoint = as1Base + '/token'
    let parEndpoint = as1Base + '/par'
    let jwksUrl = ''

    try {
      const encodedUrl = encodeURIComponent(formData.discovery_uri)
      let r = await fetch(`/api/well-known-proxy?url=${encodedUrl}`)
      if (!r.ok) r = await fetch(`https://api.allorigins.win/raw?url=${encodedUrl}`)
      if (r.ok) {
        const doc = await r.json()
        issuer        = doc.issuer                                ?? issuer
        authEndpoint  = doc.authorization_endpoint                ?? authEndpoint
        tokenEndpoint = doc.token_endpoint                        ?? tokenEndpoint
        parEndpoint   = doc.pushed_authorization_request_endpoint ?? parEndpoint
        jwksUrl       = doc.jwks_uri                              ?? jwksUrl
      }
    } catch { /* fall through to pattern-derived defaults */ }

    const hasBanking = formData.roles.some(r => r.includes('BDSP') || r.includes('BSIP'))
    if (!hasBanking) return

    const url = 'https://raw.githubusercontent.com/Nebras-Open-Finance/postman/main/banking.postman_collection.json'
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch collection: ${response.status}`)
    const json = await response.json()

    const cv = currentVersion.value
    json.item = json.item.filter((folder: { name: string }) =>
      folder.name === 'TPP Onboarding' || folder.name.toLowerCase() === cv.toLowerCase()
    )
    json.info.name = `Banking ${cv.toUpperCase()}`

    const hasBDSP = formData.roles.some(r => r.includes('BDSP'))
    const hasBSIP = formData.roles.some(r => r.includes('BSIP'))

    const subFolderRoleMap: Record<string, () => boolean> = {
      'Data Sharing':                                  () => hasBDSP,
      'Service Initiation':                            () => hasBSIP,
      'Confirmation Of Payee APIs (application/jwt)':  () => hasBSIP,
      'Payment Rail':                                  () => hasBSIP,
      'Products & Leads':                              () => hasBDSP,
      'Atms':                                          () => hasBDSP,
      'Example 2 - With Accounts & Balances':          () => hasBDSP && hasBSIP,
      'Example 3 - With Accounts & Balances':          () => hasBDSP && hasBSIP,
      'Example 4 - With Accounts & Balances':          () => hasBDSP && hasBSIP,
    }

    const versionFolder = json.item.find((f: { name: string }) => f.name.toLowerCase() === cv.toLowerCase())
    if (versionFolder?.item) {
      versionFolder.item = versionFolder.item.filter((sub: { name: string }) => {
        const check = subFolderRoleMap[sub.name]
        return check ? check() : true
      })
    }

    const foldersToRemove = new Set([
      'LFI-API Hub:',
      'TPP-API Hub: Get OIDC well-known end-point',
      'Confirm with Heimdall',
      'AuthFlow - with login_hint',
      'AuthFlow - with jwt-auth mandatory',
      '(with login_hint)',
      '(with jwt-auth mandatory)',
    ])
    type ItemNode = { name: string; item?: ItemNode[]; request?: { body?: { raw?: string } } }
    const removeLFI = (items: ItemNode[]): ItemNode[] => items
      .filter(item => ![...foldersToRemove].some(name => item.name.includes(name)))
      .map(item => item.item ? { ...item, item: removeLFI(item.item) } : item)
    json.item = removeLFI(json.item)

    let collectionStr = JSON.stringify(json, null, 2)
    const swap = (haystack: string, needle: string, value: string) =>
      haystack.split(needle).join(value)
    collectionStr = swap(collectionStr, '{{issuer}}',         issuer)
    collectionStr = swap(collectionStr, '{{rs}}',             rs)
    collectionStr = swap(collectionStr, '{{kid-local}}',      formData.signing_key_id)
    collectionStr = swap(collectionStr, '{{_clientId}}',      formData.client_id)
    collectionStr = swap(collectionStr, '{{pem-local}}',      formData.key_content.replace(/[\r\n]/g, ''))
    collectionStr = swap(collectionStr, '{{redirectUrl}}',    formData.redirect_uri)
    collectionStr = swap(collectionStr, '{{par-endpoint}}',   parEndpoint)
    collectionStr = swap(collectionStr, '{{tokenEndpoint}}',  tokenEndpoint)
    collectionStr = swap(collectionStr, '{{auth-endpoint}}',  authEndpoint)
    collectionStr = swap(collectionStr, '{{jwksUrl}}',        jwksUrl)

    const blob = new Blob([collectionStr], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `Banking ${cv.toUpperCase()}.postman_collection.json`
    a.click()
    URL.revokeObjectURL(a.href)
  } finally {
    isDownloading.value = false
  }
}
</script>

<template>
  <form class="psb" @submit.prevent="submit">

    <div class="psb__field">
      <div class="psb__row">
        <FormInput
          placeholder="Client ID"
          name="client_id"
          :input="formData.client_id"
          :error="!!showError('client_id')"
          @output="(v) => setField('client_id', v)"
        />
        <InfoTooltip class="psb__tooltip">
          <strong>Client ID</strong> &mdash; use the client_id from your Trust Framework application detail page.
          See: <a href="/tech/tpp-standards/trust-framework/creating-an-application#your-client-id">Trust Framework client_id</a>
        </InfoTooltip>
      </div>
      <p v-if="showError('client_id') === ''" class="psb__hint">
        Looks like: <code>https://rp.sandbox.directory.openfinance.ae/openid_relying_party/c6fb03a0-…</code>
      </p>
      <p class="psb__error" aria-live="polite">{{ showError('client_id') }}</p>
    </div>

    <div class="psb__field">
      <div class="psb__label-row">
        <span class="psb__label">Client roles</span>
        <InfoTooltip class="psb__tooltip">
          <strong>Client roles</strong> &mdash; pick the roles assigned to your app (BDSP for data sharing, BSIP for payments / service initiation).
          See: <a href="/tech/tpp-standards/trust-framework/roles">roles reference</a>
        </InfoTooltip>
      </div>
      <div class="psb__chips">
        <button
          v-for="opt in ROLES"
          :key="opt"
          type="button"
          class="psb-chip"
          :class="{
            'psb-chip--active': formData.roles.includes(opt),
            'psb-chip--error':  !!showError('role'),
          }"
          @click="setRoles(opt)"
        >{{ opt }}</button>
      </div>
      <p class="psb__error" aria-live="polite">{{ showError('role') }}</p>
    </div>

    <div class="psb__field">
      <div class="psb__row">
        <FormInput
          placeholder="Redirect URI"
          name="redirect_uri"
          :input="formData.redirect_uri"
          :error="!!showError('redirect_uri')"
          @output="(v) => setField('redirect_uri', v)"
        />
        <InfoTooltip class="psb__tooltip">
          <strong>Redirect URI</strong> &mdash; must exactly match a redirect URI registered on your Trust Framework application.
          See: <a href="/tech/tpp-standards/trust-framework/redirect-uri">redirect URI guidance</a>
        </InfoTooltip>
      </div>
      <p class="psb__error" aria-live="polite">{{ showError('redirect_uri') }}</p>
    </div>

    <div class="psb__field">
      <div class="psb__row">
        <FormInput
          placeholder="Client Transport Key ID"
          name="transport_key_id"
          :input="formData.transport_key_id"
          :error="!!showError('transport_key_id')"
          @output="(v) => setField('transport_key_id', v)"
        />
        <InfoTooltip class="psb__tooltip">
          <strong>Transport key ID</strong> &mdash; the kid from your transport certificate details in the Trust Framework.
          See: <a href="/tech/tpp-standards/trust-framework/certificates">mTLS certificates</a>
        </InfoTooltip>
      </div>
      <p class="psb__error" aria-live="polite">{{ showError('transport_key_id') }}</p>
    </div>

    <div class="psb__field">
      <div class="psb__row">
        <FormInput
          placeholder="Client Signing Key ID"
          name="signing_key_id"
          :input="formData.signing_key_id"
          :error="!!showError('signing_key_id')"
          @output="(v) => setField('signing_key_id', v)"
        />
        <InfoTooltip class="psb__tooltip">
          <strong>Signing key ID</strong> &mdash; the kid from your signing certificate details in the Trust Framework.
          See: <a href="/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid">finding your key ID (kid)</a>
        </InfoTooltip>
      </div>
      <p class="psb__error" aria-live="polite">{{ showError('signing_key_id') }}</p>
    </div>

    <div class="psb__field">
      <div class="psb__label-row">
        <span class="psb__label">Signing private key</span>
      </div>
      <label class="psb-upload" :class="{ 'psb-upload--error': showError('key_upload') || uploadError }">
        <span class="psb-upload__btn">Choose file</span>
        <span class="psb-upload__name">{{ formData.key_file_name || 'No file chosen' }}</span>
        <input type="file" accept=".key,.pem,.txt" class="psb-upload__input" @change="handleKeyUpload" />
      </label>
      <p class="psb__hint">Accepted: <code>.key</code>, <code>.pem</code> or <code>.txt</code> private key files.</p>
      <p v-if="!showError('key_upload') && !uploadError" class="psb__hint psb__hint--strong">
        While we accept your signing private key here to bootstrap sandbox testing, this is for testing only.
        In production, never share private keys — they must stay inside your environment.
        See <a href="/policy/secure-management">Secure Management of Keys and Credentials</a>.
      </p>
      <p class="psb__error" aria-live="polite">{{ showError('key_upload') || uploadError }}</p>
    </div>

    <div class="psb__field">
      <div class="psb__row">
        <FormInput
          placeholder="LFI Discovery Endpoint"
          name="discovery_uri"
          :input="formData.discovery_uri"
          :error="!!showError('discovery_uri') || !!discoveryError"
          @output="(v) => setField('discovery_uri', v)"
        />
        <InfoTooltip class="psb__tooltip">
          <strong>LFI Discovery URL</strong> &mdash; the .well-known endpoint of the target LFI; the model bank URL is prefilled.
          See: <a href="/tech/tpp-standards/trust-framework/well-known">The .well-known Endpoint</a>
        </InfoTooltip>
      </div>
      <p v-if="showError('discovery_uri') === ''" class="psb__hint">
        Model bank: <code>https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration</code><br>
        Pre-prod: <code>https://auth1.<mark>[LFI&nbsp;CODE]</mark>.preprod.apihub.openfinance.ae/.well-known/openid-configuration</code>
      </p>
      <p class="psb__error" aria-live="polite">{{ showError('discovery_uri') || discoveryError }}</p>
    </div>

    <div class="psb__actions">
      <button type="submit" class="psb-cta" :disabled="isDownloading">
        <svg class="psb-cta__logo" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.227.227 0 0 0-.117.061l-.32.319-1.314-1.314.32-.319c.16-.16.42-.16.58 0l.851.851a.227.227 0 0 0 0 .402zm6.272-3.124-2.79 2.79c-.063.063-.16.072-.232.022l-.582-.412 4.012-4.012c.099.108.165.245.187.392.04.408-.215.799-.595 1.22zm3.491-3.328l-1.578 1.395-1.083-1.083 1.397-1.58c.27-.31.737-.34 1.043-.072.31.27.34.737.072 1.043z"/>
        </svg>
        <span>{{ isDownloading ? 'Preparing…' : 'Download Postman collection' }}</span>
        <span class="psb-cta__arrow" aria-hidden="true">↗</span>
      </button>
    </div>

    <p class="psb__version">
      This collection is for API version <strong>{{ currentVersion }}</strong>.
      Switch versions via the navigation header. See the <a :href="`/tech/tpp-standards/${currentVersion}/getting-started/postman`">Postman guide</a> for details.
    </p>

  </form>
</template>

<style scoped>
.psb {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
  max-width: 42rem;
}

.psb__field {
  width: 100%;
}

/* Input + tooltip side-by-side row. The InfoTooltip lives outside the
   FormInput's frame so its icon never overlaps the input border. */
.psb__row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.psb__row > .psb__tooltip { flex: none; }
/* FormInput is the .fi root; let it consume the remaining width. */
.psb__row > .fi { flex: 1; min-width: 0; }

/* Label + tooltip row used above non-input controls (chip group, file
   upload). Tooltip aligns with the eyebrow label, not the control below. */
.psb__label-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.65rem;
}

.psb__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
  padding-left: 0.1rem;
}

.psb__hint {
  margin: 0.5rem 0 0;
  padding-left: 0.25rem;
  font-family: var(--at-sans);
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--at-mute-2);
  max-width: 36rem;
}
.psb__hint--strong { color: var(--at-navy-deep); }
.psb__hint code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.05em 0.35em;
}
.psb__hint mark {
  background: var(--at-gold-soft);
  color: var(--at-navy-deep);
  padding: 0 0.25em;
}
.psb__hint a {
  color: var(--at-teal-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.psb__hint a:hover { color: var(--at-navy-deep); }

.psb__error {
  min-height: 1.1rem;
  margin: 0.5rem 0 0;
  padding-left: 0.25rem;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: #B33A3A;
}

/* Role chips */
.psb__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.psb-chip {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy-deep);
  padding: 0.7rem 1rem;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.psb-chip:hover:not(.psb-chip--active) {
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.psb-chip--active {
  background: var(--at-teal-deep);
  border-color: var(--at-teal-deep);
  color: var(--at-surface);
}
.psb-chip--error {
  border-color: #B33A3A;
  color: #B33A3A;
}

/* File upload */
.psb-upload {
  display: inline-flex;
  align-items: stretch;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  cursor: pointer;
  max-width: 36rem;
}
.psb-upload__btn {
  padding: 0.7rem 1.1rem;
  background: var(--at-bg-cream);
  border-right: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy-deep);
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;
}
.psb-upload:hover .psb-upload__btn {
  background: var(--at-teal-deep);
  color: var(--at-surface);
  border-right-color: var(--at-teal-deep);
}
.psb-upload__name {
  padding: 0.7rem 1rem;
  font-family: var(--at-sans);
  font-size: 0.85rem;
  color: var(--at-mute-2);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: center;
}
.psb-upload__input { display: none; }
.psb-upload--error,
.psb-upload--error .psb-upload__btn {
  border-color: #B33A3A;
}
.psb-upload--error .psb-upload__btn { color: #B33A3A; }

/* Postman CTA — Postman brand orange retained intentionally. */
.psb__actions {
  display: flex;
  justify-content: flex-start;
  padding-top: 0.5rem;
}
.psb-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.95rem 1.5rem;
  background: #FF6C37;
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
.psb-cta:hover:not(:disabled) {
  background: var(--at-navy-deep);
}
.psb-cta:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.psb-cta__logo { width: 18px; height: 18px; flex: none; }
.psb-cta__arrow { font-size: 0.95rem; }

.psb__version {
  margin: 0.25rem 0 0;
  padding: 0.85rem 1rem;
  background: var(--at-bg-cream);
  border-left: 2px solid var(--at-teal);
  font-family: var(--at-sans);
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}
.psb__version strong {
  color: var(--at-navy-deep);
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}
.psb__version a {
  color: var(--at-teal-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.psb__version a:hover { color: var(--at-navy-deep); }
</style>
