import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#00386c] text-indigo-100">
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm">© {new Date().getFullYear()} AI Safety at UCI</div>
        <a href="https://calendly.com/helenatran9305" target="_blank" rel="noopener noreferrer" className="inline-block text-sm bg-indigo-100 text-[#00386c] font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors my-3 md:my-0">
          Curious about AI safety? Let us buy you coffee!
        </a>
        <div className="flex items-center space-x-4 text-sm">
          <Link href="/contact" className="hover:text-indigo-200">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
