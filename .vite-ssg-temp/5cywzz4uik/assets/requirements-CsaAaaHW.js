import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const data = {
  title: "Authorization Requirements",
  version: "v2.2-rc1",
  readTime: "3 min",
  lede: 'This page defines the required error handling behaviour when the consent authorization fails after the end user has been <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/">authenticated</a>. The LFI MUST invoke <code>POST /auth/{interactionId}/doFail</code> with the exact <code>error</code> and <code>error_description</code> values specified below.',
  preconditions: 'For all authorization failure scenarios, the LFI MUST PATCH the consent to <code>Rejected</code> before calling <code>doFail</code> — the end user has been identified during the authentication step. For the full <code>doFail</code> API specification, see the <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail"><code>POST /auth/{interactionId}/doFail</code> API Reference</a>.',
  sections: [
    {
      id: "error-scenarios",
      num: "01",
      title: "Error scenarios",
      subsections: [
        {
          heading: "1. End user explicitly cancels or declines the consent",
          blocks: [
            { kind: "prose", html: "The end user reviews the consent details and chooses to decline or cancel the authorization." },
            { kind: "table", table: {
              headers: ["Field", "Value"],
              rows: [
                { cells: ["<code>error</code>", "<code>access_denied</code>"] },
                { cells: ["<code>error_description</code>", "<code>user_rejected_consent</code>"] }
              ]
            } }
          ]
        },
        {
          heading: "2. End user lacks eligible accounts or access",
          blocks: [
            { kind: "prose", html: "The end user does not have any accounts or sufficient access rights to authorize the consent. For example: <ul><li>The end user has no eligible accounts for the requested consent type</li><li>The end user's accounts do not support the requested payment rail or currency</li><li>The consent has <code>IsSingleAuthorization</code> set to <code>true</code> but the end user does not have sufficient authority to authorize the payment independently — for example, where the payment would require an additional approver (subsequent authorizer)</li></ul>" },
            { kind: "table", table: {
              headers: ["Field", "Value"],
              rows: [
                { cells: ["<code>error</code>", "<code>invalid_request</code>"] },
                { cells: ["<code>error_description</code>", "<code>user_lacks_eligible_accounts</code>"] }
              ]
            } }
          ]
        },
        {
          heading: "3. Consent type not supported by LFI",
          blocks: [
            { kind: "prose", html: "The LFI does not support the consent type or configuration requested by the TPP." },
            { kind: "table", table: {
              headers: ["Field", "Value"],
              rows: [
                { cells: ["<code>error</code>", "<code>access_denied</code>"] },
                { cells: ["<code>error_description</code>", "<code>consent_not_supported</code>"] }
              ]
            } }
          ],
          callouts: [
            { kind: "tip", title: "Use POST /consent/action/validate instead", html: 'This scenario SHOULD NOT occur in steady state. LFIs SHOULD implement the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate"><code>POST /consent/action/validate</code></a> endpoint to reject unsupported consents at creation time — before the end user is redirected to the LFI. If this error is reported persistently or frequently, Nebras may require the LFI to implement the <code>POST /consent/action/validate</code> endpoint.' }
          ]
        },
        {
          heading: "4. End user session expires",
          blocks: [
            { kind: "prose", html: "The end user's session with the LFI expires before they complete the authorization of the consent." },
            { kind: "table", table: {
              headers: ["Field", "Value"],
              rows: [
                { cells: ["<code>error</code>", "<code>access_denied</code>"] },
                { cells: ["<code>error_description</code>", "<code>session_expired</code>"] }
              ]
            } }
          ],
          callouts: [
            { kind: "warning", title: "Session timeout guidance", html: "LFIs MUST ensure that session timeouts are not so short that they create an obstacle to an end user completing authentication and authorization. The introduction of payment step-up authentication enables LFIs to implement session management in a way that balances security with usability." }
          ]
        },
        {
          heading: "5. LFI internal technical error",
          blocks: [
            { kind: "prose", html: "The LFI encounters an internal technical error during the authorization process — for example, an internal service failure or inability to retrieve account data." },
            { kind: "table", table: {
              headers: ["Field", "Value"],
              rows: [
                { cells: ["<code>error</code>", "<code>server_error</code>"] },
                { cells: ["<code>error_description</code>", "<code>lfi_internal_error</code>"] }
              ]
            } }
          ]
        },
        {
          heading: "6. LFI fails to communicate with API Hub",
          blocks: [
            { kind: "prose", html: "The LFI cannot communicate with the API Hub during the authorization process — for example, a failure when calling <code>PATCH /consents/{consentId}</code> to update the consent status." },
            { kind: "table", table: {
              headers: ["Field", "Value"],
              rows: [
                { cells: ["<code>error</code>", "<code>server_error</code>"] },
                { cells: ["<code>error_description</code>", "<code>api_hub_communication_error</code>"] }
              ]
            } },
            { kind: "prose", html: "The LFI MUST attempt to PATCH the consent to <code>Rejected</code> before calling <code>doFail</code>, but if the API Hub is unreachable, the LFI MUST still call <code>doFail</code> to redirect the end user back to the TPP." }
          ]
        },
        {
          heading: "7. LFI temporarily unavailable",
          blocks: [
            { kind: "prose", html: "The LFI cannot complete authorization due to high load or temporary capacity constraints at the LFI's systems." },
            { kind: "table", table: {
              headers: ["Field", "Value"],
              rows: [
                { cells: ["<code>error</code>", "<code>temporarily_unavailable</code>"] },
                { cells: ["<code>error_description</code>", "<code>lfi_temporarily_unavailable</code>"] }
              ]
            } },
            { kind: "prose", html: "The LFI MUST PATCH the consent to <code>Rejected</code> before calling <code>doFail</code> — the end user has been identified during the authentication step." }
          ]
        }
      ]
    },
    {
      id: "summary",
      num: "02",
      title: "Summary",
      blocks: [
        { kind: "table", table: {
          headers: ["#", "Scenario", "`error`", "`error_description`"],
          rows: [
            { cells: ["1", "End user explicitly cancels or declines the consent", "<code>access_denied</code>", "<code>user_rejected_consent</code>"] },
            { cells: ["2", "End user lacks eligible accounts or access", "<code>invalid_request</code>", "<code>user_lacks_eligible_accounts</code>"] },
            { cells: ["3", "Consent type not supported by LFI", "<code>access_denied</code>", "<code>consent_not_supported</code>"] },
            { cells: ["4", "End user session expires", "<code>access_denied</code>", "<code>session_expired</code>"] },
            { cells: ["5", "LFI internal technical error", "<code>server_error</code>", "<code>lfi_internal_error</code>"] },
            { cells: ["6", "LFI fails to communicate with API Hub", "<code>server_error</code>", "<code>api_hub_communication_error</code>"] },
            { cells: ["7", "LFI temporarily unavailable", "<code>temporarily_unavailable</code>", "<code>lfi_temporarily_unavailable</code>"] }
          ]
        } },
        { kind: "prose", html: "For all scenarios above, the LFI MUST PATCH the consent to <code>Rejected</code> before calling <code>doFail</code>, except scenario 6 where the API Hub may be unreachable — in which case the LFI MUST make a best-effort attempt." }
      ],
      callouts: [
        { kind: "warning", title: "FAPI error code validation", html: "If the LFI submits an <code>error</code> code that is not supported by the FAPI 2.0 Security Profile, the API Hub will overwrite it with <code>invalid_request</code>." }
      ]
    }
  ]
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "requirements",
  __ssrInlineRender: true,
  setup(__props) {
    function validatorClass(v) {
      if (v === "API Hub") return "ed-req-validator--hub";
      if (v === "TPP") return "ed-req-validator--tpp";
      if (v === "N/A") return "ed-req-validator--none";
      if (v.startsWith("LFI")) return "ed-req-validator--lfi";
      return "ed-req-validator--lfi";
    }
    function splitValidator(v) {
      const m = v.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
      if (m && m[1] && m[2]) return { label: m[1].trim(), detail: m[2].trim() };
      return { label: v, detail: null };
    }
    function methodClass(m) {
      return m ? `http-${m.toLowerCase()}` : "";
    }
    function genericGridTemplate(headers) {
      var _a;
      const tracks = [];
      for (let i = 0; i < headers.length; i++) {
        const h = ((_a = headers[i]) == null ? void 0 : _a.trim()) ?? "";
        const isFirst = i === 0;
        const isLast = i === headers.length - 1;
        if (isFirst && h === "#") tracks.push("2.5rem");
        else if (isLast) tracks.push("minmax(0, 2.4fr)");
        else tracks.push("minmax(11rem, 1fr)");
      }
      return tracks.join(" ");
    }
    const eyebrow = computed(() => data.eyebrow ?? "Validate · Enforce · Trust");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-req" }, _attrs))} data-v-a6a48249><section class="ed-req-hero" data-v-a6a48249><div class="ed-req-hero__inner" data-v-a6a48249><div class="ed-req-hero__label" data-v-a6a48249><span class="ed-req-hero__label-dash" data-v-a6a48249></span> ${ssrInterpolate(unref(eyebrow))}</div><h1 class="ed-req-hero__title" data-v-a6a48249>${ssrInterpolate(unref(data).title)} `);
      if (unref(data).version) {
        _push(`<span class="ed-req-hero__badge" data-v-a6a48249>${ssrInterpolate(unref(data).version)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data).readTime) {
        _push(`<span class="ed-req-hero__read" data-v-a6a48249>${ssrInterpolate(unref(data).readTime)} read</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="ed-req-hero__sub" data-v-a6a48249>${unref(data).lede ?? ""}</p>`);
      if (unref(data).preconditions) {
        _push(`<p class="ed-req-hero__sub ed-req-hero__sub--tight" data-v-a6a48249>${unref(data).preconditions ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><!--[-->`);
      ssrRenderList(unref(data).sections, (s, i) => {
        _push(ssrRenderComponent(_component_EdSectionBand, {
          id: s.id,
          key: s.id,
          num: s.num,
          tone: i % 2 === 0 ? "cream" : "surface",
          eyebrow: s.method && s.path ? "Endpoint" : "Section",
          title: s.title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (s.method && s.path) {
                _push2(`<div class="ed-req-endpoint" data-v-a6a48249${_scopeId}><span class="${ssrRenderClass([methodClass(s.method), "http-badge"])}" data-v-a6a48249${_scopeId}>${ssrInterpolate(s.method)}</span><code class="ed-req-endpoint__path" data-v-a6a48249${_scopeId}>${ssrInterpolate(s.path)}</code></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.callouts || [], (c, ci) => {
                _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-a6a48249${_scopeId}>`);
                if (c.title) {
                  _push2(`<div class="ed-req-callout__title" data-v-a6a48249${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="ed-req-callout__body" data-v-a6a48249${_scopeId}>${c.html ?? ""}</div></div>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(s.blocks || [], (b, bi) => {
                _push2(`<!--[-->`);
                if (b.kind === "prose") {
                  _push2(`<p class="ed-req-intro" data-v-a6a48249${_scopeId}>${b.html ?? ""}</p>`);
                } else if (b.kind === "table") {
                  _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-a6a48249${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-a6a48249${_scopeId}><!--[-->`);
                  ssrRenderList(b.table.headers, (h, hi) => {
                    _push2(`<div class="ed-req-cell" role="columnheader" data-v-a6a48249${_scopeId}>${ssrInterpolate(h)}</div>`);
                  });
                  _push2(`<!--]--></div><!--[-->`);
                  ssrRenderList(b.table.rows, (r, ri) => {
                    _push2(`<div class="ed-req-row" role="row" data-v-a6a48249${_scopeId}><!--[-->`);
                    ssrRenderList(r.cells, (c, ci) => {
                      _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-a6a48249${_scopeId}>${c ?? ""}</div>`);
                    });
                    _push2(`<!--]--></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
              if (s.rules && s.rules.length) {
                _push2(`<div class="ed-req-table" role="table"${ssrRenderAttr("aria-label", s.title)} data-v-a6a48249${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-a6a48249${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="columnheader" data-v-a6a48249${_scopeId}>#</div><div class="ed-req-cell ed-req-cell--field" role="columnheader" data-v-a6a48249${_scopeId}>Field</div><div class="ed-req-cell ed-req-cell--rule" role="columnheader" data-v-a6a48249${_scopeId}>Rule</div><div class="ed-req-cell ed-req-cell--validator" role="columnheader" data-v-a6a48249${_scopeId}>Validated by</div></div><!--[-->`);
                ssrRenderList(s.rules, (r, idx) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-a6a48249${_scopeId}><div class="ed-req-cell ed-req-cell--num" role="cell" data-v-a6a48249${_scopeId}>${ssrInterpolate(idx + 1)}</div><div class="ed-req-cell ed-req-cell--field" role="cell" data-v-a6a48249${_scopeId}>${r.field ?? ""}</div><div class="ed-req-cell ed-req-cell--rule" role="cell" data-v-a6a48249${_scopeId}>${r.rule ?? ""}</div><div class="ed-req-cell ed-req-cell--validator" role="cell" data-v-a6a48249${_scopeId}><span class="${ssrRenderClass([validatorClass(r.validatedBy), "ed-req-validator"])}" data-v-a6a48249${_scopeId}><span class="ed-req-validator__label" data-v-a6a48249${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).label)}</span>`);
                  if (splitValidator(r.validatedBy).detail) {
                    _push2(`<span class="ed-req-validator__detail" data-v-a6a48249${_scopeId}>${ssrInterpolate(splitValidator(r.validatedBy).detail)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</span></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (s.table) {
                _push2(`<div class="ed-req-table ed-req-table--generic" role="table"${ssrRenderAttr("aria-label", s.title)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(s.table.headers) })}" data-v-a6a48249${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-a6a48249${_scopeId}><!--[-->`);
                ssrRenderList(s.table.headers, (h, hi) => {
                  _push2(`<div class="ed-req-cell" role="columnheader" data-v-a6a48249${_scopeId}>${ssrInterpolate(h)}</div>`);
                });
                _push2(`<!--]--></div><!--[-->`);
                ssrRenderList(s.table.rows, (r, ri) => {
                  _push2(`<div class="ed-req-row" role="row" data-v-a6a48249${_scopeId}><!--[-->`);
                  ssrRenderList(r.cells, (c, ci) => {
                    _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-a6a48249${_scopeId}>${c ?? ""}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(s.subsections || [], (sub, si) => {
                _push2(`<div class="ed-req-sub" data-v-a6a48249${_scopeId}><h3 class="ed-req-sub__heading" data-v-a6a48249${_scopeId}>${ssrInterpolate(sub.heading)}</h3><!--[-->`);
                ssrRenderList(sub.callouts || [], (c, ci) => {
                  _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-a6a48249${_scopeId}>`);
                  if (c.title) {
                    _push2(`<div class="ed-req-callout__title" data-v-a6a48249${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="ed-req-callout__body" data-v-a6a48249${_scopeId}>${c.html ?? ""}</div></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.blocks || [], (b, bi) => {
                  _push2(`<!--[-->`);
                  if (b.kind === "prose") {
                    _push2(`<p class="ed-req-sub__intro" data-v-a6a48249${_scopeId}>${b.html ?? ""}</p>`);
                  } else if (b.kind === "table") {
                    _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-a6a48249${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-a6a48249${_scopeId}><!--[-->`);
                    ssrRenderList(b.table.headers, (h, hi) => {
                      _push2(`<div class="ed-req-cell" role="columnheader" data-v-a6a48249${_scopeId}>${ssrInterpolate(h)}</div>`);
                    });
                    _push2(`<!--]--></div><!--[-->`);
                    ssrRenderList(b.table.rows, (r, ri) => {
                      _push2(`<div class="ed-req-row" role="row" data-v-a6a48249${_scopeId}><!--[-->`);
                      ssrRenderList(r.cells, (c, ci) => {
                        _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-a6a48249${_scopeId}>${c ?? ""}</div>`);
                      });
                      _push2(`<!--]--></div>`);
                    });
                    _push2(`<!--]--></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(sub.subsections || [], (sub2, s2i) => {
                  _push2(`<div class="ed-req-sub ed-req-sub--nested" data-v-a6a48249${_scopeId}><h4 class="ed-req-sub__heading ed-req-sub__heading--nested" data-v-a6a48249${_scopeId}>${ssrInterpolate(sub2.heading)}</h4><!--[-->`);
                  ssrRenderList(sub2.callouts || [], (c, ci) => {
                    _push2(`<div class="${ssrRenderClass([`ed-req-callout--${c.kind}`, "ed-req-callout"])}" data-v-a6a48249${_scopeId}>`);
                    if (c.title) {
                      _push2(`<div class="ed-req-callout__title" data-v-a6a48249${_scopeId}>${ssrInterpolate(c.title)}</div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="ed-req-callout__body" data-v-a6a48249${_scopeId}>${c.html ?? ""}</div></div>`);
                  });
                  _push2(`<!--]--><!--[-->`);
                  ssrRenderList(sub2.blocks || [], (b, bi) => {
                    _push2(`<!--[-->`);
                    if (b.kind === "prose") {
                      _push2(`<p class="ed-req-sub__intro" data-v-a6a48249${_scopeId}>${b.html ?? ""}</p>`);
                    } else if (b.kind === "table") {
                      _push2(`<div class="ed-req-table ed-req-table--generic ed-req-table--sub" role="table"${ssrRenderAttr("aria-label", sub2.heading)} style="${ssrRenderStyle({ gridTemplateColumns: genericGridTemplate(b.table.headers) })}" data-v-a6a48249${_scopeId}><div class="ed-req-row ed-req-row--head" role="row" data-v-a6a48249${_scopeId}><!--[-->`);
                      ssrRenderList(b.table.headers, (h, hi) => {
                        _push2(`<div class="ed-req-cell" role="columnheader" data-v-a6a48249${_scopeId}>${ssrInterpolate(h)}</div>`);
                      });
                      _push2(`<!--]--></div><!--[-->`);
                      ssrRenderList(b.table.rows, (r, ri) => {
                        _push2(`<div class="ed-req-row" role="row" data-v-a6a48249${_scopeId}><!--[-->`);
                        ssrRenderList(r.cells, (c, ci) => {
                          _push2(`<div class="ed-req-cell ed-req-cell--generic" role="cell" data-v-a6a48249${_scopeId}>${c ?? ""}</div>`);
                        });
                        _push2(`<!--]--></div>`);
                      });
                      _push2(`<!--]--></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<!--]-->`);
                  });
                  _push2(`<!--]--></div>`);
                });
                _push2(`<!--]--></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                s.method && s.path ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "ed-req-endpoint"
                }, [
                  createVNode("span", {
                    class: ["http-badge", methodClass(s.method)]
                  }, toDisplayString(s.method), 3),
                  createVNode("code", { class: "ed-req-endpoint__path" }, toDisplayString(s.path), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(s.callouts || [], (c, ci) => {
                  return openBlock(), createBlock("div", {
                    key: `${s.id}-callout-${ci}`,
                    class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                  }, [
                    c.title ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "ed-req-callout__title"
                    }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                    createVNode("div", {
                      class: "ed-req-callout__body",
                      innerHTML: c.html
                    }, null, 8, ["innerHTML"])
                  ], 2);
                }), 128)),
                (openBlock(true), createBlock(Fragment, null, renderList(s.blocks || [], (b, bi) => {
                  return openBlock(), createBlock(Fragment, {
                    key: `${s.id}-blk-${bi}`
                  }, [
                    b.kind === "prose" ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "ed-req-intro",
                      innerHTML: b.html
                    }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "ed-req-table ed-req-table--generic",
                      role: "table",
                      "aria-label": s.title,
                      style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                    }, [
                      createVNode("div", {
                        class: "ed-req-row ed-req-row--head",
                        role: "row"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                          return openBlock(), createBlock("div", {
                            key: `${s.id}-blk-${bi}-h-${hi}`,
                            class: "ed-req-cell",
                            role: "columnheader"
                          }, toDisplayString(h), 1);
                        }), 128))
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                        return openBlock(), createBlock("div", {
                          key: `${s.id}-blk-${bi}-r-${ri}`,
                          class: "ed-req-row",
                          role: "row"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                            return openBlock(), createBlock("div", {
                              key: `${s.id}-blk-${bi}-r-${ri}-c-${ci}`,
                              class: "ed-req-cell ed-req-cell--generic",
                              role: "cell",
                              innerHTML: c
                            }, null, 8, ["innerHTML"]);
                          }), 128))
                        ]);
                      }), 128))
                    ], 12, ["aria-label"])) : createCommentVNode("", true)
                  ], 64);
                }), 128)),
                s.rules && s.rules.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "ed-req-table",
                  role: "table",
                  "aria-label": s.title
                }, [
                  createVNode("div", {
                    class: "ed-req-row ed-req-row--head",
                    role: "row"
                  }, [
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--num",
                      role: "columnheader"
                    }, "#"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--field",
                      role: "columnheader"
                    }, "Field"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--rule",
                      role: "columnheader"
                    }, "Rule"),
                    createVNode("div", {
                      class: "ed-req-cell ed-req-cell--validator",
                      role: "columnheader"
                    }, "Validated by")
                  ]),
                  (openBlock(true), createBlock(Fragment, null, renderList(s.rules, (r, idx) => {
                    return openBlock(), createBlock("div", {
                      key: `${s.id}-rule-${idx}`,
                      class: "ed-req-row",
                      role: "row"
                    }, [
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--num",
                        role: "cell"
                      }, toDisplayString(idx + 1), 1),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--field",
                        role: "cell",
                        innerHTML: r.field
                      }, null, 8, ["innerHTML"]),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--rule",
                        role: "cell",
                        innerHTML: r.rule
                      }, null, 8, ["innerHTML"]),
                      createVNode("div", {
                        class: "ed-req-cell ed-req-cell--validator",
                        role: "cell"
                      }, [
                        createVNode("span", {
                          class: ["ed-req-validator", validatorClass(r.validatedBy)]
                        }, [
                          createVNode("span", { class: "ed-req-validator__label" }, toDisplayString(splitValidator(r.validatedBy).label), 1),
                          splitValidator(r.validatedBy).detail ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "ed-req-validator__detail"
                          }, toDisplayString(splitValidator(r.validatedBy).detail), 1)) : createCommentVNode("", true)
                        ], 2)
                      ])
                    ]);
                  }), 128))
                ], 8, ["aria-label"])) : createCommentVNode("", true),
                s.table ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "ed-req-table ed-req-table--generic",
                  role: "table",
                  "aria-label": s.title,
                  style: { gridTemplateColumns: genericGridTemplate(s.table.headers) }
                }, [
                  createVNode("div", {
                    class: "ed-req-row ed-req-row--head",
                    role: "row"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(s.table.headers, (h, hi) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-h-${hi}`,
                        class: "ed-req-cell",
                        role: "columnheader"
                      }, toDisplayString(h), 1);
                    }), 128))
                  ]),
                  (openBlock(true), createBlock(Fragment, null, renderList(s.table.rows, (r, ri) => {
                    return openBlock(), createBlock("div", {
                      key: `${s.id}-r-${ri}`,
                      class: "ed-req-row",
                      role: "row"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                        return openBlock(), createBlock("div", {
                          key: `${s.id}-r-${ri}-c-${ci}`,
                          class: "ed-req-cell ed-req-cell--generic",
                          role: "cell",
                          innerHTML: c
                        }, null, 8, ["innerHTML"]);
                      }), 128))
                    ]);
                  }), 128))
                ], 12, ["aria-label"])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(s.subsections || [], (sub, si) => {
                  return openBlock(), createBlock("div", {
                    key: `${s.id}-sub-${si}`,
                    class: "ed-req-sub"
                  }, [
                    createVNode("h3", { class: "ed-req-sub__heading" }, toDisplayString(sub.heading), 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.callouts || [], (c, ci) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-sub-${si}-callout-${ci}`,
                        class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                      }, [
                        c.title ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "ed-req-callout__title"
                        }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                        createVNode("div", {
                          class: "ed-req-callout__body",
                          innerHTML: c.html
                        }, null, 8, ["innerHTML"])
                      ], 2);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.blocks || [], (b, bi) => {
                      return openBlock(), createBlock(Fragment, {
                        key: `${s.id}-sub-${si}-blk-${bi}`
                      }, [
                        b.kind === "prose" ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "ed-req-sub__intro",
                          innerHTML: b.html
                        }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "ed-req-table ed-req-table--generic ed-req-table--sub",
                          role: "table",
                          "aria-label": sub.heading,
                          style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                        }, [
                          createVNode("div", {
                            class: "ed-req-row ed-req-row--head",
                            role: "row"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                              return openBlock(), createBlock("div", {
                                key: `${s.id}-sub-${si}-blk-${bi}-h-${hi}`,
                                class: "ed-req-cell",
                                role: "columnheader"
                              }, toDisplayString(h), 1);
                            }), 128))
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                            return openBlock(), createBlock("div", {
                              key: `${s.id}-sub-${si}-blk-${bi}-r-${ri}`,
                              class: "ed-req-row",
                              role: "row"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                                return openBlock(), createBlock("div", {
                                  key: `${s.id}-sub-${si}-blk-${bi}-r-${ri}-c-${ci}`,
                                  class: "ed-req-cell ed-req-cell--generic",
                                  role: "cell",
                                  innerHTML: c
                                }, null, 8, ["innerHTML"]);
                              }), 128))
                            ]);
                          }), 128))
                        ], 12, ["aria-label"])) : createCommentVNode("", true)
                      ], 64);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(sub.subsections || [], (sub2, s2i) => {
                      return openBlock(), createBlock("div", {
                        key: `${s.id}-sub-${si}-sub2-${s2i}`,
                        class: "ed-req-sub ed-req-sub--nested"
                      }, [
                        createVNode("h4", { class: "ed-req-sub__heading ed-req-sub__heading--nested" }, toDisplayString(sub2.heading), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(sub2.callouts || [], (c, ci) => {
                          return openBlock(), createBlock("div", {
                            key: `${s.id}-sub-${si}-sub2-${s2i}-callout-${ci}`,
                            class: ["ed-req-callout", `ed-req-callout--${c.kind}`]
                          }, [
                            c.title ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "ed-req-callout__title"
                            }, toDisplayString(c.title), 1)) : createCommentVNode("", true),
                            createVNode("div", {
                              class: "ed-req-callout__body",
                              innerHTML: c.html
                            }, null, 8, ["innerHTML"])
                          ], 2);
                        }), 128)),
                        (openBlock(true), createBlock(Fragment, null, renderList(sub2.blocks || [], (b, bi) => {
                          return openBlock(), createBlock(Fragment, {
                            key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}`
                          }, [
                            b.kind === "prose" ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "ed-req-sub__intro",
                              innerHTML: b.html
                            }, null, 8, ["innerHTML"])) : b.kind === "table" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "ed-req-table ed-req-table--generic ed-req-table--sub",
                              role: "table",
                              "aria-label": sub2.heading,
                              style: { gridTemplateColumns: genericGridTemplate(b.table.headers) }
                            }, [
                              createVNode("div", {
                                class: "ed-req-row ed-req-row--head",
                                role: "row"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(b.table.headers, (h, hi) => {
                                  return openBlock(), createBlock("div", {
                                    key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-h-${hi}`,
                                    class: "ed-req-cell",
                                    role: "columnheader"
                                  }, toDisplayString(h), 1);
                                }), 128))
                              ]),
                              (openBlock(true), createBlock(Fragment, null, renderList(b.table.rows, (r, ri) => {
                                return openBlock(), createBlock("div", {
                                  key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-r-${ri}`,
                                  class: "ed-req-row",
                                  role: "row"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(r.cells, (c, ci) => {
                                    return openBlock(), createBlock("div", {
                                      key: `${s.id}-sub-${si}-sub2-${s2i}-blk-${bi}-r-${ri}-c-${ci}`,
                                      class: "ed-req-cell ed-req-cell--generic",
                                      role: "cell",
                                      innerHTML: c
                                    }, null, 8, ["innerHTML"]);
                                  }), 128))
                                ]);
                              }), 128))
                            ], 12, ["aria-label"])) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ]);
                    }), 128))
                  ]);
                }), 128))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/requirements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requirements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a6a48249"]]);
export {
  requirements as default
};
