import Link from 'next/link';
import CopyEmail from './CopyEmail';
import { Metadata } from 'next'

const pageTitle = 'Get Involved'
const pageDescription = 'Explore our Intro Fellowship and Membership programs. Join AI safety reading groups and research at UC Irvine.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/get-involved',
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

const faqs = [
  {
    q: 'Is there an AI safety club at UCI?',
    a: 'Yes — AISCI (the AI Safety Collective at Irvine) is UC Irvine\'s student-led community for AI safety and AI alignment. We run a quarterly Technical Intro Fellowship, a weekly member reading group, workshops, and socials. Anyone at UCI interested in the field is welcome to join Discord or grab a coffee chat.',
  },
  {
    q: 'What is AI safety?',
    a: 'AI safety is the field of research focused on making advanced AI systems behave in ways that are safe, controllable, and aligned with human values — especially as those systems become more capable. It includes technical work on interpretability, robustness, scalable oversight, and evaluation, as well as governance and policy work on how AI is deployed.',
  },
  {
    q: 'What is AI alignment?',
    a: 'AI alignment is a subfield of AI safety focused specifically on making sure AI systems pursue the goals we actually want them to pursue, rather than something subtly different. Many researchers consider it one of the core technical problems in ensuring advanced AI goes well.',
  },
  {
    q: 'How do I join AI safety research at UCI?',
    a: 'The typical path is: (1) apply to the Technical Intro Fellowship to get grounded in the field, (2) continue as an AISCI member for weekly research reading and discussion, (3) work on research projects with the group or through external programs like Redwood Research, the U.S. AI Safety Institute, METR, or MATS. You can also start by attending any of our events or booking a coffee chat with a co-director.',
  },
  {
    q: 'Do I need a technical background to join?',
    a: 'No. The Intro Fellowship assumes no AI or ML background. Membership and board roles have a mix of technical and non-technical people — there\'s meaningful work on the governance, policy, and field-building side too.',
  },
  {
    q: 'When does the Intro Fellowship run?',
    a: 'Every quarter. Sessions meet Thursdays 5–7 PM in HICF 100K at UC Irvine, with dinner provided. Applications open roughly a month before each quarter starts.',
  },
  {
    q: 'Is AISCI part of UC Irvine?',
    a: 'AISCI is a UCI-recognized student organization based on the UC Irvine campus in Irvine, California. We are student-led and student-run. Membership is primarily UCI students, but independent researchers and students from other universities are welcome.',
  },
]

const membershipBenefits = [
  'Free Claude Pro / Claude Code subscription',
  'Compute and research tools',
  'Weekly member meetings to read and discuss alignment research',
  'Small group discussions with alignment researchers and professors',
  'Connections with top orgs like Redwood Research, the U.S. AI Safety Institute, and METR',
  'Opportunities for AI safety community workshops & retreats',
  'A community of talented students interested in reducing risks from advanced AI',
]

export default function GetInvolved() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e] mb-3">Get Involved</h1>
          <p className="text-xl text-gray-600">Join the AISCI community and make an impact.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-8">

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Technical Intro Fellowship
                </h2>
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>
                  Spring 2026 · Closed
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                An 8-week reading group on technical AI safety. Participants meet weekly in small sections on Thursdays from 5–7pm in HICF 100K, with dinner provided. No work is expected outside of weekly meetings.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Topics include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>AI risk and the current trajectory of AI development</li>
                <li>Scalable oversight</li>
                <li>Mechanistic interpretability</li>
                <li>Robustness and unlearning</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Open to undergraduate and graduate students. Participants receive a completion certificate and early access to membership opportunities.
              </p>
              <p className="text-gray-600 text-sm">
                We run the fellowship every quarter.
              </p>
              <div className="mt-auto pt-6 flex gap-3">
                <span className="inline-block bg-gray-300 text-gray-500 font-semibold px-6 py-2 rounded cursor-not-allowed">
                  Applications Closed
                </span>
                <Link href="/tif" className="inline-block border border-[#18234e] text-[#18234e] font-semibold px-6 py-2 rounded hover:bg-[#18234e] hover:text-white transition">
                  Syllabus
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Membership
                </h2>
                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  Rolling Admissions
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Being a member of the AISCI community comes with both opportunities and responsibilities. Membership includes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {membershipBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#18234e] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Members generally contribute by running or participating in workshops, discussions, socials, hackathons, and more. While we are a UCI-recognized student group, membership is not restricted to UCI students — independent researchers and students from other universities are welcome.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you aren't very familiar with AI safety, we recommend applying for our Technical Intro Fellowship above. We typically offer fellowship alumni priority in the application process.
              </p>
              <p className="text-gray-600 text-sm">
                Membership admission is rolling, but the board tends to make decisions every month. If we are slow to respond, please don't hesitate to email us at <CopyEmail email="aisafetyatuci@gmail.com" />.
              </p>
              <div className="mt-auto pt-6 flex gap-3">
                <a href="https://airtable.com/appKZNlVqsXmdMztH/pagMczb6lf65AJyB8/form" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition">
                  Apply Now
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Board</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We're always looking for motivated people to help run AISCI. Board members organize fellowships, events, workshops, and outreach, as well as steer the direction of the group.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We value people who are genuinely excited about AI safety. There's no single mold, but we look for responsible, agentic, and high-context individuals who have demonstrated commitment to our mission.
              </p>
              <p className="text-gray-600 text-sm mb-6">
                The best first step is a conversation. Book a coffee chat and tell us what you're interested in.
              </p>
              <div className="mt-auto flex gap-3">
                <a href="https://calendly.com/helenatran9305" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition">
                  Coffee with Helena
                </a>
                <a href="https://calendar.app.google/mdAMY9qTR4kBcqb88" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition">
                  Coffee with Harry
                </a>
              </div>
            </div>

          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#18234e] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </main>
  )
}
