import Link from 'next/link';
import CopyEmail from './CopyEmail';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Explore our Intro Fellowship and Membership programs. Join AI safety reading groups and research at UC Irvine.',
}

export default function GetInvolved() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-[#00386c]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-0">Get Involved</h1>
            <p className="text-xl text-indigo-100 mb-8 pt-8">Join the AISUCI community and make an impact.</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

<div className="flex flex-col gap-8">
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
              <div className="mt-auto pt-6 flex gap-3">
                <Link href="https://forms.gle/TcVH7DSY38p1zrLw6" className="inline-block bg-[#00386c] text-white font-semibold px-6 py-2 rounded hover:bg-[#002b52] transition">
                  Apply Now
                </Link>
                <a href="https://thundering-toy-eb7.notion.site/AI-Safety-Technical-Fundamentals-Syllabus-176d3a55aae78088928ed3094ba9d1a3" target="_blank" rel="noopener noreferrer" className="inline-block border border-[#00386c] text-[#00386c] font-semibold px-6 py-2 rounded hover:bg-[#00386c] hover:text-white transition">
                  Syllabus
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Membership
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Being a member of the AISUCI community has both a number of opportunities and a number of responsibilities. Membership entails:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Compute and research tools</li>
                <li>Weekly member meetings to read and discuss alignment research</li>
                <li>Small group discussions with alignment researchers and professors</li>
                <li>Connections with and potential opportunities to collaborate with top alignment organizations like Redwood Research, the U.S. AI Safety Institute, and METR</li>
                <li>Opportunities to participate in AI safety community workshops &amp; retreats</li>
                <li>Participating in a community of talented students interested in reducing risks from advanced AI (social events and talks, but also fantastic spontaneous discussions.)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Members generally contribute to the community by running or participating in workshops, discussions, socials, hackathons, initiatives and more. While we are a UCI-recognized student group, membership is not restricted to UCI students. Independent researchers and students from other universities are welcome!
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you aren't very familiar with AI safety, we recommend applying for our Technical Intro Fellowship above. We typically offer TIF alumni priority in the application process.
              </p>
              <p className="text-gray-600 text-sm">
                Membership admission is rolling, but the board tends to make decisions every month. If we are slow to respond, please don't hesitate to email us at <CopyEmail email="aisafetyatuci@gmail.com" />.
              </p>
              <div className="mt-auto pt-6 flex gap-3">
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
