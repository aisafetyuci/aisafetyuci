import { Metadata } from 'next'
import Link from 'next/link'

const pageTitle = 'Continued Engagement'
const pageDescription =
  "Where to go next in AI safety: newsletters and podcasts to follow, ways to build research skills, fellowships and programs to apply to, and a map of the orgs doing the work."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/continued-engagement',
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

const typeColors: Record<string, string> = {
  Newsletter: 'bg-sky-100 text-sky-700',
  Podcast: 'bg-violet-100 text-violet-700',
  Blog: 'bg-emerald-100 text-emerald-700',
  Forum: 'bg-amber-100 text-amber-700',
}

const trackColors: Record<string, string> = {
  Technical: 'bg-indigo-100 text-indigo-700',
  Policy: 'bg-rose-100 text-rose-700',
  Both: 'bg-[#18234e]/10 text-[#18234e]',
}

const feeds = [
  { name: 'Transformer', author: 'Shakeel Hashim', type: 'Newsletter', url: 'https://www.transformernews.ai/', note: 'News on AI and how it is governed.' },
  { name: "Don't Worry About the Vase", author: 'Zvi Mowshowitz', type: 'Newsletter', url: 'https://thezvi.substack.com/', note: 'Exhaustive weekly roundup of everything happening in AI.' },
  { name: 'Import AI', author: 'Jack Clark', type: 'Newsletter', url: 'https://importai.substack.com/', note: 'Weekly read on frontier research and its implications.' },
  { name: 'Hyperdimensional', author: 'Dean Ball', type: 'Newsletter', url: 'https://www.hyperdimensional.co/', note: 'AI policy from a thoughtful, non-doomer angle.' },
  { name: 'Rising Tide', author: 'Helen Toner', type: 'Newsletter', url: 'https://helentoner.substack.com/', note: 'AI strategy and governance from a former OpenAI board member.' },
  { name: 'Gradient Updates', author: 'Epoch AI', type: 'Newsletter', url: 'https://epoch.ai/gradient-updates', note: 'The data and trends behind AI progress.' },
  { name: 'The 80,000 Hours Podcast', author: 'Rob Wiblin et al.', type: 'Podcast', url: 'https://80000hours.org/podcast/', note: 'Long, careful interviews on AI and other big problems.' },
  { name: 'Dwarkesh Podcast', author: 'Dwarkesh Patel', type: 'Podcast', url: 'https://www.dwarkesh.com/', note: 'Deep technical interviews with researchers and lab leaders.' },
  { name: 'Emerging Tech Policy', author: 'Emerging Tech Policy', type: 'Podcast', url: 'https://emergingtechpolicy.org/podcast/', note: 'How to actually work on AI and bio policy.' },
  { name: 'Cold Takes', author: 'Holden Karnofsky', type: 'Blog', url: 'https://www.cold-takes.com/', note: 'The "most important century" series and more.' },
  { name: 'AI Futures Project', author: 'Kokotajlo et al.', type: 'Blog', url: 'https://blog.ai-futures.org/', note: 'Technically-grounded forecasting and scenarios.' },
  { name: 'Astral Codex Ten', author: 'Scott Alexander', type: 'Blog', url: 'https://www.astralcodexten.com/', note: 'Wide-ranging essays; frequent, sharp AI coverage.' },
  { name: 'Anthropic Alignment Science', author: 'Anthropic', type: 'Blog', url: 'https://alignment.anthropic.com/', note: 'Research notes straight from a frontier lab.' },
  { name: 'Redwood Research', author: 'Redwood Research', type: 'Blog', url: 'https://blog.redwoodresearch.org/', note: 'AI control and back-chained alignment strategy.' },
  { name: 'METR', author: 'METR', type: 'Blog', url: 'https://metr.substack.com/', note: 'Measuring what frontier models can actually do.' },
  { name: 'LessWrong', author: 'Community', type: 'Forum', url: 'https://www.lesswrong.com/', note: 'Where a lot of alignment thinking happens in public.' },
  { name: 'AI Alignment Forum', author: 'Community', type: 'Forum', url: 'https://www.alignmentforum.org/', note: 'Technical alignment research and discussion.' },
]

const books = [
  { title: 'If Anyone Builds It, Everyone Dies', authors: 'Eliezer Yudkowsky & Nate Soares', note: 'The starkest version of the case for concern, in one place.' },
  { title: 'The Precipice', authors: 'Toby Ord', note: 'Existential risk from AI and other sources, soberly laid out.' },
  { title: 'Superintelligence', authors: 'Nick Bostrom', note: 'The book that put the alignment problem on the map.' },
]

const fellowships = [
  { name: 'SPAR', track: 'Both', url: 'https://sparai.org/', note: 'Part-time, remote, mentor-led research over three months. The lowest-barrier way to get a real research experience, and a great first step.' },
  { name: 'MATS', track: 'Both', url: 'https://www.matsprogram.org/', note: 'Selective, paid, ~12-week residential program. You are matched with a senior mentor and ship a real project.' },
  { name: 'ERA Fellowship', track: 'Both', url: 'https://erafellowship.org/', note: '8 weeks of fully-funded summer research on technical safety, governance, or technical AI governance.' },
  { name: 'Astra Fellowship', track: 'Both', url: 'https://www.constellation.org/programs/astra-fellowship', note: 'Fully funded, 3-6 month, in-person program at Constellation in Berkeley.' },
  { name: 'CBAI Summer Research Fellowship', track: 'Technical', url: 'https://www.cbai.ai/summer-research-fellowship-26', note: 'Summer technical research fellowship run by the Cambridge Boston Alignment Initiative.' },
  { name: 'UChicago XLab Fellowship', track: 'Both', url: 'https://xrisk.uchicago.edu/fellowship/', note: '10-week, in-person summer program for undergrad and grad students working on existential risk.' },
  { name: 'PIBBSS Fellowship', track: 'Technical', url: 'https://pibbss.ai/fellowship/', note: '3-month interdisciplinary fellowship for researchers studying complex and intelligent behavior.' },
  { name: 'GovAI Fellowships', track: 'Policy', url: 'https://www.governance.ai/opportunities', note: 'Summer and winter programs to help researchers move into AI governance full-time.' },
  { name: 'IAPS Fellowship', track: 'Policy', url: 'https://www.iaps.ai/fellowship', note: 'Fully funded, 3-month program for professionals from varied backgrounds.' },
  { name: 'RAND CAST Fellowship', track: 'Policy', url: 'https://www.rand.org/global-and-emerging-risks/centers/ai-security-and-technology/fellows.html', note: 'Develops policy analysts at the intersection of technology and security, with RAND mentorship.' },
  { name: 'LawAI Research Fellowships', track: 'Policy', url: 'https://law-ai.org/seasonal-research-fellowships/', note: 'Paid AI-law research with close mentorship, for law students, professionals, and academics.' },
  { name: 'Talos Fellowship', track: 'Policy', url: 'https://www.talosnetwork.org/talos-fellowship', note: 'European AI-policy pipeline: online course, a Brussels summit, and an optional paid placement.' },
  { name: 'Vitalik Buterin Fellowships', track: 'Both', url: 'https://futureoflife.org/our-work/grantmaking-work/fellowships/', note: 'Funds PhD students and postdocs working on AI safety and/or US-China AI governance.' },
]

const landscape = [
  {
    group: 'Frontier-lab safety teams',
    orgs: ['Anthropic', 'Google DeepMind', 'OpenAI'],
  },
  {
    group: 'Independent research orgs',
    orgs: ['Redwood Research', 'METR', 'Apollo Research', 'FAR AI', 'Center for AI Safety', 'Epoch AI', 'Transluce', 'Goodfire', 'Haize Labs', 'Gray Swan AI', 'Palisade Research', 'Fulcrum Research', 'MIRI'],
  },
  {
    group: 'Academic groups',
    orgs: ['Algorithmic Alignment Lab (MIT)', 'Bau Lab (Northeastern)', 'CHAI (UC Berkeley)', 'Sam Bowman (NYU)', 'Krueger Lab (Mila)', 'Roger Grosse (Toronto)', 'Tegmark group (MIT)'],
  },
  {
    group: 'Government',
    orgs: ['US CAISI', 'UK AI Security Institute', 'National AI Safety Institutes (Canada, Singapore, Japan, …)'],
  },
  {
    group: 'Funders',
    orgs: ['Open Philanthropy', 'Coefficient Giving', 'Longview Philanthropy'],
  },
]

const advice = [
  { title: '80,000 Hours AI safety & policy job board', url: 'https://jobs.80000hours.org/?refinementList%5Btags_area%5D%5B0%5D=AI%20safety%20%26%20policy' },
  { title: 'AI safety researcher: the 80,000 Hours career review', url: 'https://80000hours.org/career-reviews/ai-safety-researcher/' },
  { title: '67 useful resources for upskilling in technical AI safety', url: 'https://80000hours.org/2025/06/technical-ai-safety-upskilling-resources/' },
  { title: 'AGI safety career advice, by Richard Ngo', url: 'https://www.alignmentforum.org/posts/ho63vCb2MNFijinzY/agi-safety-career-advice' },
  { title: 'ML Safety Research Advice, by Gabe Mukobi', url: 'https://mukobimusings.substack.com/p/ml-safety-research-advice' },
  { title: 'How to work on AI policy (Emerging Tech Policy)', url: 'https://emergingtechpolicy.org/' },
]

export default function ContinuedEngagement() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e]">Continued engagement</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Why now */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#f2f3f7] rounded-xl p-6">
                <h3 className="font-bold text-[#18234e] mb-1">The field is talent-constrained</h3>
                <p className="text-gray-700 text-sm">Demand for AI safety work outpaces the people doing it. Capable, motivated newcomers are genuinely needed.</p>
              </div>
              <div className="bg-[#f2f3f7] rounded-xl p-6">
                <h3 className="font-bold text-[#18234e] mb-1">Timelines may be short</h3>
                <p className="text-gray-700 text-sm">Serious people put real odds on transformative AI within a decade. If that is even partly right, the next few years matter a lot.</p>
              </div>
              <div className="bg-[#f2f3f7] rounded-xl p-6">
                <h3 className="font-bold text-[#18234e] mb-1">You can start now</h3>
                <p className="text-gray-700 text-sm">No permission, lab, or PhD required to begin. The rest of this page is concrete first steps, so pick one.</p>
              </div>
            </div>
          </section>

          {/* Stay in the loop */}
          <section className="mb-16">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-3 text-center">Stay in the loop</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Pick two or three and actually keep up with them. Following the field is the cheapest way to stay engaged between programs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {feeds.map((f) => (
                <a
                  key={f.url}
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                  aria-label={`${f.name} by ${f.author}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge label={f.type} color={typeColors[f.type]} />
                    <span className="ml-auto"><ExternalIcon /></span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#18234e] transition-colors leading-snug">{f.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{f.author}</p>
                  <p className="text-sm text-gray-700 mt-auto">{f.note}</p>
                </a>
              ))}
            </div>

            {/* Books */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#18234e] mb-4 text-center">…or read a book</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {books.map((b) => (
                  <div key={b.title} className="bg-white rounded-lg shadow-md p-5">
                    <h4 className="font-semibold text-gray-900 leading-snug">{b.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{b.authors}</p>
                    <p className="text-sm text-gray-700">{b.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Build skills */}
          <section className="mb-16">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-8 text-center">Build real skills</h2>
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-[#18234e] font-bold flex-shrink-0">1.</span>
                  <span>
                    Work through{' '}
                    <a href="https://learn.arena.education/" target="_blank" rel="noopener noreferrer" className="text-[#18234e] font-semibold hover:underline">ARENA</a>,
                    the standard hands-on curriculum for transformers, RL, mech interp, and evals. See the{' '}
                    <Link href="/resources" className="text-[#18234e] font-semibold hover:underline">resources page</Link> for courses to start with.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#18234e] font-bold flex-shrink-0">2.</span>
                  <span>Replicate a paper you found interesting. Small, finished replications teach more than half-read textbooks.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#18234e] font-bold flex-shrink-0">3.</span>
                  <span>Run a little experiment and write it up on{' '}
                    <a href="https://www.lesswrong.com/" target="_blank" rel="noopener noreferrer" className="text-[#18234e] font-semibold hover:underline">LessWrong</a>{' '}or the{' '}
                    <a href="https://www.alignmentforum.org/" target="_blank" rel="noopener noreferrer" className="text-[#18234e] font-semibold hover:underline">Alignment Forum</a>. Public work is how people find you.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#18234e] font-bold flex-shrink-0">4.</span>
                  <span>Email a grad student, professor, or org whose paper you liked, and ask to help. This works far more often than people expect.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Fellowships */}
          <section className="mb-16">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-3 text-center">Fellowships &amp; programs</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Structured ways to do mentored research over a term or a summer. Deadlines move every year, so if one is closed,
              note it and set a reminder for the next round.
            </p>
            <div className="flex items-center justify-center gap-3 mb-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Badge label="Technical" color={trackColors.Technical} /></span>
              <span className="flex items-center gap-1.5"><Badge label="Policy" color={trackColors.Policy} /></span>
              <span className="flex items-center gap-1.5"><Badge label="Both" color={trackColors.Both} /> research or governance</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fellowships.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-[#18234e]"
                  aria-label={p.name}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge label={p.track} color={trackColors[p.track]} />
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#18234e] transition-colors">{p.name}</h3>
                    <span className="ml-auto"><ExternalIcon /></span>
                  </div>
                  <p className="text-sm text-gray-700">{p.note}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Landscape */}
          <section className="mb-16">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-3 text-center">Who is doing the work</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              A rough map of where technical and policy AI safety happens. Useful for knowing whose papers to read, whose
              talks to watch, and where to eventually apply.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {landscape.map((cat) => (
                <div key={cat.group} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-bold text-[#18234e] mb-3">{cat.group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.orgs.map((o) => (
                      <span key={o} className="inline-block text-sm bg-[#f2f3f7] text-gray-700 rounded-full px-3 py-1">{o}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-6">
              <a
                href="https://www.aisafety.com/landscape-map"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#18234e] font-semibold hover:underline"
              >
                Explore the full landscape map: 340+ orgs, programs, and projects <ExternalIcon />
              </a>
            </p>
          </section>

          {/* Career advice & job boards */}
          <section className="mb-16">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-6 text-center">Career advice &amp; jobs</h2>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 divide-y divide-gray-100">
              {advice.map((a) => (
                <a
                  key={a.url}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0 focus:outline-none"
                  aria-label={a.title}
                >
                  <span className="text-gray-800 group-hover:text-[#18234e] font-medium transition-colors">{a.title}</span>
                  <ExternalIcon />
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-[#18234e] text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-2">Keep going with us</h2>
              <p className="text-white/80 mb-6">
                The easiest place to stay engaged is right here on campus: reading groups, projects, and people working on the same thing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/get-involved"
                  className="inline-flex items-center bg-white text-[#18234e] font-semibold px-6 py-3 rounded-full hover:bg-[#f2f3f7] transition-colors"
                >
                  Get involved with AISCI →
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  Back to resources →
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
