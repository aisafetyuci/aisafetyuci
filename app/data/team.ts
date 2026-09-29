import type { ReactNode } from 'react'

// Team members shown on /team. Blog bylines also look authors up here by exact name.
export interface TeamMember {
  name: string
  role: string
  bio?: ReactNode
  bioPoints?: string[]
  image?: string
  website?: string
  linkedin?: string
}

export const executiveBoard: TeamMember[] = [
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

export const advisors: TeamMember[] = [
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

export const organizers: TeamMember[] = [
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

export const allTeamMembers: TeamMember[] = [...executiveBoard, ...organizers, ...advisors]

// Anchor id for a member's card on /team (e.g. "Rylen C." -> "rylen-c").
export function teamMemberId(name: string) {
  return name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function findTeamMember(name: string) {
  return allTeamMembers.find((member) => member.name === name)
}
