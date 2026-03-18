import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind AI Safety at UCI. Learn about our mission to advance AI alignment research and education at UC Irvine.',
}

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e] mb-3">About Us</h1>
          <p className="text-xl text-gray-600">The people behind AISUCI.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
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
