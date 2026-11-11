import Link from 'next/link'
import { getOpenProjects } from '../lib/research'
import { isResearchDeadlinePast, upcomingResearchDeadline } from '../data/research'

// Shown only while at least one project in content/research/ has `status: open` and the deadline
// in app/data/research.ts hasn't passed (checked at build time).
export default function ResearchBanner() {
  if (getOpenProjects().length === 0 || isResearchDeadlinePast()) return null
  const deadline = upcomingResearchDeadline()

  return (
    <aside aria-label="Research applications" className="bg-brand text-white">
      <div className="site-container py-2.5 text-center text-sm leading-relaxed">
        We’re taking applications for student research projects in AI safety. No research experience needed.
        {deadline && <> Apply by <time dateTime={deadline.date}>{deadline.label}</time>.</>}{' '}
        <Link href="/research" className="whitespace-nowrap font-semibold underline underline-offset-2 hover:text-white/80">
          Browse projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  )
}
