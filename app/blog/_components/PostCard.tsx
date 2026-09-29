import Image from 'next/image'
import Link from 'next/link'
import { formatDate, type Post } from '../../lib/blog'
import CategoryBadge from './CategoryBadge'

function Meta({ post }: { post: Post }) {
  return (
    <p className="mt-auto pt-4 text-sm text-gray-500">
      {post.authors.join(', ')}
      <span aria-hidden="true"> · </span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true"> · </span>
      {post.readingTime} min read
    </p>
  )
}

// The whole card is one link; the category badge stays plain text so links don't nest.
export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="surface-card interactive-card group grid overflow-hidden md:grid-cols-2">
        {post.cover && (
          <div className="relative aspect-[1200/630] bg-brand-soft md:aspect-auto md:min-h-72">
            <Image src={post.cover} alt={post.coverAlt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
        <div className={`flex min-w-0 flex-col p-6 sm:p-8 ${post.cover ? '' : 'md:col-span-2'}`}>
          <div><CategoryBadge category={post.category} /></div>
          <h2 className="mt-3 text-2xl font-semibold leading-snug text-brand group-hover:text-brand-accent sm:text-3xl">{post.title}</h2>
          <p className="mt-3 leading-relaxed text-gray-600">{post.summary}</p>
          <Meta post={post} />
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="surface-card interactive-card group flex h-full min-w-0 flex-col p-6">
      <div><CategoryBadge category={post.category} /></div>
      <h3 className="mt-3 text-xl font-semibold leading-snug text-brand group-hover:text-brand-accent">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.summary}</p>
      <Meta post={post} />
    </Link>
  )
}
