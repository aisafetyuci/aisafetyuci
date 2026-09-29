// Reads, validates and renders blog posts from content/blog/*.md at build time.
// Server-only: uses the filesystem. Never import this from a client component.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'

export const siteUrl = 'https://aisafetyuci.org'

export const categories = ['Explainer', 'Research', 'Recap', 'Opinion', 'Announcement'] as const
export type Category = (typeof categories)[number]

// Badge colors (additional colors are only for status/format badges).
export const categoryColors: Record<Category, string> = {
  Explainer: 'bg-sky-100 text-sky-700',
  Research: 'bg-indigo-100 text-indigo-700',
  Recap: 'bg-emerald-100 text-emerald-800',
  Opinion: 'bg-violet-100 text-violet-700',
  Announcement: 'bg-amber-100 text-amber-800',
}

export function categorySlug(category: Category) {
  return category.toLowerCase()
}

export function categoryFromSlug(slug: string): Category | undefined {
  return categories.find((category) => categorySlug(category) === slug)
}

export interface Post {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  updated?: string // YYYY-MM-DD
  summary: string
  authors: string[]
  category: Category
  cover?: string
  coverAlt?: string
  featured: boolean
  draft: boolean
  html: string
  readingTime: number // minutes
}

const postsDir = path.join(process.cwd(), 'content', 'blog')
const publicDir = path.join(process.cwd(), 'public')
const fileNamePattern = /^[a-z0-9]+(-[a-z0-9]+)*\.md$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

function fail(file: string, field: string, problem: string): never {
  throw new Error(`[blog] content/blog/${file}: "${field}" ${problem}`)
}

function requireString(data: Record<string, unknown>, file: string, field: string): string {
  const value = data[field]
  if (typeof value !== 'string' || value.trim() === '') fail(file, field, 'is required and must be non-empty text')
  return value.trim()
}

function optionalString(data: Record<string, unknown>, file: string, field: string): string | undefined {
  const value = data[field]
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value !== 'string') fail(file, field, 'must be text')
  return value.trim()
}

function optionalBoolean(data: Record<string, unknown>, file: string, field: string): boolean {
  const value = data[field]
  if (value === undefined || value === null) return false
  if (typeof value !== 'boolean') fail(file, field, 'must be true or false')
  return value
}

// YAML silently turns an unquoted 2026-02-30 into March 2, so validate the date exactly as
// written in the front matter text, not the value YAML parsed.
function parseDate(frontMatter: string, value: unknown, file: string, field: string): string {
  const literal = frontMatter.match(new RegExp(`^${field}:[ \\t]*(.*)$`, 'm'))?.[1]
  const text = literal
    ?.replace(/\s+#.*$/, '')
    .trim()
    .replace(/^(["'])(.*)\1$/, '$2')
    .trim()
  if (!text || !datePattern.test(text)) fail(file, field, `must be a date written YYYY-MM-DD (got ${JSON.stringify(text ?? value)})`)
  const parsed = new Date(`${text}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== text) fail(file, field, `is not a real calendar date (got "${text}")`)
  return text
}

function publicFileExists(urlPath: string) {
  let decoded: string
  try {
    decoded = decodeURIComponent(urlPath.split(/[?#]/)[0])
  } catch {
    return false
  }
  const resolved = path.join(publicDir, decoded)
  if (!resolved.startsWith(publicDir + path.sep)) return false
  return fs.existsSync(resolved) && fs.statSync(resolved).isFile()
}

function isExternalHttpLink(href: unknown) {
  if (typeof href !== 'string') return false
  try {
    const url = new URL(href)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
    return url.hostname !== 'aisafetyuci.org' && url.hostname !== 'www.aisafetyuci.org'
  } catch {
    return false
  }
}

// Raw HTML in posts is dropped: remark-rehype runs without allowDangerousHtml.
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeExternalLinks, {
    target: '_blank',
    rel: ['noopener', 'noreferrer'],
    test: (element) => isExternalHttpLink(element.properties?.href),
  })
  .use(rehypeStringify)

function readingTimeOf(html: string) {
  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 230))
}

function loadPost(file: string): Post {
  if (!fileNamePattern.test(file)) {
    throw new Error(`[blog] content/blog/${file}: file name must be lowercase words joined by hyphens, ending in .md (e.g. "my-first-post.md")`)
  }
  const source = fs.readFileSync(path.join(postsDir, file), 'utf8')
  // Passing options ({}) skips gray-matter's cache, which drops the raw `matter` text on a hit.
  const { data, content, matter: frontMatter } = matter(source, {})

  const title = requireString(data, file, 'title')
  if (data.date === undefined || data.date === null || data.date === '') fail(file, 'date', 'is required (YYYY-MM-DD)')
  const date = parseDate(frontMatter, data.date, file, 'date')
  const summary = requireString(data, file, 'summary')

  const rawAuthors = data.authors
  if (!Array.isArray(rawAuthors) || rawAuthors.length === 0) fail(file, 'authors', 'is required and must be a list of names')
  const authors = rawAuthors.map((author) => {
    if (typeof author !== 'string' || author.trim() === '') fail(file, 'authors', 'must only contain names (non-empty text)')
    return author.trim()
  })

  const rawCategory = requireString(data, file, 'category')
  const category = categories.find((c) => c === rawCategory)
  if (!category) fail(file, 'category', `must be one of ${categories.join(', ')} (got "${rawCategory}")`)

  const updated = data.updated === undefined || data.updated === null || data.updated === '' ? undefined : parseDate(frontMatter, data.updated, file, 'updated')

  const cover = optionalString(data, file, 'cover')
  const coverAlt = optionalString(data, file, 'coverAlt')
  if (cover) {
    if (!cover.startsWith('/') || !publicFileExists(cover)) fail(file, 'cover', `points to "${cover}", which does not exist under public/`)
    if (!coverAlt) fail(file, 'coverAlt', 'is required when a cover image is set (describe the image)')
  }

  const featured = optionalBoolean(data, file, 'featured')
  const draft = optionalBoolean(data, file, 'draft')

  for (const match of content.matchAll(/\/images\/[^\s)"'<>\]]+/g)) {
    const before = content[match.index - 1]
    if (before && /[\w./-]/.test(before)) continue // part of a longer URL, e.g. https://example.com/images/x.png
    if (!publicFileExists(match[0])) fail(file, 'body', `references "${match[0]}", which does not exist under public/`)
  }

  const html = String(processor.processSync(content))

  return {
    slug: file.replace(/\.md$/, ''),
    title,
    date,
    updated,
    summary,
    authors,
    category,
    cover,
    coverAlt,
    featured,
    draft,
    html,
    readingTime: readingTimeOf(html),
  }
}

let cache: Post[] | undefined

// All published posts, newest first. Drafts appear only in `npm run dev`.
export function getAllPosts(): Post[] {
  const isDev = process.env.NODE_ENV === 'development'
  if (cache && !isDev) return cache
  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter((file) => !file.startsWith('.')) : []
  const posts = files
    .map(loadPost)
    .filter((post) => isDev || !post.draft)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)))
  if (!isDev) cache = posts
  return posts
}

// Static export refuses a dynamic route whose generateStaticParams() returns [] (Next 16,
// error E87). While a list is empty we emit this one placeholder param instead; it can never
// match a real post or category (those are lowercase-hyphen only) and its page calls notFound().
export const emptyParamPlaceholder = '_none'

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug)
}

export function usedCategories(posts = getAllPosts()): Category[] {
  return categories.filter((category) => posts.some((post) => post.category === category))
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}
