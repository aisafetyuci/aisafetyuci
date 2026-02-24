'use client'

import { useState } from 'react'

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      className="underline cursor-pointer"
    >
      {copied ? 'Copied!' : email}
    </button>
  )
}
