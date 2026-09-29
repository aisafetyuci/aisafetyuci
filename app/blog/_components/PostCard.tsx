import Image from 'next/image'
import Link from 'next/link'
import { formatDate, type Post } from '../../lib/blog'
import CategoryBadge from './CategoryBadge'

// One row in the single-column post list. The whole row is one link; the
// category badge stays plain text so links don't nest.
export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex items-start gap-6 py-6">
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <CategoryBadge category={post.category} />
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-brand transition-colors group-hover:text-brand-accent">
          {post.title}
        </h3>
        <p className="mt-2 leading-relaxed text-gray-600">{post.summary}</p>
        <p className="mt-2 text-sm text-gray-500">
          {post.authors.join(', ')}
          <span aria-hidden="true"> · </span>
          {post.readingTime} min read
        </p>
      </div>
      {post.cover && (
        <div className="relative hidden aspect-[3/2] w-40 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-brand-soft sm:block">
          <Image src={post.cover} alt={post.coverAlt ?? ''} fill sizes="160px" className="object-cover" />
        </div>
      )}
    </Link>
  )
}
