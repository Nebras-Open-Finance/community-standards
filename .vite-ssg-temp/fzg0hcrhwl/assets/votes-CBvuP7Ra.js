import { defineComponent, computed, ref, onMounted, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import { b as STANCE_ORDER, S as STANCE, u as useProposals } from "./useProposals-BAvc6Ljz.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
const LOGIN_MARKER_KEY = "nebras_votes_login_attempt";
const LOGIN_COOLDOWN_MS = 3e4;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "votes",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ meta: [{ name: "robots", content: "noindex, nofollow" }] });
    const route = useRoute();
    const id = computed(() => String(route.params.id || "").toUpperCase());
    const { auth, loadMe, loadProposalVotes, signInToVote } = useProposals();
    const loading = ref(true);
    const redirecting = ref(false);
    const loopDetected = ref(false);
    const data = ref(null);
    const errorStatus = ref(0);
    const errorMsg = ref("");
    async function load() {
      loading.value = true;
      loopDetected.value = false;
      errorStatus.value = 0;
      errorMsg.value = "";
      await loadMe();
      const res = await loadProposalVotes(id.value);
      if (res.ok && res.data) {
        data.value = res.data;
      } else {
        errorStatus.value = res.status;
        errorMsg.value = res.message || "";
        if (res.status === 401 && typeof window !== "undefined") {
          const marker = Number(window.sessionStorage.getItem(LOGIN_MARKER_KEY) || 0);
          if (marker && Date.now() - marker < LOGIN_COOLDOWN_MS) {
            window.sessionStorage.removeItem(LOGIN_MARKER_KEY);
            loopDetected.value = true;
            loading.value = false;
            return;
          }
          window.sessionStorage.setItem(LOGIN_MARKER_KEY, String(Date.now()));
          redirecting.value = true;
          signInToVote();
          return;
        }
        if (typeof window !== "undefined") window.sessionStorage.removeItem(LOGIN_MARKER_KEY);
      }
      loading.value = false;
    }
    onMounted(() => {
      void load();
      if (typeof window !== "undefined") window.scrollTo(0, 0);
    });
    const votesByStance = computed(() => {
      var _a;
      const groups = { for: [], against: [], abstain: [] };
      for (const v of ((_a = data.value) == null ? void 0 : _a.votes) ?? []) {
        if (groups[v.stance]) groups[v.stance].push(v);
      }
      return groups;
    });
    const tally = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.tally) ?? { for: 0, against: 0, abstain: 0, total: 0 };
    });
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function fmtWhen(raw) {
      if (!raw) return "";
      const d = /* @__PURE__ */ new Date(raw.replace(" ", "T") + "Z");
      if (Number.isNaN(d.getTime())) return raw;
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${hh}:${mm} UTC`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pv" }, _attrs))} data-v-01e1af2f><section class="pv-hero" data-v-01e1af2f><div class="pv-hero__inner" data-v-01e1af2f>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: `/proposals/${id.value.toLowerCase()}`,
        class: "pv__back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="pv__back-arrow" data-v-01e1af2f${_scopeId}>←</span> Back to ${ssrInterpolate(id.value)}`);
          } else {
            return [
              createVNode("span", { class: "pv__back-arrow" }, "←"),
              createTextVNode(" Back to " + toDisplayString(id.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pv__eyebrow" data-v-01e1af2f><span class="pv__eyebrow-dash" data-v-01e1af2f></span> Votes · Nebras &amp; super admins only</div><h1 class="pv__title" data-v-01e1af2f>${ssrInterpolate(data.value ? data.value.title : `${id.value} votes`)}</h1><p class="pv__id" data-v-01e1af2f>${ssrInterpolate(id.value)}</p>`);
      if (data.value) {
        _push(`<div class="pv__strip" data-v-01e1af2f><!--[-->`);
        ssrRenderList(unref(STANCE_ORDER), (s) => {
          _push(`<div class="pv__strip-item" data-v-01e1af2f><div class="pv__strip-key" style="${ssrRenderStyle({ color: unref(STANCE)[s].ink })}" data-v-01e1af2f>${ssrInterpolate(unref(STANCE)[s].label)}</div><div class="pv__strip-val" data-v-01e1af2f>${ssrInterpolate(tally.value[s])}</div></div>`);
        });
        _push(`<!--]--><div class="pv__strip-item" data-v-01e1af2f><div class="pv__strip-key" data-v-01e1af2f>Total</div><div class="pv__strip-val" data-v-01e1af2f>${ssrInterpolate(tally.value.total)}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><section class="pv-band" data-v-01e1af2f><div class="pv-band__inner" data-v-01e1af2f>`);
      if (loading.value || redirecting.value) {
        _push(`<div class="pv-note" data-v-01e1af2f>${ssrInterpolate(redirecting.value ? "Redirecting to sign-in…" : "Loading votes…")}</div>`);
      } else if (loopDetected.value) {
        _push(`<div class="pv-gate" data-v-01e1af2f><div class="pv-gate__label" data-v-01e1af2f>Sign in required</div><h2 class="pv-gate__title" data-v-01e1af2f>Sign-in didn&#39;t complete</h2><p class="pv-gate__msg" data-v-01e1af2f> We tried to sign you in but the session didn&#39;t stick. Try again, and if this keeps happening, check that third-party cookies are allowed for this site. </p><button type="button" class="pv-gate__btn" data-v-01e1af2f> Try again </button></div>`);
      } else if (errorStatus.value === 403) {
        _push(`<div class="pv-gate pv-gate--deny" data-v-01e1af2f><div class="pv-gate__label" data-v-01e1af2f>Access restricted</div><h2 class="pv-gate__title" data-v-01e1af2f>Your account can’t view this page</h2><p class="pv-gate__msg" data-v-01e1af2f>${ssrInterpolate(errorMsg.value || "This votes breakdown is restricted to Nebras staff and super admins.")} `);
        if (unref(auth).name) {
          _push(`<!--[--><br data-v-01e1af2f>Signed in as ${ssrInterpolate(unref(auth).name)}.<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div>`);
      } else if (errorStatus.value === 404) {
        _push(`<div class="pv-note" data-v-01e1af2f> No proposal with id <strong data-v-01e1af2f>${ssrInterpolate(id.value)}</strong> was found. </div>`);
      } else if (!data.value) {
        _push(`<div class="pv-note" data-v-01e1af2f>${ssrInterpolate(errorMsg.value || "Could not load votes. Please try again.")}</div>`);
      } else {
        _push(`<!--[-->`);
        if (tally.value.total === 0) {
          _push(`<p class="pv-note" data-v-01e1af2f>No votes have been cast yet.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(STANCE_ORDER), (s) => {
          _push(`<div class="pv-group" style="${ssrRenderStyle(votesByStance.value[s].length ? null : { display: "none" })}" data-v-01e1af2f><div class="pv-group__head" style="${ssrRenderStyle({ borderTopColor: unref(STANCE)[s].bar })}" data-v-01e1af2f><span class="pv-group__pill" style="${ssrRenderStyle({ color: unref(STANCE)[s].ink, background: `${unref(STANCE)[s].bar}22` })}" data-v-01e1af2f>${ssrInterpolate(unref(STANCE)[s].label)}</span><span class="pv-group__count" data-v-01e1af2f>${ssrInterpolate(votesByStance.value[s].length)} ${ssrInterpolate(votesByStance.value[s].length === 1 ? "vote" : "votes")}</span></div><ul class="pv-votes" data-v-01e1af2f><!--[-->`);
          ssrRenderList(votesByStance.value[s], (v, i) => {
            _push(`<li class="pv-vote" data-v-01e1af2f><div class="pv-vote__who" data-v-01e1af2f><span class="pv-vote__person" data-v-01e1af2f>${ssrInterpolate(v.person || v.org || "Unknown")}</span>`);
            if (v.person && v.org) {
              _push(`<span class="pv-vote__org" data-v-01e1af2f>${ssrInterpolate(v.org)}</span>`);
            } else {
              _push(`<!---->`);
            }
            if (v.created_at) {
              _push(`<span class="pv-vote__when" data-v-01e1af2f>${ssrInterpolate(fmtWhen(v.created_at))}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            if (v.comment) {
              _push(`<p class="pv-vote__comment" data-v-01e1af2f>${ssrInterpolate(v.comment)}</p>`);
            } else {
              _push(`<p class="pv-vote__comment pv-vote__comment--empty" data-v-01e1af2f>No comment</p>`);
            }
            if (v.answers && v.answers.length) {
              _push(`<div class="pv-answers" data-v-01e1af2f><!--[-->`);
              ssrRenderList(v.answers, (a, j) => {
                _push(`<div class="pv-answer" data-v-01e1af2f><div class="pv-answer__q" data-v-01e1af2f>${ssrInterpolate(a.q)}</div><div class="pv-answer__a" data-v-01e1af2f>${ssrInterpolate(a.a)}</div></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ul></div>`);
        });
        _push(`<!--]--><!--]-->`);
      }
      _push(`</div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/[id]/votes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const votes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-01e1af2f"]]);
export {
  votes as default
};
