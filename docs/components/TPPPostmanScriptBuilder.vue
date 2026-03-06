<template>
  <div class="builder">
    <h2>Generate Your Postman Bootstrap Script</h2>
    <p>
      Complete all required fields, then download a TPP-specific script for the Postman
      <code>Tests</code> tab.
    </p>

    <div class="grid">
      <label class="field">
        <span class="field-title">
          Client ID (<code>tf_client_id</code>)
          <button type="button" class="help-link" @click="openGuidance('client_id')">(?)</button>
        </span>
        <input v-model.trim="form.tf_client_id" type="text" placeholder="UUID from Trust Framework application" />
      </label>

      <fieldset class="field role-field">
        <legend class="field-title">
          Roles (<code>tf_roles</code>)
          <button type="button" class="help-link" @click="openGuidance('roles')">(?)</button>
        </legend>
        <label><input v-model="form.role_bdsp" type="checkbox" /> BDSP</label>
        <label><input v-model="form.role_bsip" type="checkbox" /> BSIP</label>
      </fieldset>

      <label class="field">
        <span class="field-title">
          Redirect URI (<code>tf_redirect_uri</code>)
          <button type="button" class="help-link" @click="openGuidance('redirect_uri')">(?)</button>
        </span>
        <input v-model.trim="form.tf_redirect_uri" type="url" placeholder="https://app.example.com/callback" />
      </label>

      <label class="field">
        <span class="field-title">
          Transport cert path (<code>tf_client_transport_pem_path</code>)
          <button type="button" class="help-link" @click="openGuidance('transport_pem')">(?)</button>
        </span>
        <input
          v-model.trim="form.tf_client_transport_pem_path"
          type="text"
          placeholder="C:\\certs\\client_transport.pem"
        />
      </label>

      <label class="field">
        <span class="field-title">
          Transport key path (<code>tf_client_transport_key_path</code>)
          <button type="button" class="help-link" @click="openGuidance('transport_key')">(?)</button>
        </span>
        <input
          v-model.trim="form.tf_client_transport_key_path"
          type="text"
          placeholder="C:\\certs\\client_transport.key"
        />
      </label>

      <label class="field">
        <span class="field-title">
          Signing key ID (<code>tf_signing_kid</code>)
          <button type="button" class="help-link" @click="openGuidance('signing_kid')">(?)</button>
        </span>
        <input v-model.trim="form.tf_signing_kid" type="text" placeholder="kid from Trust Framework signing certificate" />
      </label>

      <label class="field">
        <span class="field-title">
          LFI discovery URL (<code>tf_discovery_url</code>)
          <button type="button" class="help-link" @click="openGuidance('discovery_url')">(?)</button>
        </span>
        <input v-model.trim="form.tf_discovery_url" type="url" />
      </label>

      <label class="field field-full">
        <span class="field-title">
          Signing key PEM content (<code>tf_signing_key_pem</code>)
          <button type="button" class="help-link" @click="openGuidance('signing_key_pem')">(?)</button>
        </span>
        <textarea
          v-model="form.tf_signing_key_pem"
          rows="10"
          placeholder="Paste full content of client_signing.key"
        ></textarea>
      </label>

      <label class="field field-full">
        <span class="field-title">
          Load signing key from file (optional)
          <button type="button" class="help-link" @click="openGuidance('signing_key_file')">(?)</button>
        </span>
        <input type="file" accept=".key,.pem,.txt" @change="loadSigningKeyFile" />
      </label>
    </div>

    <div v-if="errors.length" class="errors">
      <strong>Fix these fields before download:</strong>
      <ul>
        <li v-for="err in errors" :key="err">{{ err }}</li>
      </ul>
    </div>

    <div class="actions">
      <button :disabled="!isValid" @click="downloadScript">Download Postman Script (.js)</button>
    </div>

    <div id="field-guidance" class="guidance">
      <h3>Field Guidance</h3>
      <details
        v-for="item in guidanceItems"
        :key="item.key"
        :open="activeGuidance === item.key"
        class="guidance-item"
      >
        <summary>{{ item.title }}</summary>
        <p>{{ item.text }}</p>
        <p v-if="item.link">
          Reference: <a :href="item.link">{{ item.linkText || item.link }}</a>
        </p>
      </details>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const DEFAULT_DISCOVERY_URL =
  'https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration'

const form = reactive({
  tf_client_id: '',
  role_bdsp: true,
  role_bsip: true,
  tf_redirect_uri: '',
  tf_client_transport_pem_path: '',
  tf_client_transport_key_path: '',
  tf_signing_key_pem: '',
  tf_signing_kid: '',
  tf_discovery_url: DEFAULT_DISCOVERY_URL
})

const activeGuidance = ref('client_id')

const guidanceItems = [
  {
    key: 'client_id',
    title: 'Client ID',
    text: 'Use the client_id of your application from the Trust Framework application detail page.',
    link: '/tech/tpp-standards/trust-framework/application#your-client-id'
  },
  {
    key: 'roles',
    title: 'Roles',
    text: 'Select the roles assigned to your application. This controls what functionality you can test (BDSP for data sharing, BSIP for service initiation).',
    link: '/tech/tpp-standards/trust-framework/roles'
  },
  {
    key: 'redirect_uri',
    title: 'Redirect URI',
    text: 'Use a redirect_uri already registered on your Trust Framework application. It must match exactly in authorization requests.',
    link: '/tech/tpp-standards/trust-framework/redirect-uri'
  },
  {
    key: 'transport_pem',
    title: 'Transport Certificate Path',
    text: 'Provide the local path to client_transport.pem. This certificate is used for mTLS when calling onboarding, auth, and resource endpoints.',
    link: '/tech/tpp-standards/trust-framework/certificates'
  },
  {
    key: 'transport_key',
    title: 'Transport Key Path',
    text: 'Provide the local path to client_transport.key paired with your transport certificate.',
    link: '/tech/tpp-standards/trust-framework/certificates'
  },
  {
    key: 'signing_kid',
    title: 'Signing Key ID (kid)',
    text: 'Use the kid of your signing certificate exactly as shown in Trust Framework certificate details.',
    link: '/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid'
  },
  {
    key: 'discovery_url',
    title: 'LFI Discovery URL',
    text: 'Use the target LFI .well-known URL. For model bank use the default sandbox discovery endpoint.',
    link: '/tech/tpp-standards/v2.1/banking/testing/model-bank'
  },
  {
    key: 'signing_key_pem',
    title: 'Signing Key PEM',
    text: 'Paste full content of client_signing.key. This is used in sandbox tooling only.',
    link: '/tech/tpp-standards/security/fapi/o3-utils'
  },
  {
    key: 'signing_key_file',
    title: 'Signing Key File Upload',
    text: 'Optional shortcut to load client_signing.key content into the form instead of copy/paste.',
    link: '/tech/tpp-standards/security/fapi/message-signing'
  }
]

const roles = computed(() => {
  const selected = []
  if (form.role_bdsp) selected.push('BDSP')
  if (form.role_bsip) selected.push('BSIP')
  return selected
})

const errors = computed(() => {
  const list = []
  if (!form.tf_client_id) list.push('Client ID is required.')
  if (!roles.value.length) list.push('At least one role (BDSP or BSIP) is required.')
  if (!form.tf_redirect_uri) list.push('Redirect URI is required.')
  if (!form.tf_client_transport_pem_path) list.push('Transport certificate path is required.')
  if (!form.tf_client_transport_key_path) list.push('Transport key path is required.')
  if (!form.tf_signing_key_pem.trim()) list.push('Signing key PEM content is required.')
  if (!form.tf_signing_kid) list.push('Signing key ID (kid) is required.')
  if (!form.tf_discovery_url) list.push('Discovery URL is required.')

  if (form.tf_client_id && !isLikelyUuid(form.tf_client_id)) {
    list.push('Client ID should be a UUID from the Trust Framework.')
  }
  if (form.tf_redirect_uri && !isLikelyUrl(form.tf_redirect_uri)) {
    list.push('Redirect URI must be a valid URL.')
  }
  if (form.tf_discovery_url && !isLikelyUrl(form.tf_discovery_url)) {
    list.push('Discovery URL must be a valid URL.')
  }
  if (form.tf_signing_key_pem && !form.tf_signing_key_pem.includes('BEGIN')) {
    list.push('Signing key PEM looks invalid (missing BEGIN marker).')
  }

  return list
})

const isValid = computed(() => errors.value.length === 0)

function isLikelyUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function isLikelyUrl(value) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

function openGuidance(key) {
  activeGuidance.value = key
  const section = document.getElementById('field-guidance')
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function sanitizeFilePart(value) {
  return value.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 48)
}

function escapeForJsSingleQuote(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

async function loadSigningKeyFile(event) {
  const input = event.target
  if (!input?.files?.length) return
  const file = input.files[0]
  form.tf_signing_key_pem = await file.text()
}

function buildScript() {
  const tfRoles = roles.value.join(',')
  const cfg = {
    tf_client_id: form.tf_client_id,
    tf_roles: tfRoles,
    tf_redirect_uri: form.tf_redirect_uri,
    tf_client_transport_pem_path: form.tf_client_transport_pem_path,
    tf_client_transport_key_path: form.tf_client_transport_key_path,
    tf_signing_key_pem: form.tf_signing_key_pem,
    tf_signing_kid: form.tf_signing_kid,
    tf_discovery_url: form.tf_discovery_url
  }

  return `/**
 * Generated by Nebras TPP Sandbox Quickstart
 * Usage:
 * 1) In Postman, create request: GET ${escapeForJsSingleQuote(cfg.tf_discovery_url)}
 * 2) Paste this script in the Tests tab of that request.
 * 3) Send request once to populate environment variables for this TPP.
 *
 * mTLS note:
 * Postman scripts cannot install client certificates.
 * Configure certificates manually in Postman Settings -> Certificates:
 * - CRT: ${escapeForJsSingleQuote(cfg.tf_client_transport_pem_path)}
 * - KEY: ${escapeForJsSingleQuote(cfg.tf_client_transport_key_path)}
 */

const cfg = ${JSON.stringify(cfg, null, 2)};

const roles = cfg.tf_roles
  .split(',')
  .map((r) => r.trim().toUpperCase())
  .filter(Boolean);

const hasBDSP = roles.includes('BDSP');
const hasBSIP = roles.includes('BSIP');
if (!hasBDSP && !hasBSIP) {
  throw new Error('tf_roles must include BDSP and/or BSIP');
}

const scopeParts = ['openid'];
if (hasBDSP) scopeParts.push('accounts');
if (hasBSIP) scopeParts.push('payments');
const roleScope = scopeParts.join(' ');

for (const [k, v] of Object.entries(cfg)) {
  pm.environment.set(k, v);
}

let jsonData;
try {
  jsonData = pm.response.json();
} catch (e) {
  throw new Error('Discovery response is not valid JSON.');
}

const registrationEndpoint = jsonData.registration_endpoint;
if (!registrationEndpoint) {
  throw new Error('registration_endpoint is missing in discovery document.');
}
const rs = registrationEndpoint.replace(/\\/tpp-registration$/, '');

pm.environment.set('_clientId', cfg.tf_client_id);
pm.environment.set('client_id', cfg.tf_client_id);
pm.environment.set('redirectUrl', cfg.tf_redirect_uri);
pm.environment.set('kid-local', cfg.tf_signing_kid);
pm.environment.set('pem-local', cfg.tf_signing_key_pem);
pm.environment.set('tpp_roles', roles.join(','));
pm.environment.set('scope', roleScope);

pm.environment.set('issuer', jsonData.issuer || '');
pm.environment.set('auth-endpoint', jsonData.authorization_endpoint || '');
pm.environment.set('token-endpoint', jsonData.token_endpoint || '');
pm.environment.set('par-endpoint', jsonData.pushed_authorization_request_endpoint || '');
pm.environment.set('jwksUrl', jsonData.jwks_uri || '');
pm.environment.set('registration-endpoint', registrationEndpoint);
pm.environment.set('rs', rs);

console.log('Bootstrap complete', {
  client_id: cfg.tf_client_id,
  roles,
  scope: roleScope,
  issuer: pm.environment.get('issuer'),
  rs: pm.environment.get('rs')
});
`
}

function downloadScript() {
  if (!isValid.value) return

  const script = buildScript()
  const blob = new Blob([script], { type: 'application/javascript;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `postman-bootstrap-${sanitizeFilePart(form.tf_client_id || 'tpp')}.js`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.builder {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0 28px;
  background: linear-gradient(180deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);
}

.builder h2 {
  margin: 0 0 8px;
  font-size: 22px;
}

.builder p {
  margin: 0 0 18px;
  color: var(--vp-c-text-2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.help-link {
  border: none;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font-weight: 700;
  padding: 0;
  line-height: 1;
}

.help-link:hover {
  text-decoration: underline;
}

.field-full {
  grid-column: 1 / -1;
}

.field input,
.field textarea {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.field input:focus,
.field textarea:focus {
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
  border-color: var(--vp-c-brand-1);
}

.role-field {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 10px 12px;
}

.role-field legend {
  padding: 0 6px;
}

.role-field label {
  margin-right: 16px;
}

.errors {
  margin-top: 16px;
  border: 1px solid #fca5a5;
  background: #fff1f2;
  color: #991b1b;
  padding: 10px 12px;
  border-radius: 8px;
}

.errors ul {
  margin: 8px 0 0 18px;
}

.actions {
  margin-top: 16px;
}

.actions button {
  border: none;
  background: linear-gradient(180deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border-radius: 8px;
  padding: 11px 16px;
  font-weight: 600;
  cursor: pointer;
}

.actions button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.guidance {
  margin-top: 22px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 14px;
}

.guidance h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.guidance-item {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 8px 10px;
  background: var(--vp-c-bg);
}

.guidance-item summary {
  cursor: pointer;
  font-weight: 600;
}

.guidance-item p {
  margin: 10px 0 0;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
