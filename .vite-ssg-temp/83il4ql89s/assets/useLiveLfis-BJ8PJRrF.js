import { F as FAMILY_KEYS, D as DIRECTORY_PARTICIPANTS_URL, P as PLACEHOLDER_LOGO_URL } from "./liveEcosystem-DBW_tnF2.js";
import { ref, onMounted } from "vue";
function useLiveLfis(familyKeys, previewCount = 6) {
  const liveLfis = ref([]);
  const totalCount = ref(0);
  const loadError = ref(false);
  const loading = ref(true);
  const wanted = new Set(familyKeys.length ? familyKeys : FAMILY_KEYS);
  async function load() {
    var _a;
    try {
      const res = await fetch(DIRECTORY_PARTICIPANTS_URL);
      if (!res.ok) {
        loadError.value = true;
        return;
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        loadError.value = true;
        return;
      }
      const seen = /* @__PURE__ */ new Set();
      const accepted = [];
      for (const o of data) {
        const org = o;
        if (!((_a = org.AuthorisationServers) == null ? void 0 : _a.length)) continue;
        for (const server of org.AuthorisationServers) {
          const exposes = (server.ApiResources || []).some(
            (r) => typeof r.ApiFamilyType === "string" && wanted.has(r.ApiFamilyType)
          );
          if (!exposes) continue;
          const key = `${org.OrganisationId || org.OrganisationName || ""}::${server.AuthorisationServerId || server.CustomerFriendlyName || ""}`;
          if (seen.has(key)) continue;
          seen.add(key);
          accepted.push({
            key,
            name: server.CustomerFriendlyName || org.OrganisationName || "",
            legalName: org.OrganisationName || server.CustomerFriendlyName || "",
            logoUri: server.CustomerFriendlyLogoUri || PLACEHOLDER_LOGO_URL
          });
        }
      }
      totalCount.value = accepted.length;
      liveLfis.value = accepted.slice(0, previewCount);
    } catch {
      loadError.value = true;
    } finally {
      loading.value = false;
    }
  }
  onMounted(() => {
    void load();
  });
  return { liveLfis, totalCount, loadError, loading };
}
export {
  useLiveLfis as u
};
