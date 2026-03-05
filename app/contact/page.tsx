import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with AI Safety at UCI. Join our Discord community, attend our events, or reach out with questions about our programs.',
}

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-[#00386c]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-0">Contact Us</h1>
            <p className="text-xl text-indigo-100 mb-8 pt-8">Questions, concerns, requests? Get in touch with AISUCI.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#00386c] rounded-lg shadow-lg p-8 text-center mb-6">
            <p className="text-xl text-white font-semibold mb-6">
              Curious about AI safety? Let us buy you coffee!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://calendly.com/helenatran9305" target="_blank" rel="noopener noreferrer" className="bg-indigo-100 text-[#00386c] font-semibold px-6 py-3 rounded-full hover:bg-white transition-colors">
                Coffee with Helena
              </a>
              <a href="https://calendar.app.google/mdAMY9qTR4kBcqb88" target="_blank" rel="noopener noreferrer" className="bg-indigo-100 text-[#00386c] font-semibold px-6 py-3 rounded-full hover:bg-white transition-colors">
                Coffee with Harry
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The easiest way to reach the AISUCI team is through our <a href="https://discord.gg/uENtNdDPPb" target="_blank" rel="noopener noreferrer" className="text-[#00386c] font-semibold underline">Discord</a>. Alternatively, you can email us at helenat2 at uci dot edu
            </p>

            <div className="space-y-4">

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Social Media</h3>
                <p className="text-gray-700">Follow us on <a href="https://www.instagram.com/aisafetyatuci/" target="_blank" rel="noopener noreferrer" className="text-[#00386c] font-semibold underline">Instagram</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
