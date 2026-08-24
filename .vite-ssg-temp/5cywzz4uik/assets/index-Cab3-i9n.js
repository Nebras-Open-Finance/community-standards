import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { c as useSelectedVersion, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedVersion } = useSelectedVersion();
    const repoPaths = [
      { name: "dist/standards/", desc: "APIs the API Hub exposes <strong>to TPPs</strong>." },
      { name: "dist/api-hub/", desc: "APIs the API Hub exposes <strong>to LFIs</strong>." },
      { name: "dist/ozone-connect/", desc: "APIs <strong>LFIs must implement</strong> for the API Hub to call." }
    ];
    const sections = computed(() => [
      {
        category: "TPP-facing",
        color: "var(--at-gold)",
        title: "Open Finance Standards",
        url: `/tech/api-specs/${selectedVersion.value}/tpp/`,
        desc: "The APIs the API Hub exposes to TPPs. TPPs use these endpoints to access financial data and initiate services on behalf of their customers &mdash; Trust Framework discovery, registration, token exchange, consent, bank data sharing, service initiation, Confirmation of Payee, ATMs, and event notifications.",
        flowFrom: "TPP",
        flowTo: "API Hub",
        distPath: "dist/standards/",
        audience: "TPP engineering"
      },
      {
        category: "LFI-facing (Hub)",
        color: "var(--at-teal)",
        title: "API Hub",
        url: `/tech/api-specs/${selectedVersion.value}/api-hub/`,
        desc: "The APIs the API Hub exposes to LFIs. An LFI calls these endpoints during the authorization journey &mdash; notably Headless Heimdall (for delegating end user authentication) and the Consent Manager (for looking up and updating consents).",
        flowFrom: "LFI",
        flowTo: "API Hub",
        distPath: "dist/api-hub/",
        audience: "LFI engineering"
      },
      {
        category: "LFI-implemented",
        color: "var(--at-navy-deep)",
        title: "Ozone Connect",
        url: `/tech/api-specs/${selectedVersion.value}/ozone-connect/`,
        desc: "The APIs LFIs must implement for the API Hub to call. When a TPP makes a valid request to the API Hub, the Hub proxies that request to the relevant LFI using these endpoints &mdash; consent events, data sharing, service initiation, Confirmation of Payee, products &amp; leads, and ATMs.",
        flowFrom: "API Hub",
        flowTo: "LFI",
        distPath: "dist/ozone-connect/",
        audience: "LFI engineering"
      },
      {
        category: "Directory",
        color: "var(--at-blue)",
        title: "Trust Framework",
        url: "/tech/api-specs/trust-framework/participants",
        desc: "The Raidiam-operated directory APIs that underpin the Open Finance ecosystem &mdash; participant discovery, organisation and software statement registration, authorisation server metadata, and the OAuth token endpoint used for mTLS-authenticated calls. These specifications are not version-bound to the UAE Open Finance release cycle.",
        flowFrom: "Application",
        flowTo: "Directory",
        distPath: "openapi/trust-framework.yaml",
        audience: "TPP and LFI engineering"
      },
      {
        category: "LFI-implemented (CAAP)",
        color: "var(--at-teal-deep)",
        title: "CAAP Operations",
        url: `/tech/api-specs/${selectedVersion.value}/ozone-connect/caap`,
        desc: "The endpoints LFIs must implement on Ozone Connect when adopting CAAP, the Nebras-operated authentication and consent authorisation platform. Includes user verification and registration, PII decryption, consent validation and augmentation, and the CAAP-specific account and insurance policy GETs that drive the end user&apos;s consent journey.",
        flowFrom: "CAAP",
        flowTo: "LFI",
        distPath: "dist/ozone-connect/.../caap-operations",
        audience: "LFI engineering (CAAP adopters)"
      }
    ]);
    function withAlpha(cssVar, alpha) {
      return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-spec" }, _attrs))} data-v-7b5b7fe9><section class="ed-spec-hero" data-v-7b5b7fe9><div class="ed-spec-hero__inner" data-v-7b5b7fe9><div class="ed-spec-hero__label" data-v-7b5b7fe9><span class="ed-spec-hero__label-dash" data-v-7b5b7fe9></span> Source of truth · OpenAPI 3.x </div><h1 class="ed-spec-hero__title" data-v-7b5b7fe9>API Specifications</h1><p class="ed-spec-hero__sub" data-v-7b5b7fe9> The official UAE Open Finance OpenAPI specifications are maintained in a single repository. The OpenAPI YAML files are the <strong data-v-7b5b7fe9>source of truth</strong> for every API in the ecosystem — where a guide or this site disagrees with a spec, the spec wins. </p></div></section><section class="ed-spec-repo" data-v-7b5b7fe9><div class="ed-spec-repo__inner" data-v-7b5b7fe9><div class="ed-spec-repo__card" data-v-7b5b7fe9><div class="ed-spec-repo__meta" data-v-7b5b7fe9><span class="ed-spec-repo__meta-dot" data-v-7b5b7fe9></span> GitHub repository </div><div class="ed-spec-repo__head" data-v-7b5b7fe9><svg class="ed-spec-repo__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="42" height="42" aria-hidden="true" data-v-7b5b7fe9><path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" data-v-7b5b7fe9></path></svg><div class="ed-spec-repo__head-text" data-v-7b5b7fe9><h2 class="ed-spec-repo__title" data-v-7b5b7fe9>Nebras-Open-Finance / api-specs</h2><p class="ed-spec-repo__sub" data-v-7b5b7fe9> The canonical OpenAPI repository. All specs on this site are fetched from its <code data-v-7b5b7fe9>dist/</code> directory at build time — no YAML is committed here. </p></div></div><div class="ed-spec-repo__paths" data-v-7b5b7fe9><!--[-->`);
      ssrRenderList(repoPaths, (p) => {
        _push(`<div class="ed-spec-repo__path" data-v-7b5b7fe9><code class="ed-spec-repo__path-name" data-v-7b5b7fe9>${ssrInterpolate(p.name)}</code><span class="ed-spec-repo__path-desc" data-v-7b5b7fe9>${p.desc ?? ""}</span></div>`);
      });
      _push(`<!--]--></div><div class="ed-spec-repo__branches" data-v-7b5b7fe9><div class="ed-spec-repo__branch" data-v-7b5b7fe9><span class="ed-spec-repo__branch-tag" data-v-7b5b7fe9>main</span><span class="ed-spec-repo__branch-desc" data-v-7b5b7fe9> Live source of truth — published, authoritative, externally consumable. New implementers should work from the latest version on <code data-v-7b5b7fe9>main</code>. </span></div><div class="ed-spec-repo__branch" data-v-7b5b7fe9><span class="ed-spec-repo__branch-tag ed-spec-repo__branch-tag--draft" data-v-7b5b7fe9>other branches</span><span class="ed-spec-repo__branch-desc" data-v-7b5b7fe9> Drafts of future content (for example a forthcoming <code data-v-7b5b7fe9>v2.2</code>). The Nebras Open Finance team will announce when draft content is ready for ecosystem review. </span></div></div><a class="ed-spec-repo__cta" href="https://github.com/Nebras-Open-Finance/api-specs" target="_blank" rel="noopener" data-v-7b5b7fe9><span data-v-7b5b7fe9>Open on GitHub</span><span class="ed-spec-repo__cta-arrow" data-v-7b5b7fe9>↗</span></a></div></div></section><section class="ed-spec-sections" data-v-7b5b7fe9><div class="ed-spec-sections__inner" data-v-7b5b7fe9><div class="ed-spec-sections__head" data-v-7b5b7fe9><div class="ed-spec-sections__eyebrow" data-v-7b5b7fe9><span class="ed-spec-sections__eyebrow-dash" data-v-7b5b7fe9></span> Specifications by audience </div><h2 class="ed-spec-sections__title" data-v-7b5b7fe9>Sections</h2><p class="ed-spec-sections__lede" data-v-7b5b7fe9> Specifications are organised by the audience that consumes them. The current version across the TPP, API Hub, and Ozone Connect categories is <strong data-v-7b5b7fe9>${ssrInterpolate(unref(selectedVersion))}</strong>; the Trust Framework directory follows its own release cycle. </p></div><div class="ed-spec-grid" data-v-7b5b7fe9><!--[-->`);
      ssrRenderList(unref(sections), (section) => {
        _push(`<a${ssrRenderAttr("href", section.url)} class="ed-spec-card" style="${ssrRenderStyle({ "--card-color": section.color })}" data-v-7b5b7fe9><span class="ed-spec-card__top" style="${ssrRenderStyle({ background: section.color })}" data-v-7b5b7fe9></span><div class="ed-spec-card__meta" data-v-7b5b7fe9><span class="ed-spec-card__cat" style="${ssrRenderStyle({ color: section.color })}" data-v-7b5b7fe9>${ssrInterpolate(section.category)}</span></div><h3 class="ed-spec-card__title" data-v-7b5b7fe9>${ssrInterpolate(section.title)}</h3><div class="ed-spec-card__flow" data-v-7b5b7fe9><span class="ed-spec-card__flow-node" data-v-7b5b7fe9>${ssrInterpolate(section.flowFrom)}</span><span class="ed-spec-card__flow-arrow" data-v-7b5b7fe9>→</span><span class="ed-spec-card__flow-node" data-v-7b5b7fe9>${ssrInterpolate(section.flowTo)}</span></div><p class="ed-spec-card__desc" data-v-7b5b7fe9>${section.desc ?? ""}</p><div class="ed-spec-card__tags" data-v-7b5b7fe9><span class="ed-spec-card__tag" style="${ssrRenderStyle({
          background: withAlpha(section.color, 0.1),
          color: section.color
        })}" data-v-7b5b7fe9><code data-v-7b5b7fe9>${ssrInterpolate(section.distPath)}</code></span><span class="ed-spec-card__audience" data-v-7b5b7fe9> Audience: ${ssrInterpolate(section.audience)}</span></div><div class="ed-spec-card__foot" data-v-7b5b7fe9><span class="ed-spec-card__cta" data-v-7b5b7fe9>Browse specs</span><span class="ed-spec-card__arrow" style="${ssrRenderStyle({ color: section.color })}" data-v-7b5b7fe9>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-spec-ref" data-v-7b5b7fe9><div class="ed-spec-ref__inner" data-v-7b5b7fe9><div class="ed-spec-ref__head" data-v-7b5b7fe9><div class="ed-spec-ref__eyebrow" data-v-7b5b7fe9><span class="ed-spec-ref__eyebrow-dash" data-v-7b5b7fe9></span> Reference </div><h2 class="ed-spec-ref__title" data-v-7b5b7fe9>How the repository works</h2></div><div class="ed-spec-ref__grid" data-v-7b5b7fe9><article class="ed-spec-ref__tile" data-v-7b5b7fe9><h3 class="ed-spec-ref__tile-title" data-v-7b5b7fe9>Viewing the specifications</h3><p class="ed-spec-ref__tile-body" data-v-7b5b7fe9> The pages under each section render every spec inline. To view a spec directly from the repository, <a href="https://redocly.github.io/redoc/" target="_blank" rel="noopener" data-v-7b5b7fe9>Redocly</a> gives a clean, navigable rendering of any YAML file — paste its raw GitHub URL into the Redocly viewer. </p></article><article class="ed-spec-ref__tile" data-v-7b5b7fe9><h3 class="ed-spec-ref__tile-title" data-v-7b5b7fe9>Versioning &amp; errata</h3><p class="ed-spec-ref__tile-body" data-v-7b5b7fe9> Specifications follow a <code data-v-7b5b7fe9>vMAJOR.MINOR</code> scheme. The same logical release spans all three categories — <code data-v-7b5b7fe9>dist/api-hub/${ssrInterpolate(unref(selectedVersion))}.x/</code>, <code data-v-7b5b7fe9>dist/ozone-connect/${ssrInterpolate(unref(selectedVersion))}.x/</code>, and <code data-v-7b5b7fe9>dist/standards/${ssrInterpolate(unref(selectedVersion))}/</code>. Errata releases (for example <code data-v-7b5b7fe9>dist/standards/${ssrInterpolate(unref(selectedVersion))}-errata1/</code>) contain targeted corrections; <strong data-v-7b5b7fe9>where an errata folder exists, the files inside it supersede the corresponding base version</strong>. </p></article><article class="ed-spec-ref__tile" data-v-7b5b7fe9><h3 class="ed-spec-ref__tile-title" data-v-7b5b7fe9>Governance folders</h3><p class="ed-spec-ref__tile-body" data-v-7b5b7fe9> The repository&#39;s <code data-v-7b5b7fe9>supporting/</code> directory holds material alongside the specs: <code data-v-7b5b7fe9>breaking-changes/</code> records breaking changes knowingly accepted within an errata (enforced by an oasdiff test), and <code data-v-7b5b7fe9>future-updates/</code> is a forward-looking design backlog for the next major version. </p></article></div><div class="ed-spec-ref__tip" data-v-7b5b7fe9><span class="ed-spec-ref__tip-label" data-v-7b5b7fe9>Watch for updates</span><span class="ed-spec-ref__tip-body" data-v-7b5b7fe9> Implementers are encouraged to <strong data-v-7b5b7fe9>watch</strong> the repository on GitHub to stay informed of new versions and changes as the specification evolves. </span></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/api-specs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b5b7fe9"]]);
export {
  index as default
};
