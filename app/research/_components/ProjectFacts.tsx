import type { ReactNode } from 'react'
import type { Project } from '../../lib/research'

// The at-a-glance facts for a project, shared by the cards, the one-pager page and the form.
// Facts a project hasn't set yet (e.g. no lead chosen) are left out. `action` takes the first cell
// (a full row on phones), and Skills then shares a row at wider sizes.
export default function ProjectFacts({ project, compact = false, action }: { project: Pick<Project, 'duration' | 'team' | 'commitment' | 'format' | 'skills' | 'leads'>; compact?: boolean; action?: ReactNode }) {
  const facts = [
    { label: 'Duration', value: project.duration },
    { label: 'Team', value: project.team },
    { label: 'Commitment', value: project.commitment },
    { label: 'Format', value: project.format },
    { label: 'Skills', value: project.skills, wide: true },
    { label: project.leads.length > 1 ? 'Leads' : 'Lead', value: project.leads.join(', ') || undefined },
  ].filter((fact) => fact.value)
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-brand-soft text-sm ${compact ? 'p-3' : 'p-4 sm:gap-x-6 sm:p-5'}`}>
      {action && <div className="col-span-2 min-w-0 sm:col-span-1">{action}</div>}
      <dl className="contents">
        {facts.map((fact) => (
          <div key={fact.label} className={`min-w-0 ${fact.wide ? (action ? 'col-span-2 sm:col-span-1' : 'col-span-2') : ''}`}>
            <dt className="text-gray-500">{fact.label}</dt>
            <dd className="mt-1 break-words font-medium text-brand">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
