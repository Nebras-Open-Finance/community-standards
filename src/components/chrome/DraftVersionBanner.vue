<script setup lang="ts">
// Shown on every page under a draft version segment (see DRAFT_VERSIONS in
// src/data/versions.ts). Draft versions are also excluded from in-app search
// and the sitemap, so this banner is the main signal a reader gets that the
// page is not a ratified standard.
//
// Auto-registered as <DraftVersionBanner> via unplugin-vue-components.
//
// Note the version identifiers deliberately differ: the route segment carries
// the `-draft` suffix, the protocol strings inside the page do not.
import {
  CURRENT_VERSION,
  DRAFT_VERSIONS,
  PROTOCOL_VERSION,
  type Version,
} from '@/data/versions'
import { changesForPath } from '@/data/version-changes-registry'
import { specSourceLink, usePageSpecs, type SpecLink } from '@/composables/usePageSpecs'

const route = useRoute()

// Release notes, erratas and changelogs describe every version from the outside,
// so a draft segment there is the subject of the page rather than a property of
// it — the banner would be wrong on e.g. the v2.1 -> v2.2-rc2 changelog.
const RELEASE_NOTES_PREFIX = '/tech/release-notes-and-erratas'

const draftVersion = computed<Version | null>(() => {
  if (route.path.startsWith(RELEASE_NOTES_PREFIX)) return null
  const segments = route.path.split('/').filter(Boolean)
  return DRAFT_VERSIONS.find((v) => segments.includes(v)) ?? null
})

const protocolVersion = computed<string>(() =>
  draftVersion.value ? PROTOCOL_VERSION[draftVersion.value] : '',
)

const changelogUrl = computed<string>(() =>
  `/tech/release-notes-and-erratas/changelog/${draftVersion.value}/`,
)

// Changes whose `affectedPaths` name this page. Only pages that actually differ
// from the previous version get the "What's changed" button; it switches the
// page into an inline comparison against that version (see <VersionDiff>).
const pageChanges = computed(() =>
  draftVersion.value
    ? changesForPath(route.path).filter((c) => c.toVersion === draftVersion.value)
    : [],
)

const router = useRouter()
const comparing = computed(() => typeof route.query.compare === 'string')

// ─── Sticky offset ────────────────────────────────────────────────────────
// The banner sticks under the fixed header. Its height varies with the
// viewport (the text wraps), so it is published as --at-draft-banner-height
// for anything else pinned under the header (the hover sidebar, in-page navs)
// to sit below it. Unset — so those fall back to 0px — whenever no banner shows.
const BANNER_HEIGHT_VAR = '--at-draft-banner-height'
const bannerEl = ref<HTMLElement | null>(null)
let bannerObserver: ResizeObserver | null = null

function stopObservingBanner(): void {
  bannerObserver?.disconnect()
  bannerObserver = null
  document.documentElement.style.removeProperty(BANNER_HEIGHT_VAR)
}

watch(bannerEl, (el) => {
  stopObservingBanner()
  if (!el) return
  bannerObserver = new ResizeObserver(() => {
    document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, `${el.offsetHeight}px`)
  })
  bannerObserver.observe(el)
})

onBeforeUnmount(stopObservingBanner)

const fromVersion = computed<string>(() => pageChanges.value[0]?.fromVersion ?? CURRENT_VERSION)

function toggleCompare(): void {
  const { compare: _compare, ...rest } = route.query
  router.replace({
    query: comparing.value ? rest : { ...rest, compare: fromVersion.value },
    hash: route.hash,
  })
}

// ─── API spec pages ───────────────────────────────────────────────────────
// An inline comparison of a rendered Redoc page says little about the spec
// behind it, so pages under `open-api/` link instead to the two source
// documents on GitHub — the one the previous version serves and the one this
// version serves — each labelled with the upstream folder it actually comes
// from (an errata, or an earlier release candidate where this one did not
// republish the file).
const isSpecPage = computed(() => route.path.split('/').includes('open-api'))

const mounted = ref(false)
onMounted(() => { mounted.value = true })

const pageSpecs = usePageSpecs()
const specLinks = ref<SpecLink[]>([])

watch(
  () => [mounted.value, isSpecPage.value, pageChanges.value.length, pageSpecs.value, draftVersion.value] as const,
  async ([isMounted, onSpecPage, changeCount, specs, to], _old, onCleanup) => {
    let stale = false
    onCleanup(() => { stale = true })
    if (!isMounted || !onSpecPage || !changeCount || !to) {
      specLinks.value = []
      return
    }
    const links = await Promise.all(
      specs.flatMap((s) => [specSourceLink(s, fromVersion.value), specSourceLink(s, to)]),
    )
    if (!stale) specLinks.value = links.filter((l): l is SpecLink => l !== null)
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="draftVersion" ref="bannerEl" class="dvb" role="note">
    <div class="dvb__inner">
      <span class="dvb__tag">Release candidate</span>
      <!-- The banner stays pinned while scrolling, so narrow screens get the
           same warning in fewer lines rather than losing a quarter of the view. -->
      <p class="dvb__text dvb__text--short">
        <strong>{{ draftVersion }}</strong> is not ratified and MUST NOT be used for
        production. Current: <strong>{{ CURRENT_VERSION }}</strong>.
        <a :href="changelogUrl">Changelog</a>
      </p>
      <p class="dvb__text dvb__text--full">
        This is <strong>{{ draftVersion }}</strong> &mdash; a release candidate for the
        {{ protocolVersion }} standards, published for review and not yet ratified.
        It MUST NOT be used as the basis for a production implementation.
        For the current standards, switch to
        <strong>{{ CURRENT_VERSION }}</strong> using the version selector.
        See the <a :href="changelogUrl">{{ CURRENT_VERSION }} &rarr; {{ draftVersion }} changelog</a>
        for every change in this version.
      </p>
      <div v-if="isSpecPage" class="dvb__specs">
        <a
          v-for="l in specLinks"
          :key="l.url"
          :href="l.url"
          class="dvb__changes"
          target="_blank"
          rel="noopener"
          :title="`Open ${l.path} on GitHub`"
        >{{ l.folder }} spec &nearr;</a>
      </div>
      <button
        v-else-if="pageChanges.length"
        type="button"
        class="dvb__changes"
        :aria-pressed="comparing"
        @click="toggleCompare"
      >
        {{ comparing ? 'Hide changes' : `What's changed since ${CURRENT_VERSION}` }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.dvb {
  /* Pinned under the fixed header. Above in-page navs (z 30), below the hover
     sidebar (50) so it still opens over the banner's edge. */
  position: sticky;
  top: var(--at-header-height);
  z-index: 40;
  border-bottom: 1px solid var(--at-grid-line-2);
  background: #fff8e1;
}

.dvb__inner {
  display: flex;
  /* Centre the tag against the full height of the text block, however many
     lines it wraps to. */
  align-items: center;
  gap: 0.75rem;
  max-width: var(--at-content-max, 1200px);
  margin: 0 auto;
  padding: 0.7rem 1.5rem;
}

.dvb__tag {
  flex-shrink: 0;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7c2d12;
  background: #fde68a;
  padding: 0.2rem 0.5rem;
}

.dvb__text {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.5;
  color: #7c2d12;
}

.dvb__text a {
  color: #92400e;
  text-decoration: underline;
}

.dvb__changes {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  color: #7c2d12;
  background: #fff;
  border: 1px solid #f59e0b;
  padding: 0.35rem 0.7rem;
  font-family: inherit;
  cursor: pointer;
}

a.dvb__changes {
  text-decoration: none;
}

.dvb__specs {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.dvb__changes:hover,
.dvb__changes[aria-pressed='true'] {
  background: #fde68a;
}

.dvb__text--short {
  display: none;
}

@media (max-width: 700px) {
  .dvb__inner {
    flex-wrap: wrap;
    gap: 0.4rem 0.75rem;
    padding: 0.5rem 1rem;
  }

  .dvb__text--full {
    display: none;
  }

  .dvb__text--short {
    display: block;
    flex: 1 1 100%;
    order: 1;
    font-size: 0.8rem;
  }

  /* Tag and actions share the first row; the warning wraps beneath. */
  .dvb__changes {
    padding: 0.25rem 0.6rem;
    font-size: 0.75rem;
  }
}
</style>
