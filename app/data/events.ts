import { meeting, memberMeeting } from './links'
import { programsByKey } from './programs'

// Source of truth for /events. Add an entry here and redeploy; the page sorts entries into
// Upcoming / Past by date in the visitor's browser, so nothing needs to move once an event ends.

export const eventCategories = ['Programs', 'Talks', 'Workshops', 'Socials', 'Tabling', 'Deadlines'] as const
export type EventCategory = (typeof eventCategories)[number]

// Badge colors — the only extra colors the design system allows beyond the brand palette.
export const eventCategoryColors: Record<EventCategory, string> = {
  Programs: 'bg-indigo-100 text-indigo-700',
  Talks: 'bg-sky-100 text-sky-700',
  Workshops: 'bg-violet-100 text-violet-700',
  Socials: 'bg-emerald-100 text-emerald-800',
  Tabling: 'bg-orange-100 text-orange-800',
  Deadlines: 'bg-amber-100 text-amber-800',
}

export type ClubEvent = {
  title: string
  category: EventCategory
  /** YYYY-MM-DD in Pacific time. Leave out while the date is still TBD. */
  date?: string
  /** YYYY-MM-DD for multi-day events. */
  endDate?: string
  /** e.g. '5–7 PM'. Leave out for "Time TBD". */
  time?: string
  /** UCI quarter, e.g. 'Fall 2026'. Worked out from `date` when there is one; required when there isn't. */
  quarter?: string
  location?: { name: string; mapUrl?: string }
  summary: string
  link?: { href: string; label: string }
  image?: { src: string; alt: string; credit?: string }
  /** Past events only: headcount, shown on the highlight cards. */
  attendance?: number
  /** Past events only: feature in "Past event highlights". */
  highlight?: boolean
}

export const events: ClubEvent[] = [
  {
    title: 'Intro Fellowship applications due',
    category: 'Deadlines',
    date: programsByKey.intro.applicationDeadline!.date,
    summary: 'Last day to apply for the Fall 2026 Intro Fellowship, our 8-week technical AI safety reading group. No background in AI safety needed.',
    link: { href: programsByKey.intro.applyHref, label: 'Apply now' },
  },
  {
    title: 'Intro Fellowship, Fall 2026',
    category: 'Programs',
    quarter: 'Fall 2026',
    time: `${meeting.day}, ${meeting.time}`,
    location: { name: meeting.room, mapUrl: meeting.mapUrl },
    summary: 'Eight weeks of readings and discussion on how modern AI systems work and what could go wrong. No work outside weekly meetings.',
    link: { href: '/tif', label: 'See the curriculum' },
  },

]

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

export function formatDateRange(event: ClubEvent) {
  if (!event.date) return null
  if (!event.endDate || event.endDate === event.date) return formatMonthDay(event.date)
  const [start, end] = [utc(event.date), utc(event.endDate)]
  return start.getUTCMonth() === end.getUTCMonth()
    ? `${formatMonthDay(event.date)}–${end.getUTCDate()}`
    : `${formatMonthDay(event.date)}–${formatMonthDay(event.endDate)}`
}

// UCI's academic calendar: Winter Jan–Mar, Spring Apr–Jun, Summer Jul–Aug, Fall Sep–Dec.
export function quarterOf(event: ClubEvent) {
  if (event.quarter) return event.quarter
  const [year, month] = event.date!.split('-').map(Number)
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

/** Undated events stay upcoming until someone gives them a date. */
export function isUpcoming(event: ClubEvent, today: string) {
  const last = event.endDate ?? event.date
  return !last || last >= today
}
