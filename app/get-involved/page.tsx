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

function StepMarker({ number, last = false }: { number: number; last?: boolean }) {
  return (
    <div aria-hidden="true" className="hidden sm:block">
      {!last && <div className="absolute -bottom-12 left-4 top-12 w-px bg-brand-border sm:left-6 sm:top-16" />}
      <span className={`absolute left-0 top-5 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold sm:top-8 sm:h-12 sm:w-12 sm:text-lg ${last ? 'border-brand bg-brand text-white' : 'border-brand-border bg-white text-brand'}`}>{number}</span>
    </div>
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
    q: 'What is AI safety?',
    a: 'AI safety is the field of research focused on making advanced AI systems behave in ways that are safe, controllable, and aligned with human values, especially as those systems become more capable. It includes technical work on interpretability, robustness, scalable oversight, and evaluation, as well as governance and policy work on how AI is deployed.',
  },
  {
    q: 'What is AI alignment?',
    a: 'AI alignment is a subfield of AI safety focused specifically on making sure AI systems pursue the goals we actually want them to pursue, rather than something subtly different. Many researchers consider it one of the core technical problems in ensuring advanced AI goes well.',
  },
  {
    q: 'How do I join AI safety research at UCI?',
    a: 'The typical path is:',
    steps: [
      'Apply to the Technical Intro Fellowship to get grounded in the field.',
      'Continue as an AISCI member for weekly research reading and discussion.',
      'Work on research projects with the group or apply to external research programs such as SPAR or MATS.',
    ],
    outro: "If you're not ready to apply yet, browse our /resources page to get oriented, or book a coffee chat with an organizer.",
  },
  {
    q: 'Do I need a technical background to join?',
    a: 'No. The Intro Fellowship assumes no AI or ML background. Membership and board roles have a mix of technical and non-technical people. There\'s meaningful work on the governance, policy, and field-building side too.',
  },
  {
    q: 'When does the Intro Fellowship run?',
    a: `Every quarter. For Fall 2026, sessions meet ${meeting.day} ${meeting.time} at UC Irvine, with dinner provided. Room: ${meeting.room}. Applications open roughly a month before each quarter starts. The Fall 2026 application deadline is ${programsByKey.intro.applicationDeadline?.label}.`,
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
  'Connections with researchers and others working in AI safety',
  'Opportunities for AI safety community workshops & retreats',
  'A community of talented students interested in reducing risks from advanced AI',
]

export default function GetInvolved() {
  const intro = programsByKey.intro
  const membership = programsByKey.membership
  return (
    <main className="min-h-screen bg-brand-wash">
      <h1 className="sr-only">Get Involved</h1>

      <div className="site-container py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <ol className="space-y-10 sm:space-y-12">
            <li className="relative sm:pl-20">
              <StepMarker number={1} />
              <section id="intro-fellowship" aria-labelledby="fellowship-heading" className="overflow-hidden rounded-2xl border border-brand-border bg-white scroll-mt-24">
                <div className="p-5 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 id="fellowship-heading" className="text-2xl font-bold tracking-tight text-brand sm:text-3xl"><span aria-hidden="true" className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand align-middle text-sm sm:hidden">1</span>Technical Intro Fellowship</h2>
                    </div>
                    <StatusBadge status={intro.status} />
                  </div>

                  <p className="mt-4 text-gray-600">Technical AI safety in small reading groups. No AI or ML background needed.</p>
                  <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 rounded-xl bg-brand-soft p-4 text-sm sm:gap-x-6 sm:p-5 lg:grid-cols-3">
                    <div><dt className="text-gray-500">When</dt><dd className="mt-1 font-medium text-brand">{meeting.day}, {meeting.time}</dd></div>
                    <div><dt className="text-gray-500">Where</dt><dd className="mt-1 font-medium text-brand">UC Irvine · Room {meeting.room}</dd></div>
                    <div><dt className="text-gray-500">Duration</dt><dd className="mt-1 font-medium text-brand">Fall 2026 · 8 weeks</dd></div>
                    <div><dt className="text-gray-500">Commitment</dt><dd className="mt-1 text-brand">Weekly meetings only; no outside work</dd></div>
                    <div><dt className="text-gray-500">Food</dt><dd className="mt-1 text-brand">Dinner provided</dd></div>
                    {intro.applicationDeadline && <div><dt className="text-gray-500">Apply by</dt><dd className="mt-1 font-semibold text-brand"><time dateTime={intro.applicationDeadline.date}>{intro.applicationDeadline.label}</time></dd></div>}
                  </dl>

                  <details className="group mt-5 border-y border-brand-border">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-brand [&::-webkit-details-marker]:hidden">
                      Topics, eligibility &amp; completion
                      <span aria-hidden="true" className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="grid gap-5 pb-5 text-sm leading-relaxed text-gray-600 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-2 font-semibold text-brand">Topics</h3>
                        <ul className="list-disc space-y-1 pl-5">
                          <li>AI risk and the current trajectory of AI development</li>
                          <li>Scalable oversight</li>
                          <li>Mechanistic interpretability</li>
                          <li>Robustness and unlearning</li>
                        </ul>
                      </div>
                      <ul className="list-disc space-y-2 pl-5">
                        <li>Open to undergraduate and graduate students.</li>
                        <li>Completion certificate and early access to membership opportunities.</li>
                        <li>Runs every quarter; applications open roughly a month beforehand.</li>
                      </ul>
                    </div>
                  </details>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a href={intro.applyHref} target="_blank" rel="noopener noreferrer" className="button-primary w-full sm:w-auto">
                      Apply to the fellowship <span aria-hidden="true">↗</span>
                    </a>
                    <Link href="/tif" className="button-secondary w-full sm:w-auto">View the syllabus</Link>
                  </div>
                </div>
              </section>
            </li>

            <li className="relative sm:pl-20">
              <StepMarker number={2} />
              <section id="membership" aria-labelledby="membership-heading" className="overflow-hidden rounded-2xl border border-brand-border bg-white scroll-mt-24">
                <div className="p-5 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 id="membership-heading" className="text-2xl font-bold tracking-tight text-brand sm:text-3xl"><span aria-hidden="true" className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand align-middle text-sm sm:hidden">2</span>Membership</h2>
                    </div>
                    <StatusBadge status={membership.status} />
                  </div>
                  <p className="mt-4 text-gray-600">Weekly alignment reading, research support, and a community to contribute with.</p>
                  <ul className="mt-5 flex flex-wrap gap-2 text-sm text-brand">
                    {['Free Claude Pro / Claude Code', 'Compute & research tools', 'Researcher discussions'].map((benefit) => (
                      <li key={benefit} className="rounded-lg bg-brand-soft px-3 py-2">{benefit}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-500">Open beyond UCI · Fellowship alumni usually get priority · Board reviews typically monthly</p>

                  <details className="group mt-5 border-y border-brand-border">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-brand [&::-webkit-details-marker]:hidden">
                      All benefits, expectations &amp; admissions
                      <span aria-hidden="true" className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="grid gap-6 pb-5 text-sm leading-relaxed text-gray-600 lg:grid-cols-2">
                      <div>
                        <h3 className="mb-3 font-semibold text-brand">Membership benefits</h3>
                        <ul className="list-disc space-y-2 pl-5">
                          {membershipBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="mb-2 font-semibold text-brand">Taking part</h3>
                          <p>Members help run or participate in workshops, discussions, socials, hackathons, and other activities.</p>
                        </div>
                        <div>
                          <h3 className="mb-2 font-semibold text-brand">Eligibility &amp; applications</h3>
                          <ul className="list-disc space-y-2 pl-5">
                            <li>We’re a UCI-recognized student group. Independent researchers and students from other universities are welcome.</li>
                            <li>New to AI safety? Start with the <a href="#intro-fellowship" className="font-medium text-brand underline underline-offset-4">Intro Fellowship</a> and our <Link href="/resources" className="font-medium text-brand underline underline-offset-4">resources</Link>. Fellowship alumni typically receive application priority.</li>
                            <li>Rolling admission; the board typically makes decisions monthly.</li>
                            <li>Waiting on a response? Email <CopyEmail email={links.email} />.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </details>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a href={membership.applyHref} target="_blank" rel="noopener noreferrer" className="button-primary w-full sm:w-auto">
                      Apply for membership <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </section>
            </li>

            <li className="relative sm:pl-20">
              <StepMarker number={3} last />
              <section id="contribute" aria-labelledby="contribute-heading" className="rounded-2xl bg-brand p-5 text-white scroll-mt-24 sm:p-8 lg:p-10">
                <h2 id="contribute-heading" className="text-2xl font-bold tracking-tight sm:text-3xl"><span aria-hidden="true" className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white align-middle text-sm sm:hidden">3</span>Help AI go well</h2>
                <p className="mt-5 max-w-3xl leading-relaxed text-white/80">
                  Put your skills toward understanding and reducing risks from advanced AI.
                </p>
                <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-7">
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="font-semibold">Research</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">Build technical skills through projects to understand, evaluate, and control AI systems.</p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="font-semibold">Policy &amp; governance</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">Explore institutions and policy for safe AI development and deployment.</p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="font-semibold">Community</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">Organize discussions and events, or help others get started in AI safety.</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/resources" className="button-inverse w-full sm:w-auto">Explore resources &amp; opportunities <span aria-hidden="true">→</span></Link>
                  <Link href="/contact" className="text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">Talk through your next step</Link>
                </div>
              </section>
            </li>
          </ol>

          <section aria-labelledby="faq-heading" className="mt-16 border-t border-brand-border pt-12 sm:ml-20">
            <h2 id="faq-heading" className="mb-7 text-3xl font-bold tracking-tight text-brand">Frequently Asked Questions</h2>
            <Faqs faqs={faqs} />
          </section>
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
                text: [faq.a, ...(faq.steps ?? []).map((step, index) => `${index + 1}. ${step}`), faq.outro].filter(Boolean).join(' '),
              },
            })),
          }),
        }}
      />
    </main>
  )
}
