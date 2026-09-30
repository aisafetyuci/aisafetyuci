import { getCalendar } from '../../../lib/events'

// One calendar file per event (/events/ics/<id>.ics) for the "Apple Calendar / Outlook" button.
export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const { events } = await getCalendar()
  return events.map((event) => ({ id: `${event.id}.ics` }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { ics } = await getCalendar()
  return new Response(ics.get(id.replace(/\.ics$/, '')), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  })
}
