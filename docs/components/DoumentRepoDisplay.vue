<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  orgId: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    required: true,
    validator: (v) => v === 'public' || v === 'private'
  },
  name: {
    type: String,
    required: true
  },
  legalName: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  }
})

const DOCS_API = 'https://docs.nebras-open-finance.com'

const LOGIN_MARKER_KEY = 'nebras_docs_login_attempt'
const LOGIN_COOLDOWN_MS = 30_000

const files = ref([])
const loading = ref(true)
const redirecting = ref(false)
const error = ref('')
const forbidden = ref(false)
const loopDetected = ref(false)
const search = ref('')

const isNebras = ref(false)
const uploadFiles = ref([])
const uploading = ref(false)
const uploadError = ref('')
const uploadSuccess = ref('')
const fileInput = ref(null)

async function loadFiles() {
  loading.value = true
  redirecting.value = false
  error.value = ''
  forbidden.value = false
  loopDetected.value = false
  try {
    const res = await fetch(`${DOCS_API}/${props.orgId}/${props.visibility}`, {
      credentials: 'include',
    })

    if (res.status === 401 && props.visibility === 'private') {
      const marker = Number(sessionStorage.getItem(LOGIN_MARKER_KEY) || 0)
      if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
        sessionStorage.removeItem(LOGIN_MARKER_KEY)
        loopDetected.value = true
        files.value = []
        return
      }
      sessionStorage.setItem(LOGIN_MARKER_KEY, String(Date.now()))
      redirecting.value = true
      const redirect = encodeURIComponent(window.location.href)
      window.location.href = `${DOCS_API}/login?redirect=${redirect}`
      return
    }
    sessionStorage.removeItem(LOGIN_MARKER_KEY)
    if (res.status === 403 && props.visibility === 'private') {
      forbidden.value = true
      files.value = []
      return
    }
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `HTTP ${res.status}`)
    }
    files.value = await res.json()
  } catch (e) {
    error.value = e.message
    files.value = []
  } finally {
    if (!redirecting.value) loading.value = false
  }
}

async function loadSession() {
  try {
    const res = await fetch(`${DOCS_API}/me`, { credentials: 'include' })
    if (!res.ok) return
    const body = await res.json()
    isNebras.value = body.authenticated === true && body.isNebras === true
  } catch {
    // ignore; upload UI simply won't show
  }
}

async function handleUpload() {
  if (!uploadFiles.value.length) return
  uploading.value = true
  uploadError.value = ''
  uploadSuccess.value = ''
  const results = { ok: 0, failed: [] }
  try {
    for (const file of uploadFiles.value) {
      const encodedName = file.name.split('/').map(encodeURIComponent).join('/')
      const url = `${DOCS_API}/${props.orgId}/${props.visibility}/${encodedName}`
      const res = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file,
      })
      if (res.ok) {
        results.ok++
      } else {
        const body = await res.json().catch(() => ({}))
        results.failed.push(`${file.name}: ${body.error || `HTTP ${res.status}`}`)
      }
    }
    if (results.failed.length) {
      uploadError.value = results.failed.join('; ')
    }
    if (results.ok) {
      uploadSuccess.value = `Uploaded ${results.ok} file${results.ok === 1 ? '' : 's'}.`
      uploadFiles.value = []
      if (fileInput.value) fileInput.value.value = ''
      await loadFiles()
    }
  } catch (e) {
    uploadError.value = e.message
  } finally {
    uploading.value = false
  }
}

function onFilesSelected(e) {
  uploadFiles.value = Array.from(e.target.files || [])
  uploadError.value = ''
  uploadSuccess.value = ''
}

onMounted(() => {
  loadSession()
  loadFiles()
})
watch(() => [props.orgId, props.visibility], loadFiles)

const filteredFiles = computed(() => {
  const query = search.value.toLowerCase().trim()
  if (!query) return files.value
  return files.value.filter((f) => f.name.toLowerCase().includes(query))
})

const fileType = (name) => {
  const ext = name.split('.').pop()
  return ext && ext !== name ? ext.toUpperCase() : ''
}

const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

const downloadHref = (file) =>
  `${DOCS_API}/${props.orgId}/${props.visibility}/${file}`

function retrySignIn() {
  sessionStorage.removeItem(LOGIN_MARKER_KEY)
  loadFiles()
}

const titleSuffix = computed(() =>
  props.visibility === 'private' ? 'Private Documents' : 'Public Documents'
)
const descriptionPrefix = computed(() =>
  props.visibility === 'private' ? 'Private' : 'Public'
)
</script>

<template>
  <div v-if="visibility === 'private' && (loading || redirecting)" class="access-check">
    <div class="access-check-spinner"></div>
    <div class="access-check-text">{{ redirecting ? 'Redirecting to sign-in…' : 'Checking access…' }}</div>
  </div>

  <div v-else-if="forbidden" class="doc-forbidden">
    <div class="doc-forbidden-header">You don't have access to this space</div>
    <div class="doc-forbidden-body">Your account isn't a member of this organisation. If you believe this is a mistake, contact your organisation's administrator.</div>
  </div>

  <div v-else-if="loopDetected" class="doc-forbidden">
    <div class="doc-forbidden-header">Sign-in didn't complete</div>
    <div class="doc-forbidden-body">We tried to sign you in but the session didn't stick. Try again, and if this keeps happening, check that third-party cookies are allowed for this site.</div>
    <button class="doc-action-button doc-retry-button" @click="retrySignIn">Try again</button>
  </div>

  <template v-else>
    <div class="org-header">
      <img v-if="logo" class="org-logo" :src="logo" alt="logo" />
      <h1>{{ name }} — {{ titleSuffix }}</h1>
    </div>

    <p>{{ descriptionPrefix }} documentation for <strong>{{ legalName }}</strong>.</p>

    <div v-if="isNebras" class="upload-panel">
      <div class="upload-header">
        <span class="upload-title">Upload documents</span>
        <span class="upload-hint">Files go to <code>{{ orgId }}/{{ visibility }}/</code></span>
      </div>
      <div class="upload-row">
        <input
          ref="fileInput"
          type="file"
          multiple
          class="upload-input"
          @change="onFilesSelected"
          :disabled="uploading"
        />
        <button
          class="doc-action-button upload-button"
          :disabled="uploading || !uploadFiles.length"
          @click="handleUpload"
        >
          {{ uploading ? 'Uploading…' : `Upload${uploadFiles.length ? ` (${uploadFiles.length})` : ''}` }}
        </button>
      </div>
      <div v-if="uploadError" class="upload-error">{{ uploadError }}</div>
      <div v-if="uploadSuccess" class="upload-success">{{ uploadSuccess }}</div>
    </div>

    <div class="search-box">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        v-model="search"
        type="text"
        placeholder="Search documents..."
      />
    </div>

    <div class="doc-table">
      <div class="doc-table-header">
        <span>File Name</span>
        <span>Type</span>
        <span>Date</span>
        <span>Action</span>
      </div>

      <div v-if="loading" class="doc-rows">
        <div v-for="n in 3" :key="n" class="doc-table-row doc-skeleton-row">
          <span class="skeleton skeleton-name"></span>
          <span class="skeleton skeleton-small"></span>
          <span class="skeleton skeleton-small"></span>
          <span class="skeleton skeleton-button"></span>
        </div>
      </div>
      <div v-else-if="error" class="doc-empty">Could not load documents: {{ error }}</div>

      <div v-else-if="filteredFiles.length" class="doc-rows">
        <div
          v-for="file in filteredFiles"
          :key="file.file"
          class="doc-table-row"
        >
          <span class="doc-table-item doc-name">{{ file.name }}</span>
          <span class="doc-table-item">{{ fileType(file.name) }}</span>
          <span class="doc-table-item">{{ formatDate(file.date) }}</span>
          <a
            class="doc-action-button"
            :href="downloadHref(file.file)"
            download
          >
            <svg class="doc-download-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
        </div>
      </div>

      <div v-else class="doc-empty">No documents available.</div>
    </div>
  </template>
</template>

<style scoped>
.access-check {
  min-height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.access-check-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #1043b3;
  border-radius: 50%;
  animation: access-spin 0.8s linear infinite;
}

.access-check-text {
  color: #6b7280;
  font-size: 0.95rem;
}

@keyframes access-spin {
  to { transform: rotate(360deg); }
}

.search-box {
  position: relative;
  width: calc(100% - 2px);
  margin: 20px 0 16px 0;
  box-sizing: border-box;
}

.search-box input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: 0.2s;
  box-sizing: border-box;
}

.search-box input:focus {
  border-color: #1043b3;
  box-shadow: 0 0 0 3px rgba(16, 67, 179, 0.1);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  opacity: 0.5;
  pointer-events: none;
}

.doc-table {
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  text-align: left;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.doc-table-header,
.doc-table-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  column-gap: 12px;
  padding: 12px 16px;
}

.doc-table-header {
  background: #f8fafc;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.85rem;
  color: #374151;
}

.doc-table-row {
  border-bottom: 1px solid rgba(214, 209, 214, 0.95);
}

.doc-table-item {
  align-self: center;
  color: #1f2937;
  font-size: 0.95rem;
}

.doc-name {
  justify-self: start;
  text-align: left;
}

.doc-action-button {
  justify-self: center;
  align-self: center;
  padding: 8px 14px;
  background: #1043b3;
  color: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: auto;
  gap: 6px;
  text-decoration: none;
}

.doc-action-button:hover {
  background: #0d3791;
}

.doc-download-icon {
  height: 16px;
  width: 16px;
}

.doc-empty {
  padding: 14px 16px;
  color: #6b7280;
}

.doc-forbidden {
  padding: 48px 24px;
  text-align: center;
  color: #991b1b;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.doc-forbidden-header {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.doc-forbidden-body {
  color: #6b7280;
  max-width: 480px;
}

.doc-retry-button {
  margin-top: 16px;
  border: none;
  cursor: pointer;
}

.upload-panel {
  margin: 20px 0 16px 0;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.upload-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.upload-title {
  font-weight: 600;
  color: #1f2937;
}

.upload-hint {
  font-size: 0.85rem;
  color: #6b7280;
}

.upload-hint code {
  background: rgba(16, 67, 179, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.upload-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.upload-input {
  flex: 1;
  min-width: 200px;
  padding: 8px;
  background: #fff;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
}

.upload-button {
  border: none;
}

.upload-button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.upload-error {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #991b1b;
}

.upload-success {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #166534;
}

.skeleton {
  display: block;
  height: 14px;
  background: linear-gradient(90deg, #e2e8f0 0%, #edf2f7 50%, #e2e8f0 100%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}

.skeleton-name {
  justify-self: start;
  width: 70%;
  max-width: 220px;
}

.skeleton-small {
  width: 50%;
  max-width: 80px;
}

.skeleton-button {
  width: 100px;
  height: 32px;
  border-radius: 6px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
