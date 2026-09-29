import DiscordIcon from '../../components/DiscordIcon'
import MailingListForm from '../../components/MailingListForm'
import { links } from '../../data/links'

export default function BlogCta({ heading = 'Stay in the loop' }: { heading?: string }) {
  return (
    <section aria-labelledby="blog-cta-heading" className="surface-card p-6 sm:p-8">
      <h2 id="blog-cta-heading" className="text-2xl font-semibold text-brand">{heading}</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-gray-600">
        Join our Discord to talk about posts with other members, or get new posts and events by email. No background needed.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start">
        <a href={links.discord} target="_blank" rel="noopener noreferrer" aria-label="Join the AISCI Discord" className="button-primary">
          <DiscordIcon className="h-5 w-5" /> Join Discord
        </a>
        <div className="w-full max-w-xl">
          <MailingListForm />
        </div>
      </div>
    </section>
  )
}
