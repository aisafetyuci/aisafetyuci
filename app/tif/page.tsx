import { Metadata } from 'next'
import WeekAccordion from './WeekAccordion'

const tifTitle = 'Technical Intro Fellowship'
const tifDescription = 'An 8-week reading and discussion group on AI safety at UC Irvine. Thursdays 5–7 PM in Humanities Hall 112, dinner provided. Covers AI trajectory, misalignment evidence, threat models, and technical safety approaches.'

export const metadata: Metadata = {
  title: tifTitle,
  description: tifDescription,
  openGraph: {
    title: `${tifTitle} | AI Safety Collective at Irvine`,
    description: tifDescription,
    url: 'https://aisafetyuci.org/tif',
    type: 'website',
    images: ['/images/asinglenet-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${tifTitle} | AI Safety Collective at Irvine`,
    description: tifDescription,
    images: ['/images/asinglenet-og.png'],
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

          <div className="bg-[#18234e] rounded-lg p-6 mb-8 text-white flex flex-wrap justify-evenly gap-y-3 text-sm">
            <span>Thursdays, 5 &ndash; 7 PM</span>
            <span>Humanities Hall 112</span>
            <span>Dinner provided</span>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Curriculum adapted from MIT MAIA&apos;s AI Safety Fundamentals course. No work is assigned outside of weekly meetings.
          </p>

          <WeekAccordion />

        </div>
      </div>
    </main>
  )
}
