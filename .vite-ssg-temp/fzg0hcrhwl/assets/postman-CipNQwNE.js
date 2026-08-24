import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const REPO = "Nebras-Open-Finance/postman";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "postman",
  __ssrInlineRender: true,
  setup(__props) {
    const postmanPaths = [
      { name: "banking.postman_collection.json", desc: "Banking collection — consent, account &amp; transaction data, payment initiation, Confirmation of Payee, products &amp; leads, ATMs, and webhooks." },
      { name: "insurance.postman_collection.json", desc: "Insurance collection — consent, policy data sharing, quotation, revocation, and webhooks." }
    ];
    const postmanBranches = [
      { tag: "main", desc: "Live source of truth — published, authoritative, externally consumable. New implementers should work from the latest version on <code>main</code>." },
      { tag: "other branches", draft: true, desc: "Drafts of future content (for example a forthcoming <code>v2.2</code>). The Nebras Open Finance team will announce when draft content is ready for ecosystem review." }
    ];
    const REPO_URL = `https://github.com/${REPO}`;
    const bankingRows = [
      { folder: "Data Sharing", href: "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/", role: "BDSP", desc: "Consent lifecycle plus account, balance, transaction, beneficiary, standing order, and party data. Available in <code>application/json</code> and <code>application/jwt</code> formats." },
      { folder: "Service Initiation — Domestic", href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/", role: "BSIP", desc: 'All <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/#multi-payment-consents">payment consent types</a>: single instant (including CoP and multi-auth variants), all six multi-payment schedule types, delegated SCA, and refunds.' },
      { folder: "Service Initiation — International", href: "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/", role: "BSIP", desc: "Single instant and fixed periodic schedule for cross-border transfers." },
      { folder: "Confirmation of Payee", href: "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/", role: "BSIP", desc: "Two-step name verification: discovery (API Hub) then confirmation (resolved LFI). Client credentials flow, <code>application/jwt</code> throughout." },
      { folder: "Products, Leads", href: "/tech/tpp-standards/v2.2-rc1/banking/products-leads/", role: "BDSP", desc: "Open data endpoints — no user consent required." },
      { folder: "ATMs", href: "/tech/tpp-standards/v2.2-rc1/banking/atms/", role: "BDSP", desc: "ATM location and service data published by LFIs. No user consent required." },
      { folder: "Webhooks", href: "/tech/tpp-standards/v2.2-rc1/webhooks/", role: "—", desc: "Simulate JWE-encrypted event receipt and <code>202 Accepted</code> response." }
    ];
    const insuranceRows = [
      { folder: "Data Sharing", desc: "Consent and access to insurance policy information." },
      { folder: "Quotation", desc: "Insurance quote retrieval following consent." },
      { folder: "Revoke", desc: "Consent revocation by ID or group ID." },
      { folder: "Webhooks / Do Fail", desc: "Webhook receipt testing and failure simulation." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "pg" }, _attrs))} data-v-528c699a><section class="pg__hero" data-v-528c699a><div class="pg__inner" data-v-528c699a><div class="pg__eyebrow" data-v-528c699a><span class="pg__eyebrow-dash" data-v-528c699a></span> Sandbox testing · Postman </div><h1 class="pg__title" data-v-528c699a> Postman Collection <span class="pg__read" data-v-528c699a>2 min read</span></h1><p class="pg__lede" data-v-528c699a> A Postman collection provided to the UAE Open Finance ecosystem to help <strong data-v-528c699a>LFIs</strong> and <strong data-v-528c699a>TPPs</strong> test their API implementations against the Open Finance Trust Framework. The collection covers the full sandbox flow — TPP registration, consent, authorization, and payments — and can be downloaded pre-configured for your application from the <a href="/tech/tpp-standards/v2.2-rc1/getting-started/" data-v-528c699a>Getting Started</a> page. </p></div></section><section class="pg__repo-section" data-v-528c699a><div class="pg__inner" data-v-528c699a><div class="gh" data-v-528c699a><div class="gh__meta" data-v-528c699a><span class="gh__meta-dot" data-v-528c699a></span> GitHub repository </div><div class="gh__head" data-v-528c699a><svg class="gh__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="42" height="42" aria-hidden="true" data-v-528c699a><path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" data-v-528c699a></path></svg><div class="gh__head-text" data-v-528c699a><div class="gh__title" data-v-528c699a>Nebras-Open-Finance / postman</div><p class="gh__sub" data-v-528c699a> The two <code data-v-528c699a>.postman_collection.json</code> files at the root of the repository are the published surface — import either one into Postman to start using it. </p></div></div><div class="gh__paths" data-v-528c699a><!--[-->`);
      ssrRenderList(postmanPaths, (p) => {
        _push(`<div class="gh__path" data-v-528c699a><code class="gh__path-name" data-v-528c699a>${ssrInterpolate(p.name)}</code><span class="gh__path-desc" data-v-528c699a>${p.desc ?? ""}</span></div>`);
      });
      _push(`<!--]--></div><div class="gh__branches" data-v-528c699a><!--[-->`);
      ssrRenderList(postmanBranches, (b) => {
        _push(`<div class="gh__branch" data-v-528c699a><span class="${ssrRenderClass([{ "gh__branch-tag--draft": b.draft }, "gh__branch-tag"])}" data-v-528c699a>${ssrInterpolate(b.tag)}</span><span class="gh__branch-desc" data-v-528c699a>${b.desc ?? ""}</span></div>`);
      });
      _push(`<!--]--></div><a class="gh__cta"${ssrRenderAttr("href", REPO_URL)} target="_blank" rel="noopener" data-v-528c699a><span data-v-528c699a>Open on GitHub</span><span class="gh__cta-arrow" aria-hidden="true" data-v-528c699a>↗</span></a></div></div></section><section class="pg__collections" data-v-528c699a><div class="pg__inner" data-v-528c699a><div class="pg__section-head" data-v-528c699a><div class="pg__section-eyebrow" data-v-528c699a><span class="pg__eyebrow-dash" data-v-528c699a></span> Collections </div><h2 class="pg__section-title" data-v-528c699a>What&#39;s inside</h2><p class="pg__section-sub" data-v-528c699a> Folders inside each <code data-v-528c699a>.postman_collection.json</code>, the role they require, and what they cover. </p></div><div class="pg__group" data-v-528c699a><div class="pg__group-head" data-v-528c699a><h3 class="pg__group-title" data-v-528c699a>Banking</h3><span class="pg-version" data-v-528c699a>V1.2 · V2.0 · V2.1 (current)</span></div><div class="pg-table-wrap" data-v-528c699a><table class="pg-table" data-v-528c699a><thead data-v-528c699a><tr data-v-528c699a><th data-v-528c699a>Folder</th><th data-v-528c699a>Role</th><th data-v-528c699a>Description</th></tr></thead><tbody data-v-528c699a><!--[-->`);
      ssrRenderList(bankingRows, (row) => {
        _push(`<tr data-v-528c699a><td data-v-528c699a>`);
        if (row.href) {
          _push(`<a${ssrRenderAttr("href", row.href)} data-v-528c699a>${ssrInterpolate(row.folder)}</a>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(row.folder)}<!--]-->`);
        }
        _push(`</td><td data-v-528c699a><span class="${ssrRenderClass([`pg-role--${row.role.toLowerCase().replace("—", "none")}`, "pg-role"])}" data-v-528c699a>${ssrInterpolate(row.role)}</span></td><td data-v-528c699a><span data-v-528c699a>${row.desc ?? ""}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="pg__group" data-v-528c699a><div class="pg__group-head" data-v-528c699a><h3 class="pg__group-title" data-v-528c699a>Insurance</h3><span class="pg-version" data-v-528c699a>V2.1 (current)</span></div><div class="pg-table-wrap" data-v-528c699a><table class="pg-table" data-v-528c699a><thead data-v-528c699a><tr data-v-528c699a><th data-v-528c699a>Folder</th><th data-v-528c699a>Description</th></tr></thead><tbody data-v-528c699a><!--[-->`);
      ssrRenderList(insuranceRows, (row) => {
        _push(`<tr data-v-528c699a><td data-v-528c699a>${ssrInterpolate(row.folder)}</td><td data-v-528c699a>${ssrInterpolate(row.desc)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></section></main>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/getting-started/postman.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const postman = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-528c699a"]]);
export {
  postman as default
};
