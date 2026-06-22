<route lang="yaml">
meta:
  title: Document Repository — Org
</route>

<script setup lang="ts">
// One HTML per production org is enumerated at build time by
// `vite.config.ts` `ssgOptions.includedRoutes` from `@/data/doc-repo-orgs`.

import { docRepoOrgs } from '@/data/doc-repo-orgs'

const DOCS_API = 'https://docs.nebras-open-finance.com'

const LOGIN_MARKER_KEY = 'nebras_docs_login_attempt'
const LOGIN_COOLDOWN_MS = 30_000

const route = useRoute()

const orgId = computed<string>(() => {
  const raw = route.params['id']
  return typeof raw === 'string' ? raw : Array.isArray(raw) ? (raw[0] ?? '') : ''
})

const org = computed(() => docRepoOrgs.find(o => o.id === orgId.value))

const sessionLoading = ref<boolean>(true)
const redirecting = ref<boolean>(false)
const loopDetected = ref<boolean>(false)
const sessionError = ref<string>('')

const isAuthenticated = ref<boolean>(false)
const isNebras = ref<boolean>(false)
const canSeePrivate = ref<boolean>(false)
const canSeeProtected = ref<boolean>(false)

// Orgs in which the signed-in user holds a privileged role (org_admin / PBC).
// Drives the protected-share management UI for the current org.
const myOrgs = ref<string[]>([])

interface FileEntry {
  file: string
  link: string
  date?: string
}

interface CatalogEntry {
  slug: string
  label: string
  monthly?: boolean
}

interface CatalogPayload {
  public: CatalogEntry[]
  private: CatalogEntry[]
  protected: CatalogEntry[]
  maxUploadBytes?: number
}

const publicFiles = ref<FileEntry[]>([])
const privateFiles = ref<FileEntry[]>([])
const protectedFiles = ref<FileEntry[]>([])
const publicLoading = ref<boolean>(false)
const privateLoading = ref<boolean>(false)
const protectedLoading = ref<boolean>(false)
const publicError = ref<string>('')
const privateError = ref<string>('')
const protectedError = ref<string>('')

const catalog = ref<{ public: CatalogEntry[]; private: CatalogEntry[]; protected: CatalogEntry[] }>({
  public: [],
  private: [],
  protected: [],
})
const maxUploadBytes = ref<number>(5 * 1024 * 1024)

type Tab = 'public' | 'private' | 'protected'
const activeTab = ref<Tab>('public')
const search = ref<string>('')

const uploadFile = ref<File | null>(null)
const uploading = ref<boolean>(false)
const uploadError = ref<string>('')
const uploadSuccess = ref<string>('')
const selectedSlug = ref<string>('')
const selectedMonth = ref<string>('')
const fileInput = ref<HTMLInputElement | null>(null)

function fileExtension(name: string): string {
  const idx = name.lastIndexOf('.')
  if (idx <= 0 || idx === name.length - 1) return ''
  return name.slice(idx + 1)
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) return `${Number.isInteger(mb) ? mb : mb.toFixed(1)} MB`
  const kb = bytes / 1024
  return `${Number.isInteger(kb) ? kb : kb.toFixed(0)} KB`
}

interface MeResponse {
  authenticated?: boolean
  isNebras?: boolean
  orgs?: string[]
}

async function bootstrap(): Promise<void> {
  sessionLoading.value = true
  sessionError.value = ''
  loopDetected.value = false

  try {
    const meRes = await fetch(`${DOCS_API}/me`, { credentials: 'include' })
    let meBody: MeResponse = {}
    if (meRes.ok) {
      meBody = (await meRes.json().catch(() => ({}))) as MeResponse
    }

    if (!meRes.ok || meBody.authenticated !== true) {
      if (typeof window === 'undefined') return
      const marker = Number(window.sessionStorage.getItem(LOGIN_MARKER_KEY) || 0)
      if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
        window.sessionStorage.removeItem(LOGIN_MARKER_KEY)
        loopDetected.value = true
        return
      }
      window.sessionStorage.setItem(LOGIN_MARKER_KEY, String(Date.now()))
      redirecting.value = true
      const redirect = encodeURIComponent(window.location.href)
      window.location.href = `${DOCS_API}/login?redirect=${redirect}`
      return
    }

    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(LOGIN_MARKER_KEY)
    }
    isAuthenticated.value = true
    isNebras.value = meBody.isNebras === true
    myOrgs.value = Array.isArray(meBody.orgs) ? meBody.orgs : []

    await Promise.all([loadPublic(), loadPrivate(), loadProtected(), loadCatalog()])
    if (canManageGrants.value) await loadGrants()
  } catch (e: unknown) {
    sessionError.value = e instanceof Error ? e.message : String(e)
  } finally {
    if (!redirecting.value) sessionLoading.value = false
  }
}

async function loadPublic(): Promise<void> {
  publicLoading.value = true
  publicError.value = ''
  try {
    const res = await fetch(`${DOCS_API}/${orgId.value}/public`, { credentials: 'include' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const body: unknown = await res.json()
    publicFiles.value = Array.isArray(body) ? (body as FileEntry[]) : []
  } catch (e: unknown) {
    publicError.value = e instanceof Error ? e.message : String(e)
    publicFiles.value = []
  } finally {
    publicLoading.value = false
  }
}

async function loadPrivate(): Promise<void> {
  privateLoading.value = true
  privateError.value = ''
  try {
    const res = await fetch(`${DOCS_API}/${orgId.value}/private`, { credentials: 'include' })
    if (res.status === 403 || res.status === 401) {
      canSeePrivate.value = false
      privateFiles.value = []
      return
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    canSeePrivate.value = true
    const body: unknown = await res.json()
    privateFiles.value = Array.isArray(body) ? (body as FileEntry[]) : []
  } catch (e: unknown) {
    privateError.value = e instanceof Error ? e.message : String(e)
    privateFiles.value = []
  } finally {
    privateLoading.value = false
  }
}

async function loadProtected(): Promise<void> {
  protectedLoading.value = true
  protectedError.value = ''
  try {
    const res = await fetch(`${DOCS_API}/${orgId.value}/protected`, { credentials: 'include' })
    if (res.status === 403 || res.status === 401) {
      canSeeProtected.value = false
      protectedFiles.value = []
      return
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    canSeeProtected.value = true
    const body: unknown = await res.json()
    protectedFiles.value = Array.isArray(body) ? (body as FileEntry[]) : []
  } catch (e: unknown) {
    protectedError.value = e instanceof Error ? e.message : String(e)
    protectedFiles.value = []
  } finally {
    protectedLoading.value = false
  }
}

async function loadCatalog(): Promise<void> {
  try {
    const res = await fetch(`${DOCS_API}/catalog?orgId=${encodeURIComponent(orgId.value)}`)
    if (!res.ok) return
    const body = (await res.json()) as Partial<CatalogPayload>
    catalog.value = {
      public: Array.isArray(body.public) ? body.public : [],
      private: Array.isArray(body.private) ? body.private : [],
      protected: Array.isArray(body.protected) ? body.protected : [],
    }
    if (typeof body.maxUploadBytes === 'number' && Number.isFinite(body.maxUploadBytes) && body.maxUploadBytes > 0) {
      maxUploadBytes.value = body.maxUploadBytes
    }
  } catch {
    catalog.value = { public: [], private: [], protected: [] }
  }
}

function retrySignIn(): void {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(LOGIN_MARKER_KEY)
  }
  void bootstrap()
}

onMounted(() => {
  void bootstrap()
})
watch(orgId, () => {
  void bootstrap()
})

watch(activeTab, () => {
  selectedSlug.value = ''
  selectedMonth.value = ''
  uploadFile.value = null
  uploadError.value = ''
  uploadSuccess.value = ''
  if (fileInput.value) fileInput.value.value = ''
})

watch(selectedSlug, () => {
  selectedMonth.value = ''
})

const activeFiles = computed<FileEntry[]>(() =>
  activeTab.value === 'private'
    ? privateFiles.value
    : activeTab.value === 'protected'
      ? protectedFiles.value
      : publicFiles.value,
)

const activeLoading = computed<boolean>(() =>
  activeTab.value === 'private'
    ? privateLoading.value
    : activeTab.value === 'protected'
      ? protectedLoading.value
      : publicLoading.value,
)

const activeError = computed<string>(() =>
  activeTab.value === 'private'
    ? privateError.value
    : activeTab.value === 'protected'
      ? protectedError.value
      : publicError.value,
)

const activeCatalog = computed<CatalogEntry[]>(() =>
  activeTab.value === 'private'
    ? catalog.value.private
    : activeTab.value === 'protected'
      ? catalog.value.protected
      : catalog.value.public,
)

// Slugs flagged `monthly` in the active catalog. Their uploaded files are named
// `<slug>-<YYYY-MM>.<ext>` and get pulled out of the flat list into their own
// grouped section (one group per type — or a combined group, see
// COMBINED_MONTHLY_GROUPS — newest month first).
const monthlySlugSet = computed<Set<string>>(
  () => new Set(activeCatalog.value.filter(c => c.monthly).map(c => c.slug)),
)

function parseMonthly(fileName: string): { slug: string; month: string } | null {
  const dot = fileName.lastIndexOf('.')
  const base = dot > 0 ? fileName.slice(0, dot) : fileName
  const m = base.match(/^(.+)-(\d{4}-\d{2})$/)
  const slug = m?.[1]
  const month = m?.[2]
  if (!slug || !month) return null
  return { slug, month }
}

function isMonthlyFile(f: FileEntry): boolean {
  const parsed = parseMonthly(f.file)
  return !!parsed && monthlySlugSet.value.has(parsed.slug)
}

interface MonthlyItem {
  entry: FileEntry
  month: string
  // Set only for members of a combined group, to label the row by type
  // (e.g. "Collection Memo" / "Supporting Data") and order types within a month.
  typeLabel?: string | undefined
  order: number
}

interface MonthlyGroup {
  slug: string
  label: string
  items: MonthlyItem[]
}

// Catalog slugs that render as ONE combined monthly section instead of one
// section per slug. Each member's rows are labelled with its short `typeLabel`
// and ordered within a month by its position in `members`.
interface CombinedMonthlyConfig {
  key: string
  heading: string
  members: { slug: string; typeLabel: string }[]
}

const COMBINED_MONTHLY_GROUPS: CombinedMonthlyConfig[] = [
  {
    key: 'lfi-collection-memos',
    heading: 'LFI Collection Memos',
    members: [
      { slug: 'lfi-collection-memo', typeLabel: 'Collection Memo' },
      { slug: 'lfi-collection-memo-supporting-data', typeLabel: 'Supporting Data' },
    ],
  },
  {
    key: 'tpp-invoices',
    heading: 'TPP Invoices',
    members: [
      { slug: 'tpp-invoice', typeLabel: 'Invoice' },
      { slug: 'tpp-invoice-supporting-data', typeLabel: 'Supporting Data' },
    ],
  },
]

const combinedBySlug = new Map<
  string,
  { config: CombinedMonthlyConfig; order: number; typeLabel: string }
>()
for (const cfg of COMBINED_MONTHLY_GROUPS) {
  cfg.members.forEach((m, i) =>
    combinedBySlug.set(m.slug, { config: cfg, order: i, typeLabel: m.typeLabel }),
  )
}

const monthlyGroups = computed<MonthlyGroup[]>(() => {
  const groups = new Map<string, MonthlyGroup>()
  for (const f of activeFiles.value) {
    const parsed = parseMonthly(f.file)
    if (!parsed || !monthlySlugSet.value.has(parsed.slug)) continue
    const combined = combinedBySlug.get(parsed.slug)
    const key = combined ? combined.config.key : parsed.slug
    let g = groups.get(key)
    if (!g) {
      const label = combined
        ? combined.config.heading
        : activeCatalog.value.find(c => c.slug === parsed.slug)?.label || parsed.slug
      g = { slug: key, label, items: [] }
      groups.set(key, g)
    }
    g.items.push({
      entry: f,
      month: parsed.month,
      typeLabel: combined?.typeLabel,
      order: combined?.order ?? 0,
    })
  }
  for (const g of groups.values())
    g.items.sort((a, b) => b.month.localeCompare(a.month) || a.order - b.order)
  return [...groups.values()].sort((a, b) => a.label.localeCompare(b.label))
})

// A combined group lists several files per month, so the badge counts distinct
// months rather than rows.
function monthCount(group: MonthlyGroup): number {
  return new Set(group.items.map(i => i.month)).size
}

function formatMonth(month: string): string {
  const m = month.match(/^(\d{4})-(\d{2})$/)
  if (!m) return month
  const d = new Date(Number(m[1]), Number(m[2]) - 1, 1)
  if (Number.isNaN(d.getTime())) return month
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

// Flat list excludes monthly files (they live in their own grouped section).
const filteredFiles = computed<FileEntry[]>(() => {
  const base = activeFiles.value.filter(f => !isMonthlyFile(f))
  const q = search.value.toLowerCase().trim()
  if (!q) return base
  return base.filter(f => f.file.toLowerCase().includes(q))
})

const filteredMonthlyGroups = computed<MonthlyGroup[]>(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return monthlyGroups.value
  return monthlyGroups.value
    .map(g => ({
      ...g,
      items: g.items.filter(
        it =>
          g.label.toLowerCase().includes(q) ||
          it.month.includes(q) ||
          formatMonth(it.month).toLowerCase().includes(q) ||
          (it.typeLabel?.toLowerCase().includes(q) ?? false) ||
          it.entry.file.toLowerCase().includes(q),
      ),
    }))
    .filter(g => g.items.length > 0)
})

const hasAnyFiles = computed<boolean>(
  () => filteredFiles.value.length > 0 || filteredMonthlyGroups.value.length > 0,
)

const selectedEntry = computed<CatalogEntry | undefined>(() =>
  activeCatalog.value.find(c => c.slug === selectedSlug.value),
)

const selectedLabel = computed<string>(() => selectedEntry.value?.label || '')

const selectedMonthly = computed<boolean>(() => selectedEntry.value?.monthly === true)

// Base file name (without extension): `<slug>` normally, `<slug>-<YYYY-MM>` for
// monthly documents so each month is stored as a separate file.
const uploadBaseName = computed<string>(() => {
  if (!selectedSlug.value) return ''
  if (selectedMonthly.value) {
    return selectedMonth.value ? `${selectedSlug.value}-${selectedMonth.value}` : ''
  }
  return selectedSlug.value
})

const willOverwrite = computed<boolean>(() => {
  if (!uploadBaseName.value) return false
  return activeFiles.value.some(f => f.file.startsWith(`${uploadBaseName.value}.`))
})

function fileType(name: string): string {
  const ext = name.split('.').pop()
  return ext && ext !== name ? ext.toUpperCase() : ''
}

function formatDate(iso: string | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

async function handleDownload(entry: FileEntry): Promise<void> {
  try {
    const res = await fetch(entry.link, { credentials: 'include' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = entry.file
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  } catch {
    if (typeof window !== 'undefined') {
      window.open(entry.link, '_blank', 'noopener,noreferrer')
    }
  }
}

function onFileSelected(e: Event): void {
  const target = e.target as HTMLInputElement
  uploadFile.value = target.files?.[0] || null
  uploadError.value = ''
  uploadSuccess.value = ''
}

async function handleUpload(): Promise<void> {
  if (!selectedSlug.value || !uploadFile.value) return
  if (selectedMonthly.value && !selectedMonth.value) {
    uploadError.value = 'Select the month this document is for.'
    return
  }
  const ext = fileExtension(uploadFile.value.name)
  if (!ext) {
    uploadError.value = 'File must have an extension.'
    return
  }
  if (uploadFile.value.size > maxUploadBytes.value) {
    uploadError.value = `File exceeds the ${formatBytes(maxUploadBytes.value)} upload limit.`
    return
  }

  if (willOverwrite.value && typeof window !== 'undefined') {
    const ok = window.confirm(
      `This will replace the existing ${selectedLabel.value}. Continue?`,
    )
    if (!ok) return
  }

  uploading.value = true
  uploadError.value = ''
  uploadSuccess.value = ''
  try {
    const visibility = activeTab.value
    const path = `${encodeURIComponent(uploadBaseName.value)}.${encodeURIComponent(ext)}`
    const url = `${DOCS_API}/${orgId.value}/${visibility}/${path}`
    const res = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': uploadFile.value.type || 'application/octet-stream',
      },
      body: uploadFile.value,
    })
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string }
      throw new Error(body.error || `HTTP ${res.status}`)
    }
    uploadSuccess.value = 'Upload complete.'
    selectedSlug.value = ''
    selectedMonth.value = ''
    uploadFile.value = null
    if (fileInput.value) fileInput.value.value = ''
    if (activeTab.value === 'private') await loadPrivate()
    else await loadPublic()
  } catch (e: unknown) {
    uploadError.value = e instanceof Error ? e.message : String(e)
  } finally {
    uploading.value = false
  }
}

const typeLabel = computed<string>(() => {
  const t = org.value?.type
  if (!t) return ''
  if (t === 'LFI') return 'Licensed Financial Institution'
  if (t === 'TPP') return 'Third Party Provider'
  return t
})

const typeColor = computed<string>(() => {
  const t = org.value?.type
  if (t === 'LFI') return 'var(--at-teal)'
  if (t === 'TPP') return 'var(--at-gold)'
  return 'var(--at-blue-deep)'
})

const orgName = computed<string>(() => org.value?.name ?? '')
const orgLegalName = computed<string>(() => org.value?.legalName ?? '')
const orgLogo = computed<string>(() => org.value?.logoUri ?? '')

// ─── Protected-share grant management ─────────────────────────────────────
// A privileged member of this org (or Nebras) decides which other organisations
// can read this org's protected documents. Grantees can read but cannot manage.
const canManageGrants = computed<boolean>(
  () => isNebras.value || myOrgs.value.includes(orgId.value),
)

const grantedOrgIds = ref<string[]>([])
const grantsLoading = ref<boolean>(false)
const grantsSaving = ref<boolean>(false)
const grantsError = ref<string>('')
const grantsSuccess = ref<string>('')
const grantSelect = ref<string>('')

function orgNameById(id: string): string {
  return docRepoOrgs.find(o => o.id === id)?.name || id
}

const grantedOrgs = computed<{ id: string; name: string }[]>(() =>
  grantedOrgIds.value
    .map(id => ({ id, name: orgNameById(id) }))
    .sort((a, b) => a.name.localeCompare(b.name)),
)

// Orgs not yet granted (and not this org), for the add picker.
const ungrantedOrgs = computed<{ id: string; name: string }[]>(() =>
  docRepoOrgs
    .filter(o => o.id !== orgId.value && !grantedOrgIds.value.includes(o.id))
    .map(o => ({ id: o.id, name: o.name }))
    .sort((a, b) => a.name.localeCompare(b.name)),
)

function applyGrantsResponse(body: { orgs?: unknown }): void {
  grantedOrgIds.value = Array.isArray(body.orgs)
    ? body.orgs.filter((o): o is string => typeof o === 'string')
    : []
}

async function loadGrants(): Promise<void> {
  grantsLoading.value = true
  grantsError.value = ''
  try {
    const res = await fetch(`${DOCS_API}/${orgId.value}/grants`, { credentials: 'include' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    applyGrantsResponse((await res.json()) as { orgs?: unknown })
  } catch (e: unknown) {
    grantsError.value = e instanceof Error ? e.message : String(e)
  } finally {
    grantsLoading.value = false
  }
}

async function saveGrants(next: string[]): Promise<void> {
  grantsSaving.value = true
  grantsError.value = ''
  grantsSuccess.value = ''
  try {
    const res = await fetch(`${DOCS_API}/${orgId.value}/grants`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orgs: next }),
    })
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string }
      throw new Error(body.error || `HTTP ${res.status}`)
    }
    applyGrantsResponse((await res.json()) as { orgs?: unknown })
    grantsSuccess.value = 'Shares updated.'
  } catch (e: unknown) {
    grantsError.value = e instanceof Error ? e.message : String(e)
  } finally {
    grantsSaving.value = false
  }
}

function addGrant(): void {
  const id = grantSelect.value
  if (!id || grantedOrgIds.value.includes(id)) return
  grantSelect.value = ''
  void saveGrants([...grantedOrgIds.value, id])
}

function removeGrant(id: string): void {
  void saveGrants(grantedOrgIds.value.filter(g => g !== id))
}
</script>

<template>
  <div class="ed-doc">

    <!-- ═══════════════════════════════════════════════════════════════════
         404 fallback — defensive; SSG should always emit a known org.
    ═══════════════════════════════════════════════════════════════════ -->
    <section v-if="!org" class="ed-doc-gate">
      <div class="ed-doc-gate__inner">
        <h2 class="ed-doc-gate__title">Organisation not found</h2>
        <p class="ed-doc-gate__sub">
          No organisation matches <strong>{{ orgId }}</strong>.
        </p>
        <router-link to="/doc-repository/" class="ed-doc-button">
          All organisations
        </router-link>
      </div>
    </section>

    <template v-else>

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
            <router-link to="/doc-repository/" class="ed-doc-back__link">
              <span class="ed-doc-back__arrow">&larr;</span>
              <span class="ed-doc-back__text">All organisations</span>
            </router-link>
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
                <img v-if="orgLogo" :src="orgLogo" :alt="orgName" class="ed-doc-hero__logo" />
                <div v-else class="ed-doc-hero__logo ed-doc-hero__logo--placeholder">
                  {{ orgName.charAt(0) }}
                </div>
                <div>
                  <h1 class="ed-doc-hero__title">{{ orgName }}</h1>
                  <p v-if="orgLegalName && orgLegalName !== orgName" class="ed-doc-hero__legal">
                    {{ orgLegalName }}
                  </p>
                </div>
              </div>
              <p class="ed-doc-hero__sub">
                Documents published by this organisation as part of UAE Open Finance.
                Public documents are visible to all participants. Protected documents are
                visible to this organisation and any other organisation it chooses to share
                with. Private documents are visible only to authorised users within this
                organisation.
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
                v-if="canSeeProtected"
                type="button"
                role="tab"
                :aria-selected="activeTab === 'protected'"
                class="ed-doc-tab"
                :class="{ 'ed-doc-tab--active': activeTab === 'protected' }"
                :style="activeTab === 'protected' ? { background: typeColor, borderColor: typeColor, color: 'var(--at-bg-cream)' } : {}"
                @click="activeTab = 'protected'"
              >
                <svg class="ed-doc-tab__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Protected Documents
                <span class="ed-doc-tab__count">({{ protectedFiles.length }})</span>
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
                    v-if="selectedMonthly"
                    v-model="selectedMonth"
                    type="month"
                    class="ed-doc-upload__month"
                    :disabled="uploading"
                    aria-label="Document month"
                  />
                  <input
                    ref="fileInput"
                    type="file"
                    class="ed-doc-upload__input"
                    :disabled="uploading || !selectedSlug || (selectedMonthly && !selectedMonth)"
                    @change="onFileSelected"
                  />
                  <button
                    type="button"
                    class="ed-doc-button ed-doc-upload__button"
                    :disabled="uploading || !selectedSlug || !uploadFile || (selectedMonthly && !selectedMonth)"
                    @click="handleUpload"
                  >
                    {{ uploading ? 'Uploading…' : 'Upload' }}
                  </button>
                </div>
                <div v-if="selectedMonthly && !selectedMonth" class="ed-doc-upload__hint ed-doc-upload__hint--month">
                  This document is filed monthly — pick the month it applies to. Each month is kept as a separate file.
                </div>
                <div v-if="willOverwrite" class="ed-doc-upload__warning">
                  Uploading will replace the existing <strong>{{ selectedLabel }}</strong>.
                </div>
              </template>
              <div v-if="uploadError" class="ed-doc-upload__error">{{ uploadError }}</div>
              <div v-if="uploadSuccess" class="ed-doc-upload__success">{{ uploadSuccess }}</div>
            </div>

            <!-- Protected share management (privileged members of this org / Nebras) -->
            <div v-if="activeTab === 'protected' && canManageGrants" class="ed-doc-share">
              <div class="ed-doc-share__head">
                <span class="ed-doc-share__title">Shared with</span>
                <span class="ed-doc-share__hint">
                  Choose which organisations can read {{ orgName }}'s protected documents.
                  Any member of a shared organisation gains access.
                </span>
              </div>

              <div v-if="grantsLoading" class="ed-doc-share__empty">Loading shares…</div>

              <template v-else>
                <div v-if="grantedOrgs.length" class="ed-doc-share__chips">
                  <span v-for="g in grantedOrgs" :key="g.id" class="ed-doc-share__chip">
                    {{ g.name }}
                    <button
                      type="button"
                      class="ed-doc-share__chip-remove"
                      :disabled="grantsSaving"
                      :aria-label="`Stop sharing with ${g.name}`"
                      @click="removeGrant(g.id)"
                    >&times;</button>
                  </span>
                </div>
                <div v-else class="ed-doc-share__empty">
                  Not shared with any organisation yet. Only {{ orgName }} and Nebras can see these documents.
                </div>

                <div class="ed-doc-share__row">
                  <select v-model="grantSelect" class="ed-doc-upload__select" :disabled="grantsSaving">
                    <option value="" disabled>Add an organisation…</option>
                    <option v-for="o in ungrantedOrgs" :key="o.id" :value="o.id">{{ o.name }}</option>
                  </select>
                  <button
                    type="button"
                    class="ed-doc-button"
                    :disabled="grantsSaving || !grantSelect"
                    @click="addGrant"
                  >
                    {{ grantsSaving ? 'Saving…' : 'Add' }}
                  </button>
                </div>

                <div v-if="grantsError" class="ed-doc-upload__error">{{ grantsError }}</div>
                <div v-if="grantsSuccess" class="ed-doc-upload__success">{{ grantsSuccess }}</div>
              </template>
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
            <div v-if="activeLoading" class="ed-doc-list">
              <div v-for="n in 3" :key="n" class="ed-doc-row ed-doc-row--skeleton">
                <span class="ed-doc-skel ed-doc-skel--name" />
                <span class="ed-doc-skel ed-doc-skel--meta" />
                <span class="ed-doc-skel ed-doc-skel--btn" />
              </div>
            </div>

            <div v-else-if="activeError" class="ed-doc-list">
              <div class="ed-doc-empty">
                Could not load documents: <strong>{{ activeError }}</strong>
              </div>
            </div>

            <template v-else>
              <!-- Monthly document groups (one section per monthly type, or a
                   combined section spanning several types) -->
              <section
                v-for="group in filteredMonthlyGroups"
                :key="group.slug"
                class="ed-doc-group"
              >
                <div class="ed-doc-group__head">
                  <h2 class="ed-doc-group__title">{{ group.label }}</h2>
                  <span class="ed-doc-group__count">{{ monthCount(group) }} {{ monthCount(group) === 1 ? 'month' : 'months' }}</span>
                </div>
                <div class="ed-doc-list">
                  <div v-for="item in group.items" :key="item.entry.file" class="ed-doc-row">
                    <div class="ed-doc-row__icon" :style="{ borderColor: typeColor, color: typeColor }">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div class="ed-doc-row__body">
                      <h3 class="ed-doc-row__title">{{ formatMonth(item.month) }}<template v-if="item.typeLabel"> · {{ item.typeLabel }}</template></h3>
                      <div class="ed-doc-row__meta">
                        <span v-if="fileType(item.entry.file)">{{ fileType(item.entry.file) }}</span>
                        <span v-if="fileType(item.entry.file) && item.entry.date" class="ed-doc-row__sep">·</span>
                        <span v-if="item.entry.date">Uploaded {{ formatDate(item.entry.date) }}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="ed-doc-button"
                      @click="handleDownload(item.entry)"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </section>

              <!-- All other documents -->
              <div v-if="filteredFiles.length" class="ed-doc-list">
                <div v-for="file in filteredFiles" :key="file.file" class="ed-doc-row">
                  <div class="ed-doc-row__icon" :style="{ borderColor: typeColor, color: typeColor }">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div class="ed-doc-row__body">
                    <h3 class="ed-doc-row__title">{{ file.file }}</h3>
                    <div class="ed-doc-row__meta">
                      <span v-if="fileType(file.file)">{{ fileType(file.file) }}</span>
                      <span v-if="fileType(file.file) && file.date" class="ed-doc-row__sep">·</span>
                      <span v-if="file.date">{{ formatDate(file.date) }}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="ed-doc-button"
                    @click="handleDownload(file)"
                  >
                    Download
                  </button>
                </div>
              </div>

              <div v-if="!hasAnyFiles" class="ed-doc-list">
                <div class="ed-doc-empty">
                  <template v-if="search">
                    No documents match <strong>"{{ search }}"</strong>.
                  </template>
                  <template v-else>
                    No {{ activeTab }} documents available.
                  </template>
                </div>
              </div>
            </template>

          </div>
        </section>

      </template>
    </template>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  min-height: 100vh;
}

/* ─── Gating states ─────────────────────────────────────────────────────── */
.ed-doc-gate {
  background: var(--at-bg-cream);
  min-height: calc(100vh - var(--at-header-height));
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

.ed-doc-upload__month {
  padding: 0.6rem 0.75rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}

.ed-doc-upload__month:disabled {
  background: var(--at-bg-paper);
  cursor: not-allowed;
}

.ed-doc-upload__hint--month {
  display: block;
  margin-top: 0.85rem;
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

/* ─── Protected share management ────────────────────────────────────────── */
.ed-doc-share {
  margin-bottom: 1.75rem;
  padding: 1.5rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--accent, var(--at-navy));
}

.ed-doc-share__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.ed-doc-share__title {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-doc-share__hint {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  color: var(--at-mute);
}

.ed-doc-share__empty {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-mute);
  font-style: italic;
  margin-bottom: 1rem;
}

.ed-doc-share__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.ed-doc-share__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.5rem 0.35rem 0.7rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  font-family: var(--at-sans);
  font-size: 0.85rem;
  color: var(--at-navy-deep);
}

.ed-doc-share__chip-remove {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  color: var(--at-mute);
  padding: 0 0.15rem;
  transition: color 0.15s;
}

.ed-doc-share__chip-remove:hover:not(:disabled) { color: #991b1b; }
.ed-doc-share__chip-remove:disabled { cursor: not-allowed; opacity: 0.5; }

.ed-doc-share__row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
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

/* ─── Document groups (monthly types) ───────────────────────────────────── */
.ed-doc-group {
  margin-bottom: 1.75rem;
}

.ed-doc-group__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
  padding-left: 0.1rem;
}

.ed-doc-group__title {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  margin: 0;
}

.ed-doc-group__count {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  white-space: nowrap;
}

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
  .ed-doc { display: flex; flex-direction: column; }
  .ed-doc-hero { order: 1; }
  .ed-doc-back { order: 2; border-top: 1px solid var(--at-grid-line); }
  .ed-doc-body { order: 3; }
  .ed-doc-hero__inner { padding: 2.5rem 1.25rem 2rem; }
  .ed-doc-back__inner { padding: 0.85rem 1.25rem; }
  .ed-doc-body__inner { padding: 0 1.25rem; }
  .ed-doc-hero__head { gap: 0.85rem; }
  .ed-doc-hero__logo { width: 48px; height: 48px; }
  .ed-doc-row { grid-template-columns: auto 1fr; row-gap: 0.85rem; }
  .ed-doc-row .ed-doc-button { grid-column: 1 / -1; justify-self: start; }
}
</style>
