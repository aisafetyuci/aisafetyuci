import { Metadata } from 'next'
import WeekAccordion from './WeekAccordion'
import { meeting } from '../data/links'

const tifTitle = 'Technical Intro Fellowship'
const tifDescription = `An 8-week reading and discussion group on AI safety at UC Irvine. ${meeting.day} ${meeting.time} in ${meeting.room}, dinner provided. Covers AI trajectory, misalignment evidence, threat models, and technical safety approaches.`

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
            An introductory 8-week reading and discussion group on AI safety.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-3xl mx-auto">

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-amber-900">
            <strong className="font-semibold">Spring 2026 cohort is in session.</strong> The fellowship is application-only and not open for drop-ins. Applications for the next cohort open about a month before the quarter starts &mdash; see <a href="/get-involved" className="underline hover:no-underline">Get Involved</a>.
          </div>

          <div className="bg-[#18234e] rounded-lg p-6 mb-8 text-white flex flex-wrap justify-evenly gap-y-3 text-sm">
            <span>{meeting.day}, {meeting.time}</span>
            <a
              href="https://www.google.com/maps?cid=14914137050959626236"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-white/40 hover:decoration-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              {meeting.room}
            </a>
            <span>Dinner provided</span>
          </div>

          <WeekAccordion />

        </div>
      </div>
    </main>
  )
}
