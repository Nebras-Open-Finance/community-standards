import { createContentLoader } from 'vitepress'

interface Article {
  title: string
  description: string
  category: string
  link: string
}

export default createContentLoader('knowledge-base/articles/*.md', {
  transform(raw): Article[] {
    return raw
      .map(({ url, frontmatter }) => ({
        title:       (frontmatter.title       as string) ?? '',
        description: (frontmatter.description as string) ?? '',
        category:    (frontmatter.category    as string) ?? '',
        link: url,
      }))
      .sort((a, b) => a.title.localeCompare(b.title))
  },
})

export type { Article }
