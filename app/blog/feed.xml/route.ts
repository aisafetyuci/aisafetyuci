import { getAllPosts, siteUrl } from '../../lib/blog'

export const dynamic = 'force-static'

function escapeXml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function rssDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toUTCString()
}

export function GET() {
  const posts = getAllPosts()
  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rssDate(post.date)}</pubDate>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        ...post.authors.map((name) => `      <dc:creator>${escapeXml(name)}</dc:creator>`),
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const lastBuild = posts[0] ? `\n    <lastBuildDate>${rssDate(posts.map((p) => p.updated ?? p.date).sort().at(-1)!)}</lastBuildDate>` : ''

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>AI Safety Collective at Irvine — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Explainers, research notes, event recaps, and announcements from the AI Safety Collective at Irvine.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>${lastBuild}
${items}
  </channel>
</rss>
`

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
