<script setup lang="ts">
// Reusable Word-document download button. The .doc HTML is generated from a
// structured spec (`doc` prop) so callers don't have to hand-roll the
// Word-friendly markup. Pass `label` + `filename` for the button + download
// name, and `description` for the optional intro paragraph above the button.
//
// The generated document deliberately uses inline CSS (Word doesn't honour
// CSS variables), but the editorial styling on the wrapper card uses the
// usual `--at-*` tokens.

export type WordCell =
  | string
  | {
      html: string
      isLabel?: boolean
      width?: string
      align?: 'left' | 'center' | 'right'
      bold?: boolean
    }

export type WordBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string; description?: string }
  | { type: 'paste'; placeholder: string }
  | { type: 'table'; headers?: WordCell[]; rows: WordCell[][]; note?: string }

export interface WordSection {
  heading: string
  note?: string
  content: WordBlock[]
}

export interface WordSignoff {
  fields: { label: string; suffix?: string; width?: string }[]
}

export interface WordDocSpec {
  title: string
  subtitle?: string
  preamble?: string
  sections: WordSection[]
  signoff?: WordSignoff
  footer?: string
}

const props = withDefaults(defineProps<{
  label: string
  filename: string
  doc: WordDocSpec
  description?: string
  eyebrow?: string
  schemaLabel?: string
}>(), {
  description: '',
  eyebrow: 'Word document',
  schemaLabel: '',
})

function cellHtml(cell: WordCell): string {
  if (typeof cell === 'string') return `<td>${cell}</td>`
  const cls = cell.isLabel ? ' class="label"' : ''
  const styleParts: string[] = []
  if (cell.width) styleParts.push(`width:${cell.width}`)
  if (cell.align) styleParts.push(`text-align:${cell.align}`)
  if (cell.bold)  styleParts.push('font-weight:bold')
  const style = styleParts.length ? ` style="${styleParts.join(';')}"` : ''
  return `<td${cls}${style}>${cell.html}</td>`
}

function headerCellHtml(cell: WordCell): string {
  if (typeof cell === 'string') return `<th>${cell}</th>`
  const styleParts: string[] = []
  if (cell.width) styleParts.push(`width:${cell.width}`)
  if (cell.align) styleParts.push(`text-align:${cell.align}`)
  const style = styleParts.length ? ` style="${styleParts.join(';')}"` : ''
  return `<th${style}>${cell.html}</th>`
}

function blockHtml(block: WordBlock): string {
  switch (block.type) {
    case 'paragraph':
      return `<p>${block.text}</p>`
    case 'subheading': {
      const desc = block.description ? `<p>${block.description}</p>` : ''
      return `<h3>${block.text}</h3>${desc}`
    }
    case 'paste':
      return `<div class="paste-box">${block.placeholder}</div>`
    case 'table': {
      const head = block.headers
        ? `<tr>${block.headers.map(headerCellHtml).join('')}</tr>`
        : ''
      const body = block.rows
        .map((row) => `<tr>${row.map(cellHtml).join('')}</tr>`)
        .join('')
      const note = block.note ? `<p class="note">${block.note}</p>` : ''
      return `<table>${head}${body}</table>${note}`
    }
  }
}

function sectionHtml(section: WordSection): string {
  const note = section.note ? `<p class="section-note">${section.note}</p>` : ''
  const blocks = section.content.map(blockHtml).join('\n')
  return `<h2>${section.heading}</h2>${note}${blocks}`
}

function signoffHtml(s: WordSignoff): string {
  const rows = s.fields.map((f) => {
    const width = f.width ?? '280px'
    const suffix = f.suffix ? `&nbsp;&nbsp;<em>${f.suffix}</em>` : ''
    return `<div class="signoff-row"><strong>${f.label}</strong>&nbsp;&nbsp;<span class="field-line" style="min-width:${width};">&nbsp;</span>${suffix}</div>`
  }).join('')
  return `<div class="signoff">${rows}</div>`
}

function buildHtml(): string {
  const d = props.doc
  const subtitle = d.subtitle ? `<p class="subtitle">${d.subtitle}</p>` : ''
  const preamble = d.preamble
    ? `<hr><p style="font-size:9.5pt; color:#6b7280;">${d.preamble}</p>`
    : ''
  const sections = d.sections.map(sectionHtml).join('\n')
  const signoff = d.signoff ? signoffHtml(d.signoff) : ''
  const footer = d.footer
    ? `<hr><p style="font-size:9pt; color:#94a3b8; text-align:center;">${d.footer}</p>`
    : ''

  return `<html xmlns:o='urn:schemas-microsoft-com:office:office'
               xmlns:w='urn:schemas-microsoft-com:office:word'
               xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${d.title}</title>
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
<style>
  /* @page + WordSection: required for Word to size the page and apply
     margins. Without this, Word falls back to its own defaults and any
     content that assumed body { margin: 2.5cm } overflows the page. */
  @page WordSection1 {
    size: 21cm 29.7cm;
    margin: 2.5cm 2.5cm 2.5cm 2.5cm;
    mso-page-orientation: portrait;
    mso-header-margin: 1cm;
    mso-footer-margin: 1cm;
  }
  div.WordSection1 { page: WordSection1; }

  body          { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #111; margin: 0; }
  h1            { font-size: 20pt; font-weight: bold; color: #0f172a; margin-bottom: 4pt; }
  h2            { font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 3pt; margin-top: 18pt; margin-bottom: 8pt; }
  h3            { font-size: 11pt; font-weight: bold; color: #1e40af; margin-top: 14pt; margin-bottom: 4pt; }
  p             { margin: 4pt 0; }
  .subtitle     { font-size: 11pt; color: #475569; margin-bottom: 16pt; }

  /* table-layout: fixed forces Word to honour the column widths set on the
     first row instead of expanding the table to fit content. Combined with
     word-wrap on cells this stops long <code> strings from blowing the
     table off the right edge of the page. */
  table         { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 10.5pt; table-layout: fixed; mso-table-lspace: 0; mso-table-rspace: 0; }
  th            { background: #f1f5f9; font-weight: bold; text-align: left; padding: 6pt 8pt; border: 1pt solid #cbd5e1; font-size: 10pt; word-wrap: break-word; overflow-wrap: break-word; }
  td            { padding: 6pt 8pt; border: 1pt solid #cbd5e1; vertical-align: top; word-wrap: break-word; overflow-wrap: break-word; }
  td code, th code { word-break: break-all; }
  .label        { width: 38%; background: #f8fafc; font-weight: bold; }
  .note         { font-size: 9.5pt; color: #6b7280; font-style: italic; margin: 4pt 0 10pt 0; }
  .paste-box    { border: 1pt solid #cbd5e1; background: #f8fafc; padding: 10pt; min-height: 60pt; margin: 6pt 0; font-size: 10pt; color: #94a3b8; font-style: italic; }
  .section-note { font-size: 9.5pt; color: #6b7280; font-style: italic; margin: 0 0 8pt 0; }
  .signoff      { margin-top: 20pt; }
  .signoff-row  { margin: 10pt 0; }
  .field-line   { display: inline-block; border-bottom: 1pt solid #374151; vertical-align: bottom; }
  hr            { border: none; border-top: 1pt solid #e2e8f0; margin: 16pt 0; }
</style>
</head>
<body>
<div class="WordSection1">

<h1>${d.title.split(' — ')[0] ?? d.title}</h1>
${subtitle}
${preamble}

${sections}

${signoff}
${footer}

</div>
</body>
</html>`
}

function download() {
  const html = buildHtml()
  const blob = new Blob(['﻿', html], { type: 'application/msword' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = props.filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="wdd">
    <header class="wdd__header">
      <span class="wdd__eyebrow">
        <span class="wdd__eyebrow-dash" />
        {{ eyebrow }}
      </span>
      <span v-if="schemaLabel" class="wdd__schema">{{ schemaLabel }}</span>
    </header>

    <div class="wdd__body">
      <p v-if="description" class="wdd__lede">{{ description }}</p>

      <button type="button" class="wdd-cta" @click="download">
        <svg class="wdd-cta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {{ label }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.wdd {
  margin: 1.5rem 0;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.wdd__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.wdd__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
}
.wdd__eyebrow-dash { width: 18px; height: 1px; background: currentColor; }
.wdd__schema {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute-2);
}

.wdd__body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.wdd__lede {
  margin: 0 0 1.25rem;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  max-width: 50rem;
}

.wdd-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.95rem 1.5rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border: none;
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  transition: background 0.15s ease;
}
.wdd-cta:hover { background: var(--at-navy); }

.wdd-cta__icon {
  width: 16px;
  height: 16px;
  flex: none;
}
</style>
