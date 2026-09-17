'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import PlaybackIcon from './PlaybackIcon'

const slides = [
  [
    { src: '/images/community/group.webp', alt: 'AISCI members posing together at the front of a classroom' },
  ],
  [
    { src: '/images/community/picnic.webp', alt: 'Students sharing a picnic on a sunny campus lawn' },
    { src: '/images/community/bonfire.webp', alt: 'Students gathered around a bonfire in the evening' },
  ],
  [
    { src: '/images/community/discussion.webp', alt: 'Students listening to a presentation and discussion in a classroom' },
  ],
  [
    { src: '/images/community/meeting.webp', alt: 'A room of students taking part in an AISCI meeting' },
  ],
  [
    { src: '/images/community/screening.webp', alt: 'Students watching an AI safety video together in a classroom' },
    { src: '/images/community/cafe.webp', alt: 'Three friends sharing food and drinks at a café' },
  ],
] as const

export default function HeroPhotos() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(preference.matches)
    sync()
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused || hovered || focused || reducedMotion) return
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 6500)
    return () => window.clearInterval(timer)
  }, [paused, hovered, focused, reducedMotion])

  function select(index: number) {
    setActive((index + slides.length) % slides.length)
    setPaused(true)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Life at AISCI"
      className="min-w-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          select(active + (event.key === 'ArrowLeft' ? -1 : 1))
        }
      }}
    >
      <div className="relative aspect-[3/2]">
        {slides.map((photos, index) => (
          <div
            key={photos[0].src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={index !== active}
            className={`absolute inset-0 flex gap-2 transition-opacity duration-700 motion-reduce:transition-none sm:gap-3 ${index === active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {photos.map((photo) => (
              <div key={photo.src} className="relative min-w-0 flex-1 overflow-hidden rounded-xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={photos.length === 1 ? '(max-width: 1023px) 100vw, 55vw' : '(max-width: 1023px) 50vw, 28vw'}
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1">
        <button type="button" onClick={() => select(active - 1)} aria-label="Previous photo" className="hero-photo-control">←</button>
        <span className="min-w-10 text-center text-xs tabular-nums text-gray-500" aria-live={paused || reducedMotion ? 'polite' : 'off'}>
          <span className="sr-only">Slide </span>{active + 1} / {slides.length}
        </span>
        <button type="button" onClick={() => select(active + 1)} aria-label="Next photo" className="hero-photo-control">→</button>
        {!reducedMotion && (
          <button type="button" onClick={() => {
            setPaused(!paused)
            if (paused) setFocused(false)
          }} aria-label={paused ? 'Play photo slideshow' : 'Pause photo slideshow'} className="hero-photo-control ml-1">
            <PlaybackIcon paused={paused} />
          </button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2 px-1 sm:gap-3" role="group" aria-label="Choose a slide">
        {slides.map((photos, index) => (
          <button
            key={photos[0].src}
            type="button"
            onClick={() => select(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-pressed={active === index}
            className={`relative flex aspect-[3/2] gap-0.5 overflow-hidden rounded-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${active === index ? 'ring-2 ring-brand ring-offset-2 ring-offset-brand-wash' : 'opacity-60 hover:opacity-100'}`}
          >
            {photos.map((photo) => (
              <span key={photo.src} className="relative min-w-0 flex-1">
                <Image src={photo.src} alt="" fill sizes="(max-width: 640px) 18vw, 120px" className="object-cover" />
              </span>
            ))}
          </button>
        ))}
      </div>
    </div>
  )
}
