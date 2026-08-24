import { defineComponent, computed, mergeProps, unref, useSSRContext, ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import { _ as _export_sfc, h as useInternalPages, p as prettifySlug, t as committedSlugs, b as block0 } from "../main.mjs";
import { marked } from "marked";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import "vite-ssg";
import "axios";
marked.setOptions({ gfm: true, breaks: false });
function isLoneImage(token) {
  var _a;
  return token.type === "paragraph" && Array.isArray(token.tokens) && token.tokens.length === 1 && ((_a = token.tokens[0]) == null ? void 0 : _a.type) === "image";
}
function parseInternalBlocks(source) {
  const tokens = marked.lexer(source || "");
  const blocks = [];
  let prose = "";
  const flushProse = () => {
    if (prose.trim()) blocks.push({ kind: "html", raw: prose });
    prose = "";
  };
  for (const token of tokens) {
    if (token.type === "code") {
      flushProse();
      blocks.push({ kind: "code", code: token.text ?? "", lang: token.lang || "plaintext" });
    } else if (isLoneImage(token)) {
      flushProse();
      const img = token.tokens[0];
      blocks.push({ kind: "image", src: img.href ?? "", alt: img.text ?? "" });
    } else {
      prose += token.raw;
    }
  }
  flushProse();
  return blocks;
}
function renderProse(raw) {
  return marked.parse(raw);
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InternalMarkdown",
  __ssrInlineRender: true,
  props: {
    source: {}
  },
  setup(__props) {
    const props = __props;
    const blocks = computed(() => parseInternalBlocks(props.source));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "internal-prose" }, _attrs))} data-v-dd1d453e><!--[-->`);
      ssrRenderList(blocks.value, (block, i) => {
        _push(`<!--[-->`);
        if (block.kind === "html") {
          _push(`<div data-v-dd1d453e>${unref(renderProse)(block.raw) ?? ""}</div>`);
        } else if (block.kind === "image") {
          _push(ssrRenderComponent(ImageViewer, {
            src: block.src,
            alt: block.alt,
            caption: block.alt
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(EdCode, {
            code: block.code,
            lang: block.lang
          }, null, _parent));
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      if (!blocks.value.length) {
        _push(`<p class="internal-md__empty" data-v-dd1d453e>Nothing to preview yet.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/InternalMarkdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const InternalMarkdown = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-dd1d453e"]]);
const REPO_URL = "https://github.com/Nebras-Open-Finance/community-standards";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Internal draft" });
    const route = useRoute();
    useRouter();
    const { getDraft, saveDraft } = useInternalPages();
    const slug = computed(() => {
      const raw = route.params["slug"];
      return typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] ?? "" : "";
    });
    const mode = ref("missing");
    const title = ref("");
    const body = ref("");
    const ready = ref(false);
    const view = ref("markdown");
    let suppressSave = false;
    function load() {
      if (committedSlugs.includes(slug.value)) {
        mode.value = "committed";
        return;
      }
      const draft = getDraft(slug.value);
      if (!draft) {
        mode.value = "missing";
        return;
      }
      suppressSave = true;
      title.value = draft.title;
      body.value = draft.body;
      mode.value = "draft";
      nextTick(() => {
        suppressSave = false;
      });
    }
    onMounted(() => {
      load();
      ready.value = true;
      if (typeof window !== "undefined") window.addEventListener("keydown", onKeydown);
    });
    onBeforeUnmount(() => {
      if (typeof window !== "undefined") window.removeEventListener("keydown", onKeydown);
      if (typeof document !== "undefined") document.body.style.overflow = "";
    });
    watch(slug, load);
    watch([title, body], () => {
      if (suppressSave) return;
      if (mode.value === "draft" && slug.value) {
        saveDraft(slug.value, { title: title.value, body: body.value });
      }
    });
    const targetPath = computed(() => `src/pages/internal/${slug.value}.md`);
    const routePath = computed(() => `/internal/${slug.value}`);
    function attr(value) {
      return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\r/g, "").replace(/\n/g, "&#10;");
    }
    const committedBody = computed(
      () => parseInternalBlocks(body.value).map((block) => {
        if (block.kind === "code") {
          return `<EdCode lang="${attr(block.lang)}" code="${attr(block.code)}" />`;
        }
        if (block.kind === "image") {
          return `<ImageViewer src="${attr(block.src)}" alt="${attr(block.alt)}" caption="${attr(block.alt)}" />`;
        }
        return block.raw.trim();
      }).filter((part) => part.length > 0).join("\n\n")
    );
    const fileContent = computed(() => {
      const safeTitle = (title.value || prettifySlug(slug.value)).replace(/"/g, '\\"');
      return [
        "---",
        "layout: internal",
        `title: "${safeTitle}"`,
        "next: false",
        "prev: false",
        "---",
        "",
        committedBody.value,
        ""
      ].join("\n");
    });
    const showPublish = ref(false);
    const publishMethod = ref("github");
    const githubNewFileUrl = computed(
      () => `${REPO_URL}/new/internal?filename=${encodeURIComponent(targetPath.value)}`
    );
    const githubPrUrl = `${REPO_URL}/compare/main...internal?expand=1`;
    const cloneCommands = computed(
      () => [
        `git clone ${REPO_URL}.git`,
        "cd community-standards",
        "git checkout internal"
      ].join("\n")
    );
    const updateCommands = [
      "cd community-standards",
      "git fetch origin",
      "git checkout internal",
      "git pull --ff-only"
    ].join("\n");
    const commitCommands = computed(() => {
      const msg = `Add internal page: ${slug.value}`.replace(/"/g, '\\"');
      return [
        `git add ${targetPath.value}`,
        `git commit -m "${msg}"`,
        "git push origin internal"
      ].join("\n");
    });
    const copied = ref({});
    function closePublish() {
      showPublish.value = false;
    }
    function onKeydown(e) {
      if (e.key === "Escape" && showPublish.value) closePublish();
    }
    watch(showPublish, (open) => {
      if (typeof document === "undefined") return;
      document.body.style.overflow = open ? "hidden" : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "int-draft" }, _attrs))} data-v-97014135>`);
      if (ready.value && mode.value === "committed") {
        _push(`<div class="int-draft__notice" data-v-97014135><h1 class="int-draft__notice-title" data-v-97014135>This page is already published</h1><p data-v-97014135><code data-v-97014135>${ssrInterpolate(slug.value)}</code> is a committed page. Edit it directly in the repository at <code data-v-97014135>${ssrInterpolate(targetPath.value)}</code>, or view it at <a${ssrRenderAttr("href", routePath.value)} data-v-97014135>${ssrInterpolate(routePath.value)}</a>. </p></div>`);
      } else if (ready.value && mode.value === "missing") {
        _push(`<div class="int-draft__notice" data-v-97014135><h1 class="int-draft__notice-title" data-v-97014135>Draft not found</h1><p data-v-97014135> There is no draft named <code data-v-97014135>${ssrInterpolate(slug.value)}</code> in this browser. Start one by duplicating the <a href="/internal/example" data-v-97014135>example page</a>, or pick an existing draft from the <a href="/internal/" data-v-97014135>internal home</a>. </p></div>`);
      } else if (ready.value && mode.value === "draft") {
        _push(`<!--[--><header class="int-draft__head" data-v-97014135><div class="int-draft__eyebrow" data-v-97014135><span class="int-draft__dash" data-v-97014135></span> Internal · Draft · <code data-v-97014135>${ssrInterpolate(slug.value)}</code></div><input${ssrRenderAttr("value", title.value)} type="text" class="int-draft__title-input" placeholder="Page title" aria-label="Page title" data-v-97014135><div class="int-draft__bar" data-v-97014135><div class="int-draft__toggle" role="tablist" aria-label="View mode" data-v-97014135><button type="button" role="tab" class="${ssrRenderClass([{ "is-active": view.value === "markdown" }, "int-draft__toggle-btn"])}"${ssrRenderAttr("aria-selected", view.value === "markdown")} data-v-97014135> Markdown </button><button type="button" role="tab" class="${ssrRenderClass([{ "is-active": view.value === "preview" }, "int-draft__toggle-btn"])}"${ssrRenderAttr("aria-selected", view.value === "preview")} data-v-97014135> Preview </button></div><div class="int-draft__bar-actions" data-v-97014135><span class="int-draft__autosave" data-v-97014135>Saved in this browser</span><button type="button" class="int-draft__publish-link" data-v-97014135> Publish… </button><button type="button" class="int-draft__delete" data-v-97014135>Delete</button></div></div></header>`);
        if (view.value === "markdown") {
          _push(`<textarea class="int-draft__textarea" spellcheck="true" aria-label="Markdown source" data-v-97014135>${ssrInterpolate(body.value)}</textarea>`);
        } else {
          _push(`<div class="int-draft__preview" data-v-97014135>`);
          _push(ssrRenderComponent(InternalMarkdown, { source: body.value }, null, _parent));
          _push(`</div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (showPublish.value) {
          _push2(`<div class="pub-overlay" role="dialog" aria-modal="true" aria-labelledby="pub-title" data-v-97014135><div class="pub-modal" data-v-97014135><header class="pub-modal__head" data-v-97014135><div data-v-97014135><div class="pub-modal__eyebrow" data-v-97014135><span class="pub-modal__dash" data-v-97014135></span> Publish </div><h2 id="pub-title" class="pub-modal__title" data-v-97014135>Publish this page</h2></div><button type="button" class="pub-modal__close" aria-label="Close" data-v-97014135>✕</button></header><div class="pub-modal__body" data-v-97014135><p class="pub-modal__lede" data-v-97014135> This draft lives only in your browser. Publishing commits it to the <code data-v-97014135>internal</code> branch of the <code data-v-97014135>community-standards</code> repository, where anyone with internal access can see it. To later push the page to the production site, open a pull request from <code data-v-97014135>internal</code> → <code data-v-97014135>main</code>. </p><div class="pub-modal__tabs" role="tablist" aria-label="Publish method" data-v-97014135><button type="button" role="tab" class="${ssrRenderClass([{ "is-active": publishMethod.value === "github" }, "pub-modal__tab"])}"${ssrRenderAttr("aria-selected", publishMethod.value === "github")} data-v-97014135> Edit on github.com </button><button type="button" role="tab" class="${ssrRenderClass([{ "is-active": publishMethod.value === "local" }, "pub-modal__tab"])}"${ssrRenderAttr("aria-selected", publishMethod.value === "local")} data-v-97014135> Edit locally </button></div>`);
          if (publishMethod.value === "github") {
            _push2(`<ol class="pub-modal__steps" data-v-97014135><li data-v-97014135><strong data-v-97014135>Open the new-file editor on GitHub.</strong> The link below opens the <code data-v-97014135>community-standards</code> repository on the <code data-v-97014135>internal</code> branch with the file path pre-filled. <p class="pub-modal__cta-row" data-v-97014135><a class="pub-modal__cta"${ssrRenderAttr("href", githubNewFileUrl.value)} target="_blank" rel="noopener noreferrer" data-v-97014135>Open new file on internal ↗</a><span class="pub-modal__cta-hint" data-v-97014135>opens github.com in a new tab</span></p></li><li data-v-97014135><strong data-v-97014135>Paste the Markdown below into the editor.</strong> The frontmatter is already generated, and standalone images / fenced code blocks have been promoted to <code data-v-97014135>&lt;ImageViewer&gt;</code> and <code data-v-97014135>&lt;EdCode&gt;</code>. <div class="pub-modal__block" data-v-97014135><div class="pub-modal__block-bar" data-v-97014135><span class="pub-modal__block-name" data-v-97014135>${ssrInterpolate(targetPath.value)}</span><button type="button" class="pub-modal__copy" data-v-97014135>${ssrInterpolate(copied.value.file ? "Copied" : "Copy file")}</button></div><pre class="pub-modal__block-body" data-v-97014135>${ssrInterpolate(fileContent.value)}</pre></div></li><li data-v-97014135><strong data-v-97014135>Commit directly to <code data-v-97014135>internal</code>.</strong> Use a message like <code data-v-97014135>Add internal page: ${ssrInterpolate(slug.value)}</code>, select <em data-v-97014135>Commit directly to the internal branch</em>, then click <em data-v-97014135>Commit new file</em>. The page is live on the internal area as soon as the site rebuilds. </li></ol>`);
          } else {
            _push2(`<ol class="pub-modal__steps" data-v-97014135><li data-v-97014135><strong data-v-97014135>Get the repository on the <code data-v-97014135>internal</code> branch.</strong> Pick the block that matches your setup. <div class="pub-modal__sub" data-v-97014135>First time — clone the repository:</div><div class="pub-modal__block" data-v-97014135><div class="pub-modal__block-bar" data-v-97014135><span class="pub-modal__block-name" data-v-97014135>terminal</span><button type="button" class="pub-modal__copy" data-v-97014135>${ssrInterpolate(copied.value.clone ? "Copied" : "Copy commands")}</button></div><pre class="pub-modal__block-body" data-v-97014135>${ssrInterpolate(cloneCommands.value)}</pre></div><div class="pub-modal__sub" data-v-97014135>Already cloned — make sure it&#39;s up to date:</div><div class="pub-modal__block" data-v-97014135><div class="pub-modal__block-bar" data-v-97014135><span class="pub-modal__block-name" data-v-97014135>terminal</span><button type="button" class="pub-modal__copy" data-v-97014135>${ssrInterpolate(copied.value.update ? "Copied" : "Copy commands")}</button></div><pre class="pub-modal__block-body" data-v-97014135>${ssrInterpolate(unref(updateCommands))}</pre></div></li><li data-v-97014135><strong data-v-97014135>Save the file at <code data-v-97014135>${ssrInterpolate(targetPath.value)}</code>.</strong> Create any missing directories. The frontmatter is already generated, and standalone images / fenced code blocks have been promoted to <code data-v-97014135>&lt;ImageViewer&gt;</code> and <code data-v-97014135>&lt;EdCode&gt;</code>. <div class="pub-modal__block" data-v-97014135><div class="pub-modal__block-bar" data-v-97014135><span class="pub-modal__block-name" data-v-97014135>${ssrInterpolate(targetPath.value)}</span><button type="button" class="pub-modal__copy" data-v-97014135>${ssrInterpolate(copied.value.file ? "Copied" : "Copy file")}</button></div><pre class="pub-modal__block-body" data-v-97014135>${ssrInterpolate(fileContent.value)}</pre></div></li><li data-v-97014135><strong data-v-97014135>Commit and push to <code data-v-97014135>internal</code>.</strong> Run these commands from the root of your clone. <div class="pub-modal__block" data-v-97014135><div class="pub-modal__block-bar" data-v-97014135><span class="pub-modal__block-name" data-v-97014135>terminal</span><button type="button" class="pub-modal__copy" data-v-97014135>${ssrInterpolate(copied.value.commit ? "Copied" : "Copy commands")}</button></div><pre class="pub-modal__block-body" data-v-97014135>${ssrInterpolate(commitCommands.value)}</pre></div></li></ol>`);
          }
          _push2(`<div class="pub-modal__footer" data-v-97014135><h3 class="pub-modal__footer-title" data-v-97014135>Optional — move it to production</h3><p class="pub-modal__footer-text" data-v-97014135> The <code data-v-97014135>internal</code> branch is only visible to internal users. When the page is ready to ship to the production site, open a pull request from <code data-v-97014135>internal</code> → <code data-v-97014135>main</code>. Once merged the page will be live at <code data-v-97014135>${ssrInterpolate(routePath.value)}</code>, and you can delete this local draft from the <a href="/internal/" data-v-97014135>internal home</a>. </p><p class="pub-modal__cta-row" data-v-97014135><a class="pub-modal__cta pub-modal__cta--ghost"${ssrRenderAttr("href", githubPrUrl)} target="_blank" rel="noopener noreferrer" data-v-97014135>Open PR: internal → main ↗</a></p></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/internal/draft/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-97014135"]]);
export {
  _slug_ as default
};
