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
    default: 'AI Safety at UCI',
    template: '%s | AI Safety at UCI',
  },
  description: 'A community dedicated to reducing risk from advanced AI. Join our fellowships, reading groups, and research programs at UC Irvine focused on AI alignment and safety.',
  keywords: ['AI Safety', 'AI Alignment', 'UC Irvine', 'UCI', 'Artificial Intelligence', 'AI Research', 'Machine Learning Safety', 'AI Risk', 'Fellowship'],
  authors: [{ name: 'AI Safety at UCI' }],
  creator: 'AI Safety at UCI',
  publisher: 'AI Safety at UCI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aisafetyuci.com',
    siteName: 'AI Safety at UCI',
    title: 'AI Safety at UCI',
    description: 'A community dedicated to reducing risk from advanced AI.',
    images: [
      {
        url: 'https://aisafetyuci.com/images/asinglenet.png',
        width: 1200,
        height: 630,
        alt: 'AI Safety at UCI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Safety at UCI',
    description: 'A community dedicated to reducing risk from advanced AI. Join our fellowships and research programs.',
    images: ['https://aisafetyuci.com/images/asinglenet.png'],
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
