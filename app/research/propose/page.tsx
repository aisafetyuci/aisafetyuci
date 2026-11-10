import { Metadata } from 'next'
import ProposeForm from './ProposeForm'

const pageTitle = 'Pitch Your Own Research Idea'
const pageDescription = 'Have a question in AI safety you want to test? Pitch it to the AI Safety Collective at Irvine: we help scope it, cover compute, and find mentors or teammates.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/research/propose' },
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/research/propose',
    type: 'website',
    images: ['/images/asinglenet-og.png'],
  },
}

export default function ProposePage() {
  return (
    <main className="min-h-screen bg-brand-wash">
      <div className="site-container pt-12 pb-2">
        <div className="page-header">
          <h1 className="page-title">Pitch your own research idea</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            Tell us the question, why it matters and how you&apos;d start. It takes about 10 minutes, and your answers are saved in this browser as you go.
          </p>
        </div>
      </div>
      <div className="site-container pt-8 pb-16">
        <ProposeForm />
      </div>
    </main>
  )
}
