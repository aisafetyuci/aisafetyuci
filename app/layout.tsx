import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import StructuredData from './components/StructuredData'

const dmSans = DM_Sans({
  subsets: ['latin'],
})

const siteDescription = 'AI alignment and AI safety at UC Irvine (UCI). AISCI runs fellowships, reading groups, and research programs focused on reducing risk from advanced AI.'
const ogImage = {
  url: '/images/asinglenet-og.png',
  width: 1200,
  height: 630,
  alt: 'AI Safety Collective at Irvine',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aisafetyuci.org'),
  title: {
    default: 'AI Safety Collective at Irvine',
    template: '%s | AI Safety Collective at Irvine',
  },
  description: siteDescription,
  keywords: ['AI Safety', 'AI Alignment', 'AI Alignment Irvine', 'AI Safety UCI', 'UC Irvine', 'UCI', 'Artificial Intelligence', 'AI Research', 'Machine Learning Safety', 'AI Risk', 'Fellowship', 'AISCI'],
  authors: [{ name: 'AI Safety Collective at Irvine' }],
  creator: 'AI Safety Collective at Irvine',
  publisher: 'AI Safety Collective at Irvine',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aisafetyuci.org',
    siteName: 'AI Safety Collective at Irvine',
    title: 'AI Safety Collective at Irvine',
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Safety Collective at Irvine',
    description: siteDescription,
    images: [ogImage.url],
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
