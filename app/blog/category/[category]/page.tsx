import { Metadata } from 'next'
import Link from 'next/link'
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
      <div className="site-container pt-12 pb-2">
        <div className="page-header">
          <Link href="/blog" className="text-sm font-medium text-brand-accent hover:text-brand">
            <span aria-hidden="true">←</span> All posts
          </Link>
          <h1 className="page-title mt-3">{category}</h1>
          <p className="mt-4 text-lg text-gray-600">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </div>

      <div className="site-container pt-10 pb-16">
        <CategoryNav categories={usedCategories(allPosts)} current={category} />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </main>
  )
}
