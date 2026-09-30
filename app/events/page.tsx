import { Metadata } from 'next'
import { getCalendar } from '../lib/events'
import EventsBrowser from './EventsBrowser'

const pageTitle = 'Events'
const pageDescription = 'Talks, workshops, socials, and programs from the AI Safety Collective at Irvine.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/events' },
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/events',
    type: 'website',
    images: ['/images/asinglenet-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    images: ['/images/asinglenet-og.png'],
  },
}

export default async function EventsPage() {
  const { events, fetchedAt } = await getCalendar()
  return (
    <main className="min-h-screen bg-brand-wash">
      <div className="site-container pt-12 pb-2">
        <div className="page-header pb-6 sm:pb-6">
          <h1 className="page-title">Events</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Talks, workshops, socials, and programs at AISCI. Everything is open to UCI students, and no background is needed.
          </p>
        </div>
      </div>
      <div className="site-container pt-6 pb-16">
        {/* The build date is only a first guess; the browser re-sorts on load so past events never linger as "upcoming". */}
        <EventsBrowser events={events} buildDay={fetchedAt} />
      </div>
    </main>
  )
}
