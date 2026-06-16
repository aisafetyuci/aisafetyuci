import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
  bio: string
  image: string
  website?: string
}

const executiveBoard: TeamMember[] = [
  {
    name: 'Dominic Mascetti',
    role: 'Co-Director',
    bio: 'Dominic leads AISCI’s fellowships and external events. His interests include AI governance, field strategy, and writing.',
    image: '/images/team/dominic-mascetti.jpg',
    website: 'https://dominicmascetti.com/',
  },
  {
    name: 'Prema Suthaharan',
    role: 'Co-Director',
    bio: 'Prema is an AI/ML engineering intern at Optum, with past internships at Medtronic and KPMG. She was previously events director and facilitator for AISCI.',
    image: '/images/team/prema-suthaharan.jpg',
    website: 'https://premasuthaharan.com/',
  },
  {
    name: 'Ivan Shishkin',
    role: 'Co-Director',
    bio: 'Ivan is a 3rd year Computer Science student at UCI researching AI literacy curriculum at the Digital Learning Lab. He also works part-time as a full-stack engineer and Arroyo Vista center attendant (come visit!).',
    image: '/images/team/ivan-shishkin.jpg',
    website: 'https://www.ivanshishkin.com/',
  },
  {
    name: 'Harry Waterman',
    role: 'Advisor',
    bio: 'Harry is a Generator fellow at Constellation working on scaling AI safety. Previously, he helped with operations at BlueDot Impact and organized AISCI.',
    image: '/images/team/harry-waterman.jpg',
    website: 'https://harrywaterman.com/',
  },
  {
    name: 'Helena Tran',
    role: 'Founder/Advisor',
    bio: 'Helena is a program coordinator at Constellation, and previously contracted with Kairos for OASIS and SPAR. She has also researched LLM collusion through SPAR and AI Safety Camp, and completed ARENA 6.0. Most importantly, she founded AISCI.',
    image: '/images/team/helena-tran.jpg',
    website: 'https://helenatran.com/',
  },
]

const organizers: TeamMember[] = []

function PersonCard({ person }: { person: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-xl shadow-md border border-gray-200 p-8 w-full max-w-sm h-full">
      <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 mb-4">
        <Image
          src={person.image}
          alt={person.name}
          width={192}
          height={192}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-[#18234e]">
        {person.website ? (
          <a
            href={person.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name}'s personal website`}
            className="underline underline-offset-2 hover:text-gray-500 transition-colors"
          >
            {person.name}
          </a>
        ) : (
          person.name
        )}
      </h3>
      <p className="text-sm font-medium text-gray-500 mb-3">{person.role}</p>
      <p className="text-gray-600 text-sm leading-relaxed">{person.bio}</p>
    </div>
  )
}

function Section({ title, members, emptyMessage }: { title: string; members: TeamMember[]; emptyMessage?: string }) {
  if (members.length === 0 && !emptyMessage) return null
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold text-[#18234e] mb-10 text-center">{title}</h2>
      {members.length === 0 ? (
        <p className="text-center text-gray-500">{emptyMessage}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-12">
          {members.map((person) => (
            <div key={person.name} className="flex justify-center w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]">
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
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e]">Team</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12 pb-16">
        <Section title="Executive Board" members={executiveBoard} />
        <Section title="Organizers" members={organizers} emptyMessage="Organizing team to be announced." />

        <div className="bg-[#18234e] rounded-lg p-10 text-center mt-8">
          <p className="text-2xl font-bold text-white mb-2">Want to join our team?</p>
          <p className="text-[#f2f3f7] mb-6">Get involved with AISCI and help advance AI safety at UCI.</p>
          <Link href="/get-involved" className="inline-block bg-white text-[#18234e] font-semibold px-8 py-3 rounded-full hover:bg-[#f2f3f7] transition-colors">
            Get Involved
          </Link>
        </div>
      </div>
    </main>
  )
}
