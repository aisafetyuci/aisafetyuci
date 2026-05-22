import { Metadata } from 'next'

const pageTitle = 'Apply'
const pageDescription = 'Apply to join AISCI as a facilitator or board member.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/apply',
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

export default function Apply() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e]">Apply</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Intro Fellowship — Fall 2026</h2>
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Applications Open
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              An 8-week reading group on technical AI safety. Sessions meet weekly on Thursdays 5–7 PM in HICF 100K, with dinner provided. No work is expected outside of weekly meetings.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Open to undergraduate and graduate students. No prior AI or ML background required. Participants receive a completion certificate and early access to membership.
            </p>
            <div className="mt-auto flex gap-3">
              <a
                href="https://airtable.com/appKZNlVqsXmdMztH/pagFgRZ9bLP6ZfZbt/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition"
              >
                Apply to the Fellowship
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Policy Fellowship — Fall 2026</h2>
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Applications Open
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              A reading group on AI policy and governance. Explore how policymakers, researchers, and institutions are working to make AI development go well. Open to undergraduate and graduate students from any background.
            </p>
            <div className="mt-auto flex gap-3">
              <a
                href="https://airtable.com/appKZNlVqsXmdMztH/pagAV3fJFiimd0sRq/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition"
              >
                Apply to the Fellowship
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Facilitator / Board</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Facilitators lead small-group discussions in our Technical Intro Fellowship. Board members organize fellowships, events, workshops, and outreach, and steer the direction of the group.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We look for people who are genuinely excited about AI safety — responsible, agentic, and high-context, with demonstrated commitment to the mission.
            </p>
            <div className="mt-auto flex gap-3">
              <a
                href="https://airtable.com/appKZNlVqsXmdMztH/pagO6NP1r12Fp7rX3/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition"
              >
                Apply as Facilitator / Board
              </a>
              <a
                href="https://docs.google.com/document/d/14FKNS9ckp-80HMVtT5wcCNtriQfRU7UXC6qZoLsLWrE/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#18234e] text-[#18234e] font-semibold px-6 py-2 rounded hover:bg-[#18234e] hover:text-white transition"
              >
                Read Recruitment Doc
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
