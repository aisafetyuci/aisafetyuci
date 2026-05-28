import { Metadata } from 'next'

const pageTitle = 'Grab a coffee'
const pageDescription = "Book a 30-minute coffee chat with AISCI. We'll buy."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/coffee',
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

export default function Coffee() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-16 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#18234e] mb-4">Grab a coffee with us</h1>
          <p className="text-lg text-gray-600 mb-10">
            We love meeting people who are curious about AI safety; no background needed. Book a 30-minute chat and we&rsquo;ll buy you coffee and cover whatever&rsquo;s on your mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://calendly.com/helenatran9305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#18234e] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#111a3b] transition-colors"
            >
              Coffee with Helena
            </a>
            <a
              href="https://calendar.app.google/mdAMY9qTR4kBcqb88"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#18234e] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#111a3b] transition-colors"
            >
              Coffee with Harry
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
