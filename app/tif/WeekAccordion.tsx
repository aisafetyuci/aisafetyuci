'use client'

import { useState } from 'react'
import { weeks, type Week, type Reading } from './data'

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function ReadingItem({ reading }: { reading: Reading }) {
  return (
    <a
      href={reading.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start justify-between gap-3 py-2 group"
    >
      <div className="min-w-0">
        <span className="text-sm text-[#18234e] group-hover:underline font-medium">
          {reading.title}
        </span>
        <span className="text-xs text-gray-500 ml-2">
          {reading.author}{reading.year ? ` · ${reading.year}` : ''}
        </span>
      </div>
      <ExternalIcon />
    </a>
  )
}

function ReadingTier({
  label,
  dotColor,
  readings,
}: {
  label: string
  dotColor: string
  readings: Reading[]
}) {
  if (readings.length === 0) return null
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </span>
      </div>
      <div className="divide-y divide-gray-100">
        {readings.map((r) => (
          <ReadingItem key={r.url} reading={r} />
        ))}
      </div>
    </div>
  )
}

function WeekCard({ week, open, onToggle }: { week: Week; open: boolean; onToggle: () => void }) {
  if (week.comingSoon) {
    return (
      <div className="bg-gray-50 rounded-lg shadow p-6 opacity-50">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center bg-gray-100 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full">
            {week.label}
          </span>
          <h3 className="text-lg font-semibold text-gray-400">{week.title}</h3>
          <span className="ml-auto text-xs text-gray-400">Coming Soon</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left p-6 flex items-center gap-3"
      >
        <span className="inline-flex items-center bg-[#18234e]/10 text-[#18234e] text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">
          {week.label}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{week.title}</h3>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="px-6 pb-6 pt-0">
          <div className="border-t border-gray-100 pt-5">
            {week.objectives && week.objectives.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Learning Objectives</h4>
                <ul className="space-y-1.5">
                  {week.objectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#18234e] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {week.core && <ReadingTier label="Core Readings" dotColor="bg-[#18234e]" readings={week.core} />}
            {week.recommended && <ReadingTier label="Recommended" dotColor="bg-blue-500" readings={week.recommended} />}
            {week.further && <ReadingTier label="Further Reading" dotColor="bg-gray-400" readings={week.further} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default function WeekAccordion() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  function toggle(weekNum: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(weekNum)) next.delete(weekNum)
      else next.add(weekNum)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {weeks.map((week) => (
        <WeekCard
          key={week.number}
          week={week}
          open={expanded.has(week.number)}
          onToggle={() => toggle(week.number)}
        />
      ))}
    </div>
  )
}
