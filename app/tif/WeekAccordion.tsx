import Link from 'next/link'
import { weeks, type Week } from './data'

function ChevronRight() {
  return (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function WeekCard({ week }: { week: Week }) {
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
    <Link
      href={`/tif/${week.number}`}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 flex items-center gap-3"
    >
      <span className="inline-flex items-center bg-[#18234e]/10 text-[#18234e] text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">
        {week.label}
      </span>
      <h3 className="text-lg font-semibold text-gray-900 flex-1">{week.title}</h3>
      <ChevronRight />
    </Link>
  )
}

export default function WeekAccordion() {
  return (
    <div className="flex flex-col gap-4">
      {weeks.map((week) => (
        <WeekCard key={week.number} week={week} />
      ))}
    </div>
  )
}
