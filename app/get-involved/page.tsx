import Link from 'next/link';
import CopyEmail from './CopyEmail';
import Faqs from './Faqs';
import { Metadata } from 'next'
import { programsByKey, statusBadgeClasses, type Program } from '../data/programs'
import { links, meeting } from '../data/links'

function StatusBadge({ status }: { status: Program['status'] }) {
  const badge = statusBadgeClasses[status.tone]
  return (
    <span className={`inline-flex items-center gap-1.5 ${badge.wrap} text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0`}>
      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot} inline-block`}></span>
      {status.label}
    </span>
  )
}

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
    a: 'Yes, AISCI (the AI Safety Collective at Irvine) is UC Irvine\'s student-led community for AI safety and AI alignment. We run a quarterly Technical Intro Fellowship, a weekly member reading group, workshops, and socials. Anyone at UCI interested in the field is welcome to join Discord or grab a coffee chat.',
  },
  {
    q: 'What is AI safety?',
    a: 'AI safety is the field of research focused on making advanced AI systems behave in ways that are safe, controllable, and aligned with human values, especially as those systems become more capable. It includes technical work on interpretability, robustness, scalable oversight, and evaluation, as well as governance and policy work on how AI is deployed.',
  },
  {
    q: 'What is AI alignment?',
    a: 'AI alignment is a subfield of AI safety focused specifically on making sure AI systems pursue the goals we actually want them to pursue, rather than something subtly different. Many researchers consider it one of the core technical problems in ensuring advanced AI goes well.',
  },
  {
    q: 'How do I join AI safety research at UCI?',
    a: 'The typical path is: (1) apply to the Technical Intro Fellowship to get grounded in the field, (2) continue as an AISCI member for weekly research reading and discussion, (3) work on research projects with the group or through external programs like Redwood Research, the U.S. AI Safety Institute, METR, or MATS. If you\'re not ready to apply yet, browse our /resources page to get oriented, or book a coffee chat with a co-director.',
  },
  {
    q: 'Do I need a technical background to join?',
    a: 'No. The Intro Fellowship assumes no AI or ML background. Membership and board roles have a mix of technical and non-technical people. There\'s meaningful work on the governance, policy, and field-building side too.',
  },
  {
    q: 'When does the Intro Fellowship run?',
    a: `Every quarter. Sessions meet ${meeting.day} ${meeting.time} in ${meeting.room} at UC Irvine, with dinner provided. Applications open roughly a month before each quarter starts.`,
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
  const intro = programsByKey.intro
  const policy = programsByKey.policy
  const membership = programsByKey.membership
  const board = programsByKey.board
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
                <StatusBadge status={intro.status} />
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                An 8-week reading group on technical AI safety. Participants meet weekly in small sections on {meeting.day} from {meeting.time} in {meeting.room}, with dinner provided. No work is expected outside of weekly meetings.
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
                <a href={intro.applyHref} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition">
                  Apply
                </a>
                <Link href="/tif" className="inline-block border border-[#18234e] text-[#18234e] font-semibold px-6 py-2 rounded hover:bg-[#18234e] hover:text-white transition">
                  Syllabus
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Policy Fellowship
                </h2>
                <StatusBadge status={policy.status} />
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                A reading group on AI policy and governance. Explore how policymakers, researchers, and institutions are working to make AI development go well, and what students can do to contribute.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Open to undergraduate and graduate students from any background. No prior AI or policy experience required.
              </p>
              <div className="mt-auto pt-2 flex gap-3">
                <a href={policy.applyHref} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition">
                  Apply
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Membership
                </h2>
                <StatusBadge status={membership.status} />
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
                Members generally contribute by running or participating in workshops, discussions, socials, hackathons, and more. While we are a UCI-recognized student group, membership is not restricted to UCI students; independent researchers and students from other universities are welcome.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you aren't very familiar with AI safety, we recommend applying to one or both of our fellowships above and browsing our <Link href="/resources" className="text-[#18234e] underline hover:no-underline">resources</Link>. Fellowship alumni typically receive priority in the application process.
              </p>
              <p className="text-gray-600 text-sm">
                Membership admission is rolling, but the board tends to make decisions every month. If we are slow to respond, please don't hesitate to email us at <CopyEmail email={links.email} />.
              </p>
              <div className="mt-auto pt-6 flex gap-3">
                <a href={membership.applyHref} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition">
                  Apply
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Facilitator / Board</h2>
                <StatusBadge status={board.status} />
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Facilitators lead small-group discussions in our Technical Intro Fellowship. Board members organize fellowships, events, workshops, and outreach, and steer the direction of the group.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We look for people who are genuinely excited about AI safety: responsible, agentic, and high-context, with demonstrated commitment to the mission.
              </p>
              <div className="mt-auto flex gap-3">
                {board.secondary && (
                  <a href={board.secondary.href} target="_blank" rel="noopener noreferrer" className="inline-block border border-[#18234e] text-[#18234e] font-semibold px-6 py-2 rounded hover:bg-[#18234e] hover:text-white transition">
                    {board.secondary.label}
                  </a>
                )}
                <a href={board.applyHref} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-2 rounded hover:bg-[#111a3b] transition">
                  Apply
                </a>
              </div>
            </div>

          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#18234e] mb-8">Frequently Asked Questions</h2>
            <Faqs faqs={faqs} />
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
