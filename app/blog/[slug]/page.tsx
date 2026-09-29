import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import { findTeamMember, teamMemberId } from '../../data/team'
import { emptyParamPlaceholder, formatDate, getAllPosts, getPost, siteUrl, type Post } from '../../lib/blog'
import BlogCta from '../_components/BlogCta'
import CategoryBadge from '../_components/CategoryBadge'
import CopyLinkButton from '../_components/CopyLinkButton'

// Static export: every post is prerendered; unknown slugs 404.
export const dynamicParams = false

export function generateStaticParams() {
  const posts = getAllPosts()
  if (posts.length === 0) return [{ slug: emptyParamPlaceholder }]
  return posts.map((post) => ({ slug: post.slug }))
}

type Props = { params: Promise<{ slug: string }> }

const defaultImage = '/images/asinglenet-og.png'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const url = `/blog/${post.slug}`
  const image = post.cover ?? defaultImage
  return {
    title: post.title,
    description: post.summary,
    authors: post.authors.map((name) => ({ name })),
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteUrl}${url}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: post.authors,
      section: post.category,
      images: [post.cover ? { url: image, alt: post.coverAlt } : { url: image, width: 1200, height: 630, alt: 'AI Safety Collective at Irvine' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [image],
    },
  }
}

function Byline({ post }: { post: Post }) {
  const authors = post.authors.map((name) => ({ name, member: findTeamMember(name) }))
  const headshots = authors.filter((author) => author.member?.image)
  return (
    <div className="mt-6 flex items-center gap-3">
      {headshots.length > 0 && (
        <div className="flex shrink-0 -space-x-2">
          {headshots.map(({ name, member }) => (
            <Image key={name} src={member!.image!} alt="" width={96} height={96} className="h-11 w-11 rounded-full border-2 border-white object-cover" />
          ))}
        </div>
      )}
      <div className="min-w-0 text-sm">
        <p className="font-semibold text-brand">
          {authors.map(({ name, member }, i) => (
            <Fragment key={name}>
              {i > 0 && (i === authors.length - 1 ? (authors.length > 2 ? ', and ' : ' and ') : ', ')}
              {member ? (
                <Link href={`/team#${teamMemberId(member.name)}`} className="underline decoration-brand/25 underline-offset-4 transition-colors hover:text-brand-accent">
                  {name}
                </Link>
              ) : name}
            </Fragment>
          ))}
        </p>
        <p className="mt-0.5 text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.readingTime} min read
          {post.updated && (
            <>
              <span aria-hidden="true"> · </span>
              Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

function jsonLd(post: Post) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: `${siteUrl}${post.cover ?? defaultImage}`,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
    author: post.authors.map((name) => {
      const member = findTeamMember(name)
      return member ? { '@type': 'Person', name, url: `${siteUrl}/team#${teamMemberId(member.name)}` } : { '@type': 'Person', name }
    }),
    publisher: {
      '@type': 'Organization',
      name: 'AI Safety Collective at Irvine',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
  }
  // Escape "<" so post text can never close the script tag.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const posts = getAllPosts()
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) notFound()
  const post = posts[index]
  const older = posts[index + 1]
  const newer = posts[index - 1]

  return (
    <main className="min-h-screen bg-brand-wash">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(post) }} />
      <div className="site-container pt-10 pb-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex min-h-10 items-center text-sm font-medium text-brand-accent hover:text-brand">
            <span aria-hidden="true">←</span>&nbsp;All posts
          </Link>

          <article>
            <header className="mt-4 border-b border-brand-border pb-8">
              <CategoryBadge category={post.category} link />
              <h1 className="page-title mt-4 break-words">{post.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.summary}</p>
              <Byline post={post} />
            </header>

            {post.cover && (
              <div className="relative mt-8 aspect-[1200/630] overflow-hidden rounded-2xl border border-brand-border bg-brand-soft">
                <Image src={post.cover} alt={post.coverAlt ?? ''} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
              </div>
            )}

            <div
              className="prose prose-brand mt-8 max-w-none break-words sm:prose-lg prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-a:underline-offset-4 prose-a:decoration-brand/30 hover:prose-a:decoration-brand prose-img:rounded-2xl prose-pre:overflow-x-auto prose-pre:rounded-lg"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-brand-border pt-8">
            <CopyLinkButton url={`${siteUrl}/blog/${post.slug}`} />
          </div>

          {(older || newer) && (
            <nav aria-label="More posts" className="mt-8 grid gap-4 sm:grid-cols-2">
              {older ? (
                <Link href={`/blog/${older.slug}`} className="surface-card interactive-card flex min-w-0 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500"><span aria-hidden="true">←</span> Previous post</span>
                  <span className="mt-1 font-semibold text-brand">{older.title}</span>
                </Link>
              ) : <span className="hidden sm:block" />}
              {newer && (
                <Link href={`/blog/${newer.slug}`} className="surface-card interactive-card flex min-w-0 flex-col p-5 sm:text-right">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Next post <span aria-hidden="true">→</span></span>
                  <span className="mt-1 font-semibold text-brand">{newer.title}</span>
                </Link>
              )}
            </nav>
          )}

          <div className="mt-12">
            <BlogCta />
          </div>
        </div>
      </div>
    </main>
  )
}
