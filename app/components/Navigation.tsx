'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#00386c] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-indigo-200 transition-colors">
            AI Safety at UCI
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/programs" className="text-indigo-100 hover:text-indigo-200 transition-colors font-medium">
              Programs
            </Link>
            <Link href="/resources" className="text-indigo-100 hover:text-indigo-200 transition-colors font-medium">
              Resources
            </Link>
            <Link href="/contact" className="text-indigo-100 hover:text-indigo-200 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Hamburger button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
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

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/programs"
                className="text-indigo-100 hover:text-indigo-200 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Programs
              </Link>
              <Link
                href="/resources"
                className="text-indigo-100 hover:text-indigo-200 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="text-indigo-100 hover:text-indigo-200 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
