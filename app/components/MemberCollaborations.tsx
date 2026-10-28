import Image from 'next/image'
import { collaborators } from '../data/collaborators'

// A still row of logos (grayscale until hovered), under the mission on the homepage.
export default function MemberCollaborations() {
  return (
    <div className="mt-16 border-t border-brand-border pt-8">
      <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500">Our members have worked with</h3>
      <ul className="mt-6 grid grid-cols-3 items-center gap-x-4 gap-y-6 sm:grid-cols-5 xl:grid-cols-9">
        {collaborators.map(({ name, href, logo }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-lg text-center text-xs leading-snug text-gray-500 transition-colors hover:text-brand"
            >
              <Image
                src={logo}
                alt=""
                width={110}
                height={44}
                className="h-11 w-full max-w-[110px] object-contain opacity-75 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
              />
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
