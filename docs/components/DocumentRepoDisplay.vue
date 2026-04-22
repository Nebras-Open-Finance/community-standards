<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import PageHeader from './WebPages/Components/PageHeader.vue'
import PageFooter from './WebPages/Components/PageFooter.vue'

const props = defineProps({
  orgId:     { type: String, required: true },
  name:      { type: String, required: true },
  legalName: { type: String, required: true },
  logo:      { type: String, default: '' },
  type:      { type: String, default: '' },
})

const DOCS_API = 'https://docs.nebras-open-finance.com'

const LOGIN_MARKER_KEY = 'nebras_docs_login_attempt'
const LOGIN_COOLDOWN_MS = 30_000

const sessionLoading = ref(true)
const redirecting   = ref(false)
const loopDetected  = ref(false)
const sessionError  = ref('')

const isAuthenticated = ref(false)
const isNebras        = ref(false)
const canSeePrivate   = ref(false)

const publicFiles  = ref([])
const privateFiles = ref([])
const publicLoading  = ref(false)
const privateLoading = ref(false)
const publicError    = ref('')
const privateError   = ref('')

const catalog        = ref({ public: [], private: [] })
const maxUploadBytes = ref(5 * 1024 * 1024)

const activeTab = ref('public')
const search    = ref('')

const uploadFile    = ref(null)
const uploading     = ref(false)
const uploadError   = ref('')
const uploadSuccess = ref('')
const selectedSlug  = ref('')
const fileInput     = ref(null)

function fileExtension(name) {
  const idx = name.lastIndexOf('.')
  if (idx <= 0 || idx === name.length - 1) return ''
  return name.slice(idx + 1)
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) return `${Number.isInteger(mb) ? mb : mb.toFixed(1)} MB`
  const kb = bytes / 1024
  return `${Number.isInteger(kb) ? kb : kb.toFixed(0)} KB`
}

async function bootstrap() {
  sessionLoading.value = true
  sessionError.value = ''
  loopDetected.value = false

  try {
    const meRes = await fetch(`${DOCS_API}/me`, { credentials: 'include' })
    const meBody = meRes.ok ? await meRes.json().catch(() => ({})) : {}

    if (!meRes.ok || meBody.authenticated !== true) {
      const marker = Number(sessionStorage.getItem(LOGIN_MARKER_KEY) || 0)
      if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
        sessionStorage.removeItem(LOGIN_MARKER_KEY)
        loopDetected.value = true
        return
      }
      sessionStorage.setItem(LOGIN_MARKER_KEY, String(Date.now()))
      redirecting.value = true
      const redirect = encodeURIComponent(window.location.href)
      window.location.href = `${DOCS_API}/login?redirect=${redirect}`
      return
    }

    sessionStorage.removeItem(LOGIN_MARKER_KEY)
    isAuthenticated.value = true
    isNebras.value = meBody.isNebras === true

    await Promise.all([
      loadPublic(),
      loadPrivate(),
      loadCatalog(),
    ])
  } catch (e) {
    sessionError.value = e.message
  } finally {
    if (!redirecting.value) sessionLoading.value = false
  }
}

async function loadPublic() {
  publicLoading.value = true
  publicError.value = ''
  try {
    const res = await fetch(`${DOCS_API}/${props.orgId}/public`, { credentials: 'include' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    publicFiles.value = await res.json()
  } catch (e) {
    publicError.value = e.message
    publicFiles.value = []
  } finally {
    publicLoading.value = false
  }
}

async function loadPrivate() {
  privateLoading.value = true
  privateError.value = ''
  try {
    const res = await fetch(`${DOCS_API}/${props.orgId}/private`, { credentials: 'include' })
    if (res.status === 403 || res.status === 401) {
      canSeePrivate.value = false
      privateFiles.value = []
      return
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    canSeePrivate.value = true
    privateFiles.value = await res.json()
  } catch (e) {
    privateError.value = e.message
    privateFiles.value = []
  } finally {
    privateLoading.value = false
  }
}

async function loadCatalog() {
  try {
    const res = await fetch(`${DOCS_API}/catalog`)
    if (!res.ok) return
    const body = await res.json()
    catalog.value = {
      public:  Array.isArray(body.public)  ? body.public  : [],
      private: Array.isArray(body.private) ? body.private : [],
    }
    if (Number.isFinite(body.maxUploadBytes) && body.maxUploadBytes > 0) {
      maxUploadBytes.value = body.maxUploadBytes
    }
  } catch {
    catalog.value = { public: [], private: [] }
  }
}

function retrySignIn() {
  sessionStorage.removeItem(LOGIN_MARKER_KEY)
  bootstrap()
}

onMounted(bootstrap)
watch(() => props.orgId, bootstrap)

watch(activeTab, () => {
  selectedSlug.value = ''
  uploadFile.value = null
  uploadError.value = ''
  uploadSuccess.value = ''
  if (fileInput.value) fileInput.value.value = ''
})

const activeFiles = computed(() =>
  activeTab.value === 'private' ? privateFiles.value : publicFiles.value
)

const activeLoading = computed(() =>
  activeTab.value === 'private' ? privateLoading.value : publicLoading.value
)

const activeError = computed(() =>
  activeTab.value === 'private' ? privateError.value : publicError.value
)

const activeCatalog = computed(() =>
  activeTab.value === 'private' ? catalog.value.private : catalog.value.public
)

const filteredFiles = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return activeFiles.value
  return activeFiles.value.filter(f => f.name.toLowerCase().includes(q))
})

const selectedLabel = computed(() =>
  activeCatalog.value.find(c => c.slug === selectedSlug.value)?.label || ''
)

const willOverwrite = computed(() => {
  if (!selectedSlug.value) return false
  return activeFiles.value.some(f => f.name.startsWith(`${selectedSlug.value}.`))
})

function fileType(name) {
  const ext = name.split('.').pop()
  return ext && ext !== name ? ext.toUpperCase() : ''
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function downloadHref(file) {
  const visibility = activeTab.value
  return `${DOCS_API}/${props.orgId}/${visibility}/${file}`
}

function onFileSelected(e) {
  uploadFile.value = e.target.files?.[0] || null
  uploadError.value = ''
  uploadSuccess.value = ''
}

async function handleUpload() {
  if (!selectedSlug.value || !uploadFile.value) return
  const ext = fileExtension(uploadFile.value.name)
  if (!ext) {
    uploadError.value = 'File must have an extension.'
    return
  }
  if (uploadFile.value.size > maxUploadBytes.value) {
    uploadError.value = `File exceeds the ${formatBytes(maxUploadBytes.value)} upload limit.`
    return
  }

  if (willOverwrite.value) {
    const ok = window.confirm(
      `This will replace the existing ${selectedLabel.value}. Continue?`
    )
    if (!ok) return
  }

  uploading.value = true
  uploadError.value = ''
  uploadSuccess.value = ''
  try {
    const visibility = activeTab.value
    const path = `${encodeURIComponent(selectedSlug.value)}.${encodeURIComponent(ext)}`
    const url = `${DOCS_API}/${props.orgId}/${visibility}/${path}`
    const res = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': uploadFile.value.type || 'application/octet-stream',
      },
      body: uploadFile.value,
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `HTTP ${res.status}`)
    }
    uploadSuccess.value = 'Upload complete.'
    selectedSlug.value = ''
    uploadFile.value = null
    if (fileInput.value) fileInput.value.value = ''
    if (activeTab.value === 'private') await loadPrivate()
    else await loadPublic()
  } catch (e) {
    uploadError.value = e.message
  } finally {
    uploading.value = false
  }
}

const typeLabel = computed(() => {
  if (!props.type) return ''
  if (props.type === 'LFI') return 'Licensed Financial Institution'
  if (props.type === 'TPP') return 'Third Party Provider'
  return props.type
})

const typeColor = computed(() => {
  if (props.type === 'LFI') return 'var(--at-teal)'
  if (props.type === 'TPP') return 'var(--at-gold)'
  return 'var(--at-blue-deep)'
})
</script>

<template>
  <div class="ed-doc">

    <PageHeader />

    <!-- ═══════════════════════════════════════════════════════════════════
         GATING STATES
    ═══════════════════════════════════════════════════════════════════ -->
    <section v-if="sessionLoading || redirecting" class="ed-doc-gate">
      <div class="ed-doc-gate__inner">
        <div class="ed-doc-gate__spinner" />
        <div class="ed-doc-gate__text">
          {{ redirecting ? 'Redirecting to sign-in…' : 'Checking access…' }}
        </div>
      </div>
    </section>

    <section v-else-if="loopDetected" class="ed-doc-gate">
      <div class="ed-doc-gate__inner">
        <h2 class="ed-doc-gate__title">Sign-in didn't complete</h2>
        <p class="ed-doc-gate__sub">
          We tried to sign you in but the session didn't stick. Try again, and if this keeps
          happening, check that third-party cookies are allowed for this site.
        </p>
        <button type="button" class="ed-doc-button" @click="retrySignIn">Try again</button>
      </div>
    </section>

    <section v-else-if="sessionError" class="ed-doc-gate">
      <div class="ed-doc-gate__inner">
        <h2 class="ed-doc-gate__title">Couldn't load this page</h2>
        <p class="ed-doc-gate__sub"><strong>{{ sessionError }}</strong></p>
        <button type="button" class="ed-doc-button" @click="bootstrap">Try again</button>
      </div>
    </section>

    <template v-else>

      <!-- ═══════════════════════════════════════════════════════════════════
           BACK STRIP
      ═══════════════════════════════════════════════════════════════════ -->
      <section class="ed-doc-back">
        <div class="ed-doc-back__inner">
          <a href="/doc-repository/" class="ed-doc-back__link">
            <span class="ed-doc-back__arrow">&larr;</span>
            <span class="ed-doc-back__text">All organisations</span>
          </a>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════════════
           HERO
      ═══════════════════════════════════════════════════════════════════ -->
      <section class="ed-doc-hero" :style="{ '--accent': typeColor }">
        <div class="ed-doc-hero__inner">
          <div class="ed-doc-hero__main">
            <div v-if="typeLabel" class="ed-doc-hero__label">
              <span class="ed-doc-hero__label-dash" />
              {{ typeLabel }}
            </div>
            <div class="ed-doc-hero__head">
              <img v-if="logo" :src="logo" :alt="name" class="ed-doc-hero__logo" />
              <div v-else class="ed-doc-hero__logo ed-doc-hero__logo--placeholder">
                {{ name.charAt(0) }}
              </div>
              <div>
                <h1 class="ed-doc-hero__title">{{ name }}</h1>
                <p v-if="legalName && legalName !== name" class="ed-doc-hero__legal">
                  {{ legalName }}
                </p>
              </div>
            </div>
            <p class="ed-doc-hero__sub">
              Documents published by this organisation as part of UAE Open Finance.
              Public documents are visible to all participants. Private documents are
              visible only to authorised users within your organisation.
            </p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════════════
           TABS + DOCUMENTS
      ═══════════════════════════════════════════════════════════════════ -->
      <section class="ed-doc-body">
        <div class="ed-doc-body__inner">

          <div class="ed-doc-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              :aria-selected="activeTab === 'public'"
              class="ed-doc-tab"
              :class="{ 'ed-doc-tab--active': activeTab === 'public' }"
              :style="activeTab === 'public' ? { background: typeColor, borderColor: typeColor, color: 'var(--at-bg-cream)' } : {}"
              @click="activeTab = 'public'"
            >
              <svg class="ed-doc-tab__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Public Documents
              <span class="ed-doc-tab__count">({{ publicFiles.length }})</span>
            </button>
            <button
              v-if="canSeePrivate"
              type="button"
              role="tab"
              :aria-selected="activeTab === 'private'"
              class="ed-doc-tab"
              :class="{ 'ed-doc-tab--active': activeTab === 'private' }"
              :style="activeTab === 'private' ? { background: typeColor, borderColor: typeColor, color: 'var(--at-bg-cream)' } : {}"
              @click="activeTab = 'private'"
            >
              <svg class="ed-doc-tab__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Private Documents
              <span class="ed-doc-tab__count">({{ privateFiles.length }})</span>
            </button>
          </div>

          <!-- Upload (Nebras only) -->
          <div v-if="isNebras" class="ed-doc-upload">
            <div class="ed-doc-upload__head">
              <span class="ed-doc-upload__title">
                Upload {{ activeTab === 'private' ? 'private' : 'public' }} document
              </span>
              <span class="ed-doc-upload__hint">
                Pick a document type, then choose a file up to {{ formatBytes(maxUploadBytes) }}.
              </span>
            </div>
            <div v-if="!activeCatalog.length" class="ed-doc-upload__empty">
              No {{ activeTab }} document types are configured yet.
            </div>
            <template v-else>
              <div class="ed-doc-upload__row">
                <select
                  v-model="selectedSlug"
                  class="ed-doc-upload__select"
                  :disabled="uploading"
                >
                  <option value="" disabled>Select document type…</option>
                  <option v-for="entry in activeCatalog" :key="entry.slug" :value="entry.slug">
                    {{ entry.label }}
                  </option>
                </select>
                <input
                  ref="fileInput"
                  type="file"
                  class="ed-doc-upload__input"
                  :disabled="uploading || !selectedSlug"
                  @change="onFileSelected"
                />
                <button
                  type="button"
                  class="ed-doc-button ed-doc-upload__button"
                  :disabled="uploading || !selectedSlug || !uploadFile"
                  @click="handleUpload"
                >
                  {{ uploading ? 'Uploading…' : 'Upload' }}
                </button>
              </div>
              <div v-if="willOverwrite" class="ed-doc-upload__warning">
                Uploading will replace the existing <strong>{{ selectedLabel }}</strong>.
              </div>
            </template>
            <div v-if="uploadError" class="ed-doc-upload__error">{{ uploadError }}</div>
            <div v-if="uploadSuccess" class="ed-doc-upload__success">{{ uploadSuccess }}</div>
          </div>

          <!-- Search -->
          <div class="ed-doc-search">
            <svg class="ed-doc-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              v-model="search"
              class="ed-doc-search__input"
              type="search"
              placeholder="Search documents…"
              aria-label="Search documents"
            />
            <button
              v-if="search"
              type="button"
              class="ed-doc-search__clear"
              aria-label="Clear search"
              @click="search = ''"
            >&times;</button>
          </div>

          <!-- Documents -->
          <div class="ed-doc-list">
            <template v-if="activeLoading">
              <div v-for="n in 3" :key="n" class="ed-doc-row ed-doc-row--skeleton">
                <span class="ed-doc-skel ed-doc-skel--name" />
                <span class="ed-doc-skel ed-doc-skel--meta" />
                <span class="ed-doc-skel ed-doc-skel--btn" />
              </div>
            </template>

            <div v-else-if="activeError" class="ed-doc-empty">
              Could not load documents: <strong>{{ activeError }}</strong>
            </div>

            <template v-else-if="filteredFiles.length">
              <div v-for="file in filteredFiles" :key="file.file" class="ed-doc-row">
                <div class="ed-doc-row__icon" :style="{ borderColor: typeColor, color: typeColor }">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div class="ed-doc-row__body">
                  <h3 class="ed-doc-row__title">{{ file.name }}</h3>
                  <div class="ed-doc-row__meta">
                    <span v-if="fileType(file.name)">{{ fileType(file.name) }}</span>
                    <span v-if="fileType(file.name) && file.date" class="ed-doc-row__sep">·</span>
                    <span v-if="file.date">{{ formatDate(file.date) }}</span>
                  </div>
                </div>
                <a
                  class="ed-doc-button"
                  :href="downloadHref(file.file)"
                  download
                >
                  Download
                </a>
              </div>
            </template>

            <div v-else class="ed-doc-empty">
              <template v-if="search">
                No documents match <strong>"{{ search }}"</strong>.
              </template>
              <template v-else>
                No {{ activeTab }} documents available.
              </template>
            </div>
          </div>

        </div>
      </section>

      <PageFooter />

    </template>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

/* ─── Gating states ─────────────────────────────────────────────────────── */
.ed-doc-gate {
  background: var(--at-bg-cream);
  min-height: calc(100vh - 4.25rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ed-doc-gate__inner {
  text-align: center;
  max-width: 32rem;
  padding: 2rem;
}

.ed-doc-gate__spinner {
  margin: 0 auto 1.25rem;
  width: 36px;
  height: 36px;
  border: 2px solid var(--at-grid-line-2);
  border-top-color: var(--at-navy-deep);
  border-radius: 50%;
  animation: ed-doc-spin 0.8s linear infinite;
}

@keyframes ed-doc-spin {
  to { transform: rotate(360deg); }
}

.ed-doc-gate__text {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute-2);
}

.ed-doc-gate__title {
  font-family: var(--at-serif);
  font-size: 1.75rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
  color: var(--at-navy-deep);
}

.ed-doc-gate__sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0 0 1.5rem;
}

/* ─── Back strip ────────────────────────────────────────────────────────── */
.ed-doc-back {
  background: var(--at-surface);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-doc-back__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 1.1rem 2rem;
}

.ed-doc-back__link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--at-mute-2);
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  transition: color 0.15s;
}

.ed-doc-back__link:hover { color: var(--at-navy-deep); }

.ed-doc-back__arrow {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  transition: transform 0.15s;
}

.ed-doc-back__link:hover .ed-doc-back__arrow {
  transform: translateX(-3px);
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-doc-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  position: relative;
}

.ed-doc-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--accent, var(--at-navy));
}

.ed-doc-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 3.5rem 2rem 3rem;
}

.ed-doc-hero__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent, var(--at-navy));
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-doc-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-doc-hero__head {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.ed-doc-hero__logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  flex-shrink: 0;
}

.ed-doc-hero__logo--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--at-serif);
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--at-navy);
}

.ed-doc-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-doc-hero__legal {
  margin: 0.5rem 0 0;
  font-family: var(--at-sans);
  font-size: 0.92rem;
  color: var(--at-mute-2);
}

.ed-doc-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 48rem;
}

/* ─── Body ──────────────────────────────────────────────────────────────── */
.ed-doc-body {
  padding: 2.75rem 0 5rem;
  background: var(--at-bg-cream);
}

.ed-doc-body__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

/* ─── Tabs ──────────────────────────────────────────────────────────────── */
.ed-doc-tabs {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.ed-doc-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.2rem;
  background: transparent;
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.ed-doc-tab:hover { border-color: var(--at-grid-line-2); }
.ed-doc-tab--active { cursor: default; }

.ed-doc-tab__icon {
  display: inline-block;
  vertical-align: middle;
}

.ed-doc-tab__count {
  opacity: 0.75;
  font-weight: 500;
}

/* ─── Upload ────────────────────────────────────────────────────────────── */
.ed-doc-upload {
  margin-bottom: 1.75rem;
  padding: 1.5rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--accent, var(--at-navy));
}

.ed-doc-upload__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.ed-doc-upload__title {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-doc-upload__hint {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  color: var(--at-mute);
}

.ed-doc-upload__row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.ed-doc-upload__select {
  min-width: 220px;
  padding: 0.6rem 0.75rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}

.ed-doc-upload__select:disabled {
  background: var(--at-bg-paper);
  cursor: not-allowed;
}

.ed-doc-upload__input {
  flex: 1;
  min-width: 200px;
  padding: 0.55rem;
  background: var(--at-bg-cream);
  border: 1px dashed var(--at-grid-line-2);
  font-family: var(--at-sans);
  font-size: 0.88rem;
}

.ed-doc-upload__button {
  border: none;
}

.ed-doc-upload__button:disabled {
  background: var(--at-mute);
  cursor: not-allowed;
}

.ed-doc-upload__empty {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-mute);
  font-style: italic;
}

.ed-doc-upload__warning {
  margin-top: 0.85rem;
  padding: 0.65rem 0.85rem;
  background: rgba(179, 120, 25, 0.08);
  border-left: 2px solid var(--at-gold);
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-navy-deep);
}

.ed-doc-upload__error {
  margin-top: 0.85rem;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: #991b1b;
}

.ed-doc-upload__success {
  margin-top: 0.85rem;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: #166534;
}

/* ─── Search ────────────────────────────────────────────────────────────── */
.ed-doc-search {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  margin-bottom: 1.5rem;
  transition: border-color 0.15s;
}

.ed-doc-search:focus-within { border-color: var(--at-navy-deep); }

.ed-doc-search__icon {
  flex-shrink: 0;
  margin-left: 1rem;
  color: var(--at-mute);
  pointer-events: none;
}

.ed-doc-search__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.85rem 1rem;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
}

.ed-doc-search__input::placeholder { color: var(--at-mute); }

.ed-doc-search__clear {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  color: var(--at-mute);
  transition: color 0.15s;
}

.ed-doc-search__clear:hover { color: var(--at-navy-deep); }

/* ─── Document list ─────────────────────────────────────────────────────── */
.ed-doc-list {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.ed-doc-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--at-grid-line);
  transition: background 0.15s;
}

.ed-doc-row:last-child { border-bottom: none; }
.ed-doc-row:hover { background: var(--at-bg-paper); }

.ed-doc-row__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  flex-shrink: 0;
}

.ed-doc-row__body { min-width: 0; }

.ed-doc-row__title {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  margin: 0 0 0.3rem;
  overflow-wrap: anywhere;
}

.ed-doc-row__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-doc-row__sep { opacity: 0.55; }

/* ─── Button ────────────────────────────────────────────────────────────── */
.ed-doc-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border: none;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
}

.ed-doc-button:hover { background: var(--at-navy); }

/* ─── Empty + skeleton ──────────────────────────────────────────────────── */
.ed-doc-empty {
  padding: 3rem 1.5rem;
  text-align: center;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-mute);
}

.ed-doc-empty strong { color: var(--at-navy-deep); }

.ed-doc-row--skeleton {
  pointer-events: none;
}

.ed-doc-skel {
  display: block;
  height: 14px;
  background: linear-gradient(90deg, var(--at-grid-line) 0%, var(--at-bg-paper) 50%, var(--at-grid-line) 100%);
  background-size: 200% 100%;
  animation: ed-doc-shimmer 1.4s ease-in-out infinite;
}

.ed-doc-skel--name { width: 60%; max-width: 22rem; }
.ed-doc-skel--meta { width: 40%; max-width: 12rem; height: 10px; }
.ed-doc-skel--btn  { width: 6rem; height: 32px; }

@keyframes ed-doc-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 700px) {
  .ed-doc-hero__inner { padding: 2.5rem 1.25rem 2rem; }
  .ed-doc-back__inner { padding: 0.85rem 1.25rem; }
  .ed-doc-body__inner { padding: 0 1.25rem; }
  .ed-doc-hero__head { gap: 0.85rem; }
  .ed-doc-hero__logo { width: 48px; height: 48px; }
  .ed-doc-row { grid-template-columns: auto 1fr; row-gap: 0.85rem; }
  .ed-doc-row .ed-doc-button { grid-column: 1 / -1; justify-self: start; }
}
</style>
