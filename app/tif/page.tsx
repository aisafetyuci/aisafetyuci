import { Metadata } from 'next'
import WeekAccordion from './WeekAccordion'
import { meeting } from '../data/links'

const tifTitle = 'Technical Intro Fellowship'
const tifDescription = `An 8-week reading and discussion group on AI safety at UC Irvine. Fall 2026: ${meeting.day} ${meeting.time}, room ${meeting.room}, dinner provided. Covers AI trajectory, misalignment evidence, threat models, and technical safety approaches.`

export const metadata: Metadata = {
  title: tifTitle,
  description: tifDescription,
  alternates: { canonical: 'https://aisafetyuci.org/tif' },
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
    <main className="min-h-screen bg-brand-wash">
      <div className="site-container pb-16 pt-12 sm:pt-16">
        <header className="page-header">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
            <div>
              <h1 className="page-title max-w-2xl">Technical Intro Fellowship</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">An introductory reading and discussion group on AI safety. Explore the curriculum, learning objectives, and readings below.</p>
            </div>
            <div className="rounded-2xl bg-brand p-6 text-white sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-light">Weekly meetings</p>
              <p className="mt-3 text-2xl font-semibold">{meeting.day}</p>
              <p className="mt-1 text-xl text-brand-soft">{meeting.time}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/20 pt-5 text-sm text-brand-soft">
                <span>Room: {meeting.room}</span>
                <span>Dinner provided</span>
              </div>
            </div>
          </div>
        </header>
        <section aria-labelledby="curriculum-heading" className="pt-10 sm:pt-12">
          <div className="mb-8">
            <h2 id="curriculum-heading" className="text-2xl font-semibold text-brand">Curriculum</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">Choose a week to explore its learning objectives and readings.</p>
          </div>
          <WeekAccordion />
        </section>
      </div>
    </main>
  )
}
