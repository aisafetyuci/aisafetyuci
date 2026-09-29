import { Metadata } from 'next'
import { getAllPosts, usedCategories } from '../lib/blog'
import BlogCta from './_components/BlogCta'
import CategoryNav from './_components/CategoryNav'
import PostCard from './_components/PostCard'

const pageTitle = 'Blog'
const pageDescription = 'Explainers, research notes, event recaps, and announcements from the AI Safety Collective at Irvine.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/blog/feed.xml' },
  },
  openGraph: {
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    url: 'https://aisafetyuci.org/blog',
    type: 'website',
    images: ['/images/asinglenet-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | AI Safety Collective at Irvine`,
    description: pageDescription,
    images: ['/images/asinglenet-og.png'],
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const lead = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts.filter((post) => post !== lead)

  return (
    <main className="min-h-screen bg-brand-wash">
      <div className="site-container pt-12 pb-2">
        <div className="page-header">
          <h1 className="page-title">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Writing from our members on AI safety
          </p>
        </div>
      </div>

      <div className="site-container pt-10 pb-16">
        {lead ? (
          <>
            <CategoryNav categories={usedCategories(posts)} />
            <div className="mt-8">
              <PostCard post={lead} featured />
            </div>
            {rest.length > 0 && (
              <section aria-labelledby="more-posts-heading" className="mt-12">
                <h2 id="more-posts-heading" className="sr-only">More posts</h2>
                <ul className="divide-y divide-gray-200 border-y border-gray-200">
                  {rest.map((post) => <li key={post.slug}><PostCard post={post} /></li>)}
                </ul>
              </section>
            )}
            <div className="mt-16">
              <BlogCta />
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-3xl">
            <div className="surface-card p-8 text-center sm:p-10">
              <h2 className="text-2xl font-semibold text-brand">First posts coming soon</h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
                We&apos;re writing our first posts now: explainers, research notes, and recaps from our members.
              </p>
            </div>
            <div className="mt-8">
              <BlogCta heading="Hear when we publish" />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
