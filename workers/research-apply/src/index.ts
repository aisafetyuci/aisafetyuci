// Receives research-project applications from the /research form and files them in Airtable.
// Runs on Cloudflare Workers with no dependencies; the minimal types below stand in for
// @cloudflare/workers-types. Every error message here may be shown to an applicant as-is.

interface Env {
  AIRTABLE_BASE_ID: string
  AIRTABLE_TOKEN: string // secret
  TURNSTILE_SECRET: string // secret
  SITE_URL: string
}

interface Applicant {
  name: string
  email: string
  age: number
  affiliation: string
  school?: string
  yearOrRole?: string
  member: string
  hours: string
  format: string
  basedIn?: string
  experience?: string
  links?: string
  anythingElse?: string
}

interface Application {
  project: string // slug
  rank: number
  interest: string
  explore: string
  extra?: string
}

interface AirtableRecord {
  id: string
  fields: Record<string, unknown>
}

const affiliations = ['UCI student', 'Student at another school', 'Not currently a student']
const memberAnswers = ['Yes', 'No', 'Not sure']
const hoursOptions = ['1–3', '3–6', '6–10', '10+']
const formatOptions = ['In person', 'Online', 'Either']

const maxBodyBytes = 100 * 1024
const shortMax = 200
const longMax = 3000
const maxApplications = 20

const allowedOrigins = ['https://aisafetyuci.org', 'https://www.aisafetyuci.org', 'http://localhost:3000']
// Cloudflare branch previews of the site, e.g. https://my-branch-aisafetyuci.aisafetyatuci.workers.dev
const previewOrigin = /^https:\/\/([a-z0-9-]+-)?aisafetyuci\.aisafetyatuci\.workers\.dev$/

const tryAgain = 'Please try again in a few minutes, or email the club if it keeps happening.'

// Thrown to stop processing and send the applicant a specific status and message.
class Rejection extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

function bad(message: string): never {
  throw new Rejection(400, message)
}

// ---- Validation ------------------------------------------------------------------------

function optionalText(value: unknown, label: string, max: number): string | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') bad(`${label} must be text.`)
  const trimmed = value.trim()
  if (trimmed.length > max) bad(`${label} must be ${max} characters or fewer.`)
  return trimmed || undefined
}

function requiredText(value: unknown, label: string, max: number): string {
  const trimmed = optionalText(value, label, max)
  if (!trimmed) bad(`${label} is required.`)
  return trimmed
}

function choice(value: unknown, label: string, options: string[]): string {
  if (typeof value !== 'string' || !options.includes(value)) bad(`Please choose an option for ${label}.`)
  return value
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validate(body: Record<string, unknown>) {
  const turnstileToken = requiredText(body.turnstileToken, 'The bot check', 4096)
  const a = body.applicant
  if (!isObject(a)) bad('Your details are missing. Please reload the page and try again.')

  const email = requiredText(a.email, 'Email', shortMax)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad('Please enter a valid email address.')
  if (typeof a.age !== 'number' || !Number.isInteger(a.age) || a.age < 13 || a.age > 120) {
    bad('Please enter your age as a whole number between 13 and 120.')
  }

  const applicant: Applicant = {
    name: requiredText(a.name, 'Name', shortMax),
    email,
    age: a.age,
    affiliation: choice(a.affiliation, 'affiliation', affiliations),
    school: optionalText(a.school, 'School', shortMax),
    yearOrRole: optionalText(a.yearOrRole, 'Year or role', shortMax),
    member: choice(a.member, 'AISCI member', memberAnswers),
    hours: choice(a.hours, 'hours per week', hoursOptions),
    format: choice(a.format, 'format', formatOptions),
    basedIn: optionalText(a.basedIn, 'Based in', shortMax),
    experience: optionalText(a.experience, 'Experience', longMax),
    links: optionalText(a.links, 'Links', longMax),
    anythingElse: optionalText(a.anythingElse, 'Anything else', longMax),
  }

  const list = body.applications
  if (!Array.isArray(list) || list.length < 1) bad('Please choose at least one project.')
  if (list.length > maxApplications) bad(`You can apply to at most ${maxApplications} projects.`)

  const applications: Application[] = list.map((item: unknown) => {
    if (!isObject(item)) bad('One of your project answers is missing. Please reload the page and try again.')
    const project = requiredText(item.project, 'Project', shortMax)
    if (typeof item.rank !== 'number' || !Number.isInteger(item.rank)) bad(`The ranking for "${project}" is invalid.`)
    return {
      project,
      rank: item.rank,
      interest: requiredText(item.interest, `Your interest in "${project}"`, longMax),
      explore: requiredText(item.explore, `What you'd explore first in "${project}"`, longMax),
      extra: optionalText(item.extra, `The extra answer for "${project}"`, longMax),
    }
  })

  if (new Set(applications.map((app) => app.project)).size !== applications.length) {
    bad('Each project can only appear once in your application.')
  }
  // Ranks must be exactly 1..n: n distinct integers that all fall in that range.
  const ranks = new Set(applications.map((app) => app.rank))
  if (ranks.size !== applications.length || applications.some((app) => app.rank < 1 || app.rank > applications.length)) {
    bad('Please rank your projects 1, 2, 3, … with no gaps or ties.')
  }

  return { turnstileToken, applicant, applications }
}

// ---- Outside services ------------------------------------------------------------------

async function verifyTurnstile(token: string, ip: string | null, env: Env) {
  const form = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token })
  if (ip) form.set('remoteip', ip)
  let result: { success?: boolean; 'error-codes'?: string[] }
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
    if (!response.ok) throw new Error(`status ${response.status}`)
    result = await response.json()
  } catch (error) {
    console.error('Turnstile siteverify failed:', String(error))
    throw new Rejection(502, `We couldn't run the bot check just now. ${tryAgain}`)
  }
  if (!result.success) {
    console.error('Turnstile rejected a submission:', JSON.stringify(result['error-codes'] ?? []))
    throw new Rejection(403, "We couldn't confirm you're not a bot. Please reload the page and try again.")
  }
}

// Slug → title for every project currently taking applications, read from the site that sent the
// form, so a Cloudflare preview of the site is checked against its own projects. Origins are
// allow-listed before this runs; localhost can't be fetched from Cloudflare, so it uses SITE_URL.
// Cached at the edge so a burst of submissions doesn't refetch it, while closing a project
// takes effect within minutes.
async function openProjects(env: Env, origin: string): Promise<Map<string, string>> {
  const site = origin.startsWith('https://') ? origin : env.SITE_URL.replace(/\/+$/, '')
  const url = `${site}/research/projects.json`
  try {
    const response = await fetch(url, { cf: { cacheTtl: 300, cacheEverything: true } } as RequestInit)
    if (!response.ok) throw new Error(`status ${response.status}`)
    const data: { open?: { slug: string; title: string }[] } = await response.json()
    if (!Array.isArray(data.open)) throw new Error('missing "open" list')
    return new Map(data.open.map((project) => [project.slug, project.title]))
  } catch (error) {
    console.error(`Fetching ${url} failed:`, String(error))
    throw new Rejection(502, `We couldn't load the list of open projects. ${tryAgain}`)
  }
}

// Airtable formulas use single-quoted strings; escape so applicant input can't break out.
function quote(value: string) {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

async function airtable(env: Env, table: string, method: string, query = '', body?: unknown) {
  const url = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(table)}${query && `?${query}`}`
  let response: Response
  try {
    response = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${env.AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch (error) {
    console.error(`Airtable ${method} ${table} failed to connect:`, String(error))
    throw new Rejection(502, `We couldn't save your application. ${tryAgain}`)
  }
  if (!response.ok) {
    console.error(`Airtable ${method} ${table} returned ${response.status}:`, await response.text())
    throw new Rejection(502, `We couldn't save your application. ${tryAgain}`)
  }
  return response.json()
}

async function findRecords(env: Env, table: string, formula: string, extra: Record<string, string> = {}) {
  const records: AirtableRecord[] = []
  let offset: string | undefined
  do {
    const params = new URLSearchParams({ filterByFormula: formula, ...extra })
    if (offset) params.set('offset', offset)
    const page = await airtable(env, table, 'GET', params.toString())
    records.push(...page.records)
    offset = page.offset
  } while (offset)
  return records
}

// Airtable creates at most 10 records per call. Returns the new IDs in input order.
async function createRecords(env: Env, table: string, rows: Record<string, unknown>[]) {
  const ids: string[] = []
  for (let i = 0; i < rows.length; i += 10) {
    const records = rows.slice(i, i + 10).map((fields) => ({ fields: withoutEmpty(fields) }))
    // typecast lets Airtable add new single-select options instead of rejecting the write.
    const result = await airtable(env, table, 'POST', '', { records, typecast: true })
    ids.push(...result.records.map((record: AirtableRecord) => record.id))
  }
  return ids
}

// Blank optional answers are left out so Airtable cells stay empty rather than "".
function withoutEmpty(fields: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined && value !== ''))
}

// ---- Request handling ------------------------------------------------------------------

async function handle(request: Request, env: Env) {
  if (Number(request.headers.get('Content-Length') ?? 0) > maxBodyBytes) {
    throw new Rejection(413, 'Your application is too long to send. Please shorten some answers and try again.')
  }
  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > maxBodyBytes) {
    throw new Rejection(413, 'Your application is too long to send. Please shorten some answers and try again.')
  }

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    bad('Something went wrong sending your application. Please reload the page and try again.')
  }
  if (!isObject(body)) bad('Something went wrong sending your application. Please reload the page and try again.')

  // Honeypot: people never see this field, so anything in it means a bot. Pretend it worked.
  if (typeof body.website === 'string' && body.website.trim() !== '') return

  // Validate before Turnstile so a typo doesn't burn the applicant's single-use token.
  const { turnstileToken, applicant, applications } = validate(body)
  await verifyTurnstile(turnstileToken, request.headers.get('CF-Connecting-IP'), env)

  const open = await openProjects(env, request.headers.get('Origin') ?? '')
  for (const app of applications) {
    if (!open.has(app.project)) bad(`The project "${app.project}" is no longer accepting applications. Please remove it and submit again.`)
  }

  // Projects: reuse existing rows by slug, create any the base hasn't seen yet.
  const slugs = applications.map((app) => app.project)
  const projectIds = new Map<string, string>()
  const existing = await findRecords(env, 'Projects', `OR(${slugs.map((slug) => `{Slug}=${quote(slug)}`).join(',')})`)
  for (const record of existing) {
    const slug = String(record.fields.Slug ?? '')
    if (!projectIds.has(slug)) projectIds.set(slug, record.id)
  }
  const missing = slugs.filter((slug) => !projectIds.has(slug))
  const createdIds = await createRecords(env, 'Projects', missing.map((slug) => ({ Slug: slug, Title: open.get(slug) })))
  missing.forEach((slug, i) => projectIds.set(slug, createdIds[i]))

  // Applicants: always a new row, flagged when the email has applied before so reviewers can merge by hand.
  const earlier = await findRecords(env, 'Applicants', `LOWER({Email})=${quote(applicant.email.toLowerCase())}`, { maxRecords: '1' })
  const [applicantId] = await createRecords(env, 'Applicants', [
    {
      Name: applicant.name,
      Email: applicant.email,
      Age: applicant.age,
      Affiliation: applicant.affiliation,
      School: applicant.school,
      'Year or role': applicant.yearOrRole,
      'AISCI member': applicant.member,
      'Hours per week': applicant.hours,
      Format: applicant.format,
      'Based in': applicant.basedIn,
      Experience: applicant.experience,
      Links: applicant.links,
      'Anything else': applicant.anythingElse,
      'Possible duplicate': earlier.length > 0 ? true : undefined,
    },
  ])

  await createRecords(
    env,
    'Applications',
    applications.map((app) => ({
      Summary: `${applicant.name} → ${open.get(app.project)}`,
      Applicant: [applicantId],
      Project: [projectIds.get(app.project)],
      Rank: app.rank,
      Interest: app.interest,
      'First to explore': app.explore,
      'Extra answer': app.extra,
      'Review status': 'New',
    })),
  )
}

function originAllowed(origin: string) {
  return allowedOrigins.includes(origin) || previewOrigin.test(origin)
}

function json(data: unknown, status: number, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...headers } })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? ''
    // No CORS headers on purpose: the browser then refuses to hand the response to the page.
    if (!originAllowed(origin)) return json({ ok: false, error: 'Applications can only be sent from aisafetyuci.org.' }, 403)

    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    }
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Applications must be sent with POST.' }, 405, { ...cors, Allow: 'POST, OPTIONS' })
    }

    try {
      await handle(request, env)
      return json({ ok: true }, 200, cors)
    } catch (error) {
      if (error instanceof Rejection) return json({ ok: false, error: error.message }, error.status, cors)
      console.error('Unexpected error:', error instanceof Error ? error.stack : String(error))
      return json({ ok: false, error: `Something went wrong saving your application. ${tryAgain}` }, 502, cors)
    }
  },
}
