// Reads the field map describing the Ozone Connect → Standards boundary.
//
// The map is GENERATED OUTSIDE THIS REPO (a spec-derived build pass plus a live
// permission probe in nebras-uat) and dropped into `public/api/` whole — see
// FIELD_MAP_DIR in src/data/versions.ts. Nothing here derives, probes, or
// reshapes it.
//
// The export is sharded: `index.json` carries the meta, the coverage totals and
// one entry per endpoint; `resources/<slug>.json` carries the field records for
// a single endpoint. An endpoint page therefore loads 21 KB of index plus its
// own shard rather than the whole 1.8 MB map.
//
// Because the generator owns the vocabulary, every value it supplies is treated
// as open: an unrecognised `transform` degrades to the "unmapped" bucket rather
// than throwing, so a regenerated export that adds a case renders safely
// without a code change here.

import {
  computed,
  onMounted,
  ref,
  shallowRef,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue'
import { FIELD_MAP_DIR, type Version } from '@/data/versions'

export interface FieldMapRecord {
  family: string
  resource: string
  standardsEndpoint: string
  ozoneEndpoint: string | null
  ozonePath: string | null
  ozoneType: string | null
  standardsPath: string | null
  standardsType: string | null
  standardsFormat: string | null
  required?: boolean
  enum?: string[] | null
  /** Set when the field only exists in one branch of a oneOf/anyOf schema. */
  variant?: string | null
  transform: string
  /** The generator could not pair this field and declined to guess. */
  reviewNeeded?: boolean
  permissions: string[]
  permissionSource: string
  verified: string
  description?: string
}

export interface FieldMapOperation {
  standardsEndpoint: string
  ozoneEndpoint: string | null
}

export interface FieldMapCoverage {
  fields: number
  live: number
  notObserved: number
  specOnly: number
  observedPermissions: number
  reviewNeeded: number
}

export interface FieldMapEndpoint extends FieldMapCoverage {
  family: string
  resource: string
  slug: string
  file: string
  operations: FieldMapOperation[]
  permissions: string[]
  /** Permission set → how many fields it exposes, precomputed by the generator. */
  permissionSets: Record<string, number>
}

export interface FieldMapLiveVerification {
  at?: string
  environment?: string
  accountId?: string
  scenarios?: { resource: string; permissions: string[]; outcome: string; fieldCount: number }[]
}

export interface FieldMapIndexFile {
  version?: string
  generatedAt?: string
  coverage?: FieldMapCoverage
  families?: string[]
  liveVerification?: FieldMapLiveVerification
  endpoints?: FieldMapEndpoint[]
}

export interface FieldMapResourceFile {
  version?: string
  family?: string
  resource?: string
  operations?: FieldMapOperation[]
  coverage?: FieldMapCoverage
  records?: FieldMapRecord[]
}

// ─── Mapping labels ───────────────────────────────────────────────────────────
// The generator's `transform` values are matcher outcomes, not statements about
// Hub behaviour. `dropped-by-hub-or-unmatched` means "the Hub drops it, OR
// pairing could not match it", so the label says the field is unmapped — which
// is what the data establishes — rather than naming a cause it does not.

export type MappingLabel =
  | 'same'
  | 'case-only'
  | 'renamed'
  | 'restructured'
  | 'hub-generated'
  | 'mapped'
  | 'unmapped'

const TRANSFORM_LABELS: Record<string, MappingLabel> = {
  identity: 'same',
  'case-only': 'case-only',
  renamed: 'renamed',
  hoisted: 'restructured',
}

export function mappingLabelOf(record: FieldMapRecord): MappingLabel {
  // Unmapped is derived from the record itself, not from the transform
  // vocabulary. The generator owns that vocabulary and has already grown a value
  // this repo did not know ("renamed"); if an unknown value fell through to
  // unmapped, a new generator release would paint genuinely paired fields red
  // and tell readers their data does not cross the boundary.
  //
  // Two things make a field unmapped here:
  //   1. it exists on one side only, or
  //   2. the live run fetched the resource and the field was absent from the
  //      payload (`not-observed`) — the schemas pair, but nothing came through.
  // (2) is a deliberate editorial choice: a field that does not arrive is of no
  // use to a TPP whether the cause is the LFI not populating it or the Hub not
  // forwarding it, so both read as unmapped. Note this catches fields the Hub
  // demonstrably does carry elsewhere — `creditorAccount[].identification` is
  // absent on /transactions but live on three other endpoints.
  if (record.transform === 'no-ozone-counterpart') return 'hub-generated'
  if (!record.ozonePath || !record.standardsPath) return 'unmapped'
  if (wasFetchedButAbsent(record)) return 'unmapped'

  // The generator calls a field "hoisted" whenever the paths are not string
  // equal, which sweeps in pairs that differ only by casing and an array
  // marker: `data[].accountId` → `Data.AccountId`, or the whole of the refund
  // resource's `data.refundAccount.*` → `Data.RefundAccount.*`. Nothing moves
  // in those — the collection wrapper is a property of the endpoint, not of the
  // field — so calling them restructured sends a reader looking for a change
  // that is not there. Compare with the array markers removed and let the real
  // reshapes (`data.status` → `Data.Account.Status`) keep the label.
  if (samePathIgnoringArrays(record.ozonePath, record.standardsPath)) {
    return record.ozonePath === record.standardsPath ? 'same' : 'case-only'
  }

  return TRANSFORM_LABELS[record.transform] ?? 'mapped'
}

function samePathIgnoringArrays(ozone: string, standards: string): boolean {
  const normalise = (path: string): string => path.split('[]').join('').toLowerCase()
  return normalise(ozone) === normalise(standards)
}

/** The tooltip for a row's mapping chip, narrowed to why it carries that label. */
export function mappingBlurbOf(record: FieldMapRecord): string {
  if (mappingLabelOf(record) === 'unmapped' && wasFetchedButAbsent(record)) {
    return NOT_OBSERVED_NOTE
  }
  return MAPPING_LABEL_META[mappingLabelOf(record)].blurb
}

export interface LabelMeta {
  text: string
  blurb: string
}

export const MAPPING_LABEL_META: Record<MappingLabel, LabelMeta> = {
  same: {
    text: 'Same name',
    blurb: 'The field keeps its name and position on both sides.',
  },
  'case-only': {
    text: 'Case only',
    blurb:
      'Same path, same name — only the casing convention changes: camelCase on Ozone Connect, PascalCase on Standards.',
  },
  renamed: {
    text: 'Renamed',
    blurb:
      'The API Hub returns the same value under a different field name, confirmed by matching the value across the boundary.',
  },
  restructured: {
    text: 'Restructured',
    blurb: 'The value survives but moves in the shape — the Hub nests, flattens, or re-parents it.',
  },
  'hub-generated': {
    text: 'Hub-generated',
    blurb: 'The endpoint has no Ozone Connect equivalent at all — the API Hub serves it.',
  },
  mapped: {
    text: 'Mapped',
    blurb: 'Paired across the boundary. The map does not describe how the two differ.',
  },
  unmapped: {
    text: 'Unmapped',
    blurb:
      'Nothing is known to cross the boundary here — the field exists on one side only, or the live run fetched the resource and it was absent from the payload. Do not assume the value reaches the other side.',
  },
}

// ─── Live observation ─────────────────────────────────────────────────────────
// `verified` is not shown as a column: live vs spec-only mostly records how far
// the probe got, not how a field behaves. One of its three values does carry a
// behavioural signal worth flagging, though — `not-observed` means the resource
// WAS fetched and this field was absent from the payload.
//
// It is not evidence that the field is unmapped. `creditorAccount[].identification`
// is not-observed on /accounts/{}/transactions and live on three other
// endpoints, so the Hub plainly carries it; the demo LFI simply did not populate
// it there. The marker says what was seen, and nothing more.

export function wasFetchedButAbsent(record: FieldMapRecord): boolean {
  return record.verified === 'not-observed'
}

export const NOT_OBSERVED_NOTE =
  'The verification run fetched this resource and this field was absent from the payload. The schemas pair on both sides — either the LFI does not populate it, or the Hub does not forward it. Which of those has not been established.'

// ─── Permission provenance ────────────────────────────────────────────────────

export const PERMISSION_SOURCE_META: Record<string, LabelMeta> = {
  observed: {
    text: 'Observed',
    blurb:
      'Established empirically: a consent was authorised carrying exactly these permissions, the resource fetched, and the returned fields recorded. The specifications do not contain this.',
  },
  'spec-endpoint': {
    text: 'Endpoint-declared',
    blurb:
      "The endpoint's declared permissions, inherited by every field on it because nothing finer exists in the spec. Treat as at most what the field needs, not a measurement.",
  },
  'none-declared': {
    text: 'None declared',
    blurb: 'The endpoint declares no permissions — open data, or a consent resource.',
  },
}

export function permissionSourceMeta(source: string): LabelMeta {
  return (
    PERMISSION_SOURCE_META[source] ?? { text: source, blurb: 'Unrecognised permission provenance.' }
  )
}

// ─── Endpoint pages ───────────────────────────────────────────────────────────

// Resource key → the two API Reference pages describing each side of the
// boundary, relative to the version root of each tree. `null` means that side
// has no page of its own: the API Hub serves the endpoint, so there is no Ozone
// Connect implementation to document.
interface ResourcePages {
  lfi: string | null
  tpp: string | null
}

const RESOURCE_PAGES: Record<string, ResourcePages> = {
  '/accounts': {
    lfi: '/banking/data-sharing/open-api/accounts',
    tpp: '/banking/data-sharing/open-api/accounts',
  },
  '/accounts/{}': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId',
  },
  '/accounts/{}/balances': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-balances',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-balances',
  },
  '/accounts/{}/beneficiaries': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-beneficiaries',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-beneficiaries',
  },
  '/accounts/{}/direct-debits': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-direct-debits',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-direct-debits',
  },
  '/accounts/{}/products': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-products',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-product',
  },
  '/accounts/{}/scheduled-payments': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments',
  },
  '/accounts/{}/standing-orders': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-standing-orders',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-standing-orders',
  },
  '/accounts/{}/transactions': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-transactions',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-transactions',
  },
  '/accounts/{}/customer': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-customer',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-parties',
  },
  '/accounts/{}/statements': {
    lfi: '/banking/data-sharing/open-api/accounts-AccountId-statements',
    tpp: '/banking/data-sharing/open-api/accounts-AccountId-statements',
  },
  '/customer': {
    lfi: '/banking/data-sharing/open-api/customer',
    tpp: '/banking/data-sharing/open-api/parties',
  },
  '/payment-consents/{}/refund': {
    lfi: '/banking/service-initiation/open-api/payment-consents-ConsentId-refund',
    tpp: '/banking/service-initiation/open-api/payment-consents-ConsentId-refund',
  },
  '/products': {
    lfi: '/banking/products-and-leads/open-api/products',
    tpp: '/banking/products-leads/open-api/products',
  },
  '/leads': {
    lfi: '/banking/products-and-leads/open-api/leads',
    tpp: '/banking/products-leads/open-api/leads',
  },
  '/atm': {
    lfi: '/banking/atms/open-api/atm',
    tpp: '/banking/atms/open-api/atms',
  },
}

export interface ResourceLinks {
  lfi: string | null
  tpp: string | null
}

export function resourceLinks(resource: string, version: Version): ResourceLinks {
  const pages = RESOURCE_PAGES[resource]
  if (!pages) return { lfi: null, tpp: null }
  return {
    lfi: pages.lfi ? `/tech/lfi-api-hub/${version}${pages.lfi}` : null,
    tpp: pages.tpp ? `/tech/tpp-standards/${version}${pages.tpp}` : null,
  }
}

// ─── Loading ──────────────────────────────────────────────────────────────────

// Module-level so several components on one page share a single round trip, and
// so navigating back to a page already read costs nothing. Cleared on failure so
// a transient error doesn't poison later attempts.
const cache = new Map<string, Promise<unknown>>()

function loadJson<T>(path: string): Promise<T> {
  const existing = cache.get(path) as Promise<T> | undefined
  if (existing) return existing

  const request = fetch(path)
    .then(async (res) => {
      if (!res.ok) throw new Error(`${path}: ${res.status}`)
      const body = await res.text()
      // A server that does not have the file answers with the SPA shell rather
      // than a 404. Reporting that as a JSON syntax error sends the reader
      // hunting for a corrupt payload; the actual fault is a build or deploy
      // that predates the export.
      if (body.trimStart().startsWith('<')) {
        throw new Error(`${path} is not on this server — it needs a rebuild or redeploy`)
      }
      return JSON.parse(body) as T
    })
    .catch((err: unknown) => {
      cache.delete(path)
      throw err
    })

  cache.set(path, request)
  return request
}

export function loadFieldMapIndex(version: Version): Promise<FieldMapIndexFile> {
  return loadJson<FieldMapIndexFile>(`/api/${FIELD_MAP_DIR[version]}/index.json`)
}

export function loadFieldMapResource(version: Version, slug: string): Promise<FieldMapResourceFile> {
  return loadJson<FieldMapResourceFile>(`/api/${FIELD_MAP_DIR[version]}/resources/${slug}.json`)
}

interface AsyncState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
}

// Starts loading true so prerendered HTML ships the loading state rather than
// an empty page: the fetch only happens once the browser hydrates.
function useAsync<T>(load: () => Promise<T>, deps: () => unknown): AsyncState<T> {
  // shallowRef: the payload is large and never mutated, so deep reactivity would
  // walk thousands of records on load for no benefit.
  const data = shallowRef<T | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  function run(): void {
    const token = deps()
    loading.value = true
    error.value = null
    load()
      .then((value) => {
        if (deps() !== token) return // a newer request won
        data.value = value
      })
      .catch((err: unknown) => {
        error.value = err instanceof Error ? err.message : String(err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(run)
  watch(deps, run)

  return { data, loading, error }
}

export interface UseFieldMapIndex {
  index: Ref<FieldMapIndexFile | null>
  endpoints: Ref<FieldMapEndpoint[]>
  loading: Ref<boolean>
  error: Ref<string | null>
}

export function useFieldMapIndex(version: MaybeRefOrGetter<Version>): UseFieldMapIndex {
  const { data, loading, error } = useAsync<FieldMapIndexFile>(
    () => loadFieldMapIndex(toValue(version)),
    () => toValue(version),
  )

  const endpoints = computed<FieldMapEndpoint[]>(() =>
    Array.isArray(data.value?.endpoints) ? (data.value?.endpoints as FieldMapEndpoint[]) : [],
  )

  return { index: data, endpoints, loading, error }
}

export interface UseFieldMapResource {
  file: Ref<FieldMapResourceFile | null>
  records: Ref<FieldMapRecord[]>
  loading: Ref<boolean>
  error: Ref<string | null>
}

export function useFieldMapResource(
  version: MaybeRefOrGetter<Version>,
  slug: MaybeRefOrGetter<string>,
): UseFieldMapResource {
  const { data, loading, error } = useAsync<FieldMapResourceFile>(
    () => loadFieldMapResource(toValue(version), toValue(slug)),
    () => `${toValue(version)}::${toValue(slug)}`,
  )

  const records = computed<FieldMapRecord[]>(() =>
    Array.isArray(data.value?.records) ? (data.value?.records as FieldMapRecord[]) : [],
  )

  return { file: data, records, loading, error }
}
