<script setup>
import { computed } from 'vue'

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

const visibleFiles = computed(() =>
  props.files.filter((file) => (props.public ? file.isPublic : !file.isPublic))
)

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
  <div class="doc-table">
    <div class="doc-table-header">
      <span class="doc-header-item">File Name</span>
      <span class="doc-header-item">Type</span>
      <span class="doc-header-item">Date</span>
      <span class="doc-header-item">Action</span>
    </div>

    <div v-if="visibleFiles.length" class="doc-rows">
      <div
        v-for="file in visibleFiles"
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
          <img
            class="doc-download-icon"
            src="/images/download.png"
            alt="Download"
          />
          Download
        </a>
      </div>
    </div>

    <div v-else class="doc-empty">No documents available.</div>
  </div>
</template>

<style scoped>
.doc-table {
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  text-align: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.doc-table-header,
.doc-table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  column-gap: 12px;
  padding: 12px 16px;
}

.doc-table-header {
  background: #f8fafc;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.85rem;
  color: #1f2937;
}

.doc-table-row + .doc-table-row {
  border-top: 1px solid #e2e8f0;
}

.doc-table-item {
  color: #1f2937;
  font-size: 0.95rem;
}

.doc-action-button {
  justify-self: start;
  padding: 8px 14px;
  background: #1043b3;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;
  display: inline-flex;
  align-items: center;
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

.doc-name {
  text-align: left;
}

.doc-empty {
  padding: 14px 16px;
  color: #6b7280;
}
</style>
