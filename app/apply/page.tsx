import { Metadata } from 'next'
import Link from 'next/link'
import { programs, statusBadgeClasses } from '../data/programs'

const pageTitle = 'Apply'
const pageDescription = 'Apply to AISCI fellowships, membership, or board.'

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
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {programs.map((p) => {
            const badge = statusBadgeClasses[p.status.tone]
            return (
            <div
              key={p.title}
              className="bg-white rounded-lg shadow border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-900">{p.title}</h2>
                  <span className={`inline-flex items-center gap-1.5 ${badge.wrap} text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot} inline-block`}></span>
                    {p.status.label}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{p.blurb}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {p.secondary && (
                  <a
                    href={p.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-[#18234e] text-[#18234e] font-semibold px-4 py-2 rounded hover:bg-[#18234e] hover:text-white transition text-sm"
                  >
                    {p.secondary.label}
                  </a>
                )}
                <a
                  href={p.applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#18234e] text-white font-semibold px-5 py-2 rounded hover:bg-[#111a3b] transition text-sm"
                >
                  Apply
                </a>
              </div>
            </div>
            )
          })}

          <p className="text-sm text-gray-500 mt-4 text-center">
            Curious what these are? See{' '}
            <Link href="/get-involved" className="text-[#18234e] underline hover:no-underline">
              /get-involved
            </Link>{' '}
            for details, or browse our{' '}
            <Link href="/resources" className="text-[#18234e] underline hover:no-underline">
              resources
            </Link>{' '}
            to get oriented first.
          </p>
        </div>
      </div>
    </main>
  )
}
