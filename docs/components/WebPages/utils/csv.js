/**
 * csv.js — Convert an array of row objects to CSV and trigger a browser download.
 *
 * Usage:
 *   downloadCsv('api-log.csv', rows)
 *   downloadCsv('api-log.csv', rows, ['date', 'lfi', 'tpp', 'volume'])
 */

function escapeCell(value) {
  if (value == null) return ''
  const str = String(value)
  if (/[",\r\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`
  return str
}

export function rowsToCsv(rows, columns) {
  if (!rows || !rows.length) return ''
  const cols = columns && columns.length ? columns : Object.keys(rows[0])
  const header = cols.map(escapeCell).join(',')
  const body = rows.map(r => cols.map(c => escapeCell(r[c])).join(',')).join('\r\n')
  return `${header}\r\n${body}`
}

export function downloadCsv(filename, rows, columns) {
  if (typeof window === 'undefined') return
  const csv = rowsToCsv(rows, columns)
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

export function datedFilename(prefix, ext = 'csv') {
  const d = new Date()
  const iso = d.toISOString().slice(0, 10)
  return `${prefix}-${iso}.${ext}`
}
