// Receives research-project applications from the /research form and files them in Airtable.
// Runs on Cloudflare Workers with no dependencies; the minimal types below stand in for
// @cloudflare/workers-types. Every error message here may be shown to an applicant as-is.

// The part of Cloudflare's ExecutionContext used here (no @cloudflare/workers-types in this repo).
interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void
}

interface Env {
  AIRTABLE_BASE_ID: string
  AIRTABLE_TOKEN: string // secret
  TURNSTILE_SECRET: string // secret
  SITE_URL: string
  // Service binding to the site Worker (wrangler.jsonc). Optional: without it the public URL is used.
  SITE?: { fetch(input: string, init?: RequestInit): Promise<Response> }
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

// Fits the longest real application: 20 projects × 3 answers × 3000 characters of 3-byte
// (non-Latin) text is 540 KB, plus the applicant's own answers.
const maxBodyBytes = 1_000_000
const shortMax = 200
const longMax = 3000
const maxApplications = 20

// http:// too: the site doesn't force HTTPS, and a visitor on http:// would otherwise be refused.
const allowedOrigins = ['https://aisafetyuci.org', 'https://www.aisafetyuci.org', 'http://aisafetyuci.org', 'http://www.aisafetyuci.org']
// `npm run dev` on any port (Next picks another when 3000 is taken).
const localOrigin = /^http:\/\/localhost(:\d+)?$/
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

// Returns the hostname of the page the token was issued on.
async function verifyTurnstile(token: string, ip: string | null, env: Env): Promise<string> {
  const form = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token })
  if (ip) form.set('remoteip', ip)
  let status: number
  let text: string
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
    status = response.status
    text = await response.text()
  } catch (error) {
    console.error('Turnstile siteverify failed:', String(error))
    throw new Rejection(502, `We couldn't run the bot check just now. ${tryAgain}`)
  }
  // Read the JSON whatever the status: a missing or wrong secret comes back as a 400 with error codes.
  let result: { success?: boolean; hostname?: string; 'error-codes'?: string[] } | undefined
  try {
    result = JSON.parse(text)
  } catch {}
  if (!isObject(result) || status >= 500) {
    console.error(`Turnstile siteverify failed: status ${status}:`, text.slice(0, 1000))
    throw new Rejection(502, `We couldn't run the bot check just now. ${tryAgain}`)
  }
  if (status !== 200) console.error(`Turnstile siteverify returned ${status}:`, text.slice(0, 1000))
  if (!result.success) {
    const codes = Array.isArray(result['error-codes']) ? result['error-codes'] : []
    // A missing or wrong secret is our misconfiguration, not the applicant's fault.
    if (codes.includes('missing-input-secret') || codes.includes('invalid-input-secret')) {
      console.error('Turnstile config error (check the TURNSTILE_SECRET secret):', JSON.stringify(codes))
      throw new Rejection(502, `We couldn't run the bot check just now. ${tryAgain}`)
    }
    console.error('Turnstile rejected a submission:', JSON.stringify(codes))
    throw new Rejection(403, "We couldn't confirm you're not a bot. Please reload the page and try again.")
  }
  return result.hostname ?? ''
}

type ProjectList =
  | { open: Map<string, string>; source: 'binding' | 'url' }
  | { open: null; source: null; error: string }

async function parseProjects(response: Response): Promise<Map<string, string>> {
  if (!response.ok) throw new Error(`status ${response.status}`)
  const data: { open?: { slug: string; title: string }[] } = await response.json()
  if (!Array.isArray(data.open)) throw new Error('missing "open" list')
  return new Map(data.open.filter((project) => typeof project?.slug === 'string').map((project) => [project.slug, project.title]))
}

// Slug → title for every project currently taking applications. Read through the SITE service
// binding first, since Cloudflare may refuse a plain fetch from one of the account's Workers to
// another; the public URL is the fallback. The URL fetch is cached at the edge so a burst of
// submissions doesn't refetch it, while closing a project takes effect within minutes.
// Never throws: on failure it logs and returns the last error (safe to show on /health).
async function openProjects(env: Env): Promise<ProjectList> {
  const url = `${env.SITE_URL.replace(/\/+$/, '')}/research/projects.json`
  if (env.SITE) {
    try {
      return { open: await parseProjects(await env.SITE.fetch(url)), source: 'binding' }
    } catch (error) {
      console.error(`Reading ${url} through the SITE binding failed:`, String(error))
    }
  }
  try {
    const response = await fetch(url, { cf: { cacheTtl: 300, cacheEverything: true } } as RequestInit)
    return { open: await parseProjects(response), source: 'url' }
  } catch (error) {
    console.error(`Fetching ${url} failed:`, String(error))
    return { open: null, source: null, error: String(error) }
  }
}

// Airtable formulas use single-quoted strings; escape so applicant input can't break out.
function quote(value: string) {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const retryDelays = [300, 1000]
// Airtable allows 5 requests a second per base and, once exceeded, refuses everything for
// 30 seconds. The applicant's request waits out a whole lockout (about 32 seconds) rather than
// asking them to resubmit. A rollback left running after the response (waitUntil) must finish
// within the 30 seconds Cloudflare allows, so it waits at most about 23.
const rateLimitDelays = [1000, 4000, 27000]
const rollbackRateLimitDelays = [1000, 4000, 18000]

// Reads and deletes are retried on network errors and 5xx. Creates are not: a failed POST may
// still have been saved, and a retry would duplicate it. A 429 (rate limit) means nothing was
// done, so any request is retried after the `rateLimited` delays.
async function airtable(env: Env, table: string, method: string, query = '', body?: unknown, rateLimited = rateLimitDelays) {
  const url = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(table)}${query && `?${query}`}`
  const idempotent = method === 'GET' || method === 'DELETE'
  let retries = 0
  let rateLimitRetries = 0
  while (true) {
    let response: Response
    try {
      response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${env.AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
      })
    } catch (error) {
      if (idempotent && retries < retryDelays.length) {
        await sleep(retryDelays[retries++])
        continue
      }
      console.error(`Airtable ${method} ${table} failed to connect:`, String(error))
      throw new Rejection(502, `We couldn't save your application. ${tryAgain}`)
    }
    if (response.status === 429) {
      if (rateLimitRetries < rateLimited.length) {
        await sleep(rateLimited[rateLimitRetries++])
        continue
      }
      console.error(`Airtable ${method} ${table} still rate-limited after ${rateLimitRetries} retries`)
      throw new Rejection(503, "We're getting a lot of applications right now. Please wait a minute and submit again.")
    }
    // A retried DELETE whose first try went through finds nothing left to delete; the caller
    // checks which records really remain (a 404 can also mean a renamed table).
    if (response.status === 404 && method === 'DELETE' && retries > 0) return { notFoundOnRetry: true }
    if (response.status >= 500 && idempotent && retries < retryDelays.length) {
      await sleep(retryDelays[retries++])
      continue
    }
    if (!response.ok) {
      console.error(`Airtable ${method} ${table} returned ${response.status}:`, await response.text())
      throw new Rejection(502, `We couldn't save your application. ${tryAgain}`)
    }
    return response.json()
  }
}

async function findRecords(env: Env, table: string, formula: string, extra: Record<string, string> = {}, rateLimited = rateLimitDelays) {
  const records: AirtableRecord[] = []
  let offset: string | undefined
  do {
    const params = new URLSearchParams({ filterByFormula: formula, ...extra })
    if (offset) params.set('offset', offset)
    const page = await airtable(env, table, 'GET', params.toString(), undefined, rateLimited)
    records.push(...page.records)
    offset = page.offset
  } while (offset)
  return records
}

// Airtable creates at most 10 records per call. Returns the new IDs in input order; pass `ids`
// to see the ones already created if a later batch fails.
async function createRecords(env: Env, table: string, rows: Record<string, unknown>[], ids: string[] = []) {
  for (let i = 0; i < rows.length; i += 10) {
    const records = rows.slice(i, i + 10).map((fields) => ({ fields: withoutEmpty(fields) }))
    // typecast lets Airtable add new single-select options instead of rejecting the write.
    const result = await airtable(env, table, 'POST', '', { records, typecast: true })
    ids.push(...result.records.map((record: AirtableRecord) => record.id))
  }
  return ids
}

// Airtable deletes at most 10 records per call too.
async function deleteRecords(env: Env, table: string, ids: string[], rateLimited: number[]) {
  for (let i = 0; i < ids.length; i += 10) {
    const params = new URLSearchParams()
    for (const id of ids.slice(i, i + 10)) params.append('records[]', id)
    const result = await airtable(env, table, 'DELETE', params.toString(), undefined, rateLimited)
    if (result.notFoundOnRetry) {
      const batch = ids.slice(i, i + 10)
      const left = await findRecords(env, table, `OR(${batch.map((id) => `RECORD_ID()=${quote(id)}`).join(',')})`, {}, rateLimited)
      if (left.length) throw new Error(`${left.length} of ${batch.length} ${table} records still there after a retried delete`)
    }
  }
}

// Airtable has no transactions. If an application fails halfway, remove what was saved so the
// applicant's retry starts clean (and isn't flagged as their own duplicate). Best effort: if
// this fails too, the log names the rows to delete by hand. When it runs after the applicant has
// their answer (waitUntil), Cloudflare cancels it after 30 seconds without running any more code,
// so the rows are logged first: with no "Rolled back" line after it, delete them by hand.
async function rollBack(env: Env, email: string, applicantId: string, applicationIds: string[], rateLimited: number[]) {
  console.error(`Rolling back a failed application from ${email}: Applicants ["${applicantId}"]; Applications ${JSON.stringify(applicationIds)}`)
  const tables = [['Applications', applicationIds], ['Applicants', [applicantId]]] as const
  const results = await Promise.allSettled(tables.map(([table, ids]) => deleteRecords(env, table, [...ids], rateLimited)))
  const left = tables.filter((_, i) => results[i].status === 'rejected').map(([table, ids]) => `${table} ${JSON.stringify(ids)}`)
  results.forEach((result, i) => {
    if (result.status === 'rejected') console.error(`Rollback of ${tables[i][0]} failed:`, String(result.reason))
  })
  if (left.length) console.error(`Rollback failed; delete by hand. Email ${email}: ${left.join('; ')}`)
  else console.error(`Rolled back a failed application from ${email} (Applicants ${applicantId}, ${applicationIds.length} Applications)`)
}

// Blank optional answers are left out so Airtable cells stay empty rather than "".
function withoutEmpty(fields: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined && value !== ''))
}

// ---- Request handling ------------------------------------------------------------------

async function handle(request: Request, env: Env, ctx: ExecutionContext) {
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

  // Honeypot: people never see this field, but browser autofill and password managers can fill
  // it, so it's only logged (for spotting bots in Airtable) and the application is saved as
  // normal. Turnstile is the real bot check.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    const email = isObject(body.applicant) && typeof body.applicant.email === 'string' ? body.applicant.email.slice(0, shortMax) : null
    console.log('Honeypot field filled in (saving anyway):', JSON.stringify({ email, ip: request.headers.get('CF-Connecting-IP') }))
  }

  // Validate before Turnstile so a typo doesn't burn the applicant's single-use token.
  const { turnstileToken, applicant, applications } = validate(body)
  try {
    await save(request, env, ctx, turnstileToken, applicant, applications)
  } catch (error) {
    // The Airtable and Turnstile log lines above don't know whose application it was.
    if (!(error instanceof Rejection) || error.status >= 500) {
      console.error(`Application from ${applicant.email} not saved:`, error instanceof Error ? error.message : String(error))
    }
    throw error
  }
}

// Slug → Projects record ID, for as long as this Worker instance lives, so a project that has
// had an application skips the Projects lookup (Airtable allows only 5 requests a second).
// Cleared whenever saving Applications fails, in case a cached row was deleted from the base.
const projectIdCache = new Map<string, string>()

async function save(request: Request, env: Env, ctx: ExecutionContext, turnstileToken: string, applicant: Applicant, applications: Application[]) {
  const tokenHost = await verifyTurnstile(turnstileToken, request.headers.get('CF-Connecting-IP'), env)

  // The bot check must have been solved on the page that sent the form, so a token from one
  // allowed site can't be replayed with another site's Origin. Local dev is exempt.
  const origin = request.headers.get('Origin') ?? ''
  if (!localOrigin.test(origin) && tokenHost !== new URL(origin).hostname) {
    console.error('Turnstile hostname mismatch', { tokenHost, origin })
    throw new Rejection(403, "We couldn't confirm you're not a bot. Please reload the page and try again.")
  }

  // Previews are checked against the live site's list too. Only if that list can't be loaded
  // (before the research pages reach main) does a preview accept any well-formed slug, titled
  // with the slug itself; once main serves projects.json that fallback is effectively unused.
  const projects = await openProjects(env)
  let open: Map<string, string>
  if (projects.open) {
    open = projects.open
  } else if (previewOrigin.test(origin)) {
    open = new Map(applications.filter((app) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(app.project)).map((app) => [app.project, app.project]))
  } else {
    throw new Rejection(502, `We couldn't load the list of open projects. ${tryAgain}`)
  }
  for (const app of applications) {
    if (!open.has(app.project)) bad(`The project "${app.project}" is no longer accepting applications. Please remove it and submit again.`)
  }

  // Projects: reuse existing rows by slug, create any the base hasn't seen yet.
  const slugs = applications.map((app) => app.project)
  const projectIds = new Map<string, string>()
  for (const slug of slugs) {
    const id = projectIdCache.get(slug)
    if (id) projectIds.set(slug, id)
  }
  const unknown = slugs.filter((slug) => !projectIds.has(slug))
  if (unknown.length) {
    const existing = await findRecords(env, 'Projects', `OR(${unknown.map((slug) => `{Slug}=${quote(slug)}`).join(',')})`)
    for (const record of existing) {
      const slug = String(record.fields.Slug ?? '')
      if (!projectIds.has(slug)) projectIds.set(slug, record.id)
    }
    const missing = unknown.filter((slug) => !projectIds.has(slug))
    const createdIds = await createRecords(env, 'Projects', missing.map((slug) => ({ Slug: slug, Title: open.get(slug) })))
    missing.forEach((slug, i) => projectIds.set(slug, createdIds[i]))
    for (const slug of unknown) projectIdCache.set(slug, projectIds.get(slug)!)
  }

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

  const applicationIds: string[] = []
  try {
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
      applicationIds,
    )
  } catch (error) {
    projectIdCache.clear()
    // Projects rows are left: they're harmless and reused by the next submission. Usually the
    // rollback runs before replying (about half a second more for the applicant, but it surely
    // finishes). After a rate limit (503) the applicant has already waited half a minute, so it
    // runs after the reply instead, with shorter waits that fit Cloudflare's 30-second limit.
    if (error instanceof Rejection && error.status === 503) {
      ctx.waitUntil(rollBack(env, applicant.email, applicantId, applicationIds, rollbackRateLimitDelays))
    } else {
      await rollBack(env, applicant.email, applicantId, applicationIds, rateLimitDelays)
    }
    throw error
  }
}

// GET /health: can the Worker read the open-projects list, and by which path? Touches no
// Airtable data and no secrets, so it's safe to open in a browser as a smoke test.
async function health(env: Env) {
  const projects = await openProjects(env)
  const result = projects.open
    ? { ok: true, projects: projects.open.size, source: projects.source }
    : { ok: false, projects: null, source: null, error: 'Could not load the project list; the Worker logs say why.' }
  return json(result, projects.open ? 200 : 503, { 'Cache-Control': 'no-store' })
}

function originAllowed(origin: string) {
  return allowedOrigins.includes(origin) || localOrigin.test(origin) || previewOrigin.test(origin)
}

function json(data: unknown, status: number, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...headers } })
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'GET' && new URL(request.url).pathname === '/health') return health(env)

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
      await handle(request, env, ctx)
      return json({ ok: true }, 200, cors)
    } catch (error) {
      if (error instanceof Rejection) return json({ ok: false, error: error.message }, error.status, cors)
      console.error('Unexpected error:', error instanceof Error ? error.stack : String(error))
      return json({ ok: false, error: `Something went wrong saving your application. ${tryAgain}` }, 502, cors)
    }
  },
}
