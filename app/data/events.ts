import { meeting, memberMeeting } from './links'
import { programsByKey } from './programs'

// Source of truth for /events. Add an entry here and redeploy; the page sorts entries into
// Upcoming / Past by date in the visitor's browser, so nothing needs to move once an event ends.
//
// PROOF OF CONCEPT: entries marked `sample: true` are placeholders to show the layout,
// not real AISCI events. Replace or delete them before shipping.

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
  sample?: boolean
}

export const events: ClubEvent[] = [
  // ——— Upcoming ———
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
  {
    title: 'Anteater Involvement Fair',
    category: 'Tabling',
    date: '2026-10-01',
    time: '11 AM–3 PM',
    location: { name: 'Ring Road' },
    summary: 'Come find our table, meet the board, and ask anything about AI safety or getting involved.',
    sample: true,
  },
  {
    title: 'Fall kickoff & info session',
    category: 'Socials',
    date: '2026-10-08',
    time: '6–7:30 PM',
    location: { name: memberMeeting.room, mapUrl: memberMeeting.mapUrl },
    summary: 'Meet the club, hear what we are running this quarter, and stay for food. Open to everyone.',
    sample: true,
  },
  {
    title: 'Talk: Evaluating dangerous capabilities in frontier models',
    category: 'Talks',
    date: '2026-10-22',
    time: '5–6:30 PM',
    location: { name: memberMeeting.room, mapUrl: memberMeeting.mapUrl },
    summary: 'A researcher walks through how labs test models for risky capabilities, and where current evaluations fall short. Q&A after.',
    image: { src: '/images/community/discussion.webp', alt: 'Students listening to a presentation and discussion in a classroom' },
    sample: true,
  },
  {
    title: 'Mechanistic interpretability workshop',
    category: 'Workshops',
    date: '2026-11-07',
    time: '1–5 PM',
    location: { name: 'DBH 6011' },
    summary: 'A hands-on afternoon poking at the internals of a small transformer. Bring a laptop; we provide notebooks and GPUs.',
    sample: true,
  },
  {
    title: 'AI safety research hackathon',
    category: 'Workshops',
    quarter: 'Winter 2027',
    summary: 'A weekend of small-team projects on evaluations, interpretability, and governance, with mentors on hand. Date and details TBD.',
    sample: true,
  },

  // ——— Past ———
  {
    title: 'Movie night: AI safety documentary screening',
    category: 'Socials',
    date: '2026-05-21',
    time: '7–9 PM',
    summary: 'We watched and discussed a documentary on the race to build advanced AI.',
    image: { src: '/images/community/screening.webp', alt: 'Students watching an AI safety video together in a classroom' },
    attendance: 45,
    highlight: true,
    sample: true,
  },
  {
    title: 'Spring picnic',
    category: 'Socials',
    date: '2026-05-09',
    summary: 'End-of-year picnic for fellows and members.',
    image: { src: '/images/community/picnic.webp', alt: 'Students sharing a picnic on a sunny campus lawn' },
    attendance: 30,
    highlight: true,
    sample: true,
  },
  {
    title: 'Winter bonfire',
    category: 'Socials',
    date: '2026-02-13',
    summary: 'An evening at the fire pits to close out the Winter fellowship cohort.',
    image: { src: '/images/community/bonfire.webp', alt: 'Students gathered around a bonfire in the evening' },
    attendance: 25,
    highlight: true,
    sample: true,
  },
  {
    title: 'Member meeting: AI 2027 discussion',
    category: 'Talks',
    date: '2026-01-29',
    location: { name: memberMeeting.room, mapUrl: memberMeeting.mapUrl },
    summary: 'Members debated which parts of the AI 2027 scenario hold up.',
    image: { src: '/images/community/meeting.webp', alt: 'A room of students taking part in an AISCI meeting' },
    attendance: 40,
    highlight: true,
    sample: true,
  },
  {
    title: 'Winter Intro Fellowship applications due',
    category: 'Deadlines',
    date: '2026-01-09',
    summary: 'Applications closed for the Winter 2026 cohort.',
    sample: true,
  },
  {
    title: 'Fall 2025 kickoff',
    category: 'Socials',
    date: '2025-10-09',
    summary: 'Our first general meeting of the 2025–26 year.',
    image: { src: '/images/community/group.webp', alt: 'AISCI members posing together at the front of a classroom' },
    sample: true,
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
