import { F as FAMILY_KEYS, a as FAMILY_URL_PREFIX, T as TRUST_FRAMEWORK_PROXY_URL, L as LIVE_TPP_DAYS_WINDOW } from "./liveEcosystem-DBW_tnF2.js";
import { l as loadApiLog } from "../main.mjs";
import { ref, onMounted } from "vue";
function useLiveTpps(familyKeys, previewCount = 6) {
  const liveTpps = ref([]);
  const totalCount = ref(0);
  const loadError = ref(false);
  const loading = ref(true);
  const wanted = new Set(
    (familyKeys.length ? familyKeys : FAMILY_KEYS).map((k) => FAMILY_URL_PREFIX[k])
  );
  async function load() {
    try {
      const [directoryRes, log] = await Promise.all([
        fetch(TRUST_FRAMEWORK_PROXY_URL),
        loadApiLog()
      ]);
      if (!directoryRes.ok) {
        loadError.value = true;
        return;
      }
      const directory = await directoryRes.json();
      if (!Array.isArray(directory) || !Array.isArray(log)) {
        loadError.value = true;
        return;
      }
      const tppLookup = /* @__PURE__ */ new Map();
      for (const o of directory) {
        const org = o;
        if (org.type === "TPP" && typeof org.name === "string") {
          tppLookup.set(org.name.toUpperCase(), org);
        }
      }
      const latestMs = log.reduce((max, r) => {
        const row = r;
        const t = Date.parse(row.date || "");
        return Number.isFinite(t) && t > max ? t : max;
      }, 0);
      const cutoffMs = latestMs - (LIVE_TPP_DAYS_WINDOW - 1) * 24 * 60 * 60 * 1e3;
      const seen = /* @__PURE__ */ new Set();
      const consumers = [];
      for (const r of log) {
        const row = r;
        if (!row.tppname || typeof row.url !== "string") continue;
        if (latestMs > 0) {
          const ts = Date.parse(row.date || "");
          if (!Number.isFinite(ts) || ts < cutoffMs) continue;
        }
        const parts = row.url.split("/");
        if (parts[0] !== "open-finance") continue;
        const urlFamily = parts[1] || "";
        if (!wanted.has(urlFamily)) continue;
        const key = row.tppname.toUpperCase();
        if (seen.has(key)) continue;
        seen.add(key);
        consumers.push(row.tppname);
      }
      totalCount.value = consumers.length;
      liveTpps.value = consumers.slice(0, previewCount).map((name) => {
        const match = tppLookup.get(name.toUpperCase());
        return {
          name,
          legalName: (match == null ? void 0 : match.legalName) ?? name,
          logoUri: (match == null ? void 0 : match.logoUri) ?? null
        };
      });
    } catch {
      loadError.value = true;
    } finally {
      loading.value = false;
    }
  }
  onMounted(() => {
    void load();
  });
  return { liveTpps, totalCount, loadError, loading };
}
export {
  useLiveTpps as u
};
