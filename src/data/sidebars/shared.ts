// Phase 6 — sidebar shared helpers, ported from
// `docs/.vitepress/config/sidebars/shared.ts`.
//
// VitePress's `DefaultTheme.SidebarItem` shape is replaced here with a local
// `SidebarItem` interface that mirrors what `EdSidebarItem.vue` consumes —
// it accepts the `text` (an HTML-bearing string for the API badge),
// optional `link`, optional nested `items`, and the optional `collapsed`
// flag the source configs use throughout. Strict TypeScript: no `any`.

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

/**
 * Creates a sidebar item for an API endpoint with an HTTP method badge.
 * Styles are defined under `.http-badge` / `.http-path` in the editorial
 * stylesheet (see `src/styles/`).
 */
export function apiRef(method: HttpMethod, path: string, link: string): SidebarItem {
  return {
    text: `<span class="http-badge http-${method.toLowerCase()}">${method}</span> <span class="http-path">${path}</span>`,
    link,
  }
}
