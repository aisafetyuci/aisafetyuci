'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { links } from '../data/links'
import {
  eventCategories,
  eventCategoryColors,
  formatDateRange,
  formatLongDate,
  isUpcoming,
  quarterOf,
  quarterRank,
  todayInIrvine,
  type ClubEvent,
  type EventCategory,
} from '../data/events'

const views = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'timeline', label: 'By quarter' },
] as const
type View = (typeof views)[number]['id']

const byDateAsc = (a: ClubEvent, b: ClubEvent) =>
  (a.date ?? '9999').localeCompare(b.date ?? '9999') || quarterRank(quarterOf(a)) - quarterRank(quarterOf(b))
const byDateDesc = (a: ClubEvent, b: ClubEvent) => byDateAsc(b, a)

function groupBy<T>(items: T[], key: (item: T) => string) {
  const groups = new Map<string, T[]>()
  for (const item of items) groups.set(key(item), [...(groups.get(key(item)) ?? []), item])
  return [...groups.entries()]
}

export default function EventsBrowser({ events, buildDay }: { events: ClubEvent[]; buildDay: string }) {
  const [today, setToday] = useState(buildDay)
  const [view, setView] = useState<View>('upcoming')
  const [category, setCategory] = useState<EventCategory | 'all'>('all')

  // Re-sort against the real date, and open the tab named in the URL (#past, #timeline).
  useEffect(() => {
    setToday(todayInIrvine())
    const fromHash = window.location.hash.slice(1)
    if (views.some((v) => v.id === fromHash)) setView(fromHash as View)
  }, [])

  const selectView = (next: View) => {
    setView(next)
    history.replaceState(null, '', next === 'upcoming' ? window.location.pathname : `#${next}`)
  }

  const shown = useMemo(() => events.filter((e) => category === 'all' || e.category === category), [events, category])
  const upcoming = shown.filter((e) => isUpcoming(e, today)).sort(byDateAsc)
  const past = shown.filter((e) => !isUpcoming(e, today)).sort(byDateDesc)

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 text-sm font-medium text-brand">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory | 'all')}
            className="min-h-10 rounded-lg border border-brand-border bg-white px-3 py-2 text-sm text-brand shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent"
          >
            <option value="all">All events &amp; programs</option>
            {eventCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <a
          href={links.googleCalendar}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Add the AISCI calendar to Google Calendar (opens in a new tab)"
          className="text-sm font-semibold text-brand hover:text-brand-accent"
        >
          Add to Google Calendar ↗
        </a>
      </div>

      <div role="tablist" aria-label="Event views" className="mt-6 flex flex-wrap gap-2 border-b border-brand-border">
        {views.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            id={`tab-${id}`}
            aria-selected={view === id}
            aria-controls={`panel-${id}`}
            onClick={() => selectView(id)}
            className={`-mb-px border-b-2 px-3 pb-3 pt-1 text-sm font-medium transition-colors ${view === id ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-brand'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${view}`} aria-labelledby={`tab-${view}`} className="mt-10">
        {view === 'upcoming' && <UpcomingView events={upcoming} />}
        {view === 'past' && <PastView events={past} filtered={category !== 'all'} />}
        {view === 'timeline' && <TimelineView events={shown} today={today} />}
      </div>
    </>
  )
}

function UpcomingView({ events }: { events: ClubEvent[] }) {
  return (
    <section aria-labelledby="upcoming-heading">
      <h2 id="upcoming-heading" className="text-3xl font-semibold text-brand">Upcoming events</h2>
      <p className="mt-1 text-sm text-gray-500">Times in Pacific Time</p>
      {events.length === 0 ? (
        <Empty>Nothing scheduled in this category yet. Join the mailing list to hear when something is.</Empty>
      ) : (
        <ol className="relative mt-8 before:absolute before:bottom-8 before:left-[5px] before:top-2 before:w-px before:bg-brand-border">
          {events.map((event) => <TimelineItem key={event.title} event={event} />)}
        </ol>
      )}
    </section>
  )
}

function TimelineItem({ event }: { event: ClubEvent }) {
  const date = formatDateRange(event)
  return (
    <li className="relative grid grid-cols-1 gap-x-6 gap-y-2 border-b border-brand-border/70 pb-8 pl-8 pt-0 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)] md:grid-cols-[7rem_minmax(0,1fr)_10rem] [&+li]:pt-8">
      <p className="relative text-sm font-semibold text-brand-accent">
        <span aria-hidden="true" className="absolute -left-8 top-1 h-[11px] w-[11px] rounded-full border-2 border-brand-accent bg-brand-wash" />
        {date ? <time dateTime={event.date}>{date}</time> : quarterOf(event)}
        <span className="block font-normal text-gray-500">{event.time ?? (!date ? 'Date TBD' : event.category === 'Deadlines' ? 'End of day' : 'Time TBD')}</span>
      </p>
      <div className="min-w-0">
        <Badges event={event} />
        <h3 className="mt-2 text-xl font-semibold leading-snug text-brand">{event.title}</h3>
        {event.location && (
          <p className="mt-1 text-sm text-gray-500">
            {event.location.mapUrl ? (
              <a href={event.location.mapUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-brand-border underline-offset-2 hover:text-brand">
                {event.location.name}
              </a>
            ) : event.location.name}
          </p>
        )}
        <p className="mt-2 leading-relaxed text-gray-600">{event.summary}</p>
        {event.link && <EventLink link={event.link} />}
      </div>
      {event.image && (
        <figure className="hidden md:block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-brand-border bg-brand-soft">
            <Image src={event.image.src} alt={event.image.alt} fill sizes="160px" className="object-cover" />
          </div>
          {event.image.credit && <figcaption className="mt-1 text-xs text-gray-500">Photo: {event.image.credit}</figcaption>}
        </figure>
      )}
    </li>
  )
}

function PastView({ events, filtered }: { events: ClubEvent[]; filtered: boolean }) {
  const highlights = events.filter((e) => e.highlight).slice(0, 4)
  const byYear = groupBy(events, (e) => e.date!.slice(0, 4))
  return (
    <section aria-labelledby="past-heading">
      <h2 id="past-heading" className="text-3xl font-semibold text-brand">Past events</h2>
      <p className="mt-1 text-gray-500">Previous talks, workshops, and community gatherings.</p>

      {events.length === 0 && <Empty>No past events in this category.</Empty>}

      {highlights.length > 0 && !filtered && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Highlights</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((event) => (
              <li key={event.title} className="surface-card overflow-hidden">
                {event.image && (
                  <div className="relative aspect-[4/3] bg-brand-soft">
                    <Image src={event.image.src} alt={event.image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-sm text-gray-500"><time dateTime={event.date}>{formatLongDate(event.date!)}</time></p>
                  {event.attendance && (
                    <p className="mt-2 text-3xl font-semibold text-brand">
                      {event.attendance}<span className="ml-1 text-sm font-medium text-gray-500">attended</span>
                    </p>
                  )}
                  <p className="mt-2 font-semibold leading-snug text-brand">{event.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {byYear.map(([year, items]) => (
        <details key={year} open={year === byYear[0][0]} className="group mt-8 border-t border-brand-border pt-6">
          <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-brand">
            {year}
            <span className="text-sm font-normal text-gray-500">
              {items.length} {items.length === 1 ? 'event' : 'events'}
              <span aria-hidden="true" className="ml-2 inline-block transition-transform group-open:rotate-180">▾</span>
            </span>
          </summary>
          <ul className="mt-4 divide-y divide-brand-border/70">
            {items.map((event) => (
              <li key={event.title} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <time dateTime={event.date} className="w-28 shrink-0 text-sm font-semibold text-brand-accent">{formatDateRange(event)}</time>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-brand">{event.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{event.summary}</p>
                </div>
                <div className="shrink-0"><Badges event={event} /></div>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </section>
  )
}

function TimelineView({ events, today }: { events: ClubEvent[]; today: string }) {
  const quarters = groupBy([...events].sort(byDateAsc), quarterOf).sort(([a], [b]) => quarterRank(b) - quarterRank(a))
  return (
    <section aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="text-3xl font-semibold text-brand">Quarter timeline</h2>
      <p className="mt-1 text-gray-500">Everything we&apos;ve run or planned, by UCI quarter.</p>
      {events.length === 0 && <Empty>No events in this category.</Empty>}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {quarters.map(([quarter, items]) => (
          <div key={quarter} className="surface-card p-6">
            <h3 className="text-xl font-semibold text-brand">{quarter}</h3>
            <ul className="mt-4 space-y-3">
              {items.map((event) => {
                const done = !isUpcoming(event, today)
                return (
                  <li key={event.title} className="flex items-baseline gap-4 text-sm">
                    <span className={`w-16 shrink-0 font-semibold ${done ? 'text-gray-400' : 'text-brand-accent'}`}>{formatDateRange(event) ?? 'TBD'}</span>
                    <span className={`min-w-0 flex-1 ${done ? 'text-gray-500' : 'font-medium text-brand'}`}>{event.title}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${eventCategoryColors[event.category]}`}>{event.category}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Badges({ event }: { event: ClubEvent }) {
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${eventCategoryColors[event.category]}`}>{event.category}</span>
}

function EventLink({ link }: { link: NonNullable<ClubEvent['link']> }) {
  const className = 'mt-3 inline-block text-sm font-semibold text-brand hover:text-brand-accent'
  if (link.href.startsWith('/')) return <Link href={link.href} className={className}>{link.label} →</Link>
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label} ↗
    </a>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="surface-card mt-8 p-8 text-center text-gray-600">{children}</p>
}
