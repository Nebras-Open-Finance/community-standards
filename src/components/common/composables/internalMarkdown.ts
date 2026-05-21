// Shared Markdown splitter for the /internal section.
//
// Internal pages are authored in plain Markdown, but two constructs are
// promoted to site components so internal pages match the rest of the site:
//
//   - a standalone image — a line that is exactly ![alt](src) — becomes the
//     <ImageViewer> component (click-to-zoom modal);
//   - a fenced ``` code block becomes the <EdCode> component (Shiki
//     highlighting + copy button).
//
// This module turns a Markdown string into an ordered list of blocks. It is
// used by two surfaces, which is why it lives here rather than in either:
//   - InternalMarkdown.vue renders the blocks as live components (the editor
//     preview);
//   - the editor's "publish" panel emits the blocks as a committed .md file,
//     converting image/code blocks to <ImageViewer>/<EdCode> tags.

import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: false })

export type InternalBlock =
  | { kind: 'html'; raw: string }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'code'; code: string; lang: string }

interface ImageToken {
  type: string
  href?: string
  text?: string
}
interface BlockToken {
  type: string
  raw: string
  text?: string
  lang?: string
  tokens?: ImageToken[]
}

/** True when a paragraph is nothing but a single image. */
function isLoneImage(token: BlockToken): boolean {
  return (
    token.type === 'paragraph' &&
    Array.isArray(token.tokens) &&
    token.tokens.length === 1 &&
    token.tokens[0]?.type === 'image'
  )
}

/** Split Markdown into prose / image / code blocks, preserving order. */
export function parseInternalBlocks(source: string): InternalBlock[] {
  const tokens = marked.lexer(source || '') as unknown as BlockToken[]
  const blocks: InternalBlock[] = []

  // Consecutive prose tokens are buffered so the prose renders as one unit
  // (keeps reference-style links and tight lists intact).
  let prose = ''
  const flushProse = (): void => {
    if (prose.trim()) blocks.push({ kind: 'html', raw: prose })
    prose = ''
  }

  for (const token of tokens) {
    if (token.type === 'code') {
      flushProse()
      blocks.push({ kind: 'code', code: token.text ?? '', lang: token.lang || 'plaintext' })
    } else if (isLoneImage(token)) {
      flushProse()
      const img = token.tokens![0]!
      blocks.push({ kind: 'image', src: img.href ?? '', alt: img.text ?? '' })
    } else {
      prose += token.raw
    }
  }
  flushProse()
  return blocks
}

/** Render a prose (Markdown) block to HTML. */
export function renderProse(raw: string): string {
  return marked.parse(raw) as string
}
