'use client'

import { useState } from 'react'

type Faq = { q: string; a: string; steps?: string[]; outro?: string }

export default function Faqs({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={faq.q}
            className="surface-card overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex((current) => current === i ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 font-semibold text-brand hover:bg-gray-50 transition-colors cursor-pointer"
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
              hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                  <p>{faq.a}</p>
                  {faq.steps && (
                    <ol className="my-4 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-brand">
                      {faq.steps.map((step) => <li key={step} className="pl-2">{step}</li>)}
                    </ol>
                  )}
                  {faq.outro && <p>{faq.outro}</p>}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
