'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navigation = [
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
  { href: '/team', label: 'Team' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Separate thresholds prevent flicker when scrolling around the cutoff.
    const onScroll = () => setScrolled((current) => current ? window.scrollY > 32 : window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 border-b border-brand-border/70 bg-white/95 backdrop-blur-sm">
      <div className="site-container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex min-w-0 items-center gap-2 text-lg font-semibold text-brand hover:text-brand-accent transition-colors">
            <Image src="/favicon.png" alt="AI Safety Collective at Irvine logo" width={48} height={48} priority className="h-12 w-12 shrink-0" />
            <span className="sm:hidden">AISCI</span>
            <span className="hidden sm:grid" aria-label="AI Safety Collective at Irvine">
              <span aria-hidden="true" className={`col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-300 motion-reduce:transition-none ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
                AI Safety Collective at Irvine
              </span>
              <span aria-hidden="true" className={`col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
                AISCI
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navigation.map(({ href, label }) => (
              <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === href ? 'bg-brand-soft text-brand' : 'text-gray-600 hover:bg-brand-wash hover:text-brand'}`}>
                {label}
              </Link>
            ))}
          </div>

          <button
            className="lg:hidden rounded-lg text-brand hover:bg-brand-soft transition-colors p-3 sm:p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div id="mobile-navigation" className="lg:hidden pb-4">
            <div className="flex flex-col gap-1">
              {navigation.map(({ href, label }) => (
                <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setIsOpen(false)} className={`rounded-lg px-4 py-3 font-medium transition-colors ${pathname === href ? 'bg-brand-soft text-brand' : 'text-gray-600 hover:bg-brand-wash hover:text-brand'}`}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
