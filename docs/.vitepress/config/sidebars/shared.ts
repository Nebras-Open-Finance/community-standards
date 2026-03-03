import type { DefaultTheme } from 'vitepress'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * Creates a sidebar item for an API endpoint with an HTTP method badge.
 * Styles are defined in theme/index.css under .http-badge / .http-path.
 */
export function apiRef(method: HttpMethod, path: string, link: string): DefaultTheme.SidebarItem {
  return {
    text: `<span class="http-badge http-${method.toLowerCase()}">${method}</span> <span class="http-path">${path}</span>`,
    link,
  }
}
