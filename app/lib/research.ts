// Reads and validates research projects from content/research/*.md at build time.
// Each file is one project: its front matter drives the /research cards and the application
// form, and its body is the one-pager. Server-only: uses the filesystem.
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

export const formats = ['In person', 'Online', 'Hybrid'] as const
export type ProjectFormat = (typeof formats)[number]

export interface Project {
  slug: string
  title: string
  summary: string
  open: boolean
  leads: string[] // may be empty until leads are chosen
  commitment?: string // e.g. "4–6 hrs/week"
  format?: ProjectFormat
  duration: string // e.g. "2–3 weeks"
  team?: string // e.g. "2–3 people"
  skills?: string // what you need to bring, e.g. "Python and API calls"
  constraints: string[]
  onePagerUrl?: string
  extraQuestion?: string
  draft: boolean
  html: string // the one-pager
}

const projectsDir = path.join(process.cwd(), 'content', 'research')
const fileNamePattern = /^[a-z0-9]+(-[a-z0-9]+)*\.md$/

function fail(file: string, field: string, problem: string): never {
  throw new Error(`[research] content/research/${file}: "${field}" ${problem}`)
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

function stringList(data: Record<string, unknown>, file: string, field: string, required: boolean): string[] {
  const value = data[field]
  if (value === undefined || value === null) {
    if (required) fail(file, field, 'is required and must be a list')
    return []
  }
  if (!Array.isArray(value) || (required && value.length === 0)) fail(file, field, required ? 'is required and must be a list' : 'must be a list')
  return value.map((item) => {
    if (typeof item !== 'string' || item.trim() === '') fail(file, field, 'must only contain non-empty text')
    return item.trim()
  })
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

// Raw HTML in one-pagers is dropped, as on the blog.
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

function loadProject(file: string): Project {
  if (!fileNamePattern.test(file)) {
    throw new Error(`[research] content/research/${file}: file name must be lowercase words joined by hyphens, ending in .md`)
  }
  // These names are taken by /research/apply and /research/projects.json.
  if (file === 'apply.md' || file === 'projects.md') {
    throw new Error(`[research] content/research/${file}: this file name is reserved; rename the project`)
  }
  const { data, content } = matter(fs.readFileSync(path.join(projectsDir, file), 'utf8'), {})

  const status = requireString(data, file, 'status')
  if (status !== 'open' && status !== 'closed') fail(file, 'status', `must be "open" or "closed" (got "${status}")`)

  const rawFormat = optionalString(data, file, 'format')
  const format = rawFormat === undefined ? undefined : formats.find((f) => f === rawFormat)
  if (rawFormat !== undefined && !format) fail(file, 'format', `must be one of ${formats.join(', ')} (got "${rawFormat}")`)

  const onePagerUrl = optionalString(data, file, 'onePagerUrl')
  if (onePagerUrl && !/^https:\/\//.test(onePagerUrl)) fail(file, 'onePagerUrl', 'must be a full https:// link')

  const draft = data.draft ?? false
  if (typeof draft !== 'boolean') fail(file, 'draft', 'must be true or false')

  if (content.trim() === '') fail(file, 'body', 'is empty; write the one-pager below the front matter')

  return {
    slug: file.replace(/\.md$/, ''),
    title: requireString(data, file, 'title'),
    summary: requireString(data, file, 'summary'),
    open: status === 'open',
    leads: stringList(data, file, 'leads', false),
    commitment: optionalString(data, file, 'commitment'),
    format,
    duration: requireString(data, file, 'duration'),
    team: optionalString(data, file, 'team'),
    skills: optionalString(data, file, 'skills'),
    constraints: stringList(data, file, 'constraints', false),
    onePagerUrl,
    extraQuestion: optionalString(data, file, 'extraQuestion'),
    draft,
    html: String(processor.processSync(content)),
  }
}

let cache: Project[] | undefined

// All published projects, open ones first, then by title. Drafts appear only in `npm run dev`.
export function getAllProjects(): Project[] {
  const isDev = process.env.NODE_ENV === 'development'
  if (cache && !isDev) return cache
  const files = fs.existsSync(projectsDir) ? fs.readdirSync(projectsDir).filter((file) => !file.startsWith('.')) : []
  const projects = files
    .map(loadProject)
    .filter((project) => isDev || !project.draft)
    .sort((a, b) => (a.open === b.open ? a.title.localeCompare(b.title) : a.open ? -1 : 1))
  if (!isDev) cache = projects
  return projects
}

export function getOpenProjects() {
  return getAllProjects().filter((project) => project.open)
}

export function getProject(slug: string) {
  return getAllProjects().find((project) => project.slug === slug)
}
