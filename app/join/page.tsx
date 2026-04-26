import { Metadata } from 'next'
import Link from 'next/link'
import JoinRedirectClient from './JoinRedirectClient'

export const metadata: Metadata = {
  title: 'Join',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://aisafetyuci.org/get-involved' },
}

export default function JoinPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <JoinRedirectClient />
      <p className="text-gray-600">
        Redirecting to <Link href="/get-involved" className="text-[#18234e] underline">Get Involved</Link>…
      </p>
    </main>
  )
}
