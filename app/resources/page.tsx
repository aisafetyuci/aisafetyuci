import { Metadata } from 'next'
import Image from 'next/image'

const pageTitle = 'Resources'
const pageDescription = "Everything we'd point you to if you're trying to get into AI safety: a video, courses, the essential reading list, and where to find a job."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/resources',
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

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {label}
    </span>
  )
}

function ExternalIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

const formatColors: Record<string, string> = {
  Article: 'bg-sky-100 text-sky-700',
  Report: 'bg-indigo-100 text-indigo-700',
  Essay: 'bg-violet-100 text-violet-700',
  Paper: 'bg-[#18234e]/10 text-[#18234e]',
}

const reading = [
  {
    title: 'Preparing for the Intelligence Explosion',
    authors: 'William MacAskill & Fin Moorhouse',
    format: 'Report',
    url: 'https://www.forethought.org/research/preparing-for-the-intelligence-explosion',
    summary: 'How rapid AI advancement could compress centuries of progress into decades — and why that demands preparation now.',
  },
  {
    title: 'AI 2027',
    authors: 'Kokotajlo, Alexander, Larsen, Lifland, Dean',
    format: 'Report',
    url: 'https://ai-2027.com/',
    summary: 'A concrete, near-term AGI scenario built around AI-automated research, with explicit forecasts.',
  },
  {
    title: 'Situational Awareness: The Decade Ahead',
    authors: 'Leopold Aschenbrenner',
    format: 'Essay',
    url: 'https://situational-awareness.ai/',
    summary: 'The case that AGI may arrive sooner than widely anticipated, with transformative global consequences.',
  },
  {
    title: 'The Case for Multi-Decade AI Timelines',
    authors: 'Ege Erdil (Epoch AI)',
    format: 'Article',
    url: 'https://epochai.substack.com/p/the-case-for-multi-decade-ai-timelines',
    summary: 'A counterweight to short-timeline takes: why intelligence-explosion scenarios may be overconfident.',
  },
  {
    title: 'The Most Important Century',
    authors: 'Holden Karnofsky',
    format: 'Essay',
    url: 'https://www.cold-takes.com/most-important-century/',
    summary: 'Argues that transformative AI could make the coming decades the most pivotal in human history.',
  },
  {
    title: 'Does AI Progress Have a Speed Limit?',
    authors: 'Ajeya Cotra & Arvind Narayanan',
    format: 'Article',
    url: 'https://asteriskmag.com/issues/10/does-ai-progress-have-a-speed-limit',
    summary: 'Two researchers with contrasting views debate how fast AI is really moving — and what that means.',
  },
  {
    title: 'Can AI Scaling Continue Through 2030?',
    authors: 'Sevilla et al. (Epoch AI)',
    format: 'Report',
    url: 'https://epoch.ai/blog/can-ai-scaling-continue-through-2030',
    summary: 'Projects continued scaling through 2030, constrained primarily by power and chip manufacturing.',
  },
  {
    title: 'Existential Risk from Power-Seeking AI',
    authors: 'Joe Carlsmith',
    format: 'Paper',
    url: 'https://jc.gatspress.com/pdf/existential_risk_and_powerseeking_ai.pdf',
    summary: 'The canonical careful argument that sufficiently capable, goal-directed AI could pose an existential threat.',
  },
  {
    title: 'Gradual Disempowerment',
    authors: 'Kulveit, Douglas, Ammann, Turan, Krueger, Duvenaud',
    format: 'Report',
    url: 'https://gradual-disempowerment.ai/',
    summary: 'How advanced AI could erode human agency slowly through institutional drift, not sudden takeover.',
  },
  {
    title: 'Taking AI Welfare Seriously',
    authors: 'Robert Long, Jeff Sebo, et al.',
    format: 'Paper',
    url: 'https://arxiv.org/pdf/2411.00986',
    summary: 'The case that future AI systems may be moral patients — and what we owe them if so.',
  },
  {
    title: 'Machines of Loving Grace',
    authors: 'Dario Amodei',
    format: 'Essay',
    url: 'https://www.darioamodei.com/essay/machines-of-loving-grace',
    summary: "Anthropic's CEO sketches a positive vision: what powerful AI could do for the world if it goes well.",
  },
]

export default function Resources() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e]">Resources</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* 0. Watch first */}
          <section className="mb-16">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-3 text-center">Start here</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              <em>We're Not Ready for Superintelligence</em> is a walkthrough of the{' '}
              <a
                href="https://ai-2027.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#18234e] font-medium hover:underline"
              >
                <em>AI 2027</em>
              </a>{' '}
              scenario, one expert view of where things might be headed.
            </p>
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-black" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/5KVDDfAkRgc"
                  title="We're Not Ready for Superintelligence (AI in Context, 80,000 Hours)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">
                From{' '}
                <a
                  href="https://www.youtube.com/@AI_In_Context"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#18234e] font-medium hover:underline"
                >
                  AI in Context
                </a>{' '}
                by 80,000 Hours.
              </p>
            </div>
          </section>

          {/* 1. Start with a course */}
          <section className="mb-16">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-6 text-center">Courses &amp; programs</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Two tracks: a general intro on the left, and the technical research pipeline on the right.
            </p>
            {/* Top row: two equal-height hero cards */}
            <div className="grid gap-8 md:grid-cols-2">
              <a
                href="https://bluedot.org/courses/future-of-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white rounded-xl shadow-lg p-8 hover:shadow-xl hover:border-[#18234e]/30 border border-transparent transition-all focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                aria-label="BlueDot: The Future of AI course"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src="/images/bluedot-logo.jpg" alt="BlueDot Impact logo" width={56} height={56} className="w-full h-full object-cover" />
                  </div>
                  <Badge label="Course" color="bg-emerald-100 text-emerald-700" />
                  <span className="ml-auto"><ExternalIcon /></span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">BlueDot — The Future of AI</h3>
                <p className="text-gray-700 mb-4">
                  Finish in an evening with a clearer picture of frontier AI, the risks, and what's being done about them. The standard on-ramp into the field.
                </p>
                <div className="text-sm text-gray-500 flex items-center gap-3 mt-auto">
                  <span>2 hours</span>
                  <span aria-hidden="true">·</span>
                  <span>Free</span>
                  <span aria-hidden="true">·</span>
                  <span>Self-paced</span>
                </div>
                <div className="mt-5 text-[#18234e] font-semibold text-sm group-hover:underline">
                  Start the course →
                </div>
              </a>

              <a
                href="https://learn.arena.education/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white rounded-xl shadow-lg p-8 hover:shadow-xl hover:border-[#18234e]/30 border border-transparent transition-all focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                aria-label="ARENA: Alignment Research Engineer Accelerator"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                    <Image src="/images/arena-logo.webp" alt="ARENA logo" width={56} height={56} className="w-full h-full object-contain" />
                  </div>
                  <Badge label="Technical" color="bg-indigo-100 text-indigo-700" />
                  <span className="ml-auto"><ExternalIcon /></span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">ARENA — Alignment Research Engineer Accelerator</h3>
                <p className="text-gray-700 mb-4">
                  Hands-on technical curriculum: transformers, RL, mech interp, and evals. The standard pipeline for engineers entering alignment research.
                </p>
                <div className="text-sm text-gray-500 flex items-center gap-3 mt-auto">
                  <span>~5 weeks</span>
                  <span aria-hidden="true">·</span>
                  <span>Cohort or self-study</span>
                  <span aria-hidden="true">·</span>
                  <span>Code-heavy</span>
                </div>
                <div className="mt-5 text-[#18234e] font-semibold text-sm group-hover:underline">
                  Explore the curriculum →
                </div>
              </a>
            </div>

            {/* Bottom row: matching dropdowns under each hero */}
            <div className="grid gap-8 md:grid-cols-2 mt-4 items-start">
              <details className="group bg-white rounded-lg shadow-md overflow-hidden">
                <summary className="cursor-pointer select-none list-none px-5 py-4 flex items-center justify-between gap-3 font-semibold text-[#18234e] hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                  <span>More on the strategy track</span>
                  <svg className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-1 border-t border-gray-100 flex flex-col gap-1">
                  <a
                    href="https://bluedot.org/courses/agi-strategy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg p-4 -mx-1 mt-3 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                    aria-label="BlueDot: AGI Strategy course"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0">
                        <Image src="/images/bluedot-logo.jpg" alt="BlueDot Impact logo" width={36} height={36} className="w-full h-full object-cover" />
                      </div>
                      <Badge label="Course" color="bg-emerald-100 text-emerald-700" />
                      <span className="ml-auto"><ExternalIcon /></span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">BlueDot — AGI Strategy</h3>
                    <p className="text-sm text-gray-500 mb-2">25 hours · Cohort · Pay-what-you-want</p>
                    <p className="text-gray-700 text-sm">
                      The serious follow-up to Future of AI: development trajectories, possible outcomes, and what strategic interventions might steer things well.
                    </p>
                  </a>

                  <a
                    href="https://constellation.org/programs/astra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg p-4 -mx-1 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                    aria-label="Astra Fellowship by Constellation — strategy and governance stream"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge label="Fellowship" color="bg-orange-100 text-orange-700" />
                      <ExternalIcon />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Astra Fellowship — Strategy &amp; Governance</h3>
                    <p className="text-sm text-gray-500 mb-2">Constellation · 5 months · Berkeley · Paid</p>
                    <p className="text-gray-700 text-sm">
                      In-person stream for catastrophic-risk policy, AI governance, and field-building projects with senior advisors.
                    </p>
                  </a>
                </div>
              </details>

              <details className="group bg-white rounded-lg shadow-md overflow-hidden">
                <summary className="cursor-pointer select-none list-none px-5 py-4 flex items-center justify-between gap-3 font-semibold text-[#18234e] hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                  <span>Research fellowships</span>
                  <svg className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-1 border-t border-gray-100 flex flex-col gap-1">
                  <a
                    href="https://supervisedprogramforalignment.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg p-4 -mx-1 mt-3 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                    aria-label="SPAR: Supervised Program for Alignment Research"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge label="Fellowship" color="bg-orange-100 text-orange-700" />
                      <ExternalIcon />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">SPAR</h3>
                    <p className="text-sm text-gray-500 mb-2">Supervised Program for Alignment Research</p>
                    <p className="text-gray-700 text-sm">
                      Remote, part-time, mentor-led research projects. Lower barrier to entry than MATS — great as a first research experience.
                    </p>
                  </a>

                  <a
                    href="https://www.matsprogram.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg p-4 -mx-1 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                    aria-label="MATS: ML Alignment & Theory Scholars"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge label="Fellowship" color="bg-orange-100 text-orange-700" />
                      <ExternalIcon />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">MATS</h3>
                    <p className="text-sm text-gray-500 mb-2">ML Alignment &amp; Theory Scholars</p>
                    <p className="text-gray-700 text-sm">
                      Selective ~10-week paid research program. You're matched with a senior alignment researcher and ship a real project.
                    </p>
                  </a>

                </div>
              </details>
            </div>
          </section>

          {/* 2. Essential reading */}
          <section className="mb-16">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-6 text-center">Essential reading</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              The eleven pieces 80,000 Hours considers the best on-ramp to understanding AI risk and where the field is going.
            </p>
            <ol className="flex flex-col gap-4">
              {reading.map((r, i) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-5 bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                    aria-label={`${r.title} by ${r.authors}`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#18234e]/10 text-[#18234e] font-bold flex items-center justify-center text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge label={r.format} color={formatColors[r.format]} />
                        <span className="text-sm text-gray-500">{r.authors}</span>
                        <span className="ml-auto"><ExternalIcon /></span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#18234e] transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-gray-700 text-sm">{r.summary}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ol>
            <p className="text-center text-sm text-gray-500 mt-6">
              Curated by 80,000 Hours —{' '}
              <a
                href="https://80000hours.org/articles/11-essential-resources-ai-risk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#18234e] font-medium hover:underline"
              >
                read the original list →
              </a>
            </p>
          </section>

          {/* 4. Job board CTA */}
          <section>
            <a
              href="https://jobs.80000hours.org/?refinementList%5Btags_area%5D%5B0%5D=AI%20safety%20%26%20policy"
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#18234e] text-white rounded-xl p-8 hover:bg-[#111a3b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#18234e] focus:ring-offset-2"
              aria-label="80,000 Hours AI safety job board"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Looking to work on this?</h2>
                  <p className="text-white/80">Browse open roles on the 80,000 Hours AI safety &amp; policy job board.</p>
                </div>
                <span className="text-lg font-semibold whitespace-nowrap group-hover:translate-x-1 transition-transform">
                  See jobs →
                </span>
              </div>
            </a>
          </section>

        </div>
      </div>
    </main>
  )
}
