import { Metadata } from 'next'
import { getOpenProjects } from '../../lib/research'
import ApplyForm, { type ProjectOption } from './ApplyForm'

const pageTitle = 'Apply to Research Projects'
const pageDescription = 'Apply to student-run AI safety research projects at the AI Safety Collective at Irvine. No research experience needed.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/research/apply' },
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/research/apply',
    type: 'website',
    images: ['/images/asinglenet-og.png'],
  },
}

export default function ApplyPage() {
  // Only what the form shows goes to the browser.
  const projects: ProjectOption[] = getOpenProjects().map(({ draft: _draft, open: _open, ...project }) => project)

  return (
    <main className="min-h-screen bg-brand-wash">
      <div className="site-container pt-12 pb-2">
        <div className="page-header">
          <h1 className="page-title">Apply to research projects</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Pick the projects that interest you and tell us why. It takes about 15–20 minutes, and your answers are saved in this browser as you go.
          </p>
        </div>
      </div>
      <div className="site-container pt-8 pb-16">
        <ApplyForm projects={projects} />
      </div>
    </main>
  )
}
