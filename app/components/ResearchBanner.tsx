import Link from 'next/link'
import { getOpenProjects } from '../lib/research'

// Shown only while at least one project in content/research/ has `status: open`.
export default function ResearchBanner() {
  if (getOpenProjects().length === 0) return null

  return (
    <aside aria-label="Research applications" className="bg-brand text-white">
      <div className="site-container py-2.5 text-center text-sm leading-relaxed">
        We’re taking applications for student research projects in AI safety. No research experience needed. Apply by Nov 10.{' '}
        <Link href="/research" className="whitespace-nowrap font-semibold underline underline-offset-2 hover:text-white/80">
          Browse projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  )
}
