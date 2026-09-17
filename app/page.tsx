import Link from 'next/link'
import type { Metadata } from 'next'
import MailingListForm from './components/MailingListForm'
import MissionStatement from './components/MissionStatement'
import MemberCollaborations from './components/MemberCollaborations'
import HomeHero from './components/HomeHero'

const homeTitle = 'AI Safety Collective at Irvine'
const homeDescription = 'AISCI is UC Irvine\'s student community for AI alignment and AI safety. Join our Intro Fellowship, reading groups, and research programs at UCI focused on reducing risk from advanced AI.'

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${homeTitle} | AI Safety Collective at Irvine`,
    description: homeDescription,
    url: 'https://aisafetyuci.org',
    type: 'website',
    images: ['/images/asinglenet-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${homeTitle} | AI Safety Collective at Irvine`,
    description: homeDescription,
    images: ['/images/asinglenet-og.png'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HomeHero />

      <section id="mailing-list" aria-labelledby="mailing-list-heading" className="bg-brand text-white scroll-mt-20">
        <div className="site-container grid items-center gap-6 py-9 lg:grid-cols-2 lg:gap-12 lg:py-10">
          <div>
            <h2 id="mailing-list-heading" className="text-2xl font-semibold sm:text-3xl">Join the AISCI mailing list</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-white/80">
              Get member announcements, upcoming events, and fellowship updates by email.
            </p>
          </div>
          <div className="w-full max-w-xl lg:justify-self-end">
            <MailingListForm prominent />
          </div>
        </div>
      </section>

      <div className="w-full bg-white">
        <div className="site-container py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-brand mb-6 text-center">Our Mission</h2>
            <MissionStatement className="text-lg text-gray-600 leading-relaxed" />
          </div>
        </div>
      </div>

      <MemberCollaborations />

      <div className="w-full bg-gray-50">
        <div className="site-container py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-brand mb-10 text-center">Get Involved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/get-involved"
                className="surface-card interactive-card group flex flex-col p-8 transition-all text-center"
                aria-label="Programs"
              >
                <div className="w-14 h-14 rounded-lg bg-brand/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0118 19.666V20l-6 3-6-3v-.334a12.083 12.083 0 01-.16-8.088L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand mb-2">Fellowship & Membership</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">Join our 8-week Intro Fellowship or continue as a full member in our weekly reading group.</p>
                <span className="mt-5 text-brand text-sm font-semibold group-hover:underline">Learn more →</span>
              </Link>

              <Link
                href="/resources"
                className="surface-card interactive-card group flex flex-col p-8 transition-all text-center"
                aria-label="Resources"
              >
                <div className="w-14 h-14 rounded-lg bg-brand/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand mb-2">Learn</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">Self-study AI safety with our curated reading lists, lecture series, and research resources.</p>
                <span className="mt-5 text-brand text-sm font-semibold group-hover:underline">Browse resources →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="events" className="w-full bg-white scroll-mt-16">
        <div className="site-container py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-brand mb-2 text-center">Our Events</h2>
            <p className="text-gray-500 text-center mb-10">Click any event for details, or use the + Google Calendar button to subscribe and get updates automatically.</p>
            <div>
              <div className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&showTitle=0&showCalendars=0&src=NDg2OTI3NzUyZWFlYzI3OWNlNDk3MzRjYjVhMzVkZGE4MDMxNDBlMjVhYjBhZWJkM2EyMTRlZTJiZmFiMTU4ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23616161"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  title="AISCI Calendar"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
