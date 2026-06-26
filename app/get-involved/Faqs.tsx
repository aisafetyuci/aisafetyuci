'use client'

import { useState } from 'react'

type Faq = { q: string; a: string }

export default function Faqs({ faqs }: { faqs: Faq[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null)

  // Hover takes precedence over the pinned item, so only ever one is open.
  const openIndex = hoveredIndex !== null ? hoveredIndex : pinnedIndex

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={faq.q}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <button
              type="button"
              onClick={() => setPinnedIndex(pinnedIndex === i ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 font-semibold text-[#18234e] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="text-lg">{faq.q}</span>
              <svg
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`faq-answer-${i}`}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
