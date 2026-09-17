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
    <div aria-hidden="true">
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
    a: 'The typical path is: (1) apply to the Technical Intro Fellowship to get grounded in the field, (2) continue as an AISCI member for weekly research reading and discussion, (3) work on research projects with the group or through external programs like Redwood Research, the U.S. AI Safety Institute, METR, or MATS. If you\'re not ready to apply yet, browse our /resources page to get oriented, or book a coffee chat with an organizer.',
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
  'Connections with top orgs like Redwood Research, the U.S. AI Safety Institute, and METR',
  'Opportunities for AI safety community workshops & retreats',
  'A community of talented students interested in reducing risks from advanced AI',
]

export default function GetInvolved() {
  const intro = programsByKey.intro
  const membership = programsByKey.membership
  return (
    <main className="min-h-screen bg-brand-wash">
      <header className="border-b border-brand/10 bg-white">
        <div className="site-container py-12 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="page-title">Get Involved</h1>

            <nav aria-label="Your path through AISCI" className="mt-9">
              <ol className="grid gap-9 md:grid-cols-3 md:gap-10">
                {[
                  { number: '01', title: 'Intro Fellowship', detail: 'Learn the foundations', href: '#intro-fellowship' },
                  { number: '02', title: 'Membership', detail: 'Build skills with other members', href: '#membership' },
                  { number: '03', title: 'Help AI go well', detail: 'Put what you learn to work', href: '#contribute' },
                ].map((step, index) => (
                  <li key={step.number} className="relative">
                    <a href={step.href} className={`flex h-full items-stretch overflow-hidden rounded-xl border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${index === 2 ? 'border-brand bg-brand text-white hover:bg-brand-hover' : 'border-brand-border bg-brand-wash text-brand hover:bg-brand-soft'}`}>
                      <span className={`flex w-12 shrink-0 items-center justify-center border-r text-sm font-semibold tabular-nums ${index === 2 ? 'border-white/15 bg-white/10 text-white' : 'border-brand-border bg-brand-soft text-brand-accent'}`}>{step.number}</span>
                      <span className="min-w-0 self-center px-4 py-5">
                        <span className="block text-lg font-semibold">{step.title}</span>
                        <span className={`mt-1 block text-sm ${index === 2 ? 'text-white/75' : 'text-gray-500'}`}>{step.detail}</span>
                      </span>
                    </a>
                    {index < 2 && (
                      <span aria-hidden="true" className="absolute -bottom-8 left-6 text-2xl text-brand-muted md:-right-7 md:bottom-auto md:left-auto md:top-6">
                        <span className="md:hidden">↓</span><span className="hidden md:inline">→</span>
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="mt-7 text-sm leading-relaxed text-gray-500">
              Already familiar with AI safety? <a href="#membership" className="font-medium text-brand underline underline-offset-4 hover:decoration-transparent">You can apply directly for membership.</a>
            </p>
          </div>
        </div>
      </header>

      <div className="site-container py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <ol className="space-y-10 sm:space-y-12">
            <li className="relative pl-10 sm:pl-20">
              <StepMarker number={1} />
              <section id="intro-fellowship" aria-labelledby="fellowship-heading" className="overflow-hidden rounded-2xl border border-brand-border bg-white scroll-mt-24">
                <div className="p-5 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="mb-2 text-sm font-medium text-brand-accent">Start here</p>
                      <h2 id="fellowship-heading" className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">Technical Intro Fellowship</h2>
                    </div>
                    <StatusBadge status={intro.status} />
                  </div>

                  <div className="mt-6 grid gap-7 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
                    <div>
                      <p className="leading-relaxed text-gray-600">
                        An 8-week reading group on technical AI safety for Fall 2026. Participants meet weekly in small sections on {meeting.day} from {meeting.time}, with dinner provided. Room: {meeting.room}. No work is expected outside of weekly meetings.
                      </p>
                      <h3 className="mb-3 mt-6 font-semibold text-brand">Topics include:</h3>
                      <ul className="space-y-2.5 text-sm leading-relaxed text-gray-600">
                        {[
                          'AI risk and the current trajectory of AI development',
                          'Scalable oversight',
                          'Mechanistic interpretability',
                          'Robustness and unlearning',
                        ].map((topic) => (
                          <li key={topic} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-muted" />{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <aside aria-label="Fellowship details" className="rounded-xl bg-brand-soft p-5 sm:p-6">
                      <h3 className="mb-5 font-semibold text-brand">Fall 2026 · 8 weeks</h3>
                      <dl className="space-y-4 text-sm">
                        {intro.applicationDeadline && <div><dt className="text-gray-500">Application deadline</dt><dd className="mt-1 font-semibold text-brand"><time dateTime={intro.applicationDeadline.date}>{intro.applicationDeadline.label}</time></dd></div>}
                        <div><dt className="text-gray-500">When</dt><dd className="mt-1 font-medium text-brand">{meeting.day}, {meeting.time}</dd></div>
                        <div><dt className="text-gray-500">Where</dt><dd className="mt-1 font-medium text-brand">UC Irvine · Room {meeting.room}</dd></div>
                        <div><dt className="text-gray-500">Commitment</dt><dd className="mt-1 leading-relaxed text-brand">Weekly meetings, with dinner provided. No work expected outside meetings.</dd></div>
                      </dl>
                      <p className="mt-5 border-t border-brand/10 pt-4 text-sm text-gray-500">We run the fellowship every quarter.</p>
                    </aside>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-gray-500">
                    Open to undergraduate and graduate students. Participants receive a completion certificate and early access to membership opportunities.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a href={intro.applyHref} target="_blank" rel="noopener noreferrer" className="button-primary">
                      Apply to the fellowship <span aria-hidden="true">↗</span>
                    </a>
                    <Link href="/tif" className="button-secondary">View the syllabus</Link>
                  </div>
                </div>
              </section>
            </li>

            <li className="relative pl-10 sm:pl-20">
              <StepMarker number={2} />
              <section id="membership" aria-labelledby="membership-heading" className="overflow-hidden rounded-2xl border border-brand-border bg-white scroll-mt-24">
                <div className="p-5 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="mb-2 text-sm font-medium text-brand-accent">Keep learning and take part</p>
                      <h2 id="membership-heading" className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">Membership</h2>
                    </div>
                    <StatusBadge status={membership.status} />
                  </div>
                  <p className="mt-6 max-w-3xl leading-relaxed text-gray-600">
                    Being a member of the AISCI community comes with both opportunities and responsibilities. Membership includes:
                  </p>
                  <ul className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
                    {membershipBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-sm leading-relaxed text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 rounded-xl bg-brand-soft p-5 text-sm leading-relaxed text-gray-600">
                    <p>Members generally contribute by running or participating in workshops, discussions, socials, hackathons, and more. While we are a UCI-recognized student group, membership is not restricted to UCI students; independent researchers and students from other universities are welcome.</p>
                    <p className="mt-4">If you aren't very familiar with AI safety, we recommend applying to our Intro Fellowship above and browsing our <Link href="/resources" className="font-medium text-brand underline underline-offset-4">resources</Link>. Fellowship alumni typically receive priority in the application process.</p>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-gray-500">
                    Membership admission is rolling, but the board tends to make decisions every month. If we are slow to respond, please don't hesitate to email us at <CopyEmail email={links.email} />.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a href={membership.applyHref} target="_blank" rel="noopener noreferrer" className="button-primary">
                      Apply for membership <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </section>
            </li>

            <li className="relative pl-10 sm:pl-20">
              <StepMarker number={3} last />
              <section id="contribute" aria-labelledby="contribute-heading" className="rounded-2xl bg-brand p-5 text-white scroll-mt-24 sm:p-8 lg:p-10">
                <p className="mb-2 text-sm font-medium text-brand-light">Put what you learn to work</p>
                <h2 id="contribute-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">Help AI go well</h2>
                <p className="mt-5 max-w-3xl leading-relaxed text-white/80">
                  Use what you learn to help understand and reduce the risks from advanced AI. That could mean contributing to research, exploring policy, or helping more people get involved.
                </p>
                <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-7">
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="font-semibold">Research</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">Build technical skills and look for projects that help us understand, evaluate, and control AI systems.</p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="font-semibold">Policy &amp; governance</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">Explore how institutions and policy can support the safe development and deployment of AI.</p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <h3 className="font-semibold">Community</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">Organize a discussion, run an event, or help someone else get started in AI safety.</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/resources" className="button-inverse">Explore resources &amp; opportunities <span aria-hidden="true">→</span></Link>
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
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </main>
  )
}
