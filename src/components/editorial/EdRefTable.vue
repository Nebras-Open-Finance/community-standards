<template>
  <div class="ed-reftable">
    <div class="ed-reftable__scroll">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ed-reftable {
  margin: 1.5rem 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-reftable__scroll {
  overflow-x: auto;
  max-width: 100%;
}

.ed-reftable :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--at-sans);
  margin: 0;
}

.ed-reftable :deep(thead) {
  background: var(--at-bg-cream);
}

.ed-reftable :deep(th) {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--at-grid-line);
  white-space: nowrap;
  vertical-align: bottom;
}

.ed-reftable :deep(td) {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--at-grid-line);
  vertical-align: top;
}

.ed-reftable :deep(tr:last-child td) { border-bottom: 0; }

.ed-reftable :deep(td strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-reftable :deep(th strong) { color: var(--at-navy-deep); font-weight: 700; }

.ed-reftable :deep(td code),
.ed-reftable :deep(th code) {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
  white-space: nowrap;
}

.ed-reftable :deep(td a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-reftable :deep(td a:hover) { color: var(--at-teal-deep); }
</style>

<!--
  /tech/** override — match the requirements-page table style:
  navy-deep header background with cream text, mono uppercase, subtle
  semi-transparent dividers between header cells. Unscoped because the
  layout root (`.is-tech`) is outside this component's scope.
-->
<style>
.is-tech .ed-reftable thead {
  background: var(--at-navy-deep);
}

.is-tech .ed-reftable th {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 0;
  white-space: nowrap;
  vertical-align: bottom;
}

.is-tech .ed-reftable th + th {
  border-left: 1px solid rgba(250, 250, 247, 0.18);
}

.is-tech .ed-reftable th strong {
  color: var(--at-bg-cream);
  font-weight: 700;
}

.is-tech .ed-reftable th code {
  color: var(--at-bg-cream);
  background: color-mix(in srgb, var(--at-bg-cream) 14%, transparent);
  border-color: color-mix(in srgb, var(--at-bg-cream) 28%, transparent);
}

/* Darker, more obvious borders on tech specs */
.is-tech .ed-reftable {
  border-color: rgba(0, 39, 127, 0.45);
}

.is-tech .ed-reftable td {
  border-bottom-color: rgba(0, 39, 127, 0.45);
}

.is-tech .ed-reftable td + td {
  border-left: 1px solid rgba(0, 39, 127, 0.45);
}
</style>
