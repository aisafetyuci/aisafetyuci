'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            AI Safety at UCI
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/get-involved" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Get Involved
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Resources
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Hamburger button */}
          <button
            className="md:hidden text-gray-700 p-2"
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
                href="/get-involved"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Get Involved
              </Link>
              <Link
                href="/resources"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
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
