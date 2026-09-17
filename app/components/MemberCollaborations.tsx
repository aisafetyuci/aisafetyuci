'use client'

import { useState } from 'react'
import Image from 'next/image'
import { collaborators } from '../data/collaborators'
import PlaybackIcon from './PlaybackIcon'

export default function MemberCollaborations() {
  const [paused, setPaused] = useState(false)

  return (
    <section id="member-collaborations" aria-labelledby="member-collaborations-heading" className="bg-white px-4 pb-16 scroll-mt-24">
      <div className="mx-auto max-w-6xl border-t border-gray-200 pt-12">
        <h2 id="member-collaborations-heading" className="text-center text-2xl md:text-3xl font-semibold text-brand">
          Our Members Have Worked With
        </h2>
        <div className="collaborator-marquee mt-10" data-paused={paused}>
          <div className="collaborator-track">
            {[false, true].map((duplicate) => (
              <ul key={String(duplicate)} className="collaborator-group" aria-hidden={duplicate || undefined}>
                {collaborators.map(({ name, href, logo }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={duplicate ? -1 : undefined}
                      className="group flex h-full flex-col items-center rounded-lg px-2 py-3 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                      <div className="flex h-20 w-full items-center justify-center">
                        <Image
                          src={logo}
                          alt=""
                          width={160}
                          height={80}
                          className="h-full w-full max-w-40 object-contain"
                        />
                      </div>
                      <span className="mt-4 text-sm font-medium leading-snug text-gray-600 group-hover:text-brand group-hover:underline underline-offset-4 transition-colors">
                        {name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="collaborator-controls mt-6 text-center">
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            aria-label="Pause logo scrolling"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <PlaybackIcon paused={paused} />
            {paused ? 'Resume scrolling' : 'Pause scrolling'}
          </button>
        </div>
      </div>
    </section>
  )
}
