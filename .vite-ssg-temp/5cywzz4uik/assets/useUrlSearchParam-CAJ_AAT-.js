import { ref, onMounted, watch } from "vue";
function useUrlSearchParam(key, defaultValue, options = {}) {
  const { allowed } = options;
  const value = ref(defaultValue);
  function isAllowed(candidate) {
    if (!allowed) return true;
    return allowed.includes(candidate);
  }
  function readFromUrl() {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(key);
    if (raw === null) return;
    if (isAllowed(raw)) value.value = raw;
  }
  function writeToUrl(next) {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (next === defaultValue) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, next);
    }
    window.history.replaceState({}, "", url.toString());
  }
  onMounted(readFromUrl);
  watch(value, (next) => writeToUrl(next));
  function set(next) {
    if (!isAllowed(next)) return;
    value.value = next;
  }
  return { value, set };
}
export {
  useUrlSearchParam as u
};
