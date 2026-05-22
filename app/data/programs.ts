export type ProgramStatus = {
  label: string
  tone: 'open' | 'closed'
}

export const statusBadgeClasses: Record<ProgramStatus['tone'], { wrap: string; dot: string }> = {
  open: {
    wrap: 'bg-green-100 text-green-700',
    dot: 'bg-green-500',
  },
  closed: {
    wrap: 'bg-gray-100 text-gray-500',
    dot: 'bg-gray-400',
  },
}

export type Program = {
  key: 'intro' | 'policy' | 'membership' | 'board'
  title: string
  shortTitle: string
  blurb: string
  status: ProgramStatus
  applyHref: string
  secondary?: { href: string; label: string }
}

export const programs: Program[] = [
  {
    key: 'intro',
    title: 'Intro Fellowship, Fall 2026',
    shortTitle: 'Technical Intro Fellowship',
    blurb: 'Technical AI safety reading group, 8 weeks.',
    status: { label: 'Applications Open', tone: 'open' },
    applyHref: 'https://airtable.com/appKZNlVqsXmdMztH/pagFgRZ9bLP6ZfZbt/form',
  },
  {
    key: 'policy',
    title: 'Policy Fellowship, Fall 2026',
    shortTitle: 'Policy Fellowship',
    blurb: 'AI policy and governance reading group.',
    status: { label: 'Applications Open', tone: 'open' },
    applyHref: 'https://airtable.com/appKZNlVqsXmdMztH/pagAV3fJFiimd0sRq/form',
  },
  {
    key: 'membership',
    title: 'Membership',
    shortTitle: 'Membership',
    blurb: 'Join the community: weekly reading, workshops, events.',
    status: { label: 'Rolling Admissions', tone: 'open' },
    applyHref: 'https://airtable.com/appKZNlVqsXmdMztH/pagMczb6lf65AJyB8/form',
  },
  {
    key: 'board',
    title: 'Facilitator / Board',
    shortTitle: 'Facilitator / Board',
    blurb: 'Lead a fellowship section or help run the club.',
    status: { label: 'Rolling Admissions', tone: 'open' },
    applyHref: 'https://airtable.com/appKZNlVqsXmdMztH/pagO6NP1r12Fp7rX3/form',
    secondary: {
      href: 'https://docs.google.com/document/d/14FKNS9ckp-80HMVtT5wcCNtriQfRU7UXC6qZoLsLWrE/edit?tab=t.0',
      label: 'Recruitment Doc',
    },
  },
]

export const programsByKey = Object.fromEntries(
  programs.map((p) => [p.key, p]),
) as Record<Program['key'], Program>
