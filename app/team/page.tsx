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
}

const executiveBoard: TeamMember[] = [
  {
    name: 'Dominic Mascetti',
    role: 'Co-Director',
    bio: 'Bio coming soon.',
    image: '/images/team/dominic-mascetti.svg',
  },
  {
    name: 'Prema Suthaharan',
    role: 'Co-Director',
    bio: 'Bio coming soon.',
    image: '/images/team/prema-suthaharan.svg',
  },
  {
    name: 'Ivan Shishkin',
    role: 'Operations Lead',
    bio: 'Bio coming soon.',
    image: '/images/team/ivan-shishkin.svg',
  },
  {
    name: 'Harry Waterman',
    role: 'Advisor',
    bio: 'Bio coming soon.',
    image: '/images/team/harry-waterman.svg',
  },
  {
    name: 'Helena Tran',
    role: 'Founder/Advisor',
    bio: 'Bio coming soon.',
    image: '/images/team/helena-tran.svg',
  },
]

const organizers: TeamMember[] = []

function PersonCard({ person }: { person: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 mb-4">
        <Image
          src={person.image}
          alt={person.name}
          width={192}
          height={192}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-[#18234e]">{person.name}</h3>
      <p className="text-sm font-medium text-gray-500 mb-3">{person.role}</p>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{person.bio}</p>
    </div>
  )
}

function Section({ title, members }: { title: string; members: TeamMember[] }) {
  if (members.length === 0) return null
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold text-[#18234e] mb-10 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
        {members.map((person) => (
          <PersonCard key={person.name} person={person} />
        ))}
      </div>
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

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#18234e] mb-10 text-center">Organizers</h2>
          {organizers.length === 0 ? (
            <p className="text-center text-gray-500">Organizing team to be announced.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
              {organizers.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          )}
        </section>

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
