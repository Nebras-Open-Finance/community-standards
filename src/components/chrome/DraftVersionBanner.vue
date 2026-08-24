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

const route = useRoute()

// Release notes, erratas and changelogs describe every version from the outside,
// so a draft segment there is the subject of the page rather than a property of
// it — the banner would be wrong on e.g. the v2.1 -> v2.2-rc1 changelog.
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
</script>

<template>
  <div v-if="draftVersion" class="dvb" role="note">
    <div class="dvb__inner">
      <span class="dvb__tag">Release candidate</span>
      <p class="dvb__text">
        This is <strong>{{ draftVersion }}</strong> &mdash; a release candidate for the
        {{ protocolVersion }} standards, published for review and not yet ratified.
        It MUST NOT be used as the basis for a production implementation.
        For the current standards, switch to
        <strong>{{ CURRENT_VERSION }}</strong> using the version selector.
        See the <a :href="changelogUrl">{{ CURRENT_VERSION }} &rarr; {{ draftVersion }} changelog</a>
        for every change in this version.
      </p>
    </div>
  </div>
</template>

<style scoped>
.dvb {
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

@media (max-width: 700px) {
  .dvb__inner {
    padding: 0.6rem 1rem;
  }
}
</style>
