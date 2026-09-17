import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { weeks } from '../data'
import WeekRedirect from './WeekRedirect'

export const metadata: Metadata = {
  title: 'Technical Intro Fellowship',
  alternates: { canonical: 'https://aisafetyuci.org/tif' },
  robots: { index: false },
}

export function generateStaticParams() {
  return weeks.filter((week) => !week.comingSoon).map((week) => ({ week: String(week.number) }))
}

// Preserve shared week URLs while keeping all curriculum content on /tif.
export default async function WeekPage({ params }: { params: Promise<{ week: string }> }) {
  const { week: number } = await params
  const week = weeks.find((item) => String(item.number) === number && !item.comingSoon)
  if (!week) notFound()
  return <WeekRedirect number={week.number} label={week.label} />
}
