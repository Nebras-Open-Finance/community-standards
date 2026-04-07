<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  files: {
    type: Array,
    required: true
  },
  public: {
    type: Boolean,
    default: true
  }
})

const search = ref('')

const visibleFiles = computed(() =>
  props.files.filter((file) => (props.public ? file.isPublic : !file.isPublic))
)

const filteredFiles = computed(() => {
  const query = search.value.toLowerCase().trim()
  if (!query) return visibleFiles.value
  return visibleFiles.value.filter((file) =>
    fileName(file.filepath).toLowerCase().includes(query)
  )
})

const fileName = (filepath) => {
  const parts = filepath.split('/')
  return parts[parts.length - 1] || filepath
}

const fileType = (filepath) => {
  const ext = filepath.split('.').pop()
  return ext ? ext.toUpperCase() : ''
}

const downloadHref = (filepath) =>
  filepath.startsWith('docs/public')
    ? filepath.replace(/^docs\/public/, '')
    : filepath
</script>

<template>
  <div class="search-box">
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input
      v-model="search"
      type="text"
      placeholder="Search documents..."
    />
  </div>

  <div class="doc-table">
    <div class="doc-table-header">
      <span>File Name</span>
      <span>Type</span>
      <span>Date</span>
      <span>Action</span>
    </div>

    <div v-if="filteredFiles.length" class="doc-rows">
      <div
        v-for="file in filteredFiles"
        :key="file.filepath"
        class="doc-table-row"
      >
        <span class="doc-table-item doc-name">{{ fileName(file.filepath) }}</span>
        <span class="doc-table-item">{{ fileType(file.filepath) }}</span>
        <span class="doc-table-item">{{ file.date }}</span>
        <a
          class="doc-action-button"
          :href="downloadHref(file.filepath)"
          download
        >
          <svg class="doc-download-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download
        </a>
      </div>
    </div>

    <div v-else class="doc-empty">No documents available.</div>
  </div>
</template>

<style scoped>
.search-box {
  position: relative;
  width: calc(100% - 2px);
  margin: 20px 0 16px 0;
  box-sizing: border-box;
}

.search-box input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: 0.2s;
  box-sizing: border-box;
}

.search-box input:focus {
  border-color: #1043b3;
  box-shadow: 0 0 0 3px rgba(16, 67, 179, 0.1);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  opacity: 0.5;
  pointer-events: none;
}

.doc-table {
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  text-align: left;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.doc-table-header,
.doc-table-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  column-gap: 12px;
  padding: 12px 16px;
}

.doc-table-header {
  background: #f8fafc;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.85rem;
  color: #374151;
}

.doc-table-row {
  border-bottom: 1px solid rgba(214, 209, 214, 0.95);
}

.doc-table-item {
  align-self: center;
  color: #1f2937;
  font-size: 0.95rem;
}

.doc-name {
  justify-self: start;
  text-align: left;
}

.doc-action-button {
  justify-self: center;
  align-self: center;
  padding: 8px 14px;
  background: #1043b3;
  color: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: auto;
  gap: 6px;
  text-decoration: none;
}

.doc-action-button:hover {
  background: #0d3791;
}

.doc-download-icon {
  height: 16px;
  width: 16px;
}

.doc-empty {
  padding: 14px 16px;
  color: #6b7280;
}
</style>
