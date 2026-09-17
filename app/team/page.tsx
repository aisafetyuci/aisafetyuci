import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

const pageTitle = 'Team'
const pageDescription = "Meet the people behind AISCI — the students, researchers, and advisors working on AI safety at UC Irvine."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/team',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    images: [],
  },
}

interface TeamMember {
  name: string
  role: string
  bio?: ReactNode
  bioPoints?: string[]
  image?: string
  website?: string
  linkedin?: string
}

const executiveBoard: TeamMember[] = [
  {
    name: 'Dominic Mascetti',
    role: 'Fellowship Lead',
    bio: 'Dominic leads AISCI’s Fellowship and Education team and helps fellows find their next steps in AI safety. His interests include AI governance, field strategy, and writing.',
    image: '/images/team/dominic-mascetti.jpg',
    website: 'https://dominicmascetti.com/',
  },
  {
    name: 'Prema Suthaharan',
    role: 'Events Lead',
    bio: 'Prema is an AI/ML engineering intern at Optum, with past internships at Medtronic and KPMG. She leads AISCI’s Events, Marketing, and Community team. She was previously events director and facilitator for AISCI.',
    image: '/images/team/prema-suthaharan.jpg',
    website: 'https://premasuthaharan.com/',
  },
  {
    name: 'Ivan Shishkin',
    role: 'Operations Lead',
    bio: 'Ivan is an honors CS student and a part-time software engineer. He leads AISCI’s Operations and Communications team. Previously, he researched AI literacy at the Digital Learning Lab.',
    image: '/images/team/ivan-shishkin.jpg',
    website: 'https://www.ivanshishkin.com/',
  },
  {
    name: 'Swaraag Sistla',
    role: 'Incubator Lead',
    bio: 'Swaraag is working on building value generalization into current LLMs. He leads AISCI’s Incubator and Research team and its technical research initiatives.',
    image: '/images/team/swaraag-sistla.jpg',
    website: 'https://www.linkedin.com/in/swaraagsistla',
  },
]

const advisors: TeamMember[] = [
  {
    name: 'Harry Waterman',
    role: 'Advisor',
    bioPoints: [
      'Harry works on special projects at BlueDot Impact. Previously, he was a Generator fellow at Constellation focused on scaling AI safety.',
      'He also previously helped with operations and event coordination at BlueDot Impact and organized AISCI.',
      'He studied computational mathematics at UC Irvine and continues to advise AISCI.',
    ],
    image: '/images/team/harry-waterman.jpg',
    website: 'https://harrywaterman.com/',
    linkedin: 'https://www.linkedin.com/in/harry-waterman/',
  },
  {
    name: 'Helena Tran',
    role: 'Founder/Advisor',
    bioPoints: [
      'Helena works in recruiting at METR. Previously, she coordinated programs at Constellation and ran its Generator Residency, and contracted with Kairos for OASIS and SPAR.',
      'She has researched deception and collusion in LLMs through UChicago’s Existential Risk Laboratory, SPAR, and AI Safety Camp, and completed ARENA 6.0.',
      'Most importantly, she founded AISCI while studying applied mathematics and computer science at UC Irvine.',
    ],
    image: '/images/team/helena-tran-linkedin.png',
    website: 'https://helenatran.com/',
    linkedin: 'https://www.linkedin.com/in/helena-t-tran/',
  },
]

const organizers: TeamMember[] = [
  {
    name: 'Zoey Chen',
    role: 'Organizer',
    image: '/images/team/zoey-chen.png',
    website: 'https://www.linkedin.com/in/zoey--chen/',
  },
  {
    name: 'Cole Saldanha',
    role: 'Organizer',
    image: '/images/team/cole-saldanha.png',
    website: 'https://www.linkedin.com/in/cole-saldanha/',
  },
  {
    name: 'Rylen C.',
    role: 'Organizer',
    image: '/images/team/rylen-c.jpg',
    website: 'https://www.linkedin.com/in/rylen-choi/',
  },
  {
    name: 'Boris C.',
    role: 'Organizer',
    image: '/images/team/boris-c.jpg',
    website: 'https://www.linkedin.com/in/boris-c-a18955268/',
  },
  {
    name: 'Hailey Chen',
    role: 'Organizer',
    image: '/images/team/hailey-chen.jpg',
    website: 'https://www.linkedin.com/in/haileychen6/',
  },
]

function PersonCard({ person }: { person: TeamMember }) {
  return (
    <div className="surface-card flex flex-col items-center text-center p-6 w-full max-w-sm h-full">
      <div className="flex w-40 h-40 items-center justify-center rounded-full overflow-hidden bg-gray-100 mb-4">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            width={192}
            height={192}
            className="w-full h-full object-cover"
          />
        ) : (
          <span aria-hidden="true" className="text-5xl font-medium text-brand-accent">
            {person.name.split(' ').map((part) => part[0]).join('')}
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold text-brand">
        {person.website ? (
          <a
            href={person.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={person.website.includes('linkedin.com/') ? `${person.name} on LinkedIn` : `${person.name}'s personal website`}
            className="underline underline-offset-2 hover:text-gray-500 transition-colors"
          >
            {person.name}
          </a>
        ) : (
          person.name
        )}
      </h3>
      <p className="text-sm font-medium text-gray-500 mb-3">{person.role}</p>
      {person.bio && <p className="text-gray-600 text-sm leading-relaxed">{person.bio}</p>}
    </div>
  )
}

function AdvisorCard({ person }: { person: TeamMember }) {
  return (
    <article className="surface-card grid h-full items-center gap-6 p-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:p-8">
      <div className="flex min-w-0 flex-col items-center text-center">
        {person.image && (
          <Image
            src={person.image}
            alt={person.name}
            width={384}
            height={384}
            className="aspect-square w-48 rounded-full object-cover"
          />
        )}
        <h3 className="mt-4 text-xl font-semibold text-brand">
          {person.website ? (
            <a href={person.website} target="_blank" rel="noopener noreferrer" className="underline decoration-brand/25 underline-offset-4 transition-colors hover:text-brand-accent">
              {person.name}
            </a>
          ) : person.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-brand-accent">{person.role}</p>
      </div>
      {person.bioPoints ? (
        <ul className="min-w-0 list-disc space-y-4 pl-5 text-base leading-relaxed text-gray-600 marker:text-brand-accent">
          {person.bioPoints.map((point) => <li key={point}>{point}</li>)}
        </ul>
      ) : person.bio && <p className="min-w-0 text-base leading-relaxed text-gray-600">{person.bio}</p>}
    </article>
  )
}

function Section({ title, members, emptyMessage, fiveAcross = false }: { title: string; members: TeamMember[]; emptyMessage?: string; fiveAcross?: boolean }) {
  if (members.length === 0 && !emptyMessage) return null
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold text-brand mb-10 text-center">{title}</h2>
      {members.length === 0 ? (
        <p className="text-center text-gray-500">{emptyMessage}</p>
      ) : (
        <div className={fiveAcross ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'flex flex-wrap justify-center gap-12'}>
          {members.map((person) => (
            <div key={person.name} className={fiveAcross ? 'flex min-w-0 justify-center' : 'flex justify-center w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] xl:w-[calc(25%-2.25rem)]'}>
              <PersonCard person={person} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default function Team() {
  return (
    <main className="min-h-screen bg-brand-wash">
      <div className="site-container pt-12 pb-2">
        <div className="page-header">
          <h1 className="page-title">Team</h1>
        </div>
      </div>

      <div className="site-container pt-12 pb-16">
        <Section title="Executive Board" members={executiveBoard} />
        <Section title="Organizers" members={organizers} fiveAcross emptyMessage="Organizing team to be announced." />
        <section aria-labelledby="advisors-heading" className="mb-16">
          <h2 id="advisors-heading" className="text-3xl font-semibold text-brand mb-10 text-center">Advisors</h2>
          <div className="grid gap-6 xl:grid-cols-2">
            {advisors.map((person) => <AdvisorCard key={person.name} person={person} />)}
          </div>
        </section>

        <div className="bg-brand rounded-2xl p-6 sm:p-10 text-center mt-8">
          <p className="text-2xl font-bold text-white mb-2">Want to join our team?</p>
          <p className="text-brand-soft mb-6">Get involved with AISCI and help advance AI safety at UCI.</p>
          <Link href="/get-involved" className="button-inverse">
            Get Involved
          </Link>
        </div>
      </div>
    </main>
  )
}
