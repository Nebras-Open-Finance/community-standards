import { g as __unplugin_components_23, _ as _export_sfc } from "../main.mjs";
import { b as __unplugin_components_6$2, c as __unplugin_components_7$3, _ as __unplugin_components_0$1, a as __unplugin_components_2$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7$2, a as __unplugin_components_8$1 } from "./EdCompareCards-BLuIwQN6.js";
import { _ as __unplugin_components_7$1, a as __unplugin_components_8 } from "./EdStages-NkJQJXq7.js";
import { _ as __unplugin_components_4$1, a as __unplugin_components_13 } from "./EdPillList-CPl1guC3.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_9 } from "./EdSeverityTable-CdmPrf4w.js";
import { _ as __unplugin_components_10 } from "./EdLifetime-CLJ-d84N.js";
import { _ as __unplugin_components_6$1 } from "./EdExample-DPMgFk_O.js";
import { _ as __unplugin_components_6 } from "./EdCallout-BDBcOaPe.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0, a as __unplugin_components_1, b as __unplugin_components_2 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const sampleCode = `{
  "alg": "PS256",
  "typ": "JWT",
  "kid": "tpp-signing-2026-04"
}`;
const sampleAudExamples = `aud: https://api.openfinance.ae
aud: https://auth.lfi-foo.apihub.openfinance.ae`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "kit",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "hero", label: "Hero" },
      { id: "meta", label: "Meta" },
      { id: "keynums", label: "KeyNums" },
      { id: "sectionband", label: "SectionBand" },
      { id: "prose", label: "Prose" },
      { id: "bullets", label: "Bullets" },
      { id: "pilllist", label: "PillList" },
      { id: "note", label: "Note" },
      { id: "callout", label: "Callout" },
      { id: "example", label: "Example" },
      { id: "lifetime", label: "Lifetime" },
      { id: "severitytable", label: "SeverityTable" },
      { id: "reftable", label: "RefTable" },
      { id: "code", label: "Code" },
      { id: "twocol", label: "TwoCol" },
      { id: "stages", label: "Stages" },
      { id: "compare", label: "CompareCards" },
      { id: "related", label: "RelatedCards" },
      { id: "backstrip", label: "BackStrip" },
      { id: "inpagenav", label: "InPageNav" },
      { id: "hoversidebar", label: "HoverSidebar" }
    ];
    const heroMeta = [
      { label: "Audience", value: "TPP / LFI" },
      { label: "Status", value: "v2.1" },
      { label: "Updated", value: "2026-04-26" }
    ];
    const heroKeyNums = [
      { value: "25", label: "Editorial components" },
      { value: "1941", unit: "lines", label: "Source size (pre-port)" },
      { value: "0", label: "Direct LFI calls" }
    ];
    const severityRows = [
      { severity: "Critical", color: "#B33A3A", description: "Production traffic blocked. Immediate response required." },
      { severity: "High", color: "var(--at-gold)", description: "Significant degradation. Mitigation within 24 hours." },
      { severity: "Medium", color: "var(--at-blue-deep)", description: "Localised impact. Tracked through normal release." },
      { severity: "Low", color: "var(--at-teal-deep)", description: "Cosmetic or doc-only. Best-effort." }
    ];
    const sidebarItems = [
      {
        text: "Getting started",
        collapsed: false,
        items: [
          { text: "Overview", link: "/_dev/kit#hero" },
          { text: "Quick start", link: "/_dev/kit#prose" }
        ]
      },
      {
        text: "Components",
        collapsed: false,
        items: [
          { text: "Notes", link: "/_dev/kit#note" },
          { text: "Callouts", link: "/_dev/kit#callout" },
          { text: "Tables", link: "/_dev/kit#reftable" },
          {
            text: "Sub-group",
            items: [
              { text: "Nested A", link: "/_dev/kit#twocol" },
              { text: "Nested B", link: "/_dev/kit#stages" }
            ]
          }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdHero = __unplugin_components_0;
      const _component_EdMeta = __unplugin_components_1;
      const _component_EdKeyNums = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdPillList = __unplugin_components_4$1;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCallout = __unplugin_components_6;
      const _component_EdExample = __unplugin_components_6$1;
      const _component_EdLifetime = __unplugin_components_10;
      const _component_EdSeverityTable = __unplugin_components_9;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      const _component_EdTwoCol = __unplugin_components_13;
      const _component_EdStages = __unplugin_components_7$1;
      const _component_EdStage = __unplugin_components_8;
      const _component_EdCompareCards = __unplugin_components_7$2;
      const _component_EdCompareCard = __unplugin_components_8$1;
      const _component_EdRelatedCards = __unplugin_components_6$2;
      const _component_EdRelatedCard = __unplugin_components_7$3;
      const _component_EdBackStrip = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2$1;
      const _component_EdHoverSidebar = __unplugin_components_23;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "kit" }, _attrs))} data-v-9e2e7f8f><div class="kit__banner" data-v-9e2e7f8f><span class="kit__banner-label" data-v-9e2e7f8f>DEV KIT</span><span class="kit__banner-text" data-v-9e2e7f8f> Phase 2 verification — every Editorial component rendered with sample props. </span></div><section id="hero" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdHero</h2><p class="kit__desc" data-v-9e2e7f8f>Page hero with eyebrow, title, meta items, lede, and key numbers.</p>`);
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Editorial kit",
        title: "Phase 2 component port",
        meta: heroMeta,
        lede: "Every <strong>Ed*</strong> component, rebuilt against TypeScript-strict <code><script setup lang='ts'></code> and rewired off VitePress.",
        keyNums: heroKeyNums
      }, null, _parent));
      _push(`</section><section id="meta" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdMeta</h2><p class="kit__desc" data-v-9e2e7f8f>Stand-alone metadata strip (also embedded in EdHero).</p>`);
      _push(ssrRenderComponent(_component_EdMeta, { items: heroMeta }, null, _parent));
      _push(`</section><section id="keynums" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdKeyNums</h2><p class="kit__desc" data-v-9e2e7f8f>Stand-alone key-numbers grid (also embedded in EdHero).</p>`);
      _push(ssrRenderComponent(_component_EdKeyNums, { items: heroKeyNums }, null, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "sectionband",
        num: "01",
        eyebrow: "Sample band",
        title: "EdSectionBand — cream tone, numbered eyebrow",
        lede: "Used for top-level page sections. Slot accepts any editorial primitives.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`This is the slotted content of the section band. It can mix prose, lists, tables and callouts.`);
                } else {
                  return [
                    createTextVNode("This is the slotted content of the section band. It can mix prose, lists, tables and callouts.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("This is the slotted content of the section band. It can mix prose, lists, tables and callouts.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        eyebrow: "Surface variant",
        title: "EdSectionBand — surface tone, no number",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Surface tone uses a white background with top/bottom rules. Narrow caps inner width at 60rem.`);
                } else {
                  return [
                    createTextVNode("Surface tone uses a white background with top/bottom rules. Narrow caps inner width at 60rem.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Surface tone uses a white background with top/bottom rules. Narrow caps inner width at 60rem.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section id="prose" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdProse</h2><p class="kit__desc" data-v-9e2e7f8f>Standard paragraph treatment. Wraps a single &lt;p&gt;.</p>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Editorial paragraphs handle <strong data-v-9e2e7f8f${_scopeId}>bold emphasis</strong>, <em data-v-9e2e7f8f${_scopeId}>italics</em>, <a href="#hero" data-v-9e2e7f8f${_scopeId}>internal links</a>, and inline <code data-v-9e2e7f8f${_scopeId}>code</code> spans uniformly. `);
          } else {
            return [
              createTextVNode(" Editorial paragraphs handle "),
              createVNode("strong", null, "bold emphasis"),
              createTextVNode(", "),
              createVNode("em", null, "italics"),
              createTextVNode(", "),
              createVNode("a", { href: "#hero" }, "internal links"),
              createTextVNode(", and inline "),
              createVNode("code", null, "code"),
              createTextVNode(" spans uniformly. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="bullets" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdBullets</h2><p class="kit__desc" data-v-9e2e7f8f>Custom bulleted list. Default and tight density.</p>`);
      _push(ssrRenderComponent(_component_EdBullets, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<li data-v-9e2e7f8f${_scopeId}><strong data-v-9e2e7f8f${_scopeId}>Default density</strong> — generous padding, divider between rows.</li><li data-v-9e2e7f8f${_scopeId}>Each row supports <code data-v-9e2e7f8f${_scopeId}>code</code>, <em data-v-9e2e7f8f${_scopeId}>italics</em> and <a href="#prose" data-v-9e2e7f8f${_scopeId}>links</a>.</li><li data-v-9e2e7f8f${_scopeId}>Bullets render as small accent squares (teal by default).</li>`);
          } else {
            return [
              createVNode("li", null, [
                createVNode("strong", null, "Default density"),
                createTextVNode(" — generous padding, divider between rows.")
              ]),
              createVNode("li", null, [
                createTextVNode("Each row supports "),
                createVNode("code", null, "code"),
                createTextVNode(", "),
                createVNode("em", null, "italics"),
                createTextVNode(" and "),
                createVNode("a", { href: "#prose" }, "links"),
                createTextVNode(".")
              ]),
              createVNode("li", null, "Bullets render as small accent squares (teal by default).")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdBullets, {
        tight: "",
        accent: "var(--at-blue-deep)"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<li data-v-9e2e7f8f${_scopeId}>Tight density variant with a blue accent.</li><li data-v-9e2e7f8f${_scopeId}>Same content rules apply.</li>`);
          } else {
            return [
              createVNode("li", null, "Tight density variant with a blue accent."),
              createVNode("li", null, "Same content rules apply.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="pilllist" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdPillList</h2><p class="kit__desc" data-v-9e2e7f8f>Inline tag/keyword strip.</p>`);
      _push(ssrRenderComponent(_component_EdPillList, { items: ["OIDC", "FAPI", "PAR", "mTLS", "JWT"] }, null, _parent));
      _push(`</section><section id="note" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdNote</h2><p class="kit__desc" data-v-9e2e7f8f>Admonitions. Variants: tip, info, note, warning, caution, important, danger. Showing 3.</p>`);
      _push(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`A teal tip is the default treatment when <code data-v-9e2e7f8f${_scopeId}>type</code> is omitted.`);
          } else {
            return [
              createTextVNode("A teal tip is the default treatment when "),
              createVNode("code", null, "type"),
              createTextVNode(" is omitted.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdNote, {
        type: "warning",
        title: "Mind the cache TTL"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tokens cached longer than the consent duration will fail validation at the API Hub. `);
          } else {
            return [
              createTextVNode(" Tokens cached longer than the consent duration will fail validation at the API Hub. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdNote, { type: "danger" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-9e2e7f8f${_scopeId}>Do not</strong> route TPP traffic directly to the LFI. All traffic flows through the API Hub. `);
          } else {
            return [
              createVNode("strong", null, "Do not"),
              createTextVNode(" route TPP traffic directly to the LFI. All traffic flows through the API Hub. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="callout" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdCallout</h2><p class="kit__desc" data-v-9e2e7f8f>Generic accented block. Custom color via prop.</p>`);
      _push(ssrRenderComponent(_component_EdCallout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-9e2e7f8f${_scopeId}>Default callout uses the teal accent. Body supports <strong data-v-9e2e7f8f${_scopeId}>bold</strong>, <a href="#" data-v-9e2e7f8f${_scopeId}>links</a>, and <code data-v-9e2e7f8f${_scopeId}>code</code>.</p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode("Default callout uses the teal accent. Body supports "),
                createVNode("strong", null, "bold"),
                createTextVNode(", "),
                createVNode("a", { href: "#" }, "links"),
                createTextVNode(", and "),
                createVNode("code", null, "code"),
                createTextVNode(".")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdCallout, { color: "var(--at-blue-deep)" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-9e2e7f8f${_scopeId}>Custom-coloured rail — useful for category-specific callouts.</p>`);
          } else {
            return [
              createVNode("p", null, "Custom-coloured rail — useful for category-specific callouts.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="example" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdExample</h2><p class="kit__desc" data-v-9e2e7f8f>Tinted left-rail block, labelled &quot;Example&quot; by default.</p>`);
      _push(ssrRenderComponent(_component_EdExample, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-9e2e7f8f${_scopeId}>An <strong data-v-9e2e7f8f${_scopeId}>example</strong> block tinted with the accent colour at 6% opacity.</p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode("An "),
                createVNode("strong", null, "example"),
                createTextVNode(" block tinted with the accent colour at 6% opacity.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdExample, {
        label: "Counter-example",
        color: "#B33A3A"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-9e2e7f8f${_scopeId}>Custom label and rail color for negative or warning examples.</p>`);
          } else {
            return [
              createVNode("p", null, "Custom label and rail color for negative or warning examples.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="lifetime" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdLifetime</h2><p class="kit__desc" data-v-9e2e7f8f>Two-endpoint timeline visualisation.</p>`);
      _push(ssrRenderComponent(_component_EdLifetime, {
        from: "iat",
        to: "exp",
        duration: "≤ 60 seconds",
        recommended: "60s recommended",
        color: "var(--at-blue-deep)"
      }, null, _parent));
      _push(`</section><section id="severitytable" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdSeverityTable</h2><p class="kit__desc" data-v-9e2e7f8f>Severity-to-description grid with coloured chips.</p>`);
      _push(ssrRenderComponent(_component_EdSeverityTable, { rows: severityRows }, null, _parent));
      _push(`</section><section id="reftable" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdRefTable</h2><p class="kit__desc" data-v-9e2e7f8f>Reference-style table wrapper. Slot a raw &lt;table&gt;.</p>`);
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-v-9e2e7f8f${_scopeId}><thead data-v-9e2e7f8f${_scopeId}><tr data-v-9e2e7f8f${_scopeId}><th data-v-9e2e7f8f${_scopeId}>Claim</th><th data-v-9e2e7f8f${_scopeId}>Type</th><th data-v-9e2e7f8f${_scopeId}>Description</th></tr></thead><tbody data-v-9e2e7f8f${_scopeId}><tr data-v-9e2e7f8f${_scopeId}><td data-v-9e2e7f8f${_scopeId}><code data-v-9e2e7f8f${_scopeId}>iss</code></td><td data-v-9e2e7f8f${_scopeId}>string</td><td data-v-9e2e7f8f${_scopeId}>Issuer of the token.</td></tr><tr data-v-9e2e7f8f${_scopeId}><td data-v-9e2e7f8f${_scopeId}><code data-v-9e2e7f8f${_scopeId}>aud</code></td><td data-v-9e2e7f8f${_scopeId}>string</td><td data-v-9e2e7f8f${_scopeId}>Authorization Server&#39;s <strong data-v-9e2e7f8f${_scopeId}>issuer identifier</strong>.</td></tr><tr data-v-9e2e7f8f${_scopeId}><td data-v-9e2e7f8f${_scopeId}><code data-v-9e2e7f8f${_scopeId}>exp</code></td><td data-v-9e2e7f8f${_scopeId}>number</td><td data-v-9e2e7f8f${_scopeId}>Expiry as Unix epoch seconds.</td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Claim"),
                    createVNode("th", null, "Type"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "iss")
                    ]),
                    createVNode("td", null, "string"),
                    createVNode("td", null, "Issuer of the token.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "aud")
                    ]),
                    createVNode("td", null, "string"),
                    createVNode("td", null, [
                      createTextVNode("Authorization Server's "),
                      createVNode("strong", null, "issuer identifier"),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "exp")
                    ]),
                    createVNode("td", null, "number"),
                    createVNode("td", null, "Expiry as Unix epoch seconds.")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="code" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdCode</h2><p class="kit__desc" data-v-9e2e7f8f>Shiki-highlighted code block with optional filename.</p>`);
      _push(ssrRenderComponent(_component_EdCode, {
        code: sampleCode,
        lang: "json",
        filename: "JOSE header"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdCode, {
        code: sampleAudExamples,
        lang: "text"
      }, null, _parent));
      _push(`</section><section id="twocol" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdTwoCol</h2><p class="kit__desc" data-v-9e2e7f8f>Auto-fit two-column grid (slot-only layout primitive).</p>`);
      _push(ssrRenderComponent(_component_EdTwoCol, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Left column — wraps below 20rem.`);
                } else {
                  return [
                    createTextVNode("Left column — wraps below 20rem.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Right column — gutter is 2.5rem.`);
                } else {
                  return [
                    createTextVNode("Right column — gutter is 2.5rem.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Left column — wraps below 20rem.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Right column — gutter is 2.5rem.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="stages" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdStages + EdStage</h2><p class="kit__desc" data-v-9e2e7f8f>Numbered process steps stacked vertically.</p>`);
      _push(ssrRenderComponent(_component_EdStages, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdStage, {
              num: "1",
              title: "Initiate consent",
              numColor: "var(--at-blue-deep)"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9e2e7f8f${_scopeId2}>TPP creates a consent via PAR at the API Hub.</p>`);
                } else {
                  return [
                    createVNode("p", null, "TPP creates a consent via PAR at the API Hub.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdStage, {
              num: "2",
              title: "Authenticate at the LFI",
              numColor: "var(--at-teal)"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9e2e7f8f${_scopeId2}>The end user is redirected to the LFI to authenticate and authorize the consent.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The end user is redirected to the LFI to authenticate and authorize the consent.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdStage, {
              num: "3",
              title: "Use the access token",
              numColor: "var(--at-navy)"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9e2e7f8f${_scopeId2}>The TPP exchanges the authorization code for an access token at the API Hub.</p>`);
                } else {
                  return [
                    createVNode("p", null, "The TPP exchanges the authorization code for an access token at the API Hub.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdStage, {
                num: "1",
                title: "Initiate consent",
                numColor: "var(--at-blue-deep)"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "TPP creates a consent via PAR at the API Hub.")
                ]),
                _: 1
              }),
              createVNode(_component_EdStage, {
                num: "2",
                title: "Authenticate at the LFI",
                numColor: "var(--at-teal)"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "The end user is redirected to the LFI to authenticate and authorize the consent.")
                ]),
                _: 1
              }),
              createVNode(_component_EdStage, {
                num: "3",
                title: "Use the access token",
                numColor: "var(--at-navy)"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, "The TPP exchanges the authorization code for an access token at the API Hub.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="compare" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdCompareCards + EdCompareCard</h2><p class="kit__desc" data-v-9e2e7f8f>Side-by-side comparison cards with optional cadence row.</p>`);
      _push(ssrRenderComponent(_component_EdCompareCards, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCompareCard, {
              kicker: "One-off",
              example: "POST /payments",
              cadence: "single",
              cadenceLabel: "instance",
              accent: "var(--at-blue-deep)"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul data-v-9e2e7f8f${_scopeId2}><li data-v-9e2e7f8f${_scopeId2}>One authorisation, one execution.</li><li data-v-9e2e7f8f${_scopeId2}>Consent expires after success or 90 days.</li></ul>`);
                } else {
                  return [
                    createVNode("ul", null, [
                      createVNode("li", null, "One authorisation, one execution."),
                      createVNode("li", null, "Consent expires after success or 90 days.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCompareCard, {
              kicker: "Recurring",
              example: "POST /domestic-standing-orders",
              cadence: "N",
              cadenceLabel: "executions",
              accent: "var(--at-teal-deep)"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul data-v-9e2e7f8f${_scopeId2}><li data-v-9e2e7f8f${_scopeId2}>One authorisation, repeated executions.</li><li data-v-9e2e7f8f${_scopeId2}>Cancellable by either party.</li></ul>`);
                } else {
                  return [
                    createVNode("ul", null, [
                      createVNode("li", null, "One authorisation, repeated executions."),
                      createVNode("li", null, "Cancellable by either party.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCompareCard, {
                kicker: "One-off",
                example: "POST /payments",
                cadence: "single",
                cadenceLabel: "instance",
                accent: "var(--at-blue-deep)"
              }, {
                default: withCtx(() => [
                  createVNode("ul", null, [
                    createVNode("li", null, "One authorisation, one execution."),
                    createVNode("li", null, "Consent expires after success or 90 days.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCompareCard, {
                kicker: "Recurring",
                example: "POST /domestic-standing-orders",
                cadence: "N",
                cadenceLabel: "executions",
                accent: "var(--at-teal-deep)"
              }, {
                default: withCtx(() => [
                  createVNode("ul", null, [
                    createVNode("li", null, "One authorisation, repeated executions."),
                    createVNode("li", null, "Cancellable by either party.")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="related" class="kit__sec kit__sec--full" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdRelatedCards + EdRelatedCard</h2><p class="kit__desc" data-v-9e2e7f8f>Bottom-of-page &quot;read alongside&quot; grid.</p>`);
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Read alongside",
        title: "Related components"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "#hero",
              category: "Hero",
              categoryColor: "var(--at-teal)",
              title: "EdHero",
              desc: "Page hero with eyebrow, title, meta and key numbers."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "#sectionband",
              category: "Layout",
              categoryColor: "var(--at-blue-deep)",
              title: "EdSectionBand",
              desc: "Top-level page section with two tone variants."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "#note",
              category: "Admonition",
              categoryColor: "var(--at-gold)",
              title: "EdNote",
              desc: "Seven-variant admonition for tips, warnings and danger callouts."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "#hero",
                category: "Hero",
                categoryColor: "var(--at-teal)",
                title: "EdHero",
                desc: "Page hero with eyebrow, title, meta and key numbers."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "#sectionband",
                category: "Layout",
                categoryColor: "var(--at-blue-deep)",
                title: "EdSectionBand",
                desc: "Top-level page section with two tone variants."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "#note",
                category: "Admonition",
                categoryColor: "var(--at-gold)",
                title: "EdNote",
                desc: "Seven-variant admonition for tips, warnings and danger callouts."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="backstrip" class="kit__sec kit__sec--full" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdBackStrip</h2><p class="kit__desc" data-v-9e2e7f8f>Top-of-page back link with arrow.</p>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "#hero",
        text: "Back to the top of the kit"
      }, null, _parent));
      _push(`</section><section id="inpagenav" class="kit__sec kit__sec--full" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdInPageNav</h2><p class="kit__desc" data-v-9e2e7f8f>Sticky in-page anchor strip.</p>`);
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(`</section><section id="hoversidebar" class="kit__sec" data-v-9e2e7f8f><h2 class="kit__h2" data-v-9e2e7f8f>EdHoverSidebar (with EdSidebarItem)</h2><p class="kit__desc" data-v-9e2e7f8f> Hover-revealed left-edge drawer. Mounted at the page edge — look for the navy rail on the very left of the viewport. Requires &gt;= 960px viewport to render. Active link state uses vue-router&#39;s <code data-v-9e2e7f8f>useRoute()</code>. </p>`);
      _push(ssrRenderComponent(_component_EdHoverSidebar, {
        title: "Kit sections",
        rootHref: "#hero",
        items: sidebarItems
      }, null, _parent));
      _push(`</section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/_dev/kit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const kit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9e2e7f8f"]]);
export {
  kit as default
};
