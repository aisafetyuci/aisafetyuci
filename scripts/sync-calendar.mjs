// Saves the club Google Calendar's public iCal feed to content/events/calendar.ics, which /events
// is built from. Run by .github/workflows/sync-calendar.yml; run it by hand with `npm run sync-calendar`.
//
// Builds read the saved copy instead of asking Google directly, because Google rate-limits (HTTP 429)
// the shared machines Cloudflare builds on.
import fs from 'node:fs'

const output = 'content/events/calendar.ics'
// The calendar ID lives in app/data/links.ts; read it from there so it's only written down once.
const calendarId = fs.readFileSync('app/data/links.ts', 'utf8').match(/const calendarId = '([^']+)'/)?.[1]
if (!calendarId) throw new Error('Could not find calendarId in app/data/links.ts')
const feed = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`

async function download() {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(feed)
    if (response.ok) return response.text()
    const retryable = response.status === 429 || response.status >= 500
    if (!retryable || attempt === 4) throw new Error(`Couldn't fetch the calendar feed (HTTP ${response.status}). Is the Google Calendar still public?`)
    const wait = 30 * 2 ** (attempt - 1)
    console.log(`HTTP ${response.status}; retrying in ${wait}s`)
    await new Promise((resolve) => setTimeout(resolve, wait * 1000))
  }
}

const text = await download()
if (!text.startsWith('BEGIN:VCALENDAR')) throw new Error('The calendar feed returned something that is not a calendar')

// Make unchanged calendars save byte-for-byte the same, so the sync only commits real edits:
// Google stamps every event with the download time (DTSTAMP) and lists events in a random order.
const withoutStamps = text.replace(/^DTSTAMP:.*\r?\n/gm, '')
const first = withoutStamps.indexOf('BEGIN:VEVENT')
const last = withoutStamps.lastIndexOf('END:VEVENT')
const normalized = first === -1
  ? withoutStamps
  : withoutStamps.slice(0, first) +
    withoutStamps
      .slice(first, last + 'END:VEVENT'.length)
      .split(/\r?\n(?=BEGIN:VEVENT)/)
      .sort()
      .join('\r\n') +
    withoutStamps.slice(last + 'END:VEVENT'.length)

const count = (ics) => (ics.match(/^BEGIN:VEVENT/gm) ?? []).length
const previous = fs.existsSync(output) ? fs.readFileSync(output, 'utf8') : ''
if (count(normalized) === 0 && count(previous) > 0) {
  throw new Error('The feed has no events at all, but the saved copy does. Refusing to wipe the events page.')
}

fs.writeFileSync(output, normalized)
console.log(normalized === previous ? 'No calendar changes.' : `Saved ${count(normalized)} events to ${output}.`)
