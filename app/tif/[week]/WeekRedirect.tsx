'use client'

import { useEffect } from 'react'

export default function WeekRedirect({ number, label }: { number: number; label: string }) {
  const href = `/tif#week-${number}`

  useEffect(() => {
    window.location.replace(href)
  }, [href])

  return (
    <main className="site-container py-16">
      <p className="text-brand">The fellowship materials are now together on one page.</p>
      <a href={href} className="button-primary mt-6">Go to {label} <span aria-hidden="true">→</span></a>
    </main>
  )
}
