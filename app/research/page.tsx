import { Metadata } from 'next'
import Link from 'next/link'
import { getAllProjects } from '../lib/research'
import ProjectFacts from './_components/ProjectFacts'

const pageTitle = 'Research Projects'
const pageDescription = 'Student-run technical AI safety research projects at the AI Safety Collective at Irvine. No research experience needed to apply.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/research' },
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/research',
    type: 'website',
    images: ['/images/asinglenet-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    images: ['/images/asinglenet-og.png'],
  },
}

export default function ResearchIndex() {
  const projects = getAllProjects()
  const open = projects.filter((project) => project.open)
  const closed = projects.filter((project) => !project.open)

  return (
    <main className="min-h-screen bg-brand-wash">
      <div className="site-container pt-12 pb-2">
        <div className="page-header">
          <h1 className="page-title">Research Projects</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Small teams of students working on open questions in technical AI safety.
            No research experience needed: we care most about your interest and how you think about the problem.
          </p>
          {open.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/research/apply" className="button-primary w-full sm:w-auto">Apply to projects <span aria-hidden="true">→</span></Link>
            </div>
          )}
        </div>
      </div>

      <div className="site-container pt-8 pb-16">
        {open.length > 0 ? (
          <section aria-labelledby="open-heading">
            <h2 id="open-heading" className="text-2xl font-semibold text-brand">Open for applications</h2>
            <p className="mt-2 text-gray-600">Apply to as many as you like. Members of AISCI get priority, but anyone can apply.</p>
            <ul className="mt-6 grid gap-6 lg:grid-cols-2">
              {open.map((project) => (
                <li key={project.slug} className="surface-card flex flex-col p-6 sm:p-8">
                  <h3 className="text-xl font-semibold leading-snug text-brand">{project.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{project.summary}</p>
                  <div className="mt-5"><ProjectFacts project={project} compact /></div>
                  <div className="mt-6 flex flex-wrap gap-3 pt-1 sm:mt-auto sm:pt-6">
                    <Link href={`/research/${project.slug}`} className="button-secondary w-full sm:w-auto">Read the one-pager</Link>
                    <Link href={`/research/apply?project=${project.slug}`} className="button-primary w-full sm:w-auto">Apply <span aria-hidden="true">→</span></Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div className="mx-auto max-w-3xl surface-card p-8 text-center sm:p-10">
            <h2 className="text-2xl font-semibold text-brand">No projects are open right now</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
              New projects open each quarter. Join the <Link href="/discord" className="font-medium text-brand underline underline-offset-4">Discord</Link> to hear when they do.
            </p>
          </div>
        )}

        <section aria-labelledby="how-heading" className="mt-14 surface-card p-6 sm:p-8">
          <h2 id="how-heading" className="text-2xl font-semibold text-brand">How it works</h2>
          <ul className="mt-5 grid gap-5 text-sm leading-relaxed text-gray-600 sm:grid-cols-2 lg:grid-cols-4">
            <li><h3 className="font-semibold text-brand">Small teams, short projects</h3><p className="mt-1">Teams of 2–3 work for 2–3 weeks. A strong result can be extended.</p></li>
            <li><h3 className="font-semibold text-brand">A blog post at the end</h3><p className="mt-1">Each project ends in a post reviewed by our directors. Null results get published too.</p></li>
            <li><h3 className="font-semibold text-brand">The club covers costs</h3><p className="mt-1">API credits and GPU time come from the club. You never pay out of pocket.</p></li>
            <li><h3 className="font-semibold text-brand">No experience needed</h3><p className="mt-1">We select on interest and how you think about the problem, not your resume.</p></li>
          </ul>
        </section>

        {closed.length > 0 && (
          <section aria-labelledby="closed-heading" className="mt-14">
            <h2 id="closed-heading" className="text-2xl font-semibold text-brand">Past and closed projects</h2>
            <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {closed.map((project) => (
                <li key={project.slug}>
                  <Link href={`/research/${project.slug}`} className="group block py-5">
                    <h3 className="text-lg font-semibold text-brand group-hover:text-brand-accent">{project.title}</h3>
                    <p className="mt-1 text-gray-600">{project.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}
