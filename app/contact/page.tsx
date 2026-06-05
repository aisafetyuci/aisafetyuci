import { Metadata } from 'next'
import MailingListForm from '../components/MailingListForm'
import { links } from '../data/links'

const pageTitle = 'Contact Us'
const pageDescription = 'Get in touch with AISCI. Join our Discord community, attend our events, or reach out with questions about our programs.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/contact',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    images: [],
  },
}

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-12 pb-2">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-bold text-[#18234e] mb-3">Contact Us</h1>
          <p className="text-xl text-gray-600">Questions, concerns, requests? Get in touch with AISCI.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#18234e] mb-2">Grab a coffee with us</h2>
            <p className="text-gray-600 mb-6">We love meeting people who are curious about AI safety; no background needed. Book a 30-minute chat and we'll buy you coffee and cover whatever's on your mind.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'You want to learn what AI safety is actually about',
                'You\'re figuring out your next steps in research or career',
                'You\'re interested in joining or helping organize AISCI',
                'You want to know if our fellowship or membership is right for you',
                'You\'re a researcher or professional who wants to connect',
                'You just have questions and want to talk to someone',
              ].map((reason) => (
                <div key={reason} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#18234e] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 text-sm">{reason}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={links.coffeeHelena} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#111a3b] transition-colors text-center">
                Coffee with Helena
              </a>
              <a href={links.coffeeHarry} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#18234e] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#111a3b] transition-colors text-center">
                Coffee with Harry
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Other ways to reach us</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Join our Discord and say hello in #general; it's the fastest way to hear back.
                </p>
                <a href={links.discord} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#5865F2] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#4752c4] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Join our Discord
                </a>
              </div>

              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Email us at{' '}
                  <a href={`mailto:${links.email}`} className="text-[#18234e] font-semibold underline">
                    {links.email}
                  </a>, or find all our links in one place on Linktree.
                </p>
                <a href={links.linktree} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#18234e] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#111a3b] transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="m13.73635 5.85251 4.00467 -4.11665 2.3248 2.3808 -4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766 -2.3248 2.3338L12.0005 12.099l-5.74052 5.76852 -2.3248 -2.3248 4.22864 -4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248 -2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z" />
                  </svg>
                  Linktree
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Stay in the loop</h2>
            <p className="text-gray-600 mb-6">Get occasional updates about events, fellowships, and AI safety news from AISCI.</p>
            <MailingListForm />
          </div>

        </div>
      </div>
    </main>
  )
}
