import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { coffeeChats } from '../data/links'
import { advisors, executiveBoard, organizers, teamMemberId, type TeamMember } from '../data/team'

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

function PersonCard({ person }: { person: TeamMember }) {
  const coffeeChat = coffeeChats.find((chat) => chat.fullName === person.name)
  return (
    <div id={teamMemberId(person.name)} className="surface-card flex flex-col items-center text-center p-6 w-full max-w-sm h-full">
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
      {coffeeChat && (
        <div className="mt-auto w-full pt-5">
          <a href={coffeeChat.url} target="_blank" rel="noopener noreferrer" aria-label={`Book a coffee chat with ${person.name}`} className="button-secondary w-full">
            Book a coffee chat <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </div>
  )
}

function AdvisorCard({ person }: { person: TeamMember }) {
  return (
    <article id={teamMemberId(person.name)} className="surface-card grid h-full items-center gap-6 p-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:p-8">
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
