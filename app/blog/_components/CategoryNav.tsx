import Link from 'next/link'
import { categorySlug, type Category } from '../../lib/blog'

// Plain links to each category that has posts (no JavaScript filtering).
export default function CategoryNav({ categories, current }: { categories: Category[]; current?: Category }) {
  if (categories.length === 0) return null
  const itemClass = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-brand-soft text-brand' : 'text-gray-600 hover:bg-white hover:text-brand'}`
  return (
    <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
      <Link href="/blog" aria-current={current ? undefined : 'page'} className={itemClass(!current)}>All posts</Link>
      {categories.map((category) => (
        <Link key={category} href={`/blog/category/${categorySlug(category)}`} aria-current={current === category ? 'page' : undefined} className={itemClass(current === category)}>
          {category}
        </Link>
      ))}
    </nav>
  )
}
