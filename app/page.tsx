import Link from 'next/link'
import Image from 'next/image'
import MailingListForm from './components/MailingListForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div
        className="bg-gray-50"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      >
        <div className="container mx-auto px-4 py-10 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">A community dedicated to reducing risk from advanced AI.</h1>
              <p className="text-xl text-gray-600 mb-8"></p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://discord.gg/uENtNdDPPb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#18234e] hover:bg-[#111a3b] text-white font-semibold py-3 px-6 rounded-md shadow transition-colors"
                  aria-label="Join our Discord"
                >
                  Join Discord
                </a>
                <Link
                  href="/contact"
                  className="inline-block border border-gray-400 hover:border-gray-600 bg-gray-50 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-md transition-colors"
                  aria-label="Get Coffee"
                >
                  Get Coffee
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/images/asinglenet.png"
                alt="Neural network illustration"
                width={500}
                height={400}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#18234e]">
        <div className="container mx-auto px-4 py-12 text-center">
          <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            Spring 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Intro Fellowship Applications Are Closed
          </h2>
          <p className="text-white/70 text-lg mb-7 max-w-xl mx-auto">
            Applications for Spring 2026 are now closed. Join our mailing list to get notified when they reopen.
          </p>
          <div className="flex justify-center">
            <MailingListForm variant="dark" />
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#18234e] mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experts broadly expect rapid progress in AI to continue, potentially surpassing human intelligence. Already, AI advancement has outpaced our ability to explain its behavior, control its goals, and build robust safeguards. <strong>Reducing risks from advanced AI may be one of the most important challenges of our time.</strong> We are a community of students at UC Irvine dedicated to understanding AI behavior, ensuring it reflects human values, and building the technical and political foundations for safe AI development.
            </p>
            <div className="text-center mt-6">
              <Link href="/resources" className="text-sm text-gray-400 hover:text-[#18234e] transition-colors">
                Read more →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#18234e] mb-10 text-center">Get Involved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Link
                href="/get-involved"
                className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md hover:border-[#18234e]/30 transition-all text-center"
                aria-label="Programs"
              >
                <div className="w-14 h-14 rounded-lg bg-[#18234e]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#18234e]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#18234e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0118 19.666V20l-6 3-6-3v-.334a12.083 12.083 0 01-.16-8.088L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fellowship & Membership</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">Join our 8-week Intro Fellowship or continue as a full member in our weekly reading group.</p>
                <span className="mt-5 text-[#18234e] text-sm font-semibold group-hover:underline">Learn more →</span>
              </Link>

              <Link
                href="/resources"
                className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md hover:border-[#18234e]/30 transition-all text-center"
                aria-label="Resources"
              >
                <div className="w-14 h-14 rounded-lg bg-[#18234e]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#18234e]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#18234e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Learn</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">Self-study AI safety with our curated reading lists, lecture series, and research resources.</p>
                <span className="mt-5 text-[#18234e] text-sm font-semibold group-hover:underline">Browse resources →</span>
              </Link>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">Get occasional updates from AISCI:</p>
              <div className="flex justify-center">
                <MailingListForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="events" className="w-full bg-white scroll-mt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#18234e] mb-2 text-center">Our Events</h2>
            <p className="text-gray-500 text-center mb-10">Click any event for details, or use the + Google Calendar button to subscribe and get updates automatically.</p>
            <div>
              <div className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&showTitle=0&showCalendars=0&src=NDg2OTI3NzUyZWFlYzI3OWNlNDk3MzRjYjVhMzVkZGE4MDMxNDBlMjVhYjBhZWJkM2EyMTRlZTJiZmFiMTU4ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23616161"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  title="AISCI Calendar"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
