import Link from 'next/link'
import Image from 'next/image'
import { links } from '../data/links'
import { programsByKey } from '../data/programs'
import DiscordIcon from './DiscordIcon'
import AIProgressHeadline from './AIProgressHeadline'

export default function HomeHero() {
  const deadline = programsByKey.intro.applicationDeadline
  return (
    <section aria-labelledby="home-heading" className="border-b border-brand/5 bg-brand-wash">
      <div className="site-container py-8 sm:py-16 lg:py-20">
        <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-20">
          <div className="min-w-0 max-w-xl">
            <AIProgressHeadline />
            <p className="mt-5 max-w-lg text-base sm:mt-6 sm:text-lg leading-relaxed text-gray-600">
              Learn how to contribute with other students at UC Irvine through our AI safety fellowship, research discussions, and events.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link href="/get-involved#intro-fellowship" className="button-primary">
                Fellowship applications open now <span aria-hidden="true">→</span>
              </Link>
              <a href={links.discord} target="_blank" rel="noopener noreferrer" className="button-secondary">
                <DiscordIcon className="h-5 w-5" /> Join Discord
              </a>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              {deadline && <span className="mb-1 block font-semibold text-brand">Apply by <time dateTime={deadline.date}>{deadline.label}</time>.</span>}
            </p>
          </div>
          <Image
            src="/images/asinglenet.png"
            alt="An illustration of a hand holding a glowing neural network above a city"
            width={1152}
            height={928}
            sizes="(max-width: 1023px) 100vw, 55vw"
            priority
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}
