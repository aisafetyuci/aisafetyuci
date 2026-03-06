import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind AI Safety at UCI. Learn about our mission to advance AI alignment research and education at UC Irvine.',
}

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-[#18234e]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-0">About Us</h1>
            <p className="text-xl text-[#f2f3f7] mb-8 pt-8">The people behind AISUCI.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              AI Safety at UCI is a student-run organization at UC Irvine dedicated to the study and practice of AI alignment. We run technical reading groups, host a quarterly intro fellowship, and connect students with the broader AI safety research community.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our goal is to build a community of thoughtful, technically capable people who take AI risk seriously — and who want to do something about it.
            </p>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img src="/images/team/helenatranheadshot.jpg" alt="Helena Tran" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Helena Tran</h3>
              <p className="text-sm text-gray-500">President</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img src="/images/team/azalea-kasiri.svg" alt="Azalea Kasiri" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Azalea Kasiri</h3>
              <p className="text-sm text-gray-500">Officer</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img src="/images/team/rylen-choi.svg" alt="Rylen Choi" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Rylen Choi</h3>
              <p className="text-sm text-gray-500">Officer</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img src="/images/team/achyuta-raghunathan.svg" alt="Achyuta Raghunathan" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Achyuta Raghunathan</h3>
              <p className="text-sm text-gray-500">Officer</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <img src="/images/team/harry-waterman.svg" alt="Harry Waterman" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Harry Waterman</h3>
              <p className="text-sm text-gray-500">Officer</p>
            </div>
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
