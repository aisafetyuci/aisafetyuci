import { Metadata } from 'next'

const pageTitle = 'Resources'
const pageDescription = 'Curated resources for learning AI safety and alignment. Access research papers, tutorials, and community links to advance your understanding.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/resources',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
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

export default function Resources() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e] mb-3">Resources</h1>
          <p className="text-xl text-gray-600">Nail down fundamentals and explore the community.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">

          <section className="mb-12">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-6 text-center">Foundational</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <a href="https://www.youtube.com/watch?v=pYXy-A4siMw" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Intro to AI Safety by Robert Miles (2021)">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Video" color="bg-red-100 text-red-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Intro to AI Safety</h3>
                <p className="text-sm text-gray-600 mb-3">Robert Miles · 2021</p>
                <p className="text-gray-700">A clear, accessible introduction to core AI safety concepts and motivations.</p>
              </a>

              <a href="https://www.nytimes.com/2023/05/30/technology/ai-threat-warning.html" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="A.I. Poses 'Risk of Extinction,' Industry Leaders Warn">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Article" color="bg-sky-100 text-sky-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">A.I. Poses 'Risk of Extinction'</h3>
                <p className="text-sm text-gray-600 mb-3">New York Times · 2023</p>
                <p className="text-gray-700">Industry leaders and experts sign statement warning about existential risks from AI.</p>
              </a>

              <a href="https://www.cold-takes.com/cold-takes-on-ai/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Cold Takes on AI by Holden Karnofsky">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Blog" color="bg-emerald-100 text-emerald-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Cold Takes on AI</h3>
                <p className="text-sm text-gray-600 mb-3">Holden Karnofsky</p>
                <p className="text-gray-700">In-depth explorations of AI risks and alignment challenges from the CEO of Open Philanthropy.</p>
              </a>

              <a href="https://www.planned-obsolescence.org" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Planned Obsolescence Blog">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Blog" color="bg-emerald-100 text-emerald-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Planned Obsolescence</h3>
                <p className="text-sm text-gray-600 mb-3">Ajeya Cotra & Kelsey Piper</p>
                <p className="text-gray-700">High-level perspectives on AI safety concerns from researchers at Open Philanthropy and Vox.</p>
              </a>

              <a href="https://joecarlsmith.com/2023/03/22/existential-risk-from-power-seeking-ai-shorter-version" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Is Power-Seeking AI an Existential Risk?">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Essay" color="bg-violet-100 text-violet-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Is Power-Seeking AI an Existential Risk?</h3>
                <p className="text-sm text-gray-600 mb-3">Joe Carlsmith · 2023</p>
                <p className="text-gray-700">A rigorous analysis of existential risks from advanced AI systems seeking power.</p>
              </a>

              <a href="https://www.technologyreview.com/2023/05/02/1072528/geoffrey-hinton-google-why-scared-ai/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Geoffrey Hinton Interview on AI Risk">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Interview" color="bg-amber-100 text-amber-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Why Geoffrey Hinton is Scared of AI</h3>
                <p className="text-sm text-gray-600 mb-3">MIT Technology Review · 2023</p>
                <p className="text-gray-700">The "godfather of AI" explains why he left Google and his concerns about the technology he helped create.</p>
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-6 text-center">Technical</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <a href="https://transformer-circuits.pub/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Anthropic's Transformer Circuits Thread">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Research" color="bg-indigo-100 text-indigo-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Transformer Circuits Thread</h3>
                <p className="text-sm text-gray-600 mb-3">Anthropic</p>
                <p className="text-gray-700">Collection of articles on analyzing neural network weights and interpretability.</p>
              </a>

              <a href="https://www.neelnanda.io/mechanistic-interpretability/getting-started" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Getting Started with Mechanistic Interpretability">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Guide" color="bg-teal-100 text-teal-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Getting Started with Mech Interp</h3>
                <p className="text-sm text-gray-600 mb-3">Neel Nanda</p>
                <p className="text-gray-700">Beginner's guide to mechanistic interpretability with concrete steps.</p>
              </a>

              <a href="https://alignment.anthropic.com/2026/psm/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="The Persona Selection Model">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Paper" color="bg-[#18234e]/10 text-[#18234e]" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">The Persona Selection Model</h3>
                <p className="text-sm text-gray-600 mb-3">Marks, Lindsey, Olah · Anthropic 2026</p>
                <p className="text-gray-700">LLMs learn to simulate diverse characters during pre-training; post-training elicits a particular Assistant persona — with implications for AI psychology and development.</p>
              </a>

              <a href="https://arxiv.org/abs/2212.08073" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Constitutional AI Paper">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Paper" color="bg-[#18234e]/10 text-[#18234e]" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Constitutional AI</h3>
                <p className="text-sm text-gray-600 mb-3">Anthropic · 2022</p>
                <p className="text-gray-700">Harmlessness from AI feedback—using principles to guide model behavior.</p>
              </a>

              <a href="https://arxiv.org/abs/2305.15324" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Model Evaluations for Extreme Risks">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Paper" color="bg-[#18234e]/10 text-[#18234e]" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Evaluations for Extreme Risks</h3>
                <p className="text-sm text-gray-600 mb-3">DeepMind · 2023</p>
                <p className="text-gray-700">Framework for identifying and evaluating novel AI risks before deployment.</p>
              </a>

              <a href="https://arxiv.org/abs/2210.01790" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Goal Misgeneralization Paper">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Paper" color="bg-[#18234e]/10 text-[#18234e]" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Goal Misgeneralization</h3>
                <p className="text-sm text-gray-600 mb-3">DeepMind · 2022</p>
                <p className="text-gray-700">Analysis of how AI systems can retain capabilities while pursuing unintended objectives.</p>
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl text-[#18234e] font-semibold mb-6 text-center">Training + Continued Engagement</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <a href="https://www.aisafety.com/events-and-training" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="AI Safety Events and Training">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Programs" color="bg-orange-100 text-orange-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Events and Training</h3>
                <p className="text-sm text-gray-600 mb-3">AI Safety</p>
                <p className="text-gray-700">Discover upcoming AI safety events, workshops, and training programs to develop your skills.</p>
              </a>

              <a href="https://docs.google.com/document/d/1HDslg5FyVXqROnmUDDVVnOBolo-ktkO4LfSrYlEGDOc/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-[#18234e]" aria-label="Continued Engagement Resources">
                <div className="flex items-start justify-between mb-3">
                  <Badge label="Guide" color="bg-teal-100 text-teal-700" />
                  <ExternalIcon />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Continued Engagement Resources</h3>
                <p className="text-sm text-gray-600 mb-3">AISCI</p>
                <p className="text-gray-700">Reading sources, Twitter lists, fellowship opportunities, technical upskilling programs, and job boards to stay engaged with AI safety.</p>
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
