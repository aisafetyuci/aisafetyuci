'use client'

import { useEffect, useState } from 'react'
import { links } from '../data/links'

// "Something not working? Tell us" under the research forms: a mailto to the club email with the
// page and browser filled in. Built in the browser, like EmailLink, so the address isn't in the HTML.
export default function ReportProblemLink() {
  const [href, setHref] = useState<string>()

  useEffect(() => {
    const { user, domain } = links.email
    const body = `What happened (and what you expected):\n\n\n---\nPage: ${window.location.href}\nBrowser: ${navigator.userAgent}`
    setHref(`mailto:${user}@${domain}?subject=${encodeURIComponent('Problem on the website')}&body=${encodeURIComponent(body)}`)
  }, [])

  return (
    <p className="mt-6 text-center text-sm text-gray-500">
      Something not working?{' '}
      <a href={href} className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">Tell us</a>
      {' '}and we&apos;ll fix it.
    </p>
  )
}
