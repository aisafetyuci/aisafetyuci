import Link from 'next/link'
import { categoryColors, categorySlug, type Category } from '../../lib/blog'

export default function CategoryBadge({ category, link = false }: { category: Category; link?: boolean }) {
  const className = `inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[category]}`
  if (!link) return <span className={className}>{category}</span>
  return (
    <Link href={`/blog/category/${categorySlug(category)}`} className={`${className} transition-opacity hover:opacity-80`}>
      {category}
    </Link>
  )
}
