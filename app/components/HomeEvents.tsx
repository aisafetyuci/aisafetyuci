'use client'

import { useEffect, useState } from 'react'
import { clubCalendar } from '../data/links'
import { eventCategoryColors, formatMonthDay, isUpcoming, nextMeeting, todayInIrvine, type ClubEvent } from '../data/events'

const monthName = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })

// Homepage "Coming up": the next three one-off events plus the weekly meetings, from the same
// calendar data as /events. The site only rebuilds when the calendar changes, so the browser
// re-checks today's date to drop events that have already happened.
export default function HomeEvents({ events, buildDay }: { events: ClubEvent[]; buildDay: string }) {
  const [today, setToday] = useState(buildDay)
  useEffect(() => setToday(todayInIrvine()), [])

  const upcoming = events.filter((e) => isUpcoming(e, today))
  const next = upcoming.filter((e) => !e.recurrence).slice(0, 3)
  const weekly = upcoming
    .filter((e) => e.recurrence)
    .sort((a, b) => weekdayOf(nextMeeting(a, today) ?? a.date) - weekdayOf(nextMeeting(b, today) ?? b.date))

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-8">
      {next.length > 0 ? (
        <ul className="grid content-start gap-3">
          {next.map((event) => (
            <li key={event.id} className="surface-card grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-5 px-5 py-4">
              <p className="flex h-[4.25rem] w-16 flex-col items-center justify-center rounded-xl bg-brand-soft leading-none text-brand">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{monthName.format(new Date(`${event.date}T00:00:00Z`))}</span>
                <span className="mt-1 text-2xl font-semibold tabular-nums">{Number(event.date.slice(8))}</span>
              </p>
              <div className="min-w-0">
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${eventCategoryColors[event.category]}`}>{event.category}</span>
                <h3 className="mt-1 text-lg font-semibold leading-snug text-brand">{event.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {[event.time ?? (event.category === 'Deadlines' ? 'End of day' : 'All day'), event.location?.name].filter(Boolean).join(' · ')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="surface-card p-8 text-center text-gray-600">
          Nothing new on the calendar yet. Subscribe to our calendar or join the mailing list to hear when something is.
        </p>
      )}

      {weekly.length > 0 && (
        <aside aria-labelledby="weekly-heading" className="surface-card flex flex-col p-6">
          <h3 id="weekly-heading" className="text-lg font-semibold text-brand">Every week</h3>
          <ul className="mt-3 divide-y divide-brand-border">
            {weekly.map((event) => {
              const upcomingStart = event.date > today
              return (
                <li key={event.id} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 py-3.5 first:pt-1">
                  <span className="text-sm font-semibold text-brand-accent">{event.recurrence!.label.replace(/^Weekly on /, '')}</span>
                  <span>
                    <span className="block font-semibold leading-snug text-brand">{event.title}</span>
                    <span className="text-sm text-gray-500">
                      {[event.time, event.location?.name, upcomingStart ? `from ${formatMonthDay(event.date)}` : undefined].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
          <div className="mt-auto pt-3">
            <a
              href={clubCalendar.google}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to our calendar in Google Calendar (opens in a new tab)"
              className="button-secondary w-full"
            >
              Subscribe to our calendar
            </a>
          </div>
        </aside>
      )}
    </div>
  )
}

function weekdayOf(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCDay()
}
