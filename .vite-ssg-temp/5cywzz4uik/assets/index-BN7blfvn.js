import { defineComponent, mergeProps, createVNode, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { C as CURRENT_VERSION, _ as _export_sfc, b as block0 } from "../main.mjs";
import { E as ERRATA_SECTIONS } from "./erratas-registry-BXVJX5jN.js";
import { V as VERSION_CHANGES, c as changelogVersions } from "./version-changes-registry-C1NeaTDH.js";
import { l as latestApiHubYear, a as latestTrustFrameworkYear } from "./release-notes-years-g5sqBxpI.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const errataIds = [
      ...new Set(
        ERRATA_SECTIONS.filter((s) => s.version === CURRENT_VERSION).map((s) => s.errataId)
      )
    ].sort();
    const latestChangelogVersion = changelogVersions[changelogVersions.length - 1];
    const changelogPairs = [
      ...new Set(VERSION_CHANGES.map((c) => `${c.fromVersion} → ${c.toVersion}`))
    ].sort();
    const registers = [
      {
        tone: "teal",
        category: "Operational systems",
        title: "Release Notes",
        url: null,
        desc: "Changes deployed to the <strong>operational systems</strong> participants integrate with &mdash; the API Hub platform, the Trust Framework, and any supporting infrastructure. Each entry describes what was deployed, when it became effective, and the impact on TPPs and LFIs.",
        scope: "Deployments, platform behaviour changes, Trust Framework directory releases.",
        subsLabel: "Organised by component &mdash; then by calendar year",
        subs: [
          {
            title: "API Hub",
            hint: "OIDC authorization server, Consent Manager, gateway",
            url: `/tech/release-notes-and-erratas/release-notes/api-hub/${latestApiHubYear}`
          },
          {
            title: "Trust Framework",
            hint: "Directory, certificate authority, roles & scopes (Raidiam)",
            url: `/tech/release-notes-and-erratas/release-notes/trust-framework/${latestTrustFrameworkYear}`
          }
        ]
      },
      {
        tone: "gold",
        category: "Published documentation",
        title: "Erratas",
        url: `/tech/release-notes-and-erratas/erratas/${CURRENT_VERSION}/`,
        desc: "Corrections to <strong>published documentation</strong> &mdash; the TPP Standards, LFI Integration Guide, and OpenAPI specifications. Each entry records what was corrected, why the change was required, and the effective date.",
        scope: "Documentation corrections against a published standard version.",
        subs: [],
        items: errataIds,
        itemsLabel: `Erratas in ${CURRENT_VERSION}`
      },
      {
        tone: "teal",
        category: "Between versions",
        title: "Version Changelog",
        url: latestChangelogVersion ? `/tech/release-notes-and-erratas/changelog/${latestChangelogVersion}/` : null,
        desc: "Every change made <strong>between one Standards version and the next</strong> &mdash; consent identifiers, API paths, new capabilities, and areas explicitly left unchanged. Each entry records what changed, why, and who it affects.",
        scope: "Differences between published Standards versions.",
        subs: [],
        items: changelogPairs,
        itemsLabel: "Version transitions"
      }
    ];
    const policies = [
      {
        title: "Changes to Published Documentation",
        url: "/policy/changes-to-published-content",
        desc: "How published content may change after release &mdash; what requires an Errata, what does not, and how corrections are communicated."
      },
      {
        title: "Version Management",
        url: "/policy/version-management",
        desc: "How versions are numbered, when errata releases are cut, and how the relationship between Standards, API Hub, and Ozone Connect versions is maintained."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-rn" }, _attrs))} data-v-b6e0ecef><section class="ed-rn-hero" data-v-b6e0ecef><div class="ed-rn-hero__inner" data-v-b6e0ecef><div class="ed-rn-hero__label" data-v-b6e0ecef><span class="ed-rn-hero__label-dash" data-v-b6e0ecef></span> Post-publication register </div><h1 class="ed-rn-hero__title" data-v-b6e0ecef>Release Notes &amp; Erratas</h1><p class="ed-rn-hero__sub" data-v-b6e0ecef> The authoritative record of changes made after publication. The register is split in two — one side tracks changes to the <strong data-v-b6e0ecef>operational systems</strong> participants integrate with, the other tracks corrections to <strong data-v-b6e0ecef>published documentation</strong>. </p></div></section><section class="ed-rn-registers" data-v-b6e0ecef><div class="ed-rn-registers__inner" data-v-b6e0ecef><div class="ed-rn-registers__head" data-v-b6e0ecef><div class="ed-rn-registers__eyebrow" data-v-b6e0ecef><span class="ed-rn-registers__eyebrow-dash" data-v-b6e0ecef></span> Two registers </div><h2 class="ed-rn-registers__title" data-v-b6e0ecef>What has changed since publication</h2><p class="ed-rn-registers__lede" data-v-b6e0ecef> Release Notes describe <strong data-v-b6e0ecef>what was deployed</strong> to the platform. Erratas describe <strong data-v-b6e0ecef>what was corrected</strong> in the published documentation. Use them together to understand where the ecosystem stands. </p></div><div class="ed-rn-registers__grid" data-v-b6e0ecef><!--[-->`);
      ssrRenderList(registers, (reg) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(reg.url ? "a" : "div"), {
          key: reg.title,
          href: reg.url || void 0,
          class: ["ed-rn-reg", `ed-rn-reg--${reg.tone}`]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="ed-rn-reg__top" data-v-b6e0ecef${_scopeId}></span><div class="ed-rn-reg__head" data-v-b6e0ecef${_scopeId}><div class="ed-rn-reg__meta" data-v-b6e0ecef${_scopeId}><span class="ed-rn-reg__meta-dot" data-v-b6e0ecef${_scopeId}></span> ${ssrInterpolate(reg.category)}</div><h3 class="ed-rn-reg__title" data-v-b6e0ecef${_scopeId}>${ssrInterpolate(reg.title)}</h3><p class="ed-rn-reg__desc" data-v-b6e0ecef${_scopeId}>${reg.desc ?? ""}</p><div class="ed-rn-reg__scope" data-v-b6e0ecef${_scopeId}><span class="ed-rn-reg__scope-label" data-v-b6e0ecef${_scopeId}>Covers</span><span class="ed-rn-reg__scope-body" data-v-b6e0ecef${_scopeId}>${reg.scope ?? ""}</span></div>`);
              if (reg.items && reg.items.length) {
                _push2(`<div class="ed-rn-reg__items" data-v-b6e0ecef${_scopeId}><span class="ed-rn-reg__items-label" data-v-b6e0ecef${_scopeId}>${ssrInterpolate(reg.itemsLabel)}</span><ul class="ed-rn-reg__items-list" data-v-b6e0ecef${_scopeId}><!--[-->`);
                ssrRenderList(reg.items, (id) => {
                  _push2(`<li data-v-b6e0ecef${_scopeId}>${ssrInterpolate(id)}</li>`);
                });
                _push2(`<!--]--></ul></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (reg.subs.length) {
                _push2(`<ul class="ed-rn-reg__subs" data-v-b6e0ecef${_scopeId}><li class="ed-rn-reg__subs-label" data-v-b6e0ecef${_scopeId}>${ssrInterpolate(reg.subsLabel)}</li><!--[-->`);
                ssrRenderList(reg.subs, (sub) => {
                  _push2(`<li data-v-b6e0ecef${_scopeId}><a${ssrRenderAttr("href", sub.url)} class="ed-rn-reg__sub" data-v-b6e0ecef${_scopeId}><span class="ed-rn-reg__sub-marker" data-v-b6e0ecef${_scopeId}></span><span class="ed-rn-reg__sub-main" data-v-b6e0ecef${_scopeId}><span class="ed-rn-reg__sub-title" data-v-b6e0ecef${_scopeId}>${ssrInterpolate(sub.title)}</span><span class="ed-rn-reg__sub-hint" data-v-b6e0ecef${_scopeId}>${ssrInterpolate(sub.hint)}</span></span><span class="ed-rn-reg__sub-arrow" aria-hidden="true" data-v-b6e0ecef${_scopeId}>→</span></a></li>`);
                });
                _push2(`<!--]--></ul>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("span", { class: "ed-rn-reg__top" }),
                createVNode("div", { class: "ed-rn-reg__head" }, [
                  createVNode("div", { class: "ed-rn-reg__meta" }, [
                    createVNode("span", { class: "ed-rn-reg__meta-dot" }),
                    createTextVNode(" " + toDisplayString(reg.category), 1)
                  ]),
                  createVNode("h3", { class: "ed-rn-reg__title" }, toDisplayString(reg.title), 1),
                  createVNode("p", {
                    class: "ed-rn-reg__desc",
                    innerHTML: reg.desc
                  }, null, 8, ["innerHTML"]),
                  createVNode("div", { class: "ed-rn-reg__scope" }, [
                    createVNode("span", { class: "ed-rn-reg__scope-label" }, "Covers"),
                    createVNode("span", {
                      class: "ed-rn-reg__scope-body",
                      innerHTML: reg.scope
                    }, null, 8, ["innerHTML"])
                  ]),
                  reg.items && reg.items.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "ed-rn-reg__items"
                  }, [
                    createVNode("span", { class: "ed-rn-reg__items-label" }, toDisplayString(reg.itemsLabel), 1),
                    createVNode("ul", { class: "ed-rn-reg__items-list" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(reg.items, (id) => {
                        return openBlock(), createBlock("li", { key: id }, toDisplayString(id), 1);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                reg.subs.length ? (openBlock(), createBlock("ul", {
                  key: 0,
                  class: "ed-rn-reg__subs"
                }, [
                  createVNode("li", { class: "ed-rn-reg__subs-label" }, toDisplayString(reg.subsLabel), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(reg.subs, (sub) => {
                    return openBlock(), createBlock("li", {
                      key: sub.title
                    }, [
                      createVNode("a", {
                        href: sub.url,
                        class: "ed-rn-reg__sub"
                      }, [
                        createVNode("span", { class: "ed-rn-reg__sub-marker" }),
                        createVNode("span", { class: "ed-rn-reg__sub-main" }, [
                          createVNode("span", { class: "ed-rn-reg__sub-title" }, toDisplayString(sub.title), 1),
                          createVNode("span", { class: "ed-rn-reg__sub-hint" }, toDisplayString(sub.hint), 1)
                        ]),
                        createVNode("span", {
                          class: "ed-rn-reg__sub-arrow",
                          "aria-hidden": "true"
                        }, "→")
                      ], 8, ["href"])
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }), _parent);
      });
      _push(`<!--]--></div></div></section><section class="ed-rn-ref" data-v-b6e0ecef><div class="ed-rn-ref__inner" data-v-b6e0ecef><div class="ed-rn-ref__head" data-v-b6e0ecef><div class="ed-rn-ref__eyebrow" data-v-b6e0ecef><span class="ed-rn-ref__eyebrow-dash" data-v-b6e0ecef></span> Policy controls </div><h2 class="ed-rn-ref__title" data-v-b6e0ecef>How these registers are governed</h2><p class="ed-rn-ref__lede" data-v-b6e0ecef> Both registers are bound by the policies that control how published content evolves and how versions are promoted. </p></div><div class="ed-rn-ref__grid" data-v-b6e0ecef><!--[-->`);
      ssrRenderList(policies, (policy) => {
        _push(`<a${ssrRenderAttr("href", policy.url)} class="ed-rn-ref__tile" data-v-b6e0ecef><div class="ed-rn-ref__tile-meta" data-v-b6e0ecef><span class="ed-rn-ref__tile-meta-dash" data-v-b6e0ecef></span> Policy </div><h3 class="ed-rn-ref__tile-title" data-v-b6e0ecef>${ssrInterpolate(policy.title)}</h3><p class="ed-rn-ref__tile-body" data-v-b6e0ecef>${policy.desc ?? ""}</p><div class="ed-rn-ref__tile-foot" data-v-b6e0ecef><span class="ed-rn-ref__tile-cta" data-v-b6e0ecef>Read policy</span><span class="ed-rn-ref__tile-arrow" data-v-b6e0ecef>→</span></div></a>`);
      });
      _push(`<!--]--></div><div class="ed-rn-ref__tip" data-v-b6e0ecef><span class="ed-rn-ref__tip-label" data-v-b6e0ecef>Rule of thumb</span><span class="ed-rn-ref__tip-body" data-v-b6e0ecef> Once a version is published, its existing content <strong data-v-b6e0ecef>MUST NOT</strong> be changed without an associated Errata record. Platform deployments that affect behaviour participants depend on are captured in Release Notes. </span></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/release-notes-and-erratas/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6e0ecef"]]);
export {
  index as default
};
