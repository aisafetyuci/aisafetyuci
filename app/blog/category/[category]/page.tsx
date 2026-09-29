import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categoryFromSlug, categorySlug, emptyParamPlaceholder, getAllPosts, usedCategories } from '../../../lib/blog'
import CategoryNav from '../../_components/CategoryNav'
import PostCard from '../../_components/PostCard'

// Static export: only categories that have posts get a page.
export const dynamicParams = false

export function generateStaticParams() {
  const used = usedCategories()
  if (used.length === 0) return [{ category: emptyParamPlaceholder }]
  return used.map((category) => ({ category: categorySlug(category) }))
}

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryFromSlug((await params).category)
  if (!category) return {}
  const title = `${category} posts`
  const description = `${category} posts from the AI Safety Collective at Irvine blog.`
  const url = `/blog/category/${categorySlug(category)}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | AI Safety Collective at Irvine`,
      description,
      url: `https://aisafetyuci.org${url}`,
      type: 'website',
      images: ['/images/asinglenet-og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | AI Safety Collective at Irvine`,
      description,
      images: ['/images/asinglenet-og.png'],
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const category = categoryFromSlug((await params).category)
  const allPosts = getAllPosts()
  const posts = allPosts.filter((post) => post.category === category)
  if (!category || posts.length === 0) notFound()

  return (
    <main className="min-h-screen bg-brand-wash">
      {/* Same header and filter bar position as /blog, so switching categories feels like switching tabs. */}
      <div className="site-container pt-12 pb-2">
        <div className="page-header">
          <p className="page-title" aria-hidden="true">Blog</p>
          <h1 className="sr-only">{category} posts</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Writing from our members on AI safety
          </p>
        </div>
      </div>

      <div className="site-container pt-10 pb-16">
        <CategoryNav categories={usedCategories(allPosts)} current={category} />
        <ul className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
          {posts.map((post) => <li key={post.slug}><PostCard post={post} /></li>)}
        </ul>
      </div>
    </main>
  )
}
