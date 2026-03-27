'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors">
            <Image src="/favicon.png" alt="AI Safety Collective at Irvine logo" width={64} height={64} />
            AI Safety Collective at Irvine
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/get-involved" className="text-gray-900 hover:text-[#18234e] transition-colors font-medium">
              Get Involved
            </Link>
            <Link href="/resources" className="text-gray-900 hover:text-[#18234e] transition-colors font-medium">
              Resources
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-[#18234e] transition-colors font-medium">
              Contact
            </Link>
          </div>

          <button
            className="md:hidden text-gray-900 hover:text-[#18234e] transition-colors p-2"
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

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/get-involved"
                className="text-gray-900 hover:text-[#18234e] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Get Involved
              </Link>
              <Link
                href="/resources"
                className="text-gray-900 hover:text-[#18234e] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-[#18234e] transition-colors font-medium"
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
