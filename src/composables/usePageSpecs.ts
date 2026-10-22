// The OpenAPI specs the current page renders, and where each was fetched from
// upstream.
//
// <RedocWrapper> registers its `spec` while it exists, so chrome outside the
// page (the release-candidate banner) can tell which documents the page shows.
// Registration is client-only: the prerender never sees it, and consumers
// should only render from it once mounted so hydration cannot mismatch.
//
// Where a spec came from is recorded at fetch time in
// public/openapi/{version}/sources.json (see scripts/fetch-openapi-specs.mjs):
// a version can serve a file from an errata folder or borrow it from an
// earlier release, so the GitHub path cannot be derived from the local one.

const pageSpecs = shallowRef<string[]>([])

/** Registers a spec shown on the current page; returns the unregister call. */
export function registerPageSpec(spec: string): () => void {
  pageSpecs.value = [...pageSpecs.value, spec]
  return () => {
    const i = pageSpecs.value.indexOf(spec)
    if (i >= 0) pageSpecs.value = pageSpecs.value.filter((_, j) => j !== i)
  }
}

/** The versioned specs (`/openapi/v…/{category}/{file}`) on the current page, de-duplicated. */
export function usePageSpecs(): Readonly<Ref<string[]>> {
  return computed(() => [...new Set(pageSpecs.value.filter((s) => /^\/openapi\/v[^/]+\/[^/]+\/[^/]+$/.test(s)))])
}

export interface SpecSource {
  /** Repo-relative path, e.g. `dist/standards/v2.1-errata3/uae-atm-openapi.yaml`. */
  path: string
  /** Upstream folder the file sits in, e.g. `v2.1-errata3`. */
  folder: string
}

interface SourcesManifest {
  repo: string
  branch: string
  files: Record<string, SpecSource>
}

export interface SpecLink extends SpecSource {
  url: string
}

const manifests = new Map<string, Promise<SourcesManifest | null>>()

function loadManifest(version: string): Promise<SourcesManifest | null> {
  let p = manifests.get(version)
  if (!p) {
    p = fetch(`/openapi/${version}/sources.json`)
      .then((r) => (r.ok ? (r.json() as Promise<SourcesManifest>) : null))
      .catch(() => null)
    manifests.set(version, p)
  }
  return p
}

/**
 * The GitHub page for the file a version serves under the same name as `spec`
 * (a `/openapi/{version}/{category}/{file}` path), or null when that version
 * does not publish it or its manifest is missing.
 */
export async function specSourceLink(spec: string, version: string): Promise<SpecLink | null> {
  const [, , , category, file] = spec.split('/')
  if (!category || !file) return null
  const manifest = await loadManifest(version)
  const source = manifest?.files[`${category}/${file}`]
  if (!manifest || !source) return null
  return { ...source, url: `https://github.com/${manifest.repo}/blob/${manifest.branch}/${source.path}` }
}
