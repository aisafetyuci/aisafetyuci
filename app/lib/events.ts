// Builds the /events list from content/events/calendar.ics, a saved copy of the club Google
// Calendar's public iCal feed. Server-only: never import this from a client component.
//
// .github/workflows/sync-calendar.yml refreshes that copy every few hours and commits it when the
// calendar changed, which triggers a normal deploy. (Builds don't ask Google directly: Google
// rate-limits the shared machines Cloudflare builds on.) Refresh it locally with `npm run sync-calendar`.
import fs from 'node:fs'
import path from 'node:path'
import ICAL from 'ical.js'
import { eventExtras } from '../data/eventExtras'
import type { ClubEvent, EventCategory } from '../data/events'

const zone = 'America/Los_Angeles'
const dayFormat = new Intl.DateTimeFormat('en-CA', { timeZone: zone })
const timeFormat = new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: 'numeric', minute: '2-digit' })
const weekdayFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'long' })

// Open-ended repeating events (e.g. "every Tuesday", no end date) are listed a year ahead.
const horizonDays = 365

// Category from a tag in the event description (#talk, #social, ...), else guessed from the title.
const tagCategories: Record<string, EventCategory> = {
  program: 'Programs', programs: 'Programs', fellowship: 'Programs', meeting: 'Programs',
  talk: 'Talks', talks: 'Talks',
  workshop: 'Workshops', workshops: 'Workshops', hackathon: 'Workshops',
  social: 'Socials', socials: 'Socials',
  cowork: 'Co-working', coworking: 'Co-working',
  tabling: 'Tabling',
  deadline: 'Deadlines', deadlines: 'Deadlines',
}
const titleRules: [RegExp, EventCategory][] = [
  [/deadline|applications? (due|close)/i, 'Deadlines'],
  [/involvement fair|club fair|tabling/i, 'Tabling'],
  [/co-?work|lock[ -]?in|study (session|hall)/i, 'Co-working'],
  [/workshop|hackathon/i, 'Workshops'],
  [/\btalk\b|fireside|speaker|panel|q ?& ?a|\s\|\s/i, 'Talks'],
  [/fellowship|reading group|member meeting/i, 'Programs'],
  [/social|bonfire|picnic|potluck|party|boba|kickoff|info night|mixer|dinner|hangout/i, 'Socials'],
]

function categoryOf(title: string, tags: string[]): EventCategory {
  for (const tag of tags) if (tagCategories[tag]) return tagCategories[tag]
  return titleRules.find(([pattern]) => pattern.test(title))?.[1] ?? 'Other'
}

function decodeEntities(text: string) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

// Google Calendar descriptions are loose HTML. Pull out the links and #tags; keep the rest as plain text.
function parseDescription(raw: string) {
  const hrefs = [...raw.matchAll(/href="([^"]+)"/gi)].map((m) => decodeEntities(m[1]))
  let text = decodeEntities(raw.replace(/<br\s*\/?>|<\/p>|<\/li>/gi, '\n').replace(/<[^>]+>/g, ''))
  const urls = [...new Set([...hrefs, ...(text.match(/https?:\/\/[^\s<>"]+/g) ?? [])])]
  const tags = [...text.matchAll(/(?:^|\s)#([a-z-]+)/gi)].map((m) => m[1].toLowerCase().replace(/-/g, ''))
  text = text
    .replace(/(?:^|\s)#[a-z-]+/gi, ' ')
    .split('\n')
    // Drop lines that are only a link with a label ("RSVP here: https://...").
    .filter((line) => !/^[^a-z0-9]*[\w\s]{0,40}:?\s*https?:\/\/\S+\s*$/i.test(line.trim()))
    .map((line) => line.replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join(' ')
  return { summary: text || undefined, urls, tags, mentionsRsvp: /rsvp|register|sign[ -]?up/i.test(raw) }
}

const isMapLink = (url: string) => /maps\.app\.goo\.gl|goo\.gl\/maps|google\.[a-z.]+\/maps|map\.uci\.edu/i.test(url)
const isOnlineLink = (url: string) => /meet\.google\.com|zoom\.us|teams\.microsoft\.com/i.test(url)
const isRsvpLink = (url: string) => /forms\.gle|docs\.google\.com\/forms|airtable\.com|partiful\.com|lu\.ma|luma\.com|eventbrite/i.test(url)

function slugify(text: string) {
  return text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
}

const normalizeTitle = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const pacificDay = (time: ICAL.Time) => (time.isDate ? time.toString().slice(0, 10) : dayFormat.format(time.toJSDate()))
const compactTime = (date: Date) => timeFormat.format(date).replace(':00', '')

function timeRange(start: Date, end: Date) {
  const [a, b] = [compactTime(start), compactTime(end)]
  const [aTime, aPeriod] = a.split(' ')
  const [, bPeriod] = b.split(' ')
  return aPeriod === bPeriod ? `${aTime}–${b}` : `${a}–${b}`
}

function addDays(day: string, days: number) {
  const date = new Date(`${day}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

const googleStamp = (time: ICAL.Time) =>
  time.isDate ? time.toString().slice(0, 10).replace(/-/g, '') : time.toJSDate().toISOString().replace(/[-:]|\.\d{3}/g, '')

function recurrenceLabel(recur: ICAL.Recur, firstDay: string) {
  const days = (recur.parts.BYDAY as string[] | undefined)?.map((d) => d.slice(-2))
  const names = days?.length
    ? days.map((d) => ({ SU: 'Sunday', MO: 'Monday', TU: 'Tuesday', WE: 'Wednesday', TH: 'Thursday', FR: 'Friday', SA: 'Saturday' })[d] ?? d)
    : [weekdayFormat.format(new Date(`${firstDay}T00:00:00Z`))]
  const list = names.map((n) => `${n}s`).join(' and ')
  if (recur.freq === 'WEEKLY') return (recur.interval ?? 1) === 2 ? `Every other ${names.join(' and ')}` : `Weekly on ${list}`
  if (recur.freq === 'DAILY') return 'Daily'
  if (recur.freq === 'MONTHLY') return 'Monthly'
  return 'Repeats'
}

type Parsed = { events: ClubEvent[]; ics: Map<string, string>; builtOn: string }
let cache: Promise<Parsed> | undefined

export function getCalendar() {
  cache ??= load()
  return cache
}

async function load(): Promise<Parsed> {
  const file = path.join(process.cwd(), 'content', 'events', 'calendar.ics')
  const root = new ICAL.Component(ICAL.parse(await fs.promises.readFile(file, 'utf8')))

  const timezones = root.getAllSubcomponents('vtimezone')
  for (const tz of timezones) ICAL.TimezoneService.register(tz)

  // Google stores a repeating event plus one extra VEVENT per edited occurrence, all sharing a UID.
  const byUid = new Map<string, ICAL.Component[]>()
  for (const vevent of root.getAllSubcomponents('vevent')) {
    const uid = String(vevent.getFirstPropertyValue('uid'))
    byUid.set(uid, [...(byUid.get(uid) ?? []), vevent])
  }

  const today = dayFormat.format(new Date())
  const horizon = addDays(today, horizonDays)
  const events: ClubEvent[] = []
  const ics = new Map<string, string>()
  const usedIds = new Set<string>()

  for (const components of byUid.values()) {
    const master = components.find((c) => !c.hasProperty('recurrence-id')) ?? components[0]
    if (String(master.getFirstPropertyValue('status') ?? '').toUpperCase() === 'CANCELLED') continue
    const event = new ICAL.Event(master)
    for (const exception of components) if (exception !== master) event.relateException(exception)

    const title = (event.summary ?? '').trim() || 'Untitled event'
    const description = parseDescription(event.description ?? '')
    const start = event.startDate
    const end = event.endDate ?? start
    const allDay = start.isDate

    let date = pacificDay(start)
    let endDate: string | undefined = allDay ? addDays(end.toString().slice(0, 10), -1) : dayFormat.format(new Date(end.toJSDate().getTime() - 1))
    let recurrence: ClubEvent['recurrence']
    let recurLine: string | undefined

    if (event.isRecurring()) {
      const recur = master.getFirstPropertyValue('rrule') as ICAL.Recur
      const dates: string[] = []
      const iterator = event.iterator()
      for (let next = iterator.next(); next && dates.length < 400; next = iterator.next()) {
        const day = pacificDay(event.getOccurrenceDetails(next).startDate)
        if (day > horizon) break
        dates.push(day)
      }
      if (dates.length === 0) continue
      const ongoing = !recur.until && !recur.count
      date = dates[0]
      endDate = ongoing ? undefined : dates.at(-1)
      recurrence = { label: recurrenceLabel(recur, dates[0]), dates, ongoing }
      recurLine = `RRULE:${recur.toString()}`
    }
    if (endDate && endDate <= date) endDate = undefined

    const rawLocation = (event.location ?? '').trim()
    const mapUrl = description.urls.find(isMapLink)
      ?? (rawLocation.includes(',') ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawLocation)}` : undefined)
    const location = rawLocation ? { name: rawLocation.split(',')[0].trim(), mapUrl } : undefined

    const otherUrls = description.urls.filter((url) => !isMapLink(url) && !isOnlineLink(url))
    const primary = otherUrls.find(isRsvpLink) ?? otherUrls[0]
    const links: ClubEvent['links'] = []
    if (primary) links.push({ href: primary, label: description.mentionsRsvp || isRsvpLink(primary) ? 'RSVP' : 'Details' })
    const online = description.urls.find(isOnlineLink)
    if (online) links.push({ href: online, label: 'Join online' })

    const extra = eventExtras.find((x) => normalizeTitle(x.title) === normalizeTitle(title) && (!x.date || x.date === date))
    if (extra?.hidden) continue

    let id = `${slugify(title)}-${date}`
    for (let n = 2; usedIds.has(id); n++) id = `${slugify(title)}-${date}-${n}`
    usedIds.add(id)

    const google = new URL('https://calendar.google.com/calendar/render')
    google.searchParams.set('action', 'TEMPLATE')
    google.searchParams.set('text', title)
    google.searchParams.set('dates', `${googleStamp(start)}/${googleStamp(end)}`)
    google.searchParams.set('ctz', zone)
    if (rawLocation) google.searchParams.set('location', rawLocation)
    const details = [description.summary, ...links.map((l) => `${l.label}: ${l.href}`)].filter(Boolean).join('\n\n')
    if (details) google.searchParams.set('details', details)
    if (recurLine) google.searchParams.set('recur', recurLine)

    // A one-event calendar file for Apple Calendar / Outlook, served at /events/ics/<id>.ics.
    const single = new ICAL.Component(['vcalendar', [], []])
    single.updatePropertyWithValue('prodid', '-//AI Safety Collective at Irvine//Events//EN')
    single.updatePropertyWithValue('version', '2.0')
    single.updatePropertyWithValue('calscale', 'GREGORIAN')
    single.updatePropertyWithValue('method', 'PUBLISH')
    for (const c of [...timezones, ...components]) {
      const copy = new ICAL.Component(structuredClone(c.jCal))
      // The saved copy drops Google's DTSTAMP (see scripts/sync-calendar.mjs), but calendar apps expect one.
      if (copy.name === 'vevent') copy.updatePropertyWithValue('dtstamp', ICAL.Time.now())
      single.addSubcomponent(copy)
    }
    ics.set(id, single.toString())

    events.push({
      id,
      title,
      category: extra?.category ?? categoryOf(title, description.tags),
      date,
      ...(endDate ? { endDate } : {}),
      ...(allDay ? {} : { time: timeRange(start.toJSDate(), end.toJSDate()) }),
      ...(location ? { location } : {}),
      ...(description.summary ? { summary: description.summary } : {}),
      links,
      ...(recurrence ? { recurrence } : {}),
      addToCalendar: { google: google.toString(), ics: `/events/ics/${id}.ics` },
      ...(extra?.image ? { image: extra.image } : {}),
      ...(extra?.attendance ? { attendance: extra.attendance } : {}),
      ...(extra?.highlight ? { highlight: true } : {}),
    })
  }

  for (const extra of eventExtras) {
    const matched = events.some((e) => normalizeTitle(e.title) === normalizeTitle(extra.title) && (!extra.date || extra.date === e.date))
    if (!matched && !extra.hidden) console.warn(`[events] app/data/eventExtras.ts: no calendar event titled "${extra.title}"${extra.date ? ` on ${extra.date}` : ''}. Was it renamed?`)
  }

  events.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title))
  return { events, ics, builtOn: today }
}
