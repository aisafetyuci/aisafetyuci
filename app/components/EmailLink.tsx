'use client'

import { useEffect, useState } from 'react'
import { links } from '../data/links'

// The club email as a mailto link. The address is split in the HTML and the link is only
// added in the browser, so spam bots reading the page source never see the full address.
export default function EmailLink({ className }: { className?: string }) {
  const { user, domain } = links.email
  const [href, setHref] = useState<string>()

  useEffect(() => setHref(`mailto:${user}@${domain}`), [user, domain])

  return (
    <a href={href} className={className}>
      {user}<span>@</span>{domain}
    </a>
  )
}
