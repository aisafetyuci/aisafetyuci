'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { clubCalendar } from '../data/links'
import {
  eventCategories,
  eventCategoryColors,
  formatLongDate,
  formatMonthDay,
  formatRange,
  isUpcoming,
  nextMeeting,
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

const byDate = (a: ClubEvent, b: ClubEvent) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title)
const lastDay = (e: ClubEvent) => e.endDate ?? e.recurrence?.dates.at(-1) ?? e.date

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

  const usedCategories = eventCategories.filter((c) => events.some((e) => e.category === c))
  const shown = useMemo(() => events.filter((e) => category === 'all' || e.category === category), [events, category])
  const upcoming = shown.filter((e) => isUpcoming(e, today))
  const past = shown.filter((e) => !isUpcoming(e, today)).sort((a, b) => lastDay(b).localeCompare(lastDay(a)))

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
            {usedCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <SubscribeMenu />
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
        {view === 'upcoming' && <UpcomingView events={upcoming} today={today} />}
        {view === 'past' && <PastView events={past} filtered={category !== 'all'} />}
        {view === 'timeline' && <TimelineView events={shown} today={today} />}
      </div>

      <p className="mt-16 border-t border-brand-border pt-6 text-sm text-gray-500">
        Synced from our{' '}
        <a href={clubCalendar.google} target="_blank" rel="noopener noreferrer" className="underline decoration-brand-border underline-offset-2 hover:text-brand">
          Google Calendar
        </a>
        . Changes there show up here within a few hours.
      </p>
    </>
  )
}

function UpcomingView({ events, today }: { events: ClubEvent[]; today: string }) {
  const oneOffs = events.filter((e) => !e.recurrence).sort(byDate)
  const series = events
    .filter((e) => e.recurrence)
    .sort((a, b) => (nextMeeting(a, today) ?? a.date).localeCompare(nextMeeting(b, today) ?? b.date))
  return (
    <>
      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className="text-3xl font-semibold text-brand">Upcoming events</h2>
        <p className="mt-1 text-sm text-gray-500">Times in Pacific Time</p>
        {oneOffs.length === 0 ? (
          <Empty>Nothing new on the calendar yet. Subscribe above, or join the mailing list, to hear when something is.</Empty>
        ) : (
          <ol className="relative mt-8 before:absolute before:bottom-8 before:left-[5px] before:top-2 before:w-px before:bg-brand-border">
            {oneOffs.map((event) => <TimelineItem key={event.id} event={event} />)}
          </ol>
        )}
      </section>

      {series.length > 0 && (
        <section aria-labelledby="weekly-heading" className="mt-16">
          <h2 id="weekly-heading" className="text-2xl font-semibold text-brand">Weekly</h2>
          <p className="mt-1 text-gray-500">Regular meetings this quarter. Drop in to any of them.</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {series.map((event) => <SeriesCard key={event.id} event={event} today={today} />)}
          </ul>
        </section>
      )}
    </>
  )
}

function TimelineItem({ event }: { event: ClubEvent }) {
  return (
    <li className="relative grid grid-cols-1 gap-x-6 gap-y-2 border-b border-brand-border/70 pb-8 pl-8 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)] md:grid-cols-[7rem_minmax(0,1fr)_10rem] [&+li]:pt-8">
      <p className="relative text-sm font-semibold text-brand-accent">
        <span aria-hidden="true" className="absolute -left-8 top-1 h-[11px] w-[11px] rounded-full border-2 border-brand-accent bg-brand-wash" />
        <time dateTime={event.date}>{formatRange(event.date, event.endDate)}</time>
        <span className="block font-normal text-gray-500">{event.time ?? (event.category === 'Deadlines' ? 'End of day' : 'All day')}</span>
      </p>
      <div className="min-w-0">
        <Badge category={event.category} />
        <h3 className="mt-2 text-xl font-semibold leading-snug text-brand">{event.title}</h3>
        <Location event={event} />
        {event.summary && <p className="mt-2 line-clamp-4 leading-relaxed text-gray-600">{event.summary}</p>}
        <Actions event={event} />
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

function SeriesCard({ event, today }: { event: ClubEvent; today: string }) {
  const next = nextMeeting(event, today)
  const started = event.date < today
  return (
    <li className="surface-card flex flex-col p-6">
      <div><Badge category={event.category} /></div>
      <h3 className="mt-2 text-xl font-semibold leading-snug text-brand">{event.title}</h3>
      <p className="mt-2 text-sm font-medium text-brand-accent">
        {event.recurrence!.label}
        {event.time && <>, {event.time}</>}
      </p>
      <Location event={event} />
      <p className="mt-2 text-sm text-gray-600">
        {next && <>{started ? 'Next' : 'Starts'}: {formatMonthDay(next)}</>}
        {event.endDate && <>{next ? ' · ' : ''}through {formatMonthDay(event.endDate)}</>}
      </p>
      {event.summary && <p className="mt-2 line-clamp-3 leading-relaxed text-gray-600">{event.summary}</p>}
      <div className="mt-auto"><Actions event={event} /></div>
    </li>
  )
}

function PastView({ events, filtered }: { events: ClubEvent[]; filtered: boolean }) {
  const highlights = events.filter((e) => e.highlight && e.image).slice(0, 4)
  const byYear = groupBy(events, (e) => lastDay(e).slice(0, 4))
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
              <li key={event.id} className="surface-card overflow-hidden">
                <div className="relative aspect-[4/3] bg-brand-soft">
                  <Image src={event.image!.src} alt={event.image!.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500"><time dateTime={event.date}>{formatLongDate(event.date)}</time></p>
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
              <li key={event.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <time dateTime={event.date} className="w-32 shrink-0 text-sm font-semibold text-brand-accent">
                  {formatRange(event.date, lastDay(event))}
                </time>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-brand">{event.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {[event.recurrence?.label, event.location?.name].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <div className="shrink-0"><Badge category={event.category} /></div>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </section>
  )
}

function TimelineView({ events, today }: { events: ClubEvent[]; today: string }) {
  const quarters = groupBy([...events].sort(byDate), (e) => quarterOf(e.date)).sort(([a], [b]) => quarterRank(b) - quarterRank(a))
  return (
    <section aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="text-3xl font-semibold text-brand">By quarter</h2>
      <p className="mt-1 text-gray-500">Everything on our calendar, by UCI quarter.</p>
      {events.length === 0 && <Empty>No events in this category.</Empty>}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {quarters.map(([quarter, items]) => (
          <div key={quarter} className="surface-card p-6">
            <h3 className="text-xl font-semibold text-brand">{quarter}</h3>
            <ul className="mt-4 space-y-3">
              {items.map((event) => {
                const done = !isUpcoming(event, today)
                return (
                  <li key={event.id} className="flex items-baseline gap-4 text-sm">
                    <span className={`w-16 shrink-0 font-semibold ${done ? 'text-gray-400' : 'text-brand-accent'}`}>
                      {event.recurrence ? 'Weekly' : formatRange(event.date, event.endDate)}
                    </span>
                    <span className={`min-w-0 flex-1 ${done ? 'text-gray-500' : 'font-medium text-brand'}`}>{event.title}</span>
                    <Badge category={event.category} />
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

function Badge({ category }: { category: EventCategory }) {
  return <span className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${eventCategoryColors[category]}`}>{category}</span>
}

function Location({ event }: { event: ClubEvent }) {
  if (!event.location) return null
  const { name, mapUrl } = event.location
  return (
    <p className="mt-1 text-sm text-gray-500">
      {mapUrl ? (
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} on a map (opens in a new tab)`} className="underline decoration-brand-border underline-offset-2 hover:text-brand">
          {name}
        </a>
      ) : name}
    </p>
  )
}

function Actions({ event }: { event: ClubEvent }) {
  if (event.links.length === 0) return null
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
      {event.links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-accent">
          {link.label} ↗
        </a>
      ))}
    </div>
  )
}

function SubscribeMenu() {
  const [copied, setCopied] = useState(false)
  return (
    <Menu label="Subscribe to our calendar">
      <p className="px-3 pb-2 pt-1 text-xs font-normal text-gray-500">New events show up in your calendar automatically.</p>
      <MenuLink href={clubCalendar.google} external>Google Calendar</MenuLink>
      <MenuLink href={clubCalendar.apple}>Apple Calendar</MenuLink>
      <MenuLink href={clubCalendar.outlook} external>Outlook</MenuLink>
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(clubCalendar.feed).then(() => setCopied(true))}
        className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-brand hover:bg-brand-soft"
      >
        {copied ? 'Copied!' : 'Copy iCal link'}
      </button>
    </Menu>
  )
}

function Menu({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand shadow-card transition-colors hover:bg-brand-soft"
      >
        {label}
        <span aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="absolute left-0 z-20 mt-2 w-64 rounded-xl border border-brand-border bg-white p-1.5 shadow-card-hover sm:left-auto sm:right-0">
          {children}
        </div>
      )}
    </div>
  )
}

function MenuLink({ href, external = false, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="block rounded-md px-3 py-2 text-sm font-medium text-brand hover:bg-brand-soft"
    >
      {children}
      {external && <span aria-hidden="true"> ↗</span>}
    </a>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="surface-card mt-8 p-8 text-center text-gray-600">{children}</p>
}
