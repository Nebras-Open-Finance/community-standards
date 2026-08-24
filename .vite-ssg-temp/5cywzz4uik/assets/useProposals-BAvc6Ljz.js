import { ref, computed, watch } from "vue";
const VOTERS = [
  "ADIB",
  "Wio Bank",
  "Emirates NBD",
  "FAB",
  "Mashreq",
  "ENBD X",
  "HSBC UAE",
  "DIB",
  "CBD",
  "RAKBANK",
  "ADCB",
  "Liv.",
  "YAP",
  "Zand",
  "Ruya",
  "Al Maryah",
  "Lean",
  "Tarabut",
  "TrueLayer",
  "Nymcard",
  "Mamo",
  "Pyypl",
  "Ziina",
  "Baraka"
];
const STANCE = {
  for: { label: "For", ink: "#008B78", bar: "#00C2A9" },
  against: { label: "Against", ink: "#A6391F", bar: "#C2502E" },
  abstain: { label: "Abstain", ink: "#6B7280", bar: "#A8ABB2" }
};
const STANCE_ORDER = ["for", "against", "abstain"];
const STATUS = {
  draft: { label: "Draft", fg: "#B37819", bg: "rgba(179,120,25,0.12)" },
  open: { label: "Open", fg: "#0043A6", bg: "rgba(0,67,166,0.08)" },
  closed: { label: "Closed", fg: "#6B7280", bg: "rgba(107,114,128,0.12)" },
  internal: { label: "Internal", fg: "#6D28D9", bg: "rgba(109,40,217,0.12)" }
};
function todayISO() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function deriveStatus(opened, closes, today = todayISO(), internal = false) {
  if (internal) return "internal";
  if (opened && today < opened) return "draft";
  if (closes && today > closes) return "closed";
  return "open";
}
const PRIORITY = {
  critical: { label: "Critical", color: "#A6391F", level: 3 },
  high: { label: "High impact", color: "#B37819", level: 2 },
  medium: { label: "Medium", color: "#008BE4", level: 1 },
  low: { label: "Low", color: "#6B7280", level: 1 }
};
function isDecided(status) {
  return status === "closed";
}
const API_BASE = "https://proposals-api.nebras-open-finance.com".replace(/\/$/, "");
const PROPOSALS_CONFIG = {
  // 'always' shows the tally to everyone; 'after-vote' hides it until you vote.
  resultsVisibility: "always",
  // 'stance' = three For/Against/Abstain columns; 'chronological' = one thread.
  commentGrouping: "stance"
};
const VOTES_KEY = "altareq_proposal_votes";
const myVotes = ref({});
const auth = ref({ loaded: false, authenticated: false, orgs: [], canVote: false, isAdmin: false });
const proposalList = ref([]);
const liveById = ref({});
const metaById = ref({});
let hydrated = false;
function loadJSON(key, fallback) {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  myVotes.value = loadJSON(VOTES_KEY, {});
}
watch(
  myVotes,
  (v) => {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(VOTES_KEY, JSON.stringify(v));
    } catch {
    }
  },
  { deep: true }
);
const emptyCounts = () => ({ for: 0, against: 0, abstain: 0, total: 0 });
async function loadAll() {
  var _a;
  if (typeof window === "undefined") return;
  try {
    const res = await fetch(`${API_BASE}/proposals`);
    if (!res.ok) return;
    const data = await res.json();
    proposalList.value = data.proposals;
    const next = { ...liveById.value };
    const nextMeta = { ...metaById.value };
    for (const p of data.proposals) {
      next[p.id] = { counts: p.tally, votes: ((_a = next[p.id]) == null ? void 0 : _a.votes) ?? [] };
      nextMeta[p.id] = p;
    }
    liveById.value = next;
    metaById.value = nextMeta;
  } catch {
  }
}
async function loadOne(id) {
  if (typeof window === "undefined" || !id) return;
  try {
    const res = await fetch(`${API_BASE}/proposals/${encodeURIComponent(id)}`);
    if (!res.ok) return;
    const p = await res.json();
    liveById.value = { ...liveById.value, [id]: { counts: p.tally, votes: p.votes ?? [] } };
    const { tally: _t, votes: _v, ...meta } = p;
    metaById.value = { ...metaById.value, [id]: { ...meta, tally: p.tally } };
  } catch {
  }
}
async function loadMe() {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch(`${API_BASE}/me`, { credentials: "include" });
    if (!res.ok) {
      auth.value = { loaded: true, authenticated: false, orgs: [], canVote: false, isAdmin: false };
      return;
    }
    const d = await res.json();
    auth.value = {
      loaded: true,
      authenticated: !!d.authenticated,
      name: d.name,
      email: d.email,
      orgs: Array.isArray(d.orgs) ? d.orgs : [],
      canVote: !!d.canVote,
      isAdmin: !!d.isAdmin
    };
  } catch {
    auth.value = { loaded: true, authenticated: false, orgs: [], canVote: false, isAdmin: false };
  }
}
async function loadProposalVotes(id) {
  if (typeof window === "undefined" || !id) return { ok: false, status: 0 };
  try {
    const res = await fetch(`${API_BASE}/proposals/${encodeURIComponent(id)}/votes`, {
      credentials: "include"
    });
    if (res.ok) {
      const data = await res.json();
      return { ok: true, status: 200, data };
    }
    const message = await res.json().then((b) => b.error).catch(() => void 0);
    return { ok: false, status: res.status, message };
  } catch {
    return { ok: false, status: 0, message: "Network error — could not reach the voting service." };
  }
}
function signInToVote() {
  if (typeof window === "undefined") return;
  const redirect = encodeURIComponent(window.location.href);
  window.location.href = `${API_BASE}/login?redirect=${redirect}`;
}
const emptyLists = () => ({ for: [], against: [], abstain: [] });
function tallyOf(id, myVote) {
  var _a, _b;
  const live = liveById.value[id];
  const counts = live ? { ...live.counts } : emptyCounts();
  const lists = emptyLists();
  if (live) {
    for (const v of live.votes) lists[v.stance].push({ org: v.org, mine: false });
  }
  if (myVote && !myVote.submitted) {
    counts[myVote.stance] += 1;
    counts.total += 1;
    lists[myVote.stance].push({ org: ((_a = myVote.org) == null ? void 0 : _a.trim()) || ((_b = myVote.person) == null ? void 0 : _b.trim()) || "You", mine: true });
  }
  return { lists, counts };
}
function setVote(id, stance) {
  const next = { ...myVotes.value };
  if (stance === null) {
    delete next[id];
  } else {
    const prev = next[id];
    next[id] = prev ? { ...prev, stance, submitted: prev.stance === stance ? prev.submitted : false } : { stance, submitted: false };
  }
  myVotes.value = next;
}
async function submitVote(id, detail) {
  const comment = detail.comment.trim();
  const answers = (detail.answers ?? []).map((s) => typeof s === "string" ? s : "");
  const a = auth.value;
  const orgLabel = a.orgs.map((o) => o.name).join(", ") || void 0;
  myVotes.value = {
    ...myVotes.value,
    [id]: { stance: detail.stance, org: orgLabel, person: a.name, submitted: true }
  };
  const rollback = () => {
    const mv = myVotes.value[id];
    if (mv) myVotes.value = { ...myVotes.value, [id]: { ...mv, submitted: false } };
  };
  try {
    const res = await fetch(`${API_BASE}/proposals/${encodeURIComponent(id)}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ stance: detail.stance, comment, answers })
    });
    if (res.ok) {
      const p = await res.json();
      liveById.value = { ...liveById.value, [id]: { counts: p.tally, votes: p.votes ?? [] } };
      return { ok: true };
    }
    rollback();
    const serverMsg = await res.json().then((b) => b.error).catch(() => void 0);
    if (res.status === 401) {
      void loadMe();
      return { ok: false, needsAuth: true, message: serverMsg || "Please sign in with the Trust Framework to vote." };
    }
    if (res.status === 403) {
      return { ok: false, message: serverMsg || "Your account is not eligible to vote on this proposal." };
    }
    if (res.status === 409) {
      return { ok: false, message: serverMsg || "You have already voted on this proposal." };
    }
    if (res.status === 429) {
      return { ok: false, message: serverMsg || "Too many submissions — please wait a minute and try again." };
    }
    return { ok: false, message: serverMsg || "Could not record your vote. Please try again." };
  } catch {
    rollback();
    return { ok: false, message: "Network error — could not reach the voting service." };
  }
}
function commentsFor(id) {
  const live = liveById.value[id];
  if (!live) return [];
  return live.votes.filter((v) => v.comment && v.comment.trim()).map((v) => ({
    org: v.org,
    person: v.person || v.org,
    stance: v.stance,
    time: v.created_at || "",
    text: v.comment
  }));
}
const votedCount = computed(() => Object.keys(myVotes.value).length);
function useProposals() {
  return {
    proposalList,
    metaById,
    voters: VOTERS,
    voterTotal: VOTERS.length,
    myVotes,
    auth,
    votedCount,
    config: PROPOSALS_CONFIG,
    hydrate,
    loadAll,
    loadOne,
    loadMe,
    loadProposalVotes,
    signInToVote,
    tallyOf,
    setVote,
    submitVote,
    commentsFor
  };
}
export {
  PRIORITY as P,
  STANCE as S,
  PROPOSALS_CONFIG as a,
  STANCE_ORDER as b,
  STATUS as c,
  deriveStatus as d,
  isDecided as i,
  tallyOf as t,
  useProposals as u
};
