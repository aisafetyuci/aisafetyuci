import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { weeks, type Reading } from '../data'

export function generateStaticParams() {
  return weeks
    .filter((w) => !w.comingSoon)
    .map((w) => ({ week: String(w.number) }))
}

type Params = { week: string }

function getWeek(weekParam: string) {
  const num = Number(weekParam)
  if (!Number.isFinite(num)) return null
  const week = weeks.find((w) => w.number === num)
  if (!week || week.comingSoon) return null
  return week
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const week = getWeek(params.week)
  if (!week) return {}

  const title = `${week.label}: ${week.title}`
  const description = (week.objectives && week.objectives.join(' ')) ||
    `${week.label} of the Technical Intro Fellowship at AI Safety Collective at Irvine.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | AI Safety Collective at Irvine`,
      description,
      url: `https://aisafetyuci.org/tif/${week.number}`,
      type: 'website',
      images: [],
    },
    twitter: {
      card: 'summary',
      title: `${title} | AI Safety Collective at Irvine`,
      description,
      images: [],
    },
  }
}

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
  readings?: Reading[]
}) {
  if (!readings || readings.length === 0) return null
  return (
    <div className="mb-8 last:mb-0">
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

export default function WeekPage({ params }: { params: Params }) {
  const week = getWeek(params.week)
  if (!week) notFound()

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <Link href="/tif" className="text-sm text-[#18234e] hover:underline mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Technical Intro Fellowship
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center bg-[#18234e]/10 text-[#18234e] text-xs font-semibold px-3 py-1 rounded-full">
              {week.label}
            </span>
          </div>
          <h1 className="text-5xl font-bold text-[#18234e]">{week.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-3xl mx-auto">
          {week.objectives && week.objectives.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Learning Objectives</h2>
              <ul className="space-y-2">
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

          <ReadingTier label="Core Readings" dotColor="bg-[#18234e]" readings={week.core} />
          <ReadingTier label="Recommended" dotColor="bg-blue-500" readings={week.recommended} />
          <ReadingTier label="Further Reading" dotColor="bg-gray-400" readings={week.further} />
        </div>
      </div>
    </main>
  )
}
