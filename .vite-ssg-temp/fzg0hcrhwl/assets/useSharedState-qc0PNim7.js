import { computed, ref } from "vue";
const sharedState = ref({});
function useSharedState() {
  function updateField(field, newValue) {
    sharedState.value = { ...sharedState.value, [field]: JSON.parse(newValue) };
  }
  const consentData = computed(() => {
    var _a, _b, _c, _d;
    const s = sharedState.value;
    return ((_a = s == null ? void 0 : s.consent) == null ? void 0 : _a.consent) ?? ((_b = s == null ? void 0 : s.consent) == null ? void 0 : _b.Data) ?? ((_c = s == null ? void 0 : s.value) == null ? void 0 : _c.consent) ?? ((_d = s == null ? void 0 : s.value) == null ? void 0 : _d.Data) ?? {};
  });
  return {
    sharedState,
    updateField,
    consentData
  };
}
export {
  useSharedState as u
};
