// Minimal, dependency-free ZIP writer for the Functional Certification portal.
//
// Evidence bundles are built entirely in the browser: a summary document plus
// every uploaded file, kept at original quality, in one attachment. Rather than
// pull in a zip library we use the platform's native `CompressionStream`
// ('deflate-raw' is exactly the DEFLATE stream a ZIP stores) and compute CRC-32
// ourselves. Where CompressionStream is unavailable we fall back to STORE (no
// compression) so a bundle still downloads.
//
// This module is browser-only — it must never run during SSR (call it from a
// click handler / onMounted, never at module top level).

export interface ZipEntry {
  /** Path within the archive, using forward slashes — e.g. 'evidence/accounts/response.json'. */
  name: string
  data: Uint8Array
}

const CRC_TABLE: Uint32Array = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf: Uint8Array): number {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]!) & 0xff]! ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

async function deflateRaw(data: Uint8Array): Promise<Uint8Array | null> {
  if (typeof CompressionStream === 'undefined' || data.length === 0) return null
  try {
    const cs = new CompressionStream('deflate-raw')
    const stream = new Blob([data as BlobPart]).stream().pipeThrough(cs)
    const out = await new Response(stream).arrayBuffer()
    return new Uint8Array(out)
  } catch {
    return null
  }
}

// DOS date/time encoding for the local + central headers (seconds have 2s
// resolution in the ZIP format). Uses local time, matching how archivers behave.
function dosDateTime(d: Date): { time: number; date: number } {
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (Math.floor(d.getSeconds() / 2) & 0x1f)
  const date = (((d.getFullYear() - 1980) & 0x7f) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()
  return { time, date }
}

/**
 * Build a ZIP Blob from the given entries. Each entry is DEFLATE-compressed when
 * the platform supports it, otherwise STOREd. UTF-8 filenames are flagged.
 */
export async function createZip(entries: ZipEntry[], now: Date = new Date()): Promise<Blob> {
  const encoder = new TextEncoder()
  const { time, date } = dosDateTime(now)

  const localParts: BlobPart[] = []
  const centralParts: BlobPart[] = []
  let offset = 0

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name)
    const crc = crc32(entry.data)
    const uncompressedSize = entry.data.length

    const deflated = await deflateRaw(entry.data)
    const useDeflate = deflated !== null && deflated.length < uncompressedSize
    const stored = useDeflate ? deflated! : entry.data
    const method = useDeflate ? 8 : 0
    const compressedSize = stored.length

    // Local file header (30 bytes + name)
    const local = new DataView(new ArrayBuffer(30))
    local.setUint32(0, 0x04034b50, true)
    local.setUint16(4, 20, true) // version needed
    local.setUint16(6, 0x0800, true) // general purpose flag: UTF-8 filenames
    local.setUint16(8, method, true)
    local.setUint16(10, time, true)
    local.setUint16(12, date, true)
    local.setUint32(14, crc, true)
    local.setUint32(18, compressedSize, true)
    local.setUint32(22, uncompressedSize, true)
    local.setUint16(26, nameBytes.length, true)
    local.setUint16(28, 0, true) // extra length
    localParts.push(local.buffer, nameBytes as BlobPart, stored as BlobPart)

    // Central directory header (46 bytes + name)
    const central = new DataView(new ArrayBuffer(46))
    central.setUint32(0, 0x02014b50, true)
    central.setUint16(4, 20, true) // version made by
    central.setUint16(6, 20, true) // version needed
    central.setUint16(8, 0x0800, true)
    central.setUint16(10, method, true)
    central.setUint16(12, time, true)
    central.setUint16(14, date, true)
    central.setUint32(16, crc, true)
    central.setUint32(20, compressedSize, true)
    central.setUint32(24, uncompressedSize, true)
    central.setUint16(28, nameBytes.length, true)
    central.setUint16(30, 0, true) // extra length
    central.setUint16(32, 0, true) // comment length
    central.setUint16(34, 0, true) // disk number start
    central.setUint16(36, 0, true) // internal attrs
    central.setUint32(38, 0, true) // external attrs
    central.setUint32(42, offset, true) // local header offset
    centralParts.push(central.buffer, nameBytes as BlobPart)

    offset += 30 + nameBytes.length + compressedSize
  }

  const centralSize = centralParts.reduce(
    (sum, p) => sum + (p instanceof ArrayBuffer ? p.byteLength : (p as Uint8Array).length),
    0,
  )

  // End of central directory record (22 bytes)
  const end = new DataView(new ArrayBuffer(22))
  end.setUint32(0, 0x06054b50, true)
  end.setUint16(4, 0, true) // disk number
  end.setUint16(6, 0, true) // disk with central dir
  end.setUint16(8, entries.length, true)
  end.setUint16(10, entries.length, true)
  end.setUint32(12, centralSize, true)
  end.setUint32(16, offset, true) // central dir offset
  end.setUint16(20, 0, true) // comment length

  return new Blob([...localParts, ...centralParts, end.buffer], { type: 'application/zip' })
}

/** Read a File into a Uint8Array (browser-only). */
export async function fileBytes(file: File): Promise<Uint8Array> {
  return new Uint8Array(await file.arrayBuffer())
}

/** Trigger a browser download of a Blob under the given filename. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Revoke on the next tick so the download has started.
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
