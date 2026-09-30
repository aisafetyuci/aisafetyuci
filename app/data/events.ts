// Shared event types and helpers for /events (safe to import from client components).
// The events themselves come from the club Google Calendar at build time: see app/lib/events.ts.
// Photos, headcounts and category fixes are added in app/data/eventExtras.ts.

export const eventCategories = ['Programs', 'Talks', 'Workshops', 'Socials', 'Co-working', 'Tabling', 'Deadlines', 'Other'] as const
export type EventCategory = (typeof eventCategories)[number]

// Badge colors — the only extra colors the design system allows beyond the brand palette.
export const eventCategoryColors: Record<EventCategory, string> = {
  Programs: 'bg-indigo-100 text-indigo-700',
  Talks: 'bg-sky-100 text-sky-700',
  Workshops: 'bg-violet-100 text-violet-700',
  Socials: 'bg-emerald-100 text-emerald-800',
  'Co-working': 'bg-teal-100 text-teal-800',
  Tabling: 'bg-orange-100 text-orange-800',
  Deadlines: 'bg-amber-100 text-amber-800',
  Other: 'bg-gray-100 text-gray-600',
}

export type ClubEvent = {
  id: string
  title: string
  category: EventCategory
  /** YYYY-MM-DD in Pacific time. For a repeating event, the first meeting. */
  date: string
  /** YYYY-MM-DD, when the event (or a repeating event's last meeting) is on a later day. */
  endDate?: string
  /** e.g. '5–7 PM'. Missing for all-day events such as deadlines. */
  time?: string
  location?: { name: string; mapUrl?: string }
  summary?: string
  links: { href: string; label: string }[]
  /** Repeating events (fellowship sections, weekly meetings) are one entry, not one per week. */
  recurrence?: {
    label: string // e.g. 'Weekly on Thursdays'
    dates: string[] // every meeting date, YYYY-MM-DD (open-ended series: the next year)
    ongoing: boolean // no end date set in the calendar
  }
  image?: { src: string; alt: string; credit?: string }
  /** Past events: headcount, shown on the highlight cards. */
  attendance?: number
  /** Past events: feature in the highlight cards at the top of the Past tab. */
  highlight?: boolean
}

const monthDay = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
const longDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

function utc(date: string) {
  return new Date(`${date}T00:00:00Z`)
}

export function formatMonthDay(date: string) {
  return monthDay.format(utc(date))
}

export function formatLongDate(date: string) {
  return longDate.format(utc(date))
}

export function formatRange(start: string, end?: string) {
  if (!end || end === start) return formatMonthDay(start)
  const [a, b] = [utc(start), utc(end)]
  return a.getUTCMonth() === b.getUTCMonth()
    ? `${formatMonthDay(start)}–${b.getUTCDate()}`
    : `${formatMonthDay(start)} – ${formatMonthDay(end)}`
}

// UCI's academic calendar: Winter Jan–Mar, Spring Apr–Jun, Summer Jul–Aug, Fall Sep–Dec.
export function quarterOf(date: string) {
  const [year, month] = date.split('-').map(Number)
  const season = month <= 3 ? 'Winter' : month <= 6 ? 'Spring' : month <= 8 ? 'Summer' : 'Fall'
  return `${season} ${year}`
}

// Sort key for quarters, so 'Winter 2027' comes after 'Fall 2026'.
export function quarterRank(quarter: string) {
  const [season, year] = quarter.split(' ')
  return Number(year) * 10 + ['Winter', 'Spring', 'Summer', 'Fall'].indexOf(season)
}

/** Today's date (YYYY-MM-DD) on the UCI campus clock. */
export function todayInIrvine(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(now)
}

/** A repeating event's next meeting on or after `today`. */
export function nextMeeting(event: ClubEvent, today: string) {
  return event.recurrence?.dates.find((date) => date >= today)
}

export function isUpcoming(event: ClubEvent, today: string) {
  if (event.recurrence) return event.recurrence.ongoing || nextMeeting(event, today) !== undefined
  return (event.endDate ?? event.date) >= today
}
