import { Metadata } from 'next'
import Link from 'next/link'

const pageTitle = 'Our Mission'
const pageDescription = 'Why the AI Safety Collective at Irvine exists, and what we are trying to do about it.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/mission',
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

export default function Mission() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e] mb-3">Our Mission</h1>
          <p className="text-xl text-gray-600">Why we exist, and what we are trying to do.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-10">
            Experts broadly expect rapid progress in AI to continue, potentially surpassing human intelligence. Already, AI advancement has outpaced our ability to explain its behavior, control its goals, and build robust safeguards. <strong>Reducing risks from advanced AI may be one of the most important challenges of our time.</strong> AISCI is a community of students at UC Irvine dedicated to AI alignment and AI safety: understanding AI behavior, ensuring it reflects human values, and building the technical and political foundations for safe AI development.
          </p>

          <h2 className="text-3xl text-[#18234e] font-semibold mb-8">Want to go deeper?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#18234e] rounded-lg p-10 text-center flex flex-col">
              <p className="text-2xl font-bold text-white mb-2">Explore our resources</p>
              <p className="text-[#f2f3f7] mb-6 flex-grow">Videos, courses, reading lists, and career pointers.</p>
              <Link href="/resources" className="inline-block bg-white text-[#18234e] font-semibold px-8 py-3 rounded-full hover:bg-[#f2f3f7] transition-colors self-center">
                View Resources
              </Link>
            </div>
            <div className="bg-[#18234e] rounded-lg p-10 text-center flex flex-col">
              <p className="text-2xl font-bold text-white mb-2">Get involved</p>
              <p className="text-[#f2f3f7] mb-6 flex-grow">Join our fellowship, come to an event, or apply for membership.</p>
              <Link href="/get-involved" className="inline-block bg-white text-[#18234e] font-semibold px-8 py-3 rounded-full hover:bg-[#f2f3f7] transition-colors self-center">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
