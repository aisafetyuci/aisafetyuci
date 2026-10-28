import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { emptyParamPlaceholder } from '../../lib/blog'
import { getAllProjects, getProject } from '../../lib/research'
import { upcomingResearchDeadline } from '../../data/research'
import ProjectFacts from '../_components/ProjectFacts'

// Static export: every project is prerendered; unknown slugs 404.
export const dynamicParams = false

export function generateStaticParams() {
  const projects = getAllProjects()
  if (projects.length === 0) return [{ slug: emptyParamPlaceholder }]
  return projects.map((project) => ({ slug: project.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/research/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://aisafetyuci.org/research/${project.slug}`,
      type: 'article',
      images: ['/images/asinglenet-og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: ['/images/asinglenet-og.png'],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  const deadline = upcomingResearchDeadline()

  return (
    <main className="min-h-screen bg-brand-wash">
      <div className="site-container pt-10 pb-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/research" className="inline-flex min-h-10 items-center text-sm font-medium text-brand-accent hover:text-brand">
            <span aria-hidden="true">←</span>&nbsp;All projects
          </Link>

          <article>
            <header className="mt-4 border-b border-brand-border pb-8">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${project.open ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${project.open ? 'bg-green-500' : 'bg-gray-400'}`} />
                {project.open ? 'Open for applications' : 'Closed'}
              </span>
              <h1 className="page-title mt-4 break-words">{project.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{project.summary}</p>
              <div className="mt-6"><ProjectFacts project={project} /></div>
              {project.constraints.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-600">
                  {project.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}
                </ul>
              )}
              {project.onePagerUrl && (
                <p className="mt-4 text-sm">
                  <a href={project.onePagerUrl} target="_blank" rel="noopener noreferrer" aria-label={`Full one-pager for ${project.title} (opens in a new tab)`} className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                    Full one-pager ↗
                  </a>
                </p>
              )}
            </header>

            <div
              className="prose prose-brand mt-8 max-w-none break-words sm:prose-lg prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-a:underline-offset-4 prose-a:decoration-brand/30 hover:prose-a:decoration-brand"
              dangerouslySetInnerHTML={{ __html: project.html }}
            />
          </article>

          {project.open && (
            <div className="mt-12 surface-card p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-brand">Interested?</h2>
              <p className="mt-2 leading-relaxed text-gray-600">
                No research experience needed. Tell us what draws you to this project and where you&apos;d start.
                {deadline && <> Apply by <time dateTime={deadline.date} className="font-semibold text-brand">{deadline.label}</time>.</>}
              </p>
              <Link href={`/research/apply?project=${project.slug}`} className="button-primary mt-5 w-full sm:w-auto">
                Apply to this project <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
