import { Metadata } from 'next'
import Link from 'next/link'

const pageTitle = 'About Us'
const pageDescription = 'Meet the team behind AISCI. Learn about our mission to advance AI alignment research and education at UC Irvine.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/about',
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

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e] mb-3">About Us</h1>
          <p className="text-xl text-gray-600">The people behind AISCI.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-[#18234e] font-semibold mb-4">Who we are</h2>
          <p className="text-lg text-gray-700 mb-4">
            The AI Safety Collective at Irvine (AISCI) is a student-led community at UC Irvine focused on AI alignment and AI safety. We believe that reducing risks from advanced AI is one of the most important open problems of our generation, and we exist to help UCI students engage seriously with that work &mdash; as researchers, engineers, and informed members of the AI community.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our programs span three tracks. The <Link href="/tif" className="text-[#18234e] underline hover:no-underline">Technical Intro Fellowship</Link> is an 8-week reading and discussion group covering the current trajectory of AI, evidence for misalignment, threat models, and technical safety research. Members continue past the fellowship with a weekly research reading group, small-group discussions with alignment researchers and professors, and connections to organizations like Redwood Research, the U.S. AI Safety Institute, and METR. We also run regular socials so new people can find the community quickly.
          </p>
          <p className="text-lg text-gray-700 mb-10">
            AISCI is based on the UCI campus in Irvine, California, and is part of the broader network of university AI safety groups. If you&apos;re a student, researcher, or professor at UC Irvine interested in alignment, safety, or the long-term trajectory of AI, we&apos;d love to meet you &mdash; come to an event, join our Discord, or grab a <Link href="/contact" className="text-[#18234e] underline hover:no-underline">coffee chat</Link>.
          </p>

          <h2 className="text-3xl text-[#18234e] font-semibold mb-4">Our Community</h2>
          <p className="text-lg text-gray-700 mb-8">
            Some moments from our fellowships, reading groups, and socials.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg aspect-[4/3] flex items-center justify-center"
              >
                <span className="text-sm text-gray-400">Photo coming soon</span>
              </div>
            ))}
          </div>

          <div className="bg-[#18234e] rounded-lg p-10 text-center">
            <p className="text-2xl font-bold text-white mb-2">Want to get involved?</p>
            <p className="text-[#f2f3f7] mb-6">Join our fellowship or apply for membership.</p>
            <Link href="/get-involved" className="inline-block bg-white text-[#18234e] font-semibold px-8 py-3 rounded-full hover:bg-[#f2f3f7] transition-colors">
              Get Involved
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}
