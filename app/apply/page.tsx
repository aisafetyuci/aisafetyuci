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
          <h1 className="text-5xl font-bold text-[#18234e] mb-3">Apply</h1>
          <p className="text-xl text-gray-600">Help us run AISCI.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-3xl mx-auto">
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
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
