import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Curated resources for learning AI safety and alignment. Access research papers, tutorials, and community links to advance your understanding.',
}

export default function Resources() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-[#00386c]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-0">Resources</h1>
            <p className="text-xl text-indigo-100 mb-8 pt-8">Nail down fundamentals and explore the community.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

          <section className="mb-12">
            <h2 className="text-3xl text-[#00386c] font-semibold text-gray-900 mb-6 text-center">Foundational</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <a href="https://www.youtube.com/watch?v=pYXy-A4siMw" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Intro to AI Safety by Robert Miles (2021)">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Intro to AI Safety</h3>
                    <p className="text-sm text-gray-600 mb-3">Robert Miles · 2021 · YouTube</p>
                    <p className="text-gray-700">A clear, accessible introduction to core AI safety concepts and motivations.</p>
                  </div>
                </div>
              </a>

              <a href="https://www.nytimes.com/2023/05/30/technology/ai-threat-warning.html" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="A.I. Poses 'Risk of Extinction,' Industry Leaders Warn">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">A.I. Poses 'Risk of Extinction'</h3>
                    <p className="text-sm text-gray-600 mb-3">New York Times · 2023 · Article</p>
                    <p className="text-gray-700">Industry leaders and experts sign statement warning about existential risks from AI.</p>
                  </div>
                </div>
              </a>

              <a href="https://www.cold-takes.com/cold-takes-on-ai/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Cold Takes on AI by Holden Karnofsky">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Cold Takes on AI</h3>
                    <p className="text-sm text-gray-600 mb-3">Holden Karnofsky · Blog Series</p>
                    <p className="text-gray-700">In-depth explorations of AI risks and alignment challenges from the CEO of Open Philanthropy.</p>
                  </div>
                </div>
              </a>

              <a href="https://www.planned-obsolescence.org" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Planned Obsolescence Blog">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Planned Obsolescence</h3>
                    <p className="text-sm text-gray-600 mb-3">Ajeya Cotra & Kelsey Piper · Blog</p>
                    <p className="text-gray-700">High-level perspectives on AI safety concerns from researchers at Open Philanthropy and Vox.</p>
                  </div>
                </div>
              </a>

              <a href="https://joecarlsmith.com/2023/03/22/existential-risk-from-power-seeking-ai-shorter-version" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Is Power-Seeking AI an Existential Risk?">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Is Power-Seeking AI an Existential Risk?</h3>
                    <p className="text-sm text-gray-600 mb-3">Joe Carlsmith · 2023 · Essay</p>
                    <p className="text-gray-700">A rigorous analysis of existential risks from advanced AI systems seeking power.</p>
                  </div>
                </div>
              </a>

              <a href="https://www.technologyreview.com/2023/05/02/1072528/geoffrey-hinton-google-why-scared-ai/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Geoffrey Hinton Interview on AI Risk">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Why Geoffrey Hinton is Scared of AI</h3>
                    <p className="text-sm text-gray-600 mb-3">MIT Technology Review · 2023 · Interview</p>
                    <p className="text-gray-700">The "godfather of AI" explains why he left Google and his concerns about the technology he helped create.</p>
                  </div>
                </div>
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl text-[#00386c] font-semibold text-gray-900 mb-6 text-center">Technical</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <a href="https://transformer-circuits.pub/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Anthropic's Transformer Circuits Thread">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Transformer Circuits Thread</h3>
                    <p className="text-sm text-gray-600 mb-3">Anthropic · Research Collection</p>
                    <p className="text-gray-700">Collection of articles on analyzing neural network weights and interpretability.</p>
                  </div>
                </div>
              </a>

              <a href="https://www.neelnanda.io/mechanistic-interpretability/getting-started" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Getting Started with Mechanistic Interpretability">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Getting Started with Mech Interp</h3>
                    <p className="text-sm text-gray-600 mb-3">Neel Nanda · Guide</p>
                    <p className="text-gray-700">Beginner's guide to mechanistic interpretability with concrete steps.</p>
                  </div>
                </div>
              </a>

              <a href="https://github.com/neelnanda-io/TransformerLens" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="TransformerLens Library">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">TransformerLens</h3>
                    <p className="text-sm text-gray-600 mb-3">Neel Nanda · Python Library</p>
                    <p className="text-gray-700">Python library for doing mechanistic interpretability on GPT-2-style language models.</p>
                  </div>
                </div>
              </a>

              <a href="https://arxiv.org/abs/2212.08073" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Constitutional AI Paper">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Constitutional AI</h3>
                    <p className="text-sm text-gray-600 mb-3">Anthropic · 2022 · Paper</p>
                    <p className="text-gray-700">Harmlessness from AI feedback—using principles to guide model behavior.</p>
                  </div>
                </div>
              </a>

              <a href="https://arxiv.org/abs/2305.15324" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Model Evaluations for Extreme Risks">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Evaluations for Extreme Risks</h3>
                    <p className="text-sm text-gray-600 mb-3">DeepMind · 2023 · Paper</p>
                    <p className="text-gray-700">Framework for identifying and evaluating novel AI risks before deployment.</p>
                  </div>
                </div>
              </a>

              <a href="https://arxiv.org/abs/2210.01790" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Goal Misgeneralization Paper">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Goal Misgeneralization</h3>
                    <p className="text-sm text-gray-600 mb-3">DeepMind · 2022 · Paper</p>
                    <p className="text-gray-700">Analysis of how AI systems can retain capabilities while pursuing unintended objectives.</p>
                  </div>
                </div>
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl text-[#00386c] font-semibold text-gray-900 mb-6 text-center">Training</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <a href="https://www.aisafety.com/events-and-training" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="AI Safety Events and Training">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Events and Training</h3>
                    <p className="text-sm text-gray-600 mb-3">AI Safety · Programs</p>
                    <p className="text-gray-700">Discover upcoming AI safety events, workshops, and training programs to develop your skills.</p>
                  </div>
                </div>
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
