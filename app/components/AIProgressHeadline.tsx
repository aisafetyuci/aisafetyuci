'use client'

import { useEffect, useState } from 'react'
import { aiHighlights } from '../data/aiHighlights'
import PlaybackIcon from './PlaybackIcon'

export default function AIProgressHeadline() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(preference.matches)
    sync()
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % aiHighlights.length)
    }, 3000)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion])

  function select(index: number) {
    setActive((index + aiHighlights.length) % aiHighlights.length)
  }

  return (
    <div
      className="ai-progress-headline"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          select(active + (event.key === 'ArrowLeft' ? -1 : 1))
        }
      }}
    >
      <h1 id="home-heading" className="ai-progress-heading font-semibold tracking-[-0.035em] text-brand">
        Artificial intelligence is
        {/* Overlapping grid items reserve room for the longest phrase at every width. */}
        <span className="mt-2 grid">
          {aiHighlights.map((highlight, index) => (
            <a
              key={highlight.href}
              href={highlight.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={index !== active}
              tabIndex={index === active ? 0 : -1}
              className={`col-start-1 row-start-1 rounded-sm text-brand-accent decoration-brand-accent/35 decoration-2 underline-offset-8 transition-[opacity,transform] duration-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transform-none motion-reduce:transition-none ${index === active ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'}`}
            >
              {highlight.lines.map((line, lineIndex) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}{lineIndex < highlight.lines.length - 1 ? ' ' : ''}
                  </span>
                ))}
            </a>
          ))}
        </span>
      </h1>

      <div className="mt-4 flex items-center">
        <div role="group" aria-label="Choose an AI progress example" className="flex items-center">
          {aiHighlights.map((highlight, index) => (
            <button
              key={highlight.href}
              type="button"
              aria-label={`Show example ${index + 1}: Artificial intelligence is ${highlight.text}`}
              aria-pressed={active === index}
              onClick={() => select(index)}
              className="flex h-9 w-7 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${active === index ? 'w-4 bg-brand' : 'w-1.5 bg-brand/25'}`} />
            </button>
          ))}
          {!reducedMotion && (
            <button
              type="button"
              className="hero-photo-control ml-1"
              aria-label={paused ? 'Play headline rotation' : 'Pause headline rotation'}
              onClick={() => setPaused((current) => !current)}
            >
              <PlaybackIcon paused={paused} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
