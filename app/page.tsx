import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full">
        {/* Hero */}
        <div
          className="bg-gray-50"
          style={{
            backgroundImage:
              'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        >
          <div className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left column */}
              <div>
                <span className="inline-block border border-gray-400 text-gray-500 text-sm px-3 py-1 rounded mb-6">
                  Student-Led Initiative
                </span>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">A community dedicated to reducing risk from advanced AI.</h1>
                <p className="text-xl text-gray-600 mb-8">SOmething something something lorem ipsumSOmething something something lorem ipsumSOmething something something lorem ipsum</p>
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
                    className="inline-block border border-gray-300 hover:border-gray-500 text-gray-700 font-semibold py-3 px-6 rounded-md transition-colors"
                    aria-label="Get Coffee"
                  >
                    Get Coffee
                  </Link>
                </div>
              </div>

              {/* Right column */}
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
      </div>

      <div className="w-full bg-[#18234e]">
        <div className="container mx-auto px-4 py-10 text-center">
          <span className="text-4xl font-extrabold text-white tracking-tight">Intro Fellowship Spring Applications are Open!  </span>
          <a href="https://airtable.com/appKZNlVqsXmdMztH/pag0nLg78TDhj7Uvf/form" target="_blank" rel="noopener noreferrer" className="text-4xl font-extrabold text-white underline underline-offset-4 hover:text-gray-300 transition-colors">
            Apply Now →
          </a>
        </div>
      </div>

      <div className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl text-[#18234e] font-semibold text-gray-900 mb-4 mt-16">Our Mission</h2>
            <p className="text-lg text-gray-600 text-left leading-relaxed mb-8">
              We seek to advance the understanding and development of interpretable and aligned artificial intelligence systems. We are dedicated to addressing the long-term risks and potential harms associated with AI, as we approach the possibility of artificial general intelligence (AGI). Recognizing the profound uniqueness of human intelligence and the existential risks posed by unchecked AI advancement, we commit ourselves to ensuring that AI technologies align with human values and contribute positively to society.
            </p>
          </div>

          <div className="mb-12 max-w-6xl mx-auto">
            <h2 className="text-3xl text-[#18234e] font-semibold text-gray-900 mb-8 text-center mt-16">
              Get Involved
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <Link href="/get-involved" className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-center" aria-label="Programs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#18234e] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0118 19.666V20l-6 3-6-3v-.334a12.083 12.083 0 01-.16-8.088L12 14z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Involved</h3>
                <p className="text-gray-700">Intro fellowships and membership.</p>
              </Link>

              <Link href="/resources" className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-center" aria-label="Events">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#18234e] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Learn</h3>
                <p className="text-gray-700">Self-study with curated resources.</p>
              </Link>
            </div>
          </div>

          <div className="mb-12 max-w-6xl mx-auto">
            <h2 className="text-3xl text-[#18234e] font-semibold text-gray-900 mb-8 text-center mt-16">
              Upcoming Events
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="border-l-4 border-[#18234e] pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Intro Fellowship</h3>
                      <p className="text-gray-600 mt-1">An eight week fellowship covering hallmark papers and key AI Safety concepts.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#18234e]">Thursdays</p>
                      <p className="text-sm text-gray-500">6:00 PM - 8:30 PM</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-[#18234e] pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Membership</h3>
                      <p className="text-gray-600 mt-1">A weekly reading group for students who have completed the Intro Fellowship.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#18234e]">Mondays</p>
                      <p className="text-sm text-gray-500">5:00 PM - 6:30 PM</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-[#18234e] pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">General Meeting</h3>
                      <p className="text-gray-600 mt-1">Our general meeting for all members, 1st and 3rd Tuesdays of the month.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#18234e]">Tuesdays</p>
                      <p className="text-sm text-gray-500">5:00 PM - 7:00 PM</p>
                    </div>
                  </div>
                </div>


                <div className="border-l-4 border-[#18234e] pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Coworking Sessions</h3>
                      <p className="text-gray-600 mt-1">Collaborative work on AI safety projects, 2nd and 4th Tuesdays of the month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#18234e]">Tuesdays</p>
                      <p className="text-sm text-gray-500">5:00 PM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="https://docs.google.com/spreadsheets/d/1Xun0Q1a25BVLKvJEjkixesrgcR30k7nqQQX1CB94tlU/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#18234e] hover:text-[#111a3b] font-semibold"
                >
                  View Full Calendar →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
