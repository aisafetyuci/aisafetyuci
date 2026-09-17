'use client'

import { useId, useState } from 'react'
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyss0VBusCySUclViwlRu--X5EAaK_PtZkfkTITqv8zAAfKUT18Qj_9BOdF13QCWErL/exec'

export default function MailingListForm({ prominent = false }: { prominent?: boolean }) {
  const emailId = useId()
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
      <p role="status" className={`font-medium ${prominent ? 'text-base text-green-200' : 'text-sm text-green-700'}`}>
        You&apos;re on the list! We&apos;ll be in touch.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={prominent ? 'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap' : 'flex flex-col gap-2 sm:flex-row sm:flex-wrap'}>
      <label htmlFor={emailId} className="sr-only">Email address</label>
      <input
        id={emailId}
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`border rounded-lg bg-white focus:outline-none focus:ring-2 border-gray-300 text-gray-900 placeholder-gray-500 ${prominent ? 'w-full min-w-0 flex-1 px-4 py-3 text-base focus:ring-brand-light sm:w-auto' : 'min-h-12 w-full min-w-0 flex-1 px-4 py-3 text-base sm:text-sm focus:ring-brand sm:w-auto'}`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`font-semibold rounded-lg min-h-12 whitespace-nowrap transition-colors disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${prominent ? 'bg-brand-soft px-5 py-3 text-base text-brand hover:bg-white focus-visible:outline-white' : 'px-4 py-2 text-sm bg-brand text-white hover:bg-brand-hover focus-visible:outline-brand'}`}
      >
        {status === 'loading' ? 'Joining…' : 'Join Mailing List'}
      </button>
      {status === 'error' && (
        <p role="alert" className={`w-full text-sm ${prominent ? 'text-red-200' : 'text-red-600'}`}>Something went wrong. Try emailing us directly.</p>
      )}
    </form>
  )
}
