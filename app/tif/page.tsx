import { Metadata } from 'next'
import WeekAccordion from './WeekAccordion'
import { meeting } from '../data/links'

const tifTitle = 'Technical Intro Fellowship'
const tifDescription = `An 8-week reading and discussion group on AI safety at UC Irvine. Fall 2026: ${meeting.day} ${meeting.time}, room ${meeting.room}, dinner provided. Covers AI trajectory, misalignment evidence, threat models, and technical safety approaches.`

export const metadata: Metadata = {
  title: tifTitle,
  description: tifDescription,
  openGraph: {
    title: `${tifTitle} | AI Safety Collective at Irvine`,
    description: tifDescription,
    url: 'https://aisafetyuci.org/tif',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: `${tifTitle} | AI Safety Collective at Irvine`,
    description: tifDescription,
    images: [],
  },
}

export default function TechnicalIntroFellowship() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e] mb-3">Technical Intro Fellowship</h1>
          <p className="text-xl text-gray-600">
            An introductory 8-week reading and discussion group on AI safety. Fall 2026.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-3xl mx-auto">

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-amber-900">
            The fellowship is application-only and not open for drop-ins. For application information, see <a href="/get-involved" className="underline hover:no-underline">Get Involved</a>.
          </div>

          <div className="bg-[#18234e] rounded-lg p-6 mb-8 text-white flex flex-wrap justify-evenly gap-y-3 text-sm">
            <span>{meeting.day}, {meeting.time}</span>
            <span>Room: {meeting.room}</span>
            <span>Dinner provided</span>
          </div>

          <WeekAccordion />

        </div>
      </div>
    </main>
  )
}
