import Link from 'next/link';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs',
  description: 'Explore our Intro Fellowship and Advanced Fellowship programs. Join reading groups, research projects, and workshops in AI safety at UC Irvine.',
}

export default function Programs() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-[#00386c]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-0">Programs</h1>
            <p className="text-xl text-indigo-100 mb-8 pt-8">Alignment at every level.</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-8">
            <h2 className="text-3xl text-[#00386c] font-semibold text-gray-900 mb-2">Get Involved</h2>
            <p className="text-lg text-gray-600">We offer two programs, designed to be taken sequentially — and there's free food provided at meetings!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Intro Fellowship
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                An eight week fellowship covering hallmark papers and key AI Safety concepts.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Meet 1x/week for 2 hours for 8 weeks</li>
                <li>Introduction to alignment research</li>

              </ul>
              <div className="mt-auto pt-6">
                <Link href="https://forms.gle/TcVH7DSY38p1zrLw6" className="inline-block bg-[#00386c] text-white font-semibold px-6 py-2 rounded hover:bg-[#002b52] transition">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Alignment Research Incubator
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hands-on technical AI alignment research for students who have completed the Intro Fellowship.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><a href="https://arena-chapter0-fundamentals.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-[#00386c] font-semibold underline">ARENA</a> curriculum: Deep Learning/Mech Interp/Evals/RL</li>
                <li>AI Demos for Policy Makers</li>
                <li>Independent Research (compute funding available.)</li>
              </ul>
              <div className="mt-auto pt-6">
                <Link href="https://forms.gle/6szuUD4Ti8q1hHrp7" className="inline-block bg-[#00386c] text-white font-semibold px-6 py-2 rounded hover:bg-[#002b52] transition">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
