'use client'

import { useState } from 'react'
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyss0VBusCySUclViwlRu--X5EAaK_PtZkfkTITqv8zAAfKUT18Qj_9BOdF13QCWErL/exec'

export default function MailingListForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className={`text-sm font-medium ${variant === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
        You&apos;re on the list! We&apos;ll be in touch.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 min-w-48 ${variant === 'dark' ? 'border-white/30 bg-white/10 text-white placeholder-white/50 focus:ring-white' : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-[#18234e]'}`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`font-semibold px-4 py-2 rounded-md text-sm transition-colors disabled:opacity-60 ${variant === 'dark' ? 'bg-white text-[#18234e] hover:bg-gray-100' : 'bg-[#18234e] text-white hover:bg-[#111a3b]'}`}
      >
        {status === 'loading' ? 'Joining…' : 'Join Mailing List'}
      </button>
      {status === 'error' && (
        <p className="w-full text-sm text-red-600">Something went wrong. Try emailing us directly.</p>
      )}
    </form>
  )
}
