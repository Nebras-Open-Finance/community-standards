export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

export function apiRef(method: HttpMethod, path: string, link: string): SidebarItem {
  return {
    text: `<span class="http-badge http-${method.toLowerCase()}">${method}</span> <span class="http-path">${path}</span>`,
    link,
  }
}
