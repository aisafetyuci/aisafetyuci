import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#18234e] text-[#f2f3f7]">
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm">© {new Date().getFullYear()} AI Safety at UCI</div>
        <div className="flex flex-col sm:flex-row items-center gap-2 my-3 md:my-0">
          <span className="text-sm text-[#f2f3f7]">Curious about AI safety?</span>
          <div className="flex gap-2">
            <a href="https://calendly.com/helenatran9305" target="_blank" rel="noopener noreferrer" className="inline-block text-sm bg-[#f2f3f7] text-[#18234e] font-semibold px-4 py-2 rounded-full hover:bg-[#f2f3f7] transition-colors">
              Coffee with Helena
            </a>
            <a href="https://calendar.app.google/mdAMY9qTR4kBcqb88" target="_blank" rel="noopener noreferrer" className="inline-block text-sm bg-[#f2f3f7] text-[#18234e] font-semibold px-4 py-2 rounded-full hover:bg-[#f2f3f7] transition-colors">
              Coffee with Harry
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <Link href="/contact" className="hover:text-[#f2f3f7]">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
