import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import MailingListForm from './components/MailingListForm'
import MissionStatement from './components/MissionStatement'
import MemberCollaborations from './components/MemberCollaborations'
import HomeHero from './components/HomeHero'
import HomeEvents from './components/HomeEvents'
import { formatMonthDay, isUpcoming } from './data/events'
import { meeting } from './data/links'
import { programs, statusBadgeClasses, type Program } from './data/programs'
import { getCalendar } from './lib/events'

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

const applyLabels: Record<Program['key'], string> = {
  intro: 'Apply to the fellowship',
  membership: 'Apply for membership',
  board: 'Apply',
}

// Fellowship facts restate the Get Involved page; meeting logistics come from app/data/links.ts.
const introFacts = [`${meeting.day}, ${meeting.time} in ${meeting.room}`, 'Weekly meetings only; no outside work', 'No AI or ML background needed']

const photos = [
  { src: '/images/community/group.webp', alt: 'AISCI members posing together at the front of a classroom' },
  { src: '/images/community/picnic.webp', alt: 'Students sharing a picnic on a sunny campus lawn' },
  { src: '/images/community/bonfire.webp', alt: 'Students gathered around a bonfire in the evening' },
]

export default async function Home() {
  const { events, builtOn } = await getCalendar()

  return (
    <main className="min-h-screen bg-white">
      <HomeHero />

      <section id="events" aria-labelledby="events-heading" className="scroll-mt-16 py-16 sm:py-20">
        <div className="site-container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 id="events-heading" className="text-3xl font-semibold text-brand sm:text-4xl">Coming up</h2>
            <Link href="/events" className="whitespace-nowrap text-sm font-semibold text-brand hover:text-brand-accent">See all events →</Link>
          </div>
          <HomeEvents events={events.filter((e) => isUpcoming(e, builtOn))} buildDay={builtOn} />
        </div>
      </section>

      <section id="get-involved" aria-labelledby="involved-heading" className="scroll-mt-16 border-y border-brand-border/60 bg-brand-wash py-16 sm:py-20">
        <div className="site-container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 id="involved-heading" className="text-3xl font-semibold text-brand sm:text-4xl">Get involved</h2>
            <Link href="/get-involved" className="whitespace-nowrap text-sm font-semibold text-brand hover:text-brand-accent">Details and FAQ →</Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr_1fr]">
            {programs.map((program) => {
              const lead = program.key === 'intro'
              const badge = statusBadgeClasses[program.status.tone]
              const open = program.status.tone === 'open'
              return (
                <article key={program.key} className={`surface-card flex min-w-0 flex-col p-7 ${lead ? 'border-brand shadow-card-hover' : ''}`}>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.wrap}`}>
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                      {program.status.label}
                    </span>
                  </div>
                  <h3 className="mt-3.5 text-xl font-semibold leading-snug text-brand">{program.title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{program.blurb}</p>
                  {lead && (
                    <ul className="mt-4 grid gap-1.5 text-sm">
                      {introFacts.map((fact) => (
                        <li key={fact} className="flex gap-2">
                          <span aria-hidden="true" className="font-bold text-brand-accent">✓</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-6">
                    {open && (
                      <a href={program.applyHref} target="_blank" rel="noopener noreferrer" className={lead ? 'button-primary' : 'button-secondary'}>
                        {applyLabels[program.key]}
                      </a>
                    )}
                    {open && program.applicationDeadline && (
                      <span className="text-sm font-semibold text-brand">Due {formatMonthDay(program.applicationDeadline.date)}</span>
                    )}
                    {program.secondary && (
                      <a href={program.secondary.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand hover:text-brand-accent">
                        {program.secondary.label} ↗
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
          <p className="mt-6 text-gray-500">
            Rather learn on your own first?{' '}
            <Link href="/resources" className="font-semibold text-brand hover:text-brand-accent">Browse our reading lists and resources →</Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="mission-heading" className="py-16 sm:py-20">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="min-w-0">
              <h2 id="mission-heading" className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-accent">Our Mission</h2>
              <MissionStatement className="max-w-xl text-lg leading-relaxed text-gray-600" />
              <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
                <Link href="/team" className="text-brand hover:text-brand-accent">Meet the team →</Link>
                <Link href="/events#past" className="text-brand hover:text-brand-accent">Past events →</Link>
              </div>
            </div>
            <div className="grid aspect-[5/3.4] grid-cols-[1.4fr_1fr] grid-rows-2 gap-3">
              {photos.map((photo, index) => (
                <div key={photo.src} className={`relative overflow-hidden rounded-2xl bg-brand-soft ${index === 0 ? 'row-span-2' : ''}`}>
                  <Image src={photo.src} alt={photo.alt} fill sizes={index === 0 ? '(min-width: 1024px) 30vw, 60vw' : '(min-width: 1024px) 20vw, 40vw'} className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <MemberCollaborations />
        </div>
      </section>

      <section id="mailing-list" aria-labelledby="mailing-list-heading" className="scroll-mt-20 bg-brand text-white">
        <div className="site-container grid items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <h2 id="mailing-list-heading" className="text-2xl font-semibold sm:text-3xl">Stay in the loop</h2>
          <div className="w-full max-w-xl lg:justify-self-end">
            <MailingListForm prominent />
          </div>
        </div>
      </section>
    </main>
  )
}
