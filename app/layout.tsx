import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import StructuredData from './components/StructuredData'

const dmSans = DM_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'AI Safety Collective at Irvine',
    template: '%s | AI Safety Collective at Irvine',
  },
  description: 'A community dedicated to reducing risk from advanced AI. Join our fellowships, reading groups, and research programs at UC Irvine focused on AI alignment and safety.',
  keywords: ['AI Safety', 'AI Alignment', 'UC Irvine', 'UCI', 'Artificial Intelligence', 'AI Research', 'Machine Learning Safety', 'AI Risk', 'Fellowship'],
  authors: [{ name: 'AI Safety Collective at Irvine' }],
  creator: 'AI Safety Collective at Irvine',
  publisher: 'AI Safety Collective at Irvine',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aisafetyuci.org',
    siteName: 'AI Safety Collective at Irvine',
    title: 'AI Safety Collective at Irvine',
    description: 'A community dedicated to reducing risk from advanced AI.',
  },
  twitter: {
    card: 'summary',
    title: 'AI Safety Collective at Irvine',
    description: 'A community dedicated to reducing risk from advanced AI. Join our fellowships and research programs.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={dmSans.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
