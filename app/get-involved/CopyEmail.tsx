'use client'

import { useState } from 'react'
import { links } from '../data/links'

// Click to copy the club email. The address is split in the HTML (see links.email)
// and only joined when copied, so spam bots reading the page source never see it.
export default function CopyEmail() {
  const { user, domain } = links.email
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(`${user}@${domain}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      className="underline cursor-pointer"
    >
      {copied ? 'Copied!' : <>{user}<span>@</span>{domain}</>}
    </button>
  )
}
