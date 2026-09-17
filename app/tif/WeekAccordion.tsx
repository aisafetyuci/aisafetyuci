'use client'

import { useEffect, useRef, useState } from 'react'
import { weeks, type Reading } from './data'

function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`h-5 w-5 shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ReadingList({ readings }: { readings: Reading[] }) {
  return (
    <ul className="divide-y divide-brand-border">
      {readings.map((reading) => (
        <li key={reading.url}>
          <a href={reading.url} target="_blank" rel="noopener noreferrer" className="group/reading -mx-3 flex items-start gap-4 rounded-lg px-3 py-4 transition-colors hover:bg-brand-wash">
            <div className="min-w-0 flex-1">
              <span className="block text-base font-medium leading-relaxed text-brand group-hover/reading:underline group-hover/reading:underline-offset-4">{reading.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-gray-500">{reading.author}{reading.year ? ` · ${reading.year}` : ''}</span>
            </div>
            <span className="mt-1 hidden rounded-md bg-brand-soft px-2 py-1 text-xs capitalize text-brand-accent sm:inline-block">{reading.type}</span>
            <span aria-hidden="true" className="mt-0.5 text-xl text-brand-muted transition-colors group-hover/reading:text-brand">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function ExtraReadings({ label, readings }: { label: string; readings?: Reading[] }) {
  if (!readings?.length) return null
  return (
    <details className="group/readings border-t border-brand-border">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-5 text-brand [&::-webkit-details-marker]:hidden">
        <h4 className="text-base font-semibold">{label}</h4>
        <span className="text-sm text-gray-500">{readings.length}</span>
        <Chevron className="ml-auto text-brand-muted transition-transform group-open/readings:rotate-180" />
      </summary>
      <div className="pb-5"><ReadingList readings={readings} /></div>
    </details>
  )
}

export default function WeekAccordion() {
  const [activeWeek, setActiveWeek] = useState(1)
  const sections = useRef(new Map<number, HTMLDetailsElement>())

  function openWeek(number: number) {
    const section = sections.current.get(number)
    if (!section) return
    section.open = true
    setActiveWeek(number)
  }

  useEffect(() => {
    let frame = 0
    function openFromHash() {
      const match = window.location.hash.match(/^#week-(\d+)$/)
      if (!match) return
      const number = Number(match[1])
      const section = sections.current.get(number)
      if (!section) return
      section.open = true
      setActiveWeek(number)
      // Wait until hydration and the router's initial scroll restoration finish.
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => section.scrollIntoView({ block: 'start' }))
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', openFromHash)
    }
  }, [])

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-24">
        <label htmlFor="fellowship-week" className="mb-3 block text-sm font-semibold text-brand lg:hidden">Jump to a week</label>
        <select id="fellowship-week" value={activeWeek} onChange={(event) => {
          const number = Number(event.target.value)
          openWeek(number)
          window.location.hash = `week-${number}`
        }} className="w-full rounded-lg border border-brand-border bg-white p-3 text-base sm:text-sm text-brand lg:hidden">
          {weeks.map((week) => <option key={week.number} value={week.number} disabled={week.comingSoon}>{week.label}: {week.title}{week.comingSoon ? ' — Coming soon' : ''}</option>)}
        </select>
        <nav aria-label="Fellowship weeks" className="hidden max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 lg:block">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">On this page</p>
          <ul className="space-y-1">
            {weeks.map((week) => (
              <li key={week.number}>
                <a href={`#week-${week.number}`} onClick={() => openWeek(week.number)} aria-current={activeWeek === week.number ? 'location' : undefined} className={`block rounded-lg border-l-2 px-3 py-3 transition-colors ${activeWeek === week.number ? 'border-brand bg-brand-soft text-brand' : 'border-transparent text-gray-600 hover:bg-white hover:text-brand'}`}>
                  <span className="mb-1 block text-xs font-medium text-brand-accent">{week.label}{week.comingSoon ? ' · Coming soon' : ''}</span>
                  <span className="block text-sm font-medium leading-snug">{week.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0 space-y-4">
        {weeks.map((week) => {
          const readingCount = (week.core?.length ?? 0) + (week.recommended?.length ?? 0) + (week.further?.length ?? 0)
          if (week.comingSoon) {
            return (
              <section key={week.number} id={`week-${week.number}`} className="surface-card scroll-mt-24 p-6 sm:p-8">
                <p className="mb-2 text-sm font-medium text-brand-accent">{week.label} · Coming soon</p>
                <h3 className="text-xl font-semibold text-brand">{week.title}</h3>
              </section>
            )
          }
          return (
            <details key={week.number} id={`week-${week.number}`} open={week.number === 1} ref={(element) => {
              if (element) sections.current.set(week.number, element)
              else sections.current.delete(week.number)
            }} onToggle={(event) => {
              if (event.currentTarget.open) setActiveWeek(week.number)
            }} className="group/week surface-card scroll-mt-24 overflow-hidden open:border-brand-muted">
              <summary className="flex cursor-pointer list-none items-center gap-3 p-4 sm:gap-5 transition-colors hover:bg-brand-wash sm:p-8 [&::-webkit-details-marker]:hidden">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                    <span className="font-semibold text-brand-accent">{week.label}</span>
                    <span aria-hidden="true" className="text-brand-border">/</span>
                    <span className="text-gray-500">{readingCount} {readingCount === 1 ? 'resource' : 'resources'}</span>
                  </div>
                  <h3 className="text-xl font-semibold leading-snug text-brand sm:text-2xl">{week.title}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-accent">
                  <Chevron className="transition-transform group-open/week:rotate-180" />
                </span>
              </summary>
              <div className="border-t border-brand-border px-4 pb-2 pt-4 sm:px-8 sm:pt-8">
                {!!week.objectives?.length && (
                  <section aria-labelledby={`objectives-${week.number}`} className="mb-8 rounded-xl bg-brand-wash p-4 sm:p-6">
                    <h4 id={`objectives-${week.number}`} className="mb-3 text-sm font-semibold text-brand">Learning objectives</h4>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 marker:text-brand-muted">
                      {week.objectives.map((objective) => <li key={objective}>{objective}</li>)}
                    </ul>
                  </section>
                )}
                {!!week.core?.length && (
                  <section aria-labelledby={`core-${week.number}`} className="mb-6">
                    <div className="mb-1 flex items-baseline gap-3">
                      <h4 id={`core-${week.number}`} className="text-lg font-semibold text-brand">Core readings</h4>
                      <span className="text-sm text-gray-500">{week.core.length}</span>
                    </div>
                    <ReadingList readings={week.core} />
                  </section>
                )}
                <ExtraReadings label="Recommended" readings={week.recommended} />
                <ExtraReadings label="Further reading" readings={week.further} />
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}
