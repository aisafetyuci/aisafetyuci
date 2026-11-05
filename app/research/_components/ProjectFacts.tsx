import type { Project } from '../../lib/research'

// The at-a-glance facts for a project, shared by the cards, the one-pager page and the form.
// Facts a project hasn't set yet (e.g. no lead chosen) are left out.
export default function ProjectFacts({ project, compact = false }: { project: Pick<Project, 'duration' | 'team' | 'commitment' | 'format' | 'skills' | 'leads'>; compact?: boolean }) {
  const facts = [
    { label: 'Duration', value: project.duration },
    { label: 'Team', value: project.team },
    { label: 'Commitment', value: project.commitment },
    { label: 'Format', value: project.format },
    { label: 'Skills', value: project.skills, wide: true },
    { label: project.leads.length > 1 ? 'Leads' : 'Lead', value: project.leads.join(', ') || undefined },
  ].filter((fact) => fact.value)
  return (
    <dl className={`grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-brand-soft text-sm ${compact ? 'p-3' : 'p-4 sm:gap-x-6 sm:p-5'}`}>
      {facts.map((fact) => (
        <div key={fact.label} className={`min-w-0 ${fact.wide ? 'col-span-2' : ''}`}>
          <dt className="text-gray-500">{fact.label}</dt>
          <dd className="mt-1 break-words font-medium text-brand">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
