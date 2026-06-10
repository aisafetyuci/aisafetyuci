import Link from 'next/link'
import { links } from '../data/links'
import DiscordIcon from './DiscordIcon'

export default function Footer() {
  return (
    <footer className="bg-[#18234e] text-[#f2f3f7]">
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm">
          <div>© {new Date().getFullYear()} AISCI · AI Safety Collective at Irvine</div>
          <div className="text-xs text-[#f2f3f7]/60 mt-0.5">AI safety &amp; AI alignment at UC Irvine (UCI) · Irvine, CA</div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 my-3 md:my-0">
          <span className="text-sm text-[#f2f3f7]">Curious about AI safety?</span>
          <div className="flex gap-2">
            <a href={links.coffeeHelena} target="_blank" rel="noopener noreferrer" className="inline-block text-sm bg-[#f2f3f7] text-[#18234e] font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors">
              Coffee with Helena
            </a>
            <a href={links.coffeeHarry} target="_blank" rel="noopener noreferrer" className="inline-block text-sm bg-[#f2f3f7] text-[#18234e] font-semibold px-4 py-2 rounded-full hover:bg-white transition-colors">
              Coffee with Harry
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <a href={links.discord} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Discord">
            <DiscordIcon className="w-5 h-5" />
          </a>
          <Link href="/contact" className="hover:text-[#f2f3f7]">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
